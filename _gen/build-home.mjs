#!/usr/bin/env node
/**
 * Ana sayfa ureticisi (28 Eyl 2026'dan beri uygulama tanitimi):
 *   _gen/home.src.html + _gen/site-i18n.js  ->  /, /tr/, /de/, /fr/, /ar/ (adresler _gen/site-urls.mjs EV)
 *   + eski /app/ adresleri ve /yeni/ -> ana sayfaya yonlendiren noindex kabuklar
 *   + sitemap.xml'deki MH:LOCALES bolgesi.
 *
 * Kullanici karari (28 Eyl 2026): ana sayfa uygulamayi tanitir; namaz vakitleri
 * kendi sayfasinda (_gen/build-vakit.mjs), ana sayfada yalniz en ustte canli bir
 * serit (vakit motoru js/mh-dynamic.js, ikinci kopya yok). Gunun ayeti/hadisi
 * kartlari ana sayfada YOK.
 *
 * Korunan arama sozlesmeleri: kok Ingilizce taban, hreflang="en" + x-default,
 * /en/ ACILMAZ. Bing ve Pinterest dogrulamasi korunur; marka adi h1'de kalir
 * (ust satir). Metin STATIK yazilir. Baslik ve aciklama 5 Eki 2026'dan beri
 * BES DILDE de site-i18n.js title/desc'ten gelir (kok dahil; eskiden kok onceki
 * ana sayfanin Ingilizce metnini tasiyordu). og:title/og:description ayni metin. Kok, kayitli dil ya da tarayici dili baska bir dilse o dilin
 * sayfasina gecer (bot etkilenmez, Ingilizce secen kalir).
 *
 * Magaza dugmesindeki "Indir", politika baglantilari, Iletisim, Itani atfi ve
 * "Ortak Okuma" adi ortak sozlukten (_gen/site-i18n.js) SOKULUR, kopyalanmaz.
 * Sayfaya ozgu metinler asagidaki T'de.
 *
 * Giris (21 Kas 2026, kullanicinin sectigi "A serit"): uygulamanin 2.1.0 ekranlari egik bir seritte
 * yana akar (SERIT, img/app/<dil>/st-*.webp, 432 px). Eski halkali vitrin (7 kart, DAY/TABS/CAPS)
 * kaldirildi. Bolum gorselleri s21-*, yeni ozellik galerisi nw-*: hepsi gallery-2026-11 ham
 * karelerinden (Premium yazisi, rozet, kilit gorunmeyen kareler). Uretim betigi oturum
 * cizimindeki mkimg21.py; kaynak kare adlari SERIT/YENI listelerinde yazili.
 *
 * Kurallar: Turkce "sen", Almanca "du", Fransizca "tu"; terimler uygulamayla
 * ayni (DE Chatma/Dschuz, FR khatma/juz, EN khatm/juz; Rehber Modu =
 * Mentor Mode). Ayrac olarak uzun tire YOK. Ayet meali: TR Elmalili, EN Itani
 * harfi harfine (CC BY-ND, atif altbilgide), DE/FR meal alintilanmaz, anlam
 * "sinngemaess / en substance" diye isaretli.
 *
 * ⚠️ Sitede "Cevsen" mumkun oldugunca GECMEZ (kullanici karari, 28 Eyl 2026):
 * uygulamada duruyor, indiren gorur; sitenin genel kitlesine one cikarilmaz.
 *
 * KULLANIM:
 *   node _gen/build-home.mjs           uretir ve yazar
 *   node _gen/build-home.mjs --check   uretir, yazmaz, fark varsa cikis 1
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { SITE, DILLER, EV, VAKIT, ORTAK as ORTAK_URL, ESKI_APP, DIL_ADI, OG_LOCALE, REHBER, rehberAdresi, dosyaYolu, tamAdres } from "./site-urls.mjs";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const KONTROL = process.argv.includes("--check");
const hata = (m) => { console.error("HATA: " + m); process.exit(1); };

// ── Ortak sozlukten sokulan metinler (_gen/site-i18n.js, ana sayfayla ayni kaynak)
const kutu = {};
vm.createContext(kutu);
vm.runInContext(readFileSync(join(KOK, "_gen", "site-i18n.js"), "utf8"), kutu);
if (!kutu.I18N) hata("_gen/site-i18n.js I18N tanimlamiyor");
const ORTAK = ["get", "privacy", "terms", "deleteAcc", "contact", "itaniCredit", "ccTitle"];

// ── Sayfaya ozgu metinler ───────────────────────────────────────────────────
const T = {
  // ── 28 Eyl 2026: ana sayfaya donusumle gelenler (serit, menu, yuzen gezinme, altbilgi)
  navTimes: { tr: "Vakitler", en: "Prayer times", de: "Gebetszeiten", fr: "Horaires", ar: "المواقيت" },
  stripLabel: { tr: "Namaz vakitleri", en: "Prayer times", de: "Gebetszeiten", fr: "Horaires de prière", ar: "مواقيت الصلاة" },
  stripAll: { tr: "Tüm vakitler ve 30 günlük takvim", en: "All prayer times and the 30-day calendar", de: "Alle Gebetszeiten und der 30-Tage-Kalender",
    fr: "Tous les horaires et le calendrier de 30 jours", ar: "كل المواقيت وتقويم 30 يومًا" },
  secStart: { tr: "Başlangıç", en: "Start", de: "Anfang", fr: "Début", ar: "البداية" },
  topTag: { tr: "en üst", en: "top of the page", de: "ganz oben", fr: "haut de page", ar: "أعلى الصفحة" },
  backTop: { tr: "Başa dön", en: "Back to top", de: "Nach oben", fr: "Haut de page", ar: "إلى الأعلى" },
  onPage: { tr: "Bu sayfada", en: "On this page", de: "Auf dieser Seite", fr: "Sur cette page", ar: "في هذه الصفحة" },
  sheetTimesT: { tr: "Namaz vakitleri", en: "Prayer times", de: "Gebetszeiten", fr: "Horaires de prière", ar: "مواقيت الصلاة" },
  sheetTimesD: { tr: "Bugün ve 30 günlük takvim", en: "Today and the 30-day calendar", de: "Heute und der 30-Tage-Kalender",
    fr: "Aujourd'hui et le calendrier de 30 jours", ar: "اليوم وتقويم 30 يومًا" },
  sheetReadD: { tr: "Dünya genelinde ortak hatim ve zikir", en: "A shared khatm and dhikr with readers worldwide",
    de: "Gemeinsame Chatma und Dhikr mit Lesenden weltweit", fr: "Khatma et dhikr communs avec des lecteurs du monde entier",
    ar: "ختمة وذكر جماعيان مع قرّاء حول العالم" },
  // Rehberler (5 Eki 2026): altbilgi, bolum listesi ve "Birlikte" satirindaki baglanti
  navPagesAria: { tr: "Sayfalar", en: "Pages", de: "Seiten", fr: "Pages", ar: "الصفحات" },
  navGuides: { tr: "Rehberler", en: "Guides", de: "Anleitungen", fr: "Guides", ar: "الأدلة" },
  sheetGuidesD: { tr: "Halka kurma, hatim ve zikir adım adım", en: "Circles, khatam and dhikr, step by step",
    de: "Kreise, Khatm und Dhikr Schritt für Schritt", fr: "Cercles, khatma et dhikr pas à pas", ar: "الحلقات والختمة والذكر خطوة بخطوة" },
  guideHatimLink: { tr: "Adım adım: hatim grubu nasıl kurulur", en: "Step by step: set up a group khatam",
    de: "Schritt für Schritt: eine Khatm-Gruppe gründen", fr: "Pas à pas : organiser une khatma en groupe", ar: "خطوة بخطوة: كيف تنشئ ختمة جماعية" },
  guideTekLink: { tr: "Adım adım: tek seferlik halka nasıl kurulur", en: "Step by step: set up a one-time circle",
    de: "Schritt für Schritt: einen einmaligen Kreis gründen", fr: "Pas à pas : créer un cercle ponctuel", ar: "خطوة بخطوة: كيف تنشئ حلقة لمرة واحدة" },
  faqGuidesLink: { tr: "Bütün adım adım rehberler", en: "All step-by-step guides", de: "Alle Schritt-für-Schritt-Anleitungen",
    fr: "Tous les guides pas à pas", ar: "كل الأدلة خطوة بخطوة" },
  pTodayLink: { tr: "Bugünün vakitleri", en: "Today's prayer times", de: "Die heutigen Gebetszeiten", fr: "Les horaires du jour", ar: "مواقيت اليوم" },
  socialTitle: { tr: "Halkayla bağlantıda kal", en: "Stay close to the circle", de: "Bleib mit dem Kreis verbunden",
    fr: "Reste lié au cercle", ar: "ابقَ على صلة بالحلقة" },
  socialText: { tr: "Günün ayeti her sabah, kandil gecelerinde hatırlatma.",
    en: "The verse of the day every morning, reminders on the blessed nights.",
    de: "Jeden Morgen der Vers des Tages, Erinnerungen in den gesegneten Nächten.",
    fr: "Le verset du jour chaque matin, des rappels lors des nuits bénies.",
    ar: "آية اليوم كل صباح، وتذكير في الليالي المباركة." },

  title: { tr: "Manevi Halka: bir niyet, bir halka, nice ameller", en: "Manevi Halka: one intention, one circle, many good deeds",
    de: "Manevi Halka: eine Absicht, ein Kreis, viele gute Taten", fr: "Manevi Halka : une intention, un cercle, tant de bonnes œuvres",
    ar: "Manevi Halka: نيّة واحدة، حلقة واحدة، وأعمال صالحة كثيرة" },
  desc: { tr: "Kur'an, namaz vakitleri, zikir, ezber ve kitaplarını tek uygulamada sürdür. Dilersen sevdiklerinle hatim ve zikir halkası kur. Reklamsız, 5 dilde.",
    en: "Keep up your Quran, prayer times, dhikr, memorisation and reading in one app. And if you like, start a khatm or dhikr circle with your loved ones. Ad-free, in 5 languages.",
    de: "Koran, Gebetszeiten, Dhikr, Auswendiglernen und Lesen in einer App. Und wenn du möchtest, gründe mit deinen Liebsten einen Chatma- oder Dhikr-Kreis. Werbefrei, in 5 Sprachen.",
    fr: "Le Coran, les horaires de prière, le dhikr, la mémorisation et la lecture dans une seule appli. Et si tu veux, crée un cercle de khatma ou de dhikr avec tes proches. Sans publicité, en 5 langues.",
    ar: "القرآن ومواقيت الصلاة والذكر والحفظ والقراءة في تطبيق واحد. وإن شئت، أنشئ حلقة ختمة أو ذكر مع أحبّتك. بلا إعلانات وبخمس لغات." },
  navAria: { tr: "Bölümler", en: "Sections", de: "Bereiche", fr: "Sections", ar: "الأقسام" },
  navNew: { tr: "Yenilikler", en: "What's new", de: "Neu", fr: "Nouveautés", ar: "الجديد" },
  navSolo: { tr: "Tek başına", en: "On your own", de: "Allein", fr: "Seul", ar: "بمفردك" },
  navTogether: { tr: "Birlikte", en: "Together", de: "Gemeinsam", fr: "Ensemble", ar: "معًا" },
  navFaq: { tr: "Sık sorulanlar", en: "FAQ", de: "Häufige Fragen", fr: "Questions fréquentes", ar: "الأسئلة الشائعة" },
  getApp: { tr: "İndir", en: "Get the app", de: "App laden", fr: "Télécharger", ar: "حمّل التطبيق" },
  // Kapanis bandinda magaza dugmelerinin yanindaki QR'in yazisi (yalniz genis ekran + fare; blok aria-hidden).
  qrCaption: { tr: "Telefonunla okut", en: "Scan with your phone", de: "Mit deinem Handy scannen", fr: "Scanne avec ton téléphone", ar: "امسح الرمز بهاتفك" },
  themeToDark: { tr: "Koyu temaya geç", en: "Switch to dark theme", de: "Zum dunklen Design wechseln", fr: "Passer au thème sombre", ar: "التبديل إلى السمة الداكنة" },
  themeToLight: { tr: "Açık temaya geç", en: "Switch to light theme", de: "Zum hellen Design wechseln", fr: "Passer au thème clair", ar: "التبديل إلى السمة الفاتحة" },
  stripAria: { tr: "Uygulamanın ekranları", en: "App screens", de: "Bildschirme der App", fr: "Écrans de l'appli", ar: "شاشات التطبيق" },
  stPause: { tr: "Ekranların akışını durdur", en: "Pause the moving screens", de: "Laufende Bildschirme anhalten", fr: "Mettre en pause le défilement", ar: "إيقاف حركة الشاشات" },
  stPlay: { tr: "Ekranların akışını sürdür", en: "Play the moving screens", de: "Bildschirme weiterlaufen lassen", fr: "Reprendre le défilement", ar: "استئناف حركة الشاشات" },
  prevAria: { tr: "Önceki ekran", en: "Previous screen", de: "Vorheriger Bildschirm", fr: "Écran précédent", ar: "الشاشة السابقة" },
  nextAria: { tr: "Sonraki ekran", en: "Next screen", de: "Nächster Bildschirm", fr: "Écran suivant", ar: "الشاشة التالية" },
  langAria: { tr: "Dil", en: "Language", de: "Sprache", fr: "Langue", ar: "اللغة" },

  eyebrow: { tr: "Günlük ibadetlerin için bir yol arkadaşı", en: "A companion for your daily worship", de: "Ein Begleiter für deine tägliche Andacht",
    fr: "Un compagnon pour ta pratique quotidienne", ar: "رفيق لعباداتك اليومية" },
  // 21 Kas 2026: 2.1.0 ile uygulamanin mottosu (uygulamayla birebir; FR uygulamadaki kisa bicim). Vurgulu (yesil) kisim h1b.
  h1a: { tr: "Her güzel iş", en: "Every good deed", de: "Jede gute Tat", fr: "Toute bonne action", ar: "كل عمل صالح" },
  h1b: { tr: "bir niyetle başlar.", en: "begins with an intention.", de: "beginnt mit einer Absicht.", fr: "naît d'une intention.", ar: "يبدأ بنيّة." },
  // Telefonda magaza dugmelerinin ve sayfa baglantilarinin altinda; genis ekranda basligin altinda.
  lead: { tr: "Kur'an'ı oku ve dinle, namazını ve zikrini takip et, niyetlerini büyüt. Dilersen sevdiklerinle bir halka kur, hatim birlikte tamamlansın.",
    en: "Read and listen to the Quran, keep track of your prayers and dhikr, and let your intentions grow. And if you like, start a circle with your loved ones and complete the khatm together.",
    de: "Lies und höre den Koran, behalte Gebet und Dhikr im Blick und lass deine Absichten wachsen. Und wenn du möchtest, gründe mit deinen Liebsten einen Kreis und vollende die Chatma gemeinsam.",
    fr: "Lis et écoute le Coran, suis tes prières et ton dhikr, fais grandir tes intentions. Et si tu veux, crée un cercle avec tes proches pour terminer la khatma ensemble.",
    ar: "اقرأ القرآن واستمع إليه، وتابع صلاتك وذكرك، ودَع نواياك تنمو. وإن شئت، أنشئ حلقة مع أحبّتك لتُتمّوا الختمة معًا." },
  trust1b: { tr: "Reklamsız", en: "No ads", de: "Keine Werbung", fr: "Sans publicité", ar: "بلا إعلانات" },
  trust1t: { tr: "Dikkatin ibadette kalsın", en: "Your attention stays on worship", de: "Dein Fokus bleibt beim Gebet",
    fr: "Ton attention reste sur l'adoration", ar: "ليبقى انتباهك في العبادة" },
  trust2b: { tr: "İbadet ücretsiz", en: "Worship is free", de: "Anbetung ist kostenlos", fr: "L'adoration est gratuite", ar: "العبادة مجانية" },
  trust2t: { tr: "İbadetin kendisi her zaman", en: "Worship itself, always", de: "Die Anbetung selbst, immer", fr: "L'adoration elle-même, toujours", ar: "العبادة نفسها، دائمًا" },
  trust3b: { tr: "Kıyas yok", en: "No comparisons", de: "Keine Vergleiche", fr: "Aucune comparaison", ar: "بلا مقارنة" },
  trust3t: { tr: "Sıralama, puan, rozet yok", en: "No rankings, points or badges", de: "Keine Ranglisten, Punkte oder Abzeichen",
    fr: "Ni classement, ni points, ni badges", ar: "لا ترتيب ولا نقاط ولا شارات" },
  trust4b: { tr: "iPhone ve Android", en: "iPhone and Android", de: "iPhone und Android", fr: "iPhone et Android", ar: "آيفون وأندرويد" },
  trust4t: { tr: "5 dilde", en: "In 5 languages", de: "In 5 Sprachen", fr: "En 5 langues", ar: "بخمس لغات" },

  // Maide 5:2: ana sayfayla ayni karar (build-home.mjs OZEL.yVerse*)
  verseMeal: { tr: "Birr-ü takvâ üzere yardımlaşın, günah-ü taaddi üzere yardımlaşmayın.",
    en: "And cooperate with one another in virtuous conduct and conscience, and do not cooperate with one another in sin and hostility.",
    de: "Der Koran ruft dazu auf, einander in Güte und Gottesfurcht beizustehen und einander nicht in Sünde und Feindschaft zu helfen.",
    fr: "Le Coran appelle à s'entraider dans le bien et la piété, et à ne pas s'entraider dans le péché et l'hostilité.",
    ar: "" },
  verseRef: { tr: "Mâide 5:2 (bir bölümü)", en: "Al-Ma'idah 5:2 (excerpt)", de: "Sure al-Ma'ida 5:2, sinngemäß",
    fr: "Sourate al-Ma'ida 5:2, en substance", ar: "المائدة 5:2 (جزء من الآية)" },
  purpose: { tr: "Manevi Halka, inşallah bu yardımlaşmayı kolaylaştırmak için kuruldu.", en: "Manevi Halka was built to make this cooperation easier, inshallah.",
    de: "Manevi Halka wurde geschaffen, um diese gegenseitige Hilfe, so Allah will, leichter zu machen.", fr: "Manevi Halka a été créé pour faciliter, si Allah le veut, cette entraide.",
    ar: "أُسِّس Manevi Halka لتيسير هذا التعاون إن\u00a0شاء\u00a0الله." },
  nwKicker: { tr: "Yeni", en: "New",
    de: "Neu", fr: "Nouveau",
    ar: "جديد" },
  nwTitle: { tr: "Uygulamada neler yeni?", en: "What's new in the app",
    de: "Was ist neu in der App?", fr: "Quoi de neuf dans l'appli ?",
    ar: "ما الجديد في التطبيق؟" },
  nwText: { tr: "Kur'an bölümü ve tek seferlik halka baştan yenilendi; Niyet Bahçesi, Vakit sohbeti ve daha fazlası geldi.", en: "The Quran section and the one-time circle have been renewed from the ground up, and the Garden of Intentions, Talk after prayer and more have arrived.",
    de: "Der Koran-Bereich und der einmalige Kreis sind von Grund auf erneuert; dazu kommen der Garten der Absichten, der Impuls nach dem Gebet und mehr.", fr: "L'espace Coran et le cercle ponctuel sont entièrement renouvelés, et voici le Jardin des intentions, la Causerie après la prière et plus encore.",
    ar: "تجدّد قسم القرآن والحلقة لمرة واحدة من أساسهما، وجاء بستان النية و«خاطرة بعد الصلاة» والمزيد." },
  nwAria: { tr: "Yeni gelenler", en: "What's new",
    de: "Neuigkeiten", fr: "Nouveautés",
    ar: "الجديد" },

  soloKicker: { tr: "Tek başına", en: "On your own", de: "Allein", fr: "Seul", ar: "بمفردك" },
  soloTitle: { tr: "Günlük ibadetlerine eşlik eder", en: "A companion to your daily worship", de: "Begleitet deine tägliche Andacht",
    fr: "Accompagne ta pratique quotidienne", ar: "يرافق عباداتك اليومية" },
  soloText: { tr: "Manevi Halka yalnız birlikte yapılan okumalar için değil, her günün ibadeti için de yanında.",
    en: "Manevi Halka is not only for reading together; it is with you in each day's worship.",
    de: "Manevi Halka ist nicht nur für gemeinsames Lesen da, sondern begleitet dich auch in der Andacht jedes Tages.",
    fr: "Manevi Halka n'est pas seulement pour lire ensemble : il t'accompagne aussi dans l'adoration de chaque jour.",
    ar: "لا يقتصر Manevi Halka على القراءة الجماعية، بل يرافقك في عبادة كل يوم." },
  area1t: { tr: "Kur'an", en: "Quran", de: "Koran", fr: "Coran", ar: "القرآن" },
  area1d: { tr: "Türkiye mushafı, meal, tecvid renkleri ve dilediğin kârîden tilavet.", en: "The Mushaf, translation, tajweed colours and recitation by the reciter you choose.",
    de: "Der Mushaf, Übersetzung, Tadschwid-Farben und Rezitation von einem Rezitator deiner Wahl.", fr: "Le Mushaf, la traduction, les couleurs du tajwid et la récitation par le récitateur de ton choix.",
    ar: "المصحف والترجمة وألوان التجويد، وتلاوة بصوت القارئ الذي تختاره." },
  area2t: { tr: "Namaz", en: "Prayer", de: "Gebet", fr: "Prière", ar: "الصلاة" },
  area2d: { tr: "Vakitler, bildirimler, widget'lar, kıble, teheccüd ve kaza takibi.", en: "Prayer times, notifications, widgets, qibla, tahajjud and make-up prayers.",
    de: "Gebetszeiten, Benachrichtigungen, Widgets, Qibla, Tahajjud und Nachholgebete.", fr: "Horaires, notifications, widgets, qibla, tahajjud et prières de rattrapage.",
    ar: "المواقيت والتنبيهات والأدوات والقبلة والتهجد وقضاء الصلاة." },
  area3t: { tr: "Zikir ve dua", en: "Dhikr and dua", de: "Dhikr und Bittgebet", fr: "Dhikr et invocation", ar: "الذكر والدعاء" },
  area3d: { tr: "Zikirmatik, tesbihat, virdler, Peygamber duaları ve Dua Defterim.", en: "Dhikr counter, tasbihat, awrad, prophetic duas and My dua journal.",
    de: "Dhikr-Zähler, Tasbihat, Awrad, prophetische Bittgebete und Mein Bittgebetsheft.", fr: "Compteur de dhikr, tasbihat, awrad, invocations prophétiques et Mon carnet d'invocations.",
    ar: "عداد الذكر والتسبيحات والأوراد والأدعية النبوية ودفتر أدعيتي." },
  area4t: { tr: "Ezber", en: "Memorisation", de: "Auswendiglernen", fr: "Mémorisation", ar: "الحفظ" },
  area4d: { tr: "Sure ve ayet ezberi, aralıklı tekrar ve Ezber Çetelesi.", en: "Memorise surahs and verses with spaced review and the Hifz Chart.",
    de: "Suren und Verse lernen, mit Wiederholung in Abständen und der Hifz-Tafel.", fr: "Mémorise sourates et versets avec des révisions espacées et le Tableau de hifz.",
    ar: "حفظ السور والآيات بمراجعة متباعدة وجدول الحفظ." },
  area5t: { tr: "Kitaplık", en: "Bookshelf", de: "Bücherregal", fr: "Bibliothèque de lecture", ar: "رف الكتب" },
  area5d: { tr: "Kendi PDF ve EPUB kitapların, notların.", en: "Your own PDF and EPUB books and notes.",
    de: "Deine eigenen PDF- und EPUB-Bücher und Notizen.", fr: "Tes propres livres PDF et EPUB, et tes notes.", ar: "كتبك بصيغة PDF وEPUB وملاحظاتك." },
  area6t: { tr: "Niyet Bahçesi", en: "Garden of Intentions",
    de: "Garten der Absichten", fr: "Jardin des intentions",
    ar: "بستان النية" },
  area6d: { tr: "Her niyetin bir fidan olur, emek verdikçe büyür.", en: "Each intention becomes a sapling that grows as you keep it.",
    de: "Jede Absicht wird zu einem Setzling, der wächst, wenn du sie einhältst.", fr: "Chaque intention devient une pousse qui grandit quand tu la tiens.",
    ar: "كل نية تصير غرسة تكبر كلما وفيت بها." },

  qKicker: { tr: "Kur'an", en: "Quran", de: "Koran", fr: "Coran", ar: "القرآن" },
  qTitle: { tr: "Oku, dinle, çalış.", en: "Read, listen, memorise.", de: "Lesen, hören, lernen.", fr: "Lis, écoute, mémorise.", ar: "اقرأ واستمع واحفظ." },
  qText: { tr: "Mushaf, Akan ve meal görünümleri, tecvid renkleri ve büyüteçle kendi düzeninde oku. Dinlerken sayfa kendiliğinden akar.", en: "Read at your own pace with Mushaf, Flowing and translation views, tajweed colours and a magnifier. As you listen, the page scrolls by itself.",
    de: "Lies in deinem Rhythmus, mit den Ansichten Mushaf, Fließtext und Übersetzung, Tadschwid-Farben und Lupe. Beim Zuhören scrollt die Seite von selbst.", fr: "Lis à ton rythme avec les vues Mushaf, Continu et traduction, les couleurs du tajwid et la loupe. Pendant l'écoute, la page défile toute seule.",
    ar: "اقرأ بإيقاعك مع عرض المصحف والنص المتصل والترجمة، وألوان التجويد والعدسة المكبّرة. وأثناء الاستماع تتقدّم الصفحة وحدها." },
  qT1: { tr: "Dilediğin kârîden tilavet, sure tekrarı ve sure başında besmele", en: "Recitation by the reciter you choose, surah repeat and the Basmala",
    de: "Rezitation nach Wahl, Surenwiederholung und Basmala zu Beginn jeder Sure", fr: "Récitation au choix, répétition de sourate et Basmala en début de sourate",
    ar: "تلاوة بصوت القارئ الذي تختاره، وتكرار السورة، والبسملة في بداية كل سورة" },
  qT2: { tr: "Kelime kelime çalış, ayeti defterine ekle", en: "Study word by word, add a verse to your journal",
    de: "Wort für Wort üben, Verse ins Heft übernehmen", fr: "Étudie mot par mot, ajoute un verset à ton carnet",
    ar: "ادرس كلمة كلمة، وأضف الآية إلى دفترك" },
  qT3: { tr: "Sure ya da cüz indirip çevrimdışı dinleme", en: "Download a surah or juz to listen offline",
    de: "Suren oder Dschuz herunterladen und offline hören", fr: "Télécharge une sourate ou un juz pour écouter hors ligne",
    ar: "نزّل سورة أو جزءًا واستمع دون اتصال" },
  pKicker: { tr: "Namaz", en: "Prayer", de: "Gebet", fr: "Prière", ar: "الصلاة" },
  pTitle: { tr: "Gününün içinde.", en: "Woven into your day.", de: "Mitten in deinem Tag.", fr: "Au fil de ta journée.", ar: "في قلب يومك." },
  pText: { tr: "106 ülkede namaz vakitleri ve kıble. Vakit girince haberin olur; teheccüd için uyandırma alarmı da var.", en: "Prayer times and qibla in 106 countries. You'll know when each time begins, and there's a wake-up alarm for tahajjud.",
    de: "Gebetszeiten und Qibla in 106 Ländern. Du erfährst, wann jede Gebetszeit beginnt, und für Tahajjud gibt es einen Weckalarm.", fr: "Horaires de prière et qibla dans 106 pays. Tu sais quand chaque prière commence, et un réveil t'attend pour le tahajjud.",
    ar: "مواقيت الصلاة والقبلة في 106 دول. تعرف متى يدخل كل وقت، وللتهجد منبّه استيقاظ." },
  pT1: { tr: "Vakit girişinde ve çıkmadan önce bildirim", en: "A notification when each time begins and before it ends",
    de: "Benachrichtigung zu Beginn jeder Gebetszeit und vor ihrem Ende", fr: "Une notification au début de chaque prière et avant sa fin",
    ar: "تنبيه عند دخول كل وقت وقبل خروجه" },
  pT2: { tr: "Ana ekran ve kilit ekranı widget'ları", en: "Home screen and lock screen widgets", de: "Widgets für Start- und Sperrbildschirm",
    fr: "Widgets pour l'écran d'accueil et l'écran verrouillé", ar: "أدوات للشاشة الرئيسية وشاشة القفل" },
  pT3: { tr: "Kıldıklarını, nafileleri ve kazalarını kendin için işaretle", en: "Mark your prayers, voluntary prayers and make-ups, just for yourself",
    de: "Markiere Gebete, freiwillige Gebete und Nachgeholtes, nur für dich", fr: "Coche tes prières, surérogatoires et rattrapages, pour toi seul",
    ar: "علّم صلواتك ونوافلك وما قضيت، لنفسك" },

  togKicker: { tr: "Birlikte", en: "Together", de: "Gemeinsam", fr: "Ensemble", ar: "معًا" },
  togTitle: { tr: "Bir halka kur", en: "Start a circle", de: "Gründe einen Kreis", fr: "Crée un cercle", ar: "أنشئ حلقة" },
  togText: { tr: "Ailenle, arkadaşlarınla ya da cemaatinle Kur'an, zikir ve kitap halkaları. Paylaşımı ve düzeni Manevi Halka kolaylaştırsın.",
    en: "Quran, dhikr and book circles with your family, friends or community. Let Manevi Halka take care of sharing and keeping track.",
    de: "Koran-, Dhikr- und Buchkreise mit Familie, Freunden oder Gemeinde. Das Aufteilen und den Überblick übernimmt Manevi Halka.",
    fr: "Des cercles de Coran, de dhikr et de lecture avec ta famille, tes amis ou ta communauté. Manevi Halka s'occupe du partage et du suivi.",
    ar: "حلقات للقرآن والذكر والكتب مع عائلتك أو أصدقائك أو جماعتك. ويتولّى Manevi Halka التقسيم والمتابعة." },
  st1t: { tr: "Halkanı kur", en: "Set up your circle", de: "Kreis anlegen", fr: "Crée ton cercle", ar: "أنشئ حلقتك" },
  st1d: { tr: "Ne okunacağını ve turun kaç gün süreceğini seç.", en: "Choose what to read and how many days a round lasts.",
    de: "Wähle, was gelesen wird und wie viele Tage eine Runde dauert.", fr: "Choisis ce qui sera lu et combien de jours dure un tour.",
    ar: "اختر ما يُقرأ وكم يومًا تستمر الجولة." },
  st2t: { tr: "Linki paylaş", en: "Share the link", de: "Link teilen", fr: "Partage le lien", ar: "شارك الرابط" },
  st2d: { tr: "Davet linkini gönder, dokunan halkaya katılır.", en: "Send the invite link; whoever taps it joins the circle.",
    de: "Schick den Einladungslink, wer darauf tippt, ist im Kreis.", fr: "Envoie le lien d'invitation ; qui le touche rejoint le cercle.",
    ar: "أرسل رابط الدعوة، ومن يضغط عليه ينضم إلى الحلقة." },
  st3t: { tr: "Birlikte okuyun", en: "Read together", de: "Gemeinsam lesen", fr: "Lisez ensemble", ar: "اقرؤوا معًا" },
  st3d: { tr: "Cüzler dağıtılır, sırası gelen haberdar olur. Yetişemeyen yardım isteyebilir.",
    en: "Portions are handed out and everyone is notified when it's their turn. Anyone who falls behind can ask for help.",
    de: "Die Abschnitte werden verteilt, wer dran ist, wird benachrichtigt. Wer nicht hinterherkommt, kann um Hilfe bitten.",
    fr: "Les portions sont réparties, chacun est prévenu quand vient son tour. Qui prend du retard peut demander de l'aide.",
    ar: "تُوزَّع الأجزاء ويصل التنبيه لمن حان دوره. ومن تأخّر يمكنه طلب المساعدة." },
  hKicker: { tr: "Ortak hatim", en: "Shared khatm", de: "Gemeinsame Chatma", fr: "Khatma commune", ar: "ختمة مشتركة" },
  hTitle: { tr: "Dağıtımı uygulama üstlensin.", en: "Let the app handle the sharing.", de: "Die Verteilung übernimmt die App.",
    fr: "L'appli se charge de la répartition.", ar: "دع التطبيق يتولّى التوزيع." },
  hText: { tr: "Turlar düzenli ilerler, kimin hangi cüzü okuduğu tek bakışta görünür.",
    en: "Rounds move along steadily, and you can see at a glance who is reading which juz.",
    de: "Die Runden laufen regelmäßig weiter, und du siehst auf einen Blick, wer welchen Dschuz liest.",
    fr: "Les tours avancent régulièrement, et tu vois d'un coup d'œil qui lit quel juz.",
    ar: "تسير الجولات بانتظام، وترى بنظرة واحدة من يقرأ أي جزء." },
  hT1: { tr: "Cüzler her tur kendiliğinden dağıtılır; istersen payları kişiye göre ayarlarsın", en: "Portions are handed out automatically each round, and you can adjust each person's share",
    de: "Die Abschnitte werden jede Runde automatisch verteilt; die Anteile kannst du pro Person anpassen", fr: "Les portions sont réparties automatiquement à chaque tour, et tu peux ajuster la part de chacun",
    ar: "تُوزَّع الأجزاء تلقائيًا في كل جولة، ويمكنك ضبط نصيب كل شخص" },
  hT2: { tr: "Yetişemeyen payını havuza bırakabilir", en: "Anyone who falls behind can return their part to the pool",
    de: "Wer nicht hinterherkommt, kann seinen Teil in den Pool geben", fr: "Qui prend du retard peut remettre sa part dans le pool",
    ar: "من تأخّر يمكنه إعادة نصيبه إلى المجمع" },
  hT3: { tr: "Rehber Modu: halkayı kuran yalnız izleyebilir", en: "Mentor Mode: the organiser can simply oversee",
    de: "Mentor-Modus: Wer den Kreis gründet, kann einfach begleiten", fr: "Mode Mentor : l'organisateur peut simplement suivre",
    ar: "وضع المرشد: يمكن لمنشئ الحلقة أن يكتفي بالمتابعة" },

  vKicker: { tr: "Tek Seferlik Halka", en: "One-Time Circle", de: "Einmaliger Kreis", fr: "Cercle ponctuel", ar: "حلقة لمرة واحدة" },
  vTitle: { tr: "Bir vesile için bir araya gel.", en: "Come together for an occasion.", de: "Kommt zu einem Anlass zusammen.",
    fr: "Rassemblez-vous pour une occasion.", ar: "اجتمعوا لمناسبة." },
  vText: { tr: "Hatim, 41 Yâsîn ya da salavat için tek seferlik bir halka kur: kimin için olduğunu ve ne zamana kadar süreceğini seç, tek ekranda kur ve davet et. Davet linkini alan, uygulamayı indirmeden de tarayıcıdan pay alabilir.", en: "Set up a one-time circle for a khatm, 41 Yasin or salawat: choose who it is for and when it ends, set it up on a single screen and invite. Whoever gets the invite link can take a share in the browser, without installing the app.",
    de: "Gründe einen einmaligen Kreis für eine Chatma, 41 Yasin oder Salawat: Wähle, für wen und bis wann, lege ihn auf einem Bildschirm an und lade ein. Wer den Einladungslink bekommt, kann auch ohne App im Browser einen Teil übernehmen.", fr: "Crée un cercle ponctuel pour une khatma, 41 Yasin ou des salawat : choisis pour qui et jusqu'à quand, crée-le en un écran et invite. Qui reçoit le lien d'invitation peut prendre une part dans le navigateur, sans installer l'appli.",
    ar: "أنشئ حلقة لمرة واحدة لختمة أو «يس 41 مرة» أو الصلاة على النبي ﷺ: حدّد لمن هي ومتى تنتهي، وأنشئها في شاشة واحدة وادعُ إليها. ومن يصله رابط الدعوة يمكنه أخذ نصيب من المتصفح دون تثبيت التطبيق." },
  vT1: { tr: "Hesap açmadan, tarayıcıdan katılım", en: "Join from the browser, no account needed", de: "Mitmachen im Browser, ohne Konto",
    fr: "Participation depuis le navigateur, sans compte", ar: "مشاركة من المتصفح دون حساب" },
  vT2: { tr: "Bitişi sen seç: bu gece, cumaya kadar ya da sıradaki kandile kadar", en: "You choose the end: tonight, by Friday or until the next blessed night",
    de: "Du wählst das Ende: heute Nacht, bis Freitag oder bis zur nächsten gesegneten Nacht", fr: "Tu choisis la fin : cette nuit, d'ici vendredi ou jusqu'à la prochaine nuit bénie",
    ar: "أنت تختار النهاية: الليلة، أو حتى الجمعة، أو حتى الليلة المباركة القادمة" },
  vT3: { tr: "Halka tamamlanınca katılanlara haber gider", en: "When the circle completes, everyone who took part is notified",
    de: "Ist der Kreis vollendet, erhalten alle Teilnehmenden eine Mitteilung", fr: "Cercle terminé : tous les participants sont prévenus",
    ar: "عند اكتمال الحلقة يصل إشعار إلى كل المشاركين" },
  wcTitle: { tr: "Kandil Hatmi", en: "Blessed Night Khatm", de: "Chatma zur gesegneten Nacht", fr: "Khatma de la nuit bénie", ar: "ختمة الليلة المباركة" },
  wcJuz: { tr: "Cüz 7", en: "Juz 7", de: "Dschuz 7", fr: "Juz 7", ar: "الجزء 7" },
  wcRead: { tr: "Oku", en: "Read", de: "Lesen", fr: "Lire", ar: "اقرأ" },
  wcNote: { tr: "Uygulama gerekmez", en: "No app needed", de: "Keine App nötig", fr: "Pas besoin de l'appli", ar: "لا حاجة إلى التطبيق" },

  aKicker: { tr: "Ortak Ameller", en: "Shared practices", de: "Gemeinsame Praxis", fr: "Pratiques communes", ar: "أعمال مشتركة" },
  aTitle: { tr: "Teşvik var, kıyas yok.", en: "Encouragement, not comparison.", de: "Ermutigung statt Vergleich.",
    fr: "L'encouragement, pas la comparaison.", ar: "تشجيع بلا مقارنة." },
  aText: { tr: "Beş vakti, orucu, ezberi ya da bir duayı halkanla birlikte sürdür. Herkes kendi gününü işaretler.", en: "Keep up the five prayers, fasting, memorisation or a dua together with your circle. Everyone marks their own day.",
    de: "Halte die fünf Gebete, das Fasten, das Auswendiglernen oder ein Bittgebet gemeinsam mit deinem Kreis durch. Jeder markiert seinen eigenen Tag.", fr: "Maintiens les cinq prières, le jeûne, la mémorisation ou une invocation avec ton cercle. Chacun coche sa propre journée.",
    ar: "داوم مع حلقتك على الصلوات الخمس أو الصيام أو الحفظ أو دعاء. يعلّم كلٌّ يومه بنفسه." },
  aT1: { tr: "Sıralama, puan ve rozet yok", en: "No rankings, points or badges", de: "Keine Ranglisten, Punkte oder Abzeichen",
    fr: "Ni classement, ni points, ni badges", ar: "لا ترتيب ولا نقاط ولا شارات" },
  aT2: { tr: "Görünürlük baştan belli: yalnız yönetici ya da karşılıklı", en: "Visibility is set from the start: organiser only, or mutual",
    de: "Sichtbarkeit von Anfang an klar: nur die Leitung oder gegenseitig", fr: "Visibilité définie dès le départ : administrateur seul, ou mutuelle",
    ar: "الرؤية محددة من البداية: المسؤول فقط أو متبادلة" },
  aT3: { tr: "Hatırlatmalar senin vaktine göre", en: "Reminders fit your own schedule", de: "Erinnerungen nach deinem Zeitplan",
    fr: "Des rappels à ton rythme", ar: "تذكيرات وفق أوقاتك" },

  gTitle: { tr: "Farklı yerlerden, aynı niyetle.", en: "From different places, with one intention.", de: "Von verschiedenen Orten, mit einer Absicht.",
    fr: "De lieux différents, avec une même intention.", ar: "من أماكن مختلفة، بنيّة واحدة." },
  gText: { tr: "Dünyanın dört bir yanından okuyanlarla süregiden ortak hatme ve ortak zikre katıl.",
    en: "Join the ongoing shared khatm and dhikr with readers around the world.",
    de: "Mach bei der laufenden gemeinsamen Chatma und beim gemeinsamen Dhikr mit Lesenden aus aller Welt mit.",
    fr: "Rejoins la khatma et le dhikr communs en cours avec des lecteurs du monde entier.",
    ar: "انضم إلى الختمة والذكر الجماعيين الجاريين مع قرّاء من أنحاء العالم." },
  gLink: { tr: "Web'den katıl", en: "Join on the web", de: "Im Browser mitmachen", fr: "Participer sur le web", ar: "شارك عبر الويب" },
  jKicker: { tr: "Yolculuğum", en: "My Journey", de: "Mein Weg", fr: "Mon parcours", ar: "رحلتي" },
  jTitle: { tr: "Sana ait olan sende kalsın.", en: "What's yours stays with you.", de: "Was dir gehört, bleibt bei dir.",
    fr: "Ce qui t'appartient reste à toi.", ar: "ما هو لك يبقى لك." },
  jText: { tr: "Okuduklarını ve manevi yolculuğundaki hatıraları kendin için gör. Amaç kıyaslanmak değil, kendi yolunu hatırlamak.",
    en: "See what you've read and the memories of your spiritual journey, for yourself. The point isn't comparison, it's remembering your own path.",
    de: "Sieh für dich, was du gelesen hast, und die Erinnerungen deines spirituellen Weges. Es geht nicht um Vergleich, sondern darum, dich an deinen eigenen Weg zu erinnern.",
    fr: "Revois pour toi ce que tu as lu et les souvenirs de ton parcours spirituel. Le but n'est pas la comparaison, mais de te souvenir de ton propre chemin.",
    ar: "شاهد لنفسك ما قرأت وذكريات رحلتك الروحية. ليس الهدف المقارنة، بل أن تتذكّر طريقك الخاص." },

  kisKicker: { tr: "Kişiselleştir", en: "Make it yours", de: "Personalisieren", fr: "Personnaliser", ar: "التخصيص" },
  kisTitle: { tr: "Kendi zevkine göre.", en: "Made to your taste.", de: "Ganz nach deinem Geschmack.", fr: "Selon tes goûts.", ar: "على ذوقك." },
  kisText: { tr: "Zeminini, rengini, ana ekranındaki widget'ı sen seç. Her gün baktığın yer sana göre olsun.",
    en: "Choose your backdrop, your color and the widget on your home screen. The place you look at every day should feel like yours.",
    de: "Wähle deinen Hintergrund, deine Farbe und das Widget auf deinem Startbildschirm. Der Ort, auf den du jeden Tag schaust, soll zu dir passen.",
    fr: "Choisis ton fond, ta couleur et le widget de ton écran d'accueil. L'endroit que tu regardes chaque jour doit te ressembler.",
    ar: "اختر خلفيتك ولونك والأداة على شاشتك الرئيسية. ليكن المكان الذي تنظر إليه كل يوم على ذوقك." },
  kisNote: { tr: "Bazı zeminler ve temalar Premium ile açılır.", en: "Some backdrops and themes unlock with Premium.",
    de: "Einige Hintergründe und Designs sind mit Premium verfügbar.", fr: "Certains fonds et thèmes se débloquent avec Premium.",
    ar: "بعض الخلفيات والسمات تُفتح مع بريميوم." },
  kisAria: { tr: "Kişiselleştirme ekranları", en: "Personalization screens", de: "Bildschirme zur Personalisierung",
    fr: "Écrans de personnalisation", ar: "شاشات التخصيص" },

  faqTitle: { tr: "Başlamadan önce", en: "Before you start", de: "Bevor du anfängst", fr: "Avant de commencer", ar: "قبل أن تبدأ" },
  faqText: { tr: "Aklına takılan başka bir şey varsa support@manevihalka.app adresine yaz.", en: "Any other question? Write to support@manevihalka.app.",
    de: "Noch eine Frage? Schreib an support@manevihalka.app.", fr: "Une autre question ? Écris à support@manevihalka.app.",
    ar: "لديك سؤال آخر؟ اكتب إلى support@manevihalka.app." },
  q1: { tr: "Ücretsiz mi?", en: "Is it free?", de: "Ist es kostenlos?", fr: "Est-ce gratuit ?", ar: "هل هو مجاني؟" },
  a1: { tr: "Evet. İbadetin kendisi her zaman ücretsiz: Kur'an, namaz vakitleri, zikir, dualar ve halkalara katılmak. Bazı ek kolaylıklar isteğe bağlıdır.",
    en: "Yes. Worship itself is always free: the Quran, prayer times, dhikr, duas and joining circles. Some extra conveniences are optional.",
    de: "Ja. Die Anbetung selbst ist immer kostenlos: Koran, Gebetszeiten, Dhikr, Bittgebete und das Mitmachen in Kreisen. Einige zusätzliche Annehmlichkeiten sind optional.",
    fr: "Oui. L'adoration elle-même est toujours gratuite : le Coran, les horaires de prière, le dhikr, les invocations et la participation aux cercles. Quelques options de confort sont facultatives.",
    ar: "نعم. العبادة نفسها مجانية دائمًا: القرآن ومواقيت الصلاة والذكر والأدعية والانضمام إلى الحلقات. وبعض الميزات الإضافية اختيارية." },
  // 5 Eki 2026: halka kurmanin ucretsiz siniri. Kaynak uygulamada lib/premiumLimits.ts
  // (FREE_GROUP_LIMIT 1, FREE_ACTIVE_EVENT_LIMIT 1, katilma kilitsiz) ve rehber README kural 9.
  // FIYAT YAZILMAZ. Sablonda {{qCircle}} yoksa uretici onu q1'in hemen altina ekler (SSS_EK).
  qCircle: { tr: "Halka kurmak ücretsiz mi?", en: "Is setting up a circle free?", de: "Kann ich kostenlos einen Kreis gründen?",
    fr: "Créer un cercle, c'est gratuit ?", ar: "هل إنشاء حلقة مجاني؟" },
  aCircle: { tr: "Evet. Bir halka kurup yönetmek ücretsiz; aynı anda bir tek seferlik halka da yürütebilirsin. Halkalara katılmak ise her zaman ücretsiz ve sınırsız. Daha fazla halka için Premium isteğe bağlı.",
    en: "Yes. You can manage one circle for free, plus one active one-time circle at a time. Joining circles is always free, with no limit. Premium is optional if you want more circles.",
    de: "Ja. Du kannst kostenlos einen Kreis verwalten und jeweils einen einmaligen Kreis durchführen. Kreisen beizutreten ist immer kostenlos und unbegrenzt. Für mehr Kreise ist Premium optional.",
    fr: "Oui. Tu peux gérer gratuitement un cercle et, en même temps, un cercle ponctuel actif. Rejoindre des cercles est toujours gratuit et sans limite. Pour en créer davantage, Premium est facultatif.",
    ar: "نعم. يمكنك مجانًا إدارة حلقة واحدة، وتنظيم حلقة لمرة واحدة نشطة في كل مرة. والانضمام إلى الحلقات مجاني دائمًا وبلا حدود. وإن أردت حلقات أكثر، فبريميوم اختياري." },
  q2: { tr: "Hesap açmam gerekiyor mu?", en: "Do I need an account?", de: "Brauche ich ein Konto?", fr: "Dois-je créer un compte ?", ar: "هل أحتاج إلى حساب؟" },
  a2: { tr: "Hayır. Uygulamayı açıp hemen kullanabilirsin. İstersen hesabını sonradan Apple, Google ya da e-postayla güvenceye alırsın.",
    en: "No. Open the app and start right away. If you like, you can secure your account later with Apple, Google or email.",
    de: "Nein. Öffne die App und leg sofort los. Wenn du möchtest, sicherst du dein Konto später mit Apple, Google oder E-Mail.",
    fr: "Non. Ouvre l'appli et commence tout de suite. Si tu veux, tu sécurises ton compte plus tard avec Apple, Google ou un e-mail.",
    ar: "لا. افتح التطبيق وابدأ فورًا. وإن شئت، أمّن حسابك لاحقًا عبر Apple أو Google أو البريد الإلكتروني." },
  q3: { tr: "Uygulaması olmayan halkaya katılabilir mi?", en: "Can someone without the app join?", de: "Kann jemand ohne App mitmachen?",
    fr: "Quelqu'un sans l'appli peut-il participer ?", ar: "هل يمكن لمن لا يملك التطبيق أن يشارك؟" },
  a3: { tr: "Tek seferlik halkalarda evet. Davet linkine dokunan kişi tarayıcıdan cüz alıp okuyabilir.",
    en: "In one-time circles, yes. Whoever taps the invite link can take a juz and read it in the browser.",
    de: "In einmaligen Kreisen ja. Wer auf den Einladungslink tippt, kann im Browser einen Dschuz übernehmen und lesen.",
    fr: "Dans les cercles ponctuels, oui. Celui qui touche le lien d'invitation peut prendre un juz et le lire dans le navigateur.",
    ar: "في الحلقات لمرة واحدة، نعم. من يضغط على رابط الدعوة يمكنه أخذ جزء وقراءته في المتصفح." },
  q4: { tr: "Hangi mushaf kullanılıyor?", en: "Which Mushaf is used?", de: "Welcher Mushaf wird verwendet?", fr: "Quel Mushaf est utilisé ?", ar: "أي مصحف يُستخدم؟" },
  a4: { tr: "Türkiye'de okunan imlaya göre mushaf. Meal ve dilediğin kârîden sesli tilavet de var.",
    en: "A Mushaf in the spelling used in Türkiye, with translation and recitation by the reciter you choose.",
    de: "Ein Mushaf in der in der Türkei üblichen Schreibweise, mit Übersetzung und Rezitation von einem Rezitator deiner Wahl.",
    fr: "Un Mushaf selon l'orthographe en usage en Turquie, avec traduction et récitation par le récitateur de ton choix.",
    ar: "مصحف بالرسم المتداول في تركيا، مع ترجمة وتلاوة بصوت القارئ الذي تختاره." },
  q5: { tr: "iPhone ve Android'de çalışıyor mu?", en: "Does it work on iPhone and Android?", de: "Läuft es auf iPhone und Android?",
    fr: "Ça marche sur iPhone et Android ?", ar: "هل يعمل على آيفون وأندرويد؟" },
  a5: { tr: "İkisinde de. Uygulama Türkçe, İngilizce, Almanca, Fransızca ve Arapça kullanılabilir.",
    en: "On both. The app is available in Turkish, English, German, French and Arabic.",
    de: "Auf beiden. Die App gibt es auf Türkisch, Englisch, Deutsch, Französisch und Arabisch.",
    fr: "Sur les deux. L'appli est disponible en turc, anglais, allemand, français et arabe.",
    ar: "على كليهما. والتطبيق متاح بالتركية والإنجليزية والألمانية والفرنسية والعربية." },

  closeLine: { tr: "Tek başına başla ya da sevdiklerinle bir halka kur.", en: "Start on your own, or start a circle with your loved ones.",
    de: "Fang allein an oder gründe einen Kreis mit deinen Liebsten.", fr: "Commence seul ou crée un cercle avec tes proches.",
    ar: "ابدأ بمفردك أو أنشئ حلقة مع أحبّتك." },
  closeSub: { tr: "Manevi Halka'yı ücretsiz indir.", en: "Download Manevi Halka for free.", de: "Lade Manevi Halka kostenlos herunter.",
    fr: "Télécharge Manevi Halka gratuitement.", ar: "حمّل Manevi Halka مجانًا." },

  altVakit: { tr: "Namazlarım: bugünün vakitleri ve kazalar için düğmeler", en: "My Prayers: today's prayers with buttons for make-ups",
    de: "Meine Gebete: die heutigen Gebete mit Schaltflächen zum Nachholen", fr: "Mes prières : les prières du jour et des boutons pour les rattrapages",
    ar: "صلواتي: صلوات اليوم مع أزرار القضاء" },
  altQuran: { tr: "Kur'an okuyucusu, Mülk suresi: Mushaf görünümünde ayetler ve meal", en: "Quran reader, Surah Al-Mulk: verses and translation in Mushaf view",
    de: "Koran-Leser, Sure Al-Mulk: Verse und Übersetzung in der Mushaf-Ansicht", fr: "Lecteur du Coran, sourate Al-Mulk : versets et traduction en vue Mushaf",
    ar: "قارئ القرآن، سورة الملك: الآيات في عرض المصحف" },
  altHalka: { tr: "Aile Hatmi, halka sekmesi: dört kişi ve cüzleri", en: "Family Khatm, circle tab: four members and their juz",
    de: "Familien-Chatma, Kreis-Ansicht: vier Mitglieder und ihre Dschuz", fr: "Khatma familiale, onglet Cercle : quatre membres et leurs juz",
    ar: "ختمة العائلة، تبويب الحلقة: أربعة أعضاء وأجزاؤهم" },
  altAmel: { tr: "Ortak amel: 5 vakit, sabah ve öğle işaretli", en: "Shared practice: all 5 prayers, Fajr and Dhuhr marked",
    de: "Gemeinsame Praxis: alle 5 Gebete, Fadschr und Dhuhr markiert", fr: "Pratique commune : les 5 prières, Fajr et Dhohr cochées",
    ar: "عمل مشترك: الصلوات الخمس، والفجر والظهر معلَّمتان" },
  altVesile: { tr: "Tek seferlik halka: 41 Yâsîn, kimin için, ne okunacak ve ne zamana kadar", en: "One-time circle: 41 Yasin, who it is for, what is read and until when",
    de: "Einmaliger Kreis: 41 Yasin, für wen, was gelesen wird und bis wann", fr: "Cercle ponctuel : 41 Yasin, pour qui, quoi lire et jusqu'à quand",
    ar: "حلقة لمرة واحدة: يس 41 مرة، لمن، وماذا يُقرأ، وحتى متى" },
  // Vesile bandinda arkadaki egik telefon: ayni halkanin bittigi hal (Halka Neticesi)
  vDone: { tr: "Ne zamana kadar", en: "Until when",
    de: "Bis wann", fr: "Jusqu'à quand",
    ar: "حتى متى" },
  altVesileDone: { tr: "Ne zamana kadar: bu gece, cumaya kadar, 3 gün, 1 hafta ya da sıradaki kandile kadar", en: "Until when: tonight, by Friday, 3 days, 1 week or until the next blessed night",
    de: "Bis wann: heute Nacht, bis Freitag, 3 Tage, 1 Woche oder bis zur nächsten gesegneten Nacht", fr: "Jusqu'à quand : cette nuit, d'ici vendredi, 3 jours, 1 semaine ou jusqu'à la prochaine nuit bénie",
    ar: "حتى متى: الليلة، حتى الجمعة، 3 أيام، أسبوع، أو حتى الليلة المباركة القادمة" },
};

// ── Giris seridi: on kart (sira ilk gorunusu belirler: ortada Kur'an, yanlarinda bahce ve kubbe) ──
// [dosya, kaynak kare, ad]. Adlar uygulamadaki ekran adlariyla ayni (locales/*.json).
const SERIT = [
  ["st-mushaf", "q-mushaf", { tr: "Kur'an okuyucusu", en: "Quran reader", de: "Koran-Leser", fr: "Lecteur du Coran", ar: "قارئ القرآن" }],
  ["st-bahce", "b-bahce", { tr: "Niyet Bahçesi", en: "Garden of Intentions", de: "Garten der Absichten", fr: "Jardin des intentions", ar: "بستان النية" }],
  ["st-home", "n-home", { tr: "Ana Sayfa", en: "Home", de: "Start", fr: "Accueil", ar: "الرئيسية" }],
  ["st-halka", "h-halka-ust", { tr: "Ortak hatim", en: "Group khatm", de: "Gemeinsame Chatma", fr: "Khatma commune", ar: "ختمة جماعية" }],
  ["st-sayac", "z-sayac", { tr: "Zikirmatik", en: "Dhikr Counter", de: "Dhikr-Zähler", fr: "Compteur de dhikr", ar: "عداد الذكر" }],
  ["st-tek", "ev-hazir", { tr: "Tek seferlik halka", en: "One-time circle", de: "Einmaliger Kreis", fr: "Cercle ponctuel", ar: "حلقة لمرة واحدة" }],
  ["st-video", "v-45", { tr: "Ayetli video", en: "Verse video", de: "Versvideo", fr: "Vidéo de versets", ar: "فيديو الآيات" }],
  ["st-namaz", "n-namazlarim", { tr: "Namazlarım", en: "My Prayers", de: "Meine Gebete", fr: "Mes prières", ar: "صلواتي" }],
  ["st-defter", "z-defter", { tr: "Dua Defterim", en: "My dua journal", de: "Mein Bittgebetsheft", fr: "Mon carnet d'invocations", ar: "دفتر أدعيتي" }],
  ["st-sahne", "s-kubbe", { tr: "Dinleme sahneleri", en: "Listening scenes", de: "Hörszenen", fr: "Scènes d'écoute", ar: "مشاهد الاستماع" }],
];
function seritHtml(dil) {
  const n = SERIT.length;
  return SERIT.map(([dosya, , ad], i) => {
    const u = i <= n / 2 ? i : i - n;            // ortaya gore sira (betikteki sarma ile ayni)
    const yol = join(KOK, "img", "app", dil, dosya + ".webp");
    if (!existsSync(yol)) hata(`${dil}: serit gorseli yok: ${dosya}`);
    const [w, h] = webpBoyut(yol);
    const oncelik = Math.abs(u) <= 1 ? ' fetchpriority="high"' : "";
    return `<figure class="st-card" style="--u:${u}"><span class="st-ph"><img src="/img/app/${dil}/${dosya}.webp" width="${w}" height="${h}" alt="${kacis(ad[dil])}" decoding="async"${oncelik}></span><figcaption aria-hidden="true">${kacis(ad[dil])}</figcaption></figure>`;
  }).join("");
}

// ── Yeni gelenler galerisi (21 Kas 2026): 2.1.0 ozellikleri, dokuz kart. [dosya, kaynak kare, renk (acik, koyu), k ad, t baslik, p metin]
// Metinler release-notes-2.1.0.md'deki onayli App Store notundan (bes dil); ozellik adlari uygulamayla ayni.
// "Buyuk Halka" reklam basligi olarak kullanilmaz: kartin adi "Herkese acik halka". Anlatimda Cevsen gecmez.
const YENI = [
  ["nw-okuyucu", "q-mini", "#f3e8cb", "#2a2416",
    { tr: "Kur'an okuyucusu", en: "Quran reader", de: "Koran-Leser", fr: "Lecteur du Coran", ar: "قارئ القرآن" },
    { tr: "Baştan yenilendi", en: "Renewed from the ground up", de: "Von Grund auf erneuert", fr: "Entièrement renouvelé", ar: "تجدّد من أساسه" },
    { tr: "Mushaf, Akan ve meal görünümleri, tecvid renkleri, büyüteç ve ayetlerde arama.",
      en: "Mushaf, Flowing and translation views, tajweed colours, a magnifier and verse search.",
      de: "Ansichten Mushaf, Fließtext und Übersetzung, Tadschwid-Farben, Lupe und Suche in den Versen.",
      fr: "Vues Mushaf, Continu et traduction, couleurs du tajwid, loupe et recherche de versets.",
      ar: "عرض المصحف والنص المتصل والترجمة، وألوان التجويد، والعدسة المكبّرة، والبحث في الآيات." }],
  ["nw-sahne", "s-kubbe", "#ecdfc7", "#241d12",
    { tr: "Dinleme sahneleri", en: "Listening scenes", de: "Hörszenen", fr: "Scènes d'écoute", ar: "مشاهد الاستماع" },
    { tr: "Tilaveti bir kubbenin altında dinle", en: "Listen beneath a turning dome", de: "Hör unter einer sich drehenden Kuppel zu", fr: "Écoute sous une coupole qui tourne", ar: "استمع تحت قبة تدور" },
    { tr: "Dönen bir cami kubbesi, akan bir manzara ya da pastel bir resim. Kâbe ve Mescid-i Nebevî sahneleri de var.",
      en: "A turning mosque dome, a moving landscape or a pastel painting. There are scenes of the Kaaba and the Prophet's Mosque too.",
      de: "Eine sich drehende Moscheekuppel, eine ziehende Landschaft oder ein Pastellbild. Dazu Szenen der Kaaba und der Prophetenmoschee.",
      fr: "Une coupole de mosquée qui tourne, un paysage qui défile ou une peinture au pastel. Aussi : la Kaaba et la Mosquée du Prophète.",
      ar: "قبة مسجد تدور، أو منظر يتحرك، أو لوحة باستيل. وهناك مشاهد للكعبة والمسجد النبوي أيضًا." }],
  ["nw-video", "v-45", "#dce4ef", "#121a26",
    { tr: "Ayetli video", en: "Verse video", de: "Versvideo", fr: "Vidéo de versets", ar: "فيديو الآيات" },
    { tr: "Seçtiğin ayetlerden video", en: "A video from the verses you choose", de: "Ein Video aus Versen deiner Wahl", fr: "Une vidéo avec les versets de ton choix", ar: "فيديو من الآيات التي تختارها" },
    { tr: "Bir kârînin ya da kendi sesinle üç biçimde oluştur, kaydet ve paylaş.",
      en: "Make it in three formats with a reciter's voice or your own, then save and share it.",
      de: "In drei Formaten, mit der Stimme eines Rezitators oder deiner eigenen; dann sichern und teilen.",
      fr: "En trois formats, avec la voix d'un récitateur ou la tienne ; puis enregistre-la et partage-la.",
      ar: "بثلاثة أشكال، بصوت قارئ أو بصوتك، ثم احفظه وشاركه." }],
  ["nw-bahce", "b-bahce", "#e1eddb", "#15241a",
    { tr: "Niyet Bahçesi", en: "Garden of Intentions", de: "Garten der Absichten", fr: "Jardin des intentions", ar: "بستان النية" },
    { tr: "Her niyetin bir fidan olur", en: "Each intention becomes a sapling", de: "Jede Absicht wird zum Setzling", fr: "Chaque intention devient une pousse", ar: "كل نية تصير غرسة" },
    { tr: "Sen emek verdikçe büyür. Bahçeni yalnız sen görürsün; ara vermen gerekirse bahçen seni bekler.",
      en: "It grows as you keep it. Only you see your garden, and if you need a break, it waits for you.",
      de: "Er wächst, wenn du sie einhältst. Deinen Garten siehst nur du; brauchst du eine Pause, wartet er auf dich.",
      fr: "Elle grandit quand tu la tiens. Toi seul vois ton jardin ; si tu as besoin d'une pause, il t'attend.",
      ar: "تكبر كلما وفيت بها. بستانك لا يراه أحد سواك، وإن احتجت إلى استراحة فهو ينتظرك." }],
  ["nw-sohbet", "sohbet-ust", "#f2e7db", "#2a1f17",
    { tr: "Vakit sohbeti", en: "Talk after prayer", de: "Impuls nach dem Gebet", fr: "Causerie après la prière", ar: "خاطرة بعد الصلاة" },
    { tr: "Her namazdan sonra bir dakika", en: "One minute after each prayer", de: "Eine Minute nach jedem Gebet", fr: "Une minute après chaque prière", ar: "دقيقة بعد كل صلاة" },
    { tr: "İlk dizi Efendimiz'in Hayatından. Anlatılanlar Kur'an'a, Buhârî ve Müslim'e ve sahih ya da hasen rivayetlere dayanır.",
      en: "The first series is From the Life of the Prophet. It rests only on the Quran, Sahih al-Bukhari, Sahih Muslim and narrations graded sahih or hasan.",
      de: "Erste Reihe: Aus dem Leben des Propheten. Quellen sind nur der Koran, Sahih al-Buchari, Sahih Muslim und als sahih oder hasan beurteilte Überlieferungen.",
      fr: "Première série : De la vie du Prophète. Seuls servent de source le Coran, Sahih al-Bukhari, Sahih Muslim et les récits jugés sahih ou hasan.",
      ar: "السلسلة الأولى «من حياة النبي ﷺ»، ولا يُروى فيها إلا ما يستند إلى القرآن الكريم وصحيحي البخاري ومسلم والروايات الصحيحة أو الحسنة." }],
  ["nw-gece", "n-gece", "#dee4ec", "#101822",
    { tr: "Teheccüd", en: "Tahajjud", de: "Tahajjud", fr: "Tahajjud", ar: "التهجد" },
    { tr: "Bu gecenin teheccüd vakti", en: "Tonight's time for tahajjud", de: "Die Tahajjud-Zeit dieser Nacht", fr: "L'heure du tahajjud de la nuit", ar: "وقت التهجد لهذه الليلة" },
    { tr: "Namazlarım'daki kartta vitir, kısa bir rehber ve uyandırma alarmı da var.",
      en: "The card in My Prayers also has witr, a short guide and a wake-up alarm.",
      de: "Die Karte in „Meine Gebete“ hat auch Witr, eine Anleitung und einen Weckalarm.",
      fr: "La carte de Mes prières a aussi le witr, un guide et un réveil.",
      ar: "وفي بطاقة «صلواتي» أيضًا الوتر ودليل ومنبّه الاستيقاظ." }],
  ["nw-kaza", "n-kaza", "#e0eee8", "#12231c",
    { tr: "Kaza namazlarım ve oruçlarım", en: "Make-up prayers and fasts", de: "Nachholgebete und -fasten", fr: "Prières et jeûnes de rattrapage", ar: "قضاء الصلاة والصيام" },
    { tr: "Tane tane, kendi hızında", en: "One by one, at your own pace", de: "Eins nach dem anderen, in deinem Tempo", fr: "Un à un, à ton rythme", ar: "واحدةً تلو الأخرى، على مهلك" },
    { tr: "Hesap yardımcısı ve isteğe bağlı hatırlatma var; kayıtlarını yalnız sen görürsün.",
      en: "There is a calculation helper and an optional reminder; only you see your records.",
      de: "Mit Rechenhilfe und optionaler Erinnerung; deine Einträge siehst nur du.",
      fr: "Aide au calcul et rappel facultatif ; toi seul vois tes données.",
      ar: "مع مساعد للحساب وتذكير اختياري، ولا يرى سجلاتك أحد سواك." }],
  ["nw-defter", "z-defter", "#e7eae5", "#18201c",
    { tr: "Dua Defterim", en: "My dua journal", de: "Mein Bittgebetsheft", fr: "Mon carnet d'invocations", ar: "دفتر أدعيتي" },
    { tr: "Dualarını bölüm bölüm yaz", en: "Write your duas, section by section", de: "Schreib deine Bittgebete nach Abschnitten", fr: "Écris tes invocations par sections", ar: "اكتب أدعيتك قسمًا قسمًا" },
    { tr: "Ayet, dua ve Esmâ ekle, hatırlatıcı kur, PDF olarak paylaş.",
      en: "Add verses, duas and the Names of Allah, set a reminder and share it as a PDF.",
      de: "Füge Verse, Bittgebete und die Namen Allahs hinzu, richte eine Erinnerung ein und teile es als PDF.",
      fr: "Ajoute versets, invocations et noms d'Allah, règle un rappel et partage-le en PDF.",
      ar: "أضف الآيات والأدعية وأسماء الله الحسنى، واضبط تذكيرًا، وشاركه ملف PDF." }],
  ["nw-haftalik", "h-buyuk", "#f1e2e7", "#2a1a21",
    { tr: "Herkese açık halka", en: "Open weekly circle", de: "Offener Wochenkreis", fr: "Cercle ouvert à tous", ar: "حلقة مفتوحة" },
    { tr: "Haftada bir sayfayla hatme ortak ol", en: "Share in a khatm with one page a week", de: "Mit einer Seite pro Woche Teil einer Chatma", fr: "Une page par semaine pour une khatma commune", ar: "شارك في ختمة بصفحة واحدة في الأسبوع" },
    { tr: "Haftalık Kur'an halkasına katıl. Üye listesi yok, yalnız halkanın toplamı görünür.",
      en: "Join the open weekly Quran circle. There is no member list, only the circle's totals are shown.",
      de: "Tritt dem offenen wöchentlichen Koran-Kreis bei. Keine Mitgliederliste: sichtbar sind nur die Gesamtzahlen.",
      fr: "Rejoins le cercle hebdomadaire du Coran. Pas de liste de membres : seuls les totaux du cercle s'affichent.",
      ar: "انضم إلى حلقة القرآن الأسبوعية المفتوحة. لا توجد قائمة أعضاء، ويظهر مجموع الحلقة فقط." }],
];
function yeniHtml(dil) {
  return YENI.map(([dosya, , acik, koyu, k, t, p]) => {
    const yol = join(KOK, "img", "app", dil, dosya + ".webp");
    if (!existsSync(yol)) hata(`${dil}: galeri gorseli yok: ${dosya}`);
    const [w, h] = webpBoyut(yol);
    return `<li class="nw-card" style="--t:${acik};--td:${koyu}"><div class="nw-txt"><span class="nw-k">${kacis(k[dil])}</span><h3>${kacis(t[dil])}</h3><p>${kacis(p[dil])}</p></div>` +
      `<figure class="phone nw-ph"><img src="/img/app/${dil}/${dosya}.webp" width="${w}" height="${h}" alt="${kacis(k[dil])}" loading="lazy" decoding="async"></figure></li>`;
  }).join("");
}

const IOS = "https://apps.apple.com/app/manevi-halka/id6760654292";
const play = (yer, dil) => "https://play.google.com/store/apps/details?id=com.emrhnayz.spiritualcircle&referrer=" +
  encodeURIComponent(`utm_source=manevihalka.app&utm_medium=website&utm_content=${yer}-${dil}`);
const politika = (ad, dil) => dil === "tr" ? `/${ad}.html` : `/${ad}-${dil}.html`;
const kacis = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function sozlukFor(dil) {
  const o = {};
  for (const [k, v] of Object.entries(T)) {
    if (v[dil] == null) hata(`T.${k}.${dil} yok`);
    o[k] = v[dil];
  }
  const kaynak = kutu.I18N[dil];
  if (!kaynak) hata(`I18N.${dil} yok`);
  for (const k of ORTAK) { if (kaynak[k] == null) hata(`I18N.${dil}.${k} yok`); o[k] = kaynak[k]; }
  o.gKicker = kaynak.ccTitle;
  o.navReading = kaynak.ccTitle;
  o.faqKicker = T.navFaq[dil];
  return o;
}

function veri(dil) {
  return {
    lang: dil, rtl: dil === "ar", imgBase: `/img/app/${dil}/`,
    aria: { toDark: T.themeToDark[dil], toLight: T.themeToLight[dil] },
    links: { ios: IOS, androidDock: play("dock", dil) },
    strip: { label: T.stripLabel[dil] },
    secName: { top: T.secStart[dil], yeni: T.navNew[dil], solo: T.navSolo[dil], together: T.navTogether[dil], faq: T.navFaq[dil], download: kutu.I18N[dil].get },
    sections: T.navAria[dil],
  };
}

// ─── bas bilgisi: kok onceki ana sayfayla BIREBIR (arama gorunurlugu) ───────
const I18N = kutu.I18N;
// Baslik ve aciklama sinirlari (arama sonucunda kesilmesin). Kok dahil bes dil site-i18n.js'ten.
for (const d of DILLER) {
  const t = I18N[d];
  if (!t.title.startsWith("Manevi Halka")) hata(`I18N.${d}.title "Manevi Halka" ile baslamali`);
  if ([...t.title].length > 60) hata(`I18N.${d}.title 60 karakteri asiyor (${[...t.title].length})`);
  if ([...t.desc].length > 155) hata(`I18N.${d}.desc 155 karakteri asiyor (${[...t.desc].length})`);
}
const hreflang = [...DILLER.map((d) => `<link rel="alternate" hreflang="${d}" href="${tamAdres(EV[d])}">`),
  `<link rel="alternate" hreflang="x-default" href="${tamAdres(EV.en)}">`].join("\n");

/** Kokte: kayitli dil ya da tarayici dili baska bir dilse o dilin ana sayfasina gec.
 *  Bot (dil basligi en) etkilenmez; altbilgiden Ingilizce secen kalir (mh_lang=en). */
