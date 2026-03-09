"use client"

import { useEffect, useRef } from "react"

const reasons = [
  {
    number: "01",
    title: "Direct Manufacturer - Zero Middlemen",
    description:
      "You deal directly with the factory. No broker, no reseller. This means 20-35% lower cost and full accountability on every order.",
  },
  {
    number: "02",
    title: "50 Years of Proven Production",
    description:
      "Since 1975. We have delivered packaging for Fortune 500 companies. Quality processes tested and refined over decades.",
  },
  {
    number: "03",
    title: "200,000 Sq Ft - Everything In-House",
    description:
      "Design, Print, Cut, Finish, QC, Dispatch - all under one roof. No outsourcing. No delays. No surprises.",
  },
  {
    number: "04",
    title: "Quote in 2 Hours. Sample in 3 Days.",
    description:
      "WhatsApp or call with your requirement. Detailed quote in 2 hours. Physical sample dispatched within 3 working days.",
  },
]

export function WhyChoose() {
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
    <section ref={sectionRef} className="py-10 sm:py-16">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <h2 className="fade-in mb-2 font-heading text-2xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
          Why Brands <span className="text-primary">Choose</span> Solar
        </h2>
        <p className="fade-in mb-6 max-w-[580px] text-sm text-muted-foreground sm:mb-11 sm:text-base">
          What 50 years of manufacturing gives you that no startup agency ever can.
        </p>

        <div className="grid gap-3 sm:gap-5 md:grid-cols-2">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="fade-in flex gap-3 rounded-lg border-[1.5px] border-border bg-white p-4 transition-colors hover:border-primary sm:gap-5 sm:rounded-xl sm:p-6"
            >
              <div className="w-10 shrink-0 font-heading text-4xl font-black leading-none text-primary/10 sm:w-12 sm:text-5xl">
                {reason.number}
              </div>
              <div>
                <h3 className="mb-1 font-heading text-base font-extrabold uppercase text-foreground sm:mb-2 sm:text-lg">{reason.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-[13.5px]">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
