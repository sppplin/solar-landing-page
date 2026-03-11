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
              Privacy{" "}
              <span className="text-primary relative inline-block">
                Policy
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #F6B913, #ffe55a)" }}
                />
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: <span className="font-semibold text-foreground">March 2026</span>
            </p>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">This Privacy Policy explains how Solar Print Process Pvt. Ltd. collects, uses, and protects your personal information when you visit solarprint.com.</p>
          </div>

          <div className="h-px bg-border mb-10" />

          <div className="space-y-8">

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  1. Information We Collect
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">We collect the following information when you submit our quote request form:</p>
                <ul className="space-y-2 pl-2 mt-3">
                    <li key="Full name" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Full name
                    </li>
                    <li key="Company name" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Company name
                    </li>
                    <li key="Phone number" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Phone number
                    </li>
                    <li key="Packaging type and quantity requirements" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Packaging type and quantity requirements
                    </li>
                    <li key="Any additional message you provide" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Any additional message you provide
                    </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  2. How We Use Your Information
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Your information is used solely for:</p>
                <ul className="space-y-2 pl-2 mt-3">
                    <li key="Responding to your quote or enquiry via phone or WhatsApp" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Responding to your quote or enquiry via phone or WhatsApp
                    </li>
                    <li key="Preparing and sending a custom packaging quote" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Preparing and sending a custom packaging quote
                    </li>
                    <li key="Improving our website and services based on usage patterns" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Improving our website and services based on usage patterns
                    </li>
                    <li key="Sending follow-up communication if you have opted in" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Sending follow-up communication if you have opted in
                    </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  3. Data Storage
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Your form submissions are securely stored in our database hosted on Neon (a cloud PostgreSQL provider). We do not sell, rent, or share your personal data with third parties except as required by law or to provide the requested service.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  4. Cookies & Tracking
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">We use cookies and third-party tracking tools including Google Analytics, Google Tag Manager, Meta Pixel, and Microsoft Clarity to understand how visitors use our website. Please refer to our Cookie Policy for full details.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  5. Third-Party Services
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">We use the following third-party services that may process your data:</p>
                <ul className="space-y-2 pl-2 mt-3">
                    <li key="Neon (database hosting) — neon.tech" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Neon (database hosting) — neon.tech
                    </li>
                    <li key="Vercel (website hosting) — vercel.com" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Vercel (website hosting) — vercel.com
                    </li>
                    <li key="Google Analytics — analytics.google.com" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Google Analytics — analytics.google.com
                    </li>
                    <li key="Meta Pixel — facebook.com" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Meta Pixel — facebook.com
                    </li>
                    <li key="Microsoft Clarity — clarity.microsoft.com" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Microsoft Clarity — clarity.microsoft.com
                    </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  6. Your Rights
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">You have the right to:</p>
                <ul className="space-y-2 pl-2 mt-3">
                    <li key="Request access to the personal data we hold about you" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Request access to the personal data we hold about you
                    </li>
                    <li key="Request correction or deletion of your data" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Request correction or deletion of your data
                    </li>
                    <li key="Withdraw consent for marketing communications at any time" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Withdraw consent for marketing communications at any time
                    </li>
                    <li key="Lodge a complaint with a data protection authority" className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                      Lodge a complaint with a data protection authority
                    </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  7. Data Retention
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">We retain your enquiry data for up to 2 years from the date of submission, after which it is permanently deleted unless required for legal or business purposes.</p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  8. Contact Us
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">For any privacy-related questions or data deletion requests:</p>
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