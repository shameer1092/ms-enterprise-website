import { NextRequest, NextResponse } from 'next/server';
import { addInquiry } from '@/lib/db';
import { sendInquiryNotification } from '@/lib/email';
import { inquirySchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    const body = await req.json();
    const { honeypot } = body;

    // 2. Anti-spam honeypot detection
    if (honeypot) {
      // Fake success response for bots
      return NextResponse.json({ success: true, message: 'Inquiry processed.' });
    }

    // 3. Strict Zod Schema Validation
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed: ' + parsed.error.issues.map((e) => e.message).join(', '),
          details: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, service, budget, timeline, message } = parsed.data;

    // 4. Save sanitized inquiry to database
    const savedInquiry = addInquiry({
      name,
      email,
      phone: phone || '',
      service,
      budget: budget || '',
      timeline: timeline || '',
      message,
      ip,
    });

    // 5. Send email notification asynchronously
    try {
      await sendInquiryNotification(savedInquiry);
    } catch (emailErr) {
      console.error('Email notification background error:', emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully. Our team will contact you shortly.',
        inquiryId: savedInquiry.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Inquiry submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
