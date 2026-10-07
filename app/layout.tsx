import type { Metadata, Viewport } from 'next'
import { Anton, Geist_Mono, Instrument_Serif, Inter, Montserrat } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
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
    'product designer',
    'full-stack developer',
    'Next.js',
    'AI tools',
    'experiential design',
    'creative developer',
  ],
  icons: {
    icon: '/ar-icon.svg',
    apple: '/apple-icon.png',
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
        url: '/images/portrait-placeholder.svg',
        alt: 'Abstract portrait illustration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/portrait-placeholder.svg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0C0D0C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} ${montserrat.variable} ${anton.variable}`}
      style={{ colorScheme: 'dark' }}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.add('dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SmoothScroll />
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
