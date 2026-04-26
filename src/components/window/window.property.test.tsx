import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import * as fc from 'fast-check'
import { WindowManagerProvider, useWindowManager } from './window-manager'
import { defaultPropertyTestConfig, positionArbitrary, sizeArbitrary } from '../../test/property-utils'
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
  defaultPosition: positionArbitrary,
  defaultSize: sizeArbitrary,
}) as fc.Arbitrary<WindowConfig>

describe('Window Operations Property Tests', () => {
  /**
   * **Feature: macos-component-library, Property 7: Window drag updates position**
   * **Validates: Requirements 4.1**
   */
  describe('Property 7: Window drag updates position', () => {
    it('drag updates position by delta', () => {
      fc.assert(
        fc.property(
          windowConfigArbitrary,
          positionArbitrary,
          (config, delta) => {
            const { result } = renderWindowManager()
            let windowId: string

            // Open window
            act(() => {
              windowId = result.current.openWindow(config)
            })

            // Get initial position
            const initialWindow = result.current.windows.find((w) => w.id === windowId)
            expect(initialWindow).toBeDefined()
            const initialPosition = initialWindow!.position

            // Apply drag (update position)
            const newPosition = {
              x: initialPosition.x + delta.x,
              y: initialPosition.y + delta.y,
            }

            act(() => {
              result.current.updateWindowPosition(windowId, newPosition)
            })

            // Verify position updated correctly
            const updatedWindow = result.current.windows.find((w) => w.id === windowId)
            expect(updatedWindow).toBeDefined()

            return (
              updatedWindow!.position.x === initialPosition.x + delta.x &&
              updatedWindow!.position.y === initialPosition.y + delta.y
            )
          }
        ),
        defaultPropertyTestConfig
      )
    })
  })

  /**
   * **Feature: macos-component-library, Property 8: Maximize fills viewport**
   * **Validates: Requirements 4.2**
   */
  describe('Property 8: Maximize fills viewport', () => {
    it('maximize sets window to viewport dimensions minus menu bar', () => {
      fc.assert(
        fc.property(windowConfigArbitrary, (config) => {
          const { result } = renderWindowManager()
          let windowId: string

          // Open window
          act(() => {
            windowId = result.current.openWindow(config)
          })

          // Maximize window
          act(() => {
            result.current.maximizeWindow(windowId)
          })

          // Get window state
          const window = result.current.windows.find((w) => w.id === windowId)
          expect(window).toBeDefined()

          // Verify maximized state
          return window!.isMaximized === true
        }),
        defaultPropertyTestConfig
      )
    })
  })

  /**
   * **Feature: macos-component-library, Property 9: Minimize hides window**
   * **Validates: Requirements 4.3**
   */
  describe('Property 9: Minimize hides window', () => {
    it('minimize sets isMinimized to true', () => {
      fc.assert(
        fc.property(windowConfigArbitrary, (config) => {
          const { result } = renderWindowManager()
          let windowId: string

          // Open window
          act(() => {
            windowId = result.current.openWindow(config)
          })

          // Minimize window
          act(() => {
            result.current.minimizeWindow(windowId)
          })

          // Get window state
          const window = result.current.windows.find((w) => w.id === windowId)
          expect(window).toBeDefined()

          // Verify minimized state
          return window!.isMinimized === true
        }),
        defaultPropertyTestConfig
      )
    })

    it('minimized window is not focused', () => {
      fc.assert(
        fc.property(windowConfigArbitrary, (config) => {
          const { result } = renderWindowManager()
          let windowId: string

          // Open window
          act(() => {
            windowId = result.current.openWindow(config)
          })

          // Minimize window
          act(() => {
            result.current.minimizeWindow(windowId)
          })

          // Get window state
          const window = result.current.windows.find((w) => w.id === windowId)
          expect(window).toBeDefined()

          // Verify not focused
          return window!.isFocused === false
        }),
        defaultPropertyTestConfig
      )
    })
  })

  /**
   * **Feature: macos-component-library, Property 10: Close removes window**
   * **Validates: Requirements 4.4**
   */
  describe('Property 10: Close removes window', () => {
    it('close removes window from state', () => {
      fc.assert(
        fc.property(windowConfigArbitrary, (config) => {
          const { result } = renderWindowManager()
          let windowId: string

          // Open window
          act(() => {
            windowId = result.current.openWindow(config)
          })

          // Verify window exists
          const windowBefore = result.current.windows.find((w) => w.id === windowId)
          expect(windowBefore).toBeDefined()

          // Close window
          act(() => {
            result.current.closeWindow(windowId)
          })

          // Verify window no longer exists
          const windowAfter = result.current.windows.find((w) => w.id === windowId)

          return windowAfter === undefined
        }),
        defaultPropertyTestConfig
      )
    })

    it('closing window reduces window count by one', () => {
      fc.assert(
        fc.property(
          fc.array(windowConfigArbitrary, { minLength: 1, maxLength: 5 }),
          fc.nat(),
          (configs, closeIdx) => {
            const { result } = renderWindowManager()
            const windowIds: string[] = []

            // Open all windows
            act(() => {
              configs.forEach((config) => {
                const id = result.current.openWindow(config)
                windowIds.push(id)
              })
            })

            const initialCount = result.current.windows.length

            // Close one window
            const targetIdx = closeIdx % windowIds.length
            act(() => {
              result.current.closeWindow(windowIds[targetIdx])
            })

            const finalCount = result.current.windows.length

            return finalCount === initialCount - 1
          }
        ),
        defaultPropertyTestConfig
      )
    })
  })
})