const YONLENDIR = `<script>
(function () {
  var M = ${JSON.stringify(Object.fromEntries(DILLER.filter((d) => d !== "en").map((d) => [d, EV[d]])))};
  var s = location.search || "";
  // Uygulama ici pencere (?app=1, ya da bu pencerede bir rehber ?app=1 ile acildi): dili uygulama secti,
  // adres kalir (rehber ve cizelgeyle ayni kural). Diger parametreler yonlendirmede tasinir.
  if (/[?&]app=1(&|$)/.test(s)) return;
  try { if (sessionStorage.getItem("mh_app") === "1") return; } catch (e) { /* gizli mod */ }
  var l = null;
  try { l = localStorage.getItem("mh_lang"); } catch (e) { /* gizli mod */ }
  if (!l) { var n = (navigator.languages && navigator.languages[0]) || navigator.language || ""; l = String(n).slice(0, 2).toLowerCase(); }
  if (M[l]) location.replace(M[l] + s + location.hash);
})();
</script>`;

// Yapisal verideki uygulama aciklamasi (5 Eki 2026'ya kadar her dilde Ingilizceydi).
const APP_LD = {
  tr: "Kur'an hatmini halkanla paylaşmak için bir uygulama: cüzleri dağıtır, her turu takip eder. Zikirmatik, namaz vakitleri ve kıble de içinde.",
  en: "An app for a shared Quran khatam with your circle: it shares out the juz and tracks each round. With a dhikr counter, prayer times and qibla.",
  de: "Eine App für die gemeinsame Koran-Khatm im Kreis: sie verteilt die Dschuz und begleitet jede Runde. Mit Dhikr-Zähler, Gebetszeiten und Qibla.",
  fr: "Une appli pour une khatma du Coran en cercle : elle répartit les juz et suit chaque tour. Avec un compteur de dhikr, les horaires de prière et la qibla.",
  ar: "تطبيق لختمة القرآن الجماعية مع حلقتك: يوزّع الأجزاء ويتابع كل جولة. وفيه عدّاد الذكر ومواقيت الصلاة والقبلة.",
};

