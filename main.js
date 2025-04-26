// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// Emotional Hook Text Rotation
const emotions = [
  "When they fall...",
  "When the road is empty...",
  "When she can't reach her phone..."
];
let currentEmotion = 0;
const emotionalText = document.getElementById('emotional-text');

function rotateEmotions() {
  emotionalText.style.opacity = '0';
  setTimeout(() => {
    currentEmotion = (currentEmotion + 1) % emotions.length;
    emotionalText.textContent = emotions[currentEmotion];
    emotionalText.style.opacity = '1';
  }, 500);
}

setInterval(rotateEmotions, 3000);

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .quote-container').forEach(el => {
  observer.observe(el);
});

// Waitlist Form Handling
const waitlistForm = document.getElementById('waitlistForm');
const formError = document.getElementById('formError');
const submitButton = document.getElementById('submitButton');
const successMessage = document.getElementById('successMessage');

waitlistForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.textContent = '';
  
  const formData = new FormData(waitlistForm);
  const data = Object.fromEntries(formData);
  
  // Validate form
  if (!data.name || !data.email || !data.interest) {
    formError.textContent = 'Please complete all fields';
    return;
  }
  
  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = `
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Processing...
  `;
  
  // Simulate API call
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    waitlistForm.style.display = 'none';
    successMessage.classList.remove('hidden');
  } catch (err) {
    formError.textContent = 'An error occurred. Please try again.';
    submitButton.disabled = false;
    submitButton.textContent = 'Join the Waitlist';
  }
});

// Smooth scroll to waitlist
function scrollToWaitlist() {
  document.getElementById('waitlist-form').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();
