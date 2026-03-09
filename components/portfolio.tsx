"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { GiLipstick, GiWineBottle, GiCoffeeCup } from "react-icons/gi"
import { HiOutlineBookOpen } from "react-icons/hi"
import { MdOutlineStorefront } from "react-icons/md"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { QuoteForm } from "./quote-form"

interface PortfolioCategory {
  id: string
  name: string
  count: number
  icon: any
  images: string[]
}

const portfolioData: PortfolioCategory[] = [
  {
    id: "beauty",
    name: "Beauty & Skincare",
    icon: GiLipstick,
    count: 6,
    images: [
      "/portfolio/beauty-skincare/01-skincare-box.webp",
      "/portfolio/beauty-skincare/02-cream-jar.webp",
      "/portfolio/beauty-skincare/03-cosmetics-set.webp",
      "/portfolio/beauty-skincare/04-serums.webp",
      "/portfolio/beauty-skincare/05-facemask.webp",
      "/portfolio/beauty-skincare/06-bodycare.webp",
    ],
  },
  {
    id: "liquor",
    name: "Distilleries & Liquor",
    icon: GiWineBottle,
    count: 6,
    images: [
      "/portfolio/distilleries-liquor/01-whiskey-box.webp",
      "/portfolio/distilleries-liquor/02-vodka-premium.webp",
      "/portfolio/distilleries-liquor/03-gin-botanical.webp",
      "/portfolio/distilleries-liquor/04-rum-collection.webp",
      "/portfolio/distilleries-liquor/05-brandy-premium.webp",
      "/portfolio/distilleries-liquor/06-beer-boxes.webp",
    ],
  },
  {
    id: "food",
    name: "Food & Beverages",
    icon: GiCoffeeCup,
    count: 6,
    images: [
      "/portfolio/food-beverages/01-snacks-box.webp",
      "/portfolio/food-beverages/02-chocolate-packaging.webp",
      "/portfolio/food-beverages/03-spice-jars.webp",
      "/portfolio/food-beverages/04-coffee-bags.webp",
      "/portfolio/food-beverages/05-juice-bottles.webp",
      "/portfolio/food-beverages/06-bakery-boxes.webp",
    ],
  },
  {
    id: "publication",
    name: "Publication",
    icon: HiOutlineBookOpen,
    count: 6,
    images: [
      "/portfolio/publication/01-magazine-cover.webp",
      "/portfolio/publication/02-brochure.webp",
      "/portfolio/publication/03-annual-report.webp",
      "/portfolio/publication/04-catalog.webp",
      "/portfolio/publication/05-newsletter.webp",
      "/portfolio/publication/06-booklet.webp",
    ],
  },
  {
    id: "display",
    name: "Display Systems",
    icon: MdOutlineStorefront,
    count: 1,
    images: [
      "/portfolio/display-systems/01-retail-display.webp",
    ],
  },
]

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("beauty")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<{ category: string; index: number } | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleCardClick = (categoryName: string, index: number) => {
    setSelectedProject({ category: categoryName, index })
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
      { threshold: 0.1 }
    )

    const fadeElements = document.querySelectorAll(".fade-in")
    fadeElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [activeCategory])

  const currentCategory = portfolioData.find((cat) => cat.id === activeCategory)

  return (
    <section ref={sectionRef} className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        {/* Header */}
        <h2 className="fade-in mb-2 font-heading text-2xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
          Our <span className="text-primary">Portfolio</span>
        </h2>
        <p className="fade-in mb-8 max-w-[580px] text-sm text-muted-foreground sm:mb-10 sm:text-base">
          Showcase of our premium packaging solutions across diverse industries. From luxury beauty to fine spirits, food packaging to publications.
        </p>

        {/* Category Tabs */}
        <div className="mb-8 grid grid-cols-2 gap-2 sm:mb-10 sm:flex sm:flex-wrap sm:gap-3">
          {portfolioData.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex w-full items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-all sm:w-auto sm:px-5 sm:py-3 sm:text-sm ${activeCategory === category.id
                  ? "bg-primary text-foreground shadow-lg shadow-primary/30"
                  : "border-[1.5px] border-border bg-white text-foreground hover:border-primary hover:bg-primary/5 hover:shadow-md"
                  }`}
              >
                <IconComponent className="h-3.5 w-3.5 shrink-0 sm:h-5 sm:w-5" />
                <span className="truncate">{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* Portfolio Grid */}
        {currentCategory && (
          <div className="grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {currentCategory.images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleCardClick(currentCategory.name, index + 1)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="fade-in group relative cursor-pointer overflow-hidden rounded-lg border-[1.5px] border-border bg-muted text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_14px_40px_rgba(0,0,0,0.09)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`View ${currentCategory.name} project ${index + 1} and request a quote`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image}
                    alt={`${currentCategory.name} - Project ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                    <div className="text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <h3 className="font-heading text-sm font-bold uppercase">
                        {currentCategory.name}
                      </h3>
                      <p className="text-xs mt-1">Project {index + 1}</p>
                      <p className="text-[10px] mt-2 underline">Click for Quote</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Info Text */}
        <div className="mt-10 rounded-lg border-[1.5px] border-primary/20 bg-primary/5 p-4 sm:p-6">
          <p className="text-sm text-foreground sm:text-base">
            <span className="font-bold text-primary">Need custom packaging?</span> We deliver excellence across {portfolioData.length} major categories with 51+ years of manufacturing expertise. Contact us for a personalized quote.
          </p>
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
                Request Quote{selectedProject ? ` for ${selectedProject.category}` : ""}
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
