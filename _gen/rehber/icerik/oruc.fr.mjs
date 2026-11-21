// Jeûne en groupe dans un cercle (FR), 2.1.0 (21 nov. 2026). Source : oruc.tr.mjs.
// Les noms de boutons viennent de l’appli via [[clé]] ; pas de tiret cadratin. Aucun avis juridique religieux.
export default {
  title: "Jeûner ensemble : suivre le jeûne du Ramadan en groupe",
  desc: "Crée une tâche de jeûne dans ton cercle : Ramadan, lundi et jeudi ou jours choisis. Chacun marque son jeûne à l’iftar, et tu choisis qui voit quoi.",
  h1: "Jeûne en groupe : comment suivre le jeûne ensemble dans un cercle",
  crumb: "Jeûne en groupe",
  eyebrow: "Guide pas à pas",
  lead: "Tu crées une tâche de jeûne dans ton cercle : le jeûne du Ramadan, le lundi et le jeudi, ou des jours que tu choisis. Chacun garde son propre jeûne et le marque à l’iftar, et le cercle avance ensemble. Personne n’est inscrit d’office : chacun lit ce qui sera visible et accepte.",
  meta: ["Prêt en 1 minute environ", "Personne n’est inscrit d’office", "Participer est gratuit"],
  film: { sahne: "film-oruc", cap: "Crée la tâche, choisis le jeûne du Ramadan, marque-le à l’iftar." },

  kisa: {
    maddeler: [
      "Sur l’écran du cercle, touche [[group.addTask]] et choisis la carte [[tx:compose.typeFasting]] sous [[tx:compose.sectionPractice]].",
      "Dans la ligne [[tx:fasting.rowKind]], choisis [[tx:fasting.kindRamadan]], [[tx:fasting.kindMonThu]] ou [[tx:fasting.kindCustom]].",
      "Dans la ligne [[tx:compose.rowVisibility]], décide qui voit quoi, puis touche [[compose.startTask]].",
      "La tâche apparaît dans la liste de chacun. Celui qui veut participer touche [[fasting.joinCta]], lit ce qui sera visible et accepte.",
      "Le jour du jeûne, une fois l’iftar arrivé, tu touches [[fasting.markDone]] ; l’écran affiche [[tx:fasting.accepted]].",
      "Les participants reçoivent un rappel la veille au soir. Personne ne demande pourquoi un jour reste vide.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "La personne qui gère le cercle", baslik: "Crée la tâche de jeûne",
      giris: "Une tâche de jeûne est une pratique commune : chacun garde son propre jeûne, l’appli ne fait que rassembler les marques. C’est l’administrateur du cercle qui crée la tâche. Si tu n’as pas encore de cercle, crées-en un d’abord [comme dans le guide de la khatma](/fr/guides/khatma-en-groupe/) et invite tes proches.",
      adimlar: [
        {
          baslik: "Ajoute une tâche et choisis Jeûne",
          metin: "Sur l’écran du cercle, touche le bouton [[group.addTask]] en bas à droite. Sur l’écran [[tx:compose.pickTitle]], fais défiler vers le bas et touche la carte [[tx:compose.typeFasting]] sous [[tx:compose.sectionPractice]].",
          ipucu: "Quand le Ramadan approche, environ quatre mois avant, une carte [[tx:compose.tplRamadanFast]] apparaît aussi au début de la ligne [[tx:compose.quickStart]]. Si tu la touches, le jeûne du Ramadan est déjà choisi.",
          sahne: "oruc-ac",
        },
        {
          baslik: "Choisis quel jeûne vous allez suivre",
          metin: "Touche la ligne [[tx:fasting.rowKind]]. Il y a trois choix :",
          liste: [
            "[[tx:fasting.kindRamadan]] : chaque jour, du 1er Ramadan jusqu’à la veille de l’Aïd. Le début se règle tout seul sur le 1er Ramadan ; si le Ramadan a déjà commencé, la tâche commence aujourd’hui.",
            "[[tx:fasting.kindMonThu]] : deux jours par semaine. Elle commence demain et dure jusqu’à ce que tu l’arrêtes ; tu peux choisir des dates dans les lignes [[tx:compose.rowStart]] et [[tx:fasting.rowEnd]].",
            "[[tx:fasting.kindCustom]] : tu choisis les jours de la semaine, le début et la fin.",
          ],
          fark: "L’aperçu en haut montre ton choix tout de suite : combien de jours pendant le Ramadan, ou combien de jours par semaine pour un jeûne hebdomadaire.",
          ipucu: "Les jours de l’Aïd sont sautés automatiquement.",
          sahne: "oruc-tur",
        },
        {
          baslik: "Choisis qui voit quoi",
          metin: "Touche la ligne [[tx:compose.rowVisibility]] :",
          liste: [
            "[[tx:practice.visibilityMutual]] : tous les participants voient les jours marqués par les autres. Pour les cercles de famille et d’amis proches.",
            "[[tx:practice.visibilityAdmin]] : seul l’administrateur du cercle voit les marques ; les participants ne se voient pas entre eux.",
            "[[tx:fasting.visibilityTotal]] : personne ne voit qui a jeûné, pas même l’administrateur. Le cercle ne voit que le nombre total de jours.",
          ],
          ipucu: "[[tx:fasting.rowDuaTurn]] est activé par défaut : chaque jour de jeûne, un nom du cercle s’affiche, et tu penses à cette personne dans ton invocation à l’iftar. Si tu choisis [[tx:practice.visibilityAdmin]], tu peux aussi activer le [[tx:wizard.observerModeTitle]] : tu ne reçois pas de tâche et tu accompagnes le cercle.",
          sahne: "oruc-gorunurluk",
        },
        {
          baslik: "Lance la tâche",
          metin: "Le nom de la tâche s’écrit selon ton choix, par exemple « Jeûne du Ramadan » ; tu peux le changer. Touche [[compose.startTask]]. La tâche s’ajoute sous [[tx:practice.sectionPractices]] sur l’écran du cercle et apparaît dans la liste de chacun.",
          fark: "Personne n’est inscrit d’office : chaque membre lit, en rejoignant, ce qui sera visible et accepte.",
          sahne: "oruc-baslat",
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Tout le cercle", baslik: "Rejoins le jeûne et marque-le",
      giris: "Les jours de jeûne, la tâche apparaît dans la section [[tx:dashboard.myTasks]] de l’onglet [[tx:tabs.home]] ; elle reste aussi sous [[tx:practice.sectionPractices]] sur l’écran du cercle. Chacun marque son propre jeûne.",
      adimlar: [
        {
          baslik: "Rejoins le jeûne",
          metin: "Touche la carte du jeûne ; la carte [[tx:fasting.joinCardTitle]] s’affiche. Quand tu touches [[fasting.joinCta]], une fenêtre indique qui voit quoi dans cette tâche. [[tx:fasting.reminderRow]] est activé : tu reçois un rappel à 21:00 la veille d’un jour de jeûne, et tu peux changer l’heure plus tard. Touche ensuite [[fasting.join]].",
          ipucu: "Si tu ne veux pas participer, retire la carte de ta liste avec [[ol:practice.dismissAction]]. Après avoir rejoint, tu peux partir à tout moment avec [[ol:practice.leaveAction]] ; tes marques sont alors supprimées.",
          sahne: "oruc-katil",
        },
        {
          baslik: "À l’iftar, touche J’ai jeûné",
          metin: "Pendant la journée, l’écran montre le temps restant avant l’iftar ; le bouton [[fasting.markDone]] s’ouvre à l’iftar. Quand l’iftar arrive, l’invocation de la rupture du jeûne s’affiche. Touche [[fasting.markDone]] ; l’écran affiche [[tx:fasting.accepted]] et la perle du jour se remplit. Si tu as touché par erreur, touche [[ol:fasting.undo]].",
          ipucu: "L’heure de l’iftar se calcule d’après la ville choisie dans l’appli. Si aucune ville n’est choisie, le bouton reste ouvert toute la journée.",
          sahne: "oruc-isaretle",
        },
        {
          baslik: "Marque un jour oublié et vois qui avance avec toi",
          metin: [
            "La carte [[tx:fasting.duaLabel]] montre le nom de la personne à qui penser dans ton invocation ce soir-là. En dessous se trouvent les [[tx:fasting.myDays]] : touche un jour oublié pour le marquer après coup.",
            "Dans une tâche réglée sur [[tx:practice.visibilityMutual]], la liste [[tx:fasting.together]] montre quels jours chacun a marqués. Avec le bouton [[fasting.accepted]] à côté d’une personne, tu lui dis [[tx:fasting.accepted]].",
          ],
          fark: "Personne ne demande pourquoi un jour reste vide, et personne n’est notifié.",
          sahne: "oruc-birlikte",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Pour quels jeûnes un cercle peut-il créer une tâche ?",
        c: "Il y en a trois sortes : le jeûne du Ramadan (chaque jour, du 1er Ramadan jusqu’à la veille de l’Aïd), le jeûne du lundi et du jeudi, ou un jeûne les jours que tu choisis. Les jours de l’Aïd sont sautés automatiquement." },
      { s: "Qui voit quels jours ?",
        c: "C’est la personne qui crée la tâche qui décide. Avec [[tx:practice.visibilityMutual]], tous les participants voient les jours des autres ; avec [[tx:practice.visibilityAdmin]], seul l’administrateur du cercle les voit ; avec [[tx:fasting.visibilityTotal]], personne ne voit qui a jeûné et le cercle ne voit que le nombre total de jours. Si moins de 4 personnes ont commencé, le total est caché lui aussi. Chaque membre lit cela avant de rejoindre." },
      { s: "Que se passe-t-il un jour où je n’ai pas pu jeûner ?",
        c: "Le jour reste vide. Personne ne demande pourquoi, et personne n’est notifié. Si tu veux suivre tes jeûnes de rattrapage à part, utilise l’entrée [[tx:kaza.titleO]] en bas de l’écran du jeûne ; ce compteur n’appartient qu’à toi : [Prières et jeûnes de rattrapage](/fr/guides/prieres-et-jeunes-de-rattrapage/)." },
      { s: "Est-ce que je reçois un rappel ?",
        c: "Il est activé quand tu rejoins : la veille d’un jour de jeûne, à 21:00. Tu changes l’heure ou tu le désactives sur l’écran du jeûne. Pour le jeûne du Ramadan, le rappel ne vient que la première nuit." },
      { s: "Est-ce payant ?",
        c: "Rejoindre une tâche de jeûne est gratuit. Une tâche pour le jeûne du Ramadan ne compte pas dans la limite du plan gratuit. Une tâche pour le lundi et le jeudi, ou pour des jours que tu choisis, compte comme l’une des trois pratiques communes que tu peux avoir ouvertes en même temps avec le plan gratuit." },
      { s: "L’appli me dit-elle si mon jeûne est valable ?",
        c: "Non. L’appli garde seulement les jours que tu marques et ne donne aucun avis religieux. Pour tes questions sur le jeûne, demande à un savant en qui tu as confiance." },
    ],
  },

  ilgili: ["hatim", "kaza", "tek"],
  kart: { kicker: "Jeûne", baslik: "Jeûne en groupe", metin: "Ramadan ou lundi et jeudi : chacun marque son jeûne à l’iftar, et le cercle avance ensemble." },
  onizleme: { sahne: "oruc-kart", adim: 0 },
  cta: { baslik: "Crée ton cercle aujourd’hui", metin: "Créer un cercle et le rejoindre est gratuit. Télécharge l’appli, crée ton cercle et lance une tâche de jeûne." },
};
