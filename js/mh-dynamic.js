/**
 * manevihalka.app dinamik modulleri — namaz vakitleri, gunun ayeti/hadisi,
 * hicri tarih + dini gunler, koyu tema.
 *
 * VERI KAYNAKLARI (elle metin tutulmaz, drift olmasin):
 *   - data/daily.json + data/cities.json: uygulama reposundaki
 *     scripts/site-export/build-site-data.mjs uretir. Icerik degisirse
 *     script yeniden calistirilir; buradaki dosyalara elle dokunulmaz.
 *   - Vakitler: ezanvakti.emushaf.net (uygulamanin lib/diyanetApi.ts ile
 *     AYNI kaynak; CORS acik, dogrudan tarayicidan cagriliyor). Aladhan
 *     KULLANILMAZ: yuksek enlemde Diyanet'ten 39 dk'ya kadar sapiyor
 *     (uygulamada 4 Agu 2026'da olculdu) — site ile uygulama ayni dakikayi
 *     gostermek zorunda.
 *
 * TASINAN MANTIKLAR (uygulamadaki karsiliklari — davranis birebir):
 *   localDayNumber        <- lib/date.ts (yerel gece yarisinda doner, UTC degil)
 *   hicri cevrim          <- lib/hijri.ts (Kuwaiti tabular)
 *   dini gun cozucu       <- lib/islamicDays.ts (tanimlar daily.json'da)
 *   ayet/hadis rotasyonu  <- lib/dailyAyah.ts + lib/hadiths.ts
 *   Diyanet ilce cozumu   <- lib/diyanetApi.ts (alias tablosu + en-yakin-ilce)
 *   vakit vurgusu         <- PrayerTimes.java / PrayerTimesWidget.swift
 *     (icinde bulunulan vakit vurgulanir; gunes namaz degil; gunes-ogle
 *      arasi kerahat: vurgu yok, etiket "Ogleye kalan")
 *
 * GIZLILIK: GPS koordinati cihazdan CIKMAZ — en yakin sehir tarayicida
 * bulunur, vakit servisine yalniz Diyanet ilce kimligi sorulur.
 */
