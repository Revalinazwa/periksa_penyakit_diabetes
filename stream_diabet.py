import pickle
import streamlit as st

# load model
diabetes_model = pickle.load(open('diabetes_model.sav', 'rb'))

st.title('Pemeriksaan Diabetes')
st.header('Masukkan data pasien untuk memprediksi diabetes')

col1, col2 = st.columns(2)

with col1:
    Pregnancies = st.text_input('Nilai Pregnancies')
    
with col2:
    Glucose = st.text_input('Nilai Glukosa')

with col1:
    BloodPressure = st.text_input('Nilai Tekanan Darah')
    
with col2:
    SkinThickness = st.text_input('Nilai Ketebalan Kulit')

with col1:
    Insulin = st.text_input('Nilai Insulin')
    
with col2:
    BMI = st.text_input('Nilai BMI')

with col1:
    DiabetesPedigreeFunction = st.text_input('Nilai Fungsi Pedigri Diabetes')
    
with col2:
    Age = st.text_input('Umur Pasien')

# ubah input menjadi float
if st.button('Prediksi Diabetes'):
    try:
        input_data = [
            float(Pregnancies),
            float(Glucose),
            float(BloodPressure),
            float(SkinThickness),
            float(Insulin),
            float(BMI),
            float(DiabetesPedigreeFunction),
            float(Age)
        ]
        diab_prediction = diabetes_model.predict([input_data])

        if diab_prediction[0] == 0:
            diab_diagnosis = 'Status: Tidak Terdiagnosis Diabetes'
        else:
            diab_diagnosis = 'Status: Terdiagnosis Diabetes'
        
        st.success(diab_diagnosis)

    except ValueError:
        st.error("Semua input harus berupa angka.")