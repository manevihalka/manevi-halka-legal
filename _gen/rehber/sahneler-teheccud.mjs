/**
 * Teheccud alarmi rehberinin ekranlari (21 Kas 2026, 2.1.0).
 * Akislar uygulamanin kodundan izlendi (salt okunur):
 *   app/prayer-detail.tsx            Namazlarim: NAFILE NAMAZLAR karti, "Nafile namazlari takip et" anahtari (kapaliyken kart sade)
 *   components/prayer/NightCard.tsx  Teheccud karti: "Bu gece 02:08-06:17", kildim dairesi, rekat 2-12, (vitir satiri yalniz
 *                                    "Vitri de takip et" acikken), "Uyandirma alarmi", "Teheccud nedir, nasil kilinir?"
 *                                    Halkada paylasim satiri (TahajjudShare) bu rehberde BILEREK cizilmez (kullanici karari).
 *   app/teheccud-alarm.tsx           alarm ekrani: Alarmi kur (alt satir yola gore: iOS 26+ AlarmKit, Android, eski iOS bildirim),
 *                                    SAAT (son ucte bir / imsaktan once 15-90 dk / sabit saat), GECELER (Her gece + tek tek),
 *                                    SIRADAKI ALARMLAR (en cok 3), Ertele notu
 *   lib/tahajjudAlarm.ts             alarm metni "Teheccud vakti", Ertele (10 dk) ve Kapat
 * Namazlarim uygulamada her zaman koyu fotograf paletiyle cizilir: `.th-gc` sarmalayici. Alarm ekrani temanin rengini alir
 * (ScreenBackdrop): varsayilan ocean. Dugme/baslik metinleri K.L("anahtar") ile uygulamadan. Uzun tire YOK.
 */

const gunAdi = (dil) => new Date("2026-11-22T12:00:00").toLocaleDateString(dil === "ar" ? "ar-u-nu-latn" : dil, { weekday: "long", day: "numeric", month: "long" });
const ARALIK = "02:08-06:17";

/** Gece mavisi sarmalayici (Namazlarim). `.lock` sinifi motorun durum cubugunu beyaz yapmasi icin (sbw). */
const gece = (html, cls = "") => `<div class="lock th-gc${cls ? " " + cls : ""}">${html}</div>`;
const nHd = (K) => `<div class="th-nh"><span class="th-rb">${K.ic("back", "fl")}</span><b>${K.Le("prayerDetail.title")}</b><span class="th-rb">${K.ic("thSliders")}</span></div>`;
const daire = (K, on, key, kesik = false) => `<i class="th-dot${on ? " on" : ""}${kesik ? " ks" : ""}"${key ? K.attr(key) : ""}>${K.ic("check")}</i>`;

/** Teheccud karti (NightCard). prayed: kildim; rakat: secili; witr: vitir satiri acik. */
function geceKarti(K, { prayed = false, rakat = 8, witr = false } = {}) {
  return `<div class="th-night">
      <div class="th-row th-top">${K.ic("moon")}<div><b>${K.Le("night.title")}</b><small>${K.e(K.L("night.window", { range: "§" })).replace("§", K.num(ARALIK))}</small></div>${daire(K, prayed, "tdot")}</div>
      <div class="th-chips"><small>${K.Le("night.rakat")}</small>${[2, 4, 6, 8, 10, 12].map((n) => `<span class="${n === rakat ? "on" : ""}"${K.attr("r" + n)}>${K.num(String(n))}</span>`).join("")}</div>
      <div class="th-row th-line th-witr${witr ? " show" : ""}"${K.attr("wrow")}>${K.ic("thNight")}<div><b>${K.Le("night.witr")}</b><small>${K.Le("night.witrWindow")}</small></div>${daire(K, false)}</div>
      <div class="th-row th-line"${K.attr("alarm")}>${K.ic("thAlarm")}<b class="th-f">${K.Le("night.alarm")}</b>${K.ic("chev", "fl th-cv")}</div>
      <div class="th-row th-line th-sm"><span class="th-f">${K.Le("night.witrToggle")}</span>${K.tg(witr, "wtg")}</div>
      <div class="th-row th-line th-sm th-pri">${K.ic("book")}<span class="th-f">${K.Le("night.guide")}</span>${K.ic("chev", "fl th-cv")}</div>
    </div>`;
}

