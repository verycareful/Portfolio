import { Github, Linkedin, ExternalLink } from "lucide-react";
import { socialLinks } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={16} />,
  linkedin: <Linkedin size={16} />,
  orcid: <ExternalLink size={16} />,
};

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-8"
      style={{ borderColor: "var(--card-border)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p
          className="text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          <span
            className="font-bold"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
              color: "var(--text-secondary)",
            }}
          >
            SRICHARAN SURESH
          </span>
          <span className="mx-2">·</span>
          Built with Next.js + Framer Motion
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="transition-colors hover:text-[var(--accent-blue)]"
              style={{ color: "var(--text-muted)" }}
            >
              {iconMap[link.icon]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
