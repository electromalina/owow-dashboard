"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Users } from "lucide-react"

interface TeamMember {
  name: string
  image?: string
  initials: string
}

interface ProjectCardProps {
  name: string
  description: string
  status: "in-progress" | "review" | "completed" | "on-hold"
  progress: number
  dueDate: string
  team: TeamMember[]
  category: string
  className?: string
}

const statusConfig = {
  "in-progress": {
    label: "In Progress",
    className: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  },
  review: {
    label: "In Review",
    className: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  },
  completed: {
    label: "Completed",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  "on-hold": {
    label: "On Hold",
    className: "bg-muted text-muted-foreground border-border",
  },
}

export function ProjectCard({
  name,
  description,
  status,
  progress,
  dueDate,
  team,
  category,
  className,
}: ProjectCardProps) {
  const statusInfo = statusConfig[status]

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-6 transition-all hover:border-primary/30 group cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs font-normal">
              {category}
            </Badge>
            <Badge className={cn("text-xs font-normal border", statusInfo.className)}>
              {statusInfo.label}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors truncate">
            {name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-card-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{dueDate}</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex -space-x-2">
            {team.slice(0, 3).map((member, index) => (
              <Avatar
                key={index}
                className="h-7 w-7 border-2 border-card"
              >
                {member.image && <AvatarImage src={member.image} />}
                <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {team.length > 3 && (
              <div className="h-7 w-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center">
                <span className="text-xs font-medium text-secondary-foreground">
                  +{team.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
