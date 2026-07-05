"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useKonami } from "@/hooks/useKonami";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { mulberry32 } from "@/lib/seeded";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  color: string;
  size: number;
}

const DURATION_MS = 2600;

/**
 * Konami-code easter egg: full-screen confetti burst in theme colors and a
 * "portfolio:konami" CustomEvent (the mascot reacts to it). No-op under
 * reduced motion.
 */
export function KonamiEasterEgg() {
  const reduced = useReducedMotionSafe();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  const unlock = useCallback(() => {
    if (reduced) return;
    window.dispatchEvent(new CustomEvent("portfolio:konami"));
    setActive(true);
  }, [reduced]);

  useKonami(unlock);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!canvas || !ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(document.documentElement);
    const colors = ["--accent-purple", "--accent-indigo", "--accent-cyan"].map(
      (v) => styles.getPropertyValue(v).trim() || "#ffffff"
    );

    const rand = mulberry32(Date.now() >>> 0);
    const particles: Particle[] = Array.from({ length: 140 }, () => ({
      x: w / 2,
      y: h / 2,
      vx: (rand() - 0.5) * 18,
      vy: -6 - rand() * 11,
      rot: rand() * Math.PI,
      vr: (rand() - 0.5) * 0.3,
      color: colors[Math.floor(rand() * colors.length)],
      size: 4 + rand() * 6,
    }));

    const started = performance.now();
    const frame = (t: number) => {
      const elapsed = t - started;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.vy += 0.25;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - elapsed / DURATION_MS);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
      if (elapsed < DURATION_MS) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        rafRef.current = null;
        setActive(false);
      }
    };
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9995]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
