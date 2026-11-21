// Herkese açık haftalık Kur'an halkası (TR). Uygulamada adı bigCircle.title ("Büyük Halka"); başlıklarda bu ad KULLANILMAZ,
// metinde kullanıcının ekranda gördüğü ad olarak geçebilir. Akış: app/buyuk-halka.tsx, components/bigCircle/*, lib/bigCircle*.ts.
// Düğme adları [[anahtar]] ile uygulamadan gelir; metinde uzun tire yok, Cevşen yok, fiyat yok.
export default {
  title: "Online hatme katıl: herkese açık haftalık Kur'an halkası",
  desc: "Herkese açık haftalık Kur'an halkasına katıl: her hafta bir sayfa oku, ortak hatme katkın eklensin. Üye listesi yok, yalnız halkanın toplamı görünür.",
  h1: "Herkese açık haftalık Kur'an halkasına nasıl katılırsın?",
  crumb: "Haftalık Kur'an halkası",
  eyebrow: "Adım adım rehber",
  lead: "Kendi halkan olmasa da bir hatme ortak olabilirsin. Manevi Halka'daki herkese açık halkada her hafta sana bir sayfa düşer: okursun, işaretlersin. Senin sayfaların başkalarının sayfalarıyla birleşir ve hatimler tamamlanır. Uygulamada bu halkanın adı Büyük Halka.",
  meta: ["Haftada yaklaşık 3 dakika", "Adın sorulmaz", "Ücretsiz"],
  film: { sahne: "film-buyuk", cap: "Katılmaktan ilk sayfaya: davet kartı, kısa tanıtım, oku ve işaretle." },

  kisa: {
    maddeler: [
      "[[tabs.circles]] sekmesindeki [[tx:bigCircle.title]] kartında [[bigCircle.join]] düğmesine dokun.",
      "Üç sayfalık kısa tanıtımı geç ve [[bigCircle.storyJoin]] de. Adın sorulmaz.",
      "Her hafta sana 1 sayfa düşer; [[tx:bigCircle.taskKicker]] kartında hangi sayfa olduğunu görürsün.",
      "[[bigCircle.read]] ile sayfan Kur'an'da açılır. Okuyunca [[hatim.markRead]] de.",
      "Her Cuma yeni hafta başlar. Okuyamadığın pay kendiliğinden halkaya döner, borç kalmaz.",
      "⋮ menüsünden payını 2, 5 ya da 10 sayfaya çıkarabilir, hatırlatmayı kapatabilir ya da halkadan ayrılabilirsin.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "katil", baslik: "Halkaya katıl",
      giris: "Bu, herkese açık bir Kur'an halkasıdır: farklı şehirlerden, farklı dillerden kardeşler aynı hatmi birlikte okur. Katılmak için davet linki ya da kod gerekmez.",
      adimlar: [
        {
          baslik: "Halkalar sekmesindeki davet kartını bul",
          metin: [
            "Alttaki çubukta [[tabs.circles]] sekmesine dokun. Henüz bir halkan yoksa en üstte [[tx:bigCircle.forEveryone]] yazan büyük kart durur; bu hafta halkada kaç sayfa okunduğu da orada yazar. [[bigCircle.join]] düğmesine dokun.",
            "Bir halkan varsa aynı giriş, halkalarının üstünde ince bir şerit olarak durur.",
          ],
          ipucu: "Kartı Halkalar'dan kaldırdıysan [[tabs.read]] sekmesinin [[tx:read.globalTab]] bölümünde bir satır olarak yine bulursun; oradan [[tx:bigCircleCard.restore]] ile geri getirirsin.",
          sahne: "buyuk-bul",
        },
        {
          baslik: "Kısa tanıtımı geç ve katıl",
          metin: [
            "İlk açışta üç sayfalık kısa bir tanıtım gelir: halka herkese açık, payın küçük, toplamı büyük. [[bigCircle.storyNext]] ile ilerle, son sayfada [[bigCircle.storyJoin]] düğmesine dokun.",
            "Katılırken adın sorulmaz. Katıldığın anda bu haftanın payı hazırdır.",
          ],
          ipucu: "Tanıtımı yeniden izlemek istersen halka ekranının sağ üstündeki yuvarlak simgeye dokun.",
          sahne: "buyuk-katil",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", baslik: "Haftalık payını oku",
      giris: "Her Cuma yeni bir hafta başlar ve sana bir sayfa düşer. Payın birkaç dakikalık bir okumadır; ne zaman okuyacağını sen seçersin.",
      adimlar: [
        {
          baslik: "Bu haftaki görevini gör",
          metin: [
            "Payın [[tabs.home]] sekmesindeki [[tx:dashboard.myTasks]] bölümünde bir kart olarak durur: hangi sayfa ve Cuma'ya kaç gün kaldığı. Karta dokununca halkanın ekranı açılır.",
            "Ekranın üstündeki [[tx:bigCircle.taskKicker]] kartında ne yapacağın tek cümleyle yazar, örneğin “1 sayfa oku”; altında sayfa numarası, sure adı ve yaklaşık süre.",
          ],
          sahne: "buyuk-gorev",
        },
        {
          baslik: "Oku ve işaretle",
          metin: [
            "[[bigCircle.read]] düğmesine dokun; Kur'an senin sayfanda açılır. Sayfanın sonunda altta [[hatim.markRead]] düğmesi belirir. Ona dokun ve çıkan soruda bir kez daha [[hatim.markRead]] de.",
            "Halkanın ekranına döndüğünde görev kartı [[tx:bigCircle.doneTitle]] kartına döner: katkın hatme eklenmiştir.",
          ],
          ipucu: "Basılı bir mushaftan okuduysan Kur'an'ı açmadan görev kartındaki [[ol:bigCircle.markRead]] düğmesine dokunman yeter.",
          sahne: "buyuk-oku",
        },
        {
          baslik: "Hatmin ilerlemesini izle",
          metin: "Ekranın aşağısında hatmin halkası durur: kaçıncı hatim olduğu, yüzde kaçının okunduğu ve bu hafta halkada kaç sayfa okunduğu. Bu, uygulamadaki Ortak Okuma ile aynı hatimdir. [[tx:bigCircle.doneTitle]] kartında bu hatimde senin kaç sayfan olduğu da yazar.",
          fark: "Üye listesi, sıralama ya da rozet yok; yalnız halkanın toplamı görünür. Kimin ne okuduğu değil, birlikte tamamlanan hatim öne çıkar.",
          ipucu: "[[tx:bigCircle.dhikrTitle]] isteğe bağlıdır: halkanın ortak sayacına zikir eklersin, her Cuma yenilenir. İstemezsen ⋮ menüsünden gizlersin.",
          sahne: "buyuk-ilerleme",
        },
      ],
    },
    {
      tur: "bolum", id: "ayarlar", baslik: "Payını ve hatırlatmayı ayarla",
      giris: "Halkanın ekranındaki ⋮ menüsünden payını, hatırlatmayı ve haftanın zikrini ayarlarsın; istersen halkadan buradan ayrılırsın.",
      adimlar: [
        {
          baslik: "Payını büyüt ya da küçült",
          metin: "Sağ üstteki ⋮ simgesine dokun. [[tx:bigCircle.menuShare]] altında 1, 2, 5 ya da 10 sayfa seçersin; görev kartındaki [[ol:bigCircle.changeShare]] bağlantısı da aynı menüyü açar. Değişiklik gelecek haftadan geçerlidir.",
          ipucu: "Payın 1 sayfayken üç hafta üst üste okursan uygulama bir kez, sessizce gelecek hafta 2 sayfa okumayı önerir. İstemezsen kapatırsın, bir daha sorulmaz.",
          sahne: "buyuk-pay",
        },
        {
          baslik: "Perşembe akşamı hatırlatması",
          metin: [
            "Payın okunmadıysa Perşembe akşamı saat 20.00'de tek bir hatırlatma gelir. Okuduysan gelmez.",
            "İlk katıldığında uygulama bunun için bildirim izni ister. Hatırlatmayı ⋮ menüsündeki [[tx:bigCircle.menuReminder]] anahtarıyla kapatıp açarsın.",
          ],
          sahne: "buyuk-hatirlat",
        },
        {
          baslik: "Halkadan ayrıl",
          metin: "⋮ menüsünün en altındaki [[tx:bigCircle.menuLeave]] satırına dokun. Pencere bu haftaki payından okuduğun sayfa olup olmadığını sorar: okuduğunu işaretle, kalanı hemen halkaya döner ve başka bir kardeş okur. [[bigCircle.leaveConfirm]] dediğinde sana yeni sayfa verilmez.",
          ipucu: "Dilediğin zaman aynı ekrandaki [[bigCircle.rejoin]] düğmesiyle geri dönersin.",
          sahne: "buyuk-ayril",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Bu halkada kimler var, üyeleri görebilir miyim?",
        c: "Bu halkada üye listesi yok; yalnız toplam sayılar görünür: bu hafta okunan sayfalar ve tamamlanan hatimler. Katılırken adın da sorulmaz." },
      { s: "Bir hafta okuyamazsam ne olur?",
        c: "Hafta bitince payın kendiliğinden halkaya döner ve başka bir kardeş okur; borç kalmaz. İki hafta üst üste okunmazsa uygulama bir kez [[tx:bigCircle.continueTitle]] diye sorar: devam edebilir, bir süre ara verebilir ya da payın 1 sayfadan büyükse 1 sayfaya indirebilirsin." },
      { s: "Hafta ne zaman başlar?",
        c: "Her Cuma, kendi saatinle gece yarısı. Haftanın bitmesine iki günden az kala katılırsan gelecek haftanın payı hemen gelir; istersen hemen okuyabilirsin." },
      { s: "Bu hangi hatim?",
        c: "Uygulamadaki [Ortak Okuma](/tr/ortak-okuma/) ile aynı hatim. Senin sayfaların oradaki okumalarla birleşir; bir hatim bitince sıradaki başlar." },
      { s: "Payımı artırabilir miyim?",
        c: "Evet. ⋮ menüsünde haftada 1, 2, 5 ya da 10 sayfa seçersin; değişiklik gelecek haftadan geçerlidir. Bir sayfa yaklaşık 2-3 dakika sürer." },
      { s: "Ücretli mi?",
        c: "Katılmak ve okumak ücretsiz." },
    ],
  },

  ilgili: ["hatim", "katil", "video"],
  kart: { kicker: "Kur'an", baslik: "Haftalık Kur'an halkası", metin: "Herkese açık halkaya katıl, haftada bir sayfayla ortak hatme ortak ol." },
  onizleme: { sahne: "buyuk-kart", adim: 0 },
  cta: { baslik: "Haftalık halkaya katıl", metin: "Manevi Halka'yı ücretsiz indir, Halkalar sekmesinden katıl, ilk sayfanı bu hafta oku." },
};
