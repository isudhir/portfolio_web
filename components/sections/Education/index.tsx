"use client";

import { education } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { EducationCard } from "./EducationCard";

export function Education() {
  return (
    <section
      id="education"
      aria-label="Education"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="Background"
            title="Education"
          />
        </Reveal>
        <div className="flex flex-col gap-6">
          {education.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 0.1}>
              <EducationCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
