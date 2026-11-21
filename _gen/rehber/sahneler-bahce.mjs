/**
 * Niyet Bahcesi rehberinin ekranlari (21 Kas 2026, 2.1.0).
 * Akislar uygulamanin kodundan izlendi (salt okunur):
 *   app/(tabs)/read.tsx            Oku: "Niyet Bahcen" karesi (garden.name, garden.readSub, kosede "Yeni") -> /bahce/niyetler
 *   components/garden/GardenIntro  ilk giriste bir kez uc sayfalik tanitim (Devam, Devam, "Ilk niyetini dik"; her sayfada "Gec")
 *   app/bahce/niyetler.tsx         Niyetlerim: bos halde ornek niyetler ve "Niyet dik"; doluyken bahce seridi ("Bahcene gir") ve satirlar
 *   app/bahce/dik.tsx              uc adim: 1 hangi amel (ornekler, "Zaten yaptiklarin", "Yeni bir niyet", "Kendim yazayim"),
 *                                  2 ritim ve asgari adim (bagli amellerde AmelLinkCard), 3 fidan (Onerilen) ve niyet cumlesi, "Dik"
 *   app/bahce/index.tsx            bahce: ustte sahne, altta "Bugun" paneli; ust cubukta geri, "Ara ver" (duraklat simgesi), "Niyet dik"
 *   components/garden/GardenPanels TodayPanel (serbestte "Bugun yaptim", baglida "Devam"), PlantCard, FortyCard (A'raf 7:142)
 *   components/garden/RestSheet    "Ara ver": Bugun, 3, 7, 14, 30 gun; hangi niyetler; hicbiri secili gelmez
 *   lib/garden/model.ts            sadakatle ~40 gunde olgunlasir; aksamadan gecen her hafta dibinde cicek, 6 haftada meyve
 * Uygulamadaki sahne uc boyutlu cini maket bahcedir; burada SADE bir cizim (svg): gece gogu, halka bicimli avlu, kubbe,
 * hurma ve fidanlar. Gercek goruntuyu taklit etmez. Tema "koyu" (b-bahce, b-niyetler, b-dik, b-kirk karelerindeki gibi
 * notr acik gri vurgu: `.bh` sarmalayicisi --a-pri'yi #c9c9d0 yapar).
 * Uzun tire YOK. Cevsen YOK.
 */

/** Dile gore ornek veriler (kisinin yazdigi niyet cumlesi, aranin son gunu). Uygulama metni DEGIL. */
const BX = {
  tr: { niyet: "Allah rızası için, her gün", son: "28 Kasım" },
  en: { niyet: "For the sake of Allah, every day", son: "28 November" },
  de: { niyet: "Um Allahs willen, jeden Tag", son: "28. November" },
  fr: { niyet: "Pour Allah, chaque jour", son: "28 novembre" },
  ar: { niyet: "ابتغاء وجه الله، كل يوم", son: "28 نوفمبر" },
};
// A'raf 7:142 (FortyCard ayeti, uygulamanin Mushaf metninden; her dilde ayni)
const AYET_142 = "وَوَٰعَدْنَا مُوسَىٰ ثَلَٰثِينَ لَيْلَةً وَأَتْمَمْنَٰهَا بِعَشْرٍ فَتَمَّ مِيقَٰتُ رَبِّهِۦٓ أَرْبَعِينَ لَيْلَةً";

// ── bahce cizimi (svg, viewBox 0 0 400 520) ─────────────────────────────────────
const rnd = (seed) => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
const n1 = (x) => Math.round(x * 10) / 10;
const CX = 200, CY = 326, RX = 190, RY = 116, DH = 40;
const ACI = [35, 145, 215, 325];

function gok() {
  const r = rnd(11);
  let s = "";
  for (let i = 0; i < 40; i++) {
    const x = n1(r() * 400), y = n1(r() * 250), rad = n1(0.5 + r() * 1.25), o = (0.3 + r() * 0.6).toFixed(2);
    s += `<circle cx="${x}" cy="${y}" r="${rad}" fill="#fff" opacity="${o}"${i % 5 === 0 ? ` class="bh-tw" style="animation-delay:${(i * 0.29).toFixed(2)}s"` : ""}/>`;
  }
  return s + `<circle cx="316" cy="92" r="34" fill="#f3ead0" opacity=".07"/><path d="M312 70a22 22 0 1 0 17 37a17 17 0 1 1 -17 -37z" fill="#f3ead0"/>`;
}

const ely = (rx, ry, a, dy = 0) => { const t = (a * Math.PI) / 180; return [n1(CX + rx * Math.cos(t)), n1(CY + dy + ry * Math.sin(t))]; };

function avlu() {
  const x0 = CX - RX, x1 = CX + RX;
  let s = `<ellipse cx="${CX}" cy="${CY + DH + 18}" rx="${RX + 4}" ry="${RY - 30}" fill="#000" opacity=".42"/>`;
  s += `<path d="M${x0} ${CY}A${RX} ${RY} 0 0 0 ${x1} ${CY}L${x1} ${CY + DH}A${RX} ${RY} 0 0 1 ${x0} ${CY + DH}Z" fill="#1d3a73"/>`;
  s += `<path d="M${x0} ${CY + 5}A${RX} ${RY} 0 0 0 ${x1} ${CY + 5}" fill="none" stroke="#e9e1cc" stroke-width="2.6"/>`;
  s += `<path d="M${x0} ${CY + DH - 4}A${RX} ${RY} 0 0 0 ${x1} ${CY + DH - 4}" fill="none" stroke="#e9e1cc" stroke-width="2" opacity=".8"/>`;
  for (let a = 6, i = 0; a <= 174; a += 5, i++) {
    const [x, y] = ely(RX, RY, a, DH / 2 + 1);
    s += i % 2 ? `<circle cx="${x}" cy="${y}" r="2.2" fill="#d2533f"/>` : `<path d="M${x} ${n1(y - 5.6)}l4.4 5.6l-4.4 5.6l-4.4 -5.6z" fill="#f2ede2"/>`;
  }
  s += `<ellipse cx="${CX}" cy="${CY}" rx="${RX}" ry="${RY}" fill="#ece4cf"/>`;
  s += `<ellipse cx="${CX}" cy="${CY + 1.5}" rx="${RX - 10}" ry="${RY - 6}" fill="#b9af95"/>`;
  s += `<ellipse cx="${CX}" cy="${CY + 3}" rx="${RX - 16}" ry="${RY - 10}" fill="#173a20"/>`;
  s += `<ellipse cx="${CX}" cy="${CY + 12}" rx="${RX - 46}" ry="${RY - 36}" fill="#1f4a29" opacity=".85"/>`;
  for (const a of ACI) {
    const [x, y] = ely(RX - 16, RY - 10, a, 3), front = a < 180;
    s += `<line x1="${CX}" y1="${CY + 3}" x2="${x}" y2="${y}" stroke="#dfe8ee" stroke-width="${front ? 15 : 11}"/><line x1="${CX}" y1="${CY + 3}" x2="${x}" y2="${y}" stroke="#3d6cae" stroke-width="${front ? 5 : 3.6}"/>`;
  }
  // cicek kenarliklari
  const r = rnd(5), renk = ["#ef5d70", "#f7c9d3", "#fff3c4", "#f2a04c", "#c58cf0", "#ffffff", "#e8354f"];
  for (const [rx, ry, st, off] of [[RX - 25, RY - 17, 3.6, 0], [RX - 34, RY - 24, 4.6, 2]]) {
    for (let a = off; a < 360; a += st) {
      if (ACI.some((p) => Math.abs(((a - p + 540) % 360) - 180) > 171)) continue;
      const [x, y] = ely(rx, ry, a, 3), k = 1 + 0.4 * Math.sin((a * Math.PI) / 180);
      s += `<circle cx="${x}" cy="${y}" r="${n1((1.7 + r() * 1.1) * k)}" fill="${renk[Math.floor(r() * renk.length)]}"/>`;
    }
  }
  return s;
}

