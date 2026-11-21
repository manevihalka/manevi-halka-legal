/**
 * Toplu zikir ve salavat rehberinin ekranlari (5 Eki 2026; 21 Kas 2026'da 2.1.0'a gore yenilendi).
 * Akislar uygulamanin kodundan izlendi (salt okunur, SpiritualCircleApp master):
 *   app/group/[id].tsx                  halka ekrani: tek satir baslik, uye seridi + "Davet et", Gorevler/Uyeler,
 *                                       gorev karti (TUR / ad / durum + "Cek"), sag altta "+ Gorev ekle" (yonetici, moderator)
 *   components/task/TaskComposer.tsx    "Halkada ne yapalim?" (Hizli basla, Okuma, Zikir ve dua karolari)
 *   components/task/ZikirComposer.tsx   zikir gorevi kurma (eski dort adimli sihirbazin yerine): "Nasil sayilsin" satiri
 *                                       ve penceresi, Hazir listeler, "Tek tek sec ya da kendin ekle" > Tek zikirler,
 *                                       zikre dokununca Gunluk hedef + 33/100/500/1000 + vakit, Gorev adi, Diger ayarlar, Gorevi baslat
 *   app/zikir-flow/[id].tsx             zikir gorev ekrani (Ortak: 840 / 1000, alt cubuk %, baslikta zil = kisisel hatirlatici)
 *   components/zikir/ZikirCounterModal.tsx  sayac: Halkanin toplami, +N bu oturumda, Kaydedildi; alt cubuk Geri al | Perde | Toplu Ekle;
 *                                       sag ustte Sayac ayarlari (Sayac / Tesbih gorunumu); hedefte altin
 *   components/zikir/TesbihPerdesi.tsx  Perde: ekran kararir, her yer sayar, sayi cok soluk, basili tut = cik
 *   app/create-event.tsx                tek seferlik halka: Birlikte ne okuyalim? > Salavat (1000, toplu) > ozet > Halkayi ac
 *   app/zikir-listesi/[id].tsx + components/zikir/ZikirListStrandCard.tsx  kendi listende tesbih ipi ("Her gun cekiyorum")
 * Dugme/baslik metinleri K.L("anahtar") ile uygulamadan; ornek veriler (gorev adi, okunus) ZORNEK'te.
 * "zikir-tek-toplu" kimligini tek seferlik halka rehberi de kullanabilir: kimlik degismez.
 * Uzun tire YOK. Premium rozeti, kilit, malzeme secimi CIZILMEZ.
 */

/** Dile gore ornek veriler (kullanicinin yazdigi gorev adi ve zikrin okunusu). Uygulama metni DEGIL. */
const ZORNEK = {
  tr: { task: "Ailemizin Salavatı", okSal: "Allâhümme salli alâ Muhammed", okIst: "Estağfirullâh", next: "Sıradaki" },
  en: { task: "Family Salawat", okSal: "Allahumma salli ala Muhammad", okIst: "Astaghfirullah", next: "Next" },
  de: { task: "Familien-Salawat", okSal: "Allahumma salli ala Muhammad", okIst: "Astaghfirullah", next: "Als Nächstes" },
  fr: { task: "Salawat de la famille", okSal: "Allahumma salli ala Muhammad", okIst: "Astaghfirullah", next: "Suivant" },
  // Arapca arayuzde uygulama Latin okunusu gostermez, yalniz Arapcayi (ZikirComposer rowName, ZikirCounterModal)
  ar: { task: "صلوات العائلة", okSal: null, okIst: null, next: "التالي" },
};
export const ZIKIR_ORNEK = ZORNEK;
// Zikrin Arapcasi uygulamanin verisinden (lib/zikir.ts ZIKIR_PRESETS), her dilde ayni
const AR_SAL = "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ";
const AR_IST = "أَسْتَغْفِرُ اللَّهَ";
const AR_SUB = "سُبْحَانَ اللَّهِ";
const AR_HAM = "الْحَمْدُ لِلَّهِ";
const AR_EKB = "اللَّهُ أَكْبَرُ";

const nf = (dil, n) => new Intl.NumberFormat(dil === "ar" ? "ar-u-nu-latn" : dil).format(n);
const ringBg = (p, renk = "var(--a-pri)") => `conic-gradient(${renk} 0 ${p}%, var(--a-line) 0)`;
/** Zikrin listedeki adi (ZikirComposer rowName): Arapcada Arapcasi, ötekilerde okunus. */
const salAd = (K) => (K.dil === "ar" ? AR_SAL : ZORNEK[K.dil].okSal);
const groupLine = (K) => `${K.X.circle} · ${K.L("compose.memberCount", { count: 5 })}`;

// ── gorunumler: halka ────────────────────────────────────────────────────────

/** Halka ekranindaki gorev karti (GroupTaskCard): halka + simge, TUR / ad / durum, sagda dugme ya da altin tik. */
function gorevKarti(K, { ikon, tur, ad, satir, act, done = false, key, actKey, yeni = false }) {
  const sag = act ? `<span class="zh-act"${K.attr(actKey)}>${K.e(act)}</span>` : done ? `<span class="zh-ok">${K.ic("check")}</span>` : "";
  return `<div class="zh-card${yeni ? " new" : ""}"${K.attr(key)}><span class="zh-ri${done ? " done" : ""}">${K.ic(ikon)}</span>`
    + `<div class="zh-ct"><small class="zh-k">${K.e(tur)}</small><b>${K.e(ad)}</b><small class="zh-ln">${K.e(satir)}</small></div>${sag}</div>`;
}

/** 2.1.0 halka ekrani (yonetici): baslik, uye seridi + Davet et, Gorevler/Uyeler, kartlar, sag altta "+ Gorev ekle". */
function halka(K, { zikir = false, fab = true, ad = ZORNEK[K.dil].task } = {}) {
  const avs = K.X.names.slice(0, 5).map((n, i) => `<span class="zh-av${i === 0 ? " adm" : ""}">${K.e(Array.from(n)[0])}</span>`).join("");
  const kartlar = (zikir
    ? gorevKarti(K, { ikon: "beads", tur: K.L("group.sectionZikir"), ad, satir: K.L("groupTaskStatus.circleTodayOf", { done: 0, total: nf(K.dil, 1000) }), act: K.L("event.count"), yeni: true })
    : "")
    + gorevKarti(K, { ikon: "quran", tur: K.L("group.sectionKuran"), ad: K.X.task, satir: K.L("groupTaskStatus.roundDone"), done: true });
  return `<div class="zh-hd"><span class="zh-hb">${K.ic("back", "fl")}</span><b>${K.e(K.X.circle)}</b><span class="zh-hi">${K.ic("leaf")}</span><span class="zh-hi">${K.ic("zDotsH")}</span></div>
    <div class="zh-strip"><span class="zh-avs">${avs}</span><small>${K.Le("group.membersCountPlural", { count: 5 })}</small><span class="zh-inv">${K.ic("plus")}${K.Le("group.inviteShort")}</span></div>
    <div class="zh-tabs"><span class="on">${K.Le("group.tasksTab")} <em>${zikir ? 2 : 1}</em></span><span>${K.Le("group.membersMenu")} <em>5</em></span></div>
    <div class="pg zh-pg">${kartlar}</div>
    ${fab ? `<span class="zh-fab"${K.attr("fab")}>${K.ic("plus")}<span>${K.Le("group.addTask")}</span></span>` : ""}`;
}

/** "Halkada ne yapalim?" (TaskComposer pick): kapat, halka satiri, soru, Hizli basla seridi, Okuma ve Zikir ve dua karolari. */
function secim(K) {
  const sec = (k) => `<small class="zx-sec">${K.Le(k)}</small>`;
  const tpl = (b, s) => `<span><b>${K.e(b)}</b><small>${K.e(s)}</small></span>`;
  return `<div class="cx-hd"><span class="cx-hb">${K.ic("x")}</span><div class="cx-ht"><small>${K.e(groupLine(K))}</small></div></div>
    ${K.C.body(`${K.C.ask(K.L("compose.pickTitle"), K.L("compose.pickSub"))}
      ${sec("compose.quickStart")}
      <div class="zx-strip">${tpl(K.L("compose.tplWeeklyHatim"), K.L("compose.tplWeeklyHatimSub"))}${tpl(K.L("compose.tplTwoPages"), K.L("compose.tplTwoPagesSub"))}${tpl(K.L("zikirTpl.tesbihat.title"), K.L("compose.tplZikirSub"))}</div>
      ${sec("compose.sectionReading")}
      ${K.C.tiles([
        { ic: "quran", b: K.L("compose.typeHatim"), s: K.L("compose.typeHatimSub") },
        { ic: "zBookmark", b: K.L("compose.typeSure"), s: K.L("compose.typeSureSub") },
        { ic: "shield", b: K.L("compose.typeCevsen"), s: K.L("compose.typeCevsenSub") },
        { ic: "bookClosed", b: K.L("compose.typeBook"), s: K.L("compose.typeBookSub") },
      ])}
      ${sec("compose.sectionZikir")}
      ${K.C.tiles([
        { ic: "beads", b: K.L("compose.typeZikir"), s: K.L("compose.typeZikirSub"), key: "tz" },
        { ic: "hand", b: K.L("compose.typeDua"), s: K.L("compose.typeDuaSub") },
      ])}`, "psc")}`;
}

