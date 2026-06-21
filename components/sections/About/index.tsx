"use client";

import { aboutData } from "@/data/about";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <Reveal>
          <SectionHeading
            eyebrow="About me"
            title="Who I Am"
            gradientTitle
            subtitle="Turning complex engineering challenges into elegant, scalable solutions."
          />
        </Reveal>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Summary card */}
          <Reveal delay={0.1}>
            <GlassCard
              spotlight
              glow="purple"
              className="flex flex-col gap-6 p-6 sm:p-8 h-full"
            >
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-purple">
                  Background
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {aboutData.summary}
                </p>
              </div>

              {/* Tech chips */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {aboutData.techChips.map((chip) => (
                    <Badge
                      key={chip}
                      variant="secondary"
                      className={cn(
                        "bg-white/5 text-foreground border border-border/60",
                        "hover:border-purple/50 hover:bg-purple/10 hover:text-purple",
                        "transition-colors duration-200 cursor-default text-xs"
                      )}
                    >
                      {chip}
                    </Badge>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>

          {/* Counters card */}
          <Reveal delay={0.2}>
            <GlassCard
              spotlight
              glow="indigo"
              className="flex flex-col justify-center gap-6 p-6 sm:p-8 h-full"
            >
              <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo">
                By the numbers
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {aboutData.counters.map((counter, i) => (
                  <Reveal key={counter.label} delay={0.25 + i * 0.08}>
                    <div className="flex flex-col gap-1 text-center">
                      <span
                        className={cn(
                          "text-4xl font-extrabold tracking-tight text-gradient",
                          "sm:text-5xl"
                        )}
                      >
                        <AnimatedCounter
                          value={counter.value}
                          suffix={counter.suffix}
                          duration={1.8}
                        />
                      </span>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {counter.label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Decorative gradient accent bar */}
              <div
                className="h-px w-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--accent-purple), var(--accent-indigo), var(--accent-cyan))",
                }}
                aria-hidden="true"
              />
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
