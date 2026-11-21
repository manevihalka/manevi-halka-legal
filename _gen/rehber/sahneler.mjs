/**
 * Hatim rehberinin ekranlari (2.1.0, 21 Kas 2026) ve 30 taneli tur halkasi.
 * Icerik dosyalari bir adimin ekranini kimligiyle ister: sahne: "hatim-onizleme" -> SAHNE["hatim-onizleme"](K).
 * K = kit(dil) (sahne.mjs). CSS ve ek ikonlar sahneler-hatim.mjs'te (uretici yalniz sahneler-*.mjs'ten CSS okur).
 *
 * Akislar uygulamanin kodundan izlendi (salt okunur, SpiritualCircleApp):
 *   app/group/[id].tsx                 halka ekrani: uye seridi + "Davet et", Gorevler | Uyeler, karsilama karti,
 *                                      sagda altta "Gorev ekle"; Kur'an gorevi baslayinca "Hayirli olsun" penceresi
 *   components/circles/CircleWelcomeCard.tsx, CircleMemberStrip.tsx, GroupTaskCard.tsx
 *   components/task/TaskComposer.tsx   "Halkada ne yapalim?" secimi ve tek ekranlik Kur'an hatmi kurma ekrani
 *                                      (onizleme karti + ilk turda kim ne okuyacak + satirlar + gorev adi + Diger ayarlar)
 *   components/task/DistributionScreen.tsx  "Dagitimi kontrol et" / "Sonraki turu ayarla" (sira, oran, kayma)
 *   components/flow/NextRoundCard.tsx  gorev ekraninin Halka sekmesinde yoneticinin "Sonraki tur" karti
 *   app/flow/[id].tsx                  gorev ekrani (Halka Ilerlemesi, TUR SONUNA, Gorevim | Halka, SENIN GOREVIN)
 *   components/flow/AskHelpSheet.tsx   "Kac sayfa icin yardim istiyorsun?" (2.1.0'da soru tersine dondu)
 * Ham kareler: gallery-2026-11/raw/<dil>/h-halka-ust, h-halka, h-dagitim, h-flow (pembe "gul" tema).
 * Dugme/baslik metinleri K.L("anahtar") ile uygulamadan. Uzun tire YOK. Anlatim metninde Cevsen YOK
 * (secim ekranindaki Cevsen karosu uygulamada gorundugu gibi durur).
 */
import { e } from "./sahne.mjs";

/** Dile gore ornek veriler (tarihler, sure adi). Uygulama metni DEGIL. Tarih bicimi ham karelerdeki gibi. */
export const HX = {
  tr: { start2: "20 Kasım 2026", cdDate: "20 Kasım 00:00", yasin: "Yâsîn" },
  en: { start2: "20 November 2026", cdDate: "November 20 00:00", yasin: "Yasin" },
  de: { start2: "20. November 2026", cdDate: "20. November 00:00", yasin: "Yasin" },
  fr: { start2: "20 novembre 2026", cdDate: "20 novembre 00:00", yasin: "Yasin" },
  ar: { start2: "20 نوفمبر 2026", cdDate: "20 نوفمبر 00:00", yasin: "يس" },
};

const TEMA = "gul";
const juzN = (K, n) => K.L("compose.juzOne", { n });
const juzR = (K, a, b) => (a === b ? juzN(K, a) : K.L("compose.juzRange", { start: a, end: b }));
/** Halkadaki sira: 0 Omer (yonetici), 1 Ayse, 2 Yusuf, 3 Zeynep, 4 Mehmet; `ben` "Sen" yazilir. */
const adlar = (K, ben = 0) => K.X.names.map((n, i) => (i === ben ? K.L("flow.you") : n));
const bas = (s) => Array.from(String(s))[0] || "?";
export const grupSatiri = (K, n = 5) => `${K.X.circle} · ${K.L("compose.memberCount", { count: n })}`;

// ── halka ekrani (2.1.0) ──────────────────────────────────────────────────────

function karsilama(K, davetTamam) {
  const adim = (n, done, title, desc, cta, key, primary, icon) =>
    `<div class="hx-ws${done ? " done" : ""}"><span class="hx-wn${primary ? " pr" : ""}">${done ? K.ic("check") : K.num(String(n))}</span><div><b>${title}</b>${done ? "" : `<small>${desc}</small>${K.bt(cta, { key, cls: `sm pill${primary ? "" : " ol"}`, icon })}`}</div></div>`;
  return `<div class="cd hx-wel"><div class="hx-wh"><div><b>${K.Le("group.welcome.title")}</b><small>${K.Le("group.welcome.subtitle")}</small></div>${K.ic("x")}</div>
      ${adim(1, davetTamam, K.Le("group.welcome.step1Title"), K.Le("group.welcome.step1Desc"), K.L("group.welcome.step1Btn"), "shareInv", !davetTamam, "share")}
      ${adim(2, false, K.Le("group.welcome.step2Title"), K.Le("group.welcome.step2Desc"), K.L("group.welcome.step2Btn"), "createTask", davetTamam, "plus")}</div>`;
}

/** Halka ekranindaki gorev karti (GroupTaskCard): halkali simge, TUR, ad, tek satir. */
export function gorevKarti(K, { ic, kind, title, line, key, yeni = false }) {
  return `<div class="hx-tc${yeni ? " new" : ""}"${K.attr(key)}><span class="hx-tr">${K.ic(ic)}</span><div><small class="cap">${K.e(kind)}</small><b>${K.e(title)}</b>${line ? `<small class="hx-tl">${K.e(line)}</small>` : ""}</div>${K.ic("chev", "fl hx-tch")}</div>`;
}
export const hatimKarti = (K, o = {}) => gorevKarti(K, { ic: "quran", kind: K.L("group.sectionKuran"), title: K.X.task, line: `30 ${K.L("units.juz", { count: 30 })}`, ...o });

/**
 * Halka ekrani: baslik (geri, ad, yaprak, uc nokta), uye seridi ve "Davet et", Gorevler | Uyeler,
 * karsilama karti ya da gorev kartlari, Ortak Ameller, sagda altta "Gorev ekle".
 * karsilama: "yeni" (yalniz sen) | "davetli" (kardesler katildi) | null.
 */
