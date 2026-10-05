// P2 · Tek seferlik halka: toplu hatim, zikir ve dua (TR). Uygulamadaki karşılığı: Tek Seferlik Halka.
// İlk hâli "Vefat eden için toplu hatim"di; 5 Eki 2026'da her vesileyi anlatan genel rehbere çevrildi,
// vefat örneği bir bölüm olarak kaldı.
// Biçim: _gen/build-rehber.mjs başındaki açıklama. Düğme adları [[anahtar]] ile uygulamadan gelir.
// Dini dil: sevap vaadi yok, kendi hükmümüz yok, belli gün (3., 7., 40.) önerilmez.
export default {
  title: "Toplu hatim nasıl yapılır? Tek seferlik halka rehberi",
  desc: "Kandil, Ramazan, vefat eden bir yakın ya da bir dua için toplu hatim, zikir ve salavatı tek seferlik halkayla düzenle. Uygulaması olmayan da katılır.",
  h1: "Tek seferlik halka: toplu hatim, zikir ve dua nasıl düzenlenir?",
  crumb: "Tek seferlik halka",
  eyebrow: "Adım adım rehber",
  lead: "Bir kandil gecesi, Ramazan, vefat eden bir yakın ya da ailendeki bir vesile için sevdiklerinle birlikte hatim indirmek, zikir ve salavat çekmek ya da dua okumak isteyebilirsin. Uygulamada bunun için tek seferlik bir halka kurarsın: hedefi seçersin, bitiş tarihini belirlersin, linki gönderirsin. Herkes kendi payını kendi yerinde okur ya da çeker. Uygulama yalnız payları paylaştırır ve sayıları toplar.",
  meta: ["Kurulum yaklaşık 2 dakika", "Uygulaması olmayan da katılır", "Ücretsiz"],
  film: { sahne: "film-tek", cap: "Baştan sona tek akış: tek seferlik halkayı kur, hedefi ve bitiş tarihini seç, ithafı yaz, başlat ve linki gönder." },

  kisa: {
    maddeler: [
      "Uygulamada [[tabs.circles]] sekmesine gir, sağ üstteki **+** düğmesine bas ve açılan pencerede [[tx:event.createMenuTitle]] kartına dokun.",
      "Hedefi seç: [[tx:event.typeQuran]], [[tx:event.typeZikir]] ya da [[tx:event.typeDua]]. Hatimde dağıtım için [[tx:event.distPool]], ortak bir zikir sayısı için [[tx:event.modeCollective]] seçeneğine dokun.",
      "[[tx:event.endDate]] olarak halkanın ne zamana kadar süreceğini seç.",
      "Halkaya bir ad ver, istersen [[tx:event.dedicationLabel]] kutusuna vesileyi yaz ve [[event.create]] düğmesine dokun.",
      "[[event.startNow]] ile halkayı başlat, [[ol:event.inviteFriends]] ile linki ailene ve WhatsApp grubunuza gönder.",
      "Herkes payını kendi yerinde okur ya da çeker. Uygulaması olmayanlar çoğu halkaya tarayıcıdan katılır. Süre dolunca halka kapanır, özeti uygulamada kalır.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Halkayı kuran kişi", baslik: "Halkayı kur",
      giris: [
        "Tek seferlik halka bir vesile için kurulur: bir bitiş tarihi olur, davet linkiyle büyür, süre dolunca kapanır ve özeti arşivde kalır. Bunun için kalıcı bir grup kurman gerekmez.",
        "Ailecek her hafta süren bir hatim istiyorsan düzenli bir halka daha uygundur: [Hatim grubu kurma](/tr/rehber/hatim-grubu-kurma/).",
      ],
      adimlar: [
        {
          baslik: "Tek seferlik halkayı aç",
          metin: [
            "Uygulamayı aç ve alttaki çubukta [[tabs.circles]] sekmesine dokun. Sağ üstteki yeşil **+** düğmesine bas.",
            "Üstten [[tx:dashboard.addCircle]] penceresi iner. Ortadaki [[tx:event.createMenuTitle]] kartına dokun.",
          ],
          ipucu: "Sağ üstte **+** düğmesi yoksa uygulamada henüz adını yazmamışsındır. O zaman ortadaki [[ol:circlesTab.anonCreateEvent]] düğmesine dokun ve adını yaz; tek seferlik halka formu doğrudan açılır, sonraki adımdan devam edersin.",
          sahne: "vf-ac",
        },
        {
          baslik: "Hedefin türünü seç",
          metin: "İlk ekranda [[tx:event.step1Title]] sorusu ve tür kartları var. Bu rehber şu üç kartı anlatıyor; birine dokun ve [[common.continue]] de:",
          liste: [
            "[[tx:event.typeQuran]]: 30 cüzlük bir hatim ya da seçtiğin cüzler katılanlar arasında paylaşılır. Bu bölüm bu yolu anlatıyor.",
            "[[tx:event.typeZikir]]: bir zikir ya da salavat için hedef sayı koyarsın. Herkes kendi sayısını çeker ya da bütün halka tek bir toplama doğru sayar.",
            "[[tx:event.typeDua]]: Yâsîn, İhlâs, Fâtiha gibi sureler ve dualar için okuma sayısı koyarsın.",
          ],
          ipucu: "Zikir ve dua için ikinci adım farklıdır; aşağıdaki **Zikir, salavat ya da dua hedefi** bölümünde anlatılıyor. Sonraki adımlar hepsinde aynıdır.",
        },
        {
          baslik: "Hatmin dağıtımını seç",
          metin: "[[tx:event.typeQuran]] seçtiysen açılan ekranda [[tx:event.fullHatim]] hazır gelir: 30 cüz, 604 sayfa. Altta [[tx:event.distributionLabel]] için iki seçenek var; birini seç ve yine [[common.continue]] de:",
          liste: [
            "[[tx:event.distPool]]: bütün cüzler havuzda durur, herkes istediği cüzü kendisi alır. Halka başladıktan sonra gelen de katılır. Aile ve tanıdıklarla okunan bir hatim için bunu seç.",
            "[[tx:event.distAuto]]: sayfalar katılanlara eşit bölünür. Halkayı başlattığın anda katılım kapanır, bu yüzden herkesin önceden katılmış olması gerekir.",
          ],
          fark: "Uygulaması olmayan akrabalar da katılır: [[tx:event.distPool]] seçiliyken davet linkinden tarayıcıda cüz alıp sayfalarını okuyabilirler.",
          ipucu: "Hatmin tamamı yerine belli cüzler okunacaksa [[tx:event.customJuz]] seçeneğini kullan.",
          sahne: "vf-hedef",
        },
        {
          baslik: "Bitiş tarihini seç",
          metin: [
            "[[tx:event.endDate]] kutusuna dokun ve halkanın ne zamana kadar süreceğini seç. Kutu iki gün sonrasıyla gelir; bir kandil gecesi gibi istediğin başka bir tarihi seçebilirsin. Sonra [[common.continue]] de.",
            "Halkanın belli bir saatte kendiliğinden başlamasını istersen [[tx:event.registrationWindowToggle]] kutusunu işaretle. İşaretlemezsen halkayı sen başlatırsın.",
          ],
          ipucu: "Halka, bitiş tarihinden 24 saat sonra silinir. Süre yetmezse sonradan uzatabilirsin; aşağıda anlatılıyor.",
          sahne: "vf-zaman",
        },
        {
          baslik: "Halkaya ad ver, ithafı yaz",
          metin: [
            "[[tx:event.titleLabel]] kutusuna bir ad yaz, örneğin “Regaib Kandili Hatmi”. Boş bırakırsan ad [[tx:event.suggestFullHatim]] olur.",
            "[[tx:event.dedicationLabel]] kutusuna halkanın vesilesini ya da kimin için okunduğunu yaz, örneğin “Ailemizin ve bütün ümmetin hayrına”. İthaf halka ekranında adın altında durur. Linki tarayıcıda açanlar onu sayfanın en büyük başlığı olarak görür. İthafı boş da bırakabilirsin.",
            "Alttaki özeti kontrol et ve [[event.create]] düğmesine dokun.",
          ],
          ipucu: "İlk halkanı kurarken bir kez [[tx:secureNudge.title]] penceresi çıkabilir. Hesabını Apple, Google ya da e-postayla bağlarsan telefonun değişse de halkan kaybolmaz. İstersen [[tx:secureNudge.later]] de.",
          sahne: "vf-ithaf",
        },
        {
          baslik: "Halkayı başlat",
          metin: [
            "Halka ekranı açılır: üstte halkanın adı ve ithafı, altında [[tx:event.inviteSectionTitle]] kartı ve [[event.startNow]] düğmesi. [[tx:event.distPool]] seçtiysen ya da bir zikir veya dua halkası kurduysan beklemene gerek yok. [[event.startNow]] düğmesine dokun, açılan pencerede bir kez daha [[event.startNow]] de.",
            "Halka başlamadan kimse cüz alamaz ve sayım yapamaz. Başladıktan sonra davet linki açık kalır, sonradan gelen de katılır.",
          ],
          ipucu: "[[tx:event.distAuto]] seçtiysen önce linki paylaş, herkes katılınca başlat. Başlatınca kimin hangi sayfaları okuyacağını gösteren bir önizleme açılır; [[event.planConfirm]] deyip bir kez daha onaylarsın.",
          sahne: "vf-baslat",
        },
        {
          baslik: "Linki gönder",
          metin: [
            "Halka başlayınca davet kartı [[tx:event.tabCircle]] sekmesine geçer. [[ol:event.inviteFriends]] düğmesine dokun ve linki WhatsApp grubunuza, ailene ya da istediğin kişiye gönder.",
            "Kartın altındaki not, uygulaması olmayanların bu linkle ne yapabileceğini söyler. Ortak havuzlu hatimde şöyle yazar: [[tx:event.webJoinClaim]]",
          ],
          fark: "WhatsApp grubunuz kalsın. Linki oraya at; kimin hangi cüzü aldığını ve kaç kez çekildiğini uygulama tutar, ayrıca liste yazman gerekmez.",
          ipucu: "Linki bu ekrandaki [[ol:event.inviteFriends]] düğmesinden ya da sağ üstteki paylaş simgesinden gönder. Yalnız davet kodunu yazıp gönderme; uygulaması olmayanlar tarayıcıdan ancak bu linkle katılabilir.",
          sahne: "vf-davet",
        },
      ],
    },
    {
      tur: "bolum", id: "zikir-dua", rol: "Halkayı kuran kişi", baslik: "Zikir, salavat ya da dua hedefi",
      giris: "Türü seçtiğin ekranda [[tx:event.typeZikir]] ya da [[tx:event.typeDua]] kartına dokunursan değişen yalnız ikinci adım olur. Bitiş tarihi, ad, ithaf, başlatma ve davet yukarıdaki gibidir.",
      adimlar: [
        {
          baslik: "Zikri ve hedef sayıyı seç",
          metin: [
            "[[tx:event.zikirGoalTitle]] ekranında [[tx:event.addFromPresets]] başlığının altındaki çiplerden birine dokun, örneğin [[tx:globalDhikr.salavat.name]]. Listede [[tx:wizard.zikirPresetKelime]], [[tx:wizard.zikirPresetIstigfar]], [[tx:wizard.zikirPresetSubhanallah]] ve [[tx:wizard.zikirPresetElhamdulillah]] da var. [[tx:event.esmaulHusna]] çipinden bir esma seçebilir, [[tx:event.customZikir]] kutusuna kendi zikrini yazabilirsin.",
            "Eklenen zikrin kartında [[tx:event.target]] kutusuna sayıyı yaz. Yanında iki seçenek var:",
          ],
          liste: [
            "[[tx:event.modeCollective]]: bütün halka tek bir toplama doğru sayar, örneğin hep birlikte 10.000 salavat. Sayılar bitiş tarihine kadar birikir.",
            "[[tx:event.modeIndividual]]: herkes yazdığın sayıyı kendisi tamamlar, örneğin kişi başı 100.",
          ],
          fark: "Uygulaması olmayanlar da linkten tarayıcıda sayıma katkı verebilir. Bu yalnız [[tx:event.modeCollective]] seçilen zikirlerde ve halka başladıktan sonra olur.",
          ipucu: "Sayım ve ortak hedef üzerine daha fazlası: [Toplu zikir ve salavat](/tr/rehber/toplu-zikir-salavat/).",
          sahne: "zikir-tek-toplu",
        },
        {
          baslik: "Dua ya da sure okuması için",
          metin: [
            "[[tx:event.typeDua]] seçtiysen [[tx:event.duaGoalTitle]] ekranındaki hazır listede [[tx:event.presetFatiha]], [[tx:globalDhikr.ayetelkursi.name]], [[tx:event.presetYasin]], [[tx:event.presetIhlas]], [[tx:event.presetMulk]] ve [[tx:event.presetFetih]] var. Listede olmayan bir dua ya da sureyi [[tx:event.customZikir]] kutusuna yazarak eklersin.",
            "[[tx:event.target]] kutusuna okunacak sayıyı yaz ve yine [[tx:event.modeCollective]] ya da [[tx:event.modeIndividual]] seç. Kaç adet okunacağına sen karar verirsin; sayının geleneği için bulunduğun yerin âlimine danış.",
          ],
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Halkaya katılan herkes", baslik: "Katıl ve payını tamamla",
      giris: "Herkes kendi payını kendi yerinde, kendi vaktinde okur ya da çeker. Bir araya gelmek gerekmez. Uygulama yalnız payları paylaştırır, sayıları toplar ve neyin tamamlandığını gösterir.",
      adimlar: [
        {
          baslik: "Uygulaman varsa: katıl ve bir cüz al",
          metin: [
            "Davet linkine dokununca uygulama açılır ve halkanın kartı çıkar: adı, ithafı, katılımcı sayısı ve bitiş tarihi. [[joinGroup.join]] düğmesine dokun. İlk kez katılıyorsan adını yazman yeter; e-posta istenmez. Link uygulama yerine tarayıcıda açılırsa sayfanın altındaki [[=Uygulamada aç]] düğmesine dokun; ayrıntısı [Davetle halkaya katılma](/tr/rehber/halkaya-katilma/) rehberinde.",
            "Hatim halkasında [[tx:event.poolCuzTitle]] bölümünde boş bir cüze dokun. [[event.takeWholeCuz]] dersen o cüzün 20 sayfası senin olur. Daha azını okuyabileceksen ilk ve son sayfayı yazıp [[ol:event.claimRange]] düğmesine dokun.",
          ],
          ipucu: "Halka henüz başlamadıysa ekranda [[tx:event.startWhenAdminOpen]] yazar. Yönetici başlatınca cüzler ve sayım açılır.",
          sahne: "vf-katil",
        },
        {
          baslik: "Oku, sonra Tamamla de",
          metin: [
            "Aldığın sayfalar [[tx:event.myTask]] kartında durur. [[ol:event.read]] düğmesine dokun; Kur'an senin ilk sayfanda açılır.",
            "Okumayı bitirince geri dön ve [[event.done]] düğmesine dokun. Açılan pencerede onaylayınca sayfaların okundu sayılır ve halkanın ilerlemesine eklenir. Bunu bitişten en az 6 saat önce yap; işaretlenmeyen sayfalar o saatte havuza döner.",
          ],
          fark: "Mushaf aramana gerek yok: sana düşen sayfalar uygulamada açılır.",
          ipucu: "Yanlışlıkla işaretlediysen [[=Tamamlananlar]] satırını aç; oradan işareti geri alabilirsin.",
          sahne: "vf-oku",
        },
        {
          baslik: "Zikir ya da dua halkasında: say",
          metin: [
            "Halka ekranındaki [[tx:event.zikirSection]] kartında (dua halkasında [[tx:event.duaSection]]) her satırın yanında [[event.count]] düğmesi var. Dokununca sayaç açılır; ekrana her dokunuş bir sayar.",
            "Tesbihle ya da ezberden saydıysan sayacın altındaki [[ol:zikir.bulkAdd]] düğmesiyle sayıyı topluca ekle. Sayılar kendiliğinden kaydedilir. [[tx:event.modeCollective]] zikirde sayaç [[tx:zikir.counterGroupTotal]] satırını da gösterir.",
          ],
        },
        {
          baslik: "Uygulaman yoksa: tarayıcıdan bir bölüm al",
          metin: [
            "Ortak havuzlu bir hatimde linke dokununca tarayıcıda halkanın sayfası açılır. En üstte ithaf yazar, altında kaç sayfanın okunduğu görünür.",
            "[[=Sıradaki bölüm]] kartında sana bir cüz önerilir. [[=Bunu al]] düğmesine dokun. Kaç sayfa okuyacağını seç (5, 10, 15 ya da 20) ve [[=Onaylıyorum, alıyorum]] de. [[=Şimdi oku]] düğmesi sayfaları tarayıcıda açar.",
          ],
          fark: "Teyzenin telefonunda uygulama yoksa da olur: hesap açmadan, yalnız linkle cüzünü alıp okur.",
          ipucu: "Halka henüz başlamadıysa sayfa bunu söyler ve yönetici başlatınca kendiliğinden yenilenir.",
          sahne: "vf-web",
        },
        {
          baslik: "Okuyunca Tamamladım de",
          metin: [
            "Sayfaların sonunda [[=Okumayı bitirdin mi?]] sorusu ve [[=Tamamladım]] düğmesi var; okumayı bitirince ona dokun. Linki sonra aynı tarayıcıda yeniden açarsan aldığın bölüm [[=Aldığın bölümler]] kartında durur; [[=Tamamladım]] düğmesi orada da var.",
            "İstersen adını yaz; halkadakiler bölümü kimin üstlendiğini görür. Ad yazmak zorunlu değil, boş bırakınca hiçbir şey değişmez.",
          ],
          ipucu: "Bölümü aldıktan sonra çıkan [[=Bağlantıyı kopyala]] düğmesiyle linki kaydet. Başka bir telefondan ya da tarayıcıdan dönmek istersen bu bağlantıyı kullanırsın.",
          sahne: "vf-web-bitir",
        },
        {
          baslik: "Uygulaman yoksa: tarayıcıdan sayıma katıl",
          metin: [
            "Zikir ya da dua halkasının linkini açınca tarayıcıda [[=Halkadaki zikirler]] kartı gelir. [[tx:event.modeCollective]] seçilen her zikrin yanında [[=Sayıma katıl]] düğmesi var.",
            "Dokununca büyük bir daire açılır: her dokunuş bir sayar, [[=+33]] ve [[=+100]] düğmeleri topluca ekler. Bitince [[=Katkımı ekle]] de; sayın halkanın toplamına eklenir.",
          ],
          ipucu: "[[tx:event.modeIndividual]] seçilen zikirlerde düğme yerine [[=Halka üyeleri için]] yazar. Onları yalnız uygulamadan çekebilirsin.",
        },
      ],
    },
    {
      tur: "ikili", id: "bitis", rol: "Halkayı kuran kişi", baslik: "Süre dolarken ve halka bitince",
      giris: "Halkanın sonunu da uygulama izler: hatimde alınıp bitirilmeyen sayfaları kendisi havuza geri koyar, sayıları bitiş tarihine kadar toplar.",
      kartlar: [
        {
          baslik: "Bitişe yaklaşırken",
          metin: [
            "Bitişe 12 saat kala, payını henüz bitirmemiş olanlara bir hatırlatma bildirimi gider. Zikir ve dua halkalarında bu hatırlatma bütün katılımcılara gider.",
            "Hatimde bitişe 6 saat kala, uygulamada alınıp [[event.done]] ile işaretlenmemiş sayfalar havuza döner. Başka biri alıp okuyabilir; payı geri alınan kişiye uygulamada haber verilir.",
            "Süre yetmezse [[tx:event.tabCircle]] sekmesindeki [[tx:event.adminControls]] kartından [[tx:event.extend24h]] satırına dokun. Bitiş tarihi 24 saat ileri alınır; gerekirse yeniden basabilirsin.",
          ],
          sahne: "vf-uzat",
        },
        {
          baslik: "Halka bitince",
          metin: [
            "Hatimde bütün sayfalar okununca [[tx:event.collectiveProgress]] %100 olur. Vakit varsa [[tx:event.poolCuzTitle]] başlığının yanındaki [[ol:event.addSeries]] düğmesiyle aynı halkada 30 cüzlük yeni bir hatim açabilirsin. Zikir ve dua halkalarında sayılar bitiş tarihine kadar birikmeye devam eder.",
            "Halka, bitiş tarihinden 24 saat sonra silinir. Silinmeden önce halkanın özeti, uygulamadan katılan herkesin [[tx:tabs.profile]] › [[tx:quran.myLibrary]] › [[tx:event.archiveTab]] bölümüne kaydedilir.",
            "Tarayıcıdan alınan sayfalar, alındığı anda halkanın ilerlemesinde okundu sayılır ve havuza dönmez. Kimin bitirdiğini [[tx:event.tabCircle]] sekmesindeki [[=Web'den katılanlar]] listesinde görürsün.",
          ],
          sahne: "vf-ilerleme",
        },
      ],
      not: "[[tx:event.distAuto]] ile kurulan hatimde bütün paylar okununca halka ekranında [[=Hatminiz tamamlandı]] kartı çıkar. Payını bitiremeyen olursa yönetici [[tx:event.adminControls]] kartındaki [[tx:event.releasePool]] satırıyla kalan payları havuza açabilir.",
    },
    {
      tur: "ikili", id: "vesileler", rol: "Örnekler", baslik: "Hangi vesilelerle?",
      giris: [
        "Tek seferlik halka herhangi bir vesile için kurulur. Birkaç örnek: bir kandil gecesi, Mevlid ya da Ramazan için hatim; vefat eden bir yakın için hatim ya da Yâsîn; hasta bir yakının şifası için dua niyetiyle salavat; ailede bir düğün, yeni doğan bir bebek ya da hacca giden biri için ortak bir dua.",
        "Adımlar hepsinde aynıdır. Yalnız hedefi, bitiş tarihini ve ithafı o vesileye göre seçersin.",
      ],
      kartlar: [
        {
          baslik: "Vefat eden bir yakının için",
          metin: [
            "Bir yakının vefat ettiğinde onun için sevdiklerinle birlikte hatim indirebilirsin. Halkaya bir ad ver, örneğin “Ahmet Kaya için Hatim”, ithafa da “Rahmetli babamızın ruhuna” gibi bir cümle yaz. Linki tarayıcıda açan akrabalar bu ithafı sayfanın en büyük başlığı olarak görür.",
            "Bitiş tarihini ailenin rahatça okuyabileceği bir güne koy; uygulama belli bir gün önermez. Hatim yerine salavat ya da Yâsîn okuması da düzenleyebilirsin: türü seçerken [[tx:event.typeZikir]] ya da [[tx:event.typeDua]] kartına dokun.",
            "Herkes kendi cüzünü kendi yerinde okur. Uygulama yalnız cüzleri paylaştırır ve hangisinin okunduğunu gösterir.",
          ],
          sahne: "vf-ithaf-vefat",
        },
        {
          baslik: "Kandil, Mevlid ve Ramazan için",
          metin: [
            "Bir kandil gecesi, Mevlid ya da Ramazan için okunacak bir hatimde bitiş tarihini o vesilenin gününe koy, örneğin kandil gecesinin akşamına. İthafı da vesileye göre yaz. İthaf kutusu boşken içinde [[tx:event.dedicationPlaceholder]] yazar.",
            "Kalabalık bir cemaatle okuyorsan [[ol:event.addSeries]] ile aynı halkada birden çok hatim açabilirsin.",
            "Ramazan boyunca her gün ya da her hafta süren bir hatim için düzenli halka daha uygundur: [Hatim grubu kurma](/tr/rehber/hatim-grubu-kurma/).",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ornek", baslik: "Örnek: Regaib Kandili hatmi",
      giris: "Aşağıdaki görüntüler uygulamadan. İthafta “Ailemizin ve bütün ümmetin hayrına” yazıyor, cüzler ortak havuzdan alınıyor ve bazı akrabalar tarayıcıdan katılmış.",
      kareler: [
        { img: "06-event", alt: "Regaib Kandili Hatmi: ithaf satırı, Ortak İlerleme yüzde 60, Görevin kartında Sayfa 21-40 ve Cüz Havuzu", cap: "Görev sekmesi: ortak ilerleme, senin sayfaların ve cüz havuzu" },
        { img: "06c-event-davet", alt: "Aynı halkanın Halka sekmesi: davet kodu, davet linki, Davet Et düğmesi ve katılımcılar", cap: "Halka sekmesi: davet kodu, link ve katılımcılar" },
        { img: "06b-event-web", alt: "Web'den katılanlar listesi ve Yönetim kartında Süreyi 24 saat uzat ile Halkayı Sil", cap: "Tarayıcıdan katılanlar ve yönetim" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Toplu hatim nasıl yapılır?",
        c: "**Halkalar** sekmesinde **+** düğmesine bas, **Tek Seferlik Halka** ve ardından **Kur'an Hatmi** kartına dokun. Dağıtımda **Ortak havuz** seçeneğini işaretle, bitiş tarihini belirle, istersen ithafı yaz ve **Halkayı Oluştur** de. **Şimdi Başlat** ile başlatıp linki gönder. Herkes bir cüz alır ve kendi yerinde okur." },
      { s: "Tek seferlik halka ile düzenli halka arasındaki fark ne?",
        c: "Tek seferlik halka bir vesile için kurulur: bitiş tarihi vardır, süre dolunca kapanır ve 24 saat sonra silinir; özeti uygulamada kalır. Düzenli halka ise ailen ya da cemaatinle kalıcı bir topluluktur; hatim her gün ya da her hafta yeni bir turla sürer. Ayrıntısı: [Hatim grubu kurma](/tr/rehber/hatim-grubu-kurma/)." },
      { s: "Uygulaması olmayanlar katılabilir mi?",
        c: "Çoğu halkada evet. **Ortak havuz** seçili hatimde davet linkine dokunan kişi tarayıcıda bir bölüm alır ve sayfaları orada okur. Zikir ve dua halkasında **Toplu** seçilen zikirlerin sayımına tarayıcıdan katkı verir. Hesap açmaz; adını yazmak da isteğe bağlıdır. **Otomatik böl** seçili hatimde tarayıcıdan yalnız yetişmeyen paylar üstlenilebilir; **Bireysel** zikirler için uygulama gerekir." },
      { s: "Vefat eden bir yakın için hatim nasıl düzenlenir?",
        c: "Adımlar her tek seferlik halkada olduğu gibi. Halkaya bir ad ver ve ithafa “Rahmetli babamızın ruhuna” gibi bir cümle yaz; linki tarayıcıda açanlar ithafı sayfanın başlığı olarak görür. Bitiş tarihini ailenin rahatça okuyabileceği bir güne koy. Herkes kendi cüzünü kendi yerinde okur; uygulama yalnız cüzleri paylaştırır." },
      { s: "Bütün cüzler hatim duasından önce okunamazsa ne olur?",
        c: "Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu bu soruyu cevaplamıştır. Kurul, cüz dağıtılarak hatim yapılabileceğini, okunamayan cüzlerin hatim duasından sonra da okunabileceğini belirtiyor. [Kurulun cevabını oku](https://kurul.diyanet.gov.tr/Cevap-Ara/1112/cuz-dagitilarak-hatim-yapilmasi-mumkun-mudur-dagitilan-cuzlerin-bir-kisminin-hatim-duasindan-sonra-okunmus-olmasi-halinde-hatim-gecerli-midir)." },
      { s: "Kandil, Mevlid ya da Ramazan için nasıl kurulur?",
        c: "Aynı adımlarla. Bitiş tarihini o vesilenin gününe, örneğin kandil gecesinin akşamına koy ve ithafı vesileye göre yaz. Kalabalık bir cemaatle okuyorsan **Yeni seri** ile aynı halkada birden çok hatim açabilirsin. Ramazan boyunca her gün ya da her hafta süren bir hatim için düzenli halka daha uygundur: [Hatim grubu kurma](/tr/rehber/hatim-grubu-kurma/)." },
      { s: "Ücretli mi?",
        c: "Tek seferlik halka kurmak ve katılmak ücretsizdir. Ücretsiz hesapla kurduğun tek seferlik halka silinmeden yenisini kuramazsın; halka, bitiş tarihinden 24 saat sonra silinir. Katılmanın sınırı yoktur." },
    ],
  },

  ilgili: ["hatim", "zikir", "katil"],
  kart: { kicker: "Vesile", baslik: "Tek seferlik halka: hatim, zikir, dua", metin: "Bir kandil, vefat eden bir yakın ya da bir dua için tek seferlik halka kur, linki paylaş; uygulaması olmayan da tarayıcıdan katılır." },
  onizleme: { sahne: "vf-baslat", adim: 0 },
};
