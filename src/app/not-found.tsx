import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">404</p>
      <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
      <p className="text-muted-foreground text-sm mb-8">
        This page doesn&apos;t exist — or maybe it moved.
      </p>
      <Link href="/" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        ← Back home
      </Link>
    </div>
  )
}
