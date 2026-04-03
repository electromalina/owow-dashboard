"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Settings,
  FileText,
  Phone,
  CheckCircle2,
  Palette,
  Code2,
  FileCheck,
  Users,
  Rocket,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"

// Types
interface UpdateItem {
  id: string
  day: string
  month: string
  year: string
  category: "milestone" | "design" | "development" | "documents" | "meeting"
  title: string
  tags: string[]
  summary: string
  details: string[]
  deliverables?: { name: string; type: string }[]
  nextSteps?: string[]
}

// Mock data
const projectInfo = {
  name: "E-commerce Platform",
  client: "TechRetail Inc.",
}

const phases = [
  { id: "sprint-4", name: "Current Sprint", label: "Sprint 4", isCurrent: true, dateRange: "Mar 20 - Apr 10, 2026" },
  { id: "sprint-3", name: "Sprint 3", label: "Sprint 3", isCurrent: false, dateRange: "Mar 1 - Mar 19, 2026" },
  { id: "sprint-2", name: "Sprint 2", label: "Sprint 2", isCurrent: false, dateRange: "Feb 10 - Feb 28, 2026" },
  { id: "sprint-1", name: "Sprint 1", label: "Sprint 1", isCurrent: false, dateRange: "Jan 20 - Feb 9, 2026" },
]

const filterOptions = [
  { id: "all", label: "ALL" },
  { id: "meeting", label: "MEETINGS" },
  { id: "documents", label: "DOCUMENTS" },
  { id: "development", label: "DEVELOPMENT" },
  { id: "design", label: "DESIGN" },
]

const updates: UpdateItem[] = [
  {
    id: "1",
    day: "03",
    month: "APRIL",
    year: "2026",
    category: "milestone",
    title: "Design Phase Completed",
    tags: ["Milestone", "Design", "UI/UX"],
    summary: "We have successfully completed the entire design phase for your e-commerce platform. All UI/UX designs have been finalized and approved, ready for development handoff.",
    details: [
      "Finalized all 47 unique page designs including homepage, product listings, product details, cart, checkout flow, and user account pages",
      "Created responsive layouts optimized for desktop, tablet, and mobile devices",
      "Developed comprehensive design system with 120+ reusable components",
      "Completed accessibility audit ensuring WCAG 2.1 AA compliance",
      "Delivered interactive Figma prototypes for all user flows",
    ],
    deliverables: [
      { name: "Brand Guidelines v2.0.pdf", type: "PDF" },
      { name: "Design System.fig", type: "Figma" },
      { name: "UI Kit - Complete.sketch", type: "Sketch" },
    ],
    nextSteps: [
      "Development team to begin frontend implementation next week",
      "Weekly design reviews scheduled during development phase",
    ],
  },
  {
    id: "2",
    day: "01",
    month: "APRIL",
    year: "2026",
    category: "development",
    title: "API Integration Complete",
    tags: ["Development", "Backend", "API"],
    summary: "Our backend team has completed the integration of all third-party APIs including payment gateway, shipping providers, and inventory management system.",
    details: [
      "Integrated Stripe payment gateway with support for 15+ payment methods",
      "Connected shipping APIs for DHL, FedEx, and UPS with real-time tracking",
      "Set up inventory sync with your existing ERP system",
      "Implemented webhook handlers for real-time notifications",
      "Created comprehensive API documentation for future maintenance",
    ],
    deliverables: [
      { name: "API Documentation.pdf", type: "PDF" },
      { name: "Integration Guide.md", type: "Markdown" },
    ],
    nextSteps: [
      "Begin integration testing with your systems",
      "Performance optimization phase starts next week",
    ],
  },
  {
    id: "3",
    day: "26",
    month: "MARCH",
    year: "2026",
    category: "meeting",
    title: "Sprint Planning Session",
    tags: ["Meeting", "Planning", "Sprint 4"],
    summary: "We conducted our Sprint 4 planning session with your team to prioritize features for the upcoming development cycle and align on delivery timelines.",
    details: [
      "Reviewed Sprint 3 accomplishments and lessons learned",
      "Prioritized 24 user stories for Sprint 4 development",
      "Identified and addressed 3 technical blockers from previous sprint",
      "Aligned on revised timeline for checkout flow implementation",
      "Scheduled daily standups and weekly demos for the sprint",
    ],
    deliverables: [
      { name: "Sprint 4 Backlog.pdf", type: "PDF" },
      { name: "Meeting Recording.mp4", type: "Video" },
    ],
  },
  {
    id: "4",
    day: "20",
    month: "MARCH",
    year: "2026",
    category: "documents",
    title: "Technical Specs Delivered",
    tags: ["Documents", "Technical", "Architecture"],
    summary: "The complete technical specification document has been delivered, covering system architecture, database design, and infrastructure requirements.",
    details: [
      "Documented microservices architecture with 12 core services",
      "Designed database schema with 45 tables and optimized indexes",
      "Specified cloud infrastructure setup on AWS with auto-scaling",
      "Created security protocols and compliance requirements",
      "Outlined disaster recovery and backup procedures",
    ],
    deliverables: [
      { name: "Technical Specs v1.0.pdf", type: "PDF" },
      { name: "Architecture Diagram.fig", type: "Figma" },
      { name: "Database Schema.sql", type: "SQL" },
    ],
  },
  {
    id: "5",
    day: "15",
    month: "MARCH",
    year: "2026",
    category: "design",
    title: "Design System Published",
    tags: ["Design", "Components", "UI Kit"],
    summary: "We have published the complete design system for your platform. This comprehensive library ensures consistency across all digital touchpoints.",
    details: [
      "Created 120+ reusable UI components with multiple variants",
      "Documented design tokens for colors, typography, spacing, and shadows",
      "Built interactive Storybook documentation for developers",
      "Included dark mode variants for all components",
      "Provided Figma and code-ready assets for seamless handoff",
    ],
    deliverables: [
      { name: "Design System Documentation", type: "Storybook" },
      { name: "Figma Component Library", type: "Figma" },
      { name: "Design Tokens.json", type: "JSON" },
    ],
  },
]

