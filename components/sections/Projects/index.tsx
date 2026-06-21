"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilters, type FilterValue } from "./ProjectFilters";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

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
            eyebrow="Portfolio"
            title="Projects"
            gradientTitle
            subtitle="A selection of things I've built — from AI orchestration engines to patient engagement platforms."
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
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

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
