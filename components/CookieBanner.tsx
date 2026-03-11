"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { HiOutlineX, HiOutlineShieldCheck } from "react-icons/hi"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Small delay so it doesn't flash on first paint
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("cookie_consent")
      if (!consent) setVisible(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-[9998] w-[340px] max-w-[calc(100vw-2rem)]"
      style={{
        animation: "slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Card */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">

        {/* Gold top stripe */}
        <div
          className="absolute top-0 inset-x-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, transparent, #F6B913 30%, #ffe55a 50%, #F6B913 70%, transparent)" }}
        />

        {/* Close */}
        <button
          onClick={decline}
          className="absolute top-3 right-3 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          aria-label="Close"
        >
          <HiOutlineX className="w-4 h-4" />
        </button>

        <div className="px-5 pt-6 pb-5">
          {/* Icon + Title */}
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
            >
              <HiOutlineShieldCheck className="w-4 h-4 text-black" />
            </div>
            <span className="font-heading font-black uppercase tracking-wide text-sm text-foreground">
              We use Cookies
            </span>
          </div>

          {/* Body */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            We use cookies to improve your experience, analyse site traffic, and personalise content.
            By clicking <span className="font-semibold text-foreground">Accept</span>, you consent to our use of cookies.{" "}
            <Link
              href="/cookie-policy"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Learn more
            </Link>
          </p>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={decline}
              className="flex-1 px-3 py-2.5 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="flex-1 px-3 py-2.5 rounded-xl text-xs font-heading font-black uppercase tracking-wide text-foreground transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/30 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #F6B913, #ffe55a)" }}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}