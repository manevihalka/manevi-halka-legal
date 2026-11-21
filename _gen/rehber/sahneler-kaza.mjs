/**
 * Kaza namazlarim ve oruclarim rehberinin ekranlari (21 Kas 2026, 2.1.0).
 * Akislar uygulamanin kodundan izlendi (salt okunur):
 *   app/kaza/kurulum.tsx     kurulum 1-3 (yalniz sende + tahmin; her vakitten kac namaz, vitir anahtari, hesap yardimcisi;
 *                            tempo, hatirlat, "Bismillah"), sonunda bir kez Niyet Bahcesi sorusu (kaza.garden.*)
 *   app/kaza/index.tsx       ana ekran: Namaz | Oruc, son kayit, Tamamladiklarin + yil dizisi, vakit satirinda tek "+",
 *                            "Bir gunun kazasi", "Birkac tane kildim" (alt pencere), goz dugmesi, Geri al cubugu
 *   components/kaza/OrucSection.tsx  oruc sekmesi: Ramazan dizisi, "Bugun tuttum", "Birkac gun tuttum", Ramazan oncesi hatirlatma
 *   app/kaza/gecmis.tsx      gecmis: bu ay, baslangic, tempo, gun gun kayitlar, Sayilari duzelt, Onceki bir hale don
 *   app/prayer-detail.tsx    Namazlarim: isaretli vaktin altinda "Kazasini da kildim", kartin altinda giris satiri
 * Namazlarim ekrani uygulamada her zaman koyu fotograf paletiyle cizilir (n-namazlarim karesi); burada o gorunumler
 * `.kz-gc` sarmalayicisiyla gece mavisi, kaza ekranlari uygulamanin varsayilan ocean temasi (n-kaza karesi).
 * Dugme/baslik metinleri K.L("anahtar") ile uygulamadan. Uzun tire YOK.
 */

const nf = (dil, n) => new Intl.NumberFormat(dil === "ar" ? "ar-u-nu-latn" : dil).format(n);
const gun = (dil, iso) => new Date(iso + "T12:00:00").toLocaleDateString(dil === "ar" ? "ar-u-nu-latn" : dil, { day: "numeric", month: "long" });

/** Vakit adlari (lib/kaza/labels.ts NAME_KEY). Anahtarlar acik yazilir: sync-app-labels onlari koddan toplar. */
const adlar = (K) => [K.L("explore.prayerFajr"), K.L("explore.prayerDhuhr"), K.L("explore.prayerAsr"), K.L("explore.prayerMaghrib"), K.L("explore.prayerIsha"), K.L("kaza.witr")];

// Ornek sayilar n-kaza karesindeki gibi: 1.381 tamamlandi, kalan 1.859 (7 ay), vakit vakit kalan
const KALAN = [300, 316, 323, 316, 308, 296];
const DONE = 1381;

/** Gece mavisi sarmalayici (Namazlarim). `.lock` sinifi motorun durum cubugunu beyaz yapmasi icin (sbw). */
const gece = (html) => `<div class="lock kz-gc">${html}</div>`;

// ── ocean: kaza ekranlari ──────────────────────────────────────────────────────

/** KazaHeader: geri (ya da kapat), baslik + alt satir, sagda istege bagli oge. */
function kHd(K, { title, sub, close = false, right = "", keyTitle } = {}) {
  return `<div class="kz-hd"><span class="kz-hb">${close ? K.ic("x") : K.ic("back", "fl")}</span><div class="kz-ht">${title ? `<b${keyTitle ? K.attr(keyTitle) : ""}>${K.e(title)}</b>` : ""}${sub ? `<small>${K.e(sub)}</small>` : ""}</div>${right}</div>`;
}
const goz = (K) => `<span class="kz-eye">${K.ic("eye")}</span>`;
const adimNo = (K, n) => `<small class="kz-stp">${K.num(K.L("kaza.step", { n }))}</small>`;
const noktalar = (n) => `<div class="kz-dots">${[1, 2, 3].map((i) => `<i${i === n ? ' class="on"' : ""}></i>`).join("")}</div>`;
const yilDizisi = (K, ay, toplamAy) => {
  const satirlar = [];
  for (let y = 0; y * 12 < toplamAy; y++) {
    const t = [];
    for (let k = 0; k < 12 && y * 12 + k < toplamAy; k++) {
      const f = Math.max(0, Math.min(1, ay - (y * 12 + k)));
      t.push(`<i class="kz-bd${f > 0 ? " on" : ""}" style="--f:${Math.round(f * 100)}%"></i>`);
    }
    satirlar.push(`<div class="kz-yr"><small>${K.Le("kaza.main.year", { n: y + 1 })}</small><span>${t.join("")}</span></div>`);
  }
  return satirlar.join("");
};
const toast = (K, metin = "") => `<div class="kz-toast"${K.attr("toast")}><i class="kz-tc">${K.ic("check")}</i><span${K.attr("toastT")}>${K.e(metin)}</span><span class="kz-undo">${K.ic("kzUndo")}<small>${K.Le("notice.undo")}</small></span></div>`;

/** Ana ekran, Namaz sekmesi. done: tamamlanan; left: vakit vakit kalan; ay/toplamAy: yil dizisi. */
function anaEkran(K, { done = DONE, left = KALAN, ay = 7.5, toplamAy = 18, son = true } = {}) {
  const A = adlar(K);
  const sonMetin = son ? K.L("kaza.main.lastYesterday", { time: "17:51", what: `${A[0]} 2, ${A[1]} 1` }) : K.L("kaza.main.none");
  const kalan = left.reduce((a, b) => a + b, 0);
  const tamAy = Math.floor(ay);
  const deger = tamAy > 0 ? K.L("kaza.main.worthM", { m: tamAy, mT: nf(K.dil, tamAy) }) : K.L("kaza.main.worthNone");
  return `${kHd(K, { title: K.L("kaza.titleN"), sub: K.L("kaza.tagline"), right: goz(K) })}
    <div class="kz-clip"><div class="kz-in sc"${K.attr("msc")}>
      <div class="kz-seg"><span class="on">${K.Le("kaza.tabN")}</span><span${K.attr("tabO")}>${K.Le("kaza.tabO")}</span></div>
      <b class="kz-bless"${K.attr("bless")}>${K.Le("kaza.main.bless")}</b>
      <div class="kz-last"${K.attr("last")}>${K.ic("clock")}<span><i>${K.Le("kaza.main.last")}</i><span${K.attr("lastT")}>${K.e(sonMetin)}</span></span>${K.ic("chev", "fl")}</div>
      <div class="kz-card kz-hero">
        <small class="mu">${K.Le("kaza.main.doneLabel")}</small>
        <b class="kz-big"><span${K.attr("done")}>${nf(K.dil, done)}</span> <em>${K.Le("kaza.main.unitN", { count: done })}</em></b>
        <span class="kz-l1">${K.e(deger)}</span>
        <small class="mu"${K.attr("left")}>${K.Le("kaza.main.leftSmall", { n: nf(K.dil, kalan) })}</small>
        <hr>
        <small class="mu">${K.Le("kaza.main.beads")}</small>
        ${yilDizisi(K, ay, toplamAy)}
      </div>
      <div class="kz-card kz-rows">${A.map((ad, i) => `<div class="kz-r"><b>${K.e(ad)}</b><span class="kz-n"><b${K.attr("n" + i)}>${nf(K.dil, left[i])}</b><small>${K.Le("kaza.main.rowLeft")}</small></span><span class="kz-plus"${K.attr("p" + i)}>${K.ic("plus")}</span></div>`).join("")}</div>
      <div class="kz-2bt">${K.bt(K.L("kaza.main.day"), { key: "day", cls: "kz-pb" })}${K.bt(K.L("kaza.main.some"), { key: "some", cls: "ol kz-pb" })}</div>
    </div></div>
    ${toast(K)}`;
}

