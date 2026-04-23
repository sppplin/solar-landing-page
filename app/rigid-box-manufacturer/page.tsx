import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { RigidBoxHero} from "@/components/rigid-box-hero"
import { TrustBar } from "@/components/trust-bar"
import { RigidBoxProducts } from "@/components/rigid-box-products"
import { Industries } from "@/components/industries"
import { WhyChoose } from "@/components/why-choose"
import { Clients } from "@/components/clients"
import { Portfolio } from "@/components/portfolio"
import { RigidBoxFAQ } from "@/components/rigid-box-faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function RigidBoxManufacturerPage() {
  return (
    <main>
      <TopBar />
      <Navigation />
      <RigidBoxHero />
      <TrustBar />
      <RigidBoxProducts />
      <Industries />
      <WhyChoose />
      <Portfolio />
      <Clients />
      <RigidBoxFAQ />
      <CallToAction />
      <Footer />
    </main>
  )
}