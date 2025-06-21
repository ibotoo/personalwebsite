# Email Sorun Giderme Rehberi - mail@ibrahimsancar.com

## Mevcut Durum
✅ Gmail hesapları oluşturuldu:
- `mail@ibrahimsancar.com` 
- `giris@ibrahimsancar.com` (muhtemelen bu da mevcut)

❌ Test emaili gelmiyor

## Hızlı Kontrol Listesi

### 1. 🔍 İlk Kontroller (2 dakika)
```bash
# A) Spam/Junk klasörünü kontrol edin
- Gmail: Spam klasörü
- Outlook: Junk email klasörü

# B) Email adresini doğru yazdığınızdan emin olun
- Tam adres: mail@ibrahimsancar.com
- @ işareti doğru mu?
- ibrahimsancar.com doğru mu?

# C) Gmail'de "All Mail" klasörünü kontrol edin
- Sol menüde "More" > "All Mail"
```

### 2. 📧 Gmail Ayarları Kontrolü

#### A) Gmail Web'de Giriş Yapın:
1. https://gmail.com adresine git
2. mail@ibrahimsancar.com ile giriş yap
3. Inbox'ta mesaj var mı kontrol et

#### B) Forwarding Ayarları:
```bash
Gmail Settings > Forwarding and POP/IMAP:
1. "Forwarding" sekmesini aç
2. Eğer forwarding aktifse deaktif et (geçici olarak)
3. "IMAP access" ENABLED olmalı
```

#### C) Filters Kontrolü:
```bash
Gmail Settings > Filters and Blocked Addresses:
- Yanlışlıkla filter oluşturulmuş mu?
- Kendi email adresiniz blocked listede mi?
```

### 3. 🌐 DNS Propagation Kontrolü

#### MX Records Test:
```bash
# Online tool kullan:
https://mxtoolbox.com/domain/ibrahimsancar.com

# Terminal'de test (Windows):
nslookup -type=MX ibrahimsancar.com

# Sonuç şu şekilde olmalı:
ibrahimsancar.com MX preference = 1, mail exchanger = aspmx.l.google.com
ibrahimsancar.com MX preference = 5, mail exchanger = alt1.aspmx.l.google.com
```

#### DNS Propagation:
```bash
# Test sitesi:
https://dnschecker.org/
- Domain: ibrahimsancar.com
- Type: MX
- Dünya genelinde propagate olmuş mu kontrol et
```

### 4. 🔧 Domain Provider Ayarları

#### Namecheap/GoDaddy/Cloudflare DNS:
```bash
Kontrol Edilecekler:
1. MX Records doğru ayarlanmış mı?
2. A Record domain'e pointing yapıyor mu?
3. CNAME records çakışma yapıyor mu?
4. TTL değerleri çok yüksek mi? (3600 olmalı)
```

#### MX Records (Google Workspace):
```
Type: MX | Name: @ | Value: 1 aspmx.l.google.com
Type: MX | Name: @ | Value: 5 alt1.aspmx.l.google.com  
Type: MX | Name: @ | Value: 5 alt2.aspmx.l.google.com
Type: MX | Name: @ | Value: 10 alt3.aspmx.l.google.com
Type: MX | Name: @ | Value: 10 alt4.aspmx.l.google.com
```

### 5. 📱 Google Workspace Admin Console

#### Admin Console Kontrolü:
```bash
1. https://admin.google.com adresine git
2. Users bölümünde mail@ibrahimsancar.com var mı?
3. User ACTIVE durumda mı?
4. Gmail service ENABLED mi?
```

#### Domain Verification:
```bash
Google Admin Console > Domains:
1. ibrahimsancar.com VERIFIED mi?
2. Primary domain olarak ayarlanmış mı?
3. Domain verification code doğru mu?
```

### 6. 🛠️ Website Contact Form Entegrasyonu

#### API Ayarları Eksik:
```javascript
// .env.local dosyası oluşturun:
RESEND_API_KEY=re_xxxxxxxxxx
FROM_EMAIL=noreply@ibrahimsancar.com
TO_EMAILS=mail@ibrahimsancar.com

// Veya test için console log ekleyin:
// src/pages/api/contact.ts içinde:
console.log('Email gönderiliyor:', { name, email, subject });
```

### 7. 📞 Acil Çözümler

#### A) Geçici Gmail Alias Kullanın:
```bash
1. Kişisel Gmail hesabınızı açın
2. Settings > Accounts and Import
3. "Send mail as" bölümüne mail@ibrahimsancar.com ekleyin
4. SMTP settings:
   - SMTP Server: smtp.gmail.com
   - Port: 587
   - Username: mail@ibrahimsancar.com
   - Password: Google App Password
```

#### B) Email Service Provider Test:
```bash
# Resend ile test:
1. https://resend.com hesap oluştur
2. API key al
3. Test email gönder:

curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "test@resend.dev",
    "to": ["mail@ibrahimsancar.com"],
    "subject": "Test Email",
    "html": "<p>Test mesajı</p>"
  }'
```

### 8. 🐛 Debug Adımları

#### Terminal/PowerShell Test:
```bash
# Email connectivity test:
telnet smtp.gmail.com 587

# DNS resolution test:
ping ibrahimsancar.com
```

#### Browser Console Test:
```javascript
// Website'de F12 > Console:
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@test.com', 
    subject: 'Test',
    message: 'Test mesajı'
  })
}).then(r => r.json()).then(console.log);
```

## Hızlı Test Senaryoları

### Senaryo 1: DNS Sorunu (En Yaygın)
```bash
Belirtiler: Hiçbir email gelmiyor
Çözüm: MX records kontrol et, 24-48 saat bekle

Test: nslookup -type=MX ibrahimsancar.com
```

### Senaryo 2: Gmail Ayar Sorunu  
```bash
Belirtiler: Bazen geliyor, bazen gelmiyor
Çözüm: Gmail web'de direkt kontrol et

Test: gmail.com'da mail@ibrahimsancar.com ile giriş
```

### Senaryo 3: Contact Form Çalışmıyor
```bash
Belirtiler: Form gönderiliyor ama email yok
Çözüm: API keys ve environment variables

Test: Browser console'da error var mı?
```

### Senaryo 4: Spam Filtreleme
```bash
Belirtiler: Test emaili kendi kendine gönderince gelmiyor
Çözüm: Farklı email adresinden test et

Test: Başka Gmail hesabından gönder
```

## Acil Destek İletişim

### Google Workspace Support:
- https://support.google.com/a/
- Live chat (business saatleri)
- Community forum

### Domain Provider Support:
- Namecheap: Live chat 24/7
- GoDaddy: Phone support
- Cloudflare: Email support

## 10 Dakikalık Hızlı Fix

```bash
1. Gmail web'e git: gmail.com
2. mail@ibrahimsancar.com ile giriş yap
3. Spam/All Mail kontrol et  
4. mxtoolbox.com'da MX test et
5. Google Admin Console kontrol et
6. 24 saat DNS propagation bekle
7. Farklı email adresinden test et
```

Bu adımları takip edin ve hangi aşamada takıldığınızı söyleyin, daha spesifik yardım edebilirim! 