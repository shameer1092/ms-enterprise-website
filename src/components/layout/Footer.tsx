import React from 'react';
import Link from 'next/link';
import { SiteSettings, ServiceItem } from '@/types';
import { Logo } from '@/components/common/Logo';
import { Icon } from '@/components/common/Icon';

interface FooterProps {
  settings: SiteSettings;
  services: ServiceItem[];
}

export const Footer: React.FC<FooterProps> = ({ settings, services }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#080A0E]/90 backdrop-blur-2xl pt-16 pb-12">
      {/* Top Specular Glow Line */}
      <div className="absolute top-0 left-1/2 h-[1px] w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Brand & Overview (Spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            <Logo companyName={settings.companyName} />
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400">
              {settings.description}
            </p>

            {/* visionOS Pill Social Links */}
            <div className="mt-6 flex items-center gap-2.5">
              {settings.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/15 hover:text-cyan-300"
                >
                  <Icon name="Share2" className="h-4 w-4" />
                </a>
              )}
              {settings.socialLinks.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter Profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/15 hover:text-cyan-300"
                >
                  <Icon name="Globe" className="h-4 w-4" />
                </a>
              )}
              {settings.socialLinks.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/15 hover:text-cyan-300"
                >
                  <Icon name="ExternalLink" className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Company Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              {services.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="text-slate-400 transition-colors hover:text-cyan-300"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/plans"
                  className="text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Service Plans & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="text-slate-400 transition-colors hover:text-cyan-300">
                  About Our Team
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 transition-colors hover:text-cyan-300">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-slate-400 transition-colors hover:text-cyan-300">
                  Project Inquiry
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms-of-service"
                  className="text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/refund-policy"
                  className="text-slate-400 transition-colors hover:text-cyan-300"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Info */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Direct Contact
            </h3>
            <ul className="mt-4 space-y-3 text-xs">
              <li>
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="group flex items-center gap-2.5 text-slate-400 transition-colors hover:text-cyan-300"
                >
                  <Icon name="Phone" className="h-4 w-4 text-cyan-400/80 group-hover:text-cyan-300" />
                  <span>{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="group flex items-center gap-2.5 text-slate-400 transition-colors hover:text-cyan-300"
                >
                  <Icon name="Mail" className="h-4 w-4 text-cyan-400/80 group-hover:text-cyan-300" />
                  <span>{settings.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-slate-400 transition-colors hover:text-emerald-300"
                >
                  <Icon name="MessageSquare" className="h-4 w-4 text-emerald-400/80 group-hover:text-emerald-300" />
                  <span>WhatsApp Live Chat</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <Icon name="MapPin" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <span>{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Dynamic Current Year */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            Copyright {currentYear} {settings.companyName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="transition-colors hover:text-slate-300">
              Admin Portal
            </Link>
            <Link href="/legal/privacy-policy" className="transition-colors hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/legal/terms-of-service" className="transition-colors hover:text-slate-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
