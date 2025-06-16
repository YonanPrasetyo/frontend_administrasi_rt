## Langkah-Langkah Menjalankan

1. Clone Repositori
```bash
git clone https://github.com/YonanPrasetyo/frontend_administrasi_rt.git
cd frontend_administrasi_rt
```

2. Instal Dependensi
```bash
npm install
```

3. Konfigurasi .env
```bash
cp .env.example .env
```
- Ganti konfigurasi berikut:
```env
REACT_APP_API_URL=masukkan_url_api_backend + /api
```
jangan lupa tambahkan /api di belakangnya

4. Jalankan Aplikasi
```bash
npm start
```