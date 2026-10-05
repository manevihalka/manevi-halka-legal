# Rehber sayfaları (manevihalka.app) — yazar kılavuzu

5 Ekim 2026'da kuruldu. Uygulamada nasıl yapılır sorularını (hatim grubu kurma, tek seferlik halka,
toplu zikir, davetle katılma) **uygulamanın kendi ekranlarını taklit eden canlı mini telefonlarla**,
adım adım anlatır. 5 dil: tr, en, de, fr, ar. Adresler `_gen/site-urls.mjs` (`REHBER`, `REHBER_SAYFA`).

## Dosyalar

| Dosya | Ne |
|---|---|
| `_gen/rehber.src.html` | Sayfa kabuğu: üst çubuk, altbilgi, tema, bütün CSS, mini telefon motoru (JS). |
| `_gen/build-rehber.mjs` | Üretici. `node _gen/build-rehber.mjs` (yazar), `--check`, `--tam` (5 dil şart). |
| `_gen/rehber/sahne.mjs` | Çekirdek: yapı taşları, ortak görünümler (`K.V.*`, `K.O.*`), ikonlar, `ORNEK` (dile göre örnek veriler). |
| `_gen/rehber/sahneler.mjs` | Hatim rehberinin ekranları (`SAHNE`) ve 30 taneli tur halkası. |
| `_gen/rehber/sahneler-<id>.mjs` | **Her rehberin kendi ek ekranları.** `export const SAHNE = {...}`, isteğe bağlı `export const CSS = "..."`, `export const IKON = {...}`. Üretici hepsini birleştirir; aynı kimlik iki yerde olamaz. |
| `_gen/rehber/icerik/<id>.<dil>.mjs` | Sayfa metni (`export default {...}`). id: `merkez`, `hatim`, `tek`, `zikir`, `katil`. |
| `_gen/rehber/app-labels.json` | Uygulamanın metinleri, ÜRETİLİR: `node _gen/sync-app-labels.mjs` (kaynak `../SpiritualCircleApp/locales`). |
| `img/rehber/<dil>/*.webp` | Gerçek ekran kareleri (640 px). |

Paralel çalışırken **yalnız kendi dosyalarına** dokun (`sahneler-<id>.mjs`, `icerik/<id>.*.mjs`).
`sahne.mjs`, `sahneler.mjs`, `rehber.src.html`, `build-rehber.mjs` ortak; değişiklik gerekiyorsa
kendi dosyanda çöz (ek CSS, ek ikon, kendi görünüm fonksiyonların).

## Değişmez kurallar

1. **Düğme ve başlık adları uygulamadan gelir.** Mini ekranda `K.L("anahtar")`, metinde `[[anahtar]]`.
   Anahtarı uygulamanın `locales/tr.json` içinde bul; yeni anahtar ekleyince `node _gen/sync-app-labels.mjs`.
   Uydurma düğme adı yazma. Uygulamada olmayan bir şeyi mini ekranda gösterme.
2. **Cevşen sitede geçmez** (tanıtım yüzeyi kuralı). Cevşen kartı olan ekranlarda karo boş iskelet
   (`<span class="tile skel"><i></i><i></i></span>`), Cevşen geçen locale metinlerini kullanma.
   Üretici `Cevşen/Jawshan/Dschauschan/جوشن` görürse durur.
3. **Uzun tire (—) yok**, ayraç olarak kısa tire de yok. Virgül, iki nokta, nokta. Aralık tiresi (1–5) serbest.
4. **Emoji yok.**
5. **Dini dil:** sevap/fazilet vaadi yok, fıkıh hükmü yok. "Olur mu?" sorularına yalnız doğrulanmış kaynak
   bağlantısı (TR: Diyanet DİYK; DE ve AR: Dar al-Ifta; EN/FR: bağlantısız, hüküm kurmadan).
   Belli gün ritüeli (3., 7., 40. gün) önerme. Tek seferlik halka ve zikir sayfalarında "herkes kendi yerinde
   okur/çeker, uygulama yalnız paylaştırır/sayıları toplar" cümlesi bulunsun.
   Tek seferlik halka sayfası GENEL rehberdir (kandil, Ramazan, vefat, şifa niyeti...): vefat yalnız bir
   örnek bölümdür, başlık/açıklama/giriş onu tek amaç gibi sunmaz (kullanıcı kararı, 5 Eki 2026).
6. **Hitap:** TR "sen", DE "du", FR "tu", EN doğal ikinci şahıs, AR tekil hitap (أنت). Uygulamanın hitabıyla aynı.
7. **Arama dili:** başlık/açıklama/H1 `scratchpad` araştırmasındaki tablolardan (EN "khatam", FR "khatma",
   AR "ختمة جماعية"/"للميت", DE "Khatm" + bir kez "(Hatim)"). Metin sade: kısa cümleler, bir adımda bir iş.
8. **Fark cümlesi adımın içinde**, karşılaştırma yok: "tek uygulama", "en iyi", rakip adı yazma.
9. Ücretsiz/premium sınırları: halka yönetmek ücretsizde 1, katılmak sınırsız, Kur'an hedefi kurmak ücretsiz.
   Fiyat yazma.

## İçerik dosyası

`hatim.tr.mjs` örnek. Alanlar: `title` (<60), `desc` (≤155), `h1`, `crumb`, `eyebrow`, `lead`, `meta` (3 kısa
etiket), `film {sahne, cap}` (girişteki uzun film), `kisa {maddeler}` (5-6 maddelik özet, öne çıkan cevap için),
`govde` (bloklar), `sss {sorular:[{s, c}]}`, `ilgili` (öteki rehber kimlikleri), `kart {kicker, baslik, metin}`
(merkez ve ilgili kartları), `onizleme {sahne, adim}` (merkezdeki durağan telefon), isteğe bağlı `cta {baslik, metin}`.

