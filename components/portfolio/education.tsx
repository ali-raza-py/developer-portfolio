'use client'

import { motion } from 'framer-motion'
import { CalendarRange, GraduationCap, School2, BadgeCheck } from 'lucide-react'

import { SectionHeading } from './section-heading'

const education = [
  {
    icon: School2,
    title: 'Intermediate in Computer Science',
    school: 'PECHS Government Science College, Karachi',
    detail: '2026 – Present',
    description:
      'Building a stronger foundation in programming, mathematics, and logical reasoning while continuing toward software engineering and computer science.',
  },
  {
    icon: BadgeCheck,
    title: 'Matriculation (Secondary School Certificate) — Science',
    school: 'Qamar Bani Hashim Higher Secondary School (QBHSS), Karachi',
    detail: 'Completed — 84% overall',
    description:
      'Completed matriculation in the science group with an overall 84% and a strong base for future technical study.',
  },
  {
    icon: CalendarRange,
    title: 'STEAM UP STEM Enrichment Program',
    school: 'Conducted at QBHSS, Karachi',
    detail: '2025 – Present',
    description:
      'Hands-on STEM learning focused on Python programming, Data Structures & Algorithms, and practical experimentation.',
  },
]

export function Education() {
  return (
    <section className="px-6 py-24" id="education">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Education" title="Academic Background" />
        <div className="grid gap-5 lg:grid-cols-3">
          {education.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="glass flex flex-col gap-4 rounded-2xl p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-5" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-foreground/80">{item.school}</p>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {item.detail}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
