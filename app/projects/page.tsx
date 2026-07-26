import type { Metadata } from 'next'

import { ProjectBrowser } from '@/components/content/project-browser'
import { SiteHeader } from '@/components/content/site-header'
import { getAllProjects } from '@/lib/content.server'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.name}`,
  description: 'Premium case studies, live demos, and build notes from my developer portfolio.',
  alternates: {
    canonical: '/projects',
  },
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <main className="min-h-screen bg-[#050505]">
      <SiteHeader />
      <ProjectBrowser projects={projects} />
    </main>
  )
}
