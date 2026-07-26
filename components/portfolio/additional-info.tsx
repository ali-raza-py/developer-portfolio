'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BadgeCheck, GitBranch, Mail, Twitter, Linkedin } from 'lucide-react'
import { SectionHeading } from './section-heading'

const items = [
  'Matriculation completed at QBHSS',
  'Studying at PECHS Government Science College, Karachi',
  'Focus: Python, C++, NumPy, Pandas, Matplotlib',
  'Interested in Software Engineering, DevOps, and Cloud',
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/ali-raza-py' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ali-r-a8a144391' },
  { label: 'Email', href: 'mailto:btwaliraza110@gmail.com' },
]

export function AdditionalInfo() {
  return (
    <section className="px-6 py-16" id="additional-information">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Beyond the classroom" title="Additional Information" />

        <div className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                <BadgeCheck className="size-3.5 text-primary" />
                Simple profile notes
              </div>

              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                A quick overview of my background, learning focus, and where to find me online.
              </p>

              <ul className="space-y-2 text-sm text-foreground">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <GitBranch className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="rounded-xl border border-border bg-muted/30 p-4"
              >
                <h3 className="text-sm font-semibold text-foreground">Social Links</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition hover:border-primary/30 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="rounded-xl border border-border bg-muted/30 p-4"
              >
                <h3 className="text-sm font-semibold text-foreground">Focus Areas</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Python, C++, NumPy, Pandas, Matplotlib, and building a strong CS foundation.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
