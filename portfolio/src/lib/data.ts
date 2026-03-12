import type {
  NavLink,
  SocialLink,
  StatCard,
  Education,
  Organisation,
  ResearchEntry,
  Project,
  NotebookEntry,
  CurrentlyItem,
  Certification,
  Patent,
  ContactField,
} from "./types";

// ── Navigation ──
export const navLinks: NavLink[] = [
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
];

// ── Social Links ──
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/verycareful",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/verycareful",
    icon: "linkedin",
  },
  {
    label: "ORCiD",
    href: "https://orcid.org/0009-0004-6873-5692",
    icon: "orcid",
  },
];

// ── Hero ──
export const heroRoles: string[] = [
  "Quantum Algorithm Researcher",
  "Cross-Platform Engineer",
  "ML Systems Builder",
  "Privacy Advocate",
];

export const heroBio =
  "Computer Science + Quantum Computing (Honors) @ SRM IST Vadapalani.\nBuilding at the edge — from Ising Hamiltonians to NFC-based campus systems.";

// ── About / Stats ──
export const stats: StatCard[] = [
  { value: "9.31 / 10", label: "CGPA — B.Tech CSE" },
  { value: "10.0 / 10", label: "CGPA — Quantum Computing (Honors)" },
  { value: "3", label: "Published / Under Review Papers" },
  { value: "15+", label: "Repos on GitHub" },
];

export const aboutText =
  "I'm a Computer Science undergraduate at SRM IST Vadapalani with a specialization in Quantum Computing. I work across the stack — from mapping combinatorial optimization problems onto Ising Hamiltonians for quantum execution, to building cross-platform campus systems with NFC, OCR, and real-time sync. I believe in building real things that solve real problems, and in making research accessible and reproducible.";

export const education: Education[] = [
  {
    degree: "B.Tech CSE",
    institution: "SRM IST Vadapalani",
    institutionLink: "https://srmistvdp.edu.in/",
    period: "2023–Present",
    cgpa: "9.31",
  },
  {
    degree: "B.Tech (Honors) Quantum Computing",
    institution: "SRM IST Vadapalani",
    institutionLink: "https://srmistvdp.edu.in/",
    period: "2025–Present",
    cgpa: "10.0",
  },
];

export const organisations: Organisation[] = [
  {
    name: "CSI Club",
    role: "Head of PR and Outreach",
    period: "Jul 2025–Present",
    link: "https://srmistvdp.edu.in/faculty-of-engineering-technology/department-of-computer-science-and-engineering/clubs/",
  },
  {
    name: "SYNC Community",
    role: "Head of Operations",
    period: "Aug 2024–Present",
    link: "https://www.linkedin.com/company/sync-community/",
  },
];

// ── Research ──
export const researchEntries: ResearchEntry[] = [
  {
    title:
      "Quantum-Hybrid Microgrid Optimization via Ising Hamiltonian Simulation",
    stack: ["Python", "IBM Qiskit", "QAOA", "Statistical Mechanics"],
    period: "Jan 2026 – Present",
    status: "in-progress",
    repo: "https://github.com/verycareful/EnergyGridOptimisation",
    summary:
      "Mapping the Unit Commitment problem to a Transverse Field Ising Hamiltonian for quantum execution. MA-QAOA with Layerwise Freezing benchmarked against Simulated Annealing on 5-generator renewable microgrid systems.",
  },
  {
    title: "Comparative Analysis of Classical and Quantum K-Means Clustering",
    stack: ["Python", "Qiskit", "Scikit-learn", "NumPy"],
    period: "2025",
    status: "published",
    doi: "https://doi.org/10.5281/zenodo.18876209",
    repo: "https://github.com/verycareful/QKM",
    summary:
      "Genuine quantum K-Means using SWAP test and fidelity-based distance metrics in Qiskit. Validated on ENB2012 dataset (768 samples) and an expanded 4,998-sample high-dimensional dataset. Archived on Zenodo (CC BY-NC 4.0).",
  },
  {
    title: "Automated Industrial Surface Defect Classification System",
    stack: [
      "Python",
      "PyTorch",
      "EfficientNet",
      "ResNet-50",
      "AMD ROCm",
      "Scikit-learn",
    ],
    period: "2025",
    status: "under-review",
    repo: "https://github.com/verycareful/DL4SDD",
    summary:
      "17-model study across 4 deep learning architectures and 9 traditional ML classifiers. ResNet-50 (GPU) achieved 89.03% accuracy at 3.02ms latency (331 FPS). Validates transfer learning on limited industrial datasets.",
  },
];

