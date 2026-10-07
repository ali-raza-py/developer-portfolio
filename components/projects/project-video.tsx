'use client'

import { useEffect, useRef } from 'react'

type ProjectVideoProps = {
  src: string
  title: string
  playbackRate?: number
}

export function ProjectVideo({ src, title, playbackRate = 1 }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  return (
    <video
      ref={videoRef}
      className="h-auto w-full"
      autoPlay
      controls
      loop
      muted
      preload="metadata"
      playsInline
      aria-label={`${title} project demonstration video`}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support embedded videos.
    </video>
  )
}
