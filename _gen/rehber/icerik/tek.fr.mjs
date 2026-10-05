// P2 · Cercle ponctuel : khatma, dhikr et invocation en groupe (FR). Dans l'appli : Cercle ponctuel.
// D'abord « Khatma pour un défunt » ; le 5 oct. 2026, devenu un guide général pour toute occasion,
// l'exemple du défunt reste une partie.
// Format : commentaire en tête de _gen/build-rehber.mjs. Les noms des boutons viennent de l'appli via [[clé]].
// Langage religieux : aucune promesse de récompense, aucun avis juridique, aucun jour précis (3e, 7e, 40e).
export default {
  title: "Khatma en groupe : guide du cercle ponctuel",
  desc: "Organise une khatma, un dhikr ou des salawat en groupe pour une nuit bénie, le Ramadan, un proche décédé ou une invocation. On participe même sans l’appli.",
  h1: "Cercle ponctuel : organiser une khatma, un dhikr ou une invocation en groupe",
  crumb: "Cercle ponctuel",
  eyebrow: "Guide pas à pas",
  lead: "Pour une nuit bénie, le Ramadan, un proche décédé ou une occasion dans ta famille, tu souhaites peut-être lire une khatma, réciter un dhikr et des salawat ou lire une invocation avec ceux que tu aimes. Dans l’appli, tu crées pour cela un cercle ponctuel : tu choisis l’objectif, tu fixes la date de fin, tu envoies le lien. Chacun lit ou récite sa part chez lui. L’appli ne fait que répartir les parts et additionner les nombres.",
  meta: ["Prêt en 2 minutes environ", "Même sans l’appli", "Gratuit"],
  film: { sahne: "film-tek", cap: "Tout le parcours d’un seul coup : crée le cercle ponctuel, choisis l’objectif et la date de fin, écris la dédicace, lance le cercle et envoie le lien." },

  kisa: {
    maddeler: [
      "Dans l’appli, ouvre l’onglet [[tabs.circles]], touche le bouton **+** en haut à droite et choisis la carte [[tx:event.createMenuTitle]] dans la fenêtre qui s’ouvre.",
      "Choisis l’objectif : [[tx:event.typeQuran]], [[tx:event.typeZikir]] ou [[tx:event.typeDua]]. Pour répartir une khatma, touche [[tx:event.distPool]] ; pour un nombre de dhikr commun, touche [[tx:event.modeCollective]].",
      "Dans le champ [[tx:event.endDate]], choisis jusqu’à quand le cercle durera.",
      "Donne un nom au cercle, écris si tu veux l’occasion dans le champ [[tx:event.dedicationLabel]], puis touche [[event.create]].",
      "Lance le cercle avec [[event.startNow]], puis envoie le lien à ta famille et à ton groupe WhatsApp avec [[ol:event.inviteFriends]].",
      "Chacun lit ou récite sa part chez lui. Ceux qui n’ont pas l’appli participent à la plupart des cercles depuis le navigateur. À la fin, le cercle se ferme et son résumé reste dans l’appli.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "La personne qui organise le cercle", baslik: "Crée le cercle",
      giris: [
        "Un cercle ponctuel se crée pour une occasion : il a une date de fin, il s’agrandit grâce au lien d’invitation, il se ferme quand le temps est écoulé et son résumé reste dans les archives. Tu n’as pas besoin de créer un groupe permanent.",
        "Si tu veux une khatma familiale qui continue chaque semaine, un cercle régulier convient mieux : [Organiser une khatma en groupe](/fr/guides/khatma-en-groupe/).",
      ],
      adimlar: [
        {
          baslik: "Ouvre un cercle ponctuel",
          metin: [
            "Ouvre l’appli et touche l’onglet [[tabs.circles]] dans la barre du bas. Touche le bouton vert **+** en haut à droite.",
            "La fenêtre [[tx:dashboard.addCircle]] descend du haut de l’écran. Touche la carte du milieu, [[tx:event.createMenuTitle]].",
          ],
          ipucu: "Pas de bouton **+** en haut à droite ? Tu n’as sans doute pas encore écrit ton prénom dans l’appli. Touche d’abord [[circlesTab.anonCreate]] et écris ton prénom. L’écran [[tx:createGroup.title]] s’ouvre ensuite : reviens en arrière sans rien remplir, et le bouton **+** apparaît.",
          sahne: "vf-ac",
        },
        {
          baslik: "Choisis le type d’objectif",
          metin: "Le premier écran affiche la question [[tx:event.step1Title]] et des cartes. Ce guide présente ces trois cartes ; touche l’une d’elles, puis touche [[common.continue]] :",
          liste: [
            "[[tx:event.typeQuran]] : une khatma de 30 juz, ou les juz que tu choisis, est partagée entre les participants. Cette partie présente ce cas.",
            "[[tx:event.typeZikir]] : tu fixes un nombre cible pour un dhikr ou des salawat. Chacun récite son propre nombre, ou tout le cercle compte vers un seul total.",
            "[[tx:event.typeDua]] : tu fixes un nombre de lectures pour des sourates et des invocations comme Ya-Sin, Al-Ikhlas ou Al-Fatiha.",
          ],
          ipucu: "Pour un dhikr ou une invocation, la deuxième étape est différente ; elle est expliquée plus bas, dans la partie **Objectif de dhikr, de salawat ou d’invocation**. Les étapes suivantes sont les mêmes pour tous.",
        },
        {
          baslik: "Choisis la répartition de la khatma",
          metin: "Si tu as choisi [[tx:event.typeQuran]], l’écran suivant propose déjà [[tx:event.fullHatim]] : 30 juz, 604 pages. En bas, [[tx:event.distributionLabel]] propose deux options. Choisis-en une et touche de nouveau [[common.continue]] :",
          liste: [
            "[[tx:event.distPool]] : tous les juz restent dans le pool et chacun prend lui-même le juz qu’il veut. Une personne qui arrive après le début peut aussi participer. Choisis cette option pour une khatma lue en famille et entre proches.",
            "[[tx:event.distAuto]] : les pages sont partagées à parts égales entre les participants. La participation se ferme dès que tu lances le cercle : tout le monde doit donc avoir rejoint avant.",
          ],
          fark: "Même les proches qui n’ont pas l’appli peuvent participer : avec [[tx:event.distPool]], ils prennent un juz depuis le lien d’invitation et lisent leurs pages dans le navigateur.",
          ipucu: "Si seuls certains juz doivent être lus, et non la khatma entière, utilise l’option [[tx:event.customJuz]].",
          sahne: "vf-hedef",
        },
        {
          baslik: "Choisis la date de fin",
          metin: [
            "Touche le champ [[tx:event.endDate]] et choisis jusqu’à quand le cercle durera. Le champ propose une date dans deux jours ; tu peux en choisir une autre, par exemple une nuit bénie. Touche ensuite [[common.continue]].",
            "Si tu veux que le cercle commence tout seul à une heure précise, active [[tx:event.registrationWindowToggle]]. Sinon, c’est toi qui le lances.",
          ],
          ipucu: "Le cercle est supprimé 24 heures après la date de fin. Si le temps manque, tu peux le prolonger plus tard ; c’est expliqué plus bas.",
          sahne: "vf-zaman",
        },
        {
          baslik: "Donne un nom au cercle et écris la dédicace",
          metin: [
            "Écris un nom dans le champ [[tx:event.titleLabel]], par exemple « Khatma de Laylat al-Ragha’ib ». Si tu le laisses vide, le nom sera [[tx:event.suggestFullHatim]].",
            "Dans le champ [[tx:event.dedicationLabel]], écris l’occasion du cercle ou pour qui il est lu, par exemple « Pour le bien de notre famille et de toute la Oumma ». La dédicace s’affiche sous le nom, sur l’écran du cercle. Ceux qui ouvrent le lien dans le navigateur la voient en grand titre, en haut de la page. Tu peux aussi laisser la dédicace vide.",
            "Vérifie le résumé en bas, puis touche [[event.create]].",
          ],
          ipucu: "Pendant la création de ton premier cercle, la fenêtre [[tx:secureNudge.title]] peut s’afficher une fois. Si tu associes ton compte à Apple, Google ou une adresse e-mail, tu ne perds pas ton cercle, même si tu changes de téléphone. Tu peux aussi toucher [[tx:secureNudge.later]].",
          sahne: "vf-ithaf",
        },
        {
          baslik: "Lance le cercle",
          metin: [
            "L’écran du cercle s’ouvre : en haut, le nom du cercle et la dédicace ; en dessous, la carte [[tx:event.inviteSectionTitle]] et le bouton [[event.startNow]]. Si tu as choisi [[tx:event.distPool]], ou si tu as créé un cercle de dhikr ou d’invocation, inutile d’attendre. Touche [[event.startNow]], puis encore [[event.startNow]] dans la fenêtre qui s’ouvre.",
            "Tant que le cercle n’a pas commencé, personne ne peut prendre de juz ni compter. Une fois lancé, le lien d’invitation reste ouvert : ceux qui arrivent plus tard peuvent encore participer.",
          ],
          ipucu: "Si tu as choisi [[tx:event.distAuto]], partage d’abord le lien et lance le cercle quand tout le monde a rejoint. Au lancement, un aperçu montre qui lira quelles pages ; tu confirmes une seconde fois avec [[event.planConfirm]].",
          sahne: "vf-baslat",
        },
        {
          baslik: "Envoie le lien",
          metin: [
            "Une fois le cercle lancé, la carte d’invitation passe dans l’onglet [[tx:event.tabCircle]]. Touche [[ol:event.inviteFriends]] et envoie le lien à ton groupe WhatsApp, à ta famille ou à qui tu veux.",
            "La note sous la carte dit ce que ceux qui n’ont pas l’appli peuvent faire avec ce lien. Dans une khatma avec pool commun, elle dit : [[tx:event.webJoinClaim]]",
          ],
          fark: "Garde ton groupe WhatsApp. Partage le lien là-bas : l’appli retient qui a pris quel juz et combien de fois on a récité ; tu n’as pas besoin d’écrire une liste.",
          ipucu: "Envoie le lien avec le bouton [[ol:event.inviteFriends]] de cet écran ou avec l’icône de partage en haut à droite. N’envoie pas seulement le code d’invitation : sans l’appli, on ne peut participer dans le navigateur qu’avec ce lien.",
          sahne: "vf-davet",
        },
      ],
    },
    {
      tur: "bolum", id: "zikir-dua", rol: "La personne qui organise le cercle", baslik: "Objectif de dhikr, de salawat ou d’invocation",
      giris: "Si tu touches la carte [[tx:event.typeZikir]] ou [[tx:event.typeDua]] sur l’écran du type, seule la deuxième étape change. La date de fin, le nom, la dédicace, le lancement et l’invitation restent comme plus haut.",
      adimlar: [
        {
          baslik: "Choisis le dhikr et le nombre cible",
          metin: [
            "Sur l’écran [[tx:event.zikirGoalTitle]], sous le titre [[tx:event.addFromPresets]], touche l’un des dhikrs proposés, par exemple les salawat. La liste contient aussi le tahlil (La ilaha illallah), l’istighfar, Subhanallah et Alhamdulillah. Tu peux choisir un nom d’Allah avec [[tx:event.esmaulHusna]] ou écrire ton propre dhikr dans le champ [[tx:event.customZikir]].",
            "Sur la carte du dhikr ajouté, écris le nombre dans le champ [[tx:event.target]]. À côté, il y a deux options :",
          ],
          liste: [
            "[[tx:event.modeCollective]] : tout le cercle compte vers un seul total, par exemple 10 000 salawat ensemble. Les nombres s’accumulent jusqu’à la date de fin.",
            "[[tx:event.modeIndividual]] : chacun atteint lui-même le nombre que tu as écrit, par exemple 100 par personne.",
          ],
          fark: "Ceux qui n’ont pas l’appli peuvent aussi ajouter leur décompte depuis le lien, dans le navigateur. Cela ne marche que pour les dhikrs en mode [[tx:event.modeCollective]] et une fois le cercle lancé.",
          ipucu: "Plus de détails sur le décompte et l’objectif commun : [Dhikr et salawat en groupe](/fr/guides/dhikr-salawat-en-groupe/).",
          sahne: "zikir-tek-toplu",
        },
        {
          baslik: "Pour la lecture d’une invocation ou d’une sourate",
          metin: [
            "Si tu as choisi [[tx:event.typeDua]], la liste de l’écran [[tx:event.duaGoalTitle]] propose Al-Fatiha, Ayat al-Kursi, Ya-Sin, Al-Ikhlas, Al-Mulk et Al-Fath. Pour une invocation ou une sourate absente de la liste, écris-la dans le champ [[tx:event.customZikir]].",
            "Écris le nombre de lectures dans le champ [[tx:event.target]] et choisis là aussi [[tx:event.modeCollective]] ou [[tx:event.modeIndividual]]. C’est toi qui décides du nombre ; pour l’usage lié à ce nombre, demande à l’imam de ta mosquée.",
          ],
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Tous ceux qui participent", baslik: "Participe et termine ta part",
      giris: "Chacun lit ou récite sa part chez lui, au moment qui lui convient. Personne n’a besoin de se réunir. L’appli ne fait que répartir les parts, additionner les nombres et montrer ce qui est terminé.",
      adimlar: [
        {
          baslik: "Tu as l’appli : rejoins le cercle et prends un juz",
          metin: [
            "Quand tu touches le lien d’invitation, l’appli s’ouvre et affiche la carte du cercle : son nom, la dédicace, le nombre de participants et la date de fin. Touche [[joinGroup.join]]. Si c’est ta première fois, il suffit d’écrire ton prénom ; aucun e-mail n’est demandé. Si le lien s’ouvre dans le navigateur au lieu de l’appli, touche le bouton [[=Ouvrir dans l’application]] en bas de la page. Les détails sont dans le guide [Rejoindre un cercle avec une invitation](/fr/guides/rejoindre-un-cercle/).",
            "Dans un cercle de khatma, touche un juz libre dans la section [[tx:event.poolCuzTitle]]. Avec [[event.takeWholeCuz]], les 20 pages de ce juz sont pour toi. Si tu peux en lire moins, écris la première et la dernière page, puis touche [[ol:event.claimRange]].",
          ],
          ipucu: "Si le cercle n’a pas encore commencé, l’écran affiche [[tx:event.startWhenAdminOpen]]. Les juz et le décompte s’ouvrent quand l’administrateur le lance.",
          sahne: "vf-katil",
        },
        {
          baslik: "Lis, puis touche Terminer",
          metin: [
            "Les pages que tu as prises se trouvent dans la carte [[tx:event.myTask]]. Touche [[ol:event.read]] : le Coran s’ouvre à ta première page.",
            "Quand tu as fini de lire, reviens en arrière et touche [[event.done]]. Après ta confirmation dans la fenêtre, tes pages comptent comme lues et s’ajoutent à la progression du cercle. Fais-le au moins 6 heures avant la fin : à ce moment-là, les pages non marquées retournent au pool.",
          ],
          fark: "Pas besoin de chercher ton mushaf : les pages qui te sont attribuées s’ouvrent dans l’appli.",
          ipucu: "Tu as marqué tes pages par erreur ? Ouvre la ligne [[=Terminées]] : tu peux y annuler ce marquage.",
          sahne: "vf-oku",
        },
        {
          baslik: "Dans un cercle de dhikr ou d’invocation : compte",
          metin: [
            "Sur l’écran du cercle, dans la carte [[tx:event.zikirSection]] (ou [[tx:event.duaSection]] pour un cercle d’invocation), chaque ligne a un bouton [[event.count]]. Touche-le : le compteur s’ouvre, et chaque fois que tu touches l’écran, il avance d’un.",
            "Si tu as compté avec un chapelet ou de mémoire, ajoute le nombre d’un coup avec le bouton [[ol:zikir.bulkAdd]] sous le compteur. Les nombres sont enregistrés tout seuls. Pour un dhikr en mode [[tx:event.modeCollective]], le compteur affiche aussi la ligne [[tx:zikir.counterGroupTotal]].",
          ],
        },
        {
          baslik: "Tu n’as pas l’appli : prends une portion dans le navigateur",
          metin: [
            "Dans une khatma avec pool commun, quand tu touches le lien, la page du cercle s’ouvre dans le navigateur. Tout en haut, il y a la dédicace ; en dessous, le nombre de pages déjà lues.",
            "La carte [[=Portion suivante]] te propose un juz. Touche [[=Prendre celle-ci]]. Choisis combien de pages tu liras (5, 10, 15 ou 20), puis touche [[=Je confirme, je la prends]]. Le bouton [[=Lire maintenant]] ouvre les pages dans le navigateur.",
          ],
          fark: "Ta tante n’a pas l’appli sur son téléphone ? Ce n’est pas un problème : sans créer de compte, avec le seul lien, elle prend son juz et le lit.",
          ipucu: "Si le cercle n’a pas encore commencé, la page le dit et se met à jour toute seule dès que l’administrateur le lance.",
          sahne: "vf-web",
        },
        {
          baslik: "Après la lecture, touche Je l’ai terminée",
          metin: [
            "À la fin des pages, il y a la question [[=Lecture terminée ?]] et le bouton [[=Je l’ai terminée]] : touche-le quand tu as fini de lire. Si tu rouvres le lien plus tard dans le même navigateur, la portion que tu as prise se trouve dans la carte [[=Tes portions]] ; le bouton [[=Je l’ai terminée]] y est aussi.",
            "Si tu veux, écris ton prénom : le cercle voit alors qui s’est chargé de la portion. Ce n’est pas obligatoire ; si tu laisses le champ vide, rien ne change.",
          ],
          ipucu: "Après avoir pris ta portion, enregistre le lien avec le bouton [[=Copier le lien]] qui s’affiche. Il te servira si tu veux revenir depuis un autre téléphone ou un autre navigateur.",
          sahne: "vf-web-bitir",
        },
        {
          baslik: "Tu n’as pas l’appli : participe au décompte dans le navigateur",
          metin: [
            "Quand tu ouvres le lien d’un cercle de dhikr ou d’invocation, la carte [[=Invocations de ce cercle]] s’affiche dans le navigateur. Chaque dhikr en mode [[tx:event.modeCollective]] a un bouton [[=Participer au décompte]].",
            "Touche-le : un grand compteur rond s’ouvre. Chaque fois que tu le touches, il ajoute un ; les boutons [[=+33]] et [[=+100]] ajoutent d’un coup. Quand tu as fini, touche [[=Ajouter mon décompte]] : ton nombre s’ajoute au total du cercle.",
          ],
          ipucu: "Pour les dhikrs en mode [[tx:event.modeIndividual]], la ligne affiche [[=Pour les membres du cercle]] au lieu du bouton. Ceux-là, tu ne peux les réciter que dans l’appli.",
        },
      ],
    },
    {
      tur: "ikili", id: "bitis", rol: "La personne qui organise le cercle", baslik: "Quand la fin approche et quand le cercle est terminé",
      giris: "L’appli suit aussi la fin du cercle : dans une khatma, elle remet elle-même dans le pool les pages prises mais non terminées, et elle additionne les nombres jusqu’à la date de fin.",
      kartlar: [
        {
          baslik: "Quand la fin approche",
          metin: [
            "12 heures avant la fin, ceux qui n’ont pas encore terminé leur part reçoivent une notification de rappel. Dans les cercles de dhikr et d’invocation, ce rappel va à tous les participants.",
            "Dans une khatma, 6 heures avant la fin, les pages prises dans l’appli mais pas marquées avec [[event.done]] retournent au pool. Quelqu’un d’autre peut les prendre et les lire ; la personne dont la part a été reprise en est informée dans l’appli.",
            "Si le temps manque, touche la ligne [[tx:event.extend24h]] dans la carte [[tx:event.adminControls]] de l’onglet [[tx:event.tabCircle]]. La date de fin est repoussée de 24 heures ; si besoin, tu peux recommencer.",
          ],
          sahne: "vf-uzat",
        },
        {
          baslik: "Quand le cercle est terminé",
          metin: [
            "Dans une khatma, quand toutes les pages sont lues, la barre [[tx:event.collectiveProgress]] atteint 100 %. S’il reste du temps, le bouton [[ol:event.addSeries]], à côté du titre [[tx:event.poolCuzTitle]], ouvre une nouvelle khatma de 30 juz dans le même cercle. Dans les cercles de dhikr et d’invocation, les nombres continuent de s’accumuler jusqu’à la date de fin.",
            "Le cercle est supprimé 24 heures après la date de fin. Avant cela, son résumé est enregistré pour chaque personne qui a participé depuis l’appli, dans [[tx:tabs.profile]] › [[tx:quran.myLibrary]] › [[tx:event.archiveTab]].",
            "Les pages prises dans le navigateur comptent comme lues dans la progression du cercle dès qu’elles sont prises, et elles ne retournent pas au pool. Tu vois qui a terminé dans la liste [[=Rejoints depuis le web]] de l’onglet [[tx:event.tabCircle]].",
          ],
          sahne: "vf-ilerleme",
        },
      ],
      not: "Dans une khatma créée avec [[tx:event.distAuto]], la carte [[=Votre khatma est achevée]] s’affiche sur l’écran du cercle quand toutes les parts sont lues. Si quelqu’un ne termine pas sa part, l’administrateur peut ouvrir les parts restantes au pool avec la ligne [[tx:event.releasePool]] de la carte [[tx:event.adminControls]].",
    },
    {
      tur: "ikili", id: "vesileler", rol: "Exemples", baslik: "Pour quelles occasions ?",
      giris: [
        "Avec un cercle ponctuel, tu organises une khatma en ligne, en groupe, pour n’importe quelle occasion. Quelques exemples : une khatma pour une nuit bénie, le Mawlid ou le Ramadan ; une khatma ou une lecture de Ya-Sin pour un proche décédé ; des salawat avec une invocation pour la guérison d’un proche malade ; une invocation commune pour un mariage dans la famille, un bébé qui vient de naître ou un proche qui part au hajj.",
        "Les étapes sont les mêmes pour toutes. Tu choisis seulement l’objectif, la date de fin et la dédicace selon l’occasion.",
      ],
      kartlar: [
        {
          baslik: "Khatma pour un défunt",
          metin: [
            "Quand un proche décède, tu peux lire une khatma pour lui avec ceux que tu aimes. Donne un nom au cercle, par exemple « Khatma pour Ibrahim Benali », et écris dans la dédicace une phrase comme « À la mémoire de notre père ». Les proches qui ouvrent le lien dans le navigateur voient cette dédicace en grand titre, en haut de la page.",
            "Choisis comme date de fin un jour où la famille peut lire sans se presser ; l’appli ne propose aucun jour précis. Au lieu d’une khatma, tu peux aussi organiser des salawat ou une lecture de Ya-Sin : au moment de choisir le type, touche la carte [[tx:event.typeZikir]] ou [[tx:event.typeDua]].",
            "Chacun lit son juz chez lui. L’appli ne fait que répartir les juz et montrer ceux qui sont lus.",
          ],
          sahne: "vf-ithaf-vefat",
        },
        {
          baslik: "Pour une nuit bénie, le Mawlid et le Ramadan",
          metin: [
            "Pour une khatma lue lors d’une nuit bénie, du Mawlid ou du Ramadan, mets la date de fin au jour de l’occasion, par exemple le soir de la nuit bénie. Écris aussi la dédicace selon l’occasion. Quand le champ de dédicace est vide, il affiche [[tx:event.dedicationPlaceholder]].",
            "Si tu lis avec une grande communauté, tu peux ouvrir plusieurs khatmas dans le même cercle avec [[ol:event.addSeries]].",
            "Pour une khatma qui continue chaque jour ou chaque semaine pendant tout le Ramadan, un cercle régulier convient mieux : [Organiser une khatma en groupe](/fr/guides/khatma-en-groupe/).",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ornek", baslik: "Exemple : khatma de Laylat al-Ragha’ib",
      giris: "Les captures ci-dessous viennent de l’appli. La dédicace dit « Pour le bien de notre famille et de toute la Oumma », les juz se prennent dans le pool commun et quelques proches ont rejoint depuis le navigateur.",
      kareler: [
        { img: "06-event", alt: "Khatma de Laylat al-Ragha’ib : la dédicace, Progrès collectif à 60 %, la carte Ta tâche avec Pages 21-40 et le Pool de juz", cap: "Onglet Tâche : progrès collectif, tes pages et le pool de juz" },
        { img: "06c-event-davet", alt: "Onglet Cercle du même cercle : code d’invitation, lien d’invitation, bouton Inviter et participants", cap: "Onglet Cercle : code d’invitation, lien et participants" },
        { img: "06b-event-web", alt: "La liste Rejoints depuis le web et, dans la carte Gestion, Prolonger de 24 heures et Supprimer le cercle", cap: "Participants depuis le navigateur et gestion" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Comment faire une khatma en groupe en ligne ?",
        c: "Dans l’onglet **Cercles**, touche le bouton **+**, puis la carte **Cercle ponctuel** et la carte **Khatma du Coran**. Pour la répartition, choisis **Pool commun**, fixe la date de fin, écris si tu veux la dédicace et touche **Créer le cercle**. Lance le cercle avec **Démarrer maintenant** et envoie le lien. Chacun prend un juz et le lit chez lui." },
      { s: "Quelle différence entre un cercle ponctuel et un cercle régulier ?",
        c: "Un cercle ponctuel se crée pour une occasion : il a une date de fin, il se ferme quand le temps est écoulé et il est supprimé 24 heures plus tard ; son résumé reste dans l’appli. Un cercle régulier est un groupe permanent avec ta famille ou ta communauté ; la khatma continue chaque jour ou chaque semaine avec un nouveau tour. Détails : [Organiser une khatma en groupe](/fr/guides/khatma-en-groupe/)." },
      { s: "Ceux qui n’ont pas l’appli peuvent-ils participer ?",
        c: "Dans la plupart des cercles, oui. Dans une khatma avec **Pool commun**, la personne qui touche le lien d’invitation prend une portion dans le navigateur et lit les pages sur place. Dans un cercle de dhikr ou d’invocation, elle ajoute son décompte depuis le navigateur pour les dhikrs en mode **Collectif**. Elle ne crée pas de compte ; écrire son prénom est facultatif. Dans une khatma avec **Répartition auto**, on ne peut prendre dans le navigateur que les parts restées inachevées ; les dhikrs en mode **Individuel** demandent l’appli." },
      { s: "Comment organiser une khatma pour un défunt ?",
        c: "Les étapes sont celles de tout cercle ponctuel. Donne un nom au cercle et écris dans la dédicace une phrase comme « À la mémoire de notre père » ; ceux qui ouvrent le lien dans le navigateur la voient en titre de la page. Choisis comme date de fin un jour où la famille peut lire sans se presser. Chacun lit son juz chez lui ; l’appli ne fait que répartir les juz." },
      { s: "Et si tous les juz ne sont pas lus avant l’invocation de fin de khatma ?",
        c: "L’appli t’aide à ne pas laisser de juz de côté : 6 heures avant la fin, les pages non terminées retournent au pool pour que quelqu’un d’autre les prenne, et tu peux repousser la fin avec **Prolonger de 24 heures**. Pour l’avis religieux sur cette question, demande à l’imam de ta mosquée." },
      { s: "Et pour une nuit bénie, le Mawlid ou le Ramadan ?",
        c: "Les étapes sont les mêmes. Mets la date de fin au jour de l’occasion, par exemple le soir de la nuit bénie, et écris la dédicace selon l’occasion. Si tu lis avec une grande communauté, **Nouvelle série** ouvre plusieurs khatmas dans le même cercle. Pour une khatma qui continue chaque jour ou chaque semaine pendant tout le Ramadan, un cercle régulier convient mieux : [Organiser une khatma en groupe](/fr/guides/khatma-en-groupe/)." },
      { s: "Est-ce payant ?",
        c: "Créer un cercle ponctuel et le rejoindre sont gratuits. Avec un compte gratuit, tu ne peux pas en créer un nouveau tant que ton cercle ponctuel n’est pas supprimé ; le cercle est supprimé 24 heures après la date de fin. Participer n’a pas de limite." },
    ],
  },

  ilgili: ["hatim", "zikir", "katil"],
  kart: { kicker: "Occasion", baslik: "Cercle ponctuel : khatma, dhikr, invocation", metin: "Pour une nuit bénie, un proche décédé ou une invocation, crée un cercle ponctuel et partage le lien ; même sans l’appli, on participe depuis le navigateur." },
  onizleme: { sahne: "vf-baslat", adim: 0 },
};
