/*
  Cloudflare Turnstile: web misafir KATKILARI için bot doğrulaması.
  ─────────────────────────────────────────────────────────────────────────
  İki sayfa kullanır: halka.html (tek seferlik halka, `guest-event`) ve
  ortak-okuma.html + ana sayfa kartı (Ortak Okuma, `guest-global`).
  ⚠️ TEK KAYNAK: iki sayfaya ayrı ayrı kopyalanırsa biri güncellenir, öteki
  unutulur ve o sayfada her katkı 403 alır.

  Sunucu tarafı: ana repo `supabase/functions/_shared/webGuestGate.ts`.
  Orada `TURNSTILE_SECRET` tanımlıysa YAZMA isteklerinde `turnstile` alanı
  zorunlu; tanımsızsa katman kapalı ve alan yok sayılır.

  ⚠️ AÇMA SIRASI (tersi bütün katkıları kırar):
    1. SITEKEY bu dosyaya yazılır ve site yayına girer (sayfa jeton gönderir,
       sunucu henüz bakmaz, zararsız).
    2. ANCAK ONDAN SONRA Supabase'e `TURNSTILE_SECRET` girilir.
  Secret önce girilirse sayfa jeton göndermediği için her katkı reddedilir.

  Gizlilik: Cloudflare'e YALNIZ katkı anında bağlanılır (bölüm üstlenme,
  zikir ekleme, ad yazma...). Tahtaya bakan, okuyan ziyaretçi için betik HİÇ
  yüklenmez. Gizlilik metni §2.4 bu davranışı anlatıyor; sayfa açılışında
  yüklemeye çevirirsen metin yanlış olur.

  Jeton tek kullanımlıktır (Cloudflare ikinci doğrulamayı reddeder) ve 300 sn
  geçerlidir. Bu yüzden her yazma kendi jetonunu alır; kullanılan jetondan
  hemen sonra arka planda bir sonraki hazırlanır, ikinci katkı beklemez.
*/
(function () {
  'use strict';

  // PUBLIC site anahtarı (sayfada görünür, gizli DEĞİL). Boşsa katman kapalı.
  var SITEKEY = '0x4AAAAAAFFnUusO6KcVLPno';

  // Yerelde (jekyll serve / launch.json) Cloudflare'in "her zaman geçer" test
  // anahtarı. Ürettiği sahte jetonu üretimdeki secret REDDEDER, yani secret
  // açıldıktan sonra yerelden üretime katkı gönderilemez; bu bilinçli.
  var TEST_SITEKEY = '1x00000000000000000000AA';
  var LOCAL = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var KEY = SITEKEY ? (LOCAL ? TEST_SITEKEY : SITEKEY) : '';

  var API = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__mhTurnstileLoaded';
  var LANGS = { tr: 'tr', en: 'en', de: 'de', fr: 'fr', ar: 'ar' };
  var WAIT_MS = 120000;   // kullanıcıya kutucuk gösterilirse işaretlemesi için süre

  var loading = null;     // betik yükleme sözü
  var widgetId = null;
  var box = null;         // yalnız etkileşim gerekince görünen kap
  var ready = null;       // hazır bekleyen jeton
  var waiters = [];       // jeton bekleyen yazmalar
  var needsTap = false;   // Cloudflare kutucuk istedi, henüz işaretlenmedi

  function loadScript() {
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      window.__mhTurnstileLoaded = function () { resolve(); };
      var s = document.createElement('script');
      s.src = API;
      s.async = true;
      s.onerror = function () { loading = null; reject(new Error('turnstile_load')); };
      document.head.appendChild(s);
    });
    return loading;
  }

  function settle(token) {
    var w = waiters;
    waiters = [];
    w.forEach(function (fn) { fn(token); });
  }

  function onToken(token) {
    if (waiters.length) {
      // Bekleyen varsa jeton doğrudan ona gider; saklanmaz, çünkü tek kullanımlık.
      var first = waiters.shift();
      first(token);
      renew();
    } else {
      ready = token;
    }
  }

  // Kullanılan jetondan sonra yenisini arka planda üret.
  function renew() {
    if (widgetId !== null && window.turnstile) {
      try { window.turnstile.reset(widgetId); } catch (e) { /* bir sonraki çağrı yeniden kurar */ }
    }
  }

  // Kutu YALNIZ bir katkı jeton beklerken görünür. Arka planda hazırlanan
  // sonraki jeton kutucuk isterse, kullanıcı bir şey yapmıyorken ekrana kutu
  // fırlamasın: bir sonraki katkıya kadar gizli bekler.
  function syncBox() {
    if (box) box.style.display = (needsTap && waiters.length) ? 'block' : 'none';
  }

  function ensureWidget() {
    if (widgetId !== null) return Promise.resolve();
    return loadScript().then(function () {
      if (widgetId !== null) return;
      // Sayfanın kendi tema düğmesi `data-theme` yazar; yoksa sistem tercihi.
      var t = document.documentElement.getAttribute('data-theme');
      var dark = t ? t === 'dark'
        : !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      box = document.createElement('div');
      box.id = 'mh-turnstile';
      box.setAttribute('style',
        'display:none;position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom, 0px));transform:translateX(-50%);' +
        'z-index:2147483000;padding:10px;border-radius:14px;' +
        'background:' + (dark ? '#1b2624' : '#fff') + ';' +
        'box-shadow:0 6px 28px rgba(0,0,0,.18);');
      document.body.appendChild(box);
      var l = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
      widgetId = window.turnstile.render(box, {
        sitekey: KEY,
        action: 'guest_write',
        appearance: 'interaction-only',
        theme: dark ? 'dark' : 'light',
        language: LANGS[l] || 'auto',
        'refresh-expired': 'auto',
        callback: function (t) { needsTap = false; onToken(t); syncBox(); },
        'before-interactive-callback': function () { needsTap = true; syncBox(); },
        'after-interactive-callback': function () { needsTap = false; syncBox(); },
        'expired-callback': function () { ready = null; },
        // Hata ya da zaman aşımında bekleyeni ASILI bırakma: jetonsuz gider,
        // sunucu 403 `verification_failed` döner ve sayfa bunu anlatır.
        'error-callback': function () { ready = null; needsTap = false; settle(undefined); syncBox(); },
        'timeout-callback': function () { ready = null; needsTap = false; settle(undefined); syncBox(); }
      });
    });
  }

  /** Yazmadan hemen önce çağrılır. Katman kapalıysa `undefined` döner. */
  function token() {
    if (!KEY) return Promise.resolve(undefined);
    return ensureWidget().then(function () {
      if (ready) {
        var t = ready;
        ready = null;
        renew();
        return t;
      }
      return new Promise(function (resolve) {
        var done = false;
        function once(t) { if (!done) { done = true; resolve(t); } }
        waiters.push(once);
        syncBox();
        setTimeout(function () {
          var i = waiters.indexOf(once);
          if (i >= 0) waiters.splice(i, 1);
          syncBox();
          once(undefined);
        }, WAIT_MS);
      });
    }).catch(function () { return undefined; });
  }

  window.MHTurnstile = {
    enabled: function () { return !!KEY; },
    token: token
  };
})();
