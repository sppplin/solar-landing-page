import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { neon } from '@neondatabase/serverless'
import './globals.css'

const barlow = Barlow({ 
  subsets: ["latin"],
  weight: ['400', '500', '600'],
  variable: '--font-barlow'
})

const barlowCondensed = Barlow_Condensed({ 
  subsets: ["latin"],
  weight: ['600', '700', '800', '900'],
  variable: '--font-barlow-condensed'
})

// ── Fetch all site settings from Neon DB ─────────────────────────────────────
async function getSiteSettings() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`
      SELECT key, value FROM settings
      WHERE key IN ('gtm_id', 'ga_id', 'site_title', 'site_desc', 'logo_url', 'favicon_url')
    `
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value as string]))
    return {
      gtmId:      map.gtm_id      ?? "",
      gaId:       map.ga_id       ?? "",
      siteTitle:  map.site_title  ?? "",
      siteDesc:   map.site_desc   ?? "",
      logoUrl:    map.logo_url    ?? "",
      faviconUrl: map.favicon_url ?? "",
    }
  } catch {
    return { gtmId: "", gaId: "", siteTitle: "", siteDesc: "", logoUrl: "", faviconUrl: "" }
  }
}

// ── Dynamic metadata from DB ─────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()

  return {
    title: s.siteTitle || "Solar Print Process - Packaging Manufacturer in Noida",
    description: s.siteDesc || "Packaging manufacturer in Noida. Mono cartons, rigid boxes, FMCG, food & cosmetic packaging. 200,000 sq ft plant. Bulk orders. Quote in 2 hours.",
    icons: {
      icon:     s.faviconUrl || "/favicon.ico",
      shortcut: s.faviconUrl || "/favicon.ico",
      apple:    s.faviconUrl || "/favicon.ico",
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const s = await getSiteSettings()

  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={`${barlow.variable} ${barlowCondensed.variable} font-sans antialiased`}>

        {/* GTM noscript fallback */}
        {s.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${s.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {children}
        <Analytics />

        {/* GTM script — only injected if GTM ID is set in admin panel */}
        {s.gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${s.gtmId}');`,
            }}
          />
        )}

        {/* GA4 script — only injected if GA4 ID is set in admin panel */}
        {s.gaId && (
          <>
            <Script
              id="ga4-script"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${s.gaId}`}
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${s.gaId}');`,
              }}
            />
          </>
        )}

      </body>
    </html>
  )
}