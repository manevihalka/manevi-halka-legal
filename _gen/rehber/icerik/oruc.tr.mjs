// Halkada oruç görevi (TR), 2.1.0 (21 Kas 2026). Biçim: _gen/build-rehber.mjs başındaki açıklama.
// Düğme adları [[anahtar]] ile uygulamadan gelir; metinde uzun tire yok. Fıkıh hükmü yok.
export default {
  title: "Birlikte oruç: Ramazan orucu takibi için grup kurma",
  desc: "Halkanda oruç görevi kur: Ramazan, pazartesi ve perşembe ya da seçtiğin günler. Herkes kendi orucunu iftarda işaretler, kimin neyi göreceğini sen seçersin.",
  h1: "Halkada oruç görevi: birlikte oruç nasıl takip edilir?",
  crumb: "Halkada oruç görevi",
  eyebrow: "Adım adım rehber",
  lead: "Halkanda bir oruç görevi kurarsın: Ramazan orucu, pazartesi ve perşembe ya da kendi seçtiğin günler. Herkes kendi orucunu tutar ve iftarda işaretler; halka birlikte yürür. Kimse kendiliğinden katılmaz, herkes neyin görüneceğini okuyup onaylar.",
  meta: ["Kurulum yaklaşık 1 dakika", "Kimse kendiliğinden katılmaz", "Katılmak ücretsiz"],
  film: { sahne: "film-oruc", cap: "Görevi kur, Ramazan orucunu seç, iftarda işaretle." },

  kisa: {
    maddeler: [
      "Halka ekranında [[group.addTask]] düğmesine dokun, [[tx:compose.sectionPractice]] altındaki [[tx:compose.typeFasting]] kartını seç.",
      "[[tx:fasting.rowKind]] satırından [[tx:fasting.kindRamadan]], [[tx:fasting.kindMonThu]] ya da [[tx:fasting.kindCustom]] seçeneğini seç.",
      "[[tx:compose.rowVisibility]] satırında kimin neyi göreceğini belirle, sonra [[compose.startTask]] de.",
      "Görev halkadaki herkesin listesine düşer. Katılmak isteyen [[fasting.joinCta]] der ve neyin görüneceğini okuyup onaylar.",
      "Oruç günü iftar girince [[fasting.markDone]] düğmesine dokunursun; ekran [[tx:fasting.accepted]] der.",
      "Katılanlara oruçtan önceki akşam hatırlatma gider. Boş kalan günün sebebi sorulmaz.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Halkayı kuran kişi", baslik: "Oruç görevini kur",
      giris: "Oruç görevi bir ortak ameldir: herkes kendi orucunu tutar, uygulama yalnız işaretleri toplar. Görevi halkanın yöneticisi açar. Halkan yoksa önce [hatim rehberindeki gibi](/tr/rehber/hatim-grubu-kurma/) bir halka kur ve kardeşlerini davet et.",
      adimlar: [
        {
          baslik: "Görev ekle ve Oruç'u seç",
          metin: "Halka ekranında sağ alttaki [[group.addTask]] düğmesine dokun. [[tx:compose.pickTitle]] ekranında aşağı kaydır ve [[tx:compose.sectionPractice]] başlığının altındaki [[tx:compose.typeFasting]] kartına dokun.",
          ipucu: "Ramazan yaklaşınca, yaklaşık dört ay önceden, [[tx:compose.quickStart]] satırının başında [[tx:compose.tplRamadanFast]] kartı da çıkar. Ona dokunursan Ramazan orucu seçili gelir.",
          sahne: "oruc-ac",
        },
        {
          baslik: "Hangi orucu tutacağınızı seç",
          metin: "[[tx:fasting.rowKind]] satırına dokun. Üç seçenek var:",
          liste: [
            "[[tx:fasting.kindRamadan]]: 1 Ramazan'dan bayramdan önceki güne kadar her gün. Başlangıç kendiliğinden 1 Ramazan olur; Ramazan başladıysa görev bugünden başlar.",
            "[[tx:fasting.kindMonThu]]: her hafta iki gün. Yarın başlar ve sen bitirene kadar sürer; istersen [[tx:compose.rowStart]] ve [[tx:fasting.rowEnd]] satırlarından tarih seçersin.",
            "[[tx:fasting.kindCustom]]: haftanın günlerini, başlangıcı ve bitişi sen seçersin.",
          ],
          fark: "Üstteki önizleme seçtiğin orucu hemen gösterir: Ramazan'da kaç gün, haftalık oruçta haftada kaç gün.",
          ipucu: "Bayram günleri kendiliğinden atlanır.",
          sahne: "oruc-tur",
        },
        {
          baslik: "Kimin neyi göreceğini seç",
          metin: [
            "[[tx:compose.rowVisibility]] satırına dokun:",
          ],
          liste: [
            "[[tx:practice.visibilityMutual]]: göreve katılan herkes birbirinin işaretlediği günleri görür. Yakın aile ve arkadaş halkaları için.",
            "[[tx:practice.visibilityAdmin]]: işaretleri yalnız halka yöneticisi görür, katılanlar birbirini görmez.",
            "[[tx:fasting.visibilityTotal]]: kimin tuttuğunu kimse görmez, yönetici de. Halkada yalnız toplam gün sayısı görünür.",
          ],
          ipucu: "[[tx:fasting.rowDuaTurn]] açık gelir: her oruç günü halkadan bir isim çıkar, iftarda o kişiyi duanda anarsın. [[tx:practice.visibilityAdmin]] seçersen [[tx:wizard.observerModeTitle]] da açılabilir: görev sana verilmez, halkayı izlersin.",
          sahne: "oruc-gorunurluk",
        },
        {
          baslik: "Görevi başlat",
          metin: "Görev adı seçimine göre kendiliğinden yazılır, örneğin “Ramazan orucu”; istersen değiştir. [[compose.startTask]] düğmesine dokun. Görev halka ekranında [[tx:practice.sectionPractices]] başlığının altına eklenir ve halkadaki herkesin listesine düşer.",
          fark: "Kimse kendiliğinden katılmaz: her üye katılırken neyin görüneceğini okuyup onaylar.",
          sahne: "oruc-baslat",
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Halkadaki herkes", baslik: "Katıl ve orucunu işaretle",
      giris: "Oruç günlerinde görev [[tx:tabs.home]] sekmesindeki [[tx:dashboard.myTasks]] bölümünde görünür; halka ekranında da [[tx:practice.sectionPractices]] altında durur. Herkes kendi orucunu kendi işaretler.",
      adimlar: [
        {
          baslik: "Oruca katıl",
          metin: "Oruç kartına dokun; [[tx:fasting.joinCardTitle]] kartı çıkar. [[fasting.joinCta]] düğmesine dokununca açılan pencere bu görevde kimin neyi göreceğini yazar. [[tx:fasting.reminderRow]] açık gelir: oruçtan önceki akşam saat 21:00'de hatırlatma alırsın, saati sonra değiştirebilirsin. Sonra [[fasting.join]] de.",
          ipucu: "Katılmak istemiyorsan [[ol:practice.dismissAction]] ile kartı listenden kaldırırsın. Katıldıktan sonra da istediğin zaman [[ol:practice.leaveAction]] diyebilirsin; ayrılınca işaretlerin silinir.",
          sahne: "oruc-katil",
        },
        {
          baslik: "İftarda Orucumu tuttum de",
          metin: "Gün içinde ekran iftara kalan süreyi gösterir; [[fasting.markDone]] düğmesi iftar girince açılır. İftar vakti gelince ekranda iftar duası çıkar. [[fasting.markDone]] düğmesine dokun; ekran [[tx:fasting.accepted]] der ve günün tanesi dolar. Yanlışlıkla dokunduysan [[ol:fasting.undo]] de.",
          ipucu: "İftar vakti uygulamada seçili şehrine göre hesaplanır. Şehir seçili değilse düğme gün boyu açıktır.",
          sahne: "oruc-isaretle",
        },
        {
          baslik: "Unuttuğun günü işaretle, birlikte yürüyenleri gör",
          metin: [
            "[[tx:fasting.duaLabel]] kartında o akşam duanda anacağın kardeşinin adı yazar. Altında [[tx:fasting.myDays]] durur: işaretlemeyi unuttuğun güne dokunarak sonradan işaretlersin.",
            "[[tx:practice.visibilityMutual]] seçilmiş bir görevde [[tx:fasting.together]] listesinde kimin hangi günleri işaretlediği görünür. Bir kardeşinin yanındaki [[fasting.accepted]] düğmesiyle ona [[tx:fasting.accepted]] dersin.",
          ],
          fark: "Boş kalan günün sebebi sorulmaz, kimseye bildirim gitmez.",
          sahne: "oruc-birlikte",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Halkada hangi oruçlar için görev kurulur?",
        c: "Üç tür var: Ramazan orucu (1 Ramazan'dan bayramdan önceki güne kadar her gün), pazartesi ve perşembe orucu ya da günlerini kendin seçtiğin bir oruç. Bayram günleri kendiliğinden atlanır." },
      { s: "Kim hangi günleri görür?",
        c: "Görevi kuran seçer. [[tx:practice.visibilityMutual]] seçilirse katılan herkes birbirinin günlerini görür; [[tx:practice.visibilityAdmin]] seçilirse yalnız halka yöneticisi görür; [[tx:fasting.visibilityTotal]] seçilirse kimin tuttuğunu kimse görmez, halkada yalnız toplam gün sayısı görünür. Başlayan 4 kişiden azsa toplam da gizlenir. Her üye katılmadan önce bunu okur." },
      { s: "Orucu tutamadığım gün ne olur?",
        c: "Gün boş kalır. Sebep sorulmaz, kimseye bildirim gitmez. Kaza oruçlarını ayrıca takip etmek istersen oruç ekranının altındaki [[tx:kaza.titleO]] girişini kullanabilirsin; o sayaç yalnız senindir: [Kaza namazı ve orucu](/tr/rehber/kaza-namazi-ve-orucu/)." },
      { s: "Hatırlatma gelir mi?",
        c: "Katılırken açık gelir: oruçtan önceki akşam saat 21:00'de. Saati oruç ekranından değiştirir ya da kapatırsın. Ramazan orucunda hatırlatma yalnız ilk gece gelir." },
      { s: "Ücretli mi?",
        c: "Oruç görevine katılmak ücretsizdir. Ramazan orucu görevi ücretsiz plandaki sınıra takılmaz. Pazartesi ve perşembe ya da kendi seçtiğin günler için kurulan görev, ücretsiz planda aynı anda açabileceğin üç ortak amelden biri sayılır." },
      { s: "Uygulama orucumun geçerli olup olmadığını söyler mi?",
        c: "Hayır. Uygulama yalnız işaretlediğin günleri tutar, dini hüküm vermez. Oruçla ilgili soruların için [Din İşleri Yüksek Kurulu](https://kurul.diyanet.gov.tr/) sayfasına bakabilirsin." },
    ],
  },

  ilgili: ["hatim", "kaza", "tek"],
  kart: { kicker: "Oruç", baslik: "Halkada oruç görevi", metin: "Ramazan ya da pazartesi ve perşembe: herkes kendi orucunu iftarda işaretler, halka birlikte yürür." },
  onizleme: { sahne: "oruc-kart", adim: 0 },
  cta: { baslik: "Halkanı bugün kur", metin: "Halka kurmak ve katılmak ücretsiz. İndir, halkanı kur, oruç görevini başlat." },
};
