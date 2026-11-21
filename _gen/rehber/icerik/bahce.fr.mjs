// Jardin des intentions (FR). Format : en-tête de _gen/build-rehber.mjs. Parcours d'après le code : app/bahce/*, components/garden/*, lib/garden/*.
// Les boutons viennent de l'appli via [[clé]] ; pas de tiret cadratin, pas de Jawshan, pas de promesse de récompense.
export default {
  title: "Jardin des intentions : planter une intention, tenir bon",
  desc: "Au Jardin des intentions, chaque intention devient un jeune plant. Choisis un petit pas pour le Coran, la prière, le dhikr ou l'aumône et vois-le grandir.",
  h1: "Jardin des intentions : planter une intention et la voir grandir",
  crumb: "Jardin des intentions",
  eyebrow: "Guide pas à pas",
  lead: "Le Jardin des intentions est l'endroit où tu choisis un petit pas régulier pour ton adoration personnelle. Chaque intention devient un jeune plant qui grandit à mesure que tu la tiens. Toi seul vois ton jardin, et si tu as besoin d'une pause, ton jardin t'attend.",
  meta: ["Première intention en 1 minute environ", "Toi seul vois ton jardin", "Gratuit"],
  film: { sahne: "film-bahce", cap: "Une première intention : choisis la lecture du Coran, deux pages par jour, et plante ton jeune plant." },

  kisa: {
    maddeler: [
      "Dans l'appli, ouvre l'onglet [[tabs.read]] et touche la carte [[tx:garden.name]]. La première fois, une courte présentation s'ouvre.",
      "Touche [[garden.plant]]. Choisis un exemple tout prêt ou une œuvre dans [[tx:garden.flow.already]].",
      "Choisis à quelle fréquence et au moins combien tu feras, puis touche [[common.continue]].",
      "Choisis ton jeune plant, écris si tu veux ton intention en une phrase et touche [[garden.flow.plantBtn]].",
      "Chaque jour, fais ton pas depuis la liste [[tx:garden.today]]. Les pages lues, les prières notées et le dhikr compté dans l'appli sont comptés tout seuls.",
      "Si tu as besoin d'une pause, utilise [[tx:garden.rest.title]] ; ces jours-là, tes plantes ne fanent pas.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Ouvre ton jardin",
      giris: "Le Jardin des intentions est l'une des cartes de l'écran [[tx:tabs.read]]. Il sert à ton adoration personnelle ; pas besoin de cercle.",
      adimlar: [
        {
          baslik: "Ouvre le Jardin des intentions depuis l'écran Lire",
          metin: [
            "Touche l'onglet [[tabs.read]] dans la barre du bas. Trouve la carte [[tx:garden.name]] parmi les cartes ; comme elle est nouvelle, son coin indique [[tx:garden.newTag]]. Touche la carte.",
            "La première fois, une courte présentation de trois pages s'ouvre. Avance avec [[common.continue]] ; le bouton [[garden.firstPlant]] de la dernière page t'emmène directement à la plantation. Tu peux aussi la passer avec [[ol:garden.introScreen.skip]] en haut.",
          ],
          ipucu: "Ensuite, la carte ouvre la liste [[tx:garden.list.title]]. Pour entrer dans le jardin lui-même, touche l'image en haut de la liste, là où est écrit [[tx:garden.list.enter]].",
          sahne: "bahce-ac",
        },
      ],
    },
    {
      tur: "bolum", id: "dik", baslik: "Plante ta première intention",
      giris: "Planter une intention se fait en trois étapes : quelle œuvre, à quelle fréquence, quel jeune plant.",
      adimlar: [
        {
          baslik: "Choisis l'œuvre",
          metin: "Touche [[garden.plant]]. Le premier écran demande [[tx:garden.flow.step1]] et montre trois groupes :",
          liste: [
            "[[tx:garden.example.title]] : trois intentions toutes prêtes. Touche-en une et ses réglages sont remplis ; tu passes directement au choix du jeune plant.",
            "[[tx:garden.flow.already]] : lecture du Coran, prière, dhikr, wird, mémorisation, lecture de livres, prières de rattrapage, jeûnes de rattrapage et tasbihat de la prière. Si tu les fais dans l'appli, le jardin lit ton suivi là-bas.",
            "[[tx:garden.flow.new]] : jeûne, aumône, lecture dans un mushaf imprimé et invocation. Tout en bas, [[tx:garden.free.custom]] te permet de nommer ta propre intention.",
          ],
          sahne: "bahce-sec",
        },
        {
          baslik: "Choisis la fréquence et le minimum",
          metin: [
            "Sous [[tx:garden.flow.rhythmLabel]], choisis [[tx:garden.rhythm.daily]], [[tx:garden.rhythm.days]] ou [[tx:garden.rhythm.weekly]]. Règle ensuite le pas minimum : des pages pour la lecture du Coran, des prières pour la prière, un nombre pour le dhikr. Pour la lecture du Coran, 2 pages par jour sont proposées.",
            "Touche [[common.continue]].",
          ],
          ipucu: "Garde-le petit. Comme le dit l'écran, les jours où tu as plus de temps, le surplus compte aussi.",
          sahne: "bahce-ritim",
        },
        {
          baslik: "Choisis ton jeune plant et plante-le",
          metin: [
            "À la dernière étape, le jeune plant suggéré pour l'œuvre est déjà choisi ; pour la lecture du Coran : [[tx:garden.kind.turunc]]. Tu peux choisir une autre espèce dans la bande en dessous, ou toutes les voir avec [[tx:garden.flow.allKinds]].",
            "Si tu veux, écris ton intention en une phrase dans le champ [[tx:garden.flow.textLabel]] ; toi seul la vois. Touche [[garden.flow.plantBtn]] : ton jeune plant prend sa place dans le jardin.",
          ],
          fark: "La carte de chaque jeune plant contient une partie [[tx:garden.about.title]] : un verset ou un hadith où la plante est citée, ou une finesse de sa création.",
          ipucu: "Après ta première intention, l'appli propose une fois un rappel du soir : si l'intention du jour n'est pas faite, un court rappel arrive à 21 h. Tu changes l'heure ou tu le coupes avec l'icône [[tx:garden.reminder.title]] dans le jardin.",
          sahne: "bahce-fidan",
        },
      ],
    },
    {
      tur: "bolum", id: "buyut", baslik: "Fais grandir ton jardin",
      giris: "Sous le jardin se trouve la liste [[tx:garden.today]] : les intentions prévues aujourd'hui et combien sont faites.",
      adimlar: [
        {
          baslik: "Fais ton pas depuis la liste Aujourd'hui",
          metin: [
            "Pour une intention sans équivalent dans l'appli, l'aumône par exemple, touche [[garden.act.didToday]]. La ligne est cochée et ton jeune plant grandit aussitôt.",
            "Pour une intention liée à une œuvre, le bouton indique [[ol:common.continue]] et t'emmène vers cet écran : le lecteur du Coran, [[tx:prayerDetail.title]] ou [[tx:read.zikirmatikTitle]]. Ce que tu y fais est compté tout seul ; pas besoin de le cocher en plus.",
          ],
          ipucu: "La journée du jardin change à l'heure du Fajr (imsak). Le dhikr ou les pages après minuit comptent pour la veille.",
          sahne: "bahce-bugun",
        },
        {
          baslik: "Relie tes prières de rattrapage et tes invocations",
          metin: [
            "Si tu choisis la tuile [[tx:garden.src.kaza]] dans [[tx:garden.flow.already]], l'intention est reliée à [[tx:kaza.titleN]] : chaque prière rattrapée notée le jour même compte aussi dans le jardin. Si ton suivi n'est pas encore configuré, l'écran affiche [[tx:garden.link.kazaSetup]] ; configure-le, reviens, et l'intention se relie toute seule.",
            "[[tx:garden.src.kazaOruc]] se relie de la même façon à [[tx:kaza.titleO]]. Une intention d'invocation compte depuis [[tx:duaDefter.title]] : les jours où tu pries avec ton carnet et ceux où tu notes avoir prié pour les invocations qu'on t'a confiées.",
          ],
          ipucu: "Pour les prières de rattrapage et l'invocation, tu peux aussi planter sans rien configurer ; tu coches alors l'intention toi-même avec [[garden.act.didToday]]. Pour configurer le suivi : [Prières et jeûnes de rattrapage](/fr/guides/prieres-et-jeunes-de-rattrapage/).",
          sahne: "bahce-bag",
        },
        {
          baslik: "Comment grandit ton jeune plant",
          metin: [
            "Quand tu tiens ton intention avec régularité, le jeune plant arrive à maturité en quarante jours environ, quel que soit le rythme. Chaque semaine tenue sans manque, de nouvelles fleurs s'ouvrent à son pied ; après six semaines, les arbres fruitiers donnent des fruits.",
            "Un jour manqué, le jeune plant garde sa hauteur. D'abord il penche la tête, et si tu manques plus longtemps il fane ; le jour où tu fais le pas minimum, il reprend vie.",
          ],
          fark: "L'état de ton arbre est dit avec des mots, comme « Les premières fleurs se sont ouvertes à son pied. » ou « Elle porte des fruits. » Le nombre de jours dans [[tx:garden.list.title]] montre les jours accomplis et ne baisse jamais.",
          sahne: "bahce-buyume",
        },
      ],
    },
    {
      tur: "bolum", id: "ara", baslik: "Fais une pause, reprends où tu en étais",
      giris: "Maladie, voyage et autres moments où l'on ne peut pas suivre arrivent à tout le monde. Le jardin a un bouton de pause pour cela.",
      adimlar: [
        {
          baslik: "Quand tu as besoin d'une pause",
          metin: [
            "Touche l'icône de pause en haut du jardin ; la fenêtre [[tx:garden.rest.title]] s'ouvre. Choisis la durée ([[tx:garden.today]], 3, 7, 14 ou 30 jours), coche les intentions à mettre en pause et touche [[garden.rest.confirm]].",
            "Aucune raison n'est demandée. Les jours de pause, tes plantes ne fanent pas ; à ton retour, elles reprennent où elles en étaient. Pour revenir plus tôt, touche [[ol:garden.rest.end]] au-dessus de la liste [[tx:garden.today]].",
          ],
          ipucu: "Pour mettre en pause une seule intention, touche son arbre et choisis [[tx:garden.menu.rest]] dans les trois points de sa carte.",
          sahne: "bahce-ara",
        },
        {
          baslik: "Le quarantième jour",
          metin: "Quand tu as tenu une intention quarante jours, le moment de cet arbre se joue dans le jardin et la carte [[tx:garden.forty.title]] s'ouvre. Elle montre le verset 142 de la sourate Al-A'raf et une courte note : le rendez-vous de Moussa (paix sur lui) avec son Seigneur s'acheva en quarante nuits. Pour les intentions hebdomadaires, ce moment arrive à la sixième semaine.",
          sahne: "bahce-kirk",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Voici à quoi ça ressemble dans l'appli",
      giris: "Ces captures viennent de l'appli elle-même. Dans l'appli, le jardin est une cour carrelée en trois dimensions.",
      kareler: [
        { img: "b-niyetler", alt: "Mes intentions : image du jardin, Entrer dans ton jardin et les lignes d'intentions", cap: "[[tx:garden.list.title]] : le chemin vers le jardin" },
        { img: "b-dik", alt: "Planter une intention : Pour quelle œuvre ? Exemples d'intentions et tuiles Ce que tu fais déjà", cap: "La première étape pour planter" },
        { img: "b-bahce", alt: "Jardin carrelé en anneau sous un ciel de nuit, avec la liste Aujourd'hui en bas", cap: "Le jardin et la liste [[tx:garden.today]]" },
        { img: "b-kirk", alt: "Carte du quarantième jour : sourate Al-A'raf, verset 142", cap: "La carte du quarantième jour" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "D'autres personnes peuvent-elles voir mon jardin ?",
        c: "Toi seul vois ton jardin. Si tu as un compte, ton jardin se synchronise avec lui et te suit quand tu changes de téléphone. Les phrases écrites pour tes intentions et les noms que tu leur donnes n'arrivent sur tes autres appareils que si tu actives [[tx:garden.words.title]]." },
      { s: "Si je manque un jour, mon arbre meurt-il ?",
        c: "Non. Il ne perd jamais sa hauteur ; quand tu manques des jours, il penche d'abord la tête, puis il fane, et après une très longue absence il entre en hiver. Le jour où tu fais le pas minimum, il reprend vie. Pour les pauses que tu connais à l'avance, utilise [[tx:garden.rest.title]] ; ces jours-là, tes plantes ne fanent pas du tout." },
      { s: "Je lis le Coran dans l'appli. Dois-je aussi le cocher ?",
        c: "Non. Les intentions choisies dans [[tx:garden.flow.already]] lisent ton suivi dans l'appli : les pages lues dans le lecteur, les prières notées dans [[tx:prayerDetail.title]], le dhikr compté sur les compteurs. Si tu lis dans un mushaf imprimé, plante l'intention [[tx:garden.free.mushaf]] et coche-la avec [[garden.act.didToday]]." },
      { s: "Combien d'intentions puis-je planter ?",
        c: "La cour commence avec de la place pour dix jeunes plants ; quand elle est pleine, quatre places de plus s'ouvrent, puis encore quatre. Ton jardin accueille jusqu'à dix-huit jeunes plants." },
      { s: "J'ai choisi le mauvais jeune plant. Puis-je le changer ?",
        c: "Un jeune plant planté garde son espèce. Touche son arbre, choisis [[tx:garden.menu.uproot]] dans les trois points de sa carte et replante. Ton suivi dans les outils (lecture, dhikr, prière) reste en place." },
      { s: "Est-ce payant ?",
        c: "Planter, tenir et mettre en pause des intentions dans le Jardin des intentions est gratuit." },
    ],
  },

  ilgili: ["kaza", "teheccud", "defter"],
  kart: { kicker: "Intention", baslik: "Jardin des intentions", metin: "Chaque intention devient un jeune plant qui grandit à mesure que tu la tiens. Toi seul vois ton jardin." },
  onizleme: { sahne: "bahce-kart", adim: 13 },
  cta: { baslik: "Plante ta première intention", metin: "Télécharge Manevi Halka gratuitement et ouvre le Jardin des intentions depuis l'écran Lire." },
};
