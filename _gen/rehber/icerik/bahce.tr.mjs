// Niyet Bahçesi (TR). Biçim: _gen/build-rehber.mjs başındaki açıklama. Akış koddan: app/bahce/*, components/garden/*, lib/garden/*.
// Düğme adları [[anahtar]] ile uygulamadan gelir; metinde uzun tire yok, Cevşen yok, fazilet vaadi yok.
export default {
  title: "Niyet Bahçesi: niyet dik, ibadetini düzenli sürdür",
  desc: "Niyet Bahçesi'nde her niyetin bir fidan olur. Kur'an, namaz, zikir ya da sadaka için küçük bir adım seç, her gün sürdür, fidanın büyüsün.",
  h1: "Niyet Bahçesi nasıl kullanılır? Niyet dik, fidanın büyüsün",
  crumb: "Niyet Bahçesi",
  eyebrow: "Adım adım rehber",
  lead: "Niyet Bahçesi, kendi ibadetin için küçük ve düzenli bir adım seçtiğin yer. Her niyetin bir fidan olur, sen emek verdikçe büyür. Bahçeni yalnız sen görürsün; ara vermen gerekirse bahçen seni bekler.",
  meta: ["İlk niyet yaklaşık 1 dakika", "Bahçeni yalnız sen görürsün", "Ücretsiz"],
  film: { sahne: "film-bahce", cap: "İlk niyet: Kur'an okumayı seç, günde iki sayfa de, fidanını dik." },

  kisa: {
    maddeler: [
      "Uygulamada [[tabs.read]] sekmesine gir ve [[tx:garden.name]] kartına dokun. İlk girişte kısa bir tanıtım açılır.",
      "[[garden.plant]] de. Hazır bir örnek seç ya da [[tx:garden.flow.already]] arasından bir amel seç.",
      "Ne sıklıkla ve en az ne kadar yapacağını seç, [[common.continue]] de.",
      "Fidanını seç, istersen niyetini bir cümleyle yaz ve [[garden.flow.plantBtn]] düğmesine dokun.",
      "Her gün [[tx:garden.today]] listesinden adımını at. Uygulamada okuduğun sayfalar, kıldığın vakitler ve çektiğin zikir kendiliğinden sayılır.",
      "Ara vermen gerekirse [[tx:garden.rest.title]] de; o günlerde bitkilerin solmaz.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Bahçeni aç",
      giris: "Niyet Bahçesi, [[tx:tabs.read]] ekranındaki kartlardan biridir. Kendi ibadetin içindir; bir halka kurman gerekmez.",
      adimlar: [
        {
          baslik: "Oku ekranından Niyet Bahçen'e gir",
          metin: [
            "Alttaki çubukta [[tabs.read]] sekmesine dokun. Kartlar arasında [[tx:garden.name]] kartını bul; yeni olduğu için köşesinde [[tx:garden.newTag]] yazar. Karta dokun.",
            "İlk girişte üç sayfalık kısa bir tanıtım açılır. [[common.continue]] ile ilerle; son sayfadaki [[garden.firstPlant]] düğmesi seni doğrudan niyet dikmeye götürür. İstersen üstteki [[ol:garden.introScreen.skip]] ile geçebilirsin.",
          ],
          ipucu: "Sonraki girişlerde kart [[tx:garden.list.title]] listesini açar. Bahçenin kendisine listenin üstündeki resimden, [[tx:garden.list.enter]] yazan yerden geçersin.",
          sahne: "bahce-ac",
        },
      ],
    },
    {
      tur: "bolum", id: "dik", baslik: "İlk niyetini dik",
      giris: "Niyet dikmek üç adımdır: hangi amel, ne sıklıkla, hangi fidan.",
      adimlar: [
        {
          baslik: "Hangi amel için olduğunu seç",
          metin: "[[garden.plant]] düğmesine dokun. İlk ekran [[tx:garden.flow.step1]] diye sorar ve üç grup gösterir:",
          liste: [
            "[[tx:garden.example.title]]: hazır üç niyet. Birine dokunursan ayarları hazır gelir, doğrudan fidan seçmeye geçersin.",
            "[[tx:garden.flow.already]]: Kur'an okuma, namaz, zikir, vird, ezber, kitap okuma, kaza namazı, kaza orucu ve namaz tesbihatı. Bunları uygulamada yapıyorsan bahçe kaydını oradan okur.",
            "[[tx:garden.flow.new]]: oruç, sadaka, basılı mushaftan okuma ve dua. En alttaki [[tx:garden.free.custom]] ile kendi niyetine ad verebilirsin.",
          ],
          sahne: "bahce-sec",
        },
        {
          baslik: "Ne sıklıkla ve en az ne kadar yapacağını seç",
          metin: [
            "[[tx:garden.flow.rhythmLabel]] altında [[tx:garden.rhythm.daily]], [[tx:garden.rhythm.days]] ya da [[tx:garden.rhythm.weekly]] seç. Sonra asgari adımı ayarla: Kur'an okumada sayfa, namazda vakit, zikirde adet. Kur'an okuma için günde 2 sayfa hazır gelir.",
            "[[common.continue]] düğmesine dokun.",
          ],
          ipucu: "Küçük tut. Ekranın da söylediği gibi, müsait olduğun gün fazlası da sayılır.",
          sahne: "bahce-ritim",
        },
        {
          baslik: "Fidanını seç ve dik",
          metin: [
            "Son adımda amelin önerdiği fidan seçili gelir; Kur'an okumada [[tx:garden.kind.turunc]]. Alttaki kuşaktan başka bir tür seçebilir, [[tx:garden.flow.allKinds]] ile hepsini görebilirsin.",
            "[[tx:garden.flow.textLabel]] kutusuna istersen niyetini bir cümleyle yaz; bu cümleyi yalnız sen görürsün. [[garden.flow.plantBtn]] düğmesine dokun: fidanın bahçede yerini alır.",
          ],
          fark: "Her fidanın kartında [[tx:garden.about.title]] bölümü durur: o bitkinin geçtiği ayet ya da hadis, ya da yaratılışındaki bir incelik.",
          ipucu: "İlk niyetini diktikten sonra uygulama bir kez akşam hatırlatıcısı önerir: o günün niyeti bitmediyse saat 21.00'de kısa bir hatırlatma gelir. Saati bahçedeki [[tx:garden.reminder.title]] simgesinden değiştirir ya da kapatırsın.",
          sahne: "bahce-fidan",
        },
      ],
    },
    {
      tur: "bolum", id: "buyut", baslik: "Bahçeni büyüt",
      giris: "Bahçenin altında [[tx:garden.today]] listesi durur: o gün sırası gelen niyetlerin ve kaçının tamam olduğu.",
      adimlar: [
        {
          baslik: "Bugün listesinden adımını at",
          metin: [
            "Uygulamada karşılığı olmayan bir niyette, örneğin sadakada, [[garden.act.didToday]] düğmesine dokun. Satır onaylanır ve fidanın o an büyür.",
            "Bir amele bağlı niyette düğme [[ol:common.continue]] der ve seni o ekrana götürür: Kur'an okuyucusuna, [[tx:prayerDetail.title]] ekranına ya da [[tx:read.zikirmatikTitle]]'e. Orada yaptığın kendiliğinden sayılır, ayrıca işaretlemen gerekmez.",
          ],
          ipucu: "Bahçe günü imsakta döner. Gece yarısından sonra çektiğin zikir ya da okuduğun sayfa önceki güne yazılır.",
          sahne: "bahce-bugun",
        },
        {
          baslik: "Kaza namazlarını ve dualarını bağla",
          metin: [
            "[[tx:garden.flow.already]] içinden [[tx:garden.src.kaza]] karesini seçersen niyet [[tx:kaza.titleN]] ekranına bağlanır: kıldığın her kaza namazı, aynı gün yazınca bahçede de sayılır. Kaza hesabın kurulu değilse ekranda [[tx:garden.link.kazaSetup]] çıkar; kurup döndüğünde niyet kendiliğinden bağlanır.",
            "[[tx:garden.src.kazaOruc]] aynı yoldan [[tx:kaza.titleO]] ekranına bağlanır. Dua niyeti de [[tx:duaDefter.title]]'den sayılır: defterinden dua ettiğin gün ve emanetlerin için dua ettiğini işaretlediğin gün.",
          ],
          ipucu: "Kaza namazında ve duada kurmadan da dikebilirsin; o zaman niyeti [[garden.act.didToday]] ile kendin işaretlersin. Kaza hesabını kurmak için: [Kaza namazı ve orucu takibi](/tr/rehber/kaza-namazi-ve-orucu/).",
          sahne: "bahce-bag",
        },
        {
          baslik: "Fidanın nasıl büyür",
          metin: [
            "Niyetini düzenli sürdürdüğünde fidan, hangi ritimde olursa olsun yaklaşık kırk günde olgunlaşır. Aksamadan geçen her hafta dibinde yeni çiçekler açar; altı hafta tamamlanınca meyve ağaçları meyve verir.",
            "Aksadığın gün fidanın boyu kaybolmaz. Önce boynu bükülür, uzun aksarsan solar; asgari adımı attığın gün yeniden canlanır.",
          ],
          fark: "Ağacın hâli sözle anlatılır: “Dibinde ilk çiçekler açtı.”, “Meyve veriyor.” gibi. [[tx:garden.list.title]] listesindeki gün sayısı tamamladığın günleri gösterir ve hiç azalmaz.",
          sahne: "bahce-buyume",
        },
      ],
    },
    {
      tur: "bolum", id: "ara", baslik: "Ara ver, kaldığın yerden sür",
      giris: "Hastalık, yolculuk ya da özel günler herkesin başına gelir. Bahçe bunun için bir ara düğmesi taşır.",
      adimlar: [
        {
          baslik: "Ara vermen gerekirse",
          metin: [
            "Bahçenin üstündeki duraklat simgesine dokun; [[tx:garden.rest.title]] penceresi açılır. Süreyi seç ([[tx:garden.today]], 3, 7, 14 ya da 30 gün), ara vereceğin niyetleri işaretle ve [[garden.rest.confirm]] de.",
            "Sebebi sorulmaz. Ara verdiğin günlerde bitkilerin solmaz; dönünce kaldığı yerden sürer. Erken dönmek istersen [[tx:garden.today]] listesinin üstündeki [[ol:garden.rest.end]] yazısına dokun.",
          ],
          ipucu: "Tek bir niyete ara vermek için ağacına dokun, kartındaki üç noktadan [[tx:garden.menu.rest]] seçeneğini seç.",
          sahne: "bahce-ara",
        },
        {
          baslik: "Kırkıncı gün",
          metin: "Bir niyeti kırk gün yerine getirdiğinde bahçede o ağacın anı oynar ve [[tx:garden.forty.title]] kartı açılır. Kartta A'râf suresinin 142. ayeti ve kısa bir not durur: Mûsâ aleyhisselâmın Rabbiyle buluşma vakti kırk geceye tamamlandı. Haftalık niyetlerde bu an altıncı haftada gelir.",
          sahne: "bahce-kirk",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Uygulamada böyle görünür",
      giris: "Bu kareler uygulamanın kendisinden. Bahçe uygulamada üç boyutlu, çini bir avlu olarak çizilir.",
      kareler: [
        { img: "b-niyetler", alt: "Niyetlerim: bahçenin resmi, Bahçene gir yazısı ve niyet satırları", cap: "[[tx:garden.list.title]]: bahçeye buradan girersin" },
        { img: "b-dik", alt: "Niyet dik: Hangi amel için? Örnek niyetler ve Zaten yaptıkların kareleri", cap: "Niyet dikerken ilk adım" },
        { img: "b-bahce", alt: "Gece gökyüzü altında halka biçimli çini bahçe ve altta Bugün listesi", cap: "Bahçe ve [[tx:garden.today]] listesi" },
        { img: "b-kirk", alt: "Kırkıncı gün kartı: A'râf suresi 142. ayet", cap: "Kırkıncı günün kartı" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Bahçemi başkaları görebilir mi?",
        c: "Bahçeni yalnız sen görürsün. Hesabın varsa bahçen hesabınla eşitlenir, telefon değiştirince de gelir. Niyetine yazdığın cümleler ve verdiğin adlar ise yalnız [[tx:garden.words.title]] ayarını açarsan diğer cihazlarına gelir." },
      { s: "Bir gün aksarsam ağacım kurur mu?",
        c: "Kurumaz. Boyu hiç kaybolmaz; aksadıkça önce boynu bükülür, sonra solar, çok uzun aralarda kışa girer. Asgari adımı attığın gün canlanır. Önceden bildiğin aralar için [[tx:garden.rest.title]] kullan; o günlerde bitkilerin hiç solmaz." },
      { s: "Kur'an'ı uygulamada okuyorum, ayrıca işaretlemem gerekir mi?",
        c: "Gerekmez. [[tx:garden.flow.already]] bölümünden seçtiğin niyetler uygulamadaki kaydını okur: okuyucuda okuduğun sayfalar, [[tx:prayerDetail.title]] ekranında işaretlediğin vakitler, sayaçlarda çektiğin zikir. Basılı mushaftan okuyorsan [[tx:garden.free.mushaf]] niyetini dik ve [[garden.act.didToday]] ile işaretle." },
      { s: "Kaç niyet dikebilirim?",
        c: "Avlu on fidanla başlar; doldukça önce dört, sonra dört fidanlık yer daha açılır. Bahçen en çok on sekiz fidan taşır." },
      { s: "Yanlış fidan seçtim, değiştirebilir miyim?",
        c: "Dikilen fidanın türü değişmez. Ağacına dokun, kartındaki üç noktadan [[tx:garden.menu.uproot]] de ve yeniden dik. Araçlardaki kayıtların (okuma, zikir, namaz) yerinde kalır." },
      { s: "Ücretli mi?",
        c: "Niyet Bahçesi'nde niyet dikmek, sürdürmek ve ara vermek ücretsizdir." },
    ],
  },

  ilgili: ["kaza", "teheccud", "defter"],
  kart: { kicker: "Niyet", baslik: "Niyet Bahçesi", metin: "Her niyetin bir fidan olur, sen emek verdikçe büyür. Bahçeni yalnız sen görürsün." },
  onizleme: { sahne: "bahce-kart", adim: 13 },
  cta: { baslik: "İlk niyetini dik", metin: "Manevi Halka'yı ücretsiz indir, Oku ekranından Niyet Bahçen'e gir." },
};
