import defaultTheme from 'windicss/defaultTheme';
import { defineConfig } from 'windicss/helpers';

import { colors } from './src/lib/colors';

export default defineConfig({
	darkMode: 'class',
	extract: {
		include: ['**/*.{jsx,tsx,css}'],
		exclude: ['node_modules', '.git', '.next'],
	},
	plugins: [require('windicss/plugin/line-clamp'), require('windicss/plugin/typography')],
	shortcuts: {
		'default-focus':
			'focus:(outline-none ring-4 ring-offset-4 dark:ring-offset-gray-900 ring-primary-500)',
		'default-transition': 'transition ease-in-out duration-300',
	},
	theme: {
		extend: {
			animation: {
				wave: 'wave 2.25s ease-in-out infinite',
				fadeIn: 'fadeIn 0.5s ease-in-out',
				bounce: 'bounce 1s infinite',
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			backgroundOpacity: {
				15: '0.15',
			},
			colors,
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				wave: {
					'0%': { transform: 'rotate(0deg)' },
					'10%': { transform: 'rotate(14deg)' },
					'20%': { transform: 'rotate(-8deg)' },
					'30%': { transform: 'rotate(14deg)' },
					'40%': { transform: 'rotate(-4deg)' },
					'50%': { transform: 'rotate(10deg)' },
					'60%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(0deg)' },
				},
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				bounce: {
					'0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
					'50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
			},
			saturate: {
				DEFAULT: {
					200: 'saturate(2)',
				},
			},
			transformOrigin: {
				70: '70% 70%',
			},
			typography: {
				DEFAULT: {
					css: {
						img: {
							maxWidth: '100%',
						},
					},
				},
			},
		},
		typography: {
			DEFAULT: {
				css: {
					pre: {
						marginTop: '0 !important',
						borderTopLeftRadius: '0 !important',
						borderTopRightRadius: '0 !important',
					},
				},
			},
		},
	},
});
