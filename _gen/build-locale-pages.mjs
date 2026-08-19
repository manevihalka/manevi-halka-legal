#!/usr/bin/env node
/**
 * Dil sayfalari ureticisi: index.html'den /tr/, /de/, /fr/, /ar/ uretir.
 *
 * NEDEN: sitenin arama motoruna gorunen statik metni 245 kelime ve TAMAMI
 * Ingilizce. "hatim" gorunur metinde 0 kez geciyor (JS sozlugunde 4 kez).
 * Tek URL'de statik dil TEK olabilir, bu yuzden Turkce icerik ancak ayri
 * adreslerle indekslenebilir.
 *
 * ⚠️ KOK (manevihalka.app/) INGILIZCE TABAN OLARAK KALIR VE URETILMEZ.
 * index.html hem KAYNAK hem URUNDUR. Bu bilincli: bir numaradaki adres bir
 * uretici ciktisina bagimli hale getirilmez. Kok ayni anda hreflang="en" ve
 * hreflang="x-default" tasir; Google buna izin verir ve burada zorunludur,
 * cunku gercekten dilsiz bir kok yapmak Ingilizceyi /en/ adresine tasimak
 * demektir, o da kokle birebir ayni metni tasiyan ikinci bir kendine-kanonik
 * sayfa yaratir ve bugun 1. sirada olan adresin kanonikligini Google'in
 * secimine birakir.
 * ⚠️ /en/ URETILMEZ. --check bunu hata sayar.
 *
 * SOZLUK SOKULUR, KOPYALANMAZ. _gen/build-prayer-ilce-map.mjs'in kurdugu
 * parite sozlesmesi: I18N blogu index.html'den metin olarak kesilir ve
 * node:vm baglaminda calistirilir. Ikinci bir kopya tutulsaydi index.html'de
 * guncellenir, kopya bayatlar, dil sayfalari aylarca eski metni sunardi.
 * (Bu repoda bayatlama TEORIK DEGIL: statik govde metni yedi anahtarda
 * sozlukten geride, commit 31329ed sozlugu guncelleyip statik yedegi
 * guncellememis ve fark aylarca gorulmemis.)
 *
 * KULLANIM:
 *   node _gen/build-locale-pages.mjs           uretir ve yazar
 *   node _gen/build-locale-pages.mjs --check   uretir, yazmaz, fark varsa cikis 1
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const SITE = "https://manevihalka.app";
const KONTROL = process.argv.includes("--check");

/** Uretilecek diller. Kok "en" ve URETILMEZ. */
const DILLER = ["tr"];
const TUM_ALTERNATIF = ["tr", "de", "fr", "ar"];   // hreflang'de ilan edilecekler
const YAYINDA = new Set(DILLER);                    // sadece gercekten var olanlar ilan edilir

const hata = (m) => { console.error("HATA: " + m); process.exit(1); };
const sha = (s) => createHash("sha256").update(s).digest("hex");

/** Isaretli bolgelerin ICINI sabit bir belirtecle degistirir (hash icin). */
function bolgeDisiHam(metin) {
  let s = metin;
  for (const ad of ["HREFLANG", "LANGLIST"]) {
    const bas = `<!-- MH:${ad}:BASLA -->`, bit = `<!-- MH:${ad}:BITIS -->`;
    const i = s.indexOf(bas), j = s.indexOf(bit);
    if (i < 0 || j < 0) continue;
    s = s.slice(0, i + bas.length) + "@@" + s.slice(j);
  }
  return s;
}

/** Tam olarak `adet` kez esleseni degistirir, yoksa patlar. */
function degistir(s, eski, yeni, adet = 1, etiket = "") {
  const c = s.split(eski).length - 1;
  if (c !== adet) hata(`${etiket || eski.slice(0, 50)}: ${c} kez bulundu, ${adet} bekleniyordu`);
  return s.split(eski).join(yeni);
}
/** ⚠️ Eslesme sayisi GLOBAL kopya ile sayilir. s.match(re) global olmayan bir
 *  ifadede [tam, grup1, grup2...] dondurur; uzunlugunu eslesme sayisi sanmak
 *  yakalama grubu olan her ifadede yanlis alarm verir (bir kez dusuldu). */
