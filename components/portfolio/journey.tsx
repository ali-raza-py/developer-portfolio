'use client'

import { motion } from 'framer-motion'

import { SectionHeading } from './section-heading'

const EASE = [0.22, 1, 0.36, 1] as const

const stages = [
  {
    name: 'Programming',
    detail: 'First logic and syntax — school CS and STEAM UP STEM enrichment.',
    evidence: 'QBHSS / PECHS Govt Science College',
  },
  {
    name: 'Python',
    detail: 'OOP, NumPy, Pandas, Matplotlib — coursework plus small systems.',
    evidence: 'Bank management system, OOP-IN-PYTHON',
  },
  {
    name: 'Data structures',
    detail: 'Sorting algorithms implemented as an event-driven laboratory.',
    evidence: 'Algorify',
  },
  {
    name: 'Full stack',
    detail: 'Frontend to API to processing — a real multi-layer product.',
    evidence: 'MediCare AI',
  },
  {
    name: 'AI / ML',
    detail: 'OCR + LLM pipelines; structured, verified AI tooling research.',
    evidence: 'MediCare AI · AI-HUB',
  },
  {
    name: 'Systems',
    detail: 'Next: cloud, DevOps, cybersecurity — the layer underneath.',
    evidence: 'Direction — in study',
  },
]

/** Progression instead of invented years of experience. */
export function Journey() {
  return (
    <section id="journey" className="border-b border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[100rem]">
        <SectionHeading
          eyebrow="Learning journey"
          title="Progression, not job titles."
          lede="Each stage is tied to work that exists — repositories, coursework, or documented study."
        />

        <ol className="relative max-w-4xl">
          {/* Continuous spine */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[7px] top-4 w-px bg-[linear-gradient(to_bottom,var(--accent),var(--border))]"
          />

          {stages.map((stage, index) => (
            <motion.li
              key={stage.name}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
              className="group relative grid grid-cols-[2rem_1fr] gap-x-6 pb-10 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="relative z-10 mt-1.5 size-3.5 shrink-0 rotate-45 border border-accent bg-background transition-colors duration-300 group-hover:bg-accent"
              />
              <div className="-translate-y-1">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold uppercase tracking-[-0.02em] text-foreground sm:text-2xl">
                    {stage.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80">
                    {stage.evidence}
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  {stage.detail}
                </p>
                {index < stages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-full max-w-xl bg-border"
                  />
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}