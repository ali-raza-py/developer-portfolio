'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { experiments, projects } from '@/lib/projects'
import { SectionHeading } from './section-heading'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Editorial project index — different visual weights, no card grid.
 * The top project dominates; secondary entries sit in a split row.
 */
export function SelectedWork() {
  const primary = projects[0]
  const secondary = projects.slice(1, 3)

  return (
    <section id="work" className="border-b border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[100rem]">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects that prove the learning."
          lede="Real repositories with case studies — architecture, decisions, and honest outcomes."
        />

        {/* 01: dominant entry */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Link
            href={`/projects/${primary.slug}`}
            data-cursor="view"
            className="group block border-t border-border py-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 lg:py-14"
          >
            <article className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-12">
              <span className="display text-5xl leading-none text-muted-foreground/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent lg:text-6xl">
                {primary.index}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h3 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-foreground transition-colors group-hover:text-accent">
                    {primary.title}
                  </h3>
                  <span className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {primary.statusLabel}
                  </span>
                </div>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                  {primary.tagline}
                </p>

                {/* Metadata reveals itself on hover */}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70">
                  <span className="text-accent/80">{primary.category}</span>
                  <span>{primary.year}</span>
                  <span className="hidden sm:inline">—</span>
                  <span className="hidden truncate sm:inline">
                    {primary.stack.slice(0, 5).join(' / ')}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-2 text-foreground">
                    Read case study
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>

              {/* Mini architecture preview — technical, not decorative */}
              <div
                aria-hidden="true"
                className="hidden w-56 shrink-0 flex-col gap-1.5 border-l border-border pl-6 font-mono text-[10px] leading-4 tracking-[0.08em] text-muted-foreground/60 xl:flex"
              >
                {primary.architecture.steps.slice(0, 5).map((step) => (
                  <span key={step.label} className="truncate">
                    <span className="text-accent/60">└ </span>
                    {step.label}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        </motion.div>
        {/* 02–03: secondary entries in a split row */}
        <div className="grid border-t border-border lg:grid-cols-2">
          {secondary.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
            >
              <Link
                href={`/projects/${project.slug}`}
                data-cursor="view"
                className={`group flex h-full flex-col justify-between gap-4 py-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 lg:py-11 ${
                  index === 0 ? 'lg:border-r lg:border-border lg:pr-10' : 'lg:pl-10'
                }`}
              >
                <article>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-muted-foreground/60 transition-colors group-hover:text-accent">
                      {project.index}
                    </span>
                    <h3 className="text-2xl font-semibold uppercase tracking-[-0.02em] text-foreground transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                      {project.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="ml-auto text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    {project.shortDescription}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                    {project.category} · {project.stack.slice(0, 4).join(' / ')}
                  </p>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Index footer — points to the full archive */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Plus Algorify and {experiments.length} smaller repositories —
            algorithms, coursework, and experiments in the full archive.
          </p>
          <Link
            href="/projects"
            data-cursor="view"
            className="group inline-flex items-center gap-3 border-b border-foreground/70 pb-1 font-mono text-xs uppercase tracking-[0.24em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Full project archive
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}