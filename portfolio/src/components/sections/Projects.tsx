"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects, projectCategories } from "@/lib/data";
import type { Project } from "@/lib/types";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Project["category"]>("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="section-dots relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="PROJECTS" number="[04]" />

        {/* Filter bar */}
        <div className="mb-10 flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              aria-label={`Filter projects by ${cat}`}
              className="rounded-full px-4 py-2 text-sm font-medium transition-all"
              style={{
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                background:
                  activeFilter === cat
                    ? "var(--accent-blue)"
                    : "var(--card-bg)",
                color:
                  activeFilter === cat ? "#FFFFFF" : "var(--text-secondary)",
                border: `1px solid ${
                  activeFilter === cat
                    ? "var(--accent-blue)"
                    : "var(--card-border)"
                }`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
