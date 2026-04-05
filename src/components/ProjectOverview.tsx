"use client";

import React, { useState } from 'react';

type ProjectStatus = 'Completed' | 'In Progress' | 'Pending';

interface Phase {
  id: string;
  title: string;
  status: ProjectStatus;
  goal: string;
  deliverables: string[];
}

const PROJECT_PHASES: Phase[] = [
  { id: 'discovery', title: 'Discovery', status: 'Completed', goal: 'Understand project requirements and user needs.', deliverables: ['User Research', 'Competitor Analysis'] },
  { id: 'planning', title: 'Planning', status: 'Completed', goal: 'Define technical architecture.', deliverables: ['Tech Stack Selection', 'Sitemap'] },
  { id: 'design', title: 'Design', status: 'In Progress', goal: 'Create the structure and visual design of the product.', deliverables: ['Wireframes', 'UI concepts', 'Design system'] },
  { id: 'development', title: 'Development', status: 'Pending', goal: 'Build the functional application.', deliverables: ['Frontend implementation', 'Backend API'] },
  { id: 'launch', title: 'Launch', status: 'Pending', goal: 'Deploy the product to production.', deliverables: ['QA Testing', 'Deployment'] },
];

interface WidgetProps {
  activePhaseId: string;
  setActivePhaseId: (id: string) => void;
}

export function ProjectStatus({ activePhaseId, setActivePhaseId }: WidgetProps) {
  const inProgressIndex = PROJECT_PHASES.findIndex((p) => p.status === 'In Progress');
  const lastActiveIndex = inProgressIndex !== -1 ? inProgressIndex : PROJECT_PHASES.findIndex((p) => p.status !== 'Completed') - 1;
  // Progress bar spans from the first dot to the current dot.
  // The track runs left-10 to right-10, so dots are spaced at (100% / (n-1)) intervals of the track.
  // We express progress as a percentage of the track width, then add the left-10 offset.
  const trackPercent = lastActiveIndex / (PROJECT_PHASES.length - 1); // 0..1 of track

  return (
    <div className="bg-off-black border border-white/10 rounded-2xl p-8 shadow-xl">
      <h2 className="text-off-white text-lg font-bold mb-10">Project Status</h2>

      <div className="relative flex justify-between items-start">
        {/* Background Track */}
        <div className="absolute top-4 left-10 right-10 h-[2px] bg-white/10 z-0" />

        {/* GREEN PROGRESS BAR — ends at the center of the In Progress dot */}
        <div
          className="absolute top-4 left-10 h-[2px] bg-green z-0 transition-all duration-1000 ease-out"
          style={{ width: `calc(${trackPercent} * (100% - 5rem))` }}
        />

        {PROJECT_PHASES.map((phase) => {
          const isCompleted = phase.status === 'Completed';
          const isInProgress = phase.status === 'In Progress';
          const isActiveView = activePhaseId === phase.id;

          return (
            <div
              key={phase.id}
              className="relative z-10 flex flex-col items-center cursor-pointer"
              onClick={() => setActivePhaseId(phase.id)}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all
                ${isCompleted ? 'bg-green' : isInProgress ? 'bg-off-black border-2 border-green' : 'bg-off-black border-2 border-white/20'}
                ${isActiveView ? 'ring-4 ring-green/20' : ''}
              `}>
                {isCompleted ? (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : isInProgress ? (
                  <div className="w-2 h-2 bg-green rounded-full animate-ping" />
                ) : null}
              </div>

              <div className="mt-4 text-center">
                <p className={`text-base font-bold transition-colors ${isActiveView ? 'text-off-white' : 'text-white/40'}`}>
                  {phase.title}
                </p>
                <p className={`text-[10px] uppercase tracking-tighter mt-0.5 transition-colors ${isInProgress ? 'text-green font-bold' : 'text-white/30'}`}>
                  {phase.status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PhaseInfo({ activePhaseId, setActivePhaseId }: WidgetProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const activePhase = PROJECT_PHASES.find((p) => p.id === activePhaseId) || PROJECT_PHASES[2];

  const handlePhaseSelect = (id: string) => {
    setIsDropdownOpen(false);
    if (id === activePhaseId) return;
    setIsFading(true);
    setTimeout(() => {
      setActivePhaseId(id);
      setIsFading(false);
    }, 180);
  };

  const statusColorMap: Record<ProjectStatus, string> = {
    'Completed': 'text-green',
    'In Progress': 'text-blue',
    'Pending': 'text-white/40',
  };

  return (
    <div className="bg-off-black border border-white/10 rounded-2xl p-8 shadow-xl">
      <div className="relative mb-6">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex flex-col items-start group cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-2">
            <svg
              className={`w-6 h-6 text-blue transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 className="text-3xl font-bold text-off-white tracking-tight">{activePhase.title}</h2>
          </div>
          <span className={`text-xs font-bold ml-8 uppercase tracking-[0.2em] ${statusColorMap[activePhase.status]}`}>
            {activePhase.status}
          </span>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
            {PROJECT_PHASES.map((p) => (
              <button
                key={p.id}
                className={`w-full text-left px-5 py-3 text-sm transition-all duration-150 cursor-pointer
                  ${p.id === activePhaseId
                    ? 'text-white bg-white/10'
                    : 'text-white/60 hover:bg-blue/80 hover:text-white hover:pl-6'
                  }`}
                onClick={() => handlePhaseSelect(p.id)}
              >
                {p.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-[1px] bg-white/5 w-full mb-8" />

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-200"
        style={{ opacity: isFading ? 0 : 1, transform: isFading ? 'translateY(4px)' : 'translateY(0)' }}
      >
        <div>
          <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Goal</h4>
          <p className="text-off-white leading-relaxed text-lg">{activePhase.goal}</p>
        </div>

        <div>
          <h4 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Deliverables</h4>
          <ul className="space-y-3">
            {activePhase.deliverables.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/70 text-sm font-mono">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Parent component that holds shared state — use this if you want both widgets in one place
export default function ProjectOverview() {
  const [activePhaseId, setActivePhaseId] = useState('design');

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl">
      <ProjectStatus activePhaseId={activePhaseId} setActivePhaseId={setActivePhaseId} />
      <PhaseInfo activePhaseId={activePhaseId} setActivePhaseId={setActivePhaseId} />
    </div>
  );
}