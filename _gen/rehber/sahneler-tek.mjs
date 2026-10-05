/**
 * "Tek seferlik halka" rehberinin ekranlari (5 Eki 2026; ilk adi "Vefat eden icin toplu hatim").
 *
 * Uygulamada karsiligi: Tek Seferlik Halka + Kur'an Hatmi (app/create-event.tsx,
 * app/event/[id].tsx, app/join/[id].tsx, components/home/AddCircleSheet.tsx) ve
 * uygulamasi olmayanin acdigi web sayfasi (halka.html).
 *
 * KURALLAR (sahne.mjs basindakilere ek)
 * - Uygulama metni K.L("anahtar") ile; anahtar DOGRUDAN yazilir (sync-app-labels
 *   anahtarlari koddan regex'le topluyor, degiskenden gelen anahtari goremez).
 * - Web sayfasinin metni uygulamanin locale'inde YOK: halka.html'deki S ve RD
 *   sozluklerinden okunur (W(), WR()). Elle yazilmaz; sayfa degisirse sahne de degisir.
 * - Cevsen yok: sihirbazin 1. adimindaki Cevsen karosu bos iskelet, "Duzenli Halka"
 *   kartinin aciklamasi (Cevsen geciyor) iskelet cizgi olarak cizilir.
 * - Ortak havuz modunda halka "Tamamlandi"ya gecmez (yalniz Otomatik bol); burada
 *   hatim bitince yalniz Ortak Ilerleme %100 olur, durum "Devam ediyor" kalir.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const BURASI = dirname(fileURLToPath(import.meta.url));

// ── halka.html sozlukleri (web misafir sayfasinin kendi metinleri) ──────────────
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

// ── dile gore ornek veriler (kullanicinin yazdiklari; uygulama metni DEGIL) ─────
// Iki ornek: "genel" (Regaib Kandili hatmi; magaza karelerindeki 06-event ile ayni ad ve ithaf)
// ve "vefat" (vefat eden bir yakin icin hatim; rehberdeki vesile bolumunde).
// Bugun 5 Ekim 14:30; varsayilan bitis +48 saat. gun: halka baslayinca bitise kalan gun.
// Regaib 2026: uygulamanin lib/islamicDays.ts hesabiyla 10 Aralik aksami.
const VF = {
  genel: {
    tr: { title: "Regaib Kandili Hatmi", ded: "Ailemizin ve bütün ümmetin hayrına", endDef: "7 Eki 14:30", end: "10 Ara 21:00", until: "10 Aralık", gun: 66,
      wheel: [["9 Ara", "20", "59"], ["10 Ara", "21", "00"], ["11 Ara", "22", "01"]], guests: ["Hatice", "Kerem", "Elif"], guest: "Hatice" },
    en: { title: "Laylat al-Raghaib Khatm", ded: "For the good of our family and the whole Ummah", endDef: "7 Oct, 14:30", end: "10 Dec, 21:00", until: "10 December", gun: 66,
      wheel: [["9 Dec", "20", "59"], ["10 Dec", "21", "00"], ["11 Dec", "22", "01"]], guests: ["Hassan", "Khadija", "Karim"], guest: "Khadija" },
    de: { title: "Chatma zur Laylat al-Ragha'ib", ded: "Zum Wohl unserer Familie und der ganzen Umma", endDef: "7. Okt., 14:30", end: "10. Dez., 21:00", until: "10. Dezember", gun: 66,
      wheel: [["9. Dez.", "20", "59"], ["10. Dez.", "21", "00"], ["11. Dez.", "22", "01"]], guests: ["Hasan", "Hatice", "Kerem"], guest: "Hatice" },
    fr: { title: "Khatma de Laylat al-Ragha’ib", ded: "Pour le bien de notre famille et de toute la Oumma", endDef: "7 oct. 14:30", end: "10 déc. 21:00", until: "10 décembre", gun: 66,
      wheel: [["9 déc.", "20", "59"], ["10 déc.", "21", "00"], ["11 déc.", "22", "01"]], guests: ["Hassan", "Khadija", "Karim"], guest: "Khadija" },
    ar: { title: "ختمة ليلة الرغائب", ded: "لخير عائلتنا والأمة جمعاء", endDef: "7 أكتوبر 14:30", end: "10 ديسمبر 21:00", until: "10 ديسمبر", gun: 66,
      wheel: [["9 ديسمبر", "20", "59"], ["10 ديسمبر", "21", "00"], ["11 ديسمبر", "22", "01"]], guests: ["حسن", "خديجة", "كريم"], guest: "خديجة" },
  },
  vefat: {
    tr: { title: "Ahmet Kaya için Hatim", ded: "Rahmetli babamızın ruhuna", endDef: "7 Eki 14:30", end: "12 Eki 21:00", until: "12 Ekim", gun: 7,
      wheel: [["11 Eki", "20", "59"], ["12 Eki", "21", "00"], ["13 Eki", "22", "01"]], guests: ["Hatice", "Kerem", "Elif"], guest: "Hatice" },
    en: { title: "Khatam for Ibrahim Khan", ded: "For our late father", endDef: "7 Oct, 14:30", end: "12 Oct, 21:00", until: "12 October", gun: 7,
      wheel: [["11 Oct", "20", "59"], ["12 Oct", "21", "00"], ["13 Oct", "22", "01"]], guests: ["Hassan", "Khadija", "Karim"], guest: "Khadija" },
    de: { title: "Chatma für Ibrahim Demir", ded: "Für unseren verstorbenen Vater", endDef: "7. Okt., 14:30", end: "12. Okt., 21:00", until: "12. Oktober", gun: 7,
      wheel: [["11. Okt.", "20", "59"], ["12. Okt.", "21", "00"], ["13. Okt.", "22", "01"]], guests: ["Hasan", "Hatice", "Kerem"], guest: "Hatice" },
    fr: { title: "Khatma pour Ibrahim Benali", ded: "À la mémoire de notre père", endDef: "7 oct. 14:30", end: "12 oct. 21:00", until: "12 octobre", gun: 7,
      wheel: [["11 oct.", "20", "59"], ["12 oct.", "21", "00"], ["13 oct.", "22", "01"]], guests: ["Hassan", "Khadija", "Karim"], guest: "Khadija" },
    ar: { title: "ختمة للمرحوم إبراهيم أحمد", ded: "على روح والدنا رحمه الله", endDef: "7 أكتوبر 14:30", end: "12 أكتوبر 21:00", until: "12 أكتوبر", gun: 7,
      wheel: [["11 أكتوبر", "20", "59"], ["12 أكتوبر", "21", "00"], ["13 أكتوبر", "22", "01"]], guests: ["حسن", "خديجة", "كريم"], guest: "خديجة" },
  },
};
/** Sahne kurulurken gecerli ornek. Sahneler varsayilan olarak "genel"i kullanir; ornekle() degistirir. */
let ORN = "genel";
const ornekle = (ad, f) => (K) => { const once = ORN; ORN = ad; try { return f(K); } finally { ORN = once; } };
const KOD = "6BBNFU";
const LINK = `https://manevihalka.app/join.html?event=${KOD}&w=k3Tq9xVm`;

/** Her sahne bu kucuk yardimciyla baslar: K + dile ozel veriler + web sozlugu. */
function hazirla(K) {
  const V = VF[ORN][K.dil], S = WEB_S[K.dil], RD = WEB_RD[K.dil];
  if (!V || !S || !RD) throw new Error("sahneler-tek: dil verisi yok " + ORN + " " + K.dil);
  const yaz = (s, v = {}) => String(s).replace(/\{(\w+)\}/g, (t, k) => (k in v ? v[k] : t));
  const W = (k, v) => { if (!(k in S)) throw new Error(`halka.html S.${k} yok (${K.dil})`); return yaz(S[k], v); };
  const WR = (k, v) => { if (!(k in RD)) throw new Error(`halka.html RD.${k} yok (${K.dil})`); return yaz(RD[k], v); };
  const kalan = (g, s, d) => (g ? `${g}${K.L("event.unitDay")} ${s}${K.L("event.unitHour")}` : `${s}${K.L("event.unitHour")} ${d}${K.L("event.unitMin")}`);
  /** Halka basladiktan sonra bitise kalan: ornegin gun sayisi + s saat. */
  const kalanGun = (s) => kalan(V.gun, s);
  return { V, W, WR, kalan, kalanGun };
}

const IKON_VF = {
  vfRose: '<path d="M12 21v-7.5"/><path d="M12 13.5c-3.2 0-5.2-2.2-5.2-5.3 1.6 0 3 .5 4 1.4C11.3 7.3 12.6 5.5 15 4.5c.2 1.9-.3 3.4-1.3 4.5 1.2-.4 2.6-.3 3.6.2-.2 2.6-2.3 4.3-5.3 4.3z"/><path d="M12 17.5c-1.4-1.3-3.2-1.8-4.8-1.4"/>',
  vfPlay: '<circle cx="12" cy="12" r="8.5"/><path d="M10.2 8.6l5.2 3.4-5.2 3.4z"/>',
  vfTrash: '<path d="M5 7h14M10 7V5h4v2M7 7l1 12.5h8L17 7"/>',
  vfMark: '<path d="M7.5 4h9v16l-4.5-3.4L7.5 20z"/>',
  vfCheckbox: '<rect x="4.5" y="4.5" width="15" height="15" rx="3"/><path d="M8.6 12.2l2.4 2.4 4.6-4.9"/>',
  vfSquare: '<rect x="4.5" y="4.5" width="15" height="15" rx="3"/>',
  vfChecks: '<path d="M3 12.5l4 4L15 8.5M10.5 15.5l1 1L20 8"/>',
  vfAddCircle: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/>',
  vfEnter: '<path d="M10 8l4 4-4 4M14 12H4M13 4.5h5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-5"/>',
  vfDoc: '<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M9.6 12h5M9.6 15.5h5"/>',
  vfLock: '<rect x="5.5" y="10.5" width="13" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  vfMore: '<circle cx="5.5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18.5" cy="12" r="1.3" fill="currentColor"/>',
  vfGrid: '<rect x="4.5" y="4.5" width="6" height="6" rx="1.3"/><rect x="13.5" y="4.5" width="6" height="6" rx="1.3"/><rect x="4.5" y="13.5" width="6" height="6" rx="1.3"/><rect x="13.5" y="13.5" width="6" height="6" rx="1.3"/>',
};

