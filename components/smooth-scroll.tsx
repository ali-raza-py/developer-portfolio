'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

/**
 * Smooth scrolling via Lenis — fine pointers only, never under
 * prefers-reduced-motion. Also intercepts in-page anchor links so #work and
 * #about glide instead of jumping.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const lenis = new Lenis({ lerp: 0.11 })
    lenisInstance = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -96 })
    }

    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return null
}