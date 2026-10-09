'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AmbientAudioControls } from '@/components/ambient-audio'
import { ProjectsDropdown } from '@/components/content/projects-dropdown'
import { navProjects } from '@/lib/projects'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function SiteHeader({ className }: { className?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const sectionHref = (id: string) => {
    if (id === 'top') return '/'
    const screen = id === 'journey' ? 'experience' : id
    return `/?screen=${screen}`
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={cn('game-nav-wrap', className)}>
        <div className="game-nav">
          <Link href="/" className="game-nav-brand" aria-label="Ali Raza home">
            <span className="game-brand-cube" aria-hidden="true" />
            <span>ALI RAZA</span>
          </Link>
          <nav className="game-nav-links" aria-label="Main navigation">
            <Link href={sectionHref('about')}>About</Link>
            <ProjectsDropdown triggerClassName="game-nav-projects" />
            <Link href={sectionHref('journey')} className="game-nav-journey">Journey</Link>
            <Link href={sectionHref('skills')}>Skills</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/resume">Resume</Link>
          </nav>
          <AmbientAudioControls compact />
          <Link href={sectionHref('contact')} className="game-nav-contact">
            Contact <span aria-hidden="true">↗</span>
          </Link>
          <button
            type="button"
            className="game-nav-menu-button"
            aria-expanded={menuOpen}
            aria-controls="game-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="game-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="game-mobile-menu"
          >
            <nav aria-label="Portfolio navigation">
              <Link href={sectionHref('top')} onClick={closeMenu}>Start</Link>
              {sections.map((section) => (
                <Link key={section.id} href={sectionHref(section.id)} onClick={closeMenu}>
                  {section.label}
                </Link>
              ))}
              <Link href="/projects" onClick={closeMenu}>Project archive</Link>
              {navProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={project.href}
                  target={project.href.startsWith('/') ? undefined : '_blank'}
                  rel={project.href.startsWith('/') ? undefined : 'noopener noreferrer'}
                  onClick={closeMenu}
                >
                  <span>{project.name}</span>
                  <small>{project.description}</small>
                </Link>
              ))}
              <Link href="/blog" onClick={closeMenu}>Blog</Link>
              <Link href="/resume" onClick={closeMenu}>Resume</Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
