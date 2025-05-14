import { useTheme } from 'next-themes';

import { usePersistantState } from '~/lib';

import { NavigationItemType } from '~/types';

import type { NavigationItem, NavigationItems } from '~/types';

const staticMenuItems: Array<Array<NavigationItem>> = [
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:home',
			text: 'Ana Sayfa',
			href: '/',
		},
		{
			type: NavigationItemType.LINK,
			icon: 'feather:clock',
			text: 'Zaman Çizelgesi',
			href: '/zaman-cizelgesi',
		},
	],
	[
		{
			type: NavigationItemType.LINK,
			icon: 'feather:instagram',
			text: 'Instagram',
			href: 'https://www.instagram.com/ibrahimsancar0/',
			external: true
		},
		{
			type: NavigationItemType.LINK,
			icon: 'simple-icons:x',
			text: 'X',
			href: 'https://x.com/ibrahimsancar0',
			external: true
		},
	],
];

export function useNavigation(): {
	menu: NavigationItems;
	settings: NavigationItems;
} {
	const state = usePersistantState();
	const { animations: background, sound } = state.get();

	const menuItems: NavigationItems = [
		...staticMenuItems,
	];

	const settingsItems: NavigationItems = [
		[
			{
				type: NavigationItemType.ACTION,
				icon: 'feather:image',
				endIcon: background ? 'feather:check-circle' : 'feather:circle',
				text: `Animasyonlar ${background ? 'Açık' : 'Kapalı'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						animations: !settings.animations,
					})),
			},
			{
				type: NavigationItemType.ACTION,
				icon: sound ? 'feather:volume-2' : 'feather:volume-x',
				endIcon: sound ? 'feather:check-circle' : 'feather:circle',
				text: `Sesler ${sound ? 'Açık' : 'Kapalı'}`,
				onClick: () =>
					state.set((settings) => ({
						...settings,
						sound: !settings.sound,
					})),
			},
		],
	];

	return {
		menu: menuItems,
		settings: settingsItems,
	};
}