/** Ortada havuz, arkasinda hurma, ustunde kubbe (uygulamadaki "Bahcenin hurmasi" ve kosk). m: olcek. */
function orta(m = 1.35) {
  const X = (d) => n1(CX + d * m), Y = (d) => n1(CY + d * m), M = (v) => n1(v * m);
  let s = `<ellipse cx="${CX}" cy="${Y(2)}" rx="${M(40)}" ry="${M(17)}" fill="#e9e1cc"/><ellipse cx="${CX}" cy="${Y(2)}" rx="${M(33)}" ry="${M(13)}" fill="#3f78a6"/><ellipse cx="${X(-3)}" cy="${CY}" rx="${M(22)}" ry="${M(7)}" fill="#7ab0d4" opacity=".7"/>`;
  const px = X(14), py = Y(-104);
  s += `<path d="M${X(8)} ${Y(-14)}Q${X(2)} ${Y(-60)} ${px} ${py}" fill="none" stroke="#8a6a44" stroke-width="${M(5)}" stroke-linecap="round"/>`;
  for (const [a, l, c] of [[-168, 30, "#2f7a3c"], [-140, 32, "#3f8f4a"], [-108, 26, "#4aa055"], [-72, 26, "#3f8f4a"], [-40, 32, "#4aa055"], [-12, 30, "#2f7a3c"], [24, 24, "#2f7a3c"], [156, 24, "#3f8f4a"]]) {
    const t = (a * Math.PI) / 180, L = l * m, ex = n1(px + (Math.cos(t) * L) / 2), ey = n1(py + (Math.sin(t) * L) / 2 + Math.abs(Math.cos(t)) * 5 * m);
    s += `<ellipse cx="${ex}" cy="${ey}" rx="${n1(L / 2)}" ry="${M(4.2)}" fill="${c}" transform="rotate(${a + (Math.cos(t) > 0 ? 14 : -14)} ${ex} ${ey})"/>`;
  }
  for (const dx of [-25, -9, 9, 25]) s += `<rect x="${n1(X(dx) - M(1.6))}" y="${Y(-32)}" width="${M(3.2)}" height="${M(dx === -9 || dx === 9 ? 30 : 27)}" rx="1" fill="#efe7d4"/>`;
  s += `<ellipse cx="${CX}" cy="${Y(-32)}" rx="${M(31)}" ry="${M(7.5)}" fill="#e3d9c0"/>`;
  s += `<path d="M${X(-30)} ${Y(-33)}C${X(-30)} ${Y(-55)} ${X(-15)} ${Y(-66)} ${CX} ${Y(-68)}C${X(15)} ${Y(-66)} ${X(30)} ${Y(-55)} ${X(30)} ${Y(-33)}Z" fill="#dce7f1"/>`;
  for (const [dx, dy] of [[-18, -40], [-6, -42], [6, -42], [18, -40], [-12, -51], [0, -53], [12, -51], [-5, -61], [5, -61], [-24, -36], [24, -36]]) s += `<circle cx="${X(dx)}" cy="${Y(dy)}" r="${M(1.6)}" fill="#2f5f9a"/>`;
  s += `<path d="M${X(-30)} ${Y(-34)}Q${CX} ${Y(-26)} ${X(30)} ${Y(-34)}" fill="none" stroke="#2f5f9a" stroke-width="${M(2)}"/><circle cx="${CX}" cy="${Y(-71)}" r="${M(2.6)}" fill="#d9b55e"/>`;
  return s;
}

/** Duz bir agac (s olcek). tip: yesil | nar | turunc | pembe | gul */
function agac(x, y, s, tip) {
  const yap = { yesil: ["#245f30", "#3a8a45", "#5cae5f"], nar: ["#245f30", "#347f3e", "#56a75a"], turunc: ["#22592d", "#2f7a3b", "#4f9f55"], pembe: ["#c2708f", "#e9a3c0", "#f8d0de"], gul: ["#1f5a2c", "#2e7639", "#4c9a50"] }[tip];
  let g = `<ellipse cx="${x}" cy="${y}" rx="${n1(10 * s)}" ry="${n1(3.6 * s)}" fill="#2a1d14" stroke="#6d5238" stroke-width="${n1(0.9 * s)}"/>`;
  if (tip === "gul") {
    for (const [dx, dy, r, c] of [[-7, -6, 7, 0], [6, -6, 7, 0], [0, -10, 8, 1], [-3, -13, 4, 2]]) g += `<circle cx="${n1(x + dx * s)}" cy="${n1(y + dy * s)}" r="${n1(r * s)}" fill="${yap[c]}"/>`;
    for (const [dx, dy] of [[-8, -8], [-1, -14], [7, -9], [3, -5], [-4, -4]]) g += `<circle cx="${n1(x + dx * s)}" cy="${n1(y + dy * s)}" r="${n1(2.4 * s)}" fill="#d42a44"/>`;
    return g;
  }
  g += `<path d="M${x} ${y}L${x} ${n1(y - 17 * s)}M${x} ${n1(y - 10 * s)}l${n1(-5 * s)} ${n1(-6 * s)}M${x} ${n1(y - 12 * s)}l${n1(5 * s)} ${n1(-5 * s)}" stroke="#6e4b2e" stroke-width="${n1(2.4 * s)}" stroke-linecap="round" fill="none"/>`;
  for (const [dx, dy, r, c] of [[-8, -18, 8, 0], [8, -18, 8, 0], [0, -24, 11, 1], [-6, -28, 7, 1], [6, -28, 7, 1], [-3, -31, 4.5, 2]]) g += `<circle cx="${n1(x + dx * s)}" cy="${n1(y + dy * s)}" r="${n1(r * s)}" fill="${yap[c]}"/>`;
  const nokta = { nar: ["#c0392b", 2.2], turunc: ["#f39c12", 2], pembe: ["#ffffff", 1.4] }[tip];
  if (nokta) for (const [dx, dy] of [[-9, -20], [7, -23], [-2, -27], [10, -16], [-6, -14], [3, -33]]) g += `<circle cx="${n1(x + dx * s)}" cy="${n1(y + dy * s)}" r="${n1(nokta[1] * s)}" fill="${nokta[0]}"/>`;
  return g;
}

/** Buyuyen fidan (on ortada). Asama sinifi: s0 filiz, s1 fidan, s2 genc agac (ilk cicekler), s3 olgun (cicekler tam, meyve). k: olcek. */
function fidan(asama, key, k = 1.6) {
  const x = CX, y = CY + (k > 1.8 ? 90 : 84);
  const P = (dx, dy) => `${n1(x + dx * k)} ${n1(y + dy * k)}`;
  const C = (dx, dy, r, c) => `<circle cx="${n1(x + dx * k)}" cy="${n1(y + dy * k)}" r="${n1(r * k)}" fill="${c}"/>`;
  let fl = "";
  for (let i = 0; i < 10; i++) {
    const t = ((i * 36 + 8) * Math.PI) / 180, fx = n1(x + 18 * k * Math.cos(t)), fy = n1(y + (0.5 + 6.8 * Math.sin(t)) * k);
    fl += `<circle class="${i % 2 ? "" : "fa"}" cx="${fx}" cy="${fy}" r="${n1(2.4 * k)}" fill="${["#f7c9d3", "#fff3c4", "#ef5d70"][i % 3]}" style="transform-origin:${fx}px ${fy}px;transition-delay:${i * 70}ms"/>`;
  }
  const govde = `<path d="M${P(0, 0)}L${P(0, -21)}M${P(0, -12)}L${P(-6, -19)}M${P(0, -15)}L${P(6, -21)}" stroke="#7a5536" stroke-width="${n1(3 * k)}" stroke-linecap="round" fill="none"/>`;
  const yaprak = [[-10, -22, 10, "#22592d"], [10, -22, 10, "#22592d"], [0, -30, 14, "#2f7a3b"], [-8, -35, 9, "#3b8c45"], [8, -35, 9, "#3b8c45"], [-4, -40, 6, "#58a85b"]].map((a) => C(...a)).join("");
  const meyve = [[-11, -25], [9, -29], [-2, -35], [12, -20], [-7, -17], [4, -41], [-12, -33]].map(([dx, dy]) => C(dx, dy, 2.5, "#f39c12")).join("");
  const sp = (dx, dy, rot) => `<ellipse cx="${n1(x + dx * k)}" cy="${n1(y + dy * k)}" rx="${n1(3.6 * k)}" ry="${n1(1.8 * k)}" fill="#6cc06e" transform="rotate(${rot} ${n1(x + dx * k)} ${n1(y + dy * k)})"/>`;
  return `<g class="bh-t ${asama}"${key ? ` data-k="${key}"` : ""}>
    <ellipse class="bh-glow" cx="${x}" cy="${y}" rx="${n1(34 * k)}" ry="${n1(13 * k)}" fill="#f6dc8c" style="transform-origin:${x}px ${y}px"/>
    <ellipse cx="${x}" cy="${y}" rx="${n1(13 * k)}" ry="${n1(4.6 * k)}" fill="#2a1d14" stroke="#6d5238" stroke-width="${n1(1.1 * k)}"/>
    <g class="bh-sp"><path d="M${P(0, 0)}L${P(0, -9)}" stroke="#5cae5f" stroke-width="${n1(1.6 * k)}" fill="none"/>${sp(-3.4, -9, -25)}${sp(3.4, -10, 25)}</g>
    <g class="bh-g" style="transform-origin:${x}px ${y}px">${govde}${yaprak}<g class="bh-fr">${meyve}</g></g>
    <g class="bh-fl">${fl}</g>
  </g>`;
}

