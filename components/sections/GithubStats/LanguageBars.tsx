"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import type { LanguageStat, Accent } from "@/types";

const accentVar: Record<Accent, string> = {
  purple: "var(--accent-purple)",
  indigo: "var(--accent-indigo)",
  cyan: "var(--accent-cyan)",
};

export function LanguageBars({ languages }: { languages: LanguageStat[] }) {
  const reduced = useReducedMotionSafe();

  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <p className="text-sm font-medium text-foreground/80">Most-used languages</p>
      {languages.map((lang, i) => {
        const gradient = `linear-gradient(90deg, ${accentVar[lang.accent]}, color-mix(in oklab, ${accentVar[lang.accent]} 55%, transparent))`;
        return (
          <div key={lang.name}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-foreground/70">{lang.name}</span>
              <span className="text-muted-foreground">{lang.percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              {reduced ? (
                <div
                  className="h-full rounded-full"
                  style={{ background: gradient, width: `${lang.percent}%` }}
                />
              ) : (
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: gradient }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
