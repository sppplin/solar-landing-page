"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import {
  HiOutlineCog,
  HiOutlineCode,
  HiOutlinePhotograph,
  HiOutlineGlobe,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineX,
  HiOutlineUpload,
  HiOutlineTrash,
} from "react-icons/hi"

// ── Types ──────────────────────────────────────────────────────────────────────
type Tab = "gtm" | "logo" | "site"

interface Settings {
  gtm_id:        string
  site_title:    string
  site_desc:     string
  logo_url:      string
  favicon_url:   string
}

interface StatusState {
  type: "idle" | "success" | "error"
  msg:  string
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function StatusMsg({ status }: { status: StatusState }) {
  if (status.type === "idle") return null
  return (
    <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm border mt-4 ${
      status.type === "success"
        ? "bg-green-50 border-green-200 text-green-700"
        : "bg-red-50 border-red-200 text-red-600"
    }`}>
      {status.type === "success"
        ? <HiOutlineCheckCircle className="w-4 h-4 flex-shrink-0" />
        : <HiOutlineExclamationCircle className="w-4 h-4 flex-shrink-0" />
      }
      {status.msg}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function SiteSettings() {
  const [open, setOpen]       = useState(false)
  const [tab, setTab]         = useState<Tab>("gtm")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [status, setStatus]   = useState<StatusState>({ type: "idle", msg: "" })

  // Form state
  const [gtmId,      setGtmId]      = useState("")
  const [siteTitle,  setSiteTitle]  = useState("")
  const [siteDesc,   setSiteDesc]   = useState("")
  const [logoUrl,    setLogoUrl]    = useState("")
  const [faviconUrl, setFaviconUrl] = useState("")

  // File upload previews
  const [logoPreview,    setLogoPreview]    = useState("")
  const [faviconPreview, setFaviconPreview] = useState("")
  const logoRef    = useRef<HTMLInputElement>(null)
  const faviconRef = useRef<HTMLInputElement>(null)

  // Load settings when panel opens
  useEffect(() => {
    if (!open) return
    setLoading(true)
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((d: Settings) => {
        setGtmId(d.gtm_id       ?? "")
        setSiteTitle(d.site_title  ?? "")
        setSiteDesc(d.site_desc   ?? "")
        setLogoUrl(d.logo_url    ?? "")
        setFaviconUrl(d.favicon_url ?? "")
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [open])

  const flash = (type: "success" | "error", msg: string) => {
    setStatus({ type, msg })
    setTimeout(() => setStatus({ type: "idle", msg: "" }), 4000)
  }

  // Convert file to base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const r = new FileReader()
      r.onload  = () => res(r.result as string)
      r.onerror = rej
      r.readAsDataURL(file)
    })

  const handleLogoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const b64 = await toBase64(file)
    setLogoPreview(b64)
    setLogoUrl(b64)
  }

  const handleFaviconFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const b64 = await toBase64(file)
    setFaviconPreview(b64)
    setFaviconUrl(b64)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gtm_id:      gtmId.trim(),
          site_title:  siteTitle.trim(),
          site_desc:   siteDesc.trim(),
          logo_url:    logoUrl,
          favicon_url: faviconUrl,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        flash("success", "Settings saved! Changes will apply on next page load.")
        setLogoPreview("")
        setFaviconPreview("")
      } else {
        flash("error", data.error || "Failed to save.")
      }
    } catch {
      flash("error", "Network error. Try again.")
    }
    setSaving(false)
  }

  // ── Tabs config ──────────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "gtm",  label: "Tracking",   icon: HiOutlineCode       },
    { id: "logo", label: "Logo",       icon: HiOutlinePhotograph  },
    { id: "site", label: "Site Info",  icon: HiOutlineGlobe       },
  ]

  return (
    <>
      {/* ── Settings trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-border bg-background text-muted-foreground text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-150 hover:bg-muted hover:border-primary/40 hover:text-foreground shadow-sm cursor-pointer"
        title="Site Settings"
      >
        <HiOutlineCog className="w-4 h-4" />
        <span className="hidden sm:inline">Settings</span>
      </button>

      {/* ── Modal via Portal — renders directly on document.body so fixed works correctly ── */}
      {open && typeof document !== "undefined" && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          {/* ── Panel ── */}
          <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ maxHeight: "calc(100vh - 32px)" }}>

            {/* Gold top stripe */}
            <div
              className="absolute top-0 inset-x-0 h-[3px] z-10"
              style={{ background: "linear-gradient(90deg, transparent, #F6B913 30%, #ffe55a 50%, #F6B913 70%, transparent)" }}
            />

            {/* ── Panel header ── */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-muted border-b border-border flex-shrink-0">
              <div className="flex items-center gap-2">
                <HiOutlineCog className="w-5 h-5 text-primary" />
                <span className="font-heading text-xl font-bold uppercase tracking-wide text-foreground">
                  Site Settings
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:bg-border hover:text-foreground transition-colors cursor-pointer"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            {/* ── Tabs ── */}
            <div className="flex border-b border-border flex-shrink-0 px-5 sm:px-6 gap-1 bg-muted">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => { setTab(id); setStatus({ type: "idle", msg: "" }) }}
                  className={`inline-flex items-center gap-1.5 px-3 py-3 text-xs font-bold tracking-[0.12em] uppercase border-b-2 transition-all cursor-pointer ${
                    tab === id
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* ── Tab content ── */}
            <div className="overflow-y-auto flex-1 px-5 sm:px-6 py-6">

              {loading ? (
                <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
                  <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  Loading settings…
                </div>
              ) : (
                <>
                  {/* ── GTM TAB ── */}
                  {tab === "gtm" && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Enter your GTM Container ID. It will be injected on every page automatically.
                        </p>
                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
                          GTM Container ID
                        </label>
                        <div className="relative">
                          <HiOutlineCode className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                          <input
                            type="text"
                            value={gtmId}
                            onChange={(e) => setGtmId(e.target.value.toUpperCase())}
                            placeholder="GTM-XXXXXXX"
                            spellCheck={false}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground font-mono text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                          />
                        </div>
                        {gtmId && (
                          <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                            <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                            GTM active — {gtmId}
                          </p>
                        )}
                      </div>

                      {/* Info box */}
                      <div className="p-4 rounded-xl bg-muted border border-border space-y-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">How it works</p>
                        {[
                          "GTM ID saved in Neon DB",
                          "Auto-injected on every page via layout.tsx",
                          "Configure Meta Pixel + Google Ads inside GTM",
                          "Form submits fire form_submit_success to dataLayer",
                        ].map((t) => (
                          <p key={t} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            {t}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── LOGO TAB ── */}
                  {tab === "logo" && (
                    <div className="space-y-6">

                      {/* Logo upload */}
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
                          Site Logo
                        </label>
                        <p className="text-xs text-muted-foreground mb-3">
                          Recommended: SVG or PNG, transparent background, max 200KB
                        </p>

                        {/* Preview */}
                        {(logoPreview || logoUrl) && (
                          <div className="mb-3 p-4 rounded-xl border border-border bg-muted flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={logoPreview || logoUrl}
                                alt="Logo preview"
                                className="h-10 w-auto object-contain"
                              />
                              <span className="text-xs text-muted-foreground">
                                {logoPreview ? "New logo (unsaved)" : "Current logo"}
                              </span>
                            </div>
                            <button
                              onClick={() => { setLogoUrl(""); setLogoPreview(""); if (logoRef.current) logoRef.current.value = "" }}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        <input ref={logoRef} type="file" accept="image/*,.svg" onChange={handleLogoFile} className="hidden" />
                        <button
                          onClick={() => logoRef.current?.click()}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-muted transition-all cursor-pointer"
                        >
                          <HiOutlineUpload className="w-4 h-4" />
                          {logoUrl ? "Replace Logo" : "Upload Logo"}
                        </button>

                      </div>

                      {/* Favicon upload */}
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
                          Favicon
                        </label>
                        <p className="text-xs text-muted-foreground mb-3">
                          Recommended: ICO or PNG, 32×32px or 64×64px
                        </p>

                        {(faviconPreview || faviconUrl) && (
                          <div className="mb-3 p-4 rounded-xl border border-border bg-muted flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={faviconPreview || faviconUrl}
                                alt="Favicon preview"
                                className="w-8 h-8 object-contain"
                              />
                              <span className="text-xs text-muted-foreground">
                                {faviconPreview ? "New favicon (unsaved)" : "Current favicon"}
                              </span>
                            </div>
                            <button
                              onClick={() => { setFaviconUrl(""); setFaviconPreview(""); if (faviconRef.current) faviconRef.current.value = "" }}
                              className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        <input ref={faviconRef} type="file" accept="image/*,.ico" onChange={handleFaviconFile} className="hidden" />
                        <button
                          onClick={() => faviconRef.current?.click()}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-muted transition-all cursor-pointer"
                        >
                          <HiOutlineUpload className="w-4 h-4" />
                          {faviconUrl ? "Replace Favicon" : "Upload Favicon"}
                        </button>

                      </div>
                    </div>
                  )}

                  {/* ── SITE INFO TAB ── */}
                  {tab === "site" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
                          Site Title
                        </label>
                        <input
                          type="text"
                          value={siteTitle}
                          onChange={(e) => setSiteTitle(e.target.value)}
                          placeholder="Solar Print Process - Packaging Manufacturer in Noida"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          Shown in browser tab and Google search results
                        </p>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
                          Meta Description
                        </label>
                        <textarea
                          value={siteDesc}
                          onChange={(e) => setSiteDesc(e.target.value)}
                          placeholder="Packaging manufacturer in Noida..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                        />
                        <p className={`mt-1.5 text-xs ${siteDesc.length > 160 ? "text-red-500" : "text-muted-foreground"}`}>
                          {siteDesc.length}/160 characters — ideal for SEO
                        </p>
                      </div>
                    </div>
                  )}

                  <StatusMsg status={status} />
                </>
              )}
            </div>

            {/* ── Footer with Save button ── */}
            <div className="flex items-center justify-end gap-3 px-5 sm:px-6 py-4 border-t border-border bg-muted flex-shrink-0">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-border transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-heading font-black uppercase tracking-widest text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
              >
                {saving ? (
                  <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                ) : (
                  <HiOutlineCheckCircle className="w-4 h-4" />
                )}
                {saving ? "Saving…" : "Save All"}
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  )
}