const AGACLAR = { yok: [], az: [[136, 262, 1.6, "pembe"], [270, 260, 1.6, "nar"]],
  tam: [[136, 262, 1.6, "pembe"], [270, 260, 1.6, "nar"], [56, 330, 1.7, "gul"], [346, 330, 1.75, "turunc"], [98, 398, 1.9, "yesil"], [304, 400, 1.9, "nar"]] };

/** Bahce resmi. vb: viewBox (kart icin yakin plan). */
function bahceSvg({ asama = "s0", key = "tree", agaclar = "tam", vb = "0 0 400 520", k = 1.6 } = {}) {
  const list = AGACLAR[agaclar];
  const arka = list.filter((a) => a[1] < CY).map((a) => agac(...a)).join("");
  const on = list.filter((a) => a[1] >= CY).map((a) => agac(...a)).join("");
  return `<svg class="bh-svg" viewBox="${vb}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${gok()}${avlu()}${arka}${orta()}${on}${fidan(asama, key, k)}</svg>`;
}

// ── parcalar ────────────────────────────────────────────────────────────────────
const sar = (html) => `<div class="bh">${html}</div>`;

/** Bahce ekraninin ust cubugu: geri + "Niyet Bahcen", ara ver (duraklat), "Niyet dik". */
function ustCubuk(K) {
  return `<div class="bh-top"><span class="bh-gp">${K.ic("back", "fl")}<b>${K.Le("garden.name")}</b></span><span class="bh-gr">
    <span class="bh-gp bh-c"${K.attr("pause")}>${K.ic("bhPause")}</span><span class="bh-gp bh-add">${K.ic("plus")}<b>${K.Le("garden.plant")}</b></span></span></div>`;
}

/** "Bugun" panelinin bir satiri. sag: "yap" (Bugun yaptim), "devam" (bagli: Devam), "tamam" (onay). */
function satir(K, { ikon, baslik, alt, sag, key }) {
  const s = sag === "yap" ? `<span class="bh-pill"${K.attr(key)}>${K.Le("garden.act.didToday")}</span>`
    : sag === "devam" ? `<span class="bh-pill ol">${K.Le("common.continue")}</span>`
    : `<span class="bh-ck">${K.ic("check")}</span>`;
  return `<div class="bh-row"><span class="bh-ri">${K.ic(ikon)}</span><div class="bh-rt"><b>${K.e(baslik)}</b><small${key ? K.attr(key + "S") : ""}>${K.e(alt)}</small></div><span class="bh-rs"${key ? K.attr(key + "R") : ""}>${s}</span></div>`;
}

/** "Bugun" paneli (TodayPanel): baslik, tamam sayisi, dort ayar simgesi, satirlar. */
function bugunPaneli(K, { done, total, rows, banner = false }) {
  return `<div class="bh-pan">
    <div class="bh-ban${banner ? " on" : ""}"${K.attr("ban")}>${K.ic("bhPause")}<small>${K.Le("garden.rest.banner", { date: BX[K.dil].son })}</small><b>${K.Le("garden.rest.end")}</b></div>
    <div class="bh-ph"><div><b>${K.Le("garden.today")}</b><small${K.attr("doneOf")}>${K.Le("garden.doneOf", { done, total })}</small></div>
      <span class="bh-tools"><i>${K.ic("bhList")}</i><i>${K.ic("bell")}</i><i>${K.ic("bhPaw")}</i><i>${K.ic("bhImg")}</i></span></div>
    ${rows.map((r) => satir(K, r)).join("")}
  </div>`;
}

const ROW = {
  sadaka: (K, sag = "yap") => ({ ikon: "bhHeart", baslik: K.L("garden.free.sadaka"), alt: sag === "tamam" ? K.L("garden.card.doneToday") : K.L("garden.card.todayProgress", { done: 0, target: 1 }), sag, key: sag === "yap" ? "did" : "" }),
  kuran: (K, sag = "devam") => ({ ikon: "book", baslik: K.L("garden.src.kuran"), alt: sag === "tamam" ? K.L("garden.card.doneToday") : K.L("garden.card.todayProgress", { done: 0, target: 2 }), sag }),
  kaza: (K) => ({ ikon: "mosque", baslik: K.L("garden.src.kaza"), alt: K.L("garden.card.doneToday"), sag: "tamam" }),
  oruc: (K) => ({ ikon: "moon", baslik: K.L("garden.free.oruc"), alt: K.L("garden.card.notToday"), sag: "" }),
};

/** Bahce ekrani: ust sahne (svg) + cubuk + alt panel (html). */
function bahceEkran(K, { asama = "s1", agaclar = "tam", panel }) {
  return sar(`<div class="bh-sky">${bahceSvg({ asama, agaclar })}</div>${ustCubuk(K)}${panel}`);
}

/** Niyet dik ust basligi: geri, "Niyet dik", uc nokta (adim). */
function dikBaslik(K, adim) {
  return `<div class="bh-dh">${K.ic("back", "fl")}<b>${K.Le("garden.plant")}</b><span class="bh-dots">${[1, 2, 3].map((i) => `<i${i <= adim ? ' class="on"' : ""}></i>`).join("")}</span></div>`;
}

/** Niyet dik, adim 1: Hangi amel icin? (kaydirilir: ["y", "dk1", n]) */
function dik1(K) {
  const genis = (ikon, metin, key) => `<span class="bh-wide"${K.attr(key)}><i class="bh-ib">${K.ic(ikon)}</i><b>${K.e(metin)}</b>${K.ic("chev", "fl")}</span>`;
  const kare = (ikon, metin, key) => `<span class="bh-sq"${K.attr(key)}><i class="bh-ib">${K.ic(ikon)}</i><b>${K.e(metin)}</b></span>`;
  return sar(`${dikBaslik(K, 1)}<div class="bh-clip"><div class="bh-in sc"${K.attr("dk1")}>
    <b class="bh-h">${K.Le("garden.flow.step1")}</b>
    <small class="bh-lb">${K.Le("garden.example.title")}</small>
    ${genis("bhHeart", K.L("garden.example.sadaka"), "ex1")}${genis("moon", K.L("garden.example.oruc"))}${genis("book", K.L("garden.example.kuran"))}
    <small class="bh-lb">${K.Le("garden.flow.already")}</small>
    <div class="bh-grid">${kare("book", K.L("garden.src.kuran"), "tQ")}${kare("mosque", K.L("garden.src.namaz"))}${kare("beads", K.L("garden.src.zikir"))}${kare("bhVird", K.L("garden.src.vird"))}${kare("cap", K.L("garden.src.ezber"))}${kare("bookClosed", K.L("garden.src.kitap"))}${kare("calendar", K.L("garden.src.kaza"), "tK")}${kare("moon", K.L("garden.src.kazaOruc"))}</div>
  </div></div>`);
}

