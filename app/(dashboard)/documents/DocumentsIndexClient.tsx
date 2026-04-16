"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  type Document,
  documentCategories,
  getTotalCategories,
  getTotalDocuments,
} from "@/src/data/documents";
import DocumentRow from "@/src/components/ui/DocumentRow";

const PREVIEW_COUNT = 2;

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function filterDocsBySearch(docs: Document[], search: string): Document[] {
  const q = normalize(search);
  if (!q) return docs;
  return docs.filter((d) => normalize(d.name).includes(q));
}

export default function DocumentsIndexClient() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const categoryParam = searchParams.get("category");
  const forcedExpandedCategory =
    categoryParam && documentCategories.some((c) => c.id === categoryParam)
      ? categoryParam
      : null;

  const effectiveExpandedCategories = forcedExpandedCategory
    ? Array.from(new Set([...expandedCategories, forcedExpandedCategory]))
    : expandedCategories;

  function toggleCategory(categoryId: string) {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }

  const hasAnyMatch = documentCategories.some(
    (cat) => filterDocsBySearch(cat.documents, search).length > 0
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <h1 className="font-heading text-3xl font-semibold text-white">
            Documents
          </h1>
          <p className="mt-1 font-mono text-sm text-off-white">
            {getTotalCategories()} categories · {getTotalDocuments()} documents
            total
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          <div className="flex min-w-0 items-center gap-2 rounded-full border border-off-white/20 bg-off-black px-3 py-2 sm:px-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-off-white"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-off-white/70 outline-none sm:min-w-[10rem]"
            />
          </div>

          <Link
            href="/documents/upload"
            className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-yellow px-5 py-2 text-center text-sm font-medium text-black transition-colors hover:bg-yellow/90"
          >
            + Upload
          </Link>
        </div>
      </div>

      {!hasAnyMatch ? (
        <p className="mt-8 text-center font-mono text-sm text-off-white">
          No documents match your search.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {documentCategories.map((cat) => {
            const filteredDocs = filterDocsBySearch(cat.documents, search);
            if (filteredDocs.length === 0) return null;

            const isExpanded = effectiveExpandedCategories.includes(cat.id);
            const visibleDocs = isExpanded
              ? filteredDocs
              : filteredDocs.slice(0, PREVIEW_COUNT);
            const hiddenCount = filteredDocs.length - PREVIEW_COUNT;

            return (
              <section
                key={cat.id}
                className="rounded-2xl border border-off-white/20 bg-off-black"
              >
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className="flex w-full items-center gap-2 px-4 py-4 text-left sm:gap-3 sm:px-6"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-off-white transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                    aria-hidden
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  <span className="font-heading text-base font-medium text-white">
                    {cat.label}
                  </span>
                  <span className="rounded-md bg-off-white/10 px-2 py-0.5 text-xs text-off-white">
                    {cat.documents.length}
                  </span>
                </button>

                <div className="px-4 pb-4 sm:px-6">
                  {visibleDocs.map((doc) => (
                    <DocumentRow key={doc.id} doc={doc} rowBleed="documents" />
                  ))}

                  {!isExpanded && hiddenCount > 0 && (
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.id)}
                      className="mt-3 text-sm text-blue hover:underline"
                    >
                      +{hiddenCount} more in {cat.label} →
                    </button>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
