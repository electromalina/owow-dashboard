"use client";

import { useState } from "react";
import {
  CheckCircle2,
  FileCheck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import type { UpdateItem } from "@/src/data/updates";

export function UpdateCard({ update }: { update: UpdateItem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="overflow-hidden rounded-lg border border-off-white/15 bg-off-black transition-colors hover:border-yellow/40">
      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {update.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded border border-off-white/20 bg-black/30 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-off-white"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-3 text-lg font-semibold leading-tight text-white">
          {update.title}
        </h3>

        <p className="text-sm leading-relaxed text-off-white">{update.summary}</p>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[2000px]" : "max-h-0"}`}
      >
        <div className="space-y-5 border-t border-off-white/15 px-5 pb-5 pt-5">
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-white">
              What We Did
            </h4>
            <ul className="space-y-2">
              {update.details.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-off-white"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-yellow" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {update.deliverables && update.deliverables.length > 0 && (
            <div>
              <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-white">
                Deliverables
              </h4>
              <div className="space-y-2">
                {update.deliverables.map((deliverable, index) => (
                  <div
                    key={index}
                    className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg bg-off-white/5 p-3 transition-colors hover:bg-off-white/10"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-yellow/10">
                        <FileCheck className="h-4 w-4 text-yellow" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {deliverable.name}
                        </p>
                        <p className="text-xs text-off-white">{deliverable.type}</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-off-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {update.nextSteps && update.nextSteps.length > 0 && (
            <div className="rounded-lg border border-yellow/20 bg-yellow/5 p-4">
              <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-white">
                Next Steps
              </h4>
              <ul className="space-y-2">
                {update.nextSteps.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-off-white"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow/15 text-xs font-medium text-yellow">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-center gap-2 border-t border-off-white/15 py-3 font-mono text-xs uppercase tracking-wider text-off-white transition-colors hover:bg-off-white/5 hover:text-white"
      >
        {isExpanded ? (
          <>
            Show Less <ChevronUp className="h-4 w-4" />
          </>
        ) : (
          <>
            View Details <ChevronDown className="h-4 w-4" />
          </>
        )}
      </button>
    </article>
  );
}
