import { ContribGraph } from '@/components/ContribGraph'
import { Reveal } from '@/components/Reveal'
import { RoleCycler } from '@/components/RoleCycler'

export function Hero() {
  return (
    <section className="pt-28 pb-12 overflow-hidden">
      <Reveal>
        <div data-hero-head className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-sm font-semibold font-mono shrink-0 tracking-tight">
            nk.
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Nitin Kumar R</h1>
            <RoleCycler />
          </div>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
          Building thoughtful enterprise software at{' '}
          <span className="text-foreground font-medium">Deloitte<span style={{ color: '#86BC25', fontSize: '1.3em', lineHeight: 1 }}>.</span></span> Passionate about clean
          architecture, developer experience, and products that actually ship.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <ContribGraph />
      </Reveal>
    </section>
  )
}
