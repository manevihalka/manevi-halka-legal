// P3 · Toplu zikir ve salavat hedefi (TR). Biçim: _gen/build-rehber.mjs başındaki açıklama.
// Düğme adları [[anahtar]] ile uygulamadan gelir; metinde uzun tire yok, Cevşen yok.
// 21 Kas 2026: 2.1.0'a göre yenilendi. Akışlar koddan: components/task/TaskComposer.tsx ve ZikirComposer.tsx (yeni kurma ekranı),
// app/zikir-flow/[id].tsx, components/zikir/ZikirCounterModal.tsx (Perde, Sayaç ayarları), app/create-event.tsx (Salavat şablonu),
// app/zikir-listesi/[id].tsx + ZikirListStrandCard.tsx (tesbih ipi), app/niyet-zikri (Halkaya aç).
export default {
  title: "Toplu zikir ve salavat hedefi nasıl kurulur?",
  desc: "Halkanla ortak bir salavat ya da zikir hedefi koy, herkes çektiğini tek sayaca eklesin. Kurulum, sayaç, Perde ve tek seferlik hedef adım adım.",
  h1: "Toplu zikir ve salavat hedefi nasıl kurulur?",
  crumb: "Toplu zikir ve salavat",
  eyebrow: "Adım adım rehber",
  lead: "Halkanda bir zikir hedefi açarsın, örneğin günde 1000 salavat. Herkes kendi yerinde, kendi vaktinde çeker ve sayısını uygulamaya ekler. Uygulama yalnız sayıları toplar; halkanın toplamı herkesin ekranında görünür.",
  meta: ["Kurulum yaklaşık 2 dakika", "E-posta ve şifre istemez", "Ücretsiz"],
  film: { sahne: "film-zikir", cap: "Halka ekranından ortak sayaca: [[group.addTask]], [[tx:compose.typeZikir]], [[tx:wizard.zikirOption2]], Salavat, başlat." },

  kisa: {
    maddeler: [
      "Halkanı aç, sağ alttaki [[group.addTask]] düğmesine dokun ve [[tx:compose.typeZikir]] kartını seç.",
      "[[tx:compose.zikirHow]] satırına dokun ve [[tx:wizard.zikirOption2]] seç: halkanın tek bir sayacı olur.",
      "[[tx:compose.zikirPickOther]] ile [[tx:wizard.zikirPresetSalavat]] ekle. Zikre dokun ve günlük hedefi yaz, örneğin 1000.",
      "Görev adına bak ve [[compose.startTask]] düğmesine dokun.",
      "Herkes görev ekranında karta dokunup sayar ya da [[zikir.bulkAdd]] ile tesbihte çektiğini ekler. Sayım kendiliğinden kaydedilir.",
      "Birkaç güne yayılan büyük bir toplam için tek seferlik halkada [[tx:eventCompose.tplSalavat]] şablonunu seç ve [[eventCompose.cta]] de.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Halkanın yöneticisi", baslik: "Zikir hedefini kur",
      giris: "Zikir hedefi bir halkanın içinde kurulur. Henüz halkan yoksa [Hatim grubu kurma](/tr/rehber/hatim-grubu-kurma/) rehberindeki ilk adımlarla bir halka kur ve kardeşlerini davet et.",
      adimlar: [
        {
          baslik: "Görev ekle'ye dokun, Zikir ve salavat'ı seç",
          metin: [
            "Alttaki çubuktan [[tabs.circles]] sekmesine gir ve halkanı aç. [[tx:group.tasksTab]] sekmesinde sağ alttaki [[group.addTask]] düğmesine dokun.",
            "[[tx:compose.pickTitle]] ekranı açılır. [[tx:compose.sectionZikir]] bölümündeki [[tx:compose.typeZikir]] kartına dokun. Zikir kurma ekranı açılır.",
          ],
          ipucu: "[[group.addTask]] düğmesini halkanın yöneticisi ve moderatörleri görür. Aynı ekranın üstündeki [[tx:compose.quickStart]] şeridinde [[tx:zikirTpl.tesbihat.title]] de var; dokununca liste dolu gelir.",
          sahne: "zikir-gorev-ac",
        },
        {
          baslik: "Nasıl sayılacağını seç",
          metin: "Kurma ekranının üstünde [[tx:compose.zikirHow]] satırı durur. Satıra dokun, alttan bir pencere açılır. Üç seçenek var:",
          liste: [
            "[[tx:wizard.zikirOption1]]: aynı liste herkese gelir, herkes kendi sayısını tutar.",
            "[[tx:wizard.zikirOption2]]: halkanın tek bir sayacı olur. Herkesin çektiği aynı toplama eklenir.",
            "[[tx:wizard.zikirOption3]]: listen ve sayıların yalnız sende kalır.",
          ],
          fark: "Toplu salavat için [[tx:wizard.zikirOption2]] seç ve [[common.ok]] de. Kimse sayısını ayrıca bildirmez, kimse toplamı elle hesaplamaz.",
          sahne: "zikir-havuz",
        },
        {
          baslik: "Zikri ve günlük hedefi seç",
          metin: [
            "Satırın altında [[tx:wizard.zikirPresetSection]] durur. [[tx:zikirTpl.tesbihat.title]] ya da [[tx:zikirTpl.fatima.title]] gibi bir listeye dokunursan zikirleri sayılarıyla birlikte gelir.",
            "Yalnız salavat için [[tx:compose.zikirPickOther]] düğmesine dokun. [[tx:compose.zikirSingles]] listesinde [[tx:wizard.zikirPresetSalavat]] satırına dokun ve [[common.ok]] de. [[tx:wizard.zikirEsmaTitle]] ve [[tx:wizard.zikirCustomAdd]] de aynı sayfada.",
            "Şimdi listedeki zikre dokun. Açılan pencerede halkanın bir günlük ortak hedefini yaz ya da 33, 100, 500, 1000 düğmelerinden birine dokun, sonra [[common.ok]] de. Sayaç her gece yarısı baştan başlar.",
          ],
          ipucu: "Aynı pencerede [[tx:wizard.zikirItemTimeLabel]] satırı var; [[tx:wizard.zikirTimeAllDay]] seçili gelir. [[tx:wizard.zikirTimeMorning]] seçersen o zikir öğle vaktine kadar öne çıkar; öteki vakitte soluk durur ama yine sayılabilir. Listeyi başlatmadan tamamla: ortak havuzda görev başladıktan sonra zikir eklenip çıkarılamaz.",
          sahne: "zikir-salavat",
        },
        {
          baslik: "Göreve bir ad ver ve başlat",
          metin: [
            "[[tx:compose.nameLabel]] kutusu seçimine göre kendiliğinden dolar. İstersen değiştir, örneğin “Ailemizin Salavatı”. Halkadakiler görevi bu adla görür.",
            "En alttaki [[compose.startTask]] düğmesine dokun. [[tx:common.success]] penceresinde [[group.goToTaskScreen]] dersen görev ekranı açılır. Görev halkanın listesine eklenir; halkadakiler onu Ana Sayfa'daki [[tx:dashboard.myTasks]] bölümünde görür.",
          ],
          ipucu: "Kendin saymadan yalnız halkayı izlemek istersen [[tx:compose.more]] kartını aç ve [[tx:wizard.observerModeTitle]] anahtarını aç.",
          sahne: "zikir-baslat",
        },
      ],
    },
    {
      tur: "bolum", id: "say", rol: "Halkadaki herkes", baslik: "Zikrini çek ve ekle",
      giris: "Herkes kendi yerinde, kendi vaktinde çeker. Kimsenin bir araya gelip sesli zikir yapması gerekmez; uygulama yalnız sayıları toplar. Halkaya henüz katılmadıysan önce davet linkine dokun: [Davet linkiyle halkaya katılma](/tr/rehber/halkaya-katilma/).",
      adimlar: [
        {
          baslik: "Göreve gir, sayaca dokun",
          metin: [
            "Ana Sayfa'da [[tx:dashboard.myTasks]] bölümündeki karta dokun. Görev ekranında her zikrin kartı ve altında halkanın o günkü sayısı görünür, örneğin “Ortak: 840 / 1000”.",
            "Karta dokun, sayaç açılır. Ortadaki büyük daireye her dokunuş bir sayar. Dairenin içindeki sayı halkanın toplamıdır; altında [[tx:zikir.counterGroupTotal]] yazar.",
            "Kaydet düğmesi yoktur. Saydıkların kendiliğinden kaydedilir ve altta [[tx:zikir.counterSaved]] yazısı belirir.",
          ],
          fark: "Akşam “kaç oldu?” diye sormana gerek kalmaz: ortak sayı, halkadakilerin ekranında da güncellenir.",
          ipucu: "Halka ekranındaki görev kartında [[event.count]] düğmesi de sayacı doğrudan açar. Yanlış dokunduysan alttaki [[ol:zikir.counterUndo]] düğmesine dokun; son sayım silinir.",
          sahne: "zikir-say",
        },
        {
          baslik: "Tesbihle çektiysen toplu ekle",
          metin: [
            "Zikri tesbihle ya da ezberden çektiysen tek tek dokunman gerekmez. Sayacın altındaki [[zikir.bulkAdd]] düğmesine dokun. Sayaca uzun basmak da aynı pencereyi açar.",
            "+10, +33 ya da +100 düğmesine dokun ya da [[tx:zikir.bulkAddPlaceholder]] kutusuna kendi sayını yazıp [[common.add]] de. Görev ekranının altındaki çubuk, günün ortak toplamını yüzdeyle gösterir.",
          ],
          ipucu: "Ortak sayaç her gün gece yarısı, senin saatinle baştan başlar; bu bir günlük hedeftir. Birkaç güne yayılan tek bir büyük toplam istiyorsan aşağıdaki tek seferlik halkayı kullan.",
          sahne: "zikir-toplu",
        },
        {
          baslik: "Ekrana bakmadan say: Perde ve tesbih görünümü",
          metin: [
            "Sayacın altındaki [[ol:perde.title]] düğmesine dokunursan ekran kararır. Ekranın her yerine dokunarak sayarsın; sayı soluk durur, her dokunuşta telefon hafifçe titrer. Çıkmak için ekrana basılı tut.",
            "Sağ üstteki düğme [[tx:counter.settingsTitle]] penceresini açar. Orada görünümü seçersin: [[tx:counter.modeRing]] ya da [[tx:counter.modeStrand]]. Tesbih görünümünde taneleri parmağınla aşağı çekerek de sayarsın.",
            "Hedef dolunca sayı altın rengine döner. Görevde başka zikir varsa altta [[=Sıradaki]] düğmesi çıkar; ona dokunup devam edersin.",
          ],
          ipucu: "Görev ekranının başlığındaki zile dokunursan kendine bir hatırlatıcı kurarsın. Hatırlatma yalnız bu telefona gelir; o gün halkanın ortak zikrine katıldıysan gelmez.",
          sahne: "zikir-perde",
        },
      ],
    },
    {
      tur: "bolum", id: "tek-seferlik", rol: "Halkayı kuran kişi", baslik: "Bir vesile için tek seferlik hedef",
      giris: "Bir hastaya şifa niyetiyle ya da hayırlı bir vesileyle, belli bir tarihe kadar sürecek büyük bir toplam istiyorsan kalıcı bir halka kurman gerekmez.",
      adimlar: [
        {
          baslik: "Tek seferlik halkada Salavat şablonunu seç",
          metin: [
            "[[tabs.circles]] sekmesinde sağ üstteki **+** düğmesine dokun ve [[tx:event.createMenuTitle]] satırını seç. [[tx:eventCompose.pickTitle]] ekranında [[tx:eventCompose.tplSalavat]] kartına dokun.",
            "Özet ekranı açılır. Hedef 1000 salavattır ve sayım topludur: bütün halka tek hedefe doğru sayar, sayılar bitişe kadar birikir. Hedefi [[tx:compose.rowWhat]] satırından değiştirirsin. [[tx:eventCompose.rowEnd]] satırından bitişi seç ve [[eventCompose.cta]] düğmesine dokun.",
            "[[tx:eventCompose.readyTitle]] ekranında [[eventCompose.invite]] ile bağlantıyı paylaş. Halka hemen başlar.",
          ],
          fark: "Bağlantıya dokunan kişi uygulaması olmasa da tarayıcıda açılan sayfadan ortak sayıma katkı verebilir.",
          ipucu: "Yâsîn, İhlâs ya da başka bir zikir için [[tx:eventCompose.tplCustom]] şablonunu seç; her kalemde [[tx:event.modeCollective]] ya da [[tx:event.modeIndividual]] seçersin. Niyet, tarih ve davet ayrıntıları için: [Tek seferlik halka](/tr/rehber/tek-seferlik-halka/).",
          sahne: "zikir-tek-toplu",
        },
      ],
    },
    {
      tur: "bolum", id: "kendi", rol: "Kendi başına", baslik: "Her gün kendi listenle",
      giris: "Halkadan bağımsız, her gün kendi çektiğin zikirler için [[tx:read.zikirmatikTitle]] var. [[tabs.read]] sekmesinden açılır.",
      adimlar: [
        {
          baslik: "Zikir listeni kur, tesbih ipi dizilsin",
          metin: [
            "[[tx:read.zikirmatikTitle]] ekranında [[tx:zikirList.listsRow]] satırına dokun. Kendi listeni kur ya da hazır listelerden birini listene ekle.",
            "Listede [[tx:zikirDaily.toggleTitle]] anahtarını açarsan liste her gün sıfırdan başlar. Listeyi bitirdiğin her gün üstteki ipe bir tane dizilir; başlıkta kaç gündür çektiğin yazar. Gün, sabah namazı vakti girince döner.",
            "Bir gün kaçarsa ipte boşluk kalır; önceki taneler silinmez. [[tx:zikirList.reminder.title]] satırından bir saat seçersen o saatte telefonuna hatırlatma gelir; o gün listeyi bitirdiysen gelmez.",
          ],
          ipucu: "Büyük bir niyet sayısını günlere yaymak istersen [[tx:read.zikirmatikTitle]] içindeki [[tx:niyet.title]] bölümüne bak. Oradaki [[ol:niyet.openCircle]] düğmesi niyetini tek seferlik halkaya açar; sevdiklerin de katkı verir.",
          sahne: "zikir-ip",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Uygulamada böyle görünür",
      giris: "Bu kareler uygulamanın kendisinden.",
      kareler: [
        { img: "n05b-zikir-gorevim", alt: "Zikir görev ekranı: iki zikir kartında ortak sayılar ve altta ortak toplam yüzde 80", cap: "Görev ekranı: ortak sayılar ve günün toplamı" },
        { img: "ev-sablon", alt: "Tek seferlik halka: Birlikte ne okuyalım? ekranında Hatim, 41 Yâsîn, Salavat ve Kendi listem kartları", cap: "Tek seferlik halka: [[tx:eventCompose.tplSalavat]] şablonu" },
        { img: "z-liste", alt: "Zikir listesi: üstte tesbih ipi kartı, Her gün çekiyorum anahtarı, Hatırlatıcı satırı ve üç zikir", cap: "Kendi listen: tesbih ipi ve hatırlatıcı" },
        { img: "z-sayac", alt: "Sayaç tesbih görünümünde: Arapça zikir, akan taneler ve solda 73 / 100", cap: "Sayaçta tesbih görünümü" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Toplu salavat hedefi nasıl kurulur?",
        c: "Halkanda [[group.addTask]] düğmesine dokun ve [[tx:compose.typeZikir]] kartını seç. [[tx:compose.zikirHow]] satırında [[tx:wizard.zikirOption2]] seç, [[tx:wizard.zikirPresetSalavat]] ekle, günlük hedefi yaz ve [[compose.startTask]] de. Belli bir tarihe kadar sürecek bir hedef için tek seferlik halkada [[tx:eventCompose.tplSalavat]] şablonunu seç. Halka kurmak, zikir hedefi açmak ve katılmak ücretsizdir. Ücretsiz hesapla aynı anda kendi kurduğun bir halkayı yönetebilirsin; başkalarının halkalarına katılmanın sınırı yoktur." },
      { s: "Herkes kendi mi sayar, yoksa tek sayaç mı olur?",
        c: "Sen seçersin. [[tx:compose.zikirHow]] satırında [[tx:wizard.zikirOption1]] seçilirse herkes aynı listeyi kendi sayar. [[tx:wizard.zikirOption2]] seçilirse halkanın tek bir sayacı olur ve herkesin çektiği aynı toplama eklenir. Tek seferlik halkada bu seçim her zikir için ayrıdır: [[tx:event.modeIndividual]] ya da [[tx:event.modeCollective]]." },
      { s: "Ortak sayaç her gün sıfırlanır mı?",
        c: "Düzenli halkadaki ortak havuz günlük bir hedeftir: sayaç her gece yarısı, herkesin kendi saatiyle baştan başlar. Tek seferlik halkada ise toplu sayılan zikrin sayısı, halka başladıktan sonra bitiş tarihine kadar birikir." },
      { s: "Toplu Yâsîn ya da İhlâs okuması nasıl yapılır?",
        c: "Tek seferlik halka kur. Yâsîn için hazır [[tx:eventCompose.tplYasin41]] şablonu var. Başka bir sure ya da sayı için [[tx:eventCompose.tplCustom]] şablonunu seç, sureyi ekle, hedef sayıyı yaz ve [[tx:event.modeCollective]] seç. Kaç adet okunacağına sen karar verirsin; sayının geleneği için bulunduğun yerin âlimine danış." },
      { s: "Uygulaması olmayan da katkı verebilir mi?",
        c: "Tek seferlik halkada evet: halka başladıktan sonra paylaştığın bağlantıya dokunan kişi, tarayıcıda açılan sayfadan [[tx:event.modeCollective]] sayılan zikirlere katkı verir. [[tx:event.modeIndividual]] sayılanlar için uygulama gerekir. Düzenli halkadaki zikir hedefine katılmak için de uygulama gerekir." },
      { s: "Toplu zikir, herkesin bir arada sesli zikir yapması mı demek?",
        c: "Hayır. Herkes kendi yerinde, kendi vaktinde çeker. Uygulama yalnız sayıları toplar ve halkanın toplamını gösterir." },
    ],
  },

  ilgili: ["tek", "katil", "hatim"],
  kart: { kicker: "Zikir", baslik: "Toplu zikir ve salavat", metin: "Tek sayaçta birlikte say: halkanın toplamı herkesin ekranında. Salavat, tesbihat ya da kendi listen." },
  onizleme: { sahne: "zikir-kart", adim: 16 },
};
