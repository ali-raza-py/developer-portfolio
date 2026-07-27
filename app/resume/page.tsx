import type { Metadata } from 'next'
import { ArrowUpRight, Download } from 'lucide-react'
import { SiteHeader } from '@/components/content/site-header'
import { SiteFooter } from '@/components/portfolio/site-footer'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: `Resume | ${siteConfig.name}`,
  description: 'Resume and professional experience of Ali Raza.',
  alternates: {
    canonical: '/resume',
  },
}

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.04),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_24%)]" />
          <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-12 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Resume
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Professional Experience
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Class XI Computer Science student with a passion for software development, AI, and DevOps.
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href="/Ali_Raza_Resume.docx"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition hover:bg-primary/20"
                >
                  <Download className="size-4" />
                  Download Resume
                </a>
                <a
                  href="mailto:btwaliraza110@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-6 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
                >
                  <ArrowUpRight className="size-4" />
                  Contact
                </a>
              </div>
            </div>

            <div className="space-y-12">
              {/* Education */}
              <section className="space-y-6 rounded-2xl border border-border bg-card/30 p-8 backdrop-blur-xl transition-colors duration-300">
                <div className="space-y-2 border-b border-border pb-4">
                  <h2 className="text-2xl font-semibold text-foreground">Education</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-foreground">
                          PECHS Government Science College, Karachi
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Class XI Computer Science (Ongoing)
                        </p>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                        2024 – Present
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-border/50 pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-foreground">
                          Qamar Bani Hashim Higher Secondary School (QBHSS), Karachi
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Matriculation (Completed — 84% overall)
                        </p>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section className="space-y-6 rounded-2xl border border-border bg-card/30 p-8 backdrop-blur-xl transition-colors duration-300">
                <div className="space-y-2 border-b border-border pb-4">
                  <h2 className="text-2xl font-semibold text-foreground">Skills</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'C++', 'JavaScript', 'TypeScript'].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Frameworks & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Next.js', 'React', 'FastAPI', 'Docker'].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {['AI & ML', 'DevOps', 'Cloud Computing', 'Full Stack'].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Others</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Git', 'Terminal', 'REST APIs', 'Markdown'].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Core Principles */}
              <section className="space-y-6 rounded-2xl border border-border bg-card/30 p-8 backdrop-blur-xl transition-colors duration-300">
                <div className="space-y-2 border-b border-border pb-4">
                  <h2 className="text-2xl font-semibold text-foreground">Core Principles</h2>
                </div>

                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="mt-1 size-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Fundamentals before Frameworks</strong> — Strong computer science foundations enable better decision-making
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 size-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Ship Fast</strong> — Deliver working solutions quickly, iterate based on feedback
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 size-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Focus and Consistency</strong> — Deep work beats multitasking
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 size-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Learning Over Credentials</strong> — Actual skills matter more than degrees
                    </span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  )
}
