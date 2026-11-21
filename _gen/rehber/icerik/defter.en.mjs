// My dua journal (EN). Format: header of _gen/build-rehber.mjs. Flow from code: app/dua-defteri*.tsx, app/prophetic-duas.tsx,
// components/duas/*, lib/duaDefter*.ts. Button names via [[key]]; no em dash, no Jawshan, no promise of reward.
export default {
  title: "Dua journal: write, organize and remember your duas",
  desc: "Keep your dua list in My dua journal: write your duas in sections, add verses, duas and Divine Names, set reminders and share your journal as a PDF.",
  h1: "How to keep a dua journal: My dua journal step by step",
  crumb: "My dua journal",
  eyebrow: "Step-by-step guide",
  lead: "My dua journal is where you write your own duas and your duas for the people you love. You write them in sections, add a verse, a ready dua or one of the Divine Names, set a reminder for your reading time and share your journal as a PDF.",
  meta: ["No setup needed", "Your journal stays on your phone", "Free"],
  film: { sahne: "film-defter", cap: "Open your journal from Duas, write a dua in My loved ones, then read it." },

  kisa: {
    maddeler: [
      "On the [[tabs.read]] tab, tap the [[tx:read.duasTitle]] card, then choose the [[tx:duaDefter.title]] row.",
      "Add a dua with the **+** at the top right: choose the section, write who it is for if you like, write your dua and tap [[duaDefter.save]].",
      "In Duas, in the Qur'an reader or in the list of Divine Names, use [[tx:duaDefter.addFromDua]] to bring a ready text into your journal.",
      "Use [[ol:duaDefter.read]] next to a section to read your duas one after another in large text; at the end, tap [[duaDefter.markPrayed]].",
      "Set a [[tx:duaDefter.remind]] from a section's three dots; it reminds you to read on the days and at the time you choose.",
      "Tap the print icon and send your journal or one section with [[tx:duaDefter.pdfShare]].",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Open your journal",
      giris: "My dua journal opens from inside the [[tx:read.duasTitle]] screen; it is not a separate tab.",
      adimlar: [
        {
          baslik: "Open My dua journal from the Duas screen",
          metin: [
            "Tap the [[tabs.read]] tab in the bar at the bottom and open the [[tx:read.duasTitle]] card. Below the search box and the [[tx:propheticDuas.halTitle]] ring is the [[tx:duaDefter.title]] row. Tap it.",
            "Your journal comes with ready sections: [[tx:duaDefter.section.namaz]], [[tx:duaDefter.section.sabah]], [[tx:duaDefter.section.seher]], [[tx:duaDefter.section.yolculuk]], [[tx:duaDefter.section.cuma]], [[tx:duaDefter.section.kadir]] and [[tx:duaDefter.section.sevdiklerim]]. The first time, they are all empty.",
          ],
          ipucu: "The journal also meets you at prayer times: when you mark a prayer in [[tx:prayerDetail.title]] or finish the prayer tasbihat, a row opens the [[tx:duaDefter.section.namaz]] section. Marking tahajjud opens [[tx:duaDefter.section.seher]]. If the section is empty, the row does not appear.",
          sahne: "defter-ac",
        },
      ],
    },
    {
      tur: "bolum", id: "yaz", baslik: "Write your duas",
      giris: "You can write a dua in your own words or bring a ready text from the app into your journal.",
      adimlar: [
        {
          baslik: "Add a dua",
          metin: "Tap the **+** at the top right or the **+** next to a section. Fill in the window that opens and tap [[duaDefter.save]]:",
          liste: [
            "[[tx:duaDefter.sectionLabel]]: the section the dua goes into.",
            "[[tx:duaDefter.forLabel]]: “My mother”, “my brother Ali” and so on. You can leave it empty.",
            "[[tx:duaDefter.textLabel]]: write your dua in your own words, or bring in a text you copied with [[tx:duaDefter.paste]].",
            "[[tx:duaDefter.moreFields]]: if you like, add the dua's Arabic, its transliteration and its meaning.",
          ],
          ipucu: "Tap a dua to edit it: change its section, move it up or down, or share it. Press and hold to delete it; the app asks first, and right after deleting you can bring it back with [[tx:notice.undo]].",
          sahne: "defter-yaz",
        },
        {
          baslik: "Add verses, duas and Divine Names",
          metin: [
            "You do not have to type a ready text. When you open a dua on the [[tx:read.duasTitle]] screen, tap [[tx:duaDefter.addFromDua]] among the buttons below it. The same option is in the window that opens when you tap a verse in the Qur'an reader, and in the list of the Divine Names (Asma al-Husna).",
            "The app asks [[tx:duaDefter.pickSection]]; choose the section. The text is added to your journal with its source.",
          ],
          ipucu: "The same text is not added to the same section twice; if it is already there, that section's row says [[tx:duaDefter.inDefter]].",
          sahne: "defter-ekle",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", baslik: "Read, remember, share",
      giris: "The journal is as much for praying as for writing: you read a section from start to end and set a reminder for your reading time.",
      adimlar: [
        {
          baslik: "Start reading, then tap I prayed today",
          metin: [
            "Next to a section with duas in it is the [[ol:duaDefter.read]] button. Tap it: the section's duas open one below the other in large text. Verses and ready duas also show their Arabic, meaning and source.",
            "The **A** buttons at the bottom make the text smaller or larger; [[tx:duaDefter.autoScroll]] scrolls the page at your pace. At the end, tap [[duaDefter.markPrayed]].",
          ],
          fark: "Each day you pray, a bead is added to the string of prayer beads at the top of your journal. The journal also remembers your place: when you open a section again, it starts from the dua you read last.",
          ipucu: "At the end of [[tx:duaDefter.section.sevdiklerim]], the names of the people who entrusted you with their prayers are shown as well; when you tap [[duaDefter.markPrayed]], they are marked too.",
          sahne: "defter-oku",
        },
        {
          baslik: "Edit a section, set a reminder",
          metin: [
            "Tap the three dots next to a section. In the window that opens you can rename it, move it up or down, delete it or set a [[tx:duaDefter.remind]].",
            "Turn the reminder on, choose [[tx:duaDefter.remindEveryDay]] or certain days, set the time and tap [[duaDefter.save]]. The section then shows [[tx:duaDefter.remindOn]]. The notification only says “The duas you set aside for today are waiting for you.”",
          ],
          ipucu: "If you delete a section, its duas move to [[tx:duaDefter.section.other]]. To open your own section, tap [[ol:duaDefter.newSection]] at the bottom of the list.",
          sahne: "defter-hatirlat",
        },
        {
          baslik: "Share as a PDF or print",
          metin: "Tap the print icon at the top right. In the [[tx:duaDefter.pdfTitle]] window, choose [[tx:duaDefter.pdfAll]] or a single section, then tap [[duaDefter.pdfShare]] or [[ol:duaDefter.pdfPrint]]. The page is made in large text, on your phone.",
          ipucu: "If some duas have a “for whom” name, the [[tx:duaDefter.pdfNames]] switch appears. It starts off; names go into the PDF only if you turn it on.",
          sahne: "defter-pdf",
        },
      ],
    },
    {
      tur: "ikili", id: "gecmis", baslik: "Answered duas, prayers entrusted to you",
      giris: "The journal has two more corners: a memory of the duas that were answered, and the list of people who asked you to pray for them.",
      kartlar: [
        { baslik: "My past duas", metin: "Tap a dua and choose [[tx:duaDefter.archive]]. If you like, write a short note, for example “Alhamdulillah, my mother has recovered.” The dua leaves its section and stays under [[tx:duaDefter.past]] with its date; you can bring it back whenever you want." },
        { baslik: "Prayers entrusted to me", metin: "When someone asks you to pray for them, write their name in the [[tx:emanet.title]] list. It opens from the bottom of the journal; you are reminded when you finish your wird and at the dua moment of your tasbihat." },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "What it looks like in the app",
      giris: "This screenshot comes from the app itself.",
      kareler: [
        { img: "z-defter", alt: "My dua journal: the string of prayer beads, You prayed today, the After prayer and Morning sections with Start reading buttons", cap: "[[tx:duaDefter.title]]: the prayer beads and the sections" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Where is my dua journal kept?",
        c: "Your journal stays on this phone, and only you see it. To share a dua, tap it and choose [[tx:duaDefter.share]]; you can send the whole journal as a PDF." },
      { s: "If I change phones, does my journal come with me?",
        c: "The journal is kept only on this phone and does not sync with your account. Before you change phones, send it to yourself with [[tx:duaDefter.pdfShare]] and keep it." },
      { s: "How many duas can I write?",
        c: "You can write up to 300 duas and open up to 30 sections." },
      { s: "How do I add a dua in Arabic?",
        c: "When adding a dua, tap [[tx:duaDefter.moreFields]]; you write the Arabic, the transliteration and the meaning in separate boxes. For verses and the ready duas in the app you do not need to type anything: add them with [[tx:duaDefter.addFromDua]]." },
      { s: "Can I link My dua journal to the Garden of Intentions?",
        c: "Yes. If you plant a dua intention in the Garden of Intentions, the days you pray from your journal and the days you mark that you prayed for those who entrusted you with their prayers are counted. Details: [Garden of Intentions](/guides/garden-of-intentions/)." },
      { s: "Does it cost anything?",
        c: "All features of My dua journal are free." },
    ],
  },

  ilgili: ["bahce", "teheccud", "zikir"],
  kart: { kicker: "Dua", baslik: "My dua journal", metin: "Write your duas in sections, add verses and Divine Names, set reminders, share as a PDF." },
  onizleme: { sahne: "defter-kart", adim: 8 },
  cta: { baslik: "Start your dua journal", metin: "Download Manevi Halka for free and open My dua journal from Duas on the Read screen." },
};
