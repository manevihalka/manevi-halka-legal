// P1 · Setting up a group khatam and sharing the juz (EN). Source: hatim.tr.mjs.
// Button names come from the app through [[key]]; no em dash, no Jawshan.
export default {
  title: "How to set up a group Quran khatam and share the juz",
  desc: "Start a khatam group with family or your mosque. Everyone gets their juz automatically, reads it in the app, and new rounds start on their own.",
  h1: "How to set up a group khatam (khatm) and share the juz",
  crumb: "Group khatam",
  eyebrow: "Step-by-step guide",
  lead: "First you create a circle, a group for your family or your mosque. Then you start a khatam in that circle. The app decides who reads which juz, and when the week is over, the next juz arrive on their own.",
  meta: ["Set up in about 2 minutes", "No email or password", "Free"],
  film: { sahne: "film-hatim", cap: "The whole flow in one go: create the circle, choose Quran, start." },

  kisa: {
    maddeler: [
      "In the app, open the [[tabs.circles]] tab and tap [[circlesTab.anonCreate]]. Type your name and the circle's name, then tap [[createGroup.create]].",
      "Tap [[group.welcome.step1Btn]] and send the link to your family or your WhatsApp group. Anyone who taps the link then taps [[joinGroup.join]] and joins the circle.",
      "Once everyone has joined, tap [[group.welcome.step2Btn]] and choose the [[tx:wizard.goalQuran]] card.",
      "Juz khatm, a full khatam, one round a week and 1 juz per person are already set. Tap [[wizard.continue]] three times.",
      "Give the task a name, check in the preview who starts with which juz, and tap [[wizard.startCircle]].",
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
          ],
          ipucu: "[[tx:createGroup.detailedTrackingTitle]] can only be chosen when you create the circle. If you turn it on, you as the admin see each member's daily progress. The members do not.",
          sahne: "halka-form",
        },
        {
          baslik: "Invite your brothers and sisters",
          metin: "The circle screen shows the [[tx:group.welcome.title]] card. Tap [[group.welcome.step1Btn]] and send the link to your WhatsApp group, your family or anyone you like. When someone taps the link, the circle's invite card opens on their phone; they tap [[joinGroup.join]] and they are in. If the link opens in the browser instead of the app, they tap the **Open App** button on that page.",
          fark: "Keep your WhatsApp group. Share the link there and let the app keep track of who reads which juz.",
          ipucu: "Invite people first, then start the khatam. The juz are handed out to whoever is in the circle at the moment you start it; anyone who joins later gets a share in the next round.",
          sahne: "davet-paylas",
        },
        {
          baslik: "Or invite with a code or a QR code",
          metin: [
            "At the top right of the circle screen there are three icons. Tap the middle one, the person icon with a plus, and the [[tx:group.inviteToCircle]] window opens: a six-character short code, the invite link and a QR code. You can read the code out over the phone, or show the QR code on a screen at the mosque.",
            "Someone without the app taps the link and downloads the app from the page that opens. Then they tap [[ol:circlesTab.anonJoin]] in the [[tabs.circles]] tab, paste the invite link or the code, and join. More details: [Joining a circle from an invite](/guides/join-a-circle/).",
          ],
          sahne: "davet-penceresi",
        },
      ],
    },
    {
      tur: "bolum", id: "hatim", rol: "The person creating the circle", baslik: "Start the khatam",
      giris: "A khatam is a task inside the circle. The same circle can hold a khatam, a dhikr goal or a book reading side by side.",
      adimlar: [
        {
          baslik: "Create a task and choose Quran",
          metin: "Once the others have joined, tap [[group.welcome.step2Btn]] on the [[tx:group.welcome.title]] card. The round **+** button at the bottom right opens the same screen. On that screen, choose the [[tx:wizard.goalQuran]] card.",
          sahne: "gorev-olustur",
        },
        {
          baslik: "Keep the default settings and tap Continue three times",
          metin: "The settings are already filled in for the most common kind of khatam. If you do not need to change anything, tap [[wizard.continue]] three times:",
          liste: [
            "[[tx:wizard.targetJuz]] and [[tx:wizard.fullHatim]]: the 30 juz are shared out across the circle.",
            "[[tx:wizard.week]]: a new round starts every week. If you like, choose [[tx:wizard.day]] and read every day instead.",
            "1 juz per person: in a circle of 5, 5 juz are read each week and the khatam is finished in about 6 weeks. With 30 people, it is finished in one week.",
          ],
          fark: "The summary at the bottom of the screen works out roughly how long the khatam will take as you change the settings.",
          ipucu: "If you want to run the circle without taking a juz yourself, turn on [[tx:wizard.observerModeTitle]] on the screen where you choose how often rounds happen. That screen says **Step 3 / 5** at the top.",
          sahne: "uc-devam",
        },
        {
          baslik: "Name the task and start it",
          metin: "Type a name in the [[tx:wizard.circleTitle]] box, for example “Family Khatm”. The preview below shows who starts with which juz. Tap [[wizard.startCircle]]. Everyone's juz lands on their own screen straight away.",
          fark: "You don't have to work out who reads what: the app shares the juz out in the order of the circle.",
          ipucu: "[[tx:wizard.autoAdvanceTitle]] is on by default: when a round's time is up, the next round starts on its own. Rounds change at midnight in your time zone, and the screen tells you so with a line such as “Rounds follow London time.”",
          sahne: "gorevi-baslat",
        },
      ],
    },
    {
      tur: "halka",
      baslik: "How the rounds move on",
      metin: [
        "When a round ends, the next juz are handed out on their own and the khatam carries on from where it stopped. In a circle of five, juz 1–5 are read in the first week and juz 6–10 in the second. At the end of the sixth week the khatam is complete, and the circle carries on with a new khatam in the same way.",
        "A juz that was not read does not disappear: in the next round it stays with the same person, marked **Carried over**. You do not have to write a new list every week.",
      ],
    },
    {
      tur: "bolum", id: "oku", rol: "Everyone in the circle", baslik: "Read your juz",
      giris: "Everyone who joins the circle reads their own share, in their own place and at their own time.",
      adimlar: [
        {
          baslik: "Tap the notification or the card on Home",
          metin: "When a new round starts, you get a notification on your phone; tap it and your task screen opens. If you opened the app yourself, tap the khatam card under [[tx:dashboard.myTasks]] in the [[tx:tabs.home]] tab: it shows the circle's name, your juz and the days left.",
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
        { baslik: "Ask for help", metin: "Tap the [[ol:flow.askHelp]] button under the task card. Type how many pages you will read yourself and tap [[flow.askHelp]] in the window. The remaining pages show up for the others in the [[tx:flow.waitingForHelpTitle]] list.", sahne: "yardim-iste" },
        { baslik: "Help someone", metin: "On the [[tx:flow.tabCircle]] tab of the task screen, you see who is waiting for help. Tap the [[flow.helpTitle]] button and choose how much you will take in the window that opens. The pages you take land on your own screen.", sahne: "yardim-et" },
      ],
      not: "If you have to give up your share completely, you can release it to the pool with the [[ol:flow.excuse]] button; anyone who wants to can take it from there. This step cannot be undone.",
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "What it looks like in the app",
      giris: "These screenshots are from the app itself.",
      kareler: [
        { img: "n01-halka", alt: "Circle screen: tasks in the Readings tab and the round + button at the bottom right", cap: "Circle screen: tasks and the **+** button at the bottom right" },
        { img: "n02c-wizard-adim3", alt: "Goal setup screen: How often will rounds be assigned, with 1 Week selected", cap: "Choosing how often rounds happen" },
        { img: "h01-home", alt: "Home screen: circle tasks in the Your Tasks section", cap: "Home: your tasks" },
        { img: "n04-yonet", alt: "Khatam screen, Circle tab: someone waiting for help and which juz each member is on", cap: "Who is on which juz in the khatam" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "How is the Quran split, and who reads which juz?",
        c: "The app shares out the juz in the order of the circle: juz 1 to the first person, juz 2 to the second, and so on. You see this list on the last screen before you start the khatam. In the next round the following juz are handed out in the same order: in a circle of 5, the second round carries on with juz 6–10." },
      { s: "What happens when the week is over?",
        c: "If [[tx:wizard.autoAdvanceTitle]] is on (it is on by default), the new round starts on its own at midnight in the circle's time zone, and the next juz are handed out. If you turn it off, you start the new round yourself." },
      { s: "What if someone cannot finish their juz?",
        c: "The unread share is not lost: in the next round it stays with that person, marked **Carried over**. They can also release part of it to the circle with [[flow.askHelp]], or hand all of it to the pool with [[flow.excuse]]; the others take it on with [[flow.helpTitle]] or **Take**." },
      { s: "We already use a WhatsApp group. Do we still need the app?",
        c: "Keep your group. Share the invite link there; the app keeps the list, tracks who has read and sends the reminders. You do not have to write a new list every week." },
      { s: "Can an older relative without the app take part?",
        c: "In a regular circle, the admin can add someone without the app as a **guest**; a person who looks after them marks their reading. In a one-time khatam set up with [[tx:event.distPool]], people without the app can take a juz in their browser from the invite link: [One-time circle](/guides/one-time-circle/)." },
      { s: "Is it free?",
        c: "Creating a circle, starting a khatam and joining a circle are free. With a free account you can manage one circle of your own at a time; there is no limit on joining other people's circles." },
      { s: "Can a khatam be completed by sharing out the juz?",
        c: "Scholars have answered this question, and views differ. For guidance that fits your situation, ask a scholar you trust." },
    ],
  },

  ilgili: ["tek", "zikir", "katil"],
  kart: { kicker: "Khatam", baslik: "Setting up a group khatam", metin: "Create your circle and share out the 30 juz; the rounds move on by themselves." },
  onizleme: { sahne: "gorevi-baslat", adim: 3 },
  cta: { baslik: "Create your circle today", metin: "Creating and joining a circle is free. Download the app, create your circle and share the invite link." },
};
