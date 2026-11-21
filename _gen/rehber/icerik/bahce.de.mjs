// Garten der Absichten (DE). Format: Kopf von _gen/build-rehber.mjs. Ablauf aus dem Code: app/bahce/*, components/garden/*, lib/garden/*.
// Schaltflaechen kommen per [[Schluessel]] aus der App; kein Geviertstrich, kein Dschauschan, kein Lohnversprechen.
export default {
  title: "Garten der Absichten: Absicht pflanzen, dranbleiben",
  desc: "Im Garten der Absichten wird jede Absicht zum Setzling. Wähle einen kleinen Schritt für Koran, Gebet, Dhikr oder Sadaqa, bleib dran und sieh ihn wachsen.",
  h1: "Garten der Absichten: So pflanzt du eine Absicht und lässt sie wachsen",
  crumb: "Garten der Absichten",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "Im Garten der Absichten wählst du einen kleinen, regelmäßigen Schritt für deinen eigenen Gottesdienst. Jede Absicht wird zu einem Setzling, der wächst, wenn du sie einhältst. Deinen Garten siehst nur du, und wenn du eine Pause brauchst, wartet dein Garten auf dich.",
  meta: ["Erste Absicht in etwa 1 Minute", "Deinen Garten siehst nur du", "Kostenlos"],
  film: { sahne: "film-bahce", cap: "Eine erste Absicht: Koranlesung wählen, zwei Seiten am Tag, Setzling pflanzen." },

  kisa: {
    maddeler: [
      "Öffne in der App den Tab [[tabs.read]] und tippe auf die Karte [[tx:garden.name]]. Beim ersten Mal öffnet sich eine kurze Einführung.",
      "Tippe auf [[garden.plant]]. Wähle ein fertiges Beispiel oder eine Tat unter [[tx:garden.flow.already]].",
      "Wähle, wie oft und mindestens wie viel du tust, und tippe auf [[common.continue]].",
      "Wähle deinen Setzling, schreib deine Absicht auf Wunsch in einem Satz und tippe auf [[garden.flow.plantBtn]].",
      "Mach jeden Tag deinen Schritt in der Liste [[tx:garden.today]]. Seiten, die du in der App liest, Gebete, die du einträgst, und Dhikr, den du zählst, werden von selbst gezählt.",
      "Wenn du eine Pause brauchst, nutze [[tx:garden.rest.title]]; an diesen Tagen welken deine Pflanzen nicht.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Öffne deinen Garten",
      giris: "Der Garten der Absichten ist eine der Karten im Bildschirm [[tx:tabs.read]]. Er ist für deinen eigenen Gottesdienst; du brauchst keinen Kreis.",
      adimlar: [
        {
          baslik: "Öffne den Garten der Absichten im Bildschirm Lesen",
          metin: [
            "Tippe unten in der Leiste auf den Tab [[tabs.read]]. Such unter den Karten die Karte [[tx:garden.name]]; weil sie neu ist, steht in ihrer Ecke [[tx:garden.newTag]]. Tippe auf die Karte.",
            "Beim ersten Mal öffnet sich eine kurze Einführung mit drei Seiten. Geh mit [[common.continue]] weiter; die Schaltfläche [[garden.firstPlant]] auf der letzten Seite bringt dich direkt zum Pflanzen. Du kannst sie oben auch mit [[ol:garden.introScreen.skip]] überspringen.",
          ],
          ipucu: "Danach öffnet die Karte die Liste [[tx:garden.list.title]]. In den Garten selbst kommst du über das Bild oben in der Liste, dort wo [[tx:garden.list.enter]] steht.",
          sahne: "bahce-ac",
        },
      ],
    },
    {
      tur: "bolum", id: "dik", baslik: "Pflanze deine erste Absicht",
      giris: "Eine Absicht pflanzt du in drei Schritten: welche Tat, wie oft, welcher Setzling.",
      adimlar: [
        {
          baslik: "Wähle die Tat",
          metin: "Tippe auf [[garden.plant]]. Der erste Bildschirm fragt [[tx:garden.flow.step1]] und zeigt drei Gruppen:",
          liste: [
            "[[tx:garden.example.title]]: drei fertige Absichten. Tippst du eine an, sind die Einstellungen schon ausgefüllt und du gehst direkt zur Wahl des Setzlings.",
            "[[tx:garden.flow.already]]: Koranlesung, Gebet, Dhikr, Wird, Auswendiglernen, Bücher lesen, Nachholgebete, Nachholfasten und Gebets-Tasbihat. Tust du das in der App, liest der Garten deinen Eintrag von dort.",
            "[[tx:garden.flow.new]]: Fasten, Sadaqa, Lesen aus einem gedruckten Mushaf und Bittgebet. Ganz unten kannst du mit [[tx:garden.free.custom]] deiner eigenen Absicht einen Namen geben.",
          ],
          sahne: "bahce-sec",
        },
        {
          baslik: "Wähle, wie oft und mindestens wie viel",
          metin: [
            "Wähle unter [[tx:garden.flow.rhythmLabel]] [[tx:garden.rhythm.daily]], [[tx:garden.rhythm.days]] oder [[tx:garden.rhythm.weekly]]. Stell dann den kleinsten Schritt ein: Seiten bei der Koranlesung, Gebete beim Gebet, eine Anzahl beim Dhikr. Für die Koranlesung sind 2 Seiten am Tag voreingestellt.",
            "Tippe auf [[common.continue]].",
          ],
          ipucu: "Halte es klein. Wie der Bildschirm sagt: An Tagen mit mehr Zeit zählt das Mehr auch.",
          sahne: "bahce-ritim",
        },
        {
          baslik: "Wähle deinen Setzling und pflanze ihn",
          metin: [
            "Im letzten Schritt ist der Setzling schon gewählt, den die Tat vorschlägt; bei der Koranlesung: [[tx:garden.kind.turunc]]. Du kannst im Streifen darunter eine andere Art wählen oder mit [[tx:garden.flow.allKinds]] alle sehen.",
            "Schreib auf Wunsch deine Absicht in einem Satz in das Feld [[tx:garden.flow.textLabel]]; diesen Satz siehst nur du. Tippe auf [[garden.flow.plantBtn]]: Dein Setzling nimmt seinen Platz im Garten ein.",
          ],
          fark: "Auf der Karte jedes Setzlings steht ein Abschnitt [[tx:garden.about.title]]: ein Vers oder Hadith, in dem die Pflanze vorkommt, oder eine Feinheit ihrer Schöpfung.",
          ipucu: "Nach deiner ersten Absicht bietet die App einmal eine Abenderinnerung an: Ist die Absicht des Tages noch offen, kommt um 21:00 Uhr ein kurzer Hinweis. Uhrzeit ändern oder ausschalten kannst du über das Symbol [[tx:garden.reminder.title]] im Garten.",
          sahne: "bahce-fidan",
        },
      ],
    },
    {
      tur: "bolum", id: "buyut", baslik: "Lass deinen Garten wachsen",
      giris: "Unter dem Garten steht die Liste [[tx:garden.today]]: die Absichten, die heute dran sind, und wie viele erledigt sind.",
      adimlar: [
        {
          baslik: "Mach deinen Schritt in der Liste Heute",
          metin: [
            "Bei einer Absicht ohne Gegenstück in der App, zum Beispiel Sadaqa, tippst du auf [[garden.act.didToday]]. Die Zeile wird abgehakt und dein Setzling wächst sofort.",
            "Bei einer Absicht, die mit einer Tat verbunden ist, steht auf der Schaltfläche [[ol:common.continue]]; sie bringt dich zu diesem Bildschirm: zum Koran-Leser, zu [[tx:prayerDetail.title]] oder zu [[tx:read.zikirmatikTitle]]. Was du dort tust, wird von selbst gezählt; du musst nichts extra abhaken.",
          ],
          ipucu: "Der Gartentag wechselt zur Fadschr-Zeit (Imsak). Dhikr oder Seiten nach Mitternacht zählen noch zum Vortag.",
          sahne: "bahce-bugun",
        },
        {
          baslik: "Verbinde Nachholgebete und Bittgebete",
          metin: [
            "Wählst du unter [[tx:garden.flow.already]] die Kachel [[tx:garden.src.kaza]], wird die Absicht mit [[tx:kaza.titleN]] verbunden: Jedes nachgeholte Gebet, das du am selben Tag einträgst, zählt auch im Garten. Ist deine Übersicht noch nicht eingerichtet, zeigt der Bildschirm [[tx:garden.link.kazaSetup]]; richte sie ein, komm zurück, und die Absicht verbindet sich von selbst.",
            "[[tx:garden.src.kazaOruc]] verbindet sich genauso mit [[tx:kaza.titleO]]. Eine Bittgebets-Absicht zählt aus [[tx:duaDefter.title]]: die Tage, an denen du aus deinem Heft betest, und die Tage, an denen du einträgst, dass du für die dir anvertrauten Bittgebete gebetet hast.",
          ],
          ipucu: "Bei Nachholgebeten und Bittgebet kannst du auch ohne Einrichtung pflanzen; dann hakst du die Absicht selbst mit [[garden.act.didToday]] ab. So richtest du die Nachholgebete ein: [Nachholgebete und Fasten](/de/anleitungen/nachholgebete-und-fasten/).",
          sahne: "bahce-bag",
        },
        {
          baslik: "So wächst dein Setzling",
          metin: [
            "Hältst du deine Absicht beständig, reift der Setzling in etwa vierzig Tagen, egal in welchem Rhythmus. In jeder Woche ohne Lücke öffnen sich an seinem Fuß neue Blüten; nach sechs Wochen tragen Obstbäume Früchte.",
            "Verpasst du einen Tag, behält der Setzling seine Höhe. Zuerst lässt er den Kopf hängen, bei längerer Lücke welkt er; am Tag, an dem du den kleinsten Schritt machst, lebt er wieder auf.",
          ],
          fark: "Der Zustand deines Baums wird in Worten beschrieben, etwa „An ihrem Fuß sind die ersten Blumen aufgeblüht.“ oder „Sie trägt Früchte.“ Die Zahl der Tage in [[tx:garden.list.title]] zeigt deine erledigten Tage und wird nie kleiner.",
          sahne: "bahce-buyume",
        },
      ],
    },
    {
      tur: "bolum", id: "ara", baslik: "Pause machen, dort weitermachen, wo du warst",
      giris: "Krankheit, Reisen und andere Zeiten, in denen du nicht dranbleiben kannst, kennt jeder. Dafür hat der Garten eine Pausentaste.",
      adimlar: [
        {
          baslik: "Wenn du eine Pause brauchst",
          metin: [
            "Tippe oben im Garten auf das Pausensymbol; das Fenster [[tx:garden.rest.title]] öffnet sich. Wähle die Dauer ([[tx:garden.today]], 3, 7, 14 oder 30 Tage), hak die Absichten an, die pausieren sollen, und tippe auf [[garden.rest.confirm]].",
            "Nach dem Grund wird nicht gefragt. An den Pausentagen welken deine Pflanzen nicht; wenn du zurückkommst, geht es dort weiter, wo sie waren. Um früher zurückzukehren, tippe über der Liste [[tx:garden.today]] auf [[ol:garden.rest.end]].",
          ],
          ipucu: "Um nur eine Absicht zu pausieren, tippe auf ihren Baum und wähle über die drei Punkte auf seiner Karte [[tx:garden.menu.rest]].",
          sahne: "bahce-ara",
        },
        {
          baslik: "Der vierzigste Tag",
          metin: "Hast du eine Absicht vierzig Tage lang eingehalten, spielt im Garten der Moment dieses Baums, und die Karte [[tx:garden.forty.title]] öffnet sich. Auf ihr stehen Vers 142 der Sure Al-A'raf und eine kurze Notiz: Die Frist von Musa (Friede sei mit ihm) bei seinem Herrn vollendete sich in vierzig Nächten. Bei wöchentlichen Absichten kommt dieser Moment in der sechsten Woche.",
          sahne: "bahce-kirk",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "So sieht es in der App aus",
      giris: "Diese Bilder stammen aus der App selbst. In der App ist der Garten ein dreidimensionaler Innenhof mit Fliesen.",
      kareler: [
        { img: "b-niyetler", alt: "Meine Absichten: Bild des Gartens, In deinen Garten und die Absichten", cap: "[[tx:garden.list.title]]: der Weg in den Garten" },
        { img: "b-dik", alt: "Absicht pflanzen: Für welche Tat? Beispiel-Absichten und Kacheln Was du schon tust", cap: "Der erste Schritt beim Pflanzen" },
        { img: "b-bahce", alt: "Ringförmiger Fliesengarten unter dem Nachthimmel, darunter die Liste Heute", cap: "Der Garten und die Liste [[tx:garden.today]]" },
        { img: "b-kirk", alt: "Karte zum vierzigsten Tag: Sure Al-A'raf, Vers 142", cap: "Die Karte zum vierzigsten Tag" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Können andere meinen Garten sehen?",
        c: "Deinen Garten siehst nur du. Hast du ein Konto, wird dein Garten damit abgeglichen und kommt beim Handywechsel mit. Die Sätze zu deinen Absichten und die Namen, die du vergibst, kommen nur auf deine anderen Geräte, wenn du [[tx:garden.words.title]] einschaltest." },
      { s: "Stirbt mein Baum, wenn ich einen Tag verpasse?",
        c: "Nein. Er verliert nie seine Höhe; verpasst du Tage, lässt er zuerst den Kopf hängen, dann welkt er, und nach einer sehr langen Lücke geht er in den Winter. Am Tag, an dem du den kleinsten Schritt machst, lebt er wieder auf. Für Pausen, die du vorher kennst, nutze [[tx:garden.rest.title]]; dann welken deine Pflanzen gar nicht." },
      { s: "Ich lese den Koran in der App. Muss ich das zusätzlich abhaken?",
        c: "Nein. Absichten aus [[tx:garden.flow.already]] lesen deinen Eintrag in der App: Seiten, die du im Leser liest, Gebete, die du in [[tx:prayerDetail.title]] einträgst, Dhikr, den du an den Zählern zählst. Liest du aus einem gedruckten Mushaf, pflanze die Absicht [[tx:garden.free.mushaf]] und hak sie mit [[garden.act.didToday]] ab." },
      { s: "Wie viele Absichten kann ich pflanzen?",
        c: "Der Innenhof beginnt mit Platz für zehn Setzlinge; wenn er voll ist, öffnet sich Platz für vier weitere, dann noch einmal für vier. Dein Garten fasst bis zu achtzehn Setzlinge." },
      { s: "Ich habe den falschen Setzling gewählt. Kann ich ihn ändern?",
        c: "Ein gepflanzter Setzling behält seine Art. Tippe auf seinen Baum, wähle über die drei Punkte auf seiner Karte [[tx:garden.menu.uproot]] und pflanze ihn neu. Deine Einträge in den Werkzeugen (Lesen, Dhikr, Gebet) bleiben erhalten." },
      { s: "Kostet das etwas?",
        c: "Absichten im Garten der Absichten zu pflanzen, einzuhalten und zu pausieren ist kostenlos." },
    ],
  },

  ilgili: ["kaza", "teheccud", "defter"],
  kart: { kicker: "Absicht", baslik: "Garten der Absichten", metin: "Jede Absicht wird zum Setzling, der wächst, wenn du sie einhältst. Deinen Garten siehst nur du." },
  onizleme: { sahne: "bahce-kart", adim: 13 },
  cta: { baslik: "Pflanze deine erste Absicht", metin: "Lade Manevi Halka kostenlos und öffne den Garten der Absichten im Bildschirm Lesen." },
};
