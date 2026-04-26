import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WindowManagerProvider } from './window-manager'
import { Window } from './window'

/**
 * Helper to render Window with WindowManagerProvider
 */
function renderWindow(props: React.ComponentProps<typeof Window>) {
  return render(
    <WindowManagerProvider>
      <Window {...props} />
    </WindowManagerProvider>
  )
}

describe('Window Component', () => {
  describe('Rendering', () => {
    it('renders with title and children', () => {
      renderWindow({
        id: 'test-window',
        title: 'Test Window',
        children: <div>Test Content</div>,
      })

      expect(screen.getByText('Test Window')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('renders with icon when provided', () => {
      const TestIcon = ({ size }: { size?: number }) => (
        <svg data-testid="test-icon" width={size} height={size} />
      )

      renderWindow({
        id: 'test-window',
        title: 'Test Window',
        icon: TestIcon,
        children: <div>Content</div>,
      })

      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('renders traffic light buttons', () => {
      renderWindow({
        id: 'test-window',
        title: 'Test Window',
        children: <div>Content</div>,
      })

      expect(screen.getByLabelText('Close window')).toBeInTheDocument()
      expect(screen.getByLabelText('Minimize window')).toBeInTheDocument()
      expect(screen.getByLabelText('Maximize window')).toBeInTheDocument()
    })

    it('applies custom position and size', () => {
      const { container } = renderWindow({
        id: 'test-window',
        title: 'Test Window',
        defaultPosition: { x: 200, y: 150 },
        defaultSize: { width: 800, height: 600 },
        children: <div>Content</div>,
      })

      const windowElement = container.querySelector('[data-window-id="test-window"]') as HTMLElement
      expect(windowElement).toBeInTheDocument()
      expect(windowElement.style.left).toBe('200px')
      expect(windowElement.style.top).toBe('150px')
      expect(windowElement.style.width).toBe('800px')
      expect(windowElement.style.height).toBe('600px')
    })
  })

  describe('Button Click Handlers', () => {
    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()

      renderWindow({
        id: 'test-window',
        title: 'Test Window',
        onClose,
        children: <div>Content</div>,
      })

      const closeButton = screen.getByLabelText('Close window')
      await user.click(closeButton)

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onMinimize when minimize button is clicked', async () => {
      const user = userEvent.setup()
      const onMinimize = vi.fn()

      renderWindow({
        id: 'test-window',
        title: 'Test Window',
        onMinimize,
        children: <div>Content</div>,
      })

      const minimizeButton = screen.getByLabelText('Minimize window')
      await user.click(minimizeButton)

      expect(onMinimize).toHaveBeenCalledTimes(1)
    })

    it('calls onMaximize when maximize button is clicked', async () => {
      const user = userEvent.setup()
      const onMaximize = vi.fn()

      renderWindow({
        id: 'test-window',
        title: 'Test Window',
        onMaximize,
        children: <div>Content</div>,
      })

      const maximizeButton = screen.getByLabelText('Maximize window')
      await user.click(maximizeButton)

      expect(onMaximize).toHaveBeenCalledTimes(1)
    })

    it('calls onFocus when window is clicked', async () => {
      const user = userEvent.setup()
      const onFocus = vi.fn()

      const { container } = renderWindow({
        id: 'test-window',
        title: 'Test Window',
        onFocus,
        children: <div>Content</div>,
      })

      const windowElement = container.querySelector('[data-window-id="test-window"]') as HTMLElement
      await user.click(windowElement)

      expect(onFocus).toHaveBeenCalled()
    })
  })

  describe('Drag Behavior', () => {
    it('has draggable cursor on title bar when isDraggable is true', () => {
      const { container } = renderWindow({
        id: 'test-window',
        title: 'Test Window',
        isDraggable: true,
        children: <div>Content</div>,
      })

      // Find the title bar (contains the traffic light buttons)
      const titleBar = container.querySelector('.cursor-grab')
      expect(titleBar).toBeInTheDocument()
    })

    it('does not have draggable cursor when isDraggable is false', () => {
      const { container } = renderWindow({
        id: 'test-window',
        title: 'Test Window',
        isDraggable: false,
        children: <div>Content</div>,
      })

      const titleBar = container.querySelector('.cursor-grab')
      expect(titleBar).not.toBeInTheDocument()
    })
  })

  describe('Resize Behavior', () => {
    it('shows resize handle when isResizable is true', () => {
      const { container } = renderWindow({
        id: 'test-window',
        title: 'Test Window',
        isResizable: true,
        children: <div>Content</div>,
      })

      const resizeHandle = container.querySelector('.cursor-se-resize')
      expect(resizeHandle).toBeInTheDocument()
    })

    it('does not show resize handle when isResizable is false', () => {
      const { container } = renderWindow({
        id: 'test-window',
        title: 'Test Window',
        isResizable: false,
        children: <div>Content</div>,
      })

      const resizeHandle = container.querySelector('.cursor-se-resize')
      expect(resizeHandle).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const { container } = renderWindow({
        id: 'test-window',
        title: 'Test Window',
        children: <div>Content</div>,
      })

      const windowElement = container.querySelector('[data-window-id="test-window"]')
      expect(windowElement).toHaveAttribute('role', 'dialog')
      expect(windowElement).toHaveAttribute('aria-modal', 'true')
      expect(windowElement).toHaveAttribute('aria-labelledby')
    })

    it('title element has correct id for aria-labelledby', () => {
      const { container } = renderWindow({
        id: 'test-window',
        title: 'Test Window',
        children: <div>Content</div>,
      })

      const windowElement = container.querySelector('[data-window-id="test-window"]')
      const labelledBy = windowElement?.getAttribute('aria-labelledby')
      
      expect(labelledBy).toBe('window-title-test-window')
      
      const titleElement = container.querySelector(`#${labelledBy}`)
      expect(titleElement).toBeInTheDocument()
      expect(titleElement?.textContent).toContain('Test Window')
    })
  })
})
