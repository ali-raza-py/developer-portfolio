import Link from 'next/link'

import type { Heading } from '@/lib/content'

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (!headings.length) return null

  return (
    <aside className="rounded-[28px] border border-border bg-card p-5 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        On This Page
      </p>
      <div className="mt-4 space-y-3">
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            className="block text-sm text-muted-foreground transition hover:text-foreground"
            style={{ paddingLeft: `${Math.max(heading.level - 2, 0) * 12}px` }}
          >
            {heading.text}
          </Link>
        ))}
      </div>
    </aside>
  )
}
