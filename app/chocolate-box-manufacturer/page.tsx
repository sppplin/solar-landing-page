import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { ChocolateBoxHero} from "@/components/chocolate-box-hero"
import { TrustBar } from "@/components/trust-bar"
import { ChocolateBoxProducts } from "@/components/chocolate-box-products"
import { Industries } from "@/components/industries"
import { WhyChoose } from "@/components/why-choose"
import { Clients } from "@/components/clients"
import { Portfolio } from "@/components/portfolio"
import { PerfumeBoxFAQ } from "@/components/perfume-box-faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function ChocolateBoxManufacturerPage() {
  return (
    <main>
      <TopBar />
      <Navigation />
      <ChocolateBoxHero />
      <TrustBar />
      <ChocolateBoxProducts />
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