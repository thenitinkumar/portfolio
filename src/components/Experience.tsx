import { Reveal } from '@/components/Reveal'
import { TechBadge } from '@/components/TechBadge'
import { jobs } from '@/data/experience'

export function Experience() {
  return (
    <section id="experience" className="py-12 border-t border-border scroll-mt-20">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">Experience</p>

      <div className="space-y-8">
        {jobs.map((job, i) => (
          <Reveal key={job.company} delay={i * 70}>
            <div className="grid grid-cols-[1fr_auto] gap-4">
              <div className="border-l-2 border-border pl-4 space-y-2 transition-colors hover:border-foreground/30">
                <div>
                  <h3 className="text-base font-semibold">{job.company}</h3>
                  <p className="text-base text-muted-foreground">{job.role}</p>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">{job.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.map((t) => <TechBadge key={t} name={t} />)}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-mono text-muted-foreground whitespace-nowrap">{job.period}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{job.location}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
