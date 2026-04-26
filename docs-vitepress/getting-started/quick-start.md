---
outline: deep
---

# Quick Start

Build a macOS-style desktop layout in 5 minutes.

## Step 1: Initialize the project

Run the init command in your React + Tailwind project:

```bash
npx macos-ui init -y
```

This creates `macos-ui.config.json`, adds the Tailwind preset, and copies the theme CSS.

## Step 2: Add the Window component

```bash
npx macos-ui add window
```

This copies the Window component, WindowManager, and the `cn()` utility into your project.

## Step 3: Use Window in your app

Create a simple window:

```tsx
// App.tsx
import { WindowManagerProvider } from './components/window/window-manager'
import { Window } from './components/window/window'

function App() {
  return (
    <WindowManagerProvider>
      <div className="relative h-screen w-screen bg-gradient-to-br from-blue-400 to-purple-500">
        <Window
          id="my-first-window"
          title="My First Window"
          defaultPosition={{ x: 100, y: 80 }}
          defaultSize={{ width: 500, height: 350 }}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Welcome</h2>
            <p className="text-gray-600">
              This is a draggable, resizable macOS-style window.
              Try dragging the title bar or clicking the traffic light buttons.
            </p>
          </div>
        </Window>
      </div>
    </WindowManagerProvider>
  )
}

export default App
```

You should see a window with:
- A title bar with **close** (red), **minimize** (yellow), and **maximize** (green) buttons.
- Drag support via the title bar.
- A resize handle in the bottom-right corner.

## Step 4: Add the Dock

Install the Dock component:

```bash
npx macos-ui add dock
```

Now add a Dock to your layout:

```tsx
// App.tsx
import { WindowManagerProvider } from './components/window/window-manager'
import { Window } from './components/window/window'
import { Dock } from './components/dock/dock'

// Simple icon components (replace with your own or use lucide-react)
const FileIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const SettingsIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const dockItems = [
  { id: 'finder', icon: FileIcon, label: 'Finder', isRunning: true, onClick: () => console.log('Finder') },
  { id: 'settings', icon: SettingsIcon, label: 'Settings', onClick: () => console.log('Settings') },
]

function App() {
  return (
    <WindowManagerProvider>
      <div className="relative h-screen w-screen bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
        {/* Window */}
        <Window
          id="my-window"
          title="Documents"
          defaultPosition={{ x: 120, y: 80 }}
          defaultSize={{ width: 500, height: 350 }}
        >
          <div className="p-4">
            <p className="text-gray-600">Your files will appear here.</p>
          </div>
        </Window>

        {/* Dock */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
          <Dock items={dockItems} magnification={true} magnificationScale={1.5} />
        </div>
      </div>
    </WindowManagerProvider>
  )
}

export default App
```

## Full Working Example

Here's a complete example combining Window, Dock, and MenuBar:

```bash
npx macos-ui add window dock menu-bar desktop-icon
```

```tsx
// App.tsx
import { WindowManagerProvider, useWindowManager } from './components/window/window-manager'
import { Window } from './components/window/window'
import { Dock } from './components/dock/dock'
import { MenuBar } from './components/menu-bar/menu-bar'

// Icon components (use lucide-react or your own SVGs in production)
const AppIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="4" opacity="0.8" />
  </svg>
)

function Desktop() {
  const { openWindow } = useWindowManager()

  const menus = [
    {
      label: 'File',
      items: [
        { label: 'New Window', shortcut: '⌘N', onClick: () => openWindow({ appId: 'new', title: 'Untitled' }) },
        { label: 'Close', shortcut: '⌘W', onClick: () => console.log('close') },
        { label: '', divider: true },
        { label: 'Quit', shortcut: '⌘Q', onClick: () => console.log('quit') },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z' },
        { label: 'Redo', shortcut: '⇧⌘Z' },
        { label: '', divider: true },
        { label: 'Cut', shortcut: '⌘X' },
        { label: 'Copy', shortcut: '⌘C' },
        { label: 'Paste', shortcut: '⌘V' },
      ],
    },
  ]

  const dockItems = [
    { id: 'finder', icon: AppIcon, label: 'Finder', isRunning: true, onClick: () => openWindow({ appId: 'finder', title: 'Finder' }) },
    { id: 'notes', icon: AppIcon, label: 'Notes', onClick: () => openWindow({ appId: 'notes', title: 'Notes' }) },
    { id: 'settings', icon: AppIcon, label: 'Settings', badge: 3, onClick: () => openWindow({ appId: 'settings', title: 'Settings' }) },
  ]

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
      {/* Menu Bar */}
      <MenuBar
        logo={<span className="text-lg">&#63743;</span>}
        menus={menus}
        rightContent={
          <span className="text-sm opacity-80">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        }
      />

      {/* Default Window */}
      <Window
        id="welcome"
        title="Welcome"
        defaultPosition={{ x: 150, y: 100 }}
        defaultSize={{ width: 480, height: 320 }}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold mb-2">Welcome to macOS UI</h1>
          <p className="text-gray-600">
            Click items in the Dock to open new windows. Use the menu bar to access commands.
          </p>
        </div>
      </Window>

      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <Dock items={dockItems} />
      </div>
    </div>
  )
}

function App() {
  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  )
}

export default App
```

## Next Steps

- [Window](/components/window) — All props, features, and accessibility details.
- [Dock](/components/dock) — Magnification, badges, and positioning.
- [MenuBar](/components/menu-bar) — Dropdown menus, submenus, and keyboard navigation.
- [DesktopIcon](/components/desktop-icon) — Clickable icons with selection state.
- [Theming](/guides/theming) — Customize colors, blur, shadows, and more.
- [Configuration](/getting-started/configuration) — Full configuration reference.
