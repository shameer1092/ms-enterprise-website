import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getSettings } from '@/lib/db';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { MessageSquare, Phone, Mail, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Project Inquiry & Direct Contact | MS Enterprise',
  description:
    'Start a conversation with our founding software architects and operations leads. No account managers or agency bloat.',
};

export default function InquiryPage() {
  const settings = getSettings();
  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="relative py-16 md:py-24 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#B8860B] shadow-sm dark:text-[#E5B238]">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
            <span>Direct Partner Communication</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#121316] sm:text-5xl dark:text-white">
            Start a Direct Project Inquiry
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#2B2D33] sm:text-lg dark:text-[#E5E7EB]">
            No sales pitches or non-technical intermediaries. Share your goals, and we&apos;ll get back to you with architectural recommendations and honest pricing.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-8">
            <Suspense
              fallback={
                <div className="flex min-h-[400px] items-center justify-center rounded-3xl bg-white border border-[#E5E7EB] p-12 dark:bg-[#1E2024] dark:border-[#2A2D34]">
                  <div className="flex items-center gap-3 text-[#D4AF37]">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#D4AF37] border-t-transparent" />
                    <span className="text-sm font-semibold text-[#121316] dark:text-white">Loading inquiry form...</span>
                  </div>
                </div>
              }
            >
              <InquiryForm />
            </Suspense>
          </div>

          {/* Right Column: Direct Contact & Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Channels Card */}
            <div className="rounded-3xl bg-white p-7 border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
              <h2 className="text-base font-bold text-[#121316] dark:text-white">
                Direct Contact Channels
              </h2>
              <p className="mt-1 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                Prefer chatting directly on WhatsApp or sending an email?
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href={`https://wa.me/${cleanWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-50/80 p-3.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold">WhatsApp Direct</p>
                    <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80">Instant live chat</p>
                  </div>
                </a>

                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#FBFBFA] p-3.5 text-xs text-[#2B2D33] transition-colors hover:border-[#D4AF37] dark:border-[#2A2D34] dark:bg-[#121316] dark:text-[#E5E7EB]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#121316] text-[#D4AF37] dark:bg-white dark:text-[#121316]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">Call Directly</p>
                    <p className="font-bold">{settings.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-[#FBFBFA] p-3.5 text-xs text-[#2B2D33] transition-colors hover:border-[#D4AF37] dark:border-[#2A2D34] dark:bg-[#121316] dark:text-[#E5E7EB]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#121316] text-[#D4AF37] dark:bg-white dark:text-[#121316]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">Official Email</p>
                    <p className="font-bold truncate">{settings.email}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Our Commitments */}
            <div className="rounded-3xl bg-white p-7 border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
              <h2 className="text-base font-bold text-[#121316] dark:text-white">
                The Partner Commitments
              </h2>
              <ul className="mt-4 space-y-3.5 text-xs text-[#2B2D33] dark:text-[#E5E7EB]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <span>Direct discussion with software architects, not commission sales reps.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <span>Lifetime live support on delivered web engineering code.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <span>Honest delivery guarantees: transparent milestones and zero inflated change fees.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
