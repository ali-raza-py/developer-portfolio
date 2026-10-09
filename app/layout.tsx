import type { Metadata, Viewport } from 'next'
import { Anton, Geist_Mono, Instrument_Serif, Inter, Montserrat } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { AmbientAudioProvider } from '@/components/ambient-audio'
import { Cursor } from '@/components/cursor'
import { SmoothScroll } from '@/components/smooth-scroll'
import { siteConfig } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-technical',
})

/**
 * Montserrat — the geometric headline face. Tight tracking, wide weights:
 * architectural, premium, and a deliberate pairing with Inter for body copy.
 */
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-display-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Ali Raza',
  },
  description: siteConfig.description,
  keywords: [
    'Ali Raza',
    'developer portfolio',
    'software developer',
    'computer science student',
    'Next.js',
    'AI tools',
    'software engineering',
    'AI tools',
  ],
  icons: {
    icon: '/minecraft-pickaxe-favicon.png',
    apple: '/minecraft-pickaxe-favicon.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: '/images/ali-raza-profile.png',
        alt: 'Ali Raza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/ali-raza-profile.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#27342a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} ${montserrat.variable} ${anton.variable} dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="antialiased">
        <AmbientAudioProvider>
          <ThemeProvider>
            <SmoothScroll />
            <Cursor />
            {children}
          </ThemeProvider>
        </AmbientAudioProvider>
      </body>
    </html>
  )
}
