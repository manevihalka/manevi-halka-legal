/**
 * Herkese acik haftalik Kur'an halkasi rehberinin ekranlari (21 Kas 2026, 2.1.0). Uygulamada ozelligin adi
 * bigCircle.title ("Buyuk Halka"); mini telefonlar ekrani oldugu gibi gosterir, sayfa basliklari bu adi kullanmaz.
 * Akislar uygulamanin kodundan izlendi (salt okunur, SpiritualCircleApp):
 *   app/buyuk-halka.tsx                    ekran: (uye degil) tanitim karti + "Halkaya katil"; gorev karti ("Bu haftaki gorevin",
 *                                          "1 sayfa oku", sayfa · sure, dakika · Cuma'ya N gun, Oku, Okudum); okununca Elhamdulillah;
 *                                          Gunun sozu; hatim halkasi (Ortak Okuma ile ayni hatim); Haftanin zikri; gizlilik satiri
 *   components/bigCircle/BigCircleEntry.tsx Halkalar sekmesindeki davet karti ("Herkes icin", heroDesc, Katil)
 *   components/bigCircle/BigCircleStory.tsx uc sayfalik tanitim; son sayfada "Halkaya katil" / "Simdi degil"
 *   components/bigCircle/BigCircleSheets.tsx ⋮ menusu (pay 1/2/5/10, hikaye, hatirlatma, zikir, ayril), ayrilma penceresi
 *   lib/bigCircleReminder.ts               Persembe 20:00 tek yerel bildirim, yalniz okunmamis pay varsa
 *   app/kuran/oku.tsx                      okuyucuda son sayfada "Okudum" -> "Bu haftaki payini okudun mu?" -> Okudum
 * "Deneme halkasi" rozeti (bigCircle.testBadge) yalniz gelistirme paketinde (BIG_CIRCLE_KEY "test"); burada CIZILMEZ.
 * Uye listesi, siralama, rozet YOK (uygulamada da yok). Premium YOK (kodda Premium kapisi yok). Cevsen YOK. Uzun tire YOK.
 */

/** Dile gore ornek veriler (sure adi lib/surahNames.ts ve surahs.json; sayfa 214 Yunus suresinde). Uygulama metni DEGIL. */
const BO = {
  tr: { surah: "Yûnus", lockDate: "Perşembe, 26 Kasım" },
  en: { surah: "Yunus", lockDate: "Thursday, 26 November" },
  de: { surah: "Yunus", lockDate: "Donnerstag, 26. November" },
  fr: { surah: "Yunus", lockDate: "jeudi 26 novembre" },
  ar: { surah: "يونس", lockDate: "الخميس، 26 نوفمبر" },
};
const SAYFA = 214, GUN = 4, HAFTA = 46, YUZDE = 35, BENIM = 6;
const CEVRE = 276.5;
const ofs = (p) => (CEVRE * (1 - p / 100)).toFixed(1);

// ── parcalar ──────────────────────────────────────────────────────────────────
const isaret = (K, cls = "") => `<span class="bkh-mark${cls ? " " + cls : ""}">${K.brand()}</span>`;

function ust(K, { menu = true } = {}) {
  return `<div class="bkh-hd"><span class="bkh-bk">${K.ic("back", "fl")}</span><b>${K.Le("bigCircle.title")}</b><span class="bkh-hr">${isaret(K)}${menu ? `<span class="bkh-dots"${K.attr("menu")}>${K.ic("dots")}</span>` : ""}</span></div>`;
}

function gorevKarti(K, { cls = "", kisa = false } = {}) {
  const O = BO[K.dil];
  const sayfa = `${K.L("bigCircle.pageOne", { pages: SAYFA })} · ${K.L("bigCircle.surah", { name: O.surah })}`;
  return `<div class="bkh-card bkh-task${cls ? " " + cls : ""}">
      <div class="bkh-rbw"><small class="bkh-kick">${K.Le("bigCircle.taskKicker")}</small>${kisa ? "" : `<span class="bkh-chg">${K.Le("bigCircle.changeShare")}${K.ic("bkDown")}</span>`}</div>
      <b class="bkh-tt">${K.Le("bigCircle.taskTitle", { count: 1 })}</b>
      <b class="bkh-pg">${K.e(kisa ? K.L("bigCircle.pageOne", { pages: SAYFA }) : sayfa)}</b>
      ${kisa ? "" : `<small class="bkh-sm">${K.e(`${K.L("bigCircle.minutes", { n: 3 })} · ${K.L("bigCircle.daysLeft", { count: GUN })}`)}</small>
      <span class="bkh-main"${K.attr("read")}>${K.ic("book")}${K.Le("bigCircle.read")}</span>`}
      <span class="bkh-ghost"${K.attr(kisa ? "kmark" : "mark")}>${K.ic("checkCircle")}${K.Le("bigCircle.markRead")}</span>
      ${kisa ? "" : `<small class="bkh-how">${K.Le("bigCircle.taskHow")}</small>`}
    </div>`;
}

function bittiKarti(K, { cls = "", kisa = false } = {}) {
  return `<div class="bkh-card bkh-strong bkh-done${cls ? " " + cls : ""}">
      <span class="bkh-ok">${K.ic("check")}</span>
      <b class="bkh-dt">${K.Le("bigCircle.doneTitle")}</b>
      ${kisa ? "" : `<small>${K.Le("bigCircle.doneBody")}</small>
      <small>${K.e(K.L("bigCircle.doneProgress", { n: 1, pct: K.L("common.percent", { n: YUZDE }) }))}</small>
      <span class="bkh-mine"><i></i><i></i><i></i><b>${K.Le("bigCircle.myCyclePages", { count: BENIM })}</b></span>`}
    </div>`;
}

