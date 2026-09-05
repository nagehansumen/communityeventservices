/* ==========================================================================
   COMMUNITY EVENT SERVICES — etkileşim katmanı
   Bağımlılık yok. Tüm hareket prefers-reduced-motion tercihine saygı duyar.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.CES || {};
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches && window.innerWidth >= 1180;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- config */
  function fillConfig() {
    var c = CFG.contact || {};
    var wa = "https://wa.me/" + (c.whatsappNum || "");
    $$("[data-c]").forEach(function (el) {
      var k = el.getAttribute("data-c");
      if (k === "wa-link") { el.href = wa; }
      else if (k === "wa-text") { el.textContent = c.whatsappText || ""; }
      else if (k === "mail-link") { el.href = "mailto:" + (c.email || ""); }
      else if (k === "mail-text") { el.textContent = c.email || ""; }
      else if (k === "ig-link") { el.href = c.instagramUrl || "#"; }
      else if (k === "ig-text") { el.textContent = c.instagram || ""; }
      else if (k === "hub-ig-link") { el.href = c.hubInstagramUrl || c.instagramUrl || "#"; }
      else if (k === "hub-ig-text") { el.textContent = c.hubInstagram || "Community Hub Istanbul"; }
    });

    // Rakamlar — tek kaynak config.js
    var stats = CFG.stats || [];
    $$(".stat").forEach(function (el, i) {
      var s = stats[i]; if (!s) { el.remove(); return; }
      var v = $(".stat__value", el), l = $(".stat__label", el);
      v.setAttribute("data-count", s.value);
      v.setAttribute("data-suffix", s.suffix || "");
      v.setAttribute("data-dec", s.decimals || 0);
      v.setAttribute("data-group", s.format === "tr" ? "1" : "0");
      if (l) l.textContent = s.label || "";
    });

    // Community Hub alanları
    var hub = CFG.hub || {};
    $$("[data-hub]").forEach(function (el) {
      var k = el.getAttribute("data-hub");
      var v = hub[k];
      if (!v) { el.textContent = "Bilgi eklenecek"; el.style.opacity = ".55"; return; }
      if (k === "address" && hub.mapUrl) {
        el.innerHTML = '<a href="' + hub.mapUrl + '" target="_blank" rel="noopener">' + v + "</a>";
      } else { el.textContent = v; }
    });
  }

  /* --------------------------------------------------------------- reveals */
  function reveals() {
    var items = $$(".rv, .rv-mask, [data-count], .checklist li");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    $$("[data-stagger]").forEach(function (g) {
      $$(":scope > *", g).forEach(function (el, i) { el.style.setProperty("--i", i); });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        if (e.target.hasAttribute("data-count")) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------------------------------- sayaçlar */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var grp = el.getAttribute("data-group") === "1";
    var fmt = function (n) {
      var s = grp ? Math.round(n).toLocaleString("tr-TR") : n.toFixed(dec);
      return s + suffix;
    };
    if (reduced) { el.textContent = fmt(target); return; }
    var t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------ header/nav */
  function header() {
    var h = $(".header");
    if (!h) return;
    var darks = $$(".block--ink, .block--purple, .block--blue, .block--orange");
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY;
      h.classList.toggle("is-stuck", y > 12);
      var line = h.getBoundingClientRect().bottom - 6;
      var over = darks.some(function (d) {
        var r = d.getBoundingClientRect();
        return r.top <= line && r.bottom >= line;
      });
      h.classList.toggle("is-inverted", over);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();

    // Açılır menü — klavye erişilebilir
    $$(".nav__group").forEach(function (g) {
      var btn = $(".nav__link", g);
      var close = function () { g.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); };
      var open = function () { g.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); };
      var pinned = false;
      btn.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        if (g.classList.contains("is-open") && pinned) { pinned = false; close(); }
        else { pinned = true; open(); }
      });
      g.addEventListener("mouseenter", open);
      g.addEventListener("mouseleave", function () { if (!pinned) close(); });
      document.addEventListener("click", function (e) {
        if (!g.contains(e.target)) { pinned = false; close(); }
      });
      g.addEventListener("focusout", function (e) {
        if (!g.contains(e.relatedTarget) && !pinned) close();
      });
      g.addEventListener("keydown", function (e) { if (e.key === "Escape") { pinned = false; close(); btn.focus(); } });
    });

    // Mobil menü
    var menu = $(".menu"), burger = $(".burger"), closeBtn = $(".menu__close");
    if (menu && burger) {
      var toggle = function (on) {
        menu.classList.toggle("is-open", on);
        burger.setAttribute("aria-expanded", on ? "true" : "false");
        document.body.style.overflow = on ? "hidden" : "";
        if (on) {
          $$(".menu__list a", menu).forEach(function (a, i) { a.style.animationDelay = (60 + i * 55) + "ms"; });
          var first = $(".menu__list a", menu); if (first) first.focus();
        }
      };
      burger.addEventListener("click", function () { toggle(true); });
      if (closeBtn) closeBtn.addEventListener("click", function () { toggle(false); burger.focus(); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("is-open")) { toggle(false); burger.focus(); }
      });
    }
  }

  /* ---------------------------------------------------------------- ticker */
  function ticker() {
    if (reduced) return;
    var last = window.scrollY, tk = $$(".ticker");
    window.addEventListener("scroll", function () {
      var y = window.scrollY, up = y < last;
      last = y;
      tk.forEach(function (t) { t.classList.toggle("is-reverse", up); });
    }, { passive: true });
  }

  /* -------------------------------------------------------------- parallax */
  function parallax() {
    if (reduced) return;
    var els = $$("[data-par]");
    if (!els.length) return;
    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var sp = parseFloat(el.getAttribute("data-par"));
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.setProperty("--py", (-p * sp * 100).toFixed(1) + "px");
        el.style.transform = "translate3d(var(--px,0px)," + (-p * sp * 100).toFixed(1) + "px,0) rotate(var(--rot,0deg))";
      });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();

    // Fare paralaksı (yalnızca masaüstü)
    if (!fine) return;
    var hero = $(".hero");
    if (!hero) return;
    var mEls = $$("[data-mouse]", hero);
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - 0.5;
      var dy = (e.clientY - r.top) / r.height - 0.5;
      mEls.forEach(function (el) {
        var s = parseFloat(el.getAttribute("data-mouse"));
        el.style.setProperty("--px", (dx * s).toFixed(1) + "px");
        el.style.transform = "translate3d(" + (dx * s).toFixed(1) + "px,calc(var(--py,0px) + " + (dy * s).toFixed(1) + "px),0) rotate(var(--rot,0deg))";
      });
    });
  }

  /* ------------------------------------------------------- manyetik buton */
  function magnetic() {
    if (!fine || reduced) return;
    $$("[data-magnetic]").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.28 + "px," + y * 0.36 + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });
  }

  /* ---------------------------------------------------------------- imleç */
  function cursor() {
    if (!fine || reduced) return;
    var c = $(".cursor"), label = $(".cursor__label");
    if (!c) return;
    var x = 0, y = 0, tx = 0, ty = 0;
    document.addEventListener("mousemove", function (e) { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      c.style.transform = "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    $$("a, button, [data-cursor]").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        c.classList.add("is-big");
        label.textContent = el.getAttribute("data-cursor") || "";
        if (!label.textContent) c.classList.remove("is-big");
      });
      el.addEventListener("mouseleave", function () { c.classList.remove("is-big"); });
    });
  }

  /* --------------------------------------------------------- sürüklenebilir */
  function dragStrip() {
    $$(".strip").forEach(function (s) {
      var down = false, sx = 0, sl = 0, moved = 0;
      s.addEventListener("pointerdown", function (e) {
        if (e.pointerType === "touch") return;
        down = true; moved = 0; sx = e.clientX; sl = s.scrollLeft;
        s.classList.add("is-drag"); s.setPointerCapture(e.pointerId);
      });
      s.addEventListener("pointermove", function (e) {
        if (!down) return;
        var d = e.clientX - sx; moved = Math.abs(d);
        s.scrollLeft = sl - d;
        if (!reduced) {
          var t = Math.max(-4, Math.min(4, -d * 0.03));
          $$(".strip__item", s).forEach(function (i) { i.style.transform = "rotate(" + t + "deg)"; });
        }
      });
      ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
        s.addEventListener(ev, function () {
          if (!down) return;
          down = false; s.classList.remove("is-drag");
          $$(".strip__item", s).forEach(function (i) { i.style.transform = ""; });
        });
      });
      s.addEventListener("click", function (e) { if (moved > 8) e.preventDefault(); }, true);

      // Yavaş otomatik kayma — etkileşimde durur
      if (reduced) return;
      var auto = true, dir = 1;
      ["pointerdown", "wheel", "touchstart", "mouseenter"].forEach(function (ev) {
        s.addEventListener(ev, function () { auto = false; }, { passive: true });
      });
      (function drift() {
        if (auto && document.visibilityState === "visible") {
          s.scrollLeft += 0.4 * dir;
          if (s.scrollLeft + s.clientWidth >= s.scrollWidth - 2) dir = -1;
          if (s.scrollLeft <= 0) dir = 1;
        }
        requestAnimationFrame(drift);
      })();
    });
  }

  /* ---------------------------------------------------------------- süreç */
  var BLOBS = [
    "M160,20 C230,20 300,70 300,150 C300,240 240,290 160,290 C70,290 20,230 20,150 C20,60 80,20 160,20 Z",
    "M155,15 C245,25 295,85 285,170 C275,255 210,300 130,290 C50,280 10,215 25,135 C40,55 85,8 155,15 Z",
    "M150,25 C220,10 300,60 295,145 C290,235 215,295 135,285 C55,275 15,205 20,140 C25,65 85,40 150,25 Z",
    "M150,18 C240,18 292,80 290,160 C288,245 225,292 145,290 C60,288 12,225 18,145 C24,70 75,18 150,18 Z"
  ];
  function process() {
    var wrapEl = $("[data-process]");
    if (!wrapEl) return;
    var steps = $$(".process__step", wrapEl);
    var line = $(".process__line", wrapEl);
    var num = $(".process__num", wrapEl);
    var path = $(".process__shape path", wrapEl);
    var list = $(".process__list", wrapEl);
    var ticking = false;
    function update() {
      ticking = false;
      var mid = window.innerHeight * 0.45, active = 0;
      steps.forEach(function (s, i) {
        var r = s.getBoundingClientRect();
        if (r.top <= mid) active = i;
      });
      steps.forEach(function (s, i) { s.classList.toggle("is-active", i === active); });
      if (num) num.textContent = steps[active].getAttribute("data-num");
      if (path) path.setAttribute("d", BLOBS[active % BLOBS.length]);
      if (line && list) {
        var lr = list.getBoundingClientRect();
        var prog = Math.max(0, Math.min(1, (mid - lr.top) / lr.height));
        line.style.height = (prog * 100) + "%";
      }
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* -------------------------------------------------------- sayfa geçişi */
  function transitions() {
    var wipe = $(".wipe");
    if (!wipe || reduced) return;
    // Giriş perdesi yalnızca site içi bir bağlantıdan gelindiyse oynar —
    // doğrudan açılışta içeriğin üstüne turuncu panel düşmesin.
    try {
      if (sessionStorage.getItem("ces-nav") === "1") {
        sessionStorage.removeItem("ces-nav");
        wipe.classList.add("is-in");
        setTimeout(function () { wipe.classList.remove("is-in"); }, 800);
      }
    } catch (err) {}

    document.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      if (!href || href.charAt(0) === "#" || /^(mailto|tel|https?):/.test(href)) {
        if (!/^https?:/.test(href) || a.hostname !== location.hostname) return;
      }
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      $(".wipe__label").textContent = a.getAttribute("data-label") || a.textContent.trim();
      try { sessionStorage.setItem("ces-nav", "1"); } catch (err) {}
      wipe.classList.remove("is-in");
      wipe.classList.add("is-out");
      setTimeout(function () { location.href = href; }, 520);
    });
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) { wipe.className = "wipe"; }
    });
  }

  /* ----------------------------------------------------------------- form */
  function form() {
    var f = $("#teklif-form");
    if (!f) return;
    var success = $(".form-success");
    var btn = $("button[type=submit]", f);
    var msgs = {
      required: "Bu alan gerekli.",
      email: "Geçerli bir e-posta adresi girin.",
      phone: "Telefon numarasını başında 0 olacak şekilde girin."
    };
    function setErr(field, text) {
      var wrap = field.closest(".field");
      wrap.classList.toggle("is-invalid", !!text);
      field.setAttribute("aria-invalid", text ? "true" : "false");
      var e = $(".err", wrap);
      if (e) e.textContent = text || "";
    }
    function validate(field) {
      var v = field.value.trim();
      if (field.required && !v) { setErr(field, msgs.required); return false; }
      if (field.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { setErr(field, msgs.email); return false; }
      if (field.type === "tel" && v && v.replace(/\D/g, "").length < 10) { setErr(field, msgs.phone); return false; }
      setErr(field, ""); return true;
    }
    $$("input, select, textarea", f).forEach(function (el) {
      el.addEventListener("blur", function () { validate(el); });
      el.addEventListener("input", function () { if (el.closest(".field").classList.contains("is-invalid")) validate(el); });
    });

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = $$("input, select, textarea", f);
      var ok = true, firstBad = null;
      fields.forEach(function (el) {
        if (!validate(el)) { ok = false; if (!firstBad) firstBad = el; }
      });
      if (!ok) { if (firstBad) firstBad.focus(); return; }

      var data = {};
      fields.forEach(function (el) { if (el.name) data[el.name] = el.value.trim(); });
      var endpoint = ((CFG.form || {}).endpoint || "").trim();
      btn.disabled = true;
      var oldLabel = btn.innerHTML;
      btn.innerHTML = "<span>Gönderiliyor…</span>";

      function done(mode) {
        f.style.display = "none";
        success.classList.add("is-on");
        var note = $("[data-success-note]", success);
        if (note) {
          note.textContent = mode === "post"
            ? "Bilgileriniz bize ulaştı. En kısa sürede sizinle iletişime geçeceğiz."
            : "Bilgileriniz e-posta uygulamanızda hazırlandı. Göndermek için açılan pencereden onaylamanız yeterli.";
        }
        success.setAttribute("tabindex", "-1");
        success.focus();
        confettiBurst(success);
      }

      if (endpoint) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (!r.ok) throw new Error("post failed");
          done("post");
        }).catch(function () {
          btn.disabled = false; btn.innerHTML = oldLabel;
          var box = $("[data-form-error]", f);
          if (box) box.textContent = "Form şu anda gönderilemedi. Bize WhatsApp veya e-posta ile ulaşabilirsiniz.";
        });
      } else {
        var lines = [
          "Teklif talebi — Community Event Services",
          "",
          "İsim: " + data.name,
          "Şirket: " + data.company,
          "E-posta: " + data.email,
          "Telefon: " + data.phone,
          "Etkinlik türü: " + (data.event_type || "-"),
          "Katılımcı: " + (data.participant_count || "-"),
          "Beklenti: " + (data.expectations || "-")
        ].join("\n");
        var to = (CFG.contact || {}).email || "";
        var subject = "Teklif talebi — " + (data.company || data.name || "Web sitesi formu");
        var url = "mailto:" + to + "?subject=" + encodeURIComponent(subject) +
                  "&body=" + encodeURIComponent(lines);
        window.location.href = url;
        done("mail");
      }
    });
  }

  /* ------------------------------------------------------------- konfeti */
  function confettiBurst(host) {
    if (reduced) return;
    var colors = ["#FF5317", "#3730C9", "#512080", "#F08DDB", "#60B7E6"];
    for (var i = 0; i < 26; i++) {
      var d = document.createElement("i");
      var size = 6 + Math.random() * 12;
      d.style.cssText = "position:absolute;left:50%;top:40%;width:" + size + "px;height:" + size + "px;background:" +
        colors[i % colors.length] + ";pointer-events:none;" + (i % 3 ? "border-radius:50%;" : "");
      host.appendChild(d);
      var ang = Math.random() * Math.PI * 2, dist = 90 + Math.random() * 260;
      d.animate([
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: "translate(" + Math.cos(ang) * dist + "px," + (Math.sin(ang) * dist + 220) + "px) rotate(" + (Math.random() * 720 - 360) + "deg)", opacity: 0 }
      ], { duration: 1200 + Math.random() * 900, easing: "cubic-bezier(.16,1,.3,1)", fill: "forwards" });
    }
  }

  /* ----------------------------------------------------------- aç / kapa */
  function disclosure() {
    $$("[data-toggle]").forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("data-toggle"));
      if (!panel) return;
      var openLabel = btn.getAttribute("data-label-open") || "Tümünü Gör";
      var closeLabel = btn.getAttribute("data-label-close") || "Listeyi Kapat";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-controls", panel.id);
      panel.hidden = true;
      btn.addEventListener("click", function () {
        var on = panel.hidden;
        panel.hidden = !on;
        btn.setAttribute("aria-expanded", on ? "true" : "false");
        var t = $("span", btn); if (t) t.textContent = on ? closeLabel : openLabel;
        if (on) {
          $$(".rv", panel).forEach(function (el) { el.classList.add("is-in"); });
          panel.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
        }
      });
    });
  }

  /* --------------------------------------------------------------- kartlar */
  function tilt() {
    if (!fine || reduced) return;
    $$("[data-tilt]").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = "translateY(-8px) perspective(900px) rotateX(" + (-y * 4) + "deg) rotateY(" + (x * 4) + "deg)";
      });
      card.addEventListener("mouseleave", function () { card.style.transform = ""; });
    });
  }

  /* ------------------------------------------------------------------ init */
  function init() {
    fillConfig(); reveals(); header(); ticker(); parallax(); magnetic();
    cursor(); dragStrip(); process(); transitions(); form(); disclosure(); tilt();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
