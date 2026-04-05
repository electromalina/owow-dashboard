"use client";
import { useState } from "react";
import { ProjectStatus, PhaseInfo } from "@/src/components/ProjectOverview";
import { CardPlaceholder } from "@/src/components/ui/CardPlaceholder";
import KeyDocuments from "@/src/components/widgets/KeyDocuments";

export default function Home() {
  const [activePhaseId, setActivePhaseId] = useState('design');

  return (
    <>
      <ProjectStatus activePhaseId={activePhaseId} setActivePhaseId={setActivePhaseId} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <PhaseInfo activePhaseId={activePhaseId} setActivePhaseId={setActivePhaseId} />
        <CardPlaceholder className="min-h-56" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(280px,1fr)]">
        <KeyDocuments />
        <CardPlaceholder className="min-h-72" />
        <CardPlaceholder className="min-h-72" />
      </div>
    </>
  );
}