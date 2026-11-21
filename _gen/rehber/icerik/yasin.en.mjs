// Group 41 Yasin (EN), 21 Nov 2026; translation of yasin.tr.mjs. App: the one-time circle's "41 Yasin" template (2.1.0).
// The tradition is described neutrally and briefly: no promises of reward, no rulings, no particular days.
export default {
  title: "Group 41 Yasin: how to set up a 41 Yasin reading circle",
  desc: "Organise a group 41 Yasin for healing, a loved one who passed away or an occasion: everyone reads in the app and the count reaches 41 together.",
  h1: "How to read 41 Yasin as a group, step by step",
  crumb: "Group 41 Yasin",
  eyebrow: "Step-by-step guide",
  lead: "41 Yasin means a group reading Surah Yasin 41 times in total. Many families read it for the healing of someone who is ill, for a loved one who passed away or for a wish; the readings are shared among those taking part. The app has a ready-made template for it: you choose who it is for and until when, and send the link. Everyone reads Yasin where they are; the app only adds up the count.",
  meta: ["Set up in about 1 minute", "Yasin opens in the app", "Free"],
  film: { sahne: "film-yasin", cap: "The [[tx:eventCompose.tplYasin41]] template, who it is for, [[eventCompose.cta]], the invite and the circle screen." },

  kisa: {
    maddeler: [
      "In the [[tabs.circles]] tab, tap **+**, then the [[tx:event.createMenuTitle]] card.",
      "On the [[tx:eventCompose.pickTitle]] screen, choose the [[tx:eventCompose.tplYasin41]] template.",
      "Choose the [[tx:eventCompose.rowFor]] and [[tx:eventCompose.rowEnd]] rows, then tap [[eventCompose.cta]].",
      "Send the link to your family or WhatsApp group with [[eventCompose.invite]].",
      "Everyone taps [[eventCompose.readBtn]] on the circle screen, reads Yasin and taps [[hatim.markRead]] on the last page.",
      "When the count reaches 41, the circle completes and everyone gets a notification.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "The person who sets up the circle", baslik: "Set up the 41 Yasin circle",
      giris: "The circle is a one-time circle: it has a goal (41 readings) and an end. It completes by itself when the goal is reached.",
      adimlar: [
        {
          baslik: "Choose the 41 Yasin template",
          metin: [
            "In the [[tabs.circles]] tab, tap the **+** button at the top right and then the [[tx:event.createMenuTitle]] card in the panel that opens.",
            "On the [[tx:eventCompose.pickTitle]] screen, tap the [[tx:eventCompose.tplYasin41]] tile. The summary comes ready: what is read is [[tx:event.presetYasin]], the goal is 41 and the count is [[tx:event.modeCollective]]. Everyone's readings go into a single counter.",
          ],
          ipucu: "If there is no **+** at the top right, tap the [[ol:circlesTab.anonCreateEvent]] button in the middle; once you enter your name, the same screen opens.",
          sahne: "yasin-sablon",
        },
        {
          baslik: "Who it is for and until when",
          metin: [
            "Tap the [[tx:eventCompose.rowFor]] row. The [[tx:eventCompose.intentSifa]] chip writes “[[tx:eventCompose.intentSifaFill]]” in the box; next to it are [[tx:eventCompose.intentRuh]] and [[tx:eventCompose.intentVesile]]. You can change the wording or leave it empty.",
            "The [[tx:eventCompose.rowEnd]] row starts as [[tx:eventCompose.endDays3]]. You can also choose [[tx:eventCompose.endTonight]], [[tx:eventCompose.endFriday]], [[tx:eventCompose.endWeek]], the next blessed night or [[tx:eventCompose.endCustom]].",
          ],
          fark: "The line at the bottom of the card works out each person's share: if 10 people join, everyone reads about 5 times.",
          sahne: "yasin-kur",
        },
        {
          baslik: "Open the circle and invite",
          metin: [
            "The circle's name starts as [[tx:eventCompose.tplYasin41]]; change it if you like. Tap the [[eventCompose.cta]] button at the bottom.",
            "On the [[tx:eventCompose.readyTitle]] screen, the circle has already started. Tap [[eventCompose.invite]]: the message says who it is for, the circle's name, its end and the link with “[[tx:eventInvite.join.surah]]”.",
          ],
          ipucu: "To change the goal, tap the [[tx:compose.rowWhat]] row on the summary. You can enter another number instead of 41, or choose [[tx:event.modeIndividual]] instead of [[tx:event.modeCollective]]; then everyone reads the whole goal themselves.",
          sahne: "yasin-davet",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", rol: "Everyone who joins", baslik: "Read your part",
      giris: "Everyone reads where they are; the app only adds up the count. The circle screen shows the total and your own readings.",
      adimlar: [
        {
          baslik: "Tap Read, then mark it as read on the last page",
          metin: [
            "After you tap the link and choose [[joinGroup.join]], the circle screen opens. The top card shows who it is read for, how many readings are done and 41 beads; at the bottom you see the time left and each person's remaining share.",
            "Tap the [[eventCompose.readBtn]] button on your card. Yasin opens in the app's reader on its own pages; under the button you see the page range and the approximate reading time. On the last page, the [[hatim.markRead]] button appears. Tap it and confirm, and you're back on the circle screen with the counter one higher.",
          ],
          fark: "No need to look for a mushaf: the pages of Yasin open in the app.",
          ipucu: "If the link opens in a browser instead of the app: [Join a circle with an invite](/guides/join-a-circle/).",
          sahne: "yasin-oku",
        },
        {
          baslik: "If you read from a printed copy",
          metin: [
            "If you read Yasin from your own mushaf or from memory, tap [[tx:readTogether.markFromBook]] under the [[eventCompose.readBtn]] button and confirm. Your reading is added to the counter as one.",
            "If you read more than once, do the same after each reading. How many times you've read shows under your card.",
          ],
          ipucu: "The app asks before marking, because a confirmed reading can't be taken back off the counter.",
        },
        {
          baslik: "Without the app: count in the browser",
          metin: [
            "On the phone of someone without the app, the link opens in the browser. The page shows the [[tx:event.presetYasin]] line, the total and an [[=Add to the count]] button.",
            "Read Yasin from your own mushaf. Then tap [[=Add to the count]], tap the big circle once for each Yasin you read, and tap [[=Add my count]]. Your count is added to the circle's total.",
          ],
          fark: "No account needed; the link is enough.",
          ipucu: "This works only with a [[tx:event.modeCollective]] count. In a circle set to [[tx:event.modeIndividual]], the browser shows [[=For circle members]].",
          sahne: "yasin-web",
        },
      ],
    },
    {
      tur: "ikili", id: "tamam", rol: "Everyone", baslik: "When it reaches 41",
      giris: "The moment the counter reaches 41, the circle completes by itself; it doesn't matter who added the last reading.",
      kartlar: [
        {
          baslik: "The circle completes",
          metin: [
            "All the beads on the top card fill up. If the screen is open, a short message says the circle is complete; people who closed the app get a notification.",
            "The [[=See the result]] button shows the circle's total and your own contribution. The circle is deleted 24 hours after the end; the result stays under [[tx:tabs.profile]] › [[=My Journey]].",
          ],
          sahne: "yasin-tamam",
        },
        {
          baslik: "If time runs short, or to read again",
          metin: [
            "If the end is near and 41 hasn't been reached, the organiser chooses [[tx:event.extend24h]] from the **···** menu on the circle screen; the end moves 24 hours later and everyone keeps reading.",
            "To read again with the same intention, the organiser taps [[=Set up this circle again]] in the result. Setup opens with the same goal, name and who it is for; only the end is chosen again.",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ornek", baslik: "Example: 41 Yasin with the intention of healing",
      giris: "The screenshots below are from the app. The circle is set up “With the intention of healing for our sick” and runs until the next blessed night.",
      kareler: [
        { img: "ev-ozet", alt: "Summary screen: the This circle card with 41 together, For whom with the intention of healing, Until when until Laylat al-Raghaib", cap: "Everything on one screen, with each person's share" },
        { img: "ev-bitis", alt: "Until when sheet: Tonight, By Friday, 3 days, 1 week, Until Laylat al-Raghaib and Another time", cap: "End chips: from tonight to the next blessed night" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "What is 41 Yasin?",
        c: "41 Yasin means a group reading Surah Yasin 41 times in total. The readings are shared among those taking part; a few people read a few times each until 41 is reached. It is often read for the healing of someone who is ill, for a loved one who passed away or for a wish." },
      { s: "How do you read 41 Yasin as a group?",
        c: "In the app, tap **+** in the [[tabs.circles]] tab, then the [[tx:event.createMenuTitle]] card and the [[tx:eventCompose.tplYasin41]] template. Choose the [[tx:eventCompose.rowFor]] and [[tx:eventCompose.rowEnd]] rows, tap [[eventCompose.cta]] and send the link. Everyone reads Yasin with the [[eventCompose.readBtn]] button on the circle screen; when the counter reaches 41, the circle completes." },
      { s: "Do we need 41 people?",
        c: "Not in the app. The counter counts readings, not people: if 10 people join, everyone reads about 4 or 5 times. The line at the bottom of the circle card shows each person's remaining share." },
      { s: "How do I add a reading from my own mushaf to the counter?",
        c: "On the circle screen, tap [[tx:readTogether.markFromBook]] and confirm; your reading is added to the counter. If you read in the app's reader, the [[hatim.markRead]] button on the last page does the same." },
      { s: "Can people without the app join?",
        c: "Yes. Whoever opens the link in a browser counts their readings with the [[=Add to the count]] button and taps [[=Add my count]]; no account is needed. This works when the count is [[tx:event.modeCollective]]." },
      { s: "Does it cost anything?",
        c: "Setting up and joining a 41 Yasin circle is free. With a free account you can run one one-time circle at a time; when it completes or is deleted, you can set up the next." },
    ],
  },

  ilgili: ["tek", "zikir", "katil"],
  kart: { kicker: "Reading together", baslik: "Group 41 Yasin", metin: "A 41 Yasin circle for healing, a loved one or an occasion; everyone reads in the app until it reaches 41." },
  onizleme: { sahne: "yasin-kart", adim: 14 },
};
