import { NextRequest, NextResponse } from 'next/server';
import { addInquiry } from '@/lib/db';
import { sendInquiryNotification } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 5, 60000); // 5 submissions per minute max

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, service, budget, timeline, message, honeypot } = body;

    // 2. Anti-spam honeypot detection
    if (honeypot) {
      // Fake success for bots
      return NextResponse.json({ success: true, message: 'Inquiry processed.' });
    }

    // 3. Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!service || typeof service !== 'string') {
      return NextResponse.json({ error: 'Service category is required.' }, { status: 400 });
    }

    if (!message || message.trim().length < 15) {
      return NextResponse.json(
        { error: 'Project details must be at least 15 characters long.' },
        { status: 400 }
      );
    }

    // 4. Save to database
    const savedInquiry = addInquiry({
      name: name.trim().slice(0, 150),
      email: email.trim().toLowerCase().slice(0, 150),
      phone: phone ? phone.trim().slice(0, 50) : '',
      service: service.trim().slice(0, 100),
      budget: budget ? budget.trim().slice(0, 50) : '',
      timeline: timeline ? timeline.trim().slice(0, 50) : '',
      message: message.trim().slice(0, 5000),
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
