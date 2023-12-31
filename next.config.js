/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  sw: 'service-worker.js',
  register: true,
  skipWaiting: true,
  cacheStartUrl: true,
  cacheOnFrontEndNav: true,
});
const path = require('path');

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/posts',
        permanent: true,
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

(module.exports = nextConfig),
  withPWA({
    reactStrictMode: true,
  });
