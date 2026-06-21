"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { experience } from "@/data/experience";
import { ExperienceCard } from "./ExperienceCard";

export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="Career"
            title="Experience"
            gradientTitle
            subtitle="A track record of shipping impactful software at scale."
          />
        </Reveal>

        {/* Timeline container */}
        <div className="relative">
          {/* Central vertical line — hidden on mobile */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-purple), var(--accent-indigo), var(--accent-cyan), transparent)",
              opacity: 0.25,
            }}
          />

          <div className="space-y-12">
            {experience.map((exp, i) => {
              const side: "left" | "right" = i % 2 === 0 ? "right" : "left";

              return (
                <div
                  key={exp.id}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  {/* Dot on the centre line */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background md:block"
                    style={{
                      background:
                        exp.current
                          ? "var(--accent-purple)"
                          : "var(--accent-indigo)",
                      boxShadow: exp.current
                        ? "0 0 12px var(--accent-purple)"
                        : "0 0 8px var(--accent-indigo)",
                    }}
                  />

                  {/*
                   * Alternating layout:
                   *   i=0 (right): card on the RIGHT col (col-start-2) — left side is empty
                   *   i=1 (left):  card on the LEFT col (col-start-1) — right side is empty
                   *
                   * On mobile both collapse to a single column.
                   */}
                  {side === "right" ? (
                    <>
                      {/* Left spacer (desktop) */}
                      <div className="hidden md:block" />
                      {/* Card slides in from the right */}
                      <Reveal delay={i * 0.1} y={0} className="w-full">
                        <ExperienceCard experience={exp} />
                      </Reveal>
                    </>
                  ) : (
                    <>
                      {/* Card slides in from the left */}
                      <Reveal delay={i * 0.1} y={0} className="w-full">
                        <ExperienceCard experience={exp} />
                      </Reveal>
                      {/* Right spacer (desktop) */}
                      <div className="hidden md:block" />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
