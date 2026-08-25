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

        <p className="text-base text-muted-foreground leading-relaxed mb-5 max-w-lg">
          Building thoughtful enterprise software at{' '}
          <span className="text-foreground font-medium">Deloitte<span style={{ color: '#86BC25', fontSize: '1.3em', lineHeight: 1 }}>.</span></span> Passionate about clean
          architecture, developer experience, and products that actually ship.
        </p>

        <a
          href="#connect"
          className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Open to new opportunities
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </Reveal>

      <Reveal delay={80}>
        <ContribGraph />
      </Reveal>
    </section>
  )
}
