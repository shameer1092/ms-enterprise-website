import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'ms-enterprise-super-secure-spatial-ui-jwt-secret-2026';
const TOKEN_COOKIE_NAME = 'ms_admin_token';
const ADMIN_ENTRY_PATH = process.env.NEXT_PUBLIC_ADMIN_ENTRY_PATH || '/portal-gateway-7f9a';

// Web Crypto API Edge-compatible JWT verification
async function verifyJwtEdge(token: string, secretStr: string): Promise<boolean> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [headerB64, payloadB64, signatureB64] = parts;

    // Check expiration timestamp in payload
    const binPayload = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(binPayload);
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secretStr),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // Decode signature
    const binSig = atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/'));
    const sigBytes = new Uint8Array(binSig.length);
    for (let i = 0; i < binSig.length; i++) {
      sigBytes[i] = binSig.charCodeAt(i);
    }

    const data = enc.encode(`${headerB64}.${payloadB64}`);
    return await crypto.subtle.verify('HMAC', key, sigBytes, data);
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Obfuscated Admin Entry Point (/portal-gateway-7f9a)
  // If an already authenticated admin visits the portal gateway, route them directly to the console
  if (pathname === ADMIN_ENTRY_PATH || pathname === '/portal-gateway-7f9a') {
    const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;
    if (token) {
      const isValid = await verifyJwtEdge(token, JWT_SECRET);
      if (isValid) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
    }
    // Allow access to login interface
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  }

  // 2. Intercept Public Probing of Legacy /admin Routes
  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  // Allow public login and logout APIs
  if (pathname === '/api/admin/login' || pathname === '/api/admin/logout') {
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    return res;
  }

  if (isAdminPage || isAdminApi) {
    const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;

    let isAuthenticated = false;
    if (token) {
      isAuthenticated = await verifyJwtEdge(token, JWT_SECRET);
    }

    // Zero-Trust Route Obfuscation:
    // If not authenticated, return a silent 404 (not 401/403 or redirect)
    // to give attackers zero confirmation that the administrative route exists.
    if (!isAuthenticated) {
      if (isAdminApi) {
        return NextResponse.json(
          { error: 'Resource not found' },
          {
            status: 404,
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate',
              'Pragma': 'no-cache',
            },
          }
        );
      }

      // Rewrite to 404 page with HTTP 404 status
      const notFoundUrl = new URL('/not-found', req.url);
      const res = NextResponse.rewrite(notFoundUrl, { status: 404 });
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.headers.set('Pragma', 'no-cache');
      res.headers.set('Expires', '0');
      return res;
    }

    // Authenticated Request: inject anti-caching security headers
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.headers.set('Pragma', 'no-cache');
    res.headers.set('Expires', '0');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/portal-gateway-7f9a',
  ],
};
