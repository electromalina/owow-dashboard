"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getDocumentById } from "@/src/data/documents";
import StatusBadge from "@/src/components/ui/StatusBadge";

export default function DocumentDetailPage() {
  // Reads the dynamic route param and looks up the corresponding document in our data source.
  const params = useParams();
  const doc = getDocumentById(params.id as string);

  if (!doc) {
    return (
      <div className="px-6 py-10">
        <p className="text-off-white">Document not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/*  BREADCRUMB  */}
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/documents" className="text-blue hover:underline">
          Documents
        </Link>
        <span className="text-off-white">›</span>
        {doc.category && (
          <>
            <span className="text-blue">{doc.category}</span>
            <span className="text-off-white">›</span>
          </>
        )}
        <span className="text-off-white">{doc.name}</span>
      </nav>

      <div className="mt-6 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-off-white/10">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-off-white"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-off-white/10 px-2 py-0.5 font-mono text-xs text-off-white">
                {doc.type}
              </span>
              {doc.versions?.[0]?.isCurrent && (
                <span className="rounded-md bg-yellow/20 px-2 py-0.5 text-xs text-yellow">
                  {doc.versions[0].version} — current
                </span>
              )}
            </div>
            <h1 className="mt-2 font-heading text-2xl font-semibold text-white">
              {doc.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full border border-off-white/30 px-5 py-2 text-sm text-white transition-colors hover:bg-off-white/5">
            ↓ Download
          </button>
          {doc.sourceLinks?.[0] && (
            <a
              href={doc.sourceLinks[0].url}
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-yellow px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow/90"
            >
              ↗ Open source
            </a>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl border border-off-white/20 bg-off-black">
          <div className="flex items-center justify-between border-b border-off-white/10 px-6 py-3">
            <div className="flex items-center gap-2 text-sm text-off-white">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Document Preview
            </div>
            <span className="text-xs text-off-white">Page 1 of 12</span>
          </div>

          <div className="space-y-3 p-8">
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

        <div className="space-y-4">
          <div className="rounded-2xl border border-off-white/20 bg-off-black p-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-off-white">
              Document Info
            </h3>
            <dl className="mt-4 divide-y divide-off-white/10">
              {doc.author && (
                <div className="flex justify-between py-3">
                  <dt className="font-mono text-xs uppercase text-off-white">Author</dt>
                  <dd className="text-sm text-white">{doc.author}</dd>
                </div>
              )}
              {doc.category && (
                <div className="flex justify-between py-3">
                  <dt className="font-mono text-xs uppercase text-off-white">Category</dt>
                  <dd className="text-sm text-white">{doc.category}</dd>
                </div>
              )}
              <div className="flex justify-between py-3">
                <dt className="font-mono text-xs uppercase text-off-white">File Type</dt>
                <dd className="text-sm text-white">
                  {doc.type} — {doc.type === "DOC" ? "Word Document" : doc.type === "PDF" ? "PDF Document" : "External Link"}
                </dd>
              </div>
              {doc.size && (
                <div className="flex justify-between py-3">
                  <dt className="font-mono text-xs uppercase text-off-white">File Size</dt>
                  <dd className="text-sm text-white">{doc.size}</dd>
                </div>
              )}
              <div className="flex justify-between py-3">
                <dt className="font-mono text-xs uppercase text-off-white">Last Updated</dt>
                <dd className="text-sm text-white">{doc.date}</dd>
              </div>
            </dl>
            <div className="border-t border-off-white/10 pt-4 mt-1">
              <StatusBadge status={doc.status} />
            </div>
          </div>

          {doc.sourceLinks && doc.sourceLinks.length > 0 && (
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
                    className="flex items-center justify-between rounded-xl border border-off-white/10 px-4 py-3 text-sm text-white transition-colors hover:bg-off-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-blue"
                      >
                        {/* Chain link icon , indicates an external source URL*/}
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      {link.label}
                    </div>
                    <span className="text-off-white">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {doc.versions && doc.versions.length > 0 && (
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
                      {v.isCurrent && (
                        <span className="rounded-md bg-yellow/20 px-1.5 py-0.5 text-xs text-yellow">
                          current
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-off-white">
                      ⏱ {v.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}