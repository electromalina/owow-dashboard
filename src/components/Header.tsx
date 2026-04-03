"use client";
// Top header with logo, profile action, and mobile hamburger drawer.

import { createClient } from "@/lib/supabase/client";
import {
  buildDashboardNavLinks,
  type NavLink,
} from "@/src/components/sidebar-links";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const [profileOpen, setProfileOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<{
    email?: string;
  } | null>(null);
  const profileWrapRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setSessionUser(user ? { email: user.email } : null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionUser(session?.user ? { email: session.user.email } : null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        profileWrapRef.current &&
        !profileWrapRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setProfileOpen(false);
    router.push("/auth");
    router.refresh();
  }

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

          <div className="relative" ref={profileWrapRef}>
            <button
              type="button"
              aria-label="Profile menu"
              aria-expanded={profileOpen}
              aria-haspopup="true"
              onClick={() => setProfileOpen((open) => !open)}
              className="cursor-pointer rounded-lg border border-off-white/30 bg-transparent p-2.5 transition-colors hover:bg-off-black"
            >
              <Image src="/profile.svg" alt="" width={32} height={32} />
            </button>
            {profileOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full z-[60] mt-2 min-w-[180px] rounded-lg border border-off-white/20 bg-black py-1 shadow-lg"
              >
                {sessionUser ? (
                  <>
                    {sessionUser.email ? (
                      <p className="border-b border-off-white/15 px-4 py-2 text-xs text-off-white/60">
                        {sessionUser.email}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => void handleLogout()}
                      className="w-full px-4 py-2.5 text-left text-sm text-off-white transition-colors hover:bg-off-black"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    role="menuitem"
                    className="block px-4 py-2.5 text-sm text-off-white transition-colors hover:bg-off-black"
                    onClick={() => setProfileOpen(false)}
                  >
                    Sign in
                  </Link>
                )}
              </div>
            ) : null}
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
                <Image src="/close-icon.svg" alt="" width={32} height={32} />
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
                    prefetch={false}
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
