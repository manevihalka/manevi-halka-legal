/**
 * Hatim rehberinin (ve oruc rehberinin paylastigi halka/secim ekranlarinin) CSS'i ve ek ikonlari (21 Kas 2026).
 * Sahneler sahneler.mjs'te; uretici CSS ve IKON'u yalniz sahneler-*.mjs dosyalarindan okudugu icin burada.
 * Siniflar "hx-" onekli, hepsi .mp-s altinda ve em biriminde (mini telefon olcegi). Renkler --a-* (tema: "gul").
 */
export const SAHNE = {};

export const IKON = {
  hxDots: '<circle cx="5.5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18.5" cy="12" r="1.3" fill="currentColor"/>',
  hxGear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  hxSwap: '<path d="M8 4v15M4.5 7.5 8 4l3.5 3.5M16 20V5M12.5 16.5 16 20l3.5-3.5"/>',
  hxLock: '<rect x="5.5" y="10.5" width="13" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  hxBookmark: '<path d="M7 4h10v16l-5-3.5L7 20z"/>',
  hxFast: '<path d="M18.5 15.2A7.8 7.8 0 1 1 10 5a6.3 6.3 0 0 0 8.5 10.2z"/><path d="M18 4.2l.7 1.6 1.7.2-1.3 1.1.4 1.7-1.5-.9-1.5.9.4-1.7-1.3-1.1 1.7-.2z"/>',
  hxMinus: '<path d="M5 12h14"/>',
};