function jsonLd(dil) {
  const t = I18N[dil];
  const url = tamAdres(EV[dil]);
  // Sayfa dugumu bes dilde (kok dahil). FAQPage, WebPage'in alt turu: SSS sablondaki sirayla,
  // gorunen metinle BIREBIR (SSS_SIRA, sablondan okunur).
  const sayfa = {
    "@type": ["WebPage", "FAQPage"], "@id": `${url}#page`, url, name: t.title, description: t.desc,
    inLanguage: dil, isPartOf: { "@id": `${SITE}/#site` }, about: { "@id": `${SITE}/#app` },
    mainEntity: SSS_SIRA.map(([q, a]) => ({ "@type": "Question", name: T[q][dil],
      acceptedAnswer: { "@type": "Answer", text: T[a][dil] } })),
  };
  // ⚠️ aggregateRating EKLEME (gercek puanimiz yok). Fiyat "0": uygulama ucretsiz,
  // abonelik rakami buraya YAZILMAZ (App Store 3.1.2(c) reddinin dersi).
  // Organization.sameAs = altbilgideki sosyal hesaplar (SOSYAL, sablondan okunur; elle kopya yok).
  const graph = [sayfa,
    { "@type": "Organization", "@id": `${SITE}/#org`, name: "Manevi Halka", url: `${SITE}/`, logo: `${SITE}/icon.png`, email: "support@manevihalka.app",
      sameAs: SOSYAL },
    { "@type": "WebSite", "@id": `${SITE}/#site`, url: `${SITE}/`, name: "Manevi Halka", publisher: { "@id": `${SITE}/#org` }, inLanguage: DILLER },
    { "@type": "MobileApplication", "@id": `${SITE}/#app`, name: "Manevi Halka", operatingSystem: "iOS, Android",
      applicationCategory: "LifestyleApplication", url: `${SITE}/`, image: `${SITE}/icon.png`,
      description: APP_LD[dil],
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }, publisher: { "@id": `${SITE}/#org` },
      sameAs: ["https://apps.apple.com/app/manevi-halka/id6760654292", "https://play.google.com/store/apps/details?id=com.emrhnayz.spiritualcircle"] },
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).replace(/</g, "\\u003c");
}

