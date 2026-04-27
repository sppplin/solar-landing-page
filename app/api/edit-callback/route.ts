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

    const body = await request.json()

    const { id, name, email, phone } = body

    if (
      !id ||
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    await sql`
      UPDATE callback_requests
      SET
        name = ${name.trim()},
        email = ${email.trim()},
        phone = ${phone.trim()}
      WHERE id = ${id}
    `

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update callback request" },
      { status: 500 }
    )
  }
}