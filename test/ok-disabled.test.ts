import { URL } from 'url'
import { describe, expect, vi, test } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'
import axios from 'axios'
import singleFeature from './fixture/response/single-feature'

describe('ok disabled', async () => {
  vi.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(singleFeature))

  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('./fixture/ok-disabled', import.meta.url))
  })

  test('should pass module with template instance', async () => {
    const html = await $fetch('/App')
    expect(html).contain('New Feature Exists and Disabled')
  })
})
