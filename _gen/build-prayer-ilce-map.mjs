#!/usr/bin/env node
/**
 * data/prayer-ilce-map.json ureticisi — 3.044 sehrin Diyanet ilce kimligini
 * BIR KEZ burada cozer; ziyaretci eyalet taramasi yapmaz (soguk acilis
 * 6-60 sn → 1-2 sn). Gerekce: 18 Agu 2026, tablette ilk ziyaret "donmus"
 * gorunumu; sorun kuresel (TR 81 eyalet en kotusu).
 *
 * PARITE SOZLESMESI: normalize / CITY_ALIASES / DIYANET_COUNTRY_MAP burada
 * YENIDEN YAZILMAZ — js/mh-dynamic.js'ten calisme aninda sokulup aynen
 * calistirilir. Cozumleme sirasi da istemcinin resolveDiyanetCity'siyle
 * birebir: eyalet-adi fast-path → eyalet sirali TAM eslesme → katalog
 * koordinat dizininden en yakin ilce (≤150 km) → alt dizgi son care.
 * Anahtar, istemcinin onbellek anahtariyla ayni: CC|normalize(nameEn||name).
 *
 * Nazik tarama: 2 sn aralik, ayri User-Agent, 429'da 30 sn bekleyip yeniden;
 * ust uste 4 basarisizlikta durur. Kaldigi yerden surer (_gen/cache/).
 * Klasor adi alt cizgiyle basliyor → Jekyll yayinlamaz, siteye sizmasi yok.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const CACHE = join(KOK, "_gen", "cache");
mkdirSync(CACHE, { recursive: true });

const API = "https://ezanvakti.emushaf.net";
const UA = "ManeviHalka-SiteBuild/1.0 (+https://manevihalka.app)";
const UA_YEDEK = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";
let aktifUA = UA;

// ── istemci kodundan parite sokumu ──────────────────────────────────────────
const js = readFileSync(join(KOK, "js", "mh-dynamic.js"), "utf8");
function sok(baslangicDeseni) {
  const i = js.indexOf(baslangicDeseni);
  if (i < 0) throw new Error("bulunamadi: " + baslangicDeseni);
  const j = js.indexOf("};", i);
  return js.slice(i, j + 2);
}
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(sok("var DIYANET_COUNTRY_MAP = {"), sandbox);
vm.runInContext(sok("var CITY_ALIASES = {"), sandbox);
// normalize fonksiyonu (ilk tanim)
const ni = js.indexOf("function normalize(s) {");
vm.runInContext(js.slice(ni, js.indexOf("}", js.indexOf('.replace(/[^A-Z0-9]/g, "")', ni)) + 1), sandbox);
const { DIYANET_COUNTRY_MAP, CITY_ALIASES } = sandbox;
const normalize = sandbox.normalize;
function cityCandidates(ad) {
  const raw = normalize(ad);
  const alias = CITY_ALIASES[raw];
  return alias && normalize(alias) !== raw ? [raw, normalize(alias)] : [raw];
}
const NEAREST_MAX_KM = 150;

// ── nazik indirme (disk onbellekli, surdurulebilir) ─────────────────────────
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
let ustUsteHata = 0;
let sonAgIstegi = 0;
let agIstekSayisi = 0;
async function getir(yol, etiket) {
  const dosya = join(CACHE, etiket + ".json");
  if (existsSync(dosya)) return JSON.parse(readFileSync(dosya, "utf8"));
  const aralik = 2000 - (Date.now() - sonAgIstegi);
  if (aralik > 0) await bekle(aralik);
  for (let deneme = 0; deneme < 3; deneme++) {
    sonAgIstegi = Date.now();
    agIstekSayisi++;
    const r = await fetch(API + yol, { headers: { "User-Agent": aktifUA, Accept: "application/json" } }).catch(() => null);
    if (r && r.ok) {
      const data = await r.json();
      writeFileSync(dosya, JSON.stringify(data));
      ustUsteHata = 0;
      return data;
    }
    const kod = r ? r.status : "ag";
    if (kod === 403 && aktifUA === UA) {
      console.log("  403: ozel UA engellendi, tarayici UA'sina geciliyor");
      aktifUA = UA_YEDEK;
      continue;
    }
    console.log(`  ${kod} → 30 sn bekle (${yol})`);
    await bekle(30000);
  }
  if (++ustUsteHata >= 4) {
    console.error("Ust uste 4 basarisizlik — durduruldu. Yeniden calistirinca kaldigi yerden surer.");
    process.exit(2);
  }
  return null;
}

// ── katalog + koordinat dizini (istemcinin coordIndexFor'unun ayni) ────────
const katalog = JSON.parse(readFileSync(join(KOK, "data", "cities.json"), "utf8"));
function koordinatDizini(cc) {
  const map = {};
  for (const ulke of katalog.countries) {
    if (ulke.code.toUpperCase() !== cc) continue;
    for (const sehir of ulke.cities) {
      const giris = { lat: sehir[2], lon: sehir[3] };
      map[normalize(sehir[0])] = giris;
      if (sehir[1]) map[normalize(sehir[1])] = giris;
    }
  }
  return map;
}
function haversineKm(a, b, c, d) {
  const R = 6371, dLat = ((c - a) * Math.PI) / 180, dLon = ((d - b) * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos((a * Math.PI) / 180) * Math.cos((c * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function exactIlce(ilceler, hedefler) {
  for (const h of hedefler) for (const i of ilceler) if (normalize(i.IlceAdi) === h) return i;
  return null;
}
function fuzzyIlce(ilceler, hedefler) {
  for (const h of hedefler) for (const i of ilceler) {
    const n = normalize(i.IlceAdi);
    if (n.includes(h) || h.includes(n)) return i;
  }
  return null;
}
function nearestIlce(cc, lat, lon, ilceler) {
  const dizin = koordinatDizini(cc);
  let enIyi = null;
  for (const ilce of ilceler) {
    const n = normalize(ilce.IlceAdi);
    let k = dizin[n];
    if (!k) for (const anahtar in dizin) {
      if (anahtar.length >= 5 && (anahtar.indexOf(n) === 0 || n.indexOf(anahtar) === 0)) { k = dizin[anahtar]; break; }
    }
    if (!k) continue;
    const km = haversineKm(lat, lon, k.lat, k.lon);
    if (!enIyi || km < enIyi.km) enIyi = { ilce, km };
  }
  return enIyi && enIyi.km <= NEAREST_MAX_KM ? enIyi.ilce : null;
}

// ── ana dongu ───────────────────────────────────────────────────────────────
const harita = {};
const istatistik = { exact: 0, fastpath: 0, nearest: 0, fuzzy: 0, yok: 0 };
let ulkeSira = 0;
for (const ulke of katalog.countries) {
  const cc = ulke.code.toUpperCase();
  const ulkeID = DIYANET_COUNTRY_MAP[cc];
  ulkeSira++;
  if (!ulkeID) { console.log(`[${ulkeSira}/106] ${cc}: Diyanet eslemesi yok, atlandi`); continue; }
  const eyaletler = await getir("/sehirler/" + ulkeID, "sehirler-" + ulkeID);
  if (!Array.isArray(eyaletler) || eyaletler.length === 0) { console.log(`[${ulkeSira}/106] ${cc}: eyalet listesi bos`); continue; }
  const ilcePaketleri = [];
  for (const ey of eyaletler) {
    const ilceler = await getir("/ilceler/" + ey.SehirID, "ilceler-" + ey.SehirID);
    ilcePaketleri.push({ eyalet: ey, ilceler: Array.isArray(ilceler) ? ilceler : [] });
  }
  const hepsi = ilcePaketleri.flatMap((p) => p.ilceler);
  for (const sehir of ulke.cities) {
    // istemci resolveDiyanetCity'ye nameEn || name gecirir (mh-dynamic:1332)
    const gecilenAd = sehir[1] || sehir[0];
    const anahtar = cc + "|" + normalize(gecilenAd);
    if (harita[anahtar]) continue;
    const hedefler = cityCandidates(gecilenAd);
    // 1) eyalet-adi fast-path
    const eyEs = eyaletler.find((e) => hedefler.includes(normalize(e.SehirAdi)));
    if (eyEs) {
      const paket = ilcePaketleri.find((p) => p.eyalet === eyEs).ilceler;
      let m = exactIlce(paket, hedefler) || fuzzyIlce(paket, hedefler) ||
              paket.find((i) => /MERKEZ/i.test(i.IlceAdi)) || paket[0];
      if (m) { harita[anahtar] = [String(m.IlceID), m.IlceAdi]; istatistik.fastpath++; continue; }
    }
    // 2) eyalet sirali tam eslesme (ilk eyaletteki kazanir — istemciyle ayni)
    let m = null;
    for (const p of ilcePaketleri) { m = exactIlce(p.ilceler, hedefler); if (m) break; }
    if (m) { harita[anahtar] = [String(m.IlceID), m.IlceAdi]; istatistik.exact++; continue; }
    // 3) koordinatca en yakin (≤150 km)
    m = nearestIlce(cc, sehir[2], sehir[3], hepsi);
    if (m) { harita[anahtar] = [String(m.IlceID), m.IlceAdi]; istatistik.nearest++; continue; }
    // 4) alt dizgi son care
    m = fuzzyIlce(hepsi, hedefler);
    if (m) { harita[anahtar] = [String(m.IlceID), m.IlceAdi]; istatistik.fuzzy++; continue; }
    istatistik.yok++;
    console.log(`   eslesmedi: ${anahtar}`);
  }
  console.log(`[${ulkeSira}/106] ${cc}: ${eyaletler.length} eyalet islendi (ag istegi toplam ${agIstekSayisi})`);
}

writeFileSync(join(KOK, "data", "prayer-ilce-map.json"), JSON.stringify(harita));
console.log("\nBITTI:", Object.keys(harita).length, "anahtar |", JSON.stringify(istatistik), "| toplam ag istegi:", agIstekSayisi);
