// P1 · Créer une khatma en groupe et répartir les juz (FR). Format : commentaire en tête de _gen/build-rehber.mjs.
// Les noms des boutons viennent de l'appli via [[clé]] ; pas de tiret long.
export default {
  title: "Khatma collective : répartir les juz en groupe",
  desc: "Crée une khatma avec ta famille ou ta mosquée : chacun reçoit son juz automatiquement, le lit dans l’appli, et chaque nouveau tour démarre tout seul.",
  h1: "Organiser une khatma en groupe et répartir les juz",
  crumb: "Khatma en groupe",
  eyebrow: "Guide pas à pas",
  lead: "Tu crées d’abord un cercle, c’est-à-dire un groupe pour ta famille ou ta communauté. Ensuite, tu lances une khatma dans ce cercle. L’appli décide qui lit quel juz. Quand la semaine est finie, les juz suivants arrivent tout seuls.",
  meta: ["Prêt en 2 minutes environ", "Ni e-mail ni mot de passe", "Gratuit"],
  film: { sahne: "film-hatim", cap: "Tout le parcours d’un seul coup : crée le cercle, choisis le Coran, lance." },

  kisa: {
    maddeler: [
      "Dans l’appli, ouvre l’onglet [[tabs.circles]] et touche [[circlesTab.anonCreate]]. Écris ton prénom et le nom du cercle, puis touche [[createGroup.create]].",
      "Touche [[group.welcome.step1Btn]] et envoie le lien à ta famille ou à ton groupe WhatsApp. La personne qui touche le lien choisit [[joinGroup.join]] et entre dans le cercle.",
      "Quand tout le monde est là, touche [[group.welcome.step2Btn]] et choisis la carte [[tx:wizard.goalQuran]].",
      "Khatma par juz, khatma complète, un tour par semaine et 1 juz par personne sont déjà réglés. Touche trois fois [[wizard.continue]].",
      "Donne un nom à la tâche, regarde dans l’aperçu qui commence par quel juz, puis touche [[wizard.startCircle]].",
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
          ],
          ipucu: "[[tx:createGroup.detailedTrackingTitle]] se choisit seulement à la création. Si tu l’actives, tu vois en tant qu’administrateur la progression quotidienne des membres. Les membres, eux, ne la voient pas.",
          sahne: "halka-form",
        },
        {
          baslik: "Invite tes proches",
          metin: "Sur l’écran du cercle, la carte [[tx:group.welcome.title]] s’affiche. Touche [[group.welcome.step1Btn]] et envoie le lien à ton groupe WhatsApp, à ta famille ou à qui tu veux. Sur le téléphone de la personne qui touche le lien, la carte d’invitation du cercle s’ouvre. Quand elle touche [[joinGroup.join]], elle entre dans le cercle. Si le lien s’ouvre dans le navigateur au lieu de l’appli, elle touche le bouton **Ouvrir l’application** de la page.",
          fark: "Garde ton groupe WhatsApp. Partage le lien là-bas : l’appli retient qui lit quel juz.",
          ipucu: "Invite d’abord, lance la khatma ensuite. Les juz sont répartis entre les personnes présentes dans le cercle au moment où tu lances la khatma. Celles qui arrivent plus tard reçoivent leur part au tour suivant.",
          sahne: "davet-paylas",
        },
        {
          baslik: "Invite aussi avec un code ou un QR code",
          metin: [
            "En haut à droite de l’écran du cercle, il y a trois icônes. Touche celle du milieu, la silhouette avec un signe plus : la fenêtre [[tx:group.inviteToCircle]] s’ouvre, avec un code court de six caractères, le lien d’invitation et un QR code. Tu peux dicter le code au téléphone ou projeter le QR code sur un écran à la mosquée.",
            "Une personne qui n’a pas l’appli la télécharge depuis la page qui s’ouvre quand elle touche le lien. Ensuite, elle touche [[ol:circlesTab.anonJoin]] dans l’onglet [[tabs.circles]], colle le lien d’invitation ou le code et rejoint le cercle. Plus de détails : [Rejoindre un cercle avec une invitation](/fr/guides/rejoindre-un-cercle/).",
          ],
          sahne: "davet-penceresi",
        },
      ],
    },
    {
      tur: "bolum", id: "hatim", rol: "La personne qui crée le cercle", baslik: "Lance la khatma",
      giris: "La khatma est une tâche à l’intérieur du cercle. Un même cercle peut avoir en même temps une khatma, un dhikr ou la lecture d’un livre.",
      adimlar: [
        {
          baslik: "Crée une tâche et choisis le Coran",
          metin: "Quand tes proches ont rejoint, touche [[group.welcome.step2Btn]] sur la carte [[tx:group.welcome.title]]. Le bouton rond **+** en bas à droite ouvre le même écran. Sur l’écran qui s’ouvre, choisis la carte [[tx:wizard.goalQuran]].",
          sahne: "gorev-olustur",
        },
        {
          baslik: "Garde les réglages proposés et touche trois fois Continuer",
          metin: "Les réglages sont prêts pour la khatma la plus courante. Si tu n’as rien à changer, touche trois fois [[wizard.continue]] :",
          liste: [
            "[[tx:wizard.targetJuz]] et [[tx:wizard.fullHatim]] : les 30 juz sont répartis dans le cercle.",
            "[[tx:wizard.week]] : un nouveau tour commence chaque semaine. Si tu veux, choisis [[tx:wizard.day]] : on lira alors chaque jour.",
            "1 juz par personne : dans un cercle de 5 personnes, on lit 5 juz chaque semaine et la khatma se termine en 6 semaines environ. Avec 30 personnes, elle se termine en une semaine.",
          ],
          fark: "Le résumé en bas de l’écran calcule la durée approximative de la khatma au fur et à mesure que tu changes les réglages.",
          ipucu: "Si tu veux gérer le cercle sans prendre de juz toi-même, active [[tx:wizard.observerModeTitle]] sur l’écran où tu choisis la fréquence des tours. En haut de cet écran, il est écrit **Étape 3 / 5**.",
          sahne: "uc-devam",
        },
        {
          baslik: "Donne un nom à la tâche et lance-la",
          metin: "Écris un nom dans le champ [[tx:wizard.circleTitle]], par exemple « Khatma familiale ». L’aperçu juste en dessous montre qui commence par quel juz. Touche [[wizard.startCircle]]. Le juz de chacun arrive aussitôt sur son propre écran.",
          fark: "Tu n’as pas à calculer qui lit quel juz : l’appli les répartit selon l’ordre du cercle.",
          ipucu: "[[tx:wizard.autoAdvanceTitle]] est activé par défaut : à la fin du tour, le tour suivant commence tout seul. Les tours changent à minuit dans ton fuseau horaire. Une ligne comme « Les tours suivent l’heure de Paris. » te l’indique à l’écran.",
          sahne: "gorevi-baslat",
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
      tur: "bolum", id: "oku", rol: "Tout le cercle", baslik: "Lis ton juz",
      giris: "Chaque membre du cercle lit sa part chez lui, au moment qui lui convient.",
      adimlar: [
        {
          baslik: "Touche la notification ou la carte de l’Accueil",
          metin: "Quand un nouveau tour commence, tu reçois une notification. En la touchant, tu ouvres ta tâche. Si tu as ouvert l’appli toi-même, touche la carte de la khatma dans la section [[tx:dashboard.myTasks]] de l’onglet [[tx:tabs.home]] : tu y vois le nom du cercle, le juz qui t’est attribué et les jours restants.",
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
        { baslik: "Demander de l’aide", metin: "Touche [[ol:flow.askHelp]] sous la carte de la tâche. Indique combien de pages tu liras toi-même et touche [[flow.askHelp]] dans la fenêtre. Les pages restantes apparaissent pour le cercle dans la liste [[tx:flow.waitingForHelpTitle]].", sahne: "yardim-iste" },
        { baslik: "Aider", metin: "Dans l’onglet [[tx:flow.tabCircle]] de l’écran de la tâche, tu vois les personnes qui attendent de l’aide. Touche [[flow.helpTitle]] et choisis dans la fenêtre la part que tu prends. Les pages prises arrivent sur ton écran.", sahne: "yardim-et" },
      ],
      not: "Si tu dois laisser toute ta part, tu peux la remettre au pool avec le bouton [[ol:flow.excuse]] : celui qui le souhaite peut alors l’y prendre. Ce choix est définitif.",
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Voici à quoi ça ressemble dans l’appli",
      giris: "Ces captures viennent de l’appli elle-même.",
      kareler: [
        { img: "n01-halka", alt: "Écran du cercle : les tâches dans l’onglet Lectures et le bouton rond + en bas à droite", cap: "Écran du cercle : les tâches et le bouton **+** en bas à droite" },
        { img: "n02c-wizard-adim3", alt: "Création de l’objectif : À quelle fréquence les tours seront-ils assignés ? Semaine sélectionnée", cap: "La fréquence des tours, pendant la création de l’objectif" },
        { img: "h01-home", alt: "Accueil : les tâches des cercles dans la section Tes tâches", cap: "Accueil : tes tâches" },
        { img: "n04-yonet", alt: "Écran de la khatma, onglet Cercle : une demande d’aide et le juz de chaque membre", cap: "Dans la khatma, qui en est à quel juz" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Comment les juz sont-ils répartis entre les participants ?",
        c: "L’appli les répartit selon l’ordre du cercle : le juz 1 à la première personne, le juz 2 à la deuxième, et ainsi de suite. Tu vois cette liste sur le dernier écran, avant de lancer la khatma. Au tour suivant, les juz suivants sont répartis dans le même ordre : dans un cercle de 5 personnes, le deuxième tour continue avec les juz 6–10." },
      { s: "Que se passe-t-il à la fin d’un tour ?",
        c: "Si **Avancement automatique des tours** est activé (c’est le cas par défaut), le nouveau tour commence tout seul à minuit, dans le fuseau horaire du cercle, et les juz suivants sont répartis. Si tu le désactives, c’est toi qui lances le nouveau tour." },
      { s: "Et si quelqu’un ne peut pas terminer son juz ?",
        c: "La part non lue ne se perd pas : au tour suivant, elle reste **confiée** à la même personne. Elle peut aussi laisser une partie au cercle avec **Demander de l’aide**, ou remettre toute sa part au pool avec **Excuse**. Les autres la prennent avec **Aide** ou **Prendre**." },
      { s: "Nous avons déjà un groupe WhatsApp : à quoi sert l’appli ?",
        c: "Garde ton groupe. Partage le lien d’invitation dans le groupe : la liste, qui a lu et les rappels, c’est l’appli qui s’en occupe. Tu n’as pas à refaire une liste chaque semaine." },
      { s: "Un parent âgé sans l’appli peut-il participer ?",
        c: "Dans un cercle régulier, l’administrateur peut ajouter une personne sans l’appli comme **invité** ; un membre responsable marque sa lecture. Pour une khatma ponctuelle avec **Pool commun**, ceux qui n’ont pas l’appli prennent un juz depuis le lien d’invitation, dans le navigateur : [Cercle ponctuel](/fr/guides/cercle-ponctuel/)." },
      { s: "Est-ce payant ?",
        c: "Créer un cercle, lancer une khatma et rejoindre un cercle sont gratuits. Avec un compte gratuit, tu peux gérer un seul cercle créé par toi à la fois. Rejoindre les cercles des autres n’a pas de limite." },
      { s: "Peut-on faire une khatma en répartissant les juz ?",
        c: "Les avis peuvent varier selon les écoles et les savants. Pour un avis religieux, demande à un savant en qui tu as confiance. L’appli, elle, se contente de répartir les juz : chacun lit sa part." },
    ],
  },

  ilgili: ["tek", "zikir", "katil"],
  kart: { kicker: "Khatma", baslik: "Khatma en groupe", metin: "Crée ton cercle, répartis les 30 juz et laisse les tours avancer tout seuls." },
  onizleme: { sahne: "gorevi-baslat", adim: 3 },
  cta: { baslik: "Crée ton cercle aujourd’hui", metin: "Créer un cercle et le rejoindre est gratuit. Télécharge l’appli, crée ton cercle, partage le lien d’invitation." },
};
