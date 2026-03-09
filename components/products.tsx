"use client"

import { useEffect, useRef } from "react"
import { Package, Gift, Sparkles, UtensilsCrossed, ShoppingBag, Printer, type LucideIcon } from "lucide-react"

interface Product {
  icon: LucideIcon
  title: string
  description: string
  tags: string[]
}

const products: Product[] = [
  {
    icon: Package,
    title: "Mono Cartons",
    description:
      "Offset-printed folding cartons for FMCG, pharma, food and personal care. Matte, gloss, UV and foil finishes available.",
    tags: ["FMCG", "Pharma", "Food", "Bulk Orders"],
  },
  {
    icon: Gift,
    title: "Rigid Boxes",
    description:
      "Premium setup boxes for luxury brands, jewellery, electronics and gifting. Hi-gloss, matte, magnetic closure options.",
    tags: ["Luxury", "Beauty", "Electronics", "Gifting"],
  },
  {
    icon: Sparkles,
    title: "Cosmetic Packaging",
    description:
      "Custom beauty and skincare boxes with embossing, hot foil stamping and premium laminates. Trusted by top brands.",
    tags: ["Skincare", "Perfume", "D2C Beauty"],
  },
  {
    icon: UtensilsCrossed,
    title: "Food Packaging",
    description: "Food-safe printed cartons and boxes for bakery, confectionery, snacks and packaged food. Eco options available.",
    tags: ["Bakery", "FMCG", "Food Safe", "Eco"],
  },
  {
    icon: ShoppingBag,
    title: "Ecommerce Packaging",
    description: "Branded shipping boxes and mailer packs for D2C brands and online sellers. Startup-friendly MOQ available.",
    tags: ["D2C", "Startups", "Online Sellers"],
  },
  {
    icon: Printer,
    title: "Commercial Printing",
    description:
      "Brochures, catalogues, business kits and retail display systems. Full in-house design, print and finishing.",
    tags: ["Brochures", "Catalogues", "Display Units"],
  },
]

export function Products() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.08 }
    )

    const elements = sectionRef.current?.querySelectorAll(".fade-in")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-muted py-10 sm:py-16">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <h2 className="fade-in mb-2 font-heading text-2xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
          Our <span className="text-primary">Packaging</span> Products
        </h2>
        <p className="fade-in mb-6 max-w-[580px] text-sm text-muted-foreground sm:mb-11 sm:text-base">
          Everything manufactured at our Noida plant. No middlemen. Direct factory pricing on all orders.
        </p>

        <div className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.title}
              className="fade-in group relative overflow-hidden rounded-lg border-[1.5px] border-border bg-white p-4 transition-all duration-200 before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-primary before:transition-transform before:duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_40px_rgba(0,0,0,0.09)] hover:before:scale-x-100 sm:rounded-xl sm:p-6"
            >
              <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 sm:mb-3.5 sm:h-12 sm:w-12">
                <product.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
              </div>
              <h3 className="mb-1.5 font-heading text-lg font-extrabold uppercase text-foreground sm:mb-2 sm:text-xl">{product.title}</h3>
              <p className="mb-2.5 text-xs leading-relaxed text-muted-foreground sm:mb-3 sm:text-[13.5px]">{product.description}</p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f4f4f8] px-2 py-0.5 text-[10px] font-medium text-foreground/70 sm:px-2.5 sm:text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
