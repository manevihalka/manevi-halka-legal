/**
 * Ayetli video rehberinin ekranlari (21 Kas 2026, 2.1.0).
 * Akislar uygulamanin kodundan izlendi (salt okunur, SpiritualCircleApp):
 *   components/quranVideo/VideoExportScreen.tsx  kurma ekrani: onizleme, Bicim (9:16 · 4:5 · 1:1), Ayet araligi
 *                                                (sure + Ilk/Son ayet, 90 sn / 30 ayet), Sahne, Meal altyazisi, Tilavet
 *                                                (Kari | Kendi sesim), altta "Videoyu olustur"; bitince "Videon hazir"
 *                                                (Paylas, Fotograflar'a kaydet, Yeni video, Urettigin videolar)
 *   components/quranVideo/OwnVoiceRecorder.tsx   kendi sesin: Kayda basla, Sonraki ayet, Bitir, Bastan al
 *   components/quranVideo/VideoRenderView.tsx    hazirlama: onizleme kutusu + ilerleme paneli + Vazgec
 *   components/quranVideo/VerseVideoList.tsx     liste satiri: kucuk resim, "Mulk 1-2", sahne · bicim · sure · boyut · gun,
 *                                                Paylas, kaydet, sil
 *   components/quranVideo/VideoEntryCard.tsx     Kur'an > Dinle sekmesindeki "Ayetli video" karti
 *   components/quranReader/sheets/VerseSheet.tsx ayet menusu: "Video olarak paylas · Sesiyle, 9:16 · 4:5 · 1:1"
 * Renkler videoUi.tsx V (bg #0b1513, kart #12201d, altin #E3C68D). Premium hicbir ekranda gorunmez.
 * Kur'an metni yalniz besmele ve Mulk 1 (uygulamanin ornek araligi Mulk 1-2); geri kalan satirlar soyut cizgi.
 * Cevsen YOK. Uzun tire YOK.
 */

const BESMELE = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ";
const MULK1 = "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ";

/** Dile gore ornek veriler (sure adlari lib/surahNames.ts ve assets/data/surahs.json ile ayni). Uygulama metni DEGIL. */
const VO = {
  tr: { mulk: "Mülk", yasin: "Yâsîn", list: ["Talâk", "Tahrîm", "Mülk", "Kalem", "Hâkka"], mb: "4,2 MB", mb2: "6,8 MB",
    reciters: ["Mishari Rashid al‘Afasy", "Mahmoud Khalil Al-Husary", "AbdulBaset AbdulSamad", "Mohamed Siddiq al-Minshawi", "Abu Bakr al-Shatri"] },
  en: { mulk: "Al-Mulk", yasin: "Ya-Sin", list: ["At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah"], mb: "4.2 MB", mb2: "6.8 MB",
    reciters: ["Mishari Rashid al‘Afasy", "Mahmoud Khalil Al-Husary", "AbdulBaset AbdulSamad", "Mohamed Siddiq al-Minshawi", "Abu Bakr al-Shatri"] },
  de: { mulk: "Al-Mulk", yasin: "Ya-Sin", list: ["At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah"], mb: "4,2 MB", mb2: "6,8 MB",
    reciters: ["Mishari Rashid al‘Afasy", "Mahmoud Khalil Al-Husary", "AbdulBaset AbdulSamad", "Mohamed Siddiq al-Minshawi", "Abu Bakr al-Shatri"] },
  fr: { mulk: "Al-Mulk", yasin: "Ya-Sin", list: ["At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah"], mb: "4,2 MB", mb2: "6,8 MB",
    reciters: ["Mishari Rashid al‘Afasy", "Mahmoud Khalil Al-Husary", "AbdulBaset AbdulSamad", "Mohamed Siddiq al-Minshawi", "Abu Bakr al-Shatri"] },
  ar: { mulk: "الملك", yasin: "يس", list: ["الطلاق", "التحريم", "الملك", "القلم", "الحاقة"], mb: "4,2 MB", mb2: "6,8 MB",
    reciters: ["مشاري راشد العفاسي", "محمود خليل الحصري", "عبد الباسط عبد الصمد", "محمد صديق المنشاوي", "أبو بكر الشاطري"] },
};
const AYAHS = [12, 12, 30, 52, 52];

// ── kucuk parcalar ────────────────────────────────────────────────────────────
const rng = (K, a, b, s) => K.L("quranVideo.rangeMany", { name: s || VO[K.dil].mulk, a, b });
const est = (K, time, n) => K.L("quranVideo.estimate", { time, n });
/** Koyu video ekrani: durum cubugunun altina da uzanir (.lock), renkler V paleti (.avv). */
const koyu = (html, cls = "") => `<div class="lock avd avv${cls ? " " + cls : ""}">${html}</div>`;

function vHd(K, { title, sub, film = true, subKey } = {}) {
  return `<div class="avd-hd"><span class="avd-rb">${K.ic("x")}</span><div class="avd-ht"><b>${K.e(title)}</b>${sub ? `<small${K.attr(subKey)}>${K.e(sub)}</small>` : ""}</div><span class="avd-rb">${film ? K.ic("avFilm") : ""}</span></div>`;
}

/** Onizleme kutusu (Ay ve deniz sahnesi): kunye, besmele, meal cizgileri, ay, imza. r: "" (9:16) | "r45" | "r11". */
function onizleme(K, { r = "", key = "pv", ink = false } = {}) {
  const kunye = `${K.L("quranReader.surahTitle", { name: VO[K.dil].mulk })} · ${K.L("quranScenes.basmala")}`;
  return `<div class="avd-pv${r ? " " + r : ""}${ink ? " ink" : ""}"${K.attr(key)}>
      <i class="avd-sky"></i><i class="avd-moon"></i><i class="avd-glow"></i>
      <small class="avd-kn">${K.e(kunye)}</small>
      <div class="avd-tx"><b class="avd-ar" dir="rtl" lang="ar">${BESMELE}</b><i class="avd-ml"></i><i class="avd-ml s"></i></div>
      <span class="avd-sig">${K.brand()}<b>Manevi Halka</b></span>
    </div>`;
}

const ipuclari = (K) => ({ "916": K.L("quranVideo.formatHint.tall"), "45": K.L("quranVideo.formatHint.portrait"), "11": K.L("quranVideo.formatHint.square") });
function bicimKartlari(K, sec = "916") {
  const k = (id, cls, oran, ad) => `<span class="avd-f${sec === id ? " on" : ""}"${K.attr("f" + id)}><i class="avd-shp ${cls}"></i><b>${K.num(oran)}</b><small>${ad}</small></span>`;
  return `<b class="avd-sec">${K.Le("quranVideo.sectionFormat")}</b>
    <div class="avd-fm">${k("916", "r916", "9:16", K.Le("quranVideo.formatName.tall"))}${k("45", "r45", "4:5", K.Le("quranVideo.formatName.portrait"))}${k("11", "r11", "1:1", K.Le("quranVideo.formatName.square"))}</div>
    <small class="avd-hint"${K.attr("fhint")}>${K.e(ipuclari(K)[sec])}</small>`;
}

function aralik(K, { to = 2 } = {}) {
  const art = `<i class="avd-sb">${K.ic("avMinus")}</i>`, ekle = (key) => `<i class="avd-sb"${K.attr(key)}>${K.ic("plus")}</i>`;
  return `<b class="avd-sec">${K.Le("quranVideo.sectionRange")}</b>
    <div class="avd-row">${K.ic("book")}<span>${K.e(K.L("quranReader.surahTitle", { name: VO[K.dil].mulk }))}</span><b${K.attr("chg")}>${K.Le("quranVideo.change")}</b></div>
    <div class="avd-st2">
      <div class="avd-st"><small>${K.Le("quranVideo.fromAyah")}</small><div>${art}<b>${K.num("1")}</b>${ekle("")}</div></div>
      <div class="avd-st"><small>${K.Le("quranVideo.toAyah")}</small><div>${art}<b${K.attr("toV")}>${K.num(String(to))}</b>${ekle("toPlus")}</div></div>
    </div>`;
}

const stilAdi = (K, id) => ({ manzara: K.L("quranScenes.styles.manzara"), ink: K.L("quranScenes.styles.ink"), kubbe: K.L("quranScenes.styles.kubbe"), pastel: K.L("quranScenes.styles.pastel") })[id];
function sahneKarolari(K, sec = "manzara") {
  const t = (id, key) => `<span class="avd-tl${sec === id ? " on" : ""}"${K.attr(key)}><i class="avd-tla ${id}"></i><small>${K.e(stilAdi(K, id))}</small></span>`;
  return `<b class="avd-sec">${K.Le("quranScenes.sectionStyle")}</b>
    <div class="avd-tiles">${t("manzara", "stM")}${t("ink", "stI")}${t("kubbe", "")}${t("pastel", "")}</div>`;
}

