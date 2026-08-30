'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Moon, Sun, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { GITHUB_USERNAME } from '@/data/config'

const HOME_SECTIONS = ['work', 'experience', 'writing', 'connect'] as const
const WORK_SECTIONS = ['work', 'experience'] as const
const DIRECT_HOME_SECTIONS = ['writing', 'connect'] as const
const STATS_SECTIONS = ['certifications'] as const

const WORK_LABELS: Record<typeof WORK_SECTIONS[number], string> = {
  work: 'projects',
  experience: 'experience',
}

const DIRECT_HOME_LABELS: Record<typeof DIRECT_HOME_SECTIONS[number], string> = {
  writing: 'writing',
  connect: 'connect',
}

const STATS_LABELS: Record<typeof STATS_SECTIONS[number], string> = {
  certifications: 'certifications',
}

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isStats = pathname === '/stats'

  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [workOpen, setWorkOpen] = useState(false)
  const [statsOpen, setStatsOpen] = useState(false)
  const lockedRef = useRef(false)
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const workLeaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const statsLeaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setActive(null) }, [pathname])

  useEffect(() => {
    const sectionsToObserve = isHome
      ? [...HOME_SECTIONS]
      : isStats
        ? [...STATS_SECTIONS]
        : []

    const observers: IntersectionObserver[] = []

    sectionsToObserve.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!lockedRef.current && entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-15% 0px -50% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    const onScroll = () => {
      if (lockedRef.current) return
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80
      if (nearBottom) setActive(isStats ? 'metrics' : 'connect')
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [isHome, isStats])

  function handleNavClick(id: string) {
    setActive(id)
    setWorkOpen(false)
    setStatsOpen(false)
    lockedRef.current = true
    if (lockTimer.current) clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => { lockedRef.current = false }, 1000)
  }

  const navLink = (isActive: boolean) =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'sm' }),
      'text-xs transition-colors',
      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    )

  const workActive = WORK_SECTIONS.includes(active as typeof WORK_SECTIONS[number])
  const statsActive = STATS_SECTIONS.includes(active as typeof STATS_SECTIONS[number]) || isStats

  const homeSectionHref = (id: string) => isHome ? `#${id}` : `/#${id}`
  const statsSectionHref = (id: string) => isStats ? `#${id}` : `/stats#${id}`

  return (
    <nav className="fixed top-0 inset-x-0 z-50 overflow-visible border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight hover:opacity-70 transition-opacity">
          nk.
        </Link>

        <div className="flex items-center gap-0.5">
          {/* Home */}
          <Link
            href="/"
            className={navLink(isHome && active === null)}
            onClick={() => setActive(null)}
          >
            home
          </Link>

          {/* Work dropdown */}
          <div
            className="relative"
            onMouseEnter={() => { clearTimeout(workLeaveTimer.current); setWorkOpen(true) }}
            onMouseLeave={() => { workLeaveTimer.current = setTimeout(() => setWorkOpen(false), 150) }}
          >
            <button
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'text-xs transition-colors gap-1',
                workActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              work
              <ChevronDown
                className={cn('h-3 w-3 transition-transform duration-200', workOpen && 'rotate-180')}
              />
            </button>

            {workOpen && (
              <div className="absolute left-0 top-full mt-0.5 w-fit rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-lg py-1 z-50 group/items">
                {WORK_SECTIONS.map(id => (
                  <Link
                    key={id}
                    href={homeSectionHref(id)}
                    className="flex items-center px-3 py-2 text-xs transition-all rounded-md mx-1 whitespace-nowrap text-muted-foreground hover:text-foreground group-hover/items:opacity-40 hover:opacity-100!"
                    onClick={() => handleNavClick(id)}
                  >
                    {WORK_LABELS[id]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct home sections (Blog, Connect) */}
          {DIRECT_HOME_SECTIONS.map(id => (
            <Link
              key={id}
              href={homeSectionHref(id)}
              aria-current={active === id ? 'true' : undefined}
              className={navLink(active === id)}
              onClick={() => handleNavClick(id)}
            >
              {DIRECT_HOME_LABELS[id]}
            </Link>
          ))}

          {/* Stats dropdown */}
          <div
            className="relative"
            onMouseEnter={() => { clearTimeout(statsLeaveTimer.current); setStatsOpen(true) }}
            onMouseLeave={() => { statsLeaveTimer.current = setTimeout(() => setStatsOpen(false), 150) }}
          >
            <button
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'text-xs transition-colors gap-1',
                statsActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              stats
              <ChevronDown
                className={cn('h-3 w-3 transition-transform duration-200', statsOpen && 'rotate-180')}
              />
            </button>

            {statsOpen && (
              <div className="absolute right-0 top-full mt-0.5 w-fit rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-lg py-1 z-50 group/items">
                {STATS_SECTIONS.map(id => (
                  <Link
                    key={id}
                    href={statsSectionHref(id)}
                    className="flex items-center px-3 py-2 text-xs transition-all rounded-md mx-1 whitespace-nowrap text-muted-foreground hover:text-foreground group-hover/items:opacity-40 hover:opacity-100!"
                    onClick={() => handleNavClick(id)}
                  >
                    {STATS_LABELS[id]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile, opens in new tab"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'ml-1 text-muted-foreground hover:text-foreground')}
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          {mounted ? (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          ) : (
            <Button variant="ghost" size="icon" aria-hidden className="opacity-0" tabIndex={-1}>
              <Moon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
