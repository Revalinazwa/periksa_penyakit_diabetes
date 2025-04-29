from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
from module.diet_recomendation import UserProfile , AdvancedDietRecommender

app = Flask(__name__)

recommender = AdvancedDietRecommender('dataset/food_data_clean.csv')

# Load model
model = pickle.load(open('model/diabetes_model.sav', 'rb'))

@app.route('/',methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/diabetesCheck', methods=['GET', 'POST'])
def diabetesCheck():
    if request.method == 'POST':
        try:
            # Ambil dan konversi input
            Pregnancies = float(request.form['Pregnancies'])
            Glucose = float(request.form['Glucose'])
            BloodPressure = float(request.form['BloodPressure'])
            SkinThickness = float(request.form['SkinThickness'])
            Insulin = float(request.form['Insulin'])
            BMI = float(request.form['BMI'])
            DiabetesPedigreeFunction = float(request.form['DiabetesPedigreeFunction'])
            Age = float(request.form['Age'])
            nama = request.form['nama']
            tanggal = request.form['tanggal']
            jenis_kelamin = request.form['jenis_kelamin']

            # Buat list input dan prediksi
            input_data = [Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age]
            prediction = model.predict([input_data])[0]
            result = 'Terdiagnosis Diabetes' if prediction == 1 else 'Tidak Terdiagnosis Diabetes'

            # Kirim semua data ke template
            return render_template(
                'diabetesResult.html',
                pregnancies=Pregnancies,
                result=result,
                glucose=Glucose,
                blood_pressure=BloodPressure,
                skin_thickness=SkinThickness,
                insulin=Insulin,
                diabetes_pedigree_function=DiabetesPedigreeFunction,
                bmi=BMI,
                age=Age,
                nama=nama,
                tanggal=tanggal,
                jenis_kelamin=jenis_kelamin
            )

        except ValueError:
            return render_template('diabetesResult.html', result="Input tidak valid. Harap isi dengan angka.")

    return render_template('diabetesCheck.html')
    

@app.route('/dietRecommendation', methods=['GET', 'POST'])
def dietRecommendation():
    if request.method == 'POST':
        nama = request.form['nama']
        umur = int(request.form['umur'])
        jenis_kelamin = request.form['jenis_kelamin']
        berat = float(request.form['berat'])
        tinggi = float(request.form['tinggi'])
        aktivitas = request.form['aktivitas']
        kondisi_kesehatan = request.form.getlist('kondisi_kesehatan')
        target_diet = request.form.get('target_diet')

        user = UserProfile(nama, umur, jenis_kelamin, berat, tinggi, aktivitas, kondisi_kesehatan, target_diet)

        rekomendasi = recommender.rekomendasi_makanan(user)
        print(rekomendasi)
        return render_template('dietResult.html', nama=nama, rekomendasi=rekomendasi)

    return render_template('dietRecommendation.html')

@app.route('/aboutUs')
def aboutUs():
    return render_template('aboutUs.html')

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000,debug=True) #run for ngrok
