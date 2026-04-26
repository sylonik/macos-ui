---
outline: deep
---

# Installation

## Using the CLI (Recommended)

The fastest way to get started is with the `macos-ui` CLI. It scaffolds configuration files and copies component source code into your project.

### Step 1: Initialize your project

```bash
npx macos-ui init
```

This interactive command will:

1. Create a `macos-ui.config.json` configuration file in your project root.
2. Add or update your `tailwind.config.ts` to include the macOS UI preset.
3. Copy the theme CSS file (`styles/theme.css`) into your project.
4. Install required peer dependencies (`clsx`, `tailwind-merge`).

To skip all prompts and accept defaults:

```bash
npx macos-ui init -y
```

### Step 2: Add components

Install individual components by name:

```bash
npx macos-ui add window
npx macos-ui add dock
npx macos-ui add menu-bar
npx macos-ui add desktop-icon
```

You can install multiple components at once:

```bash
npx macos-ui add window dock menu-bar desktop-icon
```

Or install every available component:

```bash
npx macos-ui add --all
```

### CLI Options for `add`

| Option | Short | Description |
|---|---|---|
| `--all` | `-a` | Install all available components. |
| `--overwrite` | `-o` | Overwrite existing component files without prompting. |
| `--path <path>` | `-p` | Custom destination directory for components. Defaults to `src/components`. |

### What gets installed

When you run `npx macos-ui add window`, the CLI:

1. Resolves the component from the registry.
2. Resolves transitive registry dependencies (e.g., `window` depends on `utils`).
3. Copies all component files into your project under `src/components/window/`.
4. Copies shared dependencies (e.g., `src/lib/utils.ts`) if they don't already exist.
5. Installs any required npm dependencies (e.g., `clsx`, `tailwind-merge`, `@dnd-kit/core`).

## Manual Installation

If you prefer not to use the CLI, you can set things up manually.

### 1. Install peer dependencies

::: code-group

```bash [npm]
npm install clsx tailwind-merge class-variance-authority
```

```bash [pnpm]
pnpm add clsx tailwind-merge class-variance-authority
```

```bash [yarn]
yarn add clsx tailwind-merge class-variance-authority
```

:::

For the Window component, you also need:

::: code-group

```bash [npm]
npm install @dnd-kit/core @dnd-kit/utilities
```

```bash [pnpm]
pnpm add @dnd-kit/core @dnd-kit/utilities
```

```bash [yarn]
yarn add @dnd-kit/core @dnd-kit/utilities
```

:::

### 2. Configure Tailwind CSS

Add the macOS UI preset to your Tailwind configuration:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  presets: [require('@sylonik/macos-ui/tailwind.preset')],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  // ... your config
} satisfies Config
```

If you copied the preset file manually, reference the local path instead:

```ts
presets: [require('./macos-ui.preset')],
```

### 3. Import the theme CSS

Add the theme CSS import to your application's entry point (e.g., `main.tsx` or `globals.css`):

```css
/* In your global CSS file */
@import './styles/theme.css';
```

Or in your entry TypeScript file:

```tsx
// main.tsx
import './styles/theme.css'
```

This loads all `--macos-*` CSS custom properties and sets up light/dark mode defaults.

### 4. Copy component files

Copy the component source files from the `@sylonik/macos-ui` package `src/` directory into your project. The expected structure is:

```
src/
├── components/
│   ├── window/
│   │   ├── window.tsx
│   │   ├── window-manager.tsx
│   │   ├── window.types.ts
│   │   └── index.ts
│   ├── dock/
│   │   ├── dock.tsx
│   │   ├── dock.types.ts
│   │   └── index.ts
│   ├── menu-bar/
│   │   ├── menu-bar.tsx
│   │   ├── menu-bar.types.ts
│   │   └── index.ts
│   └── desktop-icon/
│       ├── desktop-icon.tsx
│       ├── desktop-icon.types.ts
│       └── index.ts
├── lib/
│   ├── utils.ts
│   ├── theme.ts
│   └── theme.types.ts
└── styles/
    └── theme.css
```

## Verifying the Installation

After installation, verify everything works by importing a component:

```tsx
import { Window } from './components/window'
import { WindowManagerProvider } from './components/window/window-manager'

function App() {
  return (
    <WindowManagerProvider>
      <Window id="test" title="Hello">
        <p>Installation successful!</p>
      </Window>
    </WindowManagerProvider>
  )
}
```

If the window renders with a title bar, traffic light buttons, and your content, the installation is complete.
