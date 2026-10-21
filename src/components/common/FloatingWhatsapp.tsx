'use client';

import React from 'react';
import { Icon } from '@/components/common/Icon';

interface FloatingWhatsappProps {
  phone: string;
  enabled: boolean;
}

export const FloatingWhatsapp: React.FC<FloatingWhatsappProps> = ({ phone, enabled }) => {
  if (!enabled || !phone) return null;

  const cleanPhone = phone.replace(/[^0-9]/g, '');

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={`https://wa.me/${cleanPhone}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-110 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        {/* Soft pulse animation */}
        <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-emerald-400/20 opacity-75" />
        <Icon name="MessageSquare" className="h-7 w-7 text-slate-950" />

        {/* Hover tooltip label */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 border border-white/10">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
