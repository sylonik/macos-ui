---
outline: deep
---

# Window

A draggable, resizable macOS-style window component with traffic light buttons (close, minimize, maximize), focus management, and keyboard accessibility.

## Installation

```bash
npx macos-ui add window
```

This installs the `Window` component, `WindowManagerProvider`, `useWindowManager` hook, and the `cn()` utility.

## Import

```tsx
import { Window } from '@/components/window/window'
import { WindowManagerProvider, useWindowManager } from '@/components/window/window-manager'
```

## Basic Usage

The Window component must be rendered inside a `WindowManagerProvider`:

```tsx
import { WindowManagerProvider } from '@/components/window/window-manager'
import { Window } from '@/components/window/window'

function App() {
  return (
    <WindowManagerProvider>
      <div className="relative h-screen w-screen">
        <Window id="main" title="My Window">
          <div className="p-4">
            <p>Window content goes here.</p>
          </div>
        </Window>
      </div>
    </WindowManagerProvider>
  )
}
```

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `id` | `string` | — | Yes | Unique identifier for the window. Used by WindowManager for state tracking. |
| `title` | `string` | — | Yes | Text displayed in the window title bar. |
| `icon` | `ComponentType<{ size?: number }>` | — | No | Icon component rendered next to the title in the title bar. |
| `children` | `ReactNode` | — | Yes | Content rendered inside the window body. |
| `defaultPosition` | `Position` | `{ x: 100, y: 100 }` | No | Initial position of the window in pixels. |
| `defaultSize` | `Size` | `{ width: 600, height: 400 }` | No | Initial size of the window in pixels. |
| `minSize` | `Size` | `{ width: 200, height: 150 }` | No | Minimum allowed dimensions when resizing. |
| `maxSize` | `Size` | — | No | Maximum allowed dimensions when resizing. |
| `isResizable` | `boolean` | `true` | No | Whether the window can be resized via the bottom-right handle. |
| `isDraggable` | `boolean` | `true` | No | Whether the window can be dragged by the title bar. |
| `onClose` | `() => void` | — | No | Callback fired when the close (red) button is clicked. |
| `onMinimize` | `() => void` | — | No | Callback fired when the minimize (yellow) button is clicked. |
| `onMaximize` | `() => void` | — | No | Callback fired when the maximize (green) button is clicked. |
| `onFocus` | `() => void` | — | No | Callback fired when the window receives focus (click anywhere on window). |

### Type Definitions

```ts
interface Position {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}
```

## Features

### Traffic Light Buttons

Every window has three buttons in the title bar, matching macOS styling:

- **Close** (red) — Calls `onClose` and removes the window via WindowManager.
- **Minimize** (yellow) — Calls `onMinimize` and hides the window. The window can be restored via `restoreWindow()`.
- **Maximize** (green) — Toggles between maximized (fills viewport minus menu bar) and the previous size/position.

### Dragging

When `isDraggable` is `true` (default), users can drag the window by clicking and dragging the title bar. Dragging is disabled when the window is maximized.

### Resizing

When `isResizable` is `true` (default), a resize handle appears in the bottom-right corner. The window respects `minSize` and `maxSize` constraints. Resizing is disabled when the window is maximized.

### Focus Management

Clicking anywhere on a window brings it to the front (highest z-index). The focused window has a visually distinct title bar and stronger shadow. Focus state is managed by the WindowManager.

### Keyboard Accessibility

- **Tab** cycles focus through interactive elements within the window (focus trap when window is focused).
- **Escape** — bind to `onClose` for keyboard-accessible dismissal.
- All traffic light buttons are proper `<button>` elements with `aria-label` attributes.

## Examples

### Window with Icon

```tsx
const FileIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

<Window id="files" title="Documents" icon={FileIcon}>
  <div className="p-4">
    <p>File browser content</p>
  </div>
</Window>
```

### Non-Resizable Window

```tsx
<Window
  id="dialog"
  title="Confirmation"
  isResizable={false}
  defaultSize={{ width: 400, height: 200 }}
>
  <div className="p-4 text-center">
    <p>Are you sure you want to continue?</p>
    <div className="mt-4 flex gap-2 justify-center">
      <button className="px-4 py-1 bg-blue-500 text-white rounded">OK</button>
      <button className="px-4 py-1 bg-gray-200 rounded">Cancel</button>
    </div>
  </div>
</Window>
```

### Custom Sized Window

```tsx
<Window
  id="large"
  title="Full Editor"
  defaultPosition={{ x: 50, y: 50 }}
  defaultSize={{ width: 900, height: 600 }}
  minSize={{ width: 400, height: 300 }}
  maxSize={{ width: 1200, height: 800 }}
>
  <div className="p-4">
    <textarea className="w-full h-full resize-none" placeholder="Start typing..." />
  </div>
</Window>
```

### Window with Callbacks

```tsx
<Window
  id="callbacks"
  title="Interactive"
  onClose={() => console.log('Window closed')}
  onMinimize={() => console.log('Window minimized')}
  onMaximize={() => console.log('Window maximized')}
  onFocus={() => console.log('Window focused')}
>
  <div className="p-4">
    <p>Check the console for callback output.</p>
  </div>
</Window>
```

## Accessibility

The Window component implements the following accessibility features:

| Attribute | Value | Description |
|---|---|---|
| `role` | `"dialog"` | Identifies the window as a dialog to assistive technologies. |
| `aria-modal` | `"true"` | Indicates the window is modal (traps focus when focused). |
| `aria-labelledby` | `"window-title-{id}"` | Associates the window with its title for screen readers. |

### Traffic Light Buttons

Each button has a descriptive `aria-label`:
- Close button: `"Close window"`
- Minimize button: `"Minimize window"`
- Maximize button: `"Maximize window"`

### Keyboard Navigation

| Key | Action |
|---|---|
| `Tab` | Cycles focus forward through focusable elements within the window. |
| `Shift + Tab` | Cycles focus backward through focusable elements. |
| `Escape` | Can be bound to `onClose` for keyboard dismissal. |

### Focus Trapping

When a window is focused, Tab/Shift+Tab navigation wraps within the window. This prevents users from accidentally tabbing out to elements behind the window.

## See Also

- [WindowManager](/components/window-manager) — Manage multiple windows programmatically.
- [Dashboard Example](/examples/dashboard) — Full layout combining Window with Dock and MenuBar.
