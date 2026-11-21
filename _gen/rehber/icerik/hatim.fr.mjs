// P1 · Khatma en groupe et répartition des juz (FR), écrans 2.1.0 (21 nov. 2026). Source : hatim.tr.mjs.
// Les noms de boutons viennent de l’appli via [[clé]] ; pas de tiret cadratin, pas de Jawshan.
export default {
  title: "Khatma collective : répartir les juz en groupe",
  desc: "Crée une khatma avec ta famille ou ta mosquée : les juz sont répartis dans l’ordre, tu vois qui lit quoi avant de lancer, et chaque tour démarre tout seul.",
  h1: "Organiser une khatma en groupe et répartir les juz",
  crumb: "Khatma en groupe",
  eyebrow: "Guide pas à pas",
  lead: "Tu crées d’abord un cercle, c’est-à-dire un groupe pour ta famille ou ta communauté. Ensuite, tu lances une khatma du Coran dans ce cercle. L’appli décide qui lit quel juz, et tu le vois avant de lancer. Quand la semaine est finie, les juz suivants arrivent tout seuls.",
  meta: ["Prêt en 2 minutes environ", "Ni e-mail ni mot de passe", "Gratuit"],
  film: { sahne: "film-hatim", cap: "Tout le parcours d’un seul coup : crée le cercle, choisis la khatma du Coran, lance." },

  kisa: {
    maddeler: [
      "Dans l’appli, ouvre l’onglet [[tabs.circles]] et touche [[circlesTab.anonCreate]]. Écris ton prénom et le nom du cercle, puis touche [[createGroup.create]].",
      "Touche [[group.welcome.step1Btn]] et envoie le lien à ta famille ou à ton groupe WhatsApp. La personne qui touche le lien choisit [[joinGroup.join]] et entre dans le cercle.",
      "Quand tout le monde est là, touche [[group.addTask]] sur l’écran du cercle et choisis la carte [[tx:compose.typeHatim]].",
      "Un nouveau tour chaque semaine et 1 juz par personne sont déjà réglés. L’aperçu en haut montre la durée de la khatma et qui lit quoi au premier tour.",
      "Si tu veux, change l’ordre avec [[ol:dist.openCreate]], puis touche [[compose.startTask]].",
      "Chacun lit son juz et le marque comme lu. Quand la semaine est finie, les juz suivants sont répartis tout seuls.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "halka", rol: "La personne qui crée le cercle", baslik: "Crée ton cercle",
      giris: "Le cercle, c’est le groupe avec lequel tu pratiques : ta famille, tes amis ou la communauté de ta mosquée. La khatma se crée à l’intérieur de ce cercle.",
      adimlar: [
        {
          baslik: "Crée un nouveau cercle depuis l’onglet Cercles",
          metin: [
            "Ouvre l’appli et touche l’onglet [[tabs.circles]] dans la barre du bas. Touche ensuite le bouton [[circlesTab.anonCreate]] à l’écran.",
            "Si c’est ton premier cercle, l’appli te demande seulement ton prénom. Les membres du cercle te verront sous ce nom. Ni e-mail, ni mot de passe, ni numéro de téléphone ne sont demandés.",
          ],
          ipucu: "Tu ne vois pas ce bouton ? Si tu as déjà rejoint ou créé un cercle, touche le bouton **+** en haut à droite et choisis [[tx:dashboard.createNew]] dans la fenêtre qui s’ouvre. Avec un compte gratuit, tu peux gérer un seul cercle créé par toi à la fois.",
          sahne: "halka-kur",
        },
        {
          baslik: "Donne un nom à ton cercle",
          metin: [
            "Écris un nom dans le champ [[tx:createGroup.groupName]], par exemple « Ma famille » ou « Les frères du vendredi ». La description est facultative. Touche ensuite [[createGroup.create]].",
            "Si ton compte n’est pas encore associé, la fenêtre [[tx:secureNudge.title]] s’affiche une fois, pour ton premier cercle. Si tu l’associes à Apple, Google ou une adresse e-mail, tu ne perds pas ton cercle, même si tu changes de téléphone. Tu peux aussi toucher [[ol:secureNudge.later]] et passer.",
            "L’écran du cercle s’ouvre : la bande des membres en haut, et la carte [[tx:group.welcome.title]] en dessous.",
          ],
          ipucu: "[[tx:createGroup.detailedTrackingTitle]] se choisit seulement à la création. Si tu l’actives, tu vois en tant qu’administrateur la progression quotidienne des membres. Les membres, eux, ne la voient pas.",
          sahne: "halka-form",
        },
        {
          baslik: "Invite tes proches",
          metin: "Sur la carte [[tx:group.welcome.title]], touche [[group.welcome.step1Btn]] et envoie le lien à ton groupe WhatsApp, à ta famille ou à qui tu veux. Sur le téléphone de la personne qui touche le lien, la carte d’invitation du cercle s’ouvre. Quand elle touche [[joinGroup.join]], elle entre dans le cercle. Si le lien s’ouvre dans le navigateur au lieu de l’appli, elle touche le bouton **Ouvrir l’application** de la page.",
          fark: "Garde ton groupe WhatsApp. Partage le lien là-bas : l’appli retient qui lit quel juz.",
          ipucu: "Invite d’abord, lance la khatma ensuite. Les juz sont répartis entre les personnes présentes dans le cercle au moment où tu lances la tâche. Celles qui arrivent plus tard entrent dans l’ordre au tour suivant.",
          sahne: "davet-paylas",
        },
        {
          baslik: "Invite aussi avec un code ou un QR code",
          metin: [
            "Dans la bande des membres, sous le nom du cercle, touche [[group.inviteShort]] : la fenêtre [[tx:group.inviteToCircle]] s’ouvre, avec un code court de six caractères, le lien d’invitation et un QR code. Tu peux dicter le code au téléphone ou projeter le QR code sur un écran à la mosquée.",
            "Une personne qui n’a pas l’appli la télécharge depuis la page qui s’ouvre quand elle touche le lien. Ensuite, elle touche [[ol:circlesTab.anonJoin]] dans l’onglet [[tabs.circles]], colle le lien d’invitation ou le code et rejoint le cercle. Plus de détails : [Rejoindre un cercle avec une invitation](/fr/guides/rejoindre-un-cercle/).",
          ],
          sahne: "davet-penceresi",
        },
      ],
    },
    {
      tur: "bolum", id: "hatim", rol: "La personne qui crée le cercle", baslik: "Lance la khatma",
      giris: "La khatma est une tâche du cercle. Une khatma, un dhikr et une lecture de livre peuvent avancer en même temps dans le même cercle. La tâche se crée sur un seul écran : un aperçu en direct en haut, et en dessous des lignes que tu peux modifier.",
      adimlar: [
        {
          baslik: "Ajoute une tâche et choisis la khatma du Coran",
          metin: "Sur l’écran du cercle, touche le bouton [[group.addTask]] en bas à droite. Le bouton [[group.welcome.step2Btn]] de la carte [[tx:group.welcome.title]] ouvre le même écran. Sur l’écran [[tx:compose.pickTitle]], touche la carte [[tx:compose.typeHatim]].",
          ipucu: "La carte [[tx:compose.tplWeeklyHatim]] de la ligne [[tx:compose.quickStart]] s’ouvre avec les mêmes réglages.",
          sahne: "hatim-sec",
        },
        {
          baslik: "Regarde l’aperçu et change une ligne si besoin",
          metin: [
            "La carte du haut montre la tâche avant même son lancement : un nouveau tour chaque semaine, 1 juz par personne. Dans un cercle de cinq personnes, la khatma dure environ 6 semaines. Les perles pleines de l’anneau sont les juz lus au premier tour, la perle dorée est ta part. En dessous, tu vois qui lit quel juz au premier tour.",
            "Touche une ligne : une fenêtre s’ouvre et ton choix apparaît tout de suite dans l’aperçu.",
          ],
          liste: [
            "[[tx:compose.rowCadence]] : chaque jour, chaque semaine ou un autre intervalle, par exemple tous les 3 jours.",
            "[[tx:compose.rowPer]] : juz par juz ou page par page, et combien à chaque tour. Avec 2 juz par personne, la khatma dure 3 semaines.",
            "[[tx:compose.rowWho]] : tout le cercle, les personnes que tu choisis, ou ceux du cercle qui le veulent.",
          ],
          fark: "Tu n’as pas à calculer la durée de la khatma : l’aperçu la réécrit à chaque changement.",
          ipucu: "Le cadenas sur les lignes [[tx:compose.rowWhat]] et [[tx:compose.rowHow]] indique que ces deux choix ne changent plus après le lancement. Au lieu d’une khatma complète, tu peux aussi choisir certains juz.",
          sahne: "hatim-onizleme",
        },
        {
          baslik: "Vérifie la répartition si tu veux",
          metin: "Touche [[ol:dist.openCreate]] dans l’aperçu. Ici, on change l’ordre, pas les plages : touche deux personnes l’une après l’autre et elles échangent leur place, puis les juz sont recalculés sans trou. Pour donner moins à celui qui lit lentement et plus à celui qui le souhaite, utilise le moins et le plus à côté de chaque personne. À la fin, touche [[dist.confirm]] ; la carte affiche alors [[tx:dist.confirmed]].",
          ipucu: "[[tx:dist.rotateLabel]] est désactivé par défaut : le tour suivant reprend là où celui-ci s’arrête. Si tu l’actives, chacun passe à la partie suivante à chaque khatma terminée. Toi seul vois les parts ; chacun voit la sienne.",
          sahne: "hatim-dagitim",
        },
        {
          baslik: "Donne un nom à la tâche et lance-la",
          metin: "Le [[tx:compose.nameLabel]] s’écrit selon tes choix, par exemple « Khatma hebdomadaire ». Tu peux écrire le tien, comme « Khatma familiale ». Touche ensuite [[compose.startTask]]. La fenêtre [[tx:group.circleStartedTitle]] s’affiche et chacun reçoit son juz sur son propre écran au même moment ; [[group.goToTaskScreen]] t’emmène à l’écran de la tâche.",
          fark: "Tu n’as pas à calculer qui lit quel juz : l’appli répartit selon l’ordre du cercle.",
          ipucu: "Dans [[tx:compose.more]], tu trouves le jour de début, le [[tx:wizard.observerModeTitle]] (tu ne reçois pas de part et tu accompagnes le cercle) et [[tx:wizard.autoAdvanceTitle]]. Le tour automatique est activé par défaut : quand le temps d’un tour est écoulé, le nouveau tour commence tout seul. Les tours changent à minuit, à ton heure.",
          sahne: "hatim-baslat",
        },
      ],
    },
    {
      tur: "halka",
      baslik: "Comment les tours avancent",
      metin: [
        "À la fin d’un tour, les juz suivants sont répartis tout seuls et la khatma reprend là où elle s’était arrêtée. Dans un cercle de cinq personnes, on lit les juz 1–5 la première semaine, puis les juz 6–10 la deuxième. À la fin de la sixième semaine, la khatma est terminée et le cercle en commence une nouvelle, de la même façon.",
        "Un juz qui n’a pas été lu ne disparaît pas : au tour suivant, il reste **confié** à la même personne. Tu n’as pas à refaire une liste chaque semaine.",
      ],
    },
    {
      tur: "bolum", id: "sonraki-tur", rol: "La personne qui crée le cercle", baslik: "Régler le tour suivant",
      giris: "Même après le lancement, tu peux changer l’ordre et les parts. Le changement vaut à partir du tour suivant ; les parts du tour en cours restent telles quelles.",
      adimlar: [
        {
          baslik: "Change-les depuis l’onglet Cercle de la tâche",
          metin: "Sur l’écran de la tâche, passe à l’onglet [[tx:flow.tabCircle]]. Tout en haut se trouve la carte [[tx:flow.observerInfoNextRoundLabel]], que toi seul vois : quand le tour suivant commence et qui lit quoi. Touche [[nextRound.open]]. Sur l’écran qui s’ouvre, change l’ordre, les parts ou l’interrupteur [[tx:dist.rotateLabel]], puis touche [[taskSettings.save]].",
          ipucu: "La roue dentée en haut ouvre les [[tx:taskSettings.title]] : le même écran que pour la création, qui montre cette fois le tour suivant. Tu y changes la fréquence des tours, la quantité par personne et le nom de la tâche.",
          sahne: "sonraki-tur",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", rol: "Tout le cercle", baslik: "Lis ton juz",
      giris: "Chaque membre du cercle lit sa part chez lui, au moment qui lui convient.",
      adimlar: [
        {
          baslik: "Touche la notification ou la carte de l’Accueil",
          metin: "Quand un nouveau tour commence, tu reçois une notification. En la touchant, tu ouvres ta tâche. Si tu as ouvert l’appli toi-même, touche la carte de la khatma dans la section [[tx:dashboard.myTasks]] de l’onglet [[tx:tabs.home]] : tu y vois le nom du cercle, le juz qui t’est attribué et les jours restants. En haut de l’écran de la tâche, tu vois la progression du cercle et le temps restant avant la fin du tour.",
          ipucu: "La notification d’un tour qui commence la nuit ne te réveille pas : elle arrive le matin.",
          sahne: "uye-bildirim",
        },
        {
          baslik: "Touche Commencer à lire, puis J’ai lu",
          metin: [
            "Touche [[quran.startReading]]. Le Coran s’ouvre à la première page qui t’est attribuée. La fine barre en haut montre combien tu as déjà lu. À la dernière page, le bouton [[hatim.markRead]] apparaît en bas. Touche-le, puis touche encore [[hatim.markRead]] dans la fenêtre qui s’ouvre. Ta part est terminée et tu reviens à l’écran de la tâche.",
            "La carte de la tâche devient la carte [[tx:taskDone.title]]. Tu y vois combien de membres du cercle ont terminé.",
          ],
          fark: "Pas besoin de chercher ton mushaf : les pages qui te sont attribuées s’ouvrent dans l’appli.",
          ipucu: "Si tu as lu dans un mushaf imprimé, touche [[flow.complete]] sur l’écran de la tâche. Si tu n’as pas marqué les parties lues, réponds [[common.yes]] à la question qui s’affiche.",
          sahne: "uye-oku",
        },
      ],
    },
    {
      tur: "ikili", id: "yetisemezsen", rol: "Tout le cercle", baslik: "Si quelqu’un n’y arrive pas",
      giris: "Toutes les semaines ne se ressemblent pas. Celui qui ne pourra pas finir sa part ne bloque pas le cercle : les autres l’aident.",
      kartlar: [
        { baslik: "Demander de l’aide", metin: "Touche [[ol:flow.askHelp]] sous la carte de la tâche et choisis pour combien de pages tu veux de l’aide ; la moitié est déjà proposée. La fenêtre indique quelles pages s’ouvrent au cercle et lesquelles restent chez toi. Quand tu touches [[flow.askHelp]], ces pages apparaissent pour les autres dans la liste [[tx:flow.waitingForHelpTitle]].", sahne: "yardim-iste" },
        { baslik: "Aider", metin: "Dans l’onglet [[tx:flow.tabCircle]] de l’écran de la tâche, tu vois les personnes qui attendent de l’aide. Touche [[flow.helpTitle]] et choisis dans la fenêtre la part que tu prends. Les pages prises arrivent sur ton écran.", sahne: "yardim-et" },
      ],
      not: "Si tu dois laisser toute ta part, tu peux la remettre au pool avec le bouton [[ol:flow.excuse]] : celui qui le souhaite peut alors l’y prendre. Ce choix est définitif.",
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Dans l’appli, ça ressemble à ça",
      giris: "Ces captures viennent de l’appli elle-même.",
      kareler: [
        { img: "h-flow", alt: "Écran de la tâche : progression du cercle, jours restants du tour et carte Ta tâche avec le juz 17", cap: "Écran de la tâche : ton juz" },
        { img: "h-halka-ust", alt: "Onglet Cercle de la tâche : la carte Tour suivant de l’administrateur et les juz de chaque membre", cap: "Onglet Cercle : le tour suivant et qui en est à quel juz" },
        { img: "h-dagitim", alt: "Régler le prochain tour : décalage de l’ordre, qui lit quoi et parts par personne", cap: "Régler le prochain tour" },
        { img: "n-home", alt: "Accueil : dans Ma part, la carte d’une khatma avec le juz 17", cap: "Accueil : ta part" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Comment les juz sont-ils répartis entre les participants ?",
        c: "L’appli les répartit selon l’ordre du cercle : le juz 1 à la première personne, le juz 2 à la deuxième, et ainsi de suite. Avant le lancement, l’aperçu montre le premier tour et tu peux changer l’ordre avec [[ol:dist.openCreate]]. Au tour suivant, les juz suivants sont répartis dans le même ordre : dans un cercle de 5 personnes, le deuxième tour continue avec les juz 6–10. Une fois la khatma lancée, tu changes l’ordre avec [[nextRound.open]] sur l’écran de la tâche." },
      { s: "Que se passe-t-il à la fin de la semaine, ou si quelqu’un ne lit pas ?",
        c: "Si [[tx:wizard.autoAdvanceTitle]] est activé (c’est le cas par défaut), le nouveau tour commence tout seul à minuit, à ton heure, et les juz suivants sont répartis ; si tu le désactives, c’est toi qui lances le nouveau tour. La part non lue ne se perd pas : au tour suivant, elle reste **confiée** à la même personne. Elle peut aussi ouvrir une partie au cercle avec [[flow.askHelp]], ou remettre toute sa part au pool avec [[flow.excuse]] ; les autres la prennent avec [[flow.helpTitle]]." },
      { s: "Nous avons déjà un groupe WhatsApp : à quoi sert l’appli ?",
        c: "Garde ton groupe. Partage le lien d’invitation dans le groupe : la liste, qui a lu et les rappels, c’est l’appli qui s’en occupe. Tu n’as pas à refaire une liste chaque semaine. Si tu veux quand même une liste sur papier, utilise le [tableau de khatma à imprimer](/fr/tableau-khatma/)." },
      { s: "Un parent âgé sans l’appli peut-il participer ?",
        c: "Dans un cercle régulier, l’administrateur peut ajouter une personne sans l’appli comme **invité** ; un membre responsable marque sa lecture. Pour une khatma ponctuelle avec **Pool commun**, ceux qui n’ont pas l’appli prennent un juz depuis le lien d’invitation, dans le navigateur : [Cercle ponctuel](/fr/guides/cercle-ponctuel/)." },
      { s: "Est-ce payant ?",
        c: "Créer un cercle, lancer une khatma et rejoindre un cercle sont gratuits. Avec un compte gratuit, tu peux gérer un seul cercle créé par toi à la fois. Rejoindre les cercles des autres n’a pas de limite." },
      { s: "Peut-on faire une khatma en répartissant les juz ?",
        c: "Les avis peuvent varier selon les écoles et les savants. Pour un avis religieux, demande à un savant en qui tu as confiance. L’appli, elle, se contente de répartir les juz : chacun lit sa part." },
    ],
  },

  ilgili: ["tek", "katil", "oruc"],
  kart: { kicker: "Khatma", baslik: "Khatma en groupe", metin: "Crée ton cercle, répartis les 30 juz ; vois d’abord qui lit quoi, les tours avancent tout seuls." },
  onizleme: { sahne: "hatim-kart", adim: 6 },
  cta: { baslik: "Crée ton cercle aujourd’hui", metin: "Créer un cercle et le rejoindre est gratuit. Télécharge l’appli, crée ton cercle, partage le lien d’invitation." },
};
