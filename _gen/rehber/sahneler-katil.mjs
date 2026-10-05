/**
 * "Davetle halkaya katilma" rehberinin ekranlari (5 Eki 2026).
 * Kaynak akislar (uygulama, salt okunur incelendi):
 *   davet karti        app/join/[id].tsx (DAVET, Katil, Simdilik Gec, Hos geldin penceresi)
 *   kodla katilma      app/join-group.tsx (Yapistir, Katil; kutu mesajin tamamini da tanir: lib/inviteCode.ts)
 *   Halkalar, hesapsiz app/(tabs)/halkalar.tsx (Halka kur / Davet koduyla katil, once "Adin ne?")
 *   uye halka ekrani   app/group/[id].tsx (uyede karsilama karti ve + dugmesi YOK)
 *   tur ortasi katilan app/flow/[id].tsx (flow.noAssignment + flow.noAssignmentNextRound)
 *   web sayfalari      legal repo join.html (STRINGS) ve halka.html (S, RT): uygulama metni DEGIL,
 *                      sitenin kendi metni; asagidaki WEB tablosu o dosyalardan birebir kopya.
 * Ornek veriler (ad, ithaf, tarih) dile gore EX'te. Cevsen yok, uzun tire yok.
 */

/** join.html ve halka.html dizeleri (dosyalardaki STRINGS / S / RT tablolarindan birebir). */
const WEB = {
  tr: { join: "Halkaya Katıl", opening: "Uygulaman varsa aç, yoksa aşağıdan indir.", inviteCode: "Davet Kodu", openApp: "Uygulamayı Aç", hint: "Uygulaman yok mu?",
    heroEyebrow: "Hatim niyeti", ongoing: "Hatim devam ediyor", lgDone: "tamamlandı", lgHeld: "üstlenildi", lgFree: "müsait", nextLbl: "Sıradaki bölüm",
    cuzN: "{n}. Cüz", freeIn: "{p} sayfa müsait", takeThis: "Bunu al", pagesRange: "Sayfa {a}-{b}", pageCount: "{p} sayfa", amountLbl: "Ne kadar okuyacaksın?",
    confirmQ: "Bu bölümü okuyacağını onaylıyor musun?", confirm: "Onaylıyorum, alıyorum", cancel: "Vazgeç", entrusted: "Sayfa {a}-{b} sana emanet edildi.",
    mayAccept: "Allah kabul etsin.", readNow: "Şimdi oku", until: "{d} tarihine kadar" },
  en: { join: "Join the Circle", opening: "Open the app, or install it below.", inviteCode: "Invite Code", openApp: "Open App", hint: "Don’t have the app yet?",
    heroEyebrow: "Intention of this recitation", ongoing: "The recitation is in progress", lgDone: "completed", lgHeld: "undertaken", lgFree: "available", nextLbl: "Next portion",
    cuzN: "Juz {n}", freeIn: "{p} pages available", takeThis: "Take this", pagesRange: "Pages {a}-{b}", pageCount: "{p} pages", amountLbl: "How much will you read?",
    confirmQ: "Do you confirm that you will read this portion?", confirm: "I confirm, I will take it", cancel: "Cancel", entrusted: "Pages {a}-{b} are entrusted to you.",
    mayAccept: "May Allah accept it.", readNow: "Read now", until: "Until {d}" },
  de: { join: "Dem Kreis beitreten", opening: "Öffne die App oder installiere sie unten.", inviteCode: "Einladungscode", openApp: "App öffnen", hint: "Du hast die App noch nicht?",
    heroEyebrow: "Absicht dieser Chatma", ongoing: "Die Chatma läuft", lgDone: "abgeschlossen", lgHeld: "übernommen", lgFree: "verfügbar", nextLbl: "Nächster Abschnitt",
    cuzN: "Dschuz {n}", freeIn: "{p} Seiten verfügbar", takeThis: "Diesen nehmen", pagesRange: "Seiten {a}-{b}", pageCount: "{p} Seiten", amountLbl: "Wie viel wirst du lesen?",
    confirmQ: "Bestätigst du, dass du diesen Abschnitt liest?", confirm: "Ich bestätige, ich nehme ihn", cancel: "Abbrechen", entrusted: "Die Seiten {a}-{b} sind dir anvertraut.",
    mayAccept: "Möge Allah es annehmen.", readNow: "Jetzt lesen", until: "Bis {d}" },
  fr: { join: "Rejoindre le cercle", opening: "Ouvre l’application, ou installe-la ci-dessous.", inviteCode: "Code d’invitation", openApp: "Ouvrir l’application", hint: "Tu n’as pas encore l’application ?",
    heroEyebrow: "Intention de cette khatma", ongoing: "La khatma est en cours", lgDone: "terminées", lgHeld: "prises", lgFree: "disponibles", nextLbl: "Portion suivante",
    cuzN: "Juz {n}", freeIn: "{p} pages disponibles", takeThis: "Prendre celle-ci", pagesRange: "Pages {a}-{b}", pageCount: "{p} pages", amountLbl: "Combien vas-tu lire ?",
    confirmQ: "Confirmes-tu que tu liras cette portion ?", confirm: "Je confirme, je la prends", cancel: "Annuler", entrusted: "Les pages {a}-{b} te sont confiées.",
    mayAccept: "Qu’Allah l’accepte.", readNow: "Lire maintenant", until: "Jusqu’au {d}" },
  ar: { join: "انضم إلى الحلقة", opening: "افتح التطبيق، أو ثبّته من الأسفل", inviteCode: "رمز الدعوة", openApp: "فتح التطبيق", hint: "أليس لديك التطبيق بعد؟",
    heroEyebrow: "نية هذه الختمة", ongoing: "الختمة جارية", lgDone: "مكتملة", lgHeld: "متعهَّد بها", lgFree: "متاحة", nextLbl: "الجزء التالي",
    cuzN: "الجزء {n}", freeIn: "{p} صفحة متاحة", takeThis: "خذ هذا", pagesRange: "الصفحات {a}-{b}", pageCount: "{p} صفحة", amountLbl: "كم ستقرأ؟",
    confirmQ: "هل تؤكد أنك ستقرأ هذا الجزء؟", confirm: "أؤكد، سآخذه", cancel: "إلغاء", entrusted: "الصفحات {a}-{b} أمانة لديك.",
    mayAccept: "تقبّل الله.", readNow: "اقرأ الآن", until: "حتى {d}" },
};

