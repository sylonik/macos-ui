import Link from 'next/link'
import { Github } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-8">
        <div className="flex-1" />
        <nav className="flex items-center gap-4">
          <Link
            href="/docs/getting-started"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="/docs/components/window"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Components
          </Link>
          <Link
            href="https://github.com/sylonik/macos-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
