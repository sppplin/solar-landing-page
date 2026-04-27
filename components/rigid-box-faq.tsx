"use client"

import { useState } from "react"
import { HiChevronDown } from "react-icons/hi"
import { X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { MdPhoneCallback } from "react-icons/md"
import { CallBackRequestForm } from "./CallBackRequestForm"

const faqs = [
  {
    category: "Orders",
    q: "How do I place an order for rigid boxes?",
    a: "Share your box size, quantity, design, and delivery location with us. Our team will provide pricing and production details.",
  },
  {
    category: "Packaging",
    q: "What are rigid boxes used for?",
    a: "Rigid boxes are ideal for luxury gifts, cosmetics, electronics, jewelry, perfumes, apparel, and premium retail packaging.",
  },
  {
    category: "Customization",
    q: "Can rigid boxes be customized?",
    a: "Yes, we fully customize rigid boxes in size, shape, style, inserts, printing, and finishing according to your brand needs.",
  },
  {
    category: "Pricing",
    q: "What is the price of custom rigid boxes?",
    a: "Pricing depends on box dimensions, material thickness, quantity, printing, inserts, and finishing options.",
  },
  {
    category: "Branding",
    q: "Can I print my logo on rigid boxes?",
    a: "Yes, we offer logo printing with foil stamping, embossing, debossing, spot UV, and premium finishes.",
  },
  {
    category: "Protection",
    q: "Do rigid boxes protect products well?",
    a: "Yes, rigid boxes are strong and durable. We also offer foam, EVA, cardboard, and molded inserts for extra protection.",
  },
  {
    category: "Samples",
    q: "Can I get a sample before bulk order?",
    a: "Yes, sample boxes are available so you can check quality, size, print, and finishing before production.",
  },
  {
    category: "MOQ",
    q: "What is the minimum order quantity?",
    a: "MOQ depends on box type and customization. Contact us for the best option based on your requirement.",
  },
  {
    category: "Printing",
    q: "What printing options are available?",
    a: "We provide offset printing, digital printing, Pantone colors, foil stamping, embossing, UV, matte and gloss lamination.",
  },
  {
    category: "Styles",
    q: "Which rigid box styles do you make?",
    a: "We manufacture magnetic boxes, drawer boxes, hinged boxes, collapsible boxes, shoulder neck boxes, and gift boxes.",
  },
  {
    category: "Materials",
    q: "What materials are used in rigid boxes?",
    a: "We use high-density grey board, chipboard, kraft wrap, art paper, specialty paper, fabric wraps, and premium textures.",
  },
  {
    category: "Basics",
    q: "Why choose a rigid box manufacturer?",
    a: "A professional manufacturer ensures premium quality, accurate sizing, custom branding, strong packaging, and timely delivery.",
  },
]

const categories = Array.from(new Set(faqs.map((f) => f.category)))

export function RigidBoxFAQ() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showCallBackModal, setShowCallBackModal] = useState(false)

  const displayed = activeCategory === "All"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <>
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-accent">Got Questions?</span>
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground leading-none mb-4">
            Frequently Asked{" "}
            <span className="text-primary relative inline-block">
              Questions
              <span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg, #F6B913, #ffe55a)" }}
              />
            </span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about our packaging products, pricing, and process.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null) }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-all ${
                activeCategory === cat
                  ? "bg-primary border-primary text-black shadow-sm"
                  : "bg-white border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {displayed.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? "border-primary/40 shadow-md shadow-primary/5" : "border-border hover:border-primary/25"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${isOpen ? "bg-primary" : "bg-border group-hover:bg-primary/50"}`} />
                    <span className={`text-sm font-semibold leading-snug transition-colors ${isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"}`}>
                      {faq.q}
                    </span>
                  </div>
                  <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 ${
                    isOpen ? "bg-primary text-black rotate-180" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-accent"
                  }`}>
                    <HiChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                  <div className="px-5 pb-5 pl-9">
                    <div className="w-8 h-0.5 rounded-full bg-primary mb-3" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    <span className="mt-3 inline-block px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-accent tracking-wide">
                      {faq.category}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl border border-border bg-muted/30">
          <p className="text-sm font-semibold text-foreground mb-1">Still have questions?</p>
          <p className="text-sm text-muted-foreground mb-5">
            Our team responds immediately — Mon to Sat, 9 AM to 6:30 PM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919911767272?text=Hi%2C+I+have+a+question+about+your+rigid+box+packaging."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-black uppercase tracking-wide text-sm text-black transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
              style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
            >
              <FaWhatsapp className="w-4 h-4" />
              WhatsApp Us
            </a>
           <button
              onClick={() =>
                setShowCallBackModal(true)
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-black uppercase tracking-wide text-sm border border-border text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              <MdPhoneCallback className="w-4 h-4" />
              Call Back Request
            </button>
          </div>
        </div>

      </div>
    </section>
    {showCallBackModal && (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4">
        <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <button
            onClick={() =>
              setShowCallBackModal(false)
            }
            className="absolute right-3 top-3 z-10 rounded-full bg-black/10 p-1.5"
          >
            <X className="h-4 w-4" />
          </button>

          <CallBackRequestForm
            variant="dialog"
            onSuccess={() =>
              setShowCallBackModal(false)
            }
          />
        </div>
      </div>
    )}
    </>
  )
}