'use client'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GITHUB_USERNAME } from '@/data/config'

interface Contribution {
  date: string
  count: number
  level: number
}

interface ContribApiResponse {
  contributions: Contribution[]
}

interface Tooltip {
  x: number
  y: number
  text: string
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const GAP = '3px'
const MAX_WEEKS = 36

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`
}

function buildWeeks(contributions: Contribution[]) {
  if (!contributions.length) {
    return { weeks: [] as (Contribution | null)[][], monthLabels: [] as { month: string; weekIdx: number }[] }
  }

  const firstDay = new Date(contributions[0].date + 'T00:00:00').getDay()
  const cells: (Contribution | null)[] = [...Array(firstDay).fill(null), ...contributions]

  const allWeeks: (Contribution | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    allWeeks.push(cells.slice(i, i + 7))
  }

  const weeks = allWeeks.slice(-MAX_WEEKS)

  // Compute month labels without mutating state during render
  const monthLabels: { month: string; weekIdx: number }[] = []
  let lastShownWeek = -4
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    const firstReal = week.find(d => d !== null)
    if (!firstReal) return
    const m = new Date(firstReal.date + 'T00:00:00').getMonth()
    if (m !== lastMonth && wi - lastShownWeek >= 4) {
      monthLabels.push({ month: MONTHS[m], weekIdx: wi })
      lastShownWeek = wi
      lastMonth = m
    }
  })

  return { weeks, monthLabels }
}

export function ContribGraph() {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [total, setTotal] = useState(0)
  const [error, setError] = useState(false)
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then(r => r.json())
      .then((data: ContribApiResponse) => {
        const contribs = data.contributions ?? []
        setContributions(contribs)
        setTotal(contribs.reduce((s, c) => s + c.count, 0))
      })
      .catch(() => setError(true))
  }, [])

  const { weeks, monthLabels } = useMemo(() => buildWeeks(contributions), [contributions])

  function showTooltip(e: React.MouseEvent, cell: Contribution) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      text: `${cell.count} contribution${cell.count !== 1 ? 's' : ''} on ${formatDate(cell.date)}`,
    })
  }

  return (
    <>
      {/* Graph card */}
      <div className="border border-border rounded-xl bg-card overflow-hidden w-full">
        <div className="p-4">
          {error ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Couldn&apos;t load contribution data.{' '}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                View on GitHub ↗
              </a>
            </p>
          ) : (
            <>
              {/* Month labels */}
              <div style={{ display: 'flex', gap: GAP, marginBottom: '6px', width: '100%' }}>
                {weeks.map((_, wi) => {
                  const label = monthLabels.find(m => m.weekIdx === wi)
                  return (
                    <div key={wi} style={{ flex: 1, minWidth: 0, position: 'relative' }}>
                      {label && (
                        <span style={{
                          fontSize: '11px',
                          lineHeight: 1,
                          color: 'var(--muted-foreground)',
                          position: 'absolute',
                          whiteSpace: 'nowrap',
                          fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                        }}>
                          {label.month}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Cell grid */}
              <div style={{ display: 'flex', gap: GAP, marginTop: '18px', width: '100%' }}>
                {weeks.map((week, wi) => (
                  <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: GAP, flex: 1, minWidth: 0 }}>
                    {Array.from({ length: 7 }).map((_, di) => {
                      const cell = week[di] ?? null
                      const level = cell ? cell.level : 0
                      return (
                        <div
                          key={di}
                          role={cell ? 'gridcell' : undefined}
                          tabIndex={cell ? 0 : undefined}
                          aria-label={cell ? `${cell.count} contribution${cell.count !== 1 ? 's' : ''} on ${formatDate(cell.date)}` : undefined}
                          className={`contrib-l${level} contrib-cell`}
                          style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '2px', cursor: cell ? 'default' : undefined }}
                          onMouseEnter={cell ? (e) => showTooltip(e, cell) : undefined}
                          onMouseLeave={cell ? () => setTooltip(null) : undefined}
                          onFocus={cell ? (e) => showTooltip(e as unknown as React.MouseEvent, cell) : undefined}
                          onBlur={cell ? () => setTooltip(null) : undefined}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Stats footer */}
              <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                <span className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
                  {total.toLocaleString()} contributions in the last year
                </span>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map(l => (
                    <div key={l} className={`contrib-l${l}`} style={{ width: '11px', height: '11px', borderRadius: '2px' }} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CTA — outside the card */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-4">
        <p className="text-sm text-muted-foreground">
          Interested in working together?{' '}
          <a
            href="/resume.pdf"
            className="text-foreground font-medium underline underline-offset-4 decoration-muted-foreground hover:decoration-foreground transition-colors"
          >
            Resume ↗
          </a>
        </p>
        <div className="flex gap-2 flex-wrap">
          <a
            href="https://cal.com/thenitinkumar"
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            <span aria-hidden="true">📅</span> Book an intro call
          </a>
          <a
            href="mailto:nitinkumar72k2@gmail.com"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            <span aria-hidden="true">✉</span> Send an email
          </a>
        </div>
      </div>

      {/* Tooltip portal */}
      {tooltip && createPortal(
        <div style={{ position: 'fixed', left: tooltip.x, top: tooltip.y, transform: 'translate(-50%, calc(-100% - 10px))', zIndex: 9999, pointerEvents: 'none' }}>
          <div style={{ background: 'var(--tooltip-bg)', color: 'var(--tooltip-fg)', fontSize: '12px', fontFamily: 'var(--font-geist-sans), system-ui, sans-serif', padding: '5px 10px', borderRadius: '6px', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', border: '1px solid var(--tooltip-border)' }}>
            {tooltip.text}
          </div>
          <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid var(--tooltip-bg)' }} />
        </div>,
        document.body
      )}
    </>
  )
}