function basBilgisi(dil) {
  const t = I18N[dil];
  const kok = dil === "en";
  const url = tamAdres(EV[dil]);
  const og = [`<meta property="og:title" content="${kacis(t.title)}">`, `<meta property="og:description" content="${kacis(t.desc)}">`,
    ...(kok ? [`<meta property="og:url" content="${SITE}">`]
      : [`<meta property="og:url" content="${url}">`, `<meta property="og:locale" content="${OG_LOCALE[dil]}">`,
         ...DILLER.filter((d) => d !== dil).map((d) => `<meta property="og:locale:alternate" content="${OG_LOCALE[d]}">`)])];
  return `${kok ? YONLENDIR + "\n" : ""}<title>${kacis(t.title)}</title>
<meta name="description" id="metaDesc" content="${kacis(t.desc)}">
<link rel="canonical" href="${url}">
${hreflang}
<!-- Bing Webmaster Tools dogrulamasi (ayni jeton /BingSiteAuth.xml'de). Silme. -->
<meta name="msvalidate.01" content="421BAE343948124460D5A58C05177ED3">
<!-- Pinterest alan adi dogrulamasi (1 Eki 2026, hesap manevihalkaapp). Silme.
     Yalniz dogrulama etiketi; Pinterest izleme etiketi (Tag) EKLENMEZ, gizlilik metni. -->
<meta name="p:domain_verify" content="8e716e9c0ae402635c20b8ea3783ebc8"/>
<!-- iOS Safari'nin kendi kurulum seridi: uygulama kuruluysa "Ac" der. -->
<meta name="apple-itunes-app" content="app-id=6760654292">
<meta name="theme-color" content="#1e4d35">
<!-- Seritteki vakitler bu alan adindan cekiliyor: el sikismayi erken baslat -->
<link rel="preconnect" href="https://ezanvakti.emushaf.net" crossorigin>
<link rel="dns-prefetch" href="https://ezanvakti.emushaf.net">
${og.join("\n")}
<meta property="og:image" content="${SITE}/og-cover-${dil}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<script type="application/ld+json">
${jsonLd(dil)}
</script>`;
}

