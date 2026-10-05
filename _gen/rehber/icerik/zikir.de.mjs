// P3 · Dhikr und Salawat gemeinsam zählen (DE). Format: Kommentar am Anfang von _gen/build-rehber.mjs.
// Knopfnamen kommen über [[schlüssel]] aus der App; kein langer Gedankenstrich, kein Cevşen.
// Die Vorlagen im einmaligen Kreis (Salavât-ı Şerîfe, Yâsîn Sûresi, İhlâs Sûresi) zeigt die App in jeder Sprache so.
export default {
  title: "Dhikr und Salawat gemeinsam zählen: ein Ziel",
  desc: "Setze mit deinem Kreis ein gemeinsames Salawat- oder Dhikr-Ziel, und ihr zählt zusammen auf einem Zähler. Auch für Yasin oder Ichlas mit fester Anzahl.",
  h1: "So setzt du ein gemeinsames Dhikr- oder Salawat-Ziel",
  crumb: "Dhikr und Salawat gemeinsam",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "In deinem Kreis legst du ein Dhikr-Ziel an, zum Beispiel 1000 Salawat am Tag. Jeder rezitiert an seinem eigenen Ort, zu seiner eigenen Zeit, und trägt seine Anzahl in der App ein. Die App zählt nur die Zahlen zusammen; die Summe des Kreises sieht jeder auf seinem Bildschirm.",
  meta: ["Einrichtung etwa 2 Minuten", "Keine E-Mail, kein Passwort", "Kostenlos"],
  film: { sahne: "film-zikir", cap: "Vom Kreis zum gemeinsamen Zähler: Dhikr, Gemeinsamer Pool, Salawat, starten." },

  kisa: {
    maddeler: [
      "Öffne deinen Kreis, tippe unten rechts auf **+** und wähle die Karte [[tx:wizard.goalZikir]].",
      "Wähle auf dem Bildschirm [[tx:wizard.zikirModeQuestion]] die Möglichkeit [[tx:wizard.zikirOption2]]: Der Kreis hat dann einen einzigen Zähler.",
      "Tippe unter [[tx:wizard.zikirPresetSection]] auf die Zeile [[tx:wizard.zikirPresetSalavat]], gib die Zielzahl ein und tippe auf [[wizard.zikirAdd]].",
      "Gib der Aufgabe einen Namen und tippe auf [[wizard.startCollectiveGoal]].",
      "Jeder tippt in der Aufgabe auf die Karte und zählt, oder trägt mit [[zikir.bulkAdd]] ein, was er mit der Tasbih gezählt hat. Gespeichert wird von selbst.",
      "Für eine große Summe über mehrere Tage gründe einen einmaligen Kreis, setz den Dhikr auf [[tx:event.modeCollective]] und starte den Kreis.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Wer den Kreis verwaltet", baslik: "Lege das Dhikr-Ziel an",
      giris: "Ein Dhikr-Ziel entsteht in einem Kreis. Hast du noch keinen Kreis, gründe ihn mit den ersten Schritten der Anleitung [Khatm-Gruppe gründen](/de/anleitungen/khatm-gruppe/) und lade deine Liebsten ein.",
      adimlar: [
        {
          baslik: "Im Kreis auf + tippen und Dhikr wählen",
          metin: [
            "Öffne unten in der Leiste den Tab [[tabs.circles]] und dann deinen Kreis. Tippe im Tab [[tx:group.readingsTab]] unten rechts auf den runden Knopf **+**.",
            "Der Bildschirm [[tx:wizard.goalTypeQuestion]] öffnet sich. Tippe unter [[tx:practice.sectionReadings]] auf die Karte [[tx:wizard.goalZikir]].",
          ],
          ipucu: "In einem neuen Kreis öffnet auch der Knopf [[group.welcome.step2Btn]] auf der Karte [[tx:group.welcome.title]] diesen Bildschirm. Den Knopf **+** sehen der Admin und die Moderatoren des Kreises.",
          sahne: "zikir-gorev-ac",
        },
        {
          baslik: "„Gemeinsamer Pool“ wählen",
          metin: "Die App fragt, wie gezählt werden soll. Es gibt drei Möglichkeiten:",
          liste: [
            "[[tx:wizard.zikirOption1]]: Alle bekommen dieselbe Liste, jeder zählt für sich.",
            "[[tx:wizard.zikirOption2]]: Der Kreis hat einen einzigen Zähler. Was jeder rezitiert, kommt in dieselbe Summe.",
            "[[tx:wizard.zikirOption3]]: Deine Liste und deine Zahlen bleiben bei dir.",
          ],
          fark: "Für gemeinsame Salawat tippe auf die Karte [[tx:wizard.zikirOption2]] und dann auf [[wizard.continue]]. Niemand muss seine Zahl melden, niemand rechnet die Summe von Hand aus.",
          sahne: "zikir-havuz",
        },
        {
          baslik: "Dhikr und Zielzahl wählen",
          metin: [
            "Tippe im Bereich [[tx:wizard.zikirPresetSection]] auf die Zeile [[tx:wizard.zikirPresetSalavat]]. Von unten öffnet sich ein Fenster. Tippe auf die Zahl und gib das gemeinsame Tagesziel des Kreises ein, zum Beispiel 1000. Der Zähler beginnt jede Nacht um Mitternacht von vorn. Tippe dann auf [[wizard.zikirAdd]].",
            "Du kannst weitere Dhikr hinzufügen: [[tx:wizard.zikirPresetIstigfar]], [[tx:wizard.zikirPresetKelime]], [[tx:wizard.zikirEsmaTitle]] oder mit [[tx:wizard.zikirCustomAdd]] deinen eigenen. Was du wählst, steht unten in der Liste. Mach die Liste hier fertig: Beim gemeinsamen Pool lassen sich nach dem Start keine Dhikr mehr hinzufügen oder entfernen. Tippe danach auf [[wizard.continue]].",
          ],
          ipucu: "Im selben Fenster gibt es die Zeile [[tx:wizard.zikirItemTimeLabel]]; [[tx:wizard.zikirTimeAllDay]] ist gewählt, und du stellst das für jeden Dhikr einzeln ein. Wählst du [[tx:wizard.zikirTimeMorning]], steht dieser Dhikr bis zur Mittagszeit vorn; zu anderen Zeiten ist er blasser, lässt sich aber trotzdem zählen.",
          sahne: "zikir-salavat",
        },
        {
          baslik: "Gib der Aufgabe einen Namen und starte",
          metin: [
            "Schreib einen Namen in das Feld [[tx:wizard.circleTitle]], zum Beispiel „Freitags-Salawat“. Tippe auf [[wizard.startCollectiveGoal]].",
            "Tippst du im Fenster [[tx:common.success]] auf [[group.goToTaskScreen]], öffnet sich die Aufgabe. Sie steht nun in der Liste des Kreises; die anderen sehen sie auf der Startseite im Bereich [[tx:dashboard.myTasks]].",
          ],
          ipucu: "Willst du selbst nicht zählen und nur den Kreis begleiten, kannst du vor dem Start [[tx:wizard.observerModeTitle]] einschalten.",
          sahne: "zikir-baslat",
        },
      ],
    },
    {
      tur: "bolum", id: "say", rol: "Alle im Kreis", baslik: "Rezitiere und trag deine Anzahl ein",
      giris: "Jeder rezitiert an seinem eigenen Ort, zu seiner eigenen Zeit. Niemand muss sich versammeln und gemeinsam laut Dhikr machen; die App zählt nur die Zahlen zusammen. Bist du dem Kreis noch nicht beigetreten, tippe zuerst den Einladungslink an: [Einem Kreis per Einladung beitreten](/de/anleitungen/kreis-beitreten/).",
      adimlar: [
        {
          baslik: "Öffne die Aufgabe und tippe auf den Zähler",
          metin: [
            "Tippe auf der Startseite im Bereich [[tx:dashboard.myTasks]] auf die Karte. In der Aufgabe siehst du für jeden Dhikr eine Karte, darunter die Zahl des Kreises für heute, zum Beispiel „Gemeinsam: 840 / 1000“.",
            "Tippe auf die Karte, der Zähler öffnet sich. Jedes Tippen auf den großen Ring in der Mitte zählt eins. Die Zahl im Ring ist die Summe des ganzen Kreises; darunter steht [[tx:zikir.counterGroupTotal]].",
            "Einen Speichern-Knopf gibt es nicht. Was du zählst, wird von selbst gespeichert, und unten erscheint [[tx:zikir.counterSaved]].",
          ],
          fark: "Am Abend musst du nicht fragen, wie viele es schon sind: Die gemeinsame Zahl ändert sich auch auf den Bildschirmen der anderen.",
          ipucu: "Hast du dich vertippt, tippe unten auf [[ol:zikir.counterUndo]]; die letzte Zählung wird gelöscht.",
          sahne: "zikir-say",
        },
        {
          baslik: "Mit der Tasbih gezählt? Auf einmal eintragen",
          metin: [
            "Hast du den Dhikr mit der Tasbih oder im Kopf gezählt, musst du nicht einzeln tippen. Tippe unter dem Zähler auf [[zikir.bulkAdd]]. Langes Drücken auf den Zähler öffnet dasselbe Fenster.",
            "Tippe auf +10, +33 oder +100, oder gib im Feld [[tx:zikir.bulkAddPlaceholder]] deine eigene Zahl ein und tippe auf [[common.add]]. Der Balken unten in der Aufgabe zeigt die gemeinsame Summe des Tages in Prozent.",
          ],
          ipucu: "Der gemeinsame Zähler beginnt jeden Tag um Mitternacht nach deiner Ortszeit von vorn; es ist ein Tagesziel. Möchtest du über mehrere Tage eine große Summe sammeln, nimm den einmaligen Kreis unten.",
          sahne: "zikir-toplu",
        },
      ],
    },
    {
      tur: "bolum", id: "tek-seferlik", rol: "Wer den Kreis gründet", baslik: "Ein einmaliges Ziel für einen Anlass",
      giris: "Möchtest du bis zu einem bestimmten Datum eine große Summe sammeln, etwa Salawat in einer gesegneten Nacht oder für einen Verstorbenen, brauchst du keinen dauerhaften Kreis.",
      adimlar: [
        {
          baslik: "Im einmaligen Kreis „Gemeinsam“ wählen",
          metin: [
            "Tippe im Tab [[tabs.circles]] oben rechts auf **+** und wähle die Karte [[tx:event.createMenuTitle]]. Wähle als Art [[tx:event.typeZikir]] und tippe auf [[common.continue]].",
            "Siehst du oben rechts kein **+**, ist dein Name in der App noch nicht gespeichert. Tippe auf demselben Bildschirm auf [[ol:circlesTab.anonJoin]] und gib deinen Namen ein. Geh dann zurück; der Knopf **+** erscheint.",
            "Tippe im Schritt [[tx:event.zikirGoalTitle]] auf die Vorlage [[=Salavât-ı Şerîfe]]. Schreib in das Feld [[tx:event.target]] das Gesamtziel des Kreises, zum Beispiel 10.000. Tippe dann auf [[tx:event.modeCollective]].",
            "Bei einem Dhikr mit [[tx:event.modeCollective]] zählt der ganze Kreis auf ein Ziel hin, und die Zahlen sammeln sich bis zum Enddatum. Wählst du [[tx:event.modeIndividual]], erfüllt jeder sein eigenes Ziel.",
            "Wähle in den nächsten Schritten das Enddatum, gib dem Kreis einen Namen und tippe auf [[event.create]]. Teile im Kreis mit [[event.inviteFriends]] den Einladungslink.",
            "Gezählt werden kann, sobald der Kreis gestartet ist. Sind alle beigetreten, tippe im Kreis auf [[event.startNow]] und im Fenster noch einmal auf [[event.startNow]]. Du kannst auch beim Gründen ein Häkchen bei [[tx:event.registrationWindowToggle]] setzen; dann startet der Kreis zur gewählten Uhrzeit von selbst.",
          ],
          fark: "Wer den Link antippt, den du im Kreis mit [[event.inviteFriends]] teilst, kann auch ohne App auf der Seite im Browser zur Zählung beitragen. Das geht nur bei Dhikr mit [[tx:event.modeCollective]] und erst nach dem Start des Kreises.",
          ipucu: "Mehr zu Datum, Einladung und Widmung: [Einmaliger Kreis](/de/anleitungen/einmaliger-kreis/).",
          sahne: "zikir-tek-toplu",
        },
        {
          baslik: "Für Yasin oder Ichlas die Art Bittgebet / Sure wählen",
          metin: [
            "Wähle im ersten Schritt des einmaligen Kreises als Art [[tx:event.typeDua]]. Im Schritt [[tx:event.duaGoalTitle]] stehen in der Vorlagenliste auch [[=Yâsîn Sûresi]] und [[=İhlâs Sûresi]]. Schreib in das Feld [[tx:event.target]], wie oft der Kreis insgesamt lesen soll, und wähle [[tx:event.modeCollective]].",
            "Jeder trägt in den Zähler ein, was er gelesen hat; die Summe sieht jeder auf seinem Bildschirm. Wie oft gelesen wird, entscheidest du; zur Überlieferung der Anzahl frag einen Gelehrten deines Vertrauens.",
          ],
        },
      ],
    },
    {
      tur: "bolum", id: "ameller", rol: "Wer den Kreis verwaltet", baslik: "Tage abhaken statt zählen",
      giris: "Willst du jeden Tag dieselbe Sure oder dasselbe Bittgebet lesen oder die Gebete gemeinsam im Blick behalten, gibt es statt des Zählers ein tägliches Häkchen.",
      adimlar: [
        {
          baslik: "Schau in den Bereich Gemeinsame Praxis",
          metin: [
            "Tippst du im Kreis auf **+**, steht unten auf dem Bildschirm der Bereich [[tx:practice.sectionPractices]]: [[tx:practice.typeReading]] (etwa Al-Mulk, Al-Kahf, Yasin), [[tx:practice.typeDua]] und [[tx:practice.typePrayer]].",
            "Hier wird nicht gezählt: Jeder pflegt seine eigene Praxis und hakt ab, was er an diesem Tag getan hat. Diesen Bereich sieht der Admin des Kreises.",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "So sieht es in der App aus",
      giris: "Diese Bilder stammen direkt aus der App.",
      kareler: [
        { img: "n05b-zikir-gorevim", alt: "Dhikr-Aufgabe: zwei Dhikr-Karten mit gemeinsamen Zahlen, unten die gemeinsame Summe 80 Prozent", cap: "Aufgabe: gemeinsame Zahlen und die Summe des Tages" },
        { img: "h01-home", alt: "Startseite: Bereich Deine Aufgaben mit den Aufgaben der Kreise", cap: "Startseite: deine Aufgaben" },
        { img: "n01-halka", alt: "Kreis-Bildschirm: Dhikr-, Buch- und Koran-Aufgaben im Tab Lesungen, darunter Gemeinsame Praxis und unten rechts der Knopf +", cap: "Kreis-Bildschirm: Aufgaben und der Knopf **+** unten rechts" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Wie setze ich ein gemeinsames Salawat-Ziel?",
        c: "Tippe in deinem Kreis unten rechts auf **+**, wähle die Karte [[tx:wizard.goalZikir]] und dann [[tx:wizard.zikirOption2]]. Tippe auf die Zeile [[tx:wizard.zikirPresetSalavat]], gib die Zielzahl ein, gib der Aufgabe einen Namen und starte. Für ein Ziel bis zu einem bestimmten Datum gründe einen einmaligen Kreis, setz den Dhikr auf [[tx:event.modeCollective]] und starte dann den Kreis. Einen Kreis gründen, ein Dhikr-Ziel anlegen und beitreten ist kostenlos. Mit einem kostenlosen Konto kannst du jeweils einen selbst gegründeten Kreis verwalten; beitreten kannst du beliebig vielen Kreisen." },
      { s: "Zählt jeder für sich oder alle auf einem Zähler?",
        c: "Das wählst du. Bei [[tx:wizard.zikirOption1]] zählt jeder dieselbe Liste für sich. Bei [[tx:wizard.zikirOption2]] hat der Kreis einen einzigen Zähler, und was jeder rezitiert, kommt in dieselbe Summe. Im einmaligen Kreis wählst du das für jeden Dhikr einzeln: [[tx:event.modeIndividual]] oder [[tx:event.modeCollective]]." },
      { s: "Beginnt der gemeinsame Zähler jeden Tag von vorn?",
        c: "Der gemeinsame Pool im regelmäßigen Kreis ist ein Tagesziel: Der Zähler beginnt jede Nacht um Mitternacht nach der Ortszeit jedes Einzelnen von vorn. Im einmaligen Kreis sammelt sich die Zahl eines Dhikr mit [[tx:event.modeCollective]] nach dem Start bis zum Enddatum." },
      { s: "Können wir Yasin oder Ichlas gemeinsam eine bestimmte Anzahl von Malen lesen?",
        c: "Gründe einen einmaligen Kreis, wähle als Art [[tx:event.typeDua]] und füge aus der Vorlagenliste [[=Yâsîn Sûresi]] oder [[=İhlâs Sûresi]] hinzu. Schreib die Gesamtzahl in das Feld für das Ziel und wähle [[tx:event.modeCollective]]. Wie oft gelesen wird, entscheidest du; zur Überlieferung der Anzahl frag einen Gelehrten deines Vertrauens." },
      { s: "Wie trage ich meine Anzahl ein?",
        c: "Tippe in der Aufgabe auf die Karte des Dhikr; im Zähler zählt jedes Tippen eins. Hast du mit der Tasbih gezählt, trägst du mit [[zikir.bulkAdd]] eine Zahl wie +33 oder +100 auf einmal ein. Einen Speichern-Knopf gibt es nicht, gespeichert wird von selbst." },
      { s: "Können Menschen ohne App mitzählen?",
        c: "Im einmaligen Kreis ja: Nach dem Start kann jeder, der den mit [[event.inviteFriends]] geteilten Link antippt, auf der Seite im Browser zu Dhikr mit [[tx:event.modeCollective]] beitragen. Für Dhikr mit [[tx:event.modeIndividual]] braucht man die App. Auch für das Dhikr-Ziel im regelmäßigen Kreis braucht man die App." },
      { s: "Muss man sich dafür versammeln und gemeinsam laut Dhikr machen?",
        c: "Nein. Jeder rezitiert an seinem eigenen Ort, zu seiner eigenen Zeit. Die App zählt nur die Zahlen zusammen und zeigt die Summe des Kreises." },
    ],
  },

  ilgili: ["hatim", "tek", "katil"],
  kart: { kicker: "Dhikr", baslik: "Dhikr und Salawat gemeinsam", metin: "Gemeinsam auf einem Zähler zählen: Salawat, Dhikr, Ziele für Yasin und Ichlas." },
  onizleme: { sahne: "zikir-say", adim: 6 },
};
