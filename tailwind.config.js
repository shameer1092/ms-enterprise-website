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
          dark: '#080A0E',
          charcoal: '#0B0F17',
          surface: '#111726',
          elevated: '#172033',
        },
        spatial: {
          bg: '#080A0E',
          card: 'rgba(18, 22, 34, 0.55)',
          surface: '#111827',
          elevated: '#172238',
          border: 'rgba(255, 255, 255, 0.12)',
          borderHover: 'rgba(56, 189, 248, 0.35)',
          muted: '#8E9EB8',
          heading: '#FFFFFF',
          accent: '#38BDF8', // Cyan
          cobalt: '#2563EB', // Cobalt Blue
          crimson: '#EF4444',
          emerald: '#10B981',
        },
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
      },
      boxShadow: {
        'spatial-glass': '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(37, 99, 235, 0.08)',
        'spatial-card': '0 25px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'spatial-elevated': '0 30px 70px -10px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        'spatial-pill': '0 10px 30px -5px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        'glow-cyan': '0 0 25px -4px rgba(56, 189, 248, 0.45)',
        'glow-cobalt': '0 0 30px -5px rgba(37, 99, 235, 0.45)',
      },
      animation: {
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radar 4s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        radar: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
