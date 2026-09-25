/*
 * Kimlik doğrulama köprü sayfaları (auth/verify.html + auth/reset-password.html)
 * için ortak mantık ve 5 dilli metin.
 *
 * Supabase e-postadaki bağlantıyı doğruladıktan sonra kullanıcıyı buraya
 * yönlendirir. Uygulama yüklüyse Universal Link / App Link sayfayı HİÇ
 * göstermeden uygulamayı açar; bu sayfa yalnız o tetiklenmediğinde görünür
 * (ör. Gmail'in kendi tarayıcısı, masaüstü).
 *
 * ⛔ Uygulamayı OTOMATİK açmaya çalışma. Tarayıcılar şemaya otomatik geçişi
 * engelliyor, yalnız kullanıcının dokunduğu bağlantıya izin veriyor (join.html
 * için 30 Ağu 2026'da iki platformda ölçüldü). Tek yol aşağıdaki düğme.
 *
 * Düğme, Universal Link'in taşıyacağı yolun AYNISINI şema ile taşır
 * (manevisosyal://auth/verify#..., manevisosyal://auth/reset-password#...).
 * Böylece uygulama tarafında (app/_layout.tsx handleUrl) jeton, hata ve
 * fragmentsiz hâl tam olarak Universal Link gelmiş gibi ele alınır.
 *
 * Taban dil İNGİLİZCE: eşleşmeyen tarayıcı dili Türkçeye değil İngilizceye düşer.
 * `?lang=xx` ile dil zorlanabilir (test ve ileride uygulamanın dil geçirmesi için).
 */
