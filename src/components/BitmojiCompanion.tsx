'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, X, ChevronUp, Sparkles, ArrowRight } from 'lucide-react';

export const BitmojiCompanion: React.FC = () => {
  const pathname = usePathname();
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Exclude companion from admin and portal gateway routes
  const isAdminOrPortal =
    pathname?.startsWith('/admin') || pathname?.startsWith('/portal-gateway');

  // Track scroll depth across the entire document (only re-render on stage transition)
  useEffect(() => {
    let currentStage: 1 | 2 | 3 | 4 = 1;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const clamped = Math.min(100, Math.max(0, progress));

      // 4 Scroll Stages
      let newStage: 1 | 2 | 3 | 4 = 1;
      if (clamped < 25) {
        newStage = 1;
      } else if (clamped < 55) {
        newStage = 2;
      } else if (clamped < 85) {
        newStage = 3;
      } else {
        newStage = 4;
      }

      if (newStage !== currentStage) {
        currentStage = newStage;
        setStage(newStage);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial evaluation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminOrPortal) return null;

  // Speech bubble content and button by stage
  const stageData = {
    1: {
      tag: 'Partner Standard',
      text: 'Hey there! Ready to build something fast?',
      showCta: false,
    },
    2: {
      tag: 'Zero Agency Bloat',
      text: 'No middle managers here. Just direct dev work.',
      showCta: false,
    },
    3: {
      tag: 'Core Capabilities',
      text: 'Next.js, Meta Growth, or VA ops? We got you covered.',
      showCta: false,
    },
    4: {
      tag: 'Direct Connection',
      text: "Let's talk! Tap below to start an inquiry.",
      showCta: true,
    },
  };

  const currentStageInfo = stageData[stage];

  return (
    <aside
      aria-label="Interactive Bitmoji Companion"
      className="fixed bottom-24 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none"
    >
      {/* Speech Bubble */}
      {isBubbleOpen && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto relative mb-3 w-[260px] sm:w-[280px] rounded-2xl bg-white border border-[#E5E7EB] p-3.5 shadow-partner-card-hover transition-all duration-300 dark:bg-[#1E2024] dark:border-[#2A2D34]"
        >
          {/* Header with pill tag & minimize toggle */}
          <div className="flex items-center justify-between pb-1.5 border-b border-[#E5E7EB] dark:border-[#2A2D34]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#E5B238]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              {currentStageInfo.tag}
            </span>

            <button
              type="button"
              onClick={() => {
                setIsBubbleOpen(false);
                setHasInteracted(true);
              }}
              aria-label="Minimize companion message"
              className="rounded-full p-1 text-[#6B7280] hover:text-[#121316] hover:bg-[#FBFBFA] transition-colors dark:text-[#9CA3AF] dark:hover:text-white dark:hover:bg-[#2A2D34]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Speech Text */}
          <p className="mt-2 text-xs font-semibold leading-relaxed text-[#121316] dark:text-[#E5E7EB]">
            "{currentStageInfo.text}"
          </p>

          {/* Stage 4 Direct Inquiry CTA Link */}
          {currentStageInfo.showCta && (
            <div className="mt-2.5 pt-2 border-t border-[#E5E7EB] dark:border-[#2A2D34]">
              <Link
                href="/inquiry"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#D4AF37] px-3 py-1.5 text-xs font-bold text-[#121316] transition-colors hover:bg-[#B8860B] hover:text-white shadow-sm"
              >
                <span>Start an Inquiry</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          {/* Speech Bubble Arrow Pointer Tail */}
          <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-[#E5E7EB] bg-white dark:bg-[#1E2024] dark:border-[#2A2D34]" />
        </div>
      )}

      {/* Bitmoji Character Avatar Button & Minimize Indicator */}
      <div className="pointer-events-auto relative flex items-center justify-center group">
        <button
          type="button"
          onClick={() => {
            setIsBubbleOpen(!isBubbleOpen);
            setHasInteracted(true);
          }}
          aria-expanded={isBubbleOpen}
          aria-label="Toggle Bitmoji Companion speech bubble"
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-[#1E2024] p-1 shadow-partner-card transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] dark:bg-[#1E2024] dark:border-[#D4AF37]"
        >
          {/* Vector Bitmoji SVG Character */}
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {/* Metallic Gold Gradient for Lapel Pin */}
              <linearGradient id="goldPinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F3C75B" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B8860B" />
              </linearGradient>

              {/* Charcoal Blazer Gradient */}
              <linearGradient id="charcoalBlazer" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2A2D34" />
                <stop offset="100%" stopColor="#1E2024" />
              </linearGradient>
            </defs>

            {/* --- BODY & CLOTHING --- */}
            {/* White Dress Shirt Collar */}
            <polygon points="50,66 38,76 62,76" fill="#FFFFFF" />
            <polygon points="50,69 44,82 56,82" fill="#E5E7EB" />

            {/* Architectural Matte Charcoal Blazer (#1E2024) */}
            <path
              d="M 22 100 C 22 78 35 72 45 74 L 50 86 L 55 74 C 65 72 78 78 78 100 Z"
              fill="url(#charcoalBlazer)"
              stroke="#121316"
              strokeWidth="1.5"
            />

            {/* Left & Right Lapels */}
            <polygon points="36,73 45,74 48,88 38,82" fill="#1E2024" stroke="#121316" strokeWidth="1" />
            <polygon points="64,73 55,74 52,88 62,82" fill="#1E2024" stroke="#121316" strokeWidth="1" />

            {/* Brushed Marigold Gold Lapel Pin (#D4AF37) on Left Chest */}
            <circle cx="39" cy="80" r="3.2" fill="url(#goldPinGrad)" stroke="#B8860B" strokeWidth="0.8" />
            <polygon points="39,78 40.5,80 39,82 37.5,80" fill="#FFFFFF" opacity="0.8" />

            {/* --- HEAD & FACE --- */}
            {/* Neck */}
            <rect x="44" y="58" width="12" height="12" rx="4" fill="#F1C27D" />

            {/* Head Base */}
            <ellipse cx="50" cy="46" rx="20" ry="22" fill="#F1C27D" />

            {/* Ears */}
            <circle cx="29" cy="47" r="4.5" fill="#E0A96D" />
            <circle cx="71" cy="47" r="4.5" fill="#E0A96D" />

            {/* Hair - Sleek Modern Side Part in Matte Charcoal */}
            <path
              d="M 28 44 C 28 26 40 22 50 22 C 64 22 72 28 72 42 C 68 34 58 30 48 32 C 38 34 32 38 28 44 Z"
              fill="#1E2024"
            />
            {/* Hair strands detail */}
            <path
              d="M 33 34 Q 45 28 55 31"
              stroke="#2A2D34"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* --- DYNAMIC FACIAL EXPRESSIONS BY STAGE --- */}
            {/* Eyebrows */}
            {stage === 1 && (
              <>
                <path d="M 38 38 Q 43 36 47 38" stroke="#121316" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 53 38 Q 57 36 62 38" stroke="#121316" strokeWidth="2" fill="none" strokeLinecap="round" />
              </>
            )}
            {stage === 2 && (
              <>
                {/* Thinking / Observant: One eyebrow raised */}
                <path d="M 38 36 Q 43 33 47 37" stroke="#121316" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 53 39 Q 57 38 62 40" stroke="#121316" strokeWidth="2" fill="none" strokeLinecap="round" />
              </>
            )}
            {stage === 3 && (
              <>
                {/* Confident Wink */}
                <path d="M 38 37 Q 43 35 47 37" stroke="#121316" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 53 38 Q 57 36 62 39" stroke="#121316" strokeWidth="2" fill="none" strokeLinecap="round" />
              </>
            )}
            {stage === 4 && (
              <>
                {/* Cheerful celebratory high brows */}
                <path d="M 37 36 Q 42 33 47 36" stroke="#121316" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 53 36 Q 58 33 63 36" stroke="#121316" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </>
            )}

            {/* Eyes */}
            {stage === 1 && (
              <>
                {/* Friendly Eyes */}
                <circle cx="43" cy="44" r="2.8" fill="#121316" />
                <circle cx="57" cy="44" r="2.8" fill="#121316" />
                <circle cx="42" cy="43" r="0.9" fill="#FFFFFF" />
                <circle cx="56" cy="43" r="0.9" fill="#FFFFFF" />
              </>
            )}
            {stage === 2 && (
              <>
                {/* Observant, thoughtful eyes glancing slightly up */}
                <circle cx="43" cy="43" r="2.6" fill="#121316" />
                <circle cx="57" cy="43" r="2.6" fill="#121316" />
                <circle cx="42" cy="42" r="0.8" fill="#FFFFFF" />
                <circle cx="56" cy="42" r="0.8" fill="#FFFFFF" />
              </>
            )}
            {stage === 3 && (
              <>
                {/* Confident Wink: Left eye open, right eye winking curve */}
                <circle cx="43" cy="44" r="2.8" fill="#121316" />
                <circle cx="42" cy="43" r="0.9" fill="#FFFFFF" />
                <path d="M 54 44 Q 57 41 61 44" stroke="#121316" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </>
            )}
            {stage === 4 && (
              <>
                {/* Cheerful bright open eyes */}
                <circle cx="43" cy="43.5" r="3.2" fill="#121316" />
                <circle cx="57" cy="43.5" r="3.2" fill="#121316" />
                <circle cx="42" cy="42" r="1.1" fill="#FFFFFF" />
                <circle cx="56" cy="42" r="1.1" fill="#FFFFFF" />
              </>
            )}

            {/* Cheeks blush in stage 1 & 4 */}
            {(stage === 1 || stage === 4) && (
              <>
                <ellipse cx="37" cy="49" rx="3.5" ry="2" fill="#FF8A8A" opacity="0.35" />
                <ellipse cx="63" cy="49" rx="3.5" ry="2" fill="#FF8A8A" opacity="0.35" />
              </>
            )}

            {/* Mouth */}
            {stage === 1 && (
              /* Warm friendly smile */
              <path d="M 44 52 Q 50 57 56 52" stroke="#A8483B" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
            {stage === 2 && (
              /* Thinking slight wry grin */
              <path d="M 45 53 Q 51 54 57 51" stroke="#A8483B" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
            {stage === 3 && (
              /* Confident half smile with tooth hint */
              <path d="M 44 52 Q 51 57 58 51" stroke="#A8483B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            )}
            {stage === 4 && (
              /* Cheerful open-mouthed expression */
              <path
                d="M 43 51 Q 50 61 57 51 Z"
                fill="#8C2C24"
                stroke="#8C2C24"
                strokeWidth="1"
              />
            )}

            {/* --- DYNAMIC HAND GESTURES BY STAGE --- */}
            {stage === 1 && (
              /* Stage 1: Waving Right Hand */
              <g className="animate-wave-hand origin-bottom-left" style={{ transformOrigin: '76px 76px' }}>
                <path
                  d="M 76 76 Q 84 62 86 52 Q 88 51 89 53 Q 87 63 80 78 Z"
                  fill="#F1C27D"
                  stroke="#E0A96D"
                  strokeWidth="0.8"
                />
                {/* Palm and fingers */}
                <circle cx="87" cy="51" r="5" fill="#F1C27D" />
                <rect x="84" y="44" width="2" height="6" rx="1" fill="#F1C27D" />
                <rect x="87" y="43" width="2" height="7" rx="1" fill="#F1C27D" />
                <rect x="90" y="45" width="2" height="5" rx="1" fill="#F1C27D" />
              </g>
            )}

            {stage === 2 && (
              /* Stage 2: Thinking Hand near Chin */
              <g>
                <path
                  d="M 56 68 Q 54 57 51 56"
                  stroke="#F1C27D"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="51" cy="56" r="2.5" fill="#F1C27D" />
              </g>
            )}

            {stage === 3 && (
              /* Stage 3: Confident Thumbs-up */
              <g>
                {/* Arm cuff */}
                <rect x="74" y="70" width="7" height="6" rx="2" fill="#1E2024" />
                {/* Fist */}
                <circle cx="82" cy="70" r="4.5" fill="#F1C27D" />
                {/* Thumb pointing up */}
                <path
                  d="M 81 67 L 81 60 Q 82 58 84 59 L 84 68 Z"
                  fill="#F1C27D"
                  stroke="#E0A96D"
                  strokeWidth="0.5"
                />
              </g>
            )}

            {stage === 4 && (
              /* Stage 4: Open hand gesture pointing to inquiry */
              <g>
                <path
                  d="M 74 76 Q 86 74 88 68"
                  stroke="#F1C27D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="89" cy="67" r="3" fill="#F1C27D" />
              </g>
            )}
          </svg>

          {/* Golden Stage Indicator Badge */}
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-black text-[#121316] shadow-sm">
            {stage}
          </span>
        </button>

        {/* Floating reopen tooltip if bubble was closed */}
        {!isBubbleOpen && (
          <button
            type="button"
            onClick={() => setIsBubbleOpen(true)}
            aria-label="Open speech bubble"
            className="absolute -top-2 right-0 flex items-center gap-1 rounded-full bg-[#121316] px-2 py-0.5 text-[9px] font-bold text-white shadow-md transition-transform hover:scale-105"
          >
            <MessageSquare className="h-2.5 w-2.5 text-[#D4AF37]" />
            <span>Chat</span>
          </button>
        )}
      </div>
    </aside>
  );
};
export default BitmojiCompanion;
