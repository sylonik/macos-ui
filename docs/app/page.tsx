import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            macOS UI Component Library
          </h1>
          <p className="text-xl text-muted-foreground">
            Beautiful macOS-style React components. Copy, paste, and customize.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs/components/window"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            Browse Components
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="space-y-2 p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold">Copy & Paste</h3>
            <p className="text-sm text-muted-foreground">
              Components are copied directly into your project. Full ownership and customization.
            </p>
          </div>
          <div className="space-y-2 p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold">TypeScript First</h3>
            <p className="text-sm text-muted-foreground">
              Built with TypeScript for excellent IDE support and type safety.
            </p>
          </div>
          <div className="space-y-2 p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold">Accessible</h3>
            <p className="text-sm text-muted-foreground">
              Components follow accessibility best practices with proper ARIA attributes.
            </p>
          </div>
        </div>

        <div className="pt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Quick Start</h2>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <div className="space-y-2">
              <div>$ npx @sylonik/macos-ui init</div>
              <div>$ npx @sylonik/macos-ui add window</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
