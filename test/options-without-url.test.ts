import { setupTest, mockConsola } from '@nuxt/test-utils'

const logger = mockConsola()

describe('options-without-url', () => {
  setupTest({
    build: true,
    server: true,
    fixture: 'fixture/options-without-url'
  })

  test('should warn if not option url', () => {
    expect(logger.warn).toHaveBeenCalledWith(expect.stringMatching('url option is not set'))
  })
})
