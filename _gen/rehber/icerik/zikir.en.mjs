// P3 · Group dhikr and salawat goal (EN). Source: zikir.tr.mjs.
// Button names come from the app through [[key]]; no em dash, no Jawshan.
export default {
  title: "Group dhikr and salawat goal with one shared counter",
  desc: "Set a salawat or dhikr goal with your circle and count together on one shared counter. Also works for reading Yasin or Ikhlas a set number of times.",
  h1: "How to set a group dhikr or salawat goal",
  crumb: "Group dhikr and salawat",
  eyebrow: "Step-by-step guide",
  lead: "You set up a dhikr goal in your circle, for example 1,000 salawat a day. Everyone recites in their own place, at their own time, and adds their count in the app. The app only adds up the counts; the circle's total shows on everyone's screen.",
  meta: ["Set up in about 2 minutes", "No email or password", "Free"],
  film: { sahne: "film-zikir", cap: "From the circle screen to the shared counter: Dhikr, Shared Pool, Salawat, start." },

  kisa: {
    maddeler: [
      "Open your circle, tap the **+** button at the bottom right and choose the [[tx:wizard.goalZikir]] card.",
      "On the [[tx:wizard.zikirModeQuestion]] screen, choose [[tx:wizard.zikirOption2]]: the circle gets one single counter.",
      "Under [[tx:wizard.zikirPresetSection]], tap the [[tx:wizard.zikirPresetSalavat]] row, type the target number and tap [[wizard.zikirAdd]].",
      "Give the task a name and tap [[wizard.startCollectiveGoal]].",
      "Everyone taps the card on the task screen to count, or adds what they recited on their prayer beads with [[zikir.bulkAdd]]. The count is saved automatically.",
      "For one large total spread over several days, create a [[tx:event.createMenuTitle]], mark the dhikr as [[tx:event.modeCollective]] and start the circle.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "The circle's admin", baslik: "Set up the dhikr goal",
      giris: "A dhikr goal is set up inside a circle. If you do not have a circle yet, create one and invite the others with the first steps of the guide [Setting up a group khatam](/guides/group-khatam/).",
      adimlar: [
        {
          baslik: "Tap + on the circle screen and choose Dhikr",
          metin: [
            "Open the [[tabs.circles]] tab from the bar at the bottom and open your circle. In the [[tx:group.readingsTab]] tab, tap the round **+** button at the bottom right.",
            "The [[tx:wizard.goalTypeQuestion]] screen opens. Tap the [[tx:wizard.goalZikir]] card under [[tx:practice.sectionReadings]].",
          ],
          ipucu: "In a circle you have just created, the [[group.welcome.step2Btn]] button on the [[tx:group.welcome.title]] card opens the same screen. The **+** button is visible to the circle's admin and moderators.",
          sahne: "zikir-gorev-ac",
        },
        {
          baslik: "Choose Shared Pool",
          metin: "The app asks how the count should be kept. There are three options:",
          liste: [
            "[[tx:wizard.zikirOption1]]: everyone gets the same list, and everyone keeps their own count.",
            "[[tx:wizard.zikirOption2]]: the circle has one single counter. What everyone recites is added to the same total.",
            "[[tx:wizard.zikirOption3]]: your list and your counts stay with you only.",
          ],
          fark: "For a group salawat, tap the [[tx:wizard.zikirOption2]] card, then tap [[wizard.continue]]. Nobody has to report their count separately, and nobody has to add up the total by hand.",
          sahne: "zikir-havuz",
        },
        {
          baslik: "Choose the dhikr and the target number",
          metin: [
            "In the [[tx:wizard.zikirPresetSection]] section, tap the [[tx:wizard.zikirPresetSalavat]] row. A window opens from the bottom. Tap the number and type the circle's shared target for one day, for example 1000. The counter starts again from zero every midnight. Then tap [[wizard.zikirAdd]].",
            "You can add other dhikr too: [[tx:wizard.zikirPresetIstigfar]], [[tx:wizard.zikirPresetKelime]], [[tx:wizard.zikirEsmaTitle]] or your own with [[tx:wizard.zikirCustomAdd]]. The ones you choose appear at the bottom of the list. Finish the list here: in a shared pool, dhikr cannot be added or removed after the task has started. When you are done, tap [[wizard.continue]].",
          ],
          ipucu: "The same window has a [[tx:wizard.zikirItemTimeLabel]] row; [[tx:wizard.zikirTimeAllDay]] is selected by default, and this choice is separate for each dhikr. If you choose [[tx:wizard.zikirTimeMorning]], that dhikr is shown first until Dhuhr; at other times it is greyed out, but you can still count it.",
          sahne: "zikir-salavat",
        },
        {
          baslik: "Name the task and start it",
          metin: [
            "Type a name in the [[tx:wizard.circleTitle]] box, for example “Friday Salawat”. Tap [[wizard.startCollectiveGoal]].",
            "In the [[tx:common.success]] window, tap [[group.goToTaskScreen]] to open the task screen. The task is added to the circle's list; the others in the circle see it under [[tx:dashboard.myTasks]] on Home.",
          ],
          ipucu: "If you want to follow the circle without counting yourself, you can turn on [[tx:wizard.observerModeTitle]] before you start.",
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
            "On Home, tap the card under [[tx:dashboard.myTasks]]. The task screen shows a card for each dhikr with the circle's count for the day underneath, for example “Shared: 840 / 1000”.",
            "Tap the card and the counter opens. Every tap on the large circle in the middle counts one. The number inside the circle is the circle's total; underneath it says [[tx:zikir.counterGroupTotal]].",
            "There is no save button. What you count is saved automatically, and [[tx:zikir.counterSaved]] appears at the bottom.",
          ],
          fark: "No need to ask “how many are we at?” in the evening: the shared number updates on the others' screens too.",
          ipucu: "If you tapped by mistake, tap the [[ol:zikir.counterUndo]] button at the bottom; the last count is removed.",
          sahne: "zikir-say",
        },
        {
          baslik: "Recited on your prayer beads? Add it in one go",
          metin: [
            "If you recited the dhikr on your prayer beads or from memory, you do not need to tap one by one. Tap the [[zikir.bulkAdd]] button under the counter. A long press on the counter opens the same window.",
            "Tap +10, +33 or +100, or type your own number in the [[tx:zikir.bulkAddPlaceholder]] box and tap [[common.add]]. The bar at the bottom of the task screen shows the day's shared total as a percentage.",
          ],
          ipucu: "The shared counter starts again from zero every day at midnight, in your own time; it is a daily goal. If you want one large total spread over several days, use the one-time circle below.",
          sahne: "zikir-toplu",
        },
      ],
    },
    {
      tur: "bolum", id: "tek-seferlik", rol: "The person creating the circle", baslik: "A one-time goal for an occasion",
      giris: "If you want a large total that runs until a certain date, such as salawat on a blessed night or for someone who passed away, you do not need to create a permanent circle.",
      adimlar: [
        {
          baslik: "Choose Collective counting in a One-Time Circle",
          metin: [
            "In the [[tabs.circles]] tab, tap the **+** button at the top right and choose the [[tx:event.createMenuTitle]] card. Choose [[tx:event.typeZikir]] as the type and tap [[common.continue]].",
            "If you do not see **+** at the top right, your name is not saved in the app yet. Tap the [[ol:circlesTab.anonJoin]] button on the same screen and type your name. Then go back; the **+** button appears.",
            "At the [[tx:event.zikirGoalTitle]] step, tap the [[=Salavât-ı Şerîfe]] chip (the salawat). Type the circle's total target in the [[tx:event.target]] box, for example 10,000. Then tap [[tx:event.modeCollective]].",
            "For a dhikr set to [[tx:event.modeCollective]], the whole circle counts towards one target and the counts add up until the end date. If you choose [[tx:event.modeIndividual]], everyone completes their own target.",
            "In the next steps, choose the end date, give the circle a name and tap [[event.create]]. On the circle screen, share the invite link with [[event.inviteFriends]].",
            "Counting opens when the circle starts. Once the others have joined, tap [[event.startNow]] on the circle screen and tap [[event.startNow]] again in the window that opens. If you like, tick [[tx:event.registrationWindowToggle]] when you set it up; the circle then starts on its own at the time you choose.",
          ],
          fark: "Whoever taps the link you share with the [[event.inviteFriends]] button on the circle screen can add to the count from the page that opens in the browser, even without the app. This works only for dhikr set to [[tx:event.modeCollective]], and only after the circle has started.",
          ipucu: "For details on the date, the invite and the dedication: [One-time circle](/guides/one-time-circle/).",
          sahne: "zikir-tek-toplu",
        },
        {
          baslik: "For reading Yasin or Ikhlas, choose the Du'a / Surah type",
          metin: [
            "At the first step of the One-Time Circle, choose [[tx:event.typeDua]] as the type. The ready list at the [[tx:event.duaGoalTitle]] step includes [[=Yâsîn Sûresi]] (Surah Yasin) and [[=İhlâs Sûresi]] (Surah al-Ikhlas). Type the total number the circle will read in the [[tx:event.target]] box and choose [[tx:event.modeCollective]].",
            "As people read, each adds what they read to the counter; the total shows on everyone's screen. You decide how many times it will be read; for the tradition behind a particular number, ask a scholar where you live.",
          ],
        },
      ],
    },
    {
      tur: "bolum", id: "ameller", rol: "The circle's admin", baslik: "If you want to mark days, not count",
      giris: "For things like reading the same surah or du'a every day, or keeping track of the prayers together, there is a daily mark instead of a counter.",
      adimlar: [
        {
          baslik: "Look at the Shared practices section",
          metin: [
            "When you tap the **+** button on the circle screen, the screen that opens has the [[tx:practice.sectionPractices]] section at the bottom: [[tx:practice.typeReading]] (such as al-Mulk, al-Kahf, Yasin), [[tx:practice.typeDua]] and [[tx:practice.typePrayer]].",
            "No count is kept here: everyone carries on with their own worship and marks what they did that day. The circle's admin sees this section.",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "What it looks like in the app",
      giris: "These screenshots are from the app itself.",
      kareler: [
        { img: "n05b-zikir-gorevim", alt: "Dhikr task screen: shared counts on two dhikr cards and the shared total of 80 percent at the bottom", cap: "Task screen: shared counts and the day's total" },
        { img: "h01-home", alt: "Home screen: the Your Tasks section with circle tasks", cap: "Home: your task cards" },
        { img: "n01-halka", alt: "Circle screen: dhikr, book and Quran tasks in the Readings tab, Shared practices below and the + button at the bottom right", cap: "Circle screen: tasks and the **+** button at the bottom right" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "How do I set a group salawat goal?",
        c: "In your circle, tap the **+** button at the bottom right, choose the [[tx:wizard.goalZikir]] card and pick [[tx:wizard.zikirOption2]]. Tap the [[tx:wizard.zikirPresetSalavat]] row, type the target number, name the task and start it. For a goal that runs until a certain date, create a [[tx:event.createMenuTitle]], mark the dhikr as [[tx:event.modeCollective]] and then start the circle. Creating a circle, setting up a dhikr goal and joining are free. With a free account you can manage one circle of your own at a time; there is no limit on joining other people's circles." },
      { s: "Does everyone count on their own, or on one shared counter?",
        c: "You choose. With [[tx:wizard.zikirOption1]], everyone counts the same list on their own. With [[tx:wizard.zikirOption2]], the circle has one single counter and what everyone recites is added to the same total. In a one-time circle this choice is separate for each dhikr: [[tx:event.modeIndividual]] or [[tx:event.modeCollective]]." },
      { s: "Does the shared counter start again every day?",
        c: "The shared pool in a regular circle is a daily goal: the counter starts again from zero every midnight, in each person's own time. In a one-time circle, the count of a dhikr set to [[tx:event.modeCollective]] adds up from the moment the circle starts until the end date." },
      { s: "Can we read Yasin or al-Ikhlas a set number of times together?",
        c: "Create a [[tx:event.createMenuTitle]], choose [[tx:event.typeDua]] as the type and add [[=Yâsîn Sûresi]] (Yasin) or [[=İhlâs Sûresi]] (al-Ikhlas) from the ready list. Type the total number in the target box and choose [[tx:event.modeCollective]]. You decide how many times it will be read; for the tradition behind a particular number, ask a scholar where you live." },
      { s: "How do I add what I have recited?",
        c: "On the task screen, tap the dhikr's card; every tap on the counter counts one. If you recited on your prayer beads, you can add a number such as +33 or +100 in one go with [[zikir.bulkAdd]]. There is no save button; the count is saved automatically." },
      { s: "Can people without the app add to the count?",
        c: "In a one-time circle, yes: once the circle has started, whoever taps the link shared with [[event.inviteFriends]] on the circle screen can add to dhikr set to [[tx:event.modeCollective]] from the page that opens in the browser. For dhikr set to [[tx:event.modeIndividual]], you need the app. Joining a dhikr goal in a regular circle also needs the app." },
      { s: "Do we have to gather and recite aloud together?",
        c: "No. Everyone recites in their own place, at their own time. The app only adds up the counts and shows the circle's total." },
    ],
  },

  ilgili: ["hatim", "tek", "katil"],
  kart: { kicker: "Dhikr", baslik: "Group dhikr and salawat", metin: "Count together on one counter: salawat, dhikr, Yasin and Ikhlas goals." },
  onizleme: { sahne: "zikir-say", adim: 6 },
};
