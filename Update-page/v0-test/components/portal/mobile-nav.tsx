"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, Settings, LogOut, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

const navigation = [
  { name: "Activity", href: "/", icon: Activity },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <header className="flex items-center justify-between h-16 px-4 bg-sidebar border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">O</span>
          </div>
          <span className="font-semibold text-sidebar-foreground tracking-tight">
            OWOW
          </span>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-sidebar border-sidebar-border p-0 [&>button]:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
                <span className="font-semibold text-sidebar-foreground">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-sidebar-foreground"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/" || pathname === "/activity"
                      : pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-primary"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              <div className="p-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" />
                    <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      John Doe
                    </p>
                    <p className="text-xs text-sidebar-foreground/60 truncate">
                      Acme Corp
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  )
}
