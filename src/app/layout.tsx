import type { Metadata } from 'next';
import './globals.css';
import { getSettings, getNavigation, getServices } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsapp } from '@/components/common/FloatingWhatsapp';
import { JsonLd } from '@/components/common/JsonLd';
import { CookieNotice } from '@/components/common/CookieNotice';

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: {
      default: settings.seoDefaults.title,
      template: `%s | ${settings.companyName}`,
    },
    description: settings.seoDefaults.description,
    keywords: [
      'custom website development',
      'ecommerce website redesign',
      'Meta organic growth',
      'Facebook page traffic',
      'ecommerce virtual assistant',
      'Shopify VA store management',
      'lifetime live support',
    ],
    metadataBase: new URL('https://msenterprise.com'),
    openGraph: {
      title: settings.seoDefaults.title,
      description: settings.seoDefaults.description,
      type: 'website',
      siteName: settings.companyName,
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/favicon.ico',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();
  const navigation = getNavigation();
  const services = getServices();

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#080A0E] text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
        {/* Skip to main content for screen readers and keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-950 focus:shadow-xl"
        >
          Skip to main content
        </a>

        {/* Global Spatial Lighting Mesh */}
        <div className="pointer-events-none fixed inset-0 -z-10 spatial-ambient-canvas opacity-85" />
        <div className="pointer-events-none fixed inset-0 -z-10 spatial-grid-overlay opacity-30" />

        <div className="flex min-h-screen flex-col">
          <Navbar navigation={navigation} settings={settings} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer settings={settings} services={services} />
        </div>

        {/* Floating WhatsApp Action */}
        <FloatingWhatsapp
          phone={settings.whatsapp}
          enabled={settings.floatingWhatsappEnabled}
        />
        <CookieNotice />
        <JsonLd settings={settings} />
      </body>
    </html>
  );
}
