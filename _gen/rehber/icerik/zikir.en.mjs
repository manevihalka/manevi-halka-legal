// P3 · Group dhikr and salawat goal (EN). Source: zikir.tr.mjs (21 Nov 2026, app 2.1.0).
// Button names come from the app through [[key]]; no em dash, no Jawshan.
export default {
  title: "How to set up a group dhikr and salawat goal",
  desc: "Set a shared salawat or dhikr goal with your circle and count together on one counter. Setup, counter, Curtain and one-time goals, step by step.",
  h1: "How to set up a group dhikr or salawat goal",
  crumb: "Group dhikr and salawat",
  eyebrow: "Step-by-step guide",
  lead: "You set up a dhikr goal in your circle, for example 1,000 salawat a day. Everyone recites in their own place, at their own time, and adds their count in the app. The app only adds up the counts; the circle's total shows on everyone's screen.",
  meta: ["Set up in about 2 minutes", "No email or password", "Free"],
  film: { sahne: "film-zikir", cap: "From the circle screen to the shared counter: [[group.addTask]], [[tx:compose.typeZikir]], [[tx:wizard.zikirOption2]], Salawat, start." },

  kisa: {
    maddeler: [
      "Open your circle, tap the [[group.addTask]] button at the bottom right and choose the [[tx:compose.typeZikir]] card.",
      "Tap the [[tx:compose.zikirHow]] row and choose [[tx:wizard.zikirOption2]]: the circle gets one single counter.",
      "Add [[tx:wizard.zikirPresetSalavat]] with [[tx:compose.zikirPickOther]]. Tap the dhikr and type the daily target, for example 1000.",
      "Check the task name and tap [[compose.startTask]].",
      "Everyone taps the card on the task screen to count, or adds what they recited on their prayer beads with [[zikir.bulkAdd]]. The count is saved automatically.",
      "For one large total spread over several days, choose the [[tx:eventCompose.tplSalavat]] template in a one-time circle and tap [[eventCompose.cta]].",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "The circle's admin", baslik: "Set up the dhikr goal",
      giris: "A dhikr goal is set up inside a circle. If you do not have a circle yet, create one and invite the others with the first steps of the guide [Setting up a group khatam](/guides/group-khatam/).",
      adimlar: [
        {
          baslik: "Tap Add task and choose Dhikr and salawat",
          metin: [
            "Open the [[tabs.circles]] tab from the bar at the bottom and open your circle. In the [[tx:group.tasksTab]] tab, tap the [[group.addTask]] button at the bottom right.",
            "The [[tx:compose.pickTitle]] screen opens. Tap the [[tx:compose.typeZikir]] card in the [[tx:compose.sectionZikir]] section. The dhikr setup screen opens.",
          ],
          ipucu: "The circle's admin and moderators see the [[group.addTask]] button. The [[tx:compose.quickStart]] strip at the top of the same screen also has [[tx:zikirTpl.tesbihat.title]]; tap it and the list comes filled in.",
          sahne: "zikir-gorev-ac",
        },
        {
          baslik: "Choose how to count",
          metin: "The [[tx:compose.zikirHow]] row sits at the top of the setup screen. Tap it and a panel opens from the bottom. There are three options:",
          liste: [
            "[[tx:wizard.zikirOption1]]: everyone gets the same list and keeps their own count.",
            "[[tx:wizard.zikirOption2]]: the circle has one single counter. What everyone recites is added to the same total.",
            "[[tx:wizard.zikirOption3]]: your list and your counts stay with you only.",
          ],
          fark: "For group salawat, choose [[tx:wizard.zikirOption2]] and tap [[common.ok]]. Nobody has to report their count separately, and nobody adds up the total by hand.",
          sahne: "zikir-havuz",
        },
        {
          baslik: "Choose the dhikr and the daily target",
          metin: [
            "Below the row you find [[tx:wizard.zikirPresetSection]]. Tap a list such as [[tx:zikirTpl.tesbihat.title]] or [[tx:zikirTpl.fatima.title]] and its dhikr come with their numbers.",
            "For salawat only, tap [[tx:compose.zikirPickOther]]. In the [[tx:compose.zikirSingles]] list, tap the [[tx:wizard.zikirPresetSalavat]] row and tap [[common.ok]]. [[tx:wizard.zikirEsmaTitle]] and [[tx:wizard.zikirCustomAdd]] are on the same page.",
            "Now tap the dhikr in your list. In the panel that opens, type the circle's shared target for one day or tap one of the 33, 100, 500, 1000 buttons, then tap [[common.ok]]. The counter starts over every midnight.",
          ],
          ipucu: "The same panel has a [[tx:wizard.zikirItemTimeLabel]] row; [[tx:wizard.zikirTimeAllDay]] is selected by default. If you choose [[tx:wizard.zikirTimeMorning]], that dhikr is highlighted until midday; at the other time it is dimmed but can still be counted. Complete the list before you start: in a shared pool, dhikr cannot be added or removed once the task has started.",
          sahne: "zikir-salavat",
        },
        {
          baslik: "Name the task and start it",
          metin: [
            "The [[tx:compose.nameLabel]] field fills in by itself from your choices. Change it if you like, for example to “Family Salawat”. Everyone in the circle sees the task under this name.",
            "Tap [[compose.startTask]] at the bottom. In the [[tx:common.success]] window, tap [[group.goToTaskScreen]] to open the task screen. The task is added to the circle's list; members see it on the Home screen under [[tx:dashboard.myTasks]].",
          ],
          ipucu: "If you only want to follow the circle without counting yourself, open the [[tx:compose.more]] card and turn on [[tx:wizard.observerModeTitle]].",
          sahne: "zikir-baslat",
        },
      ],
    },
    {
      tur: "bolum", id: "say", rol: "Everyone in the circle", baslik: "Recite your dhikr and add it",
      giris: "Everyone recites in their own place, at their own time. Nobody needs to gather to recite aloud together; the app only adds up the counts. If you have not joined the circle yet, tap the invite link first: [Joining a circle from an invite](/guides/join-a-circle/).",
      adimlar: [
        {
          baslik: "Open the task and tap the counter",
          metin: [
            "On the Home screen, tap the card under [[tx:dashboard.myTasks]]. The task screen shows a card for each dhikr with the circle's count for the day below it, for example “Shared: 840 / 1000”.",
            "Tap the card and the counter opens. Each tap on the big circle in the middle counts one. The number inside the circle is the circle's total; [[tx:zikir.counterGroupTotal]] is written under it.",
            "There is no Save button. What you count is saved automatically and [[tx:zikir.counterSaved]] appears at the bottom.",
          ],
          fark: "No need to ask “how many are we at?” in the evening: the shared number also updates on the other members' screens.",
          ipucu: "The [[event.count]] button on the task card in the circle screen also opens the counter directly. If you tapped by mistake, tap [[ol:zikir.counterUndo]] at the bottom; the last count is removed.",
          sahne: "zikir-say",
        },
        {
          baslik: "Recited on your prayer beads? Add it in one go",
          metin: [
            "If you recited on prayer beads or from memory, you do not need to tap one by one. Tap [[zikir.bulkAdd]] below the counter. A long press on the counter opens the same window.",
            "Tap +10, +33 or +100, or type your own number in the [[tx:zikir.bulkAddPlaceholder]] field and tap [[common.add]]. The bar at the bottom of the task screen shows the day's shared total as a percentage.",
          ],
          ipucu: "The shared counter starts over every day at midnight, by your own clock; it is a daily goal. If you want one large total spread over several days, use the one-time circle below.",
          sahne: "zikir-toplu",
        },
        {
          baslik: "Count without looking: Curtain and prayer bead view",
          metin: [
            "Tap [[ol:perde.title]] below the counter and the screen goes dark. You count by tapping anywhere on the screen; the number stays faint and the phone vibrates lightly with each tap. Press and hold to leave.",
            "The button at the top right opens [[tx:counter.settingsTitle]]. There you choose the view: [[tx:counter.modeRing]] or [[tx:counter.modeStrand]]. In the prayer bead view you can also count by pulling the beads down with your finger.",
            "When the target is reached, the number turns gold. If the task has another dhikr, a [[=Next]] button appears at the bottom; tap it to carry on.",
          ],
          ipucu: "Tap the bell in the task screen's header to set yourself a reminder. It comes to this phone only, and not on a day you have already joined the circle's shared dhikr.",
          sahne: "zikir-perde",
        },
      ],
    },
    {
      tur: "bolum", id: "tek-seferlik", rol: "The person creating the circle", baslik: "A one-time goal for an occasion",
      giris: "If you want a large total that runs until a certain date, for someone who is ill or for a good occasion, you do not need to create a permanent circle.",
      adimlar: [
        {
          baslik: "Choose the Salawat template in a one-time circle",
          metin: [
            "In the [[tabs.circles]] tab, tap the **+** button at the top right and choose the [[tx:event.createMenuTitle]] row. On the [[tx:eventCompose.pickTitle]] screen, tap the [[tx:eventCompose.tplSalavat]] card.",
            "The summary screen opens. The target is 1,000 salawat and the count is collective: the whole circle counts toward one target, and the numbers add up until the end. You change the target in the [[tx:compose.rowWhat]] row. Choose the end in the [[tx:eventCompose.rowEnd]] row and tap [[eventCompose.cta]].",
            "On the [[tx:eventCompose.readyTitle]] screen, share the link with [[eventCompose.invite]]. The circle starts right away.",
          ],
          fark: "Someone who taps the link can add to the shared count from the page that opens in the browser, even without the app.",
          ipucu: "For Yasin, Ikhlas or another dhikr, choose the [[tx:eventCompose.tplCustom]] template; for each item you choose [[tx:event.modeCollective]] or [[tx:event.modeIndividual]]. For intention, date and invitation details: [One-time circle](/guides/one-time-circle/).",
          sahne: "zikir-tek-toplu",
        },
      ],
    },
    {
      tur: "bolum", id: "kendi", rol: "On your own", baslik: "Every day with your own list",
      giris: "For the dhikr you recite every day on your own, outside any circle, there is the [[tx:read.zikirmatikTitle]]. It opens from the [[tabs.read]] tab.",
      adimlar: [
        {
          baslik: "Build your dhikr list and let the strand grow",
          metin: [
            "On the [[tx:read.zikirmatikTitle]] screen, tap the [[tx:zikirList.listsRow]] row. Build your own list or add one of the ready-made lists to yours.",
            "If you turn on [[tx:zikirDaily.toggleTitle]] in the list, it starts from zero every day. Each day you finish the list, a bead is strung on the strand at the top; the title tells you for how many days you have kept it. The day turns over when the time of the dawn prayer comes in.",
            "If you miss a day, the strand keeps a gap; earlier beads are not removed. Pick a time in the [[tx:zikirList.reminder.title]] row and a reminder comes to your phone at that time; not on a day you have already finished the list.",
          ],
          ipucu: "To spread a large intention count over several days, look at [[tx:niyet.title]] inside the [[tx:read.zikirmatikTitle]]. Its [[ol:niyet.openCircle]] button opens your intention as a one-time circle, so your loved ones can add to it.",
          sahne: "zikir-ip",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "What it looks like in the app",
      giris: "These screenshots are from the app itself.",
      kareler: [
        { img: "n05b-zikir-gorevim", alt: "Dhikr task screen: shared counts on two dhikr cards and the shared total at 80 percent at the bottom", cap: "Task screen: shared counts and the day's total" },
        { img: "ev-sablon", alt: "One-time circle: the What shall we read together? screen with the Khatm, 41 Yasin, Salawat and My own list cards", cap: "One-time circle: the [[tx:eventCompose.tplSalavat]] template" },
        { img: "z-liste", alt: "Dhikr list: the prayer bead strand card at the top, the daily switch, the reminder row and three dhikr", cap: "Your own list: the strand and a reminder" },
        { img: "z-sayac", alt: "Counter in the prayer bead view: the dhikr in Arabic, flowing beads and 73 / 100 on the left", cap: "The counter in prayer bead view" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "How do I set up a group salawat goal?",
        c: "In your circle, tap [[group.addTask]] and choose the [[tx:compose.typeZikir]] card. In the [[tx:compose.zikirHow]] row choose [[tx:wizard.zikirOption2]], add [[tx:wizard.zikirPresetSalavat]], type the daily target and tap [[compose.startTask]]. For a goal that runs until a certain date, choose the [[tx:eventCompose.tplSalavat]] template in a one-time circle. Creating a circle, setting a dhikr goal and joining are free. With a free account you can run one circle you created at a time; there is no limit on joining other people's circles." },
      { s: "Does everyone count on their own, or is there one counter?",
        c: "You decide. With [[tx:wizard.zikirOption1]] in the [[tx:compose.zikirHow]] row, everyone counts the same list on their own. With [[tx:wizard.zikirOption2]], the circle has one single counter and what everyone recites is added to the same total. In a one-time circle this choice is made for each dhikr: [[tx:event.modeIndividual]] or [[tx:event.modeCollective]]." },
      { s: "Does the shared counter reset every day?",
        c: "In a regular circle the shared pool is a daily goal: the counter starts over every midnight, by each person's own clock. In a one-time circle, the count of a collective dhikr keeps adding up from the start of the circle until its end date." },
      { s: "How do we read Yasin or Ikhlas together?",
        c: "Create a one-time circle. For Yasin there is a ready-made [[tx:eventCompose.tplYasin41]] template. For another surah or number, choose the [[tx:eventCompose.tplCustom]] template, add the surah, type the target number and choose [[tx:event.modeCollective]]. You decide how many times it is read; for the tradition behind a number, ask a scholar where you live." },
      { s: "Can someone without the app contribute?",
        c: "In a one-time circle, yes: once the circle has started, someone who taps the link you shared can add to the [[tx:event.modeCollective]] dhikr from the page that opens in the browser. [[tx:event.modeIndividual]] dhikr need the app. Joining the dhikr goal of a regular circle also needs the app." },
      { s: "Does group dhikr mean reciting aloud together in one place?",
        c: "No. Everyone recites in their own place, at their own time. The app only adds up the counts and shows the circle's total." },
    ],
  },

  ilgili: ["tek", "katil", "hatim"],
  kart: { kicker: "Dhikr", baslik: "Group dhikr and salawat", metin: "Count together on one counter: the circle's total on every screen. Salawat, tasbih or your own list." },
  onizleme: { sahne: "zikir-kart", adim: 16 },
};
