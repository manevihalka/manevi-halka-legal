// P2 · Einmaliger Kreis: gemeinsame Khatm, Dhikr und Bittgebet (DE). In der App: Einmaliger Kreis.
// Zuerst "Den Koran gemeinsam für einen Verstorbenen lesen"; am 5. Okt. 2026 zu einer allgemeinen
// Anleitung für jeden Anlass umgeschrieben, der Verstorbene ist ein Abschnitt darin.
// Format: Kommentar am Anfang von _gen/build-rehber.mjs. Knopfnamen kommen über [[schlüssel]] aus der App.
// Religiöse Sprache: kein Lohnversprechen, kein eigenes Urteil, keine bestimmten Gedenktage.
// Seit 2.0 heißen die Vorlagen für Dhikr und Suren in der App in jeder Sprache eigen; hier über [[tx:schlüssel]].
export default {
  title: "Koran gemeinsam lesen: Khatm, Dhikr und Bittgebet planen",
  desc: "Plane eine gemeinsame Khatm, Dhikr oder Salawat für eine gesegnete Nacht, den Ramadan, einen Verstorbenen oder ein Bittgebet. Auch ohne App im Browser.",
  h1: "Einmaliger Kreis: So planst du eine gemeinsame Khatm, Dhikr und Bittgebete",
  crumb: "Einmaliger Kreis",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "Zu einer gesegneten Nacht, im Ramadan, für einen verstorbenen Angehörigen oder zu einem Anlass in deiner Familie möchtest du vielleicht mit deinen Liebsten den ganzen Koran lesen, eine Khatm (in der App: Chatma, auf Türkisch Hatim). Oder du möchtest mit ihnen gemeinsam Dhikr und Salawat sprechen oder Bittgebete lesen. In der App gründest du dafür einen einmaligen Kreis: Du wählst das Ziel, legst das Enddatum fest und schickst den Link. Jeder liest oder zählt seinen Teil an seinem eigenen Ort. Die App teilt nur die Teile auf und zählt die Zahlen zusammen.",
  meta: ["Einrichtung etwa 2 Minuten", "Auch ohne App möglich", "Kostenlos"],
  film: { sahne: "film-tek", cap: "Der ganze Ablauf am Stück: einmaligen Kreis gründen, Ziel und Enddatum wählen, Widmung schreiben, starten und den Link schicken." },

  kisa: {
    maddeler: [
      "Öffne in der App den Tab [[tabs.circles]], tippe oben rechts auf **+** und im Fenster auf die Karte [[tx:event.createMenuTitle]].",
      "Wähle das Ziel: [[tx:event.typeQuran]], [[tx:event.typeZikir]] oder [[tx:event.typeDua]]. Bei der Khatm tippst du für die Verteilung auf [[tx:event.distPool]], für eine gemeinsame Zahl beim Dhikr auf [[tx:event.modeCollective]].",
      "Wähle als [[tx:event.endDate]], bis wann der Kreis läuft.",
      "Gib dem Kreis einen Namen, schreib bei Bedarf den Anlass in das Feld [[tx:event.dedicationLabel]] und tippe auf [[event.create]].",
      "Starte den Kreis mit [[event.startNow]] und schick den Link mit [[ol:event.inviteFriends]] an deine Familie und in deine WhatsApp-Gruppe.",
      "Jeder liest oder zählt seinen Teil an seinem eigenen Ort. Wer die App nicht hat, macht bei den meisten Kreisen im Browser mit. Ist die Zeit um, schließt der Kreis, und seine Zusammenfassung bleibt in der App.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Wer den Kreis gründet", baslik: "Gründe den Kreis",
      giris: [
        "Einen einmaligen Kreis gründest du für einen Anlass: Er hat ein Enddatum, wächst über den Einladungslink, schließt, wenn die Zeit um ist, und seine Zusammenfassung bleibt im Archiv. Eine dauerhafte Gruppe brauchst du dafür nicht.",
        "Willst du mit deiner Familie jede Woche weiterlesen, passt ein regelmäßiger Kreis besser: [Khatm-Gruppe gründen](/de/anleitungen/khatm-gruppe/).",
      ],
      adimlar: [
        {
          baslik: "Öffne einen einmaligen Kreis",
          metin: [
            "Öffne die App und tippe unten in der Leiste auf den Tab [[tabs.circles]]. Tippe oben rechts auf den grünen Knopf **+**.",
            "Von oben öffnet sich das Fenster [[tx:dashboard.addCircle]]. Tippe auf die mittlere Karte [[tx:event.createMenuTitle]].",
          ],
          ipucu: "Siehst du oben rechts keinen Knopf **+**, hast du in der App noch keinen Namen eingegeben. Tippe dann auf den mittleren Knopf [[ol:circlesTab.anonCreateEvent]] und gib deinen Namen ein; das Formular für den einmaligen Kreis öffnet sich direkt, und du machst beim nächsten Schritt weiter.",
          sahne: "vf-ac",
        },
        {
          baslik: "Wähle die Art des Ziels",
          metin: "Auf dem ersten Bildschirm stehen die Frage [[tx:event.step1Title]] und Karten für die Art des Ziels. Diese Anleitung beschreibt die folgenden drei; tippe auf eine und dann auf [[common.continue]]:",
          liste: [
            "[[tx:event.typeQuran]]: Eine Khatm mit 30 Dschuz oder die Dschuz, die du auswählst, werden unter den Teilnehmenden aufgeteilt. Diesen Weg beschreibt dieser Abschnitt.",
            "[[tx:event.typeZikir]]: Du legst für einen Dhikr oder Salawat eine Zielzahl fest. Jeder zählt seine eigene Zahl, oder der ganze Kreis zählt auf eine gemeinsame Summe hin.",
            "[[tx:event.typeDua]]: Du legst fest, wie oft Suren und Bittgebete wie Yasin, Al-Ikhlas oder Al-Fatiha gelesen werden.",
          ],
          ipucu: "Bei Dhikr und Bittgebet sieht der zweite Schritt anders aus; er steht weiter unten im Abschnitt **Ziel für Dhikr, Salawat oder Bittgebet**. Die übrigen Schritte sind bei allen gleich.",
        },
        {
          baslik: "Lege die Verteilung der Khatm fest",
          metin: "Hast du [[tx:event.typeQuran]] gewählt, ist auf dem nächsten Bildschirm [[tx:event.fullHatim]] schon eingestellt: 30 Dschuz, 604 Seiten. Unten gibt es für die [[tx:event.distributionLabel]] zwei Möglichkeiten; wähle eine und tippe wieder auf [[common.continue]]:",
          liste: [
            "[[tx:event.distPool]]: Alle Dschuz liegen im Pool, und jeder nimmt sich selbst den Dschuz, den er möchte. Auch wer nach dem Start kommt, kann mitmachen. Für eine Khatm mit Familie und Bekannten wählst du das.",
            "[[tx:event.distAuto]]: Die Seiten werden gleichmäßig auf alle Teilnehmenden verteilt. Sobald du den Kreis startest, ist die Teilnahme geschlossen. Alle müssen also vorher beigetreten sein.",
          ],
          fark: "Auch Verwandte ohne App können mitmachen: Ist [[tx:event.distPool]] gewählt, übernehmen sie über den Einladungslink im Browser einen Dschuz und lesen dort ihre Seiten.",
          ipucu: "Sollen nur bestimmte Dschuz statt des ganzen Korans gelesen werden, nimm [[tx:event.customJuz]].",
          sahne: "vf-hedef",
        },
        {
          baslik: "Wähle das Enddatum",
          metin: [
            "Tippe auf das Feld [[tx:event.endDate]] und wähle, bis wann der Kreis läuft. Das Feld steht zunächst auf übermorgen; du kannst jedes andere Datum wählen, etwa eine gesegnete Nacht. Tippe dann auf [[common.continue]].",
            "Soll der Kreis zu einer bestimmten Uhrzeit von selbst beginnen, setz ein Häkchen bei [[tx:event.registrationWindowToggle]]. Ohne Häkchen startest du den Kreis selbst.",
          ],
          ipucu: "Der Kreis wird 24 Stunden nach dem Enddatum gelöscht. Reicht die Zeit nicht, kannst du sie später verlängern; wie, steht weiter unten.",
          sahne: "vf-zaman",
        },
        {
          baslik: "Gib dem Kreis einen Namen, schreib die Widmung",
          metin: [
            "Schreib einen Namen in das Feld [[tx:event.titleLabel]], zum Beispiel „Chatma zur Laylat al-Ragha'ib“. Lässt du es leer, heißt der Kreis [[tx:event.suggestFullHatim]].",
            "Schreib in das Feld [[tx:event.dedicationLabel]] den Anlass des Kreises oder für wen gelesen wird, zum Beispiel „Zum Wohl unserer Familie und der ganzen Umma“. Die Widmung steht im Kreis unter dem Namen. Wer den Link im Browser öffnet, sieht sie als größte Überschrift der Seite. Du kannst die Widmung auch leer lassen.",
            "Prüfe die Übersicht unten und tippe auf [[event.create]].",
          ],
          ipucu: "Beim ersten Kreis kann einmal das Fenster [[tx:secureNudge.title]] erscheinen. Verknüpfst du dein Konto mit Apple, Google oder E-Mail, bleibt dein Kreis erhalten, auch wenn du das Handy wechselst. Du kannst auch [[tx:secureNudge.later]] wählen.",
          sahne: "vf-ithaf",
        },
        {
          baslik: "Starte den Kreis",
          metin: [
            "Der Kreis öffnet sich: oben der Name und die Widmung, darunter die Karte [[tx:event.inviteSectionTitle]] und der Knopf [[event.startNow]]. Hast du [[tx:event.distPool]] gewählt oder einen Kreis für Dhikr oder Bittgebete gegründet, musst du nicht warten. Tippe auf [[event.startNow]] und im Fenster noch einmal auf [[event.startNow]].",
            "Vor dem Start kann niemand einen Dschuz nehmen oder zählen. Danach bleibt der Einladungslink offen, auch wer später kommt, kann mitmachen.",
          ],
          ipucu: "Hast du [[tx:event.distAuto]] gewählt, teile zuerst den Link und starte, wenn alle beigetreten sind. Beim Start öffnet sich eine Vorschau, wer welche Seiten liest; mit [[event.planConfirm]] bestätigst du noch einmal.",
          sahne: "vf-baslat",
        },
        {
          baslik: "Schick den Link",
          metin: [
            "Nach dem Start wechselt die Einladungskarte in den Tab [[tx:event.tabCircle]]. Tippe auf [[ol:event.inviteFriends]] und schick den Link in deine WhatsApp-Gruppe, an deine Familie oder an wen du möchtest.",
            "Der Hinweis unter der Karte sagt, was man ohne App mit diesem Link tun kann. Bei einer Khatm mit gemeinsamem Pool steht dort: [[tx:event.webJoinClaim]]",
          ],
          fark: "Deine WhatsApp-Gruppe bleibt. Teil dort den Link; wer welchen Dschuz genommen hat und wie oft gezählt wurde, hält die App fest, eine eigene Liste brauchst du nicht.",
          ipucu: "Schick den Link über den Knopf [[ol:event.inviteFriends]] hier oder über das Teilen-Symbol oben rechts. Schick nicht nur den Einladungscode; wer die App nicht hat, kann nur über diesen Link im Browser mitmachen.",
          sahne: "vf-davet",
        },
      ],
    },
    {
      tur: "bolum", id: "zikir-dua", rol: "Wer den Kreis gründet", baslik: "Ziel für Dhikr, Salawat oder Bittgebet",
      giris: "Tippst du bei der Art des Ziels auf [[tx:event.typeZikir]] oder [[tx:event.typeDua]], ändert sich nur der zweite Schritt. Enddatum, Name, Widmung, Start und Einladung laufen wie oben.",
      adimlar: [
        {
          baslik: "Wähle den Dhikr und die Zielzahl",
          metin: [
            "Tippe auf dem Bildschirm [[tx:event.zikirGoalTitle]] unter der Überschrift [[tx:event.addFromPresets]] auf eine der Vorlagen, zum Beispiel [[tx:globalDhikr.salavat.name]]. In der Liste stehen auch [[tx:wizard.zikirPresetKelime]], [[tx:wizard.zikirPresetIstigfar]], [[tx:wizard.zikirPresetSubhanallah]] und [[tx:wizard.zikirPresetElhamdulillah]]. Unter [[tx:event.esmaulHusna]] wählst du einen der schönen Namen Allahs, und im Feld [[tx:event.customZikir]] schreibst du deinen eigenen Dhikr.",
            "Schreib auf der Karte des Dhikr die Zahl in das Feld [[tx:event.target]]. Daneben gibt es zwei Möglichkeiten:",
          ],
          liste: [
            "[[tx:event.modeCollective]]: Der ganze Kreis zählt auf eine gemeinsame Summe hin, zum Beispiel zusammen 10.000 Salawat. Die Zahlen sammeln sich bis zum Enddatum.",
            "[[tx:event.modeIndividual]]: Jeder schafft selbst die Zahl, die du einträgst, zum Beispiel 100 pro Person.",
          ],
          fark: "Auch wer die App nicht hat, kann über den Link im Browser mitzählen. Das geht nur beim Dhikr mit [[tx:event.modeCollective]] und erst, wenn der Kreis gestartet ist.",
          ipucu: "Mehr zum Zählen und zum gemeinsamen Ziel: [Dhikr und Salawat gemeinsam](/de/anleitungen/dhikr-salawat-gemeinsam/).",
          sahne: "zikir-tek-toplu",
        },
        {
          baslik: "Für Bittgebete oder Suren",
          metin: [
            "Hast du [[tx:event.typeDua]] gewählt, stehen auf dem Bildschirm [[tx:event.duaGoalTitle]] in der fertigen Liste [[tx:event.presetFatiha]], [[tx:globalDhikr.ayetelkursi.name]], [[tx:event.presetYasin]], [[tx:event.presetIhlas]], [[tx:event.presetMulk]] und [[tx:event.presetFetih]]. Ein Bittgebet oder eine Sure, die nicht in der Liste steht, fügst du über das Feld [[tx:event.customZikir]] hinzu.",
            "Schreib in das Feld [[tx:event.target]], wie oft gelesen wird, und wähle wieder [[tx:event.modeCollective]] oder [[tx:event.modeIndividual]]. Wie oft gelesen wird, entscheidest du; zur Überlieferung einer Zahl frag einen Gelehrten an deinem Ort.",
          ],
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Alle, die mitmachen", baslik: "Mach mit und erledige deinen Teil",
      giris: "Jeder liest oder zählt seinen Teil an seinem eigenen Ort, zu seiner eigenen Zeit. Niemand muss sich dafür versammeln. Die App teilt nur die Teile auf, zählt die Zahlen zusammen und zeigt, was erledigt ist.",
      adimlar: [
        {
          baslik: "Mit App: beitreten und einen Dschuz nehmen",
          metin: [
            "Tippst du den Einladungslink an, öffnet sich die App mit der Karte des Kreises: Name, Widmung, Zahl der Teilnehmenden und Enddatum. Tippe auf [[joinGroup.join]]. Trittst du zum ersten Mal bei, gibst du nur deinen Namen ein; eine E-Mail brauchst du nicht. Öffnet sich der Link im Browser statt in der App, tippe unten auf der Seite auf [[=In der App öffnen]]; mehr dazu in der Anleitung [Einem Kreis per Einladung beitreten](/de/anleitungen/kreis-beitreten/).",
            "Tippe in einem Khatm-Kreis im Bereich [[tx:event.poolCuzTitle]] auf einen freien Dschuz. Tippst du auf [[event.takeWholeCuz]], gehören dir alle 20 Seiten dieses Dschuz. Schaffst du weniger, gib die erste und die letzte Seite ein und tippe auf [[ol:event.claimRange]].",
          ],
          ipucu: "Hat der Kreis noch nicht begonnen, steht dort [[tx:event.startWhenAdminOpen]]. Startet der Admin den Kreis, werden die Dschuz und das Zählen frei.",
          sahne: "vf-katil",
        },
        {
          baslik: "Lies und tippe dann auf Erledigt",
          metin: [
            "Deine Seiten stehen in der Karte [[tx:event.myTask]]. Tippe auf [[ol:event.read]]; der Koran öffnet sich auf deiner ersten Seite.",
            "Bist du fertig, geh zurück und tippe auf [[event.done]]. Bestätigst du im Fenster, zählen deine Seiten als gelesen und gehen in den Fortschritt des Kreises ein. Tu das spätestens 6 Stunden vor dem Ende; nicht abgehakte Seiten gehen zu diesem Zeitpunkt zurück in den Pool.",
          ],
          fark: "Du musst keinen Mushaf suchen: Deine Seiten öffnen sich direkt in der App.",
          ipucu: "Hast du versehentlich abgehakt, öffne die Zeile [[=Abgeschlossen]]; dort kannst du das Häkchen zurücknehmen.",
          sahne: "vf-oku",
        },
        {
          baslik: "Im Kreis für Dhikr oder Bittgebete: zählen",
          metin: [
            "Im Kreis steht in der Karte [[tx:event.zikirSection]] (im Kreis für Bittgebete [[tx:event.duaSection]]) neben jeder Zeile der Knopf [[event.count]]. Tippst du darauf, öffnet sich der Zähler; jedes Tippen auf den Bildschirm zählt eins.",
            "Hast du mit der Gebetskette (Tasbih) oder im Kopf gezählt, trag die Zahl mit dem Knopf [[ol:zikir.bulkAdd]] unter dem Zähler auf einmal ein. Die Zahlen werden von selbst gespeichert. Beim Dhikr mit [[tx:event.modeCollective]] zeigt der Zähler auch die Zeile [[tx:zikir.counterGroupTotal]].",
          ],
        },
        {
          baslik: "Ohne App: im Browser einen Abschnitt nehmen",
          metin: [
            "Bei einer Khatm mit gemeinsamem Pool öffnet sich nach dem Antippen des Links im Browser die Seite des Kreises. Ganz oben steht die Widmung, darunter siehst du, wie viele Seiten schon gelesen sind.",
            "In der Karte [[=Nächster Abschnitt]] wird dir ein Dschuz vorgeschlagen. Tippe auf [[=Diesen nehmen]]. Wähle, wie viele Seiten du liest (5, 10, 15 oder 20), und tippe auf [[=Ich bestätige, ich nehme ihn]]. Der Knopf [[=Jetzt lesen]] öffnet die Seiten im Browser.",
          ],
          fark: "Auch wenn deine Tante die App nicht hat: Ohne Konto übernimmt sie über den Link ihren Dschuz und liest ihn.",
          ipucu: "Hat der Kreis noch nicht begonnen, sagt die Seite das und aktualisiert sich von selbst, sobald der Admin startet.",
          sahne: "vf-web",
        },
        {
          baslik: "Nach dem Lesen auf „Ich habe ihn gelesen“ tippen",
          metin: [
            "Am Ende der Seiten stehen die Frage [[=Fertig gelesen?]] und der Knopf [[=Ich habe ihn gelesen]]; tippe darauf, wenn du fertig bist. Öffnest du den Link später im selben Browser wieder, steht dein Abschnitt in der Karte [[=Deine Abschnitte]]; auch dort gibt es den Knopf [[=Ich habe ihn gelesen]].",
            "Wenn du möchtest, gib deinen Namen ein; dann sehen die anderen im Kreis, wer den Abschnitt übernommen hat. Der Name ist freiwillig, lässt du ihn leer, ändert sich nichts.",
          ],
          ipucu: "Speichere den Link mit dem Knopf [[=Link kopieren]], der nach dem Übernehmen erscheint. Willst du von einem anderen Handy oder Browser zurückkommen, nimmst du diesen Link.",
          sahne: "vf-web-bitir",
        },
        {
          baslik: "Ohne App: im Browser mitzählen",
          metin: [
            "Öffnest du den Link eines Kreises für Dhikr oder Bittgebete, erscheint im Browser die Karte [[=Gebete in diesem Kreis]]. Neben jedem Dhikr mit [[tx:event.modeCollective]] steht der Knopf [[=Mitzählen]].",
            "Tippst du darauf, öffnet sich eine große runde Zählfläche: Jedes Tippen zählt eins, die Knöpfe [[=+33]] und [[=+100]] zählen auf einmal dazu. Bist du fertig, tippe auf [[=Beitrag hinzufügen]]; deine Zahl kommt zur Summe des Kreises dazu.",
          ],
          ipucu: "Beim Dhikr mit [[tx:event.modeIndividual]] steht statt des Knopfs [[=Für Kreismitglieder]]. Diesen Dhikr zählst du nur in der App.",
        },
      ],
    },
    {
      tur: "ikili", id: "bitis", rol: "Wer den Kreis gründet", baslik: "Kurz vor dem Ende und wenn der Kreis endet",
      giris: "Auch das Ende des Kreises behält die App im Blick: Bei einer Khatm legt sie Seiten, die genommen und nicht abgeschlossen wurden, selbst zurück in den Pool, und Zahlen zählt sie bis zum Enddatum zusammen.",
      kartlar: [
        {
          baslik: "Kurz vor dem Ende",
          metin: [
            "12 Stunden vor dem Ende bekommen alle, die ihren Teil noch nicht fertig haben, eine Erinnerung. In Kreisen für Dhikr und Bittgebete geht diese Erinnerung an alle Teilnehmenden.",
            "Bei einer Khatm gehen 6 Stunden vor dem Ende Seiten, die in der App genommen und nicht mit [[event.done]] abgehakt wurden, zurück in den Pool. Jemand anderes kann sie nehmen und lesen; die Person, deren Seiten zurück in den Pool gegangen sind, erfährt das in der App.",
            "Reicht die Zeit nicht, tippe im Tab [[tx:event.tabCircle]] in der Karte [[tx:event.adminControls]] auf [[tx:event.extend24h]]. Das Enddatum rückt 24 Stunden nach hinten; bei Bedarf tippst du noch einmal.",
          ],
          sahne: "vf-uzat",
        },
        {
          baslik: "Wenn der Kreis endet",
          metin: [
            "Sind bei einer Khatm alle Seiten gelesen, steht [[tx:event.collectiveProgress]] auf 100 %. Bleibt noch Zeit, öffnest du mit [[ol:event.addSeries]] neben der Überschrift [[tx:event.poolCuzTitle]] im selben Kreis eine neue Khatm mit 30 Dschuz. In Kreisen für Dhikr und Bittgebete sammeln sich die Zahlen bis zum Enddatum weiter.",
            "Der Kreis wird 24 Stunden nach dem Enddatum gelöscht. Vorher wird eine Zusammenfassung bei allen, die über die App mitgemacht haben, unter [[tx:tabs.profile]] › [[tx:quran.myLibrary]] › [[tx:event.archiveTab]] gespeichert.",
            "Seiten, die im Browser genommen wurden, zählen im Fortschritt des Kreises vom Moment der Übernahme an als gelesen und gehen nicht zurück in den Pool. Wer fertig ist, siehst du im Tab [[tx:event.tabCircle]] in der Liste [[=Über das Web beigetreten]].",
          ],
          sahne: "vf-ilerleme",
        },
      ],
      not: "Bei einer Khatm mit [[tx:event.distAuto]] erscheint im Kreis die Karte [[=Eure Chatma ist abgeschlossen]], wenn alle Teile gelesen sind. Schafft jemand seinen Teil nicht, kann der Admin in der Karte [[tx:event.adminControls]] auf [[tx:event.releasePool]] tippen; dann sind die übrigen Teile für alle frei.",
    },
    {
      tur: "ikili", id: "vesileler", rol: "Beispiele", baslik: "Zu welchen Anlässen?",
      giris: [
        "Einen einmaligen Kreis gründest du zu jedem Anlass. Ein paar Beispiele: eine Khatm zu einer gesegneten Nacht wie der Laylat al-Ragha'ib, zum Mawlid oder im Ramadan; eine Khatm oder die Sure Yasin für einen verstorbenen Angehörigen; Salawat mit dem Bittgebet um Genesung für einen kranken Angehörigen; ein gemeinsames Bittgebet zu einer Hochzeit, zur Geburt eines Kindes oder für jemanden, der zur Hadsch aufbricht.",
        "Die Schritte sind überall gleich. Nur das Ziel, das Enddatum und die Widmung wählst du passend zum Anlass.",
      ],
      kartlar: [
        {
          baslik: "Für einen verstorbenen Angehörigen",
          metin: [
            "Ist ein Angehöriger verstorben, kannst du mit deinen Liebsten für ihn eine Khatm lesen. Gib dem Kreis einen Namen, zum Beispiel „Chatma für Ibrahim Demir“, und schreib in die Widmung einen Satz wie „Für unseren verstorbenen Vater“. Verwandte, die den Link im Browser öffnen, sehen diese Widmung als größte Überschrift der Seite.",
            "Leg das Enddatum auf einen Tag, an dem die Familie in Ruhe lesen kann; die App schlägt keinen bestimmten Tag vor. Statt einer Khatm kannst du auch Salawat oder das Lesen der Sure Yasin planen: Tippe bei der Art des Ziels auf [[tx:event.typeZikir]] oder [[tx:event.typeDua]].",
            "Jeder liest seinen Dschuz an seinem eigenen Ort. Die App teilt nur die Dschuz auf und zeigt, welche gelesen sind.",
          ],
          sahne: "vf-ithaf-vefat",
        },
        {
          baslik: "Für eine gesegnete Nacht, den Mawlid und den Ramadan",
          metin: [
            "Bei einer Khatm zu einer gesegneten Nacht, zum Mawlid oder im Ramadan legst du das Enddatum auf den Tag des Anlasses, zum Beispiel auf den Abend der gesegneten Nacht. Die Widmung schreibst du passend zum Anlass. Solange das Feld leer ist, steht darin [[tx:event.dedicationPlaceholder]].",
            "Liest du mit einer großen Gemeinde, kannst du mit [[ol:event.addSeries]] im selben Kreis mehrere Khatms öffnen.",
            "Für eine Khatm, die im Ramadan jeden Tag oder jede Woche weiterläuft, passt ein regelmäßiger Kreis besser: [Khatm-Gruppe gründen](/de/anleitungen/khatm-gruppe/).",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ornek", baslik: "Beispiel: Chatma zur Laylat al-Ragha'ib",
      giris: "Die Bilder unten stammen aus der App. In der Widmung steht „Zum Wohl unserer Familie und der ganzen Umma“, die Dschuz werden aus dem gemeinsamen Pool genommen, und einige Verwandte machen im Browser mit.",
      kareler: [
        { img: "06-event", alt: "Chatma zur Laylat al-Ragha'ib: Widmung, Gemeinsamer Fortschritt 60 Prozent, Karte Deine Aufgabe mit Seiten 21-40 und Dschuz-Pool", cap: "Tab Aufgabe: gemeinsamer Fortschritt, deine Seiten und der Dschuz-Pool" },
        { img: "06c-event-davet", alt: "Tab Kreis desselben Kreises: Einladungscode, Einladungslink, Knopf Einladen und die Teilnehmenden", cap: "Tab Kreis: Einladungscode, Link und Teilnehmende" },
        { img: "06b-event-web", alt: "Liste Über das Web beigetreten und Karte Verwaltung mit Um 24 Stunden verlängern und Kreis löschen", cap: "Wer im Browser mitliest, und die Verwaltung" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Wie plane ich eine gemeinsame Khatm?",
        c: "Tippe im Tab **Kreise** auf **+**, dann auf **Einmaliger Kreis** und auf die Karte **Koran-Chatma**. Wähle bei der Verteilung **Gemeinsamer Pool**, lege das Enddatum fest, schreib bei Bedarf die Widmung und tippe auf **Kreis erstellen**. Starte mit **Jetzt starten** und schick den Link. Jeder nimmt einen Dschuz und liest ihn an seinem eigenen Ort." },
      { s: "Was ist der Unterschied zwischen einem einmaligen und einem regelmäßigen Kreis?",
        c: "Einen einmaligen Kreis gründest du für einen Anlass: Er hat ein Enddatum, schließt, wenn die Zeit um ist, und wird 24 Stunden danach gelöscht; seine Zusammenfassung bleibt in der App. Ein regelmäßiger Kreis ist eine dauerhafte Gemeinschaft mit deiner Familie oder Gemeinde; die Khatm läuft dort jeden Tag oder jede Woche in einer neuen Runde weiter. Mehr dazu: [Khatm-Gruppe gründen](/de/anleitungen/khatm-gruppe/)." },
      { s: "Können Leute ohne App mitmachen?",
        c: "Bei den meisten Kreisen ja. Ist bei einer Khatm **Gemeinsamer Pool** gewählt, nimmt man nach dem Antippen des Einladungslinks im Browser einen Abschnitt und liest die Seiten dort. In einem Kreis für Dhikr oder Bittgebete zählt man im Browser bei den Dhikr mit **Gemeinsam** mit. Ein Konto braucht man nicht; der Name ist freiwillig. Bei einer Khatm mit **Automatisch aufteilen** kann man im Browser nur Teile übernehmen, die nicht rechtzeitig fertig wurden; für Dhikr mit **Individuell** braucht man die App." },
      { s: "Wie plane ich eine Khatm für einen Verstorbenen?",
        c: "Die Schritte sind wie bei jedem einmaligen Kreis. Gib dem Kreis einen Namen und schreib in die Widmung einen Satz wie „Für unseren verstorbenen Vater“; wer den Link im Browser öffnet, sieht die Widmung als Überschrift der Seite. Leg das Enddatum auf einen Tag, an dem die Familie in Ruhe lesen kann. Jeder liest seinen Dschuz an seinem eigenen Ort; die App teilt nur die Dschuz auf." },
      { s: "Was, wenn vor dem Bittgebet zum Abschluss nicht alle Dschuz gelesen sind?",
        c: "Ein eigenes Urteil gibt diese Anleitung nicht; frag dazu einen Gelehrten deines Vertrauens. In der App gehen Seiten, die nicht als erledigt abgehakt sind, 6 Stunden vor dem Ende zurück in den Pool, damit jemand anderes sie lesen kann. Reicht die Zeit nicht, verlängert der Admin den Kreis mit **Um 24 Stunden verlängern**." },
      { s: "Wie gründe ich den Kreis für eine gesegnete Nacht, den Mawlid oder den Ramadan?",
        c: "Mit denselben Schritten. Leg das Enddatum auf den Tag des Anlasses, zum Beispiel auf den Abend der gesegneten Nacht, und schreib die Widmung passend dazu. Liest du mit einer großen Gemeinde, öffnest du mit **Neue Serie** im selben Kreis mehrere Khatms. Für eine Khatm, die im Ramadan jeden Tag oder jede Woche weiterläuft, passt ein regelmäßiger Kreis besser: [Khatm-Gruppe gründen](/de/anleitungen/khatm-gruppe/)." },
      { s: "Kostet das etwas?",
        c: "Einen einmaligen Kreis gründen und beitreten ist kostenlos. Mit einem kostenlosen Konto kannst du keinen neuen einmaligen Kreis gründen, solange dein bisheriger nicht gelöscht ist; er wird 24 Stunden nach dem Enddatum gelöscht. Beitreten kannst du beliebig vielen Kreisen." },
    ],
  },

  ilgili: ["hatim", "zikir", "katil"],
  kart: { kicker: "Anlass", baslik: "Einmaliger Kreis: Khatm, Dhikr, Bittgebet", metin: "Gründe zu einer gesegneten Nacht, für einen Verstorbenen oder für ein Bittgebet einen einmaligen Kreis und teile den Link; auch ohne App macht man im Browser mit." },
  onizleme: { sahne: "vf-baslat", adim: 0 },
};
