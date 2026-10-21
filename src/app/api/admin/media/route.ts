import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireAdmin } from '@/lib/admin-guard';
import { getDatabase, saveDatabase } from '@/lib/db';
import { MediaItem } from '@/types';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const db = getDatabase();
  return NextResponse.json(db.media || []);
}

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  try {
    ensureUploadsDir();
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form data.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique name
    const ext = path.extname(file.name).toLowerCase();
    const safeBase = path.basename(file.name, ext).replace(/[^a-z0-9_-]/gi, '_');
    const uniqueFilename = `${safeBase}_${Date.now()}${ext}`;
    const filePath = path.join(UPLOADS_DIR, uniqueFilename);

    fs.writeFileSync(filePath, buffer);

    const mediaItem: MediaItem = {
      id: `med-${Date.now()}`,
      filename: uniqueFilename,
      originalName: file.name,
      url: `/uploads/${uniqueFilename}`,
      size: file.size,
      mimeType: file.type || 'application/octet-stream',
      uploadedAt: new Date().toISOString(),
    };

    const db = getDatabase();
    if (!db.media) db.media = [];
    db.media.unshift(mediaItem);
    saveDatabase(db);

    return NextResponse.json({ success: true, file: mediaItem });
  } catch (error: any) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: error.message || 'File upload failed.' }, { status: 500 });
  }
}
