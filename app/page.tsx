import { Hero } from '@/components/portfolio/hero'
import { CurrentFocus } from '@/components/portfolio/current-focus'
import { Philosophy } from '@/components/portfolio/philosophy'
import { Highlights } from '@/components/portfolio/highlights'
import { Education } from '@/components/portfolio/education'
import { PortfolioLinks } from '@/components/portfolio/portfolio-links'
import { AdditionalInfo } from '@/components/portfolio/additional-info'
import { FutureGoals } from '@/components/portfolio/future-goals'
import { SiteFooter } from '@/components/portfolio/site-footer'
import { SiteHeader } from '@/components/content/site-header'

export default function Page() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Hero />
      <Education />
      <CurrentFocus />
      <Philosophy />
      <Highlights />
      <PortfolioLinks />
      <AdditionalInfo />
      <FutureGoals />
      <SiteFooter />
    </main>
  )
}
