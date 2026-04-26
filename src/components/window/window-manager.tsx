"use client"

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react'
import type { WindowState, WindowConfig, Position, Size, WindowManagerContextValue } from './window.types'

/**
 * Actions for the WindowManager reducer
 */
type WindowManagerAction =
  | { type: 'OPEN_WINDOW'; payload: { config: WindowConfig; id: string } }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } }
  | { type: 'FOCUS_WINDOW'; payload: { id: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'MAXIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'RESTORE_WINDOW'; payload: { id: string } }
  | { type: 'UPDATE_POSITION'; payload: { id: string; position: Position } }
  | { type: 'UPDATE_SIZE'; payload: { id: string; size: Size } }

/**
 * State for the WindowManager
 */
interface WindowManagerState {
  windows: WindowState[]
  nextZIndex: number
}

/**
 * Default window configuration values
 */
const DEFAULT_WINDOW_CONFIG = {
  defaultPosition: { x: 100, y: 100 },
  defaultSize: { width: 600, height: 400 },
  isResizable: true,
  isDraggable: true,
}

/**
 * Initial z-index for windows
 */
const INITIAL_Z_INDEX = 1000

/**
 * Generate a unique window ID
 */
function generateWindowId(): string {
  return `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Reducer for managing window state
 */
function windowManagerReducer(
  state: WindowManagerState,
  action: WindowManagerAction
): WindowManagerState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const { config, id } = action.payload
      const newWindow: WindowState = {
        id,
        appId: config.appId,
        title: config.title,
        icon: config.icon,
        position: config.defaultPosition || DEFAULT_WINDOW_CONFIG.defaultPosition,
        size: config.defaultSize || DEFAULT_WINDOW_CONFIG.defaultSize,
        minSize: config.minSize,
        maxSize: config.maxSize,
        zIndex: state.nextZIndex,
        isMinimized: false,
        isMaximized: false,
        isFocused: true,
        isResizable: config.isResizable ?? DEFAULT_WINDOW_CONFIG.isResizable,
        isDraggable: config.isDraggable ?? DEFAULT_WINDOW_CONFIG.isDraggable,
        content: config.content,
        data: config.data,
      }

      // Unfocus all other windows
      const updatedWindows = state.windows.map((w) => ({
        ...w,
        isFocused: false,
      }))

      return {
        windows: [...updatedWindows, newWindow],
        nextZIndex: state.nextZIndex + 1,
      }
    }

    case 'CLOSE_WINDOW': {
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.payload.id),
      }
    }

    case 'FOCUS_WINDOW': {
      const { id } = action.payload
      const window = state.windows.find((w) => w.id === id)
      
      if (!window || window.isFocused) {
        return state
      }

      // Update z-indices: focused window gets highest, others keep relative order
      const updatedWindows = state.windows.map((w) => {
        if (w.id === id) {
          return { ...w, isFocused: true, zIndex: state.nextZIndex }
        }
        return { ...w, isFocused: false }
      })

      return {
        windows: updatedWindows,
        nextZIndex: state.nextZIndex + 1,
      }
    }

    case 'MINIMIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMinimized: true, isFocused: false }
            : w
        ),
      }
    }

    case 'MAXIMIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMaximized: !w.isMaximized }
            : w
        ),
      }
    }

    case 'RESTORE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMinimized: false, isMaximized: false }
            : w
        ),
      }
    }

    case 'UPDATE_POSITION': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, position: action.payload.position }
            : w
        ),
      }
    }

    case 'UPDATE_SIZE': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, size: action.payload.size }
            : w
        ),
      }
    }

    default:
      return state
  }
}

/**
 * Context for WindowManager
 */
const WindowManagerContext = createContext<WindowManagerContextValue | null>(null)

/**
 * Props for WindowManagerProvider
 */
interface WindowManagerProviderProps {
  children: React.ReactNode
}

/**
 * Provider component for WindowManager
 * Manages all window state including position, size, z-index, and visibility
 */
export function WindowManagerProvider({ children }: WindowManagerProviderProps) {
  const [state, dispatch] = useReducer(windowManagerReducer, {
    windows: [],
    nextZIndex: INITIAL_Z_INDEX,
  })

  const openWindow = useCallback((config: WindowConfig): string => {
    const id = generateWindowId()
    dispatch({ type: 'OPEN_WINDOW', payload: { config, id } })
    return id
  }, [])

  const closeWindow = useCallback((id: string) => {
    dispatch({ type: 'CLOSE_WINDOW', payload: { id } })
  }, [])

  const focusWindow = useCallback((id: string) => {
    dispatch({ type: 'FOCUS_WINDOW', payload: { id } })
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } })
  }, [])

  const maximizeWindow = useCallback((id: string) => {
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: { id } })
  }, [])

  const restoreWindow = useCallback((id: string) => {
    dispatch({ type: 'RESTORE_WINDOW', payload: { id } })
  }, [])

  const updateWindowPosition = useCallback((id: string, position: Position) => {
    dispatch({ type: 'UPDATE_POSITION', payload: { id, position } })
  }, [])

  const updateWindowSize = useCallback((id: string, size: Size) => {
    dispatch({ type: 'UPDATE_SIZE', payload: { id, size } })
  }, [])

  const activeWindowId = useMemo(() => {
    const focusedWindow = state.windows.find((w) => w.isFocused)
    return focusedWindow?.id || null
  }, [state.windows])

  const value: WindowManagerContextValue = useMemo(
    () => ({
      windows: state.windows,
      activeWindowId,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      updateWindowPosition,
      updateWindowSize,
    }),
    [
      state.windows,
      activeWindowId,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      updateWindowPosition,
      updateWindowSize,
    ]
  )

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}

/**
 * Hook to access WindowManager context
 * @throws {Error} If used outside of WindowManagerProvider
 */
export function useWindowManager(): WindowManagerContextValue {
  const context = useContext(WindowManagerContext)
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider')
  }
  return context
}
