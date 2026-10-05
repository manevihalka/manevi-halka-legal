#!/usr/bin/env node
/**
 * Namaz vakitleri sayfasi ureticisi (28 Eyl 2026):
 *   _gen/vakit.src.html + _gen/site-i18n.js  ->  5 dil, adresler _gen/site-urls.mjs VAKIT
 *   (/prayer-times/, /tr/namaz-vakitleri/, /de/gebetszeiten/, /fr/horaires-de-priere/, /ar/mawaqit/)
 *   ve sitemap.xml'deki MH:VAKIT bolgesi.
 *
 * Bu tasarim ("Gunun Halkasi") 28 Eyl'de birkac saat ana sayfaydi; ana sayfa
 * uygulama tanitimi olunca (kullanici karari) vakitler kendi sayfasina tasindi.
 * Ayet/hadis kartlari kalkti, yerine sade bir ayet satiri geldi: 28 Eyl'den beri
 * NAMAZ uzerine ayetlerden biri (NAMAZ_AYETLERI; DE/FR meal izni yok: yalniz Arapca ve kunye).
 *
 * Kurallar: baslik, aciklama, h1 ve govde metni STATIK yazilir (her data-t
 * dugumu o sayfanin dilinde; JS yalniz dinamik parcalari cizer). Sozluk
 * _gen/site-i18n.js'ten SOKULUR, kopyalanmaz. Vakit motoru js/mh-dynamic.js
 * (ikinci kopya yok). Ayrac olarak uzun tire YOK.
 *
 * KULLANIM:
 *   node _gen/build-vakit.mjs           uretir ve yazar
 *   node _gen/build-vakit.mjs --check   uretir, yazmaz, fark varsa cikis 1
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { SITE, DILLER, EV, VAKIT, REHBER, ORTAK, OG_LOCALE, dosyaYolu, tamAdres } from "./site-urls.mjs";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const KONTROL = process.argv.includes("--check");
const hata = (m) => { console.error("HATA: " + m); process.exit(1); };

// Sozlukten gelenler
const ANAHTARLAR = ["get", "ccTitle", "privacy", "terms", "deleteAcc", "contact", "itaniCredit", "suffix"];

// Sayfaya ozgu metinler
const OZEL = {
  pageTitle: { tr: "Namaz vakitleri · Manevi Halka", en: "Prayer times · Manevi Halka", de: "Gebetszeiten · Manevi Halka",
    fr: "Horaires de prière · Manevi Halka", ar: "مواقيت الصلاة · Manevi Halka" },
  pageDesc: { tr: "Bulunduğun şehir için bugünün namaz vakitleri ve 30 günlük takvim, Diyanet takvimine göre. Hicri tarih ve dini günler de burada.",
    en: "Today's prayer times for your city and a 30-day calendar, based on the Diyanet calendar. With the Hijri date and religious days.",
    de: "Die heutigen Gebetszeiten für deine Stadt und ein 30-Tage-Kalender nach dem Diyanet-Kalender. Mit Hidschri-Datum und religiösen Tagen.",
    fr: "Les horaires de prière du jour pour ta ville et un calendrier de 30 jours selon la Diyanet, avec la date de l'Hégire et les jours religieux.",
    ar: "مواقيت الصلاة لمدينتك اليوم وتقويم 30 يومًا وفق تقويم ديانت، مع التاريخ الهجري والأيام الدينية." },
  vTitle: { tr: "Namaz vakitleri", en: "Prayer times", de: "Gebetszeiten", fr: "Horaires de prière", ar: "مواقيت الصلاة" },
  // Namaz ayetinin ust etiketi: uygulamadaki tesvik kartlariyla ayni sozcukler (practice.encLabelAyah)
  vAyahLabel: { tr: "Âyet-i kerîme", en: "Qur'anic verse", de: "Koranvers", fr: "Verset coranique", ar: "آية كريمة" },
  vSub: { tr: "Diyanet takvimine göre. Şehrini değiştirebilir, 30 günlük takvimi vakitlerin altından açıp yazdırabilirsin.",
    en: "Based on the Diyanet calendar. Change your city, and open or print the 30-day calendar below the times.",
    de: "Nach dem Diyanet-Kalender. Du kannst deine Stadt ändern und den 30-Tage-Kalender unter den Gebetszeiten öffnen und drucken.",
    fr: "Selon le calendrier de la Diyanet. Tu peux changer de ville, puis ouvrir ou imprimer le calendrier de 30 jours sous les horaires.",
    ar: "وفق تقويم ديانت. يمكنك تغيير مدينتك، وفتح تقويم 30 يومًا أسفل المواقيت أو طباعته." },
  vPromoTitle: { tr: "Vakit girince haber al", en: "Know when each prayer time begins", de: "Erfahre, wann jede Gebetszeit beginnt",
    fr: "Sois prévenu à chaque heure de prière", ar: "اعرف متى يدخل كل وقت" },
  vPromoText: { tr: "Bildirim, ana ekranda widget ve kıble. Kur'an, halkalar ve zikir de aynı uygulamada.",
    en: "Notifications, home screen widgets and the qibla. The Quran, circles and dhikr are in the same app.",
    de: "Benachrichtigungen, Widgets für den Startbildschirm und die Qibla. Koran, Kreise und Dhikr in derselben App.",
    fr: "Notifications, widgets pour l'écran d'accueil et qibla. Le Coran, les cercles et le dhikr dans la même appli.",
    ar: "تنبيهات وأدوات للشاشة الرئيسية والقبلة. والقرآن والحلقات والذكر في التطبيق نفسه." },
  vKnowApp: { tr: "Uygulamayı tanı", en: "Discover the app", de: "Die App entdecken", fr: "Découvrir l'appli", ar: "تعرّف على التطبيق" },
  yNavApp: { tr: "Uygulama", en: "The app", de: "Die App", fr: "L'application", ar: "التطبيق" },
  yNavTimes: { tr: "Vakitler", en: "Prayer times", de: "Gebetszeiten", fr: "Horaires", ar: "المواقيت" },
  yNavGuides: { tr: "Rehberler", en: "Guides", de: "Anleitungen", fr: "Guides", ar: "الأدلة" },
  yNavSections: { tr: "Bölümler", en: "Sections", de: "Bereiche", fr: "Sections", ar: "الأقسام" },
  ySocialTitle: { tr: "Halkayla bağlantıda kal", en: "Stay close to the circle", de: "Bleib mit dem Kreis verbunden",
    fr: "Reste lié au cercle", ar: "ابقَ على صلة بالحلقة" },
  // Dil dugmesinin erisilebilir adi: ana sayfadaki dil dugmesiyle ayni sozcukler (build-home.mjs langAria)
  langAria: { tr: "Dil", en: "Language", de: "Sprache", fr: "Langue", ar: "اللغة" },
  // Ekran okuyucu icin halkanin sabit cumlesi (#ringStatus). Saniyelik sayac okunmaz; cumle yalniz
  // vakit degisince degisir. {name} vakit adi (mh-dynamic PRAYER_STRINGS), {time} sehrin saati.
  // Saatten sonra Turkce ek yok (okunusa gore degisir: 18:40'ta, 13:05'te), iki nokta kullanildi.
  vSrNow: { tr: "Şu anki vakit: {name}. Vaktin çıkışı: {time}.", en: "Current prayer time: {name}. It ends at {time}.",
    de: "Aktuelle Gebetszeit: {name}. Sie endet um {time} Uhr.", fr: "Heure de prière actuelle : {name}. Elle se termine à {time}.",
    ar: "وقت الصلاة الحالي: {name}، وينتهي الساعة {time}." },
  vSrNext: { tr: "Sıradaki vakit: {name}. Vaktin girişi: {time}.", en: "Next prayer time: {name}. It begins at {time}.",
    de: "Nächste Gebetszeit: {name}. Sie beginnt um {time} Uhr.", fr: "Prochaine heure de prière : {name}. Elle commence à {time}.",
    ar: "وقت الصلاة التالي: {name}، ويدخل الساعة {time}." },
  ySocialText: { tr: "Günün ayeti her sabah, kandil gecelerinde hatırlatma.",
    en: "The verse of the day every morning, reminders on the blessed nights.",
    de: "Jeden Morgen der Vers des Tages, Erinnerungen in den gesegneten Nächten.",
    fr: "Le verset du jour chaque matin, des rappels lors des nuits bénies.",
    ar: "آية اليوم كل صباح، وتذكير في الليالي المباركة." },
};

// ─── sozluk ─────────────────────────────────────────────────────────────────
const kutu = {};
vm.createContext(kutu);
vm.runInContext(readFileSync(join(KOK, "_gen", "site-i18n.js"), "utf8"), kutu);
const I18N = kutu.I18N;
if (!I18N) hata("_gen/site-i18n.js I18N tanimlamiyor");
// ─── vakit motorunun metinleri (js/mh-dynamic.js, TEK KAYNAK) ─────────────────
// Sayfanin ilk karesi (yer tutucu vakit satirlari, takvim dugmesi, secici basligi, dugme adlari)
// motorun kendi metinleriyle yazilir: veri gelince ayni metin yeniden yazilir, kutu boyu degismez.
// Ikinci kopya tutulmaz; nesneler mh-dynamic.js'ten okunur, bulunamazsa uretim durur.
const MOTOR = readFileSync(join(KOK, "js", "mh-dynamic.js"), "utf8");
function motorNesnesi(ad) {
  const bas = MOTOR.indexOf(`  var ${ad} = {`);
  const son = bas < 0 ? -1 : MOTOR.indexOf("\n  };", bas);
  if (bas < 0 || son < 0) hata(`js/mh-dynamic.js: var ${ad} bulunamadi`);
  try { return vm.runInNewContext("(" + MOTOR.slice(MOTOR.indexOf("{", bas), son + 4) + ")"); }
  catch (e) { return hata(`js/mh-dynamic.js: ${ad} okunamadi (${e.message})`); }
}
const VAKIT_ADLARI = motorNesnesi("PRAYER_STRINGS");
const MOTOR_METIN = motorNesnesi("M");
const VAKIT_ANAHTARLARI = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
const MOTOR_ANAHTARLARI = ["themeToggle", "useLocation", "close", "pickerTitle", "monthShow", "searchCity"];

const sozluk = {};
for (const d of DILLER) {
  sozluk[d] = {};
  for (const k of ANAHTARLAR) { if (I18N[d][k] == null) hata(`I18N.${d}.${k} yok`); sozluk[d][k] = I18N[d][k]; }
  for (const [k, v] of Object.entries(OZEL)) { if (v[d] == null) hata(`OZEL.${k}.${d} yok`); sozluk[d][k] = v[d]; }
  for (const k of MOTOR_ANAHTARLARI) {
    const v = MOTOR_METIN[d] && MOTOR_METIN[d][k];
    if (v == null) hata(`mh-dynamic M.${d}.${k} yok`);
    sozluk[d][k] = v;
  }
  // Arama kutusunun adi: yer tutucudaki uc nokta olmadan ("Sehir ara...")
  sozluk[d].searchCityLabel = sozluk[d].searchCity.replace(/\s*(\.\.\.|…)$/, "");
  sozluk[d].title = OZEL.pageTitle[d];
  sozluk[d].desc = OZEL.pageDesc[d];
}

const kacir = (x) => String(x).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const kacirMetin = (x) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function degistir(s, eski, yeni, adet, etiket) {
  const c = s.split(eski).length - 1;
  if (c !== adet) hata(`${etiket}: ${c} kez bulundu, ${adet} bekleniyordu`);
  return s.split(eski).join(yeni);
}

const hreflang = [...DILLER.map((d) => `<link rel="alternate" hreflang="${d}" href="${tamAdres(VAKIT[d])}">`),
  `<link rel="alternate" hreflang="x-default" href="${tamAdres(VAKIT.en)}">`].join("\n");

/** Ingilizce taban adreste: kayitli dil ya da tarayici dili baska bir dilse o dilin sayfasina gec.
 *  Arama motoru botu (dil basligi en) etkilenmez; secimini Ingilizce yapan kalir (mh_lang=en). */
