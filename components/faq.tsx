"use client"

import { useState } from "react"
import { HiChevronDown, HiOutlinePhone } from "react-icons/hi"
import { FaWhatsapp } from "react-icons/fa"

const faqs = [
  // ── About Us ───────────────────────────────────────────────────────────────
  {
    category: "About Us",
    q: "Where is Solar Print Process located? Are you a Noida / Greater Noida packaging company?",
    a: "Yes — Solar Print Process Pvt. Ltd. is based at C-10, Sector 85, Noida, Uttar Pradesh 201305. We serve clients across Delhi NCR including Delhi, Noida, Greater Noida, Gurgaon, and Faridabad — and ship pan-India. Our central Noida location means fast delivery and low freight costs for NCR businesses.",
  },
  {
    category: "About Us",
    q: "Is Solar Print Process a manufacturer or a reseller/middleman?",
    a: "We are a direct packaging manufacturer — not a trader or reseller. We own a 200,000 sq ft manufacturing plant in Noida with in-house printing, cutting, lamination, and finishing. No middlemen — better pricing, faster turnaround, and full quality control on every order.",
  },
  {
    category: "About Us",
    q: "I searched for 'best packaging company' — why does Solar Print Process appear?",
    a: "Solar Print Process has been manufacturing premium packaging since 1975 — over 4 decades of experience. We work with major FMCG brands, D2C companies, and exporters. Our 200,000 sq ft plant, 2-hour quote turnaround, and complete in-house production make us one of the best packaging companies in Delhi NCR.",
  },
  {
    category: "About Us",
    q: "Are you a packaging company near me — is there a packing shop or showroom I can visit?",
    a: "Yes! Our manufacturing facility and office is at C-10, Sector 85, Noida — easily accessible from Delhi, Greater Noida, and all of NCR. You are welcome to visit us in person to see samples, discuss your requirements, and get a walkthrough of our production facility. We are open Mon–Sat, 9:30 AM to 6:00 PM.",
  },
  {
    category: "About Us",
    q: "Are you near Sadar Bazar? I'm looking for packaging boxes in Sadar Bazar Delhi.",
    a: "Sadar Bazar in Delhi is a well-known wholesale market for packaging materials and boxes. While we are not located in Sadar Bazar, our factory in Sector 85 Noida is easily accessible from Delhi and offers a significant advantage: we are a direct manufacturer, not a trader. This means you get factory-fresh custom printed packaging at better prices than most Sadar Bazar resellers, with full customisation options.",
  },

  // ── Products ───────────────────────────────────────────────────────────────
  {
    category: "Products",
    q: "What types of packaging boxes do you manufacture?",
    a: "We manufacture a wide range including: Mono Cartons, Rigid Boxes, Custom Printed Boxes, Corrugated / Carton Boxes, Kappa Boxes, Food Packaging Boxes, FMCG Packaging, Cosmetic & Beauty Boxes, Ecommerce / Mailer Boxes, Gift Boxes, Soap Packaging Boxes, and Paper Packaging Boxes. Have a custom requirement? We build from scratch.",
  },
  {
    category: "Products",
    q: "Do you manufacture rigid boxes and custom rigid packaging?",
    a: "Yes — rigid box manufacturing is one of our core specialities. We produce premium custom rigid boxes for luxury brands, cosmetics, electronics, jewellery, and gifting. Fully customisable: size, material, finish (matte, gloss, soft-touch), and print. We are among the leading rigid box manufacturers in Delhi NCR.",
  },
  {
    category: "Products",
    q: "Do you make kappa boxes? What are kappa boxes used for?",
    a: "Yes — we manufacture kappa boxes (grey board / binder's board boxes). Kappa boxes are rigid, sturdy boxes made from thick grey board covered with paper or fabric. Widely used for premium gifting, luxury products, cosmetics, and jewellery. We are one of the few kappa box manufacturers in Delhi with full in-house production.",
  },
  {
    category: "Products",
    q: "Do you make food packaging boxes and FMCG packaging?",
    a: "Yes. We manufacture food-grade packaging boxes that comply with safety standards — ideal for bakery, confectionery, snacks, spices, health supplements, and restaurant brands. We also supply high-volume FMCG packaging (cartons, mono cartons, printed boxes) to major FMCG manufacturers in Delhi NCR.",
  },
  {
    category: "Products",
    q: "Do you make soap packaging boxes wholesale?",
    a: "Yes — we supply soap packaging boxes in wholesale quantities. Options include kraft soap boxes, windowed soap packaging, and custom printed soap boxes with foil and embossing. MOQ for custom printed variants typically starts from 1,000 pieces.",
  },
  {
    category: "Products",
    q: "Do you manufacture packaging bags or PP bags?",
    a: "Our primary speciality is paper-based rigid and printed packaging — carton boxes, rigid boxes, corrugated boxes, and mono cartons. We do not manufacture PP woven bags, poly bags, or flexible film packaging. If you specifically need packaging bags, we can guide you to the right type of supplier. However, if you need branded printed boxes alongside your bags, we are the right partner.",
  },
  {
    category: "Products",
    q: "What packing materials do you supply?",
    a: "We supply finished printed and unprinted packaging boxes — cartons, rigid boxes, corrugated boxes, and specialty packaging. We do not supply raw packing materials like stretch film, bubble wrap, or tape. Our focus is on complete, branded, ready-to-use packaging boxes for your products.",
  },
  {
    category: "Products",
    q: "Do you supply pet bottles or plastic packaging?",
    a: "No — we specialise in paper-based packaging: carton boxes, rigid boxes, corrugated boxes, and printed packaging. We do not manufacture PET bottles or plastic containers. If you're looking for a packaging company in Noida for paper and board packaging, we're a great fit.",
  },

  // ── Custom & Branding ──────────────────────────────────────────────────────
  {
    category: "Custom & Branding",
    q: "Can you make custom packaging for my brand from scratch?",
    a: "Yes — we are a full-service custom box maker and brand packaging company. From structural dieline design to printing, finishing, and delivery — we handle everything. Whether you're a startup or an established brand, we work with you from concept to final box.",
  },
  {
    category: "Custom & Branding",
    q: "What is brand packaging and do you offer it?",
    a: "Brand packaging is custom-designed packaging that reflects your brand identity — logo, colour palette, typography, and story. We help brands across FMCG, beauty, food, gifting, and ecommerce create packaging that stands out on shelf and delivers a premium unboxing experience.",
  },
  {
    category: "Custom & Branding",
    q: "Do you offer customized box printing for small brands and startups?",
    a: "Yes — we work with brands of all sizes. For startups we offer low MOQ options, digital printing for shorter runs, and free design consultation. Great packaging shouldn't be out of reach for new brands.",
  },
  {
    category: "Custom & Branding",
    q: "What printing and finishing options do you offer?",
    a: "We support CMYK + Pantone printing via Offset and Digital printing. Finishing options include: Matte/Gloss/Soft-Touch Lamination, UV Coating, Aqueous Coating, Foil Stamping (gold, silver, holographic), Embossing, Debossing, and Spot UV. We can match almost any premium finish requirement.",
  },

  // ── Orders & Pricing ───────────────────────────────────────────────────────
  {
    category: "Orders & Pricing",
    q: "What is the minimum order quantity (MOQ)?",
    a: "MOQ depends on product type. Typically: Mono Cartons — 1,000 pcs, Rigid / Kappa Boxes — 500 pcs, Corrugated Boxes — 500 pcs, Custom Printed Boxes — 500–1,000 pcs. Smaller digital print runs are sometimes possible. Contact us with your requirement and we'll advise.",
  },
  {
    category: "Orders & Pricing",
    q: "How do I get a price quote?",
    a: "Fill the 'Get Free Quote' form on this page or WhatsApp us at +91 99117 67272. Share your box type, size, quantity, and design idea. We respond within 2 hours on working days (Mon–Sat, 9am–6:30pm).",
  },
  {
    category: "Orders & Pricing",
    q: "Do you offer wholesale pricing for bulk packaging orders?",
    a: "Yes — the more you order, the lower the per-unit cost. We work with distributors, brand owners, contract manufacturers, and large retailers who need reliable bulk packaging supply at scale.",
  },
  {
    category: "Orders & Pricing",
    q: "How long does production take?",
    a: "Standard lead time is 10–15 working days after artwork approval and order confirmation. For urgent requirements we offer expedited production (subject to capacity). Share your deadline and we'll do our best to accommodate.",
  },

  // ── Delivery & Location ────────────────────────────────────────────────────
  {
    category: "Delivery & Location",
    q: "Do you deliver packaging boxes near me in Delhi / Greater Noida / NCR?",
    a: "Yes — we deliver across Delhi NCR: Delhi, Noida, Greater Noida, Gurgaon, Faridabad, and Ghaziabad. We also ship pan-India. Our Noida plant keeps freight costs low for NCR businesses.",
  },
  {
    category: "Delivery & Location",
    q: "Are you a packaging industry or packaging box company near me?",
    a: "If you're in Delhi NCR, yes! Our manufacturing facility at Sector 85, Noida is one of the largest packaging plants in the region — 200,000 sq ft. We are easily accessible from all parts of Delhi, Noida, and Greater Noida. You're welcome to visit.",
  },
  {
    category: "Delivery & Location",
    q: "I'm looking for a packing material factory or packing shop near me — are you nearby?",
    a: "If you're in Delhi NCR, our factory in Sector 85, Noida is right nearby. Unlike retail packing shops that stock standard sizes, we manufacture fully custom printed packaging to your exact specifications — same factory pricing, no middlemen.",
  },
  {
    category: "Delivery & Location",
    q: "Do you supply packaging to manufacturers across India?",
    a: "Yes — we regularly ship to Mumbai, Bengaluru, Chennai, Hyderabad, Pune, Ahmedabad, and more. For pan-India shipping, lead times and freight costs vary by location — contact us for details.",
  },

]

const categories = Array.from(new Set(faqs.map((f) => f.category)))

export function FAQ() {
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
            Our team responds within 2 hours — Mon to Sat, 9 AM to 6:30 PM.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919911767272?text=Hi%2C+I+have+a+question+about+your+packaging."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-black uppercase tracking-wide text-sm text-black transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
              style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
            >
              <FaWhatsapp className="w-4 h-4" />
              WhatsApp Us
            </a>
            <a
              href="tel:+919911767272"
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