// ── gorunumler: zikir gorevi kurma (ZikirComposer) ───────────────────────────

/** Bos kurma ekrani: Nasil sayilsin satiri, Hazir listeler, "Tek tek sec ya da kendin ekle", altta pasif Gorevi baslat. */
function kurBos(K, { how = K.L("wizard.zikirOption1") } = {}) {
  const row = (title, n) => `<div class="zx-row"><div class="zx-tx"><b>${K.e(title)}</b><small>${K.Le("compose.zikirCount", { count: n })}</small></div><span class="zx-pl">${K.ic("plus")}</span></div>`;
  return `${K.C.hdr({ title: K.L("compose.typeZikir"), sub: groupLine(K) })}
    ${K.C.body(`${K.C.rows([{ lbl: K.L("compose.zikirHow"), val: how, key: "how" }])}
      <small class="zx-sec">${K.Le("wizard.zikirPresetSection")}</small>
      <div class="zx-card">${row(K.L("zikirTpl.tesbihat.title"), 3)}${row(K.L("zikirTpl.fatima.title"), 3)}${row(K.L("zikirTpl.dortsoz.title"), 4)}${row(K.L("zikirTpl.sikinti.title"), 3)}</div>
      <span class="zx-other"${K.attr("other")}>${K.ic("plus")}${K.Le("compose.zikirPickOther")}</span>`, "c0sc")}
    ${K.C.foot(K.L("compose.startTask"), { dis: true, note: K.L("compose.zikirNeedOne") })}`;
}

/** "Nasil sayilsin" penceresi: uc secenek (ComposeOption), Tamam. */
function modPenceresi(K) {
  const opt = (lb, sub, on, key) => `<div class="zx-opt${on ? " on" : ""}"${K.attr(key)}><i class="zx-rad">${K.ic("check")}</i><div><b>${K.e(lb)}</b><small>${K.e(sub)}</small></div></div>`;
  return `<div class="sheet cx-sheet"><i class="grab"></i><b class="cx-sh">${K.Le("compose.zikirHow")}</b><small class="zx-hint">${K.Le("wizard.zikirModeHint")}</small>
    ${opt(K.L("wizard.zikirOption1"), K.L("wizard.zikirOption1Sub"), true, "o1")}${opt(K.L("wizard.zikirOption2"), K.L("wizard.zikirOption2Sub"), false, "o2")}${opt(K.L("wizard.zikirOption3"), K.L("wizard.zikirOption3Sub"), false, "")}
    ${K.bt(K.L("common.ok"), { key: "mok", cls: "blk cx-cta" })}</div>`;
}

/** Zikir ekleme sayfasi: Esmaul Husna, Tek zikirler (dokununca tik), Kendi zikrini ekle; altta Tamam. */
function ekle(K) {
  const pk = (lb, n, key) => `<div class="zx-row zx-pk"${K.attr(key)}><div class="zx-tx"><b>${K.e(lb)}</b><small>${K.num(String(n))}</small></div><span class="zx-n">${K.ic("zAddC")}</span><span class="zx-y">${K.ic("checkCircle")}</span></div>`;
  return `${K.C.hdr({ title: K.L("compose.zikirAdd"), sub: groupLine(K) })}
    ${K.C.body(`<small class="zx-sec">${K.Le("wizard.zikirEsmaSection")}</small>
      <div class="zx-card"><div class="zx-row"><div class="zx-tx"><b>${K.Le("wizard.zikirEsmaTitle")}</b><small>${K.Le("wizard.zikirEsmaSub")}</small></div>${K.ic("chev", "fl zx-ch")}</div></div>
      <small class="zx-sec">${K.Le("compose.zikirSingles")}</small>
      <div class="zx-card">${pk(K.L("wizard.zikirPresetSubhanallah"), 33)}${pk(K.L("wizard.zikirPresetElhamdulillah"), 33)}${pk(K.L("wizard.zikirPresetAllahuEkber"), 33)}${pk(K.L("wizard.zikirPresetSalavat"), 100, "ps")}${pk(K.L("wizard.zikirPresetIstigfar"), 100)}${pk(K.L("wizard.zikirPresetKelime"), 100)}</div>
      <div class="zx-card"><div class="zx-row"><div class="zx-tx"><b class="zx-pri">${K.Le("wizard.zikirCustomAdd")}</b></div>${K.ic("zChevDown", "zx-ch")}</div></div>`, "esc")}
    ${K.C.foot(K.L("common.ok"), { key: "eok" })}`;
}

/** Dolu kurma ekrani: onizleme (Bu gorev, ad, halka + gunluk sayi), Nasil sayilsin, Zikirler, Gorev adi, Diger ayarlar. */
function kurDolu(K, { n = 100 } = {}) {
  const ad = salAd(K);
  const pv = K.C.preview({ cap: K.L("compose.thisTask"), title: ad, desc: `${K.L("compose.zikirEveryDay", { count: 1 })} · ${K.L("wizard.zikirOption2Sub")}`, n, unit: K.L("compose.zikirPerDay"), keyTitle: "pvt" })
    .replace(`<b><bdi dir="ltr">${n}</bdi></b>`, `<b><bdi dir="ltr"${K.attr("pvn")}>${n}</bdi></b>`);
  return `${K.C.hdr({ title: K.L("compose.typeZikir"), sub: groupLine(K) })}
    ${K.C.body(`${pv}
      ${K.C.rows([{ lbl: K.L("compose.zikirHow"), val: K.L("wizard.zikirOption2"), key: "how" }])}
      <small class="zx-sec">${K.Le("compose.zikirList")}</small>
      <div class="zx-card"><div class="zx-row"${K.attr("zrow")}><div class="zx-tx"><b${K.dil === "ar" ? ' dir="rtl"' : ""}>${K.e(ad)}</b><small>${K.Le("wizard.zikirTimeAllDay")}</small></div><b class="zx-cnt"${K.attr("zcnt")}>${n}</b>${K.ic("chev", "fl zx-ch")}</div>
        <div class="zx-row zx-add">${K.ic("plus")}<b>${K.Le("compose.zikirAdd")}</b></div></div>
      <small class="zx-sec">${K.Le("compose.nameLabel")}</small>
      <span class="in has zx-in"${K.attr("zname")}><span class="ph"></span><span class="tx"${K.attr("znameTx")}>${K.e(ad)}</span><i class="cr"></i></span>
      <small class="zx-hn"${K.attr("nhint")}>${K.Le("compose.nameHintAuto")}</small>
      ${K.C.more({ title: K.L("compose.more"), sub: K.L("compose.sumMember") })}`, "c1sc")}
    ${K.C.foot(K.L("compose.startTask"), { key: "zstart" })}`;
}

/** Zikre dokununca: Gunluk hedef (- sayi +), 33/100/500/1000, Bu zikrin vakti, ortak havuz ipucu, Listeden cikar, Tamam. */
function hedefPenceresi(K) {
  const chip = (lb, on, key) => `<span class="cx-chip${on ? " on" : ""}"${K.attr(key)}>${lb}</span>`;
  return `<div class="sheet cx-sheet zx-hs"><i class="grab"></i><b class="cx-sh"${K.dil === "ar" ? ' dir="rtl"' : ""}>${K.e(salAd(K))}</b>
    <small class="zx-sec">${K.Le("wizard.zikirCustomTarget")}</small>
    <div class="zx-step"><span class="zx-sb">${K.ic("zMinus")}</span><span class="zx-sv"${K.attr("hv")}>${K.num("100")}</span><span class="zx-sb">${K.ic("plus")}</span></div>
    <div class="cx-chips">${chip("33")}${chip("100", true, "c100")}${chip("500")}${chip("1000", false, "c1000")}</div>
    <small class="zx-sec">${K.Le("wizard.zikirItemTimeLabel")}</small>
    <div class="cx-chips">${chip(K.Le("wizard.zikirTimeAllDay"), true)}${chip(K.Le("wizard.zikirTimeMorning"))}${chip(K.Le("wizard.zikirTimeEvening"))}${chip(K.Le("wizard.zikirTimeBoth"))}</div>
    <small class="zx-hint">${K.Le("wizard.zikirSelectHintCollective")}</small>
    ${K.bt(K.L("common.ok"), { key: "hok", cls: "blk cx-cta" })}</div>`;
}

