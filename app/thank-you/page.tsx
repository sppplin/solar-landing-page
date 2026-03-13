"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaWhatsapp } from "react-icons/fa"
import { HiOutlinePhone, HiOutlineCheckCircle, HiOutlineExternalLink } from "react-icons/hi"
import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ThankYouPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  // Fire GTM dataLayer event
  useEffect(() => {
    // Fire conversion event to GTM
    if (typeof window !== "undefined") {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({
        event: "form_submit_success",
        event_category: "lead",
        event_label: "quote_form",
      })
    }

    // Countdown to redirect
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval)
          return 0
        }
        return c - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [router])

  // Separate effect to handle redirect — avoids setState-during-render error
  useEffect(() => {
    if (countdown === 0) router.push("https://www.solarprintprocess.com/projects")
  }, [countdown, router])

  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex flex-col">

      {/* ── Gold dot-grid watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(246,185,19,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Gold glow top right ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full z-0"
        style={{ background: "radial-gradient(circle, rgba(246,185,19,0.15) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-20 -left-20 w-80 h-80 rounded-full z-0"
        style={{ background: "radial-gradient(circle, rgba(246,185,19,0.1) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <TopBar />
      <Navigation />

      {/* ── Main content ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-2xl text-center">

          {/* ── Checkmark ── */}
          <div className="relative inline-flex items-center justify-center mb-8">
            {/* Outer ring pulse */}
            <div
              className="absolute w-28 h-28 rounded-full animate-ping opacity-20"
              style={{ background: "rgba(246,185,19,0.4)" }}
            />
            <div
              className="absolute w-24 h-24 rounded-full"
              style={{ background: "rgba(246,185,19,0.15)" }}
            />
            <div
              className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
            >
              <HiOutlineCheckCircle className="w-10 h-10 text-black" strokeWidth={1.5} />
            </div>
          </div>

          {/* ── Eyebrow ── */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-accent">
              Quote Request
            </span>
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </div>

          {/* ── Headline ── */}
          <h1 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground leading-none mb-4">
            Request{" "}
            <span className="relative inline-block text-primary">
              Received!
              <span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg, #F6B913, #ffe55a)" }}
              />
            </span>
          </h1>

          {/* ── Subtext ── */}
          <p className="text-base sm:text-lg text-muted-foreground mb-2 leading-relaxed">
            Thank you for reaching out to <span className="font-semibold text-foreground">Solar Print Process</span>.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Our team will call or WhatsApp you within{" "}
            <span className="font-bold text-foreground">2 hours</span> with your custom quote.
          </p>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-col items-stretch gap-3 mb-10 sm:flex-row sm:items-center sm:justify-center sm:flex-wrap">
            <a
              href="https://wa.me/919871713676?text=Hi%2C+I+just+submitted+a+quote+request+on+your+website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-heading font-black uppercase tracking-wide text-sm text-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
            >
              <FaWhatsapp className="w-5 h-5 flex-shrink-0" />
              Chat on WhatsApp Now
            </a>
            <a
              href="tel:+919871713676"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl border border-border font-semibold text-sm text-foreground bg-white hover:bg-muted transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <HiOutlinePhone className="w-4 h-4 flex-shrink-0" />
              +91 98717 13676
            </a>
            <a
              href="https://www.solarprintprocess.com/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl border border-primary/40 font-semibold text-sm text-accent bg-primary/5 hover:bg-primary/10 hover:border-primary transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <HiOutlineExternalLink className="w-4 h-4 flex-shrink-0" />
              Explore Our Projects
            </a>
          </div>

          {/* ── Info cards ── */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { value: "2 hrs", label: "Response time" },
              { value: "500+", label: "B2B Clients" },
              { value: "1975", label: "Est. year" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-white/80 backdrop-blur-sm px-3 py-4 text-center shadow-sm"
              >
                <div className="font-heading text-2xl font-black text-primary leading-none mb-1">{value}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          {/* ── Auto redirect countdown ── */}
          <p className="text-xs text-muted-foreground/60">
            Redirecting to our projects in{" "}
            <span className="font-bold text-muted-foreground">{countdown}s</span>
            {" "}·{" "}
            <a href="https://solarprintprocess.com" className="underline hover:text-foreground transition-colors">
              Go now
            </a>
          </p>

        </div>
      </main>

      <Footer />

    </div>
  )
}