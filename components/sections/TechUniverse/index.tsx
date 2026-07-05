"use client";

import { techUniverse } from "@/data/techUniverse";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { TechCanvas } from "./TechCanvas";

export function TechUniverse() {
  return (
    <section
      id="tech"
      aria-label="Tech Universe"
      className="relative py-24 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Stack"
            title="Tech Universe"
            subtitle="An interactive map of my stack — hover to explore."
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative w-full rounded-2xl glass overflow-hidden">
            <TechCanvas nodes={techUniverse} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
