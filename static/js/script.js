document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: true,
  });

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

  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    });
  });

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
});

// const form = document.getElementById("diabetes-form");
// const resultContainer = document.getElementById("result-container");
// const loadingIndicator = document.getElementById("loading");
// const resultText = document.getElementById("result");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   // Show loading indicator
//   resultContainer.classList.remove("hidden");
//   loadingIndicator.classList.remove("hidden");
//   resultText.textContent = "";

//   const formData = new FormData(form);
//   const formDataObj = {};

//   formData.forEach((value, key) => {
//     formDataObj[key] = value;
//   });

//   fetch("/diabetesCheck", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formDataObj),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Hide loading indicator
//       loadingIndicator.classList.add("hidden");

//       // Display result with animation
//       resultText.textContent = data.result;
//       resultText.classList.add("animate-pulse");

//       // Remove pulse animation after 2 seconds
//       setTimeout(() => {
//         resultText.classList.remove("animate-pulse");
//       }, 2000);
//     })
//     .catch((error) => {
//       loadingIndicator.classList.add("hidden");
//       resultText.textContent = "⚠️ Terjadi kesalahan. Silakan coba lagi.";
//     });
// });

window.addEventListener("scroll", function () {
  AOS.refresh();
});

document.addEventListener("DOMContentLoaded", function () {
  const questionMarks = document.querySelectorAll(".cursor-help");

  questionMarks.forEach((mark) => {
    const tooltip = mark.nextElementSibling;

    mark.addEventListener("mouseenter", function (e) {
      tooltip.classList.remove("hidden");
      tooltip.style.display = "block";
    });

    mark.addEventListener("mouseleave", function () {
      tooltip.classList.add("hidden");
      tooltip.style.display = "none";
    });
  });
});

document
  .getElementById("copyright")
  .appendChild(document.createTextNode(new Date().getFullYear()));
