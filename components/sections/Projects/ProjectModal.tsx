"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, GitFork, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Project } from "@/types";

/** True when the project has case-study content worth a detail modal. */
export function projectHasDetails(p: Project): boolean {
  return Boolean(
    p.longDescription || p.highlights?.length || p.role || p.year || p.gallery?.length
  );
}

export interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Case-study dialog. Pairs its `layoutId` with the matching ProjectCard so the
 * card morphs into the modal (shared-element transition). Escape / backdrop /
 * close button dismiss; body scroll is locked while open.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 p-4 backdrop-blur-md sm:p-8"
        >
          <motion.div
            layoutId={`project-${project.id}`}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={(e) => e.stopPropagation()}
            className="glass relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10"
          >
            {/* Close */}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-background/60 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
            >
              <X size={16} aria-hidden="true" />
            </button>

            {/* Cover */}
            <div className="relative aspect-video w-full overflow-hidden bg-white/5">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                {(project.role || project.year) && (
                  <p className="text-sm text-muted-foreground">
                    {[project.role, project.year].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="border border-indigo/25 bg-indigo/10 text-xs text-indigo"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {project.longDescription ?? project.description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <ul className="mb-5 space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {project.gallery && project.gallery.length > 0 && (
                <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {project.gallery.map((src) => (
                    <div key={src} className="relative aspect-video overflow-hidden rounded-lg bg-white/5">
                      <Image src={src} alt="" fill sizes="220px" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-6 flex flex-wrap gap-1.5" aria-label="Technologies used">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="border border-white/10 bg-white/5 text-xs text-foreground/60"
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              {(project.github || project.demo) && (
                <div className="flex flex-wrap gap-2">
                  {project.github && (
                    <MagneticButton
                      href={project.github}
                      className="gap-1.5 border border-white/15 bg-white/5 px-4 py-2 text-xs text-foreground/80 hover:border-white/25 hover:text-foreground"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
                      GitHub
                    </MagneticButton>
                  )}
                  {project.demo && (
                    <MagneticButton
                      href={project.demo}
                      className="gap-1.5 border border-purple/30 bg-purple/10 px-4 py-2 text-xs text-purple hover:border-purple/50 hover:bg-purple/20"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      Live Demo
                    </MagneticButton>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
