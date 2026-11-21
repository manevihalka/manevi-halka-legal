/**
 * Halkada oruc gorevi rehberinin ekranlari (2.1.0, 21 Kas 2026).
 * Akislar uygulamanin kodundan izlendi (salt okunur, SpiritualCircleApp):
 *   components/task/TaskComposer.tsx     "Halkada ne yapalim?" > Ibadet takibi > Oruc (Ramazan yaklasinca Hizli basla'da
 *                                        "Ramazan orucu" da cikar, 120 gun once; burada cizilmez)
 *   components/task/FastingComposer.tsx  kurma ekrani: onizleme, Hangi oruc / Baslangic / Bitis / Kim kimi gorur / Dua sirasi,
 *                                        kurulum notu, gorev adi, "Gorevi baslat"; Hangi oruc penceresi (Ramazan, Pzt-Per, Kendim)
 *   app/group/[id].tsx                   handleCreatePractice: tost "Ortak amel acildi...", kart "Ortak Ameller" altinda
 *   app/(tabs)/index.tsx                 Ana Sayfa "Bana dusenler": oruc gunu kart, katilmayan icin "Baslamak icin dokun"
 *   components/practice/FastingView.tsx  uyenin ekrani: katilma karti ve onay penceresi (gorunurluk + hatirlatma),
 *                                        iftara kalan sure, "Orucumu tuttum" iftarda acilir, "Allah kabul etsin",
 *                                        dua sirasi, son oruc gunleri (unutulan gun isaretlenir), Birlikte listesi
 * Ham kare yok (gallery-2026-11'de oruc ekrani cekilmedi): duzen koddan, renkler uygulamanin varsayilan temasi.
 * Fikih hukmu yok: uygulamanin "yalniz cuma" notu bilerek cizilmez (rehber hukum anlatmaz).
 * Dugme/baslik metinleri K.L("anahtar") ile uygulamadan. Uzun tire YOK.
 */
import { grupEkrani, hatimKarti, gorevKarti, secimEkrani, grupSatiri } from "./sahneler.mjs";

/** Dile gore ornek veriler: yarinin tarihi (formatDayKey), iftar saati (toLocaleTimeString 2 haneli). Uygulama metni DEGIL. */
const OX = {
  tr: { yarin: "22 Kasım", iftar: "18:24" },
  en: { yarin: "November 22", iftar: "05:31 PM" },
  de: { yarin: "22. November", iftar: "17:42" },
  fr: { yarin: "22 novembre", iftar: "18:21" },
  ar: { yarin: "22 نوفمبر", iftar: "06:10 م" },
};
// Iftar duasi uygulamanin verisinden (lib/propheticDuas.ts id "iftar"): Arapcasi, anlami, kaynak.
const IFTAR_AR = "ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ";
const IFTAR = {
  tr: ["Susuzluk gitti, damarlar ıslandı ve Allah dilerse ecir de kesinleşti.", "Ebû Dâvûd, Savm 22 (no. 2357), hasen"],
  en: ["The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.", "Abu Dawud, Fasting 22 (no. 2357), hasan"],
  de: ["Der Durst ist gewichen, die Adern sind befeuchtet, und der Lohn ist gewiss, so Allah will.", "Abu Dawud, Fasten 22 (Nr. 2357), hasan"],
  fr: ["La soif est partie, les veines se sont humectées et la récompense est acquise, si Allah le veut.", "Abou Dawoud, Jeûne 22 (n° 2357), hasan"],
  ar: [null, "أبو داود، الصوم 22 (رقم 2357)، حسن"],
};
const GUN = 12; // Ramazan'in kacinci gunu (ornek)
const haftaGunleri = (dil) => Array.from({ length: 7 }, (_, i) => new Date(2027, 1, 13 + i).toLocaleDateString(dil, { weekday: "short" }));

// ── kurma ekrani (FastingComposer) ────────────────────────────────────────────

