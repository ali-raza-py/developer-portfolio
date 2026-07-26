'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Search, Sparkles, Tag } from 'lucide-react'

import type { BlogEntry, BlogCategory } from '@/lib/content'
import { formatDate } from '@/lib/content'
import { EmptyBlogState } from './empty-blog'

const categories: Array<'All' | BlogCategory> = [
  'All',
  'Next.js',
  'Portfolio',
  'Content',
  'Career',
  'Python',
  'AI',
  'Design',
]

export function BlogBrowser({ posts }: { posts: BlogEntry[] }) {
  const featured = posts.find((post) => post.featured) ?? posts[0]
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All')
  const [activeTag, setActiveTag] = useState('All')

  if (posts.length === 0) {
    return <EmptyBlogState />
  }

  const tagOptions = useMemo(() => {
    return ['All', ...new Set(posts.flatMap((post) => post.tags))]
  }, [posts])

  const filteredPosts = useMemo(() => {
    const loweredQuery = query.toLowerCase()

    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory
      const matchesTag = activeTag === 'All' || post.tags.includes(activeTag)
      const matchesQuery =
        post.title.toLowerCase().includes(loweredQuery) ||
        post.description.toLowerCase().includes(loweredQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(loweredQuery))

      return matchesCategory && matchesTag && matchesQuery
    })
  }, [activeCategory, activeTag, posts, query])

  const popularPosts = posts.filter((post) => post.popular || post.featured).slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-background text-foreground transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.04),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_24%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[36px] border border-border bg-card/50 p-6 backdrop-blur-xl lg:p-8 transition-colors duration-300">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Blog</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Essays, playbooks, and shipping notes.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A markdown-first blog engine with automatic article generation, TOC, related posts, share buttons, and newsletter UI.
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <label className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3 transition-colors duration-300">
                <Search className="size-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search articles, tags, or topics"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
                />
              </label>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="size-4" />
                {filteredPosts.length} articles
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
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

            <div className="mt-4 flex flex-wrap gap-2">
              {tagOptions.map((tag) => {
                const active = activeTag === tag
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      active
                        ? 'border-foreground/30 bg-foreground/10 text-foreground'
                        : 'border-border bg-muted/20 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Tag className="mr-1 inline size-3" />
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          {featured && (
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-[36px] border border-border bg-card backdrop-blur-xl transition-colors duration-300"
            >
              <div className="relative aspect-[4/3]">
                <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent dark:from-black/60 dark:via-black/30" />
                <div className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-foreground/80 backdrop-blur-sm">
                  Featured
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  <span>{featured.category}</span>
                  <span>•</span>
                  <span>{featured.readingTime}</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  {featured.title}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">{featured.description}</p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary transition hover:bg-primary/20"
                >
                  Read featured article
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </motion.article>
          )}
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Latest Articles</h2>
                <span className="text-sm text-muted-foreground">Markdown powered</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className="group overflow-hidden rounded-[30px] border border-border bg-card backdrop-blur-xl transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-4 p-5">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        <span>{post.category}</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">{post.title}</h3>
                      <p className="text-sm leading-6 text-muted-foreground">{post.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-muted/20 px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                        <span>{post.readingTime}</span>
                        <Link href={`/blog/${post.slug}`} className="text-foreground transition hover:text-primary">
                          Read article
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[30px] border border-border bg-card/50 p-5 backdrop-blur-xl transition-colors duration-300">
              <h3 className="text-lg font-semibold text-foreground">Popular Articles</h3>
              <div className="mt-4 space-y-4">
                {popularPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block rounded-2xl border border-border p-4 transition hover:bg-muted/30">
                    <p className="text-sm font-medium text-foreground">{post.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(post.date)} · {post.readingTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-border bg-card/50 p-5 backdrop-blur-xl transition-colors duration-300">
              <h3 className="text-lg font-semibold text-foreground">Newsletter</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A clean subscription panel for updates, launches, and writing drops.
              </p>
              <div className="mt-4 space-y-3">
                <input
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-border bg-muted/20 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/50 transition-colors duration-300"
                />
                <button className="w-full rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/20">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
