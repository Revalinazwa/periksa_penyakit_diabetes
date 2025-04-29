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