/** ComposePreview: ilk tane altin, gerisi dolu (kurulum onizlemesi). */
function onizlemeHalkasi(K, adet, buyuk, kucuk) {
  const r = adet > 31 ? 2.6 : 2.9;
  const beads = Array.from({ length: adet }, (_, i) => {
    const a = (i / adet) * Math.PI * 2 - Math.PI / 2;
    return `<circle cx="${(50 + 43 * Math.cos(a)).toFixed(2)}" cy="${(50 + 43 * Math.sin(a)).toFixed(2)}" r="${r}" class="${i === 0 ? "me" : "on"}"/>`;
  }).join("");
  return `<span class="hx-ring or-ring"><svg viewBox="0 0 100 100" aria-hidden="true">${beads}</svg><b>${K.num(buyuk)}</b><small>${K.e(kucuk)}</small></span>`;
}

/** tur: "pp" pazartesi ve persembe (varsayilan) | "ram" Ramazan orucu; gor: "mutual" | "total". */
function orucKurma(K, { tur = "pp", gor = "mutual" } = {}) {
  const ram = tur === "ram";
  const ad = (ram ? K.L("fasting.kindRamadan") : K.L("fasting.kindMonThuName"));
  const alt = ram ? K.Le("fasting.previewRamadan") : `${K.Le("fasting.previewMonThu")}<br>${K.Le("compose.sumStartDate", { date: OX[K.dil].yarin })}`;
  const pv = `<div class="cx-pv"><div class="cx-pt"><small class="cx-cap">${K.Le("compose.thisTask")}</small><b>${K.e(ad)}</b><small class="cx-ds">${alt}</small></div>${ram ? onizlemeHalkasi(K, 30, "30", K.L("fasting.unitDay")) : onizlemeHalkasi(K, 33, "2", K.L("fasting.unitPerWeek"))}</div>`;
  const rows = [
    { lbl: K.L("fasting.rowKind"), val: (ram ? K.L("fasting.kindRamadan") : K.L("fasting.kindMonThu")), key: "fKind" },
    { lbl: K.L("compose.rowStart"), val: (ram ? K.L("compose.startRamadan") : K.L("compose.startTomorrow")) },
    ...(ram ? [] : [{ lbl: K.L("fasting.rowEnd"), val: K.L("practice.durationOngoing") }]),
    { lbl: K.L("compose.rowVisibility"), val: gor === "total" ? K.L("fasting.visibilityTotal") : K.L("practice.visibilityMutual"), key: "fVis" },
    { lbl: K.L("fasting.rowDuaTurn"), val: K.L("fasting.on") },
  ];
  const govde = `${pv}${K.C.rows(rows)}<small class="or-hint">${K.Le("fasting.setupNote")}</small>
    ${K.C.field({ lbl: K.L("compose.nameLabel"), key: "fName", val: ad, hint: K.L("compose.nameHintAuto") })}`;
  return `${K.C.hdr({ title: K.L("compose.typeFasting"), sub: grupSatiri(K) })}${K.C.body(govde, "fsc")}${K.C.foot(K.L("compose.startTask"), { key: "fStart" })}`;
}

const secenek = (K, b, s, on, key) => `<div class="or-opt${on ? " on" : ""}"${K.attr(key)}><i>${K.ic("check")}</i><div><b>${K.e(b)}</b>${s ? `<small>${K.e(s)}</small>` : ""}</div></div>`;

function turPenceresi(K) {
  return `<div class="sheet cx-sheet"><i class="grab"></i><b class="cx-sh">${K.Le("fasting.kindTitle")}</b>
      ${secenek(K, K.L("fasting.kindRamadan"), K.L("fasting.kindRamadanSub"), false, "kRam")}
      ${secenek(K, K.L("fasting.kindMonThu"), K.L("fasting.kindMonThuSub"), true, "kPP")}
      ${secenek(K, K.L("fasting.kindCustom"), K.L("fasting.kindCustomSub"), false)}
      ${K.bt(K.L("common.ok"), { key: "kOk", cls: "blk cx-cta" })}</div>`;
}

function gorunurlukPenceresi(K) {
  return `<div class="sheet cx-sheet"><i class="grab"></i><b class="cx-sh">${K.Le("practice.visibilityTitle")}</b>
      ${secenek(K, K.L("practice.visibilityMutual"), K.L("practice.visibilityMutualDesc"), true, "vMut")}
      ${secenek(K, K.L("practice.visibilityAdmin"), K.L("practice.visibilityAdminDesc"), false)}
      ${secenek(K, K.L("fasting.visibilityTotal"), K.L("fasting.visibilityTotalDesc"), false, "vTot")}
      ${K.bt(K.L("common.ok"), { key: "vOk", cls: "blk cx-cta" })}</div>`;
}

