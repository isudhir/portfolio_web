"use client";

import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

export type FilterValue = "All" | ProjectCategory;

const FILTERS: FilterValue[] = ["All", "Full Stack", "AI", "Backend", "Frontend"];

export interface ProjectFiltersProps {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}

export function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap justify-center gap-3 mb-10"
    >
      {FILTERS.map((f) => {
        const isActive = f === active;
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
            aria-pressed={isActive}
            className={cn(
              "cursor-pointer rounded-full px-5 py-2 text-sm font-medium",
              "border transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? [
                    "border-purple/50 bg-purple/15 text-purple",
                    "shadow-[0_0_16px_var(--accent-purple)/30%]",
                  ]
                : [
                    "border-white/10 bg-white/5 text-foreground/70",
                    "hover:border-white/20 hover:bg-white/10 hover:text-foreground",
                  ]
            )}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
