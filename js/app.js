(function () {
  "use strict";
  var M = window.MENU;
  if (!M) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* Tat ikonları */
  var TASTES = {
    tatli: {
      label: "Tatlı",
      svg: '<svg viewBox="0 0 24 24" class="taste-icon" aria-hidden="true"><path d="M12 2.5c3.2 4.3 6.5 8 6.5 12a6.5 6.5 0 0 1-13 0c0-4 3.3-7.7 6.5-12Z" fill="var(--sweet)"/><circle cx="12" cy="15" r="2.6" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M12 11.2v1.2M12 17.6v1.2M8.2 15h1.2M14.6 15h1.2" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/></svg>'
    },
    eksi: {
      label: "Ekşi",
      svg: '<svg viewBox="0 0 24 24" class="taste-icon" aria-hidden="true"><path d="M4 20A12 12 0 0 1 20 4Z" fill="var(--sour)"/><path d="M6.4 17.6A8.6 8.6 0 0 1 17.6 6.4Z" fill="#DDF3C8"/><path d="M6.4 17.6 12 9M6.4 17.6 15.5 11" stroke="var(--sour)" stroke-width="1.2"/><circle cx="17" cy="16" r="3.2" fill="var(--sour)"/><circle cx="17" cy="16" r="1.6" fill="#DDF3C8"/></svg>'
    },
    baharatli: {
      label: "Baharatlı",
      svg: '<svg viewBox="0 0 24 24" class="taste-icon" aria-hidden="true"><path d="M12 21c-4-3-6.5-6.2-6.5-9.4A6.5 6.5 0 0 1 12 5a6.5 6.5 0 0 1 6.5 6.6C18.5 14.8 16 18 12 21Z" fill="var(--spice)"/><path d="M12 7.5v11M12 11l-3-2M12 11l3-2M12 14.5l-3.4-2M12 14.5l3.4-2" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/><path d="M12 5V2.5" stroke="var(--spice)" stroke-width="1.6" stroke-linecap="round"/></svg>'
    },
    aci: {
      label: "Acı",
      svg: '<svg viewBox="0 0 24 24" class="taste-icon" aria-hidden="true"><path d="M12 22c-4.1 0-7-2.8-7-6.6 0-3.4 2.4-5.4 3.6-8.4.6 1.9 1.5 2.9 2.4 3.3C11 7 12.4 4.3 14.8 2c.3 3.6 4.2 6.3 4.2 12 0 4.6-3 8-7 8Z" fill="var(--hot)"/><path d="M12 20c-1.9 0-3.2-1.3-3.2-3 0-1.6 1.2-2.6 1.8-4 .4.9.9 1.4 1.4 1.5.2-1.5.9-2.8 2-3.8.3 2.2 1.3 3.4 1.3 5.6 0 2.1-1.4 3.7-3.3 3.7Z" fill="#FFC23A"/></svg>'
    }
  };

  /* Kokteyller */
  document.getElementById("kokteyl-not").textContent = M.kokteyl.not;

  var legend = document.getElementById("tat-lejant");
  ["tatli", "eksi", "baharatli", "aci"].forEach(function (k) {
    var li = el("li");
    li.innerHTML = TASTES[k].svg;
    li.appendChild(el("span", null, TASTES[k].label));
    legend.appendChild(li);
  });

  var cList = document.getElementById("kokteyl-liste");
  M.kokteyl.urunler.forEach(function (c) {
    var li = el("li", "cocktail");
    li.appendChild(el("span", "cocktail__no", c.no + "-"));
    var body = el("div");
    body.appendChild(el("h3", "cocktail__name", c.ad));

    var prices = el("div", "prices");
    [["Cocktail", c.cocktail, ""], ["Mocktail", c.mocktail, " price-chip--mock"]].forEach(function (p) {
      var chip = el("span", "price-chip" + p[2], p[0]);
      chip.appendChild(el("b", null, p[1]));
      prices.appendChild(chip);
    });
    body.appendChild(prices);
    body.appendChild(el("p", "desc", c.icerik));

    if (c.tat && c.tat.length) {
      var t = el("div", "tastes");
      t.setAttribute("aria-label", "Tat: " + c.tat.map(function (k) { return TASTES[k].label; }).join(", "));
      t.innerHTML = c.tat.map(function (k) { return TASTES[k].svg; }).join("");
      body.appendChild(t);
    }
    li.appendChild(body);
    cList.appendChild(li);
  });

  /* Genel satır */
  function row(u, cols) {
    var li = el("li", "item");
    var head = el("div", "item__head");
    head.appendChild(el("span", "item__name", u.ad));
    if (cols) {
      head.appendChild(el("span", "item__price item__price--col", u.fiyat || ""));
      head.appendChild(el("span", "item__price item__price--col", u.sise || ""));
    } else {
      head.appendChild(el("span", "item__price", u.fiyat));
    }
    li.appendChild(head);
    if (u.icerik) li.appendChild(el("p", "desc", u.icerik));
    return li;
  }

  /* Yemek */
  var fList = document.getElementById("yemek-liste");
  M.yemek.forEach(function (u) { fList.appendChild(row(u)); });

  /* İçecek */
  var groups = document.getElementById("icecek-gruplar");
  M.icecek.forEach(function (g) {
    var hasDesc = g.urunler.some(function (u) { return u.icerik; });
    var box = el("div", "group" + (hasDesc ? "" : " group--compact"));
    var h = el("h3", "group__title", g.baslik);
    if (g.ikiFiyat) {
      var cols = el("span", "group__cols");
      cols.appendChild(el("span", null, "Kadeh"));
      cols.appendChild(el("span", null, "Şişe"));
      h.appendChild(cols);
    }
    box.appendChild(h);
    var ul = el("ul");
    g.urunler.forEach(function (u) { ul.appendChild(row(u, g.ikiFiyat)); });
    box.appendChild(ul);
    groups.appendChild(box);
  });

  var deal = document.getElementById("shot-kampanya");
  M.shotKampanya.forEach(function (s) {
    var r = el("div", "deal__row");
    r.appendChild(el("span", "deal__tag", "5+1"));
    r.appendChild(el("span", "deal__name", s.ad));
    r.appendChild(el("span", "deal__price", s.fiyat));
    deal.appendChild(r);
  });

  /* Kampanyalar + büyütme */
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var camp = document.getElementById("kampanya-liste");
  M.kampanyalar.forEach(function (k) {
    var b = el("button", "campaign");
    b.type = "button";
    b.setAttribute("aria-label", k.alt + " (büyüt)");
    var img = el("img");
    img.src = k.gorsel;
    img.alt = k.alt;
    img.loading = "lazy";
    img.width = 900;
    img.height = 1125;
    b.appendChild(img);
    b.addEventListener("click", function () {
      lbImg.src = k.gorsel;
      lbImg.alt = k.alt;
      if (lb.showModal) lb.showModal(); else window.open(k.gorsel, "_blank");
    });
    camp.appendChild(b);
  });
  lb.addEventListener("click", function () { lb.close(); });

  /* Yasal metin */
  document.getElementById("yasal").innerHTML =
    M.guncelleme + "<br>" + M.vergi;

  /* Aktif sekme + header rengi */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var theme = document.querySelector('meta[name="theme-color"]');
  var header = document.querySelector(".topbar");
  document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");

  function setActive(id) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("href") === "#" + id;
      t.classList.toggle("is-active", on);
      if (on) {
        t.setAttribute("aria-current", "true");
        var nav = t.parentNode;
        nav.scrollTo({ left: t.offsetLeft - (nav.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
      } else {
        t.removeAttribute("aria-current");
      }
    });
    var s = document.getElementById(id);
    if (s) {
      var c = s.getAttribute("data-theme");
      header.style.setProperty("--hdr", c);
      document.body.style.backgroundColor = c;
      if (theme) theme.setAttribute("content", c);
    }
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll("main .section"));
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var line = header.offsetHeight + 40;
      var current = sections[0].id;
      sections.forEach(function (s) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      });
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 4) {
        current = sections[sections.length - 1].id;
      }
      if (current !== onScroll.last) { setActive(current); onScroll.last = current; }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  });
  onScroll();
})();
