(function() {
  'use strict';
  
  const CUSTOM_DOMAIN = 'https://darvan.krd';
  const FALLBACK_URL = 'https://darvanshvan.github.io/';
  const CURRENT_BASE = '';
  
  function checkDomainAvailability(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url + '/favicon.ico?' + new Date().getTime();
      
      setTimeout(() => resolve(false), 3000);
    });
  }
  
  function fixRelativeUrls() {
    // No need to fix URLs for user site - they work naturally
    // This function is kept for future custom domain fallback
  }
  
  function initializeFallback() {
    if (window.location.hostname === 'darvanshvan.github.io') {
      // User site - no need for fallback logic
      return;
    }
    
    checkDomainAvailability(CUSTOM_DOMAIN).then(isAvailable => {
      if (!isAvailable) {
        console.log('Custom domain unavailable, redirecting to GitHub Pages fallback');
        window.location.href = FALLBACK_URL;
      }
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFallback);
  } else {
    initializeFallback();
  }
})();
