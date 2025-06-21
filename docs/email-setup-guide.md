# Email Kurulum Rehberi - mail@ibrahimsancar.com & iletisim@ibrahimsancar.com

## Email Adresleri Kurulumu

### 1. Domain Email Servisleri (Önerilen Seçenekler)

#### **Seçenek 1: Google Workspace (Business) - En Popüler** ⭐
- **Maliyet:** ~$6/ay/kullanıcı
- **Adres:** https://workspace.google.com
- **Özellikler:**
  - Profesyonel Gmail arayüzü
  - Google Drive, Calendar, Meet entegrasyonu
  - Mobile app desteği
  - Güçlü spam koruması
  - 30GB depolama

**Kurulum Adımları:**
1. Google Workspace'e git
2. "Get started" tıkla
3. Domain: `ibrahimsancar.com` gir
4. 2 kullanıcı oluştur:
   - `mail@ibrahimsancar.com`
   - `iletisim@ibrahimsancar.com`
5. DNS MX kayıtlarını domain providerına ekle
6. Email yönlendirmesini ayarla (her ikisi de aynı inbox'a gelebilir)

#### **Seçenek 2: Microsoft 365 Business Basic** 
- **Maliyet:** ~$5/ay/kullanıcı
- **Özellikler:**
  - Outlook web app
  - OneDrive, Teams entegrasyonu
  - 1TB depolama

#### **Seçenek 3: Zoho Mail - Ücretsiz/Uygun Fiyatlı**
- **Maliyet:** Ücretsiz (5 kullanıcıya kadar) / $1/ay
- **Özellikler:**
  - Clean arayüz
  - Mobile apps
  - iyi spam filtreleme

#### **Seçenek 4: ProtonMail Business - Güvenlik Odaklı**
- **Maliyet:** ~$5/ay/kullanıcı
- **Özellikler:**
  - End-to-end encryption
  - İsviçre merkezli
  - Güvenlik odaklı

### 2. DNS MX Kayıtları Kurulumu

#### Google Workspace için MX Kayıtları:
```
MX kayıtları (Priority - Host):
1  - ASPMX.L.GOOGLE.COM
5  - ALT1.ASPMX.L.GOOGLE.COM
5  - ALT2.ASPMX.L.GOOGLE.COM
10 - ALT3.ASPMX.L.GOOGLE.COM
10 - ALT4.ASPMX.L.GOOGLE.COM
```

#### Domain Providerında Ayarlar:
1. **Namecheap/GoDaddy/Cloudflare** DNS paneline git
2. MX Records bölümünü bul
3. Yukarıdaki kayıtları ekle
4. TTL: 3600 (1 saat) olarak ayarla
5. Propagation süresi: 24-48 saat

### 3. Website Contact Form Entegrasyonu

#### **Email Service Providers (API Entegrasyonu)**

##### **Seçenek 1: Resend (Önerilen)** ⭐
```bash
npm install resend
```

**API Key Alımı:**
1. https://resend.com adresine git
2. Hesap oluştur
3. API Keys bölümünden key al
4. `.env.local` dosyasına ekle:
```env
RESEND_API_KEY=re_xxxxxxxxxx
```

**Kullanım:** (contact.ts dosyasında)
```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email gönderimi
await resend.emails.send({
  from: 'noreply@ibrahimsancar.com',
  to: ['mail@ibrahimsancar.com', 'iletisim@ibrahimsancar.com'],
  subject: 'İletişim Formu: ' + subject,
  html: emailContent.html,
});
```

##### **Seçenek 2: SendGrid**
```bash
npm install @sendgrid/mail
```

##### **Seçenek 3: Nodemailer (SMTP)**
```bash
npm install nodemailer
```

### 4. Email Güvenlik Ayarları

#### SPF Kaydı:
```
TXT: v=spf1 include:_spf.google.com ~all
```

#### DKIM Kaydı (Google Workspace'den alınır):
```
TXT: google._domainkey.ibrahimsancar.com
```

#### DMARC Kaydı:
```
TXT: _dmarc.ibrahimsancar.com
v=DMARC1; p=quarantine; rua=mailto:dmarc@ibrahimsancar.com
```

### 5. Auto-Reply & Email Templates

#### Auto-Reply Template (Türkçe):
```html
<h2>Merhaba [NAME]!</h2>
<p>Mesajınız başarıyla alınmıştır. En kısa sürede size dönüş yapacağım.</p>

<div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
  <h3>Gönderdiğiniz Mesaj:</h3>
  <p><strong>Konu:</strong> [SUBJECT]</p>
  <div style="background: white; padding: 15px; border-left: 4px solid #0ea5e9;">
    [MESSAGE]
  </div>
</div>

<div style="text-align: center; margin-top: 20px;">
  <h3>İbrahim Can Sancar</h3>
  <p>Girişimci & Sosyal Medya Uzmanı</p>
  <p>Rage Medya Kurucusu</p>
</div>
```

### 6. Email Yönlendirme & Alias Kurulumu

#### Gmail'de Forwarding:
1. Gmail Settings > Forwarding and POP/IMAP
2. Add forwarding address ekle
3. Both emails için aynı inbox kullanılabilir

#### Email Alias Kurulumu:
- `mail@ibrahimsancar.com` - Primary
- `iletisim@ibrahimsancar.com` - Secondary/Support
- `info@ibrahimsancar.com` - Extra (isteğe bağlı)
- `ibrahim@ibrahimsancar.com` - Personal (isteğe bağlı)

### 7. Mobile Apps & Notifications

#### Önerilen Email Apps:
- **iOS:** Gmail App, Apple Mail
- **Android:** Gmail App, Outlook
- **Desktop:** Thunderbird, Outlook, Apple Mail

#### Push Notifications Ayarları:
- Instant notifications for contact form
- Daily summary for newsletter
- VIP contacts için priority

### 8. Email Marketing Integration (Gelecek için)

#### Newsletter Service:
- **Mailchimp** - User-friendly
- **ConvertKit** - Creator odaklı
- **Beehiiv** - Modern platform
- **Substack** - Writing odaklı

### 9. Security & Backup

#### Email Security:
- 2FA aktif et
- App passwords kullan
- Regular password changes
- Mobile device management

#### Backup Strategy:
- Email export (monthly)
- Important emails archive
- Contact lists backup

## Hızlı Başlangıç Checklist

### ✅ Bugün Yapılacaklar:
- [ ] Google Workspace hesap aç
- [ ] Domain verification
- [ ] 2 email hesabı oluştur
- [ ] MX kayıtları ekle

### ✅ 24-48 saat içinde:
- [ ] Email propagation test et
- [ ] Resend API key al
- [ ] Contact form test et
- [ ] Auto-reply template ekle

### ✅ İlk hafta içinde:
- [ ] SPF/DKIM/DMARC records
- [ ] Mobile apps kur
- [ ] Email signatures oluştur
- [ ] Backup strategy belirle

## Test Email Adresleri

### Email Test Commands:
```bash
# MX record test
nslookup -type=MX ibrahimsancar.com

# SPF record test  
nslookup -type=TXT ibrahimsancar.com

# Email deliverability test
https://mxtoolbox.com/emailhealth/
```

### Contact Form Test:
1. Website üzerinden test mesajı gönder
2. Her iki email adresine geldiğini kontrol et
3. Auto-reply çalıştığını test et
4. Spam folder kontrol et

Bu rehber ile `mail@ibrahimsancar.com` ve `iletisim@ibrahimsancar.com` adreslerinizi profesyonel şekilde kurabilir ve website contact form entegrasyonunu tamamlayabilirsiniz. 