/** Namazlarim, NAFILE NAMAZLAR bolumu. on: takip acik (Kusluk satiri ve Teheccud karti gorunur). */
function nafile(K, { on = true, ust = true, ...kart } = {}) {
  const ustKisim = ust
    ? `<div class="th-gcard"><div class="th-row">${K.ic("moon")}<b class="th-f">${K.Le("explore.prayerIsha")}</b><small>${K.num("19:15")}</small>${daire(K, true)}</div>
        <div class="th-row th-line th-pri">${K.ic("mosque")}<b class="th-f">${K.Le("tesbihat.readCta")}</b>${K.ic("chev", "fl th-cv")}</div></div>
      <div class="th-gcard th-kz"><span class="th-ei"><i></i><i></i><i></i></span><div><b>${K.Le("kaza.titleBoth")}</b><small>${K.Le("kaza.entryStart")}</small></div>${K.ic("chev", "fl th-cv")}</div>`
    : "";
  return gece(`${nHd(K)}
    <div class="th-clip"><div class="th-in sc"${K.attr("nsc")}>
      ${ustKisim}
      <small class="th-sl">${K.Le("prayer.naflSection")}</small>
      <div class="th-gcard">
        <div class="th-row">${K.ic("moon")}<b class="th-f">${K.Le("prayer.naflTrackToggle")}</b>${K.tg(on, "nft")}</div>
        <div class="th-nf${on ? " show" : ""}"${K.attr("nf")}>
          <div class="th-row th-line">${K.ic("thSun")}<b class="th-f">${K.Le("prayer.duha")}</b><small class="th-mu">${K.Le("prayer.duhaWindow")}</small>${daire(K, false, "", true)}</div>
          ${geceKarti(K, kart)}
        </div>
      </div>
    </div></div>`);
}

/** Alarm ekrani (app/teheccud-alarm.tsx). on: anahtar acik; mode: 0 son ucte bir, 1 imsaktan once, 2 sabit saat. */
function alarmEkran(K, { on = false, mode = 0 } = {}) {
  const chip = (lbl, act, key) => `<span class="th-c${act ? " on" : ""}"${key ? K.attr(key) : ""}>${lbl}</span>`;
  const geceler = [1, 2, 3, 4, 5, 6, 0];
  const gAd = [K.Le("tahajjudAlarm.night0"), K.Le("tahajjudAlarm.night1"), K.Le("tahajjudAlarm.night2"), K.Le("tahajjudAlarm.night3"), K.Le("tahajjudAlarm.night4"), K.Le("tahajjudAlarm.night5"), K.Le("tahajjudAlarm.night6")];
  const sat = ["02:08", "02:09", "02:10"];
  const sira = (i, n) => `<div class="th-up"${K.attr("u" + i)}>${K.ic("moon")}<span${K.attr("ut" + i)}>${K.e(K.L("tahajjudAlarm.upcomingItem", { night: "§", time: "¤" })).replace("§", gAd[n]).replace("¤", K.num(sat[i]))}</span></div>`;
  return `<div class="th-ah"><span class="th-ab">${K.ic("back", "fl")}</span><b>${K.Le("tahajjudAlarm.screenTitle")}</b><span></span></div>
    <div class="th-clip"><div class="th-in sc${on ? " th-on" : ""}"${K.attr("asc")}>
      <div class="th-card th-row th-en">${K.ic("thAlarm")}<div><b>${K.Le("tahajjudAlarm.enableTitle")}</b><small>${K.Le("tahajjudAlarm.subAlarmKit")}</small></div>${K.tg(on, "atg")}</div>
      <small class="th-sl">${K.Le("tahajjudAlarm.timeSection")}</small>
      <div class="th-card th-body">
        <div class="th-cr">${chip(K.Le("prayerTracking.tahajjudModeLastThird"), mode === 0, "m0")}${chip(K.Le("prayerTracking.tahajjudModeBeforeFajr"), mode === 1, "m1")}${chip(K.Le("prayerTracking.tahajjudModeFixed"), mode === 2, "m2")}</div>
        <div class="th-cr th-bf${mode === 1 ? " show" : ""}"${K.attr("bf")}>${[15, 30, 45, 60, 75, 90].map((n) => chip(K.Le("prayerTracking.tahajjudBeforeMin", { n }), n === 60, "b" + n)).join("")}</div>
        <div class="th-fx${mode === 2 ? " show" : ""}"${K.attr("fx")}><small>${K.Le("prayerTracking.tahajjudFixedLabel")}</small><b>${K.num("03:30")}</b></div>
      </div>
      <small class="th-sl">${K.Le("tahajjudAlarm.nightsSection")}</small>
      <div class="th-card th-body">
        <div class="th-cr">${chip(K.Le("tahajjudAlarm.preset.all"), true, "pall")}${chip(K.Le("tahajjudAlarm.preset.monThu"), false)}${chip(K.Le("tahajjudAlarm.preset.friday"), false)}</div>
        <i class="th-sep"></i>
        <div class="th-cr">${geceler.map((wd) => chip(gAd[wd], false, "g" + wd)).join("")}</div>
        <small class="th-mu th-nt">${K.Le("tahajjudAlarm.nightsHint")}</small>
      </div>
      <small class="th-sl">${K.Le("tahajjudAlarm.upcomingTitle")}</small>
      <div class="th-card th-body th-ups">${sira(0, 0)}${sira(1, 1)}${sira(2, 2)}<small class="th-mu th-nt">${K.Le("tahajjudAlarm.snoozeNote")}</small></div>
    </div></div>`;
}

