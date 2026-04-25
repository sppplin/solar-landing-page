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

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: "ID required" },
        { status: 400 }
      )
    }

    const sql = neon(dbUrl)

    await sql`
      DELETE FROM callback_requests
      WHERE id = ${id}
    `

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete" },
      { status: 500 }
    )
  }
}