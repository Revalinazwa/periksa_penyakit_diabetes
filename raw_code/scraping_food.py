import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
import pandas as pd
import time

# Setup Chrome options
options = uc.ChromeOptions()
# options.add_argument("--headless")  # Jangan headless dulu supaya aman dari Cloudflare
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# Inisialisasi webdriver pakai undetected_chromedriver
driver = uc.Chrome(options=options)

# Buka halaman
url = "https://www.andrafarm.com/_andra.php?_i=daftar-tkpi&BK_HP=Laptop&jobs=&urut=2&asc=000011111&sby=&no1=2&knama=Semua"
driver.get(url)

# Tunggu halaman termuat (bisa lebih panjang kalau koneksi lambat)
time.sleep(10)

data = []
page = 1

while True:
    print(f"Scraping halaman {page}...")
    # Ambil semua baris tabel makanan
    rows = driver.find_elements(By.XPATH, "//html/body/table[2]/tbody/tr/td/table//tr[position()>1]")  # skip header


    for row in rows:
        cols = row.find_elements(By.TAG_NAME, "td")
        if len(cols) >= 28:  # Pastikan semua kolom tersedia
            makanan = {
                "No": cols[0].text,
                "Kode Baru": cols[1].text,
                "Nama Bahan Makanan": cols[2].text,
                "Air (g)": cols[3].text,
                "Energi (Kal)": cols[4].text,
                "Protein (g)": cols[5].text,
                "Lemak (g)": cols[6].text,
                "Karbohidrat (g)": cols[7].text,
                "Serat (g)": cols[8].text,
                "Abu (g)": cols[9].text,
                "Kalsium (Ca) (mg)": cols[10].text,
                "Fosfor (P) (mg)": cols[11].text,
                "Besi (Fe) (mg)": cols[12].text,
                "Natrium (Na) (mg)": cols[13].text,
                "Kalium (Ka) (mg)": cols[14].text,
                "Tembaga (Cu) (mg)": cols[15].text,
                "Seng (Zn) (mg)": cols[16].text,
                "Retinol (vit. A) (mcg)": cols[17].text,
                "β-karoten (mcg)": cols[18].text,
                "Karoten total (mcg)": cols[19].text,
                "Thiamin (vit. B1) (mg)": cols[20].text,
                "Riboflavin (vit. B2) (mg)": cols[21].text,
                "Niasin (mg)": cols[22].text,
                "Vitamin C (mg)": cols[23].text,
                "BDD (%)": cols[24].text,
                "Mentah/Olahan": cols[25].text,
                "Kelompok Makanan": cols[26].text,
                "Sumber TKPI 2019": cols[27].text
            }
            data.append(makanan)

    try:
        # Cari tombol halaman berikutnya berdasarkan nomor
        page += 1
        page_link = driver.find_element(By.LINK_TEXT, str(page))
        driver.execute_script("arguments[0].scrollIntoView();", page_link)  # Scroll agar tombol kelihatan
        page_link.click()
        time.sleep(3)  # Tunggu halaman pindah
    except:
        print("Tidak ada halaman berikutnya. Selesai scraping.")
        break


driver.quit()

# Simpan ke file CSV
df = pd.DataFrame(data)
df.to_csv("./dataset/food_data.csv", index=False)

print("Data berhasil disimpan ke 'food_data.csv'")
