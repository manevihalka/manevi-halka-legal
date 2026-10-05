#!/usr/bin/env node
/**
 * Yazdirilabilir hatim cizelgesi ureticisi (5 Eki 2026).
 *   _gen/cizelge.src.html  sayfa kabugu (ust cubuk, altbilgi, tema ve indirme bandi rehberlerle ayni)
 *   bu dosya               metinler (5 dil), cuz verisi, sayfa govdesi
 * Cikti: adresler _gen/site-urls.mjs CIZELGE; sitemap.xml'de MH:CIZELGE bolgesi (yoksa </urlset> oncesine eklenir).
 *
 * Arama niyeti: "hatim cizelgesi (pdf)", "cuz dagitim listesi", "khatam chart/schedule", "Khatm Plan",
 * "tableau khatma", "جدول ختمة", "جدول ختم القرآن في شهر". Hatmi elle duzenleyen kisiye ucretsiz yardim eder,
 * sonunda uygulamanin bunu kendiliginden yaptigini soyler (hatim rehberine baglanti + magaza dugmeleri).
 *
 * CUZ VERISI uygulamanin mushafindan (Diyanet, uygulamadaki numaralama: GORUNEN sayfa 1-604):
 *   - baslangic sayfalari lib/mushafCoords.ts JUZ_START_PAGES_INTERNAL (dahili 1-605), gorunen aralik ayni
 *     formulle (internalToVisible); 20 sayfa aritmetigi KULLANILMAZ, cuz 30 = 581-604.
 *   - cuzun basladigi ayet = o dahili sayfadaki ilk ayet (assets/data/quran-pages.json); lib/quran.ts JUZ_REFS ile ayni.
 *   - sure adlari: TR assets/data/surahs.json nameTurkish (Diyanet yazimi), EN/DE/FR lib/surahNames.ts
 *     SURAH_NAMES_LATIN (duz kesme yerine tipografik ’), AR SURAH_NAMES (harekesiz).
 *   Uretici her calismada uygulama deposunu (APP_REPO ya da ../SpiritualCircleApp) okur ve tabloyu onunla
 *   karsilastirir; tutmazsa durur. Depo yoksa uyarir, gomulu tabloyla devam eder.
 *   Yaygin (Medine) cuz baslangiclariyla 4 fark var ve sayfada not olarak yaziyor: cuz 4 (3:92 / 3:93),
 *   7 (5:83 / 5:82), 11 (9:94 / 9:93), 26 (45:33 / 46:1). Fark listesi degisirse uretici durur (not guncellenmeli).
 *
 * KULLANIM:
 *   node _gen/build-cizelge.mjs           uretir ve yazar
 *   node _gen/build-cizelge.mjs --check   yazmaz, fark varsa cikis 1
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import * as U from "./site-urls.mjs";

const { SITE, DILLER, EV, VAKIT, REHBER, OG_LOCALE, DIL_ADI, rehberAdresi, dosyaYolu, tamAdres } = U;
const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const APP = resolve(process.env.APP_REPO || join(KOK, "..", "SpiritualCircleApp"));
const KONTROL = process.argv.includes("--check");
const hata = (m) => { console.error("HATA: " + m); process.exit(1); };
const CIZELGE = U.CIZELGE || hata("_gen/site-urls.mjs CIZELGE haritasi yok");
// Ortak Okuma adresi: site-urls.mjs ORTAK haritasi varsa onu kullan (dile gore), yoksa eski tek sayfa
const ortakAdres = (dil) => (U.ORTAK && U.ORTAK[dil]) || "/ortak-okuma.html";

// ─── cuz verisi (uygulamadan, asagida dogrulanir) ───────────────────────────
const JUZ_START_PAGES_INTERNAL = [
  1, 22, 42, 62, 82, 102, 122, 142, 162, 182,
  202, 222, 242, 262, 282, 302, 322, 342, 362, 382,
  402, 422, 442, 462, 482, 502, 522, 542, 562, 582,
];
const BASLANGIC = [
  "1:1", "2:142", "2:253", "3:92", "4:24", "4:148", "5:83", "6:111", "7:88", "8:41",
  "9:94", "11:6", "12:53", "15:1", "17:1", "18:75", "21:1", "23:1", "25:21", "27:56",
  "29:46", "33:31", "36:28", "39:32", "41:47", "45:33", "51:31", "58:1", "67:1", "78:1",
];
// Yaygin baskilarin (Medine mushafi) cuz baslangiclari; fark listesi sayfadaki notla ayni olmali.
const STANDART = [
  "1:1", "2:142", "2:253", "3:93", "4:24", "4:148", "5:82", "6:111", "7:88", "8:41",
  "9:93", "11:6", "12:53", "15:1", "17:1", "18:75", "21:1", "23:1", "25:21", "27:56",
  "29:46", "33:31", "36:28", "39:32", "41:47", "46:1", "51:31", "58:1", "67:1", "78:1",
];
const NOTTAKI_FARK = { 4: "3:93", 7: "5:82", 11: "9:93", 26: "46:1" };
const TOPLAM_GORUNEN = 604;
const internalToVisible = (p) => (p <= 2 ? 1 : Math.min(TOPLAM_GORUNEN, p - 1));
const ARALIK = JUZ_START_PAGES_INTERNAL.map((s, i) => {
  const sonraki = JUZ_START_PAGES_INTERNAL[i + 1];
  return [internalToVisible(s), sonraki != null ? internalToVisible(sonraki - 1) : TOPLAM_GORUNEN];
});
if (ARALIK[29][0] !== 581 || ARALIK[29][1] !== 604 || ARALIK[0][0] !== 1 || ARALIK[0][1] !== 20) hata("cuz araliklari beklenen degil");

const SURE = {
  1: ["Fâtiha", "Al-Fatihah", "الفاتحة"], 2: ["Bakara", "Al-Baqarah", "البقرة"], 3: ["Âl-i İmrân", "Al 'Imran", "آل عمران"],
  4: ["Nisâ", "An-Nisa'", "النساء"], 5: ["Mâide", "Al-Ma'idah", "المائدة"], 6: ["En'âm", "Al-An'am", "الأنعام"],
  7: ["A'râf", "Al-A'raf", "الأعراف"], 8: ["Enfâl", "Al-Anfal", "الأنفال"], 9: ["Tevbe", "At-Tawbah", "التوبة"],
  11: ["Hûd", "Hud", "هود"], 12: ["Yûsuf", "Yusuf", "يوسف"], 15: ["Hicr", "Al-Hijr", "الحجر"], 17: ["İsrâ", "Al-Isra'", "الإسراء"],
  18: ["Kehf", "Al-Kahf", "الكهف"], 21: ["Enbiyâ", "Al-Anbiya'", "الأنبياء"], 23: ["Mü'minûn", "Al-Mu'minun", "المؤمنون"],
  25: ["Furkân", "Al-Furqan", "الفرقان"], 27: ["Neml", "An-Naml", "النمل"], 29: ["Ankebût", "Al-'Ankabut", "العنكبوت"],
  33: ["Ahzâb", "Al-Ahzab", "الأحزاب"], 36: ["Yâsîn", "Ya-Sin", "يس"], 39: ["Zümer", "Az-Zumar", "الزمر"],
  41: ["Fussilet", "Fussilat", "فصلت"], 45: ["Câsiye", "Al-Jathiyah", "الجاثية"], 46: ["Ahkâf", "Al-Ahqaf", "الأحقاف"],
  51: ["Zâriyât", "Adh-Dhariyat", "الذاريات"], 58: ["Mücâdele", "Al-Mujadilah", "المجادلة"], 67: ["Mülk", "Al-Mulk", "الملك"],
  78: ["Nebe", "An-Naba'", "النبأ"],
};
// Ekranda tipografik kesme (’); dogrulama uygulamadaki duz kesmeyle yapilir.
const sureAdi = (n, dil) => {
  const s = SURE[n] || hata(`SURE ${n} yok`);
  return dil === "tr" ? s[0].replace(/'/g, "’") : dil === "ar" ? s[2] : s[1].replace(/'/g, "’");
};

// 7 gunluk plan: cuz sinirinda, ilk iki gun 5, sonraki bes gun 4 cuz (gunde 80-100 sayfa).
const HAFTA = [5, 5, 4, 4, 4, 4, 4];
if (HAFTA.reduce((a, b) => a + b, 0) !== 30) hata("7 gunluk plan 30 cuz etmiyor");
const GUNLER = (() => { let c = 1; return HAFTA.map((n) => { const g = [c, c + n - 1]; c += n; return g; }); })();
const gunSayfa = ([a, b]) => [ARALIK[a - 1][0], ARALIK[b - 1][1]];
{
  const sayfalar = GUNLER.map((g) => { const [s, e] = gunSayfa(g); return e - s + 1; });
  if (Math.min(...sayfalar) < 80 || Math.max(...sayfalar) > 100) hata("7 gunluk plan metni '80-100 sayfa' diyor, veri tutmuyor: " + sayfalar.join(","));
}

// ─── uygulama verisiyle dogrulama ───────────────────────────────────────────
function dogrula() {
  if (!existsSync(join(APP, "lib", "mushafCoords.ts"))) { console.log("not: uygulama deposu yok (" + APP + "), veri dogrulamasi atlandi"); return; }
  const oku = (y) => readFileSync(join(APP, y), "utf8");
  const mc = oku("lib/mushafCoords.ts");
  const m = mc.match(/JUZ_START_PAGES_INTERNAL[^=]*=\s*\[([\s\S]*?)\]/) || hata("mushafCoords.ts: JUZ_START_PAGES_INTERNAL okunamadi");
  const app = m[1].split(",").map((x) => x.trim()).filter(Boolean).map(Number);
  if (app.join() !== JUZ_START_PAGES_INTERNAL.join()) hata("cuz baslangic sayfalari uygulamayla tutmuyor: " + app.join());
  if (!/internalPage <= 2\) return 1;\s*return Math\.min\(TOTAL_VISIBLE_PAGES, internalPage - 1\)/.test(mc)) hata("mushafCoords.ts internalToVisible degismis, formulu kontrol et");
  const sayfalar = JSON.parse(oku("assets/data/quran-pages.json"));
  JUZ_START_PAGES_INTERNAL.forEach((p, i) => {
    const ilk = sayfalar[String(p)] && sayfalar[String(p)][0] && sayfalar[String(p)][0].key;
    if (ilk !== BASLANGIC[i]) hata(`cuz ${i + 1}: uygulamada ${ilk}, tabloda ${BASLANGIC[i]}`);
  });
  const qt = oku("lib/quran.ts");
  const refs = [...qt.matchAll(/startKey: "(\d+:\d+)"/g)].map((x) => x[1]);
  if (refs.join() !== BASLANGIC.join()) hata("lib/quran.ts JUZ_REFS cuz baslangiclari tabloyla tutmuyor");
  const sureler = JSON.parse(oku("assets/data/surahs.json"));
  const sn = oku("lib/surahNames.ts");
  const latBol = sn.slice(sn.indexOf("SURAH_NAMES_LATIN"), sn.indexOf("export function surahDisplayName"));
  const arBol = sn.slice(sn.indexOf("export const SURAH_NAMES:"));
  for (const [n, [tr, lat, ar]] of Object.entries(SURE)) {
    if (sureler[n - 1].nameTurkish !== tr) hata(`sure ${n} TR adi: uygulamada ${sureler[n - 1].nameTurkish}`);
    const l = latBol.match(new RegExp(`\\b${n}: "((?:[^"\\\\]|\\\\.)*)"`));
    if (!l || l[1] !== lat) hata(`sure ${n} Latin adi: uygulamada ${l && l[1]}`);
    const a = arBol.match(new RegExp(`\\b${n}: "([^"]*)"`));
    if (!a || a[1] !== ar) hata(`sure ${n} Arapca adi: uygulamada ${a && a[1]}`);
  }
  console.log("cuz verisi uygulamayla dogrulandi (" + APP.replace(/^.*\//, "") + ")");
}
dogrula();
{
  const fark = {};
  BASLANGIC.forEach((k, i) => { if (k !== STANDART[i]) fark[i + 1] = STANDART[i]; });
  if (JSON.stringify(fark) !== JSON.stringify(NOTTAKI_FARK)) hata("yaygin baskiyla fark listesi notla tutmuyor: " + JSON.stringify(fark));
  for (const k of BASLANGIC) if (!SURE[+k.split(":")[0]]) hata("SURE tablosunda " + k + " yok");
}

// ─── kabuk metinleri (ortak kaynaklar) ──────────────────────────────────────
const CHROME = JSON.parse(readFileSync(join(KOK, "_data", "chrome.json"), "utf8"));
const kutu = {};
vm.createContext(kutu);
vm.runInContext(readFileSync(join(KOK, "_gen", "site-i18n.js"), "utf8"), kutu);
const I18N = kutu.I18N || hata("_gen/site-i18n.js I18N tanimlamiyor");
// Rehber sayfalariyla ayni sozcukler (build-rehber.mjs OZEL); kopyalandi cunku orada disa aktarilmiyor.
const KABUK = {
  navGuides: { tr: "Rehberler", en: "Guides", de: "Anleitungen", fr: "Guides", ar: "الأدلة" },
  getApp: { tr: "Uygulamayı indir", en: "Get the app", de: "App laden", fr: "Télécharger l’appli", ar: "حمّل التطبيق" },
  crumbAria: { tr: "Konum", en: "Breadcrumb", de: "Pfad", fr: "Fil d’Ariane", ar: "مسار التنقل" },
  qrCaption: { tr: "Telefonunla okut", en: "Scan with your phone", de: "Mit deinem Handy scannen", fr: "Scanne avec ton téléphone", ar: "امسح الرمز بهاتفك" },
};

// ─── sayfa metinleri ────────────────────────────────────────────────────────
// {n}: cuz ya da gun numarasi, {r}: sayfa araligi. Rehber adresi ctaText icinde {rehber}.
const M = {
  tr: {
    title: "Hatim çizelgesi (PDF): yazdırılabilir cüz dağıtım listesi",
    desc: "Ücretsiz hatim çizelgesi: 30 cüzün başladığı ayet, Diyanet mushafındaki sayfaları, ad ve okundu sütunları, 30 ve 7 günlük plan. Yazdır ya da PDF kaydet.",
    crumb: "Hatim çizelgesi",
    eyebrow: "Ücretsiz, yazdırılabilir",
    h1: "Hatim çizelgesi: 30 cüzü kişilere dağıt",
    lead: "Hatmi elle düzenliyorsan bu çizelge işini kolaylaştırır: her cüzün nereden başladığı ve mushafta hangi sayfaları kapsadığı tek tabloda. Ad ve okundu sütunlarıyla birlikte tek A4 sayfaya sığar.",
    print: "Yazdır ya da PDF olarak kaydet",
    to7: "7 günlük plan",
    hint: "İstersen adları önce bu sayfaya yazıp sonra yazdırabilirsin.",
    howTitle: "Nasıl kullanılır",
    how: [
      "**Yazdır ya da PDF olarak kaydet.** Çizelge tek A4 sayfaya sığar; PDF'i WhatsApp grubuna da gönderebilirsin.",
      "**Her cüzün yanına bir ad yaz.** 30 kişiyle herkese bir cüz düşer; 15 kişiyle ikişer, 10 kişiyle üçer, 6 kişiyle beşer cüz.",
      "**Okunan cüzü işaretle.** Otuz kutunun hepsi dolunca hatim tamamlanmış olur.",
    ],
    sheetTitle: "Hatim çizelgesi",
    sheetSub: "30 cüz · Diyanet mushafı sayfaları",
    fName: "Hatmin adı", fStart: "Başlangıç", fEnd: "Hedef bitiş",
    thNo: "Cüz", thStart: "Başladığı yer", thPages: "Sayfalar", thName: "Ad", thDone: "Okundu",
    caption: "30 cüzün başladığı sure ve ayet ile Diyanet mushafındaki sayfaları; her satırda ad yazmak için bir alan ve okundu kutusu.",
    nameAria: "{n}. cüzü okuyacak kişinin adı", doneAria: "{n}. cüz okundu",
    pagesSm: "s. {r}",
    note: "Sayfa numaraları Diyanet'in Kur'an-ı Kerim sitesindeki (kuran.diyanet.gov.tr) mushafla aynıdır; bu çizelgede Fâtiha da 1. sayfaya dahildir. Bazı basılı mushaflarda cüzler bir sayfa sonra başlayabilir (örneğin 2. cüz 22. sayfada). Medine mushafında 4., 7., 11. ve 26. cüzler biraz farklı yerden başlar: {fark}.",
    noteShort: "Sayfa numaraları Diyanet'in Kur'an-ı Kerim sitesindeki mushafla aynıdır (1–604; Fâtiha 1. sayfaya dahil). Bazı basılı mushaflarda cüzler bir sayfa sonra başlayabilir.",
    plansTitle: "Hatim planları",
    plansLead: "Tek başına ya da birkaç kişiyle okuyorsan hatmi günlere böl.",
    p30Title: "30 günde hatim",
    p30Text: "Her gün bir cüz okursan Kur'an bir ayda biter. Yukarıdaki çizelge aynen 30 günlük plandır: 1. gün 1. cüz, 2. gün 2. cüz. Bir cüz yaklaşık 20 sayfadır, 30. cüz 24 sayfa. Tek başına okuyorsan Ad sütununa tarihi yazabilirsin.",
    p30Btn: "Çizelgeyi yazdır",
    p7Title: "7 günde hatim",
    p7Text: "Bir haftada bitirmek için günler cüz sınırında ayrılır: ilk iki gün beşer, sonraki beş gün dörder cüz. Günde yaklaşık 80–100 sayfa okunur.",
    p7Btn: "Bu planı yazdır",
    weekSub: "Günde 4 ya da 5 cüz · Diyanet mushafı sayfaları",
    thDay: "Gün", thJuzList: "Cüzler",
    weekCaption: "7 günlük hatim planı: her günün cüzleri, başladığı yer ve sayfaları; ad alanı ve okundu kutusu.",
    dayNameAria: "{n}. gün okuyacak kişinin adı", dayDoneAria: "{n}. gün okundu",
    ctaTitle: "Cüzleri uygulama dağıtsın",
    ctaText: "Manevi Halka'da halkanı kurar, hatmi başlatırsın: cüzler kişilere kendiliğinden dağıtılır, kimin okuduğunu uygulama tutar, tur bitince sıradaki cüzler gelir. Nasıl yapıldığını [hatim grubu kurma rehberinde]({rehber}) adım adım görebilirsin. Halka kurmak ve katılmak ücretsiz.",
  },
  en: {
    title: "Khatam chart (PDF): printable 30 juz schedule",
    desc: "Free khatam chart: where each of the 30 juz starts, its pages in the Diyanet mushaf, name and done columns, plus 30- and 7-day plans. Print or save as PDF.",
    crumb: "Khatam chart",
    eyebrow: "Free printable",
    h1: "Khatam chart: share out the 30 juz",
    lead: "If you organise a khatm by hand, this chart does the groundwork: where each juz starts and which pages it covers, all in one table. With columns for names and ticks, it fits on a single A4 page.",
    print: "Print or save as PDF",
    to7: "7-day plan",
    hint: "You can also type the names here first and then print.",
    howTitle: "How to use it",
    how: [
      "**Print it or save it as a PDF.** The chart fits on one A4 page, and you can send the PDF to your WhatsApp group.",
      "**Write a name next to each juz.** With 30 people everyone reads one juz; with 15 people two each, with 10 people three, with 6 people five.",
      "**Tick each juz once it has been read.** When all thirty boxes are ticked, the khatm is complete.",
    ],
    sheetTitle: "Khatm chart",
    sheetSub: "30 juz · Diyanet mushaf pages",
    fName: "Khatm name", fStart: "Start date", fEnd: "Finish by",
    thNo: "Juz", thStart: "Starts at", thPages: "Pages", thName: "Name", thDone: "Done",
    caption: "Where each of the 30 juz starts and its pages in the Diyanet mushaf, with a space for a name and a box to tick on every row.",
    nameAria: "Name of the reader for juz {n}", doneAria: "Juz {n} done",
    pagesSm: "p. {r}",
    note: "Page numbers match the Diyanet mushaf on Diyanet's Quran website (kuran.diyanet.gov.tr); in this chart, Al-Fatihah is part of page 1. In some printed copies a juz may start one page later (juz 2 on page 22, for example). In the Madinah mushaf, juz 4, 7, 11 and 26 start at slightly different places: {fark}.",
    noteShort: "Page numbers match the Diyanet mushaf on kuran.diyanet.gov.tr (1–604; Al-Fatihah is part of page 1). In some printed copies a juz may start one page later.",
    plansTitle: "Khatm plans",
    plansLead: "Reading alone or with a few people? Split the khatm into days.",
    p30Title: "A khatm in 30 days",
    p30Text: "Read one juz a day and you finish the Quran in a month. The chart above is the 30-day plan as it stands: juz 1 on day 1, juz 2 on day 2, and so on. A juz is about 20 pages; juz 30 has 24. If you read on your own, write the date in the Name column.",
    p30Btn: "Print the chart",
    p7Title: "A khatm in 7 days",
    p7Text: "To finish in a week, the days are split at juz boundaries: five juz on each of the first two days, then four a day for five days. That is about 80–100 pages a day.",
    p7Btn: "Print this plan",
    weekSub: "4 or 5 juz a day · page numbers from the Diyanet mushaf",
    thDay: "Day", thJuzList: "Juz",
    weekCaption: "Seven-day khatm plan: the juz, starting point and pages for each day, with a space for a name and a box to tick.",
    dayNameAria: "Name of the reader for day {n}", dayDoneAria: "Day {n} done",
    ctaTitle: "Let the app share out the juz",
    ctaText: "In Manevi Halka you create a circle and start a khatm: the juz are shared out automatically, the app keeps track of who has read, and when a round ends the next juz follow. See how it works, step by step, in the [group khatam guide]({rehber}). Creating and joining a circle is free.",
  },
  de: {
    title: "Khatm-Plan zum Ausdrucken: 30 Dschuz verteilen (PDF)",
    desc: "Kostenloser Khatm-Plan: wo jeder der 30 Dschuz beginnt, seine Seiten im Diyanet-Mushaf, Spalten für Namen und zum Abhaken. Drucken oder als PDF speichern.",
    crumb: "Khatm-Plan",
    eyebrow: "Kostenlos zum Ausdrucken",
    h1: "Khatm-Plan: die 30 Dschuz verteilen",
    lead: "Eine Khatm (auf Türkisch Hatim) ist die Lesung des ganzen Korans; in der Gruppe teilt man dafür die 30 Dschuz auf. Dieser Plan zeigt, wo jeder Dschuz beginnt und welche Seiten er umfasst, mit Spalten für Namen und zum Abhaken, auf einer einzigen A4-Seite.",
    print: "Drucken oder als PDF speichern",
    to7: "7-Tage-Plan",
    hint: "Du kannst die Namen auch zuerst hier eintippen und dann drucken.",
    howTitle: "So geht’s",
    how: [
      "**Druck ihn aus oder speichere ihn als PDF.** Der Plan passt auf eine A4-Seite; das PDF kannst du auch in deine WhatsApp-Gruppe schicken.",
      "**Schreib neben jeden Dschuz einen Namen.** Bei 30 Personen liest jede einen Dschuz, bei 15 Personen je zwei, bei 10 je drei, bei 6 je fünf.",
      "**Hak jeden gelesenen Dschuz ab.** Sind alle dreißig Kästchen abgehakt, ist die Khatm vollständig.",
    ],
    sheetTitle: "Khatm-Plan",
    sheetSub: "30 Dschuz · Seiten des Diyanet-Mushafs",
    fName: "Name der Khatm", fStart: "Beginn", fEnd: "Fertig bis",
    thNo: "Dschuz", thStart: "Beginnt bei", thPages: "Seiten", thName: "Name", thDone: "Gelesen",
    caption: "Wo jeder der 30 Dschuz beginnt und seine Seiten im Diyanet-Mushaf, mit einem Feld für den Namen und einem Kästchen zum Abhaken in jeder Zeile.",
    nameAria: "Name für Dschuz {n}", doneAria: "Dschuz {n} gelesen",
    pagesSm: "S. {r}",
    note: "Die Seitenzahlen stimmen mit dem Diyanet-Mushaf auf der Koran-Website der Diyanet (kuran.diyanet.gov.tr) überein; in diesem Plan gehört Al-Fatihah zu Seite 1. In manchen gedruckten Exemplaren beginnt ein Dschuz eine Seite später (Dschuz 2 zum Beispiel auf Seite 22). Im Medina-Mushaf beginnen die Dschuz 4, 7, 11 und 26 an etwas anderer Stelle: {fark}.",
    noteShort: "Seitenzahlen wie im Diyanet-Mushaf auf kuran.diyanet.gov.tr (1–604; Al-Fatihah gehört zu Seite 1). In manchen gedruckten Exemplaren beginnt ein Dschuz eine Seite später.",
    plansTitle: "Khatm-Pläne",
    plansLead: "Liest du allein oder mit wenigen? Teil die Khatm auf Tage auf.",
    p30Title: "Khatm in 30 Tagen",
    p30Text: "Liest du jeden Tag einen Dschuz, bist du in einem Monat mit dem Koran fertig. Der Plan oben ist genau dieser 30-Tage-Plan: Tag 1 Dschuz 1, Tag 2 Dschuz 2 und so weiter. Ein Dschuz hat etwa 20 Seiten, Dschuz 30 hat 24. Liest du allein, trag in der Namensspalte das Datum ein.",
    p30Btn: "Plan drucken",
    p7Title: "Khatm in 7 Tagen",
    p7Text: "Für eine Woche werden die Tage an den Dschuz-Grenzen geteilt: an den ersten beiden Tagen je fünf Dschuz, danach fünf Tage lang je vier. Das sind etwa 80 bis 100 Seiten am Tag.",
    p7Btn: "Diesen Plan drucken",
    weekSub: "4 oder 5 Dschuz am Tag · Seitenzahlen nach dem Diyanet-Mushaf",
    thDay: "Tag", thJuzList: "Dschuz",
    weekCaption: "Khatm in 7 Tagen: Dschuz, Anfang und Seiten für jeden Tag, mit einem Feld für den Namen und einem Kästchen zum Abhaken.",
    dayNameAria: "Name für Tag {n}", dayDoneAria: "Tag {n} gelesen",
    ctaTitle: "Lass die App die Dschuz verteilen",
    ctaText: "In Manevi Halka gründest du einen Kreis und startest eine Chatma, so heißt die Khatm in der App: Die Dschuz werden von selbst verteilt, die App merkt sich, wer gelesen hat, und nach jeder Runde kommen die nächsten. Wie das geht, zeigt dir die [Anleitung zur Khatm-Gruppe]({rehber}) Schritt für Schritt. Einen Kreis gründen und beitreten ist kostenlos.",
  },
  fr: {
    title: "Tableau de khatma à imprimer : répartir les 30 juz (PDF)",
    desc: "Tableau de khatma gratuit : le début de chaque juz et ses pages dans le mushaf de la Diyanet, avec nom et case à cocher. Plans sur 30 et 7 jours, en PDF.",
    crumb: "Tableau de khatma",
    eyebrow: "Gratuit, à imprimer",
    h1: "Tableau de khatma : répartir les 30 juz",
    lead: "Si tu organises une khatma à la main, ce tableau te fait gagner du temps : il indique où commence chaque juz et quelles pages il couvre. Avec une colonne pour le nom et une case à cocher, il tient sur une seule feuille A4.",
    print: "Imprimer ou enregistrer en PDF",
    to7: "Plan sur 7 jours",
    hint: "Tu peux aussi saisir les noms ici avant d’imprimer.",
    howTitle: "Mode d’emploi",
    how: [
      "**Imprime-le ou enregistre-le en PDF.** Le tableau tient sur une page A4, et tu peux envoyer le PDF à ton groupe WhatsApp.",
      "**Écris un nom à côté de chaque juz.** À 30 personnes, chacun lit un juz ; à 15, deux chacun ; à 10, trois ; à 6, cinq.",
      "**Coche chaque juz une fois lu.** Quand les trente cases sont cochées, la khatma est terminée.",
    ],
    sheetTitle: "Tableau de khatma",
    sheetSub: "30 juz · pages du mushaf de la Diyanet",
    fName: "Nom de la khatma", fStart: "Début", fEnd: "Fin prévue",
    thNo: "Juz", thStart: "Commence à", thPages: "Pages", thName: "Nom", thDone: "Lu",
    caption: "Le début de chacun des 30 juz et ses pages dans le mushaf de la Diyanet, avec sur chaque ligne un espace pour un nom et une case à cocher.",
    nameAria: "Nom pour le juz {n}", doneAria: "Juz {n} lu",
    pagesSm: "p. {r}",
    note: "Les numéros de page sont ceux du mushaf de la Diyanet sur son site du Coran (kuran.diyanet.gov.tr) ; dans ce tableau, Al-Fatihah fait partie de la page 1. Dans certains exemplaires imprimés, un juz peut commencer une page plus loin (le juz 2 à la page 22, par exemple). Dans le mushaf de Médine, les juz 4, 7, 11 et 26 commencent à un endroit un peu différent : {fark}.",
    noteShort: "Numéros de page identiques à ceux du mushaf de la Diyanet sur kuran.diyanet.gov.tr (1–604 ; Al-Fatihah fait partie de la page 1). Dans certains exemplaires imprimés, un juz peut commencer une page plus loin.",
    plansTitle: "Plans de khatma",
    plansLead: "Tu lis seul ou à quelques-uns ? Répartis la khatma sur des jours.",
    p30Title: "Une khatma en 30 jours",
    p30Text: "En lisant un juz par jour, tu termines le Coran en un mois. Le tableau ci-dessus est ce plan sur 30 jours : jour 1 le juz 1, jour 2 le juz 2, et ainsi de suite. Un juz fait environ 20 pages, le juz 30 en fait 24. Si tu lis seul, note la date dans la colonne Nom.",
    p30Btn: "Imprimer le tableau",
    p7Title: "Une khatma en 7 jours",
    p7Text: "Pour terminer en une semaine, les jours sont découpés aux limites des juz : cinq juz par jour les deux premiers jours, puis quatre par jour pendant cinq jours. Cela fait environ 80 à 100 pages par jour.",
    p7Btn: "Imprimer ce plan",
    weekSub: "4 ou 5 juz par jour · pages du mushaf de la Diyanet",
    thDay: "Jour", thJuzList: "Juz",
    weekCaption: "Plan de khatma sur 7 jours : les juz, le début et les pages de chaque jour, avec un espace pour un nom et une case à cocher.",
    dayNameAria: "Nom pour le jour {n}", dayDoneAria: "Jour {n} lu",
    ctaTitle: "Laisse l’appli répartir les juz",
    ctaText: "Dans Manevi Halka, tu crées un cercle et tu lances une khatma : les juz sont répartis automatiquement, l’appli retient qui a lu, et à la fin de chaque tour les juz suivants arrivent. Le [guide de la khatma en groupe]({rehber}) te montre comment faire, pas à pas. Créer un cercle et le rejoindre est gratuit.",
  },
  ar: {
    title: "جدول ختمة القرآن للطباعة: توزيع الأجزاء والختم في شهر",
    desc: "جدول ختمة مجاني: بداية كل جزء من الأجزاء الثلاثين وصفحاته في مصحف ديانت، مع خانة للاسم ومربع للتأشير، وخطة للختم في شهر وأسبوع. اطبعه أو احفظه بصيغة PDF.",
    crumb: "جدول الختمة",
    eyebrow: "جدول مجاني للطباعة",
    h1: "جدول الختمة: وزّع الأجزاء الثلاثين",
    lead: "إن كنت تنظّم الختمة بنفسك فهذا الجدول يختصر عليك العمل: يبيّن أين يبدأ كل جزء وما صفحاته، في جدول واحد. وفيه خانة للاسم ومربع للتأشير، ويتسع لصفحة A4 واحدة.",
    print: "اطبع أو احفظ بصيغة PDF",
    to7: "خطة سبعة أيام",
    hint: "ويمكنك أيضًا كتابة الأسماء هنا أولًا ثم الطباعة.",
    howTitle: "طريقة الاستخدام",
    how: [
      "**اطبعه أو احفظه بصيغة PDF.** يتسع الجدول لصفحة A4 واحدة، ويمكنك إرسال ملف PDF إلى مجموعة واتساب.",
      "**اكتب اسمًا بجانب كل جزء.** مع 30 شخصًا يقرأ كل واحد جزءًا، ومع 15 شخصًا جزأين، ومع 10 أشخاص ثلاثة أجزاء، ومع 6 أشخاص خمسة أجزاء.",
      "**ضع علامة عند قراءة كل جزء.** حين تكتمل العلامات في المربعات الثلاثين تكون الختمة قد تمّت.",
    ],
    sheetTitle: "جدول الختمة",
    sheetSub: "30 جزءًا · صفحات مصحف ديانت",
    fName: "اسم الختمة", fStart: "تاريخ البدء", fEnd: "موعد الختم",
    thNo: "الجزء", thStart: "يبدأ من", thPages: "الصفحات", thName: "الاسم", thDone: "قُرئ",
    caption: "بداية كل جزء من الأجزاء الثلاثين وصفحاته في مصحف ديانت، وفي كل سطر خانة للاسم ومربع للتأشير.",
    nameAria: "اسم قارئ الجزء {n}", doneAria: "تمّت قراءة الجزء {n}",
    pagesSm: "ص {r}",
    note: "أرقام الصفحات مطابقة لمصحف ديانت على موقع القرآن الكريم التابع لها (kuran.diyanet.gov.tr)، وتُحسب الفاتحة في هذا الجدول ضمن الصفحة 1. وفي بعض النسخ المطبوعة قد يبدأ الجزء بعد صفحة واحدة (فالجزء الثاني مثلًا في الصفحة 22). وفي مصحف المدينة تبدأ الأجزاء 4 و7 و11 و26 من مواضع مختلفة قليلًا: {fark}.",
    noteShort: "أرقام الصفحات مطابقة لمصحف ديانت على kuran.diyanet.gov.tr (1–604، والفاتحة ضمن الصفحة 1). وفي بعض النسخ المطبوعة قد يبدأ الجزء بعد صفحة واحدة.",
    plansTitle: "خطط الختمة",
    plansLead: "تقرأ وحدك أو مع عدد قليل؟ قسّم الختمة على الأيام.",
    p30Title: "ختم القرآن في شهر",
    p30Text: "إذا قرأت جزءًا كل يوم ختمت القرآن في شهر. والجدول أعلاه هو خطة الثلاثين يومًا نفسها: اليوم الأول الجزء الأول، واليوم الثاني الجزء الثاني، وهكذا. والجزء نحو 20 صفحة، والجزء الثلاثون 24 صفحة. وإن كنت تقرأ وحدك فاكتب التاريخ في خانة الاسم.",
    p30Btn: "اطبع الجدول",
    p7Title: "ختم القرآن في سبعة أيام",
    p7Text: "للختم في أسبوع تُقسَم الأيام عند حدود الأجزاء: خمسة أجزاء في كل يوم من اليومين الأولين، ثم أربعة أجزاء يوميًا لخمسة أيام، أي نحو 80 إلى 100 صفحة في اليوم.",
    p7Btn: "اطبع هذه الخطة",
    weekSub: "4 أو 5 أجزاء في اليوم · صفحات مصحف ديانت",
    thDay: "اليوم", thJuzList: "الأجزاء",
    weekCaption: "خطة الختم في سبعة أيام: أجزاء كل يوم وبدايتها وصفحاتها، مع خانة للاسم ومربع للتأشير.",
    dayNameAria: "اسم قارئ اليوم {n}", dayDoneAria: "تمّت قراءة اليوم {n}",
    ctaTitle: "دع التطبيق يوزّع الأجزاء",
    ctaText: "في Manevi Halka تنشئ حلقتك وتبدأ الختمة: تُوزَّع الأجزاء على الأشخاص تلقائيًا، ويحفظ التطبيق من قرأ، وعند انتهاء الجولة تأتي الأجزاء التالية. اطّلع على الطريقة خطوة بخطوة في [دليل الختمة الجماعية]({rehber}). إنشاء الحلقة والانضمام إليها مجاني.",
  },
};
// Notun icindeki fark listesi: "Âl-i İmrân 93, Mâide 82, Tevbe 93 ve Ahkâf 1" (dile gore baglac)
const VE = { tr: " ve ", en: " and ", de: " und ", fr: " et ", ar: " و" };
function farkMetni(dil) {
  const p = Object.values(NOTTAKI_FARK).map((k) => { const [s, a] = k.split(":"); return `${sureAdi(+s, dil)} ${a}`; });
  const ayrac = dil === "ar" ? "، " : ", ";
  return p.slice(0, -1).join(ayrac) + (dil === "ar" ? "، و" : VE[dil]) + p[p.length - 1];
}

// ─── yardimcilar ────────────────────────────────────────────────────────────
const IOS = "https://apps.apple.com/app/manevi-halka/id6760654292";
const play = (yer, dil) => "https://play.google.com/store/apps/details?id=com.emrhnayz.spiritualcircle&referrer=" +
  encodeURIComponent(`utm_source=manevihalka.app&utm_medium=website&utm_content=${yer}-${dil}`);
const politika = (ad, dil) => (dil === "tr" ? `/${ad}.html` : `/${ad}-${dil}.html`);
const kacirMetin = (x) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const kacir = (x) => kacirMetin(x).replace(/"/g, "&quot;");
const yer = (s, d) => String(s).replace(/\{(\w+)\}/g, (_, k) => (k in d ? d[k] : hata("yer tutucu yok: " + k)));
/** **kalin** ve [yazi](adres) isaretleri; once kacis. */
function satir(s) {
  let h = kacirMetin(s);
  h = h.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${u}">${t}</a>`);
  return h;
}
const duz = (s) => String(s).replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
/** Sayi araligi: Arapcada ters dizilmesin diye soldan saga yalitilir (uygulamadaki bidiSafeRanges ile ayni amac). */
const aralik = (a, b) => `<span class="ltr">${a}–${b}</span>`;
/** Duz yazidaki sayi araligi ("80–100", "1–604") satir sonunda bolunmesin, Arapcada ters dizilmesin. */
const yazi = (s) => kacirMetin(s).replace(/(\d+)–(\d+)/g, '<span class="ltr">$1–$2</span>');

