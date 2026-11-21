/**
 * "Tek seferlik halka" rehberinin ekranlari (21 Kas 2026, 2.1.0 akisina gore BASTAN yazildi;
 * eski dort adimli sihirbaz ve onun vf-* sahneleri kalkti).
 *
 * Uygulamada karsiligi (SpiritualCircleApp, 2.1.0):
 *   kurma      app/create-event.tsx (pick · compose · list · ready), lib/eventComposeCore.ts,
 *              components/task/composeUi.tsx (ComposePreview, ComposeRows, ComposeSheet)
 *   halka      app/event/[id].tsx (17 Kas 2026 yeni duzen: SEKMESIZ dort kart: halka karti,
 *              "Senin payin", "Halkanin durumu", davet karti), lib/eventScreenCore.ts,
 *              components/event/EventInviteCard.tsx
 *   netice     features/journey/EventResultScreen.tsx ("Ayni halkayi yeniden kur" = `again`)
 *   bildirim   supabase/functions/event-bot (2d tamamlandi push'u), _shared/pushI18n.ts eventCompleted
 *   web        halka.html (bu depo): yalniz BUGUN CANLI olan davranis. 2.1.0 web yamasi
 *              (sure kaleminde "Okudum", "Bu halka tamamlandi") 21 Kas 2026'da bu depoda YOK;
 *              sure kalemi web'de sayacla katilir (zikir tahtasi).
 *
 * NOT: magaza galerisindeki e-event / e-halka kareleri eski (sekmeli) halka ekranini gosteriyor;
 * kod 17 Kas'ta sekmesiz duzene gecti. Buradaki halka ekrani KODA gore cizildi.
 * "Halkan hazir" ekranindaki Hud 41 ayeti 19 Kas 2026'da kalkti (CLAUDE.md), cizilmez.
 *
 * KURALLAR (sahne.mjs basindakilere ek)
 * - Uygulama metni K.L("anahtar") ile, anahtar DOGRUDAN yazilir (sync-app-labels regex'le toplar).
 * - Netice ekraninin ve "Neticeyi gor" dugmesinin metni locales'te degil, features/journey/i18n'de:
 *   asagidaki J sozlugu oradan BIREBIR kopyadir (degisirse burasi da degisir).
 * - Web sayfasinin metni halka.html'deki S sozlugunden okunur (W()). Elle yazilmaz.
 * - Gorunum fonksiyonlari `export` edilir: sahneler-yasin.mjs ayni ekranlari 41 Yasin icin kullanir.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { fmt } from "./sahne.mjs";

const BURASI = dirname(fileURLToPath(import.meta.url));

// ── halka.html sozlugu (web misafir sayfasinin kendi metinleri) ─────────────────
const HALKA = readFileSync(join(BURASI, "..", "..", "halka.html"), "utf8");
function sozluk(ad) {
  const bas = HALKA.indexOf(`var ${ad} = {`);
  if (bas < 0) throw new Error(`halka.html: "var ${ad} = {" bulunamadi`);
  let i = HALKA.indexOf("{", bas), d = 0, tirnak = null;
  const ilk = i;
  for (; i < HALKA.length; i++) {
    const c = HALKA[i];
    if (tirnak) { if (c === "\\") { i++; continue; } if (c === tirnak) tirnak = null; continue; }
    if (c === "'" || c === '"' || c === "`") { tirnak = c; continue; }
    if (c === "/" && HALKA[i + 1] === "/") { i = HALKA.indexOf("\n", i); continue; }
    if (c === "{") d++;
    else if (c === "}" && --d === 0) break;
  }
  return vm.runInNewContext("(" + HALKA.slice(ilk, i + 1) + ")");
}
const WEB_S = sozluk("S");
const WEB_RD = sozluk("RD");
/** Web okuyucusunun metni (halka.html RD sozlugu). */
export function WR(K, k) {
  const R = WEB_RD[K.dil];
  if (!R || !(k in R)) throw new Error(`halka.html RD.${k} yok (${K.dil})`);
  return String(R[k]);
}
/** Web sayfasinin metni (halka.html S sozlugu). */
export function W(K, k, v = {}) {
  const S = WEB_S[K.dil];
  if (!S || !(k in S)) throw new Error(`halka.html S.${k} yok (${K.dil})`);
  return String(S[k]).replace(/\{(\w+)\}/g, (t, x) => (x in v ? v[x] : t));
}

// ── Netice ekrani metinleri (features/journey/i18n/<dil>.ts, birebir) ───────────
const J = {
  tr: { title: "Halka Neticesi", completed: "Halkanız tamamlandı", hatimCompleted: "Hatminiz tamamlandı", accepted: "Allah kabul etsin.",
    again: "Aynı halkayı yeniden kur", oursTitle: "Halkamız", done: "Tamamlanan", participantsLabel: "Katılımcı", myPart: "Senin katkın",
    result: "Neticeyi gör", juz: "{n} cüz", pages: "{n} sayfa", people: "{n} kişi", readings: "{n} okuma", itemsSurah: "Sûreler" },
  en: { title: "Circle Result", completed: "Your circle is complete", hatimCompleted: "Your khatm is complete", accepted: "May Allah accept it.",
    again: "Set up this circle again", oursTitle: "Our circle", done: "Completed", participantsLabel: "Participants", myPart: "Your contribution",
    result: "See the result", juz: "{n} juz", pages: "{n, plural, one {# page} other {# pages}}", people: "{n, plural, one {# person} other {# people}}",
    readings: "{n, plural, one {# reading} other {# readings}}", itemsSurah: "Surahs" },
  de: { title: "Ergebnis des Kreises", completed: "Euer Kreis ist abgeschlossen", hatimCompleted: "Eure Chatma ist abgeschlossen", accepted: "Möge Allah es annehmen.",
    again: "Diesen Kreis erneut anlegen", oursTitle: "Unser Kreis", done: "Abgeschlossen", participantsLabel: "Teilnehmende", myPart: "Dein Beitrag",
    result: "Ergebnis ansehen", juz: "{n} Dschuz", pages: "{n, plural, one {# Seite} other {# Seiten}}", people: "{n, plural, one {# Person} other {# Personen}}",
    readings: "{n, plural, one {# Lesung} other {# Lesungen}}", itemsSurah: "Suren" },
  fr: { title: "Résultat du cercle", completed: "Votre cercle est achevé", hatimCompleted: "Votre khatma est achevée", accepted: "Qu'Allah l'accepte.",
    again: "Recréer ce cercle", oursTitle: "Notre cercle", done: "Accompli", participantsLabel: "Participants", myPart: "Ta contribution",
    result: "Voir le résultat", juz: "{n} juz", pages: "{n, plural, one {# page} other {# pages}}", people: "{n, plural, one {# personne} other {# personnes}}",
    readings: "{n, plural, one {# lecture} other {# lectures}}", itemsSurah: "Sourates" },
  ar: { title: "نتيجة الحلقة", completed: "اكتملت حلقتكم", hatimCompleted: "اكتملت ختمتكم", accepted: "تقبّل الله.",
    again: "أنشئ هذه الحلقة من جديد", oursTitle: "حلقتنا", done: "المنجَز", participantsLabel: "مشارك", myPart: "مساهمتك",
    result: "عرض النتيجة", juz: "{n, plural, one {جزء واحد} two {جزءان} few {# أجزاء} many {# جزءًا} other {# جزء}}",
    pages: "{n, plural, one {صفحة واحدة} two {صفحتان} few {# صفحات} many {# صفحة} other {# صفحة}}",
    people: "{n, plural, one {شخص واحد} two {شخصان} few {# أشخاص} many {# شخصًا} other {# شخص}}",
    readings: "{n, plural, one {قراءة واحدة} two {قراءتان} few {# قراءات} many {# قراءة} other {# قراءة}}", itemsSurah: "السور" },
};
/** Netice / "Neticeyi gor" metni. */
export const JT = (K, k, v = {}) => fmt(J[K.dil][k], v, K.dil);

// ── Tamamlandi bildirimi (supabase/functions/_shared/pushI18n.ts eventCompleted, birebir) ──
const PUSH = {
  tr: { title: "Tamamlandı", body: (t) => `"${t}" tamamlandı. Allah kabul etsin.` },
  en: { title: "Completed", body: (t) => `"${t}" is complete. May Allah accept it.` },
  de: { title: "Abgeschlossen", body: (t) => `"${t}" ist abgeschlossen. Möge Allah es annehmen.` },
  fr: { title: "Terminé", body: (t) => `"${t}" est terminé. Qu'Allah l'accepte.` },
  ar: { title: "اكتملت", body: (t) => `اكتملت "${t}". تقبّل الله.` },
};
export const pushMetni = (K, title) => ({ title: PUSH[K.dil].title, body: PUSH[K.dil].body(title) });

// ── Dile gore ornek veriler (kullanicinin yazdiklari ve tarih bicimleri; uygulama metni DEGIL) ──
// "Bugun" 21 Kas 2026 Cumartesi ~10:00. Bitis cipleri lib/eventComposeCore.ts kuraliyla:
// 1 hafta 28 Kas 11:00, 3 gun 24 Kas 11:00, Cumaya kadar 27 Kas 12:00, siradaki kandil Regaib 9 Ara 20:00.
const OR = {
  tr: { hatim: "Regaib Kandili Hatmi", wWeek: "28 Kas Cmt 11:00", wDays3: "24 Kas Sal 11:00", wFriday: "27 Kas Cum 12:00", wKandil: "9 Ara Çar 20:00",
    webUntil: "9 Aralık", webFriday: "27 Kasım", uDays3: "24 Kasım Salı", vefatAd: "Babamız için Hatim", vefatDed: "Babamızın ruhuna", guest: "Hatice", lockDate: "Çarşamba, 9 Aralık" },
  en: { hatim: "Laylat al-Raghaib Khatm", wWeek: "Sat 28 Nov, 11:00", wDays3: "Tue 24 Nov, 11:00", wFriday: "Fri 27 Nov, 12:00", wKandil: "Wed 9 Dec, 20:00",
    webUntil: "9 December", webFriday: "27 November", uDays3: "Tuesday 24 November", vefatAd: "Khatm for our father", vefatDed: "For the soul of our father", guest: "Khadija", lockDate: "Wednesday, 9 December" },
  de: { hatim: "Chatma zu Ragha'ib", wWeek: "Sa., 28. Nov., 11:00", wDays3: "Di., 24. Nov., 11:00", wFriday: "Fr., 27. Nov., 12:00", wKandil: "Mi., 9. Dez., 20:00",
    webUntil: "9. Dezember", webFriday: "27. November", uDays3: "Dienstag, 24. November", vefatAd: "Chatma für unseren Vater", vefatDed: "Für die Seele unseres Vaters", guest: "Hatice", lockDate: "Mittwoch, 9. Dezember" },
  fr: { hatim: "Khatma de Ragha’ib", wWeek: "sam. 28 nov., 11:00", wDays3: "mar. 24 nov., 11:00", wFriday: "ven. 27 nov., 12:00", wKandil: "mer. 9 déc., 20:00",
    webUntil: "9 décembre", webFriday: "27 novembre", uDays3: "mardi 24 novembre", vefatAd: "Khatma pour notre père", vefatDed: "Pour l’âme de notre père", guest: "Khadija", lockDate: "mercredi 9 décembre" },
  ar: { hatim: "ختمة ليلة الرغائب", wWeek: "السبت 28 نوفمبر، 11:00", wDays3: "الثلاثاء 24 نوفمبر، 11:00", wFriday: "الجمعة 27 نوفمبر، 12:00", wKandil: "الأربعاء 9 ديسمبر، 20:00",
    webUntil: "9 ديسمبر", webFriday: "27 نوفمبر", uDays3: "الثلاثاء، 24 نوفمبر", vefatAd: "ختمة لوالدنا", vefatDed: "لروح والدنا", guest: "خديجة", lockDate: "الأربعاء، 9 ديسمبر" },
};
export const ornek = (K) => OR[K.dil];
export const KOD = "CC93RZUX";
export const LINK = `https://manevihalka.app/join.html?event=${KOD}&w=k3Tq9xVm`;
/** Uygulamadaki tUpper: dile gore buyuk harf (Turkcede i > I degil İ). */
export const buyuk = (K, s) => String(s).toLocaleUpperCase(K.dil);

