import { describe, expect, vi, test } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch, createTestContext } from '@nuxt/test-utils'
import axios from 'axios'
import singleIPVariantFeature from './fixture/response/single-allow-by-ip-variant-feature'

describe('ok-header-ip', async () => {
  vi.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(singleIPVariantFeature))

  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('./fixture/ok-header-ip', import.meta.url))
  })

  test('should pass if current header request is allow by ip', async () => {
    const html = await $fetch('/App')
    expect(html).contain('New Feature Exist')
  })
})
