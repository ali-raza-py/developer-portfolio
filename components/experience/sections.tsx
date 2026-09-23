'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { experience } from '@/lib/experience'
import { projects } from '@/lib/projects'

const EASE = [0.22, 1, 0.36, 1] as const

function SceneEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <p className="tech-label flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-8 bg-accent/70" />
      Scene {index} — {label}
    </p>
  )
}

/** Hover/focus a project row anywhere on the page → its 3D panel responds. */
function useProjectHover() {
  return {
    highlight: (slug: string) => {
      experience.hoverSlug = slug
    },
    clear: () => {
      experience.hoverSlug = null
    },
  }
}

/** True on touch devices — progressive content stays open without hover. */
function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false)
  useEffect(() => {
    setCoarse(window.matchMedia('(pointer: coarse)').matches)
  }, [])
  return coarse
}

/* ————————————————— SCENE 01 — INTRODUCTION ————————————————— */

export function IntroScene() {
  const reduced = useReducedMotion()

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        }

  return (
    <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-28 pt-28 sm:px-10 sm:pb-32 lg:justify-center lg:px-16 lg:pb-24 lg:pt-24">
      {/* Readability scrims — left-weighted so the 3D owns the right half */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0B0B0C_0%,rgba(11,11,12,0.86)_40%,rgba(11,11,12,0.2)_68%,rgba(11,11,12,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/70 to-transparent"
      />

      <div className="relative max-w-2xl">
        <motion.p {...rise(0.05)} className="tech-label flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-10 bg-accent/70" />
          Enter the workspace — portfolio 2026
        </motion.p>

        <motion.h1
          {...rise(0.14)}
          className="mt-7 text-[clamp(3rem,7.5vw,6.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-foreground"
        >
          Ali
          <br />
          Raza<span className="text-accent">.</span>
        </motion.h1>

        <motion.div {...rise(0.26)} className="mt-7 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span aria-hidden="true" className="h-px w-12 bg-border" />
          <p className="text-lg font-medium tracking-tight text-foreground sm:text-xl">Software Engineer</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            AI · Full-Stack · Systems
          </p>
        </motion.div>

        <motion.p
          {...rise(0.34)}
          className="mt-5 max-w-md text-pretty text-base leading-7 text-muted-foreground sm:text-lg"
        >
          Building intelligent software, interactive systems, and ambitious products.
        </motion.p>

        <motion.div {...rise(0.46)} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#work"
            data-cursor="view"
            className="group relative inline-flex items-center gap-3 overflow-hidden border border-accent/70 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.26em] text-foreground transition-colors duration-300 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-accent/15 transition-transform duration-500 ease-out group-hover:translate-x-0"
            />
            <span className="relative">View work</span>
            <span
              aria-hidden="true"
              className="relative transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
          <a
            href="#about"
            className="group inline-flex items-center gap-3 border-b border-foreground/40 pb-1 font-mono text-xs uppercase tracking-[0.26em] text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            About me
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </motion.div>

        <motion.p {...rise(0.58)} className="mt-12 font-mono text-[10px] leading-5 tracking-[0.2em] text-muted-foreground/70">
          KARACHI, PK — 24.86°N 67.01°E
          <span className="mx-2 hidden sm:inline">·</span>
          <br className="sm:hidden" />
          CLASS XI CS · PYTHON / C++ / FULL-STACK / AI
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
      >
        <span className="h-12 w-px bg-gradient-to-b from-transparent via-border to-foreground/50" />
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
      </motion.div>
    </section>
  )
}

/**
 * SCENE 02 — IDENTITY: editorial copy left, the floating portrait display
 * occupies the right half of the 3D frame. The caption below points at it.
 */
export function IdentityScene() {
  const facts: [string, string][] = [
    ['Now', 'Building Code-Yaar — and case studies for every project listed here'],
    ['Base', 'Karachi, Pakistan — 24.86°N 67.01°E'],
    ['Focus', 'AI · Full-stack product · Systems underneath'],
    ['Track', 'Class XI Computer Science — Python, C++, Next.js'],
  ]

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 sm:px-10 lg:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0B0B0C_0%,rgba(11,11,12,0.84)_42%,rgba(11,11,12,0.16)_70%,rgba(11,11,12,0)_100%)]"
      />

      <div className="relative w-full max-w-xl">
        <SceneEyebrow index="02" label="Identity" />

        <h2 className="mt-6 text-[clamp(2.3rem,4.6vw,4rem)] font-semibold uppercase leading-[0.92] tracking-[-0.035em] text-foreground">
          The person
          <br />
          behind the workspace<span className="text-accent">.</span>
        </h2>

        <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
          Not a profile picture in a circle — a portrait rendered as an object in this room,
          lit from behind, partially masked by the structure in front of it.
        </p>

        <dl className="mt-10 border-t border-border">
          {facts.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-border py-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/80">{label}</dt>
              <dd className="text-sm leading-6 text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Caption pointing at the 3D portrait display */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-10 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 lg:block xl:right-16"
      >
        Fig. 01 — portrait · floating display
      </p>
    </section>
  )
}

