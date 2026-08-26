import { Badge } from '@/components/ui/badge'
import { TECH_LINKS } from '@/lib/tech-links'
import { TECH_ICONS } from '@/lib/tech-icons'

// Near-black brands: use currentColor so they're visible in both themes.
const CURRENT_COLOR_HEXES = new Set(['000000', '0a0a0a', '010101'])

function luminance(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function TechIcon({ name }: { name: string }) {
  const def = TECH_ICONS[name]
  if (!def) return null

  const hex = def.hex.toLowerCase()

  if (CURRENT_COLOR_HEXES.has(hex)) {
    return (
      <svg role="img" viewBox="0 0 24 24" aria-hidden className="h-3 w-3 shrink-0" style={{ fill: 'currentColor' }}>
        <path d={def.path} />
      </svg>
    )
  }

  // Light brand colors (e.g. JS yellow) need a colored bg box so the icon
  // reads correctly on light backgrounds where letter cutouts would vanish.
  if (luminance(hex) > 180) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-[3px] shrink-0"
        style={{ backgroundColor: `#${def.hex}`, width: 14, height: 14 }}
      >
        <svg role="img" viewBox="0 0 24 24" aria-hidden style={{ fill: '#000', width: 10, height: 10 }}>
          <path d={def.path} />
        </svg>
      </span>
    )
  }

  return (
    <svg role="img" viewBox="0 0 24 24" aria-hidden className="h-3 w-3 shrink-0" style={{ fill: `#${def.hex}` }}>
      <path d={def.path} />
    </svg>
  )
}

const badgeClass =
  'font-mono text-xs font-normal gap-1.5 cursor-pointer hover:bg-foreground hover:text-background transition-colors'

export function TechBadge({ name }: { name: string }) {
  const url = TECH_LINKS[name]
  const inner = (
    <Badge variant="secondary" className={badgeClass}>
      <TechIcon name={name} />
      {name}
    </Badge>
  )

  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name} documentation, opens in new tab`}
      className="inline-flex items-center"
    >
      {inner}
    </a>
  ) : (
    inner
  )
}
