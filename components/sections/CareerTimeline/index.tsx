"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { career } from "@/data/career";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { TimelineNode } from "./TimelineNode";

export function CareerTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  // The gradient track draws itself as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="career" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Reveal>
          <SectionHeading
            eyebrow="Timeline"
            title="Career Path"
            subtitle="Five years across healthcare, logistics, and AI products."
          />
        </Reveal>

        {/* Timeline */}
        <div ref={trackRef} className="relative mt-4">
          {/* Dim full-height track */}
          <div
            aria-hidden="true"
            className="absolute left-2 top-1 bottom-12 w-px -translate-x-1/2 bg-white/10"
          />
          {/* Progress line that draws with scroll */}
          <motion.div
            aria-hidden="true"
            className="absolute left-2 top-1 bottom-12 w-px -translate-x-1/2 origin-top"
            style={{
              scaleY: reduced ? 1 : scaleY,
              background:
                "linear-gradient(to bottom, var(--accent-purple), var(--accent-indigo), var(--accent-cyan))",
              boxShadow: "0 0 8px var(--accent-indigo)",
            }}
          />
          {career.map((entry, i) => (
            <TimelineNode key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
