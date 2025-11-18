// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".carousel-indicator");
const slidesContainer = document.getElementById("carouselSlides");
let autoSlideInterval;

// Show specific slide
function showSlide(index) {
  // Wrap around if index is out of bounds
  if (index >= slides.length) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = slides.length - 1;
  } else {
    currentSlideIndex = index;
  }

  // Move slides
  const offset = -currentSlideIndex * 100;
  slidesContainer.style.transform = `translateX(${offset}%)`;

  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.remove("active");
    if (i === currentSlideIndex) {
      indicator.classList.add("active");
    }
  });
}

// Move to next/previous slide
function moveSlide(direction) {
  showSlide(currentSlideIndex + direction);
  resetAutoSlide();
}

// Jump to specific slide
function currentSlide(index) {
  showSlide(index);
  resetAutoSlide();
}

// Auto-advance slides
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    showSlide(currentSlideIndex + 1);
  }, 5000); // Change slide every 5 seconds
}

// Reset auto-slide timer when user interacts
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialize carousel
showSlide(0);
startAutoSlide();

// Pause auto-slide when user hovers over carousel
const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", () => {
  clearInterval(autoSlideInterval);
});

carousel.addEventListener("mouseleave", () => {
  startAutoSlide();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    moveSlide(-1);
  } else if (e.key === "ArrowRight") {
    moveSlide(1);
  }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left - next slide
    moveSlide(1);
  }
  if (touchEndX > touchStartX + 50) {
    // Swipe right - previous slide
    moveSlide(-1);
  }
}
