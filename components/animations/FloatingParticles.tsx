"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

export interface FloatingParticlesProps {
  count?: number;
  className?: string;
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

const MAX_PARTICLES = 80;
const MOUSE_RADIUS = 120;
const MOUSE_STRENGTH = 0.025;

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

/**
 * Canvas-based floating particle field that drifts and reacts to mouse cursor.
 * Auto-disables on: touch devices, reduced motion, or when scrolled offscreen.
 * Cleans up rAF + event listeners + IntersectionObserver on unmount.
 */
export function FloatingParticles({
  count = 60,
  className,
  color = "var(--accent-purple)",
}: FloatingParticlesProps) {
  const reduced = useReducedMotionSafe();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef<boolean>(true);

  const initParticles = useCallback(
    (width: number, height: number, particleCount: number) => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      }));
    },
    []
  );

  useEffect(() => {
    if (reduced || isTouchDevice()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cappedCount = Math.min(count, MAX_PARTICLES);

    // Size canvas to its rendered size
    const resize = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas;
      canvas.width = w;
      canvas.height = h;
      initParticles(w, h, cappedCount);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse tracking (relative to canvas)
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mouseleave", onMouseLeave);

    // IntersectionObserver — pause loop when canvas is offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
        if (entry.isIntersecting && rafRef.current === null) {
          loop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const loop = () => {
      if (!activeRef.current) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(loop);

      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const { x: mx, y: my } = mouseRef.current;
      const particles = particlesRef.current;

      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * MOUSE_STRENGTH;
          p.vy += (dy / dist) * force * MOUSE_STRENGTH;
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -p.radius) p.x = w + p.radius;
        if (p.x > w + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = h + p.radius;
        if (p.y > h + p.radius) p.y = -p.radius;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    loop();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
      ro.disconnect();
    };
  }, [reduced, count, color, initParticles]);

  // Render nothing on reduced motion or touch
  if (reduced || (typeof window !== "undefined" && isTouchDevice())) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      aria-hidden="true"
    />
  );
}
