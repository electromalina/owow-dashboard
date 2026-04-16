"use client";
import { useState } from "react";
import KeyDocuments from "@/src/components/widgets/KeyDocuments";
import UpdatesWidget from "@/src/components/widgets/UpdatesWidget";
import { BudgetSnapshotWidget } from "@/src/components/budget-snapshot/BudgetSnapshotWidget";
import { ProjectStatus, PhaseInfo } from "@/src/components/ProjectOverview";
import { UpcomingMeetingsCard } from "@/src/components/meetigs/upcoming-meetings-card";

export default function Home() {
  // Phase selection is shared across the status header and the phase details panel.
  const [activePhaseId, setActivePhaseId] = useState("design");
  return (
    <>
      <ProjectStatus activePhaseId={activePhaseId} setActivePhaseId={setActivePhaseId} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <PhaseInfo activePhaseId={activePhaseId} setActivePhaseId={setActivePhaseId} />
        <section className="rounded-2xl border border-off-white/15 bg-off-black/90 p-5 min-h-56">
          <UpcomingMeetingsCard />
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(280px,1fr)] lg:items-stretch">
        <KeyDocuments className="h-full min-h-0" />
        <BudgetSnapshotWidget className="h-full min-h-0" />
        <section className="flex h-full min-h-0 flex-col rounded-2xl border border-off-white/15 bg-off-black/90 p-5">
          <UpdatesWidget />
        </section>
      </div>
    </>
  );
}
