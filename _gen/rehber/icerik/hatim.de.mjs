// P1 · Khatm-Gruppe gründen und Dschuz verteilen (DE). Format: Kommentar am Anfang von _gen/build-rehber.mjs.
// Knopfnamen kommen über [[schlüssel]] aus der App; kein langer Gedankenstrich, kein Cevşen.
export default {
  title: "Khatm-Gruppe gründen und den Koran in Dschuz aufteilen",
  desc: "Gründe mit Familie oder Gemeinde eine Khatm-Gruppe (Hatim): Jeder bekommt seinen Dschuz automatisch, liest ihn in der App, neue Runden starten von selbst.",
  h1: "So gründest du eine Khatm-Gruppe und verteilst die Dschuz",
  crumb: "Khatm-Gruppe gründen",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "Zuerst gründest du einen Kreis, also eine Gruppe für deine Familie oder deine Gemeinde. Dann startest du in diesem Kreis eine Khatm, auf Türkisch Hatim. Wer welchen Dschuz (Cüz) liest, verteilt die App. Ist die Woche um, kommen die nächsten Dschuz von selbst.",
  meta: ["Einrichtung etwa 2 Minuten", "Keine E-Mail, kein Passwort", "Kostenlos"],
  film: { sahne: "film-hatim", cap: "Der ganze Ablauf am Stück: Kreis gründen, Koran wählen, starten." },

  kisa: {
    maddeler: [
      "Öffne in der App den Tab [[tabs.circles]] und tippe auf [[circlesTab.anonCreate]]. Gib deinen Namen und den Namen des Kreises ein und bestätige mit [[createGroup.create]].",
      "Tippe auf [[group.welcome.step1Btn]] und schick den Link an deine Familie oder in eure WhatsApp-Gruppe. Wer den Link antippt, tippt auf [[joinGroup.join]] und ist im Kreis.",
      "Sind alle dabei, tippe auf [[group.welcome.step2Btn]] und wähle die Karte [[tx:wizard.goalQuran]].",
      "Dschuz-Chatma, volle Chatma, eine Runde pro Woche und 1 Dschuz pro Person sind schon eingestellt. Tippe dreimal auf [[wizard.continue]].",
      "Gib der Aufgabe einen Namen, sieh in der Vorschau, wer mit welchem Dschuz beginnt, und tippe auf [[wizard.startCircle]].",
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
          ],
          ipucu: "[[tx:createGroup.detailedTrackingTitle]] wählst du nur beim Gründen. Schaltest du sie ein, siehst du als Admin den täglichen Fortschritt der Mitglieder. Die Mitglieder sehen ihn nicht.",
          sahne: "halka-form",
        },
        {
          baslik: "Lade deine Liebsten ein",
          metin: "Im Kreis erscheint die Karte [[tx:group.welcome.title]]. Tippe auf [[group.welcome.step1Btn]] und schick den Link in eure WhatsApp-Gruppe, an deine Familie oder an wen du möchtest. Wer den Link antippt, sieht auf seinem Handy die Einladungskarte des Kreises. Tippt er auf [[joinGroup.join]], ist er im Kreis. Öffnet sich der Link im Browser statt in der App, tippt er auf der Seite auf **App öffnen**.",
          fark: "Eure WhatsApp-Gruppe bleibt. Teilt dort den Link; wer welchen Dschuz liest, hält die App fest.",
          ipucu: "Erst einladen, dann die Khatm starten. Die Dschuz gehen an alle, die beim Start im Kreis sind. Wer später beitritt, bekommt in der nächsten Runde einen Teil.",
          sahne: "davet-paylas",
        },
        {
          baslik: "Wenn du willst: per Code oder QR-Code einladen",
          metin: [
            "Oben rechts im Kreis siehst du drei Symbole. Tippst du auf das mittlere, die Person mit dem Pluszeichen, öffnet sich das Fenster [[tx:group.inviteToCircle]]: ein kurzer Code aus sechs Zeichen, der Einladungslink und ein QR-Code. Den Code kannst du am Telefon durchsagen, den QR-Code in der Moschee auf einer Leinwand zeigen.",
            "Wer die App noch nicht hat, lädt sie über die Seite, die sich beim Antippen des Links öffnet. Danach tippt er im Tab [[tabs.circles]] auf [[ol:circlesTab.anonJoin]], fügt den Einladungslink oder den Code ein und tritt bei. Mehr dazu: [Einem Kreis per Einladung beitreten](/de/anleitungen/kreis-beitreten/).",
          ],
          sahne: "davet-penceresi",
        },
      ],
    },
    {
      tur: "bolum", id: "hatim", rol: "Wer den Kreis gründet", baslik: "Starte die Khatm",
      giris: "Die Khatm ist eine Aufgabe im Kreis. Im selben Kreis können eine Khatm, ein Dhikr und eine Buchlesung nebeneinander laufen.",
      adimlar: [
        {
          baslik: "Aufgabe erstellen und Koran wählen",
          metin: "Sind alle beigetreten, tippe auf der Karte [[tx:group.welcome.title]] auf [[group.welcome.step2Btn]]. Der runde Knopf **+** unten rechts öffnet denselben Bildschirm. Wähle dort die Karte [[tx:wizard.goalQuran]].",
          sahne: "gorev-olustur",
        },
        {
          baslik: "Mit den Voreinstellungen dreimal auf Weiter tippen",
          metin: "Die Einstellungen sind für die häufigste Khatm schon gesetzt. Musst du nichts ändern, tippe dreimal auf [[wizard.continue]]:",
          liste: [
            "[[tx:wizard.targetJuz]] und [[tx:wizard.fullHatim]]: Die 30 Dschuz werden im Kreis aufgeteilt.",
            "[[tx:wizard.week]]: Jede Woche beginnt eine neue Runde. Du kannst auch [[tx:wizard.day]] wählen, dann lest ihr jeden Tag.",
            "1 Dschuz pro Person: In einem Kreis mit 5 Personen werden jede Woche 5 Dschuz gelesen, die Khatm ist nach etwa 6 Wochen fertig. Seid ihr 30, ist sie in einer Woche fertig.",
          ],
          fark: "Die Übersicht unten auf dem Bildschirm rechnet aus, wie lange die Khatm ungefähr dauert, während du die Einstellungen änderst.",
          ipucu: "Willst du den Kreis verwalten, aber selbst keinen Dschuz übernehmen, schalte auf dem Bildschirm mit der Rundenhäufigkeit [[tx:wizard.observerModeTitle]] ein. Oben auf diesem Bildschirm steht **Schritt 3 / 5**.",
          sahne: "uc-devam",
        },
        {
          baslik: "Gib der Aufgabe einen Namen und starte",
          metin: "Schreib einen Namen in das Feld [[tx:wizard.circleTitle]], zum Beispiel „Familien-Chatma“. Darunter zeigt die Vorschau, wer mit welchem Dschuz beginnt. Tippe auf [[wizard.startCircle]]. Jeder hat seinen Dschuz im selben Moment auf dem eigenen Bildschirm.",
          fark: "Wer was liest, musst du nicht ausrechnen; die App verteilt nach der Reihenfolge im Kreis.",
          ipucu: "[[tx:wizard.autoAdvanceTitle]] ist eingeschaltet: Ist die Rundenzeit um, startet die neue Runde von selbst. Die Runden wechseln um Mitternacht in deiner Zeitzone; auf dem Bildschirm steht dazu eine Zeile wie „Die Runden richten sich nach der Zeit in Berlin.“",
          sahne: "gorevi-baslat",
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
      tur: "bolum", id: "oku", rol: "Alle im Kreis", baslik: "Lies deinen Dschuz",
      giris: "Alle im Kreis lesen ihren Teil an ihrem eigenen Ort, zu ihrer eigenen Zeit.",
      adimlar: [
        {
          baslik: "Tippe auf die Benachrichtigung oder auf die Karte auf der Startseite",
          metin: "Beginnt eine neue Runde, bekommst du eine Benachrichtigung; tippst du sie an, öffnet sich deine Aufgabe. Hast du die App selbst geöffnet, tippe im Tab [[tx:tabs.home]] im Bereich [[tx:dashboard.myTasks]] auf die Karte der Khatm: Dort stehen der Name des Kreises, dein Dschuz und die verbleibenden Tage.",
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
        { baslik: "Um Hilfe bitten", metin: "Tippe unter der Aufgabenkarte auf [[ol:flow.askHelp]]. Gib ein, wie viele Seiten du selbst liest, und tippe im Fenster auf [[flow.askHelp]]. Die übrigen Seiten sehen die anderen im Kreis in der Liste [[tx:flow.waitingForHelpTitle]].", sahne: "yardim-iste" },
        { baslik: "Helfen", metin: "Im Tab [[tx:flow.tabCircle]] der Aufgabe siehst du, wer auf Hilfe wartet. Tippe auf [[flow.helpTitle]] und wähle im Fenster, wie viel du übernimmst. Die Seiten, die du übernimmst, landen auf deinem Bildschirm.", sahne: "yardim-et" },
      ],
      not: "Musst du deinen Teil ganz abgeben, kannst du ihn mit [[ol:flow.excuse]] in den Pool legen; wer möchte, übernimmt ihn von dort. Dieser Schritt lässt sich nicht rückgängig machen.",
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "So sieht es in der App aus",
      giris: "Diese Bilder stammen direkt aus der App.",
      kareler: [
        { img: "n01-halka", alt: "Kreis-Bildschirm: Aufgaben im Tab Lesungen und unten rechts der runde Knopf +", cap: "Kreis-Bildschirm: Aufgaben und der Knopf **+** unten rechts" },
        { img: "n02c-wizard-adim3", alt: "Ziel einrichten: Wie oft werden Runden zugewiesen, Woche ist gewählt", cap: "Beim Einrichten: wie oft eine Runde beginnt" },
        { img: "h01-home", alt: "Startseite: Bereich Deine Aufgaben mit den Aufgaben der Kreise", cap: "Startseite: deine Aufgaben" },
        { img: "n04-yonet", alt: "Khatm-Bildschirm, Tab Kreis: wer auf Hilfe wartet und wer bei welchem Dschuz ist", cap: "In der Khatm: wer bei welchem Dschuz ist" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Wie werden die Dschuz verteilt, wer liest was?",
        c: "Die App verteilt nach der Reihenfolge im Kreis: Die erste Person bekommt Dschuz 1, die zweite Dschuz 2 und so weiter. Bevor du die Khatm startest, siehst du diese Liste auf dem letzten Bildschirm. In der nächsten Runde gehen die folgenden Dschuz in derselben Reihenfolge weiter: In einem Kreis mit 5 Personen geht die zweite Runde mit den Dschuz 6–10 weiter." },
      { s: "Was passiert, wenn eine Runde endet? Welche Uhrzeit gilt?",
        c: "Ist **Automatisch zur nächsten Runde** eingeschaltet (so ist es voreingestellt), beginnt die neue Runde um Mitternacht in der Zeitzone des Kreises von selbst, und die nächsten Dschuz werden verteilt. Schaltest du es aus, startest du die neue Runde selbst." },
      { s: "Was, wenn jemand seinen Dschuz nicht schafft?",
        c: "Der ungelesene Teil geht nicht verloren, er bleibt in der nächsten Runde als **anvertraute** Aufgabe bei dieser Person. Sie kann mit **Hilfe anfordern** einen Teil an den Kreis abgeben oder mit **Entschuldigung** alles in den Pool legen; die anderen übernehmen ihn mit **Hilfe** oder **Übernehmen**." },
      { s: "Wir haben eine WhatsApp-Gruppe. Brauchen wir die App trotzdem?",
        c: "Eure Gruppe bleibt. Teilt den Einladungslink dort; die Liste, wer gelesen hat, und die Erinnerung übernimmt die App. Du musst nicht jede Woche eine neue Liste schreiben." },
      { s: "Können Angehörige ohne App mitmachen?",
        c: "In einem regelmäßigen Kreis kann der Admin jemanden ohne App als **Gast** hinzufügen; eine verantwortliche Person markiert, was der Gast gelesen hat. Wird bei einer einmaligen Khatm **Gemeinsamer Pool** gewählt, können Menschen ohne App über den Einladungslink im Browser einen Dschuz übernehmen: [Einmaliger Kreis](/de/anleitungen/einmaliger-kreis/)." },
      { s: "Kostet das etwas?",
        c: "Einen Kreis gründen, eine Khatm starten und einem Kreis beitreten ist kostenlos. Mit einem kostenlosen Konto kannst du jeweils einen selbst gegründeten Kreis verwalten; beitreten kannst du beliebig vielen Kreisen." },
      { s: "Darf man eine Khatm lesen, deren Dschuz auf mehrere Personen verteilt sind?",
        c: "Ein eigenes Urteil gibt diese Anleitung dazu nicht. Frag einen Gelehrten deines Vertrauens, zum Beispiel in deiner Moschee. Die App teilt nur die Dschuz auf und zeigt, welche gelesen sind." },
    ],
  },

  ilgili: ["tek", "zikir", "katil"],
  kart: { kicker: "Khatm", baslik: "Khatm-Gruppe gründen", metin: "Gründe deinen Kreis, teile die 30 Dschuz auf; die Runden gehen von selbst weiter." },
  onizleme: { sahne: "gorevi-baslat", adim: 3 },
  cta: { baslik: "Gründe heute deinen Kreis", metin: "Einen Kreis gründen und beitreten ist kostenlos. Lade die App, gründe deinen Kreis und teile den Einladungslink." },
};
