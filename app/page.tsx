import { SiteHeader } from '@/components/content/site-header'
import { HomeExperience } from '@/components/experience/home-experience'

/**
 * Homepage — the continuous 3D workspace journey.
 * `data-workspace` scopes the dark cinematic tokens to this page only, so
 * /projects, /blog and /resume keep the site's light/dark theme behaviour.
 */
export default function Page() {
  return (
    <main data-workspace className="min-h-screen">
      <SiteHeader />
      <HomeExperience />
    </main>
  )
}
