export type UpdateCategory =
  | "milestone"
  | "design"
  | "development"
  | "documents"
  | "meeting";

export interface UpdateItem {
  id: string;
  day: string;
  month: string;
  year: string;
  category: UpdateCategory;
  title: string;
  tags: string[];
  summary: string;
  details: string[];
  deliverables?: { name: string; type: string }[];
  nextSteps?: string[];
}

export const projectInfo = {
  name: "E-commerce Platform",
  client: "TechRetail Inc.",
};

export const phases = [
  {
    id: "sprint-4",
    name: "Current Sprint",
    label: "Sprint 4",
    isCurrent: true,
    dateRange: "Mar 20 - Apr 10, 2026",
  },
  {
    id: "sprint-3",
    name: "Sprint 3",
    label: "Sprint 3",
    isCurrent: false,
    dateRange: "Mar 1 - Mar 19, 2026",
  },
  {
    id: "sprint-2",
    name: "Sprint 2",
    label: "Sprint 2",
    isCurrent: false,
    dateRange: "Feb 10 - Feb 28, 2026",
  },
  {
    id: "sprint-1",
    name: "Sprint 1",
    label: "Sprint 1",
    isCurrent: false,
    dateRange: "Jan 20 - Feb 9, 2026",
  },
];

export const filterOptions = [
  { id: "all", label: "ALL" },
  { id: "meeting", label: "MEETINGS" },
  { id: "documents", label: "DOCUMENTS" },
  { id: "development", label: "DEVELOPMENT" },
  { id: "design", label: "DESIGN" },
] as const;

export const updates: UpdateItem[] = [
  {
    id: "1",
    day: "03",
    month: "APRIL",
    year: "2026",
    category: "milestone",
    title: "Design Phase Completed",
    tags: ["Milestone", "Design", "UI/UX"],
    summary:
      "We have successfully completed the entire design phase for your e-commerce platform. All UI/UX designs have been finalized and approved, ready for development handoff.",
    details: [
      "Finalized all 47 unique page designs including homepage, product listings, product details, cart, checkout flow, and user account pages",
      "Created responsive layouts optimized for desktop, tablet, and mobile devices",
      "Developed comprehensive design system with 120+ reusable components",
      "Completed accessibility audit ensuring WCAG 2.1 AA compliance",
      "Delivered interactive Figma prototypes for all user flows",
    ],
    deliverables: [
      { name: "Brand Guidelines v2.0.pdf", type: "PDF" },
      { name: "Design System.fig", type: "Figma" },
      { name: "UI Kit - Complete.sketch", type: "Sketch" },
    ],
    nextSteps: [
      "Development team to begin frontend implementation next week",
      "Weekly design reviews scheduled during development phase",
    ],
  },
  {
    id: "2",
    day: "01",
    month: "APRIL",
    year: "2026",
    category: "development",
    title: "API Integration Complete",
    tags: ["Development", "Backend", "API"],
    summary:
      "Our backend team has completed the integration of all third-party APIs including payment gateway, shipping providers, and inventory management system.",
    details: [
      "Integrated Stripe payment gateway with support for 15+ payment methods",
      "Connected shipping APIs for DHL, FedEx, and UPS with real-time tracking",
      "Set up inventory sync with your existing ERP system",
      "Implemented webhook handlers for real-time notifications",
      "Created comprehensive API documentation for future maintenance",
    ],
    deliverables: [
      { name: "API Documentation.pdf", type: "PDF" },
      { name: "Integration Guide.md", type: "Markdown" },
    ],
    nextSteps: [
      "Begin integration testing with your systems",
      "Performance optimization phase starts next week",
    ],
  },
  {
    id: "3",
    day: "26",
    month: "MARCH",
    year: "2026",
    category: "meeting",
    title: "Sprint Planning Session",
    tags: ["Meeting", "Planning", "Sprint 4"],
    summary:
      "We conducted our Sprint 4 planning session with your team to prioritize features for the upcoming development cycle and align on delivery timelines.",
    details: [
      "Reviewed Sprint 3 accomplishments and lessons learned",
      "Prioritized 24 user stories for Sprint 4 development",
      "Identified and addressed 3 technical blockers from previous sprint",
      "Aligned on revised timeline for checkout flow implementation",
      "Scheduled daily standups and weekly demos for the sprint",
    ],
    deliverables: [
      { name: "Sprint 4 Backlog.pdf", type: "PDF" },
      { name: "Meeting Recording.mp4", type: "Video" },
    ],
  },
  {
    id: "4",
    day: "20",
    month: "MARCH",
    year: "2026",
    category: "documents",
    title: "Technical Specs Delivered",
    tags: ["Documents", "Technical", "Architecture"],
    summary:
      "The complete technical specification document has been delivered, covering system architecture, database design, and infrastructure requirements.",
    details: [
      "Documented microservices architecture with 12 core services",
      "Designed database schema with 45 tables and optimized indexes",
      "Specified cloud infrastructure setup on AWS with auto-scaling",
      "Created security protocols and compliance requirements",
      "Outlined disaster recovery and backup procedures",
    ],
    deliverables: [
      { name: "Technical Specs v1.0.pdf", type: "PDF" },
      { name: "Architecture Diagram.fig", type: "Figma" },
      { name: "Database Schema.sql", type: "SQL" },
    ],
  },
  {
    id: "5",
    day: "15",
    month: "MARCH",
    year: "2026",
    category: "design",
    title: "Design System Published",
    tags: ["Design", "Components", "UI Kit"],
    summary:
      "We have published the complete design system for your platform. This comprehensive library ensures consistency across all digital touchpoints.",
    details: [
      "Created 120+ reusable UI components with multiple variants",
      "Documented design tokens for colors, typography, spacing, and shadows",
      "Built interactive Storybook documentation for developers",
      "Included dark mode variants for all components",
      "Provided Figma and code-ready assets for seamless handoff",
    ],
    deliverables: [
      { name: "Design System Documentation", type: "Storybook" },
      { name: "Figma Component Library", type: "Figma" },
      { name: "Design Tokens.json", type: "JSON" },
    ],
  },
];
