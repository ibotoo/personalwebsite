import clsx from 'clsx';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(): JSX.Element {
	return (
		<Html lang="tr">
			<Head>
				<link rel="icon" type="image/png" href="/favicon.png" />

				{/* SEO Meta Etiketleri */}
				<meta name="description" content="İbrahim Can Sancar - Reklamcılık öğrencisi, girişimci ve sosyal medya uzmanı. Kişisel web sitesi." />
				<meta name="keywords" content="İbrahim Can Sancar, girişimci, reklamcılık, sosyal medya, e-ticaret, Rage Medya, Shopify" />
				<meta name="author" content="İbrahim Can Sancar" />

				{/* OpenGraph Meta Etiketleri */}
				<meta property="og:title" content="İbrahim Can Sancar" />
				<meta property="og:description" content="Reklamcılık öğrencisi, girişimci ve sosyal medya uzmanı" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://ibrahimcansancar.com" />

				{/* Twitter Meta Etiketleri */}
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="İbrahim Can Sancar" />
				<meta name="twitter:description" content="Reklamcılık öğrencisi, girişimci ve sosyal medya uzmanı" />

				{/* Diğer Meta Etiketleri */}
				<meta name="robots" content="index, follow" />
			</Head>
			<body
				className={clsx(
					'antialiased',
					'bg-gradient-to-br from-white via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
					'font-inter text-gray-500',
					'selection:bg-gray-900 selection:dark:bg-white selection:text-white selection:dark:text-primary-500',
				)}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
