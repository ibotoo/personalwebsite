import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { NextSeo } from 'next-seo';

import { Animate, Button, Pill } from '~/components';
import PerformanceOptimizer, { usePerformanceMonitoring, LazyLoadOptimizer } from '~/components/PerformanceOptimizer';
import { EventType, NavigationItemType } from '~/types';
import { Layout } from '~/layouts';
import { useSeoProps } from '~/lib';

import type { EventProps } from '~/components/Event.component';
import type { NavigationItem } from '~/types';

const Event = dynamic<EventProps>(
	() => import('~/components/Event.component').then(({ Event }) => Event),
	{
		ssr: false,
	},
);

const ACTIONS: Array<NavigationItem> = [
	{
		type: NavigationItemType.LINK,
		href: '/zaman-cizelgesi',
		icon: <Icon className="mr-3" icon="feather:clock" />,
		text: 'Zaman Çizelgesi',
	},
	{
		type: NavigationItemType.LINK,
		external: true,
		href: 'https://www.instagram.com/ibrahimsancar0/',
		icon: <Icon className="mr-3" icon="feather:instagram" />,
		text: 'Instagram',
	},
	{
		type: NavigationItemType.LINK,
		external: true,
		href: 'https://x.com/ibrahimsancar0',
		icon: <Icon className="mr-3" icon="simple-icons:x" />,
		text: 'X',
	},
];