const acildi = (K) => `<div class="hx-toast or-toast">${K.ic("checkCircle")}<small>${K.Le("practice.createdMsg")}</small></div>`;

const orucKarti = (K, o = {}) => gorevKarti(K, { ic: "moon", kind: K.L("practice.typeFasting").toLocaleUpperCase(K.dil), title: K.L("fasting.kindRamadan"), ...o });

// ── uyenin ekrani (FastingView) ───────────────────────────────────────────────

/** Ana Sayfa (uye): Bana dusenler, oruc karti (katilmadan once "Baslamak icin dokun") ve hatim karti. */
function anaSayfa(K) {
  return `<div class="pg pt">
      <small class="mu">${K.Le("dashboard.greeting")}</small><b class="t1 nm">${K.e(K.X.member)}</b>
      <b class="lb">${K.Le("dashboard.myTasks")}</b>
      <div class="cd or-hc"${K.attr("fHome")}><span class="or-hi">${K.ic("moon")}</span><div><small class="gr">${K.Le("dashboard.halkaOf", { name: K.X.circle })}</small><b>${K.Le("fasting.kindRamadan")}</b><small>${K.Le("practice.tapToStart")}</small></div></div>
      <div class="cd or-hc"><span class="or-hi">${K.ic("quran")}</span><div><small class="gr">${K.Le("dashboard.halkaOf", { name: K.X.circle })}</small><b>${K.e(K.X.task)}</b><small>${K.Le("dashboard.juzTask", { num: 2 })}</small></div></div>
    </div>${K.tabbar("home")}`;
}

/** DayRing: Ramazan'da 30 tane, bugunku tane altin ve iri, tutulan gunler dolu. */
function gunHalkasi(K, { dolu = GUN - 1 } = {}) {
  const beads = Array.from({ length: 30 }, (_, i) => {
    const n = i + 1, a = (i / 30) * Math.PI * 2 - Math.PI / 2;
    const bugun = n === GUN;
    return `<circle cx="${(50 + 43 * Math.cos(a)).toFixed(2)}" cy="${(50 + 43 * Math.sin(a)).toFixed(2)}" r="${bugun ? 4.2 : 3}" class="${bugun ? "td" : n <= dolu ? "on" : ""}"/>`;
  }).join("");
  return `<span class="or-dr"><svg viewBox="0 0 100 100" aria-hidden="true">${beads}</svg><b>${K.num(String(GUN))}</b><small>${K.Le("fasting.ramadanLabel")}</small></span>`;
}

/**
 * hal: "katil" (henuz katilmadi) | "once" (katildi, iftardan once) | "iftar" (iftar vakti) | "tamam" (bugun isaretlendi).
 */
