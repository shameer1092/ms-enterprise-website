'use client';

import React from 'react';
import Link from 'next/link';
import { SiteSettings, ServiceItem } from '@/types';
import { Logo } from '@/components/common/Logo';
import {
  Code2,
  Share2,
  ShoppingBag,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  services: ServiceItem[];
}

export const Footer: React.FC<FooterProps> = ({ settings, services }) => {
  const currentYear = new Date().getFullYear();
  const cleanPhone = settings.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="relative mt-24 border-t border-[#E5E7EB] bg-white pt-16 pb-12 dark:border-[#2A2D34] dark:bg-[#121316]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Brand & Regional Roots (Spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            <Logo companyName={settings.companyName} size="lg" />
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
              We build fast, bespoke web platforms and scale online stores with organic Meta traffic and dedicated virtual assistant operations. No agency bloat, just direct developer execution.
            </p>

            {/* Regional Origin Pill Badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#FBFBFA] px-3.5 py-1 text-[11px] font-bold text-[#121316] dark:bg-[#1E2024] dark:text-[#E5E7EB] dark:border-[#2A2D34]">
              <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Founded in 2026 • DG Khan, Punjab, Pakistan</span>
            </div>

            {/* Founders Quick Link */}
            <div className="mt-5 text-xs text-[#6B7280] dark:text-[#9CA3AF] space-y-1">
              <div>
                <strong className="text-[#121316] dark:text-white">Rana ShaMeer</strong> — Founder & Technical Architect (4 yrs exp)
              </div>
              <div>
                <strong className="text-[#121316] dark:text-white">Moiz Zaffer</strong> — Co-Founder & Growth Director (4 yrs exp)
              </div>
            </div>

            {/* LinkedIn Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/rana-shameer/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#FBFBFA] px-3 py-1.5 text-xs font-semibold text-[#121316] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] dark:bg-[#1E2024] dark:border-[#2A2D34] dark:text-[#E5E7EB]"
              >
                <Linkedin className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Rana ShaMeer</span>
              </a>

              <a
                href="https://www.linkedin.com/in/moizkhan65/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#FBFBFA] px-3 py-1.5 text-xs font-semibold text-[#121316] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] dark:bg-[#1E2024] dark:border-[#2A2D34] dark:text-[#E5E7EB]"
              >
                <Linkedin className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Moiz Zaffer</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] dark:text-white">
              Core Capabilities
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              {services.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="text-[#6B7280] transition-colors hover:text-[#D4AF37] dark:text-[#9CA3AF] dark:hover:text-[#D4AF37]"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/plans"
                  className="text-[#6B7280] transition-colors hover:text-[#D4AF37] dark:text-[#9CA3AF] dark:hover:text-[#D4AF37]"
                >
                  Plans & Transparent Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] dark:text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link
                  href="/about"
                  className="text-[#6B7280] transition-colors hover:text-[#D4AF37] dark:text-[#9CA3AF] dark:hover:text-[#D4AF37]"
                >
                  About Our Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-[#6B7280] transition-colors hover:text-[#D4AF37] dark:text-[#9CA3AF] dark:hover:text-[#D4AF37]"
                >
                  Selected Work
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[#6B7280] transition-colors hover:text-[#D4AF37] dark:text-[#9CA3AF] dark:hover:text-[#D4AF37]"
                >
                  Partner FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/inquiry"
                  className="font-bold text-[#D4AF37] hover:text-[#B8860B] transition-colors inline-flex items-center gap-1"
                >
                  <span>Start an Inquiry</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Connection */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] dark:text-white">
              Direct Contact
            </h3>
            <ul className="mt-4 space-y-3 text-xs">
              <li>
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center gap-2 text-[#6B7280] hover:text-[#D4AF37] dark:text-[#9CA3AF] dark:hover:text-[#D4AF37]"
                >
                  <Phone className="h-3.5 w-3.5 text-[#D4AF37] shrink-0" />
                  <span>{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 text-[#6B7280] hover:text-[#D4AF37] dark:text-[#9CA3AF] dark:hover:text-[#D4AF37]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#D4AF37] shrink-0" />
                  <span className="truncate">{settings.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${cleanWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#6B7280] hover:text-emerald-600 dark:text-[#9CA3AF] dark:hover:text-emerald-400"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>WhatsApp Direct Chat</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="block text-[11px] text-[#6B7280] leading-relaxed dark:text-[#9CA3AF]">
                  Dera Ghazi Khan, Punjab, Pakistan to Worldwide Partners
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright Line */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E5E7EB] pt-8 text-xs text-[#6B7280] sm:flex-row dark:border-[#2A2D34] dark:text-[#9CA3AF]">
          <p>
            &copy; {currentYear} {settings.companyName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/legal/privacy-policy"
              className="transition-colors hover:text-[#121316] dark:hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms-of-service"
              className="transition-colors hover:text-[#121316] dark:hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/refund-policy"
              className="transition-colors hover:text-[#121316] dark:hover:text-white"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
