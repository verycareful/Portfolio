"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import TechBadge from "./TechBadge";
import type { ResearchEntry } from "@/lib/types";

interface ResearchCardProps {
  entry: ResearchEntry;
  index: number;
}

const statusConfig: Record<
  string,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  "in-progress": {
    label: "IN PROGRESS",
    color: "#F2994A",
    bgColor: "rgba(242, 153, 74, 0.1)",
    borderColor: "rgba(242, 153, 74, 0.4)",
  },
  published: {
    label: "PUBLISHED",
    color: "#2D9CDB",
    bgColor: "rgba(45, 156, 219, 0.1)",
    borderColor: "rgba(45, 156, 219, 0.4)",
  },
  "under-review": {
    label: "UNDER REVIEW",
    color: "#F2994A",
    bgColor: "rgba(242, 153, 74, 0.08)",
    borderColor: "transparent",
  },
};

export default function ResearchCard({ entry, index }: ResearchCardProps) {
  const status = statusConfig[entry.status];
  const accentColor =
    entry.status === "in-progress" ? "var(--accent-orange)" : "var(--accent-blue)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card relative overflow-hidden p-6 md:p-8"
      style={{
        borderLeft: `3px solid ${accentColor}`,
      }}
    >
      {/* Under review special gradient border */}
      {entry.status === "under-review" && (
        <div
          className="absolute left-0 top-0 h-full w-[3px]"
          style={{
            background:
              "linear-gradient(180deg, #F2994A 0%, #2D9CDB 100%)",
          }}
        />
      )}

      {/* Status badge */}
      <div className="mb-4 flex items-center justify-between">
        <span
          className="text-xs font-medium tracking-wider"
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            color: "var(--text-muted)",
          }}
        >
          {entry.period}
        </span>

        <span
          className="rounded-full px-3 py-1 text-xs font-bold tracking-wider"
          style={{
            background: status.bgColor,
            border: `1px solid ${status.borderColor}`,
            color: status.color,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            ...(entry.status === "under-review"
              ? {
                  borderImage:
                    "linear-gradient(90deg, #F2994A, #2D9CDB) 1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }
              : {}),
          }}
        >
          {status.label}
        </span>
      </div>

      {/* Title */}
      <h3
        className="mb-4 text-xl font-bold md:text-2xl"
        style={{
          fontFamily: "var(--font-syne), Syne, sans-serif",
          color: "var(--text-primary)",
        }}
      >
        {entry.title}
      </h3>

      {/* Summary */}
      <p
        className="mb-5 leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {entry.summary}
      </p>

      {/* Tech stack */}
      <div className="mb-5 flex flex-wrap gap-2">
        {entry.stack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        <a
          href={entry.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${entry.title} GitHub repository`}
          className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent-blue)]"
          style={{ color: "var(--text-muted)" }}
        >
          <Github size={16} />
          <span>Repository</span>
        </a>
        {entry.doi && (
          <a
            href={entry.doi}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${entry.title} publication DOI`}
            className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent-blue)]"
            style={{ color: "var(--text-muted)" }}
          >
            <ExternalLink size={16} />
            <span>DOI</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
