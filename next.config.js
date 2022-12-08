/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.igdb.com'],
  },
  async redirects() {
    return [
      {
        source: '/games',
        destination: '/games/All',
        permanent: false,
      }
    ]
  }
}

module.exports = nextConfig
