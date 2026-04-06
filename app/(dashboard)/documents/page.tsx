import { Suspense } from "react";
import DocumentsIndexClient from "./DocumentsIndexClient";

function DocumentsFallback() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="h-8 w-48 animate-pulse rounded bg-off-white/10" />
      <div className="mt-2 h-4 w-64 animate-pulse rounded bg-off-white/5" />
      <div className="mt-8 space-y-4">
        <div className="h-32 animate-pulse rounded-2xl bg-off-white/5" />
        <div className="h-32 animate-pulse rounded-2xl bg-off-white/5" />
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<DocumentsFallback />}>
      <DocumentsIndexClient />
    </Suspense>
  );
}
