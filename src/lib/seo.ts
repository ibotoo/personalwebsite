import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'İbrahim Can Sancar';
	const description = "Hey 👋 Ben İbrahim, Ben Bir Girişimciyim";
	const url = `https://ibrahimcansancar.com${router.asPath}`;

	return {
		title,
		description,
		canonical: url,
		openGraph: {
			title,
			description,
			site_name: 'İbrahim Can Sancar',
			url,
			type: 'website',
			images: [
				{
					url: 'https://ibrahimcansancar.com/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		...(props.twitter ? {} : {
			twitter: {
				cardType: 'summary_large_image',
				handle: '@ibrahimsancar0',
				site: '@ibrahimsancar0',
			},
		}),
		...props,
	};
}
