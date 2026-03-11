"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const productLinks = [
  "Mono Cartons",
  "Rigid Boxes",
  "Cosmetic Packaging",
  "Food Packaging",
  "Ecommerce Packaging",
  "Commercial Printing",
]

const legalLinks = [
  { label: "Privacy Policy",    href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy",     href: "/cookie-policy" },
  { label: "Disclaimer",        href: "/disclaimer" },
  { label: "Contact Us",        href: "/contact" },
]

export function Footer() {
  const [logoUrl, setLogoUrl] = useState("/logo.svg")

  useEffect(() => {
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((d) => { if (d.logo_url) setLogoUrl(d.logo_url) })
      .catch(() => {})
  }, [])

  return (
    <footer className="bg-secondary pt-8 sm:pt-10">
      <div className="mx-auto grid max-w-[1120px] gap-6 px-4 sm:gap-9 sm:px-6 md:grid-cols-4">
        {/* Company Info */}
        <div>
          <Image
            src={logoUrl}
            alt="Solar Print Process"
            width={140}
            height={42}
            unoptimized
            style={{ width: "auto", height: "auto" }}
            className="mb-3 h-9 brightness-0 invert sm:h-10"
          />
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-[13.5px]">
            Established 1975. Custom packaging manufacturer in Noida. 200,000 sq ft facility. Serving FMCG, Pharma,
            Beauty, Food and 10+ industries.
          </p>
        </div>

        {/* Products */}
        <div>
          <h4 className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-primary sm:mb-3 sm:text-sm">Our Products</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-1">
            {productLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="block text-xs leading-loose text-muted-foreground no-underline transition-colors hover:text-primary sm:text-[13.5px]"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-primary sm:mb-3 sm:text-sm">Contact Us</h4>
          <div className="space-y-0.5">
            <a
              href="tel:+919871713676"
              className="block text-xs leading-loose text-muted-foreground no-underline transition-colors hover:text-primary sm:text-[13.5px]"
            >
              +91 98717 13676
            </a>
            <a
              href="mailto:business@spppl.in"
              className="block text-xs leading-loose text-muted-foreground no-underline transition-colors hover:text-primary sm:text-[13.5px]"
            >
              business@spppl.in
            </a>
            <a
              href="https://wa.me/919871713676"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs leading-loose text-muted-foreground no-underline transition-colors hover:text-primary sm:text-[13.5px]"
            >
              WhatsApp Now
            </a>
            <p className="mt-2 text-xs leading-loose text-muted-foreground sm:mt-2.5 sm:text-[13.5px]">C-10, Sector 85, Noida, <br />Uttar Pradesh — 201305, India</p>
            <p className="text-xs leading-loose text-muted-foreground sm:text-[13.5px]">Mon-Sat: 9:30 AM - 6:00 PM</p>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-primary sm:mb-3 sm:text-sm">Legal</h4>
          <div className="space-y-0.5">
            {legalLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="block text-xs leading-loose text-muted-foreground no-underline transition-colors hover:text-primary sm:text-[13.5px]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-6 max-w-[1120px] border-t border-primary/20 px-4 py-4 text-center sm:mt-7 sm:px-6 sm:py-5">
        <p className="text-[11px] text-muted-foreground sm:text-[12.5px]">
          © 2026 Solar Print Process Pvt. Ltd. · All rights reserved.
        </p>
      </div>
    </footer>
  )
}