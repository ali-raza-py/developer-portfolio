'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { experience, type Tier } from '@/lib/experience'
import { chipTexture, codeTexture, diagramTexture, terminalTexture } from '../textures'

type FragmentSpec = {
  kind: 'terminal' | 'code' | 'diagram'
  pos: [number, number, number]
  rotY: number
  w: number
  h: number
  phase: number
}

const FRAGMENTS: FragmentSpec[] = [
  // Terminal — upper left, visible from the establishing shot.
  { kind: 'terminal', pos: [-3.4, 2.7, -3.2], rotY: 0.3, w: 2.1, h: 1.31, phase: 0.4 },
  // Architecture diagram — lower right (MediCare's layered pipeline).
  { kind: 'diagram', pos: [3.7, -1.15, -4.8], rotY: -0.36, w: 1.7, h: 1.49, phase: 2.2 },
  // Code fragment — deep background (Algorify's partition function).
  { kind: 'code', pos: [-1.9, -1.5, -7.6], rotY: 0.2, w: 1.55, h: 1.77, phase: 3.6 },
]

type ChipSpec = {
  label: string
  pos: [number, number, number]
  rotY: number
  w: number
}

/** Tiny technical labels with a reason to exist — all real, all his. */
const CHIPS: ChipSpec[] = [
  { label: 'AI · ML', pos: [3.1, 2.3, -2.6], rotY: -0.25, w: 1.1 },
  { label: 'OCR → LLM', pos: [-1.6, 0.15, -3.1], rotY: 0.28, w: 1.35 },
  { label: 'RESULT: VALID', pos: [1.15, -1.5, -3.4], rotY: -0.12, w: 1.6 },
  { label: '0 BROKEN LINKS', pos: [-5.9, 1.6, -5.2], rotY: 0.5, w: 1.7 },
  { label: 'TRACE → REPLAY', pos: [4.6, 0.7, -7.2], rotY: -0.5, w: 1.7 },
  // Foreground chip — sits extremely close to the camera during the intro.
  { label: 'PY · C++', pos: [2.75, -0.55, 4.3], rotY: 0.18, w: 1.15 },
]

function useCanvasTexture(factory: () => THREE.Texture) {
  const ref = useRef<THREE.Texture | null>(null)
  if (!ref.current) ref.current = factory()
  const texture = ref.current
  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

/** A floating software fragment: bobbing screen + edge glow, cursor-aware. */
function FragmentPanel({ spec }: { spec: FragmentSpec }) {
  const groupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.MeshStandardMaterial>(null)
  const texture = useCanvasTexture(() => {
    if (spec.kind === 'terminal') return terminalTexture()
    if (spec.kind === 'diagram') return diagramTexture()
    return codeTexture()
  })

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const time = state.clock.elapsedTime
    const ease = Math.min(1, delta * 3)
    group.position.y = spec.pos[1] + Math.sin(time * 0.45 + spec.phase) * 0.06
    const targetRotY = spec.rotY + experience.smooth.x * 0.08
    group.rotation.y += (targetRotY - group.rotation.y) * ease
    group.rotation.x += (-experience.smooth.y * 0.03 - group.rotation.x) * ease
    if (screenRef.current) {
      const target = 0.5 * experience.luma
      screenRef.current.emissiveIntensity += (target - screenRef.current.emissiveIntensity) * ease
    }
  })

  return (
    <group ref={groupRef} position={spec.pos}>
      {/* Backing */}
      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[spec.w + 0.07, spec.h + 0.07, 0.05]} />
        <meshStandardMaterial color="#131418" metalness={0.7} roughness={0.45} />
      </mesh>
      {/* Screen */}
      <mesh>
        <planeGeometry args={[spec.w, spec.h]} />
        <meshStandardMaterial
          ref={screenRef}
          map={texture}
          emissive="#FFFFFF"
          emissiveMap={texture}
          emissiveIntensity={0.5}
          roughness={0.6}
          metalness={0}
        />
      </mesh>
    </group>
  )
}

/** Micro label chip — structural detail, not decoration. */
function Chip({ spec }: { spec: ChipSpec }) {
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const texture = useCanvasTexture(() => chipTexture(spec.label))
  const height = spec.w * 0.25

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const time = state.clock.elapsedTime
    const ease = Math.min(1, delta * 3)
    group.position.y = spec.pos[1] + Math.sin(time * 0.6 + spec.w * 7) * 0.035
    const targetRotY = spec.rotY + experience.smooth.x * 0.1
    group.rotation.y += (targetRotY - group.rotation.y) * ease
    if (materialRef.current) {
      const target = 0.55 * Math.max(0.4, experience.luma)
      materialRef.current.emissiveIntensity += (target - materialRef.current.emissiveIntensity) * ease
    }
  })

  return (
    <group ref={groupRef} position={spec.pos}>
      <mesh>
        <planeGeometry args={[spec.w, height]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          emissive="#FFFFFF"
          emissiveMap={texture}
          emissiveIntensity={0.55}
          roughness={0.7}
          metalness={0}
        />
      </mesh>
    </group>
  )
}

/** Terminal windows, code fragments, architecture diagrams, label chips. */
export function Fragments({ tier }: { tier: Exclude<Tier, 'static'> }) {
  const panels = tier === 'high' ? FRAGMENTS : FRAGMENTS.slice(0, 2)
  const chips = tier === 'high' ? CHIPS : CHIPS.slice(0, 4)

  return (
    <group>
      {panels.map((spec) => (
        <FragmentPanel key={spec.kind} spec={spec} />
      ))}
      {chips.map((spec) => (
        <Chip key={spec.label} spec={spec} />
      ))}
    </group>
  )
}