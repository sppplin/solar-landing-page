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

    const { name, email, phone } = body

    if (
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
      INSERT INTO callback_requests
      (
        name,
        email,
        phone
      )
      VALUES
      (
        ${name.trim()},
        ${email.trim()},
        ${phone.trim()}
      )
    `

    return NextResponse.json(
      { success: true },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    )
  }
}