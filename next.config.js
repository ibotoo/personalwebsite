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
	images: {
		domains: [
			// Discord assets
			'cdn.discordapp.com',

			// GitHub assets
			'raw.githubusercontent.com',

			// Spotify Album Art
			'i.scdn.co',

			// Streamable thumbnails
			'cdn-cf-east.streamable.com',

			// Unsplash
			'source.unsplash.com',
			'images.unsplash.com',

			// Additional GitHub assets
			'github.com',
			'avatars.githubusercontent.com',
		],
	},
	// Inspired by: https://github.com/leerob/leerob.io/blob/main/next.config.js#L44-L81
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
					{
						key: 'Content-Security-Policy',
						value: ContentSecurityPolicy.replace(/\n/g, ''),
					},
					// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=31536000; includeSubDomains; preload',
					},
					// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
					// Opt-out of Google FLoC: https://amifloced.org/
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
				],
			},
		];
	},
	reactStrictMode: true,
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: '/sitemap.xml',
				destination: '/api/sitemap',
			},
		];
	},
	webpack: (config, { dev, isServer }) => {
		// TODO: Temp disabled as since upgrading `next` to v12.2.3 production builds fail & this seems to be the cause
		// Replace React with Preact only in client production build
		// if (!dev && !isServer) {
		// 	Object.assign(config.resolve.alias, {
		// 		react: 'preact/compat',
		// 		'react-dom/test-utils': 'preact/test-utils',
		// 		'react-dom': 'preact/compat',
		// 	});
		// }

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
};

module.exports = withAxiom(config);