export const CSS = `
  .mp-s .hx-c3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .hx-cl3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; font-size: .66em; }
  .mp-s .hx-cl2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: .64em; }
  .mp-s .hx-sec { display: block; color: var(--a-mut); font-size: .72em; font-weight: 700; margin-top: .35em; }

  /* halka ekrani (app/group/[id].tsx 2.1.0) */
  .mp-s .hx-gh { display: grid; grid-template-columns: 2.2em minmax(0, 1fr) auto; align-items: center; gap: .4em; padding: .4em 1.1em .25em; }
  .mp-s .hx-gh > b { font-size: 1.25em; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-gi { display: flex; gap: .75em; color: var(--a-pri); }
  .mp-s .hx-ms { display: flex; align-items: center; gap: .55em; padding: .25em 1.1em .5em; }
  .mp-s .hx-avs { display: flex; flex: none; }
  .mp-s .hx-avs i { width: 2.4em; height: 2.4em; border-radius: 50%; display: grid; place-items: center; font-style: normal; font-weight: 700; font-size: .72em; background: var(--a-soft); color: var(--a-pri); box-shadow: 0 0 0 .18em var(--a-bg); }
  .mp-s .hx-avs i + i { margin-inline-start: -.7em; }
  .mp-s .hx-avs i.ad { background: var(--a-pri); color: var(--a-on); }
  .mp-s .hx-ms > small { flex: 1; min-width: 0; color: var(--a-mut); font-size: .76em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-inv { display: inline-flex; align-items: center; gap: .2em; padding: .5em .85em; border-radius: 2em; background: var(--a-soft); color: var(--a-pri); font-size: .8em; white-space: nowrap; flex: none; }
  .mp-s .hx-inv .ic { width: 1.1em; height: 1.1em; }
  .mp-s .hx-tabs { display: flex; gap: .25em; margin: 0 1.1em; padding: .25em; border-radius: .9em; background: color-mix(in srgb, var(--a-pri) 13%, transparent); }
  .mp-s .hx-tabs span { flex: 1; min-width: 0; text-align: center; padding: .5em .3em; border-radius: .7em; font-size: .82em; color: var(--a-mut); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-tabs span.on { background: var(--a-card); color: var(--a-ink); font-weight: 700; }
  .mp-s .hx-tabs i { font-style: normal; color: var(--a-mut); font-weight: 600; }
  .mp-s .hx-gp { padding-top: .75em; padding-bottom: 5em; }
  .mp-s .hx-fab { position: absolute; z-index: 3; inset-inline-end: 1.1em; bottom: 1.3em; display: inline-flex; align-items: center; gap: .35em; height: 3em; padding: 0 1.15em; border-radius: 2em; background: var(--a-pri); color: var(--a-on); box-shadow: 0 .6em 1.2em -.5em rgba(50, 30, 35, .55); font-size: .9em; white-space: nowrap; }
  .mp-s .hx-wel { display: flex; flex-direction: column; gap: .75em; padding: .9em .95em; }
  .mp-s .hx-wh { display: flex; align-items: flex-start; gap: .6em; }
  .mp-s .hx-wh > div { flex: 1; min-width: 0; }
  .mp-s .hx-wh b { display: block; font-size: 1em; }
  .mp-s .hx-wh small { display: block; color: var(--a-mut); font-size: .74em; }
  .mp-s .hx-wh > .ic { color: var(--a-mut); width: 1em; height: 1em; }
  .mp-s .hx-ws { display: flex; gap: .65em; align-items: flex-start; }
  .mp-s .hx-ws > div { flex: 1; min-width: 0; }
  .mp-s .hx-ws b { display: block; font-size: .88em; }
  .mp-s .hx-ws small { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--a-mut); font-size: .72em; margin: .15em 0 .5em; }
  .mp-s .hx-ws.done b { color: var(--a-mut); }
  .mp-s .hx-wn { width: 2em; height: 2em; border-radius: 50%; display: grid; place-items: center; box-shadow: inset 0 0 0 .12em var(--a-line); color: var(--a-mut); font-size: .8em; font-weight: 700; flex: none; }
  .mp-s .hx-wn.pr { box-shadow: inset 0 0 0 .12em var(--a-pri); color: var(--a-pri); }
  .mp-s .hx-ws.done .hx-wn { background: var(--a-pri); color: var(--a-on); box-shadow: none; }
  .mp-s .hx-wn .ic { width: 1.1em; height: 1.1em; }
  .mp-s .hx-tc { display: flex; align-items: center; gap: .7em; padding: .75em .85em; border-radius: 1em; background: var(--a-card); border: 1px solid var(--a-line); }
  .mp-s .hx-tc.new { animation: newrow 1.6s ease .3s both; }
  .mp-s .hx-tc > div { flex: 1; min-width: 0; }
  .mp-s .hx-tc b { display: block; font-size: .92em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-tl { display: block; color: var(--a-mut); font-size: .72em; }
  .mp-s .hx-tr { width: 2.6em; height: 2.6em; border-radius: 50%; display: grid; place-items: center; color: var(--a-pri); box-shadow: inset 0 0 0 .12em color-mix(in srgb, var(--a-pri) 35%, transparent); flex: none; }
  .mp-s .hx-tr .ic { width: 1.35em; height: 1.35em; }
  .mp-s .hx-tch { color: var(--a-mut); width: .95em; height: .95em; }

  /* "Halkada ne yapalim?" */
  .mp-s .hx-pick { flex: 1; min-height: 0; display: flex; flex-direction: column; }
  .mp-s .hx-tpl { display: flex; gap: .5em; overflow: hidden; margin-inline-end: -1.15em; }
  .mp-s .hx-tpl span { flex: none; width: 8.6em; padding: .6em .7em; border-radius: .9em; background: var(--a-card); border: 1px solid var(--a-line); }
  .mp-s .hx-tpl b { display: block; font-size: .8em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-tpl small { display: block; color: var(--a-mut); font-size: .66em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-pick .cx-tile { padding: .7em .7em .75em; gap: .4em; }
  .mp-s .hx-pick .cx-tile b { overflow-wrap: anywhere; }
  .mp-s .hx-pick .cx-tile small { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .mp-s .hx-hint { display: block; color: var(--a-mut); font-size: .66em; }

  /* Kur'an hatmi kurma ekrani (TaskComposer) */
  .mp-s .hx-ring { position: relative; width: 5.4em; height: 5.4em; display: grid; place-content: center; text-align: center; flex: none; }
  .mp-s .hx-ring svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  :root[dir="rtl"] .mp-s .hx-ring svg, :root[dir="rtl"] .mp-s .hx-kr svg { transform: scaleX(-1); }
  .mp-s .hx-ring circle { fill: var(--a-line); }
  .mp-s .hx-ring circle.on { fill: var(--a-pri); }
  .mp-s .hx-ring circle.me { fill: var(--a-gold); }
  .mp-s .hx-ring b { position: relative; font-size: 1.3em; line-height: 1; }
  .mp-s .hx-ring small { position: relative; display: block; color: var(--a-mut); font-size: .62em; margin-top: .15em; }
  .mp-s .hx-dc { grid-column: 1 / -1; display: flex; flex-direction: column; gap: .4em; margin-top: .45em; padding: .75em .8em; border-radius: .9em; background: var(--a-card); }
  .mp-s .hx-dt { font-size: .84em; }
  .mp-s .hx-ar { display: flex; align-items: center; gap: .55em; font-size: .8em; }
  .mp-s .hx-ar i { width: 2.2em; height: 2.2em; border-radius: 50%; display: grid; place-items: center; font-style: normal; font-weight: 700; font-size: .82em; background: var(--a-soft); flex: none; }
  .mp-s .hx-ar i.me { background: color-mix(in srgb, var(--a-gold) 32%, transparent); }
  .mp-s .hx-ar span { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-ar b { color: var(--a-pri); font-weight: 600; white-space: nowrap; }
  .mp-s .hx-dc > small.mu, .mp-s .hx-nr > small.mu { font-size: .7em; }
  .mp-s .hx-ds { font-size: .74em; }
  .mp-s .hx-ok { display: flex; align-items: center; gap: .3em; color: var(--a-pri); font-weight: 700; font-size: .74em; }
  .mp-s .hx-ok .ic { width: 1.1em; height: 1.1em; }
  .mp-s .bt.hx-db { height: 2.5em; font-size: .8em; background: var(--a-soft); color: var(--a-pri); box-shadow: inset 0 0 0 .1em var(--a-pri); }
  .mp-s .cx-r .hx-lk { width: .85em; height: .85em; margin-inline-start: .3em; color: var(--a-mut); vertical-align: -.1em; }
  .mp-s .hx-more { flex-wrap: wrap; }
  .mp-s .hx-more > .hx-adv { display: none; flex: 0 0 100%; flex-direction: column; gap: .55em; border-top: 1px solid var(--a-line); padding-top: .6em; margin-top: .3em; }
  .mp-s .hx-more.open > .hx-adv { display: flex; }
  .mp-s .hx-more.open > .cx-dn { transform: rotate(-90deg); }
  .mp-s .hx-tg { display: flex; align-items: center; gap: .6em; }
  .mp-s .hx-tg > div { flex: 1; min-width: 0; }
  .mp-s .hx-tg b { display: block; font-size: .8em; font-weight: 600; }
  .mp-s .hx-tg small { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--a-mut); font-size: .64em; }
  .mp-s .hx-tg > b.gr { flex: none; }
  .mp-s .hx-tz { color: var(--a-mut); font-size: .62em !important; }
  .mp-s .hx-sl { color: var(--a-mut); font-size: .72em; font-weight: 700; }
  .mp-s .hx-step { display: flex; align-items: center; gap: .55em; }
  .mp-s .hx-stl { flex: 1; font-size: .85em; font-weight: 600; }
  .mp-s .hx-sb { width: 2.4em; height: 2.4em; border-radius: 50%; display: grid; place-items: center; background: var(--a-in); border: 1px solid var(--a-line); color: var(--a-ink); flex: none; }
  .mp-s .hx-step > b { min-width: 1.6em; text-align: center; font-size: 1.3em; }
  .mp-s .hx-step > small { color: var(--a-mut); font-size: .78em; min-width: 2.2em; }
  .mp-s .hx-stc { justify-content: center; gap: 1em; }
  .mp-s .hx-chc { justify-content: center; }
  .mp-s .hx-live { display: block; padding: .55em .7em; border-radius: .7em; background: var(--a-soft); font-size: .74em; font-weight: 600; }
  .mp-s .hx-fn { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; color: var(--a-mut); font-size: .64em; }
  .mp-s .hx-split { display: flex; gap: .45em; align-items: flex-start; padding: .55em .65em; border-radius: .7em; background: var(--a-soft); }
  .mp-s .hx-split .ic { color: var(--a-pri); width: 1.1em; height: 1.1em; }
  .mp-s .hx-split small { font-size: .72em; }

  /* dagitim ekrani (DistributionScreen) */
  .mp-s .hx-rot { display: flex; flex-direction: column; gap: .35em; padding: .75em .85em; }
  .mp-s .hx-rot b { font-size: .86em; }
  .mp-s .hx-rot small { color: var(--a-mut); font-size: .7em; }
  .mp-s .hx-wr { gap: .5em; }
  .mp-s .hx-wr > b { font-size: .86em; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-rt { display: flex; gap: .15em; padding: .18em; border-radius: .7em; background: var(--a-in); flex: none; }
  .mp-s .hx-rt i { font-style: normal; font-size: .66em; padding: .35em .5em; border-radius: .55em; color: var(--a-mut); white-space: nowrap; }
  .mp-s .hx-rt i.on { background: var(--a-card); color: var(--a-ink); font-weight: 700; }
  .mp-s .hx-strip { display: flex; gap: .12em; }
  .mp-s .hx-strip i { flex: 1; height: .5em; border-radius: .3em; background: var(--a-line); }
  .mp-s .hx-strip i.cur { background: var(--a-gold); }
  .mp-s .hx-cov { font-size: .68em; margin-top: -.3em; }
  .mp-s .hx-swl { display: none; padding: .45em .6em; border-radius: .6em; background: var(--a-soft); font-size: .68em; font-weight: 600; }
  .mp-s .hx-swl.show { display: block; }
  .mp-s .hx-dr { display: flex; align-items: center; gap: .5em; padding: .5em .6em; border-radius: .85em; background: var(--a-card); border: 1px solid var(--a-line); transition: box-shadow .25s ease; }
  .mp-s .hx-dr.sel { box-shadow: inset 0 0 0 .14em var(--a-pri); }
  .mp-s .hx-dn { width: 2.2em; height: 2.2em; border-radius: 50%; display: grid; place-items: center; background: var(--a-soft); font-size: .74em; font-weight: 700; flex: none; }
  .mp-s .hx-dw { flex: 1; min-width: 0; }
  .mp-s .hx-dw b { display: block; font-size: .82em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-dw small { display: block; color: var(--a-pri); font-size: .68em; }
  .mp-s .hx-wt { display: flex; align-items: center; gap: .45em; border: 1px solid var(--a-line); border-radius: .6em; padding: .2em .45em; font-size: .74em; flex: none; }
  .mp-s .hx-wt i { font-style: normal; color: var(--a-mut); }
  .mp-s .hx-sw { width: 1em; height: 1em; color: var(--a-mut); }

  /* gorev ekrani (app/flow/[id].tsx) */
  .mp-s .hx-fh { display: grid; grid-template-columns: 3.2em minmax(0, 1fr) 3.2em; align-items: center; padding: .35em 1em .45em; }
  .mp-s .hx-ft { text-align: center; min-width: 0; }
  .mp-s .hx-ft b { display: block; font-size: 1.08em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-ft small { display: block; font-size: .66em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-ft small + small { color: var(--a-mut); font-size: .6em; }
  .mp-s .hx-fi { display: flex; gap: .55em; justify-content: flex-end; color: var(--a-mut); }
  .mp-s .hx-fi .ic { width: 1.15em; height: 1.15em; }
  .mp-s .hx-fp { gap: .55em; padding-top: .3em; }
  .mp-s .hx-pr { padding: .65em .85em; }
  .mp-s .hx-pr b { font-size: .82em; }
  .mp-s .hx-pr small { color: var(--a-mut); font-size: .7em; }
  .mp-s .hx-pr .bar { margin-top: .4em; }
  .mp-s .hx-pr .hx-pn { display: block; font-size: .6em; margin-top: .35em; }
  .mp-s .hx-cd { background: var(--a-soft); border-radius: 1em; padding: .6em .85em; }
  .mp-s .hx-cd .cap { display: inline-flex; align-items: center; gap: .3em; color: var(--a-mut); }
  .mp-s .hx-cd .cap .ic { width: 1.15em; height: 1.15em; }
  .mp-s .hx-cd b { color: var(--a-pri); font-size: .86em; }
  .mp-s .hx-cd .bar { margin-top: .4em; background: color-mix(in srgb, var(--a-pri) 18%, transparent); }
  .mp-s .hx-cd > small { display: block; color: var(--a-mut); font-size: .62em; margin-top: .3em; }
  .mp-s .hx-gc { gap: .55em; }
  .mp.t-gul .mp-s .hx-gc .bt.wht { color: var(--a-g1); }
  .mp-s .hx-nt { display: flex; align-items: center; gap: .4em; padding: .55em .7em; border-radius: .7em; background: rgba(255, 255, 255, .14); color: rgba(255, 255, 255, .78); }
  .mp-s .hx-nt small { font-size: .7em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-nt .ic { width: 1em; height: 1em; }
  .mp-s .hx-nr { display: flex; flex-direction: column; gap: .4em; padding: .8em .9em; border-radius: 1em; background: var(--a-card); border: .12em solid color-mix(in srgb, var(--a-pri) 55%, transparent); }
  .mp-s .hx-nr .cap.gr { color: var(--a-pri); }
  .mp-s .hx-nrt { font-size: 1em; }
  .mp-s .bt.hx-nrb { height: 2.6em; font-size: .82em; }
  .mp-s .hx-ml { display: block; font-size: .86em; margin-top: .2em; }
  .mp-s .hx-lg { display: flex; flex-wrap: wrap; gap: .2em .7em; font-size: .62em; }
  .mp-s .hx-lg i { display: inline-block; width: .75em; height: .75em; border-radius: 50%; margin-inline-end: .3em; vertical-align: -.05em; }
  .mp-s .hx-lg i.c { background: var(--a-pri); } .mp-s .hx-lg i.p { background: #e8873a; } .mp-s .hx-lg i.s { background: var(--a-red); } .mp-s .hx-lg i.h { background: var(--a-gold); }
  .mp-s .hx-mr { display: flex; align-items: center; gap: .65em; padding: .5em .75em; border-radius: .85em; background: var(--a-card); font-size: .82em; }
  .mp-s .hx-mr.me { background: var(--a-soft); }
  .mp-s .hx-mr > span:not(.hx-mav) { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-s .hx-mr b { color: var(--a-mut); font-weight: 600; font-size: .92em; white-space: nowrap; }
  .mp-s .hx-mav { width: 2.1em; height: 2.1em; border-radius: 50%; display: grid; place-items: center; font-weight: 700; color: var(--a-pri); flex: none; box-shadow: inset 0 0 0 .13em #e8873a; }
  .mp-s .hx-mav.s { box-shadow: inset 0 0 0 .13em var(--a-red); }
  .mp-s .ov[data-in="toast"] .scrim { display: none; }
  .mp-s .hx-toast { position: absolute; top: 3.4em; left: .9em; right: .9em; display: flex; gap: .55em; align-items: center; padding: .7em .85em; border-radius: 1em; background: var(--a-card); border: 1px solid var(--a-line); box-shadow: 0 .8em 1.6em -.8em rgba(0, 0, 0, .35); opacity: 0; transform: translateY(-1em); transition: opacity .35s ease, transform .4s cubic-bezier(.2, 1.1, .3, 1); }
  .mp-s .ov.on .hx-toast { opacity: 1; transform: none; }
  .mp-s .hx-toast .ic { color: var(--a-pri); }
  .mp-s .hx-toast small { font-size: .74em; }

  /* merkez karti: 30 tane, turlar */
  .mp-s .hx-k { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1em 1.2em 3em; gap: .3em; }
  .mp-s .hx-kt { font-size: 1.6em; font-weight: 800; line-height: 1.15; }
  .mp-s .hx-k > small.mu { font-size: .84em; }
  .mp-s .hx-kr { position: relative; width: 17.5em; height: 17.5em; margin: 1.3em 0 1em; }
  .mp-s .hx-kr svg { position: absolute; inset: 0; width: 100%; height: 100%; }
  .mp-s .hx-kr circle { fill: color-mix(in srgb, var(--a-mut) 24%, transparent); transition: fill .6s ease, opacity .6s ease; }
  .mp-s .hx-k .m0 { --c: var(--a-gold); } .mp-s .hx-k .m1 { --c: var(--a-pri); } .mp-s .hx-k .m2 { --c: #6f8fb8; } .mp-s .hx-k .m3 { --c: #7f9f6a; } .mp-s .hx-k .m4 { --c: #c0865a; }
  .mp-s .hx-kr.r1 .t0, .mp-s .hx-kr.r2 .t1, .mp-s .hx-kr.r3 .t2 { fill: var(--c); }
  .mp-s .hx-kr.r2 .t0, .mp-s .hx-kr.r3 .t0, .mp-s .hx-kr.r3 .t1 { fill: var(--c); opacity: .45; }
  .mp-s .hx-kc { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .2em; }
  .mp-s .hx-kc b { font-size: 2.1em; font-weight: 800; line-height: 1.1; }
  .mp-s .hx-kc small { font-size: 1.05em; color: var(--a-pri); font-weight: 700; }
  .mp-s .hx-kl { display: flex; flex-wrap: wrap; justify-content: center; gap: .35em .9em; font-size: .9em; }
  .mp-s .hx-kl i { display: inline-block; width: .8em; height: .8em; border-radius: 50%; background: var(--c); margin-inline-end: .3em; vertical-align: -.05em; }
`;
