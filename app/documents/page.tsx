"use client";

import { useState } from "react";
import Link from "next/link";
import {
  type Document,
  documentCategories,
  getTotalDocuments,
  getTotalCategories,
} from "@/src/data/documents";
import DocumentRow from "@/src/components/ui/DocumentRow";

// When a category is collapsed, we only show a small preview to keep the page scannable.
const PREVIEW_COUNT = 2;

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function filterDocsBySearch(docs: Document[], search: string): Document[] {
  const q = normalize(search);
  if (!q) return docs;
  return docs.filter((d) => normalize(d.name).includes(q));
}

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  // Expanded categories render the full filtered list instead of the preview slice.
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

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
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* PAGE HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-white">
            Documents
          </h1>
          {/* summary line using our helper functions */}
          <p className="mt-1 font-mono text-sm text-off-white">
            {getTotalCategories()} categories · {getTotalDocuments()} documents
            total
          </p>
        </div>

        {/* action buttons (search, upload) */}
        <div className="flex items-center gap-3">
          {/* Search input */}
          <div className="flex items-center gap-2 rounded-full border border-off-white/20 bg-off-black px-4 py-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-off-white"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="min-w-[12rem] bg-transparent text-sm text-white placeholder-off-white outline-none"
            />
          </div>

          <Link
            href="/documents/upload"
            className="flex items-center gap-2 rounded-full bg-yellow px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow/90"
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

          // check if this category is currently expanded
          const isExpanded = expandedCategories.includes(cat.id);

          // if collapsed, show only first PREVIEW_COUNT documents
          const visibleDocs = isExpanded
            ? filteredDocs
            : filteredDocs.slice(0, PREVIEW_COUNT);

          // how many docs are hidden when collapsed
          const hiddenCount = filteredDocs.length - PREVIEW_COUNT;

          return (
            <section
              key={cat.id}
              className="rounded-2xl border border-off-white/20 bg-off-black"
            >
              {/* Category header: click to toggle expand/collapse */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className="flex w-full items-center gap-3 px-6 py-4 text-left"
              >
                {/* Chevron arrow: rotates when expanded */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-off-white transition-transform ${isExpanded ? "rotate-90" : ""
                    }`}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>

                {/* Category name */}
                <span className="font-heading text-base font-medium text-white">
                  {cat.label}
                </span>

                {/* Document count badge */}
                <span className="rounded-md bg-off-white/10 px-2 py-0.5 text-xs text-off-white">
                  {cat.documents.length}
                </span>
              </button>

              {/* Document rows: always show first 2, rest only when expanded */}

                <div className="px-6 pb-4">
                  {visibleDocs.map((doc) => (
                    <DocumentRow key={doc.id} doc={doc} />
                  ))}

                  {/* "+X more" link if there are hidden documents and shows only when collapsed */}
                  {!isExpanded && hiddenCount > 0 && (
                    <button
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