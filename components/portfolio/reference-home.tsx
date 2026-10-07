'use client'

import { ArrowDown, ArrowUpRight, Copy, GitBranch, Menu, VolumeX, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { portfolioProjects } from '@/lib/portfolio-projects'
import { projects as caseStudyProjects } from '@/lib/projects'
import { SignatureDeck } from '@/components/portfolio/signature-deck'
import { ProjectsDropdown } from '@/components/content/projects-dropdown'

const selectedProjects = ['medicare-ai', 'ai-hub', 'algorify', 'dsa-vizer'].map((slug, index) => {
  const project = caseStudyProjects.find((item) => item.slug === slug)
  const fallback = portfolioProjects.find((item) => item.slug === slug)
  return {
    index: String(index + 1).padStart(2, '0'),
    slug,
    name: project?.title ?? 'DSA Vizer',
    category: project?.category ?? 'Algorithms · Visualization',
    description: project?.shortDescription ?? fallback?.description ?? 'Interactive data structures and algorithms visualizer.',
    stack: project?.stack ?? fallback?.stack ?? ['Algorithms', 'Visualization'],
    problem: project?.problem[0] ?? 'A visual way to study data structures and algorithmic state changes.',
    solution: project?.approach[0] ?? 'A project record is not yet documented in this portfolio repository.',
    features: project?.features.slice(0, 3) ?? ['Project details pending verification'],
    image: project?.images[0],
    video: project?.video,
    videoFit: project?.video ? 'contain' : 'cover',
    playbackRate: slug === 'medicare-ai' ? 2 : 1,
    githubUrl: project?.githubUrl,
    liveUrl: project?.liveUrl,
    status: project?.statusLabel ?? fallback?.status ?? 'Details pending',
    accent: index === 0 ? 'accent' : index === 1 ? 'paper' : 'surface',
  }
})

function ProjectPreviewVideo({ src, title, playbackRate, fit }: { src: string; title: string; playbackRate: number; fit: 'contain' | 'cover' }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  return (
    <video
      ref={videoRef}
      className={`reference-project-stage-video is-${fit}`}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={`${title} project preview`}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', note: 'Primary language for systems, automation, and AI workflows.', projects: ['MediCare AI', 'Algorify', 'AI-HUB'] },
      { name: 'C++', note: 'Active study through computer science fundamentals and algorithms.', projects: ['Learning path'] },
      { name: 'JavaScript / TypeScript', note: 'Interface and application logic for full-stack products.', projects: ['AI-HUB', 'Portfolio'] },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'Next.js', note: 'Used to build structured, responsive product interfaces.', projects: ['MediCare AI', 'AI-HUB', 'Portfolio'] },
      { name: 'React', note: 'Component architecture for interactive product surfaces.', projects: ['MediCare AI', 'Algorify', 'Portfolio'] },
      { name: 'Tailwind CSS', note: 'Utility styling for fast, consistent interface systems.', projects: ['Portfolio'] },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'FastAPI / Flask', note: 'Python API frameworks in the current learning and build path.', projects: ['MediCare AI', 'Learning path'] },
      { name: 'Supabase / PostgreSQL', note: 'Data and auth tooling used in full-stack architecture work.', projects: ['MediCare AI'] },
      { name: 'REST APIs', note: 'A practical boundary between interfaces, services, and processing.', projects: ['MediCare AI', 'AI-HUB'] },
    ],
  },
  {
    category: 'AI / ML',
    skills: [
      { name: 'PaddleOCR', note: 'Text extraction layer for scanned medical documents.', projects: ['MediCare AI'] },
      { name: 'Groq AI', note: 'Interpretation layer in a documented AI workflow prototype.', projects: ['MediCare AI'] },
      { name: 'AI tooling research', note: 'Structured evaluation of practical AI tools and workflows.', projects: ['AI-HUB'] },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git / GitHub', note: 'Version control and public project documentation.', projects: ['All repositories'] },
      { name: 'Dash / Plotly', note: 'Python tools for data-oriented interfaces and visual feedback.', projects: ['Learning path'] },
      { name: 'Markdown', note: 'Case studies, project notes, and content-first documentation.', projects: ['Portfolio'] },
    ],
  },
  {
    category: 'Infrastructure',
    skills: [
      { name: 'Vercel', note: 'Deployment platform used for web project delivery.', projects: ['MediCare AI', 'Portfolio'] },
      { name: 'Docker', note: 'Containerization in the infrastructure learning track.', projects: ['Learning path'] },
      { name: 'Cloud / DevOps', note: 'Current exploration area, not presented as production expertise.', projects: ['Learning path'] },
    ],
  },
] as const

