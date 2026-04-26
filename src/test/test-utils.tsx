import { ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

/**
 * Custom render function that wraps components with common providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  return render(ui, { ...options })
}

/**
 * Re-export everything from React Testing Library
 */
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { renderWithProviders as render }
