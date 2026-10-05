#!/usr/bin/env node
/**
 * Rehber sayfalari ureticisi (5 Eki 2026).
 *   _gen/rehber.src.html            sayfa kabugu (ust cubuk, altbilgi, tema, mini ekran motoru)
 *   _gen/rehber/icerik/<id>.<dil>.mjs  metinler (id: merkez, hatim, tek, zikir, katil)
 *   _gen/rehber/sahne.mjs + sahneler.mjs  mini ekranlar (uygulamanin dugme adlariyla)
 *   _gen/rehber/app-labels.json     uygulama metinleri (node _gen/sync-app-labels.mjs)
 *   img/rehber/<dil>/*.webp         gercek ekran kareleri (store-assets/gallery-2026-10/raw,
 *                                   cwebp -resize 640 0 -q 80)
 * Cikti: adresler _gen/site-urls.mjs REHBER/REHBER_SAYFA; sitemap.xml MH:REHBER bolgesi.
 *
 * Icerik bicimi (icerik dosyasi `export default {...}`):
 *   title, desc, h1, lead, crumb, eyebrow, meta[], film{sahne, cap}, kisa{baslik, maddeler[]},
 *   govde[] (bloklar), sss{baslik, sorular[{s, c}]}, ilgili[], kart{kicker, baslik, metin},
 *   onizleme{sahne, adim}, cta{baslik, metin}, etiket{...} (bu sayfadaki kucuk basliklar)
 * Bloklar:
 *   {tur:"bolum", id, rol, baslik, giris, adimlar:[{baslik, metin, liste[], ipucu, fark, sahne}]}
 *   {tur:"halka", baslik, metin}                       30 taneli tur halkasi
 *   {tur:"ikili", id, rol, baslik, giris, kartlar:[{baslik, metin, sahne}], not}
 *   {tur:"ekranlar", id, baslik, giris, kareler:[{img, alt, cap}]}
 * Metin isaretleri: **kalin**, [yazi](adres), [[anahtar]] uygulamadaki dugme (app-labels),
 *   [[ol:anahtar]] cerceveli dugme, [[tx:anahtar]] secenek/etiket, [[=yazi]] uygulamadaki ad (anahtarsiz).
 *
 * KULLANIM:
 *   node _gen/build-rehber.mjs           uretir ve yazar
 *   node _gen/build-rehber.mjs --check   yazmaz, fark varsa cikis 1
 *   node _gen/build-rehber.mjs --tam     bes dilin hepsi yoksa durur (yayindan once)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";
import { SITE, DILLER, EV, VAKIT, OG_LOCALE, DIL_ADI, REHBER, REHBER_SAYFA, rehberAdresi, dosyaYolu, tamAdres } from "./site-urls.mjs";
import { kit, ikonSprite, e, IKON } from "./rehber/sahne.mjs";
import { SAHNE as SAHNE_TABAN, turHalkasi } from "./rehber/sahneler.mjs";
import { readdirSync } from "node:fs";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const KONTROL = process.argv.includes("--check");
const TAM = process.argv.includes("--tam");
// --yalniz <id>: yalniz o rehberi uretir (paralel calisan yazarlar birbirinin yarim dosyasina takilmasin);
// yalniz o rehberin sahne dosyasi yuklenir, site haritasi yazilmaz.
const YALNIZ = (() => { const i = process.argv.indexOf("--yalniz"); return i > 0 ? process.argv[i + 1] : null; })();
// --dil <dil>: yalniz o dilin icerik dosyalari yuklenir ve uretilir (paralel cevirmenler icin; site haritasi yazilmaz).
// --og: paylasim gorseli icin 1200x630 sayfalar _gen/og-tmp/ altina yazilir (sayfa yazilmaz);
// _gen/rehber-og.py bunlari Chrome ile cekip img/rehber/og/<id>-<dil>.jpg yapar.
const OGMOD = process.argv.includes("--og");
const YDIL = (() => { const i = process.argv.indexOf("--dil"); return i > 0 ? process.argv[i + 1] : null; })();
const hata = (m) => { console.error("HATA: " + m); process.exit(1); };
const IDLER = ["hatim", "tek", "zikir", "katil"];

// Ek sahne dosyalari: _gen/rehber/sahneler-*.mjs  (export const SAHNE = {...}; isteğe bağlı export const CSS = "...")
// Her rehberin yeni ekranlari kendi dosyasinda durur; ayni kimlik iki dosyada olamaz.
const SAHNE = { ...SAHNE_TABAN };
let EK_CSS = "";
for (const ad of readdirSync(join(KOK, "_gen", "rehber")).filter((f) => /^sahneler-[a-z0-9-]+\.mjs$/.test(f)).sort()) {
  const m = await import(pathToFileURL(join(KOK, "_gen", "rehber", ad)).href);
  for (const [k, d] of Object.entries(m.IKON || {})) { if (IKON[k] && IKON[k] !== d) hata(`ikon adi cakisiyor: ${k} (${ad})`); IKON[k] = d; }
  for (const [k, f] of Object.entries(m.SAHNE || {})) { if (SAHNE[k]) hata(`sahne kimligi iki kez tanimli: ${k} (${ad})`); SAHNE[k] = f; }
  if (m.CSS) EK_CSS += `\n  /* ── ${ad} ── */\n  ${m.CSS.trim()}\n`;
}

// ─── kabuk metinleri: ortak kaynaklar ───────────────────────────────────────
const CHROME = JSON.parse(readFileSync(join(KOK, "_data", "chrome.json"), "utf8"));
const kutu = {};
vm.createContext(kutu);
vm.runInContext(readFileSync(join(KOK, "_gen", "site-i18n.js"), "utf8"), kutu);
const I18N = kutu.I18N;
const OZEL = {
  navGuides: { tr: "Rehberler", en: "Guides", de: "Anleitungen", fr: "Guides", ar: "الأدلة" },
  getApp: { tr: "Uygulamayı indir", en: "Get the app", de: "App laden", fr: "Télécharger l’appli", ar: "حمّل التطبيق" },
  crumbAria: { tr: "Konum", en: "Breadcrumb", de: "Pfad", fr: "Fil d’Ariane", ar: "مسار التنقل" },
  pause: { tr: "Animasyonu durdur", en: "Pause animation", de: "Animation anhalten", fr: "Mettre l’animation en pause", ar: "إيقاف الحركة" },
  play: { tr: "Animasyonu oynat", en: "Play animation", de: "Animation abspielen", fr: "Lire l’animation", ar: "تشغيل الحركة" },
  kisaca: { tr: "Kısaca", en: "In short", de: "Kurz gesagt", fr: "En bref", ar: "باختصار" },
  icindekiler: { tr: "Bu rehberde", en: "In this guide", de: "In dieser Anleitung", fr: "Dans ce guide", ar: "في هذا الدليل" },
  sss: { tr: "Sık sorulanlar", en: "Frequently asked questions", de: "Häufige Fragen", fr: "Questions fréquentes", ar: "أسئلة شائعة" },
  ilgili: { tr: "Diğer rehberler", en: "More guides", de: "Weitere Anleitungen", fr: "Autres guides", ar: "أدلة أخرى" },
  oku: { tr: "Rehberi aç", en: "Open the guide", de: "Anleitung öffnen", fr: "Ouvrir le guide", ar: "افتح الدليل" },
  dokun: { tr: "Dokun:", en: "Tap:", de: "Tippe auf:", fr: "Touche :", ar: "اضغط:" },
  ctaTitle: { tr: "Halkanı bugün kur", en: "Start your circle today", de: "Gründe heute deinen Kreis", fr: "Crée ton cercle aujourd’hui", ar: "أنشئ حلقتك اليوم" },
  // "Uygulama ucretsiz" denmez: Premium var. Indirmek, halka kurmak ve katilmak ucretsiz.
  ctaText: { tr: "Manevi Halka'yı ücretsiz indir, halkanı kur, davet linkini paylaş.",
    en: "Download Manevi Halka for free, create your circle and share the invite link.",
    de: "Lade Manevi Halka kostenlos, gründe deinen Kreis und teile den Einladungslink.",
    fr: "Télécharge Manevi Halka gratuitement, crée ton cercle et partage le lien d’invitation.",
    ar: "حمّل Manevi Halka مجانًا، وأنشئ حلقتك، وشارك رابط الدعوة." },
  bolum: { tr: "Bölüm", en: "Part", de: "Teil", fr: "Partie", ar: "الجزء" },
};
const IOS = "https://apps.apple.com/app/manevi-halka/id6760654292";
const play = (yer, dil) => "https://play.google.com/store/apps/details?id=com.emrhnayz.spiritualcircle&referrer=" +
  encodeURIComponent(`utm_source=manevihalka.app&utm_medium=website&utm_content=${yer}-${dil}`);
const politika = (ad, dil) => dil === "tr" ? `/${ad}.html` : `/${ad}-${dil}.html`;
const kacirMetin = (x) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ─── icerik ─────────────────────────────────────────────────────────────────
const ICERIK = {};
for (const id of ["merkez", ...IDLER]) {
  ICERIK[id] = {};
  for (const d of DILLER) {
    if (YDIL && d !== YDIL) continue;
    const p = join(KOK, "_gen", "rehber", "icerik", `${id}.${d}.mjs`);
    if (existsSync(p)) ICERIK[id][d] = (await import(pathToFileURL(p).href + `?t=${Date.now()}`)).default;
  }
}
const var_mi = (id, d) => !!(ICERIK[id] && ICERIK[id][d]);
const eksik = [];
for (const id of ["merkez", ...IDLER]) for (const d of DILLER) if (!var_mi(id, d)) eksik.push(`${id}.${d}`);
if (eksik.length) { if (TAM) hata("eksik icerik: " + eksik.join(", ")); console.log("not: henuz yazilmamis: " + eksik.join(", ")); }
const adres = (id, d) => (id === "merkez" ? REHBER[d] : rehberAdresi(id, d));

// ─── metin isaretleri ───────────────────────────────────────────────────────
function satir(s, K) {
  if (s == null) return "";
  let h = kacirMetin(String(s)).replace(/"/g, "&quot;");
  h = h.replace(/\[\[(ol:|tx:)?(=)?([^\]]+?)\]\]/g, (_, tur, duz, govde) => {
    const metin = duz ? govde : kacirMetin(K.L(govde));
    // Uzun etiket (cumle gibi notlar, Almanca/Fransizca uzun adlar) tek parca kalirsa telefonda
    // satirdan tasiyor ve kirpiliyordu: 20 harften uzunsa satir icinde kirilabilen bicim.
    const uzun = metin.replace(/&[a-z#0-9]+;/gi, "x").length > 20 ? " uzun" : "";
    const cls = (tur === "ol:" ? "kb ol" : tur === "tx:" ? "kb tx" : "kb") + uzun;
    return `<span class="${cls}">${metin}</span>`;
  });
  // Fransizca: iki nokta, noktali virgul, soru ve unlemden onceki bosluk bolunmez olsun
  if (K && K.dil === "fr") h = h.replace(/ ([:;?!»])/g, "\u00a0$1").replace(/« /g, "«\u00a0");
  // Etiketten hemen sonra gelen noktalama alt satira tek basina dusmesin
  h = h.replace(/(<span class="kb(?![^"]*uzun)[^"]*">[^<]*<\/span>)([,.;:!?)»؟،\u00a0]+)/g, '<span class="kbw">$1$2</span>');
  h = h.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
    const dis = /^https?:\/\//.test(u) && !u.startsWith(SITE);
    return `<a href="${u}"${dis ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`;
  });
  return h;
}
// Duz metin (yapisal veri, aria): [[anahtar]] uygulamadaki ada cozulur, isaretler atilir.
const duzMetin = (s, K) => String(s || "")
  .replace(/\[\[(ol:|tx:)?(=)?([^\]]+?)\]\]/g, (_, tur, duz, govde) => (duz || !K ? govde : K.L(govde)))
  .replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
const paragraflar = (m, K) => (Array.isArray(m) ? m : m ? [m] : []).map((p) => `<p>${satir(p, K)}</p>`).join("");

// ─── parcalar ───────────────────────────────────────────────────────────────
const SVG = {
  bead: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="0 4.45"/></svg>',
  ring: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="0 6.07"/></svg>',
  tap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0 0V8.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4c0 3.6-2.4 6-5.6 6-2.2 0-3.6-1-4.8-3l-2.1-3.4a1.4 1.4 0 0 1 2.3-1.6L9 13.5"/></svg>',
  tip: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
  why: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  key: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>',
  gift: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
const META_IKON = [SVG.clock, SVG.key, SVG.gift];

function adim(a, n, K) {
  const fig = a.sahne ? `<div class="gs-fig">${sahneHtml(a.sahne, K)}</div>` : "";
  return `<li class="gstep">
        <span class="bead">${n}</span>
        <div class="gs-text">
          <h3>${satir(a.baslik, K)}</h3>
          ${paragraflar(a.metin, K)}
          ${a.liste ? `<ul>${a.liste.map((x) => `<li>${satir(x, K)}</li>`).join("")}</ul>` : ""}
          ${a.fark ? `<p class="why">${SVG.why}<span>${satir(a.fark, K)}</span></p>` : ""}
          ${a.ipucu ? `<p class="tip">${SVG.tip}<span>${satir(a.ipucu, K)}</span></p>` : ""}
        </div>
        ${fig}
      </li>`;
}
function sahneHtml(id, K) {
  if (!SAHNE[id]) hata(`sahne yok: ${id}`);
  return SAHNE[id](K);
}
function bolumBasi(b, no, K, dil) {
  return `<header class="part-head"><span class="part-no">${SVG.ring}${no}</span><div>
        ${b.rol ? `<span class="role">${kacirMetin(b.rol)}</span>` : ""}
        <h2>${satir(b.baslik, K)}</h2>
        ${b.giris ? paragraflar(b.giris, K) : ""}
      </div></header>`;
}

function rehberGovde(id, dil, K) {
  const c = ICERIK[id][dil];
  let no = 0, adimNo = 0;
  const bolumler = [];
  const govde = c.govde.map((b) => {
    if (b.tur === "bolum") {
      no++; bolumler.push({ id: b.id, baslik: b.baslik, rol: b.rol, no });
      return `<section class="part" id="${b.id}">
      ${bolumBasi(b, no, K, dil)}
      <ol class="gsteps">
      ${b.adimlar.map((a) => adim(a, ++adimNo, K)).join("\n      ")}
      </ol>
    </section>`;
    }
    if (b.tur === "halka") {
      return `<div class="rotblock"><div><h3>${satir(b.baslik, K)}</h3>${paragraflar(b.metin, K)}</div>${turHalkasi(K, { aria: duzMetin(b.baslik, K) })}</div>`;
    }
    if (b.tur === "ikili") {
      no++; bolumler.push({ id: b.id, baslik: b.baslik, rol: b.rol, no });
      return `<section class="part" id="${b.id}">
      ${bolumBasi(b, no, K, dil)}
      <div class="duo">${b.kartlar.map((k) => `<article><h3>${satir(k.baslik, K)}</h3>${paragraflar(k.metin, K)}${k.sahne ? sahneHtml(k.sahne, K) : ""}</article>`).join("")}</div>
      ${b.not ? `<p class="tip" style="margin-top:20px;max-width:48em">${SVG.tip}<span>${satir(b.not, K)}</span></p>` : ""}
    </section>`;
    }
    if (b.tur === "ekranlar") {
      if (b.id) bolumler.push({ id: b.id, baslik: b.baslik, no: null });
      return `<section class="part" id="${b.id || "ekranlar"}">
      <header class="part-head" style="grid-template-columns:1fr"><div><h2>${satir(b.baslik, K)}</h2>${b.giris ? paragraflar(b.giris, K) : ""}</div></header>
      <ul class="shots">${b.kareler.map((s) => {
        const yol = join(KOK, "img", "rehber", dil, s.img + ".webp");
        if (!existsSync(yol)) hata(`${dil}: ekran karesi yok: img/rehber/${dil}/${s.img}.webp`);
        const [w, h] = webpBoyut(yol);
        return `<li><figure class="shot"><div class="phone"><img src="/img/rehber/${dil}/${s.img}.webp" alt="${e(s.alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"></div><figcaption>${satir(s.cap, K)}</figcaption></figure></li>`;
      }).join("")}</ul>
    </section>`;
    }
    hata(`${id}.${dil}: bilinmeyen blok turu ${b.tur}`);
  }).join("\n    ");

  const toc = `<nav class="toc" aria-label="${e(OZEL.icindekiler[dil])}"><b>${OZEL.icindekiler[dil]}</b><ul>
        ${bolumler.map((x) => `<li><a href="#${x.id}"><span class="tn">${x.no ?? "·"}</span><span>${satir(x.baslik, K)}${x.rol ? `<small> · ${kacirMetin(x.rol)}</small>` : ""}</span></a></li>`).join("\n        ")}
        ${c.sss ? `<li><a href="#sss"><span class="tn">?</span><span>${kacirMetin(c.sss.baslik || OZEL.sss[dil])}</span></a></li>` : ""}
      </ul></nav>`;

  return `
    <nav class="crumbs" aria-label="${e(OZEL.crumbAria[dil])}"><ol>
      <li><a href="${EV[dil]}">Manevi Halka</a></li>
      <li><a href="${REHBER[dil]}">${OZEL.navGuides[dil]}</a></li>
      <li aria-current="page">${kacirMetin(c.crumb)}</li>
    </ol></nav>

    <header class="g-hero">
      <div>
        <p class="eyebrow">${SVG.bead}${kacirMetin(c.eyebrow)}</p>
        <h1>${kacirMetin(c.h1)}</h1>
        <p class="lead">${satir(c.lead, K)}</p>
        <ul class="meta">${(c.meta || []).map((m, i) => `<li>${META_IKON[i % META_IKON.length]}${kacirMetin(m)}</li>`).join("")}</ul>
      </div>
      <div class="film">
        <svg class="halo" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="0 9.64"/></svg>
        ${sahneHtml(c.film.sahne, K)}
        <p class="cap">${satir(c.film.cap, K)}</p>
      </div>
    </header>

    <section class="answer" aria-labelledby="kisa">
      <div><h2 id="kisa">${kacirMetin(c.kisa.baslik || OZEL.kisaca[dil])}</h2>
        <ol>${c.kisa.maddeler.map((m) => `<li>${satir(m, K)}</li>`).join("")}</ol></div>
      ${toc}
    </section>

    ${govde}

    ${c.sss ? `<section class="faq" id="sss">
      <div><h2>${kacirMetin(c.sss.baslik || OZEL.sss[dil])}</h2></div>
      <div>${c.sss.sorular.map((q) => `<details><summary>${satir(q.s, K)}</summary>${paragraflar(q.c, K)}</details>`).join("\n        ")}</div>
    </section>` : ""}

    ${ilgiliKartlar(c.ilgili || [], dil, K)}`;
}

function ilgiliKartlar(idler, dil, K) {
  const var_olan = idler.filter((i) => var_mi(i, dil));
  if (!var_olan.length) return "";
  return `<section class="related">
      <h2>${OZEL.ilgili[dil]}</h2>
      <ul class="rcards">${var_olan.map((i) => {
        const k = ICERIK[i][dil].kart;
        return `<li><a href="${adres(i, dil)}"><b>${kacirMetin(k.baslik)}</b><span>${satir(k.metin, K)}</span><em>${OZEL.oku[dil]}${SVG.arrow}</em></a></li>`;
      }).join("")}</ul>
    </section>`;
}

function merkezGovde(dil, K) {
  const c = ICERIK.merkez[dil];
  const kartlar = IDLER.filter((i) => var_mi(i, dil)).map((i) => {
    const g = ICERIK[i][dil], k = g.kart, on = g.onizleme;
    let tel = "";
    if (on) {
      tel = sahneHtml(on.sahne, K).replace('<figure class="mp', '<figure data-static class="mp').replace(/data-still="\d+"/, `data-still="${on.adim ?? 0}"`);
    }
    return `<li><a href="${adres(i, dil)}"><div><span class="kicker">${kacirMetin(k.kicker)}</span><h2>${kacirMetin(k.baslik)}</h2><p>${satir(k.metin, K)}</p><em>${OZEL.oku[dil]}${SVG.arrow}</em></div>${tel}</a></li>`;
  }).join("\n      ");
  return `
    <nav class="crumbs" aria-label="${e(OZEL.crumbAria[dil])}"><ol>
      <li><a href="${EV[dil]}">Manevi Halka</a></li>
      <li aria-current="page">${OZEL.navGuides[dil]}</li>
    </ol></nav>
    <header class="g-hero" style="grid-template-columns:1fr;padding-bottom:28px">
      <div>
        <p class="eyebrow">${SVG.bead}${kacirMetin(c.eyebrow)}</p>
        <h1>${kacirMetin(c.h1)}</h1>
        <p class="lead">${satir(c.lead, K)}</p>
      </div>
    </header>
    <ul class="hub">
      ${kartlar}
    </ul>
    ${c.halka ? `<section class="part"><div class="answer" style="grid-template-columns:1fr"><div><h2>${satir(c.halka.baslik, K)}</h2>${paragraflar(c.halka.metin, K)}</div></div></section>` : ""}
    ${c.sss ? `<section class="faq" id="sss">
      <div><h2>${kacirMetin(c.sss.baslik || OZEL.sss[dil])}</h2></div>
      <div>${c.sss.sorular.map((q) => `<details><summary>${satir(q.s, K)}</summary>${paragraflar(q.c, K)}</details>`).join("\n        ")}</div>
    </section>` : ""}`;
}

// ─── bas bilgisi ────────────────────────────────────────────────────────────
function ogGorsel(id, dil) {
  const ad = `img/rehber/og/${id}-${dil}.jpg`;
  return existsSync(join(KOK, ad)) ? `${SITE}/${ad}` : `${SITE}/og-cover-${dil}.jpg`;
}
function basBilgisi(id, dil) {
  const c = ICERIK[id][dil];
  const KB = kit(dil);
  const url = tamAdres(adres(id, dil));
  const diller = DILLER.filter((d) => var_mi(id, d));
  const hreflang = [...diller.map((d) => `<link rel="alternate" hreflang="${d}" href="${tamAdres(adres(id, d))}">`),
    ...(var_mi(id, "en") ? [`<link rel="alternate" hreflang="x-default" href="${tamAdres(adres(id, "en"))}">`] : [])].join("\n");
  const kirinti = [{ ad: "Manevi Halka", u: tamAdres(EV[dil]) }, { ad: OZEL.navGuides[dil], u: tamAdres(REHBER[dil]) }];
  if (id !== "merkez") kirinti.push({ ad: c.crumb, u: url });
  const graf = [
    { "@type": "WebPage", "@id": `${url}#page`, url, name: c.title, description: c.desc, inLanguage: dil,
      isPartOf: { "@id": `${SITE}/#site` }, publisher: { "@id": `${SITE}/#org` }, breadcrumb: { "@id": `${url}#crumbs` } },
    { "@type": "BreadcrumbList", "@id": `${url}#crumbs`, itemListElement: kirinti.map((k, i) => ({ "@type": "ListItem", position: i + 1, name: k.ad, item: k.u })) },
  ];
  if (c.sss) graf.push({ "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: c.sss.sorular.map((q) => ({ "@type": "Question", name: duzMetin(q.s, KB),
    acceptedAnswer: { "@type": "Answer", text: (Array.isArray(q.c) ? q.c : [q.c]).map((x) => duzMetin(x, KB)).join(" ") } })) });
  const yonlendir = dil === "en" ? `<script>
(function () {
  var M = ${JSON.stringify(Object.fromEntries(diller.filter((d) => d !== "en").map((d) => [d, adres(id, d)])))};
  var l = null;
  try { l = localStorage.getItem("mh_lang"); } catch (e) { /* gizli mod */ }
  if (!l) { var n = (navigator.languages && navigator.languages[0]) || navigator.language || ""; l = String(n).slice(0, 2).toLowerCase(); }
  if (M[l]) location.replace(M[l] + location.hash);
})();
</script>\n` : "";
  return `${yonlendir}<title>${kacirMetin(c.title)}</title>
<meta name="description" content="${e(c.desc)}">
<link rel="canonical" href="${url}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=6760654292">
<meta name="theme-color" content="#1e4d35">
<meta property="og:title" content="${e(c.title)}">
<meta property="og:description" content="${e(c.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${OG_LOCALE[dil]}">
<meta property="og:image" content="${ogGorsel(id, dil)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<script type="application/ld+json">
${JSON.stringify({ "@context": "https://schema.org", "@graph": graf }, null, 2).replace(/</g, "\\u003c")}
</script>`;
}

