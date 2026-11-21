/**
 * Dua Defterim rehberinin ekranlari (21 Kas 2026, 2.1.0).
 * Akislar uygulamanin kodundan izlendi (salt okunur):
 *   app/prophetic-duas.tsx          Dualar: arama, "Halin nedir?" halkasi, (Simdi karti), "Dua Defterim" satiri, basliklar
 *   app/dua-defteri.tsx             defter: ustte tesbih ipi (DefterStrandCard), hadis, bolumler (hazir: Namaz sonu, Sabah, Seher,
 *                                   Yolculuk, Cuma, Kadir gecesi, Sevdiklerim), bolum basinda "Okumaya basla", +, uc nokta;
 *                                   ust cubukta yazdir (PDF) ve + ; "Dua ekle" penceresi (Bolum cipleri, Kimin icin, Duan ya da niyetin,
 *                                   "Arapca, okunus ve anlam ekle", Kaydet); bolum penceresi (Yukari, Asagi, Hatirlatici, Sil)
 *   app/dua-defteri-oku.tsx         okuma: bolumun dualari alt alta, buyuk yazi; altta A A ve "Kaydir"; sonda "Bugun dua ettim"
 *   components/duas/AddToDefterSheet "Defterime ekle" + "Hangi bolume?" (Dualar okuyucusu, Kur'an ayet penceresi, Esma)
 *   components/duas/DefterRemindSheet  Hatirlatici: ac/kapa, Her gun ya da gunler, Saat, Kaydet
 *   components/duas/DefterPdfSheet  "PDF ve yazdir": Butun defter ya da bolum, "Adlari da ekle" (kapali gelir), PDF olarak paylas, Yazdir
 * Tema "koyu" (z-defter karesi): altin vurgu. Uzun tire YOK. Cevsen YOK.
 */

/** Dile gore ornek veriler (kisinin yazdiklari ve hazir metinlerin uygulamadaki adlari). Uygulama metni DEGIL. */
const DX = {
  tr: { ad: "Annem", dua: "Rabbim, anneme şifa ver.", a1: "Bakara 2:201", a2: "Tâhâ 20:114", seyyid: "Seyyidü'l-İstiğfâr" },
  en: { ad: "My mother", dua: "My Lord, grant my mother healing.", a1: "Al-Baqarah 2:201", a2: "Ta-Ha 20:114", seyyid: "Sayyid al-Istighfar" },
  de: { ad: "Meine Mutter", dua: "Mein Herr, schenke meiner Mutter Heilung.", a1: "Al-Baqarah 2:201", a2: "Ta-Ha 20:114", seyyid: "Sayyid al-Istighfar" },
  fr: { ad: "Ma mère", dua: "Seigneur, accorde la guérison à ma mère.", a1: "Al-Baqarah 2:201", a2: "Ta-Ha 20:114", seyyid: "Sayyid al-Istighfar" },
  ar: { ad: "أمي", dua: "ربِّ اشفِ أمي.", a1: "البقرة 2:201", a2: "طه 20:114", seyyid: "سيد الاستغفار" },
};
// Bakara 2:201 (Kur'an metni, her dilde ayni)
const AYET_201 = "رَبَّنَآ ءَاتِنَا فِى ٱلدُّنْيَا حَسَنَةً وَفِى ٱلْءَاخِرَةِ حَسَنَةً وَقِنَا عَذَابَ ٱلنَّارِ";

// ── parcalar ────────────────────────────────────────────────────────────────────

/** Ust cubuk (yigin basligi): geri, ortada baslik, sagda simgeler. */
function ust(K, baslik, sag = []) {
  return `<div class="df-hd"><span class="df-bk">${K.ic("back", "fl")}<small>${K.Le("common.back")}</small></span><b>${K.e(baslik)}</b><span class="df-hr">${sag.map(([ic, key]) => `<i${K.attr(key)}>${K.ic(ic)}</i>`).join("")}</span></div>`;
}

/** Tesbih ipi: n tane dizili (en cok 33), puskul solda. key: dizilecek sonraki tane. */
function ip(n, key) {
  let s = `<svg viewBox="0 0 300 46" aria-hidden="true"><path d="M0 18 Q150 30 300 10" fill="none" stroke="#3f9a8f" stroke-width="1.4"/>`;
  s += `<path d="M18 19v5" stroke="#3f9a8f" stroke-width="1.4"/><path d="M15 24h6l2 18c-3 2-7 2-10 0z" fill="#1f6b63"/><circle cx="18" cy="23" r="2.4" fill="#d1ab5a"/>`;
  const yol = (t) => [n1(26 + t * 250), n1(18 + (30 - 18) * 2 * t * (1 - t) * 1.6 - t * 6)];
  for (let i = 0; i < 33; i++) {
    const [x, y] = yol(i / 32);
    if (i < n) s += `<g><circle cx="${x}" cy="${y}" r="6.6" fill="#b8682a"/><path d="M${n1(x - 5)} ${n1(y - 2)}q5 3 10 0" stroke="#8f4c1c" stroke-width="1.2" fill="none"/><circle cx="${n1(x - 2)}" cy="${n1(y - 2.4)}" r="2.1" fill="#e9a35b" opacity=".75"/></g>`;
    else if (i === n && key) s += `<g class="df-new"${key ? ` data-k="${key}"` : ""} style="transform-origin:${x}px ${y}px"><circle cx="${x}" cy="${y}" r="6.6" fill="#b8682a"/><path d="M${n1(x - 5)} ${n1(y - 2)}q5 3 10 0" stroke="#8f4c1c" stroke-width="1.2" fill="none"/><circle cx="${n1(x - 2)}" cy="${n1(y - 2.4)}" r="2.1" fill="#e9a35b" opacity=".75"/></g>`;
    else s += `<circle cx="${x}" cy="${y}" r="1.3" fill="#3f9a8f"/>`;
  }
  return s + `</svg>`;
}
const n1 = (x) => Math.round(x * 10) / 10;

