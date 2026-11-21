// Kaza namazlarım ve oruçlarım (TR). Biçim: _gen/build-rehber.mjs başındaki açıklama.
// Akış koddan: app/kaza/{kurulum,index,gecmis}.tsx, components/kaza/OrucSection.tsx, app/prayer-detail.tsx.
// Fıkıh hükmü yok: sayı, sıra, kefaret konularında hüküm kurulmaz; hesap yardımcısı yalnız tahmin üretir.
// Kayıtlar yalnız bu telefonda (lib/kaza/store.ts, eşitlenmez); kaza sayfası ücretsiz (Premium kapısı yok).
export default {
  title: "Kaza namazı takibi: hesapla, kıldıkça işaretle",
  desc: "Kaza namazlarını ve oruçlarını uygulamada takip et: hesap yardımcısı sayıyı tahmin eder, kıldıkça tane tane işaretlersin. Kayıtlarını yalnız sen görürsün.",
  h1: "Kaza namazı ve orucu takibi nasıl yapılır?",
  crumb: "Kaza namazı ve orucu",
  eyebrow: "Adım adım rehber",
  lead: "Kaza namazlarım ve oruçlarım, kılamadığın namazları ve tutamadığın oruçları kendi hızında tamamlaman için şahsi bir sayfadır. Sayıları bir kez yazarsın, kıldıkça tane tane işaretlersin. Kayıtlarını yalnız sen görürsün.",
  meta: ["Kurulum yaklaşık 2 dakika", "Yalnız sen görürsün", "Ücretsiz"],
  film: { sahne: "film-kaza", cap: "Vaktin yanındaki + ile bir tane, tek dokunuşla bir günün kazası, oruç için [[kaza.oruc.today]]." },

  kisa: {
    maddeler: [
      "Ana Sayfa'daki namaz dairesine dokun, [[prayerDetail.title]] açılır. Aşağıdaki [[kaza.titleBoth]] satırına dokun.",
      "[[kaza.s1.begin]] de ve her vakitten kaç namazın kaldığını yaz. Bilmiyorsan [[ol:kaza.s2.calc]] düğmesi yaklaşık bir sayı çıkarır.",
      "Tutamadığın oruç günlerini aynı ekranda yaz, temponu seç ve [[kaza.s3.finish]] de.",
      "Bir kaza kıldığında o vaktin yanındaki **+** düğmesine dokun. Toplu kıldıysan [[kaza.main.day]] ya da [[ol:kaza.main.some]] düğmesini kullan.",
      "Namazlarım'da işaretlediğin vaktin altındaki [[kaza.bridge.also]] düğmesi, farzın ardından kıldığın kazayı tek dokunuşla yazar.",
      "Kaza orucu tuttuğun gün [[tx:kaza.tabO]] sekmesinde [[kaza.oruc.today]] de. Geçmişte her kaydı görür, düzeltirsin.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kurulum", baslik: "Kaza sayfanı kur",
      giris: "Kurulum üç kısa ekrandır. Sayıları sonra istediğin zaman düzeltebilirsin; ilk seferde tam bilmen gerekmez.",
      adimlar: [
        {
          baslik: "Namazlarım'dan Kaza namazlarım ve oruçlarım'ı aç",
          metin: [
            "Ana Sayfa'daki namaz dairesine dokun, [[prayerDetail.title]] ekranı açılır. [[tx:tabs.explore]] sekmesinin üstündeki tikli daire düğmesi de aynı ekranı açar.",
            "Günün vakitlerinin altındaki [[kaza.titleBoth]] satırına dokun. İlk açılışta kurulum başlar. İlk ekran bu sayfanın yalnız sende olduğunu ve sayıların bir tahmin olduğunu söyler. [[kaza.s1.begin]] düğmesine dokun.",
          ],
          sahne: "kaza-ac",
        },
        {
          baslik: "Her vakitten kaç namaz kaldığını yaz",
          metin: [
            "[[tx:kaza.s2.title]] ekranında sabah, öğle, ikindi, akşam ve yatsı için bildiğin sayıyı yaz. [[tx:kaza.s2.witrToggle]] anahtarı açık gelir; vitri hesaba katmak istemiyorsan kapat.",
            "Tutamadığın oruçlar varsa aynı ekranın altındaki [[tx:kaza.titleO]] kutusuna gün sayısını yaz, yoksa boş bırak. Yalnız namazla, yalnız oruçla ya da ikisiyle birlikte kurabilirsin. Sonra [[kaza.s2.next]] de.",
          ],
          sahne: "kaza-sayilar",
        },
        {
          baslik: "Sayıyı bilmiyorsan hesap yardımcısına sor",
          metin: [
            "[[ol:kaza.s2.calc]] düğmesine dokun. [[tx:kaza.calc.q]] sorusuna yıl ve ay olarak cevap ver. Farklı dönemler varsa [[tx:kaza.calc.addPeriod]] ile ekle. Altta her vakit için yaklaşık bir sayı çıkar; [[kaza.calc.apply]] deyince bu sayı vakitlerin hepsine yazılır.",
            "Kadınlar için isteğe bağlı bir [[tx:kaza.calc.special]] seçeneği de var. Oruç için ayrı bir yardımcı var: [[ol:kaza.s2.fastCalc]] kaç Ramazan tutamadığını sorar.",
          ],
          ipucu: "Yardımcı yalnız bir tahmin üretir: yazdığın süreyi güne çevirir ve yukarı yuvarlar. Kendi durumunu bir hocaya danışabilirsin; uygulamadaki notlar da bunu önerir.",
          sahne: "kaza-hesap",
        },
        {
          baslik: "Temponu seç ve Bismillah de",
          metin: [
            "[[tx:kaza.s3.title]] ekranında üç seçenek var: [[tx:kaza.pace.afterFard]], [[tx:kaza.pace.twoDaily]] ve [[tx:kaza.pace.self]]. Seçtiğin tempoya göre altta yaklaşık bir süre aralığı görünür; hedef tarih konmaz.",
            "İstersen [[tx:kaza.s3.remind]] anahtarını açıp bir saat seç. Hatırlatma kerahat vaktine düşmez, kilit ekranında sayı ya da “kaza” sözü yazmaz. Sonra [[kaza.s3.finish]] düğmesine dokun.",
          ],
          ipucu: "Kurulumun sonunda bir kez, kaza namazlarının Niyet Bahçende bir fidan olarak da büyümesini isteyip istemediğin sorulur. Bahçe yalnız okur, buradaki sayılara dokunmaz. [[ol:kaza.garden.no]] deyip geçebilirsin.",
          sahne: "kaza-tempo",
        },
      ],
    },
    {
      tur: "bolum", id: "isaretle", baslik: "Kıldıkça tane tane işaretle",
      giris: "Ana ekranın üstünde tamamladığın namazların sayısı, altında her vaktin kalanı durur. Her işaret aynı anda iki sayıyı da değiştirir.",
      adimlar: [
        {
          baslik: "Bir kaza kıldın mı, o vaktin + düğmesine dokun",
          metin: [
            "Her vaktin yanında kalan sayı ve bir **+** düğmesi var. Kıldığın kazanın vaktine dokun: kalan bir azalır, üstteki [[tx:kaza.main.doneLabel]] sayısı bir artar. Yanlışlıkla dokunduysan altta beliren çubuktaki [[tx:notice.undo]] ile geri alırsın.",
            "Üst karttaki dizide her tane bir ayın kazasıdır. Kıldıkça taneler dolar; ne kadarını tamamladığını sayı yerine dizide de görürsün.",
          ],
          ipucu: "Sağ üstteki göz düğmesi sayıları gizler. Yanında biri varken ekranı rahatça açarsın.",
          sahne: "kaza-arti",
        },
        {
          baslik: "Bir günün kazasını ya da birkaç taneyi birden yaz",
          metin: [
            "Beş vaktin, vitir açıksa vitrin de birer kazasını kıldıysan [[kaza.main.day]] düğmesine dokun; her vakitten bir tane yazılır.",
            "Toplu kıldıysan [[ol:kaza.main.some]] düğmesine dokun. Açılan pencerede her vakit için sayıyı seç, gerekirse ne zaman kıldığını değiştir ve kaydet. Sayı gün değil, namaz sayısıdır.",
          ],
          sahne: "kaza-birkac",
        },
        {
          baslik: "Namazlarım'da: Kazasını da kıldım",
          metin: "Kaza sayfanı kurduktan sonra [[prayerDetail.title]] ekranında kıldım diye işaretlediğin her vaktin altında [[kaza.bridge.also]] düğmesi çıkar. Farzın ardından o vaktin kazasını da kıldıysan ona dokun. Kaza sayfana o vakitten bir tane yazılır ve düğme [[tx:kaza.bridge.done]] olur.",
          fark: "Kaza sayfasını açmana gerek kalmaz: farzı işaretlediğin yerde kazayı da yazarsın.",
          ipucu: "İşaretlemediğin bir vakit kazaya kendiliğinden yazılmaz.",
          sahne: "kaza-kisayol",
        },
        {
          baslik: "Kaza orucu tuttuğun gün: Bugün tuttum",
          metin: [
            "Üstteki [[tx:kaza.tabO]] sekmesine geç. Kaza orucu tuttuğun gün [[kaza.oruc.today]] düğmesine dokun. Geçmiş günleri [[tx:kaza.oruc.some]] ile takvimden seçersin; takvimde bayram günleri seçilemez.",
            "Dizide her sıra bir Ramazan, her tane bir gündür. İstersen [[tx:kaza.oruc.ramadan]] anahtarını aç: Şaban ayında bir kez hatırlatılır.",
          ],
          sahne: "kaza-oruc",
        },
      ],
    },
    {
      tur: "bolum", id: "gecmis", baslik: "Geçmiş ve düzeltme",
      giris: "Her işaret tarih ve saatiyle saklanır. Yanlış bir kayıt sayıları bozmaz; düzeltmesi kolaydır.",
      adimlar: [
        {
          baslik: "Geçmişte her kaydı gör, düzelt",
          metin: [
            "Ana ekrandaki **Son kayıt** satırına dokun, [[tx:kaza.hist.title]] açılır. Kayıtlar gün gün, saatiyle durur. Birine dokunup düzenleyebilir ya da silebilirsin.",
            "Başlangıçta yazdığın sayıları [[ol:kaza.hist.correct]] ile değiştirirsin; kıldıkların silinmez. Bir şey ters gittiyse [[tx:kaza.hist.restore]] ile son 30 hâlden birine dönersin. Temponu da buradan değiştirirsin.",
          ],
          sahne: "kaza-gecmis",
        },
      ],
    },
    {
      tur: "ekranlar", id: "ekranlar", baslik: "Uygulamada böyle görünür",
      giris: "Bu kareler uygulamanın kendisinden.",
      kareler: [
        { img: "n-kaza", alt: "Kaza namazlarım: Namaz sekmesi, Tamamladıkların 1.381 namaz, yıl dizisi ve vakit vakit kalan sayılar", cap: "Kaza namazlarım: tamamlanan, kalan ve yıl dizisi" },
        { img: "n-namazlarim", alt: "Namazlarım: işaretli vakitlerin altında Kazasını da kıldım düğmesi, altta Kaza namazlarım ve oruçlarım satırı", cap: "Namazlarım: **Kazasını da kıldım** ve kaza satırı" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Kaza kayıtlarımı kim görür?",
        c: "Yalnız sen. Kaza sayfası tamamen şahsidir: kayıtların bu telefonda durur ve halkalarından ayrı tutulur. Sayıları ekranda da gizlemek istersen sağ üstteki göz düğmesine dokun." },
      { s: "Hesap yardımcısı kaç kazam olduğunu kesin söyler mi?",
        c: "Hayır, yalnız bir tahmin üretir. Yazdığın yıl ve ayları güne çevirir ve yukarı yuvarlar. Çıkan sayıyı istediğin gibi değiştirebilirsin. Kendi durumun için bir hocaya danışabilirsin." },
      { s: "Kaza namazlarını sırayla kılmak gerekir mi?",
        c: "Bu soruyu Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu cevaplamış. [Kurulun cevabını oku](https://kurul.diyanet.gov.tr/Cevap-Ara/205/kaza-edilecek-namazlar-arasinda-bir-sira-takip-etmek-sart-midir). Uygulama bir sıra dayatmaz; vakitleri istediğin sırayla işaretlersin." },
      { s: "Telefonumu değiştirirsem ne olur?",
        c: "Kayıtların bu telefonda tutulur. Yeni telefonda kaza sayfasını yeniden kurar, kalan sayılarını yazarsın. Sonradan [[ol:kaza.hist.correct]] ile her zaman düzeltebilirsin." },
      { s: "Kefaret ve fidye de bu sayaca girer mi?",
        c: "Hayır, oruç sekmesi yalnız kaza oruçlarını sayar. Kaza, kefaret ve fidye arasındaki fark için oruç sekmesinin altındaki [[tx:kaza.oruc.info]] notuna bakabilirsin." },
      { s: "Ücretli mi?",
        c: "Hayır. Kaza namazlarım ve oruçlarım ücretsizdir." },
    ],
  },

  ilgili: ["teheccud", "bahce", "oruc"],
  kart: { kicker: "Kaza", baslik: "Kaza namazı ve orucu takibi", metin: "Sayını bir kez yaz, kıldıkça tane tane işaretle. Kayıtlarını yalnız sen görürsün." },
  onizleme: { sahne: "kaza-kart", adim: 5 },
  cta: { baslik: "Kaza sayfanı bugün kur", metin: "Manevi Halka'yı ücretsiz indir, Namazlarım'dan kaza sayfanı aç, sayılarını yaz." },
};
