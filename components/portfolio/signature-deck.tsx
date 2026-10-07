'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type DeckCard = {
  eyebrow: string
  title: string
  detail: string
  href: string
  external?: boolean
  tone: 'paper' | 'ink' | 'accent'
}

const cards: DeckCard[] = [
  { eyebrow: '01 / IDENTITY', title: 'Ali Raza', detail: 'Software engineering student', href: '#top', tone: 'paper' },
  { eyebrow: '02 / CODE', title: 'GitHub', detail: 'Public repositories and experiments', href: 'https://github.com/ali-raza-py', external: true, tone: 'ink' },
  { eyebrow: '03 / NETWORK', title: 'LinkedIn', detail: 'Professional profile', href: 'https://www.linkedin.com/in/ali-r-a8a144391', external: true, tone: 'paper' },
  { eyebrow: '04 / WORK', title: 'Projects', detail: 'Selected engineering work', href: '#projects', tone: 'accent' },
  { eyebrow: '05 / DOCUMENT', title: 'Resume', detail: 'Background, education, and skills', href: '/resume', tone: 'paper' },
  { eyebrow: '06 / OPEN', title: 'Contact', detail: 'Email and collaboration', href: '#contact', tone: 'ink' },
]

function setCardPosition(card: HTMLElement, index: number, progress: number) {
  const center = index - (cards.length - 1) / 2
  card.style.setProperty('--card-x', `${center * 7 * progress}rem`)
  card.style.setProperty('--card-y', `${center * 1.5 * progress}rem`)
  card.style.setProperty('--card-rotate', `${center * 4.5 * progress + (index - 2.5) * 1.2}deg`)
  card.style.setProperty('--card-z', String(Math.round(cards.length - index + progress * index * 2)))
}

export function SignatureDeck() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const deckRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    const section = sectionRef.current
    const deck = deckRef.current
    if (!section || !deck) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const cardsOnStage = [...deck.querySelectorAll<HTMLElement>('.signature-deck-card')]
    if (reduced.matches) {
      deck.style.setProperty('--deck-progress', '1')
      cardsOnStage.forEach((card, index) => setCardPosition(card, index, 1))
      return
    }

    cardsOnStage.forEach((card, index) => {
      const center = index - (cards.length - 1) / 2
      gsap.to(card, {
        '--card-x': `${center * 7}rem`,
        '--card-y': `${center * 1.5}rem`,
        '--card-rotate': `${center * 4.5 + (index - 2.5) * 1.2}deg`,
        '--card-z': cards.length - index + index * 2,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="signature-deck-section" aria-labelledby="signature-deck-title">
      <div className="signature-deck-sticky">
        <div className="signature-deck-heading">
          <p className="reference-file-label">FILE 06 · THE DECK</p>
          <h2 id="signature-deck-title">Keep in touch<span>.</span></h2>
          <p>A small index of the places where I build, share, and connect.</p>
        </div>
        <div ref={deckRef} className="signature-deck">
          {cards.map((card, index) => {
            return (
              <a
                key={card.title}
                href={card.href}
                data-cursor="open"
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                className={`signature-deck-card signature-deck-card-${card.tone}`}
                style={{
                  '--card-index': index,
                } as React.CSSProperties}
              >
                <span className="signature-deck-card-mark">AR</span>
                <span className="signature-deck-card-eyebrow">{card.eyebrow}</span>
                <strong>{card.title}</strong>
                <span className="signature-deck-card-detail">{card.detail}</span>
                <span className="signature-deck-card-arrow" aria-hidden="true">↗</span>
              </a>
            )
          })}
        </div>
        <p className="signature-deck-hint">Scroll to spread · select a card to continue</p>
      </div>
    </section>
  )
}
