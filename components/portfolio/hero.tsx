'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Cloud,
  Code2,
  Download,
  GitBranch,
  Mail,
  Moon,
  Server,
  Sparkles,
  Sun,
} from 'lucide-react'
import { type SVGProps, useEffect, useState } from 'react'
import { useTheme } from '@/components/theme-provider'

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6V21c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6A4.7 4.7 0 0 1 6.6 8c-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3a4.7 4.7 0 0 1 1.3 3.3c0 4.6-2.8 5.6-5.5 6 .4.4.8 1.1.8 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5Zm-2 6h4v11h-4v-11Zm7 0h3.8v1.6h.1c.5-.9 1.8-1.9 3.8-1.9 4 0 4.7 2.6 4.7 6v6.3h-4V15c0-1.3 0-3-1.8-3s-2.2 1.4-2.2 2.9v5.6h-4v-11Z" />
    </svg>
  )
}

const rotatingTitles = [
  'Software Engineering Student',
  'Python & C++ Developer',
  'Future Computer Scientist',
]

const techBadges = [
  { label: 'Python', icon: Code2 },
  { label: 'C++', icon: Sparkles },
  { label: 'NumPy', icon: Code2 },
  { label: 'Git', icon: GitBranch },
  { label: 'Pandas', icon: Code2 },
  { label: 'Matplotlib', icon: Sparkles },
  { label: 'AI', icon: Sparkles },
  { label: 'Cloud', icon: Cloud },
  { label: 'DevOps', icon: Server },
]

const snippetWords = [
  'vector<int> build(const vector<int>& data)',
  'import pandas as pd',
  'import numpy as np',
  'plt.plot(x, y)',
  'def solve(problem): return iterate(problem)',
]

const stats = [
  { value: 'Tools', label: 'Git, Github & Vs code' },
  { value: 'Class XI', label: 'Computer Science' },
  { value: 'Python', label: 'Developer' },
  { value: 'Learning', label: 'C++, NumPy & Pandas' },
]

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const finishedTyping = displayed === currentWord
    const finishedDeleting = displayed.length === 0
    const delay = isDeleting ? 45 : 80

    const timeout = setTimeout(
      () => {
        if (!isDeleting && finishedTyping) {
          setIsDeleting(true)
          return
        }

        if (isDeleting && finishedDeleting) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
          return
        }

        setDisplayed((prev) => {
          if (isDeleting) {
            return currentWord.slice(0, prev.length - 1)
          }

          return currentWord.slice(0, prev.length + 1)
        })
      },
      finishedTyping && !isDeleting ? 1300 : delay
    )

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, words])

  return displayed
}

