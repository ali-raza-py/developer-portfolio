'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const EASE = [0.22, 1, 0.36, 1] as const

const statusColumns = [
  {
    label: 'Implemented',
    items: [
      'PRD, architecture, roadmap, progress docs',
      'Evidence-based status vocabulary',
      'Explicit MVP non-goals',
    ],
    tone: 'text-accent',
  },
  {
    label: 'In progress',
    items: ['MVP definition (P0)', 'Stack + architecture decisions'],
    tone: 'text-foreground',
  },
  {
    label: 'Planned',
    items: [
      'Repository foundation + checks',
      'Learner entry → practice → build → proof of work',
      'Feedback and progression workflows',
    ],
    tone: 'text-muted-foreground',
  },
]

/** Keeps the portfolio alive: what is being built right now, honestly. */
export function CurrentlyBuilding() {
  return (
    <section
      id="currently-building"
      className="grain relative overflow-hidden border-b border-border bg-card/50 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="relative mx-auto max-w-[100rem]">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Left: the announcement */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="tech-label flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              Currently building
            </p>

            <h2 className="mt-6 text-[clamp(3rem,7vw,5.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.035em] text-foreground">
              Code
              <wbr />
              -Yaar
              <span className="text-accent">.</span>
            </h2>

            <p className="mt-4 display text-2xl italic text-muted-foreground sm:text-3xl">
              Think. Build. Evolve.
            </p>

            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              A student-focused software engineering platform — intended to move
              learners from passive tutorials to real projects and proof of
              work. Today it lives as a disciplined product-definition suite:
              PRD, architecture, MVP roadmap, and a status report that admits
              exactly what does and does not exist yet.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                href="/projects/code-yaar"
                data-cursor="view"
                className="group inline-flex items-center gap-3 border-b border-foreground/70 pb-1 font-mono text-xs uppercase tracking-[0.24em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Read the case study
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
              <a
                href="https://github.com/ali-raza-py/Code-Yaar"
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
              >
                Repository ↗
              </a>
            </div>
          </motion.div>

          {/* Right: honest status board */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="border border-border bg-background"
            aria-label="Code-Yaar project status"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                Status board
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/60">
                Source: docs/CURRENT-PROGRESS.md
              </span>
            </div>

            <div className="divide-y divide-border">
              {statusColumns.map((column) => (
                <div key={column.label} className="px-5 py-5">
                  <p
                    className={`font-mono text-[11px] uppercase tracking-[0.22em] ${column.tone}`}
                  >
                    {column.label}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {column.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-muted-foreground"
                      >
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-accent/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}