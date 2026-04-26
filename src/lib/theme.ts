import type { ThemeConfig } from './theme.types'
import { defaultTheme } from './theme.types'

/**
 * Serializes a ThemeConfig object to JSON string
 * 
 * @param config - Theme configuration to serialize
 * @returns JSON string representation of the theme
 * 
 * @example
 * const json = serializeTheme(myTheme)
 * // Save to file or localStorage
 */
export function serializeTheme(config: ThemeConfig): string {
  return JSON.stringify(config, null, 2)
}

/**
 * Deserializes a JSON string to a ThemeConfig object
 * 
 * @param json - JSON string to parse
 * @returns Parsed ThemeConfig object
 * @throws {Error} If JSON is invalid or doesn't match ThemeConfig structure
 * 
 * @example
 * const theme = deserializeTheme(jsonString)
 */
export function deserializeTheme(json: string): ThemeConfig {
  const parsed = JSON.parse(json) as ThemeConfig
  
  // Validate structure
  if (!parsed.colors || !parsed.radius || !parsed.blur || !parsed.shadows) {
    throw new Error('Invalid theme configuration: missing required properties')
  }
  
  return parsed
}

/**
 * Merges a partial theme configuration with the default theme
 * 
 * @param partial - Partial theme configuration to merge
 * @returns Complete ThemeConfig with defaults filled in
 * 
 * @example
 * const theme = mergeWithDefaults({ colors: { primary: 'blue' } })
 */
export function mergeWithDefaults(partial: Partial<ThemeConfig>): ThemeConfig {
  return {
    colors: { ...defaultTheme.colors, ...partial.colors },
    radius: { ...defaultTheme.radius, ...partial.radius },
    blur: { ...defaultTheme.blur, ...partial.blur },
    shadows: { ...defaultTheme.shadows, ...partial.shadows },
  }
}

/**
 * Applies a theme configuration to CSS variables
 * 
 * @param config - Theme configuration to apply
 * @param root - Root element to apply variables to (defaults to document.documentElement)
 * 
 * @example
 * applyTheme(myTheme)
 */
export function applyTheme(config: ThemeConfig, root: HTMLElement = document.documentElement): void {
  // Apply color variables
  Object.entries(config.colors).forEach(([key, value]) => {
    root.style.setProperty(`--macos-${key}`, value)
  })
  
  // Apply radius variables
  Object.entries(config.radius).forEach(([key, value]) => {
    root.style.setProperty(`--macos-radius-${key}`, value)
  })
  
  // Apply blur variables
  Object.entries(config.blur).forEach(([key, value]) => {
    root.style.setProperty(`--macos-blur-${key}`, value)
  })
  
  // Apply shadow variables
  Object.entries(config.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--macos-shadow-${key}`, value)
  })
}

/**
 * Gets the current theme from CSS variables
 * 
 * @param root - Root element to read variables from (defaults to document.documentElement)
 * @returns Current ThemeConfig
 * 
 * @example
 * const currentTheme = getTheme()
 */
export function getTheme(root: HTMLElement = document.documentElement): ThemeConfig {
  const getVar = (name: string): string => {
    return getComputedStyle(root).getPropertyValue(name).trim()
  }
  
  return {
    colors: {
      background: getVar('--macos-background'),
      foreground: getVar('--macos-foreground'),
      primary: getVar('--macos-primary'),
      secondary: getVar('--macos-secondary'),
      accent: getVar('--macos-accent'),
      muted: getVar('--macos-muted'),
      border: getVar('--macos-border'),
      windowBackground: getVar('--macos-windowBackground'),
      windowBorder: getVar('--macos-windowBorder'),
      dockBackground: getVar('--macos-dockBackground'),
      menuBarBackground: getVar('--macos-menuBarBackground'),
    },
    radius: {
      sm: getVar('--macos-radius-sm'),
      md: getVar('--macos-radius-md'),
      lg: getVar('--macos-radius-lg'),
      window: getVar('--macos-radius-window'),
      dock: getVar('--macos-radius-dock'),
    },
    blur: {
      window: getVar('--macos-blur-window'),
      dock: getVar('--macos-blur-dock'),
      menuBar: getVar('--macos-blur-menuBar'),
    },
    shadows: {
      window: getVar('--macos-shadow-window'),
      windowActive: getVar('--macos-shadow-windowActive'),
      dock: getVar('--macos-shadow-dock'),
    },
  }
}
