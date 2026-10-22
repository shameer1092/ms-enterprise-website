import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername, getDatabase, saveDatabase } from '@/lib/db';
import { verifyPassword, signToken, TOKEN_COOKIE_NAME, DUMMY_BCRYPT_HASH } from '@/lib/auth';
import { checkLoginRateLimit, resetLoginRateLimit } from '@/lib/rate-limit';
import { loginSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    // Sliding-window rate limit: 5 attempts per 15 minutes per IP
    const rateCheck = checkLoginRateLimit(ip);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: 'Too many authentication attempts. Account access temporarily throttled.',
          retryAfter: rateCheck.retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.retryAfter),
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        }
      );
    }

    const rawBody = await req.json();

    // Strict Zod Schema Validation
    const parsed = loginSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Invalid authentication credentials format.',
          details: parsed.error.issues.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    const { username, password } = parsed.data;

    // Timing-Attack Mitigation: Constant-time comparison executed regardless of whether user exists
    const user = getUserByUsername(username);
    const hashToVerify = user ? user.passwordHash : DUMMY_BCRYPT_HASH;
    const isPasswordValid = verifyPassword(password, hashToVerify);

    if (!user || !isPasswordValid) {
      // Generic error response gives attackers zero user-enumeration hints
      return NextResponse.json(
        { error: 'Invalid authentication credentials' },
        { status: 401 }
      );
    }

    // Reset rate limit on successful authentication
    resetLoginRateLimit(ip);

    // Update last login timestamp in database
    const db = getDatabase();
    const userInDb = db.users.find((u) => u.id === user.id);
    if (userInDb) {
      userInDb.lastLogin = new Date().toISOString();
      saveDatabase(db);
    }

    const token = signToken({
      userId: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Zero-Trust Session Cookie: HTTP-only, SameSite=Strict, Secure
    response.cookies.set({
      name: TOKEN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    // Invalidate caches on administrative endpoints
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Secure login exception:', error);
    return NextResponse.json(
      { error: 'An unexpected system fault occurred.' },
      { status: 500 }
    );
  }
}
