#!/usr/bin/env node
/**
 * Uygulama tanitim sayfasi ureticisi: _gen/app.src.html -> 5 dil
 *   /app/ (Ingilizce taban), /tr/app/, /de/app/, /fr/app/, /ar/app/
 *
 * Her dil AYRI adreste ve metni STATIK (arama motoru her dili ayri okur).
 * Magaza dugmesindeki "Indir", politika baglantilari, Iletisim, Itani atfi ve
 * "Ortak Okuma" adi ortak sozlukten (_gen/site-i18n.js) SOKULUR, kopyalanmaz
 * (ana sayfa ureticisiyle ayni kaynak). Sayfaya ozgu metinler asagidaki T'de.
 *
 * Giristeki halkali vitrin (7 kart) dile gore D.screens'ten beslenir. Halkalardaki
 * saat, sehir, isim ve sayilar o dilin ekran goruntusuyle BIREBIR AYNIDIR
 * (img/app/<dil>/). Ekran goruntuleri yenilenirse DAY ve SCREENS de guncellenir.
 *
 * Kurallar: Turkce "sen", Almanca "du", Fransizca "tu"; terimler uygulamayla
 * ayni (DE Chatma/Dschuz, FR khatma/juz, EN khatm/juz; Rehber Modu =
 * Mentor Mode). Ayrac olarak uzun tire YOK. Ayet meali: TR Elmalili, EN Itani
 * harfi harfine (CC BY-ND, atif altbilgide), DE/FR meal alintilanmaz, anlam
 * "sinngemaess / en substance" diye isaretli (/yeni/ ile ayni karar).
 *
 * ⚠️ Sitede "Cevsen" mumkun oldugunca GECMEZ (kullanici karari, 28 Eyl 2026):
 * uygulamada duruyor, indiren gorur; sitenin genel kitlesine one cikarilmaz.
 * Sayfalar ana sayfadan baglanir ve site haritasindadir (sitemap.xml, elle).
 *
 * KULLANIM:
 *   node _gen/build-app.mjs           uretir ve yazar
 *   node _gen/build-app.mjs --check   uretir, yazmaz, fark varsa cikis 1
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const SITE = "https://manevihalka.app";
const KONTROL = process.argv.includes("--check");
const DILLER = ["tr", "en", "de", "fr", "ar"];
const YOL = { en: "app/", tr: "tr/app/", de: "de/app/", fr: "fr/app/", ar: "ar/app/" };
const hata = (m) => { console.error("HATA: " + m); process.exit(1); };

// ── Ortak sozlukten sokulan metinler (_gen/site-i18n.js, ana sayfayla ayni kaynak)
const kutu = {};
vm.createContext(kutu);
vm.runInContext(readFileSync(join(KOK, "_gen", "site-i18n.js"), "utf8"), kutu);
if (!kutu.I18N) hata("_gen/site-i18n.js I18N tanimlamiyor");
const ORTAK = ["get", "privacy", "terms", "deleteAcc", "contact", "itaniCredit", "ccTitle"];

// ── Sayfaya ozgu metinler ───────────────────────────────────────────────────
const T = {
  title: { tr: "Manevi Halka: tek başına da, birlikte de", en: "Manevi Halka: on your own, and together", de: "Manevi Halka: allein und gemeinsam",
    fr: "Manevi Halka : seul et ensemble", ar: "Manevi Halka: بمفردك ومعًا" },
  desc: { tr: "Kur'an, namaz vakitleri, zikir, ezber ve kitaplarını tek uygulamada sürdür. Dilersen sevdiklerinle hatim ve zikir halkası kur. Reklamsız, 5 dilde.",
    en: "Keep up your Quran, prayer times, dhikr, memorisation and reading in one app. And if you like, start a khatm or dhikr circle with your loved ones. Ad-free, in 5 languages.",
    de: "Koran, Gebetszeiten, Dhikr, Auswendiglernen und Lesen in einer App. Und wenn du möchtest, gründe mit deinen Liebsten einen Chatma- oder Dhikr-Kreis. Werbefrei, in 5 Sprachen.",
    fr: "Le Coran, les horaires de prière, le dhikr, la mémorisation et la lecture dans une seule appli. Et si tu veux, crée un cercle de khatma ou de dhikr avec tes proches. Sans publicité, en 5 langues.",
    ar: "القرآن ومواقيت الصلاة والذكر والحفظ والقراءة في تطبيق واحد. وإن شئت، أنشئ حلقة ختمة أو ذكر مع أحبّتك. بلا إعلانات وبخمس لغات." },
  navAria: { tr: "Bölümler", en: "Sections", de: "Bereiche", fr: "Sections", ar: "الأقسام" },
  navSolo: { tr: "Tek başına", en: "On your own", de: "Allein", fr: "Seul", ar: "بمفردك" },
  navTogether: { tr: "Birlikte", en: "Together", de: "Gemeinsam", fr: "Ensemble", ar: "معًا" },
  navFaq: { tr: "Sık sorulanlar", en: "FAQ", de: "Häufige Fragen", fr: "Questions fréquentes", ar: "الأسئلة الشائعة" },
  getApp: { tr: "İndir", en: "Get the app", de: "App laden", fr: "Télécharger", ar: "حمّل التطبيق" },
  themeToDark: { tr: "Koyu temaya geç", en: "Switch to dark theme", de: "Zum dunklen Design wechseln", fr: "Passer au thème sombre", ar: "التبديل إلى السمة الداكنة" },
  themeToLight: { tr: "Açık temaya geç", en: "Switch to light theme", de: "Zum hellen Design wechseln", fr: "Passer au thème clair", ar: "التبديل إلى السمة الفاتحة" },
  prevAria: { tr: "Önceki ekran", en: "Previous screen", de: "Vorheriger Bildschirm", fr: "Écran précédent", ar: "الشاشة السابقة" },
  nextAria: { tr: "Sonraki ekran", en: "Next screen", de: "Nächster Bildschirm", fr: "Écran suivant", ar: "الشاشة التالية" },
  tabsAria: { tr: "Ekranlar", en: "Screens", de: "Bildschirme", fr: "Écrans", ar: "الشاشات" },
  noscript: { tr: "Uygulamanın ekranlarını görmek için JavaScript'i aç.", en: "Turn on JavaScript to see the app's screens.",
    de: "Aktiviere JavaScript, um die Bildschirme der App zu sehen.", fr: "Active JavaScript pour voir les écrans de l'appli.", ar: "فعّل JavaScript لرؤية شاشات التطبيق." },
  langAria: { tr: "Dil", en: "Language", de: "Sprache", fr: "Langue", ar: "اللغة" },

  eyebrow: { tr: "Günlük ibadetlerin için bir yol arkadaşı", en: "A companion for your daily worship", de: "Ein Begleiter für deine tägliche Andacht",
    fr: "Un compagnon pour ta pratique quotidienne", ar: "رفيق لعباداتك اليومية" },
  h1a: { tr: "Tek başına da,", en: "On your own,", de: "Allein", fr: "Seul,", ar: "بمفردك،" },
  h1b: { tr: "birlikte de.", en: "and together.", de: "und gemeinsam.", fr: "et ensemble.", ar: "ومعًا أيضًا." },
  lead: { tr: "Kur'an, namaz, zikir, ezber ve okumalarını günlük hayatında sürdür. Dilersen sevdiklerinle bir halka kurup güzel amellerde buluş.",
    en: "Keep up your Quran, prayers, dhikr, memorisation and reading in daily life. And if you like, start a circle with your loved ones and meet in good deeds.",
    de: "Bleib im Alltag bei Koran, Gebet, Dhikr, Auswendiglernen und Lesen. Und wenn du möchtest, gründe mit deinen Liebsten einen Kreis und kommt in guten Taten zusammen.",
    fr: "Garde au quotidien le Coran, la prière, le dhikr, la mémorisation et la lecture. Et si tu veux, crée un cercle avec tes proches pour vous retrouver dans les bonnes œuvres.",
    ar: "حافظ في يومك على القرآن والصلاة والذكر والحفظ والقراءة. وإن شئت، أنشئ حلقة مع أحبّتك لتجتمعوا على الأعمال الصالحة." },
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
  verseMeal: { tr: "İyilik ve takva üzerinde yardımlaşın, günah ve düşmanlık üzerinde yardımlaşmayın.",
    en: "And cooperate with one another in virtuous conduct and conscience, and do not cooperate with one another in sin and hostility.",
    de: "Der Koran ruft dazu auf, einander in Güte und Gottesfurcht beizustehen und einander nicht in Sünde und Feindschaft zu helfen.",
    fr: "Le Coran appelle à s'entraider dans le bien et la piété, et à ne pas s'entraider dans le péché et l'hostilité.",
    ar: "" },
  verseRef: { tr: "Mâide 5:2 (bir bölümü)", en: "Al-Ma'idah 5:2 (excerpt)", de: "Sure al-Ma'ida 5:2, sinngemäß",
    fr: "Sourate al-Ma'ida 5:2, en substance", ar: "المائدة 5:2 (جزء من الآية)" },
  purpose: { tr: "Manevi Halka, bu yardımlaşmayı kolaylaştırmak için kuruldu.", en: "Manevi Halka was built to make this cooperation easier.",
    de: "Manevi Halka wurde geschaffen, um diese gegenseitige Hilfe leichter zu machen.", fr: "Manevi Halka a été créé pour faciliter cette entraide.",
    ar: "أُسِّس Manevi Halka لتيسير هذا التعاون." },

  soloKicker: { tr: "Tek başına", en: "On your own", de: "Allein", fr: "Seul", ar: "بمفردك" },
  soloTitle: { tr: "Günlük ibadetlerine eşlik eder", en: "A companion to your daily worship", de: "Begleitet deine tägliche Andacht",
    fr: "Accompagne ta pratique quotidienne", ar: "يرافق عباداتك اليومية" },
  soloText: { tr: "Manevi Halka yalnız birlikte yapılan okumalar için değil, her günün ibadeti için de yanında.",
    en: "Manevi Halka is not only for reading together; it is with you in each day's worship.",
    de: "Manevi Halka ist nicht nur für gemeinsames Lesen da, sondern begleitet dich auch in der Andacht jedes Tages.",
    fr: "Manevi Halka n'est pas seulement pour lire ensemble : il t'accompagne aussi dans l'adoration de chaque jour.",
    ar: "لا يقتصر Manevi Halka على القراءة الجماعية، بل يرافقك في عبادة كل يوم." },
  area1t: { tr: "Kur'an", en: "Quran", de: "Koran", fr: "Coran", ar: "القرآن" },
  area1d: { tr: "Türkiye mushafı, meal ve üç kâriden sesli tilavet.", en: "The Mushaf, translation and recitation by three reciters.",
    de: "Der Mushaf, Übersetzung und Rezitation von drei Rezitatoren.", fr: "Le Mushaf, la traduction et la récitation de trois récitateurs.",
    ar: "المصحف مع تلاوة بأصوات ثلاثة قرّاء." },
  area2t: { tr: "Namaz", en: "Prayer", de: "Gebet", fr: "Prière", ar: "الصلاة" },
  area2d: { tr: "Vakitler, bildirimler, widget'lar, kıble ve dini günler.", en: "Prayer times, notifications, widgets, qibla and religious days.",
    de: "Gebetszeiten, Benachrichtigungen, Widgets, Qibla und religiöse Tage.", fr: "Horaires, notifications, widgets, qibla et jours religieux.",
    ar: "المواقيت والتنبيهات والأدوات والقبلة والأيام الدينية." },
  area3t: { tr: "Zikir ve dua", en: "Dhikr and dua", de: "Dhikr und Bittgebet", fr: "Dhikr et invocation", ar: "الذكر والدعاء" },
  area3d: { tr: "Zikirmatik, tesbihat, virdler ve Peygamber duaları.", en: "Dhikr counter, tasbihat, awrad and prophetic duas.",
    de: "Dhikr-Zähler, Tasbihat, Awrad und prophetische Bittgebete.", fr: "Compteur de dhikr, tasbihat, awrad et invocations prophétiques.",
    ar: "عداد الذكر والتسبيحات والأوراد والأدعية النبوية." },
  area4t: { tr: "Ezber", en: "Memorisation", de: "Auswendiglernen", fr: "Mémorisation", ar: "الحفظ" },
  area4d: { tr: "Sure ve ayet ezberi, aralıklı tekrarla.", en: "Memorise surahs and verses with spaced review.",
    de: "Suren und Verse lernen, mit Wiederholung in Abständen.", fr: "Mémorise sourates et versets avec des révisions espacées.",
    ar: "حفظ السور والآيات بمراجعة متباعدة." },
  area5t: { tr: "Kitaplık", en: "Bookshelf", de: "Bücherregal", fr: "Bibliothèque de lecture", ar: "رف الكتب" },
  area5d: { tr: "Kendi PDF ve EPUB kitapların, notların.", en: "Your own PDF and EPUB books and notes.",
    de: "Deine eigenen PDF- und EPUB-Bücher und Notizen.", fr: "Tes propres livres PDF et EPUB, et tes notes.", ar: "كتبك بصيغة PDF وEPUB وملاحظاتك." },
  area6t: { tr: "Yolculuğum", en: "My Journey", de: "Mein Weg", fr: "Mon parcours", ar: "رحلتي" },
  area6d: { tr: "Kendi yolunu hatırla, kıyas olmadan.", en: "Look back on your own path, without comparison.",
    de: "Blick auf deinen eigenen Weg zurück, ohne Vergleich.", fr: "Revois ton propre chemin, sans comparaison.", ar: "تذكّر طريقك الخاص، بلا مقارنة." },

  qKicker: { tr: "Kur'an", en: "Quran", de: "Koran", fr: "Coran", ar: "القرآن" },
  qTitle: { tr: "Oku, dinle, çalış.", en: "Read, listen, memorise.", de: "Lesen, hören, lernen.", fr: "Lis, écoute, mémorise.", ar: "اقرأ واستمع واحفظ." },
  qText: { tr: "Kur'an okumalarını kendi düzeninde sürdür. Dinlerken okunan kelime işaretlenir.",
    en: "Keep up your Quran reading at your own pace. As you listen, each word is highlighted.",
    de: "Lies den Koran in deinem eigenen Rhythmus. Beim Zuhören wird jedes Wort markiert.",
    fr: "Lis le Coran à ton propre rythme. Pendant l'écoute, chaque mot est surligné.",
    ar: "داوم على قراءة القرآن بإيقاعك. وأثناء الاستماع تُظلَّل كل كلمة." },
  qT1: { tr: "Üç kâriden kelime takipli sesli tilavet", en: "Recitation by three reciters, followed word by word",
    de: "Rezitation von drei Rezitatoren, Wort für Wort mitverfolgt", fr: "Récitation par trois récitateurs, suivie mot à mot",
    ar: "تلاوة بأصوات ثلاثة قرّاء مع تتبّع الكلمات" },
  qT2: { tr: "Ezber çalışma kipi, notlar ve yer imleri", en: "A memorisation mode, notes and bookmarks",
    de: "Lernmodus, Notizen und Lesezeichen", fr: "Un mode mémorisation, des notes et des signets", ar: "وضع للحفظ وملاحظات وعلامات" },
  qT3: { tr: "Sure ya da cüz indirip çevrimdışı dinleme", en: "Download a surah or juz to listen offline",
    de: "Suren oder Dschuz herunterladen und offline hören", fr: "Télécharge une sourate ou un juz pour écouter hors ligne",
    ar: "نزّل سورة أو جزءًا واستمع دون اتصال" },
  qNote: { tr: "Mülk · 2. ayet okunuyor", en: "Al-Mulk · verse 2 playing", de: "Al-Mulk · Vers 2 läuft", fr: "Al-Mulk · verset 2 en cours",
    ar: "الملك · الآية 2 قيد التلاوة" },
  pKicker: { tr: "Namaz", en: "Prayer", de: "Gebet", fr: "Prière", ar: "الصلاة" },
  pTitle: { tr: "Gününün içinde.", en: "Woven into your day.", de: "Mitten in deinem Tag.", fr: "Au fil de ta journée.", ar: "في قلب يومك." },
  pText: { tr: "106 ülkede namaz vakitleri ve kıble. Vakit girince haberin olur.",
    en: "Prayer times and qibla in 106 countries. You'll know when each time begins.",
    de: "Gebetszeiten und Qibla in 106 Ländern. Du erfährst, wann jede Gebetszeit beginnt.",
    fr: "Horaires de prière et qibla dans 106 pays. Tu sais quand chaque prière commence.",
    ar: "مواقيت الصلاة والقبلة في 106 دول. تعرف متى يدخل كل وقت." },
  pT1: { tr: "Vakit girişinde ve çıkmadan önce bildirim", en: "A notification when each time begins and before it ends",
    de: "Benachrichtigung zu Beginn jeder Gebetszeit und vor ihrem Ende", fr: "Une notification au début de chaque prière et avant sa fin",
    ar: "تنبيه عند دخول كل وقت وقبل خروجه" },
  pT2: { tr: "Ana ekran ve kilit ekranı widget'ları", en: "Home screen and lock screen widgets", de: "Widgets für Start- und Sperrbildschirm",
    fr: "Widgets pour l'écran d'accueil et l'écran verrouillé", ar: "أدوات للشاشة الرئيسية وشاشة القفل" },
  pT3: { tr: "Kıldığın vakitleri ve nafileleri kendin için işaretle", en: "Mark your prayers and voluntary prayers, just for yourself",
    de: "Markiere deine Gebete und freiwilligen Gebete, nur für dich", fr: "Coche tes prières et prières surérogatoires, pour toi seul",
    ar: "علّم صلواتك ونوافلك لنفسك" },

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
  hT1: { tr: "Cüzler her tur kendiliğinden dağıtılır", en: "Portions are handed out automatically each round",
    de: "Die Abschnitte werden jede Runde automatisch verteilt", fr: "Les portions sont réparties automatiquement à chaque tour",
    ar: "تُوزَّع الأجزاء تلقائيًا في كل جولة" },
  hT2: { tr: "Yetişemeyen payını havuza bırakabilir", en: "Anyone who falls behind can return their part to the pool",
    de: "Wer nicht hinterherkommt, kann seinen Teil in den Pool geben", fr: "Qui prend du retard peut remettre sa part dans le pool",
    ar: "من تأخّر يمكنه إعادة نصيبه إلى المجمع" },
  hT3: { tr: "Rehber Modu: halkayı kuran yalnız izleyebilir", en: "Mentor Mode: the organiser can simply oversee",
    de: "Mentor-Modus: Wer den Kreis gründet, kann einfach begleiten", fr: "Mode Mentor : l'organisateur peut simplement suivre",
    ar: "وضع المرشد: يمكن لمنشئ الحلقة أن يكتفي بالمتابعة" },

  vKicker: { tr: "Tek Seferlik Halka", en: "One-Time Circle", de: "Einmaliger Kreis", fr: "Cercle ponctuel", ar: "حلقة لمرة واحدة" },
  vTitle: { tr: "Bir vesile için bir araya gel.", en: "Come together for an occasion.", de: "Kommt zu einem Anlass zusammen.",
    fr: "Rassemblez-vous pour une occasion.", ar: "اجتمعوا لمناسبة." },
  vText: { tr: "Kandil, vefat ya da şifa niyetiyle tek seferlik bir halka kur. Davet linkini alan, uygulamayı indirmeden de tarayıcıdan pay alabilir.",
    en: "Set up a one-time circle for a blessed night, for someone who passed away or with an intention of healing. Whoever gets the invite link can take a share in the browser, without installing the app.",
    de: "Gründe einen einmaligen Kreis für eine gesegnete Nacht, für einen Verstorbenen oder mit der Absicht der Heilung. Wer den Einladungslink bekommt, kann auch ohne App im Browser einen Teil übernehmen.",
    fr: "Crée un cercle ponctuel pour une nuit bénie, pour un défunt ou avec une intention de guérison. Qui reçoit le lien d'invitation peut prendre une part dans le navigateur, sans installer l'appli.",
    ar: "أنشئ حلقة لمرة واحدة لليلة مباركة أو لفقيد أو بنية الشفاء. ومن يصله رابط الدعوة يمكنه أخذ نصيب من المتصفح دون تثبيت التطبيق." },
  vT1: { tr: "Hesap açmadan, tarayıcıdan katılım", en: "Join from the browser, no account needed", de: "Mitmachen im Browser, ohne Konto",
    fr: "Participation depuis le navigateur, sans compte", ar: "مشاركة من المتصفح دون حساب" },
  vT2: { tr: "Dileyen dilediği cüzü alır", en: "Everyone takes the juz they choose", de: "Jeder nimmt sich den Dschuz, den er möchte",
    fr: "Chacun prend le juz qu'il souhaite", ar: "يأخذ كلٌّ الجزء الذي يختاره" },
  vT3: { tr: "Kaç kişinin okuduğu canlı görünür", en: "See live how many people are reading", de: "Live sehen, wie viele gerade lesen",
    fr: "Vois en direct combien de personnes lisent", ar: "شاهد مباشرة كم شخصًا يقرأ" },
  wcTitle: { tr: "Kandil Hatmi", en: "Blessed Night Khatm", de: "Chatma zur gesegneten Nacht", fr: "Khatma de la nuit bénie", ar: "ختمة الليلة المباركة" },
  wcJuz: { tr: "Cüz 7", en: "Juz 7", de: "Dschuz 7", fr: "Juz 7", ar: "الجزء 7" },
  wcRead: { tr: "Oku", en: "Read", de: "Lesen", fr: "Lire", ar: "اقرأ" },
  wcNote: { tr: "Uygulama gerekmez", en: "No app needed", de: "Keine App nötig", fr: "Pas besoin de l'appli", ar: "لا حاجة إلى التطبيق" },

  aKicker: { tr: "Ortak Ameller", en: "Shared practices", de: "Gemeinsame Praxis", fr: "Pratiques communes", ar: "أعمال مشتركة" },
  aTitle: { tr: "Teşvik var, kıyas yok.", en: "Encouragement, not comparison.", de: "Ermutigung statt Vergleich.",
    fr: "L'encouragement, pas la comparaison.", ar: "تشجيع بلا مقارنة." },
  aText: { tr: "Beş vakti, ezberi ya da bir duayı halkanla birlikte sürdür. Herkes kendi gününü işaretler.",
    en: "Keep up the five prayers, memorisation or a dua together with your circle. Everyone marks their own day.",
    de: "Halte die fünf Gebete, das Auswendiglernen oder ein Bittgebet gemeinsam mit deinem Kreis durch. Jeder markiert seinen eigenen Tag.",
    fr: "Maintiens les cinq prières, la mémorisation ou une invocation avec ton cercle. Chacun coche sa propre journée.",
    ar: "داوم مع حلقتك على الصلوات الخمس أو الحفظ أو دعاء. يعلّم كلٌّ يومه بنفسه." },
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

  faqTitle: { tr: "Başlamadan önce", en: "Before you start", de: "Bevor du anfängst", fr: "Avant de commencer", ar: "قبل أن تبدأ" },
  faqText: { tr: "Başka bir sorun varsa support@manevihalka.app adresine yaz.", en: "Any other question? Write to support@manevihalka.app.",
    de: "Noch eine Frage? Schreib an support@manevihalka.app.", fr: "Une autre question ? Écris à support@manevihalka.app.",
    ar: "لديك سؤال آخر؟ اكتب إلى support@manevihalka.app." },
  q1: { tr: "Ücretsiz mi?", en: "Is it free?", de: "Ist es kostenlos?", fr: "Est-ce gratuit ?", ar: "هل هو مجاني؟" },
  a1: { tr: "Evet. İbadetin kendisi her zaman ücretsiz: Kur'an, namaz vakitleri, zikir, dualar ve halkalara katılmak. Bazı ek kolaylıklar isteğe bağlıdır.",
    en: "Yes. Worship itself is always free: the Quran, prayer times, dhikr, duas and joining circles. Some extra conveniences are optional.",
    de: "Ja. Die Anbetung selbst ist immer kostenlos: Koran, Gebetszeiten, Dhikr, Bittgebete und das Mitmachen in Kreisen. Einige zusätzliche Annehmlichkeiten sind optional.",
    fr: "Oui. L'adoration elle-même est toujours gratuite : le Coran, les horaires de prière, le dhikr, les invocations et la participation aux cercles. Quelques options de confort sont facultatives.",
    ar: "نعم. العبادة نفسها مجانية دائمًا: القرآن ومواقيت الصلاة والذكر والأدعية والانضمام إلى الحلقات. وبعض الميزات الإضافية اختيارية." },
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
  a4: { tr: "Diyanet'in Türkiye mushafı. Meal ve üç kâriden sesli tilavet de var.",
    en: "The Mushaf of Türkiye's Presidency of Religious Affairs (Diyanet), with translation and recitation by three reciters.",
    de: "Der Mushaf des türkischen Präsidiums für Religionsangelegenheiten (Diyanet), mit Übersetzung und Rezitation von drei Rezitatoren.",
    fr: "Le Mushaf de la Présidence des affaires religieuses de Turquie (Diyanet), avec traduction et récitation par trois récitateurs.",
    ar: "مصحف رئاسة الشؤون الدينية التركية (ديانت)، مع تلاوة بأصوات ثلاثة قرّاء." },
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

  altVakit: { tr: "Namaz vakitleri ekranı, İstanbul", en: "Prayer times screen, London", de: "Gebetszeiten, Berlin",
    fr: "Écran des horaires de prière, Paris", ar: "شاشة مواقيت الصلاة، مكة المكرمة" },
  altQuran: { tr: "Kur'an okuyucu, Mülk suresi, sesli tilavet açık", en: "Quran reader, Surah Al-Mulk, with recitation playing",
    de: "Koran-Leser, Sure Al-Mulk, Rezitation läuft", fr: "Lecteur du Coran, sourate Al-Mulk, récitation en cours",
    ar: "قارئ القرآن، سورة الملك، والتلاوة قيد التشغيل" },
  altHalka: { tr: "Aile Hatmi, halka sekmesi: dört kişi ve cüzleri", en: "Family Khatm, circle tab: four members and their juz",
    de: "Familien-Chatma, Kreis-Ansicht: vier Mitglieder und ihre Dschuz", fr: "Khatma familiale, onglet Cercle : quatre membres et leurs juz",
    ar: "ختمة العائلة، تبويب الحلقة: أربعة أعضاء وأجزاؤهم" },
  altAmel: { tr: "Ortak amel: 5 vakit, sabah ve öğle işaretli", en: "Shared practice: all 5 prayers, Fajr and Dhuhr marked",
    de: "Gemeinsame Praxis: alle 5 Gebete, Fadschr und Dhuhr markiert", fr: "Pratique commune : les 5 prières, Fajr et Dhohr cochées",
    ar: "عمل مشترك: الصلوات الخمس، والفجر والظهر معلَّمتان" },
  altVesile: { tr: "Tek seferlik halka: Kandil Hatmi, ortak ilerleme ve cüz havuzu",
    en: "One-time circle: Blessed Night Khatm, shared progress and juz pool",
    de: "Einmaliger Kreis: Chatma zur gesegneten Nacht, gemeinsamer Fortschritt und Dschuz-Pool",
    fr: "Cercle ponctuel : Khatma de la nuit bénie, progression commune et pool de juz",
    ar: "حلقة لمرة واحدة: ختمة الليلة المباركة، التقدم الجماعي ومجمع الأجزاء" },
  altKitap: { tr: "Kitaplık: kendi kitapların", en: "Bookshelf: your own books", de: "Bücherregal: deine eigenen Bücher",
    fr: "Bibliothèque de lecture : tes propres livres", ar: "رف الكتب: كتبك الخاصة" },
};

// ── Vitrin: yedi kart ────────────────────────────────────────────────────────
const hm = (h, m) => h + m / 60;
// Her dilin Namaz ekranindaki sehir, saat ve vakitler (img/app/<dil>/vakit.webp)
const DAY = {
  tr: { now: hm(13, 58), pr: [{ n: "İmsak", h: hm(5, 26), done: 1 }, { sun: 1, h: hm(6, 50) }, { n: "Öğle", h: hm(13, 0), done: 1 },
    { n: "İkindi", h: hm(16, 20) }, { n: "Akşam", h: hm(19, 0) }, { n: "Yatsı", h: hm(20, 19) }] },
  en: { now: hm(12, 3), pr: [{ n: "Fajr", h: hm(5, 3), done: 1 }, { sun: 1, h: hm(6, 49) }, { n: "Dhuhr", h: hm(12, 56) },
    { n: "Asr", h: hm(16, 6) }, { n: "Maghrib", h: hm(18, 54) }, { n: "Isha", h: hm(20, 26) }] },
  de: { now: hm(13, 3), pr: [{ n: "Fadschr", h: hm(5, 7), done: 1 }, { sun: 1, h: hm(6, 55) }, { n: "Dhuhr", h: hm(13, 2) },
    { n: "Asr", h: hm(16, 11) }, { n: "Maghrib", h: hm(19, 0) }, { n: "Ischa", h: hm(20, 34) }] },
  fr: { now: hm(13, 4), pr: [{ n: "Fajr", h: hm(5, 59), done: 1 }, { sun: 1, h: hm(7, 38) }, { n: "Dhohr", h: hm(13, 46) },
    { n: "Asr", h: hm(17, 0) }, { n: "Maghrib", h: hm(19, 45) }, { n: "Icha", h: hm(21, 11) }] },
  ar: { now: hm(14, 8), pr: [{ n: "الفجر", h: hm(4, 57), done: 1 }, { sun: 1, h: hm(6, 4) }, { n: "الظهر", h: hm(12, 17), done: 1 },
    { n: "العصر", h: hm(15, 40) }, { n: "المغرب", h: hm(18, 19) }, { n: "العشاء", h: hm(19, 22) }] },
};
const TABS = {
  tr: ["Namaz", "Kur'an", "Halka", "Ortak Ameller", "Tek Seferlik", "Kitaplık", "Dahası"],
  en: ["Prayer", "Quran", "Circle", "Shared practices", "One-time", "Bookshelf", "More"],
  de: ["Gebet", "Koran", "Kreis", "Gemeinsame Praxis", "Einmalig", "Bücherregal", "Mehr"],
  fr: ["Prière", "Coran", "Cercle", "Pratiques communes", "Ponctuel", "Bibliothèque", "Plus"],
  ar: ["الصلاة", "القرآن", "الحلقة", "أعمال مشتركة", "لمرة واحدة", "رف الكتب", "المزيد"],
};
const CAPS = {
  tr: ["Vakitler günün içinde. Kıldığını kendin için işaretle.", "Oku, dinle, çalış. Dinlerken okunan kelime işaretlenir.",
    "Ailenle bir hatim. Kimin hangi cüzü okuduğu tek bakışta.", "Halkanla beş vakit. Herkes kendi gününü işaretler, kıyas yok.",
    "Kandil hatmi: dileyen dilediği cüzü alır, tarayıcıdan da katılır.", "Kendi kitapların, notların ve kaldığın yer.",
    "Zikirden kıbleye, ezberden widget'lara. Hepsi aşağıda."],
  en: ["Prayer times through your day. Mark what you've prayed, just for yourself.", "Read, listen, memorise. Each word is highlighted as it is recited.",
    "A khatm with your family. Who is reading which juz, at a glance.", "The five prayers with your circle. Everyone marks their own day, no comparisons.",
    "A khatm for a blessed night: anyone takes the juz they like, even from the browser.", "Your own books, your notes and where you left off.",
    "From dhikr to the qibla, from memorisation to widgets. It's all below."],
  de: ["Gebetszeiten über deinen Tag. Markiere für dich, was du gebetet hast.", "Lesen, hören, lernen. Jedes Wort wird beim Vortrag markiert.",
    "Eine Chatma mit deiner Familie. Wer welchen Dschuz liest, auf einen Blick.", "Die fünf Gebete mit deinem Kreis. Jeder markiert seinen eigenen Tag, ohne Vergleiche.",
    "Eine Chatma für eine gesegnete Nacht: Jeder nimmt sich einen Dschuz, auch im Browser.", "Deine eigenen Bücher, deine Notizen und wo du stehen geblieben bist.",
    "Vom Dhikr bis zur Qibla, vom Auswendiglernen bis zu Widgets. Alles weiter unten."],
  fr: ["Les horaires au fil de ta journée. Coche pour toi les prières accomplies.", "Lis, écoute, mémorise. Chaque mot est surligné pendant la récitation.",
    "Une khatma en famille. Qui lit quel juz, en un coup d'œil.", "Les cinq prières avec ton cercle. Chacun coche sa journée, sans comparaison.",
    "Une khatma pour une nuit bénie : chacun prend le juz qu'il veut, même depuis le navigateur.", "Tes propres livres, tes notes et là où tu t'es arrêté.",
    "Du dhikr à la qibla, de la mémorisation aux widgets. Tout est plus bas."],
  ar: ["المواقيت على مدار يومك. علّم ما صلّيت لنفسك.", "اقرأ واستمع واحفظ. تُظلَّل كل كلمة أثناء التلاوة.",
    "ختمة مع عائلتك. من يقرأ أي جزء، بنظرة واحدة.", "الصلوات الخمس مع حلقتك. يعلّم كلٌّ يومه، بلا مقارنة.",
    "ختمة لليلة مباركة: يأخذ كلٌّ الجزء الذي يريد، حتى من المتصفح.", "كتبك وملاحظاتك وحيث توقفت.",
    "من الذكر إلى القبلة، ومن الحفظ إلى الأدوات. كل ذلك أدناه."],
};
// Kutucuklar: [x %, y %, renk ("" yesil, "g" altin), kalin metin, soluk metin]; Arapcada x aynalanir.
const CHIPS = {
  tr: [[["Sabah ve öğle", "kılındı"], ["İkindi", "16:20"]], [["Mishary Alafasy", "dinleniyor"], ["Mülk", "2. ayet"]],
    [["Yusuf", "Cüz 3 okunuyor"], ["4 kardeş", "1. tur"]], [["Bugün", "2 / 5"], ["Son 7 gün", "sıralama yok"]],
    [["80 sayfa", "okunuyor"], ["Uygulamasız", "tarayıcıdan"]], [["PDF ve EPUB", ""], ["Notlar", "kitabın içinde"]]],
  en: [[["Fajr", "prayed"], ["Dhuhr", "12:56"]], [["Mishary Alafasy", "now playing"], ["Al-Mulk", "verse 2"]],
    [["Yusuf", "reading juz 3"], ["4 members", "round 1"]], [["Today", "2 / 5"], ["Last 7 days", "no rankings"]],
    [["80 pages", "in progress"], ["No app", "in the browser"]], [["PDF and EPUB", ""], ["Notes", "inside the book"]]],
  de: [[["Fadschr", "verrichtet"], ["Asr", "16:11"]], [["Mishary Alafasy", "läuft gerade"], ["Al-Mulk", "Vers 2"]],
    [["Yusuf", "liest Dschuz 3"], ["4 Mitglieder:innen", "1. Runde"]], [["Heute", "2 / 5"], ["Letzte 7 Tage", "keine Ranglisten"]],
    [["80 Seiten", "in Arbeit"], ["Ohne App", "im Browser"]], [["PDF und EPUB", ""], ["Notizen", "im Buch"]]],
  fr: [[["Fajr", "accomplie"], ["Dhohr", "13:46"]], [["Mishary Alafasy", "en écoute"], ["Al-Mulk", "verset 2"]],
    [["Youssef", "lit le juz 3"], ["4 membres", "tour 1"]], [["Aujourd'hui", "2 / 5"], ["7 derniers jours", "sans classement"]],
    [["80 pages", "en cours"], ["Sans appli", "dans le navigateur"]], [["PDF et EPUB", ""], ["Notes", "dans le livre"]]],
  ar: [[["الفجر والظهر", "أُدّيتا"], ["العصر", "15:40"]], [["مشاري العفاسي", "قيد الاستماع"], ["الملك", "الآية 2"]],
    [["يوسف", "يقرأ الجزء 3"], ["4 أعضاء", "الجولة 1"]], [["اليوم", "2 / 5"], ["آخر 7 أيام", "بلا ترتيب"]],
    [["80 صفحة", "قيد القراءة"], ["دون تطبيق", "من المتصفح"]], [["PDF وEPUB", ""], ["الملاحظات", "داخل الكتاب"]]],
};
// Namaz halkasinda ikinci kutucuk sol ustte: 06:00-12:00 ceyreginde hicbir dilde etiket yok
// (sag alt yatsi etiketinin yeri, yatsi dile gore 19:22 ile 21:11 arasinda kayiyor).
const CHIP_POS = [[[13, 76, ""], [18, 12, "g"]], [[85, 22, "g"], [14, 74, ""]], [[80, 6, "g"], [16, 90, ""]],
  [[87, 74, ""], [14, 28, "g"]], [[86, 20, "g"], [14, 80, ""]], [[86, 78, ""], [14, 24, "g"]]];
const RING_LABEL = {
  verse: { tr: "Mülk · 30 ayet", en: "Al-Mulk · 30 verses", de: "Al-Mulk · 30 Verse", fr: "Al-Mulk · 30 versets", ar: "الملك · 30 آية" },
  week: { tr: "Bugün", en: "Today", de: "Heute", fr: "Aujourd'hui", ar: "اليوم" },
  pages: { tr: "%7", en: "7%", de: "7 %", fr: "7 %", ar: "7%" },
};
const MORE = {
  small: { tr: "Manevi Halka'da", en: "In Manevi Halka", de: "In Manevi Halka", fr: "Dans Manevi Halka", ar: "في Manevi Halka" },
  title: { tr: "ve daha niceleri", en: "and much more", de: "und vieles mehr", fr: "et bien plus", ar: "والمزيد" },
  link: { tr: "Hepsini gör", en: "See all", de: "Alle ansehen", fr: "Tout voir", ar: "عرض الكل" },
  list: {
    tr: ["Zikirmatik", "Tesbihat", "Namaz takibi", "Esmâü'l-Hüsnâ", "Virdler, dualar", "Kıble", "Dini günler", "Ezber", "Widget'lar", "Yolculuğum"],
    en: ["Dhikr Counter", "Tasbihat", "Prayer log", "Asma ul-Husna", "Awrad and duas", "Qibla", "Religious Days", "Hifz", "Widgets", "My Journey"],
    de: ["Dhikr-Zähler", "Tasbihat", "Gebetsprotokoll", "Asma ul-Husna", "Awrad, Bittgebete", "Qibla", "Religiöse Tage", "Hifz", "Widgets", "Mein Weg"],
    fr: ["Compteur de dhikr", "Tasbihat", "Suivi des prières", "Asma ul-Husna", "Awrad, invocations", "Qibla", "Jours religieux", "Hifz", "Widgets", "Mon parcours"],
    ar: ["عداد الذكر", "التسبيحات", "سجل الصلاة", "أسماء الله الحسنى", "الأوراد والأدعية", "القبلة", "الأيام الدينية", "الحفظ", "الأدوات", "رحلتي"],
  },
};

const IOS = "https://apps.apple.com/app/manevi-halka/id6760654292";
const play = (yer, dil) => "https://play.google.com/store/apps/details?id=com.emrhnayz.spiritualcircle&referrer=" +
  encodeURIComponent(`utm_source=manevihalka.app&utm_medium=website&utm_content=app-${yer}-${dil}`);
const ADLAR = { tr: "Türkçe", en: "English", de: "Deutsch", fr: "Français", ar: "العربية" };
const OG = { tr: "tr_TR", en: "en_US", de: "de_DE", fr: "fr_FR", ar: "ar_AR" };
const url = (dil) => `${SITE}/${YOL[dil]}`;
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
  o.faqKicker = T.navFaq[dil];
  return o;
}

function veri(dil) {
  const img = ["vakit.webp", "quran.webp", "halka.webp", "amel.webp", "vesile.webp", "kitaplik.webp"];
  const alt = [T.altVakit, T.altQuran, T.altHalka, T.altAmel, T.altVesile, T.altKitap];
  const rings = ["day", "verse", "juz", "week", "pages", "books"];
  const screens = rings.map((ring, i) => ({
    t: TABS[dil][i], d: CAPS[dil][i], img: img[i], alt: alt[i][dil], ring,
    rd: ring === "day" ? DAY[dil] : (RING_LABEL[ring] ? { label: RING_LABEL[ring][dil] } : {}),
    chips: CHIP_POS[i].map((p, j) => [p[0], p[1], p[2], CHIPS[dil][i][j][0], CHIPS[dil][i][j][1]]),
  }));
  screens.push({ t: TABS[dil][6], d: CAPS[dil][6], ring: "beads", chips: [],
    more: { small: MORE.small[dil], title: MORE.title[dil], link: MORE.link[dil], list: MORE.list[dil] } });
  for (const k of Object.keys(TABS)) if (TABS[k].length !== 7 || CAPS[k].length !== 7 || CHIPS[k].length !== 6) hata(`vitrin verisi eksik: ${k}`);
  return {
    lang: dil, rtl: dil === "ar", imgBase: `/img/app/${dil}/`, screens,
    aria: { toDark: T.themeToDark[dil], toLight: T.themeToLight[dil] },
    links: { ios: IOS, androidDock: play("dock", dil) },
  };
}

const sablon = readFileSync(join(KOK, "_gen", "app.src.html"), "utf8");
const VERI_ISARETI = "/*__DATA__*/null";
if (sablon.split(VERI_ISARETI).length !== 2) hata("sablonda veri isareti tek olmali");

