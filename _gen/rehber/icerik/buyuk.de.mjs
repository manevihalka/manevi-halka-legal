// Wöchentlicher Koran-Kreis für alle (DE). In der App heißt er bigCircle.title („Großer Kreis“); Überschriften verwenden diesen
// Namen NICHT, der Text darf ihn als den Namen nennen, den man auf dem Bildschirm sieht. Ablauf: app/buyuk-halka.tsx, components/bigCircle/*.
// Knopfnamen kommen über [[Schlüssel]] aus der App; keine langen Striche, kein Dschauschan, keine Preise. Anrede: du.
export default {
  title: "Online-Khatm mitlesen: wöchentlicher Koran-Kreis für alle",
  desc: "Mach mit beim wöchentlichen Koran-Kreis für alle: Lies eine Seite pro Woche und trag zu einer gemeinsamen Khatm bei. Sichtbar sind nur die Summen.",
  h1: "So machst du beim wöchentlichen Koran-Kreis für alle mit",
  crumb: "Wöchentlicher Koran-Kreis",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "Auch ohne eigenen Kreis kannst du Teil einer Khatm (Hatim) sein. Im offenen Kreis von Manevi Halka bekommst du jede Woche eine Seite: Du liest sie und markierst sie. Deine Seiten fügen sich mit denen aller anderen zusammen, und so werden Khatms vollendet. In der App heißt dieser Kreis Großer Kreis.",
  meta: ["Etwa 3 Minuten pro Woche", "Kein Name nötig", "Kostenlos"],
  film: { sahne: "film-buyuk", cap: "Vom Mitmachen bis zur ersten Seite: Einladungskarte, kurze Einführung, lesen und markieren." },

  kisa: {
    maddeler: [
      "Tippe im Tab [[tabs.circles]] auf der Karte [[tx:bigCircle.title]] auf [[bigCircle.join]].",
      "Geh die dreiseitige Einführung durch und tippe auf [[bigCircle.storyJoin]]. Nach deinem Namen wird nicht gefragt.",
      "Jede Woche bekommst du 1 Seite; die Karte [[tx:bigCircle.taskKicker]] zeigt, welche.",
      "[[bigCircle.read]] öffnet deine Seite im Koran. Danach tippst du auf [[hatim.markRead]].",
      "Jeden Freitag beginnt eine neue Woche. Ein Anteil, den du nicht lesen konntest, geht von selbst an den Kreis zurück; es bleibt nichts offen.",
      "Im Menü ⋮ kannst du deinen Anteil auf 2, 5 oder 10 Seiten erhöhen, die Erinnerung ausschalten oder den Kreis verlassen.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "katil", baslik: "Dem Kreis beitreten",
      giris: "Das ist ein Koran-Kreis, der allen offensteht: Menschen aus verschiedenen Städten und Sprachen lesen gemeinsam dieselbe Khatm. Zum Mitmachen brauchst du keinen Einladungslink und keinen Code.",
      adimlar: [
        {
          baslik: "Die Einladungskarte im Tab Kreise finden",
          metin: [
            "Tippe unten in der Leiste auf den Tab [[tabs.circles]]. Hast du noch keinen Kreis, steht ganz oben eine große Karte mit [[tx:bigCircle.forEveryone]]; dort siehst du auch, wie viele Seiten der Kreis diese Woche gelesen hat. Tippe auf [[bigCircle.join]].",
            "Hast du schon einen Kreis, steht derselbe Zugang als schmales Band über deinen Kreisen.",
          ],
          ipucu: "Hast du die Karte aus den Kreisen entfernt, findest du sie als Zeile im Bereich [[tx:read.globalTab]] des Tabs [[tabs.read]]; mit [[tx:bigCircleCard.restore]] holst du sie zurück.",
          sahne: "buyuk-bul",
        },
        {
          baslik: "Die kurze Einführung ansehen und beitreten",
          metin: [
            "Beim ersten Mal erscheint eine kurze Einführung in drei Seiten: Der Kreis ist offen für alle, dein Anteil ist klein, die Summe groß. Mit [[bigCircle.storyNext]] gehst du weiter, auf der letzten Seite tippst du auf [[bigCircle.storyJoin]].",
            "Beim Beitreten wird nicht nach deinem Namen gefragt. Sobald du beitrittst, ist der Anteil dieser Woche bereit.",
          ],
          ipucu: "Willst du die Einführung noch einmal sehen, tippe oben rechts im Kreis-Bildschirm auf das runde Symbol.",
          sahne: "buyuk-katil",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", baslik: "Deinen Wochenanteil lesen",
      giris: "Jeden Freitag beginnt eine neue Woche, und du bekommst eine Seite. Dein Anteil ist eine Lesung von wenigen Minuten; wann du liest, entscheidest du.",
      adimlar: [
        {
          baslik: "Deine Aufgabe dieser Woche sehen",
          metin: [
            "Dein Anteil steht als Karte im Bereich [[tx:dashboard.myTasks]] des Tabs [[tabs.home]]: welche Seite und wie viele Tage bis Freitag bleiben. Tippst du darauf, öffnet sich der Kreis-Bildschirm.",
            "Die Karte [[tx:bigCircle.taskKicker]] oben sagt in einem Satz, was zu tun ist, zum Beispiel „1 Seite lesen“; darunter stehen Seitenzahl, Sure und die ungefähre Dauer.",
          ],
          sahne: "buyuk-gorev",
        },
        {
          baslik: "Lesen und markieren",
          metin: [
            "Tippe auf [[bigCircle.read]]; der Koran öffnet sich auf deiner Seite. Am Ende der Seite erscheint unten der Knopf [[hatim.markRead]]. Tippe darauf und in der folgenden Frage noch einmal auf [[hatim.markRead]].",
            "Zurück im Kreis-Bildschirm wird die Aufgabenkarte zur Karte [[tx:bigCircle.doneTitle]]: Dein Beitrag ist zur Khatm hinzugefügt.",
          ],
          ipucu: "Hast du aus einem gedruckten Mushaf gelesen, tippe einfach auf der Aufgabenkarte auf [[ol:bigCircle.markRead]], ohne den Koran zu öffnen.",
          sahne: "buyuk-oku",
        },
        {
          baslik: "Den Fortschritt der Khatm verfolgen",
          metin: "Weiter unten steht der Ring der Khatm: die wievielte es ist, wie viel Prozent gelesen sind und wie viele Seiten der Kreis diese Woche gelesen hat. Es ist dieselbe Khatm wie beim gemeinsamen Lesen in der App. Auf der Karte [[tx:bigCircle.doneTitle]] siehst du auch, wie viele Seiten davon deine sind.",
          fark: "Keine Mitgliederliste, keine Rangliste, keine Abzeichen; sichtbar ist nur die Summe des Kreises. Im Vordergrund steht die gemeinsam vollendete Khatm, nicht wer was gelesen hat.",
          ipucu: "Der [[tx:bigCircle.dhikrTitle]] ist freiwillig: Du fügst Dhikr zum gemeinsamen Zähler des Kreises hinzu, er wechselt jeden Freitag. Willst du ihn nicht, blende ihn im Menü ⋮ aus.",
          sahne: "buyuk-ilerleme",
        },
      ],
    },
    {
      tur: "bolum", id: "ayarlar", baslik: "Anteil und Erinnerung einstellen",
      giris: "Im Menü ⋮ des Kreis-Bildschirms stellst du deinen Anteil, die Erinnerung und den Dhikr der Woche ein; dort kannst du den Kreis auch verlassen.",
      adimlar: [
        {
          baslik: "Deinen Anteil vergrößern oder verkleinern",
          metin: "Tippe oben rechts auf das Symbol ⋮. Unter [[tx:bigCircle.menuShare]] wählst du 1, 2, 5 oder 10 Seiten; der Link [[ol:bigCircle.changeShare]] auf der Aufgabenkarte öffnet dasselbe Menü. Die Änderung gilt ab der nächsten Woche.",
          ipucu: "Liest du deinen Anteil von 1 Seite drei Wochen hintereinander, schlägt dir die App einmal und leise vor, nächste Woche 2 Seiten zu lesen. Willst du nicht, schließt du den Hinweis, und er kommt nicht wieder.",
          sahne: "buyuk-pay",
        },
        {
          baslik: "Die Erinnerung am Donnerstagabend",
          metin: [
            "Ist dein Anteil noch nicht gelesen, kommt am Donnerstagabend um 20 Uhr eine einzige Erinnerung. Hast du ihn gelesen, kommt keine.",
            "Beim ersten Beitritt fragt die App dafür nach der Erlaubnis für Mitteilungen. Mit dem Schalter [[tx:bigCircle.menuReminder]] im Menü ⋮ schaltest du die Erinnerung aus und wieder ein.",
          ],
          sahne: "buyuk-hatirlat",
        },
        {
          baslik: "Den Kreis verlassen",
          metin: "Tippe ganz unten im Menü ⋮ auf [[tx:bigCircle.menuLeave]]. Das Fenster fragt, ob du schon Seiten deines Wochenanteils gelesen hast: Markiere, was du gelesen hast, der Rest geht sofort an den Kreis zurück und jemand anderes liest ihn. Sobald du auf [[bigCircle.leaveConfirm]] tippst, bekommst du keine neuen Seiten mehr.",
          ipucu: "Wann immer du willst, kommst du über den Knopf [[bigCircle.rejoin]] auf demselben Bildschirm zurück.",
          sahne: "buyuk-ayril",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Wer ist in diesem Kreis, kann ich die Mitglieder sehen?",
        c: "Dieser Kreis hat keine Mitgliederliste; sichtbar sind nur Summen: die diese Woche gelesenen Seiten und die vollendeten Khatms. Auch nach deinem Namen wird beim Beitreten nicht gefragt." },
      { s: "Was passiert, wenn ich eine Woche nicht lesen kann?",
        c: "Am Ende der Woche geht dein Anteil von selbst an den Kreis zurück, und jemand anderes liest ihn; es bleibt nichts offen. Bleiben zwei Wochen hintereinander ungelesen, fragt die App einmal [[tx:bigCircle.continueTitle]]: Du kannst weitermachen, eine Weile pausieren oder, wenn dein Anteil größer als 1 Seite ist, ihn auf 1 Seite verkleinern." },
      { s: "Wann beginnt die Woche?",
        c: "Jeden Freitag um Mitternacht, nach deiner eigenen Zeit. Trittst du weniger als zwei Tage vor Wochenende bei, bekommst du gleich den Anteil der nächsten Woche; du kannst ihn sofort lesen, wenn du möchtest." },
      { s: "Welche Khatm ist das?",
        c: "Dieselbe Khatm wie beim [gemeinsamen Lesen](/de/gemeinsames-lesen/) in der App. Deine Seiten fügen sich mit den Lesungen dort zusammen; ist eine Khatm vollendet, beginnt die nächste." },
      { s: "Kann ich pro Woche mehr lesen?",
        c: "Ja. Im Menü ⋮ wählst du 1, 2, 5 oder 10 Seiten pro Woche; die Änderung gilt ab der nächsten Woche. Eine Seite dauert etwa 2 bis 3 Minuten." },
      { s: "Kostet das etwas?",
        c: "Beitreten und Lesen sind kostenlos." },
    ],
  },

  ilgili: ["hatim", "katil", "video"],
  kart: { kicker: "Koran", baslik: "Wöchentlicher Koran-Kreis", metin: "Tritt einem Kreis für alle bei und lies mit einer Seite pro Woche an einer gemeinsamen Khatm mit." },
  onizleme: { sahne: "buyuk-kart", adim: 0 },
  cta: { baslik: "Beim Wochenkreis mitmachen", metin: "Lade Manevi Halka kostenlos, tritt im Tab Kreise bei und lies diese Woche deine erste Seite." },
};
