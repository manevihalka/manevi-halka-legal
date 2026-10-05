/**
 * Toplu zikir ve salavat rehberinin ekranlari (5 Eki 2026).
 * Akislar uygulamanin kodundan izlendi (salt okunur):
 *   components/Wizard.tsx            zikir sihirbazi (adim 2 mod, adim 3 secim + adet/vakit penceresi, adim 4 ad)
 *   app/zikir-flow/[id].tsx          zikir gorev ekrani (Ortak Havuz: "Ortak: 840 / 1000", alt panel)
 *   components/zikir/ZikirCounterModal.tsx  sayac (Dokun = +1, Geri al, Toplu Ekle; Kaydet dugmesi YOK)
 *   app/create-event.tsx             Tek Seferlik Halka adim 2 (Bireysel | Toplu)
 * Dugme/baslik metinleri K.L("anahtar") ile uygulamadan; ornek veriler (gorev adi, okunus) ZORNEK'te.
 * Cevsen YOK. Uzun tire YOK.
 */

/** Dile gore ornek veriler (kullanicinin yazdigi gorev adi ve zikrin okunusu). Uygulama metni DEGIL. */
const ZORNEK = {
  tr: { task: "Cuma Salavatı", okSal: "Allâhümme salli alâ Muhammed", okIst: "Estağfirullâh" },
  en: { task: "Friday Salawat", okSal: "Allahumma salli ala Muhammad", okIst: "Astaghfirullah" },
  de: { task: "Freitags-Salawat", okSal: "Allahumma salli ala Muhammad", okIst: "Astaghfirullah" },
  fr: { task: "Salawat du vendredi", okSal: "Allahumma salli ala Muhammad", okIst: "Astaghfirullah" },
  // Arapca arayuzde uygulama Latin okunusu gostermez, yalniz Arapcayi (zikir-flow, ZikirCounterModal)
  ar: { task: "صلوات الجمعة", okSal: null, okIst: null },
};
// Zikrin Arapcasi uygulamanin verisinden (lib/zikir.ts ZIKIR_PRESETS), her dilde ayni
const AR_SAL = "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ";
const AR_IST = "أَسْتَغْفِرُ اللَّهَ";
// Tek Seferlik Halka hazir cipleri koda sabit (app/create-event.tsx ZIKIR_PRESETS), cevrilmez: her dilde ayni
const EV_CHIPS = ["Salavât-ı Şerîfe", "Kelime-i Tevhîd", "İstiğfâr", "Sübhânallâh", "Elhamdülillâh"];
// Sihirbazin hazir listesi (lib/zikir.ts sirasi ve varsayilan adetleri)

const nf = (dil, n) => new Intl.NumberFormat(dil === "ar" ? "ar-u-nu-latn" : dil).format(n);
const ringBg = (p) => `conic-gradient(var(--a-pri) 0 ${p}%, var(--a-line) 0)`;

// ── gorunumler ────────────────────────────────────────────────────────────────

/** Halka ekrani: Okumalar sekmesi, var olan bir hatim gorevi; istenirse yeni zikir satiri. Sag alt + (data-k fab). */
function halka(K, { zikir = false } = {}) {
  const Z = ZORNEK[K.dil];
  const sub = `${K.Le("group.createdOn")} ${K.e(K.X.date)} • ${K.e(K.L("group.membersCountPlural", { count: 5 }))}`;
  const zRow = zikir
    ? `<div class="cd task-row new"><span class="tri">${K.ic("beads")}</span><div><small class="cap">${K.Le("group.sectionZikir")}</small><b>${K.e(Z.task)}</b><small>${K.Le("group.zikirFlowSubShort")}</small></div><span class="act">${K.Le("group.statusActive")}</span></div>`
    : "";
  return `${K.hd({ title: K.X.circle, sub, right: ["leaf", "personAdd", "dots"] })}
    <div class="pg">
      <div class="seg2"><span class="on">${K.Le("group.readingsTab")}</span><span>${K.Le("group.membersTab", { count: 5 })}</span></div>
      ${zRow}
      <div class="cd task-row"><span class="tri">${K.ic("quran")}</span><div><small class="cap">${K.Le("group.sectionKuran")}</small><b>${K.e(K.X.task)}</b><small>30 ${K.Le("units.juz", { count: 30 })}</small></div><span class="act">${K.Le("group.statusActive")}</span></div>
    </div><span class="fab"${K.attr("fab")}>${K.ic("plus")}</span>`;
}

/** Sihirbaz, zikir adim 2: "Zikir hedefi nasil olsun?" Varsayilan secili "Herkese ayni gorev". */
function modAdimi(K) {
  return `${K.wizHd(2, 4)}<div class="pg">
    <b class="t1">${K.Le("wizard.zikirModeQuestion")}</b><small class="t2">${K.Le("wizard.zikirModeHint")}</small>
    <div class="opt on"${K.attr("o1")}><b>${K.Le("wizard.zikirOption1")}</b><small>${K.Le("wizard.zikirOption1Sub")}</small></div>
    <div class="opt"${K.attr("o2")}><b>${K.Le("wizard.zikirOption2")}</b><small>${K.Le("wizard.zikirOption2Sub")}</small></div>
    <div class="opt"><b>${K.Le("wizard.zikirOption3")}</b><small>${K.Le("wizard.zikirOption3Sub")}</small></div>
    ${K.bt(K.L("wizard.continue"), { key: "mnext", cls: "blk lg", iconEnd: "fwd" })}
  </div>`;
}

