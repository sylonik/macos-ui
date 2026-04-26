# @sylonik/macos-ui

> Authentic macOS-style React components built with TypeScript, Tailwind CSS, and love.

[![npm version](https://img.shields.io/npm/v/@sylonik/macos-ui.svg?style=flat-square)](https://www.npmjs.com/package/@sylonik/macos-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8%2B-blue?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-blue?style=flat-square)](https://react.dev/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Sylonik/macos-ui/test.yml?branch=main&style=flat-square)](https://github.com/Sylonik/macos-ui/actions/workflows/test.yml)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1%2B-38B2AC?style=flat-square)](https://tailwindcss.com/)

A collection of beautiful, accessible macOS-style React components. Copy-paste them into your project, customize freely, and own the source code. Inspired by [shadcn/ui](https://ui.shadcn.com/).

## Features

✨ **Pixel-Perfect macOS Design** - Faithfully recreated components including Window, Dock, MenuBar, and DesktopIcon with authentic styling and animations.

📋 **Copy & Paste** - Install individual components into your project using the CLI. Own the code, customize freely, no dependency lock-in.

🎨 **TypeScript First** - Built with TypeScript in strict mode. Full type safety with exported interfaces for all component props and configurations.

🎨 **Themeable** - Comprehensive theming system using CSS custom properties and a Tailwind CSS preset. Light and dark mode out of the box.

♿ **Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes, keyboard navigation, and focus management.

🧪 **Thoroughly Tested** - 76+ tests including unit, property-based (fast-check), and E2E (Playwright) with 80% code coverage.

## Quick Start

### Installation

Initialize your project and add components:

```bash
# Initialize the project
npx macos-ui init

# Add individual components
npx macos-ui add window dock menu-bar desktop-icon

# Or add all components at once
npx macos-ui add --all
```

### Basic Usage

```tsx
import { Window, WindowManagerProvider, useWindowManager } from '@sylonik/macos-ui'
import { Home } from 'lucide-react'

function App() {
  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  )
}

function Desktop() {
  const { openWindow } = useWindowManager()

  return (
    <button onClick={() => openWindow({
      id: 'home',
      title: 'Welcome',
      icon: Home,
      content: 'Hello, macOS!'
    })}>
      Open Window
    </button>
  )
}
```

## Components

### [Window](https://sylonik.github.io/macos-ui/components/window)

Draggable, resizable windows with macOS-style traffic light buttons (close, minimize, maximize).

**Features:**
- Customizable size and position
- Resizable with corner handle
- Draggable title bar
- Traffic light buttons with callbacks
- Focus management and z-index ordering
- Keyboard accessibility (Tab, Escape)

### [Dock](https://sylonik.github.io/macos-ui/components/dock)

Application launcher bar with magnification effect, badges, and running indicators.

**Features:**
- Three positioning options (bottom, left, right)
- Smooth magnification on hover
- Running indicator dots
- Notification badges
- Icon labels on hover
- Accessible with aria-labels

### [MenuBar](https://sylonik.github.io/macos-ui/components/menu-bar)

System-level navigation bar with dropdown menus, keyboard navigation, and customizable status area.

**Features:**
- Dropdown menus with hover/click
- Nested submenu support
- Keyboard navigation (Arrow keys, Escape)
- Divider and disabled items
- Custom status area (right side)
- Focus management

### [DesktopIcon](https://sylonik.github.io/macos-ui/components/desktop-icon)

Clickable desktop application icons with selection states and keyboard support.

**Features:**
- Single and double-click handlers
- Selected state styling with ring
- Customizable colors
- Icon + label layout
- Keyboard support (Enter, Space)
- Accessible button behavior

## Documentation

Full documentation is available at [sylonik.github.io/macos-ui](https://sylonik.github.io/macos-ui/)

- [Getting Started](https://sylonik.github.io/macos-ui/getting-started/)
- [Installation Guide](https://sylonik.github.io/macos-ui/getting-started/installation)
- [Component API](https://sylonik.github.io/macos-ui/api/components)
- [Theming Guide](https://sylonik.github.io/macos-ui/guides/theming)
- [Accessibility](https://sylonik.github.io/macos-ui/guides/accessibility)
- [CLI Usage](https://sylonik.github.io/macos-ui/guides/cli-usage)

## CLI Commands

```bash
# Initialize project with configuration and theme
npx macos-ui init

# Add specific components
npx macos-ui add window dock

# Add all components
npx macos-ui add --all

# Options
npx macos-ui add window --overwrite  # Overwrite existing components
npx macos-ui add window --path src/ui  # Custom destination path
npx macos-ui init --yes  # Skip prompts, use defaults
```

## Copy & Paste Philosophy

Unlike traditional npm packages, `@sylonik/macos-ui` uses a **copy-paste model**:

✅ **Own the Code** - Copy components directly into your project  
✅ **Full Control** - Modify styling, props, and behavior freely  
✅ **No Lock-In** - Zero runtime dependencies (except React, Tailwind)  
✅ **Smaller Bundles** - Only ship what you use  

This approach is inspired by [shadcn/ui](https://ui.shadcn.com/) and prioritizes developer freedom over convenience.

## Theming

Components use CSS custom properties for theming. Customize colors, spacing, shadows, and more:

```css
:root {
  --macos-background: hsl(0, 0%, 100%);
  --macos-foreground: hsl(0, 0%, 0%);
  --macos-primary: hsl(221, 100%, 50%);
  /* ... and more */
}

@media (prefers-color-scheme: dark) {
  :root {
    --macos-background: hsl(0, 0%, 7%);
    --macos-foreground: hsl(0, 0%, 100%);
  }
}
```

Use the Tailwind preset for utility classes:

```tsx
import { cn } from '@sylonik/macos-ui'

<div className={cn('bg-macos-background', 'text-macos-foreground')}>
  Content
</div>
```

## TypeScript Support

Full TypeScript support with strict mode enabled:

```tsx
import type {
  WindowProps,
  DockProps,
  MenuBarProps,
  DesktopIconProps,
} from '@sylonik/macos-ui'
```

## Accessibility

All components are built with accessibility in mind:

- **WCAG 2.1 AA** compliant
- **Keyboard Navigation** - Full keyboard support for all components
- **ARIA Attributes** - Proper roles, labels, and live regions
- **Focus Management** - Visible focus indicators and focus trapping where needed
- **Screen Readers** - Tested with VoiceOver, NVDA, and Jaws

Learn more in the [Accessibility Guide](https://sylonik.github.io/macos-ui/guides/accessibility).

## Contributing

We love contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Setting up development environment
- Creating new components
- Writing tests
- Submitting pull requests

## License

MIT License - see [LICENSE](LICENSE) for details.

## Security

Please report security vulnerabilities responsibly. See [SECURITY.md](SECURITY.md) for details.

## Community

- [GitHub Discussions](https://github.com/Sylonik/macos-ui/discussions) - Ask questions and share ideas
- [GitHub Issues](https://github.com/Sylonik/macos-ui/issues) - Report bugs and request features
- [Twitter](https://twitter.com/sylonik_) - Follow for updates

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.

---

Built with ❤️ by [Sylonik](https://github.com/Sylonik)
