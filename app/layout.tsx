import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Instrument_Serif, Inter, Montserrat } from 'next/font/google'
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Ali Raza',
  },
  description: siteConfig.description,
  keywords: [
    'Ali Raza',
    'software engineering student',
    'developer portfolio',
    'Python developer',
    'Next.js',
    'AI projects',
    'MediCare AI',
    'Algorify',
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
        url: '/images/portrait.png',
        alt: 'Portrait of Ali Raza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/portrait.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#F4F1EA',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} ${montserrat.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'light';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
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
