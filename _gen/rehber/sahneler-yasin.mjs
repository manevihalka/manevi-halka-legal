/**
 * "Toplu 41 Yasin" rehberinin ekranlari (21 Kas 2026, 2.1.0).
 *
 * Uygulamada karsiligi: tek seferlik halkanin "41 Yasin" sablonu (app/create-event.tsx openTemplate
 * "yasin41": tek sure kalemi, Yasin Suresi, hedef 41, Toplu, surah 36; varsayilan bitis 3 gun).
 * Halka ekraninda tek sure kalemi "Oku" (eventCompose.readBtn) ile okuyucuda Yasin'in sayfalariyla
 * (439-444) acilir; son sayfada "Okudum", halka ekranina donunce sayac bir artar. Kitaptan okuyan
 * "Kitaptan okudum, isaretle" der. 41'e varinca halka kendiliginden tamamlanir (migration
 * 20261117_event_onetime_210 uretimde, release-notes-2.1.0 "KOSUL KARSILANDI 17 Kas").
 * Web: halka.html'de sure kalemi BUGUN sayacla katilir ("Sayima katil", "Katkimi ekle");
 * 2.1.0 web yamasi ("Okudum" dugmesi) bu depoda uygulanmamis, anlatilmaz.
 *
 * Gorunumler sahneler-tek.mjs'ten gelir; sahne kimlikleri "yasin-" ile baslar.
 */
import {
  sablon, ozet, kiminPencere, bitisPencere, bitisAdimlari, bitisSonrasi, altSatir, niyetCumlesi, hazir, paylasim,
  halka, boncuk, anaDugme, tel, kalan, davetKart, okuyucu, onay, tost, netice, JT, W, webKabuk, webUst, ornek,
} from "./sahneler-tek.mjs";

/** Okuyucunun sure adi (lib/quran.ts getSurahLabel(36, dil)). */
const SURE = { tr: "Yâsîn", en: "Ya-Sin", de: "Ya-Sin", fr: "Ya-Sin", ar: "يس" };
/** Kalemin Arapca adi (create-event.tsx yasin41). */
const AR = "سُورَةُ يٰس";

const sifa = (K) => niyetCumlesi(K, "sifa");
const ad = (K) => K.L("eventCompose.tplYasin41");

/** "Oku" dugmesinin ikinci satiri: Sayfa 439-444 · yaklasik 12 dk. */
const okuAlt = (K) => [K.L("compose.pageRange", { start: 439, end: 444 }), K.L("readTogether.minutes", { count: 12 })].join(" · ");

/**
 * 41 Yasin halka ekrani. s: { n (halkanin toplami), mine (kisinin okumasi), done, st (ek boncuk asamalari),
 * footer, sc, toast, ringKey, bigKey }.
 */
function yasinHalka(K, s = {}) {
  const n = s.n ?? 12, done = !!s.done;
  const ring = boncuk(K, { n: 41, f: done ? 41 : n, st: s.st || [], big: String(done ? 41 : n), small: "/ 41", key: s.ringKey, bigKey: s.bigKey });
  const footer = done ? JT(K, "accepted") : s.footer || `${kalan(K, 2, 5)} · ${K.L("eventScreen.tempoLeft", { amount: K.L("eventCompose.unitTimes", { count: 3 }) })}`;
  const mine = done
    ? anaDugme(K, JT(K, "result"), { key: "res" }) + `<small class="tk-note">${K.Le("eventScreen.readMine", { n: s.mine || 1 })}</small>`
    : anaDugme(K, K.L("eventCompose.readBtn"), { sub: okuAlt(K), icon: "book", key: "read" })
      + `<span class="tk-link"${K.attr("book")}>${K.ic("check")}<span>${K.Le("readTogether.markFromBook")}</span></span>`
      + (s.mine ? `<small class="tk-note">${K.Le("eventScreen.readMine", { n: s.mine })}</small>` : "");
  return halka(K, {
    done, ded: sifa(K), title: ad(K), ring, footer, mine, sc: s.sc,
    inv: davetKart(K, { count: 10, guests: 2, hint: K.L("event.webNoteList"), compact: done }),
    toast: s.toast || "",
  });
}