/** Ornek veriler (kullanicinin yazdigi seyler), uygulama metni degil. */
const EX = {
  tr: { ded: "Rahmetli dedemiz için", until: "12 Ekim" },
  en: { ded: "For our late grandfather", until: "12 October" },
  de: { ded: "Für unseren verstorbenen Großvater", until: "12. Oktober" },
  fr: { ded: "Pour notre défunt grand-père", until: "12 octobre" },
  ar: { ded: "لروح جدّنا رحمه الله", until: "12 أكتوبر" },
};

const DOMAIN = "manevihalka.app";
const f = (s, v) => s.replace(/\{(\w+)\}/g, (t, k) => (k in v ? v[k] : t));

// ── gorunumler ─────────────────────────────────────────────────────────────

/** Mesajlasma uygulamasi: yoneticinin gonderdigi davet mesaji (uygulamanin paylasim metni). */
function chat(K) {
  const X = K.X, url = `https://${DOMAIN}/join.html?code=${X.code}`;
  const msg = K.e(K.L("circleMenu.shareMessage", { name: X.circle, url: "§U§" }))
    .replace("§U§", `<bdi dir="ltr" class="kt-lnk"${K.attr("link")}>${K.e(url)}</bdi>`);
  const kod = K.e(K.L("common.labelValue", { label: K.L("group.shortCode"), value: "§C§" })).replace("§C§", `<bdi dir="ltr">${K.e(X.code)}</bdi>`);
  return `<div class="kt-chat-h"><span class="hb">${K.ic("back", "fl")}</span>${K.avatar(X.me)}<b>${K.e(X.me)}</b></div>
    <div class="kt-chat-b"><div class="kt-bub">${msg}<br>${kod}<small class="kt-tm">${K.num("9:40")}</small></div></div>
    <div class="kt-chat-in"><i></i>${K.ic("send", "fl")}</div>`;
}

/** Uygulamada davet karti (join/[id].tsx): DAVET, halka adi, aciklama, Katil, Simdilik Gec. */
function inviteCard(K) {
  return `<div class="kt-invpg"><div class="kt-inv">
      <span class="badge-ic">${K.ic("people")}</span>
      <small class="kt-lbl">${K.e(K.L("join.invite").toLocaleUpperCase(K.dil))}</small>
      <b class="t1 c">${K.e(K.X.circle)}</b>
      <small class="t2 c">${K.Le("join.inviteHint")}</small>
      ${K.bt(K.L("joinGroup.join"), { key: "join", cls: "blk lg", icon: "ktPlusC" })}
      <small class="kt-skip">${K.Le("join.skip")}</small>
    </div></div>`;
}

