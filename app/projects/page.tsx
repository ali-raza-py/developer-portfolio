import type { Metadata } from 'next'

import { EmptyProjectsState } from '@/components/content/empty-projects'
import { SiteHeader } from '@/components/content/site-header'
import { SiteFooter } from '@/components/portfolio/site-footer'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.name}`,
  description: 'Premium case studies, live demos, and build notes from my developer portfolio.',
  alternates: {
    canonical: '/projects',
  },
}

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <EmptyProjectsState />
        <SiteFooter />
      </main>
    </>
  )
}
