"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

interface AdminLogoButtonProps {
  logoUrl: string
}

export default function AdminLogoButton({ logoUrl }: AdminLogoButtonProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = () => {
    if (pathname === "/admin/dashboard") {
      window.location.reload()
    } else {
      router.push("/admin/dashboard")
    }
  }

  return (
    <button onClick={handleClick} className="cursor-pointer">
      <Image
        src={logoUrl}
        alt="Solar Print Process Pvt. Ltd."
        width={120}
        height={40}
        unoptimized={logoUrl.startsWith("http") || logoUrl.startsWith("data:")}
        className="h-10 w-auto object-contain"
        priority
      />
    </button>
  )
}