function tanitimKarti(K) {
  return `<div class="bkh-card bkh-intro">${isaret(K, "lg")}
      <b class="bkh-it">${K.Le("bigCircle.leftTitle")}</b>
      <small>${K.Le("bigCircle.introBody")}</small>
      <span class="bkh-main">${K.Le("bigCircle.rejoin")}</span>
      <small class="bkh-link">${K.Le("bigCircle.howItWorks")}</small>
    </div>`;
}

function hatimKarti(K, { cls = "", key = "ring", pctKey = "pct", hafta = true } = {}) {
  return `<div class="bkh-card bkh-strong bkh-hat${cls ? " " + cls : ""}">
      <span class="bkh-ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" class="bkh-rt"/><circle cx="50" cy="50" r="44" class="bkh-rf"${K.attr(key)} style="stroke-dashoffset:${ofs(YUZDE)}"/></svg><b${K.attr(pctKey)}>${K.Le("common.percent", { n: YUZDE })}</b></span>
      <div><small class="bkh-kick">${K.Le("bigCircle.hatimTitle", { n: 1 })}</small>
        <b class="bkh-hw">${K.Le("bigCircle.hatimSame")}</b>
        ${hafta ? `<small>${K.Le("bigCircle.weekPagesRead", { count: HAFTA })}</small>` : ""}</div>
    </div>`;
}

function zikirKarti(K) {
  return `<div class="bkh-card bkh-dh">
      <div class="bkh-rbw"><small class="bkh-kick">${K.Le("bigCircle.dhikrTitle")}</small><small class="bkh-sm">${K.Le("bigCircle.dhikrRenews")}</small></div>
      <div class="bkh-dhr"><i class="bkh-dring"></i><div><b>${K.Le("globalDhikr.salavat.name")}</b><small>${K.Le("bigCircle.dhikrCount", { current: "640", target: "2.000" })} · ${K.Le("bigCircle.dhikrOptional")}</small></div><span class="bkh-pull">${K.Le("bigCircle.dhikrPull")}</span></div>
    </div>`;
}

/** Halka ekrani. hal: "" (gorev) | "done" | "left". Kaydirilan govde (sc: "bsc"), durum kabi (bst), bildirim seridi (btoast). */
function ekran(K, { hal = "" } = {}) {
  const sozSatir = [94, 88, 97, 72].map((w) => `<i style="--w:${w}%"></i>`).join("");
  return `${ust(K)}
    <div class="bkh-clip"><div class="bkh-in sc"${K.attr("bsc")}>
      <div class="bkh-st${hal ? " " + hal : ""}"${K.attr("bst")}>${tanitimKarti(K)}${gorevKarti(K)}${bittiKarti(K)}</div>
      <small class="bkh-kick bkh-wk">${K.Le("bigCircle.wordTitle")}</small>
      <div class="bkh-card bkh-wc" aria-hidden="true">${sozSatir}</div>
      ${hatimKarti(K)}
      ${zikirKarti(K)}
      <small class="bkh-priv">${K.Le("bigCircle.privacy")}</small>
    </div></div>
    <small class="bkh-toast"${K.attr("btoast")}>${K.ic("checkCircle")}<span${K.attr("btoastT")}>${K.Le("bigCircle.joinedToast")}</span></small>`;
}

/** Halkalar sekmesi, halkasi olmayan: davet karti ("Herkes icin") ve altinda halka kurma karti. */
function halkalar(K) {
  return `<div class="pg pt bkh-tp">
      <b class="t1">${K.Le("tabs.circles")}</b>
      <div class="bkh-hero">
        <div class="bkh-htop">${K.brand()}<div><small>${K.Le("bigCircle.forEveryone")}</small><b>${K.Le("bigCircle.title")}</b></div></div>
        <small class="bkh-hb">${K.Le("bigCircle.heroDesc")}</small>
        <b class="bkh-hs">${K.Le("bigCircle.weekPagesRead", { count: HAFTA })}</b>
        <span class="bkh-hbtn"${K.attr("hjoin")}>${K.Le("bigCircle.join")}</span>
        <span class="bkh-more">${K.ic("bkMore")}</span>
      </div>
      <div class="cd bkh-anon"><span class="badge-ic">${K.ic("people")}</span><b>${K.Le("circlesTab.anonTitle")}</b>${K.bt(K.L("circlesTab.anonCreate"), { cls: "blk sm", icon: "plus" })}</div>
    </div>${K.tabbar("circles")}`;
}

/** Tanitim hikayesi (uc sayfa, koyu gul zemin). */
function hikaye(K, n) {
  const cubuk = [1, 2, 3].map((i) => `<i class="${i <= n ? "on" : ""}"></i>`).join("");
  let govde = "";
  if (n === 1) govde = `${K.brand("bkh-lg")}<b class="bkh-stt">${K.Le("bigCircle.story1Title")}</b><small>${K.Le("bigCircle.story1Body")}</small>`;
  if (n === 2) govde = `<div class="bkh-sample"><small class="bkh-sl">${K.Le("bigCircle.story2Label")}</small><b>${K.Le("bigCircle.story2Sample")}</b><small>${K.Le("bigCircle.story2Until")}</small></div>
      <b class="bkh-stt">${K.Le("bigCircle.story2Title")}</b><small>${K.Le("bigCircle.story2Body")}</small>`;
  if (n === 3) govde = `${K.brand("bkh-md")}<b class="bkh-stt">${K.Le("bigCircle.story3Title")}</b><small>${K.Le("bigCircle.story3Body")}</small><small class="bkh-sn">${K.Le("bigCircle.story3Note")}</small>`;
  const dugme = n < 3
    ? `<span class="bkh-sbtn"${K.attr("sn" + n)}>${K.Le("bigCircle.storyNext")}</span>`
    : `<span class="bkh-sbtn"${K.attr("sjoin")}>${K.Le("bigCircle.storyJoin")}</span><span class="bkh-snot">${K.Le("bigCircle.storyNotNow")}</span>`;
  return `<div class="lock bkh-story"><div class="bkh-bars">${cubuk}</div><div class="bkh-sh"><small>${K.Le("bigCircle.title")}</small>${K.ic("x")}</div>
      <div class="bkh-sb">${govde}</div><div class="bkh-sa">${dugme}</div></div>`;
}

