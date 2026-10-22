'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from '@/components/common/Icon';

interface ThemeSwitcherProps {
  className?: string;
  showLabels?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = '',
  showLabels = false,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read current theme state on mount
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    setMounted(true);

    const handleThemeChange = () => {
      const darkNow = document.documentElement.classList.contains('dark');
      setTheme(darkNow ? 'dark' : 'light');
    };

    window.addEventListener('storage', handleThemeChange);
    return () => window.removeEventListener('storage', handleThemeChange);
  }, []);

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    try {
      localStorage.setItem('ms_theme', newTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      document.documentElement.style.colorScheme = newTheme;
      window.dispatchEvent(new Event('theme-changed'));
    } catch (e) {
      console.error(e);
    }
  };

  if (!mounted) {
    return (
      <div
        className={`inline-flex h-8 w-16 items-center justify-between rounded-full border border-slate-200/80 bg-white/60 p-1 backdrop-blur-xl ${className}`}
        aria-hidden="true"
      >
        <span className="h-6 w-6 rounded-full bg-slate-100" />
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Theme selection"
      className={`inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/65 p-1 shadow-sm backdrop-blur-xl transition-all dark:border-white/15 dark:bg-slate-900/70 dark:shadow-none ${className}`}
    >
      <button
        type="button"
        onClick={() => toggleTheme('light')}
        aria-label="Switch to Light Theme"
        aria-pressed={theme === 'light'}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
          theme === 'light'
            ? 'bg-white text-sky-700 shadow-sm ring-1 ring-slate-900/5'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Icon name="Sun" className="h-3.5 w-3.5" />
        {showLabels && <span>Light</span>}
      </button>

      <button
        type="button"
        onClick={() => toggleTheme('dark')}
        aria-label="Switch to Dark Theme"
        aria-pressed={theme === 'dark'}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-slate-800 text-sky-300 shadow-sm ring-1 ring-white/10'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
        }`}
      >
        <Icon name="Moon" className="h-3.5 w-3.5" />
        {showLabels && <span>Dark</span>}
      </button>
    </div>
  );
};
