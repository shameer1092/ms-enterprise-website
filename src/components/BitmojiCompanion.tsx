'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

export type BitmojiEmotion =
  | 'excited'
  | 'cool'
  | 'thinking'
  | 'happy'
  | 'surprised'
  | 'wink'
  | 'love'
  | 'celebrate'
  | 'tech'
  | 'sleepy';

interface EmotionConfig {
  tag: string;
  emoji: string;
  defaultText: string;
  particles: string[];
}

const EMOTION_CONFIGS: Record<BitmojiEmotion, EmotionConfig> = {
  excited: {
    tag: 'HIGH IMPACT',
    emoji: '🚀',
    defaultText: "Let's build something extraordinary! High speed, zero bloat! 🚀🔥",
    particles: ['⭐', '🚀', '🔥'],
  },
  cool: {
    tag: 'PARTNER STANDARD',
    emoji: '😎',
    defaultText: 'Direct architect access, zero middle managers. Smoother than butter! 😎✨',
    particles: ['🕶️', '✨', '💎'],
  },
  thinking: {
    tag: 'ARCHITECT LOGIC',
    emoji: '🧐',
    defaultText: 'Analyzing requirements... 100% bloat-free engineering solution found! 🧐💡',
    particles: ['💡', '⚙️', '❓'],
  },
  happy: {
    tag: 'DIRECT ACCESS',
    emoji: '😊',
    defaultText: 'Great choice! Rana & Moiz are all over your project! 😊🤝',
    particles: ['😊', '💛', '✨'],
  },
  surprised: {
    tag: 'SUB-SECOND SPEED',
    emoji: '😲',
    defaultText: 'Whoa, did you see that transition?! Pure 60fps performance! 😲⚡',
    particles: ['⚡', '😲', '❗'],
  },
  wink: {
    tag: 'PRO CRAFT',
    emoji: '😉',
    defaultText: 'Pro tip: No junior developers or non-technical middlemen ever touch your code! 😉👌',
    particles: ['😉', '💫', '🌟'],
  },
  love: {
    tag: 'PURE CRAFT',
    emoji: '😍',
    defaultText: 'That’s what we love to engineer! Pixel-perfect and ultra-responsive! 😍❤️',
    particles: ['💖', '❤️', '🪄'],
  },
  celebrate: {
    tag: 'FOUNDER APPROVED',
    emoji: '🎉',
    defaultText: 'Direct connection unlocked! Let’s ship this to production! 🎉🥂',
    particles: ['🎉', '🥳', '🥂'],
  },
  tech: {
    tag: 'NEXT.JS SPATIAL',
    emoji: '💻',
    defaultText: 'Next.js 14, Three.js & Tailwind — sub-second page speeds guaranteed! 💻⚡',
    particles: ['💻', '⚡', '🌐'],
  },
  sleepy: {
    tag: 'POWER NAP',
    emoji: '😴',
    defaultText: 'Zzz... taking a power nap in dock. Tap ⚡ to wake me up! 😴🌙',
    particles: ['💤', '🌙', '☁️'],
  },
};

const DIRECT_CLICK_QUOTES = [
  { emotion: 'wink' as BitmojiEmotion, text: 'Hey, that tickles! Looking sharp today! 😉', emoji: '✨' },
  { emotion: 'excited' as BitmojiEmotion, text: 'Rana & Moiz are coding right now — direct architect access! 💻⚡', emoji: '🚀' },
  { emotion: 'cool' as BitmojiEmotion, text: 'No agency fluff or inflated retainers allowed here! 😎', emoji: '💎' },
  { emotion: 'tech' as BitmojiEmotion, text: 'Sub-second page speeds engineered directly for your brand! ⚡', emoji: '🔥' },
  { emotion: 'celebrate' as BitmojiEmotion, text: 'I convert espresso directly into production-grade pull requests! ☕🎉', emoji: '🥂' },
  { emotion: 'love' as BitmojiEmotion, text: 'Tap any button or card on the site — watch me react! 😍', emoji: '💖' },
];

