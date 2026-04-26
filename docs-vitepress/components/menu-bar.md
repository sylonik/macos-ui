---
outline: deep
---

# MenuBar

A macOS-style menu bar with dropdown menus, keyboard navigation, shortcut labels, and a customizable right-side status area.

## Installation

```bash
npx macos-ui add menu-bar
```

## Import

```tsx
import { MenuBar } from '@/components/menu-bar/menu-bar'
import type { MenuConfig, MenuItemConfig } from '@/components/menu-bar/menu-bar.types'
```

## Basic Usage

```tsx
import { MenuBar } from '@/components/menu-bar/menu-bar'

const menus = [
  {
    label: 'File',
    items: [
      { label: 'New', shortcut: '⌘N', onClick: () => console.log('New') },
      { label: 'Open', shortcut: '⌘O', onClick: () => console.log('Open') },
      { label: '', divider: true },
      { label: 'Save', shortcut: '⌘S', onClick: () => console.log('Save') },
      { label: 'Quit', shortcut: '⌘Q', onClick: () => console.log('Quit') },
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

function App() {
  return (
    <MenuBar
      logo={<span className="font-bold">&#63743;</span>}
      menus={menus}
    />
  )
}
```

## MenuBarProps

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `logo` | `ReactNode` | — | No | Content rendered at the far left of the menu bar (e.g., an Apple logo or app icon). |
| `menus` | `MenuConfig[]` | — | No | Array of dropdown menus to display. |
| `rightContent` | `ReactNode` | — | No | Content rendered on the right side of the menu bar (e.g., clock, battery, Wi-Fi status). |
| `className` | `string` | — | No | Additional CSS classes applied to the menu bar container. |

## MenuConfig

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Text displayed as the menu trigger button. |
| `items` | `MenuItemConfig[]` | — | Yes | Array of items in the dropdown. |

## MenuItemConfig

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Text displayed for the menu item. |
| `shortcut` | `string` | — | No | Keyboard shortcut label displayed on the right side (e.g., `"⌘S"`). |
| `onClick` | `() => void` | — | No | Handler called when the menu item is clicked. |
| `disabled` | `boolean` | `false` | No | Whether the menu item is disabled (grayed out, not clickable). |
| `divider` | `boolean` | `false` | No | If `true`, renders a horizontal separator line instead of a clickable item. |
| `submenu` | `MenuItemConfig[]` | — | No | Nested submenu items. |

## Examples

### Menu Bar with Status Area

```tsx
function Clock() {
  const [time, setTime] = React.useState(new Date())

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

<MenuBar
  logo={<span className="font-bold">&#63743;</span>}
  menus={menus}
  rightContent={
    <div className="flex items-center gap-3 text-sm opacity-80">
      <span>100%</span>
      <span>Wi-Fi</span>
      <Clock />
    </div>
  }
/>
```

### Menus with Submenus

```tsx
const menus: MenuConfig[] = [
  {
    label: 'View',
    items: [
      { label: 'Show Toolbar', shortcut: '⌘T' },
      { label: 'Show Sidebar', shortcut: '⌘S' },
      { label: '', divider: true },
      {
        label: 'Sort By',
        submenu: [
          { label: 'Name', onClick: () => {} },
          { label: 'Date Modified', onClick: () => {} },
          { label: 'Size', onClick: () => {} },
          { label: 'Kind', onClick: () => {} },
        ],
      },
    ],
  },
]
```

### Disabled Menu Items

```tsx
const menus: MenuConfig[] = [
  {
    label: 'Edit',
    items: [
      { label: 'Undo', shortcut: '⌘Z', disabled: true },
      { label: 'Redo', shortcut: '⇧⌘Z', disabled: true },
      { label: '', divider: true },
      { label: 'Cut', shortcut: '⌘X', onClick: () => {} },
      { label: 'Copy', shortcut: '⌘C', onClick: () => {} },
      { label: 'Paste', shortcut: '⌘V', onClick: () => {} },
    ],
  },
]
```

Disabled items appear with reduced opacity and cannot be clicked.

### Minimal Menu Bar (Logo Only)

```tsx
<MenuBar logo={<span className="font-bold">&#63743;</span>} />
```

## Keyboard Navigation

The MenuBar supports the following keyboard interactions within open dropdown menus:

| Key | Action |
|---|---|
| `ArrowDown` | Move focus to the next menu item. |
| `ArrowUp` | Move focus to the previous menu item. |
| `Escape` | Close the current dropdown menu. |
| `Enter` / Click | Activate the focused menu item. |

Menus open on hover and on click. Moving the mouse between menu triggers opens the corresponding dropdown.

## Accessibility

| Feature | Implementation |
|---|---|
| `role="menu"` | The dropdown container has `role="menu"`. |
| `role="menuitem"` | Each interactive item has `role="menuitem"`. |
| Keyboard navigation | Arrow keys navigate items, Escape closes the menu. |
| Disabled state | Disabled items have the `disabled` attribute and reduced opacity. |
| Focus management | Focus follows ArrowUp/ArrowDown within the dropdown. |

## Styling

The MenuBar uses a semi-transparent background with backdrop blur, matching the macOS aesthetic:

```
bg-white/20 backdrop-blur-xl shadow-sm border-b border-white/10
```

Height is fixed at `h-8` (2rem / 32px) to match the macOS menu bar.

## See Also

- [Dock](/components/dock) — App launcher bar, typically at the bottom.
- [Dashboard Example](/examples/dashboard) — Full layout with MenuBar, Windows, and Dock.
