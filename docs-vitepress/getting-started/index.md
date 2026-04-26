---
outline: deep
---

# Introduction

**@sylonik/macos-ui** is a collection of macOS-style React components that you copy and paste into your project. It provides pixel-perfect recreations of core macOS interface elements — Window, Dock, MenuBar, and DesktopIcon — built with TypeScript and Tailwind CSS.

## Philosophy

This library follows the **copy-paste** approach pioneered by [shadcn/ui](https://ui.shadcn.com). Instead of installing an opaque npm package that you depend on at runtime, you use the CLI to copy component source code directly into your project.

**You own the code.** Every component lands in your `src/components` directory as plain TypeScript and Tailwind CSS. You can read it, modify it, extend it, or delete parts you don't need. There is no runtime dependency on `@sylonik/macos-ui` itself — only on peer dependencies like React and the small utilities (`clsx`, `tailwind-merge`, `class-variance-authority`) that are installed alongside the components.

### Why not just another component library?

Traditional component libraries give you a black box. When you need to change a padding value, override an animation, or adjust a color in a state you didn't anticipate, you fight with CSS specificity, wrapper components, or monkey-patching. With `@sylonik/macos-ui`:

- You **control the source** — every line of every component is in your repo.
- There are **no version-upgrade breakages** — you upgrade on your terms by re-running `add` with `--overwrite` or by using `diff` to see what changed.
- You can **tree-shake naturally** — unused components are never bundled because they are just files in your project.

## Key Features

| Feature | Details |
|---|---|
| **TypeScript** | Strict mode, exported interfaces for all props, full IntelliSense support. |
| **Tailwind CSS** | Styled entirely with Tailwind utilities. Ships a preset that adds `macos-*` color, radius, blur, and shadow utilities. |
| **Accessible** | WCAG 2.1 AA compliant. Proper ARIA attributes, keyboard navigation, focus trapping, and screen reader support. |
| **Tested** | 76+ tests: unit tests (Vitest), property-based tests (fast-check), and E2E tests (Playwright). 80% code coverage enforced. |
| **Themeable** | CSS custom properties system with light and dark mode. Override variables or use the programmatic `applyTheme()` API. |
| **CLI** | `npx macos-ui init` to scaffold, `npx macos-ui add <component>` to install individual components with automatic dependency resolution. |

## Prerequisites

Before using `@sylonik/macos-ui`, make sure your project meets these requirements:

- **Node.js** 18 or later
- **React** 18 or 19
- **Tailwind CSS** v3 or v4 configured in your project

## Available Components

| Component | Description |
|---|---|
| [Window](/components/window) | Draggable, resizable macOS-style window with traffic light buttons (close, minimize, maximize), focus management, and keyboard accessibility. |
| [WindowManager](/components/window-manager) | Context provider and hook for managing multiple windows — z-index stacking, open/close/minimize/maximize/restore, position and size updates. |
| [Dock](/components/dock) | App launcher bar with mouse-proximity magnification effect, running indicators, badge support, and configurable position (bottom, left, right). |
| [MenuBar](/components/menu-bar) | System-level navigation bar with dropdown menus, keyboard navigation (ArrowUp/Down, Escape), shortcut labels, submenus, and a customizable right-side status area. |
| [DesktopIcon](/components/desktop-icon) | Clickable desktop icons with selection state, single/double-click handlers, keyboard support (Enter, Space), and customizable colors. |

## Next Steps

- [Installation](/getting-started/installation) — Set up the CLI and add components to your project.
- [Quick Start](/getting-started/quick-start) — Build a working macOS-style layout in 5 minutes.
- [Configuration](/getting-started/configuration) — Customize themes, colors, and Tailwind integration.
