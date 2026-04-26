---
outline: deep
---

# Accessibility

All `@sylonik/macos-ui` components are designed with accessibility as a core requirement, targeting **WCAG 2.1 AA** compliance. This guide documents the accessibility features of each component and provides recommendations for testing.

## Per-Component Accessibility

### Window

The Window component is implemented as an accessible dialog:

| Feature | Implementation |
|---|---|
| **Role** | `role="dialog"` on the window container. |
| **Modal indicator** | `aria-modal="true"` signals to assistive technologies that content behind the window is inert. |
| **Labeling** | `aria-labelledby="window-title-{id}"` associates the window with its title element. |
| **Traffic light buttons** | Each button (`Close window`, `Minimize window`, `Maximize window`) has a descriptive `aria-label`. |
| **Focus trap** | When a window is focused, Tab/Shift+Tab navigation wraps within the window boundaries, preventing accidental focus escape. |
| **Keyboard dismissal** | Escape key can be bound to `onClose` for keyboard-accessible window closing. |
| **Resize handle** | The resize handle has `aria-label="Resize window"`. |

### Dock

| Feature | Implementation |
|---|---|
| **Item labeling** | Each dock item has `aria-label` set to its `label` prop value. |
| **Role** | Each dock item has `role="button"`. |
| **Tooltip** | Hovering over a dock item shows a visible tooltip with the item label. |
| **Focus** | Dock items are focusable and activatable via standard button interaction patterns. |

### MenuBar

| Feature | Implementation |
|---|---|
| **Menu role** | Dropdown containers have `role="menu"`. |
| **Item role** | Menu items have `role="menuitem"`. |
| **Keyboard navigation** | ArrowDown/ArrowUp moves focus between items. Escape closes the dropdown. |
| **Disabled items** | Disabled items have the `disabled` HTML attribute and reduced visual opacity. |
| **Focus management** | Focus follows keyboard navigation within the open dropdown. |

### DesktopIcon

| Feature | Implementation |
|---|---|
| **Role** | `role="button"` identifies the icon as an interactive element. |
| **Labeling** | `aria-label` is set to the icon's `label` prop. |
| **Selection state** | `aria-selected` communicates whether the icon is selected. |
| **Focus** | `tabIndex={0}` makes icons focusable via Tab navigation. |
| **Keyboard handlers** | `Enter` triggers `onDoubleClick` (open). `Space` triggers `onClick` (select). |

## Keyboard Navigation Overview

| Component | Key | Action |
|---|---|---|
| **Window** | `Tab` | Move focus to next focusable element within the window. |
| **Window** | `Shift + Tab` | Move focus to previous focusable element within the window. |
| **Window** | `Escape` | Close window (when bound to `onClose`). |
| **MenuBar** | `ArrowDown` | Move focus to next menu item in dropdown. |
| **MenuBar** | `ArrowUp` | Move focus to previous menu item in dropdown. |
| **MenuBar** | `Escape` | Close the open dropdown menu. |
| **MenuBar** | `Enter` | Activate the focused menu item. |
| **DesktopIcon** | `Enter` | Trigger `onDoubleClick` (open the item). |
| **DesktopIcon** | `Space` | Trigger `onClick` (select the item). |
| **DesktopIcon** | `Tab` | Move focus to the next icon. |
| **Dock** | `Tab` | Move focus between dock items. |
| **Dock** | `Enter` / `Space` | Activate the focused dock item. |

## Screen Reader Support

All components use semantic HTML and ARIA attributes to communicate their state and purpose:

- **Window** is announced as a dialog with its title.
- **Dock items** are announced as buttons with their labels.
- **MenuBar** dropdowns are announced as menus with individual menu items.
- **DesktopIcons** are announced as buttons with their labels and selection state.

Focus management ensures that screen reader users always know where they are and can navigate predictably.

## Testing Accessibility

We recommend the following approach to verify accessibility:

### Automated Testing

- **axe-core** — Use `@axe-core/react` during development to catch common issues.
- **eslint-plugin-jsx-a11y** — Add the ESLint plugin to catch accessibility issues at lint time.
- **Playwright + axe** — Use `@axe-core/playwright` in E2E tests for automated WCAG compliance checks.

### Manual Testing

1. **Keyboard-only navigation** — Verify all interactive elements are reachable and operable without a mouse.
2. **Screen reader testing** — Test with VoiceOver (macOS), NVDA (Windows), or JAWS.
3. **Color contrast** — Verify text meets minimum contrast ratios (4.5:1 for normal text, 3:1 for large text).
4. **Zoom testing** — Verify the UI remains usable at 200% browser zoom.
5. **Reduced motion** — Verify animations respect `prefers-reduced-motion` (consider adding support if needed).

### Example: axe-core with Vitest

```tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

it('Window has no accessibility violations', async () => {
  const { container } = render(
    <WindowManagerProvider>
      <Window id="test" title="Test">
        <p>Content</p>
      </Window>
    </WindowManagerProvider>
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## See Also

- [Window](/components/window#accessibility) — Window-specific accessibility details.
- [Dock](/components/dock#accessibility) — Dock accessibility features.
- [MenuBar](/components/menu-bar#accessibility) — MenuBar keyboard navigation.
- [DesktopIcon](/components/desktop-icon#accessibility) — DesktopIcon ARIA attributes.
