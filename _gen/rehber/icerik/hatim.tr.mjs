// P1 · Hatim grubu kurma ve cüz dağıtma (TR). Biçim: _gen/build-rehber.mjs başındaki açıklama.
// Düğme adları [[anahtar]] ile uygulamadan gelir; metinde uzun tire yok, Cevşen yok.
export default {
  title: "Hatim grubu nasıl kurulur? Cüz dağıtma adım adım",
  desc: "Ailen ya da cemaatinle hatim grubu kur: cüzler kişilere otomatik dağıtılır, sayfalar uygulamada okunur, her tur sonunda yenileri kendiliğinden atanır.",
  h1: "Hatim grubu nasıl kurulur, cüzler nasıl dağıtılır?",
  crumb: "Hatim grubu kurma",
  eyebrow: "Adım adım rehber",
  lead: "Önce bir halka kurarsın, yani ailen ya da cemaatin için bir grup. Sonra bu halkada bir hatim başlatırsın. Kimin hangi cüzü okuyacağını uygulama dağıtır; hafta dolunca sıradaki cüzler kendiliğinden gelir.",
  meta: ["Kurulum yaklaşık 2 dakika", "E-posta ve şifre istemez", "Ücretsiz"],
  film: { sahne: "film-hatim", cap: "Baştan sona tek akış: halkayı kur, Kur'an'ı seç, başlat." },

  kisa: {
    maddeler: [
      "Uygulamada [[tabs.circles]] sekmesine gir, [[circlesTab.anonCreate]] düğmesine dokun. Adını ve halkanın adını yazıp [[createGroup.create]] de.",
      "[[group.welcome.step1Btn]] düğmesine dokun ve linki ailene ya da WhatsApp grubunuza gönder. Linke dokunan kişi [[joinGroup.join]] der ve halkaya katılır.",
      "Herkes katılınca [[group.welcome.step2Btn]] düğmesine dokun ve [[tx:wizard.goalQuran]] kartını seç.",
      "Cüz hatmi, tam hatim, haftada bir tur ve kişi başı 1 cüz hazır gelir. Üç kez [[wizard.continue]] de.",
      "Göreve bir ad ver, kimin hangi cüzden başlayacağını önizlemede gör ve [[wizard.startCircle]] düğmesine dokun.",
      "Herkes kendi cüzünü okuyup işaretler. Hafta dolunca sıradaki cüzler kendiliğinden dağıtılır.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "halka", rol: "Halkayı kuran kişi", baslik: "Halkanı kur",
      giris: "Halka, birlikte ibadet ettiğin topluluktur: ailen, arkadaşların ya da caminin cemaati. Hatim bu halkanın içinde kurulur.",
      adimlar: [
        {
          baslik: "Halkalar sekmesinden yeni bir halka başlat",
          metin: [
            "Uygulamayı aç, alttaki çubukta [[tabs.circles]] sekmesine dokun. Ekrandaki [[circlesTab.anonCreate]] düğmesine bas.",
            "İlk kez halka kuruyorsan uygulama yalnız adını sorar. Halkadaki kardeşlerin seni bu adla görür. E-posta, şifre ya da telefon numarası istenmez.",
          ],
          ipucu: "Ekranda bu düğmeyi görmüyorsan, yani daha önce bir halkaya katıldıysan ya da halka kurduysan, sağ üstteki **+** düğmesine dokun ve açılan pencerede [[tx:dashboard.createNew]] seçeneğini seç. Ücretsiz hesapla aynı anda kendi kurduğun bir halkayı yönetebilirsin.",
          sahne: "halka-kur",
        },
        {
          baslik: "Halkana bir ad ver",
          metin: [
            "[[tx:createGroup.groupName]] kutusuna bir ad yaz, örneğin “Ailem” ya da “Cuma Kardeşleri”. Açıklama isteğe bağlıdır. Sonra [[createGroup.create]] düğmesine dokun.",
            "Hesabını henüz bağlamadıysan ilk halkanda bir kez [[tx:secureNudge.title]] penceresi çıkar. Apple, Google ya da e-postayla bağlarsan telefonun değişse de halkan kaybolmaz. İstersen [[ol:secureNudge.later]] deyip geçebilirsin.",
          ],
          ipucu: "[[tx:createGroup.detailedTrackingTitle]] yalnız kurarken seçilir. Açarsan yönetici olarak üyelerin günlük ilerlemesini görürsün, üyeler görmez.",
          sahne: "halka-form",
        },
        {
          baslik: "Kardeşlerini davet et",
          metin: "Halka ekranında [[tx:group.welcome.title]] kartı çıkar. [[group.welcome.step1Btn]] düğmesine dokun ve linki WhatsApp grubunuza, ailene ya da istediğin kişiye gönder. Linke dokunan kişinin telefonunda halkanın davet kartı açılır; [[joinGroup.join]] düğmesine dokununca halkaya katılır. Link uygulama yerine tarayıcıda açılırsa sayfadaki **Uygulamayı Aç** düğmesine dokunur.",
          fark: "WhatsApp grubunuz kalsın. Linki oraya at; kimin hangi cüzü okuduğunu uygulama tutar.",
          ipucu: "Önce davet et, sonra hatmi başlat. Cüzler, hatmi başlattığın anda halkada olanlara dağıtılır; sonradan katılan bir sonraki turda pay alır.",
          sahne: "davet-paylas",
        },
        {
          baslik: "İstersen kodla ya da QR ile davet et",
          metin: [
            "Halka ekranının sağ üstündeki üç simgeden ortadakine, artı işaretli kişi simgesine dokunursan [[tx:group.inviteToCircle]] penceresi açılır: altı karakterlik kısa kod, davet linki ve QR kod. Kodu telefonda söyleyebilir, QR kodu camide ekrana yansıtabilirsin.",
            "Uygulaması olmayan kişi linke dokununca açılan sayfadan uygulamayı indirir. Sonra [[tabs.circles]] sekmesindeki [[ol:circlesTab.anonJoin]] düğmesine dokunur, davet linkini ya da kodu yapıştırıp katılır. Ayrıntılar: [Davetle halkaya katılma](/tr/rehber/halkaya-katilma/).",
          ],
          sahne: "davet-penceresi",
        },
      ],
    },
    {
      tur: "bolum", id: "hatim", rol: "Halkayı kuran kişi", baslik: "Hatmi başlat",
      giris: "Hatim, halkanın içindeki bir görevdir. Aynı halkada bir hatim, bir zikir ya da bir kitap okuması birlikte durabilir.",
      adimlar: [
        {
          baslik: "Görev oluştur ve Kur'an'ı seç",
          metin: "Kardeşlerin katılınca [[tx:group.welcome.title]] kartındaki [[group.welcome.step2Btn]] düğmesine dokun. Sağ alttaki yuvarlak **+** düğmesi de aynı ekranı açar. Açılan ekranda [[tx:wizard.goalQuran]] kartını seç.",
          sahne: "gorev-olustur",
        },
        {
          baslik: "Hazır gelen ayarlarla üç kez Devam de",
          metin: "Ayarlar en çok kullanılan hatim için hazır gelir. Değiştirmen gerekmiyorsa üç kez [[wizard.continue]] de:",
          liste: [
            "[[tx:wizard.targetJuz]] ve [[tx:wizard.fullHatim]]: 30 cüz halkaya paylaştırılır.",
            "[[tx:wizard.week]]: her hafta yeni bir tur başlar. İstersen [[tx:wizard.day]] seç; o zaman her gün yeni bir tur başlar.",
            "Kişi başı 1 cüz: 5 kişilik bir halkada her hafta 5 cüz okunur ve hatim yaklaşık 6 haftada biter. Halkada 30 kişi varsa bir haftada biter.",
          ],
          fark: "Ekranın altındaki özet, hatmin yaklaşık ne kadar süreceğini sen ayarları değiştirdikçe hesaplar.",
          ipucu: "Halkayı yönetmek ama kendin cüz almamak istersen tur sıklığını seçtiğin ekrandaki [[tx:wizard.observerModeTitle]] anahtarını aç. Bu ekranın üstünde **Adım 3 / 5** yazar.",
          sahne: "uc-devam",
        },
        {
          baslik: "Göreve bir ad ver ve başlat",
          metin: "[[tx:wizard.circleTitle]] kutusuna bir ad yaz, örneğin “Aile Hatmi”. Altındaki önizlemede kimin hangi cüzden başlayacağını görürsün. [[wizard.startCircle]] düğmesine dokun. Herkesin cüzü o anda kendi ekranına düşer.",
          fark: "Kimin hangi cüzü okuyacağını sen hesaplamazsın; uygulama halkadaki sıraya göre dağıtır.",
          ipucu: "[[tx:wizard.autoAdvanceTitle]] açık gelir: tur süresi dolunca yeni tur kendiliğinden başlar. Turlar senin saat dilimine göre gece yarısı değişir; ekranda bunu “Turlar İstanbul saatine göre işler.” gibi bir satır söyler.",
          sahne: "gorevi-baslat",
        },
      ],
    },
    {
      tur: "halka",
      baslik: "Turlar böyle ilerler",
      metin: [
        "Tur bitince sıradaki cüzler kendiliğinden dağıtılır, hatim kaldığı yerden sürer. Beş kişilik bir halkada ilk hafta 1–5. cüzler, ikinci hafta 6–10. cüzler okunur. Altıncı haftanın sonunda hatim tamamlanır ve halka yeni hatme aynı düzenle devam eder.",
        "Okunamayan cüz silinmez: bir sonraki turda **emanet** olarak aynı kişide kalır. Her hafta yeniden liste yazman gerekmez.",
      ],
    },
    {
      tur: "bolum", id: "oku", rol: "Halkadaki herkes", baslik: "Cüzünü oku",
      giris: "Halkaya katılan herkes kendi payını kendi yerinde, kendi vaktinde okur.",
      adimlar: [
        {
          baslik: "Bildirime ya da Ana Sayfa'daki karta dokun",
          metin: "Yeni tur başlayınca telefonuna bildirim gelir; dokununca görev ekranın açılır. Uygulamayı kendin açtıysan [[tx:tabs.home]] sekmesindeki [[tx:dashboard.myTasks]] bölümünde hatim kartına dokun: halkanın adı, sana düşen cüz ve kalan gün orada yazar.",
          ipucu: "Gece başlayan bir turun bildirimi seni gece rahatsız etmez, sabah gelir.",
          sahne: "uye-bildirim",
        },
        {
          baslik: "Okumaya Başla, bitince Okudum",
          metin: [
            "[[quran.startReading]] düğmesine dokun. Kur'an, sana düşen ilk sayfada açılır; üstteki ince çizgi ne kadarını okuduğunu gösterir. Son sayfaya gelince altta [[hatim.markRead]] düğmesi belirir. Ona dokun; çıkan pencerede bir kez daha [[hatim.markRead]] de. Payın tamamlanır ve görev ekranına dönersin.",
            "Görev kartı [[tx:taskDone.title]] kartına döner. Halkada kaç kişinin bitirdiğini orada görürsün.",
          ],
          fark: "Mushaf aramana gerek yok: sana düşen sayfalar uygulamada açılır.",
          ipucu: "Basılı mushaftan okuduysan görev ekranındaki [[flow.complete]] düğmesine dokun. Okuduğun bölümleri işaretlemediysen çıkan soruya [[common.yes]] de.",
          sahne: "uye-oku",
        },
      ],
    },
    {
      tur: "ikili", id: "yetisemezsen", rol: "Halkadaki herkes", baslik: "Yetişemeyen olursa",
      giris: "Herkesin haftası aynı geçmez. Payını bitiremeyecek olan halkayı bekletmez; diğerleri yardım eder.",
      kartlar: [
        { baslik: "Yardım iste", metin: "Görev kartının altındaki [[ol:flow.askHelp]] düğmesine dokun. Kaç sayfasını kendin okuyacağını yaz ve penceredeki [[flow.askHelp]] düğmesine dokun. Kalan sayfalar halkadakilere [[tx:flow.waitingForHelpTitle]] listesinde görünür.", sahne: "yardim-iste" },
        { baslik: "Yardım et", metin: "Görev ekranının [[tx:flow.tabCircle]] sekmesinde yardım bekleyenleri görürsün. [[flow.helpTitle]] düğmesine dokun ve açılan pencerede ne kadarını alacağını seç. Aldığın sayfalar senin ekranına düşer.", sahne: "yardim-et" },
      ],
      not: "Payını tamamen bırakman gerekirse [[ol:flow.excuse]] düğmesiyle havuza bırakabilirsin; isteyen oradan alır. Bu adım geri alınamaz.",
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Uygulamada böyle görünür",
      giris: "Bu kareler uygulamanın kendisinden.",
      kareler: [
        { img: "n01-halka", alt: "Halka ekranı: Okumalar sekmesinde görevler ve sağ altta yuvarlak + düğmesi", cap: "Halka ekranı: görevler ve sağ alttaki **+** düğmesi" },
        { img: "n02c-wizard-adim3", alt: "Hedef kurma ekranı: Ne sıklıkta tur atanacak, 1 Hafta seçili", cap: "Hedef kurarken tur sıklığı" },
        { img: "h01-home", alt: "Ana Sayfa: Görevlerin bölümünde halka görevleri", cap: "Ana Sayfa: senin görevlerin" },
        { img: "n04-yonet", alt: "Hatim ekranı, Halka sekmesi: yardım bekleyen ve kimin hangi cüzde olduğu", cap: "Hatimde kim hangi cüzde" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Cüzler nasıl dağıtılıyor, kime hangisi düşüyor?",
        c: "Uygulama halkadaki sıraya göre dağıtır: ilk kişiye 1. cüz, ikinciye 2. cüz ve böyle devam eder. Hatmi başlatmadan önce son ekranda bu listeyi görürsün. Sonraki turda sıradaki cüzler aynı sırayla dağıtılır: 5 kişilik bir halkada ikinci tur 6–10. cüzlerle devam eder." },
      { s: "Hafta dolunca ne olur?",
        c: "**Otomatik tur ilerletme** açıksa (açık gelir) yeni tur, halkanın saat diliminde gece yarısı kendiliğinden başlar ve sıradaki cüzler dağıtılır. Kapatırsan yeni turu sen başlatırsın." },
      { s: "Biri cüzünü okuyamazsa ne olur?",
        c: "Okunmayan pay kaybolmaz, bir sonraki turda **emanet** olarak o kişide kalır. İsterse **Yardım İste** ile bir kısmını halkaya bırakır ya da **Mazeret** ile tamamını havuza devreder; diğerleri **Yardım Et** ya da **Al** ile üstlenir." },
      { s: "WhatsApp grubumuz var, yine de gerekir mi?",
        c: "Grubunuz kalsın. Davet linkini gruba at; listeyi, kimin okuduğunu ve hatırlatmayı uygulama tutar. Her hafta yeni liste yazman gerekmez. Listeyi yine de kâğıtta tutmak istersen [yazdırılabilir hatim çizelgesini](/tr/hatim-cizelgesi/) kullanabilirsin." },
      { s: "Uygulaması olmayan bir aile büyüğü katılabilir mi?",
        c: "Düzenli halkada yönetici, uygulaması olmayan birini **misafir** olarak ekleyebilir; onun okumasını sorumlu bir kişi işaretler. Tek seferlik bir hatimde **Ortak havuz** seçilirse uygulaması olmayanlar davet linkinden tarayıcıyla cüz alabilir: [Tek seferlik halka](/tr/rehber/tek-seferlik-halka/)." },
      { s: "Ücretli mi?",
        c: "Halka kurmak, hatim başlatmak ve halkaya katılmak ücretsizdir. Ücretsiz hesapla aynı anda kendi kurduğun bir halkayı yönetebilirsin; başkalarının halkalarına katılmanın sınırı yoktur." },
      { s: "Cüz dağıtılarak hatim yapılır mı?",
        c: "Bu soruyu Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu cevaplamış. Kurul, cüzler kişilere dağıtılarak hatim yapılabileceğini söylüyor. [Kurulun cevabını oku](https://kurul.diyanet.gov.tr/Cevap-Ara/1112/cuz-dagitilarak-hatim-yapilmasi-mumkun-mudur-dagitilan-cuzlerin-bir-kisminin-hatim-duasindan-sonra-okunmus-olmasi-halinde-hatim-gecerli-midir)." },
    ],
  },

  ilgili: ["tek", "zikir", "katil"],
  kart: { kicker: "Hatim", baslik: "Hatim grubu kurma", metin: "Halkanı kur, 30 cüzü paylaştır; turlar kendiliğinden ilerlesin." },
  onizleme: { sahne: "gorevi-baslat", adim: 3 },
  cta: { baslik: "Halkanı bugün kur", metin: "Halka kurmak ve katılmak ücretsiz. İndir, halkanı kur, davet linkini paylaş." },
};
