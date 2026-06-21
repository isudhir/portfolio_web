"use client";

import { career } from "@/data/career";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { TimelineNode } from "./TimelineNode";

export function CareerTimeline() {
  return (
    <section
      id="career"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <Reveal>
          <SectionHeading
            eyebrow="Career"
            title="My Journey"
            gradientTitle
            subtitle="Companies, roles, and the impact I've delivered across the stack."
          />
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-4">
          {career.map((entry, i) => (
            <TimelineNode
              key={entry.id}
              entry={entry}
              index={i}
              isLast={i === career.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
