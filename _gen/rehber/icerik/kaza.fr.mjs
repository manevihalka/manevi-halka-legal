// Prières et jeûnes de rattrapage (FR). Format : commentaire en tête de _gen/build-rehber.mjs. Traduit de kaza.tr.mjs.
// Aucun avis juridique ; l'aide au calcul ne donne qu'une estimation. Questions « est-ce permis » : sans lien, sans avis (règle FR).
export default {
  title: "Prières de rattrapage : calculer et suivre ses qada",
  desc: "Suis tes prières et jeûnes de rattrapage dans l'appli : une aide estime le nombre, tu les coches un à un. Toi seul vois ce que tu notes.",
  h1: "Comment suivre ses prières et jeûnes de rattrapage ?",
  crumb: "Prières et jeûnes de rattrapage",
  eyebrow: "Guide pas à pas",
  lead: "Prières et jeûnes de rattrapage est une page personnelle pour rattraper, à ton rythme, les prières manquées et les jours de jeûne que tu n'as pas pu faire. Tu notes les nombres une fois, puis tu les coches un à un. Toi seul vois ce que tu notes.",
  meta: ["Réglage en 2 minutes environ", "Toi seul le vois", "Gratuit"],
  film: { sahne: "film-kaza", cap: "Une prière avec le + à côté de son moment, une journée entière d'un geste, et [[kaza.oruc.today]] pour le jeûne." },

  kisa: {
    maddeler: [
      "Touche l'anneau des prières dans l'onglet [[tx:tabs.home]] : [[prayerDetail.title]] s'ouvre. Touche plus bas la ligne [[kaza.titleBoth]].",
      "Touche [[kaza.s1.begin]] et note combien de prières de chaque moment il te reste. Si tu ne sais pas, [[ol:kaza.s2.calc]] donne un nombre approximatif.",
      "Note sur le même écran les jours de jeûne manqués, choisis ton rythme et touche [[kaza.s3.finish]].",
      "Quand tu pries un rattrapage, touche le **+** à côté de son moment. Pour plusieurs à la fois, il y a [[kaza.main.day]] et [[ol:kaza.main.some]].",
      "Dans Mes prières, le bouton [[kaza.bridge.also]] sous une prière cochée note d'un geste le rattrapage prié après l'obligatoire.",
      "Un jour de jeûne de rattrapage, touche [[kaza.oruc.today]] dans l'onglet [[tx:kaza.tabO]]. L'historique montre chaque entrée et permet de la corriger.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kurulum", baslik: "Prépare ta page de rattrapage",
      giris: "Le réglage tient en trois écrans courts. Tu peux corriger les nombres quand tu veux ; ils n'ont pas besoin d'être exacts la première fois.",
      adimlar: [
        {
          baslik: "Ouvre Prières et jeûnes de rattrapage depuis Mes prières",
          metin: [
            "Touche l'anneau des prières dans l'onglet [[tx:tabs.home]] : l'écran [[prayerDetail.title]] s'ouvre. Le bouton rond avec la coche, en haut de l'onglet [[tx:tabs.explore]], ouvre le même écran.",
            "Sous les prières du jour, touche la ligne [[kaza.titleBoth]]. La première fois, le réglage commence. Le premier écran te dit que cette page n'est qu'à toi et que les nombres sont une estimation. Touche [[kaza.s1.begin]].",
          ],
          sahne: "kaza-ac",
        },
        {
          baslik: "Note combien de prières de chaque moment il te reste",
          metin: [
            "Sur l'écran [[tx:kaza.s2.title]], note le nombre que tu connais pour Fajr, Dhohr, Asr, Maghrib et Icha. [[tx:kaza.s2.witrToggle]] est activé ; désactive-le si tu ne veux pas compter le witr.",
            "Si tu as manqué des jours de jeûne, note leur nombre plus bas dans la case [[tx:kaza.titleO]], sinon laisse-la vide. Tu peux régler seulement les prières, seulement les jeûnes, ou les deux. Touche ensuite [[kaza.s2.next]].",
          ],
          sahne: "kaza-sayilar",
        },
        {
          baslik: "Tu ne connais pas le nombre ? Demande à l'aide au calcul",
          metin: [
            "Touche [[ol:kaza.s2.calc]]. Réponds à [[tx:kaza.calc.q]] en années et en mois. S'il y a eu plusieurs périodes, ajoute-les avec [[tx:kaza.calc.addPeriod]]. Un nombre approximatif pour chaque prière apparaît en bas ; [[kaza.calc.apply]] l'inscrit pour tous les moments.",
            "Il existe aussi une option facultative [[tx:kaza.calc.special]] pour les femmes. Le jeûne a sa propre aide : [[ol:kaza.s2.fastCalc]] demande combien de Ramadans tu n'as pas pu jeûner.",
          ],
          ipucu: "L'aide ne donne qu'une estimation : elle convertit la durée saisie en jours et arrondit au-dessus. Pour ta propre situation, tu peux demander à un savant ; les notes de l'appli le conseillent aussi.",
          sahne: "kaza-hesap",
        },
        {
          baslik: "Choisis ton rythme et touche Bismillah",
          metin: [
            "L'écran [[tx:kaza.s3.title]] propose trois choix : [[tx:kaza.pace.afterFard]], [[tx:kaza.pace.twoDaily]] et [[tx:kaza.pace.self]]. Selon le rythme choisi, une durée approximative s'affiche en dessous ; aucune date butoir n'est fixée.",
            "Si tu veux, active [[tx:kaza.s3.remind]] et choisis une heure. Le rappel évite les moments où la prière est déconseillée et n'affiche ni nombre ni le mot « rattrapage » sur l'écran verrouillé. Touche ensuite [[kaza.s3.finish]].",
          ],
          ipucu: "À la fin du réglage, on te demande une seule fois si tes prières de rattrapage doivent aussi pousser comme une jeune pousse dans ton Jardin des intentions. Le jardin ne fait que lire, il ne touche jamais aux nombres d'ici. Tu peux toucher [[ol:kaza.garden.no]] et continuer.",
          sahne: "kaza-tempo",
        },
      ],
    },
    {
      tur: "bolum", id: "isaretle", baslik: "Coche-les un à un",
      giris: "En haut de l'écran principal, tu vois combien de prières tu as accomplies ; en dessous, ce qui reste pour chaque moment. Chaque coche change les deux nombres à la fois.",
      adimlar: [
        {
          baslik: "Tu as prié un rattrapage ? Touche le + de son moment",
          metin: [
            "Chaque moment affiche le nombre restant et un bouton **+**. Touche le moment de la prière rattrapée : le nombre restant baisse d'un, [[tx:kaza.main.doneLabel]] en haut monte d'un. Si tu as touché par erreur, utilise [[tx:notice.undo]] dans la barre qui apparaît en bas.",
            "Dans la rangée de perles de la carte du haut, chaque perle vaut un mois. Les perles se remplissent à mesure que tu pries : tu vois où tu en es sans lire de chiffres.",
          ],
          ipucu: "Le bouton en forme d'œil, en haut à droite, masque les nombres. Tu peux ouvrir l'écran tranquillement même si quelqu'un est à côté de toi.",
          sahne: "kaza-arti",
        },
        {
          baslik: "Noter une journée entière ou plusieurs à la fois",
          metin: [
            "Si tu as rattrapé une prière de chacun des cinq moments, et le witr s'il est activé, touche [[kaza.main.day]] ; une de chaque est notée.",
            "Si tu en as prié plusieurs ensemble, touche [[ol:kaza.main.some]]. Dans la fenêtre, choisis le nombre pour chaque moment, change au besoin quand tu les as priées, puis enregistre. Le nombre compte des prières, pas des jours.",
          ],
          sahne: "kaza-birkac",
        },
        {
          baslik: "Dans Mes prières : J'ai aussi prié son rattrapage",
          metin: "Une fois ta page prête, le bouton [[kaza.bridge.also]] apparaît dans [[prayerDetail.title]] sous chaque prière que tu coches comme accomplie. Si tu as prié le rattrapage de ce moment après l'obligatoire, touche-le. Un rattrapage de ce moment est ajouté à ta page et le bouton devient [[tx:kaza.bridge.done]].",
          fark: "Pas besoin d'ouvrir la page : tu notes le rattrapage là où tu coches la prière obligatoire.",
          ipucu: "Un moment que tu ne coches pas n'est jamais ajouté de lui-même à tes rattrapages.",
          sahne: "kaza-kisayol",
        },
        {
          baslik: "Un jour de jeûne de rattrapage : J'ai jeûné aujourd'hui",
          metin: [
            "Passe à l'onglet [[tx:kaza.tabO]] en haut. Le jour où tu jeûnes pour rattraper, touche [[kaza.oruc.today]]. Les jours passés se choisissent dans le calendrier avec [[tx:kaza.oruc.some]] ; les jours de l'Aïd ne peuvent pas y être sélectionnés.",
            "Dans les perles, chaque ligne est un Ramadan et chaque perle un jour. Si tu veux, active [[tx:kaza.oruc.ramadan]] : tu reçois un rappel unique pendant le mois de Cha'bane.",
          ],
          sahne: "kaza-oruc",
        },
      ],
    },
    {
      tur: "bolum", id: "gecmis", baslik: "Historique et corrections",
      giris: "Chaque coche est enregistrée avec sa date et son heure. Une erreur ne fausse pas les nombres ; elle se corrige facilement.",
      adimlar: [
        {
          baslik: "Voir et corriger chaque entrée dans l'historique",
          metin: [
            "Touche la ligne **Dernière entrée** sur l'écran principal : [[tx:kaza.hist.title]] s'ouvre. Les entrées sont classées jour par jour, avec l'heure. Touche-en une pour la modifier ou la supprimer.",
            "Change les nombres du départ avec [[ol:kaza.hist.correct]] ; ce que tu as déjà rattrapé reste. Si quelque chose a mal tourné, [[tx:kaza.hist.restore]] te ramène à l'un des 30 derniers états. Tu changes aussi ton rythme ici.",
          ],
          sahne: "kaza-gecmis",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "À quoi ça ressemble dans l'appli",
      giris: "Ces captures viennent de l'appli elle-même.",
      kareler: [
        { img: "n-kaza", alt: "Prières de rattrapage : onglet Prière, Accomplies 1381 prières, rangée de perles par année et nombre restant pour chaque moment", cap: "Prières de rattrapage : accomplies, restantes et perles par année" },
        { img: "n-namazlarim", alt: "Mes prières : sous les prières cochées, le bouton J'ai aussi prié son rattrapage, puis la ligne Prières et jeûnes de rattrapage", cap: "Mes prières : **J'ai aussi prié son rattrapage** et la ligne de rattrapage" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Qui voit mes rattrapages ?",
        c: "Toi seul. La page est entièrement personnelle : tes entrées restent sur ce téléphone, à part de tes cercles. Pour masquer aussi les nombres à l'écran, touche le bouton en forme d'œil en haut à droite." },
      { s: "L'aide au calcul me dit-elle exactement combien de prières je dois rattraper ?",
        c: "Non, elle ne donne qu'une estimation. Elle convertit les années et les mois saisis en jours et arrondit au-dessus. Tu peux modifier le résultat comme tu veux. Pour ta propre situation, tu peux demander à un savant." },
      { s: "Faut-il rattraper les prières dans l'ordre ?",
        c: "Des savants ont répondu à cette question, et la réponse dépend de ta situation. Pour un avis qui te convient, demande à un savant de confiance. L'appli n'impose aucun ordre ; tu coches les moments dans l'ordre que tu veux." },
      { s: "Que se passe-t-il si je change de téléphone ?",
        c: "Tes entrées sont gardées sur ce téléphone. Sur le nouveau, tu prépares à nouveau la page et tu notes ce qu'il te reste. Tu peux toujours corriger ensuite avec [[ol:kaza.hist.correct]]." },
      { s: "La kaffara et la fidya sont-elles comptées ?",
        c: "Non, l'onglet Jeûne ne compte que les jeûnes de rattrapage. Pour la différence entre rattrapage, kaffara et fidya, lis la note [[tx:kaza.oruc.info]] en bas de l'onglet Jeûne." },
      { s: "Est-ce gratuit ?",
        c: "Oui. Prières et jeûnes de rattrapage est gratuit." },
    ],
  },

  ilgili: ["teheccud", "bahce", "oruc"],
  kart: { kicker: "Rattrapage", baslik: "Prières et jeûnes de rattrapage", metin: "Note ton nombre une fois, puis coche-les un à un. Toi seul vois ce que tu notes." },
  onizleme: { sahne: "kaza-kart", adim: 5 },
  cta: { baslik: "Prépare ta page aujourd'hui", metin: "Télécharge Manevi Halka gratuitement, ouvre la page depuis Mes prières et note tes nombres." },
};
