---
outline: deep
---

# Theming

The macOS UI theming system is built on CSS custom properties, a Tailwind CSS preset, and a programmatic API for runtime theme changes.

## CSS Custom Properties

All visual aspects of the components — colors, border radii, blur effects, and shadows — are controlled by `--macos-*` CSS variables defined on `:root`. This makes it trivial to customize the look of every component by overriding a few variables.

### Full Variable Reference

#### Colors

| Variable | Light Mode Default | Dark Mode Default |
|---|---|---|
| `--macos-background` | `hsl(0 0% 100%)` | `hsl(222.2 84% 4.9%)` |
| `--macos-foreground` | `hsl(222.2 84% 4.9%)` | `hsl(210 40% 98%)` |
| `--macos-primary` | `hsl(221.2 83.2% 53.3%)` | `hsl(217.2 91.2% 59.8%)` |
| `--macos-secondary` | `hsl(210 40% 96.1%)` | `hsl(217.2 32.6% 17.5%)` |
| `--macos-accent` | `hsl(210 40% 96.1%)` | `hsl(217.2 32.6% 17.5%)` |
| `--macos-muted` | `hsl(210 40% 96.1%)` | `hsl(217.2 32.6% 17.5%)` |
| `--macos-border` | `hsl(214.3 31.8% 91.4%)` | `hsl(217.2 32.6% 17.5%)` |
| `--macos-windowBackground` | `hsla(0 0% 100% / 0.8)` | `hsla(222.2 84% 4.9% / 0.8)` |
| `--macos-windowBorder` | `hsl(214.3 31.8% 91.4%)` | `hsl(217.2 32.6% 17.5%)` |
| `--macos-dockBackground` | `hsla(0 0% 100% / 0.7)` | `hsla(222.2 84% 4.9% / 0.7)` |
| `--macos-menuBarBackground` | `hsla(0 0% 100% / 0.8)` | `hsla(222.2 84% 4.9% / 0.8)` |

#### Border Radius

| Variable | Default |
|---|---|
| `--macos-radius-sm` | `0.25rem` |
| `--macos-radius-md` | `0.5rem` |
| `--macos-radius-lg` | `0.75rem` |
| `--macos-radius-window` | `0.75rem` |
| `--macos-radius-dock` | `1rem` |

#### Blur

| Variable | Default |
|---|---|
| `--macos-blur-window` | `20px` |
| `--macos-blur-dock` | `40px` |
| `--macos-blur-menuBar` | `20px` |

#### Shadows

| Variable | Light Mode Default | Dark Mode Default |
|---|---|---|
| `--macos-shadow-window` | `0 10px 40px rgba(0, 0, 0, 0.1)` | `0 10px 40px rgba(0, 0, 0, 0.5)` |
| `--macos-shadow-windowActive` | `0 20px 60px rgba(0, 0, 0, 0.2)` | `0 20px 60px rgba(0, 0, 0, 0.7)` |
| `--macos-shadow-dock` | `0 10px 30px rgba(0, 0, 0, 0.15)` | `0 10px 30px rgba(0, 0, 0, 0.5)` |

## Overriding Variables in CSS

To customize a theme, override the variables in your CSS:

```css
/* Custom light theme */
:root {
  --macos-primary: hsl(262 83% 58%);        /* Purple accent */
  --macos-windowBackground: hsla(262 30% 97% / 0.9);
  --macos-dockBackground: hsla(262 30% 97% / 0.8);
  --macos-radius-window: 1rem;               /* Rounder windows */
}

/* Custom dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --macos-primary: hsl(262 83% 68%);
    --macos-windowBackground: hsla(262 30% 10% / 0.9);
    --macos-dockBackground: hsla(262 30% 10% / 0.8);
  }
}
```

## Using the Tailwind Preset

The Tailwind preset maps CSS variables to utility classes. Add it to your config:

```ts
// tailwind.config.ts
export default {
  presets: [require('@sylonik/macos-ui/tailwind.preset')],
}
```

This gives you utilities like:

```html
<!-- Colors -->
<div class="bg-macos-background text-macos-foreground" />
<div class="bg-macos-primary" />
<div class="bg-macos-window-background border-macos-window-border" />

<!-- Border radius -->
<div class="rounded-macos-window" />
<div class="rounded-macos-dock" />

<!-- Backdrop blur -->
<div class="backdrop-blur-macos-window" />
<div class="backdrop-blur-macos-dock" />

<!-- Shadows -->
<div class="shadow-macos-window" />
<div class="shadow-macos-window-active" />

<!-- Animations -->
<div class="animate-window-appear" />
<div class="animate-dock-bounce" />
```

## Programmatic Theming

The library exports functions for runtime theme manipulation:

