'use client'

import { motion } from 'framer-motion'
import {
  Rocket,
  GitPullRequest,
  Trophy,
  GraduationCap,
  Code,
  Cloud,
} from 'lucide-react'
import { SectionHeading } from './section-heading'

const milestones = [
  {
    icon: Rocket,
    title: 'Build production-quality software projects',
  },
  {
    icon: GitPullRequest,
    title: 'Contribute to open-source software',
  },
  {
    icon: Trophy,
    title: 'Participate in national and international hackathons',
  },
  {
    icon: GraduationCap,
    title: "Pursue a Bachelor's degree in Computer Science",
  },
  {
    icon: Code,
    title: 'Develop expertise in Software Engineering',
  },
  {
    icon: Cloud,
    title: 'Specialize in DevOps and Cloud Engineering',
  },
]

export function FutureGoals() {
  return (
    <section className="px-6 py-24" id="future-goals">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="The road ahead" title="Future Goals" />
        <ol className="relative">
          {milestones.map((milestone, index) => (
            <li key={milestone.title} className="relative flex gap-6 pb-4 last:pb-0">
              {/* Node + connecting line */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                  className="glass z-10 flex size-11 shrink-0 items-center justify-center rounded-full text-primary"
                >
                  <milestone.icon className="size-5" aria-hidden="true" />
                </motion.div>
                {index < milestones.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.2,
                      ease: 'easeOut',
                    }}
                    className="w-px flex-1 origin-top bg-gradient-to-b from-primary/50 to-primary/10"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Milestone card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + 0.1,
                  ease: 'easeOut',
                }}
                className="glass mb-4 flex-1 rounded-2xl p-5 transition-colors hover:border-primary/30"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {`Milestone ${String(index + 1).padStart(2, '0')}`}
                </span>
                <h3 className="mt-1 text-pretty text-base font-semibold tracking-tight text-foreground">
                  {milestone.title}
                </h3>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