// ══ Gorunumler ════════════════════════════════════════════════════════════════

/** Halkalar sekmesi (oturum acik): baslik, sag ustte yesil +, mevcut bir halka. */
function halkalar(K) {
  return `<div class="pg pt">
      <div class="vf-ttl"><b class="t1">${K.Le("dashboard.myCirclesTitle")}</b>
        <span class="vf-hb">${K.ic("info")}<span class="vf-plus"${K.attr("plus")}>${K.ic("plus")}</span></span></div>
      <div class="cd vf-crow">${K.avatar(K.X.circle)}<div><b>${K.e(K.X.circle)}</b><small>${K.Le("dashboard.memberCount", { count: 5 })}</small></div><span class="vf-mp">${K.ic("people")}<span>5</span></span>${K.ic("vfMore")}</div>
      <div class="vf-ghost">${K.ic("plus")}<span>${K.Le("dashboard.newCircleCard")}</span></div>
    </div>${K.tabbar("circles")}`;
}

/** Ustten inen "Halka Ekle" paneli: Duzenli Halka (aciklamasi iskelet) · Tek Seferlik Halka · Halkaya Katil. */
function halkaEkle(K) {
  return `<div class="vf-top"><b>${K.Le("dashboard.addCircle")}</b>
      <div class="vf-opt"><span class="vf-oi">${K.ic("personAdd")}</span><div><b>${K.Le("dashboard.createNew")}</b><i class="sk"></i><i class="sk s2"></i></div>${K.ic("chev", "fl")}</div>
      <div class="vf-opt"${K.attr("oneTime")}><span class="vf-oi">${K.ic("flag")}</span><div><b>${K.Le("event.createMenuTitle")}</b><small>${K.Le("event.createMenuDesc")}</small></div>${K.ic("chev", "fl")}</div>
      <div class="vf-opt"><span class="vf-oi">${K.ic("vfEnter", "fl")}</span><div><b>${K.Le("dashboard.joinExisting")}</b><small>${K.Le("dashboard.joinExistingDesc")}</small></div>${K.ic("chev", "fl")}</div>
      <i class="grab"></i></div>`;
}

/** Sihirbazin ortak iskeleti: baslik, 4 adim (bulunulan adim uzun hap), altta sabit dugme. */
function sihirbaz(K, adim, govde, dugme) {
  const noktalar = [1, 2, 3, 4].map((n) => `<i class="${n <= adim ? "on" : ""}${n === adim ? " cur" : ""}"></i>`).join("");
  return `${K.hd({ title: K.L("event.createTitle") })}<div class="vf-dots">${noktalar}</div>${govde}<div class="vf-foot">${dugme}</div>`;
}
/** Kaydirilan icerik: dis kap kirpar, ic kap (.sc) ["y", key, n] ile n em yukari kayar. */
const kaydir = (K, key, html, cls = "") => `<div class="pg vf-clip"><div class="vf-in sc ${cls}"${K.attr(key)}>${html}</div></div>`;
const devam = (K, key, kapali) => K.bt(K.L("common.continue"), { key, cls: `blk lg${kapali ? " dis" : ""}`, iconEnd: "fwd" });

/** Adim 1: tur. Cevsen karosu bos iskelet. */
function sihirbaz1(K) {
  return sihirbaz(K, 1, kaydir(K, "", `
      <b class="t1">${K.Le("event.step1Title")}</b><small class="t2">${K.Le("event.step1Sub")}</small>
      <div class="vf-type"${K.attr("tq")}>${K.ic("quran")}<div><b>${K.Le("event.typeQuran")}</b><small>${K.Le("event.typeQuranDesc")}</small></div>${K.ic("checkCircle", "vf-ok")}</div>
      <div class="vf-type skel" aria-hidden="true"><i></i><div><i></i><i></i></div></div>
      <div class="vf-type">${K.ic("beads")}<div><b>${K.Le("event.typeZikir")}</b><small>${K.Le("event.typeZikirDesc")}</small></div>${K.ic("checkCircle", "vf-ok")}</div>
      <div class="vf-type">${K.ic("vfDoc")}<div><b>${K.Le("event.typeDua")}</b><small>${K.Le("event.typeDuaDesc")}</small></div>${K.ic("checkCircle", "vf-ok")}</div>`, "vf-wz"), devam(K, "next1", true));
}

/** Adim 2: hedef + dagitim (varsayilan Otomatik bol; rehber Ortak havuzu secer). */
function sihirbaz2(K) {
  const sec = (key, on, b, s, web) => `<div class="vf-rd${on ? " on" : ""}"${K.attr(key)}><i></i><div><b>${b}</b><small>${s}</small>${web ? `<span class="vf-wn">${K.ic("web")}<span>${web}</span></span>` : ""}</div></div>`;
  return sihirbaz(K, 2, kaydir(K, "w2sc", `
      <b class="t1">${K.Le("event.quranGoalTitle")}</b><small class="t2">${K.Le("event.quranGoalSub")}</small>
      ${sec("", true, K.Le("event.fullHatim"), K.Le("event.fullHatimDesc"))}
      ${sec("", false, K.Le("event.customJuz"), K.Le("event.customJuzDesc"))}
      <span class="vf-pill">${K.ic("book")}<span>${K.Le("event.totalPages", { n: 604 })}</span></span>
      <b class="lb mu">${K.Le("event.distributionLabel")}</b>
      ${sec("dAuto", true, K.Le("event.distAuto"), K.Le("event.distAutoDesc"), K.Le("event.webNoteAuto"))}
      ${sec("dPool", false, K.Le("event.distPool"), K.Le("event.distPoolDesc"), K.Le("event.webNotePool"))}`, "vf-wz"), devam(K, "next2"));
}

/** Adim 3: zamanlama. Tarih kutusuna dokununca iOS'taki gibi kutunun altinda tekerlek acilir. */
function sihirbaz3(K) {
  const { V } = hazirla(K);
  const kol = (i) => `<span>${V.wheel.map((r, j) => (j === 1 ? `<b>${K.e(r[i])}</b>` : `<i>${K.e(r[i])}</i>`)).join("")}</span>`;
  return sihirbaz(K, 3, kaydir(K, "", `
      <b class="t1">${K.Le("event.timingTitle")}</b><small class="t2">${K.Le("event.timingSub")}</small>
      <b class="lb mu">${K.Le("event.endDate")}</b>
      <span class="in vf-date"${K.attr("endIn")}>${K.ic("flag")}<span${K.attr("endTx")}>${K.e(V.endDef)}</span></span>
      <div class="vf-wheel"${K.attr("wheel")} aria-hidden="true">${kol(0)}${kol(1)}${kol(2)}</div>
      <small class="mu vf-hint">${K.Le("event.endDateHint")}</small>
      <div class="cd row tgl vf-chk">${K.ic("vfSquare")}<div><b>${K.Le("event.registrationWindowToggle")}</b><small>${K.Le("event.registrationWindowHint")}</small></div></div>
      <span class="vf-pill">${K.ic("info")}<span>${K.Le("event.deleteNote")}</span></span>`, "vf-wz"), devam(K, "next3"));
}

/** Adim 4: ad, ithaf, ozet, Halkayi Olustur. */
function sihirbaz4(K) {
  const { V } = hazirla(K);
  const satir = (ic, ad, deger, ek = "") => `<div class="r${ek}"${ek ? K.attr("sumDed") : ""}>${K.ic(ic)}<small>${ad}</small><b>${deger}</b></div>`;
  return sihirbaz(K, 4, kaydir(K, "", `
      <b class="t1">${K.Le("event.detailsTitle")}</b><small class="t2">${K.Le("event.detailsSub")}</small>
      <b class="lb mu">${K.Le("event.titleLabel")}</b>${K.input({ key: "tname", ph: K.L("event.suggestFullHatim") })}
      <b class="lb mu">${K.Le("event.dedicationLabel")}</b>${K.input({ key: "tded", ph: K.L("event.dedicationPlaceholder") })}
      <div class="cd vf-sum">
        ${satir("quran", K.Le("event.sumType"), K.Le("event.typeQuran"))}
        ${satir("book", K.Le("event.sumGoal"), K.Le("event.totalPages", { n: 604 }))}
        ${satir("vfPlay", K.Le("event.sumStart"), K.Le("event.startManual"))}
        ${satir("flag", K.Le("event.sumEnd"), K.e(V.end))}
        ${satir("vfRose", K.Le("event.sumDedication"), K.e(V.ded), " ded")}
      </div>`, "vf-wz"), K.bt(K.L("event.create"), { key: "create", cls: "blk lg", icon: "checkCircle" }));
}

/** Halka ekraninin basligi ve ust karti (tur simgesi, ad, ithaf, durum rozeti). */
function ustKart(K, { admin, durum }) {
  const { V } = hazirla(K);
  const rozet = durum === "reg" ? `<span class="vf-badge reg">${K.Le("event.statusRegistration")}</span>` : `<span class="vf-badge">${K.Le("event.statusActive")}</span>`;
  return `<div class="cd vf-hero">${admin ? `<span class="vf-edit">${K.ic("edit")}</span>` : ""}${K.ic("quran")}
      <b>${K.e(V.title)}</b><span class="vf-ded">${K.ic("vfRose")}<span>${K.e(V.ded)}</span></span>${rozet}</div>`;
}
const baslik = (K) => K.hd({ title: hazirla(K).V.title, right: ["share"], keyRight: { share: "shareTop" } });