/**
 * SCENE 03 — WORK: the camera swings left as the environment expands.
 * DOM side: a compact project index — hovering a row focuses its 3D panel.
 */
export function WorkScene() {
  const { highlight, clear } = useProjectHover()

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 sm:px-10 lg:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,#0B0B0C_0%,rgba(11,11,12,0.85)_44%,rgba(11,11,12,0.14)_72%,rgba(11,11,12,0)_100%)]"
      />

      <div className="relative ml-auto w-full max-w-2xl">
        <SceneEyebrow index="03" label="Work" />

        <h2 className="mt-6 text-[clamp(2.3rem,4.6vw,4rem)] font-semibold uppercase leading-[0.92] tracking-[-0.035em] text-foreground">
          Work that lives
          <br />
          outside this website<span className="text-accent">.</span>
        </h2>

        <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
          Four projects with real repositories and full case studies — rendered in this room as
          physical screens. Point at one and watch it turn toward you.
        </p>

        <div className="mt-10 border-t border-border">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-cursor="view"
              onMouseEnter={() => highlight(project.slug)}
              onMouseLeave={clear}
              onFocus={() => highlight(project.slug)}
              onBlur={clear}
              className="group flex items-baseline gap-4 border-b border-border py-4 transition-colors duration-300 hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              <span className="font-mono text-xs text-accent/70 transition-colors group-hover:text-accent">
                {project.index}
              </span>
              <span className="text-xl font-semibold uppercase tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                {project.title}
              </span>
              <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 sm:block">
                {project.category}
              </span>
              <span
                aria-hidden="true"
                className="text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              >
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
          <span>4 case studies · 6 experiments · every claim links to source</span>
          <Link
            href="/projects"
            data-cursor="view"
            className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-0.5 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Full archive
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

/**
 * SCENE 04 — PROJECTS: the camera pushes into the panel cluster. Rows reveal
 * information progressively — name and thesis first; role, stack, achievement,
 * and links appear on hover/focus (staying open on touch devices).
 */
export function ProjectsScene() {
  const { highlight, clear } = useProjectHover()
  const coarse = useCoarsePointer()
  const [active, setActive] = useState<string | null>(null)

  const open = (slug: string) => {
    setActive(slug)
    highlight(slug)
  }
  const shut = () => {
    setActive(null)
    clear()
  }

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 sm:px-10 lg:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,#0B0B0C_0%,rgba(11,11,12,0.92)_40%,rgba(11,11,12,0.55)_66%,rgba(11,11,12,0.05)_100%)]"
      />

      <div className="relative ml-auto w-full max-w-2xl">
        <SceneEyebrow index="04" label="Projects" />

        <h2 className="mt-6 text-[clamp(2.1rem,4.2vw,3.5rem)] font-semibold uppercase leading-[0.94] tracking-[-0.035em] text-foreground">
          Four objects<span className="text-accent">,</span>
          <br />
          four case studies<span className="text-accent">.</span>
        </h2>

        <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
          Hover a project to open its dossier — and watch its screen lean out of the
          structure on the left.
        </p>

        <div className="mt-9">
          {projects.map((project) => {
            const expanded = coarse || active === project.slug
            return (
              <div
                key={project.slug}
                className="group border-t border-border last:border-b"
                onMouseEnter={() => open(project.slug)}
                onMouseLeave={shut}
                onFocusCapture={() => open(project.slug)}
                onBlurCapture={shut}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor="view"
                  className="block py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <span className="font-mono text-xs text-accent/70 transition-colors group-hover:text-accent">
                      {project.index}
                    </span>
                    <h3 className="text-[clamp(1.4rem,2.6vw,2rem)] font-semibold uppercase tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-accent">
                      {project.title}
                    </h3>
                    <span className="ml-auto border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {project.statusLabel}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:pl-8">
                    {project.tagline}
                  </p>
                </Link>

                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 sm:pl-8">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                        <span className="text-accent/80">Role</span> — {project.role}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                        <span className="text-accent/80">Key</span> — {project.architecture.caption}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em]">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="group-link inline-flex items-center gap-2 border-b border-foreground/40 pb-0.5 text-foreground transition-colors hover:border-accent hover:text-accent"
                        >
                          Case study
                          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="open"
                          className="inline-flex items-center gap-2 font-mono text-muted-foreground transition-colors hover:text-foreground"
                        >
                          GitHub
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
