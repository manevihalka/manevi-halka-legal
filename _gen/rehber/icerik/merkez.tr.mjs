// P0 · Rehber merkezi (TR). 21 Kas 2026: 2.1.0 ile iki grup (Birlikte, Kendi ibadetin) ve kısa sözlük.
// Kartların metni her rehberin kendi `kart` alanından gelir; burada yalnız sayfanın kendi metni.
export default {
  title: "Manevi Halka rehberleri: hatim, 41 Yâsîn, zikir, kaza",
  desc: "Hatim ve 41 Yâsîn halkası, toplu zikir, kaza takibi, teheccüd alarmı ve Niyet Bahçesi: uygulamanın kendi ekranlarıyla adım adım rehberler.",
  h1: "Adım adım rehberler",
  eyebrow: "Nasıl yapılır",
  lead: "Her rehber uygulamanın kendi ekranlarıyla anlatır: dokunacağın düğmeyi görür, birkaç dakikada başlarsın. Ailenle bir hatim, bir vesileyle 41 Yâsîn ya da kendine sessiz bir niyet; hepsi burada. Hatmi kâğıtta düzenlemek istersen [yazdırılabilir hatim çizelgesi](/tr/hatim-cizelgesi/) de hazır.",
  gruplar: {
    birlikte: { baslik: "Birlikte", metin: "Bir halka kur ya da bir davete katıl. Okunacak olanı uygulama paylaştırır, herkes kendi yerinde okur." },
    kendi: { baslik: "Kendi ibadetin", metin: "Yalnız senin için: kazalarını tamamla, teheccüde kalk, niyetlerini büyüt, dualarını yaz." },
  },
  sozluk: {
    baslik: "Kısa sözlük",
    giris: "Rehberlerde sık geçen birkaç kelime.",
    terimler: [
      { t: "Halka", d: "Birlikte ibadet ettiğin topluluk: ailen, arkadaşların, caminin cemaati. Bir kez kurulur, davet bağlantısıyla büyür." },
      { t: "Görev", d: "Halkanın içindeki ortak iş: bir hatim, bir zikir hedefi, bir oruç. Aynı halkada birden çok görev olabilir." },
      { t: "Tek seferlik halka", d: "Bir vesile için kurulan, bitişi belli halka: hatim, 41 Yâsîn ya da salavat. Hedefe varınca tamamlanır." },
      { t: "Tur", d: "Düzenli halkada payların yenilendiği dönem. Gün ya da hafta dolunca sıradaki paylar kendiliğinden dağıtılır." },
      { t: "Havuz", d: "Henüz kimsenin almadığı ya da yardım istenen paylar burada bekler; dileyen alır." },
      { t: "Davet bağlantısı", d: "Halkaya katılmanın yolu: bağlantıya dokunmak ya da kısa kodu yazmak. Uygulaması olmayan da bağlantıdan tek seferlik halkaya katılabilir." },
      { t: "Niyet", d: "Niyet Bahçesi'nde kendine koyduğun düzenli amel. Her niyet bir fidan olur, sen emek verdikçe büyür." },
    ],
  },
};
