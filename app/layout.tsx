import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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

export const metadata: Metadata = {
  title: 'Solar Print Process - Packaging Manufacturer in Noida',
  description:
    'Packaging manufacturer in Noida. Mono cartons, rigid boxes, FMCG, food & cosmetic packaging. 200,000 sq ft plant. Bulk orders. Quote in 2 hours.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${barlow.variable} ${barlowCondensed.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}