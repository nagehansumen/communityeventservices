# Community Event Services — site dosyaları

Statik site. Derleme adımı, npm kurulumu, sunucu gereksinimi yok.
`index.html` dosyasını tarayıcıda açarak birebir çalışan hâlini görebilirsiniz.

---

## 1. Yayına alma

Klasörün tamamını sürükleyip bırakın:

- **Netlify** — netlify.com/drop adresine klasörü bırakın, 30 saniyede yayında.
- **Vercel** — yeni proje, framework "Other", root klasör bu klasör.
- **Kendi hosting'iniz** — FTP ile `public_html` içine kopyalayın.

Alan adı bağlandıktan sonra `sitemap.xml`, `robots.txt` ve sayfalardaki
`canonical` etiketlerinde geçen `communityeventservices.com` adresini
gerçek alan adıyla değiştirin.

---

## 2. Tek düzenleme dosyası: `assets/js/config.js`

Sitedeki değişken bilgilerin tamamı burada. Başka dosyaya dokunmanız gerekmez.

| Alan | Ne işe yarar |
|---|---|
| `contact` | E-posta, WhatsApp, Instagram. Header, footer ve form buradan besleniyor. |
| `stats` | Anasayfadaki 4 rakam. **Şu an müşteri onayı bekliyor.** |
| `hub` | Community Hub kapasite / teknik imkanlar / adres. Adres, `mapUrl` ile Google Haritalar'a bağlanıyor. |
| `form.endpoint` | Form gönderim adresi (aşağıya bakın). |

### Form nereye düşüyor?
- `form.endpoint` **boşsa**: form doldurulunca bilgiler WhatsApp mesajı olarak
  hazırlanır ve WhatsApp açılır. Kimseye "gönderildi" denmez, mesajı siz onaylarsınız.
- `form.endpoint` **doluysa**: veriler doğrudan oraya POST edilir.
  Ücretsiz seçenek: [Formspree](https://formspree.io) — hesap açın, form oluşturun,
  verdiği adresi buraya yapıştırın:
  ```js
  form: { endpoint: "https://formspree.io/f/xxxxxxx" }
  ```

---

## 3. Görseller

`assets/img/` içinde. Her fotoğrafın iki boyutu var (`-700` ve `-1400` webp);
dosya sayısını GitHub'ın 100 dosya sınırının altında tutmak için tek format
kullanıldı. WebP, 2020'den bu yana tüm güncel tarayıcılarda destekleniyor.
Yeni görsel eklerken aynı isimlendirmeyi koruyun ya da tek dosya koyup
HTML'deki `srcset` satırını silin.

Marka logoları `assets/img/logo-*.png` olarak duruyor.

**Değiştirilmesi gereken yer tutucular:**

| Nerede | Ne eksik |
|---|---|
| Tematik Quizler → tema kartları | Görsel yok; kartlar tipografik kurgulandı, görsel gelirse fotoğraflı karta çevrilebilir |
| Anasayfa → rakamlar | `config.js` içindeki 4 rakam |

---

## 4. Türkçe glif kontrolü

`kontrol/glif-testi.html` dosyasını tarayıcıda açın. **ş Ş ğ Ğ İ ı ç Ç ö Ö ü Ü**
harflerinin hepsi aynı yazı tipiyle görünmeli. Bir harf başka fonta düşüyorsa
(kalınlık farkı hemen belli olur) o yazı tipi kullanılmamalı.

Kullanılan yazı tipleri: **Archivo** (başlık, variable — genişlik ekseniyle
kondens/geniş ayarlanıyor) ve **Inter** (metin). İkisi de Latin Extended-A
desteğiyle yükleniyor. Calibri ve Türkçe karakter desteği olmayan yazı tipleri
kullanılmadı.

---

## 5. Dosya yapısı

Tüm sayfalar tek klasörde, her birinin adı benzersiz. Alt klasör yok — sürükle-bırak
yüklemelerde dosyaların birbirinin üzerine yazma ihtimali ortadan kalktı.

```
index.html               Anasayfa
hakkimizda.html
tematik-quizler.html
workshoplar.html
partiler.html
referanslarimiz.html
teklif-al.html
glif-testi.html          Kontrol sayfası (yayına girmesi gerekmez)
robots.txt / sitemap.xml
assets/css/styles.css    Tüm tasarım sistemi
assets/js/config.js      ← düzenlenecek tek dosya
assets/js/app.js         Etkileşim katmanı
assets/img/              Görseller ve marka logoları
```

Renk ve tipografi değerleri `styles.css` en üstteki `:root` bloğunda.

## 6. Teknik notlar

- Geçmiş etkinlikler (Alarko Tarım, Zorlu, Arsan Kauçuk) hem anasayfada hem Referanslar sayfasında aynı bileşenle görünüyor; `build` içindeki `PAST_EVENTS` listesi tek kaynak.
- Marka logoları `assets/img/logo-*.png` olarak duruyor, beyaz plaka üzerine oturuyor.
- Hareketlerin tamamı `prefers-reduced-motion` tercihini dinliyor.
- Klavye ile gezinme, açılır menü ve form etiketleri erişilebilir kurgulandı.
- Turuncu bloklarda gövde metni mürekkep renginde: beyaz metin bu turuncuda
  4.5:1 kontrast eşiğini geçmiyor.
- Mobilde imleç efektleri, ağır paralaks ve blob kaymaları kapalı.
- Görseller `webp` + `srcset` ile servis ediliyor, hero görseli öncelikli yükleniyor.
