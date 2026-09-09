window.MHOrtakHatim = (function () {
  /**
   * Ortak Hatim bileşeni. AYNI KOD iki yerde çalışır: ana sayfadaki kart ve
   * /hatim.html. ⛔ İkinci bir kopya YAZMA; biri güncellenip öteki bayatlar
   * (bu repoda tam olarak bu yaşandı, _gen/build-locale-pages.mjs notuna bak).
   *
   * mount(host, { chrome: true })  -> /hatim.html: sayfa başlığı, politika
   *                                   bağlantıları, mağaza düğmesi, canlı
   *                                   senkron ve yoklama BU MODDA.
   * mount(host, { chrome: false }) -> ana sayfa kartı: yalnız bileşen. Canlı
   *                                   senkron ve yoklama YOK; ana sayfaya her
   *                                   ziyarette websocket açmak ve 20 sn'de bir
   *                                   sormak, kartın değerine göre pahalı.
   *                                   Sayılar eylemlerden sonra zaten tazeleniyor.
   */
  function mount(host, opts) {
    opts = opts || {};
    var CHROME = !!opts.chrome;
    host.classList.add('mhh');
    var stageEl = document.createElement('div');
    stageEl.className = 'stage';
    host.appendChild(stageEl);
  var SUPA_URL = 'https://ohmescuwjyaitykemuub.supabase.co';
  // Publishable (anon) anahtar. Gizli DEĞİL: APK içinde de dağıtılıyor ve tek
  // başına hiçbir şeye erişim vermez — misafir RPC'lerinin hepsi anon'a kapalı.
  var SUPA_ANON = 'sb_publishable_RsHHr49q-XcPki42KsXEjA_kBUOGupH';
  var FN = SUPA_URL + '/functions/v1/guest-global';
  var POLL_MS = 20000;
  // ⚠️ ZORUNLU FREN. Yayın kanalının adı sabit ve tahmin edilebilir; sahte
  // sinyal basan biri bütün istemcilere sınırsız okuma yaptırabilir. İki
  // tazeleme arasında en az bu kadar süre olur ve sayfa arka plandayken hiç
  // tazelenmez. (docs/WEB_KURESEL_OKUMA.md §9 — kaldırma.)
  var RT_WINDOW = 2000;

  // ── Diller. Taban İNGİLİZCE (Kural 9 ilkesi). ─────────────────────────────
  // ⚠️ "Allah" beş dilde de AYNEN kullanılır (uygulamayla tutarlı).
  // ⚠️ Türkçede "Cüz 7'nin" gibi ek üretilemez; cüz adı ile açıklama AYRI satırda.
  var S = {
    en: { loading:'Loading…',
      pageTitle:'Shared Reading', pageSub:'Read together with people all over the world: the shared khatm and the shared dhikr. No account needed.',
      tabHatim:'Khatm', tabZikir:'Dhikr',
      ongoing:'The recitation is in progress.',
      cycleN:'Recitation {n} is in progress', cycleFirst:'The first recitation is in progress',
      lgDone:'completed', lgHeld:'undertaken', lgFree:'available',
      cuzWord:'Juz',
      nextLbl:'Next portion', cuzN:'Juz {n}',
      closesIn:'{p} left to finish it', freeIn:'{p} available', takeThis:'Take this',
      avail:'Available', all:'All', full:'Full',
      mapHead:'Juz map', joinCta:'Join the shared reading',
      pagesRange:'Pages {a}-{b}',
      pageCount:'{p} pages',
      confirmQ:'Do you confirm that you will read this portion?',
      confirm:'I confirm, I will take it', cancel:'Cancel',
      entrustedU:'{u} are entrusted to you.',
      mayAccept:'May Allah accept it.',
      another:'Would you like to take another portion?', takeAnother:'Take another portion',
      none:'There is no portion available right now.', closed:'This recitation is closed.',
      quota:'You have reached your open portions. Mark them as finished to take more.',
      taken:'That portion was just taken. Let us give you another one.',
      amountLbl:'How much will you read?',
      myLbl:'Your portions', markDone:'I finished it', dropIt:'Remove', sure:'Sure?',
      doneMark:'Finished', pastCycle:'From an earlier recitation',
      gone:'This is not available right now.', slow:'Too many attempts. Please wait a moment and try again.',
      error:'Something went wrong. Please try again.',
      getApp:'Get the app', until:'Until {d}',
      keepLink:'Save this link to return to your portions later.', copy:'Copy link', copied:'Copied',
      zHead:'Shared dhikr and supplications', zOf:'{a} of {b}', zMine:'Your contribution: {n}',
      zRounds:'{n} rounds completed', zAdd:'Join the count', zSession:'Counted in this session',
      zSubmit:'Add my count', zNone:'There is no shared dhikr right now.', zZero:'Count first, then add it.',
      home:'Home', privacy:'Privacy', terms:'Terms', arrow:'→' },
    tr: { loading:'Yükleniyor…',
      pageTitle:'Ortak Okuma', pageSub:'Dünyanın her yerinden okuyanlarla aynı hatimde ve zikirde buluş. Hesap gerekmiyor.',
      tabHatim:'Hatim', tabZikir:'Zikir',
      ongoing:'Hatim devam ediyor.',
      cycleN:'{n}. hatim okunuyor', cycleFirst:'İlk hatim okunuyor',
      lgDone:'tamamlandı', lgHeld:'üstlenildi', lgFree:'müsait',
      cuzWord:'Cüz',
      nextLbl:'Sıradaki bölüm', cuzN:'{n}. Cüz',
      closesIn:'Bitmesine {p} kaldı', freeIn:'{p} müsait', takeThis:'Bunu al',
      avail:'Müsait', all:'Tümü', full:'Dolu',
      mapHead:'Cüz haritası', joinCta:'Ortak okumaya katıl',
      pagesRange:'Sayfa {a}-{b}',
      pageCount:'{p} sayfa',
      confirmQ:'Bu bölümü okuyacağını onaylıyor musun?',
      confirm:'Onaylıyorum, alıyorum', cancel:'Vazgeç',
      entrustedU:'{u} sana emanet edildi.',
      mayAccept:'Allah kabul etsin.',
      another:'Başka bir bölüm almak ister misin?', takeAnother:'Başka bölüm al',
      none:'Şu anda alınabilecek bölüm yok.', closed:'Bu hatim şu an kapalı.',
      quota:'Açık bölüm sınırına ulaştın. Aldıklarını tamamladıkça yenilerini alabilirsin.',
      taken:'Bu bölüm az önce alındı, sana başka bir bölüm verelim.',
      amountLbl:'Ne kadar okuyacaksın?',
      myLbl:'Aldığın bölümler', markDone:'Tamamladım', dropIt:'Kaldır', sure:'Emin misin?',
      doneMark:'Tamamlandı', pastCycle:'Önceki hatimden',
      gone:'Bu şu anda mevcut değil.', slow:'Çok fazla deneme oldu. Biraz bekleyip tekrar dene.',
      error:'Bir şeyler ters gitti. Tekrar dener misin?',
      getApp:'Uygulamayı indir', until:'{d} tarihine kadar',
      keepLink:'Bölümlerine sonra dönmek için bu bağlantıyı kaydet.', copy:'Bağlantıyı kopyala', copied:'Kopyalandı',
      zHead:'Ortak zikir ve dualar', zOf:'{b} hedefin {a} tanesi', zMine:'Senin katkın: {n}',
      zRounds:'{n} tur tamamlandı', zAdd:'Sayıma katıl', zSession:'Bu oturumda saydığın',
      zSubmit:'Katkımı ekle', zNone:'Şu anda ortak zikir yok.', zZero:'Önce say, sonra ekle.',
      home:'Ana sayfa', privacy:'Gizlilik', terms:'Şartlar', arrow:'→' },
    de: { loading:'Wird geladen…',
      pageTitle:'Gemeinsames Lesen', pageSub:'Lies gemeinsam mit Menschen aus aller Welt: dieselbe Chatma und dasselbe Dhikr. Ohne Konto.',
      tabHatim:'Chatma', tabZikir:'Dhikr',
      ongoing:'Die Chatma läuft.',
      cycleN:'Chatma {n} läuft', cycleFirst:'Die erste Chatma läuft',
      lgDone:'abgeschlossen', lgHeld:'übernommen', lgFree:'verfügbar',
      cuzWord:'Dschus',
      nextLbl:'Nächster Abschnitt', cuzN:'Dschus {n}',
      closesIn:'Noch {p} bis zum Abschluss', freeIn:'{p} verfügbar', takeThis:'Diesen nehmen',
      avail:'Verfügbar', all:'Alle', full:'Vergeben',
      mapHead:'Dschus-Karte', joinCta:'Beim gemeinsamen Lesen mitmachen',
      pagesRange:'Seite {a}-{b}',
      pageCount:'{p} Seiten',
      confirmQ:'Bestätigst du, dass du diesen Abschnitt liest?',
      confirm:'Ich bestätige, ich nehme ihn', cancel:'Abbrechen',
      entrustedU:'{u} ist dir anvertraut.',
      mayAccept:'Möge Allah es annehmen.',
      another:'Möchtest du einen weiteren Abschnitt nehmen?', takeAnother:'Weiteren Abschnitt nehmen',
      none:'Zurzeit ist kein Abschnitt verfügbar.', closed:'Diese Chatma ist derzeit geschlossen.',
      quota:'Du hast dein Limit an offenen Abschnitten erreicht. Markiere sie als gelesen, um weitere zu nehmen.',
      taken:'Dieser Abschnitt wurde gerade vergeben. Wir geben dir einen anderen.',
      amountLbl:'Wie viel wirst du lesen?',
      myLbl:'Deine Abschnitte', markDone:'Ich habe ihn gelesen', dropIt:'Entfernen', sure:'Sicher?',
      doneMark:'Gelesen', pastCycle:'Aus einer früheren Chatma',
      gone:'Das ist zurzeit nicht verfügbar.', slow:'Zu viele Versuche. Warte kurz und versuche es erneut.',
      error:'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
      getApp:'App installieren', until:'Bis {d}',
      keepLink:'Speichere diesen Link, um später zu deinen Abschnitten zurückzukehren.', copy:'Link kopieren', copied:'Kopiert',
      zHead:'Gemeinsame Dhikr und Gebete', zOf:'{a} von {b}', zMine:'Dein Beitrag: {n}',
      zRounds:'{n} Runden abgeschlossen', zAdd:'Mitzählen', zSession:'In dieser Sitzung gezählt',
      zSubmit:'Beitrag hinzufügen', zNone:'Zurzeit gibt es kein gemeinsames Dhikr.', zZero:'Zähle zuerst, dann füge hinzu.',
      home:'Startseite', privacy:'Datenschutz', terms:'Nutzungsbedingungen', arrow:'→' },
    fr: { loading:'Chargement…',
      pageTitle:'Lecture commune', pageSub:'Lis avec des gens du monde entier : la même khatma et le même dhikr. Sans compte.',
      tabHatim:'Khatma', tabZikir:'Dhikr',
      ongoing:'La khatma est en cours.',
      cycleN:'La khatma {n} est en cours', cycleFirst:'La première khatma est en cours',
      lgDone:'terminées', lgHeld:'prises', lgFree:'disponibles',
      cuzWord:'Juz',
      nextLbl:'Portion suivante', cuzN:'Juz {n}',
      closesIn:'Encore {p} pour la terminer', freeIn:'{p} disponibles', takeThis:'Prendre celle-ci',
      avail:'Disponible', all:'Tout', full:'Prise',
      mapHead:'Carte des juz', joinCta:'Rejoindre la lecture commune',
      pagesRange:'Pages {a}-{b}',
      pageCount:'{p} pages',
      confirmQ:'Confirmes-tu que tu liras cette portion ?',
      confirm:'Je confirme, je la prends', cancel:'Annuler',
      entrustedU:'{u} te sont confiés.',
      mayAccept:'Qu’Allah l’accepte.',
      another:'Veux-tu prendre une autre portion ?', takeAnother:'Prendre une autre portion',
      none:'Aucune portion disponible pour le moment.', closed:'Cette khatma est fermée pour le moment.',
      quota:'Tu as atteint ta limite de portions en cours. Marque-les comme terminées pour en prendre d’autres.',
      taken:'Cette portion vient d’être prise. Nous t’en donnons une autre.',
      amountLbl:'Combien vas-tu lire ?',
      myLbl:'Tes portions', markDone:'Je l’ai terminée', dropIt:'Retirer', sure:'Sûr ?',
      doneMark:'Terminée', pastCycle:'D’une khatma précédente',
      gone:'Ceci n’est pas disponible pour le moment.', slow:'Trop de tentatives. Patiente un instant et réessaie.',
      error:'Une erreur est survenue. Réessaie.',
      getApp:'Installer l’application', until:'Jusqu’au {d}',
      keepLink:'Enregistre ce lien pour revenir à tes portions plus tard.', copy:'Copier le lien', copied:'Copié',
      zHead:'Dhikr et invocations communes', zOf:'{a} sur {b}', zMine:'Ta contribution : {n}',
      zRounds:'{n} tours terminés', zAdd:'Participer au décompte', zSession:'Compté dans cette session',
      zSubmit:'Ajouter mon décompte', zNone:'Aucune invocation commune pour le moment.', zZero:'Compte d’abord, puis ajoute.',
      home:'Accueil', privacy:'Confidentialité', terms:'Conditions', arrow:'→' },
    ar: { loading:'…جارٍ التحميل',
      pageTitle:'القراءة المشتركة', pageSub:'.اقرأ مع أناس من كل أنحاء العالم: الختمة نفسها والذكر نفسه، دون حساب',
      tabHatim:'الختمة', tabZikir:'الذكر',
      ongoing:'.الختمة جارية',
      cycleN:'الختمة {n} جارية', cycleFirst:'الختمة الأولى جارية',
      lgDone:'مكتملة', lgHeld:'متعهَّد بها', lgFree:'متاحة',
      cuzWord:'جزء',
      nextLbl:'الجزء التالي', cuzN:'الجزء {n}',
      closesIn:'بقي {p} لإتمامه', freeIn:'{p} متاحة', takeThis:'خذ هذا',
      avail:'المتاح', all:'الكل', full:'مأخوذ',
      mapHead:'خريطة الأجزاء', joinCta:'شارك في القراءة المشتركة',
      pagesRange:'الصفحات {a}-{b}',
      pageCount:'{p} صفحة',
      confirmQ:'هل تؤكد أنك ستقرأ هذا الجزء؟',
      confirm:'أؤكد، سآخذه', cancel:'إلغاء',
      entrustedU:'.{u} أمانة لديك',
      mayAccept:'.تقبّل الله',
      another:'هل تريد أخذ جزء آخر؟', takeAnother:'خذ جزءًا آخر',
      none:'.لا يوجد جزء متاح الآن', closed:'.هذه الختمة مغلقة حاليًا',
      quota:'.بلغت حدّ الأجزاء المفتوحة. أتمّها لتأخذ المزيد',
      taken:'.أُخذ هذا الجزء للتو، سنعطيك جزءًا آخر',
      amountLbl:'كم ستقرأ؟',
      myLbl:'أجزاؤك', markDone:'أتممته', dropIt:'إزالة', sure:'متأكد؟',
      doneMark:'تم', pastCycle:'من ختمة سابقة',
      gone:'.غير متاح حاليًا', slow:'.محاولات كثيرة. انتظر قليلًا ثم أعد المحاولة',
      error:'.حدث خطأ ما. حاول مرة أخرى',
      getApp:'ثبّت التطبيق', until:'حتى {d}',
      keepLink:'.احفظ هذا الرابط للعودة إلى أجزائك لاحقًا', copy:'انسخ الرابط', copied:'تم النسخ',
      zHead:'الأذكار والأدعية المشتركة', zOf:'{a} من {b}', zMine:'مشاركتك: {n}',
      zRounds:'اكتملت {n} جولة', zAdd:'شارك في العدّ', zSession:'ما عددته في هذه الجلسة',
      zSubmit:'أضف عدّي', zNone:'.لا يوجد ذكر مشترك حاليًا', zZero:'.عُدّ أولاً ثم أضف',
      home:'الرئيسية', privacy:'الخصوصية', terms:'الشروط', arrow:'←' }
  };

  /* Zikir adları ve anlamları. ⚠️ ELLE YAZILMADI: uygulamanın
     locales/<dil>.json → globalDhikr.<slug>.name/.meaning değerlerinden
     alındı, birebir aynı. Uygulamada değişirse buraya da taşı.
     ⚠️ AYET AYET MEAL BURAYA KONMAZ: Kur'an kaynaklı üç zikrin meali
     uygulamada Tanzil edisyonundan okunuyor ve o metni herkese açık bir
     sayfaya basmak lisans sorununu siteye taşır (docs §5.3). Burada yalnız
     tek satırlık tanım var. */
  var DHIKR = {
    en:{fatiha:["Surah al-Fatiha","The opening surah of the Qur'an"],ihlas:["Surah al-Ikhlas","The surah of sincere faith (Tawhid)"],ayetelkursi:["Ayat al-Kursi","Verse 255 of Surah al-Baqarah"],salavat:["Salawat","Sending blessings upon the Prophet (peace be upon him)"],tefriciye:["Salat at-Tafrijiyya","A salawat recited for relief from distress"],hasbinallah:["Hasbunallahu wa ni'mal-Wakil","Allah is sufficient for us, the best Disposer of affairs"]},
    tr:{fatiha:["Fâtiha-i Şerîfe","Kur'an'ın açılış sûresi"],ihlas:["İhlâs-ı Şerîf","İhlâs sûresi (Tevhid)"],ayetelkursi:["Âyetü'l-Kürsî","Bakara sûresi 255. âyet"],salavat:["Salavât-ı Şerîfe","Peygamberimize (s.a.v.) salât ü selâm getirmek"],tefriciye:["Salât-ı Tefrîciye","Sıkıntıların giderilmesi için okunan salavât"],hasbinallah:["Hasbünallâhü ve ni'mel-vekîl","Allah bize yeter, O ne güzel vekildir"]},
    de:{fatiha:["Sure al-Fatiha","Die Eröffnungssure des Korans"],ihlas:["Sure al-Ichlas","Die Sure des aufrichtigen Glaubens (Tauhid)"],ayetelkursi:["Ayat al-Kursi","Vers 255 der Sure al-Baqara"],salavat:["Salawat","Segenswünsche für den Propheten (Friede sei mit ihm)"],tefriciye:["Salat at-Tafridschiyya","Ein Salawat zur Linderung von Not"],hasbinallah:["Hasbunallahu wa ni'mal-Wakil","Allah genügt uns, und Er ist der beste Sachwalter"]},
    fr:{fatiha:["Sourate al-Fatiha","La sourate d'ouverture du Coran"],ihlas:["Sourate al-Ikhlas","La sourate de la foi sincère (Tawhid)"],ayetelkursi:["Ayat al-Kursi","Verset 255 de la sourate al-Baqara"],salavat:["Salawat","Prières sur le Prophète (paix sur lui)"],tefriciye:["Salat at-Tafrijiyya","Un salawat pour le soulagement des épreuves"],hasbinallah:["Hasbunallahu wa ni'mal-Wakil","Allah nous suffit, et quel excellent Garant"]},
    ar:{fatiha:["سورة الفاتحة","سورة فاتحة الكتاب"],ihlas:["سورة الإخلاص","سورة التوحيد والإخلاص"],ayetelkursi:["آية الكرسي","الآية ٢٥٥ من سورة البقرة"],salavat:["الصلاة على النبي ﷺ","الصلاة والسلام على النبي محمد ﷺ"],tefriciye:["الصلاة التفريجية","صلاة تُقرأ لتفريج الكروب"],hasbinallah:["حسبنا الله ونعم الوكيل","حسبنا الله ونعم الوكيل"]}
  };

  var POLICY_SUFFIX = { en:'-en', tr:'', de:'-de', fr:'-fr', ar:'-ar' };
  var NAME_IDX = { tr:0, en:1, de:1, fr:1, ar:2 };
  var LOCALE_TAG = { tr:'tr-TR', en:'en-US', de:'de-DE', fr:'fr-FR', ar:'ar' };

  var params = new URLSearchParams(location.search);
  // Dil sırası: çağıranın verdiği > ?lang= > ana sayfanın kaydettiği seçim
  // (mh_lang) > tarayıcı > İngilizce. mh_lang ORTAK: ana sayfada Türkçe seçen
  // kişi /hatim.html'i de Türkçe açar.
  var lang = (opts.lang || params.get('lang') || '').slice(0,2).toLowerCase();
  if (!S[lang]) { try { lang = localStorage.getItem('mh_lang') || ''; } catch (e) { lang = ''; } }
  if (!S[lang]) lang = (navigator.language || 'en').slice(0,2).toLowerCase();
  if (!S[lang]) lang = 'en';
  var T = S[lang];
  if (CHROME) {
    document.documentElement.lang = lang;
    // ⚠️ Her iki yönü de YAZ. Yalnız 'ar' iken rtl kurmak yetmiyordu: dil
    // seçiciyle Arapçadan çıkan kullanıcıda yön rtl kalıyordu.
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  }

  function fmt(s, o) { return String(s).replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }
  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, txt) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (txt != null) d.textContent = txt;
    return d;
  }
  function nf(n) { return Number(n || 0).toLocaleString(LOCALE_TAG[lang]); }

  // Sayfa chrome'u yalnız /hatim.html'de var; kart modunda bu düğümler YOK.
  if (CHROME) {
    document.title = T.pageTitle + ' · Manevi Halka';
    $('title').textContent = T.pageTitle;
    $('heroSub').textContent = T.pageSub;
    $('metaDesc').setAttribute('content', T.pageSub);
    $('homeLink').textContent = T.home;
    $('privacyLink').textContent = T.privacy;
    $('privacyLink').href = '/privacy' + POLICY_SUFFIX[lang] + '.html';
    $('termsLink').textContent = T.terms;
    $('termsLink').href = '/terms' + POLICY_SUFFIX[lang] + '.html';
  }

  // ── Durum ─────────────────────────────────────────────────────────────────
  // ⚠️ Misafir jetonu KAYNAK BAĞIMSIZ (halka.html'den fark: orada event
  // başınaydı). Tek tarayıcı kimliği Kur'an, Cevşen ve zikirlerin üçüne
  // birden hizmet eder; misafirden üç ayrı jeton taşıması istenemez.
  var guestKey = 'mh_global_guest';
  var guestToken = params.get('g') || localStorage.getItem(guestKey) || null;
  if (params.get('g')) { try { localStorage.setItem(guestKey, params.get('g')); } catch (e) {} }

  // ⚠️ İKİ SEKME: Zikir ve Hatim. İkisini tek ekranda alt alta koymak DENENDİ
  // ve BEĞENİLMEDİ (kullanıcı, 9 Eyl 2026: "bu ikisinin karışık göründüğü
  // ekranı beğenmedim"). Sekmeler ayırıyor, her sekme kendi içinde TAM AÇIK
  // (genişlet/daralt yok).
  // ⚠️ VARSAYILAN ZİKİR, Hatim değil (kullanıcı isteği: "ilk olarak ekranda
  // ortak zikirler görünsün"). Zikir tek dokunuşluk bir katkı, hatim taahhüt
  // gerektiriyor; düşük eşikli olan önce geliyor.
  // ⚠️ Cevşen SUNUCUDA AÇIK (kota 10 bab, tahta hazır) ama sitede
  // gösterilmiyor; geri açmak için bab etiketlerini geri getirmek yeterli,
  // sunucu tarafında hiçbir şey gerekmiyor.
  var PAGE_URL = '/ortak-okuma.html';
  var TABS = ['zikir', 'hatim'];
  var tab = params.get('t');
  if (TABS.indexOf(tab) < 0) tab = 'zikir';

  var REFS = null, NAMES = null;
  var board = null, dhikr = null, offer = null, busy = false;
  var chosenLen = null;
  var filter = 'avail';
  // ⚠️ Ekran durumu AÇIK DEĞİŞKENDE tutulur; DOM'a bakarak çıkarmak kırılgan.
  var mode = 'loading';   // loading | board | confirm | done | count | message

  function newGuestToken() {
    var a = new Uint8Array(32); crypto.getRandomValues(a);
    return Array.prototype.map.call(a, function (b) {
      return ('0' + b.toString(16)).slice(-2);
    }).join('');
  }
  function ensureGuest() {
    if (!guestToken) {
      guestToken = newGuestToken();
      try { localStorage.setItem(guestKey, guestToken); } catch (e) {}
    }
    return guestToken;
  }

  // ── Sûre + âyet (yalnız Kur'an) ──────────────────────────────────────────
  // ⚠️ Sayfa numarası ÖNDE ve ÇIPLAK, sûre parantezde altta (kilitli karar).
  function surahName(n) {
    if (!NAMES || !NAMES[n]) return '';
    return NAMES[n][NAME_IDX[lang]] || NAMES[n][1] || '';
  }
  function refLabel(a, b) {
    if (!REFS) return '';
    var x = REFS[a - 1], y = REFS[b - 1];
    if (!x || !y) return '';
    var fs = x[0].split(':'), ls = y[1].split(':');
    var left = surahName(+fs[0]) + ' ' + fs[1];
    var right = (fs[0] === ls[0]) ? ls[1] : (surahName(+ls[0]) + ' ' + ls[1]);
    // U+2192 bidi tarafından aynalanmaz; Arapçada '←' kullanılır.
    return left + ' ' + T.arrow + ' ' + right;
  }
  function unitLabel(a, b) { return fmt(T.pagesRange, { a:a, b:b }); }
  function unitCount(n)     { return fmt(T.pageCount,  { p:n }); }

  // ── Sunucu ────────────────────────────────────────────────────────────────
  // ⚠️ halka.html'den fark: burada `web_token` YOK. Kaynağı `type` seçer.
  function call(action, extra) {
    var body = Object.assign({ action: action }, extra || {});
    if (guestToken) body.guest_token = guestToken;
    return fetch(FN, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'apikey':SUPA_ANON,
                 'Authorization':'Bearer ' + SUPA_ANON },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.json().then(function (j) { return { status:r.status, body:j }; });
    });
  }

  /**
   * Sunucudan gelen SABİT hata anahtarını kullanıcı metnine çevirir.
   * ⚠️ Tanınmayan her hatayı "bir şeyler ters gitti" diye göstermek KÖTÜ
   * (halka.html'de öğrenildi). Bilinen hâller AÇIKÇA anlatılır.
   * Dönen: [metin, sayfaYenilenmeli]
   */
  function errText(code) {
    if (code === 'block_taken')   return [T.taken, true];
    if (code === 'quota_reached') return [T.quota, false];
    if (code === 'closed')        return [T.closed, false];
    if (code === 'not_found')     return [T.gone, false];
    if (code === 'claim_gone')    return [T.gone, true];
    if (code === 'rate_limited')  return [T.slow, false];
    return [T.error, false];
  }

  function stageMessage(text, isError) {
    mode = 'message';
    stageEl.innerHTML = '';
    var w = el('div', 'narrow');
    w.appendChild(el('div', 'msg' + (isError ? ' err' : ''), text));
    stageEl.appendChild(w);
  }

  var STORE_IOS = 'https://apps.apple.com/app/manevi-halka/id6760654292';
  var STORE_PLAY = 'https://play.google.com/store/apps/details?id=com.emrhnayz.spiritualcircle';
  function showAppCta() {
    if (!CHROME) return;
    // ⚠️ halka.html'den fark: orada davet kodu vardı ve düğme uygulamayı
    // AÇIYORDU. Burada davet yok; düğme mağazaya gider. Var olmayan bir derin
    // bağlantı uydurma.
    var a = $('appCta');
    a.href = /Android/i.test(navigator.userAgent || '') ? STORE_PLAY : STORE_IOS;
    a.textContent = T.getApp;
    a.classList.remove('hidden');
  }
  function hideAppCta() { if (CHROME) $('appCta').classList.add('hidden'); }

  // ── Ortak parçalar ────────────────────────────────────────────────────────
  function icon(d) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('fill', 'none');
    s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '1.6');
    s.setAttribute('stroke-linecap', 'round');
    s.setAttribute('stroke-linejoin', 'round');
    // ⚠️ Boyutsuz SVG kapsayıcıyı DOLDURUR; viewBox tek başına yetmez
    // (halka.html'de 277x277 px çizilen bir ikon bu yüzden oluştu).
    s.setAttribute('width', '16'); s.setAttribute('height', '16');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    s.appendChild(p);
    return s;
  }
  function panelHead(text, d) {
    var h = el('div', 'panel-head');
    h.appendChild(icon(d));
    h.appendChild(el('span', null, text));
    return h;
  }
  var ICON_PROGRESS = 'M3 12h4l3 8 4-16 3 8h4';
  var ICON_MINE     = 'M4 7h16M4 12h16M4 17h10';
  var ICON_NEXT     = 'M5 12h14M13 6l6 6-6 6';
  var ICON_CYCLE    = 'M4 12a8 8 0 0 1 13.7-5.7L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.7L4 16M4 20v-4h4';
  var ICON_ZIKIR    = 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z';

  /**
   * Üç durumlu ilerleme.
   * ⚠️ ALTIN KULLANMA: "üstlenildi"yi altın yapmak onu ödül gibi gösterir.
   */
  function progressNode() {
    var total = board.total, done = board.done, held = board.claimed;
    var free = Math.max(0, total - done - held);

    var wrap = el('div', 'panel');
    wrap.appendChild(panelHead(T.ongoing, ICON_PROGRESS));
    var bar = el('div', 'bar');
    var d = el('div', 'done'); d.style.width = (done / Math.max(1,total) * 100) + '%';
    var h = el('div', 'held'); h.style.width = (held / Math.max(1,total) * 100) + '%';
    bar.appendChild(d); bar.appendChild(h);
    wrap.appendChild(bar);

    var lg = el('div', 'legend');
    [[T.lgDone, done, 'var(--done)'], [T.lgHeld, held, 'var(--held)'],
     [T.lgFree, free, 'var(--free)']].forEach(function (p) {
      var k = el('span', 'k');
      var dot = el('span', 'dot'); dot.style.background = p[2];
      k.appendChild(dot);
      k.appendChild(el('span', null, nf(p[1]) + ' ' + p[0]));
      lg.appendChild(k);
    });
    wrap.appendChild(lg);

    // Bitiş tarihi YOK, tur VAR: sonsuz döngünün kaçıncı turundayız.
    var cy = el('div', 'cycle');
    cy.appendChild(icon(ICON_CYCLE));
    cy.appendChild(el('span', null,
      board.cycle > 1 ? fmt(T.cycleN, { n: board.cycle }) : T.cycleFirst));
    wrap.appendChild(cy);
    return wrap;
  }

  /**
   * Misafirin KENDİ aldıkları. Jeton tarayıcıda saklı; sunucu yalnız o jetonla
   * eşleşen satırları döndürüyor, BAŞKASININ bölümü asla görünmez.
   */
  function myNode() {
    var list = (board && board.mine) || [];
    if (!list.length) return null;
    var box = el('div', 'panel');
    box.appendChild(panelHead(T.myLbl, ICON_MINE));
    list.forEach(function (m) {
      var row = el('div', 'mine-row');
      row.appendChild(el('div', 'p', unitLabel(m.start, m.end)));
      var r = refLabel(m.start, m.end);
      if (r) row.appendChild(el('div', 'r', '(' + r + ')'));

      if (m.status === 'confirmed') {
        row.appendChild(el('div', 'tick', '✓ ' + T.doneMark));
      } else if (m.stale) {
        // Tur döndü: birim artık yok, iade edilecek bir şey de yok. Ama kişi
        // gerçekten okuduysa "Tamamladım" diyebilmeli; kaydı onun defteri.
        var acts0 = el('div', 'acts');
        var ok0 = el('button', 'primary', T.markDone);
        ok0.onclick = function () { confirmClaim(m.id); };
        acts0.appendChild(ok0);
        row.appendChild(acts0);
        row.appendChild(el('div', 'past', T.pastCycle));
      } else {
        var acts = el('div', 'acts');
        var ok = el('button', 'primary', T.markDone);
        ok.onclick = function () { confirmClaim(m.id); };
        // İki dokunuşlu onay: yanlışlıkla iade edip bölümü kaybetmesin.
        var rm = el('button', 'ghost', T.dropIt);
        var armed = false;
        rm.onclick = function () {
          if (!armed) { armed = true; rm.textContent = T.sure; return; }
          dropClaim(m.id);
        };
        acts.appendChild(ok); acts.appendChild(rm);
        row.appendChild(acts);
      }
      box.appendChild(row);
    });
    return box;
  }

  function groupLabel(g) { return fmt(T.cuzN, { n:g.g }); }

  function suggestNode() {
    var sg = board.suggest;
    if (!sg) return null;
    var g = null;
    (board.groups || []).forEach(function (x) { if (x.g === sg.g) g = x; });
    if (!g) return null;
    var box = el('div', 'suggest');
    box.appendChild(panelHead(T.nextLbl, ICON_NEXT));
    box.appendChild(el('div', 'cuz', groupLabel(g)));
    // ⚠️ "closes" yalnız grup GERÇEKTEN yarımsa true gelir; hiç dokunulmamış
    // cüze "bitmesine N sayfa kaldı" demek yanlış olur, kimse başlamamıştır.
    box.appendChild(el('div', 'sub', sg.closes
      ? fmt(T.closesIn, { p: unitCount(sg.free) })
      : fmt(T.freeIn,   { p: unitCount(sg.free) })));
    var b = el('button', 'primary', T.takeThis);
    b.onclick = function () { pickGroup(g.g); };
    box.appendChild(b);
    return box;
  }

  var ICON_MAP = 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z';

  function gridNode() {
    var wrap = el('div');
    wrap.appendChild(panelHead(T.mapHead, ICON_MAP));
    var tabs = el('div', 'tabs');
    [['avail', T.avail], ['all', T.all]].forEach(function (p) {
      var b = el('button', filter === p[0] ? 'on' : '', p[1]);
      b.onclick = function () { filter = p[0]; renderBoard(); };
      tabs.appendChild(b);
    });
    wrap.appendChild(tabs);

    var grid = el('div', 'grid');
    // ⛔ Sıra 1→N SABİT. Doluları sona atmak mekânsal hafızayı bozar;
    // "Müsait" süzgeci zaten onları kaldırıyor. (Uygulamanın kendi ızgarası
    // sona sıralıyor; web'de BİLEREK yapmıyoruz.)
    (board.groups || []).forEach(function (c) {
      if (filter === 'avail' && c.free === 0) return;
      var full = c.free === 0;
      var cell = el('div', 'cell' + (full ? ' full' : ''));
      cell.appendChild(el('div', 'n', ('0' + c.g).slice(-2)));
      cell.appendChild(el('div', 'u', T.cuzWord));
      cell.appendChild(el('div', 's',
        full ? T.full : fmt(T.freeIn, { p: unitCount(c.free) })));
      // Çubuk yalnız KISMİ dolulukta anlamlı; boş ve dolu kartta gürültü.
      if (!full && c.free < c.total) {
        var b = el('div', 'b');
        var bi = el('i'); bi.style.width = ((c.total - c.free) / c.total * 100) + '%';
        b.appendChild(bi); cell.appendChild(b);
      }
      if (!full) cell.onclick = function () { pickGroup(c.g); };
      grid.appendChild(cell);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  // ── Zikir ─────────────────────────────────────────────────────────────────
  var zItem = null, zSession = 0;

  function dhikrText(slug) {
    var t = (DHIKR[lang] && DHIKR[lang][slug]) || (DHIKR.en && DHIKR.en[slug]);
    return t || [slug, ''];
  }

  /** Tek zikrin içeriği. İKİ görünüm de bunu kullanır: daraltılmışta yatay
   *  kaydırılan kartın içi, genişletilmişte listedeki satır. Ayrışırlarsa
   *  aynı zikir iki yerde farklı görünür. */
  function zikirNode(it, cls) {
    var txt = dhikrText(it.slug);
    var row = el('div', cls);
    row.appendChild(el('div', 'zname', txt[0]));
    if (txt[1]) row.appendChild(el('div', 'zmean', txt[1]));
    // Arapça yalnız KISA zikirlerde var (uzun sûrelerin metni burada
    // tutulmuyor, docs §5.3). Yoksa satır hiç çizilmez.
    if (it.arabic) row.appendChild(el('div', 'zar', it.arabic));

    var bar = el('div', 'bar');
    var d = el('div', 'done');
    d.style.width = (Math.min(1, (it.current || 0) / Math.max(1, it.target)) * 100) + '%';
    bar.appendChild(d);
    row.appendChild(bar);

    var nums = el('div', 'znums');
    var left = el('span');
    left.appendChild(el('b', null, nf(it.current)));
    left.appendChild(el('span', null, ' / ' + nf(it.target)));
    nums.appendChild(left);
    if (it.rounds > 0) nums.appendChild(el('span', null, fmt(T.zRounds, { n: nf(it.rounds) })));
    row.appendChild(nums);

    if (it.mine > 0) row.appendChild(el('div', 'zmine', fmt(T.zMine, { n: nf(it.mine) })));

    var b = el('button', 'primary', T.zAdd);
    b.onclick = function () { openCounter(it); };
    row.appendChild(b);
    return row;
  }

  var REDUCED = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /**
   * Sekmeler arası yumuşak geçiş.
   *
   * ⚠️ ASIL SORUN ANİMASYON DEĞİL AĞDI: ilk yazımda sekmeye basınca
   * `goBoard()` çağrılıyor, o da iki isteği yeniden atıyordu. Oysa tahta ve
   * zikirler ZATEN bellekte (loadBoard ikisini birden çekiyor). Kullanıcı önce
   * birkaç yüz milisaniye bekliyor, sonra ekran tek karede değişiyordu; bu
   * "takılma" diye okunuyordu (kullanıcı bildirimi, 9 Eyl 2026).
   * Artık sekme değişimi AĞA ÇIKMIYOR, yalnız yeniden çiziyor.
   *
   * ⚠️ Sönme süresi kısa (130 ms). Uzun olsaydı "yavaş" diye okunurdu; yükseklik
   * değişimi de opaklık sıfırken oluyor, o yüzden sıçrama görünmüyor.
   */
  function swapStage(render) {
    if (REDUCED) { render(); ensureTabsVisible(); return; }
    stageEl.classList.add('fading');
    setTimeout(function () {
      render();
      void stageEl.offsetHeight;              // reflow: geçiş sıfırdan başlasın
      stageEl.classList.remove('fading');
      ensureTabsVisible();
    }, 130);
  }

  /**
   * Zikir listesi uzun; dibindeyken Hatim'e geçen kişi ızgaranın ortasına
   * düşüyordu. Sekme satırı ekranın üstünde kaldıysa oraya dönülür.
   * ⚠️ Yalnız GEREKİRSE: her geçişte kaydırmak da rahatsız edici olurdu.
   */
  function ensureTabsVisible() {
    var t = stageEl.querySelector('.tabs.main');
    if (!t) return;
    var top = t.getBoundingClientRect().top;
    if (top >= 0) return;
    window.scrollTo({ top: window.scrollY + top - 64,
                      behavior: REDUCED ? 'auto' : 'smooth' });
  }

  function tabsNode() {
    var w = el('div', 'tabs main');
    [['zikir', T.tabZikir], ['hatim', T.tabHatim]].forEach(function (p) {
      var b = el('button', tab === p[0] ? 'on' : '', p[1]);
      b.onclick = function () {
        if (tab === p[0]) return;
        tab = p[0]; offer = null; chosenLen = null; zItem = null; filter = 'avail';
        mode = 'board';
        // ⚠️ URL'i yalnız kendi sayfasında yaz; ana sayfa kartı sekmesiz.
        if (CHROME) { try { history.replaceState(null, '', location.pathname + '?t=' + tab); } catch (e) {} }
        // ⛔ goBoard() ÇAĞIRMA: o ağa çıkar. Veri zaten bellekte.
        swapStage(renderAnyBoard);
      };
      w.appendChild(b);
    });
    return w;
  }

  /** Zikir sekmesi: bütün zikirler tam hâliyle, dikey liste. Yatay şerit
   *  daraltılmış görünüm içindi; sekme geldiği için o hâl kalktı. */
  function renderZikirTab() {
    mode = 'board';
    hideAppCta();
    var st = stageEl; st.innerHTML = '';
    var mid = el('div', 'mid'); st.appendChild(mid);
    mid.appendChild(tabsNode());

    var items = (dhikr && dhikr.items) || [];
    if (!items.length) { mid.appendChild(el('div', 'msg', T.zNone)); showAppCta(); return; }

    var box = el('div', 'panel');
    box.appendChild(panelHead(T.zHead, ICON_ZIKIR));
    items.forEach(function (it) { box.appendChild(zikirNode(it, 'zrow')); });
    mid.appendChild(box);
    showAppCta();
  }

  function openCounter(it) { zItem = it; zSession = 0; renderCounter(); }

  /**
   * Sayaç. Serbest sayı girişi BİLEREK YOK: biri "10000" yazarsa ortak sayaç
   * anlamsızlaşır. Yalnız dokunma ve iki çip (+33/+100); adımlar tesbih
   * turlarına karşılık geliyor (uygulamadaki kararın aynısı).
   */
  function renderCounter() {
    mode = 'count';
    hideAppCta();
    var host = stageEl; host.innerHTML = '';
    var st = el('div', 'narrow'); host.appendChild(st);
    var txt = dhikrText(zItem.slug);

    var card = el('div', 'block zcount');
    card.appendChild(el('div', 'zname', txt[0]));
    if (zItem.arabic) card.appendChild(el('div', 'zar', zItem.arabic));
    st.appendChild(card);

    var dial = el('div', 'zdial');
    dial.appendChild(el('div', 'v', nf(zSession)));
    dial.appendChild(el('div', 'l', T.zSession));
    dial.onclick = function () { zSession += 1; renderCounter(); };
    st.appendChild(dial);

    var chips = el('div', 'zchips');
    [33, 100].forEach(function (n) {
      var b = el('button', null, '+' + n);
      b.onclick = function (e) { e.stopPropagation(); zSession += n; renderCounter(); };
      chips.appendChild(b);
    });
    st.appendChild(chips);

    var send = el('button', 'primary', T.zSubmit);
    send.onclick = onContribute;
    st.appendChild(send);
    var no = el('button', 'ghost', T.cancel);
    no.onclick = function () { zItem = null; goBoard(); };
    st.appendChild(no);
  }

  function onContribute() {
    if (zSession <= 0 || busy) return;
    busy = true;
    ensureGuest();
    // MUTLAK gönderiyoruz (sunucudaki katkı + bu oturum). Aynı istek iki kez
    // giderse sunucu GREATEST uyguladığı için ikincisi hiçbir şey değiştirmez.
    var absolute = (zItem.mine || 0) + zSession;
    var id = zItem.id;
    stageMessage(T.loading, false);
    call('dhikr_contribute', { dhikr_id: id, count: absolute, locale: lang })
      .then(function (r) {
        busy = false;
        if (r.status !== 200 || !r.body.ok) {
          var m = errText(r.body && r.body.error);
          stageMessage(m[0], m[0] === T.error);
          return;
        }
        zItem = null; zSession = 0;
        return goBoard();
      })
      .catch(function () { busy = false; stageMessage(T.error, true); });
  }

  // ── Kur'an / Cevşen tahtası ───────────────────────────────────────────────
  function renderBoard() {
    mode = 'board';
    hideAppCta();
    var st = stageEl;
    st.innerHTML = '';

    // ⚠️ Geniş ekranda ızgara genişler, ilerleme ve "aldığın bölümler" DAR
    // kalır: uzun satır okumayı zorlaştırır.
    var mid = el('div', 'mid');
    mid.appendChild(tabsNode());
    mid.appendChild(progressNode());
    var mn = myNode(); if (mn) mid.appendChild(mn);
    st.appendChild(mid);

    if (!board.active) { st.appendChild(el('div', 'msg', T.closed)); showAppCta(); return; }

    var left = board.quota_max - board.quota_used;
    if (left <= 0) {
      st.appendChild(el('div', 'msg', T.quota));
    } else if (!board.suggest) {
      st.appendChild(el('div', 'msg', T.none));
    } else {
      var sg = suggestNode();
      if (sg) { var w = el('div', 'mid'); w.appendChild(sg); st.appendChild(w); }
    }

    // ⚠️ Cüz haritası TAM AÇIK. "Genişlet" düğmesi YOK: bu sayfaya bilerek
    // gelen kişiden bir şeyi açmasını istemek gereksiz.
    if (left > 0) st.appendChild(gridNode());
    showAppCta();
  }

  /**
   * Miktar seçenekleri: 5'in katları + azami miktarın kendisi.
   * ⚠️ Bu "aralık seçtirmek" DEĞİL: kişi hangi sayfaları değil NE KADAR
   * okuyacağını seçiyor, başlangıç yine sunucunun verdiği yer.
   */
  function amountChoices(max) {
    var out = [];
    for (var n = 5; n < max; n += 5) out.push(n);
    out.push(max);
    return out;
  }

  function renderConfirm() {
    mode = 'confirm';
    hideAppCta();
    var host = stageEl; host.innerHTML = '';
    var st = el('div', 'narrow'); host.appendChild(st);
    var maxLen = offer.end - offer.start + 1;
    if (chosenLen == null || chosenLen > maxLen) chosenLen = maxLen;
    var endU = offer.start + chosenLen - 1;

    var box = el('div', 'block');
    box.appendChild(el('div', 'pages', unitLabel(offer.start, endU)));
    var r = refLabel(offer.start, endU);
    if (r) box.appendChild(el('div', 'ref', '(' + r + ')'));
    box.appendChild(el('div', 'count', unitCount(chosenLen)));
    st.appendChild(box);

    var opts = amountChoices(maxLen);
    if (opts.length > 1) {
      var amt = el('div', 'amt');
      amt.appendChild(el('div', 'lbl', T.amountLbl));
      var row = el('div', 'row');
      opts.forEach(function (n) {
        var b = el('button', n === chosenLen ? 'on' : '', String(n));
        b.onclick = function () { chosenLen = n; renderConfirm(); };
        row.appendChild(b);
      });
      amt.appendChild(row);
      st.appendChild(amt);
    }

    st.appendChild(el('div', 'msg', T.confirmQ));
    var yes = el('button', 'primary', T.confirm); yes.onclick = onConfirm;
    var no = el('button', 'ghost', T.cancel); no.onclick = function () { goBoard(); };
    st.appendChild(yes); st.appendChild(no);
  }

  function renderDone(claim) {
    mode = 'done';
    var host = stageEl; host.innerHTML = '';
    var st = el('div', 'narrow'); host.appendChild(st);
    st.appendChild(el('div', 'ok-title',
      fmt(T.entrustedU, { u: unitLabel(claim.start, claim.end) })));
    var r = refLabel(claim.start, claim.end);
    if (r) st.appendChild(el('div', 'ref', '(' + r + ')'));
    st.appendChild(el('div', 'msg', T.mayAccept));

    if ((claim.quota_max - claim.quota_used) > 0) {
      st.appendChild(el('div', 'msg', T.another));
      var b = el('button', 'primary', T.takeAnother);
      b.onclick = function () { goBoard(); };
      st.appendChild(b);
    }
    // Kurtarma bağlantısı: jeton tarayıcıda; başka cihazda da açabilsin.
    var rec = el('div', 'recovery');
    rec.appendChild(el('div', null, T.keepLink));
    var cp = el('button', 'ghost', T.copy);
    cp.onclick = function () {
      var url = location.origin + location.pathname + '?t=' + tab +
                '&g=' + encodeURIComponent(guestToken);
      if (navigator.clipboard) navigator.clipboard.writeText(url);
      cp.textContent = T.copied;
    };
    rec.appendChild(cp); st.appendChild(rec);
    showAppCta();
  }

  // ── Akış ──────────────────────────────────────────────────────────────────
  /**
   * Sayfa iki bölümü birden gösterdiği için ikisi de tek turda çekilir.
   * ⚠️ Zikir çağrısı DÜŞERSE sayfa düşmez: tahta asıl içerik, zikir şeridi
   * boş kalır. Tersi geçerli değil, tahta gelmezse gösterilecek bir şey yok.
   */
  function loadBoard() {
    return Promise.all([
      call('board', { type: 'quran' }),
      call('dhikr_list', {})
    ]).then(function (rs) {
      var b = rs[0], d = rs[1];
      if (b.status !== 200 || !b.body.ok) {
        var m = errText(b.body && b.body.error);
        var e = new Error('load'); e.userText = m[0]; throw e;
      }
      board = b.body.board;
      dhikr = (d.status === 200 && d.body && d.body.ok) ? d.body.dhikr : { items: [] };
      return board;
    });
  }

  function renderAnyBoard() {
    return tab === 'zikir' ? renderZikirTab() : renderBoard();
  }

  function pickGroup(g) {
    if (busy) return;
    busy = true;
    call('offer', { type: tab, group: g }).then(function (r) {
      busy = false;
      if (r.status === 200 && r.body.ok && r.body.offer) {
        offer = r.body.offer; chosenLen = null; renderConfirm();
        return;
      }
      var m = errText(r.body && r.body.error);
      stageMessage(m[0], m[0] === T.error);
      if (m[1]) setTimeout(goBoard, 900); else showAppCta();
    }).catch(function () { busy = false; stageMessage(T.error, true); });
  }

  function onConfirm() {
    if (busy || !offer) return;
    busy = true;
    ensureGuest();
    var endU = offer.start + (chosenLen || (offer.end - offer.start + 1)) - 1;
    call('commit', { type: tab, start: offer.start, end: endU, locale: lang })
      .then(function (r) {
        busy = false;
        if (r.status === 200 && r.body.ok) { renderDone(r.body.claim); loadBoard(); return; }
        var m = errText(r.body && r.body.error);
        stageMessage(m[0], m[0] === T.error);
        if (m[1]) setTimeout(goBoard, 900); else showAppCta();
      })
      .catch(function () { busy = false; stageMessage(T.error, true); });
  }

  function confirmClaim(id) {
    if (busy) return;
    busy = true;
    call('confirm', { claim_id: id }).then(function (r) {
      busy = false;
      if (r.status === 200 && r.body.ok) { goBoard(); return; }
      var m = errText(r.body && r.body.error);
      stageMessage(m[0], m[0] === T.error);
    }).catch(function () { busy = false; stageMessage(T.error, true); });
  }

  function dropClaim(id) {
    if (busy) return;
    busy = true;
    call('drop', { claim_id: id }).then(function (r) {
      busy = false;
      if (r.status === 200 && r.body.ok) { goBoard(); return; }
      var m = errText(r.body && r.body.error);
      stageMessage(m[0], m[0] === T.error);
    }).catch(function () { busy = false; stageMessage(T.error, true); });
  }

  /**
   * ARKA PLAN tazelemesi: yayın sinyali ve yoklama bunu çağırır. Moda saygı
   * duyar; onay ekranındaki kullanıcının önünden bloğu çekmez.
   *
   * ⚠️ KULLANICI İSTEĞİYLE geri dönmek için BUNU KULLANMA, goBoard() kullan.
   * halka.html'de ikisi aynı fonksiyondu ve "Vazgeç" sessizce çalışmıyordu:
   * mod hâlâ 'confirm' olduğu için erken dönüyordu.
   */
  function refresh() {
    if (mode === 'confirm' || mode === 'count') return Promise.resolve();
    if (mode === 'done') return loadBoard().catch(function () {});
    return loadBoard().then(renderAnyBoard).catch(function (e) {
      stageMessage((e && e.userText) || T.error, !e || !e.userText);
      showAppCta();
    });
  }

  /** KULLANICI isteğiyle seçim ekranına dön. Modu zorlar, bu yüzden çalışır. */
  function goBoard() {
    offer = null; chosenLen = null; mode = 'board';
    return loadBoard().then(renderAnyBoard).catch(function (e) {
      stageMessage((e && e.userText) || T.error, !e || !e.userText);
      showAppCta();
    });
  }

  // ── Anlık senkron ─────────────────────────────────────────────────────────
  // ⚠️ Gelen mesajın İÇERİĞİ OKUNMAZ. Kanal public ve adı TAHMİN EDİLEBİLİR
  // (halka.html'de konu event UUID'siydi, burada sabit) → herkes sahte sinyal
  // basabilir. Sinyal yalnız "şimdi tazele" demektir.
  var rtTimer = null, rtLast = 0;

  function onSignal() {
    if (busy) return;
    // Sayfa arka plandaysa hiç tazeleme: sahte sinyal seli görünmeyen bir
    // sekmeye bedava iş yaptıramasın.
    if (document.hidden) return;
    var now = Date.now();
    if (now - rtLast >= RT_WINDOW) { rtLast = now; refresh(); return; }
    if (rtTimer) return;
    rtTimer = setTimeout(function () {
      rtTimer = null; rtLast = Date.now();
      if (!busy && !document.hidden) refresh();
    }, RT_WINDOW - (now - rtLast));
  }

  function startRealtime() {
    try {
      if (!window.supabase || !window.supabase.createClient) return;
      var c = window.supabase.createClient(SUPA_URL, SUPA_ANON);
      // Üç kaynak, üç kanal. Sekme değişince yeniden abone olmuyoruz: sinyal
      // zaten yalnız "tazele" diyor ve refresh() aktif sekmeyi çekiyor.
      c.channel('global:hatim:quran').on('broadcast', { event:'pool_change' }, onSignal).subscribe();
      c.channel('global:hatim:cevsen').on('broadcast', { event:'pool_change' }, onSignal).subscribe();
      c.channel('global:dhikr').on('broadcast', { event:'dhikr_change' }, onSignal).subscribe();
    } catch (e) { /* realtime yoksa yoklama yeter */ }
  }

  // Ana sayfada dil seçici var: değişince bileşen yeniden kurulur. Kendi
  // sayfasında böyle bir olay YOK, dinlemek zararsız.
  document.addEventListener('mh:locale', function (e) {
    var next = String((e && e.detail) || '').slice(0, 2);
    if (!S[next] || next === lang) return;
    host.innerHTML = '';
    mount(host, { chrome: CHROME, lang: next });
  });

  // ── Ana sayfa kartı ───────────────────────────────────────────────────────
  // Tek sakin kart: iki satır, iki sayı, tek eylem. ⛔ Kendi kendine dönen
  // slayt YOK (kullanıcı ile konuşuldu, 9 Eyl 2026): register'ı reklama
  // kaydırır, dönen banner'lar zaten kör noktaya düşer, ve hareket eden
  // içerik ekran okuyucuyla "hareketi azalt" tercihinde ayrı iş çıkarır.
  // İkna eden şey slogan değil sayının canlı olması.
  /**
   * ⚠️ Çubuk İSTEĞE BAĞLI. Zikir satırında BİLEREK yok: hedef 1.000.000 ve
   * sayaç 205, yani çubuk aylarca çizgi kadar bile dolmuyor ve "bozuk" diye
   * okunuyor (9 Eyl 2026). Kur'an satırında anlamlı, orada 604'te 27.
   */
  function sumRow(label, value, doneFrac, heldFrac) {
    var row = el('div', 'sumrow');
    row.appendChild(el('span', 'k', label));
    if (doneFrac != null) {
      var bar = el('div', 'bar');
      var d = el('div', 'done'); d.style.width = (Math.min(1, doneFrac) * 100) + '%';
      var h = el('div', 'held'); h.style.width = (Math.min(1, heldFrac || 0) * 100) + '%';
      bar.appendChild(d); bar.appendChild(h);
      row.appendChild(bar);
    } else {
      row.appendChild(el('span', 'spacer'));
    }
    row.appendChild(el('span', 'v', value));
    return row;
  }

  function renderCard() {
    var wrap = el('div', 'sum');
    stageEl.appendChild(wrap);
    // Tek okuma: özet ucu hem hatmi hem ilk zikri döner, misafir gerektirmez.
    call('summary', {}).then(function (r) {
      if (r.status !== 200 || !r.body.ok || !r.body.summary) return;
      var sum = r.body.summary, q = null;
      (sum.hatim || []).forEach(function (x) { if (x.type === 'quran') q = x; });
      if (!q || !q.total) return;

      wrap.appendChild(sumRow(T.tabHatim,
        fmt(T.freeIn, { p: unitCount(nf(q.open)) }),
        q.done / q.total, q.claimed / q.total));

      var d = sum.dhikr;
      if (d && d.target) {
        wrap.appendChild(sumRow(T.tabZikir,
          dhikrText(d.slug)[0] + ' · ' + nf(d.current) + ' / ' + nf(d.target)));
      }

      var a = el('a', 'cta-main', T.joinCta);
      a.href = PAGE_URL;
      wrap.appendChild(a);
    }).catch(function () { /* kartın metni statik; sayılar görünmez, o kadar */ });
  }

  // ── Açılış ────────────────────────────────────────────────────────────────
  if (!CHROME) { renderCard(); return; }

  stageMessage(T.loading);

  fetch('/data/quran-page-refs.json')
    .then(function (r) { return r.json(); })
    .then(function (j) { REFS = j.refs; NAMES = j.names; })
    .catch(function () { /* sûre adı gösterilemezse sayfa yine çalışır */ })
    .then(function () { return refresh(); })
    .then(function () {
      if (CHROME) {
        startRealtime();
        setInterval(function () { if (!busy && !document.hidden) refresh(); }, POLL_MS);
      }
    });
  }

  return { mount: mount };
})();
