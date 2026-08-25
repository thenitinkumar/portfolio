import { Badge } from '@/components/ui/badge'
import { TECH_LINKS } from '@/lib/tech-links'
import { TECH_ICONS } from '@/lib/tech-icons'

// Brands whose official color is black/near-black — use currentColor so they're
// visible in both light and dark themes.
const CURRENT_COLOR_HEXES = new Set(['000000', '0a0a0a', '010101'])

function TechIcon({ name }: { name: string }) {
  const def = TECH_ICONS[name]
  if (!def) return null
  const fill = CURRENT_COLOR_HEXES.has(def.hex.toLowerCase())
    ? 'currentColor'
    : `#${def.hex}`
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-hidden
      className="h-3 w-3 shrink-0"
      style={{ fill }}
    >
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
