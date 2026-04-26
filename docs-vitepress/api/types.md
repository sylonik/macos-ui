---
outline: deep
---

# Utility Types Reference

Generic utility types exported from `lib/types.ts` for use across the library and in your own code.

## `ComponentProps<T>`

Extracts props from a component type, excluding `ref`.

```ts
type ComponentProps<T extends ElementType> = ComponentPropsWithoutRef<T>
```

### Example

```ts
type ButtonProps = ComponentProps<'button'>
// Equivalent to React.ButtonHTMLAttributes<HTMLButtonElement>
```

## `PolymorphicComponentProps<E, P>`

Props for a polymorphic component that supports an `as` prop to change the underlying element.

```ts
type PolymorphicComponentProps<
  E extends ElementType,
  P = object
> = PropsWithChildren<P & ComponentPropsWithoutRef<E>> & {
  as?: E
}
```

### Example

```ts
type BoxProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, {
  variant?: 'primary' | 'secondary'
}>

// Usage: <Box as="section" variant="primary" />
```

## `PartialBy<T, K>`

Makes specific properties optional while keeping the rest required.

```ts
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
```

### Example

```ts
interface User {
  id: string
  name: string
  email: string
}

type CreateUserInput = PartialBy<User, 'id'>
// { name: string; email: string; id?: string }
```

## `RequiredBy<T, K>`

Makes specific properties required while keeping the rest as-is.

```ts
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
```

### Example

```ts
interface Config {
  theme?: string
  language?: string
  debug?: boolean
}

type RequiredConfig = RequiredBy<Config, 'theme'>
// { theme: string; language?: string; debug?: boolean }
```

## `ArrayElement<T>`

Extracts the element type from a readonly array type.

```ts
type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer E)[] ? E : never
```

### Example

```ts
const items = ['a', 'b', 'c'] as const
type Item = ArrayElement<typeof items>
// "a" | "b" | "c"
```

## `Mutable<T>`

Removes `readonly` from all properties of a type.

```ts
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

### Example

```ts
interface Frozen {
  readonly x: number
  readonly y: number
}

type Thawed = Mutable<Frozen>
// { x: number; y: number }
```

## `DeepPartial<T>`

Recursively makes all properties optional.

```ts
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
```

### Example

```ts
type PartialTheme = DeepPartial<ThemeConfig>
// All nested properties (colors.primary, radius.sm, etc.) are optional
```

## `VariantProps<T>`

Extracts the first parameter type from a variant function (e.g., from `class-variance-authority`).

```ts
type VariantProps<T extends (...args: unknown[]) => unknown> = Parameters<T>[0]
```

### Example

```ts
import { cva } from 'class-variance-authority'

const buttonVariants = cva('px-4 py-2', {
  variants: {
    size: { sm: 'text-sm', md: 'text-base', lg: 'text-lg' },
  },
})

type ButtonVariants = VariantProps<typeof buttonVariants>
// { size?: 'sm' | 'md' | 'lg' }
```

## See Also

- [Components API](/api/components) — Component-specific type definitions.
- [Theme API](/api/theme) — Theme interface definitions.
