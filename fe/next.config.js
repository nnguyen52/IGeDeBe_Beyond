const { redirect } = require('next/dist/server/api-utils');
const path = require('path');
module.exports = {
  reactStrictMode: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:5000/api/:path*', // Proxy to Backend
  //     },
  //   ];
  // },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/App.scss')],
  },
  images: {
    domains: ['images.igdb.com'],
  },
  experimental: { esmExternals: true },
  env: {
    REACT_APP_APIURL: 'http://localhost:3000',
    REACT_APP_APIURL_BACKEND: 'http://localhost:5000',
  },
};
