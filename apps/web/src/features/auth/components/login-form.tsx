"use client"

import { motion } from "motion/react"
import {
  Package,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  EyeOff,
  Fingerprint
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function LoginForm() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[440px]"
    >
      <div className="mb-12 text-center space-y-6">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20">
            <Package className="text-primary-foreground" size={32} />
          </div>
        </Link>
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter uppercase text-primary">Leuri&apos;s & Litio</h1>
          <p className="text-[11px] font-black uppercase tracking-[0.4em]">Inventory System</p>
        </div>
      </div>

      <Card className="border-border bg-card/60 backdrop-blur-3xl rounded-none shadow-2xl shadow-black/20">
        <CardContent className="p-10 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest ml-4 text-muted-foreground">Worker Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                <Input
                  type="email"
                  placeholder="nexus@leuris.com"
                  className="h-16 bg-muted/40 border-none rounded-2xl pl-14 pr-4 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Password</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  className="h-16 bg-muted/40 border-none rounded-2xl pl-14 pr-14 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <EyeOff size={18} />
                </button>
              </div>
            </div>
          </div>

          <Button asChild className="w-full h-16 rounded-3xl font-black uppercase text-[12px] tracking-[0.2em] shadow-xl shadow-primary/10 gap-3 group">
            <Link href="/" className="text-primary-foreground">
              Login
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <div className="flex flex-col gap-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background/0 px-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Certified Methods</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-14 rounded-2xl border-border bg-muted/30 font-black uppercase text-[10px] tracking-widest gap-2">
                <Fingerprint size={16} />
                Biometric
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl border-border bg-muted/30 font-black uppercase text-[10px] tracking-widest gap-2">
                <ShieldCheck size={16} />
                SAML 2.0
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-12 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">
        <p>© 2026 NEXUS LOGISTICS HUB • ALL ENDPOINTS ENCRYPTED</p>
      </footer>
    </motion.div>
  )
}
