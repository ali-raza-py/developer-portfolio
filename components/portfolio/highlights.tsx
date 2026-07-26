'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from './section-heading'

const badges = [
  'Class XI Computer Science Student',
  '84% SSC (Matric)',
  'Python Developer',
  'Active GitHub Portfolio',
  'Learning Data Structures & Algorithms',
  'Exploring AI',
  'Exploring DevOps',
  'Exploring Cloud Computing',
  'Continuous Learner',
]

export function Highlights() {
  return (
    <section className="px-6 py-24" id="highlights">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="At a glance" title="Highlights" />
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge, index) => (
            <motion.li
              key={badge}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="glass cursor-default rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {badge}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
