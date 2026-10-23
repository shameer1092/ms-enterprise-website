'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItemConfig, SiteSettings } from '@/types';
import { Logo } from '@/components/common/Logo';
import { Icon } from '@/components/common/Icon';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher';
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  navigation: NavItemConfig[];
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ navigation, settings }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
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
      {/* Floating Capsule Bar (60-30-10 Clean Architecture) */}
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
          scrolled
            ? 'spatial-pill-nav shadow-partner-card ring-1 ring-[#121316]/5 dark:ring-white/10'
            : 'spatial-pill-nav'
        }`}
      >
        {/* Logo */}
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
                  className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all ${
                    isCurrentPage
                      ? 'bg-[#121316] text-[#D4AF37] shadow-sm dark:bg-white dark:text-[#121316]'
                      : 'text-[#121316] hover:text-[#D4AF37] hover:bg-[#FBFBFA] dark:text-[#E5E7EB] dark:hover:text-white dark:hover:bg-[#1E2024]'
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
                {/* Main Link */}
                <Link
                  href={item.href || '/services'}
                  onClick={() => setActiveDropdown(null)}
                  className={`rounded-l-full py-2 pl-4 pr-1 text-xs font-bold tracking-wide transition-all ${
                    isCurrentPage || isDropdownActive
                      ? 'bg-[#121316] text-[#D4AF37] dark:bg-white dark:text-[#121316]'
                      : 'text-[#121316] hover:text-[#D4AF37] hover:bg-[#FBFBFA] dark:text-[#E5E7EB] dark:hover:text-white dark:hover:bg-[#1E2024]'
                  }`}
                >
                  {item.label}
                </Link>

                {/* Chevron Trigger */}
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
                  className={`rounded-r-full py-2 pr-3 pl-1 text-xs transition-colors ${
                    isCurrentPage || isDropdownActive
                      ? 'bg-[#121316] text-[#D4AF37] dark:bg-white dark:text-[#121316]'
                      : 'text-[#6B7280] hover:text-[#D4AF37] hover:bg-[#FBFBFA] dark:text-[#9CA3AF] dark:hover:text-white dark:hover:bg-[#1E2024]'
                  }`}
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isDropdownActive ? 'rotate-180 text-[#D4AF37]' : 'text-current'
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownActive && (
                  <div
                    className="absolute left-0 top-full z-50 w-72 pt-3 origin-top-left"
                    role="menu"
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="rounded-2xl bg-white border border-[#E5E7EB] p-2.5 shadow-partner-card-hover dark:bg-[#1E2024] dark:border-[#2A2D34]">
                      {/* Overview */}
                      <Link
                        href={item.href || '/services'}
                        onClick={() => setActiveDropdown(null)}
                        role="menuitem"
                        className="group flex items-center justify-between rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#121316] hover:bg-[#FBFBFA] hover:text-[#D4AF37] dark:text-white dark:hover:bg-[#121316] transition-colors border-b border-[#E5E7EB] dark:border-[#2A2D34] mb-1"
                      >
                        <span>All {item.label} Overview</span>
                        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
                              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs transition-all ${
                                isChildActive
                                  ? 'bg-[#121316] text-[#D4AF37] font-bold dark:bg-white dark:text-[#121316]'
                                  : 'text-[#2B2D33] hover:bg-[#FBFBFA] hover:text-[#121316] dark:text-[#E5E7EB] dark:hover:bg-[#121316] dark:hover:text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FBFBFA] border border-[#E5E7EB] text-[#121316] group-hover:border-[#D4AF37] dark:bg-[#121316] dark:border-[#2A2D34] dark:text-[#D4AF37]">
                                  <Icon name={iconName} className="h-3.5 w-3.5" />
                                </div>
                                <span className="font-semibold">{child.label}</span>
                              </div>
                              <ChevronRight className="h-3.5 w-3.5 text-[#6B7280] transition-transform group-hover:translate-x-1 group-hover:text-[#D4AF37]" />
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
          <ThemeSwitcher />

          <Link
            href="/inquiry"
            className="spatial-btn-primary inline-flex items-center gap-2 !min-h-[42px] !py-2 !px-4 text-xs font-bold uppercase tracking-wider"
          >
            <span>Start Inquiry</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Header Buttons (Theme Toggle & Hamburger, Touch Target >= 48px) */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle mobile menu"
            className="flex h-12 w-12 items-center justify-center rounded-full text-[#121316] hover:bg-[#FBFBFA] focus:outline-none dark:text-white dark:hover:bg-[#1E2024]"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Drawer Menu (Touch Target >= 48px) */}
      {mobileOpen && (
        <div className="mt-2 overflow-hidden rounded-3xl bg-white border border-[#E5E7EB] p-4 shadow-partner-card-hover md:hidden dark:bg-[#1E2024] dark:border-[#2A2D34] animate-slide-up">
          <div className="space-y-1.5">
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
                    className={`flex items-center min-h-[48px] rounded-2xl px-4 text-sm font-bold ${
                      isCurrentPage
                        ? 'bg-[#121316] text-[#D4AF37] dark:bg-white dark:text-[#121316]'
                        : 'text-[#121316] hover:bg-[#FBFBFA] dark:text-[#E5E7EB] dark:hover:bg-[#121316]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.id} className="rounded-2xl border border-[#E5E7EB] dark:border-[#2A2D34] overflow-hidden">
                  <div className="flex items-center justify-between min-h-[48px]">
                    <Link
                      href={item.href || '/services'}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 px-4 py-3 text-sm font-bold ${
                        isCurrentPage ? 'text-[#D4AF37]' : 'text-[#121316] dark:text-[#E5E7EB]'
                      }`}
                    >
                      {item.label}
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => toggleMobileSubmenu(item.id, e)}
                      aria-expanded={isExpanded}
                      aria-label={`Toggle ${item.label} submenu`}
                      className="flex h-12 w-12 items-center justify-center text-[#6B7280] hover:text-[#121316] dark:text-[#9CA3AF] dark:hover:text-white"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isExpanded ? 'rotate-180 text-[#D4AF37]' : 'text-current'
                        }`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="space-y-1 pb-3 pl-4 pr-3 border-t border-[#E5E7EB] dark:border-[#2A2D34] pt-2 bg-[#FBFBFA] dark:bg-[#121316]">
                      <Link
                        href={item.href || '/services'}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center min-h-[44px] rounded-xl px-3 text-xs font-bold uppercase text-[#D4AF37] hover:bg-white dark:hover:bg-[#1E2024]"
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
                              className={`flex items-center min-h-[44px] rounded-xl px-3 text-xs font-medium ${
                                isChildActive
                                  ? 'bg-[#121316] text-[#D4AF37] font-bold dark:bg-white dark:text-[#121316]'
                                  : 'text-[#2B2D33] hover:bg-white dark:text-[#E5E7EB] dark:hover:bg-[#1E2024]'
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
                className="spatial-btn-primary flex w-full items-center justify-center gap-2"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
