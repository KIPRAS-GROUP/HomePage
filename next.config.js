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
            // Açıkça reddedilen özellikler
            value: [
              // Temel güvenlik özellikleri
              'camera=()',
              'microphone=()',
              'geolocation=()',
              // Privacy Sandbox özellikleri
              'attribution-reporting=()',
              'browsing-topics="()"',
              'join-ad-interest-group="()"',
              'run-ad-auction="()"',
              'interest-cohort="()"',
              // FLoC ve diğer deneysel özellikler
              'conversion-measurement=()',
              'focus-without-user-activation=()',
              'hid=()',
              'idle-detection=()',
              'serial=()',
              'sync-xhr=()',
              'unload=()',
              'usb=()',
              'vertical-scroll=()'
            ].join(', ')
          },
          {
            // CORS politikası
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          }
        ],
      },
    ]
  }
}

module.exports = nextConfig;
