import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import prompts from 'prompts'
import type { AddCommandOptions } from '../types.js'
import { logger } from '../utils/logger.js'
import { loadRegistryRemote, getComponent, getAllComponentNames } from '../utils/registry.js'
import {
  getNpmDependencies,
  getInstalledComponents,
  getMissingDependencies,
} from '../utils/dependencies.js'
import {
  fileExists,
  writeFile,
  readFile,
  getProjectRoot,
  readPackageJson,
  writePackageJson,
} from '../utils/files.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Add command implementation
 * Installs components from the registry into the user's project
 */
export async function addCommand(
  components: string[],
  options: AddCommandOptions
) {
  try {
    // Load registry (remote with local fallback)
    const registry = await loadRegistryRemote()
    
    // Determine which components to install
    let componentsToInstall: string[] = []
    
    if (options.all) {
      componentsToInstall = getAllComponentNames(registry)
      logger.info('Installing all components...')
    } else if (components.length === 0) {
      // Prompt user to select components
      const response = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Select components to install',
        choices: getAllComponentNames(registry).map((name) => ({
          title: name,
          value: name,
          description: registry.components[name]?.description,
        })),
      })
      
      if (!response.components || response.components.length === 0) {
        logger.info('No components selected')
        return
      }
      
      componentsToInstall = response.components as string[]
    } else {
      componentsToInstall = components
    }

    // Validate components exist
    for (const componentName of componentsToInstall) {
      if (!getComponent(registry, componentName)) {
        logger.error(`Component "${componentName}" not found in registry`)
        return
      }
    }

    // Get project root and target path
    const projectRoot = getProjectRoot()
    const targetPath = options.path || 'src/components'
    const fullTargetPath = join(projectRoot, targetPath)

    logger.info(`Installing to: ${targetPath}`)
    logger.break()

    // Check for installed components
    const installedComponents = getInstalledComponents()

    // Resolve dependencies for all components
    const allComponentsWithDeps = new Set<string>(componentsToInstall)
    
    for (const componentName of componentsToInstall) {
      const missingDeps = getMissingDependencies(
        registry,
        componentName,
        installedComponents
      )
      
      if (missingDeps.length > 0) {
        logger.info(`Component "${componentName}" requires: ${missingDeps.join(', ')}`)
        
        // Prompt to install dependencies
        const response = await prompts({
          type: 'confirm',
          name: 'installDeps',
          message: 'Install missing dependencies?',
          initial: true,
        })
        
        if (response.installDeps) {
          for (const dep of missingDeps) {
            allComponentsWithDeps.add(dep)
          }
        } else {
          logger.warn('Skipping dependencies - component may not work correctly')
        }
      }
    }

    // Install each component
    const installedFiles: string[] = []
    
    for (const componentName of Array.from(allComponentsWithDeps)) {
      const component = getComponent(registry, componentName)
      
      if (!component) {
        continue
      }

      logger.info(`Installing ${componentName}...`)

      // Copy each file
      for (const file of component.files) {
        const sourcePath = join(__dirname, '../../src', file.path)
        const destPath = join(fullTargetPath, file.path)

        // Check if file exists
        if (fileExists(destPath) && !options.overwrite) {
          const response = await prompts({
            type: 'confirm',
            name: 'overwrite',
            message: `File ${file.path} already exists. Overwrite?`,
            initial: false,
          })

          if (!response.overwrite) {
            logger.warn(`Skipped ${file.path}`)
            continue
          }
        }

        // Copy file
        try {
          const content = readFile(sourcePath)
          writeFile(destPath, content)
          installedFiles.push(file.path)
          logger.success(`Added ${file.path}`)
        } catch (error) {
          logger.error(`Failed to copy ${file.path}: ${error}`)
        }
      }
    }

    logger.break()

    // Update package.json with npm dependencies
    const npmDeps = getNpmDependencies(registry, Array.from(allComponentsWithDeps))
    
    if (npmDeps.length > 0) {
      logger.info('Updating package.json with dependencies...')
      
      try {
        const packageJson = readPackageJson(projectRoot)
        const dependencies = (packageJson.dependencies as Record<string, string>) || {}

        let addedDeps = 0
        for (const dep of npmDeps) {
          if (!dependencies[dep]) {
            dependencies[dep] = 'latest'
            addedDeps++
            logger.success(`Added ${dep}`)
          }
        }

        if (addedDeps > 0) {
          packageJson.dependencies = dependencies
          writePackageJson(projectRoot, packageJson)
          
          logger.break()
          logger.info('Run `npm install` or `pnpm install` to install new dependencies')
        } else {
          logger.info('All dependencies already present')
        }
      } catch (error) {
        logger.error(`Failed to update package.json: ${error}`)
      }
    }

    logger.break()
    logger.success(`Installed ${installedFiles.length} files`)
  } catch (error) {
    logger.error(`Failed to add components: ${error}`)
    process.exit(1)
  }
}
