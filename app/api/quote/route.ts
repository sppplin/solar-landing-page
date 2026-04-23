import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    console.log("🔥 API HIT")

    const dbUrl = process.env.DATABASE_URL
    const espoApiKey = process.env.ESPO_API_KEY

    if (!dbUrl) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      )
    }

    if (!espoApiKey) {
      return NextResponse.json(
        { error: "CRM not configured" },
        { status: 500 }
      )
    }

    const sql = neon(dbUrl)

    // Request Body
    const body = await request.json()

    const {
      name,
      company,
      email,
      phone,
      packagingType,
      packaging_type,
      quantity,
      message,
    } = body

    // Final Packaging Type
    const finalPackagingType =
      packagingType?.trim() ||
      packaging_type?.trim() ||
      "General Enquiry"

    // Validation
    if (
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

    // Save to Neon DB
    await sql`
      INSERT INTO quote_requests
      (
        name,
        company,
        email,
        phone,
        packaging_type,
        quantity,
        message
      )
      VALUES
      (
        ${name.trim()},
        ${company.trim()},
        ${email.trim()},
        ${phone.trim()},
        ${finalPackagingType},
        ${quantity || null},
        ${message?.trim() || null}
      )
    `

    console.log("✅ Saved to DB")

    // Send to CRM
    const espoRes = await fetch(
      "https://crm.solarprintprocess.com/api/v1/Lead",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": espoApiKey,
        },
        body: JSON.stringify({
          firstName: name.trim(),
          accountName: company.trim(),
          emailAddress: email.trim(),
          phoneNumber: phone.startsWith("+91")
            ? phone.trim()
            : `+91${phone.trim()}`,

          source: "Google Ads",
          cPackagingType: finalPackagingType,
          cQuantity: quantity || null,

          description: `
Message: ${message || "-"}
          `,

          status: "New",
        }),
      }
    )

    const crmText = await espoRes.text()

    console.log("CRM STATUS:", espoRes.status)
    console.log("CRM RESPONSE:", crmText)

    return NextResponse.json(
      { success: true },
      { status: 201 }
    )
  } catch (error) {
    console.error("💥 API ERROR:", error)

    return NextResponse.json(
      { error: "Failed to process quote request" },
      { status: 500 }
    )
  }
}