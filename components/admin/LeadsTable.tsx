"use client"

import { useEffect, useState, useMemo } from "react"
import {
  HiOutlineSearch, HiOutlineDownload, HiOutlineTrash,
  HiOutlinePhone, HiOutlineChatAlt, HiOutlineFilter,
  HiOutlineChevronLeft, HiOutlineChevronRight,
  HiOutlinePencil, HiOutlineX, HiOutlineCheck,
  HiOutlineCalendar,
} from "react-icons/hi"
import { FaWhatsapp } from "react-icons/fa"

interface Lead {
  id: number
  name: string
  phone: string
  company: string
  packaging_type: string
  quantity: string | number
  message?: string
  submitted_at?: string
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

const PACKAGING_TYPES = [
  "Mono Cartons", "Rigid Boxes", "Custom Printed Boxes", "Food Packaging Boxes",
  "FMCG Packaging", "Cosmetic / Beauty Boxes", "Ecommerce / Mailer Boxes",
  "Gift Boxes", "Corrugated Boxes", "General Enquiry", "Other",
]

const QUANTITIES = [
  "500 - 1,000 pieces", "1,000 - 5,000 pieces",
  "5,000 - 25,000 pieces", "25,000+ pieces", "Not sure yet",
]

function fmtDate(iso?: string) {
  if (!iso) return "—"
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  })
}

function fmtDateShort(iso?: string) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function toInputDate(d: Date) {
  return d.toISOString().split("T")[0]
}

// ── Pretty date input wrapper ──────────────────────────────────────────────
function DateInput({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex-1 min-w-[140px]">
      <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
        {label}
      </label>
      <div className="relative">
        <HiOutlineCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none cursor-pointer"
          style={{ colorScheme: "light" }}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 transition-colors"
          >
            <HiOutlineX className="w-2.5 h-2.5 text-foreground" />
          </button>
        )}
      </div>
    </div>
  )
}

