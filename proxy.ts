import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export function proxy(req: NextRequest) {

  if (req.nextUrl.pathname.startsWith("/admin/dashboard")) {

    const token = req.cookies.get("admin_token")?.value

    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      )
    }

  }

  return NextResponse.next()
}