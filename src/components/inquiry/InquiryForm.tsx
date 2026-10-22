'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@/components/common/Icon';

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  websiteHoneypot: string; // Honeypot field for anti-spam
}

export const InquiryForm: React.FC = () => {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service') || '';
  const planParam = searchParams.get('plan') || '';

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: serviceParam ? `Service: ${serviceParam}` : '',
    budget: '',
    timeline: '',
    message: planParam ? `Interested in the plan: ${planParam}.\n\n` : '',
    websiteHoneypot: '',
  });

  useEffect(() => {
    if (serviceParam || planParam) {
      setFormData((prev) => ({
        ...prev,
        service: serviceParam || prev.service,
        message: planParam
          ? `Inquiry regarding the ${planParam} plan.\n\nAdditional requirements:\n`
          : prev.message,
      }));
    }
  }, [serviceParam, planParam]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please provide a valid email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format (e.g. name@company.com).';
    }

    if (!formData.service) {
      errs.service = 'Please select a service category.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide details about your project (at least 15 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Honeypot check for bots
    if (formData.websiteHoneypot) {
      setSuccess(true);
      return;
    }

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message.trim(),
          honeypot: formData.websiteHoneypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        timeline: '',
        message: '',
        websiteHoneypot: '',
      });
      setErrors({});
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="spatial-card rounded-3xl p-8 sm:p-12 text-center shadow-liquid-card dark:shadow-spatial-card">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Icon name="CheckCircle2" className="h-8 w-8" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Inquiry Received Successfully</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Thank you for reaching out to MS Enterprise. Your project details have been logged in our system and routed to our team. We review all inquiries carefully and will respond to your email within 24 hours.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="spatial-btn-secondary rounded-full px-5 py-2.5 text-xs font-semibold"
          >
            Submit Another Inquiry
          </button>
          <a
            href="https://wa.me/15550192834"
            target="_blank"
            rel="noopener noreferrer"
            className="spatial-btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold shadow-sm"
          >
            <Icon name="MessageSquare" className="h-4 w-4" />
            <span>Open WhatsApp Live Chat</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="spatial-card rounded-3xl p-6 sm:p-10 shadow-liquid-card dark:shadow-spatial-card">
      {/* Honeypot field (hidden from legitimate users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="websiteHoneypot">Leave this empty</label>
        <input
          id="websiteHoneypot"
          type="text"
          value={formData.websiteHoneypot}
          onChange={(e) => setFormData({ ...formData, websiteHoneypot: e.target.value })}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errorMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-50 p-4 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300">
          <Icon name="AlertCircle" className="h-4 w-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Full Name <span className="text-sky-600 dark:text-cyan-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            placeholder="John Smith"
            className={`mt-2 w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500 ${
              errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300/80 focus:border-sky-500 focus:ring-sky-500 dark:border-white/10 dark:focus:border-cyan-400 dark:focus:ring-cyan-400'
            }`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Business Email <span className="text-sky-600 dark:text-cyan-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="john@company.com"
            className={`mt-2 w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500 ${
              errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300/80 focus:border-sky-500 focus:ring-sky-500 dark:border-white/10 dark:focus:border-cyan-400 dark:focus:ring-cyan-400'
            }`}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Phone / WhatsApp Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400"
          />
        </div>

        {/* Service Category */}
        <div>
          <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Primary Service <span className="text-sky-600 dark:text-cyan-400">*</span>
          </label>
          <select
            id="service"
            required
            value={formData.service}
            onChange={(e) => {
              setFormData({ ...formData, service: e.target.value });
              if (errors.service) setErrors({ ...errors, service: '' });
            }}
            className={`mt-2 w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-1 dark:bg-slate-900 dark:text-white ${
              errors.service
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300/80 focus:border-sky-500 focus:ring-sky-500 dark:border-white/10 dark:focus:border-cyan-400 dark:focus:ring-cyan-400'
            }`}
          >
            <option value="">Select a service category...</option>
            <option value="Custom Website Development">Custom Website Development</option>
            <option value="Website Redesign & Competitor Audit">Website Redesign & Competitor Audit</option>
            <option value="Ecommerce Portal Development">Ecommerce Portal Development</option>
            <option value="Meta (Facebook) Growth Services">Meta (Facebook) Growth Services</option>
            <option value="Ecommerce Support (Virtual Assistant)">Ecommerce Support (Virtual Assistant)</option>
            <option value="Monthly Maintenance & Stability">Monthly Maintenance & Stability</option>
            <option value="Other Custom Inquiry">Other Custom Inquiry</option>
          </select>
          {errors.service && <p className="mt-1.5 text-xs text-red-500">{errors.service}</p>}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Estimated Budget
          </label>
          <select
            id="budget"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-400"
          >
            <option value="">Select budget range...</option>
            <option value="Under $500">Under $500</option>
            <option value="$500 - $1,500">$500 - $1,500</option>
            <option value="$1,500 - $3,500">$1,500 - $3,500</option>
            <option value="$3,500+">$3,500+</option>
            <option value="Monthly Retainer">Monthly Retainer (VA / Growth)</option>
          </select>
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="timeline" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Expected Timeline
          </label>
          <select
            id="timeline"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300/80 bg-white/80 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-400"
          >
            <option value="">Select timeline...</option>
            <option value="Immediate (Within 1 week)">Immediate (Within 1 week)</option>
            <option value="2 to 4 weeks">2 to 4 weeks</option>
            <option value="1 to 2 months">1 to 2 months</option>
            <option value="Ongoing monthly service">Ongoing monthly service</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mt-6">
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Project Details & Requirements <span className="text-sky-600 dark:text-cyan-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: '' });
          }}
          placeholder="Describe what you want to build, existing bottlenecks, target audience, or specific requirements..."
          className={`mt-2 w-full rounded-2xl border bg-white/80 p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 dark:bg-slate-900/80 dark:text-white dark:placeholder-slate-500 ${
            errors.message
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300/80 focus:border-sky-500 focus:ring-sky-500 dark:border-white/10 dark:focus:border-cyan-400 dark:focus:ring-cyan-400'
          }`}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="spatial-btn-primary flex w-full items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider disabled:opacity-60 shadow-sm"
        >
          {loading ? (
            <>
              <Icon name="RefreshCw" className="h-4 w-4 animate-spin" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Project Inquiry</span>
              <Icon name="ArrowRight" className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
          We protect your privacy. Submissions are saved securely in our administrative portal.
        </p>
      </div>
    </form>
  );
};
