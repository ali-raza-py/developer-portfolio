'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

import { experience, type Tier } from '@/lib/experience'
import { Architecture } from './scene/architecture'
import { CameraRig } from './scene/camera-rig'
import { Dust } from './scene/dust'
import { Fragments } from './scene/fragments'
import { Screens } from './scene/screens'

type LiveTier = Exclude<Tier, 'static'>

/**
 * Offline environment map — a room PMREM baked locally, so metal and glass
 * pick up believable reflections without a single network request.
 */
function StageEnvironment() {
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const target = pmrem.fromScene(room, 0.04)
    scene.environment = target.texture
    scene.environmentIntensity = 0.22
    return () => {
      scene.environment = null
      target.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])

  return null
}

/**
 * Lighting rig: one shadow-casting key that leans with the cursor, a cool
 * fill, and a restrained brand-green rim behind the identity screen.
 * Intensities are driven per-frame from the camera keyframes.
 */
function StageLights({ shadows }: { shadows: boolean }) {
  const keyRef = useRef<THREE.DirectionalLight>(null)
  const rimRef = useRef<THREE.PointLight>(null)

  useFrame((_, delta) => {
    const ease = Math.min(1, delta * 4)
    const key = keyRef.current
    if (key) {
      key.intensity += (experience.key - key.intensity) * ease
      key.position.x = 5.5 + experience.smooth.x * 1.8
      key.position.y = 7.5 - experience.smooth.y * 1.0
    }
    const rim = rimRef.current
    if (rim) {
      const target = experience.rim * 6
      rim.intensity += (target - rim.intensity) * ease
    }
  })

  return (
    <>
      <ambientLight intensity={0.16} color="#AAB2BF" />
      <directionalLight
        ref={keyRef}
        castShadow={shadows}
        position={[5.5, 7.5, 4.5]}
        intensity={1.15}
        color="#F5F1E8"
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
      />
      <pointLight position={[-6, 1.6, 2.5]} intensity={4} distance={22} decay={2} color="#7F97B3" />
      <pointLight ref={rimRef} position={[2.6, 1.4, -3.2]} intensity={4.2} distance={16} decay={2} color="#53C188" />
      <spotLight position={[0, 8.5, -8]} angle={0.7} penumbra={1} intensity={14} distance={30} decay={2} color="#DFE6F0" />
    </>
  )
}

/**
 * The full workspace stage. Quality tier decides shadows, DPR and detail
 * density; the camera rig and lights read scroll/cursor state from the shared
 * experience store, so nothing here re-renders on scroll.
 */
export default function WorkspaceCanvas({ tier, onReady }: { tier: LiveTier; onReady: () => void }) {
  const shadows = tier === 'high'

  return (
    <Canvas
      shadows={shadows}
      dpr={shadows ? [1, 1.75] : [1, 1.3]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ fov: 42, near: 0.1, far: 70, position: [0, 0.35, 8.6] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1
        onReady()
      }}
    >
      <color attach="background" args={['#0B0B0C']} />
      <fog attach="fog" args={['#0B0B0C', 6, 34]} />
      <StageEnvironment />
      <StageLights shadows={shadows} />
      <CameraRig />
      <Architecture tier={tier} />
      <Suspense fallback={null}>
        <Screens tier={tier} />
      </Suspense>
      <Fragments tier={tier} />
      <Dust tier={tier} />
    </Canvas>
  )
}