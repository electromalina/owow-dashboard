// Shared sidebar route definitions used by desktop and mobile navigation.

export type NavLink = {
  label: string;
  href: string;
};

export const baseSidebarLinks: NavLink[] = [
  { label: "DASHBOARD VIEW", href: "/" },
  { label: "UPDATES", href: "/updates" },
  { label: "DOCUMENTS", href: "/documents" },
  { label: "CONTACT INFO", href: "/contact-info" },
];

const adminPanelLink: NavLink = { label: "ADMIN PANEL", href: "/admin" };

export function buildDashboardNavLinks(isAdmin: boolean): NavLink[] {
  if (isAdmin) {
    return [adminPanelLink, ...baseSidebarLinks];
  }
  return [...baseSidebarLinks];
}
