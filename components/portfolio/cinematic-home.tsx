'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { projects } from '@/lib/projects'

const ease = [0.22, 1, 0.36, 1] as const
const projectColors = ['#c7a24a', '#9bd66d', '#55b8d9', '#ee7645', '#b89ae8', '#64c5ad']

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ProjectVisual({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[number]
  index: number
  onOpen: () => void
}) {
  const color = projectColors[index % projectColors.length]

  return (
    <button
      type="button"
      onClick={onOpen}
      className="portfolio-project-visual group relative aspect-[1.08/1] w-full overflow-hidden rounded-[1.25rem] border border-white/15 text-left shadow-2xl"
      style={{ ['--project-color' as string]: color }}
      aria-label={`Open details for ${project.title}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_srgb,var(--project-color)_65%,transparent),transparent_33%),linear-gradient(145deg,#292722,#0d0d0c_72%)]" />
      <div className="portfolio-project-grid absolute inset-0 opacity-60" />
      <div className="absolute left-[10%] top-[13%] h-[70%] w-[80%] rotate-[-4deg] border border-white/20 bg-black/40 p-4 shadow-[0_30px_80px_rgba(0,0,0,.55)] transition-transform duration-700 group-hover:rotate-0 group-hover:scale-[1.03]">
        <div className="flex items-center justify-between border-b border-white/15 pb-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/45">
          <span>AR / {project.index}</span>
          <span>{project.statusLabel}</span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <span className="col-span-2 h-2 rounded-full bg-[var(--project-color)]" />
          <span className="h-2 rounded-full bg-white/15" />
          <span className="col-span-3 h-24 rounded-lg border border-white/10 bg-white/[0.04]" />
          <span className="h-16 rounded-lg border border-white/10 bg-white/[0.06]" />
          <span className="col-span-2 h-16 rounded-lg border border-white/10 bg-white/[0.03]" />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <span className="max-w-[72%] text-2xl font-semibold uppercase leading-none text-white/90">{project.title}</span>
          <span className="size-8 rounded-full border border-[var(--project-color)] bg-[var(--project-color)]/20" />
        </div>
      </div>
      <span className="absolute bottom-5 left-6 font-mono text-[9px] uppercase tracking-[0.25em] text-white/45">Open project signal</span>
      <span className="absolute right-6 top-5 font-mono text-[9px] tracking-[0.25em] text-[var(--project-color)]">{project.index} / 0{projects.length}</span>
    </button>
  )
}

function ProjectDetails({
  project,
  onClose,
}: {
  project: (typeof projects)[number]
  onClose: () => void
}) {
  return (
    <aside className="portfolio-details-panel" aria-label={`${project.title} details`}>
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c7a24a]">{project.category}</p>
          <h2 className="mt-3 text-4xl font-semibold uppercase leading-[.9] text-white">{project.title}</h2>
        </div>
        <button type="button" onClick={onClose} aria-label="Close project details" className="rounded-full border border-white/15 px-3 py-2 text-white/60 transition-colors hover:border-[#c7a24a] hover:text-[#c7a24a]">×</button>
      </div>
      <p className="mt-8 text-sm leading-7 text-white/60">{project.shortDescription}</p>
      <dl className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
        <div className="bg-[#171716] p-4"><dt className="font-mono text-[9px] uppercase tracking-[.2em] text-white/40">Year</dt><dd className="mt-2 text-sm text-white/80">{project.year}</dd></div>
        <div className="bg-[#171716] p-4"><dt className="font-mono text-[9px] uppercase tracking-[.2em] text-white/40">Status</dt><dd className="mt-2 text-sm text-white/80">{project.statusLabel}</dd></div>
      </dl>
      <p className="mt-8 font-mono text-[10px] uppercase tracking-[.2em] text-white/35">Built with</p>
      <div className="mt-3 flex flex-wrap gap-2">{project.stack.slice(0, 8).map((tech) => <span key={tech} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/55">{tech}</span>)}</div>
      <div className="mt-9 flex flex-wrap gap-4">
        <Link href={`/projects/${project.slug}`} className="cinematic-button cinematic-button-primary">Read case study <span>↗</span></Link>
        {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="cinematic-button">Open live <span>↗</span></a> : null}
      </div>
    </aside>
  )
}

export function CinematicHome() {
  const reduced = useReducedMotion()
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? '')
  const [detailsSlug, setDetailsSlug] = useState<string | null>(null)
  const detailsProject = useMemo(() => projects.find((project) => project.slug === detailsSlug), [detailsSlug])

  useEffect(() => {
    const observers = projects.map((project) => {
      const element = document.getElementById(project.slug)
      if (!element) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSlug(project.slug)
          }
        },
        { rootMargin: '-35% 0px -50% 0px' },
      )
      observer.observe(element)
      return observer
    })
    return () => observers.forEach((observer) => observer?.disconnect())
  }, [])

  const activeIndex = Math.max(0, projects.findIndex((project) => project.slug === activeSlug))

  return (
    <main id="main" className="cinematic-home min-h-screen overflow-clip">
      <section id="intro" className="relative flex min-h-[100svh] items-center px-6 pb-20 pt-32 sm:px-10 lg:px-16">
        <div className="cinematic-opening" aria-hidden="true"><span>ALI RAZA</span><i /></div>
        <div className="mx-auto grid w-full max-w-[84rem] items-center gap-12 lg:grid-cols-[1fr_.9fr]">
          <div className="relative z-10">
            <Reveal><p className="cinematic-kicker"><span /> Ali Raza · Software engineering student</p></Reveal>
            <Reveal delay={0.08}><h1 className="cinematic-display mt-7 max-w-4xl text-[clamp(4.8rem,12vw,10rem)] uppercase leading-[.8] tracking-[-.055em]">Ali<br />Raza<span className="text-[#c7a24a]">.</span></h1></Reveal>
            <Reveal delay={0.16}><p className="mt-8 max-w-lg text-base leading-7 text-white/55 sm:text-lg">I build useful software, explore AI, and turn ambitious ideas into working systems.</p></Reveal>
            <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-3"><a href="#work" className="cinematic-button cinematic-button-primary">See the projects <span>↓</span></a><a href="#contact" className="cinematic-button">Say hello <span>↗</span></a></Reveal>
            <Reveal delay={0.32}><p className="mt-14 font-mono text-[9px] uppercase tracking-[.25em] text-white/35">Karachi, Pakistan · Python / C++ / Next.js / AI</p></Reveal>
          </div>
          <Reveal delay={0.12} className="relative mx-auto w-full max-w-[32rem] lg:absolute lg:right-[6%] lg:top-1/2 lg:-translate-y-1/2">
            <div className="cinematic-portrait-orbit" />
            <div className="relative aspect-square overflow-hidden rounded-full border border-[#c7a24a]/35 bg-[#171716] p-3 shadow-[0_0_100px_rgba(199,162,74,.16)]">
              <img src="/images/portrait.png" alt="Portrait of Ali Raza" className="cinematic-pixel-image h-full w-full rounded-full object-cover grayscale-[.35] contrast-125" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_65%_25%,transparent_15%,rgba(0,0,0,.62)_90%)]" />
              <div className="cinematic-pixel-grid absolute inset-3 rounded-full" aria-hidden="true" />
              <span className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[.3em] text-white/65">AR · 2026 · Portfolio</span>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[.25em] text-white/35"><span className="h-10 w-px bg-gradient-to-b from-transparent to-[#c7a24a]" />Scroll</div>
      </section>

      <section id="about" className="border-y border-white/10 px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto grid max-w-[84rem] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <Reveal><p className="cinematic-kicker"><span /> About</p><h2 className="cinematic-heading mt-6">I learn<br />by building<span className="text-[#c7a24a]">.</span></h2></Reveal>
          <Reveal delay={0.1} className="max-w-2xl text-lg leading-8 text-white/55">
            <p>I&apos;m a computer science student in Karachi on a software engineering path. I write <strong>Python</strong> and <strong>C++</strong>, build full-stack products with <strong>Next.js</strong>, and study algorithms by implementing them.</p>
            <p className="mt-6">My work spans medical-document intelligence, validated AI tooling, product systems, and an algorithm laboratory.</p>
            <blockquote className="mt-10 border-l border-[#c7a24a] pl-6 text-2xl italic text-white/85">Fundamentals before frameworks. Evidence over claims.</blockquote>
          </Reveal>
        </div>
      </section>

      <section id="work" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[84rem]">
          <Reveal><p className="cinematic-kicker"><span /> Selected work</p><h2 className="cinematic-heading mt-6 max-w-3xl">Projects made to move<span className="text-[#c7a24a]">.</span></h2><p className="mt-6 max-w-xl text-base leading-7 text-white/45">Real repositories, honest constraints, and case studies that show how each system works.</p></Reveal>
          <div className="mt-20 space-y-24 lg:space-y-36">
            {projects.slice(0, 4).map((project, index) => (
              <motion.article key={project.slug} id={project.slug} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: .8, ease }} className="grid min-h-[70svh] items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
                <div className={index % 2 ? 'lg:order-2' : ''}><ProjectVisual project={project} index={index} onOpen={() => setDetailsSlug(project.slug)} /></div>
                <div className={index % 2 ? 'lg:order-1' : ''}>
                  <p className="font-mono text-[10px] uppercase tracking-[.28em] text-[#c7a24a]">{project.index} · {project.category}</p>
                  <h3 className="mt-5 text-4xl font-semibold uppercase leading-[.94] tracking-[-.035em] text-white sm:text-6xl">{project.title}<span className="text-[#c7a24a]">.</span></h3>
                  <p className="mt-6 max-w-lg text-base leading-7 text-white/55">{project.tagline}</p>
                  <div className="mt-7 flex flex-wrap gap-2">{project.stack.slice(0, 5).map((tech) => <span key={tech} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.14em] text-white/50">{tech}</span>)}</div>
                  <div className="mt-9 flex flex-wrap gap-5"><Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-3 border-b border-white/40 pb-2 font-mono text-[10px] uppercase tracking-[.23em] text-white hover:border-[#c7a24a] hover:text-[#c7a24a]">Open case study <span>↗</span></Link><button type="button" onClick={() => setDetailsSlug(project.slug)} className="inline-flex items-center gap-3 border-b border-[#c7a24a]/60 pb-2 font-mono text-[10px] uppercase tracking-[.23em] text-[#c7a24a]">Project details <span>→</span></button></div>
                </div>
              </motion.article>
            ))}
          </div>
          <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-7"><p className="max-w-lg text-sm leading-6 text-white/40">More algorithms, coursework, and experiments live in the full archive.</p><Link href="/projects" className="cinematic-button cinematic-button-primary">Open project archive <span>↗</span></Link></Reveal>
        </div>
      </section>

      <section id="skills" className="border-y border-white/10 bg-[#121211] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[84rem]"><Reveal><p className="cinematic-kicker"><span /> Engineering stack</p><h2 className="cinematic-heading mt-6">A system, not a sticker sheet<span className="text-[#c7a24a]">.</span></h2></Reveal><div className="mt-14 grid gap-4 sm:grid-cols-3">{[['Building with', 'Python', 'Next.js', 'TypeScript', 'React'], ['Learning', 'C++', 'Data Structures', 'Algorithms', 'Django'], ['Exploring', 'AI / ML', 'Cloud', 'DevOps', 'Cybersecurity']].map(([label, ...items], cardIndex) => <Reveal key={label} delay={cardIndex * .08} className="cinematic-skill-card"><p className="font-mono text-[10px] uppercase tracking-[.25em] text-[#c7a24a]">{label}</p>{items.map((item, itemIndex) => <p key={item} className="mt-5 flex items-center justify-between border-b border-white/10 pb-3 text-lg text-white/75"><span>{item}</span><span className="font-mono text-[9px] text-white/25">0{itemIndex + 1}</span></p>)}</Reveal>)}</div></div>
      </section>

      <section id="contact" className="cinematic-contact px-6 py-28 sm:px-10 lg:px-16 lg:py-44"><div className="mx-auto max-w-[84rem]"><Reveal><p className="cinematic-kicker text-black/55"><span /> Contact</p><h2 className="cinematic-heading mt-6 max-w-4xl text-black">Let&apos;s make something real<span className="text-[#7d5a0d]">.</span></h2><p className="mt-7 max-w-xl text-lg leading-8 text-black/60">Open to internships, collaborations, hackathons, and conversations about software engineering, AI, and systems.</p></Reveal><Reveal delay={.1} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[['Email', 'btwaliraza110@gmail.com', 'mailto:btwaliraza110@gmail.com'], ['GitHub', 'github.com/ali-raza-py', 'https://github.com/ali-raza-py'], ['LinkedIn', 'in/ali-r-a8a144391', 'https://www.linkedin.com/in/ali-r-a8a144391'], ['Resume', 'Download (.docx)', '/Ali_Raza_Resume.docx']].map(([label, value, href]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex min-h-36 flex-col justify-between rounded-xl bg-black/10 p-5 transition-colors hover:bg-black/20"><span className="font-mono text-[10px] uppercase tracking-[.25em] text-black/55">{label}</span><span className="flex items-end justify-between gap-3 text-sm text-black/80"><span className="break-all">{value}</span><span>↗</span></span></a>)}</Reveal></div></section>
      <footer className="border-t border-white/10 px-6 py-10 sm:px-10 lg:px-16"><div className="mx-auto flex max-w-[84rem] flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><p className="text-2xl font-semibold uppercase text-white">Ali Raza<span className="text-[#c7a24a]">.</span></p><p className="font-mono text-[9px] uppercase tracking-[.23em] text-white/35">© {new Date().getFullYear()} · Karachi, Pakistan</p></div></footer>

      <div className="portfolio-project-hud" aria-label="Project navigation"><span>Projects:</span><strong>{projects[activeIndex]?.title}</strong><em>{activeIndex + 1}/{projects.length}</em><button type="button" aria-label="Previous project" onClick={() => document.getElementById(projects[(activeIndex - 1 + projects.length) % projects.length].slug)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })}>←</button><button type="button" aria-label="Next project" onClick={() => document.getElementById(projects[(activeIndex + 1) % projects.length].slug)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })}>→</button></div>
      {detailsProject ? <ProjectDetails project={detailsProject} onClose={() => setDetailsSlug(null)} /> : null}
    </main>
  )
}
