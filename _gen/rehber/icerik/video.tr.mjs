// Ayetli video (TR). Biçim: _gen/build-rehber.mjs başındaki açıklama. Akış: components/quranVideo/VideoExportScreen.tsx.
// Düğme adları [[anahtar]] ile uygulamadan gelir; metinde uzun tire yok, Cevşen yok, fiyat yok.
export default {
  title: "Ayetli video yapma: Kur'an ayetlerinden video oluştur",
  desc: "Seçtiğin Kur'an ayetlerinden bir kârînin ya da kendi sesinle video yap: 9:16, 4:5 ya da kare. Video telefonunda hazırlanır; kaydeder, paylaşırsın.",
  h1: "Kur'an ayetlerinden video nasıl yapılır?",
  crumb: "Ayetli video",
  eyebrow: "Adım adım rehber",
  lead: "Manevi Halka'da seçtiğin ayetleri sesiyle ve bir sahneyle videoya dönüştürürsün. Tilaveti bir kârîden ya da kendi sesinden, biçimi de paylaşacağın yere göre seçersin: hikâye için tam ekran, akış için gönderi ya da kare. Video telefonunda hazırlanır; sonra kaydeder ya da dilediğin yerde paylaşırsın.",
  meta: ["En çok 90 saniye", "Telefonunda hazırlanır", "Ücretsiz"],
  film: { sahne: "film-video", cap: "Bir video baştan sona: biçimi seç, oluştur, paylaş." },

  kisa: {
    maddeler: [
      "[[tabs.read]] sekmesinden Kur'an'ı aç, [[quranArea.tabListen]] sekmesine geç ve [[tx:quranVideo.entryTitle]] kartındaki [[quranVideo.title]] düğmesine dokun. Okurken bir ayete basılı tutup [[quranVideo.shareAsVideo]] da diyebilirsin.",
      "[[tx:quranVideo.sectionRange]] bölümünde sureyi seç; [[tx:quranVideo.fromAyah]] ve [[tx:quranVideo.toAyah]] ile aralığı belirle.",
      "[[tx:quranVideo.sectionFormat]] bölümünden paylaşacağın yere uygun olanı seç: 9:16, 4:5 ya da 1:1.",
      "[[tx:quranVideo.sectionVoice]] bölümünde bir [[tx:quranVideo.sectionReciter]] seç ya da [[tx:quranVideo.voice.own]] deyip ayetleri kendin oku.",
      "[[quranVideo.make]] düğmesine dokun ve video hazırlanırken uygulamada kal.",
      "[[quranVideo.share]] ile gönder ya da [[quranVideo.saveToPhotos]] ile sakla. Ürettiklerin [[tx:quranVideo.myVideos]] listesinde durur.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Video ekranını aç",
      giris: "Ayetli video, uygulamanın Kur'an bölümündedir. Ekrana iki yoldan gelirsin; ikisi de aynı ekranı açar.",
      adimlar: [
        {
          baslik: "Kur'an'ın Dinle sekmesinden",
          metin: [
            "Alttaki çubukta [[tabs.read]] sekmesine dokun ve Kur'an kartını aç. Kur'an ekranının altındaki kapsülde [[tx:quranArea.tabRead]], [[tx:quranArea.tabListen]], [[tx:quranArea.tabStudy]] ve [[tx:saved.title]] sekmeleri durur; [[tx:quranArea.tabListen]] sekmesine geç.",
            "Dinleme sahnelerinin altındaki [[tx:quranVideo.entryTitle]] kartında [[quranVideo.title]] düğmesine dokun. Bir şey dinliyorsan video okunan ayetten, dinlemiyorsan kaldığın sayfanın ilk ayetinden açılır.",
          ],
          sahne: "video-giris",
        },
        {
          baslik: "Okurken bir ayetten",
          metin: "Kur'an'ı okurken videoya almak istediğin ayete basılı tut. Açılan menünün en altındaki [[tx:quranVideo.shareAsVideo]] satırına dokun; video o ayetten başlar.",
          ipucu: "Bir dinleme sahnesini izlerken sağ üstteki paylaş simgesi de bu ekranı açar. Video, izlediğin sahneyle ve o an okunan ayetle başlar.",
          sahne: "video-ayet",
        },
      ],
    },
    {
      tur: "bolum", id: "hazirla", baslik: "Videonu hazırla",
      giris: "Ekranın üstünde videonun önizlemesi durur. Bir seçeneği değiştirdiğinde önizleme ilk ayeti sessizce baştan oynatır; videonun nasıl görüneceğini oluşturmadan görürsün.",
      adimlar: [
        {
          baslik: "Ayet aralığını seç",
          metin: [
            "[[tx:quranVideo.sectionRange]] bölümünde sure adının yanındaki [[ol:quranVideo.change]] ile başka bir sure seçersin. [[tx:quranVideo.fromAyah]] ve [[tx:quranVideo.toAyah]] kutularındaki eksi ve artı ile aralığı daraltır ya da genişletirsin.",
            "Önizlemenin altında videonun yaklaşık süresi ve ayet sayısı yazar, örneğin “Yaklaşık 0:29 · 2 âyet”.",
          ],
          ipucu: "Bir video en çok 90 saniye ya da 30 ayet olur. Daha uzun bir bölüm için birkaç video yapabilirsin. WhatsApp durumu en çok 60 saniyelik video alır; süre bunu geçince ekran bunu hatırlatır.",
          sahne: "video-aralik",
        },
        {
          baslik: "Biçimi seç",
          metin: "[[tx:quranVideo.sectionFormat]] bölümünde üç kart var. Her yeni video 9:16 ile açılır:",
          liste: [
            "**9:16** [[tx:quranVideo.formatName.tall]]: hikâye, durum ve kısa videolar için; ekranı baştan sona doldurur.",
            "**4:5** [[tx:quranVideo.formatName.portrait]]: Instagram ve Facebook akışındaki gönderiler için.",
            "**1:1** [[tx:quranVideo.formatName.square]]: kare gönderi için; her akışta ve sohbette düzgün durur.",
          ],
          fark: "Önizleme seçtiğin biçimde çizilir. Kısa biçimlerde yazı ve imza orantılı küçülür.",
          sahne: "video-bicim",
        },
        {
          baslik: "Sahneyi ve meali seç",
          metin: [
            "[[tx:quranScenes.sectionStyle]] bölümünde videonun görünümünü seçersin: [[tx:quranScenes.styles.manzara]], [[tx:quranScenes.styles.ink]], [[tx:quranScenes.styles.kubbe]] ya da [[tx:quranScenes.styles.pastel]]. Hemen altında manzarayı, rengi ya da resmi seçersin.",
            "[[tx:quranVideo.sectionMeal]] açıkken ayetin altında meali yazar. Kapatırsan videoda yalnız Arapça metin olur.",
          ],
          ipucu: "Bir manzarayı seçince telefonuna iner; inene kadar alttaki düğme indirmenin yüzdesini gösterir. Manzarayı bir kez indirirsin, sonra internetsiz de çalışır.",
          sahne: "video-sahne",
        },
        {
          baslik: "Kârîyi seç",
          metin: "[[tx:quranVideo.sectionVoice]] bölümünde [[tx:quranVideo.sectionReciter]] seçiliyken kârînin adının yanındaki [[ol:quranVideo.change]] ile listeden başka bir kârî seçersin. Ekran, Kur'an'ı en son dinlediğin kârîyle açılır; burada seçtiğin kârî yalnız bu video için geçerlidir.",
          sahne: "video-kari",
        },
        {
          baslik: "Ya da ayetleri kendi sesinle oku",
          metin: [
            "[[tx:quranVideo.voice.own]] seçeneğine, sonra [[tx:quranVideo.voice.record]] satırına dokun. Kayıt ekranında okuyacağın ayet büyük yazılır.",
            "[[quranVideo.voice.start]] düğmesine dokun ve okumaya başla. Her ayeti bitirince [[quranVideo.voice.next]] de; son ayette düğme [[quranVideo.voice.finish]] olur. Videoda ayetler senin okuduğun yerde değişir. Kaydını dinleyebilir, beğenmezsen [[ol:quranVideo.voice.again]] diyebilirsin.",
          ],
          ipucu: "Kayıt yalnız bu telefonda kalır ve yalnız bu video için kullanılır; video ekranından çıkınca silinir. Ayet aralığını değiştirirsen sesini yeniden kaydedersin.",
          sahne: "video-kendi",
        },
      ],
    },
    {
      tur: "bolum", id: "paylas", baslik: "Oluştur, kaydet ve paylaş",
      giris: "Video telefonunda hazırlanır. Nereye gideceğine sen karar verirsin: bir sohbete, bir hikâyeye ya da yalnız kendi galerine.",
      adimlar: [
        {
          baslik: "Videoyu oluştur",
          metin: [
            "Ekranın altındaki [[quranVideo.make]] düğmesine dokun. Önce ayetlerin sesi, sonra video hazırlanır; çubuk ne kadar kaldığını gösterir.",
            "Hazırlanırken uygulamada kal. Ekran açık kalır; uygulamadan çıkarsan hazırlama durur ve istersen yeniden başlatırsın.",
          ],
          ipucu: "Kârînin sesi internetten alınır. Bu ayetlerin sesi telefonunda varsa, örneğin sureyi çevrimdışı dinlemek için indirdiysen, video internetsiz de hazırlanır.",
          sahne: "video-olustur",
        },
        {
          baslik: "Paylaş ya da kaydet",
          metin: [
            "[[tx:quranVideo.readyTitle]] ekranında video sesiyle oynar. [[quranVideo.share]] düğmesi telefonunun paylaşım penceresini açar; WhatsApp'a, Instagram'a ya da istediğin uygulamaya gönderirsin.",
            "[[quranVideo.saveToPhotos]] videoyu Fotoğraflar'a ekler. Android'de bu düğmenin adı [[quranVideo.saveToGallery]].",
          ],
          fark: "Her videonun altında küçük bir Manevi Halka imzası, kârînin adı ve kaynak satırı yer alır. Kendi sesinle yaptığın videoda kârî adı yazılmaz.",
          sahne: "video-paylas",
        },
        {
          baslik: "Ürettiğin videolara dön",
          metin: "Yaptığın her video [[tx:quranVideo.myVideos]] listesine girer. Listeye [[tx:quranVideo.readyTitle]] ekranındaki düğmeden, video ekranının sağ üstündeki film simgesinden ya da Kur'an'da [[tx:saved.title]] sekmesinin [[tx:quranVideo.tabVideos]] bölümünden gelirsin. Her satırda paylaşma, kaydetme ve silme düğmeleri var; küçük resme dokununca video oynar.",
          ipucu: "Videolar bu telefonda saklanır ve yedeğe girmez; yer azalınca sistem silebilir. Saklamak istediklerini Fotoğraflar'a ya da galeriye kaydet.",
          sahne: "video-liste",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Uygulamada böyle görünür",
      giris: "Bu kareler uygulamanın kendisinden: aynı ayetler, üç biçim.",
      kareler: [
        { img: "v-video", alt: "Video oluştur ekranı: Mülk 1-2, 9:16 Tam ekran seçili, önizlemede ayet ve ay", cap: "9:16 [[tx:quranVideo.formatName.tall]]" },
        { img: "v-45", alt: "Video oluştur ekranı: 4:5 Gönderi seçili, önizleme daha geniş", cap: "4:5 [[tx:quranVideo.formatName.portrait]]" },
        { img: "v-11", alt: "Video oluştur ekranı: 1:1 Kare seçili, kare önizleme", cap: "1:1 [[tx:quranVideo.formatName.square]]" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Ayetli video yapmak ücretli mi?",
        c: "Video oluşturmak, kaydetmek ve paylaşmak ücretsiz; yalnız bazı manzara, kubbe ve resimler Premium'a dahil." },
      { s: "Video en fazla ne kadar uzun olabilir?",
        c: "Bir video en çok 90 saniye ya da 30 ayet olur. Daha uzun bir bölüm için birkaç video yapabilirsin. WhatsApp durumu en çok 60 saniyelik video alır; süre bunu geçerse ekran hatırlatır." },
      { s: "Kendi sesimle okuduğum kayıt nerede kalıyor?",
        c: "Kayıt yalnız bu telefonda kalır ve yalnız o video için kullanılır. Video ekranından çıkınca silinir; yaptığın video ise [[tx:quranVideo.myVideos]] listesinde durur." },
      { s: "Videonun altında ne yazıyor?",
        c: "Küçük bir Manevi Halka imzası, kârînin adı ve kaynak satırı (Quran data provided by Quran.Foundation). Kendi sesinle yaptığın videoda kârî adı yazılmaz. Her ayette sure adı ve ayet numarası sahnenin üstünde görünür." },
      { s: "Videolarım telefonda ne kadar kalır?",
        c: "Videolar bu telefonda saklanır ve yedeğe girmez; yer azalınca sistem silebilir. Saklamak istediklerini Fotoğraflar'a ya da Android'de galeriye kaydet. Paylaştığın kopyalar gönderdiğin yerde kalır." },
      { s: "Android'de de var mı?",
        c: "Evet. Ayetli video iPhone'da ve Android 8.0 ve sonrasında çalışır. Galeriye kaydetme düğmesi Android 10 ve sonrasında görünür; daha eski sürümde videoyu [[quranVideo.share]] ile gönderirsin." },
    ],
  },

  ilgili: ["buyuk", "hatim", "defter"],
  kart: { kicker: "Kur'an", baslik: "Ayetli video yapma", metin: "Seçtiğin ayetlerden kârînin ya da kendi sesinle video yap; kaydet ve paylaş." },
  onizleme: { sahne: "video-kart", adim: 6 },
  cta: { baslik: "İlk ayetli videonu yap", metin: "Manevi Halka'yı ücretsiz indir, Kur'an'da Dinle sekmesini aç, videonu oluştur." },
};
