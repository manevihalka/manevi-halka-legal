// P3 · Objectif commun de dhikr et de salawat (FR). Format : commentaire en tête de _gen/build-rehber.mjs.
// Les noms des boutons viennent de l'appli via [[clé]] ; pas de tiret long.
// Parcours vérifiés dans le code : components/Wizard.tsx (dhikr), app/zikir-flow/[id].tsx,
// components/zikir/ZikirCounterModal.tsx, app/create-event.tsx (Cercle ponctuel, Individuel/Collectif).
export default {
  title: "Dhikr et salawat en groupe : un objectif commun",
  desc: "Fixe avec ton cercle un objectif commun de salawat ou de dhikr : chacun ajoute ce qu’il récite au même compteur. Aussi pour lire Ya-Sin ou Al-Ikhlas.",
  h1: "Fixer un objectif commun de dhikr ou de salawat",
  crumb: "Dhikr et salawat en groupe",
  eyebrow: "Guide pas à pas",
  lead: "Dans ton cercle, tu crées un objectif de dhikr, par exemple 1000 salawat par jour. Chacun récite chez lui, au moment qui lui convient, et ajoute son nombre dans l’appli. L’appli ne fait qu’additionner les nombres : le total du cercle s’affiche sur l’écran de chacun.",
  meta: ["Prêt en 2 minutes environ", "Ni e-mail ni mot de passe", "Gratuit"],
  film: { sahne: "film-zikir", cap: "De l’écran du cercle au compteur commun : Dhikr, Pool commun, Salawat, lancer." },

  kisa: {
    maddeler: [
      "Ouvre ton cercle, touche le bouton **+** en bas à droite et choisis la carte [[tx:wizard.goalZikir]].",
      "L’appli demande : [[tx:wizard.zikirModeQuestion]] Choisis [[tx:wizard.zikirOption2]] : le cercle a un seul compteur.",
      "Dans [[tx:wizard.zikirPresetSection]], touche la ligne [[tx:wizard.zikirPresetSalavat]], écris le nombre visé et touche [[wizard.zikirAdd]].",
      "Donne un nom à la tâche et touche [[wizard.startCollectiveGoal]].",
      "Sur l’écran de la tâche, chacun touche la carte pour compter, ou ajoute avec [[zikir.bulkAdd]] ce qu’il a récité sur son chapelet. Le décompte s’enregistre tout seul.",
      "Pour un grand total sur plusieurs jours, crée un cercle ponctuel, marque le dhikr comme [[tx:event.modeCollective]] et lance le cercle.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "L’administrateur du cercle", baslik: "Crée l’objectif de dhikr",
      giris: "L’objectif de dhikr se crée à l’intérieur d’un cercle. Si tu n’as pas encore de cercle, crée-le et invite tes proches en suivant les premières étapes du guide [Organiser une khatma en groupe](/fr/guides/khatma-en-groupe/).",
      adimlar: [
        {
          baslik: "Touche + sur l’écran du cercle et choisis Dhikr",
          metin: [
            "Ouvre l’onglet [[tabs.circles]] dans la barre du bas, puis ouvre ton cercle. Dans l’onglet [[tx:group.readingsTab]], touche le bouton rond **+** en bas à droite.",
            "Un écran s’ouvre avec la question [[tx:wizard.goalTypeQuestion]] Sous [[tx:practice.sectionReadings]], touche la carte [[tx:wizard.goalZikir]].",
          ],
          ipucu: "Dans un cercle tout juste créé, le bouton [[group.welcome.step2Btn]] de la carte [[tx:group.welcome.title]] ouvre aussi cet écran. Le bouton **+** est visible pour l’administrateur et les modérateurs du cercle.",
          sahne: "zikir-gorev-ac",
        },
        {
          baslik: "Choisis Pool commun",
          metin: "L’appli te demande comment tenir le décompte. Il y a trois options :",
          liste: [
            "[[tx:wizard.zikirOption1]] : tout le monde reçoit la même liste, et chacun tient son propre compte.",
            "[[tx:wizard.zikirOption2]] : le cercle a un seul compteur. Ce que chacun récite s’ajoute au même total.",
            "[[tx:wizard.zikirOption3]] : ta liste et tes nombres ne sont visibles que par toi.",
          ],
          fark: "Pour des salawat en groupe, touche la carte [[tx:wizard.zikirOption2]], puis [[wizard.continue]]. Personne n’a à annoncer son nombre, personne n’a à calculer le total à la main.",
          sahne: "zikir-havuz",
        },
        {
          baslik: "Choisis le dhikr et le nombre visé",
          metin: [
            "Dans la section [[tx:wizard.zikirPresetSection]], touche la ligne [[tx:wizard.zikirPresetSalavat]]. Une fenêtre s’ouvre en bas de l’écran. Touche le nombre et écris l’objectif commun du cercle pour une journée, par exemple 1000. Le compteur repart de zéro chaque nuit à minuit. Touche ensuite [[wizard.zikirAdd]].",
            "Tu peux ajouter d’autres dhikrs : [[tx:wizard.zikirPresetIstigfar]], [[tx:wizard.zikirPresetKelime]], [[tx:wizard.zikirEsmaTitle]], ou ton propre dhikr avec [[tx:wizard.zikirCustomAdd]]. Ceux que tu as choisis apparaissent sous la liste. Termine la liste ici : dans un pool commun, on ne peut plus ajouter ni retirer de dhikr une fois la tâche lancée. Quand c’est fait, touche [[wizard.continue]].",
          ],
          ipucu: "La même fenêtre a une ligne [[tx:wizard.zikirItemTimeLabel]]. L’option [[tx:wizard.zikirTimeAllDay]] est sélectionnée par défaut, et ce choix se fait pour chaque dhikr séparément. Si tu choisis [[tx:wizard.zikirTimeMorning]], ce dhikr est mis en avant jusqu’à l’heure de la prière de midi. Le reste du temps, il est grisé, mais on peut toujours le compter.",
          sahne: "zikir-salavat",
        },
        {
          baslik: "Donne un nom à la tâche et lance-la",
          metin: [
            "Écris un nom dans le champ [[tx:wizard.circleTitle]], par exemple « Salawat du vendredi ». Touche [[wizard.startCollectiveGoal]].",
            "Dans la fenêtre [[tx:common.success]], touche [[group.goToTaskScreen]] pour ouvrir l’écran de la tâche. La tâche s’ajoute à la liste du cercle. Les membres la voient dans la section [[tx:dashboard.myTasks]] de l’Accueil.",
          ],
          ipucu: "Si tu veux seulement suivre le cercle sans compter toi-même, active [[tx:wizard.observerModeTitle]] avant de lancer la tâche.",
          sahne: "zikir-baslat",
        },
      ],
    },
    {
      tur: "bolum", id: "say", rol: "Tout le cercle", baslik: "Récite et ajoute ton nombre",
      giris: "Chacun récite chez lui, au moment qui lui convient. Personne n’a besoin de se réunir pour faire le dhikr à voix haute : l’appli ne fait qu’additionner les nombres. Si tu n’as pas encore rejoint le cercle, touche d’abord le lien d’invitation : [Rejoindre un cercle avec une invitation](/fr/guides/rejoindre-un-cercle/).",
      adimlar: [
        {
          baslik: "Ouvre la tâche et touche le compteur",
          metin: [
            "Sur l’Accueil, touche la carte dans la section [[tx:dashboard.myTasks]]. L’écran de la tâche montre la carte de chaque dhikr et, en dessous, le nombre du jour pour le cercle, par exemple « Partagé : 840 / 1000 ».",
            "Touche la carte : le compteur s’ouvre. Chaque appui sur le grand cercle au centre compte pour un. Le nombre dans le cercle est le total du cercle ; en dessous, il est écrit [[tx:zikir.counterGroupTotal]].",
            "Il n’y a pas de bouton Enregistrer. Ce que tu comptes s’enregistre tout seul, et [[tx:zikir.counterSaved]] s’affiche en bas.",
          ],
          fark: "Plus besoin de demander le soir « on en est où ? » : le nombre commun se met à jour aussi sur l’écran des autres membres.",
          ipucu: "Tu as touché par erreur ? Touche [[ol:zikir.counterUndo]] en bas : le dernier appui est annulé.",
          sahne: "zikir-say",
        },
        {
          baslik: "Tu as utilisé ton chapelet ? Ajoute tout d’un coup",
          metin: [
            "Si tu as récité avec un chapelet ou de mémoire, inutile de compter un par un dans l’appli. Touche [[zikir.bulkAdd]] sous le compteur. Un appui long sur le compteur ouvre la même fenêtre.",
            "Touche +10, +33 ou +100, ou écris ton propre nombre dans le champ [[tx:zikir.bulkAddPlaceholder]] et touche [[common.add]]. La barre en bas de l’écran de la tâche montre le total commun du jour en pourcentage.",
          ],
          ipucu: "Le compteur commun repart de zéro chaque jour à minuit, à ton heure : c’est un objectif quotidien. Si tu veux un seul grand total sur plusieurs jours, utilise le cercle ponctuel décrit ci-dessous.",
          sahne: "zikir-toplu",
        },
      ],
    },
    {
      tur: "bolum", id: "tek-seferlik", rol: "La personne qui crée le cercle", baslik: "Un objectif ponctuel pour une occasion",
      giris: "Pour une nuit bénie, ou des salawat pour une personne décédée : si tu veux un grand total jusqu’à une date précise, tu n’as pas besoin de créer un cercle permanent.",
      adimlar: [
        {
          baslik: "Dans un cercle ponctuel, choisis le décompte Collectif",
          metin: [
            "Dans l’onglet [[tabs.circles]], touche le bouton **+** en haut à droite et choisis la carte [[tx:event.createMenuTitle]]. Comme type, choisis [[tx:event.typeZikir]] et touche [[common.continue]].",
            "Tu ne vois pas de **+** en haut à droite ? Ton prénom n’est pas encore enregistré dans l’appli. Touche [[ol:circlesTab.anonJoin]] sur le même écran et écris ton prénom. Reviens ensuite en arrière : le bouton **+** apparaît.",
            "À l’étape [[tx:event.zikirGoalTitle]], touche le choix [[=Salavât-ı Şerîfe]] (les salawat). Dans le champ [[tx:event.target]], écris l’objectif total du cercle, par exemple 10 000. Touche ensuite l’option [[tx:event.modeCollective]].",
            "Pour un dhikr en mode [[tx:event.modeCollective]], tout le cercle compte pour atteindre un seul objectif, et les nombres s’accumulent jusqu’à la date de fin. Si tu choisis [[tx:event.modeIndividual]], chacun atteint son propre objectif.",
            "Aux étapes suivantes, choisis la date de fin, donne un nom au cercle et touche [[event.create]]. Sur l’écran du cercle, partage le lien d’invitation avec [[event.inviteFriends]].",
            "Le décompte s’ouvre quand le cercle commence. Quand tes proches ont rejoint, touche [[event.startNow]] sur l’écran du cercle, puis encore [[event.startNow]] dans la fenêtre qui s’ouvre. Tu peux aussi activer [[tx:event.registrationWindowToggle]] à la création : le cercle commence alors tout seul à l’heure choisie.",
          ],
          fark: "Une personne qui touche le lien partagé avec le bouton [[event.inviteFriends]] de l’écran du cercle peut ajouter au décompte depuis la page qui s’ouvre dans le navigateur, même sans l’appli. Cela fonctionne seulement pour les dhikrs en mode [[tx:event.modeCollective]], et une fois le cercle commencé.",
          ipucu: "Pour la date, l’invitation et la dédicace : [Cercle ponctuel](/fr/guides/cercle-ponctuel/).",
          sahne: "zikir-tek-toplu",
        },
        {
          baslik: "Pour lire Ya-Sin ou Al-Ikhlas, choisis Invocation / Sourate",
          metin: [
            "À la première étape du cercle ponctuel, choisis le type [[tx:event.typeDua]]. La liste toute prête de l’étape [[tx:event.duaGoalTitle]] contient aussi [[=Yâsîn Sûresi]] (sourate Ya-Sin) et [[=İhlâs Sûresi]] (sourate Al-Ikhlas). Dans le champ [[tx:event.target]], écris le nombre total de lectures du cercle et choisis [[tx:event.modeCollective]].",
            "Chacun ajoute au compteur ce qu’il a lu ; le total s’affiche sur l’écran de tous. C’est toi qui décides combien de fois lire. Pour la tradition liée à ce nombre, demande conseil à un savant de ta région.",
          ],
        },
      ],
    },
    {
      tur: "bolum", id: "ameller", rol: "L’administrateur du cercle", baslik: "Pour cocher des jours plutôt que compter",
      giris: "Pour lire chaque jour la même sourate ou la même invocation, ou pour suivre ensemble les prières, il existe une case à cocher chaque jour, à la place du compteur.",
      adimlar: [
        {
          baslik: "Regarde la section Pratiques communes",
          metin: [
            "Quand tu touches le bouton **+** sur l’écran du cercle, la section [[tx:practice.sectionPractices]] se trouve en bas de l’écran qui s’ouvre : [[tx:practice.typeReading]] (Al-Mulk, Al-Kahf ou Ya-Sin par exemple), [[tx:practice.typeDua]] et [[tx:practice.typePrayer]].",
            "Ici, on ne compte pas : chacun poursuit sa propre pratique et coche ce qu’il a fait ce jour-là. Cette section est visible pour l’administrateur du cercle.",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Voici à quoi ça ressemble dans l’appli",
      giris: "Ces captures viennent de l’appli elle-même.",
      kareler: [
        { img: "n05b-zikir-gorevim", alt: "Écran de la tâche de dhikr : deux cartes avec leurs nombres partagés et, en bas, le total partagé à 80 %", cap: "Écran de la tâche : nombres partagés et total du jour" },
        { img: "h01-home", alt: "Accueil : les cartes de tâches des cercles dans la section Tes tâches", cap: "Accueil : tes cartes de tâches" },
        { img: "n01-halka", alt: "Écran du cercle : tâches de dhikr, de livre et de Coran dans l’onglet Lectures, Pratiques communes en dessous et le bouton + en bas à droite", cap: "Écran du cercle : les tâches et le bouton **+** en bas à droite" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Comment fixer un objectif commun de salawat ?",
        c: "Dans ton cercle, touche le bouton **+** en bas à droite, choisis la carte [[tx:wizard.goalZikir]] et l’option [[tx:wizard.zikirOption2]]. Touche la ligne [[tx:wizard.zikirPresetSalavat]], écris le nombre visé, donne un nom à la tâche et lance-la. Pour un objectif qui dure jusqu’à une date précise, crée un cercle ponctuel, marque le dhikr comme [[tx:event.modeCollective]], puis lance le cercle. Créer un cercle, créer un objectif de dhikr et rejoindre un cercle sont gratuits. Avec un compte gratuit, tu peux gérer un seul cercle créé par toi à la fois ; rejoindre les cercles des autres n’a pas de limite." },
      { s: "Chacun compte de son côté, ou un seul compteur pour tous ?",
        c: "C’est toi qui choisis. Avec [[tx:wizard.zikirOption1]], chacun compte la même liste de son côté. Avec [[tx:wizard.zikirOption2]], le cercle a un seul compteur et ce que chacun récite s’ajoute au même total. Dans un cercle ponctuel, ce choix se fait pour chaque dhikr : [[tx:event.modeIndividual]] ou [[tx:event.modeCollective]]." },
      { s: "Le compteur commun repart-il de zéro chaque jour ?",
        c: "Dans un cercle régulier, le pool commun est un objectif quotidien : le compteur repart de zéro chaque nuit à minuit, à l’heure de chacun. Dans un cercle ponctuel, le nombre d’un dhikr en mode [[tx:event.modeCollective]] s’accumule à partir du début du cercle, jusqu’à la date de fin." },
      { s: "Peut-on lire ensemble Ya-Sin ou Al-Ikhlas un nombre de fois défini ?",
        c: "Oui. Crée un cercle ponctuel, choisis le type [[tx:event.typeDua]] et ajoute [[=Yâsîn Sûresi]] ou [[=İhlâs Sûresi]] depuis la liste toute prête. Écris le nombre total dans le champ de l’objectif et choisis [[tx:event.modeCollective]]. C’est toi qui décides combien de fois lire. Pour la tradition liée à ce nombre, demande conseil à un savant de ta région." },
      { s: "Comment ajouter ce que j’ai récité ?",
        c: "Sur l’écran de la tâche, touche la carte du dhikr : dans le compteur, chaque appui compte pour un. Si tu as utilisé un chapelet, [[zikir.bulkAdd]] te permet d’ajouter d’un coup un nombre comme +33 ou +100. Il n’y a pas de bouton Enregistrer : le décompte s’enregistre tout seul." },
      { s: "Ceux qui n’ont pas l’appli peuvent-ils participer au compteur ?",
        c: "Dans un cercle ponctuel, oui : une fois le cercle commencé, la personne qui touche le lien partagé avec [[event.inviteFriends]] depuis l’écran du cercle ajoute son décompte aux dhikrs en mode [[tx:event.modeCollective]], depuis la page qui s’ouvre dans le navigateur. Pour les dhikrs en mode [[tx:event.modeIndividual]], il faut l’appli. Pour participer à l’objectif de dhikr d’un cercle régulier, il faut aussi l’appli." },
      { s: "Faut-il se réunir pour faire le dhikr à voix haute ?",
        c: "Non. Chacun récite chez lui, au moment qui lui convient. L’appli ne fait qu’additionner les nombres et montrer le total du cercle." },
    ],
  },

  ilgili: ["hatim", "tek", "katil"],
  kart: { kicker: "Dhikr", baslik: "Dhikr et salawat en groupe", metin: "Un seul compteur pour tout le cercle : salawat, dhikr, objectifs de Ya-Sin et d’Al-Ikhlas." },
  onizleme: { sahne: "zikir-say", adim: 6 },
};