// ─── sayfa ──────────────────────────────────────────────────────────────────
const sablon = readFileSync(join(KOK, "_gen", "rehber.src.html"), "utf8");
function navParcalari(metin) {
  const m = metin.match(/<!--@@HEAD-->([\s\S]*?)<!--@@BODY-->([\s\S]*?)<!--@@JS-->([\s\S]*)$/);
  if (!m) throw new Error("nav-loader.html: @@HEAD/@@BODY/@@JS bolumleri yok");
  return { HEAD: m[1].trim(), BODY: m[2].trim(), JS: m[3].trim() };
}
const NAV = navParcalari(readFileSync(join(KOK, "_gen", "nav-loader.html"), "utf8"));

function webpBoyut(yol) {
  const b = readFileSync(yol);
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") hata(`WebP degil: ${yol}`);
  const t = b.toString("ascii", 12, 16);
  if (t === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (t === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (t === "VP8L") { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
  hata(`WebP turu taninmadi: ${yol}`);
}

// Paylasim gorseli (1200x630): solda marka, ust baslik, rehber adi, kisa aciklama; sagda rehberin
// kendi mini telefonu (merkezde iki telefon). Site koyu yesil kapagiyla (og-cover) ayni dil.
function ogGovde(id, dil, K) {
  const c = ICERIK[id][dil];
  const baslik = id === "merkez" ? c.h1 : c.kart.baslik;
  const alt = id === "merkez" ? duzMetin(c.lead, K).split(/(?<=[.!?؟])\s+/)[0] : duzMetin(c.kart.metin, K);
  const tel = (i) => { const on = ICERIK[i][dil].onizleme; return on ? sahneHtml(on.sahne, K).replace('<figure class="mp', '<figure data-static class="mp').replace(/data-still="\d+"/, `data-still="${on.adim ?? 0}"`) : ""; };
  const teller = id === "merkez" ? ["hatim", "tek"].filter((i) => var_mi(i, dil)).map(tel).join("") : tel(id);
  return `<div class="og-sahne${id === "merkez" ? " cift" : ""}">
    <svg class="og-halka" viewBox="0 0 600 600" aria-hidden="true"><circle cx="300" cy="300" r="290" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-dasharray="0 22"/></svg>
    <div class="og-sol">
      <div class="og-marka"><img src="/img/brand-icon.webp" alt="" width="56" height="56"><span>Manevi Halka</span></div>
      <p class="og-kicker">${kacirMetin(c.eyebrow)}</p>
      <h1 class="og-baslik">${kacirMetin(baslik)}</h1>
      <p class="og-alt">${kacirMetin(alt)}</p>
    </div>
    <p class="og-adres">manevihalka.app</p>
    <div class="og-tel">${teller}</div>
  </div>
  <script>
  // Uzun basliklar (Almanca, Fransizca) adresin ustune biniyordu: sol sutun adresin 28 px
  // ustunde bitene kadar once aciklama, sonra baslik kuculur.
  (function () {
    function sigdir() {
      var sol = document.querySelector(".og-sol"), adres = document.querySelector(".og-adres");
      var b = document.querySelector(".og-baslik"), a = document.querySelector(".og-alt");
      var fb = parseFloat(getComputedStyle(b).fontSize), fa = parseFloat(getComputedStyle(a).fontSize);
      for (var i = 0; i < 40 && sol.getBoundingClientRect().bottom > adres.getBoundingClientRect().top - 28; i++) {
        if (fa > 20) { fa -= 1; a.style.fontSize = fa + "px"; } else if (fb > 42) { fb -= 2; b.style.fontSize = fb + "px"; } else break;
      }
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sigdir); else sigdir();
  })();
  </script>`;
}
const OG_CSS = `<style>
  body[data-og] { width: 1200px; height: 630px; overflow: hidden; margin: 0; background: #0f2a1d; }
  body[data-og] > :not(.wrap):not(svg):not(script) { display: none !important; }
  body[data-og] .wrap { max-width: none; width: 1200px; padding: 0; margin: 0; }
  body[data-og] header.top, body[data-og] footer, body[data-og] #download, body[data-og] .dock-pill, body[data-og] .dock-top { display: none !important; }
  body[data-og] main { padding: 0; margin: 0; }
  .og-sahne { position: relative; width: 1200px; height: 630px; overflow: hidden; color: #fff;
    background: radial-gradient(120% 95% at 82% 8%, #2c6b4b 0%, #19452f 46%, #0f2a1d 100%); }
  .og-halka { position: absolute; width: 760px; height: 760px; inset-inline-end: -150px; top: -65px; color: #d9b563; opacity: .32; }
  .og-sol { position: absolute; inset-inline-start: 76px; top: 70px; width: 560px; z-index: 2; }
  .og-marka { display: flex; align-items: center; gap: 14px; font-family: var(--display); font-size: 30px; color: #f4f1e8; }
  .og-marka img { width: 56px; height: 56px; border-radius: 14px; }
  .og-kicker { margin: 48px 0 0; font-family: var(--sans); font-weight: 700; font-size: 18px; letter-spacing: .2em; text-transform: uppercase; color: #d9b563; }
  :root[lang="ar"] .og-kicker { letter-spacing: 0; font-size: 22px; }
  .og-baslik { margin: 14px 0 0; font-family: var(--display); font-weight: 400; font-size: 66px; line-height: 1.08; color: #fff; text-wrap: balance; }
  :root[lang="ar"] .og-baslik { font-family: inherit; font-weight: 700; font-size: 58px; line-height: 1.25; }
  .og-alt { margin: 22px 0 0; font-family: var(--sans); font-size: 25px; line-height: 1.42; color: #b4e8cb; }
  .og-adres { position: absolute; inset-inline-start: 76px; bottom: 46px; margin: 0; font-family: var(--sans); font-size: 22px; font-weight: 600; color: rgba(255, 255, 255, .72); z-index: 2; }
  .og-tel { position: absolute; inset-inline-end: 96px; top: 56px; z-index: 1; }
  .og-tel .mp { --pw: 300px; }
  .og-tel .mp-pp, .og-tel figcaption, .og-tel .mp-cap { display: none !important; }
  .og-sahne.cift .og-tel { inset-inline-end: 60px; display: flex; }
  .og-sahne.cift .og-tel .mp { --pw: 262px; }
  .og-sahne.cift .og-tel .mp + .mp { margin-inline-start: -70px; margin-top: 70px; }
  .og-tel .mp-f { box-shadow: 0 40px 80px -30px rgba(0, 0, 0, .6), 0 0 0 1px rgba(255, 255, 255, .08); }
</style>`;
function sayfa(id, dil, og = false) {
  const K = kit(dil);
  const c = ICERIK[id][dil];
  const main = og ? ogGovde(id, dil, K) : id === "merkez" ? merkezGovde(dil, K) : rehberGovde(id, dil, K);
  const ch = CHROME[dil], s = I18N[dil];
  const diller = (hedef) => DILLER.map((d) => {
    const u = var_mi(id, d) ? adres(id, d) : var_mi("merkez", d) ? REHBER[d] : EV[d];
    return `<a href="${u}" hreflang="${d}" lang="${d}"${d === dil ? ' aria-current="page"' : ""}>${DIL_ADI[d]}</a>`;
  }).join("");
  const ham = {
    lang: dil, dir: dil === "ar" ? "rtl" : "ltr",
    homeHref: EV[dil], vakitHref: VAKIT[dil], hubHref: REHBER[dil], hubCurrent: id === "merkez" ? ' aria-current="page"' : "",
    main, sprite: ikonSprite(K.kullanilan), extraCss: EK_CSS,
    langMenuHtml: diller(), langsHtml: diller(), langCode: dil.toUpperCase(),
    iosHref: IOS, androidHref: play(`guide-${id}`, dil),
    privacyHref: politika("privacy", dil), termsHref: politika("terms", dil), deleteHref: politika("account-delete", dil),
  };
  const metin = {
    navAria: ch.sections, navApp: ch.app, navTimes: ch.navTimes, navReading: ch.reading, navGuides: OZEL.navGuides[dil],
    langAria: ch.language, themeToDark: ch.toDark, getApp: OZEL.getApp[dil], get: s.get,
    ctaTitle: (c.cta && c.cta.baslik) || OZEL.ctaTitle[dil], ctaText: (c.cta && c.cta.metin) || OZEL.ctaText[dil],
    socialTitle: ch.socialTitle, socialText: ch.socialText, privacy: ch.privacy, terms: ch.terms, deleteAcc: ch.deleteAcc, contact: ch.contact,
  };
  const yok = new Set();
  let out = sablon.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (k in ham) return ham[k];
    if (k in metin) { if (metin[k] == null) yok.add(k); return kacirMetin(metin[k] ?? ""); }
    yok.add(k); return "";
  });
  if (yok.size) hata(`${id}.${dil}: sablonda karsiligi olmayan anahtar(lar): ${[...yok].join(", ")}`);
  const veri = { aria: { toDark: ch.toDark, toLight: ch.toLight }, links: { ios: IOS, android: play(`guide-${id}-dock`, dil) },
    player: { pause: OZEL.pause[dil], play: OZEL.play[dil] } };
  for (const [isaret, parca] of [["/*__DATA__*/null", JSON.stringify(veri).replace(/</g, "\\u003c")], ["<!--__HEAD__-->", basBilgisi(id, dil)],
    ["<!--__NAVLOAD_HEAD__-->", NAV.HEAD], ["<!--__NAVLOAD_BODY__-->", NAV.BODY], ["<!--__NAVLOAD_JS__-->", NAV.JS]]) {
    if (out.split(isaret).length !== 2) hata(`sablonda ${isaret} tek olmali`);
    out = out.replace(isaret, () => parca);
  }
  out = out.replace("<!DOCTYPE html>", `<!DOCTYPE html>
<!-- ⚠️ BU DOSYA URETILMISTIR, ELLE DUZENLEME. Kaynak: _gen/rehber.src.html + _gen/rehber/
     Uretici: node _gen/build-rehber.mjs · ${id} · dil=${dil} -->`);
  if (/\{\{\w+\}\}/.test(out)) hata(`${id}.${dil}: doldurulmamis yer tutucu kaldi`);
  if (/\[\[[^\]]+\]\]/.test(out.replace(/<script[\s\S]*?<\/script>/g, ""))) hata(`${id}.${dil}: cozulmemis [[...]] isareti kaldi`);
  const gorunen = out.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, "");
  if (/—/.test(gorunen)) hata(`${id}.${dil}: uzun tire (ayrac) var`);
  if (/Cev[sş]en|Jawshan|Dschauschan|جوشن/i.test(gorunen)) hata(`${id}.${dil}: Cevsen gecen metin var (site kurali)`);
  if (out.startsWith("---")) hata("cikti front matter ile basliyor (Jekyll isler)");
  if (og) {
    out = out.replace("</head>", OG_CSS + "\n</head>").replace("<body>", '<body data-og><script>document.documentElement.setAttribute("data-theme", "light")</script>')
      .replace(/<script>\n\(function \(\) \{\n  var M = [\s\S]*?<\/script>\n/, "");
  }
  return out;
}

// ─── uret ───────────────────────────────────────────────────────────────────
if (OGMOD) {
  const klasor = join(KOK, "_gen", "og-tmp");
  mkdirSync(klasor, { recursive: true });
  let n = 0;
  for (const id of ["merkez", ...IDLER]) for (const d of DILLER) if (var_mi(id, d) && (!YALNIZ || id === YALNIZ)) {
    const h = sayfa(id, d, true);
    writeFileSync(join(klasor, `${id}-${d}.html`), d === "fr" ? frTipografi(h) : h); n++;
  }
  console.log(`og: ${n} sayfa _gen/og-tmp/ altina yazildi`);
  process.exit(0);
}
const ciktilar = new Map();
// Fransiz tipografisi BUTUN sayfaya: satir() yalniz govde metnini duzeltiyordu; baslik, aciklama,
// h1, kart basliklari, alt/aria metinleri ve mini telefonlar duz bosluk ve duz kesme isaretiyle
// kaliyordu. Betik ve stil bloklarina, yalniz metin dugumlerine ve okunan niteliklere dokunur.
function frTipografi(html) {
  const duzelt = (t) => t
    .replace(/ ([:;?!\u00bb])/g, "\u00a0$1").replace(/\u00ab /g, "\u00ab\u00a0")
    .replace(/([A-Za-z\u00c0-\u00ff])(?:'|&#39;|&#x27;)([A-Za-z\u00c0-\u00ff])/g, "$1\u2019$2");
  return html.split(/(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>)/i).map((parca, i) => {
    if (i % 2) return parca;
    return parca
      .replace(/>([^<]+)</g, (_, t) => ">" + duzelt(t) + "<")
      .replace(/\b(alt|aria-label|title|placeholder|content)="([^"]*)"/g, (m, ad, v) => (ad === "content" && !/[a-z]{3}/i.test(v) ? m : `${ad}="${duzelt(v)}"`));
  }).join("");
}
for (const id of ["merkez", ...IDLER]) for (const d of DILLER) if (var_mi(id, d) && (!YALNIZ || id === YALNIZ)) {
  const h = sayfa(id, d);
  ciktilar.set(join(KOK, dosyaYolu(adres(id, d))), d === "fr" ? frTipografi(h) : h);
}

const HARITA = join(KOK, "sitemap.xml");
const lastmodsuz = (x) => x.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, "");
if (!YALNIZ && !YDIL) {
  const sm = readFileSync(HARITA, "utf8");
  const bas = "<!-- MH:REHBER:BASLA -->", bit = "<!-- MH:REHBER:BITIS -->";
  const i = sm.indexOf(bas), j = sm.indexOf(bit);
  if (i < 0 || j < 0) hata("sitemap.xml'de MH:REHBER isaretleri yok");
  const bugun = new Date().toISOString().slice(0, 10);
  const satirlar = [];
  for (const id of ["merkez", ...IDLER]) for (const d of DILLER) if (var_mi(id, d)) satirlar.push(`  <url>\n    <loc>${tamAdres(adres(id, d))}</loc>\n    <lastmod>${bugun}</lastmod>\n  </url>`);
  ciktilar.set(HARITA, sm.slice(0, i + bas.length) + (satirlar.length ? "\n" + satirlar.join("\n") : "") + "\n  " + sm.slice(j));
}
const sayfaDegisti = [...ciktilar.keys()].filter((p) => p !== HARITA).some((p) => !existsSync(p) || readFileSync(p, "utf8") !== ciktilar.get(p));
let fark = 0;
for (const [p, icerik] of ciktilar) {
  const mevcut = existsSync(p) ? readFileSync(p, "utf8") : null;
  const ayni = p === HARITA ? mevcut != null && !sayfaDegisti && lastmodsuz(mevcut) === lastmodsuz(icerik) : mevcut === icerik;
  if (ayni) continue;
  fark++;
  const ad = p.replace(KOK + "/", "");
  if (KONTROL) { console.error("fark: " + ad); continue; }
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, icerik);
  console.log("yazildi: " + ad);
}
if (KONTROL && fark) { console.error(`${fark} dosya guncel degil: node _gen/build-rehber.mjs`); process.exit(1); }
if (!fark) console.log("zaten guncel");
