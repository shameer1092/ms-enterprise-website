import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getUsers, saveUser, deleteUser, getUserByUsername } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const users = getUsers();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  // Only Owner can create or edit users
  const guard = requireAdmin(req, 'owner');
  if ('errorResponse' in guard) return guard.errorResponse;

  const body = await req.json();

  if (!body.username || !body.username.trim()) {
    return NextResponse.json({ error: 'Username is required.' }, { status: 400 });
  }

  const existing = getUserByUsername(body.username.trim());
  if (!body.id && existing) {
    return NextResponse.json({ error: 'Username already in use.' }, { status: 400 });
  }

  const payload: any = {
    ...body,
    username: body.username.trim().toLowerCase(),
    name: body.name || body.username,
    email: body.email || '',
    role: body.role === 'owner' ? 'owner' : 'editor',
    twoFactorEnabled: Boolean(body.twoFactorEnabled),
  };

  if (body.twoFactorEnabled && body.twoFactorSecret) {
    payload.twoFactorSecret = body.twoFactorSecret;
  }

  if (body.password && body.password.trim().length >= 6) {
    payload.passwordHash = hashPassword(body.password.trim());
  } else if (!body.id) {
    return NextResponse.json(
      { error: 'Password is required and must be at least 6 characters.' },
      { status: 400 }
    );
  }

  const saved = saveUser(payload, guard.session.username);
  const { passwordHash, twoFactorSecret, ...safeUser } = saved;

  return NextResponse.json({ success: true, user: safeUser });
}

export async function DELETE(req: NextRequest) {
  const guard = requireAdmin(req, 'owner');
  if ('errorResponse' in guard) return guard.errorResponse;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
  }

  if (id === guard.session.userId) {
    return NextResponse.json({ error: 'You cannot delete your own active account.' }, { status: 400 });
  }

  try {
    const success = deleteUser(id, guard.session.username);
    if (!success) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'User deleted.' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to delete user.' }, { status: 400 });
  }
}