function orucEkrani(K, { hal = "once" } = {}) {
  const katildi = hal !== "katil";
  const ad = K.X.names;
  let hero;
  if (hal === "tamam") {
    hero = `<div class="or-hero or-row">${gunHalkasi(K, { dolu: GUN })}<div><b class="or-ht">${K.Le("fasting.accepted")}</b><small class="mu">${K.Le("fasting.markedToday")}</small><small class="gr or-undo">${K.Le("fasting.undo")}</small></div></div>`;
  } else if (hal === "iftar") {
    const [anlam, kaynak] = IFTAR[K.dil];
    hero = `<div class="or-hero or-gold">${gunHalkasi(K)}<b class="or-ht">${K.Le("fasting.iftarGreeting")}</b><b class="or-ar" dir="rtl">${IFTAR_AR}</b>${anlam ? `<small class="or-mn">${K.e(anlam)}</small>` : ""}<small class="mu or-src">${K.e(kaynak)}</small>
      ${K.bt(K.L("fasting.markDone"), { key: "fMark", cls: "blk" })}</div>`;
  } else {
    hero = `<div class="or-hero"><div class="or-row">${gunHalkasi(K)}<div><small class="or-ey">${K.Le("fasting.iftarIn")}</small><b class="or-ht">${K.Le("fasting.hoursMinutes", { h: 2, m: 14 })}</b><small class="mu">${K.Le("fasting.iftarAt", { time: OX[K.dil].iftar })}</small></div></div>
      ${katildi ? `<span class="or-off">${K.Le("fasting.markDone")}</span><small class="mu or-oh">${K.Le("fasting.opensAtIftar")}</small>` : ""}</div>`;
  }
  const katil = katildi ? "" : `<div class="cd or-join"><b>${K.Le("fasting.joinCardTitle")}</b><small class="mu">${K.Le("fasting.joinCardBody")}</small>${K.bt(K.L("fasting.joinCta"), { key: "fJoinCta", cls: "blk" })}<small class="mu or-oh">${K.Le("practice.dismissAction")}</small></div>`;
  const dua = katildi ? `<div class="or-dua"><small>${K.Le("fasting.duaLabel")}</small><b>${K.e(ad[2])}</b></div>` : "";
  const gunler = haftaGunleri(K.dil);
  const isaret = [1, 1, 0, 1, 1, 1, hal === "tamam" ? 1 : 0];
  const gunKarti = katildi ? `<div class="cd or-days"><small class="or-st">${K.Le("fasting.myDays")}</small><div class="or-dw">${gunler.map((g, i) => `<span><i class="${isaret[i] ? "on" : i === 6 ? "td" : ""}">${isaret[i] ? K.ic("check") : ""}</i><small>${K.e(g)}</small></span>`).join("")}</div><small class="mu">${K.Le("fasting.backfillHint")}</small></div>` : "";
  const kisi = (n, ben, dots, kabul) => `<div class="or-p"><span class="or-av${ben ? " me" : ""}">${K.e(Array.from(n)[0])}</span><div><b>${K.e(n)}${ben ? ` <small class="mu">${K.Le("group.youSuffix")}</small>` : ""}</b>${kabul ? `<span class="or-acc"${K.attr("acc")}>${K.Le("fasting.accepted")}</span><small class="mu or-sent"${K.attr("accSent")}>${K.Le("fasting.acceptSent")}</small>` : ""}</div><span class="or-pd">${dots.map((d) => `<i class="${d ? "on" : ""}"></i>`).join("")}</span></div>`;
  const birlikte = katildi ? `<small class="or-st">${K.Le("fasting.together")}</small><div class="or-list">
      ${kisi(ad[1], true, isaret, false)}${kisi(ad[0], false, [1, 1, 1, 1, 1, 1, 1], true)}${kisi(ad[2], false, [1, 0, 1, 1, 0, 1, 1], false)}</div>` : "";
  return `<div class="or-fh"><span class="hb">${K.ic("back", "fl")}</span><b>${K.Le("fasting.kindRamadan")}</b><span></span></div>
    <div class="cx-clip"><div class="pg sc or-pg"${K.attr("osc")}>${hero}${katil}${dua}${gunKarti}${birlikte}</div></div>`;
}

function katilPenceresi(K) {
  return `<div class="sheet cx-sheet"><i class="grab"></i><b class="cx-sh">${K.Le("fasting.joinTitle")}</b>
      <small class="or-cs">${K.Le("fasting.consentMutual")}</small><small class="or-cs">${K.Le("fasting.consentCommon")}</small>
      <div class="hx-tg or-rem"><div><b>${K.Le("fasting.reminderRow")}</b><small>${K.Le("fasting.reminderLater")}</small></div>${K.tg(true)}</div>
      ${K.bt(K.L("fasting.join"), { key: "fJoin", cls: "blk cx-cta" })}<small class="gr or-oh">${K.Le("fasting.notNow")}</small></div>`;
}

/** Merkez karti: iri gun halkasi ve "Orucumu tuttum" -> "Allah kabul etsin". */
function kartGorunum(K) {
  return `<div class="or-k"><small class="cx-cap">${K.Le("fasting.kindRamadan")}</small><b class="or-kt">${K.Le("fasting.iftarGreeting")}</b>
      <div class="or-kr"${K.attr("kring")}>${gunHalkasi(K)}</div>
      ${K.bt(K.L("fasting.markDone"), { key: "kMark", cls: "blk or-kb" })}
      <span class="or-kd"${K.attr("kDone")}>${K.ic("check")}<b>${K.Le("fasting.accepted")}</b></span></div>`;
}

// ── sahneler ──────────────────────────────────────────────────────────────────