/** Oruc sekmesi (OrucSection): Tamamladiklarin 11 gun, Ramazan dizisi (30 tane), Bugun tuttum. */
function orucEkran(K, { done = 11, target = 30 } = {}) {
  const tane = Array.from({ length: target }, (_, i) => `<i class="kz-db${i < done ? " on" : ""}"${i === done ? K.attr("db") : ""}></i>`).join("");
  return `${kHd(K, { title: K.L("kaza.titleO"), sub: K.L("kaza.tagline"), right: goz(K) })}
    <div class="kz-clip"><div class="kz-in">
      <div class="kz-seg"><span>${K.Le("kaza.tabN")}</span><span class="on">${K.Le("kaza.tabO")}</span></div>
      <div class="kz-last">${K.ic("clock")}<span><i>${K.Le("kaza.main.last")}</i>${K.e(gun(K.dil, "2026-11-18"))}</span>${K.ic("chev", "fl")}</div>
      <div class="kz-card kz-hero">
        <small class="mu">${K.Le("kaza.oruc.doneLabel")}</small>
        <b class="kz-big"><span${K.attr("odone")}>${nf(K.dil, done)}</span> <em>${K.Le("kaza.oruc.unit", { count: done })}</em></b>
        <small class="mu"${K.attr("oleft")}>${K.Le("kaza.oruc.leftSmall", { n: nf(K.dil, target - done) })}</small>
        <hr>
        <small class="mu">${K.Le("kaza.oruc.beads")}</small>
        <div class="kz-ram">${tane}</div>
        ${K.bt(K.L("kaza.oruc.today"), { key: "otoday", cls: "blk kz-pb" })}
        <span class="kz-tb">${K.Le("kaza.oruc.some")}</span>
      </div>
      <div class="kz-card kz-tgr"><div><b>${K.Le("kaza.oruc.ramadan")}</b><small>${K.Le("kaza.oruc.ramadanSub")}</small></div>${K.tg(false)}</div>
      <div class="kz-last">${K.ic("book")}<span>${K.Le("kaza.oruc.info")}</span>${K.ic("chev", "fl")}</div>
    </div></div>
    ${toast(K)}`;
}

/** "Birkac tane kildim" alt penceresi: vakit vakit sayac, Ne zaman: Bugun, not, kaydet. */
function birkacPencere(K) {
  const A = adlar(K);
  return `<div class="sheet kz-sh"><i class="grab"></i><b class="kz-sht">${K.Le("kaza.some.title")}</b>
    ${A.map((ad, i) => `<div class="kz-sr"><b${K.attr("sn" + i)}>${K.e(ad)}</b><span class="kz-step"><i>${K.ic("kzMinus")}</i><b${K.attr("sv" + i)}>0</b><i${K.attr("sp" + i)}>${K.ic("plus")}</i></span></div>`).join("")}
    <div class="kz-when">${K.ic("calendar")}<span><i>${K.Le("kaza.some.when")}</i>${K.Le("kaza.some.today")}</span></div>
    <small class="mu kz-note">${K.Le("kaza.some.note")}</small>
    ${K.bt(K.L("kaza.some.save", { count: 0, nT: "0" }), { key: "ssave", cls: "blk kz-pb dis" })}
  </div>`;
}

/** Kurulum 1: kilit rozeti, baslik, iki madde, hadis karti (uygulamadaki gibi), Basla. */
function kurulum1(K) {
  return `${kHd(K, { close: true, right: adimNo(K, 1) })}
    <div class="kz-clip"><div class="kz-in kz-ctr">
      <span class="kz-badge">${K.ic("kzLock")}</span>
      <b class="kz-h1">${K.Le("kaza.titleN")}</b>
      <small class="mu kz-lead">${K.Le("kaza.tagline")}</small>
      <div class="kz-pts"><div>${K.ic("shield")}<small>${K.Le("kaza.s1.private")}</small></div><div>${K.ic("edit")}<small>${K.Le("kaza.s1.estimate")}</small></div></div>
      <div class="kz-card kz-quote"><small>${K.Le("kaza.s1.hadith")}</small><small class="mu">${K.Le("kaza.s1.hadithSrc")}</small></div>
    </div></div>
    <div class="kz-foot">${noktalar(1)}${K.bt(K.L("kaza.s1.begin"), { key: "begin", cls: "blk kz-pb" })}</div>`;
}

/** Kurulum 2: her vakitten kac namaz (sayi alanlari), vitir anahtari, hesap yardimcisi, kaza orucu, Devam. */
function kurulum2(K, { degerler = null } = {}) {
  const A = adlar(K);
  const alan = (i) => `<span class="in kz-nf${degerler ? " has" : ""}"${K.attr("f" + i)}><span class="ph">0</span><span class="tx"${K.attr("fv" + i)}>${degerler ? nf(K.dil, degerler[i]) : ""}</span><i class="cr"></i></span>`;
  return `${kHd(K, { right: adimNo(K, 2) })}
    <div class="kz-clip"><div class="kz-in sc"${K.attr("k2sc")}>
      <b class="kz-h2">${K.Le("kaza.s2.title")}</b>
      <small class="mu kz-sub2">${K.Le("kaza.s2.sub")}</small>
      <div class="kz-card kz-rows kz-fields">
        ${A.slice(0, 5).map((ad, i) => `<div class="kz-r"><b>${K.e(ad)}</b>${alan(i)}</div>`).join("")}
        <div class="kz-r kz-wt"><b>${K.Le("kaza.s2.witrToggle")}</b>${K.tg(true)}</div>
        <div class="kz-r"><b>${K.e(A[5])}</b>${alan(5)}</div>
      </div>
      ${K.bt(K.L("kaza.s2.calc"), { key: "calc", cls: "blk ol kz-ob", icon: "kzCalc" })}
      <b class="kz-h3">${K.Le("kaza.s2.fast")}</b>
      <small class="mu kz-sub2">${K.Le("kaza.s2.fastSub")}</small>
      <div class="kz-card kz-r kz-fr"><b>${K.Le("kaza.titleO")}</b><span class="in kz-nf"${K.attr("ff")}><span class="ph">0</span><span class="tx"></span><i class="cr"></i></span><small class="mu">${K.Le("kaza.s3.dayUnit")}</small></div>
    </div></div>
    <div class="kz-foot">${noktalar(2)}${K.bt(K.L("kaza.s2.next"), { key: "next2", cls: `blk kz-pb${degerler ? "" : " dis"}` })}</div>`;
}

/** Hesap yardimcisi: Kac yil, kac ay kilamadin? 1. donem: Yil ve Ay adimlayicilari, ozel gunler, sonuc, Sayilara yaz. */
function hesap(K) {
  return `${kHd(K, { title: K.L("kaza.calc.title"), close: true })}
    <div class="kz-clip"><div class="kz-in">
      <b class="kz-q">${K.Le("kaza.calc.q")}</b>
      <div class="kz-card kz-per">
        <small class="mu">${K.Le("kaza.calc.period", { n: 1 })}</small>
        <div class="kz-sr"><b>${K.Le("kaza.calc.years")}</b><span class="kz-step"><i>${K.ic("kzMinus")}</i><b${K.attr("cy")}>0</b><i${K.attr("cyp")}>${K.ic("plus")}</i></span></div>
        <div class="kz-sr"><b>${K.Le("kaza.calc.months")}</b><span class="kz-step"><i>${K.ic("kzMinus")}</i><b>0</b><i>${K.ic("plus")}</i></span></div>
      </div>
      <span class="kz-link">${K.ic("plus")}${K.Le("kaza.calc.addPeriod")}</span>
      <div class="kz-card kz-tgr"><div><b>${K.Le("kaza.calc.special")}</b><small>${K.Le("kaza.calc.specialSub")}</small></div>${K.tg(false)}</div>
      <div class="kz-res"><small>${K.Le("kaza.calc.result")}</small><b${K.attr("cres")}>0</b><small>${K.Le("kaza.calc.resultNote")}</small></div>
    </div></div>
    <div class="kz-foot">${K.bt(K.L("kaza.calc.apply"), { key: "apply", cls: "blk kz-pb dis" })}</div>`;
}

