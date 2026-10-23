import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getServices, getPlans, getSettings } from '@/lib/db';
import { Icon } from '@/components/common/Icon';
import {
  ChevronRight,
  CheckCircle2,
  Check,
  Zap,
  ArrowRight,
  MessageSquare,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.title} | MS Enterprise Services`,
    description: service.summary,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service || !service.published) {
    notFound();
  }

  const allPlans = getPlans();
  const relatedPlans = allPlans.filter(
    (p) => p.serviceCategory === service.category || p.serviceCategory === 'all'
  );
  const settings = getSettings();
  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="relative py-16 md:py-24 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Badge */}
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280] dark:text-[#9CA3AF]">
            <Link href="/" className="hover:text-[#D4AF37]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#E5E7EB]" />
            <Link href="/services" className="hover:text-[#D4AF37]">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#E5E7EB]" />
            <span className="text-[#D4AF37] font-bold">{service.title}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
              {service.badge}
            </span>
            <span className="rounded-full bg-[#FBFBFA] border border-[#E5E7EB] px-3 py-1 text-xs font-semibold text-[#121316] capitalize dark:bg-[#1E2024] dark:border-[#2A2D34] dark:text-[#E5E7EB]">
              Category: {service.category}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#121316] sm:text-5xl lg:text-6xl dark:text-white">
            {service.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#2B2D33] sm:text-lg dark:text-[#E5E7EB]">
            {service.summary}
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Full Description & Features */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
              <h2 className="text-2xl font-bold text-[#121316] dark:text-white">
                Service Overview & The Partner Standard
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#2B2D33] whitespace-pre-line dark:text-[#9CA3AF]">
                {service.description}
              </p>

              {/* Highlights List */}
              <div className="mt-8 border-t border-[#E5E7EB] pt-8 dark:border-[#2A2D34]">
                <h3 className="text-base font-bold text-[#121316] dark:text-white">
                  What We Guarantee & Deliver
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-[#2B2D33] dark:text-[#E5E7EB]"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#E5B238]">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Structured Features / Modules */}
            {service.features && service.features.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-[#121316] dark:text-white">
                  Key Capabilities & Execution Pillars
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="partner-card rounded-3xl bg-white p-6 sm:p-7 border border-[#E5E7EB] dark:bg-[#1E2024] dark:border-[#2A2D34]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#121316] text-[#D4AF37] dark:bg-white dark:text-[#121316]">
                        <Zap className="h-4 w-4" />
                      </div>
                      <h3 className="mt-4 text-base font-bold text-[#121316] dark:text-white">{feat.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Callout */}
            <div className="partner-card mt-10 rounded-3xl border-2 border-[#121316] p-7 bg-white dark:bg-[#1E2024] dark:border-[#D4AF37]">
              <h3 className="text-base font-bold text-[#121316] dark:text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
                <span>The Direct Architect Guarantee</span>
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#2B2D33] dark:text-[#9CA3AF]">
                When you initiate a project with MS Enterprise, you work directly with core leads Rana ShaMeer and Moiz Zaffer. No account managers, no relay games. We guarantee low monthly maintenance, robust security, and lifetime live support.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-3xl bg-white p-7 border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
                <h3 className="text-lg font-bold text-[#121316] dark:text-white">
                  Inquire About This Service
                </h3>
                <p className="mt-2 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  Direct consultation with our engineering and growth leads to review scope, timelines, or competitor benchmarks.
                </p>

                <div className="mt-6 space-y-3">
                  <Link
                    href={`/inquiry?service=${service.slug}`}
                    className="spatial-btn-primary flex w-full items-center justify-center gap-2 py-3 text-center text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=Hello%20MS%20Enterprise,%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spatial-btn-secondary flex w-full items-center justify-center gap-2 py-3 text-center text-xs font-semibold"
                  >
                    <MessageSquare className="h-4 w-4 text-[#D4AF37]" />
                    <span>WhatsApp Quick Chat</span>
                  </a>
                </div>

                <div className="mt-6 border-t border-[#E5E7EB] pt-4 text-xs text-[#6B7280] dark:border-[#2A2D34] dark:text-[#9CA3AF]">
                  <p>Direct reply within 4 to 12 hours.</p>
                </div>
              </div>

              {/* Direct phone/email card */}
              <div className="rounded-3xl border border-[#E5E7EB] bg-[#FBFBFA] p-6 dark:border-[#2A2D34] dark:bg-[#121316]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#121316] dark:text-white">
                  Direct Line
                </h4>
                <div className="mt-3 space-y-2.5 text-xs">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="flex items-center gap-2 text-[#2B2D33] hover:text-[#D4AF37] dark:text-[#E5E7EB]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span className="font-semibold">{settings.phone}</span>
                  </a>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-2 text-[#2B2D33] hover:text-[#D4AF37] dark:text-[#E5E7EB]"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span className="font-semibold">{settings.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Plans Section */}
        {relatedPlans.length > 0 && (
          <div className="mt-24 border-t border-[#E5E7EB] pt-16 dark:border-[#2A2D34]">
            <div className="text-center">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
                Transparent Packages
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-[#121316] dark:text-white">
                Available Plans for {service.title}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`partner-card relative flex h-full flex-col justify-between rounded-3xl p-8 bg-white border ${
                    plan.isPopular
                      ? 'border-2 border-[#121316] shadow-partner-card dark:border-[#D4AF37]'
                      : 'border-[#E5E7EB] dark:border-[#2A2D34]'
                  } dark:bg-[#1E2024]`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 right-6 rounded-full bg-[#D4AF37] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#121316] shadow-sm">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-[#121316] dark:text-white">{plan.name}</h3>
                    <p className="mt-2 text-xs text-[#6B7280] dark:text-[#9CA3AF]">{plan.description}</p>
                    <div className="mt-5 flex items-baseline gap-2 border-b border-[#E5E7EB] pb-5 dark:border-[#2A2D34]">
                      <span className="text-4xl font-extrabold text-[#121316] dark:text-white">{plan.price}</span>
                      <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">/ {plan.billingPeriod}</span>
                    </div>

                    <ul className="mt-5 space-y-3 text-xs text-[#2B2D33] dark:text-[#E5E7EB]">
                      {plan.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      href={plan.ctaLink}
                      className={`block w-full py-3 text-center text-xs font-bold uppercase tracking-wider ${
                        plan.isPopular ? 'spatial-btn-primary' : 'spatial-btn-secondary'
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
