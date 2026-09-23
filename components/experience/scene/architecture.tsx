'use client'

import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

import type { Tier } from '@/lib/experience'
import { gridTexture } from '../textures'

/** Columns recede into fog — far background depth markers. */
const COLUMNS: [number, number, number][] = [
  [-11, -9.5, 9],
  [-7.8, -12.5, 10.5],
  [-4.4, -9.8, 8],
  [-1.2, -13.4, 11],
  [2.6, -10.2, 8.6],
  [6.2, -12.8, 10],
  [9.6, -9.6, 9.2],
  [12.4, -13.2, 10.8],
  [-13.5, -13.8, 9.5],
  [4.8, -15.5, 8.4],
  [-6.2, -15.8, 10.2],
  [0.8, -16.4, 11.4],
]

const LOW_COLUMN_COUNT = 7

/** Overhead beams — the ceiling of the workspace. */
const BEAMS: [number, number, number][] = [
  [0, 3.4, -5],
  [0, 3.4, -8.5],
  [0, 3.6, -12],
]

/**
 * The architectural shell: floor grid, column forest, overhead beams, a
 * terraced slab stack, extremely close foreground elements that partially
 * leave the viewport, and far fins the fog chews on. Every piece has a
 * compositional job — foreground / midground / background.
 */
export function Architecture({ tier }: { tier: Exclude<Tier, 'static'> }) {
  const shadows = tier === 'high'

  const grid = useMemo(() => {
    const texture = gridTexture()
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(26, 26)
    return texture
  }, [])

  const shared = useMemo(() => {
    const unit = new THREE.BoxGeometry(1, 1, 1)
    const column = new THREE.BoxGeometry(0.5, 1, 0.5)
    const beam = new THREE.BoxGeometry(22, 0.32, 0.45)
    const metal = new THREE.MeshStandardMaterial({ color: '#17181C', metalness: 0.75, roughness: 0.42 })
    const dark = new THREE.MeshStandardMaterial({ color: '#101014', metalness: 0.5, roughness: 0.62 })
    const accent = new THREE.MeshStandardMaterial({
      color: '#0F2018',
      emissive: new THREE.Color('#53C188'),
      emissiveIntensity: 0.65,
      metalness: 0.3,
      roughness: 0.5,
    })
    const floor = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.72, metalness: 0.25, map: grid })
    const glass = new THREE.MeshPhysicalMaterial({
      color: '#9FB4C7',
      transparent: true,
      opacity: 0.1,
      roughness: 0.18,
      metalness: 0,
      side: THREE.DoubleSide,
    })
    return { unit, column, beam, metal, dark, accent, floor, glass }
  }, [grid])

  useEffect(
    () => () => {
      shared.unit.dispose()
      shared.column.dispose()
      shared.beam.dispose()
      shared.metal.dispose()
      shared.dark.dispose()
      shared.accent.dispose()
      shared.floor.dispose()
      shared.glass.dispose()
      grid.dispose()
    },
    [shared, grid],
  )

  const columns = tier === 'high' ? COLUMNS : COLUMNS.slice(0, LOW_COLUMN_COUNT)

  return (
    <group>
      {/* Floor — receives every shadow in the scene */}
      <mesh
        geometry={shared.unit}
        material={shared.floor}
        position={[0, -2.1, -4]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[80, 80, 1]}
        receiveShadow={shadows}
      />

      {/* Column forest */}
      {columns.map(([x, z, height], index) => (
        <mesh
          key={`column-${index}`}
          geometry={shared.column}
          material={index % 5 === 3 ? shared.dark : shared.metal}
          position={[x, -2.1 + height / 2, z]}
          scale={[1, height, 1]}
          castShadow={shadows}
          receiveShadow={shadows}
        />
      ))}

      {/* Ceiling beams */}
      {BEAMS.map(([x, y, z], index) => (
        <mesh key={`beam-${index}`} geometry={shared.beam} material={shared.metal} position={[x, y, z]} castShadow={shadows} />
      ))}

      {/* Terraced slab stack — mid-left massing */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={`terrace-${i}`}
          geometry={shared.unit}
          material={i === 3 ? shared.metal : shared.dark}
          position={[-7.6, -2.1 + 0.3 + i * 0.58, -3.4]}
          scale={[4.6 - i * 0.85, 0.56, 3.4 - i * 0.55]}
          castShadow={shadows}
          receiveShadow={shadows}
        />
      ))}

      {/* Foreground column — extreme left, partially leaves the viewport */}
      <mesh geometry={shared.unit} material={shared.dark} position={[-2.4, 1.4, 5.2]} scale={[1.6, 9, 1.6]} castShadow={shadows} />

      {/* Foreground beam — grazes the top edge of the establishing shot */}
      <mesh geometry={shared.unit} material={shared.metal} position={[0.5, 2.5, 4.0]} scale={[26, 0.8, 1.0]} castShadow={shadows} />

      {/* Slim slat that passes in front of the portrait display */}
      <mesh geometry={shared.unit} material={shared.metal} position={[3.9, 0.6, 0.5]} scale={[0.14, 4.6, 0.14]} castShadow={shadows} />

      {/* Far fins — silhouettes for the fog; one carries the accent */}
      {[-12, -8.6, -5.2, -1.8, 2.2, 5.6, 9, 12.4].map((x, index) => (
        <mesh
          key={`fin-${index}`}
          geometry={shared.unit}
          material={index === 4 ? shared.accent : shared.dark}
          position={[x, -2.1 + (3.6 + (index % 3) * 1.4) / 2, -17]}
          scale={[0.55, 3.6 + (index % 3) * 1.4, 0.55]}
        />
      ))}

      {/* Floating glass planes — high tier only */}
      {tier === 'high' && (
        <>
          <mesh geometry={shared.unit} material={shared.glass} position={[4.6, 1.4, -0.6]} rotation={[0, -0.5, 0.06]} scale={[2.2, 3, 0.02]} />
          <mesh geometry={shared.unit} material={shared.glass} position={[-5.8, 0.8, -7.5]} rotation={[0, 0.5, -0.04]} scale={[3, 2, 0.02]} />
          <mesh geometry={shared.unit} material={shared.glass} position={[7.4, 0.4, -5]} rotation={[0, -0.7, 0.05]} scale={[2.6, 3.4, 0.02]} />
        </>
      )}
    </group>
  )
}