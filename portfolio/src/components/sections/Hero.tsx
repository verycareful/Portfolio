"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, ChevronDown } from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import dynamic from "next/dynamic";
import { heroRoles, heroBio } from "@/lib/data";

const QuantumCanvas = dynamic(
  () => import("@/components/sections/QuantumCanvas"),
  {
    ssr: false,
    loading: () => (
      // CSS fallback: animated gradient blob
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(45,156,219,0.15), transparent 60%), radial-gradient(ellipse at 40% 60%, rgba(242,153,74,0.08), transparent 50%)",
          animation: "pulse 4s ease-in-out infinite alternate",
        }}
      />
    ),
  }
);

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const typeSpeed = 60;
  const deleteSpeed = 30;
  const pauseTime = 2000;

  const tick = useCallback(() => {
    const currentRole = heroRoles[roleIndex];

    if (!isDeleting) {
      // Typing
      const next = currentRole.slice(0, displayed.length + 1);
      setDisplayed(next);

      if (next === currentRole) {
        // Pause, then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      // Deleting
      const next = currentRole.slice(0, displayed.length - 1);
      setDisplayed(next);

      if (next === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % heroRoles.length);
        return;
      }
    }
  }, [displayed, isDeleting, roleIndex]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timeout = setTimeout(tick, speed);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting]);

  const bioLines = heroBio.split("\n");

  return (
    <section
      id="hero"
      className="section-dots relative flex min-h-screen items-center overflow-hidden px-6"
    >
      {/* Quantum ambient background */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        <QuantumCanvas />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.5fr_1fr]">
        {/* Left column — text */}
        <div className="flex flex-col justify-center">
          {/* Small label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.2em]"
            style={{
              color: "var(--accent-orange)",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            }}
          >
            Aspiring Quantum Engineer
          </motion.span>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-2 text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[96px]"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              fontWeight: 800,
              color: "var(--text-primary)",
            }}
          >
            SRICHARAN
            <br />
            SURESH
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-6 h-8"
          >
            <span
              className="text-lg"
              style={{
                fontFamily:
                  "var(--font-jetbrains-mono), JetBrains Mono, monospace",
                color: "var(--accent-blue)",
              }}
            >
              {displayed}
              <span className="cursor-blink">|</span>
            </span>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-8 max-w-lg"
          >
            {bioLines.map((line, i) => (
              <p
                key={i}
                className="leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {line}
              </p>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#research"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
              style={{ background: "var(--accent-blue)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent-blue-dim)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--accent-blue)")
              }
            >
              <ArrowRight size={16} />
              View Research
            </a>

            <a
              href="https://github.com/verycareful"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--card-border)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-blue)";
                e.currentTarget.style.color = "var(--accent-blue)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--card-border)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <Github size={16} />
              GitHub
              <ExternalLink size={12} />
            </a>

            <a
              href="https://www.linkedin.com/in/verycareful"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--card-border)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-blue)";
                e.currentTarget.style.color = "var(--accent-blue)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--card-border)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <Linkedin size={16} />
              LinkedIn
              <ExternalLink size={12} />
            </a>
          </motion.div>
        </div>

        {/* Right column — Three.js canvas on mobile fallback (it's behind on desktop) */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown
          size={24}
          style={{ color: "var(--text-muted)" }}
        />
      </motion.div>
    </section>
  );
}
