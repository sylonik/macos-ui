import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react'

/**
 * Extract props from a component type
 */
export type ComponentProps<T extends ElementType> = ComponentPropsWithoutRef<T>

/**
 * Polymorphic component props that allow changing the underlying element
 */
export type PolymorphicComponentProps<
  E extends ElementType,
  P = object
> = PropsWithChildren<P & ComponentPropsWithoutRef<E>> & {
  as?: E
}

/**
 * Utility type for making specific props optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Utility type for making specific props required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * Extract the value type from a readonly array
 */
export type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer E)[] ? E : never

/**
 * Make all properties in T mutable (remove readonly)
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * Deep partial type
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

/**
 * Utility type for component variant props
 */
export type VariantProps<T extends (...args: unknown[]) => unknown> = Parameters<T>[0]
