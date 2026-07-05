"use client";

import { ArrowUp } from "lucide-react";
import { social } from "@/data/social";
import { navigation } from "@/data/navigation";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { LocalTime } from "./LocalTime";

/* ─── Back to top ────────────────────────────────────────── */

function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg",
        "glass border border-white/10",
        "text-muted-foreground hover:text-purple hover:border-purple/40",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="relative border-t border-white/8"
    >
      {/* Top gradient line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-purple), var(--accent-indigo), var(--accent-cyan), transparent)",
          opacity: 0.5,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          {/* Brand + copyright */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span
              className="text-lg font-bold text-gradient animate-gradient"
              aria-label="Sudhir Kumar"
            >
              Sudhir Kumar
            </span>
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} Sudhir Kumar. All rights reserved.
            </p>
            <LocalTime />
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {navigation.filter((item) => item.id !== "home").map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:text-purple"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links + back to top */}
          <div className="flex items-center gap-3">
            {social.map((link) => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={link.label}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    "glass border border-white/10",
                    "text-muted-foreground hover:text-purple hover:border-purple/40",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  {Icon && <Icon size={16} aria-hidden="true" />}
                </a>
              );
            })}

            <BackToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