/** Kurulum 3: tempo secenekleri, sure araligi, hatirlat, Bismillah. Sayilar: her vakitte 730 (2 yil), vitir acik. */
function kurulum3(K) {
  const sec = (key, b, s, on) => `<div class="kz-opt${on ? " on" : ""}"${K.attr(key)}><i class="kz-rad"></i><div><b>${b}</b><small>${s}</small></div></div>`;
  return `${kHd(K, { right: adimNo(K, 3) })}
    <div class="kz-clip"><div class="kz-in">
      <b class="kz-h2">${K.Le("kaza.s3.title")}</b>
      ${sec("pa", K.Le("kaza.pace.afterFard"), K.Le("kaza.pace.afterFardDesc"), true)}
      ${sec("pb", K.Le("kaza.pace.twoDaily"), K.Le("kaza.pace.twoDailyDesc"), false)}
      ${sec("pc", K.Le("kaza.pace.self"), K.Le("kaza.pace.selfDesc"), false)}
      <b class="kz-est"${K.attr("est")}>${K.Le("kaza.pace.rangeY", { lo: 2, hi: 3, loT: nf(K.dil, 2), hiT: nf(K.dil, 3) })}</b>
      <div class="kz-card kz-rem">
        <div class="kz-tgr"><div><b>${K.Le("kaza.s3.remind")}</b><small>${K.Le("kaza.s3.remindSub")}</small></div>${K.tg(false, "rem")}</div>
        <div class="kz-time"${K.attr("remt")}><b>${K.Le("kaza.s3.time")}</b><b class="gr">${K.num("20:30")}</b></div>
      </div>
    </div></div>
    <div class="kz-foot">${noktalar(3)}${K.bt(K.L("kaza.s3.finish"), { key: "fin", cls: "blk kz-pb" })}</div>`;
}

/** Kurulum sonunda bir kez: "Niyet Bahcende de buyusun mu?" (lib/notice decide). */
function bahceSorusu(K) {
  return `<div class="card-c kz-pop"><span class="badge-ic">${K.ic("leaf")}</span><b class="c">${K.Le("kaza.garden.title")}</b><small class="t2 c kz-clamp">${K.Le("kaza.garden.message")}</small>
    <div class="row2">${K.bt(K.L("kaza.garden.no"), { key: "gno", cls: "gh" })}${K.bt(K.L("kaza.garden.yes"))}</div></div>`;
}

/** Gecmis: bu ay, baslangic, tempo, gun gun kayitlar, Sayilari duzelt, Onceki bir hale don. */
function gecmis(K) {
  const A = adlar(K);
  const kayit = (saat, metin) => `<div class="kz-it"><small class="mu">${K.num(saat)}</small><span>${K.e(metin)}</span>${K.ic("edit")}</div>`;
  return `${kHd(K, { title: K.L("kaza.hist.title"), sub: K.L("kaza.titleN") })}
    <div class="kz-clip"><div class="kz-in sc"${K.attr("hsc")}>
      <div class="kz-card kz-lines"><div><span>${K.Le("kaza.hist.thisMonth")}</span><b>${K.Le("kaza.hist.monthN", { count: 214, nT: nf(K.dil, 214) })}</b></div><div><span>${K.Le("kaza.hist.start")}</span><b>${nf(K.dil, 3240)}</b></div></div>
      <div class="kz-card kz-pace"><div><b>${K.Le("kaza.pace.afterFard")}</b><small class="mu">${K.Le("kaza.pace.oneY", { lo: 1, loT: nf(K.dil, 1) })}</small></div><span class="kz-chip">${K.Le("kaza.pace.change")}</span></div>
      <small class="mu kz-day">${K.Le("kaza.hist.today")}</small>
      <div class="kz-card kz-items">${kayit("08:10", K.L("kaza.main.day"))}${kayit("13:05", A[1])}</div>
      <small class="mu kz-day">${K.Le("kaza.hist.yesterday")}</small>
      <div class="kz-card kz-items"><div class="kz-it kz-ms"><i></i><span>${K.Le("kaza.hist.milestone", { n: 7 })}</span></div>${kayit("17:51", `${A[0]} 2, ${A[1]} 1`)}${kayit("21:40", A[4])}</div>
      <div class="kz-card kz-acts"><div${K.attr("corr")}>${K.ic("edit")}<b>${K.Le("kaza.hist.correct")}</b>${K.ic("chev", "fl")}</div><div${K.attr("rest")}>${K.ic("kzRestore")}<span><b>${K.Le("kaza.hist.restore")}</b><small class="mu">${K.Le("kaza.hist.restoreSub")}</small></span>${K.ic("chev", "fl")}</div></div>
    </div></div>`;
}

// ── gece: Namazlarim ───────────────────────────────────────────────────────────

const VAKIT_IC = ["kzSunUp", "kzSun", "kzSunCloud", "kzSunDown", "moon"];
const SAAT = ["06:17", "12:54", "15:28", "17:52", "19:15"];

/** Namazlarim, BUGUN karti ve altindaki kaza giris satiri. kaza: kurulmus mu (Kazasini da kildim cikar). */
function namazlarim(K, { kaza = true, kilinan = [true, true, true, false, true], yazilan = [], giris } = {}) {
  const A = adlar(K);
  const satir = (i) => {
    const on = kilinan[i];
    const yaz = yazilan.includes(i);
    const hap = kaza ? `<span class="kz-also${on ? " show" : ""}${yaz ? " done" : ""}"${K.attr("al" + i)}>${K.ic("plus", "kz-ia")}${K.ic("check", "kz-id")}<span${K.attr("alt" + i)}>${K.Le(yaz ? "kaza.bridge.done" : "kaza.bridge.also")}</span></span>` : "";
    return `<div class="kz-pr"><div class="kz-prr">${K.ic(VAKIT_IC[i])}<b>${K.e(A[i])}</b><small>${K.num(SAAT[i])}</small><i class="kz-dot${on ? " on" : ""}"${K.attr("d" + i)}>${K.ic("check")}</i></div>${hap}</div>`;
  };
  const alt = giris ?? (kaza ? K.L("kaza.entryDoneBoth", { n: nf(K.dil, DONE), m: nf(K.dil, 11) }) : K.L("kaza.entryStart"));
  return gece(`<div class="kz-nh"><span class="kz-rb">${K.ic("back", "fl")}</span><b>${K.Le("prayerDetail.title")}</b><span class="kz-rb">${K.ic("kzSliders")}</span></div>
    <div class="kz-clip"><div class="kz-in sc"${K.attr("nsc")}>
      <small class="kz-sl">${K.Le("prayerDetail.todaySection")}</small>
      <div class="kz-gcard">${[0, 1, 2, 3, 4].map(satir).join("")}
        <div class="kz-pr kz-tes"><div class="kz-prr">${K.ic("mosque")}<b>${K.Le("tesbihat.readCta")}</b>${K.ic("chev", "fl")}</div></div></div>
      <div class="kz-gcard kz-entry"${K.attr("entry")}><span class="kz-ei"><i></i><i></i><i></i></span><div><b>${K.Le("kaza.titleBoth")}</b><small${K.attr("entT")}>${K.e(alt)}</small></div>${K.ic("chev", "fl")}</div>
    </div></div>
    ${toast(K)}`);
}

// ── merkez karti: iri ogeler, az yazi ─────────────────────────────────────────

