import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getServices, getProjects, getPlans, getPages, getInquiries, getAuditLogs } from '@/lib/db';

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const services = getServices(true);
  const projects = getProjects(true);
  const plans = getPlans(true);
  const pages = getPages(true);
  const inquiries = getInquiries();
  const logs = getAuditLogs().slice(0, 10);

  const unreadInquiries = inquiries.filter((i) => i.status === 'unread').length;

  return NextResponse.json({
    counts: {
      services: services.length,
      projects: projects.length,
      plans: plans.length,
      pages: pages.length,
      inquiries: inquiries.length,
      unreadInquiries,
    },
    recentInquiries: inquiries.slice(0, 5),
    recentLogs: logs,
  });
}
