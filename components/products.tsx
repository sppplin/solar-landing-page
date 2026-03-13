"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { QuoteForm } from "./quote-form"

interface Product {
  title: string
  description: string
  tags: string[]
  image: string
}

const products: Product[] = [
  {
    title: "Mono Cartons",
    description:
      "Offset-printed folding cartons for FMCG, pharma, food and personal care. Matte, gloss, UV and foil finishes available.",
    tags: ["FMCG", "Pharma", "Food", "Bulk Orders"],
    image: "/products/mono-cartons.webp",
  },
  {
    title: "Rigid Boxes",
    description:
      "Premium setup boxes for luxury brands, jewellery, electronics and gifting. Hi-gloss, matte, magnetic closure options.",
    tags: ["Luxury", "Beauty", "Electronics", "Gifting"],
    image: "/products/rigid-boxes.webp",
  },
  {
    title: "Cosmetic Packaging",
    description:
      "Custom beauty and skincare boxes with embossing, hot foil stamping and premium laminates. Trusted by top brands.",
    tags: ["Skincare", "Perfume", "D2C Beauty"],
    image: "/products/cosmetic-packaging.webp",
  },
  {
    title: "Food Packaging",
    description:
      "Food-safe printed cartons and boxes for bakery, confectionery, snacks and packaged food. Eco options available.",
    tags: ["Bakery", "FMCG", "Food Safe", "Eco"],
    image: "/products/food-packaging.webp",
  },
  {
    title: "Ecommerce Packaging",
    description:
      "Branded shipping boxes and mailer packs for D2C brands and online sellers. Startup-friendly MOQ available.",
    tags: ["D2C", "Startups", "Online Sellers"],
    image: "/products/ecommerce-packaging.webp",
  },
  {
    title: "Commercial Printing",
    description:
      "Brochures, catalogues, business kits and retail display systems. Full in-house design, print and finishing.",
    tags: ["Brochures", "Catalogues", "Display Units"],
    image: "/products/commercial-printing.webp",
  },
]

export function Products() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleCardClick = (title: string) => {
    setSelectedProduct(title)
    setIsDialogOpen(true)
  }

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
            <button
              key={product.title}
              type="button"
              onClick={() => handleCardClick(product.title)}
              className="fade-in group relative cursor-pointer overflow-hidden rounded-lg border-[1.5px] border-border bg-white text-left transition-all duration-200 before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-primary before:transition-transform before:duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_40px_rgba(0,0,0,0.09)] hover:before:scale-x-100 sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Request quote for ${product.title}`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="mb-1.5 font-heading text-lg font-extrabold uppercase text-foreground sm:mb-2 sm:text-xl">
                  {product.title}
                </h3>
                <p className="mb-2.5 text-xs leading-relaxed text-muted-foreground sm:mb-3 sm:text-[13.5px]">
                  {product.description}
                </p>
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
            </button>
          ))}
        </div>
      </div>

      {/* Quote Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-h-[90vh] w-[95vw] max-w-md overflow-y-auto bg-white p-0 sm:max-w-lg"
          showCloseButton={true}
        >
          <div className="sr-only">
            <DialogHeader>
              <DialogTitle>
                Request Quote{selectedProduct ? ` for ${selectedProduct}` : ""}
              </DialogTitle>
              <DialogDescription>
                Fill out the form below to get a free quote for your packaging needs.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-0">
            <QuoteForm variant="dialog" />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}