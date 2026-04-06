"use client";

//it lets the component remember thingsw hich tab is currently selected
import { useState } from "react";

// import mock data and types from the shared data file
import { documentCategories } from "@/src/data/documents";
//olny show 3 categories and max 3 doc in each
const WIDGET_CATEGORIES = documentCategories.slice(0, 3);
const MAX_DOCS = 3;



import DocumentRow from "@/src/components/ui/DocumentRow";

type KeyDocumentsProps = {
  className?: string;
};

export default function KeyDocuments({ className = "" }: KeyDocumentsProps) {

  // React tracks which tab is active.
  // activeTab stores the current category id ("proposal", "prd", "assets")
  // setActiveTab is the function to change it
  // default to the first category in data
  const [activeTab, setActiveTab] = useState(WIDGET_CATEGORIES[0].id);


  // Find the full category object that matches the active tab
  // .find() loops through the array and returns the first match
  const activeCategory = WIDGET_CATEGORIES.find(
    (cat) => cat.id === activeTab
  );

  return (
    <div
      className={`flex h-full min-h-0 flex-col rounded-2xl border border-off-white/15 bg-off-black p-5 ${className}`}
    >
      <div className="flex shrink-0 flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <h2 className="font-heading text-lg font-medium leading-tight text-white">
            Key Documents
          </h2>

          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-off-white">
            Browse by Type
          </p>
        </div>

        <a
          href="/documents"
          className="shrink-0 self-start rounded-lg border border-off-white/30 bg-transparent px-3 py-1.5 font-mono text-[11px] tracking-wide text-off-white transition-colors hover:bg-off-white/5 hover:text-white sm:self-auto"
        >
          View all ↗
        </a>
      </div>

      {/* TAB NAVIGATION */}

      <div className="mt-4 -mx-5 flex gap-4 overflow-x-auto border-b border-off-white/20 px-5 pb-px [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden">
        {WIDGET_CATEGORIES.map((cat) => {
          // Check if this tab is the currently active one
          const isActive = cat.id === activeTab;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative pb-3 text-sm transition-colors ${
                isActive
                  ? "font-medium text-yellow"
                  : "text-off-white hover:text-white"
              }`}
            >
              {cat.label}
              <span
                className={`ml-1.5 rounded-md px-1.5 py-0.5 text-xs ${
                  isActive
                    ? "bg-yellow/20 text-yellow"
                    : "bg-off-white/10 text-off-white"
                }`}
              >
                {cat.documents.length}
              </span>

              {/*  yellow underline bar. */}
              {isActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-yellow" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-2 min-h-0 flex-1">
        {activeCategory?.documents.slice(0, MAX_DOCS).map((doc) => (
          <DocumentRow key={doc.id} doc={doc} rowBleed="widget" />
        ))}
      </div>

      <div className="mt-auto shrink-0 pt-4">
        <a
          href={`/documents?category=${activeTab}`}
          className="block w-full rounded-xl border border-off-white/30 py-3 text-center text-sm text-white transition-colors hover:bg-off-white/5"
        >
          View all {activeCategory?.label} documents ↗
        </a>
      </div>
    </div>
  );
}