export const IKON = {
  tkRose: '<path d="M12 21v-7.5"/><path d="M12 13.5c-3.2 0-5.2-2.2-5.2-5.3 1.6 0 3 .5 4 1.4C11.3 7.3 12.6 5.5 15 4.5c.2 1.9-.3 3.4-1.3 4.5 1.2-.4 2.6-.3 3.6.2-.2 2.6-2.3 4.3-5.3 4.3z"/><path d="M12 17.5c-1.4-1.3-3.2-1.8-4.8-1.4"/>',
  tkMark: '<path d="M7.5 4h9v16l-4.5-3.4L7.5 20z"/>',
  tkList: '<path d="M9 7h11M9 12h11M9 17h11"/><circle cx="4.8" cy="7" r="1" fill="currentColor"/><circle cx="4.8" cy="12" r="1" fill="currentColor"/><circle cx="4.8" cy="17" r="1" fill="currentColor"/>',
  tkHeart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10C19.5 15.4 12 20 12 20z"/><circle cx="12" cy="11.6" r="2.2"/>',
  tkDua: '<path d="M11 20.5c-2.6 0-4.5-1.7-4.5-4.4V9.6c0-.9.7-1.6 1.6-1.6S9.7 8.7 9.7 9.6v3.2"/><path d="M11 20.5V8.2c0-1.1-.6-2.3-1.6-3.2"/><path d="M13 20.5c2.6 0 4.5-1.7 4.5-4.4V9.6c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6v3.2"/><path d="M13 20.5V8.2c0-1.1.6-2.3 1.6-3.2"/>',
  tkMore: '<circle cx="5.5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18.5" cy="12" r="1.3" fill="currentColor"/>',
  tkAddC: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/>',
  tkChecks: '<path d="M3 12.5l4 4L15 8.5M10.5 15.5l1 1L20 8"/>',
  tkCheckF: '<circle cx="12" cy="12" r="9" fill="currentColor" stroke="none"/><path d="M8 12.3l2.8 2.8L16.3 9.5" stroke="#fff"/>',
  tkEnter: '<path d="M10 8l4 4-4 4M14 12H4M13 4.5h5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-5"/>',
  tkTrash: '<path d="M5 7h14M10 7V5h4v2M7 7l1 12.5h8L17 7"/>',
  tkNet: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8M12 12v4"/>',
  tkLock: '<rect x="5.5" y="10.5" width="13" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  tkRefresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4.2h-4.2"/>',
  tkCircle: '<circle cx="12" cy="12" r="8.5"/>',
};

// ══ Yapi taslari ══════════════════════════════════════════════════════════════

/**
 * Boncuklu halka (ComposePreview): n boncuk, bastan f tanesi dolu (yesil), ardindan p tanesi altin,
 * gerisi soluk. kur: kurulum onizlemesi (ilk boncuk altin, hepsi dolu). st: ek asamalar [{f, p}];
 * zaman cizelgesinde halkaya "s1", "s2"... sinifi eklenince o asamanin dolulugu gecer.
 */
export function boncuk(K, { n, f = 0, p = 0, kur = false, st = [], big, small, key, bigKey, smallKey }) {
  const R = 42.5, rb = n > 33 ? 2.45 : n > 8 ? 3.05 : 6;
  let c = "";
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    const cls = [];
    if (kur) cls.push(i === 0 ? "p" : "f");
    else if (i < f) cls.push("f");
    else if (i < f + p) cls.push("p");
    st.forEach((s, j) => { if (i < s.f) cls.push("f" + (j + 1)); else if (i < s.f + (s.p || 0)) cls.push("p" + (j + 1)); });
    c += `<circle cx="${(50 + R * Math.cos(a)).toFixed(2)}" cy="${(50 + R * Math.sin(a)).toFixed(2)}" r="${rb}"${cls.length ? ` class="${cls.join(" ")}"` : ""}/>`;
  }
  return `<span class="tk-rg"${K.attr(key)}><svg viewBox="0 0 100 100" aria-hidden="true">${c}</svg><b${K.attr(bigKey)}>${K.e(big)}</b>${small ? `<small${K.attr(smallKey)}>${K.e(small)}</small>` : ""}</span>`;
}

/** Onizleme / halka karti (ComposePreview): ust etiket, (gul) baslik, alt satir, boncuklar, dipte cizgili satir. */
export function kart(K, { cap, title, rose = false, desc, ring, tempo, k = {} }) {
  return `<div class="cx-pv tk-pv"${K.attr(k.pv)}><div class="cx-pt"><small class="cx-cap"${K.attr(k.cap)}>${K.e(cap)}</small>`
    + `<div class="tk-pti">${rose ? K.ic("tkRose") : ""}<b${K.attr(k.title)}>${K.e(title)}</b></div>`
    + `${desc ? `<small class="tk-ds"${K.attr(k.desc)}>${K.e(desc)}</small>` : ""}</div>${ring}`
    + `${tempo ? `<small class="cx-tp"${K.attr(k.tempo)}>${K.e(tempo)}</small>` : ""}</div>`;
}

/** Giris kutusu, metni ayrica anahtarli (["txt", key + "Tx", "..."] ile aninda doldurulur). */
export function kutu(K, { key, ph = "", val = "", cls = "" }) {
  return `<span class="in ${cls}${val ? " has" : ""}"${K.attr(key)}><span class="ph">${K.e(ph)}</span><span class="tx"${K.attr(key + "Tx")}>${K.e(val)}</span><i class="cr"></i></span>`;
}

/** Alt pencere (ComposeSheet): baslik, ipucu, govde, Tamam. */
export function pencere(K, { title, hint, body, okKey }) {
  return `<div class="sheet cx-sheet"><i class="grab"></i><b class="cx-sh">${K.e(title)}</b>${hint ? `<small class="tk-shh">${K.e(hint)}</small>` : ""}${body}${K.bt(K.L("common.ok"), { key: okKey, cls: "blk cx-cta" })}</div>`;
}
const cipler = (K, list) => `<div class="cx-chips">${list.map(([lb, on, key]) => `<span class="cx-chip${on ? " on" : ""}"${K.attr(key)}>${K.e(lb)}</span>`).join("")}</div>`;

/** Ortada onay penceresi (appAlert): ikon, baslik, metin, Iptal + asil dugme. */
export function onay(K, { icon = "tkChecks", title, msg, ok, okKey }) {
  return `<div class="card-c tk-alert"><span class="badge-ic">${K.ic(icon)}</span><b class="t1 c">${K.e(title)}</b><small class="t2 c">${K.e(msg)}</small>
      <div class="row2">${K.bt(K.L("common.cancel"), { cls: "gh" })}${K.bt(ok, { key: okKey })}</div></div>`;
}

/** Ustten kayan kisa bildirim (toast). Gorunmesi icin ["on", key, "show"]. */
export function tost(K, text, { key = "toast", action } = {}) {
  return `<div class="tk-toast"${K.attr(key)}>${K.ic("checkCircle")}<span>${K.e(text)}</span>${action ? `<b>${K.e(action)}</b>` : ""}</div>`;
}

/** Kilit ekrani + bildirim (push). Gorunmesi icin ["on", key, "show"]. */
export function kilit(K, { title, body, key = "push" }) {
  return `<div class="lock"><div class="lk-t"><small>${K.e(ornek(K).lockDate)}</small><b>${K.num("9:41")}</b></div>
      <div class="push"${K.attr(key)}>${K.brand()}<div><div class="ph-h"><b>Manevi Halka</b><small>${K.e(K.X.now)}</small></div><b>${K.e(title)}</b><small>${K.e(body)}</small></div></div></div>`;
}

/** Kur'an okuyucusu (soyut sayfa). float: son sayfada beliren "Okudum" (yalniz sure kaleminde). */
export function okuyucu(K, { sayfa, float = false }) {
  const h = K.V.reader(sayfa);
  return float ? h : h.replace(/<span class="bt pill float"[^>]*>[\s\S]*?<\/span><\/span>/, "");
}

// ══ Halkalar sekmesi ve "Halka Ekle" ══════════════════════════════════════════

export function halkalar(K) {
  return `<div class="pg pt">
      <div class="tk-ttl"><b class="t1">${K.Le("dashboard.myCirclesTitle")}</b>
        <span class="tk-hb">${K.ic("info")}<span class="tk-plus"${K.attr("plus")}>${K.ic("plus")}</span></span></div>
      <div class="cd tk-crow">${K.avatar(K.X.circle)}<div><b>${K.e(K.X.circle)}</b><small>${K.Le("dashboard.memberCount", { count: 5 })}</small></div><span class="tk-mp">${K.ic("people")}<span>5</span></span>${K.ic("tkMore")}</div>
      <div class="tk-ghost">${K.ic("plus")}<span>${K.Le("dashboard.newCircleCard")}</span></div>
    </div>${K.tabbar("circles")}`;
}
export function halkaEkle(K) {
  return `<div class="tk-top"><b>${K.Le("dashboard.addCircle")}</b>
      <div class="tk-opt"><span class="tk-oi">${K.ic("personAdd")}</span><div><b>${K.Le("dashboard.createNew")}</b><small>${K.Le("dashboard.createNewDesc")}</small></div>${K.ic("chev", "fl")}</div>
      <div class="tk-opt"${K.attr("oneTime")}><span class="tk-oi">${K.ic("flag")}</span><div><b>${K.Le("event.createMenuTitle")}</b><small>${K.Le("event.createMenuDesc")}</small></div>${K.ic("chev", "fl")}</div>
      <div class="tk-opt"><span class="tk-oi">${K.ic("tkEnter", "fl")}</span><div><b>${K.Le("dashboard.joinExisting")}</b><small>${K.Le("dashboard.joinExistingDesc")}</small></div>${K.ic("chev", "fl")}</div>
      <i class="grab"></i></div>`;
}

// ══ Kurma: sablon secimi ══════════════════════════════════════════════════════

/** "Birlikte ne okuyalim?": bes sablon (Cevsen karosu uygulamadaki gibi durur). */
export function sablon(K, { scKey = "psc" } = {}) {
  const tiles = K.C.tiles([
    { ic: "quran", b: K.L("eventCompose.tplHatim"), s: K.L("eventCompose.tplHatimSub"), key: "tH" },
    { ic: "tkMark", b: K.L("eventCompose.tplYasin41"), s: K.L("eventCompose.tplYasin41Sub"), key: "tY" },
    { ic: "tkHeart", b: K.L("eventCompose.tplSalavat"), s: K.L("eventCompose.tplSalavatSub"), key: "tS" },
    { ic: "shield", b: K.L("eventCompose.tplCevsen"), s: K.L("eventCompose.tplCevsenSub"), key: "tC" },
    { ic: "tkList", b: K.L("eventCompose.tplCustom"), s: K.L("eventCompose.tplCustomSub"), key: "tL", wide: true },
  ]);
  return `<div class="cx-hd"><span class="cx-hb">${K.ic("x")}</span><div class="cx-ht"><small class="tk-hsub">${K.Le("event.createTitle")}</small></div></div>`
    + K.C.body(`${K.C.ask(K.L("eventCompose.pickTitle"), K.L("eventCompose.pickSub"))}${tiles}<span class="tk-gl">${K.ic("book")}<span>${K.Le("guides.guideLink")}</span></span>`, scKey);
}

// ══ Kurma: tek ekranda ozet ═══════════════════════════════════════════════════

