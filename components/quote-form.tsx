"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HiOutlineClipboardList } from "react-icons/hi"

const packagingTypes = [
  "Mono Cartons",
  "Rigid Boxes",
  "Custom Printed Boxes",
  "Food Packaging",
  "FMCG Packaging",
  "Cosmetic Packaging",
  "Ecommerce Packaging",
  "Gift Boxes",
  "Corrugated Boxes",
  "Other",
]

const quantities = [
  "1,000 - 5,000 pieces",
  "5,000 - 25,000 pieces",
  "25,000 - 100,000 pieces",
  "100,000 - 500,000 pieces",
  "500,000+ pieces",
]

interface QuoteFormProps {
  variant?: "default" | "dialog"
}

export function QuoteForm({ variant = "default" }: QuoteFormProps) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    packagingType: "",
    quantity: "",
    message: "",
  })

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError("Please enter your name.")
      return
    }

    if (!formData.company.trim()) {
      setError("Please enter company name.")
      return
    }

    if (!formData.email.trim()) {
      setError("Please enter email address.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.")
      return
    }

    if (!formData.packagingType) {
      setError("Please select a packaging type.")
      return
    }

    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error("Failed")
      }

      router.push("/thank-you")
    } catch {
      setError("Something went wrong. Please try again or call us directly.")
      setLoading(false)
    }
  }

  const containerClasses =
    variant === "dialog"
      ? "rounded-xl bg-white p-5 sm:rounded-2xl sm:p-7"
      : "sticky top-32 lg:top-40 rounded-xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:rounded-2xl sm:p-6 lg:p-5"

  return (
    <div className={containerClasses}>
      <span className="mb-2 inline-block rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700 sm:mb-2.5 sm:px-3 sm:text-[11.5px]">
        Immediate Response
      </span>

      <h2 className="mb-1 font-heading text-lg font-black uppercase text-foreground sm:text-xl lg:text-lg">
        Get Free Quote Now
      </h2>

      <p className="mb-3 border-b-2 border-[#f0f0f4] pb-3 text-xs text-muted-foreground sm:mb-4 sm:pb-4 sm:text-[13px] lg:mb-3 lg:pb-3 lg:text-xs">
        Fill your requirement - we respond within 30 minutes on business hours!
      </p>

      <div className="space-y-2 sm:space-y-2.5 lg:space-y-2">
        {/* Name */}
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-foreground/80 sm:mb-1.5 sm:text-[11.5px]">
            Your Name *
          </label>

          <input
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full rounded-lg border-[1.5px] border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Company */}
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-foreground/80 sm:mb-1.5 sm:text-[11.5px]">
            Company Name *
          </label>

          <input
            type="text"
            placeholder="Your company name"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="w-full rounded-lg border-[1.5px] border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-foreground/80 sm:mb-1.5 sm:text-[11.5px]">
              Email *
            </label>

            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-lg border-[1.5px] border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-foreground/80 sm:mb-1.5 sm:text-[11.5px]">
              Phone / WhatsApp *
            </label>

            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full rounded-lg border-[1.5px] border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Packaging Type */}
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-foreground/80 sm:mb-1.5 sm:text-[11.5px]">
            Packaging Type Needed *
          </label>

          <select
            value={formData.packagingType}
            onChange={(e) =>
              setFormData({
                ...formData,
                packagingType: e.target.value,
              })
            }
            className="w-full rounded-lg border-[1.5px] border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="">Select packaging type...</option>

            {packagingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-foreground/80 sm:mb-1.5 sm:text-[11.5px]">
            Approximate Quantity
          </label>

          <select
            value={formData.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: e.target.value,
              })
            }
            className="w-full rounded-lg border-[1.5px] border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            <option value="">Select quantity range...</option>

            {quantities.map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-foreground/80 sm:mb-1.5 sm:text-[11.5px]">
            Specific Requirement (optional)
          </label>

          <textarea
            placeholder="Size, finish, print, deadline..."
            value={formData.message}
            onChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value,
              })
            }
            className="h-16 w-full resize-none rounded-lg border-[1.5px] border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-heading text-sm font-black uppercase tracking-wide text-foreground transition-all hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <HiOutlineClipboardList className="h-4 w-4" />

          {loading ? "SUBMITTING..." : "GET FREE QUOTE"}
        </button>

        <p className="text-center text-[10px] text-muted-foreground">
          Confidential. No spam. Mon-Sat response guaranteed.
        </p>
      </div>
    </div>
  )
}