/** Halka ekrani, UYE gorunumu: karsilama karti ve sag alttaki + yok. toast: kodla katilinca ustte cikan bildirim. */
function memberCircle(K, { toast = false } = {}) {
  const X = K.X, members = 6;
  const sub = `${K.Le("group.createdOn")} ${K.e(X.date)} • ${K.e(K.L("group.membersCountPlural", { count: members }))}`;
  return `${K.hd({ title: X.circle, sub, right: ["leaf", "personAdd", "dots"] })}
    <div class="pg">
      <div class="seg2"><span class="on">${K.Le("group.readingsTab")}</span><span>${K.Le("group.membersTab", { count: members })}</span></div>
      <div class="cd task-row"${K.attr("taskRow")}><span class="tri">${K.ic("quran")}</span><div><small class="cap">${K.Le("group.sectionKuran")}</small><b>${K.e(X.task)}</b><small>30 ${K.Le("units.juz", { count: 30 })}</small></div><span class="act">${K.Le("group.statusActive")}</span></div>
    </div>${toast ? `<span class="kt-toast"${K.attr("toast")}>${K.ic("checkCircle")}<small>${K.Le("joinGroup.welcomeMsg", { name: X.circle })}</small></span>` : ""}`;
}

/** Halkalar sekmesi, hesap henuz yok: "Davet koduyla katil" dokunulabilir. Ikonlar halkalar.tsx ile ayni (people-circle, people, trending-up); "Halka kur" yalniz yazi. anonF1/anonDesc Cevsen icerdigi icin cizilmez. */
function circlesAnon(K) {
  return `<div class="pg pt">
      <div class="cd hero-cd"><span class="badge-ic">${K.ic("ktPeopleC")}</span>
        <b class="t1 c">${K.Le("circlesTab.anonTitle")}</b>
        <ul class="feat"><li>${K.ic("people")}${K.Le("circlesTab.anonF2")}</li><li>${K.ic("ktTrend")}${K.Le("circlesTab.anonF3")}</li></ul>
        ${K.bt(K.L("circlesTab.anonCreate"), { cls: "blk" })}
        ${K.bt(K.L("circlesTab.anonJoin"), { key: "joinBtn", cls: "blk ol" })}
      </div>
    </div>${K.tabbar("circles")}`;
}

/** "Halkaya Katil" ekrani (join-group.tsx): kutu + Yapistir + Katil. */
function joinScreen(K) {
  return `<div class="kt-jh"><span class="kt-jb">${K.ic("back", "fl")}</span><b>${K.Le("joinGroup.title")}</b></div>
    <div class="pg kt-jg">
      <div class="big-ic">${K.ic("ktEnter")}</div>
      <b class="t1 c">${K.Le("joinGroup.inviteQuestion")}</b>
      <small class="t2 c">${K.Le("joinGroup.inviteHint")}</small>
      <div class="kt-inrow">${K.ic("key")}<span class="in kt-in"${K.attr("codeIn")}><span class="ph">${K.Le("joinGroup.placeholder")}</span><span class="tx kt-code-tx"${K.attr("codeTx")}></span><i class="cr"></i></span>
        <span class="kt-paste"${K.attr("paste")}>${K.ic("ktClip")}<small>${K.Le("common.paste")}</small></span></div>
      ${K.bt(K.L("joinGroup.join"), { key: "joinGo", cls: "blk lg" })}
    </div>`;
}

/** Tarayici cubugu (uygulama ici tarayici ya da telefonun tarayicisi). */
function browserBar(K) {
  return `<div class="kt-br">${K.ic("x")}<span class="kt-url">${K.ic("ktLock")}<bdi dir="ltr">${DOMAIN}</bdi></span>${K.ic("dots")}</div>`;
}

/** join.html: davet kodu, Uygulamayi Ac, magaza dugmeleri (uygulamasi olmayan kisi burayi gorur). */
function joinPage(K) {
  const W = WEB[K.dil];
  return `${browserBar(K)}<div class="kt-web mid"><div class="kt-wc">
      <span class="kt-ring">${K.brand()}</span>
      <small class="kt-bn">Manevi Halka</small>
      <b class="kt-h">${K.e(W.join)}</b>
      <small class="kt-sub">${K.e(W.opening)}</small>
      <div class="kt-code"${K.attr("jcode")}><small>${K.e(W.inviteCode)}</small><b><bdi dir="ltr">${K.e(K.X.code)}</bdi></b></div>
      <span class="kt-wbtn"${K.attr("openApp")}>${K.e(W.openApp)}</span>
      <small class="kt-hint">${K.e(W.hint)}</small>
      <div class="kt-stores"><span${K.attr("store0")}>App Store</span><span>Google Play</span></div>
    </div></div>`;
}

/** Kamera ile QR okutma (telefonun kendi kamerasi; uygulama ekrani degil). */
function camera(K) {
  return `<div class="lock kt-cam">
      <div class="kt-vf"><i></i><i></i><i></i><i></i><span class="qr" aria-hidden="true"></span></div>
      <span class="kt-chip"${K.attr("qrchip")}>${K.ic("link")}<bdi dir="ltr">${DOMAIN}</bdi></span>
      <span class="kt-shut" aria-hidden="true"></span>
    </div>`;
}

