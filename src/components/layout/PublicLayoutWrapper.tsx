'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface PublicLayoutWrapperProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
  floatingWhatsapp: React.ReactNode;
  cookieNotice: React.ReactNode;
  bitmojiCompanion?: React.ReactNode;
}

export const PublicLayoutWrapper: React.FC<PublicLayoutWrapperProps> = ({
  children,
  navbar,
  footer,
  floatingWhatsapp,
  cookieNotice,
  bitmojiCompanion,
}) => {
  const pathname = usePathname();
  const isAdminOrPortal =
    pathname?.startsWith('/admin') || pathname?.startsWith('/portal-gateway');

  // For administrative console or portal gateway, isolate from public website chrome
  if (isAdminOrPortal) {
    return (
      <main id="main-content" className="flex-1">
        {children}
      </main>
    );
  }

  // Standard public website shell with mobile-first zero overflow
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden relative z-10 bg-transparent">
      {navbar}
      <main id="main-content" className="flex-1 bg-transparent">
        {children}
      </main>
      {footer}
      {floatingWhatsapp}
      {bitmojiCompanion}
      {cookieNotice}
    </div>
  );
};
