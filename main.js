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

// Attach observer to feature cards and quote section
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
  submitButton.textContent = "Processing...";

  // Simulate API call
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    waitlistForm.style.display = 'none';
    successMessage.classList.remove('hidden');
  } catch (err) {
    formError.textContent = 'An error occurred. Please try again.';
    submitButton.disabled = false;
    submitButton.textContent = 'Join Us';
  }
});

// Smooth scroll to waitlist
function scrollToWaitlist() {
  const target = document.getElementById('waitlist-form');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Update copyright year
const yearEl = document.getElementById('currentYear');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