/** Bitis cipinin satirdaki adi. */
function bitisAdi(K, s) {
  return s === "kandil" ? K.L("eventCompose.untilKandil.regaib") : s === "friday" ? K.L("eventCompose.endFriday") : s === "days3" ? K.L("eventCompose.endDays3") : K.L("eventCompose.endWeek");
}
/** Bitis satiri ("Bitis: ..."). */
function bitisSatiri(K, s) {
  const o = ornek(K);
  return K.L("eventCompose.endsAt", { when: s === "kandil" ? o.wKandil : s === "friday" ? o.wFriday : s === "days3" ? o.wDays3 : o.wWeek });
}
/** Tempo cumlesi (lib/eventComposeCore.ts tempoFor, 10 kisi): hatimde gunluk sayfa, 41 Yasin'de toplam kez. */
export function tempo(K, tpl, s) {
  if (tpl === "yasin") return K.L("eventCompose.tempoTotal", { people: 10, amount: K.L("eventCompose.unitTimes", { count: 5 }) });
  const n = s === "kandil" ? 4 : s === "friday" ? 10 : 9;
  return K.L("eventCompose.tempoDaily", { people: 10, amount: K.L("compose.unitPage", { count: n }) });
}
/** Ne okunacak (hedef cumlesi). */
export const hedef = (K, tpl) => (tpl === "yasin" ? K.L("event.goalOneCollective", { name: K.L("event.presetYasin"), n: 41 }) : K.L("compose.unitJuz", { count: 30 }));
/** Onizlemenin alt satiri: [ithaf, hedef, paylasim, bitis] (create-event.tsx previewSub). */
export function altSatir(K, tpl, { ded = "", end }) {
  return [ded || null, hedef(K, tpl), tpl === "yasin" ? null : K.L("event.distPool"), bitisAdi(K, end)].filter(Boolean).join(" · ");
}
/** Onerilen ad (create-event.tsx suggestedTitle). */
export const onerilenAd = (K, tpl) => (tpl === "yasin" ? K.L("eventCompose.tplYasin41") : K.L("event.suggestFullHatim"));

/**
 * Ozet ekrani. c: { tpl: "hatim" | "yasin", ded, end: "week" | "days3" | "friday" | "kandil", name, sc }.
 * Anahtarlar: satirlar rFor/rWhat/rShare/rEnd (+V), onizleme pvT/pvD/pvTp, ad nm (+Tx, hint nmHn), dugme open.
 */
export function ozet(K, c = {}) {
  const tpl = c.tpl || "hatim";
  const end = c.end || (tpl === "yasin" ? "days3" : "week");
  const ded = c.ded || "";
  const name = c.name || onerilenAd(K, tpl);
  const ring = tpl === "yasin"
    ? boncuk(K, { n: 41, kur: true, big: "41", small: K.L("eventCompose.ringCollective") })
    : boncuk(K, { n: 30, kur: true, big: "30", small: K.L("eventCompose.ringJuz", { count: 30 }) });
  const rows = [
    { lbl: K.L("eventCompose.rowFor"), val: ded || K.L("eventCompose.forNone"), key: "rFor", mut: !ded },
    { lbl: K.L("compose.rowWhat"), val: tpl === "yasin" ? hedef(K, tpl) : K.L("eventCompose.whatQuranFull"), key: "rWhat" },
    ...(tpl === "yasin" ? [] : [{ lbl: K.L("eventCompose.rowShare"), val: K.L("event.distPool"), key: "rShare" }]),
    { lbl: K.L("eventCompose.rowEnd"), val: bitisAdi(K, end), key: "rEnd" },
  ];
  const ad = `<div class="cx-fd"><small>${K.Le("eventCompose.nameLabel")}</small>${kutu(K, { key: "nm", val: name })}<small class="cx-hn"${K.attr("nmHn")}>${c.name ? K.Le("eventCompose.nameHintCustom") : K.Le("compose.nameHintAuto")}</small></div>`;
  const body = kart(K, { cap: K.L("eventCompose.thisCircle"), title: name, desc: altSatir(K, tpl, { ded, end }), ring, tempo: tempo(K, tpl, end), k: { title: "pvT", desc: "pvD", tempo: "pvTp" } })
    + K.C.rows(rows) + ad + K.C.more({ title: K.L("compose.more"), sub: `${K.L("compose.rowStart")}: ${K.L("eventCompose.startNow")}` });
  return K.C.hdr({ title: tpl === "yasin" ? K.L("eventCompose.tplYasin41") : K.L("eventCompose.tplHatim"), sub: K.L("event.createTitle") })
    + K.C.body(body, c.sc || "csc") + K.C.foot(K.L("eventCompose.cta"), { key: "open" });
}

/** "Kimin icin?" alt penceresi: uc cip + ithaf kutusu. */
export function kiminPencere(K, { on } = {}) {
  return pencere(K, {
    title: K.L("eventCompose.forTitle"), hint: K.L("eventCompose.forHint"), okKey: "forOk",
    body: cipler(K, [[K.L("eventCompose.intentRuh"), on === "ruh", "iR"], [K.L("eventCompose.intentSifa"), on === "sifa", "iS"], [K.L("eventCompose.intentVesile"), on === "vesile", "iV"]])
      + kutu(K, { key: "ded", ph: K.L("event.dedicationPlaceholder") }),
  });
}
/** Cipe dokununca kutuya gelen cumle (create-event.tsx INTENTS fill). */
export const niyetCumlesi = (K, n) => (n === "ruh" ? K.L("eventCompose.intentRuhFill") : n === "sifa" ? K.L("eventCompose.intentSifaFill") : K.L("eventCompose.intentVesileFill"));

/** "Ne zamana kadar" alt penceresi. on: secili cip. */
export function bitisPencere(K, { tpl = "hatim", on } = {}) {
  const sec = on || (tpl === "yasin" ? "days3" : "week");
  return pencere(K, {
    title: K.L("eventCompose.rowEnd"), okKey: "endOk",
    body: cipler(K, [
      [K.L("eventCompose.endTonight"), false, "eT"], [K.L("eventCompose.endFriday"), sec === "friday", "eF"], [K.L("eventCompose.endDays3"), sec === "days3", "e3"],
      [K.L("eventCompose.endWeek"), sec === "week", "eW"], [K.L("eventCompose.untilKandil.regaib"), sec === "kandil", "eK"], [K.L("eventCompose.endCustom"), false, "eC"],
    ]) + `<b class="cx-line"${K.attr("endLn")}>${K.e(bitisSatiri(K, sec))}</b><small class="cx-tp2"${K.attr("endTp")}>${K.e(tempo(K, tpl, sec))}</small>`,
  });
}
/** Bitis cipi degisince zaman cizelgesi adimlari (pencere + satir + onizleme). */
export function bitisAdimlari(K, tpl, eski, yeni, ded = "") {
  const kod = { week: "eW", days3: "e3", friday: "eF", kandil: "eK" };
  return [["off", kod[eski], "on"], ["on", kod[yeni], "on"], ["txt", "endLn", bitisSatiri(K, yeni)], ["txt", "endTp", tempo(K, tpl, yeni)]];
}
export function bitisSonrasi(K, tpl, yeni, ded = "") {
  return [["txt", "rEndV", bitisAdi(K, yeni)], ["txt", "pvD", altSatir(K, tpl, { ded, end: yeni })], ["txt", "pvTp", tempo(K, tpl, yeni)]];
}

/** "Nasil paylasilsin" alt penceresi (yalniz hatimde): Ortak havuz / Paylari ben dagitayim, web notu secenegin icinde. */
export function paylasPencere(K) {
  const sec = (key, on, b, s, web) => `<div class="tk-op${on ? " on" : ""}"${K.attr(key)}><i></i><div><b>${K.e(b)}</b><small>${K.e(s)}</small><span class="tk-wn">${K.ic("web")}<span>${K.e(web)}</span></span></div></div>`;
  return pencere(K, {
    title: K.L("eventCompose.rowShare"), okKey: "shOk",
    body: sec("opPool", true, K.L("event.distPool"), K.L("event.distPoolDesc"), K.L("event.webNotePool"))
      + sec("opDiv", false, K.L("eventCompose.shareDivide"), K.L("event.distAutoDesc"), K.L("event.webNoteAuto")),
  });
}

// ══ Halkan hazir ve davet ═════════════════════════════════════════════════════

/** "Halkan hazir": tur simgesi, ad, ithaf, hedef · bitis, durum, Davet et, Baglantiyi kopyala, web notu, kod, Halkaya git. */
export function hazir(K, { tpl = "hatim", name, ded, end = "kandil" }) {
  const o = ornek(K);
  const when = end === "kandil" ? o.wKandil : end === "friday" ? o.wFriday : end === "days3" ? o.wDays3 : o.wWeek;
  const goal = tpl === "yasin" ? hedef(K, tpl) : K.L("compose.unitJuz", { count: 30 });
  return `<div class="pg tk-rdy">
      <span class="tk-ri">${K.ic(tpl === "yasin" ? "tkDua" : "quran")}</span>
      <b class="tk-rt">${K.Le("eventCompose.readyTitle")}</b>
      <b class="tk-rn">${K.e(name)}</b>
      ${ded ? `<span class="tk-rd">${K.ic("tkRose")}<span>${K.e(ded)}</span></span>` : ""}
      <small class="tk-rm">${K.e([goal, K.L("eventCompose.endsAt", { when })].join(" · "))}</small>
      <small class="tk-rs">${K.Le("eventCompose.readyStarted")}</small>
      ${K.bt(K.L("eventCompose.invite"), { key: "invite", cls: "blk tk-rb", icon: "shareSocial" })}
      ${K.bt(K.L("eventCompose.copyLink"), { cls: "blk ol tk-rb", icon: "link" })}
      <span class="tk-wn">${K.ic("web")}<span>${K.e(tpl === "yasin" ? K.L("event.webNoteList") : K.L("event.webNotePool"))}</span></span>
      <small class="tk-rc">${K.Le("event.inviteCodeLabel")}: <b>${KOD}</b></small>
      <span class="tk-go"${K.attr("goC")}><span>${K.Le("eventCompose.goToCircle")}</span>${K.ic("chev", "fl")}</span>
    </div>`;
}

/** Paylasim sayfasi, dolu davet mesajiyla (lib/eventInviteCore.ts inviteMessage). */
export function paylasim(K, { ded, name, until, fatiha = false, join }) {
  const lines = [ded || null, [name, until].filter(Boolean).join(" · "), fatiha ? K.L("eventInvite.fatiha") : null, `${join} ${LINK}`].filter(Boolean);
  return `<div class="sheet share tk-share"><div class="sh-msg">${K.brand()}<small>${lines.map((l) => K.e(l)).join("<br>")}</small></div>
      <div class="sh-apps">${K.X.shareApps.map((a, i) => `<span${i === 0 ? K.attr("app0") : ""}><i class="sa sa${i}">${K.ic(["chat", "chat", "mail", "send"][i])}</i><small>${K.e(a)}</small></span>`).join("")}</div>
      <div class="sh-rows"><span>${K.ic("copy")}<small>${K.Le("a11y.copy")}</small></span></div></div>`;
}
/** Davetle acilan halka karti (app/join/[id].tsx). */
export function davetKarti(K, { tpl = "hatim", name, ded, end = "kandil" }) {
  const o = ornek(K);
  const when = end === "kandil" ? o.wKandil : end === "friday" ? o.wFriday : o.wDays3;
  return `<div class="pg tk-jpg"><div class="cd tk-join">${K.ic(tpl === "yasin" ? "tkDua" : "quran")}<small class="cap">${K.e(buyuk(K, K.L("event.createMenuTitle")))}</small>
      <b>${K.e(name)}</b>${ded ? `<small class="mu">${K.e(ded)}</small>` : ""}
      <small class="mu">${K.Le("event.participants", { count: tpl === "yasin" ? 8 : 12 })}</small><small class="mu">${K.Le("event.previewEndsAt", { d: when })}</small>
      ${K.bt(K.L("joinGroup.join"), { key: "joinBtn", cls: "blk lg", icon: "tkAddC" })}<small class="mu c">${K.Le("join.skip")}</small></div></div>`;
}

