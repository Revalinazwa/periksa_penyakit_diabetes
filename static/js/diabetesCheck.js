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
// Set tanggal otomatis
document.getElementById("tanggal").value = new Date()
  .toISOString()
  .split("T")[0];
