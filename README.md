# Community Hub İzmir — QR Menü

Mobil öncelikli, tek sayfalık statik menü. Framework ya da build adımı yok; GitHub Pages'te doğrudan çalışır.

## Klasör yapısı

```
index.html          Sayfa iskeleti
css/style.css       Tasarım
js/menu-data.js     TÜM menü içeriği (ürün, fiyat, açıklama)
js/app.js           İçeriği sayfaya yerleştirir
assets/img/         Logo, illüstrasyonlar, kampanya görselleri
```

## GitHub Pages'e yükleme

1. GitHub'da yeni bir repo aç (ör. `ch-menu-izmir`), Public olarak.
2. Zip'i aç, içindeki dosyaları (index.html en üst seviyede olacak şekilde) repoya yükle: **Add file → Upload files**.
3. **Settings → Pages → Build and deployment**: Source `Deploy from a branch`, Branch `main` / `(root)` → Save.
4. 1-2 dakika sonra link hazır olur: `https://KULLANICIADI.github.io/ch-menu-izmir/`
5. QR kodu bu linkten üret. Link sabit kaldığı sürece fiyat güncellemelerinde QR değişmez.

## Fiyat / ürün güncelleme

Sadece `js/menu-data.js` dosyasını düzenle (GitHub'da dosyayı aç → kalem ikonu → Commit).
Güncelleme tarihi de aynı dosyanın en üstünde (`guncelleme`).

Kampanya görselini değiştirmek için yeni görseli `assets/img/` içine yükleyip `kampanyalar` listesindeki dosya adını güncelle. Önerilen boyut: 900×1125 px (4:5).

## Notlar

- Yazı tipleri Google Fonts'tan gelir (Oranienbaum, Jost). İnternet olmadan sistem fontlarıyla açılır.
- Kampanya görsellerine dokununca büyür.
- Sekmeler kaydırdıkça aktif bölümü gösterir.