(function () {
  var FLOW = document.body.getAttribute('data-flow'); // 'reset' | 'verify'

  var S = {
    en: {
      resetTitle: 'Reset your password',
      resetBody: 'You’ll set your new password in the Manevi Halka app. Tap the button below to continue.',
      verifiedTitle: 'Your email is confirmed',
      verifiedBody: 'Open the app to continue.',
      stepTitle: 'First confirmation done',
      stepBody: 'To finish the change, also open the link we sent to your other email address.',
      neutralTitle: 'Continue in the app',
      neutralBody: 'This page passes email links on to the Manevi Halka app. Open the app to continue.',
      expiredTitle: 'This link has expired',
      invalidTitle: 'This link is not valid',
      resetErrBody: 'This link can no longer be used. Open the app and request a new link on the screen that appears.',
      verifyErrBody: 'This link can no longer be used. Open the app and sign in with your email and password. If your address isn’t confirmed yet, tap “Resend” there.',
      openApp: 'Open App',
      desktop: 'Open this link on the phone where the app is installed.',
      noApp: 'Don’t have the app yet?',
      privacy: 'Privacy', contact: 'Contact',
      titleReset: 'Reset password', titleVerify: 'Email confirmation'
    },
    tr: {
      resetTitle: 'Şifreni yenile',
      resetBody: 'Yeni şifreni Manevi Halka uygulamasında belirleyeceksin. Devam etmek için aşağıdaki düğmeye dokun.',
      verifiedTitle: 'E-posta adresin onaylandı',
      verifiedBody: 'Devam etmek için uygulamayı aç.',
      stepTitle: 'İlk onay tamam',
      stepBody: 'Değişikliği tamamlamak için diğer e-posta adresine gönderdiğimiz bağlantıyı da aç.',
      neutralTitle: 'Uygulamada devam et',
      neutralBody: 'Bu sayfa e-posta bağlantılarını Manevi Halka uygulamasına aktarır. Devam etmek için uygulamayı aç.',
      expiredTitle: 'Bağlantının süresi dolmuş',
      invalidTitle: 'Bağlantı geçersiz',
      resetErrBody: 'Bu bağlantı artık kullanılamıyor. Uygulamayı aç, açılan ekrandan yeni bir bağlantı iste.',
      verifyErrBody: 'Bu bağlantı artık kullanılamıyor. Uygulamayı açıp e-posta adresin ve şifrenle giriş yap. Adresin henüz onaylanmadıysa oradan “Tekrar Gönder”e dokun.',
      openApp: 'Uygulamayı Aç',
      desktop: 'Bu bağlantıyı uygulamanın yüklü olduğu telefonda aç.',
      noApp: 'Uygulaman yok mu?',
      privacy: 'Gizlilik', contact: 'İletişim',
      titleReset: 'Şifre yenileme', titleVerify: 'E-posta onayı'
    },
    de: {
      resetTitle: 'Passwort zurücksetzen',
      resetBody: 'Dein neues Passwort legst du in der Manevi Halka App fest. Tippe auf die Schaltfläche unten, um fortzufahren.',
      verifiedTitle: 'Deine E-Mail-Adresse ist bestätigt',
      verifiedBody: 'Öffne die App, um fortzufahren.',
      stepTitle: 'Erste Bestätigung erledigt',
      stepBody: 'Um die Änderung abzuschließen, öffne auch den Link, den wir an deine andere E-Mail-Adresse geschickt haben.',
      neutralTitle: 'In der App fortfahren',
      neutralBody: 'Diese Seite leitet E-Mail-Links an die Manevi Halka App weiter. Öffne die App, um fortzufahren.',
      expiredTitle: 'Dieser Link ist abgelaufen',
      invalidTitle: 'Dieser Link ist ungültig',
      resetErrBody: 'Dieser Link kann nicht mehr verwendet werden. Öffne die App und fordere auf dem angezeigten Bildschirm einen neuen Link an.',
      verifyErrBody: 'Dieser Link kann nicht mehr verwendet werden. Öffne die App und melde dich mit deiner E-Mail-Adresse und deinem Passwort an. Ist deine Adresse noch nicht bestätigt, tippe dort auf „Erneut senden“.',
      openApp: 'App öffnen',
      desktop: 'Öffne diesen Link auf dem Handy, auf dem die App installiert ist.',
      noApp: 'Du hast die App noch nicht?',
      privacy: 'Datenschutz', contact: 'Kontakt',
      titleReset: 'Passwort zurücksetzen', titleVerify: 'E-Mail-Bestätigung'
    },
    fr: {
      resetTitle: 'Réinitialise ton mot de passe',
      resetBody: 'Tu vas choisir ton nouveau mot de passe dans l’application Manevi Halka. Touche le bouton ci-dessous pour continuer.',
      verifiedTitle: 'Ton adresse e-mail est confirmée',
      verifiedBody: 'Ouvre l’application pour continuer.',
      stepTitle: 'Première confirmation effectuée',
      stepBody: 'Pour terminer le changement, ouvre aussi le lien envoyé à ton autre adresse e-mail.',
      neutralTitle: 'Continuer dans l’application',
      neutralBody: 'Cette page transmet les liens reçus par e-mail à l’application Manevi Halka. Ouvre l’application pour continuer.',
      expiredTitle: 'Ce lien a expiré',
      invalidTitle: 'Ce lien n’est pas valide',
      resetErrBody: 'Ce lien ne peut plus être utilisé. Ouvre l’application et demande un nouveau lien sur l’écran qui s’affiche.',
      verifyErrBody: 'Ce lien ne peut plus être utilisé. Ouvre l’application et connecte-toi avec ton e-mail et ton mot de passe. Si ton adresse n’est pas encore confirmée, touche « Renvoyer ».',
      openApp: 'Ouvrir l’application',
      desktop: 'Ouvre ce lien sur le téléphone où l’application est installée.',
      noApp: 'Tu n’as pas encore l’application ?',
      privacy: 'Confidentialité', contact: 'Contact',
      titleReset: 'Réinitialisation du mot de passe', titleVerify: 'Confirmation de l’e-mail'
    },
    ar: {
      resetTitle: 'إعادة تعيين كلمة المرور',
      resetBody: 'ستختار كلمة المرور الجديدة في تطبيق Manevi Halka. اضغط على الزر أدناه للمتابعة.',
      verifiedTitle: 'تم تأكيد بريدك الإلكتروني',
      verifiedBody: 'افتح التطبيق للمتابعة.',
      stepTitle: 'تم التأكيد الأول',
      stepBody: 'لإكمال التغيير، افتح أيضًا الرابط الذي أرسلناه إلى بريدك الإلكتروني الآخر.',
      neutralTitle: 'تابع في التطبيق',
      neutralBody: 'تنقل هذه الصفحة روابط البريد الإلكتروني إلى تطبيق Manevi Halka. افتح التطبيق للمتابعة.',
      expiredTitle: 'انتهت صلاحية هذا الرابط',
      invalidTitle: 'هذا الرابط غير صالح',
      resetErrBody: 'لم يعد بالإمكان استخدام هذا الرابط. افتح التطبيق واطلب رابطًا جديدًا من الشاشة التي تظهر.',
      verifyErrBody: 'لم يعد بالإمكان استخدام هذا الرابط. افتح التطبيق وسجّل الدخول ببريدك الإلكتروني وكلمة المرور. إن لم يكن عنوانك مؤكدًا بعد، فاضغط على «إعادة الإرسال».',
      openApp: 'فتح التطبيق',
      desktop: 'افتح هذا الرابط على الهاتف المثبّت عليه التطبيق.',
      noApp: 'أليس لديك التطبيق بعد؟',
      privacy: 'الخصوصية', contact: 'تواصل معنا',
      titleReset: 'إعادة تعيين كلمة المرور', titleVerify: 'تأكيد البريد الإلكتروني'
    }
  };

  // Politika son eki: permalink şeması /:basename.html, Türkçe eksiz.
  var POLICY_SUFFIX = { en: '-en', tr: '', de: '-de', fr: '-fr', ar: '-ar' };

  // Çizgi ikonlar (24'lük ızgara). width/height AÇIKÇA yazılır: boyutsuz SVG
  // kapsayıcısını doldurur (halka.html'de 277 px'lik ikon, 30 Ağu 2026).
  var ICONS = {
    key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3 20 3M16 7l3 3M18.5 4.5l2 2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    alert: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16.2v.3"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>'
  };

  var qs = new URLSearchParams(window.location.search);
  var forced = (qs.get('lang') || '').toLowerCase();
  var lang = S[forced] ? forced : (navigator.language || 'en').slice(0, 2).toLowerCase();
  if (!S[lang]) lang = 'en';
  var T = S[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  var rawHash = window.location.hash || '';
  var h = new URLSearchParams(rawHash.replace(/^#/, ''));
  var err = h.get('error_code') || h.get('error');
  var hasToken = !!h.get('access_token');
  var hasMessage = !!h.get('message'); // güvenli e-posta değişikliğinin ilk adımı

  var state;
  if (err) state = /expired/.test(err) ? 'expired' : 'invalid';
  else if (FLOW === 'reset') state = hasToken ? 'reset' : 'invalid';
  else if (hasToken) state = 'verified';
  else if (hasMessage) state = 'step';
  else state = 'neutral';

  var VIEW = {
    reset:    { icon: 'key',   tone: 'ok',   title: T.resetTitle,    body: T.resetBody },
    verified: { icon: 'check', tone: 'ok',   title: T.verifiedTitle, body: T.verifiedBody },
    step:     { icon: 'mail',  tone: 'ok',   title: T.stepTitle,     body: T.stepBody },
    neutral:  { icon: FLOW === 'reset' ? 'key' : 'check', tone: 'ok', title: T.neutralTitle, body: T.neutralBody },
    expired:  { icon: 'clock', tone: 'warn', title: T.expiredTitle,  body: FLOW === 'reset' ? T.resetErrBody : T.verifyErrBody },
    invalid:  { icon: 'alert', tone: 'warn', title: T.invalidTitle,  body: FLOW === 'reset' ? T.resetErrBody : T.verifyErrBody }
  }[state];

  // Uygulamaya giden adres: Universal Link'in yolunun aynısı + fragment.
  // İlk e-posta değişikliği adımında uygulamanın yapacağı bir şey yok; kök açılır.
  var appHref = state === 'step'
    ? 'manevisosyal://'
    : 'manevisosyal://auth/' + (FLOW === 'reset' ? 'reset-password' : 'verify') + rawHash;

  var ua = navigator.userAgent || '';
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/.test(ua);
  var isMobile = isIOS || isAndroid;

  function $(id) { return document.getElementById(id); }
  function svg(name) {
    return '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      ICONS[name] + '</svg>';
  }

  document.title = (FLOW === 'reset' ? T.titleReset : T.titleVerify) + ' · Manevi Halka';
  var badge = $('badge');
  badge.innerHTML = svg(VIEW.icon);
  badge.className = 'badge ' + VIEW.tone;
  $('title').textContent = VIEW.title;
  $('body').textContent = VIEW.body;

  var open = $('openApp');
  open.textContent = T.openApp;
  open.href = appHref;

  if (!isMobile) {
    open.style.display = 'none';
    $('desktopIcon').innerHTML = svg('phone');
    $('desktopText').textContent = T.desktop;
    $('desktop').style.display = 'flex';
  }

  $('noApp').textContent = T.noApp;
  if (isIOS) $('androidBtn').style.display = 'none';
  if (isAndroid) $('iosBtn').style.display = 'none';

  var priv = $('privacyLink');
  priv.textContent = T.privacy;
  priv.href = '/privacy' + POLICY_SUFFIX[lang] + '.html';
  $('contactLink').textContent = T.contact;

  document.body.classList.add('ready');
})();
