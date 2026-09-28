#!/usr/bin/env node
/**
 * Yeni tasarim onizlemesi ureticisi: _gen/yeni.src.html -> yeni/index.html
 *
 * Sayfa metinleri index.html'in I18N sozlugunden SOKULUR, kopyalanmaz
 * (build-locale-pages.mjs ile ayni ilke): ana sayfada bir ceviri duzelirse
 * onizleme bir sonraki uretimde kendiliginden duzelir. Onizlemeye ozgu tek
 * anahtar yPreview, asagida.
 *
 * ⚠️ /yeni/ arama motorlarina KAPALI (noindex, site haritasinda yok, siteden
 * baglanti yok). Kalici hali index.html'e tasinacak.
 *
 * KULLANIM:  node _gen/build-yeni.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const DILLER = ["tr", "en", "de", "fr", "ar"];
const ANAHTARLAR = ["h1sub", "get", "ccTitle", "ccLead", "ccNote", "heroInviteTitle", "heroInviteSub",
  "heroInviteGo", "heroInviteSmall", "heroInviteCycle", "heroInviteNear", "heroInviteNear1", "privacy", "terms", "deleteAcc", "contact",
  "itaniCredit", "suffix", "introTitle", "taglineSub", "featuresTitle", "featuresSub",
  "f1t", "f1d", "f2t", "f2d", "f3t", "f3d", "f4t", "f4d", "f5t", "f5d", "f6t", "f6d",
  "closeTitle", "closeText", "closeWish", "quoteText", "quoteSource",
  "cap_dashboard", "cap_flow-detail", "cap_prayer", "cap_quran-reader", "cap_event", "cap_zikir",
  "cap_qibla-explore", "cap_lifestyle"];
const OZEL = {
  yPreview: { tr: "Önizleme", en: "Preview", de: "Vorschau", fr: "Aperçu", ar: "معاينة" },
  yVideo: { tr: "Manevi Halka tanıtım videosu", en: "Manevi Halka promo video", de: "Manevi Halka Vorstellungsvideo",
    fr: "Vidéo de présentation de Manevi Halka", ar: "فيديو تعريفي بـ Manevi Halka" },
  yPlay: { tr: "Oynat", en: "Play", de: "Abspielen", fr: "Lire", ar: "تشغيل" },
  yPause: { tr: "Duraklat", en: "Pause", de: "Pausieren", fr: "Pause", ar: "إيقاف مؤقت" },
  yPrev: { tr: "Önceki", en: "Previous", de: "Zurück", fr: "Précédent", ar: "السابق" },
  yNext: { tr: "Sonraki", en: "Next", de: "Weiter", fr: "Suivant", ar: "التالي" },
  yClose: { tr: "Kapat", en: "Close", de: "Schließen", fr: "Fermer", ar: "إغلاق" },
  yShare: { tr: "Paylaş", en: "Share", de: "Teilen", fr: "Partager", ar: "مشاركة" },
  ySaved: { tr: "Görsel kaydedildi", en: "Image saved", de: "Bild gespeichert", fr: "Image enregistrée", ar: "تم حفظ الصورة" },
  ySocialTitle: { tr: "Halkayla bağlantıda kal", en: "Stay close to the circle", de: "Bleib mit dem Kreis verbunden",
    fr: "Reste lié au cercle", ar: "ابقَ على صلة بالحلقة" },
  ySocialText: { tr: "Günün ayeti her sabah, kandil gecelerinde hatırlatma.",
    en: "The verse of the day every morning, reminders on the blessed nights.",
    de: "Jeden Morgen der Vers des Tages, Erinnerungen in den gesegneten Nächten.",
    fr: "Le verset du jour chaque matin, des rappels lors des nuits bénies.",
    ar: "آية اليوم كل صباح، وتذكير في الليالي المباركة." },
};

function hata(m) { console.error("HATA: " + m); process.exit(1); }

const html = readFileSync(join(KOK, "index.html"), "utf8");
const bas = html.indexOf("var I18N = {");
if (bas < 0) hata("index.html'de I18N blogu bulunamadi");
let i = html.indexOf("{", bas), d = 0, son = i;
for (; son < html.length; son++) {
  const c = html[son];
  if (c === "{") d++;
  else if (c === "}") { d--; if (d === 0) break; }
}
const kutu = {};
vm.runInNewContext("I18N = " + html.slice(i, son + 1), kutu);

const sozluk = {};
for (const dil of DILLER) {
  const kaynak = kutu.I18N[dil];
  if (!kaynak) hata(`I18N.${dil} yok`);
  sozluk[dil] = {};
  for (const k of ANAHTARLAR) {
    if (kaynak[k] == null) hata(`I18N.${dil}.${k} yok`);
    sozluk[dil][k] = kaynak[k];
  }
  for (const [k, v] of Object.entries(OZEL)) sozluk[dil][k] = v[dil];
}

const sablon = readFileSync(join(KOK, "_gen", "yeni.src.html"), "utf8");
const isaret = "/*__I18N__*/null";
if (sablon.split(isaret).length !== 2) hata("sablonda sozluk isareti tek olmali");
mkdirSync(join(KOK, "yeni"), { recursive: true });
writeFileSync(join(KOK, "yeni", "index.html"), sablon.replace(isaret, JSON.stringify(sozluk)));
console.log("yazildi: yeni/index.html");
