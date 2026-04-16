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

interface ProductCardProps {
  images: string[]
  title: string
  price: string
  unit?: string
  rating: string
  reviews: string
  specs: { label: string; value: string }[]
}

const products: ProductCardProps[] = [
  {
    images: [
      "/products/mono-cartons.webp",
      "/products/rigid-boxes.webp",
      "/products/cosmetic-packaging.webp",
    ],
    title: "Luxury Baby Shower Box",
    price: "120",
    unit: "Piece",
    rating: "4.4",
    reviews: "21",
    specs: [
      { label: "Box Material", value: "Kappa Board + Art Paper" },
      { label: "Box Style", value: "Magnetic Closure" },
      { label: "Size (LxWxH)", value: "10 x 8 x 4 Inch" },
      { label: "Surface Finishing", value: "Matte Lamination" },
      { label: "MOQ", value: "500 Pieces" },
    ],
  },
  {
    images: [
      "/products/rigid-boxes.webp",
      "/products/mono-cartons.webp",
      "/products/cosmetic-packaging.webp",
    ],
    title: "Multicolor Kappa Board Rigid Box",
    price: "45",
    unit: "Piece",
    rating: "4.7",
    reviews: "57",
    specs: [
      { label: "Box Material", value: "Duplex + Kappa Board" },
      { label: "Box Style", value: "Drawer Box" },
      { label: "Size (LxWxH)", value: "8 x 6 x 3 Inch" },
      { label: "Surface Finishing", value: "Gloss UV" },
      { label: "MOQ", value: "1000 Pieces" },
    ],
  },
  {
    images: [
      "/products/cosmetic-packaging.webp",
      "/products/mono-cartons.webp",
      "/products/rigid-boxes.webp",
    ],
    title: "Magnetic Flap Rigid Box",
    price: "100",
    unit: "Piece",
    rating: "4.5",
    reviews: "39",
    specs: [
      { label: "Box Material", value: "Grey Board + Art Card" },
      { label: "Box Style", value: "Flip Top Magnetic" },
      { label: "Size (LxWxH)", value: "12 x 9 x 4 Inch" },
      { label: "Surface Finishing", value: "Soft Touch Matte" },
      { label: "MOQ", value: "300 Pieces" },
    ],
  },
  {
    images: [
      "/products/food-packaging.webp",
      "/products/ecommerce-packaging.webp",
      "/products/mono-cartons.webp",
    ],
    title: "Luxury Drawer Box",
    price: "80",
    unit: "Piece",
    rating: "4.6",
    reviews: "28",
    specs: [
      { label: "Box Material", value: "Rigid Board + Kraft" },
      { label: "Box Style", value: "Drawer Slide Box" },
      { label: "Size (LxWxH)", value: "9 x 7 x 3 Inch" },
      { label: "Surface Finishing", value: "Gloss Lamination" },
      { label: "MOQ", value: "400 Pieces" },
    ],
  },
  {
    images: [
      "/products/ecommerce-packaging.webp",
      "/products/food-packaging.webp",
      "/products/cosmetic-packaging.webp",
    ],
    title: "Jewellery Gift Box",
    price: "60",
    unit: "Piece",
    rating: "4.8",
    reviews: "64",
    specs: [
      { label: "Box Material", value: "Grey Board + Velvet" },
      { label: "Box Style", value: "Two Piece Box" },
      { label: "Size (LxWxH)", value: "6 x 6 x 2 Inch" },
      { label: "Surface Finishing", value: "Soft Matte" },
      { label: "MOQ", value: "250 Pieces" },
    ],
  },
  {
    images: [
      "/products/commercial-printing.webp",
      "/products/rigid-boxes.webp",
      "/products/food-packaging.webp",
    ],
    title: "Corporate Gift Box",
    price: "95",
    unit: "Piece",
    rating: "4.9",
    reviews: "83",
    specs: [
      { label: "Box Material", value: "Kappa Board + Art Card" },
      { label: "Box Style", value: "Magnetic Gift Box" },
      { label: "Size (LxWxH)", value: "11 x 8 x 4 Inch" },
      { label: "Surface Finishing", value: "Foil + UV Finish" },
      { label: "MOQ", value: "500 Pieces" },
    ],
  },
]

