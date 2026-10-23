/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Strict 60-30-10 Brand Color Palette (Derived from Logo Sign)
        brand: {
          canvas: '#FFFFFF',
          alabaster: '#FBFBFA',
          charcoal: '#121316',
          card: '#1E2024',
          border: '#E5E7EB',
          borderDark: '#2A2D34',
          gold: '#D4AF37',
          goldHover: '#B8860B',
          goldLight: '#E5B238',
          goldGlow: 'rgba(212, 175, 55, 0.15)',
        },
        canvas: {
          light: '#FFFFFF',
          lightWash: '#FBFBFA',
          dark: '#121316',
          charcoal: '#121316',
          surface: '#1E2024',
          elevated: '#2A2D34',
        },
        spatial: {
          lightCard: '#FFFFFF',
          lightBorder: '#E5E7EB',
          lightEdge: 'rgba(18, 19, 22, 0.06)',
          darkCard: '#1E2024',
          darkBorder: '#2A2D34',
          accent: '#D4AF37',
          accentHover: '#B8860B',
          cobalt: '#121316',
          teal: '#D4AF37',
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
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.20)',
        'gold-glow-subtle': '0 0 15px rgba(212, 175, 55, 0.12)',
        'partner-card': '0 4px 20px rgba(18, 19, 22, 0.05), 0 1px 3px rgba(18, 19, 22, 0.03)',
        'partner-card-hover': '0 12px 32px rgba(18, 19, 22, 0.09), 0 2px 6px rgba(18, 19, 22, 0.04)',
        'liquid-card': '0 4px 20px rgba(18, 19, 22, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        'liquid-elevated': '0 12px 32px rgba(18, 19, 22, 0.08), inset 0 1px 0 #FFFFFF',
        'liquid-pill': '0 4px 16px rgba(18, 19, 22, 0.06)',
        'spatial-card': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'spatial-elevated': '0 16px 40px rgba(0, 0, 0, 0.6)',
        'spatial-pill': '0 6px 20px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'wave-hand': 'wave 2s infinite ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%, 60%': { transform: 'rotate(14deg)' },
          '40%, 80%': { transform: 'rotate(-10deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
