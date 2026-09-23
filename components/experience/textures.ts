import * as THREE from 'three'

import type { Project } from '@/lib/projects'

/* ————— canvas helpers ————— */

const ACCENT = '#53C188'
const INK = '#F2F0EA'
const BODY = '#C9C7C0'
const MUTE = '#8E9096'

function canvasOf(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('2d canvas context unavailable')
  return { canvas, ctx }
}

/** Real font stacks — next/font exposes its families as CSS variables. */
function fontFamilies() {
  const styles = getComputedStyle(document.documentElement)
  const body = styles.getPropertyValue('--font-body').trim() || 'Inter'
  const mono = styles.getPropertyValue('--font-technical').trim() || 'monospace'
  return {
    sans: `${body}, Inter, system-ui, sans-serif`,
    mono: `${mono}, ui-monospace, SFMono-Regular, monospace`,
  }
}

function toTexture(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  texture.needsUpdate = true
  return texture
}

/** Rounded rectangular path that works everywhere (no ctx.roundRect dependency). */
function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word
    if (ctx.measureText(trial).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = trial
    }
  }
  if (line) lines.push(line)
  return lines
}

/** Shared window chrome so every screen reads as software, not a poster. */
function chromeBar(
  ctx: CanvasRenderingContext2D,
  title: string,
  tag: string,
  mono: string,
  width: number,
) {
  ctx.fillStyle = '#141518'
  ctx.fillRect(0, 0, width, 52)
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, 52.5)
  ctx.lineTo(width, 52.5)
  ctx.stroke()
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = i === 0 ? 'rgba(83,193,136,0.55)' : '#33343A'
    ctx.beginPath()
    ctx.arc(26 + i * 22, 26, 6, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.font = `400 17px ${mono}`
  ctx.fillStyle = MUTE
  ctx.textBaseline = 'middle'
  ctx.fillText(title, 100, 27)
  ctx.textAlign = 'right'
  ctx.fillStyle = 'rgba(120,122,128,0.85)'
  ctx.fillText(tag, width - 24, 27)
  ctx.textAlign = 'left'
}