export function ReferenceHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [activeSkillCategory, setActiveSkillCategory] = useState(skillGroups[0].category)
  const [activeSkillName, setActiveSkillName] = useState(skillGroups[0].skills[0].name)
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(selectedProjects[0].slug)
  const [projectDetailOpen, setProjectDetailOpen] = useState(false)
  const [miniFocus, setMiniFocus] = useState<'frontend' | 'ai' | 'systems'>('frontend')
  const [copied, setCopied] = useState(false)
  const [portraitGlitch, setPortraitGlitch] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const sections = ['top', 'about', 'projects', 'contact']
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.4, 0.7] },
    )
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 },
    )
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) sectionObserver.observe(element)
    })
    document.querySelectorAll('.reference-reveal').forEach((element) => revealObserver.observe(element))
    return () => {
      sectionObserver.disconnect()
      revealObserver.disconnect()
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const toggleSound = async () => {
    if (soundOn) {
      audioRef.current?.pause()
      if (audioRef.current) audioRef.current.currentTime = 0
      setSoundOn(false)
      localStorage.setItem('ambient-sound', 'off')
      return
    }

    const audio = audioRef.current ?? new Audio('/audio/dreiton.mp3')
    audio.loop = true
    audio.volume = 0.22
    await audio.play()
    audioRef.current = audio
    setSoundOn(true)
    localStorage.setItem('ambient-sound', 'on')
  }
  const miniProjects = {
    frontend: {
      label: 'Frontend craft',
      title: 'Launch a polished landing page',
      stack: 'Next.js · TypeScript · Tailwind CSS',
      steps: ['Define the visual system', 'Build the responsive shell', 'Polish motion and accessibility'],
      command: 'npx create-next-app@latest my-landing-page',
      accent: 'green',
    },
    ai: {
      label: 'AI utility',
      title: 'Turn a messy workflow into a useful tool',
      stack: 'Python · API design · Structured output',
      steps: ['Map the input and failure cases', 'Keep model output inspectable', 'Ship a small, testable workflow'],
      command: 'python -m venv .venv && python app.py',
      accent: 'violet',
    },
    systems: {
      label: 'Systems thinking',
      title: 'Make an algorithm easy to understand',
      stack: 'Python · Data structures · Visual feedback',
      steps: ['Model the state transitions', 'Emit a deterministic trace', 'Let the browser replay each step'],
      command: 'python algorithms/visualize.py',
      accent: 'gold',
    },
  } as const
  const selectedMiniProject = miniProjects[miniFocus]
  const selectedSkillGroup = skillGroups.find((group) => group.category === activeSkillCategory) ?? skillGroups[0]
  const selectedSkill = selectedSkillGroup.skills.find((skill) => skill.name === activeSkillName) ?? selectedSkillGroup.skills[0]
  const selectedProject = selectedProjects.find((project) => project.slug === selectedProjectSlug) ?? selectedProjects[0]

  const selectSkillCategory = (category: (typeof skillGroups)[number]['category']) => {
    const group = skillGroups.find((item) => item.category === category) ?? skillGroups[0]
    setActiveSkillCategory(group.category)
    setActiveSkillName(group.skills[0].name)
  }

  const copyMiniCommand = async () => {
    await navigator.clipboard?.writeText(selectedMiniProject.command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const triggerPortraitGlitch = () => {
    setPortraitGlitch(true)
    window.setTimeout(() => setPortraitGlitch(false), 620)
  }

  return (
    <main className="reference-site">
      <header className="reference-nav-wrap">
        <nav className="reference-nav reference-reveal" aria-label="Primary navigation">
          <div className="reference-mobile-toggle">
            <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          <div className={`reference-nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#about" onClick={closeMenu} className={activeSection === 'about' ? 'is-active' : ''} aria-current={activeSection === 'about' ? 'location' : undefined}>About</a>
            <ProjectsDropdown
              triggerClassName={`reference-nav-projects${activeSection === 'projects' ? ' is-active' : ''}`}
              menuOpen={menuOpen}
              onNavigate={closeMenu}
            />
          </div>
          <button type="button" className={`reference-sound ${soundOn ? 'is-on' : ''}`} onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn ? 'Turn ambient sound off' : 'Turn ambient sound on'} title={soundOn ? 'Sound on' : 'Sound off'}>
            {soundOn ? <span className="reference-sound-bars" aria-hidden="true"><i /><i /><i /><i /></span> : <VolumeX size={16} />}
            <span className="reference-sound-label">{soundOn ? 'PLAYING' : 'MUTED'}</span>
          </button>
          <a className="reference-hello" href="#contact" onClick={closeMenu}>Say hello <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <section className="reference-hero" id="top">
        <div className="reference-hero-copy reference-reveal">
          <p className="reference-eyebrow"><span /> Ali Raza · portfolio 2026</p>
          <h1>ALI<br />RAZA<span>.</span></h1>
          <p className="reference-lede">I build useful software, explore AI, and turn ambitious ideas into working systems.</p>
          <div className="reference-actions">
            <a className="reference-button reference-button-gold" href="#projects">See the projects <ArrowDown size={18} /></a>
            <a className="reference-button" href="#contact">Say hello <ArrowUpRight size={18} /></a>
          </div>
        </div>
        <div className="reference-hero-portrait reference-reveal">
          <div className="reference-hero-portrait-ring" aria-hidden="true" />
          <img
            src="/images/ali-raza-profile.png"
            alt="Ali Raza side-profile portrait"
            role="button"
            tabIndex={0}
            className={portraitGlitch ? 'is-glitching' : ''}
            aria-label="Trigger portrait glitch effect"
            onClick={triggerPortraitGlitch}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                triggerPortraitGlitch()
              }
            }}
          />
        </div>
        <div className="reference-scroll-mark">SCROLL <ArrowDown size={16} /></div>
      </section>

      <section className="reference-about reference-panel" id="about">
        <div className="reference-panel-art reference-reveal">
          <div className="reference-card-stack">
            <div className="reference-playing-card card-white"><small>01 ♦</small><strong>ABOUT</strong><span>Who I am.</span></div>
            <div className="reference-playing-card card-green"><small>02 ♣</small><strong>PROJECTS</strong><span>Work that ships.</span></div>
            <div className="reference-playing-card card-violet"><small>03 ♥</small><strong>SKILLS</strong><span>How I build.</span></div>
          </div>
        </div>
        <div className="reference-panel-copy reference-reveal">
          <p className="reference-file-label">FILE 01 · ABOUT</p>
          <h2>About<span>.</span></h2>
          <p>Ali is a computer science student in Karachi on a software engineering path. He builds full-stack products, studies algorithms by implementing them, and keeps AI systems inspectable.</p>
          <ul className="reference-facts">
            <li>Python and C++ foundations</li>
            <li>Next.js full-stack implementation</li>
            <li>AI/ML, cloud, DevOps, and cybersecurity in study</li>
          </ul>
          <a className="reference-button reference-button-light" href="/resume">Download CV <ArrowDown size={17} /></a>
        </div>
      </section>

      <section className="reference-skills reference-panel" id="skills">
        <div className="reference-panel-copy reference-reveal">
          <p className="reference-file-label">FILE 02 · SKILLS</p>
          <h2>Skills<span>.</span></h2>
          <p>Explore the stack by category. Every entry points to where it is used, studied, or currently being explored—never an arbitrary score.</p>
        </div>
        <div className="reference-skill-explorer reference-reveal">
          <div className="reference-skill-categories" role="tablist" aria-label="Skill categories">
            {skillGroups.map((group, index) => (
              <button
                key={group.category}
                type="button"
                role="tab"
                aria-selected={activeSkillCategory === group.category}
                className={activeSkillCategory === group.category ? 'is-active' : ''}
                onClick={() => selectSkillCategory(group.category)}
              >
                <span>0{index + 1}</span>{group.category}
              </button>
            ))}
          </div>
          <div className="reference-skill-detail">
            <div className="reference-skill-list" role="tablist" aria-label={`${selectedSkillGroup.category} skills`}>
              {selectedSkillGroup.skills.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  role="tab"
                  aria-selected={activeSkillName === skill.name}
                  className={activeSkillName === skill.name ? 'is-active' : ''}
                  onMouseEnter={() => setActiveSkillName(skill.name)}
                  onFocus={() => setActiveSkillName(skill.name)}
                  onClick={() => setActiveSkillName(skill.name)}
                >
                  {skill.name}<span>↗</span>
                </button>
              ))}
            </div>
            <article className="reference-skill-inspector" aria-live="polite">
              <p className="type-meta">{selectedSkillGroup.category} / verified context</p>
              <h3>{selectedSkill.name}</h3>
              <p>{selectedSkill.note}</p>
              <div><span>Connected work</span><strong>{selectedSkill.projects.join(' · ')}</strong></div>
            </article>
          </div>
        </div>
      </section>

      <div className="reference-project-ticker" aria-hidden="true">
        <div className="reference-project-ticker-track">
          {Array.from({ length: 2 }).flatMap((_, batch) => ['PROJECTS', 'PROJECTS', 'PROJECTS', 'PROJECTS', 'PROJECTS'].map((label, index) => (
            <span key={`${batch}-${index}`}>{label} <b>♣</b></span>
          )))}
        </div>
      </div>

      <section className="reference-lab reference-panel" id="lab">
        <div className="reference-section-heading reference-reveal">
          <div><p className="reference-file-label">FILE 03 · MINI LAB</p><h2>Build something<span>.</span></h2></div>
          <p>A small working project, not a mockup. Pick a direction and get a concrete first move.</p>
        </div>
        <div className="reference-lab-grid reference-reveal">
          <div className="reference-lab-menu" role="tablist" aria-label="Mini project directions">
            {(Object.keys(miniProjects) as Array<keyof typeof miniProjects>).map((focus) => (
              <button
                key={focus}
                type="button"
                role="tab"
                aria-selected={miniFocus === focus}
                className={miniFocus === focus ? 'is-active' : ''}
                onClick={() => setMiniFocus(focus)}
              >
                <span>0{Object.keys(miniProjects).indexOf(focus) + 1}</span>
                {miniProjects[focus].label}
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
          <article className={`reference-lab-card lab-${selectedMiniProject.accent}`}>
            <div className="reference-lab-card-top"><span>WORKING MINI PROJECT</span><span>● LIVE IN BROWSER</span></div>
            <p className="reference-file-label">{selectedMiniProject.label}</p>
            <h3>{selectedMiniProject.title}</h3>
            <p className="reference-lab-stack">{selectedMiniProject.stack}</p>
            <ol>
              {selectedMiniProject.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}
            </ol>
            <div className="reference-lab-command">
              <code>{selectedMiniProject.command}</code>
              <button type="button" onClick={copyMiniCommand} aria-label="Copy starter command">
                <Copy size={14} /> {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="reference-projects" id="projects">
        <div className="reference-section-heading reference-reveal">
          <div><p className="reference-file-label">FILE 04 · PROJECT SELECTOR</p><h2>Projects<span>.</span></h2></div>
          <p>Four project records. Select one to inspect the problem, approach, stack, and links.</p>
        </div>
        <div className="reference-project-selector reference-reveal" role="tablist" aria-label="Selected projects">
          {selectedProjects.map((project) => (
            <button key={project.slug} type="button" role="tab" aria-selected={selectedProjectSlug === project.slug} className={selectedProjectSlug === project.slug ? 'is-active' : ''} onClick={() => { setSelectedProjectSlug(project.slug); setProjectDetailOpen(false) }}>
              <span>{project.index}</span><strong>{project.name}</strong><small>{project.category}</small><i>↗</i>
            </button>
          ))}
        </div>
        <article className={`reference-project-stage reference-project-stage-${selectedProject.accent} reference-reveal`} key={selectedProject.slug}>
          <div className="reference-project-stage-visual" aria-label={`${selectedProject.name} project visual`}>
            <span className="reference-project-stage-index">{selectedProject.index} / 04</span>
            {selectedProject.video ? (
              <ProjectPreviewVideo
                src={selectedProject.video}
                title={selectedProject.name}
                playbackRate={selectedProject.playbackRate}
                fit={selectedProject.videoFit}
              />
            ) : selectedProject.image ? (
              <img src={selectedProject.image} alt={`${selectedProject.name} interface`} loading="lazy" />
            ) : null}
            <strong>{selectedProject.name}</strong>
          </div>
          <div className="reference-project-stage-copy">
            <p className="reference-file-label">{selectedProject.status}</p>
            <h3>{selectedProject.name}</h3>
            <p>{selectedProject.description}</p>
            <div className="reference-tags">{selectedProject.stack.slice(0, 8).map((tech) => <span key={tech}>{tech}</span>)}</div>
            <div className="reference-project-actions">
              {selectedProject.liveUrl ? <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={15} /></a> : <span className="reference-unavailable">Live demo not verified</span>}
              {selectedProject.githubUrl ? <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"><GitBranch size={15} /> GitHub</a> : <span className="reference-unavailable">GitHub not verified</span>}
              {selectedProject.slug !== 'dsa-vizer' ? <Link href={`/projects/${selectedProject.slug}`}>Case study <ArrowUpRight size={15} /></Link> : null}
            </div>
            <button type="button" className="reference-project-detail-toggle" aria-expanded={projectDetailOpen} onClick={() => setProjectDetailOpen((open) => !open)}>{projectDetailOpen ? 'Close detail' : 'Reveal detail'} <span>{projectDetailOpen ? '↑' : '↓'}</span></button>
          </div>
        </article>
        {projectDetailOpen ? (
          <div className="reference-project-detail reference-reveal">
            <div><p className="type-meta">Problem</p><p>{selectedProject.problem}</p></div>
            <div><p className="type-meta">How it works</p><p>{selectedProject.solution}</p></div>
            <div><p className="type-meta">Features</p><ul>{selectedProject.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
          </div>
        ) : null}
        <div className="reference-project-note"><span>Proof over polish.</span> Media is shown only when a verified project asset exists.</div>
      </section>

      <SignatureDeck />

      <section className="reference-contact" id="contact">
        <div className="reference-contact-copy reference-reveal">
          <p className="reference-file-label">FILE 05 · CONTACT</p>
          <h2>Let&apos;s build<br />something<span>.</span></h2>
          <p>Open to internships, collaborations, hackathons, and thoughtful conversations about software engineering, AI, and systems.</p>
        </div>
        <div className="reference-contact-links reference-reveal" aria-label="Contact methods">
          <a href="mailto:btwaliraza110@gmail.com?subject=Hello%20Ali" className="reference-contact-link">
            <span><small>Email</small><strong>btwaliraza110@gmail.com</strong></span><ArrowUpRight size={18} />
          </a>
          <a href="https://github.com/ali-raza-py" target="_blank" rel="noopener noreferrer" className="reference-contact-link">
            <span><small>GitHub</small><strong>github.com/ali-raza-py</strong></span><ArrowUpRight size={18} />
          </a>
          <a href="https://www.linkedin.com/in/ali-r-a8a144391" target="_blank" rel="noopener noreferrer" className="reference-contact-link">
            <span><small>LinkedIn</small><strong>linkedin.com/in/ali-r-a8a144391</strong></span><ArrowUpRight size={18} />
          </a>
          <button type="button" className="reference-contact-copy-button" onClick={() => { navigator.clipboard?.writeText('btwaliraza110@gmail.com'); setCopied(true) }}>
            <Copy size={13} /> {copied ? 'Email copied' : 'Copy email'}
          </button>
        </div>
      </section>
      <footer className="reference-footer"><span>Ali Raza · software engineering student</span><a href="#top">Back to top ↑</a></footer>
    </main>
  )
}

function caseStudyProject(slug: string) {
  return slug !== 'dsa-vizer'
}
