'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Volume2, VolumeX } from 'lucide-react'

type AmbientAudioContextValue = {
  isPlaying: boolean
  volume: number
  error: string
  clickSoundError: string
  togglePlayback: () => Promise<void>
  setVolume: (volume: number) => void
}

const AmbientAudioContext = createContext<AmbientAudioContextValue | null>(null)
const VOLUME_STORAGE_KEY = 'ambient-volume'
const DEFAULT_VOLUME = 0.22

function readStoredVolume() {
  try {
    const storedValue = localStorage.getItem(VOLUME_STORAGE_KEY)
    if (storedValue === null) return DEFAULT_VOLUME
    const stored = Number(storedValue)
    return Number.isFinite(stored) ? Math.min(1, Math.max(0, stored)) : DEFAULT_VOLUME
  } catch {
    return DEFAULT_VOLUME
  }
}

export function AmbientAudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME)
  const [error, setError] = useState('')
  const [clickSoundError, setClickSoundError] = useState('')

  useEffect(() => {
    const storedVolume = readStoredVolume()
    setVolumeState(storedVolume)
  }, [])

  useEffect(() => {
    const clickSound = new Audio('/audio/button-click.mp3')
    clickSound.preload = 'auto'
    clickSound.volume = 0.45
    clickSoundRef.current = clickSound

    const playClickSound = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const button = target.closest('button')
      if (!(button instanceof HTMLButtonElement) || button.disabled || button.getAttribute('aria-disabled') === 'true') return

      const sound = clickSoundRef.current
      if (!sound) return
      sound.currentTime = 0
      void sound.play().then(() => {
        setClickSoundError('')
      }).catch(() => {
        setClickSoundError('Button sound could not play. Check your browser audio settings.')
      })
    }

    document.addEventListener('click', playClickSound, true)
    return () => {
      document.removeEventListener('click', playClickSound, true)
      clickSound.pause()
      clickSoundRef.current = null
    }
  }, [])

  const setVolume = useCallback((nextVolume: number) => {
    const boundedVolume = Math.min(1, Math.max(0, nextVolume))
    setVolumeState(boundedVolume)
    if (audioRef.current) audioRef.current.volume = boundedVolume

    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(boundedVolume))
    } catch {
      // Audio control remains available when browser storage is disabled.
    }
  }, [])

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current ?? new Audio('/audio/dreiton.mp3')

    if (isPlaying) {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
      setError('')
      try {
        localStorage.setItem('ambient-sound', 'off')
      } catch {
        // Audio control remains available when browser storage is disabled.
      }
      return
    }

    audio.loop = true
    audio.volume = volume
    try {
      await audio.play()
      audioRef.current = audio
      setIsPlaying(true)
      setError('')
      try {
        localStorage.setItem('ambient-sound', 'on')
      } catch {
        // Audio control remains available when browser storage is disabled.
      }
    } catch {
      setError('Ambient music could not start. Check your browser audio settings and try again.')
      setIsPlaying(false)
    }
  }, [isPlaying, volume])

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  return (
    <AmbientAudioContext.Provider
      value={{ isPlaying, volume, error: error || clickSoundError, clickSoundError, togglePlayback, setVolume }}
    >
      {children}
    </AmbientAudioContext.Provider>
  )
}

export function AmbientAudioControls({ compact = false }: { compact?: boolean }) {
  const context = useContext(AmbientAudioContext)
  if (!context) {
    throw new Error('AmbientAudioControls must be used within AmbientAudioProvider')
  }

  const { isPlaying, volume, error, togglePlayback, setVolume } = context

  return (
    <div className={`ambient-audio${compact ? ' ambient-audio-compact' : ''}`}>
      <button
        type="button"
        className="ambient-audio-toggle"
        onClick={() => void togglePlayback()}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        title={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
      >
        {isPlaying ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
        <span>{isPlaying ? 'MUSIC ON' : 'MUSIC OFF'}</span>
      </button>
      <label className="ambient-audio-volume">
        <span className="sr-only">Ambient music volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Ambient music volume"
        />
        <span aria-hidden="true">{Math.round(volume * 100)}%</span>
      </label>
      <span className="ambient-audio-status" role="status" aria-live="polite">
        {error}
      </span>
    </div>
  )
}
