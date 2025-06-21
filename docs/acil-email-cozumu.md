# ACİL EMAIL ÇÖZÜMÜ - mail@ibrahimsancar.com

## 🚨 SORUN TESPİTİ
✅ Domain çalışıyor: ibrahimsancar.com → 76.76.21.21
❌ **MX Records YOK!** - Bu yüzden email gelmiyor

## ⚡ HIZLI ÇÖZÜM (15 dakika)

### 1. 🎯 Domain Provider'a Git (ACİL)

#### Domain'iniz hangi şirkette kayıtlı?
```bash
# Kontrol et:
whois ibrahimsancar.com

# Yaygın provider'lar:
- Namecheap
- GoDaddy  
- Google Domains
- Cloudflare
- Register.com
```

### 2. 📝 DNS Yönetim Paneli

#### Google Domains kullanıyorsanız:
```bash
1. https://domains.google.com adresine git
2. ibrahimsancar.com domain'ini seç
3. "DNS" sekmesine tıkla
4. "Custom resource records" bölümü
```

#### MX Kayıtları Ekle:
```
Name: @
Type: MX
TTL: 3600
Data: 1 aspmx.l.google.com.

Name: @  
Type: MX
TTL: 3600
Data: 5 alt1.aspmx.l.google.com.

Name: @
Type: MX
TTL: 3600  
Data: 5 alt2.aspmx.l.google.com.

Name: @
Type: MX
TTL: 3600
Data: 10 alt3.aspmx.l.google.com.

Name: @
Type: MX
TTL: 3600
Data: 10 alt4.aspmx.l.google.com.
```

### 3. 🔧 Alternatif: Cloudflare (Ücretsiz + Hızlı)

#### Cloudflare ile DNS Yönetimi:
```bash
1. https://cloudflare.com hesap oluştur
2. "Add a Site" → ibrahimsancar.com
3. Nameserver'ları domain provider'da değiştir:
   - claire.ns.cloudflare.com
   - walt.ns.cloudflare.com
4. Cloudflare DNS'de MX records ekle
```

## 🚀 GEÇİCİ ÇÖZÜM (Şu an için)

### A) Gmail Forwarding Kullan:
```bash
1. Kişisel Gmail hesabınızı aç
2. Settings → Accounts and Import
3. "Check mail from other accounts" 
4. mail@ibrahimsancar.com ekle (IMAP)
5. Settings:
   - Username: mail@ibrahimsancar.com
   - Password: [Google Workspace password]
   - Server: imap.gmail.com
   - Port: 993
```

### B) Contact Form → Webhook:
```bash
# Şimdilik contact form'u webhook olarak ayarla
# src/pages/api/contact.ts içinde email yerine:

// Discord webhook (acil bildirim için):
await fetch('DISCORD_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: `Yeni İletişim: ${name} (${email}) - ${subject}\n${message}`
  })
});

// Veya Telegram bot:
await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: YOUR_CHAT_ID,
    text: `İletişim Formu\n\nAd: ${name}\nEmail: ${email}\nKonu: ${subject}\nMesaj: ${message}`
  })
});
```

## 📱 ANLIK TEST

### MX Record Test:
```bash
# 15 dakika sonra test et:
nslookup -type=MX ibrahimsancar.com

# Online test:
https://mxtoolbox.com/domain/ibrahimsancar.com
```

### Email Test:
```bash
# Başka Gmail hesabından test et:
1. Başka Gmail hesabı aç
2. mail@ibrahimsancar.com adresine email gönder
3. 5-10 dakika bekle
4. Gmail web'de (mail@ibrahimsancar.com) kontrol et
```

## 🛠️ RESEND API (Hızlı Email Servisi)

### Resend Setup (5 dakika):
```bash
1. https://resend.com/signup
2. Hesap oluştur (GitHub ile hızlı)
3. API Keys → Create API Key
4. Domain verification:
   - Domain: ibrahimsancar.com
   - DNS TXT record ekle
```

### .env.local dosyası oluştur:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@ibrahimsancar.com
TO_EMAILS=mail@ibrahimsancar.com,iletisim@ibrahimsancar.com
```

### Test Contact Form:
```bash
# Website'de /iletisim sayfasına git
# Test mesajı gönder
# Vercel logs'da console.log kontrol et
```

## 🎯 ÖNCELIK SIRASI

### Bugün (Acil):
1. **MX Records ekle** (domain provider'da)
2. **DNS propagation bekle** (2-24 saat)
3. **Resend API setup** (geçici çözüm)

### Yarın:
1. **Gmail test et**
2. **Contact form test et**
3. **Email security (SPF/DKIM) ekle**

### Hafta içi:
1. **Professional email setup**
2. **Auto-reply configure**
3. **Email templates optimize**

## 📞 ACİL DESTEK

### Domain Provider Desteği:
- **Google Domains:** https://support.google.com/domains/
- **Namecheap:** Live chat 24/7
- **Cloudflare:** Community forum

### Email Test Araçları:
- https://mxtoolbox.com/
- https://dnschecker.org/
- https://mail-tester.com/

Bu adımları takip edin ve 15 dakika içinde email sorunu çözülecek! Hangi domain provider kullandığınızı söyleyin, daha spesifik yardım edeyim. 