// ── Projects ──
export const projects: Project[] = [
  {
    name: "NotBigBrother",
    tagline:
      "Age verification that proves you're an adult. Without proving who you are.",
    stack: ["Node.js", "RSA Blind Signatures", "SCRFD", "InsightFace", "ONNX"],
    category: "Systems",
    status: "live",
    featured: true,
    repo: "https://github.com/Zonde246/NotBigBrother",
    description:
      "Double-blind cryptographic age verification using Chaum blind signatures. Neither the issuer nor the verifying website can surveil the user. AGPL-3.0 licensed.",
    highlight: "Privacy-by-architecture, not policy",
  },
  {
    name: "StEAM (.NET MAUI)",
    tagline: "Campus attendance system with NFC, OCR, and barcode scanning",
    stack: ["C#", ".NET 9 MAUI", "Supabase", "ML Kit", "ZXing", "MIFARE NFC"],
    category: "Mobile",
    status: "active",
    featured: true,
    repo: "https://github.com/verycareful/StEAM_cs",
    description:
      "Cross-platform (Android/iOS/Windows/macOS) late-arrival tracker deployed at SRM IST. NFC Turbo mode with thread-safe atomic compare-exchange, server-side RPC optimization.",
    highlight: "Deployed at SRM IST Vadapalani",
  },
  {
    name: "StEAM (Android)",
    tagline: "Kotlin Multiplatform Android companion to StEAM",
    stack: [
      "Kotlin",
      "Compose Multiplatform",
      "Supabase",
      "CameraX",
      "ML Kit",
    ],
    category: "Mobile",
    status: "active",
    featured: false,
    repo: "https://github.com/verycareful/StEAM",
    description:
      "Android-native version of the StEAM attendance system using Jetpack Compose and Kotlin Multiplatform.",
  },
  {
    name: "MA-QAOA Energy Grid",
    tagline: "Quantum optimization of renewable microgrid scheduling",
    stack: ["Python", "IBM Qiskit", "QAOA", "NumPy"],
    category: "Quantum",
    status: "research",
    featured: true,
    repo: "https://github.com/verycareful/EnergyGridOptimisation",
    description:
      "Unit Commitment mapped to Ising spin-glass Hamiltonian. MA-QAOA with Layerwise Freezing vs Simulated Annealing on 5-generator Critical Load scenarios.",
  },
  {
    name: "Quantum K-Means",
    tagline: "K-Means clustering via SWAP test and quantum fidelity",
    stack: ["Python", "Qiskit", "Scikit-learn", "NumPy"],
    category: "Quantum",
    status: "published",
    featured: false,
    repo: "https://github.com/verycareful/QKM",
    doi: "https://doi.org/10.5281/zenodo.18876209",
    description:
      "Genuine quantum circuits (not pseudo-quantum). Amplitude encoding + SWAP test for inner product computation. Published on Zenodo.",
  },
  {
    name: "Industrial Defect Classifier",
    tagline: "17-model benchmark for surface defect classification",
    stack: ["Python", "PyTorch", "EfficientNet", "ResNet-50", "AMD ROCm"],
    category: "Systems",
    status: "review",
    featured: false,
    repo: "https://github.com/verycareful/DL4SDD",
    description:
      "ResNet-50 GPU: 89.03% accuracy, 331 FPS. 9 traditional ML classifiers + 4 DL architectures compared. DirectML for AMD/Intel/NVIDIA compatibility.",
  },
  {
    name: "ResearchSync",
    tagline:
      "Project management workspace with embedded research containers",
    stack: ["C#", ".NET 9 MAUI", "SQLite", "MVVM"],
    category: "Mobile",
    status: "active",
    featured: false,
    repo: "https://github.com/verycareful/ResearchSync",
    description:
      "Bridges project milestones and knowledge management — citations, code snippets, PDF annotations live inside task containers.",
  },
  {
    name: "MapStrategyGame",
    tagline: "Procedurally generated grand strategy game",
    stack: ["C#", ".NET 9", "Avalonia UI", "xUnit"],
    category: "Systems",
    status: "wip",
    featured: false,
    repo: "https://github.com/verycareful/MapStrategyGame",
    description:
      "Voronoi-based procedural map generation, randomized cultures/religions, real-time simulation engine with MVVM. Inspired by Europa Universalis.",
  },
  {
    name: "Latecomers Web",
    tagline: "Web dashboard for the StEAM attendance system",
    stack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    category: "Web",
    status: "active",
    featured: false,
    repo: "https://github.com/verycareful/Latecomers",
    description:
      "Real-time late-comers dashboard with date range filters, CSV export, role-based access, and OLED-optimized dark mode.",
  },
  {
    name: "ODapp",
    tagline: "On-Duty request management for educational institutions",
    stack: ["C#", ".NET MAUI", "Supabase", "PostgreSQL"],
    category: "Mobile",
    status: "active",
    featured: false,
    repo: "https://github.com/verycareful/ODAPP",
    description:
      "Cross-platform OD request submission and tracking system with role-based auth and persistent session management.",
  },
  {
    name: "Sports Shop",
    tagline: "Full-stack e-commerce with automated invoice generation",
    stack: ["React 18", "Vite", "Supabase", "PostgreSQL"],
    category: "Web",
    status: "complete",
    featured: false,
    repo: "https://github.com/verycareful/sportshopsite",
    description:
      "Midnight blue themed SPA with cart persistence, Supabase auth, and automated printable invoice generation.",
  },
  {
    name: "Smart Doorbell Alert",
    tagline: "IoT motion detection with Discord webhook alerts",
    stack: ["ESP8266", "Arduino C++", "Discord API", "PIR Sensor"],
    category: "IoT",
    status: "complete",
    featured: false,
    repo: null,
    description:
      "Real-time motion detection via PIR sensor on ESP8266, transmitting alerts through secure Discord Webhooks.",
  },
];

