'use client'

import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { experience, type Tier } from '@/lib/experience'
import { projects, type Project } from '@/lib/projects'
import { glowTexture, identityTexture, plateTexture, projectTexture, veilTexture } from '../textures'

type Layout = {
  pos: [number, number, number]
  rotY: number
  w: number
  h: number
  phase: number
}

/**
 * Where each project panel lives in the workspace. Left-back cluster so the
 * camera can fly into it during WORK/PROJECTS while identity stays right.
 */
const PROJECT_LAYOUT: Record<string, Layout> = {
  'medicare-ai': { pos: [-2.7, 1.55, -4.4], rotY: 0.34, w: 2.5, h: 1.56, phase: 0.7 },
  'ai-hub': { pos: [-4.9, -0.15, -6.2], rotY: 0.46, w: 2.4, h: 1.5, phase: 1.9 },
  'code-yaar': { pos: [0.5, 2.45, -6.8], rotY: -0.06, w: 2.5, h: 1.56, phase: 3.1 },
  algorify: { pos: [-1.0, -0.95, -5.4], rotY: 0.16, w: 2.4, h: 1.5, phase: 4.4 },
}

/** Lazily build a canvas texture once per component instance; dispose on unmount. */
function useCanvasTexture(factory: () => THREE.Texture) {
  const ref = useRef<THREE.Texture | null>(null)
  if (!ref.current) ref.current = factory()
  const texture = ref.current
  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

/** The large central screen showing portfolio identity + a soft backlight glow. */
function IdentityScreen() {
  const groupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.MeshStandardMaterial>(null)
  const texture = useCanvasTexture(identityTexture)
  const glow = useCanvasTexture(glowTexture)

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const time = state.clock.elapsedTime
    const ease = Math.min(1, delta * 3)
    group.position.y = 0.95 + Math.sin(time * 0.5) * 0.05
    group.rotation.y = -0.16 + experience.smooth.x * 0.05
    group.rotation.x = experience.smooth.y * 0.02
    if (screenRef.current) {
      const target = 0.55 * experience.luma
      screenRef.current.emissiveIntensity += (target - screenRef.current.emissiveIntensity) * ease
    }
  })

  return (
    <group ref={groupRef} position={[2.35, 0.95, -1.0]}>
      {/* Backlight glow — screen emits light into the room */}
      <mesh position={[0, 0, -0.35]} scale={[7.4, 4.6, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          color="#5FCB96"
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Bezel */}
      <mesh position={[0, 0, -0.05]} castShadow>
        <boxGeometry args={[4.75, 2.75, 0.08]} />
        <meshStandardMaterial color="#141518" metalness={0.8} roughness={0.38} />
      </mesh>
      {/* Screen */}
      <mesh>
        <planeGeometry args={[4.6, 2.6]} />
        <meshStandardMaterial
          ref={screenRef}
          map={texture}
          emissive="#FFFFFF"
          emissiveMap={texture}
          emissiveIntensity={0.55}
          roughness={0.55}
          metalness={0}
        />
      </mesh>
      {/* Status LED */}
      <mesh position={[2.3, -1.42, 0.02]}>
        <boxGeometry args={[0.12, 0.04, 0.02]} />
        <meshStandardMaterial
          color="#0F2018"
          emissive="#53C188"
          emissiveIntensity={1.4}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

/** Portrait on a large floating vertical display — square image, square plane, no distortion. */
function PortraitDisplay() {
  const texture = useTexture('/images/portrait.png')
  const plate = useCanvasTexture(plateTexture)
  const veil = useCanvasTexture(veilTexture)
  const glow = useCanvasTexture(glowTexture)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const time = state.clock.elapsedTime
    const ease = Math.min(1, delta * 3)
    group.position.y = 0.35 + Math.sin(time * 0.42 + 1.3) * 0.045
    // Faces the intro camera; eases a touch toward the cursor.
    const targetRotY = -0.4 + experience.smooth.x * 0.06
    group.rotation.y += (targetRotY - group.rotation.y) * ease
  })

  return (
    <group ref={groupRef} position={[5.0, 0.35, -2.4]} rotation={[0, -0.4, 0]}>
      {/* Soft backlight so the display separates from the dark */}
      <mesh position={[0, 0.1, -0.42]} scale={[4.6, 5.6, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          color="#AEB6C2"
          transparent
          opacity={0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Vertical display housing */}
      <mesh position={[0, 0, -0.07]} castShadow>
        <boxGeometry args={[2.05, 2.95, 0.1]} />
        <meshStandardMaterial color="#141518" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Bezel background */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.9, 2.8]} />
        <meshStandardMaterial color="#0A0B0C" roughness={0.8} metalness={0} />
      </mesh>
      {/* Portrait — 460×460 source on a 1:1 plane */}
      <mesh position={[0, 0.3, 0.001]}>
        <planeGeometry args={[1.9, 1.9]} />
        <meshStandardMaterial
          map={texture}
          emissive="#FFFFFF"
          emissiveMap={texture}
          emissiveIntensity={0.24}
          roughness={0.65}
          metalness={0}
        />
      </mesh>
      {/* Gradient veil — lower area sinks into the display */}
      <mesh position={[0, 0.3, 0.012]}>
        <planeGeometry args={[1.9, 1.9]} />
        <meshBasicMaterial map={veil} transparent depthWrite={false} />
      </mesh>
      {/* Engraved plate */}
      <mesh position={[0, -1.18, 0.01]}>
        <planeGeometry args={[1.7, 0.32]} />
        <meshStandardMaterial
          map={plate}
          emissive="#FFFFFF"
          emissiveMap={plate}
          emissiveIntensity={0.35}
          roughness={0.7}
          metalness={0}
        />
      </mesh>
      {/* Accent LED */}
      <mesh position={[0.94, 1.4, 0.02]}>
        <boxGeometry args={[0.1, 0.04, 0.02]} />
        <meshStandardMaterial color="#0F2018" emissive="#53C188" emissiveIntensity={1.4} roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  )
}

