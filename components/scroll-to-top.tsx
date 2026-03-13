"use client"

import { useEffect } from "react"

export function ScrollToTop() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    // Force scroll to top on mount
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [])

  return null
}