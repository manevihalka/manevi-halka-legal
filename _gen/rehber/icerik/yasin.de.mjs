// 41 Yasin gemeinsam (DE), 21. Nov. 2026; Übersetzung von yasin.tr.mjs. App: Vorlage „41 Yasin“ des einmaligen Kreises (2.1.0).
// Die Tradition wird neutral und knapp beschrieben: keine Lohnversprechen, keine Urteile, keine bestimmten Tage.
export default {
  title: "41 Yasin gemeinsam lesen: so legst du einen Kreis an",
  desc: "Organisiere 41 Yasin gemeinsam, für Heilung, einen Verstorbenen oder einen Anlass: Alle lesen ihren Anteil in der App, der Zähler erreicht gemeinsam 41.",
  h1: "41 Yasin gemeinsam lesen: Schritt für Schritt zum 41-Yasin-Kreis",
  crumb: "41 Yasin gemeinsam",
  eyebrow: "Schritt für Schritt",
  lead: "41 Yasin heißt, dass eine Gemeinschaft die Sure Yasin insgesamt 41 Mal liest. In vielen Familien wird sie für die Heilung eines Kranken, für einen Verstorbenen oder für ein Anliegen gelesen; die Lesungen werden unter den Teilnehmenden aufgeteilt. In der App gibt es dafür eine fertige Vorlage: Du wählst, für wen und bis wann, und schickst den Link. Alle lesen Yasin dort, wo sie sind; die App zählt nur zusammen.",
  meta: ["In etwa 1 Minute angelegt", "Yasin öffnet sich in der App", "Kostenlos"],
  film: { sahne: "film-yasin", cap: "Vorlage [[tx:eventCompose.tplYasin41]], für wen, [[eventCompose.cta]], Einladung und Kreis-Bildschirm." },

  kisa: {
    maddeler: [
      "Tippe im Tab [[tabs.circles]] auf **+** und dann auf die Karte [[tx:event.createMenuTitle]].",
      "Wähle auf dem Bildschirm [[tx:eventCompose.pickTitle]] die Vorlage [[tx:eventCompose.tplYasin41]].",
      "Wähle die Zeilen [[tx:eventCompose.rowFor]] und [[tx:eventCompose.rowEnd]] und tippe auf [[eventCompose.cta]].",
      "Schick den Link mit [[eventCompose.invite]] an deine Familie oder WhatsApp-Gruppe.",
      "Alle tippen auf dem Kreis-Bildschirm auf [[eventCompose.readBtn]], lesen Yasin und tippen auf der letzten Seite auf [[hatim.markRead]].",
      "Erreicht der Zähler 41, ist der Kreis abgeschlossen und alle bekommen eine Benachrichtigung.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Wer den Kreis anlegt", baslik: "Den 41-Yasin-Kreis anlegen",
      giris: "Der Kreis ist einmalig: Er hat ein Ziel (41 Lesungen) und ein Ende. Ist das Ziel erreicht, schließt er sich von selbst ab.",
      adimlar: [
        {
          baslik: "Die Vorlage 41 Yasin wählen",
          metin: [
            "Tippe im Tab [[tabs.circles]] oben rechts auf **+** und im Fenster auf die Karte [[tx:event.createMenuTitle]].",
            "Tippe auf dem Bildschirm [[tx:eventCompose.pickTitle]] auf die Kachel [[tx:eventCompose.tplYasin41]]. Die Übersicht ist fertig: gelesen wird [[tx:event.presetYasin]], das Ziel ist 41, die Zählung [[tx:event.modeCollective]]. Alle Lesungen fließen in einen Zähler.",
          ],
          ipucu: "Fehlt oben rechts das **+**, tippe in der Mitte auf [[ol:circlesTab.anonCreateEvent]]; nach deinem Namen öffnet sich derselbe Bildschirm.",
          sahne: "yasin-sablon",
        },
        {
          baslik: "Für wen und bis wann",
          metin: [
            "Tippe auf die Zeile [[tx:eventCompose.rowFor]]. Der Chip [[tx:eventCompose.intentSifa]] schreibt „[[tx:eventCompose.intentSifaFill]]“ ins Feld; daneben stehen [[tx:eventCompose.intentRuh]] und [[tx:eventCompose.intentVesile]]. Du kannst den Text ändern oder leer lassen.",
            "Die Zeile [[tx:eventCompose.rowEnd]] steht auf [[tx:eventCompose.endDays3]]. Du kannst auch [[tx:eventCompose.endTonight]], [[tx:eventCompose.endFriday]], [[tx:eventCompose.endWeek]], die nächste gesegnete Nacht oder [[tx:eventCompose.endCustom]] wählen.",
          ],
          fark: "Der Satz unten auf der Karte rechnet den Anteil pro Person aus: Machen 10 Personen mit, liest jede etwa 5 Mal.",
          sahne: "yasin-kur",
        },
        {
          baslik: "Den Kreis eröffnen und einladen",
          metin: [
            "Der Name des Kreises steht auf [[tx:eventCompose.tplYasin41]]; ändere ihn, wenn du magst. Tippe unten auf [[eventCompose.cta]].",
            "Auf dem Bildschirm [[tx:eventCompose.readyTitle]] läuft der Kreis bereits. Tippe auf [[eventCompose.invite]]: Die Nachricht nennt, für wen, den Namen, das Ende und den Link mit „[[tx:eventInvite.join.surah]]“.",
          ],
          ipucu: "Willst du das Ziel ändern, tippe in der Übersicht auf die Zeile [[tx:compose.rowWhat]]. Du kannst statt 41 eine andere Zahl eingeben oder statt [[tx:event.modeCollective]] lieber [[tx:event.modeIndividual]] wählen; dann liest jede Person das ganze Ziel selbst.",
          sahne: "yasin-davet",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", rol: "Alle, die mitmachen", baslik: "Deinen Anteil lesen",
      giris: "Alle lesen dort, wo sie sind; die App zählt nur zusammen. Auf dem Kreis-Bildschirm siehst du die Gesamtzahl und deine eigenen Lesungen.",
      adimlar: [
        {
          baslik: "Auf Lesen tippen, auf der letzten Seite markieren",
          metin: [
            "Nach dem Link und [[joinGroup.join]] öffnet sich der Kreis-Bildschirm. Die obere Karte zeigt, für wen gelesen wird, wie viele Lesungen geschafft sind und 41 Perlen; unten stehen die Restzeit und der verbleibende Anteil pro Person.",
            "Tippe auf deiner Karte auf [[eventCompose.readBtn]]. Yasin öffnet sich im Koran-Leser der App auf den eigenen Seiten; unter dem Knopf stehen die Seiten und die ungefähre Lesezeit. Auf der letzten Seite erscheint [[hatim.markRead]]. Tippst du darauf und bestätigst, bist du zurück im Kreis, und der Zähler steigt um eins.",
          ],
          fark: "Du musst keinen Mushaf suchen: Die Seiten von Yasin öffnen sich in der App.",
          ipucu: "Öffnet sich der Link im Browser statt in der App: [Einem Kreis beitreten](/de/anleitungen/kreis-beitreten/).",
          sahne: "yasin-oku",
        },
        {
          baslik: "Wenn du aus einem Buch gelesen hast",
          metin: [
            "Hast du Yasin aus deinem eigenen Mushaf oder auswendig gelesen, tippe unter [[eventCompose.readBtn]] auf [[tx:readTogether.markFromBook]] und bestätige. Deine Lesung zählt als eine.",
            "Liest du mehrmals, wiederhole das nach jeder Lesung. Wie oft du gelesen hast, steht unter deiner Karte.",
          ],
          ipucu: "Die App fragt vor dem Markieren nach, denn eine bestätigte Lesung lässt sich vom Zähler nicht mehr abziehen.",
        },
        {
          baslik: "Ohne App: im Browser zählen",
          metin: [
            "Auf dem Handy von jemandem ohne App öffnet sich der Link im Browser. Die Seite zeigt die Zeile [[tx:event.presetYasin]], die Gesamtzahl und den Knopf [[=Mitzählen]].",
            "Lies Yasin aus deinem eigenen Mushaf. Tippe dann auf [[=Mitzählen]], tippe für jede gelesene Yasin einmal auf den großen Kreis und dann auf [[=Beitrag hinzufügen]]. Deine Zahl kommt zur Gesamtzahl des Kreises dazu.",
          ],
          fark: "Kein Konto nötig; der Link genügt.",
          ipucu: "Das geht nur bei einer Zählung [[tx:event.modeCollective]]. In einem Kreis mit [[tx:event.modeIndividual]] zeigt der Browser [[=Für Kreismitglieder]].",
          sahne: "yasin-web",
        },
      ],
    },
    {
      tur: "ikili", id: "tamam", rol: "Alle", baslik: "Wenn 41 erreicht sind",
      giris: "Sobald der Zähler 41 erreicht, schließt sich der Kreis von selbst ab; wer die letzte Lesung eingetragen hat, spielt keine Rolle.",
      kartlar: [
        {
          baslik: "Der Kreis ist abgeschlossen",
          metin: [
            "Alle Perlen der oberen Karte füllen sich. Ist der Bildschirm offen, erscheint ein kurzer Hinweis; wer die App geschlossen hat, bekommt eine Benachrichtigung.",
            "Der Knopf [[=Ergebnis ansehen]] zeigt die Gesamtzahl des Kreises und deinen eigenen Beitrag. Der Kreis wird 24 Stunden nach dem Ende gelöscht; das Ergebnis bleibt unter [[tx:tabs.profile]] › [[=Mein Weg]].",
          ],
          sahne: "yasin-tamam",
        },
        {
          baslik: "Wenn die Zeit knapp wird oder erneut gelesen wird",
          metin: [
            "Naht das Ende und sind 41 noch nicht erreicht, wählt die Person, die den Kreis angelegt hat, im **···**-Menü [[tx:event.extend24h]]; das Ende rückt um 24 Stunden nach hinten, und alle lesen weiter.",
            "Für eine neue Lesung mit derselben Absicht tippt sie im Ergebnis auf [[=Diesen Kreis erneut anlegen]]. Die Einrichtung öffnet sich mit demselben Ziel, Namen und derselben Widmung; nur das Ende wird neu gewählt.",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ornek", baslik: "Beispiel: 41 Yasin mit der Absicht der Heilung",
      giris: "Die Bilder unten stammen aus der App. Der Kreis wird „Mit der Absicht der Heilung für unsere Kranken“ angelegt und läuft bis zur nächsten gesegneten Nacht.",
      kareler: [
        { img: "ev-ozet", alt: "Übersicht: Karte Dieser Kreis mit 41 gemeinsam, Für wen mit der Absicht der Heilung, Bis wann bis Laylat al-Ragha'ib", cap: "Alles auf einem Bildschirm, mit dem Anteil pro Person" },
        { img: "ev-bitis", alt: "Fenster Bis wann: Heute Nacht, Bis Freitag, 3 Tage, 1 Woche, Bis Laylat al-Ragha'ib und Anderer Zeitpunkt", cap: "End-Chips: von heute Nacht bis zur nächsten gesegneten Nacht" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Was ist 41 Yasin?",
        c: "41 Yasin heißt, dass eine Gemeinschaft die Sure Yasin insgesamt 41 Mal liest. Die Lesungen werden unter den Teilnehmenden aufgeteilt; einige Personen lesen mehrmals, bis 41 erreicht sind. Oft wird sie für die Heilung eines Kranken, für einen Verstorbenen oder für ein Anliegen gelesen." },
      { s: "Wie liest man 41 Yasin gemeinsam?",
        c: "Tippe in der App im Tab [[tabs.circles]] auf **+**, dann auf die Karte [[tx:event.createMenuTitle]] und die Vorlage [[tx:eventCompose.tplYasin41]]. Wähle die Zeilen [[tx:eventCompose.rowFor]] und [[tx:eventCompose.rowEnd]], tippe auf [[eventCompose.cta]] und schick den Link. Alle lesen Yasin mit dem Knopf [[eventCompose.readBtn]] auf dem Kreis-Bildschirm; erreicht der Zähler 41, ist der Kreis abgeschlossen." },
      { s: "Braucht man 41 Personen?",
        c: "In der App nicht. Der Zähler zählt Lesungen, keine Personen: Machen 10 Personen mit, liest jede etwa 4 oder 5 Mal. Der Satz unten auf der Kreis-Karte zeigt den verbleibenden Anteil pro Person." },
      { s: "Wie trage ich eine Lesung aus meinem eigenen Mushaf ein?",
        c: "Tippe auf dem Kreis-Bildschirm auf [[tx:readTogether.markFromBook]] und bestätige; deine Lesung kommt zum Zähler dazu. Liest du im Koran-Leser der App, erledigt das der Knopf [[hatim.markRead]] auf der letzten Seite." },
      { s: "Können Menschen ohne App mitmachen?",
        c: "Ja. Wer den Link im Browser öffnet, zählt seine Lesungen mit [[=Mitzählen]] und tippt auf [[=Beitrag hinzufügen]]; ein Konto ist nicht nötig. Das geht, wenn die Zählung [[tx:event.modeCollective]] ist." },
      { s: "Kostet das etwas?",
        c: "Einen 41-Yasin-Kreis anzulegen und mitzumachen ist kostenlos. Mit einem kostenlosen Konto leitest du jeweils einen einmaligen Kreis; ist er abgeschlossen oder gelöscht, legst du den nächsten an." },
    ],
  },

  ilgili: ["tek", "zikir", "katil"],
  kart: { kicker: "Gemeinsam lesen", baslik: "41 Yasin gemeinsam", metin: "Ein 41-Yasin-Kreis für Heilung, einen Verstorbenen oder einen Anlass; alle lesen in der App bis 41." },
  onizleme: { sahne: "yasin-kart", adim: 14 },
};
