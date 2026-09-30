/* Vedenkeitin.fi – käyttöliittymä. Tuotetiedot: products.js, kaupat: retailers.js */
(function () {
  "use strict";
  var P = window.VK_PRODUCTS || [];
  var C = window.VK_CONFIG || {};
  var R = window.VK_RETAILERS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var MAT = { teras: "Teräs", lasi: "Lasi", muovi: "Muovi", muu: "Muu" };
  var USE = { peruskaytto: "Peruskäyttö", tee: "Tee", kahvi: "Kahvi", matkalle: "Matkalle", perhe: "Suuri perhe" };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function eur(n) { return n == null ? "–" : n.toFixed(2).replace(".", ",") + " €"; }
  function num(n, d) { return n == null ? "–" : String(d ? n.toFixed(d) : n).replace(".", ","); }
  function litres(n) { return n == null ? "–" : num(n, n % 1 ? 1 : 0) + " l"; }
  function date(iso) { if (!iso) return ""; var p = iso.split("-"); return +p[2] + "." + +p[1] + "." + p[0]; }
  function yn(v) { return v === true ? '<span class="yes">Kyllä</span>' : v === false ? '<span class="no">Ei</span>' : '<span class="no" title="Tietoa ei ole varmistettu">–</span>'; }
  function link(p) { return p.affiliate_url || p.retailer_url || retailerHome(p.retailer); }
  function retailerHome(name) { for (var i = 0; i < R.length; i++) if (R[i].name === name) return R[i].affiliate_url || R[i].url; return "#"; }
  function rel(p) { return p.affiliate_url ? "sponsored nofollow noopener" : "nofollow noopener"; }

  function priceBlock(p) {
    if (p.price != null && p.price_updated) {
      return '<div class="price-label">Esimerkkihinta</div><div class="price">' + eur(p.price) + '</div>' +
        '<div class="price-meta">Hinta tarkistettu: ' + date(p.price_updated) + ' · ' + esc(p.retailer) + '</div>';
    }
    return '<div class="price-label">Esimerkkihinta</div><div class="price">' + (p.price != null ? eur(p.price) : "–") + '</div>' +
      '<div class="price-meta warn">Hinta tarkistettava jälleenmyyjältä</div>';
  }

  function card(p) {
    var hasUrl = !!(p.affiliate_url || p.retailer_url);
    var btn = p.price_updated && hasUrl ? "Katso hinta" : hasUrl ? "Tarkista hinta" : "Siirry jälleenmyyjälle";
    return '<article class="pcard">' +
      '<div class="img"><span class="tag">' + esc(p.label) + '</span><img src="' + esc(p.image_url) + '" alt="" width="160" height="160" loading="lazy" decoding="async"></div>' +
      '<div class="body"><div class="brand">' + esc(p.brand) + '</div>' +
      '<h3>' + esc(p.product_name) + ' <span class="model">' + esc(p.model) + '</span></h3>' +
      '<div class="specs"><span class="chip">' + litres(p.capacity_l) + '</span><span class="chip">' + num(p.power_w) + ' W</span><span class="chip">' + MAT[p.material] + '</span>' +
      (p.temperature_control ? '<span class="chip">Lämpötilansäätö</span>' : '') + '</div>' +
      '<ul class="hl">' + (p.highlights || []).map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + '</ul>' +
      '<div class="price-box">' + priceBlock(p) +
      '<a class="btn btn-ghost btn-sm" href="' + esc(link(p)) + '" target="_blank" rel="' + rel(p) + '">' + btn + ' <span class="sr">(' + esc(p.product_name) + ', avautuu uuteen välilehteen)</span><span aria-hidden="true">↗</span></a>' +
      '<div class="price-meta">Katso ajantasainen hinta jälleenmyyjältä.</div></div></div></article>';
  }

  function row(p, full) {
    var price = p.price != null ? eur(p.price) : "–";
    var sub = p.price_updated ? "Tarkistettu " + date(p.price_updated) : "Tarkistettava jälleenmyyjältä";
    return "<tr>" +
      '<td class="cell-main" data-label="Tuote"><div class="tprod"><img src="' + esc(p.image_url) + '" alt="" width="34" height="34" loading="lazy"><div><strong>' + esc(p.product_name) + "</strong><small>" + esc(p.brand) + " " + esc(p.model) + "</small></div></div></td>" +
      '<td class="num t-price" data-label="Esimerkkihinta"><span>' + price + "<small>" + sub + "</small></span></td>" +
      '<td class="num" data-label="Tilavuus">' + litres(p.capacity_l) + "</td>" +
      '<td class="num" data-label="Teho">' + num(p.power_w) + " W</td>" +
      '<td data-label="Lämpötilansäätö">' + yn(p.temperature_control) + "</td>" +
      '<td data-label="Materiaali">' + MAT[p.material] + "</td>" +
      (full ? '<td data-label="Kalkkisuodatin">' + yn(p.filter) + "</td>" : "") +
      '<td data-label="Jälleenmyyjä"><a href="' + esc(link(p)) + '" target="_blank" rel="' + rel(p) + '">' + esc(p.retailer) + ' <span aria-hidden="true">↗</span><span class="sr">(avautuu uuteen välilehteen)</span></a></td>' +
      "</tr>";
  }

  function table(list, full) {
    return '<div class="table-wrap"><table class="rtable compare"><caption class="sr">Vedenkeittimien vertailu</caption><thead><tr>' +
      '<th scope="col">Tuote</th><th scope="col">Hinta</th><th scope="col">Tilavuus</th><th scope="col">Teho</th><th scope="col">Lämpötilansäätö</th><th scope="col">Materiaali</th>' +
      (full ? '<th scope="col">Kalkkisuodatin</th>' : "") + '<th scope="col">Jälleenmyyjä</th></tr></thead><tbody>' +
      list.map(function (p) { return row(p, full); }).join("") + "</tbody></table></div>";
  }

  var byPrice = function (a, b) { return (a.price == null ? 1e9 : a.price) - (b.price == null ? 1e9 : b.price); };

  /* Päivämäärät */
  $$("[data-date]").forEach(function (el) { var k = el.getAttribute("data-date"); el.textContent = date(k === "prices" ? C.pricesChecked : C.siteUpdated); });

  /* Mobiilivalikko */
  var mt = $(".menu-toggle"), nav = $("#nav");
  if (mt && nav) mt.addEventListener("click", function () { var o = nav.classList.toggle("open"); mt.setAttribute("aria-expanded", o); });

  /* Etusivun hintaluokkien määrät */
  $$("[data-tier]").forEach(function (el) {
    var r = el.getAttribute("data-tier").split("-"), lo = +r[0], hi = r[1] ? +r[1] : Infinity;
    var n = P.filter(function (p) { return p.price != null && p.price >= lo && p.price < hi; }).length;
    var t = $(".count", el); if (t) t.textContent = n + " / " + P.length + " vertailun mallista";
    var b = $(".bar span", el); if (b) b.style.width = Math.max(4, Math.round(n / (P.length || 1) * 100)) + "%";
  });

  /* Tuotekortit */
  $$("[data-products]").forEach(function (el) {
    var mode = el.getAttribute("data-products"), list = P.slice().sort(byPrice);
    if (mode === "featured") list = list.slice(0, +(el.getAttribute("data-limit") || 8));
    el.innerHTML = list.map(card).join("");
  });

  /* Vertailutaulukot */
  $$("[data-table]").forEach(function (el) { el.innerHTML = table(P.slice().sort(byPrice), el.getAttribute("data-table") === "full"); });

  /* Jälleenmyyjät */
  $$("[data-retailers]").forEach(function (el) {
    var compact = el.getAttribute("data-retailers") === "compact";
    el.innerHTML = R.map(function (r) {
      var u = r.affiliate_url || r.url, relv = r.affiliate_url ? "sponsored nofollow noopener" : "noopener";
      return '<article class="rcard"><h3>' + esc(r.name) + "</h3><p>" + esc(r.types) + "</p>" +
        (compact ? "" : "<dl><div><dt>Hintaluokka</dt><dd>" + esc(r.price_range) + "</dd></div><div><dt>Nouto</dt><dd>" + esc(r.pickup) + "</dd></div></dl>") +
        '<a class="ext" href="' + esc(u) + '" target="_blank" rel="' + relv + '">Siirry verkkokauppaan <span aria-hidden="true">↗</span><span class="sr">(' + esc(r.name) + ", avautuu uuteen välilehteen)</span></a></article>";
    }).join("");
  });

  /* Product-schema vain tarkistetuille hinnoille */
  if ($("[data-schema-products]")) {
    var items = P.filter(function (p) { return p.price != null && p.price_updated; }).map(function (p, i) {
      return { "@type": "ListItem", position: i + 1, item: { "@type": "Product", name: p.brand + " " + p.model + " " + p.product_name.replace(p.brand, "").trim(), brand: { "@type": "Brand", name: p.brand }, mpn: p.model,
        offers: { "@type": "Offer", price: p.price.toFixed(2), priceCurrency: "EUR", url: link(p), seller: { "@type": "Organization", name: p.retailer } } } };
    });
    var s = document.createElement("script"); s.type = "application/ld+json";
    s.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: "Vedenkeittimien hintavertailu", itemListElement: items });
    document.head.appendChild(s);
  }

  /* Suodatus ja lajittelu */
  var form = $("#filters");
  if (form) {
    var out = $("#results"), cnt = $("#result-count"), sortSel = $("#sort"), range = $("#f-max"), rOut = $("#f-max-out");
    var maxP = Math.ceil(Math.max.apply(null, P.map(function (p) { return p.price || 0; })) / 10) * 10 || 200;
    range.max = maxP; range.value = maxP;
    var brands = P.map(function (p) { return p.brand; }).filter(function (b, i, a) { return a.indexOf(b) === i; }).sort();
    $("#f-brand").innerHTML = '<option value="">Kaikki merkit</option>' + brands.map(function (b) { return '<option>' + esc(b) + "</option>"; }).join("");

    var bands = { "0-30": [0, 30], "30-50": [30, 50], "50-100": [50, 100], "100-": [100, Infinity] };
    var activeBand = "";

    function checked(name) { return $$('input[name="' + name + '"]:checked', form).map(function (i) { return i.value; }); }
    function apply(push) {
      var max = +range.value; rOut.textContent = max >= maxP ? "Ei ylärajaa" : "enintään " + max + " €";
      var brand = $("#f-brand").value, cap = checked("cap"), temp = checked("temp"), mat = checked("mat"), use = checked("use"), pw = checked("pw");
      var list = P.filter(function (p) {
        var pr = p.price == null ? 0 : p.price;
        if (max < maxP && pr > max) return false;
        if (activeBand) { var b = bands[activeBand]; if (p.price == null || pr < b[0] || pr >= b[1]) return false; }
        if (brand && p.brand !== brand) return false;
        if (cap.length && !cap.some(function (c) { return c === "s" ? p.capacity_l < 1 : c === "m" ? p.capacity_l >= 1 && p.capacity_l < 1.5 : p.capacity_l >= 1.5; })) return false;
        if (pw.length && !pw.some(function (c) { return c === "s" ? p.power_w < 1800 : c === "m" ? p.power_w >= 1800 && p.power_w < 2300 : p.power_w >= 2300; })) return false;
        if (temp.length && temp.indexOf(p.temperature_control ? "1" : "0") < 0) return false;
        if (mat.length && mat.indexOf(p.material) < 0) return false;
        if (use.length && !use.some(function (u) { return (p.use_cases || []).indexOf(u) >= 0; })) return false;
        return true;
      });
      var s = sortSel.value;
      list.sort(s === "desc" ? function (a, b) { return byPrice(b, a); } : s === "cap" ? function (a, b) { return b.capacity_l - a.capacity_l || byPrice(a, b); } : s === "new" ? function (a, b) { return (b.added || "").localeCompare(a.added || "") || byPrice(a, b); } : byPrice);
      cnt.textContent = list.length + (list.length === 1 ? " malli" : " mallia");
      var view = out.getAttribute("data-view");
      if (!list.length) {
        var tip = temp.indexOf("1") >= 0 || use.indexOf("tee") >= 0 || use.indexOf("kahvi") >= 0
          ? '<p>Vertailussa ei ole vielä lämpötilansäädöllisiä malleja. Lisäämme niitä, kun tiedot on tarkistettu. Siihen asti <a href="/vedenkeitin-lampotilansaadolla/">lue, mitä lämpötilansäätömallissa kannattaa katsoa</a>.</p>'
          : "<p>Hakuehdoillasi ei löytynyt malleja. Kokeile väljentää suodattimia.</p>";
        out.innerHTML = '<div class="empty">' + tip + '<button type="button" class="reset" data-reset>Tyhjennä suodattimet</button></div>';
      } else out.innerHTML = view === "table" ? table(list, true) : '<div class="products">' + list.map(card).join("") + "</div>";
      if (push) syncUrl();
    }
    function syncUrl() {
      var q = new URLSearchParams();
      ["cap", "temp", "mat", "use", "pw"].forEach(function (n) { var v = checked(n); if (v.length) q.set(n, v.join(",")); });
      if ($("#f-brand").value) q.set("merkki", $("#f-brand").value);
      if (+range.value < maxP) q.set("max", range.value);
      if (activeBand) q.set("hinta", activeBand);
      if (sortSel.value !== "asc") q.set("jarjestys", sortSel.value);
      history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : ""));
    }
    function readUrl() {
      var q = new URLSearchParams(location.search);
      ["cap", "temp", "mat", "use", "pw"].forEach(function (n) { (q.get(n) || "").split(",").forEach(function (v) { var i = $('input[name="' + n + '"][value="' + v + '"]', form); if (i) i.checked = true; }); });
      if (q.get("merkki")) $("#f-brand").value = q.get("merkki");
      if (q.get("max")) range.value = q.get("max");
      if (q.get("jarjestys")) sortSel.value = q.get("jarjestys");
      if (bands[q.get("hinta")]) setBand(q.get("hinta"));
    }
    function setBand(v) { activeBand = activeBand === v ? "" : v; $$(".band").forEach(function (b) { b.setAttribute("aria-pressed", b.value === activeBand); }); }
    function reset() { form.reset(); range.value = maxP; activeBand = ""; $$(".band").forEach(function (b) { b.setAttribute("aria-pressed", "false"); }); sortSel.value = "asc"; apply(true); }

    form.addEventListener("input", function () { apply(true); });
    form.addEventListener("change", function () { apply(true); });
    sortSel.addEventListener("change", function () { apply(true); });
    $$(".band").forEach(function (b) { b.addEventListener("click", function () { setBand(b.value); apply(true); }); });
    document.addEventListener("click", function (e) { if (e.target.closest("[data-reset]")) reset(); });
    var ft = $(".ftoggle");
    if (ft) ft.addEventListener("click", function () { var f = $(".filters"), c = f.getAttribute("data-collapsed") === "true"; f.setAttribute("data-collapsed", !c); ft.setAttribute("aria-expanded", c); ft.textContent = c ? "Piilota" : "Näytä suodattimet"; });
    readUrl(); apply(false);
  }

  /* Sähkönkulutuslaskuri */
  var calc = $("#calc");
  if (calc) {
    var fmt = function (n, d) { return n.toLocaleString("fi-FI", { minimumFractionDigits: d, maximumFractionDigits: d }); };
    var run = function () {
      var v = parseFloat(String($("#c-l").value).replace(",", ".")) || 0,
        t0 = parseFloat(String($("#c-t0").value).replace(",", ".")),
        t1 = parseFloat(String($("#c-t1").value).replace(",", ".")),
        pr = parseFloat(String($("#c-p").value).replace(",", ".")) || 0,
        eff = (parseFloat(String($("#c-e").value).replace(",", ".")) || 85) / 100,
        n = parseFloat(String($("#c-n").value).replace(",", ".")) || 0;
      if (isNaN(t0)) t0 = 10; if (isNaN(t1)) t1 = 100;
      var dT = Math.max(0, Math.min(t1, 100) - t0);
      var kwh = v * 4.186 * dT / 3600 / Math.max(eff, 0.3);
      var cents = kwh * pr * 100;
      $("#r-kwh").textContent = fmt(kwh, 3) + " kWh";
      $("#r-wh").textContent = "noin " + fmt(kwh * 1000, 0) + " Wh yhdellä keittokerralla";
      $("#r-eur").textContent = cents < 100 ? fmt(cents, 2) + " snt" : fmt(cents / 100, 2) + " €";
      $("#r-year").textContent = n > 0 ? "Vuodessa noin " + fmt(kwh * n * 365, 0) + " kWh ja " + fmt(kwh * n * 365 * pr, 2) + " €, kun keität " + fmt(n, 0) + " kertaa päivässä." : "";
    };
    calc.addEventListener("input", run); calc.addEventListener("submit", function (e) { e.preventDefault(); run(); }); run();
  }
})();
