from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)

# Load model
model = pickle.load(open('model/diabetes_model.sav', 'rb'))

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            input_data = [
                float(request.form['Pregnancies']),
                float(request.form['Glucose']),
                float(request.form['BloodPressure']),
                float(request.form['SkinThickness']),
                float(request.form['Insulin']),
                float(request.form['BMI']),
                float(request.form['DiabetesPedigreeFunction']),
                float(request.form['Age'])
            ]
            prediction = model.predict([input_data])[0]
            result = 'Terdiagnosis Diabetes' if prediction == 1 else 'Tidak Terdiagnosis Diabetes'
            return render_template('result.html', result=result)

        except ValueError:
            return render_template('result.html', result="Input tidak valid. Harap isi dengan angka.")

    return render_template('index.html')