/** Davet karti: kod, link, Davet Et, web notu. */
function davetKarti(K) {
  return `<div class="cd vf-inv"><b>${K.Le("event.inviteSectionTitle")}</b>
      <div class="vf-ir"><div><small>${K.Le("event.inviteCodeLabel")}</small><b class="vf-code">${KOD}</b></div><span class="vf-cp">${K.ic("copy")}</span></div>
      <div class="vf-ir"><div><small>${K.Le("event.inviteLinkLabel")}</small><bdi dir="ltr" class="vf-link">${K.e(LINK)}</bdi></div><span class="vf-cp">${K.ic("copy")}</span></div>
      <span class="vf-share"${K.attr("inviteBtn")}>${K.ic("shareSocial")}<span>${K.Le("event.inviteFriends")}</span></span>
      <span class="vf-wn">${K.ic("web")}<span>${K.Le("event.webJoinClaim")}</span></span></div>`;
}

/** Kayit asamasi (yonetici): davet karti, "Kayitlar acik", Simdi Baslat, Halkayi Sil. */
function kayit(K) {
  return `${baslik(K)}${kaydir(K, "regsc", `
      ${ustKart(K, { admin: true, durum: "reg" })}
      ${davetKarti(K)}
      <div class="cd vf-reg"><span class="vf-regh">${K.ic("hourglass")}<b>${K.Le("event.registrationOpen")}</b></span>
        <small class="mu">${K.Le("event.startWhenYouOpen")}</small>
        <span class="vf-ppl">${K.ic("people")}<span>${K.Le("event.participantsPlural", { count: 1 })}</span>${K.ic("chev", "fl")}</span></div>
      ${K.bt(K.L("event.startNow"), { key: "startNow", cls: "blk", icon: "vfPlay" })}
      <span class="vf-red">${K.ic("vfTrash")}<span>${K.Le("event.deleteEvent")}</span></span>`)}`;
}

/**
 * Aktif halka ekrani. o.tab: "g" (Gorev) | "h" (Halka).
 * o.prog: [yuzde, okundu, okunuyor, bosta]; o.cd: geri sayim metni; o.my: "on" | "gizli" | yok.
 * o.cuz: havuzda gorunen cuzler; o.gizli: once gizli duran (alininca yerine kayan) cuz.
 */
function aktif(K, o = {}) {
  const tab = o.tab || "g";
  const [pct, d, h, f] = o.prog || [0, 0, 0, 604];
  const w = (n) => `${((n / 604) * 100).toFixed(1)}%`;
  const sekmeler = `<div class="seg"><span class="${tab === "g" ? "on" : ""}"${K.attr("tabG")}>${K.ic("vfCheckbox")}${K.Le("event.tabTask")}</span><span class="${tab === "h" ? "on" : ""}"${K.attr("tabH")}>${K.ic("people")}${K.Le("event.tabCircle")}</span></div>`;
  let icerik = "";
  if (tab === "g") {
    const etiket = K.L("event.pageRange", { a: 121, b: 140 });
    const ilerleme = `<div class="cd vf-prog"><div class="row sp"><b>${K.Le("event.collectiveProgress")}</b><b class="vf-pct"${K.attr("pct")}>${K.Le("common.percent", { n: pct })}</b></div>
        <span class="vf-bar"><i class="d"${K.attr("pbD")} style="width:${w(d)}"></i><i class="h"${K.attr("pbH")} style="width:${w(h)}"></i></span>
        <div class="vf-leg"><span class="d"${K.attr("lgD")}>${K.Le("event.statPagesRead", { n: d })}</span><span class="mu">·</span><span class="h"${K.attr("lgH")}>${K.Le("event.statPagesReading", { n: h })}</span><span class="mu">·</span><span class="f"${K.attr("lgF")}>${K.Le("event.statPagesLeft", { n: f })}</span></div>
        <span class="vf-cd">${K.ic("clock")}<span${K.attr("cd")}>${K.Le("event.endsIn", { d: o.cd })}</span></span></div>`;
    const benim = o.my ? `<div class="cd vf-my${o.my === "on" ? " on" : ""}"${K.attr("mytask")}><b>${K.Le("event.myTask")}</b>
        <div class="vf-ur"${K.attr("myrow")}>${K.ic("vfMark")}<span>${K.e(etiket)}</span>${K.bt(K.L("event.read"), { key: "readBtn", cls: "sm ol" })}${K.bt(K.L("event.done"), { key: "doneBtn", cls: "sm" })}</div>
        <div class="vf-dt"${K.attr("mydone")}>${K.ic("vfChecks")}<span>${K.Le("event.myDoneToggle", { n: 1 })}</span>${K.ic("chev", "vf-dn")}</div></div>` : "";
    const dolu = o.full || [];
    const cuzler = (o.cuz || [7, 8, 9, 10, 11, 12]).map((n) => `<span class="vf-cz${dolu.includes(n) ? " full" : ""}"${K.attr("c" + n)}><b>${K.Le("event.cuzShort", { n })}</b><small class="fr">${K.Le("event.cuzFree", { n: 20 })}</small><small class="fl">${K.Le("event.cuzFull")}</small><i></i></span>`).join("")
      + (o.gizli ? `<span class="vf-cz vf-x${dolu.includes(o.gizli) ? " full" : ""}"${K.attr("c" + o.gizli)}><b>${K.Le("event.cuzShort", { n: o.gizli })}</b><small class="fr">${K.Le("event.cuzFree", { n: 20 })}</small><small class="fl">${K.Le("event.cuzFull")}</small><i></i></span>` : "");
    const havuz = `<div class="cd vf-pool"><div class="vf-ph"><b>${K.Le("event.poolCuzTitle")}</b>${o.admin ? `<span class="vf-ser"${K.attr("series")}>${K.ic("plus")}${K.Le("event.addSeries")}</span>` : ""}</div>
        <div class="vf-cg${o.dolu ? " allfull" : ""}"${K.attr("cg")}>${cuzler}</div></div>`;
    icerik = ilerleme + benim + havuz;
  } else {
    const { V } = hazirla(K);
    const kisiler = K.X.names.slice(0, 4).map((n, i) => `<div class="li">${K.avatar(n)}<div><b>${K.e(n)}${i === 0 ? ` · ${K.Le("event.admin")}` : ""}</b><small>${K.Le("event.totalPages", { n: 20 })} · ${K.Le("event.memberStarted")}</small></div><i class="vf-dot"></i><small class="vf-pp">0/1</small></div>`).join("");
    const misafir = o.misafir ? `<div class="cd list vf-ppl2"><b class="vf-lh">${K.Le("event.webGuestsPlural", { count: 3 })}</b>${V.guests.map((n, i) => `<div class="li">${K.avatar(n)}<div><b>${K.e(n)}</b><small>${K.Le("event.webGuestUnits", { done: i === 0 ? 1 : 0, total: 1 })}</small></div><i class="vf-dot${i === 0 ? " ok" : " gr"}"></i></div>`).join("")}</div>` : "";
    const yonetim = o.admin ? `<div class="cd list vf-adm"><b class="vf-lh">${K.Le("event.adminControls")}</b>
        <div class="li"${K.attr("extend")}>${K.ic("clock")}<span>${K.Le("event.extend24h")}</span>${K.ic("chev", "fl")}</div>
        <div class="li red">${K.ic("vfTrash")}<span>${K.Le("event.deleteEvent")}</span>${K.ic("chev", "fl")}</div></div>` : "";
    icerik = `${davetKarti(K)}<div class="vf-note">${K.ic("people")}<span>${K.Le("event.openJoinNote")}</span></div>
      <div class="cd list vf-ppl2"><b class="vf-lh">${K.Le("event.participantsPlural", { count: 4 })}</b>${kisiler}</div>${misafir}${yonetim}`;
  }
  const kaydirma = o.sc || (tab === "g" ? "gsc" : "hsc");
  return `${baslik(K)}${kaydir(K, kaydirma, ustKart(K, { admin: o.admin, durum: "act" }) + sekmeler + icerik)}
    ${o.toast ? `<div class="vf-toast"${K.attr("toast")}>${K.ic("checkCircle")}<span>${K.Le("taskDone.viaHelpSub", { what: K.L("event.pageRange", { a: 121, b: 140 }) })}</span></div>` : ""}`;
}

/** Uygulamada davet karti (app/join/[id].tsx): tur simgesi, TEK SEFERLIK HALKA, ad, ithaf, katilimci, bitis, Katil. */
function davetOnizleme(K) {
  const { V } = hazirla(K);
  return `<div class="pg vf-jpg"><div class="cd vf-join">${K.ic("quran")}<small class="cap">${K.Le("event.createMenuTitle")}</small>
      <b>${K.e(V.title)}</b><small class="mu">${K.e(V.ded)}</small>
      <small class="mu">${K.Le("event.participants", { count: 4 })}</small><small class="mu">${K.Le("event.previewEndsAt", { d: V.end })}</small>
      ${K.bt(K.L("joinGroup.join"), { key: "joinBtn", cls: "blk lg", icon: "vfAddCircle" })}<small class="mu c">${K.Le("join.skip")}</small></div></div>`;
}

