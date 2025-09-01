// Translation and Text-to-Speech functionality
// Shared between blog posts and life stories

let originalContent = '';
let isTranslated = false;
let currentAudio = null;
let isPlaying = false;

function translateTo(langCode) {
  if (!isTranslated) {
    // Store original content on first translation
    originalContent = document.querySelector('.post-content').innerHTML;
  }
  
  const postContent = document.querySelector('.post-content');
  const postTitle = document.querySelector('.post-title');
  
  // Show loading state
  postContent.innerHTML = '<div class="loading">Translating...</div>';
  
  // Prepare HTML content for translation
  const htmlContent = `
    <h1>${postTitle.textContent}</h1>
    ${originalContent}
  `;
  
  console.log('Sending translation request:', {
    html: htmlContent.substring(0, 100) + '...',
    to: langCode,
    from: 'en'
  });
  
  // Call translation worker
  fetch('https://darvan-translator-proxy.darvan56.workers.dev/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html: htmlContent,
      to: langCode,
      from: 'en'
    })
  })
  .then(response => {
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  })
  .then(data => {
    console.log('Translation response:', data);
    
    // Check for different possible response formats
    let translatedHtml = data.translatedHtml || data.html || data.translated || data.content;
    
    if (translatedHtml) {
      // Extract title and content from translated HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = translatedHtml;
      
      const translatedTitle = tempDiv.querySelector('h1');
      const translatedContent = tempDiv.innerHTML.replace(/<h1>.*?<\/h1>/, '');
      
      // Update title and content
      if (translatedTitle) {
        postTitle.textContent = translatedTitle.textContent;
      }
      postContent.innerHTML = translatedContent;
      
      isTranslated = true;
      
      updateTranslationButtons(langCode);
      hideTTSButton();
      setContentDirection(langCode);
    } else {
      console.error('No translated content found in response:', data);
      postContent.innerHTML = '<div class="error">Translation failed: No content received</div>';
    }
  })
  .catch(error => {
    console.error('Translation error:', error);
    postContent.innerHTML = `<div class="error">Translation failed: ${error.message}</div>`;
  });
}

function updateTranslationButtons(langCode) {
  const translateLinks = document.querySelectorAll('.translate-link');
  
  if (langCode === 'ku') {
    // Sorani (Central Kurdish) - RTL
    translateLinks[0].textContent = 'كوردى ✓';
    translateLinks[1].textContent = 'Reset';
    disableButton(translateLinks[0]);
    enableButton(translateLinks[1]);
  } else if (langCode === 'kmr') {
    // Kurmanji (Northern Kurdish) - LTR
    translateLinks[0].textContent = 'Kurdî ✓';
    translateLinks[1].textContent = 'Reset';
    disableButton(translateLinks[0]);
    enableButton(translateLinks[1]);
  }
}

function disableButton(button) {
  button.style.pointerEvents = 'none';
  button.style.opacity = '0.6';
}

function enableButton(button) {
  button.style.pointerEvents = 'auto';
  button.style.opacity = '1';
}

function hideTTSButton() {
  const ttsButton = document.getElementById('ttsButton');
  if (ttsButton) {
    ttsButton.style.display = 'none';
  }
  
  // Also hide the separator before the TTS button
  const ttsSeparator = ttsButton ? ttsButton.previousElementSibling : null;
  if (ttsSeparator && ttsSeparator.classList.contains('translate-separator')) {
    ttsSeparator.style.display = 'none';
  }
}

function setContentDirection(langCode) {
  console.log('Setting direction for language code:', langCode);
  
  if (langCode === 'ku') {
    // Sorani (Central Kurdish) - RTL
    console.log('Applying RTL direction for Sorani');
    document.querySelector('.post-title').setAttribute('dir', 'rtl');
    document.querySelector('.post-content').setAttribute('dir', 'rtl');
    
    // Force RTL on all child elements
    const allElements = document.querySelector('.post-content').querySelectorAll('*');
    allElements.forEach(el => {
      el.style.direction = 'rtl';
      el.style.textAlign = 'right';
    });
  } else if (langCode === 'kmr') {
    // Kurmanji (Northern Kurdish) - LTR
    console.log('Applying LTR direction for Kurmanji');
    document.querySelector('.post-title').setAttribute('dir', 'ltr');
    document.querySelector('.post-content').setAttribute('dir', 'ltr');
    
    // Force LTR on all child elements
    const allElements = document.querySelector('.post-content').querySelectorAll('*');
    allElements.forEach(el => {
      el.style.direction = 'ltr';
      el.style.textAlign = 'left';
    });
  }
}

function handleSecondLinkClick() {
  if (isTranslated) {
    // If already translated, reset to original
    resetTranslation();
  } else {
    // If not translated, translate to Kurmanji
    translateTo('kmr');
  }
}

