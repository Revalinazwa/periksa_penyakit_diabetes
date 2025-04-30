document.addEventListener("DOMContentLoaded", function () {
  // Show tooltips on hover
  const questionIcons = document.querySelectorAll(".cursor-help");

  questionIcons.forEach((icon) => {
    const tooltip = icon.parentElement.querySelector("div");

    icon.addEventListener("mouseenter", () => {
      tooltip.classList.remove("hidden");
      tooltip.classList.add("flex");
    });

    icon.addEventListener("mouseleave", () => {
      tooltip.classList.add("hidden");
      tooltip.classList.remove("flex");
    });
  });
});
