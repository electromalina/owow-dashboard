"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getDocumentById } from "@/src/data/documents";
import StatusBadge from "@/src/components/ui/StatusBadge";

export default function DocumentDetailPage() {
  const params = useParams();
  const doc = getDocumentById(params.id as string);

  if (!doc) {
    return (
      <div className="px-4 py-10 sm:px-6">
        <p className="text-off-white">Document not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <Link href="/documents" className="text-blue hover:underline">
          Documents
        </Link>
        <span className="text-off-white">›</span>
        {doc.category ? (
          <>
            <span className="text-blue">{doc.category}</span>
            <span className="text-off-white">›</span>
          </>
        ) : null}
        <span className="min-w-0 break-words text-off-white">{doc.name}</span>
      </nav>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-off-white/10">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-off-white"
              aria-hidden
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-off-white/10 px-2 py-0.5 font-mono text-xs text-off-white">
                {doc.type}
              </span>
              {doc.versions?.[0]?.isCurrent ? (
                <span className="rounded-md bg-yellow/20 px-2 py-0.5 text-xs text-yellow">
                  {doc.versions[0].version} — current
                </span>
              ) : null}
            </div>
            <h1 className="mt-2 break-words font-heading text-2xl font-semibold text-white">
              {doc.name}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
          <button className="flex items-center gap-2 rounded-full border border-off-white/30 px-5 py-2 text-sm text-white transition-colors hover:bg-off-white/5">
            ↓ Download
          </button>
          {doc.sourceLinks?.[0] ? (
            <a
              href={doc.sourceLinks[0].url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-yellow px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow/90"
            >
              ↗ Open source
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 rounded-2xl border border-off-white/20 bg-off-black">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-off-white/10 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2 text-sm text-off-white">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Document Preview
            </div>
            <span className="text-xs text-off-white">Page 1 of 12</span>
          </div>

          <div className="space-y-3 p-4 sm:p-8">
            <div className="h-4 w-3/4 rounded bg-off-white/10" />
            <div className="h-3 w-full rounded bg-off-white/5" />
            <div className="h-3 w-full rounded bg-off-white/5" />
            <div className="h-3 w-5/6 rounded bg-off-white/5" />
            <div className="h-3 w-full rounded bg-off-white/5" />
            <div className="h-3 w-4/6 rounded bg-off-white/5" />
            <div className="mt-6 h-4 w-2/3 rounded bg-off-white/10" />
            <div className="h-3 w-full rounded bg-off-white/5" />
            <div className="h-3 w-full rounded bg-off-white/5" />
            <div className="h-3 w-3/4 rounded bg-off-white/5" />
            <div className="mt-4 flex gap-4">
              <div className="h-24 w-1/2 rounded-lg bg-off-white/5" />
              <div className="h-24 w-1/2 rounded-lg bg-off-white/5" />
            </div>
            <div className="mt-4 h-3 w-2/3 rounded bg-off-white/5" />
            <div className="h-3 w-full rounded bg-off-white/5" />
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="rounded-2xl border border-off-white/20 bg-off-black p-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-off-white">
              Document Info
            </h3>
            <dl className="mt-4 divide-y divide-off-white/10">
              {doc.author ? (
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <dt className="shrink-0 font-mono text-xs uppercase text-off-white">
                    Author
                  </dt>
                  <dd className="min-w-0 break-words text-sm text-white sm:text-right">
                    {doc.author}
                  </dd>
                </div>
              ) : null}
              {doc.category ? (
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <dt className="shrink-0 font-mono text-xs uppercase text-off-white">
                    Category
                  </dt>
                  <dd className="min-w-0 break-words text-sm text-white sm:text-right">
                    {doc.category}
                  </dd>
                </div>
              ) : null}
              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <dt className="shrink-0 font-mono text-xs uppercase text-off-white">
                  File Type
                </dt>
                <dd className="min-w-0 break-words text-sm text-white sm:text-right">
                  {doc.type} —{" "}
                  {doc.type === "DOC"
                    ? "Word Document"
                    : doc.type === "PDF"
                      ? "PDF Document"
                      : "External Link"}
                </dd>
              </div>
              {doc.size ? (
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <dt className="shrink-0 font-mono text-xs uppercase text-off-white">
                    File Size
                  </dt>
                  <dd className="min-w-0 break-words text-sm text-white sm:text-right">
                    {doc.size}
                  </dd>
                </div>
              ) : null}
              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <dt className="shrink-0 font-mono text-xs uppercase text-off-white">
                  Last Updated
                </dt>
                <dd className="min-w-0 break-words text-sm text-white sm:text-right">
                  {doc.date}
                </dd>
              </div>
            </dl>
            <div className="mt-1 border-t border-off-white/10 pt-4">
              <StatusBadge status={doc.status} />
            </div>
          </div>

          {doc.sourceLinks && doc.sourceLinks.length > 0 ? (
            <div className="rounded-2xl border border-off-white/20 bg-off-black p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-off-white">
                Source Links
              </h3>
              <div className="mt-3 space-y-2">
                {doc.sourceLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-off-white/10 px-4 py-3 text-sm text-white transition-colors hover:bg-off-white/5"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-blue"
                        aria-hidden
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      <span className="truncate">{link.label}</span>
                    </div>
                    <span className="shrink-0 text-off-white">↗</span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {doc.versions && doc.versions.length > 0 ? (
            <div className="rounded-2xl border border-off-white/20 bg-off-black p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-off-white">
                Version History
              </h3>
              <div className="mt-3 space-y-3">
                {doc.versions.map((v) => (
                  <div key={v.version} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          v.isCurrent ? "bg-yellow" : "bg-off-white/30"
                        }`}
                      />
                      <span className="text-sm text-white">{v.version}</span>
                      {v.isCurrent ? (
                        <span className="rounded-md bg-yellow/20 px-1.5 py-0.5 text-xs text-yellow">
                          current
                        </span>
                      ) : null}
                    </div>
                    <span className="font-mono text-xs text-off-white">
                      ⏱ {v.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

