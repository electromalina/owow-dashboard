"use client";

//it lets the component remember thingsw hich tab is currently selected
import { useState } from "react";

// import mock data and types from the shared data file
import { documentCategories } from "@/src/data/documents";


import DocumentRow from "@/src/components/ui/DocumentRow";

export default function KeyDocuments() {

  // React tracks which tab is active.
  // activeTab stores the current category id ("proposal", "prd", "assets")
  // setActiveTab is the function to change it
  // default to the first category in data
  const [activeTab, setActiveTab] = useState(documentCategories[0].id);


  // Find the full category object that matches the active tab
  // .find() loops through the array and returns the first match
  const activeCategory = documentCategories.find(
    (cat) => cat.id === activeTab
  );

  return (
    // dark card container
    <div className="rounded-2xl border border-off-white/20 bg-off-black p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-heading text-lg font-medium text-white"> 
            Key Documents
          </h2>

          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-off-white">
            Browse by Type
          </p>
        </div>

        {/* "View all" link — navigates to the full documents page */}
        <a
          href="/documents"
          className="rounded-full border border-blue px-4 py-1.5 text-xs text-blue transition-colors hover:bg-blue/10">
          View all  ↗
        </a>
      </div>

      {/* TAB NAVIGATION */}

      <div className="mt-5 flex gap-6 border-b border-off-white/20">
        {documentCategories.map((cat) => {
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

      {/* DOCUMENT LIST */}
      <div className="mt-2">
        {activeCategory?.documents.map((doc) => (
          <DocumentRow key={doc.id} doc={doc} />
        ))}
      </div>

      {/* BOTTOM CTA  */}
      {/* Links to the full documents page filtered by this category */}
      <div className="mt-4">
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