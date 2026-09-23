import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArchitectureDiagram } from '@/components/projects/architecture-diagram'
import { SiteHeader } from '@/components/content/site-header'
import { SiteFooter } from '@/components/portfolio/site-footer'
import { getProject, projects, type Project } from '@/lib/projects'
import { siteConfig } from '@/lib/site'

type Params = { slug: string }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const title = `${project.title} — Case Study`
  const description = project.tagline

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/projects/${project.slug}`,
      type: 'article',
    },
  }
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="tech-label mb-5 flex items-center gap-3">
      <span className="text-accent">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
      {children}
    </p>
  )
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-2xl space-y-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-base leading-7 text-muted-foreground">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const project: Project | undefined = getProject(slug)
  if (!project) notFound()

  const projectIndex = projects.findIndex((item) => item.slug === project.slug)
  const previous = projects[projectIndex - 1]
  const next = projects[projectIndex + 1]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.tagline,
    url: `${siteConfig.url}/projects/${project.slug}`,
    codeRepository: project.githubUrl,
    author: { '@type': 'Person', name: siteConfig.name },
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Masthead */}
        <section className="grain relative border-b border-border px-6 pb-16 pt-12 sm:px-10 lg:px-16 lg:pb-20 lg:pt-16">
          <div className="relative mx-auto max-w-[100rem]">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <Link href="/projects" className="transition-colors hover:text-foreground">
                Archive
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground">{project.title}</span>
            </nav>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
              <div>
                <div className="flex items-baseline gap-5">
                  <span className="display text-4xl leading-none text-accent">
                    {project.index}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {project.category} · {project.year}
                  </span>
                </div>
                <h1 className="mt-4 text-[clamp(2.75rem,8vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.035em] text-foreground">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
                  {project.tagline}
                </p>
              </div>

              {/* Spec sheet */}
              <dl className="grid grid-cols-2 gap-px border border-border bg-border text-sm">
                <div className="bg-background px-4 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Status
                  </dt>
                  <dd className="mt-1.5 text-foreground">{project.statusLabel}</dd>
                </div>
                <div className="bg-background px-4 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Year
                  </dt>
                  <dd className="mt-1.5 text-foreground">{project.year}</dd>
                </div>
                <div className="col-span-2 bg-background px-4 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Role
                  </dt>
                  <dd className="mt-1.5 text-foreground">{project.role}</dd>
                </div>
                <div className="col-span-2 flex flex-wrap gap-3 bg-background px-4 py-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="open"
                    className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    GitHub ↗
                  </a>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-2 border border-accent/60 bg-accent/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent transition-colors hover:bg-accent/20"
                    >
                      Live demo ↗
                    </a>
                  ) : null}
                </div>
              </dl>
            </div>
          </div>
        </section>
        {/* Context + Problem + Approach */}
        <section className="border-b border-border px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-[100rem] gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <SectionLabel index="01">Context</SectionLabel>
              <Prose paragraphs={project.description} />
            </div>
            <div>
              <SectionLabel index="02">Problem</SectionLabel>
              <Prose paragraphs={project.problem} />
            </div>
          </div>
        </section>

        <section className="border-b border-border px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-[100rem]">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
              <div>
                <SectionLabel index="03">Approach</SectionLabel>
                <Prose paragraphs={project.approach} />
              </div>

              {/* Architecture diagram */}
              <div>
                <SectionLabel index="04">Architecture</SectionLabel>
                <ArchitectureDiagram
                  caption={project.architecture.caption}
                  steps={project.architecture.steps}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="border-b border-border px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-[100rem]">
            <SectionLabel index="05">Stack</SectionLabel>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {project.stack.map((technology) => (
                <li
                  key={technology}
                  className="text-lg tracking-tight text-foreground sm:text-xl"
                >
                  {technology}
                </li>
              ))}
            </ul>
            {project.stackNote ? (
              <p className="mt-4 font-mono text-[11px] leading-5 tracking-[0.06em] text-muted-foreground/70">
                Note — {project.stackNote}
              </p>
            ) : null}
          </div>
        </section>
        {/* Features */}
        <section className="border-b border-border px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-[100rem]">
            <SectionLabel index="06">Features</SectionLabel>
            <ul className="grid gap-px border border-border bg-border md:grid-cols-2">
              {project.features.map((feature, index) => (
                <li key={feature} className="flex gap-4 bg-background px-5 py-5">
                  <span className="font-mono text-[10px] leading-6 text-accent/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Project state — honest implemented / in progress / planned split */}
        {project.state ? (
          <section className="border-b border-border px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
            <div className="mx-auto max-w-[100rem]">
              <SectionLabel index="07">Project state</SectionLabel>
              <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
                {[
                  {
                    label: 'Implemented',
                    items: project.state.implemented,
                    tone: 'text-accent',
                  },
                  {
                    label: 'In progress',
                    items: project.state.inProgress,
                    tone: 'text-foreground',
                  },
                  {
                    label: 'Planned',
                    items: project.state.planned,
                    tone: 'text-muted-foreground',
                  },
                ].map((column) => (
                  <div key={column.label} className="bg-background px-5 py-6">
                    <p
                      className={`font-mono text-[11px] uppercase tracking-[0.22em] ${column.tone}`}
                    >
                      {column.label}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {column.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-6 text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1 shrink-0 bg-accent/70"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        {/* Decisions + Challenges */}
        <section className="border-b border-border px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-[100rem] gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionLabel index={project.state ? '08' : '07'}>
                Engineering decisions
              </SectionLabel>
              <ol className="border-t border-border">
                {project.decisions.map((decision, index) => (
                  <li key={decision.title} className="border-b border-border py-5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-accent/80">
                        D{String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold tracking-tight text-foreground">
                          {decision.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                          {decision.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <SectionLabel index={project.state ? '09' : '08'}>Challenges</SectionLabel>
              <ol className="border-t border-border">
                {project.challenges.map((challenge, index) => (
                  <li key={challenge.title} className="border-b border-border py-5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-accent/80">
                        C{String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold tracking-tight text-foreground">
                          {challenge.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                          {challenge.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
        {/* Result + Lessons */}
        <section className="border-b border-border px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-[100rem] gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionLabel index={project.state ? '10' : '09'}>Result</SectionLabel>
              <ul className="space-y-4">
                {project.outcome.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-base leading-7 text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3 size-1.5 shrink-0 rotate-45 border border-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionLabel index={project.state ? '11' : '10'}>What I learned</SectionLabel>
              <ul className="space-y-5">
                {project.lessons.map((lesson) => (
                  <li
                    key={lesson}
                    className="display text-xl italic leading-snug text-foreground sm:text-2xl"
                  >
                    “{lesson}”
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Prev / next case study */}
        <nav
          aria-label="Case study navigation"
          className="grid gap-px border-b border-border bg-border sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              data-cursor="view"
              className="group flex flex-col gap-2 bg-background px-6 py-8 transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:px-10 lg:px-16"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                ← Previous — {previous.index}
              </span>
              <span className="text-xl font-semibold uppercase tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span className="bg-background" aria-hidden="true" />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              data-cursor="view"
              className="group flex flex-col gap-2 bg-background px-6 py-8 text-right transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:px-10 lg:px-16"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Next — {next.index} →
              </span>
              <span className="text-xl font-semibold uppercase tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : (
            <span className="bg-background" aria-hidden="true" />
          )}
        </nav>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}