"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { notebookEntries, currentlyItems } from "@/lib/data";
import type { NotebookTag } from "@/lib/types";

// Per-tag accent colours
const TAG_COLOR: Record<NotebookTag, string> = {
  QUANTUM:  "var(--accent-blue)",
  ML:       "var(--accent-blue)",
  PRIVACY:  "var(--accent-orange)",
  SYSTEMS:  "var(--accent-orange)",
};

// ---------------------------------------------------------------------------
// Sidebar typewriter — reveals each item's text character by character,
// sequentially across all categories.
// ---------------------------------------------------------------------------
function useSidebarTypewriter(active: boolean) {
  // Flatten everything: [{categoryIdx, itemIdx, char}]
  // We track how many total characters have been revealed.
  const allChars = useRef<{ ci: number; ii: number; ch: string }[]>([]);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const chars: { ci: number; ii: number; ch: string }[] = [];
    currentlyItems.forEach((cat, ci) => {
      cat.items.forEach((item, ii) => {
        // Add a leading "→ "
        const full = `→ ${item}`;
        full.split("").forEach((ch) => chars.push({ ci, ii, ch }));
        // newline sentinel
        chars.push({ ci, ii, ch: "\n" });
      });
    });
    allChars.current = chars;
  }, []);

  useEffect(() => {
    if (!active) return;
    if (revealed >= allChars.current.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), 18);
    return () => clearTimeout(t);
  }, [active, revealed]);

  // Build display map: [categoryIdx][itemIdx] = partial string
  const display: string[][] = currentlyItems.map((cat) =>
    cat.items.map(() => "")
  );
  let count = 0;
  for (const { ci, ii, ch } of allChars.current) {
    if (count >= revealed) break;
    if (ch !== "\n") display[ci][ii] += ch;
    count++;
  }

  // Which item is currently being typed (for cursor placement)
  let cursorCi = -1;
  let cursorIi = -1;
  if (revealed < allChars.current.length) {
    const cur = allChars.current[revealed];
    if (cur) { cursorCi = cur.ci; cursorIi = cur.ii; }
  }

  return { display, cursorCi, cursorIi };
}

// ---------------------------------------------------------------------------
// Currently sidebar
// ---------------------------------------------------------------------------
function CurrentlySidebar({ inView }: { inView: boolean }) {
  const { display, cursorCi, cursorIi } = useSidebarTypewriter(inView);

  return (
    <div className="flex flex-col gap-7">
      {currentlyItems.map((cat, ci) => (
        <div key={cat.label}>
          {/* Category label */}
          <div
            className="mb-2 flex items-center gap-2"
            style={{
              fontFamily: "var(--font-jetbrains-mono), JetBrains Mono, monospace",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </div>

          {/* Items */}
          <ul className="flex flex-col gap-1">
            {cat.items.map((_, ii) => {
              const text = display[ci]?.[ii] ?? "";
              const isCurrent = cursorCi === ci && cursorIi === ii;
              const isDone = text.length >= `→ ${cat.items[ii]}`.length;

              return (
                <li
                  key={ii}
                  style={{
                    fontFamily:
                      "var(--font-jetbrains-mono), JetBrains Mono, monospace",
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    minHeight: "1.1rem",
                  }}
                >
                  {/* Show fully typed or in-progress text */}
                  {isDone ? `→ ${cat.items[ii]}` : text}
                  {isCurrent && (
                    <span
                      className="cursor-blink"
                      style={{ color: "var(--accent-blue)", marginLeft: 1 }}
                    >
                      ▌
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------
export default function LabNotebook() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarInView, setSidebarInView] = useState(false);

  useEffect(() => {
    const el = sidebarRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSidebarInView(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="lab"
      className="relative px-6 py-24 md:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16">
          <SectionHeading title="LAB NOTEBOOK" number="[05]" />
          <p
            className="mt-[-1.5rem] text-sm italic"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            }}
          >
            unfiltered thoughts, current obsessions, things I haven&apos;t figured
            out yet
            <span className="cursor-blink ml-1" style={{ color: "var(--accent-blue)" }}>
              _
            </span>
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
          {/* ── Left: devlog entries ── */}
          <div>
            {notebookEntries.map((entry, i) => (
              <motion.article
                key={entry.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="group relative flex gap-6 py-10"
                style={{
                  borderBottom: "1px solid var(--card-border)",
                  ...(i === 0 ? { borderTop: "1px solid var(--card-border)" } : {}),
                }}
              >
                {/* Large faded index number */}
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), JetBrains Mono, monospace",
                    fontSize: "clamp(3rem, 5vw, 4.5rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "var(--text-primary)",
                    opacity: 0.06,
                    userSelect: "none",
                    flexShrink: 0,
                    width: "4.5rem",
                    textAlign: "right",
                    paddingTop: "0.25rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Left accent bar — slides up on hover */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: TAG_COLOR[entry.tag],
                    opacity: 0,
                    borderRadius: 2,
                    transition: "opacity 0.25s ease",
                  }}
                  className="group-hover:opacity-60"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Meta row */}
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    {/* Tag pill */}
                    <span
                      style={{
                        fontFamily:
                          "var(--font-jetbrains-mono), JetBrains Mono, monospace",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: TAG_COLOR[entry.tag],
                        border: `1px solid ${TAG_COLOR[entry.tag]}`,
                        borderRadius: 3,
                        padding: "2px 7px",
                        opacity: 0.85,
                      }}
                    >
                      {entry.tag}
                    </span>

                    {/* Dot divider */}
                    <span
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "var(--text-muted)",
                        opacity: 0.4,
                        display: "inline-block",
                      }}
                    />

                    {/* Date */}
                    <span
                      style={{
                        fontFamily:
                          "var(--font-jetbrains-mono), JetBrains Mono, monospace",
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {entry.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-3 leading-snug"
                    style={{
                      fontFamily: "var(--font-syne), Syne, sans-serif",
                      fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                    }}
                  >
                    {entry.title}
                  </h3>

                  {/* Body */}
                  <p
                    className="leading-relaxed"
                    style={{
                      fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      maxWidth: "62ch",
                    }}
                  >
                    {entry.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ── Right: Currently sidebar ── */}
          <aside>
            <div
              ref={sidebarRef}
              className="sticky top-28 rounded-lg p-6"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--card-border)",
                borderLeft: `3px solid var(--accent-blue)`,
              }}
            >
              {/* Header */}
              <div
                className="mb-6 flex items-center gap-2"
                style={{
                  fontFamily:
                    "var(--font-jetbrains-mono), JetBrains Mono, monospace",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "var(--accent-blue)",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ opacity: 0.6 }}>&gt;_</span>
                <span>currently</span>
              </div>

              <CurrentlySidebar inView={sidebarInView} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
