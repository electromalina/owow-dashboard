import type { Metadata } from "next";
import Link from "next/link";

/** Replace with your real Slack workspace / channel URLs and addresses. */
const CONTACT = {
  projectManager: "Alex Morgan",
  slack: {
    label: "Client project channel",
    description:
      "Day-to-day questions and async discussion with your project manager happen here.",
    href: "https://slack.com",
  },
  email: {
    label: "Project inbox",
    description:
      "For formal requests, summaries, or anything you prefer to keep in email.",
    address: "project@owow.studio",
  },
  support: {
    label: "Portal & technical support",
    description:
      "Login issues, bugs in this dashboard, or access to the client portal—contact this address.",
    address: "portal-support@owow.studio",
  },
} as const;

export const metadata: Metadata = {
  title: "Contact | OWOW Dashboard",
  description: "How to reach your project team and technical support.",
};

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834V5.042zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.528 2.528 0 0 1-2.52-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.528 2.528 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.528 2.528 0 0 1-2.52-2.523 2.528 2.528 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function SupportIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function ContactInfoPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-white">
          Contact
        </h1>
        <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-off-white">
          Your project manager is your main point of contact. Use Slack for
          everyday collaboration; use email when you need a paper trail or formal
          handoff. For anything wrong with this portal itself, reach technical
          support.
        </p>
      </div>

      <div className="mt-10 space-y-5">
        {/* Primary: Slack + PM */}
        <section className="relative overflow-hidden rounded-2xl border border-yellow/35 bg-off-black">
          <div className="absolute inset-y-0 left-0 w-1 bg-yellow" aria-hidden />
          <div className="p-6 pl-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow/15 text-yellow">
                  <SlackIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-off-white">
                    Primary — Slack
                  </p>
                  <h2 className="mt-1 font-heading text-lg font-medium text-white">
                    {CONTACT.slack.label}
                  </h2>
                  <p className="mt-1 text-sm text-off-white">
                    Project manager:{" "}
                    <span className="text-white">{CONTACT.projectManager}</span>
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-off-white">
                    {CONTACT.slack.description}
                  </p>
                </div>
              </div>
              <Link
                href={CONTACT.slack.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-yellow px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-yellow/90 sm:mt-0"
              >
                Open in Slack
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Email */}
        <section className="rounded-2xl border border-off-white/20 bg-off-black p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-off-white/10 text-blue">
                <MailIcon />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-off-white">
                  Email
                </p>
                <h2 className="mt-1 font-heading text-lg font-medium text-white">
                  {CONTACT.email.label}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-off-white">
                  {CONTACT.email.description}
                </p>
                <a
                  href={`mailto:${CONTACT.email.address}`}
                  className="mt-4 inline-block font-mono text-sm text-blue transition-colors hover:text-blue/80 hover:underline"
                >
                  {CONTACT.email.address}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Portal tech support */}
        <section className="rounded-2xl border border-off-white/20 bg-off-black p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-off-white/10 text-off-white">
                <SupportIcon />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-off-white">
                  This portal
                </p>
                <h2 className="mt-1 font-heading text-lg font-medium text-white">
                  {CONTACT.support.label}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-off-white">
                  {CONTACT.support.description}
                </p>
                <a
                  href={`mailto:${CONTACT.support.address}?subject=OWOW%20Dashboard%20support`}
                  className="mt-4 inline-block font-mono text-sm text-blue transition-colors hover:text-blue/80 hover:underline"
                >
                  {CONTACT.support.address}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