/** halka.html, ortak havuzlu tek seferlik hatim: niyet, ilerleme, siradaki bolum. */
function webBoard(K) {
  const W = WEB[K.dil], E = EX[K.dil];
  return `${browserBar(K)}<div class="kt-web">
      <div class="kt-wc"><small class="kt-eb">${K.e(W.heroEyebrow)}</small><b class="kt-h">${K.e(E.ded)}</b><i class="kt-rule"></i>
        <small class="kt-sub">${K.e(K.X.task)}</small><small class="kt-hint">${K.e(f(W.until, { d: E.until }))}</small></div>
      <div class="kt-wc st"><b class="kt-wt">${K.e(W.ongoing)}</b><span class="kt-pb"><i style="width:17%"></i><i style="width:3%"></i></span>
        <div class="kt-lg"><span><i class="d"></i>100 ${K.e(W.lgDone)}</span><span><i class="h"></i>20 ${K.e(W.lgHeld)}</span><span><i></i>484 ${K.e(W.lgFree)}</span></div></div>
      <div class="kt-wc"><small class="kt-eb">${K.e(W.nextLbl)}</small><b class="kt-h">${K.e(f(W.cuzN, { n: 7 }))}</b><small class="kt-sub">${K.e(f(W.freeIn, { p: 20 }))}</small>
        <span class="kt-wbtn"${K.attr("take")}>${K.e(W.takeThis)}</span></div>
    </div>`;
}

/** halka.html onay: sayfa araligi, ne kadar okuyacaksin, Onayliyorum. */
function webConfirm(K) {
  const W = WEB[K.dil];
  return `${browserBar(K)}<div class="kt-web"><div class="kt-wc">
      <b class="kt-h"><bdi>${K.e(f(W.pagesRange, { a: 121, b: 140 }))}</bdi></b><small class="kt-sub">${K.e(f(W.pageCount, { p: 20 }))}</small>
      <i class="kt-rule"></i>
      <small class="kt-wt">${K.e(W.amountLbl)}</small>
      <div class="kt-amt"><span>5</span><span>10</span><span>15</span><span class="on">20</span></div>
      <small class="kt-sub">${K.e(W.confirmQ)}</small>
      <span class="kt-wbtn"${K.attr("ok")}>${K.e(W.confirm)}</span>
      <small class="kt-hint">${K.e(W.cancel)}</small>
    </div></div>`;
}

/** halka.html tamam: emanet edildi, Allah kabul etsin, Simdi oku. */
function webDone(K) {
  const W = WEB[K.dil];
  return `${browserBar(K)}<div class="kt-web"><div class="kt-wc kt-ok">
      <span class="okring">${K.ic("check")}</span>
      <b class="kt-wt"><bdi>${K.e(f(W.entrusted, { a: 121, b: 140 }))}</bdi></b>
      <small class="kt-sub">${K.e(W.mayAccept)}</small>
      <span class="kt-wbtn">${K.ic("book")}${K.e(W.readNow)}</span>
    </div></div>`;
}

/** Gorev ekrani, tur ortasinda katilan uye: bu turda gorev yok, payin sonraki turla gelecek. */
function taskNoShare(K) {
  const X = K.X;
  return `${K.hd({ title: X.task, sub: `${K.Le("flow.roundNo", { n: 3 })} • ${K.Le("flow.roundsLeft", { count: 4 })}`, right: ["info"] })}
    <div class="pg">
      <div class="cd prog"><div class="row sp"><b>${K.Le("flow.circleProgress")}</b><small>10 / 30 ${K.Le("units.juz", { count: 30 })}</small></div><i class="bar"><i style="width:33%"></i></i></div>
      <div class="seg"><span class="on">${K.ic("flag")}${K.Le("flow.tabTask")}</span><span>${K.ic("people")}${K.Le("flow.tabCircle")}</span></div>
      <div class="gcard"><small class="cap">${K.e(K.L("flow.myTask"))}</small><b class="kt-na">${K.Le("flow.noAssignment")}</b><small class="kt-nas">${K.Le("flow.noAssignmentNextRound")}</small></div>
    </div>`;
}

/** Hos geldin penceresi (linkle katilinca, simgeli Halka Karti). */
function welcome(K) {
  return `<div class="card-c"><span class="badge-ic">${K.ic("people")}</span><b class="t1 c">${K.Le("join.welcome")}</b>
      <small class="t2 c">${K.Le("join.welcomeMsg", { name: K.X.circle })}</small>${K.bt(K.L("common.ok"), { key: "welOk", cls: "blk" })}</div>`;
}

