import React from "react"
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

const SITE_URL = "https://lexvyz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'LEXVYZ — More Clients. Bigger Turnover.',
    template: '%s | LEXVYZ',
  },
  description: 'AI receptionists, client intake automation, high-converting websites, CRM follow-up, and local SEO for law firms. We sell recovered revenue, not AI.',
  keywords: ['AI for law firms', 'AI receptionist', 'legal AI automation', 'law firm marketing', 'client intake automation', 'local SEO for lawyers', 'AI answering service for law firms'],
  authors: [{ name: 'LEXVYZ' }],
  creator: 'LEXVYZ',
  publisher: 'LEXVYZ',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'LEXVYZ',
    title: 'LEXVYZ — More Clients. Bigger Turnover.',
    description: 'AI automation and digital marketing for law firms. AI receptionists, intake automation, follow-up sequences, and local SEO — we sell recovered revenue, not AI.',
    images: [
      {
        url: '/images/lexvyz-logo.png',
        width: 1015,
        height: 305,
        alt: 'LEXVYZ — AI automation for law firms',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEXVYZ — More Clients. Bigger Turnover.',
    description: 'AI automation and digital marketing for law firms. We sell recovered revenue, not AI.',
    images: ['/images/lexvyz-logo.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  manifest: undefined,
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
