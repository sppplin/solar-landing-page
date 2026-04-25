"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MdPhoneCallback } from "react-icons/md"

interface CallBackRequestFormProps {
  variant?: "default" | "dialog"
  onSuccess?: () => void
}

export function CallBackRequestForm({
  variant = "default",
  onSuccess,
}: CallBackRequestFormProps) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleSubmit = async () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    }

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name."
    } else if (
      formData.name.trim().length < 3
    ) {
      newErrors.name =
        "Name must be at least 3 letters."
    }

    // Email
    const email = formData.email
      .trim()
      .toLowerCase()

    if (!email) {
      newErrors.email =
        "Please enter business email."
    } else {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      const blockedDomains = [
        "gmail.com",
        "yahoo.com",
        "ymail.com",
        "hotmail.com",
        "outlook.com",
        "live.com",
        "icloud.com",
        "rediff.com",
      ]

      if (!emailRegex.test(email)) {
        newErrors.email =
          "Please enter valid email."
      } else {
        const domain =
          email.split("@")[1]

        if (
          blockedDomains.includes(domain)
        ) {
          newErrors.email =
            "Use official company email only."
        }
      }
    }

    // Phone
    const phone =
      formData.phone.replace(/\D/g, "")

    if (!phone) {
      newErrors.phone =
        "Please enter phone number."
    } else if (
      phone.length !== 10 ||
      !/^[6-9]/.test(phone)
    ) {
      newErrors.phone =
        "Please enter valid mobile number."
    }

    setErrors(newErrors)

    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.phone
    ) {
      return
    }

    setLoading(true)

    try {
      const res = await fetch(
        "/api/callback-request",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...formData,
            phone: `+91${phone}`,
          }),
        }
      )

      if (!res.ok) throw new Error()

      onSuccess?.()

      router.push("/thank-you")
    } catch {
      alert(
        "Something went wrong. Please try again."
      )
      setLoading(false)
    }
  }

  const containerClasses =
    variant === "dialog"
      ? "rounded-xl bg-white p-5 sm:rounded-2xl sm:p-7"
      : "rounded-xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:rounded-2xl sm:p-6"

  return (
    <div className={containerClasses}>
      <span className="mb-2 inline-block rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold uppercase text-green-700">
        Fast Response
      </span>

      <h2 className="mb-1 text-lg font-black uppercase text-foreground">
        Request Call Back
      </h2>

      <p className="mb-4 border-b pb-4 text-xs text-muted-foreground">
        We contact you within 30 mins
        during business hours.
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
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full rounded-lg border px-3 py-2.5 text-sm"
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-xs font-bold uppercase">
            Official Email *
          </label>

          <input
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full rounded-lg border px-3 py-2.5 text-sm"
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-xs font-bold uppercase">
            Phone / WhatsApp *
          </label>

          <input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            maxLength={10}
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone:
                  e.target.value.replace(
                    /\D/g,
                    ""
                  ),
              })
            }
            className="w-full rounded-lg border px-3 py-2.5 text-sm"
          />

          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-black uppercase text-white transition hover:brightness-90 disabled:opacity-70"
        >
          <MdPhoneCallback className="h-4 w-4" />

          {loading
            ? "Submitting..."
            : "Request Call Back"}
        </button>

        <p className="text-center text-[10px] text-muted-foreground">
          Confidential. No spam.
          Mon-Sat response guaranteed.
        </p>
      </div>
    </div>
  )
}