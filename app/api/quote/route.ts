import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const dbUrl = process.env.DATABASE_URL
    const espoApiKey = process.env.ESPO_API_KEY

    if (!dbUrl) {
      console.error("[v0] DATABASE_URL is not set")
      return NextResponse.json({ error: "Database not configured" }, { status: 500 })
    }

    if (!espoApiKey) {
      console.error("[v0] ESPO_API_KEY is not set")
      return NextResponse.json({ error: "CRM not configured" }, { status: 500 })
    }

    const sql = neon(dbUrl)
    const body = await request.json()
    const { name, company, phone, packagingType, packaging_type, quantity, message } = body

    const finalPackagingType =
      packagingType?.trim() ||
      packaging_type?.trim() ||
      "General Enquiry"

    console.log("[v0] Quote submission received:", { name, phone, finalPackagingType })

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // ✅ 1. Save to Neon DB
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

    // ✅ 2. Send to EspoCRM
    const espoRes = await fetch("https://crm.solarprintprocess.com/api/v1/Lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": espoApiKey,
      },
      body: JSON.stringify({
      firstName: name,
      phoneNumber: phone.startsWith("+91") ? phone : `+91${phone}`,
      accountName: company || null,

      assignedUserId: "69b94a0f3b8d0a1a0",
      source: "Google Ads",
      campaignId: "69b2d10d9b8c23c5d",

      cPackagingType: finalPackagingType,
      cQuantity: quantity || null,

      description: `
    Message: ${message || "-"}
      `,

      status: "New",
    }),
    })

    // 🔍 Debug (important if something fails)
    if (!espoRes.ok) {
      const errorText = await espoRes.text()
      console.error("[v0] EspoCRM error:", errorText)
    } else {
      console.log("[v0] Lead sent to EspoCRM successfully")
    }

    return NextResponse.json({ success: true }, { status: 201 })

  } catch (error) {
    console.error("[v0] Quote form submission error:", error)
    return NextResponse.json({ error: "Failed to process quote request" }, { status: 500 })
  }
}
