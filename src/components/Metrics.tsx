'use client'

import { siLeetcode, siHackerrank, siCodeforces, siGeeksforgeeks } from 'simple-icons'
import { Reveal } from '@/components/Reveal'
import { codingProfiles } from '@/data/coding-profiles'

const ICON_MAP: Record<string, { path: string; hex: string }> = {
  LeetCode:      { path: siLeetcode.path,      hex: siLeetcode.hex },
  HackerRank:    { path: siHackerrank.path,    hex: siHackerrank.hex },
  Codeforces:    { path: siCodeforces.path,    hex: siCodeforces.hex },
  GeeksforGeeks: { path: siGeeksforgeeks.path, hex: siGeeksforgeeks.hex },
}

export function Metrics() {
  return (
    <section id="metrics" className="py-12 border-t border-border scroll-mt-20">
      <p className="font-heading italic text-2xl text-muted-foreground mb-6">metrics.</p>

      <Reveal>
        <div className="grid grid-cols-2 gap-3">
          {codingProfiles.map(({ label, stat, statLabel, href, iconKey }) => {
            const def = ICON_MAP[iconKey]
            const brandColor = `#${def?.hex}`

            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 overflow-hidden hover:border-foreground/20 transition-all hover:shadow-sm"
              >
                {/* Top accent strip */}
                <div
                  className="absolute top-0 inset-x-0 h-1 rounded-t-xl"
                  style={{ background: brandColor }}
                />

                {/* Stat */}
                <div className="mt-1">
                  <p
                    className="font-mono text-4xl font-bold tracking-tight leading-none"
                    style={{ color: brandColor }}
                  >
                    {stat}
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground mt-1.5">
                    {statLabel}
                  </p>
                </div>

                {/* Platform row */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2">
                    {def && (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ fill: brandColor }}
                      >
                        <path d={def.path} />
                      </svg>
                    )}
                    <span className="font-mono text-[11px] text-muted-foreground">{label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground group-hover:translate-x-px group-hover:-translate-y-px transition-all">
                    ↗
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
