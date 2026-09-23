import type { Metadata } from 'next'
import Link from 'next/link'

import { SiteHeader } from '@/components/content/site-header'
import { SiteFooter } from '@/components/portfolio/site-footer'
import { type Project, experiments, projects } from '@/lib/projects'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: `Work — Project Archive | ${siteConfig.name}`,
  description:
    'Case studies and repositories from Ali Raza: MediCare AI, AI-HUB, Code-Yaar, Algorify — architecture, engineering decisions, and honest outcomes.',
  alternates: {
    canonical: '/projects',
  },
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6V21c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6A4.7 4.7 0 0 1 6.6 8c-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3a4.7 4.7 0 0 1 1.3 3.3c0 4.6-2.8 5.6-5.5 6 .4.4.8 1.1.8 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="view"
      className="group block border-b border-border py-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 lg:py-16"
    >
      <article className="grid items-start gap-8 lg:grid-cols-[auto_1fr_auto] lg:gap-12">
        <span className="display text-6xl leading-none text-muted-foreground/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent lg:text-7xl">
          {project.index}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-foreground transition-colors group-hover:text-accent">
              {project.title}
            </h2>
            <span className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {project.statusLabel}
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            {project.tagline}
          </p>

          {/* Plate — diagrammatic, built from the project's real architecture */}
          <div
            aria-hidden="true"
            className="mt-7 grid max-w-2xl gap-1 border border-border bg-card/70 p-4 font-mono text-[10px] leading-5 tracking-[0.06em] text-muted-foreground/70 transition-transform duration-500 group-hover:-translate-y-1 sm:grid-cols-2 sm:gap-x-6"
          >
            {project.architecture.steps.slice(0, 6).map((step) => (
              <span key={step.label} className="truncate">
                <span className="text-accent/70">→ </span>
                {step.label}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70">
            <span className="text-accent/80">{project.category}</span>
            <span>{project.year}</span>
            <span className="hidden sm:inline">{project.stack.slice(0, 5).join(' / ')}</span>
            <span className="ml-auto inline-flex items-center gap-2 text-foreground">
              Case study
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </span>
          </div>
        </div>

        {/* Architecture preview column */}
        <div
          aria-hidden="true"
          className="hidden w-52 shrink-0 flex-col gap-1.5 border-l border-border pl-6 font-mono text-[10px] leading-4 tracking-[0.08em] text-muted-foreground/60 xl:flex"
        >
          {project.architecture.steps.slice(0, 5).map((step) => (
            <span key={step.label} className="truncate">
              <span className="text-accent/60">└ </span>
              {step.label}
            </span>
          ))}
        </div>
      </article>
    </Link>
  )
}
export default function ProjectsPage() {
  const featured = projects.filter((project) => project.featured)
  const engineering = projects.filter((project) => project.tier === 'engineering')

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Archive header */}
        <section className="border-b border-border px-6 pb-14 pt-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[100rem]">
            <p className="tech-label flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-10 bg-accent/70" />
              Project archive — {projects.length + experiments.length} repositories
            </p>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.035em] text-foreground">
              The work,
              <br />
              documented<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              Every project below links to its repository and a full case study:
              problem, approach, architecture, decisions, and what actually
              shipped versus what is planned.
            </p>
          </div>
        </section>

        {/* Featured tier */}
        <section aria-label="Featured projects" className="px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[100rem]">
            <div className="flex items-baseline justify-between border-b border-border py-5">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
                Featured
              </h2>
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground/60">
                Full case studies
              </span>
            </div>
            {featured.map((project) => (
              <ProjectEntry key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Engineering tier */}
        <section aria-label="Engineering projects" className="px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[100rem]">
            <div className="flex items-baseline justify-between border-b border-border py-5">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
                Engineering / Algorithms
              </h2>
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground/60">
                Case study included
              </span>
            </div>
            {engineering.map((project) => (
              <ProjectEntry key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Experiments tier — compact rows straight to GitHub */}
        <section aria-label="Experiments" className="px-6 pb-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-[100rem]">
            <div className="mt-16 flex items-baseline justify-between border-b border-border py-5">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
                Experiments & coursework
              </h2>
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground/60">
                Linked to GitHub
              </span>
            </div>

            <ul>
              {experiments.map((experiment) => (
                <li key={experiment.name}>
                  <a
                    href={experiment.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="open"
                    className="group grid grid-cols-1 items-baseline gap-x-6 gap-y-1 border-b border-border py-4 transition-colors hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:grid-cols-[16rem_5rem_1fr_auto]"
                  >
                    <span className="flex items-center gap-2 font-mono text-sm text-foreground transition-colors group-hover:text-accent">
                      <GitHubIcon />
                      {experiment.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent/80">
                      {experiment.language}
                    </span>
                    <span className="text-sm leading-6 text-muted-foreground">
                      {experiment.description}
                    </span>
                    <span
                      aria-hidden="true"
                      className="justify-self-end text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}