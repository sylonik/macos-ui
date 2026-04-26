---
outline: deep
---

# Configuration

## `macos-ui.config.json`

When you run `npx macos-ui init`, a `macos-ui.config.json` file is created in your project root. This file tells the CLI where to place components and how to resolve paths.

```json
{
  "$schema": "https://raw.githubusercontent.com/Sylonik/macos-ui/main/registry/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/theme.css"
  },
  "aliases": {
    "components": "src/components",
    "lib": "src/lib",
    "hooks": "src/hooks",
    "styles": "src/styles"
  }
}
```

| Property | Description |
|---|---|
| `style` | Component style variant. Currently only `"default"` is available. |
| `tailwind.config` | Path to your Tailwind configuration file. |
| `tailwind.css` | Path to the CSS file where theme variables are defined. |
| `aliases.components` | Directory where component files are installed. |
| `aliases.lib` | Directory where utility files (`utils.ts`, `theme.ts`) are installed. |
| `aliases.hooks` | Directory where hook files are installed. |
| `aliases.styles` | Directory where style files (`theme.css`) are installed. |

## Tailwind CSS Preset

The library ships a Tailwind CSS preset at `@sylonik/macos-ui/tailwind.preset`. Add it to your config:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  presets: [require('@sylonik/macos-ui/tailwind.preset')],
  content: ['./src/**/*.{ts,tsx}'],
} satisfies Config
```

### What the preset provides

**Colors** — `macos-*` color utilities that reference CSS custom properties:

| Utility | CSS Variable |
|---|---|
| `bg-macos-background` | `--macos-background` |
| `text-macos-foreground` | `--macos-foreground` |
| `bg-macos-primary` | `--macos-primary` |
| `bg-macos-secondary` | `--macos-secondary` |
| `bg-macos-accent` | `--macos-accent` |
| `bg-macos-muted` | `--macos-muted` |
| `border-macos-border` | `--macos-border` |
| `bg-macos-window-background` | `--macos-windowBackground` |
| `border-macos-window-border` | `--macos-windowBorder` |
| `bg-macos-dock-background` | `--macos-dockBackground` |
| `bg-macos-menubar-background` | `--macos-menuBarBackground` |

**Border Radius** — `rounded-macos-*` utilities:

| Utility | CSS Variable | Default |
|---|---|---|
| `rounded-macos-sm` | `--macos-radius-sm` | `0.25rem` |
| `rounded-macos-md` | `--macos-radius-md` | `0.5rem` |
| `rounded-macos-lg` | `--macos-radius-lg` | `0.75rem` |
| `rounded-macos-window` | `--macos-radius-window` | `0.75rem` |
| `rounded-macos-dock` | `--macos-radius-dock` | `1rem` |

**Backdrop Blur** — `backdrop-blur-macos-*` utilities:

| Utility | CSS Variable | Default |
|---|---|---|
| `backdrop-blur-macos-window` | `--macos-blur-window` | `20px` |
| `backdrop-blur-macos-dock` | `--macos-blur-dock` | `40px` |
| `backdrop-blur-macos-menubar` | `--macos-blur-menuBar` | `20px` |

**Box Shadow** — `shadow-macos-*` utilities:

| Utility | CSS Variable | Default |
|---|---|---|
| `shadow-macos-window` | `--macos-shadow-window` | `0 10px 40px rgba(0, 0, 0, 0.1)` |
| `shadow-macos-window-active` | `--macos-shadow-windowActive` | `0 20px 60px rgba(0, 0, 0, 0.2)` |
| `shadow-macos-dock` | `--macos-shadow-dock` | `0 10px 30px rgba(0, 0, 0, 0.15)` |

**Animations** — Pre-configured keyframes and animation utilities:

| Utility | Description |
|---|---|
| `animate-window-appear` | Scale + fade in for window open |
| `animate-window-disappear` | Scale + fade out for window close |
| `animate-window-minimize` | Scale down + slide to dock |
| `animate-window-restore` | Scale up + slide from dock |
| `animate-dock-bounce` | Bounce effect for dock items |
| `animate-dock-item-appear` | Scale in for new dock items |
| `animate-dock-magnify` | Scale up for magnification |
| `animate-menu-slide-down` | Dropdown menu open |
| `animate-menu-slide-up` | Dropdown menu close |
| `animate-icon-bounce` | Bounce for desktop icons |
| `animate-icon-wiggle` | Wiggle for desktop icons |

**Spacing** — `window-padding`, `dock-padding`, `menubar-height`:

| Utility | Default |
|---|---|
| `p-window-padding` | `1rem` |
| `p-dock-padding` | `0.5rem` |
| `h-menubar-height` | `1.75rem` |

**Easing** — `ease-macos-*` timing functions:

| Utility | Value |
|---|---|
| `ease-macos-ease` | `cubic-bezier(0.4, 0.0, 0.2, 1)` |
| `ease-macos-ease-in` | `cubic-bezier(0.4, 0.0, 1, 1)` |
| `ease-macos-ease-out` | `cubic-bezier(0.0, 0.0, 0.2, 1)` |
| `ease-macos-ease-in-out` | `cubic-bezier(0.4, 0.0, 0.2, 1)` |

## CSS Custom Properties Reference

All theme values are defined as CSS custom properties on `:root`. You can override any of them in your CSS.

### Light Mode Defaults

```css
:root {
  /* Colors */
  --macos-background: hsl(0 0% 100%);
  --macos-foreground: hsl(222.2 84% 4.9%);
  --macos-primary: hsl(221.2 83.2% 53.3%);
  --macos-secondary: hsl(210 40% 96.1%);
  --macos-accent: hsl(210 40% 96.1%);
  --macos-muted: hsl(210 40% 96.1%);
  --macos-border: hsl(214.3 31.8% 91.4%);

  /* Component-specific colors */
  --macos-windowBackground: hsla(0 0% 100% / 0.8);
  --macos-windowBorder: hsl(214.3 31.8% 91.4%);
  --macos-dockBackground: hsla(0 0% 100% / 0.7);
  --macos-menuBarBackground: hsla(0 0% 100% / 0.8);

  /* Border radius */
  --macos-radius-sm: 0.25rem;
  --macos-radius-md: 0.5rem;
  --macos-radius-lg: 0.75rem;
  --macos-radius-window: 0.75rem;
  --macos-radius-dock: 1rem;

  /* Blur effects */
  --macos-blur-window: 20px;
  --macos-blur-dock: 40px;
  --macos-blur-menuBar: 20px;

  /* Shadows */
  --macos-shadow-window: 0 10px 40px rgba(0, 0, 0, 0.1);
  --macos-shadow-windowActive: 0 20px 60px rgba(0, 0, 0, 0.2);
  --macos-shadow-dock: 0 10px 30px rgba(0, 0, 0, 0.15);
}
```

### Dark Mode Defaults

Dark mode is activated automatically via `@media (prefers-color-scheme: dark)`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --macos-background: hsl(222.2 84% 4.9%);
    --macos-foreground: hsl(210 40% 98%);
    --macos-primary: hsl(217.2 91.2% 59.8%);
    --macos-secondary: hsl(217.2 32.6% 17.5%);
    --macos-accent: hsl(217.2 32.6% 17.5%);
    --macos-muted: hsl(217.2 32.6% 17.5%);
    --macos-border: hsl(217.2 32.6% 17.5%);

    --macos-windowBackground: hsla(222.2 84% 4.9% / 0.8);
    --macos-windowBorder: hsl(217.2 32.6% 17.5%);
    --macos-dockBackground: hsla(222.2 84% 4.9% / 0.7);
    --macos-menuBarBackground: hsla(222.2 84% 4.9% / 0.8);

    --macos-shadow-window: 0 10px 40px rgba(0, 0, 0, 0.5);
    --macos-shadow-windowActive: 0 20px 60px rgba(0, 0, 0, 0.7);
    --macos-shadow-dock: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
}
```

