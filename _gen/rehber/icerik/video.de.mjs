// Versvideo (DE). Format: Kopf von _gen/build-rehber.mjs. Ablauf: components/quranVideo/VideoExportScreen.tsx.
// Knopfnamen kommen über [[Schlüssel]] aus der App; keine langen Striche, kein Dschauschan, keine Preise. Anrede: du.
export default {
  title: "Koranvers-Video erstellen: Verse als Video teilen",
  desc: "Mach aus Koranversen deiner Wahl ein Video, mit einem Rezitator oder deiner eigenen Stimme: 9:16, 4:5 oder quadratisch. Es entsteht auf deinem Handy.",
  h1: "So machst du ein Video aus Koranversen",
  crumb: "Versvideo",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "In Manevi Halka machst du aus den Versen deiner Wahl ein Video mit Rezitation und einer Szene. Du wählst einen Rezitator oder nimmst deine eigene Stimme auf, und das Format passt du dem Ort an, an dem du teilst: Vollbild für Storys, Beitrag oder Quadrat für den Feed. Das Video entsteht auf deinem Handy; danach speicherst du es oder teilst es, wo du möchtest.",
  meta: ["Bis zu 90 Sekunden", "Entsteht auf deinem Handy", "Kostenlos"],
  film: { sahne: "film-video", cap: "Ein Video von Anfang bis Ende: Format wählen, erstellen, teilen." },

  kisa: {
    maddeler: [
      "Öffne den Koran über den Tab [[tabs.read]], wechsle zu [[quranArea.tabListen]] und tippe auf der Karte [[tx:quranVideo.entryTitle]] auf [[quranVideo.title]]. Beim Lesen kannst du auch einen Vers gedrückt halten und [[quranVideo.shareAsVideo]] wählen.",
      "Wähle unter [[tx:quranVideo.sectionRange]] die Sure und lege mit [[tx:quranVideo.fromAyah]] und [[tx:quranVideo.toAyah]] den Bereich fest.",
      "Wähle unter [[tx:quranVideo.sectionFormat]], was zum Ort passt, an dem du teilst: 9:16, 4:5 oder 1:1.",
      "Wähle unter [[tx:quranVideo.sectionVoice]] einen [[tx:quranVideo.sectionReciter]] oder [[tx:quranVideo.voice.own]] und rezitiere die Verse selbst.",
      "Tippe auf [[quranVideo.make]] und bleib in der App, während das Video entsteht.",
      "Schick es mit [[quranVideo.share]] oder behalte es mit [[quranVideo.saveToPhotos]]. Alles, was du erstellst, findest du unter [[tx:quranVideo.myVideos]].",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Den Video-Bildschirm öffnen",
      giris: "Das Versvideo liegt im Koran-Bereich der App. Es gibt zwei Wege dorthin; beide öffnen denselben Bildschirm.",
      adimlar: [
        {
          baslik: "Über den Tab Hören im Koran",
          metin: [
            "Tippe unten in der Leiste auf den Tab [[tabs.read]] und öffne die Koran-Karte. Unten im Koran-Bildschirm liegen in einer Kapsel die Tabs [[tx:quranArea.tabRead]], [[tx:quranArea.tabListen]], [[tx:quranArea.tabStudy]] und [[tx:saved.title]]; wechsle zu [[tx:quranArea.tabListen]].",
            "Tippe unter den Hörszenen auf der Karte [[tx:quranVideo.entryTitle]] auf [[quranVideo.title]]. Hörst du gerade etwas, beginnt das Video beim rezitierten Vers, sonst beim ersten Vers der Seite, an der du stehen geblieben bist.",
          ],
          sahne: "video-giris",
        },
        {
          baslik: "Beim Lesen über einen Vers",
          metin: "Halte beim Lesen den Vers gedrückt, den du im Video haben möchtest. Tippe ganz unten im Menü auf [[tx:quranVideo.shareAsVideo]]; das Video beginnt bei diesem Vers.",
          ipucu: "Auch das Teilen-Symbol oben rechts in einer Hörszene öffnet diesen Bildschirm. Das Video beginnt dann mit der Szene, die du gerade siehst, und dem Vers, der gerade rezitiert wird.",
          sahne: "video-ayet",
        },
      ],
    },
    {
      tur: "bolum", id: "hazirla", baslik: "Dein Video vorbereiten",
      giris: "Oben auf dem Bildschirm steht eine Vorschau des Videos. Änderst du eine Einstellung, spielt die Vorschau den ersten Vers leise von vorn; so siehst du vor dem Erstellen, wie das Video aussieht.",
      adimlar: [
        {
          baslik: "Den Versbereich wählen",
          metin: [
            "Unter [[tx:quranVideo.sectionRange]] wählst du mit [[ol:quranVideo.change]] neben dem Surennamen eine andere Sure. Mit Minus und Plus in [[tx:quranVideo.fromAyah]] und [[tx:quranVideo.toAyah]] verkleinerst oder vergrößerst du den Bereich.",
            "Unter der Vorschau stehen die ungefähre Länge und die Zahl der Verse, zum Beispiel „Etwa 0:29 · 2 Verse“.",
          ],
          ipucu: "Ein Video hat höchstens 90 Sekunden oder 30 Verse. Für einen längeren Abschnitt machst du mehrere Videos. Der WhatsApp Status nimmt Videos bis 60 Sekunden; wird es länger, erinnert dich der Bildschirm daran.",
          sahne: "video-aralik",
        },
        {
          baslik: "Das Format wählen",
          metin: "Unter [[tx:quranVideo.sectionFormat]] gibt es drei Karten. Jedes neue Video beginnt mit 9:16:",
          liste: [
            "**9:16** [[tx:quranVideo.formatName.tall]]: für Storys, Status und Kurzvideos; füllt den ganzen Bildschirm.",
            "**4:5** [[tx:quranVideo.formatName.portrait]]: für Beiträge im Instagram- und Facebook-Feed.",
            "**1:1** [[tx:quranVideo.formatName.square]]: für einen quadratischen Beitrag; passt in jeden Feed und Chat.",
          ],
          fark: "Die Vorschau wird im gewählten Format gezeichnet. In den kürzeren Formaten werden Schrift und Signatur passend kleiner.",
          sahne: "video-bicim",
        },
        {
          baslik: "Szene und Übersetzung wählen",
          metin: [
            "Unter [[tx:quranScenes.sectionStyle]] wählst du den Look des Videos: [[tx:quranScenes.styles.manzara]], [[tx:quranScenes.styles.ink]], [[tx:quranScenes.styles.kubbe]] oder [[tx:quranScenes.styles.pastel]]. Direkt darunter wählst du die Landschaft, die Farbe oder das Bild.",
            "Ist [[tx:quranVideo.sectionMeal]] an, steht die Übersetzung unter dem Vers; zur Wahl stehen derzeit türkische und englische Übersetzungen. Schaltest du sie aus, zeigt das Video nur den arabischen Text.",
          ],
          ipucu: "Eine Landschaft wird beim Auswählen auf dein Handy geladen; bis dahin zeigt der Knopf unten den Fortschritt in Prozent. Du lädst sie einmal, danach geht es auch offline.",
          sahne: "video-sahne",
        },
        {
          baslik: "Den Rezitator wählen",
          metin: "Ist unter [[tx:quranVideo.sectionVoice]] [[tx:quranVideo.sectionReciter]] gewählt, wählst du mit [[ol:quranVideo.change]] neben seinem Namen einen anderen Rezitator aus der Liste. Der Bildschirm öffnet mit dem Rezitator, den du zuletzt gehört hast; deine Wahl hier gilt nur für dieses Video.",
          sahne: "video-kari",
        },
        {
          baslik: "Oder die Verse mit deiner eigenen Stimme rezitieren",
          metin: [
            "Tippe auf [[tx:quranVideo.voice.own]] und dann auf die Zeile [[tx:quranVideo.voice.record]]. Auf dem Aufnahme-Bildschirm steht der Vers, den du rezitierst, in großer Schrift.",
            "Tippe auf [[quranVideo.voice.start]] und beginne. Wenn du einen Vers beendet hast, tippe auf [[quranVideo.voice.next]]; beim letzten Vers heißt der Knopf [[quranVideo.voice.finish]]. Im Video wechseln die Verse genau dort, wo du sie rezitiert hast. Du kannst deine Aufnahme anhören und mit [[ol:quranVideo.voice.again]] neu aufnehmen.",
          ],
          ipucu: "Die Aufnahme bleibt nur auf diesem Handy und wird nur für dieses Video verwendet; sie wird gelöscht, wenn du den Video-Bildschirm verlässt. Änderst du den Versbereich, nimmst du neu auf.",
          sahne: "video-kendi",
        },
      ],
    },
    {
      tur: "bolum", id: "paylas", baslik: "Erstellen, speichern und teilen",
      giris: "Das Video entsteht auf deinem Handy. Du entscheidest, wohin es geht: in einen Chat, in eine Story oder nur in deine eigene Galerie.",
      adimlar: [
        {
          baslik: "Das Video erstellen",
          metin: [
            "Tippe unten auf [[quranVideo.make]]. Zuerst wird der Ton der Verse vorbereitet, dann das Video; der Balken zeigt, wie viel noch fehlt.",
            "Bleib währenddessen in der App. Der Bildschirm bleibt an; verlässt du die App, hält die Erstellung an und du kannst sie neu starten.",
          ],
          ipucu: "Der Ton des Rezitators kommt aus dem Internet. Ist der Ton dieser Verse schon auf deinem Handy, etwa weil du die Sure zum Offline-Hören geladen hast, entsteht das Video auch offline.",
          sahne: "video-olustur",
        },
        {
          baslik: "Teilen oder speichern",
          metin: [
            "Auf dem Bildschirm [[tx:quranVideo.readyTitle]] läuft das Video mit Ton. [[quranVideo.share]] öffnet das Teilen-Fenster deines Handys; so schickst du es an WhatsApp, Instagram oder jede andere App.",
            "[[quranVideo.saveToPhotos]] legt das Video in Fotos ab. Unter Android heißt dieser Knopf [[quranVideo.saveToGallery]].",
          ],
          fark: "Unten in jedem Video stehen eine kleine Manevi-Halka-Signatur, der Name des Rezitators und eine Quellenzeile. In einem Video mit deiner eigenen Stimme steht kein Rezitatorname.",
          sahne: "video-paylas",
        },
        {
          baslik: "Zu deinen Videos zurückkehren",
          metin: "Jedes Video, das du erstellst, landet unter [[tx:quranVideo.myVideos]]. Zur Liste kommst du über den Knopf auf dem Bildschirm [[tx:quranVideo.readyTitle]], über das Film-Symbol oben rechts im Video-Bildschirm oder im Koran über den Bereich [[tx:quranVideo.tabVideos]] im Tab [[tx:saved.title]]. Jede Zeile hat Knöpfe zum Teilen, Speichern und Löschen; tippst du auf das Vorschaubild, läuft das Video.",
          ipucu: "Videos werden auf diesem Handy gespeichert und sind nicht Teil deines Backups; bei wenig Speicher kann das System sie löschen. Sichere die, die du behalten willst, in Fotos oder in der Galerie.",
          sahne: "video-liste",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "So sieht es in der App aus",
      giris: "Diese Bilder stammen aus der App selbst: dieselben Verse in drei Formaten.",
      kareler: [
        { img: "v-video", alt: "Bildschirm Video erstellen: Al-Mulk 1-2, 9:16 Vollbild gewählt, Vers und Mond in der Vorschau", cap: "9:16 [[tx:quranVideo.formatName.tall]]" },
        { img: "v-45", alt: "Bildschirm Video erstellen: 4:5 Beitrag gewählt, breitere Vorschau", cap: "4:5 [[tx:quranVideo.formatName.portrait]]" },
        { img: "v-11", alt: "Bildschirm Video erstellen: 1:1 Quadrat gewählt, quadratische Vorschau", cap: "1:1 [[tx:quranVideo.formatName.square]]" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Kostet ein Versvideo etwas?",
        c: "Videos zu erstellen, zu speichern und zu teilen ist kostenlos; nur einige Landschaften, Kuppeln und Bilder gehören zu Premium." },
      { s: "Wie lang darf ein Video sein?",
        c: "Ein Video hat höchstens 90 Sekunden oder 30 Verse. Für einen längeren Abschnitt machst du mehrere Videos. Der WhatsApp Status nimmt Videos bis 60 Sekunden; wird es länger, erinnert dich der Bildschirm daran." },
      { s: "Wo bleibt meine eigene Aufnahme?",
        c: "Die Aufnahme bleibt nur auf diesem Handy und wird nur für dieses Video verwendet. Sie wird gelöscht, wenn du den Video-Bildschirm verlässt; das fertige Video bleibt unter [[tx:quranVideo.myVideos]]." },
      { s: "Was steht unten im Video?",
        c: "Eine kleine Manevi-Halka-Signatur, der Name des Rezitators und eine Quellenzeile (Quran data provided by Quran.Foundation). In einem Video mit deiner eigenen Stimme steht kein Rezitatorname. Bei jedem Vers stehen oben in der Szene der Surenname und die Versnummer." },
      { s: "Wie lange bleiben meine Videos auf dem Handy?",
        c: "Videos werden auf diesem Handy gespeichert und sind nicht Teil deines Backups; bei wenig Speicher kann das System sie löschen. Sichere die, die du behalten willst, in Fotos oder unter Android in der Galerie. Geteilte Kopien bleiben dort, wohin du sie geschickt hast." },
      { s: "Gibt es das auch unter Android?",
        c: "Ja. Das Versvideo läuft auf dem iPhone und unter Android ab Version 8.0. Der Knopf zum Speichern in der Galerie erscheint ab Android 10; auf älteren Versionen schickst du das Video mit [[quranVideo.share]]." },
    ],
  },

  ilgili: ["buyuk", "hatim", "defter"],
  kart: { kicker: "Koran", baslik: "Koranvers-Video", metin: "Mach aus Versen deiner Wahl ein Video, mit Rezitator oder eigener Stimme; speichern und teilen." },
  onizleme: { sahne: "video-kart", adim: 6 },
  cta: { baslik: "Mach dein erstes Versvideo", metin: "Lade Manevi Halka kostenlos, öffne im Koran den Tab Hören und erstelle dein Video." },
};