/** One project as a physical screen. Hovering its DOM row focuses it here. */
function ProjectPanel({ project, shadows }: { project: Project; shadows: boolean }) {
  const layout = PROJECT_LAYOUT[project.slug]
  const groupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.MeshStandardMaterial>(null)
  const edgeRef = useRef<THREE.MeshStandardMaterial>(null)
  const texture = useMemo(() => projectTexture(project), [project])
  const edgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0F2018',
        emissive: new THREE.Color('#53C188'),
        emissiveIntensity: 0.6,
        metalness: 0.3,
        roughness: 0.4,
      }),
    [],
  )

  useEffect(
    () => () => {
      texture.dispose()
      edgeMaterial.dispose()
    },
    [texture, edgeMaterial],
  )

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    const time = state.clock.elapsedTime
    const ease = Math.min(1, delta * 4)
    const hovered = experience.hoverSlug === project.slug
    const luma = experience.luma

    const targetScale = hovered ? 1.07 : 1
    group.scale.x += (targetScale - group.scale.x) * ease
    group.scale.y = group.scale.x
    group.scale.z = group.scale.x

    const bob = Math.sin(time * 0.55 + layout.phase) * (hovered ? 0.02 : 0.05)
    group.position.y = layout.pos[1] + bob

    // Turns toward the camera when focused, toward the cursor otherwise.
    const baseTurn = hovered ? layout.rotY * 0.45 : layout.rotY
    const targetRotY = baseTurn + experience.smooth.x * (hovered ? 0.14 : 0.07)
    group.rotation.y += (targetRotY - group.rotation.y) * ease
    const targetRotX = -experience.smooth.y * 0.04 + Math.sin(time * 0.4 + layout.phase) * 0.015
    group.rotation.x += (targetRotX - group.rotation.x) * ease

    if (screenRef.current) {
      const target = (0.5 + (hovered ? 0.5 : 0)) * luma
      screenRef.current.emissiveIntensity += (target - screenRef.current.emissiveIntensity) * ease
    }
    if (edgeRef.current) {
      const target = (0.55 + (hovered ? 1.5 : 0)) * Math.max(0.35, luma)
      edgeRef.current.emissiveIntensity += (target - edgeRef.current.emissiveIntensity) * ease
    }
  })

  return (
    <group ref={groupRef} position={layout.pos} rotation={[0, layout.rotY, 0]}>
      {/* Housing */}
      <mesh position={[0, 0, -0.04]} castShadow={shadows} receiveShadow={shadows}>
        <boxGeometry args={[layout.w + 0.09, layout.h + 0.09, 0.06]} />
        <meshStandardMaterial color="#141518" metalness={0.8} roughness={0.4} />
      </mesh>
      {/* Screen */}
      <mesh>
        <planeGeometry args={[layout.w, layout.h]} />
        <meshStandardMaterial
          ref={screenRef}
          map={texture}
          emissive="#FFFFFF"
          emissiveMap={texture}
          emissiveIntensity={0.5}
          roughness={0.55}
          metalness={0}
        />
      </mesh>
      {/* Accent edge strip */}
      <mesh position={[-layout.w * 0.28, -layout.h / 2 - 0.07, 0.01]} material={edgeMaterial}>
        <boxGeometry args={[layout.w * 0.4, 0.035, 0.02]} />
      </mesh>
      {/* Corner tick */}
      <mesh position={[layout.w / 2 + 0.1, layout.h / 2 - 0.12, 0.01]} material={edgeMaterial}>
        <boxGeometry args={[0.05, 0.05, 0.02]} />
      </mesh>
    </group>
  )
}

/** Identity screen + portrait display + one panel per project. */
export function Screens({ tier }: { tier: Exclude<Tier, 'static'> }) {
  const shadows = tier === 'high'
  return (
    <>
      <IdentityScreen />
      <Suspense fallback={null}>
        <PortraitDisplay />
      </Suspense>
      {projects.map((project) => (
        <ProjectPanel key={project.slug} project={project} shadows={shadows} />
      ))}
    </>
  )
}
