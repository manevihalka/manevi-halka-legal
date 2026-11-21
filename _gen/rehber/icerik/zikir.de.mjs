// P3 · Dhikr und Salawat gemeinsam zählen (DE). Quelle: zikir.tr.mjs (21. Nov. 2026, App 2.1.0).
// Knopfnamen kommen über [[schlüssel]] aus der App; kein langer Gedankenstrich, kein Cevşen.
export default {
  title: "Dhikr und Salawat gemeinsam zählen: ein Ziel",
  desc: "Setze mit deinem Kreis ein gemeinsames Salawat- oder Dhikr-Ziel, alle zählen auf einem Zähler. Einrichtung, Zähler, Vorhang und einmalige Ziele.",
  h1: "So setzt du ein gemeinsames Dhikr- oder Salawat-Ziel",
  crumb: "Dhikr und Salawat gemeinsam",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "In deinem Kreis legst du ein Dhikr-Ziel an, zum Beispiel 1000 Salawat am Tag. Jeder rezitiert an seinem eigenen Ort, zu seiner eigenen Zeit, und trägt seine Anzahl in der App ein. Die App zählt nur die Zahlen zusammen; die Summe des Kreises sieht jeder auf seinem Bildschirm.",
  meta: ["Einrichtung etwa 2 Minuten", "Keine E-Mail, kein Passwort", "Kostenlos"],
  film: { sahne: "film-zikir", cap: "Vom Kreis zum gemeinsamen Zähler: [[group.addTask]], [[tx:compose.typeZikir]], [[tx:wizard.zikirOption2]], Salawat, starten." },

  kisa: {
    maddeler: [
      "Öffne deinen Kreis, tippe unten rechts auf [[group.addTask]] und wähle die Karte [[tx:compose.typeZikir]].",
      "Tippe auf die Zeile [[tx:compose.zikirHow]] und wähle [[tx:wizard.zikirOption2]]: Der Kreis bekommt einen einzigen Zähler.",
      "Füge mit [[tx:compose.zikirPickOther]] [[tx:wizard.zikirPresetSalavat]] hinzu. Tippe auf den Dhikr und gib das Tagesziel ein, zum Beispiel 1000.",
      "Prüfe den Namen der Aufgabe und tippe auf [[compose.startTask]].",
      "Alle tippen in der Aufgabe auf die Karte und zählen, oder tragen mit [[zikir.bulkAdd]] ein, was sie mit der Gebetskette rezitiert haben. Die Zählung wird von selbst gespeichert.",
      "Für eine große Summe über mehrere Tage wähle im einmaligen Kreis die Vorlage [[tx:eventCompose.tplSalavat]] und tippe auf [[eventCompose.cta]].",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Wer den Kreis leitet", baslik: "Das Dhikr-Ziel einrichten",
      giris: "Ein Dhikr-Ziel entsteht in einem Kreis. Hast du noch keinen Kreis, gründe ihn mit den ersten Schritten der Anleitung [Khatm-Gruppe gründen](/de/anleitungen/khatm-gruppe/) und lade deine Liebsten ein.",
      adimlar: [
        {
          baslik: "Auf Aufgabe hinzufügen tippen, Dhikr und Salawat wählen",
          metin: [
            "Öffne unten in der Leiste den Tab [[tabs.circles]] und dann deinen Kreis. Tippe im Tab [[tx:group.tasksTab]] unten rechts auf [[group.addTask]].",
            "Der Bildschirm [[tx:compose.pickTitle]] öffnet sich. Tippe im Bereich [[tx:compose.sectionZikir]] auf die Karte [[tx:compose.typeZikir]]. Der Bildschirm zum Einrichten des Dhikr öffnet sich.",
          ],
          ipucu: "Den Knopf [[group.addTask]] sehen die Leitung des Kreises und die Moderatoren. Im Streifen [[tx:compose.quickStart]] oben auf demselben Bildschirm gibt es auch [[tx:zikirTpl.tesbihat.title]]; tippst du darauf, ist die Liste schon ausgefüllt.",
          sahne: "zikir-gorev-ac",
        },
        {
          baslik: "Wählen, wie gezählt wird",
          metin: "Oben auf dem Einrichtungsbildschirm steht die Zeile [[tx:compose.zikirHow]]. Tippe darauf, unten öffnet sich ein Fenster. Es gibt drei Möglichkeiten:",
          liste: [
            "[[tx:wizard.zikirOption1]]: Alle bekommen dieselbe Liste, jeder zählt für sich.",
            "[[tx:wizard.zikirOption2]]: Der Kreis hat einen einzigen Zähler. Was alle rezitieren, kommt in dieselbe Summe.",
            "[[tx:wizard.zikirOption3]]: Deine Liste und deine Zahlen bleiben nur bei dir.",
          ],
          fark: "Für gemeinsame Salawat wähle [[tx:wizard.zikirOption2]] und tippe auf [[common.ok]]. Niemand muss seine Zahl melden, niemand rechnet die Summe von Hand aus.",
          sahne: "zikir-havuz",
        },
        {
          baslik: "Dhikr und Tagesziel wählen",
          metin: [
            "Unter der Zeile stehen die [[tx:wizard.zikirPresetSection]]. Tippst du auf eine Liste wie [[tx:zikirTpl.tesbihat.title]] oder [[tx:zikirTpl.fatima.title]], kommen ihre Dhikrs mit den Zahlen.",
            "Nur für Salawat tippe auf [[tx:compose.zikirPickOther]]. Tippe in der Liste [[tx:compose.zikirSingles]] auf die Zeile [[tx:wizard.zikirPresetSalavat]] und dann auf [[common.ok]]. [[tx:wizard.zikirEsmaTitle]] und [[tx:wizard.zikirCustomAdd]] findest du auf derselben Seite.",
            "Tippe jetzt in deiner Liste auf den Dhikr. Gib im Fenster das gemeinsame Ziel des Kreises für einen Tag ein oder tippe auf 33, 100, 500 oder 1000, dann auf [[common.ok]]. Der Zähler beginnt jede Mitternacht neu.",
          ],
          ipucu: "Im selben Fenster gibt es die Zeile [[tx:wizard.zikirItemTimeLabel]]; [[tx:wizard.zikirTimeAllDay]] ist vorausgewählt. Wählst du [[tx:wizard.zikirTimeMorning]], steht dieser Dhikr bis Mittag vorne; zur anderen Zeit ist er blass, lässt sich aber trotzdem zählen. Mach die Liste vor dem Start fertig: Im gemeinsamen Pool lassen sich nach dem Start keine Dhikrs mehr hinzufügen oder entfernen.",
          sahne: "zikir-salavat",
        },
        {
          baslik: "Der Aufgabe einen Namen geben und starten",
          metin: [
            "Das Feld [[tx:compose.nameLabel]] füllt sich nach deiner Auswahl von selbst. Ändere es, wenn du möchtest, zum Beispiel in „Familien-Salawat“. Alle im Kreis sehen die Aufgabe unter diesem Namen.",
            "Tippe ganz unten auf [[compose.startTask]]. Im Fenster [[tx:common.success]] öffnet [[group.goToTaskScreen]] die Aufgabe. Sie erscheint in der Liste des Kreises; die anderen sehen sie auf dem Startbildschirm unter [[tx:dashboard.myTasks]].",
          ],
          ipucu: "Willst du selbst nicht zählen und den Kreis nur begleiten, öffne die Karte [[tx:compose.more]] und schalte [[tx:wizard.observerModeTitle]] ein.",
          sahne: "zikir-baslat",
        },
      ],
    },
    {
      tur: "bolum", id: "say", rol: "Alle im Kreis", baslik: "Dhikr rezitieren und eintragen",
      giris: "Jeder rezitiert an seinem eigenen Ort, zu seiner eigenen Zeit. Niemand muss sich versammeln und gemeinsam laut Dhikr machen; die App zählt nur die Zahlen zusammen. Bist du dem Kreis noch nicht beigetreten, tippe zuerst den Einladungslink an: [Einem Kreis per Einladung beitreten](/de/anleitungen/kreis-beitreten/).",
      adimlar: [
        {
          baslik: "Aufgabe öffnen und auf den Zähler tippen",
          metin: [
            "Tippe auf dem Startbildschirm unter [[tx:dashboard.myTasks]] auf die Karte. In der Aufgabe siehst du für jeden Dhikr eine Karte und darunter die Zahl des Kreises für den Tag, zum Beispiel „Gemeinsam: 840 / 1000“.",
            "Tippe auf die Karte, der Zähler öffnet sich. Jedes Tippen auf den großen Kreis in der Mitte zählt eins. Die Zahl im Kreis ist die Summe des Kreises; darunter steht [[tx:zikir.counterGroupTotal]].",
            "Einen Speichern-Knopf gibt es nicht. Was du zählst, wird von selbst gespeichert, und unten erscheint [[tx:zikir.counterSaved]].",
          ],
          fark: "Am Abend musst du nicht fragen, wie viele es schon sind: Die gemeinsame Zahl ändert sich auch auf den Bildschirmen der anderen.",
          ipucu: "Auch der Knopf [[event.count]] auf der Aufgabenkarte im Kreis öffnet direkt den Zähler. Hast du dich vertippt, tippe unten auf [[ol:zikir.counterUndo]]; die letzte Zählung wird entfernt.",
          sahne: "zikir-say",
        },
        {
          baslik: "Mit der Gebetskette rezitiert? Auf einmal eintragen",
          metin: [
            "Hast du mit der Gebetskette oder auswendig rezitiert, musst du nicht einzeln tippen. Tippe unter dem Zähler auf [[zikir.bulkAdd]]. Langes Drücken auf den Zähler öffnet dasselbe Fenster.",
            "Tippe auf +10, +33 oder +100, oder gib im Feld [[tx:zikir.bulkAddPlaceholder]] deine eigene Zahl ein und tippe auf [[common.add]]. Der Balken unten in der Aufgabe zeigt die gemeinsame Tagessumme in Prozent.",
          ],
          ipucu: "Der gemeinsame Zähler beginnt jeden Tag um Mitternacht neu, nach deiner eigenen Uhr; es ist ein Tagesziel. Möchtest du eine große Summe über mehrere Tage, nimm den einmaligen Kreis weiter unten.",
          sahne: "zikir-toplu",
        },
        {
          baslik: "Zählen, ohne hinzusehen: Vorhang und Gebetskette",
          metin: [
            "Tippst du unter dem Zähler auf [[ol:perde.title]], wird der Bildschirm dunkel. Du zählst, indem du irgendwo auf den Bildschirm tippst; die Zahl bleibt blass, bei jedem Tippen vibriert das Handy leicht. Zum Verlassen gedrückt halten.",
            "Der Knopf oben rechts öffnet die [[tx:counter.settingsTitle]]. Dort wählst du die Ansicht: [[tx:counter.modeRing]] oder [[tx:counter.modeStrand]]. In der Ansicht mit der Gebetskette zählst du auch, indem du die Perlen mit dem Finger nach unten ziehst.",
            "Ist das Ziel erreicht, wird die Zahl golden. Hat die Aufgabe noch einen Dhikr, erscheint unten ein Knopf [[=Als Nächstes]]; tippe darauf und mach weiter.",
          ],
          ipucu: "Tippst du in der Kopfzeile der Aufgabe auf die Glocke, stellst du dir eine Erinnerung ein. Sie kommt nur auf dieses Handy und nicht an einem Tag, an dem du schon zum gemeinsamen Dhikr beigetragen hast.",
          sahne: "zikir-perde",
        },
      ],
    },
    {
      tur: "bolum", id: "tek-seferlik", rol: "Wer den Kreis gründet", baslik: "Ein einmaliges Ziel für einen Anlass",
      giris: "Möchtest du bis zu einem bestimmten Datum eine große Summe sammeln, etwa mit der Absicht der Genesung für einen Kranken oder zu einem guten Anlass, brauchst du keinen dauerhaften Kreis.",
      adimlar: [
        {
          baslik: "Im einmaligen Kreis die Vorlage Salawat wählen",
          metin: [
            "Tippe im Tab [[tabs.circles]] oben rechts auf **+** und wähle die Zeile [[tx:event.createMenuTitle]]. Tippe auf dem Bildschirm [[tx:eventCompose.pickTitle]] auf die Karte [[tx:eventCompose.tplSalavat]].",
            "Die Übersicht öffnet sich. Das Ziel sind 1000 Salawat, gezählt wird gemeinsam: Der ganze Kreis zählt auf ein Ziel hin, die Zahlen sammeln sich bis zum Ende. Das Ziel änderst du in der Zeile [[tx:compose.rowWhat]]. Wähle in der Zeile [[tx:eventCompose.rowEnd]] das Ende und tippe auf [[eventCompose.cta]].",
            "Teile auf dem Bildschirm [[tx:eventCompose.readyTitle]] den Link mit [[eventCompose.invite]]. Der Kreis beginnt sofort.",
          ],
          fark: "Wer den Link antippt, kann auch ohne App auf der Seite im Browser zur gemeinsamen Zählung beitragen.",
          ipucu: "Für Yasin, Ichlas oder einen anderen Dhikr wähle die Vorlage [[tx:eventCompose.tplCustom]]; bei jedem Eintrag wählst du [[tx:event.modeCollective]] oder [[tx:event.modeIndividual]]. Absicht, Datum und Einladung im Detail: [Einmaliger Kreis](/de/anleitungen/einmaliger-kreis/).",
          sahne: "zikir-tek-toplu",
        },
      ],
    },
    {
      tur: "bolum", id: "kendi", rol: "Für dich allein", baslik: "Jeden Tag mit deiner eigenen Liste",
      giris: "Für den Dhikr, den du jeden Tag für dich sprichst, unabhängig von einem Kreis, gibt es den [[tx:read.zikirmatikTitle]]. Er öffnet sich über den Tab [[tabs.read]].",
      adimlar: [
        {
          baslik: "Deine Dhikr-Liste anlegen, die Gebetskette wächst",
          metin: [
            "Tippe im [[tx:read.zikirmatikTitle]] auf die Zeile [[tx:zikirList.listsRow]]. Lege deine eigene Liste an oder füge eine der fertigen Listen zu deinen hinzu.",
            "Schaltest du in der Liste [[tx:zikirDaily.toggleTitle]] ein, beginnt sie jeden Tag bei null. An jedem Tag, an dem du die Liste beendest, wird oben eine Perle auf die Schnur gefädelt; der Titel sagt dir, seit wie vielen Tagen du dabei bist. Der Tag wechselt, wenn die Zeit des Morgengebets beginnt.",
            "Fällt ein Tag aus, bleibt auf der Schnur eine Lücke; frühere Perlen verschwinden nicht. Wählst du in der Zeile [[tx:zikirList.reminder.title]] eine Uhrzeit, kommt dann eine Erinnerung auf dein Handy; nicht an einem Tag, an dem du die Liste schon beendet hast.",
          ],
          ipucu: "Willst du eine große Absichtszahl über mehrere Tage verteilen, schau im [[tx:read.zikirmatikTitle]] unter [[tx:niyet.title]]. Der Knopf [[ol:niyet.openCircle]] macht daraus einen einmaligen Kreis, und deine Liebsten tragen mit bei.",
          sahne: "zikir-ip",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "So sieht es in der App aus",
      giris: "Diese Bilder stammen direkt aus der App.",
      kareler: [
        { img: "n05b-zikir-gorevim", alt: "Dhikr-Aufgabe: gemeinsame Zahlen auf zwei Dhikr-Karten und unten die gemeinsame Summe bei 80 Prozent", cap: "Die Aufgabe: gemeinsame Zahlen und die Tagessumme" },
        { img: "ev-sablon", alt: "Einmaliger Kreis: der Bildschirm Was wollen wir gemeinsam lesen? mit den Karten Chatm, 41 Yasin, Salawat und Meine eigene Liste", cap: "Einmaliger Kreis: die Vorlage [[tx:eventCompose.tplSalavat]]" },
        { img: "z-liste", alt: "Dhikr-Liste: oben die Karte mit der Gebetskette, der Schalter für jeden Tag, die Zeile Erinnerung und drei Dhikrs", cap: "Deine eigene Liste: Gebetskette und Erinnerung" },
        { img: "z-sayac", alt: "Zähler in der Ansicht Gebetskette: der Dhikr auf Arabisch, fließende Perlen und links 73 / 100", cap: "Der Zähler in der Ansicht Gebetskette" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Wie richte ich ein gemeinsames Salawat-Ziel ein?",
        c: "Tippe in deinem Kreis auf [[group.addTask]] und wähle die Karte [[tx:compose.typeZikir]]. Wähle in der Zeile [[tx:compose.zikirHow]] [[tx:wizard.zikirOption2]], füge [[tx:wizard.zikirPresetSalavat]] hinzu, gib das Tagesziel ein und tippe auf [[compose.startTask]]. Für ein Ziel bis zu einem bestimmten Datum wähle im einmaligen Kreis die Vorlage [[tx:eventCompose.tplSalavat]]. Einen Kreis gründen, ein Dhikr-Ziel anlegen und beitreten ist kostenlos. Mit einem kostenlosen Konto leitest du gleichzeitig einen selbst gegründeten Kreis; Kreisen anderer kannst du ohne Grenze beitreten." },
      { s: "Zählt jeder für sich, oder gibt es einen Zähler?",
        c: "Das entscheidest du. Mit [[tx:wizard.zikirOption1]] in der Zeile [[tx:compose.zikirHow]] zählt jeder dieselbe Liste für sich. Mit [[tx:wizard.zikirOption2]] hat der Kreis einen einzigen Zähler, und was alle rezitieren, kommt in dieselbe Summe. Im einmaligen Kreis gilt die Wahl für jeden Dhikr einzeln: [[tx:event.modeIndividual]] oder [[tx:event.modeCollective]]." },
      { s: "Wird der gemeinsame Zähler jeden Tag zurückgesetzt?",
        c: "Im festen Kreis ist der gemeinsame Pool ein Tagesziel: Der Zähler beginnt jede Mitternacht neu, nach der Uhr jedes Einzelnen. Im einmaligen Kreis sammelt sich die Zahl eines gemeinsam gezählten Dhikr dagegen vom Start bis zum Enddatum." },
      { s: "Wie lesen wir gemeinsam Yasin oder Ichlas?",
        c: "Gründe einen einmaligen Kreis. Für Yasin gibt es die fertige Vorlage [[tx:eventCompose.tplYasin41]]. Für eine andere Sure oder Zahl wähle die Vorlage [[tx:eventCompose.tplCustom]], füge die Sure hinzu, gib die Zielzahl ein und wähle [[tx:event.modeCollective]]. Wie oft gelesen wird, entscheidest du; zur Überlieferung einer bestimmten Zahl frag am besten einen Gelehrten vor Ort." },
      { s: "Kann jemand ohne App beitragen?",
        c: "Im einmaligen Kreis ja: Nach dem Start kann jeder, der den geteilten Link antippt, auf der Seite im Browser zu den Dhikrs mit [[tx:event.modeCollective]] beitragen. Für [[tx:event.modeIndividual]] braucht man die App. Auch für das Dhikr-Ziel eines festen Kreises braucht man die App." },
      { s: "Heißt gemeinsamer Dhikr, dass alle zusammen laut rezitieren?",
        c: "Nein. Jeder rezitiert an seinem eigenen Ort, zu seiner eigenen Zeit. Die App zählt nur die Zahlen zusammen und zeigt die Summe des Kreises." },
    ],
  },

  ilgili: ["tek", "katil", "hatim"],
  kart: { kicker: "Dhikr", baslik: "Dhikr und Salawat gemeinsam", metin: "Gemeinsam auf einem Zähler: Die Summe des Kreises sieht jeder. Salawat, Tasbih oder deine eigene Liste." },
  onizleme: { sahne: "zikir-kart", adim: 16 },
};
