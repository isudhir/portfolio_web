"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { ProjectFilters, type FilterValue } from "./ProjectFilters";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = projects.find((p) => p.id === activeId) ?? null;

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Work"
            title="Selected Projects"
            subtitle="Production systems and experiments — open a card for the full case study."
          />
        </Reveal>

        {/* Category filter pills */}
        <Reveal delay={0.1}>
          <ProjectFilters active={activeFilter} onChange={setActiveFilter} />
        </Reveal>

        {/* Project grid with layout animation */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setActiveId} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case-study modal (shared-element with the matching card) */}
        <ProjectModal project={activeProject} onClose={() => setActiveId(null)} />

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center text-muted-foreground"
            >
              No projects in this category yet.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
