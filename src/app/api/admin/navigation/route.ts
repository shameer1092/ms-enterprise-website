import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getNavigation, updateNavigationConfig, getDatabase, syncDynamicNavigation, saveDatabase } from '@/lib/db';

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const db = getDatabase();
  return NextResponse.json(db.navigation);
}

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const body = await req.json();

  if (body.action === 'resync') {
    const db = getDatabase();
    syncDynamicNavigation(db);
    saveDatabase(db);
    return NextResponse.json({ success: true, navigation: db.navigation });
  }

  if (!Array.isArray(body.navigation)) {
    return NextResponse.json({ error: 'Navigation items array is required.' }, { status: 400 });
  }

  const updated = updateNavigationConfig(body.navigation, guard.session.username);
  return NextResponse.json({ success: true, navigation: updated });
}