function mealBolumu(K) {
  return `<div class="avd-secr"><b class="avd-sec">${K.Le("quranVideo.sectionMeal")}</b>${K.tg(true)}</div>
    <div class="avd-chips"><span class="avd-chip on">${K.Le("quranScenes.textMode.verseMeal")}</span><span class="avd-chip">${K.Le("quranScenes.textMode.meal")}</span></div>`;
}

/** Tilavet: Kari | Kendi sesim; altinda kari satiri, "Sesini kaydet" ya da kaydin satiri (kapsayicinin sinifiyla). */
function tilavet(K, { hal = "" } = {}) {
  const O = VO[K.dil];
  return `<b class="avd-sec">${K.Le("quranVideo.sectionVoice")}</b>
    <div class="avd-voice${hal ? " " + hal : ""}"${K.attr("voice")}>
      <div class="avd-chips"><span class="avd-chip avd-cr"${K.attr("vRec")}>${K.ic("person")}${K.Le("quranVideo.sectionReciter")}</span><span class="avd-chip avd-co"${K.attr("vOwn")}>${K.ic("avMic")}${K.Le("quranVideo.voice.own")}</span></div>
      <div class="avd-row avd-rrec">${K.ic("avMic")}<span${K.attr("recName")}>${K.e(O.reciters[0])}</span><b${K.attr("recChg")}>${K.Le("quranVideo.change")}</b></div>
      <div class="avd-row avd-rown"${K.attr("ownRow")}>${K.ic("avMic")}<span>${K.Le("quranVideo.voice.record")}</span>${K.ic("chev", "fl")}</div>
      <div class="avd-row avd-rtake"><i class="avd-play">${K.ic("avPlay")}</i><span>${K.e(K.L("quranVideo.voice.take", { time: "0:24" }))}</span><b>${K.Le("quranVideo.voice.again")}</b></div>
    </div>`;
}

function ctaAlt(K, { label, icon = "avFilm", key = "make", labelKey } = {}) {
  return `<div class="avd-cta"><span class="bt blk avd-gold"${K.attr(key)}>${K.ic(icon)}<span${K.attr(labelKey)}>${K.e(label || K.L("quranVideo.make"))}</span></span></div>`;
}

/** Kurma ekrani (Video olustur). sec: secili bicim; hal: tilavet durumu ("" | "own" | "own take"). */
function kurma(K, { sec = "916", to = 2, hal = "", stil = "manzara", ctaKey = "make", ctaLabelKey = "" } = {}) {
  const r = sec === "45" ? "r45" : sec === "11" ? "r11" : "";
  const n = to;
  const time = { 1: "0:16", 2: "0:29", 3: "0:41", 4: "0:58" }[to] || "0:29";
  return koyu(`${vHd(K, { title: K.L("quranVideo.title"), sub: rng(K, 1, to), subKey: "hsub" })}
    <div class="avd-clip"><div class="avd-in sc"${K.attr("sc")}>
      <div class="avd-pvw">${onizleme(K, { r, ink: stil === "ink" })}<small class="avd-est"${K.attr("est")}>${K.e(est(K, time, n))}</small></div>
      ${bicimKartlari(K, sec)}
      ${aralik(K, { to })}
      ${sahneKarolari(K, stil)}
      ${mealBolumu(K)}
      ${tilavet(K, { hal })}
    </div></div>
    ${ctaAlt(K, { key: ctaKey, labelKey: ctaLabelKey || "makeT" })}`);
}

/** Sure secme penceresi (alttan): 65-69, Mulk secili. */
function sureSecici(K) {
  const O = VO[K.dil];
  return `<div class="sheet avv avd-sheet"><i class="grab"></i><b class="avd-shh">${K.Le("quranVideo.pickSurah")}</b>
    ${O.list.map((ad, i) => `<div class="avd-sr${i === 2 ? " on" : ""}"${i === 2 ? K.attr("sMulk") : ""}><small>${K.num(String(65 + i))}</small><b>${K.e(ad)}</b><small>${K.e(K.L("quranVideo.ayahCount", { n: AYAHS[i] }))}</small></div>`).join("")}
  </div>`;
}

/** Kari secme penceresi (okuyucudakiyle ayni liste; secim yalniz videoya ait). */
function kariSecici(K) {
  const O = VO[K.dil];
  return `<div class="sheet avv avd-sheet"><i class="grab"></i><div class="avd-shr"><b class="avd-shh">${K.Le("quranAudio.chooseReciter")}</b>${K.ic("x")}</div>
    <div class="avd-rl">${O.reciters.map((ad, i) => `<div class="avd-ri${i === 0 ? " on" : ""}"${K.attr("rc" + i)}><i class="avd-rad"></i><span>${K.e(ad)}</span></div>`).join("")}</div>
  </div>`;
}

/** Kendi sesin kayit ekrani: adim satiri, ayet karti, bilgi (once) ya da canli kayit, dugmeler. */
function kayit(K) {
  const bars = Array.from({ length: 11 }, (_, i) => `<i style="--d:${(i * 0.13) % 0.9}s"></i>`).join("");
  return koyu(`${vHd(K, { title: K.L("quranVideo.voice.title"), sub: rng(K, 1, 2), film: false })}
    <div class="avd-recw"${K.attr("recw")}>
      <div class="avd-step"><b${K.attr("stepL")}>${K.Le("quranScenes.basmala")}</b><small${K.attr("stepN")}>${K.num("1/3")}</small></div>
      <div class="avd-card"><b class="avd-car" dir="rtl" lang="ar"${K.attr("ayah")}>${BESMELE}</b></div>
      <div class="avd-info">
        <div>${K.ic("hand")}<small>${K.e(K.L("quranVideo.voice.intro"))}</small></div>
        <div>${K.ic("avPhone")}<small>${K.Le("quranVideo.voice.privacy")}</small></div>
      </div>
      <div class="avd-live"><span class="avd-lv"><i class="avd-dot"></i><b${K.attr("clock")}>${K.num("0:00")}</b><span class="avd-bars">${bars}</span></span>
        <small${K.attr("up")}>${K.e(K.L("quranVideo.voice.upNext", { what: K.L("quranScenes.ayahN", { n: 1 }) }))}</small></div>
      <div class="avd-ctl">
        <span class="bt blk avd-gold avd-b1"${K.attr("recStart")}>${K.ic("avMic")}<span>${K.Le("quranVideo.voice.start")}</span></span>
        <span class="bt blk avd-gold avd-b2"${K.attr("recNext")}><span>${K.Le("quranVideo.voice.next")}</span></span>
        <span class="avd-ghost avd-b2">${K.ic("avRedo")}${K.Le("quranVideo.voice.restart")}</span>
      </div>
    </div>`);
}

/** Hazirlama: onizleme kutusu (secilen bicimde) + ilerleme paneli. */
function hazirlama(K, { r = "r45" } = {}) {
  return koyu(`<div class="avd-rbox">${onizleme(K, { r, key: "" })}</div>
    <div class="avd-panel">
      <b${K.attr("phase")}>${K.Le("quranVideo.phaseAudio")}</b>
      <i class="avd-pbar"><i${K.attr("pfill")}></i></i>
      <small${K.attr("pct")}>${K.e(K.L("quranVideo.progressPct", { pct: 4 }))}</small>
      <small class="avd-stay">${K.Le("quranVideo.stayHere")}</small>
      <span class="avd-sec2">${K.ic("x")}${K.Le("quranVideo.cancel")}</span>
    </div>`);
}

/** Videon hazir: oynatici, Paylas, Fotograflar'a kaydet, Yeni video | Urettigin videolar. */
function hazir(K, { r = "r45", oran = "4:5" } = {}) {
  const sub = `${rng(K, 1, 2)} · ${oran} · 0:29 · ${VO[K.dil].mb}`;
  return koyu(`${vHd(K, { title: K.L("quranVideo.readyTitle"), sub, film: false })}
    <div class="avd-done">
      <div class="avd-player">${onizleme(K, { r, key: "" })}<span class="avd-ctr">${K.ic("avPlay")}<i class="avd-seek"><i></i></i><small>${K.num("0:00")}</small></span></div>
      <span class="bt blk avd-gold"${K.attr("share")}>${K.ic("share")}<span>${K.Le("quranVideo.share")}</span></span>
      <span class="bt blk avd-gray"${K.attr("save")}>${K.ic("avDl")}<span>${K.Le("quranVideo.saveToPhotos")}</span></span>
      <div class="avd-gh2"><span>${K.ic("plus")}${K.Le("quranVideo.newVideo")}</span><span${K.attr("mine")}>${K.ic("avFilm")}${K.Le("quranVideo.myVideos")}</span></div>
      <small class="avd-toast"${K.attr("toast")}>${K.ic("checkCircle")}${K.Le("quranVideo.savedPhotos")}</small>
    </div>`);
}