function reDegistir(s, re, yeni, etiket) {
  const g = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
  const n = (s.match(g) || []).length;
  if (n !== 1) hata(`${etiket}: ${n} eslesme, 1 bekleniyordu`);
  return s.replace(re, yeni);
}

// ─── sozluk sokumu (parite sozlesmesi) ──────────────────────────────────────
const kaynak = readFileSync(join(KOK, "index.html"), "utf8");
// ⚠️ Damgadaki hash, ISARETLI BOLGELER HARIC hesaplanir. Aksi halde uretici
// kendi yazdigi bolgeyi de hash'ler, her calisma hash'i degistirir ve --check
// hicbir zaman "guncel" diyemez (ilk yazimda tam olarak bu oldu).
const kaynakHash = sha(bolgeDisiHam(kaynak));

function sozlukSok(html) {
  const bas = html.indexOf("var I18N = {");
  if (bas < 0) hata("I18N blogu bulunamadi");
  const son = html.indexOf("\n  };", bas);
  if (son < 0) hata("I18N blogunun sonu bulunamadi");
  const kod = html.slice(bas, son + 5);
  const kutu = {};
  vm.createContext(kutu);
  vm.runInContext(kod, kutu);
  return kutu.I18N;
}
const I18N = sozlukSok(kaynak);

// Anahtar kumesi butun dillerde ayni mi (sessiz eksik ceviri korumasi)
{
  const ref = Object.keys(I18N.en).sort();
  for (const d of ["tr", "en", "de", "fr", "ar"]) {
    const k = Object.keys(I18N[d] || {}).sort();
    if (k.join("|") !== ref.join("|")) {
      const eksik = ref.filter((x) => !k.includes(x));
      const fazla = k.filter((x) => !ref.includes(x));
      hata(`${d} anahtar kumesi ayrisik. eksik: [${eksik}] fazla: [${fazla}]`);
    }
  }
}

const DIL_ADI = { tr: "Türkçe", en: "English", de: "Deutsch", fr: "Français", ar: "العربية" };
const yol = (d) => (d === "en" ? SITE + "/" : `${SITE}/${d}/`);

/** hreflang blogu: her sayfada BIREBIR AYNI, kendine referans dahil. */
function hreflangBlok(girinti = "") {
  const satir = [];
  for (const d of TUM_ALTERNATIF) if (YAYINDA.has(d)) satir.push([d, yol(d)]);
  satir.push(["en", yol("en")]);
  satir.push(["x-default", yol("en")]);
  return satir.map(([h, u]) => `${girinti}<link rel="alternate" hreflang="${h}" href="${u}">`).join("\n");
}

/** Dil listesi: yayinda olan diller BAGLANTI, olmayanlar eskisi gibi JS ile.
 *  ⚠️ data-lang HER SATIRDA KALIR. applyLocale aktif dili ONUNLA buluyor
 *  (index.html "var isCur = opts[o].getAttribute('data-lang') === loc") ve
 *  dugmenin etiketini oradan yaziyor. Kaldirildiginda /tr/ sayfasinda dil
 *  dugmesi "English" yaziyordu; secim dogru calisiyor, yalniz etiket yanlisti.
 *  choose() once <a> href'ine baktigi icin ikisi catismaz. */
function dilListesi(girinti) {
  return ["tr", "en", "de", "fr", "ar"].map((d) => {
    const ad = DIL_ADI[d];
    if (d !== "en" && !YAYINDA.has(d)) {
      return `${girinti}<li role="option" data-lang="${d}" tabindex="-1">${ad}</li>`;
    }
    return `${girinti}<li role="option" data-lang="${d}" tabindex="-1"><a href="${d === "en" ? "/" : "/" + d + "/"}" hreflang="${d}" lang="${d}">${ad}</a></li>`;
  }).join("\n");
}

