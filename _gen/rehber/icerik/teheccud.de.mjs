// Tahajjud-Wecker (DE). Format: Kopfkommentar von _gen/build-rehber.mjs. Übersetzt aus teheccud.tr.mjs.
// Lautlosmodus: iOS 26+ (AlarmKit) klingelt im Lautlos- und Fokusmodus; Android nur der App-Satz; vor iOS 26 Mitteilung,
// klingelt lautlos nicht. Teilen im Kreis wird bewusst nicht erwähnt. Keine Verheißungen.
export default {
  title: "Tahajjud-Wecker stellen: die Tahajjud-Zeit heute Nacht",
  desc: "Die Tahajjud-Karte in Meine Gebete zeigt die Tahajjud-Zeit dieser Nacht. Stell den Weckalarm auf das letzte Nachtdrittel oder eine Uhrzeit deiner Wahl.",
  h1: "Wie stelle ich den Tahajjud-Wecker?",
  crumb: "Tahajjud-Wecker",
  eyebrow: "Schritt-für-Schritt-Anleitung",
  lead: "Die Tahajjud-Karte in Meine Gebete zeigt die Tahajjud-Zeit dieser Nacht: vom Beginn des letzten Nachtdrittels bis zur Morgendämmerung. Den Weckalarm stellst du auf derselben Karte. Auf dem iPhone ab iOS 26 klingelt er auch im Lautlosmodus.",
  meta: ["Einrichtung in 1 Minute", "iPhone und Android", "Kostenlos"],
  film: { sahne: "film-teheccud", cap: "Freiwillige Gebete verfolgen einschalten, auf der Tahajjud-Karte den Wecker stellen, und zur Zeit klingelt dein Telefon." },

  kisa: {
    maddeler: [
      "Tippe im Tab [[tx:tabs.home]] auf den Gebetsring, dann öffnet sich [[prayerDetail.title]].",
      "Schalte im Abschnitt [[tx:prayer.naflSection]] die Option [[tx:prayer.naflTrackToggle]] ein. Die Tahajjud-Karte erscheint und zeigt die Tahajjud-Zeit dieser Nacht.",
      "Tippe auf der Karte auf die Zeile [[tx:night.alarm]] und schalte [[tx:tahajjudAlarm.enableTitle]] ein.",
      "Wähl die Uhrzeit: das letzte Nachtdrittel, einige Minuten vor Fadschr oder eine feste Uhrzeit.",
      "Wähl die Nächte; [[tx:tahajjudAlarm.preset.all]] ist voreingestellt. Die nächsten Wecker stehen in der Liste.",
      "Wenn der Wecker klingelt, klingelt [[tx:tahajjudAlarm.snooze]] nach 10 Minuten erneut. Nach dem Gebet tippst du auf den Kreis der Karte.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kart", baslik: "Öffne die Tahajjud-Karte",
      giris: "Die Tahajjud-Karte steht im Abschnitt der freiwilligen Gebete in Meine Gebete. Du musst das Verfolgen der freiwilligen Gebete nur einmal einschalten.",
      adimlar: [
        {
          baslik: "Schalte in Meine Gebete das Verfolgen der freiwilligen Gebete ein",
          metin: [
            "Tippe im Tab [[tx:tabs.home]] auf den Gebetsring, dann öffnet sich [[prayerDetail.title]]. Auch die runde Taste mit dem Häkchen oben im Tab [[tx:tabs.explore]] öffnet diesen Bildschirm.",
            "Scroll nach unten. Schalte im Abschnitt [[tx:prayer.naflSection]] die Option [[tx:prayer.naflTrackToggle]] ein. Unter der Duha-Zeile erscheint die Tahajjud-Karte.",
          ],
          sahne: "teh-ac",
        },
        {
          baslik: "Sieh die Tahajjud-Zeit dieser Nacht und hake sie nach dem Gebet ab",
          metin: [
            "Oben auf der Karte steht eine Zeitspanne wie **Heute Nacht 02:08-06:17**. Sie reicht nach den Gebetszeiten deiner Stadt vom Beginn des letzten Nachtdrittels bis zur Morgendämmerung. Ist für die Gebetszeiten keine Stadt gewählt, steht statt der Spanne nur „Nachts“.",
            "Nach dem Gebet tippst du auf den Kreis rechts auf der Karte. Wenn du willst, wählst du mit den Tasten von 2 bis 12, wie viele Rak'as du gebetet hast; deine letzte Wahl bleibt gespeichert. Um auch Witr festzuhalten, schalte unten auf der Karte [[tx:night.witrToggle]] ein.",
          ],
          ipucu: "Die Zeile [[tx:night.guide]] ganz unten auf der Karte öffnet eine kurze Anleitung: die Zeit, wie viele Rak'as gebetet werden, die Absicht, was rezitiert wird und wie es mit Witr zusammenhängt.",
          sahne: "teh-kart",
        },
      ],
    },
    {
      tur: "bolum", id: "alarm", baslik: "Stell den Weckalarm",
      giris: "Ab iOS 26 und auf Android wird der Weckalarm als echter Wecker gestellt: Zur Zeit klingelt dein Telefon. Alle Einstellungen machst du auf einem Bildschirm.",
      adimlar: [
        {
          baslik: "Tippe auf die Zeile Weckalarm und schalte den Wecker ein",
          metin: [
            "Tippe auf der Tahajjud-Karte auf die Zeile [[tx:night.alarm]]. Der Bildschirm [[tx:tahajjudAlarm.screenTitle]] öffnet sich. Schalte oben [[tx:tahajjudAlarm.enableTitle]] ein. Beim ersten Mal fragt das iPhone nach der Wecker-Erlaubnis; erlaube sie.",
            "Die Zeile unter dem Schalter sagt dir, wie der Wecker auf deinem Telefon klingelt. Ab iOS 26 steht dort „Klingelt auch im Lautlos- und Fokusmodus.“ Auf Android klingelt der Wecker mit dem Weckton deines Telefons. Auf iOS-Versionen vor 26 kommt er als Mitteilung und klingelt im Lautlosmodus nicht.",
          ],
          ipucu: "Ist auf Android die Erlaubnis für exakte Wecker aus, erscheinen ein Hinweis und die Taste [[tx:tahajjudAlarm.exactFix]]. Solange sie aus ist, kann der Wecker einige Minuten später klingeln.",
          sahne: "teh-alarm-ac",
        },
        {
          baslik: "Wähl die Uhrzeit",
          metin: "Im Abschnitt [[tx:tahajjudAlarm.timeSection]] gibt es drei Möglichkeiten:",
          liste: [
            "[[tx:prayerTracking.tahajjudModeLastThird]]: der Beginn der Spanne, die du auf der Karte siehst. Das ist voreingestellt.",
            "[[tx:prayerTracking.tahajjudModeBeforeFajr]]: 15, 30, 45, 60, 75 oder 90 Minuten vor Fadschr.",
            "[[tx:prayerTracking.tahajjudModeFixed]]: eine Uhrzeit deiner Wahl, zum Beispiel 03:30.",
          ],
          ipucu: "Die ersten beiden Möglichkeiten werden aus den Gebetszeiten berechnet. Ist für die Gebetszeiten keine Stadt gewählt, geht nur eine feste Uhrzeit.",
          sahne: "teh-saat",
        },
        {
          baslik: "Wähl die Nächte",
          metin: [
            "Im Abschnitt [[tx:tahajjudAlarm.nightsSection]] ist [[tx:tahajjudAlarm.preset.all]] voreingestellt. Wenn du willst, wählst du die Nächte einzeln. Eine Nacht heißt nach ihrem Morgen: Die Nacht zum Montag reicht von Sonntagabend bis Montagmorgen.",
            "Die Liste [[tx:tahajjudAlarm.upcomingTitle]] ganz unten zeigt, in welcher Nacht und um wie viel Uhr die nächsten Wecker klingeln.",
          ],
          ipucu: "Solange der Wecker an ist, bleibt die Tahajjud-Erinnerung in den Gebetseinstellungen stumm, damit du nicht doppelt geweckt wirst. Schaltest du den Wecker aus, kommt die Erinnerung mit ihren alten Einstellungen zurück.",
          sahne: "teh-geceler",
        },
      ],
    },
    {
      tur: "bolum", id: "caldiginda", baslik: "Wenn der Wecker klingelt",
      giris: "Zur Weckzeit klingelt dein Telefon mit „Zeit für Tahajjud“.",
      adimlar: [
        {
          baslik: "Schlummern oder stoppen, nach dem Gebet abhaken",
          metin: [
            "[[tx:tahajjudAlarm.snooze]] lässt den Wecker nach 10 Minuten erneut klingeln. Bist du wach, stoppst du den Wecker.",
            "Nach dem Gebet tippst du auf der Tahajjud-Karte in Meine Gebete auf den Kreis. Wie viele Nächte du gebetet hast, steht in der Übersicht der freiwilligen Gebete unter der Karte.",
          ],
          ipucu: "Hast du im Garten der Absichten eine Tahajjud-Absicht, zählt dort jede Nacht mit, die du in Meine Gebete abhakst.",
          sahne: "teh-caliyor",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Klingelt der Tahajjud-Wecker im Lautlosmodus?",
        c: "Auf dem iPhone ab iOS 26 ja: Der Wecker klingelt auch im Lautlos- und Fokusmodus. Auf iOS-Versionen vor 26 kommt er als Mitteilung und klingelt im Lautlosmodus nicht; das sagt der Wecker-Bildschirm selbst. Auf Android klingelt der Wecker mit dem Weckton deines Telefons." },
      { s: "Wie wird die Tahajjud-Zeit berechnet?",
        c: "Die Spanne auf der Karte reicht vom Beginn des letzten Nachtdrittels, gerechnet von Maghrib bis Fadschr nach den Gebetszeiten deiner Stadt, bis zur Morgendämmerung. Den Wecker kannst du auf den Beginn dieser Spanne, einige Minuten vor Fadschr oder eine feste Uhrzeit stellen." },
      { s: "Was ist der Unterschied zur Tahajjud-Erinnerung in den Gebetseinstellungen?",
        c: "Die Erinnerung ist eine Mitteilung. Ab iOS 26 und auf Android ist der Weckalarm ein echter Wecker: Dein Telefon klingelt, und du kannst um 10 Minuten schlummern. Solange der Wecker an ist, bleibt die Erinnerung stumm; schaltest du ihn aus, kommt sie mit ihren alten Einstellungen zurück." },
      { s: "Klingelt der Wecker jede Nacht weiter?",
        c: "Ja, in den Nächten, die du gewählt hast. Die App stellt die Wecker für höchstens die nächsten sieben Nächte und erneuert sie, sobald du die App öffnest. Es reicht, die App alle paar Tage zu öffnen." },
      { s: "Geht es auch ohne gewählte Stadt?",
        c: "Ja, mit einer festen Uhrzeit. Das letzte Nachtdrittel und die Zeit vor Fadschr werden aus den Gebetszeiten berechnet und brauchen deshalb eine Stadt; ohne Stadt lässt der Bildschirm nur die feste Uhrzeit offen." },
      { s: "Ist es kostenlos?",
        c: "Ja. Die Tahajjud-Karte und der Weckalarm sind kostenlos." },
    ],
  },

  ilgili: ["kaza", "defter", "bahce"],
  kart: { kicker: "Tahajjud", baslik: "Tahajjud-Wecker", metin: "Sieh die Tahajjud-Zeit dieser Nacht und stell den Weckalarm. Ab iOS 26 klingelt er auch im Lautlosmodus." },
  onizleme: { sahne: "teheccud-kart", adim: 5 },
  cta: { baslik: "Stell deinen Tahajjud-Wecker noch heute", metin: "Lade Manevi Halka kostenlos, schalte in Meine Gebete die freiwilligen Gebete ein und stell auf der Tahajjud-Karte den Wecker." },
};