/** WebP boyutu (VP8X / VP8 / VP8L): width/height yazilsin ki gorsel yuklenirken sayfa kaymasin. */
function webpBoyut(yol) {
  const b = readFileSync(yol);
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") hata(`WebP degil: ${yol}`);
  const t = b.toString("ascii", 12, 16);
  if (t === "VP8X") return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (t === "VP8 ") return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  if (t === "VP8L") { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
  hata(`WebP turu tanınmadı: ${yol}`);
}

/**
 * Satir gorsellerinin etrafindaki yakin plan kirpintilari (28 Eyl 2026, kullanici istegi:
 * "tek ekran resmi cok sade kalmis"). HEPSI uygulamanin GERCEK ekranlarindan, o dilde
 * cekildi; yeniden cizim, yapay ceviri yok. Metinsiz olan (Arapca satir) ortak.
 *  - fx-w: kendi koseleri saydam kesilmis parca (widget, dinleme cubugu), yalniz golge.
 *  - fx-card: dikdortgen kirpinti, beyaz kart icinde.
 * ⚠️ Meal kartı YALNIZ tr/en: DE/FR meali telifli (izin yok), Arapcada meal yok.
 * ⚠️ Arapcada orta boy ve kilit ekrani widget onizlemesi KULLANILMAZ: uygulamadaki
 *    onizlemede vakit adi ile saat bitisik ciziliyor (RTL hatasi); yerine kucuk widget.
 * Kaynak kareler: oturum cizimi (simulator MH-Promo-Reklam), kirpma betigi mkcrops.py.
 */
// Kirpintinin telefon goruntusundeki yeri (yuzde: x, y, genislik, yukseklik). Ana sayfadaki
// "ekrandan kalkan yakin plan" hareketi kirpintiyi tam bu yerden kaldirir; kaydi olmayan
// (widget, gorev karti, meal: ekranda karsiligi yok) telefonun ortasindan acilir.
// Olcum: `python3 _gen/fx-src.py` (kirpinti ya da ekran goruntusu degisince yeniden calistir).
const FX_SRC = JSON.parse(readFileSync(join(KOK, "_gen", "fx-src.json"), "utf8"));

function fxParcalari(dil) {
  const parca = (dosya, sinif) => {
    const src = dosya.startsWith("/") ? dosya : `/img/app/${dil}/${dosya}`;
    const yol = join(KOK, src.slice(1));
    if (!existsSync(yol)) hata(`${dil}: kirpinti yok: ${src}`);
    const [w, h] = webpBoyut(yol);
    const yer = (FX_SRC[dil] || {})[src.split("/").pop()];
    const veri = yer ? ` data-src="${yer.join(",")}"` : "";
    return `<img class="fx ${sinif}" src="${src}" alt="" width="${w}" height="${h}"${veri} loading="lazy" decoding="async">`;
  };
  const ar = dil === "ar";
  return {
    // 21 Kas 2026: Kur'an, Namaz ve Halka satirlari 2.1.0 ekranlarinda; parcalar ayni ham karelerden (mkimg21.py).
    // Kur'an: ayet penceresi (Sahneyle dinle, Kelime kelime calis, Defterime ekle, Video olarak paylas) ve dinleme cubugu.
    fxQuran: parca("fx-q2-panel.webp", "fx-card p-qa") + parca("fx-q2-bar.webp", "fx-card p-qb"),
    // Namaz: widget'lar (onceki gibi) ve Kaza namazlarim karti
    fxVakit: ar
      ? parca("fx-w-small.webp", "fx-w fx-sq p-vs") + parca("fx-n-kaza.webp", "fx-card p-vk")
      : parca("fx-w-med.webp", "fx-w p-va") + parca("fx-n-kaza.webp", "fx-card p-vk") + parca("fx-w-lock.webp", "fx-w p-vc"),
    // Halka: sonraki tur karti (ekrandaki yerinden kalkar) ve dagitim ekranindaki kisi kisi paylar
    fxHalka: parca("fx-h2-next.webp", "fx-card p-ha") + parca("fx-h2-tur.webp", "fx-card p-hb"),
    fxAmel: parca("fx-a-today.webp", "fx-card p-aa") + parca("fx-a-hadis.webp", "fx-w p-ab"),
  };
}

// "Kendi zevkine göre" seridi: her dilde uygulamanin o dildeki gercek ekrani
// (gecici premium deneme hesabiyla cekildi, 4 Eki 2026). Ad ve aciklama
// uygulamadaki adlarla birebir (backdrop.*, theme.*, counter.modeStrand).
// Sayfa rengi, widget gorunumleri ve tesbih kipi ucretsiz; Premium notu yalniz
// zemin ve temalari soyler, bu yuzden dogru kalir.
const KIS = [
  { img: "ufuk",
    tag: { tr: "Zemin", en: "Backdrop", de: "Hintergrund", fr: "Fond", ar: "الخلفية" },
    ad: { tr: "Ufuk", en: "Horizon", de: "Horizont", fr: "Horizon", ar: "الأفق" },
    acik: { tr: "Güneş ve ay, şehrinin namaz vakitlerine göre doğar ve batar.",
      en: "The sun and moon rise and set with your city's prayer times.",
      de: "Sonne und Mond gehen mit den Gebetszeiten deiner Stadt auf und unter.",
      fr: "Le soleil et la lune se lèvent et se couchent au rythme des heures de prière de ta ville.",
      ar: "تشرق الشمس ويطلع القمر ويغيبان مع مواقيت الصلاة في مدينتك." } },
  { img: "kandil",
    tag: { tr: "Zemin · Koyu tema", en: "Backdrop · Dark theme", de: "Hintergrund · Dunkles Design", fr: "Fond · Thème sombre", ar: "الخلفية · السمة الداكنة" },
    ad: { tr: "Kandiller", en: "Lamps", de: "Lampen", fr: "Lampes", ar: "القناديل" },
    acik: { tr: "Gece okuyanlar için kandil ışığında yumuşak bir karanlık.",
      en: "A soft darkness lit by lamps, for those who read at night.",
      de: "Ein sanftes Dunkel im Lampenlicht, für alle, die nachts lesen.",
      fr: "Une obscurité douce à la lueur des lampes, pour qui lit la nuit.",
      ar: "عتمة هادئة على ضوء القناديل لمن يقرأ ليلًا." } },
  { img: "revzen",
    tag: { tr: "Zemin · Safran", en: "Backdrop · Saffron", de: "Hintergrund · Safran", fr: "Fond · Safran", ar: "الخلفية · زعفراني" },
    ad: { tr: "Revzen", en: "Window Light", de: "Fensterlicht", fr: "Vitrail", ar: "القمرية" },
    acik: { tr: "Cami penceresinden süzülen ışık, rengi gün boyu güneşi izler.",
      en: "Light through a mosque window, its color following the sun all day.",
      de: "Licht durch ein Moscheefenster, dessen Farbe den ganzen Tag der Sonne folgt.",
      fr: "La lumière d'une fenêtre de mosquée, dont la couleur suit le soleil toute la journée.",
      ar: "ضوء يتسلّل من نافذة مسجد، ولونه يتبع الشمس طوال اليوم." } },
  { img: "ebru",
    tag: { tr: "Zemin · Mürdüm", en: "Backdrop · Plum", de: "Hintergrund · Pflaume", fr: "Fond · Prune", ar: "الخلفية · برقوقي" },
    ad: { tr: "Ebru", en: "Marbling", de: "Marmorpapier", fr: "Marbrure", ar: "إبرو" },
    acik: { tr: "İnce damarlı ebru kâğıdı, köşelerden sayfaya süzülür.",
      en: "Fine-veined marbled paper, drifting in from the corners.",
      de: "Fein geädertes Marmorpapier, das von den Ecken hereinfließt.",
      fr: "Un papier marbré aux fines veines, qui s'invite par les coins.",
      ar: "ورق إبرو بعروق دقيقة ينساب من الزوايا." } },
  { img: "gorunum",
    tag: { tr: "Ayarlar", en: "Settings", de: "Einstellungen", fr: "Réglages", ar: "الإعدادات" },
    ad: { tr: "Görünüm", en: "Appearance", de: "Erscheinungsbild", fr: "Apparence", ar: "المظهر" },
    acik: { tr: "Zemin, tema ve renk aynı yerden seçilir, değişiklik anında görünür.",
      en: "Backdrop, theme and color in one place, and every change shows at once.",
      de: "Hintergrund, Design und Farbe an einem Ort, jede Änderung siehst du sofort.",
      fr: "Fond, thème et couleur au même endroit, et chaque changement s'affiche aussitôt.",
      ar: "الخلفية والسمة واللون في مكان واحد، ويظهر كل تغيير فورًا." } },
  { img: "anaekran",
    tag: { tr: "Ana ekran", en: "Home screen", de: "Startbildschirm", fr: "Écran d'accueil", ar: "الشاشة الرئيسية" },
    ad: { tr: "Widget'lar", en: "Widgets", de: "Widgets", fr: "Widgets", ar: "الأدوات" },
    acik: { tr: "Bugünkü görevin, Hicri gün ve namaz vakti bir arada. Vakit widget'ının sekiz görünümü var.",
      en: "Your task for today, the Hijri date and prayer times together. The prayer widget comes in eight looks.",
      de: "Deine heutige Aufgabe, das Hidschri-Datum und die Gebetszeit beisammen. Das Gebetszeiten-Widget gibt es in acht Ansichten.",
      fr: "Ta tâche du jour, la date hégirienne et l'heure de prière réunies. Le widget de prière existe en huit apparences.",
      ar: "مهمتك اليوم والتاريخ الهجري ووقت الصلاة معًا. ولأداة الصلاة ثمانية أشكال." } },
  { img: "kilit",
    tag: { tr: "Kilit ekranı", en: "Lock screen", de: "Sperrbildschirm", fr: "Écran verrouillé", ar: "شاشة القفل" },
    ad: { tr: "Bir bakışta vakit", en: "Prayer time at a glance", de: "Gebetszeit auf einen Blick", fr: "L'heure de prière d'un coup d'œil", ar: "الوقت بنظرة واحدة" },
    acik: { tr: "Telefonu açmadan vaktin çıkmasına kalan süreyi ve sıradaki vakitleri gör.",
      en: "See how long the current prayer time has left and what comes next, without unlocking your phone.",
      de: "Sieh, wie lange die aktuelle Gebetszeit noch dauert und was als Nächstes kommt, ohne das Telefon zu entsperren.",
      fr: "Vois le temps restant de la prière en cours et les suivantes, sans déverrouiller ton téléphone.",
      ar: "اعرف ما تبقّى من وقت الصلاة الحالية وما يليها دون فتح هاتفك." } },
  { img: "sayfa",
    tag: { tr: "Okurken", en: "While reading", de: "Beim Lesen", fr: "En lisant", ar: "أثناء القراءة" },
    ad: { tr: "Sayfa rengi", en: "Page color", de: "Seitenfarbe", fr: "Couleur de page", ar: "لون الصفحة" },
    acik: { tr: "Kur'an'ı beyazdan sepyaya, geceye kadar beş sayfa tonunda oku.",
      en: "Read the Quran in five page tones, from white through sepia to night.",
      de: "Lies den Koran in fünf Seitentönen, von Weiß über Sepia bis Nacht.",
      fr: "Lis le Coran dans cinq tons de page, du blanc au sépia jusqu'à la nuit.",
      ar: "اقرأ القرآن بخمس درجات للصفحة، من الأبيض إلى البني الفاتح حتى الليلي." } },
  { img: "tesbih",
    tag: { tr: "Zikir", en: "Dhikr", de: "Dhikr", fr: "Dhikr", ar: "الذكر" },
    ad: { tr: "Tesbih", en: "Prayer beads", de: "Gebetskette", fr: "Chapelet", ar: "المسبحة" },
    acik: { tr: "Sayacı rakamlı bir halka ya da akan tesbih taneleri olarak kullan.",
      en: "Use the counter as a numbered ring or as flowing prayer beads.",
      de: "Nutze den Zähler als Ring mit Zahl oder als fließende Gebetskette.",
      fr: "Utilise le compteur en anneau chiffré ou en chapelet aux grains qui défilent.",
      ar: "استخدم العدّاد حلقةً برقم كبير أو مسبحةً بحبّات متحركة." } },
];

// Sergide telefonun govdesi: on yuzun arkasinda 4 ince katman (home.src.html .kb). Bellek icin az tutuldu.
const KATMAN = Array.from({ length: 4 }, (_, i) => `<i class="kb" style="--i:${i + 1}"></i>`).join("");

function kisSeridi(dil) {
  return KIS.map((k) => {
    const yol = join(KOK, "img", "app", dil, `kis-${k.img}.webp`);
    if (!existsSync(yol)) hata(`${dil}: kisisellestirme gorseli yok: kis-${k.img}.webp`);
    const [w, h] = webpBoyut(yol);
    for (const a of ["tag", "ad", "acik"]) if (k[a][dil] == null) hata(`KIS.${k.img}.${a}.${dil} yok`);
    return `<li class="kis-card"><figure class="phone"><img src="/img/app/${dil}/kis-${k.img}.webp" alt="${kacis(k.ad[dil])}" width="${w}" height="${h}" loading="lazy" decoding="async">${KATMAN}</figure>`
      + `<div class="kis-cap"><span class="kis-tag">${kacis(k.tag[dil])}</span><b>${kacis(k.ad[dil])}</b><span>${kacis(k.acik[dil])}</span></div></li>`;
  }).join("\n        ");
}

let sablon = readFileSync(join(KOK, "_gen", "home.src.html"), "utf8");
// SSS'ye "Halka kurmak ücretsiz mi?" (5 Eki 2026). Sablonda henuz yoksa q1'in hemen altina eklenir;
// sablona {{qCircle}} satiri yazilinca bu ek kendiliginden devre disi kalir.
if (!sablon.includes("{{qCircle}}")) {
  const m = sablon.match(/^([ \t]*)(<details[^>]*><summary>\{\{q1\}\}<\/summary><p>\{\{a1\}\}<\/p><\/details>)[ \t]*$/m);
  if (!m) hata("sablonda SSS q1 satiri bulunamadi, qCircle eklenemedi");
  sablon = sablon.replace(m[0], `${m[0]}\n${m[1]}<details><summary>{{qCircle}}</summary><p>{{aCircle}}</p></details>`);
}
// Yapisal veri sablondaki gorunen SSS sirasini izler.
const SSS_SIRA = [...sablon.matchAll(/<summary>\{\{(\w+)\}\}<\/summary><p>\{\{(\w+)\}\}<\/p>/g)].map((x) => [x[1], x[2]]);
if (SSS_SIRA.length < 6) hata(`sablonda SSS sorusu eksik (${SSS_SIRA.length})`);
for (const [q, a] of SSS_SIRA) if (!T[q] || !T[a]) hata(`SSS anahtari T'de yok: ${q}/${a}`);
// Organization.sameAs: altbilgideki sosyal hesap baglantilari, sablondan.
const SOSYAL = (() => {
  const blok = sablon.match(/<div class="social-icons">([\s\S]*?)<\/div>/);
  if (!blok) hata("sablonda social-icons blogu yok (Organization.sameAs)");
  const adresler = [...blok[1].matchAll(/<a href="(https:\/\/[^"]+)"/g)].map((x) => x[1]);
  if (adresler.length < 3) hata(`altbilgide sosyal baglanti az (${adresler.length})`);
  return adresler;
})();
// Sayfa gecisi parcasi (_gen/nav-loader.html) uc bolum: HEAD (ilk kare isareti), BODY (katman, <body> basi), JS (sonda).
function navParcalari(metin) {
  const m = metin.match(/<!--@@HEAD-->([\s\S]*?)<!--@@BODY-->([\s\S]*?)<!--@@JS-->([\s\S]*)$/);
  if (!m) throw new Error("nav-loader.html: @@HEAD/@@BODY/@@JS bolumleri yok");
  return { HEAD: m[1].trim(), BODY: m[2].trim(), JS: m[3].trim() };
}
// Sayfa gecisi, vakit sayfasiyla ortak.
const NAV = navParcalari(readFileSync(join(KOK, "_gen", "nav-loader.html"), "utf8"));
const VERI_ISARETI = "/*__DATA__*/null";
if (sablon.split(VERI_ISARETI).length !== 2) hata("sablonda veri isareti tek olmali");
if (sablon.split("<!--__HEAD__-->").length !== 2) hata("sablonda bas bilgisi isareti tek olmali");

function sayfa(dil) {
  const s = sozlukFor(dil);
  const ham = {
    lang: dil, dir: dil === "ar" ? "rtl" : "ltr",
    homeHref: EV[dil], vakitHref: VAKIT[dil], readingHref: ORTAK_URL[dil], imgBase: `/img/app/${dil}/`, guidesHref: REHBER[dil], guideHatimHref: rehberAdresi("hatim", dil), guideTekHref: rehberAdresi("tek", dil),
    iosHref: IOS, androidHero: play("hero", dil), androidClose: play("close", dil),
    privacyHref: politika("privacy", dil), termsHref: politika("terms", dil), deleteHref: politika("account-delete", dil),
    langsHtml: DILLER.map((d) => `<a href="${EV[d]}" hreflang="${d}" lang="${d}"${d === dil ? ' aria-current="page"' : ""}>${DIL_ADI[d]}</a>`).join(""),
    langMenuHtml: DILLER.map((d) => `<a href="${EV[d]}" hreflang="${d}" lang="${d}"${d === dil ? ' aria-current="page"' : ""}>${DIL_ADI[d]}</a>`).join(""),
    langCode: dil.toUpperCase(),
    ...fxParcalari(dil),
    kisHtml: kisSeridi(dil),
    // Serit kartlari HTML'de hazir ve yerleri CSS'te: betik gelince kayma olmaz.
    stripHtml: seritHtml(dil),
    nwHtml: yeniHtml(dil),
    // 21 Kas 2026: DE/FR ekran goruntulerinde de Itani'nin Ingilizce meali gorunuyor (uygulamada DE/FR meal gecici olarak Ingilizce): atif o dillerde de.
    creditHtml: ["en", "de", "fr"].includes(dil) ? `${kacis(s.itaniCredit)} <span dir="ltr"><a href="https://www.clearquran.com" target="_blank" rel="noopener">ClearQuran.com</a> (<a href="https://creativecommons.org/licenses/by-nd/4.0/" target="_blank" rel="noopener">CC BY-ND 4.0</a>)</span>` : "",
  };
  const eksik = new Set();
  let cikti = sablon.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (k in ham) return ham[k];
    if (k in s) return kacis(s[k]);
    eksik.add(k); return "";
  });
  if (eksik.size) hata(`${dil}: sablonda karsiligi olmayan anahtar(lar): ${[...eksik].join(", ")}`);
  cikti = cikti.replace(VERI_ISARETI, JSON.stringify(veri(dil)).replace(/</g, "\\u003c"));
  cikti = cikti.replace("<!--__HEAD__-->", basBilgisi(dil));
  for (const [isaret, parca] of [["<!--__NAVLOAD_HEAD__-->", NAV.HEAD], ["<!--__NAVLOAD_BODY__-->", NAV.BODY], ["<!--__NAVLOAD_JS__-->", NAV.JS]]) {
    if (cikti.split(isaret).length !== 2) hata(`sablonda ${isaret} tek olmali`);
    cikti = cikti.replace(isaret, () => parca);
  }
  cikti = cikti.replace("<!DOCTYPE html>", `<!DOCTYPE html>
<!-- ⚠️ BU DOSYA URETILMISTIR, ELLE DUZENLEME. Kaynak: _gen/home.src.html + _gen/site-i18n.js
     Uretici: node _gen/build-home.mjs · dil=${dil} -->`);
  if (/\{\{\w+\}\}/.test(cikti)) hata(`${dil}: doldurulmamis yer tutucu kaldi`);
  if (/—/.test(cikti.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, ""))) hata(`${dil}: uzun tire (ayrac) var`);
  if (cikti.startsWith("---")) hata("cikti front matter ile basliyor (Jekyll isler)");
  return cikti;
}

