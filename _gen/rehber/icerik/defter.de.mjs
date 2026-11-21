// Mein Bittgebetsheft (DE). Format: Kopf von _gen/build-rehber.mjs. Ablauf aus dem Code: app/dua-defteri*.tsx, app/prophetic-duas.tsx,
// components/duas/*, lib/duaDefter*.ts. Schaltflaechen per [[Schluessel]]; kein Geviertstrich, kein Dschauschan, kein Lohnversprechen.
export default {
  title: "Bittgebete aufschreiben: dein Bittgebetsheft in der App",
  desc: "Bittgebete aufschreiben und ordnen: Schreib deine Duas in Abschnitte, füge Verse, Bittgebete und Gottesnamen hinzu, stell Erinnerungen ein, teile als PDF.",
  h1: "Bittgebete aufschreiben: So führst du Mein Bittgebetsheft",
  crumb: "Mein Bittgebetsheft",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "Mein Bittgebetsheft ist ein Heft für deine eigenen Bittgebete (Duas) und für deine Bittgebete für die Menschen, die du liebst. Du schreibst sie in Abschnitte, fügst einen Vers, ein fertiges Bittgebet oder einen der Namen Allahs hinzu, stellst eine Erinnerung für deine Lesezeit ein und teilst dein Heft als PDF.",
  meta: ["Keine Einrichtung nötig", "Dein Heft bleibt auf deinem Handy", "Kostenlos"],
  film: { sahne: "film-defter", cap: "Öffne dein Heft über Bittgebete, schreib ein Bittgebet in Meine Liebsten und lies es dann." },

  kisa: {
    maddeler: [
      "Tippe im Tab [[tabs.read]] auf die Karte [[tx:read.duasTitle]] und wähle dort die Zeile [[tx:duaDefter.title]].",
      "Füge mit dem **+** oben rechts ein Bittgebet hinzu: Abschnitt wählen, auf Wunsch schreiben, für wen es ist, Bittgebet schreiben und [[duaDefter.save]] tippen.",
      "In den Bittgebeten, im Koran-Leser oder in der Liste der Namen Allahs holst du mit [[tx:duaDefter.addFromDua]] einen fertigen Text in dein Heft.",
      "Mit [[ol:duaDefter.read]] neben einem Abschnitt liest du deine Bittgebete nacheinander in großer Schrift; am Ende tippst du auf [[duaDefter.markPrayed]].",
      "Stell über die drei Punkte eines Abschnitts eine [[tx:duaDefter.remind]] ein; sie erinnert dich an den gewählten Tagen und zur gewählten Uhrzeit ans Lesen.",
      "Tippe auf das Drucksymbol und sende dein Heft oder einen Abschnitt mit [[tx:duaDefter.pdfShare]].",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Öffne dein Heft",
      giris: "Mein Bittgebetsheft öffnest du im Bildschirm [[tx:read.duasTitle]]; es ist kein eigener Tab.",
      adimlar: [
        {
          baslik: "Öffne Mein Bittgebetsheft im Bildschirm Bittgebete",
          metin: [
            "Tippe unten in der Leiste auf den Tab [[tabs.read]] und öffne die Karte [[tx:read.duasTitle]]. Unter dem Suchfeld und dem Ring [[tx:propheticDuas.halTitle]] steht die Zeile [[tx:duaDefter.title]]. Tippe darauf.",
            "Dein Heft kommt mit fertigen Abschnitten: [[tx:duaDefter.section.namaz]], [[tx:duaDefter.section.sabah]], [[tx:duaDefter.section.seher]], [[tx:duaDefter.section.yolculuk]], [[tx:duaDefter.section.cuma]], [[tx:duaDefter.section.kadir]] und [[tx:duaDefter.section.sevdiklerim]]. Beim ersten Öffnen sind alle leer.",
          ],
          ipucu: "Das Heft begegnet dir auch zu den Gebetszeiten: Trägst du in [[tx:prayerDetail.title]] ein Gebet ein oder beendest du die Gebets-Tasbihat, öffnet eine Zeile den Abschnitt [[tx:duaDefter.section.namaz]]. Trägst du Tahajjud ein, öffnet sich [[tx:duaDefter.section.seher]]. Ist der Abschnitt leer, erscheint die Zeile nicht.",
          sahne: "defter-ac",
        },
      ],
    },
    {
      tur: "bolum", id: "yaz", baslik: "Schreib deine Bittgebete auf",
      giris: "Du kannst ein Bittgebet mit eigenen Worten schreiben oder einen fertigen Text aus der App in dein Heft holen.",
      adimlar: [
        {
          baslik: "Ein Bittgebet hinzufügen",
          metin: "Tippe oben rechts auf **+** oder auf das **+** neben einem Abschnitt. Füll im Fenster die Felder aus und tippe auf [[duaDefter.save]]:",
          liste: [
            "[[tx:duaDefter.sectionLabel]]: der Abschnitt, in den das Bittgebet kommt.",
            "[[tx:duaDefter.forLabel]]: „Meine Mutter“, „mein Bruder Ali“ und so weiter. Du kannst es leer lassen.",
            "[[tx:duaDefter.textLabel]]: Schreib dein Bittgebet mit eigenen Worten oder hol einen kopierten Text mit [[tx:duaDefter.paste]].",
            "[[tx:duaDefter.moreFields]]: Auf Wunsch schreibst du auch das Arabische, die Umschrift und die Bedeutung dazu.",
          ],
          ipucu: "Tippst du auf ein Bittgebet, bearbeitest du es: Abschnitt ändern, nach oben oder unten schieben, teilen. Hältst du es gedrückt, fragt die App, ob du es löschen willst; gleich danach kannst du es mit [[tx:notice.undo]] zurückholen.",
          sahne: "defter-yaz",
        },
        {
          baslik: "Verse, Bittgebete und Namen Allahs hinzufügen",
          metin: [
            "Einen fertigen Text musst du nicht abtippen. Öffnest du im Bildschirm [[tx:read.duasTitle]] ein Bittgebet, tippst du in der Leiste darunter auf [[tx:duaDefter.addFromDua]]. Dieselbe Möglichkeit gibt es im Fenster, das sich öffnet, wenn du im Koran-Leser auf einen Vers tippst, und in der Liste der Namen Allahs (Asma al-Husna).",
            "Die App fragt [[tx:duaDefter.pickSection]]; wähle den Abschnitt. Der Text kommt mit seiner Quelle in dein Heft.",
          ],
          ipucu: "Derselbe Text kommt nicht zweimal in denselben Abschnitt; steht er schon dort, zeigt die Zeile dieses Abschnitts [[tx:duaDefter.inDefter]].",
          sahne: "defter-ekle",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", baslik: "Lesen, erinnern, teilen",
      giris: "Das Heft ist zum Beten genauso da wie zum Schreiben: Du liest einen Abschnitt von Anfang bis Ende und stellst eine Erinnerung für deine Lesezeit ein.",
      adimlar: [
        {
          baslik: "Lesen beginnen, dann Ich habe heute gebetet",
          metin: [
            "Neben einem Abschnitt mit Bittgebeten steht die Schaltfläche [[ol:duaDefter.read]]. Tippe darauf: Die Bittgebete des Abschnitts öffnen sich untereinander in großer Schrift. Bei Versen und fertigen Bittgebeten siehst du auch Arabisch, Bedeutung und Quelle.",
            "Mit den **A**-Tasten unten machst du die Schrift kleiner oder größer; [[tx:duaDefter.autoScroll]] scrollt die Seite in deinem Tempo. Am Ende tippst du auf [[duaDefter.markPrayed]].",
          ],
          fark: "An jedem Tag, an dem du betest, kommt eine Perle auf die Gebetskette oben in deinem Heft. Das Heft merkt sich auch, wo du warst: Öffnest du einen Abschnitt wieder, beginnt er beim zuletzt gelesenen Bittgebet.",
          ipucu: "Am Ende von [[tx:duaDefter.section.sevdiklerim]] stehen auch die Namen der Menschen, die dir ihre Bittgebete anvertraut haben; tippst du auf [[duaDefter.markPrayed]], werden sie mit eingetragen.",
          sahne: "defter-oku",
        },
        {
          baslik: "Abschnitt bearbeiten, Erinnerung einstellen",
          metin: [
            "Tippe auf die drei Punkte neben einem Abschnitt. Im Fenster kannst du ihn umbenennen, nach oben oder unten schieben, löschen oder eine [[tx:duaDefter.remind]] einstellen.",
            "Schalte die Erinnerung ein, wähle [[tx:duaDefter.remindEveryDay]] oder bestimmte Tage, stell die Uhrzeit ein und tippe auf [[duaDefter.save]]. Unter dem Abschnitt steht dann [[tx:duaDefter.remindOn]]. Die Mitteilung sagt nur: „Die Bittgebete, die du für heute vorgesehen hast, warten auf dich.“",
          ],
          ipucu: "Löschst du einen Abschnitt, wandern seine Bittgebete nach [[tx:duaDefter.section.other]]. Einen eigenen Abschnitt legst du mit [[ol:duaDefter.newSection]] unten in der Liste an.",
          sahne: "defter-hatirlat",
        },
        {
          baslik: "Als PDF teilen oder drucken",
          metin: "Tippe oben rechts auf das Drucksymbol. Wähle im Fenster [[tx:duaDefter.pdfTitle]] [[tx:duaDefter.pdfAll]] oder einen einzelnen Abschnitt und tippe dann auf [[duaDefter.pdfShare]] oder [[ol:duaDefter.pdfPrint]]. Die Seite entsteht in großer Schrift auf deinem Handy.",
          ipucu: "Haben Bittgebete einen Namen bei „für wen“, erscheint der Schalter [[tx:duaDefter.pdfNames]]. Er ist aus; Namen kommen nur ins PDF, wenn du ihn einschaltest.",
          sahne: "defter-pdf",
        },
      ],
    },
    {
      tur: "ikili", id: "gecmis", baslik: "Erhörte Bittgebete, dir anvertraute Bittgebete",
      giris: "Das Heft hat noch zwei Ecken: die Erinnerung an erhörte Bittgebete und die Liste der Menschen, die dich um ein Bittgebet gebeten haben.",
      kartlar: [
        { baslik: "Vergangene Bittgebete", metin: "Tippe auf ein Bittgebet und wähle [[tx:duaDefter.archive]]. Auf Wunsch schreibst du eine kurze Notiz, etwa „Alhamdulillah, meine Mutter ist genesen.“ Das Bittgebet verlässt seinen Abschnitt und steht mit Datum unter [[tx:duaDefter.past]]; du kannst es jederzeit zurückholen." },
        { baslik: "Mir anvertraute Bittgebete", metin: "Bittet dich jemand um ein Bittgebet, schreib seinen Namen in die Liste [[tx:emanet.title]]. Sie öffnet sich unten im Heft; du wirst erinnert, wenn du deinen Wird beendest und im Bittgebetsmoment deiner Tasbihat." },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "So sieht es in der App aus",
      giris: "Dieses Bild stammt aus der App selbst.",
      kareler: [
        { img: "z-defter", alt: "Mein Bittgebetsheft: Gebetskette, Du hast heute gebetet, Abschnitte Nach dem Gebet und Morgen mit Lesen beginnen", cap: "[[tx:duaDefter.title]]: Gebetskette und Abschnitte" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Wo wird mein Bittgebetsheft gespeichert?",
        c: "Dein Heft bleibt auf diesem Handy, und nur du siehst es. Um ein Bittgebet zu teilen, tippst du darauf und wählst [[tx:duaDefter.share]]; das ganze Heft kannst du als PDF senden." },
      { s: "Kommt mein Heft mit, wenn ich das Handy wechsle?",
        c: "Das Heft wird nur auf diesem Handy geführt und nicht mit deinem Konto abgeglichen. Schick es dir vor dem Wechsel mit [[tx:duaDefter.pdfShare]] selbst zu und bewahre es auf." },
      { s: "Wie viele Bittgebete kann ich aufschreiben?",
        c: "Du kannst bis zu 300 Bittgebete aufschreiben und bis zu 30 Abschnitte anlegen." },
      { s: "Wie füge ich ein arabisches Bittgebet hinzu?",
        c: "Tippe beim Hinzufügen auf [[tx:duaDefter.moreFields]]; Arabisch, Umschrift und Bedeutung schreibst du in eigene Felder. Verse und die fertigen Bittgebete der App musst du nicht abtippen, du fügst sie mit [[tx:duaDefter.addFromDua]] hinzu." },
      { s: "Kann ich Mein Bittgebetsheft mit dem Garten der Absichten verbinden?",
        c: "Ja. Pflanzt du im Garten der Absichten eine Bittgebets-Absicht, zählen die Tage, an denen du aus deinem Heft betest, und die Tage, an denen du einträgst, dass du für die dir anvertrauten Bittgebete gebetet hast. Mehr dazu: [Garten der Absichten](/de/anleitungen/garten-der-absichten/)." },
      { s: "Kostet das etwas?",
        c: "Alle Funktionen von Mein Bittgebetsheft sind kostenlos." },
    ],
  },

  ilgili: ["bahce", "teheccud", "zikir"],
  kart: { kicker: "Bittgebet", baslik: "Mein Bittgebetsheft", metin: "Schreib deine Bittgebete in Abschnitte, füge Verse und Namen Allahs hinzu, erinnere dich, teile als PDF." },
  onizleme: { sahne: "defter-kart", adim: 8 },
  cta: { baslik: "Beginne dein Bittgebetsheft", metin: "Lade Manevi Halka kostenlos und öffne Mein Bittgebetsheft über Bittgebete im Bildschirm Lesen." },
};