/** Sihirbaz, zikir adim 3: Esma satiri, hazir listeler; secilenler listesi ve Devam asagida (kaydirilir). */
function secimAdimi(K, { secili = false } = {}) {
  const satir = (ad, adet, key) => `<div class="zk-row"${key ? K.attr(key) : ""}><i class="zk-ck${secili && key ? " on" : ""}"${key ? K.attr(key + "ck") : ""}>${K.ic("check")}</i><b>${K.e(ad)}</b><small class="zk-n">${K.num(String(adet))}</small>${K.ic("chev", "fl")}</div>`;
  // Secilenler satiri her dilde zikrin Turkce yazimli okunusunu basar (Wizard.tsx item.latin, lib/zikir.ts)
  const etiket = ZORNEK.tr.okSal;
  return `${K.wizHd(3, 4)}<div class="zk-wrap"><div class="pg sc"${K.attr("ssc")}>
    <b class="t1">${K.Le("wizard.zikirSelectTitle")}</b><small class="t2 zk-clamp">${K.Le("wizard.zikirSelectHintCollective")}</small>
    <b class="lb">${K.Le("wizard.zikirEsmaSection")}</b>
    <div class="zk-row"><span class="zk-ic">${K.ic("zStar")}</span><div class="zk-tx"><b>${K.Le("wizard.zikirEsmaTitle")}</b><small>${K.Le("wizard.zikirEsmaSub")}</small></div><small class="zk-n">${K.num("0/99")}</small>${K.ic("chev", "fl")}</div>
    <b class="lb">${K.Le("wizard.zikirPresetSection")}</b>
    ${satir(K.L("wizard.zikirPresetSubhanallah"), 33)}
    ${satir(K.L("wizard.zikirPresetElhamdulillah"), 33)}
    ${satir(K.L("wizard.zikirPresetAllahuEkber"), 33)}
    ${satir(K.L("wizard.zikirPresetSalavat"), 100, "ps")}
    ${satir(K.L("wizard.zikirPresetIstigfar"), 100)}
    ${satir(K.L("wizard.zikirPresetKelime"), 100)}
    ${satir(K.L("wizard.zikirPresetHavle"), 100)}
    <div class="zk-row zk-more" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="zk-row zk-add">${K.ic("plus")}<b>${K.Le("wizard.zikirCustomAdd")}</b>${K.ic("zChevDown")}</div>
    <div class="zk-sel${secili ? " show" : ""}"${K.attr("selbox")}>
      <b class="lb">${K.Le("wizard.zikirSelectedCount", { count: 1 })}</b>
      <div class="zk-selrow"><span>${K.e(etiket)} • ${K.num("1000")}</span>${K.ic("x")}</div>
    </div>
    ${K.bt(K.L("wizard.continue"), { key: "snext", cls: `blk lg${secili ? "" : " dis"}`, iconEnd: "fwd" })}
  </div></div>`;
}

/** Adet ve vakit penceresi (alttan): baslik hazir listenin adi, altinda Arapcasi, - sayi +, vakit cipleri. */
function adetPenceresi(K) {
  const cip = (etiket, ikon, on) => `<span class="${on ? "on" : ""}">${K.ic(ikon)}${etiket}</span>`;
  return `<div class="sheet"><i class="grab"></i>
    <b class="t1">${K.Le("wizard.zikirPresetSalavat")}</b><small class="mu zk-arsm" dir="rtl">${AR_SAL}</small>
    <div class="zk-cnt"><span class="zk-cb">${K.ic("zMinus")}</span><span class="zk-cv"${K.attr("cnt")}><b${K.attr("cntv")}>${K.num("100")}</b></span><span class="zk-cb">${K.ic("plus")}</span></div>
    <b class="lb">${K.Le("wizard.zikirItemTimeLabel")}</b>
    <div class="zk-tc">${cip(K.Le("wizard.zikirTimeAllDay"), "clock", true)}${cip(K.Le("wizard.zikirTimeMorning"), "zSun")}${cip(K.Le("wizard.zikirTimeEvening"), "moon")}${cip(K.Le("wizard.zikirTimeBoth"), "zSunMoon")}</div>
    <div class="row2">${K.bt(K.L("common.cancelAction"), { cls: "gh" })}${K.bt(K.L("wizard.zikirAdd"), { key: "cntOk" })}</div>
  </div>`;
}

