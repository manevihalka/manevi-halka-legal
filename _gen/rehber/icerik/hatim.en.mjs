// P1 · Setting up a group khatam and sharing the juz (EN), 2.1.0 screens (21 Nov 2026). Source: hatim.tr.mjs.
// Button names come from the app through [[key]]; no em dash, no Jawshan.
export default {
  title: "How to set up a group Quran khatam and share the juz",
  desc: "Start a khatam group with family or your mosque. The juz are shared out in order, you see who reads what first, and new rounds begin on their own.",
  h1: "How to set up a group khatam (khatm) and share the juz",
  crumb: "Group khatam",
  eyebrow: "Step-by-step guide",
  lead: "First you create a circle, a group for your family or your mosque. Then you start a Quran khatam in that circle. The app decides who reads which juz, and you see it before you start. When the week is over, the next juz arrive on their own.",
  meta: ["Set up in about 2 minutes", "No email or password", "Free"],
  film: { sahne: "film-hatim", cap: "The whole flow in one go: create the circle, choose the Quran khatam, start." },

  kisa: {
    maddeler: [
      "In the app, open the [[tabs.circles]] tab and tap [[circlesTab.anonCreate]]. Type your name and the circle's name, then tap [[createGroup.create]].",
      "Tap [[group.welcome.step1Btn]] and send the link to your family or your WhatsApp group. Anyone who taps the link then taps [[joinGroup.join]] and joins the circle.",
      "Once everyone has joined, tap [[group.addTask]] on the circle screen and choose the [[tx:compose.typeHatim]] card.",
      "A new round every week and 1 juz per person are already set. The preview at the top shows how long the khatam will take and who reads what in the first round.",
      "If you like, change the order with [[ol:dist.openCreate]], then tap [[compose.startTask]].",
      "Everyone reads their own juz and marks it as read. When the week is over, the next juz are handed out on their own.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "halka", rol: "The person creating the circle", baslik: "Create your circle",
      giris: "A circle is the group you worship with: your family, your friends or the people at your mosque. The khatam is set up inside this circle.",
      adimlar: [
        {
          baslik: "Start a new circle from the Circles tab",
          metin: [
            "Open the app and tap the [[tabs.circles]] tab in the bar at the bottom. Tap the [[circlesTab.anonCreate]] button on the screen.",
            "If this is your first circle, the app only asks for your name. The others in the circle will see you by this name. No email, password or phone number is needed.",
          ],
          ipucu: "If you do not see this button, because you have already joined or created a circle, tap the **+** button at the top right and choose [[tx:dashboard.createNew]] in the window that opens. With a free account you can manage one circle of your own at a time.",
          sahne: "halka-kur",
        },
        {
          baslik: "Give your circle a name",
          metin: [
            "Type a name in the [[tx:createGroup.groupName]] box, for example “My Family” or “Friday Circle”. The description is optional. Then tap [[createGroup.create]].",
            "If you have not linked your account yet, the [[tx:secureNudge.title]] window appears once with your first circle. If you link it with Apple, Google or email, your circle stays with you even if you change phones. You can also tap [[ol:secureNudge.later]] and carry on.",
            "The circle screen opens: the member strip at the top, and the [[tx:group.welcome.title]] card below it.",
          ],
          ipucu: "[[tx:createGroup.detailedTrackingTitle]] can only be chosen when you create the circle. If you turn it on, you as the admin see each member's daily progress. The members do not.",
          sahne: "halka-form",
        },
        {
          baslik: "Invite your brothers and sisters",
          metin: "On the [[tx:group.welcome.title]] card, tap [[group.welcome.step1Btn]] and send the link to your WhatsApp group, your family or anyone you like. When someone taps the link, the circle's invite card opens on their phone; they tap [[joinGroup.join]] and they are in. If the link opens in the browser instead of the app, they tap the **Open App** button on that page.",
          fark: "Keep your WhatsApp group. Share the link there and let the app keep track of who reads which juz.",
          ipucu: "Invite people first, then start the khatam. The juz are handed out to whoever is in the circle at the moment you start the task; anyone who joins later gets a place in the next round.",
          sahne: "davet-paylas",
        },
        {
          baslik: "Or invite with a code or a QR code",
          metin: [
            "In the member strip under the circle's name, tap [[group.inviteShort]] and the [[tx:group.inviteToCircle]] window opens: a six-character short code, the invite link and a QR code. You can read the code out over the phone, or show the QR code on a screen at the mosque.",
            "Someone without the app taps the link and downloads the app from the page that opens. Then they tap [[ol:circlesTab.anonJoin]] in the [[tabs.circles]] tab, paste the invite link or the code, and join. More details: [Joining a circle from an invite](/guides/join-a-circle/).",
          ],
          sahne: "davet-penceresi",
        },
      ],
    },
    {
      tur: "bolum", id: "hatim", rol: "The person creating the circle", baslik: "Start the khatam",
      giris: "A khatam is a task inside the circle. A khatam, a dhikr and a book reading can all run in the same circle. The task is set up on one screen: a live preview at the top, and rows you can change below it.",
      adimlar: [
        {
          baslik: "Add a task and choose the Quran khatam",
          metin: "On the circle screen, tap the [[group.addTask]] button at the bottom right. The [[group.welcome.step2Btn]] button on the [[tx:group.welcome.title]] card opens the same screen. On the [[tx:compose.pickTitle]] screen, tap the [[tx:compose.typeHatim]] card.",
          ipucu: "The [[tx:compose.tplWeeklyHatim]] card in the [[tx:compose.quickStart]] row opens with the same settings.",
          sahne: "hatim-sec",
        },
        {
          baslik: "Check the preview and change a row if you need to",
          metin: [
            "The card at the top shows the task before it starts: a new round every week, 1 juz per person. In a circle of five, the khatam takes about 6 weeks. The filled beads in the ring are the juz read in the first round, and the gold bead is your share. Below it you see who reads which juz in the first round.",
            "Tap a row and a sheet opens; your choice shows up in the preview straight away:",
          ],
          liste: [
            "[[tx:compose.rowCadence]]: every day, every week or another interval, for example every 3 days.",
            "[[tx:compose.rowPer]]: juz by juz or page by page, and how much each round. With 2 juz per person, the khatam takes 3 weeks.",
            "[[tx:compose.rowWho]]: everyone in the circle, the people you pick, or whoever in the circle wants to join.",
          ],
          fark: "You do not have to work out how long the khatam will take; the preview rewrites it with every change.",
          ipucu: "The lock on the [[tx:compose.rowWhat]] and [[tx:compose.rowHow]] rows means these two cannot change once the task has started. Instead of a full khatam you can also choose certain juz.",
          sahne: "hatim-onizleme",
        },
        {
          baslik: "Check the distribution if you like",
          metin: "Tap the [[ol:dist.openCreate]] button in the preview. Here you change the order, not the ranges: tap two people one after the other and they swap places, and the juz are recalculated without gaps. To give a slower reader less and a keen reader more, use the minus and plus next to each person. When you are done, tap [[dist.confirm]]; the card then says [[tx:dist.confirmed]].",
          ipucu: "[[tx:dist.rotateLabel]] is off by default: the next round carries on from where this one stops. If you turn it on, everyone moves on to the next part each time a khatam is completed. Only you see the shares; everyone sees their own part.",
          sahne: "hatim-dagitim",
        },
        {
          baslik: "Name the task and start it",
          metin: "The [[tx:compose.nameLabel]] is filled in from your choices, for example “Weekly Khatm”. You can type your own, like “Family Khatm”. Then tap [[compose.startTask]]. The [[tx:group.circleStartedTitle]] window appears and everyone's juz lands on their own screen at that moment; [[group.goToTaskScreen]] takes you to the task screen.",
          fark: "You do not work out who reads which juz; the app shares them out in the circle's order.",
          ipucu: "Under [[tx:compose.more]] you find the start day, [[tx:wizard.observerModeTitle]] (you get no share and look after the circle) and [[tx:wizard.autoAdvanceTitle]]. Automatic rounds are on by default: when a round's time is up, the new round starts on its own. Rounds renew at midnight in your time zone.",
          sahne: "hatim-baslat",
        },
      ],
    },
    {
      tur: "halka",
      baslik: "How the rounds move on",
      metin: [
        "When a round ends, the next juz are handed out on their own and the khatam carries on from where it stopped. In a circle of five, juz 1–5 are read in the first week and juz 6–10 in the second. At the end of the sixth week the khatam is complete, and the circle carries on with a new khatam in the same way.",
        "A juz that was not read does not disappear: in the next round it stays with the same person, **carried over**. You do not have to write a new list every week.",
      ],
    },
    {
      tur: "bolum", id: "sonraki-tur", rol: "The person creating the circle", baslik: "Set up the next round",
      giris: "You can still change the order and the shares after the khatam has started. Changes apply from the next round; the shares of the current round stay as they are.",
      adimlar: [
        {
          baslik: "Change it from the Circle tab of the task screen",
          metin: "On the task screen, switch to the [[tx:flow.tabCircle]] tab. At the top you see the [[tx:flow.observerInfoNextRoundLabel]] card, which only you see: when the next round starts and who reads what. Tap [[nextRound.open]]. On the screen that opens, change the order, the shares or the [[tx:dist.rotateLabel]] switch, then tap [[taskSettings.save]].",
          ipucu: "The gear icon in the header opens [[tx:taskSettings.title]]: the same setup screen, this time showing the next round. The frequency, the amount per person and the task's name can be changed there.",
          sahne: "sonraki-tur",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", rol: "Everyone in the circle", baslik: "Read your juz",
      giris: "Everyone who joins the circle reads their own share, in their own place and at their own time.",
      adimlar: [
        {
          baslik: "Tap the notification or the card on Home",
          metin: "When a new round starts, you get a notification on your phone; tap it and your task screen opens. If you opened the app yourself, tap the khatam card under [[tx:dashboard.myTasks]] in the [[tx:tabs.home]] tab: it shows the circle's name, your juz and the days left. At the top of the task screen you see the circle's progress and the time left in the round.",
          ipucu: "If a round starts at night, its notification does not disturb you at night. It arrives in the morning.",
          sahne: "uye-bildirim",
        },
        {
          baslik: "Start Reading, then Mark as read",
          metin: [
            "Tap [[quran.startReading]]. The Quran opens at the first page of your share, and the thin line at the top shows how much you have read. On the last page, the [[hatim.markRead]] button appears at the bottom. Tap it, then tap [[hatim.markRead]] once more in the window that opens. Your share is complete and you are back on the task screen.",
            "The task card turns into the [[tx:taskDone.title]] card. There you can see how many people in the circle have finished.",
          ],
          fark: "No need to find your mushaf: your pages open right in the app.",
          ipucu: "If you read from a printed mushaf, tap the [[flow.complete]] button on the task screen. If you have not marked the parts you read, answer [[common.yes]] to the question that appears.",
          sahne: "uye-oku",
        },
      ],
    },
    {
      tur: "ikili", id: "yetisemezsen", rol: "Everyone in the circle", baslik: "If someone cannot keep up",
      giris: "Not every week goes the same way. Someone who cannot finish their share does not hold up the circle; the others help.",
      kartlar: [
        { baslik: "Ask for help", metin: "Tap the [[ol:flow.askHelp]] button under the task card and choose how many pages you want help with; half is already set. The window shows which pages open to the circle and which stay with you. Tap [[flow.askHelp]] and those pages show up for the others in the [[tx:flow.waitingForHelpTitle]] list.", sahne: "yardim-iste" },
        { baslik: "Help someone", metin: "On the [[tx:flow.tabCircle]] tab of the task screen, you see who is waiting for help. Tap the [[flow.helpTitle]] button and choose how much you will take in the window that opens. The pages you take land on your own screen.", sahne: "yardim-et" },
      ],
      not: "If you have to give up your share completely, you can release it to the pool with the [[ol:flow.excuse]] button; anyone who wants to can take it from there. This step cannot be undone.",
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "What it looks like in the app",
      giris: "These screenshots come from the app itself.",
      kareler: [
        { img: "h-flow", alt: "Task screen: circle progress, days left in the round and the Your task card with Juz 17", cap: "Task screen: your juz" },
        { img: "h-halka-ust", alt: "Circle tab of the task screen: the admin's Next round card and the juz of everyone in the circle", cap: "Circle tab: the next round and who is on which juz" },
        { img: "h-dagitim", alt: "Set up the next round: the order shift switch, who reads what and the shares per person", cap: "Set up the next round" },
        { img: "n-home", alt: "Home: the Family Khatm card with Juz 17 under My Part", cap: "Home: your part" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "How is the Quran split, and who reads which juz?",
        c: "The app shares out the juz in the order of the circle: juz 1 to the first person, juz 2 to the second, and so on. Before you start the task, the preview shows the first round, and you can change the order with [[ol:dist.openCreate]]. In the next round the following juz are handed out in the same order: in a circle of 5, the second round carries on with juz 6–10. While the khatam is running, you change the order with [[nextRound.open]] on the task screen." },
      { s: "What happens when the week is over, or if someone cannot read?",
        c: "If [[tx:wizard.autoAdvanceTitle]] is on (it is on by default), the new round starts on its own at midnight in your time zone and the next juz are handed out; if you turn it off, you start the new round yourself. An unread share is not lost: in the next round it stays with that person, **carried over**. They can also open part of it to the circle with [[flow.askHelp]], or release all of it to the pool with [[flow.excuse]]; the others take it on with [[flow.helpTitle]]." },
      { s: "We already use a WhatsApp group. Do we still need the app?",
        c: "Keep your group. Share the invite link there; the app keeps the list, tracks who has read and sends the reminders. You do not have to write a new list every week. If you still want a list on paper, use the [printable khatam chart](/khatam-chart/)." },
      { s: "Can an older relative without the app take part?",
        c: "In a regular circle, the admin can add someone without the app as a **guest**; a person who looks after them marks their reading. In a one-time khatam set up with [[tx:event.distPool]], people without the app can take a juz in their browser from the invite link: [One-time circle](/guides/one-time-circle/)." },
      { s: "Is it free?",
        c: "Creating a circle, starting a khatam and joining a circle are free. With a free account you can manage one circle of your own at a time; there is no limit on joining other people's circles." },
      { s: "Can a khatam be completed by sharing out the juz?",
        c: "Scholars have answered this question, and views differ. For guidance that fits your situation, ask a scholar you trust." },
    ],
  },

  ilgili: ["tek", "katil", "oruc"],
  kart: { kicker: "Khatam", baslik: "Setting up a group khatam", metin: "Create your circle and share out the 30 juz; see who reads what first, and let the rounds move on." },
  onizleme: { sahne: "hatim-kart", adim: 6 },
  cta: { baslik: "Create your circle today", metin: "Creating and joining a circle is free. Download the app, create your circle and share the invite link." },
};
