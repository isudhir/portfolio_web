"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { skills } from "@/data/skills";
import { SkillGroupCard } from "./SkillGroupCard";

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Toolkit"
            title="Skills"
            subtitle="The tools I use daily, grouped by discipline."
          />
        </Reveal>

        {/* Responsive grid: 1 col → 2 col → 3 col.
            auto-rows-fr keeps every card the same height per row, so adding
            more skill groups (or skills) stays visually even automatically. */}
        <div className="grid grid-cols-1 gap-6 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.1} className="h-full">
              <SkillGroupCard group={group} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