export default function LeadsTable() {
  const [leads, setLeads]             = useState<Lead[]>([])
  const [search, setSearch]           = useState("")
  const [loading, setLoading]         = useState(true)
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set())
  const [expandedMsg, setExpandedMsg] = useState<number | null>(null)
  const [selected, setSelected]       = useState<Set<number>>(new Set())
  const [pageSize, setPageSize]       = useState(10)
  const [page, setPage]               = useState(1)
  const [dateFrom, setDateFrom]       = useState("")
  const [dateTo, setDateTo]           = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const [confirmBulk, setConfirmBulk] = useState(false)

  // Edit state
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [editForm, setEditForm]       = useState<Partial<Lead>>({})
  const [editSaving, setEditSaving]   = useState(false)
  const [editError, setEditError]     = useState("")

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => { setLeads(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => leads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      (l.company ?? "").toLowerCase().includes(search.toLowerCase())
    const t = l.submitted_at ? new Date(l.submitted_at) : null
    const matchFrom = dateFrom ? (t && t >= new Date(dateFrom + "T00:00:00")) : true
    const matchTo   = dateTo   ? (t && t <= new Date(dateTo   + "T23:59:59")) : true
    return matchSearch && matchFrom && matchTo
  }), [leads, search, dateFrom, dateTo])

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage   = Math.min(page, totalPages)
  const paginated  = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)
  useEffect(() => { setPage(1) }, [search, dateFrom, dateTo, pageSize])

  // ── Selection ─────────────────────────────────────────────────────────────
  const allPageSelected = paginated.length > 0 && paginated.every((l) => selected.has(l.id))
  const someSelected    = selected.size > 0
  const toggleAll = () => {
    if (allPageSelected) setSelected((p) => { const s = new Set(p); paginated.forEach((l) => s.delete(l.id)); return s })
    else setSelected((p) => { const s = new Set(p); paginated.forEach((l) => s.add(l.id)); return s })
  }
  const toggleOne  = (id: number) => setSelected((p) => { const s = new Set(p); s.has(id) ? s.delete(id) : s.add(id); return s })
  const selectAll  = () => setSelected(new Set(filtered.map((l) => l.id)))
  const clearSel   = () => setSelected(new Set())

  // ── Delete single ──────────────────────────────────────────────────────────
  const deleteLead = async (id: number) => {
    setDeletingIds((p) => new Set(p).add(id))
    await fetch("/api/delete-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    setLeads((p) => p.filter((l) => l.id !== id))
    setSelected((p) => { const s = new Set(p); s.delete(id); return s })
    setDeletingIds((p) => { const s = new Set(p); s.delete(id); return s })
  }

  // ── Bulk delete ────────────────────────────────────────────────────────────
  const bulkDelete = async () => {
    setBulkDeleting(true)
    const ids = Array.from(selected)
    await Promise.all(ids.map((id) =>
      fetch("/api/delete-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    ))
    setLeads((p) => p.filter((l) => !ids.includes(l.id)))
    setSelected(new Set()); setBulkDeleting(false); setConfirmBulk(false)
  }

  // ── Edit ───────────────────────────────────────────────────────────────────
  const openEdit  = (lead: Lead) => { setEditingLead(lead); setEditForm({ ...lead }); setEditError("") }
  const closeEdit = () => { setEditingLead(null); setEditForm({}); setEditError("") }
  const saveEdit  = async () => {
    if (!editForm.name?.trim() || !editForm.phone?.trim()) { setEditError("Name and Phone are required."); return }
    setEditSaving(true); setEditError("")
    try {
      const res = await fetch("/api/edit-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editForm) })
      if (!res.ok) throw new Error()
      setLeads((p) => p.map((l) => l.id === editForm.id ? { ...l, ...editForm } as Lead : l))
      closeEdit()
    } catch { setEditError("Failed to save. Please try again.") }
    finally { setEditSaving(false) }
  }

  // ── Export ─────────────────────────────────────────────────────────────────
  const q = (v: string | number | undefined) => `"${String(v ?? "").replace(/"/g, '""')}"`
  const exportCSV = (rows: Lead[]) => {
    const csv = "Name,Phone,Company,Packaging,Quantity,Message,Date\n" +
      rows.map((l) => [q(l.name), q(l.phone), q(l.company), q(l.packaging_type), q(l.quantity), q(l.message), q(fmtDate(l.submitted_at))].join(",")).join("\n")
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })), download: `leads-${toInputDate(new Date())}.csv` })
    a.click()
  }

  // ── Presets ────────────────────────────────────────────────────────────────
  const setPreset = (p: "today" | "week" | "month" | "all") => {
    const now = new Date()
    if (p === "today")  { setDateFrom(toInputDate(now)); setDateTo(toInputDate(now)) }
    else if (p === "week")  { const s = new Date(now); s.setDate(now.getDate() - 6); setDateFrom(toInputDate(s)); setDateTo(toInputDate(now)) }
    else if (p === "month") { setDateFrom(toInputDate(new Date(now.getFullYear(), now.getMonth(), 1))); setDateTo(toInputDate(now)) }
    else { setDateFrom(""); setDateTo("") }
  }

  const hasDateFilter = !!(dateFrom || dateTo)
  const exportRows    = selected.size > 0 ? filtered.filter((l) => selected.has(l.id)) : filtered
  const exportLabel   = selected.size > 0 ? `Export (${selected.size})` : hasDateFilter ? `Export Filtered (${filtered.length})` : `Export All (${filtered.length})`

  const headers = ["", "Name", "Phone", "Company", "Packaging Type", "Qty", "Date", "Message", "Actions"]

  return (
    <div className="p-4 sm:p-6">

      {/* ── Bulk action bar ── */}
      {someSelected && (
        <div className="mb-4 flex items-center justify-between flex-wrap gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-primary/30">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground flex-wrap">
            <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-primary text-black text-xs font-black">{selected.size}</span>
            <span className="text-foreground">lead{selected.size !== 1 ? "s" : ""} selected</span>
            <button onClick={selectAll} className="text-xs text-accent hover:text-primary underline underline-offset-2 transition-colors">
              Select all {filtered.length}
            </button>
            <button onClick={clearSel} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors">
              Clear
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportCSV(exportRows)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-foreground text-background text-xs font-bold hover:bg-foreground/80 transition-colors"
            >
              <HiOutlineDownload className="w-3.5 h-3.5" />
              Export Selected
            </button>
            {!confirmBulk ? (
              <button
                onClick={() => setConfirmBulk(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors"
              >
                <HiOutlineTrash className="w-3.5 h-3.5" />
                Delete Selected
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <span className="text-xs text-red-600 font-semibold">Delete {selected.size}?</span>
                <button onClick={bulkDelete} disabled={bulkDeleting}
                  className="px-3 py-1 rounded-md bg-red-600 text-white text-xs font-black hover:bg-red-700 disabled:opacity-50 transition-colors">
                  {bulkDeleting ? "…" : "Yes"}
                </button>
                <button onClick={() => setConfirmBulk(false)}
                  className="px-3 py-1 rounded-md border border-red-200 bg-white text-xs font-semibold text-red-400 hover:bg-red-50 transition-colors">
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search name, phone, company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              hasDateFilter
                ? "bg-primary text-black border-primary shadow-sm"
                : showFilters
                ? "bg-muted border-primary/30 text-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <HiOutlineFilter className="w-4 h-4" />
            {hasDateFilter ? `Filtered` : "Filter"}
            {hasDateFilter && (
              <span className="ml-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-black/20 text-[9px] font-black">✓</span>
            )}
          </button>
          <button
            onClick={() => exportCSV(exportRows)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold tracking-wide hover:bg-foreground/80 transition-colors"
          >
            <HiOutlineDownload className="w-4 h-4" />
            <span>{exportLabel}</span>
          </button>
        </div>
      </div>

      {/* ── Date filter panel ── */}
      {showFilters && (
        <div className="mb-4 p-4 rounded-xl border border-border bg-muted/40">
          {/* Date inputs row */}
          <div className="flex flex-wrap items-end gap-3 mb-3">
            <DateInput label="From Date" value={dateFrom} onChange={setDateFrom} />
            <DateInput label="To Date"   value={dateTo}   onChange={setDateTo} />
          </div>

          {/* Preset chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1">Quick:</span>
            {(["today", "week", "month", "all"] as const).map((p) => {
              const labels = { today: "Today", week: "Last 7 Days", month: "This Month", all: "All Time" }
              return (
                <button
                  key={p}
                  onClick={() => setPreset(p)}
                  className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-semibold text-muted-foreground hover:bg-primary hover:border-primary hover:text-black transition-all"
                >
                  {labels[p]}
                </button>
              )
            })}
            {hasDateFilter && (
              <button
                onClick={() => { setDateFrom(""); setDateTo("") }}
                className="ml-auto px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1"
              >
                <HiOutlineX className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Active filter label */}
          {hasDateFilter && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-accent font-semibold">
              <HiOutlineCalendar className="w-3.5 h-3.5" />
              {dateFrom && dateTo
                ? `${fmtDateShort(dateFrom + "T00:00:00")} → ${fmtDateShort(dateTo + "T00:00:00")}`
                : dateFrom
                ? `From ${fmtDateShort(dateFrom + "T00:00:00")}`
                : `Until ${fmtDateShort(dateTo + "T00:00:00")}`}
              <span className="text-muted-foreground font-normal">· {filtered.length} results</span>
            </div>
          )}
        </div>
      )}

      {/* ── Results + rows per page ── */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span> lead{filtered.length !== 1 ? "s" : ""} found
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-2 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 cursor-pointer"
          >
            {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* ── Table (desktop) ── */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="px-4 py-3 w-10">
                <input type="checkbox" checked={allPageSelected} onChange={toggleAll}
                  className="w-4 h-4 rounded border-border accent-primary cursor-pointer" />
              </th>
              {headers.slice(1).map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={9} className="px-4 py-12 text-center text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  Loading leads…
                </div>
              </td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={9} className="px-4 py-12 text-center text-sm text-muted-foreground">
                No leads found{search ? ` for "${search}"` : ""}.
              </td></tr>
            )}
            {!loading && paginated.map((lead) => (
              <tr key={lead.id}
                className={`border-b border-border last:border-0 transition-colors ${selected.has(lead.id) ? "bg-primary/5" : "hover:bg-muted/40"}`}
              >
                <td className="px-4 py-3.5">
                  <input type="checkbox" checked={selected.has(lead.id)} onChange={() => toggleOne(lead.id)}
                    className="w-4 h-4 rounded border-border accent-primary cursor-pointer" />
                </td>
                <td className="px-4 py-3.5 font-semibold text-foreground whitespace-nowrap">{lead.name}</td>
                <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <HiOutlinePhone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {lead.phone}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-muted-foreground max-w-[140px] truncate">{lead.company || "—"}</td>
                <td className="px-4 py-3.5">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-primary/10 border border-primary/25 text-[11px] font-semibold text-accent tracking-wide whitespace-nowrap">
                    {lead.packaging_type || "—"}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm font-semibold text-foreground whitespace-nowrap">{lead.quantity || "—"}</td>
                <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{fmtDate(lead.submitted_at)}</td>
                <td className="px-4 py-3.5 max-w-[180px]">
                  {lead.message ? (
                    <div>
                      <p className={`text-xs text-muted-foreground leading-snug ${expandedMsg === lead.id ? "" : "line-clamp-2"}`}>
                        {lead.message}
                      </p>
                      {lead.message.length > 60 && (
                        <button onClick={() => setExpandedMsg(expandedMsg === lead.id ? null : lead.id)}
                          className="mt-1 text-[10px] font-bold text-accent hover:text-primary transition-colors uppercase tracking-wide">
                          {expandedMsg === lead.id ? "Less" : "More"}
                        </button>
                      )}
                    </div>
                  ) : <span className="text-muted-foreground/30 text-xs">—</span>}
                </td>
                {/* Actions */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20we%20received%20your%20packaging%20quote%20request.`}
                      target="_blank" rel="noopener noreferrer" title="WhatsApp"
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 border border-green-200 text-green-600 hover:bg-green-100 hover:border-green-300 transition-colors">
                      <FaWhatsapp className="w-3.5 h-3.5" />
                    </a>
                    <button onClick={() => openEdit(lead)} title="Edit"
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-accent transition-colors">
                      <HiOutlinePencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => deleteLead(lead.id)} disabled={deletingIds.has(lead.id)} title="Delete"
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      {deletingIds.has(lead.id)
                        ? <span className="w-3 h-3 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                        : <HiOutlineTrash className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Cards (mobile) ── */}
      <div className="md:hidden flex flex-col gap-3">
        {loading && (
          <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
            <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            Loading leads…
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-10">
            No leads found{search ? ` for "${search}"` : ""}.
          </p>
        )}
        {!loading && paginated.map((lead) => (
          <div key={lead.id}
            className={`border rounded-xl p-4 relative overflow-hidden transition-colors ${selected.has(lead.id) ? "bg-primary/5 border-primary/30" : "bg-card border-border"}`}
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-l-xl" />
            <div className="pl-3">
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="flex items-start gap-2">
                  <input type="checkbox" checked={selected.has(lead.id)} onChange={() => toggleOne(lead.id)}
                    className="w-4 h-4 mt-0.5 rounded border-border accent-primary cursor-pointer flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <HiOutlinePhone className="w-3 h-3 text-primary" />{lead.phone}
                    </p>
                  </div>
                </div>
                <span className="inline-block px-2 py-1 rounded-md bg-primary/10 border border-primary/25 text-[10px] font-bold text-accent tracking-wide whitespace-nowrap">
                  {lead.packaging_type || "—"}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2.5">
                <span><span className="font-semibold text-foreground">Co:</span> {lead.company || "—"}</span>
                <span><span className="font-semibold text-foreground">Qty:</span> {lead.quantity || "—"}</span>
                <span><span className="font-semibold text-foreground">Date:</span> {fmtDate(lead.submitted_at)}</span>
              </div>
              {lead.message && (
                <div className="mb-3 p-2.5 rounded-lg bg-muted border border-border">
                  <div className="flex items-center gap-1.5 mb-1">
                    <HiOutlineChatAlt className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-muted-foreground">Message</span>
                  </div>
                  <p className={`text-xs text-foreground leading-relaxed ${expandedMsg === lead.id ? "" : "line-clamp-2"}`}>
                    {lead.message}
                  </p>
                  {lead.message.length > 80 && (
                    <button onClick={() => setExpandedMsg(expandedMsg === lead.id ? null : lead.id)}
                      className="mt-1 text-[10px] font-bold text-accent hover:text-primary transition-colors uppercase tracking-wide">
                      {expandedMsg === lead.id ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2">
                <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20we%20received%20your%20packaging%20quote%20request.`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors">
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp
                </a>
                <button onClick={() => openEdit(lead)} title="Edit"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-accent transition-colors flex-shrink-0">
                  <HiOutlinePencil className="w-4 h-4" />
                </button>
                <button onClick={() => deleteLead(lead.id)} disabled={deletingIds.has(lead.id)} title="Delete"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors disabled:opacity-40 flex-shrink-0">
                  {deletingIds.has(lead.id)
                    ? <span className="w-3.5 h-3.5 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                    : <HiOutlineTrash className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Pagination ── */}
      {!loading && filtered.length > 0 && (
        <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{(safePage - 1) * pageSize + 1}</span>–<span className="font-semibold text-foreground">{Math.min(safePage * pageSize, filtered.length)}</span> of <span className="font-semibold text-foreground">{filtered.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={safePage === 1}
              className="px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">«</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}
              className="px-2 py-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <HiOutlineChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let p = totalPages <= 5 ? i + 1 : safePage <= 3 ? i + 1 : safePage >= totalPages - 2 ? totalPages - 4 + i : safePage - 2 + i
              return (
                <button key={p} onClick={() => setPage(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${safePage === p ? "bg-primary border-primary text-black" : "border-border text-muted-foreground hover:bg-muted"}`}>
                  {p}
                </button>
              )
            })}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}
              className="px-2 py-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <HiOutlineChevronRight className="w-4 h-4" />
            </button>
            <button onClick={() => setPage(totalPages)} disabled={safePage === totalPages}
              className="px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors">»</button>
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeEdit} />
          <div className="relative z-10 w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: "linear-gradient(90deg, #F6B913, #ffe55a 50%, #F6B913)" }} />
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
              <div>
                <h3 className="font-heading text-lg font-black uppercase tracking-wide text-foreground">Edit Lead</h3>
                <p className="text-xs text-muted-foreground mt-0.5">ID #{editingLead.id} — {editingLead.name}</p>
              </div>
              <button onClick={closeEdit} className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <HiOutlineX className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Name *</label>
                  <input type="text" value={editForm.name ?? ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Phone *</label>
                  <input type="tel" value={editForm.phone ?? ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Company</label>
                <input type="text" value={editForm.company ?? ""} onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Packaging Type</label>
                  <select value={editForm.packaging_type ?? ""} onChange={(e) => setEditForm({ ...editForm, packaging_type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                    {PACKAGING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Quantity</label>
                  <select value={editForm.quantity ?? ""} onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all">
                    <option value="">— Not specified —</option>
                    {QUANTITIES.map((q) => <option key={q} value={q}>{q}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Message</label>
                <textarea value={editForm.message ?? ""} onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                  rows={3} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
              </div>
              {editError && (
                <p className="px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">{editError}</p>
              )}
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border bg-muted/30">
              <button onClick={closeEdit} className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors">
                Cancel
              </button>
              <button onClick={saveEdit} disabled={editSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-black uppercase tracking-wide text-sm text-black transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}>
                {editSaving ? <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" /> : <HiOutlineCheck className="w-4 h-4" />}
                {editSaving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}