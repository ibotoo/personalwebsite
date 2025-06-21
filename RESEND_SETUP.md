# Resend API Kurulumu - İletişim Formu için

## 1. Resend Hesabı Oluşturun
1. https://resend.com adresine gidin
2. "Sign Up" butonuna tıklayın
3. Email adresinizle ücretsiz hesap oluşturun
4. Email doğrulamasını yapın

## 2. API Key Alın
1. Resend dashboard'a giriş yapın
2. Sol menüden "API Keys" seçin
3. "Create API Key" butonuna tıklayın
4. Key'e bir isim verin (örn: "Ibrahim Sancar Website")
5. "Full access" seçin
6. "Add" butonuna tıklayın
7. Oluşan API key'i kopyalayın (re_... ile başlar)

## 3. Environment Dosyasını Güncelleyin
`.env.local` dosyasındaki placeholder'ı gerçek API key ile değiştirin:

```bash
# Gerçek API key'inizi buraya yazın
RESEND_API_KEY=re_gerçek_api_keyiniz_buraya

TO_EMAIL=mail@ibrahimsancar.com
FROM_EMAIL=noreply@ibrahimsancar.com
NEXT_PUBLIC_SITE_URL=https://ibrahimsancar.com
```

## 4. Domain Doğrulaması (Opsiyonel - Daha İyi Delivery için)
1. Resend dashboard'da "Domains" seçin
2. "Add Domain" ile ibrahimsancar.com ekleyin
3. Verilen DNS kayıtlarını domain ayarlarınıza ekleyin
4. Doğrulama tamamlandıktan sonra FROM_EMAIL'i güncelleyin:
   ```
   FROM_EMAIL=noreply@ibrahimsancar.com
   ```

## 5. Test Edin
1. Development server'ı yeniden başlatın: `npm run dev`
2. http://localhost:3000/iletisim sayfasına gidin
3. Formu doldurup test edin
4. Resend dashboard'da "Logs" bölümünden email gönderimini kontrol edin

## Sorun Giderme
- API key doğru mu? (re_ ile başlamalı)
- Environment dosyası doğru yerde mi? (proje ana dizininde .env.local)
- Server yeniden başlatıldı mı?
- Browser console'da hata var mı?

## Ücretsiz Limitler
- Ayda 3,000 email (yeterli olacaktır)
- Günde 100 email
- Domain doğrulaması olmadan sandbox modu 