// ── ustlukler ──────────────────────────────────────────────────────────────────
function baslatOnay(K) {
  return `<div class="card-c"><span class="badge-ic">${K.ic("vfPlay")}</span><b class="t1 c">${K.Le("event.startConfirmTitle")}</b><small class="t2 c">${K.Le("event.startConfirmOpenMsg")}</small>
      <div class="row2">${K.bt(K.L("common.cancel"), { cls: "gh" })}${K.bt(K.L("event.startNow"), { key: "cfOk" })}</div></div>`;
}
function paylas(K) {
  const { V } = hazirla(K);
  return `<div class="sheet share"><div class="sh-msg">${K.brand()}<small>${K.e(K.L("event.shareMessage", { title: V.title, url: LINK }))}</small></div>
      <div class="sh-apps">${K.X.shareApps.map((a, i) => `<span${i === 0 ? K.attr("app0") : ""}><i class="sa sa${i}">${K.ic(["chat", "chat", "mail", "send"][i])}</i><small>${K.e(a)}</small></span>`).join("")}</div>
      <div class="sh-rows"><span>${K.ic("copy")}<small>${K.Le("a11y.copy")}</small></span></div></div>`;
}
/** Cuz kutusuna dokununca: Tum cuzu al (asil) ya da sayfa araligi (ikincil, cerceveli). */
function cuzPenceresi(K) {
  return `<div class="card-c vf-claim"><b class="t1 c">${K.Le("event.cuzShort", { n: 7 })}</b>
      ${K.bt(K.L("event.takeWholeCuz"), { key: "whole", cls: "blk" })}
      <small class="mu c">${K.Le("event.orPageRange")}</small>
      <small class="mu c">${K.e(K.L("common.labelValue", { label: K.L("event.available"), value: "§" })).replace("§", K.num("121–140"))}</small>
      <div class="vf-rg">${K.input({ ph: K.L("event.startLabel"), val: "121", cls: "c" })}<span>–</span>${K.input({ ph: K.L("event.endLabel"), val: "140", cls: "c" })}</div>
      <div class="row2">${K.bt(K.L("common.cancel"), { cls: "gh" })}${K.bt(K.L("event.claimRange"), { cls: "ol" })}</div></div>`;
}
function tamamlaOnay(K) {
  return `<div class="card-c"><span class="badge-ic">${K.ic("vfChecks")}</span><b class="t1 c">${K.Le("event.completeConfirmTitle")}</b>
      <small class="t2 c">${K.Le("event.completeConfirmMsg", { label: K.L("event.pageRange", { a: 121, b: 140 }) })}</small>
      ${K.bt(K.L("event.completeConfirmTitle"), { key: "ccOk", cls: "blk" })}${K.bt(K.L("common.cancel"), { cls: "blk gh" })}</div>`;
}

// ── web sayfasi (halka.html), tarayicida ───────────────────────────────────────
function webKabuk(K, govde, key) {
  return `<div class="vf-wv"><span class="vf-url">${K.ic("vfLock")}<bdi dir="ltr">manevihalka.app</bdi></span>
      <div class="vf-wclip"><div class="vf-wb sc"${K.attr(key)}>${govde}</div></div></div>`;
}
function webUst(K) {
  const { V, W } = hazirla(K);
  return `<span class="vf-wbr">${K.brand()}<span>Manevi Halka</span></span>
      <div class="vf-wh"><small class="ey">${K.e(W("heroEyebrow"))}</small><b>${K.e(V.ded)}</b><i class="ru"></i><small>${K.e(V.title)}</small><small class="dt">${K.e(W("until", { d: V.until }))}</small></div>
      <div class="vf-wp"><small class="hd2">${K.e(W("ongoing"))}</small><span class="vf-wbar"><i class="d" style="width:6.6%"></i><i class="h" style="width:16.6%"></i></span>
        <div class="vf-wlg"><span><i class="d"></i>40 ${K.e(W("lgDone"))}</span><span><i class="h"></i>100 ${K.e(W("lgHeld"))}</span><span><i></i>464 ${K.e(W("lgFree"))}</span></div></div>`;
}
function webPano(K, { benim = false } = {}) {
  const { W, WR } = hazirla(K);
  const bolum = benim ? `<div class="vf-wp vf-wmine"${K.attr("mrow")}><small class="hd2">${K.e(W("myLbl"))}</small>
        <b class="p">${K.e(W("pagesRange", { a: 141, b: 160 }))}</b><span class="vf-wbtn gh sm">${K.ic("book")}${K.e(WR("read"))}</span>
        <div class="vf-wact"><span class="vf-wbtn"${K.attr("wDone")}>${K.e(W("markDone"))}</span><span class="vf-wbtn gh">${K.e(W("dropIt"))}</span></div>
        <span class="vf-wtick">${K.ic("check")}${K.e(W("doneMark"))}</span></div>
      <div class="vf-wp vf-wname"${K.attr("nbox")}><b>${K.e(W("nAsk"))}</b><small>${K.e(W("nWhy"))}</small>
        ${K.input({ key: "nIn", ph: W("nPh") })}<div class="vf-wact"><span class="vf-wbtn"${K.attr("nSave")}>${K.e(W("nSave"))}</span><span class="vf-wbtn gh">${K.e(W("nSkip"))}</span></div>
        <div class="vf-wnr"><span>${K.e(W("nEdit"))}${K.dil === "fr" ? " :" : ":"} <b>${K.e(hazirla(K).V.guest)}</b></span><span class="vf-wbtn gh sm">${K.e(W("nClear"))}</span></div></div>` : "";
  const hucre = (n) => `<span class="vf-wcell"><b>${n}</b><small class="u">${K.e(W("cuzWord"))}</small><small>${K.e(W("freeIn", { p: 20 }))}</small></span>`;
  return webKabuk(K, `${webUst(K)}${bolum}
      <div class="vf-wsg"><small class="hd2">${K.e(W("nextLbl"))}</small><b class="cz">${K.e(W("cuzN", { n: benim ? 9 : 8 }))}</b><small>${K.e(W("freeIn", { p: 20 }))}</small>
        <span class="vf-wbtn"${K.attr("take")}>${K.e(W("takeThis"))}</span></div>
      <div class="vf-wtabs"><span class="on">${K.e(W("avail"))}</span><span>${K.e(W("all"))}</span></div>
      <div class="vf-wg">${(benim ? [9, 10, 11, 12] : [8, 9, 10, 11]).map(hucre).join("")}</div>`, benim ? "wmsc" : "wbsc");
}
function webOnay(K) {
  const { W } = hazirla(K);
  return webKabuk(K, `<div class="vf-wblk"><b class="pg2">${K.e(W("pagesRange", { a: 141, b: 160 }))}</b><small>${K.e(W("pageCount", { p: 20 }))}</small></div>
      <small class="vf-wmsg">${K.e(W("amountLbl"))}</small>
      <div class="vf-wamt">${[5, 10, 15, 20].map((n) => `<span class="${n === 20 ? "on" : ""}">${n}</span>`).join("")}</div>
      <small class="vf-wmsg">${K.e(W("confirmQ"))}</small>
      <span class="vf-wbtn"${K.attr("wConfirm")}>${K.e(W("confirm"))}</span><span class="vf-wbtn gh">${K.e(W("cancel"))}</span>`, "wcsc");
}
function webTamam(K) {
  const { W, WR } = hazirla(K);
  return webKabuk(K, `<b class="vf-wok">${K.e(W("entrusted", { a: 141, b: 160 }))}</b><small class="vf-wmsg">${K.e(W("mayAccept"))}</small>
      <span class="vf-wbtn"${K.attr("readNow")}>${K.ic("book")}${K.e(WR("readNow"))}</span>
      <small class="vf-wmsg">${K.e(W("another"))}</small><span class="vf-wbtn gh">${K.e(W("takeAnother"))}</span>
      <div class="vf-wrec"><small>${K.e(W("keepLink"))}</small><span class="vf-wbtn gh sm">${K.e(W("copy"))}</span></div>`, "wdsc");
}

/** Adim 4 sahnesi: ad ve ithaf yazilir, Halkayi Olustur, halka ekrani. Ornek ORN'den. */
function ithafSahne(K) {
  return K.telefon({
    aria: `${K.L("event.titleLabel")} › ${K.L("event.dedicationLabel")} › ${K.L("event.create")}`,
    views: [["w4", sihirbaz4(K)], ["reg", kayit(K), "fade"]],
    tl: [["w", 800], ["tap", "tname"], ["type", "tname", hazirla(K).V.title], ["w", 300], ["tap", "tded"], ["type", "tded", hazirla(K).V.ded],
      ["on", "sumDed", "on"], ["w", 1300], ["tap", "create"], ["go", "reg"], ["w", 2200]],
    still: 7, hint: "tded",
  });
}

/** Giris filmi govdesi. Ornek ORN'den. */
function filmSahne(K) {
  const { V } = hazirla(K);
  return K.telefon({
    size: "lg",
    aria: `${K.L("event.createMenuTitle")} › ${K.L("event.typeQuran")} › ${K.L("event.distPool")} › ${K.L("event.endDate")} › ${K.L("event.dedicationLabel")} › ${K.L("event.create")} › ${K.L("event.startNow")} › ${K.L("event.inviteFriends")}`,
    views: [["l", halkalar(K)], ["w1", sihirbaz1(K), "up"], ["w2", sihirbaz2(K), "push"], ["w3", sihirbaz3(K), "push"], ["w4", sihirbaz4(K), "push"],
      ["reg", kayit(K), "fade"], ["act", aktif(K, { admin: true, prog: [0, 0, 0, 604], cd: hazirla(K).kalanGun(6), cuz: [1, 2, 3, 4, 5, 6] }), "fade"],
      ["h", aktif(K, { tab: "h", admin: true }), "fade"]],
    overlays: [["a", halkaEkle(K), "top"], ["cf", baslatOnay(K), "pop"], ["sh", paylas(K), "sheet"]],
    tl: [["w", 900], ["tap", "plus"], ["ov", "a"], ["w", 700], ["tap", "oneTime"], ["cl", "a"], ["go", "w1"], ["w", 500],
      ["tap", "tq"], ["on", "tq", "on"], ["on", "next1", "en"], ["tap", "next1"], ["go", "w2"], ["w", 500],
      ["tap", "dPool"], ["on", "dPool", "on"], ["off", "dAuto", "on"], ["w", 400], ["tap", "next2"], ["go", "w3"], ["w", 500],
      ["tap", "endIn"], ["on", "wheel", "on"], ["w", 500], ["on", "wheel", "spin"], ["txt", "endTx", V.end], ["w", 700], ["off", "wheel", "on"], ["tap", "next3"], ["go", "w4"], ["w", 400],
      ["tap", "tname"], ["type", "tname", V.title], ["tap", "tded"], ["type", "tded", V.ded], ["on", "sumDed", "on"], ["w", 600], ["tap", "create"], ["go", "reg"], ["w", 900],
      ["tap", "startNow"], ["ov", "cf"], ["w", 900], ["tap", "cfOk"], ["cl", "cf"], ["go", "act"], ["w", 1000],
      ["tap", "tabH"], ["go", "h"], ["w", 800], ["tap", "inviteBtn"], ["ov", "sh"], ["w", 1300], ["tap", "app0"], ["w", 1800]],
    still: 0, hint: "plus",
  });
}

