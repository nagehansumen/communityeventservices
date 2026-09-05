/* ==========================================================================
   CES — DÜZENLENEBİLİR İÇERİK DOSYASI
   Sitedeki tüm değişken bilgiler burada. Başka dosyaya dokunmanıza gerek yok.
   ========================================================================== */

window.CES = {

  /* --- İletişim (gerçek bilgiler) --------------------------------------- */
  contact: {
    email:        "communityeventservices@gmail.com",
    whatsappNum:  "905322477692",              // uluslararası format, sadece rakam
    whatsappText: "+90 532 247 76 92",         // ekranda görünen hâli
    instagram:    "@communityeventservices",
    instagramUrl: "https://www.instagram.com/communityeventservices/",

    /* Community Hub'ın kendi Instagram hesabı.
       Yalnızca Hakkımızda sayfasındaki "Community Hub Istanbul" butonunda kullanılır.
       Footer ve menüdeki Instagram bağlantısı yukarıdaki hesapta kalır.
       Boş bırakılırsa buton da yukarıdaki hesaba gider. */
    hubInstagram:    "Community Hub Istanbul",
    hubInstagramUrl: ""
  },

  /* --- Anasayfa rakamları ------------------------------------------------
     ÖNEMLİ: Bu rakamlar müşteri onayı bekliyor. Gerçek verilerle güncelleyin.
     Bölüm tamamen kaldırılacaksa index.html içindeki #rakamlar bloğunu silin. */
  stats: [
    { value: 450,    suffix: "+", label: "Gerçekleştirilen Etkinlik" },
    { value: 28000,  suffix: "+", label: "Katılımcı", format: "tr" },
    { value: 4.9,    suffix: "/5", label: "Ortalama Katılımcı Puanı", decimals: 1 },
    { value: 5000,   suffix: "+", label: "Katılımcı Yorumu", format: "tr" }
  ],

  /* --- Community Hub -----------------------------------------------------
     Boş bırakılan alanlar sitede "yer tutucu" etiketiyle görünür. */
  hub: {
    address:   "Asmalı Mescit, Şehbender Sk. No:18/2, 34430 Beyoğlu/İstanbul",
    mapUrl:    "https://www.google.com/maps/place//data=!4m2!3m1!1s0x14cab9d5cc1f4363:0x1da87806a883acec",
    capacity:  "Üst kat 85, alt kat 45 kişi",
    technical: "Mikrofon, ses sistemi, projeksiyon"
  },

  /* --- Form ---------------------------------------------------------------
     formEndpoint doluysa form doğrudan oraya gönderilir (Formspree, Basin,
     Netlify Forms vb.). Boşsa form, girilen bilgileri WhatsApp mesajı olarak
     hazırlar — hiçbir durumda "gönderildi" yanılgısı oluşturmaz. */
  form: {
    endpoint: ""                 // örn. "https://formspree.io/f/xxxxxxx"
  }
};
