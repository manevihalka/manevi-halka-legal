// 41 Yasin en groupe (FR), 21 nov. 2026 ; traduction de yasin.tr.mjs. Appli : modèle « 41 Yasin » du cercle ponctuel (2.1.0).
// La tradition est décrite de façon neutre et brève : pas de promesse de récompense, pas d'avis juridique, pas de jour particulier.
export default {
  title: "41 Yasin en groupe : comment créer un cercle de lecture",
  desc: "Organise 41 Yasin en groupe pour une guérison, un proche disparu ou une occasion : chacun lit sa part dans l’appli et le compteur atteint 41 ensemble.",
  h1: "Lire 41 Yasin en groupe : le cercle pas à pas",
  crumb: "41 Yasin en groupe",
  eyebrow: "Guide pas à pas",
  lead: "41 Yasin désigne la lecture de la sourate Yasin 41 fois au total par un groupe. Beaucoup de familles la lisent pour la guérison d’un malade, pour un proche disparu ou pour un vœu ; les lectures sont réparties entre les participants. L’appli propose un modèle prêt pour cela : tu choisis pour qui et jusqu’à quand, puis tu envoies le lien. Chacun lit Yasin là où il est ; l’appli ne fait qu’additionner.",
  meta: ["Prêt en 1 minute environ", "Yasin s’ouvre dans l’appli", "Gratuit"],
  film: { sahne: "film-yasin", cap: "Le modèle [[tx:eventCompose.tplYasin41]], pour qui, [[eventCompose.cta]], l’invitation et l’écran du cercle." },

  kisa: {
    maddeler: [
      "Dans l’onglet [[tabs.circles]], touche **+**, puis la carte [[tx:event.createMenuTitle]].",
      "Sur l’écran [[tx:eventCompose.pickTitle]], choisis le modèle [[tx:eventCompose.tplYasin41]].",
      "Choisis les lignes [[tx:eventCompose.rowFor]] et [[tx:eventCompose.rowEnd]], puis touche [[eventCompose.cta]].",
      "Envoie le lien à ta famille ou à ton groupe WhatsApp avec [[eventCompose.invite]].",
      "Chacun touche [[eventCompose.readBtn]] sur l’écran du cercle, lit Yasin et touche [[hatim.markRead]] à la dernière page.",
      "Quand le compteur atteint 41, le cercle se termine et chacun reçoit une notification.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Celui ou celle qui crée le cercle", baslik: "Créer le cercle de 41 Yasin",
      giris: "C’est un cercle ponctuel : il a un objectif (41 lectures) et une fin. Il se termine de lui-même quand l’objectif est atteint.",
      adimlar: [
        {
          baslik: "Choisir le modèle 41 Yasin",
          metin: [
            "Dans l’onglet [[tabs.circles]], touche **+** en haut à droite, puis la carte [[tx:event.createMenuTitle]] dans le panneau qui s’ouvre.",
            "Sur l’écran [[tx:eventCompose.pickTitle]], touche la tuile [[tx:eventCompose.tplYasin41]]. Le récapitulatif est prêt : on lit la [[tx:event.presetYasin]], l’objectif est 41 et le décompte [[tx:event.modeCollective]]. Les lectures de tous vont dans un seul compteur.",
          ],
          ipucu: "S’il n’y a pas de **+** en haut à droite, touche [[ol:circlesTab.anonCreateEvent]] au milieu ; une fois ton nom saisi, le même écran s’ouvre.",
          sahne: "yasin-sablon",
        },
        {
          baslik: "Pour qui et jusqu’à quand",
          metin: [
            "Touche la ligne [[tx:eventCompose.rowFor]]. La puce [[tx:eventCompose.intentSifa]] écrit « [[tx:eventCompose.intentSifaFill]] » dans le champ ; à côté se trouvent [[tx:eventCompose.intentRuh]] et [[tx:eventCompose.intentVesile]]. Tu peux modifier le texte ou le laisser vide.",
            "La ligne [[tx:eventCompose.rowEnd]] indique [[tx:eventCompose.endDays3]]. Tu peux aussi choisir [[tx:eventCompose.endTonight]], [[tx:eventCompose.endFriday]], [[tx:eventCompose.endWeek]], la prochaine nuit bénie ou [[tx:eventCompose.endCustom]].",
          ],
          fark: "La phrase en bas de la carte calcule la part de chacun : si 10 personnes participent, chacune lit environ 5 fois.",
          sahne: "yasin-kur",
        },
        {
          baslik: "Ouvrir le cercle et inviter",
          metin: [
            "Le nom du cercle est [[tx:eventCompose.tplYasin41]] ; change-le si tu veux. Touche [[eventCompose.cta]] en bas.",
            "Sur l’écran [[tx:eventCompose.readyTitle]], le cercle a déjà commencé. Touche [[eventCompose.invite]] : le message indique pour qui, le nom du cercle, sa fin et le lien avec « [[tx:eventInvite.join.surah]] ».",
          ],
          ipucu: "Pour changer l’objectif, touche la ligne [[tx:compose.rowWhat]] dans le récapitulatif. Tu peux saisir un autre nombre que 41, ou choisir [[tx:event.modeIndividual]] au lieu de [[tx:event.modeCollective]] ; chacun lit alors tout l’objectif lui-même.",
          sahne: "yasin-davet",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", rol: "Toutes les personnes qui rejoignent", baslik: "Lire ta part",
      giris: "Chacun lit là où il est ; l’appli ne fait qu’additionner. L’écran du cercle montre le total et tes propres lectures.",
      adimlar: [
        {
          baslik: "Toucher Lire, puis cocher à la dernière page",
          metin: [
            "Après le lien et [[joinGroup.join]], l’écran du cercle s’ouvre. La carte du haut montre pour qui on lit, combien de lectures sont faites et 41 perles ; en bas, le temps restant et la part restante de chacun.",
            "Touche [[eventCompose.readBtn]] sur ta carte. Yasin s’ouvre dans le lecteur de l’appli sur ses propres pages ; sous le bouton, tu vois les pages et le temps de lecture approximatif. À la dernière page apparaît [[hatim.markRead]]. Touche-le et confirme : tu reviens dans le cercle et le compteur augmente d’un.",
          ],
          fark: "Pas besoin de chercher un mushaf : les pages de Yasin s’ouvrent dans l’appli.",
          ipucu: "Si le lien s’ouvre dans le navigateur au lieu de l’appli : [Rejoindre un cercle](/fr/guides/rejoindre-un-cercle/).",
          sahne: "yasin-oku",
        },
        {
          baslik: "Si tu as lu dans un livre",
          metin: [
            "Si tu as lu Yasin dans ton propre mushaf ou de mémoire, touche [[tx:readTogether.markFromBook]] sous le bouton [[eventCompose.readBtn]] et confirme. Ta lecture compte pour une.",
            "Si tu lis plusieurs fois, refais-le après chaque lecture. Le nombre de tes lectures s’affiche sous ta carte.",
          ],
          ipucu: "L’appli demande confirmation, car une lecture confirmée ne peut plus être retirée du compteur.",
        },
        {
          baslik: "Sans l’appli : compter dans le navigateur",
          metin: [
            "Sur le téléphone de quelqu’un qui n’a pas l’appli, le lien s’ouvre dans le navigateur. La page montre la ligne [[tx:event.presetYasin]], le total et un bouton [[=Participer au décompte]].",
            "Lis Yasin dans ton propre mushaf. Touche ensuite [[=Participer au décompte]], touche le grand cercle une fois par Yasin lue, puis [[=Ajouter mon décompte]]. Ton nombre s’ajoute au total du cercle.",
          ],
          fark: "Aucun compte nécessaire ; le lien suffit.",
          ipucu: "Cela fonctionne seulement avec un décompte [[tx:event.modeCollective]]. Dans un cercle en [[tx:event.modeIndividual]], le navigateur affiche [[=Pour les membres du cercle]].",
          sahne: "yasin-web",
        },
      ],
    },
    {
      tur: "ikili", id: "tamam", rol: "Tout le monde", baslik: "Quand on atteint 41",
      giris: "Dès que le compteur atteint 41, le cercle se termine de lui-même ; peu importe qui a ajouté la dernière lecture.",
      kartlar: [
        {
          baslik: "Le cercle se termine",
          metin: [
            "Toutes les perles de la carte du haut se remplissent. Si l’écran est ouvert, un court message l’annonce ; ceux qui ont fermé l’appli reçoivent une notification.",
            "Le bouton [[=Voir le résultat]] montre le total du cercle et ta propre contribution. Le cercle est supprimé 24 heures après la fin ; le résultat reste dans [[tx:tabs.profile]] › [[=Mon parcours]].",
          ],
          sahne: "yasin-tamam",
        },
        {
          baslik: "Si le temps manque, ou pour relire",
          metin: [
            "Si la fin approche et que 41 n’est pas atteint, la personne qui a créé le cercle choisit [[tx:event.extend24h]] dans le menu **···** ; la fin est repoussée de 24 heures et chacun continue de lire.",
            "Pour relire avec la même intention, elle touche [[=Recréer ce cercle]] dans le résultat. La création s’ouvre avec le même objectif, le même nom et la même dédicace ; seule la fin est à choisir.",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ornek", baslik: "Exemple : 41 Yasin avec l’intention de guérison",
      giris: "Les captures ci-dessous viennent de l’appli. Le cercle est créé « Avec l’intention de la guérison de nos malades » et dure jusqu’à la prochaine nuit bénie.",
      kareler: [
        { img: "ev-ozet", alt: "Récapitulatif : carte Ce cercle avec 41 ensemble, Pour qui avec l’intention de guérison, Jusqu’à quand jusqu’à Laylat al-Ragha’ib", cap: "Tout sur un écran, avec la part de chacun" },
        { img: "ev-bitis", alt: "Fenêtre Jusqu’à quand : Cette nuit, D’ici vendredi, 3 jours, 1 semaine, Jusqu’à Laylat al-Ragha’ib et Autre moment", cap: "Les puces de fin : de cette nuit à la prochaine nuit bénie" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Qu’est-ce que 41 Yasin ?",
        c: "41 Yasin désigne la lecture de la sourate Yasin 41 fois au total par un groupe. Les lectures sont réparties entre les participants ; quelques personnes lisent plusieurs fois jusqu’à atteindre 41. On la lit souvent pour la guérison d’un malade, pour un proche disparu ou pour un vœu." },
      { s: "Comment lire 41 Yasin en groupe ?",
        c: "Dans l’appli, touche **+** dans l’onglet [[tabs.circles]], puis la carte [[tx:event.createMenuTitle]] et le modèle [[tx:eventCompose.tplYasin41]]. Choisis les lignes [[tx:eventCompose.rowFor]] et [[tx:eventCompose.rowEnd]], touche [[eventCompose.cta]] et envoie le lien. Chacun lit Yasin avec le bouton [[eventCompose.readBtn]] sur l’écran du cercle ; quand le compteur atteint 41, le cercle se termine." },
      { s: "Faut-il trouver 41 personnes ?",
        c: "Pas dans l’appli. Le compteur compte des lectures, pas des personnes : si 10 personnes participent, chacune lit environ 4 ou 5 fois. La phrase en bas de la carte du cercle indique la part restante de chacun." },
      { s: "Comment ajouter une lecture faite dans mon propre mushaf ?",
        c: "Sur l’écran du cercle, touche [[tx:readTogether.markFromBook]] et confirme ; ta lecture s’ajoute au compteur. Si tu lis dans le lecteur de l’appli, le bouton [[hatim.markRead]] de la dernière page fait la même chose." },
      { s: "Les personnes sans l’appli peuvent-elles participer ?",
        c: "Oui. La personne qui ouvre le lien dans un navigateur compte ses lectures avec [[=Participer au décompte]] et touche [[=Ajouter mon décompte]] ; aucun compte n’est nécessaire. Cela fonctionne quand le décompte est [[tx:event.modeCollective]]." },
      { s: "Est-ce payant ?",
        c: "Créer un cercle de 41 Yasin et y participer est gratuit. Avec un compte gratuit, tu gères un cercle ponctuel à la fois ; quand il est terminé ou supprimé, tu crées le suivant." },
    ],
  },

  ilgili: ["tek", "zikir", "katil"],
  kart: { kicker: "Lire ensemble", baslik: "41 Yasin en groupe", metin: "Un cercle de 41 Yasin pour une guérison, un proche ou une occasion ; chacun lit dans l’appli jusqu’à 41." },
  onizleme: { sahne: "yasin-kart", adim: 14 },
};
