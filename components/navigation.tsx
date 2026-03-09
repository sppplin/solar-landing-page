"use client"

import { Phone, Menu, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { HiOutlineClipboardList } from "react-icons/hi"
import { useState } from "react"
import Image from "next/image"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b-[3px] border-primary bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:px-6 sm:py-3">
        {/* Logo */}
        <a href="#" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Solar Print Process - Custom Packaging Manufacturer"
            width={0}
            height={0}
            priority
            className="h-10 w-auto sm:h-12"
          />
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
