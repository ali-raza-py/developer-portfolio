import type { Metadata } from 'next'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'

import { SiteHeader } from '@/components/content/site-header'
import { SiteFooter } from '@/components/portfolio/site-footer'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume and background of Ali Raza, a computer science student building software, AI tools, and full-stack systems.',
  alternates: { canonical: '/resume' },
}

const skillGroups = [
  ['Building with', ['Python', 'Next.js', 'TypeScript', 'React', 'Dash', 'Plotly']],
  ['Learning', ['C++', 'Data Structures', 'Algorithms', 'Django', 'FastAPI', 'PostgreSQL']],
  ['Exploring', ['AI / ML', 'Cloud', 'DevOps', 'Cybersecurity']],
]

const projects = [
  { name: 'MediCare AI', stack: 'Next.js · React · TypeScript · Python · PaddleOCR · Groq AI', description: 'AI-powered medical document intelligence prototype built for the Alibaba Cloud AI Hackathon Pakistan 2026.', href: 'https://medicare-ai-sigma.vercel.app/' },
  { name: 'AI-HUB', stack: 'Next.js · Python · AI tooling research', description: 'A 102-tool AI reference generated from a single validated registry.', href: 'https://ali-raza-py.github.io/AI-HUB/' },
  { name: 'Algorify', stack: 'Python · Algorithms · Visualization', description: 'An event-driven sorting laboratory for understanding data structures and algorithms.', href: 'https://v0-algovizer.vercel.app/' },
  { name: 'DSA Vizer', stack: 'Python · Flask · Algorithms · Visualization', description: 'Interactive data structures and algorithms visualizer.', href: 'https://aliraza786.pythonanywhere.com/l' },
]

const certifications = [
  ['Google Gemini AI — Certified Student', 'Google'],
  ['Anthropic Academy — MCP', 'Anthropic'],
  ['MCP Advanced Topics', 'Anthropic Academy'],
  ['GenAI Learning Badges', 'Google Cloud'],
  ['Responsible AI Learning', 'Google'],
]

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main id="resume" className="resume-page min-h-screen bg-background text-foreground">
        <div className="resume-shell">
          <header className="resume-intro">
            <p className="type-meta">Resume / Ali Raza</p>
            <h1 className="type-display">Building from fundamentals<span>.</span></h1>
            <p className="resume-lede">
              Computer science student in Karachi on a software engineering path. I build useful software, explore AI, and study systems by implementing them.
            </p>
            <div className="resume-actions">
              <a className="reference-button reference-button-gold" href="/Ali_Raza_Resume.docx" download>
                <Download size={16} /> Download resume
              </a>
              <a className="reference-button" href="#profile">
                View profile <ArrowDown size={16} />
              </a>
            </div>
          </header>

          <div className="resume-grid">
            <section id="profile" className="resume-section resume-profile">
              <p className="type-meta">01 / Profile</p>
              <h2 className="type-editorial">A practical learner with a bias toward working systems.</h2>
              <p>
                Ali writes Python and C++, builds full-stack products with Next.js, and turns complex ideas into inspectable interfaces and workflows. Current interests include AI/ML, cloud, DevOps, cybersecurity, and the systems underneath them.
              </p>
            </section>

            <section className="resume-section">
              <p className="type-meta">02 / Education</p>
              <div className="resume-list">
                <article><h3>PECHS Government Science College, Karachi</h3><p>Class XI Computer Science · in progress</p><span>Current</span></article>
                <article><h3>QBHSS</h3><p>Matriculation (Science) · 84%</p><span>Earlier</span></article>
                <article><h3>STEAM UP STEM enrichment</h3><p>Python, data structures, and hands-on projects</p><span>Program</span></article>
              </div>
            </section>

            <section className="resume-section resume-wide">
              <p className="type-meta">03 / Skills</p>
              <div className="resume-skill-grid">
                {skillGroups.map(([label, items]) => (
                  <div key={label as string}><h3>{label}</h3><ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></div>
                ))}
              </div>
            </section>

            <section className="resume-section resume-wide">
              <p className="type-meta">04 / Selected projects</p>
              <div className="resume-project-list">
                {projects.map((project, index) => (
                  <article key={project.name}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3><a href={project.href} target="_blank" rel="noopener noreferrer">{project.name} ↗</a></h3>
                      <p>{project.description}</p>
                      <small>{project.stack}</small>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="resume-section">
              <p className="type-meta">05 / Certifications</p>
              <ul className="resume-certifications">{certifications.map(([name, issuer]) => <li key={name}><span>{name}</span><small>{issuer}</small></li>)}</ul>
            </section>

            <section className="resume-section">
              <p className="type-meta">06 / Achievement</p>
              <div className="resume-highlight">
                <span>2026</span>
                <h3>Alibaba Cloud AI Hackathon Pakistan</h3>
                <p>Built MediCare AI, a documented end-to-end prototype for medical document OCR, structured information, and AI-assisted interpretation.</p>
              </div>
            </section>
          </div>

          <div className="resume-footer-link">
            <a href="/#contact">Start a conversation <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