const SVG = {
  bead: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="0 4.45"/></svg>',
  print: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 9V4h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v6H7z"/></svg>',
  cal: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
};

// ─── govde ──────────────────────────────────────────────────────────────────
function alanlar(t, onek) {
  return `<div class="fields">
          <label class="field"><span>${kacirMetin(t.fName)}</span><input type="text" id="${onek}-ad" autocomplete="off" maxlength="60"></label>
          <label class="field"><span>${kacirMetin(t.fStart)}</span><input type="text" id="${onek}-bas" autocomplete="off" maxlength="30"></label>
          <label class="field"><span>${kacirMetin(t.fEnd)}</span><input type="text" id="${onek}-bit" autocomplete="off" maxlength="30"></label>
        </div>`;
}
const kisaSayfa = (t, [s, e]) => `<span class="pg-sm">${kacirMetin(t.pagesSm).replace("{r}", aralik(s, e))}</span>`;
/** Baslangic hucresi; telefonda ayri sayfa sutunu gizlenir, sayfalar (pg) varsa bu hucrenin altina iner. */
function baslangicHucresi(k, dil, t, pg) {
  const [sure, ayet] = k.split(":");
  return `<td class="c-start"><span class="sn">${kacirMetin(sureAdi(+sure, dil))}</span> ${ayet}<span class="ref ltr">${k}</span>${pg ? kisaSayfa(t, pg) : ""}</td>`;
}
const isim = (aria, n) => `<td class="c-nm"><input class="nm" type="text" autocomplete="off" maxlength="40" aria-label="${kacir(aria.replace("{n}", n))}"></td>`;
const kutucuk = (aria, n) => `<td class="c-ok"><input class="chk" type="checkbox" aria-label="${kacir(aria.replace("{n}", n))}"></td>`;