export function Hero() {
  const typedTitle = useTypewriter(rotatingTitles)
  const reduceMotion = useReducedMotion()
  const { theme, toggleTheme } = useTheme()

  return (
    <section className="relative min-h-screen overflow-hidden bg-background px-6 pb-28 pt-24 text-foreground md:px-10 md:pt-20 lg:px-14 transition-colors duration-300">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[var(--hero-radial)]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-25 dark:opacity-10 [background-image:var(--hero-grid)]"
        />

        {Array.from({ length: 14 }).map((_, index) => (
          <motion.span
            key={`line-${index}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-muted to-transparent"
            style={{
              top: `${8 + index * 7}%`,
              left: `${(index * 6) % 30}%`,
              width: `${38 + (index % 4) * 10}%`,
            }}
            animate={
              reduceMotion
                ? undefined
                : { x: [0, index % 2 === 0 ? 30 : -30, 0], opacity: [0.08, 0.22, 0.08] }
            }
            transition={{ duration: 9 + index, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {snippetWords.map((snippet, index) => (
          <motion.div
            key={snippet}
            className="absolute rounded-md border border-border/50 bg-muted/30 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
            style={{
              top: `${13 + index * 14}%`,
              left: `${index % 2 === 0 ? 5 : 58}%`,
            }}
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -10, 0],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, index % 2 === 0 ? 15 : -15, 0],
                  }
            }
            transition={{ duration: 11 + index, repeat: Infinity, ease: 'easeInOut' }}
          >
            {snippet}
          </motion.div>
        ))}

        {Array.from({ length: 22 }).map((_, index) => (
          <motion.span
            key={`dot-${index}`}
            className="absolute size-1 rounded-full bg-muted-foreground/50"
            style={{
              top: `${4 + ((index * 11) % 88)}%`,
              left: `${3 + ((index * 17) % 92)}%`,
            }}
            animate={reduceMotion ? undefined : { opacity: [0.15, 0.5, 0.15], y: [0, -6, 0] }}
            transition={{ duration: 4 + (index % 5), repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute right-[52%] top-9 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1"
        >
          <p className="mb-5 inline-flex rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Editorial Developer Portfolio
          </p>

          <h1 className="font-sans text-6xl leading-[0.9] font-black tracking-[-0.04em] text-foreground sm:text-7xl md:text-8xl xl:text-9xl">
            ALI RAZA
          </h1>

          <div className="mt-6 flex min-h-9 items-center gap-1 text-base font-medium text-muted-foreground sm:text-xl">
            <span>{typedTitle}</span>
            <motion.span
              aria-hidden="true"
              className="inline-block h-6 w-0.5 rounded bg-primary"
              animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm Ali Raza, a Computer Science student at PECHS Government Science College, Karachi, passionate about building software that solves real-world problems. My current focus is full-stack web development with Python, Next.js, TypeScript, and C++, while exploring AI, cloud computing, and DevOps. I enjoy turning ideas into polished projects, sharing what I learn, and continuously improving as a software engineer.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <motion.a
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              href="#highlights"
              className="rounded-xl border border-primary/50 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              href="/Ali_Raza_Resume.docx"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted"
            >
              <Download className="size-4" />
              Download Resume
            </motion.a>
            <motion.a
              whileHover={reduceMotion ? undefined : { y: -2, x: 1 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:btwaliraza110@gmail.com?subject=Hello Ali"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-foreground/30 hover:text-foreground"
            >
              <Mail className="size-4" />
              Contact Me
            </motion.a>
            <motion.button
              whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-muted/50 p-2.5 text-foreground transition-all duration-300 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="size-4 transition-transform duration-300" />
              ) : (
                <Sun className="size-4 transition-transform duration-300" />
              )}
            </motion.button>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.value}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-border bg-card px-4 py-3"
              >
                <h3 className="text-lg font-semibold text-foreground">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end lg:self-start"
        >
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:mt-6 lg:max-w-[360px]">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
              className="relative overflow-hidden rounded-full border border-border bg-muted p-2 shadow-[var(--shadow-floating)]"
            >
              <Image
                src="/images/portrait.png"
                alt="Ali Raza professional portrait"
                width={760}
                height={920}
                priority
                className="aspect-square h-auto w-full rounded-full object-cover"
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 rounded-full border border-border" />

            {techBadges.map((badge, index) => {
              const Icon = badge.icon
              const pos = [
                'left-[4%] -top-4',
                'right-[4%] -top-4',
                '-left-7 top-[30%]',
                '-right-7 top-[30%]',
                '-left-7 top-[62%]',
                '-right-7 top-[62%]',
                'left-[8%] -bottom-4',
                'right-[8%] -bottom-4',
              ][index]

              return (
                <motion.div
                  key={badge.label}
                  className={`absolute ${pos} rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-[var(--shadow-floating-strong)] backdrop-blur-sm`}
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, -6 - (index % 3), 0], x: [0, index % 2 === 0 ? 2 : -2, 0] }
                  }
                  transition={{ duration: 4.5 + index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={reduceMotion ? undefined : { scale: 1.05, y: -2 }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Icon className="size-3.5 text-primary" />
                    {badge.label}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <motion.div
          className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1"
          animate={reduceMotion ? undefined : { y: [0, 3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.span
            className="block size-1.5 rounded-full bg-primary"
            animate={reduceMotion ? undefined : { y: [0, 14, 0], opacity: [1, 0.45, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Scroll to Explore</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.72, duration: 0.6 }}
        className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card/88 px-2 py-2 shadow-[var(--shadow-floating-strong)] backdrop-blur-md"
      >
        {[
          {
            href: 'https://github.com/ali-raza-py',
            icon: GitHubIcon,
            label: 'GitHub',
          },
          {
            href: 'https://www.linkedin.com/in/ali-r-a8a144391',
            icon: LinkedInIcon,
            label: 'LinkedIn',
          },
          { href: 'mailto:btwaliraza110@gmail.com?subject=Hello Ali', icon: Mail, label: 'Email' },
        ].map((social) => {
          const Icon = social.icon

          return (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={social.label}
              whileHover={reduceMotion ? undefined : { y: -3, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="group relative rounded-full border border-border bg-card p-2.5 text-foreground transition-all hover:border-primary/60 hover:ring-2 hover:ring-primary/30"
            >
              <Icon className="size-4" />
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md border border-border bg-card px-2 py-1 text-[10px] tracking-[0.12em] text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {social.label}
              </span>
            </motion.a>
          )
        })}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-12 hidden items-center gap-1 text-[11px] text-muted-foreground/40 md:flex"
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.75, 0.3] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>{'>'}</span>
        <span>terminal</span>
        <motion.span
          className="h-3.5 w-1 rounded-sm bg-primary"
          animate={reduceMotion ? undefined : { opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