function kart(K) {
  const A = adlar(K);
  return `<div class="kz-k">
    <b class="kz-kt">${K.Le("kaza.titleN")}</b>
    <div class="kz-card kz-kh"><small class="mu">${K.Le("kaza.main.doneLabel")}</small><b><span${K.attr("kd")}>${nf(K.dil, DONE)}</span></b>
      <span class="kz-kb">${Array.from({ length: 12 }, (_, i) => `<i class="kz-bd${i < 8 ? " on" : ""}" style="--f:${i < 7 ? 100 : i === 7 ? 50 : 0}%"></i>`).join("")}</span></div>
    <b class="kz-bless kz-kbl"${K.attr("kbl")}>${K.Le("kaza.main.bless")}</b>
    <div class="kz-card kz-rows">${[0, 1, 2, 3].map((i) => `<div class="kz-r"><b>${K.e(A[i])}</b><b class="kz-kn"${K.attr("kn" + i)}>${nf(K.dil, KALAN[i])}</b><span class="kz-plus"${K.attr("kp" + i)}>${K.ic("plus")}</span></div>`).join("")}</div>
    ${K.bt(K.L("kaza.main.day"), { cls: "blk kz-pb kz-kd" })}
  </div>`;
}

// ── zaman cizelgesi parcalari ─────────────────────────────────────────────────

/** Bir vakte "+": kalan bir azalir, Tamamladiklarin bir artar, Geri al cubugu. */
const tlArti = (K, i, done, kalan) => [["tap", "p" + i], ["txt", "n" + i, nf(K.dil, kalan)], ["txt", "done", nf(K.dil, done)],
  ["txt", "toastT", K.L("kaza.main.added", { name: adlar(K)[i] })], ["on", "toast", "show"]];

