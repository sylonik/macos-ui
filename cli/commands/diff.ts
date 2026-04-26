import { logger } from '../utils/logger.js'

export async function diffCommand(component?: string) {
  logger.info('Diff command is not yet implemented')
  if (component) {
    logger.info(`Would check differences for: ${component}`)
  } else {
    logger.info('Would check differences for all components')
  }
}
