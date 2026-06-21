"use client";

import { getIcon } from "@/lib/icons";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { social } from "@/data/social";
import { ContactForm } from "./ContactForm";

/* ─── Social info item ───────────────────────────────────── */

function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Get in Touch
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          I&apos;m always open to interesting conversations, new projects, or just
          a friendly hello. Feel free to reach out through any channel below.
        </p>
      </div>

      <ul className="flex flex-col gap-3" aria-label="Contact channels">
        {social.map((link) => {
          const Icon = getIcon(link.icon);
          return (
            <li key={link.id}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-3 rounded-lg px-3 py-2 -mx-3 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
                aria-label={link.label}
              >
                {Icon && (
                  <span
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-purple/10 text-purple transition-colors group-hover:bg-purple/20"
                    aria-hidden="true"
                  >
                    <Icon size={18} />
                  </span>
                )}
                <span className="text-sm font-medium text-foreground group-hover:text-purple transition-colors">
                  {link.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Decorative gradient blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-auto"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, var(--accent-purple), var(--accent-indigo), var(--accent-cyan))",
          opacity: 0.4,
        }}
      />
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative py-24"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(168,85,247,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's Work Together"
            gradientTitle
            subtitle="Have a project in mind or want to collaborate? Drop me a message."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="grid gap-10 p-6 sm:p-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
            <ContactInfo />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Send a Message
              </h3>
              <ContactForm />
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