const categoryConfig = {
  milestone: { icon: CheckCircle2, color: "text-emerald-400", bgColor: "bg-emerald-400/10" },
  design: { icon: Palette, color: "text-violet-400", bgColor: "bg-violet-400/10" },
  development: { icon: Code2, color: "text-blue-400", bgColor: "bg-blue-400/10" },
  documents: { icon: FileCheck, color: "text-amber-400", bgColor: "bg-amber-400/10" },
  meeting: { icon: Users, color: "text-cyan-400", bgColor: "bg-cyan-400/10" },
}

// Update Card Component
function UpdateCard({ update }: { update: UpdateItem }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const config = categoryConfig[update.category]
  const Icon = config.icon

  return (
    <article className="bg-card border border-border rounded-[8px] overflow-hidden hover:border-primary/40 transition-colors">
      {/* Card Header */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {update.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs font-mono uppercase tracking-wider border-border text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">
          {update.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {update.summary}
        </p>
      </div>

      {/* Expandable Content */}
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[2000px]" : "max-h-0"}`}>
        <div className="px-5 pb-5 space-y-5 border-t border-border pt-5">
          {/* What We Did */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#f9f9f9] mb-3">
              What We Did
            </h4>
            <ul className="space-y-2">
              {update.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          {update.deliverables && update.deliverables.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#f9f9f9] mb-3">Deliverables</h4>
              <div className="space-y-2">
                {update.deliverables.map((deliverable, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <FileCheck className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{deliverable.name}</p>
                        <p className="text-xs text-muted-foreground">{deliverable.type}</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          {update.nextSteps && update.nextSteps.length > 0 && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <h4 className="text-xs font-mono uppercase tracking-wider mb-3 text-[rgba(249,249,249,1)]">Next Steps</h4>
              <ul className="space-y-2">
                {update.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">
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

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 py-3 border-t border-border text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
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
  )
}

export default function UpdatesPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeSprint, setActiveSprint] = useState("sprint-4")

  const currentPhase = phases.find(p => p.id === activeSprint)

  const filteredUpdates = updates.filter(
    (update) => activeFilter === "all" || update.category === activeFilter
  )

  // Group updates by date for timeline
  const groupedUpdates = filteredUpdates.reduce((acc, update) => {
    const dateKey = `${update.day}-${update.month}-${update.year}`
    if (!acc[dateKey]) {
      acc[dateKey] = {
        day: update.day,
        month: update.month,
        year: update.year,
        updates: [],
      }
    }
    acc[dateKey].updates.push(update)
    return acc
  }, {} as Record<string, { day: string; month: string; year: string; updates: UpdateItem[] }>)

  const timelineData = Object.values(groupedUpdates)

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="flex items-center justify-between h-16 px-6 lg:px-10 border-b border-border">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-foreground">OWOW<span className="text-primary">.</span></span>
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-border"
        >
          <User className="h-5 w-5" />
        </Button>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 min-h-[calc(100vh-64px)] p-6 border-r border-border">
          {/* Project Card */}
          <div className="rounded-lg border border-border bg-card p-4 mb-6">
            <div className="h-20 rounded-md bg-muted mb-3 flex items-center justify-center">
              <span className="text-sm font-medium text-foreground">{projectInfo.name}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-start font-mono text-xs uppercase tracking-wider border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Updates
            </Button>
            <Link href="/documents">
              <Button
                variant="outline"
                className="w-full justify-start font-mono text-xs uppercase tracking-wider border-border text-muted-foreground hover:text-foreground"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full justify-start font-mono text-xs uppercase tracking-wider border-border text-muted-foreground hover:text-foreground"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Info
              </Button>
            </Link>
          </nav>

          {/* Bottom Settings */}
          <div className="mt-auto pt-6">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Page Title */}
          <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-8">Updates</h1>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Filter:</span>
            {filterOptions.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                size="sm"
                onClick={() => setActiveFilter(option.id)}
                className={`rounded-[4px] font-mono text-xs uppercase tracking-wider ${
                  activeFilter === option.id
                    ? "bg-foreground text-background border-foreground hover:bg-foreground/90 hover:text-background"
                    : "border-border text-muted-foreground hover:bg-[#171717] hover:text-foreground dark:hover:bg-[#171717]"
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>

          {/* Sprint pill navigation — below xl; sticky so it stays visible while scrolling */}
          <div className="xl:hidden sticky top-0 z-20 -mx-6 mb-8 border-b border-border bg-background/95 px-6 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
            <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max items-center gap-2">
                {phases.slice().reverse().map((phase) => (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setActiveSprint(phase.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-[4px] border px-4 py-2 transition-all ${
                      phase.id === activeSprint
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        phase.id === activeSprint ? "bg-primary-foreground" : "bg-muted-foreground/50"
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
              <span className="text-sm font-medium text-foreground">{currentPhase?.label}</span>
              {currentPhase?.isCurrent && (
                <Badge variant="outline" className="text-xs text-primary border-primary">
                  Current
                </Badge>
              )}
              <span className="w-full text-xs text-muted-foreground sm:w-auto">{currentPhase?.dateRange}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {timelineData.map((dateGroup, groupIndex) => (
              <div key={`${dateGroup.day}-${dateGroup.month}`} className="flex gap-6 lg:gap-10 mb-8 last:mb-0">
                {/* Date Column */}
                <div className="flex w-16 shrink-0 flex-col items-center pt-[10px] lg:w-20">
                  <div className="w-full text-center">
                    <div className="text-3xl font-light leading-none text-foreground lg:text-4xl">{dateGroup.day}</div>
                    <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{dateGroup.month}</div>
                  </div>

                  {/* Timeline dot + line — same horizontal center as dates above */}
                  <div className="mt-4 flex flex-1 flex-col items-center">
                    <div
                      className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                        groupIndex === 0 ? "border-primary bg-primary" : "border-primary bg-transparent"
                      }`}
                    />
                    <div className="mt-2 w-0.5 min-h-4 flex-1 bg-primary/50" />
                  </div>
                </div>

                {/* Updates Column */}
                <div className="flex-1 space-y-4 pb-4">
                  {dateGroup.updates.map((update) => (
                    <UpdateCard key={update.id} update={update} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Phases */}
        <aside className="hidden xl:block w-56 min-h-[calc(100vh-64px)] p-6 border-l border-border">
          <div className="rounded-[8px] border border-border bg-card p-4">
            <h3 className="text-sm font-medium text-foreground mb-4">Phases</h3>
            <div className="space-y-1">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setActiveSprint(phase.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-[8px] transition-colors ${
                    phase.id === activeSprint 
                      ? "bg-primary/10" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full transition-colors ${
                      phase.id === activeSprint 
                        ? "bg-primary" 
                        : "border-2 border-primary/50"
                    }`} />
                    <div className="w-0.5 h-4 bg-primary/30 mt-1" aria-hidden />
                  </div>
                  <div className="text-left">
                    <span className={`text-xs font-mono uppercase tracking-wider block ${
                      phase.id === activeSprint ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {phase.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{phase.dateRange}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around h-16 bg-card border-t border-border">
        <Button variant="ghost" size="icon" className="h-12 w-12 text-primary">
          <Rocket className="h-5 w-5" />
        </Button>
        <Link href="/documents">
          <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground">
            <FileText className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost" size="icon" className="h-12 w-12 text-muted-foreground">
            <Phone className="h-5 w-5" />
          </Button>
        </Link>
      </nav>
    </div>
  )
}
