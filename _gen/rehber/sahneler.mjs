/**
 * Hazir ekranlar (5 Eki 2026). Icerik dosyalari bir adimin ekranini kimligiyle ister:
 *   sahne: "halka-kur"  ->  SAHNE["halka-kur"](K)
 * K = kit(dil) (sahne.mjs). Her ekran { html } doner; telefon() HTML'i kurar.
 *
 * Yeni ekran eklerken: once uygulamada gercek akisi koddan izle (rapor dosyalari),
 * gorunumu sahne.mjs'e ekle, metni L("anahtar") ile al, Cevsen YOK.
 */
import { e } from "./sahne.mjs";

export const SAHNE = {
  /** Halkalar sekmesi -> Halka kur -> Adin ne? -> form. */
  "halka-kur": (K) => K.telefon({
    aria: `${K.L("tabs.circles")} › ${K.L("circlesTab.anonCreate")} › ${K.L("nameSheet.title")}`,
    views: [["c", K.V.circlesAnon()], ["f", K.V.createForm(), "push"]],
    overlays: [["n", K.O.nameSheet(), "pop"]],
    tl: [["w", 700], ["tap", "tab-circles"], ["w", 300], ["tap", "create"], ["ov", "n"], ["w", 500], ["tap", "name"], ["type", "name", K.X.me], ["on", "nameOk", "en"], ["w", 300], ["tap", "nameOk"], ["cl", "n"], ["go", "f"], ["w", 1400]],
    still: 3, hint: "create",
  }),

  /** Formda halka adi -> Halkayi Kur -> guvence penceresi formun ustunde (Daha sonra) -> halka hazir.
   *  Dugme uygulamada hep etkin (bos adla tost verir), pasif cizilmez. */
  "halka-form": (K) => K.telefon({
    aria: `${K.L("createGroup.title")} › ${K.L("createGroup.create")}`,
    views: [["f", K.V.createForm()], ["r", K.V.circleReady(), "push"]],
    overlays: [["s", K.O.secure(), "sheet"]],
    tl: [["w", 700], ["tap", "cname"], ["type", "cname", K.X.circle], ["w", 400], ["tap", "cbtn"], ["ov", "s"], ["w", 1300], ["tap", "later"], ["cl", "s"], ["go", "r"], ["w", 1600]],
    still: 3, hint: "cname",
  }),

  /** Halkan hazir -> Davet linkini paylas -> paylasim sayfasi. */
  "davet-paylas": (K) => K.telefon({
    aria: `${K.L("group.welcome.title")} › ${K.L("group.welcome.step1Btn")}`,
    views: [["r", K.V.circleReady()]],
    overlays: [["sh", K.O.share(), "sheet"]],
    tl: [["w", 900], ["tap", "shareInv"], ["ov", "sh"], ["w", 1300], ["tap", "app0"], ["w", 500], ["cl", "sh"], ["w", 1200]],
    still: 1, hint: "shareInv",
  }),

  /** Basliktaki kisi+ -> Halkaya Davet Et penceresi (kod, link, QR). */
  "davet-penceresi": (K) => K.telefon({
    aria: `${K.L("group.inviteToCircle")}: ${[K.L("group.shortCode"), K.L("group.inviteLink"), K.L("group.qrCode")].join(K.dil === "ar" ? "، " : ", ")}`,
    views: [["r", K.V.circleReady()]],
    overlays: [["iv", K.O.invite(), "sheet"]],
    tl: [["w", 800], ["tap", "invite"], ["ov", "iv"], ["w", 2600], ["tap", "invShare"], ["w", 900], ["cl", "iv"], ["w", 900]],
    still: 1, hint: "invite",
  }),

  /** Kardesler katildi -> Gorev olustur -> Kur'an. */
  "gorev-olustur": (K) => K.telefon({
    aria: `${K.L("group.welcome.step2Btn")} › ${K.L("wizard.goalQuran")}`,
    views: [["r", K.V.circleReady({ inviteDone: true, members: 5 })], ["w1", K.V.wiz1(), "up"], ["w2", K.V.wiz2(), "push"]],
    tl: [["w", 900], ["tap", "createTask"], ["go", "w1"], ["w", 900], ["tap", "wq"], ["go", "w2"], ["w", 1500]],
    still: 1, hint: "createTask",
  }),

  /** Hazir gelen secimler: uc kez Devam. */
  "uc-devam": (K) => K.telefon({
    aria: `${K.L("wizard.targetJuz")} · ${K.L("wizard.fullHatim")} › ${K.L("wizard.week")} › 1`,
    views: [["w2", K.V.wiz2()], ["w3", K.V.wiz3(), "push"], ["w4", K.V.wiz4(), "push"]],
    tl: [["w", 1400], ["tap", "next2"], ["go", "w3"], ["w", 1700], ["tap", "next3"], ["go", "w4"], ["w", 1700], ["tap", "next4"], ["w", 800]],
    still: 0, hint: "next2",
  }),

  /** Gorev adi -> onizleme -> Gorevi Baslat -> Basarili. */
  "gorevi-baslat": (K) => K.telefon({
    aria: `${K.L("wizard.circleTitle")} › ${K.L("wizard.startCircle")} › ${K.L("group.circleStarted")}`,
    views: [["w5", K.V.wiz5()], ["ct", K.V.circleWithTask(), "fade"]],
    overlays: [["ok", K.O.success(), "pop"]],
    tl: [["w", 800], ["tap", "tname"], ["type", "tname", K.X.task], ["on", "start", "en"], ["w", 700], ["tap", "start"], ["go", "ct"], ["ov", "ok"], ["w", 2200]],
    still: 1, hint: "tname",
  }),

  /** Uye: bildirim -> gorev ekrani (push dogrudan gorevi acar; _layout.tsx flowId -> /flow/<id>). */
  "uye-bildirim": (K) => K.telefon({
    aria: `${K.X.pushTitle} › ${K.L("flow.myTask")}`,
    views: [["l", K.V.lock()], ["t", K.V.task(), "push"]],
    tl: [["w", 500], ["on", "push", "show"], ["w", 1500], ["tap", "push"], ["go", "t"], ["w", 1800]],
    still: 2, hint: "push",
  }),

  /** Uye: Okumaya Basla -> okuyucu -> son sayfa -> Okudum -> Elhamdulillah. */
  "uye-oku": (K) => K.telefon({
    aria: `${K.L("quran.startReading")} › ${K.L("hatim.markRead")} › ${K.L("taskDone.title")}`,
    views: [["t", K.V.task()], ["rd", K.V.reader(), "push"], ["d", K.V.done(), "back"]],
    overlays: [["c", K.O.readerConfirm(), "pop"]],
    tl: [["w", 800], ["tap", "read"], ["go", "rd"], ["w", 500],
      ["st", "rprog", "width", "25%"], ["txt", "pgn", "٢٦"], ["w", 650], ["st", "rprog", "width", "50%"], ["txt", "pgn", "٣١"], ["w", 650],
      ["st", "rprog", "width", "75%"], ["txt", "pgn", "٣٦"], ["w", 650], ["st", "rprog", "width", "100%"], ["txt", "pgn", "٤٠"], ["w", 400],
      ["on", "markRead", "show"], ["w", 700], ["tap", "markRead"], ["ov", "c"], ["w", 700], ["tap", "okRead"], ["cl", "c"], ["go", "d"], ["w", 2400]],
    still: 1, hint: "read",
  }),

  /** Uye: Yardim Iste -> kac sayfa kendin? */
  "yardim-iste": (K) => K.telefon({
    aria: `${K.L("flow.askHelp")} › ${K.L("flow.howManyUnitsSelf", { unit: K.L("units.page", { count: K.dil === "ar" ? 1 : 2 }), total: 20 })}`,
    views: [["t", K.V.task()]],
    overlays: [["h", K.O.helpAsk(), "pop"]],
    tl: [["w", 900], ["tap", "askHelp"], ["ov", "h"], ["w", 1300], ["tap", "askOk"], ["cl", "h"], ["w", 1000]],
    still: 0, hint: "askHelp",
  }),

  /** Halka sekmesi: Yardim Bekleyenler -> Yardim Et -> miktar penceresi (flow/[id].tsx: 4, 8, yarisi, tamami). */
  "yardim-et": (K) => K.telefon({
    aria: `${K.L("flow.waitingForHelpTitle")} › ${K.L("flow.helpTitle")} › ${K.L("flow.allWithCount", { count: 10 })}`,
    views: [["c", K.V.circleTab()]],
    overlays: [["hc", `<div class="card-c"><b class="t1 c">${K.Le("flow.helpTitle")}</b><small class="t2 c">${K.Le("flow.howManyUnitsHelp", { unit: K.L("units.page", { count: K.dil === "ar" ? 1 : 2 }), remaining: 10 })}</small>
        ${K.bt("4 " + K.L("units.page", { count: 4 }), { cls: "blk ol" })}${K.bt("8 " + K.L("units.page", { count: 8 }), { cls: "blk ol" })}${K.bt(`5 ${K.L("units.page", { count: 5 })} (${K.L("flow.half")})`, { cls: "blk ol" })}${K.bt(K.L("flow.allWithCount", { count: 10 }), { key: "hcAll", cls: "blk ol" })}${K.bt(K.L("common.cancelAction"), { cls: "blk gh" })}</div>`, "pop"]],
    tl: [["w", 1200], ["tap", "helpBtn"], ["ov", "hc"], ["w", 1300], ["tap", "hcAll"], ["cl", "hc"], ["w", 1000]],
    still: 0, hint: "helpBtn",
  }),

  /** Giris filmi: halka kurmaktan hatmi baslatmaya kadar tek akis. */
  "film-hatim": (K) => K.telefon({
    size: "lg",
    aria: `${K.L("circlesTab.anonCreate")} › ${K.L("createGroup.create")} › ${K.L("group.welcome.step2Btn")} › ${K.L("wizard.goalQuran")} › ${K.L("wizard.startCircle")}`,
    views: [["c", K.V.circlesAnon()], ["f", K.V.createForm(), "push"], ["r", K.V.circleReady({ inviteDone: true, members: 5 }), "push"],
      ["w1", K.V.wiz1(), "up"], ["w2", K.V.wiz2(), "push"], ["w3", K.V.wiz3(), "push"], ["w4", K.V.wiz4(), "push"], ["w5", K.V.wiz5(), "push"],
      ["ct", K.V.circleWithTask(), "fade"]],
    overlays: [["n", K.O.nameSheet(), "pop"], ["ok", K.O.success(), "pop"]],
    tl: [["w", 900], ["tap", "create"], ["ov", "n"], ["tap", "name"], ["type", "name", K.X.me], ["on", "nameOk", "en"], ["tap", "nameOk"], ["cl", "n"], ["go", "f"],
      ["tap", "cname"], ["type", "cname", K.X.circle], ["tap", "cbtn"], ["go", "r"], ["w", 900],
      ["tap", "createTask"], ["go", "w1"], ["w", 500], ["tap", "wq"], ["go", "w2"], ["w", 500], ["tap", "next2"], ["go", "w3"], ["w", 500], ["tap", "next3"], ["go", "w4"], ["w", 500], ["tap", "next4"], ["go", "w5"],
      ["tap", "tname"], ["type", "tname", K.X.task], ["on", "start", "en"], ["tap", "start"], ["go", "ct"], ["ov", "ok"], ["w", 2600]],
    still: 0, hint: "create",
  }),
};

/**
 * 30 taneli tur halkasi: her turda 5 kisi sirayla sonraki 5 cuzu alir, 6. turda hatim tamam.
 * Renkler kisiye gore (tane = o turda o kisiye dusen cuz). Metin dugumu svg disinda (okunur).
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
