import type { Metadata } from 'next';
import './globals.css';
import { getSettings, getNavigation, getServices } from '@/lib/db';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper';
import { FloatingWhatsapp } from '@/components/common/FloatingWhatsapp';
import { FloatingAvatarCompanion } from '@/components/FloatingAvatarCompanion';
import { ThreeBackground } from '@/components/ThreeBackground';
import { JsonLd } from '@/components/common/JsonLd';
import { CookieNotice } from '@/components/common/CookieNotice';

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: {
      default: `${settings.companyName} | High-Performing Web Platforms & Scaled Stores`,
      template: `%s | ${settings.companyName}`,
    },
    description:
      'We build high-performing web platforms and scale online stores without agency bloat. Direct access to experienced software architects and growth operators.',
    keywords: [
      'custom website development',
      'Next.js development',
      'ecommerce website redesign',
      'Meta organic growth',
      'Facebook page traffic',
      'ecommerce virtual assistant',
      'Shopify VA store management',
      'partner driven agency',
    ],
    metadataBase: new URL('https://msenterprise.com'),
    openGraph: {
      title: `${settings.companyName} | High-Performing Web Platforms & Scaled Stores`,
      description:
        'No non-technical intermediaries. No inflated retainers. Work directly with experienced software architects and growth operators.',
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
  const defaultTheme = settings.themeConfig?.defaultTheme || 'light';
  const customAccent = settings.themeConfig?.accentColor || '#D4AF37';

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Anti-flash inline script to apply theme before render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('ms_theme');
                  var defaultPref = '${defaultTheme}';
                  var theme = stored;
                  if (!theme) {
                    if (defaultPref === 'system') {
                      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    } else {
                      theme = defaultPref;
                    }
                  }
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
        {customAccent && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
                :root {
                  --accent: ${customAccent};
                }
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen bg-[#FBFBFA] text-[#121316] antialiased selection:bg-[#D4AF37]/25 selection:text-[#121316] overflow-x-hidden dark:bg-[#121316] dark:text-[#E5E7EB] dark:selection:bg-[#D4AF37]/30 dark:selection:text-white">
        {/* Skip to main content for screen readers and keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#D4AF37] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#121316] focus:shadow-xl"
        >
          Skip to main content
        </a>

        {/* 60% Dominant Canvas Base */}
        <div className="site-backdrop" aria-hidden="true" />

        <PublicLayoutWrapper
          threeBackground={<ThreeBackground />}
          navbar={<Navbar navigation={navigation} settings={settings} />}
          footer={<Footer settings={settings} services={services} />}
          floatingWhatsapp={
            <FloatingWhatsapp
              phone={settings.whatsapp}
              enabled={settings.floatingWhatsappEnabled}
            />
          }
          bitmojiCompanion={<FloatingAvatarCompanion />}
          cookieNotice={<CookieNotice />}
        >
          {children}
        </PublicLayoutWrapper>
        <JsonLd settings={settings} />
      </body>
    </html>
  );
}
