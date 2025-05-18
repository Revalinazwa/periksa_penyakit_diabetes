import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
import pickle


class UserProfile:
    def __init__(self, nama, umur, jenis_kelamin, berat, tinggi, aktivitas, kondisi_kesehatan=None, target_diet=None):
        self.nama = nama
        self.umur = umur
        self.jenis_kelamin = jenis_kelamin
        self.berat = berat
        self.tinggi = tinggi
        self.aktivitas = aktivitas
        self.kondisi_kesehatan = kondisi_kesehatan or []
        self.target_diet = target_diet
        self.kebutuhan_air = self.hitung_kebutuhan_air()
        self.kebutuhan_kalori = self.hitung_kebutuhan_kalori()
        self.atur_target_diet_otomatis()


    def hitung_kebutuhan_air(self):
        dasar = self.berat * 35
        if self.aktivitas == 'Sedang':
            dasar += 500
        elif self.aktivitas == 'Berat':
            dasar += 1000
        return dasar / 1000

    def hitung_kebutuhan_kalori(self):
        kalori = 25 * self.berat
        if self.aktivitas == 'Sedang':
            kalori *= 1.3
        elif self.aktivitas == 'Berat':
            kalori *= 1.5
        return kalori

    def atur_target_diet_otomatis(self):
        if self.kondisi_kesehatan:
            if 'Diabetes' in self.kondisi_kesehatan:
                self.target_diet = 'Diet Rendah Karbohidrat dan Tinggi Serat'
            elif 'Hipertensi' in self.kondisi_kesehatan:
                self.target_diet = 'Diet Rendah Sodium'
            elif 'Jantung' in self.kondisi_kesehatan:
                self.target_diet = 'Diet Rendah Lemak dan Kolesterol'
            else:
                self.target_diet = 'Diet Seimbang'
        else:
            if not self.target_diet:
                self.target_diet = 'Pilih Sendiri'

class AdvancedDietRecommender:
    def __init__(self, food_data_path):
        self.food_df = pd.read_csv(food_data_path)
        self.features = ['Energi (Kal)', 'Protein (g)', 'Lemak (g)', 'Karbohidrat (g)', 'Serat (g)', 'Natrium (Na) (mg)']
        # Load scaler dan kmeans
        with open('./model/scaler.pkl', 'rb') as f:
            self.scaler = pickle.load(f)
        with open('./model/kmeans.pkl', 'rb') as f:
            self.kmeans = pickle.load(f)
        self.scaler = MinMaxScaler()
        self.X = self.scaler.fit_transform(self.food_df[self.features])
        self.X = self.scaler.transform(self.food_df[self.features])
        self.food_df['cluster'] = self.kmeans.predict(self.X)

    def rekomendasi_makanan(self, user: UserProfile, top_n=10):
        user_pref_vector = self.build_user_vector(user)
        user_scaled = self.scaler.transform([user_pref_vector])

        user_cluster = self.kmeans.predict(user_scaled)[0]

        cluster_foods = self.food_df[self.food_df['cluster'] == user_cluster]
        cluster_X = self.scaler.transform(cluster_foods[self.features])

        similarities = cosine_similarity(user_scaled, cluster_X)
        top_indices = similarities.argsort()[0][-top_n:][::-1]
        rekomendasi = cluster_foods.iloc[top_indices]

        return rekomendasi[['Nama Bahan Makanan'] + self.features]

    def build_user_vector(self, user: UserProfile):
        if user.target_diet == 'Diet Rendah Kalori':
            return [0, 0.5, 0.5, 0.5, 1, 0.5]
        elif user.target_diet == 'Diet Tinggi Protein':
            return [0.5, 1, 0.3, 0.3, 0.7, 0.5]
        elif user.target_diet == 'Diet Rendah Lemak':
            return [0.5, 0.5, 0, 0.5, 0.7, 0.5]
        elif user.target_diet == 'Diet Tinggi Serat':
            return [0.5, 0.5, 0.5, 0.5, 1, 0.5]
        elif user.target_diet == 'Diet Rendah Karbohidrat dan Tinggi Serat':
            return [0.5, 0.7, 0.5, 0, 1, 0.5]
        elif user.target_diet == 'Diet Rendah Sodium':
            return [0.5, 0.5, 0.5, 0.5, 0.5, 0]
        elif user.target_diet == 'Diet Rendah Lemak dan Kolesterol':
            return [0.5, 0.7, 0, 0.5, 0.7, 0.5]
        else:
            return [0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
