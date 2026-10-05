// P4 · Rejoindre un cercle avec une invitation (FR). Page d'aide pour les invités (join.html et halka.html y renvoient).
// Les noms des boutons viennent de l'appli via [[clé]] ; les textes des pages web (join.html, halka.html) via [[=...]].
// Pas de tiret long.
export default {
  title: "Rejoindre une khatma ou un cercle avec une invitation",
  desc: "Tu as reçu un lien ou un code ? Touche le lien, colle le code ou scanne le QR code. Sans l’appli, rejoins un cercle ponctuel depuis le navigateur.",
  h1: "Rejoindre un cercle avec un lien ou un code",
  crumb: "Rejoindre un cercle",
  eyebrow: "Guide pas à pas",
  lead: "Tu as reçu une invitation pour une khatma ou un dhikr ? Tu es au bon endroit. Si tu as l’appli, il suffit de toucher le lien. Sinon, tu télécharges l’appli et tu rejoins avec le code d’invitation. Un cercle ponctuel se rejoint aussi depuis le navigateur.",
  meta: ["1 minute environ", "Ni e-mail ni mot de passe", "Rejoindre est gratuit"],
  film: { sahne: "film-katil", cap: "Touche le lien, puis [[joinGroup.join]], écris ton prénom. Te voilà dans le cercle." },

  kisa: {
    maddeler: [
      "Si tu as l’appli, touche le lien du message. Quand la carte d’invitation s’ouvre, touche [[joinGroup.join]].",
      "Si c’est ta première fois, écris ton prénom et touche [[nameSheet.confirm]]. Ni e-mail ni mot de passe ne sont demandés.",
      "Si tu as l’appli mais que le lien s’ouvre dans le navigateur, touche le bouton [[=Ouvrir l’application]] de la page ([[=Ouvrir dans l’application]] pour un cercle ponctuel).",
      "Si tu n’as pas l’appli, télécharge-la d’abord. Ensuite, dans l’onglet [[tabs.circles]], touche [[ol:circlesTab.anonJoin]], colle le lien ou le code et touche [[joinGroup.join]].",
      "Le lien d’un cercle ponctuel s’ouvre souvent même sans l’appli : dans le navigateur, tu prends les pages à lire ou tu participes au décompte.",
      "Ta tâche apparaît dans la section [[tx:dashboard.myTasks]] de l’Accueil.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "uygulaman-varsa", rol: "La personne invitée", baslik: "Tu as l’appli sur ton téléphone",
      giris: "L’invitation arrive le plus souvent par WhatsApp ou par SMS, sous forme de lien. Sous le lien, il y a souvent aussi un code court de six caractères.",
      adimlar: [
        {
          baslik: "Touche le lien du message",
          metin: [
            "Touche le lien du message. L’appli s’ouvre toute seule et affiche la carte d’invitation. En haut de la carte, il est écrit [[tx:join.invite]] ; en dessous, le nom du cercle. Pour un cercle ponctuel, le haut de la carte indique [[tx:event.createMenuTitle]].",
            "Si tu ne veux pas rejoindre maintenant, tu peux toucher [[tx:join.skip]]. Le lien reste dans le message : tu pourras le toucher à nouveau plus tard.",
          ],
          ipucu: "Si le lien s’ouvre à l’intérieur de WhatsApp ou d’Instagram, tu vois parfois une page web au lieu de l’appli. Touche alors le bouton [[=Ouvrir l’application]] de cette page ([[=Ouvrir dans l’application]] pour un cercle ponctuel). La carte d’invitation s’ouvre dans l’appli.",
          sahne: "katil-link",
        },
        {
          baslik: "Touche Rejoindre et écris ton prénom",
          metin: [
            "Touche [[joinGroup.join]]. Si tu utilises l’appli pour la première fois, la carte [[tx:nameSheet.title]] s’affiche. Écris ton prénom et touche [[nameSheet.confirm]]. Les membres du cercle te verront sous ce nom.",
            "Pour un cercle régulier, la fenêtre [[tx:join.welcome]] s’affiche ensuite ; quand tu touches [[common.ok]], l’écran du cercle s’ouvre. Pour un cercle ponctuel, l’écran du cercle s’ouvre directement.",
          ],
          fark: "Pas besoin de créer un compte pour rejoindre. Ni e-mail, ni mot de passe, ni numéro de téléphone : ton prénom suffit.",
          ipucu: "Si tu as déjà rejoint ce cercle, toucher [[joinGroup.join]] ouvre directement l’écran du cercle.",
          sahne: "katil-katil",
        },
      ],
    },
    {
      tur: "bolum", id: "uygulaman-yoksa", rol: "La personne invitée", baslik: "Tu n’as pas l’appli",
      giris: "Quand tu touches le lien d’un cercle régulier, la page d’invitation s’ouvre dans le navigateur. Une fois l’appli téléchargée, l’invitation n’arrive pas toute seule : touche encore une fois le lien du message, ou entre le code dans l’appli. Note donc le code d’abord. Le lien d’un cercle ponctuel, lui, ouvre souvent la page du cercle (voir l’étape 7 plus bas).",
      adimlar: [
        {
          baslik: "Note le code de la page d’invitation et télécharge l’appli",
          metin: [
            "Sur la page, tu vois un code de six caractères dans la case [[tx:=Code d’invitation]], par exemple T4X6RC. Note-le quelque part, ou garde le message.",
            "Touche ensuite [[ol:=App Store]] ou [[ol:=Google Play]] et télécharge Manevi Halka. Télécharger l’appli et rejoindre un cercle sont gratuits.",
          ],
          ipucu: "Le code est souvent écrit aussi dans le message : la ligne [[tx:group.shortCode]], sous le lien, contient le même code.",
          sahne: "katil-sayfa",
        },
        {
          baslik: "Ouvre l’onglet Cercles dans l’appli",
          metin: [
            "Ouvre l’appli et termine la courte présentation du premier lancement. Touche l’onglet [[tabs.circles]] dans la barre du bas. Touche ensuite [[ol:circlesTab.anonJoin]].",
            "L’appli te demande seulement ton prénom. Écris-le et touche [[nameSheet.confirm]]. L’écran [[tx:joinGroup.title]] s’ouvre ensuite.",
          ],
          ipucu: "Si tu as déjà écrit ton prénom ou si tu t’es connecté dans l’appli, tu ne vois pas ce bouton. Touche alors le bouton **+** en haut à droite. Dans le panneau qui s’ouvre, touche la ligne [[tx:dashboard.joinExisting]].",
          sahne: "katil-kod-giris",
        },
        {
          baslik: "Colle le lien ou le code, puis touche Rejoindre",
          metin: [
            "Dans WhatsApp, appuie longuement sur le message d’invitation et copie-le. Reviens dans l’appli et touche [[ol:common.paste]]. Si ton téléphone demande l’autorisation de coller, accepte. L’appli trouve elle-même le code dans le message. Tu peux aussi écrire le code à la main.",
            "Touche ensuite [[joinGroup.join]]. L’écran du cercle s’ouvre directement.",
          ],
          fark: "Tu peux coller le lien entier, et même tout le message. Le code est reconnu même s’il est écrit avec des espaces.",
          ipucu: "Si le code ne correspond à aucun cercle, l’appli affiche : [[tx:joinGroup.notFoundMsg]] Relis-le alors caractère par caractère. Les codes n’utilisent ni les lettres I et O, ni les chiffres 0 et 1.",
          sahne: "katil-kod",
        },
      ],
    },
    {
      tur: "bolum", id: "qr-ve-tarayici", rol: "La personne invitée", baslik: "Avec un QR code ou depuis le navigateur",
      giris: "L’invitation peut être affichée sur un écran, à la mosquée ou pendant une réunion. Et un cercle ponctuel se rejoint même sans l’appli.",
      adimlar: [
        {
          baslik: "Scanne le QR code avec l’appareil photo de ton téléphone",
          metin: [
            "Un membre du cercle, souvent l’administrateur, ouvre la fenêtre [[tx:group.inviteToCircle]] sur son téléphone. Elle contient un QR code. Ouvre l’appareil photo de ton téléphone et vise le QR code.",
            "Touche le lien qui apparaît à l’écran. Si tu as l’appli, la carte d’invitation s’ouvre ; touche [[joinGroup.join]]. Sinon, la page d’invitation s’ouvre ; continue à partir de l’étape 3 ci-dessus.",
          ],
          ipucu: "Le QR code se trouve dans la fenêtre d’invitation des cercles réguliers. Pour les cercles ponctuels, on utilise le lien ou le code.",
          sahne: "katil-qr",
        },
        {
          baslik: "Rejoins un cercle ponctuel depuis le navigateur",
          metin: [
            "Le lien d’un cercle ponctuel, comme une khatma pour un défunt, une khatma pour une nuit bénie ou des salawat en groupe, s’ouvre souvent même sans l’appli : la page du cercle s’affiche dans le navigateur. Ni compte ni appli ne sont nécessaires. Si la page n’affiche que [[tx:=Code d’invitation]] et les boutons App Store et Google Play, ce lien demande l’appli ; continue à partir de l’étape 3.",
            "Pour une khatma, touche [[=Prendre celle-ci]]. La page demande : [[=Combien vas-tu lire ?]] Choisis le nombre de pages, puis touche [[=Je confirme, je la prends]]. Le bouton [[=Lire maintenant]] ouvre ensuite tes pages dans le navigateur. Pour un objectif de dhikr ou de salawat, touche [[=Participer au décompte]], touche le cercle autant de fois que tu as récité et, à la fin, touche [[=Ajouter mon décompte]].",
            "Chacun lit ou récite chez lui ; la page ne fait que répartir les parts et additionner les nombres. Pour certains cercles, la page montre seulement le cercle ; il faut alors l’appli pour participer. Plus de détails : [Cercle ponctuel](/fr/guides/cercle-ponctuel/) et [Dhikr et salawat en groupe](/fr/guides/dhikr-salawat-en-groupe/).",
          ],
          fark: "Un proche qui n’a pas l’appli peut souvent, lui aussi, toucher le lien et prendre sa part dans le navigateur.",
          ipucu: "Si tu as l’appli et que cette page s’est ouverte, touche le bouton [[=Ouvrir dans l’application]] tout en bas, puis [[joinGroup.join]] dans l’appli. Les parts que tu prendras ensuite seront enregistrées dans ton propre compte et apparaîtront dans la section [[tx:dashboard.myTasks]].",
          sahne: "katil-web",
        },
      ],
    },
    {
      tur: "bolum", id: "katildiktan-sonra", rol: "Nouveau membre", baslik: "Après avoir rejoint",
      giris: "L’écran du cercle a deux onglets. L’onglet [[tx:group.readingsTab]] montre les tâches du cercle, l’onglet [[tx:group.membersMenu]] montre ses membres.",
      adimlar: [
        {
          baslik: "Trouve ta tâche sur l’Accueil",
          metin: [
            "Quand une tâche t’est attribuée, une carte apparaît dans la section [[tx:dashboard.myTasks]] de l’onglet [[tx:tabs.home]]. Elle indique le nom du cercle et le juz qui t’est attribué.",
            "Touche la carte pour ouvrir l’écran de la tâche. Si tu as autorisé les notifications, tu en reçois aussi une quand ta nouvelle tâche est prête ; la notification d’un tour qui commence la nuit arrive le matin.",
          ],
          sahne: "katil-gorev",
        },
        {
          baslik: "Une khatma est en cours ? Ta part arrive au tour suivant",
          metin: [
            "S’il y a une khatma en cours et que tu as rejoint en plein tour, ce texte s’affiche sur l’écran de la tâche : [[tx:flow.noAssignment]] Ce n’est pas une erreur.",
            "Les juz sont répartis entre les personnes présentes dans le cercle au début du tour. Au tour suivant, tu entres toi aussi dans la liste et ta part arrive toute seule. Les tâches comme un objectif de dhikr, elles, apparaissent tout de suite dans la section [[tx:dashboard.myTasks]].",
          ],
          ipucu: "Si tu ne veux pas attendre et qu’une part est disponible dans le pool, le lien [[tx:flow.noAssignmentPoolCta]] apparaît en bas. Tu peux y prendre une part si tu veux.",
          sahne: "katil-sonraki-tur",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Voici à quoi ça ressemble dans l’appli",
      giris: "Ces captures viennent de l’appli elle-même.",
      kareler: [
        { img: "h01-home", alt: "Accueil : les tâches des cercles dans la section Tes tâches", cap: "Accueil : tes tâches" },
        { img: "n01-halka", alt: "Écran du cercle : les tâches du cercle dans l’onglet Lectures", cap: "Écran du cercle : les tâches du cercle" },
        { img: "n03b-uyeler", alt: "Onglet Membres : un membre invité, la ligne Ajouter un invité et le bouton Quitter le cercle", cap: "Onglet Membres (vue de l’administrateur) : membre invité et [[tx:group.leaveGroup]]" },
        { img: "06c-event-davet", alt: "Carte d’invitation d’un cercle ponctuel : code d’invitation, lien d’invitation et note pour ceux qui n’ont pas l’appli", cap: "Cercle ponctuel : le lien s’ouvre même sans l’appli" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "J’ai touché le lien d’invitation : que se passe-t-il ?",
        c: "Si tu as l’appli sur ton téléphone, elle s’ouvre et affiche la carte d’invitation ; tu touches [[joinGroup.join]]. Si tu n’as pas l’appli, la page d’invitation s’ouvre dans le navigateur. Elle contient le code d’invitation et les boutons pour télécharger l’appli. Le lien d’un cercle ponctuel, lui, ouvre souvent la page du cercle dans le navigateur. Si la page n’affiche que [[tx:=Code d’invitation]] et les boutons App Store et Google Play, il faut l’appli pour ce cercle ; continue à partir de l’étape 3." },
      { s: "On m’a envoyé un code court : où dois-je l’écrire ?",
        c: "Dans l’appli, ouvre l’onglet [[tabs.circles]] et touche [[ol:circlesTab.anonJoin]]. Si tu ne vois pas ce bouton (parce que tu as déjà écrit ton prénom ou que tu t’es connecté), touche le bouton **+** en haut à droite, puis la ligne [[tx:dashboard.joinExisting]]. Écris le code dans la case et touche [[joinGroup.join]]." },
      { s: "Puis-je rejoindre sans télécharger l’appli ?",
        c: "Pour un cercle ponctuel, souvent oui : le lien s’ouvre dans le navigateur, et tu prends un juz ou tu participes au décompte. Pour un cercle régulier, il faut l’appli. Pour un parent âgé sans smartphone, l’administrateur peut l’ajouter comme **invité** ; le responsable choisi ou l’administrateur marque alors sa part du Coran." },
      { s: "Dois-je créer un compte ?",
        c: "Non. L’appli demande seulement ton prénom ; ni e-mail, ni mot de passe, ni numéro de téléphone. Plus tard, si tu veux, touche le bandeau en haut de l’écran [[tabs.circles]] ([[tx:secure.banner]]) et associe ton compte à Apple, Google ou une adresse e-mail. Ainsi, tes cercles ne se perdent pas, même si tu changes de téléphone." },
      { s: "J’ai rejoint : où vois-je ma tâche ?",
        c: "Dans la section [[tx:dashboard.myTasks]] de l’onglet [[tx:tabs.home]]. L’onglet [[tx:group.readingsTab]] de l’écran du cercle liste aussi toutes les tâches du cercle. Si tu as rejoint une khatma en plein tour, ta part arrive avec le tour suivant." },
      { s: "Comment quitter un cercle ?",
        c: "Sur l’écran du cercle, touche les trois points en haut à droite. Dans la liste qui s’ouvre, touche la ligne [[tx:group.leaveGroup]]. La page suivante montre ce qui va changer. Avec [[ol:common.leave]], tu quittes le cercle ; avec [[tx:notice.stayInCircle]], tu renonces. Tes parts du Coran non terminées sont remises dans le pool, où les membres du cercle peuvent les prendre. Si tu veux, tu peux revenir plus tard avec le même code." },
      { s: "Le lien d’invitation ou le code ne fonctionne pas : que faire ?",
        c: "Si le lien pose problème, l’appli affiche : [[tx:join.invalidLink]] Si tu as essayé avec un code, elle affiche : [[tx:joinGroup.notFoundMsg]] Le code a peut-être été mal écrit, ou le cercle n’existe plus. Les cercles ponctuels se ferment à la fin de leur durée. Demande un nouveau lien ou un nouveau code à la personne qui te l’a envoyé. Si le cercle est complet, l’appli affiche : [[tx:joinGroup.groupFull]] Préviens alors l’administrateur." },
    ],
  },

  ilgili: ["hatim", "tek", "zikir"],
  cta: { baslik: "Télécharge l’appli maintenant", metin: "Rejoindre un cercle est gratuit. Télécharge l’appli, touche le lien d’invitation, rejoins ton cercle." },
  kart: { kicker: "Rejoindre", baslik: "Rejoindre un cercle avec une invitation", metin: "Touche le lien ou colle le code. Sans l’appli, rejoins un cercle ponctuel depuis le navigateur." },
  onizleme: { sahne: "katil-link", adim: 3 },
};
