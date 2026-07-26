'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from './section-heading'

export function Philosophy() {
  return (
    <section className="relative px-6 py-24" id="philosophy">
      {/* Subtle lighting effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[640px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,oklch(0.62_0.19_255/0.08),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading eyebrow="How I think" title="Developer Philosophy" />
        <motion.figure
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass relative overflow-hidden rounded-3xl p-10 md:p-14"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="font-serif absolute left-6 top-4 text-7xl leading-none text-primary/25"
          >
            {'\u201C'}
          </span>
          <blockquote className="relative">
            <p className="text-balance text-center text-xl font-medium leading-relaxed tracking-tight text-foreground md:text-2xl">
              I believe that strong software engineers are built through
              consistent practice, curiosity, and a deep understanding of
              computer science fundamentals. My goal is to learn by building
              projects rather than simply completing tutorials.
            </p>
          </blockquote>
        </motion.figure>
      </div>
    </section>
  )
}
