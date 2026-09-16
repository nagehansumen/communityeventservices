/*
  COMMUNITY HUB İZMİR — MENÜ İÇERİĞİ
  Fiyat ya da ürün güncellemek için sadece bu dosyayı düzenleyin.
  Tat etiketleri (kokteyller): "tatli", "eksi", "baharatli", "aci"
*/
window.MENU = {
  guncelleme: "YASAL UYARI: Bu menüdeki fiyatlar 03.08.2026 tarihinde güncellenmiştir.",
  vergi: "Fiyatlara KDV ve diğer tüm vergiler dahildir.",

  kokteyl: {
    not: "Mocktail seçeneklerimiz alkolsüzdür.",
    urunler: [
      { no: 1, ad: "Lumina", cocktail: "585 TL", mocktail: "345 TL",
        icerik: "Gordon's Gin, Kuzu Kulağı, Tatlı & Ekşi Mix", tat: ["eksi"] },
      { no: 2, ad: "Sunset at Galata", cocktail: "585 TL", mocktail: "345 TL",
        icerik: "Smirnoff Vodka ile Demlenmiş Chilli Biber, Hibiskus & Passion & Yenilebilir Sim Mix, Tatlı & Ekşi Sos", tat: ["eksi", "tatli", "aci"] },
      { no: 3, ad: "Pera Dream", cocktail: "585 TL", mocktail: "345 TL",
        icerik: "Campari, Tatlı Limon Likörü, Narenciye Sos,Fesleğen Sos", tat: ["eksi", "tatli"] },
      { no: 4, ad: "Tunel Rush", cocktail: "585 TL", mocktail: "345 TL",
        icerik: "Olmeca Tekila, Reyhan & Mandalina Sos, Tatlı & Ekşi Sos, Tonik", tat: ["eksi", "tatli"] },
      { no: 5, ad: "Atlas Punch", cocktail: "585 TL", mocktail: "345 TL",
        icerik: "Smirnoff Votka, Tatlı & Ekşi Sos, Nar & Biberiye Sos", tat: ["tatli"] },
      { no: 6, ad: "Tram Tram", cocktail: "585 TL", mocktail: "345 TL",
        icerik: "Gordon's Cin, Antep Fıstığı Sos, Ekşi Limon Likörü & Tatlı Sos", tat: ["tatli", "baharatli"] },
      { no: 7, ad: "SES 1885", cocktail: "585 TL", mocktail: "345 TL",
        icerik: "Johnie Walker Black Label Viski, Şeftali & Karanfil Sos, Jagermeister, Tatlı & Ekşi Sos", tat: ["eksi", "tatli", "baharatli"] },
      { no: 8, ad: "Istiklal Fusion", cocktail: "585 TL", mocktail: "345 TL",
        icerik: "Captain Morgan Rum, Ananas Sos, Mandalina Sos, Tatlı & Ekşi Sos", tat: ["eksi", "tatli"] },
      { no: 9, ad: "Naum Theatre", cocktail: "585 TL", mocktail: "345 TL",
        icerik: "Smirnoff Votka, Tatlı & Ekşi Sos, Blue Curacao, Ananas Sos, Blue Redbull", tat: ["tatli"] }
    ]
  },

  yemek: [
    { ad: "Patates Kızartması", fiyat: "245 TL", icerik: "250 Gram- 3 adet dip sos ile servis edilir" },
    { ad: "Elma Dilim Patates", fiyat: "265 TL", icerik: "250 Gram- 3 adet dip sos ile servis edilir" },
    { ad: "Parmesanlı Kaşık Patates", fiyat: "285 TL", icerik: "250 Gram- 3 adet dip sos, parmesan peyniri ile servis edilir" },
    { ad: "Soğan Halkası", fiyat: "285 TL", icerik: "6 adet- 3 adet dip sos ile servis edilir" },
    { ad: "Mozarella Sticks", fiyat: "425 TL", icerik: "6 adet Mozeralla Çubuk, patates kızartması ve 3 adet dip sos ile servis edilir" },
    { ad: "Sosis Tabağı", fiyat: "350 TL", icerik: "6 adet sosis, patates kızartması, 3 adet dip sos ile servis edilir" },
    { ad: "Çıtır Zeytin", fiyat: "325 TL", icerik: "1 ad120 Gram panelenmiş zeytin; patates kızartması ve 3 adet dip sos ile servis edilir" },
    { ad: "Çıtır Bamya", fiyat: "300 TL", icerik: "Panelenmiş Çıtır Bamya, 3 adet dip sos ile" },
    { ad: "Çıtır Kabak", fiyat: "300 TL", icerik: "Panelenmiş Kabak, patates, 3 adet dip sos ile" },
    { ad: "Çıtır Midye", fiyat: "430 TL", icerik: "12 adet panelenmiş midye; patates kızartması, 3 adet dip sos ile servis edilir" },
    { ad: "Sigara Böreği", fiyat: "350 TL", icerik: "6 Adet sigara böreği, patates kızartması, 3 adet dip sos ile servis edilir" },
    { ad: "Paçanga Böreği", fiyat: "360 TL", icerik: "3 adet, yeşillik ile servis edilir" },
    { ad: "Çıtır Tavuk Topları", fiyat: "390 TL", icerik: "220 gram panelenmiş tavuk göğsü; 3 adet dip sos ile servis edilir" },
    { ad: "Cajun Tavuk", fiyat: "440 TL", icerik: "220 gram panelenmiş tavuk göğsü; 3 adet dip sos ile servis edilir" },
    { ad: "Ballı Hardallı Çıtır Tavuk", fiyat: "430 TL", icerik: "220gr Panelenmiş Ballı Hardallı Çıtır Tavuk, Patates kızartması ve 3 adet dip sos ile" },
    { ad: "Sinitzel", fiyat: "440 TL", icerik: "220 gr. panelenmiş tavuk göğsü; tereyağı, parmesan, limon, patates, 3 adet dip sos ile servis edilir" },
    { ad: "Çıtır Bar Tabağı", fiyat: "480 TL", icerik: "4 adet mozarella stick, 4 adet sosis, 4 adet sigara böreği, 120 gr. snitzel topları, 3 adet dip sos ile servis edilir" },
    { ad: "Spagetti- Napolitan", fiyat: "440 TL", icerik: "230 gr. spagetti; napolitan sos ile servis edilir." },
    { ad: "Spagetti- Bolonez", fiyat: "520 TL", icerik: "230 gr. spagetti; 80 gr. bolonez sos ile servis edilir" },
    { ad: "Penne - Alfredo", fiyat: "540 TL", icerik: "230 gr.penne; tavuk göğsü, mantar,krema, soya sosu, parmesan ile servis edilir" },
    { ad: "Penne - Pesto Soslu", fiyat: "440 TL", icerik: "230 gr. penne; pesto sosu, parmesan ile servis edilir." },
    { ad: "Çıtır Tavuklu Hamburger", fiyat: "420 TL", icerik: "180 gr. panelenmis tavuk göğsü, burger sos, domates, iceberg, turşu, patates ile servis edilir" },
    { ad: "Etli Hamburger", fiyat: "480 TL", icerik: "150 gr. dana kıymasi, burger sos, domates, iceberg, turşu, patates ile servis edilir" },
    { ad: "Diyet Mevsim Salatası", fiyat: "385 TL", icerik: "Mevsim yeşillikleri, roka, domates, salatalık,yağsız beyaz peynir" },
    { ad: "Çıtır Tavuk Salata", fiyat: "445 TL", icerik: "Mevsim yeşillikleri, roka, domates, salatalık,yağsız beyaz peynir" },
    { ad: "Pesto Soslu Wrap", fiyat: "440 TL", icerik: "180gr panelenmiş ballı hardallı çıtır tavuk, pesto sos, iceberg, 3 adet dip sos ile" }
  ],

  icecek: [
    { baslik: "Biralar", urunler: [
      { ad: "Blanc 33 CL", fiyat: "305 TL" },
      { ad: "Tuborg 50 CL", fiyat: "285 TL" },
      { ad: "Carlsberg 50 CL", fiyat: "295 TL" },
      { ad: "Sol 33 CL", fiyat: "335 TL" },
      { ad: "Weıhenstephan 33 CL", fiyat: "335 TL" },
      { ad: "Guinness 44 CL", fiyat: "395 TL" }
    ]},
    { baslik: "Cin-Votka-Viski", urunler: [
      { ad: "Gordon' Cin (single 6 cl)", fiyat: "485 TL" },
      { ad: "Smirnoff Votka (Single 6 cl)", fiyat: "485 TL" },
      { ad: "Black Label Viski (single 6 cl)", fiyat: "585 TL" }
    ]},
    { baslik: "Şaraplar", ikiFiyat: true, urunler: [
      { ad: "İsabey  Kırmızı / Beyaz / Blush", fiyat: "295 TL", sise: "1475 TL" },
      { ad: "Cielo Kırmızı / Beyaz / Blush", fiyat: "405 TL", sise: "1925 TL" },
      { ad: "Şampanya Marengo", fiyat: "", sise: "3750 TL" }
    ]},
    { baslik: "Shot", urunler: [
      { ad: "Kokteyl Shot ( 3 cl)", fiyat: "250 TL" },
      { ad: "Olmeca Blanco Tekila (Shot 3 cl)", fiyat: "275 TL" },
      { ad: "Jagermaister (Shot 3 cl)", fiyat: "295 TL" }
    ]},
    { baslik: "Kokteyller", urunler: [
      { ad: "Aperol Spritz", fiyat: "585 TL", icerik: "Aperol, Cinzano, Prosecco, Soda Water," },
      { ad: "Margarita", fiyat: "585 TL", icerik: "Teqila, Orange Liquer, Lime" },
      { ad: "Long Island", fiyat: "625 TL", icerik: "Gordon's Gin, Smirnoff Vodka, White Kaptain Morgan Rum, Tequila, Orange Liquer, Sweet & Sour Mix" },
      { ad: "Negroni", fiyat: "585 TL", icerik: "Gordon's Gin, Campari, Rosso" },
      { ad: "Whisky Sour", fiyat: "585 TL", icerik: "Builer Bourbon Whisky, Sweet & Sour Mix" },
      { ad: "Cuba Libre", fiyat: "585 TL", icerik: "Captain Morgan Rom, Kola, Limon Suyu" }
    ]},
    { baslik: "Alkolsuz İçecekler / Soft Drinks", urunler: [
      { ad: "Su", fiyat: "50 TL" },
      { ad: "Soda / Mineral Water", fiyat: "120 TL" },
      { ad: "Soft İçecekler -Kola, Fanta, Ice Tea", fiyat: "190 TL" },
      { ad: "Enerji İçeceği - Red Bull", fiyat: "275 TL" }
    ]},
    { baslik: "Atıştırmalık", urunler: [
      { ad: "Patlamış Mısır", fiyat: "175 TL" },
      { ad: "Cips", fiyat: "175 TL" },
      { ad: "Turşu", fiyat: "175 TL" },
      { ad: "Çerez", fiyat: "175 TL" }
    ]}
  ],

  shotKampanya: [
    { ad: "Shot Tekila", fiyat: "1000 TL" },
    { ad: "Shot Jager", fiyat: "1100 TL" },
    { ad: "Shot Viski", fiyat: "1200 TL" }
  ],

  kampanyalar: [
    { gorsel: "assets/img/kampanya-tuborg-cerez.webp", alt: "Lumina 4+1 — 50 CL Tuborg Şişe+Çerez — 1.100 TL" },
    { gorsel: "assets/img/kampanya-tuborg-bar-tabagi.webp", alt: "Lumina 4+1 — 50 CL Tuborg Şişe+Çıtır Bar Tabağı — 1.350 TL" },
    { gorsel: "assets/img/kampanya-isabey-peynir.webp", alt: "Lumina — 1 Şişe İsabey Şarap+Peynir Tabağı — 1.300 TL" },
    { gorsel: "assets/img/kampanya-kokteyl-cerez-tursu.webp", alt: "Lumina 4+1 — Kokteyl+Çerez+Turşu — 1.800 TL" }
  ]
};