/** Tesbih ipi karti: baslik (gun sayisi), ip, alt satir. */
function ipKarti(K, { n, sub = "done", key }) {
  return `<div class="df-strand"><b${K.attr("stT")}>${n ? K.Le("duaDefter.strand.titleTotal", { count: n }) : K.Le("duaDefter.strand.titleEmpty")}</b>${ip(n, key)}<small${K.attr("stS")}>${sub === "done" ? K.Le("duaDefter.strand.subDone") : K.Le("duaDefter.strand.subNext", { n: n + 1 })}</small></div>`;
}

/** Bolum basi: ad, dua sayisi, "Okumaya basla", +, uc nokta. */
function bolumBasi(K, ad, sayi, { readKey, moreKey, subKey, remind = false } = {}) {
  return `<div class="df-sh"><div><b>${K.e(ad)}</b><small${K.attr(subKey)}>${sayi ? K.Le("duaDefter.count", { count: sayi }) : K.Le("duaDefter.sectionEmpty")}${remind ? ` · ${K.Le("duaDefter.remindOn")}` : ""}</small></div>
    ${sayi ? `<span class="df-read"${K.attr(readKey)}>${K.ic("book")}<small>${K.Le("duaDefter.read")}</small></span>` : ""}<i class="df-pl">${K.ic("plus")}</i><i class="df-mo"${K.attr(moreKey)}>${K.ic("dfDots")}</i></div>`;
}
/** Dua satiri: simge (ayet: kitap, hazir dua: ayrac), ad, alt yazi, duzenle simgesi. */
const satir = (K, { ic, ad, alt, key, cls = "" }) =>
  `<div class="df-row ${cls}"${K.attr(key)}>${ic ? K.ic(ic) : ""}<div><b>${K.e(ad)}</b>${alt ? `<small>${K.e(alt)}</small>` : ""}</div>${K.ic("edit")}</div>`;

/** Dua Defterim ekrani (dolu). yeni: Sevdiklerim'e eklenecek satir gizli bekler. */
function defter(K, { n = 19, prayed = true, yeni = false, sub = "done", remind = false } = {}) {
  const D = DX[K.dil];
  return `${ust(K, K.L("duaDefter.title"), [["dfPrint", "pdf"], ["plus", "add"]])}<div class="df-clip"><div class="df-in sc"${K.attr("dsc")}>
    ${ipKarti(K, { n, sub, key: prayed ? "" : "bead" })}
    <div class="df-had">${K.Le("emanet.hadithShort")}</div>
    <div class="df-pr${prayed ? " on" : ""}"${K.attr("prayed")}>${K.ic("check")}<small>${K.Le("duaDefter.prayedToday")}</small></div>
    ${bolumBasi(K, K.L("duaDefter.section.namaz"), 2, { readKey: "read1", moreKey: "more1", subKey: "sub1", remind })}
    ${satir(K, { ic: "book", ad: D.a1 })}${satir(K, { ic: "dfMark", ad: D.seyyid })}
    ${bolumBasi(K, K.L("duaDefter.section.sabah"), 1, {})}
    ${satir(K, { ic: "book", ad: D.a2 })}
    ${yeni ? `${bolumBasi(K, K.L("duaDefter.section.sevdiklerim"), 0, { subKey: "sub3" })}${satir(K, { ad: K.L("duaDefter.forName", { name: D.ad }), alt: D.dua, key: "newRow", cls: "df-hide" })}` : ""}
  </div></div>`;
}

/** Bos defter: simge, baslik, aciklama, "Dua ekle". */
function bosDefter(K) {
  return `${ust(K, K.L("duaDefter.title"), [["plus", ""]])}<div class="df-in">
    ${ipKarti(K, { n: 0, sub: "next" })}
    <div class="df-had">${K.Le("emanet.hadithShort")}</div>
    <div class="df-empty">${K.ic("dfJournal")}<b>${K.Le("duaDefter.emptyTitle")}</b><small>${K.Le("duaDefter.emptyBody")}</small>
      ${K.bt(K.L("duaDefter.add"), { key: "addE", cls: "df-btn", icon: "plus" })}</div>
    ${bolumBasi(K, K.L("duaDefter.section.namaz"), 0, {})}${bolumBasi(K, K.L("duaDefter.section.sabah"), 0, {})}${bolumBasi(K, K.L("duaDefter.section.seher"), 0, {})}
  </div>`;
}

/** Dualar ekrani: arama, hal halkasi, "Dua Defterim" satiri, basliklar. */
function dualar(K) {
  const ikon = ["dfRain", "dfMed", "dfWallet", "shield", "dfStorm", "compass", "hourglass", "dfHeart"];
  const dugum = ikon.map((ic, i) => { const a = -Math.PI / 2 + (2 * Math.PI * i) / 8; return `<i style="left:${n1(50 + 39 * Math.cos(a))}%;top:${n1(50 + 39 * Math.sin(a))}%">${K.ic(ic)}</i>`; }).join("");
  const baslik = (ic, ad, n) => `<div class="df-grp">${K.ic(ic)}<b>${K.e(ad)}</b><small>${K.Le("propheticDuas.countDuas", { count: n })}</small>${K.ic("chev", "fl")}</div>`;
  return `${ust(K, K.L("propheticDuas.title"), [["info", ""]])}<div class="df-in">
    <div class="df-srch">${K.ic("dfSearch")}<small>${K.Le("propheticDuas.searchPlaceholder")}</small></div>
    <div class="df-ring">${dugum}<div><b>${K.Le("propheticDuas.halTitle")}</b><small>${K.Le("propheticDuas.halHint")}</small></div></div>
    <div class="df-entry"${K.attr("entry")}>${K.ic("dfJournal")}<div><b>${K.Le("duaDefter.title")}</b><small>${K.Le("duaDefter.entrySub")}</small></div>${K.ic("chev", "fl")}</div>
    ${baslik("dfMark", K.L("propheticDuas.group.fav"), 3)}${baslik("dfSun", K.L("propheticDuas.group.daily"), 12)}
  </div>`;
}

