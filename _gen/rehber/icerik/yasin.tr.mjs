// Toplu 41 Yâsîn (TR), 21 Kas 2026. Uygulamadaki karşılığı: tek seferlik halkanın "41 Yâsîn" şablonu (2.1.0).
// Gelenek tarafsız ve kısa anlatılır: fazilet vaadi, fıkıh hükmü ve belli gün önerisi yok (README madde 5).
// Web sayfası (halka.html) sure kalemini 2.1.0 yamasından beri (17 Kas 2026, canlı) sayaçla değil tek "Okudum" düğmesiyle alır.
export default {
  title: "Toplu 41 Yâsîn okuma: 41 Yâsîn halkası nasıl kurulur?",
  desc: "Şifa niyetiyle, vefat eden bir yakın ya da bir vesile için toplu 41 Yâsîn okumayı düzenle: herkes payını uygulamada okur, sayaç 41'e birlikte varır.",
  h1: "Toplu 41 Yâsîn nasıl okunur? Adım adım 41 Yâsîn halkası",
  crumb: "Toplu 41 Yâsîn",
  eyebrow: "Adım adım rehber",
  lead: "41 Yâsîn, Yâsîn Sûresi'nin bir topluluk tarafından toplam 41 kez okunmasıdır. Birçok ailede hasta bir yakının şifası, vefat eden biri ya da bir dilek için okunur; okumalar katılanlar arasında bölüşülür. Uygulamada bunun için hazır bir şablon var: kimin için ve ne zamana kadar olduğunu seçersin, bağlantıyı gönderirsin. Herkes Yâsîn'i kendi yerinde okur, uygulama yalnız sayıları toplar.",
  meta: ["Kurulum yaklaşık 1 dakika", "Yâsîn uygulamada açılır", "Ücretsiz"],
  film: { sahne: "film-yasin", cap: "[[tx:eventCompose.tplYasin41]] şablonu, kimin için, [[eventCompose.cta]], davet ve halka ekranı." },

  kisa: {
    maddeler: [
      "[[tabs.circles]] sekmesinde **+** düğmesine bas ve [[tx:event.createMenuTitle]] kartına dokun.",
      "[[tx:eventCompose.pickTitle]] ekranında [[tx:eventCompose.tplYasin41]] şablonunu seç.",
      "[[tx:eventCompose.rowFor]] ve [[tx:eventCompose.rowEnd]] satırlarını seç, [[eventCompose.cta]] de.",
      "[[eventCompose.invite]] ile bağlantıyı ailene ya da WhatsApp grubuna gönder.",
      "Herkes halka ekranında [[eventCompose.readBtn]] düğmesine dokunup Yâsîn'i okur ve son sayfada [[hatim.markRead]] der.",
      "Sayaç 41'e varınca halka tamamlanır, katılanlara bildirim gider.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kur", rol: "Halkayı kuran kişi", baslik: "41 Yâsîn halkasını kur",
      giris: "Halka tek seferliktir: bir hedefi (41 okuma) ve bir bitişi vardır. Hedefe varınca kendiliğinden tamamlanır.",
      adimlar: [
        {
          baslik: "41 Yâsîn şablonunu seç",
          metin: [
            "[[tabs.circles]] sekmesinde sağ üstteki **+** düğmesine bas ve açılan pencerede [[tx:event.createMenuTitle]] kartına dokun.",
            "[[tx:eventCompose.pickTitle]] ekranında [[tx:eventCompose.tplYasin41]] karosuna dokun. Özet ekranı hazır gelir: okunacak olan [[tx:event.presetYasin]], hedef 41, sayım [[tx:event.modeCollective]]. Herkesin okuduğu tek bir sayaçta toplanır.",
          ],
          ipucu: "Sağ üstte **+** yoksa ortadaki [[ol:circlesTab.anonCreateEvent]] düğmesine dokun; adını yazınca aynı ekran açılır.",
          sahne: "yasin-sablon",
        },
        {
          baslik: "Kimin için ve ne zamana kadar",
          metin: [
            "[[tx:eventCompose.rowFor]] satırına dokun. [[tx:eventCompose.intentSifa]] çipi kutuya “[[tx:eventCompose.intentSifaFill]]” yazar; yanında [[tx:eventCompose.intentRuh]] ve [[tx:eventCompose.intentVesile]] da var. Yazıyı değiştirebilir ya da boş bırakabilirsin.",
            "[[tx:eventCompose.rowEnd]] satırı [[tx:eventCompose.endDays3]] olarak gelir. [[tx:eventCompose.endTonight]], [[tx:eventCompose.endFriday]], [[tx:eventCompose.endWeek]], sıradaki kandil ya da [[tx:eventCompose.endCustom]] da seçebilirsin.",
          ],
          fark: "Kartın dibindeki cümle kişi başı payı hesaplar: 10 kişi katılırsa herkes yaklaşık 5 kez okur.",
          sahne: "yasin-kur",
        },
        {
          baslik: "Halkayı aç ve davet et",
          metin: [
            "Halkanın adı [[tx:eventCompose.tplYasin41]] olarak gelir; istersen değiştir. En alttaki [[eventCompose.cta]] düğmesine dokun.",
            "[[tx:eventCompose.readyTitle]] ekranında halka çoktan başlamıştır. [[eventCompose.invite]] düğmesine dokun: giden mesajda kimin için olduğu, halkanın adı, bitişi ve “[[tx:eventInvite.join.surah]]” cümlesiyle bağlantı yazar.",
          ],
          ipucu: "Hedefi değiştirmek istersen özet ekranında [[tx:compose.rowWhat]] satırına dokun. 41 yerine başka bir sayı yazabilir, [[tx:event.modeCollective]] yerine [[tx:event.modeIndividual]] seçebilirsin; o zaman herkes hedefin tamamını kendisi okur.",
          sahne: "yasin-davet",
        },
      ],
    },
    {
      tur: "bolum", id: "oku", rol: "Halkaya katılan herkes", baslik: "Payını oku",
      giris: "Herkes kendi yerinde okur, uygulama yalnız sayıları toplar. Halka ekranında toplam sayı ve senin okuman görünür.",
      adimlar: [
        {
          baslik: "Oku düğmesine dokun, son sayfada Okudum de",
          metin: [
            "Bağlantıya dokunup [[joinGroup.join]] dedikten sonra halka ekranı açılır. Üstteki kartta kimin için okunduğu, kaç Yâsîn okunduğu ve 41 boncuk durur; dipte bitişe kalan süre ve kişi başı kalan pay yazar.",
            "Senin kartındaki [[eventCompose.readBtn]] düğmesine dokun. Yâsîn uygulamanın okuyucusunda kendi sayfalarıyla açılır; düğmenin altında sayfa aralığı ve yaklaşık okuma süresi yazar. Son sayfaya gelince [[hatim.markRead]] düğmesi belirir. Dokunup onaylayınca halka ekranına dönersin ve sayaç bir artar.",
          ],
          fark: "Mushaf aramana gerek yok: Yâsîn'in sayfaları uygulamada açılır.",
          ipucu: "Bağlantı uygulama yerine tarayıcıda açılırsa: [Davetle halkaya katılma](/tr/rehber/halkaya-katilma/).",
          sahne: "yasin-oku",
        },
        {
          baslik: "Kitaptan okuduysan",
          metin: [
            "Yâsîn'i kendi mushafından ya da ezberden okuduysan [[eventCompose.readBtn]] düğmesinin altındaki [[tx:readTogether.markFromBook]] satırına dokun ve onayla. Okuman sayaca bir olarak eklenir.",
            "Birden fazla okuyacaksan her okumadan sonra aynısını yap. Kaç kez okuduğun kartın altında yazar.",
          ],
          ipucu: "Uygulama işaretlemeden önce sorar, çünkü onaylanan okuma sayaçtan geri alınmaz.",
        },
        {
          baslik: "Uygulaman yoksa: tarayıcıdan Okudum de",
          metin: [
            "Bağlantı, uygulaması olmayan birinin telefonunda tarayıcıda açılır. Sayfada [[tx:event.presetYasin]] satırı, toplam sayı ve [[=Okudum]] düğmesi var.",
            "Yâsîn'i kendi mushafından oku, bitince [[=Okudum]] düğmesine bir kez dokun. Okuman halkanın toplamına eklenir; bir daha okursan bir daha dokunursun.",
          ],
          fark: "Hesap açmak gerekmez; bağlantı yeter.",
          ipucu: "Bu yalnız [[tx:event.modeCollective]] sayımda olur. [[tx:event.modeIndividual]] seçilen halkada tarayıcıda [[=Halka üyeleri için]] yazar.",
          sahne: "yasin-web",
        },
      ],
    },
    {
      tur: "ikili", id: "tamam", rol: "Herkes", baslik: "41'e varınca",
      giris: "Sayaç 41'e vardığı an halka kendiliğinden tamamlanır; kimin son okumayı eklediği önemli değildir.",
      kartlar: [
        {
          baslik: "Halka tamamlanır",
          metin: [
            "Üstteki karttaki bütün boncuklar dolar. Ekran açıksa tamamlandığını söyleyen kısa bir yazı çıkar; uygulamayı kapatmış olanlara bir bildirim gider.",
            "[[=Neticeyi gör]] düğmesi halkanın toplamını ve senin katkını gösterir. Halka bitişten 24 saat sonra silinir; Netice [[tx:tabs.profile]] › [[=Yolculuğum]] bölümünde kalır.",
          ],
          sahne: "yasin-tamam",
        },
        {
          baslik: "Süre yetmezse ya da yeniden okunacaksa",
          metin: [
            "Bitiş yaklaşıp 41'e varılmadıysa kurucu halka ekranının **···** menüsünden [[tx:event.extend24h]] seçer; bitiş 24 saat ileri alınır ve herkes okumaya devam eder.",
            "Aynı niyetle yeniden okumak isteyen kurucu, Netice'deki [[=Aynı halkayı yeniden kur]] düğmesine dokunur. Kurulum aynı hedef, ad ve kimin için satırıyla açılır; bitişi yeniden seçer.",
          ],
        },
      ],
    },
    {
      tur: "ekranlar", id: "ornek", baslik: "Örnek: şifa niyetiyle 41 Yâsîn",
      giris: "Aşağıdaki görüntüler uygulamadan. Halka “Hastalarımıza şifa niyetiyle” kuruluyor ve sıradaki kandile kadar sürüyor.",
      kareler: [
        { img: "ev-ozet", alt: "Özet ekranı: Bu halka kartında 41 toplu, Kimin için Hastalarımıza şifa niyetiyle, Ne zamana kadar Regaib Kandili'ne kadar", cap: "Tek ekranda özet ve kişi başı pay" },
        { img: "ev-bitis", alt: "Ne zamana kadar penceresi: Bu gece, Cumaya kadar, 3 gün, 1 hafta, Regaib Kandili'ne kadar ve Başka bir zaman", cap: "Bitiş çipleri: bu geceden sıradaki kandile" },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "41 Yâsîn nedir?",
        c: "Yâsîn Sûresi'nin bir topluluk tarafından toplam 41 kez okunmasına 41 Yâsîn denir. Okumalar katılanlar arasında bölüşülür; birkaç kişi birkaç kez okuyarak 41'e varılır. Çoğunlukla hasta bir yakının şifası, vefat eden biri ya da bir dilek için okunur." },
      { s: "Toplu 41 Yâsîn nasıl okunur?",
        c: "Uygulamada [[tabs.circles]] sekmesinde **+** düğmesine bas, [[tx:event.createMenuTitle]] kartına ve [[tx:eventCompose.tplYasin41]] şablonuna dokun. [[tx:eventCompose.rowFor]] ve [[tx:eventCompose.rowEnd]] satırlarını seç, [[eventCompose.cta]] de ve bağlantıyı gönder. Herkes halka ekranında [[eventCompose.readBtn]] düğmesiyle Yâsîn'i okur; sayaç 41'e varınca halka tamamlanır." },
      { s: "41 kişi bulmak gerekir mi?",
        c: "Uygulamada gerekmez. Sayaç kişi değil okuma sayar: 10 kişi katılırsa herkes yaklaşık 4 ya da 5 kez okur. Halka kartının dibindeki cümle kişi başı kalan payı gösterir." },
      { s: "Yâsîn'i kendi mushafımdan okursam sayaca nasıl eklerim?",
        c: "Halka ekranında [[tx:readTogether.markFromBook]] satırına dokunup onayla; okuman sayaca eklenir. Uygulamanın okuyucusunda okursan son sayfadaki [[hatim.markRead]] düğmesi aynı işi görür." },
      { s: "Uygulaması olmayanlar katılabilir mi?",
        c: "Evet. Bağlantıyı tarayıcıda açan kişi Yâsîn'i kendi mushafından okur ve [[=Okudum]] düğmesine dokunur; hesap açması gerekmez. Bu, sayım [[tx:event.modeCollective]] olduğunda olur." },
      { s: "Ücretli mi?",
        c: "41 Yâsîn halkası kurmak ve katılmak ücretsizdir. Ücretsiz hesapla aynı anda bir tek seferlik halka yönetebilirsin; o halka tamamlanınca ya da silinince yenisini kurarsın." },
    ],
  },

  ilgili: ["tek", "zikir", "katil"],
  kart: { kicker: "Toplu okuma", baslik: "Toplu 41 Yâsîn", metin: "Şifa, vefat ya da bir vesile için 41 Yâsîn halkası kur; herkes Yâsîn'i uygulamada okur, sayaç 41'e varır." },
  onizleme: { sahne: "yasin-kart", adim: 14 },
};
