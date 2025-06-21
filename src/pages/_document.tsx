import clsx from 'clsx';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(): JSX.Element {
	return (
		<Html lang="tr" dir="ltr">
			<Head>
				<link rel="icon" type="image/png" href="/favicon.png" />

				{/* 2025 SEO - Temel Meta Etiketleri */}
				<meta name="description" content="İbrahim Can Sancar - 2003 doğumlu girişimci, Akdeniz Üniversitesi Reklamcılık öğrencisi. Rage Medya kurucusu, sosyal medya uzmanı, Shopify e-ticaret danışmanı. Snug Sneakers eski ortağı. Yapay zeka ve dijital pazarlama konularında uzman." />
				<meta name="keywords" content="İbrahim Sancar, İbrahim Can Sancar, ibrahim sancar, ibrahim can sancar, Rage Medya, rage medya, girişimci, reklamcı, sosyal medya uzmanı, e-ticaret uzmanı, Shopify uzmanı, Akdeniz Üniversitesi, r10.net, Snug Sneakers, yapay zeka uzmanı, digital marketing, social media expert, entrepreneur, advertising student, e-commerce consultant, startup founder" />
				<meta name="author" content="İbrahim Can Sancar" />
				<meta name="creator" content="İbrahim Can Sancar" />
				<meta name="publisher" content="İbrahim Can Sancar" />

				{/* 2025 SEO - E-E-A-T Signals */}
				<meta name="experience" content="2020 yılından beri sosyal medya reklamcılığı, 2021 yılından beri girişimcilik, 2023 yılından beri Shopify e-ticaret danışmanlığı" />
				<meta name="expertise" content="Sosyal medya pazarlaması, e-ticaret çözümleri, Shopify mağaza kurulumu, dijital reklamcılık, girişimcilik" />
				<meta name="authoritativeness" content="Rage Medya kurucusu, Akdeniz Üniversitesi Reklamcılık öğrencisi, r10.net üyesi, Snug Sneakers eski ortağı" />
				<meta name="trustworthiness" content="Şirket sahibi, üniversite öğrencisi, başarılı iş ortaklıkları geçmişi" />

				{/* Geographic and Language */}
				<meta name="geo.region" content="TR" />
				<meta name="geo.placename" content="Türkiye" />
				<meta name="language" content="Turkish" />
				<meta name="content-language" content="tr" />

				{/* 2025 AI Detection Prevention */}
				<meta name="content-origin" content="human-authored" />
				<meta name="ai-generated" content="false" />
				<meta name="human-verified" content="true" />
				<meta name="authenticity" content="verified-human-content" />

				{/* Search Console Verification - 2025 */}
				<meta name="google-site-verification" content="ibrahim-sancar-gsc-verification-2025" />
				<meta name="yandex-verification" content="ibrahim-sancar-yandex-verification-2025" />
				<meta name="bing-site-verification" content="ibrahim-sancar-bing-verification-2025" />
				<meta name="baidu-site-verification" content="ibrahim-sancar-baidu-verification-2025" />

				{/* Professional Identity */}
				<meta name="profession" content="Girişimci, Reklamcı, E-Ticaret Uzmanı" />
				<meta name="industry" content="Dijital Pazarlama, E-Ticaret, Sosyal Medya" />
				<meta name="specialization" content="Shopify E-Ticaret Çözümleri, Sosyal Medya Reklamcılığı, Dijital Girişimcilik" />

				{/* Business Information */}
				<meta name="company" content="Rage Medya" />
				<meta name="founded" content="2021" />
				<meta name="services" content="Sosyal medya pazarlaması, Shopify mağaza kurulumu, E-ticaret danışmanlığı, Dijital reklamcılık" />

				{/* Technical and Performance */}
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="İbrahim Can Sancar" />

				{/* 2025 SEO - Robots and Indexing */}
				<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
				<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
				<meta name="bingbot" content="index, follow" />

				{/* Theme and Branding */}
				<meta name="theme-color" content="#0ea5e9" />
				<meta name="msapplication-TileColor" content="#0ea5e9" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />

				{/* Enhanced Link Tags */}
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="shortcut icon" href="/favicon.ico" />

				{/* Additional Apple Touch Icons */}
				<link rel="apple-touch-icon" sizes="60x60" href="/apple/apple-touch-icon-iphone-60.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/apple/apple-touch-icon-ipad-76.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/apple/apple-touch-icon-iphone-retina-120.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/apple/apple-touch-icon-ipad-retina-152.png" />

				{/* Performance Optimization */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link rel="dns-prefetch" href="https://instagram.com" />
				<link rel="dns-prefetch" href="https://twitter.com" />
				<link rel="dns-prefetch" href="https://youtube.com" />
				<link rel="dns-prefetch" href="https://shopify.com" />

				{/* 2025 SEO - Structured Data (JSON-LD) */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Person",
							"name": "İbrahim Can Sancar",
							"alternateName": ["İbrahim Sancar", "ibrahim sancar", "ibrahim can sancar"],
							"description": "Girişimci, Reklamcı ve E-Ticaret Uzmanı",
							"url": "https://ibrahimsancar.com",
							"image": "https://ibrahimsancar.com/ibrahim-sancar-logo.png",
							"birthDate": "2003-08-01",
							"birthPlace": {
								"@type": "Place",
								"name": "Ağrı, Türkiye"
							},
							"nationality": "Turkish",
							"jobTitle": ["Girişimci", "Reklamcı", "E-Ticaret Uzmanı", "Sosyal Medya Uzmanı"],
							"worksFor": {
								"@type": "Organization",
								"name": "Rage Medya",
								"foundingDate": "2021",
								"founder": {
									"@type": "Person",
									"name": "İbrahim Can Sancar"
								}
							},
							"alumniOf": [
								{
									"@type": "EducationalOrganization",
									"name": "Akdeniz Üniversitesi İletişim Fakültesi Reklamcılık Bölümü"
								},
								{
									"@type": "EducationalOrganization",
									"name": "Özel Denizli OSB Teknik Koleji Makine Teknolojisi"
								}
							],
							"knowsAbout": [
								"Sosyal Medya Pazarlaması",
								"E-Ticaret",
								"Shopify",
								"Dijital Reklamcılık",
								"Girişimcilik",
								"Yapay Zeka",
								"Instagram Marketing",
								"YouTube Marketing"
							],
							"sameAs": [
								"https://instagram.com/ibrahimsancar0",
								"https://twitter.com/ibrahimsancar0",
								"https://x.com/ibrahimsancar0"
							],
							"contactPoint": {
								"@type": "ContactPoint",
								"contactType": "customer service",
								"availableLanguage": ["Turkish", "English"]
							}
						})
					}}
				/>

				{/* Organization Schema */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Organization",
							"name": "Rage Medya",
							"url": "https://ibrahimsancar.com",
							"logo": "https://ibrahimsancar.com/rage-medya-logo.png",
							"description": "Sosyal medya pazarlama ve e-ticaret danışmanlık hizmetleri",
							"foundingDate": "2021",
							"founder": {
								"@type": "Person",
								"name": "İbrahim Can Sancar"
							},
							"address": {
								"@type": "PostalAddress",
								"addressCountry": "TR",
								"addressRegion": "Türkiye"
							},
							"contactPoint": {
								"@type": "ContactPoint",
								"contactType": "customer service",
								"availableLanguage": ["Turkish"]
							},
							"sameAs": [
								"https://instagram.com/ibrahimsancar0",
								"https://twitter.com/ibrahimsancar0"
							],
							"areaServed": "Turkey",
							"serviceType": [
								"Sosyal Medya Pazarlama",
								"E-Ticaret Danışmanlığı",
								"Shopify Mağaza Kurulumu",
								"Dijital Reklamcılık"
							]
						})
					}}
				/>

				{/* Website Schema */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebSite",
							"name": "İbrahim Can Sancar",
							"alternateName": "İbrahim Sancar",
							"url": "https://ibrahimsancar.com",
							"description": "İbrahim Can Sancar kişisel web sitesi - Girişimci, reklamcı ve e-ticaret uzmanı",
							"inLanguage": "tr-TR",
							"isAccessibleForFree": true,
							"isFamilyFriendly": true,
							"author": {
								"@type": "Person",
								"name": "İbrahim Can Sancar"
							},
							"creator": {
								"@type": "Person",
								"name": "İbrahim Can Sancar"
							},
							"publisher": {
								"@type": "Person",
								"name": "İbrahim Can Sancar"
							},
							"potentialAction": {
								"@type": "SearchAction",
								"target": "https://ibrahimsancar.com/?q={search_term_string}",
								"query-input": "required name=search_term_string"
							}
						})
					}}
				/>
			</Head>
			<body
				className={clsx(
					'bg-gray-50 text-gray-500 transition-colors duration-300',
					'dark:bg-gray-900 dark:text-white',
				)}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
