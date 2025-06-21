# İbrahim Can Sancar Logo Implementasyon Rehberi

## Logo Dosyası
Kullanıcının sağladığı emoji-style avatar logo (gülümseyen, göz kırpan erkek emoji) tüm gerekli yerlerde kullanılacak.

## Gerekli Logo Boyutları

### Favicon Dosyaları (Public klasöründe oluşturulacak):
- `favicon.ico` - 16x16, 32x32, 48x48 boyutları içeren ICO dosyası
- `favicon-16x16.png` - 16x16 PNG
- `favicon-32x32.png` - 32x32 PNG  
- `favicon.png` - 512x512 PNG (genel kullanım)

### Apple Touch Icons:
- `apple-touch-icon.png` - 180x180 PNG
- `apple-touch-icon-iphone-60.png` - 60x60 PNG
- `apple-touch-icon-iphone-retina-120.png` - 120x120 PNG
- `apple-touch-icon-ipad-76.png` - 76x76 PNG
- `apple-touch-icon-ipad-retina-152.png` - 152x152 PNG

### Android Icons:
- `android-launchericon-48.png` - 48x48 PNG
- `android-launchericon-72.png` - 72x72 PNG
- `android-launchericon-96.png` - 96x96 PNG
- `android-launchericon-144.png` - 144x144 PNG
- `android-launchericon-192.png` - 192x192 PNG
- `android-launchericon-512.png` - 512x512 PNG

### Social Media & SEO:
- `og-image.jpg` - 1200x630 Open Graph görsel
- `logo.png` - 512x512 PNG (genel logo)
- `ibrahim-sancar-logo.png` - 400x400 PNG
- `rage-medya-logo.png` - 400x400 PNG (şirket logosu için)

## Güncellenmesi Gereken Dosyalar

### 1. _document.tsx
```tsx
<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" href="/favicon.ico" />
```

### 2. manifest.json
```json
{
  "icons": [
    {
      "src": "/android-launchericon-48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "/android-launchericon-96.png", 
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/android-launchericon-192.png",
      "sizes": "192x192", 
      "type": "image/png"
    },
    {
      "src": "/android-launchericon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 3. next.config.js
Logo dosyalarının optimize edilmesi için image domains eklenecek.

### 4. Schema.org JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "image": "https://ibrahimsancar.com/ibrahim-sancar-logo.png",
  "logo": "https://ibrahimsancar.com/logo.png"
}
```

### 5. SEO Meta Tags
```html
<meta property="og:image" content="https://ibrahimsancar.com/og-image.jpg" />
<meta name="twitter:image" content="https://ibrahimsancar.com/og-image.jpg" />
```

## Logo Optimizasyon Özellikleri

### Teknik Özellikler:
- **Format:** PNG (şeffaf arka plan) ve ICO
- **Çözünürlük:** Yüksek kalite, retina ready
- **Renk profili:** sRGB
- **Boyut optimizasyonu:** Web için optimize edilmiş
- **Responsive:** Tüm cihazlarda net görünüm

### Kullanım Alanları:
1. **Browser Tab Favicon** - Site sekmesinde görünecek
2. **Bookmark Icon** - Favorilere eklendiğinde
3. **Mobile Home Screen** - Telefon ana ekranına eklendiğinde
4. **App Icon** - PWA olarak yüklendiğinde
5. **Social Sharing** - Link paylaşıldığında
6. **Search Results** - Google sonuçlarında
7. **Email Signatures** - Profesyonel email imzalarında

## Brand Identity Consistency

### Logo Usage Guidelines:
- Ana logo her zaman net ve okunabilir olmalı
- Minimum boyut: 16x16 piksel
- Şeffaf arka plan kullanılmalı
- Orijinal oranlar korunmalı
- Bozulma veya deforme olmamalı

### Color Scheme:
- Mevcut sitenin color scheme'i ile uyumlu
- Dark mode desteği
- Contrast ratio accessibility standartlarına uygun

Bu implementasyon ile İbrahim'ın kişisel logosu tüm dijital platformlarda tutarlı ve profesyonel şekilde görünecek. 