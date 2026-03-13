import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const dbUrl = process.env.DATABASE_URL
    if (!dbUrl) {
      console.error("[v0] DATABASE_URL is not set")
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    const sql = neon(dbUrl)
    const body = await request.json()
    const { name, company, phone, packagingType, packaging_type, quantity, message } = body

    // Accept both camelCase and snake_case
    // If neither provided, default to "General Enquiry" (contact page case)
    const finalPackagingType = packagingType?.trim() || packaging_type?.trim() || "General Enquiry"

    console.log("[v0] Quote submission received:", { name, phone, finalPackagingType })

    // name and phone are always required
    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await sql`
      INSERT INTO quote_requests (name, company, phone, packaging_type, quantity, message)
      VALUES (
        ${name.trim()},
        ${company?.trim() || null},
        ${phone.trim()},
        ${finalPackagingType},
        ${quantity || null},
        ${message?.trim() || null}
      )
    `

    console.log("[v0] Quote saved successfully")
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("[v0] Quote form submission error:", error)
    return NextResponse.json({ error: "Failed to save quote request" }, { status: 500 })
  }
}