'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, CircleCheckBig, Filter, Search } from 'lucide-react'

import type { ProjectEntry, ProjectCategory } from '@/lib/content'
import { formatDate } from '@/lib/content'
import { EmptyProjectsState } from './empty-projects'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6V21c-3.3.7-4-1.4-4-1.4-.6-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6A4.7 4.7 0 0 1 6.6 8c-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 3 .1 3.3a4.7 4.7 0 0 1 1.3 3.3c0 4.6-2.8 5.6-5.5 6 .4.4.8 1.1.8 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

const categories: Array<'All' | ProjectCategory> = [
  'All',
  'Web',
  'Python',
  'AI',
  'DevOps',
  'Open Source',
  'Hackathon',
]

export function ProjectBrowser({ projects }: { projects: ProjectEntry[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<(
    typeof categories
  )[number]>('All')

  if (projects.length === 0) {
    return <EmptyProjectsState />
  }

  const filteredProjects = useMemo(() => {
    const loweredQuery = query.toLowerCase()

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory
      const matchesQuery =
        project.title.toLowerCase().includes(loweredQuery) ||
        project.description.toLowerCase().includes(loweredQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(loweredQuery)) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(loweredQuery)
        )

      return matchesCategory && matchesQuery
    })
  }, [activeCategory, projects, query])

  return (
    <section className="relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.04),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_24%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8 space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Projects
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Premium case studies and build logs.
            </h1>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <label className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-2.5 transition-colors duration-300">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, tags, or technologies"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
              />
            </label>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="size-4" />
              {filteredProjects.length} results
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = activeCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? 'border-primary/40 bg-primary/15 text-primary'
                      : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="group overflow-hidden rounded-[32px] border border-border bg-card shadow-sm hover:shadow-md backdrop-blur-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/60 dark:via-black/30" />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-foreground/80 backdrop-blur-sm">
                    {project.status}
                  </span>
                  <span className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-foreground/80 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="space-y-5 p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {formatDate(project.date)}
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/20 px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted/40 hover:text-foreground"
                  >
                    <GitHubIcon />
                    GitHub
                  </Link>
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary transition hover:bg-primary/20"
                  >
                    Live Demo
                    <ArrowUpRight className="size-4" />
                  </Link>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted/30 hover:text-foreground"
                  >
                    Case Study
                    <CircleCheckBig className="size-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
