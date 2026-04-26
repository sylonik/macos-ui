# Development Guide

This document provides guidance for developing and maintaining the `@sylonik/macos-ui` library.

## Development Setup

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Git**

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Sylonik/macos-ui.git
   cd macos-ui
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start development:
   ```bash
   # Library in watch mode
   pnpm dev

   # Documentation site
   pnpm docs:dev

   # Tests in watch mode
   pnpm test:watch
   ```

## Project Structure

```
.
├── src/                          # Source code
│   ├── components/               # React components
│   │   ├── window/               # Window component + WindowManager
│   │   ├── dock/                 # Dock component
│   │   ├── menu-bar/             # MenuBar component
│   │   └── desktop-icon/         # DesktopIcon component
│   ├── lib/                      # Utilities and theme
│   ├── styles/                   # CSS theme variables
│   ├── test/                     # Test setup and utilities
│   ├── index.ts                  # Main entry point
│   └── index.client.ts           # "use client" entry (Next.js)
├── cli/                          # CLI tool (npx macos-ui)
├── registry/                     # Component registry
├── docs-vitepress/               # VitePress documentation
├── e2e/                          # Playwright E2E tests
├── .github/                      # GitHub workflows and templates
├── package.json                  # npm package configuration
├── vite.config.ts                # Vite configuration
├── vitest.config.ts              # Vitest configuration
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
└── eslint.config.js              # ESLint configuration
```

## Available Commands

### Build & Development

| Command | Description |
|---------|-------------|
| `pnpm dev` | Build library in watch mode |
| `pnpm build` | Build library for production |
| `pnpm lint` | Check code style with ESLint |
| `pnpm type-check` | Run TypeScript type checking |

### Testing

| Command | Description |
|---------|-------------|
| `pnpm test` | Run all tests once |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Generate coverage report |

### Documentation

| Command | Description |
|---------|-------------|
| `pnpm docs:dev` | Start documentation dev server |
| `pnpm docs:build` | Build documentation for production |
| `pnpm docs:preview` | Preview built documentation |

## Testing

### Running Tests

All tests use **Vitest** with **React Testing Library** and **fast-check**.

```bash
# Run all tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Run specific test file
pnpm test src/components/window/window.test.tsx
```

### Test Structure

- **Unit tests** (`*.test.tsx`) - Component rendering, user interactions, props
- **Property-based tests** (`*.property.test.tsx`) - Invariants with randomly generated inputs
- **E2E tests** (`e2e/*.spec.ts`) - Documentation site behavior

### Writing Tests

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
  it('renders with label', () => {
    render(<MyComponent label="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<MyComponent label="Test" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
```

### Coverage Requirements

All code must maintain at least **80% coverage** across:
- Lines
- Functions
- Branches
- Statements

Run `pnpm test:coverage` to generate a coverage report in `./coverage/`.

## Code Style

### TypeScript

- **Strict mode** is enforced - no `any` types unless absolutely necessary
- Use `interface` for component props, `type` for unions/intersections
- Export types separately from implementations

### React Components

- Use `forwardRef` for components that render DOM elements
- Set `displayName` on all components
- Add `"use client"` directive for client-side components
- Support `className` prop for custom styling

### Formatting

ESLint and Prettier are configured. Run:

```bash
pnpm lint              # Check linting
pnpm lint --fix        # Auto-fix linting issues
```

### CSS & Tailwind

- Use the `cn()` utility for conditional class merging
- Use `class-variance-authority` (cva) for component variants
- Prefer CSS custom properties (`var(--macos-*)`) for theming

## Git Workflow

### Branch Naming

- Features: `feature/description`
- Bug fixes: `fix/description`
- Docs: `docs/description`
- Chores: `chore/description`

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(component): add new feature
fix(window): resolve drag issue
docs(menu-bar): add examples
test(dock): add property tests
```

### Pull Requests

1. Create a feature branch
2. Make changes and commit regularly
3. Update CHANGELOG.md
4. Push and create a PR
5. Wait for CI to pass
6. Request review
7. Merge when approved

## Release Process

### Creating a Release

1. Update version in `package.json` (e.g., `0.2.0` → `0.3.0`)
2. Update CHANGELOG.md with release notes
3. Commit: `git commit -am "chore: release v0.3.0"`
4. Create GitHub tag: `git tag v0.3.0`
5. Push: `git push origin main --tags`
6. GitHub Actions will automatically publish to npm

### Versioning

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** - Breaking changes (e.g., prop name changes, API changes)
- **MINOR** - New features (e.g., new components, new props)
- **PATCH** - Bug fixes, documentation, performance improvements

## Documentation

### Writing Component Docs

Create a file at `docs-vitepress/components/component-name.md`:

```markdown
---
title: ComponentName
description: Brief description of what the component does
---

# ComponentName

Description and use cases.

## Installation

\`\`\`bash
npx macos-ui add component-name
\`\`\`

## Basic Usage

\`\`\`tsx
import { ComponentName } from '@sylonik/macos-ui'

export function App() {
  return <ComponentName />
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prop1` | `string` | - | Description |
| `prop2` | `boolean` | `false` | Description |

## Examples

[Examples here]

## Accessibility

[A11y notes here]
```

### Building Docs

```bash
pnpm docs:build    # Build for production
pnpm docs:preview  # Preview the built docs
```

Docs are deployed to GitHub Pages automatically when pushing to `main`.

## Troubleshooting

### Port Already in Use

If `pnpm dev` fails with "port already in use":

```bash
# Change the port in vite.config.ts
# server.port: 7135
```

### Tests Failing After Changes

Clear cache and reinstall:

```bash
pnpm install --frozen-lockfile
pnpm test --clearCache
```

### Type Errors

Run type checking:

```bash
pnpm type-check
```

### Build Issues

Ensure dependencies are installed and up to date:

```bash
pnpm install
pnpm build
```

## Performance

### Bundle Size

Check bundle size after changes:

```bash
pnpm build
```

The output shows gzip sizes for each module. Aim to keep components under 3KB gzipped.

### Testing Performance

```bash
pnpm test:coverage
```

The coverage report helps identify code that isn't being tested.

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [VitePress Documentation](https://vitepress.dev/)
- [Vitest Documentation](https://vitest.dev/)

## Questions?

- Open a [GitHub Discussion](https://github.com/Sylonik/macos-ui/discussions)
- Check [Contributing Guidelines](CONTRIBUTING.md)
