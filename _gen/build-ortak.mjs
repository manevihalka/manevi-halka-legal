#!/usr/bin/env node
/**
 * Ortak Okuma sayfasi ureticisi (5 Eki 2026):
 *   _gen/ortak.src.html + js/ortak-hatim.js (bilesenin sozlugu) + _data/chrome.json  ->
 *   5 dil, adresler _gen/site-urls.mjs ORTAK
 *   (/shared-reading/, /tr/ortak-okuma/, /de/gemeinsames-lesen/, /fr/lecture-commune/, /ar/qiraa-mushtaraka/)
 *   + eski adresler /ortak-okuma.html ve /hatim.html: noindex yonlendirme kabuklari
 *   + sitemap.xml'deki MH:ORTAK bolgesi.
 *
 * Neden: sayfa tek adresteydi ve dili tarayicida seciliyordu. Arama motoru yalniz Ingilizceyi
 * goruyordu; statik baslik Turkce, aciklama Ingilizce, html lang="en", og gorseli Turkce ve h1
 * betik gelene kadar "…" idi. Artik her dilin kendi sayfasi var: baslik, aciklama, h1, giris,
 * menu ve altbilgi o dilde STATIK; hreflang karsilikli; tahta (js/ortak-hatim.js) dili sayfadan alir.
 * Tasarim kararlari: manevi-halka reposunda docs/WEB_KURESEL_OKUMA.md (§8, §13 faz 6).
 *
 * Tahtanin ilk karesi de HTML'de (iskelet: sekmeler + zikir listesi adlariyla). Adlar ve
 * sekme metinleri bilesenin KENDI sozlugunden (js/ortak-hatim.js S ve DHIKR) okunur, kopya yok.
 * Kabuk metinleri _data/chrome.json'dan (build-home.mjs uretir); once build-home calismali.
 *
 * Kurallar: Turkce "sen", Almanca "du", Fransizca "tu"; terimler uygulamayla ayni (EN khatm,
 * aranan baslikta khatam; DE Chatma, aranan baslikta Khatm; FR khatma; AR ختمة). Ayrac olarak uzun
 * tire YOK; sitede Cevsen gecmez; sahte sayi, puan, fiyat yok.
 *
 * KULLANIM:
 *   node _gen/build-ortak.mjs           uretir ve yazar
 *   node _gen/build-ortak.mjs --check   uretir, yazmaz, fark varsa cikis 1
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { SITE, DILLER, EV, VAKIT, REHBER, ORTAK, OG_LOCALE, DIL_ADI, dosyaYolu, tamAdres } from "./site-urls.mjs";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const KONTROL = process.argv.includes("--check");
const hata = (m) => { console.error("HATA: " + m); process.exit(1); };

// ─── sayfaya ozgu metinler ──────────────────────────────────────────────────
const OZEL = {
  // <title> ve og:title (<= 60). Aranan sozcukler: TR "online hatim", EN "online Quran khatam",
  // DE "Khatm", FR "khatma en ligne", AR "ختمة". Ana sayfa ve rehber basliklariyla AYNI degil.
  title: { tr: "Ortak Okuma: online hatim ve zikir, hesap gerekmez",
    en: "Shared Reading: online Quran khatam and dhikr, no account",
    de: "Gemeinsames Lesen: Online-Khatm und Dhikr, ohne Konto",
    fr: "Lecture commune : khatma et dhikr en ligne, sans compte",
    ar: "القراءة المشتركة: ختمة وذكر عبر الإنترنت دون حساب" },
  // meta aciklama ve og:description (<= 155)
  desc: { tr: "Dünyanın her yerinden okuyanlarla süren ortak hatimden bir bölüm üstlen ya da ortak zikre katıl. Hesap ve uygulama gerekmez, tarayıcında çalışır.",
    en: "Take a portion of an ongoing shared Quran khatam, or add to a shared dhikr with readers worldwide. No account or app needed: it works in your browser.",
    de: "Übernimm mit Lesern aus aller Welt einen Abschnitt einer laufenden gemeinsamen Khatm oder zähle beim gemeinsamen Dhikr mit. Ohne Konto und ohne App.",
    fr: "Prends une portion d’une khatma commune en cours, ou participe au dhikr commun avec des lecteurs du monde entier. Sans compte ni appli.",
    ar: "تكفّل بنصيب من ختمة مشتركة مستمرة، أو شارك في الذكر المشترك مع قرّاء من أنحاء العالم. لا حاجة إلى حساب ولا إلى تطبيق." },
  // h1 altindaki giris (2-3 cumle). Kur'an okuyucu web'de YOK: "her sey bu sayfada" denmez,
  // katilim bu sayfadan.
  intro: { tr: "Dünyanın her yerinden okuyanlarla aynı hatimde ve aynı zikirde buluş. Hatimden okuyacağın bir bölümü üstlen ya da bir zikrin sayımına katkını ekle. Hesap gerekmiyor, katılım bu sayfadan.",
    en: "Meet readers from all over the world in the same khatm and the same dhikr. Take a portion of the khatm to read, or add your count to a dhikr. No account needed: you join right on this page.",
    de: "Lies gemeinsam mit Menschen aus aller Welt: in derselben Chatma (Khatm, die Lesung des ganzen Korans) und beim selben Dhikr. Übernimm einen Abschnitt zum Lesen oder zähle beim Dhikr mit. Ohne Konto, du machst direkt auf dieser Seite mit.",
    fr: "Retrouve des lecteurs du monde entier dans la même khatma et le même dhikr. Prends une portion de la khatma à lire, ou ajoute ton décompte à un dhikr. Sans compte, tu participes directement sur cette page.",
    ar: "اجتمع مع قرّاء من كل أنحاء العالم على الختمة نفسها والذكر نفسه. تكفّل بنصيب من الختمة لتقرأه، أو أضف عدّك إلى أحد الأذكار. لا حاجة إلى حساب، وتشارك من هذه الصفحة مباشرة." },
  // altbilgide vakit sayfasinin tam adi (ust menude kisa "Vakitler")
  timesLong: { tr: "Namaz vakitleri", en: "Prayer times", de: "Gebetszeiten", fr: "Horaires de prière", ar: "مواقيت الصلاة" },
};

// Iskeletteki zikir sirasi: sunucunun bugunku listesi (dhikr_list). Iskelet yalniz ilk karedir,
// gercek liste geldiginde yerine gecer; sira degisirse yalniz buradaki sira bayatlar.
const ISKELET_SIRA = ["salavat", "tefriciye", "ayetelkursi", "ihlas", "fatiha", "hasbinallah"];

// ─── kaynaklar ──────────────────────────────────────────────────────────────
const BILESEN = readFileSync(join(KOK, "js", "ortak-hatim.js"), "utf8");
function bilesenNesnesi(ad) {
  const bas = BILESEN.indexOf(`  var ${ad} = {`);
  const son = bas < 0 ? -1 : BILESEN.indexOf("\n  };", bas);
  if (bas < 0 || son < 0) hata(`js/ortak-hatim.js: var ${ad} bulunamadi`);
  try { return vm.runInNewContext("(" + BILESEN.slice(BILESEN.indexOf("{", bas), son + 4) + ")"); }
  catch (e) { return hata(`js/ortak-hatim.js: ${ad} okunamadi (${e.message})`); }
}
const S = bilesenNesnesi("S");
const DHIKR = bilesenNesnesi("DHIKR");
const ICON_ZIKIR = (BILESEN.match(/var ICON_ZIKIR\s*=\s*'([^']+)'/) || [])[1] || hata("js/ortak-hatim.js: ICON_ZIKIR yok");

const CHROME = JSON.parse(readFileSync(join(KOK, "_data", "chrome.json"), "utf8"));
const kutu = {};
vm.createContext(kutu);
vm.runInContext(readFileSync(join(KOK, "_gen", "site-i18n.js"), "utf8"), kutu);
const I18N = kutu.I18N || hata("_gen/site-i18n.js I18N tanimlamiyor");

// ─── tutarlilik denetimleri (ayni harita uc yerde) ─────────────────────────
const ayniHarita = (a, b) => DILLER.every((d) => a && b && a[d] === b[d]);
{
  const m = BILESEN.match(/var ORTAK_URL = (\{[^}]*\});/);
  if (!m) hata("js/ortak-hatim.js: ORTAK_URL yok");
  if (!ayniHarita(vm.runInNewContext("(" + m[1] + ")"), ORTAK)) hata("js/ortak-hatim.js ORTAK_URL, site-urls.mjs ORTAK ile ayni degil");
  const d404 = readFileSync(join(KOK, "404.html"), "utf8").match(/var ORTAK = (\{[^}]*\});/);
  if (!d404 || !ayniHarita(vm.runInNewContext("(" + d404[1] + ")"), ORTAK)) hata("404.html ORTAK haritasi site-urls.mjs ORTAK ile ayni degil");
}
for (const d of DILLER) {
  const ch = CHROME[d] || hata(`_data/chrome.json ${d} yok (once node _gen/build-home.mjs)`);
  if (ch.readingHref !== ORTAK[d]) hata(`_data/chrome.json ${d}.readingHref guncel degil (once node _gen/build-home.mjs)`);
  if (!S[d]) hata(`js/ortak-hatim.js S.${d} yok`);
  if (S[d].pageTitle !== I18N[d].ccTitle) hata(`S.${d}.pageTitle sitenin "Ortak Okuma" adiyla (I18N.ccTitle) ayni degil`);
  if (S[d].followTitle !== ch.socialTitle) hata(`S.${d}.followTitle altbilgideki baslikla (chrome.socialTitle) ayni degil`);
  for (const k of ["tabZikir", "tabHatim", "zHead", "zAdd", "zAddFor"]) if (!S[d][k]) hata(`S.${d}.${k} yok`);
  for (const k of Object.keys(OZEL)) if (OZEL[k][d] == null) hata(`OZEL.${k}.${d} yok`);
  if ([...OZEL.title[d]].length > 60) hata(`OZEL.title.${d} 60 karakteri asiyor (${[...OZEL.title[d]].length})`);
  if ([...OZEL.desc[d]].length > 155) hata(`OZEL.desc.${d} 155 karakteri asiyor (${[...OZEL.desc[d]].length})`);
  for (const slug of ISKELET_SIRA) if (!DHIKR[d] || !DHIKR[d][slug]) hata(`DHIKR.${d}.${slug} yok`);
}

// Magaza adresleri (masaustunde iki dugme, statik). Play kurulum kaynagi utm_content=ortak: bilesenin
// telefon dugmesiyle (js/ortak-hatim.js STORE_PLAY) AYNI kaynak adi, asagida denetlenir.
const IOS = "https://apps.apple.com/app/manevi-halka/id6760654292";
const PLAY = "https://play.google.com/store/apps/details?id=com.emrhnayz.spiritualcircle&referrer=" +
  encodeURIComponent("utm_source=manevihalka.app&utm_medium=website&utm_content=ortak");
if (!BILESEN.includes(`var STORE_IOS = '${IOS}'`) || !BILESEN.includes("utm_source=manevihalka.app&utm_medium=website&utm_content=ortak"))
  hata("js/ortak-hatim.js STORE_IOS / STORE_PLAY, build-ortak.mjs IOS / PLAY ile ayni degil");

const kacir = (x) => String(x).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmt = (s, o) => String(s).replace(/\{(\w+)\}/g, (_, k) => o[k]);
const politika = (ad, dil) => (dil === "tr" ? `/${ad}.html` : `/${ad}-${dil}.html`);

// ─── bas bilgisi ────────────────────────────────────────────────────────────
const hreflang = [...DILLER.map((d) => `<link rel="alternate" hreflang="${d}" href="${tamAdres(ORTAK[d])}">`),
  `<link rel="alternate" hreflang="x-default" href="${tamAdres(ORTAK.en)}">`].join("\n");

/** Ingilizce adreste: kayitli dil ya da tarayici dili baska bir dilse o dilin sayfasina gec
 *  (ana sayfa ve vakit sayfasiyla ayni kural). Sorgu dizesi (?t=, ?g=) ve # korunur.
 *  Arama motoru botu (dil basligi en) etkilenmez; Ingilizce secen kalir (mh_lang=en). */