/** Sihirbaz, zikir adim 4 (Ortak Havuz): "Ortak hedefi adlandir", Gorev adi, Rehber Modu, Ortak Hedefi Baslat. */
function adAdimi(K) {
  return `${K.wizHd(4, 4)}<div class="pg">
    <b class="t1">${K.Le("wizard.zikirCollectiveStepTitle")}</b><small class="t2">${K.Le("wizard.zikirCollectiveStepSubtitle")}</small>
    <b class="lb">${K.Le("wizard.circleTitle")}</b>
    ${K.input({ key: "zname", ph: K.L("wizard.placeholderZikirCollective") })}
    <div class="cd row tgl">${K.ic("compass")}<div><b>${K.Le("wizard.observerModeTitle")}</b><small class="zk-clamp">${K.Le("wizard.observerModeDesc")}</small></div>${K.tg(false)}</div>
    ${K.bt(K.L("wizard.startCollectiveGoal"), { key: "zstart", cls: "blk lg dis", iconEnd: "checkCircle" })}
  </div>`;
}

/** "Basarili / Hedef kuruldu." penceresi (app/group/[id].tsx, zikir dali). */
function basari(K) {
  return `<div class="card-c"><span class="okring">${K.ic("check")}</span><b class="t1 c">${K.Le("common.success")}</b><small class="t2 c">${K.Le("group.circleCreated")}</small>
    <div class="row2">${K.bt(K.L("common.ok"), { cls: "gh" })}${K.bt(K.L("group.goToTaskScreen"), { key: "goTask" })}</div></div>`;
}

/** Zikir gorev ekrani, Ortak Havuz. iki: Istigfar karti da var. Sayilar arg. */
function gorev(K, { iki = true, sal = 840, ist = 360 } = {}) {
  const Z = ZORNEK[K.dil];
  const kart = (ar, ok, cur, hedef, key) => `<div class="zk-card"${key ? K.attr(key) : ""}><b class="zk-ar" dir="rtl">${ar}</b>${ok ? `<small class="zk-ok">${K.e(ok)}</small>` : ""}<small class="zk-pr">${K.Le("zikir.collectiveProgress", { current: cur, target: hedef })}</small></div>`;
  const top = iki ? sal + ist : sal, hedef = iki ? 1500 : 1000;
  const yuzde = Math.round((top / hedef) * 100);
  return `${K.hd({ title: Z.task, right: ["info"] })}
    <div class="pg">
      <div class="zk-cd"><div class="row sp"><small class="cap">${K.ic("clock")} ${K.Le("flow.countdownDayEnds")}</small><b>${K.Le("time.hoursMinsLeftCountdown", { hours: "08", mins: "01" })}</b></div><i class="bar"><i style="width:66%"></i></i><small class="mu">${K.Le("time.deadlineTomorrow", { time: "00:00" })}</small></div>
      <div class="seg"><span class="on">${K.ic("flag")}${K.Le("flow.tabTask")}</span><span>${K.ic("people")}${K.Le("flow.tabCircle")}</span></div>
      <div class="zk-grid">${kart(AR_SAL, Z.okSal, sal, 1000, "csal")}${iki ? kart(AR_IST, Z.okIst, ist, 500) : ""}</div>
    </div>
    <div class="zk-foot"><div class="row"><i class="bar"><i style="width:${yuzde}%"></i></i><b class="zk-pc">${K.Le("common.percent", { n: yuzde })}</b></div><small class="mu c">${K.Le("zikir.collectiveTotal", { done: top, target: hedef })}</small></div>`;
}

/** Ana Sayfa (uye): Gorevlerin, zikir karti "Gunluk zikir hedefi · %80". */
function anaSayfa(K) {
  const Z = ZORNEK[K.dil];
  return `<div class="pg pt">
      <small class="mu">${K.Le("dashboard.greeting")}</small><b class="t1 nm">${K.e(K.X.member)}</b>
      <b class="lb">${K.Le("dashboard.myTasks")}</b>
      <div class="cd tcard"${K.attr("zhome")}><small class="gr">${K.Le("dashboard.halkaOf", { name: K.X.circle })}</small><b>${K.e(Z.task)}</b><i class="bar zk-hbar"><i style="width:80%"></i></i><small>${K.Le("group.zikirFlowSubShort")} · ${K.Le("common.percent", { n: 80 })}</small></div>
      <div class="cd tcard"><small class="gr">${K.Le("dashboard.halkaOf", { name: K.X.circle })}</small><b>${K.e(K.X.task)}</b><small>${K.Le("dashboard.juzTask", { num: 2 })}</small></div>
    </div>${K.tabbar("home")}`;
}

/** Sayac: baslik okunus + "Gun boyu", Arapca, "Anlami", halka 840 / 1.000, Halkanin toplami, Dokun = +1, alt cubuk. */
function sayac(K, { n = 840 } = {}) {
  const Z = ZORNEK[K.dil];
  const baslik = K.dil === "ar" ? AR_SAL : Z.okSal;
  return `<div class="zk-chd"><span class="hb">${K.ic("back", "fl")}</span><div class="c"><b${K.dil === "ar" ? ' dir="rtl"' : ""}>${K.e(baslik)}</b><span class="zk-bdg">${K.ic("clock")}${K.Le("wizard.zikirTimeAllDay")}</span></div><span class="hr mu">${K.ic("zSliders")}</span></div>
    <b class="zk-big-ar" dir="rtl">${AR_SAL}</b>
    <small class="zk-mean">${K.Le("zikir.counterMeaning")} ${K.ic("zChevDown")}</small>
    <div class="zk-ring"${K.attr("ring")} style="background:${ringBg(Math.round(n / 10))}"><div class="zk-in"${K.attr("tapc")}>
      <b class="zk-num"${K.attr("cval")}>${n}</b><small class="zk-tg">${K.num("/ " + nf(K.dil, 1000))}</small>
      <small class="zk-gt">${K.Le("zikir.counterGroupTotal")}</small><small class="zk-hint"${K.attr("csub")}>${K.Le("zikir.tapHint")}</small>
    </div></div>
    <small class="zk-st"${K.attr("cst")}></small>
    <div class="zk-cfoot"><span class="zk-dim"${K.attr("undo")}>${K.ic("zUndo")}<small>${K.Le("zikir.counterUndo")}</small></span><span${K.attr("bulk")}>${K.ic("zLayers")}<small>${K.Le("zikir.bulkAdd")}</small></span></div>`;
}