/** Niyet dik, adim 2: ritim ve asgari adim. tur: "kuran" | "kaza" (bagli: AmelLinkCard). */
function dik2(K, tur = "kuran") {
  const kz = tur === "kaza";
  const chip = (lb, on, key) => `<span class="bh-chip${on ? " on" : ""}"${K.attr(key)}>${K.e(lb)}</span>`;
  return sar(`${dikBaslik(K, 2)}<div class="bh-pg">
    <div class="bh-src">${K.ic(kz ? "mosque" : "book")}<b>${K.Le(kz ? "garden.src.kaza" : "garden.src.kuran")}</b></div>
    ${kz ? `<div class="bh-link"${K.attr("link")}>${K.ic("link")}<small>${K.Le("garden.link.kazaLinked")}</small></div>` : ""}
    <small class="bh-lb">${K.Le("garden.flow.rhythmLabel")}</small>
    <div class="bh-chips">${chip(K.L("garden.rhythm.daily"), true)}${chip(K.L("garden.rhythm.days"), false)}${chip(K.L("garden.rhythm.weekly"), false)}</div>
    <small class="bh-lb">${K.Le("garden.flow.min")}</small>
    <div class="bh-step"><span${K.attr("minus")}>${K.ic("bhMinus")}</span><b${K.attr("stepV")}>${kz ? K.Le("garden.unit.prayer", { n: 1 }) : K.Le("garden.unit.page", { n: 2 })}</b><span${K.attr("plus")}>${K.ic("plus")}</span></div>
    <small class="bh-hint">${K.Le("garden.flow.hintMin")}</small>
    ${K.bt(K.L("common.continue"), { key: "d2next", cls: "blk bh-btn" })}
  </div>`);
}

/** Fidanlik karosu: kucuk cizilmis agac. */
const fidanResmi = (tip) => `<svg viewBox="0 0 60 60" aria-hidden="true"><rect width="60" height="60" rx="14" fill="#1d2a22"/>${agac(30, 50, 1.1, tip)}</svg>`;

/** Niyet dik, adim 3: fidan (Onerilen) ve niyet cumlesi, "Dik". */
function dik3(K) {
  const ad = { turunc: K.L("garden.kind.turunc"), zeytin: K.L("garden.kind.zeytin"), incir: K.L("garden.kind.incir"), nar: K.L("garden.kind.nar") };
  const kind = (k) => ad[k];
  const tiles = [["turunc", "turunc", true], ["zeytin", "yesil"], ["incir", "yesil"], ["nar", "nar"]];
  return sar(`${dikBaslik(K, 3)}<div class="bh-pg">
    <b class="bh-h">${K.Le("garden.flow.step3")}</b>
    <div class="bh-hero">${fidanResmi("turunc")}<b>${K.e(K.L("garden.kind.turunc"))}</b><span class="bh-sug">${K.Le("garden.flow.suggested")}</span></div>
    <div class="bh-strip"><span class="bh-kt all"><i>${K.ic("bhGrid")}</i><small>${K.Le("garden.flow.allKinds")}</small></span>${tiles.map(([k, t, on]) => `<span class="bh-kt${on ? " on" : ""}">${fidanResmi(t)}<small>${K.e(kind(k))}</small></span>`).join("")}</div>
    <small class="bh-lb">${K.Le("garden.flow.textLabel")}</small>
    ${K.input({ key: "ntext", ph: K.L("garden.flow.textPlaceholder"), cls: "ta" })}
    <small class="bh-hint">${K.Le("garden.flow.textHint")}</small>
    ${K.bt(K.L("garden.flow.plantBtn"), { key: "plant", cls: "blk bh-btn" })}
  </div>`);
}

/** Oku sekmesi (Sahsi Okumalar): kartlar; "Niyet Bahcen" karesinde kosede "Yeni". Kaydirilir: ["y", "oku", n]. */
function oku(K) {
  const genis = (ikon, b, s) => `<div class="bh-oc wide"><i class="bh-ib">${K.ic(ikon)}</i><div><b>${K.e(b)}</b><small>${K.e(s)}</small></div></div>`;
  const kare = (ikon, b, s, key, kose) => `<div class="bh-oc"${K.attr(key)}>${kose ? `<em>${K.e(kose)}</em>` : ""}<i class="bh-ib">${K.ic(ikon)}</i><b>${K.e(b)}</b>${s ? `<small>${K.e(s)}</small>` : ""}</div>`;
  return sar(`<div class="bh-clip"><div class="bh-in sc bh-oku"${K.attr("oku")}>
    <div class="bh-okh"><b>${K.Le("read.title")}</b><span class="bh-gp bh-c">${K.ic("bhSearch")}</span></div>
    <div class="bh-seg"><span class="on">${K.Le("read.personalTab")}</span><span>${K.Le("read.globalTab")}</span></div>
    ${genis("book", K.L("read.quranTitle"), K.L("read.quranSub"))}
    ${genis("bookClosed", K.L("reader.title"), K.L("reader.subtitle"))}
    <div class="bh-og">${kare("shield", K.L("read.cevsenTitle"))}${kare("mosque", K.L("prayerDetail.title"))}
      ${kare("bhTesbih", K.L("tesbihat.title"))}${kare("leaf", K.L("garden.name"), K.L("garden.readSub"), "card", K.L("garden.newTag"))}
      ${kare("beads", K.L("read.zikirmatikTitle"))}${kare("calendar", K.L("cetele.title"))}</div>
  </div></div>${K.tabbar("read")}`);
}

/** Tanitim, 1. sayfa (GardenIntro): fidan resmi, baslik, p1, Devam; ustte "Gec". */
function tanitim(K) {
  return sar(`<div class="bh-intro"><span class="bh-gp bh-skip">${K.Le("garden.introScreen.skip")}</span>
    <div class="bh-iimg"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="64" r="50" fill="#1b2a20"/>${agac(60, 96, 2, "turunc")}</svg></div>
    <b class="bh-h">${K.Le("garden.introScreen.title")}</b><small class="bh-ip">${K.Le("garden.introScreen.p1")}</small>
    ${K.bt(K.L("common.continue"), { key: "iNext", cls: "blk bh-btn" })}</div>`);
}

/** Niyetlerim, bos hal: aciklama, ornek niyetler, "Niyet dik". */
function niyetlerBos(K) {
  const satirO = (ikon, metin) => `<div class="bh-li"><i class="bh-ib">${K.ic(ikon)}</i><b>${K.e(metin)}</b>${K.ic("chev", "fl")}</div>`;
  return sar(`<div class="bh-nh">${K.ic("back", "fl")}<b>${K.Le("garden.list.title")}</b></div><div class="bh-pg">
    <small class="bh-empty">${K.Le("garden.list.empty")}</small>
    <small class="bh-lb">${K.Le("garden.example.title")}</small>
    <div class="bh-list">${satirO("bhHeart", K.L("garden.example.sadaka"))}${satirO("moon", K.L("garden.example.oruc"))}${satirO("book", K.L("garden.example.kuran"))}</div>
    <span class="bh-olb"${K.attr("dik")}>${K.Le("garden.plant")}</span>
  </div>`);
}

/** "Ara ver" penceresi (RestSheet). */
function araPenceresi(K) {
  const gunler = [[K.L("garden.today"), false], [K.L("garden.unit.day", { n: 3 }), true], [K.L("garden.unit.day", { n: 7 }), false], [K.L("garden.unit.day", { n: 14 }), false], [K.L("garden.unit.day", { n: 30 }), false]];
  const nb = (ad, key) => `<div class="bh-nr"${K.attr(key)}><i class="bh-cb"${K.attr(key + "C")}>${K.ic("check")}</i><b>${K.e(ad)}</b></div>`;
  return `<div class="sheet bh-sheet"><i class="grab"></i><b class="bh-sh">${K.Le("garden.rest.title")}</b><small class="bh-hint bh-cl2">${K.Le("garden.rest.text")}</small>
    <small class="bh-lb">${K.Le("garden.rest.howLong")}</small>
    <div class="bh-chips">${gunler.map(([g, on]) => `<span class="bh-chip${on ? " on" : ""}">${K.e(g)}</span>`).join("")}</div>
    <small class="bh-lb">${K.Le("garden.rest.which")}</small>
    ${nb(K.L("garden.free.sadaka"), "r1")}${nb(K.L("garden.src.kuran"), "r2")}
    ${K.bt(K.L("garden.rest.confirm"), { key: "restOk", cls: "blk bh-btn" })}</div>`;
}

