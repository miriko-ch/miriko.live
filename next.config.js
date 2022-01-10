module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['bilistats.lonelyion.com'],
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
}
