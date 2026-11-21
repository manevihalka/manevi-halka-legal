// Fasten in der Gruppe (DE), 2.1.0 (21. Nov. 2026). Quelle: oruc.tr.mjs.
// Knopfnamen kommen über [[schlüssel]] aus der App; kein Geviertstrich. Keine Fiqh-Urteile.
export default {
  title: "Gemeinsam fasten: Ramadan-Fasten in der Gruppe begleiten",
  desc: "Richte im Kreis eine Fastenaufgabe ein: Ramadan, Montag und Donnerstag oder eigene Tage. Jeder markiert sein Fasten beim Iftar, du wählst, wer was sieht.",
  h1: "Fasten im Kreis: so begleitet ihr euer Fasten gemeinsam",
  crumb: "Fasten in der Gruppe",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "Du richtest in deinem Kreis eine Fastenaufgabe ein: das Ramadan-Fasten, Montag und Donnerstag oder Tage, die du selbst wählst. Jeder hält sein eigenes Fasten und markiert es beim Iftar, der Kreis geht gemeinsam. Niemand wird automatisch Teilnehmer: Jeder liest, was sichtbar sein wird, und stimmt zu.",
  meta: ["Einrichtung etwa 1 Minute", "Niemand nimmt automatisch teil", "Mitmachen kostenlos"],
  film: { sahne: "film-oruc", cap: "Aufgabe einrichten, Ramadan-Fasten wählen, beim Iftar markieren." },

  kisa: {
    maddeler: [
      "Tippe im Kreis auf [[group.addTask]] und wähle unter [[tx:compose.sectionPractice]] die Karte [[tx:compose.typeFasting]].",
      "Wähle in der Zeile [[tx:fasting.rowKind]] [[tx:fasting.kindRamadan]], [[tx:fasting.kindMonThu]] oder [[tx:fasting.kindCustom]].",
      "Lege in der Zeile [[tx:compose.rowVisibility]] fest, wer was sieht, und tippe auf [[compose.startTask]].",
      "Die Aufgabe erscheint in der Liste aller. Wer mitmachen möchte, tippt auf [[fasting.joinCta]], liest, was sichtbar sein wird, und stimmt zu.",
      "Am Fastentag tippst du nach Beginn des Iftars auf [[fasting.markDone]]; dann steht dort [[tx:fasting.accepted]].",
      "Teilnehmende werden am Vorabend erinnert. Niemand fragt, warum ein Tag leer bleibt.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Wer den Kreis leitet", baslik: "Richte die Fastenaufgabe ein",
      giris: "Eine Fastenaufgabe ist gemeinsame Praxis: Jeder hält sein eigenes Fasten, die App sammelt nur die Markierungen. Die Leitung des Kreises richtet die Aufgabe ein. Hast du noch keinen Kreis, gründe zuerst einen [wie in der Khatm-Anleitung](/de/anleitungen/khatm-gruppe/) und lade deine Liebsten ein.",
      adimlar: [
        {
          baslik: "Aufgabe hinzufügen und Fasten wählen",
          metin: "Tippe im Kreis unten rechts auf [[group.addTask]]. Scrolle unter [[tx:compose.pickTitle]] nach unten und tippe unter [[tx:compose.sectionPractice]] auf die Karte [[tx:compose.typeFasting]].",
          ipucu: "Rückt der Ramadan näher, etwa vier Monate vorher, erscheint am Anfang der Zeile [[tx:compose.quickStart]] auch die Karte [[tx:compose.tplRamadanFast]]. Tippst du darauf, ist das Ramadan-Fasten schon gewählt.",
          sahne: "oruc-ac",
        },
        {
          baslik: "Wähle, welches Fasten ihr haltet",
          metin: "Tippe auf die Zeile [[tx:fasting.rowKind]]. Es gibt drei Möglichkeiten:",
          liste: [
            "[[tx:fasting.kindRamadan]]: jeden Tag vom 1. Ramadan bis zum Tag vor dem Fest. Der Beginn wird von selbst auf den 1. Ramadan gesetzt; hat der Ramadan schon begonnen, startet die Aufgabe heute.",
            "[[tx:fasting.kindMonThu]]: zwei Tage jede Woche. Sie beginnt morgen und läuft, bis du sie beendest; in den Zeilen [[tx:compose.rowStart]] und [[tx:fasting.rowEnd]] kannst du Daten wählen.",
            "[[tx:fasting.kindCustom]]: Du wählst die Wochentage, den Beginn und das Ende.",
          ],
          fark: "Die Vorschau oben zeigt deine Wahl sofort: wie viele Tage im Ramadan, oder wie viele Tage pro Woche bei einem wöchentlichen Fasten.",
          ipucu: "Die Festtage werden automatisch übersprungen.",
          sahne: "oruc-tur",
        },
        {
          baslik: "Wähle, wer was sieht",
          metin: "Tippe auf die Zeile [[tx:compose.rowVisibility]]:",
          liste: [
            "[[tx:practice.visibilityMutual]]: Alle Teilnehmenden sehen, an welchen Tagen die anderen markiert haben. Für enge Familien- und Freundeskreise.",
            "[[tx:practice.visibilityAdmin]]: Die Markierungen sieht nur die Leitung des Kreises; die Teilnehmenden sehen einander nicht.",
            "[[tx:fasting.visibilityTotal]]: Niemand sieht, wer gefastet hat, auch die Leitung nicht. Im Kreis erscheint nur die Gesamtzahl der Tage.",
          ],
          ipucu: "[[tx:fasting.rowDuaTurn]] ist eingeschaltet: An jedem Fastentag erscheint ein Name aus dem Kreis, und du gedenkst dieser Person beim Iftar im Bittgebet. Wählst du [[tx:practice.visibilityAdmin]], kannst du auch den [[tx:wizard.observerModeTitle]] einschalten: Du bekommst keine Aufgabe und begleitest den Kreis.",
          sahne: "oruc-gorunurluk",
        },
        {
          baslik: "Starte die Aufgabe",
          metin: "Der Name der Aufgabe wird aus deiner Wahl geschrieben, zum Beispiel „Ramadan-Fasten“; du kannst ihn ändern. Tippe auf [[compose.startTask]]. Die Aufgabe erscheint im Kreis unter [[tx:practice.sectionPractices]] und in der Liste aller.",
          fark: "Niemand nimmt automatisch teil: Jedes Mitglied liest beim Beitreten, was sichtbar sein wird, und stimmt zu.",
          sahne: "oruc-baslat",
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Alle im Kreis", baslik: "Mitmachen und das Fasten markieren",
      giris: "An Fastentagen erscheint die Aufgabe im Tab [[tx:tabs.home]] im Bereich [[tx:dashboard.myTasks]]; im Kreis steht sie außerdem unter [[tx:practice.sectionPractices]]. Jeder markiert sein Fasten selbst.",
      adimlar: [
        {
          baslik: "Beim Fasten mitmachen",
          metin: "Tippe auf die Fastenkarte; die Karte [[tx:fasting.joinCardTitle]] erscheint. Tippst du auf [[fasting.joinCta]], zeigt ein Fenster, wer bei dieser Aufgabe was sieht. [[tx:fasting.reminderRow]] ist eingeschaltet: Am Abend vor einem Fastentag wirst du um 21:00 erinnert, die Uhrzeit kannst du später ändern. Tippe dann auf [[fasting.join]].",
          ipucu: "Möchtest du nicht mitmachen, nimmst du die Karte mit [[ol:practice.dismissAction]] aus deiner Liste. Nach dem Beitreten kannst du jederzeit mit [[ol:practice.leaveAction]] gehen; dann werden deine Markierungen gelöscht.",
          sahne: "oruc-katil",
        },
        {
          baslik: "Beim Iftar auf Ich habe gefastet tippen",
          metin: "Tagsüber zeigt die Aufgabe die Zeit bis zum Iftar; der Knopf [[fasting.markDone]] öffnet sich zum Iftar. Ist es so weit, erscheint das Bittgebet zum Fastenbrechen. Tippe auf [[fasting.markDone]]; dann steht dort [[tx:fasting.accepted]], und die Perle des Tages füllt sich. Hast du versehentlich getippt, tippe auf [[ol:fasting.undo]].",
          ipucu: "Die Iftar-Zeit richtet sich nach der Stadt, die in der App gewählt ist. Ist keine Stadt gewählt, bleibt der Knopf den ganzen Tag offen.",
          sahne: "oruc-isaretle",
        },
        {
          baslik: "Vergessene Tage nachtragen und sehen, wer mitgeht",
          metin: [
            "Auf der Karte [[tx:fasting.duaLabel]] steht der Name, dessen du an diesem Abend im Bittgebet gedenkst. Darunter stehen die [[tx:fasting.myDays]]: Tippe auf einen vergessenen Tag, um ihn nachträglich zu markieren.",
            "Bei einer Aufgabe mit [[tx:practice.visibilityMutual]] zeigt die Liste [[tx:fasting.together]], wer an welchen Tagen markiert hat. Mit dem Knopf [[fasting.accepted]] neben einer Person sagst du ihr [[tx:fasting.accepted]].",
          ],
          fark: "Niemand fragt, warum ein Tag leer bleibt, und niemand wird benachrichtigt.",
          sahne: "oruc-birlikte",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Für welches Fasten kann ein Kreis eine Aufgabe einrichten?",
        c: "Es gibt drei Arten: das Ramadan-Fasten (jeden Tag vom 1. Ramadan bis zum Tag vor dem Fest), das Fasten am Montag und Donnerstag oder ein Fasten an Tagen, die du wählst. Die Festtage werden automatisch übersprungen." },
      { s: "Wer sieht welche Tage?",
        c: "Das entscheidet, wer die Aufgabe einrichtet. Bei [[tx:practice.visibilityMutual]] sehen alle Teilnehmenden die Tage der anderen; bei [[tx:practice.visibilityAdmin]] sieht sie nur die Leitung des Kreises; bei [[tx:fasting.visibilityTotal]] sieht niemand, wer gefastet hat, und im Kreis erscheint nur die Gesamtzahl der Tage. Haben weniger als 4 Personen begonnen, wird auch die Summe ausgeblendet. Jedes Mitglied liest das vor dem Beitreten." },
      { s: "Was passiert an einem Tag, an dem ich nicht fasten konnte?",
        c: "Der Tag bleibt leer. Niemand fragt nach dem Grund, und niemand wird benachrichtigt. Möchtest du Nachholfasten getrennt verfolgen, nutze unten in der Fastenaufgabe den Eintrag [[tx:kaza.titleO]]; dieser Zähler gehört nur dir: [Nachholgebete und -fasten](/de/anleitungen/nachholgebete-und-fasten/)." },
      { s: "Bekomme ich eine Erinnerung?",
        c: "Beim Beitreten ist sie eingeschaltet: am Abend vor einem Fastentag um 21:00. Die Uhrzeit änderst du in der Fastenaufgabe, oder du schaltest sie aus. Beim Ramadan-Fasten kommt die Erinnerung nur in der ersten Nacht." },
      { s: "Kostet das etwas?",
        c: "Bei einer Fastenaufgabe mitzumachen ist kostenlos. Eine Aufgabe für das Ramadan-Fasten zählt nicht zur Grenze des kostenlosen Plans. Eine Aufgabe für Montag und Donnerstag oder für eigene Tage zählt als eine der drei gemeinsamen Praktiken, die du im kostenlosen Plan gleichzeitig offen haben kannst." },
      { s: "Sagt mir die App, ob mein Fasten gültig ist?",
        c: "Nein. Die App hält nur die Tage fest, die du markierst, und gibt keine religiösen Urteile. Fragen zum Fasten beantwortet zum Beispiel das ägyptische Fatwa-Amt [Dar al-Ifta](https://www.dar-alifta.org/de), oder du fragst einen Gelehrten deines Vertrauens." },
    ],
  },

  ilgili: ["hatim", "kaza", "tek"],
  kart: { kicker: "Fasten", baslik: "Fasten in der Gruppe", metin: "Ramadan oder Montag und Donnerstag: Jeder markiert sein Fasten beim Iftar, der Kreis geht gemeinsam." },
  onizleme: { sahne: "oruc-kart", adim: 0 },
  cta: { baslik: "Gründe heute deinen Kreis", metin: "Einen Kreis gründen und beitreten ist kostenlos. Lade die App, gründe deinen Kreis und starte eine Fastenaufgabe." },
};
