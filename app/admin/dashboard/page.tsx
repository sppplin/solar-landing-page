import Image from "next/image"
import LeadsTable from "@/components/admin/LeadsTable"
import LogoutButton from "@/components/admin/LogoutButton"
import SiteSettings from "@/components/admin/SiteSettings"
import { HiOutlineClipboardList, HiOutlineCalendar, HiOutlineClock, HiOutlineTrendingUp } from "react-icons/hi"
import { HiSignal } from "react-icons/hi2"
import { neon } from "@neondatabase/serverless"

interface Lead {
  id: number
  name: string
  phone: string
  company?: string
  packaging_type?: string
  quantity?: string | number
  message?: string
  submitted_at?: string
}

async function getLogoUrl(): Promise<string> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT value FROM settings WHERE key = 'logo_url' LIMIT 1`
    return rows[0]?.value?.trim() || "/logo.svg"
  } catch {
    return "/logo.svg"
  }
}

async function getStats(): Promise<{ total: number; thisMonth: number; thisWeek: number; today: number }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/leads`, {
      cache: "no-store",
    })

    if (!res.ok) return { total: 0, thisMonth: 0, thisWeek: 0, today: 0 }

    const leads: Lead[] = await res.json()

    const now = new Date()

    const todayStart = new Date(now)
    todayStart.setHours(0, 0, 0, 0)

    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7))
    weekStart.setHours(0, 0, 0, 0)

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    const total     = leads.length
    const today     = leads.filter(l => l.submitted_at && new Date(l.submitted_at) >= todayStart).length
    const thisWeek  = leads.filter(l => l.submitted_at && new Date(l.submitted_at) >= weekStart).length
    const thisMonth = leads.filter(l => l.submitted_at && new Date(l.submitted_at) >= monthStart).length

    return { total, thisMonth, thisWeek, today }
  } catch (err) {
    console.error("[Dashboard] Stats error:", err)
    return { total: 0, thisMonth: 0, thisWeek: 0, today: 0 }
  }
}

export default async function Page() {
  const [stats, logoUrl] = await Promise.all([getStats(), getLogoUrl()])

  const statCards = [
    {
      label: "Total Leads",
      value: stats.total,
      icon:  HiOutlineClipboardList,
      hint:  "All time",
    },
    {
      label: "This Month",
      value: stats.thisMonth,
      icon:  HiOutlineTrendingUp,
      hint:  new Date().toLocaleString("en-IN", { month: "long", year: "numeric" }),
    },
    {
      label: "This Week",
      value: stats.thisWeek,
      icon:  HiOutlineCalendar,
      hint:  "Mon → today",
    },
    {
      label: "Today",
      value: stats.today,
      icon:  HiOutlineClock,
      hint:  new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    },
  ]

  return (
    <div className="relative min-h-svh bg-background text-foreground overflow-x-hidden">

      {/* ── Gold dot-grid watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(246,185,19,0.15) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Ambient gold glows ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-24 -right-24 w-96 h-96 rounded-full z-0"
        style={{ background: "radial-gradient(circle, rgba(246,185,19,0.1) 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-24 -left-20 w-80 h-80 rounded-full z-0"
        style={{ background: "radial-gradient(circle, rgba(246,185,19,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      {/* ══════════════════════════════════════
          TOPBAR
      ══════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border shadow-sm">
        <div
          className="absolute top-0 inset-x-0 h-[3px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(246,185,19,0.35) 10%, #F6B913 35%, #ffe55a 50%, #F6B913 65%, rgba(246,185,19,0.35) 90%, transparent)"
          }}
        />
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image
              src={logoUrl}
              alt="Solar Print Process Pvt. Ltd."
              width={120}
              height={40}
              unoptimized={logoUrl.startsWith("http") || logoUrl.startsWith("data:")}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-[11px] font-semibold text-muted-foreground tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.7)] animate-blink" />
              Live
            </div>
            <HiSignal className="sm:hidden w-4 h-4 text-green-500" />
            <SiteSettings />
            <LogoutButton />
          </div>

        </div>
      </header>

      {/* ══════════════════════════════════════
          MAIN
      ══════════════════════════════════════ */}
      <main className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-12">

        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-0.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-accent">
              Admin Dashboard
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[54px] font-black uppercase tracking-tight leading-none text-foreground mb-2">
            Quote{" "}
            <span className="relative inline-block">
              Leads
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-primary" />
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            Solar Print Process — all incoming quote requests, manage and follow up.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {statCards.map(({ label, value, icon: Icon, hint }) => (
            <div
              key={label}
              className="group relative bg-card border border-border rounded-xl p-4 sm:p-5 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Animated gold top strip */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-primary via-yellow-300 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-xl" />

              {/* Icon */}
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-primary" />
              </div>

              {/* Number */}
              <div className="font-heading text-4xl font-black tracking-tight text-foreground leading-none mb-1">
                {value}
              </div>

              {/* Label */}
              <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-muted-foreground">
                {label}
              </div>

              {/* Hint */}
              {hint && (
                <div className="text-[10px] text-muted-foreground/50 mt-0.5 truncate">
                  {hint}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Leads Table */}
        <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div
            className="absolute top-0 inset-x-0 h-[3px] z-10"
            style={{ background: "linear-gradient(90deg, #F6B913, #ffe55a 50%, #F6B913)" }}
          />
          <div className="flex items-center justify-between flex-wrap gap-3 px-5 sm:px-6 py-4 bg-muted border-b border-border">
            <div className="flex items-center gap-2">
              <HiOutlineClipboardList className="w-5 h-5 text-primary" />
              <span className="font-heading text-xl font-bold uppercase tracking-wide text-foreground">
                All Quote Requests
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase text-accent bg-primary/10 border border-primary/35 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-blink" />
              Live Data
            </span>
          </div>
          <div className="overflow-x-auto">
            <LeadsTable />
          </div>
        </div>

      </main>
    </div>
  )
}