export function grupEkrani(K, { uye = 5, karsilama: kh = null, gorevler = [], ameller = [] } = {}) {
  const avs = K.X.names.slice(0, uye).map((n, i) => `<i class="${i === 0 ? "ad" : ""}">${K.e(bas(n))}</i>`).join("");
  const sayi = gorevler.length + ameller.length;
  return `<div class="hx-gh"><span class="hb">${K.ic("back", "fl")}</span><b>${K.e(K.X.circle)}</b><span class="hx-gi">${K.ic("leaf")}${K.ic("hxDots")}</span></div>
    <div class="hx-ms"><span class="hx-avs">${avs}</span><small>${K.Le("group.membersCountPlural", { count: uye })}</small><span class="hx-inv"${K.attr("inv")}>${K.ic("plus")}<b>${K.Le("group.inviteShort")}</b></span></div>
    <div class="hx-tabs"><span class="on">${K.Le("group.tasksTab")} <i>${sayi}</i></span><span>${K.Le("group.membersMenu")} <i>${uye}</i></span></div>
    <div class="pg hx-gp">${kh ? karsilama(K, kh === "davetli") : ""}${gorevler.join("")}${ameller.length ? `<small class="hx-sec">${K.Le("practice.sectionPractices")}</small>${ameller.join("")}` : ""}</div>
    <span class="hx-fab"${K.attr("fab")}>${K.ic("plus")}<b>${K.Le("group.addTask")}</b></span>`;
}

/** Halkalar sekmesi, hesabi olmayan kullanici (app/(tabs)/halkalar.tsx anonim kart). */
function halkalarBos(K) {
  return `<div class="pg pt">
      <div class="cd hero-cd"><span class="badge-ic">${K.ic("people")}</span>
        <b class="t1 c">${K.Le("circlesTab.anonTitle")}</b><small class="t2 c hx-c3">${K.Le("circlesTab.anonDesc")}</small>
        ${K.bt(K.L("circlesTab.anonCreate"), { key: "create", cls: "blk", icon: "plus" })}
        ${K.bt(K.L("circlesTab.anonCreateEvent"), { cls: "blk ol" })}
        ${K.bt(K.L("circlesTab.anonJoin"), { cls: "blk ol" })}
      </div>
    </div>${K.tabbar("circles")}`;
}

// ── "Halkada ne yapalim?" ──────────────────────────────────────────────────────

/** Secim ekrani (TaskComposer "pick"). Ramazan sablonlari yalniz Ramazan yaklasinca cikar: burada yok. */
export function secimEkrani(K) {
  const sec = (t) => `<small class="hx-sec">${K.e(t)}</small>`;
  const tpl = [[K.L("compose.tplWeeklyHatim"), K.L("compose.tplWeeklyHatimSub")], [K.L("compose.tplTwoPages"), K.L("compose.tplTwoPagesSub")],
    [K.L("compose.tplDailyYasin", { name: HX[K.dil].yasin }), K.L("compose.tplDailyYasinSub")]];
  return `<div class="cx-hd"><span class="cx-hb">${K.ic("x")}</span><div class="cx-ht"><small>${K.e(grupSatiri(K))}</small></div></div>
    <div class="hx-pick">${K.C.body(`${K.C.ask(K.L("compose.pickTitle"), K.L("compose.pickSub"))}
      ${sec(K.L("compose.quickStart"))}<div class="hx-tpl">${tpl.map(([b, s]) => `<span><b>${K.e(b)}</b><small>${K.e(s)}</small></span>`).join("")}</div>
      ${sec(K.L("compose.sectionReading"))}${K.C.tiles([
        { ic: "quran", b: K.L("compose.typeHatim"), s: K.L("compose.typeHatimSub"), key: "tHatim" },
        { ic: "hxBookmark", b: K.L("compose.typeSure"), s: K.L("compose.typeSureSub") },
        { ic: "shield", b: K.L("compose.typeCevsen"), s: K.L("compose.typeCevsenSub") },
        { ic: "bookClosed", b: K.L("compose.typeBook"), s: K.L("compose.typeBookSub") }])}
      ${sec(K.L("compose.sectionZikir"))}${K.C.tiles([
        { ic: "beads", b: K.L("compose.typeZikir"), s: K.L("compose.typeZikirSub") },
        { ic: "hand", b: K.L("compose.typeDua"), s: K.L("compose.typeDuaSub") }])}
      ${sec(K.L("compose.sectionPractice"))}${K.C.tiles([
        { ic: "moon", b: K.L("compose.typePrayer"), s: K.L("compose.typePrayerSub") },
        { ic: "hxFast", b: K.L("compose.typeFasting"), s: K.L("compose.typeFastingSub"), key: "tFast" },
        { ic: "cap", b: K.L("compose.typeEzber"), s: K.L("compose.typeEzberSub") }])}
      <small class="hx-hint">${K.Le("compose.practiceNote")}</small>`, "psc")}</div>`;
}

// ── Kur'an hatmi kurma ekrani ─────────────────────────────────────────────────

/** Onizlemedeki 30 tane: ilk turda pay alanlar dolu, senin payin altin, gerisi soluk (taskCompose ringBeads). */
function hatimHalkasi(K, { per = 1, ben = 0 } = {}) {
  const dolu = 5 * per;
  const beads = Array.from({ length: 30 }, (_, i) => {
    const a = (i / 30) * Math.PI * 2 - Math.PI / 2;
    const cls = i < dolu ? (Math.floor(i / per) === ben ? "me" : "on") : "";
    return `<circle cx="${(50 + 42 * Math.cos(a)).toFixed(2)}" cy="${(50 + 42 * Math.sin(a)).toFixed(2)}" r="3.5" class="${cls}"/>`;
  }).join("");
  return `<span class="hx-ring"><svg viewBox="0 0 100 100" aria-hidden="true">${beads}</svg><b>${K.num("30")}</b><small>${K.Le("compose.ringJuz", { count: 30 })}</small></span>`;
}

const onBaslik = (K, per) => K.L("compose.titleSplit", { cadence: K.L("compose.cadWeek"), amount: K.L("compose.unitJuz", { count: per }) });
const onAlt = (K, per) => K.L("compose.subFinish", { count: 5, what: K.L("compose.whatHatim"), duration: K.L("compose.inWeeks", { count: 30 / (5 * per) }) });

