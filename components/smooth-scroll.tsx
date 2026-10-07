'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null
gsap.registerPlugin(ScrollTrigger)

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

    const onTick = (time: number) => lenis.raf(time * 1000)
    const onScroll = () => ScrollTrigger.update()
    gsap.ticker.add(onTick)
    lenis.on('scroll', onScroll)
    gsap.ticker.lagSmoothing(0)

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
      gsap.ticker.remove(onTick)
      lenis.off('scroll', onScroll)
      document.removeEventListener('click', onClick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return null
}