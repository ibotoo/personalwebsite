# Environment Variables Kurulum Rehberi

## .env.local Dosyası Oluşturma

Proje root dizininde `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
# Email Service Configuration
RESEND_API_KEY=re_xxxxxxxxxx
SENDGRID_API_KEY=SG.xxxxxxxxxx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mail@ibrahimsancar.com
SMTP_PASS=your_app_password

# Contact Form Settings
FROM_EMAIL=noreply@ibrahimsancar.com
TO_EMAILS=mail@ibrahimsancar.com,iletisim@ibrahimsancar.com

# Analytics & Tracking
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX

# Performance Monitoring
WEB_VITALS_ENDPOINT=https://ibrahimsancar.com/api/web-vitals

# Domain & URL Settings
NEXT_PUBLIC_SITE_URL=https://ibrahimsancar.com
DOMAIN=ibrahimsancar.com

# Security
CONTACT_FORM_HONEYPOT_FIELD=website_url
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=900000

# SEO & Schema
SCHEMA_PERSON_IMAGE=https://ibrahimsancar.com/ibrahim-sancar-photo.jpg
SCHEMA_ORGANIZATION_LOGO=https://ibrahimsancar.com/rage-medya-logo.png
```

## API Keys Alma Rehberi

### Resend API Key (Önerilen)
1. https://resend.com adresine git
2. Hesap oluştur
3. API Keys bölümüne tıkla
4. "Create API Key" butonu
5. Key'i kopyala ve RESEND_API_KEY olarak ekle

### SendGrid API Key (Alternatif)
1. https://sendgrid.com adresine git
2. Hesap oluştur
3. Settings > API Keys
4. "Create API Key" butonu
5. Full Access ver ve key'i kaydet

### Google Analytics Setup
1. https://analytics.google.com
2. Property oluştur
3. Measurement ID'yi (G-XXXXXXXXXX) kopyala

### Gmail App Password (SMTP için)
1. Google hesabında 2FA aktif et
2. Google Account > Security > 2-Step Verification
3. App passwords bölümü
4. Mail için app password oluştur

## Production Environment (Vercel)

Vercel dashboard'da Environment Variables ekleyin:
- Development, Preview, Production için ayrı ayrı
- Sensitive veriler için "Encrypted" işaretle 