(function() {
  'use strict';
  
  const CUSTOM_DOMAIN = 'https://darvan.krd';
  const FALLBACK_URL = 'https://darvanshvan.github.io/';
  const CURRENT_BASE = '';
  
  function checkDomainAvailability(url) {
    return new Promise((resolve) => {
      // Method 1: Try to fetch favicon
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => {
        // Method 2: Try to fetch the page itself
        fetch(url, { 
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache'
        }).then(() => resolve(true)).catch(() => resolve(false));
      };
      img.src = url + '/favicon.ico?' + new Date().getTime();
      
      // Timeout after 5 seconds
      setTimeout(() => resolve(false), 5000);
    });
  }
  
  function fixRelativeUrls() {
    // No need to fix URLs for user site - they work naturally
    // This function is kept for future custom domain fallback
  }
  
  function initializeFallback() {
    // Temporarily disabled to fix redirect loop
    // Will re-enable once HTTPS is working
    console.log('Fallback system temporarily disabled');
    return;
    
    if (window.location.hostname === 'darvanshvan.github.io') {
      // User site - no need for fallback logic
      return;
    }
    
    // Check if custom domain is available
    checkDomainAvailability(CUSTOM_DOMAIN).then(isAvailable => {
      if (!isAvailable) {
        console.log('Custom domain unavailable, redirecting to GitHub Pages fallback');
        window.location.href = FALLBACK_URL;
      }
    });
    
    // Also check periodically for domain health
    setInterval(() => {
      checkDomainAvailability(CUSTOM_DOMAIN).then(isAvailable => {
        if (!isAvailable && window.location.hostname !== 'darvanshvan.github.io') {
          console.log('Custom domain became unavailable, redirecting to fallback');
          window.location.href = FALLBACK_URL;
        }
      });
    }, 30000); // Check every 30 seconds
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFallback);
  } else {
    initializeFallback();
  }
})();
