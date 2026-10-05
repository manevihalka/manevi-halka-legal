// P2 · One-time circle: group khatam, dhikr and du'a (EN). Source: tek.tr.mjs. In the app: One-Time Circle.
// First version was "Khatam for someone who passed away"; on 5 Oct 2026 it became a general guide for any occasion,
// and the deceased example stays as one section.
// Button names come from the app through [[key]]; since 2.0 the preset chips are in the user's language too.
// Religious language: no reward promises, no rulings of our own, no specific memorial days.
// Search aim: "khatam/dhikr for an occasion". "Group khatam" belongs to hatim.en.mjs; do not put it back in
// title, desc, h1 or the first FAQ question (both pages would compete for the same search).
export default {
  title: "Khatam or dhikr for an occasion: One-Time Circle guide",
  desc: "Organise a khatam, dhikr or salawat for an occasion: Ramadan, a blessed night, a late loved one or a prayer for someone. No app needed to join.",
  h1: "One-Time Circle: how to organise a khatam, dhikr or du'a for an occasion",
  crumb: "One-time circle",
  eyebrow: "Step-by-step guide",
  lead: "For a blessed night, Ramadan, a loved one who passed away or an occasion in your family, you may want to complete a khatam, recite dhikr and salawat or read du'as together with the people you love. In the app you create a one-time circle for this: you choose the goal, set the end date and send the link. Everyone reads or counts their own share in their own place. The app only shares out the parts and adds up the counts.",
  meta: ["Set up in about 2 minutes", "People without the app can join", "Free"],
  film: { sahne: "film-tek", cap: "The whole flow in one go: create the one-time circle, choose the goal and the end date, write the dedication, start it and send the link." },

  kisa: {
    maddeler: [
      "In the app, open the [[tabs.circles]] tab, tap the **+** button at the top right and tap the [[tx:event.createMenuTitle]] card in the window that opens.",
      "Choose the goal: [[tx:event.typeQuran]], [[tx:event.typeZikir]] or [[tx:event.typeDua]]. For a khatam, tap [[tx:event.distPool]] for the distribution; for a shared dhikr count, tap [[tx:event.modeCollective]].",
      "Under [[tx:event.endDate]], choose until when the circle will run.",
      "Give the circle a name, write the occasion in the [[tx:event.dedicationLabel]] box if you like and tap [[event.create]].",
      "Start the circle with [[event.startNow]] and send the link to your family and your WhatsApp group with [[ol:event.inviteFriends]].",
      "Everyone reads or counts their share in their own place. People without the app join most circles in the browser. When the time is up, the circle closes and its summary stays in the app.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "The person organising the circle", baslik: "Set up the circle",
      giris: [
        "A one-time circle is set up for one occasion: it has an end date, grows through an invite link, closes when its time is up and its summary stays in your archive. You do not need to set up a permanent group for it.",
        "If you want a khatam that carries on every week as a family, a regular circle suits you better: [Setting up a group khatam](/guides/group-khatam/).",
      ],
      adimlar: [
        {
          baslik: "Open a one-time circle",
          metin: [
            "Open the app and tap the [[tabs.circles]] tab in the bar at the bottom. Tap the green **+** button at the top right.",
            "The [[tx:dashboard.addCircle]] window slides down from the top. Tap the [[tx:event.createMenuTitle]] card in the middle.",
          ],
          ipucu: "If there is no **+** button at the top right, you have not entered your name in the app yet. Tap [[ol:circlesTab.anonCreateEvent]] in the middle instead and type your name; the one-time circle form opens straight away and you carry on from the next step.",
          sahne: "vf-ac",
        },
        {
          baslik: "Choose the type of goal",
          metin: "The first screen asks [[tx:event.step1Title]] and shows the type cards. This guide covers these three cards; tap one and tap [[common.continue]]:",
          liste: [
            "[[tx:event.typeQuran]]: a 30-juz khatam, or the juz you choose, is shared out among the people who join. This section follows this path.",
            "[[tx:event.typeZikir]]: you set a target count for a dhikr or salawat. Everyone completes their own count, or the whole circle counts towards one total.",
            "[[tx:event.typeDua]]: you set a number of recitations for surahs and du'as such as Yasin, al-Ikhlas or al-Fatiha.",
          ],
          ipucu: "For dhikr and du'a the second step is different; it is explained in the **Dhikr, salawat or du'a goal** section below. The steps after that are the same for all of them.",
        },
        {
          baslik: "Choose how the khatam is shared out",
          metin: "If you chose [[tx:event.typeQuran]], [[tx:event.fullHatim]] is already selected on the screen that opens: 30 juz, 604 pages. At the bottom, [[tx:event.distributionLabel]] has two options; choose one and tap [[common.continue]] again:",
          liste: [
            "[[tx:event.distPool]]: all the juz wait in a pool and everyone takes the juz they want. People can still join after the circle has started. Choose this for a khatam read with family and friends.",
            "[[tx:event.distAuto]]: the pages are divided equally among the people who joined. Joining closes the moment you start the circle, so everyone needs to have joined beforehand.",
          ],
          fark: "Relatives without the app can join too: with [[tx:event.distPool]] selected, they take a juz from the invite link in their browser and read their pages there.",
          ipucu: "If only certain juz will be read instead of the whole Quran, use the [[tx:event.customJuz]] option.",
          sahne: "vf-hedef",
        },
        {
          baslik: "Choose the end date",
          metin: [
            "Tap the [[tx:event.endDate]] box and choose until when the circle will run. The date is set two days ahead to begin with; you can choose any other date you like, such as a blessed night. Then tap [[common.continue]].",
            "If you want the circle to start on its own at a set time, tick the [[tx:event.registrationWindowToggle]] box. If you leave it unticked, you start the circle yourself.",
          ],
          ipucu: "The circle is deleted 24 hours after the end date. If you need more time, you can extend it later; see below.",
          sahne: "vf-zaman",
        },
        {
          baslik: "Name the circle and write the dedication",
          metin: [
            "Type a name in the [[tx:event.titleLabel]] box, for example “Laylat al-Raghaib Khatm”. If you leave it empty, the name will be [[tx:event.suggestFullHatim]].",
            "In the [[tx:event.dedicationLabel]] box, write the occasion of the circle or who it is read for, for example “For the good of our family and the whole Ummah”. The dedication sits under the name on the circle screen. People who open the link in a browser see it as the largest heading on the page. You can also leave the dedication empty.",
            "Check the summary at the bottom and tap [[event.create]].",
          ],
          ipucu: "When you create your first circle, the [[tx:secureNudge.title]] window may appear once. If you link your account with Apple, Google or email, your circle stays with you even if you change phones. You can also tap [[tx:secureNudge.later]].",
          sahne: "vf-ithaf",
        },
        {
          baslik: "Start the circle",
          metin: [
            "The circle screen opens: the circle's name and dedication at the top, below them the [[tx:event.inviteSectionTitle]] card and the [[event.startNow]] button. If you chose [[tx:event.distPool]], or set up a dhikr or du'a circle, there is no need to wait. Tap [[event.startNow]], then tap [[event.startNow]] once more in the window that opens.",
            "Nobody can take a juz or count before the circle starts. Once it has started, the invite link stays open and people who come later can still join.",
          ],
          ipucu: "If you chose [[tx:event.distAuto]], share the link first and start once everyone has joined. When you start, a preview opens showing who will read which pages; you tap [[event.planConfirm]] to confirm once more.",
          sahne: "vf-baslat",
        },
        {
          baslik: "Send the link",
          metin: [
            "Once the circle has started, the invite card moves to the [[tx:event.tabCircle]] tab. Tap [[ol:event.inviteFriends]] and send the link to your WhatsApp group, your family or anyone you like.",
            "The note under the card says what people without the app can do with this link. In a khatam with the shared pool it says: [[tx:event.webJoinClaim]]",
          ],
          fark: "Keep your WhatsApp group. Share the link there; the app keeps track of who took which juz and how much has been counted, so you do not have to write a list.",
          ipucu: "Send the link with the [[ol:event.inviteFriends]] button on this screen or with the share icon at the top right. Do not send only the invite code: people without the app can join in the browser only with this link.",
          sahne: "vf-davet",
        },
      ],
    },
    {
      tur: "bolum", id: "zikir-dua", rol: "The person organising the circle", baslik: "Dhikr, salawat or du'a goal",
      giris: "If you tap the [[tx:event.typeZikir]] or [[tx:event.typeDua]] card on the type screen, only the second step changes. The end date, name, dedication, starting and inviting work as above.",
      adimlar: [
        {
          baslik: "Choose the dhikr and the target count",
          metin: [
            "On the [[tx:event.zikirGoalTitle]] screen, tap one of the chips under the [[tx:event.addFromPresets]] heading, for example [[tx:globalDhikr.salavat.name]]. The list also has [[tx:wizard.zikirPresetKelime]], [[tx:wizard.zikirPresetIstigfar]], [[tx:wizard.zikirPresetSubhanallah]] and [[tx:wizard.zikirPresetElhamdulillah]]. You can pick one of the Names of Allah with the [[tx:event.esmaulHusna]] chip, or type your own dhikr in the [[tx:event.customZikir]] box.",
            "On the card of the dhikr you added, type the number in the [[tx:event.target]] box. Next to it there are two options:",
          ],
          liste: [
            "[[tx:event.modeCollective]]: the whole circle counts towards one total, for example 10,000 salawat together. The counts add up until the end date.",
            "[[tx:event.modeIndividual]]: everyone completes the number you typed on their own, for example 100 each.",
          ],
          fark: "People without the app can also add to the count from the link in their browser. This works only for dhikrs set to [[tx:event.modeCollective]], and only once the circle has started.",
          ipucu: "More on counting and shared targets: [Group dhikr and salawat](/guides/group-dhikr-salawat/).",
          sahne: "zikir-tek-toplu",
        },
        {
          baslik: "For a du'a or surah recitation",
          metin: [
            "If you chose [[tx:event.typeDua]], the ready list on the [[tx:event.duaGoalTitle]] screen has [[tx:event.presetFatiha]], [[tx:globalDhikr.ayetelkursi.name]], [[tx:event.presetYasin]], [[tx:event.presetIhlas]], [[tx:event.presetMulk]] and [[tx:event.presetFetih]]. To add a du'a or surah that is not on the list, type it in the [[tx:event.customZikir]] box.",
            "Type the number of recitations in the [[tx:event.target]] box and again choose [[tx:event.modeCollective]] or [[tx:event.modeIndividual]]. You decide how many will be read; for the tradition behind a number, ask a scholar where you live.",
          ],
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Everyone taking part", baslik: "Join and complete your share",
      giris: "Everyone reads or counts their own share in their own place, at their own time. There is no need to gather. The app only shares out the parts, adds up the counts and shows what has been completed.",
      adimlar: [
        {
          baslik: "If you have the app: join and take a juz",
          metin: [
            "When you tap the invite link, the app opens and shows the circle's card: its name, the dedication, the number of participants and the end date. Tap [[joinGroup.join]]. If this is your first time, you only need to type your name; no email is asked for. If the link opens in the browser instead of the app, tap the [[=Open in the app]] button at the bottom of the page; there are more details in the guide [Joining a circle from an invite](/guides/join-a-circle/).",
            "In a khatam circle, tap a free juz in the [[tx:event.poolCuzTitle]] section. If you tap [[event.takeWholeCuz]], all 20 pages of that juz are yours. If you can read less, type the first and last page and tap [[ol:event.claimRange]].",
          ],
          ipucu: "If the circle has not started yet, the screen says [[tx:event.startWhenAdminOpen]]. The juz and the counting open up when the admin starts it.",
          sahne: "vf-katil",
        },
        {
          baslik: "Read, then tap Complete",
          metin: [
            "The pages you took are on the [[tx:event.myTask]] card. Tap [[ol:event.read]]; the Quran opens at your first page.",
            "When you have finished reading, go back and tap [[event.done]]. Once you confirm in the window that opens, your pages count as read and are added to the circle's progress. Do this at least 6 hours before the end; pages that are not marked go back to the pool at that point.",
          ],
          fark: "No need to find your mushaf: your pages open right in the app.",
          ipucu: "If you marked them by mistake, open the [[=Completed]] row; you can undo the mark from there.",
          sahne: "vf-oku",
        },
        {
          baslik: "In a dhikr or du'a circle: count",
          metin: [
            "On the circle screen, the [[tx:event.zikirSection]] card ([[tx:event.duaSection]] in a du'a circle) has a [[event.count]] button next to each row. Tap it and the counter opens; every tap on the screen counts one.",
            "If you counted with prayer beads or from memory, add the number in one go with the [[ol:zikir.bulkAdd]] button under the counter. Counts are saved on their own. For a [[tx:event.modeCollective]] dhikr, the counter also shows the [[tx:zikir.counterGroupTotal]] line.",
          ],
        },
        {
          baslik: "If you do not have the app: take a portion in the browser",
          metin: [
            "In a khatam with the shared pool, tapping the link opens the circle's page in the browser. The dedication is at the very top, and below it you see how many pages have been read.",
            "The [[=Next portion]] card suggests a juz for you. Tap [[=Take this]]. Choose how many pages you will read (5, 10, 15 or 20) and tap [[=I confirm, I will take it]]. The [[=Read now]] button opens the pages in the browser.",
          ],
          fark: "It works even if your aunt does not have the app on her phone: she takes her juz and reads it with just the link, without opening an account.",
          ipucu: "If the circle has not started yet, the page says so and refreshes on its own when the admin starts it.",
          sahne: "vf-web",
        },
        {
          baslik: "When you have read it, tap I finished it",
          metin: [
            "At the end of the pages there is the question [[=Finished reading?]] and the [[=I finished it]] button; tap it when you have finished reading. If you open the link again later in the same browser, the portion you took is on the [[=Your portions]] card; the [[=I finished it]] button is there too.",
            "You can type your name if you like; the others in the circle then see who took the portion. Your name is not required, and leaving it empty changes nothing.",
          ],
          ipucu: "After taking a portion, save the link with the [[=Copy link]] button that appears. If you want to come back from another phone or browser, use this link.",
          sahne: "vf-web-bitir",
        },
        {
          baslik: "If you do not have the app: add to the count in the browser",
          metin: [
            "When you open the link of a dhikr or du'a circle, the [[=Recitations in this circle]] card appears in the browser. Every dhikr set to [[tx:event.modeCollective]] has an [[=Add to the count]] button next to it.",
            "Tap it and a large circle opens: every tap counts one, and the [[=+33]] and [[=+100]] buttons add in one go. When you have finished, tap [[=Add my count]]; your count is added to the circle's total.",
          ],
          ipucu: "Dhikrs set to [[tx:event.modeIndividual]] show [[=For circle members]] instead of the button. You can count those only in the app.",
        },
      ],
    },
    {
      tur: "ikili", id: "bitis", rol: "The person organising the circle", baslik: "As the time runs out and when the circle ends",
      giris: "The app also looks after the end of the circle: in a khatam it puts pages that were taken and not finished back in the pool on its own, and it adds up the counts until the end date.",
      kartlar: [
        {
          baslik: "As the end approaches",
          metin: [
            "12 hours before the end, anyone who has not finished their share yet gets a reminder notification. In dhikr and du'a circles, this reminder goes to everyone taking part.",
            "In a khatam, 6 hours before the end, pages taken in the app and not marked with [[event.done]] go back to the pool. Someone else can take them and read them; the person whose share was taken back is told in the app.",
            "If you need more time, tap the [[tx:event.extend24h]] row on the [[tx:event.adminControls]] card in the [[tx:event.tabCircle]] tab. The end date moves 24 hours later; you can tap it again if needed.",
          ],
          sahne: "vf-uzat",
        },
        {
          baslik: "When the circle ends",
          metin: [
            "In a khatam, when all the pages have been read, [[tx:event.collectiveProgress]] reaches 100%. If there is time, you can open a new 30-juz khatam in the same circle with the [[ol:event.addSeries]] button next to the [[tx:event.poolCuzTitle]] heading. In dhikr and du'a circles, the counts keep adding up until the end date.",
            "The circle is deleted 24 hours after the end date. Before it is deleted, a summary of the circle is saved for everyone who joined from the app, under [[tx:tabs.profile]] › [[tx:quran.myLibrary]] › [[tx:event.archiveTab]].",
            "Pages taken in the browser count as read in the circle's progress the moment they are taken, and they do not go back to the pool. You can see who finished in the [[=Joined from the web]] list on the [[tx:event.tabCircle]] tab.",
          ],
          sahne: "vf-ilerleme",
        },
      ],
      not: "In a khatam set up with [[tx:event.distAuto]], the [[=Your khatm is complete]] card appears on the circle screen once all the shares have been read. If someone cannot finish their share, the admin can open the remaining shares to the pool with the [[tx:event.releasePool]] row on the [[tx:event.adminControls]] card.",
    },
    {
      tur: "ikili", id: "vesileler", rol: "Examples", baslik: "Which occasions?",
      giris: [
        "A one-time circle can be set up for any occasion. A few examples: a khatam for a blessed night, Mawlid or Ramadan; a khatam or Yasin recitations for a relative who passed away; salawat with a prayer for the recovery of a loved one who is ill; a shared du'a for a family wedding, a newborn baby or someone going on Hajj.",
        "The steps are the same for all of them. You only choose the goal, the end date and the dedication to suit that occasion.",
      ],
      kartlar: [
        {
          baslik: "For a loved one who passed away",
          metin: [
            "When someone close to you passes away, you can complete a khatam for them together with the people you love. Give the circle a name, for example “Khatam for Ibrahim Khan”, and write a sentence such as “For our late father” as the dedication. Relatives who open the link in a browser see this dedication as the largest heading on the page.",
            "Set the end date to a day when the family can read comfortably; the app does not suggest a particular day. Instead of a khatam you can also organise salawat or Yasin recitations: when you choose the type, tap the [[tx:event.typeZikir]] or [[tx:event.typeDua]] card.",
            "Everyone reads their own juz in their own place. The app only shares out the juz and shows which ones have been read.",
          ],
          sahne: "vf-ithaf-vefat",
        },
        {
          baslik: "For a blessed night, Mawlid and Ramadan",
          metin: [
            "For a khatam read on a blessed night, for Mawlid or in Ramadan, set the end date to the day of that occasion, for example the evening of the blessed night. Write the dedication to suit the occasion too. While the dedication box is empty, it shows [[tx:event.dedicationPlaceholder]].",
            "If you are reading with a large community, you can open more than one khatam in the same circle with [[ol:event.addSeries]].",
            "For a khatam that runs every day or every week through Ramadan, a regular circle suits you better: [Setting up a group khatam](/guides/group-khatam/).",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ornek", baslik: "Example: a Laylat al-Raghaib khatam",
      giris: "The screenshots below are from the app. The dedication says “For the good of our family and the whole Ummah”, the juz are taken from the shared pool, and some relatives have joined from the browser.",
      kareler: [
        { img: "06-event", alt: "Laylat al-Raghaib Khatm: dedication line, Collective Progress at 60 percent, Pages 21-40 on the Your Task card and the Juz Pool", cap: "Task tab: collective progress, your pages and the juz pool" },
        { img: "06c-event-davet", alt: "The Circle tab of the same circle: invite code, invite link, Invite button and participants", cap: "Circle tab: invite code, link and participants" },
        { img: "06b-event-web", alt: "Joined from the web list, and Extend by 24 hours and Delete circle on the Management card", cap: "People who joined from the browser, and management" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "How do I organise a khatam for an occasion?",
        c: "In the [[tabs.circles]] tab, tap the **+** button, then the [[tx:event.createMenuTitle]] card and then the [[tx:event.typeQuran]] card. Choose [[tx:event.distPool]] for the distribution, set the end date, write the dedication if you like and tap [[event.create]]. Start it with [[event.startNow]] and send the link. Everyone takes a juz and reads it in their own place." },
      { s: "What is the difference between a one-time circle and a regular circle?",
        c: "A one-time circle is set up for one occasion: it has an end date, closes when its time is up and is deleted 24 hours later; its summary stays in the app. A regular circle is a lasting group with your family or community, where the khatam carries on with a new round every day or every week. More details: [Setting up a group khatam](/guides/group-khatam/)." },
      { s: "Can people without the app join?",
        c: "In most circles, yes. In a khatam with [[tx:event.distPool]] selected, whoever taps the invite link takes a portion in the browser and reads the pages there. In dhikr and du'a circles, they can add to the count of dhikrs set to [[tx:event.modeCollective]] from the browser. They do not open an account, and typing their name is optional too. In a khatam with [[tx:event.distAuto]], only the shares that were not finished in time can be taken in the browser; [[tx:event.modeIndividual]] dhikrs need the app." },
      { s: "How do I organise a khatam for a deceased loved one?",
        c: "The steps are the same as for any one-time circle. Give the circle a name and write a sentence such as “For our late father” as the dedication; people who open the link in a browser see the dedication as the heading of the page. Set the end date to a day when the family can read comfortably. Everyone reads their own juz in their own place; the app only shares out the juz." },
      { s: "What if not all the juz are read before the khatam du'a?",
        c: "The app does not decide this. In a khatam with the [[tx:event.distPool]], pages taken in the app and not marked [[event.done]] go back to the pool 6 hours before the end, so someone else can read them, and the admin can move the end 24 hours later. On reading the remaining juz after the du'a, ask a scholar you trust." },
      { s: "How do I set it up for a blessed night, Mawlid or Ramadan?",
        c: "With the same steps. Set the end date to the day of that occasion, for example the evening of the blessed night, and write the dedication to suit it. If you are reading with a large community, you can open more than one khatam in the same circle with [[event.addSeries]]. For a khatam that runs every day or every week through Ramadan, a regular circle suits you better: [Setting up a group khatam](/guides/group-khatam/)." },
      { s: "Is it free?",
        c: "Creating and joining a one-time circle is free. With a free account you cannot create a new one-time circle until the one you created has been deleted; a circle is deleted 24 hours after its end date. There is no limit on joining." },
    ],
  },

  ilgili: ["hatim", "zikir", "katil"],
  kart: { kicker: "Occasion", baslik: "One-time circle: khatam, dhikr, du'a", metin: "Create a one-time circle for a blessed night, a loved one who passed away or a prayer, and share the link; people without the app join in the browser." },
  onizleme: { sahne: "vf-baslat", adim: 0 },
};
