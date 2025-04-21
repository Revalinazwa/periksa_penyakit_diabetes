// Initialize AOS Animation Library with repeating animations
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS with options
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false, // Set to false so animations repeat on scroll
    mirror: true, // Whether elements should animate out while scrolling past them
  });

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");

    if (mobileMenuButton.innerHTML.includes("fa-bars")) {
      mobileMenuButton.innerHTML = '<i class="fas fa-times text-xl"></i>';
    } else {
      mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    }
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    });
  });

  // Update active link on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-blue-600");
      link.classList.add("text-gray-600");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove("text-gray-600");
        link.classList.add("text-blue-600");
      }
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    });
  });

  // Handle form submission with AJAX
  const form = document.getElementById("diabetes-form");
  const resultContainer = document.getElementById("result-container");
  const loadingIndicator = document.getElementById("loading");
  const resultText = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading indicator
    resultContainer.classList.remove("hidden");
    loadingIndicator.classList.remove("hidden");
    resultText.textContent = "";

    // Collect form data
    const formData = new FormData(form);
    const formDataObj = {};

    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    // Send data via fetch API
    fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    })
      .then((response) => response.json())
      .then((data) => {
        // Hide loading indicator
        loadingIndicator.classList.add("hidden");

        // Display result with animation
        resultText.textContent = data.result;
        resultText.classList.add("animate-pulse");

        // Remove pulse animation after 2 seconds
        setTimeout(() => {
          resultText.classList.remove("animate-pulse");
        }, 2000);
      })
      .catch((error) => {
        loadingIndicator.classList.add("hidden");
        resultText.textContent = "⚠️ Terjadi kesalahan. Silakan coba lagi.";
      });
  });
});

// Function to refresh AOS animations when the user scrolls
window.addEventListener("scroll", function () {
  AOS.refresh();
});
