import { describe, expect, vi, test } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup } from '@nuxt/test-utils'
import axios from 'axios'
import consola from 'consola'

const spyLogger = (methodName: 'error' | 'warn' = 'error') => {
  const logger = consola.withTag('nuxt:unleash')
  vi.spyOn(consola, 'withTag').mockImplementation(() => logger)
  return vi.spyOn(logger, methodName).mockImplementation(vi.fn() as any)
}

describe('fail-service', async () => {
  vi.spyOn(axios, 'get').mockImplementation(() => Promise.reject(Error('Cant connect')))

  const loggerErrorSpy = spyLogger('warn')

  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('./fixture/options-without-url', import.meta.url))
  })

  test('should warn if fail unleash service', () => {
    expect(loggerErrorSpy).toBeCalledWith('url option is not set')
  })
})


