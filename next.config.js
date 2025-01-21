/** @type {import('next').NextConfig} */
const nextConfig = {
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
            value: [
              // Temel güvenlik özellikleri
              'camera=()',
              'microphone=()',
              'geolocation=(self "https://maps.googleapis.com")', // Google Maps için geolocation izni
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
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https://*.googleapis.com https://*.gstatic.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.googleapis.com",
              "frame-src 'self' https://www.google.com/maps/ https://maps.googleapis.com"
            ].join('; ')
          }
        ],
      },
    ]
  }
}

module.exports = nextConfig;
