"use client";

import { useEffect, useRef, useCallback } from "react";
import type { TechNode } from "@/types";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  name: string;
  icon: string;
  radius: number;
  alpha: number;
}

/* ─── Helpers ────────────────────────────────────────────── */

function getIcon(name: string): LucideIcon | null {
  const icons = LucideIcons as unknown as Record<string, LucideIcon | undefined>;
  return icons[name] ?? null;
}

function initParticles(nodes: TechNode[], w: number, h: number): Particle[] {
  return nodes.map((node, i) => {
    const cols = Math.ceil(Math.sqrt(nodes.length));
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellW = w / cols;
    const cellH = h / Math.ceil(nodes.length / cols);
    const baseX = cellW * col + cellW / 2 + (Math.random() - 0.5) * cellW * 0.4;
    const baseY = cellH * row + cellH / 2 + (Math.random() - 0.5) * cellH * 0.4;
    return {
      x: baseX,
      y: baseY,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      baseX,
      baseY,
      name: node.name,
      icon: node.icon,
      radius: 28,
      alpha: 0.85 + Math.random() * 0.15,
    };
  });
}

/* ─── Static grid fallback ───────────────────────────────── */

function StaticGrid({ nodes }: { nodes: TechNode[] }) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 py-8">
      {nodes.map((node) => {
        const Icon = getIcon(node.icon);
        return (
          <div
            key={node.name}
            className="flex flex-col items-center gap-2 glass rounded-xl p-3"
          >
            {Icon ? (
              <Icon
                size={24}
                style={{ color: "var(--accent-purple)" }}
                aria-hidden="true"
              />
            ) : (
              <span
                className="text-lg font-bold"
                style={{ color: "var(--accent-purple)" }}
                aria-hidden="true"
              >
                {node.name[0]}
              </span>
            )}
            <span className="text-xs text-muted-foreground text-center leading-tight">
              {node.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */

interface TechCanvasProps {
  nodes: TechNode[];
  className?: string;
}

const CONNECT_DIST = 160;
const REPEL_DIST = 100;
const REPEL_STRENGTH = 3;
const ATTRACT_BACK = 0.015;
const DAMPING = 0.88;
const MAX_SPEED = 1.8;

export function TechCanvas({ nodes, className }: TechCanvasProps) {
  const reduced = useReducedMotionSafe();
  const mouse = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const visibleRef = useRef(false);
  const mouseRef = useRef(mouse);

  // Keep mouseRef synced without triggering re-mount
  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  // Detect touch device
  const isTouch =
    typeof window !== "undefined" &&
    (navigator.maxTouchPoints > 0 || "ontouchstart" in window);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const rect = canvas.getBoundingClientRect();
    const localMx = mx - rect.left;
    const localMy = my - rect.top;

    // Update physics
    for (const p of particles) {
      const dx = localMx - p.x;
      const dy = localMy - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPEL_DIST && dist > 0) {
        const force = (REPEL_DIST - dist) / REPEL_DIST;
        p.vx -= (dx / dist) * force * REPEL_STRENGTH;
        p.vy -= (dy / dist) * force * REPEL_STRENGTH;
      }

      // Attract toward base
      p.vx += (p.baseX - p.x) * ATTRACT_BACK;
      p.vy += (p.baseY - p.y) * ATTRACT_BACK;

      // Damping
      p.vx *= DAMPING;
      p.vy *= DAMPING;

      // Clamp speed
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > MAX_SPEED) {
        p.vx = (p.vx / speed) * MAX_SPEED;
        p.vy = (p.vy / speed) * MAX_SPEED;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Boundary bounce
      if (p.x < p.radius) { p.x = p.radius; p.vx = Math.abs(p.vx); }
      if (p.x > width - p.radius) { p.x = width - p.radius; p.vx = -Math.abs(p.vx); }
      if (p.y < p.radius) { p.y = p.radius; p.vy = Math.abs(p.vy); }
      if (p.y > height - p.radius) { p.y = height - p.radius; p.vy = -Math.abs(p.vy); }
    }

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const p of particles) {
      // Glow circle
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius + 10);
      gradient.addColorStop(0, `rgba(168,85,247,0.18)`);
      gradient.addColorStop(1, `rgba(168,85,247,0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius + 10, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Background circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(17,24,39,0.85)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(168,85,247,0.4)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label text
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `rgba(245,245,247,${p.alpha})`;
      ctx.font = "bold 8px 'Geist Sans', sans-serif";
      ctx.fillText(p.name, p.x, p.y);
    }
  }, []);

  // Use a ref so the loop can schedule itself without being in its own deps
  const loopRef = useRef<() => void>(() => {});

  const loop = useCallback(() => {
    if (!visibleRef.current) return;
    draw();
    rafRef.current = requestAnimationFrame(() => loopRef.current());
  }, [draw]);

  // Keep loopRef current so the RAF callback always calls the latest version
  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => loopRef.current());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w;
      canvas.height = h;
      particlesRef.current = initParticles(nodes, w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    // IntersectionObserver to pause when offscreen
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          visibleRef.current = true;
          startLoop();
        } else {
          visibleRef.current = false;
          stopLoop();
        }
      },
      { threshold: 0.1 }
    );
    observerRef.current.observe(canvas);

    return () => {
      stopLoop();
      ro.disconnect();
      observerRef.current?.disconnect();
    };
  }, [nodes, startLoop, stopLoop]);

  if (reduced || isTouch) {
    return <StaticGrid nodes={nodes} />;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full", className)}
      aria-hidden="true"
      style={{ height: "420px" }}
    />
  );
}
