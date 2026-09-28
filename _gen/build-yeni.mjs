#!/usr/bin/env node
/**
 * Yeni tasarim onizlemesi ureticisi: _gen/yeni.src.html -> yeni/index.html
 *
 * Sayfa metinleri index.html'in I18N sozlugunden SOKULUR, kopyalanmaz
 * (build-locale-pages.mjs ile ayni ilke): ana sayfada bir ceviri duzelirse
 * onizleme bir sonraki uretimde kendiliginden duzelir. Onizlemeye ozgu tek
 * anahtar yPreview, asagida.
 *
 * ⚠️ /yeni/ arama motorlarina KAPALI (noindex, site haritasinda yok, siteden
 * baglanti yok). Kalici hali index.html'e tasinacak.
 *
 * KULLANIM:  node _gen/build-yeni.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const DILLER = ["tr", "en", "de", "fr", "ar"];
const ANAHTARLAR = ["h1sub", "get", "ccTitle", "ccLead", "ccNote", "heroInviteTitle", "heroInviteSub",
  "heroInviteGo", "heroInviteSmall", "heroInviteCycle", "heroInviteNear", "heroInviteNear1", "privacy", "terms", "deleteAcc", "contact",
  "itaniCredit", "suffix", "introTitle", "taglineSub",
  "closeTitle", "closeText", "closeWish", "quoteText", "quoteSource"];
const OZEL = {
  yPreview: { tr: "Önizleme", en: "Preview", de: "Vorschau", fr: "Aperçu", ar: "معاينة" },
  // ── "Neler var" bolumu (28 Eyl 2026): halka sahnesi, tek seferlik halka,
  // her gun dort ozellik (gercek ekranlar img/app/<dil>/), "ve daha fazlasi".
  yHalkaKicker: { tr: "Halka", en: "Circles", de: "Kreise", fr: "Cercles", ar: "الحلقات" },
  yHalkaTitle: { tr: "Bir hatim, on kişi, bir hafta", en: "One khatm, ten people, one week",
    de: "Eine Chatma, zehn Menschen, eine Woche", fr: "Une khatma, dix personnes, une semaine",
    ar: "ختمة واحدة، عشرة أشخاص، أسبوع واحد" },
  yHalkaText: { tr: "Hatmi halkana böl: herkes kendi cüzünü alır, sırası gelince haber alır. Tek başına aylar süren bir hatim, birlikte bir haftada tamamlanır.",
    en: "Share the khatm with your circle: everyone takes their own juz and is notified when their turn comes. A khatm that would take months alone is finished together in a week.",
    de: "Teile die Chatma mit deinem Kreis: Alle übernehmen ihren eigenen Dschuz und werden benachrichtigt, wenn sie an der Reihe sind. Was allein Monate dauert, ist gemeinsam in einer Woche geschafft.",
    fr: "Partage la khatma avec ton cercle : chacun prend son juz et reçoit un rappel quand vient son tour. Une khatma qui prendrait des mois seul se termine ensemble en une semaine.",
    ar: "قسِّم الختمة على حلقتك: يأخذ كلٌّ جزءه ويصله تنبيه حين يحين دوره. ختمة تستغرق أشهرًا وحدك تُتَمّ معًا في أسبوع." },
  yHalkaP1: { tr: "Cüzler kendiliğinden dağıtılır, her tur yenisi başlar", en: "Portions are handed out automatically, and each round starts by itself",
    de: "Die Abschnitte werden automatisch verteilt, jede Runde beginnt von selbst", fr: "Les portions sont réparties automatiquement, chaque tour démarre tout seul",
    ar: "تُوزَّع الأجزاء تلقائيًا، وتبدأ كل جولة من تلقاء نفسها" },
  yHalkaP2: { tr: "Yetişemeyen yardım ister ya da payını havuza bırakır", en: "Anyone who falls behind can ask for help or return their part to the pool",
    de: "Wer nicht hinterherkommt, bittet um Hilfe oder gibt seinen Teil in den Pool", fr: "Qui prend du retard demande de l'aide ou remet sa part dans le pool",
    ar: "من تأخّر يطلب المساعدة أو يعيد نصيبه إلى المجمع" },
  yHalkaP3: { tr: "Kur'an'ın yanında Cevşen, zikir ve kitap halkaları", en: "Besides the Quran: Jawshan, dhikr and book circles",
    de: "Neben dem Koran auch Dschauschan-, Dhikr- und Buchkreise", fr: "Outre le Coran : cercles de Jawshan, de dhikr et de lecture",
    ar: "إلى جانب القرآن: حلقات الجوشن والذكر والكتب" },
  yRingUnit: { tr: "cüz", en: "juz", de: "Dschuz", fr: "juz", ar: "جزءًا" },
  yRingSub: { tr: "10 kişi · 7 gün", en: "10 people · 7 days", de: "10 Personen · 7 Tage", fr: "10 personnes · 7 jours", ar: "10 أشخاص · 7 أيام" },
  yRingDone: { tr: "Hatim tamam", en: "Khatm complete", de: "Chatma vollendet", fr: "Khatma achevée", ar: "تمّت الختمة" },
  yVesileKicker: { tr: "Tek Seferlik Halka", en: "One-Time Circle", de: "Einmaliger Kreis", fr: "Cercle ponctuel", ar: "حلقة لمرة واحدة" },
  yVesileTitle: { tr: "Kandil gecesi bir link paylaş, herkes katılsın", en: "Share one link on a blessed night, and everyone can join",
    de: "Teile in einer gesegneten Nacht einen Link, und alle können mitmachen", fr: "Partage un lien lors d'une nuit bénie, et chacun peut participer",
    ar: "شارك رابطًا واحدًا في ليلة مباركة، ليشارك الجميع" },
  yVesileText: { tr: "Kandil, bir vefat ya da şifa niyeti için tek seferlik hatim kur. Linke dokunan, uygulaması olmasa bile tarayıcıdan cüz alıp okur.",
    en: "Set up a one-time khatm for a blessed night, for someone who passed away or with an intention of healing. Whoever taps the link can take a juz and read it in the browser, even without the app.",
    de: "Starte eine einmalige Chatma für eine gesegnete Nacht, für einen Verstorbenen oder mit der Absicht der Heilung. Wer auf den Link tippt, übernimmt auch ohne App einen Dschuz und liest ihn im Browser.",
    fr: "Lance une khatma ponctuelle pour une nuit bénie, pour un défunt ou avec une intention de guérison. Celui qui touche le lien prend un juz et le lit dans le navigateur, même sans l'application.",
    ar: "أنشئ ختمة لمرة واحدة لليلة مباركة أو لفقيد أو بنية الشفاء. ومن يضغط على الرابط يأخذ جزءًا ويقرؤه في المتصفح، حتى دون التطبيق." },
  yVesileCta: { tr: "Web'de nasıl göründüğünü gör", en: "See how it looks on the web", de: "So sieht es im Browser aus",
    fr: "Voir à quoi cela ressemble sur le web", ar: "شاهد كيف يبدو على الويب" },
  ySpotKicker: { tr: "Her gün", en: "Every day", de: "Jeden Tag", fr: "Chaque jour", ar: "كل يوم" },
  ySpotTitle: { tr: "Her gün elinin altında", en: "With you every day", de: "Jeden Tag an deiner Seite", fr: "À tes côtés chaque jour", ar: "معك كل يوم" },
  s1t: { tr: "Kur'an ve sesli Kur'an", en: "Quran and recitation", de: "Koran und Rezitation", fr: "Coran et récitation", ar: "القرآن والتلاوة" },
  s1d: { tr: "Türkiye mushafı ve meal. Üç kâriden dinlerken okunan kelime işaretlenir; ezber tekrarı yapar, sure ya da cüz indirip çevrimdışı dinlersin.",
    en: "The Mushaf with translation. Listen to three reciters while each word is highlighted, repeat verses to memorise them, and download a surah or juz to listen offline.",
    de: "Der Mushaf mit Übersetzung. Höre drei Rezitatoren, während jedes Wort markiert wird, wiederhole Verse zum Auswendiglernen und lade Suren oder Dschuz zum Offline-Hören herunter.",
    fr: "Le Mushaf avec traduction. Écoute trois récitateurs pendant que chaque mot est surligné, répète des versets pour les mémoriser et télécharge une sourate ou un juz pour l'écoute hors ligne.",
    ar: "مصحف واضح القراءة. استمع إلى ثلاثة قرّاء مع تظليل كل كلمة، وكرّر الآيات لتحفظها، ونزّل سورة أو جزءًا للاستماع دون اتصال." },
  s2t: { tr: "Namaz vakitleri", en: "Prayer times", de: "Gebetszeiten", fr: "Horaires de prière", ar: "مواقيت الصلاة" },
  s2d: { tr: "106 ülkede vakitler, vakit girince bildirim, ana ekranda widget. Seyahat ettiğinde şehrin kendiliğinden güncellenir.",
    en: "Prayer times in 106 countries, a notification when each time begins and widgets for your home screen. When you travel, your city updates by itself.",
    de: "Gebetszeiten in 106 Ländern, eine Benachrichtigung zu jeder Gebetszeit und Widgets für den Startbildschirm. Auf Reisen aktualisiert sich deine Stadt von selbst.",
    fr: "Les horaires dans 106 pays, une notification à chaque prière et des widgets pour l'écran d'accueil. En voyage, ta ville se met à jour toute seule.",
    ar: "مواقيت في 106 دول، وتنبيه عند دخول كل وقت، وأدوات للشاشة الرئيسية. وحين تسافر تتحدّث مدينتك تلقائيًا." },
  s3t: { tr: "Ortak Ameller", en: "Shared practices", de: "Gemeinsame Praxis", fr: "Pratiques communes", ar: "أعمال مشتركة" },
  s3d: { tr: "Halkanla beş vakit namazı, ezberi ya da bir duayı birlikte sürdür. Herkes kendi gününü işaretler; sıralama yok, kıyas yok.",
    en: "Keep up the five daily prayers, memorisation or a dua together with your circle. Everyone marks their own day; no rankings, no comparisons.",
    de: "Halte die fünf täglichen Gebete, das Auswendiglernen oder ein Bittgebet gemeinsam mit deinem Kreis durch. Jeder markiert seinen eigenen Tag, ohne Ranglisten und ohne Vergleiche.",
    fr: "Maintiens les cinq prières, la mémorisation ou une invocation avec ton cercle. Chacun coche sa propre journée, sans classement ni comparaison.",
    ar: "داوم مع حلقتك على الصلوات الخمس أو الحفظ أو دعاء. يعلّم كلٌّ يومه بنفسه، بلا ترتيب ولا مقارنة." },
  s4t: { tr: "Kitaplık", en: "Bookshelf", de: "Bücherregal", fr: "Bibliothèque de lecture", ar: "رف الكتب" },
  s4d: { tr: "Kendi PDF ve EPUB kitaplarını oku, altını çiz, not al. Kitap halkasındaysan okuduğun sayfaları halkana kaydedersin.",
    en: "Read your own PDF and EPUB books, highlight and take notes. In a book circle, you can log the pages you read for your circle.",
    de: "Lies deine eigenen PDF- und EPUB-Bücher, markiere und mach dir Notizen. In einem Buchkreis trägst du deine gelesenen Seiten für den Kreis ein.",
    fr: "Lis tes propres livres PDF et EPUB, surligne et prends des notes. Dans un cercle de lecture, tu enregistres tes pages lues pour le cercle.",
    ar: "اقرأ كتبك بصيغة PDF وEPUB، وظلّل ودوّن ملاحظاتك. وفي حلقة الكتاب تسجّل الصفحات التي قرأتها لحلقتك." },
  yAlsoTitle: { tr: "Ve daha fazlası", en: "And more", de: "Und noch mehr", fr: "Et bien plus", ar: "والمزيد" },
  a1: { tr: "Cevşen-ül Kebir", en: "Jawshan al-Kabir", de: "Dschauschan al-Kabir", fr: "Jawshan al-Kabir", ar: "جوشن الكبير" },
  a2: { tr: "Zikirmatik ve zikir listeleri", en: "Dhikr counter and lists", de: "Dhikr-Zähler und Listen", fr: "Compteur et listes de dhikr", ar: "عداد الذكر وقوائمه" },
  a3: { tr: "Namaz tesbihatı", en: "Tasbihat after prayer", de: "Tasbihat nach dem Gebet", fr: "Tasbihat après la prière", ar: "تسبيحات بعد الصلاة" },
  a4: { tr: "Sabah ve akşam virdleri", en: "Morning and evening adhkar", de: "Morgen- und Abend-Adhkar", fr: "Adhkar du matin et du soir", ar: "أذكار الصباح والمساء" },
  a5: { tr: "Peygamber duaları", en: "Prophetic duas", de: "Prophetische Bittgebete", fr: "Invocations prophétiques", ar: "الأدعية النبوية" },
  a6: { tr: "Esmaül Hüsna", en: "The 99 Names of Allah", de: "Die 99 Namen Allahs", fr: "Les 99 noms d'Allah", ar: "أسماء الله الحسنى" },
  a7: { tr: "Kıble pusulası ve uydu görünümü", en: "Qibla compass and satellite view", de: "Qibla-Kompass und Satellitenansicht",
    fr: "Boussole Qibla et vue satellite", ar: "بوصلة القبلة وصورة القمر الصناعي" },
  a8: { tr: "Dini günler ve kandiller", en: "Religious days", de: "Religiöse Tage", fr: "Jours religieux", ar: "الأيام الدينية" },
  a9: { tr: "Ezber takibi", en: "Hifz tracker", de: "Hifz-Begleiter", fr: "Suivi du hifz", ar: "متابعة الحفظ" },
  a10: { tr: "Namaz takibi, kuşluk ve teheccüd", en: "Prayer log, Duha and Tahajjud", de: "Gebetsprotokoll, Duha und Tahajjud",
    fr: "Suivi des prières, Douha et Tahajjud", ar: "سجل الصلاة والضحى والتهجد" },
  a11: { tr: "Yolculuğum", en: "My Journey", de: "Mein Weg", fr: "Mon parcours", ar: "رحلتي" },
  a12: { tr: "5 dil, 10 tema", en: "5 languages, 10 themes", de: "5 Sprachen, 10 Themen", fr: "5 langues, 10 thèmes", ar: "5 لغات و10 سمات" },
  yFreeLine: { tr: "İbadetin kendisi her zaman ücretsiz, reklam yok.", en: "Worship itself is always free, and there are no ads.",
    de: "Die Anbetung selbst ist immer kostenlos, und es gibt keine Werbung.", fr: "L'adoration elle-même est toujours gratuite, et il n'y a pas de publicité.",
    ar: "العبادة نفسها مجانية دائمًا، ولا إعلانات." },
  yShare: { tr: "Paylaş", en: "Share", de: "Teilen", fr: "Partager", ar: "مشاركة" },
  ySaved: { tr: "Görsel kaydedildi", en: "Image saved", de: "Bild gespeichert", fr: "Image enregistrée", ar: "تم حفظ الصورة" },
  ySocialTitle: { tr: "Halkayla bağlantıda kal", en: "Stay close to the circle", de: "Bleib mit dem Kreis verbunden",
    fr: "Reste lié au cercle", ar: "ابقَ على صلة بالحلقة" },
  ySocialText: { tr: "Günün ayeti her sabah, kandil gecelerinde hatırlatma.",
    en: "The verse of the day every morning, reminders on the blessed nights.",
    de: "Jeden Morgen der Vers des Tages, Erinnerungen in den gesegneten Nächten.",
    fr: "Le verset du jour chaque matin, des rappels lors des nuits bénies.",
    ar: "آية اليوم كل صباح، وتذكير في الليالي المباركة." },
};

function hata(m) { console.error("HATA: " + m); process.exit(1); }

const html = readFileSync(join(KOK, "index.html"), "utf8");
const bas = html.indexOf("var I18N = {");
if (bas < 0) hata("index.html'de I18N blogu bulunamadi");
let i = html.indexOf("{", bas), d = 0, son = i;
for (; son < html.length; son++) {
  const c = html[son];
  if (c === "{") d++;
  else if (c === "}") { d--; if (d === 0) break; }
}
const kutu = {};
vm.runInNewContext("I18N = " + html.slice(i, son + 1), kutu);

const sozluk = {};
for (const dil of DILLER) {
  const kaynak = kutu.I18N[dil];
  if (!kaynak) hata(`I18N.${dil} yok`);
  sozluk[dil] = {};
  for (const k of ANAHTARLAR) {
    if (kaynak[k] == null) hata(`I18N.${dil}.${k} yok`);
    sozluk[dil][k] = kaynak[k];
  }
  for (const [k, v] of Object.entries(OZEL)) sozluk[dil][k] = v[dil];
}

const sablon = readFileSync(join(KOK, "_gen", "yeni.src.html"), "utf8");
const isaret = "/*__I18N__*/null";
if (sablon.split(isaret).length !== 2) hata("sablonda sozluk isareti tek olmali");
mkdirSync(join(KOK, "yeni"), { recursive: true });
writeFileSync(join(KOK, "yeni", "index.html"), sablon.replace(isaret, JSON.stringify(sozluk)));
console.log("yazildi: yeni/index.html");
