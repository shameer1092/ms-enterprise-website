import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '@/lib/db';

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const inquiries = getInquiries();
  return NextResponse.json(inquiries);
}

export async function PATCH(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const body = await req.json();
  const { id, status, adminNotes } = body;

  if (!id || !status) {
    return NextResponse.json({ error: 'ID and status are required.' }, { status: 400 });
  }

  const updated = updateInquiryStatus(id, status, adminNotes, guard.session.username);
  if (!updated) {
    return NextResponse.json({ error: 'Inquiry not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, inquiry: updated });
}

export async function DELETE(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Inquiry ID is required.' }, { status: 400 });
  }

  const success = deleteInquiry(id, guard.session.username);
  if (!success) {
    return NextResponse.json({ error: 'Inquiry not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Inquiry deleted.' });
}