const yonlendir = (harita) => `<script>
(function () {
  var M = ${JSON.stringify(Object.fromEntries(DILLER.filter((d) => d !== "en").map((d) => [d, harita[d]])))};
  var l = null;
  try { l = localStorage.getItem("mh_lang"); } catch (e) { /* gizli mod */ }
  if (!l) { var n = (navigator.languages && navigator.languages[0]) || navigator.language || ""; l = String(n).slice(0, 2).toLowerCase(); }
  if (M[l]) location.replace(M[l] + location.search + location.hash);
})();
</script>`;

function basBilgisi(dil) {
  const t = sozluk[dil];
  const url = tamAdres(VAKIT[dil]);
  const ld = {
    "@context": "https://schema.org",
    "@graph": [{ "@type": "WebPage", "@id": `${url}#page`, url, name: t.title, description: t.desc, inLanguage: dil,
      isPartOf: { "@id": `${SITE}/#site` }, publisher: { "@id": `${SITE}/#org` } }],
  };
  return `${dil === "en" ? yonlendir(VAKIT) + "\n" : ""}<title>${kacirMetin(t.title)}</title>
<meta name="description" id="metaDesc" content="${kacir(t.desc)}">
<link rel="canonical" href="${url}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=6760654292">
<meta name="theme-color" content="#1e4d35">
<link rel="preload" href="/js/mh-dynamic.js" as="script">
<link rel="preconnect" href="https://ezanvakti.emushaf.net" crossorigin>
<link rel="dns-prefetch" href="https://ezanvakti.emushaf.net">
<meta property="og:title" content="${kacir(t.title)}">
<meta property="og:description" content="${kacir(t.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${OG_LOCALE[dil]}">
<meta property="og:image" content="${SITE}/og-cover-${dil}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<script type="application/ld+json">
${JSON.stringify(ld, null, 2).replace(/</g, "\\u003c")}
</script>`;
}

