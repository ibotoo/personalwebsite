import { Disclosure } from '@headlessui/react';

import { Button, Navbar } from '~/components';
import { useNavigation } from '~/lib';

export function Standard(): JSX.Element {
	const { menu, settings } = useNavigation();

	return (
		<Disclosure as="nav" className="fixed top-2 left-0 w-full z-50">
			<div className="mx-auto px-2 sm:px-4">
				<div className="relative flex items-center justify-between h-12 sm:h-16">
					<div className="hidden sm:block">
						<Navbar.Dropdown items={menu} position="top-left" className="max-h-[80vh] overflow-y-auto">
							<Button.Icon aria-label="Menu" className="p-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
								<Navbar.Icon icon="feather:menu" className="w-5 h-5 text-primary-500" />
							</Button.Icon>
						</Navbar.Dropdown>
					</div>
					<div className="flex-1"></div>
					<Navbar.Dropdown items={settings} position="top-right">
						<Button.Icon aria-label="Settings" className="p-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
							<Navbar.Icon icon="feather:settings" className="w-5 h-5 text-primary-500" />
						</Button.Icon>
					</Navbar.Dropdown>
				</div>
			</div>
		</Disclosure>
	);
}
