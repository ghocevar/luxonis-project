/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['d18-a.sdn.cz', 'media.istockphoto.com'],
  },
  output: 'standalone',
};
