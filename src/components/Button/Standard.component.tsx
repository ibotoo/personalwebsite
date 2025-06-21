import clsx from 'clsx';
import { Icon } from '@iconify/react';

import { NavigationItemType } from '~/types';

import type { MouseEvent } from 'react';

import type { WithChildren, WithClassName } from '~/types';

interface DefaultProps extends WithClassName, WithChildren {
	icon?: string;
}

type StandardProps =
	| ({
		type: NavigationItemType.ACTION;
		onClick: (e: MouseEvent) => void;
	} & DefaultProps)
	| ({
		type: NavigationItemType.LINK;
		href: string;
		external?: boolean;
	} & DefaultProps);

const ButtonStyles =
	'flex justify-center items-center h-12 px-8 py-4 bg-gray-50 hover:(bg-gray-100 bg-opacity-50 text-primary-400) dark:(bg-gray-900 hover:bg-gray-800) text-base font-bold text-primary-300 rounded-lg default-transition default-focus';

export function Standard({ children, className, icon, ...rest }: StandardProps): JSX.Element {
	switch (rest.type) {
		case NavigationItemType.LINK:
			return (
				<a
					{...rest}
					className={clsx(ButtonStyles, className)}
					href={rest.href}
					rel={rest.external ? "noopener noreferrer" : undefined}
					target={rest.external ? "_blank" : undefined}>
					{icon && <Icon className="mr-2" icon={icon} />}
					{children}
				</a>
			);

		case NavigationItemType.ACTION:
			return (
				<button
					{...rest}
					className={clsx(ButtonStyles, className)}
					onClick={(e): void => rest.onClick(e)}
					type="button">
					{icon && <Icon className="mr-2" icon={icon} />}
					{children}
				</button>
			);
	}
}