(function () {
  "use strict";

  var DAY_MS = 86400000;
  var API = "https://ezanvakti.emushaf.net";

  // ── kucuk yardimcilar ─────────────────────────────────────────────────────
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* gizli mod */ } }
  function lsGetJson(k) { try { return JSON.parse(lsGet(k)); } catch (e) { return null; } }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /** lib/date.ts localDayNumber ile AYNI matematik — ayni gun ayni icerik. */
  function localDayNumber(d) {
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY_MS);
  }
  function mod(n, m) { return ((n % m) + m) % m; }

  /** Turkce buyuk harf dile bagli: "i" -> "İ" (CLAUDE.md upperLocale kurali). */
  function upperLoc(s, loc) {
    try { return s.toLocaleUpperCase(loc === "tr" ? "tr-TR" : loc); }
    catch (e) { return s.toUpperCase(); }
  }

  function haversineKm(aLat, aLon, bLat, bLon) {
    var R = 6371;
    var dLat = (bLat - aLat) * Math.PI / 180;
    var dLon = (bLon - aLon) * Math.PI / 180;
    var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(aLat * Math.PI / 180) * Math.cos(bLat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  // ── hicri cevrim (lib/hijri.ts birebir port) ─────────────────────────────
  var HIJRI_MONTHS = {
    tr: ["Muharrem","Safer","Rebiülevvel","Rebiülahir","Cemaziyelevvel","Cemaziyelahir","Recep","Şaban","Ramazan","Şevval","Zilkade","Zilhicce"],
    en: ["Muharram","Safar","Rabi' al-Awwal","Rabi' al-Thani","Jumada al-Awwal","Jumada al-Thani","Rajab","Sha'ban","Ramadan","Shawwal","Dhu al-Qi'dah","Dhu al-Hijjah"],
    de: ["Muharram","Safar","Rabi' al-Awwal","Rabi' al-Thani","Jumada al-Awwal","Jumada al-Thani","Radschab","Scha'ban","Ramadan","Schawwal","Dhu al-Qi'da","Dhu al-Hiddscha"],
    ar: ["محرم","صفر","ربيع الأول","ربيع الآخر","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"],
    fr: ["Mouharram","Safar","Rabi' al-Awwal","Rabi' al-Thani","Joumada al-Awwal","Joumada al-Thani","Rajab","Cha'ban","Ramadan","Chawwal","Dhu al-Qi'da","Dhu al-Hijja"],
  };

  function gregorianToHijri(date) {
    var gDay = date.getDate(), gMonth = date.getMonth() + 1, gYear = date.getFullYear();
    var a = Math.floor((14 - gMonth) / 12);
    var y = gYear + 4800 - a;
    var m = gMonth + 12 * a - 3;
    var jd = gDay + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) -
      Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    var l = jd - 1948440 + 10632;
    var n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    var j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
      Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
    l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
      Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    var hMonth = Math.floor((24 * l) / 709);
    var hDay = l - Math.floor((709 * hMonth) / 24);
    var hYear = 30 * n + j - 30;
    return { day: hDay, month: hMonth, year: hYear };
  }

  function hijriToGregorian(hYear, hMonth, hDay) {
    var jd = Math.floor((11 * hYear + 3) / 30) + 354 * hYear + 30 * hMonth -
      Math.floor((hMonth - 1) / 2) + hDay + 1948440 - 385;
    var l = jd + 68569;
    var nn = Math.floor((4 * l) / 146097);
    l = l - Math.floor((146097 * nn + 3) / 4);
    var i = Math.floor((4000 * (l + 1)) / 1461001);
    l = l - Math.floor((1461 * i) / 4) + 31;
    var j2 = Math.floor((80 * l) / 2447);
    var gDay = l - Math.floor((2447 * j2) / 80);
    l = Math.floor(j2 / 11);
    var gMonth = j2 + 2 - 12 * l;
    var gYear = 100 * (nn - 49) + i + l;
    return new Date(gYear, gMonth - 1, gDay);
  }

  // ── tarih bicimleri (lib/islamicDays.ts formatGregorianLong birebir) ─────
  var GREG_MONTHS_FULL = {
    tr: ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
    en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    de: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
    fr: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
    ar: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
  };
  // Kisa ay adlari (lib/hijri.ts GREG_MONTHS birebir) — takvim hucresi icin.
  // slice(0,3) KULLANMA: Fransizcada Juin/Juillet ikisi de "Jui" oluyordu.
  var GREG_MONTHS_SHORT = {
    tr: ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
    en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    de: ["Jan.","Feb.","März","Apr.","Mai","Juni","Juli","Aug.","Sept.","Okt.","Nov.","Dez."],
    ar: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
    fr: ["Janv.","Févr.","Mars","Avr.","Mai","Juin","Juil.","Août","Sept.","Oct.","Nov.","Déc."],
  };
  var WEEKDAYS_FULL = {
    tr: ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],
    en: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    de: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
    fr: ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],
    ar: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
  };
  function pickLoc(rec, loc) { return rec[loc] || rec.en; }

  function formatGregorianLong(date, loc) {
    var day = date.getDate();
    var month = pickLoc(GREG_MONTHS_FULL, loc)[date.getMonth()];
    var wd = pickLoc(WEEKDAYS_FULL, loc)[date.getDay()];
    switch (loc) {
      case "tr": return day + " " + month + " " + wd;
      case "de": return wd + ", " + day + ". " + month;
      case "fr": return wd + " " + day + " " + month;
      case "ar": return wd + "، " + day + " " + month;
      default: return wd + ", " + day + " " + month;
    }
  }
  function formatHijri(date, loc) {
    var h = gregorianToHijri(date);
    return h.day + " " + pickLoc(HIJRI_MONTHS, loc)[h.month - 1] + " " + h.year;
  }

  // ── dini gun cozucu (lib/islamicDays.ts port; tanimlar daily.json'dan) ───
  function resolveIslamicDate(def, hYear) {
    var base;
    if (def.rule === "firstFridayEve") {
      var d1 = hijriToGregorian(hYear, def.hMonth, 1);
      var delta = (5 - d1.getDay() + 7) % 7;
      var firstFriday = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate() + delta);
      base = new Date(firstFriday.getFullYear(), firstFriday.getMonth(), firstFriday.getDate() - 1);
    } else {
      base = hijriToGregorian(hYear, def.hMonth, def.hDay != null ? def.hDay : 1);
    }
    return base;
  }
  function islamicDaysForYear(defs, gYear) {
    var hStart = gregorianToHijri(new Date(gYear, 0, 1)).year;
    var hEnd = gregorianToHijri(new Date(gYear, 11, 31)).year;
    var out = [];
    for (var hY = hStart; hY <= hEnd; hY++) {
      for (var i = 0; i < defs.length; i++) {
        var date = resolveIslamicDate(defs[i], hY);
        if (date.getFullYear() === gYear) out.push({ key: defs[i].key, def: defs[i], date: date });
      }
    }
    out.sort(function (a, b) { return a.date - b.date; });
    return out;
  }
  function islamicDayForDate(defs, date) {
    var all = islamicDaysForYear(defs, date.getFullYear());
    for (var i = 0; i < all.length; i++) {
      var d = all[i].date;
      if (d.getFullYear() === date.getFullYear() && d.getMonth() === date.getMonth() && d.getDate() === date.getDate()) return all[i];
    }
    return null;
  }
  function isInRamadan(date) { return gregorianToHijri(date).month === 9; }
  function nextIslamicDay(defs, fromDate) {
    var t0 = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime();
    var all = islamicDaysForYear(defs, fromDate.getFullYear())
      .concat(islamicDaysForYear(defs, fromDate.getFullYear() + 1));
    for (var i = 0; i < all.length; i++) {
      if (all[i].date.getTime() > t0) return all[i];
    }
    return null;
  }

  // ── vakit adlari + geri sayim etiketleri (lib/widgetStrings.ts birebir) ──
  var PRAYER_KEYS = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
  var PRAYER_STRINGS = {
    tr: {
      names: { fajr: "İmsak", sunrise: "Güneş", dhuhr: "Öğle", asr: "İkindi", maghrib: "Akşam", isha: "Yatsı" },
      until: { fajr: "İmsağa kalan", sunrise: "Güneşe kalan", dhuhr: "Öğleye kalan", asr: "İkindiye kalan", maghrib: "Akşama kalan", isha: "Yatsıya kalan" },
      endsIn: "Vaktin çıkmasına",
    },
    en: {
      names: { fajr: "Fajr", sunrise: "Sunrise", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha" },
      until: { fajr: "Until Fajr", sunrise: "Until sunrise", dhuhr: "Until Dhuhr", asr: "Until Asr", maghrib: "Until Maghrib", isha: "Until Isha" },
      endsIn: "Time ends in",
    },
    de: {
      names: { fajr: "Fadschr", sunrise: "Sonnenaufgang", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Ischa" },
      until: { fajr: "Bis Fadschr", sunrise: "Bis Sonnenaufgang", dhuhr: "Bis Dhuhr", asr: "Bis Asr", maghrib: "Bis Maghrib", isha: "Bis Ischa" },
      endsIn: "Endet in",
    },
    fr: {
      names: { fajr: "Fajr", sunrise: "Lever du soleil", dhuhr: "Dhohr", asr: "Asr", maghrib: "Maghrib", isha: "Icha" },
      until: { fajr: "Avant Fajr", sunrise: "Avant le lever du soleil", dhuhr: "Avant Dhohr", asr: "Avant Asr", maghrib: "Avant Maghrib", isha: "Avant Icha" },
      endsIn: "Se termine dans",
    },
    ar: {
      names: { fajr: "الفجر", sunrise: "الشروق", dhuhr: "الظهر", asr: "العصر", maghrib: "المغرب", isha: "العشاء" },
      until: { fajr: "حتى الفجر", sunrise: "حتى الشروق", dhuhr: "حتى الظهر", asr: "حتى العصر", maghrib: "حتى المغرب", isha: "حتى العشاء" },
      endsIn: "ينتهي الوقت بعد",
    },
  };

  // ── modul metinleri (site-ozel; 5 dil, uygulama terminolojisiyle) ────────
  var M = {
    tr: {
      prayerTitle: "Namaz Vakitleri",
      chooseCity: "Şehir seç",
      changeCity: "Şehri değiştir",
      useLocation: "Konumumu kullan",
      searchCity: "Şehir ara...",
      pickerTitle: "Şehir seç",
      pickerHint: "Şehir adı yazarak ara. 106 ülke, 3.000'den fazla şehir.",
      pickerPrivacy: "Konum yalnız en yakın şehri bulmak için kullanılır ve cihazından çıkmaz.",
      close: "Kapat",
      emptyCity: "Vakitleri görmek için şehrini seç.",
      loading: "Vakitler yükleniyor...",
      resolving: "Şehir vakit takvimiyle eşleştiriliyor...",
      errorTimes: "Vakitler şu an yüklenemiyor. Daha sonra tekrar dene.",
      retry: "Tekrar dene",
      gpsError: "Konum alınamadı. Şehrini elle seçebilirsin.",
      noResults: "Sonuç bulunamadı",
      monthShow: "30 Günlük Takvim",
      monthHide: "Takvimi Gizle",
      print: "Yazdır",
      today: "Bugün",
      sourceNote: "Vakitler Diyanet İşleri Başkanlığı takvimine göredir.",
      nearestNote: "Vakit kaynağı: {name}",
      tanzil: "Ayet mealleri Tanzil Projesi verisiyle sunulur (CC BY 3.0).",
      themeToggle: "Temayı değiştir",
      dateHeader: "Tarih",
      appCta: "Vakit bildirimleri ve fazlası uygulamada",
    },
    en: {
      prayerTitle: "Prayer Times",
      chooseCity: "Choose city",
      changeCity: "Change city",
      useLocation: "Use my location",
      searchCity: "Search city...",
      pickerTitle: "Choose a city",
      pickerHint: "Type to search. 106 countries, 3,000+ cities.",
      pickerPrivacy: "Your location is only used to find the nearest city and never leaves your device.",
      close: "Close",
      emptyCity: "Choose your city to see prayer times.",
      loading: "Loading times...",
      resolving: "Matching your city with the calendar...",
      errorTimes: "Times cannot be loaded right now. Try again later.",
      retry: "Try again",
      gpsError: "Could not get your location. You can pick your city manually.",
      noResults: "No results",
      monthShow: "30-Day Calendar",
      monthHide: "Hide Calendar",
      print: "Print",
      today: "Today",
      sourceNote: "Times follow the official calendar of the Diyanet (Turkish Presidency of Religious Affairs).",
      nearestNote: "Times source: {name}",
      tanzil: "Qur'an translations are provided from Tanzil Project data (CC BY 3.0).",
      themeToggle: "Toggle theme",
      dateHeader: "Date",
      appCta: "Prayer notifications and more in the app",
    },
    de: {
      prayerTitle: "Gebetszeiten",
      chooseCity: "Stadt wählen",
      changeCity: "Stadt ändern",
      useLocation: "Meinen Standort verwenden",
      searchCity: "Stadt suchen...",
      pickerTitle: "Stadt wählen",
      pickerHint: "Tippe, um zu suchen. 106 Länder, über 3.000 Städte.",
      pickerPrivacy: "Dein Standort wird nur genutzt, um die nächstgelegene Stadt zu finden, und verlässt dein Gerät nie.",
      close: "Schließen",
      emptyCity: "Wähle deine Stadt, um die Gebetszeiten zu sehen.",
      loading: "Zeiten werden geladen...",
      resolving: "Deine Stadt wird dem Kalender zugeordnet...",
      errorTimes: "Die Zeiten können gerade nicht geladen werden. Versuch es später erneut.",
      retry: "Erneut versuchen",
      gpsError: "Standort konnte nicht ermittelt werden. Du kannst deine Stadt manuell wählen.",
      noResults: "Keine Treffer",
      monthShow: "30-Tage-Kalender",
      monthHide: "Kalender ausblenden",
      print: "Drucken",
      today: "Heute",
      sourceNote: "Die Zeiten folgen dem offiziellen Kalender der Diyanet (türkische Religionsbehörde).",
      nearestNote: "Zeitquelle: {name}",
      tanzil: "Koranübersetzungen stammen aus Daten des Tanzil-Projekts (CC BY 3.0).",
      themeToggle: "Design wechseln",
      dateHeader: "Datum",
      appCta: "Gebetsbenachrichtigungen und mehr in der App",
    },
    fr: {
      prayerTitle: "Heures de prière",
      chooseCity: "Choisir la ville",
      changeCity: "Changer de ville",
      useLocation: "Utiliser ma position",
      searchCity: "Rechercher une ville...",
      pickerTitle: "Choisir une ville",
      pickerHint: "Tape pour chercher. 106 pays, plus de 3 000 villes.",
      pickerPrivacy: "Ta position sert uniquement à trouver la ville la plus proche et ne quitte jamais ton appareil.",
      close: "Fermer",
      emptyCity: "Choisis ta ville pour voir les horaires.",
      loading: "Chargement des horaires...",
      resolving: "Association de ta ville au calendrier...",
      errorTimes: "Les horaires ne peuvent pas être chargés pour le moment. Réessaie plus tard.",
      retry: "Réessayer",
      gpsError: "Impossible d'obtenir ta position. Tu peux choisir ta ville manuellement.",
      noResults: "Aucun résultat",
      monthShow: "Calendrier de 30 jours",
      monthHide: "Masquer le calendrier",
      print: "Imprimer",
      today: "Aujourd'hui",
      sourceNote: "Les horaires suivent le calendrier officiel de la Diyanet (Présidence des affaires religieuses de Turquie).",
      nearestNote: "Source des horaires : {name}",
      tanzil: "Les traductions du Coran proviennent des données du projet Tanzil (CC BY 3.0).",
      themeToggle: "Changer de thème",
      dateHeader: "Date",
      appCta: "Notifications de prière et plus encore dans l'appli",
    },
    ar: {
      prayerTitle: "مواقيت الصلاة",
      chooseCity: "اختر المدينة",
      changeCity: "تغيير المدينة",
      useLocation: "استخدام موقعي",
      searchCity: "ابحث عن مدينة...",
      pickerTitle: "اختر مدينة",
      pickerHint: "اكتب للبحث. 106 دول وأكثر من 3000 مدينة.",
      pickerPrivacy: "يُستخدم موقعك فقط للعثور على أقرب مدينة ولا يغادر جهازك أبدًا.",
      close: "إغلاق",
      emptyCity: "اختر مدينتك لعرض مواقيت الصلاة.",
      loading: "جارٍ تحميل المواقيت...",
      resolving: "جارٍ مطابقة مدينتك مع التقويم...",
      errorTimes: "تعذّر تحميل المواقيت الآن. حاول مرة أخرى لاحقًا.",
      retry: "أعد المحاولة",
      gpsError: "تعذّر تحديد موقعك. يمكنك اختيار مدينتك يدويًا.",
      noResults: "لا نتائج",
      monthShow: "تقويم 30 يومًا",
      monthHide: "إخفاء التقويم",
      print: "طباعة",
      today: "اليوم",
      sourceNote: "المواقيت وفق التقويم الرسمي لرئاسة الشؤون الدينية التركية (ديانت).",
      nearestNote: "مصدر المواقيت: {name}",
      tanzil: "ترجمات القرآن مقدَّمة من بيانات مشروع تنزيل (CC BY 3.0).",
      themeToggle: "تبديل المظهر",
      dateHeader: "التاريخ",
      appCta: "تنبيهات الصلاة والمزيد في التطبيق",
    },
  };

  // ── Diyanet ulke haritasi (lib/diyanetApi.ts birebir) ────────────────────
  var DIYANET_COUNTRY_MAP = {
    TR: 2, MC: 3, NL: 4, EE: 6, HU: 7, IT: 8, BA: 9, VA: 10, BE: 11, SE: 12,
    DE: 13, SK: 14, GB: 15, UK: 15, CZ: 16, AD: 17, XK: 18, SI: 19, LV: 20,
    FR: 21, GR: 22, ES: 23, MT: 24, AL: 25, DK: 26, RS: 27, MK: 28, HR: 30,
    LU: 31, IE: 32, ME: 34, AT: 35, NO: 36, RO: 37, LI: 38, PL: 39, UA: 40,
    FI: 41, BG: 44, PT: 45, MD: 46, LT: 47, GL: 48, CH: 49, IS: 122, SJ: 163,
    BY: 208, RU: 207,
    AZ: 5, GE: 62, AM: 104, KZ: 92, UZ: 131, TM: 159, TJ: 101, KG: 168, MN: 60,
    LB: 42, AE: 93, QA: 94, IQ: 124, BH: 132, KW: 133, OM: 173, SA: 64,
    YE: 148, SY: 191, JO: 192, IR: 202, PS: 204, IL: 205, CY: 1,
    DZ: 86, EG: 189, LY: 203, TN: 118, MA: 145, MR: 106, ML: 152, NE: 84,
    TD: 156, SD: 129, ER: 175, DJ: 160, ET: 95, SO: 150, KE: 114, UG: 75,
    TZ: 110, RW: 81, BI: 65, CD: 180, CF: 80, CM: 184, GA: 79, GQ: 63,
    NG: 127, BJ: 181, TG: 71, GH: 143, CI: 120, LR: 73, GN: 111, SN: 102,
    GM: 109, BF: 91, CV: 144, MG: 98, KM: 88, MU: 164, SC: 138, MW: 55,
    ZM: 158, MZ: 151, BW: 167, NA: 196, LS: 174, SZ: 170, ZA: 67, AO: 140,
    RE: 112, YT: 157,
    AF: 166, PK: 77, IN: 187, NP: 76, BT: 155, BD: 177, LK: 74, MV: 103,
    MM: 154, TH: 137, LA: 134, KH: 161, VN: 135, MY: 107, SG: 179, BN: 97,
    ID: 117, TL: 176, PH: 126, CN: 61, HK: 113, MO: 100, TW: 108, JP: 116,
    KR: 128, KP: 142,
    US: 33, CA: 52, MX: 53, GT: 99, BZ: 182, SV: 165, HN: 105, NI: 141,
    CR: 162, PA: 89, CU: 209, JM: 119, HT: 70, DO: 72, DM: 123, BS: 54,
    BB: 188, TT: 96, GD: 58, AG: 90, PR: 68, BM: 51, AI: 125, MS: 147,
    MQ: 87, GP: 171, AW: 153, CW: 66, SX: 66, BQ: 66, AN: 66,
    CO: 57, VE: 186, GY: 82, SR: 172, EC: 139, PE: 69, BR: 146, BO: 83,
    PY: 194, UY: 201, AR: 199, CL: 200,
    AU: 59, NZ: 193, FJ: 197, PG: 185, VU: 56, WS: 198, TO: 130, FM: 85,
    PW: 149, NU: 178, NC: 115, GU: 169, PN: 183,
  };

  /** Diyanet katalogu Turkce yazim kullanir; egzonim eslemesi (diyanetApi.ts). */
  var CITY_ALIASES = {
    WARSAW: "VARSOVA", WARSZAWA: "VARSOVA", KRAKOW: "KRAKOV", CRACOW: "KRAKOV",
    VIENNA: "VIYANA", WIEN: "VIYANA", PRAGUE: "PRAG", PRAHA: "PRAG",
    BUDAPEST: "BUDAPESTE", BUCHAREST: "BUKRES", BUCURESTI: "BUKRES",
    SOFIA: "SOFYA", ATHENS: "ATINA", ATHINA: "ATINA", THESSALONIKI: "SELANIK",
    LISBON: "LIZBON", LISBOA: "LIZBON", LONDON: "LONDRA",
    MARSEILLE: "MARSILYA", BARCELONA: "BARSELONA", SEVILLE: "SEVILLA",
    BRUSSELS: "BRUKSEL", BRUXELLES: "BRUKSEL", BRUSSEL: "BRUKSEL",
    THEHAGUE: "LAHEY", DENHAAG: "LAHEY", ANTWERP: "ANVERS", ANTWERPEN: "ANVERS",
    COPENHAGEN: "KOPENHAG", KOBENHAVN: "KOPENHAG", STOCKHOLM: "STOKHOLM",
    GOTHENBURG: "GOTEBORG", GENEVA: "CENEVRE", GENEVE: "CENEVRE",
    ZURICH: "ZURIH", MUNICH: "MUNIH", MUNCHEN: "MUNIH", COLOGNE: "KOLN",
    NUREMBERG: "NURNBERG", VENICE: "VENEDIK", VENEZIA: "VENEDIK",
    MOSCOW: "MOSKOVA", MOSKVA: "MOSKOVA", SAINTPETERSBURG: "PETERSBURG",
    STPETERSBURG: "PETERSBURG", KYIV: "KIEV", BELGRADE: "BELGRAD",
    BEOGRAD: "BELGRAD", SARAJEVO: "SARAYBOSNA", SKOPJE: "USKUP",
    TIRANA: "TIRAN", PRISTINA: "PRISTINE", CHISINAU: "KISINEV",
    TALLINN: "TALLIN", NICOSIA: "LEFKOSA",
    CAIRO: "KAHIRE", ALQAHIRAH: "KAHIRE", ALEXANDRIA: "ISKENDERIYE",
    MECCA: "MEKKE", MAKKAH: "MEKKE", MEDINA: "MEDINE", MADINAH: "MEDINE",
    RIYADH: "RIYAD", JEDDAH: "CIDDE", JIDDAH: "CIDDE", JERUSALEM: "KUDUS",
    DAMASCUS: "SAM", ALEPPO: "HALEP", HALAB: "HALEP", BAGHDAD: "BAGDAT",
    BEIRUT: "BEYRUT", ABUDHABI: "ABUDABI", MUSCAT: "MASKAT", SANAA: "SANA",
    TEHRAN: "TAHRAN", TABRIZ: "TEBRIZ", KABUL: "KABIL",
    TASHKENT: "TASKENT", ALMATY: "ALMATI", BISHKEK: "BISKEK",
    DUSHANBE: "DUSANBE", ASHGABAT: "ASKABAT", TBILISI: "TIFLIS",
    YEREVAN: "ERIVAN",
    ALGIERS: "CEZAYIR", ALGER: "CEZAYIR", TUNIS: "TUNUS", TRIPOLI: "TRABLUS",
    CASABLANCA: "KAZABLANKA", MOGADISHU: "MOGADISU", ACCRA: "AKRA",
    JAKARTA: "CAKARTA", BEIJING: "PEKIN", SHANGHAI: "SANGAY", SEOUL: "SEUL",
    DHAKA: "DAKKA", KARACHI: "KARACI", LAHORE: "LAHOR", COLOMBO: "KOLOMBO",
    KATHMANDU: "KATMANDU", NEWDELHI: "YENIDELHI", DELHI: "YENIDELHI",
    MUMBAI: "BOMBAY", SINGAPORE: "SINGAPUR",
    MEXICOCITY: "MEKSIKO", HAVANA: "HAVANA", SYDNEY: "SIDNEY",
    MELBOURNE: "MELBURN",
  };

  /** Turkce karakter + diakritik normalize (diyanetApi.ts normalize birebir). */
  function normalize(s) {
    return String(s)
      .toLocaleUpperCase("tr-TR")
      .replace(/İ/g, "I").replace(/Ö/g, "O").replace(/Ü/g, "U")
      .replace(/Ş/g, "S").replace(/Ç/g, "C").replace(/Ğ/g, "G")
      .replace(/ß/gi, "SS").replace(/Æ/gi, "AE").replace(/Ø/gi, "O")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^A-Z0-9]/g, "");
  }
  function cityCandidates(cityName) {
    var raw = normalize(cityName);
    var alias = CITY_ALIASES[raw];
    return alias && alias !== raw ? [raw, normalize(alias)] : [raw];
  }

  // ── durum ────────────────────────────────────────────────────────────────
  var locale = "en";
  var dailyData = null;      // data/daily.json
  var citiesData = null;     // data/cities.json
  var savedCity = null;      // {name,nameEn,cc,lat,lon,src}
  var resolvedIlce = null;   // {ilceID, ilceName}
  var monthData = null;      // ezanvakti 30 gunluk dizi
  var prayerState = "idle";  // idle|loading|ready|error|nocity
  var monthOpen = false;
  var tickTimer = null;
  var renderedDayNum = -1;
  var fontLoaded = false;

  function t(key) { return (M[locale] || M.en)[key]; }
  function ps() { return PRAYER_STRINGS[locale] || PRAYER_STRINGS.en; }

  // ── veri yukleyiciler ────────────────────────────────────────────────────
  function loadDaily() {
    if (dailyData) return Promise.resolve(dailyData);
    return fetch("data/daily.json").then(function (r) {
      if (!r.ok) throw new Error("daily.json " + r.status);
      return r.json();
    }).then(function (j) { dailyData = j; return j; });
  }
  function loadCities() {
    if (citiesData) return Promise.resolve(citiesData);
    return fetch("data/cities.json").then(function (r) {
      if (!r.ok) throw new Error("cities.json " + r.status);
      return r.json();
    }).then(function (j) { citiesData = j; return j; });
  }

  // ── tema ─────────────────────────────────────────────────────────────────
  var reduceMotion = !!(window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  var THEME_ANIM_MS = 340; // index.html'deki 0.3s transition + pay

  function initTheme() {
    var btn = $("themeToggle");
    if (!btn) return;
    var animTimer = null;
    btn.addEventListener("click", function () {
      var root = document.documentElement;
      var cur = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = cur === "dark" ? "light" : "dark";

      var apply = function () {
        root.setAttribute("data-theme", next);
        lsSet("mh_theme", next);
        syncThemeUi();
      };

      // Destekleyen tarayicida (Chrome 111+, Safari 18+, Firefox 133+) sayfanin
      // TAMAMI capraz gecisle degisir. ⚠️ Bu dalda theme-anim EKLENMEZ: View
      // Transitions zaten kendi gecisini yapiyor, ustune CSS gecisi koymak ayni
      // animasyonu iki kez calistirip canli DOM ile anlik goruntuyu ayristirir.
      if (!reduceMotion && document.startViewTransition) {
        var vt = document.startViewTransition(apply);
        // ⚠️ Gecis IPTAL olursa (ard arda hizli tiklama, arada baska bir DOM
        // degisimi) ready/finished REDDEDILIR. Yakalanmazsa konsola
        // "InvalidStateError: Transition was aborted" dusuyor — tema yine
        // dogru uygulaniyor, yalniz soz reddi sahipsiz kaliyor. Sessizce yut.
        ["ready", "finished", "updateCallbackDone"].forEach(function (k) {
          if (vt && vt[k] && typeof vt[k].catch === "function") vt[k].catch(function () {});
        });
        return;
      }

      // ⚠️ Yedek yol. Gecis sinifi YALNIZ bu an icin eklenir ve MUTLAKA
      // kaldirilir; kalici birakilirsa her renk degisimi (hover, odak) 300 ms
      // suruklenir. Sayfa acilisinda da yok: head'deki tema betigi temayi ilk
      // boyamadan once atiyor, o an gecis olsaydi sayfa soluyormus gorunurdu.
      if (!reduceMotion) {
        root.classList.add("theme-anim");
        clearTimeout(animTimer);
        animTimer = setTimeout(function () { root.classList.remove("theme-anim"); }, THEME_ANIM_MS);
      }
      apply();
    });
    syncThemeUi();
  }

  // ── indirme dugmeleri: platform algilama ─────────────────────────────────
  // Ziyaretcinin platformu belliyse o magaza birincil, oteki ikincil stilde
  // kalir (silinmez: iPhone kullanicisi Android'deki esine link gonderebilir).
  // Masaustunde ikisi de birincil.
  function initStoreButtons() {
    var ua = navigator.userAgent || "";
    // ⚠️ ANDROID ONCE BAKILIR. iPadOS "masaustu site" modunda kendini
    // MacIntel + cok dokunmali gosterdigi icin o kosul gerekli, ama tek basina
    // birakilirsa Mac uzerinde calisan Android emulasyonunu da iOS sayar
    // (13 Agu 2026'da olculdu: Android cihazda App Store one cikiyordu).
    var isAndroid = /Android/.test(ua);
    var isIOS = !isAndroid && (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
    if (!isIOS && !isAndroid) return;
    var demote = isIOS ? "android" : "ios";
    var badges = document.querySelectorAll(".store-badge[data-store]");
    for (var i = 0; i < badges.length; i++) {
      if (badges[i].getAttribute("data-store") === demote) badges[i].classList.add("secondary");
      else badges[i].parentNode.insertBefore(badges[i], badges[i].parentNode.firstChild);
    }
  }
  function syncThemeUi() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    var sun = $("iconSun"), moon = $("iconMoon"), btn = $("themeToggle");
    if (sun) sun.style.display = dark ? "block" : "none";
    if (moon) moon.style.display = dark ? "none" : "block";
    if (btn) btn.setAttribute("aria-label", t("themeToggle"));
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#10231b" : "#1e4d35");
  }

  // ── tarih satiri + dini gun cipi ─────────────────────────────────────────
  function renderDateLine() {
    var now = new Date();
    var g = $("dlGreg"), h = $("dlHijri");
    if (g) g.textContent = formatGregorianLong(now, locale);
    if (h) h.textContent = formatHijri(now, locale);

    var chip = $("islamicChip"), chipText = $("islamicChipText");
    if (!chip || !chipText || !dailyData) return;
    var defs = dailyData.islamicDays;
    var today = islamicDayForDate(defs, now);
    if (today) {
      chipText.textContent = t("today") + " · " + pickLoc(today.def.name, locale);
      chip.hidden = false;
      return;
    }
    var next = nextIslamicDay(defs, now);
    if (!next) { chip.hidden = true; return; }
    var days = Math.round((next.date - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / DAY_MS);
    chipText.textContent = pickLoc(next.def.name, locale) + " · " + chipDays(days);
    chip.hidden = false;
  }
  function chipDays(n) {
    switch (locale) {
      case "tr": return n + " gün";
      case "de": return n === 1 ? "1 Tag" : n + " Tage";
      case "fr": return n === 1 ? "1 jour" : n + " jours";
      case "ar":
        if (n === 1) return "بعد يوم";
        if (n === 2) return "بعد يومين";
        if (n <= 10) return "بعد " + n + " أيام";
        return "بعد " + n + " يومًا";
      default: return n === 1 ? "1 day" : n + " days";
    }
  }

  // ── gunun ayeti / hadisi ─────────────────────────────────────────────────
  var BG_COUNT = 11; // img/daily/0..10 — dailyAyahBackgrounds.ts dizisiyle ayni sira

  function pickAyah(data, date) {
    var rot = data.rotation;
    var fallbackIndex = mod(localDayNumber(date), rot.length);
    var special = islamicDayForDate(data.islamicDays, date);
    var key = null, specialName = null, bgIndex = null;
    if (special && data.specialAyahs[special.key]) {
      key = data.specialAyahs[special.key];
      specialName = pickLoc(special.def.name, locale);
      if (data.specialBg[special.key] != null) bgIndex = data.specialBg[special.key];
    } else if (isInRamadan(date)) {
      key = data.ramadanVerses[mod(localDayNumber(date), data.ramadanVerses.length)];
      specialName = pickLoc(data.ramadanLabel, locale);
      if (data.specialBg.ramazan != null) bgIndex = data.specialBg.ramazan;
    } else {
      key = rot[fallbackIndex];
    }
    var v = data.verses[key];
    if (!v) { key = rot[fallbackIndex]; v = data.verses[key]; specialName = null; bgIndex = null; }
    if (!v) return null;
    return {
      arabic: v.ar,
      translation: locale === "ar" ? null : (v.t[locale] || v.t.en),
      reference: v.ref[locale] || v.ref.en,
      specialName: specialName,
      bgIndex: bgIndex != null ? bgIndex : fallbackIndex % BG_COUNT,
    };
  }

  function pickHadith(data, date) {
    var special = islamicDayForDate(data.islamicDays, date);
    var slug = null, specialName = null;
    if (special && data.specialHadithKeyMap[special.key]) {
      slug = data.specialHadithKeyMap[special.key];
      specialName = pickLoc(special.def.name, locale);
    } else if (isInRamadan(date)) {
      var ramadanSlugs = ["ramadan1", "ramadan2", "ramadan3"];
      slug = ramadanSlugs[mod(localDayNumber(date), ramadanSlugs.length)];
      specialName = pickLoc(data.ramadanLabel, locale);
    }
    if (slug && data.specialHadiths[slug]) {
      var sh = data.specialHadiths[slug][locale] || data.specialHadiths[slug].en;
      return { text: sh.t, source: sh.s, specialName: specialName };
    }
    var idx = mod(localDayNumber(date), data.hadiths[locale] ? data.hadiths[locale].length : 30);
    var pool = data.hadiths[locale] || data.hadiths.en;
    return { text: pool[idx].t, source: pool[idx].s, specialName: null };
  }

  /** AR ayet metni mushaf imlasinda — sistem fontunda eksik isaretler var
   *  (U+08D2 vb.), font subset'i yalniz AR dilinde ve gerekince yuklenir. */
  function ensureArabicFont() {
    if (fontLoaded || !window.FontFace) return Promise.resolve();
    var face = new FontFace("MushafSubset", "url(fonts/mushaf-ar-subset.woff)");
    return face.load().then(function (f) {
      document.fonts.add(f);
      fontLoaded = true;
    }).catch(function () { /* font inmezse sistem fontu kalir */ });
  }

  function renderCards() {
    if (!dailyData) return;
    var now = new Date();
    var ayah = pickAyah(dailyData, now);
    var hadith = pickHadith(dailyData, now);

    var ayahCard = $("ayahCard"), hadithCard = $("hadithCard");
    if (ayahCard && ayah) {
      ayahCard.hidden = false;
      var ayahLabel = ayah.specialName
        ? upperLoc(ayah.specialName, locale)
        : upperLoc(pickLoc(dailyData.labels.ayah, locale), locale);
      var bodyHtml;
      if (ayah.translation) {
        bodyHtml = '<p class="dc-text">' + esc(ayah.translation) + "</p>";
      } else {
        bodyHtml = '<p class="dc-text dc-arabic" dir="rtl">' + esc(ayah.arabic) + "</p>";
        ensureArabicFont();
      }
      ayahCard.style.backgroundImage = "url(img/daily/" + ayah.bgIndex + ".webp)";
      ayahCard.innerHTML =
        '<div class="dc-scrim"></div><div class="dc-inner">' +
        '<img class="dc-appicon" src="icon.png" alt="" loading="lazy">' +
        '<div class="dc-label">' + (ayah.specialName ? svgSparkle() : "") + esc(ayahLabel) + "</div>" +
        bodyHtml +
        '<div class="dc-ref">' + esc(ayah.reference) + "</div></div>";
    }
    if (hadithCard && hadith) {
      hadithCard.hidden = false;
      var hadithLabel = hadith.specialName
        ? upperLoc(hadith.specialName, locale)
        : upperLoc(pickLoc(dailyData.labels.hadith, locale), locale);
      var hBg = (ayah ? ayah.bgIndex + 5 : 5) % BG_COUNT; // ayetle ayni gun farkli foto
      hadithCard.style.backgroundImage = "url(img/daily/" + hBg + ".webp)";
      hadithCard.innerHTML =
        '<div class="dc-scrim"></div><div class="dc-inner">' +
        '<img class="dc-appicon" src="icon.png" alt="" loading="lazy">' +
        '<div class="dc-label">' + (hadith.specialName ? svgSparkle() : "") + esc(hadithLabel) + "</div>" +
        '<p class="dc-text dc-hadith">' + "“" + esc(hadith.text) + "”</p>" +
        '<div class="dc-ref">' + esc(hadith.source) + "</div></div>";
    }
    var tn = $("tanzilNote");
    if (tn) { tn.textContent = t("tanzil"); tn.hidden = false; }
  }

  function svgSparkle() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2l1.9 5.7L19.6 9.6l-5.7 1.9L12 17.2l-1.9-5.7L4.4 9.6l5.7-1.9z"/></svg>';
  }

  // ── Diyanet ilce cozumu (lib/diyanetApi.ts port) ─────────────────────────
  // ⚠️ v2: v1 anahtari 429 kaynakli ZEHIRLI olumsuz kayitlar icerebiliyor
  // (asagidaki nota bak) — surum atlamak etkilenen tarayicilari temizler.
  var CITY_CACHE_KEY = "mh_diyanet_city_v2";
  var TIMES_CACHE_KEY = "mh_diyanet_times_v1";
  var ILCELER_CACHE_KEY = "mh_diyanet_ilceler_v1";
  var CITY_TTL = 90 * 24 * 3600 * 1000;      // pozitif: 90 gun
  var NEG_TTL = 24 * 3600 * 1000;            // negatif: 24 saat
  var TIMES_TTL = 12 * 3600 * 1000;          // vakitler: 12 saat (takvim ileri kaysin)
  var ILCELER_TTL = 30 * 24 * 3600 * 1000;   // eyalet ilce listeleri: 30 gun
  var NEAREST_MAX_KM = 150;

  /**
   * ⚠️ ezanvakti'nin Cloudflare'i kisa pencerede ~15 istekten sonra 429
   * donduruyor (17 Agu 2026'da olculdu: Almanya taramasinin 16 eyaletinden
   * 15'i gecti, sonuncusu — Jena'nin bagli oldugu Thuringen — 429 yedi).
   * Bu yuzden: (a) 429/5xx/ag hatasinda geri cekilerek en fazla 2 kez
   * yeniden dene; (b) yanit `no-store` tasidigi icin tarayici HTTP onbellegi
   * CALISMIYOR — eyalet listelerini localStorage'da biz sakliyoruz ki bir
   * yeniden deneme 16 istegi bastan atip limite tekrar carpmasin.
   */
  function fetchJson(url) {
    var delays = [0, 2500, 5000];
    var attempt = 0;
    function doFetch() {
      return fetch(url, { headers: { Accept: "application/json" } }).then(function (r) {
        if (!r.ok) {
          var err = new Error(url + " " + r.status);
          err.status = r.status;
          throw err;
        }
        return r.json();
      });
    }
    function retryable(e) { return !e.status || e.status === 429 || e.status >= 500; }
    function go() {
      var wait = delays[attempt];
      return (wait ? delay(wait) : Promise.resolve()).then(doFetch).catch(function (e) {
        attempt++;
        if (attempt < delays.length && retryable(e)) return go();
        throw e;
      });
    }
    return go();
  }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /** Eyalet ilce listesi: once localStorage, yoksa ag + sakla. */
  function fetchIlceler(sehirID) {
    var cache = lsGetJson(ILCELER_CACHE_KEY) || {};
    var hit = cache[sehirID];
    if (hit && Date.now() - hit.at < ILCELER_TTL && Array.isArray(hit.data) && hit.data.length) {
      return Promise.resolve({ data: hit.data, fromCache: true });
    }
    return fetchJson(API + "/ilceler/" + sehirID).then(function (data) {
      if (Array.isArray(data) && data.length) {
        var fresh = lsGetJson(ILCELER_CACHE_KEY) || {};
        fresh[sehirID] = { at: Date.now(), data: data };
        lsSet(ILCELER_CACHE_KEY, JSON.stringify(fresh));
      }
      return { data: Array.isArray(data) ? data : [], fromCache: false };
    });
  }

  function coordIndexFor(cc) {
    return loadCities().then(function (data) {
      var map = {};
      for (var i = 0; i < data.countries.length; i++) {
        var c = data.countries[i];
        if (c.code.toUpperCase() !== cc) continue;
        for (var j = 0; j < c.cities.length; j++) {
          var city = c.cities[j];
          var entry = { lat: city[2], lon: city[3] };
          map[normalize(city[0])] = entry;
          if (city[1]) map[normalize(city[1])] = entry;
        }
      }
      return map;
    });
  }

  function nearestIlce(cc, lat, lon, ilceler) {
    return coordIndexFor(cc).then(function (index) {
      var best = null;
      for (var i = 0; i < ilceler.length; i++) {
        var norm = normalize(ilceler[i].IlceAdi);
        var coord = index[norm];
        if (!coord) {
          for (var key in index) {
            if (key.length >= 5 && (key.indexOf(norm) === 0 || norm.indexOf(key) === 0)) {
              coord = index[key];
              break;
            }
          }
        }
        if (!coord) continue;
        var km = haversineKm(lat, lon, coord.lat, coord.lon);
        if (!best || km < best.km) best = { ilce: ilceler[i], km: km };
      }
      return best && best.km <= NEAREST_MAX_KM ? best : null;
    });
  }

  function exactIlce(ilceler, targets) {
    for (var tIdx = 0; tIdx < targets.length; tIdx++) {
      for (var i = 0; i < ilceler.length; i++) {
        if (normalize(ilceler[i].IlceAdi) === targets[tIdx]) return ilceler[i];
      }
    }
    return null;
  }

  /**
   * ⚠️ Alt dizgi eslesmesi EYALET TARAMASINDA KULLANILMAZ, yalniz tek eyalet
   * icinde (Turkiye fast-path) ya da koordinatsiz son care olarak. Sebep
   * olculdu (17 Agu 2026): "ERFURT" hedefi, alfabetik olarak Thuringen'den
   * ONCE taranan Nordrhein-Westfalen'deki "WIPPERFURTH" icinde alt dizgi
   * olarak gecince sehir 300 km oteye cozuluyordu — oysa Thuringen'de tam
   * adiyla ERFURT var. Sitede adlar kendi katalogumuzdan geldigi icin tam
   * eslesme asil yol, tutmazsa koordinatca en yakin ilce dogru cevap.
   */
  function fuzzyIlce(ilceler, targets) {
    for (var tIdx = 0; tIdx < targets.length; tIdx++) {
      for (var i = 0; i < ilceler.length; i++) {
        var norm = normalize(ilceler[i].IlceAdi);
        if (norm.indexOf(targets[tIdx]) !== -1 || targets[tIdx].indexOf(norm) !== -1) return ilceler[i];
      }
    }
    return null;
  }

  function matchIlce(ilceler, targets) {
    return exactIlce(ilceler, targets) || fuzzyIlce(ilceler, targets);
  }

  function resolveDiyanetCity(cc, cityName, coords) {
    cc = cc.toUpperCase();
    var ulkeID = DIYANET_COUNTRY_MAP[cc];
    if (!ulkeID || !cityName) return Promise.resolve(null);

    var cacheKey = cc + "|" + normalize(cityName);
    var cache = lsGetJson(CITY_CACHE_KEY) || {};
    var hit = cache[cacheKey];
    if (hit) {
      var age = Date.now() - hit.at;
      if (hit.id === "" && age < NEG_TTL) return Promise.resolve(null);
      if (hit.id !== "" && age < CITY_TTL) return Promise.resolve({ ilceID: hit.id, ilceName: hit.name });
    }

    function store(id, name) {
      cache[cacheKey] = { id: id, name: name, at: Date.now() };
      lsSet(CITY_CACHE_KEY, JSON.stringify(cache));
    }

    var targets = cityCandidates(cityName);

    return fetchJson(API + "/sehirler/" + ulkeID).then(function (states) {
      if (!Array.isArray(states) || states.length === 0) return null;

      // Fast-path: Turkiye gibi state == il olan ulkeler — SehirAdi tam eslesirse
      // o ilin merkez ilcesi (diyanetApi.ts Fast-path B).
      var stateMatch = null;
      for (var i = 0; i < states.length; i++) {
        for (var tIdx = 0; tIdx < targets.length; tIdx++) {
          if (normalize(states[i].SehirAdi) === targets[tIdx]) { stateMatch = states[i]; break; }
        }
        if (stateMatch) break;
      }
      if (stateMatch) {
        return fetchIlceler(stateMatch.SehirID).then(function (res) {
          var ilceler = res.data;
          var merkez = matchIlce(ilceler, targets);
          if (!merkez) {
            for (var i = 0; i < ilceler.length; i++) {
              if (/MERKEZ/i.test(ilceler[i].IlceAdi)) { merkez = ilceler[i]; break; }
            }
          }
          if (!merkez && ilceler.length > 0) merkez = ilceler[0];
          if (merkez) { store(merkez.IlceID, merkez.IlceAdi); return { ilceID: merkez.IlceID, ilceName: merkez.IlceAdi }; }
          return null;
        });
      }

      // State-by-state tarama (Almanya deseni): eyalet icinde YALNIZ tam
      // eslesme aranir (fuzzyIlce'nin basindaki uyariya bak — Erfurt/
      // Wipperfurth vakasi). Tam eslesme hicbir eyalette yoksa koordinatca
      // en yakin ilce; koordinat da yoksa son care alt dizgi eslesmesi.
      // Onbellekten gelen eyaletler icin bekleme yok; aga cikanlar arasinda
      // 400 ms (150 ms 429 sinirina carpiyordu, olculdu).
      var allIlceler = [];
      var idx = 0;
      var hadFailure = false;
      function scanNext() {
        if (idx >= states.length) return Promise.resolve(null);
        var state = states[idx++];
        return fetchIlceler(state.SehirID).catch(function () {
          hadFailure = true;
          return { data: [], fromCache: false };
        }).then(function (res) {
          var ilceler = res.data;
          if (ilceler.length > 0) {
            allIlceler = allIlceler.concat(ilceler);
            var m = exactIlce(ilceler, targets);
            if (m) return m;
          }
          var wait = res.fromCache ? Promise.resolve() : delay(400);
          return wait.then(scanNext);
        });
      }
      return scanNext().then(function (m) {
        if (m) { store(m.IlceID, m.IlceAdi); return { ilceID: m.IlceID, ilceName: m.IlceAdi }; }
        function fail() {
          // ⚠️ Tarama KIRLIYSE (herhangi bir eyalet cekilemedi) olumsuz kayit
          // YAZILMAZ: 429 yuzunden gorunmeyen eyalet "katalogda yok" demek
          // degildir. Eski davranis Jena'yi 24 saat boyunca cozumsuz birakti.
          if (!hadFailure) store("", "");
          return null;
        }
        function fuzzyFallback() {
          // Koordinatsiz son care (sitede sehirler hep koordinatli geldigi
          // icin normalde bu dala dusulmez)
          var fz = fuzzyIlce(allIlceler, targets);
          if (fz) { store(fz.IlceID, fz.IlceAdi); return { ilceID: fz.IlceID, ilceName: fz.IlceAdi }; }
          return fail();
        }
        if (coords && allIlceler.length > 0) {
          return nearestIlce(cc, coords.lat, coords.lon, allIlceler).then(function (near) {
            if (near) { store(near.ilce.IlceID, near.ilce.IlceAdi); return { ilceID: near.ilce.IlceID, ilceName: near.ilce.IlceAdi }; }
            return fuzzyFallback();
          });
        }
        return fuzzyFallback();
      });
    });
  }

  function getTimes30(ilceID) {
    var cache = lsGetJson(TIMES_CACHE_KEY) || {};
    var hit = cache[ilceID];
    if (hit && Date.now() - hit.at < TIMES_TTL) return Promise.resolve(hit.data);
    return fetchJson(API + "/vakitler/" + ilceID).then(function (data) {
      if (!Array.isArray(data) || data.length === 0) throw new Error("bos vakit listesi");
      // Kota dostu: yalniz son kullanilan 3 ilce sakla
      var entries = Object.keys(cache).map(function (k) { return { k: k, at: cache[k].at }; })
        .sort(function (a, b) { return b.at - a.at; }).slice(0, 2);
      var next = {};
      entries.forEach(function (e) { next[e.k] = cache[e.k]; });
      next[ilceID] = { at: Date.now(), data: data };
      lsSet(TIMES_CACHE_KEY, JSON.stringify(next));
      return data;
    }).catch(function (e) {
      if (hit) return hit.data; // ag hatasi: eski takvim varsa onu kullan
      throw e;
    });
  }

  // ── sehir secimi ─────────────────────────────────────────────────────────
  var SAVED_CITY_KEY = "mh_city_v1";

  function cityDisplayName(c) { return locale === "tr" ? c.name : (c.nameEn || c.name); }

  function loadSavedCity() {
    var c = lsGetJson(SAVED_CITY_KEY);
    if (c && typeof c.lat === "number" && typeof c.lon === "number" && c.cc) return c;
    return null;
  }
  function saveCity(c) { lsSet(SAVED_CITY_KEY, JSON.stringify(c)); }

  /** Saat diliminden sehir tahmini: "Europe/Berlin" -> katalogda Berlin.
   *  Izin penceresi ACMADAN makul bir varsayilan verir; kalici secim sayilmaz. */
  function guessCityFromTimezone() {
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) { /* yok */ }
    if (!tz || tz.indexOf("/") === -1) return Promise.resolve(null);
    var guess = normalize(tz.split("/").pop().replace(/_/g, " "));
    if (!guess) return Promise.resolve(null);
    return loadCities().then(function (data) {
      for (var i = 0; i < data.countries.length; i++) {
        var c = data.countries[i];
        for (var j = 0; j < c.cities.length; j++) {
          var city = c.cities[j];
          if (normalize(city[0]) === guess || (city[1] && normalize(city[1]) === guess)) {
            return { name: city[0], nameEn: city[1] || city[0], cc: c.code, lat: city[2], lon: city[3], src: "tz" };
          }
        }
      }
      return null;
    });
  }

  function nearestCatalogCity(lat, lon) {
    return loadCities().then(function (data) {
      var best = null;
      for (var i = 0; i < data.countries.length; i++) {
        var c = data.countries[i];
        for (var j = 0; j < c.cities.length; j++) {
          var city = c.cities[j];
          var km = haversineKm(lat, lon, city[2], city[3]);
          if (!best || km < best.km) {
            best = { km: km, city: { name: city[0], nameEn: city[1] || city[0], cc: c.code, lat: city[2], lon: city[3], src: "gps" } };
          }
        }
      }
      return best ? best.city : null;
    });
  }

  // ── vakit modulu render ──────────────────────────────────────────────────
  function prayerShell(innerHtml) {
    var card = $("prayerCard");
    if (card) card.innerHTML =
      '<div class="pc-head">' +
      '<div class="pc-title">' + svgClock() + "<span>" + esc(t("prayerTitle")) + "</span></div>" +
      '<div class="pc-actions">' +
      '<button type="button" class="pc-city" id="cityBtn" title="' + esc(t("changeCity")) + '">' + svgPin() +
      '<span id="cityBtnName">' + esc(savedCity ? cityDisplayName(savedCity) : t("chooseCity")) + "</span>" + svgChevron() + "</button>" +
      '<button type="button" class="pc-gps" id="gpsBtn" aria-label="' + esc(t("useLocation")) + '" title="' + esc(t("useLocation")) + '">' + svgLocate() + "</button>" +
      "</div></div>" + innerHtml;
    var cb = $("cityBtn"), gb = $("gpsBtn");
    if (cb) cb.addEventListener("click", openPicker);
    if (gb) gb.addEventListener("click", function () { useGps(); });
  }

  function renderPrayerLoading(msg) {
    prayerShell('<div class="pc-state"><div class="pc-spinner"></div><p>' + esc(msg || t("loading")) + "</p></div>");
  }
  function renderPrayerEmpty() {
    prayerShell('<div class="pc-state"><p>' + esc(t("emptyCity")) + '</p>' +
      '<button type="button" class="pc-primary" id="pickCityCta">' + esc(t("chooseCity")) + "</button></div>");
    var b = $("pickCityCta");
    if (b) b.addEventListener("click", openPicker);
  }
  function renderPrayerError() {
    prayerShell('<div class="pc-state"><p>' + esc(t("errorTimes")) + '</p>' +
      '<button type="button" class="pc-primary" id="retryBtn">' + esc(t("retry")) + "</button></div>");
    var b = $("retryBtn");
    if (b) b.addEventListener("click", function () { startPrayerFlow(true); });
  }

  function diyanetKeyOf(entry, key) {
    return { fajr: entry.Imsak, sunrise: entry.Gunes, dhuhr: entry.Ogle, asr: entry.Ikindi, maghrib: entry.Aksam, isha: entry.Yatsi }[key];
  }

  /**
   * ⚠️ SAAT DILIMI: vakitler SECILEN SEHRIN yerel saatidir, ziyaretcininki
   * degil. Kullanici baska bir sehre bakabildigi icin (orn. Istanbul'dan
   * New York) geri sayim/vurgu ziyaretcinin saatiyle HESAPLANAMAZ.
   *
   * ⚠️ API'nin GreenwichOrtalamaZamani alani GUVENILMEZ: New York icin bile
   * 3 (Turkiye saati) donduruyor (13 Agu 2026'da olculdu) — KULLANMA.
   * Sehrin gercek UTC farki gunes matematiginden cikarilir: ogle vakti
   * gunesin tepe anidir (+~5 dk Diyanet temkini); tepe aninin UTC karsiligi
   * boylam + zaman denklemiyle kesindir, fark = sehir ofseti. Ceyrek saate
   * yuvarlanir (Nepal +5:45 gibi ofsetler icin); hata payi ±4 dk, yuvarlama
   * araligi ±7,5 dk -> guvenli. Gun bazinda hesaplandigi icin DST gecisleri
   * pencere icinde kendiliginden dogru cikar.
   */
  function dayOfYearOf(dp) {
    return Math.floor((Date.UTC(dp.y, dp.m - 1, dp.d) - Date.UTC(dp.y, 0, 1)) / DAY_MS) + 1;
  }
  function entryOffsetMs(entry) {
    var dp = entryDateParts(entry);
    var tp = (entry.Ogle || "").split(":");
    if (!dp || tp.length < 2 || !savedCity) return 0;
    var B = 2 * Math.PI * (dayOfYearOf(dp) - 81) / 364;
    var eotMin = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B); // zaman denklemi (dk)
    var solarNoonUtcH = 12 - savedCity.lon / 15 - eotMin / 60;
    var clockH = (+tp[0]) + (+tp[1]) / 60;
    var q = Math.round((clockH - solarNoonUtcH - 5 / 60) * 4) / 4;
    return q * 3600000;
  }
  function entryDateParts(entry) {
    var p = (entry.MiladiTarihKisa || "").split(".");
    if (p.length !== 3) return null;
    return { d: +p[0], m: +p[1], y: +p[2] };
  }
  function eventEpoch(entry, timeStr) {
    var dp = entryDateParts(entry);
    var tp = (timeStr || "").split(":");
    if (!dp || tp.length < 2) return null;
    return Date.UTC(dp.y, dp.m - 1, dp.d, +tp[0], +tp[1]) - entryOffsetMs(entry);
  }
  /** Sehrin su anki takvim gunu (UTC alanlarinda okunur — yalniz y/m/d icin). */
  function cityToday(nowMs) {
    if (!monthData || monthData.length === 0) return null;
    var probe = null;
    for (var i = 0; i < monthData.length; i++) {
      var dp = entryDateParts(monthData[i]);
      if (!dp) continue;
      probe = monthData[i];
      // Sehir gunu, o gunun offset'iyle hesaplanan yerel gece yarisindan sonraysa aday
      var localMs = nowMs + entryOffsetMs(monthData[i]);
      var dayStart = Date.UTC(dp.y, dp.m - 1, dp.d);
      if (localMs >= dayStart && localMs < dayStart + DAY_MS) return monthData[i];
    }
    return null;
  }

  /**
   * Vurgu/geri sayim karari. PrayerTimes.java ile ayni kural: siradaki
   * olayin ONCEKI komsusu namazsa (gunes degilse) onun icindeyiz -> vurgu +
   * "Vaktin cikmasina"; degilse (kerahat) vurgu yok -> "X'e kalan". Olay
   * zinciri TUM takvim gunlerinden kurulur; boylece imsak oncesi pencereyi
   * dunku yatsi, yatsi sonrasini yarinki imsak dogal olarak baslatir/bitirir.
   */
  function computeNow() {
    if (!monthData) return null;
    var nowMs = Date.now();
    var today = cityToday(nowMs);
    if (!today) return null;

    // Gunun 6 satiri (liste sehrin bugunudur, gun devri yok — widget kurali)
    var rows = [];
    for (var i = 0; i < PRAYER_KEYS.length; i++) {
      var timeStr = diyanetKeyOf(today, PRAYER_KEYS[i]);
      if (!timeStr) return null;
      rows.push({ key: PRAYER_KEYS[i], time: timeStr });
    }

    // Tum gunlerden kronolojik olay zinciri (epoch)
    var chain = [];
    for (var e = 0; e < monthData.length; e++) {
      for (var k = 0; k < PRAYER_KEYS.length; k++) {
        var ts = diyanetKeyOf(monthData[e], PRAYER_KEYS[k]);
        var at = ts ? eventEpoch(monthData[e], ts) : null;
        if (at != null) chain.push({ key: PRAYER_KEYS[k], at: at });
      }
    }
    chain.sort(function (a, b) { return a.at - b.at; });

    var next = null, prev = null;
    for (var j = 0; j < chain.length; j++) {
      if (chain[j].at > nowMs) { next = chain[j]; prev = j > 0 ? chain[j - 1] : null; break; }
    }
    if (!next) {
      // Takvim penceresi tukendi (son gunun yatsisi da gecti)
      return { rows: rows, headKey: "isha", inside: true, label: ps().endsIn, targetAt: null };
    }
    var inside = prev ? prev.key !== "sunrise" : true; // veri bugun basliyorsa imsak oncesi = yatsi içi
    var headKey = inside ? (prev ? prev.key : "isha") : next.key;
    return {
      rows: rows,
      headKey: headKey,
      inside: inside,
      label: inside ? ps().endsIn : ps().until[next.key],
      targetAt: next.at,
    };
  }

  function renderPrayerReady() {
    var info = computeNow();
    if (!info) { renderPrayerError(); return; }
    var rowsHtml = "";
    for (var i = 0; i < info.rows.length; i++) {
      var e = info.rows[i];
      var current = info.inside && e.key === info.headKey;
      rowsHtml += '<div class="pc-row' + (current ? " current" : "") + (e.key === "sunrise" ? " muted" : "") + '">' +
        "<span>" + esc(ps().names[e.key]) + "</span><strong>" + esc(e.time) + "</strong></div>";
    }
    var srcNote = esc(t("sourceNote"));
    if (resolvedIlce && savedCity && normalize(resolvedIlce.ilceName) !== normalize(savedCity.nameEn || savedCity.name) &&
        normalize(resolvedIlce.ilceName) !== normalize(savedCity.name)) {
      srcNote += " " + esc(t("nearestNote").replace("{name}", titleCaseTr(resolvedIlce.ilceName)));
    }
    prayerShell(
      '<div class="pc-now">' +
      '<div class="pc-now-label" id="pcLabel">' + esc(info.label) + "</div>" +
      '<div class="pc-now-name" id="pcName">' + esc(upperLoc(ps().names[info.headKey], locale)) + "</div>" +
      '<div class="pc-countdown" id="pcCountdown">--:--:--</div>' +
      "</div>" +
      '<div class="pc-rows">' + rowsHtml + "</div>" +
      '<div class="pc-foot">' +
      '<button type="button" class="pc-month-btn" id="monthBtn">' + svgCalendar() +
      "<span>" + esc(monthOpen ? t("monthHide") : t("monthShow")) + "</span></button>" +
      '<p class="pc-src">' + srcNote + "</p></div>",
    );
    var mb = $("monthBtn");
    if (mb) mb.addEventListener("click", toggleMonth);
    tickCountdown();
  }

  /** Diyanet ilce adlari TAMAMEN BUYUK geliyor ("FRANKFURT (ODER)") — basliklastir. */
  function titleCaseTr(s) {
    return String(s).toLocaleLowerCase("tr-TR").replace(/(^|[\s(])\S/g, function (c) {
      return c.toLocaleUpperCase("tr-TR");
    });
  }

  function tickCountdown() {
    if (tickTimer) clearInterval(tickTimer);
    var lastHead = null;
    function step() {
      var info = computeNow();
      var el = $("pcCountdown");
      if (!info || !el) return;
      // Gun/vakit degisti mi? (gece yarisi + vakit sinirlari)
      if (renderedDayNum !== localDayNumber(new Date())) { rerenderAll(); return; }
      if (lastHead !== null && lastHead !== info.headKey) { renderPrayerReady(); renderMonthIfOpen(); return; }
      lastHead = info.headKey;
      if (info.targetAt == null) { el.textContent = "—"; return; }
      var msLeft = Math.max(0, info.targetAt - Date.now());
      var s = Math.floor(msLeft / 1000);
      var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
      el.textContent = pad(h) + ":" + pad(m) + ":" + pad(sec);
      var lbl = $("pcLabel"), nm = $("pcName");
      if (lbl) lbl.textContent = info.label;
      if (nm) nm.textContent = upperLoc(ps().names[info.headKey], locale);
    }
    step();
    tickTimer = setInterval(step, 1000);
  }

  // ── 30 gunluk takvim ─────────────────────────────────────────────────────
  function toggleMonth() {
    monthOpen = !monthOpen;
    // Takvim acikken yazdirma yalniz imsakiyeyi basar (print CSS bu sinifa bakar)
    document.body.classList.toggle("print-month", monthOpen);
    var wrap = $("monthWrap");
    if (wrap) wrap.hidden = !monthOpen;
    var btn = $("monthBtn");
    if (btn) {
      var span = btn.querySelector("span");
      if (span) span.textContent = monthOpen ? t("monthHide") : t("monthShow");
    }
    if (monthOpen) {
      renderMonth();
      var wrapEl = $("monthWrap");
      if (wrapEl && wrapEl.scrollIntoView) wrapEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  function renderMonthIfOpen() { if (monthOpen) renderMonth(); }

  function renderMonth() {
    var wrap = $("monthWrap");
    if (!wrap || !monthData || !savedCity) return;
    // "Bugun" SEHRIN gunu (ziyaretcininki degil) — computeNow ile ayni kaynak
    var todayEntry = cityToday(Date.now());
    var startIdx = todayEntry ? monthData.indexOf(todayEntry) : 0;

    // Bugunden ileriye en cok 30 gun (takvim penceresi gecmisten baslayabiliyor)
    var rows = [];
    for (var i = Math.max(0, startIdx); i < monthData.length && rows.length < 30; i++) {
      var e = monthData[i];
      var dp = entryDateParts(e);
      if (!dp) continue;
      rows.push({ entry: e, date: new Date(dp.y, dp.m - 1, dp.d), isToday: e === todayEntry });
    }
    if (rows.length === 0) { wrap.hidden = true; return; }

    var monthName = pickLoc(GREG_MONTHS_FULL, locale);
    var first = rows[0].date, last = rows[rows.length - 1].date;
    var range = first.getMonth() === last.getMonth()
      ? monthName[first.getMonth()] + " " + first.getFullYear()
      : monthName[first.getMonth()] + " – " + monthName[last.getMonth()] + " " + last.getFullYear();

    var head = "<tr><th>" + esc(t("dateHeader")) + "</th>";
    for (var k = 0; k < PRAYER_KEYS.length; k++) head += "<th>" + esc(ps().names[PRAYER_KEYS[k]]) + "</th>";
    head += "</tr>";

    var body = "";
    for (var r = 0; r < rows.length; r++) {
      var entry = rows[r].entry, d2 = rows[r].date;
      var isToday = rows[r].isToday;
      var wd = pickLoc(WEEKDAYS_FULL, locale)[d2.getDay()];
      body += '<tr class="' + (isToday ? "today" : "") + (d2.getDay() === 5 ? " friday" : "") + '">' +
        '<td class="mt-date"><strong>' + d2.getDate() + " " + esc(pickLoc(GREG_MONTHS_SHORT, locale)[d2.getMonth()]) +
        "</strong><span>" + esc(wd) + (isToday ? " · " + esc(t("today")) : "") + "</span></td>";
      for (var c = 0; c < PRAYER_KEYS.length; c++) {
        body += "<td>" + esc(diyanetKeyOf(entry, PRAYER_KEYS[c]) || "—") + "</td>";
      }
      body += "</tr>";
    }

    wrap.innerHTML =
      '<div class="month-head">' +
      '<div><h3>' + esc(cityDisplayName(savedCity)) + " · " + esc(range) + "</h3>" +
      '<p class="month-sub">' + esc(t("sourceNote")) + " manevihalka.app</p></div>" +
      '<button type="button" class="pc-primary" id="printBtn">' + svgPrint() + "<span>" + esc(t("print")) + "</span></button>" +
      "</div>" +
      '<div class="month-scroll"><table class="month-table">' +
      "<thead>" + head + "</thead><tbody>" + body + "</tbody></table></div>";
    var pb = $("printBtn");
    if (pb) pb.addEventListener("click", function () { window.print(); });
  }

  // ── akis ─────────────────────────────────────────────────────────────────
  // Yaris korumasi: kullanici hizla iki sehir secerse ESKI istegin gec gelen
  // cevabi yenisini ezmesin — her akis bir sira numarasi tasir, bayat olan
  // sonuclarini uygulamadan cikar.
  var flowSeq = 0;

  function startPrayerFlow(force) {
    var seq = ++flowSeq;
    var stale = function () { return seq !== flowSeq; };
    var explicit = loadSavedCity();
    var cityPromise = explicit
      ? Promise.resolve(explicit)
      : guessCityFromTimezone(); // yalniz acik secim kalici; tz tahmini her aciliste taze

    renderPrayerLoading(t("loading"));
    prayerState = "loading";

    cityPromise.then(function (city) {
      if (stale()) return;
      if (!city) { prayerState = "nocity"; savedCity = null; renderPrayerEmpty(); return; }
      savedCity = city;
      renderPrayerLoading(t("resolving"));
      return resolveDiyanetCity(city.cc, city.nameEn || city.name, { lat: city.lat, lon: city.lon })
        .then(function (ilce) {
          if (stale()) return;
          if (!ilce) { prayerState = "error"; renderPrayerError(); return; }
          resolvedIlce = ilce;
          renderPrayerLoading(t("loading"));
          return getTimes30(ilce.ilceID).then(function (data) {
            if (stale()) return;
            monthData = data;
            prayerState = "ready";
            renderedDayNum = localDayNumber(new Date());
            renderPrayerReady();
            renderMonthIfOpen();
          });
        });
    }).catch(function () {
      if (stale()) return;
      prayerState = "error";
      renderPrayerError();
    });
  }

  function setCity(city) {
    savedCity = city;
    resolvedIlce = null;
    monthData = null;
    if (city.src !== "tz") saveCity(city);
    startPrayerFlow(true);
  }

  /**
   * @param opts.silent Acilistaki otomatik kullanim: hata durumunda alert
   *   YOK, sessizce saat dilimi tahminine dusulur. Dugmeden cagrildiginda
   *   (silent yok) kullanici bilgilendirilir.
   */
  function useGps(opts) {
    var silent = !!(opts && opts.silent);
    if (!navigator.geolocation) {
      if (silent) { startPrayerFlow(false); return; }
      alert(t("gpsError"));
      return;
    }
    var seqAtClick = flowSeq;
    renderPrayerLoading(t("resolving"));
    navigator.geolocation.getCurrentPosition(function (pos) {
      // Kullanici bu arada elle sehir sectiyse gec gelen GPS sonucu onu ezmesin
      if (flowSeq !== seqAtClick) return;
      nearestCatalogCity(pos.coords.latitude, pos.coords.longitude).then(function (city) {
        if (flowSeq !== seqAtClick) return;
        if (city) setCity(city);
        else if (silent) startPrayerFlow(false);
        else renderPrayerError();
      });
    }, function () {
      if (flowSeq !== seqAtClick) return;
      if (silent) { startPrayerFlow(false); return; }
      alert(t("gpsError"));
      if (prayerState === "ready") renderPrayerReady();
      else startPrayerFlow(false);
    }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 });
  }

  /**
   * Acilis akisi: kayitli sehir > (izin ZATEN verilmisse) GPS > saat dilimi
   * tahmini. Izin sorgusu PENCERE ACMAZ — yalniz mevcut durumu okur; "granted"
   * degilse konum hic istenmez (kullanici istegi, 17 Agu 2026: izin verdigi
   * halde site tahmini sehri gosteriyordu).
   */
  function initialPrayerFlow() {
    if (loadSavedCity()) { startPrayerFlow(false); return; }
    if (navigator.permissions && navigator.permissions.query && navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then(function (st) {
        if (st.state === "granted") useGps({ silent: true });
        else startPrayerFlow(false);
      }).catch(function () { startPrayerFlow(false); });
    } else {
      startPrayerFlow(false);
    }
  }

  // ── sehir secici ─────────────────────────────────────────────────────────
  function openPicker() {
    var overlay = $("cityPicker");
    if (!overlay) return;
    overlay.querySelector(".cp-title").textContent = t("pickerTitle");
    overlay.querySelector(".cp-hint").textContent = t("pickerHint");
    overlay.querySelector(".cp-privacy").textContent = t("pickerPrivacy");
    $("cpClose").setAttribute("aria-label", t("close"));
    var gpsRow = $("cpGps");
    gpsRow.querySelector("span").textContent = t("useLocation");
    var input = $("cpSearch");
    input.value = "";
    input.setAttribute("placeholder", t("searchCity"));
    $("cpResults").innerHTML = "";
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    loadCities().then(function () { renderPickerResults(""); });
    setTimeout(function () { input.focus(); }, 60);
  }
  function closePicker() {
    var overlay = $("cityPicker");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function renderPickerResults(query) {
    var box = $("cpResults");
    if (!box || !citiesData) return;
    var q = normalize(query);
    var out = [];
    var popular = ["ISTANBUL", "ANKARA", "IZMIR", "BERLIN", "LONDON", "PARIS", "AMSTERDAM", "WIEN", "BRUXELLES", "NEWYORK", "MECCA", "MEDINA"];
    for (var i = 0; i < citiesData.countries.length && out.length < 40; i++) {
      var c = citiesData.countries[i];
      var countryLabel = locale === "tr" ? c.name : c.nameEn;
      for (var j = 0; j < c.cities.length && out.length < 40; j++) {
        var city = c.cities[j];
        var n0 = normalize(city[0]);
        var n1 = city[1] ? normalize(city[1]) : "";
        if (q) {
          if (n0.indexOf(q) !== 0 && (!n1 || n1.indexOf(q) !== 0) &&
              normalize(countryLabel).indexOf(q) !== 0) continue;
        } else {
          if (popular.indexOf(n0) === -1 && popular.indexOf(n1) === -1) continue;
        }
        out.push({ city: city, cc: c.code, country: countryLabel });
      }
    }
    if (out.length === 0) {
      box.innerHTML = '<p class="cp-empty">' + esc(t("noResults")) + "</p>";
      return;
    }
    var html = "";
    for (var k = 0; k < out.length; k++) {
      var name = locale === "tr" ? out[k].city[0] : (out[k].city[1] || out[k].city[0]);
      html += '<button type="button" class="cp-row" data-i="' + k + '">' +
        "<strong>" + esc(name) + "</strong><span>" + esc(out[k].country) + "</span></button>";
    }
    box.innerHTML = html;
    var btns = box.querySelectorAll(".cp-row");
    for (var b = 0; b < btns.length; b++) {
      (function (idx) {
        btns[idx].addEventListener("click", function () {
          var pick = out[idx];
          closePicker();
          setCity({
            name: pick.city[0],
            nameEn: pick.city[1] || pick.city[0],
            cc: pick.cc,
            lat: pick.city[2],
            lon: pick.city[3],
            src: "manual",
          });
        });
      })(b);
    }
  }

  function initPicker() {
    var overlay = $("cityPicker");
    if (!overlay) return;
    $("cpClose").addEventListener("click", closePicker);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closePicker(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) closePicker();
    });
    var input = $("cpSearch");
    var deb = null;
    input.addEventListener("input", function () {
      clearTimeout(deb);
      deb = setTimeout(function () { renderPickerResults(input.value); }, 120);
    });
    $("cpGps").addEventListener("click", function () { closePicker(); useGps(); });
  }

  // ── svg ikonlar (Ionicons cizgi dili) ────────────────────────────────────
  function svgClock() { return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'; }
  function svgPin() { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.4-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.6-6.5 10-6.5 10z"/><circle cx="12" cy="11" r="2.3"/></svg>'; }
  function svgLocate() { return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.4"/><path d="M12 2.5V6M12 18v3.5M21.5 12H18M6 12H2.5"/></svg>'; }
  function svgChevron() { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>'; }
  function svgCalendar() { return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 9.5h17M8 2.8V6M16 2.8V6"/></svg>'; }
  function svgPrint() { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8V3.5h10V8M7 17H4.5V10a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7H17"/><rect x="7" y="14.5" width="10" height="6" rx="1"/></svg>'; }

  // ── dil degisimi + baslangic ─────────────────────────────────────────────
  function rerenderAll() {
    renderedDayNum = localDayNumber(new Date());
    renderDateLine();
    renderCards();
    if (prayerState === "ready") { renderPrayerReady(); renderMonthIfOpen(); }
    else if (prayerState === "nocity") renderPrayerEmpty();
    else if (prayerState === "error") renderPrayerError();
    syncThemeUi();
  }

  function init() {
    locale = document.documentElement.getAttribute("lang") || "en";
    initTheme();
    initStoreButtons();
    initPicker();
    renderDateLine(); // hicri kisim aninda; dini gun cipi veri gelince
    renderedDayNum = localDayNumber(new Date());

    loadDaily().then(function () {
      renderDateLine();
      renderCards();
    }).catch(function () { /* kartlar bos kalir, sayfa calismaya devam eder */ });

    initialPrayerFlow();

    document.addEventListener("mh:locale", function (e) {
      locale = e.detail || "en";
      rerenderAll();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
