import type { ComponentRegistry } from '../types.js'

/**
 * Resolve all dependencies for a component (including transitive dependencies)
 */
export function resolveDependencies(
  registry: ComponentRegistry,
  componentName: string,
  installedComponents: Set<string> = new Set()
): string[] {
  const component = registry.components[componentName]
  
  if (!component) {
    throw new Error(`Component "${componentName}" not found in registry`)
  }

  const allDeps = new Set<string>()

  // Add registry dependencies
  for (const dep of component.registryDependencies) {
    // Skip if already installed
    if (installedComponents.has(dep)) {
      continue
    }

    allDeps.add(dep)

    // Recursively resolve dependencies
    const transitiveDeps = resolveDependencies(registry, dep, installedComponents)
    for (const transitiveDep of transitiveDeps) {
      allDeps.add(transitiveDep)
    }
  }

  return Array.from(allDeps)
}

/**
 * Get all npm dependencies for a component and its dependencies
 */
export function getNpmDependencies(
  registry: ComponentRegistry,
  componentNames: string[]
): string[] {
  const allDeps = new Set<string>()

  for (const componentName of componentNames) {
    const component = registry.components[componentName]
    
    if (!component) {
      continue
    }

    // Add component's npm dependencies
    if (component.devDependencies && Array.isArray(component.devDependencies)) {
      for (const dep of component.devDependencies) {
        allDeps.add(dep)
      }
    }

    // Add npm dependencies from registry dependencies
    if (component.registryDependencies && Array.isArray(component.registryDependencies)) {
      for (const registryDep of component.registryDependencies) {
        const depComponent = registry.components[registryDep]
        if (depComponent) {
          if (depComponent.devDependencies && Array.isArray(depComponent.devDependencies)) {
            for (const dep of depComponent.devDependencies) {
              allDeps.add(dep)
            }
          }
        }
      }
    }
  }

  return Array.from(allDeps)
}

/**
 * Check which components are already installed
 */
export function getInstalledComponents(): Set<string> {
  const installed = new Set<string>()

  // This is a simple check - in a real implementation, we'd check if the files exist
  // For now, we'll return an empty set
  return installed
}

/**
 * Get missing dependencies that need to be installed
 */
export function getMissingDependencies(
  registry: ComponentRegistry,
  componentName: string,
  installedComponents: Set<string>
): string[] {
  const allDeps = resolveDependencies(registry, componentName, installedComponents)
  return allDeps.filter((dep) => !installedComponents.has(dep))
}
