// Vidéo de versets (FR). Format : en-tête de _gen/build-rehber.mjs. Parcours : components/quranVideo/VideoExportScreen.tsx.
// Les noms de boutons viennent de l'appli via [[clé]] ; pas de tiret long, pas de Jawshan, pas de prix. Tutoiement.
export default {
  title: "Vidéo de versets du Coran : crée-la pas à pas",
  desc: "Transforme les versets du Coran de ton choix en vidéo, avec la voix d'un récitateur ou la tienne : 9:16, 4:5 ou carré. Elle se prépare sur ton téléphone.",
  h1: "Comment faire une vidéo de versets du Coran ?",
  crumb: "Vidéo de versets",
  eyebrow: "Guide pas à pas",
  lead: "Dans Manevi Halka, tu transformes les versets de ton choix en vidéo, avec la récitation et une scène. Tu choisis un récitateur ou tu enregistres ta propre voix, et tu choisis le format selon l'endroit où tu partages : plein écran pour les stories, publication ou carré pour le fil. La vidéo se prépare sur ton téléphone ; ensuite tu l'enregistres ou tu la partages où tu veux.",
  meta: ["Jusqu'à 90 secondes", "Préparée sur ton téléphone", "Gratuit"],
  film: { sahne: "film-video", cap: "Une vidéo du début à la fin : choisis le format, crée, partage." },

  kisa: {
    maddeler: [
      "Ouvre le Coran depuis l'onglet [[tabs.read]], passe à [[quranArea.tabListen]] et touche [[quranVideo.title]] sur la carte [[tx:quranVideo.entryTitle]]. Pendant la lecture, tu peux aussi appuyer longuement sur un verset et choisir [[quranVideo.shareAsVideo]].",
      "Dans [[tx:quranVideo.sectionRange]], choisis la sourate et fixe la plage avec [[tx:quranVideo.fromAyah]] et [[tx:quranVideo.toAyah]].",
      "Dans [[tx:quranVideo.sectionFormat]], choisis ce qui convient à l'endroit où tu partages : 9:16, 4:5 ou 1:1.",
      "Dans [[tx:quranVideo.sectionVoice]], choisis un [[tx:quranVideo.sectionReciter]], ou choisis [[tx:quranVideo.voice.own]] et récite toi-même les versets.",
      "Touche [[quranVideo.make]] et reste dans l'appli pendant la préparation.",
      "Envoie-la avec [[quranVideo.share]] ou garde-la avec [[quranVideo.saveToPhotos]]. Tout ce que tu crées reste dans [[tx:quranVideo.myVideos]].",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Ouvrir l'écran vidéo",
      giris: "La vidéo de versets se trouve dans la partie Coran de l'appli. Deux chemins y mènent ; les deux ouvrent le même écran.",
      adimlar: [
        {
          baslik: "Depuis l'onglet Écouter du Coran",
          metin: [
            "Touche l'onglet [[tabs.read]] dans la barre du bas et ouvre la carte du Coran. En bas de l'écran du Coran, une capsule regroupe les onglets [[tx:quranArea.tabRead]], [[tx:quranArea.tabListen]], [[tx:quranArea.tabStudy]] et [[tx:saved.title]] ; passe à [[tx:quranArea.tabListen]].",
            "Sous les scènes d'écoute, touche [[quranVideo.title]] sur la carte [[tx:quranVideo.entryTitle]]. Si tu écoutes quelque chose, la vidéo part du verset récité ; sinon, du premier verset de la page où tu t'es arrêté.",
          ],
          sahne: "video-giris",
        },
        {
          baslik: "Depuis un verset pendant la lecture",
          metin: "Pendant la lecture, appuie longuement sur le verset que tu veux dans ta vidéo. Touche [[tx:quranVideo.shareAsVideo]] tout en bas du menu qui s'ouvre ; la vidéo commence à ce verset.",
          ipucu: "Dans une scène d'écoute, l'icône de partage en haut à droite ouvre aussi cet écran. La vidéo commence alors avec la scène que tu regardes et le verset en cours de récitation.",
          sahne: "video-ayet",
        },
      ],
    },
    {
      tur: "bolum", id: "hazirla", baslik: "Préparer ta vidéo",
      giris: "En haut de l'écran se trouve un aperçu de la vidéo. Quand tu changes une option, l'aperçu rejoue le premier verset sans le son ; tu vois ainsi le résultat avant de créer la vidéo.",
      adimlar: [
        {
          baslik: "Choisir la plage de versets",
          metin: [
            "Dans [[tx:quranVideo.sectionRange]], [[ol:quranVideo.change]] à côté du nom de la sourate te permet d'en choisir une autre. Les boutons moins et plus de [[tx:quranVideo.fromAyah]] et [[tx:quranVideo.toAyah]] réduisent ou élargissent la plage.",
            "Sous l'aperçu s'affichent la durée approximative et le nombre de versets, par exemple « Environ 0:29 · 2 versets ».",
          ],
          ipucu: "Une vidéo dure au plus 90 secondes ou 30 versets. Pour un passage plus long, fais plusieurs vidéos. Le statut WhatsApp accepte des vidéos de 60 secondes au plus ; l'écran te le rappelle quand tu dépasses.",
          sahne: "video-aralik",
        },
        {
          baslik: "Choisir le format",
          metin: "Dans [[tx:quranVideo.sectionFormat]], il y a trois cartes. Chaque nouvelle vidéo s'ouvre en 9:16 :",
          liste: [
            "**9:16** [[tx:quranVideo.formatName.tall]] : pour les stories, les statuts et les vidéos courtes ; remplit tout l'écran.",
            "**4:5** [[tx:quranVideo.formatName.portrait]] : pour les publications dans le fil Instagram et Facebook.",
            "**1:1** [[tx:quranVideo.formatName.square]] : pour une publication carrée ; s'affiche bien dans tous les fils et discussions.",
          ],
          fark: "L'aperçu est dessiné dans le format choisi. Dans les formats plus courts, le texte et la signature se réduisent en proportion.",
          sahne: "video-bicim",
        },
        {
          baslik: "Choisir la scène et la traduction",
          metin: [
            "Dans [[tx:quranScenes.sectionStyle]], tu choisis l'apparence de la vidéo : [[tx:quranScenes.styles.manzara]], [[tx:quranScenes.styles.ink]], [[tx:quranScenes.styles.kubbe]] ou [[tx:quranScenes.styles.pastel]]. Juste en dessous, tu choisis le paysage, la couleur ou l'image.",
            "Avec [[tx:quranVideo.sectionMeal]] activé, la traduction s'affiche sous le verset ; pour l'instant, les traductions proposées sont en turc et en anglais. Si tu la désactives, la vidéo ne montre que le texte arabe.",
          ],
          ipucu: "Quand tu choisis un paysage, il se télécharge sur ton téléphone ; en attendant, le bouton du bas affiche le pourcentage. Tu le télécharges une fois, ensuite il marche aussi hors connexion.",
          sahne: "video-sahne",
        },
        {
          baslik: "Choisir le récitateur",
          metin: "Dans [[tx:quranVideo.sectionVoice]], avec [[tx:quranVideo.sectionReciter]] sélectionné, [[ol:quranVideo.change]] à côté de son nom te permet d'en choisir un autre dans la liste. L'écran s'ouvre avec le récitateur que tu as écouté en dernier ; ton choix ici ne vaut que pour cette vidéo.",
          sahne: "video-kari",
        },
        {
          baslik: "Ou réciter les versets avec ta propre voix",
          metin: [
            "Touche [[tx:quranVideo.voice.own]], puis la ligne [[tx:quranVideo.voice.record]]. Sur l'écran d'enregistrement, le verset à réciter s'affiche en grand.",
            "Touche [[quranVideo.voice.start]] et commence. Chaque fois que tu termines un verset, touche [[quranVideo.voice.next]] ; au dernier verset, le bouton devient [[quranVideo.voice.finish]]. Dans la vidéo, les versets changent exactement là où tu les as récités. Tu peux réécouter ton enregistrement et utiliser [[ol:quranVideo.voice.again]] pour une nouvelle prise.",
          ],
          ipucu: "L'enregistrement reste uniquement sur ce téléphone et ne sert qu'à cette vidéo ; il est effacé quand tu quittes l'écran vidéo. Si tu changes la plage de versets, tu enregistres à nouveau.",
          sahne: "video-kendi",
        },
      ],
    },
    {
      tur: "bolum", id: "paylas", baslik: "Créer, enregistrer et partager",
      giris: "La vidéo se prépare sur ton téléphone. C'est toi qui décides où elle va : dans une discussion, dans une story ou seulement dans ta galerie.",
      adimlar: [
        {
          baslik: "Créer la vidéo",
          metin: [
            "Touche [[quranVideo.make]] en bas de l'écran. Le son des versets se prépare d'abord, puis la vidéo ; la barre montre ce qu'il reste.",
            "Reste dans l'appli pendant la préparation. L'écran reste allumé ; si tu quittes l'appli, la préparation s'arrête et tu peux la relancer.",
          ],
          ipucu: "Le son du récitateur vient d'internet. Si le son de ces versets est déjà sur ton téléphone, par exemple parce que tu as téléchargé la sourate pour l'écouter hors connexion, la vidéo se prépare aussi sans connexion.",
          sahne: "video-olustur",
        },
        {
          baslik: "Partager ou enregistrer",
          metin: [
            "Sur l'écran [[tx:quranVideo.readyTitle]], la vidéo se lit avec le son. [[quranVideo.share]] ouvre la fenêtre de partage de ton téléphone ; tu l'envoies sur WhatsApp, Instagram ou l'appli de ton choix.",
            "[[quranVideo.saveToPhotos]] ajoute la vidéo à Photos. Sur Android, ce bouton s'appelle [[quranVideo.saveToGallery]].",
          ],
          fark: "Chaque vidéo porte en bas une petite signature Manevi Halka, le nom du récitateur et une ligne de source. Une vidéo avec ta propre voix n'affiche pas de nom de récitateur.",
          sahne: "video-paylas",
        },
        {
          baslik: "Retrouver tes vidéos",
          metin: "Chaque vidéo que tu crées va dans [[tx:quranVideo.myVideos]]. Tu y accèdes par le bouton de l'écran [[tx:quranVideo.readyTitle]], par l'icône de film en haut à droite de l'écran vidéo, ou dans le Coran par la section [[tx:quranVideo.tabVideos]] de l'onglet [[tx:saved.title]]. Chaque ligne a des boutons pour partager, enregistrer et supprimer ; touche la miniature pour lire la vidéo.",
          ipucu: "Les vidéos sont stockées sur ce téléphone et ne font pas partie de ta sauvegarde ; le système peut les effacer quand la place manque. Enregistre dans Photos ou dans ta galerie celles que tu veux garder.",
          sahne: "video-liste",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "À quoi ça ressemble dans l'appli",
      giris: "Ces captures viennent de l'appli elle-même : les mêmes versets en trois formats.",
      kareler: [
        { img: "v-video", alt: "Écran Créer une vidéo : Al-Mulk 1-2, 9:16 Plein écran sélectionné, verset et lune dans l'aperçu", cap: "9:16 [[tx:quranVideo.formatName.tall]]" },
        { img: "v-45", alt: "Écran Créer une vidéo : 4:5 Publication sélectionné, aperçu plus large", cap: "4:5 [[tx:quranVideo.formatName.portrait]]" },
        { img: "v-11", alt: "Écran Créer une vidéo : 1:1 Carré sélectionné, aperçu carré", cap: "1:1 [[tx:quranVideo.formatName.square]]" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Faire une vidéo de versets est-il gratuit ?",
        c: "Créer, enregistrer et partager des vidéos est gratuit ; seuls certains paysages, dômes et images font partie de Premium." },
      { s: "Quelle durée peut avoir une vidéo ?",
        c: "Une vidéo dure au plus 90 secondes ou 30 versets. Pour un passage plus long, fais plusieurs vidéos. Le statut WhatsApp accepte des vidéos de 60 secondes au plus ; l'écran te le rappelle si tu dépasses." },
      { s: "Où va mon propre enregistrement ?",
        c: "L'enregistrement reste uniquement sur ce téléphone et ne sert qu'à cette vidéo. Il est effacé quand tu quittes l'écran vidéo ; la vidéo terminée reste dans [[tx:quranVideo.myVideos]]." },
      { s: "Qu'est-ce qui est écrit en bas de la vidéo ?",
        c: "Une petite signature Manevi Halka, le nom du récitateur et une ligne de source (Quran data provided by Quran.Foundation). Une vidéo avec ta propre voix n'affiche pas de nom de récitateur. Pour chaque verset, le nom de la sourate et le numéro du verset s'affichent en haut de la scène." },
      { s: "Combien de temps mes vidéos restent-elles sur le téléphone ?",
        c: "Les vidéos sont stockées sur ce téléphone et ne font pas partie de ta sauvegarde ; le système peut les effacer quand la place manque. Enregistre dans Photos, ou dans la galerie sur Android, celles que tu veux garder. Les copies partagées restent là où tu les as envoyées." },
      { s: "Est-ce que ça marche aussi sur Android ?",
        c: "Oui. La vidéo de versets fonctionne sur iPhone et sur Android 8.0 et versions suivantes. Le bouton pour enregistrer dans la galerie apparaît à partir d'Android 10 ; sur les versions plus anciennes, tu envoies la vidéo avec [[quranVideo.share]]." },
    ],
  },

  ilgili: ["buyuk", "hatim", "defter"],
  kart: { kicker: "Coran", baslik: "Vidéo de versets", metin: "Fais une vidéo des versets de ton choix, avec un récitateur ou ta propre voix ; enregistre et partage." },
  onizleme: { sahne: "video-kart", adim: 6 },
  cta: { baslik: "Fais ta première vidéo de versets", metin: "Télécharge Manevi Halka gratuitement, ouvre l'onglet Écouter du Coran et crée ta vidéo." },
};
