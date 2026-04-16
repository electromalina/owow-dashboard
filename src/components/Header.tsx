"use client";
// Top header with logo, profile action, and mobile hamburger drawer.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sidebarLinks } from "@/src/components/sidebar-links";

export function Header() {
  // Mobile navigation lives in the header; desktop navigation is rendered by `Sidebar`.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center justify-between pb-6 lg:pb-8 lg:pt-3">
        <Image src="/owow.svg" alt="OWOW" width={123} height={28} priority />

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
            className="cursor-pointer rounded-lg border border-off-white/30 bg-transparent p-2.5 transition-colors hover:bg-off-black lg:hidden"
          >
            <span className="flex h-8 w-8 flex-col items-center justify-center gap-1.5">
              <span className="block h-0.5 w-6 bg-off-white" />
              <span className="block h-0.5 w-6 bg-off-white" />
              <span className="block h-0.5 w-6 bg-off-white" />
            </span>
          </button>

          <button
            type="button"
            aria-label="Profile"
            className="cursor-pointer rounded-lg border border-off-white/30 bg-transparent p-2.5 transition-colors hover:bg-off-black"
          >
            <Image src="/profile.svg" alt="" width={32} height={32} />
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 bg-black/70 lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <aside
            className="h-full w-[280px] border-r border-off-white/15 bg-black px-6 pb-12 pt-12"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-end">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className="cursor-pointer rounded-lg border border-off-white/30 bg-transparent p-2.5 transition-colors hover:bg-off-black"
              >
                <Image src="/close-icon.svg" alt="" width={32} height={32} />
              </button>
            </div>

            <p className="mt-6 whitespace-nowrap text-xl leading-tight font-mono uppercase text-off-white">
              PROJECT NAME
            </p>

            <nav className="mt-16 space-y-7">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
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
          </aside>
        </div>
      ) : null}
    </>
  );
}
