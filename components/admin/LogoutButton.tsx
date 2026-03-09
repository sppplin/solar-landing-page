"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HiOutlineLogout } from "react-icons/hi"

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    setLoading(true)
    await fetch("/api/admin-logout", { method: "POST" })
    router.push("/admin/login")
  }

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-border bg-background text-muted-foreground text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-150 hover:bg-red-50 hover:border-red-200 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
    >
      {loading ? (
        <span className="w-3.5 h-3.5 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
      ) : (
        <HiOutlineLogout className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">{loading ? "Logging out…" : "Logout"}</span>
    </button>
  )
}