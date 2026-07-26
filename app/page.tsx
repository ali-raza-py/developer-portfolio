import { Hero } from '@/components/portfolio/hero'
import { CurrentFocus } from '@/components/portfolio/current-focus'
import { Philosophy } from '@/components/portfolio/philosophy'
import { Highlights } from '@/components/portfolio/highlights'
import { AdditionalInfo } from '@/components/portfolio/additional-info'
import { FutureGoals } from '@/components/portfolio/future-goals'
import { SiteFooter } from '@/components/portfolio/site-footer'

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CurrentFocus />
      <Philosophy />
      <Highlights />
      <AdditionalInfo />
      <FutureGoals />
      <SiteFooter />
    </main>
  )
}
