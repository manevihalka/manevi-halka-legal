/**
 * Rehber mini ekranlari (5 Eki 2026): uygulamanin ekranlarini sadeleserek HTML ile cizer.
 *
 * NEDEN HTML, GIF DEGIL: GIF/video her dilde ayri cekim ister, buyuk ve bulanik olur,
 * koyu temaya uymaz. Burada her ekran uygulamanin kendi renkleriyle (ocean tema) ve
 * kendi dugme adlariyla (L("anahtar"), _gen/rehber/app-labels.json) cizilir; parmak,
 * dokunma, yazma ve gecisler sayfadaki kucuk motorla (_gen/rehber.src.html) oynar.
 *
 * KURALLAR
 * - Dugme/baslik metni L() ile UYGULAMADAN gelir; yeni anahtar ekleyince
 *   `node _gen/sync-app-labels.mjs` calistir. Ornek veriler (ad, halka adi) ORNEK'te.
 * - Cevsen hicbir ekranda yazilmaz (site kurali). Sihirbazin 1. adimindaki Cevsen
 *   karosu bos iskelet olarak cizilir; Cevsen geçen aciklama anahtarlari kullanilmaz.
 * - Uzun tire YOK. Uygulamadaki push metni uzun tire tasiyor, burada virgul.
 * - Bir ekran = gorunumler (.vw, biri acik) + ustlukler (.ov) + zaman cizelgesi.
 *   Zaman cizelgesi adimlari ([fiil, ...]):
 *     ["go", v]        tabandaki gorunume gec (gecis turu gorunumun data-in'i: push/back/fade)
 *     ["ov", v]        ustluk ac (sheet/pop/share/banner)   ["cl", v] ustlugu kapat
 *     ["tap", k]       parmak data-k=k ogesine gider ve dokunur
 *     ["type", k, s]   data-k=k giris kutusuna harf harf yazar
 *     ["on", k, c] / ["off", k, c]   data-k=k ogesine sinif ekler/kaldirir
 *     ["y", k, n]      data-k=k kaydirma kabini n em yukari kaydirir
 *     ["w", ms]        bekle
 *   "still" (hareketi azalt / ilk kare): cizelgenin o adima kadarki hali aninda kurulur.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BURASI = dirname(fileURLToPath(import.meta.url));
const ETIKET = JSON.parse(readFileSync(join(BURASI, "app-labels.json"), "utf8"));

export const e = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** ICU'nun kucuk bir alt kumesi: {{x}}, {x}, {n, plural, one {...} other {...}} (# = sayi). */
export function fmt(s, v = {}, dil = "tr") {
  const kurallar = new Intl.PluralRules(dil);
  let out = "", i = 0;
  while (i < s.length) {
    const m = /^\{(\w+),\s*plural,/.exec(s.slice(i));
    if (!m) { out += s[i++]; continue; }
    let j = i + m[0].length, d = 1;
    const govde0 = j;
    while (j < s.length && d > 0) { if (s[j] === "{") d++; else if (s[j] === "}") d--; j++; }
    const govde = s.slice(govde0, j - 1), n = Number(v[m[1]]);
    const sec = {};
    for (let k = 0; k < govde.length;) {
      const t = /^\s*(=\d+|zero|one|two|few|many|other)\s*\{/.exec(govde.slice(k));
      if (!t) break;
      let p = k + t[0].length, dd = 1; const b = p;
      while (p < govde.length && dd > 0) { if (govde[p] === "{") dd++; else if (govde[p] === "}") dd--; p++; }
      sec[t[1]] = govde.slice(b, p - 1); k = p;
    }
    const metin = sec["=" + n] ?? sec[kurallar.select(n)] ?? sec.other ?? "";
    out += metin.replace(/#/g, String(n));
    i = j;
  }
  return out.replace(/\{\{(\w+)\}\}/g, (t, k) => (k in v ? v[k] : t)).replace(/\{(\w+)\}/g, (t, k) => (k in v ? v[k] : t));
}

/** Dile gore ornek veriler (kullanicinin yazdigi seyler: ad, halka adi). Uygulama metni DEGIL. */
export const ORNEK = {
  tr: { me: "Ömer", member: "Ayşe", names: ["Ömer", "Ayşe", "Yusuf", "Zeynep", "Mehmet"], circle: "Ailem", task: "Aile Hatmi",
    city: "Istanbul", date: "5 Eki 2026", code: "T4X6RC", pushTitle: "Yeni tur başladı!", pushBody: "“Aile Hatmi” 1. tur, yeni görevlerin atandı.",
    shareApps: ["WhatsApp", "Mesajlar", "Posta", "Telegram"], now: "şimdi", lockDate: "Pazartesi, 5 Ekim" },
  en: { me: "Omar", member: "Aisha", names: ["Omar", "Aisha", "Yusuf", "Maryam", "Bilal"], circle: "My Family", task: "Family Khatm",
    city: "London", date: "5 Oct 2026", code: "T4X6RC", pushTitle: "New round started!", pushBody: "“Family Khatm” round 1, new tasks assigned.",
    shareApps: ["WhatsApp", "Messages", "Mail", "Telegram"], now: "now", lockDate: "Monday, 5 October" },
  de: { me: "Omar", member: "Aischa", names: ["Omar", "Aischa", "Yusuf", "Maryam", "Bilal"], circle: "Meine Familie", task: "Familien-Chatma",
    city: "Berlin", date: "5. Okt. 2026", code: "T4X6RC", pushTitle: "Neue Runde gestartet!", pushBody: "„Familien-Chatma“ Runde 1, neue Aufgaben zugewiesen.",
    shareApps: ["WhatsApp", "Nachrichten", "Mail", "Telegram"], now: "jetzt", lockDate: "Montag, 5. Oktober" },
  fr: { me: "Omar", member: "Aïcha", names: ["Omar", "Aïcha", "Youssef", "Myriam", "Bilal"], circle: "Ma famille", task: "Khatma familiale",
    city: "Paris", date: "5 oct. 2026", code: "T4X6RC", pushTitle: "Nouveau tour !", pushBody: "« Khatma familiale » tour 1, nouvelles tâches attribuées.",
    shareApps: ["WhatsApp", "Messages", "Mail", "Telegram"], now: "maintenant", lockDate: "lundi 5 octobre" },
  ar: { me: "عمر", member: "عائشة", names: ["عمر", "عائشة", "يوسف", "مريم", "بلال"], circle: "عائلتي", task: "ختمة العائلة",
    city: "Riyadh", date: "5 أكتوبر 2026", code: "T4X6RC", pushTitle: "بدأت جولة جديدة!", pushBody: "“ختمة العائلة” الجولة 1، تم تعيين مهام جديدة.",
    shareApps: ["واتساب", "الرسائل", "البريد", "تيليجرام"], now: "الآن", lockDate: "الاثنين، 5 أكتوبر" },
};

/** Ikon cizimleri (24x24, cizgi). Sayfa basina bir kez <symbol> olarak basilir. */
export const IKON = {
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  fwd: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chev: '<path d="M9 5l7 7-7 7"/>',
  people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M15.6 14c2.6.1 4.6 1.8 5.1 4.6"/>',
  person: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6"/>',
  personAdd: '<circle cx="10" cy="8" r="3.4"/><path d="M3.5 20c.8-3.6 3.3-5.6 6.5-5.6 1.6 0 3 .5 4.1 1.4M18 11v6M15 14h6"/>',
  leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19l7-7"/>',
  dots: '<circle cx="12" cy="5.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="18.5" r="1.2" fill="currentColor"/>',
  share: '<path d="M12 15V4M8 8l4-4 4 4M6 12v7h12v-7"/>',
  shareSocial: '<circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="M8.2 10.9l6.6-3.7M8.2 13.1l6.6 3.7"/>',
  copy: '<rect x="8" y="8" width="11" height="12" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.8L16.3 9.5"/>',
  book: '<path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5v13c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5z"/><path d="M12 6v13.5"/>',
  home: '<path d="M4 11 12 4l8 7v9h-5v-6h-6v6H4z"/>',
  mosque: '<path d="M6 20v-7a6 6 0 0 1 12 0v7"/><path d="M4 20h16M12 4v3M10 20v-4a2 2 0 0 1 4 0v4"/>',
  flag: '<path d="M6 21V4M6 4h10l-2 4 2 4H6"/>',
  hand: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12M11 11V5a1.5 1.5 0 0 1 3 0v6M14 11V6.5a1.5 1.5 0 0 1 3 0V14c0 3.9-2.7 6.5-6 6.5-2.4 0-3.9-1.2-5.2-3.4L4.3 14.6a1.4 1.4 0 0 1 2.3-1.6L8 15"/>',
  archive: '<rect x="4" y="5" width="16" height="4" rx="1"/><path d="M5.5 9v10h13V9M10 13h4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M8.8 12l2.2 2.2 4.2-4.4"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  quran: '<path d="M3 17l9-5 9 5M12 12V5"/><path d="M5 9.5c2.4-.9 4.8-.6 7 1 2.2-1.6 4.6-1.9 7-1"/><path d="M4.5 17l2.5 2.5M19.5 17 17 19.5"/>',
  beads: '<circle cx="12" cy="12" r="7.5" stroke-dasharray="0 3.9" stroke-width="2.6" stroke-linecap="round"/><path d="M12 19.5v2.5"/>',
  bookClosed: '<path d="M5 4.5h11a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3z"/><path d="M5 16.5a3 3 0 0 1 3-3h11"/>',
  moon: '<path d="M19 14.5A7.5 7.5 0 1 1 9.5 5a6 6 0 0 0 9.5 9.5z"/>',
  cap: '<path d="M2.5 9.5 12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5V16c3 2.2 8 2.2 11 0v-4.5"/>',
  open: '<path d="M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5v13c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5z"/>',
  pray: '<path d="M10 4.5v9.5l-3 5.5M14 4.5v9.5l3 5.5M10 9h4"/>',
  apple: '<path d="M15.5 4.5c-.9.1-2 .7-2.6 1.5-.6.7-1 1.7-.9 2.6 1 .1 2-.5 2.6-1.3.6-.8 1-1.8.9-2.8zM17.6 12.6c0-1.9 1.6-2.9 1.7-2.9-.9-1.3-2.4-1.5-2.9-1.5-1.2-.1-2.4.7-3 .7s-1.6-.7-2.6-.7c-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7.9 1.5 2 2.5 2 1 0 1.4-.6 2.6-.6s1.5.6 2.6.6c1.1 0 1.8-1 2.4-1.9.8-1.1 1.1-2.2 1.1-2.2s-2.1-.8-2.1-3.5z" fill="currentColor" stroke="none"/>',
  google: '<path d="M20 12.2c0-.6-.1-1.2-.2-1.7H12v3.3h4.5a3.9 3.9 0 0 1-1.7 2.5v2.1h2.7c1.6-1.5 2.5-3.6 2.5-6.2z" fill="currentColor" stroke="none"/><path d="M12 20.5c2.3 0 4.2-.8 5.5-2.1l-2.7-2.1c-.7.5-1.7.8-2.8.8-2.2 0-4-1.5-4.7-3.4H4.5v2.2a8.5 8.5 0 0 0 7.5 4.6z" fill="currentColor" stroke="none" opacity=".75"/><path d="M7.3 13.7a5 5 0 0 1 0-3.4V8.1H4.5a8.5 8.5 0 0 0 0 7.8z" fill="currentColor" stroke="none" opacity=".55"/><path d="M12 6.9c1.2 0 2.3.4 3.2 1.3l2.4-2.4A8.4 8.4 0 0 0 4.5 8.1l2.8 2.2C8 8.4 9.8 6.9 12 6.9z" fill="currentColor" stroke="none" opacity=".9"/>',
  chat: '<path d="M4 18.5l1.3-3.6A7.5 7.5 0 1 1 8.6 18z"/>',
  mail: '<rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M4 7l8 6 8-6"/>',
  send: '<path d="M20.5 4 3.5 11l6.5 2.5L12.5 20z"/><path d="M10 13.5 20.5 4"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1.2-1.2"/>',
  calendar: '<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
  edit: '<path d="M5 19l1-4 9.5-9.5 3 3L9 18z"/>',
  hourglass: '<path d="M7 4h10M7 20h10M8 4c0 4 8 4 8 8s-8 4-8 8M16 4c0 3.5-8 4.5-8 8"/>',
  web: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.5 3.6 5.3 3.6 8.5s-1.2 6-3.6 8.5c-2.4-2.5-3.6-5.3-3.6-8.5S9.6 6 12 3.5z"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2M18 14h2M14 18h2v2M18 18h2v2"/>',
  key: '<circle cx="8" cy="15" r="3.5"/><path d="M10.5 12.5 19 4M16 7l2.5 2.5M14 9l2 2"/>',
};
export function ikonSprite(kullanilan) {
  const ids = [...kullanilan].filter((k) => IKON[k]);
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">${ids
    .map((k) => `<symbol id="r-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IKON[k]}</symbol>`)
    .join("")}</svg>`;
}

/**
 * Bir dil icin mini ekran takimi. Dondurulen nesnede gorunum yapicilari (V) ve
 * hazir ekranlar (sahne) vardir. `kullanilan` sayfadaki ikonlari toplar.
 */
export function kit(dil) {
  const T = ETIKET[dil];
  if (!T) throw new Error("app-labels.json: dil yok " + dil);
  const X = ORNEK[dil];
  const rtl = dil === "ar";
  const kullanilan = new Set();
  const L = (k, v) => {
    if (!(k in T)) throw new Error(`app-labels.json: ${dil} "${k}" yok (node _gen/sync-app-labels.mjs)`);
    return fmt(T[k], v, dil);
  };
  const Le = (k, v) => e(L(k, v));
  /** Arapcada sayi dizisi (3 / 5, 1–30) sagdan sola dizilmesin. */
  const num = (s) => `<bdi dir="ltr">${e(s)}</bdi>`;
  const ic = (ad, cls = "") => { kullanilan.add(ad); return `<svg class="ic${cls ? " " + cls : ""}" aria-hidden="true"><use href="#r-${ad}"/></svg>`; };
  const k = (key) => (key ? ` data-k="${key}"` : "");

  // ── yapi taslari ──────────────────────────────────────────────────────────
  const bt = (label, { key, cls = "", icon, iconEnd } = {}) =>
    `<span class="bt ${cls}"${k(key)}>${icon ? ic(icon) : ""}<span>${e(label)}</span>${iconEnd ? ic(iconEnd, "fl") : ""}</span>`;
  const input = ({ key, ph = "", val = "", cls = "" } = {}) =>
    `<span class="in ${cls}${val ? " has" : ""}"${k(key)}><span class="ph">${e(ph)}</span><span class="tx">${e(val)}</span><i class="cr"></i></span>`;
  const tg = (on, key) => `<i class="tg${on ? " on" : ""}"${k(key)}></i>`;
  const chip = (label, on, key, sub) => `<span class="chp${on ? " on" : ""}"${k(key)}><b>${e(label)}</b>${sub ? `<small>${e(sub)}</small>` : ""}</span>`;
  const statusBar = () => `<div class="sb"><b>9:41</b><span class="sbi"><i class="sig"></i><i class="wifi"></i><i class="bat"></i></span></div>`;
  const hd = ({ title, sub, sub2, back = true, right = [], keyRight = {} } = {}) =>
    `<div class="hd">${back ? `<span class="hb">${ic("back", "fl")}</span>` : "<span></span>"}<div class="ht"><b>${e(title)}</b>${sub ? `<small>${sub}</small>` : ""}${sub2 ? `<small class="s2">${sub2}</small>` : ""}</div><span class="hr">${right
      .map((r) => `<span class="hi"${k(keyRight[r])}>${ic(r)}</span>`)
      .join("")}</span></div>`;
  const tabbar = (on) => {
    // Anahtarlar acik L() cagrisiyla yazilir: sync-app-labels.mjs onlari koddan toplar
    const it = [["read", "book", Le("tabs.read")], ["circles", "people", Le("tabs.circles")], ["home", "home", Le("tabs.home")], ["prayer", "mosque", Le("tabs.explore")], ["profile", "person", Le("tabs.profile")]];
    return `<nav class="tab">${it.map(([id, ikon, ad]) => `<span class="ti${id === on ? " on" : ""}"${k("tab-" + id)}>${ic(ikon)}<small>${ad}</small></span>`).join("")}</nav>`;
  };
  const wizHd = (step, total, first) =>
    `<div class="wdots">${Array.from({ length: total }, (_, i) => `<i${i < step ? ' class="on"' : ""}></i>`).join("")}</div>`
    + `<div class="whd"><span class="wb">${ic("back", "fl")}<span>${first ? Le("wizard.cancel") : Le("wizard.back")}</span></span><small>${first ? e(L("wizard.stepOnly", { step: 1 })).replace("1", num("1")) : e(L("wizard.stepNofM", { step: "§", total: "¤" })).replace("§ / ¤", num(`${step} / ${total}`)).replace("§", num(String(step))).replace("¤", num(String(total)))}</small>${ic("x")}</div>`;
  const avatar = (name, cls = "") => `<span class="av ${cls}">${e(Array.from(name)[0])}</span>`;
  const brand = (cls = "") => `<img class="bri ${cls}" src="/img/brand-icon.webp" alt="" width="28" height="28" loading="lazy" decoding="async">`;
  const juz = (n) => L("flow.juzFormat", { juz: n });
  const createdLine = (members) => `${Le("group.createdOn")} ${e(X.date)} • ${e(L("group.membersCountPlural", { count: members }))}`;
  // "Her hafta" / "Every week": cumlenin basi buyuk harfli (uygulamadaki {{Every}})
  const everyWeek = L("wizard.everyWeeks", { count: 1 });
  const EveryWeek = everyWeek.charAt(0).toLocaleUpperCase(dil) + everyWeek.slice(1);

  // ── gorunumler: taban (.vw) ───────────────────────────────────────────────
  const V = {
    /** Halkalar sekmesi, hesabi olmayan kullanici: buyuk "Halka kur" karti. */
    circlesAnon: () => `<div class="pg pt">
        <div class="cd hero-cd"><span class="badge-ic">${ic("people")}</span>
          <b class="t1 c">${Le("circlesTab.anonTitle")}</b>
          <ul class="feat"><li>${ic("check")}${Le("circlesTab.anonF2")}</li><li>${ic("check")}${Le("circlesTab.anonF3")}</li></ul>
          ${bt(L("circlesTab.anonCreate"), { key: "create", cls: "blk", icon: "plus" })}
          ${bt(L("circlesTab.anonJoin"), { cls: "blk ol" })}
        </div>
      </div>${tabbar("circles")}`,

    /** "Yeni Halka Kur" formu. */
    createForm: () => `${hd({ title: L("createGroup.title"), back: true })}<div class="pg">
        <div class="big-ic">${ic("people")}</div>
        <b class="lb">${Le("createGroup.groupName")}</b>
        ${input({ key: "cname", ph: L("createGroup.groupNamePlaceholder") })}
        <b class="lb">${Le("createGroup.description")}</b>
        ${input({ ph: L("createGroup.descriptionPlaceholder"), cls: "ta" })}
        <div class="cd row tgl">${ic("eye")}<div><b>${Le("createGroup.detailedTrackingTitle")}</b><small>${Le("createGroup.detailedTrackingDesc")}</small></div>${tg(false)}</div>
        ${bt(L("createGroup.create"), { key: "cbtn", cls: "blk lg" })}
      </div>`,

    /** Halka ekrani, yeni kurulmus: "Halkan hazir" karsilama karti. inviteDone: biri katildi. */
    circleReady: ({ inviteDone = false, members = 1 } = {}) => `${hd({ title: X.circle, sub: createdLine(members), right: ["leaf", "personAdd", "dots"], keyRight: { personAdd: "invite" } })}
      <div class="pg">
        <div class="seg2"><span class="on">${Le("group.readingsTab")}</span><span>${Le("group.membersTab", { count: members })}</span></div>
        <div class="cd wel">
          <div class="wel-h"><div><b>${Le("group.welcome.title")}</b><small>${Le("group.welcome.subtitle")}</small></div>${ic("x")}</div>
          <div class="wst${inviteDone ? " done" : ""}"><span class="wn">${inviteDone ? ic("check") : num("1")}</span><div><b>${Le("group.welcome.step1Title")}</b>${inviteDone ? "" : `<small>${Le("group.welcome.step1Desc")}</small>${bt(L("group.welcome.step1Btn"), { key: "shareInv", cls: "sm pill", icon: "share" })}`}</div></div>
          <div class="wst"><span class="wn">${num("2")}</span><div><b>${Le("group.welcome.step2Title")}</b>${bt(L("group.welcome.step2Btn"), { key: "createTask", cls: `sm pill${inviteDone ? "" : " ol"}`, icon: "plus" })}</div></div>
        </div>
      </div><span class="fab"${k("fab")}>${ic("plus")}</span>`,

    /** Halka ekrani, Kur'an gorevi kurulmus. */
    circleWithTask: () => `${hd({ title: X.circle, sub: createdLine(5), right: ["leaf", "personAdd", "dots"] })}
      <div class="pg">
        <div class="seg2"><span class="on">${Le("group.readingsTab")}</span><span>${Le("group.membersTab", { count: 5 })}</span></div>
        <div class="cd task-row new"${k("taskRow")}><span class="tri">${ic("quran")}</span><div><small class="cap">${e(L("group.sectionKuran"))}</small><b>${e(X.task)}</b><small>30 ${Le("units.juz", { count: 30 })}</small></div><span class="act">${Le("group.statusActive")}</span></div>
      </div><span class="fab">${ic("plus")}</span>`,

    /** Sihirbaz 1: hedef turu. Cevsen karosu bos iskelet. */
    wiz1: () => `${wizHd(1, 5, true)}<div class="pg">
        <b class="t1">${Le("wizard.goalTypeQuestion")}</b><small class="t2">${Le("wizard.goalTypeHint")}</small>
        <b class="sec">${Le("practice.sectionReadings")}</b><small class="t2">${Le("practice.sectionReadingsDesc")}</small>
        <div class="grid2">
          <span class="tile"${k("wq")}>${ic("quran")}<b>${Le("wizard.goalQuran")}</b><small>${Le("wizard.goalQuranDesc")}</small></span>
          <span class="tile skel" aria-hidden="true"><i></i><i></i></span>
          <span class="tile"${k("wz")}>${ic("beads")}<b>${Le("wizard.goalZikir")}</b><small>${Le("wizard.goalZikirDesc")}</small></span>
          <span class="tile">${ic("bookClosed")}<b>${Le("wizard.goalBook")}</b><small>${Le("wizard.goalBookDesc")}</small></span>
        </div>
        <b class="sec">${Le("practice.sectionPractices")}</b><small class="t2">${Le("practice.sectionPracticesDesc")}</small>
        <div class="grid2"><span class="tile">${ic("moon")}<b>${Le("practice.typePrayer")}</b><small>${Le("practice.typePrayerDesc")}</small></span><span class="tile">${ic("cap")}<b>${Le("practice.typeMemorization")}</b><small>${Le("practice.typeMemorizationDesc")}</small></span><span class="tile">${ic("open")}<b>${Le("practice.typeReading")}</b><small>${Le("practice.typeReadingDesc")}</small></span><span class="tile">${ic("hand")}<b>${Le("practice.typeDua")}</b><small>${Le("practice.typeDuaDesc")}</small></span></div>
      </div>`,

    /** Sihirbaz 2: Kur'an hedefi. */
    wiz2: () => `${wizHd(2, 5)}<div class="pg">
        <b class="t1">${Le("wizard.quranTargetQuestion")}</b><small class="t2">${Le("wizard.quranTargetHint")}</small>
        <div class="opt on"><b>${Le("wizard.targetJuz")}</b><small>${Le("wizard.targetJuzSub")}</small>
          <div class="sub"><small class="cap">${Le("wizard.juzRangeLabel")}</small><div class="chps">${chip(L("wizard.fullHatim"), true, "full", L("wizard.fullHatimSub"))}${chip(L("wizard.customRange"), false, "", L("wizard.customJuzSub"))}</div></div></div>
        <div class="opt"><b>${Le("wizard.targetPage")}</b><small>${Le("wizard.targetPageSub")}</small></div>
        <div class="opt"><b>${Le("wizard.targetFree")}</b><small>${Le("wizard.targetFreeSub")}</small></div>
        ${bt(L("wizard.continue"), { key: "next2", cls: "blk lg", iconEnd: "fwd" })}
      </div>`,

    /** Sihirbaz 3: tur sikligi. */
    wiz3: () => `${wizHd(3, 5)}<div class="pg">
        <b class="t1">${Le("wizard.step3Title")}</b><small class="t2">${Le("wizard.step3Subtitle")}</small>
        <div class="freq"><span class="nb">${num("1")}</span>${chip(L("wizard.day"), false)}${chip(L("wizard.week"), true, "week")}<span class="mu">${Le("wizard.perRound")}</span></div>
        <hr>
        <b class="lb">${Le("wizard.startDateOptional")}</b>
        <div class="row sp"><small>${Le("wizard.startOnSpecificDate")}</small>${tg(false)}</div>
        <div class="note"${k("note3")}>${ic("info")}<div><b>${Le("wizard.summaryRoundExplain", { Every: EveryWeek, every: everyWeek })}</b><small>${Le("wizard.summaryDebtHint")}</small></div></div>
        <div class="cd row tgl">${ic("compass")}<div><b>${Le("wizard.observerModeTitle")}</b><small>${Le("wizard.observerModeDesc")}</small></div>${tg(false)}</div>
        ${bt(L("wizard.continue"), { key: "next3", cls: "blk lg", iconEnd: "fwd" })}
      </div>`,

    /** Sihirbaz 4: kisi basi cuz. */
    wiz4: () => `${wizHd(4, 5)}<div class="pg">
        <b class="t1">${Le("wizard.step4Title")}</b><small class="t2">${Le("wizard.step4SubtitleJuz")}</small>
        <div class="ro"><small>${Le("wizard.fullHatim")}</small><b>${e(L("wizard.juzRangeBetween", { start: "1", end: "30", total: 30 })).replace("1–30", num("1–30"))}</b><small>${Le("wizard.juzLocked")}</small></div>
        <b class="lb">${Le("wizard.perPersonPerRoundJuz")}</b>
        <span class="nb wide"${k("per")}>${num("1")}</span>
        <div class="note ok"${k("sum4")}>${ic("info")}<div><b>${Le("wizard.summaryJuzGroup", { Every: EveryWeek, every: everyWeek, perPerson: 1, amount: 5 })}</b><small>${Le("wizard.summaryHatimWeeks", { weeks: 6 })}</small></div></div>
        ${bt(L("wizard.continue"), { key: "next4", cls: "blk lg", iconEnd: "fwd" })}
      </div>`,

    /** Sihirbaz 5: gorev adi + onizleme. */
    wiz5: () => `${wizHd(5, 5)}<div class="pg">
        <b class="t1">${Le("wizard.step5Title")}</b><small class="t2">${Le("wizard.step5Subtitle")}</small>
        <b class="lb">${Le("wizard.circleTitle")}</b>
        ${input({ key: "tname", ph: L("wizard.placeholderHatim") })}
        <b class="lb">${Le("wizard.previewTitle")}</b>
        <div class="cd list">${X.names.map((n, i) => `<div class="li"><span>${e(n)}</span><b>${e(juz(i + 1))}</b></div>`).join("")}</div>
        <div class="cd row tgl"><div><b>${Le("wizard.autoAdvanceTitle")}</b><small>${Le("wizard.autoAdvanceDesc")}</small></div>${tg(true)}</div>
        <div class="tz">${ic("clock")}<small>${Le("wizard.wizardTimezoneLabel", { tz: X.city })}</small></div>
        ${bt(L("wizard.startCircle"), { key: "start", cls: "blk lg dis", iconEnd: "checkCircle" })}
      </div>`,

    /** Kilit ekrani + push. */
    lock: () => `<div class="lock"><div class="lk-t"><small>${e(X.lockDate)}</small><b>${num("9:41")}</b></div>
        <div class="push"${k("push")}>${brand()}<div><div class="ph-h"><b>Manevi Halka</b><small>${e(X.now)}</small></div><b>${e(X.pushTitle)}</b><small>${e(X.pushBody)}</small></div></div></div>`,

    /** Ana Sayfa (uye): Gorevlerin karti. */
    home: ({ done = false } = {}) => `<div class="pg pt">
        <small class="mu">${Le("dashboard.greeting")}</small><b class="t1 nm">${e(X.member)}</b>
        <div class="home2"><div><b class="lb">${Le("dashboard.myTasks")}</b>
          <div class="cd tcard"${k("tcard")}><small class="gr">${Le("dashboard.halkaOf", { name: X.circle })}</small><b>${e(X.task)}</b><small>${Le("dashboard.juzTask", { num: 2 })}</small>
            <div class="dots"><i></i><i></i><i></i><i></i><small>${Le("common.labelValue", { label: L("dashboard.progress"), value: "0/4" })}</small></div>
            <small class="gr">${Le("flow.roundsLeft", { count: 7 })}</small></div></div>
          <div class="ring-sk" aria-hidden="true"><i></i></div></div>
      </div>${tabbar("home")}`,

    /** Gorev ekrani (uye): Gorevim karti. */
    task: () => `${hd({ title: X.task, sub: `${Le("flow.roundNo", { n: 1 })} • ${Le("flow.roundsLeft", { count: 7 })}`, sub2: `0 / 30 ${Le("units.juz", { count: 30 })} • 5 ${Le("units.member", { count: 5 })}`, right: ["info"] })}
      <div class="pg sc"${k("tsc")}>
        <div class="cd prog"><div class="row sp"><b>${Le("flow.circleProgress")}</b><small>0 / 30 ${Le("units.juz", { count: 30 })}</small></div><i class="bar"><i style="width:4%"></i></i></div>
        <div class="seg"><span class="on">${ic("flag")}${Le("flow.tabTask")}</span><span>${ic("people")}${Le("flow.tabCircle")}</span></div>
        <div class="gcard">
          <small class="cap">${e(L("flow.myTask"))}</small>
          <b class="gbig">${e(juz(2))}</b>
          ${bt(L("quran.startReading"), { key: "read", cls: "sm pill glass", icon: "book" })}
          <div class="chunks"><small>${Le("flow.weeklyTargets")}</small><i class="bar w"><i style="width:0"></i></i><small>0/4</small></div>
          ${bt(L("flow.complete"), { key: "complete", cls: "blk wht", icon: "check" })}
          <div class="row2">${bt(L("flow.askHelp"), { key: "askHelp", cls: "sm ol w", icon: "hand" })}${bt(L("flow.excuse"), { key: "excuse", cls: "sm ol w", icon: "archive" })}</div>
        </div>
      </div>`,

    /** Kur'an okuyucusu (soyut sayfa, ayet metni cizilmez). */
    reader: () => `<div class="rd-h"><span class="hb">${ic("back", "fl")}</span><b>${Le("quran.title")}</b><span class="hr">${ic("book")}</span></div>
      <i class="rd-p"><i${k("rprog")}></i></i>
      <div class="seg mini"><span class="on">${Le("cevsen.tabArabic")}</span><span>${Le("cevsen.tabMeal")}</span></div>
      <div class="mushaf" aria-hidden="true">${Array.from({ length: 12 }, (_, i) => `<i style="--w:${[94, 88, 97, 91, 85, 96, 90, 93, 87, 95, 89, 60][i]}%"></i>`).join("")}</div>
      <div class="rd-nav"><span>${ic("chev", "fl rot")}</span><span class="pgn"${k("pgn")}>${num("٢١")}</span><span>${ic("chev", "fl")}</span></div>
      ${bt(L("hatim.markRead"), { key: "markRead", cls: "pill float", icon: "check" })}`,

    /** Tamamlandi: Elhamdulillah karti. */
    done: () => `${hd({ title: X.task, sub: `${Le("flow.roundNo", { n: 1 })} • ${Le("flow.roundsLeft", { count: 6 })}`, right: ["info"] })}
      <div class="pg">
        <div class="seg"><span class="on">${ic("flag")}${Le("flow.tabTask")}</span><span>${ic("people")}${Le("flow.tabCircle")}</span></div>
        <div class="cd donec">
          <div class="row"><span class="okc">${ic("check")}</span><div><b class="t1">${Le("taskDone.title")}</b><small>${Le("taskDone.readSub", { what: juz(2) })}</small></div></div>
          <div class="ringrow"><span class="bring">${Array.from({ length: 5 }, (_, i) => `<i class="${i === 1 ? "gold" : i === 0 ? "fill" : ""}" style="--i:${i}"></i>`).join("")}<b>${num("2 / 5")}</b><small>${Le("taskDone.ringDone")}</small></span>
            <div><b>${Le("taskDone.contributionAdded")}</b><small>${Le("taskDone.stillReading", { count: 3 })} · ${Le("taskDone.roundShort", { round: 1 })}</small></div></div>
          <div class="row2 line"><span class="mu">${ic("back", "fl")}${Le("flow.undo")}</span><span class="gr">${Le("taskDone.viewCircle")}${ic("chev", "fl")}</span></div>
        </div>
      </div>`,

    /** Gorev ekrani, Halka sekmesi: yardim bekleyenler + uyeler. */
    circleTab: () => `${hd({ title: X.task, sub: `${Le("flow.roundNo", { n: 3 })} • ${Le("flow.roundsLeft", { count: 3 })}`, right: ["info"] })}
      <div class="pg">
        <div class="seg"><span>${ic("flag")}${Le("flow.tabTask")}</span><span class="on">${ic("people")}${Le("flow.tabCircle")}<em class="rb">1</em></span></div>
        <div class="cd sos"><b class="red">${ic("hand")}${Le("flow.waitingForHelpTitle")}</b>
          <div class="row sp"><div><b>${e(X.names[3])}</b><small>${e(juz(14))} • ${Le("flow.helpPoolRemainingShort", { start: "271", end: "280", remaining: 10, unit: L("units.page", { count: 10 }) })}</small></div>${bt(L("flow.helpTitle"), { key: "helpBtn", cls: "sm red", icon: "hand" })}</div></div>
        <b class="lb">${Le("flow.circleMembersLabel")}</b>
        <div class="cd list mem">${X.names.map((n, i) => `<div class="li${i === 1 ? " me" : ""}">${avatar(n, ["g", "o", "g", "r", "o"][i])}<span>${i === 1 ? Le("flow.you") : e(n)}</span><b>${e(juz(11 + i))}</b></div>`).join("")}</div>
      </div>`,
  };

  // ── ustlukler (.ov) ───────────────────────────────────────────────────────
  const O = {
    nameSheet: () => `<div class="card-c"><span class="badge-ic">${ic("person")}</span><b class="t1 c">${Le("nameSheet.title")}</b><small class="t2 c">${Le("nameSheet.subtitle")}</small>
        ${input({ key: "name", ph: L("nameSheet.placeholder"), cls: "c" })}${bt(L("nameSheet.confirm"), { key: "nameOk", cls: "blk dis" })}<small class="mu c">${Le("common.cancel")}</small></div>`,
    secure: () => `<div class="sheet"><i class="grab"></i><span class="badge-ic">${ic("shield")}</span><b class="t1 c">${Le("secureNudge.title")}</b><small class="t2 c clamp">${Le("secureNudge.desc")}</small>
        ${bt(L("secureNudge.appleBtn"), { cls: "blk ink", icon: "apple" })}${bt(L("secureNudge.googleBtn"), { cls: "blk ol", icon: "google" })}
        <small class="gr c">${Le("secureNudge.emailLink")} ›</small><small class="mu c"${k("later")}>${Le("secureNudge.later")}</small></div>`,
    share: () => `<div class="sheet share"><div class="sh-msg">${brand()}<small>${e(L("circleMenu.shareMessage", { name: X.circle, url: "https://manevihalka.app/join.html?code=" + X.code }))}<br>${e(L("common.labelValue", { label: L("group.shortCode"), value: X.code }))}</small></div>
        <div class="sh-apps">${X.shareApps.map((a, i) => `<span${i === 0 ? k("app0") : ""}><i class="sa sa${i}">${ic(["chat", "chat", "mail", "send"][i])}</i><small>${e(a)}</small></span>`).join("")}</div>
        <div class="sh-rows"><span>${ic("copy")}<small>${Le("group.copy")}</small></span></div></div>`,
    invite: () => `<div class="sheet tall"><div class="row sp ih"><b>${Le("group.inviteToCircle")}</b>${ic("x")}</div><b class="c t1">${e(X.circle)}</b>
        <div class="cd iv"><small class="cap">${e(L("group.shortCode"))}</small><b class="code">${e(X.code)}</b><small>${Le("group.shareBySpeaking")}</small>${bt(L("group.copy"), { cls: "blk sm", icon: "copy" })}</div>
        <div class="cd iv"><small class="cap">${e(L("group.inviteLink"))}</small><b class="url">manevihalka.app/join.html?code=${e(X.code)}</b><div class="row2">${bt(L("group.copy"), { cls: "sm", icon: "copy" })}${bt(L("group.share"), { key: "invShare", cls: "sm", icon: "shareSocial" })}</div></div>
        <div class="cd iv"><small class="cap c">${e(L("group.qrCode"))}</small><span class="qr" aria-hidden="true"></span></div></div>`,
    success: () => `<div class="card-c"><span class="okring">${ic("check")}</span><b class="t1 c">${Le("common.success")}</b><small class="t2 c">${Le("group.circleStarted")}</small>
        <div class="row2">${bt(L("common.ok"), { cls: "gh" })}${bt(L("group.goToTaskScreen"), { key: "goTask" })}</div></div>`,
    readerConfirm: () => `<div class="card-c"><b class="t1 c">${Le("flow.readerFinishTitle")}</b><small class="t2 c">${e(L("flow.readerFinishBody", { start: "21", end: "40" })).replace("21–40", num("21–40"))}</small>
        <div class="row2">${bt(L("common.cancel"), { cls: "gh" })}${bt(L("hatim.markRead"), { key: "okRead" })}</div></div>`,
    helpAsk: () => `<div class="card-c"><b class="t1 c">${Le("flow.askHelp")}</b><small class="t2 c">${Le("flow.howManyUnitsSelf", { unit: L("units.page", { count: dil === "ar" ? 1 : 2 }), total: 20 })}</small>
        <span class="nb wide c"${k("selfN")}>${num("10")}</span><div class="row2">${bt(L("common.cancelAction"), { cls: "gh" })}${bt(L("flow.askHelp"), { key: "askOk" })}</div></div>`,
  };

  // ── ekran kurucu ──────────────────────────────────────────────────────────
  /**
   * views: [[id, html, gecis]] ilk taban gorunum acik baslar; overlays: [[id, html, tur]].
   * tl: zaman cizelgesi; still: hareketi azaltta kurulacak adim sayisi; aria: ekranin kisa anlatimi.
   */
  function telefon({ views, overlays = [], tl = [], still = 0, aria, size = "", hint }) {
    const vs = views.map(([id, html, gecis], i) => `<section class="vw${i === 0 ? " on" : ""}" data-v="${id}"${gecis ? ` data-in="${gecis}"` : ""}>${html}</section>`).join("");
    const os = overlays.map(([id, html, tur]) => `<div class="ov" data-v="${id}" data-in="${tur}"><i class="scrim"></i>${html}</div>`).join("");
    return `<figure class="mp${size ? " " + size : ""}" data-tl='${e(JSON.stringify(tl))}' data-still="${still}"${hint ? ` data-hint="${hint}"` : ""}>
      <div class="mp-f"><div class="mp-s" role="img" aria-label="${e(aria)}">${statusBar()}<div class="mp-b">${vs}${os}</div><i class="fg" aria-hidden="true"></i></div></div>
      <button type="button" class="mp-pp" aria-label="" hidden></button>
    </figure>`;
  }

  // Ek sahne dosyalari (sahneler-<id>.mjs) bu yapi taslarini K uzerinden kullanir.
  return { dil, L, Le, V, O, X, num, ic, bt, input, tg, chip, hd, wizHd, tabbar, avatar, brand, attr: k, e, telefon, kullanilan, rtl, juz, EveryWeek, everyWeek };
}
