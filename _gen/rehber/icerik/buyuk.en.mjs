// Weekly Quran circle open to all (EN). In the app it is called bigCircle.title ("Big Circle"); headings do NOT use that name,
// the text may mention it as the name users see on screen. Flow: app/buyuk-halka.tsx, components/bigCircle/*, lib/bigCircle*.ts.
// Button names come from the app via [[key]]; no long dashes, no Jawshan, no prices.
export default {
  title: "Join an online khatm: a weekly Quran circle open to all",
  desc: "Join a weekly Quran circle open to everyone: read one page a week and add it to a shared khatm. No member list, only the circle's totals are shown.",
  h1: "How to join a weekly Quran circle open to everyone",
  crumb: "Weekly Quran circle",
  eyebrow: "Step-by-step guide",
  lead: "You can be part of a khatm even without a circle of your own. In Manevi Halka's open circle, one page comes to you each week: you read it and mark it. Your pages join everyone else's, and khatms are completed. In the app this circle is called Big Circle.",
  meta: ["About 3 minutes a week", "No name asked", "Free"],
  film: { sahne: "film-buyuk", cap: "From joining to your first page: the invitation card, a short intro, read and mark." },

  kisa: {
    maddeler: [
      "On the [[tx:bigCircle.title]] card in the [[tabs.circles]] tab, tap [[bigCircle.join]].",
      "Go through the three-page intro and tap [[bigCircle.storyJoin]]. You are not asked for your name.",
      "Each week one page comes to you; the [[tx:bigCircle.taskKicker]] card shows which page.",
      "[[bigCircle.read]] opens your page in the Quran. When you finish, tap [[hatim.markRead]].",
      "A new week starts every Friday. A share you could not read goes back to the circle by itself; nothing is left owing.",
      "From the ⋮ menu you can raise your share to 2, 5 or 10 pages, turn off the reminder or leave the circle.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "katil", baslik: "Join the circle",
      giris: "This is a Quran circle open to everyone: people from different cities and languages read the same khatm together. You do not need an invite link or a code to join.",
      adimlar: [
        {
          baslik: "Find the invitation card in the Circles tab",
          metin: [
            "Tap the [[tabs.circles]] tab in the bottom bar. If you do not have a circle yet, a large card marked [[tx:bigCircle.forEveryone]] sits at the top; it also shows how many pages the circle read this week. Tap [[bigCircle.join]].",
            "If you already have a circle, the same entry appears as a slim band above your circles.",
          ],
          ipucu: "If you removed the card from Circles, you will still find it as a row in the [[tx:read.globalTab]] section of the [[tabs.read]] tab; bring it back from there with [[tx:bigCircleCard.restore]].",
          sahne: "buyuk-bul",
        },
        {
          baslik: "Go through the short intro and join",
          metin: [
            "The first time, a short three-page intro opens: the circle is open to everyone, your share is small, the total is large. Move on with [[bigCircle.storyNext]], and on the last page tap [[bigCircle.storyJoin]].",
            "You are not asked for your name when you join. The moment you join, this week's share is ready.",
          ],
          ipucu: "To watch the intro again, tap the round icon at the top right of the circle screen.",
          sahne: "buyuk-katil",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", baslik: "Read your weekly share",
      giris: "A new week starts every Friday and one page comes to you. Your share is a reading of a few minutes; you choose when to read it.",
      adimlar: [
        {
          baslik: "See this week's task",
          metin: [
            "Your share appears as a card in the [[tx:dashboard.myTasks]] section of the [[tabs.home]] tab: which page, and how many days are left until Friday. Tap the card to open the circle screen.",
            "The [[tx:bigCircle.taskKicker]] card at the top says in one sentence what to do, for example “Read 1 page”; below it you see the page number, the surah and roughly how long it takes.",
          ],
          sahne: "buyuk-gorev",
        },
        {
          baslik: "Read and mark",
          metin: [
            "Tap [[bigCircle.read]]; the Quran opens on your page. At the end of the page, a [[hatim.markRead]] button appears at the bottom. Tap it, then tap [[hatim.markRead]] once more in the question that follows.",
            "Back on the circle screen, the task card turns into the [[tx:bigCircle.doneTitle]] card: your contribution has been added to the khatm.",
          ],
          ipucu: "If you read from a printed mushaf, just tap [[ol:bigCircle.markRead]] on the task card without opening the Quran.",
          sahne: "buyuk-oku",
        },
        {
          baslik: "Follow the khatm's progress",
          metin: "Further down the screen is the khatm ring: which khatm it is, what percentage has been read and how many pages the circle read this week. It is the same khatm as Shared Reading in the app. The [[tx:bigCircle.doneTitle]] card also shows how many of its pages are yours.",
          fark: "No member list, no ranking, no badges; only the circle's totals are shown. What stands out is the khatm completed together, not who read what.",
          ipucu: "The [[tx:bigCircle.dhikrTitle]] is optional: you add dhikr to the circle's shared counter, and it changes every Friday. If you do not want it, hide it from the ⋮ menu.",
          sahne: "buyuk-ilerleme",
        },
      ],
    },
    {
      tur: "bolum", id: "ayarlar", baslik: "Set your share and the reminder",
      giris: "The ⋮ menu on the circle screen lets you set your share, the reminder and the dhikr of the week; you can also leave the circle from there.",
      adimlar: [
        {
          baslik: "Make your share bigger or smaller",
          metin: "Tap the ⋮ icon at the top right. Under [[tx:bigCircle.menuShare]] you choose 1, 2, 5 or 10 pages; the [[ol:bigCircle.changeShare]] link on the task card opens the same menu. The change applies from next week.",
          ipucu: "If your share is 1 page and you read it three weeks in a row, the app quietly suggests reading 2 pages next week, once. If you do not want to, close it and it will not ask again.",
          sahne: "buyuk-pay",
        },
        {
          baslik: "The Thursday evening reminder",
          metin: [
            "If your share is not read yet, a single reminder comes on Thursday evening at 8 pm. If you have read it, none comes.",
            "When you first join, the app asks for notification permission for this. You can turn the reminder off and on with the [[tx:bigCircle.menuReminder]] switch in the ⋮ menu.",
          ],
          sahne: "buyuk-hatirlat",
        },
        {
          baslik: "Leave the circle",
          metin: "Tap [[tx:bigCircle.menuLeave]] at the bottom of the ⋮ menu. The window asks whether you have read any page of this week's share: mark what you read, and the rest goes straight back to the circle for someone else to read. Once you tap [[bigCircle.leaveConfirm]], no new pages come to you.",
          ipucu: "Whenever you like, come back with the [[bigCircle.rejoin]] button on the same screen.",
          sahne: "buyuk-ayril",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Who is in this circle, can I see the members?",
        c: "This circle has no member list; only totals are shown: pages read this week and khatms completed. You are not asked for your name when you join either." },
      { s: "What happens if I cannot read one week?",
        c: "When the week ends, your share goes back to the circle by itself and someone else reads it; nothing is left owing. If two weeks in a row go unread, the app asks once, [[tx:bigCircle.continueTitle]]: you can continue, take a break for a while, or, if your share is more than 1 page, bring it down to 1 page." },
      { s: "When does the week start?",
        c: "Every Friday at midnight, in your own time zone. If you join less than two days before the week ends, next week's share comes right away; you can read it straight away if you like." },
      { s: "Which khatm is this?",
        c: "The same khatm as [Shared Reading](/shared-reading/) in the app. Your pages join the readings there; when one khatm is finished, the next one begins." },
      { s: "Can I read more each week?",
        c: "Yes. In the ⋮ menu you choose 1, 2, 5 or 10 pages a week; the change applies from next week. One page takes about 2 to 3 minutes." },
      { s: "Does it cost anything?",
        c: "Joining and reading are free." },
    ],
  },

  ilgili: ["hatim", "katil", "video"],
  kart: { kicker: "Quran", baslik: "Weekly Quran circle", metin: "Join a circle open to everyone and take part in a shared khatm with one page a week." },
  onizleme: { sahne: "buyuk-kart", adim: 0 },
  cta: { baslik: "Join the weekly circle", metin: "Download Manevi Halka for free, join from the Circles tab and read your first page this week." },
};
