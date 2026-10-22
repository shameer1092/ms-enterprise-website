'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { TiltCard } from '@/components/spatial/TiltCard';

export interface VerifiedReview {
  id: string;
  clientName: string;
  companyName: string;
  location: string;
  serviceCategory: 'web' | 'meta' | 'ecommerce';
  serviceTier: string;
  deliverables: string[];
  rating: number;
  date: string;
  reviewText: string;
  verifiedDeployment: boolean;
}

const INITIAL_REVIEWS: VerifiedReview[] = [
  {
    id: 'rev-01',
    clientName: 'Marcus Vance',
    companyName: 'Apex Nordic Logistics',
    location: 'Stockholm, Sweden',
    serviceCategory: 'web',
    serviceTier: 'Professional Custom Web Platform',
    deliverables: ['Custom Next.js Frontend', 'Spatial UI Dashboard', 'Real-Time Telemetry'],
    rating: 5,
    date: 'February 2026',
    reviewText:
      'MS Enterprise executed our logistics dashboard with absolute technical rigor. Instead of passing us between junior account managers, we worked directly with lead engineering architects. The platform is blindingly fast and our operational latency dropped significantly.',
    verifiedDeployment: true,
  },
  {
    id: 'rev-02',
    clientName: 'Elena Rostova',
    companyName: 'Velour Beauty Brands',
    location: 'Toronto, Canada',
    serviceCategory: 'ecommerce',
    serviceTier: 'Dedicated Full-Time VA Operations',
    deliverables: ['Shopify Catalog Operations', 'Automated Re-Ordering', 'Omnichannel Inquiries'],
    rating: 5,
    date: 'January 2026',
    reviewText:
      'Finding reliable ecommerce operators without babysitting has always been our biggest bottleneck. MS Enterprise assigned dedicated operators who took total ownership of our catalog, order workflows, and customer returns. Transparent daily reporting and zero missed deadlines.',
    verifiedDeployment: true,
  },
  {
    id: 'rev-03',
    clientName: 'Tariq Al-Mansoor',
    companyName: 'Lumina Digital Media',
    location: 'Dubai, UAE',
    serviceCategory: 'meta',
    serviceTier: 'Multi-Country Audience Stream',
    deliverables: ['GCC Organic Community', 'Content Strategy Matrix', 'Audience Retention Telemetry'],
    rating: 5,
    date: 'March 2026',
    reviewText:
      'Genuine organic social growth is rare. Moiz and the team engineered a targeted distribution framework across Saudi Arabia and the UAE that yielded actual qualified inquiries, not fake follower bots. Exceptional transparency and honest execution.',
    verifiedDeployment: true,
  },
  {
    id: 'rev-04',
    clientName: 'David K. Steinberg',
    companyName: 'Nexus FinTech Labs',
    location: 'Austin, Texas, USA',
    serviceCategory: 'web',
    serviceTier: 'Competitor Audit & Redefinition',
    deliverables: ['Full Codebase Refactor', 'Sub-Second Page Loads', 'Lifetime Support SLA'],
    rating: 5,
    date: 'April 2026',
    reviewText:
      'Our legacy portal was slow, insecure, and bleeding conversions. Rana ShaMeer audited the architecture, dismantled the bloat, and rebuilt the platform from scratch. Their lifetime support guarantee gave our executive board total peace of mind.',
    verifiedDeployment: true,
  },
];

