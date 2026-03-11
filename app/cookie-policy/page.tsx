"use client"

import Link from "next/link"
import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const sections = [
  {
    title: "1. What Are Cookies?",
    content: `Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and show you relevant content. Cookies do not contain personally identifiable information unless you have provided such information to us.`,
  },
  {
    title: "2. How We Use Cookies",
    content: `We use cookies for the following purposes:`,
    list: [
      "Essential Cookies — Required for the website to function properly (e.g., form submission, session management).",
      "Analytics Cookies — We use Google Analytics and Microsoft Clarity to understand how visitors interact with our website (pages visited, time spent, clicks, heatmaps, session recordings).",
      "Marketing Cookies — We use Meta Pixel (Facebook) and Google Tag Manager to measure the effectiveness of our advertising campaigns and to show relevant ads on social media.",
      "Performance Cookies — These help us improve site speed and user experience.",
    ],
  },
  {
    title: "3. Third-Party Cookies",
    content: `We work with trusted third-party services that may set their own cookies:`,
    list: [
      "Google Analytics (analytics.google.com) — Traffic and behaviour analysis.",
      "Google Tag Manager (tagmanager.google.com) — Tag and tracking management.",
      "Meta Pixel / Facebook (connect.facebook.net) — Ad conversion tracking.",
      "Microsoft Clarity (clarity.microsoft.com) — Session recordings and heatmaps.",
    ],
  },
  {
    title: "4. Your Choices",
    content: `You can control and manage cookies in several ways:`,
    list: [
      "Browser Settings — Most browsers allow you to block or delete cookies via their settings menu.",
      "Opt-Out Links — Google: tools.google.com/dlpage/gaoptout | Meta: facebook.com/ads/preferences",
      "Cookie Banner — Use the Accept or Decline option in our cookie consent banner when you first visit the site.",
      "Withdrawing Consent — Clear your browser's local storage or cookies at any time to reset your preference.",
    ],
  },
  {
    title: "5. Data Retention",
    content: `Analytics cookies typically persist for 13 months. Session cookies are deleted when you close your browser. You can delete all cookies at any time through your browser settings.`,
  },
  {
    title: "6. Changes to This Policy",
    content: `We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the site after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "7. Contact Us",
    content: `If you have any questions about our use of cookies, please contact us:`,
    list: [
      "Solar Print Process Pvt. Ltd.",
      "C-10, Sector 85, Noida — 201305, Uttar Pradesh, India",
      "Phone: +91 98717 13676",
      "Email: info@solarprintprocess.com",
    ],
  },
]

export default function CookiePolicyPage() {
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
              Cookie{" "}
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
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              This Cookie Policy explains how <span className="font-semibold text-foreground">Solar Print Process Pvt. Ltd.</span> uses cookies and similar tracking technologies on{" "}
              <a href="https://solarprint.com" className="underline hover:text-foreground transition-colors">solarprint.com</a>.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-10" />

          {/* Sections */}
          <div className="space-y-8">
            {sections.map(({ title, content, list }) => (
              <div key={title}>
                <h2 className="font-heading text-lg font-black uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F6B913" }} />
                  {title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{content}</p>
                {list && (
                  <ul className="space-y-2 pl-2">
                    {list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0 mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}