// Einmaliger Kreis (DE). Am 21. Nov. 2026 für den 2.1.0-Ablauf neu geschrieben; Übersetzung von tek.tr.mjs.
// Knopfnamen kommen über [[Schlüssel]] aus der App; Namen der Webseite und des Ergebnis-Bildschirms über [[=Text]].
export default {
  title: "Einmaliger Kreis: gemeinsame Chatma und 41 Yasin anlegen",
  desc: "Lege eine gemeinsame Chatma (Hatim), 41 Yasin oder Salawat für eine gesegnete Nacht, Ramadan, Heilung oder einen Verstorbenen an und teile den Link.",
  h1: "Einmaliger Kreis: gemeinsame Chatma, 41 Yasin und Salawat organisieren",
  crumb: "Einmaliger Kreis",
  eyebrow: "Schritt für Schritt",
  lead: "In einer gesegneten Nacht, im Ramadan, für die Heilung eines kranken Angehörigen oder für einen Verstorbenen möchtest du vielleicht mit deinen Liebsten eine Chatma lesen, Yasin 41 Mal lesen oder Salawat sprechen. Dafür legst du in der App einen einmaligen Kreis an: Du wählst, was gelesen wird, für wen und bis wann, und schickst den Link. Alles passt auf einen Bildschirm und dauert etwa eine Minute.",
  meta: ["In etwa 1 Minute angelegt", "Auch ohne App dabei", "Kostenlos"],
  film: { sahne: "film-tek", cap: "Ein Ablauf: Vorlage wählen, für wen und bis wann festlegen, [[eventCompose.cta]] tippen, einladen." },

  kisa: {
    maddeler: [
      "Tippe im Tab [[tabs.circles]] oben rechts auf **+** und dann auf die Karte [[tx:event.createMenuTitle]].",
      "Wähle auf dem Bildschirm [[tx:eventCompose.pickTitle]] eine Vorlage: [[tx:eventCompose.tplHatim]], [[tx:eventCompose.tplYasin41]], [[tx:eventCompose.tplSalavat]] oder [[tx:eventCompose.tplCustom]].",
      "Tippe in der Übersicht auf die Zeilen [[tx:eventCompose.rowFor]] und [[tx:eventCompose.rowEnd]] und wähle.",
      "Gib dem Kreis einen Namen und tippe auf [[eventCompose.cta]]. Der Kreis beginnt sofort.",
      "Tippe auf dem Bildschirm [[tx:eventCompose.readyTitle]] auf [[eventCompose.invite]] und schick den Link an deine Familie oder WhatsApp-Gruppe.",
      "Alle lesen dort, wo sie sind; die App teilt nur auf. Ist das Ziel erreicht, ist der Kreis abgeschlossen und alle bekommen eine Benachrichtigung.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Wer den Kreis anlegt", baslik: "Den Kreis anlegen",
      giris: [
        "Ein einmaliger Kreis entsteht für einen Anlass: Was gelesen wird, für wen und wie lange, steht von Anfang an fest. Er wächst über einen Link und ist abgeschlossen, sobald das Ziel erreicht ist. Eine dauerhafte Gruppe brauchst du dafür nicht.",
        "Möchtest du mit deiner Familie jede Woche eine Chatma lesen, passt ein regelmäßiger Kreis besser: [Khatm-Gruppe gründen](/de/anleitungen/khatm-gruppe/).",
      ],
      adimlar: [
        {
          baslik: "Einen einmaligen Kreis öffnen",
          metin: [
            "Tippe in der App unten auf den Tab [[tabs.circles]] und oben rechts auf das grüne **+**.",
            "Von oben gleitet [[tx:dashboard.addCircle]] herein. Tippe auf die Karte [[tx:event.createMenuTitle]] in der Mitte.",
          ],
          ipucu: "Fehlt oben rechts das **+**, hast du in der App noch keinen Namen eingegeben. Tippe dann in der Mitte auf [[ol:circlesTab.anonCreateEvent]]; nach deinem Namen öffnet sich derselbe Bildschirm.",
          sahne: "tek-ac",
        },
        {
          baslik: "Wählen, was gelesen wird",
          metin: "Unter der Frage [[tx:eventCompose.pickTitle]] stehen fertige Vorlagen. Tippe auf eine, und die Übersicht öffnet sich damit ausgefüllt:",
          liste: [
            "[[tx:eventCompose.tplHatim]]: Der ganze Koran liegt als 30 Dschuz im Pool, jede und jeder nimmt sich den gewünschten Dschuz.",
            "[[tx:eventCompose.tplYasin41]]: Die Sure Yasin wird vom Kreis 41 Mal gelesen, alle lesen im Koran-Leser der App. Mehr dazu: [41 Yasin gemeinsam](/de/anleitungen/41-yasin-gemeinsam/).",
            "[[tx:eventCompose.tplSalavat]]: gemeinsam 1.000 Salawat; was jede Person zählt, fließt in einen gemeinsamen Zähler.",
            "[[tx:eventCompose.tplCustom]]: Dhikr, Bittgebet oder eine Sure; Liste und Ziel legst du selbst fest.",
          ],
          ipucu: "Die Vorlage ist nur ein Anfang. In der Übersicht kannst du jede Zeile ändern.",
          sahne: "tek-sablon",
        },
        {
          baslik: "Angeben, für wen",
          metin: [
            "Die Karte [[tx:eventCompose.thisCircle]] oben in der Übersicht zeigt den Kreis auf einen Blick: Name, was gelesen wird, das Ende und daneben einen Perlenring. Der Satz unten auf der Karte sagt, wie viel auf jede Person käme, wenn 10 Personen mitmachen.",
            "Tippe auf die Zeile [[tx:eventCompose.rowFor]]. Im Fenster stehen drei Chips: [[tx:eventCompose.intentRuh]], [[tx:eventCompose.intentSifa]] und [[tx:eventCompose.intentVesile]]. Ein Tipp füllt das Feld; den Text kannst du beliebig ändern. Dann tippe auf [[common.ok]].",
          ],
          ipucu: "Diese Zeile ist optional. Dein Satz steht oben auf dem Kreis-Bildschirm, und auch die Eingeladenen sehen ihn.",
          sahne: "tek-kimin",
        },
        {
          baslik: "Wählen, bis wann",
          metin: "Tippe auf die Zeile [[tx:eventCompose.rowEnd]] und wähle einen Chip:",
          liste: [
            "[[tx:eventCompose.endTonight]]: bis zum nächsten Fadschr dort, wo du bist.",
            "[[tx:eventCompose.endFriday]]: bis kommenden Freitag um 12:00 Uhr.",
            "[[tx:eventCompose.endDays3]] oder [[tx:eventCompose.endWeek]]: ab jetzt gerechnet.",
            "Bis zur nächsten gesegneten Nacht, etwa [[tx:eventCompose.untilKandil.regaib]]: bis 20:00 Uhr an jenem Abend. Dieser Chip erscheint, wenn die Nacht weniger als 60 Tage entfernt ist.",
            "[[tx:eventCompose.endCustom]]: Tag und Uhrzeit wählst du selbst.",
          ],
          fark: "Unter den Chips stehen das genaue Ende und der Anteil pro Person. Wähle die Dauer danach.",
          sahne: "tek-bitis",
        },
        {
          baslik: "Bei einer Chatma: Umfang und Aufteilung prüfen",
          metin: [
            "Bei einer Chatma steht die Zeile [[tx:compose.rowWhat]] auf [[tx:eventCompose.whatQuranFull]]. Sollen nur bestimmte Dschuz gelesen werden, tippe darauf und wähle [[tx:event.customJuz]].",
            "Die Zeile [[tx:eventCompose.rowShare]] bietet zwei Wege:",
          ],
          liste: [
            "[[tx:event.distPool]] (voreingestellt): Alle Dschuz liegen im Pool, alle nehmen sich, was sie möchten. Auch Spätere können mitmachen; der Kreis beginnt, sobald er angelegt ist.",
            "[[tx:eventCompose.shareDivide]]: Die Anteile werden gleichmäßig auf die Teilnehmenden verteilt. Wenn alle da sind, startest du den Kreis selbst; danach ist kein Beitritt mehr möglich.",
          ],
          fark: "Auch Verwandte ohne App machen mit: Ist [[tx:event.distPool]] gewählt, übernehmen sie über den Link im Browser einen Anteil und lesen ihn.",
          sahne: "tek-paylas",
        },
        {
          baslik: "Den Kreis benennen und eröffnen",
          metin: [
            "Im Feld [[tx:eventCompose.nameLabel]] steht schon ein Name nach deiner Auswahl, etwa [[tx:event.suggestFullHatim]]. Ändere ihn, wenn du magst, zum Beispiel in „Chatma zu Ragha'ib“.",
            "In der Karte [[tx:compose.more]] steht die Zeile [[tx:compose.rowStart]] auf [[tx:eventCompose.startNow]]. Soll der Kreis zu einer bestimmten Uhrzeit beginnen, wählst du das dort.",
            "Passt alles, tippe unten auf [[eventCompose.cta]].",
          ],
          ipucu: "Der Kreis wird 24 Stunden nach dem Enddatum gelöscht. Reicht die Zeit nicht, kannst du später verlängern; siehe unten.",
          sahne: "tek-ac-dugme",
        },
        {
          baslik: "Einladen",
          metin: [
            "Der Bildschirm [[tx:eventCompose.readyTitle]] öffnet sich. Der Kreis läuft bereits: Alle, denen du den Link schickst, können sofort einen Anteil übernehmen.",
            "Tippe auf [[eventCompose.invite]] und wähle deine WhatsApp-Gruppe oder Kontakte. Die Nachricht ist fertig: für wen, der Name des Kreises, das Ende und der Link. Mit [[ol:eventCompose.copyLink]] fügst du den Link auch selbst ein.",
            "Mit [[tx:eventCompose.goToCircle]] geht es dann zum Kreis-Bildschirm.",
          ],
          fark: "Deine WhatsApp-Gruppe bleibt, poste den Link einfach dort. Wer welchen Dschuz hat und wie oft gelesen wurde, hält die App fest; Listen schreibt niemand.",
          ipucu: "Beim ersten Kreis kann einmal das Fenster [[tx:secureNudge.title]] erscheinen. Verknüpfst du dein Konto mit Apple, Google oder E-Mail, bleibt dein Kreis auch bei einem neuen Handy erhalten.",
          sahne: "tek-hazir",
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Alle, die mitmachen", baslik: "Beitreten und deinen Anteil lesen",
      giris: "Alle lesen dort, wo sie sind; die App teilt nur auf. Niemand muss sich treffen: Wer was übernommen hat und wie viel gelesen ist, zeigt der Kreis-Bildschirm.",
      adimlar: [
        {
          baslik: "Über den Link beitreten",
          metin: [
            "Ein Tipp auf den Einladungslink öffnet die App mit der Karte des Kreises: Name, für wen, wie viele dabei sind und wann er endet. Tippe auf [[joinGroup.join]]. Beim ersten Mal genügt dein Name.",
            "Öffnet sich der Link im Browser statt in der App, hilft [Einem Kreis beitreten](/de/anleitungen/kreis-beitreten/).",
          ],
          sahne: "tek-katil",
        },
        {
          baslik: "Den Kreis-Bildschirm kennenlernen und einen Dschuz nehmen",
          metin: [
            "Der Kreis-Bildschirm liest sich von oben nach unten. Die obere Karte zeigt, wofür gelesen wird und wie viel noch fehlt: Ganz gelesene Dschuz sind grüne Perlen, übernommene goldene; unten stehen die Restzeit und der Anteil pro Person. Darunter liegt deine Aufgabe als ein großer Knopf. Bei einer Chatma folgt [[tx:eventScreen.statusTitle]], ganz unten die Einladungskarte.",
            "Der Knopf [[eventScreen.takeJuz]] schlägt den nächsten freien Dschuz vor. Tippe darauf und im Fenster auf [[event.takeWholeCuz]]; die Seiten dieses Dschuz gehören dir. Liest du weniger, gib erste und letzte Seite ein und tippe auf [[ol:event.claimRange]]. Für einen anderen Dschuz tippe ihn in der Karte [[tx:eventScreen.statusTitle]] an.",
          ],
          ipucu: "Die Einladungskarte ist für alle da: Wer mitmacht, kann mit [[eventCompose.invite]] weitere Leute holen.",
          sahne: "tek-cuz",
        },
        {
          baslik: "Lesen, dann als gelesen markieren",
          metin: [
            "Dein Dschuz steht auf deiner Karte. Tippe auf [[eventScreen.continue]]; der Koran öffnet sich auf deiner ersten Seite.",
            "Bist du fertig, geh zurück und tippe auf [[ol:hatim.markRead]]. Bestätigst du im Fenster, zählen deine Seiten als gelesen und im Kreis füllt sich eine Perle.",
          ],
          fark: "Du musst keinen Mushaf suchen: Deine Seiten öffnen sich in der App.",
          ipucu: "Einige Stunden vor dem Ende gehen nicht als gelesen markierte Seiten zurück in den Pool, damit jemand anderes sie übernehmen kann. Markiere deinen Anteil rechtzeitig.",
          sahne: "tek-oku",
        },
        {
          baslik: "In einem 41-Yasin- oder Salawat-Kreis",
          metin: [
            "In einem Suren-Kreis hat deine Karte den Knopf [[eventCompose.readBtn]]: Yasin öffnet sich im Koran-Leser der App auf den eigenen Seiten. Auf der letzten Seite tippst du auf [[hatim.markRead]], zurück im Kreis steigt der Zähler um eins. Hast du aus einem Buch gelesen, tippe auf [[tx:readTogether.markFromBook]].",
            "In einem Salawat- oder Dhikr-Kreis öffnet an derselben Stelle der Knopf [[event.count]] den Zähler; jeder Tipp auf den Bildschirm zählt eins.",
          ],
          ipucu: "Schritt für Schritt: [41 Yasin gemeinsam](/de/anleitungen/41-yasin-gemeinsam/) und [Dhikr und Salawat gemeinsam](/de/anleitungen/dhikr-salawat-gemeinsam/).",
          sahne: "yasin-oku",
        },
        {
          baslik: "Ohne App: im Browser mitmachen",
          metin: [
            "Bei einer Chatma mit gemeinsamem Pool öffnet der Link die Seite des Kreises im Browser. Oben steht die Absicht, darunter, wie viele Seiten gelesen sind.",
            "Tippe in der Karte [[=Nächster Abschnitt]] auf [[=Diesen nehmen]], wähle, wie viele Seiten du liest, und tippe auf [[=Ich bestätige, ich nehme ihn]]. [[=Jetzt lesen]] öffnet die Seiten im Browser; danach tippst du am Ende der Seiten auf [[=Ich habe ihn gelesen]].",
            "In einem Suren-Kreis wie 41 Yasin hat die Seite den Knopf [[=Ich habe sie gelesen]]: Du liest die Sure aus deinem eigenen Mushaf und tippst einmal. In einem Salawat- oder Dhikr-Kreis öffnet [[=Mitzählen]] einen Zähler; du zählst, was du gesprochen hast, und tippst auf [[=Beitrag hinzufügen]].",
          ],
          fark: "Auch wenn deine Tante keine App hat: ohne Konto, nur mit dem Link übernimmt sie ihren Anteil und liest.",
          ipucu: "Bei einer Chatma mit [[tx:eventCompose.shareDivide]] kann man im Browser nicht an der Verteilung teilnehmen; nur nicht fertig gewordene Anteile lassen sich übernehmen, wenn sie in den Pool gehen.",
          sahne: "tek-web",
        },
      ],
    },
    {
      tur: "ikili", id: "bitis", rol: "Wer den Kreis anlegt", baslik: "Zeit und Abschluss",
      giris: "Auch das Ende des Kreises hat die App im Blick: Ist das Ziel erreicht, schließt sie den Kreis ab, sagt Bescheid und bewahrt das Ergebnis.",
      kartlar: [
        {
          baslik: "Wenn die Zeit knapp wird",
          metin: [
            "Tippe auf dem Kreis-Bildschirm oben rechts auf **···** und wähle [[tx:event.extend24h]]. Das Ende rückt um 24 Stunden nach hinten; bei Bedarf tippst du erneut.",
            "Im selben Menü stehen [[tx:event.participantsTitle]] und [[tx:event.editTitle]]. Bei einer Chatma öffnet [[tx:event.releasePool]] übernommene, aber ungelesene Anteile für alle, und [[tx:event.addSeriesTitle]] beginnt im selben Kreis eine neue Chatma mit 30 Dschuz.",
          ],
          sahne: "tek-uzat",
        },
        {
          baslik: "Wenn das Ziel erreicht ist",
          metin: [
            "Sind alle Dschuz gelesen oder hat der Zähler das Ziel erreicht, schließt sich der Kreis von selbst ab. Ist der Bildschirm offen, erscheint ein kurzer Hinweis; wer die App geschlossen hat, bekommt eine Benachrichtigung.",
            "Der Knopf [[=Ergebnis ansehen]] auf dem Kreis-Bildschirm öffnet das Ergebnis des Kreises: die Gesamtzahl des Kreises und deinen eigenen Beitrag.",
            "Wiederholst du dieselbe Absicht in jeder gesegneten Nacht oder jeden Freitag, tippe im Ergebnis auf [[=Diesen Kreis erneut anlegen]]. Die Einrichtung öffnet sich mit demselben Ziel, Namen und derselben Widmung; nur das Ende wählst du neu.",
          ],
          sahne: "tek-tamam",
        },
      ],
      not: "Der Kreis wird 24 Stunden nach dem Enddatum gelöscht. Sein Ergebnis bleibt danach unter [[tx:tabs.profile]] › [[=Mein Weg]] › [[=Kreise]] erhalten.",
    },
    {
      tur: "ikili", id: "vesileler", rol: "Beispiele", baslik: "Zu welchen Anlässen?",
      giris: [
        "Ein einmaliger Kreis passt zu jedem Anlass: eine Chatma für eine gesegnete Nacht oder den Ramadan, 41 Yasin oder Salawat mit der Absicht der Heilung für einen Kranken, eine Chatma für einen verstorbenen Angehörigen, ein gemeinsames Bittgebet zu einer Hochzeit in der Familie oder für jemanden, der zur Haddsch aufbricht.",
        "Die Schritte sind immer dieselben. Nur Vorlage, Widmung und Ende wählst du passend zum Anlass.",
      ],
      kartlar: [
        {
          baslik: "Für einen verstorbenen Angehörigen",
          metin: [
            "Tippe im Fenster [[tx:eventCompose.rowFor]] auf den Chip [[tx:eventCompose.intentRuh]] und ändere den Text, wenn du magst, etwa in „Für die Seele unseres Vaters“. Ein mit diesem Chip angelegter Kreis fügt der Einladung die Zeile „[[tx:eventInvite.fatiha]]“ hinzu.",
            "Lege das Ende auf eine Zeit, in der die Familie in Ruhe lesen kann; die App schlägt keinen bestimmten Tag vor. Statt einer Chatma kannst du auch [[tx:eventCompose.tplYasin41]] oder [[tx:eventCompose.tplSalavat]] wählen.",
            "Alle lesen ihren Dschuz dort, wo sie sind. Die App teilt nur die Dschuz auf und zeigt, welche gelesen sind.",
          ],
          sahne: "tek-ruh",
        },
        {
          baslik: "Für gesegnete Nächte, Ramadan und Heilung",
          metin: [
            "Für eine Chatma zu einer gesegneten Nacht wähle im Fenster [[tx:eventCompose.rowEnd]] den Chip der nächsten Nacht, etwa [[tx:eventCompose.untilKandil.regaib]]. Der Kreis läuft bis zu jenem Abend.",
            "Für einen Kranken schreibt der Chip [[tx:eventCompose.intentSifa]] „[[tx:eventCompose.intentSifaFill]]“ ins Feld. Für eine kurze Lesung passen [[tx:eventCompose.tplYasin41]] oder [[tx:eventCompose.tplSalavat]].",
            "Liest du mit einer großen Gemeinde, öffnet [[tx:event.addSeriesTitle]] im **···**-Menü des Kreises mehrere Chatmas im selben Kreis. Für eine Chatma, die den ganzen Ramadan über täglich oder wöchentlich läuft, passt ein regelmäßiger Kreis besser: [Khatm-Gruppe gründen](/de/anleitungen/khatm-gruppe/).",
          ],
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Wie organisiere ich eine gemeinsame Chatma (Hatim)?",
        c: "Tippe im Tab [[tabs.circles]] auf **+**, dann auf die Karte [[tx:event.createMenuTitle]] und die Vorlage [[tx:eventCompose.tplHatim]]. Wähle die Zeilen [[tx:eventCompose.rowFor]] und [[tx:eventCompose.rowEnd]], tippe auf [[eventCompose.cta]] und schick den Link mit [[eventCompose.invite]]. Alle nehmen einen Dschuz und lesen ihn dort, wo sie sind; die App teilt nur die Dschuz auf." },
      { s: "Was ist der Unterschied zwischen einmaligem und regelmäßigem Kreis?",
        c: "Ein einmaliger Kreis gilt einem Anlass: Er hat ein Ziel und ein Ende, schließt sich beim Erreichen des Ziels ab und wird 24 Stunden nach dem Ende gelöscht; sein Ergebnis bleibt in der App. Ein regelmäßiger Kreis ist eine dauerhafte Gemeinschaft mit Familie oder Gemeinde; die Chatma läuft jeden Tag oder jede Woche in einer neuen Runde weiter. Mehr dazu: [Khatm-Gruppe gründen](/de/anleitungen/khatm-gruppe/)." },
      { s: "Können Menschen ohne App mitmachen?",
        c: "In den meisten Kreisen ja. Bei einer Chatma mit [[tx:event.distPool]] übernimmt, wer den Link öffnet, im Browser einen Abschnitt und liest ihn. In 41-Yasin-, Salawat- und Dhikr-Kreisen trägt man im Browser zur Zählung [[tx:event.modeCollective]] bei. Ein Konto ist nicht nötig. Bei der Verteilung mit [[tx:eventCompose.shareDivide]] und bei einer Zählung [[tx:event.modeIndividual]] macht man über die App mit." },
      { s: "Was gilt, wenn nicht alle Dschuz vor dem Abschlussgebet gelesen sind?",
        c: "Ein eigenes Urteil gibt diese Anleitung nicht; frag dazu einen Gelehrten deines Vertrauens. In der App gehen nicht als gelesen markierte Anteile einige Stunden vor dem Ende zurück in den Pool, damit jemand anderes sie lesen kann, und wer den Kreis angelegt hat, kann um 24 Stunden verlängern." },
      { s: "Was passiert, wenn der Kreis endet?",
        c: "Ist das Ziel erreicht, schließt sich der Kreis ab, alle bekommen eine Benachrichtigung, und der Knopf [[=Ergebnis ansehen]] öffnet das Ergebnis. Läuft die Zeit vorher ab, wird der Kreis 24 Stunden nach dem Ende gelöscht; bis dahin kann verlängert werden. Das Ergebnis bleibt danach unter [[tx:tabs.profile]] › [[=Mein Weg]] erhalten." },
      { s: "Kostet das etwas?",
        c: "Einen einmaligen Kreis anzulegen und mitzumachen ist kostenlos. Mit einem kostenlosen Konto leitest du jeweils einen einmaligen Kreis; ist er abgeschlossen oder gelöscht, legst du den nächsten an. Bei wie vielen Kreisen du mitmachst, ist nicht begrenzt." },
    ],
  },

  ilgili: ["yasin", "hatim", "katil"],
  kart: { kicker: "Zum Anlass", baslik: "Einmaliger Kreis: in einer Minute angelegt", metin: "Chatma, 41 Yasin oder Salawat wählen, für wen und bis wann festlegen, Link teilen." },
  onizleme: { sahne: "tek-kart", adim: 4 },
};
