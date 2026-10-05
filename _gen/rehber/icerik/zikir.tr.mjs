// P3 · Toplu zikir ve salavat hedefi (TR). Biçim: _gen/build-rehber.mjs başındaki açıklama.
// Düğme adları [[anahtar]] ile uygulamadan gelir; metinde uzun tire yok, Cevşen yok.
// Akışlar koddan: components/Wizard.tsx (zikir yolu), app/zikir-flow/[id].tsx, components/zikir/ZikirCounterModal.tsx,
// app/create-event.tsx (Tek Seferlik Halka, Bireysel/Toplu).
export default {
  title: "Toplu zikir ve salavat hedefi nasıl kurulur?",
  desc: "Halkanla ortak bir salavat ya da zikir hedefi koy, herkes çektiğini tek sayaca eklesin. Yâsîn ve İhlâs okumaları için de adım adım anlatım.",
  h1: "Toplu zikir ve salavat hedefi nasıl kurulur?",
  crumb: "Toplu zikir ve salavat",
  eyebrow: "Adım adım rehber",
  lead: "Halkanda bir zikir hedefi açarsın, örneğin günde 1000 salavat. Herkes kendi yerinde, kendi vaktinde çeker ve sayısını uygulamaya ekler. Uygulama yalnız sayıları toplar; halkanın toplamı herkesin ekranında görünür.",
  meta: ["Kurulum yaklaşık 2 dakika", "E-posta ve şifre istemez", "Ücretsiz"],
  film: { sahne: "film-zikir", cap: "Halka ekranından ortak sayaca: Zikir, Ortak Havuz, Salavat, başlat." },

  kisa: {
    maddeler: [
      "Halkanı aç, sağ alttaki **+** düğmesine dokun ve [[tx:wizard.goalZikir]] kartını seç.",
      "[[tx:wizard.zikirModeQuestion]] ekranında [[tx:wizard.zikirOption2]] seçeneğini seç: halkanın tek bir sayacı olur.",
      "[[tx:wizard.zikirPresetSection]] içinden [[tx:wizard.zikirPresetSalavat]] satırına dokun, hedef sayıyı yaz ve [[wizard.zikirAdd]] de.",
      "Göreve bir ad ver ve [[wizard.startCollectiveGoal]] düğmesine dokun.",
      "Herkes görev ekranında karta dokunup sayar ya da [[zikir.bulkAdd]] ile tesbihte çektiğini ekler. Sayım kendiliğinden kaydedilir.",
      "Birkaç güne yayılan büyük bir toplam için Tek Seferlik Halka kur, zikri [[tx:event.modeCollective]] olarak işaretle ve halkayı başlat.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Halkanın yöneticisi", baslik: "Zikir hedefini kur",
      giris: "Zikir hedefi bir halkanın içinde kurulur. Henüz halkan yoksa [Hatim grubu kurma](/tr/rehber/hatim-grubu-kurma/) rehberindeki ilk adımlarla bir halka kur ve kardeşlerini davet et.",
      adimlar: [
        {
          baslik: "Halka ekranında + düğmesine dokun, Zikir'i seç",
          metin: [
            "Alttaki çubuktan [[tabs.circles]] sekmesine gir ve halkanı aç. [[tx:group.readingsTab]] sekmesinde sağ alttaki yuvarlak **+** düğmesine dokun.",
            "[[tx:wizard.goalTypeQuestion]] ekranı açılır. [[tx:practice.sectionReadings]] altındaki [[tx:wizard.goalZikir]] kartına dokun.",
          ],
          ipucu: "Yeni kurduğun halkada [[tx:group.welcome.title]] kartındaki [[group.welcome.step2Btn]] düğmesi de aynı ekranı açar. **+** düğmesini halkanın yöneticisi ve moderatörü görür.",
          sahne: "zikir-gorev-ac",
        },
        {
          baslik: "Ortak Havuz'u seç",
          metin: "Uygulama sayımın nasıl tutulacağını sorar. Üç seçenek var:",
          liste: [
            "[[tx:wizard.zikirOption1]]: aynı liste herkese gelir, herkes kendi sayısını tutar.",
            "[[tx:wizard.zikirOption2]]: halkanın tek bir sayacı olur. Herkesin çektiği aynı toplama eklenir.",
            "[[tx:wizard.zikirOption3]]: listen ve sayıların yalnız sende kalır.",
          ],
          fark: "Toplu salavat için [[tx:wizard.zikirOption2]] kartına dokun, sonra [[wizard.continue]] de. Kimse sayısını ayrıca bildirmez, kimse toplamı elle hesaplamaz.",
          sahne: "zikir-havuz",
        },
        {
          baslik: "Zikri ve hedef sayısını seç",
          metin: [
            "[[tx:wizard.zikirPresetSection]] bölümünde [[tx:wizard.zikirPresetSalavat]] satırına dokun. Alttan bir pencere açılır. Sayıya dokun ve halkanın bir günlük ortak hedefini yaz, örneğin 1000. Sayaç her gece yarısı baştan başlar. Sonra [[wizard.zikirAdd]] düğmesine dokun.",
            "İstersen başka zikirler de ekle: [[tx:wizard.zikirPresetIstigfar]], [[tx:wizard.zikirPresetKelime]], [[tx:wizard.zikirEsmaTitle]] ya da [[tx:wizard.zikirCustomAdd]] ile kendi zikrin. Seçtiklerin listenin altında görünür. Listeyi burada tamamla: ortak havuzda görev başladıktan sonra zikir eklenip çıkarılamaz. Bitince [[wizard.continue]] de.",
          ],
          ipucu: "Aynı pencerede [[tx:wizard.zikirItemTimeLabel]] satırı var; [[tx:wizard.zikirTimeAllDay]] seçili gelir ve bu seçim her zikir için ayrıdır. [[tx:wizard.zikirTimeMorning]] seçersen o zikir öğle vaktine kadar öne çıkar; öteki vakitte soluk durur ama yine sayılabilir.",
          sahne: "zikir-salavat",
        },
        {
          baslik: "Göreve bir ad ver ve başlat",
          metin: [
            "[[tx:wizard.circleTitle]] kutusuna bir ad yaz, örneğin “Cuma Salavatı”. [[wizard.startCollectiveGoal]] düğmesine dokun.",
            "[[tx:common.success]] penceresinde [[group.goToTaskScreen]] düğmesine dokunursan görev ekranı açılır. Görev halkanın listesine eklenir; halkadakiler görevi Ana Sayfa'daki [[tx:dashboard.myTasks]] bölümünde görür.",
          ],
          ipucu: "Kendin saymadan yalnız halkayı izlemek istersen başlatmadan önce [[tx:wizard.observerModeTitle]] anahtarını açabilirsin.",
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
          ipucu: "Yanlış dokunduysan alttaki [[ol:zikir.counterUndo]] düğmesine dokun; son sayım silinir.",
          sahne: "zikir-say",
        },
        {
          baslik: "Tesbihle çektiysen toplu ekle",
          metin: [
            "Zikri tesbihle ya da ezberden çektiysen tek tek dokunman gerekmez. Sayacın altındaki [[zikir.bulkAdd]] düğmesine dokun. Sayaca uzun basmak da aynı pencereyi açar.",
            "+10, +33 ya da +100 seçeneğine dokun, ya da [[tx:zikir.bulkAddPlaceholder]] kutusuna kendi sayını yazıp [[common.add]] de. Görev ekranının altındaki çubuk, günün ortak toplamını yüzdeyle gösterir.",
          ],
          ipucu: "Ortak sayaç her gün gece yarısı, senin saatinle baştan başlar; bu bir günlük hedeftir. Birkaç güne yayılan tek bir büyük toplam istiyorsan aşağıdaki tek seferlik halkayı kullan.",
          sahne: "zikir-toplu",
        },
      ],
    },
    {
      tur: "bolum", id: "tek-seferlik", rol: "Halkayı kuran kişi", baslik: "Bir vesile için tek seferlik hedef",
      giris: "Bir kandil gecesi ya da vefat eden biri için salavat gibi, belli bir tarihe kadar sürecek büyük bir toplam istiyorsan kalıcı bir halka kurman gerekmez.",
      adimlar: [
        {
          baslik: "Tek Seferlik Halka'da Toplu sayımı seç",
          metin: [
            "[[tabs.circles]] sekmesinde sağ üstteki **+** düğmesine dokun ve [[tx:event.createMenuTitle]] kartını seç. Tür olarak [[tx:event.typeZikir]] seç ve [[common.continue]] de.",
            "Sağ üstte **+** görmüyorsan uygulamada henüz adın kayıtlı değildir. Aynı ekrandaki [[ol:circlesTab.anonJoin]] düğmesine dokun ve adını yaz. Sonra geri dön; **+** düğmesi belirir.",
            "[[tx:event.zikirGoalTitle]] adımında [[=Salavât-ı Şerîfe]] çipine dokun. [[tx:event.target]] kutusuna halkanın toplam hedefini yaz, örneğin 10.000. Sonra [[tx:event.modeCollective]] seçeneğine dokun.",
            "[[tx:event.modeCollective]] seçilen zikirde bütün halka tek hedefe doğru sayar ve sayılar bitiş tarihine kadar birikir. [[tx:event.modeIndividual]] seçersen herkes kendi hedefini tamamlar.",
            "Sonraki adımlarda bitiş tarihini seç, halkaya bir ad ver ve [[event.create]] düğmesine dokun. Halka ekranında [[event.inviteFriends]] ile davet linkini paylaş.",
            "Sayım halka başlayınca açılır. Kardeşlerin katılınca halka ekranında [[event.startNow]] düğmesine dokun ve açılan pencerede yine [[event.startNow]] de. İstersen kurarken [[tx:event.registrationWindowToggle]] kutusunu işaretle; halka seçtiğin saatte kendiliğinden başlar.",
          ],
          fark: "Halka ekranındaki [[event.inviteFriends]] düğmesiyle paylaştığın linke dokunan kişi, uygulaması olmasa da tarayıcıda açılan sayfadan sayıma katkı verebilir. Bu yalnız [[tx:event.modeCollective]] seçilen zikirlerde ve halka başladıktan sonra olur.",
          ipucu: "Tarih, davet ve ithaf ayrıntıları için: [Tek seferlik halka](/tr/rehber/tek-seferlik-halka/).",
          sahne: "zikir-tek-toplu",
        },
        {
          baslik: "Yâsîn ya da İhlâs okuması için Dua / Sure türünü seç",
          metin: [
            "Tek Seferlik Halka'nın ilk adımında tür olarak [[tx:event.typeDua]] seç. [[tx:event.duaGoalTitle]] adımındaki hazır listede [[=Yâsîn Sûresi]] ve [[=İhlâs Sûresi]] de vardır. [[tx:event.target]] kutusuna halkanın okuyacağı toplam sayıyı yaz ve [[tx:event.modeCollective]] seç.",
            "Herkes okudukça kendi okuduğunu sayaca ekler; toplam herkesin ekranında görünür. Kaç adet okunacağına sen karar verirsin; sayının geleneği için bulunduğun yerin âlimine danış.",
          ],
        },
      ],
    },
    {
      tur: "bolum", id: "ameller", rol: "Halkanın yöneticisi", baslik: "Sayı değil, gün işaretlemek istersen",
      giris: "Her gün aynı sureyi ya da duayı okumak, vakitleri birlikte takip etmek gibi işler için sayaç yerine günlük işaret vardır.",
      adimlar: [
        {
          baslik: "Ortak Ameller bölümüne bak",
          metin: [
            "Halka ekranında **+** düğmesine dokunduğunda açılan ekranın altında [[tx:practice.sectionPractices]] bölümü durur: [[tx:practice.typeReading]] (Mülk, Kehf, Yâsîn gibi), [[tx:practice.typeDua]] ve [[tx:practice.typePrayer]].",
            "Burada sayı tutulmaz: herkes kendi ibadetini sürdürür ve o gün yaptığını işaretler. Bu bölümü halkanın yöneticisi görür.",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Uygulamada böyle görünür",
      giris: "Bu kareler uygulamanın kendisinden.",
      kareler: [
        { img: "n05b-zikir-gorevim", alt: "Zikir görev ekranı: iki zikir kartında ortak sayılar ve altta ortak toplam yüzde 80", cap: "Görev ekranı: ortak sayılar ve günün toplamı" },
        { img: "h01-home", alt: "Ana Sayfa: Görevlerin bölümünde Cuma Salavatı kartı, Günlük zikir hedefi yüzde 80", cap: "Ana Sayfa: görev kartı ve günün yüzdesi" },
        { img: "n01-halka", alt: "Halka ekranı: Okumalar sekmesinde zikir, kitap ve Kur'an görevleri, altta Ortak Ameller ve sağ altta + düğmesi", cap: "Halka ekranı: görevler ve sağ alttaki **+** düğmesi" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Toplu salavat hedefi nasıl kurulur?",
        c: "Halkanda sağ alttaki **+** düğmesine dokun, [[tx:wizard.goalZikir]] kartını seç ve [[tx:wizard.zikirOption2]] seçeneğini işaretle. [[tx:wizard.zikirPresetSalavat]] satırına dokun, hedef sayıyı yaz, göreve ad ver ve başlat. Belli bir tarihe kadar sürecek bir hedef için Tek Seferlik Halka kurup zikri [[tx:event.modeCollective]] olarak işaretle, sonra halkayı başlat. Halka kurmak, zikir hedefi açmak ve katılmak ücretsizdir. Ücretsiz hesapla aynı anda kendi kurduğun bir halkayı yönetebilirsin; başkalarının halkalarına katılmanın sınırı yoktur." },
      { s: "Herkes kendi mi sayar, yoksa tek sayaç mı olur?",
        c: "Sen seçersin. [[tx:wizard.zikirOption1]] seçilirse herkes aynı listeyi kendi sayar. [[tx:wizard.zikirOption2]] seçilirse halkanın tek bir sayacı olur ve herkesin çektiği aynı toplama eklenir. Tek seferlik halkada bu seçim her zikir için ayrıdır: [[tx:event.modeIndividual]] ya da [[tx:event.modeCollective]]." },
      { s: "Ortak sayaç her gün sıfırlanır mı?",
        c: "Düzenli halkadaki ortak havuz günlük bir hedeftir: sayaç her gece yarısı, herkesin kendi saatiyle baştan başlar. Tek seferlik halkada ise [[tx:event.modeCollective]] seçilen zikrin sayısı, halka başladıktan sonra bitiş tarihine kadar birikir." },
      { s: "Toplu Yâsîn ya da İhlâs okuması nasıl yapılır?",
        c: "Tek Seferlik Halka kur, tür olarak [[tx:event.typeDua]] seç ve hazır listeden [[=Yâsîn Sûresi]] ya da [[=İhlâs Sûresi]] ekle. Hedef kutusuna toplam sayıyı yaz ve [[tx:event.modeCollective]] seç. Kaç adet okunacağına sen karar verirsin; sayının geleneği için bulunduğun yerin âlimine danış." },
      { s: "Çektiğimi nasıl eklerim?",
        c: "Görev ekranında zikrin kartına dokun; sayaçta her dokunuş bir sayar. Tesbihle çektiysen [[zikir.bulkAdd]] ile +33, +100 gibi bir sayıyı tek seferde ekleyebilirsin. Kaydet düğmesi yoktur, sayım kendiliğinden kaydedilir." },
      { s: "Uygulaması olmayan da katkı verebilir mi?",
        c: "Tek seferlik halkada evet: halka başladıktan sonra, halka ekranındaki [[event.inviteFriends]] ile paylaşılan linke dokunan kişi tarayıcıda açılan sayfadan [[tx:event.modeCollective]] seçilen zikirlere katkı verir. [[tx:event.modeIndividual]] seçilenler için uygulama gerekir. Düzenli halkadaki zikir hedefine katılmak için de uygulama gerekir." },
      { s: "Toplu zikir, herkesin bir arada sesli zikir yapması mı demek?",
        c: "Hayır. Herkes kendi yerinde, kendi vaktinde çeker. Uygulama yalnız sayıları toplar ve halkanın toplamını gösterir." },
    ],
  },

  ilgili: ["hatim", "tek", "katil"],
  kart: { kicker: "Zikir", baslik: "Toplu zikir ve salavat", metin: "Tek sayaçta birlikte say: salavat, zikir, Yâsîn ve İhlâs hedefleri." },
  onizleme: { sahne: "zikir-say", adim: 6 },
};
