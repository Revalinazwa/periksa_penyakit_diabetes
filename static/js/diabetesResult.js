document.addEventListener("DOMContentLoaded", function () {
  // Set tanggal pemeriksaan
  const today = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = today.toLocaleDateString("id-ID", options);

  if (
    document
      .getElementById("examDate")
      .textContent.includes("{{ examination_date }}")
  ) {
    document.getElementById("examDate").textContent = formattedDate;
  }

  // Set kode pemeriksaan acak jika belum ada
  if (
    document.getElementById("examCode") &&
    document.getElementById("examCode").textContent.includes ===
      "{{ examination_code }}"
  ) {
    const randomCode = "DMB-" + Math.floor(Math.random() * 90000 + 10000);
    document.getElementById("examCode").textContent = randomCode;
  }

  // Ambil data dari input tersembunyi
  const pregnancies =
    parseFloat(document.getElementById("pregnancies").value) || 0;
  const glucose = parseFloat(document.getElementById("glucose").value) || 0;
  const bloodPressure =
    parseFloat(document.getElementById("blood_pressure").value) || 0;
  const skinThickness =
    parseFloat(document.getElementById("skin_thickness").value) || 0;
  const insulin = parseFloat(document.getElementById("insulin").value) || 0;
  const bmi = parseFloat(document.getElementById("bmi").value) || 0;
  const diabetesPedigree =
    parseFloat(document.getElementById("diabetes_pedigree_function").value) ||
    0;
  const age = parseFloat(document.getElementById("age").value) || 0;

  // Tampilkan nilai di kartu parameter jika ada
  if (document.getElementById("pregnanciesValue")) {
    document.getElementById("pregnanciesValue").textContent = pregnancies;
  }
  if (document.getElementById("glucoseValue")) {
    document.getElementById("glucoseValue").textContent = glucose + " mg/dL";
  }
  if (document.getElementById("bpValue")) {
    document.getElementById("bpValue").textContent = bloodPressure + " mmHg";
  }
  if (document.getElementById("skinThicknessValue")) {
    document.getElementById("skinThicknessValue").textContent =
      skinThickness + " mm";
  }
  if (document.getElementById("insulinValue")) {
    document.getElementById("insulinValue").textContent = insulin + " μU/ml";
  }
  if (document.getElementById("bmiValue")) {
    document.getElementById("bmiValue").textContent = bmi + " kg/m²";
  }
  if (document.getElementById("pedigreeValue")) {
    document.getElementById("pedigreeValue").textContent =
      diabetesPedigree.toFixed(3);
  }
  if (document.getElementById("ageValue")) {
    document.getElementById("ageValue").textContent = age + " tahun";
  }

  // Render chart
  renderRiskChart([
    pregnancies,
    glucose,
    bloodPressure,
    skinThickness,
    insulin,
    bmi,
    diabetesPedigree,
    age,
  ]);
});

