"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink } from "lucide-react"

interface Invoice {
  id: string
  number: string
  amount: string
  status: "paid" | "pending" | "overdue"
  dueDate: string
  issuedDate: string
  project: string
}

const statusConfig = {
  paid: {
    label: "Paid",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  pending: {
    label: "Pending",
    className: "bg-chart-4/20 text-chart-4 border-chart-4/30",
  },
  overdue: {
    label: "Overdue",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
}

interface InvoiceTableProps {
  invoices: Invoice[]
  className?: string
}

export function InvoiceTable({ invoices, className }: InvoiceTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Invoice
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
              Project
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">
              Issued
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Amount
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
              Status
            </th>
            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            const statusInfo = statusConfig[invoice.status]

            return (
              <tr
                key={invoice.id}
                className="border-b border-border hover:bg-muted/30 transition-colors group"
              >
                <td className="py-4 px-4">
                  <span className="text-sm font-medium text-foreground">
                    {invoice.number}
                  </span>
                </td>
                <td className="py-4 px-4 hidden md:table-cell">
                  <span className="text-sm text-muted-foreground">
                    {invoice.project}
                  </span>
                </td>
                <td className="py-4 px-4 hidden sm:table-cell">
                  <span className="text-sm text-muted-foreground">
                    {invoice.issuedDate}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-semibold text-foreground">
                    {invoice.amount}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Badge className={cn("text-xs font-normal border", statusInfo.className)}>
                    {statusInfo.label}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