/** The large central screen: portfolio identity, drawn as a live workspace UI. */
export function identityTexture() {
  const { canvas, ctx } = canvasOf(1280, 720)
  const { sans, mono } = fontFamilies()

  ctx.fillStyle = '#0D0E10'
  ctx.fillRect(0, 0, 1280, 720)

  // Faint blueprint grid.
  ctx.strokeStyle = 'rgba(255,255,255,0.032)'
  ctx.lineWidth = 1
  for (let x = 0; x <= 1280; x += 64) {
    ctx.beginPath()
    ctx.moveTo(x + 0.5, 0)
    ctx.lineTo(x + 0.5, 720)
    ctx.stroke()
  }
  for (let y = 0; y <= 720; y += 64) {
    ctx.beginPath()
    ctx.moveTo(0, y + 0.5)
    ctx.lineTo(1280, y + 0.5)
    ctx.stroke()
  }

  chromeBar(ctx, 'ali-raza-py — workspace', 'SCENE 01', mono, 1280)

  // Accent tick above the name.
  ctx.fillStyle = ACCENT
  ctx.fillRect(96, 172, 76, 6)

  ctx.textBaseline = 'alphabetic'
  ctx.font = `700 112px ${sans}`
  ctx.fillStyle = INK
  ctx.fillText('ALI RAZA', 92, 306)

  ctx.font = `500 36px ${sans}`
  ctx.fillStyle = '#D8D5CD'
  ctx.fillText('Software Engineer', 96, 364)

  ctx.font = `400 22px ${mono}`
  ctx.fillStyle = MUTE
  ctx.fillText('AI  ·  FULL-STACK  ·  SYSTEMS', 96, 408)

  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  ctx.beginPath()
  ctx.moveTo(96, 452.5)
  ctx.lineTo(1184, 452.5)
  ctx.stroke()

  const rows: [string, string, boolean][] = [
    ['STATUS', 'BUILDING — CODE-YAAR', true],
    ['STACK', 'PYTHON / TYPESCRIPT / NEXT.JS / AI', false],
    ['BASE', 'KARACHI, PK — 24.86°N 67.01°E', false],
  ]
  rows.forEach(([label, value, live], index) => {
    const y = 508 + index * 46
    if (live) {
      ctx.fillStyle = ACCENT
      ctx.beginPath()
      ctx.arc(102, y - 6, 6, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.font = `400 18px ${mono}`
    ctx.fillStyle = live ? ACCENT : 'rgba(140,142,148,0.9)'
    ctx.fillText(label, 120, y)
    ctx.font = `400 20px ${mono}`
    ctx.fillStyle = BODY
    ctx.fillText(value, 280, y)
  })

  ctx.font = `400 16px ${mono}`
  ctx.fillStyle = 'rgba(120,122,128,0.8)'
  ctx.textAlign = 'right'
  ctx.fillText('FIG. 00 — IDENTITY SCREEN', 1184, 672)
  ctx.textAlign = 'left'

  return toTexture(canvas)
}

/** Small engraved plate below the portrait display. */
export function plateTexture() {
  const { canvas, ctx } = canvasOf(512, 96)
  const { mono } = fontFamilies()
  ctx.fillStyle = '#101013'
  ctx.fillRect(0, 0, 512, 96)
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  ctx.lineWidth = 2
  ctx.strokeRect(1, 1, 510, 94)
  ctx.fillStyle = ACCENT
  ctx.beginPath()
  ctx.arc(30, 48, 6, 0, Math.PI * 2)
  ctx.fill()
  ctx.font = `400 22px ${mono}`
  ctx.fillStyle = BODY
  ctx.textBaseline = 'middle'
  ctx.fillText('PORTRAIT · AR — 01', 52, 50)
  ctx.textAlign = 'right'
  ctx.fillStyle = 'rgba(120,122,128,0.9)'
  ctx.fillText('2026', 486, 50)
  ctx.textAlign = 'left'
  return toTexture(canvas)
}

/** Physical screen for one project — name, status, stack, architecture, all real data. */
export function projectTexture(project: Project) {
  const { canvas, ctx } = canvasOf(1024, 640)
  const { sans, mono } = fontFamilies()

  ctx.fillStyle = '#0E0F11'
  ctx.fillRect(0, 0, 1024, 640)
  chromeBar(ctx, `${project.slug} — case study`, 'REPOSITORY', mono, 1024)

  // Index + accent rule
  ctx.font = `700 44px ${sans}`
  ctx.fillStyle = ACCENT
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(project.index, 64, 148)
  ctx.fillStyle = 'rgba(83,193,136,0.35)'
  ctx.fillRect(64, 172, 340, 3)

  // Title
  ctx.font = `700 66px ${sans}`
  ctx.fillStyle = INK
  ctx.fillText(project.title.toUpperCase(), 64, 258)

  // Status chip
  const chipText = project.statusLabel.toUpperCase()
  ctx.font = `400 17px ${mono}`
  const chipWidth = Math.ceil(ctx.measureText(chipText).width) + 36
  ctx.strokeStyle = 'rgba(83,193,136,0.7)'
  ctx.lineWidth = 1.5
  roundRectPath(ctx, 64, 290, chipWidth, 38, 6)
  ctx.stroke()
  ctx.fillStyle = 'rgba(83,193,136,0.16)'
  ctx.fill()
  ctx.fillStyle = ACCENT
  ctx.textBaseline = 'middle'
  ctx.fillText(chipText, 82, 310)
  ctx.textBaseline = 'alphabetic'

  // Description, wrapped
  ctx.font = `400 23px ${sans}`
  ctx.fillStyle = '#A6A8AE'
  const lines = wrapLines(ctx, project.shortDescription, 896)
  lines.slice(0, 3).forEach((line, i) => ctx.fillText(line, 64, 384 + i * 34))

  // Architecture steps — the real pipeline, abbreviated
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.beginPath()
  ctx.moveTo(64, 502.5)
  ctx.lineTo(960, 502.5)
  ctx.stroke()
  ctx.font = `400 17px ${mono}`
  project.architecture.steps.slice(0, 4).forEach((step, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    ctx.fillStyle = 'rgba(83,193,136,0.75)'
    ctx.fillText('→', 64 + col * 470, 540 + row * 30)
    ctx.fillStyle = '#8E9096'
    const label = step.label.length > 34 ? `${step.label.slice(0, 33)}…` : step.label
    ctx.fillText(label, 92 + col * 470, 540 + row * 30)
  })

  // Footer meta
  ctx.fillStyle = '#6E7076'
  ctx.font = `400 16px ${mono}`
  ctx.fillText(project.category.toUpperCase(), 64, 616)
  ctx.textAlign = 'right'
  ctx.fillText('github.com / ali-raza-py', 960, 616)
  ctx.textAlign = 'left'

  return toTexture(canvas)
}

/** Gradient veil laid over the portrait's lower area — emerging from darkness. */
export function veilTexture() {
  const { canvas, ctx } = canvasOf(256, 256)
  const gradient = ctx.createLinearGradient(0, 0, 0, 256)
  gradient.addColorStop(0, 'rgba(10,11,12,0)')
  gradient.addColorStop(0.55, 'rgba(10,11,12,0)')
  gradient.addColorStop(0.82, 'rgba(10,11,12,0.72)')
  gradient.addColorStop(1, 'rgba(10,11,12,0.96)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 256, 256)
  return toTexture(canvas)
}

/** Terminal window — real commands from his repositories, no fake metrics. */
export function terminalTexture() {
  const { canvas, ctx } = canvasOf(640, 400)
  const { mono } = fontFamilies()
  ctx.fillStyle = '#0A0B0C'
  ctx.fillRect(0, 0, 640, 400)
  chromeBar(ctx, 'terminal — workspace', 'zsh', mono, 640)

  const rows: [string, string][] = [
    ['python validate.py', 'RESULT: VALID — 0 errors'],
    ['python generate.py', '→ 102 tool pages from registry'],
    ['python engine.py --trace', '→ trace captured — replay ready'],
    ['npm run build', '→ static export complete'],
  ]

  ctx.textBaseline = 'alphabetic'
  let y = 96
  for (const [cmd, out] of rows) {
    ctx.font = `400 17px ${mono}`
    ctx.fillStyle = ACCENT
    ctx.fillText('$', 26, y)
    ctx.fillStyle = '#D7D5CE'
    ctx.fillText(cmd, 46, y)
    ctx.fillStyle = 'rgba(83,193,136,0.75)'
    ctx.fillText(out, 46, y + 26)
    y += 74
  }
  return toTexture(canvas)
}

const KEYWORD = /^(def|for|if|elif|else|return|while|in|not|and|or|None|True|False)$/

function drawCodeLine(ctx: CanvasRenderingContext2D, line: string, x: number, y: number) {
  let cursor = x
  for (const token of line.split(/([A-Za-z_#]\w*|\s+|[^\w\s])/)) {
    if (!token) continue
    if (KEYWORD.test(token)) ctx.fillStyle = '#7EE0A8'
    else if (token.startsWith('#')) ctx.fillStyle = '#6E7076'
    else if (/^\d+$/.test(token)) ctx.fillStyle = '#C9B27C'
    else if (/^[^A-Za-z0-9_\s]+$/.test(token)) ctx.fillStyle = '#9C9EA6'
    else ctx.fillStyle = '#D7D5CE'
    ctx.fillText(token, cursor, y)
    cursor += ctx.measureText(token).width
  }
}

/** Code fragment — the genuine Lomuto partition from Algorify. */
export function codeTexture() {
  const { canvas, ctx } = canvasOf(560, 640)
  const { mono } = fontFamilies()
  ctx.fillStyle = '#0C0D0F'
  ctx.fillRect(0, 0, 560, 640)
  chromeBar(ctx, 'algorithm_engine.py', 'ALGORIFY', mono, 560)

  const lines = [
    '# genuine Lomuto partition',
    'def partition(arr, lo, hi):',
    '    pivot = arr[hi]',
    '    i = lo - 1',
    '    for j in range(lo, hi):',
    '        if arr[j] <= pivot:',
    '            i = i + 1',
    '            arr[i], arr[j] = arr[j], arr[i]',
    '    arr[i + 1], arr[hi] = arr[hi], arr[i + 1]',
    '    return i + 1',
    '',
    '# compute once — replay many',
  ]
  ctx.font = `400 17px ${mono}`
  ctx.textBaseline = 'alphabetic'
  lines.forEach((line, index) => drawCodeLine(ctx, line, 30, 96 + index * 40))

  ctx.font = `400 14px ${mono}`
  ctx.fillStyle = '#5E6066'
  ctx.fillText('SORTING LAB — TRACE PIPELINE', 30, 614)
  return toTexture(canvas)
}

/** Layered pipeline diagram — MediCare AI's documented architecture. */
export function diagramTexture() {
  const { canvas, ctx } = canvasOf(640, 560)
  const { mono } = fontFamilies()
  ctx.fillStyle = '#0C0D0F'
  ctx.fillRect(0, 0, 640, 560)
  chromeBar(ctx, 'architecture — medicare-ai', 'DIAGRAM', mono, 640)

  const boxes: [string, number, number, boolean][] = [
    ['CLIENT PORTALS', 200, 100, false],
    ['API LAYER', 200, 210, false],
    ['OCR + AI PIPELINE', 200, 320, true],
    ['STORAGE', 200, 430, false],
  ]

  const arrow = (x: number, y1: number, y2: number) => {
    ctx.strokeStyle = 'rgba(255,255,255,0.28)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x, y1)
    ctx.lineTo(x, y2 - 10)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x - 6, y2 - 12)
    ctx.lineTo(x, y2 - 2)
    ctx.lineTo(x + 6, y2 - 12)
    ctx.closePath()
    ctx.fillStyle = 'rgba(255,255,255,0.45)'
    ctx.fill()
  }

  boxes.forEach(([label, x, y, live], index) => {
    ctx.fillStyle = '#121316'
    ctx.fillRect(x, y, 240, 58)
    ctx.strokeStyle = live ? 'rgba(83,193,136,0.8)' : 'rgba(255,255,255,0.18)'
    ctx.lineWidth = live ? 2 : 1.5
    ctx.strokeRect(x + 1, y + 1, 238, 56)
    ctx.font = `400 18px ${mono}`
    ctx.fillStyle = live ? ACCENT : '#C9C7C0'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, x + 120, y + 30)
    ctx.textAlign = 'left'
    if (index < boxes.length - 1) arrow(320, y + 58, boxes[index + 1][2])
  })

  ctx.font = `400 14px ${mono}`
  ctx.fillStyle = '#5E6066'
  ctx.fillText('FRONTEND / API / PROCESSING / STORAGE', 26, 534)
  return toTexture(canvas)
}

/** Small floating UI chip with a technical label. */
export function chipTexture(label: string) {
  const { canvas, ctx } = canvasOf(512, 128)
  const { mono } = fontFamilies()
  ctx.clearRect(0, 0, 512, 128)
  ctx.fillStyle = 'rgba(16,17,20,0.94)'
  roundRectPath(ctx, 4, 4, 504, 120, 18)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.16)'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = ACCENT
  ctx.beginPath()
  ctx.arc(40, 64, 7, 0, Math.PI * 2)
  ctx.fill()
  ctx.font = `400 30px ${mono}`
  ctx.fillStyle = '#DEDCD5'
  ctx.textBaseline = 'middle'
  ctx.fillText(label, 66, 66)
  return toTexture(canvas)
}

/** Repeating floor grid. */
export function gridTexture() {
  const { canvas, ctx } = canvasOf(512, 512)
  ctx.fillStyle = '#0C0C0F'
  ctx.fillRect(0, 0, 512, 512)
  ctx.strokeStyle = 'rgba(255,255,255,0.055)'
  ctx.lineWidth = 2
  ctx.strokeRect(1, 1, 510, 510)
  ctx.strokeStyle = 'rgba(255,255,255,0.02)'
  ctx.beginPath()
  ctx.moveTo(256, 0)
  ctx.lineTo(256, 512)
  ctx.moveTo(0, 256)
  ctx.lineTo(512, 256)
  ctx.stroke()
  return toTexture(canvas)
}

/** Soft radial glow for screen backlights. */
export function glowTexture() {
  const { canvas, ctx } = canvasOf(256, 256)
  const gradient = ctx.createRadialGradient(128, 128, 8, 128, 128, 126)
  gradient.addColorStop(0, 'rgba(255,255,255,0.9)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.28)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 256, 256)
  return toTexture(canvas)
}

/** Round sprite for dust particles. */
export function dotTexture() {
  const { canvas, ctx } = canvasOf(64, 64)
  const gradient = ctx.createRadialGradient(32, 32, 1, 32, 32, 30)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.45)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)
  return toTexture(canvas)
}