/** Kilit simgeli satirlar (Ne okunacak / Nasil okunsun gorev basladiktan sonra degismez). */
function satirlar(K, rows) {
  return `<div class="cx-rows">${rows.map((r) => `<div class="cx-r"${K.attr(r.key)}><span>${K.e(r.lbl)}${r.lock ? K.ic("hxLock", "hx-lk") : ""}</span><b${K.attr(r.key ? r.key + "V" : "")}>${K.e(r.val)}</b>${K.ic("chev", "fl")}</div>`).join("")}</div>`;
}

/**
 * Kur'an hatmi kurma ekrani. per: kisi basi cuz; sira: ilk turdaki sira (halka sirasinin indisleri);
 * onay: "Dagitimi onayladin"; ad: gorev adi (verilmezse otomatik "Haftalik Hatim").
 */
function hatimKurma(K, { per = 1, sira = [0, 1, 2, 3, 4], onay = false, ad } = {}) {
  const ad0 = adlar(K, 0);
  const ben = sira.indexOf(0);
  const ilk3 = sira.slice(0, 3).map((m, j) => `<div class="hx-ar"><i class="${m === 0 ? "me" : ""}">${K.e(bas(ad0[m]))}</i><span>${K.e(ad0[m])}</span><b>${K.e(juzR(K, per * j + 1, per * j + per))}</b></div>`).join("");
  const dagitim = `<div class="hx-dc"><b class="hx-dt">${K.Le("compose.assignTitle")}</b>${ilk3}
      <small class="mu">${K.Le("dist.morePeople", { count: 2 })}</small>
      <b class="hx-ds">${K.Le("dist.statusRotateOff")} · ${K.Le("dist.statusEqual")}</b>
      ${onay ? `<small class="hx-ok">${K.ic("check")}${K.Le("dist.confirmed")}</small>` : ""}
      ${K.bt(K.L("dist.openCreate"), { key: "dbtn", cls: "blk hx-db", icon: "hxSwap" })}</div>`;
  const pv = `<div class="cx-pv hx-pv"><div class="cx-pt"><small class="cx-cap">${K.Le("compose.thisTask")}</small><b>${K.e(onBaslik(K, per))}</b><small class="cx-ds">${K.e(onAlt(K, per))}</small></div>${hatimHalkasi(K, { per, ben })}${dagitim}</div>`;
  const rows = satirlar(K, [
    { lbl: K.L("compose.rowWhat"), val: K.L("compose.valFullJuz"), lock: true },
    { lbl: K.L("compose.rowHow"), val: K.L("compose.howSplitHatim"), lock: true },
    { lbl: K.L("compose.rowCadence"), val: K.L("compose.valCadWeek") },
    { lbl: K.L("compose.rowPer"), val: K.L("compose.unitJuz", { count: per }), key: "per" },
    { lbl: K.L("compose.rowWho"), val: K.L("compose.valWhoAll", { count: 5 }) },
  ]);
  const deger = ad || K.L("compose.nameHatimWeekly");
  const adKarti = `<div class="cx-fd"><small>${K.Le("compose.nameLabel")}</small><span class="in has"${K.attr("tname")}><span class="ph"></span><span class="tx"${K.attr("tnameTx")}>${K.e(deger)}</span><i class="cr"></i></span><small class="cx-hn"${K.attr("nhint")}>${(ad ? K.Le("compose.nameHintCustom") : K.Le("compose.nameHintAuto"))}</small></div>`;
  const tog = (title, desc, on) => `<div class="hx-tg"><div><b>${K.e(title)}</b><small>${K.e(desc)}</small></div>${K.tg(on)}</div>`;
  const diger = `<div class="cx-more hx-more"${K.attr("more")}><div><b>${K.Le("compose.more")}</b><small>${K.Le("compose.sumStartNow")} · ${K.Le("compose.sumMember")} · ${K.Le("compose.sumAuto")}</small></div>${K.ic("chev", "cx-dn")}
      <div class="hx-adv"><div class="hx-tg"><div><b>${K.Le("compose.rowStart")}</b></div><b class="gr">${K.Le("compose.startNow")}</b></div>
      ${tog(K.L("wizard.observerModeTitle"), K.L("wizard.observerModeDesc"), false)}${tog(K.L("wizard.autoAdvanceTitle"), K.L("wizard.autoAdvanceDesc"), true)}
      <small class="hx-tz">${K.Le("compose.tzNote")}</small></div></div>`;
  return `${K.C.hdr({ title: K.L("compose.typeHatim"), sub: grupSatiri(K) })}${K.C.body(pv + rows + adKarti + diger, "csc")}${K.C.foot(K.L("compose.startTask"), { key: "start" })}`;
}

/** "Kisi basi ne kadar" alt penceresi: Cuz cuz | Sayfa sayfa, Her turda - 1 +, canli onizleme satiri. */
function kisiBasi(K) {
  return `<div class="sheet cx-sheet"><i class="grab"></i><b class="cx-sh">${K.Le("compose.perTitle")}</b>
      <small class="hx-sl">${K.Le("compose.perBasis")}</small>
      <div class="cx-chips"><span class="cx-chip on">${K.Le("compose.byJuz")}</span><span class="cx-chip">${K.Le("compose.byPage")}</span></div>
      <div class="hx-step"><span class="hx-stl">${K.Le("compose.perRound")}</span><span class="hx-sb">${K.ic("hxMinus")}</span><b${K.attr("perN")}>${K.num("1")}</b><small${K.attr("perW")}>${K.Le("compose.wordJuz", { count: 1 })}</small><span class="hx-sb"${K.attr("perPlus")}>${K.ic("plus")}</span></div>
      <small class="hx-live"${K.attr("perLive")}>${K.e(`${onBaslik(K, 1)}. ${onAlt(K, 1)}`)}</small>
      <small class="hx-fn">${K.Le("compose.perNote")}</small>
      ${K.bt(K.L("common.ok"), { key: "perOk", cls: "blk cx-cta" })}</div>`;
}

