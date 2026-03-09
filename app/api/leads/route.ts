import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(){

  const leads = await sql`
  SELECT * FROM quote_requests
  ORDER BY submitted_at DESC
  `

  return NextResponse.json(leads)
}