"use client";

import { useState } from "react";
import {
  documentCategories,
  getTotalDocuments,
  getTotalCategories,
} from "@/src/data/documents";
import DocumentRow from "@/src/components/ui/DocumentRow";

// how many documents to show per category 
const PREVIEW_COUNT = 2;

export default function DocumentsPage() {
  // track which categories are expanded (showing all docs)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    documentCategories.map((cat) => cat.id)
  );

  // toggle a category open or closed
  function toggleCategory(categoryId: string) {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId) // remove = collapse
        : [...prev, categoryId] // add = expand
    );
  }

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

        {/* cction buttons (search, upload) */}
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
              placeholder="Search documents..."
              className="bg-transparent text-sm text-white placeholder-off-white outline-none"
            />
          </div>

          {/* Upload button: yellow CTA matching OWOW brand */}
          <button className="flex items-center gap-2 rounded-full bg-yellow px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow/90">
            + Upload
          </button>
        </div>
      </div>

      {/* CATEGORY SECTIONS */}
      <div className="mt-8 space-y-4">
        {documentCategories.map((cat) => {
          // check if this category is currently expanded
          const isExpanded = expandedCategories.includes(cat.id);

          // if collapsed, show only first PREVIEW_COUNT documents
          const visibleDocs = isExpanded
            ? cat.documents
            : cat.documents.slice(0, PREVIEW_COUNT);

          // how many docs are hidden when collapsed
          const hiddenCount = cat.documents.length - PREVIEW_COUNT;

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

              {/* Document rows: only visible when expanded */}
              {isExpanded && (
                <div className="px-6 pb-4">
                  {visibleDocs.map((doc) => (
                    <DocumentRow key={doc.id} doc={doc} />
                  ))}

                  {/* "+X more" link if there are hidden documents */}
                  {!isExpanded && hiddenCount > 0 && (
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="mt-3 text-sm text-blue hover:underline"
                    >
                      +{hiddenCount} more - View all {cat.label} →
                    </button>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}