import { Disclosure } from '@headlessui/react';

import { Button, Navbar } from '~/components';
import { useNavigation } from '~/lib';

export function Standard(): JSX.Element {
	const { menu, settings } = useNavigation();

	return (
		<Disclosure as="nav" className="fixed top-2 left-0 w-full z-50">
			<div className="mx-auto px-2 sm:px-4">
				<div className="relative flex items-center justify-between h-12 sm:h-16">
					<Navbar.Dropdown items={menu} position="top-left" className="max-h-[80vh] overflow-y-auto">
						<Button.Icon aria-label="Menu" className="p-2 sm:p-2.5">
							<Navbar.Icon icon="feather:menu" className="w-5 h-5 sm:w-6 sm:h-6" />
						</Button.Icon>
					</Navbar.Dropdown>
					<div className="flex-1"></div>
					<Navbar.Dropdown items={settings} position="top-right">
						<Button.Icon aria-label="Settings" className="p-2 sm:p-2.5">
							<Navbar.Icon icon="feather:settings" className="w-5 h-5 sm:w-6 sm:h-6" />
						</Button.Icon>
					</Navbar.Dropdown>
				</div>
			</div>
		</Disclosure>
	);
}
