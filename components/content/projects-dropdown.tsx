'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowUpDown,
  Bot,
  ChevronDown,
  Folder,
  GraduationCap,
  HeartPulse,
  Network,
} from 'lucide-react'
import { useEffect, useRef, useState, type ComponentType } from 'react'

import { navProjects } from '@/lib/projects'
import { cn } from '@/lib/utils'

type ProjectIcon = ComponentType<{
  size?: number | string
  className?: string
  strokeWidth?: number | string
}>

const PROJECT_ICONS: Record<string, ProjectIcon> = {
  'ai-hub': Bot,
  'medicare-ai': HeartPulse,
  algorify: ArrowUpDown,
  'dsa-vizer': Network,
  'code-yaar': GraduationCap,
}

const EASE = [0.22, 1, 0.36, 1] as const

type ProjectsDropdownProps = {
  /** Classes for the trigger button — match the surrounding nav link styles. */
  triggerClassName?: string
  /** Classes for the floating panel. */
  panelClassName?: string
  /** Force-close while a parent mobile menu is open. */
  menuOpen?: boolean
  /** Called when a project is selected, e.g. to close a parent mobile menu. */
  onNavigate?: () => void
}

export function ProjectsDropdown({
  triggerClassName,
  panelClassName,
  menuOpen,
  onNavigate,
}: ProjectsDropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [menuOpen])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={cn('flex items-center', triggerClassName)}
      >
        Projects
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className={cn(
            'ml-1 opacity-60 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.96, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: -8, scale: 0.96, x: '-50%' }}
            transition={{ duration: 0.18, ease: EASE }}
            className={cn(
              'absolute left-1/2 top-full z-50 mt-2 w-[min(16rem,calc(100vw_-_2rem))] rounded-2xl border border-white/10 bg-[#121311]/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl',
              panelClassName,
            )}
          >
            {navProjects.map((project) => {
              const Icon = PROJECT_ICONS[project.slug] ?? Folder
              return (
                <Link
                  key={project.slug}
                  href={project.href}
                  role="menuitem"
                  onClick={() => {
                    setOpen(false)
                    onNavigate?.()
                  }}
                  className="group flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors duration-150 hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/6">
                    <Icon
                      size={16}
                      strokeWidth={1.8}
                      className="text-white/70 transition-colors duration-150 group-hover:text-[#c7a24a]"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-white/85">
                      {project.name}
                    </span>
                    <span className="block truncate text-[11px] leading-4 text-white/45">
                      {project.description}
                    </span>
                  </span>
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
