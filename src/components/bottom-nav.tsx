
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Navigation, Utensils, User, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { label: "Ana Sayfa", href: "/dashboard", icon: Home },
    { label: "Ulaşım", href: "/transport", icon: Navigation },
    { label: "Sohbet", href: "/chat", icon: MessageCircle },
    { label: "Tesisler", href: "/facilities", icon: Utensils },
    { label: "Profil", href: "/profile", icon: User },
  ]

  if (pathname === "/") return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-border px-4 py-3 flex justify-between items-center md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300 flex-1",
              isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive ? "fill-primary/20" : "")} />
            <span className="text-[9px] font-medium text-center truncate w-full">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