/** "Basarili / Hedef kuruldu." penceresi (app/group/[id].tsx, zikir dali). */
function basari(K) {
  return `<div class="card-c"><span class="okring">${K.ic("check")}</span><b class="t1 c">${K.Le("common.success")}</b><small class="t2 c">${K.Le("group.circleCreated")}</small>
    <div class="row2">${K.bt(K.L("common.ok"), { cls: "gh" })}${K.bt(K.L("group.goToTaskScreen"), { key: "goTask" })}</div></div>`;
}

// ── gorunumler: sayma ────────────────────────────────────────────────────────

/** Zikir gorev ekrani, Ortak Havuz (baslikta zil ve bilgi). iki: Istigfar karti da var. */
function gorev(K, { iki = true, sal = 840, ist = 360, ad } = {}) {
  const Z = ZORNEK[K.dil];
  const kart = (ar, ok, cur, hedef, key) => `<div class="zk-card"${key ? K.attr(key) : ""}><b class="zk-ar" dir="rtl">${ar}</b>${ok ? `<small class="zk-ok">${K.e(ok)}</small>` : ""}<small class="zk-pr"${key ? K.attr(key + "N") : ""}>${K.Le("zikir.collectiveProgress", { current: cur, target: hedef })}</small></div>`;
  const top = iki ? sal + ist : sal, hedef = iki ? 1500 : 1000;
  const yuzde = Math.round((top / hedef) * 100);
  return `${K.hd({ title: ad || Z.task, right: ["bell", "info"] })}
    <div class="pg">
      <div class="zk-cd"><div class="row sp"><small class="cap">${K.ic("clock")} ${K.Le("flow.countdownDayEnds")}</small><b>${K.Le("time.hoursMinsLeftCountdown", { hours: "08", mins: "01" })}</b></div><i class="bar"><i style="width:66%"></i></i><small class="mu">${K.Le("time.deadlineTomorrow", { time: "00:00" })}</small></div>
      <div class="seg"><span class="on">${K.ic("flag")}${K.Le("flow.tabTask")}</span><span>${K.ic("people")}${K.Le("flow.tabCircle")}</span></div>
      <div class="zk-grid">${kart(AR_SAL, Z.okSal, sal, 1000, "csal")}${iki ? kart(AR_IST, Z.okIst, ist, 500) : ""}</div>
    </div>
    <div class="zk-foot"><div class="row"><i class="bar"><i style="width:${yuzde}%"></i></i><b class="zk-pc">${K.Le("common.percent", { n: yuzde })}</b></div><small class="mu c">${K.Le("zikir.collectiveTotal", { done: top, target: hedef })}</small></div>`;
}

/** Ana Sayfa (uye): "Bana dusenler" sutunu, zikir karti "Gunluk zikir hedefi · %80"; yanda namaz halkasi taslagi. */
function anaSayfa(K) {
  const Z = ZORNEK[K.dil];
  return `<div class="pg pt">
      <small class="mu">${K.Le("dashboard.greeting")}</small><b class="t1 nm">${K.e(K.X.member)}</b>
      <div class="home2"><div><b class="lb">${K.Le("dashboard.myTasks")}</b>
        <div class="cd tcard"${K.attr("zhome")}><small class="gr">${K.Le("dashboard.halkaOf", { name: K.X.circle })}</small><b>${K.e(Z.task)}</b><i class="bar zk-hbar"><i style="width:80%"></i></i><small>${K.Le("group.zikirFlowSubShort")} · ${K.Le("common.percent", { n: 80 })}</small></div>
        <div class="cd tcard"><small class="gr">${K.Le("dashboard.halkaOf", { name: K.X.circle })}</small><b>${K.e(K.X.task)}</b><small>${K.Le("dashboard.juzTask", { num: 2 })}</small></div></div>
        <div class="ring-sk" aria-hidden="true"><i></i></div></div>
    </div>${K.tabbar("home")}`;
}

/** Sayac ust bandi: geri, okunus + "Gun boyu", Sayac ayarlari. */
function sayacUst(K) {
  return `<div class="zk-chd"><span class="hb">${K.ic("back", "fl")}</span><div class="c"><b${K.dil === "ar" ? ' dir="rtl"' : ""}>${K.e(salAd(K))}</b><span class="zk-bdg">${K.ic("clock")}${K.Le("wizard.zikirTimeAllDay")}</span></div><span class="hr mu"${K.attr("cset")}>${K.ic("zSliders")}</span></div>`;
}
/** Sayac alt cubugu (2.1.0): Geri al | Perde | Toplu Ekle. */
function sayacAlt(K) {
  return `<div class="zk-cfoot"><span class="zk-dim"${K.attr("undo")}>${K.ic("zUndo")}<small>${K.Le("zikir.counterUndo")}</small></span><span${K.attr("perde")}>${K.ic("zEyeOff")}<small>${K.Le("perde.title")}</small></span><span${K.attr("bulk")}>${K.ic("zLayers")}<small>${K.Le("zikir.bulkAdd")}</small></span></div>`;
}

/** Sayac, Sayac gorunumu: Arapca, Anlami, halka 840 / 1.000, Halkanin toplami, Dokun = +1. */
function sayac(K, { n = 840 } = {}) {
  return `${sayacUst(K)}
    <b class="zk-big-ar" dir="rtl">${AR_SAL}</b>
    <small class="zk-mean">${K.Le("zikir.counterMeaning")} ${K.ic("zChevDown")}</small>
    <div class="zk-ring"${K.attr("ring")} style="background:${ringBg(Math.round(n / 10))}"><div class="zk-in"${K.attr("tapc")}>
      <b class="zk-num"${K.attr("cval")}>${n}</b><small class="zk-tg">${K.num("/ " + nf(K.dil, 1000))}</small>
      <small class="zk-gt">${K.Le("zikir.counterGroupTotal")}</small><small class="zk-hint"${K.attr("csub")}>${K.Le("zikir.tapHint")}</small>
    </div></div>
    <small class="zk-st"${K.attr("cst")}></small>
    ${sayacAlt(K)}`;
}

/** Tesbih (ip) tanelerinin yeri: yukaridan saga, asagi sola inen egri; boyut asagi dogru buyur. */
const TANE = Array.from({ length: 9 }, (_, i) => {
  // ikinci derece egri: sag ust (88, 4) -> (44, 30) -> alt orta (47, 88); taneler asagi dogru buyur ve aralanir
  const t = Math.pow(i / 8, 0.85), u = 1 - t;
  return [u * u * 88 + 2 * u * t * 44 + t * t * 47, u * u * 4 + 2 * u * t * 30 + t * t * 88, 1.5 + 1.75 * (i / 8)].map((v) => +v.toFixed(2));
});
/** Sayac, Tesbih gorunumu (koyu temada z-sayac karesindeki gibi): taneler sagda, sayi solda. */
function sayacTesbih(K, { n = 840 } = {}) {
  const Z = ZORNEK[K.dil];
  const taneler = TANE.map(([x, y, s], i) => `<i class="zt-b${i === 5 ? " cur" : ""}" style="left:${x}%;top:${y}%;width:${s}em;height:${s}em"></i>`).join("");
  return `${sayacUst(K)}
    <b class="zk-big-ar zt-ar" dir="rtl">${AR_SAL}</b>
    ${Z.okSal ? `<small class="zt-ok">${K.e(Z.okSal)}</small>` : ""}
    <div class="zt-area"${K.attr("tapc")}><div class="zt-str"${K.attr("str")}><div class="zt-fl">${taneler}</div></div>
      <div class="zt-read"><span><b${K.attr("tval")}>${n}</b><small>${K.num("/ " + nf(K.dil, 1000))}</small></span><small>${K.Le("zikir.counterGroupTotal")}</small><small class="zt-sub"${K.attr("tsub")}>${K.Le("counter.pullHint")}</small></div></div>
    <small class="zk-st zt-st"${K.attr("tst")}></small>
    ${sayacAlt(K)}`;
}

/** Tesbih Perdesi: ekran kararir; Arapca ve okunus soluk, sayi cok soluk, altta ipucu. */
function perde(K, { n = 840 } = {}) {
  const Z = ZORNEK[K.dil];
  return `<div class="zp"${K.attr("pz")}><div class="zp-c"><b class="zp-ar" dir="rtl">${AR_SAL}</b>${Z.okSal ? `<small class="zp-ok">${K.e(Z.okSal)}</small>` : ""}<b class="zp-n"${K.attr("pn")}>${n}</b></div><small class="zp-h">${K.Le("perde.hint")}</small></div>`;
}

