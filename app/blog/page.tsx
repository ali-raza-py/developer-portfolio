import type { Metadata } from 'next'

import { BlogBrowser } from '@/components/content/blog-browser'
import { SiteHeader } from '@/components/content/site-header'
import { getAllBlogPosts } from '@/lib/content.server'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: 'Markdown-powered developer notes, essays, and shipping stories.',
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <main className="min-h-screen bg-[#050505]">
      <SiteHeader />
      <BlogBrowser posts={posts} />
    </main>
  )
}
