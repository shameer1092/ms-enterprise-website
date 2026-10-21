import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireAdmin } from '@/lib/admin-guard';
import { createBackup, restoreBackup, listBackups, getDatabase } from '@/lib/db';

const BACKUPS_DIR = path.join(process.cwd(), 'data', 'backups');

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const { searchParams } = new URL(req.url);
  const downloadFile = searchParams.get('download');

  if (downloadFile) {
    const safeName = path.basename(downloadFile);
    const filePath = path.join(BACKUPS_DIR, safeName);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Backup file not found.' }, { status: 404 });
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${safeName}"`,
      },
    });
  }

  const backups = listBackups();
  return NextResponse.json({ backups });
}

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req, 'owner');
  if ('errorResponse' in guard) return guard.errorResponse;

  try {
    const body = await req.json();

    if (body.action === 'create') {
      const backup = createBackup();
      return NextResponse.json({
        success: true,
        message: 'Backup created successfully.',
        filename: backup.filename,
      });
    }

    if (body.action === 'restore') {
      if (!body.data) {
        return NextResponse.json({ error: 'Backup data is required.' }, { status: 400 });
      }

      restoreBackup(body.data, guard.session.username);
      return NextResponse.json({ success: true, message: 'Database successfully restored.' });
    }

    return NextResponse.json({ error: 'Unknown action specified.' }, { status: 400 });
  } catch (error: any) {
    console.error('Backup error:', error);
    return NextResponse.json({ error: error.message || 'Backup operation failed.' }, { status: 500 });
  }
}
