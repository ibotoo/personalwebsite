import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import { Navbar } from '~/components';
import { usePersistantState, useSeoProps } from '~/lib';

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

	const seo = useSeoProps(customSeo);

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