// ══ Sahneler ══════════════════════════════════════════════════════════════════
const ILK = (K) => ({ prog: [7, 40, 80, 484], cd: hazirla(K).kalanGun(6) });

export const SAHNE = {
  /** Halkalar › + › Halka Ekle › Tek Seferlik Halka. */
  "vf-ac": (K) => K.telefon({
    aria: `${K.L("tabs.circles")} › + › ${K.L("dashboard.addCircle")} › ${K.L("event.createMenuTitle")}`,
    views: [["l", halkalar(K)], ["w1", sihirbaz1(K), "up"]],
    overlays: [["a", halkaEkle(K), "top"]],
    tl: [["w", 800], ["tap", "plus"], ["ov", "a"], ["w", 1300], ["tap", "oneTime"], ["cl", "a"], ["go", "w1"], ["w", 1800]],
    still: 3, hint: "oneTime",
  }),

  /** Kur'an Hatmi › Devam › Ortak havuz › Devam. */
  "vf-hedef": (K) => K.telefon({
    aria: `${K.L("event.typeQuran")} › ${K.L("event.fullHatim")} › ${K.L("event.distributionLabel")}: ${K.L("event.distPool")}`,
    views: [["w1", sihirbaz1(K)], ["w2", sihirbaz2(K), "push"]],
    tl: [["w", 800], ["tap", "tq"], ["on", "tq", "on"], ["on", "next1", "en"], ["w", 500], ["tap", "next1"], ["go", "w2"], ["w", 1500],
      ["tap", "dPool"], ["on", "dPool", "on"], ["off", "dAuto", "on"], ["w", 1300], ["tap", "next2"], ["w", 700]],
    still: 11, hint: "dPool",
  }),

  /** Bitis tarihi: kutuya dokun, tekerlekten sec, Devam. */
  "vf-zaman": (K) => K.telefon({
    aria: `${K.L("event.timingTitle")} › ${K.L("event.endDate")}: ${hazirla(K).V.end}`,
    views: [["w3", sihirbaz3(K)]],
    tl: [["w", 900], ["tap", "endIn"], ["on", "endIn", "typing"], ["on", "wheel", "on"], ["w", 900], ["on", "wheel", "spin"], ["w", 700],
      ["txt", "endTx", hazirla(K).V.end], ["w", 900], ["off", "endIn", "typing"], ["off", "wheel", "on"], ["w", 500], ["tap", "next3"], ["w", 700]],
    still: 8, hint: "endIn",
  }),

  /** Halka adi + ithaf › ozet › Halkayi Olustur › halka ekrani (kandil ornegi). */
  "vf-ithaf": (K) => ithafSahne(K),
  /** Ayni adim, vefat eden bir yakin icin yazilan ithafla. */
  "vf-ithaf-vefat": ornekle("vefat", (K) => ithafSahne(K)),

  /** Kayit asamasi › Simdi Baslat › Halkayi Baslat › aktif halka (Gorev sekmesi, havuz bos). */
  "vf-baslat": (K) => K.telefon({
    aria: `${K.L("event.registrationOpen")} › ${K.L("event.startNow")} › ${K.L("event.startConfirmTitle")} › ${K.L("event.poolCuzTitle")}`,
    views: [["reg", kayit(K)], ["act", aktif(K, { admin: true, prog: [0, 0, 0, 604], cd: hazirla(K).kalanGun(6), cuz: [1, 2, 3, 4, 5, 6] }), "fade"]],
    overlays: [["cf", baslatOnay(K), "pop"]],
    tl: [["w", 1400], ["tap", "startNow"], ["ov", "cf"], ["w", 1500], ["tap", "cfOk"], ["cl", "cf"], ["go", "act"], ["w", 2600]],
    still: 0, hint: "startNow",
  }),

  /** Halka sekmesi › Davet Et › paylasim sayfasi. */
  "vf-davet": (K) => K.telefon({
    aria: `${K.L("event.tabCircle")} › ${K.L("event.inviteFriends")} › ${K.L("a11y.share")}`,
    views: [["g", aktif(K, { admin: true, prog: [0, 0, 0, 604], cd: hazirla(K).kalanGun(6), cuz: [1, 2, 3, 4, 5, 6] })], ["h", aktif(K, { tab: "h", admin: true }), "fade"]],
    overlays: [["sh", paylas(K), "sheet"]],
    tl: [["w", 900], ["tap", "tabH"], ["go", "h"], ["w", 1200], ["tap", "inviteBtn"], ["ov", "sh"], ["w", 1500], ["tap", "app0"], ["w", 500], ["cl", "sh"], ["w", 1200]],
    still: 4, hint: "inviteBtn",
  }),

  /** Uye: davet karti › Katil › Adin ne? › Cuz Havuzu › Cuz 7 › Tum cuzu al › Gorevin. */
  "vf-katil": (K) => K.telefon({
    aria: `${K.L("joinGroup.join")} › ${K.L("nameSheet.title")} › ${K.L("event.poolCuzTitle")} › ${K.L("event.takeWholeCuz")} › ${K.L("event.myTask")}`,
    views: [["j", davetOnizleme(K)], ["g", aktif(K, { ...ILK(K), my: "gizli", gizli: 13 }), "push"]],
    overlays: [["n", K.O.nameSheet(), "pop"], ["m", cuzPenceresi(K), "pop"]],
    tl: [["w", 900], ["tap", "joinBtn"], ["ov", "n"], ["w", 400], ["tap", "name"], ["type", "name", K.X.member], ["on", "nameOk", "en"], ["w", 300], ["tap", "nameOk"], ["cl", "n"], ["go", "g"],
      ["w", 900], ["y", "gsc", 7], ["w", 900], ["tap", "c7"], ["ov", "m"], ["w", 1300], ["tap", "whole"], ["cl", "m"],
      ["on", "c7", "gone"], ["off", "c13", "vf-x"], ["on", "mytask", "on"], ["st", "pbH", "width", "16.6%"], ["txt", "lgH", K.L("event.statPagesReading", { n: 100 })], ["txt", "lgF", K.L("event.statPagesLeft", { n: 464 })],
      ["w", 700], ["y", "gsc", 4], ["w", 2200]],
    still: 0, hint: "joinBtn",
  }),

  /** Uye: Oku › okuyucu › geri › Tamamla › Okundu olarak isaretle. */
  "vf-oku": (K) => {
    const once = { prog: [7, 40, 100, 464], cd: hazirla(K).kalanGun(2), my: "on", cuz: [8, 9, 10, 11, 12, 13] };
    return K.telefon({
      aria: `${K.L("event.read")} › ${K.L("event.done")} › ${K.L("event.completeConfirmTitle")}`,
      views: [["g", aktif(K, { ...once, sc: "gsc1" })], ["rd", K.V.reader("١٢١"), "push"], ["g2", aktif(K, { ...once, sc: "gsc2", toast: true }), "back"]],
      overlays: [["cc", tamamlaOnay(K), "pop"]],
      tl: [["w", 700], ["y", "gsc1", 4], ["txt", "pgn", "١٢١"], ["y", "gsc2", 4], ["w", 900], ["tap", "readBtn"], ["go", "rd"], ["w", 600],
        ["st", "rprog", "width", "35%"], ["txt", "pgn", "١٢٨"], ["w", 650], ["st", "rprog", "width", "70%"], ["txt", "pgn", "١٣٤"], ["w", 650], ["st", "rprog", "width", "100%"], ["txt", "pgn", "١٤٠"], ["w", 700],
        ["go", "g2"], ["w", 800], ["tap", "doneBtn"], ["ov", "cc"], ["w", 1100], ["tap", "ccOk"], ["cl", "cc"],
        ["on", "toast", "show"], ["on", "myrow", "dn"], ["on", "mydone", "on"],
        ["st", "pbD", "width", "9.9%"], ["st", "pbH", "width", "13.2%"], ["txt", "pct", K.L("common.percent", { n: 10 })],
        ["txt", "lgD", K.L("event.statPagesRead", { n: 60 })], ["txt", "lgH", K.L("event.statPagesReading", { n: 80 })], ["w", 2600]],
      still: 4, hint: "readBtn",
    });
  },

  /** Uygulamasi olmayan: tarayicida halka sayfasi › Bunu al › onay › emanet edildi. */
  "vf-web": (K) => K.telefon({
    aria: `manevihalka.app › ${hazirla(K).W("takeThis")} › ${hazirla(K).W("confirm")} › ${hazirla(K).W("entrusted", { a: 141, b: 160 })}`,
    views: [["b", webPano(K)], ["c", webOnay(K), "push"], ["d", webTamam(K), "push"]],
    tl: [["w", 2000], ["tap", "take"], ["go", "c"], ["w", 1300], ["tap", "wConfirm"], ["go", "d"], ["w", 2600]],
    still: 0, hint: "take",
  }),

  /** Tarayicida: Aldigin bolumler › Tamamladim › istersen adini yaz. */
  "vf-web-bitir": (K) => K.telefon({
    aria: `${hazirla(K).W("myLbl")} › ${hazirla(K).W("markDone")} › ${hazirla(K).W("nAsk")}`,
    views: [["m", webPano(K, { benim: true })]],
    tl: [["w", 900], ["y", "wmsc", 9], ["w", 900], ["tap", "wDone"], ["on", "mrow", "ok"], ["w", 1100], ["tap", "nIn"], ["type", "nIn", hazirla(K).V.guest],
      ["w", 300], ["tap", "nSave"], ["on", "nbox", "saved"], ["w", 2200]],
    still: 2, hint: "wDone",
  }),

  /** Yonetici: Halka sekmesi › Yonetim › Sureyi 24 saat uzat › Gorev sekmesinde bitis 24 saat ileri. */
  "vf-uzat": (K) => {
    const { kalan } = hazirla(K);
    const ortak = { admin: true, prog: [86, 520, 64, 20], cuz: [30, 1, 2, 3, 4, 5], full: [1, 2, 3, 4, 5] };
    return K.telefon({
      aria: `${K.L("event.tabCircle")} › ${K.L("event.adminControls")} › ${K.L("event.extend24h")} › ${K.L("event.endsIn", { d: kalan(1, 8) })}`,
      views: [["g", aktif(K, { ...ortak, cd: kalan(0, 8, 40), sc: "gsc1" })], ["h", aktif(K, { tab: "h", admin: true, misafir: true }), "fade"],
        ["g2", aktif(K, { ...ortak, cd: kalan(1, 8), sc: "gsc2" }), "fade"]],
      tl: [["w", 900], ["tap", "tabH"], ["go", "h"], ["w", 700], ["y", "hsc", 30], ["w", 1200], ["tap", "extend"], ["w", 500], ["y", "hsc", 0], ["w", 800],
        ["tap", "tabG"], ["go", "g2"], ["w", 600], ["on", "cd", "vf-flash"], ["w", 2200]],
      still: 5, hint: "extend",
    });
  },

  /** Hatim bitince: Ortak Ilerleme %100, butun cuzler dolu (durum "Devam ediyor" kalir). */
  "vf-ilerleme": (K) => K.telefon({
    aria: `${K.L("event.collectiveProgress")}: ${K.L("common.percent", { n: 100 })}`,
    views: [["g", aktif(K, { prog: [86, 520, 64, 20], cd: hazirla(K).kalan(0, 9, 15), cuz: [30, 1, 2, 3, 4, 5], full: [1, 2, 3, 4, 5], gizli: 6 })]],
    tl: [["w", 1600],
      ["st", "pbD", "width", "96.7%"], ["st", "pbH", "width", "3.3%"], ["txt", "pct", K.L("common.percent", { n: 97 })],
      ["txt", "lgD", K.L("event.statPagesRead", { n: 584 })], ["txt", "lgH", K.L("event.statPagesReading", { n: 20 })], ["txt", "lgF", K.L("event.statPagesLeft", { n: 0 })], ["on", "c30", "gone"], ["off", "c6", "vf-x"], ["on", "cg", "allfull"], ["w", 1400],
      ["st", "pbD", "width", "100%"], ["st", "pbH", "width", "0%"], ["txt", "pct", K.L("common.percent", { n: 100 })],
      ["txt", "lgD", K.L("event.statPagesRead", { n: 604 })], ["txt", "lgH", K.L("event.statPagesReading", { n: 0 })], ["w", 2600]],
    still: 17, hint: "pct",
  }),

  /** Giris filmi (genel, kandil ornegi): Halkalar'dan baslatilan ve paylasilan hatme kadar tek akis. */
  "film-tek": (K) => filmSahne(K),
  /** Ayni film, vefat eden bir yakin icin hatim ornegiyle (eski sayfa adi; yeni icerikte film-tek kullan). */
  "film-vefat": ornekle("vefat", (K) => filmSahne(K)),
};

