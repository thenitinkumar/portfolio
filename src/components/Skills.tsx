import { Reveal } from '@/components/Reveal'
import { TechBadge } from '@/components/TechBadge'
import { skillGroups } from '@/data/skills'

export function Skills() {
  return (
    <section id="skills" className="py-12 border-t border-border scroll-mt-20">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">Skills</p>

      <Reveal>
        <div className="space-y-4">
          {skillGroups.map((group) => (
            <div key={group.label} className="grid grid-cols-[100px_1fr] gap-4 items-start">
              <p className="font-mono text-sm text-muted-foreground pt-0.5 leading-relaxed whitespace-nowrap">{group.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s) => <TechBadge key={s} name={s} />)}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
