import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function EmptyBlogState() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="rounded-[36px] border border-border bg-card p-8 backdrop-blur-xl sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              No Articles Published Yet
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              I will be sharing my learning journey, software engineering articles, tutorials, and project case studies. Stay tuned for in-depth insights and technical deep dives.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/20"
              >
                Back to Home
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground/50"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
