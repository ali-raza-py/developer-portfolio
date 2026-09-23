'use client'

import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { experience, resolveCamera } from '@/lib/experience'

const posA = new THREE.Vector3()
const posB = new THREE.Vector3()
const lookA = new THREE.Vector3()
const lookB = new THREE.Vector3()
const pos = new THREE.Vector3()
const look = new THREE.Vector3()

/**
 * Drives the camera through the seven scene keyframes. Scroll sets the base
 * pose; the cursor adds a small, eased parallax on top — never more than
 * ~0.4 world units, so the frame stays cinematic instead of seasick.
 * Also publishes the presentation values (luma, key light, exposure) that the
 * rest of the scene reads each frame.
 */
export function CameraRig() {
  const { camera, gl, size } = useThree()

  useFrame((state, delta) => {
    const { a, b, t } = resolveCamera(experience.progress)

    posA.set(a.pos[0], a.pos[1], a.pos[2])
    posB.set(b.pos[0], b.pos[1], b.pos[2])
    pos.lerpVectors(posA, posB, t)

    lookA.set(a.look[0], a.look[1], a.look[2])
    lookB.set(b.look[0], b.look[1], b.look[2])
    look.lerpVectors(lookA, lookB, t)

    // Frame-rate independent easing of the cursor target.
    const ease = 1 - Math.pow(0.0015, delta)
    experience.smooth.x += (experience.pointer.x - experience.smooth.x) * ease
    experience.smooth.y += (experience.pointer.y - experience.smooth.y) * ease
    const sx = experience.smooth.x
    const sy = experience.smooth.y

    const aspect = size.width / Math.max(1, size.height)
    if (aspect < 1) {
      // Portrait screens: pull back along the view axis so the composition reads.
      const k = 1 + (1 - aspect) * 0.85
      pos.sub(look).multiplyScalar(k).add(look)
    }

    pos.x += sx * 0.42
    pos.y += -sy * 0.24 + Math.sin(state.clock.elapsedTime * 0.4) * 0.035

    const cam = camera as THREE.PerspectiveCamera
    const targetFov = aspect < 1 ? 54 : aspect < 1.35 ? 47 : 42
    if (Math.abs(cam.fov - targetFov) > 0.05) {
      cam.fov += (targetFov - cam.fov) * Math.min(1, delta * 3)
      cam.updateProjectionMatrix()
    }

    cam.position.copy(pos)
    look.x += sx * -0.12
    look.y += sy * 0.08
    cam.lookAt(look)

    // Presentation values consumed by lights and screen materials.
    experience.luma = a.luma + (b.luma - a.luma) * t
    experience.key = a.key + (b.key - a.key) * t
    experience.rim = a.rim + (b.rim - a.rim) * t
    gl.toneMappingExposure = a.exposure + (b.exposure - a.exposure) * t
    experience.camera.x = cam.position.x
    experience.camera.y = cam.position.y
    experience.camera.z = cam.position.z
  })

  return null
}