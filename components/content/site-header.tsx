'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Index' },
  { href: '/projects', label: 'Work' },
  { href: '/blog', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader({ className }: { className?: string }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="group flex items-baseline gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          aria-label="Ali Raza — home"
        >
          <span className="text-lg font-semibold uppercase tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
            Ali Raza
          </span>
          <span
            aria-hidden="true"
            className="hidden font-mono text-[10px] tracking-[0.24em] text-muted-foreground sm:inline"
          >
            DEV — KARACHI
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navItems.map((item, index) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group flex items-baseline gap-1.5 border-b py-1 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
                  active
                    ? 'border-accent text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
                )}
              >
                <span aria-hidden="true" className="text-[9px] text-accent/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          {/* The homepage is the dark 3D workspace — theme toggle only makes
              sense on the themed pages. */}
          {pathname !== '/' && <ThemeToggle />}
          <Link
            href="/#contact"
            className="hidden border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:inline-flex"
          >
            Get in touch
          </Link>
        </div>
      </div>

      {/* Compact mobile nav */}
      <nav
        aria-label="Primary mobile"
        className="flex items-center gap-5 border-t border-border/60 px-6 py-2.5 md:hidden"
      >
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'font-mono text-[10px] uppercase tracking-[0.2em] transition-colors',
                active ? 'text-accent' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}