const YONLENDIR = `<script>
(function () {
  var M = ${JSON.stringify(Object.fromEntries(DILLER.filter((d) => d !== "en").map((d) => [d, ORTAK[d]])))};
  var l = null;
  try { l = localStorage.getItem("mh_lang"); } catch (e) { /* gizli mod */ }
  if (!l) { var n = (navigator.languages && navigator.languages[0]) || navigator.language || ""; l = String(n).slice(0, 2).toLowerCase(); }
  if (M[l]) location.replace(M[l] + location.search + location.hash);
})();
</script>`;

/** Statik giris metni artik ilk karede var: yazi tipi gec gelirse satir kirilimi degisip sayfa
 *  kayiyordu (genis ekranda Turkce giris 3 -> 4 -> 3 satir, olculdu). Yazi tipleri onceden
 *  istenir; Turkcede Onest'in latin-ext dosyasi da (ş, ğ, İ o dosyada; ı latin'de). Marcellus'un
 *  latin-ext dosyasi ONCEDEN ISTENMEZ: ilk ekranda Marcellus'la yazilan (marka, h1) ondan harf
 *  kullanmiyor, yalniz altbilgi kullaniyor; onceden istenince yavas baglantida Onest'in bant
 *  genisligini yiyip ilk boyamadan sonra gelmesine yol aciyordu. Arapca metin sistem yazi tipiyle. */
