'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpenText, Layers3 } from 'lucide-react'

import { SectionHeading } from './section-heading'

const cards = [
  {
    icon: Layers3,
    title: 'Projects',
    description:
      'Explore premium case studies, live demos, and detailed build breakdowns from the portfolio.',
    href: '/projects',
    cta: 'View Projects',
  },
  {
    icon: BookOpenText,
    title: 'Blog',
    description:
      'Read markdown-powered articles about workflows, learning notes, and shipping software.',
    href: '/blog',
    cta: 'Read Blog',
  },
]

export function PortfolioLinks() {
  return (
    <section className="px-6 py-24" id="portfolio-links">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Deep dives" title="Projects & Writing" />
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -5 }}
              className="glass group rounded-3xl p-7"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <card.icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                {card.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                {card.cta}
                <ArrowRight className="size-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