/** Ana Sayfa: Gorevlerin bolumunde halkanin gorev karti. */
function anaSayfa(K) {
  return `<div class="pg pt">
      <small class="mu">${K.Le("dashboard.greeting")}</small><b class="t1 nm">${K.e(K.X.member)}</b>
      <b class="lb">${K.Le("dashboard.myTasks")}</b>
      <div class="cd tcard bkh-tc"${K.attr("hcard")}>${isaret(K)}<div><small class="gr">${K.Le("bigCircle.title")}</small><b>${K.Le("bigCircle.taskTitle", { count: 1 })}</b><small>${K.Le("bigCircle.pageOne", { pages: SAYFA })}</small><small>${K.Le("bigCircle.daysLeft", { count: GUN })}</small></div></div>
      <div class="cd tcard"><small class="gr">${K.Le("dashboard.halkaOf", { name: K.X.circle })}</small><b>${K.e(K.X.task)}</b><small>${K.Le("dashboard.juzTask", { num: 2 })}</small></div>
    </div>${K.tabbar("home")}`;
}

/** Okuyucudan donuste soru: "Bu haftaki payini okudun mu?" Vazgec / Okudum. */
function okuSorusu(K) {
  return `<div class="card-c"><span class="okring">${K.ic("check")}</span><b class="t1 c bkh-q">${K.Le("bigCircle.readerFinishTitle")}</b>
      <div class="row2">${K.bt(K.L("common.cancel"), { cls: "gh" })}${K.bt(K.L("hatim.markRead"), { key: "okRead" })}</div></div>`;
}

/** ⋮ menusu: haftalik pay, hikaye, hatirlatma, haftanin zikri, ayril. */
function menu(K) {
  const cip = (s) => `<span class="${s === 1 ? "on" : ""}"${K.attr("sz" + s)}><b>${K.num(String(s))}</b><small>${K.Le("bigCircle.pagesUnit", { count: s })}</small></span>`;
  return `<div class="sheet bkh-menu"><i class="grab"></i><b class="bkh-mt">${K.Le("bigCircle.title")}</b>
    <small class="bkh-ms">${K.Le("bigCircle.menuShare")}</small>
    <div class="bkh-chips">${[1, 2, 5, 10].map(cip).join("")}</div>
    <small class="bkh-note"${K.attr("mnote")}>${K.Le("bigCircle.menuShareNote", { n: 3 })}</small>
    <small class="bkh-next"${K.attr("mnext")}>${K.Le("bigCircle.menuNextWeek", { count: 2 })}</small>
    <i class="bkh-sep"></i>
    <div class="bkh-mr">${K.ic("bkPlay")}<b class="f">${K.Le("bigCircle.menuStory")}</b></div>
    <div class="bkh-mr">${K.ic("bell")}<div><b>${K.Le("bigCircle.menuReminder")}</b><small>${K.Le("bigCircle.menuReminderSub")}</small></div>${K.tg(true, "rem")}</div>
    <div class="bkh-mr">${K.ic("bkSync")}<b class="f">${K.Le("bigCircle.menuDhikr")}</b>${K.tg(true)}</div>
    <i class="bkh-sep"></i>
    <div class="bkh-mr red"${K.attr("leaveRow")}>${K.ic("bkExit")}<div><b>${K.Le("bigCircle.menuLeave")}</b><small>${K.Le("bigCircle.menuLeaveSub")}</small></div></div>
  </div>`;
}

/** Ayrilma penceresi: okudugun sayfayi isaretle, kalani halkaya doner. */
function ayrilma(K) {
  return `<div class="sheet bkh-menu"><i class="grab"></i><b class="bkh-mt">${K.Le("bigCircle.leaveTitle")}</b>
    <small class="bkh-body">${K.Le("bigCircle.leaveAsk")}</small>
    <div class="bkh-pr"${K.attr("lp")}>${K.ic("bkBox", "bx0")}${K.ic("bkBoxOn", "bx1")}<b>${K.Le("bigCircle.leavePage", { n: SAYFA })}</b></div>
    <small class="bkh-note"${K.attr("lnote")}>${K.e(`${K.L("bigCircle.leaveReturns", { pages: SAYFA })} ${K.L("bigCircle.leaveAgain")}`)}</small>
    <span class="bkh-danger"${K.attr("lok")}>${K.Le("bigCircle.leaveConfirm")}</span>
    <span class="bkh-cancel">${K.Le("bigCircle.leaveCancel")}</span>
  </div>`;
}

/** Kilit ekrani: Persembe aksami hatirlatmasi. */
function kilit(K) {
  const O = BO[K.dil];
  const govde = K.L("bigCircle.reminderBody", { label: K.L("bigCircle.pageOne", { pages: SAYFA }) });
  return `<div class="lock"><div class="lk-t"><small>${K.e(O.lockDate)}</small><b>${K.num("20:00")}</b></div>
    <div class="push"${K.attr("push")}>${K.brand()}<div><div class="ph-h"><b>Manevi Halka</b><small>${K.e(K.X.now)}</small></div><b>${K.Le("bigCircle.reminderTitle")}</b><small>${K.e(govde)}</small></div></div></div>`;
}

