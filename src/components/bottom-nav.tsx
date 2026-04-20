
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Library, Car, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { label: "Ana Sayfa", href: "/dashboard", icon: Home },
    { label: "Kütüphane", href: "/library", icon: Library },
    { label: "Otopark", href: "/parking", icon: Car },
    { label: "Duyurular", href: "/announcements", icon: Bell },
  ]

  if (pathname === "/") return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-border px-6 py-3 flex justify-between items-center md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
            )}
          >
            <Icon className={cn("h-6 w-6", isActive ? "fill-primary/20" : "")} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