/** Dagitim ekrani. mod "kur": "Dagitimi kontrol et" (1. turdan, Onayla); "sonraki": "Sonraki turu ayarla" (2. turdan, Kaydet). */
function dagitimEkrani(K, { mod = "kur" } = {}) {
  const son = mod === "sonraki";
  const r0 = son ? 2 : 1;
  const ad0 = adlar(K, 0);
  const amount = K.L("compose.unitJuz", { count: 1 });
  const strip = Array.from({ length: 30 }, (_, i) => `<i class="${Math.floor(i / 5) === r0 - 1 ? "cur" : ""}"></i>`).join("");
  const rows = ad0.map((n, j) => `<div class="hx-dr"${K.attr("dr" + j)}><span class="hx-dn">${K.num(String(j + 1))}</span><div class="hx-dw"><b${K.attr("dn" + j)}>${K.e(n)}</b><small>${K.e(juzN(K, 5 * (r0 - 1) + j + 1))}</small></div><span class="hx-wt"><i>−</i><b>${K.num("×1")}</b><i>+</i></span>${K.ic("hxSwap", "hx-sw")}</div>`).join("");
  return `${K.C.hdr({ title: son ? K.L("dist.titleTask") : K.L("dist.titleCreate"), sub: son ? K.L("dist.subEdit", { round: 2, amount }) : K.L("dist.subCreate", { amount }) })}
    ${K.C.body(`<div class="cd hx-rot"><div class="row sp"><b>${K.Le("dist.rotateLabel")}</b>${K.tg(false, "rotTg")}</div><small${K.attr("rotTx")}>${K.Le("dist.rotateOffContinue")} (${K.Le("dist.exampleRoundMe", { round: r0 + 1, part: juzN(K, 5 * r0 + 1) })})</small></div>
      <div class="row sp hx-wr"><b>${K.Le("dist.whoReads")}</b><span class="hx-rt">${[r0, r0 + 1, r0 + 2].map((r, i) => `<i class="${i === 0 ? "on" : ""}">${K.Le("dist.roundTab", { round: r })}</i>`).join("")}</span></div>
      <div class="hx-strip">${strip}</div><small class="mu hx-cov">${K.Le("dist.coverRound", { round: r0, amount: K.L("compose.unitJuz", { count: 5 }) })}</small>
      <small class="mu hx-cl3">${K.Le("dist.swapHint")}</small>
      <small class="hx-swl"${K.attr("swl")}>${K.Le("dist.swapped", { a: ad0[0], b: ad0[2] })}</small>
      ${rows}
      <small class="mu hx-cl2">${K.Le("compose.weightsHint")}</small>`, "dsc")}
    ${K.C.foot(son ? K.L("taskSettings.save") : K.L("dist.confirm"), { key: son ? "dSave" : "dOk", note: son ? K.L("dist.noteFrom", { round: 2 }) : null })}`;
}

// ── gorev ekrani (app/flow/[id].tsx) ──────────────────────────────────────────

/**
 * yonetici: basliktaki disli + Halka sekmesinde "Sonraki tur" karti; sekme: "gorev" | "halka";
 * ben: kimin gozunden (0 Omer yonetici, 1 Ayse uye); hal: "oku" | "bitti"; sos: Halka sekmesinde yardim bekleyen.
 */
function gorevEkrani(K, { yonetici = false, sekme = "gorev", ben = 1, hal = "oku", sos = false, okunan = 0 } = {}) {
  const juzW = K.L("units.juz", { count: 30 });
  const head = `<div class="hx-fh"><span class="hb">${K.ic("back", "fl")}</span><div class="hx-ft"><b>${K.e(K.X.task)}</b><small>${K.Le("flow.roundNo", { n: 1 })} • ${K.Le("flow.roundsLeft", { count: 4 })}</small><small>${K.num(`${okunan} / 30`)} ${K.e(juzW)} • 5 ${K.Le("units.member", { count: 5 })}</small></div><span class="hx-fi">${yonetici ? K.ic("hxGear") : ""}${K.ic("info")}</span></div>`;
  const ust = `<div class="cd hx-pr"><div class="row sp"><b>${K.Le("flow.circleProgress")}</b><small>${K.num(`${okunan} / 30`)} ${K.e(juzW)}</small></div><i class="bar"><i style="width:${Math.max(3, okunan * 3.3)}%"></i></i><small class="hx-pn">${K.Le("flow.hatimCoverageHint", { unit: K.L("flow.unitJuz") })}</small></div>
    <div class="hx-cd"><div class="row sp"><small class="cap">${K.ic("clock")}${K.Le("flow.countdownTurEnds")}</small><b>${K.Le("flow.roundsLeft", { count: 4 })}</b></div><i class="bar"><i style="width:43%"></i></i><small>${K.e(HX[K.dil].cdDate)}</small></div>
    <div class="seg"><span class="${sekme === "gorev" ? "on" : ""}"${K.attr("tabG")}>${K.ic("flag")}${K.Le("flow.tabTask")}</span><span class="${sekme === "halka" ? "on" : ""}"${K.attr("tabH")}>${K.ic("people")}${K.Le("flow.tabCircle")}${sos ? '<em class="rb">1</em>' : ""}</span></div>`;
  const ad = adlar(K, ben);
  let govde = "";
  if (sekme === "gorev" && hal === "bitti") {
    govde = `<div class="cd donec">
        <div class="row"><span class="okc">${K.ic("check")}</span><div><b class="t1">${K.Le("taskDone.title")}</b><small>${K.Le("taskDone.readSub", { what: juzN(K, ben + 1) })}</small></div></div>
        <div class="ringrow"><span class="bring">${Array.from({ length: 5 }, (_, i) => `<i class="${i === ben ? "gold" : i === 0 ? "fill" : ""}" style="--i:${i}"></i>`).join("")}<b>${K.num("2 / 5")}</b><small>${K.Le("taskDone.ringDone")}</small></span>
          <div><b>${K.Le("taskDone.contributionAdded")}</b><small>${K.Le("taskDone.stillReading", { count: 3 })} · ${K.Le("taskDone.roundShort", { round: 1 })}</small></div></div>
        <div class="row2 line"><span class="mu">${K.ic("back", "fl")}${K.Le("flow.undo")}</span><span class="gr">${K.Le("taskDone.viewCircle")}${K.ic("chev", "fl")}</span></div></div>`;
  } else if (sekme === "gorev") {
    govde = `<div class="gcard hx-gc"><small class="cap">${K.Le("flow.myTask")}</small><b class="gbig">${K.e(juzN(K, ben + 1))}</b>
        ${K.bt(K.L("quran.startReading"), { key: "read", cls: "sm pill glass", icon: "book" })}
        <div class="chunks"><small>${K.Le("flow.weeklyTargets")}</small><i class="bar"><i style="width:0"></i></i><small>${K.num("0/4")}</small></div>
        <div class="hx-nt">${K.ic("edit")}<small>${K.Le("flow.notesPlaceholder")}</small></div>
        ${K.bt(K.L("flow.complete"), { key: "complete", cls: "blk wht", icon: "checkCircle" })}
        <div class="row2">${K.bt(K.L("flow.askHelp"), { key: "askHelp", cls: "sm ol w", icon: "hand" })}${K.bt(K.L("flow.excuse"), { key: "excuse", cls: "sm ol w", icon: "archive" })}</div></div>`;
  } else {
    const kart = yonetici
      ? `<div class="hx-nr"><small class="cap gr">${K.Le("nextRound.eyebrow", { round: 2 })}</small><b class="hx-nrt">${K.Le("nextRound.startsOn", { date: HX[K.dil].start2 })}</b>
          ${[0, 1, 2].map((m) => `<div class="hx-ar"><i class="${m === ben ? "me" : ""}">${K.e(bas(ad[m]))}</i><span>${K.e(ad[m])}</span><b>${K.e(juzN(K, 6 + m))}</b></div>`).join("")}
          <small class="mu">${K.Le("dist.morePeople", { count: 2 })}</small><b class="hx-ds">${K.Le("dist.statusRotateOff")} · ${K.Le("dist.statusEqual")}</b>
          ${K.bt(K.L("nextRound.open"), { key: "nrOpen", cls: "blk hx-nrb", icon: "hxSwap" })}<small class="mu hx-cl2">${K.Le("nextRound.note")}</small></div>`
      : sos
        ? `<div class="cd sos"><b class="red">${K.ic("hand")}${K.Le("flow.waitingForHelpTitle")}</b>
          <div class="row sp"><div><b>${K.e(ad[3])}</b><small>${K.e(juzN(K, 4))} • ${K.Le("flow.helpPoolRemainingShort", { start: "72", end: "81", remaining: 10, unit: K.L("units.page", { count: 10 }) })}</small></div>${K.bt(K.L("flow.helpTitle"), { key: "helpBtn", cls: "sm red", icon: "hand" })}</div></div>`
        : "";
    const durum = [["c", K.Le("flow.statusCompleted")], ["p", K.Le("flow.statusProgress")], ["s", K.Le("flow.statusSos")], ["h", K.Le("flow.statusPool")]];
    const uyeler = ad.map((n, i) => `<div class="hx-mr${i === ben ? " me" : ""}"><span class="hx-mav ${i === 3 && sos ? "s" : "p"}">${K.e(bas(n))}</span><span>${K.e(n)}</span><b>${K.e(juzN(K, i + 1))}</b></div>`).join("");
    govde = `${kart}<b class="hx-ml">${K.Le("flow.circleMembersLabel")} · 5 ${K.Le("units.member", { count: 5 })}</b>
      <div class="hx-lg">${durum.map(([c, t]) => `<span><i class="${c}"></i>${t}</span>`).join("")}</div>${uyeler}`;
  }
  return `${head}<div class="pg hx-fp">${ust}${govde}</div>`;
}

