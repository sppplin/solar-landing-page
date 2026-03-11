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
              Terms &{" "}
              <span className="text-primary relative inline-block">
                Conditions
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #F6B913, #ffe55a)" }}
                />
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: <span className="font-semibold text-foreground">March 2026</span>
            </p>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">These Terms & Conditions govern your use of solarprint.com and any services offered by Solar Print Process Pvt. Ltd. Please read them carefully before using this website.</p>
          </div>

          <div className="h-px bg-border mb-10" />

          <div className="space-y-8">

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  1. Acceptance of Terms
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">By accessing and using solarprint.com, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use this website.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  2. Use of Website
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others. You must not:</p>
                <ul className="space-y-2 pl-2 mt-3">
                    <li key="Use the site to transmit any unsolicited or unauthorised advertising" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Use the site to transmit any unsolicited or unauthorised advertising
                    </li>
                    <li key="Attempt to gain unauthorised access to any part of the website" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Attempt to gain unauthorised access to any part of the website
                    </li>
                    <li key="Use automated scripts to scrape, index, or harvest data" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Use automated scripts to scrape, index, or harvest data
                    </li>
                    <li key="Submit false or misleading information through our forms" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Submit false or misleading information through our forms
                    </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  3. Quotes & Orders
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">All quotes provided through this website are indicative only and subject to final confirmation by our sales team. Prices, lead times, and specifications may vary. A confirmed purchase order and advance payment are required to initiate production.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  4. Intellectual Property
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">All content on this website — including text, images, logos, product photographs, and design — is the intellectual property of Solar Print Process Pvt. Ltd. and may not be reproduced, distributed, or used without prior written permission.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  5. Product Information
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">We make every effort to ensure product specifications and images are accurate. However, actual product colours, dimensions, and finishes may vary slightly due to manufacturing tolerances, printing variability, and screen calibration differences.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  6. Limitation of Liability
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Solar Print Process Pvt. Ltd. shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or our services. Our total liability in any matter is limited to the value of the specific order in question.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  7. Governing Law
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">These Terms & Conditions are governed by the laws of India. Any disputes arising from the use of this website or our services shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh, India.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  8. Changes to Terms
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">We reserve the right to update these Terms & Conditions at any time. Changes will be effective immediately upon posting to this page. Continued use of the website constitutes acceptance of the updated terms.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  9. Contact Us
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">For any questions regarding these Terms:</p>
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