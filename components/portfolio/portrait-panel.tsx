'use client'

import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const BASE_RX = 3
const BASE_RY = -7
const MAX_RX = 26
const MAX_RY = 34
const HOVER_TILT_X = 9
const HOVER_TILT_Y = 13

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const annotations = [
  { text: 'PYTHON', className: 'left-0 top-[12%]' },
  { text: 'C++', className: '-left-6 top-[46%] hidden lg:block' },
  { text: 'NEXT.JS', className: 'right-0 top-[6%]' },
  { text: 'AI / ML', className: '-right-4 top-[38%] hidden lg:block' },
  { text: 'SYSTEMS', className: 'right-[14%] -bottom-6 hidden lg:block' },
]

/**
 * The hero's main 3D object: a photographic panel built from layered planes
 * (CSS 3D — no WebGL). Cursor position sets a spring target; dragging rotates
 * the panel directly and releases velocity into the spring for natural inertia.
 * Page scrolling is never blocked: touch-action is pan-y, and touch drags only
 * rotate on the horizontal axis.
 */
export function PortraitPanel() {
  const reduced = useReducedMotion()
  const stageRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const shadowRef = useRef<HTMLDivElement | null>(null)
  const [imageOk, setImageOk] = useState(true)

  const pose = useRef({
    rx: BASE_RX,
    ry: BASE_RY,
    vrx: 0,
    vry: 0,
    trx: BASE_RX,
    try_: BASE_RY,
    lastX: 0,
    lastY: 0,
    dragging: false,
    pointerType: 'mouse',
  })

  useEffect(() => {
    if (reduced) return
    const stage = stageRef.current
    const panel = panelRef.current
    if (!stage || !panel) return

    const p = pose.current
    let raf = 0
    let visible = true

    function tick() {
      raf = 0
      if (!visible || !panel) return
      if (!p.dragging) {
        p.vrx = (p.vrx + (p.trx - p.rx) * 0.055) * 0.86
        p.vry = (p.vry + (p.try_ - p.ry) * 0.055) * 0.86
        p.rx += p.vrx
        p.ry += p.vry
      }
      panel.style.transform = `rotateX(${p.rx.toFixed(3)}deg) rotateY(${p.ry.toFixed(3)}deg)`
      panel.style.setProperty('--lx', `${(50 + p.ry * 1.5).toFixed(2)}%`)
      panel.style.setProperty('--ly', `${(50 - p.rx * 1.8).toFixed(2)}%`)
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translate3d(${(-p.ry * 1.6).toFixed(1)}px, ${(p.rx * 0.7).toFixed(1)}px, -90px)`
      }
      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(tick)
    })
    observer.observe(stage)
    raf = requestAnimationFrame(tick)

    const handleMove = (event: PointerEvent) => {
      if (p.dragging) {
        const dx = event.clientX - p.lastX
        const dy = event.clientY - p.lastY
        p.lastX = event.clientX
        p.lastY = event.clientY
        const deltaRy = dx * 0.32
        const deltaRx = event.pointerType === 'touch' ? 0 : -dy * 0.22
        p.ry = clamp(p.ry + deltaRy, -MAX_RY, MAX_RY)
        p.rx = clamp(p.rx + deltaRx, -MAX_RX, MAX_RX)
        p.vry = p.vry * 0.55 + deltaRy * 0.45
        p.vrx = p.vrx * 0.55 + deltaRx * 0.45
        return
      }
      if (event.pointerType !== 'mouse') return
      const rect = stage.getBoundingClientRect()
      const nx = clamp(
        (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2),
        -1.6,
        1.6,
      )
      const ny = clamp(
        (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2),
        -1.6,
        1.6,
      )
      p.trx = clamp(BASE_RX + ny * HOVER_TILT_X, -MAX_RX, MAX_RX)
      p.try_ = clamp(BASE_RY + nx * HOVER_TILT_Y, -MAX_RY, MAX_RY)
    }

    const handleUp = () => {
      if (!p.dragging) return
      p.dragging = false
      if (p.pointerType === 'touch') {
        p.trx = BASE_RX
        p.try_ = BASE_RY
      } else {
        p.trx = clamp(p.rx + p.vrx * 6, -MAX_RX, MAX_RX)
        p.try_ = clamp(p.ry + p.vry * 6, -MAX_RY, MAX_RY)
      }
      p.vrx *= 0.5
      p.vry *= 0.5
    }

    const handleDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return
      p.dragging = true
      p.pointerType = event.pointerType
      p.lastX = event.clientX
      p.lastY = event.clientY
      p.vrx = 0
      p.vry = 0
      stage.setPointerCapture?.(event.pointerId)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointercancel', handleUp)
    stage.addEventListener('pointerdown', handleDown)

    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointercancel', handleUp)
      stage.removeEventListener('pointerdown', handleDown)
    }
  }, [reduced])

  const staticPose = reduced
    ? { transform: `rotateX(${BASE_RX}deg) rotateY(${BASE_RY}deg)` }
    : undefined

  return (
    <div
      ref={stageRef}
      data-cursor="drag"
      className="relative w-full max-w-[26rem] select-none sm:max-w-md lg:max-w-lg xl:max-w-xl"
      style={{
        perspective: '1600px',
        touchAction: 'pan-y',
        cursor: reduced ? 'default' : 'grab',
      }}
      role="img"
      aria-label="Interactive 3D portrait panel of Ali Raza — drag to rotate"
    >
      {/* Technical annotations around the object — extremely subtle */}
      <div aria-hidden="true">
        {annotations.map((annotation) => (
          <span
            key={annotation.text}
            className={`pointer-events-none absolute z-10 font-mono text-[10px] tracking-[0.3em] text-muted-foreground/60 ${annotation.className}`}
          >
            <span className="mr-2 inline-block h-px w-4 translate-y-[-3px] bg-muted-foreground/40" />
            {annotation.text}
          </span>
        ))}
      </div>

      {/* Grounding shadow — sits behind and below the panel */}
      <div
        ref={shadowRef}
        aria-hidden="true"
        className="absolute -bottom-8 left-4 right-4 h-16 rounded-[50%] bg-black/35 blur-2xl dark:bg-black/70"
        style={{ transformStyle: 'preserve-3d' }}
      />

      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        <div
          ref={panelRef}
          className="relative aspect-[4/5] w-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: staticPose?.transform,
            willChange: reduced ? 'auto' : 'transform',
          }}
        >
          {/* Dark backing plane */}
          <div
            aria-hidden="true"
            className="absolute -inset-3 border border-border/70 bg-[#111113]"
            style={{ transform: 'translateZ(-72px)', boxShadow: 'var(--panel-shadow)' }}
          />

          {/* Offset photographic layer — far */}
          <div
            aria-hidden="true"
            className="absolute -left-5 -top-3 bottom-6 right-3 overflow-hidden opacity-30 blur-[3px] grayscale"
            style={{ transform: 'translateZ(-52px)' }}
          >
            <Image
              src="/images/portrait.png"
              alt=""
              fill
              sizes="40vw"
              className="object-cover object-top"
            />
          </div>

          {/* Offset photographic layer — near */}
          <div
            aria-hidden="true"
            className="absolute -left-2.5 bottom-3 right-1.5 top-1.5 overflow-hidden opacity-60 grayscale"
            style={{ transform: 'translateZ(-34px)' }}
          >
            <Image
              src="/images/portrait.png"
              alt=""
              fill
              sizes="40vw"
              className="object-cover object-top"
            />
            <span className="absolute inset-0 bg-background/30" />
          </div>
          {/* Depth extrusion — stacked slabs read as a physical edge when tilted */}
          {[0, 1, 2, 3, 4, 5].map((layer) => (
            <div
              key={layer}
              aria-hidden="true"
              className="absolute inset-0 border border-black/40 bg-[#0c0c0e]"
              style={{
                transform: `translateZ(${-8 - layer * 5}px)`,
                opacity: 0.9 - layer * 0.12,
              }}
            />
          ))}

          {/* Frame — slightly larger than the image */}
          <div
            aria-hidden="true"
            className="absolute -inset-2 border border-border/80 bg-card/60"
            style={{ transform: 'translateZ(-4px)' }}
          />

          {/* Front face: the portrait itself */}
          <div
            className="absolute inset-0 overflow-hidden border border-white/10"
            style={{
              transform: 'translateZ(0px)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.14), inset -1px 0 0 rgba(255,255,255,0.06), var(--panel-shadow)',
            }}
          >
            {imageOk ? (
              <Image
                src="/images/portrait.png"
                alt="Portrait of Ali Raza in a dark suit"
                fill
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 34vw"
                className="object-cover object-top"
                onError={() => setImageOk(false)}
              />
            ) : (
              /* Static fallback plate — never a blank surface */
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#141416] text-center">
                <span className="display text-7xl text-white/85">AR</span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/50">
                  ALI RAZA — PORTRAIT
                </span>
              </div>
            )}

            {/* Directional highlight — driven by rotation (--lx / --ly) */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(55% 45% at var(--lx, 55%) var(--ly, 35%), rgba(255,255,255,0.38), transparent 65%)',
                mixBlendMode: 'soft-light',
              }}
            />

            {/* Rim light + depth seating */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                boxShadow:
                  'inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 -60px 80px -50px rgba(0,0,0,0.85)',
              }}
            />

            {/* Thin technical markings on the face */}
            <div aria-hidden="true" className="absolute inset-0">
              <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-white/35" />
              <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-white/35" />
              <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/35" />
              <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/35" />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-white/45">
                AR — 01
              </span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 font-mono text-[9px] tracking-[0.3em] text-white/35">
                PORTRAIT / 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
        <span>Fig. 01 — Ali Raza</span>
        {!reduced && <span className="text-accent">Drag to rotate</span>}
      </figcaption>
    </div>
  )
}