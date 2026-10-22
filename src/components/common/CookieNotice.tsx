'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const CookieNotice: React.FC = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Never show cookie notice on admin portal
    if (pathname?.startsWith('/admin')) {
      return;
    }
    const consent = localStorage.getItem('ms_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

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
      className="fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-liquid-elevated backdrop-blur-xl sm:left-6 sm:right-auto sm:max-w-md dark:border-white/15 dark:bg-slate-950/95 dark:shadow-2xl"
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs text-slate-600 leading-relaxed dark:text-slate-300">
          We use necessary cookies and anonymous technical telemetry to ensure system security and site reliability.{' '}
          <Link href="/legal/privacy-policy" className="text-sky-700 underline hover:text-sky-800 dark:text-cyan-400 dark:hover:text-cyan-300">
            Privacy Policy
          </Link>
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAccept}
            className="spatial-btn-primary rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="spatial-btn-secondary rounded-full px-4 py-1.5 text-xs text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
};
