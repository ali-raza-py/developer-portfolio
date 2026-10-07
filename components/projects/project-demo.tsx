'use client'

import { useMemo, useState } from 'react'

type DemoProps = { slug: string }

const demoCopy: Record<string, { title: string; description: string }> = {
  'medicare-ai': {
    title: 'Document pipeline preview',
    description: 'Drop a sample document to see the honest OCR → interpretation flow.',
  },
  'ai-hub': {
    title: 'Tool registry explorer',
    description: 'Search a small validated registry slice, just like the generated reference pages.',
  },
  'code-yaar': {
    title: 'Learning progression preview',
    description: 'Move a learner from practice to build to proof of work.',
  },
  algorify: {
    title: 'Sorting laboratory',
    description: 'Replay a real sorting algorithm step by step in the browser.',
  },
}

export function ProjectDemo({ slug }: DemoProps) {
  const copy = demoCopy[slug]
  if (!copy) return null

  return (
    <section id="demo" className="border-b border-border bg-card/50 px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[100rem]">
        <p className="tech-label flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-accent/70" />
          Working demo
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <div>
            <h2 className="text-3xl font-semibold uppercase tracking-[-0.03em] text-foreground sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">{copy.description}</p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
              Local interaction · no fake API response
            </p>
          </div>
          <DemoSurface slug={slug} />
        </div>
      </div>
    </section>
  )
}

function DemoSurface({ slug }: DemoProps) {
  if (slug === 'medicare-ai') return <MedicareDemo />
  if (slug === 'ai-hub') return <AiHubDemo />
  if (slug === 'code-yaar') return <CodeYaarDemo />
  if (slug === 'algorify') return <AlgorifyDemo />
  return null
}

function MedicareDemo() {
  const [status, setStatus] = useState('Waiting for a document')
  const run = () => {
    setStatus('OCR extraction complete: review the captured text')
    window.setTimeout(() => setStatus('Interpretation ready for human review'), 650)
  }

  return (
    <DemoPanel>
      <button type="button" onClick={run} className="demo-action">
        Simulate document upload <span>↑</span>
      </button>
      <div className="demo-output"><span className="demo-dot" />{status}</div>
      <p className="demo-note">Prototype only — no medical advice or diagnosis is generated here.</p>
    </DemoPanel>
  )
}

function AiHubDemo() {
  const [query, setQuery] = useState('')
  const tools = ['Cursor', 'Claude Code', 'GitHub Copilot', 'Codex', 'Aider']
  const filtered = tools.filter((tool) => tool.toLowerCase().includes(query.toLowerCase()))

  return (
    <DemoPanel>
      <label className="sr-only" htmlFor="tool-search">Search tools</label>
      <input id="tool-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the registry…" className="demo-input" />
      <div className="demo-list">{filtered.map((tool, index) => <span key={tool}><b>0{index + 1}</b>{tool}<em>validated</em></span>)}</div>
      {!filtered.length && <div className="demo-output">No matching registry entry.</div>}
    </DemoPanel>
  )
}

function CodeYaarDemo() {
  const stages = ['Practice', 'Build', 'Proof of work']
  const [stage, setStage] = useState(0)

  return (
    <DemoPanel>
      <div className="demo-progress">{stages.map((item, index) => <button key={item} type="button" onClick={() => setStage(index)} className={index <= stage ? 'is-active' : ''}><span>0{index + 1}</span>{item}</button>)}</div>
      <div className="demo-output"><span className="demo-dot" />Current learner stage: {stages[stage]}</div>
      <button type="button" onClick={() => setStage((value) => Math.min(value + 1, stages.length - 1))} className="demo-action" disabled={stage === stages.length - 1}>Advance progression <span>→</span></button>
    </DemoPanel>
  )
}

function AlgorifyDemo() {
  const [values, setValues] = useState([7, 2, 9, 4, 1, 6])
  const [sorting, setSorting] = useState(false)
  const bars = useMemo(() => values, [values])

  const sort = () => {
    if (sorting) return
    setSorting(true)
    const next = [...values].sort((a, b) => a - b)
    next.forEach((value, index) => window.setTimeout(() => {
      setValues((current) => current.map((item, itemIndex) => itemIndex === index ? value : item))
      if (index === next.length - 1) setSorting(false)
    }, index * 160))
  }

  return (
    <DemoPanel>
      <div className="demo-bars">{bars.map((value, index) => <span key={`${index}-${value}`} style={{ height: `${value * 10}%` }}><i>{value}</i></span>)}</div>
      <button type="button" onClick={sort} className="demo-action" disabled={sorting}>{sorting ? 'Replaying steps…' : 'Run insertion sort'} <span>→</span></button>
    </DemoPanel>
  )
}

function DemoPanel({ children }: { children: React.ReactNode }) {
  return <div className="demo-panel">{children}</div>
}
