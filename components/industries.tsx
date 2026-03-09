"use client"

import { useEffect, useRef } from "react"
import { MdOutlineSchool, MdOutlineRealEstateAgent, MdOutlineCardGiftcard } from "react-icons/md"
import { GiLipstick, GiWineBottle, GiDiamondRing } from "react-icons/gi"
import { FiCoffee, FiMonitor } from "react-icons/fi"
import { BsCarFront, BsBank2, BsBuilding } from "react-icons/bs"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { SiAntennapod } from "react-icons/si"
import { RiMedicineBottleLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { PiCrown } from "react-icons/pi";

const industries = [
  { name: "FMCG", icon: AiOutlineShoppingCart },
  { name: "Pharma", icon: RiMedicineBottleLine },
  { name: "Beauty & Skincare", icon: GiLipstick },
  { name: "Food & Beverages", icon: FiCoffee },
  { name: "IT & Electronics", icon: FiMonitor },
  { name: "Automotive", icon: BsCarFront },
  { name: "Banking", icon: BsBank2 },
  { name: "Telecom", icon: SiAntennapod },
  { name: "Education", icon: MdOutlineSchool },
  { name: "Hospitality", icon: BsBuilding },
  { name: "Jewellery & Fashion", icon: GiDiamondRing },
  { name: "Spirits & Liquor", icon: GiWineBottle },
  { name: "Real Estate", icon: MdOutlineRealEstateAgent },
  { name: "Ecommerce", icon: HiOutlineShoppingBag },
  { name: "Luxury Products", icon: PiCrown },
  { name: "Gifting", icon: MdOutlineCardGiftcard },
]

export function Industries() {
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
    <section ref={sectionRef} className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <h2 className="fade-in mb-2 font-heading text-2xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
          Industries We <span className="text-primary">Serve</span>
        </h2>
        <p className="fade-in mb-6 max-w-[580px] text-sm text-muted-foreground sm:mb-11 sm:text-base">
          16 industries. 500+ B2B clients. Trusted packaging partner for India&apos;s biggest brands since 1975.
        </p>

        <div className="grid grid-cols-2 gap-2 sm:gap-3.5 md:grid-cols-4">
          {industries.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="fade-in group flex flex-col items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-3.5 text-center font-heading text-xs font-bold uppercase tracking-wide text-accent transition-all hover:border-primary hover:bg-primary/20 sm:gap-3 sm:px-5 sm:py-5 sm:text-sm md:text-base"
            >
              <Icon className="h-6 w-6 shrink-0 text-accent transition-transform group-hover:scale-110 sm:h-7 sm:w-7" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
