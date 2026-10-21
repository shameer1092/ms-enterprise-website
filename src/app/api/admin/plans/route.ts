import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getPlans, savePlan, deletePlan } from '@/lib/db';

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const plans = getPlans(true);
  return NextResponse.json(plans);
}

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const body = await req.json();

  if (!body.name || !body.price) {
    return NextResponse.json({ error: 'Plan name and price are required.' }, { status: 400 });
  }

  const saved = savePlan(
    {
      ...body,
      name: body.name.trim(),
      price: body.price.trim(),
      billingPeriod: body.billingPeriod || 'one-time',
      features: Array.isArray(body.features) ? body.features : [],
      ctaText: body.ctaText || 'Select Plan',
      ctaLink: body.ctaLink || '/inquiry',
    },
    guard.session.username
  );

  return NextResponse.json({ success: true, plan: saved });
}

export async function DELETE(req: NextRequest) {
  const guard = requireAdmin(req);
  if ('errorResponse' in guard) return guard.errorResponse;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Plan ID is required.' }, { status: 400 });
  }

  const success = deletePlan(id, guard.session.username);
  if (!success) {
    return NextResponse.json({ error: 'Plan not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Plan deleted.' });
}
