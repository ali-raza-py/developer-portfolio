import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CalendarDays, Share2 } from 'lucide-react'

import { MarkdownContent } from '@/components/content/markdown-content'
import { ReadingProgressBar } from '@/components/content/progress-bar'
import { SiteHeader } from '@/components/content/site-header'
import { TableOfContents } from '@/components/content/toc'
import { type BlogEntry, formatDate } from '@/lib/content'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content.server'
import { siteConfig } from '@/lib/site'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mr-2 inline size-4">
      <path d="M18.9 2H22l-6.9 7.9L23.1 22h-6.6l-5.2-6.8L5.2 22H2l7.4-8.4L1 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L6.8 3.9H4.9L17.7 20Z" />
    </svg>
  )
}

type Params = { slug: string }

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) return {}

  const title = post.seoTitle ?? `${post.title} | ${siteConfig.name} Blog`
  const description = post.seoDescription ?? post.description

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [{ url: post.openGraphImage ?? post.coverImage }],
    },
  }
}

function buildRelatedPosts(post: BlogEntry, posts: BlogEntry[]) {
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score:
        candidate.tags.filter((tag) => post.tags.includes(tag)).length +
        (candidate.category === post.category ? 2 : 0),
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((item) => item.candidate)
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) notFound()

  const posts = await getAllBlogPosts()
  const index = posts.findIndex((item) => item.slug === post.slug)
  const previous = posts[index + 1]
  const next = posts[index - 1]
  const relatedPosts = buildRelatedPosts(post, posts)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` },
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    image: post.openGraphImage ?? post.coverImage,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <ReadingProgressBar />
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/50">
          {breadcrumbs.map((item, index) => (
            <span key={item.href} className="flex items-center gap-2">
              <Link href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
              {index < breadcrumbs.length - 1 && <span>/</span>}
            </span>
          ))}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
              <div className="relative aspect-[16/9]">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              </div>
              <div className="space-y-5 p-6 lg:p-8">
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-white/45">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                  <span>•</span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
                <p className="max-w-3xl text-base leading-7 text-white/65 sm:text-lg">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <article className="rounded-[36px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:p-8">
              <MarkdownContent content={post.content} />

              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                <Share2 className="size-4 text-white/50" />
                <span className="text-sm text-white/55">Share this article</span>
                <Link href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`} target="_blank" className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75 transition hover:bg-white/[0.08] hover:text-white">
                  <XIcon />
                  X / Twitter
                </Link>
              </div>
            </article>

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Previous</p>
                {previous ? (
                  <Link href={`/blog/${previous.slug}`} className="mt-3 block text-lg font-medium text-white transition hover:text-[#9BE9B3]">
                    <ArrowLeft className="mr-2 inline size-4" />
                    {previous.title}
                  </Link>
                ) : (
                  <p className="mt-3 text-sm text-white/45">No previous post</p>
                )}
              </div>
              <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 text-right backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Next</p>
                {next ? (
                  <Link href={`/blog/${next.slug}`} className="mt-3 block text-lg font-medium text-white transition hover:text-[#9BE9B3]">
                    {next.title}
                    <ArrowRight className="ml-2 inline size-4" />
                  </Link>
                ) : (
                  <p className="mt-3 text-sm text-white/45">No next post</p>
                )}
              </div>
            </section>

            <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-semibold text-white">Related Articles</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`} className="rounded-[24px] border border-white/10 bg-black/30 p-4 transition hover:bg-white/[0.05]">
                    <p className="text-sm font-medium text-white">{related.title}</p>
                    <p className="mt-2 text-xs text-white/45">{related.readingTime}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <TableOfContents headings={post.headings} />

            <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-white">Newsletter</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Add your newsletter subscription integration here to capture readers.
              </p>
              <div className="mt-4 space-y-3">
                <input placeholder="Email address" className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30" />
                <button className="w-full rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/10 px-4 py-3 text-sm font-medium text-[#D9FBE0] transition hover:bg-[#22C55E]/20">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-white">Article Metadata</h2>
              <div className="mt-4 space-y-3 text-sm text-white/65">
                <p className="flex items-center gap-2"><CalendarDays className="size-4 text-white/45" /> Published {formatDate(post.date)}</p>
                <p>Estimated reading time: {post.readingTime}</p>
                <p>Author: {post.author}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  )
}