/** Kur'an okuyucusu (soyut sayfa; ayet metni cizilmez), ince gorev ilerleme cizgisi, son sayfada "Okudum". */
function okuyucu(K) {
  const satir = [94, 88, 97, 91, 85, 96, 90, 93, 87, 95, 89, 60];
  return `<div class="rd-h"><span class="hb">${K.ic("back", "fl")}</span><b>${K.Le("quran.title")}</b><span class="hr">${K.ic("book")}</span></div>
    <i class="rd-p"><i${K.attr("rprog")}></i></i>
    <div class="mushaf hx-mu" aria-hidden="true">${satir.map((w) => `<i style="--w:${w}%"></i>`).join("")}</div>
    <div class="rd-nav"><span>${K.ic("chev", "fl rot")}</span><span class="pgn"${K.attr("pgn")}>${K.num("٢٢")}</span><span>${K.ic("chev", "fl")}</span></div>
    ${K.bt(K.L("hatim.markRead"), { key: "markRead", cls: "pill float", icon: "check" })}`;
}

// ── ustlukler ─────────────────────────────────────────────────────────────────

const okumaOnay = (K) => `<div class="card-c"><b class="t1 c">${K.Le("flow.readerFinishTitle")}</b><small class="t2 c">${K.e(K.L("flow.readerFinishBody", { start: "22", end: "41" })).replace("22–41", K.num("22–41"))}</small>
    <div class="row2">${K.bt(K.L("common.cancel"), { cls: "gh" })}${K.bt(K.L("hatim.markRead"), { key: "okRead" })}</div></div>`;

const baslatildi = (K) => `<div class="card-c"><span class="okring">${K.ic("check")}</span><b class="t1 c">${K.Le("group.circleStartedTitle")}</b><small class="t2 c">${K.Le("group.circleStarted")}</small>
    <div class="row2">${K.bt(K.L("common.ok"), { cls: "gh" })}${K.bt(K.L("group.goToTaskScreen"), { key: "goTask" })}</div></div>`;

const sayfaAraligi = (K, a, b) => K.L("flow.pageRangeFormat", { start: a, end: b });
/** "Yardim Iste" (AskHelpSheet): kac sayfa icin yardim; yardim gorevin SONUNDAN acilir. Cuz 2 = sayfa 22–41. */
function yardimIste(K) {
  return `<div class="card-c"><b class="t1 c">${K.Le("flow.askHelp")}</b><small class="t2 c">${K.Le("askHelpSheet.questionPage")}</small>
      <div class="hx-step hx-stc"><span class="hx-sb">${K.ic("hxMinus")}</span><b${K.attr("ahN")}>${K.num("10")}</b><span class="hx-sb"${K.attr("ahPlus")}>${K.ic("plus")}</span></div>
      <div class="cx-chips hx-chc"><span class="cx-chip on"${K.attr("ahHalf")}>${K.Le("flow.half")}</span><span class="cx-chip">${K.Le("flow.allWithCount", { count: 20 })}</span></div>
      <div class="hx-split">${K.ic("people")}<small${K.attr("ahTx")}>${K.Le("askHelpSheet.split", { help: sayfaAraligi(K, 32, 41), self: sayfaAraligi(K, 22, 31) })}</small></div>
      <div class="row2">${K.bt(K.L("common.cancelAction"), { cls: "gh" })}${K.bt(K.L("flow.askHelp"), { key: "ahOk" })}</div></div>`;
}

