import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdirSync, rmSync, writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { resolveDependencies, getNpmDependencies } from './dependencies.js'
import { validateRegistry } from './build-registry.js'
import type { ComponentRegistry } from '../types.js'

describe('CLI Unit Tests', () => {
  const testDir = join(process.cwd(), 'test-temp-unit')

  beforeEach(() => {
    // Create test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true })
    }
    mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    // Clean up test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true })
    }
  })

  describe('Dependency Resolution', () => {
    it('should resolve direct dependencies', () => {
      const registry: ComponentRegistry = {
        name: 'test',
        version: '1.0.0',
        components: {
          'comp-a': {
            name: 'comp-a',
            description: 'Component A',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: [],
            registryDependencies: ['comp-b'],
          },
          'comp-b': {
            name: 'comp-b',
            description: 'Component B',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: [],
            registryDependencies: [],
          },
        },
      }

      const deps = resolveDependencies(registry, 'comp-a', new Set())
      expect(deps).toContain('comp-b')
    })

    it('should resolve transitive dependencies', () => {
      const registry: ComponentRegistry = {
        name: 'test',
        version: '1.0.0',
        components: {
          'comp-a': {
            name: 'comp-a',
            description: 'Component A',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: [],
            registryDependencies: ['comp-b'],
          },
          'comp-b': {
            name: 'comp-b',
            description: 'Component B',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: [],
            registryDependencies: ['comp-c'],
          },
          'comp-c': {
            name: 'comp-c',
            description: 'Component C',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: [],
            registryDependencies: [],
          },
        },
      }

      const deps = resolveDependencies(registry, 'comp-a', new Set())
      expect(deps).toContain('comp-b')
      expect(deps).toContain('comp-c')
    })

    it('should skip already installed dependencies', () => {
      const registry: ComponentRegistry = {
        name: 'test',
        version: '1.0.0',
        components: {
          'comp-a': {
            name: 'comp-a',
            description: 'Component A',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: [],
            registryDependencies: ['comp-b'],
          },
          'comp-b': {
            name: 'comp-b',
            description: 'Component B',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: [],
            registryDependencies: [],
          },
        },
      }

      const installed = new Set(['comp-b'])
      const deps = resolveDependencies(registry, 'comp-a', installed)
      expect(deps).not.toContain('comp-b')
    })
  })

  describe('NPM Dependencies', () => {
    it('should extract npm dependencies from components', () => {
      const registry: ComponentRegistry = {
        name: 'test',
        version: '1.0.0',
        components: {
          'comp-a': {
            name: 'comp-a',
            description: 'Component A',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: ['react', 'react-dom'],
            registryDependencies: [],
          },
        },
      }

      const deps = getNpmDependencies(registry, ['comp-a'])
      expect(deps).toContain('react')
      expect(deps).toContain('react-dom')
    })

    it('should include npm dependencies from registry dependencies', () => {
      const registry: ComponentRegistry = {
        name: 'test',
        version: '1.0.0',
        components: {
          'comp-a': {
            name: 'comp-a',
            description: 'Component A',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: ['react'],
            registryDependencies: ['comp-b'],
          },
          'comp-b': {
            name: 'comp-b',
            description: 'Component B',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: ['clsx'],
            registryDependencies: [],
          },
        },
      }

      const deps = getNpmDependencies(registry, ['comp-a'])
      expect(deps).toContain('react')
      expect(deps).toContain('clsx')
    })

    it('should return unique npm dependencies', () => {
      const registry: ComponentRegistry = {
        name: 'test',
        version: '1.0.0',
        components: {
          'comp-a': {
            name: 'comp-a',
            description: 'Component A',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: ['react'],
            registryDependencies: [],
          },
          'comp-b': {
            name: 'comp-b',
            description: 'Component B',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: ['react'],
            registryDependencies: [],
          },
        },
      }

      const deps = getNpmDependencies(registry, ['comp-a', 'comp-b'])
      const reactCount = deps.filter((d) => d === 'react').length
      expect(reactCount).toBe(1)
    })
  })

  describe('Registry Validation', () => {
    it('should validate a correct registry', () => {
      const registry: ComponentRegistry = {
        name: 'test',
        version: '1.0.0',
        components: {
          'comp-a': {
            name: 'comp-a',
            description: 'Component A',
            category: 'ui',
            files: [
              {
                name: 'comp-a.tsx',
                path: 'components/comp-a.tsx',
                type: 'component',
              },
            ],
            dependencies: [],
            devDependencies: [],
            registryDependencies: [],
          },
        },
      }

      expect(() => validateRegistry(registry)).not.toThrow()
    })

    it('should reject registry with missing required fields', () => {
      const registry = {
        name: 'test',
        // missing version
        components: {},
      } as ComponentRegistry

      expect(() => validateRegistry(registry)).toThrow()
    })

    it('should reject component with mismatched name', () => {
      const registry: ComponentRegistry = {
        name: 'test',
        version: '1.0.0',
        components: {
          'comp-a': {
            name: 'comp-b', // mismatch!
            description: 'Component A',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: [],
            registryDependencies: [],
          },
        },
      }

      expect(() => validateRegistry(registry)).toThrow()
    })

    it('should reject component with invalid category', () => {
      const registry: ComponentRegistry = {
        name: 'test',
        version: '1.0.0',
        components: {
          'comp-a': {
            name: 'comp-a',
            description: 'Component A',
            category: 'invalid' as 'ui',
            files: [],
            dependencies: [],
            devDependencies: [],
            registryDependencies: [],
          },
        },
      }

      expect(() => validateRegistry(registry)).toThrow()
    })

    it('should reject component with no files', () => {
      const registry: ComponentRegistry = {
        name: 'test',
        version: '1.0.0',
        components: {
          'comp-a': {
            name: 'comp-a',
            description: 'Component A',
            category: 'ui',
            files: [],
            dependencies: [],
            devDependencies: [],
            registryDependencies: [],
          },
        },
      }

      expect(() => validateRegistry(registry)).toThrow()
    })
  })

  describe('File Operations', () => {
    it('should copy files correctly', () => {
      const sourceFile = join(testDir, 'source.txt')
      const destFile = join(testDir, 'dest.txt')
      const content = 'test content'

      writeFileSync(sourceFile, content, 'utf-8')

      // Copy file
      const sourceContent = readFileSync(sourceFile, 'utf-8')
      writeFileSync(destFile, sourceContent, 'utf-8')

      // Verify
      expect(existsSync(destFile)).toBe(true)
      const destContent = readFileSync(destFile, 'utf-8')
      expect(destContent).toBe(content)
    })

    it('should create nested directories when copying files', () => {
      const destFile = join(testDir, 'nested', 'dir', 'file.txt')
      const content = 'test content'

      // Create directory structure
      const destDir = join(destFile, '..')
      mkdirSync(destDir, { recursive: true })
      writeFileSync(destFile, content, 'utf-8')

      // Verify
      expect(existsSync(destFile)).toBe(true)
    })
  })
})
