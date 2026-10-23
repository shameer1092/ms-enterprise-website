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
  threeBackground?: React.ReactNode;
}

export const PublicLayoutWrapper: React.FC<PublicLayoutWrapperProps> = ({
  children,
  navbar,
  footer,
  floatingWhatsapp,
  cookieNotice,
  bitmojiCompanion,
  threeBackground,
}) => {
  const pathname = usePathname();
  const isAdminOrPortal =
    pathname?.startsWith('/admin') || pathname?.startsWith('/portal-gateway');

  // For administrative console or portal gateway, isolate from public website chrome & 3D effects
  if (isAdminOrPortal) {
    return (
      <main id="main-content" className="flex-1">
        {children}
      </main>
    );
  }

  // Standard public website shell with mobile-first zero overflow
  return (
    <>
      {threeBackground}
      <div
        id="site-content-wrapper"
        className="flex min-h-screen flex-col overflow-x-hidden relative z-20 bg-transparent"
        style={{ position: 'relative', zIndex: 20 }}
      >
        {navbar}
        <main
          id="main-content"
          className="flex-1 bg-transparent relative z-20"
          style={{ position: 'relative', zIndex: 20 }}
        >
          {children}
        </main>
        {footer}
        {floatingWhatsapp}
        {bitmojiCompanion}
        {cookieNotice}
      </div>
    </>
  );
};