/** Toplu Ekle karti: +10 / +33 / +100, Miktar + Ekle, Iptal. */
function topluEkle(K) {
  return `<div class="card-c"><b class="t1 c">${K.Le("zikir.bulkAdd")}</b>
    <div class="zk-bp"><span>+10</span><span>+33</span><span${K.attr("b100")}>+100</span></div>
    <div class="row">${K.input({ ph: K.L("zikir.bulkAddPlaceholder") })}${K.bt(K.L("common.add"), { cls: "dis" })}</div>
    <small class="mu c">${K.Le("common.cancel")}</small></div>`;
}

/** Tek Seferlik Halka, adim 2: Zikir ve Hedef. Hazir cipler, eklenen kalem karti Hedef + Bireysel | Toplu. */
function tekAdim2(K) {
  return `<div class="zk-ehd"><span class="hb">${K.ic("back", "fl")}</span><b>${K.Le("event.createTitle")}</b><span></span></div>
    <div class="zk-edots"><i class="on"></i><i class="cur"></i><i></i><i></i></div>
    <div class="pg">
      <b class="t1">${K.Le("event.zikirGoalTitle")}</b><small class="t2">${K.Le("event.zikirGoalSub")}</small>
      <div class="zk-web">${K.ic("web")}<small${K.attr("evweb")}>${K.Le("event.webNoteList")}</small></div>
      <small class="mu zk-lbs">${K.Le("event.addFromPresets")}</small>
      <div class="zk-chips">${EV_CHIPS.map((c, i) => `<span${i === 0 ? K.attr("evsal") : ""}>${K.ic("plus")}${K.e(c)}</span>`).join("")}<span class="zk-esm">${K.ic("zGrid")}${K.Le("event.esmaulHusna")}</span></div>
      <div class="zk-cus"><small class="mu zk-lbs">${K.Le("event.customZikir")}</small>${K.input({ ph: K.L("event.customZikirNamePlaceholder") })}<div class="row">${K.input({ ph: K.L("event.perPersonTargetPlaceholder") })}${K.bt(K.L("event.add"), {})}</div></div>
      <div class="zk-it"${K.attr("evit")}>
        <div class="row sp"><b>${K.e(EV_CHIPS[0])}</b><span class="zk-red">${K.ic("zTrash")}</span></div>
        <div class="row sp"><span class="zk-tgt"><small class="mu">${K.Le("event.target")}</small><span class="zk-tin"${K.attr("evcnt")}>${K.num("1000")}</span></span>
          <span class="zk-mode"><span class="on"${K.attr("evind")}>${K.Le("event.modeIndividual")}</span><span${K.attr("evcol")}>${K.Le("event.modeCollective")}</span></span></div>
      </div>
    </div>
    ${K.bt(K.L("common.continue"), { key: "evnext", cls: "blk lg zk-fix dis", iconEnd: "fwd" })}`;
}

// ── zaman cizelgesi parcalari ─────────────────────────────────────────────────
/** Sayacta uc dokunus: sayi, halka ve "+N bu oturumda" her dokunusta guncellenir. */
const tlSayim = (K) => [1, 2, 3].flatMap((n) => [["tap", "tapc"], ["txt", "cval", String(840 + n)], ["st", "ring", "background", ringBg(84 + n / 10)],
  ["txt", "csub", K.L("zikir.counterSessionAdded", { n })],
  ...(n === 1 ? [["off", "undo", "zk-dim"], ["txt", "cst", K.L("zikir.counterSaving")]] : []), ["w", 250]]);

