function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidName(name) {
  return /^[a-zA-Z\s]{2,50}$/.test(name);
}

function showError(input, message) {
  const existing = input.parentElement.querySelector('.error-message');
  if (existing) existing.remove();
  
  const error = document.createElement('div');
  error.className = 'error-message';
  error.style.color = 'red';
  error.style.fontSize = '0.9rem';
  error.textContent = message;
  
  input.style.borderColor = 'red';
  input.parentElement.appendChild(error);
}

function clearError(input) {
  const error = input.parentElement.querySelector('.error-message');
  if (error) error.remove();
  input.style.borderColor = '';
}

function showSuccess(message) {
  const existing = document.querySelector('.success-message');
  if (existing) existing.remove();
  
  const success = document.createElement('div');
  success.className = 'success-message';
  success.style.cssText = 'background:#4caf50;color:white;padding:15px;border-radius:5px;margin:20px 0;text-align:center;';
  success.textContent = message;
  
  const form = document.querySelector('form');
  form.parentElement.insertBefore(success, form);
  
  setTimeout(() => success.remove(), 5000);
}

function validateContactForm(e) {
  e.preventDefault();
  let valid = true;
  
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const interest = document.getElementById('interest');
  
  [name, email, subject, interest].forEach(clearError);
  
  if (!name.value.trim() || !isValidName(name.value.trim())) {
    showError(name, 'Enter valid name (letters only, 2-50 chars)');
    valid = false;
  }
  
  if (!email.value.trim() || !isValidEmail(email.value.trim())) {
    showError(email, 'Enter valid email');
    valid = false;
  }
  
  if (!subject.value.trim() || subject.value.trim().length < 3) {
    showError(subject, 'Subject must be at least 3 characters');
    valid = false;
  }
  
  if (!interest.value) {
    showError(interest, 'Select a reason for contact');
    valid = false;
  }
  
  if (valid) {
    showSuccess('Thank you! We will respond within 7-14 business days.');
    setTimeout(() => e.target.reset(), 2000);
  }
  
  return false;
}

function validateEnquiryForm(e) {
  e.preventDefault();
  let valid = true;
  
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const interest = document.getElementById('interest');
  
  [name, email, interest].forEach(clearError);
  
  if (!name.value.trim() || !isValidName(name.value.trim())) {
    showError(name, 'Enter valid name (letters only, 2-50 chars)');
    valid = false;
  }
  
  if (!email.value.trim() || !isValidEmail(email.value.trim())) {
    showError(email, 'Enter valid email');
    valid = false;
  }
  
  if (!interest.value) {
    showError(interest, 'Select how you want to get involved');
    valid = false;
  }
  
  if (valid) {
    showSuccess('Thank you! We will contact you within 7-14 business days.');
    setTimeout(() => e.target.reset(), 2000);
  }
  
  return false;
}

function openLightbox(src, alt) {
  const lightbox = document.createElement('div');
  lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;justify-content:center;align-items:center;z-index:9999;';
  
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.style.cssText = 'max-width:90%;max-height:90%;';
  
  const close = document.createElement('span');
  close.innerHTML = '&times;';
  close.style.cssText = 'position:absolute;top:20px;right:40px;color:white;font-size:50px;cursor:pointer;';
  
  close.onclick = () => lightbox.remove();
  lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.remove(); };
  
  lightbox.appendChild(img);
  lightbox.appendChild(close);
  document.body.appendChild(lightbox);
}

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('form[action="save_contact.php"]');
  if (contactForm) {
    contactForm.addEventListener('submit', validateContactForm);
  }
  
  const enquiryForm = document.querySelector('form[action="save_enquiry.php"]');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', validateEnquiryForm);
  }
  
  document.querySelectorAll('.gallery-image').forEach(img => {
    img.style.cursor = 'pointer';
    img.onclick = () => openLightbox(img.src, img.alt);
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.onclick = function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };
  });
});