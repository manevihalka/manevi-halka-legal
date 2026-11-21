// Fasting task in a circle (EN), 2.1.0 (21 Nov 2026). Source: oruc.tr.mjs.
// Button names come from the app through [[key]]; no em dash. No fiqh rulings.
export default {
  title: "Group fasting: track Ramadan fasts together in a circle",
  desc: "Set up a fasting task in your circle: Ramadan, Mondays and Thursdays, or days you choose. Everyone marks their own fast at iftar; you choose who sees what.",
  h1: "Fasting together: how to set up a group fasting task",
  crumb: "Fasting task in a circle",
  eyebrow: "Step-by-step guide",
  lead: "You set up a fasting task in your circle: the Ramadan fast, Mondays and Thursdays, or days you choose yourself. Everyone keeps their own fast and marks it at iftar, and the circle walks together. No one is added automatically: each person reads what will be visible and agrees.",
  meta: ["Set up in about 1 minute", "No one joins automatically", "Free to join"],
  film: { sahne: "film-oruc", cap: "Set up the task, choose the Ramadan fast, mark it at iftar." },

  kisa: {
    maddeler: [
      "On the circle screen, tap [[group.addTask]] and choose the [[tx:compose.typeFasting]] card under [[tx:compose.sectionPractice]].",
      "In the [[tx:fasting.rowKind]] row, choose [[tx:fasting.kindRamadan]], [[tx:fasting.kindMonThu]] or [[tx:fasting.kindCustom]].",
      "In the [[tx:compose.rowVisibility]] row, decide who sees what, then tap [[compose.startTask]].",
      "The task appears in everyone's list. Anyone who wants to take part taps [[fasting.joinCta]], reads what will be visible and agrees.",
      "On a fasting day, once iftar comes, you tap [[fasting.markDone]]; the screen says [[tx:fasting.accepted]].",
      "Those who join get a reminder the evening before. No one asks why a day stays empty.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "The person who runs the circle", baslik: "Set up the fasting task",
      giris: "A fasting task is a shared practice: everyone keeps their own fast, and the app only collects the marks. The circle's admin sets the task up. If you do not have a circle yet, first create one [as in the khatam guide](/guides/group-khatam/) and invite your family and friends.",
      adimlar: [
        {
          baslik: "Add a task and choose Fasting",
          metin: "On the circle screen, tap the [[group.addTask]] button at the bottom right. On the [[tx:compose.pickTitle]] screen, scroll down and tap the [[tx:compose.typeFasting]] card under [[tx:compose.sectionPractice]].",
          ipucu: "As Ramadan gets closer, about four months ahead, a [[tx:compose.tplRamadanFast]] card also appears at the start of the [[tx:compose.quickStart]] row. Tap it and the Ramadan fast is already selected.",
          sahne: "oruc-ac",
        },
        {
          baslik: "Choose which fast you will keep",
          metin: "Tap the [[tx:fasting.rowKind]] row. There are three options:",
          liste: [
            "[[tx:fasting.kindRamadan]]: every day from the 1st of Ramadan to the day before Eid. The start is set to the 1st of Ramadan on its own; if Ramadan has already begun, the task starts today.",
            "[[tx:fasting.kindMonThu]]: two days every week. It starts tomorrow and runs until you end it; you can pick dates in the [[tx:compose.rowStart]] and [[tx:fasting.rowEnd]] rows.",
            "[[tx:fasting.kindCustom]]: you choose the days of the week, the start and the end.",
          ],
          fark: "The preview at the top shows your choice straight away: how many days in Ramadan, or how many days a week for a weekly fast.",
          ipucu: "Eid days are skipped automatically.",
          sahne: "oruc-tur",
        },
        {
          baslik: "Choose who sees what",
          metin: "Tap the [[tx:compose.rowVisibility]] row:",
          liste: [
            "[[tx:practice.visibilityMutual]]: everyone who joins sees the days the others marked. For close family and friends.",
            "[[tx:practice.visibilityAdmin]]: only the circle's admin sees the marks; those who join do not see each other.",
            "[[tx:fasting.visibilityTotal]]: no one sees who fasted, not even the admin. The circle only sees the total number of days.",
          ],
          ipucu: "[[tx:fasting.rowDuaTurn]] is on by default: on each fasting day a name from the circle comes up, and you remember that person in your prayer at iftar. If you choose [[tx:practice.visibilityAdmin]], you can also turn on [[tx:wizard.observerModeTitle]]: you get no task and look after the circle.",
          sahne: "oruc-gorunurluk",
        },
        {
          baslik: "Start the task",
          metin: "The task name is filled in from your choice, for example “Ramadan fast”; you can change it. Tap [[compose.startTask]]. The task is added under [[tx:practice.sectionPractices]] on the circle screen and appears in everyone's list.",
          fark: "No one joins automatically: each member reads what will be visible and agrees when joining.",
          sahne: "oruc-baslat",
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Everyone in the circle", baslik: "Join and mark your fast",
      giris: "On fasting days the task appears under [[tx:dashboard.myTasks]] in the [[tx:tabs.home]] tab; it also stays under [[tx:practice.sectionPractices]] on the circle screen. Everyone marks their own fast.",
      adimlar: [
        {
          baslik: "Join the fast",
          metin: "Tap the fasting card; the [[tx:fasting.joinCardTitle]] card appears. Tap [[fasting.joinCta]] and a window tells you who sees what in this task. [[tx:fasting.reminderRow]] is on: you get a reminder at 21:00 the evening before a fast, and you can change the time later. Then tap [[fasting.join]].",
          ipucu: "If you do not want to take part, remove the card from your list with [[ol:practice.dismissAction]]. After joining you can leave at any time with [[ol:practice.leaveAction]]; your marks are deleted when you do.",
          sahne: "oruc-katil",
        },
        {
          baslik: "Tap I fasted at iftar",
          metin: "During the day the screen shows the time left until iftar; the [[fasting.markDone]] button opens at iftar. When iftar comes, the iftar dua appears on the screen. Tap [[fasting.markDone]]; the screen says [[tx:fasting.accepted]] and the day's bead fills. If you tapped by mistake, tap [[ol:fasting.undo]].",
          ipucu: "The iftar time is worked out from the city chosen in the app. If no city is chosen, the button stays open all day.",
          sahne: "oruc-isaretle",
        },
        {
          baslik: "Mark a day you forgot, and see who walks with you",
          metin: [
            "The [[tx:fasting.duaLabel]] card shows the name of the person to remember in your prayer that evening. Below it is [[tx:fasting.myDays]]: tap a day you forgot to mark it afterwards.",
            "In a task set to [[tx:practice.visibilityMutual]], the [[tx:fasting.together]] list shows which days each person marked. With the [[fasting.accepted]] button next to someone, you send them [[tx:fasting.accepted]].",
          ],
          fark: "No one asks why a day stays empty, and no notification is sent to anyone.",
          sahne: "oruc-birlikte",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Which fasts can a circle set up a task for?",
        c: "There are three kinds: the Ramadan fast (every day from the 1st of Ramadan to the day before Eid), the Monday and Thursday fast, or a fast on days you choose. Eid days are skipped automatically." },
      { s: "Who sees which days?",
        c: "The person who sets up the task decides. With [[tx:practice.visibilityMutual]], everyone who joins sees each other's days; with [[tx:practice.visibilityAdmin]], only the circle's admin sees them; with [[tx:fasting.visibilityTotal]], no one sees who fasted and the circle only sees the total number of days. If fewer than 4 people have started, the total is hidden too. Every member reads this before joining." },
      { s: "What happens on a day I could not fast?",
        c: "The day stays empty. No one asks why, and no notification is sent to anyone. If you want to keep track of make-up fasts separately, use the [[tx:kaza.titleO]] entry at the bottom of the fasting screen; that counter is yours alone: [Make-up prayers and fasts](/guides/make-up-prayers-and-fasts/)." },
      { s: "Will I get a reminder?",
        c: "It is on when you join: at 21:00 the evening before a fast. You can change the time or turn it off on the fasting screen. For the Ramadan fast, the reminder only comes on the first night." },
      { s: "Is it free?",
        c: "Joining a fasting task is free. A Ramadan fasting task does not count towards the free plan's limit. A task for Mondays and Thursdays, or for days you choose, counts as one of the three shared practices you can have open at the same time on the free plan." },
      { s: "Does the app tell me whether my fast is valid?",
        c: "No. The app only keeps the days you mark and gives no religious rulings. For questions about fasting, ask a scholar you trust." },
    ],
  },

  ilgili: ["hatim", "kaza", "tek"],
  kart: { kicker: "Fasting", baslik: "Fasting task in a circle", metin: "Ramadan or Mondays and Thursdays: everyone marks their own fast at iftar, and the circle walks together." },
  onizleme: { sahne: "oruc-kart", adim: 0 },
  cta: { baslik: "Create your circle today", metin: "Creating and joining a circle is free. Download the app, create your circle and start a fasting task." },
};
