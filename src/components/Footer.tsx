export function Footer() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-muted-foreground font-mono">
          © {new Date().getFullYear()} Nitin Kumar R
        </p>
        <p className="text-xs text-muted-foreground">
          Built with Next.js & shadcn/ui
        </p>
      </div>
    </footer>
  )
}
