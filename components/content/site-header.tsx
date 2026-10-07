'use client'

import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { projects } from '@/lib/projects'
import { cn } from '@/lib/utils'

export function SiteHeader({ className }: { className?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const items = [
    { href: '/#intro', label: 'Intro' },
    { href: '/#about', label: 'About' },
    ...projects.slice(0, 4).map((project) => ({
      href: project.slug === 'algorify' ? `/projects/${project.slug}` : `/#${project.slug}`,
      label: project.title,
    })),
    { href: '/#contact', label: 'Contact' },
  ]

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className={cn('fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5', className)}>
        <div className="flex items-center rounded-full border border-white/15 bg-[#151515]/80 p-1.5 shadow-2xl backdrop-blur-xl">
          <nav className="hidden items-center gap-1 md:flex">
            <Link href="/#about" className="rounded-full px-4 py-2 text-xs text-white/70 transition-colors hover:text-white">About</Link>
            <Link href="/#work" className="rounded-full px-4 py-2 text-xs text-white/70 transition-colors hover:text-white">Projects</Link>
          </nav>
          <span aria-hidden="true" className="mx-1 hidden h-7 w-px bg-white/10 md:block" />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="portfolio-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-[#f4f0e7] transition-colors hover:bg-white/10 md:hidden"
          >
            {menuOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
          <span aria-hidden="true" className="mx-1 h-9 w-px bg-white/10 md:hidden" />
          <span aria-hidden="true" className="hidden size-9 items-center justify-center rounded-full bg-[#242424] text-[#c7a24a] md:flex">
            <span className="flex items-end gap-0.5">
              <i className="h-2 w-1 bg-current" /><i className="h-4 w-1 bg-current" /><i className="h-3 w-1 bg-current" /><i className="h-5 w-1 bg-current" />
            </span>
          </span>
          <Link href="/#contact" className="hidden rounded-full bg-[#c7a24a] px-4 py-2.5 text-xs font-semibold text-[#0b0b0b] transition-transform hover:scale-105 md:block">Say hello ↗</Link>
          <Link
            href="/#contact"
            aria-label="Contact Ali Raza"
            className="flex size-11 items-center justify-center rounded-full bg-[#242424] text-[#c7a24a] transition-transform hover:scale-105 md:hidden"
          >
            <span className="flex items-end gap-0.5" aria-hidden="true">
              <i className="h-3 w-1 bg-current" />
              <i className="h-5 w-1 bg-current" />
              <i className="h-4 w-1 bg-current" />
              <i className="h-6 w-1 bg-current" />
            </span>
          </Link>
        </div>
      </header>

      <motion.div
        id="portfolio-menu"
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-[#0b0b0b]/95 px-6 backdrop-blur-2xl"
      >
        <nav aria-label="Portfolio menu" className="grid w-full max-w-2xl gap-2">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-baseline justify-between border-b border-white/10 py-3 text-4xl font-semibold uppercase tracking-[-0.04em] text-[#f4f0e7] transition-colors hover:text-[#c7a24a] sm:text-6xl"
            >
              <span>{item.label}</span>
              <span className="font-mono text-xs text-white/35">0{index + 1}</span>
            </Link>
          ))}
        </nav>
      </motion.div>
    </>
  )
}
