const fs = require('fs');
const path = require('path');

// Favicon generation script
console.log('🎨 Favicon Generator - İbrahim Can Sancar');
console.log('=====================================');

const faviconSizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
];

const appleTouchSizes = [
    { size: 60, name: 'apple-touch-icon-iphone-60.png' },
    { size: 76, name: 'apple-touch-icon-ipad-76.png' },
    { size: 120, name: 'apple-touch-icon-iphone-retina-120.png' },
    { size: 152, name: 'apple-touch-icon-ipad-retina-152.png' },
];

const androidSizes = [
    { size: 48, name: 'android-launchericon-48.png' },
    { size: 72, name: 'android-launchericon-72.png' },
    { size: 96, name: 'android-launchericon-96.png' },
    { size: 144, name: 'android-launchericon-144.png' },
    { size: 192, name: 'android-launchericon-192.png' },
    { size: 512, name: 'android-launchericon-512.png' },
];

// Manifest.json güncelleme
const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
const manifest = {
    "name": "İbrahim Can Sancar - Girişimci & E-Ticaret Uzmanı",
    "short_name": "İbrahim Sancar",
    "description": "İbrahim Can Sancar - Rage Medya kurucusu, sosyal medya uzmanı, Shopify e-ticaret danışmanı",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#3b82f6",
    "orientation": "portrait-primary",
    "icons": [
        {
            "src": "/android/android-launchericon-48.png",
            "sizes": "48x48",
            "type": "image/png"
        },
        {
            "src": "/android/android-launchericon-72.png",
            "sizes": "72x72",
            "type": "image/png"
        },
        {
            "src": "/android/android-launchericon-96.png",
            "sizes": "96x96",
            "type": "image/png"
        },
        {
            "src": "/android/android-launchericon-144.png",
            "sizes": "144x144",
            "type": "image/png"
        },
        {
            "src": "/android/android-launchericon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android/android-launchericon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "categories": ["business", "productivity", "lifestyle"],
    "lang": "tr",
    "scope": "/",
    "related_applications": [],
    "prefer_related_applications": false
};

// Manifest dosyasını güncelle
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('✅ Manifest.json güncellendi');

// Favicon HTML meta tags
const faviconHTML = `
<!-- Favicon ve App Icons -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple/apple-touch-icon-iphone-60.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple/apple-touch-icon-ipad-76.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple/apple-touch-icon-iphone-retina-120.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple/apple-touch-icon-ipad-retina-152.png">

<!-- Android Chrome Icons -->
<link rel="icon" type="image/png" sizes="192x192" href="/android/android-launchericon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android/android-launchericon-512.png">

<!-- Web App Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- iOS Safari -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="İbrahim Sancar">

<!-- Windows -->
<meta name="msapplication-TileColor" content="#3b82f6">
<meta name="msapplication-TileImage" content="/android/android-launchericon-144.png">
<meta name="msapplication-config" content="/browserconfig.xml">

<!-- Theme Colors -->
<meta name="theme-color" content="#3b82f6">
<meta name="msapplication-navbutton-color" content="#3b82f6">
<meta name="apple-mobile-web-app-status-bar-style" content="#3b82f6">
`;

console.log('📱 Favicon HTML Meta Tags:');
console.log(faviconHTML);

console.log('\n🎯 Sonraki Adımlar:');
console.log('1. Favicon.png dosyasını farklı boyutlarda optimize edin');
console.log('2. _document.tsx dosyasına yukarıdaki meta tagları ekleyin');
console.log('3. Browserconfig.xml dosyası oluşturun');

console.log('\n✨ Favicon optimizasyonu tamamlandı!'); 