function govde(dil) {
  const t = M[dil];
  const satirlar = BASLANGIC.map((k, i) => {
    const n = i + 1, [s, e] = ARALIK[i];
    return `<tr><th scope="row" class="c-no"><span class="jn">${n}</span></th>${baslangicHucresi(k, dil, t, [s, e])}<td class="c-pg">${aralik(s, e)}</td>${isim(t.nameAria, n)}${kutucuk(t.doneAria, n)}</tr>`;
  }).join("\n            ");
  const gunler = GUNLER.map((g, i) => {
    const n = i + 1, [s, e] = gunSayfa(g);
    return `<tr><th scope="row" class="c-no"><span class="jn">${n}</span></th><td class="c-juz">${aralik(g[0], g[1])}${kisaSayfa(t, [s, e])}</td>${baslangicHucresi(BASLANGIC[g[0] - 1], dil, t, null)}<td class="c-pg">${aralik(s, e)}</td>${isim(t.dayNameAria, n)}${kutucuk(t.dayDoneAria, n)}</tr>`;
  }).join("\n            ");
  const marka = `<p class="sheet-brand">Manevi Halka · manevihalka.app</p>`;
  return `
    <nav class="crumbs" aria-label="${kacir(KABUK.crumbAria[dil])}"><ol>
      <li><a href="${EV[dil]}">Manevi Halka</a></li>
      <li><a href="${REHBER[dil]}">${kacirMetin(KABUK.navGuides[dil])}</a></li>
      <li aria-current="page">${kacirMetin(t.crumb)}</li>
    </ol></nav>

    <header class="g-hero">
      <div>
        <p class="eyebrow">${SVG.bead}${kacirMetin(t.eyebrow)}</p>
        <h1>${kacirMetin(t.h1).replace(/(\d+) /g, "$1\u00a0")}</h1>
        <p class="lead">${kacirMetin(t.lead)}</p>
        <div class="acts">
          <button type="button" class="btn pri" data-print="chart">${SVG.print}<span>${kacirMetin(t.print)}</span></button>
          <a class="btn sec" href="#plan7">${SVG.cal}<span>${kacirMetin(t.to7)}</span></a>
        </div>
        <p class="hint">${kacirMetin(t.hint)}</p>
      </div>
      <section class="answer howto" aria-labelledby="howto-t">
        <div><h2 id="howto-t">${kacirMetin(t.howTitle)}</h2>
          <ol>${t.how.map((m) => `<li>${satir(m)}</li>`).join("")}</ol></div>
      </section>
    </header>

    <section class="part" id="chart" aria-labelledby="chart-t">
      <div class="sheet">
        <div class="sheet-head">
          <div><h2 id="chart-t">${kacirMetin(t.sheetTitle)}</h2><p class="sheet-sub">${kacirMetin(t.sheetSub)}</p></div>
          ${marka}
          <button type="button" class="btn sec sm no-print" data-print="chart">${SVG.print}<span>${kacirMetin(t.p30Btn)}</span></button>
        </div>
        ${alanlar(t, "c")}
        <div class="tbl-wrap">
          <table class="chart">
            <caption>${kacirMetin(t.caption)}</caption>
            <thead><tr><th scope="col" class="c-no">${kacirMetin(t.thNo)}</th><th scope="col" class="c-start">${kacirMetin(t.thStart)}</th><th scope="col" class="c-pg">${kacirMetin(t.thPages)}</th><th scope="col" class="c-nm">${kacirMetin(t.thName)}</th><th scope="col" class="c-ok">${kacirMetin(t.thDone)}</th></tr></thead>
            <tbody>
            ${satirlar}
            </tbody>
          </table>
        </div>
        <p class="sheet-note">${yazi(yer(t.note, { fark: farkMetni(dil) }))}</p>
      </div>
    </section>

    <section class="part" id="plans" aria-labelledby="plans-t">
      <header class="plans-head"><h2 id="plans-t">${kacirMetin(t.plansTitle)}</h2><p>${kacirMetin(t.plansLead)}</p></header>
      <article class="pcard" id="plan30"><h3>${kacirMetin(t.p30Title)}</h3><p>${yazi(t.p30Text)}</p>
        <button type="button" class="btn sec sm" data-print="chart">${SVG.print}<span>${kacirMetin(t.p30Btn)}</span></button></article>
      <div class="sheet" id="week" role="region" aria-labelledby="week-t">
        <div class="sheet-head" id="plan7">
          <div><h3 id="week-t">${kacirMetin(t.p7Title)}</h3><p class="sheet-sub print-only">${kacirMetin(t.weekSub)}</p><p class="sheet-desc no-print">${yazi(t.p7Text)}</p></div>
          ${marka}
          <button type="button" class="btn sec sm no-print" data-print="week">${SVG.print}<span>${kacirMetin(t.p7Btn)}</span></button>
        </div>
        ${alanlar(t, "w")}
        <div class="tbl-wrap">
          <table class="chart week">
            <caption>${kacirMetin(t.weekCaption)}</caption>
            <thead><tr><th scope="col" class="c-no">${kacirMetin(t.thDay)}</th><th scope="col" class="c-juz">${kacirMetin(t.thJuzList)}</th><th scope="col" class="c-start">${kacirMetin(t.thStart)}</th><th scope="col" class="c-pg">${kacirMetin(t.thPages)}</th><th scope="col" class="c-nm">${kacirMetin(t.thName)}</th><th scope="col" class="c-ok">${kacirMetin(t.thDone)}</th></tr></thead>
            <tbody>
            ${gunler}
            </tbody>
          </table>
        </div>
        <p class="sheet-note">${yazi(t.noteShort)}</p>
      </div>
    </section>`;
}