/** Sistemin paylasim penceresi (yalniz video dosyasi ve uygulamalar; metin yok). */
function paylasim(K) {
  return `<div class="sheet avd-share"><div class="avd-shf"><i class="avd-thumb r45"></i><div><b>${K.e(rng(K, 1, 2))}</b><small>MP4 · ${VO[K.dil].mb}</small></div></div>
    <div class="sh-apps">${K.X.shareApps.map((a, i) => `<span><i class="sa sa${i}">${K.ic(["chat", "chat", "mail", "send"][i])}</i><small>${K.e(a)}</small></span>`).join("")}</div></div>`;
}

/** Urettigin videolar: iki satir. */
function liste(K) {
  const O = VO[K.dil];
  const satir = (s, a, b, stil, oran, sure, mb, thumb) => `<div class="avd-li"><span class="avd-thumb ${thumb}"><i>${K.ic("avPlay")}</i></span><div>
      <b>${K.e(K.L("quranVideo.rangeMany", { name: s, a, b }))}</b>
      <small>${K.e([stilAdi(K, stil), oran, sure, mb, K.L("quranArea.recentToday")].join(" · "))}</small>
      <div class="avd-acts"><span${a === 1 && s === O.mulk ? K.attr("lshare") : ""}>${K.ic("share")}${K.Le("quranVideo.share")}</span><i>${K.ic("avDl")}</i><i>${K.ic("avTrash")}</i></div>
    </div></div>`;
  return koyu(`<div class="avd-hd"><span class="avd-rb">${K.ic("x")}</span><div class="avd-ht"><b>${K.Le("quranVideo.myVideos")}</b></div><span class="avd-rb"></span></div>
    <div class="avd-list">${satir(O.mulk, 1, 2, "manzara", "4:5", "0:29", O.mb, "r45")}${satir(O.yasin, 1, 5, "ink", "9:16", "0:52", O.mb2, "ink")}</div>
    <small class="avd-note">${K.Le("quranVideo.storageNote")}</small>`);
}

// ── acik (ocean) ekranlar: giris ──────────────────────────────────────────────

/** Kur'an > Dinle sekmesi: kaldigin yerden dinle, dinleme sahneleri, Ayetli video karti, alttaki sekme kapsulu. */
function dinleSekmesi(K) {
  const tl = (c) => `<i class="avd-dt ${c}"></i>`;
  const sek = [["book", K.L("quranArea.tabRead")], ["avHead", K.L("quranArea.tabListen")], ["cap", K.L("quranArea.tabStudy")], ["avBkm", K.L("saved.title")]];
  return `<div class="avd-ah"><span class="avd-ab">${K.ic("back", "fl")}</span><div><small>Manevi Halka</small><b>${K.Le("quranArea.tabListen")}</b></div><span class="avd-ab">${K.ic("avSearch")}</span><span class="avd-ab">${K.ic("avGear")}</span></div>
    <div class="pg avd-dpg">
      <div class="cd avd-dres"><small class="gr">${K.Le("quranArea.listenFromResume")}</small><b>${K.e(K.L("quranReader.surahTitle", { name: VO[K.dil].mulk }))}</b>${K.bt(K.L("quranAudio.listen"), { cls: "sm pill", icon: "avPlay" })}</div>
      <b class="avd-dsec">${K.Le("quranScenes.entryTitle")}</b>
      <div class="cd avd-dsc"><div class="avd-dts">${tl("m")}${tl("i")}${tl("k")}${tl("p")}</div></div>
      <b class="avd-dsec">${K.Le("quranVideo.entryTitle")}</b>
      <div class="cd avd-dvid"${K.attr("vcard")}><small>${K.Le("quranVideo.entryBody")}</small>${K.bt(K.L("quranVideo.title"), { key: "vbtn", cls: "sm pill", icon: "avFilm" })}</div>
    </div>
    <nav class="avd-atab">${sek.map(([ic, ad], i) => `<span class="${i === 1 ? "on" : ""}">${K.ic(ic)}<small>${K.e(ad)}</small></span>`).join("")}</nav>`;
}

/** Okuyucu (sepya, soyut sayfa): bir ayet vurgulu. */
function okuyucu(K) {
  const satirlar = [96, 90, 98, 86, 94, 92, 88, 97, 91, 70];
  return `<div class="avd-rd"><div class="avd-rdh"><span>${K.ic("back", "fl")}</span><b>${K.e(VO[K.dil].mulk)}</b><span>${K.ic("avSearch")}</span></div>
      <div class="avd-rdp" aria-hidden="true"><i class="avd-rdf"></i>${satirlar.map((w, i) => `<i class="${i === 2 || i === 3 ? "hl" : ""}" style="--w:${w}%"${i === 2 ? K.attr("ayet") : ""}></i>`).join("")}</div></div>`;
}

/** Ayet menusu (alttan): baslik, soyut ayet ve meal, alti eylem, satirlar; en altta Video olarak paylas. */
function ayetMenusu(K) {
  const ey = [["avHead", K.L("quranReader.actListen")], ["avHeart", K.L("quranReader.actSave")], ["edit", K.L("quranReader.actNote")], ["copy", K.L("quranReader.actCopy")], ["share", K.L("quranReader.actShare")], ["avBkm", K.L("quranReader.actBookmark")]];
  return `<div class="sheet avd-vs"><i class="grab"></i>
    <div class="avd-vsh"><span>${K.ic("chev", "rot")}</span><b>${K.e(VO[K.dil].mulk)} · ${K.Le("quranScenes.ayahN", { n: 1 })}</b><span>${K.ic("chev")}</span></div>
    <div class="avd-vsa" aria-hidden="true"><i style="--w:96%"></i><i style="--w:58%"></i></div>
    <div class="avd-vsm" aria-hidden="true"><i style="--w:92%"></i><i style="--w:64%"></i></div>
    <div class="avd-vse">${ey.map(([ic, ad]) => `<span>${K.ic(ic)}<small>${K.e(ad)}</small></span>`).join("")}</div>
    <div class="avd-vsr">${K.ic("cap")}<b>${K.Le("quranReader.actWordStudy")}</b></div>
    <div class="avd-vsr">${K.ic("bookClosed")}<b>${K.Le("duaDefter.addFromDua")}</b></div>
    <div class="avd-vsr"${K.attr("asVideo")}>${K.ic("avCam")}<b>${K.Le("quranVideo.shareAsVideo")}</b><small>${K.Le("quranVideo.shareAsVideoSub")}</small></div>
  </div>`;
}

/** Merkez karti: iri onizleme, uc iri bicim karti, altin dugme. */
function kartEkrani(K) {
  const k = (id, cls, oran) => `<span class="avk-f${id === "916" ? " on" : ""}"${K.attr("k" + id)}><i class="avd-shp ${cls}"></i><b>${K.num(oran)}</b></span>`;
  return koyu(`<div class="avk-h"><b>${K.Le("quranVideo.title")}</b></div>
    <div class="avk-pvw">${onizleme(K, { key: "kpv" })}</div>
    <div class="avk-fm">${k("916", "r916", "9:16")}${k("45", "r45", "4:5")}${k("11", "r11", "1:1")}</div>
    <span class="bt blk avd-gold avk-cta"${K.attr("kmake")}>${K.ic("avFilm")}<span>${K.Le("quranVideo.make")}</span></span>
    <i class="avk-bar"><i${K.attr("kfill")}></i></i>`);
}

// ── zaman cizelgesi parcalari ─────────────────────────────────────────────────
const tlBicim = (K, id, r) => [["tap", "f" + id], ["off", "f916", "on"], ["off", "f45", "on"], ["off", "f11", "on"], ["on", "f" + id, "on"],
  ["off", "pv", "r45"], ["off", "pv", "r11"], ...(r ? [["on", "pv", r]] : []), ["txt", "fhint", ipuclari(K)[id]]];