function yaziTipleri(dil) {
  const f = ["marcellus-latin", "onest-latin", ...(dil === "tr" ? ["onest-latin-ext"] : [])];
  return f.map((x) => `<link rel="preload" href="/fonts/${x}.woff2" as="font" type="font/woff2" crossorigin${x === "onest-latin" ? ' fetchpriority="high"' : x.endsWith("-ext") ? ' fetchpriority="low"' : ""}>`).join("\n");
}

function basBilgisi(dil) {
  const url = tamAdres(ORTAK[dil]);
  const title = OZEL.title[dil], desc = OZEL.desc[dil];
  const ld = {
    "@context": "https://schema.org",
    "@graph": [{ "@type": "WebPage", "@id": `${url}#page`, url, name: title, description: desc, inLanguage: dil,
      isPartOf: { "@id": `${SITE}/#site` }, publisher: { "@id": `${SITE}/#org` } }],
  };
  return `${dil === "en" ? YONLENDIR + "\n" : ""}<title>${kacir(title)}</title>
<meta name="description" content="${kacir(desc)}">
<link rel="canonical" href="${url}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=6760654292">
<meta name="theme-color" content="#1e4d35">
<!-- Tahta bu alan adindan okunur: el sikismayi erken baslat (istek CORS, bu yuzden crossorigin). -->
<link rel="preconnect" href="https://ohmescuwjyaitykemuub.supabase.co" crossorigin>
<link rel="dns-prefetch" href="https://ohmescuwjyaitykemuub.supabase.co">
<meta property="og:site_name" content="Manevi Halka">
<meta property="og:type" content="website">
<meta property="og:title" content="${kacir(title)}">
<meta property="og:description" content="${kacir(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${OG_LOCALE[dil]}">
${DILLER.filter((d) => d !== dil).map((d) => `<meta property="og:locale:alternate" content="${OG_LOCALE[d]}">`).join("\n")}
<meta property="og:image" content="${SITE}/og-cover-${dil}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${kacir(title)}">
<meta name="twitter:description" content="${kacir(desc)}">
<meta name="twitter:image" content="${SITE}/og-cover-${dil}.jpg">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
${yaziTipleri(dil)}
<script type="application/ld+json">
${JSON.stringify(ld, null, 2).replace(/</g, "\\u003c")}
</script>`;
}