/** "Dua ekle" penceresi. */
function ekleP(K) {
  const ch = (ad, on, key) => `<span class="df-chip${on ? " on" : ""}"${K.attr(key)}>${K.e(ad)}</span>`;
  return `<div class="sheet df-sheet"><i class="grab"></i><b class="df-st">${K.Le("duaDefter.addTitle")}</b>
    <small class="df-lb">${K.Le("duaDefter.sectionLabel")}</small>
    <div class="df-chips">${ch(K.L("duaDefter.section.namaz"), true, "cNamaz")}${ch(K.L("duaDefter.section.sabah"), false)}${ch(K.L("duaDefter.section.sevdiklerim"), false, "cSev")}${ch(K.L("duaDefter.section.other"), false)}</div>
    <small class="df-lb">${K.Le("duaDefter.forLabel")}</small>${K.input({ key: "for", ph: K.L("duaDefter.forPlaceholder") })}
    <div class="df-lr"><small class="df-lb">${K.Le("duaDefter.textLabel")}</small><small class="df-paste">${K.ic("copy")}${K.Le("duaDefter.paste")}</small></div>
    ${K.input({ key: "txt", ph: K.L("duaDefter.textPlaceholder"), cls: "ta" })}
    <span class="df-more">${K.ic("dfPlusC")}<small>${K.Le("duaDefter.moreFields")}</small></span>
    ${K.bt(K.L("duaDefter.save"), { key: "save", cls: "blk df-btn dis" })}</div>`;
}

/** Okuma ekrani: bolumun dualari, sonda "Bugun dua ettim"; altta A A ve Kaydir. */
function okuma(K) {
  const D = DX[K.dil];
  const anlam = K.dil === "ar" ? "" : `<small class="df-mean">${K.Le("duaDefter.meaningPlaceholder")}</small>`;
  return `${ust(K, K.L("duaDefter.section.namaz"))}<div class="df-clip"><div class="df-rd sc"${K.attr("rsc")}>
    <div class="df-blk"><b class="df-bh">${K.e(D.a1)}</b><b class="df-ar" dir="rtl">${AYET_201}</b>${anlam}<small class="df-src">${K.Le("propheticDuas.kind.quran")} · ${K.e(D.a1)}</small></div>
    <div class="df-blk"><b class="df-bh">${K.e(D.seyyid)}</b><div class="df-lines" aria-hidden="true"><i></i><i></i><i style="width:70%"></i></div><small class="df-src">${K.Le("propheticDuas.kind.prophet")}</small></div>
    <div class="df-end"><small>${K.Le("emanet.hadithShort")}</small>
      <div class="df-pr"${K.attr("rPrayed")}>${K.ic("check")}<small>${K.Le("duaDefter.prayedToday")}</small></div>
      ${K.bt(K.L("duaDefter.markPrayed"), { key: "pray", cls: "blk df-btn", icon: "dfHeart" })}<small class="df-close">${K.Le("duaDefter.close")}</small></div>
  </div></div>
  <div class="df-bar"><b class="a1">A</b><b class="a2">A</b><span>${K.ic("dfPlay")}<small>${K.Le("duaDefter.autoScroll")}</small></span></div>
  <div class="df-toast"${K.attr("toast")}>${K.ic("check")}<small>${K.Le("emanet.prayedToast")}</small><b>${K.Le("notice.undo")}</b></div>`;
}

/** Dualar okuyucusu (hazir dua karti): Arapca, anlam, kaynak, eylem satiri ("Defterime ekle"). */
function duaOkuyucu(K) {
  const act = (ic, ad, key) => `<span${K.attr(key)}><i>${K.ic(ic)}</i><small>${K.e(ad)}</small></span>`;
  const anlam = K.dil === "ar" ? "" : `<div class="df-meanrow"><i></i><small>${K.Le("duaDefter.meaningPlaceholder")}</small></div>`;
  return `${ust(K, K.L("propheticDuas.title"), [["dfText", ""], ["share", ""]])}<div class="df-in">
    <div class="df-card"><b class="df-ar big" dir="rtl">${AYET_201}</b>${anlam}
      <small class="df-src">${K.ic("book")}<span><em>${K.Le("propheticDuas.kind.quran")}</em><br>${K.e(DX[K.dil].a1)}</span></small>
      <div class="df-acts">${act("cap", K.L("propheticDuas.act.ezber"))}${act("send", K.L("propheticDuas.act.send"))}${act("hand", K.L("propheticDuas.act.emanet"))}${act("dfMark", K.L("propheticDuas.act.fav"))}${act("dfJournal", K.L("duaDefter.addFromDua"), "toDefter")}</div></div>
  </div>
  <div class="df-toast"${K.attr("toast")}>${K.ic("check")}<small>${K.Le("duaDefter.addedTo", { name: K.L("duaDefter.section.namaz") })}</small><b>${K.Le("duaDefter.openDefter")}</b></div>`;
}

