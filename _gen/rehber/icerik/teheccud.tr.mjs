// Teheccüd alarmı (TR). Biçim: _gen/build-rehber.mjs başındaki açıklama.
// Akış koddan: components/prayer/NightCard.tsx, app/teheccud-alarm.tsx, lib/tahajjudAlarm*.ts, app/prayer-detail.tsx.
// Sessiz mod: iOS 26+ AlarmKit (sessiz ve odak modunda çalar); Android'de yalnız uygulamanın kendi cümlesi ("telefonun alarm
// sesiyle çalar"); iOS 26 öncesi bildirim, sessizde çalmaz. "Bu gece kalkanlar" (halkada paylaşım) bilerek anılmaz.
// Fazilet vaadi yok. Ücretsiz (Premium kapısı yok).
export default {
  title: "Teheccüd alarmı nasıl kurulur? Bu gecenin teheccüd vakti",
  desc: "Namazlarım'daki Teheccüd kartı bu gecenin teheccüd vaktini gösterir. Uyandırma alarmını gecenin son üçte birine ya da istediğin saate kur.",
  h1: "Teheccüd alarmı nasıl kurulur?",
  crumb: "Teheccüd alarmı",
  eyebrow: "Adım adım rehber",
  lead: "Namazlarım'daki Teheccüd kartı bu gecenin teheccüd vaktini gösterir: gecenin son üçte birinden imsaka kadar. Uyandırma alarmını aynı karttan kurarsın. iPhone'da iOS 26 ve sonrasında alarm sessiz modda da çalar.",
  meta: ["Kurulum 1 dakika", "iPhone ve Android", "Ücretsiz"],
  film: { sahne: "film-teheccud", cap: "Nafile takibini aç, Teheccüd kartından alarmı kur; vakit gelince telefonun çalar." },

  kisa: {
    maddeler: [
      "Ana Sayfa'daki namaz dairesine dokun, [[prayerDetail.title]] açılır.",
      "[[tx:prayer.naflSection]] bölümündeki [[tx:prayer.naflTrackToggle]] anahtarını aç. Teheccüd kartı belirir ve bu gecenin teheccüd vaktini gösterir.",
      "Karttaki [[tx:night.alarm]] satırına dokun ve [[tx:tahajjudAlarm.enableTitle]] anahtarını aç.",
      "Saati seç: gecenin son üçte biri, imsaktan belli dakika önce ya da sabit bir saat.",
      "Geceleri seç; [[tx:tahajjudAlarm.preset.all]] hazır gelir. Sıradaki alarmlar listede görünür.",
      "Alarm çalınca [[tx:tahajjudAlarm.snooze]] 10 dakika sonra yeniden çaldırır. Kıldığında karttaki daireye dokun.",
    ],
  },

  govde: [
    {
      tur: "bolum", id: "kart", baslik: "Teheccüd kartını aç",
      giris: "Teheccüd kartı Namazlarım ekranının nafile bölümündedir. Nafile takibini bir kez açman yeter.",
      adimlar: [
        {
          baslik: "Namazlarım'da nafile takibini aç",
          metin: [
            "Ana Sayfa'daki namaz dairesine dokun, [[prayerDetail.title]] ekranı açılır. [[tx:tabs.explore]] sekmesinin üstündeki tikli daire düğmesi de aynı ekranı açar.",
            "Aşağı kaydır. [[tx:prayer.naflSection]] bölümündeki [[tx:prayer.naflTrackToggle]] anahtarını aç. Kuşluk satırının altında Teheccüd kartı belirir.",
          ],
          sahne: "teh-ac",
        },
        {
          baslik: "Bu gecenin teheccüd vaktini gör, kıldığında işaretle",
          metin: [
            "Kartın başında **Bu gece 02:08-06:17** gibi bir saat aralığı yazar. Bu, şehrinin namaz vakitlerine göre gecenin son üçte birinin başından imsaka kadar olan süredir. Namaz vakitlerinde şehir seçili değilse aralık yerine yalnız “Gece” yazar.",
            "Kıldığında kartın sağındaki daireye dokun. İstersen kaç rekat kıldığını 2 ile 12 arasındaki düğmelerden seç; son seçimin hatırlanır. Vitri de takip etmek istersen kartın altındaki [[tx:night.witrToggle]] anahtarını aç.",
          ],
          ipucu: "Kartın en altındaki [[tx:night.guide]] satırı kısa bir rehber açar: vakti, kaç rekat kılındığı, niyet, ne okunduğu ve vitirle ilişkisi.",
          sahne: "teh-kart",
        },
      ],
    },
    {
      tur: "bolum", id: "alarm", baslik: "Uyandırma alarmını kur",
      giris: "iOS 26 ve sonrasında ve Android'de uyandırma alarmı gerçek bir alarm olarak kurulur: vakti gelince telefonun çalar. Ayarları aynı ekranda yaparsın.",
      adimlar: [
        {
          baslik: "Uyandırma alarmı satırına dokun ve alarmı aç",
          metin: [
            "Teheccüd kartındaki [[tx:night.alarm]] satırına dokun. [[tx:tahajjudAlarm.screenTitle]] ekranı açılır. En üstteki [[tx:tahajjudAlarm.enableTitle]] anahtarını aç. iPhone ilk seferde alarm izni ister; izin ver.",
            "Anahtarın altındaki satır alarmın senin telefonunda nasıl çalacağını söyler. iOS 26 ve sonrasında “Sessiz modda ve odak modunda da çalar.” yazar. Android'de alarm telefonun alarm sesiyle çalar. iOS 26'dan eski sürümlerde alarm bildirim olarak gelir ve sessiz modda çalmaz.",
          ],
          ipucu: "Android'de tam zamanlı alarm izni kapalıysa ekranda bir uyarı ve [[tx:tahajjudAlarm.exactFix]] düğmesi çıkar. İzin kapalıyken alarm birkaç dakika gecikebilir.",
          sahne: "teh-alarm-ac",
        },
        {
          baslik: "Saati seç",
          metin: "[[tx:tahajjudAlarm.timeSection]] bölümünde üç seçenek var:",
          liste: [
            "[[tx:prayerTracking.tahajjudModeLastThird]]: kartta gördüğün aralığın başı. Hazır seçili gelir.",
            "[[tx:prayerTracking.tahajjudModeBeforeFajr]]: imsaktan 15, 30, 45, 60, 75 ya da 90 dakika önce.",
            "[[tx:prayerTracking.tahajjudModeFixed]]: istediğin saat, örneğin 03:30.",
          ],
          ipucu: "İlk iki seçenek namaz vakitlerine göre hesaplanır. Namaz vakitlerinde şehir seçili değilse yalnız sabit saat kullanılabilir.",
          sahne: "teh-saat",
        },
        {
          baslik: "Geceleri seç",
          metin: [
            "[[tx:tahajjudAlarm.nightsSection]] bölümünde [[tx:tahajjudAlarm.preset.all]] hazır seçili gelir. İstersen geceleri tek tek seçersin. Gece adı sabahın günüdür: Pazartesi gecesi, Pazar akşamından Pazartesi sabahına uzanan gecedir.",
            "En alttaki [[tx:tahajjudAlarm.upcomingTitle]] listesi, sıradaki alarmların hangi gece ve saat kaçta çalacağını gösterir.",
          ],
          ipucu: "Alarm açıkken Namaz Ayarları'ndaki teheccüd hatırlatıcısı susar, böylece iki kez uyarılmazsın. Alarmı kapatınca hatırlatıcı eski ayarıyla geri gelir.",
          sahne: "teh-geceler",
        },
      ],
    },
    {
      tur: "bolum", id: "caldiginda", baslik: "Alarm çalınca",
      giris: "Alarm vaktinde telefonun “Teheccüd vakti” diye çalar.",
      adimlar: [
        {
          baslik: "Ertele ya da kapat, kıldığında işaretle",
          metin: [
            "[[tx:tahajjudAlarm.snooze]] düğmesi alarmı 10 dakika sonra yeniden çaldırır. Kalktıysan alarmı kapat.",
            "Kıldığında Namazlarım'daki Teheccüd kartında daireye dokun. Kaç gece kıldığın, kartın altındaki nafile özetinde görünür.",
          ],
          ipucu: "Niyet Bahçesi'nde teheccüd niyetin varsa, Namazlarım'da işaretlediğin her gece orada da sayılır.",
          sahne: "teh-caliyor",
        },
      ],
    },
  ],

  sss: {
    sorular: [
      { s: "Teheccüd alarmı sessiz modda çalar mı?",
        c: "iPhone'da iOS 26 ve sonrasında evet: alarm sessiz modda ve odak modunda da çalar. iOS 26'dan eski sürümlerde alarm bildirim olarak gelir ve sessiz modda çalmaz; alarm ekranı bunu kendisi söyler. Android'de alarm telefonun alarm sesiyle çalar." },
      { s: "Teheccüd vakti nasıl hesaplanıyor?",
        c: "Kartta görünen aralık, şehrinin namaz vakitlerine göre akşamdan imsaka kadar olan gecenin son üçte birinin başından imsaka kadardır. Alarmı bu aralığın başına, imsaktan belli dakika önceye ya da sabit bir saate kurabilirsin." },
      { s: "Namaz Ayarları'ndaki teheccüd hatırlatıcısından farkı ne?",
        c: "Hatırlatıcı bir bildirimdir. Uyandırma alarmı ise iOS 26 ve sonrasında ve Android'de gerçek bir alarmdır: telefonun çalar, istersen 10 dakika ertelersin. Alarm açıkken hatırlatıcı susar; alarmı kapatınca hatırlatıcı eski ayarıyla geri gelir." },
      { s: "Alarm her gece çalmaya devam eder mi?",
        c: "Evet, seçtiğin gecelerde. Uygulama alarmları önümüzdeki en çok yedi gece için kurar ve sen uygulamayı açtıkça yeniler. Bu yüzden uygulamayı birkaç günde bir açman yeter." },
      { s: "Şehir seçmeden kullanabilir miyim?",
        c: "Evet, sabit saatle. Gecenin son üçte biri ve imsaktan önce seçenekleri namaz vakitlerinden hesaplandığı için şehir gerekir; şehir yoksa ekran yalnız sabit saati açık bırakır." },
      { s: "Ücretli mi?",
        c: "Hayır. Teheccüd kartı ve uyandırma alarmı ücretsizdir." },
    ],
  },

  ilgili: ["kaza", "defter", "bahce"],
  kart: { kicker: "Teheccüd", baslik: "Teheccüd alarmı", metin: "Bu gecenin teheccüd vaktini gör, uyandırma alarmını kur. iOS 26'da sessiz modda da çalar." },
  onizleme: { sahne: "teheccud-kart", adim: 5 },
  cta: { baslik: "Teheccüd alarmını bu gece kur", metin: "Manevi Halka'yı ücretsiz indir, Namazlarım'da nafile takibini aç, Teheccüd kartından alarmı kur." },
};
