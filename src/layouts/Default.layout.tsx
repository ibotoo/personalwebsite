import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { Navbar } from '~/components';
import { usePersistantState } from '~/lib';

import type { WithChildren, WithProps } from '~/types';

// Arka planı sadece ihtiyaç olduğunda yükle
const Background = dynamic(() =>
	import('~/components/Background/Standard.component').then(({ Standard }) => Standard),
	{
		ssr: false, // Sunucu tarafında render etme
		loading: () => null, // Yüklenirken hiçbir şey gösterme
	}
);

interface DefaultLayoutProps extends WithChildren {
	background?: boolean;
	seo?: Partial<WithProps<typeof NextSeo>>;
}

export function DefaultLayout({
	background: overrideBackground,
	children,
	seo: customSeo,
}: DefaultLayoutProps): JSX.Element {
	const { animations: background } = usePersistantState().get();
	const showBackground = overrideBackground ?? background;

	const defaultSeo = {
		title: 'İbrahim Can Sancar - Girişimci, Reklamcı & E-Ticaret Uzmanı | Rage Medya Kurucusu',
		description: "İbrahim Can Sancar - 2003 doğumlu girişimci, Akdeniz Üniversitesi Reklamcılık öğrencisi. Rage Medya kurucusu, sosyal medya uzmanı, Shopify e-ticaret danışmanı. Snug Sneakers eski ortağı. Yapay zeka ve dijital pazarlama konularında uzman.",
		canonical: 'https://ibrahimsancar.com',
		openGraph: {
			type: 'website',
			locale: 'tr_TR',
			url: 'https://ibrahimsancar.com',
			site_name: 'İbrahim Can Sancar',
			title: 'İbrahim Can Sancar - Girişimci, Reklamcı & E-Ticaret Uzmanı | Rage Medya Kurucusu',
			description: "İbrahim Can Sancar - 2003 doğumlu girişimci, Akdeniz Üniversitesi Reklamcılık öğrencisi. Rage Medya kurucusu, sosyal medya uzmanı, Shopify e-ticaret danışmanı. Snug Sneakers eski ortağı. Yapay zeka ve dijital pazarlama konularında uzman.",
			images: [
				{
					url: 'https://ibrahimsancar.com/og-image.jpg',
					width: 1200,
					height: 630,
					alt: 'İbrahim Can Sancar - Girişimci ve E-Ticaret Uzmanı',
				},
			],
		},
	};

	const seo = customSeo ? { ...defaultSeo, ...customSeo } : defaultSeo;

	return (
		<>
			<NextSeo {...seo} />
			<Navbar.Standard />
			<main className="flex flex-col justify-center px-8">
				{showBackground && <Background />}
				{children}
			</main>
		</>
	);
}
