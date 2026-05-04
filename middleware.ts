import { NextResponse, type NextRequest } from 'next/server';

// Patterns bots commonly probe for — known vulns, leaked secrets, dev-only paths.
// Any request matching these is rewritten to a non-existent route, which triggers
// our themed not-found.tsx with a proper 404 status.
const PROBE_PATTERNS: RegExp[] = [
  /^\/@fs\b/i,             // Vite/Next dev path traversal
  /^\/\.env/i,             // Leaked env files
  /^\/\.git\b/i,           // Exposed git folders
  /^\/wp-/i,               // WordPress probes (we don't run WP)
  /^\/xmlrpc\.php/i,       // WordPress XML-RPC
  /^\/admin\/?$/i,         // Generic admin probe
  /^\/phpmyadmin/i,        // phpMyAdmin probes
  /^\/cgi-bin\b/i,         // Old CGI scripts
  /^\/server-status\b/i,   // Apache server-status leak
  /^\/\.aws\b/i,           // AWS credential leak
  /^\/config\.json$/i,     // Generic config leak
  /^\/private\.key$/i,     // Private key probe
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PROBE_PATTERNS.some((re) => re.test(pathname))) {
    // Rewrite to a path that doesn't exist — Next.js will render not-found.tsx
    // with a 404 status, which is more honest than a 403 and shows our themed page.
    const url = request.nextUrl.clone();
    url.pathname = '/__shagga_not_found__';
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

// Skip middleware for static assets — they don't need this check and
// running it on every image/font request would slow things down.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|images/).*)',
  ],
};
