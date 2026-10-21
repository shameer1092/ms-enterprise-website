import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getServices, saveService, deleteService } from '@/lib/db';

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const services = getServices(true);
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const body = await req.json();

  if (!body.title || !body.title.trim()) {
    return NextResponse.json({ error: 'Service title is required.' }, { status: 400 });
  }

  // Auto-slug if missing
  const slug =
    body.slug && body.slug.trim()
      ? body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : body.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const saved = saveService(
    {
      ...body,
      slug,
      title: body.title.trim(),
      summary: body.summary || '',
      description: body.description || '',
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      features: Array.isArray(body.features) ? body.features : [],
    },
    guard.session.username
  );

  return NextResponse.json({ success: true, service: saved });
}

export async function DELETE(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Service ID is required.' }, { status: 400 });
  }

  const success = deleteService(id, guard.session.username);
  if (!success) {
    return NextResponse.json({ error: 'Service not found or could not be deleted.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Service deleted.' });
}