/** Web: zikir tahtasi (halka.html renderZikirBoard), tek sure kalemi. 2.1.0 (17 Kas 2026): sure kaleminde sayac yok;
 *  "Sureyi kendi mushafindan oku" notu ve tek "Okudum" dugmesi (her dokunus bir okuma). */
function webTahta(K, { total = 12, mine = 0, added = false } = {}) {
  const pct = ((total / 41) * 100).toFixed(1);
  return webKabuk(K, `${webUst(K, { ded: sifa(K), title: ad(K), eb: "ebDua", until: ornek(K).webFriday })}
      ${added ? `<div class="yz-msg">${K.e(W(K, "zDone"))}</div>` : ""}
      <div class="tk-wp yz-panel"><small class="hd2">${K.e(W(K, "zHead"))}</small>
        <div class="yz-row"><b class="yz-n">${K.Le("event.presetYasin")}</b><span class="yz-ar" lang="ar" dir="rtl">${AR}</span>
          <span class="tk-wbar"><i class="d" style="width:${pct}%"></i></span>
          <div class="yz-nums"><span><b>${total}</b> / 41</span></div>
          ${mine ? `<small class="yz-mine">${K.e(W(K, "zMine", { n: mine }))}</small>` : ""}
          <small class="yz-hint">${K.e(W(K, "zReadHint"))}</small>
          <span class="tk-wbtn"${K.attr(added ? "" : "zRead")}>${K.e(W(K, "zRead"))}</span></div></div>`, added ? "wz2" : "wz1");
}

