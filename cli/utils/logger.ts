/**
 * Simple logger utilities for CLI output
 */

export const logger = {
  info: (message: string) => {
    console.log(`ℹ ${message}`)
  },
  success: (message: string) => {
    console.log(`✓ ${message}`)
  },
  error: (message: string) => {
    console.error(`✗ ${message}`)
  },
  warn: (message: string) => {
    console.warn(`⚠ ${message}`)
  },
  break: () => {
    console.log('')
  },
}
