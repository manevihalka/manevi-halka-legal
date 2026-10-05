/**
 * Sitenin dil adresleri, TEK KAYNAK (ana sayfa ve vakit sayfasi ureticileri okur).
 *
 * 28 Eyl 2026: ana sayfa uygulama tanitimi oldu (_gen/build-home.mjs), namaz
 * vakitleri kendi sayfasina tasindi (_gen/build-vakit.mjs). Kok Ingilizce taban
 * ve hreflang="x-default"; /en/ ACILMAZ (kokle ayni metni tasiyan ikinci sayfa).
 * Vakit sayfasinin adresi her dilde kendi sozcugu (arama sonucunda okunur);
 * Arapca ASCII harf cevirisi.
 */
export const SITE = "https://manevihalka.app";
export const DILLER = ["tr", "en", "de", "fr", "ar"];
export const EV = { en: "/", tr: "/tr/", de: "/de/", fr: "/fr/", ar: "/ar/" };
export const VAKIT = {
  en: "/prayer-times/", tr: "/tr/namaz-vakitleri/", de: "/de/gebetszeiten/",
  fr: "/fr/horaires-de-priere/", ar: "/ar/mawaqit/",
};
/** Eski /app/ adresleri (28 Eyl 2026'da birkac saat yayinda kaldi): ana sayfaya yonlenir. */
export const ESKI_APP = { en: "/app/", tr: "/tr/app/", de: "/de/app/", fr: "/fr/app/", ar: "/ar/app/" };
/**
 * Rehber sayfalari (5 Eki 2026, _gen/build-rehber.mjs). Her dilin kendi sozcugu ve
 * kendi sayfa adlari (arama dili: TR "hatim grubu", EN "khatam", FR "khatma", AR harf cevirisi).
 * Kimlikler (hatim, tek, zikir, katil) dilden bagimsiz; icerik dosyalari bu adla aranir.
 */
export const REHBER = { en: "/guides/", tr: "/tr/rehber/", de: "/de/anleitungen/", fr: "/fr/guides/", ar: "/ar/dalil/" };
export const REHBER_SAYFA = {
  hatim: { en: "group-khatam/", tr: "hatim-grubu-kurma/", de: "khatm-gruppe/", fr: "khatma-en-groupe/", ar: "khatma-jamaiya/" },
  // Tek seferlik halka (5 Eki 2026: once "vefat eden icin hatim" diye daraltilmisti, kullanici duzeltti:
  // tek seferlik halka her vesile icin; vefat ve kandil yalniz ornek). Adlar uygulamadaki ozellik adi.
  tek: { en: "one-time-circle/", tr: "tek-seferlik-halka/", de: "einmaliger-kreis/", fr: "cercle-ponctuel/", ar: "halqa-li-marra-wahida/" },
  zikir: { en: "group-dhikr-salawat/", tr: "toplu-zikir-salavat/", de: "dhikr-salawat-gemeinsam/", fr: "dhikr-salawat-en-groupe/", ar: "dhikr-jamai/" },
  katil: { en: "join-a-circle/", tr: "halkaya-katilma/", de: "kreis-beitreten/", fr: "rejoindre-un-cercle/", ar: "indimam-ila-halqa/" },
};
/** Rehber adresi: rehberAdresi("hatim", "tr") -> "/tr/rehber/hatim-grubu-kurma/"; kimlik yoksa merkez. */
export const rehberAdresi = (id, dil) => REHBER[dil] + (id ? REHBER_SAYFA[id][dil] : "");
export const DIL_ADI = { tr: "Türkçe", en: "English", de: "Deutsch", fr: "Français", ar: "العربية" };
export const OG_LOCALE = { tr: "tr_TR", en: "en_US", de: "de_DE", fr: "fr_FR", ar: "ar_AR" };
/** Bir adres haritasindan dosya yolu: "/tr/" -> "tr/index.html", "/" -> "index.html". */
export const dosyaYolu = (u) => (u === "/" ? "index.html" : u.replace(/^\//, "") + "index.html");
export const tamAdres = (u) => SITE + u;
/**
 * Ortak Okuma sayfasi (5 Eki 2026, _gen/build-ortak.mjs): her dilin kendi adresi ve kendi sozcugu
 * (Ortak Okuma, Shared Reading, Gemeinsames Lesen, Lecture commune, القراءة المشتركة; Arapca ASCII
 * harf cevirisi). Eski /ortak-okuma.html ve /hatim.html yonlendirme kabugu (noindex): dili secip
 * sorgu dizesi ve # ile buraya gecer. ⚠️ js/ortak-hatim.js ORTAK_URL ve 404.html ayni haritayi tasir
 * (uretici ikisini de denetler).
 */
export const ORTAK = { en: "/shared-reading/", tr: "/tr/ortak-okuma/", de: "/de/gemeinsames-lesen/", fr: "/fr/lecture-commune/", ar: "/ar/qiraa-mushtaraka/" };
/**
 * Yazdirilabilir hatim cizelgesi (5 Eki 2026, _gen/build-cizelge.mjs). Her dilin arama sozcugu:
 * TR "hatim cizelgesi", EN "khatam chart", DE "Khatm-Plan", FR "tableau khatma", AR "جدول ختمة" (harf cevirisi).
 * Rehber sayfalarindan (hatim rehberi ve merkez) baglanir.
 */
export const CIZELGE = { en: "/khatam-chart/", tr: "/tr/hatim-cizelgesi/", de: "/de/khatm-plan/", fr: "/fr/tableau-khatma/", ar: "/ar/jadwal-khatma/" };
