import type { Metadata, Viewport } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'

const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ali-raza-py.me'),
  title: 'Ali Raza — Building software. Learning continuously.',
  description:
    'Personal portfolio of Ali Raza, a Class XI Computer Science student at PECHS Government Science College, Karachi with completed matriculation from QBHSS — Python and C++ developer exploring AI, DevOps, and cloud computing.',
  icons: {
    icon: '/ar-icon.svg',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: '/',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#FAFAFA',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
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
      <body className="font-serif antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
