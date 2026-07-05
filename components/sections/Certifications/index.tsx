"use client";

import { certifications } from "@/data/certifications";
import { getIcon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { CertificationCard } from "./CertificationCard";

// Resolved at module scope: react-hooks/static-components forbids creating
// component references during render.
const GraduationCapIcon = getIcon("GraduationCap");

export function Certifications() {
  const isEmpty = certifications.length === 0;

  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="relative py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Credentials"
            title="Certifications"
          />
        </Reveal>

        {isEmpty ? (
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              {GraduationCapIcon ? (
                <GraduationCapIcon
                  aria-hidden="true"
                  className="mb-4 h-12 w-12 text-muted-foreground/40"
                  strokeWidth={1.5}
                />
              ) : null}
              <p className="text-lg font-medium text-muted-foreground">
                Certifications coming soon
              </p>
              <p className="mt-1 text-sm text-muted-foreground/70">
                Professional credentials will appear here once added.
              </p>
            </div>
          </Reveal>
        ) : (
          <ul
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Certification list"
          >
            {certifications.map((cert, i) => (
              <li key={cert.id}>
                <Reveal delay={i * 0.08}>
                  <CertificationCard certification={cert} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
