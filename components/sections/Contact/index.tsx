"use client";

import { getIcon } from "@/lib/icons";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { social } from "@/data/social";
import { cn } from "@/lib/utils";
import { ContactForm } from "./ContactForm";

/* ─── Centered contact channels ──────────────────────────── */

function ContactChannels() {
  return (
    <div className="text-center">
      <p className="mx-auto mb-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        I&apos;m always open to interesting conversations, new projects, or just
        a friendly hello. Reach out through any channel below.
      </p>

      <ul
        className="flex flex-wrap items-center justify-center gap-3"
        aria-label="Contact channels"
      >
        {social.map((link) => {
          const Icon = getIcon(link.icon);
          return (
            <li key={link.id}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                aria-label={link.label}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  "border border-border bg-card/60 text-muted-foreground",
                  "hover:border-purple/60 hover:text-purple hover:bg-purple/10",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                {Icon ? <Icon size={18} aria-hidden="true" /> : null}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="relative py-24">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(168,85,247,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Get in Touch"
            subtitle="Whether it's a role, a project, or a question — my inbox is open."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="p-6 sm:p-8">
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="mb-6 text-center text-xl font-semibold text-foreground">
                  Send a Message
                </h3>
                <ContactForm />
              </div>

              <div className="border-t border-border/50 pt-8">
                <ContactChannels />
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
