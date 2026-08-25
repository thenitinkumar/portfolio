import { ExternalLink } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { TechBadge } from '@/components/TechBadge'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section id="work" className="py-12 border-t border-border scroll-mt-20">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">Work</p>

      <div className="space-y-5">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 60}>
            <div className="group border border-border rounded-xl p-5 bg-card hover:border-foreground/30 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold">{p.title}</h3>
                    <span className="text-xs text-muted-foreground font-mono">{p.year}</span>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tags.map((t) => <TechBadge key={t} name={t} />)}
                  </div>
                </div>
                {(p.demo || p.github) && (
                  <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${p.title} source on GitHub, opens in new tab`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${p.title} demo, opens in new tab`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
