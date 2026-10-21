import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getInquiries } from '@/lib/db';

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const inquiries = getInquiries();

  const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Timeline', 'Status', 'Message'];
  
  const escapeCsv = (str: any) => {
    if (str === null || str === undefined) return '""';
    const clean = String(str).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = inquiries.map((inq) => [
    escapeCsv(inq.id),
    escapeCsv(new Date(inq.createdAt).toISOString()),
    escapeCsv(inq.name),
    escapeCsv(inq.email),
    escapeCsv(inq.phone),
    escapeCsv(inq.service),
    escapeCsv(inq.budget),
    escapeCsv(inq.timeline),
    escapeCsv(inq.status),
    escapeCsv(inq.message),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="ms_enterprise_inquiries_${Date.now()}.csv"`,
    },
  });
}