export const projectCategories: Project["category"][] = [
  "All",
  "Quantum",
  "Mobile",
  "Web",
  "Systems",
  "IoT",
];

// ── Lab Notebook ──
export const notebookEntries: NotebookEntry[] = [
  {
    date: "Mar 2026",
    tag: "QUANTUM",
    title: "Barren plateaus are genuinely terrifying",
    body: "The deeper the QAOA circuit, the flatter the gradient landscape. Layerwise Freezing helps but I'm not convinced it fully solves the problem at scale. Need to re-read Cerezo et al.",
  },
  {
    date: "Mar 2026",
    tag: "PRIVACY",
    title: "NotBigBrother might actually matter",
    body: "Most age verification systems are surveillance pipelines with a legal cover story. Blind signatures let us decouple identity verification from activity tracking. The math is sound. The hard part is getting anyone to care.",
  },
  {
    date: "Feb 2026",
    tag: "ML",
    title: "Why did ResNet-50 beat EfficientNet on defect classification?",
    body: "EfficientNet is supposed to be more parameter-efficient but ResNet-50 GPU hit 89.03% vs EfficientNet-B0's 84.95%. My hypothesis: ResNet's skip connections handle the low-level texture features in defect images better. Still thinking about this.",
  },
  {
    date: "Jan 2026",
    tag: "SYSTEMS",
    title: "NFC + Camera on Android is a nightmare",
    body: "On Samsung devices, CameraService actively suppresses NFC polling while a CameraCaptureSession is open. Took 3 days to figure out why NFC randomly stopped working. Fixed it with a custom MauiCameraViewHandler and explicit CAMERA_STATE_CLOSED sync.",
  },
];

export const currentlyItems: CurrentlyItem[] = [
  {
    emoji: "⚡",
    label: "Working on",
    items: [
      "MA-QAOA implementation (Phase 1)",
      "ResearchSync v1 — SRS complete, building now",
    ],
  },
  {
    emoji: "📖",
    label: "Reading",
    items: [
      "Cerezo et al. — Variational Quantum Algorithms (2021)",
      "Something on blind signature schemes",
    ],
  },
  {
    emoji: "🔭",
    label: "Thinking about",
    items: [
      "Can QAOA outperform SA on real microgrid data?",
      "What does privacy-preserving identity look like at scale?",
    ],
  },
  {
    emoji: "📍",
    label: "Location",
    items: ["Chennai, India", "SRM IST Vadapalani"],
  },
];

// ── Certifications ──
export const certifications: Certification[] = [
  {
    name: "Quantum Computing For Everyone",
    issuer: "Coursera · Fractal Analytics",
    link: "https://coursera.org/share/922ae472bc13700c3d510c2766cf8c5b",
    icon: "quantum",
  },
  {
    name: "Divide and Conquer, Sorting and Searching, and Randomized Algorithms",
    issuer: "Coursera · Stanford University",
    link: "https://coursera.org/share/a7d808915d8941da35c85f1423367b80",
    icon: "algorithms",
  },
  {
    name: "Certificate Program in AI & Machine Learning",
    issuer: "NASSCOM FutureSkills Prime",
    link: "https://inspiration-fun-7467.my.salesforce-sites.com/CDACcertificatePage2?id=a02Vy00000bZPKnIAO",
    icon: "ml",
  },
  {
    name: "Geodata Processing using Python and Machine Learning",
    issuer: "IIRS · ISRO",
    link: null,
    icon: "geo",
  },
  {
    name: "Demystifying Networking",
    issuer: "NPTEL",
    link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs125/Course/NPTEL25CS125S63320257809160762.pdf",
    icon: "network",
  },
  {
    name: "Data Base Management System",
    issuer: "NPTEL",
    link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs18/Course/NPTEL25CS18S55040067101392285.pdf",
    icon: "db",
  },
  {
    name: "Programming, Data Structures and Algorithms using Python",
    issuer: "NPTEL",
    link: "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs78/Course/NPTEL24CS78S33310953202760773.pdf",
    icon: "python",
  },
  {
    name: "Design Thinking - A Primer",
    issuer: "NPTEL",
    link: "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/110/noc24-mg72/Course/NPTEL24MG72S43310970802760773.pdf",
    icon: "design",
  },
];

export const patent: Patent = {
  id: "IN202541069649",
  title:
    "A System of Ergonomic Assistive Writing Using a Pressure-Sensitive Digital Pen",
  filed: "July 2025",
  office: "Indian Patent Office",
};

// ── Contact Form ──
export const contactFields: ContactField[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Your name",
    required: true,
  },
  {
    name: "email",
    type: "email",
    placeholder: "you@example.com",
    required: true,
  },
  {
    name: "subject",
    type: "select",
    options: [
      "Research Collaboration",
      "Internship",
      "Project",
      "Other",
    ],
    required: true,
  },
  {
    name: "message",
    type: "textarea",
    placeholder: "Your message...",
    required: true,
  },
];
