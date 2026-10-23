import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Code2,
  Share2,
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Linkedin,
  MapPin,
  MessageSquare,
  Award,
  Sparkles,
  Phone,
  Mail,
  HeartHandshake,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Partner Philosophy | MS Enterprise',
  description:
    'Founded in 2026 in Dera Ghazi Khan, Pakistan. We eliminate digital agency bloat, giving you direct access to experienced software architects and growth operators.',
};

export default function AboutPage() {
  return (
    <div className="relative py-16 md:py-24 overflow-x-hidden">
      {/* ---------------- 1. HERO & PARTNER PHILOSOPHY ---------------- */}
      <section className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#B8860B] shadow-sm dark:text-[#E5B238]">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
            <span>EST. 2026 • DERA GHAZI KHAN TO GLOBAL MARKETS</span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#121316] sm:text-5xl lg:text-6xl dark:text-white leading-[1.15]">
            Built on direct partnerships.{' '}
            <span className="text-[#D4AF37] underline decoration-[#D4AF37]/40 underline-offset-8">
              Zero agency nonsense.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base leading-relaxed text-[#2B2D33] sm:text-lg dark:text-[#E5E7EB]">
            MS Enterprise was created to challenge the traditional digital agency model. Instead of layers of non-technical account managers, inflated retainer fees, and unvetted outsourced contractors, we connect ambitious business owners directly with senior software architects and operations directors.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/inquiry"
              className="spatial-btn-primary inline-flex items-center gap-2"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#leadership"
              className="spatial-btn-secondary inline-flex items-center gap-2"
            >
              <span>Meet the Founders</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- 2. THE ORIGIN STORY ---------------- */}
      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-white p-8 sm:p-12 lg:p-16 border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
                  <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>The Catalyst • Why We Started</span>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#121316] sm:text-3xl lg:text-4xl dark:text-white">
                  Founded in 2026 to Eliminate Agency Bloat
                </h2>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#2B2D33] dark:text-[#9CA3AF]">
                  <p>
                    Rooted in Dera Ghazi Khan (DG Khan), Punjab, Pakistan, MS Enterprise emerged from observing a widespread breakdown in how web platforms and digital growth are delivered worldwide.
                  </p>
                  <p>
                    Traditional agencies mark up projects by 300% to pay for expensive commercial leases and tiers of account executives who merely forward client emails to junior developers. On the other end, unmanaged freelancer platforms leave clients vulnerable to erratic code quality, missed deadlines, and zero post-launch accountability.
                  </p>
                  <p className="font-semibold text-[#121316] dark:text-white">
                    Our model is straightforward: Every line of code, social campaign, and store operation is directly led by our core founding engineers. When you have a question or need an urgent feature, you speak directly with the architects building your system.
                  </p>
                </div>
              </div>

              {/* Reassuring Pillars Box */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#FBFBFA] p-6 sm:p-8 dark:border-[#2A2D34] dark:bg-[#121316]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
                    Our Operational Standard
                  </span>
                  <div className="mt-5 space-y-6">
                    <div className="border-b border-[#E5E7EB] pb-4 dark:border-[#2A2D34]">
                      <div className="text-3xl font-extrabold text-[#121316] dark:text-white">0%</div>
                      <div className="text-xs font-bold text-[#121316] dark:text-[#E5E7EB]">
                        Zero Middlemen Markup
                      </div>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                        You collaborate directly with experienced engineers, not sales reps.
                      </p>
                    </div>

                    <div className="border-b border-[#E5E7EB] pb-4 dark:border-[#2A2D34]">
                      <div className="text-3xl font-extrabold text-[#121316] dark:text-white">100%</div>
                      <div className="text-xs font-bold text-[#121316] dark:text-[#E5E7EB]">
                        Lifetime Live Support
                      </div>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                        Guaranteed direct WhatsApp/Slack contact and low monthly maintenance.
                      </p>
                    </div>

                    <div>
                      <div className="text-3xl font-extrabold text-[#121316] dark:text-white">4 Years</div>
                      <div className="text-xs font-bold text-[#121316] dark:text-[#E5E7EB]">
                        Verified Domain Experience
                      </div>
                      <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                        Hands-on track record across full-stack Next.js systems and Meta growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. THREE-WAY COMPARISON (THE PARTNER DIFFERENCE) ---------------- */}
      <section className="relative mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
              <Award className="h-3.5 w-3.5" />
              <span>Comparison</span>
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-[#121316] sm:text-3xl dark:text-white">
              Why Ambitious Brands Choose MS Enterprise
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#6B7280] dark:text-[#9CA3AF]">
              See how our direct partner model compares to bloated agencies and unpredictable freelancers.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Traditional Agency */}
            <div className="rounded-3xl bg-white p-7 border border-[#E5E7EB] dark:bg-[#1E2024] dark:border-[#2A2D34]">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700 dark:bg-white/5 dark:text-slate-300">
                <span>Traditional Agency</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#121316] dark:text-white">
                Bloat & High Retainers
              </h3>
              <ul className="mt-5 space-y-3 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">&times;</span>
                  <span>Non-technical account managers who slow down every sprint.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">&times;</span>
                  <span>High monthly retainers that bill you for agency overhead.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">&times;</span>
                  <span>Lengthy change-order processes for tiny revisions.</span>
                </li>
              </ul>
              <div className="mt-6 border-t border-[#E5E7EB] pt-3 text-[11px] font-medium text-slate-500 dark:border-[#2A2D34]">
                Outcome: Exorbitant invoices and sluggish delivery.
              </div>
            </div>

            {/* Unmanaged Freelancers */}
            <div className="rounded-3xl bg-white p-7 border border-[#E5E7EB] dark:bg-[#1E2024] dark:border-[#2A2D34]">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-300">
                <span>Unmanaged Freelancers</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#121316] dark:text-white">
                Volatility & Ghosting Risk
              </h3>
              <ul className="mt-5 space-y-3 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">!</span>
                  <span>Inconsistent code quality with zero security audits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">!</span>
                  <span>Sudden disappearing acts when edge-case bugs occur.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">!</span>
                  <span>Zero warranty or support once the contract ends.</span>
                </li>
              </ul>
              <div className="mt-6 border-t border-[#E5E7EB] pt-3 text-[11px] font-medium text-slate-500 dark:border-[#2A2D34]">
                Outcome: Stress, fragile code, and unpredictable timelines.
              </div>
            </div>

            {/* The MS Enterprise Standard */}
            <div className="rounded-3xl bg-white p-7 border-2 border-[#121316] shadow-partner-card dark:bg-[#1E2024] dark:border-[#D4AF37]">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#121316]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>The MS Enterprise Standard</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#121316] dark:text-white">
                Direct Engineering Accountability
              </h3>
              <ul className="mt-5 space-y-3 text-xs text-[#121316] dark:text-[#E5E7EB]">
                <li className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-[#D4AF37] shrink-0" />
                  <span>Direct founder communication: Talk directly to Rana & Moiz.</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-[#D4AF37] shrink-0" />
                  <span>Clean custom Next.js builds, transparent pricing, and low maintenance.</span>
                </li>
                <li className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-[#D4AF37] shrink-0" />
                  <span>Guaranteed lifetime live support and authentic commitments.</span>
                </li>
              </ul>
              <div className="mt-6 border-t border-[#E5E7EB] pt-3 text-[11px] font-bold text-[#B8860B] dark:text-[#E5B238] dark:border-[#2A2D34]">
                Outcome: Fast turnaround, solid stability, peace of mind.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4. LEADERSHIP & FOUNDERS ---------------- */}
      <section id="leadership" className="relative mt-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
              <Users className="h-3.5 w-3.5" />
              <span>Founders & Leads</span>
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#121316] sm:text-4xl dark:text-white">
              Meet Your Partners
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#6B7280] dark:text-[#9CA3AF]">
              Hands-on practitioners leading every client engagement.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {/* Founder 1: Rana ShaMeer */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#121316] text-[#D4AF37] px-3 py-1 text-xs font-bold uppercase tracking-wider dark:bg-white dark:text-[#121316]">
                    <Code2 className="h-3.5 w-3.5" />
                    <span>Technical Architecture</span>
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-[#121316] dark:text-white">
                    Rana ShaMeer
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
                    Founder & Technical Systems Architect
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#B8860B] font-bold text-xs uppercase text-center border border-[#D4AF37]/30 dark:text-[#E5B238]">
                  4 YRS EXP
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#2B2D33] dark:text-[#9CA3AF]">
                Rana brings <strong>4 years of industry experience</strong> specializing in cybersecurity, Next.js full-stack engineering, and high-speed web platforms. He oversees code quality, architecture scalability, and guarantees lifetime live support for every custom build.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Next.js App Router', 'TypeScript', 'Cybersecurity', 'API Systems'].map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-[#FBFBFA] border border-[#E5E7EB] px-2.5 py-1 text-[11px] font-semibold text-[#121316] dark:bg-[#121316] dark:border-[#2A2D34] dark:text-[#E5E7EB]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex items-center justify-between dark:border-[#2A2D34]">
                <span className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                  DG Khan, Pakistan to Global
                </span>
                <a
                  href="https://www.linkedin.com/in/rana-shameer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spatial-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold"
                >
                  <Linkedin className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            {/* Founder 2: Moiz Zaffer */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#121316] text-[#D4AF37] px-3 py-1 text-xs font-bold uppercase tracking-wider dark:bg-white dark:text-[#121316]">
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Growth & Operations</span>
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-[#121316] dark:text-white">
                    Moiz Zaffer
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
                    Co-Founder & Growth / Operations Director
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#B8860B] font-bold text-xs uppercase text-center border border-[#D4AF37]/30 dark:text-[#E5B238]">
                  4 YRS EXP
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#2B2D33] dark:text-[#9CA3AF]">
                Moiz has <strong>4 years of industry experience</strong> leading targeted organic Meta Facebook audience scaling and supervising virtual assistant operations across Shopify, WooCommerce, and Amazon.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Meta Organic Growth', 'Ecommerce VA', 'Shopify & Amazon', 'Community Scaling'].map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-[#FBFBFA] border border-[#E5E7EB] px-2.5 py-1 text-[11px] font-semibold text-[#121316] dark:bg-[#121316] dark:border-[#2A2D34] dark:text-[#E5E7EB]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex items-center justify-between dark:border-[#2A2D34]">
                <span className="text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
                  DG Khan, Pakistan to Global
                </span>
                <a
                  href="https://www.linkedin.com/in/moizkhan65/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spatial-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold"
                >
                  <Linkedin className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 5. DIRECT CALL TO ACTION ---------------- */}
      <section className="relative mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-white p-8 sm:p-12 lg:p-16 border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  <span>Start Your Project</span>
                </div>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#121316] sm:text-4xl dark:text-white">
                  Ready to build with a direct partner?
                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#2B2D33] dark:text-[#9CA3AF]">
                  Connect directly with Rana ShaMeer and Moiz Zaffer. We review your goals, examine your competitors, and construct an honest, transparent roadmap with lifetime live support.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/inquiry"
                    className="spatial-btn-primary inline-flex items-center gap-2"
                  >
                    <span>Submit Project Inquiry</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href="https://wa.me/15550192834"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spatial-btn-secondary inline-flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4 text-[#D4AF37]" />
                    <span>WhatsApp Direct Chat</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-[#E5E7EB] bg-[#FBFBFA] p-6 dark:border-[#2A2D34] dark:bg-[#121316]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] dark:text-white">
                    Direct Partner Lines
                  </h3>
                  <div className="mt-4 space-y-3.5 text-xs">
                    <div className="flex items-center gap-3 text-[#2B2D33] dark:text-[#E5E7EB]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
                        <Phone className="h-4 w-4" />
                      </div>
                      <span className="font-semibold">+1 (555) 019-2834</span>
                    </div>

                    <div className="flex items-center gap-3 text-[#2B2D33] dark:text-[#E5E7EB]">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#B8860B]">
                        <Mail className="h-4 w-4" />
                      </div>
                      <span className="font-semibold">contact@msenterprise.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
