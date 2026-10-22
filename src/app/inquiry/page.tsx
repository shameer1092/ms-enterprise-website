import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getSettings } from '@/lib/db';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { Icon } from '@/components/common/Icon';

export const metadata: Metadata = {
  title: 'Project Inquiry & Direct Contact',
  description: 'Submit an inquiry for custom website development, Meta organic growth, or ecommerce virtual assistant store operations.',
};

export default function InquiryPage() {
  const settings = getSettings();

  return (
    <div className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400">
            <span>Direct Communication</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Start a Project Inquiry
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Tell us about your project or operational requirements. We evaluate every detail and respond with clear execution steps.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Inquiry Form wrapped in Suspense */}
          <div className="lg:col-span-8">
            <Suspense
              fallback={
                <div className="spatial-card flex min-h-[400px] items-center justify-center rounded-2xl p-12">
                  <div className="flex items-center gap-3 text-sky-600 dark:text-cyan-400">
                    <Icon name="RefreshCw" className="h-5 w-5 animate-spin" />
                    <span>Loading inquiry form...</span>
                  </div>
                </div>
              }
            >
              <InquiryForm />
            </Suspense>
          </div>

          {/* Right Column: Direct Contact & Guarantees */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* Direct channels card */}
              <div className="spatial-card rounded-3xl p-7 shadow-liquid-card dark:shadow-spatial-card">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Direct Channels</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Prefer instant messaging or a direct phone call? Reach us directly:
                </p>

                <div className="mt-6 space-y-4">
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-50/80 p-3.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                      <Icon name="MessageSquare" className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold">WhatsApp Direct</p>
                      <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80">Instant Live Chat</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-3.5 text-xs text-slate-700 transition-colors hover:border-sky-500/30 hover:text-slate-950 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:text-white"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-cyan-500/15 dark:text-cyan-400">
                      <Icon name="Phone" className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Call Us</p>
                      <p className="font-semibold">{settings.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-3.5 text-xs text-slate-700 transition-colors hover:border-sky-500/30 hover:text-slate-950 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:text-white"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-cyan-500/15 dark:text-cyan-400">
                      <Icon name="Mail" className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Official Email</p>
                      <p className="font-semibold">{settings.email}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Our Trust Commitments */}
              <div className="spatial-card rounded-3xl p-7 shadow-liquid-card dark:shadow-spatial-card">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Our Commitments</h2>
                <ul className="mt-4 space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <Icon name="ShieldCheck" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-cyan-400" />
                    <span>Direct discussion with developers, not commission sales reps.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Icon name="ShieldCheck" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-cyan-400" />
                    <span>Lifetime live support on delivered web engineering code.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Icon name="ShieldCheck" className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-cyan-400" />
                    <span>Honest delay policy: if an emergency occurs, we apologize and compensate.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
