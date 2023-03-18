/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hoteler-image-list.s3.ap-northeast-1.amazonaws.com',
        // pathname: '/*/**',
      }
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
