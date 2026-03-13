"use client"

import { Phone, Menu, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { HiOutlineClipboardList } from "react-icons/hi"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.logo_url) setLogoUrl(d.logo_url)
      })
      .catch(() => {})
  }, [])

  const logoSrc = logoUrl || "/logo.svg"

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname === "/") {
      // Already on homepage — reload
      window.location.reload()
    } else {
      // Navigate to homepage
      router.push("/")
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b-[3px] border-primary bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:px-6 sm:py-3">
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="shrink-0">
          {logoSrc.startsWith("data:") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoSrc}
              alt="Solar Print Process - Custom Packaging Manufacturer"
              className="h-10 w-auto sm:h-12 object-contain"
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
          <a
            href="tel:+919871713676"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-secondary px-3 py-2 text-sm font-bold text-white no-underline transition-all hover:brightness-110 sm:px-4 sm:py-2.5"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">Call Now</span>
          </a>
          <a
            href="https://wa.me/919871713676?text=Hello%2C+I+need+a+packaging+quote"
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
            <a
              href="tel:+919871713676"
              className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 font-bold text-white no-underline"
            >
              <Phone className="h-5 w-5" />
              Call +91 98717 13676
            </a>
            <a
              href="https://wa.me/919871713676?text=Hello%2C+I+need+a+packaging+quote"
              target="_blank"
              rel="noopener noreferrer"
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
  )
}