"use client";

import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types";

export interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <GlassCard
      spotlight
      glow={experience.current ? "purple" : undefined}
      className={cn(
        "relative p-6 sm:p-8",
        "transition-shadow duration-300 hover:shadow-[0_0_40px_var(--accent-indigo)/20%]"
      )}
    >
      {/* Current badge */}
      {experience.current && (
        <span
          className={cn(
            "absolute right-4 top-4 inline-flex items-center gap-1 rounded-full",
            "bg-purple/15 px-3 py-1 text-xs font-semibold text-purple",
            "border border-purple/30"
          )}
          aria-label="Current position"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-purple animate-pulse"
          />
          Current
        </span>
      )}

      {/* Header */}
      <div className="mb-4 pr-20">
        <h3 className="text-xl font-bold text-foreground">{experience.company}</h3>
        <p className="mt-0.5 text-base font-medium text-indigo">{experience.role}</p>
        <p className="mt-1 text-sm text-muted-foreground">{experience.duration}</p>
      </div>

      {/* Tech badges */}
      <div className="mb-5 flex flex-wrap gap-2" role="list" aria-label="Technologies">
        {experience.tech.map((t) => (
          <Badge
            key={t}
            variant="secondary"
            className="border border-white/10 bg-white/5 text-foreground/70 text-xs"
          >
            {t}
          </Badge>
        ))}
      </div>

      {/* Achievements */}
      <ul className="space-y-2.5" aria-label="Key achievements">
        {experience.achievements.map((ach, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-foreground/80 leading-relaxed">
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "var(--accent-purple)" }}
            />
            <span>{ach}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
