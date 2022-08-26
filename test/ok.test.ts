import { describe, test, expect } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils'

describe('ok', () => {
  setup({
    server: true,
    fixture: 'fixture/ok'
  })

  test('should pass module with template instance', async () => {
    const { body } = await $fetch('/App')
    expect(body).toContain('New Feature Exist')
  })
})
