---
outline: deep
---

# Example: Dashboard Layout

A dashboard layout combining MenuBar, multiple Windows, and a Dock. This example demonstrates how all the components work together.

## Prerequisites

```bash
npx macos-ui add window dock menu-bar
```

## Full Code

```tsx
// Dashboard.tsx
import React, { useState } from 'react'
import { WindowManagerProvider, useWindowManager } from '@/components/window/window-manager'
import { Window } from '@/components/window/window'
import { Dock } from '@/components/dock/dock'
import { MenuBar } from '@/components/menu-bar/menu-bar'
import type { DockItemConfig } from '@/components/dock/dock.types'
import type { MenuConfig } from '@/components/menu-bar/menu-bar.types'

// --- Icon Components ---
// In production, use a library like lucide-react

const ChartIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

const TableIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
)

const SettingsIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const MailIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
)

// --- Chart Widget ---

function ChartWidget() {
  const data = [65, 45, 80, 50, 70, 90, 55]
  const max = Math.max(...data)

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold mb-4">Weekly Revenue</h3>
      <div className="flex items-end gap-2 h-32">
        {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full bg-blue-500 rounded-t"
              style={{ height: `${(value / max) * 100}%` }}
            />
            <span className="text-xs text-gray-500">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- Table Widget ---

function TableWidget() {
  const rows = [
    { name: 'Alice Johnson', role: 'Engineer', status: 'Active' },
    { name: 'Bob Smith', role: 'Designer', status: 'Active' },
    { name: 'Carol White', role: 'Manager', status: 'Away' },
    { name: 'Dave Brown', role: 'Engineer', status: 'Active' },
  ]

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold mb-3">Team Members</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-medium">Name</th>
            <th className="text-left py-2 font-medium">Role</th>
            <th className="text-left py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b last:border-0">
              <td className="py-2">{row.name}</td>
              <td className="py-2 text-gray-600">{row.role}</td>
              <td className="py-2">
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// --- Clock Component ---

function Clock() {
  const [time, setTime] = useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="text-sm">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}

// --- Dashboard Content ---

function DashboardContent() {
  const { openWindow } = useWindowManager()

  const menus: MenuConfig[] = [
    {
      label: 'Dashboard',
      items: [
        { label: 'New Chart', shortcut: '⌘N', onClick: () => openWindow({
          appId: 'chart', title: 'Analytics', icon: ChartIcon,
          defaultPosition: { x: 200, y: 120 }, defaultSize: { width: 500, height: 300 },
        })},
        { label: 'New Table', shortcut: '⌘T', onClick: () => openWindow({
          appId: 'table', title: 'Data Table', icon: TableIcon,
          defaultPosition: { x: 250, y: 150 }, defaultSize: { width: 550, height: 350 },
        })},
        { label: '', divider: true },
        { label: 'Quit', shortcut: '⌘Q' },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Zoom In', shortcut: '⌘+' },
        { label: 'Zoom Out', shortcut: '⌘-' },
        { label: '', divider: true },
        { label: 'Full Screen', shortcut: '⌃⌘F' },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'Documentation', onClick: () => window.open('/') },
        { label: 'About' },
      ],
    },
  ]

  const dockItems: DockItemConfig[] = [
    {
      id: 'chart',
      icon: ChartIcon,
      label: 'Analytics',
      isRunning: true,
      onClick: () => openWindow({
        appId: 'chart', title: 'Analytics', icon: ChartIcon,
        defaultPosition: { x: 100, y: 80 }, defaultSize: { width: 500, height: 300 },
      }),
    },
    {
      id: 'table',
      icon: TableIcon,
      label: 'Data Table',
      onClick: () => openWindow({
        appId: 'table', title: 'Data Table', icon: TableIcon,
        defaultPosition: { x: 150, y: 100 }, defaultSize: { width: 550, height: 350 },
      }),
    },
    {
      id: 'mail',
      icon: MailIcon,
      label: 'Mail',
      badge: 3,
      onClick: () => openWindow({
        appId: 'mail', title: 'Mail', icon: MailIcon,
        defaultPosition: { x: 200, y: 120 }, defaultSize: { width: 600, height: 400 },
      }),
    },
    {
      id: 'settings',
      icon: SettingsIcon,
      label: 'Settings',
      onClick: () => openWindow({
        appId: 'settings', title: 'Settings', icon: SettingsIcon,
        defaultPosition: { x: 250, y: 140 }, defaultSize: { width: 450, height: 350 },
      }),
    },
  ]

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 overflow-hidden">
      {/* Menu Bar */}
      <MenuBar
        logo={<span className="font-bold text-white">Dashboard</span>}
        menus={menus}
        rightContent={
          <div className="flex items-center gap-4 text-white opacity-80">
            <span className="text-sm">100%</span>
            <Clock />
          </div>
        }
      />

      {/* Default Windows */}
      <Window
        id="chart-main"
        title="Analytics"
        icon={ChartIcon}
        defaultPosition={{ x: 80, y: 60 }}
        defaultSize={{ width: 520, height: 280 }}
      >
        <ChartWidget />
      </Window>

      <Window
        id="table-main"
        title="Team"
        icon={TableIcon}
        defaultPosition={{ x: 360, y: 180 }}
        defaultSize={{ width: 500, height: 320 }}
      >
        <TableWidget />
      </Window>

      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <Dock items={dockItems} magnification magnificationScale={1.5} />
      </div>
    </div>
  )
}

// --- App Entry Point ---

export default function Dashboard() {
  return (
    <WindowManagerProvider>
      <DashboardContent />
    </WindowManagerProvider>
  )
}
```

## What This Demonstrates

- **MenuBar** at the top with File/View/Help menus and a clock in the right status area.
- **Two pre-opened Windows** — an analytics chart and a team data table — that can be dragged, resized, minimized, and maximized.
- **Dock** at the bottom with four items, including running indicators and a badge on Mail.
- **Dynamic window creation** — clicking Dock items or using menu shortcuts opens new windows via `useWindowManager().openWindow()`.

## See Also

- [App Launcher Example](/examples/app-launcher) — macOS desktop with icons and windows.
- [Window](/components/window) — Window component reference.
- [Dock](/components/dock) — Dock component reference.
- [MenuBar](/components/menu-bar) — MenuBar component reference.
