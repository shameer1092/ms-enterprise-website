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
  const defaultTheme = settings.themeConfig?.defaultTheme || 'light';
  const customAccent = settings.themeConfig?.accentColor;
  const glassIntensity = settings.themeConfig?.glassIntensity || 'default';

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
        {/* Dynamic theme overrides from admin configuration */}
        {customAccent && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
                :root {
                  --accent: ${customAccent};
                  ${glassIntensity === 'subtle' ? '--glass-default-blur: 18px; --glass-default-bg: rgba(255, 255, 255, 0.58);' : ''}
                  ${glassIntensity === 'strong' ? '--glass-default-blur: 30px; --glass-default-bg: rgba(255, 255, 255, 0.82);' : ''}
                }
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen bg-slate-50/60 text-slate-800 antialiased selection:bg-sky-500/20 selection:text-sky-900 dark:bg-[#080A0E] dark:text-slate-100 dark:selection:bg-cyan-500/20 dark:selection:text-cyan-200">
        {/* Skip to main content for screen readers and keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-sky-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-xl dark:focus:bg-cyan-400 dark:focus:text-slate-950"
        >
          Skip to main content
        </a>

        {/* Apple Liquid Glass Backdrop Washes (Large, Soft, Clean, No Dots) */}
        <div className="liquid-glass-backdrop" aria-hidden="true">
          <div className="liquid-glass-wash-1" />
          <div className="liquid-glass-wash-2" />
          <div className="liquid-glass-wash-3" />
        </div>

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