/** "Yardim Et" penceresi (flow/[id].tsx): 4, 8, yarisi, tamami. */
function yardimEt(K) {
  const u = K.L("flow.unitPage");
  return `<div class="card-c"><b class="t1 c">${K.Le("flow.helpTitle")}</b><small class="t2 c">${K.Le("flow.howManyUnitsHelp", { unit: u, remaining: 10 })}</small>
      ${K.bt(`4 ${u}`, { cls: "blk ol" })}${K.bt(`8 ${u}`, { cls: "blk ol" })}${K.bt(`5 ${u} (${K.L("flow.half")})`, { cls: "blk ol" })}${K.bt(K.L("flow.allWithCount", { count: 10 }), { key: "hcAll", cls: "blk ol" })}${K.bt(K.L("common.cancelAction"), { cls: "blk gh" })}</div>`;
}

const kaydedildi = (K) => `<div class="hx-toast">${K.ic("checkCircle")}<small>${K.Le("dist.savedFrom", { round: 2 })}</small></div>`;

// ── merkez karti: 30 tane, turlar sirayla yanar ───────────────────────────────

function kartGorunum(K) {
  const ad = adlar(K, 0);
  const beads = Array.from({ length: 30 }, (_, i) => {
    const a = (i / 30) * Math.PI * 2 - Math.PI / 2;
    return `<circle cx="${(60 + 50 * Math.cos(a)).toFixed(2)}" cy="${(60 + 50 * Math.sin(a)).toFixed(2)}" r="4.6" class="t${Math.floor(i / 5)} m${i % 5}"/>`;
  }).join("");
  return `<div class="hx-k"><small class="cx-cap">${K.Le("compose.thisTask")}</small><b class="hx-kt">${K.e(K.X.task)}</b><small class="mu">${K.e(onBaslik(K, 1))}</small>
      <div class="hx-kr"${K.attr("kr")}><svg viewBox="0 0 120 120" aria-hidden="true">${beads}</svg><div class="hx-kc"><b${K.attr("krT")}>${K.Le("flow.roundNo", { n: 1 })}</b><small${K.attr("krS")}>${K.e(juzR(K, 1, 5))}</small></div></div>
      <div class="hx-kl">${ad.map((n, i) => `<span><i class="m${i}"></i>${K.e(n)}</span>`).join("")}</div></div>`;
}

// ── sahneler ──────────────────────────────────────────────────────────────────

const davetliGrup = (K, o = {}) => grupEkrani(K, { uye: 5, karsilama: "davetli", ...o });
const gorevliGrup = (K) => grupEkrani(K, { uye: 5, gorevler: [hatimKarti(K, { yeni: true })] });

