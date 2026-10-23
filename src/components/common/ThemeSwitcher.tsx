'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

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
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    setMounted(true);

    const handleThemeChange = () => {
      const darkNow = document.documentElement.classList.contains('dark');
      setTheme(darkNow ? 'dark' : 'light');
    };

    window.addEventListener('storage', handleThemeChange);
    window.addEventListener('theme-changed', handleThemeChange);
    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('theme-changed', handleThemeChange);
    };
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
        className={`inline-flex h-9 w-18 items-center justify-between rounded-full border border-[#E5E7EB] bg-white/80 p-1 dark:border-[#2A2D34] dark:bg-[#1E2024] ${className}`}
        aria-hidden="true"
      >
        <span className="h-6 w-6 rounded-full bg-[#FBFBFA]" />
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Theme selection"
      className={`inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white p-1 shadow-sm transition-all dark:border-[#2A2D34] dark:bg-[#1E2024] ${className}`}
    >
      <button
        type="button"
        onClick={() => toggleTheme('light')}
        aria-label="Switch to Light Theme"
        aria-pressed={theme === 'light'}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition-all duration-200 ${
          theme === 'light'
            ? 'bg-[#121316] text-[#D4AF37] shadow-sm'
            : 'text-[#6B7280] hover:text-[#121316] dark:text-[#9CA3AF] dark:hover:text-white'
        }`}
      >
        <Sun className="h-3.5 w-3.5" />
        {showLabels && <span>Light</span>}
      </button>

      <button
        type="button"
        onClick={() => toggleTheme('dark')}
        aria-label="Switch to Dark Theme"
        aria-pressed={theme === 'dark'}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-white text-[#121316] shadow-sm'
            : 'text-[#6B7280] hover:text-[#121316] dark:text-[#9CA3AF] dark:hover:text-white'
        }`}
      >
        <Moon className="h-3.5 w-3.5" />
        {showLabels && <span>Dark</span>}
      </button>
    </div>
  );
};
