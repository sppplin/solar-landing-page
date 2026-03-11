"use client"

import { useState } from "react"
import Link from "next/link"
import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FaWhatsapp } from "react-icons/fa"
import {
  HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker,
  HiOutlineClock, HiOutlineCheckCircle, HiOutlineExclamationCircle,
} from "react-icons/hi"

const info = [
  {
    icon: HiOutlineLocationMarker,
    label: "Address",
    lines: ["C-10, Sector 85, Noida", "Uttar Pradesh — 201305, India"],
  },
  {
    icon: HiOutlinePhone,
    label: "Phone",
    lines: ["+91 98717 13676"],
    href: "tel:+919871713676",
  },
  {
    icon: HiOutlineMail,
    label: "Email",
    lines: ["business@spppl.in"],
    href: "mailto:business@spppl.in",
  },
  {
    icon: HiOutlineClock,
    label: "Working Hours",
    lines: ["Mon – Sat: 9:00 AM – 6:30 PM", "Sunday: Closed"],
  },
]

export default function ContactPage() {
  const [name, setName]       = useState("")
  const [phone, setPhone]     = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus]   = useState<"idle"|"sending"|"success"|"error">("idle")

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return
    setStatus("sending")
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, packaging_type: "General Enquiry", quantity: "-" }),
      })
      if (res.ok) setStatus("success")
      else setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopBar />
      <Navigation />

      <main className="flex-1 py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-0.5 rounded-full bg-primary" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-accent">Get In Touch</span>
              <span className="w-8 h-0.5 rounded-full bg-primary" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground leading-none mb-4">
              Contact{" "}
              <span className="text-primary relative inline-block">
                Us
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #F6B913, #ffe55a)" }}
                />
              </span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Have a packaging requirement? Our team will get back to you within <span className="font-semibold text-foreground">2 hours</span> with a custom quote.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── Left: Info cards ── */}
            <div className="space-y-4">
              {info.map(({ icon: Icon, label, lines, href }) => (
                <div key={label} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-sm transition-all">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
                  >
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">{label}</p>
                    {lines.map((line) =>
                      href ? (
                        <a key={line} href={href} className="block text-sm font-semibold text-foreground hover:text-primary transition-colors">{line}</a>
                      ) : (
                        <p key={line} className="text-sm text-foreground font-semibold">{line}</p>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919871713676?text=Hi%2C+I+have+a+packaging+enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-heading font-black uppercase tracking-wide text-sm text-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
                style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>

            {/* ── Right: Quick enquiry form ── */}
            <div className="relative bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
              {/* Gold stripe */}
              <div
                className="absolute top-0 inset-x-0 h-[3px]"
                style={{ background: "linear-gradient(90deg, transparent, #F6B913 30%, #ffe55a 50%, #F6B913 70%, transparent)" }}
              />

              <div className="px-6 pt-8 pb-6">
                <h2 className="font-heading text-xl font-black uppercase tracking-wide text-foreground mb-1">Quick Enquiry</h2>
                <p className="text-xs text-muted-foreground mb-6">Fill in your details and we'll call you back.</p>

                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
                    >
                      <HiOutlineCheckCircle className="w-7 h-7 text-black" />
                    </div>
                    <p className="font-heading font-black uppercase text-foreground">Message Sent!</p>
                    <p className="text-sm text-muted-foreground">We'll get back to you within 2 hours.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1.5">Message</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your packaging requirement..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                        <HiOutlineExclamationCircle className="w-4 h-4 flex-shrink-0" />
                        Something went wrong. Please try calling us directly.
                      </div>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={status === "sending" || !name.trim() || !phone.trim()}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-heading font-black uppercase tracking-wide text-sm text-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
                      style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
                    >
                      {status === "sending" ? (
                        <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                      ) : (
                        "Send Enquiry"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Back link */}
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