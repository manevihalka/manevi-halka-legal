// Cercle hebdomadaire du Coran ouvert à tous (FR). Dans l'appli, il s'appelle bigCircle.title (« Grand Cercle ») ; les titres
// n'utilisent PAS ce nom, le texte peut le citer comme le nom affiché à l'écran. Parcours : app/buyuk-halka.tsx, components/bigCircle/*.
// Les noms de boutons viennent de l'appli via [[clé]] ; pas de tiret long, pas de Jawshan, pas de prix. Tutoiement.
export default {
  title: "Khatma en ligne : rejoins le cercle hebdomadaire du Coran",
  desc: "Rejoins un cercle du Coran hebdomadaire ouvert à tous : lis une page par semaine et contribue à une khatma commune. Seuls les totaux sont visibles.",
  h1: "Comment rejoindre le cercle hebdomadaire du Coran ouvert à tous ?",
  crumb: "Cercle hebdomadaire du Coran",
  eyebrow: "Guide pas à pas",
  lead: "Même sans cercle à toi, tu peux participer à une khatma. Dans le cercle ouvert de Manevi Halka, une page te revient chaque semaine : tu la lis et tu la marques. Tes pages s'ajoutent à celles de tous les autres, et des khatmas s'achèvent. Dans l'appli, ce cercle s'appelle Grand Cercle.",
  meta: ["Environ 3 minutes par semaine", "Aucun nom demandé", "Gratuit"],
  film: { sahne: "film-buyuk", cap: "De l'inscription à ta première page : la carte d'invitation, une courte présentation, lire et marquer." },

  kisa: {
    maddeler: [
      "Dans l'onglet [[tabs.circles]], touche [[bigCircle.join]] sur la carte [[tx:bigCircle.title]].",
      "Parcours la courte présentation en trois pages et touche [[bigCircle.storyJoin]]. On ne te demande pas ton nom.",
      "Chaque semaine, 1 page te revient ; la carte [[tx:bigCircle.taskKicker]] indique laquelle.",
      "[[bigCircle.read]] ouvre ta page dans le Coran. Une fois lue, touche [[hatim.markRead]].",
      "Une nouvelle semaine commence chaque vendredi. Une part que tu n'as pas pu lire retourne d'elle-même au cercle ; rien ne reste en suspens.",
      "Depuis le menu ⋮, tu peux passer à 2, 5 ou 10 pages, couper le rappel ou quitter le cercle.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "katil", baslik: "Rejoindre le cercle",
      giris: "C'est un cercle du Coran ouvert à tous : des personnes de villes et de langues différentes lisent ensemble la même khatma. Pour le rejoindre, pas besoin de lien d'invitation ni de code.",
      adimlar: [
        {
          baslik: "Trouver la carte d'invitation dans l'onglet Cercles",
          metin: [
            "Touche l'onglet [[tabs.circles]] dans la barre du bas. Si tu n'as pas encore de cercle, une grande carte marquée [[tx:bigCircle.forEveryone]] se trouve tout en haut ; elle indique aussi combien de pages le cercle a lues cette semaine. Touche [[bigCircle.join]].",
            "Si tu as déjà un cercle, le même accès apparaît sous forme de bandeau fin au-dessus de tes cercles.",
          ],
          ipucu: "Si tu as retiré la carte des cercles, tu la retrouves sous forme de ligne dans la section [[tx:read.globalTab]] de l'onglet [[tabs.read]] ; tu la remets en place avec [[tx:bigCircleCard.restore]].",
          sahne: "buyuk-bul",
        },
        {
          baslik: "Parcourir la courte présentation et rejoindre",
          metin: [
            "La première fois, une courte présentation en trois pages s'ouvre : le cercle est ouvert à tous, ta part est petite, le total est grand. Avance avec [[bigCircle.storyNext]], puis touche [[bigCircle.storyJoin]] sur la dernière page.",
            "On ne te demande pas ton nom pour rejoindre. Dès que tu rejoins, ta part de la semaine est prête.",
          ],
          ipucu: "Pour revoir la présentation, touche l'icône ronde en haut à droite de l'écran du cercle.",
          sahne: "buyuk-katil",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", baslik: "Lire ta part de la semaine",
      giris: "Chaque vendredi commence une nouvelle semaine et une page te revient. Ta part se lit en quelques minutes ; c'est toi qui choisis le moment.",
      adimlar: [
        {
          baslik: "Voir ta tâche de la semaine",
          metin: [
            "Ta part s'affiche sous forme de carte dans la section [[tx:dashboard.myTasks]] de l'onglet [[tabs.home]] : quelle page et combien de jours il reste avant vendredi. Touche la carte pour ouvrir l'écran du cercle.",
            "La carte [[tx:bigCircle.taskKicker]] en haut dit en une phrase ce qu'il faut faire, par exemple « Lis 1 page » ; en dessous figurent le numéro de page, la sourate et la durée approximative.",
          ],
          sahne: "buyuk-gorev",
        },
        {
          baslik: "Lire et marquer",
          metin: [
            "Touche [[bigCircle.read]] ; le Coran s'ouvre sur ta page. À la fin de la page, le bouton [[hatim.markRead]] apparaît en bas. Touche-le, puis touche encore [[hatim.markRead]] dans la question qui suit.",
            "De retour sur l'écran du cercle, la carte de tâche devient la carte [[tx:bigCircle.doneTitle]] : ta contribution est ajoutée à la khatma.",
          ],
          ipucu: "Si tu as lu dans un mushaf imprimé, touche simplement [[ol:bigCircle.markRead]] sur la carte de tâche, sans ouvrir le Coran.",
          sahne: "buyuk-oku",
        },
        {
          baslik: "Suivre l'avancée de la khatma",
          metin: "Plus bas sur l'écran se trouve l'anneau de la khatma : de quelle khatma il s'agit, quel pourcentage est lu et combien de pages le cercle a lues cette semaine. C'est la même khatma que la Lecture commune de l'appli. La carte [[tx:bigCircle.doneTitle]] indique aussi combien de ses pages sont les tiennes.",
          fark: "Pas de liste de membres, pas de classement, pas de badges ; seuls les totaux du cercle sont visibles. Ce qui compte, c'est la khatma achevée ensemble, pas qui a lu quoi.",
          ipucu: "Le [[tx:bigCircle.dhikrTitle]] est facultatif : tu ajoutes du dhikr au compteur commun du cercle, il change chaque vendredi. Si tu n'en veux pas, masque-le depuis le menu ⋮.",
          sahne: "buyuk-ilerleme",
        },
      ],
    },
    {
      tur: "bolum", id: "ayarlar", baslik: "Régler ta part et le rappel",
      giris: "Le menu ⋮ de l'écran du cercle te permet de régler ta part, le rappel et le dhikr de la semaine ; tu peux aussi y quitter le cercle.",
      adimlar: [
        {
          baslik: "Agrandir ou réduire ta part",
          metin: "Touche l'icône ⋮ en haut à droite. Sous [[tx:bigCircle.menuShare]], tu choisis 1, 2, 5 ou 10 pages ; le lien [[ol:bigCircle.changeShare]] sur la carte de tâche ouvre le même menu. Le changement vaut à partir de la semaine suivante.",
          ipucu: "Si ta part est d'une page et que tu la lis trois semaines de suite, l'appli te propose une seule fois, discrètement, de lire 2 pages la semaine suivante. Si tu ne veux pas, ferme la proposition ; elle ne revient pas.",
          sahne: "buyuk-pay",
        },
        {
          baslik: "Le rappel du jeudi soir",
          metin: [
            "Si ta part n'est pas encore lue, un seul rappel arrive le jeudi soir à 20 h. Si tu l'as lue, il n'arrive pas.",
            "À ta première inscription, l'appli demande l'autorisation d'envoyer des notifications pour cela. Tu coupes ou réactives le rappel avec l'interrupteur [[tx:bigCircle.menuReminder]] du menu ⋮.",
          ],
          sahne: "buyuk-hatirlat",
        },
        {
          baslik: "Quitter le cercle",
          metin: "Touche [[tx:bigCircle.menuLeave]] tout en bas du menu ⋮. La fenêtre te demande si tu as déjà lu des pages de ta part de la semaine : marque ce que tu as lu, le reste retourne aussitôt au cercle et quelqu'un d'autre le lit. Dès que tu touches [[bigCircle.leaveConfirm]], aucune nouvelle page ne t'est donnée.",
          ipucu: "Quand tu veux, tu reviens avec le bouton [[bigCircle.rejoin]] sur le même écran.",
          sahne: "buyuk-ayril",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Qui fait partie de ce cercle, puis-je voir les membres ?",
        c: "Ce cercle n'a pas de liste de membres ; seuls les totaux sont visibles : les pages lues cette semaine et les khatmas achevées. On ne te demande pas non plus ton nom pour rejoindre." },
      { s: "Que se passe-t-il si je ne peux pas lire une semaine ?",
        c: "À la fin de la semaine, ta part retourne d'elle-même au cercle et quelqu'un d'autre la lit ; rien ne reste en suspens. Si deux semaines de suite restent sans lecture, l'appli te demande une fois [[tx:bigCircle.continueTitle]] : tu peux continuer, faire une pause, ou, si ta part dépasse 1 page, la ramener à 1 page." },
      { s: "Quand commence la semaine ?",
        c: "Chaque vendredi à minuit, à ton heure locale. Si tu rejoins moins de deux jours avant la fin de la semaine, la part de la semaine suivante arrive tout de suite ; tu peux la lire aussitôt si tu veux." },
      { s: "De quelle khatma s'agit-il ?",
        c: "De la même khatma que la [Lecture commune](/fr/lecture-commune/) de l'appli. Tes pages s'ajoutent aux lectures de là-bas ; quand une khatma s'achève, la suivante commence." },
      { s: "Puis-je lire davantage chaque semaine ?",
        c: "Oui. Dans le menu ⋮, tu choisis 1, 2, 5 ou 10 pages par semaine ; le changement vaut à partir de la semaine suivante. Une page prend environ 2 à 3 minutes." },
      { s: "Est-ce payant ?",
        c: "Rejoindre le cercle et lire sont gratuits." },
    ],
  },

  ilgili: ["hatim", "katil", "video"],
  kart: { kicker: "Coran", baslik: "Cercle hebdomadaire du Coran", metin: "Rejoins un cercle ouvert à tous et participe à une khatma commune avec une page par semaine." },
  onizleme: { sahne: "buyuk-kart", adim: 0 },
  cta: { baslik: "Rejoins le cercle de la semaine", metin: "Télécharge Manevi Halka gratuitement, rejoins-le depuis l'onglet Cercles et lis ta première page cette semaine." },
};
