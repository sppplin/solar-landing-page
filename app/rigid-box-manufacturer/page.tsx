import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { RigidBoxProducts } from "@/components/rigid-box-products"
import { Industries } from "@/components/industries"
import { WhyChoose } from "@/components/why-choose"
import { Clients } from "@/components/clients"
import { Portfolio } from "@/components/portfolio"
import { FAQ } from "@/components/faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function RigidBoxManufacturerPage() {
  return (
    <main>
      <TopBar />
      <Navigation />
      <Hero />
      <TrustBar />
      <RigidBoxProducts />
      <Industries />
      <WhyChoose />
      <Portfolio />
      <Clients />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  )
}