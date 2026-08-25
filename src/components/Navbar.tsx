'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { GITHUB_USERNAME } from '@/data/config'

const NAV_SECTIONS = ['work', 'experience', 'blog', 'connect'] as const

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    NAV_SECTIONS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

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
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
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
