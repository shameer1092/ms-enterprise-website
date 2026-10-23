'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';

interface QuickInquiryFormProps {
  whatsappNumber?: string;
}

export const QuickInquiryForm: React.FC<QuickInquiryFormProps> = ({
  whatsappNumber = '15550192834',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '', // Email or WhatsApp
    service: 'Bespoke Web Development',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    if (!formData.name.trim() || formData.name.length < 2) {
      setStatus('error');
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!formData.contact.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email or WhatsApp number so we can reach you.');
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      setStatus('error');
      setErrorMessage('Please provide a brief project summary (at least 10 characters).');
      return;
    }

    // Determine if contact is email or phone
    const isEmail = formData.contact.includes('@');
    const payload = {
      name: formData.name,
      email: isEmail ? formData.contact : `${formData.name.toLowerCase().replace(/\s+/g, '')}@client.inquiry`,
      phone: !isEmail ? formData.contact : '',
      service: formData.service,
      message: `[Contact Provided: ${formData.contact}]\n\n${formData.message}`,
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setStatus('success');
      setFormData({
        name: '',
        contact: '',
        service: 'Bespoke Web Development',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please connect with us directly via WhatsApp.');
    }
  };

  return (
    <div className="w-full rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-8 shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
      {status === 'success' ? (
        <div className="py-8 text-center animate-fade-in">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#E5B238]">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-[#121316] dark:text-white">
            Inquiry Received Directly!
          </h3>
          <p className="mt-2 text-sm text-[#6B7280] dark:text-[#9CA3AF] max-w-md mx-auto">
            Our founding architects have received your note. We will review your requirements and respond within a few hours.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="text-xs font-bold text-[#D4AF37] hover:text-[#B8860B] uppercase tracking-wider underline underline-offset-4"
            >
              Send Another Note
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#121316] mb-1.5 dark:text-[#E5E7EB]">
              Your Name <span className="text-[#D4AF37]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="partner-input w-full"
            />
          </div>

          {/* Email or WhatsApp Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#121316] mb-1.5 dark:text-[#E5E7EB]">
              Email or WhatsApp Number <span className="text-[#D4AF37]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="alex@company.com or +1 234 567 8900"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="partner-input w-full"
            />
          </div>

          {/* Service Needed */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#121316] mb-1.5 dark:text-[#E5E7EB]">
              Service Needed <span className="text-[#D4AF37]">*</span>
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="partner-input w-full"
            >
              <option value="Bespoke Web Development">Bespoke Web Development (Next.js)</option>
              <option value="Targeted Meta (Facebook) Growth">Targeted Meta (Facebook) Growth</option>
              <option value="Ecommerce Operations (VA)">Ecommerce Operations (VA)</option>
              <option value="Complete Growth & Engineering Suite">Complete Growth & Engineering Suite</option>
            </select>
          </div>

          {/* Project Brief */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#121316] mb-1.5 dark:text-[#E5E7EB]">
              Project Brief <span className="text-[#D4AF37]">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tell us about what you want to build, current store challenges, or target timelines..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="partner-input w-full min-h-[96px] resize-y"
            />
          </div>

          {/* Action Buttons: Submit Form & Direct WhatsApp */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="spatial-btn-primary w-full sm:flex-1 inline-flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Project Brief</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${cleanWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="spatial-btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4 text-[#D4AF37]" />
              <span>Direct WhatsApp</span>
            </a>
          </div>

          <p className="text-[11px] text-[#6B7280] text-center dark:text-[#9CA3AF]">
            Direct architect communication. No middle managers or sales spam.
          </p>
        </form>
      )}
    </div>
  );
};
