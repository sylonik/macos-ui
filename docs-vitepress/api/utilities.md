---
outline: deep
---

# Utilities API Reference

## `cn()`

Merges Tailwind CSS class names with deduplication and conditional support.

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]): string
```

Combines `clsx` for conditional classes with `tailwind-merge` for conflict resolution.

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `...inputs` | `ClassValue[]` | Class values — strings, arrays, objects, or falsy values. |

### Returns

`string` — The merged and deduplicated class string.

### Examples

```ts
cn('px-2 py-1', 'px-4')
// => 'py-1 px-4'  (px-4 wins over px-2)

cn('text-red-500', condition && 'text-blue-500')
// => 'text-blue-500' if condition is true, 'text-red-500' if false

cn('flex items-center', className)
// Merge with user-provided className prop
```

---

## `serializeTheme()`

Serializes a `ThemeConfig` object to a JSON string.

```ts
function serializeTheme(config: ThemeConfig): string
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `config` | `ThemeConfig` | Theme configuration to serialize. |

### Returns

`string` — JSON string (pretty-printed with 2-space indent).

### Example

```ts
import { serializeTheme } from '@/lib/theme'
import { defaultTheme } from '@/lib/theme.types'

const json = serializeTheme(defaultTheme)
localStorage.setItem('macos-theme', json)
```

---

## `deserializeTheme()`

Parses a JSON string into a `ThemeConfig` object.

```ts
function deserializeTheme(json: string): ThemeConfig
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `json` | `string` | JSON string to parse. |

### Returns

`ThemeConfig` — Parsed theme configuration.

### Throws

- `Error` if the JSON is invalid.
- `Error` with message `"Invalid theme configuration: missing required properties"` if the parsed object is missing `colors`, `radius`, `blur`, or `shadows`.

### Example

```ts
import { deserializeTheme, applyTheme } from '@/lib/theme'

const saved = localStorage.getItem('macos-theme')
if (saved) {
  const theme = deserializeTheme(saved)
  applyTheme(theme)
}
```

---

## `mergeWithDefaults()`

Merges a partial theme configuration with the `defaultTheme`, filling in missing values.

```ts
function mergeWithDefaults(partial: Partial<ThemeConfig>): ThemeConfig
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `partial` | `Partial<ThemeConfig>` | Partial theme configuration. Missing properties use defaults. |

### Returns

`ThemeConfig` — Complete theme configuration with all properties populated.

### Example

```ts
import { mergeWithDefaults } from '@/lib/theme'

const theme = mergeWithDefaults({
  colors: { primary: 'hsl(262 83% 58%)' },
})
// theme.colors.background === 'hsl(0 0% 100%)' (from default)
// theme.colors.primary === 'hsl(262 83% 58%)' (overridden)
// theme.radius, theme.blur, theme.shadows all use defaults
```

---

## `applyTheme()`

Applies a `ThemeConfig` to CSS custom properties on a root element.

```ts
function applyTheme(config: ThemeConfig, root?: HTMLElement): void
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `config` | `ThemeConfig` | — | Theme configuration to apply. |
| `root` | `HTMLElement` | `document.documentElement` | Element to set CSS custom properties on. |

### Example

```ts
import { applyTheme, mergeWithDefaults } from '@/lib/theme'

// Apply globally
applyTheme(mergeWithDefaults({ colors: { primary: 'hsl(262 83% 58%)' } }))

// Apply to a specific element (scoped theming)
const container = document.getElementById('my-app')!
applyTheme(myTheme, container)
```

---

## `getTheme()`

Reads the current theme from computed CSS custom properties.

```ts
function getTheme(root?: HTMLElement): ThemeConfig
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `root` | `HTMLElement` | `document.documentElement` | Element to read CSS custom properties from. |

### Returns

`ThemeConfig` — Current theme values read from computed styles.

### Example

```ts
import { getTheme } from '@/lib/theme'

const current = getTheme()
console.log(current.colors.primary) // "hsl(221.2 83.2% 53.3%)"
console.log(current.blur.dock)      // "40px"
```

## See Also

- [Theme API](/api/theme) — Theme type definitions and default values.
- [Theming Guide](/guides/theming) — Usage examples and custom theme creation.
