
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineExclamationCircle,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi"
import { HiArrowRightOnRectangle } from "react-icons/hi2"

export default function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push("/admin/dashboard")
      } else {
        setError(data.error || "Invalid login credentials")
      }
    } catch {
      setError("Server error. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="relative min-h-svh flex items-center justify-center bg-background px-4 py-10 overflow-hidden">

      {/* ── Dot grid watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(246,185,19,0.15) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Gold corner glows ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full z-0"
        style={{ background: "radial-gradient(circle, rgba(246,185,19,0.1) 0%, transparent 70%)", filter: "blur(70px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-24 w-96 h-96 rounded-full z-0"
        style={{ background: "radial-gradient(circle, rgba(246,185,19,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-[420px] bg-card border border-border rounded-2xl shadow-xl shadow-black/5 overflow-hidden">

        {/* Gold top stripe */}
        <div
          className="absolute top-0 inset-x-0 h-[3px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(246,185,19,0.4) 15%, #F6B913 40%, #ffe55a 50%, #F6B913 65%, rgba(246,185,19,0.4) 85%, transparent)"
          }}
        />

        {/* Corner bracket accents */}
        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary/25 rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary/25 rounded-bl-2xl pointer-events-none" />

        <div className="px-7 pt-9 pb-8 sm:px-9">

          {/* Logo */}
          <div className="flex justify-center mb-7">
            <Image
              src="/logo.svg"
              alt="Solar Print Process Pvt. Ltd."
              width={130}
              height={44}
              className="h-11 w-auto object-contain"
              priority
            />
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-0.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-accent">
              Secure Access
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-4xl sm:text-[42px] font-black uppercase tracking-tight leading-none text-foreground mb-1">
            Admin Login
          </h1>
          <p className="text-sm text-muted-foreground mb-7">
            Authorized personnel only
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground"
              >
                Username
              </label>
              <div className="relative group">
                <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                <input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground"
              >
                Password
              </label>
              <div className="relative group">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {/* Show / Hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-primary/30"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-4 h-4" />
                  ) : (
                    <HiOutlineEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
              >
                <HiOutlineExclamationCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-primary text-primary-foreground font-heading text-lg font-black uppercase tracking-widest overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer mt-1"
            >
              {/* Shimmer sweep */}
              <span
                aria-hidden
                className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
              />

              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  <HiArrowRightOnRectangle className="w-5 h-5" />
                  Access Dashboard
                </>
              )}
            </button>

          </form>

          {/* Footer */}
          <div className="mt-7 pt-5 border-t border-border text-center text-[11px] text-muted-foreground tracking-wide">
            <span className="font-semibold text-accent">© 2026, Solar Print Process Pvt. Ltd.</span>
          </div>

        </div>
      </div>
    </div>
  )
}