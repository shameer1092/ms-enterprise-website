'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const CookieNotice: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ms_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ms_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('ms_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl sm:left-6 sm:right-auto sm:max-w-md"
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs text-slate-300 leading-relaxed">
          We use necessary cookies and anonymous technical telemetry to ensure system security and site reliability.{' '}
          <Link href="/legal/privacy-policy" className="text-cyan-400 underline hover:text-cyan-300">
            Privacy Policy
          </Link>
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAccept}
            className="spatial-btn-primary rounded-lg px-4 py-1.5 text-xs font-semibold"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="spatial-btn-secondary rounded-lg px-4 py-1.5 text-xs text-slate-400 hover:text-white"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
};
