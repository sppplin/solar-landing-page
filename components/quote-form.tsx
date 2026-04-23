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

  const [errors, setErrors] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    packagingType: "",
  })

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    packagingType: "",
    quantity: "",
    message: "",
  })

    // Replace your handleSubmit() with this updated version

const handleSubmit = async () => {
  const newErrors = {
    name: "",
    company: "",
    email: "",
    phone: "",
    packagingType: "",
  }

  // ✅ Name Validation
  if (!formData.name.trim()) {
    newErrors.name = "Please enter your name."
  } else if (formData.name.trim().length < 3) {
    newErrors.name = "Name must be at least 3 letters."
  }

  // ✅ Company Validation
  if (!formData.company.trim()) {
    newErrors.company = "Please enter company name."
  } else if (formData.company.trim().length < 3) {
    newErrors.company = "Company name must be at least 3 letters."
  }

  // ✅ Email Validation
  const email = formData.email.trim().toLowerCase()

  if (!email) {
    newErrors.email = "Please enter company email."
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const blockedDomains = [
      "gmail.com",
      "yahoo.com",
      "ymail.com",
      "rocketmail.com",
      "hotmail.com",
      "outlook.com",
      "live.com",
      "icloud.com",
      "rediff.com",
      "aol.com",
      "zoho.com",
    ]

    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter valid email."
    } else {
      const domain = email.split("@")[1]

      if (blockedDomains.includes(domain)) {
        newErrors.email = "Use official company email only."
      }
    }
  }

  // ✅ Phone Validation
  if (!formData.phone.trim()) {
    newErrors.phone = "Please enter phone number."
  }

  // ✅ Packaging Type
  if (!formData.packagingType) {
    newErrors.packagingType = "Please select packaging type."
  }

  setErrors(newErrors)

  if (
    newErrors.name ||
    newErrors.company ||
    newErrors.email ||
    newErrors.phone ||
    newErrors.packagingType
  ) {
    return
  }

  setLoading(true)

  try {
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!res.ok) throw new Error()

    router.push("/thank-you")
  } catch {
    alert("Something went wrong. Please try again.")
    setLoading(false)
  }
}

  const containerClasses =
    variant === "dialog"
      ? "rounded-xl bg-white p-5 sm:rounded-2xl sm:p-7"
      : "sticky top-32 lg:top-40 rounded-xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:rounded-2xl sm:p-6 lg:p-5"

  return (
    <div className={containerClasses}>
      <span className="mb-2 inline-block rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold uppercase text-green-700">
        Immediate Response
      </span>

      <h2 className="mb-1 font-heading text-lg font-black uppercase text-foreground">
        Get Free Quote Now
      </h2>

      <p className="mb-4 border-b pb-4 text-xs text-muted-foreground">
        Fill your requirement - we respond within 30 minutes on business hours!
      </p>

      <div className="space-y-3">
        {/* Name */}
        <div>
          <label className="mb-1 block text-xs font-bold uppercase">
            Your Name *
          </label>

          <input
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full rounded-lg border px-3 py-2.5 text-sm"
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="mb-1 block text-xs font-bold uppercase">
            Company Name *
          </label>

          <input
            type="text"
            placeholder="Your company name"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="w-full rounded-lg border px-3 py-2.5 text-sm"
          />

          {errors.company && (
            <p className="mt-1 text-xs text-red-500">{errors.company}</p>
          )}
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase">
              Official Email *
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2.5 text-sm"
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase">
              Phone / WhatsApp *
            </label>

            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full rounded-lg border px-3 py-2.5 text-sm"
            />

            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Packaging Type */}
        <div>
          <label className="mb-1 block text-xs font-bold uppercase">
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
            className="w-full rounded-lg border px-3 py-2.5 text-sm"
          >
            <option value="">Select packaging type...</option>

            {packagingTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {errors.packagingType && (
            <p className="mt-1 text-xs text-red-500">
              {errors.packagingType}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-1 block text-xs font-bold uppercase">
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
            className="w-full rounded-lg border px-3 py-2.5 text-sm"
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
          <label className="mb-1 block text-xs font-bold uppercase">
            Specific Requirement
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
            className="h-20 w-full resize-none rounded-lg border px-3 py-2.5 text-sm"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-black uppercase transition hover:brightness-90 disabled:opacity-70"
        >
          <HiOutlineClipboardList className="h-4 w-4" />
          {loading ? "Submitting..." : "Get Free Quote"}
        </button>

        <p className="text-center text-[10px] text-muted-foreground">
          Confidential. No spam. Mon-Sat response guaranteed.
        </p>
      </div>
    </div>
  )
}