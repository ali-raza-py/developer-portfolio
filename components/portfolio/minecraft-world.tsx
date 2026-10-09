'use client'

import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Blocks,
  Code2,
  Mail,
  Settings,
  Trophy,
} from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import { AmbientAudioControls } from '@/components/ambient-audio'
import { formatDate, type BlogCategory } from '@/lib/content'
import { portfolioProjects } from '@/lib/portfolio-projects'
import { getProject } from '@/lib/projects'

type Screen =
  | 'world'
  | 'about'
  | 'projects'
  | 'project'
  | 'skills'
  | 'experience'
  | 'achievements'
  | 'contact'
  | 'articles'
  | 'settings'

type WorldArticle = {
  slug: string
  title: string
  description: string
  date: string
  category: BlogCategory
  coverImage: string
}

const destinations: Array<{
  screen: Screen
  label: string
}> = [
  { screen: 'experience', label: 'Experience' },
  { screen: 'projects', label: 'Projects' },
  { screen: 'about', label: 'About Me' },
]

const screenLabels: Record<Exclude<Screen, 'world' | 'project'>, string> = {
  about: 'About Me',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  achievements: 'Achievements',
  contact: 'Contact',
  articles: 'Articles',
  settings: 'More options',
}

const skillInventory = [
  {
    category: 'Languages',
    icon: '/images/inventory/enchanted-book.png',
    skills: [
      { name: 'Python', note: 'Primary language for systems, automation, and AI workflows.', projects: ['MediCare AI', 'Algorify', 'AI-HUB'] },
      { name: 'C++', note: 'Active study through computer science fundamentals and algorithms.', projects: ['Learning path'] },
      { name: 'JavaScript / TypeScript', note: 'Interface and application logic for full-stack products.', projects: ['AI-HUB', 'Portfolio'] },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    icon: '/images/inventory/diamond-pickaxe.png',
    skills: [
      { name: 'Next.js', note: 'Used to build structured, responsive product interfaces.', projects: ['MediCare AI', 'AI-HUB', 'Portfolio'] },
      { name: 'React', note: 'Component architecture for interactive product surfaces.', projects: ['MediCare AI', 'Algorify', 'Portfolio'] },
      { name: 'Tailwind CSS', note: 'Utility styling for fast, consistent interface systems.', projects: ['Portfolio'] },
      { name: 'FastAPI / Flask', note: 'Python API frameworks in the current learning and build path.', projects: ['MediCare AI', 'Learning path'] },
      { name: 'Supabase / PostgreSQL', note: 'Data and auth tooling used in full-stack architecture work.', projects: ['MediCare AI'] },
      { name: 'REST APIs', note: 'A practical boundary between interfaces, services, and processing.', projects: ['MediCare AI', 'AI-HUB'] },
      { name: 'Dash / Plotly', note: 'Python tools for data-oriented interfaces and visual feedback.', projects: ['Learning path'] },
    ],
  },
  {
    category: 'AI Engineering',
    icon: '/images/inventory/diamond-axe.png',
    skills: [
      { name: 'PaddleOCR', note: 'Text extraction layer for scanned medical documents.', projects: ['MediCare AI'] },
      { name: 'Groq AI', note: 'Interpretation layer in a documented AI workflow prototype.', projects: ['MediCare AI'] },
      { name: 'AI tooling research', note: 'Structured evaluation of practical AI tools and workflows.', projects: ['AI-HUB'] },
    ],
  },
  {
    category: 'Tools & Infra',
    icon: '/images/inventory/diamond-pickaxe.png',
    skills: [
      { name: 'Git / GitHub', note: 'Version control and public project documentation.', projects: ['All repositories'] },
      { name: 'Markdown', note: 'Case studies, project notes, and content-first documentation.', projects: ['Portfolio'] },
      { name: 'Vercel', note: 'Deployment platform used for web project delivery.', projects: ['MediCare AI', 'Portfolio'] },
      { name: 'Docker', note: 'Containerization in the infrastructure learning track.', projects: ['Learning path'] },
      { name: 'Cloud / DevOps', note: 'Current exploration area, not presented as production expertise.', projects: ['Learning path'] },
    ],
  },
]

const journeyStages = [
  { name: 'Programming', detail: 'First logic and syntax — school CS and STEAM UP STEM enrichment.', evidence: 'QBHSS / PECHS Govt Science College' },
  { name: 'Python', detail: 'OOP, NumPy, Pandas, Matplotlib — coursework plus small systems.', evidence: 'Bank management system, OOP-IN-PYTHON' },
  { name: 'Data structures', detail: 'Sorting algorithms implemented as an event-driven laboratory.', evidence: 'Algorify' },
  { name: 'Full stack', detail: 'Frontend to API to processing — a real multi-layer product.', evidence: 'MediCare AI' },
  { name: 'AI / ML', detail: 'OCR + LLM pipelines; structured, verified AI tooling research.', evidence: 'MediCare AI · AI-HUB' },
  { name: 'Systems', detail: 'Next: cloud, DevOps, cybersecurity — the layer underneath.', evidence: 'Direction — in study' },
]

const achievementRecords = [
  { name: 'Alibaba Cloud AI Hackathon Pakistan 2026', note: 'MediCare AI prototype developed for the hackathon.' },
  { name: 'Google Gemini AI — Certified Student', note: 'Issuer listed in the portfolio certification record: Google.' },
  { name: 'Anthropic Academy — MCP', note: 'Certification listed in the portfolio learning record.' },
  { name: 'MCP Advanced Topics', note: 'Issuer listed in the portfolio certification record: Anthropic Academy.' },
  { name: 'GenAI Learning Badges', note: 'Issuer listed in the portfolio certification record: Google Cloud.' },
  { name: 'Responsible AI Learning', note: 'Issuer listed in the portfolio certification record: Google.' },
  { name: 'Python-related certifications', note: 'Various issuers, as recorded in the portfolio.' },
]

function readScreenFromUrl(): { screen: Screen; projectSlug: string } {
  const params = new URLSearchParams(window.location.search)
  const allowed: Screen[] = [
    'world',
    'about',
    'projects',
    'project',
    'skills',
    'experience',
    'achievements',
    'contact',
    'articles',
    'settings',
  ]
  const candidate = params.get('screen')
  const projectSlug = params.get('project') ?? ''
  const requestedScreen = allowed.includes(candidate as Screen) ? (candidate as Screen) : 'world'
  const projectExists = Boolean(getProject(projectSlug) || portfolioProjects.some((project) => project.slug === projectSlug))
  return {
    screen: requestedScreen === 'project' && !projectExists ? 'projects' : requestedScreen,
    projectSlug: requestedScreen === 'project' && projectExists ? projectSlug : '',
  }
}

function projectTitle(slug: string) {
  if (slug === 'code-yaar') return 'Code Yaar'
  const project = getProject(slug)
  if (project) return project.title
  return portfolioProjects.find((item) => item.slug === slug)?.name ?? 'Project'
}

export function MinecraftWorld({ articles }: { articles: WorldArticle[] }) {
  const [screen, setScreen] = useState<Screen>('world')
  const [projectSlug, setProjectSlug] = useState('')
  const [historyDepth, setHistoryDepth] = useState(0)
  const [activeSkillCategory, setActiveSkillCategory] = useState('Languages')
  const [selectedSkillName, setSelectedSkillName] = useState('Python')
  const [isReady, setIsReady] = useState(false)
  const currentScreenLabel = screen === 'world' || screen === 'project' ? undefined : screenLabels[screen]

  useEffect(() => {
    const initial = readScreenFromUrl()
    setScreen(initial.screen)
    setProjectSlug(initial.projectSlug)
    const depth = Number(window.history.state?.minecraftWorldDepth ?? 0)
    setHistoryDepth(Number.isFinite(depth) ? depth : 0)
    window.history.replaceState(
      { ...window.history.state, minecraftWorldDepth: Number.isFinite(depth) ? depth : 0 },
      '',
      window.location.href,
    )
    const loadingTimer = window.setTimeout(() => setIsReady(true), 480)

    const syncFromHistory = () => {
      const next = readScreenFromUrl()
      const nextDepth = Number(window.history.state?.minecraftWorldDepth ?? 0)
      setScreen(next.screen)
      setProjectSlug(next.projectSlug)
      setHistoryDepth(Number.isFinite(nextDepth) ? nextDepth : 0)
    }
    window.addEventListener('popstate', syncFromHistory)
    return () => {
      window.clearTimeout(loadingTimer)
      window.removeEventListener('popstate', syncFromHistory)
    }
  }, [])

  const openScreen = useCallback(
    (nextScreen: Screen, nextProjectSlug = '') => {
      const params = new URLSearchParams()
      if (nextScreen !== 'world') params.set('screen', nextScreen)
      if (nextProjectSlug) params.set('project', nextProjectSlug)
      const query = params.toString()
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}`
      const nextDepth = historyDepth + 1
      window.history.pushState(
        { minecraftWorldDepth: nextDepth },
        '',
        nextUrl,
      )
      setHistoryDepth(nextDepth)
      setScreen(nextScreen)
      setProjectSlug(nextProjectSlug)
    },
    [historyDepth],
  )

  const goBack = useCallback(() => {
    if (historyDepth > 0) {
      window.history.back()
      return
    }
    const url = window.location.pathname
    window.history.replaceState({ minecraftWorldDepth: 0 }, '', url)
    setScreen('world')
    setProjectSlug('')
  }, [historyDepth])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && screen !== 'world') goBack()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goBack, screen])

  const selectedProject = portfolioProjects.find((item) => item.slug === projectSlug)
  const selectedCaseStudy = getProject(projectSlug)
  const activeSkillGroup = skillInventory.find((group) => group.category === activeSkillCategory) ?? skillInventory[0]
  const selectedSkill = activeSkillGroup.skills.find((skill) => skill.name === selectedSkillName) ?? activeSkillGroup.skills[0]

  return (
    <main className="minecraft-world" data-ready={isReady} aria-busy={!isReady}>
      {!isReady ? (
        <div className="minecraft-world-loading" role="status" aria-live="polite">
          <span className="minecraft-loading-block" aria-hidden="true" />
          <span className="minecraft-loading-label">Loading world</span>
          <span className="minecraft-loading-track" aria-hidden="true">
            <span />
          </span>
        </div>
      ) : null}
      <header className="minecraft-world-hud">
        <Link href="/" className="minecraft-world-brand" aria-label="Return to Ali Raza's portfolio world">
          <span className="minecraft-world-cube" aria-hidden="true" />
          <span>ALI RAZA</span>
        </Link>
        {screen !== 'world' ? (
          <button className="minecraft-back-button" type="button" onClick={goBack}>
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back</span>
          </button>
        ) : (
          <span className="minecraft-world-hud-label">SURVIVAL MODE · PORTFOLIO WORLD</span>
        )}
        {screen !== 'world' ? <AmbientAudioControls compact /> : null}
      </header>

      <section className="minecraft-world-viewport" aria-label="Portfolio game interface">
        {screen === 'world' ? (
          <div className="minecraft-world-home minecraft-screen-enter">
            <div className="minecraft-world-branding">
              <p className="minecraft-world-eyebrow">SOFTWARE DEVELOPER · KARACHI, PAKISTAN</p>
              <h1>ALI RAZA</h1>
              <p>Exploring AI. Building useful software systems.</p>
            </div>
            <nav className="minecraft-world-destinations" aria-label="Explore Ali Raza's portfolio">
              {destinations.map(({ screen: destinationScreen, label }) => (
                <button
                  className="minecraft-world-destination"
                  key={destinationScreen}
                  type="button"
                  onClick={() => openScreen(destinationScreen)}
                >
                  <span>{label}</span>
                </button>
              ))}
            </nav>
            <div className="minecraft-world-quicklinks">
              <a href="https://github.com/ali-raza-py" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Code2 size={16} aria-hidden="true" />
              </a>
              <Link href="/blog">Blog</Link>
              <button type="button" onClick={() => openScreen('skills')}>Skills</button>
              <a href="https://www.linkedin.com/in/ali-r-a8a144391" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <span aria-hidden="true">in</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="minecraft-screen minecraft-screen-enter" key={`${screen}:${projectSlug}`}>
            <div className="minecraft-screen-heading">
              <div>
                <p className="minecraft-world-eyebrow">PORTFOLIO WORLD / {currentScreenLabel ?? 'PROJECT'}</p>
                <h1>{screen === 'project' ? projectTitle(projectSlug) : currentScreenLabel}</h1>
              </div>
              {screen === 'project' ? (
                <button className="minecraft-secondary-button" type="button" onClick={() => openScreen('projects')}>
                  <Blocks size={16} aria-hidden="true" /> Project inventory
                </button>
              ) : null}
            </div>

            {screen === 'about' ? (
              <div className="minecraft-about-screen minecraft-screen-content">
                <div className="minecraft-about-portrait">
                  <img src="/images/ali-raza-profile.png" alt="Ali Raza profile portrait" />
                  <span>PLAYER PROFILE · ALI RAZA</span>
                </div>
                <div className="minecraft-inventory-panel">
                  <h2>About the player</h2>
                  <p>Ali is a computer science student in Karachi on a software engineering path. He builds full-stack products, studies algorithms by implementing them, and keeps AI systems inspectable.</p>
                  <ul className="minecraft-fact-slots">
                    <li>Python and C++ foundations</li>
                    <li>Next.js full-stack implementation</li>
                    <li>AI/ML, cloud, DevOps, and cybersecurity in study</li>
                  </ul>
                  <Link className="minecraft-primary-button" href="/resume">Download CV <ArrowUpRight size={15} aria-hidden="true" /></Link>
                </div>
              </div>
            ) : null}

            {screen === 'projects' ? (
              <div className="minecraft-screen-content">
                <p className="minecraft-screen-intro">Select an item to inspect its verified details, technologies, and real destinations.</p>
                <div className="minecraft-project-inventory">
                  {portfolioProjects.map((project, index) => {
                    const record = getProject(project.slug)
                    const label = project.slug === 'code-yaar' ? 'Code Yaar' : project.name
                    return (
                      <button
                        key={project.slug}
                        type="button"
                        className={`minecraft-project-item tone-${project.accent}`}
                        onClick={() => openScreen('project', project.slug)}
                        aria-label={`Open ${label} details`}
                      >
                        <span className="minecraft-project-item-icon">{record?.video ? '▶' : ['✚', '✦', '◆', '⌘', '▤'][index]}</span>
                        <strong>{label}</strong>
                        <small>{record?.statusLabel ?? project.status}</small>
                      </button>
                    )
                  })}
                </div>
                <Link className="minecraft-secondary-button" href="/projects">
                  Full project archive <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            ) : null}

            {screen === 'project' ? (
              <div className="minecraft-project-detail minecraft-screen-content">
                {selectedCaseStudy?.video ? (
                  <video className="minecraft-project-media" controls muted playsInline preload="metadata" aria-label={`${selectedCaseStudy.title} project preview`}>
                    <source src={selectedCaseStudy.video} type="video/mp4" />
                  </video>
                ) : selectedCaseStudy?.images[0] ? (
                  <img className="minecraft-project-media" src={selectedCaseStudy.images[0]} alt={`${selectedCaseStudy.title} project`} />
                ) : null}
                <div className="minecraft-inventory-panel">
                  <p className="minecraft-world-eyebrow">{selectedCaseStudy?.category ?? selectedProject?.status}</p>
                  <p className="minecraft-project-description">
                    {selectedCaseStudy?.description[0] ?? selectedProject?.description ?? 'Project details are not available.'}
                  </p>
                  {selectedCaseStudy?.description.slice(1).map((paragraph) => (
                    <p className="minecraft-project-description" key={paragraph}>{paragraph}</p>
                  ))}
                  <h2>Item components</h2>
                  <div className="minecraft-project-stack">
                    {(selectedCaseStudy?.stack ?? selectedProject?.stack ?? []).map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                  <div className="minecraft-project-actions">
                    {selectedProject?.url ? (
                      <a className="minecraft-primary-button" href={selectedProject.url} target="_blank" rel="noopener noreferrer">
                        Visit Project <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    ) : selectedProject?.githubUrl ? (
                      <a className="minecraft-primary-button" href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        Open Repository <Code2 size={15} aria-hidden="true" />
                      </a>
                    ) : <span className="minecraft-status-note">No live destination is recorded yet.</span>}
                    {selectedCaseStudy?.liveUrl ? (
                      <a className="minecraft-secondary-button" href={selectedCaseStudy.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live demo <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    ) : null}
                    {selectedCaseStudy?.githubUrl ? (
                      <a className="minecraft-secondary-button" href={selectedCaseStudy.githubUrl} target="_blank" rel="noopener noreferrer">
                        GitHub <Code2 size={15} aria-hidden="true" />
                      </a>
                    ) : null}
                    {selectedCaseStudy ? (
                      <Link className="minecraft-secondary-button" href={`/projects/${selectedCaseStudy.slug}`}>
                        Full case study <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {screen === 'skills' ? (
              <div className="minecraft-screen-content minecraft-skill-inventory">
                <div className="minecraft-enchanting-top">
                  <aside className="minecraft-enchanting-book-panel" aria-live="polite">
                    <h2>{selectedSkill.name}</h2>
                    <span className="minecraft-enchanting-runes" aria-hidden="true">ᚠ ᛃ ᛟ ᚱ ᛉ</span>
                    <img src="/images/inventory/enchanted-book.png" alt="" className="minecraft-floating-book" />
                    <p>{selectedSkill.note}</p>
                    <small>Connected work</small>
                    <strong>{selectedSkill.projects.join(' · ')}</strong>
                  </aside>
                  <div className="minecraft-skill-folders" role="group" aria-label="Skill folders">
                    {skillInventory.map((group, index) => (
                      <button
                        aria-pressed={activeSkillCategory === group.category}
                        className={`minecraft-skill-folder${activeSkillCategory === group.category ? ' is-active' : ''}`}
                        key={group.category}
                        onClick={() => {
                          setActiveSkillCategory(group.category)
                          setSelectedSkillName(group.skills[0].name)
                        }}
                        type="button"
                      >
                        <span className="minecraft-folder-item"><img src={group.icon} alt="" /></span>
                        <span className="minecraft-folder-copy">
                          <strong>{group.category}</strong>
                          <small>{group.skills.length} skills</small>
                        </span>
                        <span className="minecraft-folder-level" aria-hidden="true">{index + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <section className="minecraft-enchanted-items" aria-labelledby="enchanted-items-title">
                  <div className="minecraft-enchanted-items-heading">
                    <h2 id="enchanted-items-title">{activeSkillGroup.category}</h2>
                    <span>{activeSkillGroup.skills.length} items</span>
                  </div>
                  <div className="minecraft-skill-slots" role="group" aria-label={`${activeSkillGroup.category} skills`}>
                    {activeSkillGroup.skills.map((skill) => (
                      <button
                        aria-pressed={selectedSkillName === skill.name}
                        className="minecraft-skill-slot"
                        key={skill.name}
                        onClick={() => setSelectedSkillName(skill.name)}
                        type="button"
                      >
                        <span className="minecraft-skill-book-slot"><img src="/images/inventory/enchanted-book.png" alt="" /></span>
                        <span>{skill.name}</span>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            ) : null}

            {screen === 'experience' ? (
              <ol className="minecraft-screen-content minecraft-journey-inventory">
                {journeyStages.map((stage, index) => (
                  <li className="minecraft-inventory-panel" key={stage.name}>
                    <span className="minecraft-stage-index">0{index + 1}</span>
                    <div><h2>{stage.name}</h2><p>{stage.detail}</p><small>{stage.evidence}</small></div>
                  </li>
                ))}
              </ol>
            ) : null}

            {screen === 'achievements' ? (
              <div className="minecraft-screen-content">
                <p className="minecraft-screen-intro">Milestones and certifications recorded in the portfolio. No unverified awards or metrics.</p>
                <div className="minecraft-achievement-grid">
                  {achievementRecords.map((record, index) => (
                    <article className="minecraft-achievement-slot" key={record.name}>
                      <Trophy size={22} aria-hidden="true" />
                      <span>ACHIEVEMENT · {String(index + 1).padStart(2, '0')}</span>
                      <h2>{record.name}</h2>
                      <p>{record.note}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {screen === 'settings' ? (
              <div className="minecraft-screen-content">
                <p className="minecraft-screen-intro">More portfolio screens</p>
                <div className="minecraft-settings-options">
                  <button className="minecraft-world-destination" type="button" onClick={() => openScreen('achievements')}>
                    <span>Achievements</span>
                  </button>
                  <button className="minecraft-world-destination" type="button" onClick={() => openScreen('contact')}>
                    <span>Contact</span>
                  </button>
                  <Link className="minecraft-world-destination" href="/resume">
                    <span>Resume</span>
                  </Link>
                </div>
              </div>
            ) : null}

            {screen === 'contact' ? (
              <div className="minecraft-screen-content minecraft-contact-grid">
                <p className="minecraft-screen-intro">Open to internships, collaborations, hackathons, and thoughtful conversations about software engineering, AI, and systems.</p>
                <a className="minecraft-contact-slot" href="mailto:btwaliraza110@gmail.com?subject=Hello%20Ali"><Mail size={20} aria-hidden="true" /><span>Email</span><strong>btwaliraza110@gmail.com</strong><ArrowUpRight size={15} aria-hidden="true" /></a>
                <a className="minecraft-contact-slot" href="https://github.com/ali-raza-py" target="_blank" rel="noopener noreferrer"><Code2 size={20} aria-hidden="true" /><span>GitHub</span><strong>github.com/ali-raza-py</strong><ArrowUpRight size={15} aria-hidden="true" /></a>
                <a className="minecraft-contact-slot" href="https://www.linkedin.com/in/ali-r-a8a144391" target="_blank" rel="noopener noreferrer"><span className="minecraft-linkedin-mark">in</span><span>LinkedIn</span><strong>linkedin.com/in/ali-r-a8a144391</strong><ArrowUpRight size={15} aria-hidden="true" /></a>
                <Link className="minecraft-contact-slot" href="/resume"><BookOpen size={20} aria-hidden="true" /><span>Resume</span><strong>Download Ali's CV</strong><ArrowUpRight size={15} aria-hidden="true" /></Link>
              </div>
            ) : null}

            {screen === 'articles' ? (
              <div className="minecraft-screen-content minecraft-article-inventory">
                {articles.map((article, index) => (
                  <Link className="minecraft-article-slot" href={`/blog/${article.slug}`} key={article.slug}>
                    <img src={article.coverImage} alt="" />
                    <div><span>ARTICLE · {formatDate(article.date)} · {article.category}</span><h2>{article.title}</h2><p>{article.description}</p></div>
                    <ArrowUpRight size={18} aria-hidden="true" />
                    <span className="sr-only">Read article {index + 1}</span>
                  </Link>
                ))}
                {articles.length === 0 ? <p className="minecraft-inventory-panel">No articles are published yet.</p> : null}
                <Link className="minecraft-secondary-button" href="/blog">Open full article archive <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </div>
            ) : null}
          </div>
        )}
      </section>

      <footer className="minecraft-world-footer">
      {screen === 'world' ? (
        <>
          <div className="minecraft-world-footer-controls">
            <button type="button" className="minecraft-settings-button" onClick={() => openScreen('settings')} aria-label="Open more portfolio options">
              <Settings size={18} aria-hidden="true" />
            </button>
            <AmbientAudioControls compact />
            <span>PORTFOLIO WORLD</span>
          </div>
          <span className="minecraft-world-footer-disclaimer">Not an official Minecraft product.</span>
        </>
      ) : (
        <>
          <span>{`CURRENT SCREEN · ${screen.toUpperCase()}`}</span>
          <span>ALI RAZA · PORTFOLIO WORLD</span>
        </>
      )}
      </footer>
    </main>
  )
}
