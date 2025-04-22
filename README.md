# Periksa Penyakit Diabetes

Aplikasi web untuk memprediksi kemungkinan diabetes berdasarkan parameter kesehatan menggunakan algoritma Support Vector Machine (SVM).

## Deskripsi Proyek

Proyek ini adalah aplikasi prediksi diabetes yang dibangun menggunakan Flask sebagai framework backend dan HTML dengan Tailwind CSS untuk frontend. Aplikasi ini menggunakan model machine learning SVM (Support Vector Machine) yang dilatih pada dataset Pima Indians Diabetes.

Pengguna dapat memasukkan parameter kesehatan mereka ke dalam formulir web, dan aplikasi akan memprediksi apakah pengguna berisiko terkena diabetes atau tidak berdasarkan model yang telah dilatih.

## Dataset

Dataset yang digunakan dalam proyek ini adalah [Pima Indians Diabetes Database](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database) dari Kaggle, yang berisi informasi medis dari pasien wanita keturunan Pima Indian serta status diabetes mereka. Dataset ini terdiri dari beberapa fitur seperti:

- Jumlah kehamilan
- Kadar glukosa
- Tekanan darah
- Ketebalan kulit
- Insulin
- BMI (Body Mass Index)
- Diabetes Pedigree Function
- Usia

## Teknologi yang Digunakan

- **Backend**: Python Flask
- **Frontend**: HTML, CSS (Tailwind CSS)
- **Machine Learning**: Scikit-Learn (SVM)
- **Data Processing**: Pandas, NumPy

## Cara Menginstal dan Menjalankan

### Prasyarat

- Python 3.8 atau lebih tinggi
- pip (Python package manager)

### Langkah-langkah Instalasi

1. Clone repositori ini:

   ```bash
   git clone https://github.com/ahmadseloabadi/periksa_penyakit_diabetes.git
   cd periksa_penyakit_diabetes
   ```

2. Buat dan aktifkan virtual environment (disarankan):

   ```bash
   python -m venv venv
   # Di Windows
   venv\Scripts\activate
   # Di macOS/Linux
   source venv/bin/activate
   ```

3. Instal dependensi yang diperlukan:

   ```bash
   pip install -r requirements.txt
   ```

4. Jalankan aplikasi:

   ```bash
   python app.py
   ```

5. Buka browser dan akses `http://localhost:5000` atau `http://127.0.0.1:5000`.

## Struktur Proyek

```
periksa_penyakit_diabetes/
│
├── dataset/
│   └── diabetes.csv                # Dataset Pima Indians Diabetes
│
├── models/
│   └── diabetes_model.sav          # Model SVM terlatih (pickle file)
│
├── static/
│   ├── css/                        # File CSS dan Tailwind
│   ├── js/                         # File JavaScript
│   └── img/                     # Gambar dan aset
│
├── templates/
│   ├── index.html                  # Halaman utama
│
├── app.py                          # Aplikasi Flask utama
├── requirements.txt                # Dependensi Python
└── README.md                       # Dokumentasi proyek
```

## Penggunaan Aplikasi

1. Buka halaman utama aplikasi
2. Isi formulir dengan parameter kesehatan Anda
3. Klik tombol "Prediksi" untuk melihat hasil
4. Sistem akan menampilkan hasil prediksi berdasarkan data yang dimasukkan

## Model Machine Learning

Aplikasi ini menggunakan algoritma Support Vector Machine (SVM) untuk klasifikasi. Model telah dilatih menggunakan dataset Pima Indians Diabetes

### Performa Model

- Training Accuracy: 78.3%
- Testing Accuracy: 77.2%

## Pengembangan Mendatang

- Menambahkan lebih banyak algoritma machine learning untuk perbandingan
- Meningkatkan antarmuka pengguna dengan visualisasi data
- Menambahkan fitur autentikasi untuk menyimpan riwayat prediksi pengguna
- Mengembangkan API untuk integrasi dengan aplikasi lain

## Kontribusi

Kontribusi untuk proyek ini sangat diterima. Untuk berkontribusi:

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## Kontak

Ahmad Selo Abadi - [ahmadseloabadi](https://www.instagram.com/ahmad.selo.abadi/)

revalinazwa - [revalinazwa](https://www.instagram.com/revalinazwa)

## Pengakuan

- [Dataset Pima Indians Diabetes](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database)
- [Flask](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Scikit-Learn](https://scikit-learn.org/)
