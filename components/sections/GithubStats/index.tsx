"use client";

import { githubStats } from "@/data/githubStats";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getIcon } from "@/lib/icons";
import { ContributionHeatmap } from "./ContributionHeatmap";
import { LanguageBars } from "./LanguageBars";

// Resolved at module scope: react-hooks/static-components forbids creating
// component references during render.
const GithubIcon = getIcon("Github");

export function GithubStats() {
  return (
    <section
      id="github"
      aria-label="GitHub activity"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            eyebrow="Open Source"
            title="GitHub"
            subtitle={`Contribution activity and languages for @${githubStats.username}.`}
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {githubStats.counters.map((c) => (
              <GlassCard key={c.label} className="p-5 text-center">
                <p className="text-3xl font-extrabold text-gradient">
                  <AnimatedCounter value={c.value} suffix={c.suffix ?? ""} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </p>
              </GlassCard>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <Reveal delay={0.1}>
            <GlassCard className="overflow-x-auto p-5">
              <ContributionHeatmap
                seed={githubStats.heatmapSeed}
                weeks={githubStats.weeks}
              />
            </GlassCard>
          </Reveal>
          <Reveal delay={0.15}>
            <GlassCard className="h-full p-5">
              <LanguageBars languages={githubStats.languages} />
            </GlassCard>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex justify-center">
            <MagneticButton
              href={githubStats.profileUrl}
              className="gap-2 border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-foreground/80 hover:border-white/25 hover:text-foreground"
              aria-label="Visit my GitHub profile"
            >
              <GithubIcon size={16} aria-hidden="true" />
              Visit my GitHub
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