/** Toplu Ekle karti: +10 / +33 / +100, Miktar + Ekle, Iptal. */
function topluEkle(K) {
  return `<div class="card-c"><b class="t1 c">${K.Le("zikir.bulkAdd")}</b>
    <div class="zk-bp"><span>+10</span><span>+33</span><span${K.attr("b100")}>+100</span></div>
    <div class="row">${K.input({ ph: K.L("zikir.bulkAddPlaceholder") })}${K.bt(K.L("common.add"), { cls: "dis" })}</div>
    <small class="mu c">${K.Le("common.cancel")}</small></div>`;
}

/** Merkez karti icin iri sayac: yalniz baslik, Arapca ve buyuk halka (az yazi, kucukte okunur). */
function kartSayac(K, { n = 997 } = {}) {
  return `${sayacUst(K)}
    <b class="zk-big-ar" dir="rtl">${AR_SAL}</b>
    <div class="zk-kc"><div class="zk-ring zk-ring-xl"${K.attr("kring")} style="background:${ringBg(n / 10)}"><div class="zk-in"${K.attr("ktap")}>
      <b class="zk-num"${K.attr("kval")}>${nf(K.dil, n)}</b><small class="zk-tg">${K.num("/ " + nf(K.dil, 1000))}</small>
      <small class="zk-gt">${K.Le("zikir.counterGroupTotal")}</small><small class="zk-hint"${K.attr("ksub")}>${K.Le("zikir.tapHint")}</small>
    </div></div></div>`;
}

// ── gorunumler: tek seferlik halka (create-event.tsx) ────────────────────────

/** "Birlikte ne okuyalim?": bes sablon (Hatim, 41 Yasin, Salavat, Cevsen, Kendi listem). */
function evSablon(K) {
  return `<div class="cx-hd"><span class="cx-hb">${K.ic("x")}</span><div class="cx-ht"><small>${K.Le("event.createTitle")}</small></div></div>
    ${K.C.body(`${K.C.ask(K.L("eventCompose.pickTitle"), K.L("eventCompose.pickSub"))}
      ${K.C.tiles([
        { ic: "quran", b: K.L("eventCompose.tplHatim"), s: K.L("eventCompose.tplHatimSub") },
        { ic: "zBookmark", b: K.L("eventCompose.tplYasin41"), s: K.L("eventCompose.tplYasin41Sub") },
        { ic: "beads", b: K.L("eventCompose.tplSalavat"), s: K.L("eventCompose.tplSalavatSub"), key: "evsal" },
        { ic: "shield", b: K.L("eventCompose.tplCevsen"), s: K.L("eventCompose.tplCevsenSub") },
        { ic: "zList", b: K.L("eventCompose.tplCustom"), s: K.L("eventCompose.tplCustomSub"), wide: true },
      ])}`, "evsc")}`;
}

/** Salavat ozeti: onizleme (Bu halka, 1.000 toplu, tempo), Kimin icin / Ne okunacak / Ne zamana kadar, ad, Halkayi ac. */
function evOzet(K) {
  const ad = K.L("globalDhikr.salavat.name"), bin = nf(K.dil, 1000);
  const goal = K.L("event.goalOneCollective", { name: ad, n: bin });
  return `${K.C.hdr({ title: K.L("eventCompose.tplSalavat"), sub: K.L("event.createTitle") })}
    ${K.C.body(`${K.C.preview({ cap: K.L("eventCompose.thisCircle"), title: ad, desc: `${goal} · ${K.L("eventCompose.endDays3")}`, keyDesc: "evds", n: bin, unit: K.L("eventCompose.ringCollective"),
        tempo: K.L("eventCompose.tempoTotal", { people: 10, amount: K.L("eventCompose.unitTimes", { count: 100 }) }) })}
      ${K.C.rows([
        { lbl: K.L("eventCompose.rowFor"), val: K.L("eventCompose.forNone"), mut: true },
        { lbl: K.L("compose.rowWhat"), val: goal },
        { lbl: K.L("eventCompose.rowEnd"), val: K.L("eventCompose.endDays3"), key: "evend" },
      ])}
      ${K.C.field({ lbl: K.L("eventCompose.nameLabel"), val: ad, hint: K.L("compose.nameHintAuto") })}
      ${K.C.more({ title: K.L("compose.more"), sub: `${K.L("compose.rowStart")}: ${K.L("eventCompose.startNow")}` })}`, "ozsc")}
    ${K.C.foot(K.L("eventCompose.cta"), { key: "evopen" })}`;
}

// ── gorunumler: kendi listen (zikir-listesi/[id].tsx) ────────────────────────

/** Tesbih ipi: egri bir ip, gun gun dizilen taneler; yeni tane sonradan gelir (data-k="ipnew"). */
function ip(K, gun) {
  const nokta = (t) => { const x = 6 + 88 * t, y = 8 + 26 * Math.sin(Math.PI * t * .95); return [x, y]; };
  const n = gun + 1, tane = [];
  for (let i = 0; i < n; i++) {
    const [x, y] = nokta(.04 + i * .052);
    tane.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" class="zi-b${i >= gun ? " zi-new" : ""}"${i === gun ? K.attr("ipnew") : ""}/>`);
  }
  const yol = Array.from({ length: 21 }, (_, i) => nokta(i / 20)).map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return `<svg class="zi-svg" viewBox="0 0 100 44" aria-hidden="true"><path d="${yol}" class="zi-ip"/><path d="M6 8 l-.6 10 M6 8 l1.4 9.6 M6 8 l-2.2 9" class="zi-pus"/>${tane.join("")}</svg>`;
}

function liste(K) {
  const row = (lb, ar, n, p) => `<div class="zi-row"><span class="zi-hd">${K.ic("zGrip")}</span><div class="zi-tx"><b>${K.e(lb)}</b><small dir="rtl">${ar}</small><i class="zi-bar"><i style="width:${p}%"${p < 100 ? K.attr("lastbar") : ""}></i></i></div><b class="zi-n">${K.num(String(n))}</b>${K.ic("x", "zi-x")}</div>`;
  return `<div class="zi-top"><span class="zi-bk">${K.ic("back", "fl")}<small>${K.Le("common.back")}</small></span><b>${K.Le("zikirTpl.tesbihat.title")}</b><span class="zi-ti">${K.ic("shareSocial")}${K.ic("plus")}</span></div>
    <div class="pg zi-pg">
      <div class="zi-card"><div class="zi-h"><b${K.attr("iptt")}>${K.Le("zikirStrand.titleRun", { count: 12 })}</b>${K.ic("zPalette")}</div>${ip(K, 12)}<div class="zi-f"><small${K.attr("ipsub")}>${K.Le("zikirStrand.subMore")}</small>${K.ic("chev", "fl")}</div></div>
      <div class="zi-card zi-set"><div class="zi-s1">${K.ic("zRepeat")}<div><b>${K.Le("zikirDaily.toggleTitle")}</b><small>${K.Le("zikirDaily.toggleDesc")}</small></div>${K.tg(true)}</div>
        <div class="zi-s2">${K.ic("bell")}<b>${K.Le("zikirList.reminder.title")}</b><small>${K.Le("zikirList.reminder.off")}</small>${K.ic("chev", "fl")}</div></div>
      ${row(K.L("wizard.zikirPresetSubhanallah"), AR_SUB, 33, 100)}${row(K.L("wizard.zikirPresetElhamdulillah"), AR_HAM, 33, 100)}${row(K.L("wizard.zikirPresetAllahuEkber"), AR_EKB, 33, 62)}
    </div>
    <div class="zi-foot"><small>${K.Le("zikirList.totalCount", { n: 99 })}</small><span class="zi-go">${K.ic("zPlay")}${K.Le("zikirList.start")}</span></div>`;
}

// ── zaman cizelgesi parcalari ─────────────────────────────────────────────────
/** Sayacta uc dokunus: sayi, halka ve "+N bu oturumda" her dokunusta guncellenir. */
const tlSayim = (K) => [1, 2, 3].flatMap((n) => [["tap", "tapc"], ["txt", "cval", String(840 + n)], ["st", "ring", "background", ringBg(84 + n / 10)],
  ["txt", "csub", K.L("zikir.counterSessionAdded", { n })],
  ...(n === 1 ? [["off", "undo", "zk-dim"], ["txt", "cst", K.L("zikir.counterSaving")]] : []), ["w", 250]]);

