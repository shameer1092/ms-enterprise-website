'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiteSettings, ServiceItem } from '@/types';
import { Logo } from '@/components/common/Logo';
import { Icon } from '@/components/common/Icon';

interface FooterProps {
  settings: SiteSettings;
  services: ServiceItem[];
}

export const Footer: React.FC<FooterProps> = ({ settings, services }) => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide public footer on all admin portal routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative mt-24 border-t border-slate-200/80 bg-white/70 backdrop-blur-2xl pt-16 pb-12 shadow-liquid-card dark:border-white/10 dark:bg-[#080A0E]/85 dark:shadow-none">
      {/* Top Specular Glow Line */}
      <div className="absolute top-0 left-1/2 h-[1px] w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/40 to-transparent dark:via-cyan-400/40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Brand & Overview (Spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            <Logo companyName={settings.companyName} size="lg" />
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {settings.description}
            </p>

            {/* Apple Liquid Glass Pill Social Links */}
            <div className="mt-6 flex items-center gap-2.5">
              {settings.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-slate-200/80 text-slate-600 transition-all hover:border-sky-500/40 hover:bg-sky-50 hover:text-sky-700 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-500/40 dark:hover:bg-cyan-500/15 dark:hover:text-cyan-300 dark:shadow-none"
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-slate-200/80 text-slate-600 transition-all hover:border-sky-500/40 hover:bg-sky-50 hover:text-sky-700 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-500/40 dark:hover:bg-cyan-500/15 dark:hover:text-cyan-300 dark:shadow-none"
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-slate-200/80 text-slate-600 transition-all hover:border-sky-500/40 hover:bg-sky-50 hover:text-sky-700 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-500/40 dark:hover:bg-cyan-500/15 dark:hover:text-cyan-300 dark:shadow-none"
                >
                  <Icon name="ExternalLink" className="h-4 w-4" />
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-slate-200/80 text-slate-600 transition-all hover:border-sky-500/40 hover:bg-sky-50 hover:text-sky-700 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-500/40 dark:hover:bg-cyan-500/15 dark:hover:text-cyan-300 dark:shadow-none"
                >
                  <Icon name="Layers" className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Company Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              {services.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-400 dark:hover:text-cyan-300"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/plans"
                  className="text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-400 dark:hover:text-cyan-300"
                >
                  Service Plans & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-400 dark:hover:text-cyan-300"
                >
                  About Our Company
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-400 dark:hover:text-cyan-300"
                >
                  Selected Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-400 dark:hover:text-cyan-300"
                >
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/inquiry"
                  className="text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-400 dark:hover:text-cyan-300"
                >
                  Start Project Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Direct Contact
            </h3>
            <ul className="mt-4 space-y-3 text-xs">
              <li>
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-sky-700 dark:text-slate-400 dark:hover:text-cyan-300"
                >
                  <Icon name="Phone" className="h-3.5 w-3.5 text-sky-600 dark:text-cyan-400 shrink-0" />
                  <span>{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-sky-700 dark:text-slate-400 dark:hover:text-cyan-300"
                >
                  <Icon name="Mail" className="h-3.5 w-3.5 text-sky-600 dark:text-cyan-400 shrink-0" />
                  <span className="truncate">{settings.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-300"
                >
                  <Icon name="MessageSquare" className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>WhatsApp Direct</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {settings.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright Line */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/60 pt-8 text-xs text-slate-500 sm:flex-row dark:border-white/10 dark:text-slate-400">
          <p>
            Copyright {currentYear} {settings.companyName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/legal/privacy-policy"
              className="transition-colors hover:text-slate-900 dark:hover:text-slate-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms-of-service"
              className="transition-colors hover:text-slate-900 dark:hover:text-slate-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/refund-policy"
              className="transition-colors hover:text-slate-900 dark:hover:text-slate-300"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
