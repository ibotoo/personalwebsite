# Email Servis Kurulumu

İletişim formunun çalışması için aşağıdaki adımları takip edin:

## 1. Resend Hesabı Oluşturun
- https://resend.com adresine gidin
- Ücretsiz hesap oluşturun
- API Key alın

## 2. Environment Değişkenlerini Ayarlayın
Proje ana dizininde `.env.local` dosyası oluşturun:

```bash
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxx

# Email adresleri
TO_EMAIL=mail@ibrahimsancar.com
FROM_EMAIL=noreply@ibrahimsancar.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://ibrahimsancar.com
```

## 3. Domain Doğrulaması (Opsiyonel)
- Resend panelinde domain ekleyin
- DNS kayıtlarını ayarlayın
- Doğrulama tamamlandıktan sonra FROM_EMAIL'i kendi domain'inizle güncelleyin

## Sorun Giderme

### İletişim formu çalışmıyorsa:
1. `.env.local` dosyasının var olduğunu kontrol edin
2. RESEND_API_KEY'in doğru olduğunu kontrol edin
3. Browser console'da hata mesajlarını kontrol edin
4. `/api/contact` endpoint'ine doğrudan POST isteği göndererek test edin

### Geliştirme ortamında test:
```bash
npm run dev
```

Ardından http://localhost:3000/iletisim sayfasına gidip formu test edin. 