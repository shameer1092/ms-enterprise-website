import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getSettings, updateSettings } from '@/lib/db';

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const body = await req.json();
  const updated = updateSettings(body, guard.session.username);

  return NextResponse.json({ success: true, settings: updated });
}
