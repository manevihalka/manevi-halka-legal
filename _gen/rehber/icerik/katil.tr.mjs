// P4 · Davet linkiyle halkaya katılma (TR). Davet alanların destek sayfası (join.html ve halka.html buraya bağlanır).
// Düğme adları [[anahtar]] ile uygulamadan gelir; web sayfalarının (join.html, halka.html) kendi metinleri [[=...]].
// Metinde uzun tire yok, Cevşen yok.
export default {
  title: "Davet linkiyle halkaya nasıl katılırım?",
  desc: "Sana bir hatim ya da zikir daveti mi geldi? Linke dokun, kodu yapıştır ya da QR kodu tara. Uygulaman yoksa tek seferlik halkaya tarayıcıdan katıl.",
  h1: "Davet linkiyle halkaya nasıl katılırım?",
  crumb: "Halkaya katılma",
  eyebrow: "Adım adım rehber",
  lead: "Sana bir hatim ya da zikir daveti geldiyse doğru yerdesin. Uygulaman varsa linke dokunman yeter. Yoksa uygulamayı indirip davet koduyla katılırsın. Tek seferlik bir halkaya tarayıcıdan da katılabilirsin.",
  meta: ["Yaklaşık 1 dakika", "E-posta ve şifre istemez", "Katılmak ücretsiz"],
  film: { sahne: "film-katil", cap: "Linke dokun, [[joinGroup.join]] de, adını yaz. Artık halkadasın." },

  kisa: {
    maddeler: [
      "Uygulaman varsa mesajdaki linke dokun. Davet kartı açılınca [[joinGroup.join]] düğmesine dokun.",
      "İlk kez katılıyorsan adını yaz ve [[nameSheet.confirm]] de. E-posta ya da şifre istenmez.",
      "Uygulaman olduğu hâlde link tarayıcıda açılırsa sayfadaki [[=Uygulamayı Aç]] (tek seferlik halkada [[=Uygulamada aç]]) düğmesine dokun.",
      "Uygulaman yoksa önce indir. Sonra [[tabs.circles]] sekmesinde [[ol:circlesTab.anonJoin]] düğmesine dokun, linki ya da kodu yapıştır ve [[joinGroup.join]] de.",
      "Tek seferlik bir halkanın linki çoğu zaman uygulama olmadan da açılır: tarayıcıda okuyacağın sayfaları alır ya da sayıma katılırsın.",
      "Görevin Ana Sayfa'daki [[tx:dashboard.myTasks]] bölümünde görünür.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "uygulaman-varsa", rol: "Davet alan kişi", baslik: "Uygulaman telefonunda varsa",
      giris: "Davet çoğu zaman WhatsApp ya da SMS ile bir link olarak gelir. Linkin altında çoğu zaman altı karakterlik kısa bir kod da yazar.",
      adimlar: [
        {
          baslik: "Mesajdaki linke dokun",
          metin: [
            "Mesajdaki linke dokun. Uygulama kendiliğinden açılır ve davet kartını gösterir. Kartın üstünde [[tx:join.invite]] yazısı, altında halkanın adı vardır. Tek seferlik bir halkada kartın üstünde [[tx:event.createMenuTitle]] yazar.",
            "Şimdi katılmak istemiyorsan [[tx:join.skip]] diyebilirsin. Link mesajda kalır; sonra yeniden dokunursun.",
          ],
          ipucu: "Link WhatsApp ya da Instagram'ın içinde açılırsa bazen uygulama yerine bir web sayfası görürsün. O sayfadaki [[=Uygulamayı Aç]] (tek seferlik halkada [[=Uygulamada aç]]) düğmesine dokun. Davet kartı uygulamada açılır.",
          sahne: "katil-link",
        },
        {
          baslik: "Katıl'a dokun ve adını yaz",
          metin: [
            "[[joinGroup.join]] düğmesine dokun. Uygulamayı ilk kez kullanıyorsan [[tx:nameSheet.title]] kartı çıkar. Adını yaz ve [[nameSheet.confirm]] de. Halkadakiler seni bu adla görür.",
            "Düzenli bir halkada sonra [[tx:join.welcome]] penceresi gelir; [[common.ok]] deyince halkanın ekranı açılır. Tek seferlik halkada halkanın ekranı doğrudan açılır.",
          ],
          fark: "Katılmak için hesap açman gerekmez. E-posta, şifre ya da telefon numarası istenmez; adını yazman yeter.",
          ipucu: "Bu halkaya zaten katıldıysan [[joinGroup.join]] düğmesine dokununca doğrudan halkanın ekranı açılır.",
          sahne: "katil-katil",
        },
      ],
    },
    {
      tur: "bolum", id: "uygulaman-yoksa", rol: "Davet alan kişi", baslik: "Uygulaman yoksa",
      giris: "Düzenli bir halkanın linkine dokununca tarayıcıda davet sayfası açılır. Uygulamayı indirdikten sonra davet kendiliğinden gelmez: mesajdaki linke bir kez daha dokun ya da kodu uygulamaya gir. Bu yüzden önce kodu not et. Tek seferlik bir halkanın linki ise çoğu zaman halkanın kendi sayfasını açar (aşağıda 7. adım).",
      adimlar: [
        {
          baslik: "Davet sayfasındaki kodu not et, uygulamayı indir",
          metin: [
            "Sayfada [[tx:=Davet Kodu]] kutusunda altı karakterlik bir kod görürsün, örneğin T4X6RC. Kodu bir yere yaz ya da mesajı silme.",
            "Sonra [[ol:=App Store]] ya da [[ol:=Google Play]] düğmesine dokun ve Manevi Halka'yı indir. İndirmek ve halkaya katılmak ücretsizdir.",
          ],
          ipucu: "Kod çoğu zaman mesajın içinde de yazar: linkin altındaki [[tx:group.shortCode]] satırı aynı koddur.",
          sahne: "katil-sayfa",
        },
        {
          baslik: "Uygulamada Halkalar sekmesine gir",
          metin: [
            "Uygulamayı aç ve ilk açılıştaki kısa tanıtımı bitir. Alttaki çubukta [[tabs.circles]] sekmesine dokun. Sonra [[ol:circlesTab.anonJoin]] düğmesine dokun.",
            "Uygulama yalnız adını sorar. Adını yaz ve [[nameSheet.confirm]] de. Ardından [[tx:joinGroup.title]] ekranı açılır.",
          ],
          ipucu: "Uygulamada daha önce adını yazdıysan ya da giriş yaptıysan bu düğmeyi görmezsin. O zaman sağ üstteki **+** düğmesine dokun. Açılan panelde [[tx:dashboard.joinExisting]] satırına dokun.",
          sahne: "katil-kod-giris",
        },
        {
          baslik: "Linki ya da kodu yapıştır, Katıl de",
          metin: [
            "WhatsApp'ta davet mesajına basılı tut ve mesajı kopyala. Sonra uygulamaya dön ve [[ol:common.paste]] düğmesine dokun. Telefonun yapıştırmak için izin isterse izin ver. Uygulama kodu mesajın içinden kendisi bulur. Kodu elle de yazabilirsin.",
            "Sonra [[joinGroup.join]] düğmesine dokun. Doğrudan halkanın ekranı açılır.",
          ],
          fark: "Kutuya linkin tamamını, hatta mesajın hepsini yapıştırabilirsin. Kod arada boşlukla yazılmışsa da tanınır.",
          ipucu: "Kod tutmazsa uygulama şunu yazar: [[tx:joinGroup.notFoundMsg]] O zaman kodu bir daha oku. Kodlarda I ve O harfleri, 0 ve 1 rakamları kullanılmaz.",
          sahne: "katil-kod",
        },
      ],
    },
    {
      tur: "bolum", id: "qr-ve-tarayici", rol: "Davet alan kişi", baslik: "QR kodla ya da tarayıcıdan",
      giris: "Davet camide ya da bir toplantıda ekranda gösterilebilir. Tek seferlik bir halkaya ise uygulama olmadan da katılabilirsin.",
      adimlar: [
        {
          baslik: "QR kodu telefonunun kamerasıyla okut",
          metin: [
            "Halkadaki biri, çoğu zaman yönetici, kendi telefonunda [[tx:group.inviteToCircle]] penceresini açar. Orada bir QR kod vardır. Kendi telefonunun kamerasını aç ve QR koda tut.",
            "Ekranda çıkan bağlantıya dokun. Uygulaman varsa davet kartı açılır; [[joinGroup.join]] de. Uygulaman yoksa davet sayfası açılır; yukarıdaki 3. adımdan devam et.",
          ],
          ipucu: "QR kod düzenli halkaların davet penceresinde bulunur. Tek seferlik halkalarda link ya da kod kullanılır.",
          sahne: "katil-qr",
        },
        {
          baslik: "Tek seferlik halkaya tarayıcıdan katıl",
          metin: [
            "Vefat eden biri için hatim, kandil hatmi ya da toplu salavat gibi tek seferlik bir halkanın linki çoğu zaman uygulama olmadan da açılır ve tarayıcıda halkanın sayfası gelir. Hesap ya da uygulama gerekmez. Sayfada yalnız [[tx:=Davet Kodu]] ve mağaza düğmeleri görürsen bu link uygulama ister; 3. adımdan devam et.",
            "Hatimde [[=Bunu al]] düğmesine dokun. [[=Ne kadar okuyacaksın?]] sorusunda kaç sayfa okuyacağını seç ve [[=Onaylıyorum, alıyorum]] de. Sonra [[=Şimdi oku]] ile sayfaların tarayıcıda açılır. Zikir ya da salavat hedefinde [[=Sayıma katıl]] düğmesine dokun, saydığın kadar daireye dokun ve sonunda [[=Katkımı ekle]] de.",
            "Herkes kendi yerinde okur ya da çeker; sayfa yalnız payları dağıtır ve sayıları toplar. Bazı halkalarda sayfa yalnız halkayı gösterir; o zaman katılmak için uygulama gerekir. Ayrıntılar: [Tek seferlik halka](/tr/rehber/tek-seferlik-halka/) ve [Toplu zikir ve salavat](/tr/rehber/toplu-zikir-salavat/).",
          ],
          fark: "Uygulaması olmayan bir yakının da çoğu zaman linke dokunup payını tarayıcıdan alabilir.",
          ipucu: "Uygulaman varsa ve bu sayfa açıldıysa en alttaki [[=Uygulamada aç]] düğmesine dokun ve uygulamada [[joinGroup.join]] de. Böylece bundan sonra alacağın paylar kendi hesabına yazılır ve [[tx:dashboard.myTasks]] bölümünde görünür.",
          sahne: "katil-web",
        },
      ],
    },
    {
      tur: "bolum", id: "katildiktan-sonra", rol: "Yeni katılan", baslik: "Katıldıktan sonra",
      giris: "Halkanın ekranında iki sekme vardır. [[tx:group.readingsTab]] sekmesinde halkadaki görevler, [[tx:group.membersMenu]] sekmesinde kardeşlerin görünür.",
      adimlar: [
        {
          baslik: "Görevini Ana Sayfa'da bul",
          metin: [
            "Sana bir görev düşünce [[tx:tabs.home]] sekmesindeki [[tx:dashboard.myTasks]] bölümünde bir kart çıkar. Kartta halkanın adı ve sana düşen cüz yazar.",
            "Karta dokunursan görev ekranı açılır. Bildirimlere izin verdiysen yeni görevin hazır olunca telefonuna bildirim de gelir; gece başlayan turun bildirimi sabah gelir.",
          ],
          sahne: "katil-gorev",
        },
        {
          baslik: "Hatim sürüyorsa payın sonraki turda gelir",
          metin: [
            "Halkada süren bir hatim varsa ve tur ortasında katıldıysan, görev ekranında şu yazı çıkar: [[tx:flow.noAssignment]] Bu bir hata değildir.",
            "Cüzler, tur başlarken halkada olanlara dağıtılır. Sıradaki turda sen de listeye girersin ve payın kendiliğinden gelir. Zikir hedefi gibi görevler ise [[tx:dashboard.myTasks]] bölümünde hemen görünür.",
          ],
          ipucu: "Beklemek istemezsen ve havuzda bekleyen pay varsa altta [[tx:flow.noAssignmentPoolCta]] bağlantısı çıkar. İstersen oradan bir pay alırsın.",
          sahne: "katil-sonraki-tur",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Uygulamada böyle görünür",
      giris: "Bu kareler uygulamanın kendisinden.",
      kareler: [
        { img: "h01-home", alt: "Ana Sayfa: Görevlerin bölümünde halka görevleri", cap: "Ana Sayfa: senin görevlerin" },
        { img: "n01-halka", alt: "Halka ekranı: Okumalar sekmesinde halkadaki görevler", cap: "Halka ekranı: halkadaki görevler" },
        { img: "n03b-uyeler", alt: "Üyeler sekmesi: misafir üye, Misafir ekle satırı ve Halkadan ayrıl düğmesi", cap: "Üyeler sekmesi (yöneticinin gördüğü hâli): misafir üye ve [[tx:group.leaveGroup]]" },
        { img: "06c-event-davet", alt: "Tek seferlik halkanın davet kartı: davet kodu, davet linki ve uygulaması olmayanlar için not", cap: "Tek seferlik halka: link uygulamasız da açılır" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Davet linkine dokundum, ne olacak?",
        c: "Uygulaman telefonunda varsa uygulama açılır ve davet kartını gösterir; [[joinGroup.join]] dersin. Uygulaman yoksa tarayıcıda davet sayfası açılır. Orada davet kodu ve uygulamayı indirme düğmeleri vardır. Tek seferlik bir halkanın linki ise çoğu zaman tarayıcıda halkanın kendi sayfasını açar. Sayfada yalnız [[tx:=Davet Kodu]] ve mağaza düğmeleri varsa o halka için uygulama gerekir; 3. adımdan devam et." },
      { s: "Bana kısa kod geldi, nereye yazacağım?",
        c: "Uygulamada [[tabs.circles]] sekmesine gir ve [[ol:circlesTab.anonJoin]] düğmesine dokun. Bu düğmeyi görmüyorsan (daha önce adını yazdıysan ya da giriş yaptıysan) sağ üstteki **+** düğmesine dokun ve [[tx:dashboard.joinExisting]] satırına dokun. Kodu kutuya yaz ve [[joinGroup.join]] de." },
      { s: "Uygulamayı indirmeden katılabilir miyim?",
        c: "Tek seferlik bir halkada çoğu zaman evet: link tarayıcıda açılır, cüz alırsın ya da sayıma katılırsın. Düzenli bir halkada uygulama gerekir. Akıllı telefonu olmayan bir büyüğünü ise yönetici **misafir** olarak ekleyebilir; onun Kur'an payını seçilen sorumlu ya da yönetici işaretler." },
      { s: "Hesap açmam gerekir mi?",
        c: "Hayır. Uygulama yalnız adını sorar; e-posta, şifre ya da telefon numarası istemez. İstersen sonra [[tabs.circles]] ekranının üstündeki [[tx:secure.banner]] şeridine dokunup hesabını Apple, Google ya da e-postayla bağlarsın. Böylece telefonun değişse de halkaların kaybolmaz." },
      { s: "Katıldım, görevimi nerede görürüm?",
        c: "[[tx:tabs.home]] sekmesindeki [[tx:dashboard.myTasks]] bölümünde. Halkanın ekranındaki [[tx:group.readingsTab]] sekmesinde de halkadaki bütün görevler listelenir. Süren bir hatme tur ortasında katıldıysan payın bir sonraki turla gelir." },
      { s: "Halkadan nasıl ayrılırım?",
        c: "Halkanın ekranında sağ üstteki üç noktaya dokun. Açılan listede [[tx:group.leaveGroup]] satırına dokun. Sonraki sayfada neyin değişeceğini görürsün. [[ol:common.leave]] dersen ayrılırsın, [[tx:notice.stayInCircle]] dersen vazgeçersin. Bitirmediğin Kur'an payların havuza bırakılır; halkadakiler oradan alabilir. İstersen sonra aynı kodla yeniden katılabilirsin." },
      { s: "Davet linki ya da kod çalışmıyor, ne yapmalıyım?",
        c: "Linkte sorun varsa uygulama şunu yazar: [[tx:join.invalidLink]] Kodla denediysen şunu yazar: [[tx:joinGroup.notFoundMsg]] Kod yanlış yazılmış ya da halka artık bulunmuyor olabilir. Tek seferlik halkalar süresi bitince kapanır. Linki gönderen kişiden yeni bir link ya da kod iste. Halka dolmuşsa uygulama şunu yazar: [[tx:joinGroup.groupFull]] O zaman yöneticiye haber ver." },
    ],
  },

  ilgili: ["hatim", "tek", "zikir"],
  cta: { baslik: "Uygulamayı şimdi indir", metin: "Halkaya katılmak ücretsiz. İndir, davet linkine dokun, halkana katıl." },
  kart: { kicker: "Katılma", baslik: "Davetle halkaya katılma", metin: "Linke dokun ya da kodu yapıştır. Uygulaman yoksa tek seferlik halkaya tarayıcıdan katıl." },
  onizleme: { sahne: "katil-link", adim: 3 },
};
