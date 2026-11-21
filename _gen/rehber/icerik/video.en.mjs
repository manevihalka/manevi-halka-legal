// Verse video (EN). Format: header of _gen/build-rehber.mjs. Flow: components/quranVideo/VideoExportScreen.tsx.
// Button names come from the app via [[key]]; no long dashes, no Jawshan, no prices.
export default {
  title: "Quran verse video maker: create a video from verses",
  desc: "Turn the Quran verses you choose into a video with a reciter's voice or your own: 9:16, 4:5 or square. It is made on your phone; save it and share it.",
  h1: "How to make a video from Quran verses",
  crumb: "Verse video",
  eyebrow: "Step-by-step guide",
  lead: "In Manevi Halka you turn the verses you choose into a video with recitation and a scene. You pick a reciter or record your own voice, and you choose the format for where you will share it: full screen for stories, post or square for the feed. The video is made on your phone; then you save it or share it wherever you like.",
  meta: ["Up to 90 seconds", "Made on your phone", "Free"],
  film: { sahne: "film-video", cap: "One video from start to finish: choose the format, create, share." },

  kisa: {
    maddeler: [
      "Open the Quran from the [[tabs.read]] tab, switch to [[quranArea.tabListen]] and tap [[quranVideo.title]] on the [[tx:quranVideo.entryTitle]] card. While reading, you can also press and hold a verse and choose [[quranVideo.shareAsVideo]].",
      "Under [[tx:quranVideo.sectionRange]], pick the surah and set the range with [[tx:quranVideo.fromAyah]] and [[tx:quranVideo.toAyah]].",
      "Under [[tx:quranVideo.sectionFormat]], choose what suits the place you will share it: 9:16, 4:5 or 1:1.",
      "Under [[tx:quranVideo.sectionVoice]], choose a [[tx:quranVideo.sectionReciter]], or choose [[tx:quranVideo.voice.own]] and recite the verses yourself.",
      "Tap [[quranVideo.make]] and stay in the app while the video is prepared.",
      "Send it with [[quranVideo.share]] or keep it with [[quranVideo.saveToPhotos]]. Everything you make stays in [[tx:quranVideo.myVideos]].",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Open the video screen",
      giris: "Verse video lives in the Quran section of the app. There are two ways in; both open the same screen.",
      adimlar: [
        {
          baslik: "From the Listen tab of the Quran",
          metin: [
            "Tap the [[tabs.read]] tab in the bottom bar and open the Quran card. At the bottom of the Quran screen, a capsule holds the [[tx:quranArea.tabRead]], [[tx:quranArea.tabListen]], [[tx:quranArea.tabStudy]] and [[tx:saved.title]] tabs; switch to [[tx:quranArea.tabListen]].",
            "Below the listening scenes, tap [[quranVideo.title]] on the [[tx:quranVideo.entryTitle]] card. If you are listening to something, the video starts from the verse being recited; if not, from the first verse of the page where you left off.",
          ],
          sahne: "video-giris",
        },
        {
          baslik: "From a verse while reading",
          metin: "While reading the Quran, press and hold the verse you want in your video. Tap [[tx:quranVideo.shareAsVideo]] at the bottom of the menu that opens; the video starts from that verse.",
          ipucu: "While watching a listening scene, the share icon at the top right opens this screen too. The video starts with the scene you are watching and the verse being recited.",
          sahne: "video-ayet",
        },
      ],
    },
    {
      tur: "bolum", id: "hazirla", baslik: "Prepare your video",
      giris: "A preview of the video sits at the top of the screen. When you change an option, the preview quietly replays the first verse, so you see how the video will look before you create it.",
      adimlar: [
        {
          baslik: "Choose the verse range",
          metin: [
            "Under [[tx:quranVideo.sectionRange]], use [[ol:quranVideo.change]] next to the surah name to pick another surah. The minus and plus buttons in [[tx:quranVideo.fromAyah]] and [[tx:quranVideo.toAyah]] narrow or widen the range.",
            "Below the preview you see the approximate length and the number of verses, for example “About 0:29 · 2 verses”.",
          ],
          ipucu: "A video can be up to 90 seconds or 30 verses. For a longer passage, make several videos. WhatsApp Status takes videos up to 60 seconds; the screen reminds you when you go past that.",
          sahne: "video-aralik",
        },
        {
          baslik: "Choose the format",
          metin: "Under [[tx:quranVideo.sectionFormat]] there are three cards. Every new video opens in 9:16:",
          liste: [
            "**9:16** [[tx:quranVideo.formatName.tall]]: for stories, statuses and short videos; fills the whole screen.",
            "**4:5** [[tx:quranVideo.formatName.portrait]]: for posts in the Instagram and Facebook feeds.",
            "**1:1** [[tx:quranVideo.formatName.square]]: for a square post; looks right in every feed and chat.",
          ],
          fark: "The preview is drawn in the format you choose. In the shorter formats, the text and signature scale down to fit.",
          sahne: "video-bicim",
        },
        {
          baslik: "Choose the scene and the translation",
          metin: [
            "Under [[tx:quranScenes.sectionStyle]] you choose the look of the video: [[tx:quranScenes.styles.manzara]], [[tx:quranScenes.styles.ink]], [[tx:quranScenes.styles.kubbe]] or [[tx:quranScenes.styles.pastel]]. Just below, you pick the landscape, the colour or the picture.",
            "With [[tx:quranVideo.sectionMeal]] on, the translation appears under the verse. Turn it off and the video shows only the Arabic text.",
          ],
          ipucu: "When you pick a landscape, it downloads to your phone; until it is done, the button at the bottom shows the download percentage. You download a landscape once, then it works offline too.",
          sahne: "video-sahne",
        },
        {
          baslik: "Choose the reciter",
          metin: "Under [[tx:quranVideo.sectionVoice]], with [[tx:quranVideo.sectionReciter]] selected, use [[ol:quranVideo.change]] next to the reciter's name to pick another reciter from the list. The screen opens with the reciter you last listened to; the one you choose here applies to this video only.",
          sahne: "video-kari",
        },
        {
          baslik: "Or recite the verses in your own voice",
          metin: [
            "Tap [[tx:quranVideo.voice.own]], then the [[tx:quranVideo.voice.record]] row. On the recording screen, the verse to recite is shown in large type.",
            "Tap [[quranVideo.voice.start]] and begin reciting. Each time you finish a verse, tap [[quranVideo.voice.next]]; on the last verse the button becomes [[quranVideo.voice.finish]]. In the video, the verses change exactly where you recited them. You can listen to your recording and use [[ol:quranVideo.voice.again]] if you want another take.",
          ],
          ipucu: "The recording stays only on this phone and is used only for this video; it is deleted when you leave the video screen. If you change the verse range, you record again.",
          sahne: "video-kendi",
        },
      ],
    },
    {
      tur: "bolum", id: "paylas", baslik: "Create, save and share",
      giris: "The video is made on your phone. You decide where it goes: to a chat, to a story or just to your own gallery.",
      adimlar: [
        {
          baslik: "Create the video",
          metin: [
            "Tap [[quranVideo.make]] at the bottom of the screen. First the audio of the verses is prepared, then the video; the bar shows how much is left.",
            "Stay in the app while it is being prepared. The screen stays on; if you leave the app, preparation stops and you can start it again.",
          ],
          ipucu: "The reciter's audio comes from the internet. If the audio of these verses is already on your phone, for example because you downloaded the surah for offline listening, the video is prepared offline too.",
          sahne: "video-olustur",
        },
        {
          baslik: "Share or save",
          metin: [
            "On the [[tx:quranVideo.readyTitle]] screen the video plays with its sound. [[quranVideo.share]] opens your phone's share sheet, so you can send it to WhatsApp, Instagram or any app you like.",
            "[[quranVideo.saveToPhotos]] adds the video to Photos. On Android this button is called [[quranVideo.saveToGallery]].",
          ],
          fark: "Every video carries a small Manevi Halka signature, the reciter's name and a source line at the bottom. A video in your own voice shows no reciter name.",
          sahne: "video-paylas",
        },
        {
          baslik: "Go back to your videos",
          metin: "Every video you make goes into [[tx:quranVideo.myVideos]]. You reach the list from the button on the [[tx:quranVideo.readyTitle]] screen, from the film icon at the top right of the video screen, or from the [[tx:quranVideo.tabVideos]] section of the [[tx:saved.title]] tab in the Quran. Each row has share, save and delete buttons; tap the thumbnail to play the video.",
          ipucu: "Videos are stored on this phone and are not part of your backup; the system may remove them when space runs low. Save the ones you want to keep to Photos or your gallery.",
          sahne: "video-liste",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "What it looks like in the app",
      giris: "These are screenshots from the app itself: the same verses in three formats.",
      kareler: [
        { img: "v-video", alt: "Create video screen: Al-Mulk 1-2, 9:16 Full screen selected, verse and moon in the preview", cap: "9:16 [[tx:quranVideo.formatName.tall]]" },
        { img: "v-45", alt: "Create video screen: 4:5 Post selected, wider preview", cap: "4:5 [[tx:quranVideo.formatName.portrait]]" },
        { img: "v-11", alt: "Create video screen: 1:1 Square selected, square preview", cap: "1:1 [[tx:quranVideo.formatName.square]]" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Is making a verse video free?",
        c: "Creating, saving and sharing videos is free; only some landscapes, domes and pictures are part of Premium." },
      { s: "How long can a video be?",
        c: "A video can be up to 90 seconds or 30 verses. For a longer passage, make several videos. WhatsApp Status takes videos up to 60 seconds; the screen reminds you if you go past that." },
      { s: "Where does my own recitation go?",
        c: "The recording stays only on this phone and is used only for that video. It is deleted when you leave the video screen; the video you made stays in [[tx:quranVideo.myVideos]]." },
      { s: "What is written at the bottom of the video?",
        c: "A small Manevi Halka signature, the reciter's name and a source line (Quran data provided by Quran.Foundation). A video in your own voice shows no reciter name. On every verse, the surah name and verse number appear at the top of the scene." },
      { s: "How long do my videos stay on the phone?",
        c: "Videos are stored on this phone and are not part of your backup; the system may remove them when space runs low. Save the ones you want to keep to Photos, or to your gallery on Android. Copies you shared stay wherever you sent them." },
      { s: "Does it work on Android too?",
        c: "Yes. Verse video works on iPhone and on Android 8.0 and later. The save to gallery button appears on Android 10 and later; on older versions you send the video with [[quranVideo.share]]." },
    ],
  },

  ilgili: ["buyuk", "hatim", "defter"],
  kart: { kicker: "Quran", baslik: "Quran verse video", metin: "Make a video from the verses you choose, with a reciter or your own voice; save and share it." },
  onizleme: { sahne: "video-kart", adim: 6 },
  cta: { baslik: "Make your first verse video", metin: "Download Manevi Halka for free, open Listen in the Quran section and create your video." },
};
