// Garden of Intentions (EN). Format: header of _gen/build-rehber.mjs. Flow from code: app/bahce/*, components/garden/*, lib/garden/*.
// Button names come from the app via [[key]]; no em dash, no Jawshan, no promise of reward.
export default {
  title: "Garden of Intentions: plant an intention, grow a habit",
  desc: "In the Garden of Intentions each intention becomes a sapling. Pick a small step for Qur'an, prayer, dhikr or charity, keep it up and watch it grow.",
  h1: "How to use the Garden of Intentions: plant an intention and watch it grow",
  crumb: "Garden of Intentions",
  eyebrow: "Step-by-step guide",
  lead: "The Garden of Intentions is where you choose a small, steady step for your own worship. Each intention becomes a sapling that grows as you keep it. Only you can see your garden, and if you need a break, your garden waits for you.",
  meta: ["First intention in about 1 minute", "Only you see your garden", "Free"],
  film: { sahne: "film-bahce", cap: "A first intention: choose Qur'an reading, two pages a day, and plant your sapling." },

  kisa: {
    maddeler: [
      "Open the [[tabs.read]] tab and tap the [[tx:garden.name]] card. The first time, a short introduction opens.",
      "Tap [[garden.plant]]. Pick a ready example or a deed under [[tx:garden.flow.already]].",
      "Choose how often and at least how much you will do, then tap [[common.continue]].",
      "Choose your sapling, write your intention in one sentence if you like, and tap [[garden.flow.plantBtn]].",
      "Take your step from the [[tx:garden.today]] list each day. Pages you read, prayers you mark and dhikr you count in the app are counted on their own.",
      "If you need a break, use [[tx:garden.rest.title]]; your plants do not fade on those days.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Open your garden",
      giris: "The Garden of Intentions is one of the cards on the [[tx:tabs.read]] screen. It is for your own worship; you do not need a circle.",
      adimlar: [
        {
          baslik: "Open the Garden of Intentions from the Read screen",
          metin: [
            "Tap the [[tabs.read]] tab in the bar at the bottom. Find the [[tx:garden.name]] card among the cards; since it is new, its corner says [[tx:garden.newTag]]. Tap the card.",
            "The first time, a short three-page introduction opens. Move on with [[common.continue]]; the [[garden.firstPlant]] button on the last page takes you straight to planting. You can also skip it with [[ol:garden.introScreen.skip]] at the top.",
          ],
          ipucu: "After that, the card opens the [[tx:garden.list.title]] list. To reach the garden itself, tap the picture at the top of the list where it says [[tx:garden.list.enter]].",
          sahne: "bahce-ac",
        },
      ],
    },
    {
      tur: "bolum", id: "dik", baslik: "Plant your first intention",
      giris: "Planting an intention takes three steps: which deed, how often, which sapling.",
      adimlar: [
        {
          baslik: "Choose the deed",
          metin: "Tap [[garden.plant]]. The first screen asks [[tx:garden.flow.step1]] and shows three groups:",
          liste: [
            "[[tx:garden.example.title]]: three ready intentions. Tap one and its settings are filled in, so you go straight to choosing a sapling.",
            "[[tx:garden.flow.already]]: Qur'an reading, prayer, dhikr, wird, memorization, book reading, make-up prayers, make-up fasts and prayer tasbihat. If you do these in the app, the garden reads your record from there.",
            "[[tx:garden.flow.new]]: fasting, charity, reading from a printed mushaf and dua. At the bottom, [[tx:garden.free.custom]] lets you name your own intention.",
          ],
          sahne: "bahce-sec",
        },
        {
          baslik: "Choose how often and at least how much",
          metin: [
            "Under [[tx:garden.flow.rhythmLabel]], choose [[tx:garden.rhythm.daily]], [[tx:garden.rhythm.days]] or [[tx:garden.rhythm.weekly]]. Then set the minimum step: pages for Qur'an reading, prayers for prayer, a count for dhikr. Qur'an reading starts at 2 pages a day.",
            "Tap [[common.continue]].",
          ],
          ipucu: "Keep it small. As the screen says, on days you have more time, the extra counts too.",
          sahne: "bahce-ritim",
        },
        {
          baslik: "Choose your sapling and plant it",
          metin: [
            "In the last step the sapling suggested for the deed is already selected; for Qur'an reading it is [[tx:garden.kind.turunc]]. You can pick another kind from the strip below, or see them all with [[tx:garden.flow.allKinds]].",
            "If you like, write your intention in one sentence in the [[tx:garden.flow.textLabel]] box; only you can see it. Tap [[garden.flow.plantBtn]] and your sapling takes its place in the garden.",
          ],
          fark: "Each sapling's card has a [[tx:garden.about.title]] section: a verse or hadith that mentions the plant, or a detail of how it was created.",
          ipucu: "After your first intention, the app offers an evening reminder once: if the day's intention is not done, a short reminder comes at 21:00. You can change the time or turn it off with the [[tx:garden.reminder.title]] icon in the garden.",
          sahne: "bahce-fidan",
        },
      ],
    },
    {
      tur: "bolum", id: "buyut", baslik: "Grow your garden",
      giris: "Below the garden sits the [[tx:garden.today]] list: the intentions due today and how many are done.",
      adimlar: [
        {
          baslik: "Take your step from the Today list",
          metin: [
            "For an intention with no counterpart in the app, charity for example, tap [[garden.act.didToday]]. The row is checked and your sapling grows right there.",
            "For an intention linked to a deed, the button says [[ol:common.continue]] and takes you to that screen: the Qur'an reader, [[tx:prayerDetail.title]] or [[tx:read.zikirmatikTitle]]. What you do there is counted on its own; you do not need to mark it again.",
          ],
          ipucu: "The garden's day turns at Fajr time (imsak). Dhikr you count or pages you read after midnight go to the previous day.",
          sahne: "bahce-bugun",
        },
        {
          baslik: "Link your make-up prayers and your duas",
          metin: [
            "If you choose the [[tx:garden.src.kaza]] tile under [[tx:garden.flow.already]], the intention is linked to [[tx:kaza.titleN]]: every make-up prayer you note on the same day also counts in the garden. If your tracker is not set up yet, the screen shows [[tx:garden.link.kazaSetup]]; set it up, come back, and the intention links itself.",
            "[[tx:garden.src.kazaOruc]] links to [[tx:kaza.titleO]] the same way. A dua intention counts from [[tx:duaDefter.title]]: the days you pray from your journal and the days you mark that you prayed for those who entrusted you with their prayers.",
          ],
          ipucu: "For make-up prayers and dua you can also plant without setting up; then you mark the intention yourself with [[garden.act.didToday]]. To set up the make-up tracker: [Make-up prayers and fasts](/guides/make-up-prayers-and-fasts/).",
          sahne: "bahce-bag",
        },
        {
          baslik: "How your sapling grows",
          metin: [
            "When you keep your intention steadily, the sapling matures in about forty days, whatever the rhythm. Every week you keep without a gap, new flowers open at its foot; after six weeks, fruit trees bear fruit.",
            "On a day you miss, the sapling keeps its height. First it droops, and if you miss longer it fades; the day you take the minimum step, it comes back to life.",
          ],
          fark: "Your tree's state is told in words, like “The first flowers have opened at its foot.” or “It is bearing fruit.” The number of days in [[tx:garden.list.title]] shows the days you completed and never goes down.",
          sahne: "bahce-buyume",
        },
      ],
    },
    {
      tur: "bolum", id: "ara", baslik: "Take a break, pick up where you left off",
      giris: "Illness, travel and other times when you cannot keep up happen to everyone. The garden has a break button for that.",
      adimlar: [
        {
          baslik: "When you need a break",
          metin: [
            "Tap the pause icon at the top of the garden; the [[tx:garden.rest.title]] window opens. Choose the length ([[tx:garden.today]], 3, 7, 14 or 30 days), tick the intentions to pause and tap [[garden.rest.confirm]].",
            "No reason is asked. On the days you pause, your plants do not fade; when you return, they carry on where they were. To come back early, tap [[ol:garden.rest.end]] above the [[tx:garden.today]] list.",
          ],
          ipucu: "To pause a single intention, tap its tree and choose [[tx:garden.menu.rest]] from the three dots on its card.",
          sahne: "bahce-ara",
        },
        {
          baslik: "The fortieth day",
          metin: "When you have kept an intention for forty days, that tree's moment plays in the garden and the [[tx:garden.forty.title]] card opens. It shows verse 142 of Surah Al-A'raf and a short note: the term of Musa (peace be upon him) with his Lord was completed in forty nights. For weekly intentions this moment comes in the sixth week.",
          sahne: "bahce-kirk",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "What it looks like in the app",
      giris: "These screenshots come from the app itself. In the app, the garden is drawn as a three-dimensional tiled courtyard.",
      kareler: [
        { img: "b-niyetler", alt: "My intentions: a picture of the garden, Enter your garden, and the intention rows", cap: "[[tx:garden.list.title]]: the way into the garden" },
        { img: "b-dik", alt: "Plant an intention: For which deed? Example intentions and What you already do tiles", cap: "The first step of planting" },
        { img: "b-bahce", alt: "A ring-shaped tiled garden under a night sky, with the Today list below", cap: "The garden and the [[tx:garden.today]] list" },
        { img: "b-kirk", alt: "The fortieth day card: Surah Al-A'raf, verse 142", cap: "The fortieth day card" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Can other people see my garden?",
        c: "Only you can see your garden. If you have an account, your garden syncs with it and comes along when you change phones. The sentences you write for your intentions and the names you give them reach your other devices only if you turn on [[tx:garden.words.title]]." },
      { s: "If I miss a day, will my tree die?",
        c: "It will not. It never loses its height; as you miss days it first droops, then fades, and after a very long gap it goes into winter. The day you take the minimum step, it comes back. For breaks you know about in advance, use [[tx:garden.rest.title]]; your plants do not fade at all on those days." },
      { s: "I read the Qur'an in the app. Do I need to mark it as well?",
        c: "No. Intentions chosen under [[tx:garden.flow.already]] read your record in the app: pages you read in the reader, prayers you mark in [[tx:prayerDetail.title]], dhikr you count on the counters. If you read from a printed mushaf, plant a [[tx:garden.free.mushaf]] intention and mark it with [[garden.act.didToday]]." },
      { s: "How many intentions can I plant?",
        c: "The courtyard starts with room for ten saplings; as it fills, room for four more opens, then four more. Your garden holds up to eighteen saplings." },
      { s: "I picked the wrong sapling. Can I change it?",
        c: "A planted sapling keeps its kind. Tap its tree, choose [[tx:garden.menu.uproot]] from the three dots on its card and plant it again. Your records in the tools (reading, dhikr, prayer) stay where they are." },
      { s: "Does it cost anything?",
        c: "Planting, keeping and pausing intentions in the Garden of Intentions is free." },
    ],
  },

  ilgili: ["kaza", "teheccud", "defter"],
  kart: { kicker: "Intention", baslik: "Garden of Intentions", metin: "Each intention becomes a sapling that grows as you keep it. Only you can see your garden." },
  onizleme: { sahne: "bahce-kart", adim: 13 },
  cta: { baslik: "Plant your first intention", metin: "Download Manevi Halka for free and open the Garden of Intentions from the Read screen." },
};
