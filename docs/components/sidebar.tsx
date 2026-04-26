'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs/getting-started' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Theming', href: '/docs/theming' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Window', href: '/docs/components/window' },
      { title: 'Window Manager', href: '/docs/components/window-manager' },
      { title: 'Dock', href: '/docs/components/dock' },
      { title: 'Menu Bar', href: '/docs/components/menu-bar' },
      { title: 'Desktop Icon', href: '/docs/components/desktop-icon' },
    ],
  },
  {
    title: 'Contributing',
    items: [
      { title: 'Contributor Guide', href: '/docs/contributing' },
      { title: 'Component Template', href: '/docs/component-template' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-muted/40 p-6 overflow-y-auto">
      <div className="space-y-6">
        <Link href="/" className="block">
          <h2 className="text-lg font-semibold">macOS UI</h2>
        </Link>

        {navigation.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 text-sm rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}