// ══ Halka ekrani (sekmesiz dort kart) ═════════════════════════════════════════

/** Buyuk ana eylem (BigAction): dolu dugme, istege bagli ikinci satir. */
export const anaDugme = (K, label, { sub, icon, key } = {}) =>
  `<span class="tk-big"${K.attr(key)}><span class="r">${icon ? K.ic(icon) : ""}<b>${K.e(label)}</b></span>${sub ? `<small>${K.e(sub)}</small>` : ""}</span>`;
/** "Bitise 18 g 10 sa" (event/[id].tsx formatRemaining). */
export const kalan = (K, g, s, d) => K.L("event.endsIn", { d: g ? `${K.L("event.daysShort", { n: g })} ${s}${K.L("event.unitHour")}` : `${s}${K.L("event.unitHour")} ${d}${K.L("event.unitMin")}` });

/** Davet karti (EventInviteCard): yuz seridi + kac kisi, Davet et, Baglantiyi kopyala, web notu, kod. compact: tamamlandi. */
export function davetKart(K, { count, guests = 0, hint, compact = false, key }) {
  const yuz = K.X.names.slice(0, 4).map((n) => `<i>${K.e(Array.from(n)[0])}</i>`).join("") + (count > 4 ? `<i class="m">+${count - 4}</i>` : "");
  const ozetMetin = [compact ? K.L("eventScreen.togetherCount", { count }) : K.L("eventScreen.joined", { count }), guests ? K.L("eventScreen.joinedGuests", { count: guests }) : null].filter(Boolean).join(" · ");
  return `<div class="cd tk-inv"${K.attr(key)}><div class="tk-ppl"><span class="tk-fc">${yuz}</span><b>${K.e(ozetMetin)}</b>${K.ic("chev", "fl")}</div>`
    + (compact ? "" : `<div class="tk-ib">${K.bt(K.L("eventCompose.invite"), { key: "invBtn", cls: "sm", icon: "shareSocial" })}${K.bt(K.L("eventCompose.copyLink"), { cls: "sm ol", icon: "link" })}</div>
      <span class="tk-wn">${K.ic("web")}<span>${K.e(hint)}</span></span><span class="tk-code"><small>${K.Le("event.inviteCodeLabel")}</small><b>${KOD}</b>${K.ic("copy")}</span>`)
    + `</div>`;
}

/** Ortak havuzlu hatmin "Halkanin durumu" karti: cubuk, sayilar, cuz izgarasi. cuz: [[n, bos, dolu?]]. */
export function durumKart(K, { read, reading, cuz }) {
  const left = 604 - read - reading;
  const w = (n) => `${((n / 604) * 100).toFixed(1)}%`;
  return `<div class="cd tk-stat"><b class="tk-sh">${K.Le("eventScreen.statusTitle")}</b>
      <span class="tk-bar"><i class="d" style="width:${w(read)}"></i><i class="h" style="width:${w(reading)}"></i></span>
      <div class="tk-leg"><span class="d">${K.Le("event.statPagesRead", { n: read })}</span><span class="mu">·</span><span class="h">${K.Le("event.statPagesReading", { n: reading })}</span><span class="mu">·</span><span class="f">${K.Le("event.statPagesLeft", { n: left })}</span></div>
      <div class="tk-cg">${cuz.map(([n, bos]) => `<span class="tk-cz${bos === 0 ? " full" : ""}"${K.attr("c" + n)}><b>${K.Le("event.cuzShort", { n })}</b><small>${bos === 0 ? K.Le("event.cuzFull") : K.Le("event.cuzFree", { n: bos })}</small><i><i style="width:${Math.round(((20 - bos) / 20) * 100)}%"></i></i></span>`).join("")}</div></div>`;
}

/**
 * Halka ekrani. o: { done (tamamlandi), ded, title, sub, ring (boncuk html), footer, mine (html), stat (html), inv (html), sc, toast (html), keys }.
 * Baslik: geri, (kart kayinca beliren) ad, uc nokta. Ad basta gorunmez.
 */
export function halka(K, o) {
  const cap = buyuk(K, o.done ? K.L("event.statusCompleted") : K.L("event.statusActive"));
  const hero = kart(K, { cap, title: o.ded || o.title, rose: !!o.ded, desc: o.ded ? o.title : o.sub, ring: o.ring, tempo: o.footer, k: { tempo: o.ftKey || "ft" } });
  return `<div class="hd tk-ehd"><span class="hb">${K.ic("back", "fl")}</span><div class="ht"></div><span class="hr"><span class="hi"${K.attr("dots")}>${K.ic("tkMore")}</span></span></div>`
    + `<div class="cx-clip"><div class="cx-in sc tk-ein"${K.attr(o.sc || "esc")}>${hero}<div class="cd tk-mine">${o.mine}</div>${o.stat || ""}${o.inv || ""}</div></div>${o.toast || ""}`;
}

/** Uc nokta menusu (GroupActionsSheet), kurucu, ortak havuzlu aktif halka. */
export function menu(K) {
  const r = (ic, lb, key, red) => `<div class="tk-mi${red ? " red" : ""}"${K.attr(key)}>${K.ic(ic)}<span>${K.e(lb)}</span></div>`;
  return `<div class="sheet tk-menu"><i class="grab"></i>${r("people", K.L("event.participantsTitle"))}${r("edit", K.L("event.editTitle"))}${r("tkNet", K.L("event.releasePool"))}`
    + `${r("tkAddC", K.L("event.addSeriesTitle"))}${r("clock", K.L("event.extend24h"), "ext")}${r("tkTrash", K.L("event.deleteEvent"), "", true)}</div>`;
}

/** Cuz kutusuna ya da "Cuz al"a dokununca: Tum cuzu al (asil) ya da sayfa araligi. */
export function cuzPencere(K, { n, a, b }) {
  return `<div class="card-c tk-claim"><b class="t1 c">${K.Le("event.cuzShort", { n })}</b>
      ${K.bt(K.L("event.takeWholeCuz"), { key: "whole", cls: "blk" })}
      <small class="mu c">${K.Le("event.orPageRange")}</small>
      <small class="mu c">${K.e(K.L("common.labelValue", { label: K.L("event.available"), value: "§" })).replace("§", K.num(`${a}–${b}`))}</small>
      <div class="tk-rgi">${kutu(K, { key: "ra", ph: K.L("event.startLabel"), val: String(a), cls: "c" })}<span>–</span>${kutu(K, { key: "rb", ph: K.L("event.endLabel"), val: String(b), cls: "c" })}</div>
      <div class="row2">${K.bt(K.L("common.cancel"), { cls: "gh" })}${K.bt(K.L("event.claimRange"), { cls: "ol" })}</div></div>`;
}

/** Netice ekrani (EventResultScreen), tamamlanmis halka. */
export function netice(K, { hatim = true, title, ded, stats, mine, item }) {
  return `<div class="hd"><span class="hb">${K.ic("back", "fl")}</span><div class="ht"><b>${K.e(JT(K, "title"))}</b></div><span></span></div>
    <div class="cx-clip"><div class="cx-in sc tk-res"${K.attr("rsc")}>
      <div class="tk-rhead"><span class="tk-rok">${K.ic("check")}</span><b>${K.e(hatim ? JT(K, "hatimCompleted") : JT(K, "completed"))}</b><small>${K.e(JT(K, "accepted"))}</small></div>
      <b class="tk-rtt">${K.e(title)}</b>${ded ? `<small class="tk-rdd">${K.e(ded)}</small>` : ""}
      <b class="tk-rsh">${K.e(JT(K, "oursTitle"))}</b>
      <div class="tk-rst">${stats.map(([v, l]) => `<span><b>${K.e(v)}</b><small>${K.e(l)}</small></span>`).join("")}</div>
      <div class="cd tk-rmy"><small>${K.e(JT(K, "myPart"))}</small><b>${K.e(mine)}</b></div>
      ${item ? `<div class="tk-rit"><b>${K.e(JT(K, "itemsSurah"))}</b><div><span>${K.e(item[0])}</span><small>${K.e(item[1])}</small></div></div>` : ""}
      <span class="tk-again"${K.attr("again")}>${K.ic("tkRefresh")}<span>${K.e(JT(K, "again"))}</span></span>
    </div></div>`;
}

// ══ Web sayfasi (halka.html), tarayicida ══════════════════════════════════════

export function webKabuk(K, govde, key) {
  return `<div class="tk-wv"><span class="tk-url">${K.ic("tkLock")}<bdi dir="ltr">manevihalka.app</bdi></span>
      <div class="tk-wclip"><div class="tk-wb sc"${K.attr(key)}>${govde}</div></div></div>`;
}
/** Sayfanin ustu: marka, niyet (ithaf), ad, bitis. eb: halka turune gore niyet etiketi anahtari. */
export function webUst(K, { ded, title, eb = "heroEyebrow", until }) {
  return `<span class="tk-wbr">${K.brand()}<span>Manevi Halka</span></span>
      <div class="tk-wh"><small class="ey">${K.e(W(K, eb))}</small><b>${K.e(ded)}</b><i class="ru"></i><small>${K.e(title)}</small><small class="dt">${K.e(W(K, "until", { d: until || ornek(K).webUntil }))}</small></div>`;
}
/** Ortak havuzlu hatim: ilerleme, siradaki bolum, cuz hucreleri. */
export function webPano(K, { ded, title }) {
  const hucre = (n) => `<span class="tk-wcell"><b>${n}</b><small class="u">${K.e(W(K, "cuzWord"))}</small><small>${K.e(W(K, "freeIn", { p: 20 }))}</small></span>`;
  return webKabuk(K, `${webUst(K, { ded, title })}
      <div class="tk-wp"><small class="hd2">${K.e(W(K, "ongoing"))}</small><span class="tk-wbar"><i class="d" style="width:16.6%"></i><i class="h" style="width:23.2%"></i></span>
        <div class="tk-wlg"><span><i class="d"></i>100 ${K.e(W(K, "lgDone"))}</span><span><i class="h"></i>140 ${K.e(W(K, "lgHeld"))}</span><span><i></i>364 ${K.e(W(K, "lgFree"))}</span></div></div>
      <div class="tk-wsg"><small class="hd2">${K.e(W(K, "nextLbl"))}</small><b class="cz">${K.e(W(K, "cuzN", { n: 13 }))}</b><small>${K.e(W(K, "freeIn", { p: 20 }))}</small>
        <span class="tk-wbtn"${K.attr("take")}>${K.e(W(K, "takeThis"))}</span></div>
      <div class="tk-wtabs"><span class="on">${K.e(W(K, "avail"))}</span><span>${K.e(W(K, "all"))}</span></div>
      <div class="tk-wg">${[13, 14, 15, 16].map(hucre).join("")}</div>`, "wbsc");
}
export function webOnay(K) {
  return webKabuk(K, `<div class="tk-wblk"><b class="pg2">${K.e(W(K, "pagesRange", { a: 242, b: 261 }))}</b><small>${K.e(W(K, "pageCount", { p: 20 }))}</small></div>
      <small class="tk-wmsg">${K.e(W(K, "amountLbl"))}</small>
      <div class="tk-wamt">${[5, 10, 15, 20].map((n) => `<span class="${n === 20 ? "on" : ""}">${n}</span>`).join("")}</div>
      <small class="tk-wmsg">${K.e(W(K, "confirmQ"))}</small>
      <span class="tk-wbtn"${K.attr("wConfirm")}>${K.e(W(K, "confirm"))}</span><span class="tk-wbtn gh">${K.e(W(K, "cancel"))}</span>`, "wcsc");
}
export function webTamam(K) {
  return webKabuk(K, `<b class="tk-wok">${K.e(W(K, "entrusted", { a: 242, b: 261 }))}</b><small class="tk-wmsg">${K.e(W(K, "mayAccept"))}</small>
      <span class="tk-wbtn"${K.attr("readNow")}>${K.ic("book")}${K.e(WR(K, "readNow"))}</span>
      <div class="tk-wrec"><small>${K.e(W(K, "keepLink"))}</small><span class="tk-wbtn gh sm">${K.e(W(K, "copy"))}</span></div>`, "wdsc");
}

