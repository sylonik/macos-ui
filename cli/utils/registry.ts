import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import type { ComponentRegistry } from '../types.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const REMOTE_REGISTRY_URL = 'https://ui.sylonik.se/registry/components.json'

/**
 * Load the component registry.
 * Attempts to fetch the latest registry from ui.sylonik.se first;
 * falls back to the bundled registry/components.json on failure.
 */
export async function loadRegistryRemote(): Promise<ComponentRegistry> {
  try {
    const res = await fetch(REMOTE_REGISTRY_URL, { signal: AbortSignal.timeout(5000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as ComponentRegistry
  } catch {
    // Fall back to local registry
    return loadRegistry()
  }
}

/**
 * Load the component registry from the bundled local registry file.
 */
export function loadRegistry(): ComponentRegistry {
  const registryPath = join(__dirname, '../../registry/components.json')
  const registryContent = readFileSync(registryPath, 'utf-8')
  return JSON.parse(registryContent) as ComponentRegistry
}

/**
 * Get a component definition from the registry
 */
export function getComponent(registry: ComponentRegistry, name: string) {
  return registry.components[name]
}

/**
 * Get all component names from the registry
 */
export function getAllComponentNames(registry: ComponentRegistry): string[] {
  return Object.keys(registry.components)
}
