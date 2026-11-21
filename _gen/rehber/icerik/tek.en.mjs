// One-time circle (EN). Rewritten on 21 Nov 2026 for the 2.1.0 flow; translation of tek.tr.mjs.
// Button names come from the app via [[key]]; web page and Result screen names via [[=text]].
export default {
  title: "One-time circle: how to set up a group khatm or 41 Yasin",
  desc: "Set up a group khatm, 41 Yasin or salawat on one screen for a blessed night, Ramadan, healing or a loved one who passed away, then send the link.",
  h1: "One-time circle: how to organise a group khatm, 41 Yasin or salawat",
  crumb: "One-time circle",
  eyebrow: "Step-by-step guide",
  lead: "On a blessed night, in Ramadan, for the healing of someone who is ill or for a loved one who passed away, you may want to complete a khatm, read Yasin 41 times or send salawat together with the people you love. In the app you set up a one-time circle for this: you choose what to read, say who it is for and until when, and send the link. It all fits on one screen and takes about a minute.",
  meta: ["Set up in about 1 minute", "People without the app can join", "Free"],
  film: { sahne: "film-tek", cap: "One flow: pick a template, choose who it is for and until when, tap [[eventCompose.cta]], invite." },

  kisa: {
    maddeler: [
      "In the [[tabs.circles]] tab, tap the **+** button at the top right, then the [[tx:event.createMenuTitle]] card.",
      "On the [[tx:eventCompose.pickTitle]] screen, pick a template: [[tx:eventCompose.tplHatim]], [[tx:eventCompose.tplYasin41]], [[tx:eventCompose.tplSalavat]] or [[tx:eventCompose.tplCustom]].",
      "On the one-screen summary, tap the [[tx:eventCompose.rowFor]] and [[tx:eventCompose.rowEnd]] rows and choose.",
      "Give the circle a name and tap [[eventCompose.cta]]. The circle starts right away.",
      "On the [[tx:eventCompose.readyTitle]] screen, tap [[eventCompose.invite]] and send the link to your family or WhatsApp group.",
      "Everyone reads where they are; the app only shares out the parts. When the goal is reached, the circle completes and everyone gets a notification.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "The person who sets up the circle", baslik: "Set up the circle",
      giris: [
        "A one-time circle is set up for an occasion: what to read, who it is for and how long it runs are clear from the start. It grows through a link and completes when the goal is reached. You don't need to create a permanent group for it.",
        "If you want a khatm that runs every week with your family, a regular circle suits better: [Start a group khatm](/guides/group-khatam/).",
      ],
      adimlar: [
        {
          baslik: "Open a one-time circle",
          metin: [
            "In the app, tap the [[tabs.circles]] tab at the bottom and the green **+** button at the top right.",
            "The [[tx:dashboard.addCircle]] panel slides down from the top. Tap the [[tx:event.createMenuTitle]] card in the middle.",
          ],
          ipucu: "If there is no **+** at the top right, you haven't entered your name in the app yet. Tap the [[ol:circlesTab.anonCreateEvent]] button in the middle instead; once you enter your name, the same screen opens.",
          sahne: "tek-ac",
        },
        {
          baslik: "Choose what to read",
          metin: "Under the question [[tx:eventCompose.pickTitle]] you'll find ready-made templates. Tap one and the summary screen opens filled in:",
          liste: [
            "[[tx:eventCompose.tplHatim]]: the whole Quran goes into a pool as 30 juz, and everyone takes the juz they want.",
            "[[tx:eventCompose.tplYasin41]]: Surah Yasin is read 41 times by the circle, and everyone reads it in the app's reader. More: [Group 41 Yasin](/guides/group-41-yasin/).",
            "[[tx:eventCompose.tplSalavat]]: 1,000 salawat together; whatever each person counts goes into a shared counter.",
            "[[tx:eventCompose.tplCustom]]: dhikr, dua or a surah; you set up the list and the goal.",
          ],
          ipucu: "A template is only a starting point. You can change every row on the summary screen.",
          sahne: "tek-sablon",
        },
        {
          baslik: "Say who it is for",
          metin: [
            "The [[tx:eventCompose.thisCircle]] card at the top of the summary shows the circle at a glance: its name, what is read, when it ends and a ring of beads on the side. The line at the bottom of the card tells you how much each person would read if 10 people join.",
            "Tap the [[tx:eventCompose.rowFor]] row. The sheet that opens has three chips: [[tx:eventCompose.intentRuh]], [[tx:eventCompose.intentSifa]] and [[tx:eventCompose.intentVesile]]. Tapping one fills the box, and you can change the wording as you like. Then tap [[common.ok]].",
          ],
          ipucu: "This row is optional. The sentence you write stays at the top of the circle screen, and the people you invite see it too.",
          sahne: "tek-kimin",
        },
        {
          baslik: "Choose until when",
          metin: "Tap the [[tx:eventCompose.rowEnd]] row and pick a chip:",
          liste: [
            "[[tx:eventCompose.endTonight]]: until the next fajr time where you are.",
            "[[tx:eventCompose.endFriday]]: until this coming Friday at noon, 12:00.",
            "[[tx:eventCompose.endDays3]] or [[tx:eventCompose.endWeek]]: counted from now.",
            "Until the next blessed night, for example [[tx:eventCompose.untilKandil.regaib]]: until 20:00 on that evening. This chip appears when the night is less than 60 days away.",
            "[[tx:eventCompose.endCustom]]: you choose the day and time yourself.",
          ],
          fark: "Under the chips you see the exact end time and how much each person would read. Choose the length with that in mind.",
          sahne: "tek-bitis",
        },
        {
          baslik: "For a khatm: check the scope and sharing",
          metin: [
            "In a khatm, the [[tx:compose.rowWhat]] row starts as [[tx:eventCompose.whatQuranFull]]. If only certain juz are to be read, tap the row and choose [[tx:event.customJuz]].",
            "The [[tx:eventCompose.rowShare]] row offers two ways:",
          ],
          liste: [
            "[[tx:event.distPool]] (the default): all juz stay in the pool and everyone takes the one they want. Latecomers can join too; the circle starts as soon as it is set up.",
            "[[tx:eventCompose.shareDivide]]: the parts are divided equally among those who joined. Once everyone is in, you start the circle yourself, and joining closes when it starts.",
          ],
          fark: "Relatives without the app can join too: with [[tx:event.distPool]] selected, they can take a part from the link in their browser and read it.",
          sahne: "tek-paylas",
        },
        {
          baslik: "Name the circle and open it",
          metin: [
            "The [[tx:eventCompose.nameLabel]] box already holds a name written from your choices, for example [[tx:event.suggestFullHatim]]. Change it if you like, for example to “Laylat al-Raghaib Khatm”.",
            "In the [[tx:compose.more]] card, the [[tx:compose.rowStart]] row is set to [[tx:eventCompose.startNow]]. If you want the circle to start at a set time, choose it there.",
            "When everything looks right, tap the [[eventCompose.cta]] button at the bottom.",
          ],
          ipucu: "The circle is deleted 24 hours after its end date. If time runs short, you can extend it later; see below.",
          sahne: "tek-ac-dugme",
        },
        {
          baslik: "Invite",
          metin: [
            "The [[tx:eventCompose.readyTitle]] screen opens. The circle has already started: everyone you send the link to can take a part right away.",
            "Tap [[eventCompose.invite]] and choose your WhatsApp group or contacts. The message is ready: who it is for, the circle's name, its end and the link. With [[ol:eventCompose.copyLink]] you can also paste the link yourself.",
            "Then tap [[tx:eventCompose.goToCircle]] to open the circle screen.",
          ],
          fark: "Keep your WhatsApp group and post the link there. The app keeps track of who took which juz and how many times something was read, so nobody has to write lists.",
          ipucu: "With your first circle, the [[tx:secureNudge.title]] window may appear once. If you link your account with Apple, Google or email, your circle stays with you even if you change phones.",
          sahne: "tek-hazir",
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Everyone who joins", baslik: "Join and read your part",
      giris: "Everyone reads where they are; the app only shares out the parts. Nobody needs to meet: who took what and how much has been read shows on the circle screen.",
      adimlar: [
        {
          baslik: "Join with the link",
          metin: [
            "Tapping the invite link opens the app with the circle's card: its name, who it is for, how many have joined and when it ends. Tap [[joinGroup.join]]. If it's your first time, just enter your name.",
            "If the link opens in a browser instead of the app, see [Join a circle with an invite](/guides/join-a-circle/).",
          ],
          sahne: "tek-katil",
        },
        {
          baslik: "Get to know the circle screen and take a juz",
          metin: [
            "Read the circle screen from top to bottom. The top card shows what it is for and how much is left: fully read juz are green beads, taken ones are gold; at the bottom you see the time left and each person's share. The card below holds the one thing you need to do, as one big button. In a khatm, [[tx:eventScreen.statusTitle]] comes next, and the invite card sits at the bottom.",
            "The [[eventScreen.takeJuz]] button suggests the next free juz. Tap it and choose [[event.takeWholeCuz]] in the window that opens; that juz's pages are now yours. If you can read less, enter the first and last page and tap [[ol:event.claimRange]]. For a different juz, tap it in the [[tx:eventScreen.statusTitle]] card.",
          ],
          ipucu: "The invite card is for everyone: anyone who joined can bring others in with [[eventCompose.invite]].",
          sahne: "tek-cuz",
        },
        {
          baslik: "Read, then mark it as read",
          metin: [
            "The juz you took stays on your card. Tap [[eventScreen.continue]]; the Quran opens on your first page.",
            "When you've finished, go back and tap [[ol:hatim.markRead]]. Confirm with [[event.completeConfirmTitle]] in the window, and your pages count as read and a bead on the circle fills.",
          ],
          fark: "No need to look for a mushaf: the pages that fall to you open in the app.",
          ipucu: "A few hours before the end, pages that haven't been marked as read go back to the pool so someone else can take them. Mark your part in time.",
          sahne: "tek-oku",
        },
        {
          baslik: "In a 41 Yasin or salawat circle",
          metin: [
            "In a surah circle, your card has a [[eventCompose.readBtn]] button: Yasin opens in the app's reader on its own pages. On the last page you tap [[hatim.markRead]], and back on the circle screen the counter goes up by one. If you read from a printed copy, tap [[tx:readTogether.markFromBook]].",
            "In a salawat or dhikr circle, the same place has a [[event.count]] button that opens the counter; every tap on the screen counts one.",
          ],
          ipucu: "Step by step: [Group 41 Yasin](/guides/group-41-yasin/) and [Group dhikr and salawat](/guides/group-dhikr-salawat/).",
          sahne: "yasin-oku",
        },
        {
          baslik: "Without the app: join in the browser",
          metin: [
            "In a khatm with a shared pool, the link opens the circle's page in the browser. The intention is at the top, with how many pages have been read below it.",
            "In the [[=Next portion]] card, tap [[=Take this]], choose how many pages you'll read and tap [[=I confirm, I will take it]]. [[=Read now]] opens the pages in the browser; when you've read them, tap [[=I finished it]] at the end of the pages.",
            "In a 41 Yasin, salawat or dhikr circle, the page has an [[=Add to the count]] button: it opens a counter, you count what you read or recited and tap [[=Add my count]].",
          ],
          fark: "It works even if your aunt doesn't have the app: no account, just the link, and she takes her part and reads it.",
          ipucu: "In a khatm set to [[tx:eventCompose.shareDivide]], the browser can't join the division; it can only take on parts that weren't finished once they open to the pool.",
          sahne: "tek-web",
        },
      ],
    },
    {
      tur: "ikili", id: "bitis", rol: "The person who sets up the circle", baslik: "Time and completion",
      giris: "The app also looks after the end of the circle: it completes the circle when the goal is reached, lets everyone know and keeps the result.",
      kartlar: [
        {
          baslik: "If time runs short",
          metin: [
            "On the circle screen, tap the **···** button at the top right and choose [[tx:event.extend24h]]. The end moves 24 hours later; you can tap it again if needed.",
            "The same menu has [[tx:event.participantsTitle]] and [[tx:event.editTitle]]. In a khatm, [[tx:event.releasePool]] opens parts that were taken but not read to everyone, and [[tx:event.addSeriesTitle]] starts a new 30-juz khatm in the same circle.",
          ],
          sahne: "tek-uzat",
        },
        {
          baslik: "When the goal is reached",
          metin: [
            "Once every juz has been read or the counter reaches the goal, the circle completes by itself. If the screen is open, a short message says so; people who closed the app get a notification.",
            "The [[=See the result]] button on the circle screen opens the Circle Result: it shows the circle's total and your own contribution.",
            "If you repeat the same intention every blessed night or every Friday, tap [[=Set up this circle again]] in the result. Setup opens with the same goal, name and who it is for; you only choose the end again.",
          ],
          sahne: "tek-tamam",
        },
      ],
      not: "The circle is deleted 24 hours after its end date. Its result stays afterwards under [[tx:tabs.profile]] › [[=My Journey]] › [[=Circles]].",
    },
    {
      tur: "ikili", id: "vesileler", rol: "Examples", baslik: "For which occasions?",
      giris: [
        "A one-time circle can be set up for any occasion: a khatm for a blessed night or Ramadan, 41 Yasin or salawat with the intention of healing for someone ill, a khatm for a loved one who passed away, a shared dua for a wedding in the family or for someone leaving for Hajj.",
        "The steps are the same each time. You only choose the template, the who-it-is-for line and the end to fit the occasion.",
      ],
      kartlar: [
        {
          baslik: "For a loved one who passed away",
          metin: [
            "In the [[tx:eventCompose.rowFor]] sheet, tap the [[tx:eventCompose.intentRuh]] chip and change the wording if you like, for example “For the soul of our father”. A circle set up with this chip adds the line “[[tx:eventInvite.fatiha]]” to the invite message.",
            "Set the end for a time when the family can read comfortably; the app doesn't suggest any particular day. Instead of a khatm you can also choose [[tx:eventCompose.tplYasin41]] or [[tx:eventCompose.tplSalavat]].",
            "Everyone reads their own juz where they are. The app only shares out the juz and shows which have been read.",
          ],
          sahne: "tek-ruh",
        },
        {
          baslik: "For blessed nights, Ramadan and healing",
          metin: [
            "For a khatm meant for a blessed night, pick the next-night chip in the [[tx:eventCompose.rowEnd]] sheet, for example [[tx:eventCompose.untilKandil.regaib]]. The circle runs until that evening.",
            "For someone who is ill, the [[tx:eventCompose.intentSifa]] chip writes “[[tx:eventCompose.intentSifaFill]]” in the box. For a short reading, [[tx:eventCompose.tplYasin41]] or [[tx:eventCompose.tplSalavat]] fits well.",
            "If you read with a large community, [[tx:event.addSeriesTitle]] in the circle screen's **···** menu opens more than one khatm in the same circle. For a khatm that runs every day or every week through Ramadan, a regular circle suits better: [Start a group khatm](/guides/group-khatam/).",
          ],
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "How do I organise a group khatm?",
        c: "In the [[tabs.circles]] tab, tap **+**, then the [[tx:event.createMenuTitle]] card and the [[tx:eventCompose.tplHatim]] template. Choose the [[tx:eventCompose.rowFor]] and [[tx:eventCompose.rowEnd]] rows, tap [[eventCompose.cta]] and send the link with [[eventCompose.invite]]. Everyone takes a juz and reads it where they are; the app only shares out the juz." },
      { s: "What is the difference between a one-time circle and a regular circle?",
        c: "A one-time circle is for an occasion: it has a goal and an end, completes when the goal is reached and is deleted 24 hours after the end; its result stays in the app. A regular circle is a lasting community with your family or congregation; the khatm continues with a new round every day or every week. More: [Start a group khatm](/guides/group-khatam/)." },
      { s: "Can people without the app join?",
        c: "In most circles, yes. In a khatm with [[tx:event.distPool]], whoever opens the link takes a portion in the browser and reads it. In 41 Yasin, salawat and dhikr circles they add to the [[tx:event.modeCollective]] count from the browser. No account is needed. The division in a khatm set to [[tx:eventCompose.shareDivide]] and an [[tx:event.modeIndividual]] count are joined from the app." },
      { s: "What if not every juz is read before the closing dua?",
        c: "Each circle can follow the guidance of its own scholars on this. In the app, parts that haven't been marked as read go back to the pool a few hours before the end, and the organiser can extend the time by 24 hours." },
      { s: "What happens when the circle ends?",
        c: "When the goal is reached, the circle completes, everyone gets a notification and the [[=See the result]] button on the circle screen opens the result. If time runs out before the goal, the circle is deleted 24 hours after the end; until then the organiser can extend it by 24 hours. The result stays afterwards under [[tx:tabs.profile]] › [[=My Journey]]." },
      { s: "Does it cost anything?",
        c: "Setting up and joining a one-time circle is free. With a free account you can run one one-time circle at a time; when it completes or is deleted, you can set up the next. There is no limit on how many circles you can join." },
    ],
  },

  ilgili: ["yasin", "hatim", "katil"],
  kart: { kicker: "For an occasion", baslik: "One-time circle: set up in a minute", metin: "Pick a khatm, 41 Yasin or salawat, say who it is for and until when, and send the link." },
  onizleme: { sahne: "tek-kart", adim: 4 },
};
