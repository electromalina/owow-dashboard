"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calendar, FileUp, Video, ArrowRight } from "lucide-react"

interface QuickAction {
  icon: React.ElementType
  title: string
  description: string
  action: string
  colorClass: string
}

const quickActions: QuickAction[] = [
  {
    icon: MessageSquare,
    title: "Send Message",
    description: "Contact your project team",
    action: "message",
    colorClass: "bg-chart-2/20 text-chart-2",
  },
  {
    icon: Calendar,
    title: "Schedule Call",
    description: "Book a meeting with us",
    action: "schedule",
    colorClass: "bg-chart-3/20 text-chart-3",
  },
  {
    icon: FileUp,
    title: "Upload Files",
    description: "Share assets and documents",
    action: "upload",
    colorClass: "bg-chart-4/20 text-chart-4",
  },
  {
    icon: Video,
    title: "Watch Updates",
    description: "Latest project recordings",
    action: "video",
    colorClass: "bg-primary/20 text-primary",
  },
]

interface QuickActionsProps {
  className?: string
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {quickActions.map((action) => {
        const Icon = action.icon

        return (
          <button
            key={action.action}
            className="flex flex-col items-start p-5 bg-card border border-border rounded-xl hover:border-primary/30 transition-all group text-left"
          >
            <div className={cn("p-2.5 rounded-lg mb-4", action.colorClass)}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {action.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {action.description}
            </p>
            <ArrowRight className="h-4 w-4 mt-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </button>
        )
      })}
    </div>
  )
}
