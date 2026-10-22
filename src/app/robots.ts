import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/admin/',
          '/portal-gateway-*/',
          '/api/auth/',
        ],
      },
    ],
    sitemap: 'https://msenterprise.com/sitemap.xml',
  };
}