const hreflang = [...DILLER.map((d) => `<link rel="alternate" hreflang="${d}" href="${url(d)}">`),
  `<link rel="alternate" hreflang="x-default" href="${url("en")}">`].join("\n");

let farkli = 0;
for (const dil of DILLER) {
  const s = sozlukFor(dil);
  const ham = {
    lang: dil, dir: dil === "ar" ? "rtl" : "ltr", canonical: url(dil), ogLocale: OG[dil], hreflangHtml: hreflang,
    homeHref: dil === "tr" ? "/tr/" : "/", imgBase: `/img/app/${dil}/`,
    iosHref: IOS, androidHero: play("hero", dil), androidClose: play("close", dil),
    privacyHref: politika("privacy", dil), termsHref: politika("terms", dil), deleteHref: politika("account-delete", dil),
    langsHtml: DILLER.map((d) => `<a href="/${YOL[d]}" hreflang="${d}" lang="${d}"${d === dil ? ' aria-current="page"' : ""}>${ADLAR[d]}</a>`).join(""),
    creditHtml: dil === "en" ? `${kacis(s.itaniCredit)} <span dir="ltr"><a href="https://www.clearquran.com" target="_blank" rel="noopener">ClearQuran.com</a> (<a href="https://creativecommons.org/licenses/by-nd/4.0/" target="_blank" rel="noopener">CC BY-ND 4.0</a>)</span>` : "",
  };
  const eksik = new Set();
  let cikti = sablon.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (k in ham) return ham[k];
    if (k in s) return kacis(s[k]);
    eksik.add(k); return "";
  });
  if (eksik.size) hata(`${dil}: sablonda karsiligi olmayan anahtar(lar): ${[...eksik].join(", ")}`);
  const json = JSON.stringify(veri(dil)).replace(/</g, "\\u003c");
  cikti = cikti.replace(VERI_ISARETI, json);
  if (/\{\{\w+\}\}/.test(cikti)) hata(`${dil}: doldurulmamis yer tutucu kaldi`);
  if (/—/.test(cikti.replace(/<!--[\s\S]*?-->/g, ""))) hata(`${dil}: uzun tire (ayrac) var`);

  const hedef = join(KOK, YOL[dil], "index.html");
  const eski = existsSync(hedef) ? readFileSync(hedef, "utf8") : null;
  if (eski === cikti) continue;
  farkli++;
  if (KONTROL) { console.error(`fark: ${YOL[dil]}index.html`); continue; }
  mkdirSync(dirname(hedef), { recursive: true });
  writeFileSync(hedef, cikti);
  console.log(`yazildi: ${YOL[dil]}index.html`);
}
if (KONTROL && farkli) process.exit(1);
if (!farkli) console.log("degisiklik yok");
