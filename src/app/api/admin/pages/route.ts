import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getPages, savePage, deletePage } from '@/lib/db';

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const pages = getPages(true);
  return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const body = await req.json();

  if (!body.title || !body.title.trim()) {
    return NextResponse.json({ error: 'Page title is required.' }, { status: 400 });
  }

  const slug =
    body.slug && body.slug.trim()
      ? body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : body.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const saved = savePage(
    {
      ...body,
      slug,
      title: body.title.trim(),
      navLabel: body.navLabel || body.title.trim(),
      summary: body.summary || '',
      content: body.content || '',
      metaTitle: body.metaTitle || `${body.title.trim()} | MS Enterprise`,
      metaDescription: body.metaDescription || body.summary || '',
      sections: Array.isArray(body.sections) ? body.sections : [],
    },
    guard.session.username
  );

  return NextResponse.json({ success: true, page: saved });
}

export async function DELETE(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Page ID is required.' }, { status: 400 });
  }

  const success = deletePage(id, guard.session.username);
  if (!success) {
    return NextResponse.json({ error: 'Page not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Page deleted.' });
}
