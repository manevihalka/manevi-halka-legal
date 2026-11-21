// P3 · Dhikr et salawat en groupe (FR). Source : zikir.tr.mjs (21 nov. 2026, appli 2.1.0).
// Les noms de boutons viennent de l’appli via [[clé]] ; pas de tiret long, pas de Cevşen.
export default {
  title: "Dhikr et salawat en groupe : un objectif commun",
  desc: "Fixe avec ton cercle un objectif commun de salawat ou de dhikr, compté sur un seul compteur. Création, compteur, Voile et objectif ponctuel.",
  h1: "Fixer un objectif commun de dhikr ou de salawat",
  crumb: "Dhikr et salawat en groupe",
  eyebrow: "Guide pas à pas",
  lead: "Dans ton cercle, tu crées un objectif de dhikr, par exemple 1000 salawat par jour. Chacun récite chez lui, au moment qui lui convient, et ajoute son nombre dans l’appli. L’appli ne fait qu’additionner les nombres : le total du cercle s’affiche sur l’écran de chacun.",
  meta: ["Prêt en 2 minutes environ", "Ni e-mail ni mot de passe", "Gratuit"],
  film: { sahne: "film-zikir", cap: "De l’écran du cercle au compteur commun : [[group.addTask]], [[tx:compose.typeZikir]], [[tx:wizard.zikirOption2]], salawat, lancer." },

  kisa: {
    maddeler: [
      "Ouvre ton cercle, touche [[group.addTask]] en bas à droite et choisis la carte [[tx:compose.typeZikir]].",
      "Touche la ligne [[tx:compose.zikirHow]] et choisis [[tx:wizard.zikirOption2]] : le cercle a un seul compteur.",
      "Ajoute [[tx:wizard.zikirPresetSalavat]] avec [[tx:compose.zikirPickOther]]. Touche le dhikr et écris l’objectif du jour, par exemple 1000.",
      "Vérifie le nom de la tâche et touche [[compose.startTask]].",
      "Chacun touche la carte dans la tâche pour compter, ou ajoute avec [[zikir.bulkAdd]] ce qu’il a récité sur son chapelet. Le décompte s’enregistre tout seul.",
      "Pour un grand total sur plusieurs jours, choisis le modèle [[tx:eventCompose.tplSalavat]] dans un cercle ponctuel et touche [[eventCompose.cta]].",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "La personne qui gère le cercle", baslik: "Créer l’objectif de dhikr",
      giris: "L’objectif de dhikr se crée à l’intérieur d’un cercle. Si tu n’as pas encore de cercle, crée-le et invite tes proches en suivant les premières étapes du guide [Organiser une khatma en groupe](/fr/guides/khatma-en-groupe/).",
      adimlar: [
        {
          baslik: "Touche Ajouter une tâche, choisis Dhikr et salawat",
          metin: [
            "Ouvre l’onglet [[tabs.circles]] dans la barre du bas, puis ton cercle. Dans l’onglet [[tx:group.tasksTab]], touche [[group.addTask]] en bas à droite.",
            "L’écran [[tx:compose.pickTitle]] s’ouvre. Dans la partie [[tx:compose.sectionZikir]], touche la carte [[tx:compose.typeZikir]]. L’écran de création du dhikr s’ouvre.",
          ],
          ipucu: "Le bouton [[group.addTask]] est visible pour la personne qui gère le cercle et pour les modérateurs. La bande [[tx:compose.quickStart]] en haut du même écran propose aussi [[tx:zikirTpl.tesbihat.title]] : touche-la et la liste arrive déjà remplie.",
          sahne: "zikir-gorev-ac",
        },
        {
          baslik: "Choisir comment compter",
          metin: "En haut de l’écran de création se trouve la ligne [[tx:compose.zikirHow]]. Touche-la : une fenêtre s’ouvre en bas. Il y a trois choix :",
          liste: [
            "[[tx:wizard.zikirOption1]] : tout le monde reçoit la même liste, chacun tient son propre compte.",
            "[[tx:wizard.zikirOption2]] : le cercle a un seul compteur. Ce que chacun récite s’ajoute au même total.",
            "[[tx:wizard.zikirOption3]] : ta liste et tes nombres restent chez toi seulement.",
          ],
          fark: "Pour des salawat en groupe, choisis [[tx:wizard.zikirOption2]] et touche [[common.ok]]. Personne n’a à annoncer son nombre, personne n’a à calculer le total à la main.",
          sahne: "zikir-havuz",
        },
        {
          baslik: "Choisir le dhikr et l’objectif du jour",
          metin: [
            "Sous la ligne se trouvent les [[tx:wizard.zikirPresetSection]]. Si tu touches une liste comme [[tx:zikirTpl.tesbihat.title]] ou [[tx:zikirTpl.fatima.title]], ses dhikrs arrivent avec leurs nombres.",
            "Pour des salawat seules, touche [[tx:compose.zikirPickOther]]. Dans la liste [[tx:compose.zikirSingles]], touche la ligne [[tx:wizard.zikirPresetSalavat]], puis [[common.ok]]. [[tx:wizard.zikirEsmaTitle]] et [[tx:wizard.zikirCustomAdd]] se trouvent sur la même page.",
            "Touche maintenant le dhikr dans ta liste. Dans la fenêtre, écris l’objectif commun du cercle pour une journée ou touche 33, 100, 500 ou 1000, puis [[common.ok]]. Le compteur repart à zéro chaque nuit à minuit.",
          ],
          ipucu: "La même fenêtre a une ligne [[tx:wizard.zikirItemTimeLabel]] ; [[tx:wizard.zikirTimeAllDay]] est choisi par défaut. Si tu choisis [[tx:wizard.zikirTimeMorning]], ce dhikr est mis en avant jusqu’à midi ; le reste du temps, il est grisé mais reste comptable. Termine la liste avant de lancer : dans un pot commun, on ne peut plus ajouter ni retirer de dhikr une fois la tâche commencée.",
          sahne: "zikir-salavat",
        },
        {
          baslik: "Donner un nom à la tâche et la lancer",
          metin: [
            "Le champ [[tx:compose.nameLabel]] se remplit tout seul selon tes choix. Change-le si tu veux, par exemple en « Salawat de la famille ». Les membres du cercle voient la tâche sous ce nom.",
            "Touche [[compose.startTask]] tout en bas. Dans la fenêtre [[tx:common.success]], [[group.goToTaskScreen]] ouvre la tâche. Elle s’ajoute à la liste du cercle ; les membres la voient sur l’écran d’accueil, dans [[tx:dashboard.myTasks]].",
          ],
          ipucu: "Si tu veux seulement suivre le cercle sans compter toi-même, ouvre la carte [[tx:compose.more]] et active [[tx:wizard.observerModeTitle]].",
          sahne: "zikir-baslat",
        },
      ],
    },
    {
      tur: "bolum", id: "say", rol: "Tout le monde dans le cercle", baslik: "Réciter ton dhikr et l’ajouter",
      giris: "Chacun récite chez lui, au moment qui lui convient. Personne n’a besoin de se réunir pour faire le dhikr à voix haute : l’appli ne fait qu’additionner les nombres. Si tu n’as pas encore rejoint le cercle, touche d’abord le lien d’invitation : [Rejoindre un cercle avec une invitation](/fr/guides/rejoindre-un-cercle/).",
      adimlar: [
        {
          baslik: "Ouvrir la tâche et toucher le compteur",
          metin: [
            "Sur l’écran d’accueil, touche la carte dans [[tx:dashboard.myTasks]]. Dans la tâche, chaque dhikr a sa carte, avec en dessous le nombre du cercle pour la journée, par exemple « Partagé : 840 / 1000 ».",
            "Touche la carte : le compteur s’ouvre. Chaque toucher sur le grand cercle au centre compte un. Le nombre dans le cercle est le total du cercle ; en dessous est écrit [[tx:zikir.counterGroupTotal]].",
            "Il n’y a pas de bouton Enregistrer. Ce que tu comptes s’enregistre tout seul et [[tx:zikir.counterSaved]] apparaît en bas.",
          ],
          fark: "Plus besoin de demander le soir « on en est où ? » : le nombre commun se met à jour aussi sur l’écran des autres membres.",
          ipucu: "Le bouton [[event.count]] sur la carte de la tâche, dans l’écran du cercle, ouvre aussi directement le compteur. Si tu as touché par erreur, touche [[ol:zikir.counterUndo]] en bas ; le dernier compte est retiré.",
          sahne: "zikir-say",
        },
        {
          baslik: "Récité sur ton chapelet ? Ajoute tout d’un coup",
          metin: [
            "Si tu as récité sur ton chapelet ou de mémoire, inutile de toucher un par un. Touche [[zikir.bulkAdd]] sous le compteur. Un appui long sur le compteur ouvre la même fenêtre.",
            "Touche +10, +33 ou +100, ou écris ton propre nombre dans le champ [[tx:zikir.bulkAddPlaceholder]] et touche [[common.add]]. La barre en bas de la tâche montre le total commun du jour en pourcentage.",
          ],
          ipucu: "Le compteur commun repart à zéro chaque jour à minuit, selon ta propre heure : c’est un objectif quotidien. Pour un seul grand total sur plusieurs jours, utilise le cercle ponctuel plus bas.",
          sahne: "zikir-toplu",
        },
        {
          baslik: "Compter sans regarder : Voile et vue chapelet",
          metin: [
            "Touche [[ol:perde.title]] sous le compteur : l’écran devient noir. Tu comptes en touchant n’importe où sur l’écran ; le nombre reste pâle et le téléphone vibre légèrement à chaque toucher. Pour sortir, garde le doigt appuyé.",
            "Le bouton en haut à droite ouvre les [[tx:counter.settingsTitle]]. Tu y choisis la vue : [[tx:counter.modeRing]] ou [[tx:counter.modeStrand]]. Dans la vue chapelet, tu comptes aussi en tirant les grains vers le bas avec le doigt.",
            "Quand l’objectif est atteint, le nombre devient doré. Si la tâche a un autre dhikr, un bouton [[=Suivant]] apparaît en bas ; touche-le pour continuer.",
          ],
          ipucu: "Touche la cloche en haut de la tâche pour te créer un rappel. Il arrive seulement sur ce téléphone, et pas un jour où tu as déjà participé au dhikr commun du cercle.",
          sahne: "zikir-perde",
        },
      ],
    },
    {
      tur: "bolum", id: "tek-seferlik", rol: "La personne qui organise le cercle", baslik: "Un objectif ponctuel pour une occasion",
      giris: "Si tu veux un grand total jusqu’à une date précise, avec l’intention de guérison pour un malade ou pour une bonne occasion, tu n’as pas besoin de créer un cercle permanent.",
      adimlar: [
        {
          baslik: "Choisir le modèle Salawat dans un cercle ponctuel",
          metin: [
            "Dans l’onglet [[tabs.circles]], touche **+** en haut à droite et choisis la ligne [[tx:event.createMenuTitle]]. Sur l’écran [[tx:eventCompose.pickTitle]], touche la carte [[tx:eventCompose.tplSalavat]].",
            "Le résumé s’ouvre. L’objectif est de 1000 salawat, comptées ensemble : tout le cercle compte vers un seul objectif et les nombres s’additionnent jusqu’à la fin. Tu changes l’objectif dans la ligne [[tx:compose.rowWhat]]. Choisis la fin dans la ligne [[tx:eventCompose.rowEnd]] et touche [[eventCompose.cta]].",
            "Sur l’écran [[tx:eventCompose.readyTitle]], partage le lien avec [[eventCompose.invite]]. Le cercle commence tout de suite.",
          ],
          fark: "Une personne qui touche le lien peut ajouter au décompte commun depuis la page qui s’ouvre dans le navigateur, même sans l’appli.",
          ipucu: "Pour Ya-Sin, Al-Ikhlas ou un autre dhikr, choisis le modèle [[tx:eventCompose.tplCustom]] ; pour chaque élément, tu choisis [[tx:event.modeCollective]] ou [[tx:event.modeIndividual]]. Intention, date et invitation en détail : [Cercle ponctuel](/fr/guides/cercle-ponctuel/).",
          sahne: "zikir-tek-toplu",
        },
      ],
    },
    {
      tur: "bolum", id: "kendi", rol: "Pour toi seul", baslik: "Chaque jour avec ta propre liste",
      giris: "Pour les dhikrs que tu récites chaque jour pour toi, en dehors d’un cercle, il y a le [[tx:read.zikirmatikTitle]]. Il s’ouvre depuis l’onglet [[tabs.read]].",
      adimlar: [
        {
          baslik: "Crée ta liste de dhikr, le chapelet s’allonge",
          metin: [
            "Dans le [[tx:read.zikirmatikTitle]], touche la ligne [[tx:zikirList.listsRow]]. Crée ta propre liste ou ajoute l’une des listes toutes prêtes aux tiennes.",
            "Si tu actives [[tx:zikirDaily.toggleTitle]] dans la liste, elle repart de zéro chaque jour. Chaque jour où tu termines la liste, un grain s’enfile sur le fil en haut ; le titre te dit depuis combien de jours tu la récites. Le jour change à l’heure de la prière de l’aube.",
            "Si un jour manque, le fil garde un espace ; les grains précédents ne disparaissent pas. Choisis une heure dans la ligne [[tx:zikirList.reminder.title]] et un rappel arrive à cette heure sur ton téléphone ; pas un jour où tu as déjà fini la liste.",
          ],
          ipucu: "Pour répartir un grand nombre lié à une intention sur plusieurs jours, regarde [[tx:niyet.title]] dans le [[tx:read.zikirmatikTitle]]. Son bouton [[ol:niyet.openCircle]] ouvre ton intention en cercle ponctuel, et tes proches y contribuent.",
          sahne: "zikir-ip",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "À quoi ça ressemble dans l’appli",
      giris: "Ces images viennent directement de l’appli.",
      kareler: [
        { img: "n05b-zikir-gorevim", alt: "Tâche de dhikr : nombres communs sur deux cartes de dhikr et, en bas, le total commun à 80 pour cent", cap: "La tâche : nombres communs et total du jour" },
        { img: "ev-sablon", alt: "Cercle ponctuel : l’écran Que lisons-nous ensemble ? avec les cartes Khatma, 41 Ya-Sin, Salawat et Ma propre liste", cap: "Cercle ponctuel : le modèle [[tx:eventCompose.tplSalavat]]" },
        { img: "z-liste", alt: "Liste de dhikr : en haut la carte du chapelet, l’interrupteur quotidien, la ligne Rappel et trois dhikrs", cap: "Ta propre liste : le chapelet et le rappel" },
        { img: "z-sayac", alt: "Compteur en vue chapelet : le dhikr en arabe, les grains qui défilent et 73 / 100 à gauche", cap: "Le compteur en vue chapelet" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Comment créer un objectif de salawat en groupe ?",
        c: "Dans ton cercle, touche [[group.addTask]] et choisis la carte [[tx:compose.typeZikir]]. Dans la ligne [[tx:compose.zikirHow]], choisis [[tx:wizard.zikirOption2]], ajoute [[tx:wizard.zikirPresetSalavat]], écris l’objectif du jour et touche [[compose.startTask]]. Pour un objectif jusqu’à une date précise, choisis le modèle [[tx:eventCompose.tplSalavat]] dans un cercle ponctuel. Créer un cercle, créer un objectif de dhikr et rejoindre un cercle sont gratuits. Avec un compte gratuit, tu gères un cercle créé par toi à la fois ; rejoindre les cercles des autres n’a pas de limite." },
      { s: "Chacun compte-t-il pour soi, ou y a-t-il un seul compteur ?",
        c: "C’est toi qui choisis. Avec [[tx:wizard.zikirOption1]] dans la ligne [[tx:compose.zikirHow]], chacun compte la même liste pour soi. Avec [[tx:wizard.zikirOption2]], le cercle a un seul compteur et ce que chacun récite s’ajoute au même total. Dans un cercle ponctuel, ce choix se fait pour chaque dhikr : [[tx:event.modeIndividual]] ou [[tx:event.modeCollective]]." },
      { s: "Le compteur commun repart-il à zéro chaque jour ?",
        c: "Dans un cercle régulier, le pot commun est un objectif quotidien : le compteur repart à zéro chaque nuit à minuit, selon l’heure de chacun. Dans un cercle ponctuel, le nombre d’un dhikr compté ensemble s’additionne du début du cercle jusqu’à la date de fin." },
      { s: "Comment lire Ya-Sin ou Al-Ikhlas en groupe ?",
        c: "Crée un cercle ponctuel. Pour Ya-Sin, il y a le modèle tout prêt [[tx:eventCompose.tplYasin41]]. Pour une autre sourate ou un autre nombre, choisis le modèle [[tx:eventCompose.tplCustom]], ajoute la sourate, écris le nombre visé et choisis [[tx:event.modeCollective]]. C’est toi qui décides du nombre de lectures ; pour la tradition liée à un nombre, demande à un savant de ta région." },
      { s: "Quelqu’un sans l’appli peut-il participer ?",
        c: "Dans un cercle ponctuel, oui : une fois le cercle commencé, une personne qui touche le lien partagé peut ajouter aux dhikrs en mode [[tx:event.modeCollective]] depuis la page qui s’ouvre dans le navigateur. Le mode [[tx:event.modeIndividual]] demande l’appli. Rejoindre l’objectif de dhikr d’un cercle régulier demande aussi l’appli." },
      { s: "Le dhikr en groupe veut-il dire réciter ensemble à voix haute ?",
        c: "Non. Chacun récite chez lui, au moment qui lui convient. L’appli ne fait qu’additionner les nombres et afficher le total du cercle." },
    ],
  },

  ilgili: ["tek", "katil", "hatim"],
  kart: { kicker: "Dhikr", baslik: "Dhikr et salawat en groupe", metin: "Un seul compteur pour tout le cercle : le total sur l’écran de chacun. Salawat, tasbih ou ta propre liste." },
  onizleme: { sahne: "zikir-kart", adim: 16 },
};
