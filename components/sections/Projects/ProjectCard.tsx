"use client";

import Image from "next/image";
import { GitFork, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { projectHasDetails } from "./ProjectModal";
import type { Project } from "@/types";

export interface ProjectCardProps {
  project: Project;
  /** When provided (and the project has case-study fields), the card opens the detail modal. */
  onOpen?: (id: string) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const openable = Boolean(onOpen) && projectHasDetails(project);

  const handleOpen = (e: React.MouseEvent | React.KeyboardEvent) => {
    const target = e.target as Element;
    if (target.closest("a, button")) return; // let card links behave normally
    onOpen?.(project.id);
  };

  return (
    <motion.div
      layout
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("group h-full", openable && "cursor-pointer")}
      role={openable ? "button" : undefined}
      tabIndex={openable ? 0 : undefined}
      data-cursor={openable ? "view" : undefined}
      aria-haspopup={openable ? "dialog" : undefined}
      onClick={openable ? handleOpen : undefined}
      onKeyDown={
        openable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen(e);
              }
            }
          : undefined
      }
    >
      <TiltCard maxTilt={6}>
      <GlassCard
        spotlight
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl",
          "transition-all duration-300",
          "hover:shadow-[0_0_40px_var(--accent-purple)/25%]"
        )}
        style={{ willChange: "transform, box-shadow" }}
      >
        {/* Cover image */}
        <div className="relative aspect-video w-full overflow-hidden bg-white/5">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-500",
              "group-hover:scale-105"
            )}
            // May 404 — placeholder paths are intentional
            onError={() => {
              /* silent — images are placeholders */
            }}
          />
          {/* Overlay gradient */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent"
          />
          {/* Featured badge */}
          {project.featured && (
            <span
              className={cn(
                "absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                "bg-purple/20 text-purple border border-purple/30"
              )}
            >
              Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          {/* Title + category badges */}
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-base font-bold text-foreground leading-snug">
              {project.title}
            </h3>
          </div>

          {/* Category tags */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.categories.map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="border border-indigo/25 bg-indigo/10 text-indigo text-xs"
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.tech.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="border border-white/10 bg-white/5 text-foreground/60 text-xs"
              >
                {t}
              </Badge>
            ))}
          </div>

          {/* Action buttons */}
          {(project.github || project.demo) && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.github && (
                <MagneticButton
                  href={project.github}
                  className={cn(
                    "text-xs border border-white/15 bg-white/5",
                    "text-foreground/80 hover:text-foreground hover:border-white/25",
                    "px-3 py-2 gap-1.5"
                  )}
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
                  GitHub
                </MagneticButton>
              )}
              {project.demo && (
                <MagneticButton
                  href={project.demo}
                  className={cn(
                    "text-xs border border-purple/30 bg-purple/10",
                    "text-purple hover:bg-purple/20 hover:border-purple/50",
                    "px-3 py-2 gap-1.5"
                  )}
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  Live Demo
                </MagneticButton>
              )}
            </div>
          )}
        </div>
      </GlassCard>
      </TiltCard>
    </motion.div>
  );
}
