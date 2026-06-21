"use client";

import { motion, type Variants } from "framer-motion";
import { heroData } from "@/data/hero";
import { getIcon } from "@/lib/icons";
import { social } from "@/data/social";
import { GradientText } from "@/components/ui/GradientText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/animations/Reveal";
import { HeroBackground } from "./HeroBackground";
import { RotatingSubtitle } from "./RotatingSubtitle";
import { cn } from "@/lib/utils";

// Stagger container for child motion elements
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// CTA button style mapping
const ctaClass: Record<string, string> = {
  primary:
    "bg-purple/90 text-white hover:bg-purple shadow-[0_0_20px_var(--accent-purple)40] hover:shadow-[0_0_30px_var(--accent-purple)60] transition-shadow duration-300",
  secondary:
    "border border-border bg-card/60 text-foreground hover:bg-card hover:border-purple/50 transition-colors duration-200",
  ghost:
    "bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors duration-200",
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── Background ── */}
      <HeroBackground />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="text-sm font-semibold uppercase tracking-widest text-purple"
          >
            Welcome to my portfolio
          </motion.p>

          {/* Name */}
          <motion.div variants={item}>
            <GradientText
              as="h1"
              animated
              className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              {heroData.name}
            </GradientText>
          </motion.div>

          {/* Static title */}
          <motion.p
            variants={item}
            className="max-w-2xl text-base sm:text-lg text-muted-foreground font-medium leading-relaxed"
          >
            {heroData.title}
          </motion.p>

          {/* Rotating typewriter subtitle */}
          <motion.div variants={item}>
            <RotatingSubtitle subtitles={heroData.subtitles} />
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-3 mt-2"
          >
            {heroData.ctas.map((cta) => (
              <MagneticButton
                key={cta.label}
                href={cta.href}
                strength={0.25}
                className={cn(
                  "px-6 py-3 text-sm font-semibold",
                  ctaClass[cta.variant]
                )}
              >
                {cta.label}
              </MagneticButton>
            ))}
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={item}
            className="flex items-center justify-center gap-4 mt-2"
          >
            {social.map((link) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full",
                    "border border-border bg-card/60 text-muted-foreground",
                    "hover:border-purple/60 hover:text-purple hover:bg-purple/10",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  {Icon ? <Icon size={18} aria-hidden="true" /> : null}
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <Reveal delay={1.2} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-1 opacity-40">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-purple/60" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
