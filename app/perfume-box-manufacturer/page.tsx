import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { PerfumeBoxHero} from "@/components/perfume-box-hero"
import { TrustBar } from "@/components/trust-bar"
import { PerfumeBoxProducts } from "@/components/perfume-box-products"
import { Industries } from "@/components/industries"
import { WhyChoose } from "@/components/why-choose"
import { Clients } from "@/components/clients"
import { Portfolio } from "@/components/portfolio"
import { PerfumeBoxFAQ } from "@/components/perfume-box-faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function PerfumeBoxManufacturerPage() {
  return (
    <main>
      <TopBar />
      <Navigation />
      <PerfumeBoxHero />
      <TrustBar />
      <PerfumeBoxProducts />
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