/** Alarm calarken kilit ekrani: saat, "Teheccud vakti", Ertele ve Kapat. */
function caliyor(K) {
  return `<div class="lock th-lock"><div class="th-lt"><small>${K.e(gunAdi(K.dil))}</small><b>${K.num("2:08")}</b></div>
    <div class="th-ring"><span class="th-bell">${K.ic("thAlarm")}</span><b>${K.Le("tahajjudAlarm.alarmTitle")}</b><small>Manevi Halka</small></div>
    <div class="th-lb">${K.bt(K.L("tahajjudAlarm.snooze"), { key: "snz", cls: "th-snz" })}${K.bt(K.L("tahajjudAlarm.stop"), { key: "stop", cls: "th-stop" })}</div></div>`;
}

/** Merkez karti: iri ogeler. Bu gecenin araligi, alarm anahtari. */
function kart(K) {
  return gece(`<div class="th-k">
    <span class="th-km">${K.ic("moon")}</span>
    <b class="th-kt">${K.Le("night.title")}</b>
    <b class="th-kr">${K.num(ARALIK)}</b>
    <div class="th-chips th-kc">${[2, 4, 6, 8, 10, 12].map((n) => `<span class="${n === 8 ? "on" : ""}">${K.num(String(n))}</span>`).join("")}</div>
    <div class="th-gcard th-row th-ka">${K.ic("thAlarm")}<b class="th-f">${K.Le("night.alarm")}</b>${K.tg(false, "ktg")}</div>
  </div>`, "th-kg");
}

const ust = (K, ad, n, saat) => K.L("tahajjudAlarm.upcomingItem", { night: ad, time: saat });