export const SAHNE = {
  /** Giris filmi: ana ekran: Sabah +, Bir gunun kazasi, Birkac tane kildim (3), Oruc sekmesi, Bugun tuttum. */
  "film-kaza": (K) => {
    const A = adlar(K);
    const top0 = KALAN.reduce((a, b) => a + b, 0);
    return K.telefon({
      size: "lg",
      aria: `${K.L("kaza.titleBoth")}: ${A[0]} + › ${K.L("kaza.main.day")} › ${K.L("kaza.main.some")} › ${K.L("kaza.tabO")} › ${K.L("kaza.oruc.today")}`,
      views: [["m", anaEkran(K)], ["o", orucEkran(K), "fade"]],
      overlays: [["s", birkacPencere(K), "sheet"]],
      tl: [["w", 900],
        ...tlArti(K, 0, DONE + 1, KALAN[0] - 1), ["on", "bless", "show"], ["txt", "left", K.L("kaza.main.leftSmall", { n: nf(K.dil, top0 - 1) })], ["w", 1500],
        ["off", "toast", "show"], ["tap", "day"], ...KALAN.map((v, i) => ["txt", "n" + i, nf(K.dil, v - 1 - (i === 0 ? 1 : 0))]), ["txt", "done", nf(K.dil, DONE + 7)],
        ["txt", "left", K.L("kaza.main.leftSmall", { n: nf(K.dil, top0 - 7) })], ["txt", "toastT", K.L("kaza.main.addedDay", { count: 6, nT: nf(K.dil, 6) })], ["on", "toast", "show"], ["w", 1500],
        ["off", "toast", "show"], ["tap", "some"], ["ov", "s"], ["w", 400],
        ["tap", "sp1"], ["txt", "sv1", "1"], ["on", "sn1", "kz-on"], ["txt", "ssave", K.L("kaza.some.save", { count: 1, nT: "1" })], ["on", "ssave", "en"],
        ["tap", "sp1"], ["txt", "sv1", "2"], ["txt", "ssave", K.L("kaza.some.save", { count: 2, nT: "2" })],
        ["tap", "sp4"], ["txt", "sv4", "1"], ["on", "sn4", "kz-on"], ["txt", "ssave", K.L("kaza.some.save", { count: 3, nT: "3" })], ["w", 300],
        ["tap", "ssave"], ["cl", "s"], ["txt", "n1", nf(K.dil, KALAN[1] - 3)], ["txt", "n4", nf(K.dil, KALAN[4] - 2)], ["txt", "done", nf(K.dil, DONE + 10)],
        ["txt", "toastT", K.L("kaza.main.addedSome", { count: 3, nT: nf(K.dil, 3) })], ["on", "toast", "show"], ["w", 1500],
        ["tap", "tabO"], ["go", "o"], ["w", 700], ["tap", "otoday"], ["on", "db", "on"], ["txt", "odone", nf(K.dil, 12)], ["txt", "oleft", K.L("kaza.oruc.leftSmall", { n: nf(K.dil, 18) })],
        ["txt", "otoday", K.L("kaza.oruc.todayDone")], ["on", "otoday", "dis"], ["txt", "toastT", K.L("kaza.oruc.wrote")], ["on", "toast", "show"], ["w", 2400]],
      still: 0, hint: "p0",
    });
  },

  /** Namazlarim (kurulmadan): kaza giris satiri -> kurulum 1. */
  "kaza-ac": (K) => K.telefon({
    aria: `${K.L("prayerDetail.title")} › ${K.L("kaza.titleBoth")} › ${K.L("kaza.s1.begin")}`,
    views: [["n", namazlarim(K, { kaza: false })], ["k1", kurulum1(K), "push"]],
    tl: [["w", 1100], ["tap", "entry"], ["go", "k1"], ["w", 2600]],
    still: 0, hint: "entry",
  }),

  /** Kurulum 2: bes vakit ve vitir icin sayi yazilir, Devam acilir. */
  "kaza-sayilar": (K) => K.telefon({
    aria: `${K.L("kaza.s2.title")} › ${adlar(K).map((a, i) => `${a} ${KALAN[i]}`).join(", ")} › ${K.L("kaza.s2.next")}`,
    views: [["k2", kurulum2(K)]],
    tl: [["w", 800], ...KALAN.flatMap((v, i) => [["tap", "f" + i], ["type", "f" + i, nf(K.dil, v)], ...(i === 0 ? [["on", "next2", "en"]] : [])]), ["w", 1800]],
    still: 0, hint: "f0",
  }),

  /** Hesap yardimcisi: 2 yil -> her vakit icin yaklasik 730 -> Sayilara yaz -> alanlar dolar. */
  "kaza-hesap": (K) => K.telefon({
    aria: `${K.L("kaza.s2.calc")} › ${K.L("kaza.calc.q")} 2 › ${K.L("kaza.calc.result")} 730 › ${K.L("kaza.calc.apply")}`,
    views: [["k2", kurulum2(K)], ["c", hesap(K), "up"], ["k2b", kurulum2(K, { degerler: [730, 730, 730, 730, 730, 730] }), "fade"]],
    tl: [["w", 900], ["tap", "calc"], ["go", "c"], ["w", 700], ["tap", "cyp"], ["txt", "cy", "1"], ["txt", "cres", nf(K.dil, 365)], ["on", "apply", "en"], ["w", 300],
      ["tap", "cyp"], ["txt", "cy", "2"], ["txt", "cres", nf(K.dil, 730)], ["w", 900], ["tap", "apply"], ["go", "k2b"], ["w", 2200]],
    still: 0, hint: "calc",
  }),

  /** Kurulum 3: tempo, hatirlat, Bismillah -> ana ekran -> bir kez Niyet Bahcesi sorusu. */
  "kaza-tempo": (K) => K.telefon({
    aria: `${K.L("kaza.s3.title")} › ${K.L("kaza.pace.twoDaily")} › ${K.L("kaza.s3.remind")} › ${K.L("kaza.s3.finish")} › ${K.L("kaza.garden.title")}`,
    views: [["k3", kurulum3(K)], ["m", anaEkran(K, { done: 0, left: [730, 730, 730, 730, 730, 730], ay: 0, toplamAy: 24, son: false }), "fade"]],
    overlays: [["g", bahceSorusu(K), "pop"]],
    tl: [["w", 900], ["tap", "pb"], ["off", "pa", "on"], ["on", "pb", "on"], ["txt", "est", `${K.L("kaza.pace.rangeY", { lo: 6, hi: 7, loT: nf(K.dil, 6), hiT: nf(K.dil, 7) })} ${K.L("kaza.pace.changeAny")}`], ["w", 900],
      ["tap", "rem"], ["on", "rem", "on"], ["on", "remt", "show"], ["w", 800], ["tap", "fin"], ["go", "m"], ["w", 500], ["ov", "g"], ["w", 1400], ["tap", "gno"], ["cl", "g"], ["w", 1600]],
    still: 0, hint: "pa",
  }),

  /** Ana ekran: Ogle + ve Yatsi +; Geri al cubugu, gunun ilk kaydinda "Allah kabul etsin". */
  "kaza-arti": (K) => {
    const top0 = KALAN.reduce((a, b) => a + b, 0);
    return K.telefon({
      aria: `${adlar(K)[1]} + › ${K.L("kaza.main.added", { name: adlar(K)[1] })} › ${adlar(K)[4]} +`,
      views: [["m", anaEkran(K)]],
      tl: [["w", 900], ...tlArti(K, 1, DONE + 1, KALAN[1] - 1), ["on", "bless", "show"], ["txt", "left", K.L("kaza.main.leftSmall", { n: nf(K.dil, top0 - 1) })], ["w", 1600],
        ...tlArti(K, 4, DONE + 2, KALAN[4] - 1), ["txt", "left", K.L("kaza.main.leftSmall", { n: nf(K.dil, top0 - 2) })], ["w", 2200]],
      still: 8, hint: "p1",
    });
  },

  /** Bir gunun kazasi, sonra Birkac tane kildim: Sabah 2, Ikindi 1 -> 3 namazi yaz. */
  "kaza-birkac": (K) => K.telefon({
    aria: `${K.L("kaza.main.day")} › ${K.L("kaza.main.some")} › ${K.L("kaza.some.save", { count: 3, nT: "3" })}`,
    views: [["m", anaEkran(K)]],
    overlays: [["s", birkacPencere(K), "sheet"]],
    tl: [["w", 900], ["tap", "day"], ...KALAN.map((v, i) => ["txt", "n" + i, nf(K.dil, v - 1)]), ["txt", "done", nf(K.dil, DONE + 6)],
      ["txt", "toastT", K.L("kaza.main.addedDay", { count: 6, nT: nf(K.dil, 6) })], ["on", "toast", "show"], ["w", 1500], ["off", "toast", "show"],
      ["tap", "some"], ["ov", "s"], ["w", 500],
      ["tap", "sp0"], ["txt", "sv0", "1"], ["on", "sn0", "kz-on"], ["txt", "ssave", K.L("kaza.some.save", { count: 1, nT: "1" })], ["on", "ssave", "en"],
      ["tap", "sp0"], ["txt", "sv0", "2"], ["txt", "ssave", K.L("kaza.some.save", { count: 2, nT: "2" })],
      ["tap", "sp2"], ["txt", "sv2", "1"], ["on", "sn2", "kz-on"], ["txt", "ssave", K.L("kaza.some.save", { count: 3, nT: "3" })], ["w", 500],
      ["tap", "ssave"], ["cl", "s"], ["txt", "n0", nf(K.dil, KALAN[0] - 3)], ["txt", "n2", nf(K.dil, KALAN[2] - 2)], ["txt", "done", nf(K.dil, DONE + 9)],
      ["txt", "toastT", K.L("kaza.main.addedSome", { count: 3, nT: nf(K.dil, 3) })], ["on", "toast", "show"], ["w", 2200]],
    still: 0, hint: "day",
  }),

  /** Namazlarim: Aksam isaretlenir, altinda Kazasini da kildim cikar, dokununca Kazasi da yazildi. */
  "kaza-kisayol": (K) => K.telefon({
    aria: `${K.L("prayerDetail.title")} › ${adlar(K)[3]} › ${K.L("kaza.bridge.also")} › ${K.L("kaza.bridge.done")}`,
    views: [["n", namazlarim(K, { yazilan: [0] })]],
    tl: [["w", 900], ["tap", "d3"], ["on", "d3", "on"], ["on", "al3", "show"], ["w", 1100], ["tap", "al3"], ["on", "al3", "done"], ["txt", "alt3", K.L("kaza.bridge.done")],
      ["txt", "entT", K.L("kaza.entryDoneBoth", { n: nf(K.dil, DONE + 1), m: nf(K.dil, 11) })],
      ["txt", "toastT", K.L("kaza.main.added", { name: adlar(K)[3] })], ["on", "toast", "show"], ["w", 2600]],
    still: 4, hint: "al3",
  }),

  /** Oruc sekmesi: Bugun tuttum -> dizide bir tane dolar, dugme "Bugun yazildi". */
  "kaza-oruc": (K) => K.telefon({
    aria: `${K.L("kaza.titleO")} › ${K.L("kaza.oruc.today")} › ${K.L("kaza.oruc.wrote")}`,
    views: [["o", orucEkran(K)]],
    tl: [["w", 1000], ["tap", "otoday"], ["on", "db", "on"], ["txt", "odone", nf(K.dil, 12)], ["txt", "oleft", K.L("kaza.oruc.leftSmall", { n: nf(K.dil, 18) })],
      ["txt", "otoday", K.L("kaza.oruc.todayDone")], ["on", "otoday", "dis"], ["txt", "toastT", K.L("kaza.oruc.wrote")], ["on", "toast", "show"], ["w", 2600]],
    still: 0, hint: "otoday",
  }),

  /** Son kayit -> Gecmis: kayitlar, Sayilari duzelt, Onceki bir hale don. */
  "kaza-gecmis": (K) => K.telefon({
    aria: `${K.L("kaza.main.last")}› ${K.L("kaza.hist.title")} › ${K.L("kaza.hist.correct")} · ${K.L("kaza.hist.restore")}`,
    views: [["m", anaEkran(K)], ["h", gecmis(K), "push"]],
    tl: [["w", 900], ["tap", "last"], ["go", "h"], ["w", 1400], ["y", "hsc", "7.6"], ["w", 2400]],
    still: 3, hint: "last",
  }),

  /** Merkez karti: iri ogeler; Ogle + (Allah kabul etsin), Sabah +. */
  "kaza-kart": (K) => K.telefon({
    aria: `${K.L("kaza.titleN")}: ${K.L("kaza.main.doneLabel")} ${nf(K.dil, DONE)} › ${adlar(K)[1]} +`,
    views: [["k", kart(K)]],
    tl: [["w", 1000], ["tap", "kp1"], ["txt", "kn1", nf(K.dil, KALAN[1] - 1)], ["txt", "kd", nf(K.dil, DONE + 1)], ["on", "kbl", "show"], ["w", 1700],
      ["tap", "kp0"], ["txt", "kn0", nf(K.dil, KALAN[0] - 1)], ["txt", "kd", nf(K.dil, DONE + 2)], ["w", 2200]],
    still: 5, hint: "kp1",
  }),
};

