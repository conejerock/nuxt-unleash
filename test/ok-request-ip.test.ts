import { URL } from 'url'
import { describe, expect, vi, test } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch, createTestContext } from '@nuxt/test-utils'
import axios from 'axios'
import singleIPFeature from './fixture/response/single-allow-by-ip-feature'

describe('ok-request-ip', async () => {
  vi.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(singleIPFeature))

  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('./fixture/ok-request-ip', import.meta.url))
  })

  test('should pass if current request is allow by ip', async () => {
    const html = await $fetch('/App')
    expect(html).contain('New Feature Exist')
  })
})
