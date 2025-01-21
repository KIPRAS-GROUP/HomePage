/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Static Export

  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'localhost',
      'home-page-xi-tawny.vercel.app',
      'kipras.com.tr'
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()' // Sadece gerçekten kullandığımız özellikleri belirtiyoruz
          }
        ],
      },
    ]
  }
}

module.exports = nextConfig;