// ── ekranlar ───────────────────────────────────────────────────────────────
export const SAHNE = {
  /** Mesajdaki linke dokun -> uygulamada davet karti. */
  "katil-link": (K) => K.telefon({
    aria: `${K.L("circleMenu.shareMessage", { name: K.X.circle, url: DOMAIN })} › ${K.L("join.invite")} › ${K.L("joinGroup.join")}`,
    views: [["m", chat(K)], ["i", inviteCard(K), "push"]],
    tl: [["w", 900], ["tap", "link"], ["go", "i"], ["w", 2200]],
    still: 0, hint: "link",
  }),

  /** Katil -> Adin ne? -> Hos geldin -> halka ekrani. */
  "katil-katil": (K) => K.telefon({
    aria: `${K.L("joinGroup.join")} › ${K.L("nameSheet.title")} › ${K.L("join.welcome")} › ${K.X.circle}`,
    views: [["i", inviteCard(K)], ["c", memberCircle(K), "push"]],
    overlays: [["n", K.O.nameSheet(), "pop"], ["w", welcome(K), "pop"]],
    tl: [["w", 800], ["tap", "join"], ["ov", "n"], ["w", 400], ["tap", "name"], ["type", "name", K.X.member], ["on", "nameOk", "en"], ["w", 300], ["tap", "nameOk"], ["cl", "n"],
      ["w", 300], ["ov", "w"], ["w", 1500], ["tap", "welOk"], ["cl", "w"], ["go", "c"], ["w", 1800]],
    still: 0, hint: "join",
  }),

  /** Uygulama yok: link tarayicida join.html'i acar -> kodu gor -> magaza. */
  "katil-sayfa": (K) => K.telefon({
    aria: `${WEB[K.dil].join}: ${WEB[K.dil].inviteCode} ${K.X.code} › App Store / Google Play`,
    views: [["m", chat(K)], ["p", joinPage(K), "push"]],
    tl: [["w", 800], ["tap", "link"], ["go", "p"], ["w", 1600], ["on", "jcode", "kt-glow"], ["w", 1400], ["tap", "store0"], ["w", 1200]],
    still: 3, hint: "jcode",
  }),

  /** Uygulamayi kurduktan sonra: Halkalar -> Davet koduyla katil -> Adin ne? -> Halkaya Katil ekrani. */
  "katil-kod-giris": (K) => K.telefon({
    aria: `${K.L("tabs.circles")} › ${K.L("circlesTab.anonJoin")} › ${K.L("nameSheet.title")} › ${K.L("joinGroup.title")}`,
    views: [["a", circlesAnon(K)], ["j", joinScreen(K), "push"]],
    overlays: [["n", K.O.nameSheet(), "pop"]],
    tl: [["w", 900], ["tap", "joinBtn"], ["ov", "n"], ["w", 400], ["tap", "name"], ["type", "name", K.X.member], ["on", "nameOk", "en"], ["w", 300], ["tap", "nameOk"], ["cl", "n"], ["go", "j"], ["w", 1800]],
    still: 0, hint: "joinBtn",
  }),

  /** Yapistir -> kod kutuya gelir -> Katil -> halka ekrani + basari bildirimi. */
  "katil-kod": (K) => K.telefon({
    aria: `${K.L("joinGroup.title")} › ${K.L("common.paste")} › ${K.X.code} › ${K.L("joinGroup.join")}`,
    views: [["j", joinScreen(K)], ["c", memberCircle(K, { toast: true }), "push"]],
    tl: [["w", 900], ["tap", "paste"], ["txt", "codeTx", K.X.code], ["on", "codeIn", "has"], ["w", 900], ["tap", "joinGo"], ["go", "c"], ["on", "toast", "show"], ["w", 2400]],
    still: 4, hint: "joinGo",
  }),

  /** QR: kamerayi tut -> baglanti -> davet karti. */
  "katil-qr": (K) => K.telefon({
    aria: `${K.L("group.qrCode")}: ${K.L("group.scanQrToJoin")} › ${K.L("join.invite")}`,
    views: [["q", camera(K)], ["i", inviteCard(K), "fade"]],
    tl: [["w", 1200], ["on", "qrchip", "show"], ["w", 1100], ["tap", "qrchip"], ["go", "i"], ["w", 2000]],
    still: 2, hint: "qrchip",
  }),

  /** Tek seferlik halka, uygulamasiz: Bunu al -> Onayliyorum -> emanet edildi. */
  "katil-web": (K) => K.telefon({
    aria: `${WEB[K.dil].heroEyebrow}: ${EX[K.dil].ded} › ${WEB[K.dil].takeThis} › ${WEB[K.dil].confirm} › ${f(WEB[K.dil].entrusted, { a: 121, b: 140 })}`,
    views: [["b", webBoard(K)], ["o", webConfirm(K), "push"], ["d", webDone(K), "push"]],
    tl: [["w", 1200], ["tap", "take"], ["go", "o"], ["w", 1300], ["tap", "ok"], ["go", "d"], ["w", 2400]],
    still: 0, hint: "take",
  }),

  /** Ana Sayfa > Gorevlerin karti -> gorev ekrani. */
  "katil-gorev": (K) => K.telefon({
    aria: `${K.L("tabs.home")} › ${K.L("dashboard.myTasks")} › ${K.X.task}`,
    views: [["h", K.V.home()], ["t", K.V.task(), "push"]],
    tl: [["w", 1100], ["tap", "tcard"], ["go", "t"], ["w", 2000]],
    still: 0, hint: "tcard",
  }),

  /** Tur ortasinda katilan: halka ekrani -> hatim -> bu turda gorev yok. */
  "katil-sonraki-tur": (K) => K.telefon({
    aria: `${K.X.task} › ${K.L("flow.noAssignment")} ${K.L("flow.noAssignmentNextRound")}`,
    views: [["c", memberCircle(K)], ["t", taskNoShare(K), "push"]],
    tl: [["w", 1000], ["tap", "taskRow"], ["go", "t"], ["w", 2600]],
    still: 3,
  }),

  /** Giris filmi: mesajdaki link -> davet karti -> Katil -> ad -> Hos geldin -> halka. */
  "film-katil": (K) => K.telefon({
    size: "lg",
    aria: `${K.L("join.invite")} › ${K.L("joinGroup.join")} › ${K.L("nameSheet.title")} › ${K.L("join.welcome")} › ${K.X.circle}`,
    views: [["m", chat(K)], ["i", inviteCard(K), "push"], ["c", memberCircle(K), "push"]],
    overlays: [["n", K.O.nameSheet(), "pop"], ["w", welcome(K), "pop"]],
    tl: [["w", 1000], ["tap", "link"], ["go", "i"], ["w", 1100], ["tap", "join"], ["ov", "n"], ["w", 300], ["tap", "name"], ["type", "name", K.X.member], ["on", "nameOk", "en"],
      ["tap", "nameOk"], ["cl", "n"], ["w", 300], ["ov", "w"], ["w", 1500], ["tap", "welOk"], ["cl", "w"], ["go", "c"], ["w", 2400]],
    still: 0, hint: "link",
  }),
};

