#!/usr/bin/env node
/**
 * Rehber mini ekranlarinin uygulama metinleri (5 Eki 2026).
 *
 * Mini ekranlardaki dugme ve baslik adlari ELLE YAZILMAZ: uygulamanin kendi
 * locales/*.json dosyalarindan alinir, boylece sitede "Halka kur" yazan dugme
 * uygulamada da "Halka kur" yazar. Hangi anahtarlarin alinacagi KODDAN cikar:
 * _gen/rehber altindaki .mjs dosyalarinda L("anahtar") diye gecen her anahtar.
 * Cikti _gen/rehber/app-labels.json (yalniz kullanilan anahtarlar, 5 dil).
 *
 * Arapca DUZELTMELER: uygulamanin Arapca metninde 5 dizge hatmi "حفظ" (ezber)
 * diye cevirmis. Rehber yanlis terimi yaymasin diye asagidaki AR_DUZELTME
 * kullanilir; uygulama duzeltilince fark kalmaz ve betik bunu soyler.
 *
 * KULLANIM:
 *   node _gen/sync-app-labels.mjs                 ../SpiritualCircleApp/locales'tan okur
 *   APP_REPO=/yol/SpiritualCircleApp node _gen/sync-app-labels.mjs
 *   node _gen/sync-app-labels.mjs --check         yazmaz, fark varsa cikis 1
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const APP = resolve(process.env.APP_REPO || join(KOK, "..", "SpiritualCircleApp"));
const KONTROL = process.argv.includes("--check");
const DILLER = ["tr", "en", "de", "fr", "ar"];
const CIKTI = join(KOK, "_gen", "rehber", "app-labels.json");
const hata = (m) => { console.error("HATA: " + m); process.exit(1); };

const AR_DUZELTME = {
  "wizard.targetJuz": "ختمة بالأجزاء",
  "wizard.fullHatim": "ختمة كاملة",
  "wizard.hatmEquals30": "ختمة كاملة = 30 جزءًا",
  "wizard.quranTargetHint": "اختر ختمة بالأجزاء أو هدف صفحات أو قراءة حرة.",
  "group.noReadingsAdminHint": "عندما يبدأ المسؤول حلقة (ختمة، صفحات، إلخ) بـ \"بدء جديد\"، ستظهر هنا.",
};

function dosyalar(dir) {
  const out = [];
  for (const ad of readdirSync(dir)) {
    const p = join(dir, ad);
    if (statSync(p).isDirectory()) out.push(...dosyalar(p));
    else if (ad.endsWith(".mjs")) out.push(p);
  }
  return out;
}
const anahtarlar = new Set();
for (const f of dosyalar(join(KOK, "_gen", "rehber"))) {
  // Yorumlar atlanir (belge orneklerindeki L("anahtar") sayilmasin)
  const kod = readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  for (const m of kod.matchAll(/\bLe?\(\s*["']([A-Za-z0-9_.]+)["']/g)) anahtarlar.add(m[1]);
  // Icerik dosyalarindaki [[anahtar]], [[ol:anahtar]], [[tx:anahtar]] isaretleri ([[=yazi]] haric)
  for (const m of kod.matchAll(/\[\[(?:ol:|tx:)?([A-Za-z][A-Za-z0-9_]*\.[A-Za-z0-9_.]+)\]\]/g)) anahtarlar.add(m[1]);
}
if (!anahtarlar.size) hata("_gen/rehber altinda hic L(\"...\") anahtari yok");

const yerel = {};
for (const d of DILLER) {
  const p = join(APP, "locales", d + ".json");
  if (!existsSync(p)) hata(`uygulama dil dosyasi yok: ${p} (APP_REPO ile yol ver)`);
  yerel[d] = JSON.parse(readFileSync(p, "utf8"));
}
const al = (obj, k) => k.split(".").reduce((o, p) => (o && typeof o === "object" ? o[p] : undefined), obj);

const cikti = {};
const eksikler = new Set();
for (const d of DILLER) {
  cikti[d] = {};
  for (const k of [...anahtarlar].sort()) {
    let v = al(yerel[d], k);
    if (typeof v !== "string") { eksikler.add(`${d}:${k}`); continue; }
    if (d === "ar" && AR_DUZELTME[k]) {
      if (v === AR_DUZELTME[k]) console.log(`not: ar ${k} uygulamada zaten duzeltilmis, AR_DUZELTME'den silinebilir`);
      v = AR_DUZELTME[k];
    }
    cikti[d][k] = v;
  }
}
if (eksikler.size) {
  // Hata degil uyari: paralel yazarlardan birinin yanlis anahtari otekileri durdurmasin.
  // O anahtari kullanan sayfa build-rehber.mjs'de durur.
  console.error("UYARI: uygulamada bulunmayan anahtar(lar), atlandi: " + [...eksikler].join(", "));
  if (KONTROL) process.exit(1);
}
const metin = JSON.stringify(cikti, null, 1) + "\n";
const mevcut = existsSync(CIKTI) ? readFileSync(CIKTI, "utf8") : null;
if (mevcut === metin) { console.log(`zaten guncel (${anahtarlar.size} anahtar)`); process.exit(0); }
if (KONTROL) { console.error("_gen/rehber/app-labels.json guncel degil: node _gen/sync-app-labels.mjs"); process.exit(1); }
writeFileSync(CIKTI, metin);
console.log(`yazildi: _gen/rehber/app-labels.json (${anahtarlar.size} anahtar, kaynak ${APP})`);
