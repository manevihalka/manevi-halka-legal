---
layout: default
title: Hesap Silme
lang: tr
---

# Hesap Silme

**Uygulama:** Manevi Halka
**Geliştirici:** Emirhan Ayaz
**İletişim:** emirhan.ayaz171@icloud.com

Manevi Halka uygulamasındaki hesabınızı ve verilerinizi istediğiniz zaman silebilirsiniz.

## 1. Silme Akışı — 30 Gün Geri Alma + Kalıcı Silme

Hesap silme **iki aşamalıdır**:

1. **Soft-delete (anında, geri alınabilir):** "Hesabı Sil"e bastığınızda hesabınız işaretlenir. Push bildirimleri kesilir, hesabınız diğer üyelere görünmez olur.
2. **30 günlük geri alma penceresi:** Bu süre içinde tekrar giriş yaparsanız hesabınız tüm verileriyle birlikte geri yüklenir.
3. **Kalıcı silme (otomatik):** 30 günden sonra günlük bir cron görevi (pg_cron, 03:00 UTC) hesabınızı ve tüm verilerinizi **kalıcı olarak siler**. Bu adım geri alınamaz.

**30 gün beklemeden anında kalıcı silme** isterseniz, e-posta yoluyla başvurabilirsiniz (aşağıdaki §4).

## 2. Uygulama İçinden Silme (Önerilen Yöntem)

1. Manevi Halka uygulamasını açın
2. Hesabınızla giriş yapın
3. **Profil** sekmesine gidin
4. **Ayarlar → Hesap ve Güvenlik** menüsünü açın
5. Sayfanın altındaki **"Hesabı Sil"** kırmızı butonuna basın
6. Onay ekranında talimatları takip edin

## 3. Silmeden Önce Verilerinizi Dışa Aktarma (Opsiyonel)

İsterseniz silmeden önce tüm verilerinizi yedek alabilirsiniz:

**Profil → Ayarlar → Veri Dışa Aktar → PDF olarak indir**

Bu özellik GDPR/KVKK taşınabilirlik hakkı kapsamındadır ve aşağıdaki tüm bilgileri içerir: profil, halka üyelikleri, ibadet ilerleme verileri, Kuran/kitap notları, abonelik durumu.

## 4. E-posta Yoluyla Silme Talebi

Uygulamaya erişiminiz yoksa veya **anında kalıcı silme** istiyorsanız, **hesabınızla ilişkili e-posta adresinden** mesaj atın:

- **E-posta:** [emirhan.ayaz171@icloud.com](mailto:emirhan.ayaz171@icloud.com)
- **Konu:** Hesap Silme Talebi
- **İçerik:** "Manevi Halka hesabımın silinmesini talep ediyorum. [Anında silme / 30 gün soft-delete kabul]"

Talebiniz **30 gün içinde** işleme alınır ve sonuç size e-posta ile bildirilir.

## Silinen Veriler

30 günlük sürenin sonunda (veya anında silme talebinde) aşağıdaki veriler kalıcı olarak silinir:

- E-posta adresi ve hesap kimliği
- Profil bilgileri (ad, kullanıcı adı, profil fotoğrafı)
- Zikir, hatim, dua takibi gibi ibadet ilerleme verileri
- Üyesi olduğunuz halkalardan çıkış (halkalar size atfedilen kayıtlar anonimleştirilir)
- Kuran ayet notlarınız, kitap okuma notlarınız
- Push bildirim tokenları
- Abonelik durumu

## Saklanan Veriler

Yasal yükümlülükler ve dolandırıcılık önleme amacıyla bazı sınırlı veriler en fazla **90 gün** süreyle anonim bir formda saklanabilir:

- Hesap silme tarihi (anonim log)
- Faturalandırma kayıtları (yasal zorunluluk gereği RevenueCat tarafından)

---

**Son güncelleme:** 12 Mayıs 2026
