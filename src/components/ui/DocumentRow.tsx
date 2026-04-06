import Link from "next/link";
import { Document } from "@/src/data/documents";
import StatusBadge from "./StatusBadge";

export default function DocumentRow({ doc }: { doc: Document }) {
  return (
    <Link
      href={`/documents/${doc.id}`}
      className="flex items-center justify-between border-b border-off-white/20 py-4 -mx-6 px-6 transition-colors hover:bg-off-white/5"
    >
      {/* Left: icon + info */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-off-white/10">
          {doc.type === "LINK" ? (
            <LinkIcon />
          ) : (
            <DocIcon />
          )}
        </div>
        <div>
          <p className="font-medium text-white">{doc.name}</p>
          <p className="font-mono text-xs text-off-white">
            {doc.type}
            {doc.size && <span> · {doc.size}</span>}
            <span> · {doc.date}</span>
          </p>
        </div>
      </div>

      {/* Right: status */}
      <StatusBadge status={doc.status} />
    </Link>
  );
}

function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-off-white">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-off-white">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}