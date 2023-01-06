/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hoteler-image.s3.ap-northeast-1.amazonaws.com',
        port: '',
        pathname: '/uploads/hoteler/**',
      },
    ],
  },
}

module.exports = nextConfig
