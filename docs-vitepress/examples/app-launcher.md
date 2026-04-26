---
outline: deep
---

# Example: App Launcher (macOS Desktop)

A full macOS-style desktop experience with a MenuBar at the top, DesktopIcons on the "desktop" area, a Dock at the bottom, and Windows that open when icons are double-clicked.

## Prerequisites

```bash
npx macos-ui add window dock menu-bar desktop-icon
```

## Full Code

```tsx
// MacDesktop.tsx
import React, { useState, useCallback } from 'react'
import { WindowManagerProvider, useWindowManager } from '@/components/window/window-manager'
import { Window } from '@/components/window/window'
import { Dock } from '@/components/dock/dock'
import { MenuBar } from '@/components/menu-bar/menu-bar'
import { DesktopIcon } from '@/components/desktop-icon/desktop-icon'
import type { DockItemConfig } from '@/components/dock/dock.types'
import type { MenuConfig } from '@/components/menu-bar/menu-bar.types'

// --- Icon Components ---

const FolderIcon = ({ size = 48, color = '#3B82F6' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity="0.9">
    <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
  </svg>
)

const ImageIcon = ({ size = 48, color = '#10B981' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
)

const TerminalIcon = ({ size = 48, color = '#6366F1' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="6 9 10 12 6 15" />
    <line x1="12" y1="15" x2="18" y2="15" />
  </svg>
)

const NoteIcon = ({ size = 48, color = '#F59E0B' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

const TrashIcon = ({ size = 48, color = '#6B7280' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const GlobeIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

// --- App content components ---

function FinderContent() {
  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 bg-gray-100 rounded text-sm">All Files</button>
        <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm">Recent</button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {['Report.pdf', 'Budget.xlsx', 'Photo.jpg', 'Notes.txt', 'Backup.zip', 'README.md'].map(name => (
          <div key={name} className="flex flex-col items-center gap-1 p-2 rounded hover:bg-gray-50 cursor-pointer">
            <div className="w-8 h-8 bg-gray-200 rounded" />
            <span className="text-xs text-center truncate w-full">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TerminalContent() {
  return (
    <div className="bg-gray-900 text-green-400 font-mono text-sm p-4 h-full">
      <p>Last login: {new Date().toLocaleDateString()}</p>
      <p className="mt-1">user@mac ~ % <span className="animate-pulse">_</span></p>
    </div>
  )
}

function NotesContent() {
  return (
    <div className="p-4">
      <textarea
        className="w-full h-full resize-none border-0 outline-none text-sm"
        placeholder="Start typing your notes..."
        defaultValue="Shopping list:\n- Apples\n- Bread\n- Coffee"
      />
    </div>
  )
}

function PhotosContent() {
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold mb-3">Photos</h3>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="aspect-square rounded bg-gradient-to-br from-blue-200 to-purple-200"
          />
        ))}
      </div>
    </div>
  )
}

// --- Clock ---

function Clock() {
  const [time, setTime] = useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="text-sm">
      {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}{' '}
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}

// --- Desktop ---

interface AppDefinition {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; color?: string }>
  color: string
  content: React.ReactNode
  defaultSize?: { width: number; height: number }
}

const apps: AppDefinition[] = [
  { id: 'documents', label: 'Documents', icon: FolderIcon, color: '#3B82F6', content: <FinderContent />, defaultSize: { width: 600, height: 400 } },
  { id: 'pictures', label: 'Pictures', icon: ImageIcon, color: '#10B981', content: <PhotosContent />, defaultSize: { width: 500, height: 400 } },
  { id: 'terminal', label: 'Terminal', icon: TerminalIcon, color: '#6366F1', content: <TerminalContent />, defaultSize: { width: 600, height: 350 } },
  { id: 'notes', label: 'Notes', icon: NoteIcon, color: '#F59E0B', content: <NotesContent />, defaultSize: { width: 400, height: 350 } },
  { id: 'trash', label: 'Trash', icon: TrashIcon, color: '#6B7280', content: <div className="p-4 text-gray-400 text-center">Trash is empty</div> },
]

function DesktopArea() {
  const { openWindow, windows } = useWindowManager()
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  const handleOpenApp = useCallback((app: AppDefinition) => {
    const offset = windows.length * 30
    openWindow({
      appId: app.id,
      title: app.label,
      icon: app.icon,
      defaultPosition: { x: 120 + offset, y: 80 + offset },
      defaultSize: app.defaultSize ?? { width: 500, height: 350 },
      content: app.content,
    })
  }, [openWindow, windows.length])

  const menus: MenuConfig[] = [
    {
      label: 'Finder',
      items: [
        { label: 'About This Mac' },
        { label: '', divider: true },
        { label: 'System Preferences', onClick: () => console.log('prefs') },
        { label: '', divider: true },
        { label: 'Force Quit...', shortcut: '⌥⌘Esc' },
        { label: '', divider: true },
        { label: 'Sleep' },
        { label: 'Restart...' },
        { label: 'Shut Down...' },
      ],
    },
    {
      label: 'File',
      items: [
        { label: 'New Finder Window', shortcut: '⌘N', onClick: () => handleOpenApp(apps[0]) },
        { label: 'New Folder', shortcut: '⇧⌘N' },
        { label: '', divider: true },
        { label: 'Get Info', shortcut: '⌘I' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z', disabled: true },
        { label: 'Redo', shortcut: '⇧⌘Z', disabled: true },
        { label: '', divider: true },
        { label: 'Cut', shortcut: '⌘X' },
        { label: 'Copy', shortcut: '⌘C' },
        { label: 'Paste', shortcut: '⌘V' },
        { label: 'Select All', shortcut: '⌘A' },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'as Icons', shortcut: '⌘1' },
        { label: 'as List', shortcut: '⌘2' },
        { label: 'as Columns', shortcut: '⌘3' },
      ],
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', shortcut: '⌘M' },
        { label: 'Zoom' },
        { label: '', divider: true },
        { label: 'Bring All to Front' },
      ],
    },
  ]

  const dockItems: DockItemConfig[] = [
    { id: 'finder', icon: FolderIcon, label: 'Finder', isRunning: true, onClick: () => handleOpenApp(apps[0]) },
    { id: 'terminal', icon: TerminalIcon, label: 'Terminal', onClick: () => handleOpenApp(apps[2]) },
    { id: 'notes', icon: NoteIcon, label: 'Notes', onClick: () => handleOpenApp(apps[3]) },
    { id: 'safari', icon: GlobeIcon, label: 'Safari', badge: 2, onClick: () => console.log('Safari') },
  ]

  const runningAppIds = new Set(windows.map(w => w.appId))
  const dockItemsWithRunning = dockItems.map(item => ({
    ...item,
    isRunning: item.isRunning || runningAppIds.has(item.id),
  }))

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Desktop wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600" />

      {/* Menu Bar */}
      <div className="relative z-50">
        <MenuBar
          logo={<span className="font-bold text-white">&#63743;</span>}
          menus={menus}
          rightContent={
            <div className="flex items-center gap-3 text-white opacity-80">
              <span className="text-sm">100%</span>
              <span className="text-sm">Wi-Fi</span>
              <Clock />
            </div>
          }
        />
      </div>

      {/* Desktop Icons */}
      <div
        className="relative z-10 p-6 grid grid-cols-1 gap-2 w-fit"
        style={{ paddingTop: '3rem' }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedIcon(null)
        }}
      >
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={app.icon}
            label={app.label}
            color={app.color}
            selected={selectedIcon === app.id}
            onClick={() => setSelectedIcon(app.id)}
            onDoubleClick={() => handleOpenApp(app)}
          />
        ))}
      </div>

      {/* Windows (rendered by WindowManager) */}
      <div className="relative z-20">
        {windows
          .filter((w) => !w.isMinimized)
          .map((w) => (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              icon={w.icon}
              defaultPosition={w.position}
              defaultSize={w.size}
            >
              {w.content ?? (
                <div className="p-4 text-gray-500">
                  <p>{w.title} content</p>
                </div>
              )}
            </Window>
          ))}
      </div>

      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <Dock items={dockItemsWithRunning} magnification magnificationScale={1.5} />
      </div>
    </div>
  )
}

// --- App Entry Point ---

export default function MacDesktop() {
  return (
    <WindowManagerProvider>
      <DesktopArea />
    </WindowManagerProvider>
  )
}
```

## What This Demonstrates

- **MenuBar** with realistic macOS menus (Finder, File, Edit, View, Window) and a status area showing battery, Wi-Fi, and clock.
- **DesktopIcons** arranged in a column on the left side of the desktop. Single click selects, double click opens a window.
- **Dock** at the bottom that reflects running app state — apps with open windows show a running indicator dot.
- **WindowManager** handles all window lifecycle: opening from icons or dock, dragging, resizing, minimizing, maximizing, focus stacking.
- **Offset positioning** — each new window opens slightly offset from the previous one so windows cascade.

## Customization Ideas

- Add drag-and-drop to rearrange desktop icons.
- Implement a right-click context menu on the desktop.
- Add wallpaper selection via System Preferences.
- Add a Spotlight-style search bar triggered by a keyboard shortcut.
- Save window positions to `localStorage` and restore them on page load.

## See Also

- [Dashboard Example](/examples/dashboard) — Simpler layout with chart and table widgets.
- [DesktopIcon](/components/desktop-icon) — Icon component reference.
- [WindowManager](/components/window-manager) — Programmatic window management.
