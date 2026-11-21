// P1 · Hatim grubu kurma ve cüz dağıtma (TR), 2.1.0 ekranlarına göre (21 Kas 2026). Biçim: _gen/build-rehber.mjs başındaki açıklama.
// Düğme adları [[anahtar]] ile uygulamadan gelir; metinde uzun tire yok, Cevşen yok.
export default {
  title: "Hatim grubu nasıl kurulur? Cüz dağıtma adım adım",
  desc: "Ailen ya da cemaatinle hatim grubu kur: cüzler sırayla dağıtılır, kimin ne okuyacağını önceden görürsün, her tur sonunda yenileri kendiliğinden atanır.",
  h1: "Hatim grubu nasıl kurulur, cüzler nasıl dağıtılır?",
  crumb: "Hatim grubu kurma",
  eyebrow: "Adım adım rehber",
  lead: "Önce bir halka kurarsın, yani ailen ya da cemaatin için bir grup. Sonra bu halkada bir Kur'an hatmi başlatırsın. Kimin hangi cüzü okuyacağını uygulama dağıtır, sen de başlatmadan önce görürsün. Hafta dolunca sıradaki cüzler kendiliğinden gelir.",
  meta: ["Kurulum yaklaşık 2 dakika", "E-posta ve şifre istemez", "Ücretsiz"],
  film: { sahne: "film-hatim", cap: "Baştan sona tek akış: halkayı kur, Kur'an hatmini seç, başlat." },

  kisa: {
    maddeler: [
      "Uygulamada [[tabs.circles]] sekmesine gir, [[circlesTab.anonCreate]] düğmesine dokun. Adını ve halkanın adını yazıp [[createGroup.create]] de.",
      "[[group.welcome.step1Btn]] düğmesine dokun ve linki ailene ya da WhatsApp grubunuza gönder. Linke dokunan kişi [[joinGroup.join]] der ve halkaya katılır.",
      "Herkes katılınca halka ekranında [[group.addTask]] düğmesine dokun ve [[tx:compose.typeHatim]] kartını seç.",
      "Her hafta yeni tur ve kişi başı 1 cüz hazır gelir. Üstteki önizleme hatmin ne kadar süreceğini ve ilk turda kimin ne okuyacağını gösterir.",
      "İstersen [[ol:dist.openCreate]] ile sırayı değiştir, sonra [[compose.startTask]] düğmesine dokun.",
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
            "Halka ekranı açılır: üstte üye şeridi, altında [[tx:group.welcome.title]] kartı.",
          ],
          ipucu: "[[tx:createGroup.detailedTrackingTitle]] yalnız kurarken seçilir. Açarsan yönetici olarak üyelerin günlük ilerlemesini görürsün, üyeler görmez.",
          sahne: "halka-form",
        },
        {
          baslik: "Kardeşlerini davet et",
          metin: "[[tx:group.welcome.title]] kartındaki [[group.welcome.step1Btn]] düğmesine dokun ve linki WhatsApp grubunuza, ailene ya da istediğin kişiye gönder. Linke dokunan kişinin telefonunda halkanın davet kartı açılır; [[joinGroup.join]] düğmesine dokununca halkaya katılır. Link uygulama yerine tarayıcıda açılırsa sayfadaki **Uygulamayı Aç** düğmesine dokunur.",
          fark: "WhatsApp grubunuz kalsın. Linki oraya at; kimin hangi cüzü okuduğunu uygulama tutar.",
          ipucu: "Önce davet et, sonra hatmi başlat. Cüzler, görevi başlattığın anda halkada olanlara dağıtılır; sonradan katılan bir sonraki turda sıraya girer.",
          sahne: "davet-paylas",
        },
        {
          baslik: "İstersen kodla ya da QR ile davet et",
          metin: [
            "Halka adının altındaki üye şeridinde [[group.inviteShort]] düğmesine dokunursan [[tx:group.inviteToCircle]] penceresi açılır: altı karakterlik kısa kod, davet linki ve QR kod. Kodu telefonda söyleyebilir, QR kodu camide ekrana yansıtabilirsin.",
            "Uygulaması olmayan kişi linke dokununca açılan sayfadan uygulamayı indirir. Sonra [[tabs.circles]] sekmesindeki [[ol:circlesTab.anonJoin]] düğmesine dokunur, davet linkini ya da kodu yapıştırıp katılır. Ayrıntılar: [Davetle halkaya katılma](/tr/rehber/halkaya-katilma/).",
          ],
          sahne: "davet-penceresi",
        },
      ],
    },
    {
      tur: "bolum", id: "hatim", rol: "Halkayı kuran kişi", baslik: "Hatmi başlat",
      giris: "Hatim, halkanın içindeki bir görevdir. Aynı halkada bir hatim, bir zikir ya da bir kitap okuması birlikte durabilir. Görev tek ekranda kurulur: üstte canlı bir önizleme, altında değiştirebileceğin satırlar.",
      adimlar: [
        {
          baslik: "Görev ekle ve Kur'an hatmini seç",
          metin: "Halka ekranında sağ alttaki [[group.addTask]] düğmesine dokun. [[tx:group.welcome.title]] kartındaki [[group.welcome.step2Btn]] düğmesi de aynı ekranı açar. [[tx:compose.pickTitle]] ekranında [[tx:compose.typeHatim]] kartına dokun.",
          ipucu: "[[tx:compose.quickStart]] satırındaki [[tx:compose.tplWeeklyHatim]] kartı da aynı ayarlarla açılır.",
          sahne: "hatim-sec",
        },
        {
          baslik: "Önizlemeye bak, gerekirse bir satırı değiştir",
          metin: [
            "Üstteki kart görevi daha başlamadan gösterir: her hafta yeni tur, kişi başı 1 cüz. Beş kişilik bir halkada hatim yaklaşık 6 haftada biter. Halkadaki dolu taneler ilk turda okunacak cüzlerdir, altın tane senin payındır. Altında ilk turda kimin hangi cüzü okuyacağı yazar.",
            "Bir satıra dokununca alt pencere açılır, seçimin önizlemeye hemen yansır:",
          ],
          liste: [
            "[[tx:compose.rowCadence]]: her gün, her hafta ya da başka bir aralık, örneğin 3 günde bir.",
            "[[tx:compose.rowPer]]: cüz cüz ya da sayfa sayfa, her turda ne kadar. Kişi başı 2 cüz seçersen hatim 3 haftada biter.",
            "[[tx:compose.rowWho]]: halkadaki herkes, halkadan seçtiğin kişiler ya da halkada isteyenler.",
          ],
          fark: "Hatmin ne kadar süreceğini sen hesaplamazsın; önizleme her değişiklikte yeniden yazar.",
          ipucu: "[[tx:compose.rowWhat]] ve [[tx:compose.rowHow]] satırlarındaki kilit, bu ikisinin görev başladıktan sonra değişmeyeceğini söyler. Tam hatim yerine belirli cüzleri de seçebilirsin.",
          sahne: "hatim-onizleme",
        },
        {
          baslik: "İstersen dağıtımı kontrol et",
          metin: "Önizlemedeki [[ol:dist.openCreate]] düğmesine dokun. Burada aralık değil sıra düzenlenir: iki kişiye sırayla dokununca yer değiştirirler, cüzler boşluksuz yeniden hesaplanır. Yavaş okuyana daha az, isteyene daha çok pay vermek için kişinin yanındaki eksi ve artıyı kullan. Bitince [[dist.confirm]] de; kart [[tx:dist.confirmed]] yazar.",
          ipucu: "[[tx:dist.rotateLabel]] kapalı gelir: sonraki tur kalınan yerden sürer. Açarsan her hatim bitince herkes bir sonraki bölüme geçer. Oranları yalnız sen görürsün; herkes kendi payını görür.",
          sahne: "hatim-dagitim",
        },
        {
          baslik: "Göreve bir ad ver ve başlat",
          metin: "[[tx:compose.nameLabel]] seçimlerine göre kendiliğinden yazılır, örneğin “Haftalık Hatim”. İstersen “Aile Hatmi” gibi kendi adını yaz. Sonra [[compose.startTask]] düğmesine dokun. [[tx:group.circleStartedTitle]] penceresi çıkar ve herkesin cüzü o anda kendi ekranına düşer; [[group.goToTaskScreen]] seni görev ekranına götürür.",
          fark: "Kimin hangi cüzü okuyacağını sen hesaplamazsın; uygulama halkadaki sıraya göre dağıtır.",
          ipucu: "[[tx:compose.more]] bölümünde başlangıç günü, [[tx:wizard.observerModeTitle]] (görev sana verilmez, halkayı izlersin) ve [[tx:wizard.autoAdvanceTitle]] durur. Otomatik tur açık gelir: tur süresi dolunca yeni tur kendiliğinden başlar. Turlar senin saatinle gece yarısı yenilenir.",
          sahne: "hatim-baslat",
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
      tur: "bolum", id: "sonraki-tur", rol: "Halkayı kuran kişi", baslik: "Sonraki turu ayarla",
      giris: "Hatim başladıktan sonra da sırayı ve payları değiştirebilirsin. Değişiklik bir sonraki turdan geçerli olur; bu turun payları olduğu gibi kalır.",
      adimlar: [
        {
          baslik: "Görev ekranının Halka sekmesinden değiştir",
          metin: "Görev ekranında [[tx:flow.tabCircle]] sekmesine geç. En üstte yalnız senin gördüğün [[tx:flow.observerInfoNextRoundLabel]] kartı durur: sonraki turun ne zaman başlayacağı ve kimin ne okuyacağı. [[nextRound.open]] düğmesine dokun. Açılan ekranda sırayı, oranları ya da [[tx:dist.rotateLabel]] anahtarını değiştir ve [[taskSettings.save]] de.",
          ipucu: "Başlıktaki dişli simgesi [[tx:taskSettings.title]] ekranını açar: aynı kurma ekranı, bu kez bir sonraki turu gösterir. Tur sıklığı, kişi başı miktar ve görevin adı orada değişir.",
          sahne: "sonraki-tur",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", rol: "Halkadaki herkes", baslik: "Cüzünü oku",
      giris: "Halkaya katılan herkes kendi payını kendi yerinde, kendi vaktinde okur.",
      adimlar: [
        {
          baslik: "Bildirime ya da Ana Sayfa'daki karta dokun",
          metin: "Yeni tur başlayınca telefonuna bildirim gelir; dokununca görev ekranın açılır. Uygulamayı kendin açtıysan [[tx:tabs.home]] sekmesindeki [[tx:dashboard.myTasks]] bölümünde hatim kartına dokun: halkanın adı, sana düşen cüz ve kalan gün orada yazar. Görev ekranının üstünde halkanın ilerlemesi ve turun bitmesine kalan süre görünür.",
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
        { baslik: "Yardım iste", metin: "Görev kartının altındaki [[ol:flow.askHelp]] düğmesine dokun ve kaç sayfası için yardım istediğini seç; yarısı hazır gelir. Pencere hangi sayfaların halkaya açılacağını, hangilerinin sende kalacağını yazar. [[flow.askHelp]] düğmesine dokununca o sayfalar halkadakilere [[tx:flow.waitingForHelpTitle]] listesinde görünür.", sahne: "yardim-iste" },
        { baslik: "Yardım et", metin: "Görev ekranının [[tx:flow.tabCircle]] sekmesinde yardım bekleyenleri görürsün. [[flow.helpTitle]] düğmesine dokun ve açılan pencerede ne kadarını alacağını seç. Aldığın sayfalar senin ekranına düşer.", sahne: "yardim-et" },
      ],
      not: "Payını tamamen bırakman gerekirse [[ol:flow.excuse]] düğmesiyle havuza bırakabilirsin; isteyen oradan alır. Bu adım geri alınamaz.",
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Uygulamada böyle görünür",
      giris: "Bu kareler uygulamanın kendisinden.",
      kareler: [
        { img: "h-flow", alt: "Görev ekranı: Halka İlerlemesi, tur sonuna kalan gün ve Senin görevin kartında Cüz 17", cap: "Görev ekranı: senin cüzün" },
        { img: "h-halka-ust", alt: "Görev ekranının Halka sekmesi: yöneticinin Sonraki tur kartı ve halkadaki kardeşlerin cüzleri", cap: "Halka sekmesi: sonraki tur ve kim hangi cüzde" },
        { img: "h-dagitim", alt: "Sonraki turu ayarla ekranı: sıra kayması anahtarı, kim ne okuyacak ve kişi başı oranlar", cap: "Sonraki turu ayarla" },
        { img: "n-home", alt: "Ana Sayfa: Bana düşenler bölümünde Aile Hatmi kartı ve 17. Cüz", cap: "Ana Sayfa: sana düşenler" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Cüzler nasıl dağıtılıyor, kime hangisi düşüyor?",
        c: "Uygulama halkadaki sıraya göre dağıtır: ilk kişiye 1. cüz, ikinciye 2. cüz ve böyle devam eder. Görevi başlatmadan önce önizlemede ilk turu görürsün; [[ol:dist.openCreate]] ile sırayı değiştirebilirsin. Sonraki turda sıradaki cüzler aynı sırayla dağıtılır: 5 kişilik bir halkada ikinci tur 6–10. cüzlerle devam eder. Hatim sürerken sırayı görev ekranındaki [[nextRound.open]] ile değiştirirsin." },
      { s: "Hafta dolunca ne olur, okuyamayan olursa?",
        c: "[[tx:wizard.autoAdvanceTitle]] açıksa (açık gelir) yeni tur senin saatinle gece yarısı kendiliğinden başlar ve sıradaki cüzler dağıtılır; kapatırsan yeni turu sen başlatırsın. Okunmayan pay kaybolmaz, bir sonraki turda **emanet** olarak o kişide kalır. İsterse [[flow.askHelp]] ile bir kısmını halkaya açar ya da [[flow.excuse]] ile tamamını havuza bırakır; diğerleri [[flow.helpTitle]] ile üstlenir." },
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

  ilgili: ["tek", "katil", "oruc"],
  kart: { kicker: "Hatim", baslik: "Hatim grubu kurma", metin: "Halkanı kur, 30 cüzü paylaştır; kimin ne okuyacağını önceden gör, turlar kendiliğinden ilerlesin." },
  onizleme: { sahne: "hatim-kart", adim: 6 },
  cta: { baslik: "Halkanı bugün kur", metin: "Halka kurmak ve katılmak ücretsiz. İndir, halkanı kur, davet linkini paylaş." },
};