function ProductCard({
  images,
  title,
  price,
  unit,
  rating,
  reviews,
  specs,
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

        <div className="mt-2 flex items-end gap-1">
          <span className="text-xl font-black text-primary sm:text-2xl">
            ₹{price}
          </span>
          <span className="pb-0.5 text-xs text-muted-foreground sm:text-sm">
            /{unit}
          </span>
        </div>

        <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">
          Factory Direct Price • Bulk Orders Available
        </p>

        <button
          onClick={(e) => e.stopPropagation()}
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
                <span className="text-muted-foreground">
                  {item.label}
                </span>
                <span className="font-semibold text-foreground">
                  {item.value}
                </span>
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
            <span className="text-muted-foreground">
              ({reviews})
            </span>
          </div>
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-primary text-sm font-bold text-primary transition hover:border-black hover:bg-black hover:text-white"
        >
          <Phone className="h-4 w-4" />
          Call Factory
        </button>
      </div>
    </div>
  )
}

export function RigidBoxProducts() {
  const [open, setOpen] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)

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
      const prevCard =
        cardIndex === 0 ? products.length - 1 : cardIndex - 1

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
              Our <span className="text-primary">Rigid Box</span> Products
            </h2>

            <p className="mt-2 max-w-[580px] text-sm text-muted-foreground sm:text-base">
              Everything manufactured at our Noida plant. No middlemen. Direct
              factory pricing on all rigid box orders with premium finishing and
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
                <ProductCard {...item} />
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

        {/* PREV */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 z-40 -translate-y-1/2 rounded-full bg-white p-2 shadow-xl transition hover:scale-105"
        >
          <ChevronLeft className="h-5 w-5 text-black" />
        </button>

        {/* NEXT */}
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

        {/* TITLE */}
        <h3 className="mt-4 text-xl font-black leading-tight text-foreground lg:text-2xl">
          {products[cardIndex].title}
        </h3>

        {/* PRICE */}
        <div className="mt-3 flex items-end gap-1">
          <span className="text-4xl font-black text-primary">
            ₹{products[cardIndex].price}
          </span>
          <span className="pb-1 text-sm text-muted-foreground">
            /{products[cardIndex].unit}
          </span>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Factory Direct Pricing
        </p>

        {/* BADGES */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <div className="rounded-full bg-muted px-3 py-1">
            GST Verified
          </div>

          <div className="rounded-full bg-muted px-3 py-1">
            Trusted Manufacturer
          </div>

          <div className="rounded-full bg-muted px-3 py-1">
            ⭐ {products[cardIndex].rating} (
            {products[cardIndex].reviews})
          </div>
        </div>

        {/* SPECS */}
        <div className="mt-5 rounded-2xl border border-border bg-muted/40 p-4">
          <div className="space-y-3">
            {products[cardIndex].specs.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_auto] gap-3 text-sm"
              >
                <span className="text-muted-foreground">
                  {item.label}
                </span>

                <span className="text-right font-semibold text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* NOTE */}
        <p className="mt-5 text-xs leading-5 text-muted-foreground">
          Bulk custom orders accepted. Fast production turnaround.
          Pan India delivery available.
        </p>
      </div>
    </div>

    {/* MOBILE CTA */}
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-3 lg:hidden">
      <div className="grid grid-cols-2 gap-3">
        <button className="h-12 rounded-xl bg-primary text-sm font-bold text-black transition hover:bg-accent hover:text-white">
          Get Instant Quote
        </button>

        <a
          href="tel:+919871713676"
          className="flex h-12 items-center justify-center rounded-xl border border-primary text-sm font-bold text-primary transition hover:bg-black hover:text-white hover:border-black"
        >
          <Phone className="mr-2 h-4 w-4" />
          Call Factory
        </a>
      </div>
    </div>

    {/* DESKTOP CTA */}
    <div className="absolute bottom-6 right-6 hidden w-[342px] lg:block">
      <button className="h-12 w-full rounded-xl bg-primary text-sm font-bold text-black transition hover:bg-accent hover:text-white">
        Get Instant Quote
      </button>

      <a
        href="tel:+919871713676"
        className="mt-3 flex h-12 w-full items-center justify-center rounded-xl border border-primary text-sm font-bold text-primary transition hover:bg-black hover:text-white hover:border-black"
      >
        <Phone className="mr-2 h-4 w-4" />
        Call Factory
      </a>
    </div>
  </div>
)}
    </>
  )
}