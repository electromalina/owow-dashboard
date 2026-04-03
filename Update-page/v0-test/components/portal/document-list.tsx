"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Download, FileText, Image, FileCode, File, ExternalLink } from "lucide-react"

interface Document {
  id: string
  name: string
  type: "pdf" | "image" | "code" | "other"
  size: string
  uploadedAt: string
  project?: string
}

const fileIcons = {
  pdf: FileText,
  image: Image,
  code: FileCode,
  other: File,
}

const fileColors = {
  pdf: "bg-destructive/20 text-destructive",
  image: "bg-chart-2/20 text-chart-2",
  code: "bg-chart-3/20 text-chart-3",
  other: "bg-muted text-muted-foreground",
}

interface DocumentListProps {
  documents: Document[]
  className?: string
}

export function DocumentList({ documents, className }: DocumentListProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {documents.map((doc) => {
        const Icon = fileIcons[doc.type]
        const colorClass = fileColors[doc.type]

        return (
          <div
            key={doc.id}
            className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors group"
          >
            <div className={cn("p-2.5 rounded-lg shrink-0", colorClass)}>
              <Icon className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">
                {doc.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">{doc.size}</span>
                {doc.project && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{doc.project}</span>
                  </>
                )}
              </div>
            </div>

            <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
              {doc.uploadedAt}
            </span>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
