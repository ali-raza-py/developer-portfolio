'use client'

import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const links = [
  {
    label: 'Email',
    value: 'btwaliraza110@gmail.com',
    href: 'mailto:btwaliraza110@gmail.com?subject=Hello Ali',
    external: false,
  },
  {
    label: 'GitHub',
    value: 'github.com/ali-raza-py',
    href: 'https://github.com/ali-raza-py',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'in/ali-r-a8a144391',
    href: 'https://www.linkedin.com/in/ali-r-a8a144391',
    external: true,
  },
  {
    label: 'Resume',
    value: 'Download (.docx)',
    href: '/Ali_Raza_Resume.docx',
    external: false,
  },
]

/** Contact block — large type, direct channels, no form theatre. */
export function Contact() {
  return (
    <section id="contact" className="grain relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="relative mx-auto max-w-[100rem]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="tech-label flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
            Contact
          </p>

          <h2 className="mt-6 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5.5rem)] font-semibold uppercase leading-[0.92] tracking-[-0.035em] text-foreground">
            Let&apos;s build
            <br />
            something real
            <span className="text-accent">.</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Open to internships, collaborations, hackathons, and conversations
            about software engineering, AI, and systems.
          </p>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {links.map((link) => (
            <div key={link.label} className="bg-background">
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                data-cursor={link.external ? 'open' : undefined}
                className="group flex h-full flex-col justify-between gap-8 px-6 py-6 transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  {link.label}
                </dt>
                <dd className="flex items-end justify-between gap-3 text-sm text-foreground transition-colors group-hover:text-accent">
                  <span className="break-all">{link.value}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  >
                    {link.external ? '↗' : '→'}
                  </span>
                </dd>
              </a>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}