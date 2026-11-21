// Dua Defterim (TR). Biçim: _gen/build-rehber.mjs başındaki açıklama. Akış koddan: app/dua-defteri*.tsx, app/prophetic-duas.tsx,
// components/duas/*, lib/duaDefter*.ts. Düğme adları [[anahtar]] ile uygulamadan; uzun tire yok, Cevşen yok, fazilet vaadi yok.
export default {
  title: "Dua defteri: dualarını yaz, bölümlere ayır, hatırlat",
  desc: "Dua Defterim ile dua listeni tut: dualarını bölüm bölüm yaz, ayet, dua ve Esmâ ekle, hatırlatıcı kur, defterini PDF olarak paylaş.",
  h1: "Dua defteri nasıl tutulur? Dua Defterim adım adım",
  crumb: "Dua Defterim",
  eyebrow: "Adım adım rehber",
  lead: "Dua Defterim, kendi dualarını ve sevdiklerin için dualarını yazdığın bir defter. Dualarını bölüm bölüm yazarsın; bir ayeti, hazır bir duayı ya da bir Esmâ'yı ekler, okuma vaktin için hatırlatıcı kurar, defterini PDF olarak paylaşırsın.",
  meta: ["Kurulum gerekmez", "Defterin telefonunda durur", "Ücretsiz"],
  film: { sahne: "film-defter", cap: "Dualar'dan defterine gir, Sevdiklerim bölümüne bir dua yaz, sonra oku." },

  kisa: {
    maddeler: [
      "[[tabs.read]] sekmesinde [[tx:read.duasTitle]] kartına dokun, açılan ekranda [[tx:duaDefter.title]] satırını seç.",
      "Sağ üstteki **+** ile dua ekle: bölümü seç, istersen kimin için olduğunu yaz, duanı yaz ve [[duaDefter.save]] de.",
      "Dualar'da, Kur'an okuyucusunda ya da Esmâü'l-Hüsnâ listesinde [[tx:duaDefter.addFromDua]] diyerek hazır bir metni defterine al.",
      "Bölümün yanındaki [[ol:duaDefter.read]] ile dualarını büyük yazıyla, sırayla oku; sonda [[duaDefter.markPrayed]] de.",
      "Bölümün üç noktasından [[tx:duaDefter.remind]] kur; seçtiğin gün ve saatte okumayı hatırlatır.",
      "Yazdır simgesine dokun, defterini ya da bir bölümünü [[tx:duaDefter.pdfShare]] ile gönder.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "ac", baslik: "Defterini aç",
      giris: "Dua Defterim, [[tx:read.duasTitle]] ekranının içinden açılır; ayrı bir sekme değildir.",
      adimlar: [
        {
          baslik: "Dualar ekranından Dua Defterim'e gir",
          metin: [
            "Alttaki çubukta [[tabs.read]] sekmesine dokun ve [[tx:read.duasTitle]] kartını aç. Arama kutusunun ve [[tx:propheticDuas.halTitle]] halkasının altında [[tx:duaDefter.title]] satırı durur. Ona dokun.",
            "Defterin hazır bölümlerle gelir: [[tx:duaDefter.section.namaz]], [[tx:duaDefter.section.sabah]], [[tx:duaDefter.section.seher]], [[tx:duaDefter.section.yolculuk]], [[tx:duaDefter.section.cuma]], [[tx:duaDefter.section.kadir]] ve [[tx:duaDefter.section.sevdiklerim]]. İlk açılışta hepsi boştur.",
          ],
          ipucu: "Defter namaz vakitlerinde de karşına çıkar: [[tx:prayerDetail.title]] ekranında bir vakti işaretleyince ya da namaz tesbihatını bitirince bir satır [[tx:duaDefter.section.namaz]] bölümünü açar. Teheccüdü işaretleyince de [[tx:duaDefter.section.seher]] bölümü açılır. Bölüm boşsa satır çıkmaz.",
          sahne: "defter-ac",
        },
      ],
    },
    {
      tur: "bolum", id: "yaz", baslik: "Dualarını yaz",
      giris: "Duayı kendi sözlerinle yazabilir ya da uygulamadaki hazır bir metni defterine alabilirsin.",
      adimlar: [
        {
          baslik: "Bir dua ekle",
          metin: "Sağ üstteki **+** düğmesine ya da bir bölümün yanındaki **+** işaretine dokun. Açılan pencerede alanları doldur ve [[duaDefter.save]] de:",
          liste: [
            "[[tx:duaDefter.sectionLabel]]: duanın gireceği bölüm.",
            "[[tx:duaDefter.forLabel]]: “Annem”, “kardeşim Ali” gibi. Boş bırakabilirsin.",
            "[[tx:duaDefter.textLabel]]: duanı kendi sözlerinle yaz ya da kopyaladığın bir metni [[tx:duaDefter.paste]] ile al.",
            "[[tx:duaDefter.moreFields]]: istersen duanın Arapçasını, okunuşunu ve anlamını da yaz.",
          ],
          ipucu: "Bir duaya dokununca düzenlersin: bölümünü değiştirir, yukarı ya da aşağı taşır, paylaşırsın. Basılı tutunca silmek için onay ister; sildikten hemen sonra [[tx:notice.undo]] ile geri alabilirsin.",
          sahne: "defter-yaz",
        },
        {
          baslik: "Ayet, dua ve Esmâ ekle",
          metin: [
            "Hazır bir metni yazman gerekmez. [[tx:read.duasTitle]] ekranında bir duayı açınca altındaki düğmelerden [[tx:duaDefter.addFromDua]] seçeneğine dokun. Kur'an okuyucusunda bir ayete dokununca açılan pencerede ve Esmâü'l-Hüsnâ listesinde de aynı seçenek var.",
            "[[tx:duaDefter.pickSection]] diye sorulur; bölümü seç. Metin kaynağıyla birlikte defterine eklenir.",
          ],
          ipucu: "Aynı metin aynı bölüme iki kez girmez; zaten ekliyse o bölümün satırında [[tx:duaDefter.inDefter]] yazar.",
          sahne: "defter-ekle",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", baslik: "Oku, hatırla, paylaş",
      giris: "Defter yazmak için olduğu kadar dua etmek için de var: bir bölümü baştan sona okur, okuma vaktin için hatırlatıcı kurarsın.",
      adimlar: [
        {
          baslik: "Okumaya başla, sonra Bugün dua ettim de",
          metin: [
            "İçinde dua olan bölümün yanında [[ol:duaDefter.read]] düğmesi durur. Ona dokun: bölümün duaları alt alta, büyük yazıyla açılır. Ayetlerin ve hazır duaların Arapçası, anlamı ve kaynağı da görünür.",
            "Alttaki **A** düğmeleriyle yazıyı küçültüp büyütürsün; [[tx:duaDefter.autoScroll]] sayfayı senin hızında kaydırır. Sona gelince [[duaDefter.markPrayed]] düğmesine dokun.",
          ],
          fark: "Dua ettiğin her gün defterinin üstündeki tesbih ipine bir tane dizilir. Defter kaldığın yeri de hatırlar: bölümü yeniden açınca en son okuduğun duadan başlar.",
          ipucu: "[[tx:duaDefter.section.sevdiklerim]] bölümünün sonunda dua emanetlerindeki kişilerin adları da yazar; [[duaDefter.markPrayed]] deyince onlar için de işaretlenir.",
          sahne: "defter-oku",
        },
        {
          baslik: "Bölümünü düzenle, hatırlatıcı kur",
          metin: [
            "Bölümün yanındaki üç noktaya dokun. Açılan pencerede bölümün adını değiştirir, onu yukarı ya da aşağı taşır, siler ya da [[tx:duaDefter.remind]] kurarsın.",
            "Hatırlatıcıyı aç, [[tx:duaDefter.remindEveryDay]] ya da belli günleri seç, saati ayarla ve [[duaDefter.save]] de. Bölümün altında [[tx:duaDefter.remindOn]] yazar. Bildirim yalnız “Bugün için ayırdığın dualar seni bekliyor.” der.",
          ],
          ipucu: "Bir bölümü silersen içindeki dualar [[tx:duaDefter.section.other]] bölümüne geçer. Kendi bölümünü açmak için listenin altındaki [[ol:duaDefter.newSection]] düğmesine dokun.",
          sahne: "defter-hatirlat",
        },
        {
          baslik: "PDF olarak paylaş ya da yazdır",
          metin: "Sağ üstteki yazdır simgesine dokun. [[tx:duaDefter.pdfTitle]] penceresinde [[tx:duaDefter.pdfAll]] ya da tek bir bölüm seç, sonra [[duaDefter.pdfShare]] ya da [[ol:duaDefter.pdfPrint]] de. Sayfa büyük yazıyla, telefonunda hazırlanır.",
          ipucu: "“Kimin için” yazdığın dualar varsa [[tx:duaDefter.pdfNames]] anahtarı çıkar. Kapalı gelir; adlar yalnız sen açarsan PDF'e girer.",
          sahne: "defter-pdf",
        },
      ],
    },
    {
      tur: "ikili", id: "gecmis", baslik: "Kabul olan dualar, sana emanet edilenler",
      giris: "Defterin iki köşesi daha var: kabul olan duaların hatırası ve senden dua isteyenlerin listesi.",
      kartlar: [
        { baslik: "Geçmiş dualarım", metin: "Bir duaya dokun ve [[tx:duaDefter.archive]] seç. İstersen kısa bir not yaz, örneğin “Elhamdülillah, annem iyileşti.” Dua bölümünden kalkar, [[tx:duaDefter.past]] altında tarihiyle durur; istediğinde geri alırsın." },
        { baslik: "Dua emanetlerim", metin: "Biri senden dua istediğinde adını [[tx:emanet.title]] listesine yaz. Liste defterin altından açılır; vird bitince ve tesbihatın dua anında sana hatırlatılır." },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Uygulamada böyle görünür",
      giris: "Bu kare uygulamanın kendisinden.",
      kareler: [
        { img: "z-defter", alt: "Dua Defterim: tesbih ipi, Bugün dua ettin, Namaz sonu ve Sabah bölümleri, Okumaya başla düğmeleri", cap: "[[tx:duaDefter.title]]: tesbih ipi ve bölümler" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Dua defterim nerede durur?",
        c: "Defterin bu telefonda durur ve yalnız sen görürsün. Bir duayı paylaşmak istersen duaya dokunup [[tx:duaDefter.share]] dersin; bütün defteri PDF olarak gönderebilirsin." },
      { s: "Telefonumu değiştirirsem defterim gelir mi?",
        c: "Defter yalnız bu telefonda tutulur ve hesabınla eşitlenmez. Telefon değiştirmeden önce defterini [[tx:duaDefter.pdfShare]] ile kendine gönderip saklayabilirsin." },
      { s: "Kaç dua yazabilirim?",
        c: "Defterine 300 duaya kadar yazabilir, 30 bölüme kadar açabilirsin." },
      { s: "Arapça bir duayı nasıl eklerim?",
        c: "Dua eklerken [[tx:duaDefter.moreFields]] seçeneğine dokun; Arapçasını, okunuşunu ve anlamını ayrı kutulara yazarsın. Ayetler ve uygulamadaki hazır dualar için yazman gerekmez, [[tx:duaDefter.addFromDua]] ile eklersin." },
      { s: "Dua Defterim'i Niyet Bahçesi'ne bağlayabilir miyim?",
        c: "Evet. Niyet Bahçesi'nde dua niyeti dikersen defterinden dua ettiğin günler ve emanetlerin için dua ettiğini işaretlediğin günler sayılır. Ayrıntılar: [Niyet Bahçesi](/tr/rehber/niyet-bahcesi/)." },
      { s: "Ücretli mi?",
        c: "Dua Defterim'in bütün özellikleri ücretsizdir." },
    ],
  },

  ilgili: ["bahce", "teheccud", "zikir"],
  kart: { kicker: "Dua", baslik: "Dua Defterim", metin: "Dualarını bölüm bölüm yaz, ayet ve Esmâ ekle, hatırlatıcı kur, PDF olarak paylaş." },
  onizleme: { sahne: "defter-kart", adim: 8 },
  cta: { baslik: "Dua defterini başlat", metin: "Manevi Halka'yı ücretsiz indir, Oku ekranında Dualar'dan Dua Defterim'i aç." },
};
