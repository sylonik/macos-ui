---
outline: deep
---

# Dock

A macOS-style dock component with mouse-proximity magnification, running indicators, badge support, and configurable positioning.

## Installation

```bash
npx macos-ui add dock
```

## Import

```tsx
import { Dock } from '@/components/dock/dock'
import type { DockItemConfig } from '@/components/dock/dock.types'
```

## Basic Usage

```tsx
import { Dock } from '@/components/dock/dock'

const FileIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const MailIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
)

const items = [
  { id: 'finder', icon: FileIcon, label: 'Finder', onClick: () => console.log('Finder') },
  { id: 'mail', icon: MailIcon, label: 'Mail', onClick: () => console.log('Mail') },
]

function App() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <Dock items={items} />
    </div>
  )
}
```

## DockProps

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `items` | `DockItemConfig[]` | — | Yes | Array of dock items to display. |
| `position` | `'bottom' \| 'left' \| 'right'` | `'bottom'` | No | Position of the dock on screen. Controls layout direction. |
| `magnification` | `boolean` | `true` | No | Whether items magnify on mouse proximity. |
| `magnificationScale` | `number` | `1.5` | No | Maximum scale factor for magnification (1 = no magnification). |
| `autoHide` | `boolean` | — | No | Whether the dock auto-hides when the mouse moves away. |
| `className` | `string` | — | No | Additional CSS classes applied to the dock container. |

## DockItemConfig

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `id` | `string` | — | Yes | Unique identifier for the dock item. |
| `icon` | `ComponentType<{ size?: number }>` | — | Yes | Icon component to render. Receives a `size` prop. |
| `label` | `string` | — | Yes | Tooltip label shown on hover. Also used for `aria-label`. |
| `color` | `string` | `'currentColor'` | No | Color passed to the icon component. |
| `onClick` | `() => void` | — | No | Handler called when the dock item is clicked. |
| `isRunning` | `boolean` | `false` | No | Shows a small dot indicator below the icon. |
| `badge` | `number \| string` | — | No | Badge shown in the top-right corner of the icon (e.g., notification count). |

## Examples

### Dock with Running Indicators

```tsx
const items: DockItemConfig[] = [
  { id: 'finder', icon: FileIcon, label: 'Finder', isRunning: true, onClick: () => {} },
  { id: 'safari', icon: GlobeIcon, label: 'Safari', isRunning: true, onClick: () => {} },
  { id: 'mail', icon: MailIcon, label: 'Mail', isRunning: false, onClick: () => {} },
]

<Dock items={items} />
```

Items with `isRunning: true` display a small dot below the icon, indicating the app is open.

### Dock with Badges

```tsx
const items: DockItemConfig[] = [
  { id: 'mail', icon: MailIcon, label: 'Mail', badge: 5, onClick: () => {} },
  { id: 'messages', icon: ChatIcon, label: 'Messages', badge: '99+', onClick: () => {} },
  { id: 'finder', icon: FileIcon, label: 'Finder', onClick: () => {} },
]

<Dock items={items} />
```

Badges appear as a red circle in the top-right corner of the dock item.

### Vertical Dock (Left/Right)

```tsx
<div className="fixed left-4 top-1/2 -translate-y-1/2">
  <Dock items={items} position="left" />
</div>
```

```tsx
<div className="fixed right-4 top-1/2 -translate-y-1/2">
  <Dock items={items} position="right" />
</div>
```

When `position` is `"left"` or `"right"`, items are stacked vertically.

### Dock Without Magnification

```tsx
<Dock items={items} magnification={false} />
```

Items remain a fixed 48px size regardless of mouse position.

### Custom Magnification Scale

```tsx
<Dock items={items} magnificationScale={2.0} />
```

Increase the scale for a more dramatic magnification effect.

## Magnification Behavior

When `magnification` is enabled, the Dock calculates the distance between the mouse cursor and each item. Items closer to the cursor scale up, while items further away remain at their base size (48px).

The scaling formula considers:
- **Base item width**: 48px
- **Mouse distance**: Pixels from cursor to item center
- **Scale factor**: Configured via `magnificationScale` (default 1.5)
- **Falloff**: Items more than 2 item-widths away from the cursor are not magnified

## Accessibility

| Feature | Implementation |
|---|---|
| `aria-label` | Each dock item has an `aria-label` set to its `label` value. |
| `role` | Each dock item has `role="button"`. |
| Tooltip | On hover, a tooltip displays the item label above the icon. |
| Keyboard | Dock items are focusable and clickable with standard button semantics. |

## See Also

- [Window](/components/window) — Open windows from dock item clicks.
- [App Launcher Example](/examples/app-launcher) — Full desktop with Dock, DesktopIcons, and Windows.