/** Halka -> Gorev ekle -> Halkada ne yapalim? -> Zikir ve salavat. */
const tlAc = [["tap", "fab"], ["go", "p"], ["w", 700], ["y", "psc", "6"], ["w", 500], ["tap", "tz"], ["go", "c0"]];
/** Nasil sayilsin -> Ortak havuz -> Tamam. */
const tlHavuz = (K) => [["tap", "how"], ["ov", "ms"], ["w", 500], ["tap", "o2"], ["off", "o1", "on"], ["on", "o2", "on"], ["w", 450], ["tap", "mok"], ["cl", "ms"], ["txt", "howV", K.L("wizard.zikirOption2")]];
/** Tek tek sec -> Salavat -> Tamam -> dolu ekran. */
const tlSec = [["tap", "other"], ["go", "e"], ["w", 600], ["tap", "ps"], ["on", "ps", "on"], ["w", 450], ["tap", "eok"], ["go", "c1"]];
/** Zikre dokun -> 1000 -> Tamam: onizleme ve satir guncellenir. */
const tlHedef = [["tap", "zrow"], ["ov", "hs"], ["w", 500], ["tap", "c1000"], ["off", "c100", "on"], ["on", "c1000", "on"], ["txt", "hv", "1000"], ["w", 500], ["tap", "hok"], ["cl", "hs"],
  ["txt", "zcnt", "1000"], ["txt", "pvn", "1000"]];

/** K.telefon sarmalayicisi: zaman cizelgesi tek tirnakli data-tl ozelliginde durur; metindeki duz kesme
 *  isareti (You've, l'appli) ozelligi erken kapatmasin diye tipografik kesmeye cevrilir. */
