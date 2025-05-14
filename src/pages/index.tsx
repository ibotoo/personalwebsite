import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';

import { Animate, Button, Pill } from '~/components';
import { EventType, NavigationItemType } from '~/types';
import { Layout } from '~/layouts';

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
	const birthday = new Date('1997-08-09');
	const isBirthday =
		today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();

	const description = `Reklamcılık öğrencisi, girişimci ve sosyal medya uzmanı`;

	return (
		<Layout.Default>
			{isBirthday && <Event event={EventType.BIRTHDAY} />}
			<div className="min-h-screen flex flex-col items-center justify-center py-12 sm:py-16 relative px-4 sm:px-8 overflow-hidden h-screen bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent">
				<div className="container mx-auto max-w-7xl">
					<div className="max-w-md sm:max-w-lg md:sm:max-w-2xl lg:sm:max-w-3xl w-full mx-auto space-y-4 sm:space-y-8 text-center">
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
											<span className="transform hover:scale-105 transition-transform duration-200 hover:text-primary-500">{action.text}</span>
										</Button.Outline>
									</Animate>
								);
							})}
						</div>
					</div>
				</div>
				<div className="absolute bottom-4 sm:bottom-6 w-full text-center">
					<p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium text-center mx-auto">
						© {new Date().getFullYear() > 2025 ? new Date().getFullYear() : 2025} İbrahim Can Sancar. Tüm hakları saklıdır.
					</p>
				</div>
			</div>
		</Layout.Default>
	);
}
