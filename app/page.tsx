import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { Products } from "@/components/products"
import { Industries } from "@/components/industries"
import { WhyChoose } from "@/components/why-choose"
import { Clients } from "@/components/clients"
import { Portfolio } from "@/components/portfolio"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <TopBar />
      <Navigation />
      <Hero />
      <TrustBar />
      <Products />
      <Industries />
      <WhyChoose />
      <Portfolio />
      <Clients />
      <CallToAction />
      <Footer />
    </main>
  )
}