import { join } from 'path'
import prompts from 'prompts'
import type { InitCommandOptions } from '../types.js'
import { logger } from '../utils/logger.js'
import { getProjectRoot, writeFile, fileExists } from '../utils/files.js'
import { defaultTheme } from '../../src/lib/theme.types.js'

/**
 * Default Tailwind config content for macOS UI
 */
const TAILWIND_CONFIG = `import type { Config } from 'tailwindcss'
import macosPreset from '@sylonik/macos-ui/tailwind.preset'

export default {
  presets: [macosPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@sylonik/macos-ui/dist/**/*.js',
  ],
} satisfies Config
`

/**
 * Default theme CSS content
 */
const THEME_CSS = `/**
 * macOS UI Theme Variables
 * 
 * These CSS variables define the visual theme for all macOS UI components.
 * Override these variables to customize the appearance of your application.
 */

:root {
  /* Colors */
  --macos-background: hsl(0 0% 100%);
  --macos-foreground: hsl(222.2 84% 4.9%);
  --macos-primary: hsl(221.2 83.2% 53.3%);
  --macos-secondary: hsl(210 40% 96.1%);
  --macos-accent: hsl(210 40% 96.1%);
  --macos-muted: hsl(210 40% 96.1%);
  --macos-border: hsl(214.3 31.8% 91.4%);
  
  /* Component-specific colors */
  --macos-windowBackground: hsla(0 0% 100% / 0.8);
  --macos-windowBorder: hsl(214.3 31.8% 91.4%);
  --macos-dockBackground: hsla(0 0% 100% / 0.7);
  --macos-menuBarBackground: hsla(0 0% 100% / 0.8);
  
  /* Border radius */
  --macos-radius-sm: 0.25rem;
  --macos-radius-md: 0.5rem;
  --macos-radius-lg: 0.75rem;
  --macos-radius-window: 0.75rem;
  --macos-radius-dock: 1rem;
  
  /* Blur effects */
  --macos-blur-window: 20px;
  --macos-blur-dock: 40px;
  --macos-blur-menuBar: 20px;
  
  /* Shadows */
  --macos-shadow-window: 0 10px 40px rgba(0, 0, 0, 0.1);
  --macos-shadow-windowActive: 0 20px 60px rgba(0, 0, 0, 0.2);
  --macos-shadow-dock: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* Dark mode theme */
@media (prefers-color-scheme: dark) {
  :root {
    --macos-background: hsl(222.2 84% 4.9%);
    --macos-foreground: hsl(210 40% 98%);
    --macos-primary: hsl(217.2 91.2% 59.8%);
    --macos-secondary: hsl(217.2 32.6% 17.5%);
    --macos-accent: hsl(217.2 32.6% 17.5%);
    --macos-muted: hsl(217.2 32.6% 17.5%);
    --macos-border: hsl(217.2 32.6% 17.5%);
    
    --macos-windowBackground: hsla(222.2 84% 4.9% / 0.8);
    --macos-windowBorder: hsl(217.2 32.6% 17.5%);
    --macos-dockBackground: hsla(222.2 84% 4.9% / 0.7);
    --macos-menuBarBackground: hsla(222.2 84% 4.9% / 0.8);
    
    --macos-shadow-window: 0 10px 40px rgba(0, 0, 0, 0.5);
    --macos-shadow-windowActive: 0 20px 60px rgba(0, 0, 0, 0.7);
    --macos-shadow-dock: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
}

/* Base styles for macOS UI */
.macos-ui {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

/**
 * Init command implementation
 * Generates base configuration files for macOS UI
 */
export async function initCommand(options: InitCommandOptions) {
  try {
    const projectRoot = getProjectRoot()
    
    logger.info('Initializing macOS UI configuration...')
    logger.break()

    // Check if files already exist
    const tailwindConfigPath = join(projectRoot, 'tailwind.config.ts')
    const themeCssPath = join(projectRoot, 'src/styles/macos-theme.css')
    const themeConfigPath = join(projectRoot, 'macos-ui.config.json')

    const existingFiles: string[] = []
    if (fileExists(tailwindConfigPath)) existingFiles.push('tailwind.config.ts')
    if (fileExists(themeCssPath)) existingFiles.push('src/styles/macos-theme.css')
    if (fileExists(themeConfigPath)) existingFiles.push('macos-ui.config.json')

    // Prompt for overwrite if files exist and not using --yes flag
    if (existingFiles.length > 0 && !options.yes) {
      logger.warn(`The following files already exist: ${existingFiles.join(', ')}`)
      
      const response = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: 'Overwrite existing files?',
        initial: false,
      })

      if (!response.overwrite) {
        logger.info('Initialization cancelled')
        return
      }
    }

    // Generate Tailwind config
    if (!fileExists(tailwindConfigPath) || options.yes || existingFiles.includes('tailwind.config.ts')) {
      writeFile(tailwindConfigPath, TAILWIND_CONFIG)
      logger.success('Created tailwind.config.ts')
    }

    // Generate theme CSS
    writeFile(themeCssPath, THEME_CSS)
    logger.success('Created src/styles/macos-theme.css')

    // Generate theme config JSON with documented variables
    const themeConfigContent = JSON.stringify(
      {
        $schema: './node_modules/@sylonik/macos-ui/registry/schema.json',
        theme: defaultTheme,
        _comments: {
          colors: 'Color values in HSL format. Use hsl() or hsla() for transparency.',
          radius: 'Border radius values in rem or px.',
          blur: 'Backdrop blur values in px.',
          shadows: 'Box shadow values using CSS shadow syntax.',
        },
      },
      null,
      2
    )
    writeFile(themeConfigPath, themeConfigContent)
    logger.success('Created macos-ui.config.json')

    logger.break()
    logger.success('Initialization complete!')
    logger.break()
    logger.info('Next steps:')
    logger.info('  1. Import the theme CSS in your main CSS file:')
    logger.info('     @import "./styles/macos-theme.css";')
    logger.info('  2. Install components using: macos-ui add <component>')
    logger.info('  3. Customize theme variables in macos-ui.config.json')
  } catch (error) {
    logger.error(`Failed to initialize: ${error}`)
    process.exit(1)
  }
}
