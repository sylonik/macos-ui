import type { ReactNode, ComponentType } from 'react'

/**
 * Position coordinates for a window
 */
export interface Position {
  x: number
  y: number
}

/**
 * Size dimensions for a window
 */
export interface Size {
  width: number
  height: number
}

/**
 * Configuration for creating a new window
 */
export interface WindowConfig {
  appId: string
  title: string
  icon?: ComponentType<{ size?: number }>
  defaultPosition?: Position
  defaultSize?: Size
  minSize?: Size
  maxSize?: Size
  isResizable?: boolean
  isDraggable?: boolean
  content?: ReactNode
  data?: Record<string, unknown>
}

/**
 * Complete window state
 */
export interface WindowState {
  id: string
  appId: string
  title: string
  icon?: ComponentType<{ size?: number }>
  position: Position
  size: Size
  minSize?: Size
  maxSize?: Size
  zIndex: number
  isMinimized: boolean
  isMaximized: boolean
  isFocused: boolean
  isResizable: boolean
  isDraggable: boolean
  content?: ReactNode
  data?: Record<string, unknown>
}

/**
 * Props for the Window component
 */
export interface WindowProps {
  id: string
  title: string
  icon?: ComponentType<{ size?: number }>
  children: ReactNode
  defaultPosition?: Position
  defaultSize?: Size
  minSize?: Size
  maxSize?: Size
  isResizable?: boolean
  isDraggable?: boolean
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onFocus?: () => void
}

/**
 * Context value for WindowManager
 */
export interface WindowManagerContextValue {
  windows: WindowState[]
  activeWindowId: string | null
  openWindow: (config: WindowConfig) => string
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  updateWindowPosition: (id: string, position: Position) => void
  updateWindowSize: (id: string, size: Size) => void
}
