import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { MonoCartonHero} from "@/components/mono-carton-hero"
import { TrustBar } from "@/components/trust-bar"
import { MonoCartonProducts } from "@/components/mono-carton-products"
import { Industries } from "@/components/industries"
import { WhyChoose } from "@/components/why-choose"
import { Clients } from "@/components/clients"
import { Portfolio } from "@/components/portfolio"
import { PerfumeBoxFAQ } from "@/components/perfume-box-faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function MonoCartonManufacturerPage() {
  return (
    <main>
      <TopBar />
      <Navigation />
      <MonoCartonHero />
      <TrustBar />
      <MonoCartonProducts />
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