export const SAHNE = {
  /** Giris filmi: halka ekrani + -> Zikir -> Ortak Havuz -> Salavat 1000 -> ad -> Ortak Hedefi Baslat -> gorev ekrani. */
  "film-zikir": (K) => K.telefon({
    size: "lg",
    aria: `${K.L("wizard.goalZikir")} › ${K.L("wizard.zikirOption2")} › ${K.L("wizard.zikirPresetSalavat")} › ${K.L("wizard.startCollectiveGoal")} › ${K.L("zikir.collectiveTotal", { done: 0, target: 1000 })}`,
    views: [["h", halka(K)], ["w1", K.V.wiz1(), "up"], ["w2", modAdimi(K), "push"], ["w3", secimAdimi(K), "push"], ["w4", adAdimi(K), "push"],
      ["hz", halka(K, { zikir: true }), "fade"], ["t", gorev(K, { iki: false, sal: 0 }), "push"]],
    overlays: [["cs", adetPenceresi(K), "sheet"], ["ok", basari(K), "pop"]],
    tl: [["w", 900], ["tap", "fab"], ["go", "w1"], ["w", 600], ["tap", "wz"], ["go", "w2"], ["w", 500],
      ["tap", "o2"], ["off", "o1", "on"], ["on", "o2", "on"], ["w", 400], ["tap", "mnext"], ["go", "w3"], ["w", 500],
      ["tap", "ps"], ["ov", "cs"], ["w", 400], ["tap", "cnt"], ["txt", "cntv", "1000"], ["w", 500], ["tap", "cntOk"], ["cl", "cs"],
      ["on", "psck", "on"], ["on", "selbox", "show"], ["on", "snext", "en"], ["y", "ssc", "21"], ["w", 500], ["tap", "snext"], ["go", "w4"],
      ["tap", "zname"], ["type", "zname", ZORNEK[K.dil].task], ["on", "zstart", "en"], ["tap", "zstart"], ["go", "hz"], ["ov", "ok"], ["w", 900],
      ["tap", "goTask"], ["cl", "ok"], ["go", "t"], ["w", 2600]],
    still: 0, hint: "fab",
  }),

  /** Halka ekrani -> + -> hedef turu: Zikir -> "Zikir hedefi nasil olsun?" */
  "zikir-gorev-ac": (K) => K.telefon({
    aria: `${K.L("common.add")} › ${K.L("wizard.goalZikir")} › ${K.L("wizard.zikirModeQuestion")}`,
    views: [["h", halka(K)], ["w1", K.V.wiz1(), "up"], ["w2", modAdimi(K), "push"]],
    tl: [["w", 900], ["tap", "fab"], ["go", "w1"], ["w", 1300], ["tap", "wz"], ["go", "w2"], ["w", 1800]],
    still: 1, hint: "fab",
  }),

  /** Mod secimi: Ortak Havuz -> Devam -> zikir secimi. */
  "zikir-havuz": (K) => K.telefon({
    aria: `${K.L("wizard.zikirModeQuestion")} › ${K.L("wizard.zikirOption2")} · ${K.L("wizard.zikirOption2Sub")} › ${K.L("wizard.continue")}`,
    views: [["w2", modAdimi(K)], ["w3", secimAdimi(K), "push"]],
    tl: [["w", 1200], ["tap", "o2"], ["off", "o1", "on"], ["on", "o2", "on"], ["w", 1200], ["tap", "mnext"], ["go", "w3"], ["w", 1800]],
    still: 4, hint: "o2",
  }),

  /** Hazir listeler: Salavat -> adet 1000, Gun boyu -> Ekle -> "1 zikir secildi" -> Devam. */
  "zikir-salavat": (K) => K.telefon({
    aria: `${K.L("wizard.zikirPresetSection")} › ${K.L("wizard.zikirPresetSalavat")} › 1000 · ${K.L("wizard.zikirTimeAllDay")} › ${K.L("wizard.zikirAdd")}`,
    views: [["w3", secimAdimi(K)]],
    overlays: [["cs", adetPenceresi(K), "sheet"]],
    tl: [["w", 900], ["tap", "ps"], ["ov", "cs"], ["w", 900], ["tap", "cnt"], ["txt", "cntv", "1000"], ["w", 1100], ["tap", "cntOk"], ["cl", "cs"],
      ["on", "psck", "on"], ["on", "selbox", "show"], ["on", "snext", "en"], ["w", 700], ["y", "ssc", "21"], ["w", 1100], ["tap", "snext"], ["w", 900]],
    still: 0, hint: "ps",
  }),

  /** Ad ver -> Ortak Hedefi Baslat -> Basarili -> Gorev ekranina git. */
  "zikir-baslat": (K) => K.telefon({
    aria: `${K.L("wizard.zikirCollectiveStepTitle")} › ${K.L("wizard.startCollectiveGoal")} › ${K.L("group.circleCreated")}`,
    views: [["w4", adAdimi(K)], ["hz", halka(K, { zikir: true }), "fade"], ["t", gorev(K, { iki: false, sal: 0 }), "push"]],
    overlays: [["ok", basari(K), "pop"]],
    tl: [["w", 800], ["tap", "zname"], ["type", "zname", ZORNEK[K.dil].task], ["on", "zstart", "en"], ["w", 600], ["tap", "zstart"], ["go", "hz"], ["ov", "ok"], ["w", 1500],
      ["tap", "goTask"], ["cl", "ok"], ["go", "t"], ["w", 2000]],
    still: 1, hint: "zname",
  }),

  /** Uye: Ana Sayfa karti -> gorev ekrani -> Salavat karti -> sayac, dokundukca +1, kendiliginden kaydedilir. */
  "zikir-say": (K) => K.telefon({
    aria: `${K.L("dashboard.myTasks")} › ${K.L("flow.tabTask")} › ${K.L("zikir.tapHint")} › ${K.L("zikir.counterSaved")}`,
    views: [["a", anaSayfa(K)], ["t", gorev(K), "push"], ["c", sayac(K), "up"]],
    tl: [["w", 900], ["tap", "zhome"], ["go", "t"], ["w", 1000], ["tap", "csal"], ["go", "c"], ["w", 800], ...tlSayim(K), ["w", 1300], ["txt", "cst", K.L("zikir.counterSaved")], ["w", 2000]],
    still: 1, hint: "zhome",
  }),

  /** Sayac -> Toplu Ekle -> +100 -> geri -> ortak toplam guncel. */
  "zikir-toplu": (K) => K.telefon({
    aria: `${K.L("zikir.bulkAdd")} › +100 › ${K.L("zikir.collectiveTotal", { done: 1300, target: 1500 })}`,
    views: [["c", sayac(K)], ["t", gorev(K, { sal: 940 }), "back"]],
    overlays: [["b", topluEkle(K), "pop"]],
    tl: [["w", 900], ["tap", "bulk"], ["ov", "b"], ["w", 900], ["tap", "b100"], ["cl", "b"], ["off", "undo", "zk-dim"], ["txt", "cst", K.L("zikir.counterSaving")], ["txt", "cval", "940"], ["st", "ring", "background", ringBg(94)],
      ["txt", "csub", K.L("zikir.counterSessionAdded", { n: 100 })], ["w", 500], ["txt", "cst", K.L("zikir.counterSaved")], ["w", 1300], ["go", "t"], ["w", 2400]],
    still: 0, hint: "bulk",
  }),

  /** Tek Seferlik Halka, Zikir ve Hedef: Salavat-i Serife -> Hedef 1000 -> Toplu -> Devam. */
  "zikir-tek-toplu": (K) => K.telefon({
    aria: `${K.L("event.createTitle")} › ${K.L("event.zikirGoalTitle")} › ${K.L("event.target")} › ${K.L("event.modeCollective")}`,
    views: [["e", tekAdim2(K)]],
    tl: [["w", 900], ["tap", "evsal"], ["on", "evit", "show"], ["txt", "evweb", K.L("event.webNoteListCollectiveOnly")], ["on", "evnext", "en"], ["w", 900], ["tap", "evcnt"], ["txt", "evcnt", "10000"], ["w", 700],
      ["tap", "evcol"], ["off", "evind", "on"], ["on", "evcol", "on"], ["txt", "evweb", K.L("event.webNoteList")], ["w", 1100], ["tap", "evnext"], ["w", 1200]],
    still: 0, hint: "evsal",
  }),
};

