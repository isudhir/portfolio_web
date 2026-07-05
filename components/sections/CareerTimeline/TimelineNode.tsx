"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";
import type { CareerEntry, Accent } from "@/types";

interface TimelineNodeProps {
  entry: CareerEntry;
  index: number;
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

const accentBgClass: Record<Accent, string> = {
  purple: "bg-purple/10 border-purple/30",
  indigo: "bg-indigo/10 border-indigo/30",
  cyan: "bg-cyan/10 border-cyan/30",
};

const accentGlowClass: Record<Accent, string> = {
  purple: "shadow-[0_0_16px_var(--accent-purple)60]",
  indigo: "shadow-[0_0_16px_var(--accent-indigo)60]",
  cyan: "shadow-[0_0_16px_var(--accent-cyan)60]",
};

export function TimelineNode({ entry, index }: TimelineNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const color = accentColor[entry.accent];

  return (
    <Reveal delay={index * 0.12} y={30}>
      <div className="relative flex gap-4 sm:gap-6">
        {/* Node dot + connector line */}
        <div className="flex flex-col items-center shrink-0">
          {/* Glowing dot */}
          <motion.div
            className={cn(
              "relative z-10 flex items-center justify-center w-4 h-4 rounded-full border-2 mt-1",
              accentGlowClass[entry.accent]
            )}
            style={{
              borderColor: color,
              backgroundColor: `${color}30`,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: index * 0.1 }}
          >
            {/* Inner pulse */}
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
          </motion.div>
        </div>

        {/* Card */}
        <div className="flex-1 pb-10">
          <GlassCard
            glow={entry.accent}
            spotlight
            className={cn(
              "p-5 sm:p-6 transition-all duration-300",
              expanded ? "pb-6" : ""
            )}
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">
                    {entry.company}
                  </h3>
                  {entry.current && (
                    <Badge
                      className={cn(
                        "text-xs font-semibold border",
                        accentBgClass[entry.accent],
                        accentTextClass[entry.accent]
                      )}
                    >
                      Current
                    </Badge>
                  )}
                </div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    accentTextClass[entry.accent]
                  )}
                >
                  {entry.role}
                </p>
              </div>

              {/* Expand/collapse toggle */}
              <button
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-label={expanded ? "Collapse details" : "Expand details"}
                className={cn(
                  "shrink-0 flex items-center justify-center w-8 h-8 rounded-lg",
                  "border border-border/60 text-muted-foreground",
                  "hover:border-border hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "transition-colors duration-200"
                )}
              >
                <motion.span
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  <ChevronDown size={16} aria-hidden="true" />
                </motion.span>
              </button>
            </div>

            {/* Points — expand on hover */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="points"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2 pl-0">
                    {entry.points.map((point, pi) => (
                      <li key={pi} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collapsed hint */}
            {!expanded && (
              <p className="mt-2 text-xs text-muted-foreground/60">
                {entry.points.length} highlights — click to expand
              </p>
            )}
          </GlassCard>
        </div>
      </div>
    </Reveal>
  );
}
