"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  number: string;
  className?: string;
}

export default function SectionHeading({
  title,
  number,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`relative mb-16 ${className}`}>
      {/* Background watermark number */}
      <span className="section-watermark select-none">{number}</span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold tracking-tight md:text-5xl"
        style={{
          fontFamily: "var(--font-syne), Syne, sans-serif",
          fontWeight: 800,
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
