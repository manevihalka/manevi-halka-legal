// Réveil du tahajjud (FR). Format : commentaire en tête de _gen/build-rehber.mjs. Traduit de teheccud.tr.mjs.
// Mode silencieux : iOS 26+ (AlarmKit) sonne en silencieux et en Concentration ; Android : seulement la phrase de l'appli ;
// avant iOS 26 : notification qui ne sonne pas en silencieux. Le partage dans un cercle n'est volontairement pas mentionné.
export default {
  title: "Réveil du tahajjud : l'heure du tahajjud cette nuit",
  desc: "La carte Tahajjud de Mes prières montre l'heure du tahajjud de cette nuit. Règle le réveil sur le dernier tiers de la nuit ou à l'heure de ton choix.",
  h1: "Comment régler le réveil du tahajjud ?",
  crumb: "Réveil du tahajjud",
  eyebrow: "Guide pas à pas",
  lead: "La carte Tahajjud de Mes prières montre l'heure du tahajjud de cette nuit : du début du dernier tiers de la nuit jusqu'à l'aube. Tu règles le réveil depuis la même carte. Sur iPhone, à partir d'iOS 26, il sonne même en mode silencieux.",
  meta: ["Réglage en 1 minute", "iPhone et Android", "Gratuit"],
  film: { sahne: "film-teheccud", cap: "Active le suivi des prières surérogatoires, règle le réveil depuis la carte Tahajjud, et ton téléphone sonne à l'heure." },

  kisa: {
    maddeler: [
      "Touche l'anneau des prières dans l'onglet [[tx:tabs.home]] : [[prayerDetail.title]] s'ouvre.",
      "Dans la section [[tx:prayer.naflSection]], active [[tx:prayer.naflTrackToggle]]. La carte Tahajjud apparaît et montre l'heure du tahajjud de cette nuit.",
      "Touche la ligne [[tx:night.alarm]] sur la carte et active [[tx:tahajjudAlarm.enableTitle]].",
      "Choisis l'heure : le dernier tiers de la nuit, quelques minutes avant Fajr ou une heure fixe.",
      "Choisis les nuits ; [[tx:tahajjudAlarm.preset.all]] est sélectionné d'office. Les prochains réveils s'affichent dans la liste.",
      "Quand le réveil sonne, [[tx:tahajjudAlarm.snooze]] le fait sonner à nouveau 10 minutes plus tard. Après la prière, touche le cercle de la carte.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kart", baslik: "Ouvre la carte Tahajjud",
      giris: "La carte Tahajjud se trouve dans la section des prières surérogatoires de Mes prières. Il suffit d'activer leur suivi une fois.",
      adimlar: [
        {
          baslik: "Active le suivi des prières surérogatoires dans Mes prières",
          metin: [
            "Touche l'anneau des prières dans l'onglet [[tx:tabs.home]] : l'écran [[prayerDetail.title]] s'ouvre. Le bouton rond avec la coche, en haut de l'onglet [[tx:tabs.explore]], ouvre le même écran.",
            "Fais défiler vers le bas. Dans la section [[tx:prayer.naflSection]], active [[tx:prayer.naflTrackToggle]]. La carte Tahajjud apparaît sous la ligne Douha.",
          ],
          sahne: "teh-ac",
        },
        {
          baslik: "Vois l'heure du tahajjud de cette nuit et coche-la après la prière",
          metin: [
            "En haut de la carte s'affiche une plage horaire comme **Cette nuit 02:08-06:17**. Elle va du début du dernier tiers de la nuit jusqu'à l'aube, d'après les horaires de prière de ta ville. Si aucune ville n'est choisie pour les horaires, la carte affiche seulement « La nuit » au lieu de la plage.",
            "Après la prière, touche le cercle à droite de la carte. Si tu veux, choisis combien de rak'as tu as priées avec les boutons de 2 à 12 ; ton dernier choix est gardé. Pour suivre aussi le witr, active [[tx:night.witrToggle]] en bas de la carte.",
          ],
          ipucu: "La ligne [[tx:night.guide]], tout en bas de la carte, ouvre un petit guide : son moment, le nombre de rak'as, l'intention, ce qu'on récite et son lien avec le witr.",
          sahne: "teh-kart",
        },
      ],
    },
    {
      tur: "bolum", id: "alarm", baslik: "Règle le réveil",
      giris: "À partir d'iOS 26 et sur Android, le réveil est un vrai réveil : ton téléphone sonne à l'heure. Tous les réglages se font sur un seul écran.",
      adimlar: [
        {
          baslik: "Touche la ligne Réveil et active-le",
          metin: [
            "Touche la ligne [[tx:night.alarm]] sur la carte Tahajjud. L'écran [[tx:tahajjudAlarm.screenTitle]] s'ouvre. Active [[tx:tahajjudAlarm.enableTitle]] en haut. La première fois, l'iPhone demande l'autorisation pour les alarmes ; accepte-la.",
            "La ligne sous l'interrupteur te dit comment le réveil sonnera sur ton téléphone. À partir d'iOS 26, elle indique « Sonne même en mode silencieux et en mode Concentration. » Sur Android, le réveil sonne avec la sonnerie d'alarme du téléphone. Sur les versions d'iOS antérieures à 26, il arrive comme notification et ne sonne pas en mode silencieux.",
          ],
          ipucu: "Sur Android, si l'autorisation des alarmes exactes est désactivée, un avertissement et un bouton [[tx:tahajjudAlarm.exactFix]] apparaissent. Tant qu'elle est désactivée, le réveil peut sonner avec quelques minutes de retard.",
          sahne: "teh-alarm-ac",
        },
        {
          baslik: "Choisis l'heure",
          metin: "La section [[tx:tahajjudAlarm.timeSection]] propose trois choix :",
          liste: [
            "[[tx:prayerTracking.tahajjudModeLastThird]] : le début de la plage que tu vois sur la carte. C'est le choix par défaut.",
            "[[tx:prayerTracking.tahajjudModeBeforeFajr]] : 15, 30, 45, 60, 75 ou 90 minutes avant Fajr.",
            "[[tx:prayerTracking.tahajjudModeFixed]] : l'heure que tu veux, par exemple 03:30.",
          ],
          ipucu: "Les deux premiers choix sont calculés à partir des horaires de prière. Si aucune ville n'est choisie pour les horaires, seule l'heure fixe est possible.",
          sahne: "teh-saat",
        },
        {
          baslik: "Choisis les nuits",
          metin: [
            "Dans la section [[tx:tahajjudAlarm.nightsSection]], [[tx:tahajjudAlarm.preset.all]] est sélectionné d'office. Si tu veux, choisis les nuits une par une. Une nuit porte le nom de son matin : la nuit de lundi va du dimanche soir au lundi matin.",
            "La liste [[tx:tahajjudAlarm.upcomingTitle]], tout en bas, montre quelle nuit et à quelle heure sonneront les prochains réveils.",
          ],
          ipucu: "Tant que le réveil est activé, le rappel du tahajjud dans les Réglages des prières reste silencieux, pour que tu ne sois pas prévenu deux fois. Quand tu désactives le réveil, le rappel revient avec ses anciens réglages.",
          sahne: "teh-geceler",
        },
      ],
    },
    {
      tur: "bolum", id: "caldiginda", baslik: "Quand le réveil sonne",
      giris: "À l'heure, ton téléphone sonne avec « C'est l'heure du tahajjud ».",
      adimlar: [
        {
          baslik: "Répète ou arrête, puis coche après la prière",
          metin: [
            "[[tx:tahajjudAlarm.snooze]] fait sonner le réveil à nouveau 10 minutes plus tard. Si tu es levé, arrête le réveil.",
            "Après la prière, touche le cercle de la carte Tahajjud dans Mes prières. Le nombre de nuits où tu as prié s'affiche dans le résumé des prières surérogatoires, sous la carte.",
          ],
          ipucu: "Si tu as une intention de tahajjud dans le Jardin des intentions, chaque nuit cochée dans Mes prières y compte aussi.",
          sahne: "teh-caliyor",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Le réveil du tahajjud sonne-t-il en mode silencieux ?",
        c: "Sur iPhone à partir d'iOS 26, oui : le réveil sonne même en mode silencieux et en mode Concentration. Sur les versions d'iOS antérieures à 26, il arrive comme notification et ne sonne pas en mode silencieux ; l'écran du réveil le dit lui-même. Sur Android, le réveil sonne avec la sonnerie d'alarme du téléphone." },
      { s: "Comment l'heure du tahajjud est-elle calculée ?",
        c: "La plage de la carte va du début du dernier tiers de la nuit, compté du Maghrib à Fajr d'après les horaires de ta ville, jusqu'à l'aube. Tu peux régler le réveil sur le début de cette plage, quelques minutes avant Fajr ou une heure fixe." },
      { s: "Quelle différence avec le rappel du tahajjud des Réglages des prières ?",
        c: "Le rappel est une notification. À partir d'iOS 26 et sur Android, le réveil est un vrai réveil : ton téléphone sonne et tu peux le répéter 10 minutes plus tard. Tant que le réveil est activé, le rappel reste silencieux ; quand tu le désactives, le rappel revient avec ses anciens réglages." },
      { s: "Le réveil continue-t-il de sonner chaque nuit ?",
        c: "Oui, les nuits que tu as choisies. L'appli règle les réveils pour au plus les sept prochaines nuits et les renouvelle chaque fois que tu ouvres l'appli. Il suffit de l'ouvrir tous les quelques jours." },
      { s: "Puis-je l'utiliser sans choisir de ville ?",
        c: "Oui, avec une heure fixe. Le dernier tiers de la nuit et l'heure avant Fajr se calculent à partir des horaires de prière et ont donc besoin d'une ville ; sans ville, l'écran ne laisse que l'heure fixe." },
      { s: "Est-ce gratuit ?",
        c: "Oui. La carte Tahajjud et le réveil sont gratuits." },
    ],
  },

  ilgili: ["kaza", "defter", "bahce"],
  kart: { kicker: "Tahajjud", baslik: "Réveil du tahajjud", metin: "Vois l'heure du tahajjud de cette nuit et règle le réveil. Sur iOS 26, il sonne même en silencieux." },
  onizleme: { sahne: "teheccud-kart", adim: 5 },
  cta: { baslik: "Règle ton réveil du tahajjud ce soir", metin: "Télécharge Manevi Halka gratuitement, active les prières surérogatoires dans Mes prières et règle le réveil depuis la carte Tahajjud." },
};
