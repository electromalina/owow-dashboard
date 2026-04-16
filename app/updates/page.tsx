"use client";

import { useState, useMemo } from "react";
import {
  updates,
  phases,
  filterOptions,
  type UpdateItem,
} from "@/src/data/updates";
import { UpdateCard } from "@/src/components/updates/UpdateCard";

export default function UpdatesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSprint, setActiveSprint] = useState("sprint-4");

  const currentPhase = phases.find((p) => p.id === activeSprint);

  const filteredUpdates = useMemo(
    () =>
      updates.filter(
        (update) =>
          activeFilter === "all" || update.category === activeFilter
      ),
    [activeFilter]
  );

  const timelineData = useMemo(() => {
    // Timeline groups updates by date so we can render a single date "node" with multiple cards.
    const grouped = filteredUpdates.reduce(
      (acc, update) => {
        const dateKey = `${update.day}-${update.month}-${update.year}`;
        if (!acc[dateKey]) {
          acc[dateKey] = {
            day: update.day,
            month: update.month,
            year: update.year,
            updates: [] as UpdateItem[],
          };
        }
        acc[dateKey].updates.push(update);
        return acc;
      },
      {} as Record<
        string,
        { day: string; month: string; year: string; updates: UpdateItem[] }
      >
    );
    return Object.values(grouped);
  }, [filteredUpdates]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-heading text-3xl font-semibold text-white">
        Updates
      </h1>

      <div className="mb-6 mt-8 flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-off-white">
          Filter:
        </span>
        {filterOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setActiveFilter(option.id)}
            className={`rounded px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
              activeFilter === option.id
                ? "border border-yellow bg-yellow text-black hover:bg-yellow/90"
                : "border border-off-white/20 text-off-white hover:bg-off-black hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mb-8 -mx-6 sticky top-0 z-20 border-b border-off-white/15 bg-black/80 px-6 py-3 backdrop-blur-md xl:hidden">
        <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-center gap-2">
            {phases
              .slice()
              .reverse()
              .map((phase) => (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActiveSprint(phase.id)}
                  className={`flex shrink-0 items-center gap-2 rounded border px-4 py-2 transition-all ${
                    phase.id === activeSprint
                      ? "border-yellow bg-yellow text-black"
                      : "border-off-white/20 bg-off-black text-off-white hover:border-off-white/40 hover:text-white"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      phase.id === activeSprint ? "bg-black" : "bg-off-white/40"
                    }`}
                  />
                  <span className="whitespace-nowrap font-mono text-xs uppercase tracking-wider">
                    {phase.label}
                  </span>
                </button>
              ))}
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-white">
            {currentPhase?.label}
          </span>
          {currentPhase?.isCurrent && (
            <span className="rounded border border-yellow px-2 py-0.5 text-xs text-yellow">
              Current
            </span>
          )}
          <span className="w-full text-xs text-off-white sm:w-auto">
            {currentPhase?.dateRange}
          </span>
        </div>
      </div>

      <div className="flex gap-8 lg:gap-10">
        <div className="relative min-w-0 flex-1">
          {timelineData.map((dateGroup, groupIndex) => (
            <div
              key={`${dateGroup.day}-${dateGroup.month}`}
              className="mb-8 flex gap-6 last:mb-0 lg:gap-10"
            >
              <div className="flex w-16 shrink-0 flex-col items-center pt-[10px] lg:w-20">
                <div className="w-full text-center">
                  <div className="text-3xl font-light leading-none text-white lg:text-4xl">
                    {dateGroup.day}
                  </div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-wider text-off-white">
                    {dateGroup.month}
                  </div>
                </div>

                <div className="mt-4 flex flex-1 flex-col items-center">
                  <div
                    className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                      groupIndex === 0
                        ? "border-yellow bg-yellow"
                        : "border-yellow bg-transparent"
                    }`}
                  />
                  <div className="mt-2 min-h-4 w-0.5 flex-1 bg-yellow/50" />
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-4 pb-4">
                {dateGroup.updates.map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <aside className="hidden w-56 shrink-0 xl:block">
          <div className="rounded-lg border border-off-white/15 bg-off-black p-4">
            <h3 className="mb-4 text-sm font-medium text-white">Phases</h3>
            <div className="space-y-1">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActiveSprint(phase.id)}
                  className={`flex w-full items-center gap-3 rounded-lg p-2 transition-colors ${
                    phase.id === activeSprint
                      ? "bg-yellow/10"
                      : "hover:bg-off-white/5"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-3 w-3 rounded-full transition-colors ${
                        phase.id === activeSprint
                          ? "bg-yellow"
                          : "border-2 border-yellow/50 bg-transparent"
                      }`}
                    />
                    <div
                      className="mt-1 h-4 w-0.5 bg-yellow/30"
                      aria-hidden
                    />
                  </div>
                  <div className="text-left">
                    <span
                      className={`block font-mono text-xs uppercase tracking-wider ${
                        phase.id === activeSprint
                          ? "text-white"
                          : "text-off-white"
                      }`}
                    >
                      {phase.name}
                    </span>
                    <span className="text-xs text-off-white">
                      {phase.dateRange}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
