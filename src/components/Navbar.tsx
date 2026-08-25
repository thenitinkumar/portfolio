'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { GITHUB_USERNAME } from '@/data/config'

const NAV_SECTIONS = ['work', 'experience', 'blog', 'connect'] as const

const NAV_LABELS: Record<typeof NAV_SECTIONS[number], string> = {
  work: 'Projects',
  experience: 'Experience',
  blog: 'Blog',
  connect: 'Connect',
}

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const lockedRef = useRef(false)
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    NAV_SECTIONS.forEach(id => {
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
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80
      if (nearBottom) setActive('connect')
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function handleNavClick(id: string) {
    setActive(id)
    lockedRef.current = true
    if (lockTimer.current) clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => { lockedRef.current = false }, 1000)
  }

  const navLink = (id: string) =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'sm' }),
      'text-xs transition-colors',
      active === id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    )

  return (
    <nav className="fixed top-0 inset-x-0 z-50 overflow-hidden border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight hover:opacity-70 transition-opacity">
          nk.
        </Link>

        <div className="flex items-center gap-0.5">
          {NAV_SECTIONS.map(id => (
            <Link
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={navLink(id)}
              onClick={() => handleNavClick(id)}
            >
              {NAV_LABELS[id]}
            </Link>
          ))}

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
