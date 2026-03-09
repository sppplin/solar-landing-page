"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const clients = [
  {
    name: "Grants",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grants_logo-UDyNB8IJz47iUJP85BrvpArhgrGpVU.png",
  },
  {
    name: "Belvedere Vodka",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/belvedere_vodka_logo-QOCtNoDqj4mvs3PdPEICUpHMrE5dma.png",
  },
  {
    name: "Jio",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jio_logo-duy96C2Oejr4EijTBAAcOef5XJuMRt.png",
  },
  {
    name: "Havells",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/havells_logo-TUAwMHoPLhiz6So6iY64oDczntNWod.png",
  },
  {
    name: "Glenfiddich",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glenfiddich_logo-zElLT1HnXupZJISttewtWurw9Ko4on.png",
  },
  {
    name: "Jack Daniels",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jackdaniels_logo-PcW4NIXDlzE7pJaRnSvQ8Cx2VEG0Kl.png",
  },
  {
    name: "Kilchoman",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kilchoman_logo-GU08dC1xdmzSZMCoesUtTrtW08qp3R.png",
  },
  {
    name: "Skyy Vodka",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/skyy_vodka_logo-BNjUdpZnH435ieSy5LS90TXjuTyjQI.png",
  },
  {
    name: "V-Guard",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/v-guard_logo-BOH97m3vxx750FahAaSpvUiy6nAiOP.png",
  },
  {
    name: "Tuborg",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tuborg_logo-uE6CT4Yui2icZXa9WKbxCwfSqml5hI.png",
  },
  {
    name: "Bulldog Gin",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bulldog_london_dry_gin_logo-68HQInAvvDpHXCELXof8iRtCcf99xI.png",
  },
  {
    name: "Ballantine's",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ballatines_logo-DXW8zDM20eVHwwk4GMgI5u8HQgoIFH.png",
  },
]

export function Clients() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(clients.length).fill(false))

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = clients.findIndex((client) => client.name === entry.target.getAttribute("data-name"))
          if (index !== -1) {
            setVisibleItems((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        }
      })
    })

    const items = sectionRef.current?.querySelectorAll("[data-name]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-background py-10 sm:py-16">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6">
        <h2 className="fade-in mb-2 font-heading text-2xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
          Trusted By <span className="text-primary">500+</span> Brands
        </h2>
        <p className="fade-in mb-8 max-w-[580px] text-sm text-muted-foreground sm:mb-12 sm:text-base">
          From Fortune 500 companies to emerging brands, leading businesses trust us for premium packaging solutions.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {clients.map((client, index) => (
            <div
              key={client.name}
              data-name={client.name}
              className={`fade-in group relative flex items-center justify-center rounded-lg border border-border bg-white/50 p-4 transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-[0_8px_24px_rgba(246,185,19,0.1)] sm:p-6 ${
                visibleItems[index] ? "visible" : ""
              }`}
            >
              <div className="relative h-12 w-full sm:h-14">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
