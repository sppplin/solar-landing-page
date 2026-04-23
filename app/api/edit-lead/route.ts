import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const dbUrl = process.env.DATABASE_URL

    if (!dbUrl) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      )
    }

    const sql = neon(dbUrl)

    const {
      id,
      name,
      company,
      email,
      phone,
      packaging_type,
      quantity,
      message,
    } = await request.json()

    // Validation
    if (
      !id ||
      !name?.trim() ||
      !company?.trim() ||
      !email?.trim() ||
      !phone?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Update Lead
    await sql`
      UPDATE quote_requests
      SET
        name           = ${name.trim()},
        company        = ${company.trim()},
        email          = ${email.trim()},
        phone          = ${phone.trim()},
        packaging_type = ${packaging_type?.trim() || "General Enquiry"},
        quantity       = ${quantity || null},
        message        = ${message?.trim() || null}
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[edit-lead] error:", error)

    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    )
  }
}