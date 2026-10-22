/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#F8FAFC',
          lightWash: '#F1F5F9',
          dark: '#080A0E',
          charcoal: '#0B0F17',
          surface: '#111726',
          elevated: '#172033',
        },
        spatial: {
          lightCard: 'rgba(255, 255, 255, 0.68)',
          lightBorder: 'rgba(255, 255, 255, 0.75)',
          lightEdge: 'rgba(15, 23, 42, 0.06)',
          darkCard: 'rgba(15, 23, 42, 0.65)',
          darkBorder: 'rgba(255, 255, 255, 0.12)',
          accent: 'var(--accent, #0284C7)',
          accentHover: 'var(--accent-hover, #0369A1)',
          cobalt: '#1D4ED8',
          teal: '#0D9488',
          emerald: '#10B981',
          crimson: '#EF4444',
        },
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
      },
      boxShadow: {
        // Apple Liquid Glass Light Shadows
        'liquid-card': '0 8px 32px rgba(15, 23, 42, 0.06), 0 2px 8px rgba(15, 23, 42, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        'liquid-elevated': '0 16px 40px rgba(15, 23, 42, 0.09), 0 4px 12px rgba(15, 23, 42, 0.04), inset 0 1px 0 #FFFFFF',
        'liquid-pill': '0 6px 24px rgba(15, 23, 42, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        // Apple Liquid Glass Dark Shadows
        'spatial-card': '0 12px 36px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
        'spatial-elevated': '0 24px 60px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
        'spatial-pill': '0 10px 30px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        'glow-accent': '0 0 25px -4px rgba(2, 132, 199, 0.35)',
      },
      animation: {
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radar 4s linear infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
