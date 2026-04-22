"use client"

import { useState } from "react"
import { HiChevronDown, HiOutlinePhone } from "react-icons/hi"
import { FaWhatsapp } from "react-icons/fa"

const faqs = [
  {
    category: "Orders",
    q: "How do I place an order?",
    a: "You can place an order by contacting our team with your box size, quantity, design requirements, and delivery location. We’ll share a quotation and production timeline.",
  },
  {
    category: "Luxury Packaging",
    q: "Are these boxes suitable for luxury perfumes?",
    a: "Yes, our boxes are ideal for luxury perfumes. We offer rigid boxes, magnetic closure boxes, premium textures, foil stamping, embossing, and elegant finishes.",
  },
  {
    category: "Design",
    q: "How can I design my custom perfume box?",
    a: "You can share your logo, artwork, brand colors, and ideas with us. Our design team can help create a professional custom perfume box layout for your brand.",
  },
  {
    category: "Pricing",
    q: "What’s the cost of custom perfume boxes?",
    a: "The cost depends on box size, material, quantity, printing method, and finishing options. Contact us for a custom quote based on your requirements.",
  },
  {
    category: "Branding",
    q: "Can I add branding elements to the box?",
    a: "Yes, you can add logos, brand colors, taglines, foil stamping, embossing, UV effects, and other branding elements to create a premium look.",
  },
  {
    category: "Protection",
    q: "How do I protect the perfume bottle inside the box?",
    a: "We offer custom inserts such as foam, EVA, cardboard, and molded supports to keep the perfume bottle safe and secure during storage and shipping.",
  },
  {
    category: "Samples",
    q: "Can I get a sample before placing a large order?",
    a: "Yes, sample boxes can be provided so you can check size, material, print quality, and finishing before bulk production.",
  },
  {
    category: "MOQ",
    q: "Is there a minimum order quantity (MOQ)?",
    a: "Yes, MOQ depends on the box style and customization level. Contact us with your requirement and we’ll guide you with the best option.",
  },
  {
    category: "Printing",
    q: "What printing options are available?",
    a: "We offer offset printing, digital printing, CMYK printing, Pantone matching, foil stamping, spot UV, embossing, and matte/gloss lamination.",
  },
  {
    category: "Customization",
    q: "Can I choose the box size and shape?",
    a: "Yes, all perfume boxes can be fully customized in size, shape, structure, and style according to your product needs.",
  },
  {
    category: "Materials",
    q: "What materials are used for custom perfume boxes?",
    a: "We use rigid board, cardboard, kraft paper, corrugated board, duplex board, and specialty papers depending on the packaging requirement.",
  },
  {
    category: "Basics",
    q: "What are custom perfume boxes?",
    a: "Custom perfume boxes are specially designed packaging boxes made to fit perfume bottles with personalized branding, premium materials, and protective structure.",
  },
]

const categories = Array.from(new Set(faqs.map((f) => f.category)))

export function PerfumeBoxFAQ() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const displayed = activeCategory === "All"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
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
              href="https://wa.me/919871713676?text=Hi%2C+I+have+a+question+about+your+packaging."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-black uppercase tracking-wide text-sm text-black transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
              style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
            >
              <FaWhatsapp className="w-4 h-4" />
              WhatsApp Us
            </a>
            <a
              href="tel:+919871713676"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-black uppercase tracking-wide text-sm border border-border text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              <HiOutlinePhone className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}