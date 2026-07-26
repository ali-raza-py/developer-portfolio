'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Quote } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 md:pt-40">
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,oklch(0.62_0.19_255/0.12),transparent_65%)]"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <GraduationCap className="size-4 text-primary" aria-hidden="true" />
            Class XI Computer Science Student
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Building software from the fundamentals up
          </h1>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            PECHS Education Foundation Government Degree Science College
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="animated-border w-full"
        >
          <div className="glass rounded-2xl p-8 md:p-10">
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Motivated Class XI Computer Science student at PECHS Education
              Foundation Government Degree Science College with a strong
              interest in software engineering and computer science
              fundamentals. I enjoy building Python projects, solving
              algorithmic problems, and continuously improving my programming
              skills through hands-on learning. Currently exploring web
              development, DevOps, cloud computing, and modern AI technologies
              while maintaining an active GitHub portfolio. I believe in
              mastering fundamentals before frameworks and aim to contribute to
              open-source projects, hackathons, and real-world software
              development throughout my academic journey.
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <Quote className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-lg font-medium tracking-tight text-foreground">
                Fundamentals before Frameworks.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