const grup = (K, ameller = []) => grupEkrani(K, { uye: 5, gorevler: [hatimKarti(K)], ameller });

export const SAHNE = {
  /** Halka ekrani -> Gorev ekle -> Ibadet takibi -> Oruc -> kurma ekrani. */
  "oruc-ac": (K) => K.telefon({
    aria: `${K.L("group.addTask")} › ${K.L("compose.sectionPractice")} › ${K.L("compose.typeFasting")}`,
    views: [["g", grup(K)], ["p", secimEkrani(K), "up"], ["f", orucKurma(K), "push"]],
    tl: [["w", 900], ["tap", "fab"], ["go", "p"], ["w", 900], ["y", "psc", "21"], ["w", 1100], ["tap", "tFast"], ["go", "f"], ["w", 2200]],
    still: 5, hint: "tFast",
  }),

  /** Hangi oruc -> Ramazan orucu -> Tamam -> onizleme ve satirlar Ramazan'a gore. */
  "oruc-tur": (K) => K.telefon({
    aria: `${K.L("fasting.rowKind")} › ${K.L("fasting.kindRamadan")} › ${K.L("fasting.previewRamadan")}`,
    views: [["f", orucKurma(K)], ["r", orucKurma(K, { tur: "ram" }), "fade"]],
    overlays: [["k", turPenceresi(K), "sheet"]],
    tl: [["w", 1300], ["tap", "fKind"], ["ov", "k"], ["w", 900], ["tap", "kRam"], ["off", "kPP", "on"], ["on", "kRam", "on"], ["w", 1000], ["tap", "kOk"], ["cl", "k"], ["go", "r"], ["w", 2400]],
    still: 0, hint: "fKind",
  }),

  /** Kim kimi gorur -> Karsilikli / Yalniz yonetici / Yalniz toplam. */
  "oruc-gorunurluk": (K) => K.telefon({
    aria: `${K.L("practice.visibilityTitle")} › ${K.L("practice.visibilityMutual")} · ${K.L("practice.visibilityAdmin")} · ${K.L("fasting.visibilityTotal")}`,
    views: [["r", orucKurma(K, { tur: "ram" })]],
    overlays: [["v", gorunurlukPenceresi(K), "sheet"]],
    tl: [["w", 1100], ["tap", "fVis"], ["ov", "v"], ["w", 1800], ["tap", "vTot"], ["off", "vMut", "on"], ["on", "vTot", "on"], ["w", 1100], ["tap", "vOk"], ["cl", "v"], ["txt", "fVisV", K.L("fasting.visibilityTotal")], ["w", 2000]],
    still: 3, hint: "vTot",
  }),

  /** Gorevi baslat -> tost -> halka ekraninda Ortak Ameller altinda oruc karti. */
  "oruc-baslat": (K) => K.telefon({
    aria: `${K.L("compose.startTask")} › ${K.L("practice.createdMsg")}`,
    views: [["r", orucKurma(K, { tur: "ram" })], ["g", grup(K, [orucKarti(K, { yeni: true })]), "fade"]],
    overlays: [["t", acildi(K), "toast"]],
    tl: [["w", 900], ["y", "fsc", "9"], ["w", 1000], ["tap", "fStart"], ["go", "g"], ["ov", "t"], ["w", 2600], ["cl", "t"], ["w", 1200]],
    still: 2, hint: "fStart",
  }),

  /** Uye: Ana Sayfa karti -> oruc ekrani -> Bu oruca katil -> onay penceresi -> Katil. */
  "oruc-katil": (K) => K.telefon({
    aria: `${K.L("dashboard.myTasks")} › ${K.L("fasting.joinCta")} › ${K.L("fasting.joinTitle")} › ${K.L("fasting.join")}`,
    views: [["h", anaSayfa(K)], ["k", orucEkrani(K, { hal: "katil" }), "push"], ["o", orucEkrani(K, { hal: "once" }), "fade"]],
    overlays: [["j", katilPenceresi(K), "sheet"]],
    tl: [["w", 900], ["tap", "fHome"], ["go", "k"], ["w", 1100], ["tap", "fJoinCta"], ["ov", "j"], ["w", 2000], ["tap", "fJoin"], ["cl", "j"], ["go", "o"], ["w", 2200]],
    still: 3, hint: "fJoinCta",
  }),

  /** Iftardan once dugme kapali -> iftar girince acilir -> Orucumu tuttum -> Allah kabul etsin. */
  "oruc-isaretle": (K) => K.telefon({
    aria: `${K.L("fasting.iftarIn")} › ${K.L("fasting.iftarGreeting")} › ${K.L("fasting.markDone")} › ${K.L("fasting.accepted")}`,
    views: [["o", orucEkrani(K, { hal: "once" })], ["i", orucEkrani(K, { hal: "iftar" }), "fade"], ["t", orucEkrani(K, { hal: "tamam" }), "fade"]],
    tl: [["w", 1900], ["go", "i"], ["w", 1300], ["tap", "fMark"], ["go", "t"], ["w", 2600]],
    still: 2, hint: "fMark",
  }),

  /** Birlikte: dua sirasi, son oruc gunleri, kardeslere "Allah kabul etsin". */
  "oruc-birlikte": (K) => K.telefon({
    aria: `${K.L("fasting.duaLabel")} › ${K.L("fasting.myDays")} › ${K.L("fasting.together")} › ${K.L("fasting.acceptSent")}`,
    views: [["t", orucEkrani(K, { hal: "tamam" })]],
    tl: [["w", 2200], ["tap", "acc"], ["on", "acc", "gone"], ["on", "accSent", "show"], ["w", 2400]],
    still: 0, hint: "acc",
  }),

  /** Giris filmi: kurmaktan halka ekranina, sonra uyenin isareti. */
  "film-oruc": (K) => K.telefon({
    size: "lg",
    aria: `${K.L("group.addTask")} › ${K.L("compose.typeFasting")} › ${K.L("fasting.kindRamadan")} › ${K.L("compose.startTask")} › ${K.L("fasting.markDone")}`,
    views: [["g", grup(K)], ["p", secimEkrani(K), "up"], ["f", orucKurma(K), "push"], ["r", orucKurma(K, { tur: "ram" }), "fade"],
      ["g2", grup(K, [orucKarti(K, { yeni: true })]), "fade"], ["i", orucEkrani(K, { hal: "iftar" }), "push"], ["t", orucEkrani(K, { hal: "tamam" }), "fade"]],
    overlays: [["k", turPenceresi(K), "sheet"], ["ts", acildi(K), "toast"]],
    tl: [["w", 800], ["tap", "fab"], ["go", "p"], ["w", 600], ["y", "psc", "21"], ["w", 800], ["tap", "tFast"], ["go", "f"], ["w", 900],
      ["tap", "fKind"], ["ov", "k"], ["w", 500], ["tap", "kRam"], ["off", "kPP", "on"], ["on", "kRam", "on"], ["w", 400], ["tap", "kOk"], ["cl", "k"], ["go", "r"], ["w", 1200],
      ["tap", "fStart"], ["go", "g2"], ["ov", "ts"], ["w", 1800], ["cl", "ts"], ["w", 300], ["go", "i"], ["w", 1200], ["tap", "fMark"], ["go", "t"], ["w", 2400]],
    still: 0, hint: "fab",
  }),

  /** Merkez karti ve paylasim gorseli: iftarda tek dokunus. */
  "oruc-kart": (K) => K.telefon({
    aria: `${K.L("fasting.kindRamadan")}: ${K.L("fasting.iftarGreeting")} › ${K.L("fasting.markDone")} › ${K.L("fasting.accepted")}`,
    views: [["k", kartGorunum(K)]],
    tl: [["w", 1500], ["tap", "kMark"], ["on", "kring", "done"], ["on", "kMark", "gone"], ["on", "kDone", "show"], ["w", 3200]],
    still: 0,
  }),
};

