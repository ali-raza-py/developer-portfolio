'use client'

import { useEffect, useRef } from 'react'

type CursorMode = 'drag' | 'view' | 'open' | null

const MODE_LABELS: Record<Exclude<CursorMode, null>, string> = {
  drag: 'Drag',
  view: 'View',
  open: 'Open',
}

/**
 * Minimal custom cursor: a dot for normal movement and a labeled ring for
 * interactive contexts (data-cursor="drag|view|open"). Only enabled on fine
 * pointers without prefers-reduced-motion; the native cursor is restored
 * everywhere else via html[data-cursor-enabled] in globals.css.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    document.documentElement.dataset.cursorEnabled = 'true'

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let mode: CursorMode = null
    let raf = 0

    const render = () => {
      rx += (x - rx) * 0.22
      ry += (y - ry) * 0.22
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    const onMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
    }

    const setMode = (next: CursorMode) => {
      if (mode === next) return
      mode = next
      if (next) {
        ring.dataset.mode = next
        label.textContent = MODE_LABELS[next]
        label.style.opacity = '1'
      } else {
        delete ring.dataset.mode
        label.style.opacity = '0'
      }
    }

    const onOver = (event: Event) => {
      const target = (event.target as Element | null)?.closest?.<HTMLElement>(
        '[data-cursor]',
      )
      setMode(target ? ((target.dataset.cursor as CursorMode) ?? null) : null)
    }

    const onDown = () => {
      ring.dataset.pressed = 'true'
    }
    const onUp = () => {
      delete ring.dataset.pressed
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('pointerup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      delete document.documentElement.dataset.cursorEnabled
    }
  }, [])

  return (
    <div aria-hidden="true">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden [@media(pointer:fine)]:block"
      >
        <span className="absolute -left-[3px] -top-[3px] block size-[6px] rounded-full bg-foreground" />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden [@media(pointer:fine)]:block"
      >
        <span
          className="absolute -left-[13px] -top-[13px] grid size-[26px] place-items-center rounded-full border border-foreground/45 bg-background/40 backdrop-blur-[2px] transition-[width,height,left,top,opacity] duration-300"
          data-ring-visual=""
        >
          <span
            ref={labelRef}
            className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-foreground opacity-0 transition-opacity duration-200"
            style={{ opacity: 0 }}
          />
        </span>
      </div>
    </div>
  )
}