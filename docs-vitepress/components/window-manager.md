---
outline: deep
---

# WindowManager

The WindowManager system provides centralized state management for multiple windows. It consists of a `WindowManagerProvider` context provider and a `useWindowManager` hook.

## Installation

The WindowManager is included when you install the Window component:

```bash
npx macos-ui add window
```

## Import

```tsx
import { WindowManagerProvider, useWindowManager } from '@/components/window/window-manager'
```

## Setup

Wrap your application (or the portion that contains windows) with `WindowManagerProvider`:

```tsx
import { WindowManagerProvider } from '@/components/window/window-manager'

function App() {
  return (
    <WindowManagerProvider>
      {/* Your windows and other content */}
    </WindowManagerProvider>
  )
}
```

## `useWindowManager` Hook

Access the window manager from any component inside the provider:

```tsx
import { useWindowManager } from '@/components/window/window-manager'

function MyComponent() {
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager()

  // ...
}
```

::: warning
`useWindowManager` must be called within a `WindowManagerProvider`. Calling it outside will throw:
```
Error: useWindowManager must be used within a WindowManagerProvider
```
:::

## API Reference

### Properties

| Property | Type | Description |
|---|---|---|
| `windows` | `WindowState[]` | Array of all currently tracked windows and their state. |
| `activeWindowId` | `string \| null` | The `id` of the currently focused window, or `null` if no window is focused. |

### Methods

#### `openWindow(config: WindowConfig): string`

Opens a new window and returns its generated `id`.

```tsx
const windowId = openWindow({
  appId: 'finder',
  title: 'Finder',
  defaultPosition: { x: 200, y: 100 },
  defaultSize: { width: 700, height: 500 },
  content: <FinderContent />,
})
```

The new window is automatically focused. All other windows are unfocused.

#### `closeWindow(id: string): void`

Removes a window from the manager. The window is unmounted.

```tsx
closeWindow('window-123')
```

#### `focusWindow(id: string): void`

Brings a window to the front by assigning it the highest z-index and setting it as focused. All other windows are unfocused.

```tsx
focusWindow('window-123')
```

#### `minimizeWindow(id: string): void`

Hides a window. The window remains in state but is not rendered (`isMinimized: true`). The window is also unfocused.

```tsx
minimizeWindow('window-123')
```

#### `maximizeWindow(id: string): void`

Toggles a window's maximized state. When maximized, the window fills the viewport (minus menu bar height).

```tsx
maximizeWindow('window-123')
```

#### `restoreWindow(id: string): void`

Restores a minimized or maximized window to its normal state (`isMinimized: false`, `isMaximized: false`).

```tsx
restoreWindow('window-123')
```

#### `updateWindowPosition(id: string, position: Position): void`

Updates a window's position. Used internally by the Window component during drag, but can also be called programmatically.

```tsx
updateWindowPosition('window-123', { x: 300, y: 200 })
```

#### `updateWindowSize(id: string, size: Size): void`

Updates a window's size. Used internally during resize, but can also be called programmatically.

```tsx
updateWindowSize('window-123', { width: 800, height: 600 })
```

## Type Definitions

### `WindowConfig`

Configuration object passed to `openWindow`:

```ts
interface WindowConfig {
  appId: string
  title: string
  icon?: ComponentType<{ size?: number }>
  defaultPosition?: Position
  defaultSize?: Size
  minSize?: Size
  maxSize?: Size
  isResizable?: boolean
  isDraggable?: boolean
  content?: ReactNode
  data?: Record<string, unknown>
}
```

### `WindowState`

The complete state of a managed window:

```ts
interface WindowState {
  id: string
  appId: string
  title: string
  icon?: ComponentType<{ size?: number }>
  position: Position
  size: Size
  minSize?: Size
  maxSize?: Size
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  isFocused: boolean
  isResizable: boolean
  isDraggable: boolean
  content?: ReactNode
  data?: Record<string, unknown>
}
```

### `WindowManagerContextValue`

The full context value returned by `useWindowManager`:

```ts
interface WindowManagerContextValue {
  windows: WindowState[]
  activeWindowId: string | null
  openWindow: (config: WindowConfig) => string
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  updateWindowPosition: (id: string, position: Position) => void
  updateWindowSize: (id: string, size: Size) => void
}
```

## Z-Index Management

The WindowManager uses an incrementing z-index system starting at `1000`. Each time a window is opened or focused, it receives the next z-index value:

- Initial window: `z-index: 1000`
- Second window: `z-index: 1001`
- Focusing the first window: `z-index: 1002`

This ensures the most recently focused window is always on top, without needing to re-sort all windows.

## Example: Managing Multiple Windows

```tsx
import { WindowManagerProvider, useWindowManager } from '@/components/window/window-manager'
import { Window } from '@/components/window/window'

function Desktop() {
  const { windows, openWindow, closeWindow, restoreWindow } = useWindowManager()

  const handleOpenFinder = () => {
    openWindow({
      appId: 'finder',
      title: 'Finder',
      defaultPosition: { x: 100, y: 80 },
      defaultSize: { width: 700, height: 450 },
    })
  }

  const handleOpenNotes = () => {
    openWindow({
      appId: 'notes',
      title: 'Notes',
      defaultPosition: { x: 250, y: 120 },
      defaultSize: { width: 500, height: 400 },
    })
  }

  const minimizedWindows = windows.filter((w) => w.isMinimized)

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-blue-400 to-purple-500">
      {/* Toolbar */}
      <div className="flex gap-2 p-4">
        <button onClick={handleOpenFinder} className="px-3 py-1 bg-white/20 rounded text-white">
          Open Finder
        </button>
        <button onClick={handleOpenNotes} className="px-3 py-1 bg-white/20 rounded text-white">
          Open Notes
        </button>
      </div>

      {/* Render managed windows */}
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
            onClose={() => closeWindow(w.id)}
          >
            <div className="p-4">
              <p>Content for {w.title}</p>
            </div>
          </Window>
        ))}

      {/* Minimized windows indicator */}
      {minimizedWindows.length > 0 && (
        <div className="fixed bottom-4 left-4 flex gap-2">
          {minimizedWindows.map((w) => (
            <button
              key={w.id}
              onClick={() => restoreWindow(w.id)}
              className="px-3 py-1 bg-white/30 backdrop-blur rounded text-white text-sm"
            >
              {w.title}
            </button>
          ))}
        </div>
      )}
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
```

## See Also

- [Window](/components/window) — Individual window component props and features.
- [API Reference](/api/components) — Full type definitions.
