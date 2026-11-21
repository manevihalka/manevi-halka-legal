// Nachholgebete und -fasten (DE). Format: Kopfkommentar von _gen/build-rehber.mjs. Übersetzt aus kaza.tr.mjs.
// Kein Fiqh-Urteil; der Rechenhelfer schätzt nur. "Ist das erlaubt"-Fragen: nur Quelle (DE: Dar al-Ifta).
export default {
  title: "Nachholgebete und -fasten: berechnen und abhaken",
  desc: "Nachholgebete und -fasten in der App: Ein Helfer schätzt die Zahl, du hakst eins nach dem anderen ab. Deine Einträge siehst nur du.",
  h1: "Wie behalte ich Nachholgebete und Nachholfasten im Blick?",
  crumb: "Nachholgebete und -fasten",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "Nachholgebete und -fasten ist eine persönliche Seite, auf der du verpasste Gebete und Fastentage in deinem Tempo nachholst. Du trägst die Zahlen einmal ein und hakst dann eins nach dem anderen ab. Deine Einträge siehst nur du.",
  meta: ["Einrichtung etwa 2 Minuten", "Nur du siehst sie", "Kostenlos"],
  film: { sahne: "film-kaza", cap: "Ein Gebet mit dem + neben seiner Zeit, ein ganzer Tag mit einem Tipp und [[kaza.oruc.today]] fürs Fasten." },

  kisa: {
    maddeler: [
      "Tippe im Tab [[tx:tabs.home]] auf den Gebetsring, dann öffnet sich [[prayerDetail.title]]. Tippe weiter unten auf die Zeile [[kaza.titleBoth]].",
      "Tippe auf [[kaza.s1.begin]] und trag ein, wie viele Gebete jeder Gebetszeit offen sind. Wenn du es nicht weißt, liefert [[ol:kaza.s2.calc]] eine ungefähre Zahl.",
      "Trag auf demselben Bildschirm die verpassten Fastentage ein, wähl dein Tempo und tippe auf [[kaza.s3.finish]].",
      "Hast du ein Nachholgebet gebetet, tippe auf das **+** neben seiner Zeit. Für mehrere auf einmal gibt es [[kaza.main.day]] und [[ol:kaza.main.some]].",
      "In Meine Gebete trägt die Taste [[kaza.bridge.also]] unter einem abgehakten Gebet das Nachholgebet nach dem Pflichtgebet mit einem Tipp ein.",
      "An einem Nachholfastentag tippst du im Tab [[tx:kaza.tabO]] auf [[kaza.oruc.today]]. Im Verlauf siehst und korrigierst du jeden Eintrag.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kurulum", baslik: "Richte deine Seite ein",
      giris: "Die Einrichtung hat drei kurze Bildschirme. Die Zahlen kannst du jederzeit korrigieren; beim ersten Mal müssen sie nicht genau stimmen.",
      adimlar: [
        {
          baslik: "Öffne Nachholgebete und -fasten in Meine Gebete",
          metin: [
            "Tippe im Tab [[tx:tabs.home]] auf den Gebetsring, dann öffnet sich [[prayerDetail.title]]. Auch die runde Taste mit dem Häkchen oben im Tab [[tx:tabs.explore]] öffnet diesen Bildschirm.",
            "Tippe unter den Gebetszeiten des Tages auf die Zeile [[kaza.titleBoth]]. Beim ersten Mal beginnt die Einrichtung. Der erste Bildschirm sagt dir, dass diese Seite nur dir gehört und die Zahlen eine Schätzung sind. Tippe auf [[kaza.s1.begin]].",
          ],
          sahne: "kaza-ac",
        },
        {
          baslik: "Trag ein, wie viele Gebete je Gebetszeit offen sind",
          metin: [
            "Auf dem Bildschirm [[tx:kaza.s2.title]] trägst du für Fadschr, Dhuhr, Asr, Maghrib und Ischa die Zahl ein, die du kennst. [[tx:kaza.s2.witrToggle]] ist eingeschaltet; schalte es aus, wenn du Witr nicht mitzählen willst.",
            "Wenn du Fastentage verpasst hast, trag ihre Zahl weiter unten im Feld [[tx:kaza.titleO]] ein, sonst lass es leer. Du kannst nur Gebete, nur Fasten oder beides einrichten. Tippe dann auf [[kaza.s2.next]].",
          ],
          sahne: "kaza-sayilar",
        },
        {
          baslik: "Zahl unbekannt? Frag den Rechenhelfer",
          metin: [
            "Tippe auf [[ol:kaza.s2.calc]]. Beantworte [[tx:kaza.calc.q]] in Jahren und Monaten. Gab es getrennte Zeiträume, füg sie mit [[tx:kaza.calc.addPeriod]] hinzu. Unten erscheint eine ungefähre Zahl je Gebetszeit; mit [[kaza.calc.apply]] wird sie bei allen Gebetszeiten eingetragen.",
            "Für Frauen gibt es zusätzlich die freiwillige Option [[tx:kaza.calc.special]]. Fürs Fasten gibt es einen eigenen Helfer: [[ol:kaza.s2.fastCalc]] fragt, in wie vielen Ramadanen du nicht fasten konntest.",
          ],
          ipucu: "Der Helfer liefert nur eine Schätzung: Er rechnet den eingegebenen Zeitraum in Tage um und rundet auf. Zu deiner eigenen Lage kannst du einen Gelehrten fragen; das empfehlen auch die Hinweise in der App.",
          sahne: "kaza-hesap",
        },
        {
          baslik: "Wähl dein Tempo und tippe auf Bismillah",
          metin: [
            "Auf dem Bildschirm [[tx:kaza.s3.title]] gibt es drei Möglichkeiten: [[tx:kaza.pace.afterFard]], [[tx:kaza.pace.twoDaily]] und [[tx:kaza.pace.self]]. Je nach Tempo erscheint darunter eine ungefähre Zeitspanne; ein Zieldatum gibt es nicht.",
            "Wenn du willst, schalte [[tx:kaza.s3.remind]] ein und wähl eine Uhrzeit. Die Erinnerung fällt nicht in die Zeiten, in denen das Gebet unerwünscht ist, und zeigt auf dem Sperrbildschirm weder eine Zahl noch das Wort „Nachholgebet“. Tippe dann auf [[kaza.s3.finish]].",
          ],
          ipucu: "Am Ende der Einrichtung wirst du einmal gefragt, ob deine Nachholgebete auch als Setzling in deinem Garten der Absichten wachsen sollen. Der Garten liest nur mit und ändert die Zahlen hier nie. Mit [[ol:kaza.garden.no]] gehst du weiter.",
          sahne: "kaza-tempo",
        },
      ],
    },
    {
      tur: "bolum", id: "isaretle", baslik: "Hake eins nach dem anderen ab",
      giris: "Oben auf dem Hauptbildschirm steht, wie viele Gebete du erledigt hast, darunter, was je Gebetszeit offen ist. Jeder Eintrag ändert beide Zahlen zugleich.",
      adimlar: [
        {
          baslik: "Ein Nachholgebet gebetet? Tippe auf das + seiner Zeit",
          metin: [
            "Neben jeder Gebetszeit stehen die offene Zahl und eine **+**-Taste. Tippe auf die Zeit des Gebets, das du nachgeholt hast: Die offene Zahl sinkt um eins, [[tx:kaza.main.doneLabel]] oben steigt um eins. Hast du dich vertippt, nimmst du es mit [[tx:notice.undo]] in der Leiste unten zurück.",
            "In der Perlenreihe oben ist jede Perle ein Monat. Die Perlen füllen sich, während du betest; so siehst du deinen Fortschritt auch ohne Zahlen.",
          ],
          ipucu: "Die Augen-Taste oben rechts blendet die Zahlen aus. So kannst du den Bildschirm öffnen, auch wenn jemand neben dir sitzt.",
          sahne: "kaza-arti",
        },
        {
          baslik: "Einen ganzen Tag oder mehrere auf einmal eintragen",
          metin: [
            "Hast du von allen fünf Gebeten, und von Witr, wenn es eingeschaltet ist, je eines nachgeholt, tippe auf [[kaza.main.day]]; von jedem wird eines eingetragen.",
            "Hast du mehrere zusammen gebetet, tippe auf [[ol:kaza.main.some]]. Wähl im Fenster die Zahl je Gebetszeit, ändere bei Bedarf, wann du sie gebetet hast, und speichere. Gezählt werden Gebete, nicht Tage.",
          ],
          sahne: "kaza-birkac",
        },
        {
          baslik: "In Meine Gebete: Auch das Nachholgebet gebetet",
          metin: "Sobald deine Seite eingerichtet ist, erscheint in [[prayerDetail.title]] unter jedem Gebet, das du als gebetet abhakst, die Taste [[kaza.bridge.also]]. Hast du nach dem Pflichtgebet auch das Nachholgebet dieser Zeit gebetet, tippe darauf. Ein Nachholgebet dieser Zeit wird eingetragen, und die Taste zeigt [[tx:kaza.bridge.done]].",
          fark: "Du musst die Seite nicht öffnen: Du trägst das Nachholgebet dort ein, wo du das Pflichtgebet abhakst.",
          ipucu: "Eine Gebetszeit, die du nicht abhakst, wird nie von selbst als Nachholgebet gezählt.",
          sahne: "kaza-kisayol",
        },
        {
          baslik: "An einem Nachholfastentag: Heute gefastet",
          metin: [
            "Wechsle oben in den Tab [[tx:kaza.tabO]]. An einem Tag, an dem du nachholst, tippe auf [[kaza.oruc.today]]. Vergangene Tage wählst du mit [[tx:kaza.oruc.some]] im Kalender; die Festtage lassen sich dort nicht auswählen.",
            "In der Perlenreihe ist jede Reihe ein Ramadan und jede Perle ein Tag. Wenn du willst, schalte [[tx:kaza.oruc.ramadan]] ein: Im Monat Schaban kommt einmal eine Erinnerung.",
          ],
          sahne: "kaza-oruc",
        },
      ],
    },
    {
      tur: "bolum", id: "gecmis", baslik: "Verlauf und Korrektur",
      giris: "Jeder Eintrag wird mit Datum und Uhrzeit gespeichert. Ein falscher Eintrag bringt nichts durcheinander; er ist schnell korrigiert.",
      adimlar: [
        {
          baslik: "Jeden Eintrag im Verlauf sehen und korrigieren",
          metin: [
            "Tippe auf dem Hauptbildschirm auf die Zeile **Letzter Eintrag**, dann öffnet sich [[tx:kaza.hist.title]]. Die Einträge stehen Tag für Tag mit Uhrzeit. Tippe auf einen, um ihn zu bearbeiten oder zu löschen.",
            "Die Zahlen vom Anfang änderst du mit [[ol:kaza.hist.correct]]; was du schon nachgeholt hast, bleibt. Ist etwas schiefgegangen, bringt dich [[tx:kaza.hist.restore]] zu einem der letzten 30 Stände zurück. Auch dein Tempo änderst du hier.",
          ],
          sahne: "kaza-gecmis",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "So sieht es in der App aus",
      giris: "Diese Bildschirmfotos stammen aus der App selbst.",
      kareler: [
        { img: "n-kaza", alt: "Nachholgebete: Tab Gebet, Erledigt 1.381 Gebete, Perlenreihe nach Jahren und die offene Zahl je Gebetszeit", cap: "Nachholgebete: erledigt, offen und die Perlen nach Jahren" },
        { img: "n-namazlarim", alt: "Meine Gebete: unter abgehakten Gebeten die Taste Auch das Nachholgebet gebetet, darunter die Zeile Nachholgebete und -fasten", cap: "Meine Gebete: **Auch das Nachholgebet gebetet** und die Nachhol-Zeile" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Wer sieht meine Einträge?",
        c: "Nur du. Die Seite ist ganz persönlich: Deine Einträge bleiben auf diesem Telefon und getrennt von deinen Kreisen. Um die Zahlen auch auf dem Bildschirm auszublenden, tippe oben rechts auf die Augen-Taste." },
      { s: "Sagt mir der Rechenhelfer genau, wie viele Gebete ich nachholen muss?",
        c: "Nein, er liefert nur eine Schätzung. Er rechnet die eingegebenen Jahre und Monate in Tage um und rundet auf. Das Ergebnis kannst du beliebig ändern. Zu deiner eigenen Lage kannst du einen Gelehrten fragen." },
      { s: "Muss man Nachholgebete in der richtigen Reihenfolge beten?",
        c: "Diese Frage hat Dar al-Ifta al-Misriyya beantwortet. [Fatwa lesen (auf Arabisch)](https://www.dar-alifta.org/ar/fatwa/details/13010/%D8%AD%D9%83%D9%85-%D9%82%D8%B6%D8%A7%D8%A1-%D8%A7%D9%84%D8%B5%D9%84%D8%A7%D8%A9-%D8%A7%D9%84%D9%81%D8%A7%D8%A6%D8%AA%D8%A9). Die App schreibt keine Reihenfolge vor; du hakst die Gebetszeiten in jeder Reihenfolge ab." },
      { s: "Was passiert, wenn ich das Telefon wechsle?",
        c: "Deine Einträge werden auf diesem Telefon gespeichert. Auf dem neuen Telefon richtest du die Seite neu ein und trägst die offenen Zahlen ein. Später kannst du sie jederzeit mit [[ol:kaza.hist.correct]] korrigieren." },
      { s: "Werden Kaffara und Fidya mitgezählt?",
        c: "Nein, der Tab Fasten zählt nur nachgeholte Fastentage. Den Unterschied zwischen Nachholen, Kaffara und Fidya erklärt der Hinweis [[tx:kaza.oruc.info]] unten im Tab Fasten." },
      { s: "Ist es kostenlos?",
        c: "Ja. Nachholgebete und -fasten ist kostenlos." },
    ],
  },

  ilgili: ["teheccud", "bahce", "oruc"],
  kart: { kicker: "Nachholen", baslik: "Nachholgebete und -fasten", metin: "Zahl einmal eintragen, dann eins nach dem anderen abhaken. Deine Einträge siehst nur du." },
  onizleme: { sahne: "kaza-kart", adim: 5 },
  cta: { baslik: "Richte deine Seite heute ein", metin: "Lade Manevi Halka kostenlos, öffne die Seite in Meine Gebete und trag deine Zahlen ein." },
};
