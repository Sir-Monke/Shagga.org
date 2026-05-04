/** @type {import('next').NextConfig} */

// Security headers applied to every response.
// What each one does:
// - Strict-Transport-Security: browsers must always use HTTPS for shagga.org for 2 years
// - X-Frame-Options: nobody can put shagga.org in an iframe (prevents clickjacking)
// - X-Content-Type-Options: browser can't be tricked into running text files as scripts
// - Referrer-Policy: don't leak which page of shagga.org a user clicked from
// - Permissions-Policy: preemptively deny camera/mic/location/etc — site never needs them
// - Cross-Origin-Opener-Policy: isolate window from popups (helps against side-channel attacks)
// - X-DNS-Prefetch-Control: opt out of leaky DNS prefetching
// - X-XSS-Protection: legacy header for older browsers, can't hurt to include
// - Content-Security-Policy: the big one — tells browsers exactly what content is allowed.
//   - default-src 'self': only load stuff from shagga.org by default
//   - script-src 'self' 'unsafe-inline' 'unsafe-eval' va.vercel-scripts.com:
//        Next.js inlines hydration scripts so we need 'unsafe-inline' + 'unsafe-eval';
//        va.vercel-scripts.com is for Speed Insights
//   - style-src 'self' 'unsafe-inline': Tailwind + inline styles need this
//   - img-src 'self' data: blob:: own images, base64, generated blobs (paint app)
//   - connect-src 'self' ipapi.co vitals.vercel-insights.com:
//        ipapi.co is for "shagga in your area" geolocation; vitals is for Speed Insights
//   - frame-ancestors 'none': can't be embedded in another site (matches X-Frame-Options)
//   - base-uri 'self': prevents <base> tag injection attacks
//   - form-action 'self': forms can only submit to our own domain

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control',    value: 'off' },
  { key: 'X-XSS-Protection',          value: '1; mode=block' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://ipapi.co https://vitals.vercel-insights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // removes "X-Powered-By: Next.js" header — don't advertise the stack to bots

  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
    ];
  },

  // Probe paths (/@fs/, /wp-admin/, /.env, etc.) are now handled by middleware.ts,
  // which rewrites them to our themed not-found page with a proper 404 status.
};

export default nextConfig;
