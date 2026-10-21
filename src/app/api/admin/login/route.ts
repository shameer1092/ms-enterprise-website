import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername, getDatabase, saveDatabase } from '@/lib/db';
import { verifyPassword, signToken, TOKEN_COOKIE_NAME } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    // Max 8 login attempts per minute per IP
    const rateCheck = checkRateLimit(`login_${ip}`, 8, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { username, password, twoFactorCode } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const user = getUserByUsername(username);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials entered.' },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials entered.' },
        { status: 401 }
      );
    }

    // Optional 2FA validation check
    if (user.twoFactorEnabled) {
      if (!twoFactorCode || twoFactorCode !== user.twoFactorSecret) {
        return NextResponse.json(
          { error: 'Invalid 2FA security code.', requires2FA: true },
          { status: 401 }
        );
      }
    }

    // Update last login
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

    // Set secure HTTP-only cookie with 8h lifespan
    response.cookies.set({
      name: TOKEN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error during login.' }, { status: 500 });
  }
}
