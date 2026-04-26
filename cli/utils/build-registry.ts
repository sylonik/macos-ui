import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import type { ComponentRegistry } from '../types.js'

/**
 * Validate registry against schema
 */
export function validateRegistry(registry: ComponentRegistry): boolean {
  if (!registry.name || !registry.version || !registry.components) {
    throw new Error('Registry missing required fields: name, version, or components')
  }

  for (const [key, component] of Object.entries(registry.components)) {
    if (!component.name || component.name !== key) {
      throw new Error(`Component key "${key}" does not match component name "${component.name}"`)
    }

    if (!component.description) {
      throw new Error(`Component "${key}" missing description`)
    }

    if (!['desktop', 'window', 'ui', 'hooks', 'lib'].includes(component.category)) {
      throw new Error(`Component "${key}" has invalid category: ${component.category}`)
    }

    if (!Array.isArray(component.files) || component.files.length === 0) {
      throw new Error(`Component "${key}" has no files`)
    }

    for (const file of component.files) {
      if (!file.name || !file.path || !file.type) {
        throw new Error(`Component "${key}" has invalid file definition`)
      }

      if (!['component', 'hook', 'util', 'style', 'type'].includes(file.type)) {
        throw new Error(`Component "${key}" file "${file.name}" has invalid type: ${file.type}`)
      }
    }

    if (!Array.isArray(component.dependencies)) {
      throw new Error(`Component "${key}" dependencies must be an array`)
    }

    if (!Array.isArray(component.devDependencies)) {
      throw new Error(`Component "${key}" devDependencies must be an array`)
    }

    if (!Array.isArray(component.registryDependencies)) {
      throw new Error(`Component "${key}" registryDependencies must be an array`)
    }
  }

  return true
}

/**
 * Build registry from source files
 * This is a placeholder for future auto-generation functionality
 */
export function buildRegistry(srcPath: string): ComponentRegistry {
  // For now, just read the existing registry
  const registryPath = join(srcPath, '../registry/components.json')
  const registryContent = readFileSync(registryPath, 'utf-8')
  const registry = JSON.parse(registryContent) as ComponentRegistry

  // Validate it
  validateRegistry(registry)

  return registry
}

/**
 * Get all component files from src directory
 */
export function getComponentFiles(srcPath: string): string[] {
  const files: string[] = []

  function walk(dir: string) {
    const entries = readdirSync(dir)

    for (const entry of entries) {
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (
        entry.endsWith('.tsx') ||
        entry.endsWith('.ts') ||
        entry.endsWith('.css')
      ) {
        // Skip test files
        if (!entry.includes('.test.') && !entry.includes('.property.test.')) {
          files.push(relative(srcPath, fullPath))
        }
      }
    }
  }

  walk(srcPath)
  return files
}
