"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  Download,
  Send,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const contactLinks = [
  {
    icon: <Mail size={18} />,
    label: "sricharanc03@gmail.com",
    href: "mailto:sricharanc03@gmail.com",
  },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/verycareful",
  },
  {
    icon: <Github size={18} />,
    label: "GitHub",
    href: "https://github.com/verycareful",
  },
  {
    icon: <ExternalLink size={18} />,
    label: "ORCiD",
    href: "https://orcid.org/0009-0004-6873-5692",
  },
];

const subjectOptions = [
  "Research Collaboration",
  "Internship",
  "Project",
  "Other",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: subjectOptions[0],
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(
      `[Portfolio] ${formData.subject}: ${formData.name}`
    );
    const mailtoBody = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\nSubject: ${formData.subject}\n\n${formData.message}`
    );
    window.location.href = `mailto:sricharanc03@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
  };

  return (
    <section
      id="contact"
      className="section-dots relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="CONTACT" number="[07]" />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left — Heading + Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="mb-6 text-3xl font-bold leading-tight md:text-4xl"
              style={{
                fontFamily: "var(--font-syne), Syne, sans-serif",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              Let&apos;s build something
              <br />
              that matters.
            </h3>

            <p
              className="mb-8 max-w-md leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Open to research collaborations, internships, and interesting
              conversations about quantum computing, privacy systems, or
              cross-platform engineering.
            </p>

            {/* Contact links */}
            <div className="mb-8 flex flex-col gap-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="flex items-center gap-3 text-sm transition-colors hover:text-[var(--accent-blue)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--accent-blue)" }}>
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>

            {/* Download Resume */}
            <a
              href="/resume.pdf"
              download
              aria-label="Download resume"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
              style={{ background: "var(--accent-orange)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#D4822F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--accent-orange)")
              }
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card flex flex-col gap-4 p-6"
          >
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              aria-label="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent-blue)]"
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent-blue)]"
              style={inputStyle}
            />

            <select
              name="subject"
              required
              aria-label="Subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              className="rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent-blue)]"
              style={inputStyle}
            >
              {subjectOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message..."
              aria-label="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="resize-none rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent-blue)]"
              style={inputStyle}
            />

            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
              style={{ background: "var(--accent-blue)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent-blue-dim)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--accent-blue)")
              }
            >
              Send Message
              <Send size={14} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
