// Shared route definitions used by both `Sidebar` (desktop) and `Header` (mobile drawer).
export const sidebarLinks = [
  { label: "DASHBOARD VIEW", href: "/" },
  { label: "UPDATES", href: "/updates" },
  { label: "DOCUMENTS", href: "/documents" },
  { label: "CONTACT INFO", href: "/contact-info" },
] as const;
