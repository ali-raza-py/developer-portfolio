'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { SCENES, currentSceneIndex, detectTier, experience, type Tier } from '@/lib/experience'

const WorkspaceCanvas = dynamic(() => import('./workspace-canvas'), {
  ssr: false,
  loading: () => null,
})

/**
 * The fixed environment layer behind every scene. A static poster paints
 * instantly (and stands in for reduced-motion / no-WebGL devices), then the
 * WebGL stage fades in on top once the device is known to support it.
 */
export function WorkspaceLayer() {
  const [tier, setTier] = useState<Tier | null>(null) // null = still detecting
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const detected = detectTier()
    experience.tier = detected
    setTier(detected)

    const onMove = (event: PointerEvent) => {
      experience.pointer.x = (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1
      experience.pointer.y = (event.clientY / Math.max(1, window.innerHeight)) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const renderWebGL = tier !== null && tier !== 'static'

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-[#0B0B0C]">
      <PosterFallback />
      {renderWebGL && (
        <div
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <WorkspaceCanvas tier={tier} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  )
}

/**
 * Non-WebGL composition: same spatial idea as the 3D stage — portrait plate
 * right, structural lines, panel silhouettes — rendered with pure CSS so the
 * hero never looks empty while the canvas boots or when it never will.
 */
function PosterFallback() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(120%_95%_at_68%_18%,#17181D_0%,#0E0E11_46%,#0B0B0C_100%)]" />
      {/* Structural lines */}
      <div className="absolute left-[13%] top-0 h-full w-px bg-white/[0.05]" />
      <div className="absolute left-[13%] right-0 top-[42%] h-px bg-white/[0.04]" />
      <div className="absolute bottom-[14%] left-0 right-0 h-px bg-white/[0.04]" />
      {/* Panel silhouettes — midground depth */}
      <div className="absolute left-[18%] top-[16%] hidden h-[26vh] w-[30vw] max-w-[440px] border border-white/[0.06] bg-white/[0.02] lg:block" />
      <div className="absolute left-[24%] top-[56%] hidden h-[20vh] w-[24vw] max-w-[360px] border border-white/[0.05] bg-white/[0.015] lg:block" />
      {/* Portrait plate */}
      <div className="absolute right-[7%] top-1/2 w-[min(34vw,300px)] -translate-y-1/2 border border-white/10 bg-[#101013] p-2 shadow-[0_48px_120px_-40px_rgba(0,0,0,0.95)]">
        <img src="/images/portrait.png" alt="" className="aspect-square w-full object-cover opacity-90" />
        <div className="mt-2 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] text-white/40">
          <span className="text-[#53C188]">●</span>
          <span>PORTRAIT · AR — 01</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Cinematic HUD — scene label, live camera coordinates, render stats, and a
 * seven-segment progress rail. All readout happens in one rAF loop writing
 * straight to the DOM; React state only changes at scene boundaries.
 */
export function SceneHud() {
  const [scene, setScene] = useState(0)
  const camRef = useRef<HTMLSpanElement | null>(null)
  const perfRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    let raf = 0
    let frames = 0
    let last = performance.now()
    let lastScene = -1

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      frames += 1

      if (now - last >= 500) {
        const fps = Math.round((frames * 1000) / (now - last))
        frames = 0
        last = now
        if (perfRef.current) {
          perfRef.current.textContent =
            experience.tier === 'static'
              ? experience.staticReason === 'reduced-motion'
                ? 'REDUCED MOTION · STATIC MODE'
                : 'WEBGL UNAVAILABLE · STATIC MODE'
              : `FPS ${fps} · DPR ${Math.min(2, window.devicePixelRatio || 1).toFixed(1)} · ${experience.tier.toUpperCase()} TIER`
        }
      }

      const index = currentSceneIndex()
      if (index !== lastScene) {
        lastScene = index
        setScene(index)
      }

      if (camRef.current) {
        const c = experience.camera
        camRef.current.textContent = `CAM ${c.x.toFixed(2)} / ${c.y.toFixed(2)} / ${c.z.toFixed(2)}`
      }
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const label = String(scene + 1).padStart(2, '0')

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 font-mono">
      {/* Scene label + camera readout — bottom left */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-2 sm:bottom-8 sm:left-10 lg:left-16">
        <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#918D84]">
          <span className="inline-block h-px w-8 bg-[#53C188]/70" />
          Scene {label} — {SCENES[scene]}
        </p>
        <span ref={camRef} className="hidden text-[9px] tracking-[0.24em] text-[#918D84]/60 sm:block">
          CAM 0.00 / 0.35 / 8.60
        </span>
      </div>

      {/* Render stats — bottom right */}
      <span
        ref={perfRef}
        className="absolute bottom-6 right-6 hidden text-[9px] tracking-[0.24em] text-[#918D84]/60 md:block sm:bottom-8 sm:right-10 lg:right-16"
      >
        FPS 60 · DPR 1.0 · HIGH TIER
      </span>

      {/* Progress rail — right edge */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-2.5 md:flex lg:right-10">
        {SCENES.map((name, index) => (
          <div key={name} className="flex items-center gap-2">
            <span
              className={`text-[8px] tracking-[0.2em] transition-colors duration-500 ${
                index === scene ? 'text-[#53C188]' : 'text-transparent'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={`h-px transition-all duration-500 ${
                index === scene ? 'w-7 bg-[#53C188]' : 'w-3.5 bg-white/25'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
