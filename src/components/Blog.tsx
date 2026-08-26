'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Reveal } from '@/components/Reveal'
import { MEDIUM_USERNAME } from '@/data/config'

interface MediumPost {
  title: string
  link: string
  pubDate: string
  description: string
  content: string
  thumbnail: string
  readTime: string // pre-computed
}

interface RawMediumPost {
  title: string
  link: string
  pubDate: string
  description: string
  content: string
  thumbnail: string
}

interface Rss2JsonResponse {
  status: string
  items: RawMediumPost[]
}

const FEED_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`
const PREVIEW_W = 360

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
}

function excerpt(description: string, max = 100): string {
  const text = stripHtml(description)
  if (text.length <= max) return text
  const cut = text.lastIndexOf(' ', max)
  return text.slice(0, cut > 0 ? cut : max) + '…'
}

function computeReadTime(content: string): string {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 225))} min read`
}

function formatDate(pubDate: string): string {
  return new Date(pubDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  )
}

export function Blog() {
  const [posts, setPosts] = useState<MediumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  // Use ref for preview position to avoid re-renders on every mousemove
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    fetch(FEED_URL)
      .then(r => r.json())
      .then((data: Rss2JsonResponse) => {
        if (data.status === 'ok' && data.items?.length) {
          setPosts(
            data.items.slice(0, 5).reverse().map(p => ({
              ...p,
              readTime: computeReadTime(p.content || p.description),
            }))
          )
        } else {
          setError(true)
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  function onMouseMove(e: React.MouseEvent) {
    if (!previewRef.current) return
    const vw = window.innerWidth
    const vh = window.innerHeight
    const rawX = e.clientX + 24
    const x = rawX + PREVIEW_W > vw - 16 ? e.clientX - PREVIEW_W - 24 : rawX
    const y = Math.min(e.clientY - 60, vh - 240)
    previewRef.current.style.left = `${x}px`
    previewRef.current.style.top = `${y}px`
  }

  const hoveredPost = hovered !== null ? posts[hovered] : null

  return (
    <section id="writing" className="py-12 border-t border-border scroll-mt-20">
      <div className="flex items-center justify-between mb-6">
        <p className="font-heading italic text-2xl text-muted-foreground">writing.</p>
        <a
          href={`https://medium.com/@${MEDIUM_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <MediumIcon className="h-3.5 w-3.5" />
          All posts ↗
        </a>
      </div>

      <div>
        {loading && Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-border animate-pulse">
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-3 bg-muted rounded w-20" />
          </div>
        ))}

        {!loading && error && (
          <p className="text-sm text-muted-foreground">
            Couldn&apos;t load posts right now.{' '}
            <a
              href={`https://medium.com/@${MEDIUM_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Read on Medium ↗
            </a>
          </p>
        )}

        {!loading && !error && (
        <div className="group/list">
        {posts.map((post, i) => (
          <Reveal key={post.link} delay={i * 50}>
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 py-4 border-b border-border last:border-0 transition-opacity group-hover/list:opacity-40 hover:opacity-100!"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onMouseMove={onMouseMove}
            >
              <span className="text-base font-medium">{post.title}</span>
              <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground font-mono">
                <span>{formatDate(post.pubDate)}</span>
                <span className="hidden sm:inline">{post.readTime}</span>
              </div>
            </a>
          </Reveal>
        ))}
        </div>
        )}
      </div>

      {/* Floating Medium-style preview card — direct DOM positioning via ref (no re-render on mousemove) */}
      {mounted && createPortal(
        <div
          ref={previewRef}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: PREVIEW_W,
            zIndex: 9999,
            pointerEvents: 'none',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 12px 48px rgba(0,0,0,0.22)',
            border: '1px solid rgba(128,128,128,0.12)',
            background: 'var(--card)',
            transition: 'opacity 120ms ease',
            opacity: hoveredPost ? 1 : 0,
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
          }}
        >
          {hoveredPost && (
            <div style={{ padding: '16px 16px 12px' }}>
              {/* Author line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'var(--muted)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 600, color: 'var(--muted-foreground)', flexShrink: 0,
                }}>
                  NK
                </div>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
                  Nitin Kumar · {formatDate(hoveredPost.pubDate)}
                </span>
              </div>

              {/* Title + thumbnail */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    margin: '0 0 6px', fontSize: 15, fontWeight: 700,
                    color: 'var(--foreground)', lineHeight: 1.35,
                    display: '-webkit-box', WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {hoveredPost.title}
                  </p>
                  <p style={{
                    margin: 0, fontSize: 12, color: 'var(--muted-foreground)',
                    lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {excerpt(hoveredPost.description, 140)}
                  </p>
                </div>
                {hoveredPost.thumbnail && (
                  <img
                    src={hoveredPost.thumbnail}
                    alt=""
                    style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
                  />
                )}
              </div>

              <p style={{ margin: '10px 0 0', fontSize: 11, color: 'var(--muted-foreground)' }}>
                {hoveredPost.readTime}
              </p>
            </div>
          )}
        </div>,
        document.body
      )}
    </section>
  )
}