const tlHazirla = (K) => [["txt", "pct", K.L("quranVideo.progressPct", { pct: 38 })], ["st", "pfill", "width", "38%"], ["w", 700],
  ["txt", "phase", K.L("quranVideo.phaseFrames")], ["st", "pfill", "width", "64%"], ["txt", "pct", K.L("quranVideo.progressLeft", { pct: 64, left: "0:12" })], ["w", 900],
  ["st", "pfill", "width", "92%"], ["txt", "pct", K.L("quranVideo.progressLeft", { pct: 92, left: "0:02" })], ["w", 800]];

// Zaman cizelgesi tek tirnakli data-tl niteligine yazilir (sahne.mjs e() tek tirnagi kacirmaz): "txt" metinlerindeki
// duz kesme isareti tipografik olana cevrilir ("Cuma'ya" -> "Cuma’ya"), yoksa nitelik bozulur.
const tlx = (tl) => tl.map((s) => (s[0] === "txt" ? [s[0], s[1], String(s[2]).replace(/'/g, "\u2019")] : s));
const tel = (K, o) => K.telefon({ ...o, tl: tlx(o.tl || []) });

export const SAHNE = {
  /** Giris filmi: kurma ekrani -> 4:5 -> asagi -> Videoyu olustur -> hazirlama -> Videon hazir -> Paylas. */
  "film-video": (K) => tel(K, {
    size: "lg", tema: "koyu",
    aria: `${K.L("quranVideo.title")} › ${K.L("quranVideo.formatName.portrait")} › ${K.L("quranVideo.make")} › ${K.L("quranVideo.readyTitle")} › ${K.L("quranVideo.share")}`,
    views: [["k", kurma(K)], ["h", hazirlama(K), "fade"], ["d", hazir(K), "fade"]],
    overlays: [["sh", paylasim(K), "sheet"]],
    tl: [["w", 1100], ...tlBicim(K, "45", "r45"), ["w", 1300], ["y", "sc", "16"], ["w", 1100], ["tap", "make"], ["go", "h"], ["w", 500],
      ...tlHazirla(K), ["go", "d"], ["w", 1400], ["tap", "share"], ["ov", "sh"], ["w", 2400]],
    still: 0, hint: "f45",
  }),

  /** Kur'an > Dinle: Ayetli video karti -> Video olustur -> kurma ekrani. */
  "video-giris": (K) => tel(K, {
    aria: `${K.L("quranArea.tabListen")} › ${K.L("quranVideo.entryTitle")} › ${K.L("quranVideo.title")}`,
    views: [["a", dinleSekmesi(K)], ["k", kurma(K), "push"]],
    tl: [["w", 1200], ["tap", "vbtn"], ["go", "k"], ["w", 2600]],
    still: 0, hint: "vbtn",
  }),

  /** Okuyucu: ayete basili tut -> ayet menusu -> Video olarak paylas -> kurma ekrani. */
  "video-ayet": (K) => tel(K, {
    aria: `${K.L("quranScenes.ayahN", { n: 1 })} › ${K.L("quranVideo.shareAsVideo")} › ${K.L("quranVideo.title")}`,
    views: [["r", okuyucu(K)], ["k", kurma(K, { to: 1 }), "up"]],
    overlays: [["m", ayetMenusu(K), "sheet"]],
    tl: [["w", 900], ["tap", "ayet"], ["ov", "m"], ["w", 1300], ["tap", "asVideo"], ["cl", "m"], ["go", "k"], ["w", 2600]],
    still: 3, hint: "asVideo",
  }),

  /** Ayet araligi: Degistir -> sure listesi -> Mulk -> Son ayet + (1-3), tahmini sure guncellenir. */
  "video-aralik": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("quranVideo.sectionRange")} › ${K.L("quranVideo.pickSurah")} › ${K.L("quranVideo.toAyah")} 3 › ${est(K, "0:41", 3)}`,
    views: [["k", kurma(K)]],
    overlays: [["s", sureSecici(K), "sheet"]],
    tl: [["w", 600], ["y", "sc", "10.5"], ["w", 900], ["tap", "chg"], ["ov", "s"], ["w", 1000], ["tap", "sMulk"], ["cl", "s"], ["w", 600],
      ["tap", "toPlus"], ["txt", "toV", "3"], ["txt", "hsub", rng(K, 1, 3)], ["txt", "est", est(K, "0:41", 3)], ["w", 900], ["y", "sc", "0"], ["w", 2000]],
    still: 2, hint: "chg",
  }),

  /** Bicim: 9:16 -> 4:5 -> 1:1; onizleme kutusu ve ipucu degisir. */
  "video-bicim": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("quranVideo.sectionFormat")}: 9:16 ${K.L("quranVideo.formatName.tall")} › 4:5 ${K.L("quranVideo.formatName.portrait")} › 1:1 ${K.L("quranVideo.formatName.square")}`,
    views: [["k", kurma(K)]],
    tl: [["w", 1200], ...tlBicim(K, "45", "r45"), ["w", 1700], ...tlBicim(K, "11", "r11"), ["w", 2200]],
    still: 0, hint: "f45",
  }),

  /** Kari: Degistir -> kari listesi -> baska bir kari -> satirda o ad. */
  "video-kari": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("quranVideo.sectionVoice")} › ${K.L("quranVideo.sectionReciter")} › ${K.L("quranAudio.chooseReciter")} › ${VO[K.dil].reciters[1]}`,
    views: [["k", kurma(K)]],
    overlays: [["r", kariSecici(K), "sheet"]],
    tl: [["w", 500], ["y", "sc", "33"], ["w", 1100], ["tap", "recChg"], ["ov", "r"], ["w", 900], ["tap", "rc1"], ["off", "rc0", "on"], ["on", "rc1", "on"], ["w", 500], ["cl", "r"],
      ["txt", "recName", VO[K.dil].reciters[1]], ["w", 2200]],
    still: 2, hint: "recChg",
  }),

  /** Kendi sesin: Kendi sesim -> Sesini kaydet -> Kayda basla -> Sonraki ayet -> kayit satiri. */
  "video-kendi": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("quranVideo.voice.own")} › ${K.L("quranVideo.voice.record")} › ${K.L("quranVideo.voice.start")} › ${K.L("quranVideo.voice.next")} › ${K.L("quranVideo.voice.take", { time: "0:24" })}`,
    views: [["k", kurma(K, { hal: "" })], ["r", kayit(K), "up"], ["k2", kurma(K, { hal: "own take", ctaKey: "make2", ctaLabelKey: "makeT2" }), "fade"]],
    tl: [["w", 500], ["y", "sc", "33"], ["w", 1000], ["tap", "vOwn"], ["on", "voice", "own"], ["txt", "makeT", K.L("quranVideo.voice.record")], ["w", 900],
      ["tap", "ownRow"], ["go", "r"], ["w", 1400], ["tap", "recStart"], ["on", "recw", "live"], ["w", 700], ["txt", "clock", "0:01"], ["w", 1000], ["txt", "clock", "0:02"], ["w", 1000], ["txt", "clock", "0:03"],
      ["w", 600], ["tap", "recNext"], ["txt", "stepL", K.L("quranScenes.ayahN", { n: 1 })], ["txt", "stepN", "2/3"], ["txt", "ayah", MULK1],
      ["txt", "up", K.L("quranVideo.voice.upNext", { what: K.L("quranScenes.ayahN", { n: 2 }) })], ["txt", "clock", "0:05"], ["w", 1000], ["txt", "clock", "0:06"], ["w", 1000], ["txt", "clock", "0:07"], ["w", 800],
      ["go", "k2"], ["y", "sc", "33"], ["w", 2400]],
    still: 3, hint: "vOwn",
  }),

  /** Sahne: Mürekkep -> onizleme kagit gibi olur -> Manzara. */
  "video-sahne": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("quranScenes.sectionStyle")}: ${K.L("quranScenes.styles.manzara")} › ${K.L("quranScenes.styles.ink")} · ${K.L("quranVideo.sectionMeal")}`,
    views: [["k", kurma(K)]],
    tl: [["w", 600], ["y", "sc", "11"], ["w", 1100], ["tap", "stI"], ["off", "stM", "on"], ["on", "stI", "on"], ["on", "pv", "ink"], ["w", 2000],
      ["tap", "stM"], ["off", "stI", "on"], ["on", "stM", "on"], ["off", "pv", "ink"], ["w", 1800]],
    still: 3, hint: "stI",
  }),

  /** Olustur: Videoyu olustur -> hazirlaniyor (ses, sonra video) -> Videon hazir. */
  "video-olustur": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("quranVideo.make")} › ${K.L("quranVideo.phaseAudio")} › ${K.L("quranVideo.phaseFrames")} › ${K.L("quranVideo.readyTitle")}`,
    views: [["k", kurma(K, { sec: "45" })], ["h", hazirlama(K), "fade"], ["d", hazir(K), "fade"]],
    tl: [["w", 1200], ["tap", "make"], ["go", "h"], ["w", 600], ...tlHazirla(K), ["go", "d"], ["w", 2600]],
    still: 0, hint: "make",
  }),

  /** Videon hazir: Paylas -> paylasim penceresi; Fotograflar'a kaydet -> kaydedildi. */
  "video-paylas": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("quranVideo.readyTitle")} › ${K.L("quranVideo.share")} › ${K.L("quranVideo.saveToPhotos")} › ${K.L("quranVideo.savedPhotos")}`,
    views: [["d", hazir(K)]],
    overlays: [["sh", paylasim(K), "sheet"]],
    tl: [["w", 1000], ["tap", "share"], ["ov", "sh"], ["w", 1800], ["cl", "sh"], ["w", 700], ["tap", "save"], ["on", "toast", "show"], ["w", 2400]],
    still: 0, hint: "share",
  }),

  /** Urettigin videolar: liste, satirda Paylas. */
  "video-liste": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("quranVideo.readyTitle")} › ${K.L("quranVideo.myVideos")} › ${rng(K, 1, 2)}`,
    views: [["d", hazir(K)], ["l", liste(K), "push"]],
    tl: [["w", 1100], ["tap", "mine"], ["go", "l"], ["w", 1300], ["tap", "lshare"], ["w", 2200]],
    still: 3, hint: "lshare",
  }),

  /** Merkez karti ve paylasim gorseli: bicim 9:16 -> 4:5 -> 1:1, sonra Videoyu olustur. */
  "video-kart": (K) => tel(K, {
    tema: "koyu",
    aria: `${K.L("quranVideo.entryTitle")}: 9:16 › 4:5 › 1:1 › ${K.L("quranVideo.make")}`,
    views: [["k", kartEkrani(K)]],
    tl: [["w", 900], ["tap", "k45"], ["off", "k916", "on"], ["on", "k45", "on"], ["on", "kpv", "r45"], ["w", 1300],
      ["tap", "k11"], ["off", "k45", "on"], ["on", "k11", "on"], ["off", "kpv", "r45"], ["on", "kpv", "r11"], ["w", 1300],
      ["tap", "kmake"], ["st", "kfill", "width", "100%"], ["w", 1900]],
    still: 6,
  }),
};

