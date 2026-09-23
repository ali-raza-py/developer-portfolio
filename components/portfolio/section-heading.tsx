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
        centered ? 'mb-14 flex flex-col items-center gap-5 text-center' : 'mb-14 flex flex-col gap-5'
      }
    >
      <span className="tech-label flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-balance font-semibold leading-[0.95] tracking-[-0.03em] text-foreground text-[clamp(2.2rem,5vw,3.75rem)]">
        {title}
      </h2>
      {lede ? (
        <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          {lede}
        </p>
      ) : null}
    </motion.div>
  )
}
