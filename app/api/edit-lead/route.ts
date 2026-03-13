import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const { id, name, phone, company, packaging_type, quantity, message } = await request.json()

    if (!id || !name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await sql`
      UPDATE quote_requests
      SET
        name           = ${name.trim()},
        phone          = ${phone.trim()},
        company        = ${company?.trim() || null},
        packaging_type = ${packaging_type?.trim() || "General Enquiry"},
        quantity       = ${quantity || null},
        message        = ${message?.trim() || null}
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[edit-lead] error:", error)
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
  }
}