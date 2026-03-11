"use client"

import Link from "next/link"
import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar />
      <Navigation />

      <main className="flex-1 py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-0.5 rounded-full bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-accent">Legal</span>
              <span className="w-8 h-0.5 rounded-full bg-primary" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground leading-none mb-4">
              Dis{" "}
              <span className="text-primary relative inline-block">
                claimer
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #F6B913, #ffe55a)" }}
                />
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: <span className="font-semibold text-foreground">March 2026</span>
            </p>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">This Disclaimer outlines the limitations of information provided on solarprint.com by Solar Print Process Pvt. Ltd.</p>
          </div>

          <div className="h-px bg-border mb-10" />

          <div className="space-y-8">

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  1. General Disclaimer
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">The information provided on solarprint.com is for general informational purposes only. While we strive to keep information accurate and up to date, we make no warranties or representations of any kind about the completeness, accuracy, reliability, or suitability of the information on this website.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  2. Quote Disclaimer
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">All quotes, pricing estimates, and lead times communicated through this website or via phone/WhatsApp are preliminary and non-binding. Final pricing is subject to material costs, order volume, artwork complexity, and other factors confirmed at the time of order placement.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  3. Product Samples
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Product images and samples shown on this website are representative only. Final products may differ in colour, texture, or finish due to printing variables, substrate differences, and finishing processes. We recommend requesting a physical sample or proof before placing bulk orders.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  4. External Links
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">This website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  5. Professional Advice
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Nothing on this website constitutes professional, legal, or financial advice. For specific requirements or concerns related to packaging regulations, food safety compliance, or import/export rules, we recommend consulting a qualified professional.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  6. Contact Us
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">For clarifications on any of the above:</p>
                <ul className="space-y-2 pl-2 mt-3">
                    <li key="Solar Print Process Pvt. Ltd." className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Solar Print Process Pvt. Ltd.
                    </li>
                    <li key="C-10, Sector 85, Noida — 201305, Uttar Pradesh, India" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      C-10, Sector 85, Noida — 201305, Uttar Pradesh, India
                    </li>
                    <li key="Phone: +91 98717 13676" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Phone: +91 98717 13676
                    </li>
                    <li key="Email: info@solarprintprocess.com" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Email: info@solarprintprocess.com
                    </li>
                </ul>
              </div>

          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}