/** Tahtanin ilk karesi: bilesenin zikir sekmesinin ayni isaretlemesi (siniflar ortak-hatim.css'ten),
 *  sayilar olmadan. Dugmeler devre disi; bilesen ilk veriyle hepsini degistirir. */
function iskelet(dil) {
  const t = S[dil];
  const ikon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="${ICON_ZIKIR}"/></svg>`;
  const satirlar = ISKELET_SIRA.map((slug) => {
    const [ad, anlam] = DHIKR[dil][slug];
    return `<div class="zrow quiet"><div class="zname">${kacir(ad)}</div>${anlam ? `<div class="zmean">${kacir(anlam)}</div>` : ""}`
      + `<button type="button" class="primary" disabled aria-label="${kacir(fmt(t.zAddFor, { n: ad }))}">${kacir(t.zAdd)}</button></div>`;
  }).join("");
  return `<div class="stage sk" aria-busy="true"><div class="mid">`
    + `<div class="tabs main" role="group" aria-label="${kacir(t.pageTitle)}">`
    + `<button type="button" class="on" aria-pressed="true" disabled>${kacir(t.tabZikir)}</button>`
    + `<button type="button" aria-pressed="false" disabled>${kacir(t.tabHatim)}</button></div>`
    + `<div class="panel sk-zikir"><div class="panel-head">${ikon}<span>${kacir(t.zHead)}</span></div>${satirlar}</div>`
    + `</div></div>`;
}

const sablon = readFileSync(join(KOK, "_gen", "ortak.src.html"), "utf8");
function navParcalari(metin) {
  const m = metin.match(/<!--@@HEAD-->([\s\S]*?)<!--@@BODY-->([\s\S]*?)<!--@@JS-->([\s\S]*)$/);
  if (!m) throw new Error("nav-loader.html: @@HEAD/@@BODY/@@JS bolumleri yok");
  return { HEAD: m[1].trim(), BODY: m[2].trim(), JS: m[3].trim() };
}
// Sayfa gecisi, ana sayfa ve vakit sayfasiyla ortak (tek kaynak _gen/nav-loader.html).
const NAV = navParcalari(readFileSync(join(KOK, "_gen", "nav-loader.html"), "utf8"));

function sayfa(dil) {
  const ch = CHROME[dil], s = I18N[dil];
  const ham = {
    lang: dil, dir: dil === "ar" ? "rtl" : "ltr",
    homeHref: EV[dil], vakitHref: VAKIT[dil], readingHref: ORTAK[dil], guidesHref: REHBER[dil],
    privacyHref: politika("privacy", dil), termsHref: politika("terms", dil), deleteHref: politika("account-delete", dil),
    langCode: dil.toUpperCase(),
    langMenuHtml: DILLER.map((d) => `<a href="${ORTAK[d]}" hreflang="${d}" lang="${d}"${d === dil ? ' aria-current="page"' : ""}>${DIL_ADI[d]}</a>`).join(""),
    skeletonHtml: iskelet(dil),
    iosHref: IOS, androidHref: kacir(PLAY),
  };
  const metin = {
    navAria: ch.sections, navApp: ch.app, navTimes: ch.navTimes, navReading: ch.reading, navGuides: ch.guides,
    langAria: ch.language, themeToDark: ch.toDark, socialTitle: ch.socialTitle, socialText: ch.socialText,
    privacy: ch.privacy, terms: ch.terms, deleteAcc: ch.deleteAcc, contact: ch.contact,
    h1: s.ccTitle, intro: OZEL.intro[dil], timesLong: OZEL.timesLong[dil],
    getApp: S[dil].getApp, get: s.get,
  };
  const yok = new Set();
  let out = sablon.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (k in ham) return ham[k];
    if (k in metin) { if (metin[k] == null) yok.add(k); return kacir(metin[k] ?? ""); }
    yok.add(k); return "";
  });
  if (yok.size) hata(`${dil}: sablonda karsiligi olmayan anahtar(lar): ${[...yok].join(", ")}`);
  const veri = { lang: dil, urls: ORTAK, aria: { toDark: ch.toDark, toLight: ch.toLight } };
  for (const [isaret, parca] of [["/*__DATA__*/null", JSON.stringify(veri).replace(/</g, "\\u003c")], ["<!--__HEAD__-->", basBilgisi(dil)],
    ["<!--__NAVLOAD_HEAD__-->", NAV.HEAD], ["<!--__NAVLOAD_BODY__-->", NAV.BODY], ["<!--__NAVLOAD_JS__-->", NAV.JS]]) {
    if (out.split(isaret).length !== 2) hata(`sablonda ${isaret} tek olmali`);
    out = out.replace(isaret, () => parca);
  }
  out = out.replace("<!DOCTYPE html>", `<!DOCTYPE html>
<!-- ⚠️ BU DOSYA URETILMISTIR, ELLE DUZENLEME. Kaynak: _gen/ortak.src.html + js/ortak-hatim.js (sozluk) + _data/chrome.json
     Uretici: node _gen/build-ortak.mjs · dil=${dil} -->`);
  if (/\{\{\w+\}\}/.test(out)) hata(`${dil}: doldurulmamis yer tutucu kaldi`);
  if (out.startsWith("---")) hata("cikti front matter ile basliyor (Jekyll isler)");
  const gorunen = out.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, "");
  if (/[—–]/.test(gorunen.replace(/\d–\d/g, ""))) hata(`${dil}: uzun ya da orta tire (ayrac) var`);
  if (/Cev[sş]en|Jawshan|Dschauschan|جوشن/i.test(gorunen)) hata(`${dil}: Cevsen gecen metin var (site kurali)`);
  if (!out.includes(`<h1>${kacir(s.ccTitle)}</h1>`)) hata(`${dil}: statik h1 yok`);
  return out;
}

/**
 * Eski adresler: dili secip dil sayfasina gecen noindex kabuk. GitHub Pages 301 veremez;
 * betik sorgu dizesini (?t=, ?g=) ve #'i korur. rel=canonical YOK (5 Eki 2026): noindex ile
 * birlikte Ingilizce sayfayi gosteren canonical celiskili sinyaldi ve dil secen yonlendirmeyle
 * de uyusmuyordu (Turk kullanici Turkce sayfaya gidiyor).
 * Dil sirasi: ?lang= > mh_lang (sitenin ortak anahtari) > tarayici dili > Ingilizce.
 * Betiksiz istemci icin <noscript> icinde meta refresh (sorgu dizesi orada korunamaz; betik
 * ondan ONCE calisir, refresh hic devreye girmez).
 * ⛔ Bu iki dosyayi SILME: sosyal medyada, uygulamada ve 7 Eyl'de sitemap'te bu adresler dagildi.
 */
function kabuk(dosya, varsayilanSekme) {
  const hedef = ORTAK.en;
  const neden = dosya === "hatim.html"
    ? "Sayfa 7 Eyl 2026'da bir gun /hatim.html adresinde yayindaydi (o gun Kur'an sekmesi onde aciliyordu, bu yuzden ?t= yoksa Hatim sekmesi acilir); 9 Eyl'de adi Ortak Okuma oldu."
    : "Ortak Okuma 9 Eyl ile 5 Eki 2026 arasinda bu tek adresteydi (dil tarayicida seciliyordu); sosyal medyada ve uygulamada bu adres dagildi.";
  return `<!DOCTYPE html>
<!-- ⚠️ BU DOSYA URETILMISTIR, ELLE DUZENLEME. Uretici: node _gen/build-ortak.mjs
     Yonlendirme kabugu: ${neden}
     Dil sayfalari _gen/site-urls.mjs ORTAK. -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>${kacir(S.en.pageTitle)} · Manevi Halka</title>
<script>
(function () {
  var M = ${JSON.stringify(ORTAK)};
  var q = new URLSearchParams(location.search);
  var l = String(q.get("lang") || "").slice(0, 2).toLowerCase();
  if (!M[l]) { try { l = localStorage.getItem("mh_lang") || ""; } catch (e) { l = ""; } }
  if (!M[l]) { var n = (navigator.languages && navigator.languages[0]) || navigator.language || ""; l = String(n).slice(0, 2).toLowerCase(); }
  if (!M[l]) l = "en";
  q.delete("lang");${varsayilanSekme ? `\n  if (!q.has("t")) q.set("t", ${JSON.stringify(varsayilanSekme)});` : ""}
  var s = q.toString();
  location.replace(M[l] + (s ? "?" + s : "") + location.hash);
})();
</script>
<noscript><meta http-equiv="refresh" content="0; url=${hedef}"></noscript>
<meta property="og:site_name" content="Manevi Halka">
<meta property="og:type" content="website">
<meta property="og:title" content="${kacir(OZEL.title.en)}">
<meta property="og:description" content="${kacir(OZEL.desc.en)}">
<meta property="og:url" content="${tamAdres(hedef)}">
<meta property="og:image" content="${SITE}/og-cover-en.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background: #f7f4ec; color: #14231c;
         display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
  @media (prefers-color-scheme: dark) { body { background: #0e1a14; color: #eaf3ee; } a { color: #8fd3ae; } }
  ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px 18px; justify-content: center; }
  a { color: #1e4d35; }
</style>
</head>
<body>
<ul>${DILLER.map((d) => `<li><a href="${ORTAK[d]}" hreflang="${d}" lang="${d}"${d === "ar" ? ' dir="rtl"' : ""}>${kacir(S[d].pageTitle)}</a></li>`).join("")}</ul>
</body>
</html>
`;
}

// ─── uret ───────────────────────────────────────────────────────────────────
const ciktilar = new Map();
for (const d of DILLER) ciktilar.set(join(KOK, dosyaYolu(ORTAK[d])), sayfa(d));
ciktilar.set(join(KOK, "ortak-okuma.html"), kabuk("ortak-okuma.html", null));
ciktilar.set(join(KOK, "hatim.html"), kabuk("hatim.html", "hatim"));

const HARITA = join(KOK, "sitemap.xml");
const lastmodsuz = (x) => x.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, "");
{
  const sm = readFileSync(HARITA, "utf8");
  const bas = "<!-- MH:ORTAK:BASLA -->", bit = "<!-- MH:ORTAK:BITIS -->";
  const i = sm.indexOf(bas), j = sm.indexOf(bit);
  if (i < 0 || j < 0) hata("sitemap.xml'de MH:ORTAK isaretleri yok");
  const bugun = new Date().toISOString().slice(0, 10);
  const satir = DILLER.map((d) => `  <url>\n    <loc>${tamAdres(ORTAK[d])}</loc>\n    <lastmod>${bugun}</lastmod>\n    <changefreq>daily</changefreq>\n  </url>`).join("\n");
  ciktilar.set(HARITA, sm.slice(0, i + bas.length) + "\n" + satir + "\n  " + sm.slice(j));
}

const sayfaDegisti = DILLER.some((d) => {
  const p = join(KOK, dosyaYolu(ORTAK[d]));
  return !existsSync(p) || readFileSync(p, "utf8") !== ciktilar.get(p);
});
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
if (KONTROL && fark) { console.error(`${fark} dosya guncel degil: node _gen/build-ortak.mjs`); process.exit(1); }
if (!fark) console.log("zaten guncel");
