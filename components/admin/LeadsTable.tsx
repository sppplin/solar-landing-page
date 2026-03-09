"use client"

import { useEffect, useState } from "react"
import { HiOutlineSearch, HiOutlineDownload, HiOutlineTrash, HiOutlinePhone, HiOutlineChatAlt } from "react-icons/hi"
import { FaWhatsapp } from "react-icons/fa"

interface Lead {
  id: number
  name: string
  phone: string
  company: string
  packaging_type: string
  quantity: string | number
  message?: string
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [expandedMsg, setExpandedMsg] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => { setLeads(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const deleteLead = async (id: number) => {
    setDeletingId(id)
    await fetch("/api/delete-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    setLeads((prev) => prev.filter((l) => l.id !== id))
    setDeletingId(null)
  }

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search)
  )

  const q = (val: string | number | undefined) =>
    `"${String(val ?? "").replace(/"/g, '""')}"`

  const exportCSV = () => {
    const rows = filtered.map((l) => [
      q(l.name),
      q(l.phone),
      q(l.company),
      q(l.packaging_type),
      q(l.quantity),   // ← was unquoted — "25,000+ pieces" was splitting into 2 columns
      q(l.message),
    ])
    const csv =
      "Name,Phone,Company,Packaging,Quantity,Message\n" +
      rows.map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "leads.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const headers = ["Name", "Phone", "Company", "Packaging Type", "Qty", "Message", "WhatsApp", "Action"]

  return (
    <div className="p-4 sm:p-6">

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium hidden sm:block">
            {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background text-sm font-semibold tracking-wide hover:bg-foreground/80 transition-colors"
          >
            <HiOutlineDownload className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* ── Table (desktop) ── */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted border-b border-border">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    Loading leads…
                  </div>
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No leads found{search ? ` for "${search}"` : ""}.
                </td>
              </tr>
            )}

            {!loading && filtered.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-border last:border-0 hover:bg-primary/[0.03] transition-colors"
              >
                {/* Name */}
                <td className="px-4 py-3.5 font-semibold text-foreground whitespace-nowrap">
                  {lead.name}
                </td>

                {/* Phone */}
                <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <HiOutlinePhone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {lead.phone}
                  </div>
                </td>

                {/* Company */}
                <td className="px-4 py-3.5 text-muted-foreground">
                  {lead.company || "—"}
                </td>

                {/* Packaging type */}
                <td className="px-4 py-3.5">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-primary/10 border border-primary/25 text-[11px] font-semibold text-accent tracking-wide whitespace-nowrap">
                    {lead.packaging_type || "—"}
                  </span>
                </td>

                {/* Qty */}
                <td className="px-4 py-3.5 font-heading text-lg font-bold text-foreground">
                  {lead.quantity || "—"}
                </td>

                {/* Message */}
                <td className="px-4 py-3.5 max-w-[220px]">
                  {lead.message ? (
                    <div>
                      <p className={`text-sm text-muted-foreground leading-snug ${expandedMsg === lead.id ? "" : "line-clamp-2"}`}>
                        {lead.message}
                      </p>
                      {lead.message.length > 80 && (
                        <button
                          onClick={() => setExpandedMsg(expandedMsg === lead.id ? null : lead.id)}
                          className="mt-1 text-[10px] font-bold text-accent hover:text-primary transition-colors uppercase tracking-wide"
                        >
                          {expandedMsg === lead.id ? "Show less" : "Read more"}
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground/40 text-sm">—</span>
                  )}
                </td>

                {/* WhatsApp */}
                <td className="px-4 py-3.5">
                  <a
                    href={`https://wa.me/${lead.phone}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20we%20received%20your%20packaging%20quote%20request.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-semibold hover:bg-green-100 hover:border-green-300 transition-colors whitespace-nowrap"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </td>

                {/* Delete */}
                <td className="px-4 py-3.5">
                  <button
                    onClick={() => deleteLead(lead.id)}
                    disabled={deletingId === lead.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted-foreground text-xs font-semibold hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === lead.id ? (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                    ) : (
                      <HiOutlineTrash className="w-3.5 h-3.5" />
                    )}
                    Delete
                  </button>
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

        {!loading && filtered.map((lead) => (
          <div
            key={lead.id}
            className="bg-card border border-border rounded-xl p-4 relative overflow-hidden"
          >
            {/* Gold left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-l-xl" />

            <div className="pl-3">
              {/* Top row: name + badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="font-semibold text-foreground text-base">{lead.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <HiOutlinePhone className="w-3 h-3 text-primary" />
                    {lead.phone}
                  </p>
                </div>
                <span className="inline-block px-2 py-1 rounded-md bg-primary/10 border border-primary/25 text-[10px] font-bold text-accent tracking-wide whitespace-nowrap">
                  {lead.packaging_type || "—"}
                </span>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                <span>
                  <span className="font-semibold text-foreground">Company:</span> {lead.company || "—"}
                </span>
                <span>
                  <span className="font-semibold text-foreground">Qty:</span> {lead.quantity || "—"}
                </span>
              </div>

              {/* Message */}
              {lead.message && (
                <div className="mb-4 p-3 rounded-lg bg-muted border border-border">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <HiOutlineChatAlt className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
                      Message
                    </span>
                  </div>
                  <p className={`text-xs text-foreground leading-relaxed ${expandedMsg === lead.id ? "" : "line-clamp-3"}`}>
                    {lead.message}
                  </p>
                  {lead.message.length > 120 && (
                    <button
                      onClick={() => setExpandedMsg(expandedMsg === lead.id ? null : lead.id)}
                      className="mt-1.5 text-[10px] font-bold text-accent hover:text-primary transition-colors uppercase tracking-wide"
                    >
                      {expandedMsg === lead.id ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${lead.phone}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20we%20received%20your%20packaging%20quote%20request.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  WhatsApp
                </a>
                <button
                  onClick={() => deleteLead(lead.id)}
                  disabled={deletingId === lead.id}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border text-muted-foreground text-xs font-semibold hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors disabled:opacity-50"
                >
                  {deletingId === lead.id ? (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
                  ) : (
                    <HiOutlineTrash className="w-3.5 h-3.5" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer count ── */}
      {!loading && filtered.length > 0 && (
        <p className="mt-4 text-xs text-muted-foreground text-right">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
          <span className="font-semibold text-foreground">{leads.length}</span> leads
        </p>
      )}

    </div>
  )
}