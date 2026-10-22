'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/common/Icon';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What does "Lifetime Live Support" include for custom websites?',
    answer: 'Lifetime live support means you can always contact our technical team if your delivered website experiences unexpected technical bugs, server misconfigurations, or operational questions related to the original delivered code. We troubleshoot and resolve code bugs introduced under the original scope at no extra charge.',
    category: 'web',
  },
  {
    id: 'faq-2',
    question: 'How do you handle website redesigns?',
    answer: 'We analyze your existing website alongside top competitor platforms in your industry. We identify what works effectively, diagnose why visitors drop off, and reconstruct the website with modern code, improved navigation, and faster loading speeds according to your satisfaction.',
    category: 'web',
  },
  {
    id: 'faq-3',
    question: 'How do you generate audience traffic for Meta (Facebook) pages?',
    answer: 'We generate genuine audience traffic using organic strategies tailored to your target countries. We do not use fake bot accounts or artificial engagement. We align content strategy, relevant community engagement, and distribution to build a real audience.',
    category: 'meta',
  },
  {
    id: 'faq-4',
    question: 'What platforms can your Ecommerce Virtual Assistants handle?',
    answer: 'Our virtual assistants operate across any platform your business uses, including Shopify, WooCommerce, Amazon Seller Central, eBay, BigCommerce, or custom administrative dashboards. We handle product listings, inventory sync, order fulfillment, and customer inquiries.',
    category: 'ecommerce',
  },
  {
    id: 'faq-5',
    question: 'What is your policy if an unexpected delay occurs?',
    answer: 'Authenticity is our core rule. If an unavoidable emergency or severe natural situation causes a delay in your project or VA schedule, we immediately inform you, apologize openly, and provide proportional compensation such as extra service hours or bill adjustments.',
    category: 'general',
  },
  {
    id: 'faq-6',
    question: 'What are your monthly maintenance charges for websites?',
    answer: 'We keep our monthly maintenance charges very low. It covers server uptime monitoring, security patches, library updates, and regular database backups so your website remains fast and stable without unexpected expenses.',
    category: 'pricing',
  },
  {
    id: 'faq-7',
    question: 'How long does a typical custom website build take?',
    answer: 'A standard custom business website typically requires 2 to 3 weeks from architectural signoff to final deployment. Comprehensive ecommerce platforms or competitor audit redesigns take 3 to 5 weeks depending on custom integrations.',
    category: 'web',
  },
  {
    id: 'faq-8',
    question: 'Can I request audience traffic from specific countries for Meta pages?',
    answer: 'Yes, absolutely. When initiating a Meta growth package, you specify your target geographical regions (e.g. USA, UK, Canada, Australia, UAE, or regional markets), and our organic strategy focuses explicitly on those territories.',
    category: 'meta',
  },
];

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-1': true });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = initialFaqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesQuery =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="relative py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
            <Icon name="HelpCircle" className="h-3.5 w-3.5" />
            <span>Help & Clarification</span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Transparent answers regarding development timelines, lifetime live support, Meta growth, and ecommerce VA operations.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Icon
              name="Search"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full rounded-full border border-slate-200/80 bg-white/70 py-3 pl-11 pr-5 text-xs text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-xl focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/15 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'web', label: 'Web Dev' },
              { id: 'meta', label: 'Meta' },
              { id: 'ecommerce', label: 'Ecommerce VA' },
              { id: 'pricing', label: 'Pricing & Support' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-sky-600 text-white shadow-sm dark:bg-gradient-to-r dark:from-blue-600 dark:to-cyan-500 dark:shadow-md'
                    : 'bg-white/70 border border-slate-200/80 text-slate-700 hover:bg-white dark:bg-white/5 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-10 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="spatial-card rounded-3xl p-12 text-center shadow-liquid-card dark:shadow-spatial-card">
              <Icon name="HelpCircle" className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                No matching questions found for &quot;{searchQuery}&quot;.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="spatial-card overflow-hidden rounded-3xl transition-all shadow-liquid-card dark:shadow-spatial-card"
                >
                  <button
                    type="button"
                    onClick={() => toggleOpen(faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-6 sm:p-7 text-left"
                  >
                    <span className="text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
                      {faq.question}
                    </span>
                    <div className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 border border-slate-200/70 text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-cyan-300">
                      <Icon
                        name="ChevronDown"
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-sky-600 dark:text-cyan-400' : 'text-slate-400'
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-200/60 px-6 pt-3 pb-6 text-sm leading-relaxed text-slate-600 dark:border-white/5 dark:text-slate-300">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="spatial-card mt-16 rounded-4xl border border-sky-500/25 p-8 sm:p-10 text-center shadow-liquid-card dark:border-cyan-500/30 dark:shadow-spatial-card">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Still have questions?</h2>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
            We are always available to discuss technical specs or answer any questions before you start.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/inquiry"
              className="spatial-btn-primary px-6 py-3 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              Ask an Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
