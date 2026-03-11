import { neon } from "@neondatabase/serverless"
import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { cookies } from "next/headers"

const KEYS = ["gtm_id", "ga_id", "clarity_id", "pixel_id", "site_title", "site_desc", "logo_url", "favicon_url"] as const

// ── GET — fetch all settings ──────────────────────────────────────────────────
export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        key   TEXT PRIMARY KEY,
        value TEXT NOT NULL DEFAULT ''
      )
    `

    const rows = await sql`SELECT key, value FROM settings WHERE key = ANY(${KEYS})`

    const result = Object.fromEntries(KEYS.map((k) => [k, ""])) as Record<string, string>
    for (const row of rows) result[row.key] = row.value

    return NextResponse.json(result)
  } catch (err) {
    console.error("[GET /api/site-settings]", err)
    return NextResponse.json({ gtm_id: "", ga_id: "", clarity_id: "", pixel_id: "", site_title: "", site_desc: "", logo_url: "", favicon_url: "" })
  }
}

// ── POST — save all settings ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const token = (await cookies()).get("admin_token")?.value
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()

    // Validate GTM ID format if provided
    const gtmId = (body.gtm_id ?? "").trim()
    if (gtmId && !/^GTM-[A-Z0-9]+$/.test(gtmId)) {
      return NextResponse.json(
        { error: "Invalid GTM ID. Format must be GTM-XXXXXXX" },
        { status: 400 }
      )
    }

    // Validate GA4 ID format if provided
    const gaId = (body.ga_id ?? "").trim()
    if (gaId && !/^G-[A-Z0-9]+$/.test(gaId)) {
      return NextResponse.json(
        { error: "Invalid GA4 ID. Format must be G-XXXXXXXXXX" },
        { status: 400 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)

    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        key   TEXT PRIMARY KEY,
        value TEXT NOT NULL DEFAULT ''
      )
    `

    // Upsert all keys in one go
    const pairs: [string, string][] = [
      ["gtm_id",      gtmId],
      ["ga_id",       gaId],
      ["clarity_id",  (body.clarity_id ?? "").trim()],
      ["pixel_id",    (body.pixel_id    ?? "").trim()],
      ["site_title",  (body.site_title  ?? "").trim()],
      ["site_desc",   (body.site_desc   ?? "").trim()],
      ["logo_url",    (body.logo_url    ?? "").trim()],
      ["favicon_url", (body.favicon_url ?? "").trim()],
    ]

    for (const [key, value] of pairs) {
      await sql`
        INSERT INTO settings (key, value) VALUES (${key}, ${value})
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[POST /api/site-settings]", err)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}