/**
 * Theme configuration types for macOS UI components
 */

export interface ThemeColors {
  background: string
  foreground: string
  primary: string
  secondary: string
  accent: string
  muted: string
  border: string
  windowBackground: string
  windowBorder: string
  dockBackground: string
  menuBarBackground: string
}

export interface ThemeRadius {
  sm: string
  md: string
  lg: string
  window: string
  dock: string
}

export interface ThemeBlur {
  window: string
  dock: string
  menuBar: string
}

export interface ThemeShadows {
  window: string
  windowActive: string
  dock: string
}

export interface ThemeConfig {
  colors: ThemeColors
  radius: ThemeRadius
  blur: ThemeBlur
  shadows: ThemeShadows
}

/**
 * Default theme configuration
 */
export const defaultTheme: ThemeConfig = {
  colors: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    primary: 'hsl(221.2 83.2% 53.3%)',
    secondary: 'hsl(210 40% 96.1%)',
    accent: 'hsl(210 40% 96.1%)',
    muted: 'hsl(210 40% 96.1%)',
    border: 'hsl(214.3 31.8% 91.4%)',
    windowBackground: 'hsla(0 0% 100% / 0.8)',
    windowBorder: 'hsl(214.3 31.8% 91.4%)',
    dockBackground: 'hsla(0 0% 100% / 0.7)',
    menuBarBackground: 'hsla(0 0% 100% / 0.8)',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    window: '0.75rem',
    dock: '1rem',
  },
  blur: {
    window: '20px',
    dock: '40px',
    menuBar: '20px',
  },
  shadows: {
    window: '0 10px 40px rgba(0, 0, 0, 0.1)',
    windowActive: '0 20px 60px rgba(0, 0, 0, 0.2)',
    dock: '0 10px 30px rgba(0, 0, 0, 0.15)',
  },
}
