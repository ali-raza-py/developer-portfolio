'use client'

import { motion } from 'framer-motion'
import {
  GitBranch,
  BookOpen,
  Terminal,
  Users,
  TrendingUp,
} from 'lucide-react'
import { SectionHeading } from './section-heading'

const items = [
  {
    icon: GitBranch,
    title: 'Active GitHub Profile',
    description:
      'Maintain an active GitHub profile showcasing projects, experiments, and continuous learning.',
  },
  {
    icon: BookOpen,
    title: 'Always Exploring',
    description:
      'Regularly explore new technologies through documentation, online courses, and hands-on development.',
  },
  {
    icon: Terminal,
    title: 'Developer Tooling',
    description:
      'Comfortable working with Git and Visual Studio Code for personal software projects.',
  },
  {
    icon: Users,
    title: 'Community & Collaboration',
    description:
      'Interested in hackathons, open-source collaboration, and developer communities.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Mindset',
    description:
      'Strong believer in continuous self-improvement and lifelong learning.',
  },
]

export function AdditionalInfo() {
  return (
    <section className="px-6 py-24" id="additional-information">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Beyond the classroom"
          title="Additional Information"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              whileHover={{ y: -4 }}
              className="glass group flex flex-col gap-4 rounded-2xl p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <item.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
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
