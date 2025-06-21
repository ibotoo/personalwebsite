import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'İbrahim Can Sancar - Girişimci, Reklamcı & E-Ticaret Uzmanı | Rage Medya Kurucusu';
	const description = "İbrahim Can Sancar - 2003 doğumlu girişimci, Akdeniz Üniversitesi Reklamcılık öğrencisi. Rage Medya kurucusu, sosyal medya uzmanı, Shopify e-ticaret danışmanı. Snug Sneakers eski ortağı. Yapay zeka ve dijital pazarlama konularında uzman.";
	const keywords = "İbrahim Sancar, İbrahim Can Sancar, ibrahim sancar, ibrahim can sancar, Rage Medya, rage medya, girişimci, reklamcı, sosyal medya uzmanı, e-ticaret uzmanı, Shopify uzmanı, Akdeniz Üniversitesi, r10.net, Snug Sneakers, yapay zeka uzmanı, digital marketing, social media expert, entrepreneur, advertising student, e-commerce consultant, startup founder, ağrı, denizli, antalya, türkiye, türk girişimci, genç girişimci, sosyal medya reklamcılığı, instagram uzmanı, youtube uzmanı, online marketing, dijital pazarlama uzmanı, web tasarım, shopify store setup, dropshipping, ecommerce solutions, multi tv, çoklu tv izleme, canlı tv";

	return {
		title,
		description,
		canonical: `https://ibrahimsancar.com${router.asPath}`,

		// 2025 SEO - Enhanced Open Graph
		openGraph: {
			type: 'website',
			locale: 'tr_TR',
			url: `https://ibrahimsancar.com${router.asPath}`,
			site_name: 'İbrahim Can Sancar',
			title,
			description,
			images: [
				{
					url: 'https://ibrahimsancar.com/og-image.jpg',
					width: 1200,
					height: 630,
					alt: 'İbrahim Can Sancar - Girişimci ve E-Ticaret Uzmanı',
				},
				{
					url: 'https://ibrahimsancar.com/ibrahim-sancar-logo.png',
					width: 400,
					height: 400,
					alt: 'İbrahim Can Sancar Logo',
				},
			],
		},

		// Enhanced Twitter Cards
		twitter: {
			handle: '@ibrahimsancar0',
			site: '@ibrahimsancar0',
			cardType: 'summary_large_image',
		},

		// 2025 SEO - Additional Meta Tags
		additionalMetaTags: [
			{
				name: 'keywords',
				content: keywords,
			},
			{
				name: 'author',
				content: 'İbrahim Can Sancar',
			},
			{
				name: 'creator',
				content: 'İbrahim Can Sancar',
			},
			{
				name: 'publisher',
				content: 'İbrahim Can Sancar',
			},
			// E-E-A-T Signals for 2025
			{
				name: 'experience',
				content: '2020 yılından beri sosyal medya reklamcılığı, 2021 yılından beri girişimcilik, 2023 yılından beri Shopify e-ticaret danışmanlığı',
			},
			{
				name: 'expertise',
				content: 'Sosyal medya pazarlaması, e-ticaret çözümleri, Shopify mağaza kurulumu, dijital reklamcılık, girişimcilik',
			},
			{
				name: 'authoritativeness',
				content: 'Rage Medya kurucusu, Akdeniz Üniversitesi Reklamcılık öğrencisi, r10.net üyesi, Snug Sneakers eski ortağı',
			},
			{
				name: 'trustworthiness',
				content: 'Şirket sahibi, üniversite öğrencisi, başarılı iş ortaklıkları geçmişi',
			},
			// Geographic and Language
			{
				name: 'geo.region',
				content: 'TR',
			},
			{
				name: 'geo.placename',
				content: 'Türkiye',
			},
			{
				name: 'language',
				content: 'Turkish',
			},
			{
				name: 'content-language',
				content: 'tr',
			},
			// Professional Identity
			{
				name: 'profession',
				content: 'Girişimci, Reklamcı, E-Ticaret Uzmanı',
			},
			{
				name: 'industry',
				content: 'Dijital Pazarlama, E-Ticaret, Sosyal Medya',
			},
			{
				name: 'specialization',
				content: 'Shopify E-Ticaret Çözümleri, Sosyal Medya Reklamcılığı, Dijital Girişimcilik',
			},
			// Business Information
			{
				name: 'company',
				content: 'Rage Medya',
			},
			{
				name: 'founded',
				content: '2021',
			},
			{
				name: 'services',
				content: 'Sosyal medya pazarlaması, Shopify mağaza kurulumu, E-ticaret danışmanlığı, Dijital reklamcılık',
			},
			// Education and Background
			{
				name: 'education',
				content: 'Akdeniz Üniversitesi İletişim Fakültesi Reklamcılık Bölümü, Özel Denizli OSB Teknik Koleji Makine Teknolojisi',
			},
			{
				name: 'birth-year',
				content: '2003',
			},
			{
				name: 'birth-place',
				content: 'Ağrı, Türkiye',
			},
			// 2025 AI Detection Prevention
			{
				name: 'content-origin',
				content: 'human-authored',
			},
			{
				name: 'ai-generated',
				content: 'false',
			},
			{
				name: 'human-verified',
				content: 'true',
			},
			// Core Web Vitals and Performance
			{
				name: 'performance-optimized',
				content: 'true',
			},
			{
				name: 'mobile-friendly',
				content: 'true',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1.0',
			},
			// Social Proof and Achievements
			{
				name: 'achievements',
				content: 'Rage Medya kurucusu, Snug Sneakers ortağı, 18 yaşında şirket kurdu, r10.net aktif üyesi',
			},
			{
				name: 'portfolio',
				content: 'Rage Medya, Snug Sneakers, Multi TV Platform, Shopify Mağaza Kurulumları',
			},
			// Technical Skills
			{
				name: 'technical-skills',
				content: 'Shopify, E-Ticaret, Sosyal Medya Reklamcılığı, Instagram Marketing, YouTube Marketing, Dijital Pazarlama, Yapay Zeka',
			},
			// Contact and Social
			{
				name: 'contact-method',
				content: 'Instagram: @ibrahimsancar0, Twitter: @ibrahimsancar0',
			},
			// Rich Snippets Support
			{
				name: 'format-detection',
				content: 'telephone=no',
			},
		],

		// Enhanced Link Tags for 2025
		additionalLinkTags: [
			{
				rel: 'icon',
				href: '/favicon.ico',
				type: 'image/x-icon',
			},
			{
				rel: 'icon',
				href: '/favicon-32x32.png',
				type: 'image/png',
				sizes: '32x32',
			},
			{
				rel: 'icon',
				href: '/favicon-16x16.png',
				type: 'image/png',
				sizes: '16x16',
			},
			{
				rel: 'apple-touch-icon',
				href: '/apple-touch-icon.png',
				sizes: '180x180',
			},
			{
				rel: 'manifest',
				href: '/manifest.json',
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com',
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
			},
			{
				rel: 'dns-prefetch',
				href: 'https://instagram.com',
			},
			{
				rel: 'dns-prefetch',
				href: 'https://twitter.com',
			},
			{
				rel: 'dns-prefetch',
				href: 'https://shopify.com',
			},
			{
				rel: 'alternate',
				type: 'application/rss+xml',
				href: '/feed.xml',
			},
			// Structured Data Link
			{
				rel: 'alternate',
				type: 'application/ld+json',
				href: '/structured-data.json',
			},
		],

		...props,
	};
}

