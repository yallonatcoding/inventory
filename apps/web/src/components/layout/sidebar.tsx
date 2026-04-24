"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import {
  LayoutDashboard,
  Package,
  QrCode,
  Bell,
  Settings,
  ChevronRight,
  TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Inventory", icon: Package, href: "/inventory" },
  { name: "QR Scanner", icon: QrCode, href: "/scan" },
  { name: "Alerts", icon: Bell, href: "/alerts", badge: 12 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-72 h-full border-r border-border bg-card/50 backdrop-blur-sm">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Package className="text-primary-foreground" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">StockMaster</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Logistics Intelligence</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <span className={cn(
                "group relative flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/10"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={cn(
                    "transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                  )} />
                  <span className="text-sm font-bold tracking-tight">{item.name}</span>
                </div>

                {item.badge ? (
                  <Badge variant={isActive ? "secondary" : "destructive"} className="h-5 min-w-margin-mobile px-1.5 text-[10px] font-black">
                    {item.badge}
                  </Badge>
                ) : (
                  <ChevronRight size={14} className={cn(
                    "opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0"
                  )} />
                )}

                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-border">
        <div className="bg-muted/50 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Network Load</span>
          </div>
          <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[65%]" />
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-tighter">65% Capacity Utilized</p>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl group cursor-pointer hover:bg-muted transition-colors">
          <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-background">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&auto=format&fit=crop" alt="User" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black truncate">Julian Rivera</p>
            <p className="text-[10px] text-muted-foreground font-bold truncate uppercase tracking-tighter">Operations Lead</p>
          </div>
          <Settings size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </aside>
  )
}
