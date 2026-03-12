"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats, aboutText, education, organisations } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="section-dots relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="ABOUT" number="[01]" />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left — Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card flex flex-col items-center justify-center p-6 text-center transition-all"
                style={{
                  borderColor: "var(--card-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-blue)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--card-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  className="mb-2 text-3xl font-extrabold md:text-4xl"
                  style={{
                    fontFamily: "var(--font-syne), Syne, sans-serif",
                    fontWeight: 800,
                    color: "var(--accent-blue)",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs leading-snug"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Right — Text + Education + Organisations */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {aboutText}
            </motion.p>

            {/* Education Cards */}
            <div className="mb-8 flex flex-col gap-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card p-5"
                  style={{
                    borderLeft: "3px solid var(--accent-orange)",
                  }}
                >
                  <h4
                    className="mb-1 text-sm font-bold"
                    style={{
                      fontFamily: "var(--font-syne), Syne, sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    {edu.degree}
                  </h4>
                  <a
                    href={edu.institutionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-1 flex items-center gap-1 text-sm transition-colors hover:text-[var(--accent-blue)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {edu.institution}
                    <ExternalLink size={12} />
                  </a>
                  <div
                    className="flex items-center gap-3 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span>{edu.period}</span>
                    <span>·</span>
                    <span>
                      CGPA:{" "}
                      <span style={{ color: "var(--accent-blue)" }}>
                        {edu.cgpa}
                      </span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Organisations */}
            <div className="flex flex-col gap-3">
              <h4
                className="mb-1 text-xs font-medium uppercase tracking-wider"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                }}
              >
                Organisations
              </h4>
              {organisations.map((org, i) => (
                <motion.a
                  key={org.name}
                  href={org.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card flex items-center justify-between p-4 transition-colors"
                  aria-label={`${org.name} — ${org.role}`}
                >
                  <div>
                    <span
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-syne), Syne, sans-serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      {org.name}
                    </span>
                    <span
                      className="ml-2 text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {org.role}
                    </span>
                  </div>
                  <span
                    className="text-xs"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily:
                        "var(--font-jetbrains-mono), JetBrains Mono, monospace",
                    }}
                  >
                    {org.period}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