/** Kirkinci gun karti (FortyCard), panel yerine. */
function kirkPaneli(K) {
  return `<div class="bh-pan bh-forty"><div class="bh-fh"><small>${K.Le("garden.src.kuran")}</small>${K.ic("x")}</div>
    <b class="bh-ft">${K.Le("garden.forty.title")}</b><small class="bh-fb">${K.Le("garden.forty.body")}</small>
    <div class="bh-ay"><b dir="rtl">${AYET_142}</b><small>${K.dil === "ar" ? "الأعراف" : K.dil === "tr" ? "A'râf" : "Al-A'raf"} <bdi dir="ltr">7:142</bdi></small><small class="bh-fv">${K.Le("garden.forty.verse")}</small></div></div>`;
}

/** Bitki karti (PlantCard): tur ve yas, ad, Gelisimi cubugu. */
function bitkiPaneli(K) {
  return `<div class="bh-pan bh-plant"><div class="bh-fh"><small${K.attr("age")}>${K.e(K.L("garden.kind.turunc"))} · ${K.Le("garden.card.planted", { count: 1 })}</small>${K.ic("x")}</div>
    <b class="bh-ft">${K.Le("garden.src.kuran")}</b><small class="bh-q">${K.e(BX[K.dil].niyet)}</small>
    <small class="bh-lb">${K.Le("garden.card.growth")}</small><i class="bh-bar"><i${K.attr("bar")}></i></i>
    <small class="bh-ring"${K.attr("ring")}>${K.Le("garden.ring.seed")}</small></div>`;
}

// ── zaman cizelgesi parcalari ─────────────────────────────────────────────────────
const yas = (K, n) => `${K.L("garden.kind.turunc")} · ${K.L("garden.card.planted", { count: n })}`;

