import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { CarryBagHero} from "@/components/carry-bag-hero"
import { TrustBar } from "@/components/trust-bar"
import { CarryBagProducts } from "@/components/carry-bag-products"
import { Industries } from "@/components/industries"
import { WhyChoose } from "@/components/why-choose"
import { Clients } from "@/components/clients"
import { Portfolio } from "@/components/portfolio"
import { PerfumeBoxFAQ } from "@/components/perfume-box-faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function CarryBagManufacturerPage() {
  return (
    <main>
      <TopBar />
      <Navigation />
      <CarryBagHero />
      <TrustBar />
      <CarryBagProducts />
      <Industries />
      <WhyChoose />
      <Portfolio />
      <Clients />
      <PerfumeBoxFAQ />
      <CallToAction />
      <Footer />
    </main>
  )
}