const sablon = readFileSync(join(KOK, "_gen", "vakit.src.html"), "utf8");
// Sayfa gecisi parcasi (_gen/nav-loader.html) uc bolum: HEAD (ilk kare isareti), BODY (katman, <body> basi), JS (sonda).
function navParcalari(metin) {
  const m = metin.match(/<!--@@HEAD-->([\s\S]*?)<!--@@BODY-->([\s\S]*?)<!--@@JS-->([\s\S]*)$/);
  if (!m) throw new Error("nav-loader.html: @@HEAD/@@BODY/@@JS bolumleri yok");
  return { HEAD: m[1].trim(), BODY: m[2].trim(), JS: m[3].trim() };
}
// Sayfa gecisi, ana sayfayla ortak.
const NAV = navParcalari(readFileSync(join(KOK, "_gen", "nav-loader.html"), "utf8"));

function sayfa(dil) {
  const t = sozluk[dil];
  let s = sablon;
  s = degistir(s, "<!DOCTYPE html>", `<!DOCTYPE html>
<!-- ⚠️ BU DOSYA URETILMISTIR, ELLE DUZENLEME. Kaynak: _gen/vakit.src.html + _gen/site-i18n.js
     Uretici: node _gen/build-vakit.mjs · dil=${dil} -->`, 1, "damga");
  s = degistir(s, '<html lang="__LANG__" dir="__DIR__">', `<html lang="${dil}" dir="${dil === "ar" ? "rtl" : "ltr"}">`, 1, "html lang");
  s = degistir(s, "<!--__HEAD__-->", basBilgisi(dil), 1, "bas bilgisi");
  s = degistir(s, "<!--__NAVLOAD_HEAD__-->", NAV.HEAD, 1, "gecis basi");
  s = degistir(s, "<!--__NAVLOAD_BODY__-->", NAV.BODY, 1, "gecis katmani");
  s = degistir(s, "<!--__NAVLOAD_JS__-->", NAV.JS, 1, "gecis betigi");

  let yazilan = 0;
  s = s.replace(/(<([a-z0-9]+)\b[^>]*\bdata-t="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g, (tam, ac, etiket, anahtar, icerik, kapa) => {
    if (!(anahtar in t)) hata(`${dil}: data-t="${anahtar}" sozlukte yok`);
    if (/<[a-z]/i.test(icerik)) hata(`${dil}: data-t="${anahtar}" dugumunun ic HTML'i var`);
    yazilan++;
    return ac + kacirMetin(t[anahtar]) + kapa;
  });
  const toplam = (sablon.match(/\bdata-t="/g) || []).length;
  if (yazilan !== toplam) hata(`${dil}: ${toplam} data-t dugumunden ${yazilan} tanesi yazildi`);
  s = s.replace(/(\bdata-t-aria="([^"]+)"[^>]*?aria-label=")[^"]*(")/g, (tam, on, anahtar, son) => {
    if (!(anahtar in t)) hata(`${dil}: data-t-aria="${anahtar}" sozlukte yok`);
    return on + kacir(t[anahtar]) + son;
  });

  // Itani atfi yalniz Ingilizce sayfada: oteki dillerde sayfada Ingilizce meal yok (TR Elmalili,
  // DE/FR yalniz Arapca, AR Arapca), atif orada yaniltiyordu. Ana sayfa da ayni kurali uyguluyor.
  if (dil !== "en") {
    const once = s;
    s = s.replace(/\n[ \t]*<p class="credit">[\s\S]*?<\/p>/, "");
    if (s === once) hata(`${dil}: Itani atfi (p.credit) bulunamadi`);
  }

  const ek = t.suffix || "";
  s = degistir(s, 'href="/privacy-en.html"', `href="/privacy${ek}.html"`, 1, "privacy");
  s = degistir(s, 'href="/terms-en.html"', `href="/terms${ek}.html"`, 1, "terms");
  s = degistir(s, 'href="/account-delete-en.html"', `href="/account-delete${ek}.html"`, 1, "account-delete");
  s = degistir(s, '<span id="langCode">EN</span>', `<span id="langCode">${dil.toUpperCase()}</span>`, 1, "langCode");
  s = degistir(s, 'href="/" data-home-link', `href="${EV[dil]}" data-home-link`, 4, "ana sayfa baglantilari");
  s = degistir(s, 'href="/guides/" data-guides-link', `href="${REHBER[dil]}" data-guides-link`, 2, "rehber baglantilari");
  s = degistir(s, 'href="/ortak-okuma.html" data-reading-link', `href="${ORTAK[dil]}" data-reading-link`, 2, "ortak okuma baglantilari");
  s = degistir(s, `utm_content%3Dtimes"`, `utm_content%3Dtimes-${dil}"`, 1, "play etiketi");

  // Yer tutucu vakit satirlari: gercek adlar, saat 00:00 (rakamlar esit genislikte), gorunmez.
  const adlar = (VAKIT_ADLARI[dil] || hata(`PRAYER_STRINGS.${dil} yok`)).names;
  s = degistir(s, "<!--__TIMES_PH__-->", VAKIT_ANAHTARLARI.map((k) => {
    if (!adlar[k]) hata(`PRAYER_STRINGS.${dil}.names.${k} yok`);
    return `<li data-k="${k}"${k === "sunrise" ? ' class="sun"' : ""}><span>${kacirMetin(adlar[k])}</span><b>00:00</b></li>`;
  }).join(""), 1, "vakit yer tutucu");

  s = degistir(s, "/*__I18N__*/null", JSON.stringify({ [dil]: t }).replace(/</g, "\\u003c"), 1, "sozluk");
  s = degistir(s, "/*__PAGE_LANG__*/null", JSON.stringify(dil), 1, "sayfa dili");
  s = degistir(s, "/*__VAKIT_URL__*/null", JSON.stringify(VAKIT), 1, "vakit adresleri");
  s = degistir(s, "/*__VK_LABEL__*/null", JSON.stringify(t.vAyahLabel).replace(/</g, "\\u003c"), 1, "ayet etiketi");
  s = degistir(s, "/*__NAMAZ_AYET__*/null", JSON.stringify(namazAyetleri(dil)).replace(/</g, "\\u003c"), 1, "namaz ayetleri");

  if (/__[A-Z_]+__/.test(s.replace(/\/\*__[A-Z_]+__\*\//g, ""))) hata(`${dil}: doldurulmamis yer tutucu kaldi`);
  if (s.startsWith("---")) hata("cikti front matter ile basliyor (Jekyll isler)");
  if (/—/.test(s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, ""))) hata(`${dil}: uzun tire (ayrac) var`);
  return s;
}

// ─── Namaz ayetleri ─────────────────────────────────────────────────────────
// 28 Eyl 2026 kullanici istegi: vakit sayfasinda genel "Gunun Ayeti" degil, NAMAZ uzerine
// bir ayet olmali. Her gun listeden biri (yerel gun sirasi, 7 ayet). Metinler ELLE YAZILMAZ:
// data/mushaf'tan (uygulamanin mushafi + Elmalili + Itani, build-mushaf-web.mjs) okunur.
// Kesit alinan ayette baslangic/bitis isaretleri tam metnin icinde BIREBIR aranir, bulunamazsa
// uretim durur (sessizce yanlis metin basilmaz). Kesit kunyede "(bir bolumu)" diye belirtilir.
// DE/FR meal YOK (telif, izin yok), AR'de meal yok: o dillerde Arapca asli + kunye.
// ⚠️ Taha 20:14 bilerek YOK: Itani cevirisi "I—I am God" uzun tire tasiyor (ND lisansli, degistirilemez).
const NAMAZ_AYETLERI = [
  { k: "4:103", kesit: { ar: ["اِنَّ الصَّلٰوةَ"], tr: ["Çünkü namaz"], en: ["The prayer is obligatory"] } },
  { k: "17:78" },
  { k: "2:238" },
  { k: "11:114", kesit: { ar: ["", "اِنَّ الْحَسَنَاتِ"], tr: ["", "Muhakkak ki, iyilik"], en: ["", "The good deeds"] } },
  { k: "29:45", kesit: { ar: ["اِنَّ الصَّلٰوةَ", "وَلَذِكْرُ"], tr: ["Muhakkak ki namaz", "Allah'ı anmak"], en: ["The prayer prevents", "And the remembrance"] } },
  { k: "2:45" },
  { k: "2:43" },
];
const SURE_ADI = {
  2: { tr: "Bakara", lat: "Al-Baqarah", ar: "البقرة" },
  4: { tr: "Nisâ", lat: "An-Nisa'", ar: "النساء" },
  11: { tr: "Hûd", lat: "Hud", ar: "هود" },
  17: { tr: "İsrâ", lat: "Al-Isra'", ar: "الإسراء" },
  29: { tr: "Ankebût", lat: "Al-'Ankabut", ar: "العنكبوت" },
};
const BOLUM = { tr: " (bir bölümü)", en: " (excerpt)", de: " (Auszug)", fr: " (extrait)", ar: " (جزء من الآية)" };
let MUSHAF = null;
function mushafMetni(anahtar, dil) {
  if (!MUSHAF) {
    MUSHAF = { ar: {}, tr: {}, en: {} };
    for (const d of Object.keys(MUSHAF)) {
      for (let i = 0; i < 31; i++) {
        const yol = join(KOK, "data", "mushaf", d, String(i).padStart(2, "0") + ".json");
        if (!existsSync(yol)) continue;
        for (const ayetler of Object.values(JSON.parse(readFileSync(yol, "utf8")).p)) for (const [k, t] of ayetler) MUSHAF[d][k] = t;
      }
    }
  }
  const t = MUSHAF[dil][anahtar];
  if (!t) hata(`mushaf verisinde ${dil} ${anahtar} yok`);
  return t;
}
function kes(metin, isaret, ne) {
  if (!isaret) return metin;
  const [bas, son] = isaret;
  let i = 0, j = metin.length;
  if (bas) { i = metin.indexOf(bas); if (i < 0) hata(`${ne}: baslangic isareti bulunamadi`); }
  if (son) { j = metin.indexOf(son, i); if (j < 0) hata(`${ne}: bitis isareti bulunamadi`); }
  return metin.slice(i, j).trim();
}
function namazAyetleri(dil) {
  return NAMAZ_AYETLERI.map(({ k, kesit }) => {
    const [sure] = k.split(":").map(Number);
    const ad = SURE_ADI[sure] || hata(`SURE_ADI ${sure} yok`);
    const adi = dil === "tr" ? ad.tr : dil === "ar" ? ad.ar : ad.lat;
    const o = { ar: kes(mushafMetni(k, "ar"), kesit && kesit.ar, k + " ar"), ref: `${adi} ${k}${kesit ? BOLUM[dil] : ""}` };
    if (dil === "tr" || dil === "en") o.meal = kes(mushafMetni(k, dil), kesit && kesit[dil], k + " " + dil);
    return o;
  });
}

// ─── uret ───────────────────────────────────────────────────────────────────
const ciktilar = new Map();
for (const d of DILLER) ciktilar.set(join(KOK, dosyaYolu(VAKIT[d])), sayfa(d));

const HARITA = join(KOK, "sitemap.xml");
const lastmodsuz = (x) => x.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, "");
{
  const sm = readFileSync(HARITA, "utf8");
  const bas = "<!-- MH:VAKIT:BASLA -->", bit = "<!-- MH:VAKIT:BITIS -->";
  const i = sm.indexOf(bas), j = sm.indexOf(bit);
  if (i < 0 || j < 0) hata("sitemap.xml'de MH:VAKIT isaretleri yok");
  const bugun = new Date().toISOString().slice(0, 10);
  const satir = DILLER.map((d) => `  <url>\n    <loc>${tamAdres(VAKIT[d])}</loc>\n    <lastmod>${bugun}</lastmod>\n    <changefreq>daily</changefreq>\n  </url>`).join("\n");
  ciktilar.set(HARITA, sm.slice(0, i + bas.length) + "\n" + satir + "\n  " + sm.slice(j));
}

const sayfaDegisti = DILLER.some((d) => {
  const p = join(KOK, dosyaYolu(VAKIT[d]));
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
if (KONTROL && fark) { console.error(`${fark} dosya guncel degil: node _gen/build-vakit.mjs`); process.exit(1); }
if (!fark) console.log("zaten guncel");
