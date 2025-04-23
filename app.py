from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

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

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000,debug=True) #run for ngrok