export const IKON = {
  avFilm: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M7.5 5v14M16.5 5v14M3.5 9.7h4M3.5 14.3h4M16.5 9.7h4M16.5 14.3h4"/>',
  avMic: '<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5"/>',
  avPlay: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  avMinus: '<path d="M5.5 12h13"/>',
  avDl: '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14"/>',
  avTrash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
  avRedo: '<path d="M19 12a7 7 0 1 1-2.1-5"/><path d="M19 4.5V9h-4.5"/>',
  avPhone: '<rect x="7" y="3" width="10" height="18" rx="2.2"/><path d="M11 18h2"/>',
  avSearch: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
  avGear: '<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M6 18l1.6-1.6M16.4 7.6 18 6"/>',
  avHead: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3.5" y="14" width="4" height="6" rx="1.5"/><rect x="16.5" y="14" width="4" height="6" rx="1.5"/>',
  avCam: '<rect x="3" y="6.5" width="12.5" height="11" rx="2"/><path d="M15.5 10.5 21 7.5v9l-5.5-3"/>',
  avHeart: '<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  avBkm: '<path d="M7 4h10v16l-5-3.5L7 20z"/>',
};

export const CSS = `
  .mp-s .avv { --a-bg: #0b1513; --a-card: #12201d; --a-hd: #0b1513; --a-ink: #eef3ef; --a-mut: rgba(238, 243, 239, .64); --a-line: rgba(238, 243, 239, .12);
    --a-pri: #e3c68d; --a-on: #14110a; --a-soft: rgba(227, 198, 141, .1); --a-in: #101c19; --a-gold: #e3c68d; --a-tg: rgba(238, 243, 239, .2); --av-faint: rgba(238, 243, 239, .38); }
  .mp-s .lock.avd { background: var(--a-bg); color: var(--a-ink); display: flex; flex-direction: column; }
  .mp-s .avd-hd { display: grid; grid-template-columns: 2.4em minmax(0, 1fr) 2.4em; align-items: center; padding: .3em .8em .45em; flex: none; }
  .mp-s .avd-rb { display: grid; place-items: center; color: var(--a-ink); }
  .mp-s .avd-ht { text-align: center; min-width: 0; }
  .mp-s .avd-ht b { display: block; font-size: 1em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .avd-ht small { display: block; font-size: .68em; color: var(--a-mut); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .avd-clip { flex: 1; position: relative; overflow: hidden; }
  .mp-s .avd-in { display: flex; flex-direction: column; gap: .5em; padding: .1em 1.15em 6em; }
  /* onizleme: Ay ve deniz */
  .mp-s .avd-pvw { display: flex; flex-direction: column; align-items: center; gap: .35em; }
  .mp-s .avd-pv { position: relative; flex: none; height: 16.5em; width: 9.3em; border-radius: .9em; overflow: hidden; color: #fff;
    background: linear-gradient(180deg, #0d1f3c 0%, #183459 38%, #2a4f7d 60%, #1a3c66 61.5%, #10304f 80%, #0b2340 100%); transition: width .55s cubic-bezier(.3, .8, .3, 1), background .45s ease; }
  .mp-s .avd-pv.r45 { width: 13.2em; }
  .mp-s .avd-pv.r11 { width: 16.5em; }
  .mp-s .avd-sky { position: absolute; inset: 0 0 45% 0; opacity: .8; background-image: radial-gradient(.06em .06em at 18% 22%, #fff 99%, transparent), radial-gradient(.05em .05em at 72% 14%, #fff 99%, transparent),
    radial-gradient(.05em .05em at 40% 8%, #fff 99%, transparent), radial-gradient(.06em .06em at 86% 34%, #fff 99%, transparent), radial-gradient(.05em .05em at 8% 46%, #fff 99%, transparent), radial-gradient(.05em .05em at 60% 30%, #fff 99%, transparent); }
  .mp-s .avd-moon { position: absolute; left: 50%; top: 64%; width: 1.25em; height: 1.25em; margin: -.62em; border-radius: 50%; background: radial-gradient(circle at 42% 38%, #fffdf0, #efdcae 72%); box-shadow: 0 0 1.4em .35em rgba(255, 240, 200, .32); }
  .mp-s .avd-glow { position: absolute; left: 50%; top: 68%; width: 1em; height: 24%; margin-left: -.5em; background: linear-gradient(180deg, rgba(255, 238, 196, .5), rgba(255, 238, 196, 0)); filter: blur(.15em); }
  .mp-s .avd-kn { position: absolute; top: 5.5%; left: .4em; right: .4em; text-align: center; font-size: .36em; letter-spacing: .14em; text-transform: uppercase; color: rgba(255, 255, 255, .85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  :root[lang="ar"] .mp-s .avd-kn { letter-spacing: 0; font-size: .44em; }
  .mp-s .avd-tx { position: absolute; left: .45em; right: .45em; top: 31%; display: flex; flex-direction: column; align-items: center; gap: .3em; }
  .mp-s .avd-ar { display: block; text-align: center; font-weight: 400; font-size: .78em; line-height: 1.7; transition: font-size .5s ease; }
  .mp-s .avd-pv.r45 .avd-ar, .mp-s .avd-pv.r11 .avd-ar { font-size: .96em; }
  .mp-s .avd-ml { display: block; width: 72%; height: .2em; border-radius: .2em; background: rgba(255, 255, 255, .55); }
  .mp-s .avd-ml.s { width: 46%; }
  .mp-s .avd-sig { position: absolute; bottom: 4%; left: 0; right: 0; display: flex; justify-content: center; align-items: center; gap: .3em; font-family: Georgia, "Times New Roman", serif; font-size: .46em; }
  .mp-s .avd-sig .bri { width: 1.4em; height: 1.4em; border-radius: .3em; }
  .mp-s .avd-pv.ink { background: #f1e9d6; color: #3a2f22; }
  .mp-s .avd-pv.ink .avd-sky, .mp-s .avd-pv.ink .avd-moon, .mp-s .avd-pv.ink .avd-glow { opacity: 0; }
  .mp-s .avd-pv.ink .avd-kn { color: #8a6d3e; }
  .mp-s .avd-pv.ink .avd-ml { background: rgba(58, 47, 34, .35); }
  .mp-s .avd-est { color: var(--a-mut); font-size: .7em; }
  /* bicim, aralik, sahne, meal, tilavet */
  .mp-s .avd-sec { display: block; font-size: .62em; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--a-mut); margin-top: .9em; }
  :root[lang="ar"] .mp-s .avd-sec { letter-spacing: 0; font-size: .7em; }
  .mp-s .avd-secr { display: flex; align-items: flex-end; justify-content: space-between; }
  .mp-s .avd-secr .tg { margin-inline-start: 0; }
  .mp-s .avd-fm { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .45em; }
  .mp-s .avd-f { display: flex; flex-direction: column; align-items: center; gap: .1em; min-width: 0; padding: .6em .25em .5em; border-radius: .85em; background: var(--a-card); box-shadow: inset 0 0 0 .09em transparent; transition: box-shadow .3s ease; }
  .mp-s .avd-f.on { box-shadow: inset 0 0 0 .1em var(--a-pri); }
  .mp-s .avd-shp { display: block; height: 1.3em; border: .085em solid var(--a-mut); border-radius: .22em; transition: border-color .3s ease; }
  .mp-s .avd-shp.r916 { width: .74em; } .mp-s .avd-shp.r45 { width: 1.04em; } .mp-s .avd-shp.r11 { width: 1.3em; }
  .mp-s .avd-f.on .avd-shp { border-color: var(--a-pri); }
  .mp-s .avd-f b { font-size: .84em; margin-top: .3em; transition: color .3s ease; }
  .mp-s .avd-f.on b { color: var(--a-pri); }
  .mp-s .avd-f small { font-size: .58em; color: var(--a-mut); max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .avd-hint { display: block; font-size: .6em; color: var(--av-faint); line-height: 1.35; min-height: 2.7em; }
  .mp-s .avd-row { display: flex; align-items: center; gap: .55em; min-height: 2.9em; padding: 0 .8em; border-radius: .9em; background: var(--a-card); border: 1px solid var(--a-line); font-size: .84em; }
  .mp-s .avd-row > .ic { color: var(--a-pri); width: 1.15em; height: 1.15em; }
  .mp-s .avd-row > span { flex: 1; min-width: 0; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .avd-row > b { flex: none; color: var(--a-pri); font-weight: 600; font-size: .92em; border-radius: .4em; }
  .mp-s .avd-st2 { display: grid; grid-template-columns: 1fr 1fr; gap: .5em; }
  .mp-s .avd-st { min-width: 0; background: var(--a-card); border: 1px solid var(--a-line); border-radius: .9em; padding: .45em .6em .5em; }
  .mp-s .avd-st > small { display: block; font-size: .64em; color: var(--a-mut); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .avd-st > div { display: flex; align-items: center; justify-content: space-between; margin-top: .3em; }
  .mp-s .avd-sb { width: 1.85em; height: 1.85em; border-radius: 50%; background: rgba(238, 243, 239, .08); display: grid; place-items: center; color: var(--a-ink); font-style: normal; }
  .mp-s .avd-sb .ic { width: 1em; height: 1em; }
  .mp-s .avd-st b { font-size: 1em; }
  .mp-s .avd-tiles { display: flex; gap: .45em; }
  .mp-s .avd-tl { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: .3em; border-radius: .7em; }
  .mp-s .avd-tla { display: block; width: 100%; aspect-ratio: 3 / 4; border-radius: .6em; box-shadow: inset 0 0 0 .1em transparent; transition: box-shadow .3s ease; }
  .mp-s .avd-tl.on .avd-tla { box-shadow: inset 0 0 0 .12em var(--a-pri), 0 0 0 .1em var(--a-pri); }
  .mp-s .avd-tl small { font-size: .62em; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .avd-tl.on small { color: var(--a-pri); }
  .mp-s .avd-tla.manzara { background: radial-gradient(circle at 50% 70%, rgba(255, 245, 220, .25) 0 .6em, transparent 1.1em), linear-gradient(180deg, #1d2b2a, #2c3f3a 60%, #15211f); }
  .mp-s .avd-tla.ink { background: linear-gradient(180deg, transparent 38%, rgba(60, 50, 35, .35) 38% 42%, transparent 42% 52%, rgba(60, 50, 35, .25) 52% 55%, transparent 55%), #efe7d4; }
  .mp-s .avd-tla.kubbe { background: radial-gradient(circle at 50% 52%, transparent 0 .9em, #c9a55e .9em 1.05em, transparent 1.05em), #1d1913; }
  .mp-s .avd-tla.pastel { background: radial-gradient(circle at 50% 66%, #fff6dc 0 .25em, transparent .32em), linear-gradient(180deg, #13284a, #2a4d7a 62%, #12304f 63%); }
  .mp-s .avd-chips { display: flex; flex-wrap: wrap; gap: .4em; }
  .mp-s .avd-chip { display: inline-flex; align-items: center; gap: .35em; max-width: 100%; padding: .5em .8em; border-radius: 2em; background: var(--a-card); border: 1px solid var(--a-line); font-size: .78em; font-weight: 600; white-space: nowrap; transition: background .3s ease, color .3s ease; }
  .mp-s .avd-chip .ic { width: 1.05em; height: 1.05em; }
  .mp-s .avd-chip.on, .mp-s .avd-voice:not(.own) .avd-cr, .mp-s .avd-voice.own .avd-co { background: var(--a-pri); color: var(--a-on); border-color: transparent; }
  .mp-s .avd-voice { display: flex; flex-direction: column; gap: .55em; }
  .mp-s .avd-voice .avd-rown, .mp-s .avd-voice .avd-rtake, .mp-s .avd-voice.own .avd-rrec, .mp-s .avd-voice.take .avd-rown { display: none; }
  .mp-s .avd-voice.own:not(.take) .avd-rown { display: flex; }
  .mp-s .avd-voice.own.take .avd-rtake { display: flex; }
  .mp-s .avd-play { width: 1.9em; height: 1.9em; border-radius: 50%; background: var(--a-pri); color: var(--a-on); display: grid; place-items: center; flex: none; font-style: normal; }
  .mp-s .avd-play .ic { width: 1em; height: 1em; }
  .mp-s .avd-cta { position: absolute; left: 0; right: 0; bottom: 0; z-index: 3; padding: .7em 1.15em 1.45em; background: rgba(11, 21, 19, .95); border-top: 1px solid var(--a-line); }
  .mp-s .bt.avd-gold { height: 3em; border-radius: 1.5em; background: var(--a-pri); color: var(--a-on); font-size: .9em; }
  .mp-s .bt.avd-gray { height: 3em; border-radius: 1.5em; background: rgba(238, 243, 239, .1); color: var(--a-ink); font-size: .9em; }
  .mp-s .bt.avd-gold > span, .mp-s .bt.avd-gray > span { overflow: hidden; text-overflow: ellipsis; }
  /* alttan pencereler */
  .mp-s .sheet.avd-sheet { background: var(--a-card); color: var(--a-ink); gap: .1em; }
  .mp-s .avd-shh { display: block; font-size: 1.02em; margin-bottom: .35em; }
  .mp-s .avd-shr { display: flex; justify-content: space-between; align-items: flex-start; }
  .mp-s .avd-sr { display: grid; grid-template-columns: 1.9em minmax(0, 1fr) auto; align-items: center; gap: .5em; min-height: 2.75em; font-size: .86em; border-radius: .6em; }
  .mp-s .avd-sr small { color: var(--av-faint); font-size: .8em; text-align: center; }
  .mp-s .avd-sr small:last-child { text-align: end; }
  .mp-s .avd-sr.on b, .mp-s .avd-sr.on small:first-child { color: var(--a-pri); }
  .mp-s .avd-rl { display: flex; flex-direction: column; background: var(--a-in); border-radius: .9em; overflow: hidden; }
  .mp-s .avd-ri { display: flex; align-items: center; gap: .6em; padding: .7em .8em; font-size: .82em; font-weight: 600; border-bottom: 1px solid var(--a-line); }
  .mp-s .avd-ri:last-child { border-bottom: 0; }
  .mp-s .avd-ri span { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .avd-rad { width: 1.15em; height: 1.15em; border-radius: 50%; box-shadow: inset 0 0 0 .11em var(--a-mut); flex: none; transition: box-shadow .25s ease; }
  .mp-s .avd-ri.on .avd-rad { box-shadow: inset 0 0 0 .11em var(--a-pri), inset 0 0 0 .3em var(--a-in), inset 0 0 0 1em var(--a-pri); }
  /* kendi sesin */
  .mp-s .avd-recw { flex: 1; display: flex; flex-direction: column; padding: 0 1.15em 1.4em; gap: .7em; min-height: 0; }
  .mp-s .avd-step { display: flex; justify-content: space-between; align-items: baseline; padding: .2em .4em 0; }
  .mp-s .avd-step b { color: var(--a-pri); font-size: .9em; }
  .mp-s .avd-step small { color: var(--av-faint); font-size: .76em; }
  .mp-s .avd-card { flex: 1; min-height: 0; display: grid; place-items: center; padding: 1em; border-radius: 1.2em; background: var(--a-card); border: 1px solid var(--a-line); }
  .mp-s .avd-car { font-size: 1.35em; font-weight: 400; line-height: 1.85; text-align: center; }
  .mp-s .avd-info { display: flex; flex-direction: column; gap: .5em; padding: .75em .8em; border-radius: .95em; background: rgba(227, 198, 141, .08); }
  .mp-s .avd-info div { display: flex; gap: .55em; align-items: flex-start; }
  .mp-s .avd-info .ic { color: var(--a-pri); width: 1.1em; height: 1.1em; }
  .mp-s .avd-info small { color: var(--a-mut); font-size: .7em; line-height: 1.4; }
  .mp-s .avd-live { display: none; flex-direction: column; align-items: center; gap: .4em; }
  .mp-s .avd-lv { display: flex; align-items: center; gap: .55em; height: 1.8em; }
  .mp-s .avd-dot { width: .6em; height: .6em; border-radius: 50%; background: #f2a59a; }
  .mp-s .avd-lv b { min-width: 2.4em; font-size: .95em; }
  .mp-s .avd-bars { display: flex; align-items: center; gap: .18em; height: 1.6em; }
  .mp-s .avd-bars i { display: block; width: .18em; height: 1.4em; border-radius: .1em; background: #f2a59a; transform: scaleY(.25); animation: avdbar .9s ease-in-out var(--d) infinite alternate; }
  @keyframes avdbar { to { transform: scaleY(1); } }
  .mp-s .avd-live small { color: var(--av-faint); font-size: .72em; }
  .mp-s .avd-ctl { display: flex; flex-direction: column; align-items: center; gap: .3em; }
  .mp-s .avd-ghost { display: inline-flex; align-items: center; gap: .35em; color: var(--a-pri); font-weight: 700; font-size: .82em; padding: .6em 1em; }
  .mp-s .avd-ghost .ic { width: 1.05em; height: 1.05em; }
  .mp-s .avd-recw .avd-b2 { display: none; }
  .mp-s .avd-recw.live .avd-info, .mp-s .avd-recw.live .avd-b1 { display: none; }
  .mp-s .avd-recw.live .avd-live, .mp-s .avd-recw.live .avd-b2 { display: flex; }
  /* hazirlama, hazir, liste */
  .mp-s .avd-rbox { flex: 1; display: grid; place-items: center; padding-top: 1em; }
  .mp-s .avd-panel { display: flex; flex-direction: column; align-items: center; gap: .45em; padding: 0 1.4em 2em; text-align: center; }
  .mp-s .avd-panel > b { font-size: .95em; }
  .mp-s .avd-pbar { display: block; width: 100%; height: .42em; border-radius: 1em; background: rgba(238, 243, 239, .12); overflow: hidden; }
  .mp-s .avd-pbar i { display: block; height: 100%; width: 4%; border-radius: inherit; background: var(--a-pri); transition: width .8s ease; }
  .mp-s .avd-panel small { color: var(--a-mut); font-size: .72em; }
  .mp-s .avd-panel .avd-stay { color: var(--av-faint); font-size: .64em; max-width: 22em; }
  .mp-s .avd-sec2 { display: inline-flex; align-items: center; gap: .3em; margin-top: .3em; padding: .55em 1.1em; border-radius: 2em; background: rgba(238, 243, 239, .1); font-size: .8em; font-weight: 700; }
  .mp-s .avd-sec2 .ic { width: 1em; height: 1em; }
  .mp-s .avd-done { flex: 1; display: flex; flex-direction: column; align-items: stretch; gap: .5em; padding: .2em 1.4em 1.5em; position: relative; }
  .mp-s .avd-player { align-self: center; position: relative; margin-bottom: .4em; }
  .mp-s .avd-player .avd-pv { height: 18em; }
  .mp-s .avd-player .avd-pv.r45 { width: 14.4em; }
  .mp-s .avd-ctr { position: absolute; left: .5em; right: .5em; bottom: .45em; display: flex; align-items: center; gap: .45em; padding: .3em .55em; border-radius: 1em; background: rgba(0, 0, 0, .45); color: #fff; }
  .mp-s .avd-ctr .ic { width: .95em; height: .95em; }
  .mp-s .avd-ctr small { font-size: .6em; }
  .mp-s .avd-seek { flex: 1; height: .22em; border-radius: 1em; background: rgba(255, 255, 255, .3); }
  .mp-s .avd-seek i { display: block; width: 6%; height: 100%; border-radius: inherit; background: #fff; }
  .mp-s .avd-gh2 { display: flex; gap: .4em; }
  .mp-s .avd-gh2 span { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center; gap: .3em; height: 2.6em; color: var(--a-pri); font-weight: 700; font-size: .74em; border-radius: 1.3em; white-space: nowrap; overflow: hidden; }
  .mp-s .avd-gh2 .ic { width: 1.1em; height: 1.1em; }
  .mp-s .avd-toast { position: absolute; left: 50%; top: 1em; transform: translate(-50%, -.6em); display: flex; align-items: center; gap: .4em; padding: .55em .9em; border-radius: 1.2em; background: #eef3ef; color: #12201d; font-size: .74em; font-weight: 700; white-space: nowrap; opacity: 0; transition: opacity .35s ease, transform .4s ease; }
  .mp-s .avd-toast .ic { color: #2f8a5b; width: 1.2em; height: 1.2em; }
  .mp-s .avd-toast.show { opacity: 1; transform: translate(-50%, 0); }
  .mp-s .sheet.avd-share { gap: .7em; }
  .mp-s .avd-shf { display: flex; align-items: center; gap: .6em; padding-bottom: .55em; border-bottom: 1px solid var(--a-line); }
  .mp-s .avd-shf b { display: block; font-size: .86em; }
  .mp-s .avd-shf small { display: block; font-size: .68em; color: var(--a-mut); }
  .mp-s .avd-thumb { position: relative; display: grid; place-items: center; flex: none; height: 4.6em; width: 3.7em; border-radius: .55em; color: #fff;
    background: radial-gradient(circle at 50% 66%, #fff6dc 0 .18em, transparent .26em), linear-gradient(180deg, #13284a, #2a4d7a 62%, #12304f 63%); }
  .mp-s .avd-thumb.ink { width: 2.6em; background: #efe7d4; color: #3a2f22; }
  .mp-s .avd-shf .avd-thumb { height: 3.1em; width: 2.5em; }
  .mp-s .avd-thumb i { width: 1.5em; height: 1.5em; border-radius: 50%; background: rgba(0, 0, 0, .45); display: grid; place-items: center; color: #fff; font-style: normal; }
  .mp-s .avd-thumb i .ic { width: .8em; height: .8em; }
  .mp-s .avd-list { display: flex; flex-direction: column; gap: .9em; padding: .5em 1.15em 0; }
  .mp-s .avd-li { display: flex; gap: .75em; align-items: flex-start; }
  .mp-s .avd-li > div { flex: 1; min-width: 0; }
  .mp-s .avd-li b { display: block; font-size: .92em; }
  .mp-s .avd-li small { display: block; color: var(--a-mut); font-size: .66em; margin-top: .15em; }
  .mp-s .avd-acts { display: flex; gap: .4em; margin-top: .45em; }
  .mp-s .avd-acts span, .mp-s .avd-acts i { display: inline-flex; align-items: center; gap: .3em; height: 2.2em; padding: 0 .7em; border-radius: 1.1em; border: 1px solid var(--a-line); color: var(--a-pri); font-size: .74em; font-weight: 700; font-style: normal; }
  .mp-s .avd-acts i { color: var(--a-ink); padding: 0 .6em; }
  .mp-s .avd-acts .ic { width: 1.1em; height: 1.1em; }
  .mp-s .avd-note { display: block; color: var(--av-faint); font-size: .62em; text-align: center; padding: 1.4em 1.6em 0; line-height: 1.4; }
  /* Kur'an > Dinle (acik tema) */
  .mp-s .avd-ah { display: flex; align-items: center; gap: .5em; padding: .4em 1.15em .5em; }
  .mp-s .avd-ah > div { flex: 1; min-width: 0; }
  .mp-s .avd-ah small { display: block; font-size: .56em; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--a-mut); }
  .mp-s .avd-ah b { display: block; font-size: 1.5em; line-height: 1.1; }
  .mp-s .avd-ab { width: 2.3em; height: 2.3em; border-radius: 50%; background: var(--a-card); border: 1px solid var(--a-line); color: var(--a-pri); display: grid; place-items: center; flex: none; }
  .mp-s .avd-ab .ic { width: 1.05em; height: 1.05em; }
  .mp-s .avd-dpg { gap: .5em; padding-top: .3em; }
  .mp-s .avd-dres { display: flex; flex-direction: column; align-items: flex-start; gap: .25em; }
  .mp-s .avd-dres small { font-size: .7em; font-weight: 700; }
  .mp-s .avd-dres b { font-size: 1.15em; }
  .mp-s .avd-dres .bt { margin-top: .3em; }
  .mp-s .avd-dsec { display: block; font-size: .6em; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--a-mut); margin-top: .5em; }
  :root[lang="ar"] .mp-s .avd-dsec, :root[lang="ar"] .mp-s .avd-ah small { letter-spacing: 0; }
  .mp-s .avd-dsc { padding: .6em; }
  .mp-s .avd-dts { display: grid; grid-template-columns: repeat(4, 1fr); gap: .4em; }
  .mp-s .avd-dt { display: block; aspect-ratio: 3 / 4; border-radius: .5em; }
  .mp-s .avd-dt.m { background: linear-gradient(180deg, #1d2b2a, #2c3f3a 60%, #15211f); box-shadow: 0 0 0 .1em var(--a-gold); }
  .mp-s .avd-dt.i { background: #efe7d4; }
  .mp-s .avd-dt.k { background: radial-gradient(circle at 50% 52%, transparent 0 .7em, #c9a55e .7em .82em, transparent .82em), #1d1913; }
  .mp-s .avd-dt.p { background: radial-gradient(circle at 50% 66%, #fff6dc 0 .2em, transparent .28em), linear-gradient(180deg, #13284a, #2a4d7a 62%, #12304f 63%); }
  .mp-s .avd-dvid { display: flex; flex-direction: column; align-items: flex-start; gap: .55em; }
  .mp-s .avd-dvid small { color: var(--a-mut); font-size: .72em; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .avd-atab { position: absolute; left: 1em; right: 1em; bottom: 1em; z-index: 3; display: flex; padding: .3em; height: 3.7em; border-radius: 2em; background: var(--a-card); border: 1px solid var(--a-line); box-shadow: 0 .6em 1.4em -.8em rgba(0, 0, 0, .3); }
  .mp-s .avd-atab span { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .1em; border-radius: 1.6em; color: var(--a-mut); }
  .mp-s .avd-atab span.on { background: var(--a-soft); color: var(--a-pri); }
  .mp-s .avd-atab small { font-size: .52em; font-weight: 700; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  /* okuyucu (sepya) ve ayet menusu */
  .mp-s:has(.vw.on .avd-rd) .sb { color: #3d3222; }
  .mp-s .avd-rd { position: absolute; inset: -2.7em 0 0; padding-top: 2.7em; background: #f4ecd9; color: #3d3222; }
  .mp-s .avd-rdh { display: grid; grid-template-columns: 2.4em 1fr 2.4em; align-items: center; padding: .35em 1em .5em; text-align: center; }
  .mp-s .avd-rdh span { display: grid; place-items: center; color: #6c5a3c; }
  .mp-s .avd-rdp { direction: rtl; margin: .4em 1.3em 0; display: grid; gap: .95em; }
  .mp-s .avd-rdp i { display: block; height: .55em; width: var(--w); border-radius: .3em; background: rgba(61, 50, 34, .22); }
  .mp-s .avd-rdp i.hl { background: rgba(176, 140, 72, .55); box-shadow: 0 0 0 .3em rgba(214, 186, 120, .3); }
  .mp-s .avd-rdp .avd-rdf { width: 100%; height: 2.2em; border-radius: .4em; background: #2b3f6b; box-shadow: inset 0 0 0 .2em #c9a55e; margin-bottom: .2em; }
  .mp-s .sheet.avd-vs { background: #f8f1e1; color: #3d3222; gap: .5em; padding-bottom: 1.3em; }
  .mp-s .avd-vsh { display: grid; grid-template-columns: 2em 1fr 2em; align-items: center; text-align: center; direction: ltr; }
  .mp-s .avd-vsh b { font-size: .95em; }
  .mp-s .avd-vsh span { display: grid; place-items: center; color: #6c5a3c; }
  .mp-s .avd-vsa, .mp-s .avd-vsm { display: grid; gap: .55em; }
  .mp-s .avd-vsa { direction: rtl; }
  .mp-s .avd-vsa i, .mp-s .avd-vsm i { display: block; height: .55em; width: var(--w); border-radius: .3em; background: rgba(61, 50, 34, .3); }
  .mp-s .avd-vsm i { height: .4em; background: rgba(61, 50, 34, .16); }
  .mp-s .avd-vse { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: .2em; padding: .4em 0 .2em; border-bottom: 1px solid rgba(61, 50, 34, .14); }
  .mp-s .avd-vse span { display: flex; flex-direction: column; align-items: center; gap: .2em; min-width: 0; }
  .mp-s .avd-vse small { font-size: .52em; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .avd-vsr { display: flex; align-items: center; gap: .55em; min-height: 2.4em; font-size: .78em; border-bottom: 1px solid rgba(61, 50, 34, .1); border-radius: .4em; }
  .mp-s .avd-vsr:last-child { border-bottom: 0; }
  .mp-s .avd-vsr b { font-weight: 600; white-space: nowrap; }
  .mp-s .avd-vsr small { margin-inline-start: auto; color: rgba(61, 50, 34, .6); font-size: .8em; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  /* merkez karti */
  .mp-s .avk-h { text-align: center; padding: .5em 1em .3em; font-size: 1.15em; }
  .mp-s .avk-pvw { display: flex; justify-content: center; align-items: center; height: 23.6em; padding-top: .3em; }
  .mp-s .avk-pvw .avd-pv { height: 23em; width: 12.9em; transition: width .55s cubic-bezier(.3, .8, .3, 1), height .55s cubic-bezier(.3, .8, .3, 1); }
  .mp-s .avk-pvw .avd-pv.r45 { width: 18.4em; }
  .mp-s .avk-pvw .avd-pv.r11 { width: 21.2em; height: 21.2em; }
  .mp-s .avk-pvw .avd-ar { font-size: 1.05em; }
  .mp-s .avk-pvw .avd-pv.r45 .avd-ar, .mp-s .avk-pvw .avd-pv.r11 .avd-ar { font-size: 1.3em; }
  .mp-s .avk-pvw .avd-kn { font-size: .44em; }
  .mp-s .avk-pvw .avd-sig { font-size: .6em; }
  .mp-s .avk-fm { display: grid; grid-template-columns: repeat(3, 1fr); gap: .6em; padding: 1.3em 1.4em 0; }
  .mp-s .avk-f { display: flex; flex-direction: column; align-items: center; gap: .35em; padding: 1em .2em .9em; border-radius: 1em; background: var(--a-card); box-shadow: inset 0 0 0 .12em transparent; transition: box-shadow .3s ease; }
  .mp-s .avk-f.on { box-shadow: inset 0 0 0 .14em var(--a-pri); }
  .mp-s .avk-f .avd-shp { height: 2.1em; border-width: .13em; }
  .mp-s .avk-f .avd-shp.r916 { width: 1.18em; } .mp-s .avk-f .avd-shp.r45 { width: 1.68em; } .mp-s .avk-f .avd-shp.r11 { width: 2.1em; }
  .mp-s .avk-f.on .avd-shp { border-color: var(--a-pri); }
  .mp-s .avk-f b { font-size: 1.35em; }
  .mp-s .avk-f.on b { color: var(--a-pri); }
  .mp-s .bt.avk-cta { position: absolute; left: 1.4em; right: 1.4em; bottom: 2.4em; width: auto; height: 3.2em; font-size: 1em; }
  .mp-s .avk-bar { position: absolute; left: 1.4em; right: 1.4em; bottom: 1.2em; height: .35em; border-radius: 1em; background: rgba(238, 243, 239, .12); overflow: hidden; }
  .mp-s .avk-bar i { display: block; height: 100%; width: 0; border-radius: inherit; background: var(--a-pri); transition: width 1.6s ease; }
  @media (prefers-reduced-motion: reduce) { .mp-s .avd-bars i { animation: none; transform: scaleY(.6); } }
`;
