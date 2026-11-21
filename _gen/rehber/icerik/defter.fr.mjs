// Mon carnet d'invocations (FR). Format : en-tête de _gen/build-rehber.mjs. Parcours d'après le code : app/dua-defteri*.tsx,
// app/prophetic-duas.tsx, components/duas/*, lib/duaDefter*.ts. Boutons via [[clé]] ; pas de tiret cadratin, pas de Jawshan, pas de promesse de récompense.
export default {
  title: "Carnet d'invocations : écris, range et retrouve tes duas",
  desc: "Ton carnet d'invocations dans l'appli : écris tes duas par sections, ajoute versets, invocations et Noms divins, mets des rappels, partage-le en PDF.",
  h1: "Tenir un carnet d'invocations : Mon carnet d'invocations pas à pas",
  crumb: "Mon carnet d'invocations",
  eyebrow: "Guide pas à pas",
  lead: "Mon carnet d'invocations est un carnet où tu écris tes propres invocations (duas) et tes invocations pour ceux que tu aimes. Tu les ranges par sections, tu ajoutes un verset, une invocation toute prête ou l'un des Noms d'Allah, tu mets un rappel pour ton moment de lecture et tu partages ton carnet en PDF.",
  meta: ["Aucune configuration", "Ton carnet reste sur ton téléphone", "Gratuit"],
  film: { sahne: "film-defter", cap: "Ouvre ton carnet depuis Invocations, écris une invocation dans Mes proches, puis lis-la." },

  kisa: {
    maddeler: [
      "Dans l'onglet [[tabs.read]], touche la carte [[tx:read.duasTitle]], puis la ligne [[tx:duaDefter.title]].",
      "Ajoute une invocation avec le **+** en haut à droite : choisis la section, écris pour qui si tu veux, écris ton invocation et touche [[duaDefter.save]].",
      "Dans les Invocations, dans le lecteur du Coran ou dans la liste des Noms d'Allah, utilise [[tx:duaDefter.addFromDua]] pour mettre un texte tout prêt dans ton carnet.",
      "Avec [[ol:duaDefter.read]] à côté d'une section, lis tes invocations l'une après l'autre en grands caractères ; à la fin, touche [[duaDefter.markPrayed]].",
      "Depuis les trois points d'une section, mets un [[tx:duaDefter.remind]] ; il te rappelle de lire les jours et à l'heure choisis.",
      "Touche l'icône d'impression et envoie ton carnet ou une section avec [[tx:duaDefter.pdfShare]].",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Ouvre ton carnet",
      giris: "Mon carnet d'invocations s'ouvre depuis l'écran [[tx:read.duasTitle]] ; ce n'est pas un onglet à part.",
      adimlar: [
        {
          baslik: "Ouvre Mon carnet d'invocations depuis l'écran Invocations",
          metin: [
            "Touche l'onglet [[tabs.read]] dans la barre du bas et ouvre la carte [[tx:read.duasTitle]]. Sous le champ de recherche et l'anneau [[tx:propheticDuas.halTitle]] se trouve la ligne [[tx:duaDefter.title]]. Touche-la.",
            "Ton carnet arrive avec des sections toutes prêtes : [[tx:duaDefter.section.namaz]], [[tx:duaDefter.section.sabah]], [[tx:duaDefter.section.seher]], [[tx:duaDefter.section.yolculuk]], [[tx:duaDefter.section.cuma]], [[tx:duaDefter.section.kadir]] et [[tx:duaDefter.section.sevdiklerim]]. À la première ouverture, elles sont toutes vides.",
          ],
          ipucu: "Le carnet te retrouve aussi aux heures de prière : quand tu notes une prière dans [[tx:prayerDetail.title]] ou que tu termines le tasbihat de la prière, une ligne ouvre la section [[tx:duaDefter.section.namaz]]. Noter le tahajjud ouvre [[tx:duaDefter.section.seher]]. Si la section est vide, la ligne n'apparaît pas.",
          sahne: "defter-ac",
        },
      ],
    },
    {
      tur: "bolum", id: "yaz", baslik: "Écris tes invocations",
      giris: "Tu peux écrire une invocation avec tes propres mots ou mettre dans ton carnet un texte tout prêt de l'appli.",
      adimlar: [
        {
          baslik: "Ajoute une invocation",
          metin: "Touche le **+** en haut à droite ou le **+** à côté d'une section. Remplis la fenêtre qui s'ouvre et touche [[duaDefter.save]] :",
          liste: [
            "[[tx:duaDefter.sectionLabel]] : la section où va l'invocation.",
            "[[tx:duaDefter.forLabel]] : « Ma mère », « mon frère Ali », etc. Tu peux laisser vide.",
            "[[tx:duaDefter.textLabel]] : écris ton invocation avec tes mots, ou reprends un texte copié avec [[tx:duaDefter.paste]].",
            "[[tx:duaDefter.moreFields]] : si tu veux, ajoute l'arabe de l'invocation, sa translittération et son sens.",
          ],
          ipucu: "Touche une invocation pour la modifier : changer de section, la monter ou la descendre, la partager. Garde le doigt appuyé pour la supprimer ; l'appli demande d'abord, et juste après tu peux la récupérer avec [[tx:notice.undo]].",
          sahne: "defter-yaz",
        },
        {
          baslik: "Ajoute des versets, des invocations et des Noms d'Allah",
          metin: [
            "Pas besoin de recopier un texte tout prêt. Quand tu ouvres une invocation dans l'écran [[tx:read.duasTitle]], touche [[tx:duaDefter.addFromDua]] parmi les boutons en dessous. La même option se trouve dans la fenêtre qui s'ouvre quand tu touches un verset dans le lecteur du Coran, et dans la liste des Noms d'Allah (Asma al-Husna).",
            "L'appli demande [[tx:duaDefter.pickSection]] ; choisis la section. Le texte entre dans ton carnet avec sa source.",
          ],
          ipucu: "Le même texte n'entre pas deux fois dans la même section ; s'il y est déjà, la ligne de cette section indique [[tx:duaDefter.inDefter]].",
          sahne: "defter-ekle",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", baslik: "Lire, se rappeler, partager",
      giris: "Le carnet sert autant à prier qu'à écrire : tu lis une section du début à la fin et tu mets un rappel pour ton moment de lecture.",
      adimlar: [
        {
          baslik: "Commence la lecture, puis touche J'ai prié aujourd'hui",
          metin: [
            "À côté d'une section qui contient des invocations se trouve le bouton [[ol:duaDefter.read]]. Touche-le : les invocations de la section s'ouvrent l'une sous l'autre, en grands caractères. Les versets et les invocations toutes prêtes montrent aussi l'arabe, le sens et la source.",
            "Les boutons **A** en bas réduisent ou agrandissent le texte ; [[tx:duaDefter.autoScroll]] fait défiler la page à ton rythme. À la fin, touche [[duaDefter.markPrayed]].",
          ],
          fark: "Chaque jour où tu pries, une perle s'ajoute au chapelet en haut de ton carnet. Le carnet retient aussi où tu en étais : quand tu rouvres une section, elle reprend à la dernière invocation lue.",
          ipucu: "À la fin de [[tx:duaDefter.section.sevdiklerim]], les noms des personnes qui t'ont confié leurs invocations s'affichent aussi ; quand tu touches [[duaDefter.markPrayed]], ils sont notés eux aussi.",
          sahne: "defter-oku",
        },
        {
          baslik: "Modifie une section, mets un rappel",
          metin: [
            "Touche les trois points à côté d'une section. Dans la fenêtre qui s'ouvre, tu peux la renommer, la monter ou la descendre, la supprimer ou mettre un [[tx:duaDefter.remind]].",
            "Active le rappel, choisis [[tx:duaDefter.remindEveryDay]] ou certains jours, règle l'heure et touche [[duaDefter.save]]. La section indique alors [[tx:duaDefter.remindOn]]. La notification dit seulement : « Les invocations que tu as prévues pour aujourd'hui t'attendent. »",
          ],
          ipucu: "Si tu supprimes une section, ses invocations passent dans [[tx:duaDefter.section.other]]. Pour ouvrir ta propre section, touche [[ol:duaDefter.newSection]] en bas de la liste.",
          sahne: "defter-hatirlat",
        },
        {
          baslik: "Partage en PDF ou imprime",
          metin: "Touche l'icône d'impression en haut à droite. Dans la fenêtre [[tx:duaDefter.pdfTitle]], choisis [[tx:duaDefter.pdfAll]] ou une seule section, puis touche [[duaDefter.pdfShare]] ou [[ol:duaDefter.pdfPrint]]. La page est préparée en grands caractères, sur ton téléphone.",
          ipucu: "Si des invocations ont un nom « pour qui », l'interrupteur [[tx:duaDefter.pdfNames]] apparaît. Il est désactivé au départ ; les noms n'entrent dans le PDF que si tu l'actives.",
          sahne: "defter-pdf",
        },
      ],
    },
    {
      tur: "ikili", id: "gecmis", baslik: "Invocations exaucées, invocations confiées",
      giris: "Le carnet a encore deux coins : le souvenir des invocations exaucées et la liste des personnes qui t'ont demandé de prier pour elles.",
      kartlar: [
        { baslik: "Invocations passées", metin: "Touche une invocation et choisis [[tx:duaDefter.archive]]. Si tu veux, écris une courte note, par exemple « Alhamdoulillah, ma mère s'est rétablie. » L'invocation quitte sa section et reste sous [[tx:duaDefter.past]] avec sa date ; tu peux la récupérer quand tu veux." },
        { baslik: "Invocations confiées", metin: "Quand quelqu'un te demande de prier pour lui, écris son nom dans la liste [[tx:emanet.title]]. Elle s'ouvre en bas du carnet ; elle te revient à la fin de ton wird et au moment de l'invocation de ton tasbihat." },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Voici à quoi ça ressemble dans l'appli",
      giris: "Cette capture vient de l'appli elle-même.",
      kareler: [
        { img: "z-defter", alt: "Mon carnet d'invocations : chapelet, Tu as prié aujourd'hui, sections Après la prière et Matin avec Commencer la lecture", cap: "[[tx:duaDefter.title]] : le chapelet et les sections" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Où mon carnet d'invocations est-il gardé ?",
        c: "Ton carnet reste sur ce téléphone, et toi seul le vois. Pour partager une invocation, touche-la et choisis [[tx:duaDefter.share]] ; tu peux envoyer tout le carnet en PDF." },
      { s: "Si je change de téléphone, mon carnet me suit-il ?",
        c: "Le carnet est gardé uniquement sur ce téléphone et n'est pas synchronisé avec ton compte. Avant de changer de téléphone, envoie-le-toi avec [[tx:duaDefter.pdfShare]] et garde-le." },
      { s: "Combien d'invocations puis-je écrire ?",
        c: "Tu peux écrire jusqu'à 300 invocations et ouvrir jusqu'à 30 sections." },
      { s: "Comment ajouter une invocation en arabe ?",
        c: "En ajoutant une invocation, touche [[tx:duaDefter.moreFields]] ; tu écris l'arabe, la translittération et le sens dans des champs séparés. Pour les versets et les invocations toutes prêtes de l'appli, rien à recopier : ajoute-les avec [[tx:duaDefter.addFromDua]]." },
      { s: "Puis-je relier Mon carnet d'invocations au Jardin des intentions ?",
        c: "Oui. Si tu plantes une intention d'invocation dans le Jardin des intentions, les jours où tu pries avec ton carnet et ceux où tu notes avoir prié pour les invocations qu'on t'a confiées sont comptés. Détails : [Jardin des intentions](/fr/guides/jardin-des-intentions/)." },
      { s: "Est-ce payant ?",
        c: "Toutes les fonctions de Mon carnet d'invocations sont gratuites." },
    ],
  },

  ilgili: ["bahce", "teheccud", "zikir"],
  kart: { kicker: "Invocation", baslik: "Mon carnet d'invocations", metin: "Écris tes invocations par sections, ajoute versets et Noms d'Allah, mets des rappels, partage en PDF." },
  onizleme: { sahne: "defter-kart", adim: 8 },
  cta: { baslik: "Commence ton carnet d'invocations", metin: "Télécharge Manevi Halka gratuitement et ouvre Mon carnet d'invocations depuis Invocations, dans l'écran Lire." },
};