// ─── bas bilgisi ────────────────────────────────────────────────────────────
function basBilgisi(dil) {
  const t = M[dil];
  const url = tamAdres(CIZELGE[dil]);
  const hreflang = [...DILLER.map((d) => `<link rel="alternate" hreflang="${d}" href="${tamAdres(CIZELGE[d])}">`),
    `<link rel="alternate" hreflang="x-default" href="${tamAdres(CIZELGE.en)}">`].join("\n");
  const kirinti = [{ ad: "Manevi Halka", u: tamAdres(EV[dil]) }, { ad: KABUK.navGuides[dil], u: tamAdres(REHBER[dil]) }, { ad: t.crumb, u: url }];
  const graf = [
    { "@type": "WebPage", "@id": `${url}#page`, url, name: t.title, description: t.desc, inLanguage: dil,
      isPartOf: { "@id": `${SITE}/#site` }, publisher: { "@id": `${SITE}/#org` }, breadcrumb: { "@id": `${url}#crumbs` } },
    { "@type": "BreadcrumbList", "@id": `${url}#crumbs`, itemListElement: kirinti.map((k, i) => ({ "@type": "ListItem", position: i + 1, name: k.ad, item: k.u })) },
  ];
  // Ingilizce taban adres: kayitli dil ya da tarayici dili baska bir dilse o dilin cizelgesine (rehberlerle ayni)
  const yonlendir = dil === "en" ? `<script>
(function () {
  var M = ${JSON.stringify(Object.fromEntries(DILLER.filter((d) => d !== "en").map((d) => [d, CIZELGE[d]])))};
  var s = location.search || "";
  // Uygulama ici kip (?app=1, ya da bu pencerede daha once acildi): dili uygulama secti, adres kalir.
  // Yonlendirme ?app=1'i dusururse sayfa menu, altbilgi ve magaza dugmeleriyle acilirdi (Apple 2.3.10).
  if (/[?&]app=1(&|$)/.test(s)) return;
  try { if (sessionStorage.getItem("mh_app") === "1") return; } catch (e) { /* gizli mod */ }
  var l = null;
  try { l = localStorage.getItem("mh_lang"); } catch (e) { /* gizli mod */ }
  if (!l) { var n = (navigator.languages && navigator.languages[0]) || navigator.language || ""; l = String(n).slice(0, 2).toLowerCase(); }
  if (M[l]) location.replace(M[l] + s + location.hash);
})();
</script>\n` : "";
  return `${yonlendir}<title>${kacirMetin(t.title)}</title>
<meta name="description" content="${kacir(t.desc)}">
<link rel="canonical" href="${url}">
${hreflang}
<meta name="apple-itunes-app" content="app-id=6760654292">
<meta name="theme-color" content="#1e4d35">
<meta property="og:title" content="${kacir(t.title)}">
<meta property="og:description" content="${kacir(t.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${OG_LOCALE[dil]}">
<meta property="og:image" content="${SITE}/og-cover-${dil}.jpg">
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
const sablon = readFileSync(join(KOK, "_gen", "cizelge.src.html"), "utf8");
const NAV = (() => {
  const m = readFileSync(join(KOK, "_gen", "nav-loader.html"), "utf8").match(/<!--@@HEAD-->([\s\S]*?)<!--@@BODY-->([\s\S]*?)<!--@@JS-->([\s\S]*)$/);
  if (!m) hata("nav-loader.html: @@HEAD/@@BODY/@@JS bolumleri yok");
  return { HEAD: m[1].trim(), BODY: m[2].trim(), JS: m[3].trim() };
})();

// Fransiz tipografisi (build-rehber.mjs frTipografi ile ayni): iki nokta, noktali virgul, soru ve unlemden once
// bolunmez bosluk, harf arasi duz kesme tipografik olur. Betik ve stil bloklarina dokunmaz.
function frTipografi(html) {
  const duzelt = (x) => x
    .replace(/ ([:;?!»])/g, " $1").replace(/« /g, "« ")
    .replace(/([A-Za-zÀ-ÿ])(?:'|&#39;|&#x27;)([A-Za-zÀ-ÿ])/g, "$1’$2");
  return html.split(/(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>)/i).map((parca, i) => {
    if (i % 2) return parca;
    return parca
      .replace(/>([^<]+)</g, (_, x) => ">" + duzelt(x) + "<")
      .replace(/\b(alt|aria-label|title|placeholder|content)="([^"]*)"/g, (m, ad, v) => (ad === "content" && !/[a-z]{3}/i.test(v) ? m : `${ad}="${duzelt(v)}"`));
  }).join("");
}

function sayfa(dil) {
  const t = M[dil], ch = CHROME[dil], s = I18N[dil];
  if (!ch || !s) hata(`${dil}: chrome.json ya da site-i18n.js eksik`);
  const diller = () => DILLER.map((d) => `<a href="${CIZELGE[d]}" hreflang="${d}" lang="${d}"${d === dil ? ' aria-current="page"' : ""}>${DIL_ADI[d]}</a>`).join("");
  const rehber = rehberAdresi("hatim", dil);
  const ham = {
    lang: dil, dir: dil === "ar" ? "rtl" : "ltr",
    homeHref: EV[dil], vakitHref: VAKIT[dil], ortakHref: ortakAdres(dil), hubHref: REHBER[dil],
    main: govde(dil), langMenuHtml: diller(), langsHtml: diller(), langCode: dil.toUpperCase(),
    iosHref: IOS, androidHref: play("chart", dil),
    privacyHref: politika("privacy", dil), termsHref: politika("terms", dil), deleteHref: politika("account-delete", dil),
    ctaHtml: satir(yer(t.ctaText, { rehber })),
  };
  const metin = {
    navAria: ch.sections, navApp: ch.app, navTimes: ch.navTimes, navReading: ch.reading, navGuides: KABUK.navGuides[dil],
    langAria: ch.language, themeToDark: ch.toDark, getApp: KABUK.getApp[dil], get: s.get,
    ctaTitle: t.ctaTitle, qrCaption: KABUK.qrCaption[dil],
    socialTitle: ch.socialTitle, socialText: ch.socialText, privacy: ch.privacy, terms: ch.terms, deleteAcc: ch.deleteAcc, contact: ch.contact,
  };
  const yok = new Set();
  let out = sablon.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (k in ham) return ham[k];
    if (k in metin) { if (metin[k] == null) yok.add(k); return kacirMetin(metin[k] ?? ""); }
    yok.add(k); return "";
  });
  if (yok.size) hata(`${dil}: sablonda karsiligi olmayan anahtar(lar): ${[...yok].join(", ")}`);
  const veri = { aria: { toDark: ch.toDark, toLight: ch.toLight }, links: { ios: IOS, android: play("chart-top", dil) } };
  for (const [isaret, parca] of [["/*__DATA__*/null", JSON.stringify(veri).replace(/</g, "\\u003c")], ["<!--__HEAD__-->", basBilgisi(dil)],
    ["<!--__NAVLOAD_HEAD__-->", NAV.HEAD], ["<!--__NAVLOAD_BODY__-->", NAV.BODY], ["<!--__NAVLOAD_JS__-->", NAV.JS]]) {
    if (out.split(isaret).length !== 2) hata(`sablonda ${isaret} tek olmali`);
    out = out.replace(isaret, () => parca);
  }
  out = out.replace("<!DOCTYPE html>", `<!DOCTYPE html>
<!-- ⚠️ BU DOSYA URETILMISTIR, ELLE DUZENLEME. Kaynak: _gen/cizelge.src.html + _gen/build-cizelge.mjs
     Uretici: node _gen/build-cizelge.mjs · dil=${dil} -->`);
  if (dil === "fr") out = frTipografi(out);

  // ─── denetimler ───
  if (/\{\{\w+\}\}/.test(out)) hata(`${dil}: doldurulmamis yer tutucu kaldi`);
  if (out.startsWith("---")) hata("cikti front matter ile basliyor (Jekyll isler)");
  if ([...t.title].length > 60) hata(`${dil}: baslik ${[...t.title].length} karakter (en fazla 60)`);
  if ([...t.desc].length > 155) hata(`${dil}: aciklama ${[...t.desc].length} karakter (en fazla 155)`);
  const gorunen = out.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, "");
  if (/—/.test(gorunen)) hata(`${dil}: uzun tire (ayrac) var`);
  if (/\s[-–]\s/.test(gorunen.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " "))) hata(`${dil}: cumle ayraci olarak tire var`);
  if (/Cev[sş]en|Jawshan|Dschauschan|جوشن/i.test(gorunen)) hata(`${dil}: Cevsen gecen metin var (tanitim yuzeyi kurali)`);
  if (/\p{Extended_Pictographic}/u.test(gorunen.replace(/[©®™]/g, ""))) hata(`${dil}: emoji var`);
  if (/fiyat|price|preis|prix|€|\$\d|₺/i.test(duz(t.ctaText))) hata(`${dil}: fiyat yazilmaz`);
  return out;
}

// ─── uret ───────────────────────────────────────────────────────────────────
const ciktilar = new Map();
for (const d of DILLER) {
  if (!M[d]) hata(`metin yok: ${d}`);
  const anahtarlar = Object.keys(M.tr).sort().join();
  if (Object.keys(M[d]).sort().join() !== anahtarlar) hata(`${d}: metin anahtarlari Turkceyle ayni degil`);
  ciktilar.set(join(KOK, dosyaYolu(CIZELGE[d])), sayfa(d));
}

const HARITA = join(KOK, "sitemap.xml");
const lastmodsuz = (x) => x.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, "");
{
  let sm = readFileSync(HARITA, "utf8");
  const bas = "<!-- MH:CIZELGE:BASLA -->", bit = "<!-- MH:CIZELGE:BITIS -->";
  if (sm.indexOf(bas) < 0 || sm.indexOf(bit) < 0) {
    if (sm.split("</urlset>").length !== 2) hata("sitemap.xml: </urlset> tek degil");
    sm = sm.replace("</urlset>", `  ${bas}\n  ${bit}\n</urlset>`);
  }
  const i = sm.indexOf(bas), j = sm.indexOf(bit);
  const bugun = new Date().toISOString().slice(0, 10);
  const satirlar = DILLER.map((d) => `  <url>\n    <loc>${tamAdres(CIZELGE[d])}</loc>\n    <lastmod>${bugun}</lastmod>\n  </url>`).join("\n");
  ciktilar.set(HARITA, sm.slice(0, i + bas.length) + "\n" + satirlar + "\n  " + sm.slice(j));
}

const sayfaDegisti = DILLER.some((d) => { const p = join(KOK, dosyaYolu(CIZELGE[d])); return !existsSync(p) || readFileSync(p, "utf8") !== ciktilar.get(p); });
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
if (KONTROL && fark) { console.error(`${fark} dosya guncel degil: node _gen/build-cizelge.mjs`); process.exit(1); }
if (!fark) console.log("zaten guncel");
