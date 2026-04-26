export interface ComponentRegistry {
  name: string
  version: string
  components: Record<string, ComponentDefinition>
}

export interface ComponentDefinition {
  name: string
  description: string
  category: 'desktop' | 'window' | 'ui' | 'hooks' | 'lib'
  files: FileDefinition[]
  dependencies: string[]
  devDependencies: string[]
  registryDependencies: string[]
}

export interface FileDefinition {
  name: string
  path: string
  content: string
  type: 'component' | 'hook' | 'util' | 'style' | 'type'
}

export interface AddCommandOptions {
  all?: boolean
  overwrite?: boolean
  path?: string
}

export interface InitCommandOptions {
  yes?: boolean
}
