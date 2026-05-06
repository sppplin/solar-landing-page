"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import {
  Phone,
  BadgeCheck,
  ShieldCheck,
  Star,
  ChevronLeft,
  ChevronRight,
  Factory,
  Quote,
  X,
} from "lucide-react"
import { QuoteForm } from "./quote-form"
import { CallBackRequestForm } from "./CallBackRequestForm"
import { MdPhoneCallback } from "react-icons/md"

interface ProductCardProps {
  images: string[]
  title: string
  rating: string
  reviews: string
  specs: { label: string; value: string }[]
  onQuoteClick?: () => void
  onCallbackClick?: () => void
}

const products: ProductCardProps[] = [
  {
    images: [
      "/products/cosmetics-packaging/mamaearth-gift-of-goodness-magnetic-rigid-box.jpg",
    ],
    title: "Luxury Magnetic Cosmetics Gift Box",
    rating: "4.9",
    reviews: "84",
    specs: [
      { label: "Box Material", value: "Rigid Board + Premium Art Paper" },
      { label: "Box Style", value: "Magnetic Closure Rigid Box" },
      { label: "Use", value: "Skincare & Cosmetic Gift Packaging" },
      { label: "Surface Finishing", value: "Soft Touch Matte + UV Print" },
    ],
  },

  {
    images: [
      "/products/cosmetics-packaging/organic-kitchen-skincare-carton-packaging.webp",
      "/products/cosmetics-packaging/organic-kitchen-custom-product-boxes.webp",
      "/products/cosmetics-packaging/organic-kitchen-flat-carton-dieline-layout.webp",
    ],
    title: "Custom Printed Cosmetic Carton Boxes",
    rating: "4.8",
    reviews: "67",
    specs: [
      { label: "Box Material", value: "Duplex Board + Printed Sheet" },
      { label: "Box Style", value: "Straight Tuck End Carton Box" },
      { label: "Use", value: "Serum, Cream & Skincare Packaging" },
      { label: "Surface Finishing", value: "Matte Lamination + Foil Print" },
    ],
  },

  {
    images: [
      "/products/cosmetics-packaging/forest-essentials-luxury-gift-box-packaging.webp",
      "/products/cosmetics-packaging/forest-essentials-premium-cutout-rigid-box.webp",
    ],
    title: "Premium Luxury Ayurveda Packaging Box",
    rating: "4.9",
    reviews: "72",
    specs: [
      { label: "Box Material", value: "Rigid Board + EVA Insert" },
      { label: "Box Style", value: "Premium Presentation Gift Box" },
      { label: "Use", value: "Luxury Skincare & Wellness Products" },
      { label: "Surface Finishing", value: "Gold Foiling + Spot UV" },
    ],
  },

  {
    images: [
      "/products/cosmetics-packaging/biotique-luxury-magnetic-gift-box.webp",
      "/products/cosmetics-packaging/biotique-foldable-rigid-packaging-box.webp",
      "/products/cosmetics-packaging/biotique-premium-empty-rigid-box.webp",
    ],
    title: "Foldable Magnetic Cosmetics Packaging Box",
    rating: "4.8",
    reviews: "58",
    specs: [
      { label: "Box Material", value: "Rigid Board + Fabric Ribbon" },
      { label: "Box Style", value: "Foldable Magnetic Gift Box" },
      { label: "Use", value: "Beauty & Cosmetic Product Packaging" },
      { label: "Surface Finishing", value: "Matte Finish + Gold Foil" },
    ],
  },

  {
    images: [
      "/products/cosmetics-packaging/saante-selfcare-cosmetic-packaging-box.webp",
      "/products/cosmetics-packaging/saante-selfcare-skincare-carton-boxes.webp",
    ],
    title: "Luxury Skincare Product Packaging Boxes",
    rating: "4.7",
    reviews: "49",
    specs: [
      { label: "Box Material", value: "Premium Duplex Board" },
      { label: "Box Style", value: "Custom Cosmetic Folding Cartons" },
      { label: "Use", value: "Face Serum & Beauty Product Packaging" },
      { label: "Surface Finishing", value: "Rose Gold Foiling + Matte" },
    ],
  },

  {
    images: [
      "/products/cosmetics-packaging/black-luxury-perfume-packaging-box.webp",
      "/products/cosmetics-packaging/premium-black-rigid-box-insert-packaging.webp",
    ],
    title: "Premium Perfume & CBD Product Packaging",
    rating: "4.9",
    reviews: "91",
    specs: [
      { label: "Box Material", value: "Rigid Board + Foam Insert" },
      { label: "Box Style", value: "Luxury Drawer & Rigid Boxes" },
      { label: "Use", value: "Perfume, CBD & Cosmetic Packaging" },
      { label: "Surface Finishing", value: "Soft Touch Matte + Embossing" },
    ],
  },
]

