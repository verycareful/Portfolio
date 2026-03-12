"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navLinks } from "@/lib/data";
import { useActiveSection } from "@/lib/useActiveSection";

const sectionIds = ["about", "research", "projects", "lab", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        borderBottom: scrolled
          ? "1px solid var(--card-border)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#"
          aria-label="Go to top"
          className="text-xl font-bold tracking-wider"
          style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          SRICHARAN
          <span
            className="cursor-blink ml-0.5"
            style={{ color: "var(--accent-blue)" }}
          >
            _
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium transition-colors"
                style={{
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  color: isActive
                    ? "var(--accent-blue)"
                    : "var(--text-secondary)",
                }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5"
                    style={{ background: "var(--accent-blue)" }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            );
          })}

          <ThemeToggle />

          <a
            href="/resume.pdf"
            download
            aria-label="Download resume"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            style={{
              background: "var(--accent-orange)",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#D4822F")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--accent-orange)")
            }
          >
            Resume <Download size={14} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--card-bg)",
              color: "var(--text-primary)",
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t md:hidden"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--nav-bg)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white"
                style={{ background: "var(--accent-orange)" }}
              >
                Resume <Download size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