export const SAHNE = {
  /** Giris filmi: nafile takibi acilir -> Teheccud karti -> Uyandirma alarmi -> Alarmi kur -> alarm calar. */
  "film-teheccud": (K) => K.telefon({
    size: "lg",
    aria: `${K.L("prayerDetail.title")} › ${K.L("prayer.naflTrackToggle")} › ${K.L("night.title")} ${ARALIK} › ${K.L("night.alarm")} › ${K.L("tahajjudAlarm.enableTitle")} › ${K.L("tahajjudAlarm.alarmTitle")}`,
    views: [["n", nafile(K, { on: false })], ["a", alarmEkran(K), "push"], ["l", caliyor(K), "fade"]],
    tl: [["w", 900], ["tap", "nft"], ["on", "nft", "on"], ["on", "nf", "show"], ["w", 300], ["y", "nsc", "9.5"], ["w", 1100], ["tap", "alarm"], ["go", "a"], ["w", 800],
      ["tap", "atg"], ["on", "atg", "on"], ["on", "asc", "th-on"], ["w", 1300], ["y", "asc", "15"], ["w", 1500], ["go", "l"], ["w", 1400], ["tap", "snz"], ["w", 1400]],
    still: 0, hint: "nft",
  }),

  /** Namazlarim: Nafile namazlari takip et -> Kusluk ve Teheccud karti belirir. */
  "teh-ac": (K) => K.telefon({
    aria: `${K.L("prayerDetail.title")} › ${K.L("prayer.naflSection")} › ${K.L("prayer.naflTrackToggle")} › ${K.L("night.title")}`,
    views: [["n", nafile(K, { on: false })]],
    tl: [["w", 1000], ["tap", "nft"], ["on", "nft", "on"], ["on", "nf", "show"], ["w", 500], ["y", "nsc", "9.5"], ["w", 2600]],
    still: 0, hint: "nft",
  }),

  /** Teheccud karti: rekat secilir, kildim dairesi, Vitri de takip et -> vitir satiri. */
  "teh-kart": (K) => K.telefon({
    aria: `${K.L("night.title")}: ${K.L("night.window", { range: ARALIK })} › ${K.L("night.rakatN", { n: 8 })} › ${K.L("night.witrToggle")}`,
    views: [["n", nafile(K, { ust: false, rakat: 4 })]],
    tl: [["w", 900], ["tap", "r8"], ["off", "r4", "on"], ["on", "r8", "on"], ["w", 600], ["tap", "tdot"], ["on", "tdot", "on"], ["w", 900], ["tap", "wtg"], ["on", "wtg", "on"], ["on", "wrow", "show"], ["w", 2600]],
    still: 7, hint: "tdot",
  }),

  /** Uyandirma alarmi -> Teheccud alarmi ekrani -> Alarmi kur acilir, siradaki alarmlar belirginlesir. */
  "teh-alarm-ac": (K) => K.telefon({
    aria: `${K.L("night.alarm")} › ${K.L("tahajjudAlarm.screenTitle")} › ${K.L("tahajjudAlarm.enableTitle")} · ${K.L("tahajjudAlarm.subAlarmKit")}`,
    views: [["n", nafile(K, { ust: false })], ["a", alarmEkran(K), "push"]],
    tl: [["w", 900], ["tap", "alarm"], ["go", "a"], ["w", 900], ["tap", "atg"], ["on", "atg", "on"], ["on", "asc", "th-on"], ["w", 2600]],
    still: 3, hint: "atg",
  }),

  /** Saat: imsaktan once (30 dk) -> siradaki alarmlar degisir; sabit saat 03:30. */
  "teh-saat": (K) => {
    const g = [K.L("tahajjudAlarm.night0"), K.L("tahajjudAlarm.night1"), K.L("tahajjudAlarm.night2")];
    const yaz = (saatler) => saatler.map((s, i) => ["txt", "ut" + i, ust(K, g[i], i, s)]);
    return K.telefon({
      aria: `${K.L("tahajjudAlarm.timeSection")} › ${K.L("prayerTracking.tahajjudModeBeforeFajr")} · ${K.L("prayerTracking.tahajjudBeforeMin", { n: 30 })} › ${K.L("prayerTracking.tahajjudModeFixed")} 03:30`,
      views: [["a", alarmEkran(K, { on: true })]],
      tl: [["w", 900], ["tap", "m1"], ["off", "m0", "on"], ["on", "m1", "on"], ["on", "bf", "show"], ...yaz(["05:17", "05:18", "05:19"]), ["w", 900],
        ["tap", "b30"], ["off", "b60", "on"], ["on", "b30", "on"], ...yaz(["05:47", "05:48", "05:49"]), ["w", 1100],
        ["tap", "m2"], ["off", "m1", "on"], ["on", "m2", "on"], ["off", "bf", "show"], ["on", "fx", "show"], ...yaz(["03:30", "03:30", "03:30"]), ["w", 2400]],
      still: 0, hint: "m1",
    });
  },

  /** Geceler: Her gece secili; Sali ve Carsamba geceleri secilince liste yalniz o geceleri gosterir. */
  "teh-geceler": (K) => K.telefon({
    aria: `${K.L("tahajjudAlarm.nightsSection")} › ${K.L("tahajjudAlarm.preset.all")} › ${K.L("tahajjudAlarm.night2")}, ${K.L("tahajjudAlarm.night3")} › ${K.L("tahajjudAlarm.upcomingTitle")}`,
    views: [["a", alarmEkran(K, { on: true })]],
    tl: [["w", 600], ["y", "asc", "8.5"], ["w", 1100], ["tap", "g2"], ["off", "pall", "on"], ["on", "g2", "on"],
      ["txt", "ut0", ust(K, K.L("tahajjudAlarm.night2"), 0, "02:10")], ["on", "u1", "th-hid"], ["on", "u2", "th-hid"], ["w", 800],
      ["tap", "g3"], ["on", "g3", "on"], ["off", "u1", "th-hid"], ["txt", "ut1", ust(K, K.L("tahajjudAlarm.night3"), 1, "02:11")], ["w", 2600]],
    still: 2, hint: "g2",
  }),

  /** Alarm calar: Kapat -> Namazlarim'da Teheccud kildim. */
  "teh-caliyor": (K) => K.telefon({
    aria: `${K.L("tahajjudAlarm.alarmTitle")} › ${K.L("tahajjudAlarm.snooze")} · ${K.L("tahajjudAlarm.stop")} › ${K.L("prayerDetail.title")} › ${K.L("night.title")}`,
    views: [["l", caliyor(K)], ["n", nafile(K, { ust: false }), "fade"]],
    tl: [["w", 2200], ["tap", "stop"], ["go", "n"], ["w", 1300], ["tap", "tdot"], ["on", "tdot", "on"], ["w", 2400]],
    still: 0, hint: "stop",
  }),

  /** Merkez karti: iri ogeler; alarm anahtari acilir, sonra alarm calar. */
  "teheccud-kart": (K) => K.telefon({
    aria: `${K.L("night.title")} ${ARALIK} › ${K.L("night.alarm")} › ${K.L("tahajjudAlarm.alarmTitle")}`,
    views: [["k", kart(K)], ["l", caliyor(K), "fade"]],
    tl: [["w", 1100], ["tap", "ktg"], ["on", "ktg", "on"], ["w", 1500], ["go", "l"], ["w", 3200]],
    still: 5, hint: "ktg",
  }),
};

