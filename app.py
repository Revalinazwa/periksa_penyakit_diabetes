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

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_data = [
            float(data['Pregnancies']),
            float(data['Glucose']),
            float(data['BloodPressure']),
            float(data['SkinThickness']),
            float(data['Insulin']),
            float(data['BMI']),
            float(data['DiabetesPedigreeFunction']),
            float(data['Age'])
        ]
        prediction = model.predict([input_data])[0]
        result = '✅ Terdiagnosis Diabetes' if prediction == 1 else '🟢 Tidak Terdiagnosis Diabetes'
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'result': f"⚠️ Error: {str(e)}"}), 400
    

@app.route('/diet_recommendation', methods=['GET', 'POST'])
def diet_recommendation():
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
        return render_template('result_diet.html', nama=nama, rekomendasi=rekomendasi)

    return render_template('diet_recommendation.html')

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000,debug=True) #run for ngrok
