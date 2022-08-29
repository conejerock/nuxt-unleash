import { describe, expect, vi, test } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'
import axios from 'axios'
import singleIPFeature from './fixture/response/single-allow-by-ip-feature'

describe('ok-generate', async () => {
  vi.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(singleIPFeature))

  await setup({
    nuxtConfig: {
      ssr: false,
      target: 'static'
    },
    rootDir: fileURLToPath(new URL('./fixture/ok-generate', import.meta.url)),
    build: true
  })

  test('should pass module with template instance', async () => {
    const html = await $fetch('/App')
    expect(html).contain('New Feature Doesnt Exist')
  })
})
