document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
  });

  // Create nutrition chart
  createNutritionChart();
});

function createNutritionChart() {
  const ctx = document.getElementById("nutritionChart").getContext("2d");

  // Extract data from the table
  const tableRows = document.querySelectorAll("table tbody tr");
  const labels = [];
  const caloriesData = [];
  const proteinData = [];
  const fatData = [];
  const carbsData = [];
  const fiberData = [];

  // Only use the first 5 items for cleaner visualization
  const maxItems = Math.min(5, tableRows.length);
  for (let i = 0; i < maxItems; i++) {
    const cells = tableRows[i].querySelectorAll("td");
    labels.push(cells[0].textContent);
    caloriesData.push(parseFloat(cells[1].textContent));
    proteinData.push(parseFloat(cells[2].textContent));
    fatData.push(parseFloat(cells[3].textContent));
    carbsData.push(parseFloat(cells[4].textContent));
    fiberData.push(parseFloat(cells[5].textContent));
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Protein (g)",
          data: proteinData,
          backgroundColor: "rgba(239, 68, 68, 0.7)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
        },
        {
          label: "Lemak (g)",
          data: fatData,
          backgroundColor: "rgba(245, 158, 11, 0.7)",
          borderColor: "rgba(245, 158, 11, 1)",
          borderWidth: 1,
        },
        {
          label: "Karbohidrat (g)",
          data: carbsData,
          backgroundColor: "rgba(16, 185, 129, 0.7)",
          borderColor: "rgba(16, 185, 129, 1)",
          borderWidth: 1,
        },
        {
          label: "Serat (g)",
          data: fiberData,
          backgroundColor: "rgba(139, 92, 246, 0.7)",
          borderColor: "rgba(139, 92, 246, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Perbandingan Nutrisi Makanan",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Nutrition modal functions
function showNutritionModal(foodName, calories, protein, fat, carbs, fiber) {
  document.getElementById("modalFoodName").textContent = foodName;
  document.getElementById("modalCalories").textContent = calories;
  document.getElementById("modalProtein").textContent = protein;
  document.getElementById("modalFat").textContent = fat;
  document.getElementById("modalCarbs").textContent = carbs;
  document.getElementById("modalFiber").textContent = fiber;

  // Create modal chart
  const modalCtx = document
    .getElementById("modalNutritionChart")
    .getContext("2d");
  console.log(modalCtx);
  // Destroy previous chart if exists
  if (window.modalChart) {
    window.modalChart.destroy();
  }

  window.modalChart = new Chart(modalCtx, {
    type: "doughnut",
    data: {
      labels: ["Protein", "Lemak", "Karbohidrat", "Serat"],
      datasets: [
        {
          data: [protein, fat, carbs, fiber],
          backgroundColor: [
            "rgba(239, 68, 68, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(139, 92, 246, 0.7)",
          ],
          borderColor: [
            "rgba(239, 68, 68, 1)",
            "rgba(245, 158, 11, 1)",
            "rgba(16, 185, 129, 1)",
            "rgba(139, 92, 246, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Komposisi Nutrisi",
        },
      },
    },
  });

  // Show modal
  document.getElementById("nutritionModal").classList.remove("hidden");
  document.getElementById("nutritionModal").classList.add("flex");
}

function closeModal() {
  document.getElementById("nutritionModal").classList.add("hidden");
  document.getElementById("nutritionModal").classList.remove("flex");
}

// Close modal when clicking outside
document
  .getElementById("nutritionModal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

function handleButtonClick(button) {
  const foodName = JSON.parse(button.dataset.food); // karena tojson
  const calories = parseFloat(button.dataset.calories);
  const protein = parseFloat(button.dataset.protein);
  const fat = parseFloat(button.dataset.fat);
  const carbs = parseFloat(button.dataset.carbs);
  const fiber = parseFloat(button.dataset.fiber);
  console.log(foodName, calories, protein, fat, carbs, fiber);
  showNutritionModal(foodName, calories, protein, fat, carbs, fiber);
}
