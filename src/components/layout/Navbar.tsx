'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItemConfig, SiteSettings } from '@/types';
import { Logo } from '@/components/common/Logo';
import { Icon } from '@/components/common/Icon';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher';

interface NavbarProps {
  navigation: NavItemConfig[];
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ navigation, settings }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide public navbar on all admin portal routes to avoid duplicate headers
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect scroll for subtle shadow enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Smooth hover handlers with safe bridge delay
  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Toggle sub-menu for mobile
  const toggleMobileSubmenu = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const visibleItems = navigation.filter((item) => item.visible);

  const getSubItemIcon = (href: string, label: string) => {
    const lower = `${href} ${label}`.toLowerCase();
    if (lower.includes('web')) return 'Code2';
    if (lower.includes('meta') || lower.includes('facebook')) return 'Share2';
    if (lower.includes('ecom') || lower.includes('va')) return 'ShoppingBag';
    if (lower.includes('proj')) return 'Layers';
    return 'Sparkles';
  };

  return (
    <header
      ref={navRef}
      className="sticky top-3 sm:top-5 z-50 w-full px-3 sm:px-6 transition-all duration-300"
    >
      {/* Apple Liquid Glass Floating Capsule Navigation Bar */}
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
          scrolled
            ? 'spatial-pill-nav shadow-liquid-pill ring-1 ring-slate-900/10 dark:shadow-spatial-pill dark:ring-white/10'
            : 'spatial-pill-nav'
        }`}
      >
        {/* Logo (Clickable, leads to homepage) */}
        <Logo companyName={settings.companyName} />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex md:items-center md:gap-1" aria-label="Main Navigation">
          {visibleItems.map((item) => {
            const hasChildren = item.children && item.children.filter((c) => c.visible).length > 0;
            const isDropdownActive = activeDropdown === item.id;
            const isCurrentPage =
              pathname === item.href ||
              (hasChildren && item.children?.some((c) => pathname === c.href));

            if (!hasChildren) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                    isCurrentPage
                      ? 'bg-slate-100/90 text-sky-700 shadow-sm dark:bg-white/10 dark:text-cyan-300'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.id}
                className="relative inline-flex items-center"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Clickable Direct Link on Main Item */}
                <Link
                  href={item.href || '/services'}
                  onClick={() => setActiveDropdown(null)}
                  className={`rounded-l-full py-1.5 pl-3.5 pr-1 text-xs font-semibold tracking-wide transition-all ${
                    isCurrentPage || isDropdownActive
                      ? 'bg-slate-100/90 text-sky-700 dark:bg-white/10 dark:text-cyan-300'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>

                {/* Dedicated Chevron Arrow Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    setActiveDropdown(isDropdownActive ? null : item.id);
                  }}
                  aria-expanded={isDropdownActive}
                  aria-haspopup="true"
                  aria-label={`Toggle ${item.label} menu`}
                  className={`rounded-r-full py-1.5 pr-2.5 pl-1 text-xs transition-colors ${
                    isCurrentPage || isDropdownActive
                      ? 'bg-slate-100/90 text-sky-700 dark:bg-white/10 dark:text-cyan-300'
                      : 'text-slate-500 hover:text-slate-950 hover:bg-slate-100/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5'
                  }`}
                >
                  <Icon
                    name="ChevronDown"
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isDropdownActive ? 'rotate-180 text-sky-700 dark:text-cyan-300' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  />
                </button>

                {/* Apple Liquid Glass Dropdown with Safe Bridge Padding */}
                {isDropdownActive && (
                  <div
                    className="absolute left-0 top-full z-50 w-72 pt-3 origin-top-left"
                    role="menu"
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="spatial-elevated rounded-3xl p-2.5 shadow-liquid-elevated border border-white/80 dark:border-white/15 dark:shadow-spatial-elevated">
                      {/* Top Action: Overview */}
                      <Link
                        href={item.href || '/services'}
                        onClick={() => setActiveDropdown(null)}
                        role="menuitem"
                        className="group flex items-center justify-between rounded-2xl px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-sky-700 hover:bg-sky-50 dark:text-cyan-300 dark:hover:bg-cyan-500/10 transition-colors border-b border-slate-200/60 dark:border-white/10 mb-1"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-cyan-500/20 dark:text-cyan-400">
                            <Icon name="Compass" className="h-3.5 w-3.5" />
                          </div>
                          <span>All {item.label} Overview</span>
                        </div>
                        <Icon
                          name="ChevronRight"
                          className="h-3.5 w-3.5 text-sky-600 dark:text-cyan-400 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>

                      {/* Child Sub-items */}
                      {item.children
                        ?.filter((child) => child.visible)
                        .map((child) => {
                          const isChildActive = pathname === child.href;
                          const iconName = getSubItemIcon(child.href, child.label);

                          return (
                            <Link
                              key={child.id}
                              href={child.href}
                              onClick={() => setActiveDropdown(null)}
                              role="menuitem"
                              className={`group flex items-center justify-between rounded-2xl px-3 py-2.5 text-xs transition-all ${
                                isChildActive
                                  ? 'bg-sky-50 text-sky-800 font-semibold dark:bg-cyan-500/15 dark:text-cyan-300'
                                  : 'text-slate-700 hover:bg-slate-100/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-700 dark:bg-white/5 dark:text-slate-400 dark:group-hover:bg-cyan-500/15 dark:group-hover:text-cyan-300 transition-colors">
                                  <Icon name={iconName} className="h-4 w-4" />
                                </div>
                                <span className="font-medium">{child.label}</span>
                              </div>
                              <Icon
                                name="ChevronRight"
                                className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-sky-600 dark:text-slate-500 dark:group-hover:text-cyan-300"
                              />
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right CTA Actions & Theme Switcher */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {/* Glass Theme Switcher Pill */}
          <ThemeSwitcher />

          <Link
            href="/inquiry"
            className="spatial-btn-primary inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold shadow-sm"
          >
            <span>Inquiry</span>
            <Icon name="ArrowRight" className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Header Buttons (Theme Toggle & Hamburger) */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle mobile menu"
            className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white focus:outline-none"
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Sliding Glass Drawer Menu */}
      {mobileOpen && (
        <div className="spatial-elevated mt-2 overflow-hidden rounded-3xl p-4 border border-white/80 dark:border-white/15 md:hidden shadow-liquid-elevated dark:shadow-spatial-elevated">
          <div className="space-y-1">
            {visibleItems.map((item) => {
              const hasChildren = item.children && item.children.filter((c) => c.visible).length > 0;
              const isExpanded = mobileExpanded[item.id] || false;
              const isCurrentPage =
                pathname === item.href ||
                (hasChildren && item.children?.some((c) => pathname === c.href));

              if (!hasChildren) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-2xl px-4 py-2.5 text-sm font-semibold ${
                      isCurrentPage
                        ? 'bg-sky-50 text-sky-800 dark:bg-cyan-500/15 dark:text-cyan-300'
                        : 'text-slate-700 hover:bg-slate-100/60 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.id} className="rounded-2xl bg-slate-50/60 dark:bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href || '/services'}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 px-4 py-2.5 text-sm font-semibold ${
                        isCurrentPage ? 'text-sky-700 dark:text-cyan-300' : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => toggleMobileSubmenu(item.id, e)}
                      aria-expanded={isExpanded}
                      aria-label={`Toggle ${item.label} submenu`}
                      className="p-3 text-slate-500 hover:text-sky-700 dark:text-slate-400 dark:hover:text-cyan-300"
                    >
                      <Icon
                        name="ChevronDown"
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? 'rotate-180 text-sky-700 dark:text-cyan-300' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="space-y-1 pb-2 pl-4 pr-2 border-t border-slate-200/50 dark:border-white/5 pt-1">
                      <Link
                        href={item.href || '/services'}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-3 py-1.5 text-xs font-bold uppercase text-sky-700 hover:bg-slate-100 dark:text-cyan-300 dark:hover:bg-white/5"
                      >
                        All {item.label} Overview
                      </Link>

                      {item.children
                        ?.filter((c) => c.visible)
                        .map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.id}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className={`block rounded-xl px-3 py-2 text-xs ${
                                isChildActive
                                  ? 'bg-sky-50 text-sky-800 font-semibold dark:bg-cyan-500/15 dark:text-cyan-300'
                                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-3">
              <Link
                href="/inquiry"
                onClick={() => setMobileOpen(false)}
                className="spatial-btn-primary flex w-full items-center justify-center gap-2 py-3 text-center text-xs font-semibold"
              >
                <span>Request an Inquiry</span>
                <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