export const SAHNE = {
  /** Halkalar sekmesi -> Halka kur -> Adin ne? -> form. */
  "halka-kur": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("tabs.circles")} › ${K.L("circlesTab.anonCreate")} › ${K.L("nameSheet.title")}`,
    views: [["c", halkalarBos(K)], ["f", K.V.createForm(), "push"]],
    overlays: [["n", K.O.nameSheet(), "pop"]],
    tl: [["w", 700], ["tap", "tab-circles"], ["w", 300], ["tap", "create"], ["ov", "n"], ["w", 500], ["tap", "name"], ["type", "name", K.X.me], ["on", "nameOk", "en"], ["w", 300], ["tap", "nameOk"], ["cl", "n"], ["go", "f"], ["w", 1400]],
    still: 3, hint: "create",
  }),

  /** Formda halka adi -> Halkayi Kur -> guvence penceresi (Daha sonra) -> yeni halka ekrani, karsilama karti.
   *  Dugme uygulamada hep etkin (bos adla tost verir), pasif cizilmez. */
  "halka-form": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("createGroup.title")} › ${K.L("createGroup.create")} › ${K.L("group.welcome.title")}`,
    views: [["f", K.V.createForm()], ["r", grupEkrani(K, { uye: 1, karsilama: "yeni" }), "push"]],
    overlays: [["s", K.O.secure(), "sheet"]],
    tl: [["w", 700], ["tap", "cname"], ["type", "cname", K.X.circle], ["w", 400], ["tap", "cbtn"], ["ov", "s"], ["w", 1300], ["tap", "later"], ["cl", "s"], ["go", "r"], ["w", 1800]],
    still: 3, hint: "cname",
  }),

  /** Karsilama karti -> Davet linkini paylas -> paylasim sayfasi. */
  "davet-paylas": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("group.welcome.title")} › ${K.L("group.welcome.step1Btn")}`,
    views: [["r", grupEkrani(K, { uye: 1, karsilama: "yeni" })]],
    overlays: [["sh", K.O.share(), "sheet"]],
    tl: [["w", 900], ["tap", "shareInv"], ["ov", "sh"], ["w", 1300], ["tap", "app0"], ["w", 500], ["cl", "sh"], ["w", 1200]],
    still: 0, hint: "shareInv",
  }),

  /** Uye seridindeki "Davet et" -> Halkaya Davet Et penceresi (kod, link, QR). */
  "davet-penceresi": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("group.inviteShort")} › ${K.L("group.inviteToCircle")}: ${[K.L("group.shortCode"), K.L("group.inviteLink"), K.L("group.qrCode")].join(K.dil === "ar" ? "، " : ", ")}`,
    views: [["r", davetliGrup(K)]],
    overlays: [["iv", K.O.invite(), "sheet"]],
    tl: [["w", 800], ["tap", "inv"], ["ov", "iv"], ["w", 2600], ["tap", "invShare"], ["w", 900], ["cl", "iv"], ["w", 900]],
    still: 0, hint: "inv",
  }),

  /** Halka ekrani -> Gorev ekle -> Halkada ne yapalim? -> Kur'an hatmi -> kurma ekrani. */
  "hatim-sec": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("group.addTask")} › ${K.L("compose.pickTitle")} › ${K.L("compose.typeHatim")}`,
    views: [["r", davetliGrup(K)], ["p", secimEkrani(K), "up"], ["c", hatimKurma(K), "push"]],
    tl: [["w", 900], ["tap", "fab"], ["go", "p"], ["w", 1400], ["tap", "tHatim"], ["go", "c"], ["w", 2000]],
    still: 0, hint: "fab",
  }),

  /** Kurma ekrani: onizleme -> Kisi basi -> 2 cuz -> onizleme ve ilk tur listesi aninda degisir. */
  "hatim-onizleme": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("compose.thisTask")}: ${onBaslik(K, 1)}. ${onAlt(K, 1)} › ${K.L("compose.rowPer")} › ${onBaslik(K, 2)}. ${onAlt(K, 2)}`,
    views: [["c1", hatimKurma(K)], ["c2", hatimKurma(K, { per: 2 }), "fade"]],
    overlays: [["ps", kisiBasi(K), "sheet"]],
    tl: [["w", 2200], ["tap", "per"], ["ov", "ps"], ["w", 800], ["tap", "perPlus"], ["txt", "perN", "2"], ["txt", "perW", K.L("compose.wordJuz", { count: 2 })],
      ["txt", "perLive", `${onBaslik(K, 2)}. ${onAlt(K, 2)}`], ["w", 1300], ["tap", "perOk"], ["cl", "ps"], ["go", "c2"], ["w", 2400]],
    still: 0, hint: "per",
  }),

  /** Dagitimi kontrol et: iki kisiye sirayla dokun, yer degistirirler -> Onayla -> onizleme yeni sirayla. */
  "hatim-dagitim": (K) => {
    const ad0 = adlar(K, 0);
    return K.telefon({
      tema: TEMA,
      aria: `${K.L("dist.openCreate")} › ${K.L("dist.swapped", { a: ad0[0], b: ad0[2] })} › ${K.L("dist.confirm")}`,
      views: [["c", hatimKurma(K)], ["d", dagitimEkrani(K), "push"], ["c2", hatimKurma(K, { sira: [2, 1, 0, 3, 4], onay: true }), "back"]],
      tl: [["w", 900], ["tap", "dbtn"], ["go", "d"], ["w", 1400], ["tap", "dr0"], ["on", "dr0", "sel"], ["w", 500], ["tap", "dr2"],
        ["off", "dr0", "sel"], ["txt", "dn0", ad0[2]], ["txt", "dn2", ad0[0]], ["on", "swl", "show"], ["w", 1500], ["tap", "dOk"], ["go", "c2"], ["w", 2400]],
      still: 0, hint: "dbtn",
    });
  },

  /** Gorev adi -> Diger ayarlar -> Gorevi baslat -> Hayirli olsun -> Gorev ekranina git. */
  "hatim-baslat": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("compose.nameLabel")} › ${K.L("compose.more")} › ${K.L("compose.startTask")} › ${K.L("group.circleStarted")}`,
    views: [["c", hatimKurma(K)], ["t", gorevEkrani(K, { yonetici: true, ben: 0 }), "push"]],
    overlays: [["ok", baslatildi(K), "pop"]],
    tl: [["w", 600], ["y", "csc", "18"], ["w", 800], ["tap", "tname"], ["txt", "tnameTx", ""], ["type", "tname", K.X.task], ["txt", "nhint", K.L("compose.nameHintCustom")], ["w", 400],
      ["tap", "more"], ["on", "more", "open"], ["y", "csc", "30"], ["w", 1800], ["tap", "start"], ["ov", "ok"], ["w", 1300], ["tap", "goTask"], ["cl", "ok"], ["go", "t"], ["w", 2000]],
    still: 2, hint: "tname",
  }),

  /** Yonetici: gorev ekrani, Halka sekmesi -> Sonraki tur karti -> Sonraki turu ayarla -> kayma -> Kaydet. */
  "sonraki-tur": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("flow.tabCircle")} › ${K.L("nextRound.eyebrow", { round: 2 })} › ${K.L("nextRound.open")} › ${K.L("dist.rotateLabel")} › ${K.L("taskSettings.save")}`,
    views: [["h", gorevEkrani(K, { yonetici: true, sekme: "halka", ben: 0 })], ["d", dagitimEkrani(K, { mod: "sonraki" }), "up"], ["h2", gorevEkrani(K, { yonetici: true, sekme: "halka", ben: 0 }), "fade"]],
    overlays: [["sv", kaydedildi(K), "toast"]],
    tl: [["w", 1000], ["tap", "nrOpen"], ["go", "d"], ["w", 1100], ["tap", "rotTg"], ["on", "rotTg", "on"], ["txt", "rotTx", K.L("dist.rotateOn")], ["w", 1500], ["tap", "dSave"], ["go", "h2"], ["ov", "sv"], ["w", 2200], ["cl", "sv"], ["w", 600]],
    still: 0, hint: "nrOpen",
  }),

  /** Uye: bildirim -> gorev ekrani (push dogrudan gorevi acar; _layout.tsx flowId -> /flow/<id>). */
  "uye-bildirim": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.X.pushTitle} › ${K.L("flow.myTask")}`,
    views: [["l", K.V.lock()], ["t", gorevEkrani(K), "push"]],
    tl: [["w", 500], ["on", "push", "show"], ["w", 1500], ["tap", "push"], ["go", "t"], ["w", 2000]],
    still: 2, hint: "push",
  }),

  /** Uye: Okumaya Basla -> okuyucu -> son sayfa -> Okudum -> Elhamdulillah. */
  "uye-oku": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("quran.startReading")} › ${K.L("hatim.markRead")} › ${K.L("taskDone.title")}`,
    views: [["t", gorevEkrani(K)], ["rd", okuyucu(K), "push"], ["d", gorevEkrani(K, { hal: "bitti", okunan: 2 }), "back"]],
    overlays: [["c", okumaOnay(K), "pop"]],
    tl: [["w", 800], ["tap", "read"], ["go", "rd"], ["w", 500],
      ["st", "rprog", "width", "25%"], ["txt", "pgn", "٢٧"], ["w", 650], ["st", "rprog", "width", "50%"], ["txt", "pgn", "٣٢"], ["w", 650],
      ["st", "rprog", "width", "75%"], ["txt", "pgn", "٣٧"], ["w", 650], ["st", "rprog", "width", "100%"], ["txt", "pgn", "٤١"], ["w", 400],
      ["on", "markRead", "show"], ["w", 700], ["tap", "markRead"], ["ov", "c"], ["w", 700], ["tap", "okRead"], ["cl", "c"], ["go", "d"], ["w", 2400]],
    still: 1, hint: "read",
  }),

  /** Uye: Yardim Iste -> kac sayfa icin yardim (yarisi hazir gelir) -> bir arttir -> Yardim Iste. */
  "yardim-iste": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("flow.askHelp")} › ${K.L("askHelpSheet.questionPage")} › ${K.L("askHelpSheet.split", { help: sayfaAraligi(K, 32, 41), self: sayfaAraligi(K, 22, 31) })}`,
    views: [["t", gorevEkrani(K)]],
    overlays: [["h", yardimIste(K), "pop"]],
    tl: [["w", 900], ["tap", "askHelp"], ["ov", "h"], ["w", 1300], ["tap", "ahPlus"], ["txt", "ahN", "11"], ["off", "ahHalf", "on"],
      ["txt", "ahTx", K.L("askHelpSheet.split", { help: sayfaAraligi(K, 31, 41), self: sayfaAraligi(K, 22, 30) })], ["w", 1400], ["tap", "ahOk"], ["cl", "h"], ["w", 1000]],
    still: 0, hint: "askHelp",
  }),

  /** Halka sekmesi: Yardim Bekleyenler -> Yardim Et -> miktar penceresi (4, 8, yarisi, tamami). */
  "yardim-et": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.L("flow.waitingForHelpTitle")} › ${K.L("flow.helpTitle")} › ${K.L("flow.allWithCount", { count: 10 })}`,
    views: [["c", gorevEkrani(K, { sekme: "halka", sos: true })]],
    overlays: [["hc", yardimEt(K), "pop"]],
    tl: [["w", 1200], ["tap", "helpBtn"], ["ov", "hc"], ["w", 1300], ["tap", "hcAll"], ["cl", "hc"], ["w", 1000]],
    still: 0, hint: "helpBtn",
  }),

  /** Giris filmi: halka kurmaktan hatmi baslatmaya kadar tek akis. */
  "film-hatim": (K) => K.telefon({
    tema: TEMA, size: "lg",
    aria: `${K.L("circlesTab.anonCreate")} › ${K.L("createGroup.create")} › ${K.L("group.addTask")} › ${K.L("compose.typeHatim")} › ${K.L("compose.startTask")}`,
    views: [["c", halkalarBos(K)], ["f", K.V.createForm(), "push"], ["r", davetliGrup(K), "push"],
      ["p", secimEkrani(K), "up"], ["k", hatimKurma(K, { ad: K.X.task }), "push"], ["t", gorevEkrani(K, { yonetici: true, ben: 0 }), "push"]],
    overlays: [["n", K.O.nameSheet(), "pop"], ["ok", baslatildi(K), "pop"]],
    tl: [["w", 900], ["tap", "create"], ["ov", "n"], ["tap", "name"], ["type", "name", K.X.me], ["on", "nameOk", "en"], ["tap", "nameOk"], ["cl", "n"], ["go", "f"],
      ["tap", "cname"], ["type", "cname", K.X.circle], ["tap", "cbtn"], ["go", "r"], ["w", 900],
      ["tap", "fab"], ["go", "p"], ["w", 700], ["tap", "tHatim"], ["go", "k"], ["w", 1500], ["y", "csc", "16"], ["w", 1300],
      ["tap", "start"], ["ov", "ok"], ["w", 1000], ["tap", "goTask"], ["cl", "ok"], ["go", "t"], ["w", 2600]],
    still: 0, hint: "create",
  }),

  /** Merkez karti ve paylasim gorseli: 30 tane, her tur bes cuz yanar. */
  "hatim-kart": (K) => K.telefon({
    tema: TEMA,
    aria: `${K.X.task}: ${onBaslik(K, 1)}. ${K.L("flow.roundNo", { n: 1 })} ${juzR(K, 1, 5)}, ${K.L("flow.roundNo", { n: 2 })} ${juzR(K, 6, 10)}`,
    views: [["k", kartGorunum(K)]],
    tl: [["w", 600], ["on", "kr", "r1"], ["w", 1600], ["on", "kr", "r2"], ["txt", "krT", K.L("flow.roundNo", { n: 2 })], ["txt", "krS", juzR(K, 6, 10)], ["w", 1600],
      ["on", "kr", "r3"], ["txt", "krT", K.L("flow.roundNo", { n: 3 })], ["txt", "krS", juzR(K, 11, 15)], ["w", 2000]],
    still: 6,
  }),
};

