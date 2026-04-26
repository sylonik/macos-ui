import * as fc from 'fast-check'

/**
 * Arbitrary generators for property-based testing
 */

/**
 * Generate arbitrary position coordinates
 */
export const positionArbitrary = fc.record({
  x: fc.integer({ min: -1000, max: 5000 }),
  y: fc.integer({ min: -1000, max: 5000 }),
})

/**
 * Generate arbitrary size dimensions
 */
export const sizeArbitrary = fc.record({
  width: fc.integer({ min: 100, max: 2000 }),
  height: fc.integer({ min: 100, max: 2000 }),
})

/**
 * Generate arbitrary window IDs
 */
export const windowIdArbitrary = fc.string({ minLength: 1, maxLength: 20 })

/**
 * Generate arbitrary color strings (hex format)
 */
export const colorArbitrary = fc
  .array(fc.integer({ min: 0, max: 15 }), { minLength: 6, maxLength: 6 })
  .map((arr) => '#' + arr.map((n) => n.toString(16)).join(''))

/**
 * Generate arbitrary non-empty strings
 */
export const nonEmptyStringArbitrary = fc.string({ minLength: 1, maxLength: 100 })

/**
 * Generate arbitrary theme configuration
 */
export const themeConfigArbitrary = fc.record({
  colors: fc.record({
    background: colorArbitrary,
    foreground: colorArbitrary,
    primary: colorArbitrary,
    secondary: colorArbitrary,
    accent: colorArbitrary,
    muted: colorArbitrary,
    border: colorArbitrary,
    windowBackground: colorArbitrary,
    windowBorder: colorArbitrary,
    dockBackground: colorArbitrary,
    menuBarBackground: colorArbitrary,
  }),
  radius: fc.record({
    sm: fc.constantFrom('0.125rem', '0.25rem', '0.375rem'),
    md: fc.constantFrom('0.375rem', '0.5rem', '0.625rem'),
    lg: fc.constantFrom('0.5rem', '0.75rem', '1rem'),
    window: fc.constantFrom('0.5rem', '0.75rem', '1rem'),
    dock: fc.constantFrom('0.75rem', '1rem', '1.25rem'),
  }),
  blur: fc.record({
    window: fc.constantFrom('8px', '12px', '16px'),
    dock: fc.constantFrom('8px', '12px', '16px'),
    menuBar: fc.constantFrom('8px', '12px', '16px'),
  }),
  shadows: fc.record({
    window: nonEmptyStringArbitrary,
    windowActive: nonEmptyStringArbitrary,
    dock: nonEmptyStringArbitrary,
  }),
})

/**
 * Default property test configuration
 */
export const defaultPropertyTestConfig = {
  numRuns: 100,
  verbose: false,
}
