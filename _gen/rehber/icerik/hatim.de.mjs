// P1 · Khatm-Gruppe gründen und Dschuz verteilen (DE), 2.1.0 (21. Nov. 2026). Quelle: hatim.tr.mjs.
// Knopfnamen kommen über [[schlüssel]] aus der App; kein Geviertstrich, kein Dschauschan.
export default {
  title: "Khatm-Gruppe gründen und den Koran in Dschuz aufteilen",
  desc: "Gründe mit Familie oder Gemeinde eine Khatm-Gruppe (Hatim): Die Dschuz werden reihum verteilt, du siehst vorher, wer was liest, Runden starten von selbst.",
  h1: "So gründest du eine Khatm-Gruppe und verteilst die Dschuz",
  crumb: "Khatm-Gruppe gründen",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "Zuerst gründest du einen Kreis, also eine Gruppe für deine Familie oder deine Gemeinde. Dann startest du in diesem Kreis eine Khatm (in der App: Chatma, auf Türkisch Hatim). Wer welchen Dschuz (Cüz) liest, verteilt die App, und du siehst es vor dem Start. Ist die Woche um, kommen die nächsten Dschuz von selbst.",
  meta: ["Einrichtung etwa 2 Minuten", "Keine E-Mail, kein Passwort", "Kostenlos"],
  film: { sahne: "film-hatim", cap: "Der ganze Ablauf am Stück: Kreis gründen, Koran-Chatma wählen, starten." },

  kisa: {
    maddeler: [
      "Öffne in der App den Tab [[tabs.circles]] und tippe auf [[circlesTab.anonCreate]]. Gib deinen Namen und den Namen des Kreises ein und bestätige mit [[createGroup.create]].",
      "Tippe auf [[group.welcome.step1Btn]] und schick den Link an deine Familie oder in deine WhatsApp-Gruppe. Wer den Link antippt, tippt auf [[joinGroup.join]] und ist im Kreis.",
      "Sind alle dabei, tippe im Kreis auf [[group.addTask]] und wähle die Karte [[tx:compose.typeHatim]].",
      "Eine neue Runde pro Woche und 1 Dschuz pro Person sind schon eingestellt. Die Vorschau oben zeigt, wie lange die Khatm dauert und wer in der ersten Runde was liest.",
      "Ändere bei Bedarf die Reihenfolge mit [[ol:dist.openCreate]] und tippe dann auf [[compose.startTask]].",
      "Jeder liest seinen Dschuz und hakt ihn ab. Ist die Woche um, werden die nächsten Dschuz von selbst verteilt.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "halka", rol: "Wer den Kreis gründet", baslik: "Gründe deinen Kreis",
      giris: "Ein Kreis ist die Gemeinschaft, mit der du gemeinsam liest und betest: deine Familie, deine Freunde oder die Gemeinde deiner Moschee. Die Khatm entsteht in diesem Kreis.",
      adimlar: [
        {
          baslik: "Starte im Tab Kreise einen neuen Kreis",
          metin: [
            "Öffne die App und tippe unten in der Leiste auf den Tab [[tabs.circles]]. Tippe dort auf [[circlesTab.anonCreate]].",
            "Gründest du zum ersten Mal einen Kreis, fragt die App nur nach deinem Namen. Unter diesem Namen sehen dich die anderen im Kreis. E-Mail, Passwort oder Telefonnummer brauchst du nicht.",
          ],
          ipucu: "Siehst du diesen Knopf nicht, weil du schon einem Kreis beigetreten bist oder einen gegründet hast, tippe oben rechts auf **+** und wähle im Fenster [[tx:dashboard.createNew]]. Mit einem kostenlosen Konto kannst du jeweils einen selbst gegründeten Kreis verwalten.",
          sahne: "halka-kur",
        },
        {
          baslik: "Gib deinem Kreis einen Namen",
          metin: [
            "Schreib einen Namen in das Feld [[tx:createGroup.groupName]], zum Beispiel „Meine Familie“ oder „Freitagskreis“. Eine Beschreibung ist freiwillig. Tippe dann auf [[createGroup.create]].",
            "Hast du dein Konto noch nicht verknüpft, erscheint bei deinem ersten Kreis einmal das Fenster [[tx:secureNudge.title]]. Verknüpfst du es mit Apple, Google oder E-Mail, bleibt dein Kreis erhalten, auch wenn du das Handy wechselst. Du kannst auch auf [[ol:secureNudge.later]] tippen und weitermachen.",
            "Der Kreis öffnet sich: oben die Leiste mit den Mitgliedern, darunter die Karte [[tx:group.welcome.title]].",
          ],
          ipucu: "[[tx:createGroup.detailedTrackingTitle]] wählst du nur beim Gründen. Schaltest du sie ein, siehst du als Admin den täglichen Fortschritt der Mitglieder. Die Mitglieder sehen ihn nicht.",
          sahne: "halka-form",
        },
        {
          baslik: "Lade deine Liebsten ein",
          metin: "Tippe auf der Karte [[tx:group.welcome.title]] auf [[group.welcome.step1Btn]] und schick den Link in deine WhatsApp-Gruppe, an deine Familie oder an wen du möchtest. Wer den Link antippt, sieht auf seinem Handy die Einladungskarte des Kreises. Tippt er auf [[joinGroup.join]], ist er im Kreis. Öffnet sich der Link im Browser statt in der App, tippt er auf der Seite auf **App öffnen**.",
          fark: "Deine WhatsApp-Gruppe bleibt. Teil dort den Link; wer welchen Dschuz liest, hält die App fest.",
          ipucu: "Erst einladen, dann die Khatm starten. Die Dschuz gehen an alle, die beim Start der Aufgabe im Kreis sind. Wer später beitritt, kommt in der nächsten Runde dazu.",
          sahne: "davet-paylas",
        },
        {
          baslik: "Wenn du willst: per Code oder QR-Code einladen",
          metin: [
            "Tippst du in der Mitgliederleiste unter dem Namen des Kreises auf [[group.inviteShort]], öffnet sich das Fenster [[tx:group.inviteToCircle]]: ein kurzer Code aus sechs Zeichen, der Einladungslink und ein QR-Code. Den Code kannst du am Telefon durchsagen, den QR-Code in der Moschee auf einer Leinwand zeigen.",
            "Wer die App noch nicht hat, lädt sie über die Seite, die sich beim Antippen des Links öffnet. Danach tippt er im Tab [[tabs.circles]] auf [[ol:circlesTab.anonJoin]], fügt den Einladungslink oder den Code ein und tritt bei. Mehr dazu: [Einem Kreis per Einladung beitreten](/de/anleitungen/kreis-beitreten/).",
          ],
          sahne: "davet-penceresi",
        },
      ],
    },
    {
      tur: "bolum", id: "hatim", rol: "Wer den Kreis gründet", baslik: "Starte die Khatm",
      giris: "Die Khatm ist eine Aufgabe im Kreis. Im selben Kreis können eine Khatm, ein Dhikr und eine Buchlektüre nebeneinander laufen. Die Aufgabe entsteht auf einem einzigen Bildschirm: oben eine Vorschau, die sofort mitgeht, darunter Zeilen, die du ändern kannst.",
      adimlar: [
        {
          baslik: "Aufgabe hinzufügen und die Koran-Chatma wählen",
          metin: "Tippe im Kreis unten rechts auf [[group.addTask]]. Der Knopf [[group.welcome.step2Btn]] auf der Karte [[tx:group.welcome.title]] öffnet denselben Bildschirm. Tippe dort unter [[tx:compose.pickTitle]] auf die Karte [[tx:compose.typeHatim]].",
          ipucu: "Die Karte [[tx:compose.tplWeeklyHatim]] in der Zeile [[tx:compose.quickStart]] öffnet sich mit denselben Einstellungen.",
          sahne: "hatim-sec",
        },
        {
          baslik: "Sieh dir die Vorschau an und ändere bei Bedarf eine Zeile",
          metin: [
            "Die Karte oben zeigt die Aufgabe schon vor dem Start: jede Woche eine neue Runde, 1 Dschuz pro Person. In einem Kreis mit fünf Personen dauert die Khatm etwa 6 Wochen. Die gefüllten Perlen im Ring sind die Dschuz der ersten Runde, die goldene Perle ist dein Teil. Darunter steht, wer in der ersten Runde welchen Dschuz liest.",
            "Tippst du auf eine Zeile, öffnet sich ein Fenster, und deine Wahl erscheint sofort in der Vorschau:",
          ],
          liste: [
            "[[tx:compose.rowCadence]]: jeden Tag, jede Woche oder ein anderer Abstand, zum Beispiel alle 3 Tage.",
            "[[tx:compose.rowPer]]: Dschuz für Dschuz oder Seite für Seite, und wie viel pro Runde. Mit 2 Dschuz pro Person dauert die Khatm 3 Wochen.",
            "[[tx:compose.rowWho]]: alle im Kreis, die Personen, die du auswählst, oder wer im Kreis mitmachen möchte.",
          ],
          fark: "Wie lange die Khatm dauert, rechnest du nicht selbst aus; die Vorschau schreibt es bei jeder Änderung neu.",
          ipucu: "Das Schloss an den Zeilen [[tx:compose.rowWhat]] und [[tx:compose.rowHow]] heißt: Diese beiden ändern sich nach dem Start nicht mehr. Statt einer vollständigen Khatm kannst du auch bestimmte Dschuz wählen.",
          sahne: "hatim-onizleme",
        },
        {
          baslik: "Wenn du willst: die Verteilung prüfen",
          metin: "Tippe in der Vorschau auf [[ol:dist.openCreate]]. Hier änderst du die Reihenfolge, nicht die Abschnitte: Tippst du nacheinander auf zwei Personen, tauschen sie die Plätze, und die Dschuz werden lückenlos neu berechnet. Wer langsamer liest, bekommt mit Minus weniger, wer mehr lesen möchte, mit Plus mehr. Tippe zum Schluss auf [[dist.confirm]]; auf der Karte steht dann [[tx:dist.confirmed]].",
          ipucu: "[[tx:dist.rotateLabel]] ist anfangs aus: Die nächste Runde geht dort weiter, wo diese aufhört. Schaltest du es ein, rückt nach jeder vollendeten Khatm jeder zum nächsten Abschnitt weiter. Die Anteile siehst nur du; jeder sieht seinen eigenen Teil.",
          sahne: "hatim-dagitim",
        },
        {
          baslik: "Gib der Aufgabe einen Namen und starte sie",
          metin: "Der [[tx:compose.nameLabel]] wird aus deiner Auswahl geschrieben, zum Beispiel „Wöchentliche Chatma“. Du kannst einen eigenen wählen, etwa „Familien-Chatma“. Tippe dann auf [[compose.startTask]]. Das Fenster [[tx:group.circleStartedTitle]] erscheint, und jeder bekommt seinen Dschuz im selben Moment auf den eigenen Bildschirm; [[group.goToTaskScreen]] bringt dich zur Aufgabe.",
          fark: "Wer welchen Dschuz liest, rechnest du nicht aus; die App verteilt nach der Reihenfolge im Kreis.",
          ipucu: "Unter [[tx:compose.more]] findest du den Starttag, den [[tx:wizard.observerModeTitle]] (du bekommst keinen Teil und begleitest den Kreis) und [[tx:wizard.autoAdvanceTitle]]. Die automatische Runde ist eingeschaltet: Ist die Zeit einer Runde um, beginnt die neue von selbst. Die Runden wechseln um Mitternacht nach deiner Uhrzeit.",
          sahne: "hatim-baslat",
        },
      ],
    },
    {
      tur: "halka",
      baslik: "So gehen die Runden weiter",
      metin: [
        "Ist eine Runde vorbei, werden die nächsten Dschuz von selbst verteilt, und die Khatm geht dort weiter, wo sie stand. In einem Kreis mit fünf Personen werden in der ersten Woche die Dschuz 1–5 gelesen, in der zweiten Woche die Dschuz 6–10. Am Ende der sechsten Woche ist die Khatm vollendet, und der Kreis beginnt die nächste Khatm nach demselben Muster.",
        "Ein ungelesener Dschuz wird nicht gelöscht: In der nächsten Runde bleibt er als **anvertraute** Aufgabe bei derselben Person. Du musst nicht jede Woche eine neue Liste schreiben.",
      ],
    },
    {
      tur: "bolum", id: "sonraki-tur", rol: "Wer den Kreis gründet", baslik: "Die nächste Runde einstellen",
      giris: "Auch nach dem Start kannst du Reihenfolge und Anteile ändern. Die Änderung gilt ab der nächsten Runde; die Teile der laufenden Runde bleiben, wie sie sind.",
      adimlar: [
        {
          baslik: "Im Tab Kreis der Aufgabe ändern",
          metin: "Wechsle in der Aufgabe in den Tab [[tx:flow.tabCircle]]. Ganz oben steht die Karte [[tx:flow.observerInfoNextRoundLabel]], die nur du siehst: wann die nächste Runde beginnt und wer was liest. Tippe auf [[nextRound.open]]. Ändere auf dem Bildschirm, der sich öffnet, die Reihenfolge, die Anteile oder den Schalter [[tx:dist.rotateLabel]] und tippe auf [[taskSettings.save]].",
          ipucu: "Das Zahnrad oben öffnet die [[tx:taskSettings.title]]: derselbe Bildschirm wie beim Einrichten, diesmal mit der nächsten Runde. Dort änderst du den Abstand der Runden, die Menge pro Person und den Namen der Aufgabe.",
          sahne: "sonraki-tur",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", rol: "Alle im Kreis", baslik: "Lies deinen Dschuz",
      giris: "Alle im Kreis lesen ihren Teil an ihrem eigenen Ort, zu ihrer eigenen Zeit.",
      adimlar: [
        {
          baslik: "Tippe auf die Benachrichtigung oder auf die Karte auf der Startseite",
          metin: "Beginnt eine neue Runde, bekommst du eine Benachrichtigung; tippst du sie an, öffnet sich deine Aufgabe. Hast du die App selbst geöffnet, tippe im Tab [[tx:tabs.home]] im Bereich [[tx:dashboard.myTasks]] auf die Karte der Khatm: Dort stehen der Name des Kreises, dein Dschuz und die verbleibenden Tage. Oben in der Aufgabe siehst du den Fortschritt des Kreises und die Zeit bis zum Ende der Runde.",
          ipucu: "Beginnt eine Runde in der Nacht, stört dich die Benachrichtigung nachts nicht; sie kommt am Morgen.",
          sahne: "uye-bildirim",
        },
        {
          baslik: "Lesen beginnen, am Ende als gelesen markieren",
          metin: [
            "Tippe auf [[quran.startReading]]. Der Koran öffnet sich auf deiner ersten Seite; die dünne Linie oben zeigt, wie viel du schon gelesen hast. Auf der letzten Seite erscheint unten der Knopf [[hatim.markRead]]. Tippe darauf und im Fenster noch einmal auf [[hatim.markRead]]. Dein Teil ist erledigt, und du kommst zurück zur Aufgabe.",
            "Die Aufgabenkarte wird zur Karte [[tx:taskDone.title]]. Dort siehst du, wie viele im Kreis schon fertig sind.",
          ],
          fark: "Du musst keinen Mushaf suchen: Deine Seiten öffnen sich direkt in der App.",
          ipucu: "Hast du aus einem gedruckten Mushaf gelesen, tippe in der Aufgabe auf [[flow.complete]]. Hast du die gelesenen Abschnitte nicht markiert, antworte auf die Frage mit [[common.yes]].",
          sahne: "uye-oku",
        },
      ],
    },
    {
      tur: "ikili", id: "yetisemezsen", rol: "Alle im Kreis", baslik: "Wenn jemand es nicht schafft",
      giris: "Nicht jede Woche läuft gleich. Wer seinen Teil nicht schafft, hält den Kreis nicht auf; die anderen helfen.",
      kartlar: [
        { baslik: "Um Hilfe bitten", metin: "Tippe unter der Aufgabenkarte auf [[ol:flow.askHelp]] und wähle, für wie viele Seiten du Hilfe möchtest; die Hälfte ist schon eingestellt. Das Fenster zeigt, welche Seiten für den Kreis freigegeben werden und welche bei dir bleiben. Tippst du auf [[flow.askHelp]], sehen die anderen diese Seiten in der Liste [[tx:flow.waitingForHelpTitle]].", sahne: "yardim-iste" },
        { baslik: "Helfen", metin: "Im Tab [[tx:flow.tabCircle]] der Aufgabe siehst du, wer auf Hilfe wartet. Tippe auf [[flow.helpTitle]] und wähle im Fenster, wie viel du übernimmst. Die Seiten, die du übernimmst, landen auf deinem Bildschirm.", sahne: "yardim-et" },
      ],
      not: "Musst du deinen Teil ganz abgeben, kannst du ihn mit [[ol:flow.excuse]] in den Pool legen; wer möchte, übernimmt ihn von dort. Dieser Schritt lässt sich nicht rückgängig machen.",
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "So sieht es in der App aus",
      giris: "Diese Bilder stammen direkt aus der App.",
      kareler: [
        { img: "h-flow", alt: "Aufgabe: Kreis-Fortschritt, verbleibende Tage der Runde und die Karte Deine Aufgabe mit Dschuz 17", cap: "Die Aufgabe: dein Dschuz" },
        { img: "h-halka-ust", alt: "Tab Kreis der Aufgabe: die Karte Nächste Runde für den Admin und die Dschuz aller im Kreis", cap: "Tab Kreis: die nächste Runde und wer bei welchem Dschuz ist" },
        { img: "h-dagitim", alt: "Nächste Runde einstellen: Schalter für die Verschiebung, wer was liest und die Anteile pro Person", cap: "Nächste Runde einstellen" },
        { img: "n-home", alt: "Startseite: im Bereich Mein Teil die Karte einer Khatm mit Dschuz 17", cap: "Startseite: dein Teil" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Wie werden die Dschuz verteilt, wer liest was?",
        c: "Die App verteilt nach der Reihenfolge im Kreis: Die erste Person bekommt Dschuz 1, die zweite Dschuz 2 und so weiter. Vor dem Start zeigt dir die Vorschau die erste Runde, und mit [[ol:dist.openCreate]] kannst du die Reihenfolge ändern. In der nächsten Runde gehen die folgenden Dschuz in derselben Reihenfolge weiter: In einem Kreis mit 5 Personen geht die zweite Runde mit den Dschuz 6–10 weiter. Läuft die Khatm schon, änderst du die Reihenfolge in der Aufgabe mit [[nextRound.open]]." },
      { s: "Was passiert, wenn die Woche um ist oder jemand nicht liest?",
        c: "Ist [[tx:wizard.autoAdvanceTitle]] eingeschaltet (so ist es voreingestellt), beginnt die neue Runde um Mitternacht nach deiner Uhrzeit von selbst, und die nächsten Dschuz werden verteilt; schaltest du es aus, startest du die neue Runde selbst. Ein ungelesener Teil geht nicht verloren, er bleibt in der nächsten Runde als **anvertraute** Aufgabe bei dieser Person. Sie kann mit [[flow.askHelp]] einen Teil für den Kreis freigeben oder mit [[flow.excuse]] alles in den Pool legen; die anderen übernehmen ihn mit [[flow.helpTitle]]." },
      { s: "Wir haben eine WhatsApp-Gruppe. Brauchen wir die App trotzdem?",
        c: "Die Gruppe bleibt. Teil den Einladungslink dort; die Liste, wer gelesen hat, und die Erinnerung übernimmt die App. Du musst nicht jede Woche eine neue Liste schreiben. Willst du trotzdem eine Liste auf Papier, nimm den [Khatm-Plan zum Ausdrucken](/de/khatm-plan/)." },
      { s: "Können Angehörige ohne App mitmachen?",
        c: "In einem regelmäßigen Kreis kann der Admin jemanden ohne App als **Gast** hinzufügen; eine verantwortliche Person markiert, was der Gast gelesen hat. Wird bei einer einmaligen Khatm **Gemeinsamer Pool** gewählt, können Menschen ohne App über den Einladungslink im Browser einen Dschuz übernehmen: [Einmaliger Kreis](/de/anleitungen/einmaliger-kreis/)." },
      { s: "Kostet das etwas?",
        c: "Einen Kreis gründen, eine Khatm starten und einem Kreis beitreten ist kostenlos. Mit einem kostenlosen Konto kannst du jeweils einen selbst gegründeten Kreis verwalten; beitreten kannst du beliebig vielen Kreisen." },
      { s: "Darf man eine Khatm lesen, deren Dschuz auf mehrere Personen verteilt sind?",
        c: "Ein eigenes Urteil gibt diese Anleitung dazu nicht. Solche Fragen beantwortet zum Beispiel das ägyptische Fatwa-Amt [Dar al-Ifta](https://www.dar-alifta.org/de), oder du fragst einen Gelehrten deines Vertrauens in deiner Moschee. Die App teilt nur die Dschuz auf und zeigt, welche gelesen sind." },
    ],
  },

  ilgili: ["tek", "katil", "oruc"],
  kart: { kicker: "Khatm", baslik: "Khatm-Gruppe gründen", metin: "Gründe deinen Kreis, teile die 30 Dschuz auf; sieh vorher, wer was liest, die Runden laufen von selbst." },
  onizleme: { sahne: "hatim-kart", adim: 6 },
  cta: { baslik: "Gründe heute deinen Kreis", metin: "Einen Kreis gründen und beitreten ist kostenlos. Lade die App, gründe deinen Kreis und teile den Einladungslink." },
};