export const IKON = {
  ktEnter: '<path d="M13.5 4H18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4.5"/><path d="M4 12h11M11 8l4 4-4 4"/>',
  ktClip: '<rect x="6" y="5" width="12" height="16" rx="2"/><path d="M9.5 5V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1"/>',
  ktLock: '<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M9 11V8a3 3 0 0 1 6 0v3"/>',
  ktPlusC: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  ktTrend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  ktPeopleC: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="10" r="3"/><path d="M6.3 18.4c1.1-2.4 3.2-3.6 5.7-3.6s4.6 1.2 5.7 3.6"/>',
};

export const CSS = `
  .mp-s .kt-chat-h { display: flex; align-items: center; gap: .55em; padding: .4em .9em .6em; background: var(--a-hd); border-bottom: 1px solid var(--a-line); }
  .mp-s .kt-chat-h b { font-size: .95em; }
  .mp-s .kt-chat-b { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; gap: .5em; padding: 1em .85em; background: color-mix(in srgb, var(--a-bg) 72%, var(--a-soft)); }
  .mp-s .kt-bub { align-self: flex-start; max-width: 88%; background: var(--a-card); border-radius: 1.05em; border-start-start-radius: .3em; padding: .6em .75em .4em;
    box-shadow: 0 .15em .45em -.2em rgba(0, 0, 0, .22); font-size: .8em; line-height: 1.42; }
  .mp-s .kt-lnk { color: var(--a-pri); text-decoration: underline; word-break: break-all; border-radius: .3em; }
  .mp-s .kt-tm { display: block; text-align: end; color: var(--a-mut); font-size: .78em; margin-top: .15em; }
  .mp-s .kt-chat-in { display: flex; align-items: center; gap: .6em; padding: .6em .9em 1.6em; background: var(--a-hd); color: var(--a-pri); }
  .mp-s .kt-chat-in i { flex: 1; height: 2.3em; border-radius: 1.2em; background: var(--a-in); border: 1px solid var(--a-line); }
  .mp-s .kt-invpg { flex: 1; display: flex; align-items: center; padding: 1.2em; }
  .mp-s .kt-inv { width: 100%; background: var(--a-card); border: 1px solid var(--a-line); border-radius: 1.5em; padding: 1.6em 1.2em 1em; display: flex; flex-direction: column; align-items: center; gap: .55em;
    box-shadow: 0 .8em 1.6em -1em rgba(0, 0, 0, .3); }
  .mp-s .kt-inv .badge-ic { width: 4.2em; height: 4.2em; }
  .mp-s .kt-inv .badge-ic .ic { width: 2.1em; height: 2.1em; }
  .mp-s .kt-inv .t1 { font-size: 1.5em; }
  .mp-s .kt-inv .t2 { margin-top: 0; }
  .mp-s .kt-inv .bt.lg { margin-top: .5em; }
  .mp-s .kt-lbl { color: var(--a-pri); font-weight: 800; font-size: .74em; letter-spacing: .12em; }
  :root[lang="ar"] .mp-s .kt-lbl { letter-spacing: 0; }
  .mp-s .kt-skip { color: var(--a-mut); font-weight: 600; padding: .3em; }
  .mp-s .kt-toast { position: absolute; z-index: 5; top: .7em; inset-inline: 1em; display: flex; align-items: center; gap: .5em; padding: .65em .85em; border-radius: 1.4em;
    background: var(--a-card); border: 1px solid var(--a-line); color: var(--a-ink); box-shadow: 0 .6em 1.4em -.7em rgba(0, 0, 0, .35);
    opacity: 0; transform: translateY(-1.2em); transition: opacity .35s ease, transform .45s cubic-bezier(.2, 1.1, .3, 1); }
  .mp-s .kt-toast .ic { color: var(--a-pri); }
  .mp-s .kt-toast small { font-size: .74em; font-weight: 600; }
  .mp-s .kt-toast.show { opacity: 1; transform: none; }
  .mp-s .kt-jh { display: flex; align-items: center; gap: .7em; padding: .5em 1.1em .7em; background: var(--a-hd); border-bottom: 1px solid var(--a-line); }
  .mp-s .kt-jh b { font-size: 1.12em; }
  .mp-s .kt-jb { display: grid; place-items: center; width: 2.3em; height: 2.3em; border-radius: .7em; border: 1px solid var(--a-line); color: var(--a-pri); }
  .mp-s .kt-jg { justify-content: center; gap: .75em; }
  .mp-s .kt-inrow { display: flex; align-items: center; gap: .45em; background: var(--a-card); border: 1px solid var(--a-line); border-radius: .85em; padding: .3em .4em .3em .7em; margin-top: .4em; }
  .mp-s .kt-inrow > .ic { color: var(--a-mut); }
  .mp-s .kt-in { flex: 1; min-width: 0; min-height: 2.4em; padding: 0 .2em; background: transparent; border: 0; }
  .mp-s .kt-in.typing { box-shadow: none; }
  .mp-s .kt-code-tx { font-weight: 700; letter-spacing: .08em; direction: ltr; }
  .mp-s .kt-paste { display: inline-flex; align-items: center; gap: .3em; padding: .4em .65em; border-radius: .6em; border: 1px solid var(--a-line); color: var(--a-pri); font-weight: 700; flex: none; }
  .mp-s .kt-paste small { font-size: .78em; }
  .mp-s .kt-br { display: flex; align-items: center; gap: .55em; padding: .35em .9em .55em; background: var(--a-hd); border-bottom: 1px solid var(--a-line); color: var(--a-mut); }
  .mp-s .kt-url { flex: 1; display: flex; align-items: center; justify-content: center; gap: .3em; padding: .35em .6em; border-radius: .7em; background: var(--a-in); color: var(--a-ink); font-size: .78em; }
  .mp-s .kt-url .ic { width: 1em; height: 1em; color: var(--a-mut); }
  .mp-s .kt-web { flex: 1; display: flex; flex-direction: column; gap: .6em; padding: .9em .9em 1em; background: var(--page); color: var(--ink); overflow: hidden; }
  .mp-s .kt-web.mid { justify-content: center; padding-bottom: 3em; }
  .mp-s .kt-wc { background: var(--paper); border: 1px solid var(--line); border-radius: 1.2em; padding: 1em .95em; display: flex; flex-direction: column; align-items: center; gap: .45em; text-align: center; }
  .mp-s .kt-wc.st { align-items: stretch; text-align: start; }
  .mp-s .kt-ring { display: grid; place-items: center; width: 4.4em; height: 4.4em; border-radius: 50%; border: .18em dotted var(--gold-soft); }
  .mp-s .kt-ring .bri { width: 3.1em; height: 3.1em; border-radius: .8em; }
  .mp-s .kt-bn, .mp-s .kt-eb { color: var(--gold); font-weight: 700; font-size: .62em; letter-spacing: .14em; text-transform: uppercase; }
  :root[lang="ar"] .mp-s .kt-bn, :root[lang="ar"] .mp-s .kt-eb { letter-spacing: 0; text-transform: none; font-size: .72em; }
  .mp-s .kt-h { display: block; font-family: var(--display); font-weight: 400; font-size: 1.45em; line-height: 1.15; color: var(--ink); }
  :root[lang="ar"] .mp-s .kt-h { font-family: inherit; font-weight: 700; font-size: 1.3em; line-height: 1.35; }
  .mp-s .kt-sub { color: var(--body); font-size: .76em; line-height: 1.4; }
  .mp-s .kt-hint { color: var(--muted); font-size: .7em; }
  .mp-s .kt-wt { font-size: .86em; color: var(--ink); }
  .mp-s .kt-rule { display: block; width: 2.4em; height: 1px; background: var(--gold-soft); margin: .1em 0; }
  .mp-s .kt-code { width: 100%; background: var(--mint); border-radius: .9em; padding: .55em; display: flex; flex-direction: column; gap: .1em; transition: box-shadow .4s ease; }
  .mp-s .kt-code small { color: var(--muted); font-size: .6em; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
  :root[lang="ar"] .mp-s .kt-code small { letter-spacing: 0; text-transform: none; font-size: .7em; }
  .mp-s .kt-code b { color: var(--green); font-size: 1.3em; letter-spacing: .16em; font-family: "SF Mono", Menlo, Consolas, monospace; }
  .mp-s .kt-code.kt-glow { box-shadow: 0 0 0 .2em color-mix(in srgb, var(--gold-soft) 70%, transparent); }
  .mp-s .kt-wbtn { display: flex; align-items: center; justify-content: center; gap: .4em; width: 100%; padding: .72em .8em; border-radius: 2em; background: var(--a-pri); color: var(--a-on); font-weight: 700; font-size: .82em; transition: transform .12s ease; }
  .mp-s .kt-stores { display: flex; gap: .45em; justify-content: center; }
  .mp-s .kt-stores span { padding: .45em .85em; border-radius: 2em; border: 1px solid var(--line); color: var(--green); font-weight: 700; font-size: .7em; transition: transform .12s ease; }
  .mp-s .kt-pb { display: flex; height: .5em; border-radius: 1em; background: color-mix(in srgb, var(--ink) 10%, transparent); overflow: hidden; }
  .mp-s .kt-pb i { display: block; height: 100%; background: var(--green); }
  .mp-s .kt-pb i + i { background: color-mix(in srgb, var(--green) 45%, var(--paper)); }
  .mp-s .kt-lg { display: flex; flex-wrap: wrap; gap: .2em .7em; font-size: .64em; color: var(--body); }
  .mp-s .kt-lg span { display: inline-flex; align-items: center; gap: .3em; }
  .mp-s .kt-lg i { width: .6em; height: .6em; border-radius: 50%; background: color-mix(in srgb, var(--ink) 18%, transparent); }
  .mp-s .kt-lg i.d { background: var(--green); } .mp-s .kt-lg i.h { background: color-mix(in srgb, var(--green) 45%, var(--paper)); }
  .mp-s .kt-amt { display: flex; gap: .4em; }
  .mp-s .kt-amt span { min-width: 2.4em; padding: .4em .5em; border-radius: 2em; border: 1px solid var(--line); font-weight: 700; font-size: .78em; }
  .mp-s .kt-amt span.on { background: var(--a-pri); color: var(--a-on); border-color: transparent; }
  .mp-s .kt-ok { gap: .6em; padding-top: 1.4em; }
  .mp-s .lock.kt-cam { background: #0b100f; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.6em; }
  .mp-s .kt-vf { position: relative; width: 11em; height: 11em; display: grid; place-items: center; }
  .mp-s .kt-vf i { position: absolute; width: 2em; height: 2em; border: .22em solid #f5c64a; }
  .mp-s .kt-vf i:nth-child(1) { top: 0; left: 0; border-right: 0; border-bottom: 0; border-top-left-radius: .7em; }
  .mp-s .kt-vf i:nth-child(2) { top: 0; right: 0; border-left: 0; border-bottom: 0; border-top-right-radius: .7em; }
  .mp-s .kt-vf i:nth-child(3) { bottom: 0; left: 0; border-right: 0; border-top: 0; border-bottom-left-radius: .7em; }
  .mp-s .kt-vf i:nth-child(4) { bottom: 0; right: 0; border-left: 0; border-top: 0; border-bottom-right-radius: .7em; }
  .mp-s .kt-vf .qr { margin: 0; }
  .mp-s .kt-chip { display: inline-flex; align-items: center; gap: .4em; padding: .55em 1em; border-radius: 2em; background: #f5c64a; color: #1b1b1b; font-weight: 700; font-size: .85em;
    opacity: 0; transform: translateY(.8em) scale(.95); transition: opacity .35s ease, transform .45s cubic-bezier(.2, 1.1, .3, 1); }
  .mp-s .kt-chip.show { opacity: 1; transform: none; }
  .mp-s .kt-chip.show.prs { transform: scale(.95); }
  .mp-s .kt-shut { width: 3.6em; height: 3.6em; border-radius: 50%; border: .25em solid rgba(255, 255, 255, .85); box-shadow: inset 0 0 0 .25em #0b100f, inset 0 0 0 2em rgba(255, 255, 255, .9); margin-top: 1em; }
  .mp-s .kt-na { font-size: 1.05em; line-height: 1.3; }
  .mp-s .kt-nas { color: rgba(255, 255, 255, .85); font-size: .8em; }
`;
