import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getProjects, saveProject, deleteProject } from '@/lib/db';

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const projects = getProjects(true);
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const body = await req.json();

  if (!body.title || !body.title.trim()) {
    return NextResponse.json({ error: 'Project title is required.' }, { status: 400 });
  }

  const slug =
    body.slug && body.slug.trim()
      ? body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : body.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const saved = saveProject(
    {
      ...body,
      slug,
      title: body.title.trim(),
      summary: body.summary || '',
      description: body.description || '',
      techStack: Array.isArray(body.techStack) ? body.techStack : [],
      keyOutcomes: Array.isArray(body.keyOutcomes) ? body.keyOutcomes : [],
    },
    guard.session.username
  );

  return NextResponse.json({ success: true, project: saved });
}

export async function DELETE(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Project ID is required.' }, { status: 400 });
  }

  const success = deleteProject(id, guard.session.username);
  if (!success) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Project deleted.' });
}