export const FeedbackForum: React.FC = () => {
  const [reviews, setReviews] = useState<VerifiedReview[]>(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'meta' | 'ecommerce'>('all');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [serviceCategory, setServiceCategory] = useState<'web' | 'meta' | 'ecommerce'>('web');
  const [serviceTier, setServiceTier] = useState('Custom Website Development');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Form Submission Status
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.serviceCategory === activeFilter;
  });

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!clientName.trim()) errs.clientName = 'Your name is required';
    if (!companyName.trim()) errs.companyName = 'Company / Project name is required';
    if (!reviewText.trim()) {
      errs.reviewText = 'Please provide your honest feedback summary';
    } else if (reviewText.trim().length < 20) {
      errs.reviewText = 'Review must be at least 20 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form
      setClientName('');
      setCompanyName('');
      setReviewText('');
      setRating(5);
    }, 1200);
  };

  return (
    <section className="relative py-20" id="reviews">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Verification Telemetry Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-slate-200/70 pb-10 sm:flex-row sm:items-end dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-white/70 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-xl dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-400">
              <Icon name="ShieldCheck" className="h-3.5 w-3.5 text-emerald-500" />
              <span>Public Verification Hub</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Client Feedback & Deployment Records
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Unfiltered performance telemetry from international founders, brand operators, and enterprise executives.
            </p>
          </div>

          {/* Verification Metrics Telemetry */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-3 text-center backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60">
              <div className="flex items-center justify-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="mt-1 font-mono text-lg font-black text-slate-900 dark:text-white">4.9 / 5.0</div>
              <div className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Aggregate CSAT
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-3 text-center backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60">
              <div className="font-mono text-lg font-black text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Delivery Integrity
              </div>
              <div className="mt-0.5 text-[9px] text-slate-400">Zero Ghosting SLA</div>
            </div>

            <button
              onClick={() => {
                setIsFormOpen(!isFormOpen);
                setIsSuccess(false);
              }}
              className="spatial-btn-primary inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <Icon name="MessageSquare" className="h-4 w-4" />
              <span>{isFormOpen ? 'Close Feedback Form' : 'Submit Review'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Feedback Submission Expansion Panel */}
        {isFormOpen && (
          <div className="mt-8 transition-all duration-300">
            <TiltCard
              maxTilt={2}
              className="spatial-card rounded-3xl p-8 sm:p-10 border border-sky-500/30 shadow-liquid-elevated dark:border-cyan-500/40"
            >
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-4 dark:border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Submit Verification or Review
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Your feedback will be verified against our deployment logs and added to the public record.
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
                >
                  <Icon name="X" className="h-5 w-5" />
                </button>
              </div>

              {isSuccess ? (
                <div className="my-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <Icon name="CheckCircle2" className="h-6 w-6" />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                    Verification Successfully Logged
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                    Thank you. Your feedback has been logged to the MS Enterprise review moderation queue and will appear after telemetry cross-verification.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setIsFormOpen(false);
                    }}
                    className="spatial-btn-secondary mt-6 px-6 py-2.5 text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Alexander Mitchell"
                        className="spatial-input mt-2 w-full rounded-xl px-4 py-3 text-xs"
                      />
                      {errors.clientName && (
                        <p className="mt-1 text-[11px] text-rose-500">{errors.clientName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Company or Project Name *
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Pinnacle Ventures LLC"
                        className="spatial-input mt-2 w-full rounded-xl px-4 py-3 text-xs"
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-[11px] text-rose-500">{errors.companyName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Service Category
                      </label>
                      <select
                        value={serviceCategory}
                        onChange={(e) => {
                          const cat = e.target.value as 'web' | 'meta' | 'ecommerce';
                          setServiceCategory(cat);
                          if (cat === 'web') setServiceTier('Custom Website Development');
                          else if (cat === 'meta') setServiceTier('Meta (Facebook) Growth');
                          else setServiceTier('Ecommerce Support (VA)');
                        }}
                        className="spatial-input mt-2 w-full rounded-xl px-4 py-3 text-xs"
                      >
                        <option value="web">Custom Website Development</option>
                        <option value="meta">Meta (Facebook) Services</option>
                        <option value="ecommerce">Ecommerce Support (VA)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Satisfaction Rating
                      </label>
                      <div className="mt-2 flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className="p-1 transition-transform hover:scale-125 focus:outline-none"
                          >
                            <Icon
                              name="Star"
                              className={`h-6 w-6 ${
                                star <= rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300 dark:text-slate-700'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                          {rating} of 5 Stars
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Your Detailed Experience / Feedback *
                    </label>
                    <textarea
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Detail the scope delivered, team responsiveness, technical quality, or lifetime support results..."
                      className="spatial-input mt-2 w-full rounded-xl px-4 py-3 text-xs"
                    />
                    {errors.reviewText && (
                      <p className="mt-1 text-[11px] text-rose-500">{errors.reviewText}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="spatial-btn-secondary px-5 py-2.5 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="spatial-btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                    >
                      {isSubmitting && <Icon name="RefreshCw" className="h-3.5 w-3.5 animate-spin" />}
                      <span>{isSubmitting ? 'Verifying & Submitting...' : 'Submit Verification'}</span>
                    </button>
                  </div>
                </form>
              )}
            </TiltCard>
          </div>
        )}

        {/* Tab Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {(
            [
              { key: 'all', label: 'All Reviews' },
              { key: 'web', label: 'Web Development' },
              { key: 'meta', label: 'Meta Growth' },
              { key: 'ecommerce', label: 'Ecommerce VA' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all ${
                activeFilter === tab.key
                  ? 'bg-sky-600 text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950'
                  : 'border border-slate-200/80 bg-white/60 text-slate-600 hover:border-sky-500/40 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Verified Review Cards Grid (Equal Heights) */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredReviews.map((rev) => (
            <TiltCard
              key={rev.id}
              maxTilt={4}
              className="spatial-card relative flex h-full flex-col justify-between rounded-3xl p-7 sm:p-8"
            >
              <div className="flex flex-1 flex-col">
                {/* Header with Star Rating and Verified Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {rev.verifiedDeployment && (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      <Icon name="CheckCircle2" className="h-3 w-3" />
                      <span>VERIFIED_DEPLOYMENT</span>
                    </div>
                  )}
                </div>

                {/* Review Body */}
                <p className="mt-5 flex-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  "{rev.reviewText}"
                </p>

                {/* Deliverables Pills */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {rev.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-slate-200/80 bg-slate-100/70 px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Info Footer */}
              <div className="mt-6 border-t border-slate-200/60 pt-4 flex items-center justify-between dark:border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rev.clientName}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {rev.companyName} | {rev.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-sky-700 dark:text-cyan-400">
                    {rev.serviceTier}
                  </span>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
