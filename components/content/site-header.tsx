'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader({ className }: { className?: string }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    if (href.startsWith('/#')) {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl transition-colors duration-300',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/ar-icon.svg"
            alt="Ali Raza logo"
            width={40}
            height={40}
            priority
            className="size-10 rounded-full border border-border bg-muted/30 p-1"
          />
          <div>
            <p className="text-sm font-medium text-foreground">Ali Raza</p>
            <p className="text-xs text-muted-foreground">Developer Portfolio</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition',
                  active
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="mailto:btwaliraza110@gmail.com?subject=Hello Ali"
            className="hidden rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20 sm:inline-flex"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}
