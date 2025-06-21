const WindiCSS = require('windicss-webpack-plugin');
const { withAxiom } = require('next-axiom');

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.splitbee.io data: blob:;
  script-src-elem 'self' 'unsafe-eval' 'unsafe-inline' cdn.splitbee.io data: blob:;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  style-src-elem 'self' 'unsafe-inline' *.googleapis.com;
  style-src-attr 'self' 'unsafe-inline';
  img-src 'self' data: blob: cdn.discordapp.com raw.githubusercontent.com i.scdn.co cdn-cf-east.streamable.com source.unsplash.com images.unsplash.com github.com avatars.githubusercontent.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src *;
  media-src 'self' blob: data: https://www.youtube-nocookie.com *.youtube.com;
  frame-src 'self' https://www.youtube-nocookie.com *.youtube.com streamable.com *.google.com;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`;

/**
 * @type {import('next').NextConfig}
 */
const config = {
	// Core Web Vitals Optimizasyonları - 2025

	// Image Optimization
	images: {
		domains: ['ibrahimsancar.com', 'images.unsplash.com', 'cdn.shopify.com'],
		formats: ['image/webp', 'image/avif'],
		minimumCacheTTL: 31536000, // 1 yıl
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		path: '/_next/image',
		loader: 'default',
	},

	// Performance Optimizations
	swcMinify: true,
	experimental: {
		legacyBrowsers: false,
		browsersListForSwc: true,
	},

	// Compression
	compress: true,

	// Headers for Performance
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					// Security Headers
					{
						key: 'X-Frame-Options',
						value: 'DENY'
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff'
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin'
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()'
					},
					// Performance Headers
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on'
					},
				],
			},
			// Cache Headers for Static Assets
			{
				source: '/favicon.ico',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			},
			{
				source: '/_next/static/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			},
			// Font Optimization
			{
				source: '/fonts/(.*)',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			}
		]
	},

	// Redirects for SEO
	async redirects() {
		return [
			// Old URL redirects
			{
				source: '/ibrahim-sancar',
				destination: '/',
				permanent: true,
			},
			{
				source: '/about',
				destination: '/',
				permanent: true,
			},
		]
	},

	// Webpack optimizations
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			// Bundle analyzer for production builds
			config.optimization.splitChunks = {
				chunks: 'all',
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			}
		}

		// SVG handling
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});

		config.plugins.push(new WindiCSS());

		config.module.rules.push({
			test: /\.(glsl|vs|fs|frag|vert)$/,
			use: ['ts-shader-loader'],
		});

		// JSON dosyaları için yükleyici
		config.module.rules.push({
			test: /\.json$/,
			type: 'json',
		});

		// Optimize bundle size
		config.optimization.minimize = true;

		return config;
	},

	// PWA Configuration (if using next-pwa)
	reactStrictMode: true,

	// Environment variables
	env: {
		SITE_URL: 'https://ibrahimsancar.com',
		SITE_NAME: 'İbrahim Can Sancar',
	},
};

module.exports = withAxiom(config);
