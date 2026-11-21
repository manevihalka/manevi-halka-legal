// Tek seferlik halka (TR). 21 Kas 2026'da 2.1.0 akışına göre baştan yazıldı: şablon seçimi, tek ekranda
// özet (Kimin için, Ne okunacak, Nasıl paylaşılsın, Ne zamana kadar), "Halkan hazır", sekmesiz halka ekranı,
// tamamlanma ve "Aynı halkayı yeniden kur". Genel rehber: vefat yalnız bir örnek bölüm (README madde 5).
// Biçim: _gen/build-rehber.mjs başındaki açıklama. Düğme adları [[anahtar]] ile uygulamadan gelir;
// web sayfasının ve Netice ekranının adları uygulamanın locale dosyalarında olmadığı için [[=yazı]].
export default {
  title: "Tek seferlik halka: toplu hatim ve 41 Yâsîn nasıl kurulur?",
  desc: "Kandil, Ramazan, şifa niyeti ya da vefat eden bir yakın için toplu hatim, 41 Yâsîn veya salavat halkasını tek ekranda kur, bağlantıyı gönder.",
  h1: "Tek seferlik halka: toplu hatim, 41 Yâsîn ve salavat nasıl düzenlenir?",
  crumb: "Tek seferlik halka",
  eyebrow: "Adım adım rehber",
  lead: "Bir kandil gecesi, Ramazan, hasta bir yakının şifası ya da vefat eden biri için sevdiklerinle birlikte hatim indirmek, 41 Yâsîn okumak ya da salavat getirmek isteyebilirsin. Uygulamada bunun için tek seferlik bir halka kurarsın: ne okunacağını seçersin, kimin için olduğunu ve ne zamana kadar süreceğini belirlersin, bağlantıyı gönderirsin. Hepsi tek ekranda, bir dakikada biter.",
  meta: ["Kurulum yaklaşık 1 dakika", "Uygulaması olmayan da katılır", "Ücretsiz"],
  film: { sahne: "film-tek", cap: "Tek akış: şablonu seç, kimin için ve ne zamana kadar olduğunu belirle, [[eventCompose.cta]] de, davet et." },

  kisa: {
    maddeler: [
      "[[tabs.circles]] sekmesinde sağ üstteki **+** düğmesine bas ve [[tx:event.createMenuTitle]] kartına dokun.",
      "[[tx:eventCompose.pickTitle]] ekranında bir şablon seç: [[tx:eventCompose.tplHatim]], [[tx:eventCompose.tplYasin41]], [[tx:eventCompose.tplSalavat]] ya da [[tx:eventCompose.tplCustom]].",
      "Tek ekranlık özette [[tx:eventCompose.rowFor]] ve [[tx:eventCompose.rowEnd]] satırlarına dokunup seç.",
      "Halkaya bir ad ver ve [[eventCompose.cta]] düğmesine dokun. Halka hemen başlar.",
      "[[tx:eventCompose.readyTitle]] ekranında [[eventCompose.invite]] ile bağlantıyı ailene ya da WhatsApp grubuna gönder.",
      "Herkes kendi yerinde okur, uygulama yalnız paylaştırır. Hedefe varınca halka tamamlanır ve katılanlara bildirim gider.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Halkayı kuran kişi", baslik: "Halkayı kur",
      giris: [
        "Tek seferlik halka bir vesile için kurulur: ne okunacağı, kimin için olduğu ve ne zamana kadar süreceği bellidir. Bağlantıyla büyür, hedefe varınca tamamlanır. Bunun için kalıcı bir grup kurman gerekmez.",
        "Ailecek her hafta süren bir hatim istiyorsan düzenli halka daha uygundur: [Hatim grubu kurma](/tr/rehber/hatim-grubu-kurma/).",
      ],
      adimlar: [
        {
          baslik: "Tek seferlik halkayı aç",
          metin: [
            "Uygulamada alttaki [[tabs.circles]] sekmesine dokun ve sağ üstteki yeşil **+** düğmesine bas.",
            "Üstten [[tx:dashboard.addCircle]] penceresi iner. Ortadaki [[tx:event.createMenuTitle]] kartına dokun.",
          ],
          ipucu: "Sağ üstte **+** yoksa uygulamada henüz adını yazmamışsındır. O zaman ortadaki [[ol:circlesTab.anonCreateEvent]] düğmesine dokun; adını yazınca aynı ekran açılır.",
          sahne: "tek-ac",
        },
        {
          baslik: "Ne okunacağını seç",
          metin: "[[tx:eventCompose.pickTitle]] sorusunun altında hazır şablonlar var. Birine dokun, özet ekranı o şablonla dolu açılır:",
          liste: [
            "[[tx:eventCompose.tplHatim]]: Kur'an'ın tamamı 30 cüz olarak havuza konur, herkes istediği cüzü alır.",
            "[[tx:eventCompose.tplYasin41]]: Yâsîn Sûresi halka olarak 41 kez okunur, herkes uygulamanın okuyucusunda okur. Ayrıntısı: [Toplu 41 Yâsîn](/tr/rehber/toplu-41-yasin/).",
            "[[tx:eventCompose.tplSalavat]]: hep birlikte 1.000 salavat; herkesin çektiği ortak sayaca eklenir.",
            "[[tx:eventCompose.tplCustom]]: zikir, dua ya da sure; listeyi ve hedefi sen kurarsın.",
          ],
          ipucu: "Şablon yalnız bir başlangıçtır. Özet ekranında her satırı değiştirebilirsin.",
          sahne: "tek-sablon",
        },
        {
          baslik: "Kimin için olduğunu yaz",
          metin: [
            "Özet ekranının üstündeki [[tx:eventCompose.thisCircle]] kartı halkayı tek bakışta gösterir: adı, ne okunacağı, bitişi ve sağda boncuklu halka. Kartın dibindeki cümle, 10 kişi katılırsa kişi başı ne kadar düşeceğini söyler.",
            "[[tx:eventCompose.rowFor]] satırına dokun. Açılan pencerede üç çip var: [[tx:eventCompose.intentRuh]], [[tx:eventCompose.intentSifa]] ve [[tx:eventCompose.intentVesile]]. Birine dokununca kutu dolar; yazıyı istediğin gibi değiştirebilirsin. Sonra [[common.ok]] de.",
          ],
          ipucu: "Bu satır isteğe bağlıdır. Yazdığın cümle halka ekranının başında durur, davet ettiklerin de görür.",
          sahne: "tek-kimin",
        },
        {
          baslik: "Ne zamana kadar süreceğini seç",
          metin: "[[tx:eventCompose.rowEnd]] satırına dokun ve bir çip seç:",
          liste: [
            "[[tx:eventCompose.endTonight]]: bulunduğun yerde bir sonraki imsak vaktine kadar.",
            "[[tx:eventCompose.endFriday]]: önümüzdeki cuma öğlene, saat 12:00'ye kadar.",
            "[[tx:eventCompose.endDays3]] ya da [[tx:eventCompose.endWeek]]: şu andan itibaren.",
            "Sıradaki kandile kadar, örneğin [[tx:eventCompose.untilKandil.regaib]]: kandil akşamı 20:00'ye kadar. Bu çip kandile 60 günden az kaldığında görünür.",
            "[[tx:eventCompose.endCustom]]: günü ve saati kendin seçersin.",
          ],
          fark: "Çiplerin altında bitiş anı ve kişi başı düşecek pay yazar. Süreyi buna bakarak seçersin.",
          sahne: "tek-bitis",
        },
        {
          baslik: "Hatimde: kapsamı ve paylaşımı kontrol et",
          metin: [
            "Hatimde [[tx:compose.rowWhat]] satırı [[tx:eventCompose.whatQuranFull]] olarak gelir. Yalnız belli cüzler okunacaksa satıra dokun ve [[tx:event.customJuz]] seç.",
            "[[tx:eventCompose.rowShare]] satırında iki yol var:",
          ],
          liste: [
            "[[tx:event.distPool]] (hazır gelir): bütün cüzler havuzda durur, herkes istediğini alır. Sonradan gelen de katılır; halka kurulur kurulmaz başlar.",
            "[[tx:eventCompose.shareDivide]]: paylar katılanlara eşit bölünür. Herkes katılınca halkayı sen başlatırsın, başlayınca katılım kapanır.",
          ],
          fark: "Uygulaması olmayan akrabalar da katılır: [[tx:event.distPool]] seçiliyken bağlantıdan tarayıcıda pay alıp okuyabilirler.",
          sahne: "tek-paylas",
        },
        {
          baslik: "Halkaya ad ver ve aç",
          metin: [
            "[[tx:eventCompose.nameLabel]] kutusunda seçimine göre yazılmış bir ad durur, örneğin [[tx:event.suggestFullHatim]]. İstersen değiştir: “Regaib Kandili Hatmi” gibi.",
            "[[tx:compose.more]] kartında [[tx:compose.rowStart]] satırı [[tx:eventCompose.startNow]] olarak gelir. Halkanın belli bir saatte başlamasını istersen oradan seçersin.",
            "Her şey tamamsa en alttaki [[eventCompose.cta]] düğmesine dokun.",
          ],
          ipucu: "Halka, bitiş tarihinden 24 saat sonra silinir. Süre yetmezse sonradan uzatabilirsin; aşağıda anlatılıyor.",
          sahne: "tek-ac-dugme",
        },
        {
          baslik: "Davet et",
          metin: [
            "[[tx:eventCompose.readyTitle]] ekranı açılır. Halka çoktan başlamıştır: bağlantıyı gönderdiğin herkes hemen payını alabilir.",
            "[[eventCompose.invite]] düğmesine dokun ve WhatsApp grubunuzu ya da kişileri seç. Giden mesaj hazırdır: kimin için olduğu, halkanın adı, bitişi ve bağlantı. [[ol:eventCompose.copyLink]] ile bağlantıyı kendin de yapıştırabilirsin.",
            "Sonra [[tx:eventCompose.goToCircle]] ile halka ekranına geç.",
          ],
          fark: "WhatsApp grubunuz kalsın, bağlantıyı oraya at. Kimin hangi cüzü aldığını ve kaç kez okunduğunu uygulama tutar; ayrıca liste yazman gerekmez.",
          ipucu: "İlk halkanda bir kez [[tx:secureNudge.title]] penceresi çıkabilir. Hesabını Apple, Google ya da e-postayla bağlarsan telefonun değişse de halkan kaybolmaz.",
          sahne: "tek-hazir",
        },
      ],
    },
    {
      tur: "bolum", id: "katil", rol: "Halkaya katılan herkes", baslik: "Katıl ve payını oku",
      giris: "Herkes kendi yerinde okur, uygulama yalnız paylaştırır. Bir araya gelmek gerekmez: kimin ne aldığı ve ne kadarının okunduğu halka ekranında görünür.",
      adimlar: [
        {
          baslik: "Bağlantıyla katıl",
          metin: [
            "Davet bağlantısına dokununca uygulama açılır ve halkanın kartı çıkar: adı, kimin için olduğu, kaç kişinin katıldığı ve bitişi. [[joinGroup.join]] düğmesine dokun. İlk kez katılıyorsan adını yazman yeter.",
            "Bağlantı uygulama yerine tarayıcıda açılırsa ayrıntısı [Davetle halkaya katılma](/tr/rehber/halkaya-katilma/) rehberinde.",
          ],
          sahne: "tek-katil",
        },
        {
          baslik: "Halka ekranını tanı ve bir cüz al",
          metin: [
            "Halka ekranı yukarıdan aşağı okunur. Üstteki kart ne için okunduğunu ve ne kadar kaldığını gösterir: tam okunan cüzler yeşil, alınmış olanlar altın boncuktur; dipte bitişe kalan süre ve kişi başı pay yazar. Altındaki kartta senin yapacağın iş tek, büyük bir düğmededir. Hatimde onun altında [[tx:eventScreen.statusTitle]], en altta davet kartı durur.",
            "[[eventScreen.takeJuz]] düğmesi sıradaki boş cüzü önerir. Dokun ve açılan pencerede [[event.takeWholeCuz]] de; o cüzün sayfaları senin olur. Daha azını okuyacaksan ilk ve son sayfayı yazıp [[ol:event.claimRange]] düğmesine dokun. Başka bir cüz istersen [[tx:eventScreen.statusTitle]] kartında o cüze dokun.",
          ],
          ipucu: "Davet kartı herkese açıktır: halkaya katılan herkes [[eventCompose.invite]] ile başkalarını da çağırabilir.",
          sahne: "tek-cuz",
        },
        {
          baslik: "Oku, sonra Okudum de",
          metin: [
            "Aldığın cüz senin kartında durur. [[eventScreen.continue]] düğmesine dokun; Kur'an senin ilk sayfanda açılır.",
            "Okumayı bitirince geri dön ve [[ol:hatim.markRead]] düğmesine dokun. Açılan pencerede [[event.completeConfirmTitle]] deyince sayfaların okundu sayılır ve halkanın boncuğu dolar.",
          ],
          fark: "Mushaf aramana gerek yok: sana düşen sayfalar uygulamada açılır.",
          ipucu: "Bitişten birkaç saat önce, okundu olarak işaretlenmemiş sayfalar havuza döner ve başkası alıp okuyabilir. Payını vaktinde işaretle.",
          sahne: "tek-oku",
        },
        {
          baslik: "41 Yâsîn ya da salavat halkasında",
          metin: [
            "Sure halkasında senin kartında [[eventCompose.readBtn]] düğmesi var: Yâsîn uygulamanın okuyucusunda kendi sayfalarıyla açılır. Son sayfada [[hatim.markRead]] dersin, halka ekranına dönünce sayaç bir artar. Kitaptan okuduysan [[tx:readTogether.markFromBook]] satırına dokun.",
            "Salavat ya da zikir halkasında aynı yerde [[event.count]] düğmesi sayacı açar; ekrana her dokunuş bir sayar.",
          ],
          ipucu: "Adım adım anlatımları: [Toplu 41 Yâsîn](/tr/rehber/toplu-41-yasin/) ve [Toplu zikir ve salavat](/tr/rehber/toplu-zikir-salavat/).",
          sahne: "yasin-oku",
        },
        {
          baslik: "Uygulaman yoksa: tarayıcıdan katıl",
          metin: [
            "Ortak havuzlu bir hatimde bağlantıya dokunan kişinin tarayıcısında halkanın sayfası açılır. En üstte niyet yazar, altında kaç sayfanın okunduğu görünür.",
            "[[=Sıradaki bölüm]] kartında [[=Bunu al]] düğmesine dokun, kaç sayfa okuyacağını seç ve [[=Onaylıyorum, alıyorum]] de. [[=Şimdi oku]] düğmesi sayfaları tarayıcıda açar; okuyunca sayfaların sonundaki [[=Tamamladım]] düğmesine dokun.",
            "41 Yâsîn, salavat ve zikir halkasında sayfada [[=Sayıma katıl]] düğmesi var: sayacı açar, okuduğunu ya da çektiğini sayarsın ve [[=Katkımı ekle]] dersin.",
          ],
          fark: "Teyzenin telefonunda uygulama yoksa da olur: hesap açmadan, yalnız bağlantıyla payını alıp okur.",
          ipucu: "[[tx:eventCompose.shareDivide]] seçilen hatimde tarayıcıdan dağıtıma katılınmaz; yalnız yetişmeyen paylar havuza açılınca üstlenilebilir.",
          sahne: "tek-web",
        },
      ],
    },
    {
      tur: "ikili", id: "bitis", rol: "Halkayı kuran kişi", baslik: "Süre ve tamamlanma",
      giris: "Halkanın sonunu da uygulama izler: hedefe varınca halkayı tamamlar, haber verir ve sonucu saklar.",
      kartlar: [
        {
          baslik: "Süre yetmezse",
          metin: [
            "Halka ekranında sağ üstteki **···** düğmesine dokun ve [[tx:event.extend24h]] satırını seç. Bitiş 24 saat ileri alınır; gerekirse yeniden basabilirsin.",
            "Aynı menüde [[tx:event.participantsTitle]] ve [[tx:event.editTitle]] da var. Hatimde [[tx:event.releasePool]] alınıp okunmayan payları herkese açar, [[tx:event.addSeriesTitle]] aynı halkada 30 cüzlük yeni bir hatim başlatır.",
          ],
          sahne: "tek-uzat",
        },
        {
          baslik: "Hedefe varınca",
          metin: [
            "Bütün cüzler okununca ya da sayaç hedefe varınca halka kendiliğinden tamamlanır. Ekran açıksa bunu söyleyen kısa bir yazı çıkar; uygulamayı kapatmış olanlara bir bildirim gider.",
            "Halka ekranındaki [[=Neticeyi gör]] düğmesi Halka Neticesi'ni açar: halkanın toplamını ve senin katkını gösterir.",
            "Aynı niyeti her kandilde ya da her cuma tekrarlıyorsan Netice'deki [[=Aynı halkayı yeniden kur]] düğmesine dokun. Kurulum aynı hedef, ad ve kimin için satırıyla açılır; bitişi yeniden seçersin.",
          ],
          sahne: "tek-tamam",
        },
      ],
      not: "Halka, bitiş tarihinden 24 saat sonra silinir. Neticesi sonra da [[tx:tabs.profile]] › [[=Yolculuğum]] › [[=Halkalar]] bölümünde kalır.",
    },
    {
      tur: "ikili", id: "vesileler", rol: "Örnekler", baslik: "Hangi vesilelerle?",
      giris: [
        "Tek seferlik halka herhangi bir vesile için kurulur: bir kandil gecesi ya da Ramazan için hatim, hasta bir yakının şifası niyetiyle 41 Yâsîn ya da salavat, vefat eden bir yakın için hatim, ailede bir düğün ya da hacca giden biri için ortak bir dua.",
        "Adımlar hepsinde aynıdır. Yalnız şablonu, kimin için satırını ve bitişi o vesileye göre seçersin.",
      ],
      kartlar: [
        {
          baslik: "Vefat eden bir yakının için",
          metin: [
            "[[tx:eventCompose.rowFor]] penceresinde [[tx:eventCompose.intentRuh]] çipine dokun ve kutudaki yazıyı istersen değiştir, örneğin “Babamızın ruhuna”. Bu çiple kurulan halkanın davet mesajına “[[tx:eventInvite.fatiha]]” satırı eklenir.",
            "Bitişi ailenin rahatça okuyabileceği bir zamana koy; uygulama belli bir gün önermez. Hatim yerine [[tx:eventCompose.tplYasin41]] ya da [[tx:eventCompose.tplSalavat]] da seçebilirsin.",
            "Herkes kendi cüzünü kendi yerinde okur. Uygulama yalnız cüzleri paylaştırır ve hangisinin okunduğunu gösterir.",
          ],
          sahne: "tek-ruh",
        },
        {
          baslik: "Kandil, Ramazan ve şifa niyeti için",
          metin: [
            "Bir kandil için okunacak hatimde [[tx:eventCompose.rowEnd]] penceresindeki sıradaki kandil çipini seç, örneğin [[tx:eventCompose.untilKandil.regaib]]. Halka kandil akşamına kadar sürer.",
            "Hasta bir yakın için [[tx:eventCompose.intentSifa]] çipi kutuya “[[tx:eventCompose.intentSifaFill]]” yazar. Kısa bir okuma için [[tx:eventCompose.tplYasin41]] ya da [[tx:eventCompose.tplSalavat]] uygundur.",
            "Kalabalık bir cemaatle okuyorsan halka ekranının **···** menüsündeki [[tx:event.addSeriesTitle]] ile aynı halkada birden çok hatim açabilirsin. Ramazan boyunca her gün ya da her hafta süren bir hatim için düzenli halka daha uygundur: [Hatim grubu kurma](/tr/rehber/hatim-grubu-kurma/).",
          ],
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Toplu hatim nasıl yapılır?",
        c: "[[tabs.circles]] sekmesinde **+** düğmesine bas, [[tx:event.createMenuTitle]] kartına ve [[tx:eventCompose.tplHatim]] şablonuna dokun. [[tx:eventCompose.rowFor]] ve [[tx:eventCompose.rowEnd]] satırlarını seç, [[eventCompose.cta]] de ve [[eventCompose.invite]] ile bağlantıyı gönder. Herkes bir cüz alır ve kendi yerinde okur; uygulama yalnız cüzleri paylaştırır." },
      { s: "Tek seferlik halka ile düzenli halka arasındaki fark ne?",
        c: "Tek seferlik halka bir vesile içindir: hedefi ve bitişi vardır, hedefe varınca tamamlanır ve bitişten 24 saat sonra silinir; Neticesi uygulamada kalır. Düzenli halka ise ailen ya da cemaatinle kalıcı bir topluluktur; hatim her gün ya da her hafta yeni bir turla sürer. Ayrıntısı: [Hatim grubu kurma](/tr/rehber/hatim-grubu-kurma/)." },
      { s: "Uygulaması olmayanlar katılabilir mi?",
        c: "Çoğu halkada evet. [[tx:event.distPool]] seçili hatimde bağlantıyı açan kişi tarayıcıda bir bölüm alır ve okur. 41 Yâsîn, salavat ve zikir halkalarında [[tx:event.modeCollective]] sayıma tarayıcıdan katkı verir. Hesap açması gerekmez. [[tx:eventCompose.shareDivide]] seçili hatimde dağıtıma ve [[tx:event.modeIndividual]] sayıma ise uygulamadan katılınır." },
      { s: "Bütün cüzler hatim duasından önce okunamazsa ne olur?",
        c: "Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu bu soruyu cevaplamıştır. Kurul, cüz dağıtılarak hatim yapılabileceğini, okunamayan cüzlerin hatim duasından sonra da okunabileceğini belirtiyor. [Kurulun cevabını oku](https://kurul.diyanet.gov.tr/Cevap-Ara/1112/cuz-dagitilarak-hatim-yapilmasi-mumkun-mudur-dagitilan-cuzlerin-bir-kisminin-hatim-duasindan-sonra-okunmus-olmasi-halinde-hatim-gecerli-midir)." },
      { s: "Halka bitince ne olur?",
        c: "Hedefe varınca halka tamamlanır, katılanlara bildirim gider ve halka ekranındaki [[=Neticeyi gör]] düğmesi sonucu açar. Hedefe varılmadan süre dolarsa halka bitişten 24 saat sonra silinir; o zamana kadar kurucu süreyi 24 saat uzatabilir. Netice silindikten sonra da [[tx:tabs.profile]] › [[=Yolculuğum]] bölümünde kalır." },
      { s: "Ücretli mi?",
        c: "Tek seferlik halka kurmak ve katılmak ücretsizdir. Ücretsiz hesapla aynı anda bir tek seferlik halka yönetebilirsin; o halka tamamlanınca ya da silinince yenisini kurarsın. Katılabileceğin halka sayısında sınır yoktur." },
    ],
  },

  ilgili: ["yasin", "hatim", "katil"],
  kart: { kicker: "Bir vesileyle", baslik: "Tek seferlik halka: bir dakikada kur", metin: "Hatim, 41 Yâsîn ya da salavat seç, kimin için ve ne zamana kadar olduğunu belirle, bağlantıyı gönder." },
  onizleme: { sahne: "tek-kart", adim: 4 },
};
