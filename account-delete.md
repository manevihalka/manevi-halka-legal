---
layout: default
title: Hesap Silme
description: "Manevi Halka hesabını uygulamadan ya da e-postayla nasıl sileceğin, 30 günlük geri alma süresi ve hangi verilerin silinip hangilerinin saklanabileceği."
lang: tr
---

# Hesap Silme

**Uygulama:** Manevi Halka<br>
**Geliştirici:** Emirhan Ayaz<br>
**İletişim:** privacy@manevihalka.app

Manevi Halka uygulamasındaki hesabını ve verilerini istediğin zaman silebilirsin.

## 1. Silme Akışı: 30 Gün Geri Alma + Kalıcı Silme

Hesap silme **iki aşamalıdır**:

1. **Soft-delete (anında, geri alınabilir):** "Hesabımı kalıcı olarak sil" ile onayladığında hesabın işaretlenir. Push bildirimleri kesilir, hesabın diğer üyelere görünmez olur.
2. **30 günlük geri alma penceresi:** Bu süre içinde tekrar giriş yaparsan hesabın tüm verileriyle birlikte geri yüklenir.
3. **Kalıcı silme (otomatik):** 30 günden sonra günlük bir cron görevi (pg_cron, 03:00 UTC) hesabını ve tüm verilerini **kalıcı olarak siler**. Bu adım geri alınamaz.

**30 gün beklemeden anında kalıcı silme** istersen, e-posta yoluyla başvurabilirsin (aşağıdaki §4).

## 2. Uygulama İçinden Silme (Önerilen Yöntem)

1. Manevi Halka uygulamasını aç
2. Hesabınla giriş yap
3. **Profil** sekmesine git
4. **Hesap & Güvenlik** satırına dokun
5. Sayfanın altındaki kırmızı **"Hesabı kalıcı olarak sil"** satırına dokun
6. Onay ekranında talimatları takip et

## 3. Silmeden Önce Verilerini Dışa Aktarma (Opsiyonel)

İstersen silmeden önce tüm verilerini yedek alabilirsin:

**Profil → Hesap & Güvenlik → Verilerimi İndir** (PDF olarak indirilir)

Bu özellik GDPR/KVKK taşınabilirlik hakkı kapsamındadır ve aşağıdaki tüm bilgileri içerir: profil, halka üyelikleri, ibadet ilerleme verileri, Kuran/kitap notları, abonelik durumu.

## 4. E-posta Yoluyla Silme Talebi

Uygulamaya erişimin yoksa veya **anında kalıcı silme** istiyorsan, **hesabınla ilişkili e-posta adresinden** mesaj at:

- **E-posta:** [privacy@manevihalka.app](mailto:privacy@manevihalka.app)
- **Konu:** Hesap Silme Talebi
- **İçerik:** "Manevi Halka hesabımın silinmesini talep ediyorum. [Anında silme / 30 gün soft-delete kabul]"

Talebin **30 gün içinde** işleme alınır ve sonuç sana e-posta ile bildirilir.

## Silinen Veriler

30 günlük sürenin sonunda (veya anında silme talebinde) aşağıdaki veriler kalıcı olarak silinir:

- E-posta adresi ve hesap kimliği
- Profil bilgileri (ad, kullanıcı adı, profil fotoğrafı)
- Zikir, hatim, dua takibi gibi ibadet ilerleme verileri
- Üyesi olduğun halkalardan çıkış (halkalar sana atfedilen kayıtlar anonimleştirilir)
- Kuran ayet notların, kitap okuma notların
- Push bildirim tokenları
- Abonelik durumu
- Bu cihazdaki kişisel kayıtların: dua emanetlerin, niyet zikirlerin ve ithaf
  kayıtların, favori duaların, tesbihat ilerlemen, Kitaplık'taki kitapların,
  notların ve vurguların (bunlar hesabını sildiğin cihazdan hemen silinir;
  başka cihazların varsa oradaki kayıtlar o cihazda kalır)

## Saklanan Veriler

Yasal yükümlülükler ve dolandırıcılık önleme amacıyla bazı sınırlı veriler en fazla **90 gün** süreyle anonim bir formda saklanabilir:

- Hesap silme tarihi (anonim log)
- Faturalandırma kayıtları (yasal zorunluluk gereği RevenueCat tarafından)

---

**Son güncelleme:** 17 Ekim 2026
