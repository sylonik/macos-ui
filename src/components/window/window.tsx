"use client"

import React, { useRef, useState, useCallback, useEffect } from 'react'
import { cn } from '../../lib/utils'
import { useWindowManager } from './window-manager'
import type { WindowProps, Position } from './window.types'

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return Array.from(container.querySelectorAll(selector))
}

/**
 * Traffic light button colors for macOS window controls
 */
const TRAFFIC_LIGHT_COLORS = {
  close: 'bg-red-500 hover:bg-red-600',
  minimize: 'bg-yellow-500 hover:bg-yellow-600',
  maximize: 'bg-green-500 hover:bg-green-600',
}

/**
 * Window component that provides a draggable, resizable macOS-style window
 */
export function Window({
  id,
  title,
  icon: Icon,
  children,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 600, height: 400 },
  minSize = { width: 200, height: 150 },
  maxSize,
  isResizable = true,
  isDraggable = true,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: WindowProps) {
  const windowManager = useWindowManager()
  const windowRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>(defaultPosition)
  const [size, setSize] = useState(defaultSize)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)

  // Get window state from manager
  const windowState = windowManager.windows.find((w) => w.id === id)
  const isFocused = windowState?.isFocused ?? false
  const isMinimized = windowState?.isMinimized ?? false

  /**
   * Handle window focus
   */
  const handleFocus = useCallback(() => {
    windowManager.focusWindow(id)
    onFocus?.()
  }, [id, windowManager, onFocus])

  /**
   * Handle close button click
   */
  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      windowManager.closeWindow(id)
      onClose?.()
    },
    [id, windowManager, onClose]
  )

  /**
   * Handle minimize button click
   */
  const handleMinimize = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      windowManager.minimizeWindow(id)
      onMinimize?.()
    },
    [id, windowManager, onMinimize]
  )

  /**
   * Handle maximize button click
   */
  const handleMaximize = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      
      if (isMaximized) {
        // Restore to previous size and position
        setIsMaximized(false)
        windowManager.updateWindowSize(id, size)
        windowManager.updateWindowPosition(id, position)
      } else {
        // Maximize to fill viewport (minus menu bar height)
        const menuBarHeight = 28 // Standard macOS menu bar height
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight - menuBarHeight
        
        setIsMaximized(true)
        windowManager.updateWindowSize(id, { width: viewportWidth, height: viewportHeight })
        windowManager.updateWindowPosition(id, { x: 0, y: menuBarHeight })
      }
      
      onMaximize?.()
    },
    [id, windowManager, isMaximized, size, position, onMaximize]
  )

  /**
   * Handle drag start
   */
  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (!isDraggable || isMaximized) return

      e.preventDefault()
      setIsDragging(true)
      dragStartRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      }
      handleFocus()
    },
    [isDraggable, isMaximized, position, handleFocus]
  )

  /**
   * Handle drag move
   */
  const handleDragMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !dragStartRef.current) return

      const newPosition = {
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      }

      setPosition(newPosition)
      windowManager.updateWindowPosition(id, newPosition)
    },
    [isDragging, id, windowManager]
  )

  /**
   * Handle drag end
   */
  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    dragStartRef.current = null
  }, [])

  /**
   * Set up drag event listeners
   */
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove)
      window.addEventListener('mouseup', handleDragEnd)

      return () => {
        window.removeEventListener('mousemove', handleDragMove)
        window.removeEventListener('mouseup', handleDragEnd)
      }
    }
  }, [isDragging, handleDragMove, handleDragEnd])

  /**
   * Implement focus trap for modal windows
   */
  useEffect(() => {
    if (!isFocused || !windowRef.current) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableElements = getFocusableElements(windowRef.current!)
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        // Shift + Tab: move focus backwards
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab: move focus forwards
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFocused])

  /**
   * Update size when maximized state changes
   */
  useEffect(() => {
    if (isMaximized) {
      const menuBarHeight = 28
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight - menuBarHeight
      setSize({ width: viewportWidth, height: viewportHeight })
      setPosition({ x: 0, y: menuBarHeight })
    }
  }, [isMaximized])

  // Don't render if minimized
  if (isMinimized) {
    return null
  }

  const windowStyle: React.CSSProperties = {
    left: position.x,
    top: position.y,
    width: size.width,
    height: size.height,
    zIndex: windowState?.zIndex ?? 1000,
    minWidth: minSize.width,
    minHeight: minSize.height,
    maxWidth: maxSize?.width,
    maxHeight: maxSize?.height,
  }

  return (
    <div
      ref={windowRef}
      className={cn(
        'absolute flex flex-col overflow-hidden rounded-lg border shadow-lg',
        'bg-white/95 backdrop-blur-md',
        isFocused ? 'border-gray-300 shadow-xl' : 'border-gray-200 shadow-md',
        isDragging && 'cursor-grabbing'
      )}
      style={windowStyle}
      onMouseDown={handleFocus}
      data-window-id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`window-title-${id}`}
    >
      {/* Title Bar */}
      <div
        className={cn(
          'flex items-center justify-between px-3 py-2 border-b',
          isFocused ? 'bg-gray-50/80 border-gray-200' : 'bg-gray-50/50 border-gray-100',
          isDraggable && !isMaximized && 'cursor-grab active:cursor-grabbing'
        )}
        onMouseDown={handleDragStart}
      >
        {/* Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={cn(
              'h-3 w-3 rounded-full transition-colors',
              TRAFFIC_LIGHT_COLORS.close
            )}
            onClick={handleClose}
            aria-label="Close window"
          />
          <button
            type="button"
            className={cn(
              'h-3 w-3 rounded-full transition-colors',
              TRAFFIC_LIGHT_COLORS.minimize
            )}
            onClick={handleMinimize}
            aria-label="Minimize window"
          />
          <button
            type="button"
            className={cn(
              'h-3 w-3 rounded-full transition-colors',
              TRAFFIC_LIGHT_COLORS.maximize
            )}
            onClick={handleMaximize}
            aria-label="Maximize window"
          />
        </div>

        {/* Title */}
        <div 
          id={`window-title-${id}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
        >
          {Icon && <Icon size={16} />}
          <span className={cn(
            'text-sm font-medium',
            isFocused ? 'text-gray-900' : 'text-gray-500'
          )}>
            {title}
          </span>
        </div>

        {/* Spacer for layout balance */}
        <div className="w-[52px]" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Resize Handle (bottom-right corner) */}
      {isResizable && !isMaximized && (
        <div
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize"
          aria-label="Resize window"
        />
      )}
    </div>
  )
}
