'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const certifications = [
  { name: 'Google Gemini AI — Certified Student', issuer: 'Google' },
  { name: 'Anthropic Academy — MCP', issuer: 'Anthropic' },
  { name: 'MCP Advanced Topics', issuer: 'Anthropic Academy' },
  { name: 'GenAI Learning Badges', issuer: 'Google Cloud' },
  { name: 'Responsible AI Learning', issuer: 'Google' },
  { name: 'Python-related certifications', issuer: 'Various' },
]

/** Secondary by design — a quiet list, never a certificate wall. */
export function Certifications() {
  return (
    <section
      id="certifications"
      className="border-b border-border px-6 py-20 sm:px-10 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="tech-label flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              Certifications
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              Coursework,
              <br />
              quietly logged.
            </h2>
          </div>

          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid gap-px border border-border bg-border sm:grid-cols-2"
          >
            {certifications.map((certification) => (
              <li
                key={certification.name}
                className="flex flex-col justify-between gap-2 bg-background px-5 py-4"
              >
                <span className="text-sm leading-6 text-foreground">
                  {certification.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                  {certification.issuer}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}