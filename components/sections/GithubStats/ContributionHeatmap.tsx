"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { seededSeries } from "@/lib/seeded";

const LEVEL_PERCENT = [8, 25, 45, 70, 100];

/** Decorative, deterministic contribution-style grid (illustrative only). */
export function ContributionHeatmap({ seed, weeks }: { seed: number; weeks: number }) {
  const reduced = useReducedMotionSafe();
  const values = seededSeries(seed, weeks * 7);

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-foreground/80">
        Contribution rhythm{" "}
        <span className="text-xs font-normal text-muted-foreground">(illustrative)</span>
      </p>
      <div
        className="grid w-max grid-flow-col gap-1"
        style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
      >
        {values.map((v, i) => {
          const level = v < 0.35 ? 0 : v < 0.55 ? 1 : v < 0.75 ? 2 : v < 0.9 ? 3 : 4;
          const bg = `color-mix(in oklab, var(--accent-purple) ${LEVEL_PERCENT[level]}%, transparent)`;
          if (reduced) {
            return (
              <span
                key={i}
                data-heatmap-cell
                aria-hidden="true"
                className="h-3 w-3 rounded-[3px]"
                style={{ backgroundColor: bg }}
              />
            );
          }
          return (
            <motion.span
              key={i}
              data-heatmap-cell
              aria-hidden="true"
              className="h-3 w-3 rounded-[3px]"
              style={{ backgroundColor: bg }}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.004 }}
            />
          );
        })}
      </div>
    </div>
  );
}
