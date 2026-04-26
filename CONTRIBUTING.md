# Contributing to @sylonik/macos-ui

Thank you for your interest in contributing to macOS UI! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Adding a New Component](#adding-a-new-component)
- [Testing](#testing)
- [Documentation](#documentation)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [support@sylonik.dev](mailto:support@sylonik.dev).

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/macos-ui.git
   cd macos-ui
   ```
3. **Install** dependencies:
   ```bash
   pnpm install
   ```
4. **Create** a feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```

## Development Setup

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **React** 18.x or 19.x (peer dependency)

### Commands

```bash
# Start library in watch mode (rebuilds on changes)
pnpm dev

# Build the library for production
pnpm build

# Run unit and property-based tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Lint the codebase
pnpm lint

# Type check without emitting
pnpm type-check

# Start documentation dev server
pnpm docs:dev

# Build documentation for production
pnpm docs:build
```

## Project Structure

```
macos-ui/
├── src/
│   ├── components/          # React components
│   │   ├── window/          # Window + WindowManager
│   │   ├── dock/            # Dock with magnification
│   │   ├── menu-bar/        # MenuBar with dropdowns
│   │   └── desktop-icon/    # DesktopIcon with selection
│   ├── lib/                 # Utilities, theme, types
│   ├── styles/              # CSS theme variables
│   ├── test/                # Test utilities and setup
│   ├── index.ts             # Main export barrel
│   └── index.client.ts      # "use client" re-export
├── cli/                     # CLI tool (npx macos-ui)
├── registry/                # Component registry for CLI
├── docs/                    # VitePress documentation
├── e2e/                     # Playwright E2E tests
└── tailwind.preset.js       # Tailwind CSS preset
```

## Making Changes

### Code Style

- **TypeScript**: Strict mode is enabled. All code must be fully typed.
- **ESLint**: Run `pnpm lint` before committing. Configuration is in `eslint.config.js`.
- **Prettier**: Code is formatted with Prettier. Configuration is in `.prettierrc`.
- **Naming**: Use PascalCase for components, camelCase for functions/variables, UPPER_SNAKE_CASE for constants.
- **Comments**: Use JSDoc for all public APIs. Internal implementation comments should explain *why*, not *what*.

### Component Guidelines

- All components must support `className` prop for custom styling
- Use `forwardRef` for components that render DOM elements
- Set `displayName` on all components
- Add `"use client"` directive for components using React hooks or browser APIs
- Use `class-variance-authority` (cva) for variant-based styling
- Use the `cn()` utility for merging Tailwind classes
- All components must be accessible (WCAG 2.1 AA)

## Adding a New Component

1. Create the component directory:
   ```
   src/components/my-component/
   ├── my-component.tsx              # Implementation
   ├── my-component.types.ts         # TypeScript types
   ├── my-component.test.tsx         # Unit tests
   ├── my-component.property.test.tsx # Property-based tests
   └── index.ts                      # Public exports
   ```

2. Follow the existing component patterns:
   ```tsx
   "use client"
   
   import { forwardRef } from 'react'
   import { cn } from '@/lib/utils'
   import type { MyComponentProps } from './my-component.types'
   
   const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
     ({ className, ...props }, ref) => {
       return (
         <div ref={ref} className={cn('base-classes', className)} {...props} />
       )
     }
   )
   MyComponent.displayName = 'MyComponent'
   
   export { MyComponent }
   ```

3. Export from `src/index.ts`:
   ```ts
   export * from './components/my-component'
   ```

4. Add to the component registry (`registry/components.json`)

5. Write documentation in `docs/components/my-component.md`

6. Write tests with at least 80% coverage

## Testing

### Test Structure

We use three levels of testing:

1. **Unit tests** (`*.test.tsx`) - Test component rendering, user interactions, and accessibility
2. **Property-based tests** (`*.property.test.tsx`) - Test invariants with randomly generated inputs using [fast-check](https://github.com/dubzzz/fast-check)
3. **E2E tests** (`e2e/*.spec.ts`) - Test documentation site behavior with [Playwright](https://playwright.dev/)

### Writing Tests

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
  it('renders with default props', () => {
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

### Property-Based Tests

```tsx
import { describe, it, expect } from 'vitest'
import { fc } from 'fast-check'
import { render, screen } from '@testing-library/react'
import { MyComponent } from './my-component'

describe('MyComponent Properties', () => {
  it('always renders the label text', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1, maxLength: 100 }), (label) => {
        const { unmount } = render(<MyComponent label={label} />)
        expect(screen.getByText(label)).toBeInTheDocument()
        unmount()
      })
    )
  })
})
```

### Coverage Requirements

All code must maintain at least **80% coverage** across:
- Lines
- Functions
- Branches
- Statements

## Documentation

When adding or modifying components, update the documentation:

1. **Component page** (`docs/components/my-component.md`):
   - Description and use cases
   - Installation instructions
   - Props table with types, defaults, and descriptions
   - Code examples (basic usage, variants, advanced)
   - Accessibility notes

2. **API reference** (`docs/api/components.md`):
   - Add the component's TypeScript interface

3. **Sidebar navigation** (`.vitepress/config.ts`):
   - Add the component to the sidebar

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, no logic change) |
| `refactor` | Code refactoring (no feature/fix) |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `build` | Build system or dependency changes |
| `ci` | CI/CD configuration changes |
| `chore` | Other maintenance tasks |

### Examples

```
feat(dock): add vertical orientation support
fix(window): resolve drag position offset on scroll
docs(menu-bar): add keyboard navigation examples
test(desktop-icon): add property tests for selection
```

## Pull Request Process

1. **Update** CHANGELOG.md with your changes under `[Unreleased]`
2. **Ensure** all tests pass: `pnpm test`
3. **Ensure** no lint errors: `pnpm lint`
4. **Ensure** types check: `pnpm type-check`
5. **Write** a clear PR description explaining:
   - What changed and why
   - How to test the changes
   - Screenshots for visual changes
6. **Request** review from maintainers
7. **Address** review feedback promptly

### PR Title Format

Follow the same convention as commits:
```
feat(component): add new feature
fix(window): resolve drag issue
```

## Questions?

- Open a [GitHub Discussion](https://github.com/Sylonik/macos-ui/discussions)
- File an [Issue](https://github.com/Sylonik/macos-ui/issues)

Thank you for contributing!

