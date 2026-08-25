'use client'

import { useEffect, useState } from 'react'

const ROLES = [
  'Backend Engineer',
  'Open Source Contributor',
  'AI Enthusiast',
]

const HOLD = 2600       // ms each role stays
const TRANSITION = 300  // ms slide animation

export function RoleCycler() {
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const tick = () => {
      setExiting(true)
      setTimeout(() => {
        setIndex(i => (i + 1) % ROLES.length)
        setExiting(false)
      }, TRANSITION)
    }
    const timer = setInterval(tick, HOLD)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ overflow: 'hidden', height: '1.5em', marginTop: '0.125rem' }}>
      <span
        key={index}
        className="text-base text-muted-foreground block"
        style={{
          animation: exiting
            ? `roleOut ${TRANSITION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
            : `roleIn ${TRANSITION}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        }}
      >
        {ROLES[index]}
      </span>
    </div>
  )
}
