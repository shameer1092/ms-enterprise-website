import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { User, UserRole } from '@/types';
import { getUserByUsername, getUserById } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'ms-enterprise-super-secure-spatial-ui-jwt-secret-2026';
const TOKEN_COOKIE_NAME = 'ms_admin_token';

export interface TokenPayload {
  userId: string;
  username: string;
  role: UserRole;
  name: string;
}

export function hashPassword(plain: string): string {
  return bcrypt.hashSync(plain, 10);
}

export function verifyPassword(plain: string, hashed: string): boolean {
  try {
    return bcrypt.compareSync(plain, hashed);
  } catch (error) {
    return false;
  }
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export function getSessionFromRequest(req: NextRequest): TokenPayload | null {
  // Check cookie first
  const cookie = req.cookies.get(TOKEN_COOKIE_NAME);
  if (cookie?.value) {
    const verified = verifyToken(cookie.value);
    if (verified) return verified;
  }

  // Fallback to Authorization header
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    return verifyToken(token);
  }

  return null;
}

export { TOKEN_COOKIE_NAME };
