import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, CalendarDays, Layers3 } from 'lucide-react'

import { MarkdownContent } from '@/components/content/markdown-content'
import { SiteHeader } from '@/components/content/site-header'
import { formatDate } from '@/lib/content'
import { getAllProjects, getProjectBySlug } from '@/lib/content.server'
import { siteConfig } from '@/lib/site'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6V21c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6A4.7 4.7 0 0 1 6.6 8c-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3a4.7 4.7 0 0 1 1.3 3.3c0 4.6-2.8 5.6-5.5 6 .4.4.8 1.1.8 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

type Params = { slug: string }

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) return {}

  const title = project.seoTitle ?? `${project.title} | ${siteConfig.name} Projects`
  const description = project.seoDescription ?? project.description

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: [{ url: project.ogImage ?? project.heroImage }],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title, href: `/projects/${project.slug}` },
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/projects/${project.slug}`,
    image: project.heroImage,
    dateCreated: project.date,
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => (
            <span key={item.href} className="flex items-center gap-2">
              <Link href={item.href} className="transition hover:text-foreground">
                {item.label}
              </Link>
              {index < breadcrumbs.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
              <span>{project.category}</span>
              <span>•</span>
              <span>{project.status}</span>
              <span>•</span>
              <span>{formatDate(project.date)}</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {project.description}
            </p>
          </div>

          <div className="overflow-hidden rounded-[36px] border border-border bg-card backdrop-blur-xl">
            <div className="relative aspect-[4/3]">
              <Image src={project.heroImage} alt={project.title} fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_320px]">
          <article className="rounded-[36px] border border-border bg-card p-6 backdrop-blur-xl lg:p-8">
            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {project.metrics?.map((metric) => (
                <div key={metric.label} className="rounded-3xl border border-border bg-muted/20 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{metric.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{metric.value}</p>
                </div>
              ))}
            </div>

            <MarkdownContent content={project.content} />

            <section className="mt-10 rounded-[30px] border border-dashed border-border/50 bg-muted/10 p-6">
              <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-muted-foreground">
                <Layers3 className="size-4" />
                Architecture diagram placeholder
              </div>
              <div className="grid min-h-52 place-items-center rounded-[24px] border border-border bg-muted/20 text-center text-muted-foreground">
                Replace this box with your architecture diagram, flowchart, or system sketch.
              </div>
            </section>

            {project.gallery.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-semibold text-foreground">Screenshots Gallery</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {project.gallery.map((image) => (
                    <div key={image} className="overflow-hidden rounded-[24px] border border-border">
                      <Image src={image} alt={`${project.title} screenshot`} width={800} height={600} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="space-y-6">
            <div className="rounded-[30px] border border-border bg-card p-5 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-foreground">Quick Links</h2>
              <div className="mt-4 space-y-3">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary transition hover:bg-primary/20"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="flex items-center justify-between rounded-2xl border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground transition hover:bg-muted/30 hover:text-foreground"
                >
                  <span>GitHub Repository</span>
                  <GitHubIcon />
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-border bg-card p-5 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-foreground">Tech Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-border bg-muted/20 px-3 py-1 text-xs text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-border bg-card p-5 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-foreground">Performance Metrics</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Track Lighthouse, bundle size, API latency, Core Web Vitals, or deployment gains here.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  )
}
