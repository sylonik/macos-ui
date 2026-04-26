#!/usr/bin/env node

import { Command } from 'commander'
import { addCommand } from './commands/add.js'
import { initCommand } from './commands/init.js'
import { diffCommand } from './commands/diff.js'

const program = new Command()

program
  .name('macos-ui')
  .description('CLI tool for installing macOS-style UI components')
  .version('0.2.0')

program
  .command('init')
  .description('Initialize macos-ui configuration in your project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(initCommand)

program
  .command('add')
  .description('Add a component to your project')
  .argument('[components...]', 'Component names to install')
  .option('-a, --all', 'Install all available components')
  .option('-o, --overwrite', 'Overwrite existing files without prompting')
  .option('-p, --path <path>', 'Custom path for components', 'src/components')
  .action(addCommand)

program
  .command('diff')
  .description('Check for differences between local and registry components')
  .argument('[component]', 'Component name to check')
  .action(diffCommand)

program.parse()
