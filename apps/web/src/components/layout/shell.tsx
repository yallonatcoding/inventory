"use client"

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Shell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <div className="flex h-screen overflow-hidden">
      {!isLoginPage && <Sidebar />}
      <div className="flex-1 flex flex-col min-w-0 bg-muted/30 dark:bg-background overflow-hidden relative">
        {!isLoginPage && <Header />}
        <main className={cn(
          "flex-1 overflow-y-auto scroll-smooth",
          !isLoginPage && "p-4 md:p-8"
        )}>
          {children}
        </main>
      </div>
    </div>
  )
}
