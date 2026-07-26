import type { Metadata, Viewport } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'

const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ali Raza — Building software. Learning continuously.',
  description:
    'Personal portfolio of Ali Raza, a Class XI Computer Science student at PECHS Education Foundation Government Degree Science College — Python developer exploring web development, DevOps, cloud computing, and AI.',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F8F6F1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-serif antialiased">
        {children}
      </body>
    </html>
  )
}
