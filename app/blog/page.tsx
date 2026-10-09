import type { Metadata } from 'next'

import { BlogBrowser } from '@/components/content/blog-browser'
import { SiteHeader } from '@/components/content/site-header'
import { getAllBlogPosts } from '@/lib/content.server'
import { SiteFooter } from '@/components/portfolio/site-footer'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on building software, learning algorithms, and shipping projects — by Ali Raza.',
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <>
      <SiteHeader />
      <main className="minecraft-blog-page min-h-screen bg-background text-foreground transition-colors duration-300">
        <BlogBrowser posts={posts} />
        <SiteFooter />
      </main>
    </>
  )
}
