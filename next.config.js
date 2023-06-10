/** @type {import('next').NextConfig} */

// const withPWA = require('next-pwa');
const path = require('path');

const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/products',
				permanent: true
			}
		];
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	}
};

module.exports = nextConfig;
