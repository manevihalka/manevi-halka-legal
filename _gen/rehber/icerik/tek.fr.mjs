// Cercle ponctuel (FR). Réécrit le 21 nov. 2026 pour le parcours 2.1.0 ; traduction de tek.tr.mjs.
// Les noms des boutons viennent de l'appli via [[clé]] ; ceux de la page web et de l'écran Résultat via [[=texte]].
export default {
  title: "Cercle ponctuel : khatma ou 41 Yasin en groupe, pas à pas",
  desc: "Crée en un seul écran une khatma, 41 Yasin ou des salawat en groupe pour une nuit bénie, le Ramadan, la guérison ou un proche disparu, puis envoie le lien.",
  h1: "Cercle ponctuel : organiser une khatma, 41 Yasin ou des salawat en groupe",
  crumb: "Cercle ponctuel",
  eyebrow: "Guide pas à pas",
  lead: "Lors d’une nuit bénie, pendant le Ramadan, pour la guérison d’un proche malade ou pour un proche disparu, tu veux peut-être faire une khatma, lire Yasin 41 fois ou réciter des salawat avec ceux que tu aimes. Dans l’appli, tu crées pour cela un cercle ponctuel : tu choisis ce qui est lu, pour qui et jusqu’à quand, puis tu envoies le lien. Tout tient sur un écran et prend environ une minute.",
  meta: ["Prêt en 1 minute environ", "Même sans l’appli", "Gratuit"],
  film: { sahne: "film-tek", cap: "Un seul parcours : choisis un modèle, pour qui et jusqu’à quand, touche [[eventCompose.cta]], invite." },

  kisa: {
    maddeler: [
      "Dans l’onglet [[tabs.circles]], touche **+** en haut à droite, puis la carte [[tx:event.createMenuTitle]].",
      "Sur l’écran [[tx:eventCompose.pickTitle]], choisis un modèle : [[tx:eventCompose.tplHatim]], [[tx:eventCompose.tplYasin41]], [[tx:eventCompose.tplSalavat]] ou [[tx:eventCompose.tplCustom]].",
      "Dans le récapitulatif, touche les lignes [[tx:eventCompose.rowFor]] et [[tx:eventCompose.rowEnd]] et choisis.",
      "Donne un nom au cercle et touche [[eventCompose.cta]]. Le cercle commence tout de suite.",
      "Sur l’écran [[tx:eventCompose.readyTitle]], touche [[eventCompose.invite]] et envoie le lien à ta famille ou à ton groupe WhatsApp.",
      "Chacun lit là où il est ; l’appli ne fait que répartir. Quand l’objectif est atteint, le cercle se termine et chacun reçoit une notification.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Celui ou celle qui crée le cercle", baslik: "Créer le cercle",
      giris: [
        "Un cercle ponctuel se crée pour une occasion : ce qui est lu, pour qui et jusqu’à quand est clair dès le départ. Il grandit grâce à un lien et se termine quand l’objectif est atteint. Pas besoin de créer un groupe permanent.",
        "Si tu veux une khatma chaque semaine en famille, un cercle régulier convient mieux : [Créer une khatma en groupe](/fr/guides/khatma-en-groupe/).",
      ],
      adimlar: [
        {
          baslik: "Ouvrir un cercle ponctuel",
          metin: [
            "Dans l’appli, touche l’onglet [[tabs.circles]] en bas et le **+** vert en haut à droite.",
            "Le panneau [[tx:dashboard.addCircle]] descend du haut. Touche la carte [[tx:event.createMenuTitle]] au milieu.",
          ],
          ipucu: "S’il n’y a pas de **+** en haut à droite, tu n’as pas encore indiqué ton nom dans l’appli. Touche alors [[ol:circlesTab.anonCreateEvent]] au milieu ; une fois ton nom saisi, le même écran s’ouvre.",
          sahne: "tek-ac",
        },
        {
          baslik: "Choisir ce qui est lu",
          metin: "Sous la question [[tx:eventCompose.pickTitle]], tu trouves des modèles prêts. Touches-en un et le récapitulatif s’ouvre déjà rempli :",
          liste: [
            "[[tx:eventCompose.tplHatim]] : le Coran entier est mis dans un pool en 30 juz, chacun prend le juz qu’il veut.",
            "[[tx:eventCompose.tplYasin41]] : la sourate Yasin est lue 41 fois par le cercle, chacun dans le lecteur de l’appli. Plus de détails : [41 Yasin en groupe](/fr/guides/41-yasin-en-groupe/).",
            "[[tx:eventCompose.tplSalavat]] : 1 000 salawat ensemble ; ce que chacun compte s’ajoute à un compteur commun.",
            "[[tx:eventCompose.tplCustom]] : dhikr, invocation ou sourate ; tu fixes la liste et l’objectif.",
          ],
          ipucu: "Le modèle n’est qu’un point de départ. Tu peux changer chaque ligne dans le récapitulatif.",
          sahne: "tek-sablon",
        },
        {
          baslik: "Dire pour qui",
          metin: [
            "La carte [[tx:eventCompose.thisCircle]] en haut du récapitulatif montre le cercle d’un coup d’œil : son nom, ce qui est lu, la fin et un anneau de perles sur le côté. La phrase en bas de la carte indique la part de chacun si 10 personnes participent.",
            "Touche la ligne [[tx:eventCompose.rowFor]]. La fenêtre propose trois puces : [[tx:eventCompose.intentRuh]], [[tx:eventCompose.intentSifa]] et [[tx:eventCompose.intentVesile]]. Une puce remplit le champ, et tu peux modifier le texte comme tu veux. Puis touche [[common.ok]].",
          ],
          ipucu: "Cette ligne est facultative. Ta phrase reste en haut de l’écran du cercle, et les personnes invitées la voient aussi.",
          sahne: "tek-kimin",
        },
        {
          baslik: "Choisir jusqu’à quand",
          metin: "Touche la ligne [[tx:eventCompose.rowEnd]] et choisis une puce :",
          liste: [
            "[[tx:eventCompose.endTonight]] : jusqu’au prochain fajr là où tu es.",
            "[[tx:eventCompose.endFriday]] : jusqu’à vendredi prochain à midi, 12 h.",
            "[[tx:eventCompose.endDays3]] ou [[tx:eventCompose.endWeek]] : à partir de maintenant.",
            "Jusqu’à la prochaine nuit bénie, par exemple [[tx:eventCompose.untilKandil.regaib]] : jusqu’à 20 h ce soir-là. Cette puce apparaît quand la nuit est à moins de 60 jours.",
            "[[tx:eventCompose.endCustom]] : tu choisis toi-même le jour et l’heure.",
          ],
          fark: "Sous les puces, tu vois l’heure de fin exacte et la part de chacun. Choisis la durée en conséquence.",
          sahne: "tek-bitis",
        },
        {
          baslik: "Pour une khatma : vérifier l’étendue et le partage",
          metin: [
            "Dans une khatma, la ligne [[tx:compose.rowWhat]] indique [[tx:eventCompose.whatQuranFull]]. Si seuls certains juz sont lus, touche-la et choisis [[tx:event.customJuz]].",
            "La ligne [[tx:eventCompose.rowShare]] propose deux voies :",
          ],
          liste: [
            "[[tx:event.distPool]] (par défaut) : tous les juz restent dans le pool, chacun prend celui qu’il veut. Ceux qui arrivent plus tard peuvent rejoindre ; le cercle commence dès qu’il est créé.",
            "[[tx:eventCompose.shareDivide]] : les parts sont réparties à égalité entre ceux qui ont rejoint. Quand tout le monde est là, tu lances le cercle toi-même, et on ne peut plus rejoindre après le début.",
          ],
          fark: "Les proches sans l’appli participent aussi : avec [[tx:event.distPool]], ils prennent une part depuis le lien dans leur navigateur et la lisent.",
          sahne: "tek-paylas",
        },
        {
          baslik: "Nommer le cercle et l’ouvrir",
          metin: [
            "Le champ [[tx:eventCompose.nameLabel]] contient déjà un nom tiré de tes choix, par exemple [[tx:event.suggestFullHatim]]. Change-le si tu veux, par exemple en « Khatma de Ragha’ib ».",
            "Dans la carte [[tx:compose.more]], la ligne [[tx:compose.rowStart]] indique [[tx:eventCompose.startNow]]. Si tu veux que le cercle commence à une heure précise, choisis-la là.",
            "Si tout est bon, touche [[eventCompose.cta]] en bas.",
          ],
          ipucu: "Le cercle est supprimé 24 heures après sa date de fin. Si le temps manque, tu peux prolonger plus tard ; voir plus bas.",
          sahne: "tek-ac-dugme",
        },
        {
          baslik: "Inviter",
          metin: [
            "L’écran [[tx:eventCompose.readyTitle]] s’ouvre. Le cercle a déjà commencé : toute personne à qui tu envoies le lien peut prendre sa part tout de suite.",
            "Touche [[eventCompose.invite]] et choisis ton groupe WhatsApp ou tes contacts. Le message est prêt : pour qui, le nom du cercle, sa fin et le lien. Avec [[ol:eventCompose.copyLink]], tu peux aussi coller le lien toi-même.",
            "Ensuite, [[tx:eventCompose.goToCircle]] ouvre l’écran du cercle.",
          ],
          fark: "Garde ton groupe WhatsApp et poste le lien là-bas. Qui a pris quel juz et combien de fois on a lu, l’appli le retient ; personne n’a besoin de tenir une liste.",
          ipucu: "Pour ton premier cercle, la fenêtre [[tx:secureNudge.title]] peut apparaître une fois. Si tu relies ton compte à Apple, Google ou un e-mail, ton cercle te suit même si tu changes de téléphone.",
          sahne: "tek-hazir",
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Toutes les personnes qui rejoignent", baslik: "Rejoindre et lire ta part",
      giris: "Chacun lit là où il est ; l’appli ne fait que répartir. Personne n’a besoin de se réunir : qui a pris quoi et ce qui a été lu s’affichent sur l’écran du cercle.",
      adimlar: [
        {
          baslik: "Rejoindre avec le lien",
          metin: [
            "Le lien d’invitation ouvre l’appli sur la carte du cercle : son nom, pour qui, combien de personnes ont rejoint et quand il se termine. Touche [[joinGroup.join]]. La première fois, ton nom suffit.",
            "Si le lien s’ouvre dans le navigateur au lieu de l’appli, voir [Rejoindre un cercle](/fr/guides/rejoindre-un-cercle/).",
          ],
          sahne: "tek-katil",
        },
        {
          baslik: "Découvrir l’écran du cercle et prendre un juz",
          metin: [
            "L’écran du cercle se lit de haut en bas. La carte du haut montre pour quoi on lit et ce qu’il reste : les juz entièrement lus sont des perles vertes, ceux qui sont pris sont dorés ; en bas, le temps restant et la part de chacun. Juste en dessous, ce que tu as à faire tient en un grand bouton. Dans une khatma viennent ensuite [[tx:eventScreen.statusTitle]], puis la carte d’invitation tout en bas.",
            "Le bouton [[eventScreen.takeJuz]] propose le prochain juz libre. Touche-le puis [[event.takeWholeCuz]] dans la fenêtre ; les pages de ce juz sont à toi. Si tu lis moins, indique la première et la dernière page et touche [[ol:event.claimRange]]. Pour un autre juz, touche-le dans la carte [[tx:eventScreen.statusTitle]].",
          ],
          ipucu: "La carte d’invitation est pour tout le monde : chaque participant peut en inviter d’autres avec [[eventCompose.invite]].",
          sahne: "tek-cuz",
        },
        {
          baslik: "Lire, puis marquer comme lu",
          metin: [
            "Ton juz reste sur ta carte. Touche [[eventScreen.continue]] ; le Coran s’ouvre à ta première page.",
            "Quand tu as fini, reviens et touche [[ol:hatim.markRead]]. Confirme avec [[event.completeConfirmTitle]] dans la fenêtre : tes pages comptent comme lues et une perle du cercle se remplit.",
          ],
          fark: "Pas besoin de chercher un mushaf : tes pages s’ouvrent dans l’appli.",
          ipucu: "Quelques heures avant la fin, les pages non marquées comme lues retournent au pool pour que quelqu’un d’autre les prenne. Marque ta part à temps.",
          sahne: "tek-oku",
        },
        {
          baslik: "Dans un cercle de 41 Yasin ou de salawat",
          metin: [
            "Dans un cercle de sourate, ta carte a un bouton [[eventCompose.readBtn]] : Yasin s’ouvre dans le lecteur de l’appli sur ses propres pages. À la dernière page, tu touches [[hatim.markRead]] et, de retour dans le cercle, le compteur augmente d’un. Si tu as lu dans un livre, touche [[tx:readTogether.markFromBook]].",
            "Dans un cercle de salawat ou de dhikr, au même endroit, le bouton [[event.count]] ouvre le compteur ; chaque toucher sur l’écran compte un.",
          ],
          ipucu: "Pas à pas : [41 Yasin en groupe](/fr/guides/41-yasin-en-groupe/) et [Dhikr et salawat en groupe](/fr/guides/dhikr-salawat-en-groupe/).",
          sahne: "yasin-oku",
        },
        {
          baslik: "Sans l’appli : participer depuis le navigateur",
          metin: [
            "Dans une khatma avec pool commun, le lien ouvre la page du cercle dans le navigateur. L’intention est en haut, et le nombre de pages lues juste en dessous.",
            "Dans la carte [[=Portion suivante]], touche [[=Prendre celle-ci]], choisis combien de pages tu liras et touche [[=Je confirme, je la prends]]. [[=Lire maintenant]] ouvre les pages dans le navigateur ; une fois lues, touche [[=Je l’ai terminée]] à la fin des pages.",
            "Dans un cercle de 41 Yasin, de salawat ou de dhikr, la page a un bouton [[=Participer au décompte]] : il ouvre un compteur, tu comptes ce que tu as lu ou récité et tu touches [[=Ajouter mon décompte]].",
          ],
          fark: "Même si ta tante n’a pas l’appli : sans compte, avec le seul lien, elle prend sa part et la lit.",
          ipucu: "Dans une khatma réglée sur [[tx:eventCompose.shareDivide]], le navigateur ne participe pas à la répartition ; on peut seulement reprendre les parts restées inachevées quand elles s’ouvrent au pool.",
          sahne: "tek-web",
        },
      ],
    },
    {
      tur: "ikili", id: "bitis", rol: "Celui ou celle qui crée le cercle", baslik: "Durée et fin",
      giris: "L’appli s’occupe aussi de la fin du cercle : elle le termine quand l’objectif est atteint, prévient tout le monde et garde le résultat.",
      kartlar: [
        {
          baslik: "Si le temps manque",
          metin: [
            "Sur l’écran du cercle, touche **···** en haut à droite et choisis [[tx:event.extend24h]]. La fin est repoussée de 24 heures ; tu peux recommencer si besoin.",
            "Le même menu contient [[tx:event.participantsTitle]] et [[tx:event.editTitle]]. Dans une khatma, [[tx:event.releasePool]] ouvre à tous les parts prises mais non lues, et [[tx:event.addSeriesTitle]] lance une nouvelle khatma de 30 juz dans le même cercle.",
          ],
          sahne: "tek-uzat",
        },
        {
          baslik: "Quand l’objectif est atteint",
          metin: [
            "Quand tous les juz sont lus ou que le compteur atteint l’objectif, le cercle se termine de lui-même. Si l’écran est ouvert, un court message l’annonce ; ceux qui ont fermé l’appli reçoivent une notification.",
            "Le bouton [[=Voir le résultat]] sur l’écran du cercle ouvre le Résultat du cercle : le total du cercle et ta propre contribution.",
            "Si tu reprends la même intention à chaque nuit bénie ou chaque vendredi, touche [[=Recréer ce cercle]] dans le résultat. La création s’ouvre avec le même objectif, le même nom et la même dédicace ; tu choisis seulement la fin.",
          ],
          sahne: "tek-tamam",
        },
      ],
      not: "Le cercle est supprimé 24 heures après sa date de fin. Son résultat reste ensuite dans [[tx:tabs.profile]] › [[=Mon parcours]] › [[=Cercles]].",
    },
    {
      tur: "ikili", id: "vesileler", rol: "Exemples", baslik: "Pour quelles occasions ?",
      giris: [
        "Un cercle ponctuel se crée pour toute occasion : une khatma pour une nuit bénie ou le Ramadan, 41 Yasin ou des salawat avec l’intention de guérison pour un malade, une khatma pour un proche disparu, une invocation commune pour un mariage dans la famille ou pour quelqu’un qui part au Hajj.",
        "Les étapes sont toujours les mêmes. Seuls le modèle, la dédicace et la fin changent selon l’occasion.",
      ],
      kartlar: [
        {
          baslik: "Pour un proche disparu",
          metin: [
            "Dans la fenêtre [[tx:eventCompose.rowFor]], touche la puce [[tx:eventCompose.intentRuh]] et modifie le texte si tu veux, par exemple « Pour l’âme de notre père ». Un cercle créé avec cette puce ajoute la ligne « [[tx:eventInvite.fatiha]] » au message d’invitation.",
            "Fixe la fin à un moment où la famille peut lire sereinement ; l’appli ne propose aucun jour particulier. Au lieu d’une khatma, tu peux aussi choisir [[tx:eventCompose.tplYasin41]] ou [[tx:eventCompose.tplSalavat]].",
            "Chacun lit son juz là où il est. L’appli ne fait que répartir les juz et montrer ceux qui sont lus.",
          ],
          sahne: "tek-ruh",
        },
        {
          baslik: "Pour les nuits bénies, le Ramadan et la guérison",
          metin: [
            "Pour une khatma liée à une nuit bénie, choisis dans la fenêtre [[tx:eventCompose.rowEnd]] la puce de la prochaine nuit, par exemple [[tx:eventCompose.untilKandil.regaib]]. Le cercle dure jusqu’à ce soir-là.",
            "Pour un malade, la puce [[tx:eventCompose.intentSifa]] écrit « [[tx:eventCompose.intentSifaFill]] » dans le champ. Pour une lecture courte, [[tx:eventCompose.tplYasin41]] ou [[tx:eventCompose.tplSalavat]] conviennent bien.",
            "Si tu lis avec une grande communauté, [[tx:event.addSeriesTitle]] dans le menu **···** du cercle ouvre plusieurs khatmas dans le même cercle. Pour une khatma qui dure tout le Ramadan, chaque jour ou chaque semaine, un cercle régulier convient mieux : [Créer une khatma en groupe](/fr/guides/khatma-en-groupe/).",
          ],
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Comment organiser une khatma en groupe ?",
        c: "Dans l’onglet [[tabs.circles]], touche **+**, puis la carte [[tx:event.createMenuTitle]] et le modèle [[tx:eventCompose.tplHatim]]. Choisis les lignes [[tx:eventCompose.rowFor]] et [[tx:eventCompose.rowEnd]], touche [[eventCompose.cta]] et envoie le lien avec [[eventCompose.invite]]. Chacun prend un juz et le lit là où il est ; l’appli ne fait que répartir les juz." },
      { s: "Quelle différence entre un cercle ponctuel et un cercle régulier ?",
        c: "Un cercle ponctuel est lié à une occasion : il a un objectif et une fin, se termine quand l’objectif est atteint et est supprimé 24 heures après la fin ; son résultat reste dans l’appli. Un cercle régulier est une communauté durable avec ta famille ou ta mosquée ; la khatma continue chaque jour ou chaque semaine avec un nouveau tour. Plus de détails : [Créer une khatma en groupe](/fr/guides/khatma-en-groupe/)." },
      { s: "Les personnes sans l’appli peuvent-elles participer ?",
        c: "Dans la plupart des cercles, oui. Dans une khatma en [[tx:event.distPool]], la personne qui ouvre le lien prend une portion dans le navigateur et la lit. Dans les cercles de 41 Yasin, de salawat et de dhikr, elle contribue au décompte [[tx:event.modeCollective]] depuis le navigateur. Aucun compte n’est nécessaire. La répartition d’une khatma réglée sur [[tx:eventCompose.shareDivide]] et un décompte [[tx:event.modeIndividual]] se rejoignent depuis l’appli." },
      { s: "Et si tous les juz ne sont pas lus avant l’invocation de clôture ?",
        c: "Ce guide ne donne pas d’avis sur la question ; chaque cercle peut suivre ses propres savants. Dans l’appli, les parts non marquées comme lues retournent au pool quelques heures avant la fin, et la personne qui a créé le cercle peut prolonger de 24 heures." },
      { s: "Que se passe-t-il à la fin du cercle ?",
        c: "Quand l’objectif est atteint, le cercle se termine, chacun reçoit une notification et le bouton [[=Voir le résultat]] ouvre le résultat. Si le temps s’écoule avant, le cercle est supprimé 24 heures après la fin ; jusque-là, on peut prolonger de 24 heures. Le résultat reste ensuite dans [[tx:tabs.profile]] › [[=Mon parcours]]." },
      { s: "Est-ce payant ?",
        c: "Créer un cercle ponctuel et y participer est gratuit. Avec un compte gratuit, tu gères un cercle ponctuel à la fois ; quand il est terminé ou supprimé, tu crées le suivant. Le nombre de cercles que tu peux rejoindre n’est pas limité." },
    ],
  },

  ilgili: ["yasin", "hatim", "katil"],
  kart: { kicker: "Pour une occasion", baslik: "Cercle ponctuel : prêt en une minute", metin: "Choisis une khatma, 41 Yasin ou des salawat, dis pour qui et jusqu’à quand, envoie le lien." },
  onizleme: { sahne: "tek-kart", adim: 4 },
};
