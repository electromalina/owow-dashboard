"use client";

import { useState } from "react";
import Link from "next/link";
import { documentCategories } from "@/src/data/documents";
import StatusBadge from "@/src/components/ui/StatusBadge";

// Prototype-only: this page manages uploads in local state (no backend).
const initialUploads = [
  { id: "r1", name: "User Flow Diagrams v1.5", category: "PRD", size: "4.5 MB", date: "Mar 10, 2026", status: "draft" as const },
  { id: "r2", name: "API Documentation", category: "PRD", size: "890 KB", date: "Mar 8, 2026", status: "approved" as const },
  { id: "r3", name: "Weekly Progress Report #8", category: "Reports", size: "2.1 MB", date: "Mar 8, 2026", status: "approved" as const },
  { id: "r4", name: "Kickoff Meeting Notes", category: "Comms", size: "650 KB", date: "Mar 6, 2026", status: "approved" as const },
  { id: "r5", name: "Figma Design System v2", category: "Assets", size: undefined, date: "Mar 1, 2026", status: "approved" as const },
];

export default function UploadPage() {

  const [uploads, setUploads] = useState<{ id: string; name: string; category: string; size: string | undefined; date: string; status: "draft" | "approved" }[]>(initialUploads);
    
  const [mode, setMode] = useState<"file" | "link">("file");

  const [docName, setDocName] = useState("");
  const [category, setCategory] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
    undoId?: string;
  } | null>(null);

  function handleUpload() {
    if (!docName) return;

    const newUpload = {
      id: `r${Date.now()}`,
      name: docName,
      category: category
        ? documentCategories.find((c) => c.id === category)?.label || "General"
        : "General",
      size: mode === "file" ? "—" : undefined,
      date: "Mar 16, 2026",
      status: "draft" as const,
    };

    setUploads((prev) => [newUpload, ...prev]);
    setToast({
      type: "success",
      message: `"${docName}" added successfully.`,
      undoId: newUpload.id,
    });

    setDocName("");
    setCategory("");
    setLinkUrl("");
    setTimeout(() => setToast(null), 4000);
  }

  function handleClear() {
    setDocName("");
    setCategory("");
    setLinkUrl("");
  }

  function removeUpload(id: string) {
    setUploads((prev) => prev.filter((item) => item.id !== id));
  }

  function handleUndo() {
    if (toast?.undoId) {
      removeUpload(toast.undoId);
      setToast(null);
    }
  }

  // Delete with confirmation — shows a red warning toast
  function handleDelete(id: string, name: string) {
    setToast({
      type: "error",
      message: `Delete "${name}"? This cannot be undone.`,
      undoId: id, // reusing undoId to track which item to delete
    });
  }

  // Confirm deletion — actually removes the item
  function confirmDelete() {
    if (toast?.undoId) {
      removeUpload(toast.undoId);
      setToast({ type: "success", message: "Document deleted.", undoId: undefined });
      setTimeout(() => setToast(null), 3000);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <Link href="/documents" className="text-blue hover:underline">
          Documents
        </Link>
        <span className="text-off-white">›</span>
        <span className="text-off-white">Manage</span>
      </nav>

      {/* PAGE HEADER */}
      <h1 className="mt-4 font-heading text-3xl font-semibold text-white">Manage Documents</h1>
      <p className="mt-1 text-sm text-off-white">Upload files or add external links to the project</p>

      {/* MAIN LAYOUT: form + sidebar */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">

        {/* LEFT: UPLOAD FORM */}
        <div>
          {/* mode toggle: switches between file upload and paste link */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMode("file")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-colors ${
                mode === "file"
                  ? "bg-white text-black"
                  : "border border-off-white/30 text-off-white hover:text-white"
              }`}
            >
              ↑ Upload File
            </button>
            <button
              onClick={() => setMode("link")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-colors ${
                mode === "link"
                  ? "bg-white text-black"
                  : "border border-off-white/30 text-off-white hover:text-white"
              }`}
            >
              ⟡ Paste Link
            </button>
          </div>

          {/* FILE UPLOAD MODE */}
          {mode === "file" && (
            <div className="mt-6 rounded-2xl border border-dashed border-off-white/30 bg-off-black p-6 sm:p-10">
              <div className="flex flex-col items-center text-center">
                {/* Upload cloud icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-off-white/10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-off-white">
                    {/* Lucide "upload-cloud" icon with upward arrow */}
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </div>
                <p className="mt-4 text-base font-medium text-white">Drop your file here</p>
                <p className="mt-1 text-sm text-off-white">or click to browse from your computer</p>
                <p className="mt-3 rounded-lg bg-off-white/5 px-4 py-1.5 font-mono text-xs text-off-white">PDF · DOC · ZIP — up to 25 MB</p>
              </div>
            </div>
          )}

          {/* PASTE LINK MODE */}
          {mode === "link" && (
            <div className="mt-6 rounded-2xl border border-off-white/20 bg-off-black p-6">
              <label className="font-mono text-xs uppercase tracking-wider text-off-white">URL</label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-off-white/20 bg-off-black px-4 py-3">
                {/* Small link icon inside the input */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-off-white">
                  {/* Lucide "link" icon */}
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <input
                  type="text"
                  placeholder="https://figma.com/file/..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-off-white/50 outline-none"
                />
              </div>
              <p className="mt-2 text-xs text-off-white">Figma, Notion, Google Docs, or any URL</p>
            </div>
          )}

          {/* SHARED FORM FIELDS: name + category */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-off-white">
                {mode === "file" ? "Document Name" : "Display Name"}
              </label>
              <input
                type="text"
                placeholder={mode === "file" ? "e.g. Requirements v2" : "e.g. Figma Design System"}
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-off-white/20 bg-off-black px-4 py-3 text-sm text-white placeholder-off-white/50 outline-none transition-colors focus:border-yellow"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-off-white">Category</label>
              {/* Dropdown pulls category options from the mock data */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full appearance-none rounded-xl border border-off-white/20 bg-off-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-yellow"
              >
                <option value="">Select category</option>
                {documentCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleUpload}
              className="flex items-center gap-2 rounded-full bg-yellow px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-yellow/90"
            >
              {mode === "file" ? "↑ Upload Document" : "⟡ Add Link"}
            </button>
            <button
              onClick={handleClear}
              className="rounded-full border border-off-white/30 px-6 py-2.5 text-sm text-white transition-colors hover:bg-off-white/5"
            >
              Clear
            </button>
          </div>
        </div>

        {/* RIGHT: RECENT UPLOADS SIDEBAR */}
        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-base font-medium text-white">Recent uploads</h2>
              <span className="rounded-md bg-off-white/10 px-2 py-0.5 text-xs text-off-white">{uploads.length}</span>
            </div>
            <Link href="/documents" className="text-sm text-blue hover:underline">View all →</Link>
          </div>

          {/* Recent upload items */}
          <div className="mt-4 space-y-2">
            {uploads.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col gap-3 rounded-xl border border-off-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {/* Doc or link icon based on whether item has a size */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-off-white/10">
                    {item.size ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-off-white">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-off-white">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{item.name}</p>
                    <p className="font-mono text-xs text-off-white">
                      {item.category}
                      {item.size && <span> · {item.size}</span>}
                      <span> · {item.date}</span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                  <StatusBadge status={item.status} />
                  {/* delete button, hidden by default, shows on hover */}
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="ml-1 hidden rounded-full p-1 text-off-white transition-colors hover:bg-pink/10 hover:text-pink group-hover:block"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div> 
    

          {/* Total count */}
          <p className="mt-4 font-mono text-xs text-off-white">Showing {uploads.length} of {uploads.length + 23} total</p>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div
          className={`fixed bottom-4 left-4 right-4 z-50 flex max-w-lg flex-wrap items-center gap-3 rounded-xl border px-4 py-3 shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-none sm:flex-nowrap sm:px-5 ${
            toast.type === "success"
              ? "border-green/30 bg-off-black"
              : "border-pink/30 bg-off-black"
          }`}
        >
          {/* icon changes based on toast type */}
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              toast.type === "success" ? "bg-green/20" : "bg-pink/20"
            }`}
          >
            <span className={toast.type === "success" ? "text-green" : "text-pink"}>
              {toast.type === "success" ? "✓" : "✕"}
            </span>
          </div>
          <p className="text-sm text-white">{toast.message}</p>

          {/* action buttons: undo for success, cancel/delete for error */}
          {toast.type === "success" && toast.undoId && (
            <button onClick={handleUndo} className="ml-4 text-sm text-blue hover:underline">
              Undo
            </button>
          )}
          {toast.type === "error" && (
            <div className="ml-4 flex gap-2">
              <button
                onClick={() => setToast(null)}
                className="rounded-full border border-off-white/30 px-3 py-1 text-sm text-white hover:bg-off-white/5"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-full bg-pink px-3 py-1 text-sm text-white hover:bg-pink/90"
              >
                Delete
              </button>
            </div>
          )}
          <button
            onClick={() => setToast(null)}
            className="text-off-white hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}