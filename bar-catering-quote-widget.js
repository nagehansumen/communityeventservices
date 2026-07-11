(function () {
  "use strict";

  var script = document.currentScript || {};
  var dataset = script.dataset || {};
  var email = dataset.email || "communityeventservices@gmail.com";
  var brand = dataset.brand || "Community Event Services";
  var phone = dataset.whatsapp || "";
  var bindMailto = dataset.bindMailto !== "false";
  var showFloating = dataset.mode !== "inline";

  var packages = {
    mobile: {
      label: "Mobil Bar",
      note: "Butik davetler, after party ve yalın bar kurulumu",
      perGuest: 320,
      setup: 18000
    },
    signature: {
      label: "İmza Kokteyl Bar",
      note: "Düğün, nişan ve kurumsal davetlerde dengeli seçenek",
      perGuest: 520,
      setup: 26000
    },
    catering: {
      label: "Bar + Catering",
      note: "Bar servisiyle Kadim Meyhane lezzetlerini birlikte isteyenler",
      perGuest: 920,
      setup: 42000
    }
  };

  var addOns = {
    signatureCocktail: { label: "Etkinliğe özel imza kokteyl", fixed: 7000, perGuest: 45 },
    mocktail: { label: "Alkolsüz mocktail seçkisi", fixed: 3000, perGuest: 75 },
    customBar: { label: "Konsept bar kurulumu", fixed: 12000, perGuest: 0 },
    kadim: { label: "Kadim Meyhane catering eşliği", fixed: 14000, perGuest: 360 },
    quiz: { label: "Quiz / Trivia Night akışı", fixed: 18000, perGuest: 0 }
  };

  var root;
  var modal;
  var backdrop;
  var lastFocused;
  var form;
  var formatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  });

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function roundTo(value, step) {
    return Math.round(value / step) * step;
  }

  function isWeekend(dateValue) {
    if (!dateValue) return false;
    var date = new Date(dateValue + "T12:00:00");
    var day = date.getDay();
    return day === 5 || day === 6;
  }

  function collectData() {
    var data = new FormData(form);
    var selectedAddOns = data.getAll("addOns");

    return {
      eventType: data.get("eventType") || "Düğün & Nişan",
      guests: clamp(parseInt(data.get("guests"), 10) || 120, 20, 2000),
      date: data.get("date") || "",
      city: data.get("city") || "",
      district: data.get("district") || "",
      venue: data.get("venue") || "",
      hours: clamp(parseFloat(data.get("hours")) || 4, 2, 12),
      packageKey: data.get("packageKey") || "signature",
      budget: data.get("budget") || "",
      name: data.get("name") || "",
      phone: data.get("phone") || "",
      userEmail: data.get("email") || "",
      notes: data.get("notes") || "",
      addOns: selectedAddOns
    };
  }

  function estimate(data) {
    var selectedPackage = packages[data.packageKey] || packages.signature;
    var total = selectedPackage.setup + selectedPackage.perGuest * data.guests;
    var staffCount = Math.max(2, Math.ceil(data.guests / 55));
    var barCount = Math.max(1, Math.ceil(data.guests / 90));

    if (data.hours > 4) total *= 1 + (data.hours - 4) * 0.08;
    if (isWeekend(data.date)) total *= 1.08;
    if (data.eventType === "Düğün & Nişan") total *= 1.05;

    data.addOns.forEach(function (key) {
      var item = addOns[key];
      if (!item) return;
      total += item.fixed + item.perGuest * data.guests;
    });

    var low = roundTo(total * 0.86, 1000);
    var high = roundTo(total * 1.18, 1000);

    return {
      low: low,
      high: high,
      packageLabel: selectedPackage.label,
      packageNote: selectedPackage.note,
      staffCount: staffCount,
      barCount: barCount
    };
  }

  function getRecommendation(data, quote) {
    if (data.packageKey === "catering") {
      return "Bar servisini catering akışıyla birlikte planlamak en doğru başlangıç olur.";
    }

    if (data.guests >= 180) {
      return quote.barCount + " bar noktasıyla servis kuyruğu oluşmadan ilerleyebilir.";
    }

    if (data.eventType === "Kurumsal Etkinlik") {
      return "Markaya özel imza kokteyl ve alkolsüz seçenekler güçlü bir etki bırakır.";
    }

    return "İmza kokteyl bar paketi bu davet için dengeli bir başlangıç sunar.";
  }

  function buildMessage(data, quote) {
    var selectedLabels = data.addOns.length
      ? data.addOns.map(function (key) { return addOns[key].label; }).join(", ")
      : "Ek seçenek belirtilmedi";

    return [
      "Merhaba, bar catering için ön teklif almak istiyorum.",
      "",
      "Etkinlik tipi: " + data.eventType,
      "Tarih: " + (data.date || "Belirtilmedi"),
      "Konum: " + ([data.city, data.district].filter(Boolean).join(" / ") || "Belirtilmedi"),
      "Mekan: " + (data.venue || "Belirtilmedi"),
      "Kişi sayısı: " + data.guests,
      "Servis süresi: " + data.hours + " saat",
      "Paket: " + quote.packageLabel,
      "Ek seçenekler: " + selectedLabels,
      "Bütçe: " + (data.budget || "Belirtilmedi"),
      "Ön aralık: " + formatter.format(quote.low) + " - " + formatter.format(quote.high),
      "",
      "Ad Soyad: " + (data.name || "Belirtilmedi"),
      "Telefon: " + (data.phone || "Belirtilmedi"),
      "E-posta: " + (data.userEmail || "Belirtilmedi"),
      "",
      "Not: " + (data.notes || "Yok")
    ].join("\n");
  }

  function injectStyles() {
    if (document.getElementById("ces-quote-styles")) return;

    var style = document.createElement("style");
    style.id = "ces-quote-styles";
    style.textContent = [
      ".ces-quote-root, .ces-quote-root * { box-sizing: border-box; }",
      ".ces-quote-root { color: #f6f1e7; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }",
      ".ces-quote-trigger { position: fixed; z-index: 2147483000; right: 22px; bottom: 22px; display: inline-flex; align-items: center; gap: 10px; min-height: 48px; max-width: min(320px, calc(100vw - 32px)); padding: 12px 18px 12px 13px; border: 1px solid rgba(248, 242, 231, .32); border-radius: 999px; background: #f7f2e9; color: #151814; font-weight: 800; letter-spacing: 0; box-shadow: 0 18px 54px rgba(0, 0, 0, .32); cursor: pointer; }",
      ".ces-quote-trigger:hover { transform: translateY(-1px); background: #ffffff; }",
      ".ces-quote-trigger:focus-visible, .ces-quote-close:focus-visible, .ces-quote-submit:focus-visible, .ces-quote-secondary:focus-visible, .ces-quote-input:focus-visible, .ces-quote-select:focus-visible, .ces-quote-textarea:focus-visible { outline: 3px solid rgba(196, 142, 78, .48); outline-offset: 2px; }",
      ".ces-quote-trigger__mark { display: inline-grid; place-items: center; width: 28px; height: 28px; flex: 0 0 28px; border-radius: 999px; background: #23352d; color: #f7f2e9; font-weight: 900; }",
      ".ces-quote-backdrop { position: fixed; inset: 0; z-index: 2147483001; display: none; padding: 18px; background: rgba(8, 11, 9, .66); backdrop-filter: blur(12px); overflow: auto; }",
      ".ces-quote-backdrop[data-open='true'] { display: grid; place-items: center; }",
      ".ces-quote-modal { position: relative; width: min(1040px, 100%); max-height: min(860px, calc(100vh - 36px)); overflow: auto; border: 1px solid rgba(255, 255, 255, .16); border-radius: 8px; background: linear-gradient(135deg, rgba(27, 34, 29, .98), rgba(15, 17, 15, .98)); box-shadow: 0 28px 90px rgba(0, 0, 0, .46); }",
      ".ces-quote-shell { display: grid; grid-template-columns: minmax(0, 1fr) 330px; gap: 0; }",
      ".ces-quote-main { padding: clamp(22px, 4vw, 38px); }",
      ".ces-quote-summary { position: sticky; top: 0; align-self: start; min-height: 100%; border-left: 1px solid rgba(255, 255, 255, .12); background: rgba(255, 255, 255, .055); padding: clamp(22px, 3vw, 30px); }",
      ".ces-quote-close { position: sticky; top: 14px; float: right; z-index: 1; display: inline-grid; place-items: center; width: 38px; height: 38px; border: 1px solid rgba(255, 255, 255, .16); border-radius: 999px; background: rgba(255, 255, 255, .08); color: #f7f2e9; font-size: 24px; line-height: 1; cursor: pointer; }",
      ".ces-quote-kicker { margin: 0 0 10px; color: #d4a15f; font-size: 12px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }",
      ".ces-quote-title { max-width: 720px; margin: 0; color: #fffaf0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(32px, 5vw, 58px); font-weight: 500; line-height: .96; letter-spacing: 0; }",
      ".ces-quote-copy { max-width: 620px; margin: 16px 0 28px; color: rgba(246, 241, 231, .75); font-size: 16px; line-height: 1.55; }",
      ".ces-quote-form { display: grid; gap: 22px; }",
      ".ces-quote-fieldset { min-width: 0; margin: 0; padding: 22px 0 0; border: 0; border-top: 1px solid rgba(255, 255, 255, .13); }",
      ".ces-quote-legend { padding: 0 0 14px; color: #fffaf0; font-size: 15px; font-weight: 800; }",
      ".ces-quote-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }",
      ".ces-quote-field { display: grid; min-width: 0; gap: 7px; color: rgba(246, 241, 231, .72); font-size: 13px; font-weight: 700; }",
      ".ces-quote-field--wide { grid-column: 1 / -1; }",
      ".ces-quote-input, .ces-quote-select, .ces-quote-textarea { width: 100%; min-width: 0; border: 1px solid rgba(255, 255, 255, .14); border-radius: 8px; background: rgba(255, 255, 255, .075); color: #fffaf0; font: inherit; font-size: 15px; letter-spacing: 0; }",
      ".ces-quote-input, .ces-quote-select { min-height: 46px; padding: 0 13px; }",
      ".ces-quote-select option { color: #111; }",
      ".ces-quote-textarea { min-height: 96px; resize: vertical; padding: 12px 13px; }",
      ".ces-quote-checks { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }",
      ".ces-quote-check { display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: 9px; align-items: start; min-height: 44px; padding: 10px; border: 1px solid rgba(255, 255, 255, .12); border-radius: 8px; background: rgba(255, 255, 255, .055); color: rgba(246, 241, 231, .8); font-size: 13px; font-weight: 700; line-height: 1.35; }",
      ".ces-quote-check input { width: 18px; height: 18px; accent-color: #d4a15f; }",
      ".ces-quote-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding-top: 6px; }",
      ".ces-quote-submit, .ces-quote-secondary { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; border-radius: 999px; padding: 0 18px; border: 1px solid transparent; font-size: 14px; font-weight: 900; letter-spacing: 0; cursor: pointer; text-decoration: none; }",
      ".ces-quote-submit { background: #fffaf0; color: #141814; }",
      ".ces-quote-submit:hover { background: #ffffff; }",
      ".ces-quote-secondary { background: transparent; color: #fffaf0; border-color: rgba(255, 255, 255, .22); }",
      ".ces-quote-secondary:hover { border-color: rgba(255, 255, 255, .42); background: rgba(255, 255, 255, .08); }",
      ".ces-quote-consent { display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: 9px; align-items: start; color: rgba(246, 241, 231, .68); font-size: 12px; line-height: 1.45; }",
      ".ces-quote-consent input { width: 18px; height: 18px; accent-color: #d4a15f; }",
      ".ces-quote-price-label { margin: 0 0 8px; color: rgba(246, 241, 231, .62); font-size: 12px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }",
      ".ces-quote-price { margin: 0; color: #fffaf0; font-size: clamp(26px, 3vw, 34px); font-weight: 900; line-height: 1.05; letter-spacing: 0; }",
      ".ces-quote-summary-text { margin: 14px 0 0; color: rgba(246, 241, 231, .72); line-height: 1.5; }",
      ".ces-quote-divider { height: 1px; margin: 22px 0; background: rgba(255, 255, 255, .13); }",
      ".ces-quote-metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 20px 0 0; }",
      ".ces-quote-metric { min-width: 0; padding: 12px 0; border-top: 1px solid rgba(255, 255, 255, .13); }",
      ".ces-quote-metric strong { display: block; color: #fffaf0; font-size: 22px; }",
      ".ces-quote-metric span { color: rgba(246, 241, 231, .58); font-size: 12px; }",
      ".ces-quote-note { margin: 18px 0 0; color: rgba(246, 241, 231, .56); font-size: 12px; line-height: 1.5; }",
      ".ces-quote-toast { position: fixed; left: 50%; bottom: 22px; z-index: 2147483003; transform: translate(-50%, 18px); opacity: 0; pointer-events: none; max-width: min(420px, calc(100vw - 32px)); padding: 12px 14px; border-radius: 8px; background: #fffaf0; color: #141814; box-shadow: 0 18px 50px rgba(0, 0, 0, .32); font-weight: 800; transition: opacity .18s ease, transform .18s ease; }",
      ".ces-quote-toast[data-visible='true'] { opacity: 1; transform: translate(-50%, 0); }",
      "@media (max-width: 820px) { .ces-quote-backdrop { padding: 0; place-items: end center; } .ces-quote-modal { width: 100%; max-height: 92vh; border-radius: 8px 8px 0 0; } .ces-quote-shell { grid-template-columns: 1fr; } .ces-quote-summary { position: static; min-height: 0; border-left: 0; border-top: 1px solid rgba(255, 255, 255, .12); } .ces-quote-grid, .ces-quote-checks { grid-template-columns: 1fr; } .ces-quote-title { font-size: clamp(30px, 12vw, 44px); } .ces-quote-trigger { right: 14px; bottom: 14px; } }",
      "@media (prefers-reduced-motion: reduce) { .ces-quote-trigger:hover, .ces-quote-toast { transition: none; transform: none; } }"
    ].join("\n");

    document.head.appendChild(style);
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === "class") node.className = attrs[key];
      else if (key === "text") node.textContent = attrs[key];
      else if (key === "html") node.innerHTML = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) {
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function option(value, label, selected) {
    var item = el("option", { value: value, text: label });
    if (selected) item.selected = true;
    return item;
  }

  function field(label, input) {
    return el("label", { class: "ces-quote-field" }, [
      el("span", { text: label }),
      input
    ]);
  }

  function updateSummary() {
    if (!form) return;
    var data = collectData();
    var quote = estimate(data);
    var price = root.querySelector("[data-ces-price]");
    var packageText = root.querySelector("[data-ces-package]");
    var recommendation = root.querySelector("[data-ces-recommendation]");
    var staff = root.querySelector("[data-ces-staff]");
    var bars = root.querySelector("[data-ces-bars]");

    price.textContent = formatter.format(quote.low) + " - " + formatter.format(quote.high);
    packageText.textContent = quote.packageLabel + " · " + quote.packageNote;
    recommendation.textContent = getRecommendation(data, quote);
    staff.textContent = quote.staffCount;
    bars.textContent = quote.barCount;
  }

  function showToast(message) {
    var toast = root.querySelector(".ces-quote-toast");
    toast.textContent = message;
    toast.dataset.visible = "true";
    window.setTimeout(function () {
      toast.dataset.visible = "false";
    }, 2800);
  }

  function openModal() {
    lastFocused = document.activeElement;
    backdrop.dataset.open = "true";
    document.documentElement.style.overflow = "hidden";
    updateSummary();
    var firstInput = modal.querySelector("select, input, textarea, button");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    backdrop.dataset.open = "false";
    document.documentElement.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

 function submitForm(event) {
  event.preventDefault();

  var data = collectData();
  var quote = estimate(data);
  var subject = "Bar catering ön teklif talebi";
  var body = buildMessage(data, quote);

  var mailto =
    "mailto:" + encodeURIComponent(email) +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  showToast("Ön teklif aralığı hazır. E-posta taslağı açılıyor.");

  window.setTimeout(function () {
    if (typeof window.reportEmailConversion === "function") {
      window.reportEmailConversion(mailto);
    } else {
      window.location.href = mailto;
    }
  }, 250);
}

function openWhatsapp(event) {
  event.preventDefault();

  // WhatsApp bağlantısı bir form submit butonu olmadığı için
  // zorunlu alanları ayrıca kontrol ediyoruz.
  if (!form.reportValidity()) {
    return;
  }

  var normalized = phone.replace(/[^\d]/g, "");
  if (!normalized) return;

  var data = collectData();
  var quote = estimate(data);
  var message = buildMessage(data, quote);

  var whatsappUrl =
    "https://wa.me/" +
    normalized +
    "?text=" +
    encodeURIComponent(message);

  if (typeof window.reportWhatsAppConversion === "function") {
    window.reportWhatsAppConversion(whatsappUrl);
  } else {
    window.open(whatsappUrl, "_blank", "noopener");
  }
}

  function createForm() {
    var eventType = el("select", { class: "ces-quote-select", name: "eventType", required: "required" }, [
      option("Düğün & Nişan", "Düğün & Nişan", true),
      option("Kurumsal Etkinlik", "Kurumsal Etkinlik"),
      option("Özel Davet", "Özel Davet"),
      option("After Party", "After Party"),
      option("Kokteyl Workshop", "Kokteyl Workshop")
    ]);

    var packageSelect = el("select", { class: "ces-quote-select", name: "packageKey", required: "required" }, [
      option("mobile", "Mobil Bar"),
      option("signature", "İmza Kokteyl Bar", true),
      option("catering", "Bar + Catering")
    ]);

    var budget = el("select", { class: "ces-quote-select", name: "budget" }, [
      option("", "Bütçe aralığı seçin"),
      option("50.000 TL altı", "50.000 TL altı"),
      option("50.000 - 100.000 TL", "50.000 - 100.000 TL"),
      option("100.000 - 250.000 TL", "100.000 - 250.000 TL"),
      option("250.000 TL üzeri", "250.000 TL üzeri")
    ]);

    var addOnChecks = Object.keys(addOns).map(function (key) {
      return el("label", { class: "ces-quote-check" }, [
        el("input", { type: "checkbox", name: "addOns", value: key }),
        el("span", { text: addOns[key].label })
      ]);
    });

    form = el("form", { class: "ces-quote-form" }, [
      el("fieldset", { class: "ces-quote-fieldset" }, [
        el("legend", { class: "ces-quote-legend", text: "Etkinlik bilgileri" }),
        el("div", { class: "ces-quote-grid" }, [
          field("Davet türü", eventType),
          field("Davet tarihi", el("input", { class: "ces-quote-input", type: "date", name: "date" })),
          field("Şehir", el("input", { class: "ces-quote-input", name: "city", placeholder: "İstanbul", autocomplete: "address-level1" })),
          field("İlçe", el("input", { class: "ces-quote-input", name: "district", placeholder: "Beyoğlu", autocomplete: "address-level2" })),
          field("Kişi sayısı", el("input", { class: "ces-quote-input", type: "number", name: "guests", min: "20", max: "2000", step: "10", value: "120", required: "required" })),
          field("Servis süresi", el("input", { class: "ces-quote-input", type: "number", name: "hours", min: "2", max: "12", step: "0.5", value: "4", required: "required" })),
          field("Mekan adı", el("input", { class: "ces-quote-input", name: "venue", placeholder: "Varsa mekan adı" })),
          field("Paket", packageSelect),
          field("Bütçe", budget)
        ])
      ]),
      el("fieldset", { class: "ces-quote-fieldset" }, [
        el("legend", { class: "ces-quote-legend", text: "Ek seçenekler" }),
        el("div", { class: "ces-quote-checks" }, addOnChecks)
      ]),
      el("fieldset", { class: "ces-quote-fieldset" }, [
        el("legend", { class: "ces-quote-legend", text: "İletişim" }),
        el("div", { class: "ces-quote-grid" }, [
          field("Ad Soyad", el("input", { class: "ces-quote-input", name: "name", autocomplete: "name", required: "required" })),
          field("Telefon", el("input", { class: "ces-quote-input", name: "phone", autocomplete: "tel", inputmode: "tel", required: "required" })),
          field("E-posta", el("input", { class: "ces-quote-input", type: "email", name: "email", autocomplete: "email" })),
          el("label", { class: "ces-quote-field ces-quote-field--wide" }, [
            el("span", { text: "Kısa not" }),
            el("textarea", { class: "ces-quote-textarea", name: "notes", placeholder: "Servis akışı, içecek tercihi, yemek eşliği veya özel beklentiler" })
          ])
        ])
      ]),
      el("label", { class: "ces-quote-consent" }, [
        el("input", { type: "checkbox", required: "required" }),
        el("span", { text: "Bilgilerimin teklif hazırlığı ve geri dönüş için kullanılmasını kabul ediyorum." })
      ]),
      el("div", { class: "ces-quote-actions" }, [
        el("button", { class: "ces-quote-submit", type: "submit", text: "E-posta Taslağı Oluştur →" }),
        phone ? el("a", { class: "ces-quote-secondary", href: "#", "data-ces-whatsapp": "true", text: "WhatsApp ile Gönder" }) : el("span", {})
      ])
    ]);

    form.addEventListener("input", updateSummary);
    form.addEventListener("change", updateSummary);
    form.addEventListener("submit", submitForm);

    var whatsapp = form.querySelector("[data-ces-whatsapp]");
    if (whatsapp) whatsapp.addEventListener("click", openWhatsapp);

    return form;
  }

  function createModal() {
    backdrop = el("div", { class: "ces-quote-backdrop", "data-open": "false" });
    modal = el("section", {
      class: "ces-quote-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "ces-quote-title"
    });

    var close = el("button", { class: "ces-quote-close", type: "button", "aria-label": "Kapat", text: "×" });
    close.addEventListener("click", closeModal);

    var formNode = createForm();
    var summary = el("aside", { class: "ces-quote-summary", "aria-live": "polite" }, [
      el("p", { class: "ces-quote-price-label", text: "Tahmini ön aralık" }),
      el("p", { class: "ces-quote-price", "data-ces-price": "true", text: "₺0 - ₺0" }),
      el("p", { class: "ces-quote-summary-text", "data-ces-package": "true", text: "" }),
      el("div", { class: "ces-quote-divider" }),
      el("p", { class: "ces-quote-summary-text", "data-ces-recommendation": "true", text: "" }),
      el("div", { class: "ces-quote-metrics" }, [
        el("div", { class: "ces-quote-metric" }, [
          el("strong", { "data-ces-staff": "true", text: "2" }),
          el("span", { text: "önerilen ekip" })
        ]),
        el("div", { class: "ces-quote-metric" }, [
          el("strong", { "data-ces-bars": "true", text: "1" }),
          el("span", { text: "bar noktası" })
        ])
      ]),
      el("p", { class: "ces-quote-note", text: "Bu aralık hızlı planlama içindir. Net teklif; tarih, mekan koşulları, menü, ekipman ve tedarik detayları doğrulandıktan sonra hazırlanır." })
    ]);

    modal.appendChild(close);
    modal.appendChild(el("div", { class: "ces-quote-shell" }, [
      el("div", { class: "ces-quote-main" }, [
        el("p", { class: "ces-quote-kicker", text: "Bar Catering" }),
        el("h2", { class: "ces-quote-title", id: "ces-quote-title", text: "Davetiniz için hızlı ön teklif alın." }),
        el("p", { class: "ces-quote-copy", text: "Kişi sayısı, tarih, mekan ve servis beklentinizi paylaşın; bar ekibi, paket ve yaklaşık bütçe aralığını birlikte netleştirelim." }),
        formNode
      ]),
      summary
    ]));

    backdrop.appendChild(modal);
    backdrop.addEventListener("click", function (event) {
      if (event.target === backdrop) closeModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && backdrop.dataset.open === "true") closeModal();
    });

    return backdrop;
  }

  function createFloatingTrigger() {
    var trigger = el("button", { class: "ces-quote-trigger", type: "button", "aria-label": "Bar catering ön teklif formunu aç" }, [
      el("span", { class: "ces-quote-trigger__mark", "aria-hidden": "true", text: "₺" }),
      el("span", { text: "Ön Teklif Al" })
    ]);
    trigger.addEventListener("click", openModal);
    return trigger;
  }

  function bindExistingLinks() {
    if (!bindMailto) return;

    Array.prototype.slice.call(document.querySelectorAll("a[href^='mailto:'], [data-ces-quote-open]")).forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var isTargetMail = href.indexOf("mailto:" + email) === 0 || href.indexOf("mailto:" + encodeURIComponent(email)) === 0;
      var explicit = link.hasAttribute("data-ces-quote-open");
      if (!isTargetMail && !explicit) return;

      link.setAttribute("data-ces-quote-bound", "true");
      link.addEventListener("click", function (event) {
        event.preventDefault();
        openModal();
      });
    });
  }

  function exposeApi() {
    window.CommunityBarQuote = window.CommunityBarQuote || {};
    window.CommunityBarQuote.open = openModal;
    window.CommunityBarQuote.close = closeModal;
    window.CommunityBarQuote.update = updateSummary;
  }

  function init() {
    if (document.querySelector(".ces-quote-root")) return;
    injectStyles();
    root = el("div", { class: "ces-quote-root" });
    root.appendChild(createModal());
    if (showFloating) root.appendChild(createFloatingTrigger());
    root.appendChild(el("div", { class: "ces-quote-toast", role: "status", "aria-live": "polite" }));
    document.body.appendChild(root);
    bindExistingLinks();
    exposeApi();
    updateSummary();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
