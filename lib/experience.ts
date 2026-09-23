export type Tier = 'high' | 'low' | 'static'

export type SceneKey = {
  pos: [number, number, number]
  look: [number, number, number]
  key: number
  rim: number
  exposure: number
  luma: number
}

/** The seven scenes of the homepage journey. */
export const SCENES = [
  'INTRODUCTION',
  'IDENTITY',
  'WORK',
  'PROJECTS',
  'ENGINEERING',
  'ABOUT',
  'CONTACT',
] as const

/**
 * Camera choreography — one keyframe per scene. The rig interpolates between
 * consecutive keyframes with smoothstep easing, driven by measured section
 * boundaries rather than raw scroll percentage, so the camera settles exactly
 * when a scene's content arrives.
 *
 *  key/light values (key, rim, exposure, luma) are lerped alongside the pose:
 * the environment brightens for WORK/PROJECTS and calms down for ABOUT/CONTACT.
 */
export const CAMERA_KEYS: SceneKey[] = [
  // 01 — INTRODUCTION: wide establishing shot, identity screen right of frame.
  { pos: [0, 0.35, 8.6], look: [1.2, 0.75, -1.0], key: 1.15, rim: 0.7, exposure: 1.0, luma: 0.9 },
  // 02 — IDENTITY: dolly right and in, toward the portrait display.
  { pos: [3.1, 0.3, 2.2], look: [5.0, 0.35, -2.4], key: 1.0, rim: 1.0, exposure: 1.05, luma: 0.85 },
  // 03 — WORK: swing left as the environment expands around the project panels.
  { pos: [-1.0, 1.0, 5.0], look: [-2.6, 1.2, -4.6], key: 1.2, rim: 0.6, exposure: 1.0, luma: 1.05 },
  // 04 — PROJECTS: push into the panel cluster.
  { pos: [-0.4, 0.5, 1.8], look: [-3.6, 0.7, -5.6], key: 1.3, rim: 0.5, exposure: 1.05, luma: 1.2 },
  // 05 — ENGINEERING: rise to a high angle over the architecture.
  { pos: [0.3, 2.7, 3.4], look: [-0.4, 0.3, -7.0], key: 1.1, rim: 0.55, exposure: 0.95, luma: 1.0 },
  // 06 — ABOUT: pull back, the space goes quiet.
  { pos: [1.7, 0.6, 6.8], look: [0.6, 0.6, -1.6], key: 0.8, rim: 0.5, exposure: 0.9, luma: 0.55 },
  // 07 — CONTACT: long, minimal, swallowed by fog.
  { pos: [0, 0.3, 10.4], look: [0, 0.9, -3.0], key: 0.6, rim: 0.9, exposure: 0.85, luma: 0.3 },
]

/** Mutable, render-loop friendly state shared between DOM and WebGL layers. */
export const experience = {
  tier: 'high' as Tier,
  staticReason: '' as '' | 'reduced-motion' | 'no-webgl',
  /** 0..1 scroll progress across the experience container. */
  progress: 0,
  /** Progress values at which each scene begins (measured from layout). */
  boundaries: [0, 0.17, 0.33, 0.5, 0.66, 0.83, 1],
  /** Cursor target, normalized to -1..1. */
  pointer: { x: 0, y: 0 },
  /** Eased cursor, written by the camera rig every frame. */
  smooth: { x: 0, y: 0 },
  /** Slug of the project highlighted from the DOM (hover/focus). */
  hoverSlug: null as string | null,
  /** Scene-driven presentation values, lerped by the rig. */
  luma: 0.9,
  key: 1.15,
  rim: 0.7,
  /** Live camera position for the HUD readout. */
  camera: { x: 0, y: 0.35, z: 8.6 },
}

export function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value
}

/** Map scroll progress onto the keyframe timeline using measured boundaries. */
export function resolveCamera(progress: number) {
  const b = experience.boundaries
  const last = CAMERA_KEYS.length - 1
  const p = clamp01(progress)
  let i = 0
  while (i < last - 1 && p >= b[i + 1]) i++
  const span = Math.max(1e-5, (b[i + 1] ?? 1) - b[i])
  const raw = clamp01((p - b[i]) / span)
  const t = raw * raw * (3 - 2 * raw) // smoothstep — arrives and settles gently
  return { a: CAMERA_KEYS[i], b: CAMERA_KEYS[i + 1], t, index: i }
}

/** Which scene is currently occupying the viewport. */
export function currentSceneIndex() {
  const p = experience.progress
  const b = experience.boundaries
  let i = 0
  while (i < b.length - 1 && p >= b[i + 1] - 1e-4) i++
  return Math.min(i, SCENES.length - 1)
}

export function supportsWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    return false
  }
}

/**
 * Client-only quality tier. Never called during SSR.
 * static — reduced motion or no WebGL: the poster composition stands in.
 * low    — touch devices, few cores, little memory, narrow screens.
 * high   — capable desktops: shadows, denser detail, higher DPR.
 */
export function detectTier(): Tier {
  if (typeof window === 'undefined') return 'static'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    experience.staticReason = 'reduced-motion'
    return 'static'
  }
  if (!supportsWebGL()) {
    experience.staticReason = 'no-webgl'
    return 'static'
  }
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency ?? 8
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
  if (coarse || cores <= 4 || memory <= 4 || window.innerWidth < 900) return 'low'
  return 'high'
}