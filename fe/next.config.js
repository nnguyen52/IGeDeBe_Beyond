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
    REACT_APP_APIURL_BACKEND:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000'
        : 'https://igedebe-beyond.herokuapp.com',
  },
};