export const IKON = {
  kzUndo: '<path d="M9 7 4.5 11.5 9 16"/><path d="M4.5 11.5H14a5 5 0 0 1 0 10h-2"/>',
  kzMinus: '<path d="M5 12h14"/>',
  kzLock: '<rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>',
  kzCalc: '<rect x="5.5" y="3.5" width="13" height="17" rx="2"/><path d="M8.5 7.5h7M8.5 12h1M12 12h1M15 12h.5M8.5 15.5h1M12 15.5h1M15 15.5h.5"/>',
  kzRestore: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5v3.8h3.8"/><path d="M12 8.5V12l2.5 1.5"/>',
  kzSliders: '<path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="1.8" fill="currentColor"/><circle cx="15" cy="12" r="1.8" fill="currentColor"/><circle cx="8" cy="17" r="1.8" fill="currentColor"/>',
  kzSunUp: '<path d="M4 18h16M7 14.5a5 5 0 0 1 10 0M12 4v3M8.5 8.5 7.4 7.4M15.5 8.5l1.1-1.1"/>',
  kzSun: '<circle cx="12" cy="12" r="3.6"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M6 18l1.4-1.4M16.6 7.4 18 6"/>',
  kzSunCloud: '<circle cx="9.5" cy="9" r="3"/><path d="M9.5 3.5v1.5M4 9h1.5M5.6 5.1l1 1M13.4 5.1l-1 1"/><path d="M8 19h9a3 3 0 0 0 0-6 4 4 0 0 0-7.6 1.2A2.4 2.4 0 0 0 8 19z"/>',
  kzSunDown: '<path d="M4 18h16M7 14.5a5 5 0 0 1 10 0M12 7V4M10.2 5.8 12 7.5l1.8-1.7"/>',
};

