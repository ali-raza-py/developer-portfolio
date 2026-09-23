'use client'

import { motion } from 'framer-motion'

import { SectionHeading } from './section-heading'

const EASE = [0.22, 1, 0.36, 1] as const

const facts = [
  { label: 'Now', value: 'Class XI Computer Science — PECHS Government Science College, Karachi' },
  { label: '2026', value: 'Intermediate in Computer Science — in progress' },
  { label: 'Earlier', value: 'Matriculation (Science), QBHSS — 84%' },
  { label: 'Also', value: 'STEAM UP STEM enrichment — Python, DSA, hands-on projects' },
]

/** Editorial story replacing the generic About block. */
export function About() {
  return (
    <section id="about" className="border-b border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[100rem]">
        <SectionHeading eyebrow="About" title="I learn by building." />

        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          {/* The story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-2xl space-y-6 text-base leading-8 text-muted-foreground sm:text-lg"
          >
            <p>
              I&apos;m a computer science student in Karachi on a software
              engineering path. I write{' '}
              <span className="text-foreground">Python</span> and{' '}
              <span className="text-foreground">C++</span>, build full-stack
              products with <span className="text-foreground">Next.js</span>, and
              study algorithms by implementing them — not by watching videos
              about them.
            </p>
            <p>
              The work so far spans a medical-document intelligence prototype
              for a national hackathon, a 102-tool AI reference generated from a
              single validated registry, and a sorting laboratory that made me
              actually understand the algorithms I had only memorized.
            </p>
            <p>
              Direction from here:{' '}
              <span className="text-foreground">AI/ML</span>,{' '}
              <span className="text-foreground">cloud</span>,{' '}
              <span className="text-foreground">DevOps</span>,{' '}
              <span className="text-foreground">cybersecurity</span>, and the
              systems underneath all of it. I&apos;m early in this career — the
              evidence is in the repositories, not in adjectives.
            </p>

            <blockquote className="border-l-2 border-accent/70 pl-6">
              <p className="display text-2xl italic leading-snug text-foreground sm:text-[1.75rem]">
                Fundamentals before frameworks. Evidence over claims.
              </p>
            </blockquote>
          </motion.div>

          {/* Timeline facts — verified only */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="self-start border-t border-border"
          >
            {facts.map((fact) => (
              <div
                key={fact.label + fact.value}
                className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border py-5"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/80">
                  {fact.label}
                </dt>
                <dd className="text-sm leading-6 text-muted-foreground">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}