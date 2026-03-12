"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Lock } from "lucide-react";
import TechBadge from "./TechBadge";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const statusColors: Record<string, string> = {
  live: "#27AE60",
  active: "#27AE60",
  complete: "#27AE60",
  published: "#2D9CDB",
  wip: "#F2994A",
  research: "#F2994A",
  review: "#F2994A",
};

const statusLabels: Record<string, string> = {
  live: "Live",
  active: "Active",
  complete: "Complete",
  published: "Published",
  wip: "WIP",
  research: "Research",
  review: "Under Review",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isNotBigBrother = project.name === "NotBigBrother";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass-card relative flex flex-col p-6"
      style={{
        ...(project.featured
          ? {
              borderTop: "2px solid var(--accent-blue)",
              boxShadow: "0 -4px 20px var(--accent-glow)",
            }
          : {}),
        ...(isNotBigBrother
          ? { gridColumn: "span 1" }
          : {}),
      }}
    >
      {/* Header: category + status */}
      <div className="mb-3 flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-xs font-medium"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-jetbrains-mono), monospace",
          }}
        >
          {project.category}
        </span>

        <div className="flex items-center gap-2">
          <span
            className="status-dot"
            style={{ background: statusColors[project.status] }}
          />
          <span
            className="text-xs"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            {statusLabels[project.status]}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3
        className="mb-1 text-lg font-bold"
        style={{
          fontFamily: "var(--font-syne), Syne, sans-serif",
          color: "var(--text-primary)",
        }}
      >
        {isNotBigBrother && (
          <Lock
            size={16}
            className="mr-2 inline-block"
            style={{ color: "var(--accent-orange)" }}
          />
        )}
        {project.name}
      </h3>

      {/* Tagline */}
      <p
        className="mb-3 text-sm"
        style={{ color: "var(--accent-blue)" }}
      >
        {project.tagline}
      </p>

      {/* Description */}
      <p
        className="mb-4 flex-1 text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {project.description}
      </p>

      {/* Highlight badge */}
      {project.highlight && (
        <div
          className="mb-4 inline-flex items-center rounded-md px-3 py-1 text-xs font-medium"
          style={{
            background: "rgba(242, 153, 74, 0.1)",
            border: "1px solid rgba(242, 153, 74, 0.3)",
            color: "var(--accent-orange)",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            alignSelf: "flex-start",
          }}
        >
          {project.highlight}
        </div>
      )}

      {/* Tech stack */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} GitHub repository`}
            className="flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--accent-blue)]"
            style={{ color: "var(--text-muted)" }}
          >
            <Github size={15} />
            <span>Code</span>
          </a>
        )}
        {project.doi && (
          <a
            href={project.doi}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} publication DOI`}
            className="flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--accent-blue)]"
            style={{ color: "var(--text-muted)" }}
          >
            <ExternalLink size={15} />
            <span>DOI</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
