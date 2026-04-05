"use client";
// Desktop sidebar navigation with active-link highlighting.

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { label: "DASHBOARD VIEW", href: "/" },
  { label: "UPDATES", href: "/updates" },
  { label: "DOCUMENTS", href: "/documents" },
  { label: "CONTACT INFO", href: "/contact-info" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-2xl border border-off-white/15 bg-black/40 px-6 pb-12 pt-12 backdrop-blur-sm sm:pb-14 sm:pt-14 lg:min-h-[550px]">
      <div className="flex flex-col">
        <p className="whitespace-nowrap text-xl leading-tight font-mono uppercase text-off-white">
          PROJECT NAME
        </p>

        <nav className="mt-16 space-y-7">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`block w-full whitespace-nowrap rounded-lg border px-4 py-3 text-center text-[11px] tracking-[0.12em] font-mono uppercase transition-[background-color,color,border-color] duration-300 ease-out ${
                  isActive
                    ? "border-yellow bg-yellow text-black hover:bg-yellow hover:text-black"
                    : "border-off-white/30 bg-transparent text-off-white hover:bg-off-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}