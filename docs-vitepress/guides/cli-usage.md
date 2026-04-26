---
outline: deep
---

# CLI Usage

The `macos-ui` CLI is the primary way to install and manage components in your project. It copies component source code directly into your project, so you own and control every line.

## Overview

```bash
npx macos-ui <command> [options]
```

| Command | Description |
|---|---|
| `init` | Initialize macos-ui configuration in your project. |
| `add` | Add one or more components to your project. |
| `diff` | Check for differences between local and registry components (planned). |

## `init`

Initializes your project for use with macOS UI components.

```bash
npx macos-ui init
```

### What it does

1. **Creates `macos-ui.config.json`** — Configuration file that tells the CLI where to place components and how to resolve paths.
2. **Updates Tailwind configuration** — Adds the macOS UI preset to your `tailwind.config.ts`.
3. **Copies theme CSS** — Installs `styles/theme.css` with all `--macos-*` CSS custom properties.
4. **Installs dependencies** — Adds required peer dependencies (`clsx`, `tailwind-merge`).

### Options

| Option | Short | Description |
|---|---|---|
| `--yes` | `-y` | Skip all interactive prompts and use default values. |

### Example

```bash
# Interactive setup
npx macos-ui init

# Non-interactive setup with defaults
npx macos-ui init -y
```

## `add`

Adds one or more components to your project by copying their source files.

```bash
npx macos-ui add [components...]
```

### Arguments

| Argument | Description |
|---|---|
| `components` | Space-separated list of component names to install. |

Available component names:
- `window` — Window + WindowManager + types
- `dock` — Dock + types
- `menu-bar` — MenuBar + types
- `desktop-icon` — DesktopIcon + types

### Options

| Option | Short | Default | Description |
|---|---|---|---|
| `--all` | `-a` | — | Install all available components. |
| `--overwrite` | `-o` | — | Overwrite existing files without prompting. |
| `--path <path>` | `-p` | `src/components` | Custom destination directory for component files. |

### Examples

```bash
# Add a single component
npx macos-ui add window

# Add multiple components
npx macos-ui add window dock menu-bar desktop-icon

# Add all components
npx macos-ui add --all

# Overwrite existing files
npx macos-ui add window --overwrite

# Custom output path
npx macos-ui add window --path lib/components
```

### Dependency Resolution

When you add a component, the CLI automatically resolves:

1. **Registry dependencies** — Other components or utilities required by the component. For example, all components depend on the `utils` registry entry (`cn()` function). The Window component's transitive dependencies are resolved automatically.

2. **npm dependencies** — Packages that need to be installed via your package manager. For example:
   - `window` requires `@dnd-kit/core` and `@dnd-kit/utilities`
   - `dock`, `menu-bar`, `desktop-icon` require `class-variance-authority`
   - All components require `clsx` and `tailwind-merge` (via the `utils` dependency)

### File Structure

After running `npx macos-ui add --all`, your project will contain:

```
src/
├── components/
│   ├── window/
│   │   ├── window.tsx           # Window component
│   │   ├── window-manager.tsx   # WindowManagerProvider + useWindowManager
│   │   ├── window.types.ts      # TypeScript interfaces
│   │   └── index.ts             # Barrel export
│   ├── dock/
│   │   ├── dock.tsx             # Dock component
│   │   ├── dock.types.ts        # TypeScript interfaces
│   │   └── index.ts             # Barrel export
│   ├── menu-bar/
│   │   ├── menu-bar.tsx         # MenuBar component
│   │   ├── menu-bar.types.ts    # TypeScript interfaces
│   │   └── index.ts             # Barrel export
│   └── desktop-icon/
│       ├── desktop-icon.tsx     # DesktopIcon component
│       ├── desktop-icon.types.ts # TypeScript interfaces
│       └── index.ts             # Barrel export
└── lib/
    └── utils.ts                 # cn() utility function
```

## `diff`

::: info Planned Feature
The `diff` command is planned for a future release. It will compare your local component files against the registry versions and show what has changed.
:::

```bash
npx macos-ui diff [component]
```

This will be useful for:
- Seeing what upstream changes are available
- Deciding whether to update your local copies
- Reviewing changes before applying them with `add --overwrite`

## Component Registry

The CLI reads component definitions from a registry file (`registry/components.json`). Each entry defines:

```ts
interface ComponentDefinition {
  name: string                    // Component identifier
  description: string             // Human-readable description
  category: string                // Category (desktop, window, ui, hooks, lib)
  files: FileDefinition[]         // Files to copy
  dependencies: string[]          // npm dependencies
  devDependencies: string[]       // npm devDependencies
  registryDependencies: string[]  // Other registry components required
}
```

When you run `add`, the CLI:

1. Looks up the component in the registry.
2. Resolves all `registryDependencies` recursively.
3. Copies all files to the configured output paths.
4. Installs any npm `dependencies` and `devDependencies`.
5. Skips files that already exist (unless `--overwrite` is set).

## See Also

- [Installation](/getting-started/installation) — Step-by-step installation guide.
- [Configuration](/getting-started/configuration) — `macos-ui.config.json` reference.
