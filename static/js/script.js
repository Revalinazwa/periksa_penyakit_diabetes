document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: true,
  });
});

window.addEventListener("scroll", function () {
  AOS.refresh();
});

document
  .getElementById("copyright")
  .appendChild(document.createTextNode(new Date().getFullYear()));
