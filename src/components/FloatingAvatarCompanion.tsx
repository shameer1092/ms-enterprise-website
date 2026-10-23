'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface DialogueState {
  text: string;
  emoji?: string;
  visible: boolean;
}

const PLAYFUL_REMARKS = [
  { text: 'Hey, watch the hair!', emoji: '😎' },
  { text: 'Checking your code for bugs... found 99!', emoji: '🐛' },
  { text: 'Deploying directly to production! 🚀', emoji: '🔥' },
  { text: "Looking for Rana or Moiz? They're coding right now! 💻", emoji: '⚡' },
  { text: "4 years of experience and I still don't sleep! ☕", emoji: '👀' },
  { text: 'Sub-second page speeds engineered here!', emoji: '✨' },
  { text: 'No agency nonsense here. Just pure code!', emoji: '🤝' },
];

export const FloatingAvatarCompanion: React.FC = () => {
  const pathname = usePathname();
  const isAdminOrPortal =
    pathname?.startsWith('/admin') || pathname?.startsWith('/portal-gateway');

  // DOM node references
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarBodyRef = useRef<HTMLDivElement>(null);

  // Motion physics refs (snappy tracking without React re-render overhead)
  const posRef = useRef({ x: 120, y: 150 });
  const targetRef = useRef({ x: 120, y: 150 });
  const prevMouseRef = useRef({ x: 120, y: 150 });
  const lastMoveTimeRef = useRef(Date.now());
  const mouseStoppedRef = useRef(false);

  // Reactive state flags
  const isWhippingRef = useRef(false);
  const isDodgingRef = useRef(false);
  const isSleepingRef = useRef(false);
  const isInspectingRef = useRef(false);
  const isEdgePeekingRef = useRef(false);

  // React UI state for animation triggers & speech bubble
  const [dialogue, setDialogue] = useState<DialogueState>({
    text: 'Hey there! Ready to build something fast?',
    emoji: '👋',
    visible: true,
  });
  const [isSleeping, setIsSleeping] = useState(false);
  const [whipSpinActive, setWhipSpinActive] = useState(false);
  const [dodgeBackflipActive, setDodgeBackflipActive] = useState(false);
  const [squashActive, setSquashActive] = useState(false);
  const [isInspecting, setIsInspecting] = useState(false);
  const [isEdgePeeking, setIsEdgePeeking] = useState(false);
  const [remarkIdx, setRemarkIdx] = useState(0);

  const dialogueTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showDialogue = useCallback((text: string, emoji = '', durationMs = 3000) => {
    if (dialogueTimeoutRef.current) clearTimeout(dialogueTimeoutRef.current);
    setDialogue({ text, emoji, visible: true });
    dialogueTimeoutRef.current = setTimeout(() => {
      setDialogue((prev) => ({ ...prev, visible: false }));
    }, durationMs);
  }, []);

  useEffect(() => {
    isSleepingRef.current = isSleeping;
    if (isSleeping) {
      showDialogue('Zzz... taking a power nap. Tap ⚡ to wake me!', '😴', 2800);
    } else {
      showDialogue("I'm awake and snappy! Let's build! 🚀", '⚡', 2400);
    }
  }, [isSleeping, showDialogue]);

  useEffect(() => {
    if (isAdminOrPortal) return;

    // Set initial position near bottom-right
    const initX = Math.max(20, window.innerWidth - 140);
    const initY = Math.max(40, window.innerHeight - 200);
    posRef.current = { x: initX, y: initY };
    targetRef.current = { x: initX, y: initY };
    prevMouseRef.current = { x: initX, y: initY };

    // --- 1. SNAPPY MOUSE TRACKING WITH WHIP-SPEED DETECTOR ---
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      lastMoveTimeRef.current = now;
      mouseStoppedRef.current = false;

      // Reset idle inspection & edge peeking
      if (isInspectingRef.current) {
        isInspectingRef.current = false;
        setIsInspecting(false);
      }
      if (isEdgePeekingRef.current) {
        isEdgePeekingRef.current = false;
        setIsEdgePeeking(false);
      }

      if (isSleepingRef.current) return;

      // Target position slightly offset so avatar doesn't cover cursor pointer
      const offsetX = e.clientX > window.innerWidth / 2 ? -65 : 35;
      const offsetY = e.clientY > window.innerHeight / 2 ? -65 : 35;

      const targetX = Math.max(10, Math.min(window.innerWidth - 100, e.clientX + offsetX));
      const targetY = Math.max(10, Math.min(window.innerHeight - 105, e.clientY + offsetY));

      targetRef.current = { x: targetX, y: targetY };

      // Calculate instantaneous velocity to detect "Whip Speed"
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      const instantSpeed = Math.hypot(dx, dy);
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      // "Whip Speed" Trigger: rapid fast movement triggers single 360° comic spin
      if (instantSpeed > 48 && !isWhippingRef.current && !isDodgingRef.current) {
        isWhippingRef.current = true;
        setWhipSpinActive(true);
        const remark = Math.random() > 0.5 ? "Whoa, slow down fast and furious! 😵💫" : "I'm gonna be sick! 😵💫";
        showDialogue(remark, '🌀', 1800);

        setTimeout(() => {
          isWhippingRef.current = false;
          setWhipSpinActive(false);
        }, 550);
      }
    };

    // --- 2. MOBILE TOUCH TRACKING (INSTANT SNAP ZERO-DELAY) ---
    const handleTouchStart = (e: TouchEvent) => {
      if (isSleepingRef.current || e.touches.length === 0) return;
      lastMoveTimeRef.current = Date.now();
      mouseStoppedRef.current = false;
      isInspectingRef.current = false;
      setIsInspecting(false);

      const touch = e.touches[0];
      const targetX = Math.max(10, Math.min(window.innerWidth - 100, touch.clientX - 45));
      const targetY = Math.max(10, Math.min(window.innerHeight - 105, touch.clientY - 75));

      // Instant teleport/snap on touch tap
      targetRef.current = { x: targetX, y: targetY };
      posRef.current = { x: targetX, y: targetY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isSleepingRef.current || e.touches.length === 0) return;
      const touch = e.touches[0];
      const targetX = Math.max(10, Math.min(window.innerWidth - 100, touch.clientX - 45));
      const targetY = Math.max(10, Math.min(window.innerHeight - 105, touch.clientY - 75));
      targetRef.current = { x: targetX, y: targetY };
    };

    // --- 3. HIGH-SPEED ANIMATION RAF LOOP (LERP = 0.28 NEAR-INSTANT SNAP) ---
    let animId = 0;
    const lerp = (a: number, b: number, factor: number) => a + (b - a) * factor;

    const animateLoop = () => {
      animId = requestAnimationFrame(animateLoop);
      const now = Date.now();
      const elapsedIdle = now - lastMoveTimeRef.current;

      // Sleeping dock position: bottom right corner
      if (isSleepingRef.current) {
        targetRef.current = {
          x: window.innerWidth - 110,
          y: window.innerHeight - 115,
        };
      } else {
        // Idle Behavior 1: Comic Stretch & Inspection after 2s stationary
        if (elapsedIdle > 2000 && elapsedIdle < 5500 && !isInspectingRef.current && !isDodgingRef.current && !isWhippingRef.current) {
          isInspectingRef.current = true;
          setIsInspecting(true);
          const inspectQuotes = [
            "Inspecting what you're reading... 👀",
            'What are we building here? 🧐',
            'Code looks clean from up here! 🔍',
          ];
          showDialogue(inspectQuotes[Math.floor(Math.random() * inspectQuotes.length)], '👀', 2400);
        }

        // Idle Behavior 2: Edge Peeking after 5.5s stationary
        if (elapsedIdle >= 5500 && !isEdgePeekingRef.current && !isDodgingRef.current) {
          isEdgePeekingRef.current = true;
          setIsEdgePeeking(true);
          const isLeft = posRef.current.x < window.innerWidth / 2;
          targetRef.current = {
            x: isLeft ? -35 : window.innerWidth - 55,
            y: Math.max(60, Math.min(window.innerHeight - 140, posRef.current.y)),
          };
          showDialogue('Peeking from the edge... 👀', '🤫', 2800);
        }
      }

      // HIGH-SPEED LERP FACTOR: 0.28 (snappy, near-instant tracking)
      const lerpFactor = isSleepingRef.current ? 0.08 : 0.28;
      const prevX = posRef.current.x;
      const prevY = posRef.current.y;

      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, lerpFactor);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, lerpFactor);

      const vx = posRef.current.x - prevX;

      // Apply GPU-accelerated translate3d
      if (avatarBodyRef.current) {
        avatarBodyRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;

        const innerGraphic = avatarBodyRef.current.querySelector('.avatar-graphic') as HTMLElement;
        if (innerGraphic && !whipSpinActive && !dodgeBackflipActive && !squashActive) {
          const tilt = Math.max(-12, Math.min(12, vx * 1.2));
          const flip = vx < -0.2 ? -1 : 1;

          if (isInspecting) {
            // Curious magnifying glass lean over cursor
            innerGraphic.style.transform = 'scale(1.15) rotate(16deg)';
          } else if (isEdgePeeking) {
            const peekTilt = posRef.current.x < window.innerWidth / 2 ? 18 : -18;
            innerGraphic.style.transform = `rotate(${peekTilt}deg)`;
          } else {
            innerGraphic.style.transform = `scaleX(${flip}) rotate(${tilt}deg)`;
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    animId = requestAnimationFrame(animateLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (dialogueTimeoutRef.current) clearTimeout(dialogueTimeoutRef.current);
    };
  }, [isAdminOrPortal, whipSpinActive, dodgeBackflipActive, squashActive, isInspecting, isEdgePeeking, showDialogue]);

  if (isAdminOrPortal) return null;

  // --- 4. CLICK DODGE TRICK (360° BACKFLIP JUMP) OR POKE REACTION ---
  const handleAvatarClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    if (isSleeping) {
      setIsSleeping(false);
      return;
    }

    // 40% Chance to Click Dodge with 360° Backflip Roll
    const roll = Math.random();
    if (roll < 0.4 && !isDodgingRef.current && !whipSpinActive) {
      isDodgingRef.current = true;
      setDodgeBackflipActive(true);

      const angle = Math.random() * Math.PI * 2;
      const jumpDist = 80;
      const dodgeX = Math.max(15, Math.min(window.innerWidth - 110, posRef.current.x + Math.cos(angle) * jumpDist));
      const dodgeY = Math.max(20, Math.min(window.innerHeight - 120, posRef.current.y + Math.sin(angle) * jumpDist));

      targetRef.current = { x: dodgeX, y: dodgeY };
      showDialogue('Missed me! 😜', '💨', 1600);

      setTimeout(() => {
        isDodgingRef.current = false;
        setDodgeBackflipActive(false);
      }, 500);
      return;
    }

    // Successful Poke Reaction: Squash & Stretch Bounce
    setSquashActive(true);
    const nextRemark = PLAYFUL_REMARKS[remarkIdx % PLAYFUL_REMARKS.length];
    setRemarkIdx((prev) => prev + 1);
    showDialogue(nextRemark.text, nextRemark.emoji, 2800);

    setTimeout(() => {
      setSquashActive(false);
    }, 450);
  };

  return (
    <>
      <style jsx global>{`
        /* Single Whip-Speed 360° Tumble Roll (Non-continuous) */
        @keyframes avatarWhipRoll {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1); }
        }
        /* Click Dodge 360° Backflip */
        @keyframes avatarDodgeFlip {
          0% { transform: rotate(0deg) scale(1); }
          40% { transform: rotate(-180deg) scale(1.2); }
          100% { transform: rotate(-360deg) scale(1); }
        }
        /* Squash & Stretch Poke Reaction */
        @keyframes avatarSquashBounce {
          0% { transform: scale(1, 1); }
          25% { transform: scale(1.25, 0.75); }
          50% { transform: scale(0.85, 1.18); }
          75% { transform: scale(1.05, 0.95); }
          100% { transform: scale(1, 1); }
        }
        .avatar-whip-roll {
          animation: avatarWhipRoll 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 1 !important;
        }
        .avatar-dodge-flip {
          animation: avatarDodgeFlip 0.48s cubic-bezier(0.2, 0.8, 0.2, 1) 1 !important;
        }
        .avatar-squash-bounce {
          animation: avatarSquashBounce 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 1 !important;
        }
      `}</style>

      {/* FIXED CONTAINER: 100% Click-through, Zero Interruption to Site Buttons/Links */}
      <div
        id="avatar-companion"
        ref={containerRef}
        aria-hidden="false"
        className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      >
        {/* INNER AVATAR BODY: Compact ~90px, Snappy RAF Positioning */}
        <div
          id="avatar-body"
          ref={avatarBodyRef}
          onClick={handleAvatarClick}
          role="button"
          tabIndex={0}
          aria-label="Interactive Floating Boy Avatar Companion"
          className="absolute top-0 left-0 pointer-events-auto cursor-grab active:cursor-grabbing w-[92px] h-[92px] flex items-center justify-center transition-opacity duration-200"
          style={{ willChange: 'transform' }}
        >
          {/* SPEECH BUBBLE (iOS Liquid Glass Refraction) */}
          {dialogue.visible && (
            <div
              id="avatar-dialogue"
              role="status"
              aria-live="polite"
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-[210px] sm:w-[230px] liquid-glass p-2.5 rounded-2xl shadow-xl text-center text-xs font-semibold text-[#121316] dark:text-white pointer-events-auto animate-fade-in z-50 border border-white/60 dark:border-white/15"
            >
              <div className="flex items-center justify-center gap-1.5 leading-snug">
                {dialogue.emoji && <span className="text-sm shrink-0">{dialogue.emoji}</span>}
                <span className="text-[11px] font-sans font-medium">{dialogue.text}</span>
              </div>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/80 dark:bg-[#1E2024]/85 rotate-45 border-r border-b border-white/60 dark:border-white/15" />
            </div>
          )}

          {/* SLEEP / DISMISS MINI BUTTON */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsSleeping(!isSleeping);
            }}
            title={isSleeping ? 'Wake Up Avatar' : 'Put Avatar to Sleep'}
            className="absolute -top-1 -right-1 z-30 flex h-5 w-5 items-center justify-center rounded-full bg-white/95 border border-[#E5E7EB] text-[10px] font-bold text-[#121316] shadow-sm hover:scale-110 hover:border-[#D4AF37] transition-all dark:bg-[#1E2024]/95 dark:border-[#2A2D34] dark:text-white"
          >
            {isSleeping ? '⚡' : '💤'}
          </button>

          {/* 3D BOY AVATAR GRAPHIC (Transparent Cutout Sticker, 88px Compact) */}
          <div
            className={`avatar-graphic relative w-[88px] h-[88px] transition-transform duration-100 ${
              whipSpinActive ? 'avatar-whip-roll' : ''
            } ${dodgeBackflipActive ? 'avatar-dodge-flip' : ''} ${
              squashActive ? 'avatar-squash-bounce' : ''
            }`}
          >
            <Image
              src="/avatar/avatar-cutout.png"
              alt="MS Enterprise Interactive Floating Companion"
              width={88}
              height={88}
              priority
              className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
              draggable={false}
            />

            {/* Dizzy Stars Effect only on Whip Spin */}
            {whipSpinActive && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 text-base animate-bounce">
                <span>💫</span>
                <span>🌀</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingAvatarCompanion;
