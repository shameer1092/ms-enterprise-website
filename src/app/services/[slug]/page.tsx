import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getServices, getPlans, getSettings } from '@/lib/db';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const services = getServices(true);
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} | MS Enterprise`,
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

  return (
    <div className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Badge */}
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Link href="/" className="hover:text-cyan-400">
              Home
            </Link>
            <Icon name="ChevronRight" className="h-3.5 w-3.5 text-slate-600" />
            <Link href="/services" className="hover:text-cyan-400">
              Services
            </Link>
            <Icon name="ChevronRight" className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-cyan-400">{service.title}</span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              {service.badge}
            </span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400 capitalize">
              Category: {service.category}
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
            {service.summary}
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Full Description & Features */}
          <div className="lg:col-span-8">
            <div className="spatial-card rounded-3xl p-8 sm:p-10 shadow-spatial-card">
              <h2 className="text-2xl font-bold text-white">Service Overview & Engineering Approach</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300 whitespace-pre-line">
                {service.description}
              </p>

              {/* Highlights List */}
              <div className="mt-8 border-t border-white/10 pt-8">
                <h3 className="text-base font-bold text-white">What We Deliver</h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30">
                        <Icon name="Check" className="h-3 w-3" />
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
                <h2 className="text-xl font-bold text-white">Key Capabilities & Standards</h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="spatial-card rounded-3xl p-6 sm:p-7 shadow-spatial-card">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/25">
                        <Icon name="Zap" className="h-4 w-4" />
                      </div>
                      <h3 className="mt-4 text-base font-bold text-white">{feat.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-400">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Section based on category */}
            {service.category === 'web' && (
              <div className="spatial-card mt-10 rounded-3xl border border-cyan-500/30 p-7 shadow-spatial-card">
                <h3 className="text-base font-bold text-white">Competitor Redesign & Redefinition</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  When rebuilding an existing site, we avoid surface-level facelifts. We study what competitors in your field do, validate the key conversion points that actually function, remove legacy baggage, and reconstruct your platform according to your exact satisfaction.
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-cyan-300">
                  <span className="flex items-center gap-1.5">
                    <Icon name="CheckCircle2" className="h-4 w-4" /> Lifetime Live Support
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="CheckCircle2" className="h-4 w-4" /> Low Monthly Maintenance
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="CheckCircle2" className="h-4 w-4" /> Deployment Diagnostics Solved
                  </span>
                </div>
              </div>
            )}

            {service.category === 'meta' && (
              <div className="spatial-card mt-10 rounded-3xl border border-cyan-500/30 p-7 shadow-spatial-card">
                <h3 className="text-base font-bold text-white">Geo-Targeted Audience Acquisition</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  We supply organic Facebook page followers and engagement traffic from multiple countries according to your client demand. Everything is cultivated organically without fake profiles or synthetic manipulation.
                </p>
              </div>
            )}

            {service.category === 'ecommerce' && (
              <div className="spatial-card mt-10 rounded-3xl border border-emerald-500/30 p-7 shadow-spatial-card">
                <h3 className="text-base font-bold text-white">Supported Platforms & Delay Compensation</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  We manage stores on Shopify, WooCommerce, Amazon, eBay, and custom commerce backends. Our work is authentic, honest, and reliable. If an unavoidable situation or natural emergency causes a delay, we apologize openly and compensate as much as possible.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Inquiry Card & Direct Action */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="spatial-card rounded-3xl p-7 shadow-spatial-card">
                <h3 className="text-lg font-bold text-white">Inquire About This Service</h3>
                <p className="mt-2 text-xs text-slate-400">
                  Contact our engineering team to review scope, timelines, or ask questions directly.
                </p>

                <div className="mt-6 space-y-3">
                  <Link
                    href={`/inquiry?service=${service.slug}`}
                    className="spatial-btn-primary flex w-full items-center justify-center gap-2 py-3 text-center text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Request an Inquiry</span>
                    <Icon name="ArrowRight" className="h-4 w-4" />
                  </Link>

                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20MS%20Enterprise,%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spatial-btn-secondary flex w-full items-center justify-center gap-2 py-3 text-center text-xs font-semibold"
                  >
                    <Icon name="MessageSquare" className="h-4 w-4 text-emerald-400" />
                    <span>WhatsApp Direct Chat</span>
                  </a>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
                  <p>Guaranteed response within 24 hours.</p>
                </div>
              </div>

              {/* Direct phone/email card */}
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Direct Line
                </h4>
                <div className="mt-3 space-y-2.5 text-xs">
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-2 text-slate-300 hover:text-cyan-300"
                  >
                    <Icon name="Phone" className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{settings.phone}</span>
                  </a>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-2 text-slate-300 hover:text-cyan-300"
                  >
                    <Icon name="Mail" className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{settings.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Plans Section */}
        {relatedPlans.length > 0 && (
          <div className="mt-24 border-t border-white/10 pt-16">
            <div className="text-center">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Service Packages
              </h2>
              <p className="mt-2 text-3xl font-bold text-white">Available Plans for {service.title}</p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPlans.map((plan) => (
                <TiltCard
                  key={plan.id}
                  maxTilt={6}
                  glowColor={plan.isPopular ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.08)'}
                  className={`spatial-card relative flex h-full flex-col justify-between rounded-3xl p-8 ${
                    plan.isPopular ? 'border-cyan-500/50 shadow-glow-cyan ring-1 ring-cyan-400/30' : ''
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="mt-2 text-xs text-slate-400">{plan.description}</p>
                    <div className="mt-5 flex items-baseline gap-2 border-b border-white/10 pb-5">
                      <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                      <span className="text-xs text-slate-400">/ {plan.billingPeriod}</span>
                    </div>

                    <ul className="mt-5 space-y-3 text-xs text-slate-300">
                      {plan.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Icon name="Check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      href={plan.ctaLink}
                      className={`block w-full py-3 text-center text-xs font-bold uppercase tracking-wider transition-all ${
                        plan.isPopular ? 'spatial-btn-primary' : 'spatial-btn-secondary'
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
