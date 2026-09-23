'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

import { PortraitPanel } from './portrait-panel'

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  /* Scroll-linked physical movement: the panel recedes, rotates, and shifts
     toward the edge as the hero leaves the viewport — not just an opacity fade. */
  const panelZ = useTransform(scrollYProgress, [0, 1], [0, -320])
  const panelX = useTransform(scrollYProgress, [0, 1], [0, 90])
  const panelY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const panelRotate = useTransform(scrollYProgress, [0, 1], [0, -9])
  const panelScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const panelOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.9, 0.35])

  const textY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        }

  return (
    <section
      ref={sectionRef}
      className="grain relative overflow-hidden border-b border-border"
      aria-label="Introduction"
    >
      {/* Background treatment — oversized, blurred duplicate of the portrait */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <ImageBackdrop />
      </div>

      <div className="relative mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-12 px-6 pb-24 pt-16 sm:px-10 lg:min-h-[calc(100svh-6.5rem)] lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-8 lg:px-16 lg:pb-32 lg:pt-14 xl:grid-cols-[0.9fr_1.25fr]">
        {/* LEFT: editorial column */}
        <motion.div
          style={reduced ? undefined : { y: textY, opacity: textOpacity }}
          className="relative z-10 max-w-xl"
        >
          <motion.p {...rise(0.05)} className="tech-label flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-accent/70" />
            Portfolio — 2026
          </motion.p>

          <motion.h1
            {...rise(0.14)}
            className="mt-6 text-[clamp(3.4rem,9vw,7.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.035em] text-foreground"
          >
            Ali
            <br />
            Raza
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.div {...rise(0.26)} className="mt-7 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-12 bg-border" />
            <p className="text-base font-medium tracking-tight text-foreground sm:text-lg">
              Software Engineering Student
            </p>
          </motion.div>

          <motion.p
            {...rise(0.34)}
            className="mt-5 max-w-md text-pretty text-lg leading-8 text-muted-foreground"
          >
            I build software, explore AI, and turn what I learn into working
            systems.
          </motion.p>

          <motion.div
            {...rise(0.44)}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Link
              href="/projects"
              data-cursor="view"
              className="group inline-flex items-center gap-3 border-b border-foreground/70 pb-1 font-mono text-xs uppercase tracking-[0.24em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              Selected work
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
            <a
              href="https://github.com/ali-raza-py"
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              GitHub
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </motion.div>

          <motion.p
            {...rise(0.54)}
            className="mt-12 max-w-xs font-mono text-[10px] leading-5 tracking-[0.14em] text-muted-foreground/70"
          >
            CLASS XI COMPUTER SCIENCE — KARACHI, PK
            <br />
            PYTHON / C++ / FULL-STACK / AI
          </motion.p>
        </motion.div>
        {/* RIGHT: the 3D portrait object */}
        <div className="relative z-0 flex justify-center lg:justify-end">
          <motion.div
            style={
              reduced
                ? undefined
                : {
                    z: panelZ,
                    x: panelX,
                    y: panelY,
                    rotate: panelRotate,
                    scale: panelScale,
                    opacity: panelOpacity,
                    transformPerspective: 1600,
                  }
            }
            className="w-full max-w-[26rem] sm:max-w-md lg:max-w-lg xl:max-w-xl"
          >
            {!reduced ? (
              <motion.div
                initial={{ opacity: 0, y: 40, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                <PortraitPanel />
              </motion.div>
            ) : (
              <PortraitPanel />
            )}
          </motion.div>
        </div>
      </div>
      {/* Scroll hint — restrained */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="h-10 w-px bg-gradient-to-b from-transparent via-border to-foreground/50" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
      </motion.div>
    </section>
  )
}

/** Oversized blurred duplicate + offset monochrome crop behind the main object. */
function ImageBackdrop() {
  return (
    <div className="absolute inset-0">
      <img
        src="/images/portrait.png"
        alt=""
        aria-hidden="true"
        className="absolute -right-[12%] top-1/2 w-[70vw] max-w-[1100px] -translate-y-1/2 scale-110 opacity-[0.16] blur-[64px] grayscale dark:opacity-[0.2]"
      />
      <img
        src="/images/portrait.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-[-18%] right-[6%] hidden w-[26vw] max-w-[380px] -rotate-3 opacity-[0.07] grayscale blur-[1px] lg:block dark:opacity-[0.1]"
      />
      {/* Depth-separating vignette so the backdrop stays subordinate */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--background)_0%,transparent_45%,transparent_75%,var(--background)_100%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_92%)]" />
    </div>
  )
}