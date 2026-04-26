---
outline: deep
---

# Components API Reference

Complete TypeScript interface definitions for all components.

## Window

### `WindowProps`

```ts
interface WindowProps {
  /** Unique identifier for the window */
  id: string
  /** Text displayed in the window title bar */
  title: string
  /** Icon component rendered next to the title */
  icon?: ComponentType<{ size?: number }>
  /** Content rendered inside the window body */
  children: ReactNode
  /** Initial position of the window in pixels */
  defaultPosition?: Position
  /** Initial size of the window in pixels */
  defaultSize?: Size
  /** Minimum allowed dimensions when resizing */
  minSize?: Size
  /** Maximum allowed dimensions when resizing */
  maxSize?: Size
  /** Whether the window can be resized (default: true) */
  isResizable?: boolean
  /** Whether the window can be dragged (default: true) */
  isDraggable?: boolean
  /** Callback fired when the close button is clicked */
  onClose?: () => void
  /** Callback fired when the minimize button is clicked */
  onMinimize?: () => void
  /** Callback fired when the maximize button is clicked */
  onMaximize?: () => void
  /** Callback fired when the window receives focus */
  onFocus?: () => void
}
```

### `Position`

```ts
interface Position {
  x: number
  y: number
}
```

### `Size`

```ts
interface Size {
  width: number
  height: number
}
```

### `WindowConfig`

Configuration for creating a new window via `openWindow()`:

```ts
interface WindowConfig {
  /** Application identifier (groups windows by app) */
  appId: string
  /** Window title displayed in the title bar */
  title: string
  /** Icon component for the title bar */
  icon?: ComponentType<{ size?: number }>
  /** Initial position */
  defaultPosition?: Position
  /** Initial size */
  defaultSize?: Size
  /** Minimum size constraints */
  minSize?: Size
  /** Maximum size constraints */
  maxSize?: Size
  /** Whether the window is resizable (default: true) */
  isResizable?: boolean
  /** Whether the window is draggable (default: true) */
  isDraggable?: boolean
  /** React content to render inside the window */
  content?: ReactNode
  /** Arbitrary data attached to the window state */
  data?: Record<string, unknown>
}
```

### `WindowState`

Complete state of a managed window:

```ts
interface WindowState {
  /** Unique window identifier (auto-generated) */
  id: string
  /** Application identifier */
  appId: string
  /** Window title */
  title: string
  /** Icon component */
  icon?: ComponentType<{ size?: number }>
  /** Current position */
  position: Position
  /** Current size */
  size: Size
  /** Minimum size constraints */
  minSize?: Size
  /** Maximum size constraints */
  maxSize?: Size
  /** Current z-index for stacking order */
  zIndex: number
  /** Whether the window is minimized (hidden) */
  isMinimized: boolean
  /** Whether the window is maximized (fills viewport) */
  isMaximized: boolean
  /** Whether the window currently has focus */
  isFocused: boolean
  /** Whether the window can be resized */
  isResizable: boolean
  /** Whether the window can be dragged */
  isDraggable: boolean
  /** React content rendered inside the window */
  content?: ReactNode
  /** Arbitrary data attached to the window */
  data?: Record<string, unknown>
}
```

### `WindowManagerContextValue`

The context value returned by `useWindowManager()`:

```ts
interface WindowManagerContextValue {
  /** Array of all currently tracked windows */
  windows: WindowState[]
  /** ID of the currently focused window, or null */
  activeWindowId: string | null
  /** Open a new window and return its generated ID */
  openWindow: (config: WindowConfig) => string
  /** Close and remove a window */
  closeWindow: (id: string) => void
  /** Bring a window to the front and focus it */
  focusWindow: (id: string) => void
  /** Minimize (hide) a window */
  minimizeWindow: (id: string) => void
  /** Toggle maximize state of a window */
  maximizeWindow: (id: string) => void
  /** Restore a minimized/maximized window to normal state */
  restoreWindow: (id: string) => void
  /** Update a window's position */
  updateWindowPosition: (id: string, position: Position) => void
  /** Update a window's size */
  updateWindowSize: (id: string, size: Size) => void
}
```

---

## Dock

### `DockProps`

```ts
interface DockProps {
  /** Array of dock items to display */
  items: DockItemConfig[]
  /** Position of the dock on screen */
  position?: 'bottom' | 'left' | 'right'
  /** Whether items magnify on mouse proximity (default: true) */
  magnification?: boolean
  /** Maximum scale factor for magnification (default: 1.5) */
  magnificationScale?: number
  /** Whether the dock auto-hides when mouse moves away */
  autoHide?: boolean
  /** Additional CSS classes */
  className?: string
}
```

### `DockItemConfig`

```ts
interface DockItemConfig {
  /** Unique identifier for the dock item */
  id: string
  /** Icon component to render */
  icon: ComponentType<{ size?: number }>
  /** Tooltip label and aria-label */
  label: string
  /** Icon color (default: 'currentColor') */
  color?: string
  /** Click handler */
  onClick?: () => void
  /** Shows a running indicator dot below the icon */
  isRunning?: boolean
  /** Badge displayed in the top-right corner */
  badge?: number | string
}
```

---

## MenuBar

### `MenuBarProps`

```ts
interface MenuBarProps {
  /** Content rendered at the far left (e.g., app logo) */
  logo?: ReactNode
  /** Array of dropdown menus */
  menus?: MenuConfig[]
  /** Content rendered on the right side (e.g., clock, status) */
  rightContent?: ReactNode
  /** Additional CSS classes */
  className?: string
}
```

### `MenuConfig`

```ts
interface MenuConfig {
  /** Menu trigger button text */
  label: string
  /** Items in the dropdown */
  items: MenuItemConfig[]
}
```

### `MenuItemConfig`

```ts
interface MenuItemConfig {
  /** Menu item text */
  label: string
  /** Keyboard shortcut label (e.g., "⌘S") */
  shortcut?: string
  /** Click handler */
  onClick?: () => void
  /** Whether the item is disabled */
  disabled?: boolean
  /** If true, renders a horizontal divider instead of a clickable item */
  divider?: boolean
  /** Nested submenu items */
  submenu?: MenuItemConfig[]
}
```

---

## DesktopIcon

### `DesktopIconProps`

```ts
interface DesktopIconProps {
  /** Icon component to render */
  icon: ComponentType<{ size?: number; color?: string }>
  /** Label text displayed below the icon */
  label: string
  /** Icon color (default: 'currentColor') */
  color?: string
  /** Handler for single click (typically selects) */
  onClick?: () => void
  /** Handler for double click (typically opens) */
  onDoubleClick?: () => void
  /** Whether the icon is currently selected */
  selected?: boolean
  /** Additional CSS classes */
  className?: string
}
```

## See Also

- [Hooks API](/api/hooks) — Hook signatures.
- [Utilities API](/api/utilities) — Utility function signatures.
- [Theme API](/api/theme) — Theme type definitions.
- [Types API](/api/types) — Utility type definitions.