export const SAHNE = {
  /** Giris filmi: Niyetlerim (bos) -> Niyet dik -> Kur'an okuma -> her gun 2 sayfa -> Turunc + niyet -> Dik -> bahcede filiz. */
  "film-bahce": (K) => K.telefon({
    size: "lg", tema: "koyu",
    aria: `${K.L("garden.list.title")} › ${K.L("garden.plant")} › ${K.L("garden.src.kuran")} › ${K.L("garden.rhythm.daily")} · ${K.L("garden.unit.page", { n: 2 })} › ${K.L("garden.kind.turunc")} › ${K.L("garden.flow.plantBtn")}`,
    views: [["n", niyetlerBos(K)], ["d1", dik1(K), "push"], ["d2", dik2(K), "push"], ["d3", dik3(K), "push"],
      ["b", bahceEkran(K, { asama: "s0", agaclar: "yok", panel: bugunPaneli(K, { done: 0, total: 1, rows: [ROW.kuran(K)] }) }), "fade"]],
    tl: [["w", 900], ["tap", "dik"], ["go", "d1"], ["w", 700], ["y", "dk1", "14"], ["w", 700], ["tap", "tQ"], ["go", "d2"], ["w", 1100], ["tap", "d2next"], ["go", "d3"],
      ["w", 500], ["tap", "ntext"], ["type", "ntext", BX[K.dil].niyet], ["w", 300], ["tap", "plant"], ["go", "b"], ["w", 700], ["on", "tree", "gl"], ["w", 2800]],
    still: 0, hint: "dik",
  }),

  /** Oku -> asagi kaydir -> "Niyet Bahcen" karesi -> ilk giriste tanitim. */
  "bahce-ac": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("tabs.read")} › ${K.L("garden.name")} › ${K.L("garden.introScreen.title")}`,
    views: [["o", oku(K)], ["i", tanitim(K), "push"]],
    tl: [["w", 900], ["y", "oku", "8"], ["w", 1000], ["tap", "card"], ["go", "i"], ["w", 2600]],
    still: 2, hint: "card",
  }),

  /** Niyet dik, 1. adim: ornekler, asagida "Zaten yaptiklarin" -> Kur'an okuma -> 2. adim. */
  "bahce-sec": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("garden.flow.step1")} › ${K.L("garden.example.title")} · ${K.L("garden.flow.already")} › ${K.L("garden.src.kuran")}`,
    views: [["d1", dik1(K)], ["d2", dik2(K), "push"]],
    tl: [["w", 1400], ["y", "dk1", "14"], ["w", 1300], ["tap", "tQ"], ["go", "d2"], ["w", 2000]],
    still: 0, hint: "ex1",
  }),

  /** 2. adim: Her gun, gunde en az 2 sayfa -> + ile 3 -> Devam -> 3. adim. */
  "bahce-ritim": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("garden.flow.rhythmLabel")} ${K.L("garden.rhythm.daily")} › ${K.L("garden.flow.min")} ${K.L("garden.unit.page", { n: 3 })} › ${K.L("common.continue")}`,
    views: [["d2", dik2(K)], ["d3", dik3(K), "push"]],
    tl: [["w", 1000], ["tap", "plus"], ["txt", "stepV", K.L("garden.unit.page", { n: 3 })], ["w", 900], ["tap", "minus"], ["txt", "stepV", K.L("garden.unit.page", { n: 2 })], ["w", 900], ["tap", "d2next"], ["go", "d3"], ["w", 1800]],
    still: 0, hint: "plus",
  }),

  /** 3. adim: niyet cumlesi -> Dik -> bahcede yeni filiz (an). */
  "bahce-fidan": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("garden.flow.step3")} › ${K.L("garden.kind.turunc")} (${K.L("garden.flow.suggested")}) › ${K.L("garden.flow.plantBtn")}`,
    views: [["d3", dik3(K)], ["b", bahceEkran(K, { asama: "s0", agaclar: "az", panel: bugunPaneli(K, { done: 0, total: 1, rows: [ROW.kuran(K)] }) }), "fade"]],
    tl: [["w", 900], ["tap", "ntext"], ["type", "ntext", BX[K.dil].niyet], ["w", 400], ["tap", "plant"], ["go", "b"], ["w", 600], ["on", "tree", "gl"], ["w", 2600]],
    still: 0, hint: "plant",
  }),

  /** Bahce: Bugun listesi -> Sadaka "Bugun yaptim" -> onay, sayi 2/4 -> 3/4, fidanin ani. */
  "bahce-bugun": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("garden.today")} › ${K.L("garden.free.sadaka")} › ${K.L("garden.act.didToday")} › ${K.L("garden.card.doneToday")}`,
    views: [["b", bahceEkran(K, { asama: "s1", panel: bugunPaneli(K, { done: 2, total: 4, rows: [ROW.sadaka(K), ROW.kuran(K), ROW.kaza(K), { ...ROW.kuran(K, "tamam"), ikon: "beads", baslik: K.L("garden.src.zikir") }] }) })]],
    tl: [["w", 1100], ["tap", "did"], ["on", "didR", "done"], ["txt", "didS", K.L("garden.card.doneToday")], ["txt", "doneOf", K.L("garden.doneOf", { done: 3, total: 4 })], ["w", 300], ["on", "tree", "gl"], ["on", "tree", "s2"], ["w", 3000]],
    still: 0, hint: "did",
  }),

  /** Bagli niyet: Kaza namazi karesi -> 2. adimda "Kaza namazlarim'dan sayilir". */
  "bahce-bag": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("garden.flow.already")} › ${K.L("garden.src.kaza")} › ${K.L("garden.link.kazaLinked")}`,
    views: [["d1", dik1(K)], ["d2", dik2(K, "kaza"), "push"]],
    tl: [["w", 900], ["y", "dk1", "20"], ["w", 1100], ["tap", "tK"], ["go", "d2"], ["w", 600], ["on", "link", "on"], ["w", 2600]],
    still: 7, hint: "link",
  }),

  /** Buyume: bitki karti acik, fidan haftalar icinde buyur; cicekler, meyve. */
  "bahce-buyume": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("garden.card.growth")}: ${K.L("garden.ring.first")} › ${K.L("garden.ring.full")} › ${K.L("garden.fruit.yes")}`,
    views: [["b", bahceEkran(K, { asama: "s1", agaclar: "az", panel: bitkiPaneli(K) })]],
    tl: [["w", 900], ["on", "tree", "s2"], ["txt", "age", yas(K, 12)], ["st", "bar", "width", "45%"], ["txt", "ring", K.L("garden.ring.first")], ["w", 1700],
      ["on", "tree", "s3"], ["txt", "age", yas(K, 42)], ["st", "bar", "width", "100%"], ["txt", "ring", `${K.L("garden.ring.full")} ${K.L("garden.fruit.yes")}`], ["w", 3000]],
    still: 10, hint: "",
  }),

  /** Ara ver: duraklat simgesi -> sure ve niyet sec -> Ara ver -> panelde "Ara veriyorsun". */
  "bahce-ara": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("garden.rest.title")} › ${K.L("garden.rest.howLong")} ${K.L("garden.unit.day", { n: 3 })} › ${K.L("garden.rest.confirm")} › ${K.L("garden.rest.started")}`,
    views: [["b", bahceEkran(K, { asama: "s2", panel: bugunPaneli(K, { done: 1, total: 3, rows: [ROW.sadaka(K), ROW.kuran(K), ROW.kaza(K)] }) })]],
    overlays: [["r", sar(araPenceresi(K)), "sheet"]],
    tl: [["w", 1000], ["tap", "pause"], ["ov", "r"], ["w", 700], ["tap", "r1"], ["on", "r1C", "on"], ["w", 300], ["tap", "r2"], ["on", "r2C", "on"], ["w", 300], ["tap", "restOk"], ["cl", "r"], ["on", "ban", "on"], ["w", 2600]],
    still: 0, hint: "pause",
  }),

  /** Kirkinci gun: fidanin ani, sonra kart (A'raf 7:142). */
  "bahce-kirk": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("garden.forty.title")}: ${K.L("garden.forty.body")}`,
    views: [["b", bahceEkran(K, { asama: "s3", agaclar: "tam", panel: bugunPaneli(K, { done: 3, total: 3, rows: [ROW.sadaka(K, "tamam"), ROW.kuran(K, "tamam"), ROW.kaza(K)] }) })],
      ["k", bahceEkran(K, { asama: "s3", agaclar: "tam", panel: kirkPaneli(K) }), "fade"]],
    tl: [["w", 800], ["on", "tree", "gl"], ["w", 1500], ["go", "k"], ["w", 3800]],
    still: 4, hint: "",
  }),

  /** Merkez karti: yakin planda fidan buyur (dikileli gun sayisi), kirkinci gunde cicekler ve meyve. */
  "bahce-kart": (K) => K.telefon({
    tema: "koyu",
    aria: `${K.L("garden.name")}: ${K.L("garden.card.planted", { count: 0 })} › ${K.L("garden.forty.title")}`,
    views: [["b", sar(`<div class="bh-sky full">${bahceSvg({ asama: "s0", agaclar: "tam", k: 2.15 })}</div>${ustCubuk(K)}
      <span class="bh-age"${K.attr("kage")}>${K.Le("garden.card.planted", { count: 0 })}</span>`)]],
    tl: [["w", 700], ["on", "tree", "s1"], ["on", "tree", "gl"], ["txt", "kage", K.L("garden.card.planted", { count: 7 })], ["w", 1500], ["off", "tree", "gl"],
      ["on", "tree", "s2"], ["txt", "kage", K.L("garden.card.planted", { count: 21 })], ["w", 1500],
      ["on", "tree", "s3"], ["on", "tree", "gl"], ["txt", "kage", K.L("garden.forty.title")], ["on", "kage", "gold"], ["w", 2800]],
    still: 13, hint: "",
  }),
};

export const IKON = {
  bhPause: '<circle cx="12" cy="12" r="8.5"/><path d="M10 9v6M14 9v6"/>',
  bhList: '<path d="M9 7h11M9 12h11M9 17h11"/><circle cx="4.8" cy="7" r=".9" fill="currentColor"/><circle cx="4.8" cy="12" r=".9" fill="currentColor"/><circle cx="4.8" cy="17" r=".9" fill="currentColor"/>',
  bhPaw: '<circle cx="7" cy="10" r="1.8"/><circle cx="10.5" cy="6.5" r="1.8"/><circle cx="14.5" cy="6.5" r="1.8"/><circle cx="18" cy="10" r="1.8"/><path d="M12.5 11.5c-2.6 0-5 3.2-5 5.3 0 1.6 1.2 2.2 2.6 2.2.9 0 1.6-.5 2.4-.5s1.5.5 2.4.5c1.4 0 2.6-.6 2.6-2.2 0-2.1-2.4-5.3-5-5.3z"/>',
  bhImg: '<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="M20.5 16l-5-5-8 8"/>',
  bhHeart: '<path d="M12 19.5s-7.5-4.4-7.5-9.6A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.3c0 5.2-7.5 9.6-7.5 9.6z"/>',
  bhMinus: '<path d="M6 12h12"/>',
  bhGrid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4"/>',
  bhVird: '<path d="M7 3.5h8l3 3v14H7z"/><path d="M15 3.5v3h3M10 11h5M10 14.5h5"/>',
  bhSearch: '<circle cx="11" cy="11" r="6"/><path d="M15.5 15.5 20 20"/>',
  bhTesbih: '<circle cx="12" cy="9" r="5.5" stroke-dasharray="0 3" stroke-width="2.4" stroke-linecap="round"/><path d="M12 14.5v6M10 20.5h4"/>',
};

export const CSS = `
  .mp-s .bh { display: contents; --a-pri: #c9c9d0; --a-on: #141416; --a-soft: #232326; --a-in: #1c1c1f; --a-card: #1c1c1f; --a-line: #2a2a2e; }
  .mp-s .bh-sky { position: absolute; left: 0; right: 0; top: -2.7em; height: calc(60% + 2.7em); background: linear-gradient(180deg, #2c3b6c 0%, #1f2a52 38%, #131a36 70%, #0d1124 100%); overflow: hidden; }
  .mp-s .bh-sky.full { height: calc(100% + 2.7em); }
  .mp-s .bh-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .mp-s .bh-tw { animation: bhtw 3.2s ease-in-out infinite; }
  @keyframes bhtw { 50% { opacity: .15; } }
  .mp-s .bh-t .bh-glow { opacity: 0; transform-box: view-box; }
  .mp-s .bh-t.gl .bh-glow { animation: bhgl 1.5s ease-out both; }
  @keyframes bhgl { 0% { opacity: 0; transform: scale(.5); } 35% { opacity: .55; } 100% { opacity: 0; transform: scale(1.5); } }
  .mp-s .bh-sp { transition: opacity .5s ease; }
  .mp-s .bh-t:not(.s0) .bh-sp { opacity: 0; }
  .mp-s .bh-g { transform-box: view-box; transform: scale(.12); opacity: 0; transition: transform 1.2s cubic-bezier(.3, 1.25, .5, 1), opacity .5s ease; }
  .mp-s .bh-t.s1 .bh-g { transform: scale(.48); opacity: 1; }
  .mp-s .bh-t.s2 .bh-g { transform: scale(.76); opacity: 1; }
  .mp-s .bh-t.s3 .bh-g { transform: scale(1); opacity: 1; }
  .mp-s .bh-fr { opacity: 0; transition: opacity .8s ease .6s; }
  .mp-s .bh-t.s3 .bh-fr { opacity: 1; }
  .mp-s .bh-fl circle { transform-box: view-box; transform: scale(0); transition: transform .5s cubic-bezier(.3, 1.6, .5, 1); }
  .mp-s .bh-t.s2 .bh-fl circle.fa, .mp-s .bh-t.s3 .bh-fl circle { transform: scale(1); }
  .mp-s .bh-top { position: absolute; top: .35em; left: .9em; right: .9em; z-index: 4; display: flex; justify-content: space-between; align-items: center; gap: .4em; }
  .mp-s .bh-gr { display: flex; gap: .4em; flex: none; }
  .mp-s .bh-gp { display: inline-flex; align-items: center; gap: .25em; height: 2.35em; padding: 0 .75em; border-radius: 1.3em; background: rgba(34, 34, 40, .72); border: 1px solid rgba(255, 255, 255, .1); color: #f2f2f4; font-size: .8em; min-width: 0; }
  .mp-s .bh-gp b { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .bh-gp > .ic { width: 1.1em; height: 1.1em; }
  .mp-s .bh-top > .bh-gp { flex: 0 1 auto; }
  .mp-s .bh-gp.bh-c { width: 2.35em; padding: 0; justify-content: center; flex: none; }
  .mp-s .bh-gp.bh-add { flex: none; }
  .mp-s .bh-pan { position: absolute; left: 0; right: 0; bottom: 0; top: 57%; z-index: 3; background: var(--a-bg); border-radius: 1.5em 1.5em 0 0; padding: 1em 1.15em; display: flex; flex-direction: column; gap: .15em; overflow: hidden; }
  .mp-s .bh-ph { display: flex; justify-content: space-between; align-items: center; gap: .5em; margin-bottom: .35em; }
  .mp-s .bh-ph b { display: block; font-size: 1.15em; }
  .mp-s .bh-ph small { display: block; color: var(--a-mut); font-size: .72em; }
  .mp-s .bh-tools { display: flex; gap: .3em; flex: none; }
  .mp-s .bh-tools i { width: 2em; height: 2em; border-radius: 50%; background: var(--a-in); display: grid; place-items: center; color: var(--a-pri); }
  .mp-s .bh-tools .ic { width: 1em; height: 1em; }
  .mp-s .bh-row { display: flex; align-items: center; gap: .6em; padding: .5em 0; border-top: 1px solid var(--a-line); }
  .mp-s .bh-ri { width: 2.1em; height: 2.1em; border-radius: 50%; background: var(--a-in); color: var(--a-pri); display: grid; place-items: center; flex: none; }
  .mp-s .bh-ri .ic { width: 1.05em; height: 1.05em; }
  .mp-s .bh-rt { flex: 1; min-width: 0; }
  .mp-s .bh-rt b, .mp-s .bh-rt small { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .bh-rt b { font-size: .86em; }
  .mp-s .bh-rt small { font-size: .68em; color: var(--a-mut); }
  .mp-s .bh-rs { flex: none; max-width: 46%; display: flex; justify-content: flex-end; }
  .mp-s .bh-pill { display: inline-block; max-width: 100%; padding: .38em .75em; border-radius: 1em; background: var(--a-pri); color: var(--a-on); font-size: .72em; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: opacity .3s ease; }
  .mp-s .bh-pill.ol { background: transparent; color: var(--a-pri); box-shadow: inset 0 0 0 1px var(--a-pri); }
  .mp-s .bh-ck { width: 1.55em; height: 1.55em; border-radius: 50%; background: var(--a-pri); color: var(--a-on); display: grid; place-items: center; }
  .mp-s .bh-ck .ic { width: .95em; height: .95em; stroke-width: 2.6; }
  .mp-s .bh-rs.done .bh-pill { display: none; }
  .mp-s .bh-rs.done::after { content: ""; width: 1.55em; height: 1.55em; border-radius: 50%; background: var(--a-pri) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 12.5l4 4L18 8' fill='none' stroke='%23141416' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 70% no-repeat; animation: bhpop .4s cubic-bezier(.3, 1.6, .5, 1); }
  @keyframes bhpop { from { transform: scale(.3); } to { transform: none; } }
  .mp-s .bh-ban { display: none; align-items: center; gap: .45em; background: var(--a-in); border-radius: .8em; padding: .5em .7em; margin-bottom: .45em; }
  .mp-s .bh-ban.on { display: flex; animation: bhpop .4s ease; }
  .mp-s .bh-ban small { flex: 1; font-size: .7em; min-width: 0; }
  .mp-s .bh-ban b { color: var(--a-pri); font-size: .7em; flex: none; }
  .mp-s .bh-ban .ic { color: var(--a-pri); width: 1.1em; height: 1.1em; }
  .mp-s .bh-dh, .mp-s .bh-nh { display: flex; align-items: center; gap: .6em; padding: .55em 1.15em .45em; }
  .mp-s .bh-dh b { flex: 1; font-size: .98em; }
  .mp-s .bh-nh b { font-size: 1.35em; }
  .mp-s .bh-dots { display: flex; gap: .3em; }
  .mp-s .bh-dots i { width: .42em; height: .42em; border-radius: 50%; background: var(--a-line); }
  .mp-s .bh-dots i.on { background: var(--a-pri); }
  .mp-s .bh-clip { flex: 1; position: relative; overflow: hidden; }
  .mp-s .bh-in { display: flex; flex-direction: column; gap: .5em; padding: .3em 1.15em 1em; }
  .mp-s .bh-pg { flex: 1; display: flex; flex-direction: column; gap: .5em; padding: .3em 1.15em 1em; overflow: hidden; }
  .mp-s .bh-h { display: block; font-size: 1.3em; font-weight: 700; line-height: 1.2; }
  .mp-s .bh-lb { display: block; color: var(--a-mut); font-size: .72em; margin-top: .45em; }
  .mp-s .bh-ib { width: 2.3em; height: 2.3em; border-radius: .7em; background: #313134; color: var(--a-pri); display: grid; place-items: center; flex: none; font-style: normal; }
  .mp-s .bh-ib .ic { width: 1.2em; height: 1.2em; }
  .mp-s .bh-wide { display: flex; align-items: center; gap: .6em; padding: .55em .65em; border-radius: .95em; background: #2b2b2d; }
  .mp-s .bh-wide b { flex: 1; font-size: .78em; line-height: 1.25; min-width: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .bh-wide > .ic { color: var(--a-mut); width: 1em; height: 1em; }
  .mp-s .bh-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .55em; }
  .mp-s .bh-sq { display: flex; flex-direction: column; align-items: center; gap: .45em; padding: .8em .4em; border-radius: .95em; background: #2b2b2d; text-align: center; }
  .mp-s .bh-sq .bh-ib { width: 2.8em; height: 2.8em; }
  .mp-s .bh-sq b { font-size: .78em; line-height: 1.2; max-width: 100%; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .mp-s .bh-src { display: flex; align-items: center; gap: .5em; }
  .mp-s .bh-src .ic { color: var(--a-pri); width: 1.3em; height: 1.3em; }
  .mp-s .bh-src b { font-size: 1.2em; }
  .mp-s .bh-link { display: flex; gap: .5em; align-items: flex-start; padding: .65em .75em; border: 1px solid var(--a-line); border-radius: .9em; background: var(--a-card); transition: box-shadow .4s ease; }
  .mp-s .bh-link.on { box-shadow: 0 0 0 .18em color-mix(in srgb, var(--a-pri) 40%, transparent); }
  .mp-s .bh-link .ic { color: var(--a-pri); width: 1.1em; height: 1.1em; margin-top: .1em; }
  .mp-s .bh-link small { font-size: .72em; line-height: 1.35; }
  .mp-s .bh-chips { display: flex; flex-wrap: wrap; gap: .35em; }
  .mp-s .bh-chip { padding: .45em .75em; border-radius: 1.2em; border: 1px solid var(--a-line); font-size: .74em; font-weight: 600; white-space: nowrap; }
  .mp-s .bh-chip.on { background: var(--a-pri); border-color: var(--a-pri); color: var(--a-on); }
  .mp-s .bh-step { display: flex; align-items: center; border: 1px solid var(--a-line); background: var(--a-card); border-radius: 1em; padding: .3em .4em; }
  .mp-s .bh-step span { width: 2.4em; height: 2.4em; display: grid; place-items: center; border-radius: .7em; }
  .mp-s .bh-step b { flex: 1; text-align: center; font-size: 1em; }
  .mp-s .bh-hint { display: block; color: var(--a-mut); font-size: .7em; line-height: 1.4; }
  .mp-s .bt.bh-btn { height: 3em; border-radius: 1em; margin-top: .4em; }
  .mp-s .bh-hero { display: flex; flex-direction: column; align-items: center; gap: .25em; }
  .mp-s .bh-hero svg { width: 6.6em; height: 6.6em; border-radius: 1.2em; }
  .mp-s .bh-hero b { font-size: .98em; }
  .mp-s .bh-sug { font-size: .66em; font-weight: 700; color: var(--a-pri); background: var(--a-soft); border-radius: 1em; padding: .2em .65em; }
  .mp-s .bh-strip { display: flex; gap: .45em; overflow: hidden; }
  .mp-s .bh-kt { flex: none; width: 3.5em; display: flex; flex-direction: column; align-items: center; gap: .2em; }
  .mp-s .bh-kt > svg, .mp-s .bh-kt > i { width: 3.2em; height: 3.2em; border-radius: .8em; box-shadow: 0 0 0 .12em transparent; }
  .mp-s .bh-kt.on > svg { box-shadow: 0 0 0 .12em var(--a-pri); }
  .mp-s .bh-kt i { display: grid; place-items: center; background: var(--a-soft); color: var(--a-pri); font-style: normal; }
  .mp-s .bh-kt small { font-size: .6em; color: var(--a-mut); max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mp-s .bh-kt.all small { color: var(--a-pri); }
  .mp-s .bh .in.ta { min-height: 3.2em; }
  .mp-s .bh-oku { padding-top: .6em; }
  .mp-s .bh-okh { display: flex; justify-content: space-between; align-items: center; }
  .mp-s .bh-okh b { font-size: 1.75em; font-weight: 800; }
  .mp-s .bh-seg { display: flex; gap: .3em; background: var(--a-in); border-radius: 1em; padding: .25em; }
  .mp-s .bh-seg span { flex: 1; text-align: center; padding: .5em .3em; border-radius: .8em; font-size: .74em; font-weight: 700; color: var(--a-mut); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .bh-seg span.on { background: color-mix(in srgb, var(--a-pri) 26%, transparent); color: var(--a-ink); }
  .mp-s .bh-oc { position: relative; display: flex; flex-direction: column; gap: .35em; padding: .75em; border-radius: 1em; background: #1c1c1f; border: 1px solid #2a2a2e; min-width: 0; }
  .mp-s .bh-oc.wide { flex-direction: row; align-items: center; gap: .65em; }
  .mp-s .bh-oc.wide div { min-width: 0; }
  .mp-s .bh-oc b { font-size: .84em; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .mp-s .bh-oc small { display: block; font-size: .66em; color: var(--a-mut); line-height: 1.3; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .mp-s .bh-oc em { position: absolute; top: .55em; inset-inline-end: .55em; font-style: normal; font-size: .6em; font-weight: 700; color: #141210; background: #d1ab5a; border-radius: 1em; padding: .1em .5em; }
  .mp-s .bh-og { display: grid; grid-template-columns: 1fr 1fr; gap: .5em; }
  .mp-s .bh-intro { flex: 1; display: flex; flex-direction: column; gap: .7em; padding: 1em 1.4em 1.6em; justify-content: flex-end; text-align: center; position: relative; }
  .mp-s .bh-skip { position: absolute; top: .4em; inset-inline-end: 1em; }
  .mp-s .bh-iimg { align-self: center; width: 11em; height: 11em; margin-bottom: auto; margin-top: 2.6em; }
  .mp-s .bh-iimg svg { width: 100%; height: 100%; }
  .mp-s .bh-ip { color: var(--a-mut); font-size: .8em; line-height: 1.45; }
  .mp-s .bh-empty { display: block; text-align: center; color: var(--a-mut); font-size: .86em; line-height: 1.45; padding: 1.4em .4em; }
  .mp-s .bh-list { background: var(--a-card); border-radius: 1.1em; padding: 0 .75em; }
  .mp-s .bh-li { display: flex; align-items: center; gap: .6em; padding: .6em 0; border-top: 1px solid var(--a-line); }
  .mp-s .bh-li:first-child { border-top: 0; }
  .mp-s .bh-li b { flex: 1; font-size: .78em; line-height: 1.25; min-width: 0; }
  .mp-s .bh-li > .ic { color: var(--a-mut); width: 1em; height: 1em; }
  .mp-s .bh-olb { display: block; text-align: center; border: 1px solid var(--a-pri); color: var(--a-pri); border-radius: .9em; padding: .75em; font-weight: 700; font-size: .9em; margin-top: .4em; }
  .mp-s .bh-sheet { gap: .35em; padding-bottom: 1.3em; }
  .mp-s .bh-cl2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .bh-sheet .bh-lb { margin-top: .2em; }
  .mp-s .bh-sheet .bh-chip { padding: .38em .65em; }
  .mp-s .bh-sheet .bt.bh-btn { margin-top: .2em; }
  .mp-s .bh-sh { font-size: 1.1em; }
  .mp-s .bh-nr { display: flex; align-items: center; gap: .6em; padding: .3em 0; }
  .mp-s .bh-nr b { font-size: .84em; }
  .mp-s .bh-cb { width: 1.5em; height: 1.5em; border-radius: .45em; box-shadow: inset 0 0 0 .12em var(--a-line); display: grid; place-items: center; color: transparent; font-style: normal; transition: background .25s ease; }
  .mp-s .bh-cb.on { background: var(--a-pri); color: var(--a-on); box-shadow: none; }
  .mp-s .bh-cb .ic { width: .95em; height: .95em; }
  .mp-s .bh-forty, .mp-s .bh-plant { gap: .35em; }
  .mp-s .bh-forty { top: 50%; animation: bhup .6s cubic-bezier(.2, .85, .25, 1) both; }
  @keyframes bhup { from { transform: translateY(40%); } to { transform: none; } }
  .mp-s .bh-fh { display: flex; justify-content: space-between; align-items: center; color: var(--a-mut); }
  .mp-s .bh-fh small { font-size: .72em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .bh-fh .ic { width: 1.1em; height: 1.1em; }
  .mp-s .bh-ft { font-size: 1.2em; }
  .mp-s .bh-fb { font-size: .76em; line-height: 1.4; }
  .mp-s .bh-ay { border-top: 1px solid var(--a-line); margin-top: .3em; padding-top: .5em; display: flex; flex-direction: column; gap: .3em; }
  .mp-s .bh-ay b { font-weight: 400; font-size: .95em; line-height: 1.75; text-align: center; }
  .mp-s .bh-ay small { color: var(--a-mut); font-size: .66em; }
  .mp-s .bh-ay small.bh-fv { color: var(--a-ink); font-size: .7em; line-height: 1.4; }
  .mp-s .bh-q { color: var(--a-mut); font-size: .76em; font-style: italic; }
  .mp-s .bh-bar { display: block; height: .5em; border-radius: 1em; background: var(--a-in); overflow: hidden; }
  .mp-s .bh-bar i { display: block; height: 100%; width: 22%; border-radius: inherit; background: var(--a-pri); transition: width 1.2s ease; }
  .mp-s .bh-ring { color: var(--a-mut); font-size: .72em; line-height: 1.4; }
  .mp-s .bh-age { position: absolute; z-index: 4; left: 50%; top: 4.6em; transform: translateX(-50%); white-space: nowrap; padding: .55em 1.1em; border-radius: 1.4em; background: rgba(20, 20, 24, .78); border: 1px solid rgba(255, 255, 255, .14); color: #f2f2f4; font-size: 1.05em; font-weight: 700; transition: background .4s ease, color .4s ease; }
  .mp-s .bh-age.gold { background: #d1ab5a; color: #141210; border-color: transparent; }
  @media (prefers-reduced-motion: reduce) { .mp-s .bh-tw, .mp-s .bh-t.gl .bh-glow, .mp-s .bh-forty { animation: none; } }
`;
