"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Lock,
  Atom,
  Binary,
  Brain,
  Globe,
  Network,
  Database,
  Code,
  Lightbulb,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications, patent } from "@/lib/data";
import type { CertIcon } from "@/lib/types";

const iconMap: Record<CertIcon, React.ReactNode> = {
  quantum: <Atom size={20} />,
  algorithms: <Binary size={20} />,
  ml: <Brain size={20} />,
  geo: <Globe size={20} />,
  network: <Network size={20} />,
  db: <Database size={20} />,
  python: <Code size={20} />,
  design: <Lightbulb size={20} />,
};

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="section-dots relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="CERTIFICATIONS" number="[06]" />

        {/* Patent — special card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card mb-8 p-6"
          style={{
            borderLeft: "3px solid var(--accent-orange)",
            borderColor: "var(--accent-orange)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: "rgba(242, 153, 74, 0.1)",
                color: "var(--accent-orange)",
              }}
            >
              <Lock size={20} />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-bold"
                  style={{
                    background: "rgba(242, 153, 74, 0.1)",
                    color: "var(--accent-orange)",
                    fontFamily:
                      "var(--font-jetbrains-mono), JetBrains Mono, monospace",
                  }}
                >
                  PATENT PENDING
                </span>
              </div>
              <h3
                className="mb-1 text-lg font-bold"
                style={{
                  fontFamily: "var(--font-syne), Syne, sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                {patent.title}
              </h3>
              <p
                className="text-sm"
                style={{
                  color: "var(--text-secondary)",
                  fontFamily:
                    "var(--font-jetbrains-mono), JetBrains Mono, monospace",
                }}
              >
                {patent.id} · Filed {patent.filed} · {patent.office}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Certification cards grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, i) => {
            const hasLink = cert.link !== null;

            const CardWrapper = hasLink ? "a" : "div";
            const linkProps = hasLink
              ? {
                  href: cert.link!,
                  target: "_blank" as const,
                  rel: "noopener noreferrer" as const,
                }
              : {};

            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <CardWrapper
                  {...linkProps}
                  className="glass-card flex items-start gap-4 p-5"
                  style={{
                    opacity: hasLink ? 1 : 0.6,
                    cursor: hasLink ? "pointer" : "default",
                    display: "flex",
                  }}
                  title={
                    hasLink
                      ? undefined
                      : "Certificate available offline"
                  }
                  aria-label={`${cert.name} from ${cert.issuer}`}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                      color: "var(--accent-blue)",
                    }}
                  >
                    {iconMap[cert.icon]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4
                      className="mb-1 text-sm font-bold leading-snug"
                      style={{
                        fontFamily: "var(--font-syne), Syne, sans-serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      {cert.name}
                    </h4>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {cert.issuer}
                    </p>
                  </div>
                  {hasLink && (
                    <ExternalLink
                      size={14}
                      className="mt-1 shrink-0"
                      style={{ color: "var(--text-muted)" }}
                    />
                  )}
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
