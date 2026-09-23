'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import type { Tier } from '@/lib/experience'
import { dotTexture } from '../textures'

const COUNTS: Record<Exclude<Tier, 'static'>, number> = { high: 900, low: 240 }

/**
 * Slow atmospheric dust — a depth cue, not a particle show.
 * The whole cloud drifts a few centimetres; individual particles never streak.
 */
export function Dust({ tier }: { tier: Exclude<Tier, 'static'> }) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = COUNTS[tier]

  const assets = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = -3 + Math.random() * 8
      positions[i * 3 + 2] = -16 + Math.random() * 24
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const sprite = dotTexture()
    const material = new THREE.PointsMaterial({
      size: 0.045,
      map: sprite,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      color: new THREE.Color('#cfd3da'),
    })
    return { geometry, material, sprite }
  }, [count])

  useEffect(
    () => () => {
      assets.geometry.dispose()
      assets.material.dispose()
      assets.sprite.dispose()
    },
    [assets],
  )

  useFrame((state) => {
    const points = pointsRef.current
    if (!points) return
    const time = state.clock.elapsedTime
    points.rotation.y = time * 0.008
    points.position.y = Math.sin(time * 0.12) * 0.25
  })

  return <points ref={pointsRef} geometry={assets.geometry} material={assets.material} frustumCulled={false} />
}