const tel = (K, o) => K.telefon({ ...o, tl: (o.tl || []).map((st) => st.map((v, i) => (i >= 2 && typeof v === "string" ? v.replace(/'/g, "\u2019") : v))) });

export const SAHNE = {
  /** Giris filmi: halka -> Gorev ekle -> Zikir ve salavat -> Ortak havuz -> Salavat -> 1000 -> Gorevi baslat -> gorev ekrani. */
  "film-zikir": (K) => tel(K, {
    size: "lg",
    aria: `${K.L("group.addTask")} › ${K.L("compose.typeZikir")} › ${K.L("wizard.zikirOption2")} › ${K.L("wizard.zikirPresetSalavat")} › ${K.L("compose.startTask")} › ${K.L("zikir.collectiveTotal", { done: 0, target: 1000 })}`,
    views: [["h", halka(K)], ["p", secim(K), "up"], ["c0", kurBos(K), "push"], ["e", ekle(K), "push"], ["c1", kurDolu(K), "back"],
      ["hz", halka(K, { zikir: true, ad: salAd(K) }), "fade"], ["t", gorev(K, { iki: false, sal: 0, ad: salAd(K) }), "push"]],
    overlays: [["ms", modPenceresi(K), "sheet"], ["hs", hedefPenceresi(K), "sheet"], ["ok", basari(K), "pop"]],
    tl: [["w", 900], ...tlAc, ["w", 500], ...tlHavuz(K), ["w", 400], ...tlSec, ["w", 500], ...tlHedef, ["w", 500],
      ["tap", "zstart"], ["go", "hz"], ["ov", "ok"], ["w", 1000], ["tap", "goTask"], ["cl", "ok"], ["go", "t"], ["w", 2600]],
    still: 0, hint: "fab",
  }),

  /** Halka ekrani -> + Gorev ekle -> Halkada ne yapalim? -> Zikir ve salavat -> bos kurma ekrani. */
  "zikir-gorev-ac": (K) => tel(K, {
    aria: `${K.L("group.addTask")} › ${K.L("compose.pickTitle")} › ${K.L("compose.typeZikir")}`,
    views: [["h", halka(K)], ["p", secim(K), "up"], ["c0", kurBos(K), "push"]],
    tl: [["w", 900], ...tlAc, ["w", 2000]],
    still: 0, hint: "fab",
  }),

  /** Nasil sayilsin -> Ortak havuz -> Tamam. */
  "zikir-havuz": (K) => tel(K, {
    aria: `${K.L("compose.zikirHow")} › ${K.L("wizard.zikirOption2")} · ${K.L("wizard.zikirOption2Sub")} › ${K.L("common.ok")}`,
    views: [["c0", kurBos(K)]],
    overlays: [["ms", modPenceresi(K), "sheet"]],
    tl: [["w", 1000], ...tlHavuz(K), ["w", 2200]],
    still: 7, hint: "how",
  }),

  /** Tek tek sec -> Salavat -> Tamam -> zikre dokun -> Gunluk hedef 1000 -> Tamam. */
  "zikir-salavat": (K) => tel(K, {
    aria: `${K.L("compose.zikirPickOther")} › ${K.L("wizard.zikirPresetSalavat")} › ${K.L("wizard.zikirCustomTarget")}: 1000 › ${K.L("common.ok")}`,
    views: [["c0", kurBos(K, { how: K.L("wizard.zikirOption2") })], ["e", ekle(K), "push"], ["c1", kurDolu(K), "back"]],
    overlays: [["hs", hedefPenceresi(K), "sheet"]],
    tl: [["w", 900], ...tlSec, ["w", 700], ...tlHedef, ["w", 2200]],
    still: 0, hint: "other",
  }),

  /** Gorev adi -> ad yaz -> Gorevi baslat -> Basarili -> Gorev ekranina git. */
  "zikir-baslat": (K) => tel(K, {
    aria: `${K.L("compose.nameLabel")} › ${K.L("compose.startTask")} › ${K.L("group.circleCreated")}`,
    views: [["c1", kurDolu(K, { n: 1000 })], ["hz", halka(K, { zikir: true }), "fade"], ["t", gorev(K, { iki: false, sal: 0 }), "push"]],
    overlays: [["ok", basari(K), "pop"]],
    tl: [["w", 800], ["y", "c1sc", "11"], ["w", 600], ["tap", "zname"], ["txt", "znameTx", ""], ["type", "zname", ZORNEK[K.dil].task], ["txt", "pvt", ZORNEK[K.dil].task], ["txt", "nhint", K.L("compose.nameHintCustom")],
      ["w", 500], ["tap", "zstart"], ["go", "hz"], ["ov", "ok"], ["w", 1400], ["tap", "goTask"], ["cl", "ok"], ["go", "t"], ["w", 2000]],
    still: 2, hint: "zname",
  }),

  /** Uye: Ana Sayfa karti -> gorev ekrani -> Salavat karti -> sayac, dokundukca +1, kendiliginden kaydedilir. */
  "zikir-say": (K) => tel(K, {
    aria: `${K.L("dashboard.myTasks")} › ${K.L("flow.tabTask")} › ${K.L("zikir.tapHint")} › ${K.L("zikir.counterSaved")}`,
    views: [["a", anaSayfa(K)], ["t", gorev(K), "push"], ["c", sayac(K), "up"]],
    tl: [["w", 900], ["tap", "zhome"], ["go", "t"], ["w", 1000], ["tap", "csal"], ["go", "c"], ["w", 800], ...tlSayim(K), ["w", 1300], ["txt", "cst", K.L("zikir.counterSaved")], ["w", 2000]],
    still: 1, hint: "zhome",
  }),

  /** Sayac -> Toplu Ekle -> +100 -> geri -> ortak toplam guncel. */
  "zikir-toplu": (K) => tel(K, {
    aria: `${K.L("zikir.bulkAdd")} › +100 › ${K.L("zikir.collectiveTotal", { done: 1300, target: 1500 })}`,
    views: [["c", sayac(K)], ["t", gorev(K, { sal: 940 }), "back"]],
    overlays: [["b", topluEkle(K), "pop"]],
    tl: [["w", 900], ["tap", "bulk"], ["ov", "b"], ["w", 900], ["tap", "b100"], ["cl", "b"], ["off", "undo", "zk-dim"], ["txt", "cst", K.L("zikir.counterSaving")], ["txt", "cval", "940"], ["st", "ring", "background", ringBg(94)],
      ["txt", "csub", K.L("zikir.counterSessionAdded", { n: 100 })], ["w", 500], ["txt", "cst", K.L("zikir.counterSaved")], ["w", 1300], ["go", "t"], ["w", 2400]],
    still: 0, hint: "bulk",
  }),

  /** Koyu tema, Tesbih gorunumu: tane cek -> Perde -> karanlikta dokun, sayi soluk artar. */
  "zikir-perde": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("counter.modeStrand")} › ${K.L("perde.title")} › ${K.L("perde.hint")}`,
    views: [["s", sayacTesbih(K)]],
    overlays: [["pd", perde(K, { n: 842 }), "fade"]],
    tl: [["w", 900],
      ...[1, 2].flatMap((n) => [["tap", "tapc"], ["on", "str", "p" + n], ["txt", "tval", String(840 + n)], ["txt", "tsub", K.L("zikir.counterSessionAdded", { n })], ["w", 350]]),
      ["txt", "tst", K.L("zikir.counterSaved")], ["w", 700], ["tap", "perde"], ["ov", "pd"], ["w", 900],
      ...[3, 4, 5].flatMap((n) => [["tap", "pz"], ["txt", "pn", String(840 + n)], ["w", 300]]), ["w", 1600]],
    still: 0, hint: "perde",
  }),

  /** Tek seferlik halka: Birlikte ne okuyalim? -> Salavat -> ozet -> Ne zamana kadar: 1 hafta -> Halkayi ac. */
  "zikir-tek-toplu": (K) => tel(K, {
    aria: `${K.L("event.createTitle")} › ${K.L("eventCompose.pickTitle")} › ${K.L("eventCompose.tplSalavat")} › ${K.L("eventCompose.rowEnd")} › ${K.L("eventCompose.cta")}`,
    views: [["s", evSablon(K)], ["o", evOzet(K), "push"]],
    overlays: [["es", K.C.sheet({ title: K.L("eventCompose.rowEnd"),
      chips: [[K.L("eventCompose.endFriday"), false], [K.L("eventCompose.endDays3"), true, "ed3"], [K.L("eventCompose.endWeek"), false, "edw"], [K.L("eventCompose.endCustom"), false]],
      tempo: K.L("eventCompose.tempoTotal", { people: 10, amount: K.L("eventCompose.unitTimes", { count: 100 }) }), btn: K.L("common.ok"), btnKey: "eok" }), "sheet"]],
    tl: [["w", 1000], ["tap", "evsal"], ["on", "evsal", "on"], ["go", "o"], ["w", 1300], ["tap", "evend"], ["ov", "es"], ["w", 600], ["tap", "edw"], ["off", "ed3", "on"], ["on", "edw", "on"], ["w", 500], ["tap", "eok"], ["cl", "es"],
      ["txt", "evendV", K.L("eventCompose.endWeek")], ["txt", "evds", `${K.L("event.goalOneCollective", { name: K.L("globalDhikr.salavat.name"), n: nf(K.dil, 1000) })} · ${K.L("eventCompose.endWeek")}`], ["w", 700], ["tap", "evopen"], ["w", 1400]],
    still: 0, hint: "evsal",
  }),

  /** Kendi listen (koyu tema): son zikir biter, ipe bugunun tanesi dizilir, baslik bir gun artar. */
  "zikir-ip": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("zikirTpl.tesbihat.title")} › ${K.L("zikirDaily.toggleTitle")} › ${K.L("zikirStrand.titleRun", { count: 13 })} › ${K.L("zikirStrand.subDone")}`,
    views: [["l", liste(K)]],
    tl: [["w", 1200], ["st", "lastbar", "width", "100%"], ["w", 900], ["on", "ipnew", "show"], ["w", 500], ["txt", "iptt", K.L("zikirStrand.titleRun", { count: 13 })], ["txt", "ipsub", K.L("zikirStrand.subDone")], ["w", 2800]],
    still: 7,
  }),

  /** Merkez karti (dongu, ~7 sn): halkanin toplami 997 -> 1000, halka altina doner, "Tamamlandi". */
  "zikir-kart": (K) => tel(K, {
    aria: `${K.L("zikir.counterGroupTotal")}: ${nf(K.dil, 1000)} / ${nf(K.dil, 1000)} › ${K.L("zikir.counterDone")}`,
    views: [["k", kartSayac(K)]],
    tl: [["w", 1100],
      ...[1, 2].flatMap((n) => [["tap", "ktap"], ["txt", "kval", nf(K.dil, 997 + n)], ["st", "kring", "background", ringBg((997 + n) / 10)], ["txt", "ksub", K.L("zikir.counterSessionAdded", { n })], ["w", 380]]),
      ["tap", "ktap"], ["txt", "kval", nf(K.dil, 1000)], ["st", "kring", "background", ringBg(100, "var(--a-gold)")], ["on", "kring", "done"], ["txt", "ksub", K.L("zikir.counterDone")], ["w", 3000]],
    still: 16,
  }),
};

export const IKON = {
  zSliders: '<path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="1.8" fill="var(--a-bg)"/><circle cx="15" cy="12" r="1.8" fill="var(--a-bg)"/><circle cx="8" cy="17" r="1.8" fill="var(--a-bg)"/>',
  zChevDown: '<path d="M6 9l6 6 6-6"/>',
  zMinus: '<path d="M5 12h14"/>',
  zLayers: '<path d="M12 4 3.5 8.5 12 13l8.5-4.5z"/><path d="M3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5"/>',
  zUndo: '<path d="M9 7 4.5 11.5 9 16"/><path d="M4.5 11.5H14a5.5 5.5 0 0 1 0 11h-2"/>',
  zEyeOff: '<path d="M3 3l18 18"/><path d="M10.6 5.6A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3 3.7M6.6 6.7C4 8.4 2.5 12 2.5 12S6 18.5 12 18.5c1.6 0 3-.4 4.2-1.1"/><path d="M9.9 10a2.8 2.8 0 0 0 4 4"/>',
  zDotsH: '<circle cx="5.5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18.5" cy="12" r="1.3" fill="currentColor"/>',
  zBookmark: '<path d="M7 4h10v16l-5-3.5L7 20z"/>',
  zAddC: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  zList: '<path d="M9 7h11M9 12h11M9 17h11"/><circle cx="4.8" cy="7" r=".9" fill="currentColor"/><circle cx="4.8" cy="12" r=".9" fill="currentColor"/><circle cx="4.8" cy="17" r=".9" fill="currentColor"/>',
  zGrip: '<path d="M5 9h14M5 15h14"/>',
  zPalette: '<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-1.4-1.3-1.6-1.3-2.9 0-1 .8-1.6 1.8-1.6h2.2a4 4 0 0 0 4-4C20.5 6.6 16.7 3.5 12 3.5z"/><circle cx="7.8" cy="11" r="1" fill="currentColor"/><circle cx="10.5" cy="7.5" r="1" fill="currentColor"/><circle cx="15" cy="7.8" r="1" fill="currentColor"/>',
  zRepeat: '<path d="M17 3.5 20 6.5 17 9.5"/><path d="M4 11.5v-1a4 4 0 0 1 4-4h12M7 20.5 4 17.5 7 14.5"/><path d="M20 12.5v1a4 4 0 0 1-4 4H4"/>',
  zPlay: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
};

export const CSS = `
  /* halka ekrani (2.1.0) */
  .mp-s .zh-hd { display: flex; align-items: center; gap: .15em; padding: .35em .6em .2em; }
  .mp-s .zh-hd > b { flex: 1; min-width: 0; font-size: 1.32em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-inline-start: .1em; }
  .mp-s .zh-hb, .mp-s .zh-hi { width: 2.3em; height: 2.3em; display: grid; place-items: center; color: var(--a-pri); flex: none; }
  .mp-s .zh-strip { display: flex; align-items: center; gap: .55em; padding: .15em 1.1em 0; }
  .mp-s .zh-avs { display: flex; flex: none; }
  .mp-s .zh-av { width: 1.9em; height: 1.9em; border-radius: 50%; display: grid; place-items: center; font-size: .72em; font-weight: 700; background: var(--a-soft); color: var(--a-pri); box-shadow: 0 0 0 .15em var(--a-bg); }
  .mp-s .zh-av + .zh-av { margin-inline-start: -.5em; }
  .mp-s .zh-av.adm { background: var(--a-pri); color: var(--a-on); }
  .mp-s .zh-strip > small { flex: 1; min-width: 0; color: var(--a-mut); font-size: .76em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .zh-inv { display: inline-flex; align-items: center; gap: .2em; padding: .45em .75em; border-radius: 2em; background: var(--a-soft); color: var(--a-pri); font-weight: 700; font-size: .78em; flex: none; white-space: nowrap; }
  .mp-s .zh-inv .ic { width: 1.05em; height: 1.05em; }
  .mp-s .zh-tabs { display: flex; gap: .2em; margin: .65em 1.1em 0; padding: .2em; border-radius: .9em; background: color-mix(in srgb, var(--a-pri) 10%, transparent); }
  .mp-s .zh-tabs span { flex: 1; text-align: center; padding: .5em .3em; border-radius: .7em; font-size: .82em; font-weight: 600; color: var(--a-mut); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .zh-tabs span.on { background: var(--a-card); color: var(--a-ink); font-weight: 700; }
  .mp-s .zh-tabs em { font-style: normal; color: var(--a-mut); font-weight: 600; }
  .mp-s .zh-pg { gap: .55em; padding-top: .75em; }
  .mp-s .zh-card { display: flex; align-items: center; gap: .65em; padding: .75em .8em; border-radius: 1.1em; background: var(--a-card); border: 1px solid var(--a-line); }
  .mp-s .zh-card.new { animation: zhin .5s ease both; }
  @keyframes zhin { from { opacity: 0; transform: translateY(-.5em); } to { opacity: 1; transform: none; } }
  .mp-s .zh-ri { width: 2.6em; height: 2.6em; border-radius: 50%; display: grid; place-items: center; color: var(--a-pri); box-shadow: inset 0 0 0 .16em var(--a-soft); flex: none; }
  .mp-s .zh-ri.done { color: var(--a-gold); box-shadow: inset 0 0 0 .16em var(--a-gold); }
  .mp-s .zh-ct { flex: 1; min-width: 0; }
  .mp-s .zh-ct > * { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .zh-k { color: var(--a-pri); font-size: .62em; font-weight: 800; letter-spacing: .05em; }
  :root[lang="ar"] .mp-s .zh-k { letter-spacing: 0; }
  .mp-s .zh-ct b { font-size: .95em; margin: .05em 0; }
  .mp-s .zh-ln { color: var(--a-mut); font-size: .72em; }
  .mp-s .zh-act { padding: .45em .85em; border-radius: 2em; background: var(--a-soft); color: var(--a-pri); font-weight: 700; font-size: .78em; flex: none; }
  .mp-s .zh-ok { color: var(--a-gold); flex: none; }
  .mp-s .zh-fab { position: absolute; z-index: 3; inset-inline-end: 1em; bottom: 1.4em; display: inline-flex; align-items: center; gap: .3em; height: 3.3em; padding: 0 1.15em 0 .9em; border-radius: 2em;
    background: var(--a-pri); color: var(--a-on); font-weight: 700; font-size: .92em; box-shadow: 0 .6em 1.2em -.5em rgba(30, 80, 70, .7); max-width: 80%; }
  .mp-s .zh-fab span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .zh-fab .ic { width: 1.35em; height: 1.35em; }

  /* kurma ekrani ekleri (ZikirComposer, TaskComposer secimi) */
  .mp-s .zx-sec { display: block; color: var(--a-mut); font-size: .7em; font-weight: 700; margin: .25em 0 -.25em; }
  .mp-s .zx-strip { display: flex; gap: .45em; overflow: hidden; }
  .mp-s .zx-strip span { flex: none; width: 8.4em; padding: .6em .7em; border-radius: .9em; background: var(--a-card); border: 1px solid var(--a-line); }
  .mp-s .zx-strip b, .mp-s .zx-strip small { display: block; }
  .mp-s .zx-strip b { font-size: .8em; }
  .mp-s .zx-strip small { color: var(--a-mut); font-size: .64em; margin-top: .1em; }
  .mp-s .zx-card { background: var(--a-card); border: 1px solid var(--a-line); border-radius: 1.1em; overflow: hidden; }
  .mp-s .zx-row { display: flex; align-items: center; gap: .55em; padding: .62em .85em; min-height: 3.2em; }
  .mp-s .zx-row + .zx-row { border-top: 1px solid var(--a-line); }
  .mp-s .zx-tx { flex: 1; min-width: 0; }
  .mp-s .zx-tx b, .mp-s .zx-tx small { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .zx-tx b { font-size: .86em; font-weight: 600; }
  .mp-s .zx-tx small { color: var(--a-mut); font-size: .68em; margin-top: .1em; }
  .mp-s .zx-pl, .mp-s .zx-pri { color: var(--a-pri); }
  .mp-s .zx-ch { width: 1em; height: 1em; color: var(--a-mut); }
  .mp-s .zx-other { display: flex; align-items: center; justify-content: center; gap: .35em; min-height: 2.9em; padding: .4em .8em; border-radius: .95em; border: 1px solid var(--a-line); background: var(--a-card); color: var(--a-pri); font-weight: 700; font-size: .82em; text-align: center; }
  .mp-s .zx-hint { color: var(--a-mut); font-size: .7em; margin-top: -.3em; }
  .mp-s .zx-opt { display: flex; align-items: center; gap: .65em; padding: .7em .8em; border-radius: .95em; border: 1px solid var(--a-line); background: var(--a-card); transition: border-color .25s ease, background-color .25s ease; }
  .mp-s .zx-opt.on { border-color: var(--a-pri); background: var(--a-soft); }
  .mp-s .zx-opt > div { min-width: 0; }
  .mp-s .zx-opt b, .mp-s .zx-opt small { display: block; }
  .mp-s .zx-opt b { font-size: .86em; }
  .mp-s .zx-opt small { color: var(--a-mut); font-size: .68em; }
  .mp-s .zx-rad { width: 1.35em; height: 1.35em; border-radius: 50%; border: .12em solid var(--a-line); display: grid; place-items: center; color: transparent; flex: none; transition: background-color .25s ease; }
  .mp-s .zx-rad .ic { width: .85em; height: .85em; }
  .mp-s .zx-opt.on .zx-rad { background: var(--a-pri); border-color: var(--a-pri); color: #fff; }
  .mp-s .zx-pk .zx-n { color: var(--a-mut); display: inline-flex; }
  .mp-s .zx-pk .zx-y { color: var(--a-pri); display: none; }
  .mp-s .zx-pk.on .zx-n { display: none; }
  .mp-s .zx-pk.on .zx-y { display: inline-flex; }
  .mp-s .zx-cnt { font-size: .95em; }
  .mp-s .zx-add { color: var(--a-pri); min-height: 2.8em; }
  .mp-s .zx-add b { font-size: .84em; }
  .mp-s .zx-in { background: var(--a-in); }
  .mp-s .zx-hn { color: var(--a-mut); font-size: .64em; margin-top: -.3em; }
  .mp-s .zx-hs { gap: .5em; }
  .mp-s .zx-step { display: flex; align-items: center; justify-content: center; gap: .9em; }
  .mp-s .zx-sb { width: 2.7em; height: 2.7em; border-radius: 50%; border: 1px solid var(--a-line); background: var(--a-card); color: var(--a-pri); display: grid; place-items: center; }
  .mp-s .zx-sv { min-width: 5.5em; text-align: center; padding: .25em .5em; border-radius: .8em; border: 1px solid var(--a-line); background: var(--a-in); font-size: 1.45em; font-weight: 700; }

  /* gorev ekrani ve sayac */
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
  .mp-s .zk-chd .c b { display: block; font-size: .98em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .zk-chd .hr { justify-content: flex-end; display: flex; }
  .mp-s .zk-bdg { display: inline-flex; align-items: center; gap: .25em; margin-top: .3em; padding: .15em .6em; border-radius: 1em; background: color-mix(in srgb, var(--a-gold) 14%, transparent); color: var(--a-gold); font-size: .68em; font-weight: 700; }
  .mp-s .zk-bdg .ic { width: 1.1em; height: 1.1em; }
  .mp-s .zk-big-ar { display: block; text-align: center; font-size: 1.45em; font-weight: 400; margin-top: .4em; }
  .mp-s .zk-mean { display: flex; align-items: center; justify-content: center; gap: .2em; color: var(--a-pri); font-weight: 700; margin-top: .3em; }
  .mp-s .zk-mean .ic { width: 1em; height: 1em; }
  .mp-s .zk-ring { position: relative; width: 15em; height: 15em; margin: 2.4em auto 0; border-radius: 50%; transition: background .3s ease; }
  .mp-s .zk-kc { flex: 1; display: flex; align-items: center; justify-content: center; padding-bottom: 2.5em; }
  .mp-s .zk-ring-xl { width: 19em; height: 19em; margin: 0; }
  .mp-s .zk-ring-xl .zk-in { inset: 1.1em; }
  .mp-s .zk-ring-xl .zk-tg { font-size: 1.25em; }
  .mp-s .zk-ring-xl .zk-gt, .mp-s .zk-ring-xl .zk-hint { font-size: .9em; }
  .mp-s .zk-in { position: absolute; inset: .95em; border-radius: 50%; background: var(--a-card); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-shadow: 0 0 0 .3em var(--a-bg); }
  .mp-s .zk-num { font-size: 3.6em; font-weight: 800; line-height: 1; letter-spacing: -.02em; transition: color .3s ease; }
  .mp-s .zk-ring-xl .zk-num { font-size: 4.8em; }
  .mp-s .zk-ring.done .zk-num, .mp-s .zk-ring.done .zk-hint { color: var(--a-gold); }
  .mp-s .zk-tg { color: var(--a-mut); font-size: 1.05em; font-weight: 600; margin-top: .2em; }
  .mp-s .zk-gt { color: var(--a-mut); font-size: .72em; }
  .mp-s .zk-hint { color: var(--a-mut); font-size: .76em; font-weight: 700; margin-top: .3em; }
  .mp-s .zk-st { display: block; text-align: center; color: var(--a-mut); font-size: .74em; min-height: 1.4em; margin-top: .8em; }
  .mp-s .zk-cfoot { position: absolute; left: 0; right: 0; bottom: 0; display: flex; justify-content: space-around; border-top: 1px solid var(--a-line); padding: .7em .6em 1.4em; color: var(--a-pri); }
  .mp-s .zk-cfoot span { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: .2em; font-weight: 700; border-radius: .7em; padding: .1em .3em; }
  .mp-s .zk-cfoot .zk-dim { opacity: .4; }
  .mp-s .zk-cfoot small { font-size: .76em; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .zk-bp { display: flex; gap: .5em; }
  .mp-s .zk-bp span { flex: 1; text-align: center; padding: .65em 0; border-radius: .75em; border: 1px solid var(--a-line); background: var(--a-bg); color: var(--a-pri); font-weight: 700; }
  .mp-s .card-c .row .in { flex: 1; }

  /* tesbih gorunumu ve Perde */
  .mp-s .zt-ar { font-size: 1.35em; margin-top: .2em; }
  .mp-s .zt-ok { display: block; text-align: center; color: var(--a-mut); font-size: .76em; margin-top: .1em; }
  .mp-s .zt-area { position: relative; flex: 1; margin: .6em 0 7.4em; }
  .mp-s .zt-str { position: absolute; top: 0; bottom: 0; inset-inline-start: 30%; inset-inline-end: 0; }
  .mp-s .zt-fl { position: absolute; inset: 0; }
  :root[dir="rtl"] .mp-s .zt-fl { transform: scaleX(-1); }
  .mp-s .zt-str.p1 { animation: ztp1 .4s ease; } .mp-s .zt-str.p2 { animation: ztp2 .4s ease; }
  @keyframes ztp1 { 40% { transform: translate(-.25em, .9em); } } @keyframes ztp2 { 40% { transform: translate(-.25em, .9em); } }
  .mp-s .zt-b { position: absolute; border-radius: 50%; transform: translate(-50%, -50%);
    background: radial-gradient(circle at 34% 30%, #ffe2ae 0, #f0a646 22%, #c4621b 58%, #6d2a07 100%); box-shadow: 0 .2em .4em rgba(0, 0, 0, .45); }
  .mp-s .zt-b.cur { box-shadow: 0 0 0 .12em #0e0e10, 0 0 0 .24em rgba(255, 255, 255, .8); }
  .mp-s .zt-read { position: absolute; inset-inline-start: 1.2em; bottom: .4em; display: flex; flex-direction: column; gap: .15em; }
  .mp-s .zt-read span { display: flex; align-items: baseline; gap: .25em; }
  .mp-s .zt-read b { font-size: 3em; line-height: 1; color: var(--a-pri); font-weight: 800; }
  .mp-s .zt-read small { color: var(--a-mut); font-size: .74em; }
  .mp-s .zt-read span small { font-size: .95em; font-weight: 600; }
  .mp-s .zt-sub { font-weight: 700; }
  .mp-s .zt-st { position: absolute; inset-inline-start: 1.2em; inset-inline-end: auto; bottom: 6em; text-align: start; }
  .mp-s .zp { position: absolute; inset: 0; background: #000; color: #fff; opacity: 0; transition: opacity .5s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2em 1.6em; }
  .ov.on .zp { opacity: 1; }
  .mp-s .zp-c { display: flex; flex-direction: column; align-items: center; gap: .4em; }
  .mp-s .zp-ar { font-size: 1.6em; font-weight: 400; opacity: .55; }
  .mp-s .zp-ok { opacity: .42; font-size: .9em; }
  .mp-s .zp-n { font-size: 4.4em; font-weight: 300; opacity: .14; margin-top: .3em; }
  .mp-s .zp-h { position: absolute; left: 1.6em; right: 1.6em; bottom: 2.4em; opacity: .35; font-size: .8em; }

  /* kendi listen: tesbih ipi */
  .mp-s .zi-top { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: .4em; padding: .4em .9em .5em; }
  .mp-s .zi-top > b { text-align: center; font-size: .95em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .zi-bk { display: inline-flex; align-items: center; gap: .15em; color: var(--a-ink); }
  .mp-s .zi-bk small { font-size: .85em; }
  .mp-s .zi-ti { display: inline-flex; gap: .55em; color: var(--a-ink); }
  .mp-s .zi-pg { gap: .55em; padding-top: .4em; }
  .mp-s .zi-card { background: var(--a-card); border-radius: 1.1em; padding: .8em .85em; }
  .mp-s .zi-h { display: flex; align-items: center; gap: .5em; }
  .mp-s .zi-h b { flex: 1; font-size: .9em; }
  .mp-s .zi-h .ic { color: var(--a-mut); width: 1.1em; height: 1.1em; }
  .mp-s .zi-svg { display: block; width: 100%; height: auto; margin: .3em 0 .1em; overflow: visible; }
  :root[dir="rtl"] .mp-s .zi-svg { transform: scaleX(-1); }
  .mp-s .zi-ip { fill: none; stroke: color-mix(in srgb, var(--a-pri) 60%, transparent); stroke-width: .5; }
  .mp-s .zi-pus { fill: none; stroke: #2e6b5a; stroke-width: 1.1; stroke-linecap: round; }
  .mp-s .zi-b { fill: #c9772c; stroke: #7a3c10; stroke-width: .4; }
  .mp-s .zi-b.zi-new { opacity: 0; transform: translateY(-6px); transform-box: fill-box; transition: opacity .5s ease, transform .6s cubic-bezier(.2, 1.2, .3, 1); }
  .mp-s .zi-b.zi-new.show { opacity: 1; transform: none; fill: #e3a248; }
  .mp-s .zi-f { display: flex; align-items: center; gap: .4em; color: var(--a-mut); }
  .mp-s .zi-f small { flex: 1; font-size: .7em; }
  .mp-s .zi-f .ic { width: .95em; height: .95em; }
  .mp-s .zi-set { padding: 0; }
  .mp-s .zi-s1, .mp-s .zi-s2 { display: flex; align-items: center; gap: .6em; padding: .7em .85em; }
  .mp-s .zi-s2 { border-top: 1px solid var(--a-line); }
  .mp-s .zi-s1 > .ic, .mp-s .zi-s2 > .ic:first-child { color: var(--a-mut); width: 1.1em; height: 1.1em; }
  .mp-s .zi-s1 > div { flex: 1; min-width: 0; }
  .mp-s .zi-s1 b, .mp-s .zi-s1 small { display: block; }
  .mp-s .zi-s1 b, .mp-s .zi-s2 b { font-size: .84em; }
  .mp-s .zi-s1 small { color: var(--a-mut); font-size: .64em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .zi-s2 b { flex: 1; }
  .mp-s .zi-s2 small { color: var(--a-mut); font-size: .76em; }
  .mp-s .zi-s2 .ic:last-child { width: .95em; height: .95em; color: var(--a-mut); }
  .mp-s .zi-row { display: flex; align-items: center; gap: .6em; padding: .6em .8em; background: var(--a-card); border-radius: 1em; }
  .mp-s .zi-hd { color: var(--a-mut); }
  .mp-s .zi-tx { flex: 1; min-width: 0; }
  .mp-s .zi-tx b, .mp-s .zi-tx small { display: block; }
  .mp-s .zi-tx b { font-size: .86em; }
  .mp-s .zi-tx small { color: var(--a-mut); font-size: .76em; text-align: start; }
  .mp-s .zi-bar { display: block; height: .25em; border-radius: 1em; background: var(--a-line); margin-top: .35em; overflow: hidden; }
  .mp-s .zi-bar i { display: block; height: 100%; background: var(--a-gold); transition: width .8s ease; }
  .mp-s .zi-n { font-size: .9em; }
  .mp-s .zi-x { color: var(--a-mut); width: 1em; height: 1em; }
  .mp-s .zi-foot { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: space-between; padding: .8em 1.15em 1.6em; background: var(--a-paper); }
  .mp-s .zi-foot small { color: var(--a-mut); font-size: .76em; }
  .mp-s .zi-go { display: inline-flex; align-items: center; gap: .35em; padding: .6em 1.1em; border-radius: 2em; background: color-mix(in srgb, var(--a-ink) 82%, transparent); color: var(--a-bg); font-weight: 700; font-size: .86em; }
  .mp-s .zi-go .ic { width: 1em; height: 1em; }
  @media (prefers-reduced-motion: reduce) { .mp-s .zh-card.new, .mp-s .zt-str.p1, .mp-s .zt-str.p2 { animation: none; } }
`;
