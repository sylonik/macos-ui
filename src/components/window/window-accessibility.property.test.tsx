import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as fc from 'fast-check'
import { WindowManagerProvider } from './window-manager'
import { Window } from './window'
import { defaultPropertyTestConfig } from '../../test/property-utils'

/**
 * Generate arbitrary window props with valid IDs (no special characters for CSS selectors)
 */
const windowPropsArbitrary = fc.record({
  id: fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9-_]*$/),
  title: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
  defaultPosition: fc.record({
    x: fc.integer({ min: 0, max: 1000 }),
    y: fc.integer({ min: 0, max: 1000 }),
  }),
  defaultSize: fc.record({
    width: fc.integer({ min: 200, max: 1000 }),
    height: fc.integer({ min: 200, max: 800 }),
  }),
})

describe('Window Accessibility Property Tests', () => {
  /**
   * **Feature: macos-component-library, Property 18: Window ARIA attributes**
   * **Validates: Requirements 8.1**
   */
  describe('Property 18: Window ARIA attributes', () => {
    it('focused window has role="dialog" and aria-modal="true"', () => {
      fc.assert(
        fc.property(windowPropsArbitrary, (props) => {
          const { container } = render(
            <WindowManagerProvider>
              <Window {...props}>
                <div>Test content</div>
              </Window>
            </WindowManagerProvider>
          )

          // Find the window element
          const windowElement = container.querySelector(`[data-window-id="${props.id}"]`)
          expect(windowElement).toBeTruthy()

          // Check ARIA attributes
          const hasDialogRole = windowElement?.getAttribute('role') === 'dialog'
          const hasAriaModal = windowElement?.getAttribute('aria-modal') === 'true'
          const hasAriaLabelledBy = windowElement?.hasAttribute('aria-labelledby')

          return hasDialogRole && hasAriaModal && hasAriaLabelledBy
        }),
        defaultPropertyTestConfig
      )
    })

    it('window has aria-labelledby pointing to title', () => {
      fc.assert(
        fc.property(windowPropsArbitrary, (props) => {
          const { container } = render(
            <WindowManagerProvider>
              <Window {...props}>
                <div>Test content</div>
              </Window>
            </WindowManagerProvider>
          )

          // Find the window element
          const windowElement = container.querySelector(`[data-window-id="${props.id}"]`)
          expect(windowElement).toBeTruthy()

          // Get aria-labelledby value
          const labelledBy = windowElement?.getAttribute('aria-labelledby')
          expect(labelledBy).toBeTruthy()

          // Check that the referenced element exists and contains the title
          const titleElement = container.querySelector(`#${labelledBy}`)
          expect(titleElement).toBeTruthy()
          
          const titleText = titleElement?.textContent
          return titleText?.includes(props.title) ?? false
        }),
        defaultPropertyTestConfig
      )
    })

    it('traffic light buttons have aria-label attributes', () => {
      fc.assert(
        fc.property(windowPropsArbitrary, (props) => {
          const { container } = render(
            <WindowManagerProvider>
              <Window {...props}>
                <div>Test content</div>
              </Window>
            </WindowManagerProvider>
          )

          // Find all buttons in the window
          const buttons = container.querySelectorAll('button')
          
          // Should have at least 3 buttons (close, minimize, maximize)
          expect(buttons.length).toBeGreaterThanOrEqual(3)

          // Check that the first 3 buttons have aria-label
          const closeButton = buttons[0]
          const minimizeButton = buttons[1]
          const maximizeButton = buttons[2]

          const hasCloseLabel = closeButton?.hasAttribute('aria-label')
          const hasMinimizeLabel = minimizeButton?.hasAttribute('aria-label')
          const hasMaximizeLabel = maximizeButton?.hasAttribute('aria-label')

          return hasCloseLabel && hasMinimizeLabel && hasMaximizeLabel
        }),
        defaultPropertyTestConfig
      )
    })
  })
})
