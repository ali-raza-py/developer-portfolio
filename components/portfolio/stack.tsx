'use client'

import { motion } from 'framer-motion'

import { SectionHeading } from './section-heading'

const EASE = [0.22, 1, 0.36, 1] as const

const groups = [
  {
    label: 'Building with',
    hint: 'Used in shipped projects',
    items: ['Python', 'Next.js', 'TypeScript', 'React', 'Dash', 'Plotly'],
  },
  {
    label: 'Learning',
    hint: 'Active study, coursework',
    items: ['C++', 'Data Structures', 'Algorithms', 'Django', 'FastAPI', 'PostgreSQL'],
  },
  {
    label: 'Exploring',
    hint: 'Research direction',
    items: ['AI / ML', 'Cloud', 'DevOps', 'Cybersecurity'],
  },
]

/** Structured system — three columns of hairline rows, not a badge wall. */
export function Stack() {
  return (
    <section id="stack" className="border-b border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[100rem]">
        <SectionHeading
          eyebrow="Engineering stack"
          title="A system, not a sticker sheet."
          lede="Grouped by how I actually use them — shipping, studying, or exploring."
        />

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1, ease: EASE }}
              className="bg-background p-6 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
                  {group.label}
                </h3>
                <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground/60">
                  {group.hint}
                </span>
              </div>
              <ul className="mt-2">
                {group.items.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-baseline justify-between border-b border-border/60 py-3 last:border-b-0"
                  >
                    <span className="text-base tracking-tight text-foreground sm:text-lg">
                      {item}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}