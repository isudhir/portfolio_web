"use client";

import { useRef, useCallback, type PointerEvent } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowBorder } from "@/components/ui/GlowBorder";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";
import type { SkillGroup, Accent } from "@/types";

/**
 * Deterministic pseudo-random float in [0, 1) derived from a string.
 * Pure function — no Math.random(), safe in render.
 */
function stableRandom(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = (Math.imul(h, 0x01000193) >>> 0);
  }
  return (h >>> 0) / 0xffffffff;
}

// Resolve a lucide icon by string name, falling back to a generic circle.
function LucideIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as Record<string, any>;
  const Icon = icons[name] as React.ComponentType<{ className?: string }> | undefined;
  if (!Icon) {
    const Fallback = icons["Circle"] as React.ComponentType<{ className?: string }>;
    return <Fallback className={className} />;
  }
  return <Icon className={className} />;
}

const accentColor: Record<Accent, string> = {
  purple: "var(--accent-purple)",
  indigo: "var(--accent-indigo)",
  cyan: "var(--accent-cyan)",
};

const accentTextClass: Record<Accent, string> = {
  purple: "text-purple",
  indigo: "text-indigo",
  cyan: "text-cyan",
};

export interface SkillGroupCardProps {
  group: SkillGroup;
}

export function SkillGroupCard({ group }: SkillGroupCardProps) {
  const reduced = useReducedMotionSafe();
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const rotateRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (reduced || !cardRef.current) return;
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        // Max ±10 degrees
        rotateRef.current = { x: -dy * 10, y: dx * 10 };
        if (cardRef.current) {
          cardRef.current.style.transform = `perspective(800px) rotateX(${rotateRef.current.x}deg) rotateY(${rotateRef.current.y}deg) scale3d(1.02, 1.02, 1.02)`;
        }
        rafId.current = null;
      });
    },
    [reduced]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  }, []);

  const color = accentColor[group.accent];
  const textClass = accentTextClass[group.accent];

  return (
    <GlowBorder accent={group.accent} rounded="rounded-2xl" className="h-full">
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transition: reduced
            ? "none"
            : "transform 200ms ease-out",
          willChange: "transform",
        }}
        className="rounded-2xl h-full"
      >
        <GlassCard
          spotlight
          className="rounded-2xl p-6 h-full"
          style={{
            boxShadow: `0 0 0 1px ${color}30, 0 8px 32px ${color}15`,
          }}
        >
          {/* Group label */}
          <h3
            className={cn(
              "mb-5 text-lg font-bold tracking-wide",
              textClass
            )}
            style={{ textShadow: `0 0 12px ${color}60` }}
          >
            {group.label}
          </h3>

          {/* Uniform skill grid: equal-width boxes that auto-fill the row and
              wrap to new rows as more skills are added — always evenly spaced. */}
          <ul
            className="grid gap-2.5 grid-cols-[repeat(auto-fill,minmax(78px,1fr))]"
            role="list"
          >
            {group.skills.map((skill) => (
              <li key={skill.name} className="h-full">
                <motion.div
                  className={cn(
                    "flex h-full flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-3 text-center",
                    "cursor-default border transition-colors duration-200",
                    "border-white/5 hover:border-white/15"
                  )}
                  style={{
                    background: `color-mix(in oklab, ${color} 8%, transparent)`,
                  }}
                  whileHover={
                    reduced
                      ? {}
                      : {
                          y: -4,
                          boxShadow: `0 4px 16px ${color}40`,
                          transition: { duration: 0.18 },
                        }
                  }
                  animate={
                    reduced
                      ? {}
                      : {
                          y: [0, -2, 0],
                          transition: {
                            duration: 3 + stableRandom(skill.name) * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: stableRandom(skill.name + "d") * 2,
                          },
                        }
                  }
                >
                  <LucideIcon
                    name={skill.icon}
                    className={cn("h-5 w-5", textClass)}
                  />
                  <span className="text-xs font-medium leading-tight text-foreground/80">
                    {skill.name}
                  </span>
                </motion.div>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </GlowBorder>
  );
}
