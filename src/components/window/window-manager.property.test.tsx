import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import * as fc from 'fast-check'
import { WindowManagerProvider, useWindowManager } from './window-manager'
import { defaultPropertyTestConfig } from '../../test/property-utils'
import type { WindowConfig } from './window.types'

/**
 * Helper to render the WindowManager hook
 */
function renderWindowManager() {
  return renderHook(() => useWindowManager(), {
    wrapper: WindowManagerProvider,
  })
}

/**
 * Generate arbitrary window configuration
 */
const windowConfigArbitrary = fc.record({
  appId: fc.string({ minLength: 1, maxLength: 20 }),
  title: fc.string({ minLength: 1, maxLength: 50 }),
  defaultPosition: fc.record({
    x: fc.integer({ min: 0, max: 1000 }),
    y: fc.integer({ min: 0, max: 1000 }),
  }),
  defaultSize: fc.record({
    width: fc.integer({ min: 200, max: 1000 }),
    height: fc.integer({ min: 200, max: 800 }),
  }),
}) as fc.Arbitrary<WindowConfig>

describe('WindowManager Property Tests', () => {
  /**
   * **Feature: macos-component-library, Property 11: Z-index ordering invariant**
   * **Validates: Requirements 4.5, 4.6**
   */
  describe('Property 11: Z-index ordering invariant', () => {
    it('focused window has highest z-index', () => {
      fc.assert(
        fc.property(
          fc.array(windowConfigArbitrary, { minLength: 1, maxLength: 10 }),
          fc.nat(),
          (configs, focusIdx) => {
            const { result } = renderWindowManager()
            const windowIds: string[] = []

            // Open all windows
            act(() => {
              configs.forEach((config) => {
                const id = result.current.openWindow(config)
                windowIds.push(id)
              })
            })

            // Focus a specific window
            const targetIdx = focusIdx % windowIds.length
            const targetId = windowIds[targetIdx]

            act(() => {
              result.current.focusWindow(targetId)
            })

            // Get the focused window
            const focusedWindow = result.current.windows.find((w) => w.id === targetId)
            expect(focusedWindow).toBeDefined()

            // Verify focused window has highest z-index
            const allZIndices = result.current.windows.map((w) => w.zIndex)
            const maxZIndex = Math.max(...allZIndices)

            return focusedWindow!.zIndex === maxZIndex
          }
        ),
        defaultPropertyTestConfig
      )
    })

    it('z-indices are unique', () => {
      fc.assert(
        fc.property(
          fc.array(windowConfigArbitrary, { minLength: 2, maxLength: 10 }),
          (configs) => {
            const { result } = renderWindowManager()

            // Open all windows
            act(() => {
              configs.forEach((config) => {
                result.current.openWindow(config)
              })
            })

            // Get all z-indices
            const zIndices = result.current.windows.map((w) => w.zIndex)
            const uniqueZIndices = new Set(zIndices)

            // All z-indices should be unique
            return zIndices.length === uniqueZIndices.size
          }
        ),
        defaultPropertyTestConfig
      )
    })

    it('only one window is focused at a time', () => {
      fc.assert(
        fc.property(
          fc.array(windowConfigArbitrary, { minLength: 2, maxLength: 10 }),
          fc.nat(),
          (configs, focusIdx) => {
            const { result } = renderWindowManager()
            const windowIds: string[] = []

            // Open all windows
            act(() => {
              configs.forEach((config) => {
                const id = result.current.openWindow(config)
                windowIds.push(id)
              })
            })

            // Focus a specific window
            const targetIdx = focusIdx % windowIds.length
            act(() => {
              result.current.focusWindow(windowIds[targetIdx])
            })

            // Count focused windows
            const focusedCount = result.current.windows.filter((w) => w.isFocused).length

            return focusedCount === 1
          }
        ),
        defaultPropertyTestConfig
      )
    })
  })
})
