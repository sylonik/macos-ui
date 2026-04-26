---
outline: deep
---

# DesktopIcon

A macOS-style desktop icon with selection state, single/double-click handlers, customizable colors, and full keyboard accessibility.

## Installation

```bash
npx macos-ui add desktop-icon
```

## Import

```tsx
import { DesktopIcon } from '@/components/desktop-icon/desktop-icon'
import type { DesktopIconProps } from '@/components/desktop-icon/desktop-icon.types'
```

## Basic Usage

```tsx
import { DesktopIcon } from '@/components/desktop-icon/desktop-icon'

const FolderIcon = ({ size = 48, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} opacity="0.9">
    <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
  </svg>
)

function Desktop() {
  return (
    <DesktopIcon
      icon={FolderIcon}
      label="Documents"
      onClick={() => console.log('Selected')}
      onDoubleClick={() => console.log('Opened')}
    />
  )
}
```

## Props

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `icon` | `ComponentType<{ size?: number; color?: string }>` | — | Yes | Icon component to render. Receives `size` and `color` props. |
| `label` | `string` | — | Yes | Text displayed below the icon. Truncated with ellipsis if too long. |
| `color` | `string` | `'currentColor'` | No | Color passed to the icon component. |
| `onClick` | `() => void` | — | No | Handler for single click (typically selects the icon). |
| `onDoubleClick` | `() => void` | — | No | Handler for double click (typically opens the item). |
| `selected` | `boolean` | `false` | No | Whether the icon is in a selected state (highlighted). |
| `className` | `string` | — | No | Additional CSS classes applied to the icon container. |

## Examples

### Selected State

```tsx
const [selectedId, setSelectedId] = React.useState<string | null>(null)

<DesktopIcon
  icon={FolderIcon}
  label="Documents"
  selected={selectedId === 'documents'}
  onClick={() => setSelectedId('documents')}
  onDoubleClick={() => openFolder('documents')}
/>
```

When `selected` is `true`:
- The icon gets a blue translucent background (`bg-blue-500/30`) with a ring outline (`ring-2 ring-blue-500/50`).
- The label changes from white with a drop shadow to white text on a blue background.

### Colored Icons

```tsx
<div className="flex gap-4">
  <DesktopIcon icon={FolderIcon} label="Documents" color="#3B82F6" />
  <DesktopIcon icon={FolderIcon} label="Pictures" color="#10B981" />
  <DesktopIcon icon={FolderIcon} label="Music" color="#F59E0B" />
  <DesktopIcon icon={TrashIcon} label="Trash" color="#EF4444" />
</div>
```

### Multi-Select Grid

```tsx
function DesktopGrid() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  const icons = [
    { id: 'documents', icon: FolderIcon, label: 'Documents', color: '#3B82F6' },
    { id: 'downloads', icon: FolderIcon, label: 'Downloads', color: '#6366F1' },
    { id: 'pictures', icon: ImageIcon, label: 'Pictures', color: '#10B981' },
    { id: 'music', icon: MusicIcon, label: 'Music', color: '#F59E0B' },
    { id: 'readme', icon: FileIcon, label: 'README.md' },
    { id: 'trash', icon: TrashIcon, label: 'Trash', color: '#6B7280' },
  ]

  const handleClick = (id: string, e: React.MouseEvent) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (e.metaKey || e.ctrlKey) {
        // Toggle selection with Cmd/Ctrl
        if (next.has(id)) next.delete(id)
        else next.add(id)
      } else {
        // Single select
        next.clear()
        next.add(id)
      }
      return next
    })
  }

  return (
    <div
      className="grid grid-cols-6 gap-4 p-6"
      onClick={(e) => {
        // Deselect all when clicking empty space
        if (e.target === e.currentTarget) setSelected(new Set())
      }}
    >
      {icons.map((item) => (
        <DesktopIcon
          key={item.id}
          icon={item.icon}
          label={item.label}
          color={item.color}
          selected={selected.has(item.id)}
          onClick={() => handleClick(item.id, event as any)}
          onDoubleClick={() => console.log(`Open ${item.label}`)}
        />
      ))}
    </div>
  )
}
```

### Desktop Icon with Window Integration

```tsx
function Desktop() {
  const { openWindow } = useWindowManager()

  const handleOpenFolder = (name: string) => {
    openWindow({
      appId: name.toLowerCase(),
      title: name,
      defaultPosition: { x: 200, y: 100 },
      defaultSize: { width: 600, height: 400 },
    })
  }

  return (
    <DesktopIcon
      icon={FolderIcon}
      label="Documents"
      onDoubleClick={() => handleOpenFolder('Documents')}
    />
  )
}
```

## Accessibility

| Attribute | Value | Description |
|---|---|---|
| `role` | `"button"` | Identifies the icon as an interactive element. |
| `tabIndex` | `0` | Makes the icon focusable via keyboard. |
| `aria-label` | `"{label}"` | Provides the icon label to screen readers. |
| `aria-selected` | `"true" \| "false"` | Communicates the selection state to assistive technologies. |

### Keyboard Navigation

| Key | Action |
|---|---|
| `Enter` | Triggers `onDoubleClick` (opens the item). |
| `Space` | Triggers `onClick` (selects the item). |
| `Tab` | Moves focus to the next focusable element. |

## Styling Variants

The DesktopIcon uses `class-variance-authority` (CVA) for variant-based styling:

**Container variants** (`selected`):
- `true`: `bg-blue-500/30 ring-2 ring-blue-500/50`
- `false`: `hover:bg-white/10`

**Label variants** (`selected`):
- `true`: `bg-blue-500 text-white`
- `false`: `text-white drop-shadow-md`

Labels are truncated at 80px width with `text-ellipsis overflow-hidden`.

## See Also

- [App Launcher Example](/examples/app-launcher) — Desktop icons that open windows on double-click.
- [Dock](/components/dock) — Pair with a Dock for a complete macOS desktop experience.
