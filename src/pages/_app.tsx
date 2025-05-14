import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useEffectOnce } from 'react-use';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

import 'inter-ui/inter.css';
import 'nprogress/nprogress.css';
import 'windi.css';

import { colors } from '~/lib';
import { Theme } from '~/types';

// İlerleme çubuğunu yapılandır
NProgress.configure({
	minimum: 0.3,
	showSpinner: false,
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const router = useRouter();

	useEffectOnce(() => {
		// İlerleme çubuğu için yönlendirme olaylarını dinle
		const handleStart = (): any => NProgress.start();
		const handleComplete = (): any => NProgress.done();

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
	});

	return (
		<ThemeProvider attribute="class" defaultTheme={Theme.SYSTEM}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
				<meta name="theme-color" content="#111827" />
			</Head>

			<Component {...pageProps} />
			<Analytics />

			<style jsx global>{`
				#nprogress .bar {
					height: 0.25rem;
					background-color: ${colors.primary[500]};
				}
				
				html, body {
					scroll-behavior: smooth;
					overflow-x: hidden;
					text-size-adjust: 100%;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}
				
				/* Mobil cihazlarda daha iyi dokunmatik deneyim */
				@media (max-width: 640px) {
					button, a {
						padding: 0.5rem;
						min-height: 44px; /* Apple önerilen dokunmatik hedef boyutu */
					}
					
					input, select, textarea {
						font-size: 16px; /* iOS'ta yakınlaştırmayı engeller */
					}
					
					/* Mobil görünüm iyileştirmeleri */
					h1, h2, h3 {
						word-break: break-word;
					}
					
					p {
						font-size: 0.95rem;
						line-height: 1.5;
					}
					
					.container {
						padding-left: 1rem;
						padding-right: 1rem;
					}
					
					/* Küçük cihazlarda ekranın tamamını kapla */
					.min-h-screen {
						min-height: calc(100vh - 1rem);
					}
				}
				
				/* Gecikmeleri azaltmak için önden yükleme ipuçları */
				* {
					backface-visibility: hidden;
					-webkit-backface-visibility: hidden;
				}
				
				/* Resimlerin yüklenmeden önce alan kaplaması */
				img {
					display: block;
					height: auto;
				}
				
				/* Performans iyileştirmeleri */
				body {
					overscroll-behavior-y: none; /* Sayfa kaydırıldığında tazeleme geribildirimi önlenir */
				}
				
				/* Daha iyi metin okunabilirliği */
				p, li {
					text-rendering: optimizeSpeed;
					max-width: 70ch; /* İdeal okunabilirlik için satır uzunluğu */
				}
			`}</style>
		</ThemeProvider>
	);
}
