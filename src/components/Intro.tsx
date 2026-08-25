'use client'

import { useEffect, useRef, useState } from 'react'

const GREETINGS = [
  'नमस्ते',        // Sanskrit
  'నమస్కారం',     // Telugu
  'Hello',        // English
  'Bonjour',      // French
  'Hola',         // Spanish
  'Ciao',         // Italian
  'こんにちは',    // Japanese
  'Hallo',        // German
  '안녕하세요',    // Korean
  '你好',          // Chinese
  'مرحبا',        // Arabic
  'Olá',          // Portuguese
  'Привет',       // Russian
  'Merhaba',      // Turkish
  'नमस्ते',        // Sanskrit — end where we started
]

const INTERVAL = 142        // ms per word
const FINAL_HOLD = 1600     // ms the "I am…" phrase stays
const FLIGHT_MS = 680       // ms the flight animation takes
const FLIGHT_BUFFER_MS = 80 // extra buffer after flight before hiding intro

type Phase = 'words' | 'final' | 'flying' | 'done'

interface Fly { x: number; y: number; scale: number }

export function Intro() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('words')
  const [fly, setFly] = useState<Fly>({ x: 0, y: 0, scale: 1 })
  const finalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem('intro-shown')) {
      setPhase('done')
      return
    }

    document.body.style.overflowY = 'hidden'

    let i = 0
    const total = GREETINGS.length
    let t1: ReturnType<typeof setTimeout>
    let t2: ReturnType<typeof setTimeout>

    const timer = setInterval(() => {
      i++
      if (i < total) {
        setIndex(i)
      } else {
        clearInterval(timer)
        t1 = setTimeout(() => {
          setPhase('final')
          t2 = setTimeout(launchFlight, FINAL_HOLD)
        }, INTERVAL * 2)
      }
    }, INTERVAL)

    return () => {
      clearInterval(timer)
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflowY = ''
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function launchFlight() {
    const heroHead = document.querySelector('[data-hero-head]')
    const introEl = finalRef.current

    if (heroHead && introEl) {
      const hRect = heroHead.getBoundingClientRect()
      const iRect = introEl.getBoundingClientRect()

      // Translate the intro element's center to the hero element's center
      const dx = (hRect.left + hRect.width / 2) - (iRect.left + iRect.width / 2)
      const dy = (hRect.top + hRect.height / 2) - (iRect.top + iRect.height / 2)
      const scale = hRect.height / iRect.height

      setFly({ x: dx, y: dy, scale })
    }

    setPhase('flying')

    setTimeout(() => {
      setPhase('done')
      document.body.style.overflowY = ''
      sessionStorage.setItem('intro-shown', '1')
    }, FLIGHT_MS + FLIGHT_BUFFER_MS)
  }

  if (phase === 'done') return null

  const flying = phase === 'flying'

  return (
    <>
      {/* Background — fades while the line flies */}
      <div
        className="bg-background"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          overflow: 'hidden',
          transition: `opacity ${FLIGHT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          opacity: flying ? 0 : 1,
          pointerEvents: flying ? 'none' : 'all',
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Cycling words */}
        {phase === 'words' && (
          <span
            key={index}
            className="text-foreground"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 600,
              fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
              letterSpacing: '-0.03em',
              animation: `introWord ${INTERVAL}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            {GREETINGS[index]}
          </span>
        )}

        {/* Final "I am [nk.] Nitin Kumar R" — stays mounted during flight so transform works */}
        {(phase === 'final' || phase === 'flying') && (
          <div
            ref={finalRef}
            className="text-foreground"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              // Fade in when final, then fly+fade when flying
              animation: phase === 'final' ? 'introFinal 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
              transition: flying
                ? `transform ${FLIGHT_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity 220ms ${FLIGHT_MS - 200}ms ease`
                : 'none',
              transform: flying
                ? `translate(${fly.x}px, ${fly.y}px) scale(${fly.scale})`
                : 'translate(0,0) scale(1)',
              opacity: flying ? 0 : 1,
              transformOrigin: 'center center',
            }}
          >
            <span style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
              fontWeight: 400,
              fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
              letterSpacing: '-0.02em',
            }}>
              I am
            </span>

            <div
              className="bg-black text-white dark:bg-white dark:text-black"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-geist-mono), monospace',
                flexShrink: 0,
              }}
            >
              nk.
            </div>

            <span style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
              fontWeight: 600,
              fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
              letterSpacing: '-0.02em',
            }}>
              Nitin Kumar R
            </span>
          </div>
        )}
      </div>
    </>
  )
}