/** Eski adres: ana sayfaya yonlendiren noindex kabuk (paylasilmis baglanti bozulmasin). */
const kabuk = (hedef, neden) => `<!DOCTYPE html>
<!-- ${neden} Uretici: node _gen/build-home.mjs -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex">
<link rel="canonical" href="${tamAdres(hedef)}">
<meta http-equiv="refresh" content="0; url=${hedef}">
<title>Manevi Halka</title>
<script>location.replace(${JSON.stringify(hedef)} + location.hash);</script>
</head>
<body><p><a href="${hedef}">manevihalka.app</a></p></body>
</html>
`;

// ─── uret ───────────────────────────────────────────────────────────────────
if (existsSync(join(KOK, "en", "index.html"))) hata("en/index.html VAR. Kok zaten Ingilizce, /en/ kopya sayfa yaratir.");
const ciktilar = new Map();
for (const d of DILLER) ciktilar.set(join(KOK, dosyaYolu(EV[d])), sayfa(d));
for (const d of DILLER) ciktilar.set(join(KOK, dosyaYolu(ESKI_APP[d])), kabuk(EV[d], "/app/ 28 Eyl 2026'da birkac saat uygulama tanitim sayfasiydi; tanitim ana sayfa oldu."));
ciktilar.set(join(KOK, "yeni", "index.html"), kabuk("/", "/yeni/ 28 Eyl 2026'da yeni tasarimin onizleme adresiydi."));

