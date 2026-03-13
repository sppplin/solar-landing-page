"use client"

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"

interface Lead {
  id: number
  packaging_type?: string
  quantity?: string | number
  submitted_at?: string
}

interface Props {
  leads: Lead[]
}

// ── Color palette ──────────────────────────────────────────────────────────
const GOLD    = "#F6B913"
const GOLD2   = "#ffe55a"
const BROWN   = "#9E770C"
const COLORS  = ["#F6B913", "#ffe55a", "#9E770C", "#f59e0b", "#fbbf24", "#d97706", "#b45309", "#92400e"]

// ── Tooltip styles ─────────────────────────────────────────────────────────
const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "10px",
  fontSize: "12px",
  color: "hsl(var(--foreground))",
  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
}

// ── Chart: Leads Over Last 30 Days ────────────────────────────────────────
function LeadsTrendChart({ leads }: Props) {
  const data = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    d.setHours(0, 0, 0, 0)
    const next = new Date(d); next.setDate(d.getDate() + 1)
    const count = leads.filter(l => {
      if (!l.submitted_at) return false
      const t = new Date(l.submitted_at)
      return t >= d && t < next
    }).length
    return {
      date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      leads: count,
    }
  })

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-border">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground">Trend</p>
        <h3 className="font-heading text-lg font-black uppercase tracking-wide text-foreground">Leads Last 30 Days</h3>
      </div>
      <div className="p-4 pt-5">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={GOLD} stopOpacity={0.25} />
                <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: GOLD, strokeWidth: 1, strokeDasharray: "4 4" }} />
            <Area
              type="monotone"
              dataKey="leads"
              stroke={GOLD}
              strokeWidth={2.5}
              fill="url(#goldGrad)"
              dot={false}
              activeDot={{ r: 5, fill: GOLD, stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ── Chart: Packaging Type Distribution ───────────────────────────────────
function PackagingDonut({ leads }: Props) {
  const map: Record<string, number> = {}
  leads.forEach(l => {
    const key = l.packaging_type || "Unknown"
    map[key] = (map[key] || 0) + 1
  })
  const data = Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  const total = leads.length

  // Custom label
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.06) return null
    const RADIAN = Math.PI / 180
    const r = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + r * Math.cos(-midAngle * RADIAN)
    const y = cy + r * Math.sin(-midAngle * RADIAN)
    return (
      <text x={x} y={y} fill="#000" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={700}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-border">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground">Distribution</p>
        <h3 className="font-heading text-lg font-black uppercase tracking-wide text-foreground">Packaging Types</h3>
      </div>
      <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderLabel}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} leads`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-heading text-2xl font-black text-foreground">{total}</span>
            <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">Total</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex-1 space-y-1.5 w-full">
          {data.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-xs text-muted-foreground truncate">{item.name}</span>
              </div>
              <span className="text-xs font-bold text-foreground flex-shrink-0">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Chart: Quantity Range ─────────────────────────────────────────────────
function QuantityChart({ leads }: Props) {
  const order = [
    "500 - 1,000 pieces",
    "1,000 - 5,000 pieces",
    "5,000 - 25,000 pieces",
    "25,000+ pieces",
    "Not sure yet",
  ]
  const labels: Record<string, string> = {
    "500 - 1,000 pieces":    "500–1K",
    "1,000 - 5,000 pieces":  "1K–5K",
    "5,000 - 25,000 pieces": "5K–25K",
    "25,000+ pieces":        "25K+",
    "Not sure yet":          "Not sure",
  }
  const map: Record<string, number> = {}
  leads.forEach(l => {
    const key = String(l.quantity || "Not sure yet")
    map[key] = (map[key] || 0) + 1
  })
  const data = order
    .map(k => ({ name: labels[k] || k, value: map[k] || 0 }))
    .filter(d => d.value > 0)

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-border">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground">Volume</p>
        <h3 className="font-heading text-lg font-black uppercase tracking-wide text-foreground">Order Quantity Range</h3>
      </div>
      <div className="p-4 pt-5">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} leads`, "Count"]} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {data.map((_, i) => (
                <Cell key={i} fill={i === 0 ? GOLD : i === 1 ? GOLD2 : BROWN} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ── Chart: Leads by Hour ──────────────────────────────────────────────────
function HourlyChart({ leads }: Props) {
  const hourMap: Record<number, number> = {}
  leads.forEach(l => {
    if (!l.submitted_at) return
    const h = new Date(l.submitted_at).getHours()
    hourMap[h] = (hourMap[h] || 0) + 1
  })
  const data = Array.from({ length: 24 }, (_, h) => ({
    hour: h === 0 ? "12am" : h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`,
    leads: hourMap[h] || 0,
  }))

  // Peak hour
  const peak = data.reduce((a, b) => (a.leads >= b.leads ? a : b))

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-border flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground">Activity</p>
          <h3 className="font-heading text-lg font-black uppercase tracking-wide text-foreground">Leads by Hour</h3>
        </div>
        {peak.leads > 0 && (
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-semibold">Peak Time</p>
            <p className="font-heading text-base font-black text-primary">{peak.hour}</p>
          </div>
        )}
      </div>
      <div className="p-4 pt-5">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} leads`, "Count"]} />
            <Bar dataKey="leads" radius={[4, 4, 0, 0]} maxBarSize={20}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.hour === peak.hour && peak.leads > 0 ? GOLD : "hsl(var(--muted))"}
                  stroke={entry.hour === peak.hour && peak.leads > 0 ? BROWN : "transparent"}
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────
export default function AdminCharts({ leads }: Props) {
  if (leads.length === 0) return null

  return (
    <div className="mb-8 sm:mb-10">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="w-5 h-0.5 rounded-full bg-primary" />
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-accent">Analytics</span>
      </div>

      {/* Grid: 2 col on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LeadsTrendChart leads={leads} />
        <PackagingDonut   leads={leads} />
        <QuantityChart    leads={leads} />
        <HourlyChart      leads={leads} />
      </div>
    </div>
  )
}