export const IKON = {
  zStar: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" fill="currentColor"/>',
  zSun: '<circle cx="12" cy="12" r="3.8"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6"/>',
  zSunMoon: '<circle cx="9" cy="10" r="3.2"/><path d="M9 3.5v1.6M3.5 10h1.6M5.2 6.2l1.1 1.1M12.8 6.2l-1.1 1.1"/><path d="M20 15.5a5 5 0 0 1-6.6-6.3 5 5 0 1 0 6.6 6.3z"/>',
  zMinus: '<path d="M5 12h14"/>',
  zLayers: '<path d="M12 4 3.5 8.5 12 13l8.5-4.5z"/><path d="M3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5"/>',
  zUndo: '<path d="M9 7 4.5 11.5 9 16"/><path d="M4.5 11.5H14a5.5 5.5 0 0 1 0 11h-2"/>',
  zSliders: '<path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="1.8" fill="var(--a-bg)"/><circle cx="15" cy="12" r="1.8" fill="var(--a-bg)"/><circle cx="8" cy="17" r="1.8" fill="var(--a-bg)"/>',
  zChevDown: '<path d="M6 9l6 6 6-6"/>',
  zTrash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6"/>',
  zGrid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4"/>',
};

export const CSS = `
  .mp-s .zk-wrap { flex: 1; position: relative; overflow: hidden; display: flex; flex-direction: column; }
  .mp-s .zk-wrap > .pg { flex: none; overflow: visible; }
  .mp-s .zk-clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .zk-row { display: flex; align-items: center; gap: .6em; padding: .5em .7em; border: 1px solid var(--a-line); background: var(--a-in); border-radius: .8em; font-size: .86em; min-height: 2.9em; }
  .mp-s .zk-row > .ic { color: var(--a-mut); width: 1em; height: 1em; }
  .mp-s .zk-row b { font-size: .96em; }
  .mp-s .zk-tx { min-width: 0; }
  .mp-s .zk-tx b, .mp-s .zk-tx small { display: block; }
  .mp-s .zk-tx small { color: var(--a-mut); font-size: .76em; }
  .mp-s .zk-ic { width: 2em; height: 2em; border-radius: 50%; background: var(--a-soft); color: var(--a-pri); display: grid; place-items: center; flex: none; }
  .mp-s .zk-ck { width: 1.9em; height: 1.9em; border-radius: 50%; background: var(--a-card); box-shadow: inset 0 0 0 .12em var(--a-line); display: grid; place-items: center; flex: none; color: transparent; transition: background .3s ease; }
  .mp-s .zk-ck .ic { width: 1em; height: 1em; }
  .mp-s .zk-ck.on { background: var(--a-pri); box-shadow: none; color: var(--a-on); }
  .mp-s .zk-n { margin-inline-start: auto; color: var(--a-mut); }
  .mp-s .zk-more { justify-content: center; min-height: 1.6em; padding: .2em; background: none; border: 0; gap: .35em; }
  .mp-s .zk-more i { width: .35em; height: .35em; border-radius: 50%; background: var(--a-line); }
  .mp-s .zk-add { color: var(--a-pri); }
  .mp-s .zk-add > .ic:first-child { color: var(--a-pri); width: 1.3em; height: 1.3em; }
  .mp-s .zk-add > .ic:last-child { margin-inline-start: auto; }
  .mp-s .zk-sel { display: none; flex-direction: column; gap: .4em; }
  .mp-s .zk-sel.show { display: flex; }
  .mp-s .zk-selrow { display: flex; align-items: center; justify-content: space-between; gap: .5em; padding: .6em .8em; border: 1px solid var(--a-line); background: var(--a-card); border-radius: .8em; font-size: .82em; }
  .mp-s .zk-selrow .ic { color: var(--a-mut); width: 1.1em; height: 1.1em; }
  .mp-s .zk-arsm { display: block; font-size: .95em; margin-top: -.2em; }
  .mp-s .zk-cnt { display: flex; align-items: center; gap: .6em; margin: .2em 0; }
  .mp-s .zk-cb { width: 2.8em; height: 2.8em; border-radius: 50%; background: var(--a-in); display: grid; place-items: center; flex: none; }
  .mp-s .zk-cv { flex: 1; height: 2.8em; border-radius: .8em; border: 1px solid var(--a-line); background: var(--a-in); display: grid; place-items: center; font-size: 1.15em; }
  .mp-s .zk-tc { display: flex; flex-wrap: wrap; gap: .35em; }
  .mp-s .zk-tc span { display: inline-flex; align-items: center; gap: .3em; padding: .45em .6em; border-radius: .7em; border: 1px solid var(--a-line); background: var(--a-in); font-size: .72em; }
  .mp-s .zk-tc span .ic { width: 1.1em; height: 1.1em; color: var(--a-mut); }
  .mp-s .zk-tc span.on { border-color: var(--a-pri); color: var(--a-pri); font-weight: 700; background: color-mix(in srgb, var(--a-pri) 10%, var(--a-card)); }
  .mp-s .zk-tc span.on .ic { color: var(--a-pri); }
  .mp-s .zk-cd { background: var(--a-soft); border: 1px solid var(--a-line); border-radius: 1em; padding: .75em .9em; }
  .mp-s .zk-cd .cap { display: inline-flex; align-items: center; gap: .3em; color: var(--a-ink); }
  .mp-s .zk-cd .cap .ic { width: 1.2em; height: 1.2em; }
  .mp-s .zk-cd b { color: var(--a-pri); font-size: .95em; }
  .mp-s .zk-cd small.mu { display: block; font-size: .68em; margin-top: .35em; }
  .mp-s .zk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .55em; }
  .mp-s .zk-card { background: var(--a-card); border: 1px solid var(--a-line); border-radius: 1em; padding: .9em .6em .7em; min-height: 8.4em; display: flex; flex-direction: column; align-items: center; text-align: center; gap: .3em; }
  .mp-s .zk-ar { font-size: 1.05em; font-weight: 400; line-height: 1.5; }
  .mp-s .zk-ok { font-size: .72em; }
  .mp-s .zk-pr { margin-top: auto; color: var(--a-mut); font-size: .66em; }
  .mp-s .zk-foot { position: absolute; left: 0; right: 0; bottom: 0; z-index: 3; background: var(--a-card); border-top: 1px solid var(--a-line); padding: .8em 1.15em 1.5em; display: flex; flex-direction: column; gap: .35em; }
  .mp-s .zk-foot .bar { flex: 1; margin: 0; height: .6em; }
  .mp-s .zk-foot small { font-size: .74em; }
  .mp-s .zk-pc { color: var(--a-pri); font-size: 1.3em; }
  .mp-s .zk-hbar { width: 80%; margin: .4em 0 .3em; }
  .mp-s .zk-chd { display: grid; grid-template-columns: 2.4em minmax(0, 1fr) 2.4em; align-items: center; padding: .5em 1em .2em; }
  .mp-s .zk-chd .c b { display: block; font-size: .98em; }
  .mp-s .zk-chd .hr { justify-content: flex-end; }
  .mp-s .zk-bdg { display: inline-flex; align-items: center; gap: .25em; margin-top: .3em; padding: .15em .6em; border-radius: 1em; background: color-mix(in srgb, var(--a-gold) 14%, transparent); color: var(--a-gold); font-size: .68em; font-weight: 700; }
  .mp-s .zk-bdg .ic { width: 1.1em; height: 1.1em; }
  .mp-s .zk-big-ar { display: block; text-align: center; font-size: 1.45em; font-weight: 400; margin-top: .4em; }
  .mp-s .zk-mean { display: flex; align-items: center; justify-content: center; gap: .2em; color: var(--a-pri); font-weight: 700; margin-top: .3em; }
  .mp-s .zk-mean .ic { width: 1em; height: 1em; }
  .mp-s .zk-ring { position: relative; width: 15em; height: 15em; margin: 2.4em auto 0; border-radius: 50%; transition: background .3s ease; }
  .mp-s .zk-in { position: absolute; inset: .95em; border-radius: 50%; background: var(--a-card); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-shadow: 0 0 0 .3em var(--a-bg); }
  .mp-s .zk-num { font-size: 3.6em; font-weight: 800; line-height: 1; letter-spacing: -.02em; }
  .mp-s .zk-tg { color: var(--a-mut); font-size: 1.05em; font-weight: 600; margin-top: .2em; }
  .mp-s .zk-gt { color: var(--a-mut); font-size: .72em; }
  .mp-s .zk-hint { color: var(--a-mut); font-size: .76em; font-weight: 700; margin-top: .3em; }
  .mp-s .zk-st { display: block; text-align: center; color: var(--a-mut); font-size: .74em; min-height: 1.4em; margin-top: .8em; }
  .mp-s .zk-cfoot { position: absolute; left: 0; right: 0; bottom: 0; display: flex; justify-content: space-around; border-top: 1px solid var(--a-line); padding: .7em 1em 1.4em; color: var(--a-pri); }
  .mp-s .zk-cfoot span { display: flex; flex-direction: column; align-items: center; gap: .2em; font-weight: 700; border-radius: .7em; padding: .1em .5em; }
  .mp-s .zk-cfoot .zk-dim { opacity: .4; }
  .mp-s .zk-cfoot small { font-size: .8em; }
  .mp-s .zk-bp { display: flex; gap: .5em; }
  .mp-s .zk-bp span { flex: 1; text-align: center; padding: .65em 0; border-radius: .75em; border: 1px solid var(--a-line); background: var(--a-bg); color: var(--a-pri); font-weight: 700; }
  .mp-s .card-c .row .in { flex: 1; }
  .mp-s .zk-ehd { display: grid; grid-template-columns: 2.4em minmax(0, 1fr) 2.4em; align-items: center; padding: .45em 1em .3em; text-align: center; }
  .mp-s .zk-ehd b { font-size: 1.02em; }
  .mp-s .zk-edots { display: flex; justify-content: center; gap: .35em; padding-bottom: .3em; }
  .mp-s .zk-edots i { width: .45em; height: .45em; border-radius: 1em; background: var(--a-line); }
  .mp-s .zk-edots i.on { background: var(--a-pri); }
  .mp-s .zk-edots i.cur { width: 1.25em; background: var(--a-pri); }
  .mp-s .zk-web { display: flex; gap: .45em; align-items: flex-start; color: var(--a-mut); }
  .mp-s .zk-web .ic { color: var(--a-pri); width: 1.1em; height: 1.1em; }
  .mp-s .zk-web small { font-size: .7em; }
  .mp-s .zk-lbs { font-size: .74em; font-weight: 700; }
  .mp-s .zk-chips { display: flex; flex-wrap: wrap; gap: .35em; }
  .mp-s .zk-chips span { display: inline-flex; align-items: center; gap: .2em; padding: .4em .6em; border-radius: 1em; border: 1px solid var(--a-line); background: var(--a-card); font-size: .72em; }
  .mp-s .zk-chips span .ic { width: 1em; height: 1em; color: var(--a-pri); }
  .mp-s .zk-chips .zk-esm { border-color: var(--a-pri); color: var(--a-pri); font-weight: 700; }
  .mp-s .zk-cus { display: flex; flex-direction: column; gap: .35em; border: 1px solid var(--a-line); border-radius: .95em; padding: .55em .7em; }
  .mp-s .zk-cus .row .in { flex: 1; }
  .mp-s .zk-it { display: none; flex-direction: column; gap: .6em; background: var(--a-card); border: 1px solid var(--a-line); border-radius: .95em; padding: .75em .85em; }
  .mp-s .zk-it.show { display: flex; animation: zkin .45s ease both; }
  @keyframes zkin { from { opacity: 0; transform: translateY(.6em); } to { opacity: 1; transform: none; } }
  .mp-s .zk-it b { font-size: .9em; }
  .mp-s .zk-red { color: var(--a-red); }
  .mp-s .zk-tgt { display: flex; align-items: center; gap: .4em; }
  .mp-s .zk-tgt small { font-size: .72em; }
  .mp-s .zk-tin { min-width: 4em; text-align: center; padding: .35em .5em; border-radius: .6em; border: 1px solid var(--a-line); background: var(--a-in); font-weight: 700; font-size: .85em; }
  .mp-s .zk-mode { display: inline-flex; border: 1px solid var(--a-line); border-radius: .7em; overflow: hidden; font-size: .72em; font-weight: 700; }
  .mp-s .zk-mode span { padding: .45em .7em; color: var(--a-mut); transition: background .25s ease, color .25s ease; }
  .mp-s .zk-mode span.on { background: var(--a-pri); color: var(--a-on); }
  .mp-s .bt.zk-fix { position: absolute; left: 1.15em; right: 1.15em; bottom: 1.4em; width: auto; }
  @media (prefers-reduced-motion: reduce) { .mp-s .zk-it.show { animation: none; } }
`;