function resetTranslation() {
  if (isTranslated && originalContent) {
    // Restore original content
    document.querySelector('.post-content').innerHTML = originalContent;
    
    // Reset title if it was translated
    const originalTitle = document.querySelector('.post-title');
    if (originalTitle.dataset.originalTitle) {
      originalTitle.textContent = originalTitle.dataset.originalTitle;
    }
    
    // Reset translate links text
    const translateLinks = document.querySelectorAll('.translate-link');
    translateLinks[0].textContent = 'كوردى';
    translateLinks[1].textContent = 'Kurdî';
    
    // Reset content direction and alignment
    document.querySelector('.post-title').removeAttribute('dir');
    document.querySelector('.post-content').removeAttribute('dir');
    
    // Reset all child elements to default direction and alignment
    const allElements = document.querySelector('.post-content').querySelectorAll('*');
    allElements.forEach(el => {
      el.style.direction = '';
      el.style.textAlign = '';
    });
    
    // Re-enable all buttons
    const allTranslateLinks = document.querySelectorAll('.translate-link');
    allTranslateLinks.forEach(link => {
      link.style.pointerEvents = 'auto';
      link.style.opacity = '1';
    });
    
    // Reset TTS button state
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
      isPlaying = false;
      const ttsButton = document.getElementById('ttsButton');
      if (ttsButton) {
        ttsButton.textContent = 'Listen';
      }
    }
    
    // Show TTS button and its separator again after reset
    const ttsButton = document.getElementById('ttsButton');
    if (ttsButton) {
      ttsButton.style.display = 'inline';
    }
    
    // Also show the separator before the TTS button
    const ttsSeparator = ttsButton ? ttsButton.previousElementSibling : null;
    if (ttsSeparator && ttsSeparator.classList.contains('translate-separator')) {
      ttsSeparator.style.display = 'inline';
    }
    
    isTranslated = false;
  }
}

function textToSpeech() {
  const ttsButton = document.getElementById('ttsButton');
  
  // If audio is currently playing, stop it
  if (isPlaying && currentAudio) {
    currentAudio.pause();
    currentAudio = null;
    isPlaying = false;
    ttsButton.textContent = 'Listen';
    return;
  }
  
  // Get the current content to read
  const postTitle = document.querySelector('.post-title').textContent;
  const postContent = document.querySelector('.post-content').textContent;
  const textToRead = `${postTitle}. ${postContent}`;
  
  // Show loading state
  ttsButton.textContent = 'loading...';
  
  // Determine voice based on current language
  let voice = 'en-US-JennyNeural'; // Default English voice
  if (isTranslated) {
    // Check which language is currently active
    const translateLinks = document.querySelectorAll('.translate-link');
    if (translateLinks[0].textContent.includes('كوردى ✓')) {
      voice = 'ku-IQ-YusufNeural'; // Kurdish Sorani voice
    } else if (translateLinks[1].textContent.includes('Kurdî ✓')) {
      voice = 'ku-IQ-YusufNeural'; // Kurdish Kurmanji voice
    }
  }
  
  console.log('Sending TTS request:', {
    text: textToRead.substring(0, 100) + '...',
    voice: voice,
    format: 'audio-24khz-160kbitrate-mono-mp3'
  });
  
  // Call TTS worker
  fetch('https://darvan-speech-proxy.darvan56.workers.dev/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: textToRead,
      voice: voice,
      format: 'audio-24khz-160kbitrate-mono-mp3',
      download: false
    })
  })
  .then(response => {
    console.log('TTS Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.blob();
  })
  .then(blob => {
    // Create audio element and play
    const audioUrl = URL.createObjectURL(blob);
    currentAudio = new Audio(audioUrl);
    
    currentAudio.onended = () => {
      isPlaying = false;
      ttsButton.textContent = 'Listen';
    };
    
    currentAudio.onerror = () => {
      console.error('Audio playback error');
      ttsButton.textContent = 'Listen';
    };
    
    currentAudio.play().then(() => {
      isPlaying = true;
      ttsButton.textContent = 'pause';
    }).catch(error => {
      console.error('Audio play error:', error);
      ttsButton.textContent = 'Listen';
    });
  })
  .catch(error => {
    console.error('TTS error:', error);
    ttsButton.textContent = 'error';
    
    // Reset button state after 3 seconds
    setTimeout(() => {
      ttsButton.textContent = 'Listen';
    }, 3000);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  const title = document.querySelector('.post-title');
  if (title) {
    title.dataset.originalTitle = title.textContent;
  }
  
  // Ensure all buttons start enabled
  const translateLinks = document.querySelectorAll('.translate-link');
  translateLinks.forEach(link => {
    link.style.pointerEvents = 'auto';
    link.style.opacity = '1';
  });
});