Bloklar: `bolum` (numaralı adımlar), `halka` (30 taneli tur halkası), `ikili` (iki kart + telefon), `ekranlar`
(gerçek kareler). Adım: `baslik`, `metin` (string ya da paragraf dizisi), `liste`, `fark` (yıldızlı not: farkımız),
`ipucu` (ampullü not), `sahne` (mini telefon kimliği).

Metin işaretleri: `**kalın**`, `[yazı](/adres)`, `[[anahtar]]` dolu düğme, `[[ol:anahtar]]` çerçeveli düğme,
`[[tx:anahtar]]` seçenek/etiket, `[[=yazı]]` anahtarı olmayan uygulama adı. İç bağlantılar dilin kendi
adresine (`/tr/rehber/...`, `/guides/...`, `/de/anleitungen/...`, `/fr/guides/...`, `/ar/dalil/...`).

## Mini telefon (sahne)

```js
// _gen/rehber/sahneler-<id>.mjs
export const SAHNE = {
  "benim-ekranim": (K) => K.telefon({
    aria: "Ekranın kısa anlatımı (ekran okuyucu)",
    views: [["a", ilkGorunum(K)], ["b", ikinci(K), "push"]],      // taban görünümler; ilki açık başlar
    overlays: [["p", `<div class="card-c">...</div>`, "pop"]],     // üstlükler: pop | sheet
    tl: [["w", 800], ["tap", "dugme"], ["go", "b"], ["ov", "p"], ["type", "ad", "Ailem"], ["on", "kaydet", "en"], ["w", 1500]],
    still: 2, hint: "dugme",   // hareketi azaltta 2 adım kurulur, "dugme" halkayla gösterilir
  }),
};
export const CSS = `.mp-s .benim { ... }`;   // yalnız .mp-s altında, em birimiyle
```

- Geçişler: taban görünümde 3. eleman `push` (sağdan), `back` (geri), `up` (alttan tam ekran), `fade`.
- Zaman çizelgesi fiilleri: `go`, `ov`, `cl`, `tap`, `type`, `on`/`off` (sınıf), `st` (stil), `txt` (metin), `y`, `w`.
  Dokunulacak/yazılacak öğe `data-k="..."` taşır: `K.bt(label, {key})`, `K.input({key, ph})`, `${K.attr("k")}`.
- Yapı taşları (`K.`): `bt(label, {key, cls, icon, iconEnd})` (cls: `blk lg sm pill ol gh dis red wht glass ink float`),
  `input`, `tg(on)`, `chip(label, on, key, sub)`, `hd({title, sub, sub2, right, keyRight})`, `wizHd(adim, toplam, ilk)`,
  `tabbar(on)`, `avatar(ad, renk)`, `brand()`, `ic(ikon, "fl")` (`fl`: Arapçada aynalanır), `num("3 / 5")`
  (Arapçada sayı dizisini korur), `L(anahtar, değişkenler)` (ICU çoğul destekli), `Le` (kaçışlı), `e`, `X` (örnek veriler).
- Hazır görünümler: `K.V.circlesAnon/createForm/circleReady/circleWithTask/wiz1..wiz5/lock/home/task/reader/done/circleTab`,
  üstlükler `K.O.nameSheet/secure/share/invite/success/readerConfirm/helpAsk`.
- Sınıflar (`rehber.src.html` MINI TELEFON bölümü): `.pg .t1 .t2 .lb .sec .mu .gr .c .cap .row .row2 .cd .note .ro .list .li
  .opt .sub .chps .chp .grid2 .tile .seg .seg2 .gcard .tab .fab .hd .card-c .sheet .badge-ic .big-ic ...`
- Ekranda yazı az olsun: mini telefon bir resim gibi okunur, asıl anlatım yanındaki metindedir.
- Gerçek uygulamada olmayan bir hâl çizme; emin değilsen koddan bak (rapor dosyaları akışı anlatır).

## Uygulama içi kip (`?app=1`)

Uygulama rehberleri kendi tarayıcı penceresinde açar: `…/tr/rehber/hatim-grubu-kurma/?app=1&theme=dark`
(adresler uygulamada `lib/guides.ts`; `REHBER`/`REHBER_SAYFA` değişirse orayı da değiştir).
Bu kipte üst çubuk, indirme bölümü (`#download`), altbilgi ve kırıntıdaki "Manevi Halka" gizlenir;
tema uygulamadan gelir. Kip, pencerenin oturumu boyunca `sessionStorage`'da tutulur (rehberden
rehbere geçişte adreste parametre yok). Sebep: uygulamanın içinde indirme düğmesi anlamsız ve
iOS uygulamasında Google Play rozeti Apple 2.3.10'a takılabilir. Rehbere yeni bir mağaza bağlantısı
ya da site menüsüne giden bir bağlantı eklersen bu kipte de gizli kalmasına bak (`rehber.src.html`,
"uygulama ici kip").
Deneme: `http://localhost:7789/tr/rehber/?app=1&theme=dark` (önbellekten eski sayfa gelirse yenile).

## Kontrol

```
node _gen/sync-app-labels.mjs
node _gen/build-rehber.mjs --yalniz <id> --dil <dil>   # yalnız o rehber ve o dil (paralel çalışırken bunu kullan)
node _gen/build-rehber.mjs            # hepsi + site haritası; durursa hata mesajını oku (eksik anahtar, Cevşen, uzun tire, kare yok)
python3 -m http.server 7789           # sonra http://localhost:7789/tr/rehber/...
```
