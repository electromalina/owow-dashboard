"use client";

import {
  buildDashboardNavLinks,
  type NavLink,
} from "@/src/components/sidebar-links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function linkIsActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  if (href === "/admin") {
    return pathname === "/admin" || pathname.startsWith("/admin/");
  }
  return pathname === href;
}

type HeaderProps = {
  /** When omitted (e.g. auth layout), admin link is hidden. */
  navLinks?: NavLink[];
};

export function Header({ navLinks }: HeaderProps) {
  const mobileNavLinks = navLinks ?? buildDashboardNavLinks(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="flex min-w-0 items-center justify-between gap-3 pb-6 lg:pb-8 lg:pt-3">
        <Image
          src="/owow.svg"
          alt="OWOW"
          width={123}
          height={28}
          priority
          sizes="123px"
        />

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

          <div className="rounded-lg border border-off-white/30 bg-transparent p-2.5">
            <Image
              src="/profile.svg"
              alt="Profile"
              width={32}
              height={32}
              sizes="32px"
              loading="lazy"
              fetchPriority="low"
            />
          </div>
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
                <Image
                  src="/close-icon.svg"
                  alt=""
                  width={32}
                  height={32}
                  sizes="32px"
                  loading="lazy"
                  fetchPriority="low"
                />
              </button>
            </div>

            <p className="mt-6 whitespace-nowrap text-xl leading-tight font-mono uppercase text-off-white">
              PROJECT NAME
            </p>

            <nav className="mt-16 space-y-7">
              {mobileNavLinks.map((link) => {
                const isActive = linkIsActive(pathname, link.href);

                return (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    prefetch={link.href !== "/admin"}
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
