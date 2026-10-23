import React from 'react';
import Link from 'next/link';
import { Home, ArrowRight, MessageSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[75vh] items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center sm:p-12 border border-[#E5E7EB] shadow-partner-card dark:bg-[#1E2024] dark:border-[#2A2D34]">
        {/* Small Pill Badge: Error 404 */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          <span>Error 404</span>
        </div>

        {/* Prominent Heading */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-[#121316] sm:text-4xl dark:text-white">
          404 — You&apos;re on the wrong page
        </h1>

        {/* Plain-English Explanation */}
        <p className="mt-4 text-sm leading-relaxed text-[#6B7280] dark:text-[#9CA3AF]">
          The link you clicked might be outdated, mistyped, or the page has moved. Let&apos;s get you back on track.
        </p>

        {/* Action Buttons: Return to Homepage & Contact Support */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="spatial-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/inquiry"
            className="spatial-btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4 text-[#D4AF37]" />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Clean reassuring footer */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB] text-xs text-[#6B7280] dark:border-[#2A2D34] dark:text-[#9CA3AF]">
          Need immediate assistance? You can always reach us directly via our inquiry form or WhatsApp.
        </div>
      </div>
    </div>
  );
}
