import { describe, it, expect } from 'vitest'
import { version } from './index'

describe('Package', () => {
  it('exports version', () => {
    expect(version).toBe('0.1.0')
  })
})
