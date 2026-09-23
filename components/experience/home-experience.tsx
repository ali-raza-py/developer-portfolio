'use client'

import { MotionConfig, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { About } from '@/components/portfolio/about'
import { Contact } from '@/components/portfolio/contact'
import { SiteFooter } from '@/components/portfolio/site-footer'
import { Stack } from '@/components/portfolio/stack'
import { SCENES, experience } from '@/lib/experience'
import { IdentityScene, IntroScene, ProjectsScene, WorkScene } from './sections'
import { SceneHud, WorkspaceLayer } from './workspace'
/**
 * The homepage as one continuous 3D journey.
 *
 * A fixed WebGL stage paints behind everything; seven scenes scroll over it.
 * Scroll progress is mapped onto the *measured* top offset of each scene, so
 * the camera arrives at a keyframe exactly when its content does — regardless
 * of how tall any section ends up on a given screen.
 *
 * Wrappers for Stack/About/Contact carry no ids: those components already own
 * #stack / #about / #contact, and duplicate ids would be invalid HTML.
 */
export function HomeExperience() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    experience.progress = value
  })

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const measure = () => {
      const nodes = Array.from(container.querySelectorAll<HTMLElement>('[data-scene]'))
      const range = container.offsetHeight - window.innerHeight
      const boundaries = SCENES.map((_, index) => {
        const node = nodes[index]
        if (!node || range <= 0) return index / (SCENES.length - 1)
        return Math.min(1, Math.max(0, node.offsetTop / range))
      })
      boundaries[0] = 0
      boundaries[boundaries.length - 1] = 1
      // Strictly monotonic — segments can never collapse or invert.
      for (let i = 1; i < boundaries.length; i++) {
        if (boundaries[i] <= boundaries[i - 1]) {
          boundaries[i] = Math.min(1, boundaries[i - 1] + 1e-4)
        }
      }
      experience.boundaries = boundaries
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <WorkspaceLayer />
      <SceneHud />
      <div ref={scrollRef} className="relative z-10">
        <div data-scene="">
          <IntroScene />
        </div>
        <div data-scene="">
          <IdentityScene />
        </div>
        <div data-scene="" id="work">
          <WorkScene />
        </div>
        <div data-scene="" id="projects">
          <ProjectsScene />
        </div>
        {/* Engineering / About / Contact — existing sections, re-skinned by the
            workspace dark tokens and a scrim so they read over the scene. */}
        <div data-scene="" className="bg-gradient-to-b from-transparent via-[#0B0B0C]/85 to-[#0B0B0C]/93">
          <Stack />
        </div>
        <div data-scene="" className="bg-[#0B0B0C]/90">
          <About />
        </div>
        <div data-scene="" className="min-h-[90svh] bg-[#0B0B0C]/94">
          <Contact />
          <SiteFooter />
        </div>
      </div>
    </MotionConfig>
  )
}