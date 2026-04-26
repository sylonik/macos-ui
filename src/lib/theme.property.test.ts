import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { serializeTheme, deserializeTheme } from './theme'
import { themeConfigArbitrary, defaultPropertyTestConfig } from '../test/property-utils'

/**
 * Property-based tests for theme system
 */

describe('Theme Properties', () => {
  /**
   * **Feature: macos-component-library, Property 4: Theme configuration round-trip**
   * **Validates: Requirements 3.4, 3.5**
   * 
   * For any valid ThemeConfig object, serializing to JSON and then parsing back
   * SHALL produce an equivalent ThemeConfig object.
   */
  it('theme config survives JSON round-trip', () => {
    fc.assert(
      fc.property(themeConfigArbitrary, (config) => {
        // Serialize the theme config to JSON
        const serialized = serializeTheme(config)
        
        // Deserialize back to a ThemeConfig object
        const deserialized = deserializeTheme(serialized)
        
        // The deserialized config should be deeply equal to the original
        expect(deserialized).toEqual(config)
        
        return true
      }),
      defaultPropertyTestConfig
    )
  })
})