/** Merkez karti: iri gorev karti, Okudum, Elhamdulillah, iri hatim halkasi. */
function kartEkrani(K) {
  return `${ust(K, { menu: false })}
    <div class="bkk"${K.attr("bkk")}>
      ${gorevKarti(K, { cls: "bkk-task", kisa: true })}
      ${bittiKarti(K, { cls: "bkk-done", kisa: true })}
      ${hatimKarti(K, { cls: "bkk-hat", key: "kring", pctKey: "kpct" })}
    </div>`;
}

// ── zaman cizelgesi parcalari ─────────────────────────────────────────────────
const tlHikaye = () => [["tap", "sn1"], ["go", "s2"], ["w", 1500], ["tap", "sn2"], ["go", "s3"], ["w", 1500], ["tap", "sjoin"], ["go", "e"], ["on", "btoast", "show"]];
const tlOku = (K) => [["tap", "read"], ["go", "r"], ["w", 500], ["st", "rprog", "width", "100%"], ["on", "markRead", "show"], ["w", 900], ["tap", "markRead"], ["ov", "cf"], ["w", 900],
  ["tap", "okRead"], ["cl", "cf"], ["on", "bst", "done"], ["go", "e"]];

// Zaman cizelgesi tek tirnakli data-tl niteligine yazilir (sahne.mjs e() tek tirnagi kacirmaz): "txt" metinlerindeki
// duz kesme isareti tipografik olana cevrilir ("Cuma'ya" -> "Cuma’ya"), yoksa nitelik bozulur.
const tlx = (tl) => tl.map((s) => (s[0] === "txt" ? [s[0], s[1], String(s[2]).replace(/'/g, "\u2019")] : s));
const tel = (K, o) => K.telefon({ ...o, tl: tlx(o.tl || []) });

export const SAHNE = {
  /** Giris filmi: Halkalar'daki davet karti -> Katil -> uc sayfalik tanitim -> Halkaya katil -> gorev -> Oku -> Okudum -> Elhamdulillah. */
  "film-buyuk": (K) => tel(K, {
    size: "lg", tema: "gul",
    aria: `${K.L("tabs.circles")} › ${K.L("bigCircle.join")} › ${K.L("bigCircle.storyJoin")} › ${K.L("bigCircle.taskTitle", { count: 1 })} › ${K.L("bigCircle.markRead")} › ${K.L("bigCircle.doneTitle")}`,
    views: [["h", halkalar(K)], ["s1", hikaye(K, 1), "up"], ["s2", hikaye(K, 2), "fade"], ["s3", hikaye(K, 3), "fade"], ["e", ekran(K), "fade"], ["r", K.V.reader("214"), "push"]],
    overlays: [["cf", okuSorusu(K), "pop"]],
    tl: [["w", 1000], ["tap", "hjoin"], ["go", "s1"], ["w", 1500], ...tlHikaye(), ["w", 1700], ["off", "btoast", "show"], ...tlOku(K), ["w", 2800]],
    still: 0, hint: "hjoin",
  }),

  /** Halkalar sekmesi: davet karti -> Katil -> tanitimin ilk sayfasi. */
  "buyuk-bul": (K) => tel(K, {
    tema: "gul",
    aria: `${K.L("tabs.circles")} › ${K.L("bigCircle.forEveryone")} · ${K.L("bigCircle.title")} › ${K.L("bigCircle.join")} › ${K.L("bigCircle.story1Title")}`,
    views: [["h", halkalar(K)], ["s1", hikaye(K, 1), "up"]],
    tl: [["w", 1300], ["tap", "hjoin"], ["go", "s1"], ["w", 2600]],
    still: 0, hint: "hjoin",
  }),

  /** Tanitim: Devam, Devam, Halkaya katil -> "Halkaya katildin" ve bu haftaki gorev. */
  "buyuk-katil": (K) => tel(K, {
    tema: "gul",
    aria: `${K.L("bigCircle.story1Title")} › ${K.L("bigCircle.story2Title")} › ${K.L("bigCircle.story3Title")} › ${K.L("bigCircle.storyJoin")} › ${K.L("bigCircle.joinedToast")}`,
    views: [["s1", hikaye(K, 1)], ["s2", hikaye(K, 2), "fade"], ["s3", hikaye(K, 3), "fade"], ["e", ekran(K), "fade"]],
    tl: [["w", 1400], ...tlHikaye(), ["w", 2800]],
    still: 6, hint: "sjoin",
  }),

  /** Ana Sayfa karti -> halka ekranindaki gorev karti. */
  "buyuk-gorev": (K) => tel(K, {
    tema: "gul",
    aria: `${K.L("dashboard.myTasks")} › ${K.L("bigCircle.taskKicker")}: ${K.L("bigCircle.taskTitle", { count: 1 })}, ${K.L("bigCircle.pageOne", { pages: SAYFA })}`,
    views: [["a", anaSayfa(K)], ["e", ekran(K), "push"]],
    tl: [["w", 1300], ["tap", "hcard"], ["go", "e"], ["w", 2800]],
    still: 0, hint: "hcard",
  }),

  /** Oku -> sayfa okuyucuda -> Okudum -> soru -> Okudum -> Elhamdulillah. */
  "buyuk-oku": (K) => tel(K, {
    tema: "gul",
    aria: `${K.L("bigCircle.read")} › ${K.L("hatim.markRead")} › ${K.L("bigCircle.readerFinishTitle")} › ${K.L("bigCircle.doneTitle")}`,
    views: [["e", ekran(K)], ["r", K.V.reader("214"), "push"]],
    overlays: [["cf", okuSorusu(K), "pop"]],
    tl: [["w", 1200], ...tlOku(K), ["w", 2800]],
    still: 0, hint: "read",
  }),

  /** Okunduktan sonra: asagida hatim halkasi, bu haftanin toplami, haftanin zikri. */
  "buyuk-ilerleme": (K) => tel(K, {
    tema: "gul",
    aria: `${K.L("bigCircle.doneTitle")} › ${K.L("bigCircle.hatimTitle", { n: 1 })} ${K.L("common.percent", { n: YUZDE })} › ${K.L("bigCircle.dhikrTitle")}`,
    views: [["e", ekran(K, { hal: "done" })]],
    tl: [["w", 1600], ["y", "bsc", "8"], ["w", 600], ["st", "ring", "strokeDashoffset", ofs(YUZDE + 1)], ["txt", "pct", K.L("common.percent", { n: YUZDE + 1 })], ["w", 2600], ["y", "bsc", "0"], ["w", 1400]],
    still: 2,
  }),

  /** ⋮ -> Haftalik payin: 2 sayfa -> gelecek haftadan gecerli. */
  "buyuk-pay": (K) => tel(K, {
    tema: "gul",
    aria: `${K.L("bigCircle.menuA11y")} › ${K.L("bigCircle.menuShare")} › ${K.L("bigCircle.menuNextWeek", { count: 2 })}`,
    views: [["e", ekran(K)]],
    overlays: [["m", menu(K), "sheet"]],
    tl: [["w", 1100], ["tap", "menu"], ["ov", "m"], ["w", 1100], ["tap", "sz2"], ["off", "sz1", "on"], ["on", "sz2", "on"],
      ["txt", "mnote", K.L("bigCircle.menuShareNote", { n: 5 })], ["on", "mnext", "show"], ["w", 2800]],
    still: 3, hint: "sz2",
  }),

  /** Persembe aksami, pay okunmadiysa tek hatirlatma -> dokununca halka ekrani. */
  "buyuk-hatirlat": (K) => tel(K, {
    tema: "gul",
    aria: `${K.e(BO[K.dil].lockDate)} 20:00 › ${K.L("bigCircle.reminderTitle")}: ${K.L("bigCircle.reminderBody", { label: K.L("bigCircle.pageOne", { pages: SAYFA }) })}`,
    views: [["l", kilit(K)], ["e", ekran(K), "fade"]],
    tl: [["w", 900], ["on", "push", "show"], ["w", 2000], ["tap", "push"], ["go", "e"], ["w", 2600]],
    still: 2, hint: "push",
  }),

  /** ⋮ -> Ayril -> okudugun sayfayi isaretle -> Ayril -> yeniden katilma karti. */
  "buyuk-ayril": (K) => tel(K, {
    tema: "gul",
    aria: `${K.L("bigCircle.menuLeave")} › ${K.L("bigCircle.leavePage", { n: SAYFA })} › ${K.L("bigCircle.leaveConfirm")} › ${K.L("bigCircle.rejoin")}`,
    views: [["e", ekran(K)]],
    overlays: [["m", menu(K), "sheet"], ["lv", ayrilma(K), "sheet"]],
    tl: [["w", 900], ["tap", "menu"], ["ov", "m"], ["w", 1000], ["tap", "leaveRow"], ["cl", "m"], ["ov", "lv"], ["w", 1200],
      ["tap", "lp"], ["on", "lp", "on"], ["txt", "lnote", `${K.L("bigCircle.leaveAllRead")} ${K.L("bigCircle.leaveAgain")}`], ["w", 1300],
      ["tap", "lok"], ["cl", "lv"], ["on", "bst", "left"], ["txt", "btoastT", K.L("bigCircle.leftToast")], ["on", "btoast", "show"], ["w", 3000]],
    still: 7, hint: "lp",
  }),

  /** Merkez karti ve paylasim gorseli: "1 sayfa oku" -> Okudum -> Elhamdulillah, hatim halkasi ilerler. */
  "buyuk-kart": (K) => tel(K, {
    tema: "gul",
    aria: `${K.L("bigCircle.taskTitle", { count: 1 })} › ${K.L("bigCircle.markRead")} › ${K.L("bigCircle.doneTitle")} · ${K.L("bigCircle.hatimTitle", { n: 1 })}`,
    views: [["k", kartEkrani(K)]],
    tl: [["w", 1500], ["tap", "kmark"], ["on", "bkk", "done"], ["w", 300], ["st", "kring", "strokeDashoffset", ofs(YUZDE + 1)], ["txt", "kpct", K.L("common.percent", { n: YUZDE + 1 })], ["w", 3200]],
    still: 0,
  }),
};

export const IKON = {
  bkDown: '<path d="M6 9l6 6 6-6"/>',
  bkMore: '<circle cx="5.5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18.5" cy="12" r="1.3" fill="currentColor"/>',
  bkPlay: '<circle cx="12" cy="12" r="8.5"/><path d="M10.2 8.6v6.8l5.3-3.4z"/>',
  bkSync: '<circle cx="12" cy="12" r="8.5"/><path d="M8.6 10.2a3.8 3.8 0 0 1 6.6-1.1M15.4 13.8a3.8 3.8 0 0 1-6.6 1.1M15.4 6.9v2.4H13M8.6 17.1v-2.4H11"/>',
  bkExit: '<path d="M13.5 4.5h5v15h-5M10 8l-4 4 4 4M6 12h9"/>',
  bkBox: '<rect x="4.5" y="4.5" width="15" height="15" rx="3"/>',
  bkBoxOn: '<rect x="4.5" y="4.5" width="15" height="15" rx="3" fill="currentColor"/><path d="M8.2 12.2l2.6 2.6 5-5.2" stroke="#fff"/>',
};

export const CSS = `
  .mp-s .bkh-hd { display: grid; grid-template-columns: 2.4em minmax(0, 1fr) auto; align-items: center; gap: .3em; padding: .3em .9em .5em; flex: none; }
  .mp-s .bkh-hd > b { text-align: center; color: var(--a-pri); font-size: 1em; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .bkh-bk { color: var(--a-pri); display: grid; place-items: center; }
  .mp-s .bkh-hr { display: flex; align-items: center; justify-content: flex-end; gap: .35em; min-width: 2.4em; }
  .mp-s .bkh-mark { width: 2.1em; height: 2.1em; border-radius: 50%; background: var(--a-g1); display: grid; place-items: center; flex: none; box-shadow: 0 0 0 .13em color-mix(in srgb, var(--a-gold) 55%, transparent); }
  .mp-s .bkh-mark .bri { width: 1.25em; height: 1.25em; border-radius: .3em; }
  .mp-s .bkh-mark.lg { width: 4em; height: 4em; } .mp-s .bkh-mark.lg .bri { width: 2.3em; height: 2.3em; border-radius: .55em; }
  .mp-s .bkh-dots { display: grid; place-items: center; color: var(--a-ink); border-radius: .5em; }
  .mp-s .bkh-clip { flex: 1; position: relative; overflow: hidden; }
  .mp-s .bkh-in { display: flex; flex-direction: column; gap: .6em; padding: .2em 1em 2em; }
  .mp-s .bkh-card { display: flex; flex-direction: column; gap: .32em; border-radius: 1.15em; padding: .9em 1em; background: var(--a-card); box-shadow: 0 .4em 1em -.8em rgba(80, 40, 50, .3); }
  .mp-s .bkh-strong { background: var(--a-g1); color: #fff; }
  .mp-s .bkh-kick { display: block; font-size: .6em; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--a-gold); }
  :root[lang="ar"] .mp-s .bkh-kick, :root[lang="ar"] .mp-s .bkh-htop small { letter-spacing: 0; font-size: .7em; }
  .mp-s .bkh-strong .bkh-kick { color: #f0cf8a; }
  .mp-s .bkh-rbw { display: flex; justify-content: space-between; align-items: center; gap: .5em; }
  .mp-s .bkh-rbw .bkh-kick { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .bkh-task { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--a-pri) 40%, transparent), 0 .4em 1em -.8em rgba(80, 40, 50, .3); }
  .mp-s .bkh-chg { display: inline-flex; align-items: center; gap: .1em; flex: none; color: var(--a-pri); font-size: .66em; font-weight: 700; white-space: nowrap; }
  .mp-s .bkh-chg .ic { width: 1.1em; height: 1.1em; }
  .mp-s .bkh-tt { display: block; font-size: 1.5em; line-height: 1.15; }
  .mp-s .bkh-pg { display: block; font-size: .84em; }
  .mp-s .bkh-sm { display: block; font-size: .64em; color: var(--a-mut); }
  .mp-s .bkh-main { display: flex; align-items: center; justify-content: center; gap: .4em; height: 2.85em; border-radius: 1.45em; background: var(--a-pri); color: var(--a-on); font-weight: 700; font-size: .88em; margin-top: .4em; }
  .mp-s .bkh-ghost { display: flex; align-items: center; justify-content: center; gap: .35em; height: 2.5em; border-radius: 1.25em; border: 1px solid var(--a-line); color: var(--a-pri); font-weight: 700; font-size: .84em; white-space: nowrap; }
  .mp-s .bkh-ghost .ic { width: 1.15em; height: 1.15em; }
  .mp-s .bkh-how { display: block; text-align: center; font-size: .58em; color: var(--a-mut); }
  .mp-s .bkh-st > .bkh-card { display: none; }
  .mp-s .bkh-st:not(.done):not(.left) > .bkh-task, .mp-s .bkh-st.done > .bkh-done, .mp-s .bkh-st.left > .bkh-intro { display: flex; animation: bkhin .45s ease both; }
  .mp-s .bkh-st.left ~ .bkh-dh { display: none; }
  @keyframes bkhin { from { opacity: 0; transform: translateY(.5em); } to { opacity: 1; transform: none; } }
  .mp-s .bkh-ok { width: 1.75em; height: 1.75em; border-radius: 50%; background: #f0cf8a; color: var(--a-g1); display: grid; place-items: center; }
  .mp-s .bkh-ok .ic { width: 1.05em; height: 1.05em; stroke-width: 2.6; }
  .mp-s .bkh-dt { display: block; font-size: 1.3em; }
  .mp-s .bkh-done small { display: block; color: rgba(255, 255, 255, .86); font-size: .68em; line-height: 1.4; }
  .mp-s .bkh-mine { display: flex; align-items: center; gap: .25em; margin-top: .1em; }
  .mp-s .bkh-mine i { width: .32em; height: .32em; border-radius: 50%; background: #f0cf8a; }
  .mp-s .bkh-mine b { margin-inline-start: .4em; font-size: .68em; font-weight: 600; }
  .mp-s .bkh-intro { align-items: center; text-align: center; gap: .45em; padding: 1.2em 1em 1em; }
  .mp-s .bkh-it { font-size: 1.1em; }
  .mp-s .bkh-intro small { font-size: .7em; color: var(--a-mut); line-height: 1.4; }
  .mp-s .bkh-intro .bkh-main { align-self: stretch; }
  .mp-s .bkh-intro .bkh-link { color: var(--a-pri); font-weight: 700; font-size: .76em; }
  .mp-s .bkh-wk { padding: .3em .3em 0; }
  .mp-s .bkh-wc { gap: .55em; padding: 1em; background: color-mix(in srgb, var(--a-soft) 75%, var(--a-card)); }
  .mp-s .bkh-wc i { display: block; height: .42em; width: var(--w); border-radius: .3em; background: color-mix(in srgb, var(--a-ink) 17%, transparent); }
  .mp-s .bkh-hat { flex-direction: row; align-items: center; gap: .85em; }
  .mp-s .bkh-hat > div { min-width: 0; }
  .mp-s .bkh-ring { position: relative; width: 4.5em; height: 4.5em; flex: none; display: grid; place-items: center; }
  .mp-s .bkh-ring svg { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotate(-90deg); }
  .mp-s .bkh-rt { fill: none; stroke: rgba(255, 255, 255, .25); stroke-width: 8; }
  .mp-s .bkh-rf { fill: none; stroke: #f0cf8a; stroke-width: 8; stroke-linecap: round; stroke-dasharray: 276.5; transition: stroke-dashoffset 1.1s ease; }
  .mp-s .bkh-ring b { position: relative; font-size: .92em; }
  .mp-s .bkh-hw { display: block; font-size: .74em; font-weight: 600; margin-top: .15em; }
  .mp-s .bkh-hat small:not(.bkh-kick) { display: block; font-size: .66em; color: rgba(255, 255, 255, .85); margin-top: .1em; }
  .mp-s .bkh-dhr { display: flex; align-items: center; gap: .65em; margin-top: .2em; }
  .mp-s .bkh-dhr > div { flex: 1; min-width: 0; }
  .mp-s .bkh-dhr b { display: block; font-size: .88em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .bkh-dhr small { display: block; font-size: .62em; color: var(--a-mut); }
  .mp-s .bkh-dring { width: 2.2em; height: 2.2em; border-radius: 50%; flex: none; background: conic-gradient(var(--a-pri) 0 32%, var(--a-line) 0); -webkit-mask: radial-gradient(circle, transparent 0 .82em, #000 .85em); mask: radial-gradient(circle, transparent 0 .82em, #000 .85em); }
  .mp-s .bkh-pull { flex: none; padding: .5em .9em; border-radius: 1.2em; border: 1px solid var(--a-line); color: var(--a-pri); font-weight: 700; font-size: .74em; }
  .mp-s .bkh-priv { display: block; text-align: center; font-size: .58em; color: var(--a-mut); line-height: 1.4; padding: .2em .8em; }
  .mp-s .bkh-toast { position: absolute; left: 1em; right: 1em; bottom: 1.6em; z-index: 4; display: flex; align-items: center; gap: .45em; padding: .6em .8em; border-radius: 1em; background: #2f2629; color: #fff; font-size: .7em; font-weight: 600; line-height: 1.3; opacity: 0; transform: translateY(.6em); transition: opacity .35s ease, transform .4s ease; pointer-events: none; }
  .mp-s .bkh-toast .ic { color: #8fd3a8; flex: none; }
  .mp-s .bkh-toast.show { opacity: 1; transform: none; }
  /* Halkalar sekmesi */
  .mp-s .bkh-tp { gap: .7em; }
  .mp-s .bkh-hero { position: relative; display: flex; flex-direction: column; gap: .45em; padding: 1.05em 1.1em 1em; border-radius: 1.4em; background: var(--a-g1); color: #fff; }
  .mp-s .bkh-htop { display: flex; align-items: center; gap: .65em; padding-inline-end: 1.6em; }
  .mp-s .bkh-htop .bri { width: 2.5em; height: 2.5em; border-radius: .6em; }
  .mp-s .bkh-htop small { display: block; font-size: .6em; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #f0cf8a; }
  .mp-s .bkh-htop b { display: block; font-size: 1.25em; line-height: 1.15; }
  .mp-s .bkh-hb { display: block; font-size: .72em; color: rgba(255, 255, 255, .86); line-height: 1.4; }
  .mp-s .bkh-hs { display: block; font-size: .76em; }
  .mp-s .bkh-hbtn { display: flex; align-items: center; justify-content: center; height: 2.75em; border-radius: 1.4em; background: #f0cf8a; color: #2a1d10; font-weight: 700; font-size: .9em; margin-top: .2em; }
  .mp-s .bkh-more { position: absolute; top: .75em; inset-inline-end: .85em; color: rgba(255, 255, 255, .75); }
  .mp-s .bkh-anon { display: flex; flex-direction: column; align-items: center; gap: .55em; text-align: center; }
  .mp-s .bkh-anon b { font-size: .92em; }
  .mp-s .bkh-tc { display: flex; gap: .7em; align-items: flex-start; }
  .mp-s .bkh-tc > div { min-width: 0; }
  .mp-s .bkh-tc .bkh-mark { width: 2.4em; height: 2.4em; margin-top: .15em; }
  /* tanitim hikayesi */
  .mp-s .lock.bkh-story { background: linear-gradient(170deg, #4b2c34, #2b171c 72%); color: #f7f3e8; display: flex; flex-direction: column; padding: 3.1em 1.3em 1.6em; }
  .mp-s .bkh-bars { display: flex; gap: .3em; }
  .mp-s .bkh-bars i { flex: 1; height: .18em; border-radius: .2em; background: rgba(247, 243, 232, .25); }
  .mp-s .bkh-bars i.on { background: #e2be6e; }
  .mp-s .bkh-sh { display: flex; justify-content: space-between; align-items: center; margin-top: .6em; }
  .mp-s .bkh-sh small { font-size: .74em; font-weight: 700; }
  .mp-s .bkh-sb { flex: 1; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: .65em; }
  .mp-s .bkh-sb .bri.bkh-lg { width: 6em; height: 6em; border-radius: 1.4em; }
  .mp-s .bkh-sb .bri.bkh-md { width: 4.4em; height: 4.4em; border-radius: 1em; }
  .mp-s .bkh-stt { display: block; font-size: 1.3em; line-height: 1.22; }
  .mp-s .bkh-sb > small { display: block; font-size: .78em; color: rgba(247, 243, 232, .8); line-height: 1.45; }
  .mp-s .bkh-sb > small.bkh-sn { font-size: .7em; color: rgba(247, 243, 232, .66); }
  .mp-s .bkh-sample { align-self: stretch; display: flex; flex-direction: column; gap: .2em; padding: .85em 1em; border-radius: 1.1em; background: rgba(247, 243, 232, .08); border: 1px solid rgba(226, 190, 110, .45); text-align: start; }
  .mp-s .bkh-sample .bkh-sl { color: #e2be6e; font-weight: 700; font-size: .66em; }
  .mp-s .bkh-sample b { font-size: 1.4em; }
  .mp-s .bkh-sample small:last-child { font-size: .78em; color: rgba(247, 243, 232, .8); }
  .mp-s .bkh-sa { display: flex; flex-direction: column; gap: .2em; }
  .mp-s .bkh-sbtn { display: flex; align-items: center; justify-content: center; height: 2.9em; border-radius: 1.45em; background: #e2be6e; color: #1b1a12; font-weight: 700; font-size: .9em; }
  .mp-s .bkh-snot { text-align: center; font-size: .82em; padding: .5em; }
  /* menu ve ayrilma */
  .mp-s .sheet.bkh-menu { gap: .42em; }
  .mp-s .bkh-mt { display: block; font-size: 1.15em; }
  .mp-s .bkh-ms { display: block; font-size: .7em; color: var(--a-mut); font-weight: 600; }
  .mp-s .bkh-chips { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .4em; }
  .mp-s .bkh-chips span { display: flex; flex-direction: column; align-items: center; min-width: 0; padding: .4em .15em; border-radius: .8em; border: 1px solid var(--a-line); transition: background .25s ease, border-color .25s ease; }
  .mp-s .bkh-chips b { font-size: 1em; }
  .mp-s .bkh-chips small { font-size: .58em; color: var(--a-mut); max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .bkh-chips span.on { border-color: var(--a-pri); background: var(--a-soft); }
  .mp-s .bkh-chips span.on b { color: var(--a-pri); }
  .mp-s .bkh-note { display: block; font-size: .62em; color: var(--a-mut); line-height: 1.4; }
  .mp-s .bkh-next { display: none; font-size: .62em; color: var(--a-pri); font-weight: 700; }
  .mp-s .bkh-next.show { display: block; }
  .mp-s .bkh-sep { display: block; height: 1px; background: var(--a-line); margin: .15em 0; }
  .mp-s .bkh-mr { display: flex; align-items: center; gap: .6em; min-height: 2.4em; font-size: .8em; border-radius: .5em; }
  .mp-s .bkh-mr > .ic { color: var(--a-pri); }
  .mp-s .bkh-mr > div { flex: 1; min-width: 0; }
  .mp-s .bkh-mr b { display: block; font-weight: 600; }
  .mp-s .bkh-mr b.f { flex: 1; min-width: 0; }
  .mp-s .bkh-mr small { display: block; font-size: .8em; color: var(--a-mut); }
  .mp-s .bkh-mr.red, .mp-s .bkh-mr.red > .ic { color: var(--a-red); }
  .mp-s .bkh-body { display: block; font-size: .72em; color: var(--a-mut); line-height: 1.4; }
  .mp-s .bkh-pr { display: flex; align-items: center; gap: .55em; padding: .65em .8em; border-radius: .85em; border: 1px solid var(--a-line); font-size: .86em; transition: border-color .25s ease; }
  .mp-s .bkh-pr .ic { color: var(--a-mut); }
  .mp-s .bkh-pr .bx1 { display: none; }
  .mp-s .bkh-pr.on { border-color: var(--a-pri); }
  .mp-s .bkh-pr.on .bx0 { display: none; }
  .mp-s .bkh-pr.on .bx1 { display: inline-block; color: var(--a-pri); }
  .mp-s .bkh-danger { display: flex; justify-content: center; align-items: center; height: 2.75em; border-radius: 1.4em; background: var(--a-red); color: #fff; font-weight: 700; font-size: .88em; margin-top: .3em; }
  .mp-s .bkh-cancel { display: flex; justify-content: center; align-items: center; height: 2.55em; border-radius: 1.3em; border: 1px solid var(--a-line); font-weight: 700; font-size: .84em; }
  .mp-s .bkh-q { font-size: 1.12em; }
  /* merkez karti */
  .mp-s .bkk { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: .9em; padding: .5em 1.2em 3em; }
  .mp-s .bkk .bkh-tt { font-size: 2.15em; }
  .mp-s .bkk .bkh-pg { font-size: 1.05em; }
  .mp-s .bkk .bkh-kick { font-size: .72em; }
  .mp-s .bkk .bkh-ghost { height: 3.1em; font-size: 1em; margin-top: .4em; }
  .mp-s .bkk .bkh-card { padding: 1.1em 1.15em; gap: .4em; }
  .mp-s .bkk-done { display: none; align-items: flex-start; }
  .mp-s .bkk-done .bkh-dt { font-size: 1.8em; }
  .mp-s .bkk-done .bkh-ok { width: 2.4em; height: 2.4em; }
  .mp-s .bkk.done .bkk-task { display: none; }
  .mp-s .bkk.done .bkk-done { display: flex; animation: bkhin .45s ease both; }
  .mp-s .bkk-hat { flex-direction: column; align-items: center; text-align: center; gap: .6em; padding: 1.3em 1em; }
  .mp-s .bkk-hat .bkh-ring { width: 11em; height: 11em; }
  .mp-s .bkk-hat .bkh-ring b { font-size: 2.1em; }
  .mp-s .bkk-hat .bkh-hw { font-size: .92em; }
  .mp-s .bkk-hat small:not(.bkh-kick) { font-size: .8em; }
  @media (prefers-reduced-motion: reduce) { .mp-s .bkh-st > .bkh-card, .mp-s .bkk.done .bkk-done { animation: none !important; } }
`;
