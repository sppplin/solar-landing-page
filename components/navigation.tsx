"use client"

import { Menu, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { HiOutlineClipboardList } from "react-icons/hi"
import { MdPhoneCallback } from "react-icons/md"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { CallBackRequestForm } from "./CallBackRequestForm"

// ── WA link helpers ───────────────────────────────────────────────────────────
const WA_NUMBER       = "919911767272"
const DEFAULT_MSG     = "Hello, I need a packaging quote"
const DEFAULT_WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(DEFAULT_MSG)}`

function getProductFromSlug(pathname: string): string | null {
  const slug = pathname.split("/").filter(Boolean).pop()
  if (!slug) return null
  const cleaned = slug
    .replace(/-(manufacturer|supplier|exporter|wholesaler|maker|printing|print|services?|company|india)$/gi, "")
    .replace(/-+$/, "")
    .trim()
  if (!cleaned) return null
  return cleaned.replace(/-/g, " ")
}

function buildWaLink(pathname: string): string {
  const product = getProductFromSlug(pathname)
  const msg = product ? `Hello, I need a ${product} packaging quote` : DEFAULT_MSG
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}
// ─────────────────────────────────────────────────────────────────────────────

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen]       = useState(false)
  const [logoUrl, setLogoUrl]                     = useState<string | null>(null)
  const [showCallBackModal, setShowCallBackModal] = useState(false)

  const router   = useRouter()
  const pathname = usePathname()

  // ── Hydration-safe WA link ────────────────────────────────────────────────
  // SSR always renders DEFAULT_WA_LINK (no pathname available on server).
  // After hydration, useEffect updates to the page-specific link.
  // Both server and client initially agree → no mismatch error.
  const [waLink, setWaLink] = useState(DEFAULT_WA_LINK)
  useEffect(() => {
    setWaLink(buildWaLink(pathname))
  }, [pathname])
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((d) => { if (d.logo_url) setLogoUrl(d.logo_url) })
      .catch(() => {})
  }, [])

  const logoSrc = logoUrl || "/logo.svg"

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname === "/") window.location.reload()
    else router.push("/")
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b-[3px] border-primary bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:px-6 sm:py-3">

          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="shrink-0">
            {logoSrc.startsWith("data:") ? (
              <img
                src={logoSrc}
                alt="Solar Print Process - Custom Packaging Manufacturer"
                className="h-10 w-auto object-contain sm:h-12"
              />
            ) : (
              <Image
                src={logoSrc}
                alt="Solar Print Process - Custom Packaging Manufacturer"
                width={0}
                height={0}
                priority
                unoptimized={logoSrc.startsWith("http")}
                className="h-10 w-auto sm:h-12"
              />
            )}
          </a>

          {/* Desktop CTA Buttons */}
          <div className="hidden items-center gap-2 sm:flex sm:gap-2.5">
            <button
              onClick={() => setShowCallBackModal(true)}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-secondary px-3 py-2 text-sm font-bold text-white no-underline transition-all hover:brightness-110 sm:px-4 sm:py-2.5"
            >
              <MdPhoneCallback className="h-4 w-4" />
              <span className="hidden md:inline">Call Back Request</span>
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-sm font-bold text-foreground no-underline transition-all hover:brightness-90 sm:px-4 sm:py-2.5"
            >
              <FaWhatsapp className="h-4 w-4 shrink-0" />
              <span className="hidden md:inline">WhatsApp Quote</span>
              <span className="md:hidden">WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground sm:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-white px-4 py-4 sm:hidden">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setMobileMenuOpen(false); setShowCallBackModal(true) }}
                className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 font-bold text-white no-underline"
              >
                <MdPhoneCallback className="h-5 w-5" />
                Call Back Request
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-bold text-foreground no-underline"
              >
                <FaWhatsapp className="h-5 w-5 shrink-0" />
                WhatsApp Quote
              </a>

              <a
                href="#theForm"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-bold text-white no-underline"
              >
                <HiOutlineClipboardList className="h-5 w-5" />
                Get Free Quote
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Callback Modal */}
      {showCallBackModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <button
              onClick={() => setShowCallBackModal(false)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/10 p-1.5"
            >
              <X className="h-4 w-4" />
            </button>
            <CallBackRequestForm
              variant="dialog"
              onSuccess={() => setShowCallBackModal(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}