function ProductCard({
  images,
  title,
  rating,
  reviews,
  specs,
  onQuoteClick,
  onCallbackClick,
}: ProductCardProps) {
  const [active, setActive] = useState(0)

  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActive((prev) => (prev + 1) % images.length)
  }

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActive((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={images[active]}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground">
          <Factory className="h-3 w-3" />
          Manufacturer
        </div>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-1 shadow"
        >
          <ChevronLeft className="h-4 w-4 text-black" />
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-1 shadow"
        >
          <ChevronRight className="h-4 w-4 text-black" />
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                active === i ? "bg-primary" : "bg-white/90"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="min-h-[10px] font-heading text-base font-semibold uppercase leading-tight tracking-tight text-foreground sm:text-lg">
          {title}
        </h3>

        <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">
          Factory Direct Price • Bulk Orders Available
        </p>

        {/* ✅ Get Quote button — opens QuoteForm modal */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onQuoteClick?.()
          }}
          className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:bg-accent"
        >
          <Quote className="h-4 w-4" />
          Get Quote
        </button>

        <div className="mt-4 rounded-xl border border-border bg-muted/40 p-3">
          <div className="space-y-1.5">
            {specs.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_auto] gap-2 text-[11px] sm:text-xs"
              >
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 font-medium">
            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
            GST
          </div>

          <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            Trusted
          </div>

          <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="font-semibold">{rating}</span>
            <span className="text-muted-foreground">({reviews})</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onCallbackClick?.()
          }}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary text-sm font-bold text-primary transition hover:border-black hover:bg-black hover:text-white"
        >
          <MdPhoneCallback className="h-4 w-4" />
          Call Back Request
        </button>
      </div>
    </div>
  )
}

// ✅ Standalone QuoteForm Modal
function QuoteFormModal({ onClose }: { onClose: () => void }) {
  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/10 p-1.5 transition hover:bg-black/20"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-foreground" />
        </button>

        {/* QuoteForm with dialog variant */}
        <QuoteForm variant="dialog" />
      </div>
    </div>
  )
}

// ✅ Standalone CallBackRequestForm Modal
function CallBackModal({ onClose }: { onClose: () => void }) {
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget) onClose()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", onKey)

    return () =>
      document.removeEventListener("keydown", onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/10 p-1.5"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-2">
          <CallBackRequestForm />
        </div>
      </div>
    </div>
  )
}

