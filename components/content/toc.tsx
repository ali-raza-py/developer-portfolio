import Link from 'next/link'

import type { Heading } from '@/lib/content'

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (!headings.length) return null

  return (
    <aside className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
        On This Page
      </p>
      <div className="mt-4 space-y-3">
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            className="block text-sm text-white/70 transition hover:text-white"
            style={{ paddingLeft: `${Math.max(heading.level - 2, 0) * 12}px` }}
          >
            {heading.text}
          </Link>
        ))}
      </div>
    </aside>
  )
}