export const SAHNE = {
  /** Birlikte ne okuyalim? › 41 Yasin › ozet (Bu halka: 41 toplu, tempo). */
  "yasin-sablon": (K) => tel(K, {
    aria: `${K.L("eventCompose.pickTitle")} › ${K.L("eventCompose.tplYasin41")} › ${K.L("eventCompose.thisCircle")}`,
    views: [["p", sablon(K)], ["c", ozet(K, { tpl: "yasin" }), "push"]],
    tl: [["w", 1200], ["tap", "tY"], ["on", "tY", "on"], ["go", "c"], ["w", 2200], ["y", "csc", 8], ["w", 1500], ["y", "csc", 0], ["w", 900]],
    still: 1, hint: "tY",
  }),

  /** Kimin icin › Sifa niyetiyle › Ne zamana kadar › Cumaya kadar. */
  "yasin-kur": (K) => {
    const ded = sifa(K);
    return tel(K, {
      aria: `${K.L("eventCompose.rowFor")} › ${K.L("eventCompose.intentSifa")} › ${K.L("eventCompose.rowEnd")} › ${K.L("eventCompose.endFriday")}`,
      views: [["c", ozet(K, { tpl: "yasin" })]],
      overlays: [["f", kiminPencere(K), "sheet"], ["e", bitisPencere(K, { tpl: "yasin" }), "sheet"]],
      tl: [["w", 900], ["tap", "rFor"], ["ov", "f"], ["w", 600], ["tap", "iS"], ["on", "iS", "on"], ["txt", "dedTx", ded], ["on", "ded", "has"], ["w", 1100], ["tap", "forOk"], ["cl", "f"],
        ["txt", "rForV", ded], ["off", "rForV", "mu"], ["txt", "pvD", altSatir(K, "yasin", { ded, end: "days3" })], ["w", 900],
        ["tap", "rEnd"], ["ov", "e"], ["w", 600], ["tap", "eF"], ...bitisAdimlari(K, "yasin", "days3", "friday"), ["w", 1200], ["tap", "endOk"], ["cl", "e"],
        ...bitisSonrasi(K, "yasin", "friday", ded), ["w", 2200]],
      still: 8, hint: "iS",
    });
  },

  /** Halkayi ac › Halkan hazir › Davet et › dolu davet mesaji ("sen de oku"). */
  "yasin-davet": (K) => {
    const ded = sifa(K);
    return tel(K, {
      aria: `${K.L("eventCompose.cta")} › ${K.L("eventCompose.readyTitle")} › ${K.L("eventCompose.invite")}`,
      views: [["c", ozet(K, { tpl: "yasin", ded, end: "friday" })], ["r", hazir(K, { tpl: "yasin", name: ad(K), ded, end: "friday" }), "fade"]],
      overlays: [["sh", paylasim(K, { ded, name: ad(K), until: K.L("eventCompose.endFriday"), join: K.L("eventInvite.join.surah") }), "sheet"]],
      tl: [["w", 1000], ["tap", "open"], ["go", "r"], ["w", 1600], ["tap", "invite"], ["ov", "sh"], ["w", 2600], ["tap", "app0"], ["w", 600], ["cl", "sh"], ["w", 900]],
      still: 3, hint: "invite",
    });
  },

  /** Oku › okuyucuda Yasin › son sayfada Okudum › onay › sayac bir artar. */
  "yasin-oku": (K) => tel(K, {
    aria: `${K.L("eventCompose.readBtn")} › ${K.L("quran.title")} › ${K.L("hatim.markRead")} › ${K.L("readTogether.accepted")}`,
    views: [["h", yasinHalka(K, { n: 12, sc: "esc1" })], ["rd", okuyucu(K, { sayfa: "٤٣٩", float: true }), "push"],
      ["h2", yasinHalka(K, { n: 13, mine: 1, sc: "esc2", toast: tost(K, K.L("readTogether.accepted")) }), "back"]],
    overlays: [["rc", onay(K, { icon: "tkChecks", title: K.L("readTogether.readerFinishTitle"), msg: K.L("readTogether.readerFinishBody", { surah: SURE[K.dil] }), ok: K.L("hatim.markRead"), okKey: "rcOk" }), "pop"]],
    tl: [["w", 1100], ["tap", "read"], ["go", "rd"], ["w", 600], ["st", "rprog", "width", "33%"], ["txt", "pgn", "٤٤١"], ["w", 600], ["st", "rprog", "width", "66%"], ["txt", "pgn", "٤٤٣"], ["w", 600],
      ["st", "rprog", "width", "100%"], ["txt", "pgn", "٤٤٤"], ["on", "markRead", "show"], ["w", 800], ["tap", "markRead"], ["ov", "rc"], ["w", 1300], ["tap", "rcOk"], ["cl", "rc"],
      ["go", "h2"], ["w", 200], ["on", "toast", "show"], ["w", 2600]],
    still: 0, hint: "read",
  }),

  /** 40'tan 41'e: halka kendiliginden tamamlanir › Neticeyi gor › Netice. */
  "yasin-tamam": (K) => tel(K, {
    aria: `41 / 41 › ${K.L("event.statusCompleted")} › ${JT(K, "result")}`,
    views: [["h", yasinHalka(K, { n: 40, mine: 1, sc: "esc1", ringKey: "ring1", bigKey: "big1", st: [{ f: 41 }],
        footer: `${kalan(K, 0, 9, 20)} · ${K.L("eventScreen.tempoLeft", { amount: K.L("eventCompose.unitTimes", { count: 1 }) })}` })],
      ["h2", yasinHalka(K, { done: true, mine: 1, sc: "esc2", toast: tost(K, JT(K, "completed"), { action: JT(K, "result") }) }), "fade"],
      ["n", netice(K, { hatim: false, title: ad(K), ded: sifa(K), stats: [[JT(K, "readings", { n: 41 }), JT(K, "done")], [JT(K, "people", { n: 10 }), JT(K, "participantsLabel")]], mine: JT(K, "readings", { n: 1 }), item: [K.L("event.presetYasin"), "41 / 41"] }), "push"]],
    tl: [["w", 1500], ["on", "ring1", "s1"], ["txt", "big1", "41"], ["w", 700], ["go", "h2"], ["w", 150], ["on", "toast", "show"], ["w", 2200], ["tap", "res"], ["go", "n"], ["w", 2600]],
    still: 5, hint: "res",
  }),

  /** Uygulamasi olmayan: tarayicida sureyi kendi mushafindan okur, Okudum'a bir kez dokunur, toplam bir artar. */
  "yasin-web": (K) => tel(K, {
    aria: `manevihalka.app › ${W(K, "zRead")} › ${W(K, "zDone")}`,
    views: [["b", webTahta(K)], ["d", webTahta(K, { total: 13, mine: 1, added: true }), "fade"]],
    tl: [["w", 2000], ["tap", "zRead"], ["go", "d"], ["w", 3000]],
    still: 0, hint: "zRead",
  }),

  /** Giris filmi: 41 Yasin sablonu › Kimin icin › Halkayi ac › Davet et › halka ekrani. */
  "film-yasin": (K) => {
    const ded = sifa(K);
    return tel(K, {
      size: "lg",
      aria: `${K.L("eventCompose.tplYasin41")} › ${K.L("eventCompose.rowFor")} › ${K.L("eventCompose.cta")} › ${K.L("eventCompose.invite")} › ${K.L("eventCompose.readBtn")}`,
      views: [["p", sablon(K)], ["c", ozet(K, { tpl: "yasin" }), "push"], ["r", hazir(K, { tpl: "yasin", name: ad(K), ded, end: "days3" }), "fade"],
        ["h", yasinHalka(K, { n: 0, footer: `${kalan(K, 2, 23)} · ${K.L("eventScreen.tempoLeft", { amount: K.L("eventCompose.unitTimes", { count: 5 }) })}` }), "push"]],
      overlays: [["f", kiminPencere(K), "sheet"], ["sh", paylasim(K, { ded, name: ad(K), until: K.L("eventInvite.untilDate", { date: ornek(K).uDays3 }), join: K.L("eventInvite.join.surah") }), "sheet"]],
      tl: [["w", 1000], ["tap", "tY"], ["on", "tY", "on"], ["go", "c"], ["w", 1200],
        ["tap", "rFor"], ["ov", "f"], ["w", 500], ["tap", "iS"], ["on", "iS", "on"], ["txt", "dedTx", ded], ["on", "ded", "has"], ["w", 700], ["tap", "forOk"], ["cl", "f"],
        ["txt", "rForV", ded], ["off", "rForV", "mu"], ["txt", "pvD", altSatir(K, "yasin", { ded, end: "days3" })], ["w", 900],
        ["tap", "open"], ["go", "r"], ["w", 1100], ["tap", "invite"], ["ov", "sh"], ["w", 1500], ["tap", "app0"], ["w", 500], ["cl", "sh"], ["w", 500],
        ["tap", "goC"], ["go", "h"], ["w", 2400]],
      still: 0, hint: "tY",
    });
  },

  /** Merkez karti: Oku › 39, 40, 41 › Tamamlandi (kisa dongu, iri halka). */
  "yasin-kart": (K) => tel(K, {
    aria: `${K.L("eventCompose.tplYasin41")} › ${K.L("eventCompose.readBtn")} › 41 / 41 › ${K.L("event.statusCompleted")}`,
    views: [["h", yasinHalka(K, { n: 38, mine: 0, ringKey: "rk", bigKey: "bk", st: [{ f: 39 }, { f: 40 }, { f: 41 }] })],
      ["h2", yasinHalka(K, { done: true, mine: 1 }), "fade"]],
    tl: [["w", 1100], ["tap", "read"], ["on", "rk", "s1"], ["txt", "bk", "39"], ["w", 650], ["off", "rk", "s1"], ["on", "rk", "s2"], ["txt", "bk", "40"], ["w", 650],
      ["off", "rk", "s2"], ["on", "rk", "s3"], ["txt", "bk", "41"], ["w", 500], ["go", "h2"], ["w", 2800]],
    still: 14, hint: "res",
  }),
};

export const CSS = `
.mp-s .yz-msg { text-align: center; color: var(--green); font-size: .8em; font-weight: 600; padding: .2em 0; animation: tkin .45s ease; }
.mp-s .yz-panel .hd2 { margin-bottom: .2em; }
.mp-s .yz-row { display: flex; flex-direction: column; gap: .45em; }
.mp-s .yz-n { font-family: var(--display); font-weight: 400; font-size: 1.15em; color: var(--green); line-height: 1.2; }
:root[lang="ar"] .mp-s .yz-n { font-family: inherit; font-weight: 700; font-size: 1em; }
.mp-s .yz-ar { display: block; font-size: 1.15em; line-height: 1.7; text-align: right; color: var(--ink); }
.mp-s .yz-nums { display: flex; justify-content: space-between; font-size: .76em; color: var(--body); }
.mp-s .yz-nums b { color: var(--ink); }
.mp-s .yz-mine { color: var(--green); font-size: .7em; }
.mp-s .yz-hint { color: var(--body); font-size: .7em; line-height: 1.35; }
`;
