import { Disclosure } from '@headlessui/react';

import { Button, Navbar } from '~/components';
import { useNavigation } from '~/lib';

export function Standard(): JSX.Element {
	const { menu, settings } = useNavigation();

	return (
		<Disclosure as="nav" className="fixed top-0 left-0 w-full z-10">
			<div className="mx-auto px-2 sm:px-4">
				<div className="relative flex items-center justify-between h-14 sm:h-16">
					<Navbar.Dropdown items={menu} position="top-left">
						<Button.Icon aria-label="Menu">
							<Navbar.Icon icon="feather:menu" className="w-5 h-5 sm:w-6 sm:h-6" />
						</Button.Icon>
					</Navbar.Dropdown>
					<div className="flex-1"></div>
					<Navbar.Dropdown items={settings} position="top-right">
						<Button.Icon aria-label="Settings">
							<Navbar.Icon icon="feather:settings" className="w-5 h-5 sm:w-6 sm:h-6" />
						</Button.Icon>
					</Navbar.Dropdown>
				</div>
			</div>
		</Disclosure>
	);
}
