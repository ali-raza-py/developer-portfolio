'use client'

import { motion } from 'framer-motion'
import {
  Braces,
  Network,
  Globe,
  GraduationCap,
  FolderGit2,
  Cloud,
} from 'lucide-react'
import { SectionHeading } from './section-heading'

const focusItems = [
  {
    icon: Braces,
    title: 'Python & Object-Oriented Programming',
    description:
      'Strengthening core Python concepts while improving clean code practices and OOP principles.',
  },
  {
    icon: Network,
    title: 'Data Structures & Algorithms',
    description:
      'Learning algorithms and problem-solving techniques through consistent practice and project implementation.',
  },
  {
    icon: Globe,
    title: 'Modern Web Development',
    description:
      'Building responsive web applications while learning Next.js, TypeScript, and Tailwind CSS.',
  },
  {
    icon: GraduationCap,
    title: 'Computer Science Preparation',
    description:
      'Preparing for university by strengthening programming fundamentals, logical reasoning, and software engineering concepts.',
  },
  {
    icon: FolderGit2,
    title: 'GitHub Portfolio',
    description:
      'Continuously improving GitHub repositories with well-documented projects and clean commit history.',
  },
  {
    icon: Cloud,
    title: 'AI • DevOps • Cloud',
    description:
      'Exploring modern AI tools, DevOps practices, and cloud computing fundamentals for long-term career growth.',
  },
]

export function CurrentFocus() {
  return (
    <section className="px-6 py-24" id="current-focus">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="What I&apos;m working on" title="Current Focus" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {focusItems.map((item, index) => (
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
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
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
