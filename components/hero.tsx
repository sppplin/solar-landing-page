"use client"

import { HiOutlineClipboardList } from "react-icons/hi"
import { FaWhatsapp } from "react-icons/fa"
import { QuoteForm } from "./quote-form"

const chips = [
  "Mono Cartons",
  "Rigid Boxes",
  "Cosmetic Boxes",
  "Food Packaging",
  "FMCG Boxes",
  "Ecommerce Packs",
  "Luxury Packaging",
  "Product Display System",
  "Gift Packaging",
]

const stats = [
  { value: "51+", label: "Years Est." },
  { value: "200K", label: "Sq Ft Plant" },
  { value: "500+", label: "B2B Clients" },
]

export function Hero() {
  return (
    <section className="hero-pattern relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#3d2a14] pt-8 sm:pt-14">
      <div className="relative z-10 mx-auto grid max-w-[1120px] items-start gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[1fr_400px]">
        <div className="pb-8 sm:pb-14">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/15 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wide text-accent sm:mb-6 sm:px-3.5 sm:py-1.5 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-accent sm:h-2 sm:w-2"></span>
            Direct Factory - Noida, Delhi NCR
          </div>

          {/* Headline */}
          <h1 className="mb-4 font-heading text-[clamp(32px,8vw,68px)] font-black uppercase leading-[1.05] tracking-tight text-white sm:mb-5">
            Custom Packaging
            <br />
            <em className="not-italic text-accent">Manufacturer</em>
            <br />
            Since 1975
          </h1>

          {/* Description */}
          <p className="mb-5 max-w-[500px] text-sm text-[#9999bb] sm:mb-7 sm:text-[17px]">
            Mono cartons, rigid boxes, FMCG, food and cosmetic packaging. Factory-direct pricing. 200,000 sq ft Noida
            plant. Bulk orders welcome. Pan India delivery.
          </p>

          {/* Chips - Hidden on mobile, shown on tablet+ */}
          <div className="mb-6 hidden flex-wrap gap-2 sm:mb-9 sm:flex sm:gap-2.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-[#ccccdd] sm:px-3.5 sm:py-1.5 sm:text-[13px]"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:rounded-xl">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-2 py-3 text-center sm:px-3 sm:py-5 ${i < stats.length - 1 ? "border-r border-white/10" : ""}`}
              >
                <div className="font-heading text-xl font-black leading-none text-accent sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-[9px] font-medium uppercase tracking-wide text-[#666688] sm:text-[11px]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mobile CTA - Shown only on mobile */}
          <div className="mt-6 flex flex-col gap-3 sm:hidden">
            <a
              href="#theForm"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 font-heading text-base font-black uppercase tracking-wide text-white no-underline"
            >
              <HiOutlineClipboardList className="h-5 w-5" />
              Get Free Quote Now
            </a>
            <a
              href="https://wa.me/919871713676?text=Hello%2C+I+need+a+packaging+quote"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 font-heading text-base font-black uppercase tracking-wide text-foreground no-underline"
            >
              <FaWhatsapp className="h-5 w-5 shrink-0" />
              WhatsApp Us Now
            </a>
          </div>
        </div>

        {/* Quote Form - Hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:block">
          <QuoteForm />
        </div>
      </div>

      {/* Mobile Quote Form Section */}
      <div className="bg-white px-4 py-8 sm:hidden" id="theForm">
        <QuoteForm />
      </div>
    </section>
  )
}
