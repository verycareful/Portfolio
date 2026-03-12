// ═══════════════════════════════════════════════════════
// TypeScript Interfaces — Sricharan Suresh Portfolio
// ═══════════════════════════════════════════════════════

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface StatCard {
  value: string;
  label: string;
}

export interface Education {
  degree: string;
  institution: string;
  institutionLink: string;
  period: string;
  cgpa: string;
}

export interface Organisation {
  name: string;
  role: string;
  period: string;
  link: string;
}

export type ResearchStatus = "published" | "in-progress" | "under-review";

export interface ResearchEntry {
  title: string;
  stack: string[];
  period: string;
  status: ResearchStatus;
  repo: string;
  doi?: string;
  summary: string;
}

export type ProjectCategory =
  | "All"
  | "Quantum"
  | "Mobile"
  | "Web"
  | "Systems"
  | "IoT";

export type ProjectStatus =
  | "live"
  | "active"
  | "published"
  | "research"
  | "review"
  | "wip"
  | "complete";

export interface Project {
  name: string;
  tagline: string;
  stack: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  repo: string | null;
  doi?: string;
  description: string;
  highlight?: string;
}

export type NotebookTag = "QUANTUM" | "PRIVACY" | "ML" | "SYSTEMS";

export interface NotebookEntry {
  date: string;
  tag: NotebookTag;
  title: string;
  body: string;
}

export interface CurrentlyItem {
  emoji: string;
  label: string;
  items: string[];
}

export type CertIcon =
  | "quantum"
  | "algorithms"
  | "ml"
  | "geo"
  | "network"
  | "db"
  | "python"
  | "design";

export interface Certification {
  name: string;
  issuer: string;
  link: string | null;
  icon: CertIcon;
}

export interface Patent {
  id: string;
  title: string;
  filed: string;
  office: string;
}

export interface ContactField {
  name: string;
  type: "text" | "email" | "select" | "textarea";
  placeholder?: string;
  options?: string[];
  required: boolean;
}