### `applyTheme(config, root?)`

Applies a `ThemeConfig` object to CSS custom properties:

```ts
import { applyTheme } from '@/lib/theme'
import { defaultTheme } from '@/lib/theme.types'

// Apply a custom theme
applyTheme({
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: 'hsl(262 83% 58%)',
  },
})
```

The optional `root` parameter defaults to `document.documentElement`. Pass a different element to scope the theme.

### `getTheme(root?)`

Reads the current theme from computed CSS variables:

```ts
import { getTheme } from '@/lib/theme'

const currentTheme = getTheme()
console.log(currentTheme.colors.primary) // "hsl(221.2 83.2% 53.3%)"
```

### `mergeWithDefaults(partial)`

Merges a partial theme configuration with the default theme:

```ts
import { mergeWithDefaults } from '@/lib/theme'

const myTheme = mergeWithDefaults({
  colors: { primary: 'hsl(262 83% 58%)' },
  radius: { window: '1rem' },
})
// All other values filled from defaultTheme
```

### `serializeTheme(config)` / `deserializeTheme(json)`

Serialize a theme to JSON for storage, and deserialize it back:

```ts
import { serializeTheme, deserializeTheme } from '@/lib/theme'

// Save to localStorage
const json = serializeTheme(myTheme)
localStorage.setItem('macos-theme', json)

// Restore
const saved = localStorage.getItem('macos-theme')
if (saved) {
  const theme = deserializeTheme(saved)
  applyTheme(theme)
}
```

## ThemeConfig Interface

```ts
interface ThemeConfig {
  colors: ThemeColors
  radius: ThemeRadius
  blur: ThemeBlur
  shadows: ThemeShadows
}

interface ThemeColors {
  background: string
  foreground: string
  primary: string
  secondary: string
  accent: string
  muted: string
  border: string
  windowBackground: string
  windowBorder: string
  dockBackground: string
  menuBarBackground: string
}

interface ThemeRadius {
  sm: string
  md: string
  lg: string
  window: string
  dock: string
}

interface ThemeBlur {
  window: string
  dock: string
  menuBar: string
}

interface ThemeShadows {
  window: string
  windowActive: string
  dock: string
}
```

## Creating a Custom Theme

Here's a complete example of creating and applying a custom purple theme:

```ts
import type { ThemeConfig } from '@/lib/theme.types'
import { applyTheme, mergeWithDefaults } from '@/lib/theme'

const purpleTheme: ThemeConfig = mergeWithDefaults({
  colors: {
    primary: 'hsl(262 83% 58%)',
    accent: 'hsl(262 60% 90%)',
    windowBackground: 'hsla(262 30% 97% / 0.85)',
    windowBorder: 'hsl(262 30% 85%)',
    dockBackground: 'hsla(262 30% 97% / 0.75)',
    menuBarBackground: 'hsla(262 30% 97% / 0.85)',
  },
  radius: {
    window: '1rem',
    dock: '1.25rem',
  },
  blur: {
    window: '24px',
    dock: '48px',
  },
})

// Apply on load
applyTheme(purpleTheme)
```

## Dark Mode Support

By default, the theme CSS uses `@media (prefers-color-scheme: dark)` to switch variables automatically based on the user's OS preference.

For manual dark mode control (e.g., a toggle), see the [Configuration guide](/getting-started/configuration#lightdark-mode-setup).

## Animation Keyframes

The Tailwind preset includes animation keyframes for all components:

| Animation | Keyframe | Duration | Easing |
|---|---|---|---|
| `animate-window-appear` | Scale 0.95 + fade in | 0.2s | ease-out |
| `animate-window-disappear` | Scale 0.95 + fade out | 0.2s | ease-in |
| `animate-window-minimize` | Scale 0.1 + slide to bottom | 0.3s | ease-in |
| `animate-window-restore` | Scale 0.1 + slide from bottom | 0.3s | ease-out |
| `animate-dock-bounce` | Translate Y -10px | 0.5s | ease-in-out |
| `animate-dock-item-appear` | Scale 0.5 + fade in | 0.2s | ease-out |
| `animate-dock-magnify` | Scale to 1.5 | 0.2s | ease-out (forwards) |
| `animate-menu-slide-down` | Translate Y -10px + fade in | 0.15s | ease-out |
| `animate-menu-slide-up` | Translate Y 0 + fade out | 0.15s | ease-in |
| `animate-icon-bounce` | Translate Y -5px | 0.3s | ease-in-out |
| `animate-icon-wiggle` | Rotate +/-2deg | 0.3s | ease-in-out |

## See Also

- [Configuration](/getting-started/configuration) — Tailwind preset details and CSS variable reference.
- [Theme API](/api/theme) — Complete type definitions for theme interfaces.
