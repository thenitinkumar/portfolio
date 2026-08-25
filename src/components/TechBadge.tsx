import { Badge } from '@/components/ui/badge'
import { TECH_LINKS } from '@/lib/tech-links'

export function TechBadge({ name }: { name: string }) {
  const url = TECH_LINKS[name]
  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name} documentation, opens in new tab`}
      className="inline-flex items-center"
    >
      <Badge variant="secondary" className="text-xs font-normal cursor-pointer hover:bg-foreground hover:text-background transition-colors">
        {name}
      </Badge>
    </a>
  ) : (
    <Badge variant="secondary" className="text-xs font-normal">
      {name}
    </Badge>
  )
}
