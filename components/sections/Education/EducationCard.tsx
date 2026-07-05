"use client";

import { GraduationCap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import type { Education, Accent } from "@/types";

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

export function EducationCard({ entry }: { entry: Education }) {
  const color = accentColor[entry.accent];

  return (
    <GlassCard glow={entry.accent} spotlight className="p-6">
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
          style={{
            borderColor: `${color}40`,
            background: `color-mix(in oklab, ${color} 10%, transparent)`,
          }}
        >
          <GraduationCap size={20} className={accentTextClass[entry.accent]} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="text-base font-bold text-foreground">{entry.institution}</h3>
            <p className="text-xs text-muted-foreground">{entry.duration}</p>
          </div>
          <p className={cn("mt-0.5 text-sm font-medium", accentTextClass[entry.accent])}>
            {entry.degree}
            {entry.field ? ` — ${entry.field}` : ""}
          </p>
          {entry.details && entry.details.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {entry.details.map((d) => (
                <li key={d} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
