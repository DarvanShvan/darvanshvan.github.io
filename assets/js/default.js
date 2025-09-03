(function() {
  const header = document.querySelector('.site-header');
  let lastY = window.pageYOffset;

  window.addEventListener('scroll', () => {
    const currentY = window.pageYOffset;
    if (currentY > lastY && currentY > header.offsetHeight) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }
    lastY = currentY;
  });
})();

function handleSubscribe(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector('.subscribe-input');
  const errorDiv = form.querySelector('#subscribe-error');
  const submitButton = form.querySelector('.submit-text');
  
  const email = input.value.trim();
  
  if (!email) {
    errorDiv.textContent = 'This field is required.';
    errorDiv.style.display = 'block';
    errorDiv.style.color = '';
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorDiv.textContent = 'Please enter a valid email address.';
    errorDiv.style.display = 'block';
    errorDiv.style.color = '';
    return;
  }
  
  errorDiv.style.display = 'none';
  submitButton.disabled = true;
  
  const subject = 'New Website Subscription';
  const body = `A new user has subscribed to your website updates.\n\nEmail: ${email}\n\nThis email was sent from your website's subscribe form.`;
  
  const mailtoLink = `mailto:info@darvan.krd?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  errorDiv.textContent = 'Thank you for subscribing!';
  errorDiv.style.display = 'block';
  errorDiv.style.color = '#5E35B2';
  
  form.reset();
  submitButton.disabled = false;
  
  const link = document.createElement('a');
  link.href = mailtoLink;
  link.click();
  
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('subscribe-email');
  const errorDiv = document.getElementById('subscribe-error');
  if (input && errorDiv) {
    input.addEventListener('input', function() {
      errorDiv.style.display = 'none';
    });
  }
  
  // Ensure email link is properly displayed
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    emailLink.textContent = 'INFO@DARVAN.KRD';
    emailLink.href = 'mailto:info@darvan.krd';
  }
});