/**
 * 30 taneli tur halkasi: her turda 5 kisi sirayla sonraki 5 cuzu alir, 6. turda hatim tamam.
 * Renkler kisiye gore (tane = o turda o kisiye dusen cuz). Metin dugumu svg disinda (okunur).
 * build-rehber.mjs kullanir: imza degismez.
 */
export function turHalkasi(K, { aria } = {}) {
  const R = 92, C = 110, adet = 30;
  const taneler = Array.from({ length: adet }, (_, i) => {
    const a = (i / adet) * Math.PI * 2 - Math.PI / 2;
    return `<circle class="b m${i % 5}" cx="${(C + R * Math.cos(a)).toFixed(2)}" cy="${(C + R * Math.sin(a)).toFixed(2)}" r="7.4"/>`;
  }).join("");
  const turlar = Array.from({ length: 6 }, (_, r) => [K.L("flow.roundNo", { n: r + 1 }), K.L("wizard.juzRangeFormat", { start: r * 5 + 1, end: r * 5 + 5 })]);
  turlar.push([K.L("taskDone.title"), K.L("taskDone.circleHatim", { n: 1 })]);
  return `<figure class="rot" data-r='${e(JSON.stringify(turlar))}' role="img" aria-label="${e(aria || "")}">
      <div class="rot-r"><svg viewBox="0 0 220 220" aria-hidden="true"><circle class="trk" cx="${C}" cy="${C}" r="${R}"/><g class="beads">${taneler}</g><circle class="imame" cx="${C}" cy="${C - R}" r="3.2"/></svg>
      <div class="rot-c"><b>${e(turlar[0][0])}</b><small>${e(turlar[0][1])}</small></div></div>
      <figcaption class="rot-l">${K.X.names.map((n, i) => `<span><i class="m${i}"></i>${e(n)}</span>`).join("")}</figcaption>
      <button type="button" class="mp-pp" aria-label="" hidden></button>
    </figure>`;
}
