'use client'

import { motion } from 'framer-motion'

import { projects } from '@/lib/projects'
import { SectionHeading } from './section-heading'

const EASE = [0.22, 1, 0.36, 1] as const

/** Serious GitHub section — selected repositories, no vanity statistics. */
export function GitHubSection() {
  return (
    <section id="github" className="border-b border-border px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[100rem]">
        <SectionHeading
          eyebrow="GitHub"
          title="The code is here."
          lede="Selected repositories — every claim on this site links back to source."
        />

        <div className="border-t border-border">
          {projects.map((project, index) => (
            <motion.a
              key={project.slug}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
              className="group grid grid-cols-1 items-baseline gap-x-6 gap-y-2 border-b border-border py-5 transition-colors hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:grid-cols-[14rem_7rem_1fr_auto]"
            >
              <span className="flex items-baseline gap-3 font-mono text-sm text-foreground transition-colors group-hover:text-accent">
                <span aria-hidden="true" className="text-[10px] text-muted-foreground/50">
                  {project.index}
                </span>
                {project.slug}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent/80">
                {project.stack[0]}
              </span>
              <span className="text-sm leading-6 text-muted-foreground">
                {project.shortDescription}
              </span>
              <span
                aria-hidden="true"
                className="justify-self-end text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
              >
                ↗
              </span>
            </motion.a>
          ))}
        </div>

        <a
          href="https://github.com/ali-raza-py"
          target="_blank"
          rel="noreferrer"
          data-cursor="open"
          className="group mt-8 inline-flex items-center gap-3 border-b border-foreground/70 pb-1 font-mono text-xs uppercase tracking-[0.24em] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          github.com/ali-raza-py
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>
      </div>
    </section>
  )
}