export const BitmojiCompanion: React.FC = () => {
  const pathname = usePathname();
  const isAdminOrPortal =
    pathname?.startsWith('/admin') || pathname?.startsWith('/portal-gateway');

  const [emotion, setEmotionState] = useState<BitmojiEmotion>('happy');
  const [dialogueText, setDialogueText] = useState<string>(
    'Hey there! Ready to build something fast? Watch my eyes follow your cursor!'
  );
  const [dialogueTag, setDialogueTag] = useState<string>('PARTNER STANDARD');
  const [dialogueEmoji, setDialogueEmoji] = useState<string>('👋');
  const [isBubbleOpen, setIsBubbleOpen] = useState<boolean>(true);
  const [isSleeping, setIsSleeping] = useState<boolean>(false);
  const [isBackflipping, setIsBackflipping] = useState<boolean>(false);
  const [isSquashing, setIsSquashing] = useState<boolean>(false);
  const [activeParticles, setActiveParticles] = useState<{ id: number; symbol: string; x: number }[]>([]);
  const [directQuoteIdx, setDirectQuoteIdx] = useState<number>(0);
  const [eyeOffset, setEyeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // DOM node references for 60fps hardware-accelerated eye and head tracking
  const companionRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const leftEyePupilRef = useRef<SVGCircleElement>(null);
  const rightEyePupilRef = useRef<SVGCircleElement>(null);
  const leftEyeGlintRef = useRef<SVGCircleElement>(null);
  const rightEyeGlintRef = useRef<SVGCircleElement>(null);
  const headGroupRef = useRef<SVGGElement>(null);

  const bubbleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSleepingRef = useRef<boolean>(false);
  const lastTextThoughtTimeRef = useRef<number>(0);
  const lastHoveredElementRef = useRef<Element | null>(null);

  // Sync ref with state
  useEffect(() => {
    isSleepingRef.current = isSleeping;
  }, [isSleeping]);

  // Trigger emotion with optional custom text and emoji
  const triggerEmotion = useCallback(
    (newEmotion: BitmojiEmotion, customText?: string, customEmoji?: string, customTag?: string) => {
      if (isSleepingRef.current && newEmotion !== 'sleepy') {
        setIsSleeping(false);
      }

      const config = EMOTION_CONFIGS[newEmotion];
      setEmotionState(newEmotion);
      setDialogueText(customText || config.defaultText);
      setDialogueEmoji(customEmoji || config.emoji);
      setDialogueTag(customTag || config.tag);
      setIsBubbleOpen(true);

      // Trigger floating emoji particles
      const newParticles = config.particles.map((symbol, i) => ({
        id: Date.now() + i,
        symbol,
        x: (i - 1) * 22,
      }));
      setActiveParticles(newParticles);
      setTimeout(() => {
        setActiveParticles([]);
      }, 1400);

      // Bounce avatar
      setIsSquashing(true);
      setTimeout(() => setIsSquashing(false), 450);

      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
      bubbleTimeoutRef.current = setTimeout(() => {
        // Keep open for readability
      }, 6000);
    },
    []
  );

  // Sleep state reaction
  useEffect(() => {
    if (isSleeping) {
      setEmotionState('sleepy');
      setDialogueText('Zzz... taking a power nap. Tap ⚡ to wake me!');
      setDialogueEmoji('😴');
      setDialogueTag('POWER NAP');
    }
  }, [isSleeping]);

  // External events (3D orbit and emotion bus)
  useEffect(() => {
    const handle3DOrbit = (e: any) => {
      const active = e.detail?.active;
      if (active) {
        triggerEmotion(
          'cool',
          '3D Free-Orbit Active! Drag anywhere to inspect the Quantum Core! 🪐✨',
          '🕶️',
          '3D QUANTUM CORE'
        );
      } else {
        triggerEmotion(
          'tech',
          'Telemetry re-synced! Scrollytelling pipeline active. 🛰️',
          '⚡',
          'TELEMETRY SYNC'
        );
      }
    };

    const handleExternalEmotion = (e: any) => {
      if (e.detail?.emotion) {
        triggerEmotion(e.detail.emotion, e.detail.text, e.detail.emoji, e.detail.tag);
      }
    };

    window.addEventListener('toggle-3d-orbit', handle3DOrbit);
    window.addEventListener('bitmoji-emotion', handleExternalEmotion);

    return () => {
      window.removeEventListener('toggle-3d-orbit', handle3DOrbit);
      window.removeEventListener('bitmoji-emotion', handleExternalEmotion);
    };
  }, [triggerEmotion]);

  // --- 1. DYNAMIC CURSOR-TRACKING EYES & TEXT-HOVER INTELLIGENCE ENGINE ---
  useEffect(() => {
    if (isAdminOrPortal) return;

    // Helper: Generate intelligent short detail when hovering over text
    const generateThoughtAboutText = (fullText: string, el: HTMLElement) => {
      const lower = fullText.toLowerCase();

      let insightText = '';
      let tag = 'ARCHITECT INSIGHT';
      let emoji = '🧐';

      if (lower.includes('without agency bloat') || lower.includes('agency bloat')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'By eliminating bloated account managers and retainers, 100% of your budget goes directly to senior software architects! 💡';
        emoji = '✂️';
      } else if (lower.includes('no non-technical intermediaries') || lower.includes('intermediaries')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'Direct founder communication! Rana & Moiz speak fluent code — zero broken promises or lost Jira tickets! 🧠';
        emoji = '🤝';
      } else if (lower.includes('direct architect access')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'You get direct Slack & WhatsApp communication with the engineers actually writing your code from Day 1. 🚀';
        emoji = '⚡';
      } else if (lower.includes('zero middle managers')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'No junior coordinators billing $150/hr just to forward your emails. Pure high-speed production output! 💎';
        emoji = '🛡️';
      } else if (lower.includes('lifetime live support')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'We maintain ownership long after launch: real-time uptime monitoring, security patches, and instant bug fixes included! 🔒';
        emoji = '✨';
      } else if (lower.includes('low monthly maintenance')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'Transparent, flat-rate monthly support so you never get surprise maintenance invoices or hidden lock-ins! 📊';
        emoji = '💰';
      } else if (lower.includes('custom website') || lower.includes('pillar 01') || lower.includes('web platforms')) {
        tag = 'READING THIS PART';
        insightText =
          'Custom Next.js 14 App Router platform with zero template bloat, pristine TypeScript, and sub-second load times! 💻⚡';
        emoji = '💻';
      } else if (lower.includes('sub-second') || lower.includes('speed') || lower.includes('high-performing')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'Engineered for 99+ Google Core Web Vitals scores, optimized asset bundles, and instant server-side hydration! ⚡';
        emoji = '🏎️';
      } else if (lower.includes('competitor-informed') || lower.includes('redesign')) {
        tag = 'ARCHITECT INSIGHT';
        insightText =
          'We deconstruct your top 3 competitors’ conversion funnels and outperform them in speed, aesthetics, and UX flow! 📈';
        emoji = '🎯';
      } else if (lower.includes('meta organic growth') || lower.includes('pillar 02') || lower.includes('scale online stores')) {
        tag = 'READING THIS PART';
        insightText =
          'Targeting high-intent buyers on Facebook through organic viral loops and engaging communities without ad burns! 📈🔥';
        emoji = '🔥';
      } else if (lower.includes('virtual assistant') || lower.includes('pillar 03') || lower.includes('store va')) {
        tag = 'READING THIS PART';
        insightText =
          'Dedicated 24/7 Shopify & WooCommerce management: catalog syncing, order fulfillment, and live chat support! 🛒';
        emoji = '🛒';
      } else if (lower.includes('rana') || lower.includes('moiz') || lower.includes('founders') || lower.includes('leadership')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'Rana architects the backend code & WebGL engines; Moiz scales Meta traffic, customer acquisition, and growth operations! 🤝';
        emoji = '👥';
      } else if (lower.includes('plan') || lower.includes('pricing') || lower.includes('tier')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'Sprint-based flat deliverables. No inflated retainers or surprise scope-creep costs! 💎';
        emoji = '💎';
      } else if (lower.includes('faq') || lower.includes('question') || lower.includes('why')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'Total transparency before writing a single line of code. If a template fits better, we’ll honestly tell you! 🔍';
        emoji = '💡';
      } else if (lower.includes('3d') || lower.includes('quantum') || lower.includes('spatial')) {
        tag = 'THINKING ABOUT THIS';
        insightText =
          'Procedural WebGL 3D Quantum Engine rendering at 60fps with ACES Filmic tonemapping! Look at those rings spin! 🪐';
        emoji = '🪐';
      } else {
        const cleanSnippet = fullText.replace(/\s+/g, ' ').slice(0, 52);
        tag = 'THINKING ABOUT THIS';
        insightText = `Reading "${cleanSnippet}..." — Engineered with precision for speed, conversions, and clean UX! 🧐✨`;
        emoji = '💡';
      }

      triggerEmotion('thinking', insightText, emoji, tag);
    };

    // Main pointer tracker: handles both desktop cursor and mobile touches
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const pointerX = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const pointerY = 'touches' in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;

      if (pointerX === undefined || pointerY === undefined) return;

      // 1. UPDATE EYE GAZE (Pupils always follow the cursor arrow / finger touch)
      if (avatarButtonRef.current) {
        const rect = avatarButtonRef.current.getBoundingClientRect();
        const avatarCenterX = rect.left + rect.width / 2;
        const avatarCenterY = rect.top + rect.height / 2;

        const dx = pointerX - avatarCenterX;
        const dy = pointerY - avatarCenterY;
        const angle = Math.atan2(dy, dx);
        const dist = Math.hypot(dx, dy);

        // Normalize offset: maximum 2.6 units in SVG coordinate space
        const factor = Math.min(1, dist / 280);
        const maxOffset = 2.6;
        const lookX = Math.cos(angle) * maxOffset * factor;
        const lookY = Math.sin(angle) * maxOffset * factor;

        // Apply hardware-accelerated direct SVG attributes (60fps lag-free)
        if (leftEyePupilRef.current) {
          leftEyePupilRef.current.setAttribute('cx', (42 + lookX).toFixed(2));
          leftEyePupilRef.current.setAttribute('cy', (45 + lookY).toFixed(2));
        }
        if (leftEyeGlintRef.current) {
          leftEyeGlintRef.current.setAttribute('cx', (42 + lookX * 0.7 - 0.7).toFixed(2));
          leftEyeGlintRef.current.setAttribute('cy', (45 + lookY * 0.7 - 0.7).toFixed(2));
        }
        if (rightEyePupilRef.current) {
          rightEyePupilRef.current.setAttribute('cx', (58 + lookX).toFixed(2));
          rightEyePupilRef.current.setAttribute('cy', (45 + lookY).toFixed(2));
        }
        if (rightEyeGlintRef.current) {
          rightEyeGlintRef.current.setAttribute('cx', (58 + lookX * 0.7 - 0.7).toFixed(2));
          rightEyeGlintRef.current.setAttribute('cy', (45 + lookY * 0.7 - 0.7).toFixed(2));
        }

        // Subtle head tilt towards cursor / touch point (-4deg to +4deg)
        if (headGroupRef.current) {
          const tiltDeg = Math.max(-4, Math.min(4, (dx / window.innerWidth) * 7));
          headGroupRef.current.style.transform = `rotate(${tiltDeg}deg)`;
          headGroupRef.current.style.transformOrigin = '50px 50px';
        }

        setEyeOffset({ x: lookX, y: lookY });
      }

      // 2. TEXT HOVER / TOUCH THINKING REACTION
      if (isSleepingRef.current) return;

      const element = document.elementFromPoint(pointerX, pointerY);
      if (!element) return;

      if (companionRef.current && companionRef.current.contains(element)) return;

      // Find closest meaningful text element
      const textEl = element.closest(
        'h1, h2, h3, h4, p, li, blockquote, .spatial-card, .partner-card, .liquid-glass, [data-thought]'
      ) as HTMLElement | null;

      if (!textEl) return;
      if (textEl === lastHoveredElementRef.current) return;

      const text = (textEl.textContent || '').trim();
      if (text.length < 12) return;

      // Throttle text thinking so it does not overwhelm (at least 2.8s between thoughts)
      const now = Date.now();
      if (now - lastTextThoughtTimeRef.current < 2800) return;

      // Random trigger chance (as requested: "as cursor is moved on a text randomly it will start thinking")
      // 45% probability when encountering a new text element
      if (Math.random() > 0.45) return;

      lastTextThoughtTimeRef.current = now;
      lastHoveredElementRef.current = textEl;
      generateThoughtAboutText(text, textEl);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
    };
  }, [isAdminOrPortal, triggerEmotion]);

  // --- 2. GLOBAL CLICK INTERACTION ENGINE ---
  useEffect(() => {
    if (isAdminOrPortal) return;

    const handleDocumentClick = (e: MouseEvent) => {
      if (companionRef.current && companionRef.current.contains(e.target as Node)) {
        return;
      }

      if (isSleepingRef.current) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, input, select, textarea, [role="button"], summary, [data-interactive]'
      ) as HTMLElement | null;

      const text = (interactiveEl?.textContent || target.textContent || '').trim().toLowerCase();
      const href = (interactiveEl?.getAttribute('href') || '').toLowerCase();
      const aria = (interactiveEl?.getAttribute('aria-label') || '').toLowerCase();
      const title = (interactiveEl?.getAttribute('title') || '').toLowerCase();
      const id = (interactiveEl?.id || target.id || '').toLowerCase();
      const combined = `${text} ${href} ${aria} ${title} ${id}`;

      // 1. Inquiry / CTA
      if (
        combined.includes('inquiry') ||
        combined.includes('conversation') ||
        combined.includes('start') ||
        combined.includes('get started') ||
        combined.includes('consultation')
      ) {
        triggerEmotion(
          'excited',
          "Starting an inquiry? Best decision of your week! Let's build! 🚀🔥",
          '🔥',
          'INQUIRY ACTIVE'
        );
        return;
      }

      // 2. 3D Engine / Architecture
      if (
        combined.includes('3d') ||
        combined.includes('architecture') ||
        combined.includes('orbit') ||
        combined.includes('inspect') ||
        combined.includes('engine')
      ) {
        triggerEmotion(
          'cool',
          '3D Spatial Core engaged! Look at those golden gimbal rings spin! 🪐✨',
          '🕶️',
          'SPATIAL ENGINE'
        );
        return;
      }

      // 3. WhatsApp Direct Line
      if (combined.includes('wa.me') || combined.includes('whatsapp')) {
        triggerEmotion(
          'excited',
          'Direct WhatsApp to founders Rana & Moiz! Sub-minute response time! 💬📲',
          '⚡',
          'DIRECT CHAT'
        );
        return;
      }

      // 4. Phone Call
      if (combined.includes('tel:') || combined.includes('phone') || combined.includes('call')) {
        triggerEmotion(
          'happy',
          'Calling direct! Zero middle managers, 100% architect focus! 📞🤝',
          '✨',
          'DIRECT LINE'
        );
        return;
      }

      // 5. Web Dev Pillar
      if (
        combined.includes('custom website') ||
        combined.includes('web-dev') ||
        combined.includes('next.js') ||
        combined.includes('engineering') ||
        combined.includes('code')
      ) {
        triggerEmotion(
          'tech',
          'Custom Next.js & Tailwind architecture! Sub-second load times engineered here! 💻⚡',
          '🚀',
          'PILLAR 01 • WEB DEV'
        );
        return;
      }

      // 6. Meta Growth Pillar
      if (
        combined.includes('meta') ||
        combined.includes('growth') ||
        combined.includes('facebook') ||
        combined.includes('traffic') ||
        combined.includes('organic')
      ) {
        triggerEmotion(
          'celebrate',
          'Organic Meta growth & ad scaling that actually converts! 📈🔥',
          '🎉',
          'PILLAR 02 • META GROWTH'
        );
        return;
      }

      // 7. Store VA Ops Pillar
      if (
        combined.includes('store-va') ||
        combined.includes('store va') ||
        combined.includes('virtual assistant') ||
        combined.includes('shopify') ||
        combined.includes('ecommerce')
      ) {
        triggerEmotion(
          'cool',
          '24/7 dedicated store operations VA on lock! Inventory & orders sorted! 🛒👌',
          '💎',
          'PILLAR 03 • STORE VA'
        );
        return;
      }

      // 8. Plans / Pricing / Tiers
      if (
        combined.includes('plan') ||
        combined.includes('pricing') ||
        combined.includes('tier') ||
        combined.includes('retainer') ||
        combined.includes('cost')
      ) {
        triggerEmotion(
          'love',
          'Zero agency bloat pricing! Transparent flat rates, massive ROI! 💎💰',
          '❤️',
          'TRANSPARENT VALUE'
        );
        return;
      }

      // 9. Theme Switcher
      if (
        combined.includes('theme') ||
        combined.includes('dark') ||
        combined.includes('light') ||
        combined.includes('mode') ||
        combined.includes('sun') ||
        combined.includes('moon')
      ) {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          triggerEmotion(
            'cool',
            'Obsidian & Gold dark mode! Sleek luxury tech aesthetic. 🌙🕶️',
            '✨',
            'THEME CHANGED'
          );
        } else {
          triggerEmotion(
            'happy',
            'Bright editorial canvas! Clean, radiant, and readable. ☀️💛',
            '🌟',
            'THEME CHANGED'
          );
        }
        return;
      }

      // 10. FAQ / Questions
      if (
        combined.includes('faq') ||
        combined.includes('question') ||
        combined.includes('how') ||
        combined.includes('why')
      ) {
        triggerEmotion(
          'thinking',
          'Clear answers, radical honesty. That is the Partner Standard! 💡🧐',
          '💡',
          'FAQ INTELLIGENCE'
        );
        return;
      }

      // 11. Generic Click
      const genericEmotions: { em: BitmojiEmotion; text: string; emoji: string }[] = [
        { em: 'wink', text: 'Checking that out? Great eye for detail! 😉', emoji: '✨' },
        { em: 'happy', text: 'Exploring the platform? Let me know if you need anything! 😊', emoji: '👋' },
        { em: 'thinking', text: 'Analyzing this section... 100% bloat-free engineering! 🧐', emoji: '💡' },
        { em: 'surprised', text: 'Ooh, look at that interaction! Smooth 60fps! 😲', emoji: '⚡' },
        { em: 'cool', text: 'Zero middle managers, just pure codecraft! 😎', emoji: '🕶️' },
        { em: 'love', text: 'Crafted with passion in every single pixel! 😍', emoji: '💖' },
      ];

      const chosen = genericEmotions[Math.floor(Math.random() * genericEmotions.length)];
      triggerEmotion(chosen.em, chosen.text, chosen.emoji, 'PARTNER REACT');
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [isAdminOrPortal, triggerEmotion]);

  // Click directly on the Bitmoji avatar
  const handleAvatarDirectClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSleeping) {
      setIsSleeping(false);
      triggerEmotion('excited', "I'm awake and ready to roll! Let's build! 🚀", '⚡', 'AWAKE');
      return;
    }

    if (Math.random() < 0.35 && !isBackflipping) {
      setIsBackflipping(true);
      triggerEmotion('surprised', 'Whoosh! Missed me! 😜💨 360° backflip roll!', '💨', 'ACROBATICS');
      setTimeout(() => setIsBackflipping(false), 520);
      return;
    }

    const quote = DIRECT_CLICK_QUOTES[directQuoteIdx % DIRECT_CLICK_QUOTES.length];
    setDirectQuoteIdx((prev) => prev + 1);
    triggerEmotion(quote.emotion, quote.text, quote.emoji, 'POKE REACTION');
  };

  if (isAdminOrPortal) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes bitmojiFloatIdle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(1.5deg); }
        }
        @keyframes bitmojiSquashBounce {
          0% { transform: scale(1, 1); }
          25% { transform: scale(1.22, 0.78); }
          50% { transform: scale(0.85, 1.18); }
          75% { transform: scale(1.06, 0.96); }
          100% { transform: scale(1, 1); }
        }
        @keyframes bitmojiBackflip {
          0% { transform: rotate(0deg) scale(1); }
          40% { transform: rotate(-180deg) scale(1.25); }
          100% { transform: rotate(-360deg) scale(1); }
        }
        @keyframes floatParticle {
          0% { opacity: 0; transform: translateY(0px) scale(0.6); }
          30% { opacity: 1; transform: translateY(-24px) scale(1.1); }
          100% { opacity: 0; transform: translateY(-56px) scale(0.8); }
        }
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes starTwinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.3) rotate(45deg); }
        }
        .bitmoji-idle-float {
          animation: bitmojiFloatIdle 3.2s ease-in-out infinite;
        }
        .bitmoji-squash {
          animation: bitmojiSquashBounce 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 1 !important;
        }
        .bitmoji-backflip {
          animation: bitmojiBackflip 0.52s cubic-bezier(0.2, 0.8, 0.2, 1) 1 !important;
        }
        .bitmoji-particle {
          animation: floatParticle 1.2s ease-out forwards;
        }
        .heart-beat-anim {
          animation: heartPulse 0.8s ease-in-out infinite;
          transform-origin: center;
        }
        .star-twinkle-anim {
          animation: starTwinkle 1s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>

      {/* FIXED CONTAINER: Stacks neatly above WhatsApp button (bottom-24 right-4 sm:right-6) */}
      <aside
        ref={companionRef}
        aria-label="Interactive Bitmoji Companion"
        className="fixed bottom-24 right-3 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none"
      >
        {/* FLOATING EMOJI PARTICLES THAT BURST ON EMOTION CHANGE */}
        <div className="absolute -top-10 right-6 pointer-events-none z-50">
          {activeParticles.map((p) => (
            <span
              key={p.id}
              className="bitmoji-particle absolute text-lg"
              style={{ left: `${p.x}px` }}
            >
              {p.symbol}
            </span>
          ))}
        </div>

        {/* SPEECH BUBBLE (iPhone Liquid Glass Refraction) */}
        {isBubbleOpen && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-auto relative mb-3 w-[270px] sm:w-[310px] liquid-glass p-3.5 rounded-2xl shadow-partner-card-hover border border-white/70 dark:border-white/15 animate-fade-in transition-all duration-300"
          >
            {/* Header pill & controls */}
            <div className="flex items-center justify-between pb-1.5 border-b border-[#E5E7EB]/70 dark:border-[#2A2D34]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                {dialogueTag}
              </span>

              <div className="flex items-center gap-1">
                {/* Sleep/Wake toggle */}
                <button
                  type="button"
                  onClick={() => setIsSleeping(!isSleeping)}
                  title={isSleeping ? 'Wake Up Companion' : 'Rest Companion'}
                  className="rounded-full p-1 text-xs hover:bg-[#FBFBFA] dark:hover:bg-[#2A2D34] text-[#6B7280] dark:text-[#9CA3AF] transition-colors"
                >
                  {isSleeping ? '⚡' : '💤'}
                </button>

                {/* Close bubble */}
                <button
                  type="button"
                  onClick={() => setIsBubbleOpen(false)}
                  aria-label="Minimize message"
                  className="rounded-full p-1 text-[#6B7280] hover:text-[#121316] hover:bg-[#FBFBFA] dark:text-[#9CA3AF] dark:hover:text-white dark:hover:bg-[#2A2D34] transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Speech message text */}
            <div className="mt-2 flex items-start gap-2">
              <span className="text-base shrink-0 select-none">{dialogueEmoji}</span>
              <p className="text-xs font-semibold leading-relaxed text-[#121316] dark:text-[#E5E7EB]">
                {dialogueText}
              </p>
            </div>

            {/* Quick Interactive Emotion Picker Chips */}
            <div className="mt-2.5 pt-2 border-t border-[#E5E7EB]/60 dark:border-[#2A2D34] flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#6B7280] dark:text-[#9CA3AF]">
                REACT:
              </span>
              <div className="flex items-center gap-1">
                {(
                  [
                    { em: 'excited', icon: '🚀', title: 'Excited' },
                    { em: 'cool', icon: '😎', title: 'Cool' },
                    { em: 'thinking', icon: '💡', title: 'Thinking' },
                    { em: 'wink', icon: '😉', title: 'Wink' },
                    { em: 'celebrate', icon: '🎉', title: 'Party' },
                    { em: 'love', icon: '😍', title: 'Love' },
                  ] as const
                ).map((chip) => (
                  <button
                    key={chip.em}
                    type="button"
                    onClick={() => triggerEmotion(chip.em)}
                    title={chip.title}
                    className={`h-6 w-6 rounded-lg text-xs flex items-center justify-center transition-all ${
                      emotion === chip.em
                        ? 'bg-[#D4AF37] scale-110 shadow-sm'
                        : 'bg-white/60 dark:bg-[#1E2024]/80 hover:scale-110 hover:bg-[#D4AF37]/20'
                    }`}
                  >
                    {chip.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Liquid Glass Tail Notch */}
            <div className="absolute -bottom-1.5 right-8 w-3.5 h-3.5 bg-white/90 dark:bg-[#1E2024]/90 rotate-45 border-r border-b border-white/70 dark:border-white/15" />
          </div>
        )}

        {/* INTERACTIVE BITMOJI AVATAR BUTTON (100% Vector Scalable SVG Character) */}
        <div className="relative pointer-events-auto">
          {/* Sleeping Zzz indicator */}
          {isSleeping && (
            <div className="absolute -top-3 -left-2 z-50 flex items-center gap-1 font-mono text-xs font-black text-[#D4AF37] animate-pulse">
              <span>Z</span>
              <span className="text-[10px]">z</span>
              <span className="text-[8px]">z</span>
            </div>
          )}

          {/* Reopen Chat Bubble Badge if closed */}
          {!isBubbleOpen && (
            <button
              type="button"
              onClick={() => setIsBubbleOpen(true)}
              aria-label="Open speech bubble"
              className="absolute -top-2.5 right-0 flex items-center gap-1 rounded-full bg-[#121316] text-white px-2 py-0.5 text-[10px] font-bold shadow-md hover:scale-105 transition-transform dark:bg-[#D4AF37] dark:text-[#121316]"
            >
              <MessageSquare className="h-2.5 w-2.5" />
              <span>React</span>
            </button>
          )}

          {/* AVATAR BODY BUTTON */}
          <button
            ref={avatarButtonRef}
            type="button"
            onClick={handleAvatarDirectClick}
            aria-label={`Interactive Bitmoji Companion (${emotion} emotion)`}
            title="My eyes follow your cursor! Hover text to see me think!"
            className={`group relative flex h-[76px] w-[76px] sm:h-[84px] sm:w-[84px] items-center justify-center rounded-full bg-gradient-to-br from-white/95 to-[#F5E6BE]/90 p-1.5 shadow-partner-card-hover border-2 border-white/80 transition-all duration-300 hover:scale-105 active:scale-95 dark:from-[#1E2024] dark:to-[#121316] dark:border-[#D4AF37]/50 ${
              isBackflipping ? 'bitmoji-backflip' : ''
            } ${isSquashing ? 'bitmoji-squash' : ''} ${
              !isBackflipping && !isSquashing ? 'bitmoji-idle-float' : ''
            }`}
          >
            {/* Ambient golden glow behind head */}
            <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-md group-hover:bg-[#D4AF37]/40 transition-colors pointer-events-none" />

            {/* ================= VECTOR BITMOJI CHARACTER SVG ================= */}
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Skin Gradient */}
                <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F7D3A6" />
                  <stop offset="100%" stopColor="#E5A869" />
                </linearGradient>

                {/* Hair Gradient */}
                <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2D231E" />
                  <stop offset="70%" stopColor="#1B1411" />
                  <stop offset="100%" stopColor="#0F0C0A" />
                </linearGradient>

                {/* Sunglasses Sheen */}
                <linearGradient id="shadesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2A2D34" />
                  <stop offset="50%" stopColor="#121316" />
                  <stop offset="100%" stopColor="#0A0C0E" />
                </linearGradient>

                {/* Gold Metal Ring */}
                <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5E6BE" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>

                {/* Hoodie Gradient */}
                <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#262930" />
                  <stop offset="100%" stopColor="#15171B" />
                </linearGradient>
              </defs>

              {/* --- 1. HOODIE BODY & SHOULDERS --- */}
              <g id="body">
                <path
                  d="M 20 86 Q 50 72 80 86 L 86 100 L 14 100 Z"
                  fill="url(#hoodieGrad)"
                />
                <path
                  d="M 32 75 Q 50 83 68 75 Q 50 90 32 75 Z"
                  fill="#1B1D22"
                  stroke="#D4AF37"
                  strokeWidth="0.8"
                />
                <path
                  d="M 44 80 L 44 92 M 56 80 L 56 92"
                  stroke="#D4AF37"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="44" cy="93" r="1.2" fill="#F5E6BE" />
                <circle cx="56" cy="93" r="1.2" fill="#F5E6BE" />

                <text
                  x="30"
                  y="92"
                  fill="#D4AF37"
                  fontSize="4.5"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  MS
                </text>
              </g>

              {/* --- HEAD & FACE GROUP (Subtly tilts towards cursor) --- */}
              <g id="headGroup" ref={headGroupRef}>
                {/* 2. EARS */}
                <g id="ears">
                  <ellipse cx="28" cy="48" rx="4" ry="6" fill="url(#skinGrad)" />
                  <ellipse cx="28.5" cy="48" rx="2.2" ry="3.8" fill="#DFA060" />

                  <ellipse cx="72" cy="48" rx="4" ry="6" fill="url(#skinGrad)" />
                  <ellipse cx="71.5" cy="48" rx="2.2" ry="3.8" fill="#DFA060" />
                </g>

                {/* 3. FACE SHAPE */}
                <g id="head">
                  <ellipse cx="50" cy="47" rx="22" ry="25" fill="url(#skinGrad)" />
                  <path
                    d="M 36 56 Q 50 72 64 56 Z"
                    fill="url(#skinGrad)"
                  />
                </g>

                {/* 4. MODERN POMPADOUR / FADE HAIR */}
                <g id="hair">
                  <path
                    d="M 27 44 C 25 32 30 20 42 17 C 54 14 68 18 73 26 C 77 34 75 42 73 45 C 70 38 66 32 58 31 C 48 30 38 34 32 44 Z"
                    fill="url(#hairGrad)"
                  />
                  <path
                    d="M 33 28 C 38 20 50 16 64 19 C 72 21 76 28 75 33 C 71 27 60 23 48 24 C 40 25 35 27 33 28 Z"
                    fill="#3E3029"
                  />
                  <path d="M 28 42 L 29 48 L 31 46 L 30 42 Z" fill="#1B1411" />
                  <path d="M 72 42 L 71 48 L 69 46 L 70 42 Z" fill="#1B1411" />
                </g>

                {/* 5. DYNAMIC EYEBROWS */}
                <g id="eyebrows">
                  {emotion === 'thinking' ? (
                    <>
                      <path
                        d="M 36 34 Q 42 29 47 33"
                        stroke="#1B1411"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 53 36 Q 58 38 64 36"
                        stroke="#1B1411"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </>
                  ) : emotion === 'surprised' ? (
                    <>
                      <path
                        d="M 36 32 Q 42 27 47 32"
                        stroke="#1B1411"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 53 32 Q 58 27 64 32"
                        stroke="#1B1411"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </>
                  ) : emotion === 'wink' ? (
                    <>
                      <path
                        d="M 36 36 Q 42 38 47 36"
                        stroke="#1B1411"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 53 33 Q 58 29 64 33"
                        stroke="#1B1411"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </>
                  ) : emotion === 'excited' || emotion === 'celebrate' ? (
                    <>
                      <path
                        d="M 36 34 Q 42 30 47 34"
                        stroke="#1B1411"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 53 34 Q 58 30 64 34"
                        stroke="#1B1411"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M 36 35 Q 42 33 47 36"
                        stroke="#1B1411"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 53 36 Q 58 33 64 35"
                        stroke="#1B1411"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </>
                  )}
                </g>

                {/* 6. DYNAMIC EYES WITH ACTIVE CURSOR & TOUCH TRACKING */}
                <g id="eyes">
                  {emotion === 'excited' ? (
                    /* 4-Point Sparkling Golden Star Eyes */
                    <>
                      <g transform={`translate(${42 + eyeOffset.x * 0.4}, ${45 + eyeOffset.y * 0.4})`} className="star-twinkle-anim">
                        <polygon points="0,-5 1.5,-1.5 5,0 1.5,1.5 0,5 -1.5,1.5 -5,0 -1.5,-1.5" fill="#D4AF37" />
                        <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                      </g>
                      <g transform={`translate(${58 + eyeOffset.x * 0.4}, ${45 + eyeOffset.y * 0.4})`} className="star-twinkle-anim">
                        <polygon points="0,-5 1.5,-1.5 5,0 1.5,1.5 0,5 -1.5,1.5 -5,0 -1.5,-1.5" fill="#D4AF37" />
                        <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                      </g>
                    </>
                  ) : emotion === 'love' ? (
                    /* Beating Heart Eyes */
                    <>
                      <g transform={`translate(${42 + eyeOffset.x * 0.4}, ${45 + eyeOffset.y * 0.4})`} className="heart-beat-anim">
                        <path
                          d="M 0 2 A 2 2 0 0 0 -3.5 -1.5 A 2 2 0 0 0 -4 -3.5 A 2 2 0 0 0 0 -5 A 2 2 0 0 0 4 -3.5 A 2 2 0 0 0 3.5 -1.5 Z"
                          transform="scale(0.8) translate(0, 3)"
                          fill="#E11D48"
                        />
                      </g>
                      <g transform={`translate(${58 + eyeOffset.x * 0.4}, ${45 + eyeOffset.y * 0.4})`} className="heart-beat-anim">
                        <path
                          d="M 0 2 A 2 2 0 0 0 -3.5 -1.5 A 2 2 0 0 0 -4 -3.5 A 2 2 0 0 0 0 -5 A 2 2 0 0 0 4 -3.5 A 2 2 0 0 0 3.5 -1.5 Z"
                          transform="scale(0.8) translate(0, 3)"
                          fill="#E11D48"
                        />
                      </g>
                    </>
                  ) : emotion === 'wink' ? (
                    /* Left Eye Winking, Right Eye Open Actively Tracking Pointer */
                    <>
                      <path
                        d="M 37 46 Q 42 49 47 46"
                        stroke="#121316"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <ellipse cx="58" cy="45" rx="5.4" ry="4.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.6" />
                      <circle
                        ref={rightEyePupilRef}
                        cx={58 + eyeOffset.x}
                        cy={45 + eyeOffset.y}
                        r="3.0"
                        fill="#121316"
                      />
                      <circle
                        ref={rightEyeGlintRef}
                        cx={58 + eyeOffset.x * 0.7 - 0.7}
                        cy={45 + eyeOffset.y * 0.7 - 0.7}
                        r="1.1"
                        fill="#FFFFFF"
                      />
                    </>
                  ) : emotion === 'happy' ? (
                    /* Friendly Curved Crescent Eyes with gentle cursor tilt */
                    <g transform={`translate(${eyeOffset.x * 0.3}, ${eyeOffset.y * 0.3})`}>
                      <path
                        d="M 38 46 Q 42 42 46 46"
                        stroke="#121316"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 54 46 Q 58 42 62 46"
                        stroke="#121316"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                  ) : emotion === 'surprised' ? (
                    /* Shocked Eyes Actively Tracking Pointer */
                    <>
                      <ellipse cx="42" cy="45" rx="5.8" ry="5.2" fill="#FFFFFF" stroke="#121316" strokeWidth="1.2" />
                      <circle
                        ref={leftEyePupilRef}
                        cx={42 + eyeOffset.x * 0.8}
                        cy={45 + eyeOffset.y * 0.8}
                        r="2.2"
                        fill="#121316"
                      />
                      <circle
                        ref={leftEyeGlintRef}
                        cx={41.2 + eyeOffset.x * 0.6}
                        cy={44.2 + eyeOffset.y * 0.6}
                        r="0.8"
                        fill="#FFFFFF"
                      />

                      <ellipse cx="58" cy="45" rx="5.8" ry="5.2" fill="#FFFFFF" stroke="#121316" strokeWidth="1.2" />
                      <circle
                        ref={rightEyePupilRef}
                        cx={58 + eyeOffset.x * 0.8}
                        cy={45 + eyeOffset.y * 0.8}
                        r="2.2"
                        fill="#121316"
                      />
                      <circle
                        ref={rightEyeGlintRef}
                        cx={57.2 + eyeOffset.x * 0.6}
                        cy={44.2 + eyeOffset.y * 0.6}
                        r="0.8"
                        fill="#FFFFFF"
                      />
                    </>
                  ) : emotion === 'sleepy' ? (
                    /* Relaxed Sleepy Closed Eyes */
                    <>
                      <path
                        d="M 38 46 Q 42 48 46 46"
                        stroke="#121316"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 54 46 Q 58 48 62 46"
                        stroke="#121316"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </>
                  ) : emotion === 'tech' ? (
                    /* Glowing Cyber Amber Eyes tracking cursor */
                    <>
                      <ellipse cx="42" cy="45" rx="5.2" ry="4.4" fill="#121316" stroke="#D4AF37" strokeWidth="0.8" />
                      <circle
                        ref={leftEyePupilRef}
                        cx={42 + eyeOffset.x}
                        cy={45 + eyeOffset.y}
                        r="2.8"
                        fill="#D4AF37"
                      />
                      <circle
                        ref={leftEyeGlintRef}
                        cx={42 + eyeOffset.x * 0.7 - 0.7}
                        cy={45 + eyeOffset.y * 0.7 - 0.7}
                        r="1.1"
                        fill="#FFFFFF"
                      />

                      <ellipse cx="58" cy="45" rx="5.2" ry="4.4" fill="#121316" stroke="#D4AF37" strokeWidth="0.8" />
                      <circle
                        ref={rightEyePupilRef}
                        cx={58 + eyeOffset.x}
                        cy={45 + eyeOffset.y}
                        r="2.8"
                        fill="#D4AF37"
                      />
                      <circle
                        ref={rightEyeGlintRef}
                        cx={58 + eyeOffset.x * 0.7 - 0.7}
                        cy={45 + eyeOffset.y * 0.7 - 0.7}
                        r="1.1"
                        fill="#FFFFFF"
                      />
                    </>
                  ) : (
                    /* Standard, Thinking, and Cool: Sclera + Tracking Pupils */
                    <>
                      <ellipse cx="42" cy="45" rx="5.4" ry="4.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.6" />
                      <circle
                        ref={leftEyePupilRef}
                        cx={42 + eyeOffset.x}
                        cy={45 + eyeOffset.y}
                        r="3.0"
                        fill="#121316"
                      />
                      <circle
                        ref={leftEyeGlintRef}
                        cx={42 + eyeOffset.x * 0.7 - 0.7}
                        cy={45 + eyeOffset.y * 0.7 - 0.7}
                        r="1.1"
                        fill="#FFFFFF"
                      />

                      <ellipse cx="58" cy="45" rx="5.4" ry="4.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.6" />
                      <circle
                        ref={rightEyePupilRef}
                        cx={58 + eyeOffset.x}
                        cy={45 + eyeOffset.y}
                        r="3.0"
                        fill="#121316"
                      />
                      <circle
                        ref={rightEyeGlintRef}
                        cx={58 + eyeOffset.x * 0.7 - 0.7}
                        cy={45 + eyeOffset.y * 0.7 - 0.7}
                        r="1.1"
                        fill="#FFFFFF"
                      />
                    </>
                  )}
                </g>

                {/* 7. DESIGNER GLASSES (DYNAMIC SUNGLASSES IN COOL MODE) */}
                <g id="glasses">
                  {emotion === 'cool' ? (
                    <>
                      <path
                        d="M 33 40 Q 42 38 49 40 L 48 51 Q 41 53 34 50 Z"
                        fill="url(#shadesGrad)"
                        stroke="url(#goldRimGrad)"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M 51 40 Q 58 38 67 40 L 66 50 Q 59 53 52 51 Z"
                        fill="url(#shadesGrad)"
                        stroke="url(#goldRimGrad)"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M 48 41 L 52 41"
                        stroke="url(#goldRimGrad)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 36 42 L 40 48 M 41 42 L 44 47"
                        stroke="#FFFFFF"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                      <path
                        d="M 54 42 L 58 48 M 59 42 L 62 47"
                        stroke="#FFFFFF"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                    </>
                  ) : (
                    <>
                      <circle
                        cx="42"
                        cy="45"
                        r="7.5"
                        fill="rgba(255,255,255,0.06)"
                        stroke="url(#goldRimGrad)"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="58"
                        cy="45"
                        r="7.5"
                        fill="rgba(255,255,255,0.06)"
                        stroke="url(#goldRimGrad)"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 49.5 44 Q 50 42.5 50.5 44"
                        stroke="url(#goldRimGrad)"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 38 41 L 40 43"
                        stroke="#FFFFFF"
                        strokeWidth="0.9"
                        strokeLinecap="round"
                        opacity="0.7"
                      />
                      <path
                        d="M 54 41 L 56 43"
                        stroke="#FFFFFF"
                        strokeWidth="0.9"
                        strokeLinecap="round"
                        opacity="0.7"
                      />
                    </>
                  )}
                </g>

                {/* 8. NOSE */}
                <path
                  d="M 49.5 48 Q 50 51 48.5 51.5"
                  stroke="#DFA060"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* 9. BLUSHING ROSY CHEEKS */}
                {(emotion === 'love' || emotion === 'excited' || emotion === 'happy' || emotion === 'wink') && (
                  <g id="cheeks">
                    <ellipse cx="34" cy="51" rx="4" ry="2.2" fill="#FF7B7B" opacity="0.45" />
                    <ellipse cx="66" cy="51" rx="4" ry="2.2" fill="#FF7B7B" opacity="0.45" />
                  </g>
                )}

                {/* 10. DYNAMIC MOUTH */}
                <g id="mouth">
                  {emotion === 'excited' || emotion === 'celebrate' ? (
                    <path
                      d="M 42 53 Q 50 63 58 53 Z"
                      fill="#991B1B"
                      stroke="#7F1D1D"
                      strokeWidth="0.8"
                    />
                  ) : emotion === 'cool' ? (
                    <path
                      d="M 44 54 Q 52 57 58 52"
                      stroke="#8C2C24"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  ) : emotion === 'thinking' ? (
                    <path
                      d="M 45 54 Q 50 53 55 55"
                      stroke="#8C2C24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  ) : emotion === 'surprised' ? (
                    <ellipse cx="50" cy="56" rx="3.5" ry="4.5" fill="#7F1D1D" stroke="#991B1B" strokeWidth="0.8" />
                  ) : emotion === 'love' ? (
                    <path d="M 43 53 Q 50 61 57 53 Z" fill="#8C2C24" />
                  ) : emotion === 'sleepy' ? (
                    <path
                      d="M 46 55 Q 50 56 54 55"
                      stroke="#8C2C24"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                  ) : (
                    <path
                      d="M 43 53 Q 50 58 57 53"
                      stroke="#8C2C24"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  )}
                </g>
              </g>

              {/* --- 11. DYNAMIC HAND GESTURES --- */}
              <g id="gestures">
                {emotion === 'happy' && (
                  <g className="origin-bottom-left" style={{ transformOrigin: '76px 76px' }}>
                    <path
                      d="M 76 74 Q 84 62 86 52 Q 88 51 89 53 Q 87 63 80 76 Z"
                      fill="url(#skinGrad)"
                      stroke="#DFA060"
                      strokeWidth="0.6"
                    />
                    <circle cx="87" cy="51" r="4.5" fill="url(#skinGrad)" />
                    <rect x="84" y="44" width="2" height="6" rx="1" fill="url(#skinGrad)" />
                    <rect x="87" y="43" width="2" height="7" rx="1" fill="url(#skinGrad)" />
                    <rect x="90" y="45" width="2" height="5" rx="1" fill="url(#skinGrad)" />
                  </g>
                )}

                {emotion === 'wink' && (
                  <g>
                    <rect x="74" y="70" width="7" height="6" rx="2" fill="#1E2024" />
                    <circle cx="82" cy="70" r="4.5" fill="url(#skinGrad)" />
                    <path
                      d="M 81 67 L 81 59 Q 82 57 84 58 L 84 68 Z"
                      fill="url(#skinGrad)"
                      stroke="#DFA060"
                      strokeWidth="0.5"
                    />
                  </g>
                )}

                {emotion === 'thinking' && (
                  <g>
                    <path
                      d="M 56 68 Q 54 59 51 58"
                      stroke="url(#skinGrad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="51" cy="58" r="2.5" fill="url(#skinGrad)" />
                  </g>
                )}

                {emotion === 'cool' && (
                  <g>
                    <circle cx="82" cy="68" r="4" fill="url(#skinGrad)" />
                    <rect x="80" y="58" width="2" height="9" rx="1" fill="url(#skinGrad)" />
                    <rect x="84" y="60" width="2" height="8" rx="1" fill="url(#skinGrad)" />
                  </g>
                )}

                {(emotion === 'excited' || emotion === 'celebrate') && (
                  <g>
                    <path
                      d="M 22 75 L 14 58 Q 15 56 18 57 L 26 73 Z"
                      fill="url(#skinGrad)"
                    />
                    <circle cx="15" cy="56" r="3.5" fill="url(#skinGrad)" />

                    <path
                      d="M 78 75 L 86 58 Q 85 56 82 57 L 74 73 Z"
                      fill="url(#skinGrad)"
                    />
                    <circle cx="85" cy="56" r="3.5" fill="url(#skinGrad)" />
                  </g>
                )}
              </g>

              {/* CELEBRATION PARTY HAT */}
              {emotion === 'celebrate' && (
                <g id="partyHat">
                  <polygon points="46,18 54,18 50,2" fill="#D4AF37" stroke="#F5E6BE" strokeWidth="0.8" />
                  <circle cx="50" cy="2" r="2" fill="#E11D48" />
                  <line x1="48" y1="12" x2="52" y2="12" stroke="#FFFFFF" strokeWidth="1" />
                </g>
              )}
            </svg>

            {/* GOLDEN EMOTION STATUS BADGE ON BOTTOM-RIGHT */}
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37] text-xs font-bold shadow-md border border-white dark:border-[#1E2024]">
              {EMOTION_CONFIGS[emotion].emoji}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default BitmojiCompanion;
