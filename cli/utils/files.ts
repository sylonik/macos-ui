import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'

/**
 * Check if a file exists
 */
export function fileExists(path: string): boolean {
  return existsSync(path)
}

/**
 * Create directory recursively if it doesn't exist
 */
export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Write file and create directories if needed
 */
export function writeFile(filePath: string, content: string): void {
  ensureDir(dirname(filePath))
  writeFileSync(filePath, content, 'utf-8')
}

/**
 * Read file content
 */
export function readFile(filePath: string): string {
  return readFileSync(filePath, 'utf-8')
}

/**
 * Copy file from source to destination
 */
export function copyFile(sourcePath: string, destPath: string): void {
  const content = readFile(sourcePath)
  writeFile(destPath, content)
}

/**
 * Get the project root directory (where package.json is)
 */
export function getProjectRoot(): string {
  let currentDir = process.cwd()
  
  while (currentDir !== '/') {
    if (fileExists(join(currentDir, 'package.json'))) {
      return currentDir
    }
    currentDir = dirname(currentDir)
  }
  
  return process.cwd()
}

/**
 * Read and parse package.json
 */
export function readPackageJson(projectRoot: string): Record<string, unknown> {
  const packageJsonPath = join(projectRoot, 'package.json')
  
  if (!fileExists(packageJsonPath)) {
    throw new Error('package.json not found in project root')
  }
  
  const content = readFile(packageJsonPath)
  return JSON.parse(content) as Record<string, unknown>
}

/**
 * Write package.json
 */
export function writePackageJson(
  projectRoot: string,
  packageJson: Record<string, unknown>
): void {
  const packageJsonPath = join(projectRoot, 'package.json')
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8')
}