// Politika sayfalarinin Jekyll duzeni (_layouts/default.html) icin ortak kabuk metinleri.
// Tek kaynak bu dosyanin sozlukleri + site-i18n.js; duzen Liquid ile site.data.chrome'dan okur.
// ⚠️ _data/chrome.json ELLE DUZENLENMEZ.
{
  const APP = { tr: "Uygulama", en: "The app", de: "Die App", fr: "L'application", ar: "التطبيق" };
  const veri = {};
  for (const d of DILLER) {
    const k = kutu.I18N[d];
    veri[d] = {
      dir: d === "ar" ? "rtl" : "ltr", home: EV[d], times: VAKIT[d],
      app: APP[d], navTimes: T.navTimes[d], reading: k.ccTitle, readingHref: ORTAK_URL[d], sections: T.navAria[d], language: T.langAria[d],
      guides: T.navGuides[d], guidesHref: REHBER[d],
      toDark: T.themeToDark[d], toLight: T.themeToLight[d],
      socialTitle: T.socialTitle[d], socialText: T.socialText[d],
      privacy: k.privacy, terms: k.terms, deleteAcc: k.deleteAcc, contact: k.contact,
    };
    for (const [ad, deger] of Object.entries(veri[d])) if (deger == null) hata(`chrome.${d}.${ad} yok`);
  }
  ciktilar.set(join(KOK, "_data", "chrome.json"), JSON.stringify(veri, null, 2) + "\n");
}