export default function HomePage(): JSX.Element {
	const today = new Date();
	const birthday = new Date('2003-08-01');
	const isBirthday =
		today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();

	const description = `Reklamcılık öğrencisi, girişimci ve sosyal medya uzmanı`;

	// Performance monitoring hook
	usePerformanceMonitoring();

	const seoProps = useSeoProps({
		title: 'İbrahim Can Sancar - Türkiye\'nin En Genç Girişimcilerinden | Rage Medya Kurucusu',
		description: 'İbrahim Can Sancar - 2003 doğumlu başarılı girişimci. Rage Medya kurucusu, Shopify e-ticaret uzmanı, sosyal medya pazarlama danışmanı. Akdeniz Üniversitesi Reklamcılık öğrencisi. Snug Sneakers eski ortağı.',
		additionalMetaTags: [
			{
				name: 'keywords',
				content: 'İbrahim Sancar, İbrahim Can Sancar, ibrahim sancar, ibrahim can sancar, türkiye genç girişimci, en genç girişimci, Rage Medya, rage medya kurucusu, sosyal medya uzmanı, shopify uzmanı, e-ticaret danışmanı, reklamcı, akdeniz üniversitesi, snug sneakers, yapay zeka uzmanı, dijital pazarlama, instagram uzmanı, youtube marketing, r10.net, webmaster, online girişimci, denizli, ağrı, antalya, türk girişimci, entrepreneur turkey, young entrepreneur, startup founder, digital marketing expert, ecommerce consultant, social media marketing, influencer marketing, content creator, tech entrepreneur, business owner, company founder, ceo, founder, digital agency, advertising agency, online marketing, web marketing, brand management, online presence, multi tv, çoklu tv izleme, canlı tv',
			},
			{
				name: 'audience',
				content: 'Girişimciler, E-ticaret sahipleri, Dijital pazarlama uzmanları, Sosyal medya yöneticileri, Shopify mağaza sahipleri',
			},
			{
				name: 'target-audience',
				content: 'entrepreneurs, e-commerce owners, digital marketers, social media managers, shopify store owners, business owners',
			},
			{
				name: 'business-type',
				content: 'Digital Marketing Agency, E-commerce Consultancy, Social Media Marketing',
			},
			{
				name: 'services-offered',
				content: 'Shopify mağaza kurulumu, Sosyal medya pazarlama, E-ticaret danışmanlığı, Dijital reklam yönetimi, Instagram marketing, YouTube marketing, Influencer marketing, Brand management, Online mağaza optimizasyonu',
			},
			{
				name: 'experience-years',
				content: '2020-2025, 5+ yıl dijital pazarlama deneyimi',
			},
			{
				name: 'success-stories',
				content: 'Rage Medya kurucusu, Snug Sneakers ortağı, Yüzlerce Shopify mağaza kurulumu, Başarılı sosyal medya kampanyaları',
			},
			{
				name: 'personal-brand',
				content: 'İbrahim Can Sancar kişisel markası, Türkiye dijital pazarlama lideri, Genç girişimci role model',
			},
		],
		openGraph: {
			type: 'profile',
			profile: {
				firstName: 'İbrahim Can',
				lastName: 'Sancar',
				username: 'ibrahimsancar0',
				gender: 'male',
			},
			images: [
				{
					url: 'https://ibrahimsancar.com/og-home.jpg',
					width: 1200,
					height: 630,
					alt: 'İbrahim Can Sancar - Türkiye\'nin En Genç Girişimcilerinden',
				},
			],
		},
	});

	return (
		<>
			<NextSeo {...seoProps} />
			<PerformanceOptimizer />
			<LazyLoadOptimizer>
				<Layout.Default>
					{isBirthday && <Event event={EventType.BIRTHDAY} />}
					<div className="min-h-screen flex flex-col items-center justify-center py-12 sm:py-16 relative px-4 sm:px-8 overflow-hidden h-screen">
						<div className="max-w-md sm:max-w-lg md:sm:max-w-2xl lg:sm:max-w-3xl w-full space-y-4 sm:space-y-8 text-center">
							<Animate
								as="h1"
								animation={{
									opacity: [0, 1],
									scale: [0.75, 1],
								}}
								className="text-gray-500 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold">
								Hey <span className="inline-block origin-70 hover:(animate-wave)">👋</span>{' '}
								Ben İbrahim, <br className="hidden sm:block" />{' '}
								<Pill.Standard className="mt-2 sm:mt-4 text-3xl sm:text-4xl lg:text-7xl whitespace-nowrap">Ben Bir Girişimciyim</Pill.Standard>
							</Animate>

							<Animate
								as="p"
								animation={{
									opacity: [0, 1],
									scale: [0.75, 1],
								}}
								className="max-w-xs mt-3 md:mt-6 mx-auto text-sm sm:text-base md:text-xl text-gray-400 md:max-w-3xl"
								transition={{
									delay: 0.5,
								}}>
								{description}
							</Animate>

							<div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-3 sm:space-y-0 w-full mt-6 sm:mt-4">
								{ACTIONS.map((action, index) => {
									if (action.type !== NavigationItemType.LINK) return null;

									return (
										<Animate
											animation={{
												y: [50, 0],
												opacity: [0, 1],
											}}
											className={`w-full sm:w-auto order-${index === 0 ? 'first sm:order-none' : 'none'}`}
											key={index}
											transition={{
												delay: 0.1 * (index + 2) + 0.5,
											}}>
											<Button.Outline href={action.href} external={action.external}>
												{action.icon}
												<span>{action.text}</span>
											</Button.Outline>
										</Animate>
									);
								})}
							</div>
						</div>

						{/* İletişim Butonu */}
						<div className="absolute bottom-16 sm:bottom-20 w-full flex justify-center px-4">
							<Animate
								animation={{
									y: [20, 0],
									opacity: [0, 1],
								}}
								transition={{
									delay: 3.0,
									duration: 0.8,
								}}
								className="group">
								<Link href="/iletisim">
									<a className="inline-flex items-center justify-center px-6 py-3 bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/80 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300/70 dark:hover:border-gray-500/70 shadow-sm hover:shadow-md transform hover:scale-102 transition-all duration-200 ease-out backdrop-blur-sm">
										<Icon className="mr-2 w-4 h-4" icon="feather:mail" />
										<span className="text-sm">İletişim</span>
									</a>
								</Link>
							</Animate>
						</div>

						<div className="absolute bottom-4 sm:bottom-6 w-full text-center">
							<p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium text-center mx-auto">
								© {new Date().getFullYear() > 2025 ? new Date().getFullYear() : 2025} İbrahim Can Sancar. Tüm hakları saklıdır.
							</p>
						</div>
					</div>
				</Layout.Default>
			</LazyLoadOptimizer>
		</>
	);
}
