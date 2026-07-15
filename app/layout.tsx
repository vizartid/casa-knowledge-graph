import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Young_Serif } from 'next/font/google'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
})

const youngSerif = Young_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-young-serif',
})

export const metadata: Metadata = {
  title: 'Casa — Second Brain',
  description: 'Ruang berpikir personal untuk catatan, koneksi, dan percakapan dengan Casa.',
  applicationName: 'Casa',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0D0C0D',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="dark bg-background">
      <body className={`${instrumentSans.variable} ${youngSerif.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
