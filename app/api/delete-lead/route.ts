import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req:Request){

  const { id } = await req.json()

  await sql`
    DELETE FROM quote_requests
    WHERE id = ${id}
  `

  return NextResponse.json({success:true})

}