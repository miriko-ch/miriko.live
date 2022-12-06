module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: '**.lonelyion.com',
      },
      {
        hostname: '**.miriko.live',
      },
      {
        protocol: 'http',
        hostname: '**.hdslb.com',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/stream',
        destination: 'https://live.bilibili.com/449047',
        permanent: false,
      },
      {
        source: '/space',
        destination: 'https://space.bilibili.com/7564991',
        permanent: false,
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/bili_imgs/:path*',
        destination: 'https://:path*',
      },
    ]
  }
}
