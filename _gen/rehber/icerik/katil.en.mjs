// P4 · Joining a circle with an invite link (EN). Source: katil.tr.mjs.
// Support page for people who received an invite (join.html and halka.html link here).
// Button names come from the app through [[key]]; the web pages' own texts (join.html, halka.html) are [[=...]].
// No em dash, no Jawshan.
export default {
  title: "How to join a khatam or dhikr circle from an invite",
  desc: "Got an invite link or code? Tap the link, paste the code or scan the QR code. No app? You can still join a one-time circle from your browser.",
  h1: "How to join a circle with an invite link or code",
  crumb: "Joining a circle",
  eyebrow: "Step-by-step guide",
  lead: "If you have been invited to a khatam (khatm) or a dhikr goal, you are in the right place. If you have the app, tapping the link is enough. If not, you download the app and join with the invite code. You can also join a one-time circle from your browser.",
  meta: ["About 1 minute", "No email or password", "Joining is free"],
  film: { sahne: "film-katil", cap: "Tap the link, tap [[joinGroup.join]], type your name. You are in the circle." },

  kisa: {
    maddeler: [
      "If you have the app, tap the link in the message. When the invite card opens, tap [[joinGroup.join]].",
      "If this is your first time, type your name and tap [[nameSheet.confirm]]. No email or password is asked for.",
      "If you have the app but the link opens in the browser, tap the [[=Open App]] button on the page (in a one-time circle, [[=Open in the app]]).",
      "If you do not have the app, download it first. Then tap [[ol:circlesTab.anonJoin]] in the [[tabs.circles]] tab, paste the link or the code and tap [[joinGroup.join]].",
      "The link of a one-time circle often opens without the app too: in the browser you take the pages you will read, or you add to the count.",
      "Your task appears under [[tx:dashboard.myTasks]] on Home.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "uygulaman-varsa", rol: "The person who got the invite", baslik: "If you have the app on your phone",
      giris: "An invite usually arrives as a link by WhatsApp or SMS. Under the link there is often a short six-character code as well.",
      adimlar: [
        {
          baslik: "Tap the link in the message",
          metin: [
            "Tap the link in the message. The app opens on its own and shows the invite card. At the top of the card it says [[tx:join.invite]], and below that is the circle's name. For a one-time circle, the top of the card says [[tx:event.createMenuTitle]].",
            "If you do not want to join right now, you can tap [[tx:join.skip]]. The link stays in the message; you can tap it again later.",
          ],
          ipucu: "If the link opens inside WhatsApp or Instagram, you may see a web page instead of the app. Tap the [[=Open App]] button on that page (in a one-time circle, [[=Open in the app]]). The invite card opens in the app.",
          sahne: "katil-link",
        },
        {
          baslik: "Tap Join and type your name",
          metin: [
            "Tap [[joinGroup.join]]. If you are using the app for the first time, the [[tx:nameSheet.title]] card appears. Type your name and tap [[nameSheet.confirm]]. The others in the circle will see you by this name.",
            "In a regular circle, the [[tx:join.welcome]] window comes next; tap [[common.ok]] and the circle's screen opens. In a one-time circle, the circle's screen opens straight away.",
          ],
          fark: "You do not need to open an account to join. No email, password or phone number is asked for; typing your name is enough.",
          ipucu: "If you have already joined this circle, tapping [[joinGroup.join]] takes you straight to the circle's screen.",
          sahne: "katil-katil",
        },
      ],
    },
    {
      tur: "bolum", id: "uygulaman-yoksa", rol: "The person who got the invite", baslik: "If you do not have the app",
      giris: "When you tap the link of a regular circle, the invite page opens in the browser. After you download the app, the invite does not arrive on its own: tap the link in the message once more, or enter the code in the app. So note down the code first. The link of a one-time circle, on the other hand, often opens the circle's own page (step 7 below).",
      adimlar: [
        {
          baslik: "Note the code on the invite page and download the app",
          metin: [
            "On the page you see a six-character code in the [[tx:=Invite Code]] box, for example T4X6RC. Write the code down somewhere, or keep the message.",
            "Then tap the [[ol:=App Store]] or [[ol:=Google Play]] button and download Manevi Halka. Downloading the app and joining a circle are free.",
          ],
          ipucu: "The code is often in the message too: the [[tx:group.shortCode]] line under the link is the same code.",
          sahne: "katil-sayfa",
        },
        {
          baslik: "Open the Circles tab in the app",
          metin: [
            "Open the app and finish the short introduction on first launch. Tap the [[tabs.circles]] tab in the bar at the bottom. Then tap the [[ol:circlesTab.anonJoin]] button.",
            "The app only asks for your name. Type your name and tap [[nameSheet.confirm]]. The [[tx:joinGroup.title]] screen opens next.",
          ],
          ipucu: "If you have typed your name in the app before or signed in, you will not see this button. In that case tap the **+** button at the top right. In the panel that opens, tap the [[tx:dashboard.joinExisting]] row.",
          sahne: "katil-kod-giris",
        },
        {
          baslik: "Paste the link or the code, then tap Join",
          metin: [
            "In WhatsApp, press and hold the invite message and copy it. Then go back to the app and tap the [[ol:common.paste]] button. If your phone asks for permission to paste, allow it. The app finds the code inside the message by itself. You can also type the code by hand.",
            "Then tap [[joinGroup.join]]. The circle's screen opens straight away.",
          ],
          fark: "You can paste the whole link, or even the whole message, into the box. The code is recognised even if it is written with spaces in between.",
          ipucu: "If the code does not match, the app says: [[tx:joinGroup.notFoundMsg]] In that case read the code again. Codes do not use the letters I and O or the numbers 0 and 1.",
          sahne: "katil-kod",
        },
      ],
    },
    {
      tur: "bolum", id: "qr-ve-tarayici", rol: "The person who got the invite", baslik: "With a QR code or from the browser",
      giris: "An invite can be shown on a screen at the mosque or at a gathering. And you can join a one-time circle even without the app.",
      adimlar: [
        {
          baslik: "Scan the QR code with your phone's camera",
          metin: [
            "Someone in the circle, usually the admin, opens the [[tx:group.inviteToCircle]] window on their phone. It has a QR code. Open your own phone's camera and point it at the QR code.",
            "Tap the link that appears on the screen. If you have the app, the invite card opens; tap [[joinGroup.join]]. If you do not have the app, the invite page opens; carry on from step 3 above.",
          ],
          ipucu: "The QR code is in the invite window of regular circles. One-time circles use the link or the code.",
          sahne: "katil-qr",
        },
        {
          baslik: "Join a one-time circle from your browser",
          metin: [
            "The link of a one-time circle, such as a khatam for someone who passed away, a khatam for a blessed night or a group salawat, often opens without the app as well, and the circle's page appears in the browser. You need no account and no app. If the page only shows the [[tx:=Invite Code]] and the store buttons, this link needs the app; carry on from step 3.",
            "For a khatam, tap [[=Take this]]. At the question [[=How much will you read?]], choose how many pages you will read and tap [[=I confirm, I will take it]]. Then [[=Read now]] opens your pages in the browser. For a dhikr or salawat goal, tap [[=Add to the count]], tap the circle as many times as you counted, and at the end tap [[=Add my count]].",
            "Everyone reads or recites in their own place; the page only shares out the parts and adds up the counts. On some circles the page only shows the circle; then you need the app to join. More details: [One-time circle](/guides/one-time-circle/) and [Group dhikr and salawat](/guides/group-dhikr-salawat/).",
          ],
          fark: "A relative of yours without the app can often tap the link and take their share in the browser too.",
          ipucu: "If you have the app and this page opened, tap the [[=Open in the app]] button at the very bottom and tap [[joinGroup.join]] in the app. That way the shares you take from now on are saved to your own account and appear under [[tx:dashboard.myTasks]].",
          sahne: "katil-web",
        },
      ],
    },
    {
      tur: "bolum", id: "katildiktan-sonra", rol: "Someone who just joined", baslik: "After you have joined",
      giris: "The circle's screen has two tabs. The [[tx:group.readingsTab]] tab shows the circle's tasks, and the [[tx:group.membersMenu]] tab shows the others in the circle.",
      adimlar: [
        {
          baslik: "Find your task on Home",
          metin: [
            "When a task is assigned to you, a card appears under [[tx:dashboard.myTasks]] in the [[tx:tabs.home]] tab. The card shows the circle's name and the juz assigned to you.",
            "Tap the card to open the task screen. If you allowed notifications, you also get a notification on your phone when your new task is ready; for a round that starts at night, the notification arrives in the morning.",
          ],
          sahne: "katil-gorev",
        },
        {
          baslik: "If a khatam is running, your share comes in the next round",
          metin: [
            "If the circle has a khatam running and you joined in the middle of a round, the task screen shows this message: [[tx:flow.noAssignment]] This is not an error.",
            "The juz are handed out to whoever is in the circle when a round starts. In the next round you are on the list too, and your share arrives on its own. Tasks such as a dhikr goal show up under [[tx:dashboard.myTasks]] straight away.",
          ],
          ipucu: "If you do not want to wait and there is a share waiting in the pool, the [[tx:flow.noAssignmentPoolCta]] link appears at the bottom. You can take a share from there if you like.",
          sahne: "katil-sonraki-tur",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "What it looks like in the app",
      giris: "These screenshots are from the app itself.",
      kareler: [
        { img: "h01-home", alt: "Home screen: circle tasks in the Your Tasks section", cap: "Home: your tasks" },
        { img: "n01-halka", alt: "Circle screen: the circle's tasks in the Readings tab", cap: "Circle screen: the circle's tasks" },
        { img: "n03b-uyeler", alt: "Members tab: a guest member, the Add a guest row and the Leave circle button", cap: "Members tab (as the admin sees it): a guest member and [[tx:group.leaveGroup]]" },
        { img: "06c-event-davet", alt: "Invite card of a one-time circle: invite code, invite link and a note for people without the app", cap: "One-time circle: the link opens without the app too" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "I tapped the invite link. What happens now?",
        c: "If you have the app on your phone, the app opens and shows the invite card; you tap [[joinGroup.join]]. If you do not have the app, the invite page opens in the browser. It has the invite code and buttons to download the app. The link of a one-time circle, on the other hand, often opens the circle's own page in the browser. If the page only has the [[tx:=Invite Code]] and the store buttons, that circle needs the app; carry on from step 3." },
      { s: "I got a short code. Where do I type it?",
        c: "In the app, open the [[tabs.circles]] tab and tap [[ol:circlesTab.anonJoin]]. If you do not see this button (because you typed your name before or signed in), tap the **+** button at the top right and tap the [[tx:dashboard.joinExisting]] row. Type the code in the box and tap [[joinGroup.join]]." },
      { s: "Can I join without downloading the app?",
        c: "For a one-time circle, often yes: the link opens in the browser, and you take a juz or add to the count. For a regular circle you need the app. An older relative without a smartphone can be added by the admin as a **guest**; the person chosen to look after them, or the admin, marks their Quran share." },
      { s: "Do I need to open an account?",
        c: "No. The app only asks for your name; it does not ask for an email, password or phone number. If you like, you can later tap the [[tx:secure.banner]] strip at the top of the [[tabs.circles]] screen and link your account with Apple, Google or email. Then your circles stay with you even if you change phones." },
      { s: "I have joined. Where do I see my task?",
        c: "Under [[tx:dashboard.myTasks]] in the [[tx:tabs.home]] tab. The [[tx:group.readingsTab]] tab on the circle's screen also lists all the circle's tasks. If you joined a running khatam in the middle of a round, your share comes with the next round." },
      { s: "How do I leave a circle?",
        c: "On the circle's screen, tap the three dots at the top right. In the list that opens, tap the [[tx:group.leaveGroup]] row. The next page shows what will change. Tap [[ol:common.leave]] to leave, or [[tx:notice.stayInCircle]] to change your mind. Quran shares you have not finished are released to the pool; the others in the circle can take them from there. You can join again later with the same code if you like." },
      { s: "The invite link or code does not work. What should I do?",
        c: "If there is a problem with the link, the app says: [[tx:join.invalidLink]] If you tried with a code, it says: [[tx:joinGroup.notFoundMsg]] The code may have been typed wrongly, or the circle may no longer exist. One-time circles close when their time is up. Ask the person who sent the link for a new link or code. If the circle is full, the app says: [[tx:joinGroup.groupFull]] In that case, let the admin know." },
    ],
  },

  ilgili: ["hatim", "tek", "zikir"],
  cta: { baslik: "Download the app now", metin: "Joining a circle is free. Download the app, tap the invite link and join your circle." },
  kart: { kicker: "Joining", baslik: "Joining a circle from an invite", metin: "Tap the link or paste the code. No app? Join a one-time circle from your browser." },
  onizleme: { sahne: "katil-link", adim: 3 },
};