export const IKON = IKON_VF;

export const CSS = `
.mp .ic.vf-dn { transform: rotate(90deg); }
.mp-s .vf-clip { gap: 0; }
.mp-s .vf-in { display: flex; flex-direction: column; gap: .62em; }
.mp-s .vf-wclip { flex: 1; min-height: 0; overflow: hidden; }
.mp-s .vf-ttl { display: flex; align-items: center; justify-content: space-between; gap: .5em; }
.mp-s .vf-ttl .t1 { font-size: 1.62em; }
.mp-s .vf-hb { display: flex; align-items: center; gap: .55em; color: var(--a-mut); }
.mp-s .vf-hb > .ic { width: 1.5em; height: 1.5em; }
.mp-s .vf-plus { width: 2.35em; height: 2.35em; border-radius: 50%; background: var(--a-pri); color: var(--a-on); display: grid; place-items: center; }
.mp-s .vf-crow { display: flex; align-items: center; gap: .7em; }
.mp-s .vf-crow > div { flex: 1; min-width: 0; }
.mp-s .vf-crow b { display: block; font-size: .95em; }
.mp-s .vf-crow small { display: block; color: var(--a-mut); font-size: .72em; }
.mp-s .vf-crow > .ic { color: var(--a-mut); }
.mp-s .vf-ghost { display: flex; align-items: center; justify-content: center; gap: .4em; border: .12em dashed var(--a-line); border-radius: 1em; padding: .9em; color: var(--a-mut); font-size: .82em; font-weight: 600; }
.mp-s .vf-top { position: absolute; left: 0; right: 0; top: 0; background: var(--a-card); border-radius: 0 0 1.6em 1.6em; padding: 3.5em 1.05em .7em; display: flex; flex-direction: column; gap: .55em;
  transform: translateY(-102%); transition: transform .45s cubic-bezier(.2, .85, .25, 1); box-shadow: 0 1em 2.5em -1.2em rgba(0, 0, 0, .35); }
.mp-s .ov.on .vf-top { transform: none; }
.mp-s .vf-top > b { text-align: center; font-size: 1.2em; margin-bottom: .2em; }
.mp-s .vf-top .grab { margin: .3em auto 0; }
.mp-s .vf-opt { display: flex; align-items: center; gap: .65em; background: var(--a-soft); border: 1px solid var(--a-line); border-radius: 1em; padding: .7em .75em; }
.mp-s .vf-opt > div { flex: 1; min-width: 0; }
.mp-s .vf-opt b { display: block; font-size: .86em; }
.mp-s .vf-opt small { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; color: var(--a-mut); font-size: .66em; margin-top: .1em; }
.mp-s .vf-opt > .ic { color: var(--a-mut); }
.mp-s .vf-oi { width: 2.5em; height: 2.5em; border-radius: .75em; background: var(--a-pri); color: var(--a-card); display: grid; place-items: center; flex: none; }
.mp-s .vf-opt .sk { display: block; height: .42em; width: 88%; border-radius: .3em; background: var(--a-line); margin-top: .45em; }
.mp-s .vf-opt .sk.s2 { width: 62%; margin-top: .3em; }
.mp-s .vf-dots { display: flex; justify-content: center; gap: .32em; padding: .55em 0 .1em; }
.mp-s .vf-dots i { width: .45em; height: .45em; border-radius: 1em; background: var(--a-line); transition: width .3s ease; }
.mp-s .vf-dots i.on { background: var(--a-pri); }
.mp-s .vf-dots i.cur { width: 1.25em; }
.mp-s .vf-wz { padding-bottom: 5.6em; gap: .55em; }
.mp-s .vf-foot { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; padding: .2em 1.15em 1.3em; background: var(--a-bg); border-top: 1px solid var(--a-line); }
.mp-s .vf-type { display: flex; align-items: center; gap: .65em; background: var(--a-card); border: 1px solid var(--a-line); border-radius: 1em; padding: .7em .8em; }
.mp-s .vf-type > .ic:first-child { width: 1.75em; height: 1.75em; color: var(--a-mut); }
.mp-s .vf-type > div { flex: 1; min-width: 0; }
.mp-s .vf-type b { display: block; font-size: .88em; }
.mp-s .vf-type small { display: block; color: var(--a-mut); font-size: .66em; }
.mp-s .vf-type .vf-ok { color: var(--a-pri); opacity: 0; transition: opacity .25s ease; }
.mp-s .vf-type.on { box-shadow: inset 0 0 0 .13em var(--a-pri); border-color: transparent; }
.mp-s .vf-type.on > .ic:first-child { color: var(--a-pri); }
.mp-s .vf-type.on .vf-ok { opacity: 1; }
.mp-s .vf-type.skel > i { display: block; width: 1.75em; height: 1.75em; border-radius: .5em; background: var(--a-line); flex: none; }
.mp-s .vf-type.skel div i { display: block; height: .5em; width: 45%; border-radius: .3em; background: var(--a-line); }
.mp-s .vf-type.skel div i + i { width: 78%; height: .4em; margin-top: .4em; }
.mp-s .vf-rd { display: flex; gap: .6em; align-items: flex-start; background: var(--a-card); border: 1px solid var(--a-line); border-radius: 1em; padding: .65em .8em; transition: box-shadow .25s ease; }
.mp-s .vf-rd > i { position: relative; width: 1.15em; height: 1.15em; border-radius: 50%; box-shadow: inset 0 0 0 .13em var(--a-tg); flex: none; margin-top: .05em; }
.mp-s .vf-rd > i::after { content: ""; position: absolute; inset: .3em; border-radius: 50%; background: var(--a-pri); opacity: 0; transition: opacity .2s ease; }
.mp-s .vf-rd.on { box-shadow: inset 0 0 0 .13em var(--a-pri); border-color: transparent; }
.mp-s .vf-rd.on > i { box-shadow: inset 0 0 0 .13em var(--a-pri); }
.mp-s .vf-rd.on > i::after { opacity: 1; }
.mp-s .vf-rd > div { min-width: 0; }
.mp-s .vf-rd b { display: block; font-size: .86em; }
.mp-s .vf-rd small { display: block; color: var(--a-mut); font-size: .66em; }
.mp-s .vf-wn { display: flex; gap: .35em; align-items: flex-start; color: var(--a-mut); font-size: .62em; margin-top: .4em; }
.mp-s .vf-wn .ic { width: 1.15em; height: 1.15em; }
.mp-s .vf-pill { display: flex; align-items: center; gap: .45em; background: var(--a-soft); color: var(--a-pri); border-radius: .8em; padding: .5em .75em; font-size: .7em; font-weight: 600; }
.mp-s .vf-date { gap: .5em; }
.mp-s .vf-date .ic { color: var(--a-pri); }
.mp-s .vf-wheel { position: relative; display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: .2em; padding: 0 .5em; border-radius: 1em; background: var(--a-card); border: 1px solid var(--a-line);
  max-height: 0; opacity: 0; overflow: hidden; transition: max-height .45s ease, opacity .3s ease, padding .3s ease; }
.mp-s .vf-wheel.on { max-height: 6em; opacity: 1; padding: .45em .5em; }
.mp-s .vf-wheel::before { content: ""; position: absolute; left: .4em; right: .4em; top: 50%; height: 1.6em; transform: translateY(-50%); border-radius: .5em; background: var(--a-soft); }
.mp-s .vf-wheel > span { position: relative; display: flex; flex-direction: column; align-items: center; gap: .3em; font-size: .78em; transition: transform .5s ease; }
.mp-s .vf-wheel.spin > span { animation: vfspin .6s ease; }
@keyframes vfspin { 0% { transform: translateY(-1.2em); } 100% { transform: none; } }
.mp-s .vf-wheel i { font-style: normal; color: var(--a-mut); opacity: .55; }
.mp-s .vf-hint { font-size: .66em; margin-top: -.2em; }
.mp-s .vf-chk > .ic { color: var(--a-mut); align-self: flex-start; }
.mp-s .vf-chk small { display: -webkit-box !important; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.mp-s .vf-sum { padding: .2em .85em; }
.mp-s .vf-sum .r { display: flex; align-items: center; gap: .45em; padding: .45em 0; border-bottom: 1px solid var(--a-line); font-size: .76em; }
.mp-s .vf-sum .r:last-child { border-bottom: 0; }
.mp-s .vf-sum .r .ic { color: var(--a-pri); width: 1.15em; height: 1.15em; }
.mp-s .vf-sum .r small { color: var(--a-mut); font-size: 1em; }
.mp-s .vf-sum .r b { margin-inline-start: auto; font-weight: 600; max-width: 62%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mp-s .vf-sum .r.ded { display: none; }
.mp-s .vf-sum .r.ded.on { display: flex; animation: vfin .45s ease; }
@keyframes vfin { from { opacity: 0; transform: translateY(.4em); } to { opacity: 1; transform: none; } }
.mp-s .vf-hero { position: relative; display: flex; flex-direction: column; align-items: center; gap: .25em; text-align: center; padding: .8em .9em .75em; }
.mp-s .vf-hero > .ic { width: 2.1em; height: 2.1em; color: var(--a-pri); }
.mp-s .vf-hero > b { font-size: 1.05em; }
.mp-s .vf-edit { position: absolute; top: .65em; inset-inline-end: .75em; color: var(--a-pri); }
.mp-s .vf-ded { display: flex; align-items: center; gap: .3em; font-style: italic; color: var(--a-mut); font-size: .74em; }
.mp-s .vf-ded .ic { color: var(--a-gold); width: 1.05em; height: 1.05em; }
.mp-s .vf-badge { display: inline-flex; align-items: center; gap: .35em; margin-top: .25em; padding: .25em .7em; border-radius: 1em; background: var(--a-soft); color: var(--a-pri); font-size: .7em; font-weight: 700; }
.mp-s .vf-badge::before { content: ""; width: .45em; height: .45em; border-radius: 50%; background: currentColor; }
.mp-s .vf-badge.reg { background: color-mix(in srgb, var(--a-gold) 18%, transparent); color: var(--a-gold); }
.mp-s .vf-inv { display: flex; flex-direction: column; gap: .45em; }
.mp-s .vf-inv > b { font-size: .95em; }
.mp-s .vf-ir { display: flex; align-items: center; gap: .5em; }
.mp-s .vf-ir + .vf-ir { border-top: 1px solid var(--a-line); padding-top: .45em; }
.mp-s .vf-ir > div { flex: 1; min-width: 0; }
.mp-s .vf-ir small { display: block; color: var(--a-mut); font-size: .68em; }
.mp-s .vf-code { display: block; color: var(--a-pri); font-size: 1.32em; font-weight: 800; letter-spacing: .12em; }
.mp-s .vf-link { display: block; font-size: .68em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: start; }
.mp-s .vf-cp { width: 2.2em; height: 2.2em; border-radius: .6em; background: var(--a-soft); color: var(--a-pri); display: grid; place-items: center; flex: none; }
.mp-s .vf-share { display: flex; align-items: center; justify-content: center; gap: .4em; height: 2.6em; border-radius: .8em; box-shadow: inset 0 0 0 .13em var(--a-pri); color: var(--a-pri); font-weight: 700; font-size: .86em; }
.mp-s .vf-reg { display: flex; flex-direction: column; gap: .35em; }
.mp-s .vf-regh { display: flex; align-items: center; gap: .4em; font-size: .88em; }
.mp-s .vf-regh .ic { color: var(--a-gold); }
.mp-s .vf-reg > small { font-size: .74em; }
.mp-s .vf-ppl { align-self: flex-start; display: inline-flex; align-items: center; gap: .35em; padding: .35em .75em; border-radius: 1em; background: var(--a-soft); color: var(--a-pri); font-size: .72em; font-weight: 700; }
.mp-s .vf-ppl .ic { width: 1.1em; height: 1.1em; }
.mp-s .vf-red { display: flex; align-items: center; justify-content: center; gap: .35em; color: var(--a-red); font-size: .8em; font-weight: 600; padding: .2em 0 .6em; }
.mp-s .vf-prog .row.sp b { font-size: .88em; }
.mp-s .vf-pct { color: var(--a-pri); }
.mp-s .vf-bar { display: flex; height: .5em; border-radius: 1em; background: var(--a-line); overflow: hidden; margin: .55em 0 .45em; }
.mp-s .vf-bar i { display: block; height: 100%; transition: width .9s ease; }
.mp-s .vf-bar .d { background: var(--a-pri); }
.mp-s .vf-bar .h { background: var(--a-gold); }
.mp-s .vf-leg { display: flex; flex-wrap: wrap; gap: .1em .35em; font-size: .62em; font-weight: 600; }
.mp-s .vf-leg .d { color: var(--a-pri); } .mp-s .vf-leg .h { color: var(--a-gold); } .mp-s .vf-leg .f { color: var(--a-mut); }
.mp-s .vf-cd { display: flex; align-items: center; gap: .3em; color: var(--a-mut); font-size: .66em; margin-top: .4em; }
.mp-s .vf-cd .ic { width: 1.1em; height: 1.1em; }
.mp-s .vf-cd .vf-flash { color: var(--a-pri); font-weight: 700; animation: vfin .5s ease; }
.mp-s .vf-my { display: none; }
.mp-s .vf-my.on { display: block; animation: vfin .5s ease; }
.mp-s .vf-my > b { display: block; font-size: .9em; margin-bottom: .2em; }
.mp-s .vf-ur { display: flex; align-items: center; gap: .45em; padding: .5em 0 .1em; border-top: 1px solid var(--a-line); font-size: .82em; }
.mp-s .vf-ur > span { flex: 1; min-width: 0; }
.mp-s .vf-ur > .ic { color: var(--a-pri); }
.mp-s .vf-ur .bt { flex: none; height: 2.2em; font-size: .78em; padding: 0 .85em; }
.mp-s .vf-ur.dn { display: none; }
.mp-s .vf-dt { display: none; align-items: center; gap: .4em; color: var(--a-mut); font-size: .76em; padding-top: .5em; border-top: 1px solid var(--a-line); }
.mp-s .vf-dt.on { display: flex; animation: vfin .5s ease; }
.mp-s .vf-dt > span { flex: 1; }
.mp-s .vf-ph { display: flex; align-items: center; justify-content: space-between; gap: .4em; margin-bottom: .55em; }
.mp-s .vf-ph b { font-size: .9em; }
.mp-s .vf-ser { display: inline-flex; align-items: center; gap: .2em; padding: .25em .6em; border-radius: .7em; box-shadow: inset 0 0 0 .1em var(--a-pri); color: var(--a-pri); font-size: .66em; font-weight: 700; }
.mp-s .vf-ser .ic { width: 1em; height: 1em; }
.mp-s .vf-cg { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .4em; }
.mp-s .vf-cz { border: .11em solid var(--a-pri); border-radius: .7em; padding: .45em .25em .4em; text-align: center; background: var(--a-card); min-width: 0; }
.mp-s .vf-cz b { display: block; color: var(--a-pri); font-size: .8em; }
.mp-s .vf-cz small { display: block; color: var(--a-mut); font-size: .54em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mp-s .vf-cz > i { display: block; height: .22em; border-radius: 1em; background: var(--a-line); margin-top: .3em; }
.mp-s .vf-cz .fl { display: none; }
.mp-s .vf-cz.gone, .mp-s .vf-cz.vf-x { display: none; }
.mp-s .vf-cg.allfull .vf-cz, .mp-s .vf-cz.full { border-color: var(--a-line); background: var(--a-in); }
.mp-s .vf-cg.allfull .vf-cz b, .mp-s .vf-cz.full b { color: var(--a-mut); }
.mp-s .vf-cg.allfull .vf-cz .fr, .mp-s .vf-cz.full .fr { display: none; }
.mp-s .vf-cg.allfull .vf-cz .fl, .mp-s .vf-cz.full .fl { display: block; }
.mp-s .vf-note { display: flex; gap: .5em; align-items: flex-start; padding: .65em .8em; border-radius: .9em; background: var(--a-soft); box-shadow: inset 0 0 0 .1em var(--a-pri); color: var(--a-pri); font-size: .72em; }
.mp-s .vf-ppl2 .vf-lh { display: block; padding: .7em .9em .3em; font-size: .9em; }
.mp-s .vf-ppl2 .li, .mp-s .vf-adm .li { justify-content: flex-start; }
.mp-s .vf-ppl2 .li > div { flex: 1; min-width: 0; }
.mp-s .vf-ppl2 .li b { display: block; color: var(--a-ink); font-size: .92em; font-weight: 600; }
.mp-s .vf-ppl2 .li small { display: block; color: var(--a-mut); font-size: .74em; }
.mp-s .vf-ppl2 .av { box-shadow: none; background: var(--a-soft); color: var(--a-pri); }
.mp-s .vf-dot { width: .5em; height: .5em; border-radius: 50%; background: var(--a-gold); flex: none; }
.mp-s .vf-dot.ok { background: var(--a-pri); }
.mp-s .vf-dot.gr { background: var(--a-line); }
.mp-s .vf-ppl2 .li .vf-pp { display: inline; flex: none; color: var(--a-mut); font-size: .7em; margin-inline-start: .3em; }
.mp-s .vf-mp { flex: none; display: inline-flex; align-items: center; gap: .2em; padding: .2em .5em; border-radius: 1em; background: var(--a-soft); color: var(--a-pri); font-size: .68em; font-weight: 700; }
.mp-s .vf-mp .ic { width: 1em; height: 1em; }
.mp-s .vf-adm .vf-lh { display: block; padding: .7em .9em .3em; font-size: .9em; }
.mp-s .vf-adm .li > span { flex: 1; }
.mp-s .vf-adm .li > .ic:first-child { color: var(--a-pri); }
.mp-s .vf-adm .li.red, .mp-s .vf-adm .li.red > .ic:first-child { color: var(--a-red); }
.mp-s .vf-toast { position: absolute; z-index: 8; top: .5em; left: 50%; width: max-content; max-width: 88%; transform: translate(-50%, -1.6em); opacity: 0; display: flex; align-items: center; gap: .4em;
  background: var(--a-card); color: var(--a-ink); border: 1px solid var(--a-line); border-radius: 2em; padding: .55em .9em; font-size: .7em; font-weight: 600; box-shadow: 0 .6em 1.4em -.7em rgba(0, 0, 0, .35); transition: opacity .35s ease, transform .45s cubic-bezier(.2, 1.1, .3, 1); }
.mp-s .vf-toast.show { opacity: 1; transform: translate(-50%, 0); }
.mp-s .vf-toast .ic { color: var(--a-pri); }
.mp-s .vf-jpg { justify-content: center; }
.mp-s .vf-join { display: flex; flex-direction: column; align-items: center; gap: .35em; text-align: center; padding: 1.4em 1.1em 1.1em; }
.mp-s .vf-join > .ic { width: 2.6em; height: 2.6em; color: var(--a-pri); }
.mp-s .vf-join .cap { color: var(--a-pri); }
.mp-s .vf-join > b { font-size: 1.15em; }
.mp-s .vf-join > small { font-size: .76em; }
.mp-s .vf-join .bt { margin-top: .6em; }
.mp-s .vf-claim { gap: .55em; }
.mp-s .vf-rg { display: flex; align-items: center; gap: .4em; }
.mp-s .vf-rg .in { flex: 1; min-width: 0; font-size: .8em; }
.mp-s .vf-wv { position: absolute; inset: 0; display: flex; flex-direction: column; background: var(--page); color: var(--ink); font-family: var(--sans); }
.mp-s .vf-url { flex: none; align-self: center; display: flex; align-items: center; gap: .35em; margin: .25em 0 .1em; padding: .4em 1.1em; border-radius: .8em; background: color-mix(in srgb, var(--ink) 7%, transparent); color: var(--muted); font-size: .7em; }
.mp-s .vf-url .ic { width: 1em; height: 1em; }
.mp-s .vf-wb { display: flex; flex-direction: column; gap: .65em; padding: .5em 1.05em 1.4em; overflow: visible; }
.mp-s .vf-wbr { display: flex; align-items: center; gap: .4em; font-family: var(--display); font-size: .9em; }
.mp-s .vf-wbr .bri { width: 1.7em; height: 1.7em; border-radius: .45em; }
.mp-s .vf-wh { display: flex; flex-direction: column; align-items: center; gap: .2em; text-align: center; padding: .2em 0; }
.mp-s .vf-wh .ey { font-size: .58em; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); }
.mp-s .vf-wh > b { font-family: var(--display); font-weight: 400; font-size: 1.45em; line-height: 1.15; }
:root[lang="ar"] .mp-s .vf-wh .ey { letter-spacing: 0; text-transform: none; font-size: .7em; }
:root[lang="ar"] .mp-s .vf-wh > b { font-family: inherit; font-weight: 700; line-height: 1.35; }
.mp-s .vf-wh .ru { display: block; width: 2.4em; height: 1px; background: var(--gold-soft); margin: .4em 0 .25em; }
.mp-s .vf-wh small { color: var(--body); font-size: .8em; }
.mp-s .vf-wh small.dt { color: var(--muted); font-size: .66em; }
.mp-s .vf-wp { background: var(--paper); border: 1px solid var(--line); border-radius: 1.2em; padding: .85em .9em; display: flex; flex-direction: column; gap: .4em; }
.mp-s .vf-wb .hd2 { display: block; text-align: center; font-size: .58em; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); }
:root[lang="ar"] .mp-s .vf-wb .hd2 { letter-spacing: 0; text-transform: none; font-size: .68em; }
.mp-s .vf-wbar { display: flex; height: .42em; border-radius: 1em; background: color-mix(in srgb, var(--ink) 8%, var(--paper)); overflow: hidden; }
.mp-s .vf-wbar i, .mp-s .vf-wlg i { display: block; background: color-mix(in srgb, var(--ink) 8%, var(--paper)); }
.mp-s .vf-wbar .d, .mp-s .vf-wlg i.d { background: var(--green-2); }
.mp-s .vf-wbar .h, .mp-s .vf-wlg i.h { background: color-mix(in srgb, var(--green-2) 42%, var(--paper)); }
.mp-s .vf-wlg { display: flex; justify-content: center; flex-wrap: wrap; gap: .15em .7em; font-size: .6em; color: var(--body); }
.mp-s .vf-wlg span { display: inline-flex; align-items: center; gap: .35em; }
.mp-s .vf-wlg i { width: .6em; height: .6em; border-radius: 50%; }
.mp-s .vf-wsg { display: flex; flex-direction: column; align-items: center; gap: .3em; text-align: center; background: var(--mint); border-radius: 1.1em; padding: .9em; }
.mp-s .vf-wsg .cz { font-size: 1.25em; font-weight: 600; color: var(--green); }
.mp-s .vf-wsg > small:not(.hd2) { color: var(--body); font-size: .72em; }
.mp-s .vf-wbtn { display: flex; align-items: center; justify-content: center; gap: .4em; width: 100%; min-height: 2.6em; padding: .3em .8em; border-radius: .8em; background: var(--green-2); color: var(--paper); font-weight: 700; font-size: .84em; text-align: center; transition: transform .12s ease; }
.mp-s .vf-wbtn.gh { background: transparent; color: var(--green); box-shadow: inset 0 0 0 1px var(--line); }
.mp-s .vf-wbtn.sm { min-height: 2.2em; font-size: .74em; }
.mp-s .vf-wbtn .ic { width: 1.1em; height: 1.1em; }
.mp-s .vf-wtabs { display: flex; gap: .4em; justify-content: center; font-size: .7em; font-weight: 600; }
.mp-s .vf-wtabs span { padding: .35em .9em; border-radius: 1em; box-shadow: inset 0 0 0 1px var(--line); color: var(--body); }
.mp-s .vf-wtabs .on { background: var(--green-2); color: var(--paper); box-shadow: none; }
.mp-s .vf-wg { display: grid; grid-template-columns: 1fr 1fr; gap: .5em; }
.mp-s .vf-wcell { display: flex; flex-direction: column; align-items: center; background: var(--paper); border: 1px solid var(--line); border-radius: .95em; padding: .6em .3em; }
.mp-s .vf-wcell b { font-size: 1.35em; font-weight: 600; color: var(--green); line-height: 1; }
.mp-s .vf-wcell .u { font-size: .52em; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--gold); margin-top: .35em; }
:root[lang="ar"] .mp-s .vf-wcell .u { letter-spacing: 0; text-transform: none; }
.mp-s .vf-wcell small:not(.u) { font-size: .6em; color: var(--body); margin-top: .3em; }
.mp-s .vf-wblk { display: flex; flex-direction: column; align-items: center; gap: .2em; padding: 1em 0 .3em; }
.mp-s .vf-wblk .pg2 { font-size: 1.45em; font-weight: 600; color: var(--green); }
.mp-s .vf-wblk small { color: var(--muted); font-size: .76em; }
.mp-s .vf-wmsg { display: block; text-align: center; color: var(--body); font-size: .78em; }
.mp-s .vf-wamt { display: flex; justify-content: center; gap: .45em; }
.mp-s .vf-wamt span { min-width: 2.4em; padding: .45em .5em; text-align: center; border-radius: .7em; box-shadow: inset 0 0 0 1px var(--line); font-weight: 600; font-size: .82em; }
.mp-s .vf-wamt .on { background: var(--green-2); color: var(--paper); box-shadow: none; }
.mp-s .vf-wok { display: block; text-align: center; font-family: var(--display); font-weight: 400; font-size: 1.25em; line-height: 1.25; padding-top: 1em; }
:root[lang="ar"] .mp-s .vf-wok { font-family: inherit; font-weight: 700; }
.mp-s .vf-wrec { display: flex; flex-direction: column; gap: .45em; padding: .75em; border-radius: 1em; background: color-mix(in srgb, var(--ink) 5%, transparent); text-align: center; }
.mp-s .vf-wrec small { color: var(--body); font-size: .72em; }
.mp-s .vf-wmine .p { text-align: center; font-size: 1em; }
.mp-s .vf-wact { display: flex; gap: .45em; }
.mp-s .vf-wtick { display: none; align-items: center; justify-content: center; gap: .3em; color: var(--green); font-weight: 700; font-size: .8em; }
.mp-s .vf-wmine.ok .vf-wact { display: none; }
.mp-s .vf-wmine.ok .vf-wtick { display: flex; animation: vfin .45s ease; }
.mp-s .vf-wname { text-align: center; }
.mp-s .vf-wname > b { font-size: .86em; }
.mp-s .vf-wname > small { color: var(--body); font-size: .66em; }
.mp-s .vf-wname .in { font-size: .8em; }
.mp-s .vf-wnr { display: none; align-items: center; justify-content: space-between; gap: .5em; font-size: .8em; }
.mp-s .vf-wnr .vf-wbtn { width: auto; flex: none; }
.mp-s .vf-wname.saved > :not(.vf-wnr) { display: none; }
.mp-s .vf-wname.saved .vf-wnr { display: flex; animation: vfin .45s ease; }
@media (prefers-reduced-motion: reduce) { .mp-s .vf-wheel.spin > span { animation: none; } }
`;
