// Tahajjud alarm (EN). Format: header comment of _gen/build-rehber.mjs. Translated from teheccud.tr.mjs.
// Silent mode: iOS 26+ AlarmKit rings in silent mode and Focus; Android only the app's own sentence; before iOS 26 a
// notification that does not ring in silent mode. Sharing in a circle is deliberately not mentioned. No promises of reward.
export default {
  title: "Tahajjud alarm: tonight's tahajjud time and a wake-up alarm",
  desc: "The Tahajjud card in My Prayers shows tonight's tahajjud time. Set a wake-up alarm for the last third of the night or any time you choose.",
  h1: "How to set a tahajjud alarm",
  crumb: "Tahajjud alarm",
  eyebrow: "Step-by-step guide",
  lead: "The Tahajjud card in My Prayers shows tonight's tahajjud time: from the start of the last third of the night until dawn. You set the wake-up alarm from the same card. On iPhone with iOS 26 or later, the alarm rings even in silent mode.",
  meta: ["Setup takes 1 minute", "iPhone and Android", "Free"],
  film: { sahne: "film-teheccud", cap: "Turn on voluntary prayer tracking, set the alarm from the Tahajjud card, and your phone rings when the time comes." },

  kisa: {
    maddeler: [
      "Tap the prayer ring on the [[tx:tabs.home]] tab to open [[prayerDetail.title]].",
      "In the [[tx:prayer.naflSection]] section, switch on [[tx:prayer.naflTrackToggle]]. The Tahajjud card appears and shows tonight's tahajjud time.",
      "Tap the [[tx:night.alarm]] row on the card and switch on [[tx:tahajjudAlarm.enableTitle]].",
      "Choose the time: the last third of the night, a set number of minutes before dawn, or a fixed time.",
      "Choose the nights; [[tx:tahajjudAlarm.preset.all]] is selected by default. The upcoming alarms are listed below.",
      "When the alarm rings, [[tx:tahajjudAlarm.snooze]] rings again after 10 minutes. After you pray, tap the circle on the card.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kart", baslik: "Open the Tahajjud card",
      giris: "The Tahajjud card sits in the voluntary prayers section of My Prayers. You only need to turn on voluntary prayer tracking once.",
      adimlar: [
        {
          baslik: "Turn on voluntary prayer tracking in My Prayers",
          metin: [
            "Tap the prayer ring on the [[tx:tabs.home]] tab and [[prayerDetail.title]] opens. The round check-mark button at the top of the [[tx:tabs.explore]] tab opens the same screen.",
            "Scroll down. In the [[tx:prayer.naflSection]] section, switch on [[tx:prayer.naflTrackToggle]]. The Tahajjud card appears below the Duha row.",
          ],
          sahne: "teh-ac",
        },
        {
          baslik: "See tonight's tahajjud time and mark it when you pray",
          metin: [
            "At the top of the card you see a time range such as **Tonight 02:08-06:17**. It runs from the start of the last third of the night until dawn, based on the prayer times of your city. If no city is set for prayer times, the card shows only “At night” instead of a range.",
            "After you pray, tap the circle on the right of the card. If you like, choose how many rak'ahs you prayed with the buttons from 2 to 12; your last choice is remembered. To track witr as well, switch on [[tx:night.witrToggle]] at the bottom of the card.",
          ],
          ipucu: "The [[tx:night.guide]] row at the very bottom of the card opens a short guide: its time, how many rak'ahs are prayed, the intention, what is recited and how it relates to witr.",
          sahne: "teh-kart",
        },
      ],
    },
    {
      tur: "bolum", id: "alarm", baslik: "Set the wake-up alarm",
      giris: "On iOS 26 or later and on Android, the wake-up alarm is set as a real alarm: your phone rings when the time comes. You make all the settings on one screen.",
      adimlar: [
        {
          baslik: "Tap the wake-up alarm row and switch the alarm on",
          metin: [
            "Tap the [[tx:night.alarm]] row on the Tahajjud card. The [[tx:tahajjudAlarm.screenTitle]] screen opens. Switch on [[tx:tahajjudAlarm.enableTitle]] at the top. The first time, your iPhone asks for alarm permission; allow it.",
            "The line under the switch tells you how the alarm will ring on your phone. On iOS 26 or later it says “Rings even in silent mode and Focus.” On Android the alarm rings with your phone's alarm sound. On iOS versions before 26 the alarm arrives as a notification and does not ring in silent mode.",
          ],
          ipucu: "On Android, if the exact alarm permission is off, a warning and an [[tx:tahajjudAlarm.exactFix]] button appear. While the permission is off, the alarm may be a few minutes late.",
          sahne: "teh-alarm-ac",
        },
        {
          baslik: "Choose the time",
          metin: "The [[tx:tahajjudAlarm.timeSection]] section has three options:",
          liste: [
            "[[tx:prayerTracking.tahajjudModeLastThird]]: the start of the range you see on the card. This is selected by default.",
            "[[tx:prayerTracking.tahajjudModeBeforeFajr]]: 15, 30, 45, 60, 75 or 90 minutes before dawn.",
            "[[tx:prayerTracking.tahajjudModeFixed]]: any time you like, for example 03:30.",
          ],
          ipucu: "The first two options are calculated from the prayer times. If no city is set for prayer times, only a fixed time can be used.",
          sahne: "teh-saat",
        },
        {
          baslik: "Choose the nights",
          metin: [
            "In the [[tx:tahajjudAlarm.nightsSection]] section, [[tx:tahajjudAlarm.preset.all]] is selected by default. If you like, pick the nights one by one. A night is named after its morning: the night of Monday runs from Sunday evening to Monday morning.",
            "The [[tx:tahajjudAlarm.upcomingTitle]] list at the bottom shows on which night and at what time the next alarms will ring.",
          ],
          ipucu: "While the alarm is on, the tahajjud reminder in Prayer Settings stays silent, so you are not alerted twice. When you turn the alarm off, the reminder comes back with its old settings.",
          sahne: "teh-geceler",
        },
      ],
    },
    {
      tur: "bolum", id: "caldiginda", baslik: "When the alarm rings",
      giris: "At the alarm time your phone rings with “Time for tahajjud”.",
      adimlar: [
        {
          baslik: "Snooze or stop, and mark it when you pray",
          metin: [
            "[[tx:tahajjudAlarm.snooze]] makes the alarm ring again after 10 minutes. If you are up, stop the alarm.",
            "After you pray, tap the circle on the Tahajjud card in My Prayers. How many nights you prayed shows in the voluntary prayer summary below the card.",
          ],
          ipucu: "If you have a tahajjud intention in the Garden of Intentions, every night you mark in My Prayers counts there too.",
          sahne: "teh-caliyor",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Does the tahajjud alarm ring in silent mode?",
        c: "On iPhone with iOS 26 or later, yes: the alarm rings even in silent mode and Focus. On iOS versions before 26 it arrives as a notification and does not ring in silent mode; the alarm screen tells you so itself. On Android the alarm rings with your phone's alarm sound." },
      { s: "How is the tahajjud time calculated?",
        c: "The range on the card runs from the start of the last third of the night, counted from maghrib to dawn with your city's prayer times, until dawn. You can set the alarm for the start of that range, a set number of minutes before dawn, or a fixed time." },
      { s: "How is it different from the tahajjud reminder in Prayer Settings?",
        c: "The reminder is a notification. On iOS 26 or later and on Android, the wake-up alarm is a real alarm: your phone rings and you can snooze it for 10 minutes. While the alarm is on, the reminder stays silent; when you turn the alarm off, the reminder comes back with its old settings." },
      { s: "Does the alarm keep ringing every night?",
        c: "Yes, on the nights you chose. The app sets alarms for up to the next seven nights and renews them whenever you open the app. Opening the app every few days is enough." },
      { s: "Can I use it without choosing a city?",
        c: "Yes, with a fixed time. The last third of the night and before dawn are calculated from prayer times, so they need a city; without one, the screen leaves only the fixed time available." },
      { s: "Is it free?",
        c: "Yes. The Tahajjud card and the wake-up alarm are free." },
    ],
  },

  ilgili: ["kaza", "defter", "bahce"],
  kart: { kicker: "Tahajjud", baslik: "Tahajjud alarm", metin: "See tonight's tahajjud time and set a wake-up alarm. On iOS 26 it rings even in silent mode." },
  onizleme: { sahne: "teheccud-kart", adim: 5 },
  cta: { baslik: "Set your tahajjud alarm tonight", metin: "Download Manevi Halka for free, turn on voluntary prayer tracking in My Prayers and set the alarm from the Tahajjud card." },
};