// ─── isaretli bolgeler ──────────────────────────────────────────────────────
function bolgeYaz(metin, ad, icerik) {
  const bas = `<!-- MH:${ad}:BASLA -->`;
  const bit = `<!-- MH:${ad}:BITIS -->`;
  const i = metin.indexOf(bas), j = metin.indexOf(bit);
  if (i < 0 || j < 0) hata(`${ad} isaretleri bulunamadi (once index.html/sitemap.xml'e eklenmeli)`);
  return metin.slice(0, i + bas.length) + "\n" + icerik + "\n" + metin.slice(j);
}
function bolgeDisi(metin, adlar) {
  let s = metin;
  for (const ad of adlar) {
    const bas = `<!-- MH:${ad}:BASLA -->`, bit = `<!-- MH:${ad}:BITIS -->`;
    const i = s.indexOf(bas), j = s.indexOf(bit);
    if (i < 0 || j < 0) return null;
    s = s.slice(0, i + bas.length) + "@@" + s.slice(j);
  }
  return s;
}

// ─── bir dili dondur ────────────────────────────────────────────────────────
function dilSayfasi(dil) {
  const t = I18N[dil];
  if (!t) hata(`sozlukte ${dil} yok`);
  let s = kaynak;
  const rtl = dil === "ar";
  const kendiUrl = yol(dil);

  // 1. html lang + dir
  s = degistir(s, '<html lang="en">', `<html lang="${dil}"${rtl ? ' dir="rtl"' : ""}>`, 1, "html lang");

  // 2. title + description
  s = reDegistir(s, /<title>[^<]*<\/title>/, `<title>${kacir(t.title)}</title>`, "title");
  s = reDegistir(s, /<meta name="description" id="metaDesc" content="[^"]*">/,
    `<meta name="description" id="metaDesc" content="${kacir(t.desc)}">`, "meta description");

  // 3. canonical + og
  s = degistir(s, `<link rel="canonical" href="${SITE}/">`, `<link rel="canonical" href="${kendiUrl}">`, 1, "canonical");
  s = reDegistir(s, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${kendiUrl}">`, "og:url");
  s = reDegistir(s, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${kacir(t.title)}">`, "og:title");
  s = reDegistir(s, /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${kacir(t.desc)}">`, "og:description");
  // og:locale ailesi (bugun hic yok): paylasim onizlemesi dogru dili ilan etsin
  const ogLocale = { tr: "tr_TR", en: "en_US", de: "de_DE", fr: "fr_FR", ar: "ar_AR" };
  const altLocale = ["tr", "en", "de", "fr", "ar"].filter((d) => d !== dil)
    .map((d) => `<meta property="og:locale:alternate" content="${ogLocale[d]}">`).join("\n");
  s = degistir(s, '<meta property="og:type" content="website">',
    `<meta property="og:locale" content="${ogLocale[dil]}">\n${altLocale}\n<meta property="og:type" content="website">`, 1, "og:locale");

  // 4. hreflang blogu (isaretli bolge kokte de ayni icerikle duruyor)
  s = bolgeYaz(s, "HREFLANG", hreflangBlok(""));

  // 5. 32 data-i18n dugumu: metni sozlukten bas. Oznitelik SILINMEZ,
  //    --check modunun tek tutamagi odur.
  let sayac = 0;
  s = s.replace(/(<([a-z0-9]+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g,
    (tam, ac, etiket, anahtar, icerik, kapa) => {
      if (t[anahtar] == null) return tam;
      if (/<[a-z]/i.test(icerik)) return tam;   // ic HTML varsa dokunma
      sayac++;
      return ac + kacirMetin(t[anahtar]) + kapa;
    });
  if (sayac < 30) hata(`data-i18n dugumlerinden yalniz ${sayac} tanesi yazildi (>=30 bekleniyordu)`);

  // 6. hukuki baglantilar
  const ek = t.suffix || "";
  s = degistir(s, 'href="/privacy-en.html"', `href="/privacy${ek}.html"`, 1, "privacy link");
  s = degistir(s, 'href="/terms-en.html"', `href="/terms${ek}.html"`, 1, "terms link");
  s = degistir(s, 'href="/account-delete-en.html"', `href="/account-delete${ek}.html"`, 1, "delete link");

  // 7. sekiz ekran gorseli: src + data-lg + alt STATIK yazilir.
  //    Bugun bu img'lerin src'si HIC yok, JS yaziyor; yani JS calistirmayan
  //    tarayici ve arama motoru botu sayfada tek bir uygulama gorseli gormuyor.
  let gorsel = 0;
  s = s.replace(/<img data-shot="([a-z-]+)"([^>]*)>/g, (tam, ad, geri) => {
    const cap = t["cap_" + ad.split("-")[0]] || t["cap_" + ad] || "Manevi Halka";
    gorsel++;
    return `<img data-shot="${ad}" src="/shots/${dil}/${ad}.jpg" data-lg="/shots/${dil}/${ad}@lg.jpg" alt="${kacir(cap)}"${geri.replace(/\salt=""/, "")}>`;
  });
  if (gorsel !== 8) hata(`${gorsel} ekran gorseli islendi, 8 bekleniyordu`);
  // butonun aria-label'i da ayni metni tasisin
  s = s.replace(/(<button class="shot reveal" type="button" data-index="\d+" aria-label=")Manevi Halka("><img data-shot="([a-z-]+)")/g,
    (tam, on, arka, ad) => {
      const cap = t["cap_" + ad.split("-")[0]] || t["cap_" + ad] || "Manevi Halka";
      return on + kacir(cap) + arka;
    });

  // 7b. dil dugmesinin etiketi JS'siz de dogru dili gostersin
  s = reDegistir(s, /(<span id="langBtnLabel"[^>]*>)[^<]*(<\/span>)/,
    `$1${kacirMetin(DIL_ADI[dil])}$2`, "langBtnLabel");

  // 8. dil listesi (isaretli bolge)
  s = bolgeYaz(s, "LANGLIST", dilListesi("            "));

  // 9. dil secici artik GEZINIR, JS ile metin degistirmez
  s = degistir(s,
    `    function choose(li) {
      var loc = li.getAttribute("data-lang");
      applyLocale(loc);
      try { localStorage.setItem("mh_lang", loc); } catch (e) { /* gizli mod */ }
      close(true);
    }`,
    `    function choose(li) {
      // Uretilmis dil sayfasi: secim bir GEZINME. Metin degistirilmez.
      var a = li.querySelector("a");
      if (a && a.getAttribute("href")) { location.href = a.getAttribute("href"); return; }
      var loc = li.getAttribute("data-lang");
      if (loc) { applyLocale(loc); try { localStorage.setItem("mh_lang", loc); } catch (e) {} }
      close(true);
    }`, 1, "choose()");

  // 10. dil cozumleme sabitlenir: sayfa hangi adresteyse o dildedir.
  //     localStorage'daki eski tercih URL'i EZEMEZ (celiskinin cozumu).
  s = reDegistir(s, /function resolveLocale\(\) \{/,
    `function resolveLocale() {
    // Uretilmis dil sayfasi: dil ADRESTEN gelir, tercih onu ezemez.
    try { localStorage.setItem("mh_lang", "${dil}"); } catch (e) {}
    return "${dil}";
    /* eslint-disable no-unreachable */`, "resolveLocale");

  // 11. sozluk tek dile iner (cap_ anahtarlari calisma aninda gerekli:
  //     buyutec altyazisini currentT["cap_"+ad] ile yaziyor)
  const bas = s.indexOf("var I18N = {");
  const son = s.indexOf("\n  };", bas) + 5;
  s = s.slice(0, bas) + `var I18N = ${JSON.stringify({ [dil]: t }, null, 2).replace(/\n/g, "\n  ")};` + s.slice(son);

  // 12. JSON-LD: kokteki dugumlere REFERANS, cogaltma yok
  s = degistir(s, '  "@graph": [', `  "@graph": [
    {
      "@type": "WebPage",
      "@id": "${kendiUrl}#page",
      "url": "${kendiUrl}",
      "name": ${JSON.stringify(t.title)},
      "description": ${JSON.stringify(t.desc)},
      "inLanguage": "${dil}",
      "isPartOf": { "@id": "${SITE}/#site" }
    },`, 1, "JSON-LD WebPage");

  // 13. uretim damgasi (kaynak hash'i ile: --check yeniden uretmeden bayatlik anlar)
  s = degistir(s, "<!DOCTYPE html>",
    `<!DOCTYPE html>
<!-- ⚠️ BU DOSYA URETILMISTIR, ELLE DUZENLEME. Kaynak: index.html
     Uretici: node _gen/build-locale-pages.mjs
     mh-build src=sha256:${kaynakHash} locale=${dil} -->`, 1, "damga");

  if (s.startsWith("---")) hata("cikti front matter ile basliyor");
  return s;
}

const kacir = (x) => String(x).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const kacirMetin = (x) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;");

// ─── uret ───────────────────────────────────────────────────────────────────
const ciktilar = new Map();
for (const d of DILLER) ciktilar.set(join(KOK, d, "index.html"), dilSayfasi(d));

// kokun isaretli bolgeleri
let kokYeni = bolgeYaz(kaynak, "HREFLANG", hreflangBlok(""));
kokYeni = bolgeYaz(kokYeni, "LANGLIST", dilListesi("            "));
ciktilar.set(join(KOK, "index.html"), kokYeni);

// KOKU KORUYAN SOZLESME: isaretli bolgelerin DISINDA tek bayt degismemeli
{
  const a = bolgeDisi(kaynak, ["HREFLANG", "LANGLIST"]);
  const b = bolgeDisi(kokYeni, ["HREFLANG", "LANGLIST"]);
  if (a === null || b === null || a !== b) hata("kokte isaretli bolgelerin DISI degisti, yazma iptal");
}

// sitemap
{
  const p = join(KOK, "sitemap.xml");
  let sm = readFileSync(p, "utf8");
  const bugun = new Date().toISOString().slice(0, 10);
  const satir = DILLER.map((d) => `  <url>\n    <loc>${yol(d)}</loc>\n    <lastmod>${bugun}</lastmod>\n  </url>`).join("\n");
  ciktilar.set(p, bolgeYaz(sm, "LOCALES", satir));
}

// /en/ asla olmamali
if (existsSync(join(KOK, "en", "index.html"))) hata("en/index.html VAR. Kok zaten Ingilizce, /en/ kopya sayfa yaratir.");

// ─── yaz ya da kontrol et ───────────────────────────────────────────────────
let fark = 0;
for (const [p, icerik] of ciktilar) {
  const mevcut = existsSync(p) ? readFileSync(p, "utf8") : null;
  if (mevcut === icerik) continue;
  fark++;
  if (KONTROL) console.log("FARKLI: " + p.replace(KOK + "/", ""));
  else {
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, icerik);
    console.log("yazildi: " + p.replace(KOK + "/", ""));
  }
}

if (KONTROL) {
  if (fark) { console.error(`\n${fark} dosya guncel degil. "node _gen/build-locale-pages.mjs" calistir.`); process.exit(1); }
  console.log("guncel: uretilmis sayfalar kaynakla uyumlu");
} else {
  console.log(fark ? `\n${fark} dosya guncellendi.` : "\nzaten guncel.");
}