// ══ Ornek ekranlar (tek rehberi) ══════════════════════════════════════════════

const vesileDed = (K) => niyetCumlesi(K, "vesile");
/** Ortak havuzlu hatmin halka ekrani, uye ya da kurucu. s: "take" | "cont" | "after" | "done". */
function hatimHalka(K, s, { sc } = {}) {
  const o = ornek(K);
  const tp = (n) => K.L("eventScreen.tempoLeftDaily", { amount: K.L("compose.unitPage", { count: n }) });
  const done = s === "done";
  const f = s === "after" ? 5 : 4, p = s === "cont" ? 8 : 7;
  const ring = done ? boncuk(K, { n: 30, f: 30, big: "30", small: `/ 30 ${K.L("eventCompose.ringJuz", { count: 30 })}` })
    : boncuk(K, { n: 30, f, p, big: String(f), small: `/ 30 ${K.L("eventCompose.ringJuz", { count: 30 })}` });
  const footer = done ? JT(K, "accepted") : `${kalan(K, 18, 10)} · ${tp(3)}`;
  let mine;
  if (s === "take" || s === "after") {
    const nx = s === "after" ? 13 : 12;
    mine = anaDugme(K, K.L("eventScreen.takeJuz"), { sub: K.L("eventScreen.nextFreeJuz", { n: nx }), icon: "tkAddC", key: "take" }) + `<small class="tk-note">${K.Le("eventScreen.orPick")}</small>`;
  } else if (s === "cont") {
    mine = `<small class="tk-lead">${K.Le("event.cuzShort", { n: 12 })} · ${K.Le("event.pageRange", { a: 222, b: 241 })}</small>`
      + anaDugme(K, K.L("eventScreen.continue"), { icon: "book", key: "cont" })
      + K.bt(K.L("hatim.markRead"), { key: "markR", cls: "blk ol tk-sec", icon: "tkChecks" })
      + `<span class="tk-link">${K.ic("plus")}<span>${K.Le("eventScreen.oneMoreJuz")}</span></span>`;
  } else {
    mine = anaDugme(K, JT(K, "result"), { key: "res" }) + `<small class="tk-note">${K.Le("eventScreen.contribPages", { count: 20 })}</small>`;
  }
  const cuz = s === "after" ? [[13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [18, 20]] : s === "cont" ? [[13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [18, 20]] : [[12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20]];
  const read = s === "after" ? 100 : 80, reading = s === "cont" ? 160 : 140;
  return halka(K, {
    done, ded: vesileDed(K), title: o.hatim, ring, footer, mine, sc,
    stat: done ? "" : durumKart(K, { read, reading, cuz }),
    inv: davetKart(K, { count: done ? 14 : 12, guests: 3, hint: K.L("event.webNotePool"), compact: done }),
    toast: s === "after" ? tost(K, K.L("taskDone.viaHelpSub", { what: K.L("event.pageRange", { a: 222, b: 241 }) })) : "",
  });
}

/** Kurulumun tek akisi (film ve kart sahnelerinde ortak parca). */
function kurAkisi(K, { kandil = true } = {}) {
  const o = ornek(K), ded = vesileDed(K);
  return [
    ["tap", "tH"], ["on", "tH", "on"], ["go", "c"], ["w", 900],
    ["tap", "rFor"], ["ov", "f"], ["w", 400], ["tap", "iV"], ["on", "iV", "on"], ["txt", "dedTx", ded], ["on", "ded", "has"], ["w", 700], ["tap", "forOk"], ["cl", "f"],
    ["txt", "rForV", ded], ["off", "rForV", "mu"], ["txt", "pvD", altSatir(K, "hatim", { ded, end: "week" })], ["w", 600],
    ...(kandil ? [["tap", "rEnd"], ["ov", "e"], ["w", 400], ["tap", "eK"], ...bitisAdimlari(K, "hatim", "week", "kandil"), ["w", 900], ["tap", "endOk"], ["cl", "e"], ...bitisSonrasi(K, "hatim", "kandil", ded), ["w", 700]] : []),
    ["y", "csc", 11], ["w", 500], ["tap", "nm"], ["txt", "nmTx", ""], ["type", "nm", o.hatim], ["txt", "pvT", o.hatim], ["txt", "nmHn", K.L("eventCompose.nameHintCustom")], ["w", 400],
    ["tap", "open"], ["go", "r"], ["w", 1200],
  ];
}

/**
 * K.telefon sarmalayicisi: sahne.mjs zaman cizelgesini tek tirnakli data-tl niteligine yaziyor ve tek
 * tirnagi kacirmiyor; "Regaib Kandili'ne kadar" gibi metinler niteligi bozuyordu. Cizelgedeki duz
 * kesme isareti tipografik kesmeye (’) cevrilir (Fransizcada uretici zaten ceviriyor).
 */
export const tel = (K, o) => K.telefon({ ...o, tl: (o.tl || []).map((s) => s.map((x) => (typeof x === "string" ? x.replace(/'/g, "\u2019") : x))) });

export const SAHNE = {
  /** Halkalar › + › Halka Ekle › Tek Seferlik Halka › sablon ekrani. */
  "tek-ac": (K) => tel(K, {
    aria: `${K.L("tabs.circles")} › + › ${K.L("dashboard.addCircle")} › ${K.L("event.createMenuTitle")} › ${K.L("eventCompose.pickTitle")}`,
    views: [["l", halkalar(K)], ["p", sablon(K), "up"]],
    overlays: [["a", halkaEkle(K), "top"]],
    tl: [["w", 800], ["tap", "plus"], ["ov", "a"], ["w", 1200], ["tap", "oneTime"], ["cl", "a"], ["go", "p"], ["w", 2200]],
    still: 3, hint: "oneTime",
  }),

  /** Birlikte ne okuyalim? › Hatim › tek ekranda ozet (kaydirinca ad ve Diger ayarlar). */
  "tek-sablon": (K) => tel(K, {
    aria: `${K.L("eventCompose.pickTitle")} › ${K.L("eventCompose.tplHatim")} › ${K.L("eventCompose.thisCircle")}`,
    views: [["p", sablon(K)], ["c", ozet(K, { tpl: "hatim" }), "push"]],
    tl: [["w", 1200], ["tap", "tH"], ["on", "tH", "on"], ["go", "c"], ["w", 1800], ["y", "csc", 10], ["w", 1600], ["y", "csc", 0], ["w", 900]],
    still: 1, hint: "tH",
  }),

  /** Kimin icin › "Bir vesileyle" cipi › kutu dolar › Tamam › satir ve onizleme. */
  "tek-kimin": (K) => {
    const ded = vesileDed(K);
    return tel(K, {
      aria: `${K.L("eventCompose.rowFor")} › ${K.L("eventCompose.intentVesile")} › ${ded}`,
      views: [["c", ozet(K, { tpl: "hatim" })]],
      overlays: [["f", kiminPencere(K), "sheet"]],
      tl: [["w", 900], ["tap", "rFor"], ["ov", "f"], ["w", 700], ["tap", "iV"], ["on", "iV", "on"], ["txt", "dedTx", ded], ["on", "ded", "has"], ["w", 1300],
        ["tap", "forOk"], ["cl", "f"], ["txt", "rForV", ded], ["off", "rForV", "mu"], ["txt", "pvD", altSatir(K, "hatim", { ded, end: "week" })], ["w", 2200]],
      still: 8, hint: "iV",
    });
  },

  /** Ne zamana kadar › siradaki kandile kadar › bitis satiri ve tempo degisir › Tamam. */
  "tek-bitis": (K) => {
    const ded = vesileDed(K);
    return tel(K, {
      aria: `${K.L("eventCompose.rowEnd")} › ${K.L("eventCompose.untilKandil.regaib")} › ${ornek(K).wKandil}`,
      views: [["c", ozet(K, { tpl: "hatim", ded })]],
      overlays: [["e", bitisPencere(K, { tpl: "hatim" }), "sheet"]],
      tl: [["w", 900], ["tap", "rEnd"], ["ov", "e"], ["w", 900], ["tap", "eK"], ...bitisAdimlari(K, "hatim", "week", "kandil"), ["w", 1600],
        ["tap", "endOk"], ["cl", "e"], ...bitisSonrasi(K, "hatim", "kandil", ded), ["w", 2200]],
      still: 9, hint: "eK",
    });
  },

  /** Nasil paylasilsin: Ortak havuz (varsayilan) ya da Paylari ben dagitayim; web notu secenegin icinde. */
  "tek-paylas": (K) => tel(K, {
    aria: `${K.L("eventCompose.rowShare")} › ${K.L("event.distPool")} · ${K.L("eventCompose.shareDivide")}`,
    views: [["c", ozet(K, { tpl: "hatim", ded: vesileDed(K) })]],
    overlays: [["s", paylasPencere(K), "sheet"]],
    tl: [["w", 900], ["tap", "rShare"], ["ov", "s"], ["w", 2800], ["tap", "shOk"], ["cl", "s"], ["w", 1200]],
    still: 3, hint: "opPool",
  }),

  /** Halkanin adi yazilir › Halkayi ac › Halkan hazir. */
  "tek-ac-dugme": (K) => {
    const o = ornek(K), ded = vesileDed(K);
    return tel(K, {
      aria: `${K.L("eventCompose.nameLabel")} › ${K.L("eventCompose.cta")} › ${K.L("eventCompose.readyTitle")}`,
      views: [["c", ozet(K, { tpl: "hatim", ded, end: "kandil" })], ["r", hazir(K, { tpl: "hatim", name: o.hatim, ded, end: "kandil" }), "fade"]],
      tl: [["w", 800], ["y", "csc", 11], ["w", 700], ["tap", "nm"], ["txt", "nmTx", ""], ["type", "nm", o.hatim], ["txt", "pvT", o.hatim], ["txt", "nmHn", K.L("eventCompose.nameHintCustom")],
        ["w", 700], ["tap", "open"], ["go", "r"], ["w", 2600]],
      still: 7, hint: "open",
    });
  },

  /** Halkan hazir › Davet et › paylasim sayfasi, dolu davet mesaji. */
  "tek-hazir": (K) => {
    const o = ornek(K), ded = vesileDed(K);
    return tel(K, {
      aria: `${K.L("eventCompose.readyTitle")} › ${K.L("eventCompose.invite")} › ${K.L("a11y.share")}`,
      views: [["r", hazir(K, { tpl: "hatim", name: o.hatim, ded, end: "kandil" })]],
      overlays: [["sh", paylasim(K, { ded, name: o.hatim, until: K.L("eventCompose.untilKandil.regaib"), join: K.L("eventInvite.join.quran") }), "sheet"]],
      tl: [["w", 1200], ["tap", "invite"], ["ov", "sh"], ["w", 2400], ["tap", "app0"], ["w", 700], ["cl", "sh"], ["w", 900]],
      still: 0, hint: "invite",
    });
  },

  /** Davet karti › Katil › Adin ne? › halka ekrani (Cuz al). */
  "tek-katil": (K) => {
    const o = ornek(K), ded = vesileDed(K);
    return tel(K, {
      aria: `${K.L("joinGroup.join")} › ${K.L("nameSheet.title")} › ${K.L("eventScreen.takeJuz")}`,
      views: [["j", davetKarti(K, { name: o.hatim, ded })], ["h", hatimHalka(K, "take"), "push"]],
      overlays: [["n", K.O.nameSheet(), "pop"]],
      tl: [["w", 1000], ["tap", "joinBtn"], ["ov", "n"], ["w", 400], ["tap", "name"], ["type", "name", K.X.member], ["on", "nameOk", "en"], ["w", 300], ["tap", "nameOk"], ["cl", "n"], ["go", "h"], ["w", 2600]],
      still: 0, hint: "joinBtn",
    });
  },

  /** Cuz al › Cuz 12 › Tum cuzu al › "Senin payin" kartinda Cuz 12. */
  "tek-cuz": (K) => tel(K, {
    aria: `${K.L("eventScreen.takeJuz")} › ${K.L("event.cuzShort", { n: 12 })} › ${K.L("event.takeWholeCuz")} › ${K.L("eventScreen.continue")}`,
    views: [["h", hatimHalka(K, "take", { sc: "esc1" })], ["h2", hatimHalka(K, "cont", { sc: "esc2" }), "fade"]],
    overlays: [["m", cuzPencere(K, { n: 12, a: 222, b: 241 }), "pop"]],
    tl: [["w", 1200], ["tap", "take"], ["ov", "m"], ["w", 1500], ["tap", "whole"], ["cl", "m"], ["go", "h2"], ["w", 1400], ["y", "esc2", 7], ["w", 1700], ["y", "esc2", 0], ["w", 600]],
    still: 0, hint: "take",
  }),

  /** Okumaya devam et › okuyucu › geri › Okudum › Okundu olarak isaretle › boncuk dolar. */
  "tek-oku": (K) => tel(K, {
    aria: `${K.L("eventScreen.continue")} › ${K.L("quran.title")} › ${K.L("hatim.markRead")} › ${K.L("event.completeConfirmTitle")}`,
    views: [["h", hatimHalka(K, "cont", { sc: "esc1" })], ["rd", okuyucu(K, { sayfa: "٢٢٢" }), "push"], ["h2", hatimHalka(K, "cont", { sc: "esc2" }), "back"], ["h3", hatimHalka(K, "after", { sc: "esc3" }), "fade"]],
    overlays: [["cc", onay(K, { title: K.L("event.completeConfirmTitle"), msg: K.L("event.completeConfirmMsg", { label: K.L("event.pageRange", { a: 222, b: 241 }) }), ok: K.L("event.completeConfirmTitle"), okKey: "ccOk" }), "pop"]],
    tl: [["w", 1000], ["tap", "cont"], ["go", "rd"], ["w", 600], ["st", "rprog", "width", "35%"], ["txt", "pgn", "٢٢٨"], ["w", 650], ["st", "rprog", "width", "70%"], ["txt", "pgn", "٢٣٥"], ["w", 650],
      ["st", "rprog", "width", "100%"], ["txt", "pgn", "٢٤١"], ["w", 800], ["go", "h2"], ["w", 700], ["tap", "markR"], ["ov", "cc"], ["w", 1200], ["tap", "ccOk"], ["cl", "cc"], ["go", "h3"], ["w", 200], ["on", "toast", "show"], ["w", 2600]],
    still: 0, hint: "cont",
  }),

  /** Uygulamasi olmayan: tarayicida halka sayfasi › Bunu al › onay › emanet › Simdi oku. */
  "tek-web": (K) => {
    const o = ornek(K);
    return tel(K, {
      aria: `manevihalka.app › ${W(K, "takeThis")} › ${W(K, "confirm")} › ${WR(K, "readNow")}`,
      views: [["b", webPano(K, { ded: vesileDed(K), title: o.hatim })], ["c", webOnay(K), "push"], ["d", webTamam(K), "push"]],
      tl: [["w", 2000], ["tap", "take"], ["go", "c"], ["w", 1300], ["tap", "wConfirm"], ["go", "d"], ["w", 1500], ["tap", "readNow"], ["w", 1800]],
      still: 0, hint: "take",
    });
  },

  /** Kurucu: uc nokta › Sureyi 24 saat uzat › kartta bitise kalan sure 24 saat artar. */
  "tek-uzat": (K) => {
    const o = ornek(K);
    const tp = (n) => K.L("eventScreen.tempoLeft", { amount: K.L("compose.unitPage", { count: n }) });
    const h = halka(K, {
      ded: vesileDed(K), title: o.hatim, ring: boncuk(K, { n: 30, f: 26, p: 3, big: "26", small: `/ 30 ${K.L("eventCompose.ringJuz", { count: 30 })}` }),
      footer: `${kalan(K, 0, 6, 40)} · ${tp(5)}`, ftKey: "ft",
      mine: anaDugme(K, K.L("eventScreen.takeJuz"), { sub: K.L("eventScreen.nextFreeJuz", { n: 29 }), icon: "tkAddC" }) + `<small class="tk-note">${K.Le("eventScreen.orPick")}</small>`,
      stat: durumKart(K, { read: 520, reading: 60, cuz: [[29, 20], [30, 4], [1, 0], [2, 0], [3, 0], [4, 0]] }),
      inv: davetKart(K, { count: 14, guests: 3, hint: K.L("event.webNotePool") }),
    });
    return tel(K, {
      aria: `${K.L("group.moreActions")} › ${K.L("event.extend24h")}`,
      views: [["h", h]], overlays: [["mn", menu(K), "sheet"]],
      tl: [["w", 1100], ["tap", "dots"], ["ov", "mn"], ["w", 1300], ["tap", "ext"], ["cl", "mn"], ["w", 300], ["txt", "ft", `${kalan(K, 1, 6)} · ${tp(5)}`], ["on", "ft", "tk-flash"], ["w", 2400]],
      still: 3, hint: "ext",
    });
  },

  /** Tamamlandi: bildirim › halka ekrani (Tamamlandi, Allah kabul etsin) › Neticeyi gor › Ayni halkayi yeniden kur › ozet. */
  "tek-tamam": (K) => {
    const o = ornek(K), ded = vesileDed(K), pm = pushMetni(K, o.hatim);
    return tel(K, {
      aria: `${pm.title} › ${JT(K, "result")} › ${JT(K, "again")}`,
      views: [["lk", kilit(K, pm)], ["h", hatimHalka(K, "done"), "fade"],
        ["n", netice(K, { hatim: true, title: o.hatim, ded, stats: [[JT(K, "juz", { n: 30 }), JT(K, "done")], [JT(K, "people", { n: 14 }), JT(K, "participantsLabel")]], mine: JT(K, "pages", { n: 20 }) }), "push"],
        ["c", ozet(K, { tpl: "hatim", ded, name: o.hatim }), "up"]],
      tl: [["w", 600], ["on", "push", "show"], ["w", 1700], ["tap", "push"], ["go", "h"], ["w", 1600], ["tap", "res"], ["go", "n"], ["w", 1300], ["y", "rsc", 6], ["w", 900], ["tap", "again"], ["go", "c"], ["w", 2200]],
      still: 6, hint: "res",
    });
  },

  /** Vefat eden bir yakin icin: "Bir yakinimizin ruhuna" cipiyle kurulan halkanin davet mesajinda Fatiha satiri. */
  "tek-ruh": (K) => {
    const o = ornek(K);
    return tel(K, {
      aria: `${K.L("eventCompose.intentRuh")} › ${K.L("eventCompose.invite")} › ${K.L("eventInvite.fatiha")}`,
      views: [["r", hazir(K, { tpl: "hatim", name: o.vefatAd, ded: o.vefatDed, end: "friday" })]],
      overlays: [["sh", paylasim(K, { ded: o.vefatDed, name: o.vefatAd, until: K.L("eventCompose.endFriday"), fatiha: true, join: K.L("eventInvite.join.quran") }), "sheet"]],
      tl: [["w", 1200], ["tap", "invite"], ["ov", "sh"], ["w", 3200], ["cl", "sh"], ["w", 800]],
      still: 3, hint: "invite",
    });
  },

  /** Giris filmi: Halkalar'dan "Halkan hazir"a ve davete kadar tek akis. */
  "film-tek": (K) => {
    const o = ornek(K), ded = vesileDed(K);
    return tel(K, {
      size: "lg",
      aria: `${K.L("event.createMenuTitle")} › ${K.L("eventCompose.tplHatim")} › ${K.L("eventCompose.rowFor")} › ${K.L("eventCompose.rowEnd")} › ${K.L("eventCompose.cta")} › ${K.L("eventCompose.readyTitle")} › ${K.L("eventCompose.invite")}`,
      views: [["l", halkalar(K)], ["p", sablon(K), "up"], ["c", ozet(K, { tpl: "hatim" }), "push"], ["r", hazir(K, { tpl: "hatim", name: o.hatim, ded, end: "kandil" }), "fade"]],
      overlays: [["a", halkaEkle(K), "top"], ["f", kiminPencere(K), "sheet"], ["e", bitisPencere(K, { tpl: "hatim" }), "sheet"],
        ["sh", paylasim(K, { ded, name: o.hatim, until: K.L("eventCompose.untilKandil.regaib"), join: K.L("eventInvite.join.quran") }), "sheet"]],
      tl: [["w", 900], ["tap", "plus"], ["ov", "a"], ["w", 700], ["tap", "oneTime"], ["cl", "a"], ["go", "p"], ["w", 900],
        ...kurAkisi(K), ["tap", "invite"], ["ov", "sh"], ["w", 1500], ["tap", "app0"], ["w", 1600]],
      still: 0, hint: "plus",
    });
  },

  /** Merkez karti: sablonlar › Hatim › ozet › Halkayi ac › Halkan hazir (kisa dongu, iri ogeler). */
  "tek-kart": (K) => {
    const o = ornek(K), ded = vesileDed(K);
    return tel(K, {
      aria: `${K.L("eventCompose.pickTitle")} › ${K.L("eventCompose.tplHatim")} › ${K.L("eventCompose.cta")} › ${K.L("eventCompose.readyTitle")}`,
      views: [["p", sablon(K)], ["c", ozet(K, { tpl: "hatim", ded, end: "kandil", name: o.hatim }), "push"], ["r", hazir(K, { tpl: "hatim", name: o.hatim, ded, end: "kandil" }), "fade"]],
      tl: [["w", 1100], ["tap", "tH"], ["on", "tH", "on"], ["go", "c"], ["w", 2000], ["tap", "open"], ["go", "r"], ["w", 2600]],
      still: 4, hint: "open",
    });
  },
};

export const CSS = `
.mp-s .tk-hsub { display: block; font-size: .78em; color: var(--a-ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mp-s .tk-gl { display: flex; align-items: center; justify-content: center; gap: .35em; margin-top: .5em; color: var(--a-pri); font-size: .76em; font-weight: 600; }
.mp-s .tk-gl .ic { width: 1.1em; height: 1.1em; }
.mp-s .cx-tile b, .mp-s .cx-tile small { overflow-wrap: anywhere; }
.mp-s .tk-pv .cx-pt b { overflow-wrap: anywhere; }
.mp-s .tk-pti { display: flex; align-items: flex-start; gap: .3em; margin-top: .1em; }
.mp-s .tk-pti .ic { width: 1.05em; height: 1.05em; color: var(--a-gold); margin-top: .12em; }
.mp-s .tk-pti b { font-size: 1.12em; line-height: 1.2; min-width: 0; }
.mp-s .tk-ds { display: block; color: var(--a-ink); font-size: .72em; line-height: 1.35; margin-top: .3em; }
.mp-s .tk-rg { position: relative; width: 5.2em; height: 5.2em; display: grid; place-content: center; text-align: center; flex: none; align-self: center; }
.mp-s .tk-rg svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.mp-s .tk-rg circle { fill: color-mix(in srgb, var(--a-pri) 22%, transparent); transition: fill .45s ease; }
.mp-s .tk-rg .f { fill: var(--a-pri); } .mp-s .tk-rg .p { fill: var(--a-gold); }
.mp-s .tk-rg.s1 circle { fill: color-mix(in srgb, var(--a-pri) 22%, transparent); } .mp-s .tk-rg.s1 .f1 { fill: var(--a-pri); } .mp-s .tk-rg.s1 .p1 { fill: var(--a-gold); }
.mp-s .tk-rg.s2 circle { fill: color-mix(in srgb, var(--a-pri) 22%, transparent); } .mp-s .tk-rg.s2 .f2 { fill: var(--a-pri); } .mp-s .tk-rg.s2 .p2 { fill: var(--a-gold); }
.mp-s .tk-rg.s3 circle { fill: color-mix(in srgb, var(--a-pri) 22%, transparent); } .mp-s .tk-rg.s3 .f3 { fill: var(--a-pri); } .mp-s .tk-rg.s3 .p3 { fill: var(--a-gold); }
.mp-s .tk-rg.s4 circle { fill: color-mix(in srgb, var(--a-pri) 22%, transparent); } .mp-s .tk-rg.s4 .f4 { fill: var(--a-pri); } .mp-s .tk-rg.s4 .p4 { fill: var(--a-gold); }
.mp-s .tk-rg b { position: relative; font-size: 1.3em; line-height: 1; }
.mp-s .tk-rg small { position: relative; display: block; max-width: 4.6em; color: var(--a-mut); font-size: .56em; line-height: 1.15; margin-top: .2em; overflow-wrap: anywhere; }
.mp-s .tk-shh { display: block; color: var(--a-mut); font-size: .72em; margin-top: -.3em; }
.mp-s .cx-sheet .in { font-size: .86em; }
.mp-s .tk-op { display: flex; gap: .6em; align-items: flex-start; background: var(--a-card); border: 1px solid var(--a-line); border-radius: 1em; padding: .65em .8em; }
.mp-s .tk-op > i { position: relative; width: 1.15em; height: 1.15em; border-radius: 50%; box-shadow: inset 0 0 0 .13em var(--a-tg); flex: none; margin-top: .05em; }
.mp-s .tk-op > i::after { content: ""; position: absolute; inset: .3em; border-radius: 50%; background: var(--a-pri); opacity: 0; }
.mp-s .tk-op.on { box-shadow: inset 0 0 0 .13em var(--a-pri); border-color: transparent; }
.mp-s .tk-op.on > i { box-shadow: inset 0 0 0 .13em var(--a-pri); }
.mp-s .tk-op.on > i::after { opacity: 1; }
.mp-s .tk-op > div { min-width: 0; }
.mp-s .tk-op b { display: block; font-size: .84em; }
.mp-s .tk-op small { display: block; color: var(--a-mut); font-size: .64em; }
.mp-s .tk-wn { display: flex; gap: .35em; align-items: flex-start; color: var(--a-mut); font-size: .62em; margin-top: .35em; line-height: 1.35; }
.mp-s .tk-wn .ic { width: 1.15em; height: 1.15em; margin-top: .05em; }
.mp-s .tk-rdy { align-items: center; text-align: center; gap: .45em; padding-top: 1.6em; }
.mp-s .tk-ri { width: 4em; height: 4em; border-radius: 50%; background: var(--a-soft); color: var(--a-pri); display: grid; place-items: center; }
.mp-s .tk-ri .ic { width: 2em; height: 2em; }
.mp-s .tk-rt { font-size: 1.55em; font-weight: 800; line-height: 1.15; margin-top: .25em; }
.mp-s .tk-rn { font-size: 1.05em; font-weight: 600; }
.mp-s .tk-rd { display: flex; align-items: center; gap: .3em; color: var(--a-mut); font-size: .76em; }
.mp-s .tk-rd .ic { width: 1.1em; height: 1.1em; color: var(--a-gold); }
.mp-s .tk-rm { color: var(--a-mut); font-size: .68em; }
.mp-s .tk-rs { font-size: .76em; line-height: 1.35; margin: .45em 0 .3em; }
.mp-s .bt.tk-rb { height: 2.9em; border-radius: .85em; }
.mp-s .tk-rdy .tk-wn { text-align: start; }
.mp-s .tk-rc { color: var(--a-mut); font-size: .7em; }
.mp-s .tk-rc b { color: var(--a-pri); letter-spacing: .04em; }
.mp-s .tk-go { display: inline-flex; align-items: center; gap: .3em; color: var(--a-pri); font-weight: 700; font-size: .86em; margin-top: .3em; }
.mp-s .tk-go .ic { width: 1em; height: 1em; }
.mp-s .tk-share .sh-msg small { display: block; }
.mp-s .tk-ehd { min-height: 3.3em; }
.mp-s .tk-ehd .hi { color: var(--a-pri); }
.mp-s .tk-ein { gap: .65em; padding-top: .8em; padding-bottom: 1.4em; }
.mp-s .tk-mine { display: flex; flex-direction: column; gap: .5em; }
.mp-s .tk-big { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 3.2em; padding: .45em .9em; border-radius: 1em; background: var(--a-pri); color: var(--a-on); text-align: center; transition: transform .12s ease; }
.mp-s .tk-big .r { display: flex; align-items: center; gap: .4em; }
.mp-s .tk-big b { font-size: .98em; }
.mp-s .tk-big small { font-size: .7em; opacity: .9; margin-top: .1em; }
.mp-s .tk-note { display: block; color: var(--a-mut); font-size: .72em; line-height: 1.35; }
.mp-s .tk-lead { display: block; color: var(--a-mut); font-size: .8em; font-weight: 600; }
.mp-s .bt.tk-sec { height: 2.8em; border-radius: .85em; }
.mp-s .tk-link { display: inline-flex; align-items: center; gap: .3em; color: var(--a-pri); font-size: .74em; font-weight: 600; }
.mp-s .tk-link .ic { width: 1.05em; height: 1.05em; }
.mp-s .tk-info { display: flex; align-items: flex-start; gap: .5em; font-size: .8em; }
.mp-s .tk-info .ic { color: var(--a-pri); width: 1.3em; height: 1.3em; }
.mp-s .tk-stat { display: flex; flex-direction: column; gap: .45em; }
.mp-s .tk-sh { font-size: .9em; }
.mp-s .tk-bar { display: flex; height: .48em; border-radius: 1em; background: var(--a-line); overflow: hidden; }
.mp-s .tk-bar i { display: block; height: 100%; transition: width .9s ease; }
.mp-s .tk-bar .d { background: var(--a-pri); } .mp-s .tk-bar .h { background: var(--a-gold); }
.mp-s .tk-leg { display: flex; flex-wrap: wrap; gap: .1em .35em; font-size: .6em; font-weight: 600; }
.mp-s .tk-leg .d { color: var(--a-pri); } .mp-s .tk-leg .h { color: var(--a-gold); } .mp-s .tk-leg .f { color: var(--a-mut); }
.mp-s .tk-cg { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .4em; margin-top: .2em; }
.mp-s .tk-cz { border: .11em solid var(--a-pri); border-radius: .7em; padding: .42em .25em .4em; text-align: center; background: var(--a-card); min-width: 0; }
.mp-s .tk-cz b { display: block; color: var(--a-pri); font-size: .78em; }
.mp-s .tk-cz small { display: block; color: var(--a-mut); font-size: .52em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mp-s .tk-cz > i { display: block; height: .22em; border-radius: 1em; background: var(--a-line); margin-top: .3em; overflow: hidden; }
.mp-s .tk-cz > i > i { display: block; height: 100%; background: var(--a-pri); }
.mp-s .tk-cz.full { border-color: var(--a-line); background: var(--a-in); }
.mp-s .tk-cz.full b { color: var(--a-mut); }
.mp-s .tk-inv { display: flex; flex-direction: column; gap: .55em; }
.mp-s .tk-ppl { display: flex; align-items: center; gap: .55em; }
.mp-s .tk-ppl b { flex: 1; min-width: 0; font-size: .8em; line-height: 1.25; }
.mp-s .tk-ppl > .ic { width: 1em; height: 1em; color: var(--a-mut); }
.mp-s .tk-fc { display: flex; flex: none; }
.mp-s .tk-fc i { width: 1.85em; height: 1.85em; border-radius: 50%; display: grid; place-items: center; font-style: normal; font-weight: 700; font-size: .7em; background: var(--a-soft); color: var(--a-pri); box-shadow: 0 0 0 .14em var(--a-card); }
.mp-s .tk-fc i + i { margin-inline-start: -.5em; }
.mp-s .tk-fc i.m { width: auto; min-width: 2.1em; padding: 0 .3em; background: var(--a-in); color: var(--a-ink); }
.mp-s .tk-ib { display: flex; gap: .45em; }
.mp-s .tk-ib .bt { flex: 1; min-width: 0; height: 2.55em; font-size: .72em; padding: 0 .5em; border-radius: .85em; }
.mp-s .tk-ib .bt span { overflow: hidden; text-overflow: ellipsis; }
.mp-s .tk-code { display: flex; align-items: center; gap: .45em; font-size: .72em; }
.mp-s .tk-code small { color: var(--a-mut); font-size: 1em; }
.mp-s .tk-code b { color: var(--a-pri); letter-spacing: .1em; }
.mp-s .tk-code .ic { width: 1.05em; height: 1.05em; color: var(--a-mut); }
.mp-s .cx-tp.tk-flash { color: var(--a-pri); font-weight: 700; animation: tkin .5s ease; }
@keyframes tkin { from { opacity: 0; transform: translateY(.4em); } to { opacity: 1; transform: none; } }
.mp-s .tk-toast { position: absolute; z-index: 8; top: .5em; left: 50%; width: max-content; max-width: 90%; transform: translate(-50%, -1.6em); opacity: 0; display: flex; align-items: center; gap: .4em;
  background: var(--a-card); color: var(--a-ink); border: 1px solid var(--a-line); border-radius: 2em; padding: .55em .9em; font-size: .68em; font-weight: 600; box-shadow: 0 .6em 1.4em -.7em rgba(0, 0, 0, .35); transition: opacity .35s ease, transform .45s cubic-bezier(.2, 1.1, .3, 1); }
.mp-s .tk-toast.show { opacity: 1; transform: translate(-50%, 0); }
.mp-s .tk-toast .ic { color: var(--a-pri); }
.mp-s .tk-toast b { color: var(--a-pri); margin-inline-start: .3em; }
.mp-s .tk-menu { gap: 0; padding-top: .7em; }
.mp-s .tk-mi { display: flex; align-items: center; gap: .7em; padding: .78em .2em; border-bottom: 1px solid var(--a-line); font-size: .84em; font-weight: 600; }
.mp-s .tk-mi:last-child { border-bottom: 0; }
.mp-s .tk-mi .ic { color: var(--a-pri); }
.mp-s .tk-mi.red, .mp-s .tk-mi.red .ic { color: var(--a-red); }
.mp-s .tk-claim { gap: .55em; }
.mp-s .tk-rgi { display: flex; align-items: center; gap: .4em; }
.mp-s .tk-rgi .in { flex: 1; min-width: 0; font-size: .8em; }
.mp-s .tk-alert .row2 { flex-direction: column-reverse; gap: .45em; }
.mp-s .tk-alert .row2 > .bt { flex: none; min-width: 0; height: auto; min-height: 2.6em; padding: .35em .6em; white-space: normal; text-align: center; line-height: 1.15; }
.mp-s .tk-jpg { justify-content: center; }
.mp-s .tk-join { display: flex; flex-direction: column; align-items: center; gap: .35em; text-align: center; padding: 1.4em 1.1em 1.1em; }
.mp-s .tk-join > .ic { width: 2.6em; height: 2.6em; color: var(--a-pri); }
.mp-s .tk-join .cap { color: var(--a-pri); }
.mp-s .tk-join > b { font-size: 1.15em; }
.mp-s .tk-join > small { font-size: .76em; }
.mp-s .tk-join .bt { margin-top: .6em; }
.mp-s .tk-res { gap: .55em; align-items: stretch; }
.mp-s .tk-rhead { display: flex; flex-direction: column; align-items: center; gap: .3em; text-align: center; padding: 1.1em .8em 1em; border-radius: 1.1em; background: linear-gradient(160deg, #3d6f61, #1f3d35); color: #fff; }
.mp-s .tk-rok { width: 2.3em; height: 2.3em; border-radius: 50%; background: rgba(255, 255, 255, .92); color: #2f5d4b; display: grid; place-items: center; }
.mp-s .tk-rhead b { font-size: 1.15em; }
.mp-s .tk-rhead small { font-size: .76em; opacity: .9; }
.mp-s .tk-rtt { text-align: center; font-size: 1em; }
.mp-s .tk-rdd { text-align: center; color: var(--a-mut); font-size: .74em; margin-top: -.3em; }
.mp-s .tk-rsh { font-size: .86em; margin-top: .2em; }
.mp-s .tk-rst { display: grid; grid-template-columns: 1fr 1fr; gap: .45em; }
.mp-s .tk-rst span { background: var(--a-card); border: 1px solid var(--a-line); border-radius: .9em; padding: .6em .7em; min-width: 0; }
.mp-s .tk-rst b { display: block; font-size: .98em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mp-s .tk-rst small { display: block; color: var(--a-mut); font-size: .64em; }
.mp-s .tk-rmy small { display: block; color: var(--a-mut); font-size: .7em; }
.mp-s .tk-rmy b { display: block; font-size: .98em; }
.mp-s .tk-rit > b { display: block; font-size: .84em; margin-bottom: .3em; }
.mp-s .tk-rit div { display: flex; justify-content: space-between; gap: .5em; font-size: .78em; padding: .4em 0; border-bottom: 1px solid var(--a-line); }
.mp-s .tk-rit small { color: var(--a-mut); font-size: 1em; }
.mp-s .tk-again { display: flex; align-items: center; justify-content: center; gap: .45em; min-height: 2.9em; padding: .3em .8em; border-radius: .9em; box-shadow: inset 0 0 0 .12em var(--a-pri); background: var(--a-card); color: var(--a-pri); font-weight: 700; font-size: .84em; text-align: center; }
.mp-s .tk-ttl { display: flex; align-items: center; justify-content: space-between; gap: .5em; }
.mp-s .tk-ttl .t1 { font-size: 1.62em; }
.mp-s .tk-hb { display: flex; align-items: center; gap: .55em; color: var(--a-mut); }
.mp-s .tk-hb > .ic { width: 1.5em; height: 1.5em; }
.mp-s .tk-plus { width: 2.35em; height: 2.35em; border-radius: 50%; background: var(--a-pri); color: var(--a-on); display: grid; place-items: center; }
.mp-s .tk-crow { display: flex; align-items: center; gap: .7em; }
.mp-s .tk-crow > div { flex: 1; min-width: 0; }
.mp-s .tk-crow b { display: block; font-size: .95em; }
.mp-s .tk-crow small { display: block; color: var(--a-mut); font-size: .72em; }
.mp-s .tk-crow > .ic { color: var(--a-mut); }
.mp-s .tk-mp { flex: none; display: inline-flex; align-items: center; gap: .2em; padding: .2em .5em; border-radius: 1em; background: var(--a-soft); color: var(--a-pri); font-size: .68em; font-weight: 700; }
.mp-s .tk-mp .ic { width: 1em; height: 1em; }
.mp-s .tk-ghost { display: flex; align-items: center; justify-content: center; gap: .4em; border: .12em dashed var(--a-line); border-radius: 1em; padding: .9em; color: var(--a-mut); font-size: .82em; font-weight: 600; }
.mp-s .tk-top { position: absolute; left: 0; right: 0; top: 0; background: var(--a-card); border-radius: 0 0 1.6em 1.6em; padding: 3.5em 1.05em .7em; display: flex; flex-direction: column; gap: .55em;
  transform: translateY(-102%); transition: transform .45s cubic-bezier(.2, .85, .25, 1); box-shadow: 0 1em 2.5em -1.2em rgba(0, 0, 0, .35); }
.mp-s .ov.on .tk-top { transform: none; }
.mp-s .tk-top > b { text-align: center; font-size: 1.2em; margin-bottom: .2em; }
.mp-s .tk-top .grab { margin: .3em auto 0; }
.mp-s .tk-opt { display: flex; align-items: center; gap: .65em; background: var(--a-soft); border: 1px solid var(--a-line); border-radius: 1em; padding: .7em .75em; }
.mp-s .tk-opt > div { flex: 1; min-width: 0; }
.mp-s .tk-opt b { display: block; font-size: .86em; }
.mp-s .tk-opt small { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; color: var(--a-mut); font-size: .66em; margin-top: .1em; }
.mp-s .tk-opt > .ic { color: var(--a-mut); }
.mp-s .tk-oi { width: 2.5em; height: 2.5em; border-radius: .75em; background: var(--a-pri); color: var(--a-card); display: grid; place-items: center; flex: none; }
.mp-s .tk-wv { position: absolute; inset: 0; display: flex; flex-direction: column; background: var(--page); color: var(--ink); font-family: var(--sans); }
.mp-s .tk-url { flex: none; align-self: center; display: flex; align-items: center; gap: .35em; margin: .25em 0 .1em; padding: .4em 1.1em; border-radius: .8em; background: color-mix(in srgb, var(--ink) 7%, transparent); color: var(--muted); font-size: .7em; }
.mp-s .tk-url .ic { width: 1em; height: 1em; }
.mp-s .tk-wclip { flex: 1; min-height: 0; overflow: hidden; }
.mp-s .tk-wb { display: flex; flex-direction: column; gap: .65em; padding: .5em 1.05em 1.4em; overflow: visible; }
.mp-s .tk-wbr { display: flex; align-items: center; gap: .4em; font-family: var(--display); font-size: .9em; }
.mp-s .tk-wbr .bri { width: 1.7em; height: 1.7em; border-radius: .45em; }
.mp-s .tk-wh { display: flex; flex-direction: column; align-items: center; gap: .2em; text-align: center; padding: .2em 0; }
.mp-s .tk-wh .ey { font-size: .58em; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); }
.mp-s .tk-wh > b { font-family: var(--display); font-weight: 400; font-size: 1.45em; line-height: 1.15; }
:root[lang="ar"] .mp-s .tk-wh .ey { letter-spacing: 0; text-transform: none; font-size: .7em; }
:root[lang="ar"] .mp-s .tk-wh > b { font-family: inherit; font-weight: 700; line-height: 1.35; }
.mp-s .tk-wh .ru { display: block; width: 2.4em; height: 1px; background: var(--gold-soft); margin: .4em 0 .25em; }
.mp-s .tk-wh small { color: var(--body); font-size: .8em; }
.mp-s .tk-wh small.dt { color: var(--muted); font-size: .66em; }
.mp-s .tk-wp { background: var(--paper); border: 1px solid var(--line); border-radius: 1.2em; padding: .85em .9em; display: flex; flex-direction: column; gap: .4em; }
.mp-s .tk-wb .hd2 { display: block; text-align: center; font-size: .58em; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); }
:root[lang="ar"] .mp-s .tk-wb .hd2 { letter-spacing: 0; text-transform: none; font-size: .68em; }
.mp-s .tk-wbar { display: flex; height: .42em; border-radius: 1em; background: color-mix(in srgb, var(--ink) 8%, var(--paper)); overflow: hidden; }
.mp-s .tk-wbar i, .mp-s .tk-wlg i { display: block; background: color-mix(in srgb, var(--ink) 8%, var(--paper)); }
.mp-s .tk-wbar .d, .mp-s .tk-wlg i.d { background: var(--green-2); }
.mp-s .tk-wbar .h, .mp-s .tk-wlg i.h { background: color-mix(in srgb, var(--green-2) 42%, var(--paper)); }
.mp-s .tk-wlg { display: flex; justify-content: center; flex-wrap: wrap; gap: .15em .7em; font-size: .6em; color: var(--body); }
.mp-s .tk-wlg span { display: inline-flex; align-items: center; gap: .35em; }
.mp-s .tk-wlg i { width: .6em; height: .6em; border-radius: 50%; }
.mp-s .tk-wsg { display: flex; flex-direction: column; align-items: center; gap: .3em; text-align: center; background: var(--mint); border-radius: 1.1em; padding: .9em; }
.mp-s .tk-wsg .cz { font-size: 1.25em; font-weight: 600; color: var(--green); }
.mp-s .tk-wsg > small:not(.hd2) { color: var(--body); font-size: .72em; }
.mp-s .tk-wbtn { display: flex; align-items: center; justify-content: center; gap: .4em; width: 100%; min-height: 2.6em; padding: .3em .8em; border-radius: .8em; background: var(--green-2); color: var(--paper); font-weight: 700; font-size: .84em; text-align: center; transition: transform .12s ease; }
.mp-s .tk-wbtn.gh { background: transparent; color: var(--green); box-shadow: inset 0 0 0 1px var(--line); }
.mp-s .tk-wbtn.sm { min-height: 2.2em; font-size: .74em; }
.mp-s .tk-wbtn .ic { width: 1.1em; height: 1.1em; }
.mp-s .tk-wtabs { display: flex; gap: .4em; justify-content: center; font-size: .7em; font-weight: 600; }
.mp-s .tk-wtabs span { padding: .35em .9em; border-radius: 1em; box-shadow: inset 0 0 0 1px var(--line); color: var(--body); }
.mp-s .tk-wtabs .on { background: var(--green-2); color: var(--paper); box-shadow: none; }
.mp-s .tk-wg { display: grid; grid-template-columns: 1fr 1fr; gap: .5em; }
.mp-s .tk-wcell { display: flex; flex-direction: column; align-items: center; background: var(--paper); border: 1px solid var(--line); border-radius: .95em; padding: .6em .3em; }
.mp-s .tk-wcell b { font-size: 1.35em; font-weight: 600; color: var(--green); line-height: 1; }
.mp-s .tk-wcell .u { font-size: .52em; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); margin-top: .35em; }
:root[lang="ar"] .mp-s .tk-wcell .u { letter-spacing: 0; text-transform: none; }
.mp-s .tk-wcell small:not(.u) { font-size: .6em; color: var(--body); margin-top: .3em; }
.mp-s .tk-wblk { display: flex; flex-direction: column; align-items: center; gap: .2em; padding: 1em 0 .3em; }
.mp-s .tk-wblk .pg2 { font-size: 1.45em; font-weight: 600; color: var(--green); }
.mp-s .tk-wblk small { color: var(--muted); font-size: .76em; }
.mp-s .tk-wmsg { display: block; text-align: center; color: var(--body); font-size: .78em; }
.mp-s .tk-wamt { display: flex; justify-content: center; gap: .45em; }
.mp-s .tk-wamt span { min-width: 2.4em; padding: .45em .5em; text-align: center; border-radius: .7em; box-shadow: inset 0 0 0 1px var(--line); font-weight: 600; font-size: .82em; }
.mp-s .tk-wamt .on { background: var(--green-2); color: var(--paper); box-shadow: none; }
.mp-s .tk-wok { display: block; text-align: center; font-family: var(--display); font-weight: 400; font-size: 1.25em; line-height: 1.25; padding-top: 1em; }
:root[lang="ar"] .mp-s .tk-wok { font-family: inherit; font-weight: 700; }
.mp-s .tk-wrec { display: flex; flex-direction: column; gap: .45em; padding: .75em; border-radius: 1em; background: color-mix(in srgb, var(--ink) 5%, transparent); text-align: center; }
.mp-s .tk-wrec small { color: var(--body); font-size: .72em; }
`;
