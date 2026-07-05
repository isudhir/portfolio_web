"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { navigation } from "@/data/navigation";
import { mascotMessages, mascotKonamiMessage } from "@/data/mascot";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const sectionIds = navigation.map((item) => item.id);
const BUBBLE_DURATION_MS = 2500;

// Minimal shape of the player instance we use (setSpeed only). Kept loose so we
// don't couple to the player's full type surface.
type LottiePlayer = { setSpeed: (speed: number) => void } | null;

/** Auto-hiding bubble that starts visible and hides itself after a timeout. */
function Bubble({ text, reduced }: { text: string; reduced: boolean }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), BUBBLE_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={text}
          initial={reduced ? { opacity: 1 } : { opacity: 0, x: -8, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, x: -8, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "glass rounded-xl border border-border/50 px-3 py-1.5 shadow-lg",
            "max-w-[40vw] text-sm font-medium whitespace-nowrap text-foreground sm:max-w-none",
          )}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Fixed left-center animated mascot. Reuses useActiveSection to know the current
 * section; on each change it bounces, briefly speeds up the Lottie, and shows an
 * auto-hiding speech bubble with that section's text. Visible on all screens
 * (smaller on mobile). Static under reduced motion.
 */
export function Mascot() {
  const activeId = useActiveSection(sectionIds);
  const reduced = useReducedMotionSafe();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const controls = useAnimationControls();
  const playerRef = useRef<LottiePlayer>(null);

  useEffect(() => {
    if (reduced) return;
    void controls.start({
      y: [0, -12, 0],
      transition: { duration: 0.5, ease: "easeOut" },
    });
    const player = playerRef.current;
    if (!player || typeof player.setSpeed !== "function") return;
    player.setSpeed(2);
    const timer = setTimeout(() => player.setSpeed(1), 700);
    return () => clearTimeout(timer);
  }, [activeId, reduced, controls]);

  // Konami reaction: spin + celebratory bubble for a few seconds.
  const [konami, setKonami] = useState(false);
  const konamiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKonami = () => {
      setKonami(true);
      if (!reduced) {
        void controls.start({
          rotate: [0, 360],
          transition: { duration: 0.8, ease: "easeInOut" },
        });
      }
      if (konamiTimer.current) clearTimeout(konamiTimer.current);
      konamiTimer.current = setTimeout(() => setKonami(false), 4000);
    };
    window.addEventListener("portfolio:konami", onKonami);
    return () => {
      window.removeEventListener("portfolio:konami", onKonami);
      if (konamiTimer.current) clearTimeout(konamiTimer.current);
    };
  }, [controls, reduced]);

  const size = isMobile ? 72 : 112;
  const bubbleText = konami ? mascotKonamiMessage : mascotMessages[activeId];

  return (
    <div
      className="fixed left-3 top-1/2 z-40 flex -translate-y-1/2 items-center gap-2 sm:left-5"
      aria-hidden="true"
    >
      <motion.div animate={controls} style={{ width: size, height: size }}>
        <DotLottieReact
          src="/mascot/character.lottie"
          loop
          autoplay={!reduced}
          dotLottieRefCallback={(dotLottie) => {
            playerRef.current = dotLottie as unknown as LottiePlayer;
          }}
          // Explicit integer square + block display: avoids the dotlottie-web
          // buffer-size mismatch warning caused by a non-square (inline canvas
          // baseline gap + fractional DPR) box.
          style={{ display: "block", width: size, height: size }}
        />
      </motion.div>

      {bubbleText && (
        <Bubble key={konami ? "konami" : activeId} text={bubbleText} reduced={reduced} />
      )}
    </div>
  );
}
