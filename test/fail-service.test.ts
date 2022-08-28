import { describe, expect, vi, test } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup } from '@nuxt/test-utils'
import axios from 'axios'
import consola from 'consola'

const spyLogger = () => {
  const logger = consola.withTag('nuxt:unleash')
  vi.spyOn(consola, 'withTag').mockImplementation(() => logger)
  return vi.spyOn(logger, 'error').mockImplementation(vi.fn() as any)
}

describe('fail-service', async () => {
  vi.spyOn(axios, 'get').mockImplementation(() => Promise.reject(Error('Cant connect')))

  const loggerErrorSpy = spyLogger()

  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('./fixture/ok', import.meta.url))
  })

  test('should warn if fail unleash service', () => {
    expect(loggerErrorSpy).toBeCalledWith('Cannot fetch data from url http://some-url.com')
  })
})
