# 🚗 DGT Quiz · Permiso B

İspanyol ehliyet sınavı (DGT Permiso B) için interaktif quiz uygulaması. Hoy-Voy autoescuela kitabının 11-35. sayfalarına dayalı 50 soru, İspanyolca + Rusça çift dilli, sayfa referanslı.

## ✨ Özellikler

- **4 oyun modu:**
  - 🔥 **ARCADE** — Combo + Fever Mode + skor sistemi
  - 🎯 **PRÁCTICA** — Sınırsız can, öğrenmek için
  - 🏆 **EXAMEN** — 30 soru, 3 can, gerçek DGT simülasyonu
  - ⚡ **RÁPIDO** — 10 soruluk hızlı tur
- 50 DGT-tarzı soru (Tema 1, 2, 3, 4)
- Her sorunun yanlış cevabında **kitabın hangi sayfasına bakacağını** gösterir
- İspanyolca + Rusça çift dilli sorular ve açıklamalar
- Tema bazında filtreleme

---

## 🚀 GitHub'a yükleme + Vercel'e yayınlama (10 dakika)

### 1. GitHub'a kod yükle

**Yolu A — Web arayüzünden (en kolay):**

1. https://github.com/new adresine git
2. Repository ismi: `dgt-quiz` (ya da istediğin)
3. "Public" seç (Vercel ücretsiz tier için)
4. "Create repository" tıkla
5. Açılan sayfada **"uploading an existing file"** linkine tıkla
6. Bu klasördeki **TÜM dosyaları sürükle-bırak** (gizli `.gitignore` dahil)
7. "Commit changes" tıkla

**Yolu B — Komut satırından:**

```bash
cd dgt-quiz-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/dgt-quiz.git
git push -u origin main
```

### 2. Vercel'e bağla (otomatik yayın)

1. https://vercel.com/signup adresine git
2. **"Continue with GitHub"** ile GitHub hesabınla giriş yap
3. Dashboard'da **"Add New..." → "Project"** tıkla
4. Az önce oluşturduğun `dgt-quiz` repo'yu seç → **"Import"**
5. Vercel otomatik olarak Vite projesini tanır. Hiçbir şeyi değiştirme.
6. **"Deploy"** tıkla
7. ~30 saniye bekle. Bittiğinde sana bir URL verir, örneğin:
   ```
   https://dgt-quiz-abc123.vercel.app
   ```
8. **Bu URL'yi kız arkadaşına gönder.** İstediği yerden, telefonundan, açabilir.

### 3. Bonus: Daha güzel bir URL

Vercel'de proje açıkken **"Settings" → "Domains"** sekmesinden ücretsiz olarak özel bir alt domain alabilirsin:
- `dgt-quiz-bizim.vercel.app` gibi

---

## 💻 Lokal'de çalıştırmak (geliştirme)

Eğer kodu değiştirmek istersen:

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` aç.

### Yeni soru eklemek

`src/App.jsx` dosyasındaki `QUESTIONS` dizisine yeni obje ekle. Format:

```javascript
{
  id: 51,
  tema: 4,           // 1, 2, 3 veya 4
  page: 36,          // Hoy-Voy kitabındaki sayfa no
  difficulty: 'medium',
  es: {
    q: "Soru İspanyolca...",
    opts: ["Şık A", "Şık B", "Şık C"],
    correct: 1,      // 0, 1, veya 2 (doğru şık)
    exp: "Açıklama İspanyolca..."
  },
  ru: {
    q: "Вопрос на русском...",
    opts: ["А", "Б", "В"],
    correct: 1,
    exp: "Объяснение..."
  }
}
```

Değişiklikten sonra `git add . && git commit -m "yeni soru" && git push` — Vercel otomatik yeniden yayınlar.

---

## 📁 Dosya yapısı

```
dgt-quiz-app/
├── src/
│   ├── App.jsx          ← Ana uygulama (50 soru burada)
│   ├── main.jsx         ← React giriş noktası
│   └── index.css        ← Tailwind CSS
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🎮 Skor formülü (Arcade mod)

```
puan = (100 + kalan_saniye × 10) × çarpan

çarpan:
  combo 0-1   → ×1
  combo 2-4   → ×2
  combo 5+    → ×3 (FEVER MODE 🔥)
```

Hızlı + doğru + uzun combo = yüksek skor. 50 soruyu hatasız bitirip Fever Mode'da kalmak ~40.000+ puan kazandırır.

---

## 📝 Not

Bu uygulama bir bireysel çalışma aracıdır. Sorular DGT (İspanyol ulaştırma idaresi) kamuya açık trafik kurallarına dayalı, orijinal soru formülasyonlarıdır.

Sınav günü bol şans! · ¡Mucha suerte! · Удачи! 🍀
