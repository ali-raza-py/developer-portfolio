'use client'

import { motion } from 'framer-motion'

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
}: {
  eyebrow: string
  title: string
  lede?: string
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={
        centered
          ? 'mb-14 flex flex-col items-center gap-5 text-center'
          : 'mb-14 flex flex-col gap-5'
      }
    >
      <span
        className={
          centered
            ? 'flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-primary'
            : 'flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-primary'
        }
      >
        <span aria-hidden="true" className="h-px w-8 bg-primary/50" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-balance text-4xl font-normal leading-[1.05] tracking-tight text-foreground md:text-6xl">
        {title}
      </h2>
      {lede ? (
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {lede}
        </p>
      ) : null}
    </motion.div>
  )
}
