import React from 'react';
import { SiteSettings } from '@/types';

export const JsonLd: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: settings.companyName,
    description: settings.description,
    url: 'https://msenterprise.com',
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
    },
    sameAs: [
      settings.socialLinks.facebook,
      settings.socialLinks.twitter,
      settings.socialLinks.linkedin,
      settings.socialLinks.instagram,
    ].filter(Boolean),
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