export const IKON = {
  thAlarm: '<circle cx="12" cy="13" r="7"/><path d="M12 9.5V13l2.3 1.6M4.5 5.5l2.6-2M19.5 5.5l-2.6-2M7 19l-1.5 1.8M17 19l1.5 1.8"/>',
  thSun: '<circle cx="12" cy="13.5" r="3.4"/><path d="M12 6.5v1.6M5 13.5h1.6M17.4 13.5H19M7 8.5l1.1 1.1M17 8.5l-1.1 1.1M4 19h16"/>',
  thNight: '<path d="M18 14.2A6.8 6.8 0 1 1 9.8 6a5.4 5.4 0 0 0 8.2 8.2z"/><path d="M17 4.5v2.4M15.8 5.7h2.4"/>',
  thSliders: '<path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="1.8" fill="currentColor"/><circle cx="15" cy="12" r="1.8" fill="currentColor"/><circle cx="8" cy="17" r="1.8" fill="currentColor"/>',
};

export const CSS = `
  /* gece: Namazlarim (usePhotoPalette, her zaman koyu) */
  .mp-s .lock.th-gc { --a-bg: #0f1c24; --a-card: rgba(23, 39, 48, .82); --a-ink: #e9f0f2; --a-mut: #8fa3aa; --a-line: rgba(140, 170, 180, .16); --a-pri: #6fb8a9; --a-on: #0b1519; --a-tg: #3a4d55;
    display: flex; flex-direction: column; color: var(--a-ink); background: radial-gradient(55% 30% at 30% 60%, rgba(120, 150, 140, .2), transparent 70%), linear-gradient(180deg, #1a2a33 0%, #10202a 45%, #0b1519 100%); }
  .mp-s .th-nh { display: grid; grid-template-columns: 2.6em 1fr 2.6em; align-items: center; padding: .35em 1em .45em; text-align: center; }
  .mp-s .th-nh b { font-size: 1.08em; }
  .mp-s .th-rb { width: 2.45em; height: 2.45em; border-radius: 50%; background: rgba(255, 255, 255, .1); display: grid; place-items: center; color: var(--a-ink); }
  .mp-s .th-clip { flex: 1; overflow: hidden; position: relative; }
  .mp-s .th-in { display: flex; flex-direction: column; gap: .55em; padding: .2em 1em 1.2em; }
  .mp-s .th-sl { display: block; font-size: .66em; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--a-mut); margin: .35em .3em -.25em; }
  :root[lang="ar"] .mp-s .th-sl { letter-spacing: 0; }
  .mp-s .th-gcard { background: var(--a-card); border: 1px solid var(--a-line); border-radius: 1.1em; overflow: hidden; }
  .mp-s .th-row { display: flex; align-items: center; gap: .65em; padding: .62em .9em; }
  .mp-s .th-row > .ic:first-child { color: var(--a-pri); width: 1.2em; height: 1.2em; }
  .mp-s .th-line { border-top: 1px solid var(--a-line); }
  .mp-s .th-f { flex: 1; min-width: 0; }
  .mp-s b.th-f { font-size: .9em; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .th-row > div { flex: 1; min-width: 0; }
  .mp-s .th-row > div b { display: block; font-size: .92em; }
  .mp-s .th-row > div small { display: block; color: var(--a-mut); font-size: .7em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .th-row > small { font-size: .8em; font-weight: 600; }
  .mp-s .th-row > small.th-mu { font-size: .66em; font-weight: 400; max-width: 40%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .th-mu { color: var(--a-mut); }
  .mp-s .th-cv { color: var(--a-mut); width: 1em !important; height: 1em !important; }
  .mp-s .th-pri, .mp-s .th-pri b { color: var(--a-pri); }
  .mp-s .th-sm .th-f { font-size: .82em; }
  .mp-s .th-dot { width: 1.5em; height: 1.5em; border-radius: 50%; box-shadow: inset 0 0 0 .1em var(--a-pri); display: grid; place-items: center; color: transparent; flex: none; transition: background .25s ease; }
  .mp-s .th-dot.ks { box-shadow: none; border: .1em dashed var(--a-pri); }
  .mp-s .th-dot .ic { width: .9em; height: .9em; }
  .mp-s .th-dot.on { background: var(--a-pri); color: var(--a-on); }
  .mp-s .th-nf { display: none; }
  .mp-s .th-nf.show { display: block; }
  .mp-s .th-night { border-top: 1px solid var(--a-line); }
  .mp-s .th-chips { display: flex; align-items: center; flex-wrap: wrap; gap: .32em; padding: 0 .9em .65em; }
  .mp-s .th-chips small { color: var(--a-mut); font-size: .66em; margin-inline-end: .2em; }
  .mp-s .th-chips span { min-width: 2.05em; text-align: center; padding: .22em .4em; border-radius: 1em; border: 1px solid var(--a-line); font-size: .74em; font-weight: 700; transition: background .25s ease; }
  .mp-s .th-chips span.on { background: var(--a-pri); border-color: var(--a-pri); color: var(--a-on); }
  .mp-s .th-witr { display: none; }
  .mp-s .th-witr.show { display: flex; }
  .mp-s .th-kz { display: flex; align-items: center; gap: .7em; padding: .7em .9em; }
  .mp-s .th-kz > div { flex: 1; min-width: 0; }
  .mp-s .th-kz b { display: block; font-size: .86em; }
  .mp-s .th-kz small { display: block; color: var(--a-mut); font-size: .68em; }
  .mp-s .th-ei { width: 2.3em; height: 2.3em; border-radius: 50%; background: color-mix(in srgb, var(--a-pri) 18%, transparent); display: flex; align-items: center; justify-content: center; gap: .18em; flex: none; }
  .mp-s .th-ei i { width: .36em; height: .36em; border-radius: 50%; background: var(--a-pri); }
  .mp-s .th-ei i:last-child { background: transparent; box-shadow: inset 0 0 0 .09em var(--a-pri); }
  /* ocean: alarm ekrani (teheccud-alarm.tsx) */
  .mp-s .th-ah { display: grid; grid-template-columns: 2.4em 1fr 2.4em; align-items: center; padding: .35em .9em .55em; text-align: center; }
  .mp-s .th-ah b { font-size: 1.04em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .th-ab { color: var(--a-pri); display: grid; place-items: center; }
  .mp-s .th-ab .ic { width: 1.4em; height: 1.4em; }
  .mp-s .th-card { background: var(--a-card); border: 1px solid var(--a-line); border-radius: 1em; }
  .mp-s .th-en { padding: .8em .9em; }
  .mp-s .th-en > div b { font-size: .9em; }
  .mp-s .th-en > div small { white-space: normal; font-size: .68em; line-height: 1.3; }
  .mp-s .th-body { padding: .75em .8em; display: flex; flex-direction: column; gap: .6em; }
  .mp-s .th-cr { display: flex; flex-wrap: wrap; gap: .35em; }
  .mp-s .th-c { border: 1px solid var(--a-line); border-radius: 1.2em; padding: .38em .7em; font-size: .7em; font-weight: 700; transition: background .25s ease, border-color .25s ease, color .25s ease; }
  .mp-s .th-c.on { border-color: var(--a-pri); background: var(--a-soft); color: var(--a-pri); }
  .mp-s .th-bf, .mp-s .th-fx { display: none; }
  .mp-s .th-bf.show { display: flex; }
  .mp-s .th-fx.show { display: flex; align-items: center; gap: .7em; }
  .mp-s .th-fx small { flex: 1; min-width: 0; color: var(--a-mut); font-size: .68em; }
  .mp-s .th-fx b { width: 4.6em; padding: .5em 0; text-align: center; border: 1px solid var(--a-line); border-radius: .6em; background: var(--a-in); font-size: 1em; }
  .mp-s .th-sep { display: block; height: 1px; background: var(--a-line); }
  .mp-s .th-nt { font-size: .64em; line-height: 1.35; }
  .mp-s .th-up { display: flex; align-items: center; gap: .5em; font-size: .84em; font-weight: 600; color: var(--a-mut); }
  .mp-s .th-up .ic { color: var(--a-pri); width: 1.05em; height: 1.05em; }
  .mp-s .th-on .th-up { color: var(--a-ink); }
  .mp-s .th-up.th-hid { display: none; }
  /* kilit ekrani: alarm caliyor */
  .mp-s .lock.th-lock { background: radial-gradient(80% 45% at 50% 18%, #24414e 0%, transparent 70%), linear-gradient(175deg, #142630 0%, #0a141a 75%); display: flex; flex-direction: column; }
  .mp-s .th-lt { text-align: center; margin-top: 1.1em; }
  .mp-s .th-lt small { display: block; font-size: .9em; opacity: .8; }
  .mp-s .th-lt b { display: block; font-size: 4.2em; font-weight: 600; line-height: 1.05; letter-spacing: -.02em; }
  .mp-s .th-ring { margin: auto 1em 0; display: flex; flex-direction: column; align-items: center; gap: .3em; text-align: center; }
  .mp-s .th-bell { width: 3.6em; height: 3.6em; border-radius: 50%; background: rgba(255, 255, 255, .14); display: grid; place-items: center; animation: th-bell 1.1s ease-in-out infinite; }
  .mp-s .th-bell .ic { width: 1.8em; height: 1.8em; color: #fff; }
  @keyframes th-bell { 0%, 100% { transform: rotate(0); } 15% { transform: rotate(-12deg); } 30% { transform: rotate(10deg); } 45% { transform: rotate(-6deg); } 60% { transform: rotate(0); } }
  @media (prefers-reduced-motion: reduce) { .mp-s .th-bell { animation: none; } }
  .mp-s .th-ring b { font-size: 1.55em; line-height: 1.2; margin-top: .25em; }
  .mp-s .th-ring small { font-size: .78em; opacity: .7; }
  .mp-s .th-lb { display: flex; gap: .7em; margin: 1.6em 1.2em 2.2em; }
  .mp-s .th-lb .bt { flex: 1; min-width: 0; height: 3.3em; border-radius: 2em; font-size: .95em; }
  .mp-s .bt.th-snz { background: rgba(255, 255, 255, .18); color: #fff; }
  .mp-s .bt.th-stop { background: #f2a33a; color: #1b1206; }
  /* merkez karti: iri */
  .mp-s .th-kg { align-items: stretch; }
  .mp-s .th-k { flex: 1; display: flex; flex-direction: column; align-items: center; gap: .35em; padding: 2.2em 1em 1em; text-align: center; font-size: 1.3em; }
  .mp-s .th-km { width: 3.2em; height: 3.2em; border-radius: 50%; background: color-mix(in srgb, var(--a-pri) 20%, transparent); display: grid; place-items: center; color: var(--a-pri); }
  .mp-s .th-km .ic { width: 1.7em; height: 1.7em; }
  .mp-s .th-kt { font-size: 1.05em; margin-top: .4em; }
  .mp-s .th-kr { font-size: 1.9em; line-height: 1.1; letter-spacing: -.01em; font-variant-numeric: tabular-nums; }
  .mp-s .th-kc { justify-content: center; padding: .7em 0 0; font-size: 1.05em; }
  .mp-s .th-ka { align-self: stretch; margin-top: auto; padding: .75em .85em; }
  .mp-s .th-ka b.th-f { font-size: .82em; text-align: start; }
`;
