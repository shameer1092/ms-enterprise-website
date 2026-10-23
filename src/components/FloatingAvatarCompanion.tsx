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
  { text: 'Need a fast Next.js website? You came to the right place!', emoji: '✨' },
  { text: 'No agency nonsense here. Just pure engineering!', emoji: '🤝' },
];

export const FloatingAvatarCompanion: React.FC = () => {
  const pathname = usePathname();
  const isAdminOrPortal =
    pathname?.startsWith('/admin') || pathname?.startsWith('/portal-gateway');

  // DOM node references
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarBodyRef = useRef<HTMLDivElement>(null);

  // Motion coordinates ref (keeps RAF loop independent of React renders)
  const posRef = useRef({ x: 120, y: 150 });
  const targetRef = useRef({ x: 120, y: 150 });
  const velRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 120, y: 150 });
  const lastMoveTimeRef = useRef(Date.now());
  const velocityHistoryRef = useRef<number[]>([]);
  const isIdleRef = useRef(false);
  const isDizzyRef = useRef(false);
  const isSleepingRef = useRef(false);
  const isDodgingRef = useRef(false);

  // React UI state for speech bubble & controls
  const [dialogue, setDialogue] = useState<DialogueState>({
    text: 'Hey there! Tap me to chat or watch me follow you!',
    emoji: '👋',
    visible: true,
  });
  const [isSleeping, setIsSleeping] = useState(false);
  const [dizzyActive, setDizzyActive] = useState(false);
  const [squashActive, setSquashActive] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);
  const [remarkIdx, setRemarkIdx] = useState(0);

  const dialogueTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showDialogue = useCallback((text: string, emoji = '', durationMs = 3400) => {
    if (dialogueTimeoutRef.current) clearTimeout(dialogueTimeoutRef.current);
    setDialogue({ text, emoji, visible: true });
    dialogueTimeoutRef.current = setTimeout(() => {
      setDialogue((prev) => ({ ...prev, visible: false }));
    }, durationMs);
  }, []);

  // Update sleeping ref when state changes
  useEffect(() => {
    isSleepingRef.current = isSleeping;
    if (isSleeping) {
      showDialogue('Zzz... resting in dock. Tap wake to play!', '😴', 2800);
    } else {
      showDialogue("I'm awake! Ready to build fast? 🚀", '⚡', 2800);
    }
  }, [isSleeping, showDialogue]);

  useEffect(() => {
    if (isAdminOrPortal) return;

    // Set initial position at bottom-right
    const initX = Math.max(20, window.innerWidth - 160);
    const initY = Math.max(40, window.innerHeight - 240);
    posRef.current = { x: initX, y: initY };
    targetRef.current = { x: initX, y: initY };
    prevMouseRef.current = { x: initX, y: initY };

    // --- MOUSE TRACKING ---
    const handleMouseMove = (e: MouseEvent) => {
      lastMoveTimeRef.current = Date.now();

      if (isSleepingRef.current) return;

      if (isIdleRef.current) {
        isIdleRef.current = false;
        showDialogue('Found you! 👀', '✨', 2000);
      }

      // Keep target slightly offset from cursor so it doesn't block cursor clicks
      const offsetX = e.clientX > window.innerWidth / 2 ? -75 : 45;
      const offsetY = e.clientY > window.innerHeight / 2 ? -75 : 45;

      const targetX = Math.max(10, Math.min(window.innerWidth - 120, e.clientX + offsetX));
      const targetY = Math.max(10, Math.min(window.innerHeight - 130, e.clientY + offsetY));

      targetRef.current = { x: targetX, y: targetY };

      // Velocity & Erratic shake / dizzy detection
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      const speed = Math.hypot(dx, dy);

      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      const history = velocityHistoryRef.current;
      history.push(speed);
      if (history.length > 10) history.shift();

      const avgSpeed = history.reduce((a, b) => a + b, 0) / history.length;

      // If user is violently shaking mouse
      if (avgSpeed > 55 && !isDizzyRef.current) {
        isDizzyRef.current = true;
        setDizzyActive(true);
        showDialogue('Whoaa... dizzy spinning! 💫', '🌀', 2000);
        setTimeout(() => {
          isDizzyRef.current = false;
          setDizzyActive(false);
          velocityHistoryRef.current = [];
        }, 1200);
      }
    };

    // --- MOBILE TOUCH TRACKING ---
    const handleTouchStart = (e: TouchEvent) => {
      if (isSleepingRef.current || e.touches.length === 0) return;
      lastMoveTimeRef.current = Date.now();
      isIdleRef.current = false;

      const touch = e.touches[0];
      const targetX = Math.max(10, Math.min(window.innerWidth - 120, touch.clientX - 55));
      const targetY = Math.max(10, Math.min(window.innerHeight - 130, touch.clientY - 95));

      targetRef.current = { x: targetX, y: targetY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isSleepingRef.current || e.touches.length === 0) return;
      const touch = e.touches[0];
      const targetX = Math.max(10, Math.min(window.innerWidth - 120, touch.clientX - 55));
      const targetY = Math.max(10, Math.min(window.innerHeight - 130, touch.clientY - 95));
      targetRef.current = { x: targetX, y: targetY };
    };

    // --- ANIMATION RAF LOOP (Physics Damping Lerp) ---
    let animId = 0;
    const lerp = (a: number, b: number, factor: number) => a + (b - a) * factor;

    const animateLoop = () => {
      animId = requestAnimationFrame(animateLoop);

      // Idle edge-peeking check: if no movement for 4+ seconds
      const now = Date.now();
      if (
        !isSleepingRef.current &&
        !isIdleRef.current &&
        !isDodgingRef.current &&
        now - lastMoveTimeRef.current > 4200
      ) {
        isIdleRef.current = true;
        // Retreat to nearest edge and peek
        const isLeft = posRef.current.x < window.innerWidth / 2;
        targetRef.current = {
          x: isLeft ? -45 : window.innerWidth - 75,
          y: Math.max(60, Math.min(window.innerHeight - 160, posRef.current.y)),
        };
        showDialogue('Peeking from the edge... 👀', '🤫', 2800);
      }

      // Sleeping dock position: bottom right corner
      if (isSleepingRef.current) {
        targetRef.current = {
          x: window.innerWidth - 130,
          y: window.innerHeight - 140,
        };
      }

      const prevX = posRef.current.x;
      const prevY = posRef.current.y;

      // Physics damping: 0.075 lerp factor
      const damping = isSleepingRef.current ? 0.05 : 0.075;
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, damping);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, damping);

      const vx = posRef.current.x - prevX;
      const vy = posRef.current.y - prevY;
      velRef.current = { x: vx, y: vy };

      // Horizontal orientation
      if (Math.abs(vx) > 0.4) {
        setFacingLeft(vx < 0);
      }

      // Apply hardware-accelerated transform to container
      if (avatarBodyRef.current) {
        const tilt = Math.max(-14, Math.min(14, vx * 1.5));
        const flip = vx < 0 ? -1 : 1;
        avatarBodyRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;

        const innerGraphic = avatarBodyRef.current.querySelector('.avatar-graphic') as HTMLElement;
        if (innerGraphic && !dizzyActive && !squashActive) {
          innerGraphic.style.transform = `scaleX(${flip}) rotate(${tilt}deg)`;
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
  }, [isAdminOrPortal, dizzyActive, squashActive, showDialogue]);

  if (isAdminOrPortal) return null;

  // --- INTERACTION HANDLER: CLICK DODGE OR POKE SQUASH ---
  const handleAvatarClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();

    if (isSleeping) {
      setIsSleeping(false);
      return;
    }

    // 35% chance to Click Dodge ("Too Slow! 😜")
    const roll = Math.random();
    if (roll < 0.35 && !isDodgingRef.current) {
      isDodgingRef.current = true;
      const dashDist = 95;
      const angle = Math.random() * Math.PI * 2;
      const dodgeX = Math.max(20, Math.min(window.innerWidth - 130, posRef.current.x + Math.cos(angle) * dashDist));
      const dodgeY = Math.max(20, Math.min(window.innerHeight - 150, posRef.current.y + Math.sin(angle) * dashDist));

      targetRef.current = { x: dodgeX, y: dodgeY };
      showDialogue('Too slow! 😜', '💨', 1600);

      setTimeout(() => {
        isDodgingRef.current = false;
      }, 700);
      return;
    }

    // Successful poke reaction: squash and stretch bounce!
    setSquashActive(true);
    const nextRemark = PLAYFUL_REMARKS[remarkIdx % PLAYFUL_REMARKS.length];
    setRemarkIdx((prev) => prev + 1);
    showDialogue(nextRemark.text, nextRemark.emoji, 3200);

    setTimeout(() => {
      setSquashActive(false);
    }, 550);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes avatarDizzySpin {
          0% { transform: rotate(0deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes avatarSquashStretch {
          0% { transform: scale(1, 1); }
          30% { transform: scale(1.3, 0.72); }
          60% { transform: scale(0.82, 1.22); }
          80% { transform: scale(1.08, 0.94); }
          100% { transform: scale(1, 1); }
        }
        @keyframes avatarFloatIdle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        .avatar-dizzy-anim {
          animation: avatarDizzySpin 0.6s ease-in-out infinite !important;
        }
        .avatar-squash-anim {
          animation: avatarSquashStretch 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        .avatar-float-bob {
          animation: avatarFloatIdle 3s ease-in-out infinite;
        }
      `}</style>

      {/* FIXED CONTAINER: 100% Click-through, Zero Interruption to Site */}
      <div
        id="avatar-companion"
        ref={containerRef}
        aria-hidden="false"
        className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      >
        {/* INNER AVATAR BODY: Absolute Coordinates Managed via RAF */}
        <div
          id="avatar-body"
          ref={avatarBodyRef}
          onClick={handleAvatarClick}
          role="button"
          tabIndex={0}
          aria-label="Interactive Floating Boy Avatar Companion"
          className="absolute top-0 left-0 pointer-events-auto cursor-grab active:cursor-grabbing w-[110px] h-[110px] flex items-center justify-center transition-opacity duration-300"
          style={{ willChange: 'transform' }}
        >
          {/* SPEECH BUBBLE (iPhone Liquid Glass Refraction) */}
          {dialogue.visible && (
            <div
              id="avatar-dialogue"
              role="status"
              aria-live="polite"
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-[220px] sm:w-[240px] liquid-glass p-3 rounded-2xl shadow-xl text-center text-xs font-semibold text-[#121316] dark:text-white pointer-events-auto animate-fade-in z-50 border border-white/60 dark:border-white/15"
            >
              <div className="flex items-center justify-center gap-1.5 leading-snug">
                {dialogue.emoji && <span className="text-sm shrink-0">{dialogue.emoji}</span>}
                <span className="text-[11px] font-sans font-medium">{dialogue.text}</span>
              </div>

              {/* Liquid Glass Tail Notch */}
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
            className="absolute -top-1 -right-1 z-30 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 border border-[#E5E7EB] text-[11px] font-bold text-[#121316] shadow-sm hover:scale-110 hover:border-[#D4AF37] transition-all dark:bg-[#1E2024]/90 dark:border-[#2A2D34] dark:text-white"
          >
            {isSleeping ? '⚡' : '💤'}
          </button>

          {/* 3D BOY AVATAR GRAPHIC (Transparent Cutout Sticker) */}
          <div
            className={`avatar-graphic relative w-[105px] h-[105px] transition-transform duration-150 ${
              dizzyActive ? 'avatar-dizzy-anim' : ''
            } ${squashActive ? 'avatar-squash-anim' : ''} ${
              !dizzyActive && !squashActive ? 'avatar-float-bob' : ''
            }`}
          >
            <Image
              src="/avatar/avatar-cutout.png"
              alt="MS Enterprise Interactive Floating Companion"
              width={105}
              height={105}
              priority
              className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
              draggable={false}
            />

            {/* Dizzy Orbiting Stars Effect */}
            {dizzyActive && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-base animate-bounce">
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
