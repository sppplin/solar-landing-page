"use client"

import { usePathname } from "next/navigation"
import { WhatsAppButton } from "@/components/whatsapp-button"

export function WhatsAppWrapper() {
  const pathname = usePathname()

  // Hide on admin pages
  if (pathname?.startsWith("/admin")) return null

  return <WhatsAppButton />
}