export const CSS = `
  .mp-s .or-ring circle.on { fill: var(--a-pri); }
  .mp-s .or-hint { display: block; color: var(--a-mut); font-size: .66em; line-height: 1.4; }
  .mp-s .or-opt { display: flex; gap: .65em; align-items: flex-start; padding: .65em .75em; border-radius: .9em; border: 1px solid var(--a-line); background: var(--a-card); transition: border-color .25s ease, background-color .25s ease; }
  .mp-s .or-opt > i { width: 1.45em; height: 1.45em; border-radius: 50%; border: .12em solid var(--a-line); display: grid; place-items: center; color: transparent; flex: none; margin-top: .05em; transition: background-color .25s ease; }
  .mp-s .or-opt > i .ic { width: .95em; height: .95em; }
  .mp-s .or-opt.on { border-color: var(--a-pri); background: var(--a-soft); }
  .mp-s .or-opt.on > i { background: var(--a-pri); border-color: var(--a-pri); color: #fff; }
  .mp-s .or-opt > div { min-width: 0; }
  .mp-s .or-opt b { display: block; font-size: .84em; }
  .mp-s .or-opt small { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--a-mut); font-size: .68em; margin-top: .1em; }
  .mp-s .or-hc { display: flex; align-items: center; gap: .7em; padding: .75em .85em; }
  .mp-s .or-hc > div { min-width: 0; }
  .mp-s .or-hc b { display: block; font-size: .92em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .or-hc small { display: block; font-size: .7em; color: var(--a-mut); }
  .mp-s .or-hc small.gr { color: var(--a-pri); }
  .mp-s .or-hi { width: 2.5em; height: 2.5em; border-radius: .8em; background: var(--a-soft); color: var(--a-pri); display: grid; place-items: center; flex: none; }
  .mp-s .or-fh { display: grid; grid-template-columns: 2.4em minmax(0, 1fr) 2.4em; align-items: center; padding: .45em 1em .5em; text-align: center; border-bottom: 1px solid var(--a-line); }
  .mp-s .or-fh b { font-size: 1.02em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .or-pg { gap: .6em; padding-top: .8em; }
  .mp-s .or-hero { display: flex; flex-direction: column; gap: .55em; padding: .9em .95em; border-radius: 1.1em; background: var(--a-soft); }
  .mp-s .or-row { display: flex; align-items: center; gap: .85em; }
  .mp-s .or-hero.or-row { flex-direction: row; }
  .mp-s .or-row > div { min-width: 0; flex: 1; }
  .mp-s .or-ey { display: block; color: var(--a-pri); font-size: .72em; font-weight: 700; }
  .mp-s .or-ht { display: block; font-size: 1.22em; font-weight: 800; line-height: 1.2; }
  .mp-s .or-hero small.mu { display: block; font-size: .72em; }
  .mp-s .or-undo { display: block; font-size: .76em; font-weight: 700; margin-top: .3em; }
  .mp-s .or-off { display: flex; align-items: center; justify-content: center; height: 2.7em; border-radius: .8em; border: 1px solid var(--a-line); background: var(--a-card); color: var(--a-mut); font-weight: 700; font-size: .88em; }
  .mp-s .or-oh { display: block; text-align: center; font-size: .68em; }
  .mp-s .or-gold { align-items: center; text-align: center; background: color-mix(in srgb, var(--a-gold) 16%, var(--a-card)); }
  .mp-s .or-ar { display: block; font-weight: 400; font-size: .95em; line-height: 1.6; font-family: "Geeza Pro", "Noto Naskh Arabic", "Amiri", serif; }
  .mp-s .or-mn { display: block; font-size: .7em; line-height: 1.35; }
  .mp-s .or-src { font-size: .62em !important; }
  .mp-s .or-dr { position: relative; width: 6em; height: 6em; display: grid; place-content: center; text-align: center; flex: none; }
  .mp-s .or-dr svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .mp-s .or-dr circle { fill: var(--a-line); transition: fill .4s ease; }
  .mp-s .or-dr circle.on { fill: var(--a-pri); }
  .mp-s .or-dr circle.td { fill: var(--a-gold); }
  .mp-s .or-dr b { position: relative; font-size: 1.5em; line-height: 1; }
  .mp-s .or-dr small { position: relative; display: block; color: var(--a-mut); font-size: .62em; margin-top: .15em; }
  .mp-s .or-join { display: flex; flex-direction: column; gap: .5em; }
  .mp-s .or-join > b { font-size: .95em; }
  .mp-s .or-join > small.mu { font-size: .74em; }
  .mp-s .or-dua { padding: .7em .9em; border-radius: 1em; background: color-mix(in srgb, var(--a-gold) 14%, var(--a-card)); border: 1px solid var(--a-line); }
  .mp-s .or-dua small { display: block; font-size: .7em; }
  .mp-s .or-dua b { display: block; font-size: 1.1em; margin-top: .1em; }
  .mp-s .or-st { display: block; color: var(--a-mut); font-size: .7em; font-weight: 700; }
  .mp-s .or-days { display: flex; flex-direction: column; gap: .45em; padding: .7em .8em; }
  .mp-s .or-days > small.mu { font-size: .64em; }
  .mp-s .or-dw { display: flex; justify-content: space-between; gap: .2em; }
  .mp-s .or-dw span { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: .25em; }
  .mp-s .or-dw i { width: 1.9em; height: 1.9em; border-radius: 50%; border: .12em solid var(--a-line); display: grid; place-items: center; color: var(--a-on); }
  .mp-s .or-dw i.on { background: var(--a-pri); border-color: var(--a-pri); }
  .mp-s .or-dw i.td { border-color: var(--a-gold); }
  .mp-s .or-dw i .ic { width: 1em; height: 1em; }
  .mp-s .or-dw small { font-size: .56em; color: var(--a-mut); max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .or-list { border-radius: 1em; background: var(--a-card); border: 1px solid var(--a-line); overflow: hidden; }
  .mp-s .or-p { display: flex; align-items: center; gap: .6em; padding: .6em .75em; }
  .mp-s .or-p + .or-p { border-top: 1px solid var(--a-line); }
  .mp-s .or-p > div { flex: 1; min-width: 0; }
  .mp-s .or-p b { display: block; font-size: .82em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .or-p b small { font-weight: 400; font-size: .9em; }
  .mp-s .or-av { width: 2em; height: 2em; border-radius: 50%; display: grid; place-items: center; font-weight: 700; font-size: .82em; background: var(--a-soft); color: var(--a-pri); flex: none; }
  .mp-s .or-av.me { background: var(--a-pri); color: var(--a-on); }
  .mp-s .or-acc { display: inline-block; margin-top: .3em; padding: .3em .7em; border-radius: 1em; background: var(--a-soft); color: var(--a-pri); font-size: .68em; font-weight: 700; }
  .mp-s .or-acc.gone { display: none; }
  .mp-s .or-sent { display: none; font-size: .64em; margin-top: .3em; }
  .mp-s .or-sent.show { display: block; }
  .mp-s .or-pd { display: flex; gap: .2em; flex: none; }
  .mp-s .or-pd i { width: .5em; height: .5em; border-radius: 50%; background: var(--a-line); }
  .mp-s .or-pd i.on { background: var(--a-pri); }
  .mp-s .or-cs { display: block; font-size: .74em; line-height: 1.4; }
  .mp-s .or-rem { padding: .6em 0; border-top: 1px solid var(--a-line); border-bottom: 1px solid var(--a-line); }
  .mp-s .or-k { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1em 1.4em 3em; gap: .35em; }
  .mp-s .or-kt { font-size: 1.6em; font-weight: 800; line-height: 1.15; }
  .mp-s .or-kr { margin: 1.4em 0 1.6em; }
  .mp-s .or-kr .or-dr { width: 15em; height: 15em; }
  .mp-s .or-kr .or-dr b { font-size: 3.4em; }
  .mp-s .or-kr .or-dr small { font-size: 1em; }
  .mp-s .or-kr.done circle.td { fill: var(--a-pri); }
  .mp-s .bt.or-kb { height: 3.3em; font-size: 1.05em; border-radius: 1em; }
  .mp-s .bt.or-kb.gone { display: none; }
  .mp-s .or-kd { display: none; align-items: center; gap: .45em; height: 3.3em; color: var(--a-pri); font-size: 1.1em; }
  .mp-s .or-kd.show { display: flex; animation: zkin2 .45s ease both; }
  .mp-s .or-kd .ic { width: 1.5em; height: 1.5em; padding: .2em; border-radius: 50%; background: var(--a-pri); color: var(--a-on); }
  @keyframes zkin2 { from { opacity: 0; transform: translateY(.5em); } to { opacity: 1; transform: none; } }
  :root[dir="rtl"] .mp-s .or-dr svg, :root[dir="rtl"] .mp-s .or-ring svg { transform: scaleX(-1); }
`;
