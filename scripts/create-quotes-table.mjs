import dotenv from "dotenv"
import { neon } from "@neondatabase/serverless"

dotenv.config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL)

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS quote_requests (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT,
      phone TEXT NOT NULL,
      packaging_type TEXT,
      quantity TEXT,
      message TEXT,
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
  console.log("quote_requests table created successfully.")
}

main().catch((err) => {
  console.error("Migration failed:", err)
  process.exit(1)
})