/** "Defterime ekle" penceresi: Hangi bolume? */
function bolumSecP(K) {
  const r = (ad, key) => `<div class="df-pick"${K.attr(key)}>${K.ic("dfFolder")}<b>${K.e(ad)}</b></div>`;
  return `<div class="sheet df-sheet"><i class="grab"></i><b class="df-st">${K.Le("duaDefter.addFromDua")}</b><small class="df-lb">${K.Le("duaDefter.pickSection")}</small>
    ${r(K.L("duaDefter.section.namaz"), "pNamaz")}${r(K.L("duaDefter.section.sabah"))}${r(K.L("duaDefter.section.seher"))}${r(K.L("duaDefter.section.kadir"))}
    <small class="df-open">${K.Le("duaDefter.openDefterLong")}</small></div>`;
}

/** Bolum penceresi: ad, Kaydet, Yukari, Asagi, Hatirlatici, Sil. */
function bolumP(K) {
  const b = (ic, ad, key, red) => `<span class="${red ? "red" : ""}"${K.attr(key)}>${K.ic(ic)}<small>${K.e(ad)}</small></span>`;
  return `<div class="sheet df-sheet"><i class="grab"></i><b class="df-st">${K.Le("duaDefter.sectionEdit")}</b><small class="df-lb">${K.Le("duaDefter.sectionNameLabel")}</small>
    ${K.input({ val: K.L("duaDefter.section.namaz") })}${K.bt(K.L("duaDefter.save"), { cls: "blk df-btn" })}
    <div class="df-sbtn">${b("dfUp", K.L("duaDefter.moveUp"))}${b("dfDown", K.L("duaDefter.moveDown"))}${b("dfAlarm", K.L("duaDefter.remind"), "remind")}${b("dfTrash", K.L("duaDefter.delete"), "", true)}</div></div>`;
}

/** Hatirlatici penceresi. */
function hatirlatP(K) {
  const gun = [K.L("practice.dowMon"), K.L("practice.dowTue"), K.L("practice.dowWed"), K.L("practice.dowThu"), K.L("practice.dowFri"), K.L("practice.dowSat"), K.L("practice.dowSun")];
  return `<div class="sheet df-sheet"><i class="grab"></i><b class="df-st">${K.Le("duaDefter.remindTitle", { name: K.L("duaDefter.section.namaz") })}</b><small class="df-hint">${K.Le("duaDefter.remindSub")}</small>
    <div class="df-sw"><b>${K.Le("duaDefter.remind")}</b>${K.tg(false, "rOn")}</div>
    <div class="df-chips">${[K.L("duaDefter.remindEveryDay"), ...gun].map((g, i) => `<span class="df-chip${i === 0 ? " on" : ""}">${K.e(g)}</span>`).join("")}</div>
    <div class="df-sw"><b>${K.Le("duaDefter.remindTime")}</b><span class="df-time">20:30</span></div>
    ${K.bt(K.L("duaDefter.save"), { key: "rSave", cls: "blk df-btn" })}</div>`;
}

/** PDF penceresi. */
function pdfP(K) {
  const ch = (ad, on) => `<span class="df-chip${on ? " on" : ""}">${K.e(ad)}</span>`;
  return `<div class="sheet df-sheet"><i class="grab"></i><b class="df-st">${K.Le("duaDefter.pdfTitle")}</b><small class="df-hint">${K.Le("duaDefter.pdfSub")}</small>
    <div class="df-chips">${ch(K.L("duaDefter.pdfAll"), true)}${ch(K.L("duaDefter.section.namaz"))}${ch(K.L("duaDefter.section.sabah"))}${ch(K.L("duaDefter.section.sevdiklerim"))}</div>
    <div class="df-sw"><b>${K.Le("duaDefter.pdfNames")}</b>${K.tg(false)}</div>
    ${K.bt(K.L("duaDefter.pdfShare"), { key: "pdfShare", cls: "blk df-btn" })}<small class="df-open">${K.Le("duaDefter.pdfPrint")}</small></div>`;
}

const D_ = (K) => DX[K.dil];