export const CSS = `
  /* ocean: kaza ekranlari (KazaUi.tsx olculeri) */
  .mp-s .kz-hd { display: flex; align-items: center; gap: .55em; padding: .35em 1em .5em; min-height: 3.6em; }
  .mp-s .kz-hb { color: var(--a-ink); display: grid; place-items: center; flex: none; }
  .mp-s .kz-hb .ic { width: 1.45em; height: 1.45em; }
  .mp-s .kz-ht { flex: 1; min-width: 0; }
  .mp-s .kz-ht b { display: block; font-size: 1.32em; font-weight: 800; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .kz-ht small { display: block; color: var(--a-mut); font-size: .76em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .kz-eye { width: 2.6em; height: 2.6em; border-radius: 50%; background: var(--a-card); border: 1px solid var(--a-line); display: grid; place-items: center; flex: none; }
  .mp-s .kz-stp { color: var(--a-mut); font-size: .8em; flex: none; }
  .mp-s .kz-clip { flex: 1; overflow: hidden; position: relative; }
  .mp-s .kz-in { display: flex; flex-direction: column; gap: .55em; padding: .1em 1em 1em; }
  .mp-s .kz-seg { display: flex; gap: .25em; padding: .25em; border-radius: .9em; background: color-mix(in srgb, var(--a-pri) 12%, transparent); }
  .mp-s .kz-seg span { flex: 1; text-align: center; padding: .5em .3em; border-radius: .7em; font-weight: 700; font-size: .88em; }
  .mp-s .kz-seg .on { background: var(--a-card); box-shadow: 0 .15em .4em -.25em rgba(0, 0, 0, .3); }
  .mp-s .kz-bless { display: block; text-align: center; color: var(--a-pri); font-weight: 600; font-size: .86em; max-height: 0; opacity: 0; overflow: hidden; margin: -.3em 0; transition: max-height .4s ease, opacity .4s ease, margin .4s ease; }
  .mp-s .kz-bless.show { max-height: 1.6em; opacity: 1; margin: 0; }
  .mp-s .kz-last { display: flex; align-items: center; gap: .55em; padding: .2em .2em; font-size: .78em; line-height: 1.3; }
  .mp-s .kz-last > .ic { width: 1.15em; height: 1.15em; color: var(--a-mut); }
  .mp-s .kz-last > span { flex: 1; min-width: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .kz-last i { font-style: normal; color: var(--a-mut); }
  .mp-s .kz-card { background: var(--a-card); border-radius: 1.3em; box-shadow: 0 .35em 1em -.6em rgba(20, 60, 55, .35), 0 0 0 1px color-mix(in srgb, var(--a-line) 60%, transparent); }
  .mp-s .kz-hero { display: flex; flex-direction: column; gap: .2em; padding: .95em 1.05em; }
  .mp-s .kz-hero > small { font-size: .74em; }
  .mp-s .kz-big { font-size: 2.15em; line-height: 1.1; letter-spacing: -.01em; }
  .mp-s .kz-big em { font-style: normal; font-size: .58em; font-weight: 600; }
  .mp-s .kz-l1 { font-size: .84em; }
  .mp-s .kz-hero hr { margin: .45em 0 .3em; }
  .mp-s .kz-yr { display: flex; align-items: center; gap: .5em; margin-top: .25em; }
  .mp-s .kz-yr small { width: 3.4em; flex: none; color: var(--a-mut); font-size: .66em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .kz-yr span { display: flex; gap: .26em; flex-wrap: wrap; }
  .mp-s .kz-bd { width: .9em; height: .9em; border-radius: 50%; box-shadow: inset 0 0 0 .11em color-mix(in srgb, var(--a-mut) 60%, transparent); background: var(--a-card); flex: none; }
  .mp-s .kz-bd.on { box-shadow: inset 0 0 0 .11em var(--a-pri); background: linear-gradient(to top, var(--a-pri) var(--f, 0%), var(--a-card) 0); }
  .mp-s .kz-rows { padding: .15em 0; }
  .mp-s .kz-r { display: flex; align-items: center; gap: .6em; min-height: 3.05em; padding: .2em .65em .2em 1em; }
  .mp-s .kz-r + .kz-r { border-top: 1px solid var(--a-line); }
  .mp-s .kz-r > b:first-child { flex: 1; min-width: 0; font-size: .92em; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .kz-n { display: flex; flex-direction: column; align-items: flex-end; line-height: 1.1; }
  .mp-s .kz-n b { font-size: .92em; font-variant-numeric: tabular-nums; }
  .mp-s .kz-n small { color: var(--a-mut); font-size: .62em; }
  .mp-s .kz-plus { width: 2.3em; height: 2.3em; border-radius: 50%; background: color-mix(in srgb, var(--a-pri) 13%, var(--a-card)); color: var(--a-pri); display: grid; place-items: center; flex: none; }
  .mp-s .kz-plus .ic { width: 1.15em; height: 1.15em; }
  .mp-s .kz-2bt { display: flex; gap: .6em; }
  .mp-s .kz-2bt .bt { flex: 1; min-width: 0; height: auto; min-height: 2.85em; padding: .3em .5em; white-space: normal; text-align: center; line-height: 1.15; }
  .mp-s .bt.kz-pb { height: 2.85em; border-radius: .95em; font-size: .86em; }
  .mp-s .kz-toast { position: absolute; z-index: 5; left: .8em; right: .8em; bottom: 1em; display: flex; align-items: center; gap: .55em; padding: .55em .6em .55em .65em; border-radius: 1.1em;
    background: var(--a-ink); color: var(--a-bg); box-shadow: 0 .6em 1.4em -.6em rgba(0, 0, 0, .45); opacity: 0; transform: translateY(1.2em); transition: opacity .3s ease, transform .35s cubic-bezier(.2, .9, .3, 1); }
  .mp-s .kz-toast.show { opacity: 1; transform: none; }
  .mp-s .kz-tc { width: 1.9em; height: 1.9em; border-radius: 50%; background: color-mix(in srgb, var(--a-bg) 16%, transparent); display: grid; place-items: center; flex: none; color: var(--a-pri); }
  .mp-s .kz-tc .ic { width: 1.05em; height: 1.05em; }
  .mp-s .kz-toast > span:nth-child(2) { flex: 1; min-width: 0; font-size: .76em; font-weight: 600; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .kz-undo { display: inline-flex; align-items: center; gap: .3em; padding: .35em .6em; border-radius: 1em; background: color-mix(in srgb, var(--a-pri) 22%, transparent); color: var(--a-pri); flex: none; }
  .mp-s .kz-undo .ic { width: 1em; height: 1em; }
  .mp-s .kz-undo small { font-size: .72em; font-weight: 700; }
  /* oruc */
  .mp-s .kz-ram { display: flex; flex-wrap: wrap; gap: .3em; margin: .3em 0 .5em; }
  .mp-s .kz-db { width: .95em; height: .95em; border-radius: 50%; box-shadow: inset 0 0 0 .11em color-mix(in srgb, var(--a-mut) 60%, transparent); transition: background .3s ease; }
  .mp-s .kz-db.on { background: var(--a-pri); box-shadow: none; }
  .mp-s .kz-tb { align-self: center; color: var(--a-pri); font-weight: 700; font-size: .84em; padding: .45em 0 .1em; }
  .mp-s .kz-tgr { display: flex; align-items: center; gap: .6em; }
  .mp-s .kz-card.kz-tgr { padding: .75em .95em; }
  .mp-s .kz-tgr > div { flex: 1; min-width: 0; }
  .mp-s .kz-tgr b { display: block; font-size: .86em; }
  .mp-s .kz-tgr small { display: block; color: var(--a-mut); font-size: .68em; margin-top: .1em; }
  /* alt pencere */
  .mp-s .kz-sh { gap: .1em; padding-bottom: 1.3em; }
  .mp-s .kz-sht { font-size: 1.15em; margin-bottom: .2em; }
  .mp-s .kz-sr { display: flex; align-items: center; gap: .6em; min-height: 2.75em; }
  .mp-s .kz-sh .kz-sr + .kz-sr { border-top: 1px solid var(--a-line); }
  .mp-s .kz-sr > b { flex: 1; min-width: 0; font-size: .9em; font-weight: 600; color: var(--a-mut); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .kz-sr > b.kz-on, .mp-s .kz-per .kz-sr > b { color: var(--a-ink); }
  .mp-s .kz-step { display: flex; align-items: center; gap: .5em; }
  .mp-s .kz-step i { width: 2.1em; height: 2.1em; border-radius: 50%; background: color-mix(in srgb, var(--a-pri) 13%, var(--a-card)); color: var(--a-pri); display: grid; place-items: center; }
  .mp-s .kz-step i .ic { width: 1em; height: 1em; }
  .mp-s .kz-step b { min-width: 1.6em; text-align: center; font-variant-numeric: tabular-nums; }
  .mp-s .kz-when { display: flex; align-items: center; gap: .5em; border: 1px solid var(--a-line); border-radius: .8em; padding: .55em .7em; margin-top: .35em; font-size: .8em; }
  .mp-s .kz-when .ic { color: var(--a-pri); }
  .mp-s .kz-when i { font-style: normal; color: var(--a-mut); }
  .mp-s .kz-note { font-size: .66em; line-height: 1.35; margin: .3em 0 .4em; }
  /* kurulum */
  .mp-s .kz-foot { padding: .5em 1em 1.1em; display: flex; flex-direction: column; gap: .6em; }
  .mp-s .kz-dots { display: flex; justify-content: center; gap: .35em; }
  .mp-s .kz-dots i { width: .45em; height: .45em; border-radius: 1em; background: var(--a-line); }
  .mp-s .kz-dots i.on { width: 1.2em; background: var(--a-pri); }
  .mp-s .kz-ctr { align-items: center; text-align: center; padding-top: .6em; }
  .mp-s .kz-badge { width: 3.9em; height: 3.9em; border-radius: 50%; background: color-mix(in srgb, var(--a-pri) 13%, transparent); color: var(--a-pri); display: grid; place-items: center; }
  .mp-s .kz-badge .ic { width: 1.8em; height: 1.8em; }
  .mp-s .kz-h1 { font-size: 1.5em; font-weight: 800; line-height: 1.15; margin-top: .2em; }
  .mp-s .kz-lead { font-size: .84em; margin-top: -.3em; }
  .mp-s .kz-pts { display: grid; gap: .6em; text-align: start; margin: .3em 0; }
  .mp-s .kz-pts div { display: flex; gap: .55em; align-items: flex-start; }
  .mp-s .kz-pts .ic { color: var(--a-pri); }
  .mp-s .kz-pts small { font-size: .76em; line-height: 1.35; }
  .mp-s .kz-quote { padding: .8em .95em; display: flex; flex-direction: column; gap: .35em; text-align: start; }
  .mp-s .kz-quote small:first-child { font-size: .76em; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .kz-quote small.mu { font-size: .64em; }
  .mp-s .kz-h2 { font-size: 1.36em; font-weight: 800; line-height: 1.18; margin-top: .1em; }
  .mp-s .kz-h3 { font-size: 1.08em; margin-top: .5em; }
  .mp-s .kz-sub2 { font-size: .76em; margin-top: -.25em; line-height: 1.35; }
  .mp-s .kz-fields .kz-r { min-height: 2.75em; }
  .mp-s .kz-wt b { font-size: .8em !important; font-weight: 600; }
  .mp-s .in.kz-nf { min-height: 2.15em; width: 4.4em; padding: 0 .6em; justify-content: flex-end; border-radius: .6em; flex: none; font-variant-numeric: tabular-nums; }
  .mp-s .kz-fr { padding: .45em .9em; min-height: 3em; }
  .mp-s .kz-fr > small { font-size: .74em; }
  .mp-s .bt.kz-ob { height: 2.6em; font-size: .84em; border-radius: .9em; }
  .mp-s .kz-q { font-size: 1.12em; font-weight: 800; line-height: 1.2; margin-top: .2em; }
  .mp-s .kz-per { padding: .65em .95em .4em; display: flex; flex-direction: column; }
  .mp-s .kz-per > small { font-size: .7em; }
  .mp-s .kz-link { display: inline-flex; align-items: center; gap: .35em; color: var(--a-pri); font-weight: 700; font-size: .82em; }
  .mp-s .kz-res { display: flex; flex-direction: column; align-items: center; gap: .1em; padding: .8em; border-radius: 1.1em; background: color-mix(in srgb, var(--a-pri) 12%, transparent); text-align: center; }
  .mp-s .kz-res small { font-size: .74em; }
  .mp-s .kz-res small:last-child { font-size: .64em; color: var(--a-mut); }
  .mp-s .kz-res b { font-size: 2em; line-height: 1.1; font-variant-numeric: tabular-nums; }
  .mp-s .kz-opt { display: flex; gap: .65em; align-items: flex-start; padding: .7em .85em; border-radius: 1em; background: var(--a-card); border: 1px solid var(--a-line); transition: border-color .25s ease, box-shadow .25s ease; }
  .mp-s .kz-opt.on { border-color: var(--a-pri); box-shadow: inset 0 0 0 .08em var(--a-pri); }
  .mp-s .kz-opt b { display: block; font-size: .86em; }
  .mp-s .kz-opt small { display: block; color: var(--a-mut); font-size: .68em; margin-top: .1em; }
  .mp-s .kz-rad { width: 1.15em; height: 1.15em; border-radius: 50%; box-shadow: inset 0 0 0 .12em var(--a-mut); flex: none; margin-top: .1em; }
  .mp-s .kz-opt.on .kz-rad { box-shadow: inset 0 0 0 .32em var(--a-pri); }
  .mp-s .kz-est { font-size: .82em; font-weight: 600; line-height: 1.3; }
  .mp-s .kz-rem { padding: .75em .95em; display: flex; flex-direction: column; gap: .3em; }
  .mp-s .kz-time { display: none; justify-content: space-between; align-items: center; padding-top: .45em; border-top: 1px solid var(--a-line); font-size: .86em; }
  .mp-s .kz-time.show { display: flex; }
  .mp-s .kz-pop b.c { font-size: 1.05em; }
  .mp-s .kz-clamp { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .kz-pop .row2 .bt { padding: 0 .5em; font-size: .8em; min-width: 0; }
  .mp-s .kz-pop .row2 .bt span { overflow: hidden; text-overflow: ellipsis; }
  /* gecmis */
  .mp-s .kz-lines { padding: .55em 1em; display: flex; flex-direction: column; gap: .35em; }
  .mp-s .kz-lines div { display: flex; justify-content: space-between; gap: .5em; font-size: .84em; }
  .mp-s .kz-pace { display: flex; align-items: center; gap: .6em; padding: .7em 1em; }
  .mp-s .kz-pace > div { flex: 1; min-width: 0; }
  .mp-s .kz-pace b { display: block; font-size: .84em; }
  .mp-s .kz-pace small { display: block; font-size: .68em; }
  .mp-s .kz-chip { color: var(--a-pri); font-weight: 700; font-size: .74em; padding: .35em .75em; border-radius: 1em; background: color-mix(in srgb, var(--a-pri) 13%, transparent); flex: none; }
  .mp-s .kz-day { font-size: .72em; margin: .35em 0 -.25em .3em; }
  .mp-s .kz-items { padding: .1em 0; }
  .mp-s .kz-it { display: flex; align-items: center; gap: .65em; padding: .6em .9em; font-size: .84em; }
  .mp-s .kz-it + .kz-it { border-top: 1px solid var(--a-line); }
  .mp-s .kz-it > small { font-size: .82em; width: 2.8em; flex: none; }
  .mp-s .kz-it > span { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .kz-it > .ic { color: var(--a-mut); width: 1.1em; height: 1.1em; }
  .mp-s .kz-ms > i { width: .5em; height: .5em; border-radius: 50%; background: var(--a-pri); flex: none; margin: 0 1.15em 0 .3em; }
  .mp-s .kz-acts { margin-top: .4em; padding: .1em 0; }
  .mp-s .kz-acts > div { display: flex; align-items: center; gap: .65em; padding: .7em .9em; }
  .mp-s .kz-acts > div + div { border-top: 1px solid var(--a-line); }
  .mp-s .kz-acts > div > .ic:first-child { color: var(--a-pri); }
  .mp-s .kz-acts b { flex: 1; min-width: 0; font-size: .86em; }
  .mp-s .kz-acts span { flex: 1; min-width: 0; }
  .mp-s .kz-acts span b, .mp-s .kz-acts span small { display: block; }
  .mp-s .kz-acts small { font-size: .68em; }
  .mp-s .kz-acts > div > .ic:last-child { color: var(--a-mut); width: 1em; height: 1em; }
  /* gece: Namazlarim (usePhotoPalette, her zaman koyu) */
  .mp-s .lock.kz-gc { --a-bg: #0f1c24; --a-card: rgba(23, 39, 48, .82); --a-ink: #e9f0f2; --a-mut: #8fa3aa; --a-line: rgba(140, 170, 180, .16); --a-pri: #6fb8a9; --a-on: #0b1519;
    display: flex; flex-direction: column; color: var(--a-ink); background: radial-gradient(60% 34% at 70% 42%, rgba(120, 150, 140, .22), transparent 70%), linear-gradient(180deg, #1a2a33 0%, #10202a 45%, #0b1519 100%); }
  .mp-s .kz-nh { display: grid; grid-template-columns: 2.6em 1fr 2.6em; align-items: center; padding: .35em 1em .45em; text-align: center; }
  .mp-s .kz-nh b { font-size: 1.08em; }
  .mp-s .kz-rb { width: 2.45em; height: 2.45em; border-radius: 50%; background: rgba(255, 255, 255, .1); display: grid; place-items: center; color: var(--a-ink); }
  .mp-s .kz-sl { display: block; font-size: .66em; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--a-mut); margin: .1em .3em -.25em; }
  :root[lang="ar"] .mp-s .kz-sl { letter-spacing: 0; }
  .mp-s .kz-gcard { background: var(--a-card); border: 1px solid var(--a-line); border-radius: 1.1em; padding: .1em 0; }
  .mp-s .kz-pr + .kz-pr { border-top: 1px solid var(--a-line); }
  .mp-s .kz-prr { display: flex; align-items: center; gap: .65em; padding: .62em .9em; }
  .mp-s .kz-prr > .ic:first-child { color: var(--a-pri); width: 1.2em; height: 1.2em; }
  .mp-s .kz-prr b { flex: 1; min-width: 0; font-size: .9em; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .kz-prr small { font-size: .8em; font-weight: 600; }
  .mp-s .kz-tes b { color: var(--a-pri); }
  .mp-s .kz-tes .ic:last-child { color: var(--a-mut); width: 1em; height: 1em; }
  .mp-s .kz-dot { width: 1.5em; height: 1.5em; border-radius: 50%; box-shadow: inset 0 0 0 .1em var(--a-pri); display: grid; place-items: center; color: transparent; flex: none; transition: background .25s ease; }
  .mp-s .kz-dot .ic { width: .9em; height: .9em; }
  .mp-s .kz-dot.on { background: var(--a-pri); color: var(--a-on); }
  .mp-s .kz-also { display: none; align-items: center; gap: .4em; margin: -.2em 0 .6em 2.75em; padding: .45em .8em; border-radius: .7em; width: max-content; max-width: calc(100% - 3.6em); background: color-mix(in srgb, var(--a-pri) 24%, transparent); font-size: .78em; font-weight: 700; }
  :root[dir="rtl"] .mp-s .kz-also { margin: -.2em 2.75em .6em 0; }
  .mp-s .kz-also.show { display: flex; }
  .mp-s .kz-also > span { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .kz-also .ic { width: 1.1em; height: 1.1em; color: var(--a-pri); }
  .mp-s .kz-also .kz-id, .mp-s .kz-also.done .kz-ia { display: none; }
  .mp-s .kz-also.done .kz-id { display: inline-block; color: var(--a-mut); }
  .mp-s .kz-also.done { background: color-mix(in srgb, var(--a-pri) 10%, transparent); color: var(--a-mut); }
  .mp-s .kz-entry { display: flex; align-items: center; gap: .7em; padding: .75em .9em; margin-top: .2em; }
  .mp-s .kz-entry > div { flex: 1; min-width: 0; }
  .mp-s .kz-entry b { display: block; font-size: .9em; }
  .mp-s .kz-entry small { display: block; color: var(--a-mut); font-size: .7em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .kz-entry > .ic { color: var(--a-mut); width: 1em; height: 1em; }
  .mp-s .kz-ei { width: 2.4em; height: 2.4em; border-radius: 50%; background: color-mix(in srgb, var(--a-pri) 18%, transparent); display: flex; align-items: center; justify-content: center; gap: .18em; flex: none; }
  .mp-s .kz-ei i { width: .38em; height: .38em; border-radius: 50%; background: var(--a-pri); }
  .mp-s .kz-ei i:last-child { background: transparent; box-shadow: inset 0 0 0 .09em var(--a-pri); }
  /* merkez karti: iri */
  .mp-s .kz-k { flex: 1; display: flex; flex-direction: column; gap: .6em; padding: .9em .9em 1em; font-size: 1.4em; }
  .mp-s .kz-kt { font-size: 1.12em; font-weight: 800; line-height: 1.15; padding: 0 .15em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .kz-kh { display: flex; flex-direction: column; gap: .15em; padding: .8em .9em; }
  .mp-s .kz-kh small { font-size: .72em; }
  .mp-s .kz-kh b { font-size: 2.1em; line-height: 1.05; letter-spacing: -.01em; }
  .mp-s .kz-kb { display: flex; gap: .2em; margin-top: .35em; }
  .mp-s .kz-kb .kz-bd { width: .82em; height: .82em; }
  .mp-s .kz-kbl.show { max-height: 1.4em; }
  .mp-s .kz-k .kz-r { min-height: 2.6em; padding: .15em .5em .15em .8em; }
  .mp-s .kz-kn { font-size: .95em; font-variant-numeric: tabular-nums; }
  .mp-s .kz-k .kz-plus { width: 2.05em; height: 2.05em; }
  .mp-s .bt.kz-kd { margin-top: auto; height: 2.6em; font-size: .82em; }
`;
