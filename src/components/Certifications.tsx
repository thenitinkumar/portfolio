'use client'

import { useState, useRef } from 'react'
import { Reveal } from '@/components/Reveal'
import { certifications, type Certification } from '@/data/certifications'

const ANTHROPIC_PATH =
  'M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z'

const SALESFORCE_PATH =
  'M11.5 5a4.5 4.5 0 0 1 4.41 3.607A3.75 3.75 0 0 1 19 12.25a3.75 3.75 0 0 1-3.75 3.75H8A4 4 0 0 1 8 8a4 4 0 0 1 .78.077A4.5 4.5 0 0 1 11.5 5z'

interface IssuerDef {
  label: string
  iconPath: string
  iconColor: string
  accentGradient: string
}

const ISSUERS: Record<string, IssuerDef> = {
  anthropic: {
    label: 'Anthropic',
    iconPath: ANTHROPIC_PATH,
    iconColor: 'currentColor',
    accentGradient: 'linear-gradient(90deg, #888, #bbb)',
  },
  salesforce: {
    label: 'Salesforce',
    iconPath: SALESFORCE_PATH,
    iconColor: '#00A1E0',
    accentGradient: 'linear-gradient(90deg, #00A1E0, #0070D2)',
  },
}

function fanTransform(index: number, total: number) {
  const halfTx = total <= 2 ? 68 : 104
  const halfAngle = total <= 2 ? 13 : 21
  const t = total > 1 ? index / (total - 1) : 0.5
  return {
    tx: -halfTx + t * halfTx * 2,
    ty: Math.abs(t - 0.5) * 2 * 18,
    rotate: -halfAngle + t * halfAngle * 2,
  }
}

function stackTransform(index: number, total: number) {
  const fromTop = total - 1 - index
  const sign = fromTop % 2 === 0 ? 1 : -1
  return {
    tx: sign * fromTop * 2.5,
    ty: fromTop * 4.5,
    rotate: sign * fromTop * 2,
  }
}

function DeckGroup({ issuerKey, certs }: { issuerKey: string; certs: Certification[] }) {
  const [fanned, setFanned] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const issuer = ISSUERS[issuerKey]
  const activeCert = fanned && activeIndex !== null ? certs[activeIndex] : null

  function handleDeckEnter() {
    clearTimeout(leaveTimer.current)
    setFanned(true)
  }

  function handleDeckLeave() {
    leaveTimer.current = setTimeout(() => {
      setFanned(false)
      setActiveIndex(null)
    }, 160)
  }

  return (
    <div className="flex flex-col items-center py-4">
      {/* Issuer label */}
      <div className="flex items-center gap-2 mb-6">
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-4 w-4 shrink-0"
          style={{ fill: issuer.iconColor }}
        >
          <path d={issuer.iconPath} />
        </svg>
        <span
          className="font-mono text-[11px] tracking-widest uppercase opacity-70"
          style={{ color: issuer.iconColor === 'currentColor' ? undefined : issuer.iconColor }}
        >
          {issuer.label}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">×{certs.length}</span>
      </div>

      {/* Deck */}
      <div
        className="relative"
        style={{ width: 240, height: 168 }}
        onMouseEnter={handleDeckEnter}
        onMouseLeave={handleDeckLeave}
      >
        {certs.map((cert, i) => {
          const { tx, ty, rotate } = fanned
            ? fanTransform(i, certs.length)
            : stackTransform(i, certs.length)
          const isActive = fanned && activeIndex === i
          const isDimmed = fanned && activeIndex !== null && !isActive

          return (
            <div
              key={cert.name}
              className="absolute rounded-xl border border-border bg-card overflow-hidden cursor-pointer select-none"
              style={{
                width: 208,
                height: 132,
                left: '50%',
                top: '50%',
                padding: '15px 17px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rotate}deg) scale(${isActive ? 1.07 : 1})`,
                zIndex: isActive ? 50 : i,
                opacity: isDimmed ? 0.45 : 1,
                boxShadow: !fanned
                  ? '0 2px 8px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)'
                  : isActive
                    ? '0 14px 40px rgba(0,0,0,0.26)'
                    : undefined,
                transition:
                  'transform 0.44s cubic-bezier(0.34, 1.5, 0.64, 1), box-shadow 0.22s ease, opacity 0.2s ease',
              }}
              onMouseEnter={() => { clearTimeout(leaveTimer.current); setActiveIndex(i) }}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => {
                if (cert.credentialUrl && cert.credentialUrl !== '#') {
                  window.open(cert.credentialUrl, '_blank', 'noreferrer')
                }
              }}
            >
              <div
                className="absolute top-0 inset-x-0 h-1 rounded-t-xl"
                style={{ background: issuer.accentGradient }}
              />
              <div
                className="absolute bottom-1 right-2 pointer-events-none"
                aria-hidden
                style={{ opacity: 0.055 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-20 w-20"
                  style={{
                    fill: issuer.iconColor === 'currentColor' ? 'currentColor' : issuer.iconColor,
                  }}
                >
                  <path d={issuer.iconPath} />
                </svg>
              </div>
              <p className="text-[13px] font-semibold leading-snug mt-0.5 pr-8">{cert.name}</p>
              <span className="font-mono text-[10.5px] text-muted-foreground border border-border rounded-full px-2 py-0.5 w-fit">
                {cert.year}
              </span>
            </div>
          )
        })}
      </div>

      {/* Hint */}
      <p className="mt-4 text-[11px] text-muted-foreground opacity-30">
        {fanned ? '' : 'hover to explore'}
      </p>
    </div>
  )
}

export function Certifications() {
  const grouped = Object.entries(
    certifications.reduce<Record<string, Certification[]>>((acc, cert) => {
      if (!acc[cert.issuerKey]) acc[cert.issuerKey] = []
      acc[cert.issuerKey].push(cert)
      return acc
    }, {}),
  )

  return (
    <section id="certifications" className="py-12 border-t border-border scroll-mt-20">
      <p className="font-heading italic text-2xl text-muted-foreground mb-6">certifications.</p>

      <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {grouped.map(([issuerKey, certs]) => (
            <DeckGroup key={issuerKey} issuerKey={issuerKey} certs={certs} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