export const SAHNE = {
  /** Giris filmi: Dualar -> Dua Defterim -> + -> Sevdiklerim, Annem, dua -> Kaydet -> satir -> Okumaya basla -> Bugun dua ettim. */
  "film-defter": (K) => K.telefon({
    size: "lg", tema: "koyu",
    aria: `${K.L("read.duasTitle")} › ${K.L("duaDefter.title")} › ${K.L("duaDefter.add")} › ${K.L("duaDefter.save")} › ${K.L("duaDefter.read")} › ${K.L("duaDefter.markPrayed")}`,
    views: [["d", dualar(K)], ["f", defter(K, { n: 19, prayed: false, yeni: true, sub: "next" }), "push"], ["o", okuma(K), "push"]],
    overlays: [["e", ekleP(K), "sheet"]],
    tl: [["w", 900], ["tap", "entry"], ["go", "f"], ["w", 800], ["tap", "add"], ["ov", "e"], ["w", 500], ["tap", "cSev"], ["off", "cNamaz", "on"], ["on", "cSev", "on"],
      ["tap", "for"], ["type", "for", D_(K).ad], ["tap", "txt"], ["type", "txt", D_(K).dua], ["on", "save", "en"], ["tap", "save"], ["cl", "e"],
      ["off", "newRow", "df-hide"], ["txt", "sub3", K.L("duaDefter.count", { count: 1 })], ["w", 900], ["tap", "read1"], ["go", "o"], ["w", 700], ["y", "rsc", "11"], ["w", 800],
      ["tap", "pray"], ["on", "rPrayed", "on"], ["on", "pray", "df-gone"], ["on", "toast", "on"], ["w", 2600]],
    still: 0, hint: "entry",
  }),

  /** Oku > Dualar > Dua Defterim satiri -> defter (bos). */
  "defter-ac": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("read.duasTitle")} › ${K.L("duaDefter.title")} › ${K.L("duaDefter.emptyTitle")}`,
    views: [["d", dualar(K)], ["f", bosDefter(K), "push"]],
    tl: [["w", 1200], ["tap", "entry"], ["go", "f"], ["w", 2600]],
    still: 0, hint: "entry",
  }),

  /** Dua ekle: bolum sec, kimin icin, dua, Kaydet -> Sevdiklerim'de yeni satir. */
  "defter-yaz": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("duaDefter.addTitle")} › ${K.L("duaDefter.section.sevdiklerim")} › ${K.L("duaDefter.forName", { name: D_(K).ad })} › ${K.L("duaDefter.save")}`,
    views: [["f", defter(K, { yeni: true })]],
    overlays: [["e", ekleP(K), "sheet"]],
    tl: [["w", 800], ["tap", "add"], ["ov", "e"], ["w", 500], ["tap", "cSev"], ["off", "cNamaz", "on"], ["on", "cSev", "on"], ["tap", "for"], ["type", "for", D_(K).ad],
      ["tap", "txt"], ["type", "txt", D_(K).dua], ["on", "save", "en"], ["w", 300], ["tap", "save"], ["cl", "e"], ["y", "dsc", "9"], ["off", "newRow", "df-hide"], ["txt", "sub3", K.L("duaDefter.count", { count: 1 })], ["w", 2600]],
    still: 0, hint: "add",
  }),

  /** Dualar okuyucusundan "Defterime ekle" -> Hangi bolume? -> Namaz sonu -> eklendi. */
  "defter-ekle": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("duaDefter.addFromDua")} › ${K.L("duaDefter.pickSection")} › ${K.L("duaDefter.addedTo", { name: K.L("duaDefter.section.namaz") })}`,
    views: [["r", duaOkuyucu(K)]],
    overlays: [["p", bolumSecP(K), "sheet"]],
    tl: [["w", 1000], ["tap", "toDefter"], ["ov", "p"], ["w", 900], ["tap", "pNamaz"], ["cl", "p"], ["on", "toast", "on"], ["w", 2800]],
    still: 0, hint: "toDefter",
  }),

  /** Okumaya basla -> bolumun dualari -> sonda Bugun dua ettim -> "Allah kabul etsin." */
  "defter-oku": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("duaDefter.read")} › ${K.L("duaDefter.markPrayed")} › ${K.L("emanet.prayedToast")}`,
    views: [["f", defter(K, { prayed: false, sub: "next", n: 19 })], ["o", okuma(K), "push"], ["f2", defter(K, { prayed: true, n: 20 }), "back"]],
    tl: [["w", 900], ["tap", "read1"], ["go", "o"], ["w", 900], ["y", "rsc", "11"], ["w", 900], ["tap", "pray"], ["on", "rPrayed", "on"], ["on", "pray", "df-gone"], ["on", "toast", "on"], ["w", 1800], ["go", "f2"], ["w", 2200]],
    still: 0, hint: "read1",
  }),

  /** Bolumun uc noktasi -> Hatirlatici -> ac, Her gun 20:30 -> Kaydet -> "hatirlatici acik". */
  "defter-hatirlat": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("duaDefter.sectionEdit")} › ${K.L("duaDefter.remind")} › ${K.L("duaDefter.remindEveryDay")} 20:30 › ${K.L("duaDefter.save")}`,
    views: [["f", defter(K)]],
    overlays: [["b", bolumP(K), "sheet"], ["h", hatirlatP(K), "sheet"]],
    tl: [["w", 900], ["tap", "more1"], ["ov", "b"], ["w", 800], ["tap", "remind"], ["cl", "b"], ["ov", "h"], ["w", 700], ["tap", "rOn"], ["on", "rOn", "on"], ["w", 600], ["tap", "rSave"], ["cl", "h"],
      ["txt", "sub1", `${K.L("duaDefter.count", { count: 2 })} · ${K.L("duaDefter.remindOn")}`], ["w", 2400]],
    still: 0, hint: "more1",
  }),

  /** Yazdir simgesi -> PDF ve yazdir -> PDF olarak paylas. */
  "defter-pdf": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("duaDefter.pdfTitle")} › ${K.L("duaDefter.pdfAll")} › ${K.L("duaDefter.pdfShare")}`,
    views: [["f", defter(K)]],
    overlays: [["p", pdfP(K), "sheet"]],
    tl: [["w", 900], ["tap", "pdf"], ["ov", "p"], ["w", 1300], ["tap", "pdfShare"], ["w", 1800]],
    still: 3, hint: "pdfShare",
  }),

  /** Merkez karti: defter; yeni dua satiri belirir, bugunun tanesi dizilir, "Bugun dua ettin". */
  "defter-kart": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("duaDefter.title")}: ${K.L("duaDefter.forName", { name: D_(K).ad })} › ${K.L("duaDefter.prayedToday")}`,
    views: [["f", `<div class="df-kart">${defter(K, { n: 19, prayed: false, yeni: true, sub: "next" })}</div>`]],
    tl: [["w", 900], ["off", "newRow", "df-hide"], ["txt", "sub3", K.L("duaDefter.count", { count: 1 })], ["w", 1500], ["on", "bead", "on"],
      ["txt", "stT", K.L("duaDefter.strand.titleTotal", { count: 20 })], ["txt", "stS", K.L("duaDefter.strand.subDone")], ["on", "prayed", "on"], ["w", 3200]],
    still: 8, hint: "",
  }),
};

export const IKON = {
  dfDots: '<circle cx="5.5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18.5" cy="12" r="1.3" fill="currentColor"/>',
  dfPrint: '<path d="M7 8V3.5h10V8"/><rect x="3.5" y="8" width="17" height="8.5" rx="2"/><path d="M7 14h10v6.5H7z"/>',
  dfMark: '<path d="M7 3.5h10v17l-5-3.6-5 3.6z"/>',
  dfJournal: '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 3.5v17M12 8h4M12 11.5h4"/>',
  dfSearch: '<circle cx="11" cy="11" r="6"/><path d="M15.5 15.5 20 20"/>',
  dfRain: '<path d="M7 14a4 4 0 0 1 .6-8 5 5 0 0 1 9.6 1.4A3.3 3.3 0 0 1 17 14z"/><path d="M9 17l-1 2.5M13 17l-1 2.5M17 17l-1 2.5"/>',
  dfMed: '<rect x="3.5" y="7" width="17" height="12" rx="2"/><path d="M9 7V5h6v2M12 10.5v5M9.5 13h5"/>',
  dfWallet: '<rect x="3.5" y="6" width="17" height="13" rx="2.5"/><path d="M16 12.5h4.5M3.5 9h17"/>',
  dfStorm: '<path d="M7 13a4 4 0 0 1 .6-8 5 5 0 0 1 9.6 1.4A3.3 3.3 0 0 1 17 13"/><path d="M12.5 12l-2 4h3l-2 4"/>',
  dfHeart: '<path d="M12 19.5s-7.5-4.4-7.5-9.6A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.3c0 5.2-7.5 9.6-7.5 9.6z"/>',
  dfSun: '<circle cx="12" cy="12" r="3.8"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6"/>',
  dfPlusC: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/>',
  dfPlay: '<path d="M8 5.5v13l10-6.5z"/>',
  dfText: '<path d="M4 18 9 6l5 12M5.8 14h6.4M15 18l3-7 3 7M15.8 16h4.4"/>',
  dfFolder: '<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>',
  dfUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  dfDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  dfAlarm: '<circle cx="12" cy="13" r="7"/><path d="M12 9.5V13l2.5 1.6M4.5 5.5l3-2.5M19.5 5.5l-3-2.5"/>',
  dfTrash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6"/>',
};

export const CSS = `
  .mp-s .df-hd { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; gap: .4em; padding: .45em 1em .55em; color: var(--a-pri); }
  .mp-s .df-hd > b { font-size: 1em; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 12em; }
  .mp-s .df-bk { display: inline-flex; align-items: center; gap: .1em; min-width: 0; }
  .mp-s .df-bk small { font-size: .9em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .df-hr { display: flex; justify-content: flex-end; gap: .8em; }
  .mp-s .df-hr i { display: grid; place-items: center; }
  .mp-s .df-hr .ic { width: 1.3em; height: 1.3em; }
  .mp-s .df-clip { flex: 1; position: relative; overflow: hidden; }
  .mp-s .df-in { display: flex; flex-direction: column; gap: .55em; padding: .3em 1em 1.2em; }
  .mp-s .df-strand { background: #232326; border: 1px solid #2e2e32; border-radius: 1em; padding: .8em .85em .7em; display: flex; flex-direction: column; gap: .3em; }
  .mp-s .df-strand b { font-size: .9em; }
  .mp-s .df-strand small { color: var(--a-mut); font-size: .7em; }
  .mp-s .df-strand svg { width: 100%; height: auto; display: block; }
  :root[dir="rtl"] .mp-s .df-strand svg { transform: scaleX(-1); }
  .mp-s .df-new { transform-box: view-box; transform: scale(0); transition: transform .5s cubic-bezier(.3, 1.6, .5, 1); }
  .mp-s .df-new.on { transform: scale(1); }
  .mp-s .df-had { background: #1c1c1f; border-radius: 1em; padding: .75em .85em; font-size: .76em; line-height: 1.45; }
  .mp-s .df-pr { display: none; align-items: center; justify-content: center; gap: .3em; color: var(--a-gold); }
  .mp-s .df-pr.on { display: flex; animation: dfin .4s ease both; }
  .mp-s .df-pr .ic { width: 1em; height: 1em; }
  .mp-s .df-pr small { font-size: .74em; font-weight: 600; }
  @keyframes dfin { from { opacity: 0; transform: translateY(.4em); } to { opacity: 1; transform: none; } }
  .mp-s .df-sh { display: flex; align-items: center; gap: .55em; margin-top: .35em; padding: 0 .2em; }
  .mp-s .df-sh > div { flex: 1; min-width: 0; }
  .mp-s .df-sh b { display: block; font-size: .9em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .df-sh small { display: block; color: var(--a-mut); font-size: .66em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .df-read { display: inline-flex; align-items: center; gap: .25em; border: 1px solid var(--a-pri); color: var(--a-pri); border-radius: 1.2em; padding: .25em .6em; flex: 0 1 auto; min-width: 0; }
  .mp-s .df-read .ic { width: .95em; height: .95em; }
  .mp-s .df-read small { font-size: .7em; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .df-pl { color: var(--a-pri); display: grid; place-items: center; flex: none; }
  .mp-s .df-mo { color: var(--a-mut); display: grid; place-items: center; flex: none; }
  .mp-s .df-row { display: flex; align-items: center; gap: .6em; background: #2a2a2d; border-radius: .95em; padding: .7em .8em; }
  .mp-s .df-row > .ic:first-child { color: var(--a-pri); width: 1.05em; height: 1.05em; }
  .mp-s .df-row > .ic:last-child { color: var(--a-mut); width: 1em; height: 1em; margin-inline-start: auto; }
  .mp-s .df-row > div { flex: 1; min-width: 0; }
  .mp-s .df-row b { display: block; font-size: .84em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .df-row small { display: block; color: var(--a-mut); font-size: .7em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .df-row.df-hide { display: none; }
  .mp-s .df-row:not(.df-hide)[data-k="newRow"] { animation: dfnew 1.4s ease both; }
  @keyframes dfnew { 0% { opacity: 0; transform: translateY(.5em); box-shadow: 0 0 0 .25em color-mix(in srgb, var(--a-pri) 50%, transparent); } 30% { opacity: 1; transform: none; } 100% { box-shadow: 0 0 0 0 transparent; } }
  .mp-s .df-empty { display: flex; flex-direction: column; align-items: center; gap: .45em; text-align: center; padding: .8em .8em 0; }
  .mp-s .df-empty > .ic { width: 2.2em; height: 2.2em; color: var(--a-mut); }
  .mp-s .df-empty b { font-size: 1em; }
  .mp-s .df-empty small { color: var(--a-mut); font-size: .76em; line-height: 1.4; }
  .mp-s .bt.df-btn { height: 2.9em; border-radius: .95em; margin-top: .35em; }
  .mp-s .bt.df-btn.df-gone { display: none; }
  .mp-s .df-srch { display: flex; align-items: center; gap: .45em; height: 2.6em; padding: 0 .9em; border-radius: 2em; border: 1px solid var(--a-line); color: var(--a-mut); }
  .mp-s .df-srch small { font-size: .78em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .df-ring { position: relative; width: 12.5em; height: 12.5em; margin: .2em auto; border-radius: 50%; }
  .mp-s .df-ring::before { content: ""; position: absolute; inset: 11%; border-radius: 50%; border: .18em dotted var(--a-line); }
  .mp-s .df-ring > i { position: absolute; width: 2.3em; height: 2.3em; margin: -1.15em 0 0 -1.15em; border-radius: 50%; background: var(--a-card); border: 1px solid var(--a-line); color: var(--a-pri); display: grid; place-items: center; }
  .mp-s .df-ring > i .ic { width: 1.05em; height: 1.05em; }
  .mp-s .df-ring > div { position: absolute; inset: 30%; display: flex; flex-direction: column; justify-content: center; text-align: center; }
  .mp-s .df-ring b { font-size: .8em; line-height: 1.15; }
  .mp-s .df-ring small { font-size: .62em; color: var(--a-mut); }
  .mp-s .df-entry { display: flex; align-items: center; gap: .6em; background: #1c1c1f; border: 1px solid #2a2a2e; border-radius: 1em; padding: .75em .8em; }
  .mp-s .df-entry > .ic:first-child { color: var(--a-pri); }
  .mp-s .df-entry > .ic:last-child { color: var(--a-mut); width: 1em; height: 1em; }
  .mp-s .df-entry div { flex: 1; min-width: 0; }
  .mp-s .df-entry b { display: block; font-size: .86em; }
  .mp-s .df-entry small { display: block; color: var(--a-mut); font-size: .68em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .df-grp { display: flex; align-items: center; gap: .55em; background: #1c1c1f; border-radius: 1em; padding: .7em .8em; }
  .mp-s .df-grp > .ic:first-child { color: var(--a-pri); width: 1.05em; height: 1.05em; }
  .mp-s .df-grp b { flex: 1; font-size: .84em; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .df-grp small { color: var(--a-mut); font-size: .66em; flex: none; }
  .mp-s .df-grp > .ic:last-child { color: var(--a-mut); width: .95em; height: .95em; }
  .mp-s .df-sheet { gap: .45em; padding-bottom: 1.5em; }
  .mp-s .df-st { font-size: 1.05em; }
  .mp-s .df-lb { display: block; color: var(--a-mut); font-size: .7em; margin-top: .3em; }
  .mp-s .df-hint { color: var(--a-mut); font-size: .7em; line-height: 1.4; }
  .mp-s .df-chips { display: flex; flex-wrap: wrap; gap: .3em; }
  .mp-s .df-chip { padding: .38em .7em; border-radius: 1.2em; border: 1px solid var(--a-line); font-size: .7em; font-weight: 600; white-space: nowrap; transition: background .25s ease, color .25s ease; }
  .mp-s .df-chip.on { background: var(--a-pri); border-color: var(--a-pri); color: var(--a-on); }
  .mp-s .df-lr { display: flex; justify-content: space-between; align-items: flex-end; gap: .5em; }
  .mp-s .df-paste { display: inline-flex; align-items: center; gap: .25em; color: var(--a-pri); font-size: .68em; font-weight: 600; white-space: nowrap; }
  .mp-s .df-paste .ic { width: 1.1em; height: 1.1em; }
  .mp-s .df-sheet .in.ta { min-height: 3.6em; white-space: normal; }
  .mp-s .df-more { display: inline-flex; align-items: center; gap: .3em; color: var(--a-pri); }
  .mp-s .df-more .ic { width: 1.1em; height: 1.1em; }
  .mp-s .df-more small { font-size: .72em; font-weight: 600; }
  .mp-s .df-rd { display: flex; flex-direction: column; padding: 0 1.2em 4em; }
  .mp-s .df-blk { display: flex; flex-direction: column; gap: .45em; padding: 1em 0; border-top: 1px solid var(--a-line); }
  .mp-s .df-blk:first-child { border-top: 0; padding-top: .4em; }
  .mp-s .df-bh { color: var(--a-pri); font-size: .9em; }
  .mp-s .df-ar { font-weight: 400; font-size: 1.35em; line-height: 1.9; text-align: center; }
  .mp-s .df-ar.big { font-size: 1.4em; }
  .mp-s .df-mean { font-size: .95em; line-height: 1.45; }
  .mp-s .df-src { color: var(--a-mut); font-size: .68em; }
  .mp-s .df-lines { display: grid; gap: .55em; padding: .4em 0; }
  .mp-s .df-lines i { display: block; height: .55em; border-radius: .3em; background: color-mix(in srgb, var(--a-ink) 22%, transparent); }
  .mp-s .df-end { display: flex; flex-direction: column; align-items: stretch; gap: .5em; border-top: 1px solid var(--a-line); padding-top: 1em; text-align: center; }
  .mp-s .df-end > small { color: var(--a-mut); font-size: .72em; line-height: 1.4; }
  .mp-s .df-close { color: var(--a-pri); font-size: .8em; font-weight: 600; }
  .mp-s .df-bar { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; gap: .9em; padding: .55em 1.1em 1.4em; border-top: 1px solid var(--a-line); background: var(--a-bg); color: var(--a-pri); }
  .mp-s .df-bar .a1 { font-size: .85em; } .mp-s .df-bar .a2 { font-size: 1.2em; }
  .mp-s .df-bar span { margin-inline-start: auto; display: inline-flex; align-items: center; gap: .3em; border: 1px solid var(--a-pri); border-radius: 1.2em; padding: .3em .75em; }
  .mp-s .df-bar span small { font-size: .74em; font-weight: 600; }
  .mp-s .df-bar .ic { width: .95em; height: .95em; }
  .mp-s .df-toast { position: absolute; z-index: 8; left: .9em; right: .9em; bottom: 5.2em; display: flex; align-items: center; gap: .5em; padding: .7em .9em; border-radius: 1em; background: #2c2c30; box-shadow: 0 .6em 1.4em -.6em rgba(0, 0, 0, .6); opacity: 0; transform: translateY(1em); transition: opacity .35s ease, transform .4s cubic-bezier(.2, 1.1, .3, 1); }
  .mp-s .df-toast.on { opacity: 1; transform: none; }
  .mp-s .df-toast .ic { color: var(--a-gold); width: 1.1em; height: 1.1em; }
  .mp-s .df-toast small { flex: 1; font-size: .76em; min-width: 0; }
  .mp-s .df-toast b { color: var(--a-pri); font-size: .76em; flex: none; }
  .mp-s .df-card { background: #1c1c1f; border-radius: 1.1em; padding: 1em .95em; display: flex; flex-direction: column; gap: .6em; }
  .mp-s .df-meanrow { display: flex; gap: .55em; }
  .mp-s .df-meanrow i { width: .2em; border-radius: .2em; background: var(--a-gold); flex: none; }
  .mp-s .df-meanrow small { font-size: .84em; line-height: 1.45; }
  .mp-s .df-card .df-src { display: flex; gap: .4em; align-items: flex-start; line-height: 1.35; }
  .mp-s .df-card .df-src .ic { width: 1em; height: 1em; flex: none; }
  .mp-s .df-card .df-src em { font-style: normal; color: var(--a-pri); }
  .mp-s .df-acts { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: .2em; border-top: 1px solid var(--a-line); padding-top: .7em; }
  .mp-s .df-acts span { display: flex; flex-direction: column; align-items: center; gap: .3em; text-align: center; border-radius: .7em; padding: .2em 0; min-width: 0; }
  .mp-s .df-acts i { width: 2.2em; height: 2.2em; border-radius: 50%; background: var(--a-soft); color: var(--a-pri); display: grid; place-items: center; }
  .mp-s .df-acts .ic { width: 1.05em; height: 1.05em; }
  .mp-s .df-acts small { font-size: .56em; color: var(--a-mut); line-height: 1.2; max-width: 100%; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .mp-s .df-pick { display: flex; align-items: center; gap: .6em; padding: .65em .2em; border-top: 1px solid var(--a-line); border-radius: .5em; }
  .mp-s .df-pick .ic { color: var(--a-pri); width: 1.1em; height: 1.1em; }
  .mp-s .df-pick b { font-size: .86em; }
  .mp-s .df-open { display: block; text-align: center; color: var(--a-pri); font-size: .78em; font-weight: 600; margin-top: .3em; }
  .mp-s .df-sbtn { display: flex; justify-content: space-between; gap: .2em; margin-top: .4em; }
  .mp-s .df-sbtn span { flex: 1; display: flex; flex-direction: column; align-items: center; gap: .25em; color: var(--a-pri); text-align: center; border-radius: .6em; padding: .2em 0; min-width: 0; }
  .mp-s .df-sbtn span.red { color: var(--a-red); }
  .mp-s .df-sbtn small { font-size: .62em; font-weight: 600; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mp-s .df-sw { display: flex; align-items: center; justify-content: space-between; gap: .6em; padding: .35em 0; }
  .mp-s .df-sw b { font-size: .82em; min-width: 0; }
  .mp-s .df-time { background: var(--a-in); border-radius: .5em; padding: .3em .6em; font-weight: 700; font-size: .84em; }
  .mp-s .df-kart { display: contents; }
  .mp-s .df-kart .df-strand { padding: 1em .9em .9em; }
  .mp-s .df-kart .df-strand b { font-size: 1.02em; }
  @media (prefers-reduced-motion: reduce) { .mp-s .df-pr.on, .mp-s .df-row[data-k="newRow"] { animation: none; } }
`;
