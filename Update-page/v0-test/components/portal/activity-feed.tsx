import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, MessageSquare, CheckCircle2, Upload, Bell } from "lucide-react"

interface Activity {
  id: string
  type: "document" | "message" | "milestone" | "upload" | "notification"
  title: string
  description: string
  timestamp: string
  user?: {
    name: string
    image?: string
    initials: string
  }
}

const activityIcons = {
  document: FileText,
  message: MessageSquare,
  milestone: CheckCircle2,
  upload: Upload,
  notification: Bell,
}

const activityColors = {
  document: "bg-chart-2/20 text-chart-2",
  message: "bg-chart-3/20 text-chart-3",
  milestone: "bg-primary/20 text-primary",
  upload: "bg-chart-4/20 text-chart-4",
  notification: "bg-muted text-muted-foreground",
}

interface ActivityFeedProps {
  activities: Activity[]
  className?: string
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {activities.map((activity, index) => {
        const Icon = activityIcons[activity.type]
        const colorClass = activityColors[activity.type]

        return (
          <div
            key={activity.id}
            className="flex gap-4 group"
          >
            <div className="relative flex flex-col items-center">
              <div className={cn("p-2 rounded-lg", colorClass)}>
                <Icon className="h-4 w-4" />
              </div>
              {index < activities.length - 1 && (
                <div className="w-px flex-1 bg-border mt-2" />
              )}
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.timestamp}
                </span>
              </div>

              {activity.user && (
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-5 w-5">
                    {activity.user.image && <AvatarImage src={activity.user.image} />}
                    <AvatarFallback className="text-[10px] bg-secondary text-secondary-foreground">
                      {activity.user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {activity.user.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