const HARITA = join(KOK, "sitemap.xml");
const lastmodsuz = (x) => x.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, "");
{
  const sm = readFileSync(HARITA, "utf8");
  const bas = "<!-- MH:LOCALES:BASLA -->", bit = "<!-- MH:LOCALES:BITIS -->";
  const i = sm.indexOf(bas), j = sm.indexOf(bit);
  if (i < 0 || j < 0) hata("sitemap.xml'de MH:LOCALES isaretleri yok");
  const bugun = new Date().toISOString().slice(0, 10);
  const satir = DILLER.filter((d) => d !== "en").map((d) => `  <url>\n    <loc>${tamAdres(EV[d])}</loc>\n    <lastmod>${bugun}</lastmod>\n  </url>`).join("\n");
  ciktilar.set(HARITA, sm.slice(0, i + bas.length) + "\n" + satir + "\n  " + sm.slice(j));
}

const sayfaDegisti = DILLER.some((d) => {
  const p = join(KOK, dosyaYolu(EV[d]));
  return !existsSync(p) || readFileSync(p, "utf8") !== ciktilar.get(p);
});
let fark = 0;
for (const [p, icerik] of ciktilar) {
  const mevcut = existsSync(p) ? readFileSync(p, "utf8") : null;
  const ayni = p === HARITA ? mevcut != null && !sayfaDegisti && lastmodsuz(mevcut) === lastmodsuz(icerik) : mevcut === icerik;
  if (ayni) continue;
  fark++;
  const ad = p.replace(KOK + "/", "");
  if (KONTROL) { console.error("fark: " + ad); continue; }
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, icerik);
  console.log("yazildi: " + ad);
}
if (KONTROL && fark) { console.error(`${fark} dosya guncel degil: node _gen/build-home.mjs`); process.exit(1); }
if (!fark) console.log("zaten guncel");