## Theme Configuration Object

You can also configure the theme programmatically using the `ThemeConfig` interface:

```ts
import type { ThemeConfig } from './lib/theme.types'

const myTheme: ThemeConfig = {
  colors: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    primary: 'hsl(221.2 83.2% 53.3%)',
    secondary: 'hsl(210 40% 96.1%)',
    accent: 'hsl(210 40% 96.1%)',
    muted: 'hsl(210 40% 96.1%)',
    border: 'hsl(214.3 31.8% 91.4%)',
    windowBackground: 'hsla(0 0% 100% / 0.8)',
    windowBorder: 'hsl(214.3 31.8% 91.4%)',
    dockBackground: 'hsla(0 0% 100% / 0.7)',
    menuBarBackground: 'hsla(0 0% 100% / 0.8)',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    window: '0.75rem',
    dock: '1rem',
  },
  blur: {
    window: '20px',
    dock: '40px',
    menuBar: '20px',
  },
  shadows: {
    window: '0 10px 40px rgba(0, 0, 0, 0.1)',
    windowActive: '0 20px 60px rgba(0, 0, 0, 0.2)',
    dock: '0 10px 30px rgba(0, 0, 0, 0.15)',
  },
}
```

Apply it at runtime:

```ts
import { applyTheme } from './lib/theme'

applyTheme(myTheme)
```

See the [Theming Guide](/guides/theming) for details on creating custom themes.

## Light/Dark Mode Setup

The theme CSS uses `@media (prefers-color-scheme: dark)` to switch variables automatically. If you need manual control (e.g., a toggle button), you can:

1. Remove the `@media` query from `theme.css`.
2. Define dark mode variables under a `.dark` class.
3. Toggle the class on your root element.

```css
/* theme.css — manual dark mode */
:root {
  /* light mode defaults */
}

.dark {
  --macos-background: hsl(222.2 84% 4.9%);
  --macos-foreground: hsl(210 40% 98%);
  /* ... rest of dark values */
}
```

```ts
// Toggle dark mode
document.documentElement.classList.toggle('dark')
```

## Custom Font Configuration

The library uses the system font stack by default via the `.macos-ui` class:

```css
.macos-ui {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

To use a custom font, override the `font-family` on your root element or on the `.macos-ui` class:

```css
.macos-ui {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

Or apply the font via Tailwind's `fontFamily` configuration in `tailwind.config.ts`.
