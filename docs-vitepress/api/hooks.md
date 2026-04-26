---
outline: deep
---

# Hooks API Reference

## `useWindowManager()`

Returns the WindowManager context value for managing window state.

```ts
function useWindowManager(): WindowManagerContextValue
```

::: warning
Must be called within a `WindowManagerProvider`. Throws an error if used outside the provider.
:::

### Return Type

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

### Properties

| Property | Type | Description |
|---|---|---|
| `windows` | `WindowState[]` | Array of all tracked windows and their current state. |
| `activeWindowId` | `string \| null` | ID of the focused window, or `null` if no window has focus. |

### Methods

#### `openWindow(config: WindowConfig): string`

Creates a new window and returns its auto-generated ID. The new window is automatically focused.

```ts
const id = openWindow({
  appId: 'notes',
  title: 'Notes',
  defaultPosition: { x: 200, y: 100 },
  defaultSize: { width: 500, height: 400 },
})
```

#### `closeWindow(id: string): void`

Removes a window from the manager. The window is unmounted.

```ts
closeWindow('window-1234')
```

#### `focusWindow(id: string): void`

Brings a window to the front and marks it as focused. All other windows lose focus.

```ts
focusWindow('window-1234')
```

#### `minimizeWindow(id: string): void`

Hides a window by setting `isMinimized: true`. The window is unfocused but remains in state.

```ts
minimizeWindow('window-1234')
```

#### `maximizeWindow(id: string): void`

Toggles the `isMaximized` state of a window.

```ts
maximizeWindow('window-1234')
```

#### `restoreWindow(id: string): void`

Restores a minimized or maximized window to its normal state (`isMinimized: false`, `isMaximized: false`).

```ts
restoreWindow('window-1234')
```

#### `updateWindowPosition(id: string, position: Position): void`

Sets the position of a window.

```ts
updateWindowPosition('window-1234', { x: 300, y: 200 })
```

#### `updateWindowSize(id: string, size: Size): void`

Sets the size of a window.

```ts
updateWindowSize('window-1234', { width: 800, height: 600 })
```

### Usage Example

```tsx
import { useWindowManager } from '@/components/window/window-manager'

function Toolbar() {
  const { openWindow, windows, closeWindow } = useWindowManager()

  return (
    <div className="flex gap-2">
      <button onClick={() => openWindow({ appId: 'finder', title: 'Finder' })}>
        Open Finder
      </button>
      <span>{windows.length} windows open</span>
      <button onClick={() => windows.forEach(w => closeWindow(w.id))}>
        Close All
      </button>
    </div>
  )
}
```

## See Also

- [WindowManager](/components/window-manager) — Provider setup and detailed usage.
- [Components API](/api/components) — `WindowConfig`, `WindowState` type definitions.