function renderRiskChart(data) {
  const ctx = document.getElementById("riskChart").getContext("2d");

  // Ambil referensi nilai normal untuk parameter
  const referenceValues = [
    { min: 0, max: 2, param: "Kehamilan" }, // Tidak ada nilai referensi untuk kehamilan
    { min: 90, max: 150, param: "Glukosa (mg/dL)" }, // Glukosa normal: 70-99 mg/dL
    { min: 90, max: 120, param: "T. Darah (mmHg)" }, // Tekanan darah normal: <120 mmHg (sistolik)
    { min: 10, max: 25, param: "T. Kulit (mm)" }, // Ketebalan kulit tricep normal: sekitar 10-25 mm
    { min: 16, max: 166, param: "Insulin (μU/ml)" }, // Insulin normal: sekitar 16-166 μU/ml
    { min: 18.5, max: 24.9, param: "BMI (kg/m²)" }, // BMI normal: 18.5-24.9
    { min: 0.1, max: 2, param: "F. Pedigree" }, // Diabetes Pedigree Function - nilai lebih tinggi berarti risiko lebih besar
    { min: 0, max: 70, param: "Umur (tahun)" }, // Tidak ada nilai referensi untuk umur
  ];

  // Determine danger level by color based on reference values
  const getBackgroundColors = (values, references) => {
    return values.map((value, i) => {
      // Kehamilan dan umur tidak memiliki batasan normal/tinggi, gunakan warna yang netral
      if (i === 0 || i === 7) return "#9333EA"; // Kehamilan & umur - ungu

      // Untuk parameter lain, tentukan warna berdasarkan nilainya
      if (value < references[i].min) return "#60A5FA"; // Di bawah normal - biru
      if (value <= references[i].max) return "#34D399"; // Normal - hijau
      if (value > references[i].max * 1.5) return "#EF4444"; // Sangat tinggi - merah
      return "#FBBF24"; // Di atas normal - kuning
    });
  };

  const backgroundColors = getBackgroundColors(data, referenceValues);

  // Create labels with parameter names and values
  const labels = referenceValues.map((ref, i) => {
    return ref.param;
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Nilai Anda",
          data: data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map((color) =>
            color
              .replace("FA", "B0")
              .replace("99", "70")
              .replace("24", "00")
              .replace("71", "50")
          ),
          borderWidth: 1,
          borderRadius: 8,
        },
        {
          label: "Batas Normal",
          type: "bar",
          data: referenceValues.map((ref) => ref.min),
          backgroundColor: "rgba(156, 163, 175, 0.1)", // abu-abu muda
          borderWidth: 0,
          stack: "normal-range",
        },
        {
          label: "Rentang Normal",
          type: "bar",
          data: referenceValues.map((ref) => ref.max - ref.min),
          backgroundColor: "rgba(34, 197, 94, 0.3)", // hijau transparan
          borderWidth: 0,
          stack: "normal-range",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const dataIndex = context.dataIndex;
              const value = context.raw;
              const ref = referenceValues[dataIndex];

              if (context.datasetIndex === 0) {
                let status = "";
                let unitLabels = [
                  "",
                  "mg/dL",
                  "mmHg",
                  "mm",
                  "μU/ml",
                  "kg/m²",
                  "",
                  "tahun",
                ];
                let valueWithUnit =
                  value +
                  (unitLabels[dataIndex] ? " " + unitLabels[dataIndex] : "");

                // Kehamilan dan umur, dan fungsi pedigree tidak memiliki range "normal"
                if (dataIndex === 0) {
                  return `Kehamilan: ${value}`;
                } else if (dataIndex === 6) {
                  return `Fungsi Pedigree: ${value.toFixed(3)}`;
                } else if (dataIndex === 7) {
                  return `Umur: ${value} tahun`;
                }

                if (value < ref.min) {
                  status = "Di bawah normal";
                } else if (value <= ref.max) {
                  status = "Normal";
                } else {
                  status = "Di atas normal";
                }

                return [
                  `Nilai: ${valueWithUnit}`,
                  `Status: ${status}`,
                  `Normal: ${ref.min}-${ref.max} ${unitLabels[dataIndex]}`,
                ];
              }
              return `Batas Normal: ${value}`;
            },
          },
        },
      },
      scales: {
        y: {
          stacked: true,
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });
}

// Download PDF dengan pengaturan yang lebih baik
function downloadPDF() {
  // Elemen yang akan diunduh
  const element = document.querySelector(".download-area");

  // Konfigurasi PDF
  const options = {
    margin: 10,
    filename: "hasil_pemeriksaan_diabetes.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  // Notifikasi sedang mengunduh
  const downloadButton = document.querySelector(
    "button[onclick='downloadPDF()']"
  );
  const originalText = downloadButton.innerHTML;
  downloadButton.innerHTML =
    '<i class="fas fa-spinner fa-spin mr-2"></i> Sedang Menyiapkan...';
  downloadButton.disabled = true;

  // Proses unduh
  html2pdf()
    .set(options)
    .from(element)
    .save()
    .then(() => {
      // Kembalikan tombol ke status semula setelah selesai
      setTimeout(() => {
        downloadButton.innerHTML = originalText;
        downloadButton.disabled = false;
      }, 2000);
    });
}

document
  .getElementById("copyright")
  .appendChild(document.createTextNode(new Date().getFullYear()));
