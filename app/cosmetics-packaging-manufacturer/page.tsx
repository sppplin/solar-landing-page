import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { CosmeticsPackagingHero} from "@/components/cosmetics-packaging-hero"
import { TrustBar } from "@/components/trust-bar"
import { CosmeticsPackagingProducts } from "@/components/cosmetics-packaging-products"
import { Industries } from "@/components/industries"
import { WhyChoose } from "@/components/why-choose"
import { Clients } from "@/components/clients"
import { Portfolio } from "@/components/portfolio"
import { PerfumeBoxFAQ } from "@/components/perfume-box-faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function CosmeticsPackagingManufacturerPage() {
  return (
    <main>
      <TopBar />
      <Navigation />
      <CosmeticsPackagingHero />
      <TrustBar />
      <CosmeticsPackagingProducts />
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