function handleGenderChange() {
  const gender = document.getElementById("jenis_kelamin").value;
  const pregnanciesInput = document.getElementById("pregnancies");

  if (gender === "Laki-laki") {
    pregnanciesInput.value = 0;
    pregnanciesInput.setAttribute("readonly", true);
    pregnanciesInput.classList.add("bg-gray-200", "cursor-not-allowed");
  } else {
    pregnanciesInput.removeAttribute("readonly");
    pregnanciesInput.value = "";
    pregnanciesInput.classList.remove("bg-gray-200", "cursor-not-allowed");
  }
}

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
// Set tanggal otomatis
document.getElementById("tanggal").value = new Date()
  .toISOString()
  .split("T")[0];