export function CosmeticsPackagingProducts() {
  const [open, setOpen] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)

  // ✅ Quote modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  // Callback modal state
  const [showCallBackModal, setShowCallBackModal] = useState(false)

  const openPreview = (index: number) => {
    setCardIndex(index)
    setImageIndex(0)
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return

    const timer = setInterval(() => {
      const current = products[cardIndex]

      if (imageIndex < current.images.length - 1) {
        setImageIndex((prev) => prev + 1)
      } else {
        setCardIndex((prev) => (prev + 1) % products.length)
        setImageIndex(0)
      }
    }, 2200)

    return () => clearInterval(timer)
  }, [open, cardIndex, imageIndex])

  const next = () => {
    const current = products[cardIndex]

    if (imageIndex < current.images.length - 1) {
      setImageIndex((prev) => prev + 1)
    } else {
      setCardIndex((prev) => (prev + 1) % products.length)
      setImageIndex(0)
    }
  }

  const prev = () => {
    if (imageIndex > 0) {
      setImageIndex((prev) => prev - 1)
    } else {
      const prevCard = cardIndex === 0 ? products.length - 1 : cardIndex - 1
      setCardIndex(prevCard)
      setImageIndex(products[prevCard].images.length - 1)
    }
  }

  return (
    <>
      <section className="bg-muted py-10 sm:py-16">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6">
          <div className="mb-6 sm:mb-10">
            <h2 className="font-heading text-2xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
              Our <span className="text-primary">Cosmetics Packaging</span> Products
            </h2>

            <p className="mt-2 max-w-[580px] text-sm text-muted-foreground sm:text-base">
              Everything manufactured at our Noida plant. No middlemen. Direct
              factory pricing on all Cosmetics Packaging orders with premium finishing and
              custom sizes.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {products.map((item, index) => (
              <div
                key={index}
                onClick={() => openPreview(index)}
                className="cursor-pointer"
              >
                {/* ✅ Pass onQuoteClick to each card */}
                <ProductCard
                  {...item}
                  onQuoteClick={() => setShowQuoteModal(true)}
                  onCallbackClick={() => setShowCallBackModal(true)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black">
          {/* CLOSE */}
          <button
            onClick={() => setOpen(false)}
            className="absolute left-3 top-3 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition hover:bg-black/70"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* TOP PROGRESS */}
          <div className="absolute left-0 top-0 z-40 flex w-full gap-1 px-14 pt-4">
            {products[cardIndex].images.map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 overflow-hidden rounded-full bg-white/20"
              >
                <div
                  className={`h-full rounded-full bg-white transition-all duration-300 ${
                    i <= imageIndex ? "w-full" : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* MOBILE FIRST LAYOUT */}
          <div className="flex h-full flex-col lg:flex-row">
            {/* LEFT IMAGE SECTION */}
            <div className="relative flex-1 bg-black">
              <div className="relative h-[56vh] w-full sm:h-[62vh] lg:h-full">
                <Image
                  src={products[cardIndex].images[imageIndex]}
                  alt={products[cardIndex].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <button
                onClick={prev}
                className="absolute left-3 top-1/2 z-40 -translate-y-1/2 rounded-full bg-white p-2 shadow-xl transition hover:scale-105"
              >
                <ChevronLeft className="h-5 w-5 text-black" />
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 z-40 -translate-y-1/2 rounded-full bg-white p-2 shadow-xl transition hover:scale-105"
              >
                <ChevronRight className="h-5 w-5 text-black" />
              </button>
            </div>

            {/* RIGHT DETAILS PANEL */}
            <div className="h-[44vh] overflow-y-auto rounded-t-3xl bg-white px-4 pb-28 pt-5 sm:px-5 lg:h-full lg:w-[390px] lg:rounded-none lg:px-6 lg:pb-6">
              {/* MOBILE HANDLE */}
              <div className="mx-auto h-1.5 w-14 rounded-full bg-zinc-200 lg:hidden" />

              <h3 className="mt-4 text-xl font-black leading-tight text-foreground lg:text-2xl">
                {products[cardIndex].title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Factory Direct Pricing
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <div className="rounded-full bg-muted px-3 py-1">GST Verified</div>
                <div className="rounded-full bg-muted px-3 py-1">Trusted Manufacturer</div>
                <div className="rounded-full bg-muted px-3 py-1">
                  ⭐ {products[cardIndex].rating} ({products[cardIndex].reviews})
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4">
                <div className="space-y-3">
                  {products[cardIndex].specs.map((item, i) => (
                    <div key={i} className="grid grid-cols-[1fr_auto] gap-3 text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="text-right font-semibold text-foreground">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-xs leading-5 text-muted-foreground">
                Bulk custom orders accepted. Fast production turnaround. Pan India
                delivery available.
              </p>
            </div>
          </div>

          {/* MOBILE CTA */}
          <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-3 lg:hidden">
            <div className="grid grid-cols-2 gap-3">
              {/* Quote Button */}
              <button
                onClick={() => setShowQuoteModal(true)}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-3 text-sm font-bold text-black transition hover:bg-accent hover:text-white"
              >
                <Quote className="h-4 w-4 shrink-0" />
                <span className="leading-none">
                  Get Instant Quote
                </span>
              </button>

            {/* Callback Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowCallBackModal(true)
                }}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-3 text-sm font-bold text-black transition hover:bg-black hover:text-white"
              >
                <MdPhoneCallback className="h-4 w-4 shrink-0" />

                <span className="leading-none">
                  Call Back Request
                </span>
              </button>
            </div>
          </div>

          {/* DESKTOP CTA */}
          <div className="absolute bottom-6 right-6 hidden w-[342px] lg:block">
            {/* ✅ Opens QuoteForm modal */}
            <button
              onClick={() => setShowQuoteModal(true)}
              className="h-12 w-full rounded-xl bg-primary text-sm font-bold text-black transition hover:bg-accent hover:text-white"
            >
              Get Instant Quote
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowCallBackModal(true)
              }}
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary text-sm font-bold text-primary transition hover:border-black hover:bg-black hover:text-white"
            >
              <MdPhoneCallback className="h-4 w-4" />
              Call Back Request
            </button>
          </div>
        </div>
      )}

      {/* ✅ QuoteForm Modal — renders on top of everything including preview */}
      {showQuoteModal && (
        <QuoteFormModal onClose={() => setShowQuoteModal(false)} />
      )}
      {/* CallBackRequestForm Modal */}
      {showCallBackModal && (
        <CallBackModal onClose={() => setShowCallBackModal(false)} />
      )}
    </>
  )
}