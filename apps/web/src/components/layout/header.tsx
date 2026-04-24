"use client"

import { Search, Bell, Menu, Moon, Sun, Plus } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { setTheme, theme } = useTheme()

  return (
    <header className="sticky top-0 z-40 w-full glass-effect border-b border-border py-4 px-6 md:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 lg:hidden">
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Menu size={20} />
        </Button>
        <h1 className="text-lg font-black tracking-tighter uppercase italic lg:hidden">StockMaster</h1>
      </div>

      <div className="flex-1 max-w-2xl hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
          <Input
            placeholder="Search items, SKUs, or rack locations..."
            className="pl-10 h-11 bg-muted/50 border-none rounded-xl focus-visible:ring-primary/20 transition-all font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 ml-auto">
        <Button variant="outline" size="icon" className="rounded-xl border-border h-11 w-11 hidden sm:flex">
          <Bell size={20} className="text-muted-foreground" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="icon" className="rounded-xl border-border h-11 w-11">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl border-border bg-card">
            <DropdownMenuItem onClick={() => setTheme("light")} className="font-bold uppercase text-[10px] tracking-widest cursor-pointer">
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="font-bold uppercase text-[10px] tracking-widest cursor-pointer">
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="font-bold uppercase text-[10px] tracking-widest cursor-pointer">
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="rounded-xl h-11 px-6 font-black uppercase text-[11px] tracking-widest shadow-lg shadow-primary/10">
          <Plus size={18} className="mr-2" />
          <span className="hidden sm:inline">New Asset</span>
        </Button>
      </div>
    </header>
  )
}
