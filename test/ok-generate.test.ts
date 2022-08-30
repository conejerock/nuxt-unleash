import { URL } from 'url'
import { describe, expect, vi, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'
import axios from 'axios'
import singleIPFeature from './fixture/response/single-allow-by-ip-feature'

describe('ok-generate', async () => {
  vi.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(singleIPFeature))

  await setup({
    nuxtConfig: {
      ssr: false,
      target: 'static',
      generate: {
        dir: 'dist'
      }
    },
    rootDir: fileURLToPath(new URL('./fixture/ok-generate', import.meta.url)),
    server: false
  })

  it('should pass module with template instance', async () => {
    const html = $fetch('/App')
    await expect(html).contain('New Feature Doesnt Exist')
  })
})
