#!/usr/bin/env node
/**
 * Sayfa gecisini (_gen/nav-loader.html) elle yazilan sayfalara yazar.
 * Ana sayfa ve vakit sayfalari kendi ureticilerinden alir; buradakiler uretilmedigi icin
 * parca isaretler arasina konur ve her calismada yenilenir (tek kaynak nav-loader.html).
 *
 *   node _gen/inject-nav.mjs          yazar
 *   node _gen/inject-nav.mjs --check  yalniz farki soyler (cikis 1)
 *
 * Isaretler: </head> oncesi HEAD, <body...> sonrasi BODY, </body> oncesi JS.
 * Jekyll duzeninde ({% raw %}) ile sarilir ki Liquid parcaya dokunmasin.
 * Baslik ikonu data-vt-brand tasimali (ikon ona ucar); yoksa ikon yerinde soner.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const KONTROL = process.argv.includes("--check");
const SAYFALAR = ["ortak-okuma.html", "_layouts/default.html", "halka.html", "links.html", "join.html",
  "indir.html", "auth/verify.html", "auth/reset-password.html"];

const metin = readFileSync(join(KOK, "_gen", "nav-loader.html"), "utf8");
const m = metin.match(/<!--@@HEAD-->([\s\S]*?)<!--@@BODY-->([\s\S]*?)<!--@@JS-->([\s\S]*)$/);
if (!m) { console.error("nav-loader.html: @@HEAD/@@BODY/@@JS bolumleri yok"); process.exit(1); }
const P = { HEAD: m[1].trim(), BODY: m[2].trim(), JS: m[3].trim() };

const blok = (ad, icerik, liquid) => `<!--NAV:${ad}-->\n${liquid ? "{% raw %}" : ""}${icerik}${liquid ? "{% endraw %}" : ""}\n<!--/NAV:${ad}-->`;
const eski = (ad) => new RegExp(`<!--NAV:${ad}-->[\\s\\S]*?<!--/NAV:${ad}-->`);

let fark = 0;
for (const yol of SAYFALAR) {
  const tam = join(KOK, yol);
  let s = readFileSync(tam, "utf8");
  const liquid = yol.startsWith("_layouts/");
  const koy = (ad, icerik, yer) => {
    const b = blok(ad, icerik, liquid);
    if (eski(ad).test(s)) s = s.replace(eski(ad), () => b);
    else s = yer(s, b);
  };
  koy("HEAD", P.HEAD, (x, b) => { if (x.split("</head>").length !== 2) throw new Error(yol + ": </head> tek degil"); return x.replace("</head>", b + "\n</head>"); });
  koy("BODY", P.BODY, (x, b) => { const r = /<body[^>]*>/; if (!r.test(x)) throw new Error(yol + ": <body> yok"); return x.replace(r, (t) => t + "\n" + b); });
  koy("JS", P.JS, (x, b) => { if (x.split("</body>").length !== 2) throw new Error(yol + ": </body> tek degil"); return x.replace("</body>", b + "\n</body>"); });
  if (readFileSync(tam, "utf8") !== s) {
    fark++;
    if (KONTROL) console.log("guncel degil: " + yol);
    else { writeFileSync(tam, s); console.log("yazildi: " + yol); }
  }
}
if (KONTROL && fark) process.exit(1);
if (!fark) console.log("zaten guncel");
