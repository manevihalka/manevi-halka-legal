// Make-up prayers and fasts (EN). Format: header comment of _gen/build-rehber.mjs. Translated from kaza.tr.mjs.
// No fiqh rulings; the calculation helper only estimates. "Is it allowed" questions: no link, no ruling (EN rule).
export default {
  title: "Qada prayer tracker: make-up prayers and fasts",
  desc: "Track your make-up prayers and fasts in the app: a helper estimates the number, and you mark them off one by one. Only you see your records.",
  h1: "How to track qada prayers and make-up fasts",
  crumb: "Make-up prayers and fasts",
  eyebrow: "Step-by-step guide",
  lead: "Make-up prayers and fasts is a private page for completing the prayers you missed and the fasts you could not keep, at your own pace. You enter the numbers once and mark them off one by one as you go. Only you see your records.",
  meta: ["Setup takes about 2 minutes", "Only you see it", "Free"],
  film: { sahne: "film-kaza", cap: "One prayer with the + next to its time, a whole day with one tap, and [[kaza.oruc.today]] for fasts." },

  kisa: {
    maddeler: [
      "Tap the prayer ring on the [[tx:tabs.home]] tab to open [[prayerDetail.title]]. Then tap the [[kaza.titleBoth]] row further down.",
      "Tap [[kaza.s1.begin]] and enter how many prayers of each time you have left. If you are not sure, [[ol:kaza.s2.calc]] gives you an approximate number.",
      "Enter the fasting days you missed on the same screen, choose your pace and tap [[kaza.s3.finish]].",
      "When you pray a make-up prayer, tap the **+** next to its time. If you prayed several, use [[kaza.main.day]] or [[ol:kaza.main.some]].",
      "In My Prayers, the [[kaza.bridge.also]] button under a marked prayer records the make-up you prayed after the obligatory one with a single tap.",
      "On a day you keep a make-up fast, tap [[kaza.oruc.today]] on the [[tx:kaza.tabO]] tab. The history shows every entry and lets you correct it.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kurulum", baslik: "Set up your make-up page",
      giris: "Setup takes three short screens. You can correct the numbers whenever you like, so you do not need them to be exact the first time.",
      adimlar: [
        {
          baslik: "Open Make-up prayers and fasts from My Prayers",
          metin: [
            "Tap the prayer ring on the [[tx:tabs.home]] tab and [[prayerDetail.title]] opens. The round check-mark button at the top of the [[tx:tabs.explore]] tab opens the same screen.",
            "Below the day's prayer times, tap the [[kaza.titleBoth]] row. The first time, setup starts. The first screen tells you that this page is yours alone and that the numbers are an estimate. Tap [[kaza.s1.begin]].",
          ],
          sahne: "kaza-ac",
        },
        {
          baslik: "Enter how many prayers of each time you have left",
          metin: [
            "On the [[tx:kaza.s2.title]] screen, enter the number you know for Fajr, Dhuhr, Asr, Maghrib and Isha. [[tx:kaza.s2.witrToggle]] is switched on; turn it off if you do not want to include witr.",
            "If you missed fasts, enter the number of days in the [[tx:kaza.titleO]] box further down the same screen; otherwise leave it empty. You can set up prayers only, fasts only, or both. Then tap [[kaza.s2.next]].",
          ],
          sahne: "kaza-sayilar",
        },
        {
          baslik: "Not sure of the number? Ask the calculation helper",
          metin: [
            "Tap [[ol:kaza.s2.calc]]. Answer [[tx:kaza.calc.q]] in years and months. If there were separate periods, add them with [[tx:kaza.calc.addPeriod]]. An approximate number for each prayer time appears at the bottom; [[kaza.calc.apply]] writes it into every prayer time.",
            "There is also an optional [[tx:kaza.calc.special]] setting for women. Fasts have their own helper: [[ol:kaza.s2.fastCalc]] asks how many Ramadans you could not fast.",
          ],
          ipucu: "The helper only gives an estimate: it turns the period you enter into days and rounds up. You can ask a scholar about your own situation; the notes in the app suggest the same.",
          sahne: "kaza-hesap",
        },
        {
          baslik: "Choose your pace and tap Bismillah",
          metin: [
            "The [[tx:kaza.s3.title]] screen has three options: [[tx:kaza.pace.afterFard]], [[tx:kaza.pace.twoDaily]] and [[tx:kaza.pace.self]]. Depending on the pace you choose, an approximate time range appears below; no target date is set.",
            "If you like, switch on [[tx:kaza.s3.remind]] and pick a time. The reminder avoids the disliked times for prayer and never shows a number or the word “make-up” on the lock screen. Then tap [[kaza.s3.finish]].",
          ],
          ipucu: "At the end of setup you are asked once whether your make-up prayers should also grow as a sapling in your Garden of Intentions. The garden only reads; it never changes the numbers here. You can tap [[ol:kaza.garden.no]] and move on.",
          sahne: "kaza-tempo",
        },
      ],
    },
    {
      tur: "bolum", id: "isaretle", baslik: "Mark them off one by one",
      giris: "At the top of the main screen you see how many prayers you have completed; below it, what is left for each prayer time. Every mark changes both numbers at once.",
      adimlar: [
        {
          baslik: "Prayed one? Tap the + next to its time",
          metin: [
            "Each prayer time shows the number left and a **+** button. Tap the time of the make-up prayer you prayed: the number left goes down by one and [[tx:kaza.main.doneLabel]] at the top goes up by one. If you tapped by mistake, use [[tx:notice.undo]] on the bar that appears at the bottom.",
            "In the row of beads on the top card, each bead is one month's worth. The beads fill as you pray, so you can see your progress without reading numbers.",
          ],
          ipucu: "The eye button at the top right hides the numbers, so you can open the screen comfortably when someone is next to you.",
          sahne: "kaza-arti",
        },
        {
          baslik: "Record a whole day or several at once",
          metin: [
            "If you prayed one make-up of each of the five prayers, and of witr if it is on, tap [[kaza.main.day]]; one of each is recorded.",
            "If you prayed several together, tap [[ol:kaza.main.some]]. In the window that opens, choose the number for each prayer time, change when you prayed them if needed, and save. The number counts prayers, not days.",
          ],
          sahne: "kaza-birkac",
        },
        {
          baslik: "In My Prayers: I prayed its make-up too",
          metin: "Once your make-up page is set up, the [[kaza.bridge.also]] button appears under every prayer you mark as prayed in [[prayerDetail.title]]. If you prayed that time's make-up after the obligatory prayer, tap it. One make-up of that prayer is added to your page and the button changes to [[tx:kaza.bridge.done]].",
          fark: "No need to open the make-up page: you record the make-up right where you mark the obligatory prayer.",
          ipucu: "A prayer time you have not marked is never added to your make-ups on its own.",
          sahne: "kaza-kisayol",
        },
        {
          baslik: "On a make-up fasting day: I fasted today",
          metin: [
            "Switch to the [[tx:kaza.tabO]] tab at the top. On a day you keep a make-up fast, tap [[kaza.oruc.today]]. Past days are chosen from the calendar with [[tx:kaza.oruc.some]]; the Eid days cannot be selected.",
            "In the beads, each row is one Ramadan and each bead one day. If you like, switch on [[tx:kaza.oruc.ramadan]]: you get one reminder in the month of Sha'ban.",
          ],
          sahne: "kaza-oruc",
        },
      ],
    },
    {
      tur: "bolum", id: "gecmis", baslik: "History and corrections",
      giris: "Every mark is saved with its date and time. A wrong entry does not spoil the numbers; it is easy to fix.",
      adimlar: [
        {
          baslik: "See and correct every entry in the history",
          metin: [
            "Tap the **Last entry** line on the main screen and [[tx:kaza.hist.title]] opens. Entries are listed day by day with their times. Tap one to edit or delete it.",
            "Change the numbers you entered at the start with [[ol:kaza.hist.correct]]; the prayers you have already made up stay. If something went wrong, [[tx:kaza.hist.restore]] takes you back to one of the last 30 states. You can also change your pace here.",
          ],
          sahne: "kaza-gecmis",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "What it looks like in the app",
      giris: "These screenshots come from the app itself.",
      kareler: [
        { img: "n-kaza", alt: "Make-up prayers: Prayer tab, Completed 1,381 prayers, the row of beads by year and what is left for each prayer time", cap: "Make-up prayers: completed, left and the beads by year" },
        { img: "n-namazlarim", alt: "My Prayers: the I prayed its make-up too button under marked prayers, and the Make-up prayers and fasts row below", cap: "My Prayers: **I prayed its make-up too** and the make-up row" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Who can see my make-up records?",
        c: "Only you. The make-up page is entirely private: your records stay on this phone and are kept separate from your circles. To hide the numbers on screen as well, tap the eye button at the top right." },
      { s: "Does the calculation helper tell me exactly how many prayers I owe?",
        c: "No, it only gives an estimate. It turns the years and months you enter into days and rounds up. You can change the result as you like. You can ask a scholar about your own situation." },
      { s: "Do make-up prayers have to be prayed in order?",
        c: "Scholars have answered this question, and the answer depends on your situation. For guidance that fits you, ask a scholar you trust. The app does not impose an order; you mark the prayer times in any order you like." },
      { s: "What happens if I change phones?",
        c: "Your records are kept on this phone. On the new phone you set up the make-up page again and enter the numbers you have left. You can always correct them later with [[ol:kaza.hist.correct]]." },
      { s: "Are kaffarah and fidyah counted too?",
        c: "No, the fasting tab counts make-up fasts only. For the difference between make-up, kaffarah and fidyah, see the [[tx:kaza.oruc.info]] note at the bottom of the fasting tab." },
      { s: "Is it free?",
        c: "Yes. Make-up prayers and fasts is free." },
    ],
  },

  ilgili: ["teheccud", "bahce", "oruc"],
  kart: { kicker: "Make-up", baslik: "Qada prayer tracker", metin: "Enter your number once and mark prayers off one by one. Only you see your records." },
  onizleme: { sahne: "kaza-kart", adim: 5 },
  cta: { baslik: "Set up your make-up page today", metin: "Download Manevi Halka for free, open the make-up page from My Prayers and enter your numbers." },
};
