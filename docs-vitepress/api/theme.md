---
outline: deep
---

# Theme API Reference

## Interfaces

### `ThemeConfig`

The top-level theme configuration object:

```ts
interface ThemeConfig {
  colors: ThemeColors
  radius: ThemeRadius
  blur: ThemeBlur
  shadows: ThemeShadows
}
```

### `ThemeColors`

Color values for the theme. All values are CSS color strings (typically HSL).

```ts
interface ThemeColors {
  /** Page/app background color */
  background: string
  /** Primary text color */
  foreground: string
  /** Primary accent color (buttons, links, focused elements) */
  primary: string
  /** Secondary background color */
  secondary: string
  /** Accent color for highlights */
  accent: string
  /** Muted background for subtle areas */
  muted: string
  /** Border color */
  border: string
  /** Window background (typically semi-transparent for blur effect) */
  windowBackground: string
  /** Window border color */
  windowBorder: string
  /** Dock background (typically semi-transparent) */
  dockBackground: string
  /** Menu bar background (typically semi-transparent) */
  menuBarBackground: string
}
```

### `ThemeRadius`

Border radius values for different components:

```ts
interface ThemeRadius {
  /** Small radius (inputs, small buttons) */
  sm: string
  /** Medium radius (cards, panels) */
  md: string
  /** Large radius (dialogs) */
  lg: string
  /** Window corner radius */
  window: string
  /** Dock corner radius */
  dock: string
}
```

### `ThemeBlur`

Backdrop blur values for frosted-glass effects:

```ts
interface ThemeBlur {
  /** Window backdrop blur */
  window: string
  /** Dock backdrop blur */
  dock: string
  /** Menu bar backdrop blur */
  menuBar: string
}
```

### `ThemeShadows`

Box shadow values for depth:

```ts
interface ThemeShadows {
  /** Shadow for unfocused windows */
  window: string
  /** Shadow for the focused/active window */
  windowActive: string
  /** Shadow for the dock */
  dock: string
}
```

## Constants

### `defaultTheme`

The default theme configuration with light mode values:

```ts
const defaultTheme: ThemeConfig = {
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

## CSS Custom Properties Reference

Each `ThemeConfig` property maps to a CSS custom property:

| ThemeConfig Path | CSS Variable |
|---|---|
| `colors.background` | `--macos-background` |
| `colors.foreground` | `--macos-foreground` |
| `colors.primary` | `--macos-primary` |
| `colors.secondary` | `--macos-secondary` |
| `colors.accent` | `--macos-accent` |
| `colors.muted` | `--macos-muted` |
| `colors.border` | `--macos-border` |
| `colors.windowBackground` | `--macos-windowBackground` |
| `colors.windowBorder` | `--macos-windowBorder` |
| `colors.dockBackground` | `--macos-dockBackground` |
| `colors.menuBarBackground` | `--macos-menuBarBackground` |
| `radius.sm` | `--macos-radius-sm` |
| `radius.md` | `--macos-radius-md` |
| `radius.lg` | `--macos-radius-lg` |
| `radius.window` | `--macos-radius-window` |
| `radius.dock` | `--macos-radius-dock` |
| `blur.window` | `--macos-blur-window` |
| `blur.dock` | `--macos-blur-dock` |
| `blur.menuBar` | `--macos-blur-menuBar` |
| `shadows.window` | `--macos-shadow-window` |
| `shadows.windowActive` | `--macos-shadow-windowActive` |
| `shadows.dock` | `--macos-shadow-dock` |

## See Also

- [Utilities API](/api/utilities) — `applyTheme()`, `getTheme()`, and other theme functions.
- [Theming Guide](/guides/theming) — How to create and apply custom themes.
