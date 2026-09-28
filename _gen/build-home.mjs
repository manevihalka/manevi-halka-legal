#!/usr/bin/env node
/**
 * Ana sayfa ureticisi (28 Eyl 2026'dan beri, "Gunun Halkasi" tasarimi):
 *   _gen/home.src.html + _gen/site-i18n.js  ->  index.html (Ingilizce taban)
 *                                            ->  tr/index.html (Turkce)
 *                                            ->  yeni/index.html (eski onizleme adresi, koke yonlendirir)
 *   ve sitemap.xml'deki MH:LOCALES bolgesi.
 *
 * Tasarim /yeni/ adresinde (noindex) denendi, kullanici onayiyla koke tasindi.
 * Onceki ana sayfa elle bakimli bir index.html idi ve /tr/ ondan uretiliyordu
 * (_gen/build-locale-pages.mjs, artik yok). Korunan sozlesmeler:
 *  - KOK INGILIZCE TABAN, hreflang="en" + x-default; /en/ ACILMAZ (kokle ayni
 *    metni tasiyan ikinci kendine-kanonik sayfa demek). --check bunu hata sayar.
 *  - Baslik, aciklama, h1 ve govde metni STATIK yazilir (Agustos 2026: statik
 *    baslik bos birakilinca marka aramasi bile sonuc dondurmuyordu). Sablondaki
 *    her data-t dugumu o sayfanin dilinde doldurulur; JS yalniz dil degisince yazar.
 *  - Sozluk SOKULUR, KOPYALANMAZ (_gen/site-i18n.js, node:vm).
 *  - /tr/ sayfasinda dil ADRESTEN gelir; kayitli tercih onu ezemez.
 *
 * KULLANIM:
 *   node _gen/build-home.mjs           uretir ve yazar
 *   node _gen/build-home.mjs --check   uretir, yazmaz, fark varsa cikis 1
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const KOK = dirname(dirname(fileURLToPath(import.meta.url)));
const SITE = "https://manevihalka.app";
const KONTROL = process.argv.includes("--check");
const DILLER = ["tr", "en", "de", "fr", "ar"];
const SAYFALAR = ["en", "tr"];                      // statik adresi olan diller (kok = en)
const yol = (d) => (d === "en" ? SITE + "/" : `${SITE}/${d}/`);
const dosya = (d) => (d === "en" ? "index.html" : `${d}/index.html`);
const hata = (m) => { console.error("HATA: " + m); process.exit(1); };

// Sozlukten sayfaya giden anahtarlar (sayfaya ozgu olanlar asagida OZEL'de)
const ANAHTARLAR = ["title", "desc", "h1sub", "get", "ccTitle", "ccLead", "ccNote", "heroInviteTitle", "heroInviteSub",
  "heroInviteGo", "heroInviteSmall", "heroInviteCycle", "heroInviteNear", "heroInviteNear1", "privacy", "terms", "deleteAcc", "contact",
  "itaniCredit", "suffix", "introTitle", "taglineSub",
  "closeTitle", "closeText", "closeWish", "quoteText", "quoteSource"];

// Sayfaya ozgu metinler (sozlukte olmayanlar)
const OZEL = {
  yClose: { tr: "Kapat", en: "Close", de: "Schließen", fr: "Fermer", ar: "إغلاق" },
  // ── "Neler var" bolumu (28 Eyl 2026): halka sahnesi, tek seferlik halka,
  // her gun dort ozellik (gercek ekranlar img/app/<dil>/), "ve daha fazlasi".
  // ── Mâide 5:2 (28 Eyl 2026, kullanici onayi) ─────────────────────────────
  // Uygulamadaki tesvik metniyle ayni karar (lib/practiceEncouragement.ts D2,
  // docs/KARSILIKLI_MOD_TESVIK_METINLERI.md karar 4): TR Elmalili, EN Itani
  // HARFI HARFINE (CC BY-ND, "And" dahil). DE/FR meal izinleri cevapsiz oldugu
  // icin meal ALINTILANMAZ; anlam bizim cumlemizle, "sinngemaess / en substance"
  // diye acikca isaretli. AR'de yalniz ayetin asli.
  yVerseShort: { tr: "İyilik ve takva üzerinde yardımlaşın", en: "And cooperate with one another in virtuous conduct and conscience",
    de: "Einander in Güte und Gottesfurcht beistehen", fr: "S'entraider dans le bien et la piété", ar: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوٰى" },
  yVerseRef: { tr: "Mâide 5:2", en: "Al-Ma'idah 5:2", de: "nach Koran 5:2", fr: "d'après Coran 5:2", ar: "المائدة 5:2" },
  yVerseFull: { tr: "İyilik ve takva üzerinde yardımlaşın, günah ve düşmanlık üzerinde yardımlaşmayın.",
    en: "And cooperate with one another in virtuous conduct and conscience, and do not cooperate with one another in sin and hostility.",
    de: "Der Koran ruft dazu auf, einander in Güte und Gottesfurcht beizustehen und einander nicht in Sünde und Feindschaft zu helfen.",
    fr: "Le Coran appelle à s'entraider dans le bien et la piété, et à ne pas s'entraider dans le péché et l'hostilité.",
    ar: "" },
  yVerseCap: { tr: "Mâide 5:2 (bir bölümü)", en: "Al-Ma'idah 5:2 (excerpt)", de: "Sure al-Ma'ida 5:2, sinngemäß",
    fr: "Sourate al-Ma'ida 5:2, en substance", ar: "المائدة 5:2 (جزء من الآية)" },
  yPurpose: { tr: "Manevi Halka, bu yardımlaşmayı kolaylaştırmak için kuruldu.", en: "Manevi Halka was built to make this cooperation easier.",
    de: "Manevi Halka wurde geschaffen, um diese gegenseitige Hilfe leichter zu machen.", fr: "Manevi Halka a été créé pour faciliter cette entraide.",
    ar: "أُسِّس Manevi Halka لتيسير هذا التعاون." },
  // ── Bolum menusu (masaustu: ust menu; telefon: alttaki hap) ─────────────
  yNavTimes: { tr: "Vakitler", en: "Prayer times", de: "Gebetszeiten", fr: "Horaires", ar: "المواقيت" },
  yNavDaily: { tr: "Günün Ayeti", en: "Verse of the day", de: "Vers des Tages", fr: "Verset du jour", ar: "آية اليوم" },
  yNavApp: { tr: "Uygulama", en: "The app", de: "Die App", fr: "L'application", ar: "التطبيق" },
  yNavSections: { tr: "Bölümler", en: "Sections", de: "Bereiche", fr: "Sections", ar: "الأقسام" },
  yGetApp: { tr: "İndir", en: "Get the app", de: "App laden", fr: "Télécharger", ar: "حمّل التطبيق" },
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
  yHalkaP3: { tr: "Kur'an'ın yanında zikir ve kitap halkaları", en: "Besides the Quran: dhikr and book circles",
    de: "Neben dem Koran auch Dhikr- und Buchkreise", fr: "Outre le Coran : cercles de dhikr et de lecture",
    ar: "إلى جانب القرآن: حلقات الذكر والكتب" },
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
  // ⚠️ Sitede "Cevşen" mümkün olduğunca GEÇMEZ (kullanıcı kararı, 28 Eyl 2026):
  // uygulamada duruyor, indiren görür; sitenin genel kitlesine öne çıkarılmaz.
  a1: { tr: "Ana ekran ve kilit ekranı widget'ları", en: "Home and lock screen widgets", de: "Widgets für Start- und Sperrbildschirm",
    fr: "Widgets pour l'accueil et l'écran verrouillé", ar: "أدوات الشاشة الرئيسية وشاشة القفل" },
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
  yAppMore: { tr: "Uygulamayı yakından tanı", en: "Get to know the app", de: "Die App im Detail", fr: "Découvrir l'application en détail",
    ar: "تعرّف على التطبيق عن قرب" },
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

// ─── sozluk ─────────────────────────────────────────────────────────────────
const kutu = {};
vm.createContext(kutu);
vm.runInContext(readFileSync(join(KOK, "_gen", "site-i18n.js"), "utf8"), kutu);
const I18N = kutu.I18N;
if (!I18N) hata("_gen/site-i18n.js I18N tanimlamiyor");
{
  const ref = Object.keys(I18N.en).sort().join("|");
  for (const d of DILLER) if (Object.keys(I18N[d] || {}).sort().join("|") !== ref) hata(`${d} anahtar kumesi en ile ayrisik`);
}
const sozluk = {};
for (const d of DILLER) {
  sozluk[d] = {};
  for (const k of ANAHTARLAR) {
    if (I18N[d][k] == null) hata(`I18N.${d}.${k} yok`);
    sozluk[d][k] = I18N[d][k];
  }
  for (const [k, v] of Object.entries(OZEL)) {
    if (v[d] == null) hata(`OZEL.${k}.${d} yok`);
    sozluk[d][k] = v[d];
  }
}

// ─── kokun bugunku statik bas bilgisi, BIREBIR (arama gorunurlugu) ──────────
// Kokun aciklamasi sozluktekinden bilerek biraz uzun ("for iPhone and Android").
const KOK_BASLIK = I18N.en.title;
const KOK_ACIKLAMA = "Share the juz with your circle, read in turns and complete the khatm together. Prayer times from the Diyanet calendar, qibla, dhikr counter and duas, in one app for iPhone and Android.";
const KOK_OG_ACIKLAMA = "Build khatm and dhikr circles together. Prayer times, qibla and dhikr counter in one app.";
const OG_LOCALE = { tr: "tr_TR", en: "en_US", de: "de_DE", fr: "fr_FR", ar: "ar_AR" };

const kacir = (x) => String(x).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const kacirMetin = (x) => String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function hreflang() {
  return [["tr", yol("tr")], ["en", yol("en")], ["x-default", yol("en")]]
    .map(([h, u]) => `<link rel="alternate" hreflang="${h}" href="${u}">`).join("\n");
}

function jsonLd(dil) {
  const t = I18N[dil];
  const sayfa = dil === "en" ? [] : [{
    "@type": "WebPage", "@id": `${yol(dil)}#page`, url: yol(dil), name: t.title, description: t.desc,
    inLanguage: dil, isPartOf: { "@id": `${SITE}/#site` },
  }];
  // ⚠️ aggregateRating EKLEME (gercek puanimiz yok). Fiyat "0": uygulama ucretsiz,
  // abonelik rakami buraya YAZILMAZ (App Store 3.1.2(c) reddinin dersi).
  const graph = [...sayfa,
    { "@type": "Organization", "@id": `${SITE}/#org`, name: "Manevi Halka", url: `${SITE}/`, logo: `${SITE}/icon.png`, email: "support@manevihalka.app" },
    { "@type": "WebSite", "@id": `${SITE}/#site`, url: `${SITE}/`, name: "Manevi Halka", publisher: { "@id": `${SITE}/#org` }, inLanguage: DILLER },
    { "@type": "MobileApplication", "@id": `${SITE}/#app`, name: "Manevi Halka", operatingSystem: "iOS, Android",
      applicationCategory: "LifestyleApplication", url: `${SITE}/`, image: `${SITE}/icon.png`,
      description: "Shared Qur'an khatm and dhikr circles, with prayer times, qibla and a dhikr counter.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }, publisher: { "@id": `${SITE}/#org` },
      sameAs: ["https://apps.apple.com/app/manevi-halka/id6760654292", "https://play.google.com/store/apps/details?id=com.emrhnayz.spiritualcircle"] },
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).replace(/</g, "\\u003c");
}

function basBilgisi(dil) {
  const t = I18N[dil];
  const kok = dil === "en";
  const baslik = kok ? KOK_BASLIK : t.title;
  const aciklama = kok ? KOK_ACIKLAMA : t.desc;
  const og = kok
    ? [`<meta property="og:title" content="Manevi Halka">`, `<meta property="og:description" content="${kacir(KOK_OG_ACIKLAMA)}">`,
       `<meta property="og:url" content="${SITE}">`]
    : [`<meta property="og:title" content="${kacir(t.title)}">`, `<meta property="og:description" content="${kacir(t.desc)}">`,
       `<meta property="og:url" content="${yol(dil)}">`, `<meta property="og:locale" content="${OG_LOCALE[dil]}">`,
       ...DILLER.filter((d) => d !== dil).map((d) => `<meta property="og:locale:alternate" content="${OG_LOCALE[d]}">`)];
  return `<title>${kacirMetin(baslik)}</title>
<meta name="description" id="metaDesc" content="${kacir(aciklama)}">
<link rel="canonical" href="${yol(dil)}">
${hreflang()}
<!-- Bing Webmaster Tools dogrulamasi (ayni jeton /BingSiteAuth.xml'de). Silme. -->
<meta name="msvalidate.01" content="421BAE343948124460D5A58C05177ED3">
<!-- iOS Safari'nin kendi kurulum seridi: uygulama kuruluysa "Ac" der. -->
<meta name="apple-itunes-app" content="app-id=6760654292">
<meta name="theme-color" content="#1e4d35">
<!-- Vakitler bu alan adindan cekiliyor: el sikismayi erken baslat -->
<link rel="preconnect" href="https://ezanvakti.emushaf.net" crossorigin>
<link rel="dns-prefetch" href="https://ezanvakti.emushaf.net">
${og.join("\n")}
<meta property="og:image" content="${SITE}/og-cover-${dil}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="/icon.png">
<link rel="apple-touch-icon" href="/icon.png">
<script type="application/ld+json">
${jsonLd(dil)}
</script>`;
}

function degistir(s, eski, yeni, adet, etiket) {
  const c = s.split(eski).length - 1;
  if (c !== adet) hata(`${etiket}: ${c} kez bulundu, ${adet} bekleniyordu`);
  return s.split(eski).join(yeni);
}

const sablon = readFileSync(join(KOK, "_gen", "home.src.html"), "utf8");

function sayfa(dil) {
  const t = sozluk[dil];
  let s = sablon;
  s = degistir(s, "<!DOCTYPE html>", `<!DOCTYPE html>
<!-- ⚠️ BU DOSYA URETILMISTIR, ELLE DUZENLEME. Kaynak: _gen/home.src.html + _gen/site-i18n.js
     Uretici: node _gen/build-home.mjs · dil=${dil} -->`, 1, "damga");
  s = degistir(s, '<html lang="__LANG__" dir="__DIR__">', `<html lang="${dil}" dir="${dil === "ar" ? "rtl" : "ltr"}">`, 1, "html lang");
  s = degistir(s, "<!--__HEAD__-->", basBilgisi(dil), 1, "bas bilgisi");

  // Govde metni: her data-t dugumu bu dilde. Ic HTML'i olan dugume dokunulmaz
  // (JS de yalniz textContent yaziyor, yani oyle bir dugum olmamali: hata).
  let yazilan = 0;
  s = s.replace(/(<([a-z0-9]+)\b[^>]*\bdata-t="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g, (tam, ac, etiket, anahtar, icerik, kapa) => {
    if (!(anahtar in t)) hata(`${dil}: data-t="${anahtar}" sozlukte yok`);
    if (/<[a-z]/i.test(icerik)) hata(`${dil}: data-t="${anahtar}" dugumunun ic HTML'i var`);
    yazilan++;
    return ac + kacirMetin(t[anahtar]) + kapa;
  });
  const toplam = (sablon.match(/\bdata-t="/g) || []).length;
  if (yazilan !== toplam) hata(`${dil}: ${toplam} data-t dugumunden ${yazilan} tanesi yazildi`);
  s = s.replace(/(\bdata-t-aria="([^"]+)"[^>]*?aria-label=")[^"]*(")/g, (tam, on, anahtar, son) => {
    if (!(anahtar in t)) hata(`${dil}: data-t-aria="${anahtar}" sozlukte yok`);
    return on + kacir(t[anahtar]) + son;
  });

  // Politika baglantilari, dil kodu, ekran gorselleri
  const ek = t.suffix || "";
  s = degistir(s, 'href="/privacy-en.html"', `href="/privacy${ek}.html"`, 1, "privacy");
  s = degistir(s, 'href="/terms-en.html"', `href="/terms${ek}.html"`, 1, "terms");
  s = degistir(s, 'href="/account-delete-en.html"', `href="/account-delete${ek}.html"`, 1, "account-delete");
  s = degistir(s, '<span id="langCode">EN</span>', `<span id="langCode">${dil.toUpperCase()}</span>`, 1, "langCode");
  s = s.split("/img/app/en/").join(`/img/app/${dil}/`);
  s = s.replace(/data-alt="([^"]+)"( src="[^"]*") alt=""/g, (tam, anahtar, src) => {
    if (!(anahtar in t)) hata(`${dil}: data-alt="${anahtar}" sozlukte yok`);
    return `data-alt="${anahtar}"${src} alt="${kacir(t[anahtar])}"`;
  });
  if (dil !== "en") s = degistir(s, '<a class="brand" href="/">', `<a class="brand" href="/${dil}/">`, 1, "marka baglantisi");
  s = degistir(s, 'href="/app/" data-app-link', `href="${dil === "en" ? "/app/" : "/" + dil + "/app/"}" data-app-link`, 2, "uygulama sayfasi");

  // Sozluk: kok bes dili tasir (dil tercihine gore yerinde degisir), /tr/ yalniz kendini
  const gomulu = dil === "en" ? sozluk : { [dil]: t };
  s = degistir(s, "/*__I18N__*/null", JSON.stringify(gomulu).replace(/</g, "\\u003c"), 1, "sozluk");
  s = degistir(s, "/*__PAGE_LANG__*/null", dil === "en" ? "null" : JSON.stringify(dil), 1, "sayfa dili");

  if (/__[A-Z_]+__/.test(s.replace(/\/\*__[A-Z_]+__\*\//g, ""))) hata(`${dil}: doldurulmamis yer tutucu kaldi`);
  if (s.startsWith("---")) hata("cikti front matter ile basliyor (Jekyll isler)");
  return s;
}

// /yeni/ onizleme adresi: kaldirilmadi, koke yonlendirir (paylasilmis olabilir)
const YENI = `<!DOCTYPE html>
<!-- /yeni/ 28 Eyl 2026'da yeni tasarimin onizleme adresiydi; tasarim ana sayfaya
     tasindi. Paylasilmis baglanti bozulmasin diye koke yonlendirir.
     Uretici: node _gen/build-home.mjs -->
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex">
<link rel="canonical" href="${SITE}/">
<meta http-equiv="refresh" content="0; url=/">
<title>Manevi Halka</title>
<script>location.replace("/" + location.hash);</script>
</head>
<body><p><a href="/">manevihalka.app</a></p></body>
</html>
`;

// ─── uret ───────────────────────────────────────────────────────────────────
if (existsSync(join(KOK, "en", "index.html"))) hata("en/index.html VAR. Kok zaten Ingilizce, /en/ kopya sayfa yaratir.");
const ciktilar = new Map();
for (const d of SAYFALAR) ciktilar.set(join(KOK, dosya(d)), sayfa(d));
ciktilar.set(join(KOK, "yeni", "index.html"), YENI);

// Site haritasi: statik dil sayfalari (kok zaten elle yazili)
const HARITA = join(KOK, "sitemap.xml");
const lastmodsuz = (x) => x.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, "");
{
  const sm = readFileSync(HARITA, "utf8");
  const bas = "<!-- MH:LOCALES:BASLA -->", bit = "<!-- MH:LOCALES:BITIS -->";
  const i = sm.indexOf(bas), j = sm.indexOf(bit);
  if (i < 0 || j < 0) hata("sitemap.xml'de MH:LOCALES isaretleri yok");
  const bugun = new Date().toISOString().slice(0, 10);
  const satir = SAYFALAR.filter((d) => d !== "en").map((d) => `  <url>\n    <loc>${yol(d)}</loc>\n    <lastmod>${bugun}</lastmod>\n  </url>`).join("\n");
  ciktilar.set(HARITA, sm.slice(0, i + bas.length) + "\n" + satir + "\n" + sm.slice(j));
}

// Harita yalniz tarih yuzunden farkli sayilmaz; ama bir dil sayfasi degistiyse
// tarihi de tazelenir (arama motoruna "yeniden tara" isareti).
const sayfaDegisti = SAYFALAR.some((d) => {
  const p = join(KOK, dosya(d));
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
